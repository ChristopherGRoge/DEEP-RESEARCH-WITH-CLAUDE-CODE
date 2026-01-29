"use strict";
/**
 * RSS Crawler - Extract Tool Mentions from RSS/Atom Feeds
 *
 * Fetches and parses RSS/Atom feeds to discover tools and products mentioned
 * in blog posts, announcements, and other syndicated content.
 *
 * Usage:
 *   npm run cli -- rss:crawl '{"feedUrl": "https://example.com/feed.xml", "sourceId": "...", "projectId": "..."}'
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_AI_KEYWORDS = void 0;
exports.crawlRSSFeed = crawlRSSFeed;
exports.saveDiscoveries = saveDiscoveries;
exports.getCrawlStats = getCrawlStats;
const rss_parser_1 = __importDefault(require("rss-parser"));
const client_1 = require("../../db/client");
// ============================================
// CONSTANTS
// ============================================
exports.DEFAULT_AI_KEYWORDS = [
    'AI', 'ML', 'LLM', 'GPT', 'Claude', 'Copilot', 'generative',
    'machine learning', 'deep learning', 'neural', 'transformer',
    'code generation', 'code assistant', 'agent', 'RAG', 'vector',
    'embedding', 'fine-tune', 'prompt', 'inference', 'model',
    'artificial intelligence', 'chatbot', 'NLP', 'computer vision',
    'reinforcement learning', 'supervised learning', 'unsupervised learning'
];
const DEFAULT_MAX_AGE_DAYS = 30;
const DEFAULT_MAX_ITEMS = 50;
// ============================================
// MAIN CRAWLER
// ============================================
/**
 * Crawl an RSS/Atom feed and extract tool mentions
 */
async function crawlRSSFeed(config) {
    const { feedUrl, sourceId, projectId, maxAgeDays = DEFAULT_MAX_AGE_DAYS, aiKeywords = exports.DEFAULT_AI_KEYWORDS, extractLinks = true, maxItems = DEFAULT_MAX_ITEMS, } = config;
    const crawlSessionId = config.crawlSessionId || generateSessionId();
    const errors = [];
    const discoveries = [];
    let itemsProcessed = 0;
    let itemsFiltered = 0;
    try {
        // Verify source exists
        const source = await client_1.prisma.source.findUnique({ where: { id: sourceId } });
        if (!source) {
            return {
                success: false,
                discoveries: [],
                itemsProcessed: 0,
                itemsFiltered: 0,
                errors: [`Source not found: ${sourceId}`],
            };
        }
        // Verify project exists
        const project = await client_1.prisma.researchProject.findUnique({ where: { id: projectId } });
        if (!project) {
            return {
                success: false,
                discoveries: [],
                itemsProcessed: 0,
                itemsFiltered: 0,
                errors: [`Project not found: ${projectId}`],
            };
        }
        // Initialize RSS parser
        const parser = new rss_parser_1.default({
            timeout: 10000,
            customFields: {
                item: [
                    ['content:encoded', 'contentEncoded'],
                    ['dc:creator', 'creator'],
                ],
            },
        });
        console.error(`Fetching RSS feed: ${feedUrl}`);
        const feed = await parser.parseURL(feedUrl);
        console.error(`Found ${feed.items.length} items in feed: ${feed.title || 'Unknown'}`);
        // Calculate cutoff date
        const cutoffDate = new Date();
        cutoffDate.setDate(cutoffDate.getDate() - maxAgeDays);
        // Process each feed item
        for (const item of feed.items.slice(0, maxItems)) {
            itemsProcessed++;
            // Filter by date
            if (item.pubDate) {
                const pubDate = new Date(item.pubDate);
                if (pubDate < cutoffDate) {
                    itemsFiltered++;
                    continue;
                }
            }
            // Filter by AI keywords
            const fullText = [
                item.title || '',
                item.contentSnippet || '',
                item.content || '',
                item.contentEncoded || '',
            ].join(' ');
            if (!containsAnyKeyword(fullText, aiKeywords)) {
                itemsFiltered++;
                continue;
            }
            try {
                // Extract tool mentions from title and content
                const toolMentions = extractToolMentions(fullText);
                // Extract links if requested
                const links = extractLinks ? extractLinksFromContent(fullText) : [];
                // Extract keywords
                const keywords = extractKeywords(fullText, aiKeywords);
                // Create discoveries for each tool mention
                for (const toolName of toolMentions) {
                    const discovery = {
                        sourceId,
                        projectId,
                        mentionedName: toolName,
                        briefDescription: truncate(item.contentSnippet || item.title || '', 200),
                        discoveryUrl: item.link || feedUrl,
                        contextSnippet: extractContext(fullText, toolName, 300),
                        extractedLinks: links,
                        keywords,
                        discoveredAt: item.pubDate ? new Date(item.pubDate) : new Date(),
                        crawlSessionId,
                        confidence: calculateConfidence(toolName, fullText, keywords),
                    };
                    discoveries.push(discovery);
                }
            }
            catch (err) {
                errors.push(`Error processing item "${item.title}": ${err instanceof Error ? err.message : String(err)}`);
            }
        }
        // Log crawl activity
        await client_1.prisma.researchLog.create({
            data: {
                action: 'rss_crawl',
                details: {
                    feedUrl,
                    sourceId,
                    projectId,
                    crawlSessionId,
                    itemsProcessed,
                    itemsFiltered,
                    discoveriesFound: discoveries.length,
                    feedTitle: feed.title,
                },
            },
        });
        return {
            success: true,
            discoveries,
            itemsProcessed,
            itemsFiltered,
            errors,
            metadata: {
                feedTitle: feed.title,
                feedUrl,
                crawledAt: new Date(),
                crawlSessionId,
            },
        };
    }
    catch (error) {
        const errorMsg = error instanceof Error ? error.message : String(error);
        errors.push(`Failed to crawl feed: ${errorMsg}`);
        return {
            success: false,
            discoveries,
            itemsProcessed,
            itemsFiltered,
            errors,
        };
    }
}
// ============================================
// HELPER FUNCTIONS
// ============================================
/**
 * Extract potential tool names from text
 * Looks for:
 * - Capitalized words/phrases
 * - Words ending in .ai, .io, .dev, .com
 * - Known patterns like "X AI", "AI X", etc.
 */
function extractToolMentions(text) {
    const mentions = new Set();
    // Pattern 1: Words ending in common tech TLDs
    const tldPattern = /\b([A-Z][a-z]+(?:[A-Z][a-z]+)*)\.(?:ai|io|dev|com|app)\b/g;
    let match;
    while ((match = tldPattern.exec(text)) !== null) {
        mentions.add(match[1]);
    }
    // Pattern 2: Capitalized product names (2-3 words max)
    const productPattern = /\b([A-Z][a-z]+(?:\s+[A-Z][a-z]+){0,2})\s+(?:AI|ML|Agent|Assistant|Copilot|SDK|API|Platform|Tool|Service)\b/g;
    while ((match = productPattern.exec(text)) !== null) {
        const name = match[1].trim();
        if (name.split(/\s+/).length <= 3) {
            mentions.add(name);
        }
    }
    // Pattern 3: AI/ML prefix patterns
    const prefixPattern = /\b(?:AI|ML|GPT)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)\b/g;
    while ((match = prefixPattern.exec(text)) !== null) {
        mentions.add(match[0].trim());
    }
    // Pattern 4: Known product name patterns (CamelCase)
    const camelPattern = /\b([A-Z][a-z]+[A-Z][a-z]+(?:[A-Z][a-z]+)?)\b/g;
    while ((match = camelPattern.exec(text)) !== null) {
        const name = match[1];
        // Only include if it appears near AI keywords
        if (isNearAIKeyword(text, match.index, 100)) {
            mentions.add(name);
        }
    }
    // Pattern 5: Quoted product names
    const quotedPattern = /"([A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)"/g;
    while ((match = quotedPattern.exec(text)) !== null) {
        mentions.add(match[1]);
    }
    // Filter out common false positives
    const filtered = Array.from(mentions).filter(name => {
        const lower = name.toLowerCase();
        return !['The', 'This', 'That', 'These', 'Those', 'They', 'We', 'Our', 'New', 'First', 'Last', 'Next'].includes(name) &&
            name.length >= 3 &&
            name.length <= 50;
    });
    return filtered;
}
/**
 * Extract keywords from text based on provided keyword list
 */
function extractKeywords(text, keywordList) {
    const found = new Set();
    const lowerText = text.toLowerCase();
    for (const keyword of keywordList) {
        if (lowerText.includes(keyword.toLowerCase())) {
            found.add(keyword);
        }
    }
    return Array.from(found);
}
/**
 * Extract URLs from content
 */
function extractLinksFromContent(text) {
    const urlPattern = /https?:\/\/[^\s<>"{}|\\^`\[\]]+/g;
    const matches = text.match(urlPattern) || [];
    return [...new Set(matches)]; // Deduplicate
}
/**
 * Extract context around a mention
 */
function extractContext(text, mention, maxLength) {
    const index = text.indexOf(mention);
    if (index === -1)
        return truncate(text, maxLength);
    const start = Math.max(0, index - Math.floor(maxLength / 2));
    const end = Math.min(text.length, index + mention.length + Math.floor(maxLength / 2));
    let context = text.substring(start, end);
    if (start > 0)
        context = '...' + context;
    if (end < text.length)
        context = context + '...';
    return context;
}
/**
 * Check if text contains any of the keywords
 */
function containsAnyKeyword(text, keywords) {
    const lowerText = text.toLowerCase();
    return keywords.some(keyword => lowerText.includes(keyword.toLowerCase()));
}
/**
 * Check if a position in text is near any AI keyword
 */
function isNearAIKeyword(text, position, distance) {
    const start = Math.max(0, position - distance);
    const end = Math.min(text.length, position + distance);
    const snippet = text.substring(start, end).toLowerCase();
    return exports.DEFAULT_AI_KEYWORDS.some(keyword => snippet.includes(keyword.toLowerCase()));
}
/**
 * Calculate confidence score for a discovery
 */
function calculateConfidence(toolName, fullText, keywords) {
    let score = 0.5; // Base score
    // Higher confidence if tool name appears multiple times
    const occurrences = (fullText.match(new RegExp(toolName, 'g')) || []).length;
    score += Math.min(occurrences * 0.05, 0.2);
    // Higher confidence if many AI keywords present
    score += Math.min(keywords.length * 0.02, 0.2);
    // Higher confidence if tool name has common tech TLD
    if (/\.(?:ai|io|dev)/.test(toolName)) {
        score += 0.1;
    }
    return Math.min(score, 1.0);
}
/**
 * Truncate text to max length
 */
function truncate(text, maxLength) {
    if (text.length <= maxLength)
        return text;
    return text.substring(0, maxLength - 3) + '...';
}
/**
 * Generate a unique session ID
 */
function generateSessionId() {
    return `rss-${Date.now()}-${Math.random().toString(36).substring(7)}`;
}
// ============================================
// PERSISTENCE HELPERS
// ============================================
/**
 * Save discoveries to database as entities or assertions
 */
async function saveDiscoveries(discoveries) {
    let entitiesCreated = 0;
    let assertionsCreated = 0;
    const errors = [];
    for (const discovery of discoveries) {
        try {
            // Check if entity already exists
            const existingEntity = await client_1.prisma.entity.findFirst({
                where: {
                    projectId: discovery.projectId,
                    name: {
                        equals: discovery.mentionedName,
                    },
                },
            });
            let entity;
            if (existingEntity) {
                entity = existingEntity;
            }
            else {
                // Create new entity
                entity = await client_1.prisma.entity.create({
                    data: {
                        projectId: discovery.projectId,
                        name: discovery.mentionedName,
                        description: discovery.briefDescription,
                        entityType: 'tool', // Assume tool for RSS discoveries
                    },
                });
                entitiesCreated++;
            }
            // Create assertion for the discovery
            const assertion = await client_1.prisma.assertion.create({
                data: {
                    entityId: entity.id,
                    claim: `Mentioned in: ${discovery.discoveryUrl}`,
                    category: 'discovery',
                    confidence: discovery.confidence,
                    discoverySourceId: discovery.sourceId,
                    firstDiscoveredAt: discovery.discoveredAt,
                },
            });
            assertionsCreated++;
            // Link to source
            if (discovery.sourceId) {
                await client_1.prisma.assertionSource.create({
                    data: {
                        assertionId: assertion.id,
                        sourceId: discovery.sourceId,
                        quote: discovery.contextSnippet,
                        addedBy: null, // null indicates agent-added
                    },
                });
            }
            // Log activity
            await client_1.prisma.researchLog.create({
                data: {
                    action: 'rss_discovery',
                    details: {
                        entityId: entity.id,
                        entityName: entity.name,
                        assertionId: assertion.id,
                        crawlSessionId: discovery.crawlSessionId,
                        discoveryUrl: discovery.discoveryUrl,
                    },
                },
            });
        }
        catch (err) {
            errors.push(`Error saving discovery "${discovery.mentionedName}": ${err instanceof Error ? err.message : String(err)}`);
        }
    }
    return { entitiesCreated, assertionsCreated, errors };
}
/**
 * Get crawl statistics for a project
 */
async function getCrawlStats(projectId) {
    // Fetch logs and filter by projectId in JavaScript (SQLite doesn't support JSON path queries)
    const allLogs = await client_1.prisma.researchLog.findMany({
        where: {
            action: 'rss_crawl',
        },
        orderBy: { createdAt: 'desc' },
        take: 100, // Fetch more and filter
    });
    const logs = allLogs
        .filter(log => log.details?.projectId === projectId)
        .slice(0, 10);
    const crawlSessions = logs.map(log => ({
        sessionId: log.details.crawlSessionId,
        crawledAt: log.createdAt,
        itemsProcessed: log.details.itemsProcessed || 0,
        discoveriesFound: log.details.discoveriesFound || 0,
    }));
    const totalDiscoveries = crawlSessions.reduce((sum, session) => sum + session.discoveriesFound, 0);
    return {
        totalCrawls: logs.length,
        totalDiscoveries,
        lastCrawlDate: logs[0]?.createdAt,
        crawlSessions,
    };
}
//# sourceMappingURL=rss-crawler.js.map