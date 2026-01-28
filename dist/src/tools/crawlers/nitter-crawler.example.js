"use strict";
/**
 * Nitter Crawler Examples
 *
 * Example usage patterns for crawling Twitter/X via Nitter
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.exampleCrawlTechAccount = exampleCrawlTechAccount;
exports.exampleSearchAITools = exampleSearchAITools;
exports.exampleMultiAccountCrawl = exampleMultiAccountCrawl;
exports.exampleTestInstances = exampleTestInstances;
exports.exampleCheckAccount = exampleCheckAccount;
exports.exampleCustomAnalysis = exampleCustomAnalysis;
const nitter_crawler_1 = require("./nitter-crawler");
// ============================================
// EXAMPLE 1: Crawl a Tech News Account
// ============================================
async function exampleCrawlTechAccount() {
    console.log('\n=== Example 1: Crawl @github Timeline ===\n');
    const result = await (0, nitter_crawler_1.crawlAccount)({
        handle: 'github',
        sourceId: 'example-source-123',
        maxItems: 20,
    });
    if (!result.success) {
        console.error('Crawl failed:', result.error);
        return;
    }
    console.log(`✓ Crawled @github using ${result.instanceUsed}`);
    console.log(`  Found ${result.tweets.length} tweets`);
    console.log(`  Discovered ${result.discoveries.length} tools/entities\n`);
    // Show top discoveries
    console.log('Top Discoveries:');
    result.discoveries.slice(0, 5).forEach((d, i) => {
        console.log(`  ${i + 1}. ${d.name} (confidence: ${d.confidence})`);
        console.log(`     URL: ${d.url || 'N/A'}`);
        console.log(`     Context: "${d.mentionContext.substring(0, 80)}..."`);
        console.log(`     Source: ${d.tweetUrl}\n`);
    });
}
// ============================================
// EXAMPLE 2: Search for AI Tools
// ============================================
async function exampleSearchAITools() {
    console.log('\n=== Example 2: Search "AI coding assistant" ===\n');
    const result = await (0, nitter_crawler_1.crawlSearch)({
        query: 'AI coding assistant',
        sourceId: 'example-source-456',
        maxItems: 30,
    });
    if (!result.success) {
        console.error('Search failed:', result.error);
        return;
    }
    console.log(`✓ Searched using ${result.instanceUsed}`);
    console.log(`  Found ${result.tweets.length} tweets`);
    console.log(`  Discovered ${result.discoveries.length} tools/entities\n`);
    // Show high-confidence discoveries (>0.7)
    const highConfidence = result.discoveries.filter(d => d.confidence >= 0.7);
    console.log(`High-Confidence Discoveries (${highConfidence.length}):`);
    highConfidence.forEach((d, i) => {
        console.log(`  ${i + 1}. ${d.name} - ${d.url || 'No URL'}`);
    });
}
// ============================================
// EXAMPLE 3: Multi-Account Crawl
// ============================================
async function exampleMultiAccountCrawl() {
    console.log('\n=== Example 3: Crawl Multiple Tech Accounts ===\n');
    const accounts = ['github', 'vercel', 'nodejs', 'typescript'];
    for (const handle of accounts) {
        const result = await (0, nitter_crawler_1.crawlAccount)({
            handle,
            sourceId: `source-${handle}`,
            maxItems: 10,
        });
        if (result.success) {
            console.log(`✓ @${handle}: ${result.tweets.length} tweets, ${result.discoveries.length} discoveries`);
        }
        else {
            console.log(`✗ @${handle}: ${result.error}`);
        }
    }
}
// ============================================
// EXAMPLE 4: Test Instance Availability
// ============================================
async function exampleTestInstances() {
    console.log('\n=== Example 4: Test All Nitter Instances ===\n');
    const working = await (0, nitter_crawler_1.testAllInstances)();
    console.log(`Working instances (${working.length}):`);
    working.forEach(instance => {
        console.log(`  ✓ ${instance}`);
    });
    if (working.length === 0) {
        console.log('  ✗ No instances available');
    }
}
// ============================================
// EXAMPLE 5: Check Account Exists
// ============================================
async function exampleCheckAccount() {
    console.log('\n=== Example 5: Check if Accounts Exist ===\n');
    const handles = ['github', 'nonexistentaccount123456', 'openai'];
    for (const handle of handles) {
        const result = await (0, nitter_crawler_1.checkAccountExists)(handle);
        if (result.exists) {
            console.log(`✓ @${handle} exists (via ${result.instance})`);
        }
        else {
            console.log(`✗ @${handle} not found: ${result.error || 'Account does not exist'}`);
        }
    }
}
// ============================================
// EXAMPLE 6: Custom Discovery Analysis
// ============================================
async function exampleCustomAnalysis() {
    console.log('\n=== Example 6: Analyze Tweet Content ===\n');
    // Simulate some tweets
    const mockTweets = [
        {
            id: '1',
            text: 'Just released Cursor - a new AI-powered code editor! Check it out at https://cursor.com',
            url: 'https://nitter.net/user/status/1',
            author: 'Developer',
            authorHandle: 'developer',
            timestamp: new Date(),
            links: ['https://cursor.com'],
        },
        {
            id: '2',
            text: 'Introducing CodeWhisperer - an AI coding assistant by AWS https://aws.amazon.com/codewhisperer',
            url: 'https://nitter.net/user/status/2',
            author: 'AWS',
            authorHandle: 'aws',
            timestamp: new Date(),
            links: ['https://aws.amazon.com/codewhisperer'],
        },
        {
            id: '3',
            text: 'Check out this amazing GitHub repo: @openai/whisper for speech recognition',
            url: 'https://nitter.net/user/status/3',
            author: 'TechNews',
            authorHandle: 'technews',
            timestamp: new Date(),
            links: ['https://github.com/openai/whisper'],
        },
    ];
    const discoveries = (0, nitter_crawler_1.extractDiscoveries)(mockTweets);
    console.log(`Extracted ${discoveries.length} discoveries from ${mockTweets.length} tweets:\n`);
    discoveries.forEach((d, i) => {
        console.log(`${i + 1}. ${d.name}`);
        console.log(`   URL: ${d.url || 'N/A'}`);
        console.log(`   Confidence: ${d.confidence}`);
        console.log(`   Context: "${d.mentionContext}"`);
        console.log(`   Source: ${d.tweetUrl}\n`);
    });
}
// ============================================
// RUN EXAMPLES
// ============================================
async function runAllExamples() {
    try {
        // Test instances first
        await exampleTestInstances();
        // Run other examples if instances are available
        await exampleCheckAccount();
        // await exampleCrawlTechAccount();      // Uncomment to test live crawling
        // await exampleSearchAITools();         // Uncomment to test live search
        // await exampleMultiAccountCrawl();     // Uncomment for batch crawling
        await exampleCustomAnalysis(); // No network needed
        console.log('\n✓ All examples completed\n');
    }
    catch (error) {
        console.error('Example failed:', error);
    }
}
// Run if executed directly
if (require.main === module) {
    runAllExamples().catch(console.error);
}
//# sourceMappingURL=nitter-crawler.example.js.map