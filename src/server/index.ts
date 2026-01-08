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
import { createWebSocketHandler } from './routes/websocket';
import { getAuthStatus } from './middleware/auth';

const app = new Hono();

// Middleware
app.use('*', cors());
app.use('*', logger());

// API routes
app.route('/api', api);

// WebSocket setup for Node.js
const { injectWebSocket, upgradeWebSocket } = createNodeWebSocket({ app });

// WebSocket endpoint
app.get('/ws/validation', upgradeWebSocket(createWebSocketHandler()));

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

// Static files (serve frontend)
app.use(
  '/*',
  serveStatic({
    root: './src/server/public',
    rewriteRequestPath: (path) => path,
  })
);

// Fallback to index.html for SPA routing
app.get('/', async (c) => {
  try {
    const fs = await import('fs/promises');
    const path = await import('path');
    const html = await fs.readFile(
      path.join(process.cwd(), 'src/server/public/index.html'),
      'utf-8'
    );
    return c.html(html);
  } catch (error) {
    return c.text('Frontend not found. Please ensure src/server/public/index.html exists.', 404);
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

// Start server
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;

console.log(`
╔══════════════════════════════════════════════════════════════╗
║                  Validation Server Starting                   ║
╠══════════════════════════════════════════════════════════════╣
║  URL:       http://localhost:${PORT}                            ║
║  API:       http://localhost:${PORT}/api                        ║
║  WebSocket: ws://localhost:${PORT}/ws/validation                ║
╚══════════════════════════════════════════════════════════════╝
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
