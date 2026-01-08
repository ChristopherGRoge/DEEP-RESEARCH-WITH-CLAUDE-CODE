/**
 * MCP tools for validation workflow
 * These tools are exposed to Claude via the Agent SDK
 */
import { z } from 'zod';
export declare const validationTools: {
    getNextAssertion: {
        name: string;
        description: string;
        inputSchema: {
            projectId: z.ZodOptional<z.ZodString>;
            criticality: z.ZodOptional<z.ZodEnum<["CRITICAL", "HIGH", "MEDIUM", "LOW"]>>;
        };
        handler: (args: {
            projectId?: string | undefined;
            criticality?: "CRITICAL" | "HIGH" | "MEDIUM" | "LOW" | undefined;
        }, extra: unknown) => Promise<CallToolResult>;
    };
    getAssertionById: {
        name: string;
        description: string;
        inputSchema: {
            assertionId: z.ZodString;
        };
        handler: (args: {
            assertionId: string;
        }, extra: unknown) => Promise<CallToolResult>;
    };
    validateAssertion: {
        name: string;
        description: string;
        inputSchema: {
            assertionId: z.ZodString;
            validatedBy: z.ZodString;
            humanResponse: z.ZodOptional<z.ZodString>;
        };
        handler: (args: {
            validatedBy: string;
            assertionId: string;
            humanResponse?: string | undefined;
        }, extra: unknown) => Promise<CallToolResult>;
    };
    rejectAssertion: {
        name: string;
        description: string;
        inputSchema: {
            assertionId: z.ZodString;
            validatedBy: z.ZodString;
            rejectionReason: z.ZodString;
        };
        handler: (args: {
            validatedBy: string;
            rejectionReason: string;
            assertionId: string;
        }, extra: unknown) => Promise<CallToolResult>;
    };
    addValidationNote: {
        name: string;
        description: string;
        inputSchema: {
            assertionId: z.ZodString;
            role: z.ZodEnum<["human", "agent"]>;
            content: z.ZodString;
        };
        handler: (args: {
            content: string;
            assertionId: string;
            role: "agent" | "human";
        }, extra: unknown) => Promise<CallToolResult>;
    };
    createFollowupAssertion: {
        name: string;
        description: string;
        inputSchema: {
            entityId: z.ZodString;
            claim: z.ZodString;
            category: z.ZodOptional<z.ZodString>;
            reasoning: z.ZodOptional<z.ZodString>;
            sourceUrl: z.ZodOptional<z.ZodString>;
            sourceQuote: z.ZodOptional<z.ZodString>;
        };
        handler: (args: {
            entityId: string;
            claim: string;
            reasoning?: string | undefined;
            category?: string | undefined;
            sourceUrl?: string | undefined;
            sourceQuote?: string | undefined;
        }, extra: unknown) => Promise<CallToolResult>;
    };
    getPendingCount: {
        name: string;
        description: string;
        inputSchema: {
            projectId: z.ZodOptional<z.ZodString>;
        };
        handler: (args: {
            projectId?: string | undefined;
        }, extra: unknown) => Promise<CallToolResult>;
    };
};
export declare function createValidationMcpServer(): import("@anthropic-ai/claude-agent-sdk").McpSdkServerConfigWithInstance;
//# sourceMappingURL=tools.d.ts.map