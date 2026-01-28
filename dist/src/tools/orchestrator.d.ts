/**
 * Orchestrator for spawning and managing subagents
 *
 * This module provides infrastructure for spawning Claude subagents with different
 * model tiers (Haiku, Sonnet, Opus) and tool configurations for research tasks.
 */
import { type Query, type SDKUserMessage } from '@anthropic-ai/claude-agent-sdk';
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
    agentId?: string;
    systemPrompt?: string;
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
/**
 * Spawn a new subagent with the specified configuration
 */
export declare function spawnSubagent(input: SpawnSubagentInput): Promise<TaskStatusResponse>;
/**
 * Spawn a subagent and wait for completion (synchronous mode)
 * Useful for CLI testing and sequential workflows
 */
export declare function spawnSubagentSync(input: SpawnSubagentInput): Promise<TaskStatusResponse>;
/**
 * Get the status of a spawned subagent
 */
export declare function getSubagentStatus(taskId: string): TaskStatusResponse;
/**
 * List all active subagent tasks
 */
export declare function listActiveSubagents(): TaskStatusResponse[];
/**
 * List all subagent tasks (with optional filters)
 */
export declare function listAllSubagents(filter?: {
    status?: TaskStatus;
    taskType?: TaskType;
}): TaskStatusResponse[];
/**
 * Cancel a running subagent task
 */
export declare function cancelSubagent(taskId: string): TaskStatusResponse;
/**
 * Send additional input to a running subagent
 */
export declare function sendInputToSubagent(taskId: string, message: string): void;
/**
 * Clean up old completed/failed tasks
 */
export declare function cleanupOldTasks(olderThanHours?: number): {
    cleaned: number;
};
/**
 * Spawn a Haiku agent for simple deterministic tasks
 */
export declare function spawnHaikuAgent(taskType: TaskType, prompt: string, options?: Partial<SpawnSubagentInput>): Promise<TaskStatusResponse>;
/**
 * Spawn a Sonnet agent for reasoning tasks
 */
export declare function spawnSonnetAgent(taskType: TaskType, prompt: string, options?: Partial<SpawnSubagentInput>): Promise<TaskStatusResponse>;
/**
 * Spawn an Opus agent for complex synthesis
 */
export declare function spawnOpusAgent(taskType: TaskType, prompt: string, options?: Partial<SpawnSubagentInput>): Promise<TaskStatusResponse>;
//# sourceMappingURL=orchestrator.d.ts.map