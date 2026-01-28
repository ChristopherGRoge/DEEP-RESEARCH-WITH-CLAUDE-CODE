"use strict";
/**
 * ResearchSessionManager - Manages browser-based deep research sessions
 *
 * Coordinates multi-agent research workflows using Claude Agent SDK.
 * Supports:
 * - Session lifecycle (create, start, pause, resume, cancel)
 * - Multi-agent coordination (coordinator + category specialists)
 * - Real-time progress tracking
 * - Evidence-first research protocol
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.researchSessionManager = exports.ResearchSessionManager = void 0;
const claude_agent_sdk_1 = require("@anthropic-ai/claude-agent-sdk");
const tools_1 = require("../../tools");
const research_tools_1 = require("./research-tools");
const research_prompts_1 = require("./research-prompts");
const client_1 = require("../../../generated/prisma/client");
// ============================================
// ResearchSessionManager Class
// ============================================
class ResearchSessionManager {
    activeSessions = new Map();
    sessionCounter = 0;
    /**
     * Create a new research session for an entity
     */
    async createSession(config) {
        // Validate entity exists
        const entity = await tools_1.prisma.entity.findUnique({
            where: { id: config.entityId },
            include: { project: true },
        });
        if (!entity) {
            throw new Error(`Entity ${config.entityId} not found`);
        }
        // Determine categories to research
        const categories = config.categories || [
            'pricing',
            'features',
            'company',
            'compliance',
            'integrations',
        ];
        // Create session in database
        const dbSession = await tools_1.prisma.researchSession.create({
            data: {
                entityId: config.entityId,
                projectId: config.projectId,
                researcherName: config.researcherName,
                status: client_1.ResearchSessionStatus.INITIALIZING,
                categories,
                mode: config.mode || 'sequential',
                config: config,
                totalTasks: categories.length,
            },
        });
        // Create tasks for each category
        const tasks = await Promise.all(categories.map((category) => tools_1.prisma.researchTask.create({
            data: {
                sessionId: dbSession.id,
                category,
                status: client_1.ResearchTaskStatus.PENDING,
                progress: {
                    stage: 'initializing',
                    stageDescription: 'Task queued',
                    percentComplete: 0,
                    urlsFetched: 0,
                    screenshotsCaptured: 0,
                    assertionsCreated: 0,
                    evidenceCollected: 0,
                },
            },
        })));
        // Create active session in memory
        const activeSession = {
            id: dbSession.id,
            entityId: config.entityId,
            entityName: config.entityName,
            projectId: config.projectId,
            researcherName: config.researcherName,
            config,
            status: client_1.ResearchSessionStatus.INITIALIZING,
            childQueries: new Map(),
            inputQueue: [],
            overallProgress: {
                totalTasks: categories.length,
                completedTasks: 0,
                failedTasks: 0,
                inProgressTasks: 0,
                pendingTasks: categories.length,
                percentComplete: 0,
                totalAssertions: 0,
                totalEvidence: 0,
                totalScreenshots: 0,
            },
        };
        this.activeSessions.set(dbSession.id, activeSession);
        return {
            sessionId: dbSession.id,
            tasks: tasks.map((t) => ({
                id: t.id,
                category: t.category,
                status: t.status,
            })),
        };
    }
    /**
     * Start the research session - launches coordinator agent
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
        await tools_1.prisma.researchSession.update({
            where: { id: sessionId },
            data: {
                status: client_1.ResearchSessionStatus.PLANNING,
                startedAt: session.startedAt,
            },
        });
        // Build initial prompt for coordinator
        const initialPrompt = this.buildCoordinatorInitialPrompt(session);
        // Create MCP server with research tools
        const mcpServer = (0, research_tools_1.createResearchMcpServer)(sessionId, this);
        // Create coordinator query
        try {
            const coordinatorQuery = (0, claude_agent_sdk_1.query)({
                prompt: this.createInputStream(sessionId, initialPrompt),
                options: {
                    systemPrompt: research_prompts_1.RESEARCH_COORDINATOR_SYSTEM_PROMPT,
                    mcpServers: {
                        research: mcpServer,
                    },
                    model: session.config.model || 'claude-sonnet-4-20250514',
                    permissionMode: 'acceptEdits',
                    includePartialMessages: true,
                    cwd: process.cwd(),
                },
            });
            session.coordinatorQuery = coordinatorQuery;
            // Stream responses
            await this.streamCoordinatorResponses(session, coordinatorQuery);
        }
        catch (error) {
            session.status = client_1.ResearchSessionStatus.FAILED;
            await tools_1.prisma.researchSession.update({
                where: { id: sessionId },
                data: { status: client_1.ResearchSessionStatus.FAILED },
            });
            if (session.onError) {
                session.onError(error);
            }
            throw error;
        }
    }
    /**
     * Stream responses from coordinator agent
     */
    async streamCoordinatorResponses(session, coordinatorQuery) {
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
                // Note: Tool use events are handled internally by the SDK
                // Results come back via the research MCP tools
            }
            // Session completed
            if (session.status !== client_1.ResearchSessionStatus.CANCELLED) {
                await this.completeSession(session.id);
            }
        }
        catch (error) {
            console.error('Coordinator streaming error:', error);
            session.status = client_1.ResearchSessionStatus.FAILED;
            await tools_1.prisma.researchSession.update({
                where: { id: session.id },
                data: { status: client_1.ResearchSessionStatus.FAILED },
            });
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
        while (session.status === client_1.ResearchSessionStatus.RESEARCHING) {
            if (session.inputQueue.length > 0) {
                yield session.inputQueue.shift();
            }
            else {
                await new Promise((resolve) => setTimeout(resolve, 100));
            }
        }
    }
    /**
     * Build initial prompt for coordinator agent
     */
    buildCoordinatorInitialPrompt(session) {
        const categories = session.config.categories || [
            'pricing',
            'features',
            'company',
            'compliance',
            'integrations',
        ];
        return `Research session started for entity: ${session.entityName}
Entity URL: ${session.config.entityUrl}
Entity ID: ${session.entityId}
Researcher: ${session.researcherName}

Your role is to coordinate research across these categories: ${categories.join(', ')}
Mode: ${session.config.mode || 'sequential'}

CRITICAL: Follow the Evidence-First Research Protocol
1. For each category, use the research tools to fetch pages and capture screenshots
2. Analyze screenshots visually to extract data
3. Create assertions with evidenceDescription referencing specific screenshot content
4. Save structured extractions for each category

Available research tools:
- fetch_url: Fetch a URL and capture screenshot
- save_extraction: Save structured data extracted from a page
- create_assertion: Create an assertion with evidence
- update_task_progress: Report progress on a task
- complete_task: Mark a task as completed with results
- fail_task: Mark a task as failed with error

Start by planning your research approach, then work through each category systematically.
Report progress frequently so the UI can update in real-time.`;
    }
    /**
     * Send a message to the coordinator agent
     */
    sendMessage(sessionId, content) {
        const session = this.activeSessions.get(sessionId);
        if (!session || session.status !== client_1.ResearchSessionStatus.RESEARCHING) {
            throw new Error(`Session ${sessionId} not active`);
        }
        session.inputQueue.push({
            type: 'user',
            message: { role: 'user', content },
            parent_tool_use_id: null,
            session_id: sessionId,
        });
    }
    /**
     * Update task progress (called by MCP tools)
     */
    async updateTaskProgress(sessionId, taskId, progress) {
        const session = this.activeSessions.get(sessionId);
        if (!session)
            return;
        // Update in database
        const task = await tools_1.prisma.researchTask.update({
            where: { id: taskId },
            data: {
                status: client_1.ResearchTaskStatus.IN_PROGRESS,
                startedAt: new Date(),
                progress: progress,
            },
        });
        // Notify via callback
        if (session.onTaskUpdate) {
            session.onTaskUpdate(taskId, {
                type: 'task_progress',
                taskId,
                category: task.category,
                progress,
            });
        }
        // Recalculate overall progress
        await this.recalculateProgress(session);
    }
    /**
     * Complete a task with results (called by MCP tools)
     */
    async completeTask(sessionId, taskId, results) {
        const session = this.activeSessions.get(sessionId);
        if (!session)
            return;
        // Update in database
        const task = await tools_1.prisma.researchTask.update({
            where: { id: taskId },
            data: {
                status: client_1.ResearchTaskStatus.COMPLETED,
                completedAt: new Date(),
                results: results,
                progress: {
                    stage: 'finalizing',
                    stageDescription: 'Task completed',
                    percentComplete: 100,
                    urlsFetched: 1,
                    screenshotsCaptured: results.screenshotPaths.length,
                    assertionsCreated: results.assertionIds.length,
                    evidenceCollected: results.sourcesFound,
                },
            },
        });
        // Update session metrics
        await tools_1.prisma.researchSession.update({
            where: { id: sessionId },
            data: {
                completedTasks: { increment: 1 },
                totalAssertions: { increment: results.assertionIds.length },
                totalScreenshots: { increment: results.screenshotPaths.length },
                totalExtractions: results.extractionId ? { increment: 1 } : undefined,
            },
        });
        // Notify via callback
        if (session.onTaskUpdate) {
            session.onTaskUpdate(taskId, {
                type: 'task_completed',
                taskId,
                category: task.category,
                results,
            });
        }
        // Recalculate progress
        await this.recalculateProgress(session);
    }
    /**
     * Fail a task with error (called by MCP tools)
     */
    async failTask(sessionId, taskId, error) {
        const session = this.activeSessions.get(sessionId);
        if (!session)
            return;
        // Update in database
        const task = await tools_1.prisma.researchTask.update({
            where: { id: taskId },
            data: {
                status: client_1.ResearchTaskStatus.FAILED,
                completedAt: new Date(),
                error,
            },
        });
        // Update session metrics
        await tools_1.prisma.researchSession.update({
            where: { id: sessionId },
            data: {
                failedTasks: { increment: 1 },
            },
        });
        // Notify via callback
        if (session.onTaskUpdate) {
            session.onTaskUpdate(taskId, {
                type: 'task_failed',
                taskId,
                category: task.category,
                error,
            });
        }
        // Recalculate progress
        await this.recalculateProgress(session);
    }
    /**
     * Recalculate overall session progress
     */
    async recalculateProgress(session) {
        const tasks = await tools_1.prisma.researchTask.findMany({
            where: { sessionId: session.id },
        });
        const completed = tasks.filter((t) => t.status === client_1.ResearchTaskStatus.COMPLETED).length;
        const failed = tasks.filter((t) => t.status === client_1.ResearchTaskStatus.FAILED).length;
        const inProgress = tasks.filter((t) => t.status === client_1.ResearchTaskStatus.IN_PROGRESS).length;
        const pending = tasks.filter((t) => t.status === client_1.ResearchTaskStatus.PENDING).length;
        // Calculate aggregate metrics
        let totalAssertions = 0;
        let totalScreenshots = 0;
        for (const task of tasks) {
            if (task.results) {
                const results = task.results;
                totalAssertions += results.assertionIds?.length || 0;
                totalScreenshots += results.screenshotPaths?.length || 0;
            }
        }
        // Calculate percent complete
        const percentComplete = tasks.length > 0
            ? Math.round(((completed + failed) / tasks.length) * 100)
            : 0;
        session.overallProgress = {
            totalTasks: tasks.length,
            completedTasks: completed,
            failedTasks: failed,
            inProgressTasks: inProgress,
            pendingTasks: pending,
            percentComplete,
            totalAssertions,
            totalEvidence: totalAssertions, // Each assertion has evidence
            totalScreenshots,
            estimatedMinutesRemaining: (pending + inProgress) * 2, // ~2 min per task
        };
        // Update in database
        await tools_1.prisma.researchSession.update({
            where: { id: session.id },
            data: {
                overallProgress: session.overallProgress,
            },
        });
        // Notify via callback
        if (session.onProgress) {
            session.onProgress(session.overallProgress);
        }
    }
    /**
     * Complete the research session
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
        // Get final task data
        const tasks = await tools_1.prisma.researchTask.findMany({
            where: { sessionId },
        });
        const completedCategories = tasks
            .filter((t) => t.status === client_1.ResearchTaskStatus.COMPLETED)
            .map((t) => t.category);
        // Update database
        const dbSession = await tools_1.prisma.researchSession.update({
            where: { id: sessionId },
            data: {
                status: client_1.ResearchSessionStatus.COMPLETED,
                completedAt,
            },
        });
        // Build summary
        const summary = {
            sessionId,
            entityId: session.entityId,
            entityName: session.entityName,
            totalTasks: tasks.length,
            completedTasks: session.overallProgress.completedTasks,
            failedTasks: session.overallProgress.failedTasks,
            totalAssertions: dbSession.totalAssertions,
            totalScreenshots: dbSession.totalScreenshots,
            totalExtractions: dbSession.totalExtractions,
            durationSeconds,
            categoriesResearched: completedCategories,
        };
        // Notify via callback
        if (session.onComplete) {
            session.onComplete(summary);
        }
        // Clean up active session
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
        // Interrupt coordinator if running
        if (session.coordinatorQuery) {
            await session.coordinatorQuery.interrupt();
        }
        // Interrupt all child queries
        for (const [taskId, childQuery] of session.childQueries) {
            await childQuery.interrupt();
        }
        await tools_1.prisma.researchSession.update({
            where: { id: sessionId },
            data: {
                status: client_1.ResearchSessionStatus.PAUSED,
                pausedAt: session.pausedAt,
            },
        });
    }
    /**
     * Resume a paused session
     */
    async resumeSession(sessionId) {
        const session = this.activeSessions.get(sessionId);
        if (!session || session.status !== client_1.ResearchSessionStatus.PAUSED)
            return;
        session.status = client_1.ResearchSessionStatus.RESEARCHING;
        await tools_1.prisma.researchSession.update({
            where: { id: sessionId },
            data: {
                status: client_1.ResearchSessionStatus.RESEARCHING,
            },
        });
        // Send resume message to coordinator
        this.sendMessage(sessionId, '[RESUME] Continue research from where we paused.');
    }
    /**
     * Cancel the session
     */
    async cancelSession(sessionId) {
        const session = this.activeSessions.get(sessionId);
        if (!session)
            return;
        session.status = client_1.ResearchSessionStatus.CANCELLED;
        // Interrupt all queries
        if (session.coordinatorQuery) {
            await session.coordinatorQuery.interrupt();
        }
        for (const childQuery of session.childQueries.values()) {
            await childQuery.interrupt();
        }
        // Update tasks
        await tools_1.prisma.researchTask.updateMany({
            where: {
                sessionId,
                status: { in: [client_1.ResearchTaskStatus.PENDING, client_1.ResearchTaskStatus.IN_PROGRESS] },
            },
            data: {
                status: client_1.ResearchTaskStatus.CANCELLED,
            },
        });
        await tools_1.prisma.researchSession.update({
            where: { id: sessionId },
            data: {
                status: client_1.ResearchSessionStatus.CANCELLED,
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
     * Get session status from database
     */
    async getSessionStatus(sessionId) {
        const session = await tools_1.prisma.researchSession.findUnique({
            where: { id: sessionId },
            include: {
                tasks: true,
                entity: {
                    select: { id: true, name: true, url: true },
                },
            },
        });
        return session;
    }
    /**
     * Get all active sessions
     */
    getActiveSessions() {
        return Array.from(this.activeSessions.values());
    }
    /**
     * Get category prompt for a specific research category
     */
    getCategoryPrompt(category) {
        const prompts = {
            pricing: research_prompts_1.PRICING_RESEARCH_PROMPT,
            features: research_prompts_1.FEATURES_RESEARCH_PROMPT,
            company: research_prompts_1.COMPANY_RESEARCH_PROMPT,
            compliance: research_prompts_1.COMPLIANCE_RESEARCH_PROMPT,
            integrations: research_prompts_1.INTEGRATIONS_RESEARCH_PROMPT,
        };
        return prompts[category];
    }
}
exports.ResearchSessionManager = ResearchSessionManager;
// Export singleton instance
exports.researchSessionManager = new ResearchSessionManager();
//# sourceMappingURL=research-session.js.map