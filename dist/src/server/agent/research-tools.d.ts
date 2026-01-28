/**
 * MCP tools for research workflow
 *
 * These tools are exposed to research agents via the Claude Agent SDK.
 * They wrap the existing CLI extraction tools and provide task management
 * for the research session.
 */
import { z } from 'zod';
import { ResearchSessionManager } from './research-session';
/**
 * Create an MCP server with all research tools for a specific session
 */
export declare function createResearchMcpServer(sessionId: string, sessionManager: ResearchSessionManager): import("@anthropic-ai/claude-agent-sdk").McpSdkServerConfigWithInstance;
/**
 * Export individual tools for testing
 */
export declare const researchTools: {
    fetchUrl: (sessionId: string, sessionManager: ResearchSessionManager) => {
        name: string;
        description: string;
        inputSchema: {
            url: z.ZodString;
            entityId: z.ZodString;
        };
        handler: (args: {
            url: string;
            entityId: string;
        }, extra: unknown) => Promise<CallToolResult>;
    };
    getCachedContent: {
        name: string;
        description: string;
        inputSchema: {
            cacheId: z.ZodString;
        };
        handler: (args: {
            cacheId: string;
        }, extra: unknown) => Promise<CallToolResult>;
    };
    saveExtraction: (sessionId: string, sessionManager: ResearchSessionManager) => {
        name: string;
        description: string;
        inputSchema: {
            entityId: z.ZodString;
            schemaType: z.ZodEnum<["pricing", "features", "company", "compliance", "integrations"]>;
            url: z.ZodString;
            screenshotPath: z.ZodOptional<z.ZodString>;
            data: z.ZodRecord<z.ZodString, z.ZodAny>;
            createAssertions: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
        };
        handler: (args: {
            data: Record<string, any>;
            url: string;
            entityId: string;
            schemaType: "pricing" | "features" | "company" | "compliance" | "integrations";
            createAssertions: boolean;
            screenshotPath?: string | undefined;
        }, extra: unknown) => Promise<CallToolResult>;
    };
    createAssertion: (sessionId: string, sessionManager: ResearchSessionManager) => {
        name: string;
        description: string;
        inputSchema: {
            entityId: z.ZodString;
            claim: z.ZodString;
            category: z.ZodOptional<z.ZodString>;
            evidenceDescription: z.ZodString;
            evidenceScreenshotPath: z.ZodString;
            sourceUrl: z.ZodOptional<z.ZodString>;
            reasoning: z.ZodOptional<z.ZodString>;
            criticality: z.ZodDefault<z.ZodOptional<z.ZodEnum<["CRITICAL", "HIGH", "MEDIUM", "LOW"]>>>;
        };
        handler: (args: {
            entityId: string;
            claim: string;
            criticality: "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";
            evidenceDescription: string;
            evidenceScreenshotPath: string;
            reasoning?: string | undefined;
            category?: string | undefined;
            sourceUrl?: string | undefined;
        }, extra: unknown) => Promise<CallToolResult>;
    };
    updateTaskProgress: (sessionId: string, sessionManager: ResearchSessionManager) => {
        name: string;
        description: string;
        inputSchema: {
            taskId: z.ZodString;
            stage: z.ZodEnum<["initializing", "fetching_urls", "capturing_evidence", "analyzing_content", "creating_assertions", "validating_data", "finalizing"]>;
            stageDescription: z.ZodString;
            percentComplete: z.ZodNumber;
            urlsFetched: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
            screenshotsCaptured: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
            assertionsCreated: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
            evidenceCollected: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
        };
        handler: (args: {
            assertionsCreated: number;
            taskId: string;
            stage: "initializing" | "fetching_urls" | "capturing_evidence" | "analyzing_content" | "creating_assertions" | "validating_data" | "finalizing";
            stageDescription: string;
            percentComplete: number;
            urlsFetched: number;
            screenshotsCaptured: number;
            evidenceCollected: number;
        }, extra: unknown) => Promise<CallToolResult>;
    };
    completeTask: (sessionId: string, sessionManager: ResearchSessionManager) => {
        name: string;
        description: string;
        inputSchema: {
            taskId: z.ZodString;
            category: z.ZodEnum<["pricing", "features", "company", "compliance", "integrations"]>;
            extractionId: z.ZodOptional<z.ZodString>;
            assertionIds: z.ZodArray<z.ZodString, "many">;
            screenshotPaths: z.ZodArray<z.ZodString, "many">;
            sourcesFound: z.ZodNumber;
            dataQuality: z.ZodEnum<["high", "medium", "low", "insufficient"]>;
            summary: z.ZodString;
        };
        handler: (args: {
            category: "pricing" | "features" | "company" | "compliance" | "integrations";
            assertionIds: string[];
            summary: string;
            taskId: string;
            dataQuality: "high" | "medium" | "low" | "insufficient";
            screenshotPaths: string[];
            sourcesFound: number;
            extractionId?: string | undefined;
        }, extra: unknown) => Promise<CallToolResult>;
    };
    failTask: (sessionId: string, sessionManager: ResearchSessionManager) => {
        name: string;
        description: string;
        inputSchema: {
            taskId: z.ZodString;
            error: z.ZodString;
        };
        handler: (args: {
            error: string;
            taskId: string;
        }, extra: unknown) => Promise<CallToolResult>;
    };
    getTasks: (sessionId: string) => {
        name: string;
        description: string;
        inputSchema: {};
        handler: (args: {}, extra: unknown) => Promise<CallToolResult>;
    };
    getEntity: (sessionId: string, sessionManager: ResearchSessionManager) => {
        name: string;
        description: string;
        inputSchema: {};
        handler: (args: {}, extra: unknown) => Promise<CallToolResult>;
    };
};
//# sourceMappingURL=research-tools.d.ts.map