/**
 * prisma/seed/notices.seed.ts
 *
 * Imports notices from src/data/notices.json into the MySQL notices table.
 */

import path from 'path';
import fs from 'fs';
import { ContentStatus } from '@prisma/client';
import prisma from '../../src/config/prisma';
import { logger } from '../../src/utils/logger';

interface RawNotice {
  id?: number;
  title: string;
  date?: string;
  category?: string;
  link?: string;
}

function parseNoticeDate(dateStr?: string): Date {
  if (!dateStr) return new Date();
  const parts = dateStr.split(/[-./]/);
  if (parts.length === 3) {
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    const year = parseInt(parts[2], 10);
    if (!isNaN(day) && !isNaN(month) && !isNaN(year)) {
      return new Date(Date.UTC(year, month, day));
    }
  }
  const parsed = new Date(dateStr);
  return isNaN(parsed.getTime()) ? new Date() : parsed;
}

export async function seedNotices(): Promise<number> {
  const filePath = path.resolve(process.cwd(), '../src/data/notices.json');
  if (!fs.existsSync(filePath)) {
    logger.warn('notices.json not found at ' + filePath);
    return 0;
  }

  const rawData: RawNotice[] = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  logger.info(`Found ${rawData.length} notices in JSON to seed...`);

  await prisma.notice.deleteMany({});

  let count = 0;
  for (const item of rawData) {
    if (!item.title) continue;

    const isPdf = Boolean(item.link?.toLowerCase().endsWith('.pdf'));
    const noticeDate = parseNoticeDate(item.date);

    await prisma.notice.create({
      data: {
        title: item.title.trim(),
        category: item.category ? item.category.trim() : null,
        notice_date: noticeDate,
        file_url: isPdf ? item.link?.trim() : null,
        link_url: !isPdf ? item.link?.trim() : null,
        status: ContentStatus.published,
        draft_title: item.title.trim(),
        draft_category: item.category ? item.category.trim() : null,
        draft_notice_date: noticeDate,
        draft_file_url: isPdf ? item.link?.trim() : null,
        draft_link_url: !isPdf ? item.link?.trim() : null,
        has_unpublished_draft: false,
      },
    });
    count++;
  }

  logger.info(`✅ Seeded ${count} notices into MySQL.`);
  return count;
}
