/**
 * src/routes/media.routes.ts
 *
 * Express Router for /v1/media (Section 5.6)
 *
 * Routes:
 *   POST   /v1/media/upload — Upload file (admin, editor, faculty)
 *   GET    /v1/media        — List media files (admin only)
 *   DELETE /v1/media/:id    — Delete media file (admin only)
 */

import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import { authenticateJWT } from '../middlewares/auth';
import { requireRole } from '../middlewares/role';
import { uploadMiddleware } from '../utils/upload';
import { uploadMedia, listMedia, deleteMedia } from '../controllers/media.controller';

const router = Router();

// Tighter rate limiter for upload endpoint — 20 uploads per minute per IP
const uploadLimiter = process.env.NODE_ENV === 'test'
  ? (_req: any, _res: any, next: any) => next()
  : rateLimit({
      windowMs: 60 * 1000,
      max: 20,
      standardHeaders: true,
      legacyHeaders: false,
      message: { error: 'Too many upload requests. Please slow down.' },
    });

// POST /v1/media/upload (editor, admin, faculty)
router.post(
  '/upload',
  uploadLimiter,
  authenticateJWT,
  requireRole(['admin', 'editor', 'faculty']),
  uploadMiddleware.single('file'),
  uploadMedia
);

// GET /v1/media (admin only)
router.get(
  '/',
  authenticateJWT,
  requireRole(['admin']),
  listMedia
);

// DELETE /v1/media/:id (admin only)
router.delete(
  '/:id',
  authenticateJWT,
  requireRole(['admin']),
  deleteMedia
);

export default router;
