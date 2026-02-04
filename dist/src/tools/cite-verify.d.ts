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
export interface CiteVerifyInput {
    url: string;
    quote: string;
    fuzzyMatch?: boolean;
}
export interface CiteVerifyResult {
    success: boolean;
    url: string;
    quote: string;
    found: boolean;
    accessible: boolean;
    statusCode?: number;
    context?: string;
    similarPhrases?: string[];
    recommendation: 'CITE' | 'PARAPHRASE' | 'DO_NOT_CITE' | 'PAGE_NOT_FOUND';
    reasoning: string;
    error?: string;
}
/**
 * Verify that a specific quote exists at a URL
 *
 * MUST be called before citing any quote from a URL in research outputs.
 */
export declare function verifyCitation(input: CiteVerifyInput): Promise<CiteVerifyResult>;
//# sourceMappingURL=cite-verify.d.ts.map