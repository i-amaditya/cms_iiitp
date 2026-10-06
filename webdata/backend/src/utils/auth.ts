/**
 * src/utils/auth.ts
 *
 * Authentication & Cryptographic Utilities
 *
 * Responsibilities:
 *   1. Access Token (15m) generation & verification (embeds sub, email, role, tv) [FIX #4]
 *   2. Refresh Token (7d) generation & verification (embeds sub, tv) [FIX #4]
 *   3. Google OAuth ID token verification via google-auth-library + nonce check + domain verification
 */

import jwt, { JwtPayload, SignOptions } from 'jsonwebtoken';
import { OAuth2Client, TokenPayload } from 'google-auth-library';
import { UserRole } from '@prisma/client';
import { env } from '../config/env';

// ── Types ───────────────────────────────────────────────────────────────────

export interface AccessTokenPayload extends JwtPayload {
  sub: string;       // User ID (stringified number to follow JWT standard)
  email: string;
  role: UserRole;
  tv: number;        // token_version for instant revocation [FIX #4]
}

export interface RefreshTokenPayload extends JwtPayload {
  sub: string;       // User ID (stringified number)
  tv: number;        // token_version for instant revocation [FIX #4]
}

export interface GoogleVerifiedProfile {
  sub: string;
  email: string;
  name: string;
  picture?: string;
  hd?: string;       // hosted domain (e.g. iiitp.ac.in)
}

// ── Google OAuth Client Singleton ───────────────────────────────────────────

const googleClient = new OAuth2Client(env.GOOGLE_CLIENT_ID);

// ── Access Token Utilities ──────────────────────────────────────────────────

/**
 * Generates a signed Access Token (default 15m) with user claims.
 */
export function generateAccessToken(payload: {
  userId: number;
  email: string;
  role: UserRole;
  tokenVersion: number;
}): string {
  const claims: Omit<AccessTokenPayload, 'iat' | 'exp'> = {
    sub: String(payload.userId),
    email: payload.email,
    role: payload.role,
    tv: payload.tokenVersion,
  };

  const options: SignOptions = {
    expiresIn: env.JWT_ACCESS_EXPIRES_IN as jwt.SignOptions['expiresIn'],
  };

  return jwt.sign(claims, env.JWT_SECRET, options);
}

/**
 * Verifies an Access Token against JWT_SECRET.
 * Returns the decoded payload, or throws an Error if invalid / expired.
 */
export function verifyAccessToken(token: string): AccessTokenPayload {
  const decoded = jwt.verify(token, env.JWT_SECRET) as AccessTokenPayload;
  if (!decoded.sub || !decoded.role || typeof decoded.tv !== 'number') {
    throw new Error('Malformed access token payload: missing required claims');
  }
  return decoded;
}

// ── Refresh Token Utilities ─────────────────────────────────────────────────

/**
 * Generates a signed Refresh Token (default 7d) with minimal claims.
 */
export function generateRefreshToken(payload: {
  userId: number;
  tokenVersion: number;
}): string {
  const claims: Omit<RefreshTokenPayload, 'iat' | 'exp'> = {
    sub: String(payload.userId),
    tv: payload.tokenVersion,
  };

  const options: SignOptions = {
    expiresIn: env.JWT_REFRESH_EXPIRES_IN as jwt.SignOptions['expiresIn'],
  };

  return jwt.sign(claims, env.JWT_REFRESH_SECRET, options);
}

/**
 * Verifies a Refresh Token against JWT_REFRESH_SECRET.
 * Returns the decoded payload, or throws an Error if invalid / expired.
 */
export function verifyRefreshToken(token: string): RefreshTokenPayload {
  const decoded = jwt.verify(token, env.JWT_REFRESH_SECRET) as RefreshTokenPayload;
  if (!decoded.sub || typeof decoded.tv !== 'number') {
    throw new Error('Malformed refresh token payload: missing required claims');
  }
  return decoded;
}

// ── Google ID Token Verification ────────────────────────────────────────────

/**
 * Verifies a Google ID token from frontend OAuth flow.
 * Checks signature against Google public certs, validates audience (GOOGLE_CLIENT_ID),
 * verifies cryptographic nonce (to prevent replay attacks), and checks email domain.
 */
export async function verifyGoogleToken(
  idToken: string,
  expectedNonce?: string
): Promise<GoogleVerifiedProfile> {
  const ticket = await googleClient.verifyIdToken({
    idToken,
    audience: env.GOOGLE_CLIENT_ID,
  });

  const payload: TokenPayload | undefined = ticket.getPayload();
  if (!payload) {
    throw new Error('Invalid Google token: empty payload');
  }

  if (!payload.email || !payload.email_verified) {
    throw new Error('Google account email is missing or not verified');
  }

  // Cryptographic nonce validation (if nonce was supplied during frontend auth)
  if (expectedNonce && payload.nonce !== expectedNonce) {
    throw new Error('Google token nonce mismatch: potential replay attack detected');
  }

  // Domain enforcement
  const emailDomain = payload.email.split('@')[1];
  if (env.ALLOWED_DOMAIN && emailDomain !== env.ALLOWED_DOMAIN) {
    // If ALLOWED_DOMAIN is set (e.g. iiitp.ac.in), strictly enforce it
    throw new Error(`Unauthorized domain: @${emailDomain}. Only @${env.ALLOWED_DOMAIN} accounts are permitted.`);
  }

  return {
    sub: payload.sub,
    email: payload.email,
    name: payload.name || payload.email.split('@')[0],
    picture: payload.picture,
    hd: payload.hd,
  };
}
