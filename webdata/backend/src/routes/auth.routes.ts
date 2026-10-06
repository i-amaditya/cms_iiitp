/**
 * src/routes/auth.routes.ts
 *
 * Express router for all /v1/auth endpoints.
 *
 * Mounted at /v1/auth in src/index.ts.
 * A tighter rate limiter is applied to /auth/google to prevent
 * brute-force enumeration of invite emails.
 */

import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import { authenticateJWT } from '../middlewares/auth';
import { googleLogin, getMe, refreshToken, logout } from '../controllers/auth.controller';

const router = Router();

// Tighter rate limit for auth endpoints — 10 requests per minute per IP
// Disabled in test environment (module-level singleton would accumulate hits across test cases)
const authLimiter = process.env.NODE_ENV === 'test'
  ? (_req: import('express').Request, _res: import('express').Response, next: import('express').NextFunction) => next()
  : rateLimit({
      windowMs: 60 * 1000,
      max: 10,
      standardHeaders: true,
      legacyHeaders: false,
      message: { error: 'Too many auth requests. Please try again in a minute.' },
    });

// POST /v1/auth/google
router.post('/google', authLimiter, googleLogin);

// GET /v1/auth/me
router.get('/me', authenticateJWT, getMe);

// POST /v1/auth/refresh — uses its own rate limit from the global limiter
router.post('/refresh', authLimiter, refreshToken);

// POST /v1/auth/logout
router.post('/logout', authenticateJWT, logout);

export default router;
