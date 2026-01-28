/**
 * GitHub Crawler Examples
 *
 * Demonstrates how to use the GitHub crawler for:
 * 1. Awesome list parsing
 * 2. GitHub Trending scraping
 * 3. Diff detection for new entries
 */

import {
  crawlAwesomeList,
  crawlGitHubTrending,
  diffAwesomeList,
  parseAwesomeListMarkdown,
  processDiscoveries,
} from '../src/tools/crawlers/github-crawler';

// ============================================
// EXAMPLE 1: Crawl an Awesome List
// ============================================

async function exampleAwesomeList() {
  console.log('=== Example 1: Crawling Awesome List ===\n');

  // Crawl awesome-ai-tools repository
  const result = await crawlAwesomeList({
    repoOwner: 'mahseema',
    repoName: 'awesome-ai-tools',
    sourceId: 'awesome-ai-tools-source',
  });

  if (result.success) {
    console.log(`✓ Found ${result.entries.length} entries`);
    console.log(`✓ Source: ${result.sourceUrl}`);
    console.log(`✓ Crawled at: ${result.crawledAt}\n`);

    // Show first 5 entries
    console.log('First 5 entries:');
    result.entries.slice(0, 5).forEach((entry, i) => {
      console.log(`${i + 1}. ${entry.name} (${entry.category})`);
      console.log(`   URL: ${entry.url}`);
      console.log(`   ${entry.description}\n`);
    });
  } else {
    console.error(`✗ Failed: ${result.error}`);
  }
}

// ============================================
// EXAMPLE 2: Diff Detection
// ============================================

async function exampleDiffDetection() {
  console.log('\n=== Example 2: Diff Detection ===\n');

  // First crawl (simulated previous state)
  const previousResult = await crawlAwesomeList({
    repoOwner: 'mahseema',
    repoName: 'awesome-ai-tools',
    sourceId: 'test-source',
  });

  // Simulate changes by modifying entries
  const modifiedEntries = [...previousResult.entries];

  // Remove first entry (simulate removal)
  const removedEntry = modifiedEntries.shift()!;

  // Add a new entry (simulate addition)
  modifiedEntries.push({
    name: 'New AI Tool',
    url: 'https://example.com/new-tool',
    description: 'A newly discovered AI tool',
    category: 'New Category',
  });

  // Compare
  const diff = diffAwesomeList(modifiedEntries, previousResult.entries);

  console.log(`Added: ${diff.added.length} entries`);
  diff.added.forEach(entry => {
    console.log(`  + ${entry.name} - ${entry.url}`);
  });

  console.log(`\nRemoved: ${diff.removed.length} entries`);
  diff.removed.forEach(entry => {
    console.log(`  - ${entry.name} - ${entry.url}`);
  });
}

// ============================================
// EXAMPLE 3: GitHub Trending
// ============================================

async function exampleGitHubTrending() {
  console.log('\n=== Example 3: GitHub Trending ===\n');

  // Crawl trending repositories for multiple languages
  const result = await crawlGitHubTrending({
    languages: ['python', 'typescript'],  // AI-heavy languages
    since: 'weekly',
    sourceId: 'github-trending-source',
  });

  if (result.success) {
    console.log(`✓ Found ${result.entries.length} AI/ML related trending repos`);
    console.log(`✓ Crawled at: ${result.crawledAt}\n`);

    // Group by category (language)
    const byLanguage: Record<string, typeof result.entries> = {};
    result.entries.forEach(entry => {
      if (!byLanguage[entry.category]) {
        byLanguage[entry.category] = [];
      }
      byLanguage[entry.category].push(entry);
    });

    // Show results by language
    Object.entries(byLanguage).forEach(([language, entries]) => {
      console.log(`${language}:`);
      entries.slice(0, 3).forEach(entry => {
        console.log(`  • ${entry.name}`);
        console.log(`    ${entry.description}`);
        console.log(`    ${entry.url}\n`);
      });
    });
  } else {
    console.error(`✗ Failed: ${result.error}`);
  }
}

// ============================================
// EXAMPLE 4: Markdown Parsing
// ============================================

function exampleMarkdownParsing() {
  console.log('\n=== Example 4: Markdown Parsing ===\n');

  const markdown = `# Awesome AI Tools

## Code Assistants

- [GitHub Copilot](https://github.com/features/copilot) - AI pair programmer
- **[Cursor](https://cursor.com)** - AI-first code editor
- [Tabnine](https://tabnine.com) - AI code completion

## Testing Tools

- [DiffBlue](https://diffblue.com) - Automated unit test generation
`;

  const entries = parseAwesomeListMarkdown(markdown);

  console.log(`Parsed ${entries.length} entries:\n`);
  entries.forEach(entry => {
    console.log(`${entry.name} (${entry.category})`);
    console.log(`  ${entry.description}`);
    console.log(`  ${entry.url}\n`);
  });
}

// ============================================
// EXAMPLE 5: Integration with Research Project
// ============================================

async function exampleResearchIntegration() {
  console.log('\n=== Example 5: Research Project Integration ===\n');

  // This example requires a database connection
  // Uncomment and modify with real IDs when ready to test

  /*
  // Step 1: Crawl an awesome list
  const crawlResult = await crawlAwesomeList({
    repoOwner: 'sindresorhus',
    repoName: 'awesome',
    sourceId: 'awesome-list-source-id',
  });

  // Step 2: Process discoveries into entities
  const discoveryResult = await processDiscoveries(
    crawlResult,
    'your-project-id',
    'your-source-id'
  );

  console.log(`Created ${discoveryResult.created} entities`);
  console.log(`Skipped ${discoveryResult.skipped} duplicates`);
  if (discoveryResult.errors.length > 0) {
    console.log(`Errors: ${discoveryResult.errors.length}`);
  }
  */

  console.log('(Database integration example - uncomment to use)');
}

// ============================================
// RUN EXAMPLES
// ============================================

async function main() {
  console.log('GitHub Crawler Examples\n');
  console.log('=' .repeat(50) + '\n');

  // Run examples sequentially
  // Note: Uncomment the ones you want to test

  // Example 1: Basic awesome list crawling
  // await exampleAwesomeList();

  // Example 2: Diff detection
  // await exampleDiffDetection();

  // Example 3: GitHub trending
  // await exampleGitHubTrending();

  // Example 4: Markdown parsing (no network required)
  exampleMarkdownParsing();

  // Example 5: Research integration
  // await exampleResearchIntegration();

  console.log('\n' + '='.repeat(50));
  console.log('Examples complete!');
}

// Run if executed directly
if (require.main === module) {
  main()
    .then(() => process.exit(0))
    .catch(error => {
      console.error('Error:', error);
      process.exit(1);
    });
}
