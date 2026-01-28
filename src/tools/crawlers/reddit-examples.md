# Reddit Crawler Examples

The Reddit crawler uses Reddit's free JSON endpoints to discover tools mentioned in communities. No API key required.

## Basic Usage

### 1. Crawl a Single Subreddit

```bash
npm run cli -- crawler:reddit '{
  "subreddit": "programming",
  "sortBy": "hot",
  "limit": 50,
  "minScore": 10,
  "aiKeywords": ["ai", "copilot", "assistant", "llm"],
  "sourceId": "reddit-programming",
  "crawlSessionId": "session-001"
}'
```

**Response:**
```json
{
  "success": true,
  "posts": [...],
  "discoveries": [
    {
      "toolName": "Cursor",
      "mentionContext": "I've been using Cursor for a few weeks and it's amazing...",
      "postTitle": "What's the best AI coding assistant?",
      "postUrl": "https://www.reddit.com/r/programming/comments/...",
      "score": 156,
      "created": "2026-01-10T..."
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

### 2. Crawl Multiple Subreddits

```bash
npm run cli -- crawler:reddit-multi '{
  "configs": [
    {
      "subreddit": "programming",
      "sortBy": "hot",
      "limit": 50,
      "minScore": 10,
      "aiKeywords": ["ai", "coding"],
      "sourceId": "reddit-programming",
      "crawlSessionId": "batch-001"
    },
    {
      "subreddit": "ArtificialIntelligence",
      "sortBy": "top",
      "timeFrame": "week",
      "limit": 25,
      "minScore": 5,
      "aiKeywords": ["tool", "coding"],
      "sourceId": "reddit-ai",
      "crawlSessionId": "batch-001"
    }
  ],
  "crawlSessionId": "batch-001"
}'
```

### 3. Fetch Post Comments

```bash
npm run cli -- crawler:reddit-comments '{
  "permalink": "/r/programming/comments/abc123/best_ai_tools",
  "limit": 10
}'
```

### 4. Aggregate Results

```bash
npm run cli -- crawler:reddit-aggregate '{
  "results": [
    {...crawl result 1...},
    {...crawl result 2...}
  ]
}'
```

**Response:**
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
    {"name": "Copilot", "mentions": 12}
  ],
  "allDiscoveries": [...]
}
```

## Subreddit Recommendations

### AI Coding Tools Research

| Subreddit | Best For | Recommended Sort |
|-----------|----------|------------------|
| `/r/programming` | General coding discussions | `hot`, `top` (week) |
| `/r/ArtificialIntelligence` | AI tools and trends | `top` (week/month) |
| `/r/LocalLLaMA` | Self-hosted AI tools | `hot`, `new` |
| `/r/MachineLearning` | ML tools and frameworks | `top` (week) |
| `/r/learnprogramming` | Beginner-friendly tools | `hot` |
| `/r/webdev` | Web development AI tools | `hot`, `top` (week) |
| `/r/coding` | General coding tools | `hot` |
| `/r/opensource` | Open source AI projects | `new`, `hot` |

### Federal/Enterprise Research

| Subreddit | Best For |
|-----------|----------|
| `/r/devops` | Enterprise deployment tools |
| `/r/sysadmin` | System administration, compliance |
| `/r/kubernetes` | Container orchestration |
| `/r/aws` | AWS services and integrations |
| `/r/azure` | Azure services and integrations |

## Configuration Options

### Sort Options

- `hot` - Currently popular posts (active discussions)
- `new` - Most recent posts (bleeding edge)
- `top` - Highest scoring posts (quality content)
- `rising` - Posts gaining traction

### Time Frames (for `top` sort)

- `hour` - Last hour
- `day` - Last 24 hours
- `week` - Last 7 days (recommended for discovery)
- `month` - Last 30 days
- `year` - Last 365 days
- `all` - All time

### AI Keywords

Common keywords for coding assistant discovery:

```typescript
const aiKeywords = [
  // General
  'ai', 'artificial intelligence', 'machine learning',

  // Coding assistants
  'copilot', 'assistant', 'code assistant', 'coding assistant',

  // AI tech
  'llm', 'gpt', 'claude', 'openai', 'anthropic',

  // Features
  'autocomplete', 'completion', 'code generation', 'refactoring',

  // IDE integration
  'vscode', 'intellij', 'ide', 'editor'
];
```

## Rate Limiting

The crawler respects Reddit's rate limits:
- **60 requests per minute**
- Automatic delays between requests
- User-Agent header included

## Discovery Patterns

The crawler looks for these patterns:

### Tool Name Patterns
- Direct mentions: `Cursor`, `Copilot`, `Codeium`
- With qualifiers: `GitHub Copilot`, `Cursor AI`
- In comparisons: "Cursor vs Copilot"

### Context Extraction
- 50 characters before and after mention
- Captures sentiment and usage context
- Preserves surrounding discussion

## Example Workflows

### 1. Weekly AI Tools Discovery

```bash
# Monday: Crawl hot posts
npm run cli -- crawler:reddit '{
  "subreddit": "programming",
  "sortBy": "hot",
  "limit": 100,
  "minScore": 5,
  "aiKeywords": ["ai", "assistant", "copilot"],
  "sourceId": "reddit-weekly",
  "crawlSessionId": "week-2026-01-12"
}'

# Check aggregated results
# Create entities for newly discovered tools
# Research pricing/features for high-mention tools
```

### 2. Competitive Intelligence

```bash
# Track mentions of specific competitors
npm run cli -- crawler:reddit '{
  "subreddit": "programming",
  "sortBy": "new",
  "limit": 100,
  "aiKeywords": ["cursor", "copilot", "codeium", "tabnine"],
  "sourceId": "competitor-tracking",
  "crawlSessionId": "competitive-2026-01-12"
}'

# Analyze sentiment from discoveries
# Track mention frequency over time
```

### 3. Feature Discovery

```bash
# Find discussions about specific features
npm run cli -- crawler:reddit '{
  "subreddit": "LocalLLaMA",
  "sortBy": "top",
  "timeFrame": "month",
  "limit": 50,
  "aiKeywords": ["offline", "self-hosted", "local", "privacy"],
  "sourceId": "feature-research",
  "crawlSessionId": "features-2026-01-12"
}'

# Read comments for detailed discussions
npm run cli -- crawler:reddit-comments '{
  "permalink": "/r/LocalLLaMA/comments/...",
  "limit": 20
}'
```

## Best Practices

1. **Use Specific Keywords** - Narrow focus improves discovery quality
2. **Filter by Score** - Ignore low-quality posts (minScore: 5-10)
3. **Check Comments** - Most valuable insights are in comments
4. **Multiple Subreddits** - Cross-reference mentions across communities
5. **Time Frames** - Use `top` + `week` for balanced quality/freshness
6. **Session IDs** - Track related crawls with consistent session IDs

## Limitations

- **No Deep Comment Crawling** - Only fetches top-level comments (not nested)
- **Rate Limited** - 60 requests/minute (one subreddit every 2 seconds)
- **Pattern Matching** - May miss creative tool mentions
- **No Authentication** - Cannot access private or age-gated content
- **JSON Endpoint Limits** - Max 100 posts per request

## Error Handling

The crawler returns structured errors:

```json
{
  "success": false,
  "error": "Reddit API returned 429: Too Many Requests",
  "posts": [],
  "discoveries": [],
  "metadata": {...}
}
```

Common errors:
- **429** - Rate limit exceeded (wait and retry)
- **404** - Subreddit doesn't exist or is private
- **403** - Subreddit is banned or quarantined
- **Network** - Connection issues (retry with exponential backoff)

## Integration with Research System

### Entity Discovery Flow

```bash
# 1. Crawl Reddit for tool mentions
result=$(npm run cli -- crawler:reddit '{...}')

# 2. For each discovery, check if entity exists
npm run cli -- entity:exists '{"projectId": "...", "name": "Cursor"}'

# 3. If not exists, create entity
npm run cli -- entity:create '{
  "projectId": "...",
  "name": "Cursor",
  "entityType": "tool",
  "url": "https://cursor.com"
}'

# 4. Create assertion from Reddit discovery
npm run cli -- assertion:create '{
  "entityId": "...",
  "claim": "Mentioned on r/programming with 156 upvotes",
  "category": "community",
  "sourceUrl": "https://www.reddit.com/r/...",
  "evidenceDescription": "Reddit post discussing best AI coding assistants"
}'
```

## Future Enhancements

Potential additions:
- Comment sentiment analysis
- Trending tool tracking over time
- Subreddit network analysis (cross-posting patterns)
- User influence scoring (high-karma users)
- Flair-based filtering (e.g., "Question", "Discussion")
