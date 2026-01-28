/**
 * WebSocket handler for real-time research sessions
 *
 * Handles browser-based deep research with real-time progress updates.
 */

import type { Context } from 'hono';
import type { WSContext, WSEvents, WSMessageReceive } from 'hono/ws';
import {
  researchSessionManager,
  type ResearchSessionConfig,
  type ResearchCategory,
  type SessionProgress,
  type SessionSummary,
} from '../agent/research-session';
import {
  discoverySessionManager,
  type DiscoveryProgress,
  type DiscoverySummary,
} from '../agent/discovery-session';
import { getAuthStatus } from '../middleware/auth';
import { prisma } from '../../tools';

// ============================================
// WebSocket Message Types
// ============================================

export type ResearchWsIncomingMessage =
  | {
      type: 'start_research';
      entityId: string;
      entityName: string;
      entityUrl: string;
      projectId: string;
      researcherName: string;
      categories?: ResearchCategory[];
      mode?: 'sequential' | 'parallel';
    }
  | {
      type: 'start_session';
      payload: {
        topic: string;
        researcher: string;
        categories: string[];
        mode: 'autonomous' | 'interactive';
        exampleEntities?: string[];
      };
    }
  | { type: 'user_message'; content: string }
  | { type: 'pause_session' }
  | { type: 'resume_session' }
  | { type: 'cancel_session' }
  | { type: 'get_status' }
  | { type: 'ping' };

export type ResearchWsOutgoingMessage =
  // Session lifecycle
  | { type: 'session_created'; sessionId: string; tasks: any[] }
  | { type: 'session_started'; sessionId: string }
  | { type: 'session_paused' }
  | { type: 'session_resumed' }
  | { type: 'session_completed'; summary: SessionSummary }
  | { type: 'session_failed'; error: string }
  | { type: 'session_cancelled' }

  // Task updates
  | { type: 'task_started'; taskId: string; category: string }
  | { type: 'task_progress'; taskId: string; category: string; progress: any }
  | { type: 'task_completed'; taskId: string; category: string; results: any }
  | { type: 'task_failed'; taskId: string; category: string; error: string }

  // Progress updates
  | { type: 'overall_progress'; progress: SessionProgress }

  // Evidence collection notifications
  | { type: 'screenshot_captured'; url: string; screenshotPath: string; entityName?: string }
  | { type: 'extraction_complete'; schemaType: string; extractionId: string; assertionCount: number }
  | { type: 'assertion_created'; assertionId: string; claim: string; category?: string }

  // Agent messages
  | { type: 'coordinator_message'; content: string }
  | { type: 'coordinator_chunk'; text: string }

  // Errors and status
  | { type: 'auth_status'; method: string; valid: boolean; details?: string }
  | { type: 'error'; message: string; recoverable?: boolean }
  | { type: 'status'; session: any }
  | { type: 'pong' };

// ============================================
// WebSocket State
// ============================================

interface ResearchWSState {
  sessionId: string | null;
  isActive: boolean;
}

// ============================================
// WebSocket Handler
// ============================================

export function createResearchWebSocketHandler() {
  return function (c: Context): WSEvents {
    const state: ResearchWSState = {
      sessionId: null,
      isActive: false,
    };

    return {
      onOpen(_evt: Event, ws: WSContext) {
        // Send initial auth status
        const authStatus = getAuthStatus();
        sendMessage(ws, {
          type: 'auth_status',
          method: authStatus.method,
          valid: authStatus.valid,
          details: authStatus.details,
        });
      },

      onMessage(evt: MessageEvent<WSMessageReceive>, ws: WSContext) {
        handleMessage(ws, state, evt.data);
      },

      onClose(_evt: CloseEvent, _ws: WSContext) {
        // Cleanup on disconnect - pause session if active
        if (state.sessionId) {
          researchSessionManager.pauseSession(state.sessionId).catch(console.error);
        }
      },

      onError(evt: Event, _ws: WSContext) {
        console.error('Research WebSocket error:', evt);
      },
    };
  };
}

async function handleMessage(ws: WSContext, state: ResearchWSState, data: WSMessageReceive) {
  try {
    const dataStr = typeof data === 'string' ? data : data.toString();
    const message: ResearchWsIncomingMessage = JSON.parse(dataStr);

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
  } catch (error) {
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

async function handleStartResearch(
  ws: WSContext,
  state: ResearchWSState,
  message: {
    entityId: string;
    entityName: string;
    entityUrl: string;
    projectId: string;
    researcherName: string;
    categories?: ResearchCategory[];
    mode?: 'sequential' | 'parallel';
  }
) {
  // Check auth
  const authStatus = getAuthStatus();
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
    await researchSessionManager.cancelSession(state.sessionId);
  }

  try {
    // Create session config
    const config: ResearchSessionConfig = {
      entityId: message.entityId,
      entityName: message.entityName,
      entityUrl: message.entityUrl,
      projectId: message.projectId,
      researcherName: message.researcherName,
      categories: message.categories,
      mode: message.mode || 'sequential',
    };

    // Create the session
    const { sessionId, tasks } = await researchSessionManager.createSession(config);
    state.sessionId = sessionId;
    state.isActive = true;

    // Notify client
    sendMessage(ws, {
      type: 'session_created',
      sessionId,
      tasks,
    });

    // Start the session with callbacks for real-time updates
    await researchSessionManager.startSession(sessionId, {
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
  } catch (error) {
    console.error('Failed to start research session:', error);
    sendMessage(ws, {
      type: 'error',
      message: error instanceof Error ? error.message : 'Failed to start research',
      recoverable: false,
    });
  }
}

async function handleStartSession(
  ws: WSContext,
  state: ResearchWSState,
  message: {
    payload: {
      topic: string;
      researcher: string;
      categories: string[];
      mode: 'autonomous' | 'interactive';
      exampleEntities?: string[];
    };
  }
) {
  // Check auth
  const authStatus = getAuthStatus();
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
    const { sessionId, projectId, tasks } = await discoverySessionManager.createSession({
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
    await discoverySessionManager.startSession(sessionId, {
      onProgress: (progress: DiscoveryProgress) => {
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

      onTaskUpdate: (taskId: string, update: any) => {
        sendMessage(ws, update);
      },

      onMessage: (msg: any) => {
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

      onComplete: (summary: DiscoverySummary) => {
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

      onError: (error: Error) => {
        state.isActive = false;
        console.error(`[Discovery Session] Failed:`, error);
        sendMessage(ws, {
          type: 'session_failed',
          error: error.message,
        });
      },
    });
  } catch (error) {
    console.error('[Discovery Session] Failed to start:', error);
    sendMessage(ws, {
      type: 'error',
      message: error instanceof Error ? error.message : 'Failed to start discovery session',
      recoverable: false,
    });
  }
}

async function handleUserMessage(
  ws: WSContext,
  state: ResearchWSState,
  message: { content: string }
) {
  if (!state.sessionId || !state.isActive) {
    sendMessage(ws, { type: 'error', message: 'No active session', recoverable: true });
    return;
  }

  try {
    // Route to appropriate session manager based on session ID prefix
    if (state.sessionId.startsWith('discovery-')) {
      discoverySessionManager.sendMessage(state.sessionId, message.content);
    } else {
      researchSessionManager.sendMessage(state.sessionId, message.content);
    }
  } catch (error) {
    sendMessage(ws, {
      type: 'error',
      message: error instanceof Error ? error.message : 'Failed to send message',
      recoverable: true,
    });
  }
}

async function handlePauseSession(ws: WSContext, state: ResearchWSState) {
  if (!state.sessionId) {
    sendMessage(ws, { type: 'error', message: 'No active session', recoverable: true });
    return;
  }

  try {
    // Route to appropriate session manager
    if (state.sessionId.startsWith('discovery-')) {
      await discoverySessionManager.pauseSession(state.sessionId);
    } else {
      await researchSessionManager.pauseSession(state.sessionId);
    }
    state.isActive = false;
    sendMessage(ws, { type: 'session_paused' });
  } catch (error) {
    sendMessage(ws, {
      type: 'error',
      message: error instanceof Error ? error.message : 'Failed to pause',
      recoverable: true,
    });
  }
}

async function handleResumeSession(ws: WSContext, state: ResearchWSState) {
  if (!state.sessionId) {
    sendMessage(ws, { type: 'error', message: 'No session to resume', recoverable: true });
    return;
  }

  try {
    // Route to appropriate session manager
    if (state.sessionId.startsWith('discovery-')) {
      await discoverySessionManager.resumeSession(state.sessionId);
    } else {
      await researchSessionManager.resumeSession(state.sessionId);
    }
    state.isActive = true;
    sendMessage(ws, { type: 'session_resumed' });
  } catch (error) {
    sendMessage(ws, {
      type: 'error',
      message: error instanceof Error ? error.message : 'Failed to resume',
      recoverable: true,
    });
  }
}

async function handleCancelSession(ws: WSContext, state: ResearchWSState) {
  if (!state.sessionId) {
    sendMessage(ws, { type: 'error', message: 'No active session', recoverable: true });
    return;
  }

  try {
    // Route to appropriate session manager
    if (state.sessionId.startsWith('discovery-')) {
      await discoverySessionManager.cancelSession(state.sessionId);
    } else {
      await researchSessionManager.cancelSession(state.sessionId);
    }
    state.sessionId = null;
    state.isActive = false;
    sendMessage(ws, { type: 'session_cancelled' });
  } catch (error) {
    sendMessage(ws, {
      type: 'error',
      message: error instanceof Error ? error.message : 'Failed to cancel',
      recoverable: true,
    });
  }
}

async function handleGetStatus(ws: WSContext, state: ResearchWSState) {
  if (!state.sessionId) {
    sendMessage(ws, { type: 'status', session: null });
    return;
  }

  try {
    // Route to appropriate session manager
    let session;
    if (state.sessionId.startsWith('discovery-')) {
      session = await discoverySessionManager.getSessionStatus(state.sessionId);
    } else {
      session = await researchSessionManager.getSessionStatus(state.sessionId);
    }
    sendMessage(ws, { type: 'status', session });
  } catch (error) {
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

function sendMessage(ws: WSContext, message: ResearchWsOutgoingMessage) {
  try {
    ws.send(JSON.stringify(message));
  } catch (error) {
    console.error('Failed to send Research WebSocket message:', error);
  }
}
