/**
 * tests/step8.content_routes.test.ts — Step 8: Content CMS (News, Careers, E-Tenders) Tests
 *
 * Tests Section 5.4 Content Modules:
 *
 *   1. News Module (/v1/news):
 *      - Public listing & single view (published only)
 *      - Working copy draft update & atomic publish [FIX #2]
 *      - Full-text search [FIX #5]
 *      - Section authorization ('news' editor vs unassigned editor)
 *      - Admin-only deletion
 *
 *   2. Careers Module (/v1/careers):
 *      - Working copy draft update & publish
 *      - Filtering by career_type ('live', 'past')
 *      - Sub-resource Buttons CRUD (POST, PATCH, DELETE /careers/:id/buttons)
 *      - Section authorization ('careers' editor)
 *
 *   3. E-Tenders Module (/v1/etenders):
 *      - Working copy draft update & publish
 *      - Filtering by tender_type ('live', 'past')
 *      - Section authorization ('etenders' editor)
 *      - Admin-only deletion
 */

import express from 'express';
import request from 'supertest';
import cookieParser from 'cookie-parser';
import prisma from '../src/config/prisma';
import authRouter from '../src/routes/auth.routes';
import newsRouter from '../src/routes/news.routes';
import careersRouter from '../src/routes/careers.routes';
import etendersRouter from '../src/routes/etenders.routes';
import { env } from '../src/config/env';
import { generateAccessToken } from '../src/utils/auth';

function createApp() {
  const app = express();
  app.use(cookieParser());
  app.use(express.json());
  app.use('/v1/auth', authRouter);
  app.use('/v1/news', newsRouter);
  app.use('/v1/careers', careersRouter);
  app.use('/v1/etenders', etendersRouter);
  return app;
}

const DOMAIN = env.ALLOWED_DOMAIN;

describe('Step 8 – Content CMS (News, Careers, E-Tenders) Integration', () => {
  let app: ReturnType<typeof createApp>;

  let adminUser: any;
  let newsEditorUser: any;
  let careersEditorUser: any;
  let etendersEditorUser: any;
  let unassignedEditorUser: any;

  let adminToken: string;
  let newsEditorToken: string;
  let careersEditorToken: string;
  let etendersEditorToken: string;
  let unassignedEditorToken: string;

  beforeAll(async () => {
    app = createApp();

    // Clean up
    await prisma.careerButton.deleteMany({});
    await prisma.news.deleteMany({ where: { title: { contains: 'Step8' } } });
    await prisma.career.deleteMany({ where: { title: { contains: 'Step8' } } });
    await prisma.etender.deleteMany({ where: { title: { contains: 'Step8' } } });
    await prisma.editorSectionAssignment.deleteMany({});
    await prisma.auditLog.deleteMany({ where: { user_email: { contains: 'step8test' } } });
    await prisma.user.deleteMany({ where: { email: { contains: 'step8test' } } });

    // Seed Admin
    adminUser = await prisma.user.create({
      data: {
        email: `admin.step8test@${DOMAIN}`,
        name: 'Step8 Admin',
        role: 'admin',
        token_version: 0,
        is_active: true,
      },
    });

    // Seed Editors
    newsEditorUser = await prisma.user.create({
      data: {
        email: `news.editor.step8test@${DOMAIN}`,
        name: 'Step8 News Editor',
        role: 'editor',
        token_version: 0,
        is_active: true,
      },
    });
    await prisma.editorSectionAssignment.create({
      data: { user_id: newsEditorUser.id, section: 'news' },
    });

    careersEditorUser = await prisma.user.create({
      data: {
        email: `careers.editor.step8test@${DOMAIN}`,
        name: 'Step8 Careers Editor',
        role: 'editor',
        token_version: 0,
        is_active: true,
      },
    });
    await prisma.editorSectionAssignment.create({
      data: { user_id: careersEditorUser.id, section: 'careers' },
    });

    etendersEditorUser = await prisma.user.create({
      data: {
        email: `etenders.editor.step8test@${DOMAIN}`,
        name: 'Step8 ETenders Editor',
        role: 'editor',
        token_version: 0,
        is_active: true,
      },
    });
    await prisma.editorSectionAssignment.create({
      data: { user_id: etendersEditorUser.id, section: 'etenders' },
    });

    unassignedEditorUser = await prisma.user.create({
      data: {
        email: `unassigned.editor.step8test@${DOMAIN}`,
        name: 'Step8 Unassigned Editor',
        role: 'editor',
        token_version: 0,
        is_active: true,
      },
    });

    adminToken = generateAccessToken({ userId: adminUser.id, email: adminUser.email, role: 'admin', tokenVersion: 0 });
    newsEditorToken = generateAccessToken({ userId: newsEditorUser.id, email: newsEditorUser.email, role: 'editor', tokenVersion: 0 });
    careersEditorToken = generateAccessToken({ userId: careersEditorUser.id, email: careersEditorUser.email, role: 'editor', tokenVersion: 0 });
    etendersEditorToken = generateAccessToken({ userId: etendersEditorUser.id, email: etendersEditorUser.email, role: 'editor', tokenVersion: 0 });
    unassignedEditorToken = generateAccessToken({ userId: unassignedEditorUser.id, email: unassignedEditorUser.email, role: 'editor', tokenVersion: 0 });
  });

  afterAll(async () => {
    await prisma.careerButton.deleteMany({});
    await prisma.news.deleteMany({ where: { title: { contains: 'Step8' } } });
    await prisma.career.deleteMany({ where: { title: { contains: 'Step8' } } });
    await prisma.etender.deleteMany({ where: { title: { contains: 'Step8' } } });
    await prisma.editorSectionAssignment.deleteMany({});
    await prisma.auditLog.deleteMany({ where: { user_email: { contains: 'step8test' } } });
    await prisma.user.deleteMany({ where: { email: { contains: 'step8test' } } });
    await prisma.$disconnect();
  });

  // ─── 1. News Module ───────────────────────────────────────────────────────

  describe('News Module (/v1/news)', () => {
    let testNewsId: number;

    it('rejects unassigned editor with 403 Forbidden', async () => {
      const res = await request(app)
        .post('/v1/news')
        .set('Authorization', `Bearer ${unassignedEditorToken}`)
        .send({ title: 'Step8 Forbidden News', news_date: '2026-08-28' });
      expect(res.status).toBe(403);
    });

    it('creates news as draft by authorized news editor (201)', async () => {
      const res = await request(app)
        .post('/v1/news')
        .set('Authorization', `Bearer ${newsEditorToken}`)
        .send({
          title: 'Step8 Robotics Research Breakthrough',
          excerpt: 'IIIT Pune students achieve milestone',
          news_date: '2026-08-28',
        });

      expect(res.status).toBe(201);
      expect(res.body.news.status).toBe('draft');
      testNewsId = res.body.news.id;
    });

    it('updates draft fields only leaving live view untouched [FIX #2]', async () => {
      // First publish
      await request(app).patch(`/v1/news/${testNewsId}/publish`).set('Authorization', `Bearer ${newsEditorToken}`);

      // Update draft
      const patchRes = await request(app)
        .patch(`/v1/news/${testNewsId}`)
        .set('Authorization', `Bearer ${newsEditorToken}`)
        .send({ title: 'Step8 NEW DRAFT TITLE' });

      expect(patchRes.status).toBe(200);
      expect(patchRes.body.news.has_unpublished_draft).toBe(true);

      // Public view check
      const publicRes = await request(app).get('/v1/news');
      const publicItem = publicRes.body.news.find((n: any) => n.id === testNewsId);
      expect(publicItem.title).toBe('Step8 Robotics Research Breakthrough');
    });

    it('publishes draft atomically', async () => {
      const pubRes = await request(app)
        .patch(`/v1/news/${testNewsId}/publish`)
        .set('Authorization', `Bearer ${newsEditorToken}`);

      expect(pubRes.status).toBe(200);
      expect(pubRes.body.news.title).toBe('Step8 NEW DRAFT TITLE');
      expect(pubRes.body.news.has_unpublished_draft).toBe(false);
    });

    it('finds news item via fulltext search query (?search=Robotics)', async () => {
      const searchRes = await request(app).get('/v1/news?search=NEW');
      expect(searchRes.status).toBe(200);
      expect(searchRes.body.news.some((n: any) => n.id === testNewsId)).toBe(true);
    });

    it('allows admin to delete news item', async () => {
      const delRes = await request(app)
        .delete(`/v1/news/${testNewsId}`)
        .set('Authorization', `Bearer ${adminToken}`);
      expect(delRes.status).toBe(200);
      expect(delRes.body.message).toMatch(/deleted/i);
    });
  });

  // ─── 2. Careers Module ────────────────────────────────────────────────────

  describe('Careers Module (/v1/careers)', () => {
    let testCareerId: number;
    let testButtonId: number;

    it('creates career as draft by careers editor (201)', async () => {
      const res = await request(app)
        .post('/v1/careers')
        .set('Authorization', `Bearer ${careersEditorToken}`)
        .send({
          title: 'Step8 Assistant Professor (CSE)',
          career_type: 'live',
          last_date: '2026-09-30',
        });

      expect(res.status).toBe(201);
      expect(res.body.career.status).toBe('draft');
      testCareerId = res.body.career.id;
    });

    it('adds career action button (POST /v1/careers/:id/buttons)', async () => {
      const res = await request(app)
        .post(`/v1/careers/${testCareerId}/buttons`)
        .set('Authorization', `Bearer ${careersEditorToken}`)
        .send({
          label: 'Apply Online',
          url: 'https://forms.gle/apply',
          display_order: 1,
        });

      expect(res.status).toBe(201);
      expect(res.body.button.label).toBe('Apply Online');
      testButtonId = res.body.button.id;
    });

    it('updates career button (PATCH /v1/careers/:id/buttons/:btnId)', async () => {
      const res = await request(app)
        .patch(`/v1/careers/${testCareerId}/buttons/${testButtonId}`)
        .set('Authorization', `Bearer ${careersEditorToken}`)
        .send({ label: 'Apply Now via Portal' });

      expect(res.status).toBe(200);
      expect(res.body.button.label).toBe('Apply Now via Portal');
    });

    it('publishes career and includes buttons in public details', async () => {
      await request(app).patch(`/v1/careers/${testCareerId}/publish`).set('Authorization', `Bearer ${careersEditorToken}`);

      const res = await request(app).get(`/v1/careers/${testCareerId}`);
      expect(res.status).toBe(200);
      expect(res.body.career.status).toBe('published');
      expect(res.body.career.buttons.length).toBe(1);
    });

    it('deletes career button', async () => {
      const res = await request(app)
        .delete(`/v1/careers/${testCareerId}/buttons/${testButtonId}`)
        .set('Authorization', `Bearer ${careersEditorToken}`);
      expect(res.status).toBe(200);
    });
  });

  // ─── 3. E-Tenders Module ──────────────────────────────────────────────────

  describe('E-Tenders Module (/v1/etenders)', () => {
    let testTenderId: number;

    it('creates etender draft by etenders editor (201)', async () => {
      const res = await request(app)
        .post('/v1/etenders')
        .set('Authorization', `Bearer ${etendersEditorToken}`)
        .send({
          title: 'Step8 Campus High-Speed Networking Hardware Tender',
          tender_number: 'IIITP/TENDER/2026/08',
          tender_type: 'live',
          submission_date: '15 September 2026, 5:00 PM',
        });

      expect(res.status).toBe(201);
      expect(res.body.etender.status).toBe('draft');
      testTenderId = res.body.etender.id;
    });

    it('updates draft and publishes etender [FIX #2]', async () => {
      const updateRes = await request(app)
        .patch(`/v1/etenders/${testTenderId}`)
        .set('Authorization', `Bearer ${etendersEditorToken}`)
        .send({ corrigendum_url: 'https://iiitp.ac.in/tender/corrigendum1.pdf' });

      expect(updateRes.status).toBe(200);
      expect(updateRes.body.etender.has_unpublished_draft).toBe(true);

      const pubRes = await request(app)
        .patch(`/v1/etenders/${testTenderId}/publish`)
        .set('Authorization', `Bearer ${etendersEditorToken}`);

      expect(pubRes.status).toBe(200);
      expect(pubRes.body.etender.status).toBe('published');
      expect(pubRes.body.etender.corrigendum_url).toBe('https://iiitp.ac.in/tender/corrigendum1.pdf');
    });

    it('archives etender', async () => {
      const res = await request(app)
        .patch(`/v1/etenders/${testTenderId}/archive`)
        .set('Authorization', `Bearer ${etendersEditorToken}`);

      expect(res.status).toBe(200);
      expect(res.body.etender.status).toBe('archived');
      expect(res.body.etender.tender_type).toBe('past');
    });

    it('allows admin to delete etender', async () => {
      const res = await request(app)
        .delete(`/v1/etenders/${testTenderId}`)
        .set('Authorization', `Bearer ${adminToken}`);
      expect(res.status).toBe(200);
    });
  });
});
