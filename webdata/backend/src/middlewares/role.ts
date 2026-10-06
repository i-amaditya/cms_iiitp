/**
 * src/middlewares/role.ts
 *
 * Role-Based Access Control (RBAC) & Editor Section Permission Middleware
 *
 * Features:
 *   1. `requireRole(allowedRoles)`:
 *      Restricts route access to specified roles (e.g. ['admin'], ['admin', 'editor']).
 *   2. `requireSection(sectionName)`:
 *      - If user is 'admin', grants access immediately.
 *      - If user is 'editor', queries `editor_section_assignments` (with LRU caching)
 *        to ensure editor has been assigned the given section (e.g. 'notices', 'news').
 *      - If user is 'faculty' or any other unassigned role, returns 403 Forbidden.
 *   3. `requireFacultySelfOrAdmin(facultyEmailGetter)`:
 *      Allows self-updates by faculty matching their authenticated email, or admin.
 */

import { Request, Response, NextFunction } from 'express';
import { UserRole } from '@prisma/client';
import { LRUCache } from 'lru-cache';
import prisma from '../config/prisma';
import { logger } from '../utils/logger';

// ── LRU Cache for Editor Section Permissions ────────────────────────────────
// Key: `userId:section` -> boolean, TTL: 60s
export const editorSectionsCache = new LRUCache<string, boolean>({
  max: 5000,
  ttl: 60 * 1000,
});

/**
 * Invalidate section permissions cache for a user when permissions are modified.
 */
export function invalidateEditorSectionCache(userId: number, section?: string): void {
  if (section) {
    editorSectionsCache.delete(`${userId}:${section}`);
  } else {
    // Clear all entries related to this userId if section is unspecified
    for (const key of editorSectionsCache.keys()) {
      if (key.startsWith(`${userId}:`)) {
        editorSectionsCache.delete(key);
      }
    }
  }
}

/**
 * requireRole Middleware factory
 * Restricts access to users having one of the specified roles.
 */
export function requireRole(allowedRoles: UserRole[]) {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({ error: 'Authentication required.' });
      return;
    }

    if (!allowedRoles.includes(req.user.role)) {
      res.status(403).json({
        error: `Forbidden. Requires one of the following roles: [${allowedRoles.join(', ')}].`,
      });
      return;
    }

    next();
  };
}

/**
 * requireSection Middleware factory
 * Enforces section-specific permissions for editors.
 * Admins always bypass this check.
 */
export function requireSection(section: string) {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      if (!req.user) {
        res.status(401).json({ error: 'Authentication required.' });
        return;
      }

      // Admin has universal write permissions across all sections
      if (req.user.role === 'admin') {
        next();
        return;
      }

      // If user is not an editor (e.g. faculty attempting to edit notices), reject
      if (req.user.role !== 'editor') {
        res.status(403).json({
          error: `Forbidden. Only administrators or assigned editors can manage the '${section}' section.`,
        });
        return;
      }

      const cacheKey = `${req.user.id}:${section}`;
      const cachedAllowed = editorSectionsCache.get(cacheKey);

      if (cachedAllowed !== undefined) {
        if (cachedAllowed) {
          next();
          return;
        } else {
          res.status(403).json({
            error: `Forbidden. You are not assigned to edit the '${section}' section.`,
          });
          return;
        }
      }

      // Check DB for section assignment
      const assignment = await prisma.editorSectionAssignment.findFirst({
        where: {
          user_id: req.user.id,
          section: section,
        },
      });

      const isAllowed = !!assignment;
      editorSectionsCache.set(cacheKey, isAllowed);

      if (!isAllowed) {
        res.status(403).json({
          error: `Forbidden. You are not assigned to edit the '${section}' section.`,
        });
        return;
      }

      next();
    } catch (err) {
      logger.error('Error during requireSection middleware execution', { err, section });
      res.status(500).json({ error: 'Internal server error checking permissions.' });
    }
  };
}
