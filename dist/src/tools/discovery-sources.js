"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDiscoverySource = createDiscoverySource;
exports.getDiscoverySource = getDiscoverySource;
exports.updateDiscoverySource = updateDiscoverySource;
exports.deleteDiscoverySource = deleteDiscoverySource;
exports.listDiscoverySources = listDiscoverySources;
exports.getDiscoverySourcesByType = getDiscoverySourcesByType;
exports.getStaleSources = getStaleSources;
exports.getSourceStats = getSourceStats;
exports.markSourceCrawled = markSourceCrawled;
exports.updateSourceMetrics = updateSourceMetrics;
exports.seedDefaultSources = seedDefaultSources;
const client_1 = __importDefault(require("../db/client"));
const client_2 = require("../../generated/prisma/client");
// CRUD Operations
/**
 * Create a new discovery source
 */
async function createDiscoverySource(input) {
    const source = await client_1.default.discoverySource.create({
        data: {
            name: input.name,
            url: input.url,
            sourceType: input.sourceType,
            category: input.category,
            crawlStrategy: input.crawlStrategy,
            crawlFrequency: input.crawlFrequency,
            feedUrl: input.feedUrl,
            apiEndpoint: input.apiEndpoint,
            description: input.description,
            tags: input.tags || [],
            priority: input.priority || 50,
            crawlDepth: input.crawlDepth || 1,
            selectors: input.selectors,
            isActive: true,
            consecutiveErrors: 0,
            discoveriesCount: 0,
            validatedCount: 0,
        },
    });
    await client_1.default.researchLog.create({
        data: {
            action: 'discovery_source_created',
            details: { sourceId: source.id, name: source.name, sourceType: source.sourceType },
        },
    });
    return source;
}
/**
 * Get a discovery source by ID with statistics
 */
async function getDiscoverySource(sourceId) {
    return client_1.default.discoverySource.findUnique({
        where: { id: sourceId },
        include: {
            _count: {
                select: { discoveries: true },
            },
        },
    });
}
/**
 * Update a discovery source
 */
async function updateDiscoverySource(sourceId, updates) {
    const source = await client_1.default.discoverySource.update({
        where: { id: sourceId },
        data: updates,
    });
    await client_1.default.researchLog.create({
        data: {
            action: 'discovery_source_updated',
            details: { sourceId: source.id, changes: JSON.parse(JSON.stringify(updates)) },
        },
    });
    return source;
}
/**
 * Delete a discovery source
 */
async function deleteDiscoverySource(sourceId) {
    await client_1.default.researchLog.create({
        data: {
            action: 'discovery_source_deleted',
            details: { sourceId },
        },
    });
    return client_1.default.discoverySource.delete({
        where: { id: sourceId },
    });
}
/**
 * List discovery sources with optional filters
 */
async function listDiscoverySources(filters) {
    const where = {};
    if (filters?.sourceType)
        where.sourceType = filters.sourceType;
    if (filters?.isActive !== undefined)
        where.isActive = filters.isActive;
    if (filters?.category)
        where.category = filters.category;
    return client_1.default.discoverySource.findMany({
        where,
        include: {
            _count: {
                select: { discoveries: true },
            },
        },
        orderBy: [
            { priority: 'desc' },
            { name: 'asc' },
        ],
    });
}
// Query Operations
/**
 * Get discovery sources by type
 */
async function getDiscoverySourcesByType(sourceType) {
    return client_1.default.discoverySource.findMany({
        where: { sourceType },
        include: {
            _count: {
                select: { discoveries: true },
            },
        },
        orderBy: { priority: 'desc' },
    });
}
/**
 * Get sources that haven't been crawled recently (stale)
 */
async function getStaleSources(maxAgeHours) {
    const cutoffTime = new Date(Date.now() - maxAgeHours * 60 * 60 * 1000);
    return client_1.default.discoverySource.findMany({
        where: {
            isActive: true,
            OR: [
                { lastCrawledAt: null },
                { lastCrawledAt: { lt: cutoffTime } },
            ],
        },
        orderBy: { priority: 'desc' },
    });
}
/**
 * Get statistics across all sources
 */
async function getSourceStats() {
    const allSources = await client_1.default.discoverySource.findMany({
        include: {
            _count: {
                select: { discoveries: true },
            },
        },
    });
    const totalSources = allSources.length;
    const activeSources = allSources.filter(s => s.isActive).length;
    const totalDiscoveries = allSources.reduce((sum, s) => sum + s.discoveriesCount, 0);
    const totalValidated = allSources.reduce((sum, s) => sum + s.validatedCount, 0);
    // Group by category
    const byCategory = allSources.reduce((acc, source) => {
        if (!acc[source.category]) {
            acc[source.category] = {
                count: 0,
                active: 0,
                discoveries: 0,
            };
        }
        acc[source.category].count++;
        if (source.isActive)
            acc[source.category].active++;
        acc[source.category].discoveries += source.discoveriesCount;
        return acc;
    }, {});
    // Top performing sources
    const topSources = allSources
        .filter(s => s.discoveriesCount > 0)
        .sort((a, b) => (b.hitRate || 0) - (a.hitRate || 0))
        .slice(0, 10)
        .map(s => ({
        name: s.name,
        discoveries: s.discoveriesCount,
        validated: s.validatedCount,
        hitRate: s.hitRate,
    }));
    return {
        totalSources,
        activeSources,
        inactiveSources: totalSources - activeSources,
        totalDiscoveries,
        totalValidated,
        overallHitRate: totalDiscoveries > 0 ? totalValidated / totalDiscoveries : 0,
        byCategory,
        topSources,
    };
}
// Source Health
/**
 * Mark a source as crawled with success/failure status
 */
async function markSourceCrawled(sourceId, success, error) {
    const updateData = {
        lastCrawledAt: new Date(),
    };
    if (success) {
        updateData.lastSuccessAt = new Date();
        updateData.consecutiveErrors = 0;
        updateData.lastError = null;
    }
    else {
        updateData.lastError = error || 'Unknown error';
        updateData.consecutiveErrors = { increment: 1 };
    }
    const source = await client_1.default.discoverySource.update({
        where: { id: sourceId },
        data: updateData,
    });
    // Auto-disable source after 5 consecutive errors
    if (source.consecutiveErrors >= 5 && source.isActive) {
        await client_1.default.discoverySource.update({
            where: { id: sourceId },
            data: { isActive: false },
        });
        await client_1.default.researchLog.create({
            data: {
                action: 'discovery_source_auto_disabled',
                details: {
                    sourceId: source.id,
                    name: source.name,
                    reason: 'Too many consecutive errors',
                    consecutiveErrors: source.consecutiveErrors,
                },
            },
        });
    }
    return source;
}
/**
 * Update source metrics (discoveries, validation rate)
 */
async function updateSourceMetrics(sourceId, metrics) {
    const updateData = {};
    if (metrics.discoveriesCount !== undefined) {
        updateData.discoveriesCount = { increment: metrics.discoveriesCount };
    }
    if (metrics.validatedCount !== undefined) {
        updateData.validatedCount = { increment: metrics.validatedCount };
    }
    const source = await client_1.default.discoverySource.update({
        where: { id: sourceId },
        data: updateData,
    });
    // Recalculate hit rate
    if (source.discoveriesCount > 0) {
        const hitRate = source.validatedCount / source.discoveriesCount;
        await client_1.default.discoverySource.update({
            where: { id: sourceId },
            data: { hitRate },
        });
    }
    return source;
}
// Seed Default Sources
/**
 * Seed all 73 default sources from BESPOKE-DISCOVERY-DESIGN.md
 */
async function seedDefaultSources() {
    const sources = [
        // === BLOGS/NEWS SITES (21 sources) ===
        {
            name: 'KDnuggets',
            url: 'https://www.kdnuggets.com',
            sourceType: client_2.SourceType.BLOG,
            category: 'blogs',
            crawlStrategy: 'rss',
            crawlFrequency: 'daily',
            feedUrl: 'https://www.kdnuggets.com/feed',
            description: 'Leading data science and machine learning resource',
            tags: ['data-science', 'ml', 'ai'],
            priority: 80,
        },
        {
            name: 'Towards Data Science',
            url: 'https://towardsdatascience.com',
            sourceType: client_2.SourceType.BLOG,
            category: 'blogs',
            crawlStrategy: 'rss',
            crawlFrequency: 'daily',
            feedUrl: 'https://towardsdatascience.com/feed',
            description: 'Medium publication for data science articles',
            tags: ['data-science', 'ml', 'ai'],
            priority: 75,
        },
        {
            name: 'MarkTechPost AI',
            url: 'https://www.marktechpost.com/category/technology/artificial-intelligence',
            sourceType: client_2.SourceType.BLOG,
            category: 'blogs',
            crawlStrategy: 'html_scrape',
            crawlFrequency: 'daily',
            description: 'AI and machine learning news and research',
            tags: ['ai', 'ml', 'research'],
            priority: 70,
        },
        {
            name: 'Hugging Face Blog',
            url: 'https://huggingface.co/blog',
            sourceType: client_2.SourceType.BLOG,
            category: 'blogs',
            crawlStrategy: 'rss',
            crawlFrequency: 'daily',
            feedUrl: 'https://huggingface.co/blog/feed.xml',
            description: 'Official Hugging Face blog with model and tool announcements',
            tags: ['ai', 'ml', 'nlp', 'models'],
            priority: 90,
        },
        {
            name: 'OpenAI Blog',
            url: 'https://openai.com/news/research',
            sourceType: client_2.SourceType.BLOG,
            category: 'blogs',
            crawlStrategy: 'rss',
            crawlFrequency: 'daily',
            feedUrl: 'https://openai.com/news/rss.xml',
            description: 'Official OpenAI announcements and research',
            tags: ['ai', 'research', 'gpt', 'openai'],
            priority: 95,
        },
        {
            name: 'BAIR Blog',
            url: 'https://bair.berkeley.edu/blog',
            sourceType: client_2.SourceType.BLOG,
            category: 'blogs',
            crawlStrategy: 'rss',
            crawlFrequency: 'weekly',
            feedUrl: 'https://bair.berkeley.edu/blog/feed.xml',
            description: 'Berkeley AI Research lab blog',
            tags: ['ai', 'research', 'academic'],
            priority: 65,
        },
        {
            name: 'Towards AI',
            url: 'https://towardsai.net',
            sourceType: client_2.SourceType.BLOG,
            category: 'blogs',
            crawlStrategy: 'rss',
            crawlFrequency: 'daily',
            feedUrl: 'https://towardsai.net/feed',
            description: 'AI news, research, and tutorials',
            tags: ['ai', 'ml', 'education'],
            priority: 70,
        },
        {
            name: 'GitHub Blog',
            url: 'https://github.blog',
            sourceType: client_2.SourceType.BLOG,
            category: 'blogs',
            crawlStrategy: 'rss',
            crawlFrequency: 'daily',
            feedUrl: 'https://github.blog/feed',
            description: 'Official GitHub blog with developer tools news',
            tags: ['github', 'devtools', 'ai'],
            priority: 85,
        },
        {
            name: 'Spacelift Blog',
            url: 'https://spacelift.io/blog',
            sourceType: client_2.SourceType.BLOG,
            category: 'blogs',
            crawlStrategy: 'html_scrape',
            crawlFrequency: 'weekly',
            description: 'Infrastructure and DevOps blog',
            tags: ['devops', 'infrastructure', 'iac'],
            priority: 50,
        },
        {
            name: 'Harvard Business Review',
            url: 'https://hbr.org',
            sourceType: client_2.SourceType.BLOG,
            category: 'blogs',
            crawlStrategy: 'rss',
            crawlFrequency: 'weekly',
            feedUrl: 'https://hbr.org/feed',
            description: 'Business and management insights',
            tags: ['business', 'enterprise', 'strategy'],
            priority: 40,
        },
        {
            name: 'Bain Insights',
            url: 'https://www.bain.com/insights',
            sourceType: client_2.SourceType.BLOG,
            category: 'blogs',
            crawlStrategy: 'html_scrape',
            crawlFrequency: 'weekly',
            description: 'Consulting and business insights',
            tags: ['business', 'enterprise', 'strategy'],
            priority: 40,
        },
        {
            name: 'Simon Willison',
            url: 'https://simonwillison.net',
            sourceType: client_2.SourceType.BLOG,
            category: 'blogs',
            crawlStrategy: 'rss',
            crawlFrequency: 'daily',
            feedUrl: 'https://simonwillison.net/atom/everything/',
            description: 'Developer blog covering AI, Python, and data tools',
            tags: ['ai', 'python', 'devtools'],
            priority: 85,
        },
        {
            name: 'Pragmatic Coders',
            url: 'https://pragmaticcoders.com/resources',
            sourceType: client_2.SourceType.BLOG,
            category: 'blogs',
            crawlStrategy: 'html_scrape',
            crawlFrequency: 'weekly',
            description: 'Software development resources',
            tags: ['development', 'devtools'],
            priority: 45,
        },
        {
            name: 'Artjoker Blog',
            url: 'https://artjoker.net/blog',
            sourceType: client_2.SourceType.BLOG,
            category: 'blogs',
            crawlStrategy: 'html_scrape',
            crawlFrequency: 'weekly',
            description: 'Software development and technology blog',
            tags: ['development', 'devtools'],
            priority: 45,
        },
        {
            name: 'Coherent Solutions',
            url: 'https://www.coherentsolutions.com/insights',
            sourceType: client_2.SourceType.BLOG,
            category: 'blogs',
            crawlStrategy: 'html_scrape',
            crawlFrequency: 'weekly',
            description: 'Software engineering insights',
            tags: ['development', 'devtools'],
            priority: 45,
        },
        {
            name: 'Copilot4DevOps',
            url: 'https://copilot4devops.com',
            sourceType: client_2.SourceType.BLOG,
            category: 'blogs',
            crawlStrategy: 'rss',
            crawlFrequency: 'weekly',
            feedUrl: 'https://copilot4devops.com/feed',
            description: 'AI for DevOps and infrastructure',
            tags: ['ai', 'devops', 'copilot'],
            priority: 75,
        },
        {
            name: 'Analytics Vidhya',
            url: 'https://www.analyticsvidhya.com/blog',
            sourceType: client_2.SourceType.BLOG,
            category: 'blogs',
            crawlStrategy: 'rss',
            crawlFrequency: 'daily',
            feedUrl: 'https://www.analyticsvidhya.com/blog/feed/',
            description: 'Data science and analytics community',
            tags: ['data-science', 'ml', 'ai'],
            priority: 70,
        },
        {
            name: 'ML Mastery',
            url: 'https://machinelearningmastery.com',
            sourceType: client_2.SourceType.BLOG,
            category: 'blogs',
            crawlStrategy: 'rss',
            crawlFrequency: 'weekly',
            feedUrl: 'https://machinelearningmastery.com/feed/',
            description: 'Machine learning tutorials and guides',
            tags: ['ml', 'education', 'tutorials'],
            priority: 65,
        },
        {
            name: 'Anthropic Claude Blog',
            url: 'https://www.anthropic.com/news',
            sourceType: client_2.SourceType.BLOG,
            category: 'blogs',
            crawlStrategy: 'rss',
            crawlFrequency: 'daily',
            feedUrl: 'https://www.anthropic.com/rss.xml',
            description: 'Official Anthropic/Claude announcements',
            tags: ['ai', 'anthropic', 'claude', 'llm'],
            priority: 90,
        },
        {
            name: 'Holistic AI',
            url: 'https://www.holisticai.com/blog',
            sourceType: client_2.SourceType.BLOG,
            category: 'blogs',
            crawlStrategy: 'html_scrape',
            crawlFrequency: 'weekly',
            description: 'AI governance and ethics',
            tags: ['ai', 'governance', 'ethics'],
            priority: 55,
        },
        {
            name: 'Data Center Dynamics',
            url: 'https://www.datacenterdynamics.com',
            sourceType: client_2.SourceType.BLOG,
            category: 'blogs',
            crawlStrategy: 'rss',
            crawlFrequency: 'daily',
            feedUrl: 'https://www.datacenterdynamics.com/en/feed/',
            description: 'Data center and infrastructure news',
            tags: ['infrastructure', 'datacenter'],
            priority: 50,
        },
        // === GITHUB SOURCES (9 sources) ===
        {
            name: 'awesome-generative-ai',
            url: 'https://github.com/steven2358/awesome-generative-ai',
            sourceType: client_2.SourceType.GITHUB_LIST,
            category: 'github',
            crawlStrategy: 'github_api',
            crawlFrequency: 'daily',
            description: 'Curated list of generative AI tools and resources',
            tags: ['ai', 'generative', 'tools'],
            priority: 85,
        },
        {
            name: 'awesome-generative-ai-guide',
            url: 'https://github.com/aishwaryanr/awesome-generative-ai-guide',
            sourceType: client_2.SourceType.GITHUB_LIST,
            category: 'github',
            crawlStrategy: 'github_api',
            crawlFrequency: 'daily',
            description: 'Comprehensive guide to generative AI',
            tags: ['ai', 'generative', 'guide'],
            priority: 80,
        },
        {
            name: 'awesome-ai-devtools',
            url: 'https://github.com/jamesmurdza/awesome-ai-devtools',
            sourceType: client_2.SourceType.GITHUB_LIST,
            category: 'github',
            crawlStrategy: 'github_api',
            crawlFrequency: 'daily',
            description: 'AI-powered developer tools',
            tags: ['ai', 'devtools', 'coding'],
            priority: 90,
        },
        {
            name: 'awesome-production-genai',
            url: 'https://github.com/EthicalML/awesome-production-genai',
            sourceType: client_2.SourceType.GITHUB_LIST,
            category: 'github',
            crawlStrategy: 'github_api',
            crawlFrequency: 'weekly',
            description: 'Production-grade generative AI tools',
            tags: ['ai', 'production', 'enterprise'],
            priority: 85,
        },
        {
            name: 'awesome-ai-tools',
            url: 'https://github.com/mahseema/awesome-ai-tools',
            sourceType: client_2.SourceType.GITHUB_LIST,
            category: 'github',
            crawlStrategy: 'github_api',
            crawlFrequency: 'daily',
            description: 'Collection of AI tools and applications',
            tags: ['ai', 'tools'],
            priority: 80,
        },
        {
            name: 'awesome-ai',
            url: 'https://github.com/openbestof/awesome-ai',
            sourceType: client_2.SourceType.GITHUB_LIST,
            category: 'github',
            crawlStrategy: 'github_api',
            crawlFrequency: 'weekly',
            description: 'General awesome AI list',
            tags: ['ai', 'tools'],
            priority: 75,
        },
        {
            name: 'awesome-ai-agents',
            url: 'https://github.com/e2b-dev/awesome-ai-agents',
            sourceType: client_2.SourceType.GITHUB_LIST,
            category: 'github',
            crawlStrategy: 'github_api',
            crawlFrequency: 'daily',
            description: 'AI agent frameworks and tools',
            tags: ['ai', 'agents', 'automation'],
            priority: 85,
        },
        {
            name: 'devops-tools',
            url: 'https://github.com/techiescamp/devops-tools',
            sourceType: client_2.SourceType.GITHUB_LIST,
            category: 'github',
            crawlStrategy: 'github_api',
            crawlFrequency: 'weekly',
            description: 'DevOps tools and resources',
            tags: ['devops', 'tools'],
            priority: 70,
        },
        {
            name: 'GitHub Trending',
            url: 'https://github.com/trending',
            sourceType: client_2.SourceType.GITHUB_TRENDING,
            category: 'github',
            crawlStrategy: 'html_scrape',
            crawlFrequency: 'hourly',
            description: 'Trending repositories on GitHub',
            tags: ['trending', 'github', 'tools'],
            priority: 90,
        },
        // === REDDIT SUBREDDITS (6 sources) - Via JSON API ===
        {
            name: 'r/MachineLearning',
            url: 'https://www.reddit.com/r/MachineLearning',
            sourceType: client_2.SourceType.REDDIT,
            category: 'reddit',
            crawlStrategy: 'json_api',
            crawlFrequency: 'hourly',
            apiEndpoint: 'https://www.reddit.com/r/MachineLearning/hot.json?limit=50',
            description: 'Machine learning research and tools',
            tags: ['ml', 'research', 'tools'],
            priority: 95,
        },
        {
            name: 'r/LocalLLaMA',
            url: 'https://www.reddit.com/r/LocalLLaMA',
            sourceType: client_2.SourceType.REDDIT,
            category: 'reddit',
            crawlStrategy: 'json_api',
            crawlFrequency: 'hourly',
            apiEndpoint: 'https://www.reddit.com/r/LocalLLaMA/hot.json?limit=50',
            description: 'Local and open-source LLM discussion',
            tags: ['llm', 'opensource', 'local'],
            priority: 95,
        },
        {
            name: 'r/ChatGPTCoding',
            url: 'https://www.reddit.com/r/ChatGPTCoding',
            sourceType: client_2.SourceType.REDDIT,
            category: 'reddit',
            crawlStrategy: 'json_api',
            crawlFrequency: 'hourly',
            apiEndpoint: 'https://www.reddit.com/r/ChatGPTCoding/hot.json?limit=50',
            description: 'AI coding assistance discussion',
            tags: ['ai', 'coding', 'chatgpt'],
            priority: 90,
        },
        {
            name: 'r/ArtificialIntelligence',
            url: 'https://www.reddit.com/r/ArtificialIntelligence',
            sourceType: client_2.SourceType.REDDIT,
            category: 'reddit',
            crawlStrategy: 'json_api',
            crawlFrequency: 'daily',
            apiEndpoint: 'https://www.reddit.com/r/ArtificialIntelligence/hot.json?limit=50',
            description: 'General AI discussion',
            tags: ['ai', 'discussion'],
            priority: 75,
        },
        {
            name: 'r/devops',
            url: 'https://www.reddit.com/r/devops',
            sourceType: client_2.SourceType.REDDIT,
            category: 'reddit',
            crawlStrategy: 'json_api',
            crawlFrequency: 'daily',
            apiEndpoint: 'https://www.reddit.com/r/devops/hot.json?limit=50',
            description: 'DevOps practices and tools',
            tags: ['devops', 'tools'],
            priority: 70,
        },
        {
            name: 'r/learnmachinelearning',
            url: 'https://www.reddit.com/r/learnmachinelearning',
            sourceType: client_2.SourceType.REDDIT,
            category: 'reddit',
            crawlStrategy: 'json_api',
            crawlFrequency: 'daily',
            apiEndpoint: 'https://www.reddit.com/r/learnmachinelearning/hot.json?limit=50',
            description: 'ML learning resources and tools',
            tags: ['ml', 'education', 'tools'],
            priority: 65,
        },
        // === X/TWITTER ACCOUNTS (22 sources) - Via Nitter RSS ===
        {
            name: '@karpathy',
            url: 'https://twitter.com/karpathy',
            sourceType: client_2.SourceType.X_ACCOUNT,
            category: 'twitter',
            crawlStrategy: 'nitter_rss',
            crawlFrequency: 'hourly',
            feedUrl: 'https://nitter.net/karpathy/rss',
            description: 'AI researcher, former Tesla/OpenAI',
            tags: ['ai', 'research', 'tools'],
            priority: 95,
        },
        {
            name: '@sama',
            url: 'https://twitter.com/sama',
            sourceType: client_2.SourceType.X_ACCOUNT,
            category: 'twitter',
            crawlStrategy: 'nitter_rss',
            crawlFrequency: 'hourly',
            feedUrl: 'https://nitter.net/sama/rss',
            description: 'OpenAI CEO',
            tags: ['ai', 'openai', 'industry'],
            priority: 90,
        },
        {
            name: '@AndrewYNg',
            url: 'https://twitter.com/AndrewYNg',
            sourceType: client_2.SourceType.X_ACCOUNT,
            category: 'twitter',
            crawlStrategy: 'nitter_rss',
            crawlFrequency: 'daily',
            feedUrl: 'https://nitter.net/AndrewYNg/rss',
            description: 'ML education and AI for Everyone',
            tags: ['ml', 'education', 'ai'],
            priority: 85,
        },
        {
            name: '@demishassabis',
            url: 'https://twitter.com/demishassabis',
            sourceType: client_2.SourceType.X_ACCOUNT,
            category: 'twitter',
            crawlStrategy: 'nitter_rss',
            crawlFrequency: 'daily',
            feedUrl: 'https://nitter.net/demishassabis/rss',
            description: 'DeepMind CEO',
            tags: ['ai', 'deepmind', 'research'],
            priority: 85,
        },
        {
            name: '@ylecun',
            url: 'https://twitter.com/ylecun',
            sourceType: client_2.SourceType.X_ACCOUNT,
            category: 'twitter',
            crawlStrategy: 'nitter_rss',
            crawlFrequency: 'daily',
            feedUrl: 'https://nitter.net/ylecun/rss',
            description: 'Meta AI Chief Scientist',
            tags: ['ai', 'research', 'meta'],
            priority: 85,
        },
        {
            name: '@gdb',
            url: 'https://twitter.com/gdb',
            sourceType: client_2.SourceType.X_ACCOUNT,
            category: 'twitter',
            crawlStrategy: 'nitter_rss',
            crawlFrequency: 'daily',
            feedUrl: 'https://nitter.net/gdb/rss',
            description: 'OpenAI leadership',
            tags: ['ai', 'openai'],
            priority: 80,
        },
        {
            name: '@lexfridman',
            url: 'https://twitter.com/lexfridman',
            sourceType: client_2.SourceType.X_ACCOUNT,
            category: 'twitter',
            crawlStrategy: 'nitter_rss',
            crawlFrequency: 'daily',
            feedUrl: 'https://nitter.net/lexfridman/rss',
            description: 'AI researcher and podcaster',
            tags: ['ai', 'podcast', 'research'],
            priority: 75,
        },
        {
            name: '@svpino',
            url: 'https://twitter.com/svpino',
            sourceType: client_2.SourceType.X_ACCOUNT,
            category: 'twitter',
            crawlStrategy: 'nitter_rss',
            crawlFrequency: 'daily',
            feedUrl: 'https://nitter.net/svpino/rss',
            description: 'ML engineering insights',
            tags: ['ml', 'engineering', 'tools'],
            priority: 80,
        },
        {
            name: '@rohanpaul_ai',
            url: 'https://twitter.com/rohanpaul_ai',
            sourceType: client_2.SourceType.X_ACCOUNT,
            category: 'twitter',
            crawlStrategy: 'nitter_rss',
            crawlFrequency: 'daily',
            feedUrl: 'https://nitter.net/rohanpaul_ai/rss',
            description: 'AI tools and tutorials',
            tags: ['ai', 'tools', 'tutorials'],
            priority: 75,
        },
        {
            name: '@omarsar0',
            url: 'https://twitter.com/omarsar0',
            sourceType: client_2.SourceType.X_ACCOUNT,
            category: 'twitter',
            crawlStrategy: 'nitter_rss',
            crawlFrequency: 'daily',
            feedUrl: 'https://nitter.net/omarsar0/rss',
            description: 'ML papers and tools',
            tags: ['ml', 'papers', 'tools'],
            priority: 75,
        },
        {
            name: '@OpenAI',
            url: 'https://twitter.com/OpenAI',
            sourceType: client_2.SourceType.X_ACCOUNT,
            category: 'twitter',
            crawlStrategy: 'nitter_rss',
            crawlFrequency: 'hourly',
            feedUrl: 'https://nitter.net/OpenAI/rss',
            description: 'Official OpenAI announcements',
            tags: ['ai', 'openai', 'announcements'],
            priority: 95,
        },
        {
            name: '@GoogleDeepMind',
            url: 'https://twitter.com/GoogleDeepMind',
            sourceType: client_2.SourceType.X_ACCOUNT,
            category: 'twitter',
            crawlStrategy: 'nitter_rss',
            crawlFrequency: 'daily',
            feedUrl: 'https://nitter.net/GoogleDeepMind/rss',
            description: 'Google DeepMind research and tools',
            tags: ['ai', 'deepmind', 'research'],
            priority: 90,
        },
        {
            name: '@huggingface',
            url: 'https://twitter.com/huggingface',
            sourceType: client_2.SourceType.X_ACCOUNT,
            category: 'twitter',
            crawlStrategy: 'nitter_rss',
            crawlFrequency: 'hourly',
            feedUrl: 'https://nitter.net/huggingface/rss',
            description: 'Hugging Face models and tools',
            tags: ['ai', 'ml', 'models', 'tools'],
            priority: 95,
        },
        {
            name: '@anthropicAI',
            url: 'https://twitter.com/anthropicAI',
            sourceType: client_2.SourceType.X_ACCOUNT,
            category: 'twitter',
            crawlStrategy: 'nitter_rss',
            crawlFrequency: 'daily',
            feedUrl: 'https://nitter.net/anthropicAI/rss',
            description: 'Anthropic/Claude announcements',
            tags: ['ai', 'anthropic', 'claude'],
            priority: 90,
        },
        {
            name: '@LangChainAI',
            url: 'https://twitter.com/LangChainAI',
            sourceType: client_2.SourceType.X_ACCOUNT,
            category: 'twitter',
            crawlStrategy: 'nitter_rss',
            crawlFrequency: 'daily',
            feedUrl: 'https://nitter.net/LangChainAI/rss',
            description: 'LangChain framework and ecosystem',
            tags: ['ai', 'langchain', 'tools'],
            priority: 85,
        },
        {
            name: '@llaboratories',
            url: 'https://twitter.com/llaboratories',
            sourceType: client_2.SourceType.X_ACCOUNT,
            category: 'twitter',
            crawlStrategy: 'nitter_rss',
            crawlFrequency: 'daily',
            feedUrl: 'https://nitter.net/llaboratories/rss',
            description: 'LLM tools and frameworks',
            tags: ['llm', 'tools'],
            priority: 75,
        },
        {
            name: '@RealGeneKim',
            url: 'https://twitter.com/RealGeneKim',
            sourceType: client_2.SourceType.X_ACCOUNT,
            category: 'twitter',
            crawlStrategy: 'nitter_rss',
            crawlFrequency: 'daily',
            feedUrl: 'https://nitter.net/RealGeneKim/rss',
            description: 'DevOps and AI in software delivery',
            tags: ['devops', 'ai', 'delivery'],
            priority: 70,
        },
        {
            name: '@jezhumble',
            url: 'https://twitter.com/jezhumble',
            sourceType: client_2.SourceType.X_ACCOUNT,
            category: 'twitter',
            crawlStrategy: 'nitter_rss',
            crawlFrequency: 'weekly',
            feedUrl: 'https://nitter.net/jezhumble/rss',
            description: 'Continuous delivery and DevOps',
            tags: ['devops', 'cd'],
            priority: 60,
        },
        {
            name: '@nicolefv',
            url: 'https://twitter.com/nicolefv',
            sourceType: client_2.SourceType.X_ACCOUNT,
            category: 'twitter',
            crawlStrategy: 'nitter_rss',
            crawlFrequency: 'weekly',
            feedUrl: 'https://nitter.net/nicolefv/rss',
            description: 'DevOps research and practices',
            tags: ['devops', 'research'],
            priority: 60,
        },
        {
            name: '@ID_AA_Carmack',
            url: 'https://twitter.com/ID_AA_Carmack',
            sourceType: client_2.SourceType.X_ACCOUNT,
            category: 'twitter',
            crawlStrategy: 'nitter_rss',
            crawlFrequency: 'weekly',
            feedUrl: 'https://nitter.net/ID_AA_Carmack/rss',
            description: 'Tech pioneer, AI commentary',
            tags: ['tech', 'ai'],
            priority: 65,
        },
        {
            name: '@PalantirTech',
            url: 'https://twitter.com/PalantirTech',
            sourceType: client_2.SourceType.X_ACCOUNT,
            category: 'twitter',
            crawlStrategy: 'nitter_rss',
            crawlFrequency: 'weekly',
            feedUrl: 'https://nitter.net/PalantirTech/rss',
            description: 'Enterprise AI and data platforms',
            tags: ['enterprise', 'ai', 'data'],
            priority: 70,
        },
        {
            name: '@kaifulee',
            url: 'https://twitter.com/kaifulee',
            sourceType: client_2.SourceType.X_ACCOUNT,
            category: 'twitter',
            crawlStrategy: 'nitter_rss',
            crawlFrequency: 'weekly',
            feedUrl: 'https://nitter.net/kaifulee/rss',
            description: 'AI industry insights',
            tags: ['ai', 'industry'],
            priority: 70,
        },
        // === NEWSLETTERS (8 sources) ===
        {
            name: 'Import AI',
            url: 'https://importai.substack.com',
            sourceType: client_2.SourceType.NEWSLETTER,
            category: 'newsletters',
            crawlStrategy: 'rss',
            crawlFrequency: 'weekly',
            feedUrl: 'https://importai.substack.com/feed',
            description: 'Weekly AI research and policy newsletter',
            tags: ['ai', 'research', 'policy'],
            priority: 85,
        },
        {
            name: "Ben's Bites",
            url: 'https://bensbites.beehiiv.com',
            sourceType: client_2.SourceType.NEWSLETTER,
            category: 'newsletters',
            crawlStrategy: 'rss',
            crawlFrequency: 'daily',
            feedUrl: 'https://bensbites.beehiiv.com/feed',
            description: 'Daily AI news and tools',
            tags: ['ai', 'news', 'tools'],
            priority: 90,
        },
        {
            name: 'TLDR AI',
            url: 'https://tldr.tech/ai',
            sourceType: client_2.SourceType.NEWSLETTER,
            category: 'newsletters',
            crawlStrategy: 'rss',
            crawlFrequency: 'daily',
            feedUrl: 'https://tldr.tech/ai/rss',
            description: 'Daily AI and ML news digest',
            tags: ['ai', 'ml', 'news'],
            priority: 90,
        },
        {
            name: 'AlphaSignal',
            url: 'https://alphasignal.ai',
            sourceType: client_2.SourceType.NEWSLETTER,
            category: 'newsletters',
            crawlStrategy: 'rss',
            crawlFrequency: 'daily',
            feedUrl: 'https://alphasignal.ai/feed',
            description: 'AI news and insights',
            tags: ['ai', 'news'],
            priority: 80,
        },
        {
            name: 'The Batch',
            url: 'https://www.deeplearning.ai/the-batch',
            sourceType: client_2.SourceType.NEWSLETTER,
            category: 'newsletters',
            crawlStrategy: 'rss',
            crawlFrequency: 'weekly',
            feedUrl: 'https://www.deeplearning.ai/feed/',
            description: 'Andrew Ng\'s AI newsletter',
            tags: ['ai', 'ml', 'education'],
            priority: 85,
        },
        {
            name: 'AI Weekly',
            url: 'https://aiweekly.co',
            sourceType: client_2.SourceType.NEWSLETTER,
            category: 'newsletters',
            crawlStrategy: 'rss',
            crawlFrequency: 'weekly',
            feedUrl: 'https://aiweekly.co/rss',
            description: 'Weekly AI industry roundup',
            tags: ['ai', 'industry'],
            priority: 75,
        },
        {
            name: 'Last Week in AI',
            url: 'https://lastweekinai.com',
            sourceType: client_2.SourceType.NEWSLETTER,
            category: 'newsletters',
            crawlStrategy: 'rss',
            crawlFrequency: 'weekly',
            feedUrl: 'https://lastweekinai.com/feed',
            description: 'Weekly AI news and research',
            tags: ['ai', 'news', 'research'],
            priority: 80,
        },
        {
            name: 'The Gradient',
            url: 'https://thegradient.pub',
            sourceType: client_2.SourceType.NEWSLETTER,
            category: 'newsletters',
            crawlStrategy: 'rss',
            crawlFrequency: 'weekly',
            feedUrl: 'https://thegradient.pub/rss/',
            description: 'AI research and perspectives',
            tags: ['ai', 'research'],
            priority: 75,
        },
        // === AGGREGATORS (3 sources) ===
        {
            name: 'Hacker News',
            url: 'https://news.ycombinator.com',
            sourceType: client_2.SourceType.AGGREGATOR,
            category: 'aggregators',
            crawlStrategy: 'hn_api',
            crawlFrequency: 'hourly',
            apiEndpoint: 'https://hacker-news.firebaseio.com/v0',
            description: 'Tech news and startup discussions',
            tags: ['tech', 'startups', 'ai'],
            priority: 95,
        },
        {
            name: 'Lobsters',
            url: 'https://lobste.rs',
            sourceType: client_2.SourceType.AGGREGATOR,
            category: 'aggregators',
            crawlStrategy: 'rss',
            crawlFrequency: 'daily',
            feedUrl: 'https://lobste.rs/rss',
            description: 'Computing-focused link aggregation',
            tags: ['tech', 'computing'],
            priority: 75,
        },
        {
            name: 'Product Hunt',
            url: 'https://www.producthunt.com',
            sourceType: client_2.SourceType.AGGREGATOR,
            category: 'aggregators',
            crawlStrategy: 'rss',
            crawlFrequency: 'daily',
            feedUrl: 'https://www.producthunt.com/feed',
            description: 'New product launches and tools',
            tags: ['products', 'launches', 'tools'],
            priority: 85,
        },
        // === ACADEMIC SOURCES (2 sources) ===
        {
            name: 'Papers With Code',
            url: 'https://paperswithcode.com',
            sourceType: client_2.SourceType.ACADEMIC,
            category: 'academic',
            crawlStrategy: 'rss',
            crawlFrequency: 'daily',
            feedUrl: 'https://paperswithcode.com/feed',
            description: 'ML research papers with code implementations',
            tags: ['ml', 'research', 'code'],
            priority: 80,
        },
        {
            name: 'ArXiv CS.AI',
            url: 'https://arxiv.org/list/cs.AI/recent',
            sourceType: client_2.SourceType.ACADEMIC,
            category: 'academic',
            crawlStrategy: 'rss',
            crawlFrequency: 'daily',
            feedUrl: 'https://export.arxiv.org/rss/cs.AI',
            description: 'ArXiv AI research papers',
            tags: ['ai', 'research', 'papers'],
            priority: 75,
        },
        // === DEV COMMUNITIES (2 sources) ===
        {
            name: 'Dev.to AI',
            url: 'https://dev.to/t/ai',
            sourceType: client_2.SourceType.DEV_COMMUNITY,
            category: 'dev_communities',
            crawlStrategy: 'rss',
            crawlFrequency: 'daily',
            feedUrl: 'https://dev.to/feed/tag/ai',
            description: 'Dev.to AI-tagged articles',
            tags: ['ai', 'development', 'community'],
            priority: 70,
        },
        {
            name: 'Hashnode AI',
            url: 'https://hashnode.com/n/ai',
            sourceType: client_2.SourceType.DEV_COMMUNITY,
            category: 'dev_communities',
            crawlStrategy: 'rss',
            crawlFrequency: 'daily',
            feedUrl: 'https://hashnode.com/n/ai/rss',
            description: 'Hashnode AI articles',
            tags: ['ai', 'development', 'community'],
            priority: 70,
        },
    ];
    const results = [];
    const errors = [];
    for (const sourceInput of sources) {
        try {
            // Check if source already exists
            const existing = await client_1.default.discoverySource.findFirst({
                where: { name: sourceInput.name },
            });
            if (existing) {
                console.log(`Source already exists: ${sourceInput.name}`);
                results.push({ source: existing, action: 'skipped' });
            }
            else {
                const created = await createDiscoverySource(sourceInput);
                console.log(`Created source: ${sourceInput.name}`);
                results.push({ source: created, action: 'created' });
            }
        }
        catch (error) {
            console.error(`Error creating source ${sourceInput.name}:`, error);
            errors.push({ name: sourceInput.name, error: String(error) });
        }
    }
    return {
        total: sources.length,
        created: results.filter(r => r.action === 'created').length,
        skipped: results.filter(r => r.action === 'skipped').length,
        errors: errors.length,
        results,
        errorDetails: errors,
    };
}
//# sourceMappingURL=discovery-sources.js.map