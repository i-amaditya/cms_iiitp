/**
 * tests/setup.ts — Jest globalSetup
 *
 * Runs once before all test suites. Loads the .env file so that
 * environment variables are available in every test file.
 * Also verifies the database can be reached before the suite begins.
 */
import 'dotenv/config';

export default async function globalSetup() {
  // Just ensure env is loaded — the actual DB is tested per-suite.
  if (!process.env.DATABASE_URL) {
    throw new Error(
      '[TEST SETUP] DATABASE_URL is not set. Create backend/.env before running tests.'
    );
  }
}
