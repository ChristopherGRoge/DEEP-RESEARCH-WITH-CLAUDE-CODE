"use strict";
/**
 * Validation Server
 * Web UI + WebSocket for conversational assertion validation with Claude
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const hono_1 = require("hono");
const node_server_1 = require("@hono/node-server");
const serve_static_1 = require("@hono/node-server/serve-static");
const node_ws_1 = require("@hono/node-ws");
const cors_1 = require("hono/cors");
const logger_1 = require("hono/logger");
const api_1 = __importDefault(require("./routes/api"));
const research_api_1 = __importDefault(require("./routes/research-api"));
const discovery_api_1 = require("./routes/discovery-api");
const websocket_1 = require("./routes/websocket");
const research_websocket_1 = require("./routes/research-websocket");
const auth_1 = require("./middleware/auth");
const app = new hono_1.Hono();
// Middleware
app.use('*', (0, cors_1.cors)());
app.use('*', (0, logger_1.logger)());
// API routes
app.route('/api', api_1.default);
app.route('/api/research', research_api_1.default);
app.route('/api/discovery', discovery_api_1.discoveryApi);
// WebSocket setup for Node.js
const { injectWebSocket, upgradeWebSocket } = (0, node_ws_1.createNodeWebSocket)({ app });
// WebSocket endpoints
app.get('/ws/validation', upgradeWebSocket((0, websocket_1.createWebSocketHandler)()));
app.get('/ws/research', upgradeWebSocket((0, research_websocket_1.createResearchWebSocketHandler)()));
// Serve evidence screenshots
app.use('/evidence/*', (0, serve_static_1.serveStatic)({
    root: './',
    rewriteRequestPath: (path) => path,
}));
// Serve screenshots directory
app.use('/screenshots/*', (0, serve_static_1.serveStatic)({
    root: './',
    rewriteRequestPath: (path) => path,
}));
// ============================================
// Explicit routes (MUST come before static handlers)
// ============================================
// Serve Research Grove as home page
app.get('/', async (c) => {
    const fs = await Promise.resolve().then(() => __importStar(require('fs/promises')));
    const pathModule = await Promise.resolve().then(() => __importStar(require('path')));
    try {
        const html = await fs.readFile(pathModule.join(process.cwd(), 'src/server/public/grove.html'), 'utf-8');
        return c.html(html);
    }
    catch (error) {
        return c.text('Grove frontend not found. Ensure src/server/public/grove.html exists.', 404);
    }
});
// Serve legacy validation UI at /validate
app.get('/validate', async (c) => {
    try {
        const fs = await Promise.resolve().then(() => __importStar(require('fs/promises')));
        const pathModule = await Promise.resolve().then(() => __importStar(require('path')));
        const html = await fs.readFile(pathModule.join(process.cwd(), 'src/server/public/index.html'), 'utf-8');
        return c.html(html);
    }
    catch (error) {
        return c.text('Validation UI not found. Please ensure src/server/public/index.html exists.', 404);
    }
});
// Serve legacy research UI at /research-legacy
app.get('/research-legacy', async (c) => {
    try {
        const fs = await Promise.resolve().then(() => __importStar(require('fs/promises')));
        const pathModule = await Promise.resolve().then(() => __importStar(require('path')));
        const html = await fs.readFile(pathModule.join(process.cwd(), 'src/server/public/research.html'), 'utf-8');
        return c.html(html);
    }
    catch (error) {
        return c.text('Research UI not found.', 404);
    }
});
// Serve entity research page at /entity/:id
app.get('/entity/:id', async (c) => {
    try {
        const fs = await Promise.resolve().then(() => __importStar(require('fs/promises')));
        const pathModule = await Promise.resolve().then(() => __importStar(require('path')));
        const html = await fs.readFile(pathModule.join(process.cwd(), 'src/server/public/entity.html'), 'utf-8');
        return c.html(html);
    }
    catch (error) {
        return c.text('Entity page not found. Please ensure src/server/public/entity.html exists.', 404);
    }
});
// Health check
app.get('/health', (c) => {
    const auth = (0, auth_1.getAuthStatus)();
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
app.use('/assets/*', (0, serve_static_1.serveStatic)({
    root: './src/server/public/dist',
    rewriteRequestPath: (path) => path,
}));
// Static files (serve legacy frontend files)
app.use('/*', (0, serve_static_1.serveStatic)({
    root: './src/server/public',
    rewriteRequestPath: (path) => path,
}));
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
const authStatus = (0, auth_1.getAuthStatus)();
if (authStatus.valid) {
    console.log(`✓ Authentication: ${authStatus.method}`);
    console.log(`  ${authStatus.details}`);
}
else {
    console.log(`⚠ Authentication: ${authStatus.method}`);
    console.log(`  ${authStatus.details}`);
    console.log('');
    console.log('To authenticate:');
    console.log('  1. Run: claude login');
    console.log('  2. Or set ANTHROPIC_API_KEY in .env');
}
console.log('');
const server = (0, node_server_1.serve)({
    fetch: app.fetch,
    port: PORT,
});
// Inject WebSocket handling
injectWebSocket(server);
console.log(`Server running on http://localhost:${PORT}`);
//# sourceMappingURL=index.js.map