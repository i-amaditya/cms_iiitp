/**
 * non_teaching_staff.seed.ts — Seeds `non_teaching_staff` from src/data/non_teaching_staff.json
 * Shape: [ { name, designation, department, departmentShort, image, email, type } ]
 */
import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

const JSON_PATH = path.resolve(__dirname, '../../../src/data/non_teaching_staff.json');

export async function seed(prisma: PrismaClient) {
  const raw: Array<{
    name: string; designation?: string; department?: string;
    departmentShort?: string; image?: string; email?: string; type?: string;
  }> = JSON.parse(fs.readFileSync(JSON_PATH, 'utf-8'));

  console.log(`  👤 Seeding ${raw.length} non-teaching staff...`);
  await prisma.nonTeachingStaff.deleteMany();
  await prisma.nonTeachingStaff.createMany({
    data: raw.map((s, i) => ({
      name: s.name,
      designation: s.designation ?? null,
      department: s.department ?? null,
      department_short: s.departmentShort ?? null,
      photo_url: s.image ?? null,
      email: s.email ?? null,
      staff_type: s.type ?? 'Regular',
      display_order: i,
      is_active: true,
    })),
    skipDuplicates: true,
  });
  console.log(`  ✅ Non-teaching staff seeded (${raw.length} records)`);
}
