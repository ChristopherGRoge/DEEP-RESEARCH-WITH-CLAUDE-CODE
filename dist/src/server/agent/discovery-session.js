"use strict";
/**
 * DiscoverySessionManager - Topic-based research discovery
 *
 * Handles DISCOVERY workflow: cast a broad net to find entities matching
 * a research topic, then deep-dive into each discovered entity.
 *
 * Flow:
 * 1. User provides topic (e.g., "AI tools for SDLC with FedRAMP potential")
 * 2. Web search to discover entities matching criteria
 * 3. For each entity: create in database, research each category
 * 4. Report progress in real-time via WebSocket
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.discoverySessionManager = exports.DiscoverySessionManager = void 0;
const claude_agent_sdk_1 = require("@anthropic-ai/claude-agent-sdk");
const tools_1 = require("../../tools");
const discovery_tools_1 = require("./discovery-tools");
const discovery_prompts_1 = require("./discovery-prompts");
const client_1 = require("../../../generated/prisma/client");
// ============================================
// DiscoverySessionManager Class
// ============================================
class DiscoverySessionManager {
    activeSessions = new Map();
    /**
     * Create a new discovery session for a research topic
     */
    async createSession(config) {
        // Get or create project
        let projectId = config.projectId;
        if (!projectId) {
            // Create project from topic
            const projectName = config.projectName || `Discovery: ${config.topic.slice(0, 50)}`;
            // Check if project exists
            let project = await tools_1.prisma.researchProject.findFirst({
                where: { name: projectName },
            });
            if (!project) {
                project = await tools_1.prisma.researchProject.create({
                    data: {
                        name: projectName,
                        description: config.topic,
                        workflow: client_1.ResearchWorkflow.DISCOVERY,
                    },
                });
            }
            projectId = project.id;
        }
        // Generate session ID
        const sessionId = `discovery-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        // Create tasks for each category
        const tasks = config.categories.map((category, index) => ({
            taskId: `task-${index + 1}`,
            category,
            status: 'pending',
            progress: 0,
        }));
        // Create active session in memory
        const activeSession = {
            id: sessionId,
            config,
            projectId,
            status: client_1.ResearchSessionStatus.INITIALIZING,
            inputQueue: [],
            discoveredEntities: [],
            progress: {
                phase: 'initializing',
                totalTasks: tasks.length,
                completedTasks: 0,
                failedTasks: 0,
                inProgressTasks: 0,
                pendingTasks: tasks.length,
                percentComplete: 0,
                totalAssertions: 0,
                totalEvidence: 0,
                totalScreenshots: 0,
                entitiesDiscovered: 0,
                entitiesResearched: 0,
            },
        };
        this.activeSessions.set(sessionId, activeSession);
        // Log start
        await tools_1.prisma.researchLog.create({
            data: {
                action: 'discovery_session_created',
                details: {
                    sessionId,
                    topic: config.topic,
                    researcher: config.researcher,
                    categories: config.categories,
                },
                agentId: `discovery-${sessionId}`,
            },
        });
        return {
            sessionId,
            projectId,
            tasks,
        };
    }
    /**
     * Start the discovery session - launches coordinator agent
     */
    async startSession(sessionId, callbacks) {
        const session = this.activeSessions.get(sessionId);
        if (!session) {
            throw new Error(`Session ${sessionId} not found`);
        }
        // Set callbacks
        if (callbacks) {
            session.onProgress = callbacks.onProgress;
            session.onTaskUpdate = callbacks.onTaskUpdate;
            session.onMessage = callbacks.onMessage;
            session.onComplete = callbacks.onComplete;
            session.onError = callbacks.onError;
        }
        // Update status
        session.status = client_1.ResearchSessionStatus.PLANNING;
        session.startedAt = new Date();
        // Build initial prompt
        const initialPrompt = this.buildInitialPrompt(session);
        // Create MCP server with discovery tools
        const mcpServer = (0, discovery_tools_1.createDiscoveryMcpServer)(sessionId, this);
        // Create coordinator query
        try {
            const coordinatorQuery = (0, claude_agent_sdk_1.query)({
                prompt: this.createInputStream(sessionId, initialPrompt),
                options: {
                    systemPrompt: discovery_prompts_1.DISCOVERY_COORDINATOR_SYSTEM_PROMPT,
                    mcpServers: {
                        discovery: mcpServer,
                    },
                    model: 'claude-sonnet-4-20250514',
                    permissionMode: 'bypassPermissions',
                    includePartialMessages: true,
                    cwd: process.cwd(),
                },
            });
            session.coordinatorQuery = coordinatorQuery;
            // Stream responses
            await this.streamResponses(session, coordinatorQuery);
        }
        catch (error) {
            session.status = client_1.ResearchSessionStatus.FAILED;
            if (session.onError) {
                session.onError(error);
            }
            throw error;
        }
    }
    /**
     * Stream responses from coordinator agent
     */
    async streamResponses(session, coordinatorQuery) {
        try {
            for await (const event of coordinatorQuery) {
                if (session.status === client_1.ResearchSessionStatus.PAUSED) {
                    break;
                }
                if (session.status === client_1.ResearchSessionStatus.CANCELLED) {
                    break;
                }
                // Handle different event types
                if (event.type === 'assistant' && event.message) {
                    // Extract text content
                    const textContent = event.message.content
                        ?.filter((c) => c.type === 'text')
                        .map((c) => c.text)
                        .join('');
                    if (textContent && session.onMessage) {
                        session.onMessage({
                            type: 'coordinator_message',
                            content: textContent,
                        });
                    }
                }
            }
            // Session completed
            if (session.status !== client_1.ResearchSessionStatus.CANCELLED) {
                await this.completeSession(session.id);
            }
        }
        catch (error) {
            console.error('Discovery coordinator error:', error);
            session.status = client_1.ResearchSessionStatus.FAILED;
            if (session.onError) {
                session.onError(error);
            }
        }
    }
    /**
     * Create async input stream for coordinator
     */
    async *createInputStream(sessionId, initialPrompt) {
        const session = this.activeSessions.get(sessionId);
        if (!session)
            return;
        // First message
        yield {
            type: 'user',
            message: { role: 'user', content: initialPrompt },
            parent_tool_use_id: null,
            session_id: sessionId,
        };
        // Then stream from input queue
        while (session.status === client_1.ResearchSessionStatus.RESEARCHING ||
            session.status === client_1.ResearchSessionStatus.PLANNING) {
            if (session.inputQueue.length > 0) {
                yield session.inputQueue.shift();
            }
            else {
                await new Promise((resolve) => setTimeout(resolve, 100));
            }
        }
    }
    /**
     * Build initial prompt for discovery coordinator
     */
    buildInitialPrompt(session) {
        const exampleSection = session.config.exampleEntities?.length
            ? `
EXAMPLE ENTITIES (TARGET PROFILE):
${session.config.exampleEntities.join(', ')}

CRITICAL: These examples define the TARGET PROFILE for your discovery.
- Study these entities to understand what KIND of tools/products the researcher wants
- Prioritize discovering entities SIMILAR IN NATURE to these examples
- Start by researching the example entities themselves
- Then find more entities that match the same profile
`
            : '';
        return `Discovery research session started.

RESEARCH TOPIC:
${session.config.topic}
${exampleSection}
RESEARCHER: ${session.config.researcher}
PROJECT ID: ${session.projectId}
MODE: ${session.config.mode}

CATEGORIES TO RESEARCH FOR EACH ENTITY:
${session.config.categories.join(', ')}

YOUR MISSION:
1. DISCOVERY PHASE: Search the web to find entities (tools, products, services) matching the research topic
   - Look for tools/products that match the criteria in the topic${session.config.exampleEntities?.length ? '\n   - Use the example entities as your primary guide for what to discover' : ''}
   - Focus on finding at least 5-10 relevant entities
   - Prioritize vendor documentation and official sources
   - Note FedRAMP status, air-gapped capabilities, standalone deployment options

2. RESEARCH PHASE: For each discovered entity:
   - Create the entity in the database using create_entity
   - Research each category (${session.config.categories.join(', ')}) using evidence-first protocol
   - Capture screenshots before making assertions
   - Save extractions with structured data

3. COMPLETION: Generate summary of findings

${session.config.exampleEntities?.length
            ? `Start by creating and researching the example entities: ${session.config.exampleEntities.join(', ')}
Then discover more entities that match the same profile.`
            : `Start by searching for entities matching: "${session.config.topic}"`}

Use the web_search tool to begin discovery.`;
    }
    /**
     * Send a message to the coordinator
     */
    sendMessage(sessionId, content) {
        const session = this.activeSessions.get(sessionId);
        if (!session) {
            throw new Error(`Session ${sessionId} not found`);
        }
        session.inputQueue.push({
            type: 'user',
            message: { role: 'user', content },
            parent_tool_use_id: null,
            session_id: sessionId,
        });
    }
    /**
     * Update session progress
     */
    updateProgress(sessionId, progress) {
        const session = this.activeSessions.get(sessionId);
        if (!session)
            return;
        session.progress = { ...session.progress, ...progress };
        if (session.onProgress) {
            session.onProgress(session.progress);
        }
    }
    /**
     * Add a discovered entity
     */
    addDiscoveredEntity(sessionId, entity) {
        const session = this.activeSessions.get(sessionId);
        if (!session)
            return;
        session.discoveredEntities.push(entity);
        session.progress.entitiesDiscovered = session.discoveredEntities.length;
        if (session.onProgress) {
            session.onProgress(session.progress);
        }
    }
    /**
     * Notify task update
     */
    notifyTaskUpdate(sessionId, taskId, update) {
        const session = this.activeSessions.get(sessionId);
        if (!session?.onTaskUpdate)
            return;
        session.onTaskUpdate(taskId, update);
    }
    /**
     * Notify message
     */
    notifyMessage(sessionId, message) {
        const session = this.activeSessions.get(sessionId);
        if (!session?.onMessage)
            return;
        session.onMessage(message);
    }
    /**
     * Complete the session
     */
    async completeSession(sessionId) {
        const session = this.activeSessions.get(sessionId);
        if (!session)
            return;
        session.status = client_1.ResearchSessionStatus.COMPLETED;
        const completedAt = new Date();
        const durationSeconds = session.startedAt
            ? Math.round((completedAt.getTime() - session.startedAt.getTime()) / 1000)
            : 0;
        // Get entity counts from database
        const entities = await tools_1.prisma.entity.findMany({
            where: { projectId: session.projectId },
            include: {
                _count: {
                    select: { assertions: true },
                },
            },
        });
        // Calculate totals
        let totalAssertions = 0;
        let totalExtractions = 0;
        let totalScreenshots = 0;
        for (const entity of entities) {
            totalAssertions += entity._count.assertions;
        }
        const extractionCount = await tools_1.prisma.extraction.count({
            where: {
                entity: { projectId: session.projectId },
            },
        });
        totalExtractions = extractionCount;
        // Build summary
        const summary = {
            sessionId,
            projectId: session.projectId,
            topic: session.config.topic,
            entitiesDiscovered: session.discoveredEntities.length,
            entitiesResearched: entities.length,
            totalAssertions,
            totalScreenshots,
            totalExtractions,
            durationSeconds,
            entities: entities.map((e) => ({
                id: e.id,
                name: e.name,
                assertionCount: e._count.assertions,
            })),
        };
        // Log completion
        await tools_1.prisma.researchLog.create({
            data: {
                action: 'discovery_session_completed',
                details: summary,
                agentId: `discovery-${sessionId}`,
            },
        });
        // Notify completion
        if (session.onComplete) {
            session.onComplete(summary);
        }
        // Clean up
        this.activeSessions.delete(sessionId);
    }
    /**
     * Pause the session
     */
    async pauseSession(sessionId) {
        const session = this.activeSessions.get(sessionId);
        if (!session)
            return;
        session.status = client_1.ResearchSessionStatus.PAUSED;
        session.pausedAt = new Date();
        if (session.coordinatorQuery) {
            await session.coordinatorQuery.interrupt();
        }
    }
    /**
     * Resume a paused session
     */
    async resumeSession(sessionId) {
        const session = this.activeSessions.get(sessionId);
        if (!session || session.status !== client_1.ResearchSessionStatus.PAUSED)
            return;
        session.status = client_1.ResearchSessionStatus.RESEARCHING;
        this.sendMessage(sessionId, '[RESUME] Continue discovery research from where we paused.');
    }
    /**
     * Cancel the session
     */
    async cancelSession(sessionId) {
        const session = this.activeSessions.get(sessionId);
        if (!session)
            return;
        session.status = client_1.ResearchSessionStatus.CANCELLED;
        if (session.coordinatorQuery) {
            await session.coordinatorQuery.interrupt();
        }
        // Log cancellation
        await tools_1.prisma.researchLog.create({
            data: {
                action: 'discovery_session_cancelled',
                details: {
                    sessionId,
                    entitiesDiscovered: session.discoveredEntities.length,
                },
                agentId: `discovery-${sessionId}`,
            },
        });
        // Clean up
        this.activeSessions.delete(sessionId);
    }
    /**
     * Get session by ID
     */
    getSession(sessionId) {
        return this.activeSessions.get(sessionId);
    }
    /**
     * Get session status
     */
    async getSessionStatus(sessionId) {
        const session = this.activeSessions.get(sessionId);
        if (!session)
            return null;
        return {
            id: session.id,
            status: session.status,
            progress: session.progress,
            discoveredEntities: session.discoveredEntities,
            projectId: session.projectId,
        };
    }
}
exports.DiscoverySessionManager = DiscoverySessionManager;
// Export singleton instance
exports.discoverySessionManager = new DiscoverySessionManager();
//# sourceMappingURL=discovery-session.js.map