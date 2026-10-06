/**
 * scholarships.seed.ts — Seeds `scholarships` from src/data/scholarshipsData.json
 * Shape: [ { sr, category, scheme, governedBy, link } ]
 */
import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

const JSON_PATH = path.resolve(__dirname, '../../../src/data/scholarshipsData.json');

export async function seed(prisma: PrismaClient) {
  const raw: Array<{
    sr: number; category: string; scheme: string; governedBy: string; link: string;
  }> = JSON.parse(fs.readFileSync(JSON_PATH, 'utf-8'));

  console.log(`  📚 Seeding ${raw.length} scholarships...`);
  await prisma.scholarship.deleteMany();
  await prisma.scholarship.createMany({
    data: raw.map(s => ({
      sr_no: s.sr,
      category: s.category,
      scheme_name: s.scheme,
      governed_by: s.governedBy,
      link_url: s.link,
      is_active: true,
    })),
    skipDuplicates: true,
  });
  console.log(`  ✅ Scholarships seeded (${raw.length} records)`);
}
