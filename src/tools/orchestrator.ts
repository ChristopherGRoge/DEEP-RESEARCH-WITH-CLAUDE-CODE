/**
 * Orchestrator for spawning and managing subagents
 *
 * This module provides infrastructure for spawning Claude subagents with different
 * model tiers (Haiku, Sonnet, Opus) and tool configurations for research tasks.
 */

import { query, type Query, type SDKUserMessage } from '@anthropic-ai/claude-agent-sdk';
import { createValidationMcpServer } from '../server/agent/tools';
import { randomBytes } from 'crypto';

// ============================================
// Types and Interfaces
// ============================================

export type ModelTier = 'haiku' | 'sonnet' | 'opus';
export type TaskType = 'entity_research' | 'evidence_collection' | 'claim_validation' | 'logo_fetch' | 'url_validation' | 'metadata_enrichment' | 'custom';
export type TaskStatus = 'pending' | 'running' | 'completed' | 'failed' | 'cancelled';
export type ToolCategory = 'fetch' | 'db' | 'search' | 'validation';

export interface SpawnSubagentInput {
  taskType: TaskType;
  model?: ModelTier;
  entityId?: string;
  projectId?: string;
  prompt: string;
  tools?: ToolCategory[];
  timeout?: number;
  agentId?: string; // Optional agent identifier for tracking
  systemPrompt?: string; // Optional custom system prompt
}

export interface SubagentTask {
  taskId: string;
  taskType: TaskType;
  model: ModelTier;
  modelId: string;
  entityId?: string;
  projectId?: string;
  prompt: string;
  tools: ToolCategory[];
  timeout: number;
  agentId?: string;
  status: TaskStatus;
  createdAt: Date;
  startedAt?: Date;
  completedAt?: Date;
  query?: Query;
  inputQueue: SDKUserMessage[];
  result?: unknown;
  error?: string;
}

export interface TaskStatusResponse {
  taskId: string;
  status: TaskStatus;
  taskType: TaskType;
  model: ModelTier;
  createdAt: Date;
  startedAt?: Date;
  completedAt?: Date;
  durationMs?: number;
  result?: unknown;
  error?: string;
}

// ============================================
// Model Mapping
// ============================================

const MODEL_MAPPING: Record<ModelTier, string> = {
  haiku: 'claude-3-5-haiku-20241022',
  sonnet: 'claude-sonnet-4-20250514',
  opus: 'claude-opus-4-20250514',
};

// ============================================
// Task Registry
// ============================================

class TaskRegistry {
  private tasks: Map<string, SubagentTask> = new Map();
  private taskCounter = 0;

  /**
   * Create a new task entry
   */
  createTask(input: SpawnSubagentInput): SubagentTask {
    const taskId = `task-${Date.now()}-${++this.taskCounter}-${randomBytes(4).toString('hex')}`;
    const model = input.model || 'haiku';
    const modelId = MODEL_MAPPING[model];
    const tools = input.tools || ['db'];
    const timeout = input.timeout || 60000;

    const task: SubagentTask = {
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
  getTask(taskId: string): SubagentTask | undefined {
    return this.tasks.get(taskId);
  }

  /**
   * Update task status
   */
  updateTask(taskId: string, updates: Partial<SubagentTask>): void {
    const task = this.tasks.get(taskId);
    if (!task) {
      throw new Error(`Task ${taskId} not found`);
    }

    Object.assign(task, updates);
  }

  /**
   * Get all tasks (optionally filtered)
   */
  getAllTasks(filter?: { status?: TaskStatus; taskType?: TaskType }): SubagentTask[] {
    const tasks = Array.from(this.tasks.values());

    if (!filter) {
      return tasks;
    }

    return tasks.filter((task) => {
      if (filter.status && task.status !== filter.status) return false;
      if (filter.taskType && task.taskType !== filter.taskType) return false;
      return true;
    });
  }

  /**
   * Delete a task
   */
  deleteTask(taskId: string): boolean {
    return this.tasks.delete(taskId);
  }

  /**
   * Clean up old completed/failed tasks
   */
  cleanupOldTasks(olderThanMs: number = 3600000): number {
    const cutoff = Date.now() - olderThanMs;
    let cleaned = 0;

    for (const [taskId, task] of this.tasks.entries()) {
      if (
        (task.status === 'completed' || task.status === 'failed' || task.status === 'cancelled') &&
        task.completedAt &&
        task.completedAt.getTime() < cutoff
      ) {
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

const TASK_SYSTEM_PROMPTS: Record<TaskType, string> = {
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
function createMcpServers(tools: ToolCategory[]): Record<string, ReturnType<typeof createValidationMcpServer>> {
  const servers: Record<string, ReturnType<typeof createValidationMcpServer>> = {};

  // For now, use the validation MCP server which has broad tool access
  // In the future, we can create specialized MCP servers per category
  if (tools.includes('db') || tools.includes('fetch') || tools.includes('search') || tools.includes('validation')) {
    servers.validation = createValidationMcpServer();
  }

  return servers;
}

/**
 * Get allowed tools based on categories
 */
function getAllowedTools(tools: ToolCategory[]): string[] {
  const allowedTools: string[] = [];

  if (tools.includes('db')) {
    // Database write operations
    allowedTools.push(
      'mcp__validation__get_assertion_by_id',
      'mcp__validation__add_validation_note',
      'mcp__validation__create_followup_assertion'
    );
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
    allowedTools.push(
      'mcp__validation__get_assertion_by_id',
      'mcp__validation__add_validation_note'
    );
  }

  // If no specific tools requested or list is empty, allow all tools
  if (allowedTools.length === 0) {
    return undefined as unknown as string[]; // SDK interprets this as "all tools"
  }

  return allowedTools;
}

// ============================================
// Core Orchestrator Functions
// ============================================

/**
 * Spawn a new subagent with the specified configuration
 */
export async function spawnSubagent(input: SpawnSubagentInput): Promise<TaskStatusResponse> {
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
async function executeTask(task: SubagentTask): Promise<void> {
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
    async function* userInputStream(): AsyncGenerator<SDKUserMessage> {
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
          yield task.inputQueue.shift()!;
        } else {
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
    const q = query({
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
    const results: unknown[] = [];

    // Process query stream (Query is an AsyncGenerator)
    for await (const message of q) {
      // Process different message types
      if (message.type === 'assistant') {
        // Extract text content from assistant message
        const content = message.message.content;
        if (Array.isArray(content)) {
          const textBlocks = content
            .filter((block): block is { type: 'text'; text: string } =>
              typeof block === 'object' && block !== null && 'type' in block && block.type === 'text'
            )
            .map(block => block.text);

          if (textBlocks.length > 0) {
            results.push({ type: 'assistant', text: textBlocks.join('\n') });
          }
        }
      } else if (message.type === 'result') {
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
  } catch (error) {
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
export async function spawnSubagentSync(input: SpawnSubagentInput): Promise<TaskStatusResponse> {
  // Create task entry
  const task = taskRegistry.createTask(input);

  // Execute the task and wait for completion
  try {
    await executeTaskSync(task);
  } catch (error) {
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
async function executeTaskSync(task: SubagentTask): Promise<void> {
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
  async function* userInputStream(): AsyncGenerator<SDKUserMessage> {
    yield {
      type: 'user',
      message: { role: 'user', content: task.prompt },
      parent_tool_use_id: null,
      session_id: task.taskId,
    };
  }

  // Create the query
  const q = query({
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
  const timeoutPromise = new Promise<never>((_, reject) => {
    setTimeout(() => {
      reject(new Error(`Task timed out after ${task.timeout}ms`));
    }, task.timeout);
  });

  // Collect results
  const results: unknown[] = [];

  // Process query stream with timeout
  const processStream = async () => {
    for await (const message of q) {
      if (message.type === 'assistant') {
        const content = message.message.content;
        if (Array.isArray(content)) {
          const textBlocks = content
            .filter((block): block is { type: 'text'; text: string } =>
              typeof block === 'object' && block !== null && 'type' in block && block.type === 'text'
            )
            .map(block => block.text);

          if (textBlocks.length > 0) {
            results.push({ type: 'assistant', text: textBlocks.join('\n') });
          }
        }
      } else if (message.type === 'result') {
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
export function getSubagentStatus(taskId: string): TaskStatusResponse {
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
export function listActiveSubagents(): TaskStatusResponse[] {
  const activeTasks = taskRegistry.getAllTasks({
    status: 'running' as TaskStatus,
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
export function listAllSubagents(filter?: { status?: TaskStatus; taskType?: TaskType }): TaskStatusResponse[] {
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
export function cancelSubagent(taskId: string): TaskStatusResponse {
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
export function sendInputToSubagent(taskId: string, message: string): void {
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
export function cleanupOldTasks(olderThanHours: number = 1): { cleaned: number } {
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
export async function spawnHaikuAgent(
  taskType: TaskType,
  prompt: string,
  options?: Partial<SpawnSubagentInput>
): Promise<TaskStatusResponse> {
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
export async function spawnSonnetAgent(
  taskType: TaskType,
  prompt: string,
  options?: Partial<SpawnSubagentInput>
): Promise<TaskStatusResponse> {
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
export async function spawnOpusAgent(
  taskType: TaskType,
  prompt: string,
  options?: Partial<SpawnSubagentInput>
): Promise<TaskStatusResponse> {
  return spawnSubagent({
    taskType,
    model: 'opus',
    prompt,
    tools: ['db', 'fetch', 'search', 'validation'],
    ...options,
  });
}
