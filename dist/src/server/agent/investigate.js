"use strict";
/**
 * Gap Investigation Agent
 *
 * Investigates evidence gaps identified during AI assessment.
 * Uses web search and screenshot capture to find missing evidence.
 *
 * Uses Claude Agent SDK with tools enabled for web search and screenshots.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.investigateGap = investigateGap;
const claude_agent_sdk_1 = require("@anthropic-ai/claude-agent-sdk");
// ============================================
// System Prompt for Investigation
// ============================================
const INVESTIGATION_SYSTEM_PROMPT = `You are a research investigator filling evidence gaps for research claims.

Your task is to investigate a specific evidence gap and find supporting or refuting evidence.

WORKFLOW:
1. Use WebSearch to find relevant information about the gap
2. When you find a promising source, use WebFetch to retrieve and analyze the page content
3. Extract specific quotes or data points that address the gap
4. ALWAYS provide your final findings in the structured format below

CRITICAL REQUIREMENTS:
- Focus ONLY on the specific gap described - don't investigate unrelated aspects
- Quote specific text from sources - don't paraphrase
- Report honestly if you couldn't find evidence addressing the gap
- ALWAYS end with the structured findings format, even if investigation is incomplete

When you're done investigating, you MUST provide your findings in EXACTLY this format:
EVIDENCE_FOUND: [yes/no]
SOURCE_URL: [URL where evidence was found, or "none"]
SOURCE_QUOTE: [Exact quote from source, or "none"]
FINDINGS: [Summary of what you discovered about this gap]`;
// ============================================
// Investigation Function
// ============================================
async function investigateGap(request) {
    const prompt = buildInvestigationPrompt(request);
    // Single-turn input generator
    async function* investigationInput() {
        yield {
            type: 'user',
            message: { role: 'user', content: prompt },
            parent_tool_use_id: null,
            session_id: `investigate-${Date.now()}`,
        };
    }
    // Investigation agent with web search and screenshot tools enabled
    const q = (0, claude_agent_sdk_1.query)({
        prompt: investigationInput(),
        options: {
            systemPrompt: INVESTIGATION_SYSTEM_PROMPT,
            model: 'claude-sonnet-4-20250514',
            maxTurns: 10, // Allow multiple turns for search + fetch + analysis
            allowedTools: [
                'WebSearch',
                'WebFetch',
            ],
            permissionMode: 'acceptEdits',
            cwd: process.cwd(),
        },
    });
    // Collect response and any screenshots
    let responseText = '';
    let screenshotPath = null;
    for await (const event of q) {
        if (event.type === 'assistant' && event.message?.content) {
            for (const block of event.message.content) {
                if (block.type === 'text') {
                    responseText = block.text;
                }
            }
        }
        // Check for tool results that might contain screenshot paths
        if (event.type === 'result') {
            const result = event;
            if (result.output?.screenshotPath) {
                screenshotPath = result.output.screenshotPath;
            }
        }
    }
    if (!responseText) {
        return {
            success: false,
            gapDescription: request.gapDescription,
            findings: 'Investigation failed - no response from agent',
            evidenceFound: false,
            screenshotPath: null,
            screenshotDescription: null,
            sourceUrl: null,
            sourceQuote: null,
        };
    }
    return parseInvestigationResponse(responseText, request.gapDescription, screenshotPath);
}
// ============================================
// Prompt Builder
// ============================================
function buildInvestigationPrompt(request) {
    return `You are investigating an evidence gap for a research assertion.

══════════════════════════════════════════════════════════════════
CONTEXT
══════════════════════════════════════════════════════════════════

ENTITY: ${request.entityName}
ORIGINAL CLAIM: "${request.claim}"

══════════════════════════════════════════════════════════════════
EVIDENCE GAP TO INVESTIGATE
══════════════════════════════════════════════════════════════════

GAP: ${request.gapDescription}
SUGGESTED SEARCH: ${request.searchQuery}

══════════════════════════════════════════════════════════════════
YOUR TASK
══════════════════════════════════════════════════════════════════

1. Use web_search with the suggested query (or a refined version) to find evidence
2. Review the search results and identify the most relevant source
3. If you find relevant information, capture a screenshot of the page
4. Extract specific quotes that address the gap
5. Report your findings

Remember: Focus ONLY on this specific gap. We need evidence that directly addresses: "${request.gapDescription}"`;
}
// ============================================
// Response Parser
// ============================================
function parseInvestigationResponse(text, gapDescription, screenshotPath) {
    const lines = text.split('\n');
    let evidenceFound = false;
    let sourceUrl = null;
    let sourceQuote = null;
    let screenshotDescription = null;
    let findings = '';
    for (const line of lines) {
        const trimmed = line.trim();
        if (trimmed.startsWith('EVIDENCE_FOUND:')) {
            const value = trimmed.replace('EVIDENCE_FOUND:', '').trim().toLowerCase();
            evidenceFound = value === 'yes' || value === 'true';
        }
        else if (trimmed.startsWith('SOURCE_URL:')) {
            const value = trimmed.replace('SOURCE_URL:', '').trim();
            sourceUrl = value.toLowerCase() === 'none' ? null : value;
        }
        else if (trimmed.startsWith('SOURCE_QUOTE:')) {
            const value = trimmed.replace('SOURCE_QUOTE:', '').trim();
            sourceQuote = value.toLowerCase() === 'none' ? null : value;
        }
        else if (trimmed.startsWith('SCREENSHOT_DESCRIPTION:')) {
            const value = trimmed.replace('SCREENSHOT_DESCRIPTION:', '').trim();
            screenshotDescription = value.toLowerCase() === 'none' ? null : value;
        }
        else if (trimmed.startsWith('FINDINGS:')) {
            findings = trimmed.replace('FINDINGS:', '').trim();
        }
    }
    // If no structured findings, use the full text
    if (!findings) {
        findings = text;
    }
    return {
        success: true,
        gapDescription,
        findings,
        evidenceFound,
        screenshotPath,
        screenshotDescription,
        sourceUrl,
        sourceQuote,
    };
}
//# sourceMappingURL=investigate.js.map