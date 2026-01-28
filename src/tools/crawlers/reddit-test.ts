/**
 * Manual test file for Reddit crawler
 *
 * Run with: npx ts-node src/tools/crawlers/reddit-test.ts
 */

import { crawlSubreddit, EXAMPLE_CONFIGS } from './reddit-crawler.js';

async function testRedditCrawler() {
  console.log('Testing Reddit crawler...\n');

  // Test with programming subreddit
  const config = {
    ...EXAMPLE_CONFIGS.aiProgramming,
    limit: 10, // Just test with 10 posts
    sourceId: 'test-reddit-source' // Add missing sourceId
  };

  console.log('Configuration:', JSON.stringify(config, null, 2));
  console.log('\nFetching from Reddit...');

  const result = await crawlSubreddit(config, 'test-session');

  console.log('\n=== RESULTS ===');
  console.log(`Success: ${result.success}`);
  console.log(`Posts fetched: ${result.posts.length}`);
  console.log(`Tool mentions found: ${result.discoveries.length}`);

  if (result.error) {
    console.error('Error:', result.error);
  }

  if (result.discoveries.length > 0) {
    console.log('\n=== DISCOVERIES ===');
    result.discoveries.forEach((disc, i) => {
      console.log(`\n${i + 1}. ${disc.toolName}`);
      console.log(`   Score: ${disc.score}`);
      console.log(`   Post: ${disc.postTitle}`);
      console.log(`   Context: ${disc.mentionContext.substring(0, 100)}...`);
      console.log(`   URL: ${disc.postUrl}`);
    });
  }

  if (result.posts.length > 0) {
    console.log('\n=== SAMPLE POST ===');
    const sample = result.posts[0];
    console.log(`Title: ${sample.title}`);
    console.log(`Score: ${sample.score}`);
    console.log(`Comments: ${sample.numComments}`);
    console.log(`URL: ${sample.permalink}`);
  }
}

testRedditCrawler().catch(error => {
  console.error('Test failed:', error);
  process.exit(1);
});
