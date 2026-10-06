/**
 * src/controllers/news.controller.ts
 *
 * News CMS Controller (Section 5.4)
 *
 * Features:
 *   1. Working Copy Draft Pattern [FIX #2] (draft_* isolated from public view until published)
 *   2. Server-Side MySQL Full-Text Search [FIX #5] (MATCH ... AGAINST in boolean mode)
 *   3. Audit Trail Logging [FIX #3]
 */

import { Request, Response } from 'express';
import { ContentStatus, Prisma } from '@prisma/client';
import prisma from '../config/prisma';
import { createAuditLog } from '../middlewares/audit';
import { logger } from '../utils/logger';

// ── 1. GET /v1/news ──────────────────────────────────────────────────────────

export async function listNews(req: Request, res: Response): Promise<void> {
  try {
    const page = Math.max(1, parseInt(req.query.page as string, 10) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit as string, 10) || 20));
    const skip = (page - 1) * limit;

    const requestedStatus = req.query.status as ContentStatus | undefined;
    const search = (req.query.search as string | undefined)?.trim();

    const isPrivileged = req.user && (req.user.role === 'admin' || req.user.role === 'editor');
    const effectiveStatus: ContentStatus | undefined = isPrivileged
      ? (requestedStatus && Object.values(ContentStatus).includes(requestedStatus) ? requestedStatus : undefined)
      : ContentStatus.published;

    // Full-Text Search Path [FIX #5]
    if (search) {
      const booleanSearchTerm = search
        .split(/\s+/)
        .map((term) => `${term.replace(/[+\-><()~*"]/g, '')}*`)
        .join(' ');

      const countSql = Prisma.sql`
        SELECT COUNT(*) AS total
        FROM news
        WHERE MATCH(title) AGAINST(${booleanSearchTerm} IN BOOLEAN MODE)
          ${effectiveStatus ? Prisma.sql`AND status = ${effectiveStatus}` : Prisma.empty}
      `;

      const listSql = Prisma.sql`
        SELECT id, title, excerpt, link_url, file_url, news_date, status,
               draft_title, draft_excerpt, draft_link_url, draft_file_url, draft_news_date, has_unpublished_draft,
               created_by, updated_by, created_at, updated_at
        FROM news
        WHERE MATCH(title) AGAINST(${booleanSearchTerm} IN BOOLEAN MODE)
          ${effectiveStatus ? Prisma.sql`AND status = ${effectiveStatus}` : Prisma.empty}
        ORDER BY news_date DESC, id DESC
        LIMIT ${limit} OFFSET ${skip}
      `;

      const [countResult, news] = await Promise.all([
        prisma.$queryRaw<[{ total: bigint | number }]>(countSql),
        prisma.$queryRaw<any[]>(listSql),
      ]);

      const total = Number(countResult[0]?.total || 0);

      const formattedNews = news.map((item) => {
        if (!isPrivileged) {
          const { draft_title, draft_excerpt, draft_link_url, draft_file_url, draft_news_date, has_unpublished_draft, ...publicFields } = item;
          return publicFields;
        }
        return item;
      });

      res.json({
        news: formattedNews,
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
    const where: Prisma.NewsWhereInput = {};
    if (effectiveStatus) {
      where.status = effectiveStatus;
    }

    const [total, news] = await Promise.all([
      prisma.news.count({ where }),
      prisma.news.findMany({
        where,
        skip,
        take: limit,
        orderBy: [{ news_date: 'desc' }, { id: 'desc' }],
        include: {
          creator: { select: { id: true, name: true, email: true } },
          updater: { select: { id: true, name: true, email: true } },
        },
      }),
    ]);

    const formattedNews = news.map((item) => {
      if (!isPrivileged) {
        const { draft_title, draft_excerpt, draft_link_url, draft_file_url, draft_news_date, has_unpublished_draft, ...publicFields } = item;
        return publicFields;
      }
      return item;
    });

    res.json({
      news: formattedNews,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (err) {
    logger.error('Error listing news', { err });
    res.status(500).json({ error: 'Internal server error listing news.' });
  }
}

// ── 2. GET /v1/news/:id ──────────────────────────────────────────────────────

export async function getNewsById(req: Request, res: Response): Promise<void> {
  try {
    const newsId = parseInt(req.params.id as string, 10);
    if (isNaN(newsId)) {
      res.status(400).json({ error: 'Invalid news ID.' });
      return;
    }

    const item = await prisma.news.findUnique({
      where: { id: newsId },
      include: {
        creator: { select: { id: true, name: true, email: true } },
        updater: { select: { id: true, name: true, email: true } },
      },
    });

    if (!item) {
      res.status(404).json({ error: 'News item not found.' });
      return;
    }

    const isPrivileged = req.user && (req.user.role === 'admin' || req.user.role === 'editor');

    if (!isPrivileged && item.status !== ContentStatus.published) {
      res.status(404).json({ error: 'News item not found.' });
      return;
    }

    if (!isPrivileged) {
      const { draft_title, draft_excerpt, draft_link_url, draft_file_url, draft_news_date, has_unpublished_draft, ...publicFields } = item;
      res.json({ news: publicFields });
      return;
    }

    res.json({ news: item });
  } catch (err) {
    logger.error('Error fetching news by ID', { err, newsId: req.params.id });
    res.status(500).json({ error: 'Internal server error fetching news.' });
  }
}

// ── 3. POST /v1/news ─────────────────────────────────────────────────────────

export async function createNews(req: Request, res: Response): Promise<void> {
  try {
    const { title, excerpt, link_url, file_url, news_date } = req.body;

    if (!title || typeof title !== 'string' || !title.trim()) {
      res.status(400).json({ error: 'Title is required.' });
      return;
    }

    if (!news_date) {
      res.status(400).json({ error: 'News date is required.' });
      return;
    }

    const parsedDate = new Date(news_date);
    if (isNaN(parsedDate.getTime())) {
      res.status(400).json({ error: 'Invalid news date format.' });
      return;
    }

    const cleanTitle = title.trim();
    const cleanExcerpt = excerpt ? String(excerpt).trim() : null;
    const cleanLinkUrl = link_url ? String(link_url).trim() : null;
    const cleanFileUrl = file_url ? String(file_url).trim() : null;

    const news = await prisma.news.create({
      data: {
        title: cleanTitle,
        excerpt: cleanExcerpt,
        link_url: cleanLinkUrl,
        file_url: cleanFileUrl,
        news_date: parsedDate,
        status: ContentStatus.draft,
        draft_title: cleanTitle,
        draft_excerpt: cleanExcerpt,
        draft_link_url: cleanLinkUrl,
        draft_file_url: cleanFileUrl,
        draft_news_date: parsedDate,
        has_unpublished_draft: false,
        created_by: req.user!.id,
        updated_by: req.user!.id,
      },
    });

    await createAuditLog({
      req,
      action: 'CREATE',
      resource: 'news',
      resourceId: news.id,
      newValue: { title: news.title, status: news.status },
    });

    res.status(201).json({
      message: 'News item created as draft.',
      news,
    });
  } catch (err) {
    logger.error('Error creating news item', { err, body: req.body });
    res.status(500).json({ error: 'Internal server error creating news item.' });
  }
}

// ── 4. PATCH /v1/news/:id (Update Working-Copy Draft) [FIX #2] ───────────────

export async function updateNewsDraft(req: Request, res: Response): Promise<void> {
  try {
    const newsId = parseInt(req.params.id as string, 10);
    if (isNaN(newsId)) {
      res.status(400).json({ error: 'Invalid news ID.' });
      return;
    }

    const existing = await prisma.news.findUnique({ where: { id: newsId } });
    if (!existing) {
      res.status(404).json({ error: 'News item not found.' });
      return;
    }

    const { title, excerpt, link_url, file_url, news_date } = req.body;

    if (title === undefined && excerpt === undefined && link_url === undefined && file_url === undefined && news_date === undefined) {
      res.status(400).json({ error: 'Provide at least one field to update.' });
      return;
    }

    const draftData: Prisma.NewsUpdateInput = {
      has_unpublished_draft: true,
      updater: { connect: { id: req.user!.id } },
    };

    if (title !== undefined) draftData.draft_title = String(title).trim();
    if (excerpt !== undefined) draftData.draft_excerpt = excerpt ? String(excerpt).trim() : null;
    if (link_url !== undefined) draftData.draft_link_url = link_url ? String(link_url).trim() : null;
    if (file_url !== undefined) draftData.draft_file_url = file_url ? String(file_url).trim() : null;
    if (news_date !== undefined) {
      const parsedDate = new Date(news_date);
      if (isNaN(parsedDate.getTime())) {
        res.status(400).json({ error: 'Invalid news date format.' });
        return;
      }
      draftData.draft_news_date = parsedDate;
    }

    const updated = await prisma.news.update({
      where: { id: newsId },
      data: draftData,
    });

    await createAuditLog({
      req,
      action: 'UPDATE_DRAFT',
      resource: 'news',
      resourceId: newsId,
      oldValue: { draft_title: existing.draft_title, has_unpublished_draft: existing.has_unpublished_draft },
      newValue: { draft_title: updated.draft_title, has_unpublished_draft: true },
    });

    res.json({
      message: 'News draft updated successfully. Live news remains unchanged until published.',
      news: updated,
    });
  } catch (err) {
    logger.error('Error updating news draft', { err, newsId: req.params.id });
    res.status(500).json({ error: 'Internal server error updating news draft.' });
  }
}

// ── 5. PATCH /v1/news/:id/publish [FIX #2] ───────────────────────────────────

export async function publishNews(req: Request, res: Response): Promise<void> {
  try {
    const newsId = parseInt(req.params.id as string, 10);
    if (isNaN(newsId)) {
      res.status(400).json({ error: 'Invalid news ID.' });
      return;
    }

    const existing = await prisma.news.findUnique({ where: { id: newsId } });
    if (!existing) {
      res.status(404).json({ error: 'News item not found.' });
      return;
    }

    const publishedTitle = existing.draft_title ?? existing.title;
    const publishedExcerpt = existing.draft_excerpt !== undefined ? existing.draft_excerpt : existing.excerpt;
    const publishedLinkUrl = existing.draft_link_url !== undefined ? existing.draft_link_url : existing.link_url;
    const publishedFileUrl = existing.draft_file_url !== undefined ? existing.draft_file_url : existing.file_url;
    const publishedDate = existing.draft_news_date ?? existing.news_date;

    const published = await prisma.news.update({
      where: { id: newsId },
      data: {
        title: publishedTitle,
        excerpt: publishedExcerpt,
        link_url: publishedLinkUrl,
        file_url: publishedFileUrl,
        news_date: publishedDate,
        status: ContentStatus.published,
        has_unpublished_draft: false,
        updater: { connect: { id: req.user!.id } },
      },
    });

    await createAuditLog({
      req,
      action: 'PUBLISH',
      resource: 'news',
      resourceId: newsId,
      oldValue: { status: existing.status, title: existing.title },
      newValue: { status: ContentStatus.published, title: published.title },
    });

    res.json({
      message: 'News published successfully.',
      news: published,
    });
  } catch (err) {
    logger.error('Error publishing news', { err, newsId: req.params.id });
    res.status(500).json({ error: 'Internal server error publishing news.' });
  }
}

// ── 6. PATCH /v1/news/:id/archive ────────────────────────────────────────────

export async function archiveNews(req: Request, res: Response): Promise<void> {
  try {
    const newsId = parseInt(req.params.id as string, 10);
    if (isNaN(newsId)) {
      res.status(400).json({ error: 'Invalid news ID.' });
      return;
    }

    const existing = await prisma.news.findUnique({ where: { id: newsId } });
    if (!existing) {
      res.status(404).json({ error: 'News item not found.' });
      return;
    }

    const archived = await prisma.news.update({
      where: { id: newsId },
      data: {
        status: ContentStatus.archived,
        updater: { connect: { id: req.user!.id } },
      },
    });

    await createAuditLog({
      req,
      action: 'ARCHIVE',
      resource: 'news',
      resourceId: newsId,
      oldValue: { status: existing.status },
      newValue: { status: ContentStatus.archived },
    });

    res.json({
      message: 'News archived successfully.',
      news: archived,
    });
  } catch (err) {
    logger.error('Error archiving news', { err, newsId: req.params.id });
    res.status(500).json({ error: 'Internal server error archiving news.' });
  }
}

// ── 7. DELETE /v1/news/:id (Admin Only) ──────────────────────────────────────

export async function deleteNews(req: Request, res: Response): Promise<void> {
  try {
    const newsId = parseInt(req.params.id as string, 10);
    if (isNaN(newsId)) {
      res.status(400).json({ error: 'Invalid news ID.' });
      return;
    }

    const existing = await prisma.news.findUnique({ where: { id: newsId } });
    if (!existing) {
      res.status(404).json({ error: 'News item not found.' });
      return;
    }

    await prisma.news.delete({ where: { id: newsId } });

    await createAuditLog({
      req,
      action: 'DELETE',
      resource: 'news',
      resourceId: newsId,
      oldValue: { title: existing.title, status: existing.status },
    });

    res.json({ message: 'News item deleted successfully.' });
  } catch (err) {
    logger.error('Error deleting news item', { err, newsId: req.params.id });
    res.status(500).json({ error: 'Internal server error deleting news item.' });
  }
}
