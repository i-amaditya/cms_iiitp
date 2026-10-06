/**
 * src/controllers/media.controller.ts
 *
 * Media Upload & Media Library Controller (Section 5.6 & FIX #6)
 *
 * Endpoints:
 *   POST   /v1/media/upload — Upload single file (Images max 5MB, PDFs max 20MB)
 *   GET    /v1/media        — List uploaded files (Admin Media Library)
 *   DELETE /v1/media/:id    — Delete file record and remove from disk
 */

import { Request, Response } from 'express';
import fs from 'fs';
import prisma from '../config/prisma';
import { processUploadedFile } from '../utils/upload';
import { createAuditLog } from '../middlewares/audit';
import { logger } from '../utils/logger';

// ── 1. POST /v1/media/upload ──────────────────────────────────────────────────

export async function uploadMedia(req: Request, res: Response): Promise<void> {
  try {
    if (!req.file) {
      res.status(400).json({ error: 'No file provided in form field "file".' });
      return;
    }

    const context = req.body?.context ? String(req.body.context).trim() : undefined;

    // Process file (Sharp compression for images, direct save for PDFs)
    let processed;
    try {
      processed = await processUploadedFile(req.file, context);
    } catch (err: any) {
      res.status(400).json({ error: err.message || 'File processing failed.' });
      return;
    }

    // Save record in media_files table [FIX #6: tracks is_pdf]
    const mediaRecord = await prisma.mediaFile.create({
      data: {
        filename: processed.filename,
        original_name: processed.originalName,
        mime_type: processed.mimeType,
        size_bytes: processed.sizeBytes,
        url: processed.url,
        storage_path: processed.storagePath,
        is_pdf: processed.isPdf,
        uploaded_by: req.user!.id,
      },
    });

    // Audit log
    await createAuditLog({
      req,
      action: 'CREATE',
      resource: 'media_files',
      resourceId: mediaRecord.id,
      newValue: {
        filename: mediaRecord.filename,
        is_pdf: mediaRecord.is_pdf,
        size_bytes: mediaRecord.size_bytes,
        context,
      },
    });

    res.status(201).json({
      message: 'File uploaded successfully.',
      file: {
        id: mediaRecord.id,
        url: mediaRecord.url,
        filename: mediaRecord.filename,
        original_name: mediaRecord.original_name,
        mime_type: mediaRecord.mime_type,
        size_bytes: mediaRecord.size_bytes,
        is_pdf: mediaRecord.is_pdf,
        created_at: mediaRecord.created_at,
      },
    });
  } catch (err) {
    logger.error('Error during media upload', { err });
    res.status(500).json({ error: 'Internal server error during file upload.' });
  }
}

// ── 2. GET /v1/media (Admin Media Library) ───────────────────────────────────

export async function listMedia(req: Request, res: Response): Promise<void> {
  try {
    const page = Math.max(1, parseInt(req.query.page as string, 10) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit as string, 10) || 20));
    const skip = (page - 1) * limit;

    const mimeType = req.query.mime_type as string | undefined;
    const isPdfStr = req.query.is_pdf as string | undefined;
    const search = (req.query.search as string | undefined)?.trim();

    const where: any = {};
    if (mimeType) {
      where.mime_type = mimeType;
    }
    if (isPdfStr !== undefined) {
      where.is_pdf = isPdfStr === 'true' || isPdfStr === '1';
    }
    if (search) {
      where.OR = [
        { filename: { contains: search } },
        { original_name: { contains: search } },
      ];
    }

    const [total, files] = await Promise.all([
      prisma.mediaFile.count({ where }),
      prisma.mediaFile.findMany({
        where,
        skip,
        take: limit,
        orderBy: { created_at: 'desc' },
        include: {
          uploader: { select: { id: true, name: true, email: true } },
        },
      }),
    ]);

    res.json({
      files: files.map((f) => ({
        id: f.id,
        url: f.url,
        filename: f.filename,
        original_name: f.original_name,
        mime_type: f.mime_type,
        size_bytes: f.size_bytes,
        is_pdf: f.is_pdf,
        created_at: f.created_at,
        uploader: f.uploader,
      })),
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (err) {
    logger.error('Error listing media files', { err });
    res.status(500).json({ error: 'Internal server error listing media files.' });
  }
}

// ── 3. DELETE /v1/media/:id (Admin Only) ─────────────────────────────────────

export async function deleteMedia(req: Request, res: Response): Promise<void> {
  try {
    const mediaId = parseInt(req.params.id as string, 10);
    if (isNaN(mediaId)) {
      res.status(400).json({ error: 'Invalid media file ID.' });
      return;
    }

    const existing = await prisma.mediaFile.findUnique({ where: { id: mediaId } });
    if (!existing) {
      res.status(404).json({ error: 'Media file not found.' });
      return;
    }

    // Delete record from DB
    await prisma.mediaFile.delete({ where: { id: mediaId } });

    // Attempt to unlink file from disk (gracefully handle if missing)
    if (existing.storage_path && fs.existsSync(existing.storage_path)) {
      try {
        await fs.promises.unlink(existing.storage_path);
        logger.info('Deleted file from disk', { storagePath: existing.storage_path });
      } catch (unlinkErr) {
        logger.warn('Failed to delete file from disk', { unlinkErr, path: existing.storage_path });
      }
    }

    // Audit log
    await createAuditLog({
      req,
      action: 'DELETE',
      resource: 'media_files',
      resourceId: mediaId,
      oldValue: { filename: existing.filename, url: existing.url, is_pdf: existing.is_pdf },
    });

    res.json({ message: 'Media file deleted successfully.' });
  } catch (err) {
    logger.error('Error deleting media file', { err, mediaId: req.params.id });
    res.status(500).json({ error: 'Internal server error deleting media file.' });
  }
}
