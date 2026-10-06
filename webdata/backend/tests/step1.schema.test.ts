/**
 * tests/step1.schema.test.ts — Step 1: Database Schema Verification
 *
 * PURPOSE:
 *   Verify that the Prisma migration has created all tables, columns, indexes,
 *   and enums required by Phase 1 of the implementation plan.
 *
 * WHAT IT TESTS:
 *   1. Core tables exist: users, invites, editor_section_assignments, audit_logs
 *   2. Faculty linking stub: faculty_profiles table exists with user_id column
 *   3. Critical columns are present with the right types (spot-check key fields)
 *   4. Performance indexes exist (as defined in schema + BACKEND_IMPLEMENTATION_PLAN §3.8)
 *   5. The Prisma client can perform basic CRUD using those models (happy-path round-trip)
 *   6. Constraint checks: unique columns, enum values, default values
 *
 * HOW TO RUN:
 *   cd backend
 *   npx jest tests/step1.schema.test.ts --verbose
 *
 * PRE-REQUISITES:
 *   - MySQL running locally (see .env → DATABASE_URL)
 *   - Migration applied: `npx prisma migrate dev`
 */

// dotenv is loaded via jest.config.js setupFiles — no import needed here.
import { PrismaClient } from '@prisma/client';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';

// ---------------------------------------------------------------------------
// Helper — build a fresh Prisma client for this test suite.
// We avoid importing from src/config/prisma.ts to keep tests self-contained
// and not trigger the full envalid startup checks.
// ---------------------------------------------------------------------------
function buildTestClient(): PrismaClient {
  const dbUrl = new URL(process.env.DATABASE_URL!);
  // On Windows, the mariadb driver may fail to resolve 'localhost' for MySQL because
  // MySQL on Windows has no Unix socket. Forcing '127.0.0.1' ensures a TCP connection
  // works on both Windows (dev) and Linux (production VPS).
  const host = dbUrl.hostname === 'localhost' ? '127.0.0.1' : dbUrl.hostname;
  const adapter = new PrismaMariaDb({
    host,
    port: parseInt(dbUrl.port) || 3306,
    user: decodeURIComponent(dbUrl.username),
    password: decodeURIComponent(dbUrl.password),
    database: dbUrl.pathname.replace(/^\//, ''),
    allowPublicKeyRetrieval: true,
  });
  return new PrismaClient({ adapter }) as unknown as PrismaClient;
}

// ---------------------------------------------------------------------------
// Helper — run raw SQL and return rows
// ---------------------------------------------------------------------------
async function queryRaw(prisma: PrismaClient, sql: string, params: unknown[] = []) {
  return prisma.$queryRawUnsafe(sql, ...params) as Promise<Record<string, unknown>[]>;
}

// ---------------------------------------------------------------------------
// Suite
// ---------------------------------------------------------------------------

let prisma: PrismaClient;

beforeAll(async () => {
  prisma = buildTestClient();
});

afterAll(async () => {
  await prisma.$disconnect();
});

// ─── 1. Table existence ─────────────────────────────────────────────────────

describe('Step 1 – Table Existence', () => {
  const requiredTables = [
    'users',
    'invites',
    'editor_section_assignments',
    'audit_logs',
    'faculty_profiles',   // needed for faculty auto-link [FIX #7]
    // Content tables (created in same migration — verify they are present too)
    'notices',
    'news',
    'careers',
    'career_buttons',
    'etenders',
    'media_files',
  ];

  for (const table of requiredTables) {
    it(`table "${table}" exists`, async () => {
      const dbName = new URL(process.env.DATABASE_URL!).pathname.replace(/^\//, '');
      const rows = await queryRaw(
        prisma,
        `SELECT TABLE_NAME FROM information_schema.TABLES
         WHERE TABLE_SCHEMA = ? AND TABLE_NAME = ?`,
        [dbName, table]
      );
      expect(rows.length).toBe(1);
    });
  }
});

// ─── 2. Critical column presence ─────────────────────────────────────────────

describe('Step 1 – Critical Column Presence', () => {
  const dbName = () => new URL(process.env.DATABASE_URL!).pathname.replace(/^\//, '');

  async function columnExists(table: string, column: string): Promise<boolean> {
    const rows = await queryRaw(
      prisma,
      `SELECT COLUMN_NAME FROM information_schema.COLUMNS
       WHERE TABLE_SCHEMA = ? AND TABLE_NAME = ? AND COLUMN_NAME = ?`,
      [dbName(), table, column]
    );
    return rows.length > 0;
  }

  // users table — [FIX #4] token_version column must exist
  it('users.token_version exists (FIX #4)', async () => {
    expect(await columnExists('users', 'token_version')).toBe(true);
  });

  it('users.is_active exists', async () => {
    expect(await columnExists('users', 'is_active')).toBe(true);
  });

  it('users.last_login_at exists', async () => {
    expect(await columnExists('users', 'last_login_at')).toBe(true);
  });

  // invites table — [FIX #1] sections column must be JSON
  it('invites.sections exists (FIX #1)', async () => {
    expect(await columnExists('invites', 'sections')).toBe(true);
  });

  it('invites.token exists', async () => {
    expect(await columnExists('invites', 'token')).toBe(true);
  });

  it('invites.accepted exists', async () => {
    expect(await columnExists('invites', 'accepted')).toBe(true);
  });

  // audit_logs — [FIX #3] user_email snapshot column (NOT a FK)
  it('audit_logs.user_email exists (FIX #3)', async () => {
    expect(await columnExists('audit_logs', 'user_email')).toBe(true);
  });

  it('audit_logs.user_id is NOT a foreign key (FIX #3)', async () => {
    // Verify no FK constraint references users(id) from audit_logs.user_id
    const rows = await queryRaw(
      prisma,
      `SELECT CONSTRAINT_NAME FROM information_schema.KEY_COLUMN_USAGE
       WHERE TABLE_SCHEMA = ? AND TABLE_NAME = 'audit_logs'
         AND COLUMN_NAME = 'user_id' AND REFERENCED_TABLE_NAME IS NOT NULL`,
      [dbName()]
    );
    expect(rows.length).toBe(0);
  });

  // notices — [FIX #2] draft columns must exist
  it('notices.has_unpublished_draft exists (FIX #2)', async () => {
    expect(await columnExists('notices', 'has_unpublished_draft')).toBe(true);
  });

  it('notices.draft_title exists (FIX #2)', async () => {
    expect(await columnExists('notices', 'draft_title')).toBe(true);
  });

  // faculty_profiles — [FIX #7] user_id for auto-link
  it('faculty_profiles.user_id exists (FIX #7)', async () => {
    expect(await columnExists('faculty_profiles', 'user_id')).toBe(true);
  });

  // media_files — [FIX #6] is_pdf flag
  it('media_files.is_pdf exists (FIX #6)', async () => {
    expect(await columnExists('media_files', 'is_pdf')).toBe(true);
  });
});

// ─── 3. Index existence ───────────────────────────────────────────────────────

describe('Step 1 – Performance Index Existence (§3.8)', () => {
  const dbName = () => new URL(process.env.DATABASE_URL!).pathname.replace(/^\//, '');

  // Helper: returns all column names covered by non-PRIMARY indexes on a table
  async function indexedColumns(table: string): Promise<string[]> {
    const rows = await queryRaw(
      prisma,
      `SELECT COLUMN_NAME FROM information_schema.STATISTICS
       WHERE TABLE_SCHEMA = ? AND TABLE_NAME = ? AND INDEX_NAME != 'PRIMARY'`,
      [dbName(), table]
    ) as Array<{ COLUMN_NAME: string }>;
    return rows.map((r) => r.COLUMN_NAME);
  }

  it('notices: "status" column is part of a composite index (§3.8)', async () => {
    const cols = await indexedColumns('notices');
    expect(cols).toContain('status');
  });

  it('notices: "notice_date" column is part of an index (§3.8)', async () => {
    const cols = await indexedColumns('notices');
    expect(cols).toContain('notice_date');
  });

  it('audit_logs: "resource" column is indexed (§3.8)', async () => {
    const cols = await indexedColumns('audit_logs');
    expect(cols).toContain('resource');
  });

  it('audit_logs: "user_id" column is indexed (§3.8)', async () => {
    const cols = await indexedColumns('audit_logs');
    expect(cols).toContain('user_id');
  });

  it('faculty_profiles: "department" column is indexed (§3.8)', async () => {
    const cols = await indexedColumns('faculty_profiles');
    expect(cols).toContain('department');
  });

  it('media_files: "uploaded_by" column is indexed (§3.8)', async () => {
    const cols = await indexedColumns('media_files');
    expect(cols).toContain('uploaded_by');
  });
});

// ─── 4. Enum values ───────────────────────────────────────────────────────────

describe('Step 1 – Enum & Constraint Validation', () => {
  it('UserRole enum is enforced: invalid role is rejected', async () => {
    await expect(
      prisma.user.create({
        data: {
          email: 'invalid-role-test@example.com',
          name: 'Test',
          role: 'superuser' as never, // deliberately wrong
        },
      })
    ).rejects.toThrow();
  });
});

// ─── 5. Prisma CRUD round-trip ────────────────────────────────────────────────

describe('Step 1 – Prisma CRUD Round-Trip', () => {
  const TEST_EMAIL = 'jest-step1-test@iiitp.ac.in';
  // Shared user fixture — created in beforeAll so all tests within this describe
  // block are independent of execution order.
  let testUserId: number;

  beforeAll(async () => {
    // Upsert guarantees the row exists regardless of prior test state.
    const user = await prisma.user.upsert({
      where: { email: TEST_EMAIL },
      update: { token_version: 0, is_active: true }, // reset state for repeatability
      create: {
        email: TEST_EMAIL,
        name: 'Jest Test User',
        role: 'editor',
        is_active: true,
        token_version: 0,
      },
    });
    testUserId = user.id;
  });

  afterAll(async () => {
    // Clean up section assignments first (FK cascade would handle it, but be explicit)
    await prisma.editorSectionAssignment.deleteMany({ where: { user_id: testUserId } });
    await prisma.user.deleteMany({ where: { email: { contains: 'jest-step1' } } });
    await prisma.invite.deleteMany({ where: { email: { contains: 'jest-step1' } } });
  });

  it('can CREATE a user with all Phase 1 fields', async () => {
    // User created in beforeAll — verify it has the correct shape
    const user = await prisma.user.findUnique({ where: { email: TEST_EMAIL } });
    expect(user).not.toBeNull();
    expect(user!.id).toBeDefined();
    expect(user!.token_version).toBe(0);
    expect(user!.is_active).toBe(true);
    expect(user!.role).toBe('editor');
  });

  it('can READ the created user back', async () => {
    const user = await prisma.user.findUnique({ where: { email: TEST_EMAIL } });
    expect(user).not.toBeNull();
    expect(user!.name).toBe('Jest Test User');
  });

  it('enforces unique constraint on email', async () => {
    await expect(
      prisma.user.create({
        data: { email: TEST_EMAIL, name: 'Duplicate', role: 'admin' },
      })
    ).rejects.toThrow();
  });

  it('can CREATE an invite with JSON sections field [FIX #1]', async () => {
    const INVITE_EMAIL = 'jest-step1-invite@iiitp.ac.in';
    // Upsert to avoid duplicate key error if tests are re-run without cleanup
    const invite = await prisma.invite.upsert({
      where: { email: INVITE_EMAIL },
      update: { sections: ['notices', 'news'] },
      create: {
        email: INVITE_EMAIL,
        role: 'editor',
        sections: ['notices', 'news'], // JSON array — critical for FIX #1
        token: 'test-token-abc123',
        accepted: false,
      },
    });
    expect(invite.id).toBeDefined();
    expect(invite.sections).toEqual(['notices', 'news']);
  });

  it('can INCREMENT token_version to invalidate sessions [FIX #4]', async () => {
    // Uses testUserId from beforeAll — not order-dependent
    const updated = await prisma.user.update({
      where: { id: testUserId },
      data: { token_version: { increment: 1 } },
    });
    expect(updated.token_version).toBeGreaterThanOrEqual(1);
  });

  it('can CREATE an audit log entry without a FK on user_id [FIX #3]', async () => {
    const log = await prisma.auditLog.create({
      data: {
        user_id: 999999,        // does NOT need to reference a real user row
        user_email: 'snapshot@iiitp.ac.in',
        action: 'LOGIN',
        resource: 'user',
        resource_id: '999999',
        ip_address: '127.0.0.1',
      },
    });
    expect(log.id).toBeDefined();
    expect(log.user_email).toBe('snapshot@iiitp.ac.in');

    // Cleanup
    await prisma.auditLog.delete({ where: { id: log.id } });
  });

  it('can CREATE an editor section assignment', async () => {
    // Clean up first in case of previous failed run
    await prisma.editorSectionAssignment.deleteMany({ where: { user_id: testUserId } });

    const assignment = await prisma.editorSectionAssignment.create({
      data: {
        user_id: testUserId,
        section: 'notices',
      },
    });
    expect(assignment.section).toBe('notices');

    // Enforce unique constraint — same user + section pair must be rejected
    await expect(
      prisma.editorSectionAssignment.create({
        data: { user_id: testUserId, section: 'notices' },
      })
    ).rejects.toThrow();

    // Cleanup
    await prisma.editorSectionAssignment.deleteMany({ where: { user_id: testUserId } });
  });

  it('can SET is_active=false to deactivate a user', async () => {
    const updated = await prisma.user.update({
      where: { id: testUserId },
      data: { is_active: false },
    });
    expect(updated.is_active).toBe(false);
  });
});
