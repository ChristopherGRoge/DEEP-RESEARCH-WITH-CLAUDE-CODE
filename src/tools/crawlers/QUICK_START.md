# Nitter Crawler Quick Start

## Installation

Already installed! Uses `rss-parser` which is in package.json.

## 30-Second Start

```typescript
import { crawlAccount } from './tools/crawlers';

// Crawl @github's timeline
const result = await crawlAccount({
  handle: 'github',
  sourceId: 'source-123',
  maxItems: 20
});

// See what was discovered
result.discoveries.forEach(d => {
  console.log(`${d.name}: ${d.url} (confidence: ${d.confidence})`);
});
```

## Common Patterns

### 1. Monitor a Tech Account

```typescript
const result = await crawlAccount({
  handle: 'vercel',
  sourceId: 'twitter-vercel',
  maxItems: 50
});

console.log(`Found ${result.discoveries.length} tools`);
```

### 2. Search for Topics

```typescript
const result = await crawlSearch({
  query: 'AI coding tools',
  sourceId: 'search-ai-tools',
  maxItems: 30
});

// High-confidence discoveries only
const tools = result.discoveries.filter(d => d.confidence >= 0.7);
```

### 3. Check Instance Status

```typescript
import { testAllInstances } from './tools/crawlers';

const working = await testAllInstances();
console.log(`${working.length} instances available`);
```

### 4. Verify Account Exists

```typescript
import { checkAccountExists } from './tools/crawlers';

const check = await checkAccountExists('github');
if (check.exists) {
  console.log(`@github exists, accessible via ${check.instance}`);
}
```

## Understanding Results

### CrawlResult Structure

```typescript
{
  success: true,
  sourceId: 'source-123',
  instanceUsed: 'nitter.net',
  tweets: [
    {
      id: '123456',
      text: 'Check out Cursor at https://cursor.com',
      author: 'Developer',
      authorHandle: 'developer',
      timestamp: Date,
      links: ['https://cursor.com']
    }
  ],
  discoveries: [
    {
      name: 'Cursor',
      url: 'https://cursor.com',
      mentionContext: 'Check out Cursor at https://cursor.com',
      tweetUrl: 'https://nitter.net/developer/status/123456',
      confidence: 0.9
    }
  ]
}
```

### Confidence Levels

| Score | Meaning | Use Case |
|-------|---------|----------|
| **0.9** | Direct URL mention | Production use |
| **0.8** | GitHub repo | Production use |
| **0.7** | Announcement pattern | Review recommended |
| **0.5** | Tool name pattern | Manual verification |

## Error Handling

```typescript
const result = await crawlAccount({
  handle: 'github',
  sourceId: 'source-123'
});

if (!result.success) {
  console.error(`Crawl failed: ${result.error}`);
  // All Nitter instances might be down
}
```

## Rate Limiting

Space out requests to avoid rate limits:

```typescript
const accounts = ['github', 'vercel', 'openai'];

for (const handle of accounts) {
  await crawlAccount({ handle, sourceId: `twitter-${handle}` });
  await new Promise(resolve => setTimeout(resolve, 3000)); // 3s delay
}
```

## Best Practices

### ✅ Do

- Check `testAllInstances()` before batch operations
- Filter by confidence ≥ 0.7 for production
- Validate discovered URLs before persisting
- Use RSS (account crawling) over HTML (search) when possible
- Space requests 2-3 seconds apart

### ❌ Don't

- Don't make rapid-fire requests (rate limits)
- Don't trust confidence < 0.5 without verification
- Don't assume all instances work (test first)
- Don't ignore `result.success` status
- Don't crawl the same account repeatedly in short periods

## Integration with Deep Research

```typescript
// 1. Crawl
const result = await crawlAccount({
  handle: 'github',
  sourceId: 'twitter-github'
});

// 2. Process discoveries
for (const discovery of result.discoveries) {
  if (discovery.confidence >= 0.7) {
    // Create entity in database
    const entity = await entity.create({
      projectId: 'my-project',
      name: discovery.name,
      url: discovery.url,
      entityType: 'tool'
    });

    // Create assertion
    await assertion.create({
      entityId: entity.id,
      claim: `Discovered via Twitter: "${discovery.mentionContext}"`,
      category: 'discovery',
      sourceUrl: discovery.tweetUrl
    });
  }
}
```

## Testing

Run the test suite:

```bash
npx ts-node src/tools/crawlers/nitter-crawler.test.ts
```

Expected output:
```
✓ Extracted 5 discoveries from 5 tweets
✓ All URL-based discoveries have reasonable confidence
✓ Deduplication working
✓ ALL TESTS PASSED
```

## Examples

Full examples in `nitter-crawler.example.ts`:

```bash
npx ts-node src/tools/crawlers/nitter-crawler.example.ts
```

## Troubleshooting

### "No working Nitter instance found"

All instances are down. Try:
1. Wait 10-15 minutes
2. Check https://status.d420.de/
3. Use a different crawler (HN, Reddit, RSS)

### Empty discoveries array

Tweet text doesn't match patterns. Try:
- Different accounts (more tool-focused)
- Different search queries
- Increase `maxItems` to get more tweets

### Low confidence scores

Use custom processing:

```typescript
const tweets = result.tweets;
const discoveries = extractDiscoveries(tweets);

// Apply your own filters
const filtered = discoveries.filter(d => {
  // Custom logic here
  return d.name.length > 3 && d.url;
});
```

## Need Help?

- See full docs: `README.md`
- Implementation details: `IMPLEMENTATION_SUMMARY.md`
- Run examples: `nitter-crawler.example.ts`
- Run tests: `nitter-crawler.test.ts`
