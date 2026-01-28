# RSS Crawler Examples

The RSS crawler extracts tool mentions from RSS/Atom feeds. It's ideal for discovering new AI tools from blogs, newsletters, and aggregation sites.

## Quick Start

```bash
# 1. Create a source for the RSS feed
npm run cli -- source:create '{
  "url": "https://huggingface.co/blog/feed.xml",
  "title": "Hugging Face Blog RSS",
  "sourceType": "blog"
}'

# 2. Crawl the feed
npm run cli -- rss:crawl '{
  "feedUrl": "https://huggingface.co/blog/feed.xml",
  "sourceId": "<source-id-from-step-1>",
  "projectId": "<your-project-id>"
}'

# 3. Save discoveries to database (if not auto-persisted)
npm run cli -- rss:save '{
  "discoveries": [...]
}'

# 4. Check crawl statistics
npm run cli -- rss:stats '{
  "projectId": "<your-project-id>"
}'
```

## Popular AI/ML RSS Feeds

### News & Aggregators

```bash
# Hacker News RSS (AI stories)
https://hnrss.org/newest?q=AI+OR+LLM+OR+GPT

# Reddit /r/MachineLearning
https://www.reddit.com/r/MachineLearning/.rss

# The Batch by DeepLearning.AI
https://www.deeplearning.ai/the-batch/feed/

# AI News (AInews.com)
https://www.artificialintelligence-news.com/feed/
```

### Company Blogs

```bash
# OpenAI Blog
https://openai.com/blog/rss.xml

# Anthropic Blog
https://www.anthropic.com/news.rss

# Hugging Face Blog
https://huggingface.co/blog/feed.xml

# Google AI Blog
https://ai.googleblog.com/feeds/posts/default

# Meta AI Blog
https://ai.facebook.com/blog/rss/
```

### Research & Academic

```bash
# arXiv AI (cs.AI)
http://export.arxiv.org/rss/cs.AI

# Papers With Code
https://paperswithcode.com/feed

# Distill.pub
https://distill.pub/rss.xml
```

## Configuration Options

```typescript
interface RSSCrawlerConfig {
  feedUrl: string;          // RSS/Atom feed URL
  sourceId: string;         // Source ID from database
  projectId: string;        // Project to add discoveries to
  maxAgeDays?: number;      // Ignore items older than N days (default: 30)
  aiKeywords?: string[];    // Custom AI keywords for filtering
  extractLinks?: boolean;   // Parse content for links (default: true)
  maxItems?: number;        // Max items to process (default: 50)
  crawlSessionId?: string;  // Optional session ID for tracking
}
```

## Example: Complete Workflow

```bash
# 1. Create a project
npm run cli -- project:create '{
  "name": "AI Tools Discovery - January 2026",
  "description": "Discover AI tools from RSS feeds",
  "workflow": "DISCOVERY"
}'
# Returns: projectId: "abc123"

# 2. Create source for Hugging Face blog
npm run cli -- source:create '{
  "url": "https://huggingface.co/blog/feed.xml",
  "title": "Hugging Face Blog",
  "sourceType": "blog"
}'
# Returns: id: "src456"

# 3. Crawl with custom keywords
npm run cli -- rss:crawl '{
  "feedUrl": "https://huggingface.co/blog/feed.xml",
  "sourceId": "src456",
  "projectId": "abc123",
  "maxAgeDays": 7,
  "maxItems": 20,
  "aiKeywords": ["transformers", "diffusion", "LLM", "fine-tune", "PEFT"]
}'

# Returns:
{
  "success": true,
  "discoveries": [
    {
      "mentionedName": "AutoTrain",
      "briefDescription": "New tool for automated model training...",
      "discoveryUrl": "https://huggingface.co/blog/autotrain-v2",
      "keywords": ["transformers", "fine-tune"],
      "confidence": 0.75
    }
  ],
  "itemsProcessed": 20,
  "itemsFiltered": 8,
  "metadata": {
    "feedTitle": "Hugging Face Blog",
    "crawlSessionId": "rss-1736697600-xyz"
  }
}

# 4. Check stats
npm run cli -- rss:stats '{
  "projectId": "abc123"
}'
```

## Advanced: Batch Processing Multiple Feeds

```bash
# Create an agenda for systematic feed crawling
npm run cli -- agenda:create '{
  "projectId": "abc123",
  "name": "RSS Crawl - AI Blogs",
  "taskType": "rss:crawl",
  "taskDescription": "Crawl all major AI blog RSS feeds"
}'

# Manually process each feed
FEEDS=(
  "https://openai.com/blog/rss.xml"
  "https://www.anthropic.com/news.rss"
  "https://huggingface.co/blog/feed.xml"
  "https://ai.googleblog.com/feeds/posts/default"
)

for feed in "${FEEDS[@]}"; do
  # Create source
  SOURCE_ID=$(npm run cli -- source:create "{\"url\": \"$feed\", \"sourceType\": \"blog\"}" | jq -r '.data.id')

  # Crawl
  npm run cli -- rss:crawl "{
    \"feedUrl\": \"$feed\",
    \"sourceId\": \"$SOURCE_ID\",
    \"projectId\": \"abc123\"
  }"
done
```

## Tool Mention Patterns

The crawler looks for these patterns to extract tool names:

1. **Domain TLDs**: `ToolName.ai`, `ToolName.io`, `ToolName.dev`
2. **Product Names**: `[Name] AI`, `[Name] Agent`, `[Name] Copilot`
3. **CamelCase**: `AutoTrain`, `CodeLlama`, `StableDiffusion`
4. **Quoted Names**: `"ToolName"` in text
5. **Near AI Keywords**: Capitalized words near "AI", "ML", "LLM" mentions

## Filtering Results

```bash
# Only recent items (last 7 days)
npm run cli -- rss:crawl '{
  "feedUrl": "...",
  "sourceId": "...",
  "projectId": "...",
  "maxAgeDays": 7
}'

# Custom AI keywords (focus on specific domain)
npm run cli -- rss:crawl '{
  "feedUrl": "...",
  "sourceId": "...",
  "projectId": "...",
  "aiKeywords": ["computer vision", "object detection", "image segmentation", "YOLO", "ResNet"]
}'

# Limit items processed
npm run cli -- rss:crawl '{
  "feedUrl": "...",
  "sourceId": "...",
  "projectId": "...",
  "maxItems": 10
}'
```

## Output Format

### RSSCrawlResult

```typescript
{
  success: boolean;
  discoveries: RawDiscoveryInput[];  // Array of discovered tools
  itemsProcessed: number;            // Total RSS items checked
  itemsFiltered: number;             // Items filtered out (date/keywords)
  errors: string[];                  // Any errors encountered
  metadata: {
    feedTitle: string;               // RSS feed title
    feedUrl: string;                 // Feed URL
    crawledAt: Date;                 // When crawled
    crawlSessionId: string;          // Session ID for tracking
  };
}
```

### RawDiscoveryInput

```typescript
{
  sourceId: string;           // Source ID
  projectId: string;          // Project ID
  mentionedName: string;      // Tool/entity name found
  briefDescription: string;   // Excerpt from RSS item
  discoveryUrl: string;       // URL to full article
  contextSnippet: string;     // Text around the mention
  extractedLinks: string[];   // URLs found in content
  keywords: string[];         // AI keywords matched
  discoveredAt: Date;         // RSS item publish date
  crawlSessionId: string;     // Tracking ID
  confidence: number;         // Confidence score (0-1)
}
```

## Troubleshooting

### "Feed not found" error

```bash
# Validate feed URL first
curl -I "https://example.com/feed.xml"

# Some sites use /feed, /rss, /atom.xml
# Try alternatives:
- /feed
- /rss
- /atom.xml
- /blog/feed
- /feeds/posts/default
```

### No discoveries found

```bash
# Check if items match date filter
npm run cli -- rss:crawl '{
  "...",
  "maxAgeDays": 90  # Increase window
}'

# Check if AI keywords are too restrictive
npm run cli -- rss:crawl '{
  "...",
  "aiKeywords": ["AI", "ML", "tool", "framework"]  # Broaden keywords
}'
```

### Rate limiting

```bash
# Add delays between feeds
for feed in "${FEEDS[@]}"; do
  npm run cli -- rss:crawl "..."
  sleep 5  # Wait 5 seconds between requests
done
```

## Integration with Other Tools

### Chain with Entity Research

```bash
# 1. Crawl RSS for discoveries
RESULT=$(npm run cli -- rss:crawl '{...}')

# 2. Extract entity IDs from discoveries
ENTITIES=$(echo "$RESULT" | jq -r '.data.discoveries[].mentionedName')

# 3. Deep research each entity
for entity in $ENTITIES; do
  # Find pricing page
  npm run cli -- extract:fetch "{\"url\": \"https://$entity.com/pricing\", ...}"

  # Extract features
  npm run cli -- extract:fetch "{\"url\": \"https://$entity.com/features\", ...}"
done
```

### Combine with Hacker News Crawler

```bash
# 1. Find tools on HN
npm run cli -- crawl:show-hn '{"projectId": "abc123"}'

# 2. Subscribe to RSS feeds of discovered tools
# (Manually find RSS feeds for discovered tools)

# 3. Monitor for updates via RSS
npm run cli -- rss:crawl '{...}'
```

## Recommended Feeds by Category

### General AI News
- Hacker News AI: `https://hnrss.org/newest?q=AI`
- The Batch: `https://www.deeplearning.ai/the-batch/feed/`
- MIT Technology Review AI: `https://www.technologyreview.com/topic/artificial-intelligence/feed/`

### Developer Tools
- Product Hunt AI: `https://www.producthunt.com/topics/artificial-intelligence.rss`
- GitHub Trending: (use github-crawler instead)
- Dev.to AI: `https://dev.to/feed/tag/ai`

### Research Papers
- arXiv cs.AI: `http://export.arxiv.org/rss/cs.AI`
- arXiv cs.LG: `http://export.arxiv.org/rss/cs.LG`
- Papers With Code: `https://paperswithcode.com/feed`

### Company Announcements
- OpenAI: `https://openai.com/blog/rss.xml`
- Anthropic: `https://www.anthropic.com/news.rss`
- Google AI: `https://ai.googleblog.com/feeds/posts/default`
- DeepMind: `https://www.deepmind.com/blog/rss.xml`
