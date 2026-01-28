"use strict";
/**
 * Crawlers - Web discovery tools for finding AI tools and products
 *
 * Each crawler targets a specific source (HN, Reddit, GitHub, Twitter/X, RSS, etc.)
 * and discovers entities matching research criteria.
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseTweetsFromRSS = exports.checkAccountExists = exports.testAllInstances = exports.extractDiscoveries = exports.crawlSearch = exports.crawlAccount = exports.parseAwesomeListMarkdown = exports.diffAwesomeList = exports.crawlGitHubTrending = exports.crawlAwesomeList = exports.REDDIT_EXAMPLE_CONFIGS = exports.aggregateRedditDiscoveries = exports.crawlMultipleSubreddits = exports.fetchPostComments = exports.crawlSubreddit = exports.HN_AI_KEYWORDS = exports.crawlTopAIStories = exports.crawlShowHN = exports.crawlAndPersist = exports.persistDiscoveries = exports.isToolAnnouncement = exports.fetchStoryComments = exports.fetchStoriesParallel = exports.fetchStory = exports.crawlHackerNews = void 0;
// HN Crawler - avoid type name conflicts by using explicit exports
var hn_crawler_1 = require("./hn-crawler");
Object.defineProperty(exports, "crawlHackerNews", { enumerable: true, get: function () { return hn_crawler_1.crawlHackerNews; } });
Object.defineProperty(exports, "fetchStory", { enumerable: true, get: function () { return hn_crawler_1.fetchStory; } });
Object.defineProperty(exports, "fetchStoriesParallel", { enumerable: true, get: function () { return hn_crawler_1.fetchStoriesParallel; } });
Object.defineProperty(exports, "fetchStoryComments", { enumerable: true, get: function () { return hn_crawler_1.fetchStoryComments; } });
Object.defineProperty(exports, "isToolAnnouncement", { enumerable: true, get: function () { return hn_crawler_1.isToolAnnouncement; } });
Object.defineProperty(exports, "persistDiscoveries", { enumerable: true, get: function () { return hn_crawler_1.persistDiscoveries; } });
Object.defineProperty(exports, "crawlAndPersist", { enumerable: true, get: function () { return hn_crawler_1.crawlAndPersist; } });
Object.defineProperty(exports, "crawlShowHN", { enumerable: true, get: function () { return hn_crawler_1.crawlShowHN; } });
Object.defineProperty(exports, "crawlTopAIStories", { enumerable: true, get: function () { return hn_crawler_1.crawlTopAIStories; } });
Object.defineProperty(exports, "HN_AI_KEYWORDS", { enumerable: true, get: function () { return hn_crawler_1.HN_AI_KEYWORDS; } });
// Reddit Crawler
var reddit_crawler_1 = require("./reddit-crawler");
Object.defineProperty(exports, "crawlSubreddit", { enumerable: true, get: function () { return reddit_crawler_1.crawlSubreddit; } });
Object.defineProperty(exports, "fetchPostComments", { enumerable: true, get: function () { return reddit_crawler_1.fetchPostComments; } });
Object.defineProperty(exports, "crawlMultipleSubreddits", { enumerable: true, get: function () { return reddit_crawler_1.crawlMultipleSubreddits; } });
Object.defineProperty(exports, "aggregateRedditDiscoveries", { enumerable: true, get: function () { return reddit_crawler_1.aggregateDiscoveries; } });
Object.defineProperty(exports, "REDDIT_EXAMPLE_CONFIGS", { enumerable: true, get: function () { return reddit_crawler_1.EXAMPLE_CONFIGS; } });
// RSS Crawler
__exportStar(require("./rss-crawler"), exports);
// GitHub Crawler (Awesome Lists + Trending)
var github_crawler_1 = require("./github-crawler");
Object.defineProperty(exports, "crawlAwesomeList", { enumerable: true, get: function () { return github_crawler_1.crawlAwesomeList; } });
Object.defineProperty(exports, "crawlGitHubTrending", { enumerable: true, get: function () { return github_crawler_1.crawlGitHubTrending; } });
Object.defineProperty(exports, "diffAwesomeList", { enumerable: true, get: function () { return github_crawler_1.diffAwesomeList; } });
Object.defineProperty(exports, "parseAwesomeListMarkdown", { enumerable: true, get: function () { return github_crawler_1.parseAwesomeListMarkdown; } });
// Nitter (Twitter/X) Crawler
var nitter_crawler_1 = require("./nitter-crawler");
Object.defineProperty(exports, "crawlAccount", { enumerable: true, get: function () { return nitter_crawler_1.crawlAccount; } });
Object.defineProperty(exports, "crawlSearch", { enumerable: true, get: function () { return nitter_crawler_1.crawlSearch; } });
Object.defineProperty(exports, "extractDiscoveries", { enumerable: true, get: function () { return nitter_crawler_1.extractDiscoveries; } });
Object.defineProperty(exports, "testAllInstances", { enumerable: true, get: function () { return nitter_crawler_1.testAllInstances; } });
Object.defineProperty(exports, "checkAccountExists", { enumerable: true, get: function () { return nitter_crawler_1.checkAccountExists; } });
Object.defineProperty(exports, "parseTweetsFromRSS", { enumerable: true, get: function () { return nitter_crawler_1.parseTweetsFromRSS; } });
//# sourceMappingURL=index.js.map