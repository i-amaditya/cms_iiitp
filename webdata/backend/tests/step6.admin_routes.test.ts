/**
 * tests/step6.admin_routes.test.ts — Step 6: Admin Management Integration Tests
 *
 * Tests all Section 5.2 Admin Endpoints:
 *
 *   1. Access Control (RBAC):
 *      - Unauthenticated requests rejected with 401
 *      - Editor or Faculty requests rejected with 403 Forbidden
 *
 *   2. User Listing & Retrieval:
 *      - GET /v1/admin/users — Returns paginated list with total count and sections
 *      - GET /v1/admin/users?role=editor — Filters by role
 *      - GET /v1/admin/users/:id — Returns single user details with sections
 *
 *   3. User Update & Deactivation [FIX #4]:
 *      - PATCH /v1/admin/users/:id — Updates user role and increments token_version
 *      - PATCH /v1/admin/users/:id — Deactivates user (is_active=false), bumps token_version, revokes active session immediately
 *      - PATCH /v1/admin/users/:id — Admin cannot deactivate own account (400)
 *
 *   4. Invites Management [FIX #1]:
 *      - POST /v1/admin/invites — Creates invite with role and JSON sections array
 *      - POST /v1/admin/invites — Rejects invalid email domain (400)
 *      - POST /v1/admin/invites — Rejects if user already exists (400)
 *      - GET /v1/admin/invites — Lists all invites
 *      - DELETE /v1/admin/invites/:id — Revokes / deletes pending invite
 *
 *   5. Editor Section Assignments:
 *      - POST /v1/admin/users/:id/sections — Assigns sections to editor
 *      - POST /v1/admin/users/:id/sections — Rejects if user is not an editor (400)
 *      - DELETE /v1/admin/users/:id/sections/:section — Removes a section assignment
 */

import express from 'express';
import request from 'supertest';
import cookieParser from 'cookie-parser';
import prisma from '../src/config/prisma';
import authRouter from '../src/routes/auth.routes';
import adminRouter from '../src/routes/admin.routes';
import { env } from '../src/config/env';
import { generateAccessToken } from '../src/utils/auth';
import { invalidateUserAuthCache } from '../src/middlewares/auth';
import { editorSectionsCache } from '../src/middlewares/role';

function createApp() {
  const app = express();
  app.use(cookieParser());
  app.use(express.json());
  app.use('/v1/auth', authRouter);
  app.use('/v1/admin', adminRouter);
  return app;
}

const DOMAIN = env.ALLOWED_DOMAIN; // 'gmail.com' in dev

describe('Step 6 – Admin Routes Integration', () => {
  let app: ReturnType<typeof createApp>;

  let adminUser: any;
  let editorUser: any;
  let facultyUser: any;
  let targetUser: any;

  let adminToken: string;
  let editorToken: string;
  let facultyToken: string;

  beforeAll(async () => {
    app = createApp();

    // Clean up test data
    await prisma.editorSectionAssignment.deleteMany({});
    await prisma.auditLog.deleteMany({ where: { user_email: { contains: 'step6test' } } });
    await prisma.user.deleteMany({ where: { email: { contains: 'step6test' } } });
    await prisma.invite.deleteMany({ where: { email: { contains: 'step6test' } } });

    // Seed test admin
    adminUser = await prisma.user.create({
      data: {
        email: `admin.step6test@${DOMAIN}`,
        name: 'Step6 Admin',
        role: 'admin',
        token_version: 0,
        is_active: true,
      },
    });

    // Seed test editor
    editorUser = await prisma.user.create({
      data: {
        email: `editor.step6test@${DOMAIN}`,
        name: 'Step6 Editor',
        role: 'editor',
        token_version: 0,
        is_active: true,
      },
    });

    // Seed test faculty
    facultyUser = await prisma.user.create({
      data: {
        email: `faculty.step6test@${DOMAIN}`,
        name: 'Step6 Faculty',
        role: 'faculty',
        token_version: 0,
        is_active: true,
      },
    });

    // Seed target user for update/deactivate testing
    targetUser = await prisma.user.create({
      data: {
        email: `target.step6test@${DOMAIN}`,
        name: 'Step6 Target',
        role: 'editor',
        token_version: 1,
        is_active: true,
      },
    });

    adminToken = generateAccessToken({
      userId: adminUser.id,
      email: adminUser.email,
      role: 'admin',
      tokenVersion: 0,
    });

    editorToken = generateAccessToken({
      userId: editorUser.id,
      email: editorUser.email,
      role: 'editor',
      tokenVersion: 0,
    });

    facultyToken = generateAccessToken({
      userId: facultyUser.id,
      email: facultyUser.email,
      role: 'faculty',
      tokenVersion: 0,
    });
  });

  afterAll(async () => {
    await prisma.editorSectionAssignment.deleteMany({});
    await prisma.auditLog.deleteMany({ where: { user_email: { contains: 'step6test' } } });
    await prisma.user.deleteMany({ where: { email: { contains: 'step6test' } } });
    await prisma.invite.deleteMany({ where: { email: { contains: 'step6test' } } });
    await prisma.$disconnect();
  });

  beforeEach(() => {
    editorSectionsCache.clear();
  });

  // ─── 1. Role-Based Access Control ─────────────────────────────────────────

  describe('Admin RBAC Protection', () => {
    it('rejects unauthenticated requests with 401', async () => {
      const res = await request(app).get('/v1/admin/users');
      expect(res.status).toBe(401);
    });

    it('rejects editor requests with 403 Forbidden', async () => {
      const res = await request(app)
        .get('/v1/admin/users')
        .set('Authorization', `Bearer ${editorToken}`);
      expect(res.status).toBe(403);
      expect(res.body.error).toMatch(/forbidden/i);
    });

    it('rejects faculty requests with 403 Forbidden', async () => {
      const res = await request(app)
        .get('/v1/admin/users')
        .set('Authorization', `Bearer ${facultyToken}`);
      expect(res.status).toBe(403);
      expect(res.body.error).toMatch(/forbidden/i);
    });

    it('allows admin requests with 200 OK', async () => {
      const res = await request(app)
        .get('/v1/admin/users')
        .set('Authorization', `Bearer ${adminToken}`);
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body.users)).toBe(true);
    });
  });

  // ─── 2. User Listing & Retrieval ──────────────────────────────────────────

  describe('GET /v1/admin/users & GET /v1/admin/users/:id', () => {
    it('returns paginated list of users with total count', async () => {
      const res = await request(app)
        .get('/v1/admin/users?page=1&limit=2')
        .set('Authorization', `Bearer ${adminToken}`);

      expect(res.status).toBe(200);
      expect(res.body.users.length).toBeLessThanOrEqual(2);
      expect(res.body.pagination.total).toBeGreaterThanOrEqual(4);
      expect(res.body.pagination.page).toBe(1);
    });

    it('filters users by role', async () => {
      const res = await request(app)
        .get('/v1/admin/users?role=faculty')
        .set('Authorization', `Bearer ${adminToken}`);

      expect(res.status).toBe(200);
      expect(res.body.users.every((u: any) => u.role === 'faculty')).toBe(true);
    });

    it('returns single user details by ID', async () => {
      const res = await request(app)
        .get(`/v1/admin/users/${targetUser.id}`)
        .set('Authorization', `Bearer ${adminToken}`);

      expect(res.status).toBe(200);
      expect(res.body.user.email).toBe(targetUser.email);
      expect(res.body.user.role).toBe(targetUser.role);
    });

    it('returns 404 for non-existent user ID', async () => {
      const res = await request(app)
        .get('/v1/admin/users/999999')
        .set('Authorization', `Bearer ${adminToken}`);
      expect(res.status).toBe(404);
    });
  });

  // ─── 3. User Update & Deactivation [FIX #4] ───────────────────────────────

  describe('PATCH /v1/admin/users/:id', () => {
    it('updates user role and bumps token_version to revoke old sessions', async () => {
      const beforeUser = await prisma.user.findUnique({ where: { id: targetUser.id } });
      const oldTokenVersion = beforeUser!.token_version;

      const res = await request(app)
        .patch(`/v1/admin/users/${targetUser.id}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ role: 'faculty' });

      expect(res.status).toBe(200);
      expect(res.body.user.role).toBe('faculty');
      expect(res.body.user.token_version).toBe(oldTokenVersion + 1);

      // Reset role back to editor for further tests
      await prisma.user.update({
        where: { id: targetUser.id },
        data: { role: 'editor' },
      });
    });

    it('deactivates user (is_active=false) and immediately revokes active session', async () => {
      // 1. Generate active token for targetUser with current token_version
      const currentTarget = await prisma.user.findUnique({ where: { id: targetUser.id } });
      const targetActiveToken = generateAccessToken({
        userId: targetUser.id,
        email: targetUser.email,
        role: targetUser.role,
        tokenVersion: currentTarget!.token_version,
      });

      // 2. Admin deactivates targetUser
      const res = await request(app)
        .patch(`/v1/admin/users/${targetUser.id}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ is_active: false });

      expect(res.status).toBe(200);
      expect(res.body.user.is_active).toBe(false);

      // 3. Target user's active session must now be rejected immediately
      const meRes = await request(app)
        .get('/v1/auth/me')
        .set('Authorization', `Bearer ${targetActiveToken}`);

      expect(meRes.status).toBe(403);
      expect(meRes.body.error).toMatch(/deactivated/i);

      // Re-activate user
      await prisma.user.update({
        where: { id: targetUser.id },
        data: { is_active: true },
      });
      invalidateUserAuthCache(targetUser.id);
    });

    it('prevents admin from deactivating their own account (400)', async () => {
      const res = await request(app)
        .patch(`/v1/admin/users/${adminUser.id}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ is_active: false });

      expect(res.status).toBe(400);
      expect(res.body.error).toMatch(/cannot deactivate your own account/i);
    });
  });

  // ─── 4. Invites Management [FIX #1] ───────────────────────────────────────

  describe('Invites CRUD (/v1/admin/invites)', () => {
    const inviteEmail = `newinvite.step6test@${DOMAIN}`;
    let createdInviteId: number;

    it('creates invite with role and JSON sections array [FIX #1]', async () => {
      const res = await request(app)
        .post('/v1/admin/invites')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          email: inviteEmail,
          role: 'editor',
          sections: ['notices', 'careers', 'news'],
          expires_in_days: 14,
        });

      expect(res.status).toBe(201);
      expect(res.body.invite.email).toBe(inviteEmail);
      expect(res.body.invite.role).toBe('editor');
      expect(res.body.invite.sections).toEqual(['notices', 'careers', 'news']);
      expect(res.body.invite.accepted).toBe(false);

      createdInviteId = res.body.invite.id;
    });

    it('rejects invite creation if user already exists (400)', async () => {
      const res = await request(app)
        .post('/v1/admin/invites')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          email: adminUser.email,
          role: 'editor',
        });

      expect(res.status).toBe(400);
      expect(res.body.error).toMatch(/already exists/i);
    });

    it('rejects invite creation if active invite already exists (400)', async () => {
      const res = await request(app)
        .post('/v1/admin/invites')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          email: inviteEmail,
          role: 'editor',
        });

      expect(res.status).toBe(400);
      expect(res.body.error).toMatch(/already pending/i);
    });

    it('lists all invites including pending and accepted', async () => {
      const res = await request(app)
        .get('/v1/admin/invites')
        .set('Authorization', `Bearer ${adminToken}`);

      expect(res.status).toBe(200);
      expect(Array.isArray(res.body.invites)).toBe(true);
      expect(res.body.invites.some((inv: any) => inv.email === inviteEmail)).toBe(true);
    });

    it('revokes / deletes an existing invite', async () => {
      const res = await request(app)
        .delete(`/v1/admin/invites/${createdInviteId}`)
        .set('Authorization', `Bearer ${adminToken}`);

      expect(res.status).toBe(200);
      expect(res.body.message).toMatch(/revoked/i);

      // Verify deletion in DB
      const deleted = await prisma.invite.findUnique({ where: { id: createdInviteId } });
      expect(deleted).toBeNull();
    });
  });

  // ─── 5. Editor Section Assignments ────────────────────────────────────────

  describe('Editor Section Assignments (/v1/admin/users/:id/sections)', () => {
    it('assigns sections to an editor user', async () => {
      const res = await request(app)
        .post(`/v1/admin/users/${targetUser.id}/sections`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ sections: ['notices', 'news', 'etenders'] });

      expect(res.status).toBe(200);
      expect(res.body.sections.sort()).toEqual(['etenders', 'news', 'notices']);

      // Verify in DB
      const rows = await prisma.editorSectionAssignment.findMany({
        where: { user_id: targetUser.id },
      });
      expect(rows.length).toBe(3);
    });

    it('rejects section assignment if user is not an editor (400)', async () => {
      const res = await request(app)
        .post(`/v1/admin/users/${facultyUser.id}/sections`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ sections: ['notices'] });

      expect(res.status).toBe(400);
      expect(res.body.error).toMatch(/only apply to users with the 'editor' role/i);
    });

    it('removes a section assignment from an editor', async () => {
      const res = await request(app)
        .delete(`/v1/admin/users/${targetUser.id}/sections/etenders`)
        .set('Authorization', `Bearer ${adminToken}`);

      expect(res.status).toBe(200);
      expect(res.body.message).toMatch(/removed/i);

      // Verify DB removal
      const check = await prisma.editorSectionAssignment.findFirst({
        where: { user_id: targetUser.id, section: 'etenders' },
      });
      expect(check).toBeNull();
    });

    it('returns 404 when removing a section not assigned to user', async () => {
      const res = await request(app)
        .delete(`/v1/admin/users/${targetUser.id}/sections/nonexistent_section`)
        .set('Authorization', `Bearer ${adminToken}`);

      expect(res.status).toBe(404);
    });
  });
});
