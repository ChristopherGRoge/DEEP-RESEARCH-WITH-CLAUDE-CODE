"use strict";
/**
 * Discovery API Routes
 *
 * Exposes discovery system functionality for the Control Tower frontend.
 * Workflow: Discovery (Control Tower) -> Research -> Validation
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.discoveryApi = void 0;
const hono_1 = require("hono");
const tools = __importStar(require("../../tools"));
exports.discoveryApi = new hono_1.Hono();
// ============================================
// SOURCE REGISTRY
// ============================================
/**
 * GET /api/discovery/sources
 * List all discovery sources with optional filtering
 */
exports.discoveryApi.get('/sources', async (c) => {
    try {
        const sourceType = c.req.query('sourceType');
        const isActive = c.req.query('isActive');
        const category = c.req.query('category');
        const sources = await tools.listDiscoverySources({
            sourceType: sourceType,
            isActive: isActive === 'true' ? true : isActive === 'false' ? false : undefined,
            category,
        });
        return c.json({ success: true, data: sources });
    }
    catch (error) {
        return c.json({ success: false, error: String(error) }, 500);
    }
});
/**
 * GET /api/discovery/sources/stats
 * Get source statistics summary
 */
exports.discoveryApi.get('/sources/stats', async (c) => {
    try {
        const stats = await tools.getSourceStats();
        return c.json({ success: true, data: stats });
    }
    catch (error) {
        return c.json({ success: false, error: String(error) }, 500);
    }
});
/**
 * GET /api/discovery/sources/stale
 * Get sources due for crawling
 */
exports.discoveryApi.get('/sources/stale', async (c) => {
    try {
        const maxAgeHours = parseInt(c.req.query('maxAgeHours') || '24');
        const sources = await tools.getStaleSources(maxAgeHours);
        return c.json({ success: true, data: sources });
    }
    catch (error) {
        return c.json({ success: false, error: String(error) }, 500);
    }
});
/**
 * GET /api/discovery/sources/due
 * Get sources due for scheduled crawl
 */
exports.discoveryApi.get('/sources/due', async (c) => {
    try {
        const sources = await tools.getSourcesDueForCrawl();
        return c.json({ success: true, data: sources });
    }
    catch (error) {
        return c.json({ success: false, error: String(error) }, 500);
    }
});
/**
 * POST /api/discovery/sources/seed
 * Seed default sources (73 curated sources)
 */
exports.discoveryApi.post('/sources/seed', async (c) => {
    try {
        const result = await tools.seedDefaultSources();
        return c.json({ success: true, data: result });
    }
    catch (error) {
        return c.json({ success: false, error: String(error) }, 500);
    }
});
/**
 * PATCH /api/discovery/sources/:id
 * Update a source's active status or settings
 */
exports.discoveryApi.patch('/sources/:id', async (c) => {
    try {
        const sourceId = c.req.param('id');
        const body = await c.req.json();
        const result = await tools.updateDiscoverySource(sourceId, body);
        return c.json({ success: true, data: result });
    }
    catch (error) {
        return c.json({ success: false, error: String(error) }, 500);
    }
});
// ============================================
// CRAWL ORCHESTRATION
// ============================================
/**
 * POST /api/discovery/crawl/start
 * Start a new discovery crawl
 */
exports.discoveryApi.post('/crawl/start', async (c) => {
    try {
        const body = await c.req.json();
        const result = await tools.startDiscoveryCrawl({
            projectId: body.projectId,
            sourceTypes: body.sourceTypes,
            sourceIds: body.sourceIds,
            researchFocus: body.researchFocus,
            maxSources: body.maxSources,
            concurrency: body.concurrency,
        });
        return c.json({ success: true, data: result });
    }
    catch (error) {
        return c.json({ success: false, error: String(error) }, 500);
    }
});
/**
 * GET /api/discovery/crawl/:id/status
 * Get crawl progress/status
 */
exports.discoveryApi.get('/crawl/:id/status', async (c) => {
    try {
        const crawlId = c.req.param('id');
        const status = await tools.getCrawlStatus(crawlId);
        return c.json({ success: true, data: status });
    }
    catch (error) {
        return c.json({ success: false, error: String(error) }, 500);
    }
});
/**
 * POST /api/discovery/crawl/:id/pause
 * Pause an active crawl
 */
exports.discoveryApi.post('/crawl/:id/pause', async (c) => {
    try {
        const crawlId = c.req.param('id');
        const result = await tools.pauseCrawl(crawlId);
        return c.json({ success: true, data: { paused: result } });
    }
    catch (error) {
        return c.json({ success: false, error: String(error) }, 500);
    }
});
/**
 * POST /api/discovery/crawl/:id/resume
 * Resume a paused crawl
 */
exports.discoveryApi.post('/crawl/:id/resume', async (c) => {
    try {
        const crawlId = c.req.param('id');
        const result = await tools.resumeCrawl(crawlId);
        return c.json({ success: true, data: { resumed: result } });
    }
    catch (error) {
        return c.json({ success: false, error: String(error) }, 500);
    }
});
/**
 * POST /api/discovery/crawl/:id/cancel
 * Cancel an active crawl
 */
exports.discoveryApi.post('/crawl/:id/cancel', async (c) => {
    try {
        const crawlId = c.req.param('id');
        const result = await tools.cancelCrawl(crawlId);
        return c.json({ success: true, data: { cancelled: result } });
    }
    catch (error) {
        return c.json({ success: false, error: String(error) }, 500);
    }
});
/**
 * GET /api/discovery/crawl/history
 * Get crawl history for a project
 */
exports.discoveryApi.get('/crawl/history', async (c) => {
    try {
        const projectId = c.req.query('projectId');
        const limit = parseInt(c.req.query('limit') || '20');
        if (!projectId) {
            return c.json({ success: false, error: 'projectId is required' }, 400);
        }
        const history = await tools.getCrawlHistory(projectId, limit);
        return c.json({ success: true, data: history });
    }
    catch (error) {
        return c.json({ success: false, error: String(error) }, 500);
    }
});
// ============================================
// RAW DISCOVERIES & PROCESSING
// ============================================
/**
 * GET /api/discovery/pending
 * Get pending (unprocessed) discoveries
 */
exports.discoveryApi.get('/pending', async (c) => {
    try {
        const projectId = c.req.query('projectId');
        const limit = parseInt(c.req.query('limit') || '50');
        const discoveries = await tools.getPendingDiscoveries(projectId, limit);
        return c.json({ success: true, data: discoveries });
    }
    catch (error) {
        return c.json({ success: false, error: String(error) }, 500);
    }
});
/**
 * GET /api/discovery/stats
 * Get discovery processing statistics
 */
exports.discoveryApi.get('/stats', async (c) => {
    try {
        const projectId = c.req.query('projectId');
        if (!projectId) {
            return c.json({ success: false, error: 'projectId is required' }, 400);
        }
        const stats = await tools.getDiscoveryStats(projectId);
        return c.json({ success: true, data: stats });
    }
    catch (error) {
        return c.json({ success: false, error: String(error) }, 500);
    }
});
/**
 * POST /api/discovery/process/one
 * Process a single raw discovery (deduplication + entity resolution)
 */
exports.discoveryApi.post('/process/one', async (c) => {
    try {
        const body = await c.req.json();
        const result = await tools.processRawDiscovery(body.projectId, body.rawDiscoveryId);
        return c.json({ success: true, data: result });
    }
    catch (error) {
        return c.json({ success: false, error: String(error) }, 500);
    }
});
/**
 * POST /api/discovery/process/batch
 * Process all pending discoveries
 */
exports.discoveryApi.post('/process/batch', async (c) => {
    try {
        const body = await c.req.json();
        const result = await tools.processPendingDiscoveries(body.projectId, body.limit);
        return c.json({ success: true, data: result });
    }
    catch (error) {
        return c.json({ success: false, error: String(error) }, 500);
    }
});
/**
 * POST /api/discovery/search
 * Search discoveries
 */
exports.discoveryApi.post('/search', async (c) => {
    try {
        const body = await c.req.json();
        const results = await tools.searchDiscoveries(body.query, {
            sourceType: body.sourceType,
            processed: body.processed,
        });
        return c.json({ success: true, data: results });
    }
    catch (error) {
        return c.json({ success: false, error: String(error) }, 500);
    }
});
// ============================================
// CRITICALITY SCORING
// ============================================
/**
 * POST /api/discovery/criticality/score-project
 * Score all assertions in a project for criticality
 */
exports.discoveryApi.post('/criticality/score-project', async (c) => {
    try {
        const body = await c.req.json();
        const result = await tools.scoreProjectAssertions(body.projectId, body.weights);
        return c.json({ success: true, data: result });
    }
    catch (error) {
        return c.json({ success: false, error: String(error) }, 500);
    }
});
/**
 * GET /api/discovery/criticality/summary
 * Get criticality summary for a project
 */
exports.discoveryApi.get('/criticality/summary', async (c) => {
    try {
        const projectId = c.req.query('projectId');
        if (!projectId) {
            return c.json({ success: false, error: 'projectId is required' }, 400);
        }
        const summary = await tools.getCriticalitySummary(projectId);
        return c.json({ success: true, data: summary });
    }
    catch (error) {
        return c.json({ success: false, error: String(error) }, 500);
    }
});
/**
 * GET /api/discovery/criticality/needs-validation
 * Get critical assertions needing validation
 */
exports.discoveryApi.get('/criticality/needs-validation', async (c) => {
    try {
        const projectId = c.req.query('projectId');
        if (!projectId) {
            return c.json({ success: false, error: 'projectId is required' }, 400);
        }
        const assertions = await tools.getCriticalAssertionsNeedingValidation(projectId);
        return c.json({ success: true, data: assertions });
    }
    catch (error) {
        return c.json({ success: false, error: String(error) }, 500);
    }
});
// ============================================
// TREND DETECTION
// ============================================
/**
 * POST /api/discovery/trends/detect
 * Run trend detection on recent discoveries
 */
exports.discoveryApi.post('/trends/detect', async (c) => {
    try {
        const body = await c.req.json();
        const trends = await tools.detectTrends(body.projectId, {
            windowDays: body.windowDays,
            minMentions: body.minMentions,
            minSources: body.minSources,
        });
        return c.json({ success: true, data: trends });
    }
    catch (error) {
        return c.json({ success: false, error: String(error) }, 500);
    }
});
/**
 * GET /api/discovery/trends
 * List detected trends
 */
exports.discoveryApi.get('/trends', async (c) => {
    try {
        const projectId = c.req.query('projectId');
        if (!projectId) {
            return c.json({ success: false, error: 'projectId is required' }, 400);
        }
        const trends = await tools.listTrends(projectId, {
            minScore: parseFloat(c.req.query('minScore') || '0'),
            category: c.req.query('category'),
            emerging: c.req.query('emerging') === 'true',
            limit: parseInt(c.req.query('limit') || '20'),
        });
        return c.json({ success: true, data: trends });
    }
    catch (error) {
        return c.json({ success: false, error: String(error) }, 500);
    }
});
/**
 * GET /api/discovery/trends/:id
 * Get trend details with related entities
 */
exports.discoveryApi.get('/trends/:id', async (c) => {
    try {
        const trendId = c.req.param('id');
        const details = await tools.getTrendDetails(trendId);
        return c.json({ success: true, data: details });
    }
    catch (error) {
        return c.json({ success: false, error: String(error) }, 500);
    }
});
/**
 * GET /api/discovery/trends/report
 * Generate trend report
 */
exports.discoveryApi.get('/trends/report', async (c) => {
    try {
        const projectId = c.req.query('projectId');
        if (!projectId) {
            return c.json({ success: false, error: 'projectId is required' }, 400);
        }
        const report = await tools.generateTrendReport(projectId);
        return c.json({ success: true, data: report });
    }
    catch (error) {
        return c.json({ success: false, error: String(error) }, 500);
    }
});
/**
 * GET /api/discovery/trends/entities
 * Get trending entities
 */
exports.discoveryApi.get('/trends/entities', async (c) => {
    try {
        const projectId = c.req.query('projectId');
        if (!projectId) {
            return c.json({ success: false, error: 'projectId is required' }, 400);
        }
        const limit = parseInt(c.req.query('limit') || '10');
        const entities = await tools.getTrendingEntities(projectId, limit);
        return c.json({ success: true, data: entities });
    }
    catch (error) {
        return c.json({ success: false, error: String(error) }, 500);
    }
});
// ============================================
// ENTITY PIPELINE (Ready for Research)
// ============================================
/**
 * GET /api/discovery/entities/new
 * Get newly discovered entities (created from discoveries)
 */
exports.discoveryApi.get('/entities/new', async (c) => {
    try {
        const projectId = c.req.query('projectId');
        const limit = parseInt(c.req.query('limit') || '20');
        const daysBack = parseInt(c.req.query('daysBack') || '7');
        if (!projectId) {
            return c.json({ success: false, error: 'projectId is required' }, 400);
        }
        const cutoff = new Date();
        cutoff.setDate(cutoff.getDate() - daysBack);
        const entities = await tools.prisma.entity.findMany({
            where: {
                projectId,
                createdAt: { gte: cutoff },
            },
            include: {
                assertions: {
                    take: 5,
                    orderBy: { createdAt: 'desc' },
                },
                _count: {
                    select: { assertions: true, extractions: true },
                },
            },
            orderBy: { createdAt: 'desc' },
            take: limit,
        });
        return c.json({ success: true, data: entities });
    }
    catch (error) {
        return c.json({ success: false, error: String(error) }, 500);
    }
});
/**
 * GET /api/discovery/entities/ready-for-research
 * Get entities with minimal research that need deep dive
 */
exports.discoveryApi.get('/entities/ready-for-research', async (c) => {
    try {
        const projectId = c.req.query('projectId');
        const limit = parseInt(c.req.query('limit') || '20');
        if (!projectId) {
            return c.json({ success: false, error: 'projectId is required' }, 400);
        }
        // Get entities with URL but few extractions (need research)
        const entities = await tools.prisma.entity.findMany({
            where: {
                projectId,
                url: { not: null },
            },
            include: {
                _count: {
                    select: { assertions: true, extractions: true },
                },
            },
            orderBy: { createdAt: 'desc' },
        });
        // Filter to entities with < 3 extractions
        const needsResearch = entities
            .filter(e => e._count.extractions < 3)
            .slice(0, limit);
        return c.json({ success: true, data: needsResearch });
    }
    catch (error) {
        return c.json({ success: false, error: String(error) }, 500);
    }
});
//# sourceMappingURL=discovery-api.js.map