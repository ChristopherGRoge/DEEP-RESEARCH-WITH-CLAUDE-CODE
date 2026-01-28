/**
 * Crawlers - Web discovery tools for finding AI tools and products
 *
 * Each crawler targets a specific source (HN, Reddit, GitHub, Twitter/X, RSS, etc.)
 * and discovers entities matching research criteria.
 */

// HN Crawler - avoid type name conflicts by using explicit exports
export {
  crawlHackerNews,
  fetchStory,
  fetchStoriesParallel,
  fetchStoryComments,
  isToolAnnouncement,
  persistDiscoveries,
  crawlAndPersist,
  crawlShowHN,
  crawlTopAIStories,
  HN_AI_KEYWORDS,
  type HNCrawlerConfig,
  type HNStory,
  type HNComment,
  type HNCrawlResult,
  type DiscoveredTool
} from './hn-crawler';

// Reddit Crawler
export {
  crawlSubreddit,
  fetchPostComments,
  crawlMultipleSubreddits,
  aggregateDiscoveries as aggregateRedditDiscoveries,
  EXAMPLE_CONFIGS as REDDIT_EXAMPLE_CONFIGS,
  type RedditCrawlerConfig,
  type RedditPost,
  type RedditCrawlResult,
  type RedditToolDiscovery
} from './reddit-crawler';

// RSS Crawler
export * from './rss-crawler';

// GitHub Crawler (Awesome Lists + Trending)
export {
  crawlAwesomeList,
  crawlGitHubTrending,
  diffAwesomeList,
  parseAwesomeListMarkdown,
  type GitHubListConfig,
  type GitHubTrendingConfig,
  type AwesomeListEntry,
  type CrawlResult as GitHubCrawlResult,
  type DiffResult as GitHubDiffResult
} from './github-crawler';

// Nitter (Twitter/X) Crawler
export {
  crawlAccount,
  crawlSearch,
  extractDiscoveries,
  testAllInstances,
  checkAccountExists,
  parseTweetsFromRSS,
  type NitterAccountConfig,
  type NitterSearchConfig,
  type Tweet,
  type CrawlResult as NitterCrawlResult,
  type Discovery as NitterDiscovery
} from './nitter-crawler';
