"use strict";
/**
 * Citation Verification Tool
 *
 * CRITICAL: This tool MUST be run before citing any quote from a URL.
 *
 * Problem: WebSearch returns snippets that may be:
 * - Outdated (page changed since indexing)
 * - Hallucinated (AI-generated summaries, not actual content)
 * - Paraphrased (not exact quotes)
 * - From non-existent pages (404s not yet detected)
 *
 * Solution: This tool fetches the actual page and verifies the quote exists.
 *
 * Usage:
 *   npm run cli -- cite:verify '{"url": "https://example.com", "quote": "exact text to find"}'
 *
 * Returns:
 *   - found: boolean - whether the exact quote was found
 *   - context: string - surrounding text if found
 *   - similar: string[] - similar phrases found if exact match fails
 *   - accessible: boolean - whether the URL is accessible
 *   - recommendation: string - "CITE", "PARAPHRASE", or "DO NOT CITE"
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyCitation = verifyCitation;
const fetcher_1 = require("./extractor/fetcher");
/**
 * Normalize text for comparison
 */
function normalizeText(text) {
    return text
        .toLowerCase()
        .replace(/\s+/g, ' ') // Normalize whitespace
        .replace(/[""]/g, '"') // Normalize quotes
        .replace(/['']/g, "'") // Normalize apostrophes
        .replace(/[–—]/g, '-') // Normalize dashes
        .trim();
}
/**
 * Find context around a match
 */
function extractContext(content, matchIndex, quoteLength, contextChars = 200) {
    const start = Math.max(0, matchIndex - contextChars);
    const end = Math.min(content.length, matchIndex + quoteLength + contextChars);
    let context = content.substring(start, end);
    // Add ellipsis if truncated
    if (start > 0)
        context = '...' + context;
    if (end < content.length)
        context = context + '...';
    return context.replace(/\s+/g, ' ').trim();
}
/**
 * Find similar phrases in content
 */
function findSimilarPhrases(content, quote, maxResults = 3) {
    const normalizedQuote = normalizeText(quote);
    const words = normalizedQuote.split(' ').filter(w => w.length > 4);
    if (words.length === 0)
        return [];
    const similar = new Set();
    const contentLower = content.toLowerCase();
    // Look for sentences containing key words from the quote
    const sentences = content.split(/[.!?]+/).map(s => s.trim()).filter(s => s.length > 20);
    for (const word of words) {
        for (const sentence of sentences) {
            if (sentence.toLowerCase().includes(word) && !similar.has(sentence)) {
                similar.add(sentence.substring(0, 200) + (sentence.length > 200 ? '...' : ''));
                if (similar.size >= maxResults)
                    break;
            }
        }
        if (similar.size >= maxResults)
            break;
    }
    return Array.from(similar);
}
/**
 * Verify that a specific quote exists at a URL
 *
 * MUST be called before citing any quote from a URL in research outputs.
 */
async function verifyCitation(input) {
    const { url, quote, fuzzyMatch = true } = input;
    const result = {
        success: false,
        url,
        quote,
        found: false,
        accessible: false,
        recommendation: 'DO_NOT_CITE',
        reasoning: ''
    };
    try {
        // 1. Fetch the URL
        console.error(`[cite:verify] Fetching: ${url}`);
        const fetchResult = await (0, fetcher_1.fetchUrl)(url);
        // 2. Check accessibility
        if (!fetchResult.success || !fetchResult.text) {
            await (0, fetcher_1.closeBrowser)();
            result.accessible = false;
            result.statusCode = fetchResult.statusCode;
            result.recommendation = 'PAGE_NOT_FOUND';
            result.reasoning = `URL returned status ${fetchResult.statusCode || 'unknown'}. Cannot verify quote - no text content retrieved.`;
            result.success = true; // The verification itself succeeded
            return result;
        }
        result.accessible = true;
        result.statusCode = fetchResult.statusCode;
        // 3. Search for exact quote
        const content = fetchResult.text;
        const normalizedContent = normalizeText(content);
        const normalizedQuote = normalizeText(quote);
        const exactIndex = normalizedContent.indexOf(normalizedQuote);
        if (exactIndex !== -1) {
            // Found exact match
            result.found = true;
            result.context = extractContext(content, exactIndex, quote.length);
            result.recommendation = 'CITE';
            result.reasoning = 'Exact quote found on page. Safe to cite with this URL.';
            result.success = true;
            await (0, fetcher_1.closeBrowser)();
            return result;
        }
        // 4. Try fuzzy matching if enabled
        if (fuzzyMatch) {
            result.similarPhrases = findSimilarPhrases(content, quote);
            if (result.similarPhrases.length > 0) {
                result.recommendation = 'PARAPHRASE';
                result.reasoning = `Exact quote NOT found, but similar content exists. Paraphrase using one of the similar phrases found, or fetch the page to find the actual text.`;
            }
            else {
                result.recommendation = 'DO_NOT_CITE';
                result.reasoning = 'Quote not found on page, and no similar content detected. The quote may be outdated, from a different page, or hallucinated.';
            }
        }
        else {
            result.recommendation = 'DO_NOT_CITE';
            result.reasoning = 'Exact quote not found on page.';
        }
        result.success = true;
        await (0, fetcher_1.closeBrowser)();
        return result;
    }
    catch (error) {
        await (0, fetcher_1.closeBrowser)();
        result.error = error instanceof Error ? error.message : String(error);
        result.reasoning = `Error during verification: ${result.error}`;
        return result;
    }
}
//# sourceMappingURL=cite-verify.js.map