import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from './auth.ts';

/**
 * Enforce minimum or matching roles (e.g. ['SUPER_ADMIN', 'ADMIN'])
 */
export function requireRole(allowedRoles: Array<'SUPER_ADMIN' | 'ADMIN' | 'FACULTY'>) {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({ error: 'Unauthorized: Authentication required' });
      return;
    }

    if (!allowedRoles.includes(req.user.role)) {
      res.status(403).json({
        error: `Forbidden: Access restricted. Requires one of [${allowedRoles.join(', ')}], but current role is ${req.user.role}`
      });
      return;
    }

    next();
  };
}

/**
 * Server-side faculty authorization guard.
 * Prevents horizontal privilege escalation where Faculty A attempts to edit Faculty B's profile.
 * - SUPER_ADMIN & ADMIN can access any faculty profile.
 * - FACULTY can ONLY access their own profile (matching user.facultyId).
 */
export function verifyFacultyOwnership(paramName: string = 'id') {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({ error: 'Unauthorized: Authentication required' });
      return;
    }

    // Admins bypass individual ownership checks
    if (req.user.role === 'SUPER_ADMIN' || req.user.role === 'ADMIN') {
      next();
      return;
    }

    // Role is FACULTY
    if (req.user.role === 'FACULTY') {
      const targetFacultyId = parseInt(req.params[paramName], 10);
      
      if (!req.user.facultyId) {
        res.status(403).json({
          error: 'Forbidden: Your user account is not linked to any faculty profile. Please contact the administrator.'
        });
        return;
      }

      if (isNaN(targetFacultyId) || req.user.facultyId !== targetFacultyId) {
        res.status(403).json({
          error: `Forbidden: Horizontal privilege escalation blocked. You cannot view or modify faculty profile #${targetFacultyId}.`
        });
        return;
      }

      next();
      return;
    }

    res.status(403).json({ error: 'Forbidden: Insufficient permissions' });
  };
}
