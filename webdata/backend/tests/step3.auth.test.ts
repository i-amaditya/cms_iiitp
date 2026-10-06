/**
 * tests/step3.auth.test.ts — Step 3: Auth Utilities Verification
 *
 * Tests:
 *   1. Access token generation with expected claims (sub, email, role, tv)
 *   2. Access token decoding and claims verification
 *   3. Refresh token generation with minimal claims (sub, tv)
 *   4. Refresh token decoding and claims verification
 *   5. Token expiration behavior (expired tokens throw error)
 *   6. Cross-token contamination prevention (access token cannot be verified with refresh secret and vice-versa)
 *   7. Tampered token rejection (signature modification)
 *   8. Malformed token payload handling
 *   9. Google ID token verification handling (mocked Google client for signature, nonce, domain validation)
 */

import jwt from 'jsonwebtoken';
import {
  generateAccessToken,
  verifyAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
  verifyGoogleToken,
  AccessTokenPayload,
  RefreshTokenPayload,
} from '../src/utils/auth';
import { env } from '../src/config/env';
import { OAuth2Client } from 'google-auth-library';

// ─── 1. Access Token Tests ──────────────────────────────────────────────────

describe('Step 3 – Access Token Utilities', () => {
  const sampleUser = {
    userId: 42,
    email: 'testuser@iiitp.ac.in',
    role: 'faculty' as const,
    tokenVersion: 3,
  };

  it('generates a valid JWT access token string', () => {
    const token = generateAccessToken(sampleUser);
    expect(typeof token).toBe('string');
    expect(token.split('.')).toHaveLength(3); // Header.Payload.Signature
  });

  it('decodes and verifies the access token claims correctly', () => {
    const token = generateAccessToken(sampleUser);
    const decoded: AccessTokenPayload = verifyAccessToken(token);

    expect(decoded.sub).toBe('42');
    expect(decoded.email).toBe('testuser@iiitp.ac.in');
    expect(decoded.role).toBe('faculty');
    expect(decoded.tv).toBe(3);
    expect(decoded.exp).toBeDefined();
    expect(decoded.iat).toBeDefined();
  });

  it('fails verification if access token is signed with a different secret', () => {
    const fakeSecret = 'wrong-secret-which-should-fail-verification-00000000000000000000000';
    const tamperedToken = jwt.sign(
      { sub: '42', email: 'testuser@iiitp.ac.in', role: 'faculty', tv: 3 },
      fakeSecret
    );

    expect(() => verifyAccessToken(tamperedToken)).toThrow();
  });

  it('fails verification if access token is expired', () => {
    const expiredToken = jwt.sign(
      { sub: '42', email: 'testuser@iiitp.ac.in', role: 'faculty', tv: 3 },
      env.JWT_SECRET,
      { expiresIn: '-1s' }
    );

    expect(() => verifyAccessToken(expiredToken)).toThrow(/jwt expired/i);
  });

  it('fails verification if access token is malformed or missing claims', () => {
    // Missing role and tv
    const malformedPayloadToken = jwt.sign(
      { sub: '42', email: 'testuser@iiitp.ac.in' },
      env.JWT_SECRET
    );

    expect(() => verifyAccessToken(malformedPayloadToken)).toThrow(
      /missing required claims/i
    );
  });
});

// ─── 2. Refresh Token Tests ─────────────────────────────────────────────────

describe('Step 3 – Refresh Token Utilities', () => {
  const sampleUser = {
    userId: 99,
    tokenVersion: 5,
  };

  it('generates a valid JWT refresh token string', () => {
    const token = generateRefreshToken(sampleUser);
    expect(typeof token).toBe('string');
    expect(token.split('.')).toHaveLength(3);
  });

  it('decodes and verifies refresh token claims correctly', () => {
    const token = generateRefreshToken(sampleUser);
    const decoded: RefreshTokenPayload = verifyRefreshToken(token);

    expect(decoded.sub).toBe('99');
    expect(decoded.tv).toBe(5);
    expect(decoded.exp).toBeDefined();
    expect(decoded.iat).toBeDefined();
  });

  it('fails verification if refresh token is expired', () => {
    const expiredToken = jwt.sign(
      { sub: '99', tv: 5 },
      env.JWT_REFRESH_SECRET,
      { expiresIn: '-1s' }
    );

    expect(() => verifyRefreshToken(expiredToken)).toThrow(/jwt expired/i);
  });

  it('fails verification if refresh token is missing required claims', () => {
    const invalidToken = jwt.sign({ foo: 'bar' }, env.JWT_REFRESH_SECRET);
    expect(() => verifyRefreshToken(invalidToken)).toThrow(/missing required claims/i);
  });
});

// ─── 3. Cross-Token Security & Contamination Prevention ───────────────────────

describe('Step 3 – Token Secret Separation', () => {
  it('cannot verify an access token using verifyRefreshToken (secret mismatch)', () => {
    const accessToken = generateAccessToken({
      userId: 1,
      email: 'admin@iiitp.ac.in',
      role: 'admin',
      tokenVersion: 0,
    });

    // Attempting to verify access token with refresh secret must fail
    expect(() => verifyRefreshToken(accessToken)).toThrow();
  });

  it('cannot verify a refresh token using verifyAccessToken (secret mismatch)', () => {
    const refreshToken = generateRefreshToken({
      userId: 1,
      tokenVersion: 0,
    });

    // Attempting to verify refresh token with access secret must fail
    expect(() => verifyAccessToken(refreshToken)).toThrow();
  });
});

// ─── 4. Google OAuth Verification Logic ─────────────────────────────────────

describe('Step 3 – Google ID Token Verification Logic', () => {
  it('successfully extracts profile from verified Google ticket', async () => {
    const mockPayload = {
      sub: 'google-sub-12345',
      email: `faculty@${env.ALLOWED_DOMAIN}`,
      email_verified: true,
      name: 'Dr. Test Professor',
      picture: 'https://lh3.googleusercontent.com/avatar.jpg',
      hd: env.ALLOWED_DOMAIN,
      nonce: 'secure-crypto-nonce-xyz',
    };

    (jest.spyOn(OAuth2Client.prototype, 'verifyIdToken') as any).mockResolvedValueOnce({
      getPayload: () => mockPayload,
    });

    const profile = await verifyGoogleToken('mock-google-id-token', 'secure-crypto-nonce-xyz');
    expect(profile.sub).toBe('google-sub-12345');
    expect(profile.email).toBe(`faculty@${env.ALLOWED_DOMAIN}`);
    expect(profile.name).toBe('Dr. Test Professor');
    expect(profile.picture).toBe('https://lh3.googleusercontent.com/avatar.jpg');
  });

  it('rejects Google token if nonce does not match (replay attack protection)', async () => {
    const mockPayload = {
      sub: 'google-sub-12345',
      email: `faculty@${env.ALLOWED_DOMAIN}`,
      email_verified: true,
      nonce: 'nonce-created-yesterday',
    };

    (jest.spyOn(OAuth2Client.prototype, 'verifyIdToken') as any).mockResolvedValueOnce({
      getPayload: () => mockPayload,
    });

    await expect(
      verifyGoogleToken('mock-google-id-token', 'expected-fresh-nonce')
    ).rejects.toThrow(/nonce mismatch/i);
  });

  it('rejects Google token if email is not verified', async () => {
    const mockPayload = {
      sub: 'google-sub-12345',
      email: `faculty@${env.ALLOWED_DOMAIN}`,
      email_verified: false,
    };

    (jest.spyOn(OAuth2Client.prototype, 'verifyIdToken') as any).mockResolvedValueOnce({
      getPayload: () => mockPayload,
    });

    await expect(
      verifyGoogleToken('mock-google-id-token')
    ).rejects.toThrow(/not verified/i);
  });

  it('rejects Google token if email domain does not match ALLOWED_DOMAIN', async () => {
    const mockPayload = {
      sub: 'google-sub-999',
      email: 'attacker@unauthorized-domain.com',
      email_verified: true,
    };

    (jest.spyOn(OAuth2Client.prototype, 'verifyIdToken') as any).mockResolvedValueOnce({
      getPayload: () => mockPayload,
    });

    await expect(
      verifyGoogleToken('mock-google-id-token')
    ).rejects.toThrow(/unauthorized domain/i);
  });
});
