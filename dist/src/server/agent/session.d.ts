/**
 * Session manager for Claude Agent SDK
 * Manages validation sessions per user/connection
 */
import { type Query, type SDKUserMessage } from '@anthropic-ai/claude-agent-sdk';
export interface SessionConfig {
    projectId?: string;
    validatorName: string;
    model?: string;
    assertionId?: string;
}
export interface ValidationSession {
    id: string;
    projectId?: string;
    validatorName: string;
    query: Query;
    inputQueue: SDKUserMessage[];
    isActive: boolean;
}
declare class ValidationSessionManager {
    private sessions;
    private sessionCounter;
    /**
     * Create a new validation session
     */
    createSession(config: SessionConfig): Promise<ValidationSession>;
    /**
     * Send a message to an existing session (supports multimodal with images)
     */
    sendMessage(sessionId: string, content: string, images?: Array<{
        base64: string;
        mediaType: string;
    }>): void;
    /**
     * Get session by ID
     */
    getSession(sessionId: string): ValidationSession | undefined;
    /**
     * Interrupt a session
     */
    interruptSession(sessionId: string): Promise<void>;
    /**
     * Close and cleanup a session
     */
    closeSession(sessionId: string): void;
    /**
     * Get all active sessions
     */
    getActiveSessions(): ValidationSession[];
}
export declare const sessionManager: ValidationSessionManager;
export {};
//# sourceMappingURL=session.d.ts.map