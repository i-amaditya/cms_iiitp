/**
 * faculty.seed.ts — Seeds `faculty_profiles` + all child tables from src/data/faculty_details.json
 *
 * Source JSON shape (object keyed by slug):
 * {
 *   "<slug>": {
 *     designation, image, bio, education, expertise, email, phone,
 *     linkedin, google_scholar, orcid, scopus, resume, department,
 *     publications[]: { title, authors, journal, link },
 *     books_chapters[]: { title, authors?, journal? },
 *     patents: "" | string | Array<{title}>,
 *     seminars[]: { title, authors (=event name), journal (=venue/date) },  ← misleading field names in source!
 *     projects[]: { title },    ← often a single long text blob
 *     supervisions[]: { title } ← often a single long text blob
 *   }
 * }
 */
import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

const JSON_PATH = path.resolve(__dirname, '../../../src/data/faculty_details.json');

type FacultyEntry = {
  designation?: string;
  image?: string;
  bio?: string;
  education?: string;
  expertise?: string;
  email?: string;
  phone?: string;
  linkedin?: string;
  google_scholar?: string;
  orcid?: string;
  scopus?: string;
  resume?: string;
  department?: string;
  publications?: Array<{ title: string; authors?: string; journal?: string; link?: string }>;
  // NOTE: books_chapters, seminars, projects, supervisions can each be "" (empty string) in the
  // source JSON instead of []. normalizeArray() handles this safely.
  books_chapters?: Array<{ title: string; authors?: string; journal?: string }> | string;
  patents?: string | Array<{ title: string }>;
  seminars?: Array<{ title: string; authors?: string; journal?: string }> | string;
  projects?: Array<{ title: string }> | string;
  supervisions?: Array<{ title: string }> | string;
  // researchLinks exists in JSON but has no DB column — intentionally not seeded.
  researchLinks?: unknown[];
};

function normalizeArray<T>(input: Array<T> | string | undefined): Array<T> {
  if (Array.isArray(input)) return input;
  return [];
}

function normalizeUrl(url: string | undefined): string | null {
  return url && url.trim() !== '' && url !== '#' ? url : null;
}

export async function seed(prisma: PrismaClient) {
  const raw: Record<string, FacultyEntry> = JSON.parse(fs.readFileSync(JSON_PATH, 'utf-8'));
  const slugs = Object.keys(raw);

  console.log(`  👩‍🏫 Seeding ${slugs.length} faculty profiles...`);

  for (const slug of slugs) {
    const f = raw[slug];
    if (!f.email) {
      console.warn(`    ⚠️  Skipping ${slug} — no email field`);
      continue;
    }

    // Derive display name from slug: "bhupendra-singh" → "Bhupendra Singh"
    const name = slug.split('-').map(w => w[0].toUpperCase() + w.slice(1)).join(' ');

    const profile = await prisma.facultyProfile.upsert({
      where: { slug },
      create: {
        slug,
        email: f.email,
        name,
        designation: f.designation ?? null,
        department: f.department ?? null,
        bio: f.bio ?? null,
        education: f.education ?? null,
        expertise: f.expertise ?? null,
        phone: f.phone ?? null,
        linkedin_url: normalizeUrl(f.linkedin),
        google_scholar: normalizeUrl(f.google_scholar),
        orcid: normalizeUrl(f.orcid),
        scopus_url: normalizeUrl(f.scopus),
        resume_url: normalizeUrl(f.resume),
        photo_url: f.image ?? null,
        is_published: true,
      },
      update: {}, // don't overwrite on re-run
    });

    // Publications (journal / conference)
    const pubs = normalizeArray(f.publications);
    if (pubs.length) {
      await prisma.facultyPublication.createMany({
        data: pubs.map((p, idx) => ({
          faculty_id: profile.id,
          title: p.title,
          authors: p.authors ?? null,
          journal: p.journal ?? null,
          doi_or_link: p.link ?? null,
          pub_type: 'journal',
          display_order: idx,
        })),
        skipDuplicates: true,
      });
    }

    // Book chapters
    const chapters = normalizeArray(f.books_chapters as Array<{ title: string; authors?: string; journal?: string }>);
    if (chapters.length) {
      await prisma.facultyPublication.createMany({
        data: chapters.map((c, idx) => ({
          faculty_id: profile.id,
          title: c.title,
          authors: c.authors ?? null,
          journal: c.journal ?? null,
          pub_type: 'book_chapter',
          display_order: idx,
        })),
        skipDuplicates: true,
      });
    }

    // Seminars — source JSON uses 'authors' for event name, 'journal' for venue (misleading field names)
    const seminars = normalizeArray(f.seminars);
    if (seminars.length) {
      await prisma.facultySeminar.createMany({
        data: seminars.map((s, idx) => ({
          faculty_id: profile.id,
          title: s.title,
          event_name: s.authors ?? null,  // misnamed in source JSON
          venue: s.journal ?? null,        // misnamed in source JSON
          display_order: idx,
        })),
        skipDuplicates: true,
      });
    }

    // Projects (often a single long text blob in 'title')
    const projects = normalizeArray(f.projects as Array<{ title: string }>);
    if (projects.length) {
      await prisma.facultyProject.createMany({
        data: projects.map((p, idx) => ({
          faculty_id: profile.id,
          title: p.title,
          display_order: idx,
        })),
        skipDuplicates: true,
      });
    }

    // Supervisions (often a single long text blob in 'title')
    const sups = normalizeArray(f.supervisions as Array<{ title: string }>);
    if (sups.length) {
      await prisma.facultySupervision.createMany({
        data: sups.map((s, idx) => ({
          faculty_id: profile.id,
          student_name: s.title, // blob stored in student_name field for now
          display_order: idx,
        })),
        skipDuplicates: true,
      });
    }

    // Patents — can be empty string, plain string, or Array<{title}>
    if (f.patents && typeof f.patents === 'string' && f.patents.trim()) {
      await prisma.facultyPatent.create({
        data: { faculty_id: profile.id, title: f.patents },
      });
    } else if (Array.isArray(f.patents)) {
      for (const [idx, p] of (f.patents as Array<{ title: string }>).entries()) {
        await prisma.facultyPatent.create({
          data: { faculty_id: profile.id, title: p.title, display_order: idx },
        });
      }
    }
  }

  console.log(`  ✅ Faculty seeded (${slugs.length} profiles)`);
}
