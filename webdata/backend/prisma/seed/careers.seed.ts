/**
 * prisma/seed/careers.seed.ts
 *
 * Imports careers and nested action buttons from src/data/careers.json into MySQL tables.
 */

import path from 'path';
import fs from 'fs';
import { ContentStatus } from '@prisma/client';
import prisma from '../../src/config/prisma';
import { logger } from '../../src/utils/logger';

interface RawCareerButton {
  label: string;
  file?: string;
  link?: string;
}

interface RawCareer {
  title: string;
  date?: string;
  lastDate?: string;
  buttons?: RawCareerButton[];
}

interface RawCareersFile {
  live?: RawCareer[];
  past?: RawCareer[];
}

function parseLastDate(dateStr?: string): Date | null {
  if (!dateStr) return null;
  // Supports DD-MM-YYYY or DD.MM.YYYY
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
  return isNaN(parsed.getTime()) ? null : parsed;
}

export async function seedCareers(): Promise<number> {
  const filePath = path.resolve(process.cwd(), '../src/data/careers.json');
  if (!fs.existsSync(filePath)) {
    logger.warn('careers.json not found at ' + filePath);
    return 0;
  }

  const rawData: RawCareersFile = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  const liveList = rawData.live || [];
  const pastList = rawData.past || [];

  logger.info(`Found ${liveList.length} live and ${pastList.length} past careers in JSON to seed...`);

  await prisma.careerButton.deleteMany({});
  await prisma.career.deleteMany({});

  let count = 0;

  async function insertGroup(items: RawCareer[], type: 'live' | 'past') {
    for (const item of items) {
      if (!item.title) continue;

      const lastDate = parseLastDate(item.lastDate);

      const career = await prisma.career.create({
        data: {
          title: item.title.trim(),
          career_type: type,
          last_date: lastDate,
          status: ContentStatus.published,
          draft_title: item.title.trim(),
          draft_last_date: lastDate,
          has_unpublished_draft: false,
        },
      });

      if (Array.isArray(item.buttons) && item.buttons.length > 0) {
        let order = 0;
        for (const btn of item.buttons) {
          const url = btn.file || btn.link || '#';
          await prisma.careerButton.create({
            data: {
              career_id: career.id,
              label: btn.label || 'Details',
              url: url.trim(),
              display_order: order++,
            },
          });
        }
      }
      count++;
    }
  }

  await insertGroup(liveList, 'live');
  await insertGroup(pastList, 'past');

  logger.info(`✅ Seeded ${count} careers with action buttons into MySQL.`);
  return count;
}
