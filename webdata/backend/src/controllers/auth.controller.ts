/**
 * src/controllers/auth.controller.ts
 *
 * Auth Endpoint Handlers for Phase 1
 *
 * Endpoints handled here:
 *   POST /v1/auth/google  — Google OAuth login (first-time invite claim + returning user)
 *   GET  /v1/auth/me      — Current authenticated user profile
 *   POST /v1/auth/refresh — Issue new access token from valid refresh cookie
 *   POST /v1/auth/logout  — Revoke session, clear cookies, bump token_version [FIX #4]
 */

import { Request, Response } from 'express';
import { verifyGoogleToken, generateAccessToken, generateRefreshToken, verifyRefreshToken } from '../utils/auth';
import { invalidateUserAuthCache, getUserAuthState } from '../middlewares/auth';
import { invalidateEditorSectionCache } from '../middlewares/role';
import { createAuditLog } from '../middlewares/audit';
import { env } from '../config/env';
import prisma from '../config/prisma';
import { logger } from '../utils/logger';

// ── Cookie Configuration ─────────────────────────────────────────────────────

const BASE_COOKIE_OPTIONS = {
  httpOnly: true,
  // SameSite must be 'none' when cross-site (frontend on iiitp.ac.in, API on api.iiitp.ac.in).
  // In development, it is 'lax' because secure:false + sameSite:none is rejected by browsers.
  sameSite: (env.NODE_ENV === 'production' ? 'none' : 'lax') as 'none' | 'lax',
  secure: env.COOKIE_SECURE,
  domain: env.NODE_ENV === 'production' ? env.COOKIE_DOMAIN : undefined,
  path: '/',
} as const;

const ACCESS_COOKIE_OPTIONS = {
  ...BASE_COOKIE_OPTIONS,
  maxAge: 15 * 60 * 1000, // 15 minutes
};

const REFRESH_COOKIE_OPTIONS = {
  ...BASE_COOKIE_OPTIONS,
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  path: '/v1/auth/refresh', // Scope refresh cookie to the refresh endpoint only
};

// ── Helper: set both auth cookies ────────────────────────────────────────────

function setAuthCookies(
  res: Response,
  accessToken: string,
  refreshToken: string
): void {
  res.cookie('accessToken', accessToken, ACCESS_COOKIE_OPTIONS);
  res.cookie('refreshToken', refreshToken, REFRESH_COOKIE_OPTIONS);
}

// ── Helper: clear both auth cookies ──────────────────────────────────────────

function clearAuthCookies(res: Response): void {
  res.clearCookie('accessToken', { ...BASE_COOKIE_OPTIONS, path: '/' });
  res.clearCookie('refreshToken', { ...BASE_COOKIE_OPTIONS, path: '/v1/auth/refresh' });
}

// ── POST /v1/auth/google ──────────────────────────────────────────────────────

/**
 * Exchange Google ID token for JWT session cookies.
 *
 * Flow:
 *   1. Verify Google ID token (sig, audience, nonce, domain)
 *   2a. Returning user: validate is_active, refresh last_login_at & profile fields
 *   2b. New user: verify invite exists & is unclaimed, claim invite atomically,
 *       seed editor_section_assignments, and auto-link faculty_profile [FIX #7]
 *   3. Issue access + refresh tokens as httpOnly cookies
 *   4. Audit log the LOGIN
 */
export async function googleLogin(req: Request, res: Response): Promise<void> {
  const { id_token, nonce } = req.body;

  if (!id_token || typeof id_token !== 'string') {
    res.status(400).json({ error: 'Missing required field: id_token' });
    return;
  }

  // 1. Verify Google ID token
  let googleProfile: Awaited<ReturnType<typeof verifyGoogleToken>>;
  try {
    googleProfile = await verifyGoogleToken(id_token, nonce ?? undefined);
  } catch (err: any) {
    res.status(401).json({ error: err.message || 'Invalid Google ID token.' });
    return;
  }

  const { sub: googleSub, email, name, picture } = googleProfile;

  try {
    // 2. Upsert user within a DB transaction
    const { user, isNewUser } = await prisma.$transaction(async (tx) => {
      const existing = await tx.user.findUnique({ where: { email } });

      if (existing) {
        // 2a. Returning user
        if (!existing.is_active) {
          // Throw from inside the transaction to abort it
          throw Object.assign(new Error('Account is deactivated. Contact administrator.'), { statusCode: 403 });
        }

        const updatedUser = await tx.user.update({
          where: { id: existing.id },
          data: {
            last_login_at: new Date(),
            google_sub: googleSub,
            // Update avatar/name only if they have changed from what Google reports
            ...(name && name !== existing.name ? { name } : {}),
            ...(picture && picture !== existing.avatar_url ? { avatar_url: picture } : {}),
          },
        });

        return { user: updatedUser, isNewUser: false };
      }

      // 2b. New user — must have a valid unclaimed invite
      const invite = await tx.invite.findUnique({ where: { email } });

      if (!invite) {
        throw Object.assign(new Error('No invitation found for this email address.'), { statusCode: 403 });
      }

      if (invite.accepted) {
        throw Object.assign(new Error('This invitation has already been used.'), { statusCode: 403 });
      }

      if (invite.expires_at && invite.expires_at < new Date()) {
        throw Object.assign(new Error('Invitation has expired. Please request a new invite.'), { statusCode: 403 });
      }

      // Create new user
      const newUser = await tx.user.create({
        data: {
          email,
          name,
          google_sub: googleSub,
          avatar_url: picture,
          role: invite.role,
          is_active: true,
          token_version: 0,
          last_login_at: new Date(),
        },
      });

      // Mark invite as accepted
      await tx.invite.update({
        where: { id: invite.id },
        data: { accepted: true },
      });

      // Seed editor_section_assignments from invite.sections [FIX #1]
      if (invite.role === 'editor' && Array.isArray(invite.sections)) {
        const sections = invite.sections as string[];
        if (sections.length > 0) {
          await tx.editorSectionAssignment.createMany({
            data: sections
              .map((section) => (typeof section === 'string' ? section.trim().toLowerCase() : ''))
              .filter(Boolean)
              .map((section) => ({
                user_id: newUser.id,
                section,
              })),
            skipDuplicates: true,
          });
        }
      }

      // Faculty auto-link [FIX #7]
      if (newUser.role === 'faculty') {
        const profile = await tx.facultyProfile.findUnique({ where: { email } });
        if (profile && profile.user_id === null) {
          await tx.facultyProfile.update({
            where: { id: profile.id },
            data: { user_id: newUser.id },
          });
        } else if (!profile) {
          logger.warn(`Faculty ${email} logged in but has no faculty_profile row. Create one in admin.`);
        }
      }

      return { user: newUser, isNewUser: true };
    });

    // Invalidate any stale cache entry for this user
    invalidateUserAuthCache(user.id);
    invalidateEditorSectionCache(user.id);

    // 3. Generate and set cookies
    const accessToken = generateAccessToken({
      userId: user.id,
      email: user.email,
      role: user.role,
      tokenVersion: user.token_version,
    });

    const refreshToken = generateRefreshToken({
      userId: user.id,
      tokenVersion: user.token_version,
    });

    setAuthCookies(res, accessToken, refreshToken);

    // 4. Audit log
    await createAuditLog({
      req,
      userId: user.id,
      userEmail: user.email,
      action: 'LOGIN',
      resource: 'user',
      resourceId: user.id,
      newValue: { isNewUser },
    });

    res.status(isNewUser ? 201 : 200).json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        avatar_url: user.avatar_url,
      },
    });
  } catch (err: any) {
    const statusCode: number = err.statusCode ?? 500;
    if (statusCode < 500) {
      res.status(statusCode).json({ error: err.message });
    } else {
      logger.error('Error during Google login', { err, email });
      res.status(500).json({ error: 'Internal server error during authentication.' });
    }
  }
}

// ── GET /v1/auth/me ───────────────────────────────────────────────────────────

/**
 * Return current authenticated user's profile and editor section assignments.
 * Requires authenticateJWT middleware to run first.
 */
export async function getMe(req: Request, res: Response): Promise<void> {
  const userId = req.user!.id;

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      avatar_url: true,
      is_active: true,
      last_login_at: true,
      section_assignments: {
        select: { section: true },
      },
    },
  });

  if (!user) {
    res.status(404).json({ error: 'User not found.' });
    return;
  }

  res.json({
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      avatar_url: user.avatar_url,
      last_login_at: user.last_login_at,
      sections: user.section_assignments.map((a) => a.section),
    },
  });
}

// ── POST /v1/auth/refresh ────────────────────────────────────────────────────

/**
 * Issue a fresh access token from a valid refresh token cookie.
 */
export async function refreshToken(req: Request, res: Response): Promise<void> {
  const rawRefreshToken: string | undefined =
    req.cookies?.refreshToken ??
    (req.headers.authorization?.startsWith('Bearer ')
      ? req.headers.authorization.substring(7)
      : undefined);

  if (!rawRefreshToken) {
    res.status(401).json({ error: 'No refresh token provided.' });
    return;
  }

  let payload: Awaited<ReturnType<typeof verifyRefreshToken>>;
  try {
    payload = verifyRefreshToken(rawRefreshToken);
  } catch (err: any) {
    if (err.name === 'TokenExpiredError') {
      res.status(401).json({ error: 'Refresh token expired. Please log in again.' });
      return;
    }
    res.status(401).json({ error: 'Invalid refresh token.' });
    return;
  }

  const userId = parseInt(payload.sub, 10);
  const userState = await getUserAuthState(userId);

  if (!userState) {
    res.status(401).json({ error: 'User account no longer exists.' });
    return;
  }

  if (!userState.isActive) {
    res.status(403).json({ error: 'Account is deactivated.' });
    return;
  }

  if (payload.tv !== userState.tokenVersion) {
    res.status(401).json({ error: 'Session has been invalidated. Please log in again.' });
    return;
  }

  // Fetch minimal user info to generate new access token
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, email: true, role: true, token_version: true },
  });

  if (!user) {
    res.status(401).json({ error: 'User not found.' });
    return;
  }

  const newAccessToken = generateAccessToken({
    userId: user.id,
    email: user.email,
    role: user.role,
    tokenVersion: user.token_version,
  });

  res.cookie('accessToken', newAccessToken, ACCESS_COOKIE_OPTIONS);

  res.json({ message: 'Access token refreshed.' });
}

// ── POST /v1/auth/logout ─────────────────────────────────────────────────────

/**
 * Log out: bump token_version to revoke all active sessions, clear cookies.
 * Requires authenticateJWT middleware to run first.
 */
export async function logout(req: Request, res: Response): Promise<void> {
  const userId = req.user!.id;

  // Bump token_version — instantly revokes ALL active sessions for this user [FIX #4]
  await prisma.user.update({
    where: { id: userId },
    data: { token_version: { increment: 1 } },
  });

  // Purge LRU cache so subsequent requests with old tokens fail immediately
  invalidateUserAuthCache(userId);
  invalidateEditorSectionCache(userId);

  // Audit log
  await createAuditLog({
    req,
    action: 'LOGOUT',
    resource: 'user',
    resourceId: userId,
  });

  // Clear auth cookies
  clearAuthCookies(res);

  res.json({ message: 'Logged out successfully.' });
}
