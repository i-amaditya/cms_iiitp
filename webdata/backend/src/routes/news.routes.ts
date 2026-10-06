/**
 * src/routes/news.routes.ts
 *
 * Express Router for /v1/news (Section 5.4)
 */

import { Router } from 'express';
import { authenticateJWT, optionalAuthenticateJWT } from '../middlewares/auth';
import { requireRole, requireSection } from '../middlewares/role';
import {
  listNews,
  getNewsById,
  createNews,
  updateNewsDraft,
  publishNews,
  archiveNews,
  deleteNews,
} from '../controllers/news.controller';

const router = Router();

// Public Routes (optional auth for draft preview)
router.get('/', optionalAuthenticateJWT, listNews);
router.get('/:id', optionalAuthenticateJWT, getNewsById);

// Protected Editorial Routes (requires 'news' section permission or Admin)
router.post('/', authenticateJWT, requireSection('news'), createNews);
router.patch('/:id', authenticateJWT, requireSection('news'), updateNewsDraft);
router.patch('/:id/publish', authenticateJWT, requireSection('news'), publishNews);
router.patch('/:id/archive', authenticateJWT, requireSection('news'), archiveNews);

// Admin-Only Deletion
router.delete('/:id', authenticateJWT, requireRole(['admin']), deleteNews);

export default router;
