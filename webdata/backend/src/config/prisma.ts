/**
 * src/config/prisma.ts
 * Singleton Prisma client — shared across the entire application.
 *
 * Prisma v7 requires a driver adapter to be passed to PrismaClient.
 * We use @prisma/adapter-mariadb which is fully compatible with MySQL 8.x.
 * Connection options are parsed from DATABASE_URL for maximum compatibility.
 */
import { PrismaClient } from '@prisma/client';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import { env } from './env';

// DATABASE_URL is read from the validated `env` object (not raw process.env)
// to ensure envalid has already verified the value before we try to parse it.
const dbUrl = new URL(env.DATABASE_URL);

const adapter = new PrismaMariaDb({
  host: dbUrl.hostname || 'localhost',
  port: parseInt(dbUrl.port) || 3306,
  user: decodeURIComponent(dbUrl.username),
  password: decodeURIComponent(dbUrl.password),
  database: dbUrl.pathname.replace(/^\//, ''),
  allowPublicKeyRetrieval: true, // required for MySQL 8 caching_sha2_password
  connectionLimit: 20,
  acquireTimeout: 30000,
});

const prisma = new PrismaClient({
  adapter,
  log: env.NODE_ENV === 'development' ? ['query', 'warn', 'error'] : ['warn', 'error'],
});

export default prisma;
