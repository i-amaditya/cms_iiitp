/**
 * ecosystem.config.js — PM2 process configuration
 *
 * PRODUCTION DEPLOYMENT (on Hostinger Cloud VPS):
 *   1. npm run build:clean     ← ALWAYS use clean build on VPS (prevents stale compiled files)
 *   2. pm2 start ecosystem.config.js --env production
 *   3. pm2 save                 ← persist process list across reboots
 *   4. pm2 startup              ← register PM2 as a systemd service
 *
 * IMPORTANT: Never hardcode secrets in this file.
 * All sensitive values (DB URL, JWT secrets, etc.) must come from
 * the server's environment (set via Hostinger hPanel → SSH → export VAR=value,
 * or loaded from /var/www/backend/.env via the dotenv call in src/config/env.ts).
 *
 * HOW THE HANDSHAKE WORKS:
 *   wait_ready: true  → PM2 holds traffic until src/index.ts fires process.send('ready')
 *                        (this happens only after app.listen() succeeds + DB is reachable)
 *   kill_timeout: 5000 → on SIGINT/SIGTERM PM2 waits up to 5s for in-flight requests to
 *                        finish; src/index.ts uses http-graceful-shutdown + prisma.$disconnect()
 *                        to drain the connection pool cleanly within that window
 */

module.exports = {
  apps: [
    {
      name: 'iiitp-api',

      // Compiled production bundle — do NOT point at src/index.ts directly in prod.
      script: 'dist/src/index.js',

      // CRITICAL: Set cwd to the directory containing this file (the backend root).
      // Without this, PM2 inherits process.cwd() from wherever 'pm2 start' was run.
      // dotenv (in src/config/env.ts) resolves .env relative to cwd — if cwd is wrong
      // (e.g. /root), the .env file won't be found and the server will crash on startup.
      // eslint-disable-next-line no-undef
      cwd: __dirname,

      // Cluster mode: PM2 spawns one worker per logical CPU core and load-balances
      // incoming connections across them using Node.js's built-in cluster module.
      instances: 'max',
      exec_mode: 'cluster',

      // Auto-restart a worker if its heap grows beyond this threshold.
      // Adjust to your Hostinger plan's RAM.
      // Rule of thumb: (total RAM × 0.7) / number_of_cores, capped at 400M.
      //
      // ⚠️ CONNECTION POOL NOTE (cluster mode):
      // The mariadb adapter creates a connection pool per worker process.
      // Total DB connections = instances × pool_size_per_worker.
      // Default mariadb pool_size is 5. With 4 cores: 4 × 5 = 20 connections.
      // MySQL default max_connections = 151. This is safe for now.
      // If you scale up cores, revisit pool_size in src/config/prisma.ts.
      max_memory_restart: '400M',

      // ── Graceful startup ───────────────────────────────────────────────────
      // PM2 waits for process.send('ready') before marking the worker as online
      // and routing traffic to it. This prevents sending requests to a worker
      // that hasn't finished connecting to the DB yet.
      wait_ready: true,
      listen_timeout: 10000, // abort if ready signal doesn't arrive within 10s

      // ── Graceful shutdown ──────────────────────────────────────────────────
      // Give in-flight requests this many ms to complete before SIGKILL.
      // Must be >= the timeout set in http-graceful-shutdown (src/index.ts).
      kill_timeout: 5000,

      // ── Environment variables ──────────────────────────────────────────────
      // Only non-secret, deployment-mode variables belong here.
      // All secrets (DATABASE_URL, JWT_SECRET, etc.) must be set in the server
      // environment or loaded from .env — never committed to this file.
      env_production: {
        NODE_ENV: 'production',
      },
      env_development: {
        NODE_ENV: 'development',
      },

      // ── Logging ───────────────────────────────────────────────────────────
      // PM2 merges stdout/stderr from all cluster workers into a single log.
      // Rotate logs to prevent disk fill-up (requires pm2-logrotate module).
      merge_logs: true,
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    },
  ],
};
