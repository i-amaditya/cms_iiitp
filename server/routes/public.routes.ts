import { Router } from 'express';
import { getPublicFacultyList, getPublicFacultyBySlug } from '../services/faculty.service.ts';
import { getAllDepartments } from '../services/department.service.ts';
import { optionalAuthenticateToken, AuthenticatedRequest } from '../middleware/auth.ts';

const router = Router();

// GET /api/public/faculty
router.get('/faculty', async (req, res) => {
  try {
    const { department, designation, search } = req.query;
    const faculty = await getPublicFacultyList({
      departmentSlug: department as string,
      designation: designation as string,
      search: search as string
    });
    res.json(faculty);
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to retrieve faculty directory' });
  }
});

// GET /api/public/faculty/:slug
router.get('/faculty/:slug', optionalAuthenticateToken, async (req: AuthenticatedRequest, res) => {
  try {
    const { slug } = req.params;
    const user = req.user;
    const isAdmin = Boolean(user && (user.role === 'SUPER_ADMIN' || user.role === 'ADMIN'));
    
    const faculty = await getPublicFacultyBySlug(slug, {
      isAdmin,
      userId: user?.id,
      facultyId: user?.facultyId
    });

    if (!faculty) {
      res.status(404).json({ error: 'Faculty profile not found or is currently not publicly visible' });
      return;
    }
    res.json(faculty);
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to retrieve faculty details' });
  }
});

// GET /api/public/departments
router.get('/departments', async (_req, res) => {
  try {
    const departments = await getAllDepartments(true);
    res.json(departments);
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to retrieve departments' });
  }
});

export default router;
