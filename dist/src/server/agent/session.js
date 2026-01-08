"use strict";
/**
 * Session manager for Claude Agent SDK
 * Manages validation sessions per user/connection
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.sessionManager = void 0;
const claude_agent_sdk_1 = require("@anthropic-ai/claude-agent-sdk");
const tools_1 = require("./tools");
const prompts_1 = require("./prompts");
class ValidationSessionManager {
    sessions = new Map();
    sessionCounter = 0;
    /**
     * Create a new validation session
     */
    async createSession(config) {
        const sessionId = `validation-${Date.now()}-${++this.sessionCounter}`;
        // Create MCP server with validation tools
        const validationMcp = (0, tools_1.createValidationMcpServer)();
        // Build the initial prompt - assertion is already visible in UI, don't restate it
        let initialPrompt;
        if (config.assertionId) {
            // Specific assertion requested - it's already displayed in UI, but fetch to get source URL
            initialPrompt = `Validation session started for assertion ${config.assertionId}. Validator: ${config.validatorName}.

The assertion details are already visible in the UI above - do NOT restate the claim.

Use get_assertion_by_id to fetch the assertion data, then:
1. Briefly greet the researcher by name
2. Provide the source URL(s) they should visit to verify the claim
3. Ask if they have any questions

Keep your response concise - just the greeting, URL(s), and offer to help.`;
        }
        else {
            // No specific assertion - just acknowledge session start, wait for instructions
            initialPrompt = `Validation session started. Validator: ${config.validatorName}. Waiting for assertion selection. The researcher will select specific assertions from their UI.`;
        }
        // Create the query with streaming input support
        const inputQueue = [];
        // Async generator for streaming user input
        async function* userInputStream() {
            // First, yield the initial prompt
            yield {
                type: 'user',
                message: { role: 'user', content: initialPrompt },
                parent_tool_use_id: null,
                session_id: sessionId,
            };
            // Then yield from the queue as messages are added
            while (true) {
                if (inputQueue.length > 0) {
                    yield inputQueue.shift();
                }
                else {
                    // Wait a bit before checking again
                    await new Promise((resolve) => setTimeout(resolve, 100));
                }
            }
        }
        // Create the query
        const q = (0, claude_agent_sdk_1.query)({
            prompt: userInputStream(),
            options: {
                systemPrompt: prompts_1.VALIDATION_SYSTEM_PROMPT,
                mcpServers: {
                    validation: validationMcp,
                },
                allowedTools: [
                    // Agent can ONLY fetch and present assertions - validation is done via UI buttons
                    'mcp__validation__get_assertion_by_id',
                    'mcp__validation__add_validation_note',
                    'mcp__validation__create_followup_assertion',
                    // REMOVED: validate_assertion, reject_assertion - human must click UI buttons
                ],
                model: config.model || 'claude-sonnet-4-20250514',
                permissionMode: 'acceptEdits',
                includePartialMessages: true,
                cwd: process.cwd(),
            },
        });
        const session = {
            id: sessionId,
            projectId: config.projectId,
            validatorName: config.validatorName,
            query: q,
            inputQueue,
            isActive: true,
        };
        this.sessions.set(sessionId, session);
        return session;
    }
    /**
     * Send a message to an existing session (supports multimodal with images)
     */
    sendMessage(sessionId, content, images) {
        const session = this.sessions.get(sessionId);
        if (!session || !session.isActive) {
            throw new Error(`Session ${sessionId} not found or inactive`);
        }
        // Build multimodal content if images are provided
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let messageContent;
        if (images && images.length > 0) {
            // Multimodal message with text and images (Claude API format)
            messageContent = [
                { type: 'text', text: content },
                ...images.map((img) => ({
                    type: 'image',
                    source: {
                        type: 'base64',
                        media_type: img.mediaType,
                        data: img.base64,
                    },
                })),
            ];
        }
        else {
            // Text-only message
            messageContent = content;
        }
        session.inputQueue.push({
            type: 'user',
            message: { role: 'user', content: messageContent },
            parent_tool_use_id: null,
            session_id: sessionId,
        });
    }
    /**
     * Get session by ID
     */
    getSession(sessionId) {
        return this.sessions.get(sessionId);
    }
    /**
     * Interrupt a session
     */
    async interruptSession(sessionId) {
        const session = this.sessions.get(sessionId);
        if (session?.query) {
            await session.query.interrupt();
        }
    }
    /**
     * Close and cleanup a session
     */
    closeSession(sessionId) {
        const session = this.sessions.get(sessionId);
        if (session) {
            session.isActive = false;
            this.sessions.delete(sessionId);
        }
    }
    /**
     * Get all active sessions
     */
    getActiveSessions() {
        return Array.from(this.sessions.values()).filter((s) => s.isActive);
    }
}
// Export singleton instance
exports.sessionManager = new ValidationSessionManager();
//# sourceMappingURL=session.js.map