/**
 * tests/step2.pm2.test.ts — Step 2: PM2 Configuration Verification
 *
 * PURPOSE:
 *   Verify that the PM2 ecosystem config and the TypeScript production build
 *   are both correct and consistent with each other.
 *
 * WHAT IT TESTS:
 *   1. ecosystem.config.js exports a valid PM2 app array
 *   2. All required PM2 fields are present and have the correct values
 *   3. The script path in the config matches the actual compiled output (dist/src/index.js)
 *   4. Graceful startup/shutdown parameters match what src/index.ts implements
 *   5. No secrets are hardcoded in the ecosystem config
 *   6. The production build (dist/src/index.js) exists and is a valid JS file
 *   7. The build output does NOT contain test files
 *
 * HOW TO RUN:
 *   cd backend
 *   npm run build            ← must run first so dist/ exists
 *   npx jest tests/step2.pm2.test.ts --verbose
 */

import * as fs from 'fs';
import * as path from 'path';

// ---------------------------------------------------------------------------
// Paths
// ---------------------------------------------------------------------------
const BACKEND_ROOT = path.resolve(__dirname, '..');
const ECOSYSTEM_PATH = path.join(BACKEND_ROOT, 'ecosystem.config.js');
const DIST_ENTRY = path.join(BACKEND_ROOT, 'dist', 'src', 'index.js');
const DIST_DIR = path.join(BACKEND_ROOT, 'dist');

// ---------------------------------------------------------------------------
// Load the ecosystem config once for all tests
// ---------------------------------------------------------------------------
// eslint-disable-next-line @typescript-eslint/no-var-requires
const ecosystemConfig = require(ECOSYSTEM_PATH) as { apps: Record<string, unknown>[] };
const appConfig = ecosystemConfig.apps[0] as Record<string, unknown>;

// ─── 1. Ecosystem config structure ──────────────────────────────────────────

describe('Step 2 - ecosystem.config.js Structure', () => {
  it('exports an object with an "apps" array', () => {
    expect(ecosystemConfig).toBeDefined();
    expect(Array.isArray(ecosystemConfig.apps)).toBe(true);
    expect(ecosystemConfig.apps.length).toBeGreaterThanOrEqual(1);
  });

  it('app name is "iiitp-api"', () => {
    expect(appConfig.name).toBe('iiitp-api');
  });

  it('cwd is set (prevents dotenv failing to find .env when pm2 starts from a different directory)', () => {
    expect(appConfig.cwd).toBeDefined();
    // __dirname in ecosystem.config.js resolves to the backend root directory
    // containing this test — one level up from tests/
    const backendRoot = path.resolve(__dirname, '..');
    expect(appConfig.cwd).toBe(backendRoot);
  });

  it('exec_mode is "cluster"', () => {
    expect(appConfig.exec_mode).toBe('cluster');
  });

  it('instances is "max" (one per CPU core)', () => {
    expect(appConfig.instances).toBe('max');
  });

  it('max_memory_restart is set (prevents memory leak runaway)', () => {
    expect(appConfig.max_memory_restart).toBeDefined();
    expect(typeof appConfig.max_memory_restart).toBe('string');
    // Must be a valid PM2 memory string e.g. "400M", "1G"
    expect(appConfig.max_memory_restart).toMatch(/^\d+(M|G)$/);
  });
});

// ─── 2. Graceful startup/shutdown parameters ─────────────────────────────────

describe('Step 2 – Graceful Startup & Shutdown Config', () => {
  it('wait_ready is true (PM2 waits for process.send("ready"))', () => {
    expect(appConfig.wait_ready).toBe(true);
  });

  it('listen_timeout is set and >= 5000ms', () => {
    expect(typeof appConfig.listen_timeout).toBe('number');
    expect(appConfig.listen_timeout as number).toBeGreaterThanOrEqual(5000);
  });

  it('kill_timeout is set and >= 5000ms (must cover http-graceful-shutdown window)', () => {
    expect(typeof appConfig.kill_timeout).toBe('number');
    expect(appConfig.kill_timeout as number).toBeGreaterThanOrEqual(5000);
  });
});

// ─── 3. Script path matches actual compiled output ────────────────────────────

describe('Step 2 – Script Path Consistency', () => {
  it('ecosystem script path is "dist/src/index.js" (matches rootDir "." compilation)', () => {
    expect(appConfig.script).toBe('dist/src/index.js');
  });

  it('dist/src/index.js exists (build has been run)', () => {
    expect(fs.existsSync(DIST_ENTRY)).toBe(true);
  });

  it('dist/src/index.js is a non-empty file', () => {
    const stat = fs.statSync(DIST_ENTRY);
    expect(stat.size).toBeGreaterThan(0);
  });
});

// ─── 4. No secrets hardcoded in ecosystem config ─────────────────────────────

describe('Step 2 – Security: No Hardcoded Secrets', () => {
  let configSource: string;

  beforeAll(() => {
    configSource = fs.readFileSync(ECOSYSTEM_PATH, 'utf-8');
  });

  const secretPatterns: Array<[string, RegExp]> = [
    ['DATABASE_URL with credentials', /mysql:\/\/[^:]+:[^@]+@/],
    ['JWT_SECRET value', /JWT_SECRET\s*[:=]\s*["'][a-f0-9]{32,}/i],
    ['JWT_REFRESH_SECRET value', /JWT_REFRESH_SECRET\s*[:=]\s*["'][a-f0-9]{32,}/i],
    ['hardcoded password', /password\s*[:=]\s*["'][^"']{6,}/i],
  ];

  for (const [label, pattern] of secretPatterns) {
    it(`does not contain ${label}`, () => {
      expect(configSource).not.toMatch(pattern);
    });
  }

  it('env_production sets NODE_ENV to production', () => {
    const envProd = appConfig.env_production as Record<string, unknown>;
    expect(envProd).toBeDefined();
    expect(envProd.NODE_ENV).toBe('production');
  });

  it('env_production does not contain any secret-looking keys', () => {
    const envProd = appConfig.env_production as Record<string, unknown>;
    const secretKeys = Object.keys(envProd).filter((k) =>
      /secret|password|token|key|url/i.test(k)
    );
    expect(secretKeys).toHaveLength(0);
  });
});

// ─── 5. Build output sanity checks ───────────────────────────────────────────

describe('Step 2 – Production Build Sanity', () => {
  it('dist/ directory exists', () => {
    expect(fs.existsSync(DIST_DIR)).toBe(true);
  });

  it('dist/src/config/env.js exists (env validation compiled)', () => {
    expect(fs.existsSync(path.join(DIST_DIR, 'src', 'config', 'env.js'))).toBe(true);
  });

  it('dist/src/config/prisma.js exists (DB client compiled)', () => {
    expect(fs.existsSync(path.join(DIST_DIR, 'src', 'config', 'prisma.js'))).toBe(true);
  });

  it('dist/ does NOT contain test files (tests/ excluded from build)', () => {
    const testDir = path.join(DIST_DIR, 'tests');
    expect(fs.existsSync(testDir)).toBe(false);
  });

  it('dist/src/index.js references process.send (PM2 ready signal is present in compiled output)', () => {
    const indexContent = fs.readFileSync(DIST_ENTRY, 'utf-8');
    // process.send?.('ready') compiles to something referencing process.send
    expect(indexContent).toMatch(/process\.send/);
  });
});
