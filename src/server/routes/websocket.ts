/**
 * WebSocket handler for real-time Claude validation sessions
 */

import type { Context } from 'hono';
import type { WSContext, WSEvents, WSMessageReceive } from 'hono/ws';
import { sessionManager, type ValidationSession } from '../agent/session';
import { getAuthStatus } from '../middleware/auth';
import type { SDKMessage, SDKAssistantMessage, SDKPartialAssistantMessage, SDKResultMessage } from '@anthropic-ai/claude-agent-sdk';
import * as tools from '../../tools';

// ============================================
// WebSocket Message Types
// ============================================

export type WsIncomingMessage =
  | { type: 'start_session'; projectId?: string; validatorName: string; assertionId?: string }
  | { type: 'user_message'; content: string; images?: Array<{ base64: string; mediaType: string }> }
  | { type: 'action'; action: 'validate' | 'reject' | 'skip'; assertionId?: string; reason?: string }
  | { type: 'interrupt' }
  | { type: 'ping' };

export type WsOutgoingMessage =
  | { type: 'auth_status'; method: string; valid: boolean; details?: string }
  | { type: 'session_started'; sessionId: string; projectId?: string }
  | { type: 'assistant_chunk'; text: string }
  | { type: 'assistant_message'; content: string; toolUses?: unknown[] }
  | { type: 'assistant_complete' }
  | { type: 'result'; success: boolean; numTurns: number; costUsd: number }
  | { type: 'error'; message: string }
  | { type: 'pong' };

// ============================================
// WebSocket Handler
// ============================================

interface WSState {
  session: ValidationSession | null;
  isProcessing: boolean;
}

export function createWebSocketHandler() {
  return function (c: Context): WSEvents {
    const state: WSState = {
      session: null,
      isProcessing: false,
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
        // Cleanup session on disconnect
        if (state.session) {
          sessionManager.closeSession(state.session.id);
        }
      },

      onError(evt: Event, _ws: WSContext) {
        console.error('WebSocket error:', evt);
      },
    };
  };
}

async function handleMessage(ws: WSContext, state: WSState, data: WSMessageReceive) {
  try {
    const dataStr = typeof data === 'string' ? data : data.toString();
    const message: WsIncomingMessage = JSON.parse(dataStr);

    switch (message.type) {
      case 'ping':
        sendMessage(ws, { type: 'pong' });
        break;

      case 'start_session':
        await handleStartSession(ws, state, message);
        break;

      case 'user_message':
        await handleUserMessage(ws, state, message);
        break;

      case 'action':
        await handleAction(ws, state, message);
        break;

      case 'interrupt':
        await handleInterrupt(ws, state);
        break;

      default:
        sendMessage(ws, { type: 'error', message: 'Unknown message type' });
    }
  } catch (error) {
    console.error('WebSocket message error:', error);
    sendMessage(ws, {
      type: 'error',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}

// ============================================
// Message Handlers
// ============================================

async function handleStartSession(
  ws: WSContext,
  state: WSState,
  message: { projectId?: string; validatorName: string; assertionId?: string }
) {
  // Check auth
  const authStatus = getAuthStatus();
  if (!authStatus.valid) {
    sendMessage(ws, {
      type: 'error',
      message: 'Authentication required. Run `claude login` or set ANTHROPIC_API_KEY',
    });
    return;
  }

  // Close existing session if any
  if (state.session) {
    sessionManager.closeSession(state.session.id);
  }

  try {
    // Create new session with optional assertionId
    state.session = await sessionManager.createSession({
      projectId: message.projectId,
      validatorName: message.validatorName,
      assertionId: message.assertionId,
    });

    sendMessage(ws, {
      type: 'session_started',
      sessionId: state.session.id,
      projectId: message.projectId,
    });

    // Start streaming responses
    streamResponses(ws, state);
  } catch (error) {
    console.error('Failed to start session:', error);
    sendMessage(ws, {
      type: 'error',
      message: error instanceof Error ? error.message : 'Failed to start session',
    });
  }
}

async function handleUserMessage(
  ws: WSContext,
  state: WSState,
  message: { content: string; images?: Array<{ base64: string; mediaType: string }> }
) {
  if (!state.session) {
    sendMessage(ws, { type: 'error', message: 'No active session. Start a session first.' });
    return;
  }

  try {
    sessionManager.sendMessage(state.session.id, message.content, message.images);
  } catch (error) {
    sendMessage(ws, {
      type: 'error',
      message: error instanceof Error ? error.message : 'Failed to send message',
    });
  }
}

async function handleAction(
  ws: WSContext,
  state: WSState,
  message: { action: string; assertionId?: string; reason?: string }
) {
  if (!state.session) {
    sendMessage(ws, { type: 'error', message: 'No active session' });
    return;
  }

  const assertionId = message.assertionId;
  const validatorName = state.session.validatorName;

  // Perform the action directly via database - human clicked the button
  switch (message.action) {
    case 'validate':
      if (assertionId) {
        try {
          await tools.validateAssertion(assertionId, validatorName);
          // No need to tell Claude - human has made the decision
        } catch (error) {
          sendMessage(ws, { type: 'error', message: 'Failed to validate assertion' });
        }
      }
      break;

    case 'reject':
      if (assertionId) {
        try {
          await tools.rejectAssertion(assertionId, validatorName, message.reason);
          // No need to tell Claude - human has made the decision
        } catch (error) {
          sendMessage(ws, { type: 'error', message: 'Failed to reject assertion' });
        }
      }
      break;

    case 'skip':
      // Skip doesn't need database action - just for workflow
      break;

    default:
      sendMessage(ws, { type: 'error', message: 'Unknown action' });
      return;
  }
}

async function handleInterrupt(ws: WSContext, state: WSState) {
  if (!state.session) {
    sendMessage(ws, { type: 'error', message: 'No active session' });
    return;
  }

  try {
    await sessionManager.interruptSession(state.session.id);
    sendMessage(ws, { type: 'assistant_complete' });
  } catch (error) {
    sendMessage(ws, {
      type: 'error',
      message: error instanceof Error ? error.message : 'Failed to interrupt',
    });
  }
}

// ============================================
// Response Streaming
// ============================================

async function streamResponses(ws: WSContext, state: WSState) {
  if (!state.session) return;

  state.isProcessing = true;

  try {
    for await (const message of state.session.query) {
      if (!state.session?.isActive) break;

      processSDKMessage(ws, message);
    }
  } catch (error) {
    console.error('Stream error:', error);
    sendMessage(ws, {
      type: 'error',
      message: error instanceof Error ? error.message : 'Stream error',
    });
  } finally {
    state.isProcessing = false;
    sendMessage(ws, { type: 'assistant_complete' });
  }
}

function processSDKMessage(ws: WSContext, message: SDKMessage) {
  switch (message.type) {
    case 'assistant': {
      // Full assistant message
      const assistantMsg = message as SDKAssistantMessage;
      type ContentBlock = { type: string; text?: string; id?: string; name?: string; input?: unknown };
      const textBlocks = (assistantMsg.message.content as ContentBlock[])
        .filter((block: ContentBlock): block is { type: 'text'; text: string } => block.type === 'text')
        .map((block: { type: 'text'; text: string }) => block.text)
        .join('\n');

      const toolUses = (assistantMsg.message.content as ContentBlock[])
        .filter((block: ContentBlock): block is { type: 'tool_use'; id: string; name: string; input: unknown } =>
          block.type === 'tool_use'
        );

      if (textBlocks) {
        sendMessage(ws, {
          type: 'assistant_message',
          content: textBlocks,
          toolUses: toolUses.length > 0 ? toolUses : undefined,
        });
      }
      break;
    }

    case 'stream_event': {
      // Streaming partial message
      const partial = message as SDKPartialAssistantMessage;
      if (partial.event.type === 'content_block_delta') {
        const delta = partial.event.delta as { type: string; text?: string };
        if (delta.type === 'text_delta' && delta.text) {
          sendMessage(ws, { type: 'assistant_chunk', text: delta.text });
        }
      }
      break;
    }

    case 'result': {
      // Query completed
      const result = message as SDKResultMessage;
      sendMessage(ws, {
        type: 'result',
        success: result.subtype === 'success',
        numTurns: result.num_turns,
        costUsd: result.total_cost_usd,
      });
      break;
    }

    case 'system':
      // System messages (init, status changes) - mostly ignore for UI
      break;

    default:
      // Ignore other message types
      break;
  }
}

// ============================================
// Helpers
// ============================================

function sendMessage(ws: WSContext, message: WsOutgoingMessage) {
  try {
    ws.send(JSON.stringify(message));
  } catch (error) {
    console.error('Failed to send WebSocket message:', error);
  }
}
