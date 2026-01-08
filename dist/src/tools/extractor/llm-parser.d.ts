/**
 * LLM Parser - Claude-based structured data extraction
 *
 * Uses Claude Haiku for cost-effective extraction of structured data
 * from HTML/text content according to predefined schemas.
 */
import { SchemaType } from './schemas';
export interface ExtractionResult {
    success: boolean;
    data: unknown;
    confidence: number;
    quotes: string[];
    error?: string;
}
export declare function extractWithLLM(content: string, schemaType: SchemaType, options?: {
    model?: string;
    maxTokens?: number;
}): Promise<ExtractionResult>;
export declare function quickExtract(content: string, prompt: string): Promise<{
    success: boolean;
    result: string;
    error?: string;
}>;
//# sourceMappingURL=llm-parser.d.ts.map