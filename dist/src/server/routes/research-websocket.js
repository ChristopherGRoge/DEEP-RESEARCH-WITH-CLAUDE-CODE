"use strict";
/**
 * WebSocket handler for real-time research sessions
 *
 * Handles browser-based deep research with real-time progress updates.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.createResearchWebSocketHandler = createResearchWebSocketHandler;
const research_session_1 = require("../agent/research-session");
const discovery_session_1 = require("../agent/discovery-session");
const auth_1 = require("../middleware/auth");
// ============================================
// WebSocket Handler
// ============================================
function createResearchWebSocketHandler() {
    return function (c) {
        const state = {
            sessionId: null,
            isActive: false,
        };
        return {
            onOpen(_evt, ws) {
                // Send initial auth status
                const authStatus = (0, auth_1.getAuthStatus)();
                sendMessage(ws, {
                    type: 'auth_status',
                    method: authStatus.method,
                    valid: authStatus.valid,
                    details: authStatus.details,
                });
            },
            onMessage(evt, ws) {
                handleMessage(ws, state, evt.data);
            },
            onClose(_evt, _ws) {
                // Cleanup on disconnect - pause session if active
                if (state.sessionId) {
                    research_session_1.researchSessionManager.pauseSession(state.sessionId).catch(console.error);
                }
            },
            onError(evt, _ws) {
                console.error('Research WebSocket error:', evt);
            },
        };
    };
}
async function handleMessage(ws, state, data) {
    try {
        const dataStr = typeof data === 'string' ? data : data.toString();
        const message = JSON.parse(dataStr);
        switch (message.type) {
            case 'ping':
                sendMessage(ws, { type: 'pong' });
                break;
            case 'start_research':
                await handleStartResearch(ws, state, message);
                break;
            case 'start_session':
                await handleStartSession(ws, state, message);
                break;
            case 'user_message':
                await handleUserMessage(ws, state, message);
                break;
            case 'pause_session':
                await handlePauseSession(ws, state);
                break;
            case 'resume_session':
                await handleResumeSession(ws, state);
                break;
            case 'cancel_session':
                await handleCancelSession(ws, state);
                break;
            case 'get_status':
                await handleGetStatus(ws, state);
                break;
            default:
                sendMessage(ws, { type: 'error', message: 'Unknown message type' });
        }
    }
    catch (error) {
        console.error('Research WebSocket message error:', error);
        sendMessage(ws, {
            type: 'error',
            message: error instanceof Error ? error.message : 'Unknown error',
            recoverable: true,
        });
    }
}
// ============================================
// Message Handlers
// ============================================
async function handleStartResearch(ws, state, message) {
    // Check auth
    const authStatus = (0, auth_1.getAuthStatus)();
    if (!authStatus.valid) {
        sendMessage(ws, {
            type: 'error',
            message: 'Authentication required. Run `claude login` or set ANTHROPIC_API_KEY',
            recoverable: false,
        });
        return;
    }
    // Cancel existing session if any
    if (state.sessionId) {
        await research_session_1.researchSessionManager.cancelSession(state.sessionId);
    }
    try {
        // Create session config
        const config = {
            entityId: message.entityId,
            entityName: message.entityName,
            entityUrl: message.entityUrl,
            projectId: message.projectId,
            researcherName: message.researcherName,
            categories: message.categories,
            mode: message.mode || 'sequential',
        };
        // Create the session
        const { sessionId, tasks } = await research_session_1.researchSessionManager.createSession(config);
        state.sessionId = sessionId;
        state.isActive = true;
        // Notify client
        sendMessage(ws, {
            type: 'session_created',
            sessionId,
            tasks,
        });
        // Start the session with callbacks for real-time updates
        await research_session_1.researchSessionManager.startSession(sessionId, {
            onProgress: (progress) => {
                sendMessage(ws, { type: 'overall_progress', progress });
            },
            onTaskUpdate: (taskId, update) => {
                sendMessage(ws, update);
            },
            onMessage: (msg) => {
                // Handle different message types from agents
                switch (msg.type) {
                    case 'coordinator_message':
                        sendMessage(ws, { type: 'coordinator_message', content: msg.content });
                        break;
                    case 'screenshot_captured':
                        sendMessage(ws, {
                            type: 'screenshot_captured',
                            url: msg.url,
                            screenshotPath: msg.screenshotPath,
                            entityName: msg.entityName,
                        });
                        break;
                    case 'extraction_complete':
                        sendMessage(ws, {
                            type: 'extraction_complete',
                            schemaType: msg.schemaType,
                            extractionId: msg.extractionId,
                            assertionCount: msg.assertionCount,
                        });
                        break;
                    case 'assertion_created':
                        sendMessage(ws, {
                            type: 'assertion_created',
                            assertionId: msg.assertionId,
                            claim: msg.claim,
                            category: msg.category,
                        });
                        break;
                    default:
                        // Forward any other messages
                        sendMessage(ws, msg);
                }
            },
            onComplete: (summary) => {
                state.isActive = false;
                sendMessage(ws, { type: 'session_completed', summary });
            },
            onError: (error) => {
                state.isActive = false;
                sendMessage(ws, {
                    type: 'session_failed',
                    error: error.message,
                });
            },
        });
        sendMessage(ws, { type: 'session_started', sessionId });
    }
    catch (error) {
        console.error('Failed to start research session:', error);
        sendMessage(ws, {
            type: 'error',
            message: error instanceof Error ? error.message : 'Failed to start research',
            recoverable: false,
        });
    }
}
async function handleStartSession(ws, state, message) {
    // Check auth
    const authStatus = (0, auth_1.getAuthStatus)();
    if (!authStatus.valid) {
        sendMessage(ws, {
            type: 'error',
            message: 'Authentication required. Run `claude login` or set ANTHROPIC_API_KEY',
            recoverable: false,
        });
        return;
    }
    const { topic, researcher, categories, mode, exampleEntities } = message.payload;
    // Log the research request
    console.log(`[Discovery Session] Starting...`);
    console.log(`  Topic: ${topic}`);
    console.log(`  Researcher: ${researcher}`);
    console.log(`  Categories: ${categories.join(', ')}`);
    console.log(`  Mode: ${mode}`);
    if (exampleEntities?.length) {
        console.log(`  Example Entities: ${exampleEntities.join(', ')}`);
    }
    try {
        // Create discovery session
        const { sessionId, projectId, tasks } = await discovery_session_1.discoverySessionManager.createSession({
            topic,
            researcher,
            categories,
            mode,
            exampleEntities,
        });
        state.sessionId = sessionId;
        state.isActive = true;
        console.log(`[Discovery Session] Created: ${sessionId}`);
        console.log(`  Project ID: ${projectId}`);
        // Notify client of session creation
        sendMessage(ws, {
            type: 'session_created',
            sessionId,
            tasks,
        });
        // Send session started
        sendMessage(ws, {
            type: 'session_started',
            sessionId,
        });
        // Send initial coordinator message
        const examplesText = exampleEntities?.length
            ? `\nExample Entities: ${exampleEntities.join(', ')}`
            : '';
        sendMessage(ws, {
            type: 'coordinator_message',
            content: `Starting discovery research for: **${topic}**\n\nResearcher: ${researcher}\nCategories: ${categories.join(', ')}\nMode: ${mode}${examplesText}\n\nInitializing research agent...`,
        });
        // Send initial progress
        sendMessage(ws, {
            type: 'overall_progress',
            progress: {
                totalTasks: tasks.length,
                completedTasks: 0,
                failedTasks: 0,
                inProgressTasks: 0,
                pendingTasks: tasks.length,
                percentComplete: 0,
                totalAssertions: 0,
                totalEvidence: 0,
                totalScreenshots: 0,
            },
        });
        // Start the discovery session with WebSocket callbacks
        await discovery_session_1.discoverySessionManager.startSession(sessionId, {
            onProgress: (progress) => {
                sendMessage(ws, {
                    type: 'overall_progress',
                    progress: {
                        totalTasks: progress.totalTasks,
                        completedTasks: progress.completedTasks,
                        failedTasks: progress.failedTasks,
                        inProgressTasks: progress.inProgressTasks,
                        pendingTasks: progress.pendingTasks,
                        percentComplete: progress.percentComplete,
                        totalAssertions: progress.totalAssertions,
                        totalEvidence: progress.totalEvidence,
                        totalScreenshots: progress.totalScreenshots,
                    },
                });
            },
            onTaskUpdate: (taskId, update) => {
                sendMessage(ws, update);
            },
            onMessage: (msg) => {
                // Route different message types
                switch (msg.type) {
                    case 'coordinator_message':
                        sendMessage(ws, { type: 'coordinator_message', content: msg.content });
                        break;
                    case 'screenshot_captured':
                        sendMessage(ws, {
                            type: 'screenshot_captured',
                            url: msg.url,
                            screenshotPath: msg.screenshotPath,
                            entityName: msg.entityName,
                        });
                        break;
                    case 'extraction_complete':
                        sendMessage(ws, {
                            type: 'extraction_complete',
                            schemaType: msg.schemaType,
                            extractionId: msg.extractionId,
                            assertionCount: msg.assertionCount,
                        });
                        break;
                    case 'assertion_created':
                        sendMessage(ws, {
                            type: 'assertion_created',
                            assertionId: msg.assertionId,
                            claim: msg.claim,
                            category: msg.category,
                        });
                        break;
                    case 'entity_discovered':
                        // Custom message for discovery - log for now
                        console.log(`[Discovery] Entity discovered: ${msg.entityName}`);
                        sendMessage(ws, {
                            type: 'coordinator_message',
                            content: `**Entity Discovered:** ${msg.entityName}\nURL: ${msg.entityUrl}`,
                        });
                        break;
                    default:
                        // Forward any other messages
                        sendMessage(ws, msg);
                }
            },
            onComplete: (summary) => {
                state.isActive = false;
                console.log(`[Discovery Session] Completed: ${summary.sessionId}`);
                console.log(`  Entities: ${summary.entitiesDiscovered} discovered, ${summary.entitiesResearched} researched`);
                console.log(`  Assertions: ${summary.totalAssertions}`);
                console.log(`  Duration: ${summary.durationSeconds}s`);
                sendMessage(ws, {
                    type: 'session_completed',
                    summary: {
                        sessionId: summary.sessionId,
                        entityId: summary.projectId, // Using projectId as entity reference
                        entityName: summary.topic,
                        totalTasks: summary.entitiesDiscovered,
                        completedTasks: summary.entitiesResearched,
                        failedTasks: 0,
                        totalAssertions: summary.totalAssertions,
                        totalScreenshots: summary.totalScreenshots,
                        totalExtractions: summary.totalExtractions,
                        durationSeconds: summary.durationSeconds,
                        categoriesResearched: [],
                    },
                });
            },
            onError: (error) => {
                state.isActive = false;
                console.error(`[Discovery Session] Failed:`, error);
                sendMessage(ws, {
                    type: 'session_failed',
                    error: error.message,
                });
            },
        });
    }
    catch (error) {
        console.error('[Discovery Session] Failed to start:', error);
        sendMessage(ws, {
            type: 'error',
            message: error instanceof Error ? error.message : 'Failed to start discovery session',
            recoverable: false,
        });
    }
}
async function handleUserMessage(ws, state, message) {
    if (!state.sessionId || !state.isActive) {
        sendMessage(ws, { type: 'error', message: 'No active session', recoverable: true });
        return;
    }
    try {
        // Route to appropriate session manager based on session ID prefix
        if (state.sessionId.startsWith('discovery-')) {
            discovery_session_1.discoverySessionManager.sendMessage(state.sessionId, message.content);
        }
        else {
            research_session_1.researchSessionManager.sendMessage(state.sessionId, message.content);
        }
    }
    catch (error) {
        sendMessage(ws, {
            type: 'error',
            message: error instanceof Error ? error.message : 'Failed to send message',
            recoverable: true,
        });
    }
}
async function handlePauseSession(ws, state) {
    if (!state.sessionId) {
        sendMessage(ws, { type: 'error', message: 'No active session', recoverable: true });
        return;
    }
    try {
        // Route to appropriate session manager
        if (state.sessionId.startsWith('discovery-')) {
            await discovery_session_1.discoverySessionManager.pauseSession(state.sessionId);
        }
        else {
            await research_session_1.researchSessionManager.pauseSession(state.sessionId);
        }
        state.isActive = false;
        sendMessage(ws, { type: 'session_paused' });
    }
    catch (error) {
        sendMessage(ws, {
            type: 'error',
            message: error instanceof Error ? error.message : 'Failed to pause',
            recoverable: true,
        });
    }
}
async function handleResumeSession(ws, state) {
    if (!state.sessionId) {
        sendMessage(ws, { type: 'error', message: 'No session to resume', recoverable: true });
        return;
    }
    try {
        // Route to appropriate session manager
        if (state.sessionId.startsWith('discovery-')) {
            await discovery_session_1.discoverySessionManager.resumeSession(state.sessionId);
        }
        else {
            await research_session_1.researchSessionManager.resumeSession(state.sessionId);
        }
        state.isActive = true;
        sendMessage(ws, { type: 'session_resumed' });
    }
    catch (error) {
        sendMessage(ws, {
            type: 'error',
            message: error instanceof Error ? error.message : 'Failed to resume',
            recoverable: true,
        });
    }
}
async function handleCancelSession(ws, state) {
    if (!state.sessionId) {
        sendMessage(ws, { type: 'error', message: 'No active session', recoverable: true });
        return;
    }
    try {
        // Route to appropriate session manager
        if (state.sessionId.startsWith('discovery-')) {
            await discovery_session_1.discoverySessionManager.cancelSession(state.sessionId);
        }
        else {
            await research_session_1.researchSessionManager.cancelSession(state.sessionId);
        }
        state.sessionId = null;
        state.isActive = false;
        sendMessage(ws, { type: 'session_cancelled' });
    }
    catch (error) {
        sendMessage(ws, {
            type: 'error',
            message: error instanceof Error ? error.message : 'Failed to cancel',
            recoverable: true,
        });
    }
}
async function handleGetStatus(ws, state) {
    if (!state.sessionId) {
        sendMessage(ws, { type: 'status', session: null });
        return;
    }
    try {
        // Route to appropriate session manager
        let session;
        if (state.sessionId.startsWith('discovery-')) {
            session = await discovery_session_1.discoverySessionManager.getSessionStatus(state.sessionId);
        }
        else {
            session = await research_session_1.researchSessionManager.getSessionStatus(state.sessionId);
        }
        sendMessage(ws, { type: 'status', session });
    }
    catch (error) {
        sendMessage(ws, {
            type: 'error',
            message: error instanceof Error ? error.message : 'Failed to get status',
            recoverable: true,
        });
    }
}
// ============================================
// Helpers
// ============================================
function sendMessage(ws, message) {
    try {
        ws.send(JSON.stringify(message));
    }
    catch (error) {
        console.error('Failed to send Research WebSocket message:', error);
    }
}
//# sourceMappingURL=research-websocket.js.map