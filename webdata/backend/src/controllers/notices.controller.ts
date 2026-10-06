/**
 * src/controllers/notices.controller.ts
 *
 * Notices CMS Controller (Section 5.3)
 *
 * Key Architecture Highlights:
 *   1. Working Copy Draft Pattern [FIX #2]:
 *      - PATCH /v1/notices/:id only modifies `draft_*` columns and sets `has_unpublished_draft = true`.
 *      - Public users on GET /v1/notices always read immutable live fields.
 *      - PATCH /v1/notices/:id/publish atomically copies `draft_*` -> live fields,
 *        sets `status = 'published'`, and resets `has_unpublished_draft = false`.
 *   2. Server-Side Full-Text Search [FIX #5]:
 *      - Uses MySQL MATCH(title) AGAINST(? IN BOOLEAN MODE) via raw query when search param is supplied.
 *   3. Audit Trail Logging [FIX #3]:
 *      - Records CREATE, UPDATE_DRAFT, PUBLISH, ARCHIVE, and DELETE operations.
 */

import { Request, Response } from 'express';
import { ContentStatus, Prisma } from '@prisma/client';
import prisma from '../config/prisma';
import { createAuditLog } from '../middlewares/audit';
import { logger } from '../utils/logger';

// ── 1. GET /v1/notices ───────────────────────────────────────────────────────

export async function listNotices(req: Request, res: Response): Promise<void> {
  try {
    const page = Math.max(1, parseInt(req.query.page as string, 10) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit as string, 10) || 20));
    const skip = (page - 1) * limit;

    const category = req.query.category as string | undefined;
    const requestedStatus = req.query.status as ContentStatus | undefined;
    const search = (req.query.search as string | undefined)?.trim();

    // Access evaluation:
    // If not authenticated or not editor/admin, force status = published (public view)
    const isPrivileged = req.user && (req.user.role === 'admin' || req.user.role === 'editor');
    const effectiveStatus: ContentStatus | undefined = isPrivileged
      ? (requestedStatus && Object.values(ContentStatus).includes(requestedStatus) ? requestedStatus : undefined)
      : ContentStatus.published;

    // Full-Text Search Path [FIX #5]
    if (search) {
      // Format boolean mode search terms (appends * for prefix matching)
      const booleanSearchTerm = search
        .split(/\s+/)
        .map((term) => `${term.replace(/[+\-><()~*"]/g, '')}*`)
        .join(' ');

      const countSql = Prisma.sql`
        SELECT COUNT(*) AS total
        FROM notices
        WHERE MATCH(title) AGAINST(${booleanSearchTerm} IN BOOLEAN MODE)
          ${category ? Prisma.sql`AND category = ${category}` : Prisma.empty}
          ${effectiveStatus ? Prisma.sql`AND status = ${effectiveStatus}` : Prisma.empty}
      `;

      const listSql = Prisma.sql`
        SELECT id, title, category, link_url, file_url, notice_date, status,
               draft_title, draft_category, draft_link_url, draft_file_url, draft_notice_date, has_unpublished_draft,
               created_by, updated_by, created_at, updated_at
        FROM notices
        WHERE MATCH(title) AGAINST(${booleanSearchTerm} IN BOOLEAN MODE)
          ${category ? Prisma.sql`AND category = ${category}` : Prisma.empty}
          ${effectiveStatus ? Prisma.sql`AND status = ${effectiveStatus}` : Prisma.empty}
        ORDER BY notice_date DESC, id DESC
        LIMIT ${limit} OFFSET ${skip}
      `;

      const [countResult, notices] = await Promise.all([
        prisma.$queryRaw<[{ total: bigint | number }]>(countSql),
        prisma.$queryRaw<any[]>(listSql),
      ]);

      const total = Number(countResult[0]?.total || 0);

      // Clean draft fields for non-privileged viewers
      const formattedNotices = notices.map((n) => {
        if (!isPrivileged) {
          const { draft_title, draft_category, draft_link_url, draft_file_url, draft_notice_date, has_unpublished_draft, ...publicFields } = n;
          return publicFields;
        }
        return n;
      });

      res.json({
        notices: formattedNotices,
        pagination: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit),
        },
      });
      return;
    }

    // Standard Filtered Prisma Query Path
    const where: Prisma.NoticeWhereInput = {};

    if (category) {
      where.category = category;
    }

    if (effectiveStatus) {
      where.status = effectiveStatus;
    }

    const [total, notices] = await Promise.all([
      prisma.notice.count({ where }),
      prisma.notice.findMany({
        where,
        skip,
        take: limit,
        orderBy: [{ notice_date: 'desc' }, { id: 'desc' }],
        include: {
          creator: { select: { id: true, name: true, email: true } },
          updater: { select: { id: true, name: true, email: true } },
        },
      }),
    ]);

    const formattedNotices = notices.map((n) => {
      if (!isPrivileged) {
        const { draft_title, draft_category, draft_link_url, draft_file_url, draft_notice_date, has_unpublished_draft, ...publicFields } = n;
        return publicFields;
      }
      return n;
    });

    res.json({
      notices: formattedNotices,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (err) {
    logger.error('Error listing notices', { err });
    res.status(500).json({ error: 'Internal server error listing notices.' });
  }
}

// ── 2. GET /v1/notices/:id ───────────────────────────────────────────────────

export async function getNoticeById(req: Request, res: Response): Promise<void> {
  try {
    const noticeId = parseInt(req.params.id as string, 10);
    if (isNaN(noticeId)) {
      res.status(400).json({ error: 'Invalid notice ID.' });
      return;
    }

    const notice = await prisma.notice.findUnique({
      where: { id: noticeId },
      include: {
        creator: { select: { id: true, name: true, email: true } },
        updater: { select: { id: true, name: true, email: true } },
      },
    });

    if (!notice) {
      res.status(404).json({ error: 'Notice not found.' });
      return;
    }

    const isPrivileged = req.user && (req.user.role === 'admin' || req.user.role === 'editor');

    // Public users cannot view drafts or archived notices unless published
    if (!isPrivileged && notice.status !== ContentStatus.published) {
      res.status(404).json({ error: 'Notice not found.' });
      return;
    }

    if (!isPrivileged) {
      const { draft_title, draft_category, draft_link_url, draft_file_url, draft_notice_date, has_unpublished_draft, ...publicFields } = notice;
      res.json({ notice: publicFields });
      return;
    }

    res.json({ notice });
  } catch (err) {
    logger.error('Error fetching notice by ID', { err, noticeId: req.params.id });
    res.status(500).json({ error: 'Internal server error fetching notice.' });
  }
}

// ── 3. POST /v1/notices ──────────────────────────────────────────────────────

export async function createNotice(req: Request, res: Response): Promise<void> {
  try {
    const { title, category, link_url, file_url, notice_date } = req.body;

    if (!title || typeof title !== 'string' || !title.trim()) {
      res.status(400).json({ error: 'Title is required.' });
      return;
    }

    if (!notice_date) {
      res.status(400).json({ error: 'Notice date is required.' });
      return;
    }

    const parsedDate = new Date(notice_date);
    if (isNaN(parsedDate.getTime())) {
      res.status(400).json({ error: 'Invalid notice date format.' });
      return;
    }

    // Created as draft by default with working copy populated
    const cleanTitle = title.trim();
    const cleanCategory = category ? String(category).trim() : null;
    const cleanLinkUrl = link_url ? String(link_url).trim() : null;
    const cleanFileUrl = file_url ? String(file_url).trim() : null;

    const notice = await prisma.notice.create({
      data: {
        title: cleanTitle,
        category: cleanCategory,
        link_url: cleanLinkUrl,
        file_url: cleanFileUrl,
        notice_date: parsedDate,
        status: ContentStatus.draft,
        // Populate working copy initially
        draft_title: cleanTitle,
        draft_category: cleanCategory,
        draft_link_url: cleanLinkUrl,
        draft_file_url: cleanFileUrl,
        draft_notice_date: parsedDate,
        has_unpublished_draft: false,
        created_by: req.user!.id,
        updated_by: req.user!.id,
      },
    });

    // Audit log
    await createAuditLog({
      req,
      action: 'CREATE',
      resource: 'notices',
      resourceId: notice.id,
      newValue: { title: notice.title, status: notice.status },
    });

    res.status(201).json({
      message: 'Notice created as draft.',
      notice,
    });
  } catch (err) {
    logger.error('Error creating notice', { err, body: req.body });
    res.status(500).json({ error: 'Internal server error creating notice.' });
  }
}

// ── 4. PATCH /v1/notices/:id (Update Working-Copy Draft) [FIX #2] ────────────

export async function updateNoticeDraft(req: Request, res: Response): Promise<void> {
  try {
    const noticeId = parseInt(req.params.id as string, 10);
    if (isNaN(noticeId)) {
      res.status(400).json({ error: 'Invalid notice ID.' });
      return;
    }

    const existing = await prisma.notice.findUnique({ where: { id: noticeId } });
    if (!existing) {
      res.status(404).json({ error: 'Notice not found.' });
      return;
    }

    const { title, category, link_url, file_url, notice_date } = req.body;

    if (title === undefined && category === undefined && link_url === undefined && file_url === undefined && notice_date === undefined) {
      res.status(400).json({ error: 'Provide at least one field to update.' });
      return;
    }

    const draftData: Prisma.NoticeUpdateInput = {
      has_unpublished_draft: true,
      updater: { connect: { id: req.user!.id } },
    };

    if (title !== undefined) draftData.draft_title = String(title).trim();
    if (category !== undefined) draftData.draft_category = category ? String(category).trim() : null;
    if (link_url !== undefined) draftData.draft_link_url = link_url ? String(link_url).trim() : null;
    if (file_url !== undefined) draftData.draft_file_url = file_url ? String(file_url).trim() : null;
    if (notice_date !== undefined) {
      const parsedDate = new Date(notice_date);
      if (isNaN(parsedDate.getTime())) {
        res.status(400).json({ error: 'Invalid notice date format.' });
        return;
      }
      draftData.draft_notice_date = parsedDate;
    }

    // Notice: Live fields (title, category, link_url, file_url, notice_date) are NOT modified here!
    const updated = await prisma.notice.update({
      where: { id: noticeId },
      data: draftData,
    });

    // Audit log
    await createAuditLog({
      req,
      action: 'UPDATE_DRAFT',
      resource: 'notices',
      resourceId: noticeId,
      oldValue: { draft_title: existing.draft_title, has_unpublished_draft: existing.has_unpublished_draft },
      newValue: { draft_title: updated.draft_title, has_unpublished_draft: true },
    });

    res.json({
      message: 'Notice draft updated successfully. Live notice remains unchanged until published.',
      notice: updated,
    });
  } catch (err) {
    logger.error('Error updating notice draft', { err, noticeId: req.params.id });
    res.status(500).json({ error: 'Internal server error updating notice draft.' });
  }
}

// ── 5. PATCH /v1/notices/:id/publish [FIX #2] ────────────────────────────────

export async function publishNotice(req: Request, res: Response): Promise<void> {
  try {
    const noticeId = parseInt(req.params.id as string, 10);
    if (isNaN(noticeId)) {
      res.status(400).json({ error: 'Invalid notice ID.' });
      return;
    }

    const existing = await prisma.notice.findUnique({ where: { id: noticeId } });
    if (!existing) {
      res.status(404).json({ error: 'Notice not found.' });
      return;
    }

    // Atomically copy draft fields to live fields
    const publishedTitle = existing.draft_title ?? existing.title;
    const publishedCategory = existing.draft_category !== undefined ? existing.draft_category : existing.category;
    const publishedLinkUrl = existing.draft_link_url !== undefined ? existing.draft_link_url : existing.link_url;
    const publishedFileUrl = existing.draft_file_url !== undefined ? existing.draft_file_url : existing.file_url;
    const publishedDate = existing.draft_notice_date ?? existing.notice_date;

    const published = await prisma.notice.update({
      where: { id: noticeId },
      data: {
        title: publishedTitle,
        category: publishedCategory,
        link_url: publishedLinkUrl,
        file_url: publishedFileUrl,
        notice_date: publishedDate,
        status: ContentStatus.published,
        has_unpublished_draft: false,
        updater: { connect: { id: req.user!.id } },
      },
    });

    // Audit log
    await createAuditLog({
      req,
      action: 'PUBLISH',
      resource: 'notices',
      resourceId: noticeId,
      oldValue: { status: existing.status, title: existing.title },
      newValue: { status: ContentStatus.published, title: published.title },
    });

    res.json({
      message: 'Notice published successfully.',
      notice: published,
    });
  } catch (err) {
    logger.error('Error publishing notice', { err, noticeId: req.params.id });
    res.status(500).json({ error: 'Internal server error publishing notice.' });
  }
}

// ── 6. PATCH /v1/notices/:id/archive ─────────────────────────────────────────

export async function archiveNotice(req: Request, res: Response): Promise<void> {
  try {
    const noticeId = parseInt(req.params.id as string, 10);
    if (isNaN(noticeId)) {
      res.status(400).json({ error: 'Invalid notice ID.' });
      return;
    }

    const existing = await prisma.notice.findUnique({ where: { id: noticeId } });
    if (!existing) {
      res.status(404).json({ error: 'Notice not found.' });
      return;
    }

    const archived = await prisma.notice.update({
      where: { id: noticeId },
      data: {
        status: ContentStatus.archived,
        updater: { connect: { id: req.user!.id } },
      },
    });

    // Audit log
    await createAuditLog({
      req,
      action: 'ARCHIVE',
      resource: 'notices',
      resourceId: noticeId,
      oldValue: { status: existing.status },
      newValue: { status: ContentStatus.archived },
    });

    res.json({
      message: 'Notice archived successfully.',
      notice: archived,
    });
  } catch (err) {
    logger.error('Error archiving notice', { err, noticeId: req.params.id });
    res.status(500).json({ error: 'Internal server error archiving notice.' });
  }
}

// ── 7. DELETE /v1/notices/:id (Admin Only) ───────────────────────────────────

export async function deleteNotice(req: Request, res: Response): Promise<void> {
  try {
    const noticeId = parseInt(req.params.id as string, 10);
    if (isNaN(noticeId)) {
      res.status(400).json({ error: 'Invalid notice ID.' });
      return;
    }

    const existing = await prisma.notice.findUnique({ where: { id: noticeId } });
    if (!existing) {
      res.status(404).json({ error: 'Notice not found.' });
      return;
    }

    await prisma.notice.delete({ where: { id: noticeId } });

    // Audit log
    await createAuditLog({
      req,
      action: 'DELETE',
      resource: 'notices',
      resourceId: noticeId,
      oldValue: { title: existing.title, category: existing.category, status: existing.status },
    });

    res.json({ message: 'Notice deleted successfully.' });
  } catch (err) {
    logger.error('Error deleting notice', { err, noticeId: req.params.id });
    res.status(500).json({ error: 'Internal server error deleting notice.' });
  }
}
