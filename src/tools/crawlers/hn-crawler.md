# Hacker News Crawler

Discovers AI tools and product launches from Hacker News using their free API.

## Features

- **No API Key Required**: Uses HN's free public API
- **Parallel Fetching**: Concurrent story fetching with rate limiting
- **Smart Filtering**: Filter by score, AI keywords, and launch indicators
- **Context Extraction**: Includes story text and top comments
- **Database Integration**: Auto-persists discoveries as entities and assertions

## Quick Start

```bash
# Crawl Show HN stories (most likely to be product launches)
npm run cli -- crawl:show-hn '{"projectId": "abc123", "limit": 50}'

# Crawl top stories with AI filter
npm run cli -- crawl:top-ai '{"projectId": "abc123", "limit": 100}'

# Custom crawl with full control
npm run cli -- crawl:hn '{
  "endpoint": "topstories",
  "limit": 100,
  "minScore": 50,
  "aiKeywords": ["AI", "LLM", "GPT", "Claude"],
  "commentLimit": 5
}'

# Crawl and persist in one step
npm run cli -- crawl:hn-persist '{
  "projectId": "abc123",
  "endpoint": "topstories",
  "limit": 100,
  "minScore": 50
}'
```

## CLI Commands

### crawl:hn
Crawl HN stories without persisting to database.

```bash
npm run cli -- crawl:hn '{
  "endpoint": "topstories",
  "limit": 100,
  "minScore": 10,
  "aiKeywords": ["AI", "ML", "LLM"],
  "concurrency": 10,
  "commentLimit": 5
}'
```

**Parameters:**
- `endpoint`: Which HN feed to crawl (`topstories`, `newstories`, `beststories`, `showstories`, `askstories`)
- `limit`: Max stories to fetch (default: 100)
- `minScore`: Minimum story score (default: 10)
- `aiKeywords`: Keywords to filter stories (default: HN_AI_KEYWORDS)
- `concurrency`: Parallel fetch limit (default: 10)
- `commentLimit`: Top N comments to fetch (default: 5, 0 to disable)

**Returns:**
```json
{
  "success": true,
  "storiesProcessed": 100,
  "storiesFiltered": 15,
  "entitiesDiscovered": 12,
  "discoveries": [
    {
      "name": "Cursor",
      "url": "https://cursor.com",
      "hnStoryUrl": "https://news.ycombinator.com/item?id=12345678",
      "title": "Show HN: Cursor – AI code editor",
      "score": 250,
      "isLaunch": true,
      "matchedKeywords": ["AI", "code", "GPT"],
      "context": "Story text + top comments..."
    }
  ],
  "errors": []
}
```

### crawl:hn-persist
Crawl and persist discoveries to database.

```bash
npm run cli -- crawl:hn-persist '{
  "projectId": "abc123",
  "endpoint": "showstories",
  "limit": 50,
  "minScore": 5
}'
```

**Returns:** Same as `crawl:hn` plus:
```json
{
  "entitiesCreated": 12,
  "assertionsCreated": 12
}
```

### crawl:show-hn
Quick crawl of Show HN stories (product launches).

```bash
npm run cli -- crawl:show-hn '{"projectId": "abc123", "limit": 50}'
```

### crawl:top-ai
Quick crawl of top stories with AI filter.

```bash
npm run cli -- crawl:top-ai '{"projectId": "abc123", "limit": 100}'
```

## HN Endpoints

| Endpoint | Description | Best For |
|----------|-------------|----------|
| `showstories` | Show HN posts | Product launches, new tools |
| `topstories` | Front page stories | Trending AI discussions |
| `newstories` | Latest stories | Early discovery |
| `beststories` | All-time best | High-quality content |
| `askstories` | Ask HN posts | Community questions |

## Default AI Keywords

The crawler includes 30+ AI-related keywords:
- AI, ML, LLM, GPT, Claude, Anthropic, OpenAI
- Copilot, Cursor, generative, machine learning
- deep learning, neural, transformer, code gen
- agent, RAG, vector database, embedding
- Show HN, Launch HN

You can override with custom keywords via the `aiKeywords` parameter.

## How It Works

1. **Fetch Story IDs**: Get up to 500 story IDs from HN endpoint
2. **Parallel Fetch**: Retrieve story details in batches (default: 10 concurrent)
3. **Score Filter**: Keep stories >= minScore
4. **Keyword Filter**: Match AI keywords in title/url/text
5. **Extract Tools**: Parse tool names from titles using heuristics
6. **Fetch Comments**: Get top N comments for context (optional)
7. **Persist**: Create entities and assertions (if using persist commands)

## Launch Detection

The crawler automatically detects product launches using these indicators:
- "Show HN" prefix
- "Launch HN" prefix
- Keywords: introducing, released, announcing, built, created
- Phrases: "new tool", "we built", "I made"

Discoveries with `isLaunch: true` are more likely to be new products.

## Tool Name Extraction

The crawler uses heuristics to extract tool names from HN titles:
- Remove prefixes: "Show HN:", "Introducing", etc.
- Extract text before dash/hyphen
- Extract text before parenthesis
- Extract text before "is", "a", "the"
- Take first 3-5 words as fallback

Examples:
- "Show HN: Cursor – AI code editor" → "Cursor"
- "Introducing TabNine (AI completions)" → "TabNine"
- "Copilot is changing how we code" → "Copilot"

## Rate Limits

HN's API is very generous:
- No authentication required
- No documented rate limits
- Parallel fetching is safe with reasonable concurrency (10-20)

The crawler uses concurrency=10 by default to be respectful.

## Database Schema

Discoveries are persisted as:

**Entity:**
- name: Extracted tool name
- url: Tool website URL
- description: HN story title
- entityType: "tool"

**Assertion:**
- claim: "Discovered on Hacker News with {score} points"
- category: "discovery"
- evidenceDescription: HN story URL, matched keywords, context
- status: "CLAIM"

## Example Workflow

```bash
# 1. Create a research project
npm run cli -- project:create '{
  "name": "HN AI Tool Discovery",
  "description": "Discover AI tools from Hacker News"
}'

# 2. Crawl Show HN for launches
npm run cli -- crawl:show-hn '{"projectId": "abc123", "limit": 100}'

# 3. Crawl top stories for trending tools
npm run cli -- crawl:top-ai '{"projectId": "abc123", "limit": 100}'

# 4. Check entities discovered
npm run cli -- entity:list '{"projectId": "abc123"}'

# 5. For each entity, extract detailed info
npm run cli -- extract:fetch '{"url": "https://tool.com/pricing", "entityId": "xyz"}'
```

## Advanced Usage

### Custom Keywords

```bash
npm run cli -- crawl:hn '{
  "endpoint": "topstories",
  "limit": 50,
  "aiKeywords": ["kubernetes", "docker", "terraform", "DevOps"],
  "projectId": "abc123"
}'
```

### No Comments (Faster)

```bash
npm run cli -- crawl:hn-persist '{
  "projectId": "abc123",
  "endpoint": "topstories",
  "limit": 200,
  "commentLimit": 0
}'
```

### High Score Filter

```bash
npm run cli -- crawl:hn '{
  "endpoint": "beststories",
  "limit": 50,
  "minScore": 500
}'
```

## Troubleshooting

**No discoveries found:**
- Lower `minScore` (try 5-10 for Show HN, 20-50 for top stories)
- Check `aiKeywords` are relevant
- Try different endpoints (showstories often has more tools)

**Slow crawling:**
- Reduce `commentLimit` (0 to disable)
- Reduce `limit` (fewer stories to fetch)
- Increase `concurrency` carefully (10-20 is safe)

**Wrong tool names:**
- Tool name extraction uses heuristics and isn't perfect
- You can manually update entity names after discovery
- Use the HN story URL in evidenceDescription to verify

## API Reference

See `hn-crawler.ts` for full TypeScript interfaces and function signatures.
