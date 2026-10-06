/**
 * src/middlewares/auth.ts
 *
 * Core JWT Authentication Middleware with Token Revocation & LRU Caching [FIX #4]
 *
 * Features:
 *   1. `authenticateJWT`: Strict middleware. Rejects unauthenticated/invalid requests with 401/403.
 *   2. `optionalAuthenticateJWT`: Non-blocking middleware. Populates `req.user` if a valid token
 *      is present, but silently proceeds as public visitor if absent/expired.
 *   3. Uses in-memory LRU Cache (60s TTL) for `token_version` and `is_active` lookups.
 */

import { Request, Response, NextFunction } from 'express';
import { LRUCache } from 'lru-cache';
import { verifyAccessToken, AccessTokenPayload } from '../utils/auth';
import prisma from '../config/prisma';
import { logger } from '../utils/logger';

interface CachedUserAuth {
  tokenVersion: number;
  isActive: boolean;
}

// ── LRU Cache for User Auth State ───────────────────────────────────────────
// Max 5,000 active users, 60 seconds TTL
export const userAuthCache = new LRUCache<number, CachedUserAuth>({
  max: 5000,
  ttl: 60 * 1000,
});

/**
 * Invalidate user auth cache when user logs out, changes role, gets deactivated,
 * or has token_version incremented.
 */
export function invalidateUserAuthCache(userId: number): void {
  userAuthCache.delete(userId);
}

/**
 * Helper to fetch tokenVersion & isActive with LRU caching.
 */
export async function getUserAuthState(userId: number): Promise<CachedUserAuth | null> {
  const cached = userAuthCache.get(userId);
  if (cached !== undefined) {
    return cached;
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { token_version: true, is_active: true },
  });

  if (!user) {
    return null;
  }

  const state: CachedUserAuth = {
    tokenVersion: user.token_version,
    isActive: user.is_active,
  };

  userAuthCache.set(userId, state);
  return state;
}

/**
 * Helper to extract token from cookies or Authorization header.
 */
function extractToken(req: Request): string | undefined {
  if (req.cookies && req.cookies.accessToken) {
    return req.cookies.accessToken;
  }
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    return req.headers.authorization.substring(7);
  }
  return undefined;
}

/**
 * authenticateJWT Middleware (Strict)
 * Requires a valid access token. Rejects with 401/403 if invalid or missing.
 */
export async function authenticateJWT(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const token = extractToken(req);

    if (!token) {
      res.status(401).json({ error: 'Authentication required. No token provided.' });
      return;
    }

    let payload: AccessTokenPayload;
    try {
      payload = verifyAccessToken(token);
    } catch (err: any) {
      if (err.name === 'TokenExpiredError') {
        res.status(401).json({ error: 'Access token expired. Please refresh your session.' });
        return;
      }
      res.status(401).json({ error: 'Invalid access token.' });
      return;
    }

    const userId = parseInt(payload.sub, 10);
    if (isNaN(userId)) {
      res.status(401).json({ error: 'Invalid user identity in token.' });
      return;
    }

    // Check user state (token_version & is_active) with LRU cache
    const userState = await getUserAuthState(userId);

    if (!userState) {
      res.status(401).json({ error: 'User account no longer exists.' });
      return;
    }

    if (!userState.isActive) {
      res.status(403).json({ error: 'Account is deactivated. Contact administrator.' });
      return;
    }

    // Token version check: If token version in JWT is older than DB, token was revoked
    if (payload.tv !== userState.tokenVersion) {
      res.status(401).json({ error: 'Session has been invalidated. Please log in again.' });
      return;
    }

    // Attach authenticated user details to request
    req.user = {
      id: userId,
      email: payload.email,
      role: payload.role,
      tokenVersion: payload.tv,
    };

    next();
  } catch (err) {
    logger.error('Error during authentication middleware execution', { err });
    res.status(500).json({ error: 'Internal server error during authentication.' });
  }
}

/**
 * optionalAuthenticateJWT Middleware (Non-blocking)
 * Attaches req.user if a valid token is provided.
 * If token is absent, expired, or invalid, gracefully proceeds without setting req.user.
 */
export async function optionalAuthenticateJWT(
  req: Request,
  _res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const token = extractToken(req);
    if (!token) {
      next();
      return;
    }

    let payload: AccessTokenPayload;
    try {
      payload = verifyAccessToken(token);
    } catch {
      // Gracefully ignore expired/invalid tokens for public endpoints
      next();
      return;
    }

    const userId = parseInt(payload.sub, 10);
    if (isNaN(userId)) {
      next();
      return;
    }

    const userState = await getUserAuthState(userId);
    if (!userState || !userState.isActive || payload.tv !== userState.tokenVersion) {
      next();
      return;
    }

    req.user = {
      id: userId,
      email: payload.email,
      role: payload.role,
      tokenVersion: payload.tv,
    };

    next();
  } catch (err) {
    logger.error('Error during optional authentication middleware', { err });
    next();
  }
}
