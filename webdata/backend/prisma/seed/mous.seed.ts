/**
 * mous.seed.ts — Seeds `mous` from src/data/mous.json
 * Shape: [ { id, year, organization, logo, department, signedDate, validTill, description, tags[], gallery[] } ]
 */
import { PrismaClient, Prisma } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

const JSON_PATH = path.resolve(__dirname, '../../../src/data/mous.json');

export async function seed(prisma: PrismaClient) {
  const raw: Array<{
    id: number; year: number; organization: string; logo?: string;
    department?: string; signedDate?: string; validTill?: string;
    description?: string; tags?: string[]; gallery?: string[];
  }> = JSON.parse(fs.readFileSync(JSON_PATH, 'utf-8'));

  console.log(`  🤝 Seeding ${raw.length} MoUs...`);
  for (const m of raw) {
    await prisma.mou.upsert({
      where: { id: m.id },
      create: {
        id: m.id,
        organization: m.organization,
        department: m.department ?? null,
        signed_date: m.signedDate ?? null,
        valid_till: m.validTill ?? null,
        description: m.description ?? null,
        logo_url: m.logo ?? null,
        year: m.year ?? null,
        tags: m.tags ?? Prisma.JsonNull,
        gallery_urls: m.gallery ?? Prisma.JsonNull,
        is_active: true,
      },
      update: {},
    });
  }
  console.log(`  ✅ MoUs seeded (${raw.length} records)`);
}
