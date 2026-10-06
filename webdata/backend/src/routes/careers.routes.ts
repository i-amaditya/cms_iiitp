/**
 * src/routes/careers.routes.ts
 *
 * Express Router for /v1/careers (Section 5.4)
 */

import { Router } from 'express';
import { authenticateJWT, optionalAuthenticateJWT } from '../middlewares/auth';
import { requireRole, requireSection } from '../middlewares/role';
import {
  listCareers,
  getCareerById,
  createCareer,
  updateCareerDraft,
  publishCareer,
  archiveCareer,
  deleteCareer,
  addCareerButton,
  updateCareerButton,
  deleteCareerButton,
} from '../controllers/careers.controller';

const router = Router();

// Public Routes
router.get('/', optionalAuthenticateJWT, listCareers);
router.get('/:id', optionalAuthenticateJWT, getCareerById);

// Protected Editorial Routes
router.post('/', authenticateJWT, requireSection('careers'), createCareer);
router.patch('/:id', authenticateJWT, requireSection('careers'), updateCareerDraft);
router.patch('/:id/publish', authenticateJWT, requireSection('careers'), publishCareer);
router.patch('/:id/archive', authenticateJWT, requireSection('careers'), archiveCareer);

// Buttons Sub-Resource
router.post('/:id/buttons', authenticateJWT, requireSection('careers'), addCareerButton);
router.patch('/:id/buttons/:btnId', authenticateJWT, requireSection('careers'), updateCareerButton);
router.delete('/:id/buttons/:btnId', authenticateJWT, requireSection('careers'), deleteCareerButton);

// Admin-Only Deletion
router.delete('/:id', authenticateJWT, requireRole(['admin']), deleteCareer);

export default router;
