import dotenv from 'dotenv';
import path from 'node:path';

dotenv.config();

export const config = {
  port: parseInt(process.env.PORT || '3000', 10),
  jwtSecret: process.env.JWT_SECRET || 'iiit-pune-cms-jwt-secret-key-2026-production-grade',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '24h',
  uploadDir: path.resolve(process.cwd(), 'uploads/faculty'),
  db: {
    client: process.env.DB_CLIENT || 'sqlite', // 'sqlite' | 'mysql' | 'postgres'
    sqlitePath: path.resolve(process.cwd(), 'data/iiitp_cms.sqlite'),
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'iiitp_cms',
  },
  corsOrigin: process.env.CORS_ORIGIN || '*',
  environment: process.env.NODE_ENV || 'development'
};
