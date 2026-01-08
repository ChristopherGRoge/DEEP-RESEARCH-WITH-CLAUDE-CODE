"use strict";
/**
 * LLM Parser - Claude-based structured data extraction
 *
 * Uses Claude Haiku for cost-effective extraction of structured data
 * from HTML/text content according to predefined schemas.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractWithLLM = extractWithLLM;
exports.quickExtract = quickExtract;
const sdk_1 = __importDefault(require("@anthropic-ai/sdk"));
const schemas_1 = require("./schemas");
// ============================================
// ANTHROPIC CLIENT
// ============================================
let anthropicClient = null;
function getClient() {
    if (!anthropicClient) {
        anthropicClient = new sdk_1.default();
    }
    return anthropicClient;
}
// ============================================
// EXTRACTION PROMPTS
// ============================================
const SYSTEM_PROMPT = `You are a structured data extraction agent. Your job is to extract specific information from web page content and return it as valid JSON.

RULES:
1. ONLY extract information explicitly present in the content
2. Use null for missing fields - NEVER hallucinate or guess
3. Include exact quotes from the source as evidence for key claims
4. Rate your confidence (0.0-1.0) based on data clarity and completeness
5. If the page doesn't contain the requested information, return minimal data with low confidence

OUTPUT FORMAT:
Always respond with valid JSON in this exact structure:
{
  "data": { ... extracted data matching the schema ... },
  "confidence": 0.0-1.0,
  "quotes": ["exact quote 1", "exact quote 2"]
}`;
// ============================================
// MAIN EXTRACTION FUNCTION
// ============================================
async function extractWithLLM(content, schemaType, options = {}) {
    const { model = 'claude-3-5-haiku-20241022', maxTokens = 4096, } = options;
    const client = getClient();
    const schemaDescription = (0, schemas_1.getSchemaDescription)(schemaType);
    // Truncate content if too long (keep under ~40k tokens)
    const truncatedContent = content.length > 80000
        ? content.substring(0, 80000) + '\n\n[Content truncated...]'
        : content;
    try {
        const response = await client.messages.create({
            model,
            max_tokens: maxTokens,
            system: SYSTEM_PROMPT,
            messages: [{
                    role: 'user',
                    content: `Extract ${schemaType} information from this web page content.

EXTRACTION INSTRUCTIONS:
${schemaDescription}

WEB PAGE CONTENT:
---
${truncatedContent}
---

Respond with JSON only. No markdown, no explanation.`,
                }],
        });
        // Extract text from response
        const textContent = response.content.find(block => block.type === 'text');
        if (!textContent || textContent.type !== 'text') {
            return {
                success: false,
                data: null,
                confidence: 0,
                quotes: [],
                error: 'No text content in response',
            };
        }
        // Parse JSON response
        let parsed;
        try {
            // Clean up response - sometimes LLM wraps in markdown
            let jsonText = textContent.text.trim();
            if (jsonText.startsWith('```json')) {
                jsonText = jsonText.slice(7);
            }
            if (jsonText.startsWith('```')) {
                jsonText = jsonText.slice(3);
            }
            if (jsonText.endsWith('```')) {
                jsonText = jsonText.slice(0, -3);
            }
            parsed = JSON.parse(jsonText.trim());
        }
        catch (parseError) {
            return {
                success: false,
                data: null,
                confidence: 0,
                quotes: [],
                error: `Failed to parse LLM response: ${parseError}`,
            };
        }
        // Validate against schema
        try {
            const validatedData = (0, schemas_1.validateExtraction)(schemaType, parsed.data);
            return {
                success: true,
                data: validatedData,
                confidence: parsed.confidence || 0.5,
                quotes: parsed.quotes || [],
            };
        }
        catch (validationError) {
            // Return data even if validation fails, but with lower confidence
            return {
                success: true,
                data: parsed.data,
                confidence: Math.min(parsed.confidence || 0.5, 0.5),
                quotes: parsed.quotes || [],
                error: `Schema validation warning: ${validationError}`,
            };
        }
    }
    catch (error) {
        return {
            success: false,
            data: null,
            confidence: 0,
            quotes: [],
            error: error instanceof Error ? error.message : String(error),
        };
    }
}
// ============================================
// QUICK EXTRACTION (for simple data)
// ============================================
async function quickExtract(content, prompt) {
    const client = getClient();
    try {
        const response = await client.messages.create({
            model: 'claude-3-5-haiku-20241022',
            max_tokens: 1024,
            messages: [{
                    role: 'user',
                    content: `${prompt}\n\nContent:\n${content.substring(0, 10000)}`,
                }],
        });
        const textContent = response.content.find(block => block.type === 'text');
        if (!textContent || textContent.type !== 'text') {
            return { success: false, result: '', error: 'No text content' };
        }
        return { success: true, result: textContent.text };
    }
    catch (error) {
        return {
            success: false,
            result: '',
            error: error instanceof Error ? error.message : String(error),
        };
    }
}
//# sourceMappingURL=llm-parser.js.map