# Web Crawlers

Web discovery tools for finding AI tools, products, and entities across various sources.

Each crawler targets a specific platform and extracts tool mentions, announcements, and discussions.

## Available Crawlers

### 1. Nitter Crawler (Twitter/X)

**File:** `nitter-crawler.ts`

Crawls Twitter/X content via open-source Nitter frontends to discover tool announcements and discussions.

#### Features

- **Account Timeline Crawling** via RSS feeds
- **Search Crawling** via HTML parsing
- **Automatic Failover** across multiple Nitter instances
- **Tool Discovery** from URLs, announcements, and GitHub mentions
- **Confidence Scoring** for discovered entities

#### Usage

```typescript
import { crawlAccount, crawlSearch } from './nitter-crawler';

// Crawl an account timeline
const result = await crawlAccount({
  handle: 'github',           // Without @
  sourceId: 'source-123',     // Source record ID
  maxItems: 50                // Max tweets to process
});

// Search for topics
const searchResult = await crawlSearch({
  query: 'AI coding assistant',
  sourceId: 'source-456',
  maxItems: 30
});

// Access discoveries
result.discoveries.forEach(d => {
  console.log(`Found: ${d.name} at ${d.url}`);
  console.log(`Confidence: ${d.confidence}`);
  console.log(`Context: ${d.mentionContext}`);
});
```

#### Discovery Types

The crawler extracts entities using multiple patterns:

| Pattern | Description | Confidence | Example |
|---------|-------------|------------|---------|
| **Tool URLs** | Direct links to .ai/.io/.dev domains | 0.9 | `https://cursor.com` |
| **GitHub Repos** | Repository mentions | 0.8 | `@openai/whisper` or `github.com/user/repo` |
| **Announcements** | "Introducing X" patterns | 0.7 | "Introducing Cursor - an AI editor" |
| **Tool Names** | Capitalized names with context | 0.5 | "Cursor is a new AI tool" |

#### Nitter Instances

The crawler automatically tries multiple instances:

- `nitter.poast.org`
- `nitter.privacydev.net`
- `xcancel.com`
- `nitter.unixfox.eu`
- `nitter.net`
- `nitter.fdn.fr`
- `nitter.1d4.us`
- `nitter.kavin.rocks`

Use `testAllInstances()` to check which are currently available.

#### API Reference

##### `crawlAccount(config: NitterAccountConfig): Promise<CrawlResult>`

Crawl a Twitter account's timeline via RSS.

**Config:**
- `handle: string` - Twitter handle without @
- `sourceId: string` - Database source ID
- `maxItems?: number` - Max tweets (default: 50)

**Returns:**
- `success: boolean` - Whether crawl succeeded
- `instanceUsed?: string` - Which Nitter instance was used
- `tweets: Tweet[]` - Parsed tweets
- `discoveries: Discovery[]` - Extracted tool mentions
- `error?: string` - Error message if failed

##### `crawlSearch(config: NitterSearchConfig): Promise<CrawlResult>`

Search Twitter via Nitter and extract results.

**Config:**
- `query: string` - Search query
- `sourceId: string` - Database source ID
- `maxItems?: number` - Max tweets (default: 50)

##### `testAllInstances(): Promise<string[]>`

Test all Nitter instances and return working ones.

##### `checkAccountExists(handle: string): Promise<{exists: boolean, instance?: string, error?: string}>`

Check if a Twitter account exists without crawling.

##### `extractDiscoveries(tweets: Tweet[]): Discovery[]`

Extract tool discoveries from tweet array. Useful for custom processing.

#### Example Use Cases

**1. Monitor Tech Accounts**

```typescript
const techAccounts = ['github', 'vercel', 'openai', 'anthropicai'];

for (const handle of techAccounts) {
  const result = await crawlAccount({
    handle,
    sourceId: `twitter-${handle}`,
    maxItems: 20
  });

  // Process discoveries...
}
```

**2. Search for Trending Tools**

```typescript
const queries = [
  'AI coding assistant',
  'developer tools 2026',
  'new open source tool'
];

for (const query of queries) {
  const result = await crawlSearch({
    query,
    sourceId: `search-${Date.now()}`,
    maxItems: 50
  });

  // High-confidence discoveries
  const tools = result.discoveries.filter(d => d.confidence >= 0.7);
}
```

**3. GitHub Repository Discovery**

Search for repositories mentioned in tweets:

```typescript
const result = await crawlSearch({
  query: 'awesome-ai-tools',
  sourceId: 'github-lists',
  maxItems: 100
});

// Filter GitHub discoveries
const repos = result.discoveries.filter(d =>
  d.url?.includes('github.com')
);
```

#### Data Structure

**Tweet:**
```typescript
interface Tweet {
  id: string;              // Tweet ID
  text: string;            // Tweet text content
  url: string;             // Nitter URL to tweet
  author: string;          // Display name
  authorHandle: string;    // @handle
  timestamp: Date;         // When posted
  links: string[];         // URLs in tweet
  retweets?: number;       // Not always available
  likes?: number;          // Not always available
}
```

**Discovery:**
```typescript
interface Discovery {
  name: string;            // Tool/entity name
  url?: string;            // Website URL (if found)
  mentionContext: string;  // Tweet text excerpt
  tweetUrl: string;        // Source tweet URL
  confidence: number;      // 0-1 confidence score
}
```

#### Limitations

- **Nitter Availability**: Instances go down frequently. The crawler tries multiple instances but may fail if all are unavailable.
- **Rate Limiting**: Some instances rate-limit aggressively. Space out requests.
- **HTML Parsing**: Search results use regex-based HTML parsing which is fragile. RSS feeds (account timelines) are more reliable.
- **No Authentication**: Cannot access protected accounts or private tweets.
- **Retweets/Likes**: Metrics not always available in RSS feeds.

#### Best Practices

1. **Check Instances First**: Run `testAllInstances()` before batch operations
2. **Use RSS When Possible**: Account timelines via RSS are more reliable than HTML search
3. **Filter by Confidence**: Focus on discoveries with confidence >= 0.7 for production use
4. **Verify URLs**: Discovered URLs should be validated before adding to database
5. **Space Requests**: Wait 2-3 seconds between crawls to avoid rate limits

### 2. HN Crawler

**File:** `hn-crawler.ts`

Crawls Hacker News for tool discussions and Show HN posts.

(Documentation to be added)

### 3. Reddit Crawler

**File:** `reddit-crawler.ts`

Crawls Reddit communities for tool mentions and discussions.

(Documentation to be added)

### 4. RSS Crawler

**File:** `rss-crawler.ts`

Generic RSS feed crawler for tech blogs and newsletters.

(Documentation to be added)

## Integration with Deep Research

All crawlers return a standardized `CrawlResult` format that can be processed into:

1. **Entities** - New tools/products to research
2. **Sources** - URLs to validate and store
3. **Assertions** - Claims about entities
4. **Discovery Sessions** - Tracked crawl sessions

### Workflow

```typescript
// 1. Run crawler
const result = await crawlAccount({
  handle: 'github',
  sourceId: 'source-123'
});

// 2. Process discoveries
for (const discovery of result.discoveries) {
  // Check if entity exists
  const exists = await entity.exists({
    projectId: 'project-123',
    name: discovery.name
  });

  if (!exists) {
    // Create new entity
    await entity.create({
      projectId: 'project-123',
      name: discovery.name,
      url: discovery.url,
      entityType: 'tool'
    });

    // Create assertion about discovery
    await assertion.create({
      entityId: entity.id,
      claim: `Mentioned in tweet: "${discovery.mentionContext}"`,
      category: 'discovery',
      sourceUrl: discovery.tweetUrl
    });
  }
}
```

## Examples

See individual `*.example.ts` files for detailed usage examples:

- `nitter-crawler.example.ts` - Twitter/X crawling examples

## Development

### Adding a New Crawler

1. Create `{platform}-crawler.ts` in this directory
2. Implement standard interfaces:
   - `crawl{Platform}(config): Promise<CrawlResult>`
   - Return `{ success, tweets/posts, discoveries, error }`
3. Export types and functions in crawler file
4. Add export to `index.ts`
5. Create example file: `{platform}-crawler.example.ts`
6. Update this README

### Testing

```bash
# Test Nitter instances
npm run cli -- ts-node src/tools/crawlers/nitter-crawler.example.ts

# Or import and test
import { testAllInstances } from './crawlers';
const working = await testAllInstances();
```

## Dependencies

- `rss-parser` - RSS feed parsing
- `playwright` - Used by other crawlers for JavaScript-rendered content
- Native `fetch` - HTTP requests

## Contributing

When adding crawlers:

1. Follow existing patterns for consistency
2. Include confidence scoring for discoveries
3. Handle rate limiting gracefully
4. Provide failover mechanisms when possible
5. Document limitations clearly
6. Add comprehensive examples

## License

Part of the Deep Research project. See main README for license information.
