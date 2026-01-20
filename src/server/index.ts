/**
 * Validation Server
 * Web UI + WebSocket for conversational assertion validation with Claude
 */

import 'dotenv/config';
import { Hono } from 'hono';
import { serve } from '@hono/node-server';
import { serveStatic } from '@hono/node-server/serve-static';
import { createNodeWebSocket } from '@hono/node-ws';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import api from './routes/api';
import researchApi from './routes/research-api';
import { discoveryApi } from './routes/discovery-api';
import { createWebSocketHandler } from './routes/websocket';
import { createResearchWebSocketHandler } from './routes/research-websocket';
import { getAuthStatus } from './middleware/auth';

const app = new Hono();

// Middleware
app.use('*', cors());
app.use('*', logger());

// API routes
app.route('/api', api);
app.route('/api/research', researchApi);
app.route('/api/discovery', discoveryApi);

// WebSocket setup for Node.js
const { injectWebSocket, upgradeWebSocket } = createNodeWebSocket({ app });

// WebSocket endpoints
app.get('/ws/validation', upgradeWebSocket(createWebSocketHandler()));
app.get('/ws/research', upgradeWebSocket(createResearchWebSocketHandler()));

// Serve evidence screenshots
app.use(
  '/evidence/*',
  serveStatic({
    root: './',
    rewriteRequestPath: (path) => path,
  })
);

// Serve screenshots directory
app.use(
  '/screenshots/*',
  serveStatic({
    root: './',
    rewriteRequestPath: (path) => path,
  })
);

// ============================================
// Explicit routes (MUST come before static handlers)
// ============================================

// Serve Svelte app at root (or fallback to Alpine.js landing page)
app.get('/', async (c) => {
  const fs = await import('fs/promises');
  const pathModule = await import('path');

  // Try Svelte build first
  try {
    const svelteHtml = await fs.readFile(
      pathModule.join(process.cwd(), 'src/server/public/dist/index.html'),
      'utf-8'
    );
    return c.html(svelteHtml);
  } catch {
    // Fallback to Alpine.js landing page
    try {
      const html = await fs.readFile(
        pathModule.join(process.cwd(), 'src/server/public/index-new.html'),
        'utf-8'
      );
      return c.html(html);
    } catch (error) {
      return c.text('Frontend not found. Run: cd frontend && npm install && npm run build', 404);
    }
  }
});

// Serve legacy validation UI at /validate
app.get('/validate', async (c) => {
  try {
    const fs = await import('fs/promises');
    const pathModule = await import('path');
    const html = await fs.readFile(
      pathModule.join(process.cwd(), 'src/server/public/index.html'),
      'utf-8'
    );
    return c.html(html);
  } catch (error) {
    return c.text('Validation UI not found. Please ensure src/server/public/index.html exists.', 404);
  }
});

// Serve legacy research UI at /research-legacy
app.get('/research-legacy', async (c) => {
  try {
    const fs = await import('fs/promises');
    const pathModule = await import('path');
    const html = await fs.readFile(
      pathModule.join(process.cwd(), 'src/server/public/research.html'),
      'utf-8'
    );
    return c.html(html);
  } catch (error) {
    return c.text('Research UI not found.', 404);
  }
});

// Health check
app.get('/health', (c) => {
  const auth = getAuthStatus();
  return c.json({
    status: 'ok',
    auth: auth.method,
    authValid: auth.valid,
    timestamp: new Date().toISOString(),
  });
});

// ============================================
// Static file handlers (after explicit routes)
// ============================================

// Serve Svelte app assets
app.use(
  '/assets/*',
  serveStatic({
    root: './src/server/public/dist',
    rewriteRequestPath: (path) => path,
  })
);

// Static files (serve legacy frontend files)
app.use(
  '/*',
  serveStatic({
    root: './src/server/public',
    rewriteRequestPath: (path) => path,
  })
);

// Start server
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;

console.log(`
╔════════════════════════════════════════════════════════════════╗
║           Deep Research Server Starting                         ║
╠════════════════════════════════════════════════════════════════╣
║  URL:            http://localhost:${PORT}                          ║
║  Discovery API:  http://localhost:${PORT}/api/discovery            ║
║  Research API:   http://localhost:${PORT}/api/research             ║
║  Validation API: http://localhost:${PORT}/api                      ║
║  Research WS:    ws://localhost:${PORT}/ws/research                ║
║  Validation WS:  ws://localhost:${PORT}/ws/validation              ║
╚════════════════════════════════════════════════════════════════╝
`);

// Check auth status
const authStatus = getAuthStatus();
if (authStatus.valid) {
  console.log(`✓ Authentication: ${authStatus.method}`);
  console.log(`  ${authStatus.details}`);
} else {
  console.log(`⚠ Authentication: ${authStatus.method}`);
  console.log(`  ${authStatus.details}`);
  console.log('');
  console.log('To authenticate:');
  console.log('  1. Run: claude login');
  console.log('  2. Or set ANTHROPIC_API_KEY in .env');
}

console.log('');

const server = serve({
  fetch: app.fetch,
  port: PORT,
});

// Inject WebSocket handling
injectWebSocket(server);

console.log(`Server running on http://localhost:${PORT}`);
