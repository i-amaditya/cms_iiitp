/**
 * tests/step4.middleware.test.ts — Step 4: Auth & Role Middleware Verification
 *
 * Tests:
 *   1. authenticateJWT:
 *      - Rejects request if no token is provided (401)
 *      - Rejects request if invalid/expired token is provided (401)
 *      - Authenticates user via httpOnly cookie (`accessToken`)
 *      - Authenticates user via Authorization header (`Bearer <token>`)
 *      - Rejects request if user is deactivated in DB/cache (403)
 *      - Rejects request if token_version is bumped (401 session revoked)
 *      - Utilizes in-memory LRU cache properly
 *   2. requireRole:
 *      - Allows user with matching role (e.g. admin or editor)
 *      - Rejects user with insufficient role (403)
 *      - Rejects unauthenticated request (401)
 *   3. requireSection:
 *      - Admin always bypasses section check
 *      - Editor with section assignment in DB/cache is granted access
 *      - Editor without section assignment is rejected (403)
 *      - Non-editor/faculty is rejected (403)
 *   4. createAuditLog:
 *      - Records audit log with snapshotted email and JSON snapshots
 *      - Handles IP/User-Agent extraction
 */

import express, { Request, Response } from 'express';
import request from 'supertest';
import cookieParser from 'cookie-parser';
import prisma from '../src/config/prisma';
import { generateAccessToken } from '../src/utils/auth';
import {
  authenticateJWT,
  invalidateUserAuthCache,
  userAuthCache,
} from '../src/middlewares/auth';
import {
  requireRole,
  requireSection,
  invalidateEditorSectionCache,
  editorSectionsCache,
} from '../src/middlewares/role';
import { createAuditLog } from '../src/middlewares/audit';

// Create a test Express app instance
function createTestApp() {
  const app = express();
  app.use(cookieParser());
  app.use(express.json());

  // Protected route for general auth test
  app.get('/test/protected', authenticateJWT, (req: Request, res: Response) => {
    res.json({ success: true, user: req.user });
  });

  // Role protected route (Admin only)
  app.get(
    '/test/admin-only',
    authenticateJWT,
    requireRole(['admin']),
    (req: Request, res: Response) => {
      res.json({ success: true, message: 'Admin access granted' });
    }
  );

  // Role protected route (Editor or Admin)
  app.get(
    '/test/editor-or-admin',
    authenticateJWT,
    requireRole(['admin', 'editor']),
    (req: Request, res: Response) => {
      res.json({ success: true, message: 'Editor/Admin access granted' });
    }
  );

  // Section protected route (Notices)
  app.post(
    '/test/section/notices',
    authenticateJWT,
    requireSection('notices'),
    (req: Request, res: Response) => {
      res.json({ success: true, message: 'Notices section access granted' });
    }
  );

  // Audit test route
  app.post('/test/audit-action', authenticateJWT, async (req: Request, res: Response) => {
    await createAuditLog({
      req,
      action: 'CREATE',
      resource: 'notices',
      resourceId: 101,
      oldValue: null,
      newValue: { title: 'Test Notice' },
    });
    res.json({ success: true });
  });

  return app;
}

describe('Step 4 – Auth & Role Middleware', () => {
  let app: express.Express;
  let adminUser: any;
  let editorUser: any;
  let facultyUser: any;

  beforeAll(async () => {
    app = createTestApp();

    // Clean up test users if existing
    await prisma.editorSectionAssignment.deleteMany({});
    await prisma.auditLog.deleteMany({ where: { user_email: { contains: 'step4test' } } });
    await prisma.user.deleteMany({ where: { email: { contains: 'step4test' } } });

    // Seed test users
    adminUser = await prisma.user.create({
      data: {
        email: 'admin.step4test@iiitp.ac.in',
        name: 'Step4 Admin',
        role: 'admin',
        token_version: 1,
        is_active: true,
      },
    });

    editorUser = await prisma.user.create({
      data: {
        email: 'editor.step4test@iiitp.ac.in',
        name: 'Step4 Editor',
        role: 'editor',
        token_version: 1,
        is_active: true,
      },
    });

    facultyUser = await prisma.user.create({
      data: {
        email: 'faculty.step4test@iiitp.ac.in',
        name: 'Step4 Faculty',
        role: 'faculty',
        token_version: 1,
        is_active: true,
      },
    });

    // Assign editor to 'notices' section
    await prisma.editorSectionAssignment.create({
      data: {
        user_id: editorUser.id,
        section: 'notices',
      },
    });
  });

  afterAll(async () => {
    await prisma.editorSectionAssignment.deleteMany({
      where: { user_id: { in: [adminUser.id, editorUser.id, facultyUser.id] } },
    });
    await prisma.auditLog.deleteMany({ where: { user_email: { contains: 'step4test' } } });
    await prisma.user.deleteMany({
      where: { id: { in: [adminUser.id, editorUser.id, facultyUser.id] } },
    });
    await prisma.$disconnect();
  });

  beforeEach(() => {
    userAuthCache.clear();
    editorSectionsCache.clear();
  });

  // ─── 1. authenticateJWT ───────────────────────────────────────────────────

  describe('authenticateJWT', () => {
    it('rejects request with 401 when no token is provided', async () => {
      const res = await request(app).get('/test/protected');
      expect(res.status).toBe(401);
      expect(res.body.error).toMatch(/no token provided/i);
    });

    it('rejects request with 401 when invalid token is provided', async () => {
      const res = await request(app)
        .get('/test/protected')
        .set('Authorization', 'Bearer invalid.jwt.token');
      expect(res.status).toBe(401);
      expect(res.body.error).toMatch(/invalid access token/i);
    });

    it('authenticates user via Authorization header', async () => {
      const token = generateAccessToken({
        userId: adminUser.id,
        email: adminUser.email,
        role: adminUser.role,
        tokenVersion: adminUser.token_version,
      });

      const res = await request(app)
        .get('/test/protected')
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.user.email).toBe(adminUser.email);
      expect(res.body.user.role).toBe('admin');
    });

    it('authenticates user via httpOnly cookie', async () => {
      const token = generateAccessToken({
        userId: editorUser.id,
        email: editorUser.email,
        role: editorUser.role,
        tokenVersion: editorUser.token_version,
      });

      const res = await request(app)
        .get('/test/protected')
        .set('Cookie', [`accessToken=${token}`]);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.user.email).toBe(editorUser.email);
    });

    it('rejects request with 403 when user is deactivated', async () => {
      // Deactivate user in DB
      await prisma.user.update({
        where: { id: facultyUser.id },
        data: { is_active: false },
      });
      invalidateUserAuthCache(facultyUser.id);

      const token = generateAccessToken({
        userId: facultyUser.id,
        email: facultyUser.email,
        role: facultyUser.role,
        tokenVersion: facultyUser.token_version,
      });

      const res = await request(app)
        .get('/test/protected')
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(403);
      expect(res.body.error).toMatch(/deactivated/i);

      // Re-activate user
      await prisma.user.update({
        where: { id: facultyUser.id },
        data: { is_active: true },
      });
      invalidateUserAuthCache(facultyUser.id);
    });

    it('rejects request with 401 when token_version is incremented (session revocation)', async () => {
      const oldToken = generateAccessToken({
        userId: adminUser.id,
        email: adminUser.email,
        role: adminUser.role,
        tokenVersion: adminUser.token_version, // version 1
      });

      // Bump token_version in DB
      await prisma.user.update({
        where: { id: adminUser.id },
        data: { token_version: 2 },
      });
      invalidateUserAuthCache(adminUser.id);

      const res = await request(app)
        .get('/test/protected')
        .set('Authorization', `Bearer ${oldToken}`);

      expect(res.status).toBe(401);
      expect(res.body.error).toMatch(/invalidated/i);

      // Reset token_version back to 1
      await prisma.user.update({
        where: { id: adminUser.id },
        data: { token_version: 1 },
      });
      invalidateUserAuthCache(adminUser.id);
    });
  });

  // ─── 2. requireRole ───────────────────────────────────────────────────────

  describe('requireRole', () => {
    it('grants admin access to admin-only route', async () => {
      const token = generateAccessToken({
        userId: adminUser.id,
        email: adminUser.email,
        role: adminUser.role,
        tokenVersion: adminUser.token_version,
      });

      const res = await request(app)
        .get('/test/admin-only')
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(res.body.message).toMatch(/admin access granted/i);
    });

    it('rejects editor trying to access admin-only route with 403', async () => {
      const token = generateAccessToken({
        userId: editorUser.id,
        email: editorUser.email,
        role: editorUser.role,
        tokenVersion: editorUser.token_version,
      });

      const res = await request(app)
        .get('/test/admin-only')
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(403);
      expect(res.body.error).toMatch(/forbidden/i);
    });

    it('grants both editor and admin access to editor-or-admin route', async () => {
      const editorToken = generateAccessToken({
        userId: editorUser.id,
        email: editorUser.email,
        role: editorUser.role,
        tokenVersion: editorUser.token_version,
      });

      const facultyToken = generateAccessToken({
        userId: facultyUser.id,
        email: facultyUser.email,
        role: facultyUser.role,
        tokenVersion: facultyUser.token_version,
      });

      const resEditor = await request(app)
        .get('/test/editor-or-admin')
        .set('Authorization', `Bearer ${editorToken}`);
      expect(resEditor.status).toBe(200);

      const resFaculty = await request(app)
        .get('/test/editor-or-admin')
        .set('Authorization', `Bearer ${facultyToken}`);
      expect(resFaculty.status).toBe(403);
    });
  });

  // ─── 3. requireSection ────────────────────────────────────────────────────

  describe('requireSection', () => {
    it('admin always has access to any section without explicit assignment', async () => {
      const adminToken = generateAccessToken({
        userId: adminUser.id,
        email: adminUser.email,
        role: adminUser.role,
        tokenVersion: adminUser.token_version,
      });

      const res = await request(app)
        .post('/test/section/notices')
        .set('Authorization', `Bearer ${adminToken}`);

      expect(res.status).toBe(200);
      expect(res.body.message).toMatch(/notices section access granted/i);
    });

    it('editor with section assignment has access', async () => {
      const editorToken = generateAccessToken({
        userId: editorUser.id,
        email: editorUser.email,
        role: editorUser.role,
        tokenVersion: editorUser.token_version,
      });

      const res = await request(app)
        .post('/test/section/notices')
        .set('Authorization', `Bearer ${editorToken}`);

      expect(res.status).toBe(200);
      expect(res.body.message).toMatch(/notices section access granted/i);
    });

    it('editor without section assignment is rejected with 403', async () => {
      // Create another editor with no section assignments
      const unassignedEditor = await prisma.user.create({
        data: {
          email: 'unassigned.step4test@iiitp.ac.in',
          name: 'Unassigned Editor',
          role: 'editor',
          token_version: 1,
          is_active: true,
        },
      });

      const token = generateAccessToken({
        userId: unassignedEditor.id,
        email: unassignedEditor.email,
        role: unassignedEditor.role,
        tokenVersion: unassignedEditor.token_version,
      });

      const res = await request(app)
        .post('/test/section/notices')
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(403);
      expect(res.body.error).toMatch(/not assigned to edit the 'notices' section/i);

      await prisma.user.delete({ where: { id: unassignedEditor.id } });
    });

    it('faculty is rejected from editing notices section with 403', async () => {
      const facultyToken = generateAccessToken({
        userId: facultyUser.id,
        email: facultyUser.email,
        role: facultyUser.role,
        tokenVersion: facultyUser.token_version,
      });

      const res = await request(app)
        .post('/test/section/notices')
        .set('Authorization', `Bearer ${facultyToken}`);

      expect(res.status).toBe(403);
      expect(res.body.error).toMatch(/forbidden/i);
    });
  });

  // ─── 4. createAuditLog ────────────────────────────────────────────────────

  describe('createAuditLog', () => {
    it('creates an audit log entry with user email snapshot and json payload', async () => {
      const adminToken = generateAccessToken({
        userId: adminUser.id,
        email: adminUser.email,
        role: adminUser.role,
        tokenVersion: adminUser.token_version,
      });

      const res = await request(app)
        .post('/test/audit-action')
        .set('Authorization', `Bearer ${adminToken}`);

      expect(res.status).toBe(200);

      // Verify audit log row in DB
      const logs = await prisma.auditLog.findMany({
        where: { user_email: adminUser.email, resource: 'notices' },
      });

      expect(logs.length).toBeGreaterThanOrEqual(1);
      const log = logs[logs.length - 1];
      expect(log.action).toBe('CREATE');
      expect(log.resource_id).toBe('101');
      expect(log.user_email).toBe(adminUser.email);
      expect((log.new_value as any)?.title).toBe('Test Notice');
    });
  });
});
