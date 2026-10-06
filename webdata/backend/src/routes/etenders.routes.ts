/**
 * src/routes/etenders.routes.ts
 *
 * Express Router for /v1/etenders (Section 5.4)
 */

import { Router } from 'express';
import { authenticateJWT, optionalAuthenticateJWT } from '../middlewares/auth';
import { requireRole, requireSection } from '../middlewares/role';
import {
  listEtenders,
  getEtenderById,
  createEtender,
  updateEtenderDraft,
  publishEtender,
  archiveEtender,
  deleteEtender,
} from '../controllers/etenders.controller';

const router = Router();

// Public Routes
router.get('/', optionalAuthenticateJWT, listEtenders);
router.get('/:id', optionalAuthenticateJWT, getEtenderById);

// Protected Editorial Routes
router.post('/', authenticateJWT, requireSection('etenders'), createEtender);
router.patch('/:id', authenticateJWT, requireSection('etenders'), updateEtenderDraft);
router.patch('/:id/publish', authenticateJWT, requireSection('etenders'), publishEtender);
router.patch('/:id/archive', authenticateJWT, requireSection('etenders'), archiveEtender);

// Admin-Only Deletion
router.delete('/:id', authenticateJWT, requireRole(['admin']), deleteEtender);

export default router;
