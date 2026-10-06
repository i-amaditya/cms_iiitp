import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config/index.ts';
import { queryOne } from '../db/connection.ts';

export interface AuthUser {
  id: number;
  username: string;
  email: string;
  role: 'SUPER_ADMIN' | 'ADMIN' | 'FACULTY';
  facultyId: number | null;
  mustChangePassword: boolean;
}

export interface AuthenticatedRequest extends Request {
  user?: AuthUser;
}

export async function authenticateToken(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Unauthorized: Authentication token is missing or malformed' });
    return;
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, config.jwtSecret) as AuthUser;

    // Verify user still exists and is active in database
    const dbUser = await queryOne<{ id: number; username: string; email: string; role: 'SUPER_ADMIN' | 'ADMIN' | 'FACULTY'; faculty_id: number | null; is_active: number; password_change_required: number }>(
      'SELECT id, username, email, role, faculty_id, is_active, password_change_required FROM users WHERE id = ?;',
      [decoded.id]
    );

    if (!dbUser || !dbUser.is_active) {
      res.status(401).json({ error: 'Unauthorized: User account is inactive or no longer exists' });
      return;
    }

    req.user = {
      id: dbUser.id,
      username: dbUser.username,
      email: dbUser.email,
      role: dbUser.role,
      facultyId: dbUser.faculty_id,
      mustChangePassword: Boolean(dbUser.password_change_required)
    };

    next();
  } catch (err: any) {
    if (err.name === 'TokenExpiredError') {
      res.status(401).json({ error: 'Unauthorized: Session has expired, please log in again' });
      return;
    }
    res.status(401).json({ error: 'Unauthorized: Invalid token signature' });
  }
}

/**
 * Optional token authenticator for public endpoints that support elevated preview privileges.
 * If a valid Bearer token is provided, req.user is set; otherwise, execution proceeds as anonymous.
 */
export async function optionalAuthenticateToken(req: AuthenticatedRequest, _res: Response, next: NextFunction): Promise<void> {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    next();
    return;
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, config.jwtSecret) as any;
    if (decoded?.id) {
      const dbUser = await queryOne<{ id: number; username: string; email: string; role: 'SUPER_ADMIN' | 'ADMIN' | 'FACULTY'; faculty_id: number | null; is_active: number; password_change_required: number }>(
        'SELECT id, username, email, role, faculty_id, is_active, password_change_required FROM users WHERE id = ?;',
        [decoded.id]
      );

      if (dbUser && dbUser.is_active) {
        req.user = {
          id: dbUser.id,
          username: dbUser.username,
          email: dbUser.email,
          role: dbUser.role,
          facultyId: dbUser.faculty_id,
          mustChangePassword: Boolean(dbUser.password_change_required)
        };
      }
    }
  } catch {
    // Ignore invalid/expired tokens for optional authentication
  }
  next();
}

export function requirePasswordChangeComplete(req: AuthenticatedRequest, res: Response, next: NextFunction): void {
  if (req.user?.mustChangePassword) {
    res.status(403).json({ error: 'Change your temporary password before accessing protected services.' });
    return;
  }
  next();
}
