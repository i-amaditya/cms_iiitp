import { Router } from 'express';
import { loginUser, getCurrentUserProfile, changeOwnPassword } from '../services/auth.service.ts';
import { authenticateToken, AuthenticatedRequest } from '../middleware/auth.ts';
import { recordAuditLog } from '../services/audit.service.ts';

const router = Router();

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      res.status(400).json({ error: 'Username/Email and Password are required' });
      return;
    }

    const result = await loginUser(username.trim(), password, req);
    res.json(result);
  } catch (err: any) {
    res.status(401).json({ error: err.message || 'Login failed' });
  }
});

router.get('/me', authenticateToken, async (req: AuthenticatedRequest, res) => {
  try {
    const profile = await getCurrentUserProfile(req.user!.id);
    if (!profile) {
      res.status(404).json({ error: 'User profile not found' });
      return;
    }
    res.json(profile);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/change-password', authenticateToken, async (req: AuthenticatedRequest, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    await changeOwnPassword(req.user!.id, currentPassword, newPassword);
    res.json({ message: 'Password changed successfully. You can now access your faculty profile.' });
  } catch (err: any) {
    res.status(400).json({ error: err.message || 'Password change failed' });
  }
});

router.post('/logout', authenticateToken, async (req: AuthenticatedRequest, res) => {
  try {
    await recordAuditLog({
      userId: req.user!.id,
      action: 'LOGOUT',
      entityType: 'user',
      entityId: req.user!.id,
      req
    });
    res.json({ message: 'Logged out successfully' });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
