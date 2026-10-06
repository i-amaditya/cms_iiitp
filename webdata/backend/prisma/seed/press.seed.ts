/**
 * press.seed.ts — Seeds `press_coverage` from src/data/press.json
 *
 * Source JSON shape:
 * [ { date: "13th August 2026", title, desc, articles: [ { publisher, link } ] } ]
 *
 * Design decision: articles stored as JSON array on the story row to avoid an
 * unnecessary join table for this simple use case.
 */
import { PrismaClient, Prisma } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

const JSON_PATH = path.resolve(__dirname, '../../../src/data/press.json');

export async function seed(prisma: PrismaClient) {
  const raw: Array<{
    date: string;
    title: string;
    desc?: string;
    articles?: Array<{ publisher: string; link: string }>;
  }> = JSON.parse(fs.readFileSync(JSON_PATH, 'utf-8'));

  console.log(`  📰 Seeding ${raw.length} press coverage stories...`);
  await prisma.pressCoverage.deleteMany();
  await prisma.pressCoverage.createMany({
    data: raw.map(p => ({
      title: p.title,
      press_date: p.date ?? null,
      description: p.desc ?? null,
      articles: p.articles ?? Prisma.JsonNull,
      is_active: true,
    })),
    skipDuplicates: true,
  });
  console.log(`  ✅ Press coverage seeded (${raw.length} records)`);
}
