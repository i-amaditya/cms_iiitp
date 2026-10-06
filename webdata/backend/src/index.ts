/**
 * src/index.ts — Application entry point
 *
 * IMPORTANT: env validation MUST be the very first import.
 * This ensures the process crashes immediately with a clear error
 * if any required environment variable is missing.
 */
import './config/env';  // ← must be first — validates all env vars at startup

import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import gracefulShutdown from 'http-graceful-shutdown';

import { env } from './config/env';
import prisma from './config/prisma';
import { logger } from './utils/logger';

import path from 'path';
import authRouter from './routes/auth.routes';
import adminRouter from './routes/admin.routes';
import noticesRouter from './routes/notices.routes';
import newsRouter from './routes/news.routes';
import careersRouter from './routes/careers.routes';
import etendersRouter from './routes/etenders.routes';
import mediaRouter from './routes/media.routes';

const app = express();

// ── Security middleware ──────────────────────────────────────────────────────
app.use(helmet({
  crossOriginOpenerPolicy: env.NODE_ENV === 'production' ? { policy: 'same-origin-allow-popups' } : false,
  crossOriginEmbedderPolicy: false,
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "https://accounts.google.com"],
      scriptSrcAttr: ["'unsafe-inline'"],
      frameSrc: ["'self'", "https://accounts.google.com"],
      connectSrc: ["'self'", "https://accounts.google.com"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
}));
app.use(cors({
  origin: env.CORS_ORIGINS.split(','),
  credentials: true,
}));
app.use(cookieParser());
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true, limit: '2mb' }));

// Serve dev sandbox UI from public/
app.use(express.static(path.join(__dirname, '../public')));

// ── Rate limiting ─────────────────────────────────────────────────────────────
const generalLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(generalLimiter);

// ── Health check ──────────────────────────────────────────────────────────────
app.get('/health', async (_req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.json({ status: 'ok', db: 'connected', ts: new Date().toISOString() });
  } catch {
    res.status(503).json({ status: 'error', db: 'disconnected' });
  }
});

// ── Dev Helper: Seed Invite for Local Auth Testing ────────────────────────────
if (env.NODE_ENV !== 'production') {
  app.post('/dev/seed-invite', async (req, res) => {
    try {
      const { email, role, sections } = req.body;
      if (!email) {
        res.status(400).json({ error: 'Missing email' });
        return;
      }
      
      const invite = await prisma.invite.upsert({
        where: { email },
        update: {
          role: role || 'editor',
          sections: sections || ['notices', 'news'],
          accepted: false,
        },
        create: {
          email,
          role: role || 'editor',
          sections: sections || ['notices', 'news'],
          token: `dev-invite-${Date.now()}`,
          accepted: false,
        },
      });

      res.json({ message: 'Invite created/reset successfully', invite });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });
}

// ── Static file serving for uploads (/uploads/*) [FIX #6] ─────────────────────
// Enforces Content-Disposition: attachment for all PDF requests to prevent XSS script execution
app.use('/uploads', express.static(path.resolve(process.cwd(), env.UPLOAD_DIR), {
  setHeaders: (res, filePath) => {
    if (filePath.toLowerCase().endsWith('.pdf')) {
      const fileName = path.basename(filePath);
      res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
      res.setHeader('Content-Type', 'application/pdf');
    }
  },
}));

// ── API routes ───────────────────────────────────────────────────────────────
app.use('/v1/auth', authRouter);
app.use('/v1/admin', adminRouter);
app.use('/v1/notices', noticesRouter);
app.use('/v1/news', newsRouter);
app.use('/v1/careers', careersRouter);
app.use('/v1/etenders', etendersRouter);
app.use('/v1/media', mediaRouter);

// ── 404 handler ───────────────────────────────────────────────────────────────
app.use((_req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// ── Global error handler ──────────────────────────────────────────────────────
// NOTE: Must be async for Express 5 — Express 5 forwards async errors automatically
// and expects the error handler to be able to handle async rejection chains.
app.use(async (err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  logger.error('Unhandled error', { err });
  res.status(500).json({ error: 'Internal server error' });
});

// ── Start server ──────────────────────────────────────────────────────────────
const server = app.listen(env.PORT, () => {
  logger.info(`🚀 API listening on port ${env.PORT} (${env.NODE_ENV})`);
  process.send?.('ready'); // signal PM2 that the process is ready [production]
});

// ── Graceful shutdown ─────────────────────────────────────────────────────────
gracefulShutdown(server, {
  signals: 'SIGINT SIGTERM',
  timeout: 5000,
  onShutdown: async () => {
    await prisma.$disconnect();
    logger.info('DB disconnected. Exiting cleanly.');
  },
});

export default app;
