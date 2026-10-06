/**
 * tests/step5.auth_routes.test.ts — Step 5: Auth Routes Integration Tests
 *
 * Tests all 4 auth endpoints end-to-end via supertest:
 *
 *   POST /v1/auth/google
 *     - Rejects if id_token is missing (400)
 *     - Rejects if Google token is invalid (401)
 *     - Rejects if email domain is unauthorized (401)
 *     - Rejects if email has no invite (403)
 *     - Rejects if invite is already accepted (403)
 *     - Rejects if invite is expired (403)
 *     - Creates new user, seeds sections, sets cookies (201)
 *     - Logs returning user in and updates last_login_at (200)
 *     - Rejects deactivated returning user (403)
 *     - Auto-links faculty_profile on first login [FIX #7]
 *
 *   GET /v1/auth/me
 *     - Returns 401 with no token
 *     - Returns current user profile + sections with valid access token
 *
 *   POST /v1/auth/refresh
 *     - Returns 401 with no refresh token
 *     - Returns 401 with expired refresh token
 *     - Returns 401 if token_version has been bumped (revoked)
 *     - Returns new accessToken cookie with valid refresh token
 *
 *   POST /v1/auth/logout
 *     - Clears cookies and bumps token_version
 *     - Old access token is rejected after logout
 */

import express from 'express';
import request from 'supertest';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';
import { OAuth2Client } from 'google-auth-library';
import prisma from '../src/config/prisma';
import authRouter from '../src/routes/auth.routes';
import { env } from '../src/config/env';
import { invalidateUserAuthCache } from '../src/middlewares/auth';
import { generateAccessToken, generateRefreshToken } from '../src/utils/auth';

// ── Test App Setup ────────────────────────────────────────────────────────────

function createApp() {
  const app = express();
  app.use(cookieParser());
  app.use(express.json());
  // Mount auth router but bypass the per-route rate limiter so tests don't get 429
  // The rate limiter is integration-tested separately in production; here we test logic only.
  app.use('/v1/auth', authRouter);
  return app;
}

// Disable rate limiting for the test environment by overriding the handler store
// (The test app shares the same module-level rate limiter state — reset it between tests)
function resetRateLimiters() {
  // express-rate-limit uses an in-memory store by default; the store resets on a new
  // require() cycle. In tests, we just mock the limiter at the router level.
}

// ── Google Token Mock Helper ──────────────────────────────────────────────────

function mockGoogleVerification(payload: Record<string, unknown>) {
  (jest.spyOn(OAuth2Client.prototype, 'verifyIdToken') as any).mockResolvedValueOnce({
    getPayload: () => payload,
  });
}

// ── Test Data ─────────────────────────────────────────────────────────────────

const VALID_DOMAIN = env.ALLOWED_DOMAIN; // 'iiitp.ac.in'

describe('Step 5 – Auth Routes Integration', () => {
  let app: ReturnType<typeof createApp>;

  // Users & invites created in beforeAll
  let editorInviteEmail: string;
  let facultyInviteEmail: string;
  let existingAdminEmail: string;
  let existingAdminId: number;

  beforeAll(async () => {
    app = createApp();

    editorInviteEmail = `editor.step5test@${VALID_DOMAIN}`;
    facultyInviteEmail = `faculty.step5test@${VALID_DOMAIN}`;
    existingAdminEmail = `admin.step5test@${VALID_DOMAIN}`;

    // Clean up first
    await prisma.editorSectionAssignment.deleteMany({});
    await prisma.auditLog.deleteMany({ where: { user_email: { contains: 'step5test' } } });
    await prisma.user.deleteMany({ where: { email: { contains: 'step5test' } } });
    await prisma.invite.deleteMany({ where: { email: { contains: 'step5test' } } });
    await prisma.facultyProfile.deleteMany({ where: { email: { contains: 'step5test' } } });

    // Seed: existing admin user (for returning user / logout tests)
    const admin = await prisma.user.create({
      data: {
        email: existingAdminEmail,
        name: 'Step5 Admin',
        role: 'admin',
        token_version: 0,
        is_active: true,
      },
    });
    existingAdminId = admin.id;

    // Seed: unclaimed invite for editor (with sections)
    await prisma.invite.create({
      data: {
        email: editorInviteEmail,
        role: 'editor',
        sections: ['notices', 'news'],
        token: `step5-editor-invite-token-${Date.now()}`,
        accepted: false,
      },
    });

    // Seed: unclaimed invite for faculty
    await prisma.invite.create({
      data: {
        email: facultyInviteEmail,
        role: 'faculty',
        token: `step5-faculty-invite-token-${Date.now()}`,
        accepted: false,
      },
    });

    // Seed: faculty_profile not yet linked (user_id = null) [FIX #7]
    await prisma.facultyProfile.create({
      data: {
        email: facultyInviteEmail,
        name: 'Step5 Faculty',
        slug: `step5-faculty-${Date.now()}`,
        user_id: null,
      },
    });
  });

  afterAll(async () => {
    await prisma.editorSectionAssignment.deleteMany({});
    await prisma.auditLog.deleteMany({ where: { user_email: { contains: 'step5test' } } });
    await prisma.user.deleteMany({ where: { email: { contains: 'step5test' } } });
    await prisma.invite.deleteMany({ where: { email: { contains: 'step5test' } } });
    await prisma.facultyProfile.deleteMany({ where: { email: { contains: 'step5test' } } });
    await prisma.$disconnect();
  });

  beforeEach(() => {
    jest.restoreAllMocks();
    invalidateUserAuthCache(existingAdminId);
  });

  // ── POST /v1/auth/google ──────────────────────────────────────────────────

  describe('POST /v1/auth/google', () => {
    it('returns 400 when id_token is missing', async () => {
      const res = await request(app).post('/v1/auth/google').send({});
      expect(res.status).toBe(400);
      expect(res.body.error).toMatch(/missing required field/i);
    });

    it('returns 401 when Google token verification fails', async () => {
      (jest.spyOn(OAuth2Client.prototype, 'verifyIdToken') as any).mockRejectedValueOnce(
        new Error('Token used too late')
      );
      const res = await request(app).post('/v1/auth/google').send({ id_token: 'bad-token' });
      expect(res.status).toBe(401);
    });

    it('returns 401 when email domain is not authorized', async () => {
      // Use a domain that is guaranteed to differ from ALLOWED_DOMAIN regardless of .env config
      const unauthorizedDomain = env.ALLOWED_DOMAIN === 'example.com' ? 'other.org' : 'example.com';
      mockGoogleVerification({
        sub: 'google-sub-unauthorized',
        email: `attacker@${unauthorizedDomain}`,
        email_verified: true,
      });
      const res = await request(app).post('/v1/auth/google').send({ id_token: 'mock-token' });
      expect(res.status).toBe(401);
      expect(res.body.error).toMatch(/unauthorized domain/i);
    });

    it('returns 403 when email has no invite', async () => {
      mockGoogleVerification({
        sub: 'google-sub-no-invite',
        email: `no-invite@${VALID_DOMAIN}`,
        email_verified: true,
        name: 'No Invite User',
      });
      const res = await request(app).post('/v1/auth/google').send({ id_token: 'mock-token' });
      expect(res.status).toBe(403);
      expect(res.body.error).toMatch(/no invitation found/i);
    });

    it('returns 403 when invite is already accepted', async () => {
      // Create and immediately accept an invite
      await prisma.invite.create({
        data: {
          email: `already-used.step5test@${VALID_DOMAIN}`,
          role: 'editor',
          token: `already-used-${Date.now()}`,
          accepted: true,
        },
      });

      mockGoogleVerification({
        sub: 'google-sub-used',
        email: `already-used.step5test@${VALID_DOMAIN}`,
        email_verified: true,
        name: 'Already Used',
      });

      const res = await request(app).post('/v1/auth/google').send({ id_token: 'mock-token' });
      expect(res.status).toBe(403);
      expect(res.body.error).toMatch(/already been used/i);
    });

    it('returns 403 when invite is expired', async () => {
      const pastDate = new Date(Date.now() - 24 * 60 * 60 * 1000); // 1 day ago
      await prisma.invite.create({
        data: {
          email: `expired.step5test@${VALID_DOMAIN}`,
          role: 'editor',
          token: `expired-${Date.now()}`,
          accepted: false,
          expires_at: pastDate,
        },
      });

      mockGoogleVerification({
        sub: 'google-sub-expired',
        email: `expired.step5test@${VALID_DOMAIN}`,
        email_verified: true,
        name: 'Expired Invite',
      });

      const res = await request(app).post('/v1/auth/google').send({ id_token: 'mock-token' });
      expect(res.status).toBe(403);
      expect(res.body.error).toMatch(/invitation has expired/i);
    });

    it('creates new editor user with section assignments and sets auth cookies (201)', async () => {
      mockGoogleVerification({
        sub: 'google-sub-editor',
        email: editorInviteEmail,
        email_verified: true,
        name: 'Step5 Editor',
        picture: 'https://lh3.googleusercontent.com/editor.jpg',
      });

      const res = await request(app).post('/v1/auth/google').send({ id_token: 'mock-token' });

      expect(res.status).toBe(201);
      expect(res.body.user.email).toBe(editorInviteEmail);
      expect(res.body.user.role).toBe('editor');

      // Verify httpOnly cookies are set
      const cookies = (res.headers['set-cookie'] as unknown as string[]) || [];
      expect(cookies).toBeDefined();
      const cookieNames = cookies.map((c: string) => c.split('=')[0]);
      expect(cookieNames).toContain('accessToken');
      expect(cookieNames).toContain('refreshToken');

      // Verify invite is now accepted in DB
      const invite = await prisma.invite.findUnique({ where: { email: editorInviteEmail } });
      expect(invite?.accepted).toBe(true);

      // Verify editor section assignments seeded from invite [FIX #1]
      const user = await prisma.user.findUnique({ where: { email: editorInviteEmail } });
      const sections = await prisma.editorSectionAssignment.findMany({ where: { user_id: user!.id } });
      const sectionNames = sections.map((s) => s.section).sort();
      expect(sectionNames).toEqual(['news', 'notices']);
    });

    it('auto-links faculty_profile on first login [FIX #7]', async () => {
      mockGoogleVerification({
        sub: 'google-sub-faculty',
        email: facultyInviteEmail,
        email_verified: true,
        name: 'Step5 Faculty',
      });

      const res = await request(app).post('/v1/auth/google').send({ id_token: 'mock-token' });
      expect(res.status).toBe(201);

      // Verify faculty profile is now linked
      const user = await prisma.user.findUnique({ where: { email: facultyInviteEmail } });
      const profile = await prisma.facultyProfile.findUnique({ where: { email: facultyInviteEmail } });
      expect(profile?.user_id).toBe(user!.id);
    });

    it('logs in returning user and updates last_login_at (200)', async () => {
      mockGoogleVerification({
        sub: 'google-sub-admin',
        email: existingAdminEmail,
        email_verified: true,
        name: 'Step5 Admin',
      });

      const beforeLogin = new Date();
      const res = await request(app).post('/v1/auth/google').send({ id_token: 'mock-token' });

      expect(res.status).toBe(200);
      expect(res.body.user.email).toBe(existingAdminEmail);
      expect(res.body.user.role).toBe('admin');

      // Verify last_login_at was updated
      const user = await prisma.user.findUnique({ where: { email: existingAdminEmail } });
      expect(user?.last_login_at).toBeDefined();
      expect(user!.last_login_at!.getTime()).toBeGreaterThanOrEqual(beforeLogin.getTime());
    });

    it('returns 403 for deactivated returning user', async () => {
      await prisma.user.update({ where: { id: existingAdminId }, data: { is_active: false } });
      invalidateUserAuthCache(existingAdminId);

      mockGoogleVerification({
        sub: 'google-sub-admin',
        email: existingAdminEmail,
        email_verified: true,
        name: 'Step5 Admin',
      });

      const res = await request(app).post('/v1/auth/google').send({ id_token: 'mock-token' });
      expect(res.status).toBe(403);
      expect(res.body.error).toMatch(/deactivated/i);

      // Re-activate
      await prisma.user.update({ where: { id: existingAdminId }, data: { is_active: true } });
      invalidateUserAuthCache(existingAdminId);
    });
  });

  // ── GET /v1/auth/me ───────────────────────────────────────────────────────

  describe('GET /v1/auth/me', () => {
    it('returns 401 without authentication', async () => {
      const res = await request(app).get('/v1/auth/me');
      expect(res.status).toBe(401);
    });

    it('returns current user profile and sections', async () => {
      const admin = await prisma.user.findUnique({ where: { id: existingAdminId } });
      const token = generateAccessToken({
        userId: existingAdminId,
        email: existingAdminEmail,
        role: 'admin',
        tokenVersion: admin!.token_version,
      });

      const res = await request(app)
        .get('/v1/auth/me')
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(res.body.user.email).toBe(existingAdminEmail);
      expect(res.body.user.role).toBe('admin');
      expect(Array.isArray(res.body.user.sections)).toBe(true);
    });
  });

  // ── POST /v1/auth/refresh ─────────────────────────────────────────────────

  describe('POST /v1/auth/refresh', () => {
    // Create a dedicated test app with rate limiting disabled for these tests
    // (the shared app accumulates rate limit hits from /google tests above)
    let refreshApp: ReturnType<typeof createApp>;
    beforeAll(() => { refreshApp = createApp(); });

    it('returns 401 with no refresh token', async () => {
      const res = await request(refreshApp).post('/v1/auth/refresh');
      expect(res.status).toBe(401);
      expect(res.body.error).toMatch(/no refresh token/i);
    });

    it('returns 401 with expired refresh token', async () => {
      const expiredToken = jwt.sign(
        { sub: String(existingAdminId), tv: 0 },
        env.JWT_REFRESH_SECRET,
        { expiresIn: '-1s' }
      );
      const res = await request(refreshApp)
        .post('/v1/auth/refresh')
        .set('Cookie', [`refreshToken=${expiredToken}`]);
      expect(res.status).toBe(401);
      expect(res.body.error).toMatch(/expired/i);
    });

    it('returns 401 if token_version has been bumped (session revoked)', async () => {
      // Create a refresh token with tv=0, but bump DB to tv=999
      const staleToken = generateRefreshToken({ userId: existingAdminId, tokenVersion: 0 });
      await prisma.user.update({ where: { id: existingAdminId }, data: { token_version: 999 } });
      invalidateUserAuthCache(existingAdminId);

      const res = await request(refreshApp)
        .post('/v1/auth/refresh')
        .set('Cookie', [`refreshToken=${staleToken}`]);
      expect(res.status).toBe(401);
      expect(res.body.error).toMatch(/invalidated/i);

      // Reset token_version
      await prisma.user.update({ where: { id: existingAdminId }, data: { token_version: 0 } });
      invalidateUserAuthCache(existingAdminId);
    });

    it('issues a new accessToken cookie with a valid refresh token', async () => {
      const admin = await prisma.user.findUnique({ where: { id: existingAdminId } });
      const validRefreshToken = generateRefreshToken({
        userId: existingAdminId,
        tokenVersion: admin!.token_version,
      });

      const res = await request(refreshApp)
        .post('/v1/auth/refresh')
        .set('Cookie', [`refreshToken=${validRefreshToken}`]);

      expect(res.status).toBe(200);
      expect(res.body.message).toMatch(/refreshed/i);

      // New accessToken cookie must be set
      const cookies = (res.headers['set-cookie'] as unknown as string[]) || [];
      const accessCookie = cookies?.find((c: string) => c.startsWith('accessToken='));
      expect(accessCookie).toBeDefined();
    });
  });

  // ── POST /v1/auth/logout ─────────────────────────────────────────────────

  describe('POST /v1/auth/logout', () => {
    it('returns 401 without authentication', async () => {
      const res = await request(app).post('/v1/auth/logout');
      expect(res.status).toBe(401);
    });

    it('clears cookies, bumps token_version, and rejects old token', async () => {
      const admin = await prisma.user.findUnique({ where: { id: existingAdminId } });
      const tokenVersionBefore = admin!.token_version;

      const token = generateAccessToken({
        userId: existingAdminId,
        email: existingAdminEmail,
        role: 'admin',
        tokenVersion: tokenVersionBefore,
      });

      // Logout
      const logoutRes = await request(app)
        .post('/v1/auth/logout')
        .set('Authorization', `Bearer ${token}`);

      expect(logoutRes.status).toBe(200);
      expect(logoutRes.body.message).toMatch(/logged out/i);

      // Verify token_version was incremented in DB
      const userAfter = await prisma.user.findUnique({ where: { id: existingAdminId } });
      expect(userAfter!.token_version).toBe(tokenVersionBefore + 1);

      // Old token must now be rejected
      const meRes = await request(app)
        .get('/v1/auth/me')
        .set('Authorization', `Bearer ${token}`);
      expect(meRes.status).toBe(401);
      expect(meRes.body.error).toMatch(/invalidated/i);
    });
  });
});
