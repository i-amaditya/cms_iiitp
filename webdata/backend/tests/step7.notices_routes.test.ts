/**
 * tests/step7.notices_routes.test.ts — Step 7: Notices CMS Integration Tests
 *
 * Tests all Section 5.3 Notices Endpoints:
 *
 *   1. Public Access & Isolation:
 *      - GET /v1/notices returns published notices by default
 *      - Draft and archived notices are NOT returned in public view
 *      - GET /v1/notices/:id returns 404 for draft/archived notices when unauthenticated
 *      - Draft fields are excluded from public responses
 *
 *   2. Working Copy Draft Pattern [FIX #2]:
 *      - POST /v1/notices creates notice as draft
 *      - PATCH /v1/notices/:id updates only draft_* columns and sets has_unpublished_draft=true
 *      - Public GET /v1/notices reads unchanged live columns
 *      - PATCH /v1/notices/:id/publish atomically copies draft_* -> live columns and resets has_unpublished_draft=false
 *
 *   3. Archiving & Lifecycle:
 *      - PATCH /v1/notices/:id/archive sets status=archived
 *
 *   4. RBAC & Section Authorization:
 *      - Editor with 'notices' section permission can create, update draft, publish, and archive
 *      - Editor without 'notices' section permission is rejected with 403 Forbidden
 *      - DELETE /v1/notices/:id is restricted to Admin only (Editor gets 403)
 *
 *   5. Full-Text Search [FIX #5]:
 *      - GET /v1/notices?search=... performs MATCH ... AGAINST query
 */

import express from 'express';
import request from 'supertest';
import cookieParser from 'cookie-parser';
import prisma from '../src/config/prisma';
import authRouter from '../src/routes/auth.routes';
import noticesRouter from '../src/routes/notices.routes';
import { env } from '../src/config/env';
import { generateAccessToken } from '../src/utils/auth';
import { ContentStatus } from '@prisma/client';

function createApp() {
  const app = express();
  app.use(cookieParser());
  app.use(express.json());
  app.use('/v1/auth', authRouter);
  app.use('/v1/notices', noticesRouter);
  return app;
}

const DOMAIN = env.ALLOWED_DOMAIN;

describe('Step 7 – Notices CMS Integration', () => {
  let app: ReturnType<typeof createApp>;

  let adminUser: any;
  let noticesEditorUser: any;
  let newsOnlyEditorUser: any;

  let adminToken: string;
  let noticesEditorToken: string;
  let newsOnlyEditorToken: string;

  beforeAll(async () => {
    app = createApp();

    // Clean up test notices and users
    await prisma.notice.deleteMany({ where: { title: { contains: 'Step7' } } });
    await prisma.editorSectionAssignment.deleteMany({});
    await prisma.auditLog.deleteMany({ where: { user_email: { contains: 'step7test' } } });
    await prisma.user.deleteMany({ where: { email: { contains: 'step7test' } } });

    // Seed Admin
    adminUser = await prisma.user.create({
      data: {
        email: `admin.step7test@${DOMAIN}`,
        name: 'Step7 Admin',
        role: 'admin',
        token_version: 0,
        is_active: true,
      },
    });

    // Seed Editor with 'notices' section
    noticesEditorUser = await prisma.user.create({
      data: {
        email: `notices.editor.step7test@${DOMAIN}`,
        name: 'Step7 Notices Editor',
        role: 'editor',
        token_version: 0,
        is_active: true,
      },
    });
    await prisma.editorSectionAssignment.create({
      data: { user_id: noticesEditorUser.id, section: 'notices' },
    });

    // Seed Editor with only 'news' section (unauthorized for notices)
    newsOnlyEditorUser = await prisma.user.create({
      data: {
        email: `news.editor.step7test@${DOMAIN}`,
        name: 'Step7 News Editor',
        role: 'editor',
        token_version: 0,
        is_active: true,
      },
    });
    await prisma.editorSectionAssignment.create({
      data: { user_id: newsOnlyEditorUser.id, section: 'news' },
    });

    adminToken = generateAccessToken({
      userId: adminUser.id,
      email: adminUser.email,
      role: 'admin',
      tokenVersion: 0,
    });

    noticesEditorToken = generateAccessToken({
      userId: noticesEditorUser.id,
      email: noticesEditorUser.email,
      role: 'editor',
      tokenVersion: 0,
    });

    newsOnlyEditorToken = generateAccessToken({
      userId: newsOnlyEditorUser.id,
      email: newsOnlyEditorUser.email,
      role: 'editor',
      tokenVersion: 0,
    });
  });

  afterAll(async () => {
    await prisma.notice.deleteMany({ where: { title: { contains: 'Step7' } } });
    await prisma.editorSectionAssignment.deleteMany({});
    await prisma.auditLog.deleteMany({ where: { user_email: { contains: 'step7test' } } });
    await prisma.user.deleteMany({ where: { email: { contains: 'step7test' } } });
    await prisma.$disconnect();
  });

  // ─── 1. Creation & RBAC ───────────────────────────────────────────────────

  let testNoticeId: number;

  describe('POST /v1/notices (Notice Creation)', () => {
    it('rejects unauthenticated user with 401', async () => {
      const res = await request(app).post('/v1/notices').send({
        title: 'Step7 Unauth Notice',
        notice_date: '2026-08-28',
      });
      expect(res.status).toBe(401);
    });

    it('rejects editor not assigned to notices section with 403 Forbidden', async () => {
      const res = await request(app)
        .post('/v1/notices')
        .set('Authorization', `Bearer ${newsOnlyEditorToken}`)
        .send({
          title: 'Step7 Forbidden Notice',
          notice_date: '2026-08-28',
        });
      expect(res.status).toBe(403);
      expect(res.body.error).toMatch(/not assigned to edit the 'notices' section/i);
    });

    it('allows assigned notices editor to create draft notice (201)', async () => {
      const res = await request(app)
        .post('/v1/notices')
        .set('Authorization', `Bearer ${noticesEditorToken}`)
        .send({
          title: 'Step7 Admissions Announcement 2026',
          category: 'Academic',
          notice_date: '2026-08-28',
          link_url: 'https://iiitp.ac.in/admissions',
        });

      expect(res.status).toBe(201);
      expect(res.body.notice.status).toBe('draft');
      expect(res.body.notice.title).toBe('Step7 Admissions Announcement 2026');
      expect(res.body.notice.has_unpublished_draft).toBe(false);

      testNoticeId = res.body.notice.id;
    });
  });

  // ─── 2. Working Copy Draft Pattern [FIX #2] ───────────────────────────────

  describe('Working Copy Draft Pattern [FIX #2]', () => {
    it('initially published notice displays live fields publicly', async () => {
      // First publish the notice so it is live
      const publishRes = await request(app)
        .patch(`/v1/notices/${testNoticeId}/publish`)
        .set('Authorization', `Bearer ${noticesEditorToken}`);

      expect(publishRes.status).toBe(200);
      expect(publishRes.body.notice.status).toBe('published');

      // Verify public list sees it
      const publicRes = await request(app).get('/v1/notices');
      expect(publicRes.status).toBe(200);
      const item = publicRes.body.notices.find((n: any) => n.id === testNoticeId);
      expect(item).toBeDefined();
      expect(item.title).toBe('Step7 Admissions Announcement 2026');
      // Public response must not leak draft_* internal properties
      expect(item.draft_title).toBeUndefined();
    });

    it('PATCH /v1/notices/:id updates only draft_* columns without affecting live public view', async () => {
      const patchRes = await request(app)
        .patch(`/v1/notices/${testNoticeId}`)
        .set('Authorization', `Bearer ${noticesEditorToken}`)
        .send({
          title: 'Step7 EDITED Draft Title (Should Not Be Public Yet)',
          category: 'General',
        });

      expect(patchRes.status).toBe(200);
      expect(patchRes.body.notice.has_unpublished_draft).toBe(true);
      expect(patchRes.body.notice.draft_title).toBe('Step7 EDITED Draft Title (Should Not Be Public Yet)');

      // Critical Check: Public list must STILL show original live title
      const publicRes = await request(app).get('/v1/notices');
      const publicItem = publicRes.body.notices.find((n: any) => n.id === testNoticeId);
      expect(publicItem.title).toBe('Step7 Admissions Announcement 2026'); // Live title intact!
      expect(publicItem.category).toBe('Academic'); // Live category intact!
    });

    it('PATCH /v1/notices/:id/publish atomically makes draft changes live', async () => {
      const publishRes = await request(app)
        .patch(`/v1/notices/${testNoticeId}/publish`)
        .set('Authorization', `Bearer ${noticesEditorToken}`);

      expect(publishRes.status).toBe(200);
      expect(publishRes.body.notice.status).toBe('published');
      expect(publishRes.body.notice.has_unpublished_draft).toBe(false);
      expect(publishRes.body.notice.title).toBe('Step7 EDITED Draft Title (Should Not Be Public Yet)');

      // Public list now reflects the published title
      const publicRes = await request(app).get('/v1/notices');
      const publicItem = publicRes.body.notices.find((n: any) => n.id === testNoticeId);
      expect(publicItem.title).toBe('Step7 EDITED Draft Title (Should Not Be Public Yet)');
    });
  });

  // ─── 3. Archiving & Single Notice View ────────────────────────────────────

  describe('Archive & Single Notice View', () => {
    it('PATCH /v1/notices/:id/archive archives the notice', async () => {
      const archiveRes = await request(app)
        .patch(`/v1/notices/${testNoticeId}/archive`)
        .set('Authorization', `Bearer ${noticesEditorToken}`);

      expect(archiveRes.status).toBe(200);
      expect(archiveRes.body.notice.status).toBe('archived');

      // Public single notice view returns 404 for archived notice
      const publicGetRes = await request(app).get(`/v1/notices/${testNoticeId}`);
      expect(publicGetRes.status).toBe(404);

      // Authenticated editor can still view archived notice
      const editorGetRes = await request(app)
        .get(`/v1/notices/${testNoticeId}`)
        .set('Authorization', `Bearer ${noticesEditorToken}`);
      expect(editorGetRes.status).toBe(200);
      expect(editorGetRes.body.notice.status).toBe('archived');
    });
  });

  // ─── 4. Full-Text Search [FIX #5] ─────────────────────────────────────────

  describe('Full-Text Search [FIX #5]', () => {
    let searchableNoticeId: number;

    beforeAll(async () => {
      const res = await request(app)
        .post('/v1/notices')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          title: 'Step7 Quantum Computing Workshop Registration',
          category: 'Events',
          notice_date: '2026-08-28',
        });
      searchableNoticeId = res.body.notice.id;

      await request(app)
        .patch(`/v1/notices/${searchableNoticeId}/publish`)
        .set('Authorization', `Bearer ${adminToken}`);
    });

    it('finds notice via full-text search query (?search=Quantum)', async () => {
      const searchRes = await request(app).get('/v1/notices?search=Quantum');
      expect(searchRes.status).toBe(200);
      expect(searchRes.body.notices.length).toBeGreaterThanOrEqual(1);
      expect(searchRes.body.notices.some((n: any) => n.id === searchableNoticeId)).toBe(true);
    });
  });

  // ─── 5. Admin-Only Deletion ───────────────────────────────────────────────

  describe('DELETE /v1/notices/:id', () => {
    it('rejects editor deletion attempt with 403 Forbidden', async () => {
      const res = await request(app)
        .delete(`/v1/notices/${testNoticeId}`)
        .set('Authorization', `Bearer ${noticesEditorToken}`);
      expect(res.status).toBe(403);
      expect(res.body.error).toMatch(/forbidden/i);
    });

    it('allows admin to delete notice (200)', async () => {
      const res = await request(app)
        .delete(`/v1/notices/${testNoticeId}`)
        .set('Authorization', `Bearer ${adminToken}`);

      expect(res.status).toBe(200);
      expect(res.body.message).toMatch(/deleted/i);

      // Verify DB deletion
      const check = await prisma.notice.findUnique({ where: { id: testNoticeId } });
      expect(check).toBeNull();
    });
  });
});
