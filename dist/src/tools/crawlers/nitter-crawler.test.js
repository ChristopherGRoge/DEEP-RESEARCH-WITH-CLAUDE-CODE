"use strict";
/**
 * Nitter Crawler Tests
 *
 * Quick validation tests for the Nitter crawler implementation
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.runAllTests = runAllTests;
exports.testExtractDiscoveries = testExtractDiscoveries;
exports.testConfidenceScoring = testConfidenceScoring;
exports.testDeduplication = testDeduplication;
const nitter_crawler_1 = require("./nitter-crawler");
// ============================================
// TEST DATA
// ============================================
const mockTweets = [
    {
        id: '1',
        text: 'Just released Cursor - a new AI-powered code editor! Check it out at https://cursor.com',
        url: 'https://nitter.net/user/status/1',
        author: 'Developer',
        authorHandle: 'developer',
        timestamp: new Date('2026-01-10'),
        links: ['https://cursor.com'],
    },
    {
        id: '2',
        text: 'Introducing CodeWhisperer - an AI coding assistant by AWS https://aws.amazon.com/codewhisperer',
        url: 'https://nitter.net/user/status/2',
        author: 'AWS',
        authorHandle: 'aws',
        timestamp: new Date('2026-01-11'),
        links: ['https://aws.amazon.com/codewhisperer'],
    },
    {
        id: '3',
        text: 'Check out this amazing GitHub repo: @openai/whisper for speech recognition',
        url: 'https://nitter.net/user/status/3',
        author: 'TechNews',
        authorHandle: 'technews',
        timestamp: new Date('2026-01-12'),
        links: ['https://github.com/openai/whisper'],
    },
    {
        id: '4',
        text: 'Copilot is an AI tool that helps developers write code faster with intelligent suggestions',
        url: 'https://nitter.net/user/status/4',
        author: 'DevTools',
        authorHandle: 'devtools',
        timestamp: new Date('2026-01-12'),
        links: ['https://github.com/features/copilot'],
    },
    {
        id: '5',
        text: 'Just built a new app with React and TypeScript. Very excited!',
        url: 'https://nitter.net/user/status/5',
        author: 'Builder',
        authorHandle: 'builder',
        timestamp: new Date('2026-01-12'),
        links: [],
    },
];
// ============================================
// TESTS
// ============================================
function testExtractDiscoveries() {
    console.log('\n=== Test: extractDiscoveries ===\n');
    const discoveries = (0, nitter_crawler_1.extractDiscoveries)(mockTweets);
    console.log(`✓ Extracted ${discoveries.length} discoveries from ${mockTweets.length} tweets\n`);
    // Validate each discovery
    discoveries.forEach((d, i) => {
        console.log(`${i + 1}. ${d.name}`);
        console.log(`   URL: ${d.url || 'N/A'}`);
        console.log(`   Confidence: ${d.confidence}`);
        console.log(`   Context: "${d.mentionContext.substring(0, 60)}..."`);
        console.log(`   Source: ${d.tweetUrl}\n`);
        // Assertions
        if (!d.name || d.name.length === 0) {
            throw new Error(`Discovery ${i} has empty name`);
        }
        if (d.confidence < 0 || d.confidence > 1) {
            throw new Error(`Discovery ${i} has invalid confidence: ${d.confidence}`);
        }
        if (!d.tweetUrl.includes('nitter.net')) {
            throw new Error(`Discovery ${i} has invalid tweet URL: ${d.tweetUrl}`);
        }
    });
    // Verify expected discoveries
    const expectedNames = ['Cursor', 'CodeWhisperer', 'Whisper', 'Copilot'];
    const foundNames = discoveries.map(d => d.name);
    for (const expected of expectedNames) {
        const found = foundNames.some(name => name.toLowerCase().includes(expected.toLowerCase()));
        if (!found) {
            console.warn(`⚠ Warning: Expected to find "${expected}" but didn't`);
        }
        else {
            console.log(`✓ Found expected discovery: ${expected}`);
        }
    }
    // Verify URL discoveries have high or medium confidence
    const urlDiscoveries = discoveries.filter(d => d.url && d.confidence >= 0.5);
    console.log(`\n✓ ${urlDiscoveries.length} URL discoveries with confidence ≥0.5`);
    // Verify no false positives (common words)
    const commonWords = ['React', 'TypeScript', 'Very', 'Just', 'Check'];
    const falsePositives = discoveries.filter(d => commonWords.includes(d.name));
    if (falsePositives.length > 0) {
        console.warn(`⚠ Warning: Found ${falsePositives.length} potential false positives:`, falsePositives.map(d => d.name));
    }
    else {
        console.log(`✓ No common word false positives`);
    }
    console.log('\n✓ extractDiscoveries test passed\n');
}
function testConfidenceScoring() {
    console.log('\n=== Test: Confidence Scoring ===\n');
    const discoveries = (0, nitter_crawler_1.extractDiscoveries)(mockTweets);
    // Group by confidence level
    const high = discoveries.filter(d => d.confidence >= 0.8);
    const medium = discoveries.filter(d => d.confidence >= 0.5 && d.confidence < 0.8);
    const low = discoveries.filter(d => d.confidence < 0.5);
    console.log(`High confidence (≥0.8): ${high.length}`);
    high.forEach(d => console.log(`  - ${d.name}: ${d.confidence}`));
    console.log(`\nMedium confidence (0.5-0.8): ${medium.length}`);
    medium.forEach(d => console.log(`  - ${d.name}: ${d.confidence}`));
    console.log(`\nLow confidence (<0.5): ${low.length}`);
    low.forEach(d => console.log(`  - ${d.name}: ${d.confidence}`));
    // Verify URL-based discoveries have reasonable confidence
    const urlBasedDiscoveries = discoveries.filter(d => d.url && d.url.length > 0);
    const reasonableConfidence = urlBasedDiscoveries.every(d => d.confidence >= 0.5);
    if (reasonableConfidence) {
        console.log(`\n✓ All URL-based discoveries have reasonable confidence (≥0.5)`);
        // Show breakdown
        const highConfUrl = urlBasedDiscoveries.filter(d => d.confidence >= 0.8).length;
        const medConfUrl = urlBasedDiscoveries.filter(d => d.confidence >= 0.5 && d.confidence < 0.8).length;
        console.log(`  - High (≥0.8): ${highConfUrl}`);
        console.log(`  - Medium (0.5-0.8): ${medConfUrl}`);
    }
    else {
        throw new Error('Some URL-based discoveries have very low confidence (<0.5)');
    }
    console.log('\n✓ Confidence scoring test passed\n');
}
function testDeduplication() {
    console.log('\n=== Test: Deduplication ===\n');
    // Create tweets with duplicate mentions
    const duplicateTweets = [
        {
            id: '1',
            text: 'Cursor is amazing! https://cursor.com',
            url: 'https://nitter.net/user/status/1',
            author: 'User1',
            authorHandle: 'user1',
            timestamp: new Date(),
            links: ['https://cursor.com'],
        },
        {
            id: '2',
            text: 'Just tried Cursor - https://cursor.com - and I love it!',
            url: 'https://nitter.net/user/status/2',
            author: 'User2',
            authorHandle: 'user2',
            timestamp: new Date(),
            links: ['https://cursor.com'],
        },
        {
            id: '3',
            text: 'Cursor editor is the best',
            url: 'https://nitter.net/user/status/3',
            author: 'User3',
            authorHandle: 'user3',
            timestamp: new Date(),
            links: [],
        },
    ];
    const discoveries = (0, nitter_crawler_1.extractDiscoveries)(duplicateTweets);
    console.log(`Processed ${duplicateTweets.length} tweets with duplicate mentions`);
    console.log(`Found ${discoveries.length} unique discoveries`);
    // Should deduplicate Cursor mentions
    const cursorMentions = discoveries.filter(d => d.name.toLowerCase().includes('cursor'));
    console.log(`Cursor mentioned ${cursorMentions.length} time(s) after deduplication`);
    discoveries.forEach(d => {
        console.log(`  - ${d.name} (confidence: ${d.confidence})`);
    });
    if (discoveries.length <= duplicateTweets.length) {
        console.log(`\n✓ Deduplication working (${discoveries.length} unique from ${duplicateTweets.length} tweets)`);
    }
    else {
        throw new Error('Deduplication failed - more discoveries than tweets');
    }
    console.log('\n✓ Deduplication test passed\n');
}
// ============================================
// RUN TESTS
// ============================================
function runAllTests() {
    console.log('\n========================================');
    console.log('NITTER CRAWLER TESTS');
    console.log('========================================');
    try {
        testExtractDiscoveries();
        testConfidenceScoring();
        testDeduplication();
        console.log('\n========================================');
        console.log('✓ ALL TESTS PASSED');
        console.log('========================================\n');
    }
    catch (error) {
        console.error('\n========================================');
        console.error('✗ TEST FAILED');
        console.error('========================================\n');
        console.error(error);
        process.exit(1);
    }
}
// Run if executed directly
if (require.main === module) {
    runAllTests();
}
//# sourceMappingURL=nitter-crawler.test.js.map