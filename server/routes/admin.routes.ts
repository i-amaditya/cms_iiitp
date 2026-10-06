import { Router } from 'express';
import { authenticateToken, AuthenticatedRequest } from '../middleware/auth.ts';
import { requireRole } from '../middleware/rbac.ts';
import {
  getAdminFacultyList,
  getFacultyById,
  createFaculty,
  updateFaculty,
  deleteFaculty,
  approveFacultyProfile,
  rejectFacultyProfile,
  reorderFaculty,
  getFacultyVersionHistory
} from '../services/faculty.service.ts';
import {
  getAllDepartments,
  getDepartmentById,
  createDepartment,
  updateDepartment,
  deleteDepartment
} from '../services/department.service.ts';
import {
  getAllUsers,
  createUser,
  updateUser,
  resetUserPassword,
  provisionAllFacultyAccounts
} from '../services/user.service.ts';
import { getAuditLogs } from '../services/audit.service.ts';
import { queryOne } from '../db/connection.ts';

const router = Router();

// Only SUPER_ADMIN and ADMIN can access admin routes
router.use(authenticateToken);
router.use(requireRole(['SUPER_ADMIN', 'ADMIN']));

router.post('/faculty-accounts/provision', requireRole(['SUPER_ADMIN']), async (req: AuthenticatedRequest, res) => {
  try {
    const credentials = await provisionAllFacultyAccounts(req.user!.id, req);
    res.json({
      message: `Generated temporary credentials for ${credentials.length} faculty accounts.`,
      credentials
    });
  } catch (err: any) {
    res.status(400).json({ error: err.message || 'Faculty accounts could not be provisioned.' });
  }
});

// -------------------------------------------------------------
// DASHBOARD STATS
// -------------------------------------------------------------
router.get('/stats', async (_req, res) => {
  try {
    const [totalFaculty, publishedFaculty, pendingApproval, totalDepartments, totalUsers] = await Promise.all([
      queryOne<{ c: number }>('SELECT COUNT(*) as c FROM faculty;'),
      queryOne<{ c: number }>('SELECT COUNT(*) as c FROM faculty WHERE status = "PUBLISHED" AND is_active = 1;'),
      queryOne<{ c: number }>('SELECT COUNT(*) as c FROM faculty WHERE status = "PENDING_APPROVAL";'),
      queryOne<{ c: number }>('SELECT COUNT(*) as c FROM departments WHERE is_active = 1;'),
      queryOne<{ c: number }>('SELECT COUNT(*) as c FROM users WHERE is_active = 1;')
    ]);

    res.json({
      totalFaculty: totalFaculty?.c || 0,
      publishedFaculty: publishedFaculty?.c || 0,
      pendingApproval: pendingApproval?.c || 0,
      totalDepartments: totalDepartments?.c || 0,
      totalUsers: totalUsers?.c || 0
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// -------------------------------------------------------------
// FACULTY MANAGEMENT
// -------------------------------------------------------------
// GET /api/admin/faculty
router.get('/faculty', async (req, res) => {
  try {
    const { departmentId, designation, status, search, isActive } = req.query;
    const faculty = await getAdminFacultyList({
      departmentId: departmentId ? parseInt(departmentId as string, 10) : undefined,
      designation: designation as string,
      status: status as string,
      search: search as string,
      isActive: isActive !== undefined ? isActive === 'true' : undefined
    });
    res.json(faculty);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/admin/faculty/pending
router.get('/faculty/pending', async (_req, res) => {
  try {
    const pending = await getAdminFacultyList({ status: 'PENDING_APPROVAL' });
    res.json(pending);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/admin/faculty
router.post('/faculty', async (req: AuthenticatedRequest, res) => {
  try {
    const created = await createFaculty(req.body, req.user!.id, req);
    res.status(201).json(created);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

// POST /api/admin/faculty/reorder
router.post('/faculty/reorder', async (req: AuthenticatedRequest, res) => {
  try {
    const { orderedIds } = req.body;
    if (!Array.isArray(orderedIds)) {
      res.status(400).json({ error: 'orderedIds must be an array of numbers' });
      return;
    }
    await reorderFaculty(orderedIds, req.user!.id, req);
    res.json({ message: 'Faculty display order updated successfully' });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

// GET /api/admin/faculty/:id
router.get('/faculty/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const faculty = await getFacultyById(id);
    if (!faculty) {
      res.status(404).json({ error: 'Faculty profile not found' });
      return;
    }
    res.json(faculty);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/admin/faculty/:id
router.put('/faculty/:id', async (req: AuthenticatedRequest, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const updated = await updateFaculty(id, req.body, req.user!.id, false, req);
    res.json(updated);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE /api/admin/faculty/:id
router.delete('/faculty/:id', async (req: AuthenticatedRequest, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    await deleteFaculty(id, req.user!.id, req);
    res.json({ message: 'Faculty profile deleted successfully' });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

// POST /api/admin/faculty/:id/approve
router.post('/faculty/:id/approve', async (req: AuthenticatedRequest, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const approved = await approveFacultyProfile(id, req.user!.id, req);
    res.json({
      message: 'Faculty profile approved and published to the website.',
      faculty: approved
    });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

// POST /api/admin/faculty/:id/reject
router.post('/faculty/:id/reject', async (req: AuthenticatedRequest, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const { rejectionReason } = req.body;
    if (!rejectionReason) {
      res.status(400).json({ error: 'Rejection reason is required' });
      return;
    }
    const rejected = await rejectFacultyProfile(id, req.user!.id, rejectionReason, req);
    res.json({
      message: 'Faculty profile rejected with feedback recorded.',
      faculty: rejected
    });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

// GET /api/admin/faculty/:id/history
router.get('/faculty/:id/history', async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const history = await getFacultyVersionHistory(id);
    res.json(history);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// -------------------------------------------------------------
// DEPARTMENTS
// -------------------------------------------------------------
router.get('/departments', async (_req, res) => {
  try {
    const departments = await getAllDepartments(false);
    res.json(departments);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/departments', async (req: AuthenticatedRequest, res) => {
  try {
    const created = await createDepartment(req.body, req.user!.id, req);
    res.status(201).json(created);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

router.put('/departments/:id', async (req: AuthenticatedRequest, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const updated = await updateDepartment(id, req.body, req.user!.id, req);
    res.json(updated);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

router.delete('/departments/:id', async (req: AuthenticatedRequest, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    await deleteDepartment(id, req.user!.id, req);
    res.json({ message: 'Department deleted successfully' });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

// -------------------------------------------------------------
// USER MANAGEMENT & CREDENTIALS
// -------------------------------------------------------------
router.get('/users', async (_req, res) => {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/users', async (req: AuthenticatedRequest, res) => {
  try {
    const { username, email, password, role, facultyId } = req.body;
    if (!username || !email || !password || !role) {
      res.status(400).json({ error: 'Username, email, password, and role are required' });
      return;
    }
    const created = await createUser(
      { username, email, passwordPlain: password, role, facultyId: facultyId ? parseInt(facultyId, 10) : null },
      req.user!.id,
      req
    );
    res.status(201).json(created);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

router.put('/users/:id', async (req: AuthenticatedRequest, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const { role, facultyId, isActive, email } = req.body;
    const updated = await updateUser(
      id,
      {
        role,
        facultyId: facultyId !== undefined ? (facultyId ? parseInt(facultyId, 10) : null) : undefined,
        isActive,
        email
      },
      req.user!.id,
      req
    );
    res.json(updated);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

router.post('/users/:id/reset-password', async (req: AuthenticatedRequest, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const { newPassword } = req.body;
    if (!newPassword) {
      res.status(400).json({ error: 'New password is required' });
      return;
    }
    await resetUserPassword(id, newPassword, req.user!.id, req);
    res.json({ message: 'Password reset successfully' });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

// -------------------------------------------------------------
// AUDIT LOGS
// -------------------------------------------------------------
router.get('/audit-logs', async (req, res) => {
  try {
    const { limit, offset, action, entityType } = req.query;
    const logs = await getAuditLogs({
      limit: limit ? parseInt(limit as string, 10) : 50,
      offset: offset ? parseInt(offset as string, 10) : 0,
      action: action as string,
      entityType: entityType as string
    });
    res.json(logs);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
