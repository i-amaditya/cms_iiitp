/**
 * prisma/seed/news.seed.ts
 *
 * Imports news from src/data/news.json into the MySQL news table.
 */

import path from 'path';
import fs from 'fs';
import { ContentStatus } from '@prisma/client';
import prisma from '../../src/config/prisma';
import { logger } from '../../src/utils/logger';

interface RawNews {
  id?: number;
  title: string;
  date?: string;
  excerpt?: string;
  link?: string;
}

function parseNewsDate(dateStr?: string): Date {
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

export async function seedNews(): Promise<number> {
  const filePath = path.resolve(process.cwd(), '../src/data/news.json');
  if (!fs.existsSync(filePath)) {
    logger.warn('news.json not found at ' + filePath);
    return 0;
  }

  const rawData: RawNews[] = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  logger.info(`Found ${rawData.length} news items in JSON to seed...`);

  await prisma.news.deleteMany({});

  let count = 0;
  for (const item of rawData) {
    if (!item.title) continue;

    const isPdf = Boolean(item.link?.toLowerCase().endsWith('.pdf'));
    const newsDate = parseNewsDate(item.date);

    await prisma.news.create({
      data: {
        title: item.title.trim(),
        excerpt: item.excerpt ? item.excerpt.trim() : null,
        news_date: newsDate,
        file_url: isPdf ? item.link?.trim() : null,
        link_url: !isPdf ? item.link?.trim() : null,
        status: ContentStatus.published,
        draft_title: item.title.trim(),
        draft_excerpt: item.excerpt ? item.excerpt.trim() : null,
        draft_news_date: newsDate,
        draft_file_url: isPdf ? item.link?.trim() : null,
        draft_link_url: !isPdf ? item.link?.trim() : null,
        has_unpublished_draft: false,
      },
    });
    count++;
  }

  logger.info(`✅ Seeded ${count} news items into MySQL.`);
  return count;
}
