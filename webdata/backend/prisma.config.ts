/**
 * prisma.config.ts — Prisma v7+ configuration
 *
 * Prisma v7 removed support for `url = env("DATABASE_URL")` in schema.prisma.
 * The database URL is now provided here. Your .env file is unchanged.
 * See: https://pris.ly/d/config-datasource
 */

import 'dotenv/config';
import { defineConfig, env } from 'prisma/config';

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
  },
  datasource: {
    url: env('DATABASE_URL'),
  },
});
