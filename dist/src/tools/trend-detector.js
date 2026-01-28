"use strict";
// Trend Detection for discovering patterns across discoveries
// Analyzes entity discoveries, assertions, and extractions to identify emerging trends
Object.defineProperty(exports, "__esModule", { value: true });
exports.detectTrends = detectTrends;
exports.saveTrend = saveTrend;
exports.updateTrendMetrics = updateTrendMetrics;
exports.listTrends = listTrends;
exports.getTrendDetails = getTrendDetails;
exports.getTrendingEntities = getTrendingEntities;
exports.generateTrendReport = generateTrendReport;
exports.exportTrendsMarkdown = exportTrendsMarkdown;
const client_1 = require("../db/client");
// ============================================
// Keyword Categories
// ============================================
const TREND_CATEGORIES = {
    code_generation: ['code gen', 'code generation', 'code completion', 'autocomplete', 'copilot', 'ai coding', 'coding assistant'],
    code_review: ['code review', 'pull request', 'pr review', 'static analysis', 'code quality'],
    testing: ['testing', 'test generation', 'qa', 'quality assurance', 'test automation', 'unit test'],
    agents: ['agent', 'agentic', 'autonomous', 'multi-agent', 'ai agent', 'agent framework'],
    rag: ['rag', 'retrieval', 'knowledge base', 'vector', 'embedding', 'semantic search'],
    fine_tuning: ['fine-tune', 'fine tuning', 'training', 'custom model', 'model training'],
    deployment: ['deployment', 'mlops', 'inference', 'serving', 'production', 'hosting'],
    security: ['security', 'vulnerability', 'secure code', 'compliance', 'security scanning'],
    documentation: ['documentation', 'docs', 'readme', 'docstring', 'api docs'],
    devops: ['devops', 'ci/cd', 'pipeline', 'automation', 'infrastructure'],
    collaboration: ['team', 'collaboration', 'sharing', 'workspace', 'organization'],
    ide: ['ide', 'editor', 'vscode', 'jetbrains', 'intellij', 'cursor'],
    local_first: ['local', 'offline', 'air-gapped', 'on-premise', 'self-hosted'],
    open_source: ['open source', 'oss', 'github', 'open model', 'community'],
    enterprise: ['enterprise', 'sso', 'saml', 'rbac', 'audit log', 'governance']
};
// ============================================
// Trend Detection
// ============================================
/**
 * Detect trends from recent discoveries and assertions
 */
async function detectTrends(projectId, options) {
    const windowDays = options?.windowDays ?? 7;
    const minMentions = options?.minMentions ?? 3;
    const minSources = options?.minSources ?? 2;
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - windowDays);
    // 1. Fetch recent discoveries
    const discoveries = await client_1.prisma.rawDiscovery.findMany({
        where: {
            discoveredAt: { gte: cutoffDate },
            matchedEntityId: { not: null }
        },
        include: {
            source: true
        }
    });
    // 2. Fetch recent assertions with discovery provenance
    const assertions = await client_1.prisma.assertion.findMany({
        where: {
            entity: { projectId },
            firstDiscoveredAt: { gte: cutoffDate }
        },
        include: {
            entity: true
        }
    });
    // 3. Cluster by category and keywords
    const categoryCandidates = clusterByCategory(discoveries, assertions);
    const keywordCandidates = clusterByKeywords(discoveries, 3);
    // 4. Merge and deduplicate candidates
    const allCandidates = new Map();
    const allEntries = [
        ...Array.from(categoryCandidates.entries()),
        ...Array.from(keywordCandidates.entries())
    ];
    for (const [key, candidate] of allEntries) {
        if (!allCandidates.has(key)) {
            allCandidates.set(key, candidate);
        }
        else {
            // Merge candidates
            const existing = allCandidates.get(key);
            existing.entityIds = Array.from(new Set([...existing.entityIds, ...candidate.entityIds]));
            existing.keywords = Array.from(new Set([...existing.keywords, ...candidate.keywords]));
            existing.mentionCount += candidate.mentionCount;
            existing.sourceSpread = Math.max(existing.sourceSpread, candidate.sourceSpread);
        }
    }
    // 5. Calculate metrics and score trends
    const detectedTrends = [];
    for (const [key, candidate] of Array.from(allCandidates.entries())) {
        // Filter by minimum thresholds
        if (candidate.mentionCount < minMentions || candidate.sourceSpread < minSources) {
            continue;
        }
        // Calculate metrics
        const velocity = await calculateVelocity(candidate, windowDays);
        const previousMentions = Math.max(1, candidate.mentionCount - velocity * (windowDays / 7));
        const growthRate = calculateGrowthRate(candidate.mentionCount, previousMentions);
        const metrics = {
            velocity,
            sourceSpread: candidate.sourceSpread,
            entityCount: candidate.entityIds.length,
            mentionCount: candidate.mentionCount,
            growthRate
        };
        // Calculate scores
        const trendScore = calculateTrendScore(metrics);
        const emergingScore = calculateEmergingScore(metrics, candidate.firstSeen);
        // Generate description
        const description = generateTrendDescription(candidate, metrics);
        // Check if trend is new
        const existingTrend = await client_1.prisma.discoveryTrend.findFirst({
            where: {
                projectId,
                name: candidate.name
            }
        });
        detectedTrends.push({
            name: candidate.name,
            description,
            category: candidate.category,
            keywords: candidate.keywords,
            entityIds: candidate.entityIds,
            metrics,
            trendScore,
            emergingScore,
            isNew: !existingTrend
        });
    }
    // 6. Save/update trends in database
    for (const trend of detectedTrends) {
        await saveTrend(projectId, trend);
    }
    // Sort by trend score
    return detectedTrends.sort((a, b) => b.trendScore - a.trendScore);
}
/**
 * Cluster discoveries by category using TREND_CATEGORIES
 */
function clusterByCategory(discoveries, assertions) {
    const clusters = new Map();
    // Process discoveries
    for (const discovery of discoveries) {
        const text = [
            discovery.mentionedName,
            discovery.briefDescription,
            discovery.contextSnippet,
            ...discovery.keywords
        ].join(' ').toLowerCase();
        for (const [category, keywords] of Object.entries(TREND_CATEGORIES)) {
            const matches = keywords.filter(keyword => text.includes(keyword));
            if (matches.length > 0) {
                if (!clusters.has(category)) {
                    clusters.set(category, {
                        name: formatCategoryName(category),
                        category,
                        keywords: [...keywords],
                        entityIds: [],
                        mentionCount: 0,
                        sourceSpread: 0,
                        firstSeen: discovery.discoveredAt,
                        lastSeen: discovery.discoveredAt
                    });
                }
                const cluster = clusters.get(category);
                if (discovery.matchedEntityId) {
                    cluster.entityIds.push(discovery.matchedEntityId);
                }
                cluster.mentionCount++;
                cluster.lastSeen = discovery.discoveredAt;
            }
        }
    }
    // Process assertions
    for (const assertion of assertions) {
        const text = [
            assertion.claim,
            assertion.category,
            assertion.entity.name,
            assertion.entity.description
        ].join(' ').toLowerCase();
        for (const [category, keywords] of Object.entries(TREND_CATEGORIES)) {
            const matches = keywords.filter(keyword => text.includes(keyword));
            if (matches.length > 0) {
                if (!clusters.has(category)) {
                    clusters.set(category, {
                        name: formatCategoryName(category),
                        category,
                        keywords: [...keywords],
                        entityIds: [],
                        mentionCount: 0,
                        sourceSpread: 0,
                        firstSeen: assertion.firstDiscoveredAt || assertion.createdAt,
                        lastSeen: assertion.firstDiscoveredAt || assertion.createdAt
                    });
                }
                const cluster = clusters.get(category);
                cluster.entityIds.push(assertion.entityId);
                cluster.mentionCount++;
                cluster.lastSeen = assertion.firstDiscoveredAt || assertion.createdAt;
            }
        }
    }
    // Calculate source spread and deduplicate entity IDs
    for (const [key, cluster] of Array.from(clusters.entries())) {
        cluster.entityIds = Array.from(new Set(cluster.entityIds));
        cluster.sourceSpread = Math.min(cluster.entityIds.length, cluster.mentionCount);
    }
    return clusters;
}
/**
 * Cluster by shared keywords
 */
function clusterByKeywords(discoveries, minOverlap = 3) {
    const clusters = new Map();
    // Build keyword co-occurrence matrix
    const keywordEntities = new Map();
    for (const discovery of discoveries) {
        if (!discovery.matchedEntityId)
            continue;
        for (const keyword of discovery.keywords) {
            const normalized = keyword.toLowerCase().trim();
            if (normalized.length < 3)
                continue; // Skip short keywords
            if (!keywordEntities.has(normalized)) {
                keywordEntities.set(normalized, new Set());
            }
            keywordEntities.get(normalized).add(discovery.matchedEntityId);
        }
    }
    // Find keywords that appear across multiple entities
    for (const [keyword, entities] of Array.from(keywordEntities.entries())) {
        if (entities.size >= minOverlap) {
            const entityIds = Array.from(entities);
            clusters.set(keyword, {
                name: formatKeywordName(keyword),
                category: 'keyword_cluster',
                keywords: [keyword],
                entityIds,
                mentionCount: entities.size,
                sourceSpread: entities.size,
                firstSeen: new Date(), // Will be updated from discoveries
                lastSeen: new Date()
            });
        }
    }
    return clusters;
}
// ============================================
// Metrics Calculation
// ============================================
/**
 * Calculate velocity (mentions per week, trending direction)
 */
async function calculateVelocity(candidate, windowDays) {
    // Approximate velocity based on mention count over window
    const weeksInWindow = windowDays / 7;
    const mentionsPerWeek = candidate.mentionCount / weeksInWindow;
    // Simple velocity estimate
    return mentionsPerWeek;
}
/**
 * Calculate source spread (unique sources mentioning the trend)
 */
function calculateSourceSpread(discoveries) {
    const uniqueSources = new Set(discoveries.map(d => d.sourceId));
    return uniqueSources.size;
}
/**
 * Calculate growth rate
 */
function calculateGrowthRate(currentMentions, previousMentions) {
    if (previousMentions === 0)
        return 1.0; // 100% growth from zero
    return (currentMentions - previousMentions) / previousMentions;
}
// ============================================
// Scoring
// ============================================
/**
 * Calculate overall trend score
 * Weight: velocity (0.3), sourceSpread (0.25), entityCount (0.25), growthRate (0.2)
 */
function calculateTrendScore(metrics) {
    const velocityScore = Math.min(metrics.velocity / 10, 1.0); // Normalize to 0-1
    const spreadScore = Math.min(metrics.sourceSpread / 10, 1.0);
    const entityScore = Math.min(metrics.entityCount / 10, 1.0);
    const growthScore = Math.min(Math.max(metrics.growthRate, 0) / 2, 1.0); // Cap at 200% growth
    return (velocityScore * 0.3 +
        spreadScore * 0.25 +
        entityScore * 0.25 +
        growthScore * 0.2);
}
/**
 * Calculate emerging score (how new and rapidly growing)
 */
function calculateEmergingScore(metrics, firstSeen) {
    const daysSinceFirstSeen = (Date.now() - firstSeen.getTime()) / (1000 * 60 * 60 * 24);
    // Higher score for newer trends (< 7 days)
    const newnessFactor = daysSinceFirstSeen <= 7 ? 1.0 : Math.max(0, 1.0 - (daysSinceFirstSeen - 7) / 30);
    // Higher score for high velocity
    const velocityFactor = Math.min(metrics.velocity / 5, 1.0);
    // Higher score for positive growth
    const growthFactor = Math.min(Math.max(metrics.growthRate, 0), 1.0);
    return (newnessFactor * 0.4 +
        velocityFactor * 0.3 +
        growthFactor * 0.3);
}
// ============================================
// Persistence
// ============================================
/**
 * Save or update a trend
 */
async function saveTrend(projectId, trend) {
    const existing = await client_1.prisma.discoveryTrend.findFirst({
        where: {
            projectId,
            name: trend.name
        }
    });
    const now = new Date();
    if (existing) {
        // Update existing trend
        await client_1.prisma.discoveryTrend.update({
            where: { id: existing.id },
            data: {
                description: trend.description,
                category: trend.category,
                keywords: trend.keywords,
                entityIds: trend.entityIds,
                mentionCount: trend.metrics.mentionCount,
                entityCount: trend.metrics.entityCount,
                sourceSpread: trend.metrics.sourceSpread,
                velocity: trend.metrics.velocity,
                lastSeenAt: now,
                trendScore: trend.trendScore,
                emergingScore: trend.emergingScore,
                updatedAt: now
            }
        });
        return existing.id;
    }
    else {
        // Create new trend
        const created = await client_1.prisma.discoveryTrend.create({
            data: {
                projectId,
                name: trend.name,
                description: trend.description,
                category: trend.category,
                keywords: trend.keywords,
                entityIds: trend.entityIds,
                mentionCount: trend.metrics.mentionCount,
                entityCount: trend.metrics.entityCount,
                sourceSpread: trend.metrics.sourceSpread,
                velocity: trend.metrics.velocity,
                firstSeenAt: now,
                lastSeenAt: now,
                trendScore: trend.trendScore,
                emergingScore: trend.emergingScore
            }
        });
        return created.id;
    }
}
/**
 * Update trend with new metrics
 */
async function updateTrendMetrics(trendId, metrics) {
    await client_1.prisma.discoveryTrend.update({
        where: { id: trendId },
        data: {
            mentionCount: metrics.mentionCount,
            entityCount: metrics.entityCount,
            sourceSpread: metrics.sourceSpread,
            velocity: metrics.velocity,
            lastSeenAt: new Date(),
            trendScore: calculateTrendScore(metrics)
        }
    });
}
// ============================================
// Query Functions
// ============================================
/**
 * List trends for a project
 */
async function listTrends(projectId, options) {
    const where = { projectId };
    if (options?.minScore) {
        where.trendScore = { gte: options.minScore };
    }
    if (options?.category) {
        where.category = options.category;
    }
    if (options?.emerging) {
        where.emergingScore = { gte: 0.5 };
    }
    return client_1.prisma.discoveryTrend.findMany({
        where,
        orderBy: { trendScore: 'desc' },
        take: options?.limit
    });
}
/**
 * Get trend details with related entities
 */
async function getTrendDetails(trendId) {
    const trend = await client_1.prisma.discoveryTrend.findUnique({
        where: { id: trendId }
    });
    if (!trend) {
        throw new Error(`Trend not found: ${trendId}`);
    }
    const entities = await client_1.prisma.entity.findMany({
        where: {
            id: { in: trend.entityIds }
        },
        include: {
            assertions: {
                where: {
                    OR: [
                        { claim: { contains: trend.name, mode: 'insensitive' } },
                        ...trend.keywords.map(k => ({ claim: { contains: k, mode: 'insensitive' } }))
                    ]
                },
                take: 5,
                orderBy: { createdAt: 'desc' }
            }
        }
    });
    // Get recent discoveries mentioning this trend
    const recentMentions = await client_1.prisma.rawDiscovery.findMany({
        where: {
            matchedEntityId: { in: trend.entityIds },
            OR: [
                { mentionedName: { contains: trend.name, mode: 'insensitive' } },
                ...trend.keywords.map(k => ({ keywords: { has: k } }))
            ]
        },
        orderBy: { discoveredAt: 'desc' },
        take: 10,
        include: {
            source: true
        }
    });
    return { trend, entities, recentMentions };
}
/**
 * Get trending entities (entities in high-scoring trends)
 */
async function getTrendingEntities(projectId, limit = 10) {
    const topTrends = await client_1.prisma.discoveryTrend.findMany({
        where: { projectId },
        orderBy: { trendScore: 'desc' },
        take: 5
    });
    const entityIds = new Set();
    for (const trend of topTrends) {
        trend.entityIds.forEach(id => entityIds.add(id));
    }
    return client_1.prisma.entity.findMany({
        where: {
            id: { in: Array.from(entityIds) }
        },
        include: {
            assertions: {
                take: 3,
                orderBy: { createdAt: 'desc' }
            }
        },
        take: limit
    });
}
// ============================================
// Reports
// ============================================
/**
 * Generate trend report
 */
async function generateTrendReport(projectId) {
    const allTrends = await client_1.prisma.discoveryTrend.findMany({
        where: { projectId },
        orderBy: { trendScore: 'desc' }
    });
    const topTrends = allTrends.slice(0, 5).map(t => convertToDetectedTrend(t));
    const emergingTrends = allTrends
        .filter(t => (t.emergingScore || 0) >= 0.5)
        .slice(0, 5)
        .map(t => convertToDetectedTrend(t));
    // Category breakdown
    const categoryBreakdown = {};
    for (const trend of allTrends) {
        const category = trend.category || 'uncategorized';
        categoryBreakdown[category] = (categoryBreakdown[category] || 0) + 1;
    }
    // Generate summary
    const summary = `
Trend Analysis Report
=====================
Total Trends: ${allTrends.length}
Top Trend: ${topTrends[0]?.name || 'None'} (score: ${topTrends[0]?.trendScore.toFixed(2) || 'N/A'})
Emerging Trends: ${emergingTrends.length}
Categories: ${Object.keys(categoryBreakdown).length}
  `.trim();
    return {
        summary,
        topTrends,
        emergingTrends,
        categoryBreakdown
    };
}
/**
 * Export trends as markdown
 */
async function exportTrendsMarkdown(projectId) {
    const trends = await client_1.prisma.discoveryTrend.findMany({
        where: { projectId },
        orderBy: { trendScore: 'desc' }
    });
    let markdown = '# Trend Analysis\n\n';
    markdown += `Generated: ${new Date().toISOString()}\n\n`;
    markdown += `Total Trends: ${trends.length}\n\n`;
    markdown += '## Top Trends\n\n';
    markdown += '| Trend | Category | Score | Entities | Mentions | Velocity |\n';
    markdown += '|-------|----------|-------|----------|----------|----------|\n';
    for (const trend of trends.slice(0, 10)) {
        markdown += `| ${trend.name} | ${trend.category} | ${(trend.trendScore || 0).toFixed(2)} | ${trend.entityCount} | ${trend.mentionCount} | ${(trend.velocity || 0).toFixed(1)}/wk |\n`;
    }
    markdown += '\n## Emerging Trends\n\n';
    const emerging = trends.filter(t => (t.emergingScore || 0) >= 0.5);
    for (const trend of emerging) {
        markdown += `### ${trend.name}\n\n`;
        markdown += `**Category:** ${trend.category}\n\n`;
        markdown += `**Emerging Score:** ${(trend.emergingScore || 0).toFixed(2)}\n\n`;
        markdown += `**Description:** ${trend.description || 'No description'}\n\n`;
        markdown += `**Keywords:** ${trend.keywords.join(', ')}\n\n`;
        markdown += `**Metrics:**\n`;
        markdown += `- Entities: ${trend.entityCount}\n`;
        markdown += `- Mentions: ${trend.mentionCount}\n`;
        markdown += `- Velocity: ${(trend.velocity || 0).toFixed(1)} mentions/week\n\n`;
    }
    return markdown;
}
// ============================================
// Helper Functions
// ============================================
function formatCategoryName(category) {
    return category
        .split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}
function formatKeywordName(keyword) {
    return keyword
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}
function generateTrendDescription(candidate, metrics) {
    const entitiesPhrase = metrics.entityCount === 1 ? '1 entity' : `${metrics.entityCount} entities`;
    const mentionsPhrase = metrics.mentionCount === 1 ? '1 mention' : `${metrics.mentionCount} mentions`;
    const growthPhrase = metrics.growthRate > 0
        ? `growing at ${(metrics.growthRate * 100).toFixed(0)}%`
        : 'stable';
    return `${candidate.name} trend observed across ${entitiesPhrase} with ${mentionsPhrase}, ${growthPhrase}`;
}
function convertToDetectedTrend(dbTrend) {
    return {
        name: dbTrend.name,
        description: dbTrend.description || '',
        category: dbTrend.category || 'uncategorized',
        keywords: dbTrend.keywords || [],
        entityIds: dbTrend.entityIds || [],
        metrics: {
            velocity: dbTrend.velocity || 0,
            sourceSpread: dbTrend.sourceSpread || 0,
            entityCount: dbTrend.entityCount || 0,
            mentionCount: dbTrend.mentionCount || 0,
            growthRate: 0 // Not stored in DB
        },
        trendScore: dbTrend.trendScore || 0,
        emergingScore: dbTrend.emergingScore || 0,
        isNew: false
    };
}
//# sourceMappingURL=trend-detector.js.map