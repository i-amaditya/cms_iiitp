/**
 * alumni.seed.ts — Seeds `alumni` from src/data/alumni.json
 *
 * Source JSON shape:
 * {
 *   intro: "...",
 *   higherEducation: {
 *     abroad: [ { name, branchYear, university, degree } ],
 *     india:  [ { name, branchYear, university, degree } ]
 *   },
 *   placements: {
 *     batch2017_2021: [ { name, company } ],
 *     batch2018_2022: [ { name, company } ],
 *     ...
 *   }
 * }
 */
import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

const JSON_PATH = path.resolve(__dirname, '../../../src/data/alumni.json');

export async function seed(prisma: PrismaClient) {
  const raw = JSON.parse(fs.readFileSync(JSON_PATH, 'utf-8'));

  interface AlumniRecord {
    name: string;
    branch_year?: string;
    alumni_type: string;
    university?: string;
    degree?: string;
    company?: string;
    batch?: string;
    display_order: number;
  }
  const records: AlumniRecord[] = [];

  for (const [i, a] of (raw.higherEducation?.abroad ?? []).entries()) {
    records.push({ name: a.name, branch_year: a.branchYear, alumni_type: 'higher_ed_abroad', university: a.university, degree: a.degree, display_order: i });
  }

  for (const [i, a] of (raw.higherEducation?.india ?? []).entries()) {
    records.push({ name: a.name, branch_year: a.branchYear, alumni_type: 'higher_ed_india', university: a.university, degree: a.degree, display_order: i });
  }

  // Dynamic batch keys: batch2017_2021, batch2018_2022, etc.
  const placements = raw.placements ?? {};
  for (const [batch, list] of Object.entries(placements)) {
    for (const [i, a] of (list as Array<{ name: string; company: string }>).entries()) {
      records.push({ name: a.name, alumni_type: 'placement', batch, company: a.company, display_order: i });
    }
  }

  console.log(`  🎓 Seeding ${records.length} alumni records...`);
  await prisma.alumni.deleteMany();
  await prisma.alumni.createMany({ data: records, skipDuplicates: true });
  console.log(`  ✅ Alumni seeded`);
}
