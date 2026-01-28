# GitHub Crawler

Automated discovery tool for finding AI/ML tools and repositories from GitHub sources.

## Features

1. **Awesome List Parsing** - Extract structured data from Awesome list READMEs
2. **Diff Detection** - Compare crawls to find newly added entries
3. **GitHub Trending** - Scrape trending repositories filtered for AI/ML keywords
4. **Rate Limiting** - Respects GitHub's rate limits (60 req/hour unauthenticated)

## Quick Start

```typescript
import { crawlAwesomeList, crawlGitHubTrending } from './src/tools/crawlers';

// Crawl an Awesome list
const result = await crawlAwesomeList({
  repoOwner: 'mahseema',
  repoName: 'awesome-ai-tools',
  sourceId: 'awesome-ai-source',
});

console.log(`Found ${result.entries.length} tools`);
```

## API Reference

### `crawlAwesomeList(config, crawlSessionId?)`

Fetches and parses an Awesome list README from GitHub.

**Parameters:**
```typescript
interface GitHubListConfig {
  repoOwner: string;      // GitHub username/org
  repoName: string;       // Repository name
  readmePath?: string;    // Default: 'README.md'
  sourceId: string;       // Source ID for tracking
}
```

**Returns:**
```typescript
interface CrawlResult {
  success: boolean;
  entries: AwesomeListEntry[];
  sourceUrl: string;
  crawledAt: Date;
  error?: string;
}
```

**Example:**
```typescript
const result = await crawlAwesomeList({
  repoOwner: 'sindresorhus',
  repoName: 'awesome',
  readmePath: 'README.md',
  sourceId: 'awesome-source-id',
});

result.entries.forEach(entry => {
  console.log(`${entry.name}: ${entry.url}`);
  console.log(`Category: ${entry.category}`);
  console.log(`Description: ${entry.description}\n`);
});
```

### `parseAwesomeListMarkdown(markdown)`

Parses markdown content to extract tool entries.

**Supported Formats:**
- `- [Tool Name](url) - Description`
- `* [Tool Name](url) - Description`
- `- **[Tool Name](url)** - Description`

**Category Tracking:**
Automatically tracks the current `## Heading` as the category for subsequent entries.

**Example:**
```typescript
const markdown = `
## Code Editors
- [VS Code](https://code.visualstudio.com) - Popular editor
- [Cursor](https://cursor.com) - AI-first editor

## Testing Tools
- [Jest](https://jestjs.io) - JavaScript testing
`;

const entries = parseAwesomeListMarkdown(markdown);
// Returns:
// [
//   { name: 'VS Code', url: '...', category: 'Code Editors', description: '...' },
//   { name: 'Cursor', url: '...', category: 'Code Editors', description: '...' },
//   { name: 'Jest', url: '...', category: 'Testing Tools', description: '...' }
// ]
```

### `diffAwesomeList(currentEntries, previousEntries)`

Compares two sets of entries to find additions and removals.

**Returns:**
```typescript
interface DiffResult {
  added: AwesomeListEntry[];    // New entries
  removed: AwesomeListEntry[];  // Removed entries
}
```

**Example:**
```typescript
// First crawl
const previous = await crawlAwesomeList(config);

// Wait some time...

// Second crawl
const current = await crawlAwesomeList(config);

// Find differences
const diff = diffAwesomeList(current.entries, previous.entries);

console.log(`New tools: ${diff.added.length}`);
diff.added.forEach(tool => {
  console.log(`  + ${tool.name}`);
});

console.log(`Removed tools: ${diff.removed.length}`);
diff.removed.forEach(tool => {
  console.log(`  - ${tool.name}`);
});
```

### `crawlGitHubTrending(config, crawlSessionId?)`

Scrapes GitHub Trending page and filters for AI/ML repositories.

**Parameters:**
```typescript
interface GitHubTrendingConfig {
  languages?: string[];   // e.g., ['python', 'typescript', '']
  since?: 'daily' | 'weekly' | 'monthly';
  sourceId: string;
}
```

**AI/ML Keyword Filtering:**
Automatically filters repositories containing keywords like:
- ai, artificial intelligence, machine learning, ml, deep learning
- neural, llm, gpt, language model, transformer
- chatbot, nlp, natural language, computer vision
- agent, copilot, assistant, intelligent, generative

**Example:**
```typescript
const result = await crawlGitHubTrending({
  languages: ['python', 'typescript', 'rust'],
  since: 'weekly',
  sourceId: 'trending-source-id',
});

console.log(`Found ${result.entries.length} trending AI repos`);
```

### `processDiscoveries(crawlResult, projectId, sourceId)`

Integrates crawl results into a research project by creating entities and assertions.

**Behavior:**
- Checks for duplicate entities (by name within project)
- Creates new entities with discovered URLs and descriptions
- Creates initial "discovery" assertions linked to source
- Skips existing entities to avoid duplicates

**Returns:**
```typescript
{
  created: number;      // Number of new entities created
  skipped: number;      // Number of duplicates skipped
  errors: string[];     // Any errors encountered
}
```

**Example:**
```typescript
// Crawl awesome list
const crawlResult = await crawlAwesomeList({
  repoOwner: 'mahseema',
  repoName: 'awesome-ai-tools',
  sourceId: 'awesome-ai-source',
});

// Process into research project
const result = await processDiscoveries(
  crawlResult,
  'project-id-here',
  'source-id-here'
);

console.log(`Created ${result.created} entities`);
console.log(`Skipped ${result.skipped} duplicates`);
```

## Rate Limiting

### GitHub API Limits
- **Unauthenticated**: 60 requests/hour
- **Authenticated**: 5,000 requests/hour (requires GitHub token)

### Best Practices
1. **Use raw.githubusercontent.com** for README fetching (doesn't count against API limit)
2. **Add delays between requests** when crawling multiple languages (2 seconds recommended)
3. **Cache results** to avoid re-fetching unchanged data
4. **Monitor rate limit headers** if using GitHub API directly

### Adding Authentication (Future Enhancement)
```typescript
// Set GITHUB_TOKEN environment variable
process.env.GITHUB_TOKEN = 'ghp_...';

// Modify fetchUrl to include auth header
headers: {
  'Authorization': `token ${process.env.GITHUB_TOKEN}`
}
```

## Common Use Cases

### Use Case 1: Discovery Pipeline

```typescript
// 1. Crawl Awesome list
const awesomeResult = await crawlAwesomeList({
  repoOwner: 'mahseema',
  repoName: 'awesome-ai-tools',
  sourceId: 'awesome-ai',
});

// 2. Crawl GitHub trending
const trendingResult = await crawlGitHubTrending({
  languages: ['python'],
  since: 'weekly',
  sourceId: 'gh-trending',
});

// 3. Combine results
const allEntries = [
  ...awesomeResult.entries,
  ...trendingResult.entries,
];

// 4. Deduplicate by URL
const uniqueUrls = new Set();
const uniqueEntries = allEntries.filter(entry => {
  if (uniqueUrls.has(entry.url)) return false;
  uniqueUrls.add(entry.url);
  return true;
});

// 5. Process into project
const result = await processDiscoveries(
  { ...awesomeResult, entries: uniqueEntries },
  projectId,
  sourceId
);
```

### Use Case 2: Change Detection

```typescript
// Store previous crawl in database or file
const previousCrawl = await crawlAwesomeList(config);
fs.writeFileSync('previous.json', JSON.stringify(previousCrawl));

// Later: crawl again and compare
const currentCrawl = await crawlAwesomeList(config);
const previous = JSON.parse(fs.readFileSync('previous.json', 'utf8'));

const diff = diffAwesomeList(currentCrawl.entries, previous.entries);

if (diff.added.length > 0) {
  console.log('New tools discovered!');
  // Process only the new entries
  await processDiscoveries(
    { ...currentCrawl, entries: diff.added },
    projectId,
    sourceId
  );
}
```

### Use Case 3: Multi-Source Discovery

```typescript
const sources = [
  { owner: 'mahseema', repo: 'awesome-ai-tools' },
  { owner: 'sindresorhus', repo: 'awesome' },
  { owner: 'Hannibal046', repo: 'Awesome-LLM' },
];

const allEntries: AwesomeListEntry[] = [];

for (const source of sources) {
  const result = await crawlAwesomeList({
    repoOwner: source.owner,
    repoName: source.repo,
    sourceId: `${source.owner}/${source.repo}`,
  });

  if (result.success) {
    allEntries.push(...result.entries);
  }

  // Rate limiting: wait 2 seconds between sources
  await new Promise(resolve => setTimeout(resolve, 2000));
}

console.log(`Total entries: ${allEntries.length}`);
```

## Markdown Format Support

The parser handles various Awesome list formatting styles:

### Standard Format
```markdown
## Category Name
- [Tool Name](https://url) - Description text
```

### Bold Tool Names
```markdown
- **[Tool Name](https://url)** - Description
```

### Asterisk Lists
```markdown
* [Tool Name](https://url) - Description
```

### Nested Headings
```markdown
## Main Category
### Subcategory
- [Tool](url) - Description
```
(Subcategory becomes the category)

## Error Handling

All functions return structured error information:

```typescript
const result = await crawlAwesomeList(config);

if (!result.success) {
  console.error('Crawl failed:', result.error);
  // Handle error (retry, log, alert, etc.)
}

// Process discoveries with error handling
const discResult = await processDiscoveries(crawlResult, projectId, sourceId);

if (discResult.errors.length > 0) {
  console.error('Some entities failed to create:');
  discResult.errors.forEach(err => console.error(`  - ${err}`));
}
```

## Testing

See `examples/github-crawler-example.ts` for runnable examples.

Run tests:
```bash
# Compile TypeScript
npm run build

# Run example (markdown parsing only, no network)
npx ts-node examples/github-crawler-example.ts

# Run with network access (uncomment examples in main())
# Edit examples/github-crawler-example.ts first
```

## Troubleshooting

### Issue: Rate Limit Exceeded

**Solution:**
- Add delays between requests
- Use raw.githubusercontent.com instead of GitHub API
- Authenticate with GitHub token (increases limit to 5000/hour)

### Issue: Parsing Fails for Some Lists

**Solution:**
- Check the markdown format of the list
- Adjust regex patterns in `parseAwesomeListMarkdown()`
- Some lists use custom formats not covered by default patterns

### Issue: GitHub Trending Returns Empty Results

**Solution:**
- GitHub's HTML structure may have changed
- Update the parsing logic in `parseGitHubTrendingHtml()`
- Check if Playwright is timing out (increase timeout)

### Issue: Duplicate Entities Created

**Solution:**
- The deduplication is based on exact name match within a project
- URLs can vary (www vs non-www, http vs https, trailing slash)
- Normalize URLs before comparison if needed

## Future Enhancements

1. **GitHub API Integration** - Use official API for more reliable data
2. **Authenticated Requests** - Support GitHub tokens for higher rate limits
3. **Webhook Support** - Monitor repositories for changes in real-time
4. **Scheduled Crawling** - Cron-style scheduled discovery
5. **Custom Filters** - Allow users to define custom keyword filters
6. **Star Count Filtering** - Only discover repos above certain star threshold
7. **Language Detection** - Auto-detect programming language from repo

## Related Documentation

- `docs/RESEARCH-SYSTEM.md` - Overall research architecture
- `CLAUDE.md` - CLI commands and research workflows
- `examples/github-crawler-example.ts` - Working examples
