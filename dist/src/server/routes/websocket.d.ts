/**
 * WebSocket handler for real-time Claude validation sessions
 */
import type { Context } from 'hono';
import type { WSEvents } from 'hono/ws';
export type WsIncomingMessage = {
    type: 'start_session';
    projectId?: string;
    validatorName: string;
    assertionId?: string;
} | {
    type: 'user_message';
    content: string;
    images?: Array<{
        base64: string;
        mediaType: string;
    }>;
} | {
    type: 'action';
    action: 'validate' | 'reject' | 'skip';
    assertionId?: string;
    reason?: string;
} | {
    type: 'interrupt';
} | {
    type: 'ping';
};
export type WsOutgoingMessage = {
    type: 'auth_status';
    method: string;
    valid: boolean;
    details?: string;
} | {
    type: 'session_started';
    sessionId: string;
    projectId?: string;
} | {
    type: 'assistant_chunk';
    text: string;
} | {
    type: 'assistant_message';
    content: string;
    toolUses?: unknown[];
} | {
    type: 'assistant_complete';
} | {
    type: 'result';
    success: boolean;
    numTurns: number;
    costUsd: number;
} | {
    type: 'error';
    message: string;
} | {
    type: 'pong';
};
export declare function createWebSocketHandler(): (c: Context) => WSEvents;
//# sourceMappingURL=websocket.d.ts.map