"use strict";
/**
 * WebSocket handler for real-time Claude validation sessions
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.createWebSocketHandler = createWebSocketHandler;
const session_1 = require("../agent/session");
const auth_1 = require("../middleware/auth");
const tools = __importStar(require("../../tools"));
function createWebSocketHandler() {
    return function (c) {
        const state = {
            session: null,
            isProcessing: false,
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
                // Cleanup session on disconnect
                if (state.session) {
                    session_1.sessionManager.closeSession(state.session.id);
                }
            },
            onError(evt, _ws) {
                console.error('WebSocket error:', evt);
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
    }
    catch (error) {
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
async function handleStartSession(ws, state, message) {
    // Check auth
    const authStatus = (0, auth_1.getAuthStatus)();
    if (!authStatus.valid) {
        sendMessage(ws, {
            type: 'error',
            message: 'Authentication required. Run `claude login` or set ANTHROPIC_API_KEY',
        });
        return;
    }
    // Close existing session if any
    if (state.session) {
        session_1.sessionManager.closeSession(state.session.id);
    }
    try {
        // Create new session with optional assertionId
        state.session = await session_1.sessionManager.createSession({
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
    }
    catch (error) {
        console.error('Failed to start session:', error);
        sendMessage(ws, {
            type: 'error',
            message: error instanceof Error ? error.message : 'Failed to start session',
        });
    }
}
async function handleUserMessage(ws, state, message) {
    if (!state.session) {
        sendMessage(ws, { type: 'error', message: 'No active session. Start a session first.' });
        return;
    }
    try {
        session_1.sessionManager.sendMessage(state.session.id, message.content, message.images);
    }
    catch (error) {
        sendMessage(ws, {
            type: 'error',
            message: error instanceof Error ? error.message : 'Failed to send message',
        });
    }
}
async function handleAction(ws, state, message) {
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
                }
                catch (error) {
                    sendMessage(ws, { type: 'error', message: 'Failed to validate assertion' });
                }
            }
            break;
        case 'reject':
            if (assertionId) {
                try {
                    await tools.rejectAssertion(assertionId, validatorName, message.reason);
                    // No need to tell Claude - human has made the decision
                }
                catch (error) {
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
async function handleInterrupt(ws, state) {
    if (!state.session) {
        sendMessage(ws, { type: 'error', message: 'No active session' });
        return;
    }
    try {
        await session_1.sessionManager.interruptSession(state.session.id);
        sendMessage(ws, { type: 'assistant_complete' });
    }
    catch (error) {
        sendMessage(ws, {
            type: 'error',
            message: error instanceof Error ? error.message : 'Failed to interrupt',
        });
    }
}
// ============================================
// Response Streaming
// ============================================
async function streamResponses(ws, state) {
    if (!state.session)
        return;
    state.isProcessing = true;
    try {
        for await (const message of state.session.query) {
            if (!state.session?.isActive)
                break;
            processSDKMessage(ws, message);
        }
    }
    catch (error) {
        console.error('Stream error:', error);
        sendMessage(ws, {
            type: 'error',
            message: error instanceof Error ? error.message : 'Stream error',
        });
    }
    finally {
        state.isProcessing = false;
        sendMessage(ws, { type: 'assistant_complete' });
    }
}
function processSDKMessage(ws, message) {
    switch (message.type) {
        case 'assistant': {
            // Full assistant message
            const assistantMsg = message;
            const textBlocks = assistantMsg.message.content
                .filter((block) => block.type === 'text')
                .map((block) => block.text)
                .join('\n');
            const toolUses = assistantMsg.message.content
                .filter((block) => block.type === 'tool_use');
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
            const partial = message;
            if (partial.event.type === 'content_block_delta') {
                const delta = partial.event.delta;
                if (delta.type === 'text_delta' && delta.text) {
                    sendMessage(ws, { type: 'assistant_chunk', text: delta.text });
                }
            }
            break;
        }
        case 'result': {
            // Query completed
            const result = message;
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
function sendMessage(ws, message) {
    try {
        ws.send(JSON.stringify(message));
    }
    catch (error) {
        console.error('Failed to send WebSocket message:', error);
    }
}
//# sourceMappingURL=websocket.js.map