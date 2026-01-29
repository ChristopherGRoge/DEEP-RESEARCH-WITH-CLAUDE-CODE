"use strict";
/**
 * REST API routes for research session management
 *
 * These routes provide programmatic access to research sessions,
 * complementing the WebSocket interface for real-time updates.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const hono_1 = require("hono");
const tools_1 = require("../../tools");
const research_session_1 = require("../agent/research-session");
const client_1 = require("../../../generated/prisma/client");
const feedback_types_1 = require("../agent/feedback-types");
const assertions_1 = require("../../tools/assertions");
const researchApi = new hono_1.Hono();
// ============================================
// Session Management
// ============================================
/**
 * Create a new research session
 * POST /api/research/sessions
 */
researchApi.post('/sessions', async (c) => {
    try {
        const body = await c.req.json();
        const { entityId, entityName, entityUrl, projectId, researcherName, categories, mode, } = body;
        // Validate required fields
        if (!entityId || !entityName || !entityUrl || !projectId || !researcherName) {
            return c.json({
                success: false,
                error: 'Missing required fields: entityId, entityName, entityUrl, projectId, researcherName',
            }, 400);
        }
        const result = await research_session_1.researchSessionManager.createSession({
            entityId,
            entityName,
            entityUrl,
            projectId,
            researcherName,
            categories: categories,
            mode,
        });
        return c.json({
            success: true,
            data: result,
        });
    }
    catch (error) {
        return c.json({
            success: false,
            error: error instanceof Error ? error.message : 'Failed to create session',
        }, 500);
    }
});
/**
 * Get session status
 * GET /api/research/sessions/:sessionId
 */
researchApi.get('/sessions/:sessionId', async (c) => {
    try {
        const sessionId = c.req.param('sessionId');
        const session = await tools_1.prisma.researchSession.findUnique({
            where: { id: sessionId },
            include: {
                tasks: {
                    orderBy: { category: 'asc' },
                },
                entity: {
                    select: {
                        id: true,
                        name: true,
                        url: true,
                        entityType: true,
                    },
                },
            },
        });
        if (!session) {
            return c.json({
                success: false,
                error: 'Session not found',
            }, 404);
        }
        return c.json({
            success: true,
            data: session,
        });
    }
    catch (error) {
        return c.json({
            success: false,
            error: error instanceof Error ? error.message : 'Failed to get session',
        }, 500);
    }
});
/**
 * Get session progress
 * GET /api/research/sessions/:sessionId/progress
 */
researchApi.get('/sessions/:sessionId/progress', async (c) => {
    try {
        const sessionId = c.req.param('sessionId');
        const session = await tools_1.prisma.researchSession.findUnique({
            where: { id: sessionId },
            select: {
                id: true,
                status: true,
                overallProgress: true,
                totalTasks: true,
                completedTasks: true,
                failedTasks: true,
                totalAssertions: true,
                totalScreenshots: true,
                totalExtractions: true,
            },
        });
        if (!session) {
            return c.json({
                success: false,
                error: 'Session not found',
            }, 404);
        }
        return c.json({
            success: true,
            data: session,
        });
    }
    catch (error) {
        return c.json({
            success: false,
            error: error instanceof Error ? error.message : 'Failed to get progress',
        }, 500);
    }
});
/**
 * Pause session
 * POST /api/research/sessions/:sessionId/pause
 */
researchApi.post('/sessions/:sessionId/pause', async (c) => {
    try {
        const sessionId = c.req.param('sessionId');
        await research_session_1.researchSessionManager.pauseSession(sessionId);
        return c.json({
            success: true,
            data: { status: 'paused' },
        });
    }
    catch (error) {
        return c.json({
            success: false,
            error: error instanceof Error ? error.message : 'Failed to pause session',
        }, 500);
    }
});
/**
 * Resume session
 * POST /api/research/sessions/:sessionId/resume
 */
researchApi.post('/sessions/:sessionId/resume', async (c) => {
    try {
        const sessionId = c.req.param('sessionId');
        await research_session_1.researchSessionManager.resumeSession(sessionId);
        return c.json({
            success: true,
            data: { status: 'resumed' },
        });
    }
    catch (error) {
        return c.json({
            success: false,
            error: error instanceof Error ? error.message : 'Failed to resume session',
        }, 500);
    }
});
/**
 * Cancel session
 * POST /api/research/sessions/:sessionId/cancel
 */
researchApi.post('/sessions/:sessionId/cancel', async (c) => {
    try {
        const sessionId = c.req.param('sessionId');
        await research_session_1.researchSessionManager.cancelSession(sessionId);
        return c.json({
            success: true,
            data: { status: 'cancelled' },
        });
    }
    catch (error) {
        return c.json({
            success: false,
            error: error instanceof Error ? error.message : 'Failed to cancel session',
        }, 500);
    }
});
// ============================================
// Task Management
// ============================================
/**
 * Get task details
 * GET /api/research/sessions/:sessionId/tasks/:taskId
 */
researchApi.get('/sessions/:sessionId/tasks/:taskId', async (c) => {
    try {
        const taskId = c.req.param('taskId');
        const task = await tools_1.prisma.researchTask.findUnique({
            where: { id: taskId },
        });
        if (!task) {
            return c.json({
                success: false,
                error: 'Task not found',
            }, 404);
        }
        return c.json({
            success: true,
            data: task,
        });
    }
    catch (error) {
        return c.json({
            success: false,
            error: error instanceof Error ? error.message : 'Failed to get task',
        }, 500);
    }
});
/**
 * Retry failed task
 * POST /api/research/sessions/:sessionId/tasks/:taskId/retry
 */
researchApi.post('/sessions/:sessionId/tasks/:taskId/retry', async (c) => {
    try {
        const sessionId = c.req.param('sessionId');
        const taskId = c.req.param('taskId');
        // Reset task status
        const task = await tools_1.prisma.researchTask.update({
            where: { id: taskId },
            data: {
                status: client_1.ResearchTaskStatus.PENDING,
                error: null,
                startedAt: null,
                completedAt: null,
                progress: {
                    stage: 'initializing',
                    stageDescription: 'Task retrying',
                    percentComplete: 0,
                    urlsFetched: 0,
                    screenshotsCaptured: 0,
                    assertionsCreated: 0,
                    evidenceCollected: 0,
                },
            },
        });
        // Update session counts
        await tools_1.prisma.researchSession.update({
            where: { id: sessionId },
            data: {
                failedTasks: { decrement: 1 },
            },
        });
        // Send message to coordinator to retry
        const session = research_session_1.researchSessionManager.getSession(sessionId);
        if (session) {
            research_session_1.researchSessionManager.sendMessage(sessionId, `[RETRY] Please retry the ${task.category} research task (task ID: ${taskId})`);
        }
        return c.json({
            success: true,
            data: task,
        });
    }
    catch (error) {
        return c.json({
            success: false,
            error: error instanceof Error ? error.message : 'Failed to retry task',
        }, 500);
    }
});
// ============================================
// Session Summary
// ============================================
/**
 * Get session summary
 * GET /api/research/sessions/:sessionId/summary
 */
researchApi.get('/sessions/:sessionId/summary', async (c) => {
    try {
        const sessionId = c.req.param('sessionId');
        const session = await tools_1.prisma.researchSession.findUnique({
            where: { id: sessionId },
            include: {
                tasks: true,
                entity: {
                    select: { name: true },
                },
            },
        });
        if (!session) {
            return c.json({
                success: false,
                error: 'Session not found',
            }, 404);
        }
        const completedCategories = session.tasks
            .filter((t) => t.status === client_1.ResearchTaskStatus.COMPLETED)
            .map((t) => t.category);
        const durationSeconds = session.startedAt && session.completedAt
            ? Math.round((session.completedAt.getTime() - session.startedAt.getTime()) / 1000)
            : 0;
        return c.json({
            success: true,
            data: {
                sessionId,
                entityId: session.entityId,
                entityName: session.entity.name,
                status: session.status,
                totalTasks: session.totalTasks,
                completedTasks: session.completedTasks,
                failedTasks: session.failedTasks,
                totalAssertions: session.totalAssertions,
                totalScreenshots: session.totalScreenshots,
                totalExtractions: session.totalExtractions,
                durationSeconds,
                categoriesResearched: completedCategories,
                startedAt: session.startedAt,
                completedAt: session.completedAt,
            },
        });
    }
    catch (error) {
        return c.json({
            success: false,
            error: error instanceof Error ? error.message : 'Failed to get summary',
        }, 500);
    }
});
// ============================================
// List Sessions
// ============================================
/**
 * List sessions (optionally filtered by project or entity)
 * GET /api/research/sessions
 */
researchApi.get('/sessions', async (c) => {
    try {
        const projectId = c.req.query('projectId');
        const entityId = c.req.query('entityId');
        const status = c.req.query('status');
        const where = {};
        if (projectId)
            where.projectId = projectId;
        if (entityId)
            where.entityId = entityId;
        if (status)
            where.status = status;
        const sessions = await tools_1.prisma.researchSession.findMany({
            where,
            include: {
                entity: {
                    select: { id: true, name: true, url: true },
                },
                tasks: {
                    select: { id: true, category: true, status: true },
                },
            },
            orderBy: { createdAt: 'desc' },
            take: 50,
        });
        return c.json({
            success: true,
            data: { sessions },
        });
    }
    catch (error) {
        return c.json({
            success: false,
            error: error instanceof Error ? error.message : 'Failed to list sessions',
        }, 500);
    }
});
// ============================================
// Entity Research Status
// ============================================
/**
 * Get research status for an entity
 * GET /api/research/entities/:entityId/status
 */
researchApi.get('/entities/:entityId/status', async (c) => {
    try {
        const entityId = c.req.param('entityId');
        // Get latest session for this entity
        const latestSession = await tools_1.prisma.researchSession.findFirst({
            where: { entityId },
            orderBy: { createdAt: 'desc' },
            include: {
                tasks: true,
            },
        });
        // Get extraction coverage
        const extractions = await tools_1.prisma.extraction.findMany({
            where: { entityId },
            select: {
                id: true,
                schemaType: true,
                extractedAt: true,
                status: true,
            },
            orderBy: { extractedAt: 'desc' },
        });
        // Calculate coverage by schema type
        const coverageBySchema = {
            pricing: { hasExtraction: false, isStale: false },
            features: { hasExtraction: false, isStale: false },
            company: { hasExtraction: false, isStale: false },
            compliance: { hasExtraction: false, isStale: false },
            integrations: { hasExtraction: false, isStale: false },
        };
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        for (const extraction of extractions) {
            if (coverageBySchema[extraction.schemaType] && !coverageBySchema[extraction.schemaType].hasExtraction) {
                coverageBySchema[extraction.schemaType] = {
                    hasExtraction: true,
                    lastExtracted: extraction.extractedAt,
                    isStale: extraction.extractedAt < thirtyDaysAgo,
                };
            }
        }
        return c.json({
            success: true,
            data: {
                entityId,
                latestSession: latestSession
                    ? {
                        id: latestSession.id,
                        status: latestSession.status,
                        createdAt: latestSession.createdAt,
                        completedAt: latestSession.completedAt,
                        completedTasks: latestSession.completedTasks,
                        totalTasks: latestSession.totalTasks,
                    }
                    : null,
                coverageBySchema,
                totalExtractions: extractions.length,
            },
        });
    }
    catch (error) {
        return c.json({
            success: false,
            error: error instanceof Error ? error.message : 'Failed to get entity status',
        }, 500);
    }
});
// ============================================
// Assertion Feedback
// ============================================
/**
 * Process feedback on an assertion
 * POST /api/research/feedback
 */
researchApi.post('/feedback', async (c) => {
    try {
        const body = await c.req.json();
        const { assertionId, feedbackType, validatedBy, comment, confidence, suggestedSources, } = body;
        // Validate required fields
        if (!assertionId || !feedbackType || !validatedBy) {
            return c.json({
                success: false,
                error: 'Missing required fields: assertionId, feedbackType, validatedBy',
            }, 400);
        }
        // Validate feedbackType
        if (!Object.values(feedback_types_1.FeedbackType).includes(feedbackType)) {
            return c.json({
                success: false,
                error: `Invalid feedbackType. Must be one of: ${Object.values(feedback_types_1.FeedbackType).join(', ')}`,
            }, 400);
        }
        // Get the assertion to verify it exists
        const assertion = await (0, assertions_1.getAssertion)(assertionId);
        if (!assertion) {
            return c.json({
                success: false,
                error: 'Assertion not found',
            }, 404);
        }
        let result;
        // Process feedback based on type
        switch (feedbackType) {
            case feedback_types_1.FeedbackType.VALIDATE:
                const validated = await (0, assertions_1.validateAssertion)(assertionId, validatedBy);
                result = {
                    success: true,
                    assertionId,
                    action: 'validated',
                    updatedAssertion: {
                        id: validated.id,
                        claim: validated.claim,
                        status: validated.status,
                        category: validated.category || undefined,
                    },
                };
                break;
            case feedback_types_1.FeedbackType.REJECT:
                const rejected = await (0, assertions_1.rejectAssertion)(assertionId, validatedBy, comment);
                result = {
                    success: true,
                    assertionId,
                    action: 'rejected',
                    updatedAssertion: {
                        id: rejected.id,
                        claim: rejected.claim,
                        status: rejected.status,
                        category: rejected.category || undefined,
                    },
                };
                break;
            case feedback_types_1.FeedbackType.CHALLENGE:
                await (0, assertions_1.addHumanResponse)(assertionId, comment || 'Challenge raised', validatedBy, {
                    partiallyValidated: false,
                });
                result = {
                    success: true,
                    assertionId,
                    action: 'queued_for_refinement',
                    agentResponse: 'Challenge recorded. AI will reconsider this assertion.',
                };
                break;
            case feedback_types_1.FeedbackType.REFINE:
                await (0, assertions_1.addHumanResponse)(assertionId, comment || 'Refinement requested', validatedBy, {
                    partiallyValidated: true,
                });
                result = {
                    success: true,
                    assertionId,
                    action: 'queued_for_refinement',
                    agentResponse: 'Refinement requested. AI will update this assertion.',
                };
                break;
            case feedback_types_1.FeedbackType.REQUEST_EVIDENCE:
                await (0, assertions_1.addHumanResponse)(assertionId, comment || 'Additional evidence requested', validatedBy, {});
                // Store suggested sources if provided
                if (suggestedSources && suggestedSources.length > 0) {
                    await tools_1.prisma.assertion.update({
                        where: { id: assertionId },
                        data: {
                            humanResponse: `Evidence requested. Suggested sources: ${suggestedSources.join(', ')}`,
                        },
                    });
                }
                result = {
                    success: true,
                    assertionId,
                    action: 'evidence_requested',
                    agentResponse: 'Evidence collection queued.',
                };
                break;
            default:
                return c.json({
                    success: false,
                    error: 'Unknown feedback type',
                }, 400);
        }
        // Log the feedback
        await tools_1.prisma.researchLog.create({
            data: {
                action: 'feedback_processed',
                details: {
                    assertionId,
                    feedbackType,
                    validatedBy,
                    action: result.action,
                    hasComment: !!comment,
                    confidence,
                },
            },
        });
        return c.json({
            success: true,
            data: result,
        });
    }
    catch (error) {
        return c.json({
            success: false,
            error: error instanceof Error ? error.message : 'Failed to process feedback',
        }, 500);
    }
});
/**
 * Quick validate an assertion
 * POST /api/research/assertions/:id/validate
 */
researchApi.post('/assertions/:id/validate', async (c) => {
    try {
        const assertionId = c.req.param('id');
        const body = await c.req.json();
        const { validatedBy, confidence } = body;
        if (!validatedBy) {
            return c.json({
                success: false,
                error: 'Missing required field: validatedBy',
            }, 400);
        }
        const assertion = await (0, assertions_1.validateAssertion)(assertionId, validatedBy);
        // Optionally update confidence if provided
        if (confidence !== undefined) {
            await tools_1.prisma.assertion.update({
                where: { id: assertionId },
                data: { confidence },
            });
        }
        return c.json({
            success: true,
            data: {
                assertionId,
                status: assertion.status,
                validatedBy: assertion.validatedBy,
                validatedAt: assertion.validatedAt,
            },
        });
    }
    catch (error) {
        return c.json({
            success: false,
            error: error instanceof Error ? error.message : 'Failed to validate assertion',
        }, 500);
    }
});
/**
 * Reject an assertion
 * POST /api/research/assertions/:id/reject
 */
researchApi.post('/assertions/:id/reject', async (c) => {
    try {
        const assertionId = c.req.param('id');
        const body = await c.req.json();
        const { validatedBy, reason } = body;
        if (!validatedBy) {
            return c.json({
                success: false,
                error: 'Missing required field: validatedBy',
            }, 400);
        }
        const assertion = await (0, assertions_1.rejectAssertion)(assertionId, validatedBy, reason);
        return c.json({
            success: true,
            data: {
                assertionId,
                status: assertion.status,
                validatedBy: assertion.validatedBy,
                validatedAt: assertion.validatedAt,
                rejectionReason: assertion.rejectionReason,
            },
        });
    }
    catch (error) {
        return c.json({
            success: false,
            error: error instanceof Error ? error.message : 'Failed to reject assertion',
        }, 500);
    }
});
/**
 * Challenge an assertion
 * POST /api/research/assertions/:id/challenge
 */
researchApi.post('/assertions/:id/challenge', async (c) => {
    try {
        const assertionId = c.req.param('id');
        const body = await c.req.json();
        const { validatedBy, comment } = body;
        if (!validatedBy) {
            return c.json({
                success: false,
                error: 'Missing required field: validatedBy',
            }, 400);
        }
        const assertion = await (0, assertions_1.addHumanResponse)(assertionId, comment || 'Challenge raised', validatedBy, { partiallyValidated: false });
        return c.json({
            success: true,
            data: {
                assertionId,
                status: assertion.status,
                humanResponse: assertion.humanResponse,
                validatedBy: assertion.validatedBy,
                queuedForRefinement: true,
            },
        });
    }
    catch (error) {
        return c.json({
            success: false,
            error: error instanceof Error ? error.message : 'Failed to challenge assertion',
        }, 500);
    }
});
/**
 * Request additional evidence for an assertion
 * POST /api/research/assertions/:id/request-evidence
 */
researchApi.post('/assertions/:id/request-evidence', async (c) => {
    try {
        const assertionId = c.req.param('id');
        const body = await c.req.json();
        const { requestedBy, suggestedSources } = body;
        if (!requestedBy) {
            return c.json({
                success: false,
                error: 'Missing required field: requestedBy',
            }, 400);
        }
        // Build evidence request message
        let message = 'Additional evidence requested';
        if (suggestedSources && suggestedSources.length > 0) {
            message += `. Suggested sources: ${suggestedSources.join(', ')}`;
        }
        const assertion = await (0, assertions_1.addHumanResponse)(assertionId, message, requestedBy, {});
        // Store suggested sources in assertion if provided
        if (suggestedSources && suggestedSources.length > 0) {
            await tools_1.prisma.assertion.update({
                where: { id: assertionId },
                data: {
                    humanResponse: message,
                },
            });
        }
        return c.json({
            success: true,
            data: {
                assertionId,
                status: assertion.status,
                evidenceRequested: true,
                suggestedSources: suggestedSources || [],
            },
        });
    }
    catch (error) {
        return c.json({
            success: false,
            error: error instanceof Error ? error.message : 'Failed to request evidence',
        }, 500);
    }
});
/**
 * Get assertions awaiting refinement
 * GET /api/research/pending-refinements
 */
researchApi.get('/pending-refinements', async (c) => {
    try {
        const projectId = c.req.query('projectId');
        const where = {
            partiallyValidated: true,
            status: client_1.AssertionStatus.CLAIM,
        };
        if (projectId) {
            where.entity = { projectId };
        }
        const assertions = await tools_1.prisma.assertion.findMany({
            where,
            include: {
                entity: {
                    select: {
                        id: true,
                        name: true,
                        url: true,
                        project: { select: { id: true, name: true } },
                    },
                },
                reasoning: true,
                sources: {
                    include: {
                        source: true,
                    },
                },
            },
            orderBy: [
                { criticality: 'asc' },
                { updatedAt: 'desc' },
            ],
            take: 100,
        });
        return c.json({
            success: true,
            data: {
                count: assertions.length,
                assertions,
            },
        });
    }
    catch (error) {
        return c.json({
            success: false,
            error: error instanceof Error ? error.message : 'Failed to get pending refinements',
        }, 500);
    }
});
/**
 * Get assertions awaiting evidence collection
 * GET /api/research/pending-evidence
 */
researchApi.get('/pending-evidence', async (c) => {
    try {
        const projectId = c.req.query('projectId');
        const where = {
            humanResponse: {
                contains: 'evidence requested',
            },
            status: client_1.AssertionStatus.CLAIM,
        };
        if (projectId) {
            where.entity = { projectId };
        }
        const assertions = await tools_1.prisma.assertion.findMany({
            where,
            include: {
                entity: {
                    select: {
                        id: true,
                        name: true,
                        url: true,
                        project: { select: { id: true, name: true } },
                    },
                },
                reasoning: true,
                sources: {
                    include: {
                        source: true,
                    },
                },
            },
            orderBy: [
                { criticality: 'asc' },
                { validatedAt: 'desc' },
            ],
            take: 100,
        });
        return c.json({
            success: true,
            data: {
                count: assertions.length,
                assertions,
            },
        });
    }
    catch (error) {
        return c.json({
            success: false,
            error: error instanceof Error ? error.message : 'Failed to get pending evidence requests',
        }, 500);
    }
});
exports.default = researchApi;
//# sourceMappingURL=research-api.js.map