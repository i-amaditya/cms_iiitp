/** jest.config.js — Backend test configuration */
module.exports = {
  // Use @swc/jest instead of ts-jest because TypeScript 7 (the Go-based rewrite)
  // removed the Compiler API that ts-jest depends on. SWC transpiles TypeScript
  // without needing the TS Compiler API, so it works with any TS version.
  testEnvironment: 'node',
  roots: ['<rootDir>/tests'],
  testMatch: ['**/*.test.ts'],
  transform: {
    '^.+\\.tsx?$': ['@swc/jest', {
      jsc: {
        parser: { syntax: 'typescript', decorators: false },
        target: 'es2020',
      },
      module: { type: 'commonjs' },
    }],
  },
  // Load .env once before all test suites (runs in the globalSetup process)
  globalSetup: '<rootDir>/tests/setup.ts',
  // Load dotenv in the test worker process as well (globalSetup runs in a
  // separate process and does NOT share env vars with the test files).
  setupFiles: ['dotenv/config'],
  // Give each test file a longer timeout for DB operations
  testTimeout: 15000,
  collectCoverage: false,
};
