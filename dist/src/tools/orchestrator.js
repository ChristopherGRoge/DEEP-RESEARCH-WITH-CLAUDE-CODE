"use strict";
/**
 * Orchestrator for spawning and managing subagents
 *
 * This module provides infrastructure for spawning Claude subagents with different
 * model tiers (Haiku, Sonnet, Opus) and tool configurations for research tasks.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.spawnSubagent = spawnSubagent;
exports.spawnSubagentSync = spawnSubagentSync;
exports.getSubagentStatus = getSubagentStatus;
exports.listActiveSubagents = listActiveSubagents;
exports.listAllSubagents = listAllSubagents;
exports.cancelSubagent = cancelSubagent;
exports.sendInputToSubagent = sendInputToSubagent;
exports.cleanupOldTasks = cleanupOldTasks;
exports.spawnHaikuAgent = spawnHaikuAgent;
exports.spawnSonnetAgent = spawnSonnetAgent;
exports.spawnOpusAgent = spawnOpusAgent;
const claude_agent_sdk_1 = require("@anthropic-ai/claude-agent-sdk");
const tools_1 = require("../server/agent/tools");
const crypto_1 = require("crypto");
// ============================================
// Model Mapping
// ============================================
const MODEL_MAPPING = {
    haiku: 'claude-3-5-haiku-20241022',
    sonnet: 'claude-sonnet-4-20250514',
    opus: 'claude-opus-4-20250514',
};
// ============================================
// Task Registry
// ============================================
class TaskRegistry {
    tasks = new Map();
    taskCounter = 0;
    /**
     * Create a new task entry
     */
    createTask(input) {
        const taskId = `task-${Date.now()}-${++this.taskCounter}-${(0, crypto_1.randomBytes)(4).toString('hex')}`;
        const model = input.model || 'haiku';
        const modelId = MODEL_MAPPING[model];
        const tools = input.tools || ['db'];
        const timeout = input.timeout || 60000;
        const task = {
            taskId,
            taskType: input.taskType,
            model,
            modelId,
            entityId: input.entityId,
            projectId: input.projectId,
            prompt: input.prompt,
            tools,
            timeout,
            agentId: input.agentId,
            status: 'pending',
            createdAt: new Date(),
            inputQueue: [],
        };
        this.tasks.set(taskId, task);
        return task;
    }
    /**
     * Get task by ID
     */
    getTask(taskId) {
        return this.tasks.get(taskId);
    }
    /**
     * Update task status
     */
    updateTask(taskId, updates) {
        const task = this.tasks.get(taskId);
        if (!task) {
            throw new Error(`Task ${taskId} not found`);
        }
        Object.assign(task, updates);
    }
    /**
     * Get all tasks (optionally filtered)
     */
    getAllTasks(filter) {
        const tasks = Array.from(this.tasks.values());
        if (!filter) {
            return tasks;
        }
        return tasks.filter((task) => {
            if (filter.status && task.status !== filter.status)
                return false;
            if (filter.taskType && task.taskType !== filter.taskType)
                return false;
            return true;
        });
    }
    /**
     * Delete a task
     */
    deleteTask(taskId) {
        return this.tasks.delete(taskId);
    }
    /**
     * Clean up old completed/failed tasks
     */
    cleanupOldTasks(olderThanMs = 3600000) {
        const cutoff = Date.now() - olderThanMs;
        let cleaned = 0;
        for (const [taskId, task] of this.tasks.entries()) {
            if ((task.status === 'completed' || task.status === 'failed' || task.status === 'cancelled') &&
                task.completedAt &&
                task.completedAt.getTime() < cutoff) {
                this.tasks.delete(taskId);
                cleaned++;
            }
        }
        return cleaned;
    }
}
// Global task registry
const taskRegistry = new TaskRegistry();
// ============================================
// System Prompts by Task Type
// ============================================
const TASK_SYSTEM_PROMPTS = {
    entity_research: `You are a research subagent specializing in entity investigation.

Your role:
- Extract facts and claims about the entity from web sources
- Record assertions using the CLI tools provided
- Always include source URLs and quotes
- Focus on factual, verifiable information
- Use structured extraction commands when possible

Guidelines:
- Use extract:fetch + extract:save workflow for structured data
- Create assertions with assertion:create
- Link sources with proper quotes
- Categorize assertions appropriately (feature, pricing, compliance, etc.)`,
    evidence_collection: `You are an evidence collection subagent.

Your role:
- Capture screenshots of web pages as evidence
- Extract exact quotes and supporting text
- Record evidence descriptions that reference screenshots
- Validate source URLs are accessible

Guidelines:
- Always capture screenshots first (extract:fetch)
- Quote EXACT visible text from screenshots
- Describe WHERE on page the evidence appears
- Record evidence chain for complex claims`,
    claim_validation: `You are a claim validation subagent.

Your role:
- Verify assertions against their source URLs
- Check if quotes match the actual page content
- Identify broken links or content drift
- Grade source quality (VALIDATED, REJECTED)

Guidelines:
- Re-fetch URLs to verify current content
- Compare agent claims against actual page text
- Flag mismatches between claim and source
- Update source validation status`,
    logo_fetch: `You are a logo fetching subagent.

Your role:
- Find entity logos from official websites
- Prioritize SVG format for inline storage
- Search press kits and brand asset pages
- Download and store logo files

Guidelines:
- Use logo:search to find candidates
- Prefer SVG over PNG/JPG
- Verify logo URLs before downloading
- Save logo with proper metadata`,
    url_validation: `You are a URL validation subagent.

Your role:
- Check if URLs are accessible (not 404)
- Verify SSL certificates
- Test redirect chains
- Update source accessibility status

Guidelines:
- Use extract:validate for URL checking
- Handle timeouts gracefully
- Report broken links
- Update source records with findings`,
    metadata_enrichment: `You are a metadata enrichment subagent.

Your role:
- Add basic metadata to entities (founded date, HQ location)
- Enrich entity descriptions
- Standardize entity types
- Fill in missing fields

Guidelines:
- Focus on quick, factual additions
- Use official sources (About pages, Wikipedia)
- Don't overwrite existing good data
- Keep descriptions concise`,
    custom: `You are a general-purpose research subagent.

Follow the instructions provided in your task prompt and use the CLI tools available to complete your assigned task.`,
};
// ============================================
// MCP Server Creation by Tool Category
// ============================================
/**
 * Create MCP server configuration based on requested tool categories
 */
function createMcpServers(tools) {
    const servers = {};
    // For now, use the validation MCP server which has broad tool access
    // In the future, we can create specialized MCP servers per category
    if (tools.includes('db') || tools.includes('fetch') || tools.includes('search') || tools.includes('validation')) {
        servers.validation = (0, tools_1.createValidationMcpServer)();
    }
    return servers;
}
/**
 * Get allowed tools based on categories
 */
function getAllowedTools(tools) {
    const allowedTools = [];
    if (tools.includes('db')) {
        // Database write operations
        allowedTools.push('mcp__validation__get_assertion_by_id', 'mcp__validation__add_validation_note', 'mcp__validation__create_followup_assertion');
    }
    if (tools.includes('fetch')) {
        // Web fetching and extraction (if available in MCP)
        // Note: May need to add these to the MCP server
    }
    if (tools.includes('search')) {
        // Search operations (if available in MCP)
    }
    if (tools.includes('validation')) {
        // Validation operations
        allowedTools.push('mcp__validation__get_assertion_by_id', 'mcp__validation__add_validation_note');
    }
    // If no specific tools requested or list is empty, allow all tools
    if (allowedTools.length === 0) {
        return undefined; // SDK interprets this as "all tools"
    }
    return allowedTools;
}
// ============================================
// Core Orchestrator Functions
// ============================================
/**
 * Spawn a new subagent with the specified configuration
 */
async function spawnSubagent(input) {
    // Create task entry
    const task = taskRegistry.createTask(input);
    // Start the task asynchronously
    executeTask(task).catch((error) => {
        taskRegistry.updateTask(task.taskId, {
            status: 'failed',
            completedAt: new Date(),
            error: error instanceof Error ? error.message : String(error),
        });
    });
    return {
        taskId: task.taskId,
        status: task.status,
        taskType: task.taskType,
        model: task.model,
        createdAt: task.createdAt,
    };
}
/**
 * Execute a task (internal)
 */
async function executeTask(task) {
    // Update status to running
    taskRegistry.updateTask(task.taskId, {
        status: 'running',
        startedAt: new Date(),
    });
    try {
        // Get system prompt
        const systemPrompt = TASK_SYSTEM_PROMPTS[task.taskType] || TASK_SYSTEM_PROMPTS.custom;
        // Create MCP servers
        const mcpServers = createMcpServers(task.tools);
        // Get allowed tools
        const allowedTools = getAllowedTools(task.tools);
        // Create async generator for user input
        async function* userInputStream() {
            // Yield initial prompt
            yield {
                type: 'user',
                message: { role: 'user', content: task.prompt },
                parent_tool_use_id: null,
                session_id: task.taskId,
            };
            // Yield from input queue
            while (true) {
                if (task.inputQueue.length > 0) {
                    yield task.inputQueue.shift();
                }
                else {
                    // Check if task is cancelled
                    const currentTask = taskRegistry.getTask(task.taskId);
                    if (currentTask?.status === 'cancelled') {
                        break;
                    }
                    // Wait before checking again
                    await new Promise((resolve) => setTimeout(resolve, 100));
                }
            }
        }
        // Create the query
        const q = (0, claude_agent_sdk_1.query)({
            prompt: userInputStream(),
            options: {
                systemPrompt,
                mcpServers,
                allowedTools: allowedTools.length > 0 ? allowedTools : undefined,
                model: task.modelId,
                permissionMode: 'acceptEdits',
                includePartialMessages: true,
                cwd: process.cwd(),
            },
        });
        // Store query in task
        taskRegistry.updateTask(task.taskId, { query: q });
        // Set up timeout
        const timeoutId = setTimeout(() => {
            taskRegistry.updateTask(task.taskId, {
                status: 'failed',
                completedAt: new Date(),
                error: `Task timed out after ${task.timeout}ms`,
            });
        }, task.timeout);
        // Collect results
        const results = [];
        // Process query stream (Query is an AsyncGenerator)
        for await (const message of q) {
            // Process different message types
            if (message.type === 'assistant') {
                // Extract text content from assistant message
                const content = message.message.content;
                if (Array.isArray(content)) {
                    const textBlocks = content
                        .filter((block) => typeof block === 'object' && block !== null && 'type' in block && block.type === 'text')
                        .map(block => block.text);
                    if (textBlocks.length > 0) {
                        results.push({ type: 'assistant', text: textBlocks.join('\n') });
                    }
                }
            }
            else if (message.type === 'result') {
                // Query completed
                results.push({
                    type: 'result',
                    success: message.subtype === 'success',
                    numTurns: message.num_turns,
                    costUsd: message.total_cost_usd,
                });
            }
            // Note: SDK doesn't send 'error' type messages - errors are thrown as exceptions
            // Check if task was cancelled
            const currentTask = taskRegistry.getTask(task.taskId);
            if (currentTask?.status === 'cancelled') {
                clearTimeout(timeoutId);
                return;
            }
        }
        // Clear timeout
        clearTimeout(timeoutId);
        // Mark as completed
        taskRegistry.updateTask(task.taskId, {
            status: 'completed',
            completedAt: new Date(),
            result: results,
        });
    }
    catch (error) {
        // Mark as failed
        taskRegistry.updateTask(task.taskId, {
            status: 'failed',
            completedAt: new Date(),
            error: error instanceof Error ? error.message : String(error),
        });
    }
}
/**
 * Spawn a subagent and wait for completion (synchronous mode)
 * Useful for CLI testing and sequential workflows
 */
async function spawnSubagentSync(input) {
    // Create task entry
    const task = taskRegistry.createTask(input);
    // Execute the task and wait for completion
    try {
        await executeTaskSync(task);
    }
    catch (error) {
        taskRegistry.updateTask(task.taskId, {
            status: 'failed',
            completedAt: new Date(),
            error: error instanceof Error ? error.message : String(error),
        });
    }
    // Return final status
    return getSubagentStatus(task.taskId);
}
/**
 * Execute a task synchronously (internal)
 */
async function executeTaskSync(task) {
    // Update status to running
    taskRegistry.updateTask(task.taskId, {
        status: 'running',
        startedAt: new Date(),
    });
    // Get system prompt
    const systemPrompt = task.agentId
        ? TASK_SYSTEM_PROMPTS[task.taskType] || TASK_SYSTEM_PROMPTS.custom
        : TASK_SYSTEM_PROMPTS[task.taskType] || TASK_SYSTEM_PROMPTS.custom;
    // Create MCP servers
    const mcpServers = createMcpServers(task.tools);
    // Create async generator for user input (single prompt, no queue)
    async function* userInputStream() {
        yield {
            type: 'user',
            message: { role: 'user', content: task.prompt },
            parent_tool_use_id: null,
            session_id: task.taskId,
        };
    }
    // Create the query
    const q = (0, claude_agent_sdk_1.query)({
        prompt: userInputStream(),
        options: {
            systemPrompt,
            mcpServers,
            model: task.modelId,
            permissionMode: 'bypassPermissions',
            includePartialMessages: false,
            cwd: process.cwd(),
        },
    });
    // Set up timeout
    const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => {
            reject(new Error(`Task timed out after ${task.timeout}ms`));
        }, task.timeout);
    });
    // Collect results
    const results = [];
    // Process query stream with timeout
    const processStream = async () => {
        for await (const message of q) {
            if (message.type === 'assistant') {
                const content = message.message.content;
                if (Array.isArray(content)) {
                    const textBlocks = content
                        .filter((block) => typeof block === 'object' && block !== null && 'type' in block && block.type === 'text')
                        .map(block => block.text);
                    if (textBlocks.length > 0) {
                        results.push({ type: 'assistant', text: textBlocks.join('\n') });
                    }
                }
            }
            else if (message.type === 'result') {
                results.push({
                    type: 'result',
                    success: message.subtype === 'success',
                    numTurns: message.num_turns,
                    costUsd: message.total_cost_usd,
                });
            }
        }
    };
    // Race between processing and timeout
    await Promise.race([processStream(), timeoutPromise]);
    // Mark as completed
    taskRegistry.updateTask(task.taskId, {
        status: 'completed',
        completedAt: new Date(),
        result: results,
    });
}
/**
 * Get the status of a spawned subagent
 */
function getSubagentStatus(taskId) {
    const task = taskRegistry.getTask(taskId);
    if (!task) {
        throw new Error(`Task ${taskId} not found`);
    }
    const durationMs = task.completedAt
        ? task.completedAt.getTime() - (task.startedAt || task.createdAt).getTime()
        : task.startedAt
            ? Date.now() - task.startedAt.getTime()
            : undefined;
    return {
        taskId: task.taskId,
        status: task.status,
        taskType: task.taskType,
        model: task.model,
        createdAt: task.createdAt,
        startedAt: task.startedAt,
        completedAt: task.completedAt,
        durationMs,
        result: task.result,
        error: task.error,
    };
}
/**
 * List all active subagent tasks
 */
function listActiveSubagents() {
    const activeTasks = taskRegistry.getAllTasks({
        status: 'running',
    });
    return activeTasks.map((task) => {
        const durationMs = task.startedAt ? Date.now() - task.startedAt.getTime() : undefined;
        return {
            taskId: task.taskId,
            status: task.status,
            taskType: task.taskType,
            model: task.model,
            createdAt: task.createdAt,
            startedAt: task.startedAt,
            completedAt: task.completedAt,
            durationMs,
        };
    });
}
/**
 * List all subagent tasks (with optional filters)
 */
function listAllSubagents(filter) {
    const tasks = taskRegistry.getAllTasks(filter);
    return tasks.map((task) => {
        const durationMs = task.completedAt
            ? task.completedAt.getTime() - (task.startedAt || task.createdAt).getTime()
            : task.startedAt
                ? Date.now() - task.startedAt.getTime()
                : undefined;
        return {
            taskId: task.taskId,
            status: task.status,
            taskType: task.taskType,
            model: task.model,
            createdAt: task.createdAt,
            startedAt: task.startedAt,
            completedAt: task.completedAt,
            durationMs,
            result: task.result,
            error: task.error,
        };
    });
}
/**
 * Cancel a running subagent task
 */
function cancelSubagent(taskId) {
    const task = taskRegistry.getTask(taskId);
    if (!task) {
        throw new Error(`Task ${taskId} not found`);
    }
    if (task.status !== 'running' && task.status !== 'pending') {
        throw new Error(`Task ${taskId} is ${task.status} and cannot be cancelled`);
    }
    taskRegistry.updateTask(taskId, {
        status: 'cancelled',
        completedAt: new Date(),
    });
    return getSubagentStatus(taskId);
}
/**
 * Send additional input to a running subagent
 */
function sendInputToSubagent(taskId, message) {
    const task = taskRegistry.getTask(taskId);
    if (!task) {
        throw new Error(`Task ${taskId} not found`);
    }
    if (task.status !== 'running') {
        throw new Error(`Task ${taskId} is ${task.status} and cannot receive input`);
    }
    // Add message to input queue
    task.inputQueue.push({
        type: 'user',
        message: { role: 'user', content: message },
        parent_tool_use_id: null,
        session_id: task.taskId,
    });
}
/**
 * Clean up old completed/failed tasks
 */
function cleanupOldTasks(olderThanHours = 1) {
    const olderThanMs = olderThanHours * 3600000;
    const cleaned = taskRegistry.cleanupOldTasks(olderThanMs);
    return { cleaned };
}
// ============================================
// Convenience Functions
// ============================================
/**
 * Spawn a Haiku agent for simple deterministic tasks
 */
async function spawnHaikuAgent(taskType, prompt, options) {
    return spawnSubagent({
        taskType,
        model: 'haiku',
        prompt,
        tools: ['db'],
        ...options,
    });
}
/**
 * Spawn a Sonnet agent for reasoning tasks
 */
async function spawnSonnetAgent(taskType, prompt, options) {
    return spawnSubagent({
        taskType,
        model: 'sonnet',
        prompt,
        tools: ['db', 'fetch', 'search'],
        ...options,
    });
}
/**
 * Spawn an Opus agent for complex synthesis
 */
async function spawnOpusAgent(taskType, prompt, options) {
    return spawnSubagent({
        taskType,
        model: 'opus',
        prompt,
        tools: ['db', 'fetch', 'search', 'validation'],
        ...options,
    });
}
//# sourceMappingURL=orchestrator.js.map