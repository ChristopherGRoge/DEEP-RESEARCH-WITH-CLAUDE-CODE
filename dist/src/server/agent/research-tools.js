"use strict";
/**
 * MCP tools for research workflow
 *
 * These tools are exposed to research agents via the Claude Agent SDK.
 * They wrap the existing CLI extraction tools and provide task management
 * for the research session.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.researchTools = void 0;
exports.createResearchMcpServer = createResearchMcpServer;
const zod_1 = require("zod");
const claude_agent_sdk_1 = require("@anthropic-ai/claude-agent-sdk");
const tools_1 = require("../../tools");
const extractor_1 = require("../../tools/extractor");
const client_1 = require("../../../generated/prisma/client");
// ============================================
// URL Fetching and Evidence Capture
// ============================================
const fetchUrlTool = (sessionId, sessionManager) => (0, claude_agent_sdk_1.tool)('fetch_url', 'Fetch a URL and capture a screenshot as evidence. ALWAYS use this before creating assertions.', {
    url: zod_1.z.string().describe('The URL to fetch'),
    entityId: zod_1.z.string().describe('The entity ID this URL is about'),
}, async (args) => {
    try {
        const result = await (0, extractor_1.fetchForExtraction)({
            url: args.url,
            entityId: args.entityId,
            screenshot: true,
        });
        if (!result.success) {
            return {
                content: [
                    {
                        type: 'text',
                        text: JSON.stringify({
                            success: false,
                            error: result.error,
                        }),
                    },
                ],
            };
        }
        // Notify session about screenshot capture
        const session = sessionManager.getSession(sessionId);
        if (session?.onMessage) {
            session.onMessage({
                type: 'screenshot_captured',
                url: args.url,
                screenshotPath: result.screenshotPath,
                entityName: result.entityName,
            });
        }
        return {
            content: [
                {
                    type: 'text',
                    text: JSON.stringify({
                        success: true,
                        cacheId: result.cacheId,
                        cachePath: result.cachePath,
                        screenshotPath: result.screenshotPath,
                        url: result.url,
                        entityId: result.entityId,
                        entityName: result.entityName,
                        contentPreview: result.contentPreview,
                        message: 'URL fetched and screenshot captured. Analyze the screenshot to extract data.',
                    }),
                },
            ],
        };
    }
    catch (error) {
        return {
            content: [
                {
                    type: 'text',
                    text: JSON.stringify({
                        success: false,
                        error: error instanceof Error ? error.message : String(error),
                    }),
                },
            ],
        };
    }
});
const getCachedContentTool = (0, claude_agent_sdk_1.tool)('get_cached_content', 'Read cached content from a previous fetch operation', {
    cacheId: zod_1.z.string().describe('The cache ID from a previous fetch'),
}, async (args) => {
    const result = await (0, extractor_1.readCachedContent)(args.cacheId);
    return {
        content: [
            {
                type: 'text',
                text: JSON.stringify(result),
            },
        ],
    };
});
// ============================================
// Data Extraction and Storage
// ============================================
const saveExtractionTool = (sessionId, sessionManager) => (0, claude_agent_sdk_1.tool)('save_extraction', 'Save structured data extracted from a page. Use after analyzing screenshot/content.', {
    entityId: zod_1.z.string().describe('The entity ID'),
    schemaType: zod_1.z
        .enum(['pricing', 'features', 'company', 'compliance', 'integrations'])
        .describe('Type of data being saved'),
    url: zod_1.z.string().describe('The source URL'),
    screenshotPath: zod_1.z.string().optional().describe('Path to evidence screenshot'),
    data: zod_1.z.record(zod_1.z.any()).describe('The structured data extracted'),
    createAssertions: zod_1.z
        .boolean()
        .optional()
        .default(true)
        .describe('Whether to auto-generate assertions'),
}, async (args) => {
    try {
        const result = await (0, extractor_1.saveExtraction)({
            entityId: args.entityId,
            schemaType: args.schemaType,
            url: args.url,
            screenshotPath: args.screenshotPath,
            data: args.data,
            createAssertions: args.createAssertions,
        });
        if (!result.success) {
            return {
                content: [
                    {
                        type: 'text',
                        text: JSON.stringify({
                            success: false,
                            error: result.error,
                        }),
                    },
                ],
            };
        }
        // Notify session about extraction
        const session = sessionManager.getSession(sessionId);
        if (session?.onMessage) {
            session.onMessage({
                type: 'extraction_complete',
                schemaType: args.schemaType,
                extractionId: result.extractionId,
                assertionCount: result.assertionsCreated?.length || 0,
            });
        }
        return {
            content: [
                {
                    type: 'text',
                    text: JSON.stringify({
                        success: true,
                        extractionId: result.extractionId,
                        assertionsCreated: result.assertionsCreated,
                        message: `Saved ${args.schemaType} extraction with ${result.assertionsCreated?.length || 0} assertions`,
                    }),
                },
            ],
        };
    }
    catch (error) {
        return {
            content: [
                {
                    type: 'text',
                    text: JSON.stringify({
                        success: false,
                        error: error instanceof Error ? error.message : String(error),
                    }),
                },
            ],
        };
    }
});
// ============================================
// Assertion Creation
// ============================================
const createAssertionTool = (sessionId, sessionManager) => (0, claude_agent_sdk_1.tool)('create_assertion', 'Create an assertion with evidence. MUST include evidenceDescription and evidenceScreenshotPath.', {
    entityId: zod_1.z.string().describe('The entity ID'),
    claim: zod_1.z.string().describe('The claim being made'),
    category: zod_1.z
        .string()
        .optional()
        .describe('Category: feature, pricing, integration, compliance, etc.'),
    evidenceDescription: zod_1.z
        .string()
        .describe('REQUIRED: Description of evidence. Format: "On screenshot at <path>, the text <quote> appears in <location>"'),
    evidenceScreenshotPath: zod_1.z
        .string()
        .describe('REQUIRED: Path to the screenshot that contains the evidence'),
    sourceUrl: zod_1.z.string().optional().describe('The source URL where evidence was found'),
    reasoning: zod_1.z.string().optional().describe('Why this claim is significant'),
    criticality: zod_1.z
        .enum(['CRITICAL', 'HIGH', 'MEDIUM', 'LOW'])
        .optional()
        .default('MEDIUM')
        .describe('How important this claim is'),
}, async (args) => {
    try {
        // Validate required evidence fields
        if (!args.evidenceDescription || !args.evidenceScreenshotPath) {
            return {
                content: [
                    {
                        type: 'text',
                        text: JSON.stringify({
                            success: false,
                            error: 'Evidence-First Protocol violation: evidenceDescription and evidenceScreenshotPath are REQUIRED',
                        }),
                    },
                ],
            };
        }
        // Create the assertion
        const assertion = await tools_1.prisma.assertion.create({
            data: {
                entityId: args.entityId,
                claim: args.claim,
                category: args.category,
                status: client_1.AssertionStatus.CLAIM,
                criticality: args.criticality || client_1.AssertionCriticality.MEDIUM,
                evidenceDescription: args.evidenceDescription,
                evidenceScreenshotPath: args.evidenceScreenshotPath,
            },
        });
        // Add reasoning if provided
        if (args.reasoning) {
            await tools_1.prisma.reasoning.create({
                data: {
                    assertionId: assertion.id,
                    content: args.reasoning,
                },
            });
        }
        // Add source if URL provided
        if (args.sourceUrl) {
            let source = await tools_1.prisma.source.findUnique({
                where: { url: args.sourceUrl },
            });
            if (!source) {
                source = await tools_1.prisma.source.create({
                    data: {
                        url: args.sourceUrl,
                        sourceType: 'vendor_docs',
                    },
                });
            }
            await tools_1.prisma.assertionSource.create({
                data: {
                    assertionId: assertion.id,
                    sourceId: source.id,
                },
            });
        }
        // Log the action
        await tools_1.prisma.researchLog.create({
            data: {
                action: 'assertion_created',
                details: {
                    assertionId: assertion.id,
                    entityId: args.entityId,
                    claim: args.claim,
                    sessionId,
                },
                agentId: `research-agent-${sessionId}`,
            },
        });
        // Notify session
        const session = sessionManager.getSession(sessionId);
        if (session?.onMessage) {
            session.onMessage({
                type: 'assertion_created',
                assertionId: assertion.id,
                claim: args.claim,
                category: args.category,
            });
        }
        return {
            content: [
                {
                    type: 'text',
                    text: JSON.stringify({
                        success: true,
                        assertionId: assertion.id,
                        claim: args.claim,
                        message: 'Assertion created with evidence chain',
                    }),
                },
            ],
        };
    }
    catch (error) {
        return {
            content: [
                {
                    type: 'text',
                    text: JSON.stringify({
                        success: false,
                        error: error instanceof Error ? error.message : String(error),
                    }),
                },
            ],
        };
    }
});
// ============================================
// Task Progress Management
// ============================================
const updateTaskProgressTool = (sessionId, sessionManager) => (0, claude_agent_sdk_1.tool)('update_task_progress', 'Report progress on a research task', {
    taskId: zod_1.z.string().describe('The task ID to update'),
    stage: zod_1.z
        .enum([
        'initializing',
        'fetching_urls',
        'capturing_evidence',
        'analyzing_content',
        'creating_assertions',
        'validating_data',
        'finalizing',
    ])
        .describe('Current stage of the task'),
    stageDescription: zod_1.z.string().describe('Human-readable description of current work'),
    percentComplete: zod_1.z.number().min(0).max(100).describe('Percent complete (0-100)'),
    urlsFetched: zod_1.z.number().optional().default(0).describe('Number of URLs fetched'),
    screenshotsCaptured: zod_1.z
        .number()
        .optional()
        .default(0)
        .describe('Number of screenshots captured'),
    assertionsCreated: zod_1.z
        .number()
        .optional()
        .default(0)
        .describe('Number of assertions created'),
    evidenceCollected: zod_1.z
        .number()
        .optional()
        .default(0)
        .describe('Number of evidence items collected'),
}, async (args) => {
    try {
        const progress = {
            stage: args.stage,
            stageDescription: args.stageDescription,
            percentComplete: args.percentComplete,
            urlsFetched: args.urlsFetched || 0,
            screenshotsCaptured: args.screenshotsCaptured || 0,
            assertionsCreated: args.assertionsCreated || 0,
            evidenceCollected: args.evidenceCollected || 0,
        };
        await sessionManager.updateTaskProgress(sessionId, args.taskId, progress);
        return {
            content: [
                {
                    type: 'text',
                    text: JSON.stringify({
                        success: true,
                        message: `Task progress updated: ${args.stageDescription} (${args.percentComplete}%)`,
                    }),
                },
            ],
        };
    }
    catch (error) {
        return {
            content: [
                {
                    type: 'text',
                    text: JSON.stringify({
                        success: false,
                        error: error instanceof Error ? error.message : String(error),
                    }),
                },
            ],
        };
    }
});
const completeTaskTool = (sessionId, sessionManager) => (0, claude_agent_sdk_1.tool)('complete_task', 'Mark a research task as completed with results', {
    taskId: zod_1.z.string().describe('The task ID to complete'),
    category: zod_1.z
        .enum(['pricing', 'features', 'company', 'compliance', 'integrations'])
        .describe('The research category'),
    extractionId: zod_1.z.string().optional().describe('ID of the extraction created'),
    assertionIds: zod_1.z.array(zod_1.z.string()).describe('IDs of assertions created'),
    screenshotPaths: zod_1.z.array(zod_1.z.string()).describe('Paths to screenshots captured'),
    sourcesFound: zod_1.z.number().describe('Number of source URLs found'),
    dataQuality: zod_1.z
        .enum(['high', 'medium', 'low', 'insufficient'])
        .describe('Quality assessment of extracted data'),
    summary: zod_1.z.string().describe('Brief summary of findings'),
}, async (args) => {
    try {
        const results = {
            category: args.category,
            extractionId: args.extractionId,
            assertionIds: args.assertionIds,
            screenshotPaths: args.screenshotPaths,
            sourcesFound: args.sourcesFound,
            dataQuality: args.dataQuality,
            summary: args.summary,
        };
        await sessionManager.completeTask(sessionId, args.taskId, results);
        return {
            content: [
                {
                    type: 'text',
                    text: JSON.stringify({
                        success: true,
                        message: `Task completed: ${args.category} - ${args.summary}`,
                        assertionCount: args.assertionIds.length,
                        screenshotCount: args.screenshotPaths.length,
                    }),
                },
            ],
        };
    }
    catch (error) {
        return {
            content: [
                {
                    type: 'text',
                    text: JSON.stringify({
                        success: false,
                        error: error instanceof Error ? error.message : String(error),
                    }),
                },
            ],
        };
    }
});
const failTaskTool = (sessionId, sessionManager) => (0, claude_agent_sdk_1.tool)('fail_task', 'Mark a research task as failed with an error message', {
    taskId: zod_1.z.string().describe('The task ID that failed'),
    error: zod_1.z.string().describe('Error message explaining what went wrong'),
}, async (args) => {
    try {
        await sessionManager.failTask(sessionId, args.taskId, args.error);
        return {
            content: [
                {
                    type: 'text',
                    text: JSON.stringify({
                        success: true,
                        message: `Task marked as failed: ${args.error}`,
                    }),
                },
            ],
        };
    }
    catch (error) {
        return {
            content: [
                {
                    type: 'text',
                    text: JSON.stringify({
                        success: false,
                        error: error instanceof Error ? error.message : String(error),
                    }),
                },
            ],
        };
    }
});
// ============================================
// Session Information
// ============================================
const getTasksTool = (sessionId) => (0, claude_agent_sdk_1.tool)('get_tasks', 'Get the list of tasks for this research session', {}, async () => {
    try {
        const tasks = await tools_1.prisma.researchTask.findMany({
            where: { sessionId },
            orderBy: { category: 'asc' },
        });
        return {
            content: [
                {
                    type: 'text',
                    text: JSON.stringify({
                        success: true,
                        tasks: tasks.map((t) => ({
                            id: t.id,
                            category: t.category,
                            status: t.status,
                            progress: t.progress,
                        })),
                    }),
                },
            ],
        };
    }
    catch (error) {
        return {
            content: [
                {
                    type: 'text',
                    text: JSON.stringify({
                        success: false,
                        error: error instanceof Error ? error.message : String(error),
                    }),
                },
            ],
        };
    }
});
const getEntityTool = (sessionId, sessionManager) => (0, claude_agent_sdk_1.tool)('get_entity', 'Get entity information for this research session', {}, async () => {
    try {
        const session = sessionManager.getSession(sessionId);
        if (!session) {
            return {
                content: [
                    {
                        type: 'text',
                        text: JSON.stringify({ success: false, error: 'Session not found' }),
                    },
                ],
            };
        }
        const entity = await tools_1.prisma.entity.findUnique({
            where: { id: session.entityId },
            include: {
                project: { select: { id: true, name: true } },
            },
        });
        return {
            content: [
                {
                    type: 'text',
                    text: JSON.stringify({
                        success: true,
                        entity: {
                            id: entity?.id,
                            name: entity?.name,
                            url: entity?.url,
                            entityType: entity?.entityType,
                            project: entity?.project,
                        },
                    }),
                },
            ],
        };
    }
    catch (error) {
        return {
            content: [
                {
                    type: 'text',
                    text: JSON.stringify({
                        success: false,
                        error: error instanceof Error ? error.message : String(error),
                    }),
                },
            ],
        };
    }
});
// ============================================
// MCP Server Factory
// ============================================
/**
 * Create an MCP server with all research tools for a specific session
 */
function createResearchMcpServer(sessionId, sessionManager) {
    return (0, claude_agent_sdk_1.createSdkMcpServer)({
        name: 'research',
        version: '1.0.0',
        tools: [
            // URL fetching and evidence capture
            fetchUrlTool(sessionId, sessionManager),
            getCachedContentTool,
            // Data extraction and storage
            saveExtractionTool(sessionId, sessionManager),
            createAssertionTool(sessionId, sessionManager),
            // Task progress management
            updateTaskProgressTool(sessionId, sessionManager),
            completeTaskTool(sessionId, sessionManager),
            failTaskTool(sessionId, sessionManager),
            // Session information
            getTasksTool(sessionId),
            getEntityTool(sessionId, sessionManager),
        ],
    });
}
/**
 * Export individual tools for testing
 */
exports.researchTools = {
    fetchUrl: fetchUrlTool,
    getCachedContent: getCachedContentTool,
    saveExtraction: saveExtractionTool,
    createAssertion: createAssertionTool,
    updateTaskProgress: updateTaskProgressTool,
    completeTask: completeTaskTool,
    failTask: failTaskTool,
    getTasks: getTasksTool,
    getEntity: getEntityTool,
};
//# sourceMappingURL=research-tools.js.map