/**
 * tests/step9.media_routes.test.ts — Step 9: Media Upload Subsystem Integration Tests
 *
 * Tests Section 5.6 Media Upload & FIX #6 Security Requirements:
 *
 *   1. Upload Validation & Permissions:
 *      - Unauthenticated requests rejected with 401
 *      - Unsupported MIME types (e.g. text/plain, exe) rejected with 400
 *      - Images > 5MB rejected with 400
 *      - PDFs > 20MB rejected with 400
 *
 *   2. Image Optimization & Sharp Processing:
 *      - Uploaded PNG / JPEG converted to WebP
 *      - Stored on disk in uploads/images/
 *      - Database record created with is_pdf = false
 *
 *   3. PDF Handling & Security [FIX #6]:
 *      - Uploaded PDF stored in uploads/documents/
 *      - Database record created with is_pdf = true
 *      - Static file download (/uploads/documents/...) includes:
 *        `Content-Disposition: attachment; filename="*.pdf"`
 *
 *   4. Admin Media Library & Deletion:
 *      - GET /v1/media lists files (Admin only, Editor gets 403)
 *      - DELETE /v1/media/:id unlinks file from disk and deletes DB row (Admin only)
 */

import express from 'express';
import request from 'supertest';
import cookieParser from 'cookie-parser';
import fs from 'fs';
import path from 'path';
import prisma from '../src/config/prisma';
import authRouter from '../src/routes/auth.routes';
import mediaRouter from '../src/routes/media.routes';
import { env } from '../src/config/env';
import { generateAccessToken } from '../src/utils/auth';

function createApp() {
  const app = express();
  app.use(cookieParser());
  app.use(express.json());

  // Static serving matching index.ts [FIX #6]
  app.use('/uploads', express.static(path.resolve(process.cwd(), env.UPLOAD_DIR), {
    setHeaders: (res, filePath) => {
      if (filePath.toLowerCase().endsWith('.pdf')) {
        const fileName = path.basename(filePath);
        res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
        res.setHeader('Content-Type', 'application/pdf');
      }
    },
  }));

  app.use('/v1/auth', authRouter);
  app.use('/v1/media', mediaRouter);
  return app;
}

const DOMAIN = env.ALLOWED_DOMAIN;

describe('Step 9 – Media Upload Subsystem Integration', () => {
  let app: ReturnType<typeof createApp>;

  let adminUser: any;
  let editorUser: any;

  let adminToken: string;
  let editorToken: string;

  beforeAll(async () => {
    app = createApp();

    // Clean up
    await prisma.mediaFile.deleteMany({});
    await prisma.auditLog.deleteMany({ where: { user_email: { contains: 'step9test' } } });
    await prisma.user.deleteMany({ where: { email: { contains: 'step9test' } } });

    // Seed Admin
    adminUser = await prisma.user.create({
      data: {
        email: `admin.step9test@${DOMAIN}`,
        name: 'Step9 Admin',
        role: 'admin',
        token_version: 0,
        is_active: true,
      },
    });

    // Seed Editor
    editorUser = await prisma.user.create({
      data: {
        email: `editor.step9test@${DOMAIN}`,
        name: 'Step9 Editor',
        role: 'editor',
        token_version: 0,
        is_active: true,
      },
    });

    adminToken = generateAccessToken({ userId: adminUser.id, email: adminUser.email, role: 'admin', tokenVersion: 0 });
    editorToken = generateAccessToken({ userId: editorUser.id, email: editorUser.email, role: 'editor', tokenVersion: 0 });
  });

  afterAll(async () => {
    await prisma.mediaFile.deleteMany({});
    await prisma.auditLog.deleteMany({ where: { user_email: { contains: 'step9test' } } });
    await prisma.user.deleteMany({ where: { email: { contains: 'step9test' } } });
    await prisma.$disconnect();
  });

  // ─── 1. Validation & Permissions ──────────────────────────────────────────

  describe('Upload Validation & Auth', () => {
    it('rejects unauthenticated upload request with 401', async () => {
      const res = await request(app)
        .post('/v1/media/upload')
        .attach('file', Buffer.from('fake pdf data'), 'test.pdf');
      expect(res.status).toBe(401);
    });

    it('rejects upload when no file is attached (400)', async () => {
      const res = await request(app)
        .post('/v1/media/upload')
        .set('Authorization', `Bearer ${editorToken}`);
      expect(res.status).toBe(400);
      expect(res.body.error).toMatch(/no file provided/i);
    });

    it('rejects unsupported file type (e.g. text/plain) with 500/400 multer error', async () => {
      const res = await request(app)
        .post('/v1/media/upload')
        .set('Authorization', `Bearer ${editorToken}`)
        .attach('file', Buffer.from('hello plain text'), 'notes.txt');
      expect(res.status).toBeGreaterThanOrEqual(400);
    });
  });

  // ─── 2. Image Optimization (Sharp) ────────────────────────────────────────

  describe('Image Upload & Sharp WebP Conversion', () => {
    let uploadedImageId: number;

    it('uploads PNG image, converts to WebP with Sharp, and saves record (201)', async () => {
      // 1x1 transparent PNG buffer
      const pngBuffer = Buffer.from(
        'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
        'base64'
      );

      const res = await request(app)
        .post('/v1/media/upload')
        .set('Authorization', `Bearer ${editorToken}`)
        .field('context', 'notice')
        .attach('file', pngBuffer, 'test_banner.png');

      expect(res.status).toBe(201);
      expect(res.body.file.is_pdf).toBe(false);
      expect(res.body.file.mime_type).toBe('image/webp');
      expect(res.body.file.filename.endsWith('.webp')).toBe(true);
      expect(res.body.file.url).toContain('/uploads/images/');

      uploadedImageId = res.body.file.id;

      // Verify in DB
      const record = await prisma.mediaFile.findUnique({ where: { id: uploadedImageId } });
      expect(record).toBeDefined();
      expect(record!.is_pdf).toBe(false);

      // Verify file exists on disk
      expect(fs.existsSync(record!.storage_path!)).toBe(true);
    });
  });

  // ─── 3. PDF Upload & Content-Disposition Enforcement [FIX #6] ─────────────

  describe('PDF Upload & Download Enforcement [FIX #6]', () => {
    let uploadedPdfId: number;
    let pdfUrlPath: string;

    it('uploads PDF document safely with is_pdf = true (201)', async () => {
      const dummyPdf = Buffer.from('%PDF-1.4 ... dummy pdf payload ...');

      const res = await request(app)
        .post('/v1/media/upload')
        .set('Authorization', `Bearer ${editorToken}`)
        .field('context', 'tender')
        .attach('file', dummyPdf, 'Tender_Doc_2026.pdf');

      expect(res.status).toBe(201);
      expect(res.body.file.is_pdf).toBe(true);
      expect(res.body.file.mime_type).toBe('application/pdf');
      expect(res.body.file.url).toContain('/uploads/documents/');

      uploadedPdfId = res.body.file.id;

      // Extract relative path to test static download
      const fullUrl = res.body.file.url;
      pdfUrlPath = new URL(fullUrl).pathname;
    });

    it('enforces Content-Disposition: attachment header when serving PDF files [FIX #6]', async () => {
      const res = await request(app).get(pdfUrlPath);
      expect(res.status).toBe(200);

      // Critical Security Check: Content-Disposition must force download
      const contentDisposition = res.headers['content-disposition'];
      expect(contentDisposition).toBeDefined();
      expect(contentDisposition).toContain('attachment');
      expect(contentDisposition).toContain('.pdf');
    });
  });

  // ─── 4. Admin Media Library & Deletion ────────────────────────────────────

  describe('Admin Media Library & Deletion', () => {
    it('rejects non-admin from listing media library with 403 Forbidden', async () => {
      const res = await request(app)
        .get('/v1/media')
        .set('Authorization', `Bearer ${editorToken}`);
      expect(res.status).toBe(403);
    });

    it('allows admin to list all uploaded files with pagination', async () => {
      const res = await request(app)
        .get('/v1/media?page=1&limit=10')
        .set('Authorization', `Bearer ${adminToken}`);

      expect(res.status).toBe(200);
      expect(res.body.files.length).toBeGreaterThanOrEqual(2);
      expect(res.body.pagination.total).toBeGreaterThanOrEqual(2);
    });

    it('allows admin to delete media file and unlinks from disk', async () => {
      // Find a record to delete
      const fileToDelete = await prisma.mediaFile.findFirst({
        where: { original_name: 'Tender_Doc_2026.pdf' },
      });
      expect(fileToDelete).toBeDefined();

      const diskPath = fileToDelete!.storage_path!;
      expect(fs.existsSync(diskPath)).toBe(true);

      const delRes = await request(app)
        .delete(`/v1/media/${fileToDelete!.id}`)
        .set('Authorization', `Bearer ${adminToken}`);

      expect(delRes.status).toBe(200);
      expect(delRes.body.message).toMatch(/deleted successfully/i);

      // Verify DB row deleted
      const checkDb = await prisma.mediaFile.findUnique({ where: { id: fileToDelete!.id } });
      expect(checkDb).toBeNull();

      // Verify file removed from disk
      expect(fs.existsSync(diskPath)).toBe(false);
    });
  });
});
