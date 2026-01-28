# Reddit Crawler Implementation Summary

## What Was Built

A complete Reddit crawler for discovering AI coding tools mentioned in community discussions, using Reddit's free JSON endpoints (no API key required).

## Files Created

### Core Implementation
- **`src/tools/crawlers/reddit-crawler.ts`** (470 lines)
  - Main crawler implementation
  - Pattern matching for tool detection
  - Rate limiting (60 req/min)
  - Multi-subreddit support
  - Result aggregation

### Documentation
- **`docs/REDDIT-CRAWLER.md`** - Complete user guide
- **`src/tools/crawlers/reddit-examples.md`** - Usage examples and best practices

### Testing
- **`src/tools/crawlers/reddit-test.ts`** - Manual test script

### Integration
- Updated **`src/tools/crawlers/index.ts`** - Exports for the toolkit
- Updated **`src/tools/index.ts`** - Main tools export
- Updated **`src/cli.ts`** - Added 4 CLI commands

## Features Implemented

### Core Functionality
✅ Crawl single subreddit with filtering
✅ Crawl multiple subreddits in sequence
✅ Fetch post comments for context
✅ Aggregate discoveries across crawls
✅ Automatic rate limiting (60/min)
✅ Pattern matching for tool names
✅ Context extraction (50 chars before/after)
✅ Score-based filtering
✅ Keyword-based filtering

### Configuration Options
✅ Sort by: hot, new, top, rising
✅ Time frames for 'top': hour, day, week, month, year, all
✅ Limit posts (1-100)
✅ Minimum score threshold
✅ AI keyword filters
✅ Session ID tracking

### Data Structures
✅ `RedditCrawlerConfig` - Input configuration
✅ `RedditPost` - Reddit post data
✅ `RedditCrawlResult` - Crawl results
✅ `RedditToolDiscovery` - Discovered tools with context

### Pattern Detection
✅ Direct tool mentions (Cursor, Copilot, etc.)
✅ Code assistants (copilot, codeium, tabnine, etc.)
✅ IDEs with AI (cursor, replit, github codespaces)
✅ AI coding tools (aider, continue, mutableai)
✅ Tools with qualifiers ([Name] AI/assistant/copilot)

### Built-in Configurations
✅ `aiProgramming` - r/programming hot AI discussions
✅ `aiTools` - r/ArtificialIntelligence top weekly
✅ `localLLM` - r/LocalLLaMA hot posts

## CLI Commands Added

### 1. `crawler:reddit`
Crawl a single subreddit

```bash
npm run cli -- crawler:reddit '{
  "subreddit": "programming",
  "sortBy": "hot",
  "limit": 50,
  "minScore": 10,
  "aiKeywords": ["ai", "assistant"],
  "sourceId": "reddit-prog"
}'
```

### 2. `crawler:reddit-multi`
Crawl multiple subreddits

```bash
npm run cli -- crawler:reddit-multi '{
  "configs": [
    {"subreddit": "programming", "sortBy": "hot", ...},
    {"subreddit": "ArtificialIntelligence", "sortBy": "top", ...}
  ]
}'
```

### 3. `crawler:reddit-comments`
Fetch comments from a post

```bash
npm run cli -- crawler:reddit-comments '{
  "permalink": "/r/programming/comments/abc123/...",
  "limit": 10
}'
```

### 4. `crawler:reddit-aggregate`
Aggregate multiple crawl results

```bash
npm run cli -- crawler:reddit-aggregate '{
  "results": [...]
}'
```

## TypeScript API

### Basic Usage

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
  console.log(`${disc.toolName}: ${disc.mentionContext}`);
});
```

### Multi-Subreddit

```typescript
import { crawlMultipleSubreddits, aggregateRedditDiscoveries } from './tools/crawlers';

const configs = [
  { subreddit: 'programming', sortBy: 'hot', limit: 50, sourceId: 's1' },
  { subreddit: 'ArtificialIntelligence', sortBy: 'top', timeFrame: 'week', limit: 25, sourceId: 's2' }
];

const results = await crawlMultipleSubreddits(configs, 'batch-001');
const aggregated = aggregateRedditDiscoveries(results);

console.log('Top tools:', aggregated.topTools);
```

## How It Works

### 1. Build Reddit JSON URL

```
https://www.reddit.com/r/{subreddit}/{sortBy}.json?limit={limit}&t={timeFrame}
```

### 2. Fetch with User-Agent

```typescript
fetch(url, {
  headers: {
    'User-Agent': 'DeepResearch/1.0 (research tool for entity discovery)'
  }
})
```

### 3. Parse Response

```typescript
data.data.children
  .filter(child => child.kind === 't3') // t3 = post
  .map(child => ({
    id: child.data.id,
    title: child.data.title,
    score: child.data.score,
    // ...
  }))
```

### 4. Apply Filters

- Score threshold: `post.score >= minScore`
- Keywords: Check if post title/text contains keywords

### 5. Extract Tool Mentions

- Match against regex patterns
- Extract context (50 chars before/after)
- Normalize tool names
- Deduplicate within post

### 6. Return Results

- Posts that passed filters
- Tool discoveries with context
- Metadata (counts, subreddit, etc.)

## Rate Limiting Implementation

```typescript
const REDDIT_RATE_LIMIT = 60; // requests per minute
let lastRequestTime = 0;

async function rateLimitedFetch(url: string): Promise<Response> {
  const now = Date.now();
  const timeSinceLastRequest = now - lastRequestTime;
  const minDelay = 1000 / (REDDIT_RATE_LIMIT / 60); // ms between requests

  if (timeSinceLastRequest < minDelay) {
    await sleep(minDelay - timeSinceLastRequest);
  }

  lastRequestTime = Date.now();
  return fetch(url, {...});
}
```

## Recommended Subreddits

### AI Coding Tools
- `/r/programming` - General coding (hot, top week)
- `/r/ArtificialIntelligence` - AI tools (top week/month)
- `/r/LocalLLaMA` - Self-hosted AI (hot, new)
- `/r/MachineLearning` - ML frameworks (top week)
- `/r/learnprogramming` - Beginner tools (hot)
- `/r/webdev` - Web dev tools (hot, top week)

### Enterprise/Federal
- `/r/devops` - Deployment tools
- `/r/sysadmin` - Admin & compliance
- `/r/kubernetes` - Container orchestration
- `/r/aws` - AWS integrations
- `/r/azure` - Azure integrations

## Integration with Research System

### Discovery Workflow

```bash
# 1. Crawl Reddit
result=$(npm run cli -- crawler:reddit '{...}')

# 2. For each discovery, check if entity exists
npm run cli -- entity:exists '{"projectId": "...", "name": "Cursor"}'

# 3. Create entity if new
npm run cli -- entity:create '{"projectId": "...", "name": "Cursor", ...}'

# 4. Record discovery as assertion
npm run cli -- assertion:create '{
  "entityId": "...",
  "claim": "Mentioned on r/programming with 156 upvotes",
  "category": "community",
  "sourceUrl": "https://www.reddit.com/r/..."
}'
```

## Example Output

### Crawl Result

```json
{
  "success": true,
  "posts": [
    {
      "id": "abc123",
      "title": "What's the best AI coding assistant?",
      "score": 156,
      "numComments": 48,
      "permalink": "https://www.reddit.com/r/programming/comments/..."
    }
  ],
  "discoveries": [
    {
      "toolName": "Cursor",
      "mentionContext": "I've been using Cursor for a few weeks and it's amazing...",
      "postTitle": "What's the best AI coding assistant?",
      "postUrl": "https://www.reddit.com/r/...",
      "score": 156,
      "created": "2026-01-12T..."
    }
  ],
  "metadata": {
    "subreddit": "programming",
    "sortBy": "hot",
    "postsProcessed": 45,
    "toolMentionsFound": 12
  }
}
```

### Aggregated Results

```json
{
  "toolCounts": {
    "Cursor": 15,
    "Copilot": 12,
    "Codeium": 8,
    "Tabnine": 5
  },
  "topTools": [
    {"name": "Cursor", "mentions": 15},
    {"name": "Copilot", "mentions": 12},
    {"name": "Codeium", "mentions": 8}
  ],
  "allDiscoveries": [...]
}
```

## Testing

### Manual Test

```bash
npx ts-node src/tools/crawlers/reddit-test.ts
```

### CLI Test

```bash
npm run cli -- crawler:reddit '{
  "subreddit": "programming",
  "sortBy": "hot",
  "limit": 10,
  "sourceId": "test"
}'
```

## Technical Details

### Dependencies
- No additional dependencies required
- Uses built-in `fetch` API
- Requires `prisma` client (already in project)

### Type Safety
- Full TypeScript type definitions
- Exported types for all data structures
- Type-safe configuration objects

### Error Handling
- Structured error responses
- Network error catching
- Rate limit detection
- Invalid subreddit handling

### Performance
- Automatic rate limiting
- Efficient pattern matching
- Minimal memory footprint
- Parallel crawl support (with delays)

## Limitations

1. **Max 100 posts per request** - Reddit API limit
2. **No nested comments** - Only top-level comments
3. **Rate limited** - 60 requests per minute
4. **Pattern matching** - May miss creative tool mentions
5. **No auth** - Cannot access private subreddits

## Future Enhancements

Potential additions:

- [ ] Comment sentiment analysis
- [ ] User influence scoring (karma-weighted)
- [ ] Flair-based filtering
- [ ] Cross-post detection
- [ ] Trending detection over time
- [ ] Automatic entity creation
- [ ] Screenshot capture for evidence

## Comparison to Other Crawlers

### Reddit vs HN
- **Reddit**: Community discussions, sentiment, broader topics
- **HN**: Tech-focused, startup launches, Show HN

### Reddit vs RSS
- **Reddit**: User discussions, votes, sentiment
- **RSS**: Official announcements, blog posts, releases

### Reddit vs Nitter (Twitter/X)
- **Reddit**: Long-form discussions, context
- **Nitter**: Real-time updates, short mentions

## Best Practices

1. **Use specific keywords** - Avoid overly broad terms
2. **Filter by score** - 5-10+ upvotes for quality
3. **Check comments** - Most insights in comments
4. **Multiple subreddits** - Cross-reference mentions
5. **Time frames** - Use `top` + `week` for balance
6. **Session IDs** - Track related crawls
7. **Rate limiting** - Respect Reddit's limits

## Example Use Cases

### Weekly Discovery
Monitor r/programming weekly for new AI tools

### Competitive Intelligence
Track competitor mentions across subreddits

### Feature Research
Find discussions about specific features (offline, privacy, etc.)

### Sentiment Analysis
Gauge community opinion on tools

### Trend Detection
Identify rising tools before they become mainstream

## Resources

- **Documentation**: `docs/REDDIT-CRAWLER.md`
- **Examples**: `src/tools/crawlers/reddit-examples.md`
- **Test**: `src/tools/crawlers/reddit-test.ts`
- **Code**: `src/tools/crawlers/reddit-crawler.ts`

## Summary

The Reddit crawler is a complete, production-ready tool for discovering AI coding assistants mentioned in community discussions. It uses Reddit's free JSON endpoints, respects rate limits, and integrates seamlessly with the Deep Research toolkit.

**Status**: ✅ Complete and tested
**Lines of Code**: ~470 (core) + ~350 (examples) + ~600 (docs)
**Test Coverage**: Manual test script provided
**Integration**: CLI commands + TypeScript API
