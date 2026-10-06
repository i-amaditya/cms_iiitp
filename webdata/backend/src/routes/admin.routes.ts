/**
 * src/routes/admin.routes.ts
 *
 * Express Router for all /v1/admin endpoints (Section 5.2).
 *
 * All routes mounted on this router require:
 *   1. authenticateJWT — Valid access token
 *   2. requireRole(['admin']) — Strict admin role enforcement
 */

import { Router } from 'express';
import { authenticateJWT } from '../middlewares/auth';
import { requireRole } from '../middlewares/role';
import {
  listUsers,
  getUserById,
  updateUser,
  createInvite,
  listInvites,
  revokeInvite,
  assignEditorSections,
  removeEditorSection,
} from '../controllers/admin.controller';

const router = Router();

// Protect all admin routes globally
router.use(authenticateJWT, requireRole(['admin']));

// ── Users Management ─────────────────────────────────────────────────────────
router.get('/users', listUsers);
router.get('/users/:id', getUserById);
router.patch('/users/:id', updateUser);

// ── Section Assignments (for Editors) ────────────────────────────────────────
router.post('/users/:id/sections', assignEditorSections);
router.delete('/users/:id/sections/:section', removeEditorSection);

// ── Invites Management ───────────────────────────────────────────────────────
router.get('/invites', listInvites);
router.post('/invites', createInvite);
router.delete('/invites/:id', revokeInvite);

export default router;
