# Bespoke Discovery Phase - Design Document

## Executive Summary

This document proposes a comprehensive redesign of the Discovery phase to enable **exhaustive, systematic discovery** of emerging GenAI tools and trends across **60+ curated sources**. The goal: surface new and changed GenAI solutions **ahead of the general public**.

> **Design Approach**: This design uses **web scraping** instead of paid APIs for Reddit and X/Twitter. Reddit exposes free JSON endpoints; X content is accessed via Nitter (open-source Twitter frontend). This achieves **90-95% efficacy** at zero API cost.

### Current State Problems

| Issue | Current System | Impact |
|-------|----------------|--------|
| **Source blindness** | Generic web search | Misses niche/emerging tools on specialized sources |
| **No recency tracking** | No "since last crawl" | Can't identify what's NEW |
| **Limited scope** | "5-15 entities" | Insufficient for comprehensive landscape |
| **Tool-centric only** | Entities are "tools" | Misses concepts, trends, techniques |
| **No trend detection** | No clustering | Can't spot emerging patterns |
| **One-shot discovery** | No scheduled crawls | Stale after single run |
| **No source expertise** | All sources equal | Can't optimize for high-value sources |

### Proposed Solution

A **three-tier discovery architecture**:

1. **Source Registry** - Curated database of 45+ information sources with crawl schedules
2. **Crawl Orchestrator** - Specialized crawlers for RSS, GitHub, HTML, and aggregators
3. **Discovery Engine** - Deduplication, trend detection, criticality scoring

---

## Web Scraping Strategy: Reddit & X Without APIs

### The Key Insight

We don't need paid APIs to access Reddit or X content:

| Platform | Free Access Method | Reliability |
|----------|-------------------|-------------|
| **Reddit** | JSON endpoints (add `.json` to any URL) | Very High |
| **X/Twitter** | Nitter instances (open-source frontend) | High |

### Reddit: Free JSON Endpoints

Reddit exposes JSON at any URL by appending `.json`:

```bash
# Hot posts from r/MachineLearning
https://www.reddit.com/r/MachineLearning/hot.json?limit=25

# New posts from r/LocalLLaMA
https://www.reddit.com/r/LocalLLaMA/new.json?limit=50

# Top posts this week from r/ChatGPTCoding
https://www.reddit.com/r/ChatGPTCoding/top.json?t=week&limit=25
```

**Rate limits**: ~60 requests/minute without authentication (sufficient for hourly crawls)

### X/Twitter: Nitter Instances

[Nitter](https://github.com/zedeus/nitter) is an open-source Twitter frontend that:
- Renders clean HTML (no JavaScript required)
- Provides **RSS feeds** for any account
- Has multiple public instances for redundancy

```bash
# RSS feed for @karpathy
https://nitter.net/karpathy/rss

# Profile page (scrapable HTML)
https://nitter.net/sama

# Search results
https://nitter.net/search?q=AI%20coding&f=tweets
```

**Public instances**: nitter.net, nitter.poast.org, nitter.privacydev.net, etc.

### Efficacy Assessment

| Metric | With Paid APIs | With Web Scraping |
|--------|---------------|-------------------|
| **Reddit coverage** | 100% | **95%** |
| **X/Twitter coverage** | 100% | **85%** |
| **Time to Discovery** | 1-4 hours | **2-6 hours** |
| **Grassroots Tools** | 90% | **85%** |
| **Overall Efficacy** | 100% | **90-95%** |
| **API Cost** | $100-500/mo | **$0** |

**Bottom line**: Web scraping achieves **90-95% efficacy** with 2-6 hour discovery lag at zero API cost. The small efficacy loss comes from occasional Nitter instance downtime and Reddit rate limiting during high-traffic periods.

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────┐
│                     DISCOVERY ORCHESTRATOR                          │
│  - Schedules crawls based on source freshness                       │
│  - Distributes work to source-specific crawlers                     │
│  - Tracks progress and resumability                                 │
└───────────────────────────────────────────────────────────────────┬─┘
                                                                    │
        ┌───────────────────────────────────────────────────────────┴──┐
        │                                                              │
        ▼                                                              ▼
┌───────────────────┐  ┌───────────────────┐  ┌───────────────────┐  ┌──────────────────┐
│   RSS CRAWLER     │  │  GITHUB CRAWLER   │  │   HTML CRAWLER    │  │ AGGREGATOR       │
│ - Blog feeds      │  │ - Awesome lists   │  │ - Forums          │  │ CRAWLER          │
│ - News feeds      │  │ - Trending repos  │  │ - Community sites │  │ - HN             │
│ - Newsletters     │  │ - Release notes   │  │ - Product Hunt    │  │ - Lobsters       │
└─────────┬─────────┘  └─────────┬─────────┘  └─────────┬─────────┘  └────────┬─────────┘
          │                      │                      │                     │
          └──────────────────────┴──────────────────────┴─────────────────────┘
                                          │
                                          ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                          DISCOVERY PROCESSOR                                 │
│                                                                             │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐             │
│  │  DEDUPLICATOR   │  │ TREND DETECTOR  │  │  SCORER         │             │
│  │ - Name matching │  │ - Category      │  │ - Criticality   │             │
│  │ - URL normalize │  │   clustering    │  │ - Novelty       │             │
│  │ - Cross-source  │  │ - Velocity      │  │ - Relevance     │             │
│  │   correlation   │  │ - Source spread │  │ - Confidence    │             │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘             │
│                                                                             │
└────────────────────────────────────────────────────────────────────────────┬┘
                                                                             │
                                                                             ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                          PERSISTENCE LAYER                                  │
│                                                                             │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐             │
│  │    ENTITIES     │  │   ASSERTIONS    │  │  DISCOVERIES    │             │
│  │ (tools, trends, │  │ (claims with    │  │ (raw sightings  │             │
│  │  concepts)      │  │  criticality)   │  │  before dedup)  │             │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘             │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Data Model Extensions

### New: DiscoverySource (Source Registry)

```prisma
/// A curated information source for discovery crawling
model DiscoverySource {
  id              String   @id @default(cuid())
  name            String   @unique  // e.g., "KDnuggets", "Hacker News"
  url             String   // Primary URL
  sourceType      SourceType  // BLOG, GITHUB_LIST, NEWSLETTER, etc.
  category        String   // "blogs", "github", "aggregators", "newsletters", "academic"

  // Crawl configuration
  crawlStrategy   String   // "rss", "html_scrape", "github_api", "hn_api"
  crawlFrequency  String   // "hourly", "daily", "weekly"
  crawlDepth      Int      @default(1)  // How deep to follow links
  selectors       Json?    // CSS selectors for content extraction
  feedUrl         String?  // RSS/Atom feed URL if available
  apiEndpoint     String?  // API endpoint for API-based sources

  // Crawl state
  lastCrawledAt   DateTime?
  lastSuccessAt   DateTime?
  lastError       String?
  consecutiveErrors Int     @default(0)
  isActive        Boolean  @default(true)

  // Quality metrics
  discoveriesCount Int     @default(0)  // Total discoveries from this source
  validatedCount  Int      @default(0)  // Discoveries that became validated entities
  hitRate         Float?   // % of discoveries that are valuable
  avgNoveltyScore Float?   // Average novelty of discoveries

  // Source metadata
  description     String?
  tags            String[]  // e.g., ["ai", "devtools", "enterprise"]
  priority        Int       @default(50)  // 1-100, higher = crawl first

  discoveries     RawDiscovery[]

  @@index([sourceType])
  @@index([lastCrawledAt])
  @@index([isActive, priority])
  @@map("discovery_sources")
}

enum SourceType {
  BLOG              // KDnuggets, HuggingFace Blog, etc.
  GITHUB_LIST       // Awesome lists
  GITHUB_TRENDING   // GitHub trending repos
  GITHUB_REPO       // Individual repos to watch
  NEWSLETTER        // Ben's Bites, Import AI, TLDR AI
  AGGREGATOR        // Hacker News, Lobsters, Product Hunt
  REDDIT            // Subreddits (via JSON endpoint)
  X_ACCOUNT         // Twitter/X accounts (via Nitter RSS)
  X_SEARCH          // Twitter/X search/hashtags (via Nitter)
  FORUM             // OpenAI Community, HF Forums
  NEWS              // Tech news sites
  ACADEMIC          // ArXiv, Papers With Code
  DEV_COMMUNITY     // Dev.to, Hashnode
}
```

### New: RawDiscovery (Pre-Dedup Discoveries)

```prisma
/// A raw discovery from a source before deduplication
model RawDiscovery {
  id              String   @id @default(cuid())
  sourceId        String
  source          DiscoverySource @relation(fields: [sourceId], references: [id])

  // Discovery content
  mentionedName   String   // The name as found (may be variant)
  briefDescription String? // One-line description from context
  discoveryUrl    String   // Where this was mentioned
  contextSnippet  String?  // Surrounding text (500 chars)

  // Metadata extracted
  extractedLinks  String[] // Links found in context
  releaseVersion  String?  // Version number if mentioned
  releaseDate     DateTime? // Date if mentioned
  keywords        String[] // Extracted keywords

  // Discovery metadata
  discoveredAt    DateTime @default(now())
  crawlSessionId  String   // Which crawl found this

  // Processing state
  processed       Boolean  @default(false)
  matchedEntityId String?  // If matched to existing entity
  createdEntityId String?  // If created new entity

  // Scoring (pre-dedup)
  noveltyScore    Float?   // 0-1, how new/unique is this?
  relevanceScore  Float?   // 0-1, how relevant to research focus?

  @@index([sourceId, discoveredAt])
  @@index([processed])
  @@index([mentionedName])
  @@map("raw_discoveries")
}
```

### New: DiscoveryCrawl (Crawl Session Tracking)

```prisma
/// A crawl session for tracking progress and resumability
model DiscoveryCrawl {
  id              String   @id @default(cuid())
  projectId       String?  // Optional - may be project-specific

  // Crawl scope
  sourceIds       String[] // Sources to crawl (empty = all active)
  researchFocus   String?  // Keywords/criteria to prioritize

  // Timing
  startedAt       DateTime @default(now())
  completedAt     DateTime?
  pausedAt        DateTime?

  // Progress
  status          CrawlStatus @default(IN_PROGRESS)
  sourcesTotal    Int
  sourcesComplete Int      @default(0)
  sourcesFailed   Int      @default(0)

  // Results
  discoveriesFound Int     @default(0)
  entitiesCreated Int      @default(0)
  entitiesUpdated Int      @default(0)
  trendsDetected  Int      @default(0)

  // Resumability
  checkpoint      Json?    // State for resuming

  @@index([status])
  @@index([startedAt])
  @@map("discovery_crawls")
}

enum CrawlStatus {
  IN_PROGRESS
  PAUSED
  COMPLETED
  FAILED
  CANCELLED
}
```

### New: DiscoveryTrend (Trend Detection)

```prisma
/// A detected trend across discoveries
model DiscoveryTrend {
  id              String   @id @default(cuid())
  projectId       String?

  // Trend identification
  name            String   // e.g., "AI Code Review Tools", "LLM Agents"
  description     String?
  category        String?  // e.g., "code_generation", "testing", "ops"

  // Trend metrics
  mentionCount    Int      @default(0)  // Total mentions
  entityCount     Int      @default(0)  // Unique entities
  sourceSpread    Int      @default(0)  // How many sources mention it
  velocity        Float?   // Mentions/week trend

  // Temporal
  firstSeenAt     DateTime
  lastSeenAt      DateTime
  peakAt          DateTime? // When mentions peaked

  // Related data
  entityIds       String[] // Entities in this trend
  keywords        String[] // Associated keywords

  // Scoring
  trendScore      Float?   // 0-1, overall trend strength
  emergingScore   Float?   // 0-1, is this new and growing?

  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt

  @@index([category])
  @@index([trendScore])
  @@map("discovery_trends")
}
```

### Extended: Entity (Support for Concepts/Trends)

```prisma
/// Extended entity types
enum EntityKind {
  TOOL        // Software tool
  FRAMEWORK   // Development framework
  PRODUCT     // Commercial product
  SERVICE     // SaaS/hosted service
  LIBRARY     // Code library
  COMPANY     // Organization
  CONCEPT     // Technical concept (e.g., "RAG", "Chain-of-Thought")
  TECHNIQUE   // Implementation technique
  TREND       // Market/technology trend
  STANDARD    // Specification/standard
}
```

### Extended: Assertion Criticality (Enhanced Scoring)

```prisma
/// Enhanced criticality with scoring factors
model Assertion {
  // ... existing fields ...

  // Enhanced criticality scoring
  criticalityScore   Float?   // 0-1 continuous score
  criticalityFactors Json?    // Breakdown: {federal: 0.8, pricing: 0.3, novelty: 0.9, ...}

  // Discovery provenance
  discoverySourceId  String?  // Which discovery source first mentioned this
  firstDiscoveredAt  DateTime? // When first discovered
  mentionCount       Int       @default(1)  // How many times mentioned across sources
  sourceSpread       Int       @default(1)  // How many unique sources mention this
}
```

---

## Source Registry - Initial Population (60+ Sources)

### Blogs/News Sites (21 sources)

| Name | URL | Strategy | Frequency |
|------|-----|----------|-----------|
| KDnuggets | kdnuggets.com | RSS | daily |
| Towards Data Science | towardsdatascience.com | RSS | daily |
| MarkTechPost AI | marktechpost.com/technology/artificial-intelligence | HTML | daily |
| Hugging Face Blog | huggingface.co/blog | RSS | daily |
| OpenAI Blog | openai.com/news/research | RSS | daily |
| BAIR Blog | bair.berkeley.edu/blog | RSS | weekly |
| Towards AI | towardsai.net | RSS | daily |
| GitHub Blog | github.blog | RSS | daily |
| Spacelift Blog | spacelift.io/blog | HTML | weekly |
| Harvard Business Review | hbr.org | RSS | weekly |
| Bain Insights | bain.com/insights | HTML | weekly |
| Simon Willison | simonwillison.net | RSS | daily |
| Pragmatic Coders | pragmaticcoders.com/resources | HTML | weekly |
| Artjoker Blog | artjoker.net/blog | HTML | weekly |
| Coherent Solutions | coherentsolutions.com/insights | HTML | weekly |
| Copilot4DevOps | copilot4devops.com | RSS | weekly |
| Analytics Vidhya | analyticsvidhya.com/blog | RSS | daily |
| ML Mastery | machinelearningmastery.com | RSS | weekly |
| Anthropic Claude Blog | claude.com/blog | RSS | daily |
| Holistic AI | holisticai.com/blog | HTML | weekly |
| Data Center Dynamics | datacenterdynamics.com | RSS | daily |

### GitHub Sources (9 sources)

| Name | URL | Strategy | Frequency |
|------|-----|----------|-----------|
| awesome-generative-ai | github.com/steven2358/awesome-generative-ai | README diff | daily |
| awesome-generative-ai-guide | github.com/aishwaryanr/awesome-generative-ai-guide | README diff | daily |
| awesome-ai-devtools | github.com/jamesmurdza/awesome-ai-devtools | README diff | daily |
| awesome-production-genai | github.com/EthicalML/awesome-production-genai | README diff | weekly |
| awesome-ai-tools | github.com/mahseema/awesome-ai-tools | README diff | daily |
| awesome-ai | github.com/openbestof/awesome-ai | README diff | weekly |
| awesome-ai-agents | github.com/e2b-dev/awesome-ai-agents | README diff | daily |
| devops-tools | github.com/techiescamp/devops-tools | README diff | weekly |
| **GitHub Trending** | github.com/trending | HTML scrape | **twice daily** |

### Reddit Subreddits (6 sources) - *Via JSON Endpoints*

| Name | URL | Strategy | Frequency | Signal Value |
|------|-----|----------|-----------|--------------|
| **r/MachineLearning** | reddit.com/r/MachineLearning | JSON API | hourly | Very High |
| **r/LocalLLaMA** | reddit.com/r/LocalLLaMA | JSON API | hourly | Very High |
| **r/ChatGPTCoding** | reddit.com/r/ChatGPTCoding | JSON API | hourly | High |
| **r/ArtificialIntelligence** | reddit.com/r/ArtificialIntelligence | JSON API | daily | High |
| **r/devops** | reddit.com/r/devops | JSON API | daily | Medium |
| **r/learnmachinelearning** | reddit.com/r/learnmachinelearning | JSON API | daily | Medium |

### X/Twitter Accounts (22 sources) - *Via Nitter RSS*

| Account | Focus | Strategy | Frequency |
|---------|-------|----------|-----------|
| **@karpathy** | AI research, tools | Nitter RSS | hourly |
| **@sama** | OpenAI, industry | Nitter RSS | hourly |
| **@AndrewYNg** | ML education, tools | Nitter RSS | daily |
| **@demishassabis** | DeepMind, research | Nitter RSS | daily |
| **@ylecun** | Meta AI, research | Nitter RSS | daily |
| **@gdb** | OpenAI | Nitter RSS | daily |
| **@lexfridman** | AI podcasts, tools | Nitter RSS | daily |
| **@svpino** | ML engineering | Nitter RSS | daily |
| **@rohanpaul_ai** | AI tools, tutorials | Nitter RSS | daily |
| **@omarsar0** | ML papers, tools | Nitter RSS | daily |
| **@OpenAI** | Official announcements | Nitter RSS | hourly |
| **@GoogleDeepMind** | Research, tools | Nitter RSS | daily |
| **@huggingface** | Models, tools | Nitter RSS | hourly |
| **@anthropaborAI** | Claude, research | Nitter RSS | daily |
| **@LangChainAI** | LangChain ecosystem | Nitter RSS | daily |
| **@llaboratories** | LLM tools | Nitter RSS | daily |
| **@RealGeneKim** | DevOps, AI | Nitter RSS | daily |
| **@jezhumble** | DevOps, CD | Nitter RSS | weekly |
| **@nicolefv** | DevOps research | Nitter RSS | weekly |
| **@ID_AA_Carmack** | Tech, AI | Nitter RSS | weekly |
| **@PalantirTech** | Enterprise AI | Nitter RSS | weekly |
| **@kaifulee** | AI industry | Nitter RSS | weekly |

### Newsletters/Digests (8 sources)

| Name | URL | Strategy | Frequency |
|------|-----|----------|-----------|
| **Import AI** | importai.substack.com | RSS | weekly |
| **Ben's Bites** | bensbites.beehiiv.com | RSS | daily |
| **TLDR AI** | tldr.tech/ai | RSS | daily |
| **AlphaSignal** | alphasignal.ai | RSS | daily |
| **The Batch** | deeplearning.ai/the-batch | RSS | weekly |
| **AI Weekly** | aiweekly.co | RSS | weekly |
| **Last Week in AI** | lastweekinai.com | RSS | weekly |
| **The Gradient** | thegradient.pub | RSS | weekly |

### Aggregators (3 sources) - *Compensates for Reddit*

| Name | URL | Strategy | Frequency | Signal Value |
|------|-----|----------|-----------|--------------|
| **Hacker News** | news.ycombinator.com | HN API | hourly | Very High |
| **Lobsters** | lobste.rs | RSS | daily | High |
| **Product Hunt** | producthunt.com | RSS | daily | High (launches) |

### Academic Sources (2 sources)

| Name | URL | Strategy | Frequency |
|------|-----|----------|-----------|
| **Papers With Code** | paperswithcode.com | RSS | daily |
| **ArXiv CS.AI** | arxiv.org/list/cs.AI | RSS | daily |

### Dev Communities (2 sources)

| Name | URL | Strategy | Frequency |
|------|-----|----------|-----------|
| **Dev.to AI tag** | dev.to/t/ai | RSS | daily |
| **Hashnode AI** | hashnode.com/n/ai | RSS | daily |

### Source Summary

| Category | Count | Crawl Method |
|----------|-------|--------------|
| Blogs/News | 21 | RSS + HTML |
| GitHub | 9 | API + HTML |
| **Reddit** | 6 | JSON endpoints |
| **X/Twitter** | 22 | Nitter RSS |
| Newsletters | 8 | RSS |
| Aggregators | 3 | HN API + RSS |
| Academic | 2 | RSS |
| Dev Communities | 2 | RSS |
| **TOTAL** | **73** | |

---

## Crawl Strategies by Source Type

### 1. RSS Crawler (Primary - 35+ sources)

```typescript
interface RSSCrawlerConfig {
  feedUrl: string;           // RSS/Atom feed URL
  maxAge: number;            // Ignore items older than N days
  titlePatterns?: string[];  // Regex patterns to filter relevant items
  extractLinks: boolean;     // Parse item content for links
}

// Process:
// 1. Fetch RSS feed
// 2. Parse items with publication date filtering
// 3. Extract tool mentions from title + description
// 4. Follow links to get full context (optional)
// 5. Create RawDiscovery records

// Example feeds:
// - https://simonwillison.net/atom/everything/
// - https://bensbites.beehiiv.com/feed
// - https://tldr.tech/ai/rss
```

### 2. GitHub Awesome List Crawler

```typescript
interface GitHubListCrawlerConfig {
  repoOwner: string;
  repoName: string;
  readmePath: string;    // Usually "README.md"
  sectionHeadings: string[]; // Which sections to parse
}

// Strategy:
// 1. Fetch README.md raw content via GitHub API
// 2. Parse markdown to extract:
//    - Tool names (usually bold or linked)
//    - Descriptions (following the link)
//    - URLs (from markdown links)
//    - Categories (from headings)
// 3. Diff against previous crawl to find NEW entries
// 4. Track position changes for "rising" tools
```

### 3. GitHub Trending Crawler

```typescript
interface GitHubTrendingConfig {
  languages: string[];     // ["python", "typescript", "rust", ""]
  timeRange: "daily" | "weekly" | "monthly";
  minStars: number;
}

// Strategy:
// 1. Scrape github.com/trending (no API for this)
// 2. Extract repo name, description, stars, language
// 3. Filter by AI/ML keywords in name/description
// 4. Compare against previous crawl for velocity
```

### 4. Hacker News Crawler

```typescript
interface HNCrawlerConfig {
  endpoint: "topstories" | "newstories" | "beststories";
  minScore: number;        // Minimum points threshold
  maxResults: number;
  aiKeywords: string[];    // Filter by these keywords
}

// Strategy:
// 1. Use HN API (no auth required, generous limits)
// 2. Fetch story IDs, then story details
// 3. Filter by score and keyword relevance
// 4. Extract tool mentions from title + URL
// 5. Optionally fetch top comments for context
```

### 5. Reddit JSON Crawler

```typescript
interface RedditCrawlerConfig {
  subreddit: string;
  sortBy: "hot" | "new" | "top" | "rising";
  timeFrame?: "hour" | "day" | "week" | "month";  // For "top"
  limit: number;           // Max 100 per request
  minScore: number;        // Minimum upvotes
  aiKeywords: string[];    // Filter by these keywords
}

// Strategy:
// 1. Fetch JSON: reddit.com/r/{subreddit}/{sortBy}.json?limit={limit}
// 2. Parse response.data.children[] for posts
// 3. Filter by score and keyword relevance
// 4. Extract: title, selftext, url, score, num_comments
// 5. Optionally fetch top comments: {permalink}.json

// Example:
// https://www.reddit.com/r/LocalLLaMA/hot.json?limit=50
// Returns: { data: { children: [{ data: { title, url, score, ... } }] } }
```

### 6. Nitter/X Crawler

```typescript
interface NitterCrawlerConfig {
  type: "account" | "search";
  identifier: string;      // @handle or search query
  nitterInstance: string;  // nitter.net, nitter.poast.org, etc.
  maxResults: number;
  minEngagement?: number;  // For search results
}

// Strategy for accounts (RSS):
// 1. Fetch RSS: {nitterInstance}/{handle}/rss
// 2. Parse RSS items for tweets
// 3. Extract: text, links, date, engagement (from HTML if needed)

// Strategy for search (HTML scrape):
// 1. Fetch: {nitterInstance}/search?q={query}&f=tweets
// 2. Parse HTML for tweet elements
// 3. Filter by engagement metrics
// 4. Extract tool mentions from tweet text

// Fallback instances:
// - nitter.net (primary)
// - nitter.poast.org
// - nitter.privacydev.net
// - xcancel.com
```

### 5. Generic HTML Crawler (Fallback)

```typescript
interface HTMLCrawlerConfig {
  url: string;
  listingSelector: string;   // CSS selector for article list
  itemSelector: string;      // CSS selector for each item
  titleSelector: string;
  linkSelector: string;
  dateSelector?: string;
  contentSelector?: string;
  pagination?: {
    type: "page" | "load-more" | "infinite";
    selector: string;
    maxPages: number;
  };
}

// Used for:
// - Forums without RSS (OpenAI Community, HF Forums)
// - Product Hunt (if RSS insufficient)
// - Sites without standard feeds
```

---

## Discovery Processing Pipeline

### Stage 1: Raw Discovery Capture

Each crawler produces `RawDiscovery` records:

```json
{
  "sourceId": "hacker-news",
  "mentionedName": "Cursor IDE",
  "briefDescription": "AI-powered code editor gaining traction in enterprise",
  "discoveryUrl": "https://news.ycombinator.com/item?id=12345",
  "contextSnippet": "Show HN: Cursor IDE now supports multi-file editing with Claude...",
  "extractedLinks": ["https://cursor.com"],
  "keywords": ["AI", "IDE", "code editor", "Claude"],
  "discoveredAt": "2026-01-12T10:30:00Z"
}
```

### Stage 2: Deduplication

```typescript
interface DeduplicationStrategy {
  // Step 1: Exact name match
  exactNameMatch(name: string): Entity | null;

  // Step 2: Normalized name match
  normalizedNameMatch(name: string): Entity | null;
  // "GitHub Copilot" vs "Copilot" vs "GH Copilot"

  // Step 3: URL-based matching
  urlMatch(urls: string[]): Entity | null;

  // Step 4: Fuzzy name + description similarity
  fuzzyMatch(name: string, description: string): Entity | null;
  // Levenshtein distance + keyword overlap

  // Step 5: Cross-source correlation
  crossSourceCorrelation(discovery: RawDiscovery): Entity | null;
  // Same tool mentioned differently across sources
}
```

### Stage 3: Entity Resolution

For each `RawDiscovery`:

1. **Match existing entity** → Update entity metadata, increment mention count
2. **Create new entity** → New Entity record with initial assertions
3. **Flag for review** → Ambiguous match, needs human decision

### Stage 4: Trend Detection

```typescript
interface TrendDetector {
  // Cluster discoveries by:
  clusterByCategory(): Map<string, RawDiscovery[]>;
  // "AI code review", "LLM agents", "MLOps"

  clusterByKeyword(): Map<string, RawDiscovery[]>;
  // Common keywords appearing together

  // Calculate velocity:
  calculateVelocity(clusterId: string): TrendVelocity;
  // mentions_this_week / mentions_last_week

  // Calculate source spread:
  calculateSourceSpread(clusterId: string): number;
  // How many unique sources mention this cluster

  // Identify emerging trends:
  identifyEmergingTrends(): DiscoveryTrend[];
  // High velocity + growing source spread
}
```

### Stage 5: Criticality Scoring

```typescript
interface CriticalityScorer {
  // Factor weights (configurable per project)
  weights: {
    federalRelevance: 0.30,    // FedRAMP, air-gapped, GovCloud mentions
    pricingImpact: 0.20,       // Pricing changes, new tiers
    securityArchitecture: 0.25, // Security claims, compliance
    novelty: 0.15,             // New to our database
    sourceTrust: 0.10,         // Quality of discovery source
  };

  // Calculate for an assertion
  calculateCriticality(assertion: Assertion): {
    score: number;           // 0-1
    level: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
    factors: CriticalityFactors;
  };
}

interface CriticalityFactors {
  federalRelevance: number;   // Contains FedRAMP, air-gapped, etc.
  pricingImpact: number;      // Pricing claim
  securityArchitecture: number; // Security/compliance claim
  novelty: number;            // First time seeing this
  sourceTrust: number;        // Source quality score
  sourceSpread: number;       // Multiple sources confirm
  mentionVelocity: number;    // Growing mentions
}
```

---

## CLI Commands

### Source Registry Management

```bash
# Add a discovery source
npm run cli -- discovery:source:add '{
  "name": "Hacker News",
  "url": "https://news.ycombinator.com",
  "sourceType": "AGGREGATOR",
  "crawlStrategy": "hn_api",
  "crawlFrequency": "hourly",
  "tags": ["tech", "startups", "ai"]
}'

# List all sources
npm run cli -- discovery:source:list

# Get source with stats
npm run cli -- discovery:source:get '{"sourceId": "..."}'

# Update source config
npm run cli -- discovery:source:update '{"sourceId": "...", "isActive": false}'

# Get sources by type
npm run cli -- discovery:source:byType '{"sourceType": "NEWSLETTER"}'

# Get stale sources (need crawl)
npm run cli -- discovery:source:stale '{"maxAge": "24h"}'

# Seed all default sources
npm run cli -- discovery:source:seed
```

### Crawl Management

```bash
# Start a discovery crawl
npm run cli -- discovery:crawl:start '{
  "projectId": "...",
  "researchFocus": "AI coding assistants, gen AI DevOps tools",
  "sourceTypes": ["BLOG", "GITHUB_LIST", "NEWSLETTER", "AGGREGATOR"],
  "maxSources": 30
}'

# Check crawl status
npm run cli -- discovery:crawl:status '{"crawlId": "..."}'

# Pause/resume crawl
npm run cli -- discovery:crawl:pause '{"crawlId": "..."}'
npm run cli -- discovery:crawl:resume '{"crawlId": "..."}'

# Cancel crawl
npm run cli -- discovery:crawl:cancel '{"crawlId": "..."}'

# Get crawl history
npm run cli -- discovery:crawl:history '{"projectId": "...", "limit": 10}'
```

### Raw Discovery Operations

```bash
# List unprocessed discoveries
npm run cli -- discovery:raw:pending '{"limit": 50}'

# Get discovery details
npm run cli -- discovery:raw:get '{"discoveryId": "..."}'

# Process discovery (dedup + entity resolution)
npm run cli -- discovery:raw:process '{"discoveryId": "..."}'

# Batch process all pending
npm run cli -- discovery:raw:processAll '{"projectId": "..."}'

# Search discoveries
npm run cli -- discovery:raw:search '{"query": "cursor", "sourceType": "AGGREGATOR"}'
```

### Trend Detection

```bash
# Detect trends from recent discoveries
npm run cli -- discovery:trends:detect '{"projectId": "...", "windowDays": 7}'

# List trends
npm run cli -- discovery:trends:list '{"projectId": "...", "minScore": 0.5}'

# Get trend details with related entities
npm run cli -- discovery:trends:get '{"trendId": "..."}'

# Export trends report
npm run cli -- discovery:trends:export '{"projectId": "...", "format": "markdown"}'
```

### Discovery Reports

```bash
# Generate discovery summary
npm run cli -- discovery:report:summary '{"projectId": "...", "since": "7d"}'

# Get new entities discovered
npm run cli -- discovery:report:newEntities '{"projectId": "...", "since": "24h"}'

# Get high-criticality assertions
npm run cli -- discovery:report:critical '{"projectId": "...", "minCriticality": "HIGH"}'

# Export discovery catalog (tabular format)
npm run cli -- discovery:report:catalog '{"projectId": "...", "format": "csv"}'
```

---

## Agent Prompts

### Discovery Coordinator Prompt

```markdown
You are an EXHAUSTIVE DISCOVERY agent specialized in surfacing emerging GenAI tools.

## YOUR SOLE OBJECTIVE

Systematic, exhaustive discovery across curated sources. Your goal:
- Surface NEW and CHANGED GenAI tools AHEAD of the general public
- Prioritize RECENCY - what's new since last crawl
- Cast a BROAD NET - don't pre-filter by perceived relevance
- Focus on DISCOVERY, not evaluation

## RESEARCH FOCUS

{{research_focus}}

## AVAILABLE SOURCES (73 curated)

You have access to {{source_count}} curated sources across:
- Blogs/News (21): KDnuggets, HF Blog, OpenAI News, Simon Willison, etc.
- GitHub (9): Awesome lists + GitHub Trending
- Reddit (6): r/MachineLearning, r/LocalLLaMA, r/ChatGPTCoding, etc.
- X/Twitter (22): @karpathy, @sama, @OpenAI, @huggingface, etc.
- Newsletters (8): Ben's Bites, TLDR AI, Import AI, AlphaSignal
- Aggregators (3): Hacker News, Lobsters, Product Hunt
- Academic (2): Papers With Code, ArXiv
- Dev Communities (2): Dev.to, Hashnode

## DISCOVERY PROTOCOL

### Phase 1: Source Crawl (Parallel)

Spawn crawlers for each source type:

1. **RSS Crawler** (Haiku) - Process 35+ RSS feeds for new items
2. **GitHub Crawler** (Haiku) - Diff awesome lists, check trending
3. **HN Crawler** (Haiku) - Fetch top/new stories with AI keywords
4. **HTML Crawler** (Haiku) - Scrape forums and sites without RSS

Crawlers return RawDiscovery records.

### Phase 2: Process Discoveries (Sequential)

For each RawDiscovery:

1. **Deduplicate** - Match against existing entities
2. **Create/Update** - New entity or update existing
3. **Extract Assertions** - Initial claims from context
4. **Score Criticality** - Federal relevance, pricing impact, novelty

### Phase 3: Detect Trends

After processing:

1. **Cluster** discoveries by category/keyword
2. **Calculate** velocity and source spread
3. **Identify** emerging trends
4. **Report** significant patterns

## DISCOVERY OUTPUT FORMAT

For each discovery, capture:

| Field | Description |
|-------|-------------|
| Tool Name | Official name as mentioned |
| Source(s) | Where discovered |
| Brief Description | One-sentence from context |
| Link(s) | URLs to tool/docs |
| Discovery Date | When found |
| Novelty Score | 0-1, is this new to us? |

## CRITICALITY SCORING

Apply to all assertions:

- **CRITICAL**: Federal compliance (FedRAMP, air-gapped), security architecture
- **HIGH**: Pricing claims, enterprise features, competitive positioning
- **MEDIUM**: Feature claims, integrations, use cases
- **LOW**: General observations, community sentiment

## COMPLETION

Conclude with:

1. **Discovery Summary**
   - Total tools discovered
   - New vs existing
   - By source type breakdown

2. **Emerging Trends**
   - Top 5 trends detected
   - Velocity and spread metrics

3. **Critical Findings**
   - HIGH/CRITICAL assertions needing validation

4. **Recommendations**
   - Entities for deep ANALYSIS
   - Sources performing well/poorly
```

---

## Implementation Phases

### Phase 1: Foundation (1-2 weeks)

1. **Schema migrations** - Add DiscoverySource, RawDiscovery, DiscoveryCrawl, DiscoveryTrend
2. **Source Registry CLI** - CRUD operations for sources
3. **Seed initial 45 sources** - Populate from list above
4. **Basic crawl tracking** - Start/pause/resume/cancel

### Phase 2: Crawlers (2-3 weeks)

1. **RSS Crawler** - Handle 35+ feeds (most sources)
2. **GitHub Crawler** - Awesome list diffing + trending scrape
3. **Hacker News Crawler** - HN API integration
4. **Generic HTML Crawler** - Fallback for non-RSS sources

### Phase 3: Processing Pipeline (1-2 weeks)

1. **Deduplication engine** - Multi-strategy entity matching
2. **Entity resolution** - Create/update logic with mention counting
3. **Assertion extraction** - From discovery context
4. **Criticality scoring** - Configurable weights

### Phase 4: Trend Detection (1 week)

1. **Clustering algorithm** - Category/keyword based
2. **Velocity calculation** - Time-series analysis
3. **Trend reporting** - CLI and export

### Phase 5: Polish (1 week)

1. **Discovery dashboard** - View recent discoveries
2. **Scheduled crawls** - Cron integration
3. **Source health monitoring** - Error tracking, auto-disable
4. **Performance optimization** - Parallel crawling

---

## Success Metrics

| Metric | Target |
|--------|--------|
| Source coverage | 73 sources active |
| Crawl frequency | Hourly for Reddit/X/HN, daily for blogs |
| New tool discovery | 15+ new tools/week |
| Trend detection | Identify trends within 24h of emergence |
| False positive rate | <20% irrelevant discoveries |
| Human validation load | <50 assertions/week at CRITICAL level |
| Time to awareness | Discover tools within 4-12h of first mention |

---

## Operational Considerations

### Rate Limiting Strategy

| Source | Rate Limit | Our Usage | Buffer |
|--------|-----------|-----------|--------|
| Reddit JSON | ~60 req/min | 6 req/hour | 10x margin |
| Nitter RSS | Varies by instance | 22 req/hour | Use multiple instances |
| HN API | Generous | 100 req/hour | No concern |
| GitHub API | 60 req/hour (unauth) | 10 req/hour | 6x margin |

### Nitter Instance Failover

```typescript
const NITTER_INSTANCES = [
  "nitter.net",
  "nitter.poast.org",
  "nitter.privacydev.net",
  "xcancel.com",
  "nitter.unixfox.eu"
];

// Strategy: Round-robin with health checks
// If instance fails, automatically try next
// Track instance uptime and prefer reliable ones
```

### Future Enhancements

1. **Discord Integration** - Bot for HuggingFace Discord, AI communities
2. **YouTube Monitoring** - AI influencer channels for video announcements
3. **LinkedIn** - Enterprise AI announcements (scraping harder)
4. **Bluesky** - Emerging platform, many AI researchers migrating

---

## Next Steps

1. Review and approve this design
2. Prioritize Phase 1 implementation
3. Set up test sources for validation (HN + 3 newsletters)
4. Begin schema migrations
