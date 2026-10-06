/**
 * prisma/seed/etenders.seed.ts
 *
 * Imports e-tenders from src/data/etenders.json into the MySQL etenders table.
 */

import path from 'path';
import fs from 'fs';
import { ContentStatus } from '@prisma/client';
import prisma from '../../src/config/prisma';
import { logger } from '../../src/utils/logger';

interface RawEtender {
  title: string;
  tenderNumber?: string;
  fileUrl?: string;
  fileText?: string;
  corrigendumUrl?: string;
  corrigendumText?: string;
  submissionDate?: string;
}

interface RawEtendersFile {
  live?: RawEtender[];
  past?: RawEtender[];
}

export async function seedEtenders(): Promise<number> {
  const filePath = path.resolve(process.cwd(), '../src/data/etenders.json');
  if (!fs.existsSync(filePath)) {
    logger.warn('etenders.json not found at ' + filePath);
    return 0;
  }

  const rawData: RawEtendersFile = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  const liveList = rawData.live || [];
  const pastList = rawData.past || [];

  logger.info(`Found ${liveList.length} live and ${pastList.length} past e-tenders in JSON to seed...`);

  await prisma.etender.deleteMany({});

  let count = 0;

  async function insertGroup(items: RawEtender[], type: 'live' | 'past') {
    for (const item of items) {
      if (!item.title) continue;

      await prisma.etender.create({
        data: {
          title: item.title.trim(),
          tender_number: item.tenderNumber ? item.tenderNumber.trim() : null,
          tender_type: type,
          file_url: item.fileUrl ? item.fileUrl.trim() : null,
          corrigendum_url: item.corrigendumUrl ? item.corrigendumUrl.trim() : null,
          submission_date: item.submissionDate ? item.submissionDate.trim() : null,
          status: ContentStatus.published,
          draft_title: item.title.trim(),
          draft_file_url: item.fileUrl ? item.fileUrl.trim() : null,
          draft_corrigendum_url: item.corrigendumUrl ? item.corrigendumUrl.trim() : null,
          has_unpublished_draft: false,
        },
      });
      count++;
    }
  }

  await insertGroup(liveList, 'live');
  await insertGroup(pastList, 'past');

  logger.info(`✅ Seeded ${count} e-tenders into MySQL.`);
  return count;
}
