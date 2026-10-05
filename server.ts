import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createServer as createViteServer } from 'vite';
import { initDatabase } from './server/db/connection.ts';
import { config } from './server/config/index.ts';

// Routes
import authRoutes from './server/routes/auth.routes.ts';
import publicRoutes from './server/routes/public.routes.ts';
import adminRoutes from './server/routes/admin.routes.ts';
import facultyRoutes from './server/routes/faculty.routes.ts';
import uploadRoutes from './server/routes/upload.routes.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();

  // Basic security and parsing middleware
  app.use(express.json({ limit: '15mb' }));
  app.use(express.urlencoded({ extended: true, limit: '15mb' }));

  // CORS support
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', config.corsOrigin);
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
      res.sendStatus(200);
      return;
    }
    next();
  });

  // Serve static uploads
  app.use('/uploads', express.static(path.resolve(process.cwd(), 'uploads')));

  // Initialize Database & Seeds
  await initDatabase();
  console.log('[IIIT Pune CMS] Database initialized and validated.');

  // Mount API endpoints
  app.use('/api/auth', authRoutes);
  app.use('/api/public', publicRoutes);
  app.use('/api/admin', adminRoutes);
  app.use('/api/faculty', facultyRoutes);
  app.use('/api/upload', uploadRoutes);

  // Health check endpoint
  app.get('/api/health', (_req, res) => {
    res.json({
      status: 'UP',
      institute: 'Indian Institute of Information Technology Pune',
      module: 'Faculty Management CMS',
      timestamp: new Date().toISOString()
    });
  });

  const isProduction = process.env.NODE_ENV === 'production';
  const port = config.port;

  if (!isProduction) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`[IIIT Pune CMS] Server listening on http://0.0.0.0:${port}`);
  });
}

startServer().catch(err => {
  console.error('[IIIT Pune CMS] Fatal error starting server:', err);
  process.exit(1);
});
