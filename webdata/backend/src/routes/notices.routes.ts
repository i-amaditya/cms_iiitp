/**
 * src/routes/notices.routes.ts
 *
 * Express Router for /v1/notices (Section 5.3)
 *
 * Route Table:
 *   GET    /v1/notices            — Public list (paginated, fulltext search, category filter)
 *   GET    /v1/notices/:id        — Public single notice view
 *   POST   /v1/notices            — Create notice draft (Editor of 'notices' or Admin)
 *   PATCH  /v1/notices/:id        — Update draft fields only (Editor of 'notices' or Admin)
 *   PATCH  /v1/notices/:id/publish — Copy draft -> live fields & set status=published
 *   PATCH  /v1/notices/:id/archive — Set status=archived
 *   DELETE /v1/notices/:id        — Hard delete (Admin only per plan §5.3)
 */

import { Router } from 'express';
import { authenticateJWT, optionalAuthenticateJWT } from '../middlewares/auth';
import { requireRole, requireSection } from '../middlewares/role';
import {
  listNotices,
  getNoticeById,
  createNotice,
  updateNoticeDraft,
  publishNotice,
  archiveNotice,
  deleteNotice,
} from '../controllers/notices.controller';

const router = Router();

// ── Public Routes (with optional auth for draft preview) ──────────────────────
router.get('/', optionalAuthenticateJWT, listNotices);
router.get('/:id', optionalAuthenticateJWT, getNoticeById);

// ── Protected Editorial Routes (Requires 'notices' section permission or Admin) ─
router.post('/', authenticateJWT, requireSection('notices'), createNotice);
router.patch('/:id', authenticateJWT, requireSection('notices'), updateNoticeDraft);
router.patch('/:id/publish', authenticateJWT, requireSection('notices'), publishNotice);
router.patch('/:id/archive', authenticateJWT, requireSection('notices'), archiveNotice);

// ── Admin-Only Deletion ───────────────────────────────────────────────────────
router.delete('/:id', authenticateJWT, requireRole(['admin']), deleteNotice);

export default router;
