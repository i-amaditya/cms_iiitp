/**
 * src/config/env.ts
 * Validates all required environment variables at startup using envalid.
 * If any required variable is missing, the process crashes with a clear error
 * instead of silently failing later when the variable is first accessed.
 *
 * File storage: local VPS disk only (Hostinger Cloud Startup plan).
 * Uploaded files are stored in UPLOAD_DIR and served at UPLOAD_BASE_URL via Nginx.
 */
import 'dotenv/config';
import { cleanEnv, str, port, bool } from 'envalid';

export const env = cleanEnv(process.env, {
  DATABASE_URL:       str(),
  GOOGLE_CLIENT_ID:   str(),
  JWT_SECRET:         str(),
  JWT_REFRESH_SECRET: str(),
  JWT_ACCESS_EXPIRES_IN:  str({ default: '15m' }),
  JWT_REFRESH_EXPIRES_IN: str({ default: '7d' }),
  ALLOWED_DOMAIN:     str({ default: 'iiitp.ac.in' }),
  CORS_ORIGINS:       str(),
  COOKIE_DOMAIN:      str({ default: '.iiitp.ac.in' }),
  COOKIE_SECURE:      bool({ default: true }),
  NODE_ENV:           str({ choices: ['development', 'production', 'test'] }),
  PORT:               port({ default: 4000 }),
  // Local file storage (Hostinger VPS disk)
  UPLOAD_DIR:         str({ default: './uploads' }),
  UPLOAD_BASE_URL:    str({ default: 'http://localhost:4000/uploads' }),
  LOG_LEVEL:          str({ default: 'info', choices: ['error', 'warn', 'info', 'debug'] }),
});
