"use strict";
/**
 * MCP tools for discovery workflow
 *
 * These tools enable AI agents to discover entities matching research criteria
 * and persist them to the database for deep research.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDiscoveryMcpServer = createDiscoveryMcpServer;
const zod_1 = require("zod");
const claude_agent_sdk_1 = require("@anthropic-ai/claude-agent-sdk");
const tools_1 = require("../../tools");
const extractor_1 = require("../../tools/extractor");
const orchestrator_1 = require("../../tools/orchestrator");
const client_1 = require("../../../generated/prisma/client");
// ============================================
// Web Search Tool
// ============================================
const webSearchTool = (sessionId, sessionManager) => (0, claude_agent_sdk_1.tool)('web_search', 'Search the web to discover entities matching research criteria. Returns URLs and snippets to investigate.', {
    query: zod_1.z.string().describe('Search query to find relevant entities'),
    focusArea: zod_1.z
        .enum(['tools', 'companies', 'products', 'services', 'all'])
        .optional()
        .default('tools')
        .describe('Type of entities to focus on'),
}, async (args) => {
    try {
        // Note: In production, this would call an actual web search API
        // For now, we'll indicate that the agent should use its built-in web search
        // or provide guidance on how to search
        return {
            content: [
                {
                    type: 'text',
                    text: JSON.stringify({
                        success: true,
                        message: `Search query prepared: "${args.query}" (focus: ${args.focusArea})`,
                        guidance: `To discover entities, you should:
1. Think about what tools/products match the criteria: "${args.query}"
2. Consider well-known tools in this space
3. For each discovered entity, use create_entity to add it to the database
4. Then use fetch_url to research each entity's website

Note: Use your knowledge to identify relevant entities. Prioritize:
- Tools with vendor websites you can verify
- Products mentioned in official documentation
- Services with clear URLs to research`,
                        suggestedEntities: [
                            // The agent will fill in actual entities based on its knowledge
                            'Consider tools like: Cursor, GitHub Copilot, Tabnine, Codeium, etc.',
                            'Look for FedRAMP-listed tools in the category',
                            'Search for "air-gapped" or "self-hosted" options',
                        ],
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
// Entity Management Tools
// ============================================
const createEntityTool = (sessionId, sessionManager) => (0, claude_agent_sdk_1.tool)('create_entity', 'Create a new entity in the database for research. Returns entity ID for further research.', {
    name: zod_1.z.string().describe('Name of the entity (tool, product, company)'),
    url: zod_1.z.string().describe('Primary URL for the entity'),
    description: zod_1.z.string().describe('Brief description of what this entity is/does'),
    entityType: zod_1.z
        .enum(['tool', 'product', 'service', 'framework', 'library', 'company'])
        .default('tool')
        .describe('Type of entity'),
    relevanceScore: zod_1.z
        .number()
        .min(0)
        .max(100)
        .optional()
        .describe('How relevant is this entity to the research topic (0-100)'),
    matchedCriteria: zod_1.z
        .array(zod_1.z.string())
        .optional()
        .describe('Which research criteria does this entity match'),
}, async (args) => {
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
        // Check if entity already exists in project
        let entity = await tools_1.prisma.entity.findFirst({
            where: {
                projectId: session.projectId,
                name: { equals: args.name },
            },
        });
        if (entity) {
            return {
                content: [
                    {
                        type: 'text',
                        text: JSON.stringify({
                            success: true,
                            entityId: entity.id,
                            existed: true,
                            message: `Entity "${args.name}" already exists. Use this ID for research.`,
                        }),
                    },
                ],
            };
        }
        // Create new entity
        entity = await tools_1.prisma.entity.create({
            data: {
                projectId: session.projectId,
                name: args.name,
                url: args.url,
                description: args.description,
                entityType: args.entityType,
            },
        });
        // Track discovered entity
        const discoveredEntity = {
            name: args.name,
            url: args.url,
            description: args.description,
            entityType: args.entityType,
            relevanceScore: args.relevanceScore || 50,
            matchedCriteria: args.matchedCriteria || [],
        };
        sessionManager.addDiscoveredEntity(sessionId, discoveredEntity);
        // Notify UI
        sessionManager.notifyMessage(sessionId, {
            type: 'entity_discovered',
            entityId: entity.id,
            entityName: args.name,
            entityUrl: args.url,
        });
        // Log discovery
        await tools_1.prisma.researchLog.create({
            data: {
                action: 'entity_discovered',
                details: {
                    entityId: entity.id,
                    name: args.name,
                    url: args.url,
                    sessionId,
                },
                agentId: `discovery-${sessionId}`,
            },
        });
        return {
            content: [
                {
                    type: 'text',
                    text: JSON.stringify({
                        success: true,
                        entityId: entity.id,
                        existed: false,
                        message: `Entity "${args.name}" created. Now research it using fetch_url and save_extraction.`,
                        nextSteps: [
                            `1. fetch_url with entityId="${entity.id}" and url="${args.url}"`,
                            '2. Analyze the screenshot to extract data',
                            '3. save_extraction with the structured data',
                            '4. create_assertion for key findings',
                        ],
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
const listEntitiesTool = (sessionId, sessionManager) => (0, claude_agent_sdk_1.tool)('list_entities', 'List all entities discovered in this research session', {}, async () => {
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
        const entities = await tools_1.prisma.entity.findMany({
            where: { projectId: session.projectId },
            include: {
                _count: {
                    select: { assertions: true, extractions: true },
                },
            },
            orderBy: { createdAt: 'desc' },
        });
        return {
            content: [
                {
                    type: 'text',
                    text: JSON.stringify({
                        success: true,
                        count: entities.length,
                        entities: entities.map((e) => ({
                            id: e.id,
                            name: e.name,
                            url: e.url,
                            type: e.entityType,
                            assertionCount: e._count.assertions,
                            extractionCount: e._count.extractions,
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
// ============================================
// URL Fetching and Evidence Capture
// ============================================
const fetchUrlTool = (sessionId, sessionManager) => (0, claude_agent_sdk_1.tool)('fetch_url', 'Fetch a URL and capture screenshot as evidence. ALWAYS use this before creating assertions.', {
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
        // Notify session
        sessionManager.notifyMessage(sessionId, {
            type: 'screenshot_captured',
            url: args.url,
            screenshotPath: result.screenshotPath,
            entityName: result.entityName,
        });
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
        // Notify session
        sessionManager.notifyMessage(sessionId, {
            type: 'extraction_complete',
            schemaType: args.schemaType,
            extractionId: result.extractionId,
            assertionCount: result.assertionsCreated?.length || 0,
        });
        // Update progress
        const session = sessionManager.getSession(sessionId);
        if (session) {
            session.progress.totalAssertions += result.assertionsCreated?.length || 0;
            session.progress.totalEvidence += 1;
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
        // Log and notify
        await tools_1.prisma.researchLog.create({
            data: {
                action: 'assertion_created',
                details: {
                    assertionId: assertion.id,
                    entityId: args.entityId,
                    claim: args.claim,
                    sessionId,
                },
                agentId: `discovery-${sessionId}`,
            },
        });
        sessionManager.notifyMessage(sessionId, {
            type: 'assertion_created',
            assertionId: assertion.id,
            claim: args.claim,
            category: args.category,
        });
        // Update progress
        const session = sessionManager.getSession(sessionId);
        if (session) {
            session.progress.totalAssertions += 1;
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
// Progress Reporting
// ============================================
const reportProgressTool = (sessionId, sessionManager) => (0, claude_agent_sdk_1.tool)('report_progress', 'Report progress on the discovery research session', {
    phase: zod_1.z
        .enum(['initializing', 'discovering', 'researching', 'completing'])
        .describe('Current phase of discovery'),
    entitiesDiscovered: zod_1.z.number().optional().describe('Number of entities discovered'),
    entitiesResearched: zod_1.z.number().optional().describe('Number of entities researched'),
    currentEntity: zod_1.z.string().optional().describe('Name of entity currently being researched'),
    percentComplete: zod_1.z.number().min(0).max(100).describe('Overall percent complete'),
    message: zod_1.z.string().optional().describe('Status message to display'),
}, async (args) => {
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
        // Update progress
        sessionManager.updateProgress(sessionId, {
            phase: args.phase,
            entitiesDiscovered: args.entitiesDiscovered ?? session.progress.entitiesDiscovered,
            entitiesResearched: args.entitiesResearched ?? session.progress.entitiesResearched,
            currentEntity: args.currentEntity,
            percentComplete: args.percentComplete,
        });
        // Send status message if provided
        if (args.message && session.onMessage) {
            session.onMessage({
                type: 'coordinator_message',
                content: args.message,
            });
        }
        return {
            content: [
                {
                    type: 'text',
                    text: JSON.stringify({
                        success: true,
                        message: `Progress updated: ${args.phase} - ${args.percentComplete}%`,
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
const completeDiscoveryTool = (sessionId, sessionManager) => (0, claude_agent_sdk_1.tool)('complete_discovery', 'Mark the discovery session as complete with a summary', {
    summary: zod_1.z.string().describe('Summary of discovery findings'),
    recommendations: zod_1.z
        .array(zod_1.z.string())
        .optional()
        .describe('Recommendations for further research'),
}, async (args) => {
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
        // Send completion message
        sessionManager.notifyMessage(sessionId, {
            type: 'coordinator_message',
            content: `## Discovery Complete\n\n${args.summary}\n\n${args.recommendations?.length
                ? `### Recommendations\n${args.recommendations.map((r) => `- ${r}`).join('\n')}`
                : ''}`,
        });
        // Update progress to 100%
        sessionManager.updateProgress(sessionId, {
            phase: 'completing',
            percentComplete: 100,
        });
        return {
            content: [
                {
                    type: 'text',
                    text: JSON.stringify({
                        success: true,
                        message: 'Discovery session marked complete',
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
// Subagent Orchestration Tools
// ============================================
const spawnSubagentTool = (sessionId, sessionManager) => (0, claude_agent_sdk_1.tool)('spawn_subagent', 'Spawn a subagent to perform a specific research task. Use this to delegate work to faster/cheaper models. The subagent runs synchronously and returns results when complete.', {
    model: zod_1.z
        .enum(['haiku', 'sonnet'])
        .default('haiku')
        .describe('Model to use: haiku for simple tasks (fast, cheap), sonnet for complex reasoning'),
    taskType: zod_1.z
        .enum(['entity_research', 'evidence_collection', 'claim_validation', 'logo_fetch', 'url_validation', 'custom'])
        .default('custom')
        .describe('Type of task for the subagent'),
    prompt: zod_1.z.string().describe('Detailed instructions for the subagent. Be specific about what to research and how to report results.'),
    entityId: zod_1.z.string().optional().describe('Entity ID if researching a specific entity'),
    timeout: zod_1.z.number().optional().default(60000).describe('Timeout in milliseconds (default 60s)'),
}, async (args) => {
    try {
        // Notify session of subagent spawn
        sessionManager.notifyMessage(sessionId, {
            type: 'subagent_spawned',
            message: `Spawning ${args.model} subagent for: ${args.taskType}`,
            model: args.model,
            taskType: args.taskType,
        });
        // Spawn and wait for completion
        const result = await (0, orchestrator_1.spawnSubagentSync)({
            model: args.model,
            taskType: args.taskType,
            prompt: args.prompt,
            entityId: args.entityId,
            timeout: args.timeout,
        });
        // Notify session of completion
        sessionManager.notifyMessage(sessionId, {
            type: 'subagent_completed',
            message: `Subagent (${args.model}) completed: ${result.status}`,
            taskId: result.taskId,
            status: result.status,
            durationMs: result.durationMs,
        });
        // Extract text results
        const textResults = Array.isArray(result.result)
            ? result.result
                .filter((r) => r.type === 'assistant' && r.text)
                .map((r) => r.text)
                .join('\n\n')
            : '';
        return {
            content: [
                {
                    type: 'text',
                    text: JSON.stringify({
                        success: result.status === 'completed',
                        taskId: result.taskId,
                        model: result.model,
                        status: result.status,
                        durationMs: result.durationMs,
                        response: textResults,
                        error: result.error,
                    }),
                },
            ],
        };
    }
    catch (error) {
        sessionManager.notifyMessage(sessionId, {
            type: 'subagent_error',
            message: `Subagent failed: ${error instanceof Error ? error.message : String(error)}`,
        });
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
 * Create an MCP server with all discovery tools
 */
function createDiscoveryMcpServer(sessionId, sessionManager) {
    return (0, claude_agent_sdk_1.createSdkMcpServer)({
        name: 'discovery',
        version: '1.0.0',
        tools: [
            // Discovery
            webSearchTool(sessionId, sessionManager),
            createEntityTool(sessionId, sessionManager),
            listEntitiesTool(sessionId, sessionManager),
            // Research
            fetchUrlTool(sessionId, sessionManager),
            saveExtractionTool(sessionId, sessionManager),
            createAssertionTool(sessionId, sessionManager),
            // Orchestration - delegate to subagents
            spawnSubagentTool(sessionId, sessionManager),
            // Progress
            reportProgressTool(sessionId, sessionManager),
            completeDiscoveryTool(sessionId, sessionManager),
        ],
    });
}
//# sourceMappingURL=discovery-tools.js.map