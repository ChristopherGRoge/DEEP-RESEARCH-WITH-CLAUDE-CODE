/**
 * WebSocket handler for real-time research sessions
 *
 * Handles browser-based deep research with real-time progress updates.
 */
import type { Context } from 'hono';
import type { WSEvents } from 'hono/ws';
import { type ResearchCategory, type SessionProgress, type SessionSummary } from '../agent/research-session';
export type ResearchWsIncomingMessage = {
    type: 'start_research';
    entityId: string;
    entityName: string;
    entityUrl: string;
    projectId: string;
    researcherName: string;
    categories?: ResearchCategory[];
    mode?: 'sequential' | 'parallel';
} | {
    type: 'start_session';
    payload: {
        topic: string;
        researcher: string;
        categories: string[];
        mode: 'autonomous' | 'interactive';
        exampleEntities?: string[];
    };
} | {
    type: 'user_message';
    content: string;
} | {
    type: 'pause_session';
} | {
    type: 'resume_session';
} | {
    type: 'cancel_session';
} | {
    type: 'get_status';
} | {
    type: 'ping';
};
export type ResearchWsOutgoingMessage = {
    type: 'session_created';
    sessionId: string;
    tasks: any[];
} | {
    type: 'session_started';
    sessionId: string;
} | {
    type: 'session_paused';
} | {
    type: 'session_resumed';
} | {
    type: 'session_completed';
    summary: SessionSummary;
} | {
    type: 'session_failed';
    error: string;
} | {
    type: 'session_cancelled';
} | {
    type: 'task_started';
    taskId: string;
    category: string;
} | {
    type: 'task_progress';
    taskId: string;
    category: string;
    progress: any;
} | {
    type: 'task_completed';
    taskId: string;
    category: string;
    results: any;
} | {
    type: 'task_failed';
    taskId: string;
    category: string;
    error: string;
} | {
    type: 'overall_progress';
    progress: SessionProgress;
} | {
    type: 'screenshot_captured';
    url: string;
    screenshotPath: string;
    entityName?: string;
} | {
    type: 'extraction_complete';
    schemaType: string;
    extractionId: string;
    assertionCount: number;
} | {
    type: 'assertion_created';
    assertionId: string;
    claim: string;
    category?: string;
} | {
    type: 'coordinator_message';
    content: string;
} | {
    type: 'coordinator_chunk';
    text: string;
} | {
    type: 'auth_status';
    method: string;
    valid: boolean;
    details?: string;
} | {
    type: 'error';
    message: string;
    recoverable?: boolean;
} | {
    type: 'status';
    session: any;
} | {
    type: 'pong';
};
export declare function createResearchWebSocketHandler(): (c: Context) => WSEvents;
//# sourceMappingURL=research-websocket.d.ts.map