/**
 * src/controllers/careers.controller.ts
 *
 * Careers CMS Controller (Section 5.4)
 *
 * Features:
 *   1. Working Copy Draft Pattern [FIX #2] (draft_title, draft_last_date)
 *   2. Sub-resource management for Career Buttons (POST /careers/:id/buttons, PATCH, DELETE)
 *   3. Filter by type (live, past) and status
 *   4. Audit Trail Logging [FIX #3]
 */

import { Request, Response } from 'express';
import { ContentStatus, Prisma } from '@prisma/client';
import prisma from '../config/prisma';
import { createAuditLog } from '../middlewares/audit';
import { logger } from '../utils/logger';

// ── 1. GET /v1/careers ───────────────────────────────────────────────────────

export async function listCareers(req: Request, res: Response): Promise<void> {
  try {
    const page = Math.max(1, parseInt(req.query.page as string, 10) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit as string, 10) || 20));
    const skip = (page - 1) * limit;

    const careerType = req.query.type as string | undefined;
    const requestedStatus = req.query.status as ContentStatus | undefined;
    const search = (req.query.search as string | undefined)?.trim();

    const isPrivileged = req.user && (req.user.role === 'admin' || req.user.role === 'editor');
    const effectiveStatus: ContentStatus | undefined = isPrivileged
      ? (requestedStatus && Object.values(ContentStatus).includes(requestedStatus) ? requestedStatus : undefined)
      : ContentStatus.published;

    const where: Prisma.CareerWhereInput = {};
    if (careerType) {
      where.career_type = careerType;
    }
    if (effectiveStatus) {
      where.status = effectiveStatus;
    }
    if (search) {
      where.title = { contains: search };
    }

    const [total, careers] = await Promise.all([
      prisma.career.count({ where }),
      prisma.career.findMany({
        where,
        skip,
        take: limit,
        orderBy: [{ last_date: 'desc' }, { id: 'desc' }],
        include: {
          buttons: {
            orderBy: { display_order: 'asc' },
          },
          creator: { select: { id: true, name: true, email: true } },
          updater: { select: { id: true, name: true, email: true } },
        },
      }),
    ]);

    const formattedCareers = careers.map((item) => {
      if (!isPrivileged) {
        const { draft_title, draft_last_date, has_unpublished_draft, ...publicFields } = item;
        return publicFields;
      }
      return item;
    });

    res.json({
      careers: formattedCareers,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (err) {
    logger.error('Error listing careers', { err });
    res.status(500).json({ error: 'Internal server error listing careers.' });
  }
}

// ── 2. GET /v1/careers/:id ───────────────────────────────────────────────────

export async function getCareerById(req: Request, res: Response): Promise<void> {
  try {
    const careerId = parseInt(req.params.id as string, 10);
    if (isNaN(careerId)) {
      res.status(400).json({ error: 'Invalid career ID.' });
      return;
    }

    const item = await prisma.career.findUnique({
      where: { id: careerId },
      include: {
        buttons: { orderBy: { display_order: 'asc' } },
        creator: { select: { id: true, name: true, email: true } },
        updater: { select: { id: true, name: true, email: true } },
      },
    });

    if (!item) {
      res.status(404).json({ error: 'Career not found.' });
      return;
    }

    const isPrivileged = req.user && (req.user.role === 'admin' || req.user.role === 'editor');

    if (!isPrivileged && item.status !== ContentStatus.published) {
      res.status(404).json({ error: 'Career not found.' });
      return;
    }

    if (!isPrivileged) {
      const { draft_title, draft_last_date, has_unpublished_draft, ...publicFields } = item;
      res.json({ career: publicFields });
      return;
    }

    res.json({ career: item });
  } catch (err) {
    logger.error('Error fetching career by ID', { err, careerId: req.params.id });
    res.status(500).json({ error: 'Internal server error fetching career.' });
  }
}

// ── 3. POST /v1/careers ──────────────────────────────────────────────────────

export async function createCareer(req: Request, res: Response): Promise<void> {
  try {
    const { title, career_type, post_date, last_date } = req.body;

    if (!title || typeof title !== 'string' || !title.trim()) {
      res.status(400).json({ error: 'Title is required.' });
      return;
    }

    const cleanTitle = title.trim();
    const cleanType = career_type ? String(career_type).trim().toLowerCase() : 'live';
    const parsedPostDate = post_date ? new Date(post_date) : new Date();
    const parsedLastDate = last_date ? new Date(last_date) : null;

    const career = await prisma.career.create({
      data: {
        title: cleanTitle,
        career_type: cleanType,
        post_date: parsedPostDate,
        last_date: parsedLastDate,
        status: ContentStatus.draft,
        draft_title: cleanTitle,
        draft_last_date: parsedLastDate,
        has_unpublished_draft: false,
        created_by: req.user!.id,
        updated_by: req.user!.id,
      },
    });

    await createAuditLog({
      req,
      action: 'CREATE',
      resource: 'careers',
      resourceId: career.id,
      newValue: { title: career.title, status: career.status },
    });

    res.status(201).json({
      message: 'Career created as draft.',
      career,
    });
  } catch (err) {
    logger.error('Error creating career', { err, body: req.body });
    res.status(500).json({ error: 'Internal server error creating career.' });
  }
}

// ── 4. PATCH /v1/careers/:id (Update Working-Copy Draft) [FIX #2] ─────────────

export async function updateCareerDraft(req: Request, res: Response): Promise<void> {
  try {
    const careerId = parseInt(req.params.id as string, 10);
    if (isNaN(careerId)) {
      res.status(400).json({ error: 'Invalid career ID.' });
      return;
    }

    const existing = await prisma.career.findUnique({ where: { id: careerId } });
    if (!existing) {
      res.status(404).json({ error: 'Career not found.' });
      return;
    }

    const { title, career_type, last_date } = req.body;

    if (title === undefined && career_type === undefined && last_date === undefined) {
      res.status(400).json({ error: 'Provide at least one field to update.' });
      return;
    }

    const draftData: Prisma.CareerUpdateInput = {
      has_unpublished_draft: true,
      updater: { connect: { id: req.user!.id } },
    };

    if (title !== undefined) draftData.draft_title = String(title).trim();
    if (career_type !== undefined) draftData.career_type = String(career_type).trim().toLowerCase();
    if (last_date !== undefined) {
      draftData.draft_last_date = last_date ? new Date(last_date) : null;
    }

    const updated = await prisma.career.update({
      where: { id: careerId },
      data: draftData,
    });

    await createAuditLog({
      req,
      action: 'UPDATE_DRAFT',
      resource: 'careers',
      resourceId: careerId,
      oldValue: { draft_title: existing.draft_title, has_unpublished_draft: existing.has_unpublished_draft },
      newValue: { draft_title: updated.draft_title, has_unpublished_draft: true },
    });

    res.json({
      message: 'Career draft updated successfully. Live posting remains unchanged until published.',
      career: updated,
    });
  } catch (err) {
    logger.error('Error updating career draft', { err, careerId: req.params.id });
    res.status(500).json({ error: 'Internal server error updating career draft.' });
  }
}

// ── 5. PATCH /v1/careers/:id/publish [FIX #2] ─────────────────────────────────

export async function publishCareer(req: Request, res: Response): Promise<void> {
  try {
    const careerId = parseInt(req.params.id as string, 10);
    if (isNaN(careerId)) {
      res.status(400).json({ error: 'Invalid career ID.' });
      return;
    }

    const existing = await prisma.career.findUnique({ where: { id: careerId } });
    if (!existing) {
      res.status(404).json({ error: 'Career not found.' });
      return;
    }

    const publishedTitle = existing.draft_title ?? existing.title;
    const publishedLastDate = existing.draft_last_date !== undefined ? existing.draft_last_date : existing.last_date;

    const published = await prisma.career.update({
      where: { id: careerId },
      data: {
        title: publishedTitle,
        last_date: publishedLastDate,
        status: ContentStatus.published,
        has_unpublished_draft: false,
        updater: { connect: { id: req.user!.id } },
      },
    });

    await createAuditLog({
      req,
      action: 'PUBLISH',
      resource: 'careers',
      resourceId: careerId,
      oldValue: { status: existing.status, title: existing.title },
      newValue: { status: ContentStatus.published, title: published.title },
    });

    res.json({
      message: 'Career published successfully.',
      career: published,
    });
  } catch (err) {
    logger.error('Error publishing career', { err, careerId: req.params.id });
    res.status(500).json({ error: 'Internal server error publishing career.' });
  }
}

// ── 6. PATCH /v1/careers/:id/archive ──────────────────────────────────────────

export async function archiveCareer(req: Request, res: Response): Promise<void> {
  try {
    const careerId = parseInt(req.params.id as string, 10);
    if (isNaN(careerId)) {
      res.status(400).json({ error: 'Invalid career ID.' });
      return;
    }

    const existing = await prisma.career.findUnique({ where: { id: careerId } });
    if (!existing) {
      res.status(404).json({ error: 'Career not found.' });
      return;
    }

    const archived = await prisma.career.update({
      where: { id: careerId },
      data: {
        status: ContentStatus.archived,
        career_type: 'past',
        updater: { connect: { id: req.user!.id } },
      },
    });

    await createAuditLog({
      req,
      action: 'ARCHIVE',
      resource: 'careers',
      resourceId: careerId,
      oldValue: { status: existing.status },
      newValue: { status: ContentStatus.archived },
    });

    res.json({
      message: 'Career archived successfully.',
      career: archived,
    });
  } catch (err) {
    logger.error('Error archiving career', { err, careerId: req.params.id });
    res.status(500).json({ error: 'Internal server error archiving career.' });
  }
}

// ── 7. DELETE /v1/careers/:id (Admin Only) ───────────────────────────────────

export async function deleteCareer(req: Request, res: Response): Promise<void> {
  try {
    const careerId = parseInt(req.params.id as string, 10);
    if (isNaN(careerId)) {
      res.status(400).json({ error: 'Invalid career ID.' });
      return;
    }

    const existing = await prisma.career.findUnique({ where: { id: careerId } });
    if (!existing) {
      res.status(404).json({ error: 'Career not found.' });
      return;
    }

    await prisma.career.delete({ where: { id: careerId } });

    await createAuditLog({
      req,
      action: 'DELETE',
      resource: 'careers',
      resourceId: careerId,
      oldValue: { title: existing.title, status: existing.status },
    });

    res.json({ message: 'Career deleted successfully.' });
  } catch (err) {
    logger.error('Error deleting career', { err, careerId: req.params.id });
    res.status(500).json({ error: 'Internal server error deleting career.' });
  }
}

// ── 8. SUB-RESOURCE: Career Buttons ──────────────────────────────────────────

export async function addCareerButton(req: Request, res: Response): Promise<void> {
  try {
    const careerId = parseInt(req.params.id as string, 10);
    if (isNaN(careerId)) {
      res.status(400).json({ error: 'Invalid career ID.' });
      return;
    }

    const { label, url, file_url, display_order } = req.body;
    if (!label || typeof label !== 'string' || !label.trim()) {
      res.status(400).json({ error: 'Button label is required.' });
      return;
    }

    const career = await prisma.career.findUnique({ where: { id: careerId } });
    if (!career) {
      res.status(404).json({ error: 'Career not found.' });
      return;
    }

    const button = await prisma.careerButton.create({
      data: {
        career_id: careerId,
        label: label.trim(),
        url: url ? String(url).trim() : null,
        file_url: file_url ? String(file_url).trim() : null,
        display_order: parseInt(display_order, 10) || 0,
      },
    });

    res.status(201).json({
      message: 'Career button added.',
      button,
    });
  } catch (err) {
    logger.error('Error adding career button', { err, careerId: req.params.id });
    res.status(500).json({ error: 'Internal server error adding career button.' });
  }
}

export async function updateCareerButton(req: Request, res: Response): Promise<void> {
  try {
    const careerId = parseInt(req.params.id as string, 10);
    const btnId = parseInt(req.params.btnId as string, 10);

    if (isNaN(careerId) || isNaN(btnId)) {
      res.status(400).json({ error: 'Invalid career ID or button ID.' });
      return;
    }

    const existing = await prisma.careerButton.findFirst({
      where: { id: btnId, career_id: careerId },
    });

    if (!existing) {
      res.status(404).json({ error: 'Career button not found.' });
      return;
    }

    const { label, url, file_url, display_order } = req.body;
    const updateData: Prisma.CareerButtonUpdateInput = {};

    if (label !== undefined) updateData.label = String(label).trim();
    if (url !== undefined) updateData.url = url ? String(url).trim() : null;
    if (file_url !== undefined) updateData.file_url = file_url ? String(file_url).trim() : null;
    if (display_order !== undefined) updateData.display_order = parseInt(display_order, 10) || 0;

    const updatedButton = await prisma.careerButton.update({
      where: { id: btnId },
      data: updateData,
    });

    res.json({
      message: 'Career button updated.',
      button: updatedButton,
    });
  } catch (err) {
    logger.error('Error updating career button', { err, btnId: req.params.btnId });
    res.status(500).json({ error: 'Internal server error updating career button.' });
  }
}

export async function deleteCareerButton(req: Request, res: Response): Promise<void> {
  try {
    const careerId = parseInt(req.params.id as string, 10);
    const btnId = parseInt(req.params.btnId as string, 10);

    if (isNaN(careerId) || isNaN(btnId)) {
      res.status(400).json({ error: 'Invalid career ID or button ID.' });
      return;
    }

    const existing = await prisma.careerButton.findFirst({
      where: { id: btnId, career_id: careerId },
    });

    if (!existing) {
      res.status(404).json({ error: 'Career button not found.' });
      return;
    }

    await prisma.careerButton.delete({ where: { id: btnId } });

    res.json({ message: 'Career button deleted successfully.' });
  } catch (err) {
    logger.error('Error deleting career button', { err, btnId: req.params.btnId });
    res.status(500).json({ error: 'Internal server error deleting career button.' });
  }
}
