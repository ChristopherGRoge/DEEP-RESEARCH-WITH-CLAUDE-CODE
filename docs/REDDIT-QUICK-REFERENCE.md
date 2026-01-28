# Reddit Crawler - Quick Reference

## One-Line Commands

```bash
# Hot posts from r/programming with AI keywords
npm run cli -- crawler:reddit '{"subreddit":"programming","sortBy":"hot","limit":50,"minScore":10,"aiKeywords":["ai","assistant"],"sourceId":"reddit-prog"}'

# Top posts from this week
npm run cli -- crawler:reddit '{"subreddit":"ArtificialIntelligence","sortBy":"top","timeFrame":"week","limit":25,"sourceId":"reddit-ai"}'

# New posts (bleeding edge)
npm run cli -- crawler:reddit '{"subreddit":"LocalLLaMA","sortBy":"new","limit":50,"aiKeywords":["code","coding"],"sourceId":"reddit-llama"}'
```

## Configuration Quick Copy

### General Discovery
```json
{
  "subreddit": "programming",
  "sortBy": "hot",
  "limit": 50,
  "minScore": 10,
  "aiKeywords": ["ai", "assistant", "copilot", "llm"],
  "sourceId": "reddit-discovery"
}
```

### Competitive Intel
```json
{
  "subreddit": "programming",
  "sortBy": "new",
  "limit": 100,
  "aiKeywords": ["cursor", "copilot", "codeium", "tabnine"],
  "sourceId": "competitor-track"
}
```

### Weekly Top Quality
```json
{
  "subreddit": "ArtificialIntelligence",
  "sortBy": "top",
  "timeFrame": "week",
  "limit": 25,
  "minScore": 5,
  "sourceId": "weekly-top"
}
```

## CLI Commands

| Command | Purpose |
|---------|---------|
| `crawler:reddit` | Crawl single subreddit |
| `crawler:reddit-multi` | Crawl multiple subreddits |
| `crawler:reddit-comments` | Fetch post comments |
| `crawler:reddit-aggregate` | Combine results |

## Key Subreddits

| Subreddit | Best For | Sort |
|-----------|----------|------|
| `programming` | General coding | hot, top week |
| `ArtificialIntelligence` | AI tools | top week |
| `LocalLLaMA` | Self-hosted AI | hot, new |
| `MachineLearning` | ML frameworks | top week |
| `webdev` | Web dev tools | hot |
| `devops` | Enterprise tools | hot |

## Sort Options

- **hot** - Currently trending
- **new** - Most recent
- **top** - Highest scoring (add `timeFrame`)
- **rising** - Gaining traction

## Time Frames (for top)

- `hour`, `day`, `week` ⭐, `month`, `year`, `all`

## AI Keywords

```json
["ai", "copilot", "assistant", "code completion", "llm", "gpt", "claude"]
```

## Rate Limiting

- **60 requests/minute** (automatic)
- **2 seconds** between multi-subreddit crawls

## TypeScript Quick Start

```typescript
import { crawlSubreddit } from './tools/crawlers';

const result = await crawlSubreddit({
  subreddit: 'programming',
  sortBy: 'hot',
  limit: 50,
  minScore: 10,
  aiKeywords: ['ai', 'assistant'],
  sourceId: 'reddit-prog'
}, 'session-001');

console.log(`Found ${result.discoveries.length} tools`);
```

## Discovery Integration

```bash
# 1. Crawl
RESULT=$(npm run cli -- crawler:reddit '{...}')

# 2. Check exists
npm run cli -- entity:exists '{"projectId":"...","name":"Cursor"}'

# 3. Create entity
npm run cli -- entity:create '{"projectId":"...","name":"Cursor",...}'

# 4. Record assertion
npm run cli -- assertion:create '{"entityId":"...","claim":"...",...}'
```

## Error Codes

- **429** - Rate limit (wait 60s)
- **404** - Subreddit not found
- **403** - Banned/private

## Built-in Configs

```typescript
import { EXAMPLE_CONFIGS } from './tools/crawlers';

EXAMPLE_CONFIGS.aiProgramming  // r/programming hot
EXAMPLE_CONFIGS.aiTools        // r/AI top week
EXAMPLE_CONFIGS.localLLM       // r/LocalLLaMA hot
```

## Pattern Detection

Automatically finds:
- Direct: `Cursor`, `Copilot`, `Codeium`
- Qualified: `GitHub Copilot`, `Cursor AI`
- Comparisons: "Cursor vs Copilot"

## Test

```bash
npx ts-node src/tools/crawlers/reddit-test.ts
```

## Documentation

- **Full Guide**: `docs/REDDIT-CRAWLER.md`
- **Examples**: `src/tools/crawlers/reddit-examples.md`
- **Summary**: `docs/REDDIT-CRAWLER-SUMMARY.md`
