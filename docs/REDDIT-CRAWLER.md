# Reddit Crawler

A tool discovery crawler that uses Reddit's free JSON endpoints to find AI coding tools mentioned in community discussions.

## Overview

The Reddit crawler monitors relevant subreddits for mentions of AI coding assistants, IDEs, and development tools. Unlike Reddit's official API (which requires authentication), this uses their public JSON endpoints.

## Features

- **No API Key Required** - Uses Reddit's public JSON endpoints
- **Rate Limited** - Respects Reddit's 60 req/min limit automatically
- **Pattern Matching** - Detects tool names from multiple patterns
- **Context Extraction** - Captures surrounding text for sentiment analysis
- **Multi-Subreddit** - Crawl multiple subreddits in one session
- **Aggregation** - Combine and rank discoveries across crawls

## Installation

Already included in the Deep Research toolkit. No additional dependencies needed.

## Basic Usage

### CLI Commands

```bash
# Crawl a single subreddit
npm run cli -- crawler:reddit '{
  "subreddit": "programming",
  "sortBy": "hot",
  "limit": 50,
  "minScore": 10,
  "aiKeywords": ["ai", "copilot", "assistant"],
  "sourceId": "reddit-programming"
}'

# Crawl multiple subreddits
npm run cli -- crawler:reddit-multi '{
  "configs": [
    {
      "subreddit": "programming",
      "sortBy": "hot",
      "limit": 50,
      "sourceId": "reddit-prog"
    },
    {
      "subreddit": "ArtificialIntelligence",
      "sortBy": "top",
      "timeFrame": "week",
      "limit": 25,
      "sourceId": "reddit-ai"
    }
  ]
}'

# Fetch comments from a specific post
npm run cli -- crawler:reddit-comments '{
  "permalink": "/r/programming/comments/abc123/best_ai_tools",
  "limit": 10
}'

# Aggregate results from multiple crawls
npm run cli -- crawler:reddit-aggregate '{
  "results": [...]
}'
```

### TypeScript API

```typescript
import { crawlSubreddit, RedditCrawlerConfig } from './tools/crawlers';

const config: RedditCrawlerConfig = {
  subreddit: 'programming',
  sortBy: 'hot',
  limit: 50,
  minScore: 10,
  aiKeywords: ['ai', 'copilot', 'assistant'],
  sourceId: 'reddit-programming'
};

const result = await crawlSubreddit(config, 'session-001');

console.log(`Found ${result.discoveries.length} tool mentions`);
result.discoveries.forEach(disc => {
  console.log(`${disc.toolName} (${disc.score} upvotes)`);
});
```

## Configuration

### RedditCrawlerConfig

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `subreddit` | string | Yes | Subreddit name (without /r/) |
| `sortBy` | 'hot' \| 'new' \| 'top' \| 'rising' | Yes | How to sort posts |
| `timeFrame` | 'hour' \| 'day' \| 'week' \| 'month' \| 'year' \| 'all' | No | Time frame for 'top' sort |
| `limit` | number | No | Max posts to fetch (1-100, default: 25) |
| `minScore` | number | No | Minimum upvote score filter |
| `aiKeywords` | string[] | No | Keywords to filter posts |
| `sourceId` | string | Yes | Identifier for this source |

### Sort Options

- **hot** - Currently trending posts (active discussions)
- **new** - Most recent posts (bleeding edge)
- **top** - Highest scoring posts (quality content)
- **rising** - Posts gaining traction quickly

Use `timeFrame` with `top` to specify period (e.g., "week", "month").

### Example Configurations

Built-in configurations available via `EXAMPLE_CONFIGS`:

```typescript
import { EXAMPLE_CONFIGS } from './tools/crawlers';

// Hot AI programming discussions
EXAMPLE_CONFIGS.aiProgramming

// Top AI tools from this week
EXAMPLE_CONFIGS.aiTools

// Local LLM discussions
EXAMPLE_CONFIGS.localLLM
```

## Recommended Subreddits

### AI Coding Tools

| Subreddit | Focus | Best Sort |
|-----------|-------|-----------|
| `/r/programming` | General coding | hot, top (week) |
| `/r/ArtificialIntelligence` | AI tools & trends | top (week/month) |
| `/r/LocalLLaMA` | Self-hosted AI | hot, new |
| `/r/MachineLearning` | ML frameworks | top (week) |
| `/r/learnprogramming` | Beginner tools | hot |
| `/r/webdev` | Web dev tools | hot, top (week) |
| `/r/coding` | General tools | hot |
| `/r/opensource` | Open source | new, hot |

### Enterprise/Federal

| Subreddit | Focus |
|-----------|-------|
| `/r/devops` | Deployment tools |
| `/r/sysadmin` | Admin & compliance |
| `/r/kubernetes` | Container orchestration |
| `/r/aws` | AWS integrations |
| `/r/azure` | Azure integrations |

## Response Format

### RedditCrawlResult

```typescript
{
  success: boolean,
  posts: RedditPost[],
  discoveries: RedditToolDiscovery[],
  error?: string,
  crawlSessionId: string,
  metadata: {
    subreddit: string,
    sortBy: string,
    postsProcessed: number,
    toolMentionsFound: number
  }
}
```

### RedditPost

```typescript
{
  id: string,
  title: string,
  selftext: string,
  url: string,
  permalink: string,
  score: number,
  numComments: number,
  created: Date,
  author: string,
  flair?: string
}
```

### RedditToolDiscovery

```typescript
{
  toolName: string,
  mentionContext: string,
  postTitle: string,
  postUrl: string,
  score: number,
  created: Date
}
```

## Pattern Matching

The crawler detects tools using these patterns:

### Direct Mentions
- `Cursor`, `Copilot`, `Codeium`, `Tabnine`
- Case-insensitive matching

### With Qualifiers
- `GitHub Copilot`, `Cursor AI`, `Amazon Q`

### In Comparisons
- "Cursor vs Copilot"
- "best between Codeium and Tabnine"

### Tool Detection Patterns

```typescript
// Code assistants
/\b(cursor|copilot|codeium|tabnine|cody|amazon q)\b/gi

// IDEs with AI
/\b(cursor|replit|github codespaces|gitpod)\b/gi

// AI coding tools
/\b(aider|continue|mutableai|bloop|phind)\b/gi

// Tools with qualifiers
/\b([A-Z][a-zA-Z]+)\s+(?:ai|assistant|copilot)\b/gi
```

## Rate Limiting

- **60 requests per minute** (Reddit's limit)
- Automatic delay between requests
- 2 second wait between multi-subreddit crawls
- User-Agent header included automatically

```typescript
// Rate limiting is automatic
const result = await crawlSubreddit(config, 'session-001');
// Next request will wait if needed
```

## Error Handling

Common errors:

| Error Code | Meaning | Solution |
|------------|---------|----------|
| 429 | Rate limit exceeded | Wait 60 seconds, retry |
| 404 | Subreddit not found | Check spelling, may be private |
| 403 | Subreddit banned | Cannot access |
| Network | Connection issues | Retry with backoff |

```typescript
const result = await crawlSubreddit(config, 'session-001');

if (!result.success) {
  console.error(`Crawl failed: ${result.error}`);
  // Handle error
}
```

## Integration Examples

### Discovery Workflow

```bash
#!/bin/bash

# 1. Crawl Reddit for tool mentions
RESULT=$(npm run cli -- crawler:reddit '{
  "subreddit": "programming",
  "sortBy": "hot",
  "limit": 100,
  "minScore": 10,
  "aiKeywords": ["ai", "assistant"],
  "sourceId": "reddit-discovery"
}')

# 2. For each discovered tool
# Check if entity exists
npm run cli -- entity:exists '{"projectId": "...", "name": "Cursor"}'

# 3. If not exists, create
npm run cli -- entity:create '{
  "projectId": "...",
  "name": "Cursor",
  "entityType": "tool",
  "url": "https://cursor.com"
}'

# 4. Record discovery as assertion
npm run cli -- assertion:create '{
  "entityId": "...",
  "claim": "Mentioned on r/programming with 156 upvotes",
  "category": "community",
  "sourceUrl": "https://www.reddit.com/r/...",
  "evidenceDescription": "Post: What is the best AI coding assistant?"
}'
```

### Competitive Intelligence

Track competitor mentions over time:

```typescript
import { crawlSubreddit } from './tools/crawlers';

const competitors = ['cursor', 'copilot', 'codeium', 'tabnine'];

const result = await crawlSubreddit({
  subreddit: 'programming',
  sortBy: 'new',
  limit: 100,
  aiKeywords: competitors,
  sourceId: 'competitor-tracking'
}, 'weekly-scan');

// Analyze mention frequency
const mentions = new Map();
result.discoveries.forEach(disc => {
  const count = mentions.get(disc.toolName) || 0;
  mentions.set(disc.toolName, count + 1);
});

console.log('Mentions this week:');
mentions.forEach((count, tool) => {
  console.log(`${tool}: ${count}`);
});
```

### Aggregation Across Subreddits

```typescript
import { crawlMultipleSubreddits, aggregateRedditDiscoveries } from './tools/crawlers';

const configs = [
  { subreddit: 'programming', sortBy: 'hot', limit: 50, sourceId: 's1' },
  { subreddit: 'ArtificialIntelligence', sortBy: 'top', timeFrame: 'week', limit: 25, sourceId: 's2' },
  { subreddit: 'LocalLLaMA', sortBy: 'hot', limit: 50, sourceId: 's3' }
];

const results = await crawlMultipleSubreddits(configs, 'multi-session');

const aggregated = aggregateRedditDiscoveries(results);

console.log('Top tools across all subreddits:');
aggregated.topTools.forEach(({ name, mentions }) => {
  console.log(`${name}: ${mentions} mentions`);
});
```

## Best Practices

### 1. Use Specific Keywords

```typescript
// Good - specific to AI coding
aiKeywords: ['copilot', 'code completion', 'ai assistant', 'llm']

// Bad - too broad
aiKeywords: ['ai', 'tool']
```

### 2. Filter by Score

Ignore low-quality posts:

```typescript
minScore: 10 // Only posts with 10+ upvotes
```

### 3. Check Comments

Most valuable insights are in comments:

```typescript
const result = await crawlSubreddit(config, 'session-001');

for (const post of result.posts.slice(0, 5)) {
  const comments = await fetchPostComments(post.permalink, 10);
  // Analyze comments
}
```

### 4. Time-Based Sorting

For discovery: `sortBy: 'top', timeFrame: 'week'`
For monitoring: `sortBy: 'new'`

### 5. Session IDs

Track related crawls:

```typescript
const sessionId = `weekly-scan-${new Date().toISOString().split('T')[0]}`;
const result = await crawlSubreddit(config, sessionId);
```

## Limitations

1. **Max 100 posts per request** - Reddit's limit
2. **No deep comment nesting** - Only top-level comments
3. **Rate limited** - 60 requests/minute
4. **Pattern matching** - May miss creative tool names
5. **No authentication** - Cannot access private/age-gated content

## Advanced Usage

### Custom Pattern Matching

Add your own patterns:

```typescript
import { crawlSubreddit } from './tools/crawlers';

const result = await crawlSubreddit(config, 'session-001');

// Custom pattern for your use case
const customPattern = /\b(tool-name|variation)\b/gi;

result.posts.forEach(post => {
  const content = `${post.title} ${post.selftext}`;
  const matches = content.matchAll(customPattern);
  // Process custom matches
});
```

### Sentiment Analysis

```typescript
const result = await crawlSubreddit(config, 'session-001');

const sentiment = result.discoveries.map(disc => {
  const context = disc.mentionContext.toLowerCase();
  const isPositive =
    context.includes('love') ||
    context.includes('great') ||
    context.includes('best');
  const isNegative =
    context.includes('bad') ||
    context.includes('worst') ||
    context.includes('terrible');

  return {
    tool: disc.toolName,
    positive: isPositive,
    negative: isNegative,
    score: disc.score
  };
});
```

### Trending Detection

Track mentions over time:

```typescript
import { crawlSubreddit } from './tools/crawlers';

const history = [];

// Run daily
setInterval(async () => {
  const result = await crawlSubreddit(config, `daily-${Date.now()}`);

  const snapshot = {
    date: new Date(),
    mentions: result.discoveries.reduce((acc, disc) => {
      acc[disc.toolName] = (acc[disc.toolName] || 0) + 1;
      return acc;
    }, {})
  };

  history.push(snapshot);

  // Detect trending tools
  if (history.length >= 7) {
    const weekAgo = history[history.length - 7];
    const today = history[history.length - 1];

    // Compare mention counts
    Object.keys(today.mentions).forEach(tool => {
      const prevCount = weekAgo.mentions[tool] || 0;
      const currCount = today.mentions[tool];
      const growth = ((currCount - prevCount) / prevCount) * 100;

      if (growth > 50) {
        console.log(`🔥 ${tool} is trending (+${growth.toFixed(0)}%)`);
      }
    });
  }
}, 86400000); // Daily
```

## Testing

Run the test file:

```bash
npx ts-node src/tools/crawlers/reddit-test.ts
```

Expected output:
```
Testing Reddit crawler...

Configuration: {...}

Fetching from Reddit...

=== RESULTS ===
Success: true
Posts fetched: 10
Tool mentions found: 3

=== DISCOVERIES ===
1. Cursor
   Score: 156
   Post: What's the best AI coding assistant?
   Context: I've been using Cursor for a few weeks and it's amazing...
   URL: https://www.reddit.com/r/programming/comments/...
```

## Troubleshooting

### No discoveries found

- Try broader keywords
- Lower `minScore` threshold
- Check different `sortBy` options
- Try different subreddits

### Rate limit errors

- Wait 60 seconds between crawls
- Reduce `limit` parameter
- Space out multi-subreddit crawls

### Network errors

- Check internet connection
- Verify subreddit exists and is public
- Retry with exponential backoff

## Future Enhancements

Potential additions:

- [ ] Comment sentiment scoring
- [ ] User influence analysis (karma-weighted)
- [ ] Flair-based filtering
- [ ] Cross-posting detection
- [ ] Trending tool detection
- [ ] Automatic entity creation
- [ ] Historical tracking database

## See Also

- [HN Crawler](./HN-CRAWLER.md) - Hacker News crawler
- [RSS Crawler](./RSS-CRAWLER.md) - RSS feed crawler
- [CLAUDE.md](../CLAUDE.md) - Full research system documentation
- [Reddit Examples](../src/tools/crawlers/reddit-examples.md) - More examples
