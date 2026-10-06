/**
 * prisma/seed/index.ts
 *
 * Master Seeder orchestrating all data migrations from static JSON files into MySQL.
 * Run with: `npm run db:seed`
 */

import prisma from '../../src/config/prisma';
import { logger } from '../../src/utils/logger';
import { seedNotices } from './notices.seed';
import { seedNews } from './news.seed';
import { seedCareers } from './careers.seed';
import { seedEtenders } from './etenders.seed';

async function main() {
  logger.info('🚀 Starting Database Seeding from static JSON files...');

  const startTime = Date.now();

  try {
    const noticesCount = await seedNotices();
    const newsCount = await seedNews();
    const careersCount = await seedCareers();
    const etendersCount = await seedEtenders();

    const duration = ((Date.now() - startTime) / 1000).toFixed(2);
    logger.info(`✨ Database Seeding Completed in ${duration}s! Summary:
  - Notices:   ${noticesCount}
  - News:      ${newsCount}
  - Careers:   ${careersCount}
  - E-Tenders: ${etendersCount}
`);
  } catch (err) {
    logger.error('❌ Error during database seeding', { err });
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
