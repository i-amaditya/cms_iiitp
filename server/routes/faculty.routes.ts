import { Router, Response } from 'express';
import { authenticateToken, AuthenticatedRequest } from '../middleware/auth.ts';
import { requireRole, verifyFacultyOwnership } from '../middleware/rbac.ts';
import {
  getFacultyById,
  updateFaculty,
  submitFacultyForApproval,
  getFacultyVersionHistory
} from '../services/faculty.service.ts';

const router = Router();

// Apply auth to all /api/faculty routes
router.use(authenticateToken);

/**
 * Helper to ensure user is linked to a faculty profile
 */
function getLinkedFacultyId(req: AuthenticatedRequest, res: Response): number | null {
  if (!req.user?.facultyId) {
    res.status(403).json({
      error: 'Forbidden: Your user account is not linked to any faculty record.'
    });
    return null;
  }
  return req.user.facultyId;
}

/**
 * GET /api/faculty/me
 * Retrieves the currently logged-in faculty member's profile
 */
router.get('/me', requireRole(['FACULTY', 'ADMIN', 'SUPER_ADMIN']), async (req: AuthenticatedRequest, res) => {
  try {
    const facultyId = getLinkedFacultyId(req, res);
    if (!facultyId) return;

    const faculty = await getFacultyById(facultyId);
    if (!faculty) {
      res.status(404).json({ error: 'Faculty record not found' });
      return;
    }

    res.json(faculty);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * PUT /api/faculty/me
 * Update the faculty member's own profile.
 * Triggers version snapshotting and sets status to DRAFT or PENDING_APPROVAL.
 */
router.put('/me', requireRole(['FACULTY', 'ADMIN', 'SUPER_ADMIN']), async (req: AuthenticatedRequest, res) => {
  try {
    const facultyId = getLinkedFacultyId(req, res);
    if (!facultyId) return;

    const updated = await updateFaculty(
      facultyId,
      req.body,
      req.user!.id,
      true, // isSelfService
      req
    );

    res.json(updated);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

/**
 * POST /api/faculty/me/submit
 * Submits the profile for administrator review and approval
 */
router.post('/me/submit', requireRole(['FACULTY', 'ADMIN', 'SUPER_ADMIN']), async (req: AuthenticatedRequest, res) => {
  try {
    const facultyId = getLinkedFacultyId(req, res);
    if (!facultyId) return;

    const submitted = await submitFacultyForApproval(facultyId, req.user!.id, req);
    res.json({
      message: 'Your profile has been submitted for administrator review.',
      faculty: submitted
    });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

/**
 * GET /api/faculty/me/history
 * View version change history and review comments for own profile
 */
router.get('/me/history', requireRole(['FACULTY', 'ADMIN', 'SUPER_ADMIN']), async (req: AuthenticatedRequest, res) => {
  try {
    const facultyId = getLinkedFacultyId(req, res);
    if (!facultyId) return;

    const history = await getFacultyVersionHistory(facultyId);
    res.json(history);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * PUT /api/faculty/:id
 * Direct ID update endpoint protected by server-side ownership verification.
 * If user is FACULTY, it validates req.user.facultyId === req.params.id.
 * If they do not match, yields 403 Forbidden!
 */
router.put('/:id', verifyFacultyOwnership('id'), async (req: AuthenticatedRequest, res) => {
  try {
    const targetId = parseInt(req.params.id, 10);
    const isSelfService = req.user?.role === 'FACULTY';
    const updated = await updateFaculty(targetId, req.body, req.user!.id, isSelfService, req);
    res.json(updated);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
