/**
 * src/controllers/etenders.controller.ts
 *
 * E-Tenders CMS Controller (Section 5.4)
 *
 * Features:
 *   1. Working Copy Draft Pattern [FIX #2] (draft_title, draft_file_url, draft_corrigendum_url)
 *   2. Filter by tender_type ('live', 'past') and status
 *   3. Audit Trail Logging [FIX #3]
 */

import { Request, Response } from 'express';
import { ContentStatus, Prisma } from '@prisma/client';
import prisma from '../config/prisma';
import { createAuditLog } from '../middlewares/audit';
import { logger } from '../utils/logger';

// ── 1. GET /v1/etenders ──────────────────────────────────────────────────────

export async function listEtenders(req: Request, res: Response): Promise<void> {
  try {
    const page = Math.max(1, parseInt(req.query.page as string, 10) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit as string, 10) || 20));
    const skip = (page - 1) * limit;

    const tenderType = req.query.type as string | undefined;
    const requestedStatus = req.query.status as ContentStatus | undefined;
    const search = (req.query.search as string | undefined)?.trim();

    const isPrivileged = req.user && (req.user.role === 'admin' || req.user.role === 'editor');
    const effectiveStatus: ContentStatus | undefined = isPrivileged
      ? (requestedStatus && Object.values(ContentStatus).includes(requestedStatus) ? requestedStatus : undefined)
      : ContentStatus.published;

    const where: Prisma.EtenderWhereInput = {};
    if (tenderType) {
      where.tender_type = tenderType;
    }
    if (effectiveStatus) {
      where.status = effectiveStatus;
    }
    if (search) {
      where.OR = [
        { title: { contains: search } },
        { tender_number: { contains: search } },
      ];
    }

    const [total, tenders] = await Promise.all([
      prisma.etender.count({ where }),
      prisma.etender.findMany({
        where,
        skip,
        take: limit,
        orderBy: [{ id: 'desc' }],
        include: {
          creator: { select: { id: true, name: true, email: true } },
          updater: { select: { id: true, name: true, email: true } },
        },
      }),
    ]);

    const formattedTenders = tenders.map((item) => {
      if (!isPrivileged) {
        const { draft_title, draft_file_url, draft_corrigendum_url, has_unpublished_draft, ...publicFields } = item;
        return publicFields;
      }
      return item;
    });

    res.json({
      etenders: formattedTenders,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (err) {
    logger.error('Error listing e-tenders', { err });
    res.status(500).json({ error: 'Internal server error listing e-tenders.' });
  }
}

// ── 2. GET /v1/etenders/:id ──────────────────────────────────────────────────

export async function getEtenderById(req: Request, res: Response): Promise<void> {
  try {
    const tenderId = parseInt(req.params.id as string, 10);
    if (isNaN(tenderId)) {
      res.status(400).json({ error: 'Invalid e-tender ID.' });
      return;
    }

    const item = await prisma.etender.findUnique({
      where: { id: tenderId },
      include: {
        creator: { select: { id: true, name: true, email: true } },
        updater: { select: { id: true, name: true, email: true } },
      },
    });

    if (!item) {
      res.status(404).json({ error: 'E-Tender not found.' });
      return;
    }

    const isPrivileged = req.user && (req.user.role === 'admin' || req.user.role === 'editor');

    if (!isPrivileged && item.status !== ContentStatus.published) {
      res.status(404).json({ error: 'E-Tender not found.' });
      return;
    }

    if (!isPrivileged) {
      const { draft_title, draft_file_url, draft_corrigendum_url, has_unpublished_draft, ...publicFields } = item;
      res.json({ etender: publicFields });
      return;
    }

    res.json({ etender: item });
  } catch (err) {
    logger.error('Error fetching e-tender by ID', { err, tenderId: req.params.id });
    res.status(500).json({ error: 'Internal server error fetching e-tender.' });
  }
}

// ── 3. POST /v1/etenders ─────────────────────────────────────────────────────

export async function createEtender(req: Request, res: Response): Promise<void> {
  try {
    const { title, tender_number, tender_type, file_url, corrigendum_url, submission_date } = req.body;

    if (!title || typeof title !== 'string' || !title.trim()) {
      res.status(400).json({ error: 'Title is required.' });
      return;
    }

    const cleanTitle = title.trim();
    const cleanNumber = tender_number ? String(tender_number).trim() : null;
    const cleanType = tender_type ? String(tender_type).trim().toLowerCase() : 'live';
    const cleanFileUrl = file_url ? String(file_url).trim() : null;
    const cleanCorrigendum = corrigendum_url ? String(corrigendum_url).trim() : null;
    const cleanSubmissionDate = submission_date ? String(submission_date).trim() : null;

    const etender = await prisma.etender.create({
      data: {
        title: cleanTitle,
        tender_number: cleanNumber,
        tender_type: cleanType,
        file_url: cleanFileUrl,
        corrigendum_url: cleanCorrigendum,
        submission_date: cleanSubmissionDate,
        status: ContentStatus.draft,
        draft_title: cleanTitle,
        draft_file_url: cleanFileUrl,
        draft_corrigendum_url: cleanCorrigendum,
        has_unpublished_draft: false,
        created_by: req.user!.id,
        updated_by: req.user!.id,
      },
    });

    await createAuditLog({
      req,
      action: 'CREATE',
      resource: 'etenders',
      resourceId: etender.id,
      newValue: { title: etender.title, status: etender.status },
    });

    res.status(201).json({
      message: 'E-Tender created as draft.',
      etender,
    });
  } catch (err) {
    logger.error('Error creating e-tender', { err, body: req.body });
    res.status(500).json({ error: 'Internal server error creating e-tender.' });
  }
}

// ── 4. PATCH /v1/etenders/:id (Update Working-Copy Draft) [FIX #2] ───────────

export async function updateEtenderDraft(req: Request, res: Response): Promise<void> {
  try {
    const tenderId = parseInt(req.params.id as string, 10);
    if (isNaN(tenderId)) {
      res.status(400).json({ error: 'Invalid e-tender ID.' });
      return;
    }

    const existing = await prisma.etender.findUnique({ where: { id: tenderId } });
    if (!existing) {
      res.status(404).json({ error: 'E-Tender not found.' });
      return;
    }

    const { title, tender_number, tender_type, file_url, corrigendum_url, submission_date } = req.body;

    if (title === undefined && tender_number === undefined && tender_type === undefined && file_url === undefined && corrigendum_url === undefined && submission_date === undefined) {
      res.status(400).json({ error: 'Provide at least one field to update.' });
      return;
    }

    const draftData: Prisma.EtenderUpdateInput = {
      has_unpublished_draft: true,
      updater: { connect: { id: req.user!.id } },
    };

    if (title !== undefined) draftData.draft_title = String(title).trim();
    if (tender_number !== undefined) draftData.tender_number = tender_number ? String(tender_number).trim() : null;
    if (tender_type !== undefined) draftData.tender_type = String(tender_type).trim().toLowerCase();
    if (file_url !== undefined) draftData.draft_file_url = file_url ? String(file_url).trim() : null;
    if (corrigendum_url !== undefined) draftData.draft_corrigendum_url = corrigendum_url ? String(corrigendum_url).trim() : null;
    if (submission_date !== undefined) draftData.submission_date = submission_date ? String(submission_date).trim() : null;

    const updated = await prisma.etender.update({
      where: { id: tenderId },
      data: draftData,
    });

    await createAuditLog({
      req,
      action: 'UPDATE_DRAFT',
      resource: 'etenders',
      resourceId: tenderId,
      oldValue: { draft_title: existing.draft_title, has_unpublished_draft: existing.has_unpublished_draft },
      newValue: { draft_title: updated.draft_title, has_unpublished_draft: true },
    });

    res.json({
      message: 'E-Tender draft updated successfully. Live posting remains unchanged until published.',
      etender: updated,
    });
  } catch (err) {
    logger.error('Error updating e-tender draft', { err, tenderId: req.params.id });
    res.status(500).json({ error: 'Internal server error updating e-tender draft.' });
  }
}

// ── 5. PATCH /v1/etenders/:id/publish [FIX #2] ───────────────────────────────

export async function publishEtender(req: Request, res: Response): Promise<void> {
  try {
    const tenderId = parseInt(req.params.id as string, 10);
    if (isNaN(tenderId)) {
      res.status(400).json({ error: 'Invalid e-tender ID.' });
      return;
    }

    const existing = await prisma.etender.findUnique({ where: { id: tenderId } });
    if (!existing) {
      res.status(404).json({ error: 'E-Tender not found.' });
      return;
    }

    const publishedTitle = existing.draft_title ?? existing.title;
    const publishedFileUrl = existing.draft_file_url !== undefined ? existing.draft_file_url : existing.file_url;
    const publishedCorrigendum = existing.draft_corrigendum_url !== undefined ? existing.draft_corrigendum_url : existing.corrigendum_url;

    const published = await prisma.etender.update({
      where: { id: tenderId },
      data: {
        title: publishedTitle,
        file_url: publishedFileUrl,
        corrigendum_url: publishedCorrigendum,
        status: ContentStatus.published,
        has_unpublished_draft: false,
        updater: { connect: { id: req.user!.id } },
      },
    });

    await createAuditLog({
      req,
      action: 'PUBLISH',
      resource: 'etenders',
      resourceId: tenderId,
      oldValue: { status: existing.status, title: existing.title },
      newValue: { status: ContentStatus.published, title: published.title },
    });

    res.json({
      message: 'E-Tender published successfully.',
      etender: published,
    });
  } catch (err) {
    logger.error('Error publishing e-tender', { err, tenderId: req.params.id });
    res.status(500).json({ error: 'Internal server error publishing e-tender.' });
  }
}

// ── 6. PATCH /v1/etenders/:id/archive ────────────────────────────────────────

export async function archiveEtender(req: Request, res: Response): Promise<void> {
  try {
    const tenderId = parseInt(req.params.id as string, 10);
    if (isNaN(tenderId)) {
      res.status(400).json({ error: 'Invalid e-tender ID.' });
      return;
    }

    const existing = await prisma.etender.findUnique({ where: { id: tenderId } });
    if (!existing) {
      res.status(404).json({ error: 'E-Tender not found.' });
      return;
    }

    const archived = await prisma.etender.update({
      where: { id: tenderId },
      data: {
        status: ContentStatus.archived,
        tender_type: 'past',
        updater: { connect: { id: req.user!.id } },
      },
    });

    await createAuditLog({
      req,
      action: 'ARCHIVE',
      resource: 'etenders',
      resourceId: tenderId,
      oldValue: { status: existing.status },
      newValue: { status: ContentStatus.archived },
    });

    res.json({
      message: 'E-Tender archived successfully.',
      etender: archived,
    });
  } catch (err) {
    logger.error('Error archiving e-tender', { err, tenderId: req.params.id });
    res.status(500).json({ error: 'Internal server error archiving e-tender.' });
  }
}

// ── 7. DELETE /v1/etenders/:id (Admin Only) ──────────────────────────────────

export async function deleteEtender(req: Request, res: Response): Promise<void> {
  try {
    const tenderId = parseInt(req.params.id as string, 10);
    if (isNaN(tenderId)) {
      res.status(400).json({ error: 'Invalid e-tender ID.' });
      return;
    }

    const existing = await prisma.etender.findUnique({ where: { id: tenderId } });
    if (!existing) {
      res.status(404).json({ error: 'E-Tender not found.' });
      return;
    }

    await prisma.etender.delete({ where: { id: tenderId } });

    await createAuditLog({
      req,
      action: 'DELETE',
      resource: 'etenders',
      resourceId: tenderId,
      oldValue: { title: existing.title, status: existing.status },
    });

    res.json({ message: 'E-Tender deleted successfully.' });
  } catch (err) {
    logger.error('Error deleting e-tender', { err, tenderId: req.params.id });
    res.status(500).json({ error: 'Internal server error deleting e-tender.' });
  }
}
