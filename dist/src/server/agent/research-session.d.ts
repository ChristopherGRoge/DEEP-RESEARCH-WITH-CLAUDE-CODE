/**
 * ResearchSessionManager - Manages browser-based deep research sessions
 *
 * Coordinates multi-agent research workflows using Claude Agent SDK.
 * Supports:
 * - Session lifecycle (create, start, pause, resume, cancel)
 * - Multi-agent coordination (coordinator + category specialists)
 * - Real-time progress tracking
 * - Evidence-first research protocol
 */
import { SDKUserMessage, Query } from '@anthropic-ai/claude-agent-sdk';
import { ResearchSessionStatus } from '../../../generated/prisma/client';
/**
 * Research categories aligned with extraction schema types
 */
export type ResearchCategory = 'pricing' | 'features' | 'company' | 'compliance' | 'integrations';
/**
 * Session configuration for creating a new research session
 */
export interface ResearchSessionConfig {
    entityId: string;
    entityName: string;
    entityUrl: string;
    projectId: string;
    researcherName: string;
    model?: string;
    categories?: ResearchCategory[];
    mode?: 'sequential' | 'parallel';
}
/**
 * Task progress tracking
 */
export interface TaskProgress {
    stage: TaskStage;
    stageDescription: string;
    percentComplete: number;
    urlsFetched: number;
    screenshotsCaptured: number;
    assertionsCreated: number;
    evidenceCollected: number;
}
export type TaskStage = 'initializing' | 'fetching_urls' | 'capturing_evidence' | 'analyzing_content' | 'creating_assertions' | 'validating_data' | 'finalizing';
/**
 * Task results - what the agent found
 */
export interface TaskResults {
    category: ResearchCategory;
    extractionId?: string;
    assertionIds: string[];
    screenshotPaths: string[];
    sourcesFound: number;
    dataQuality: 'high' | 'medium' | 'low' | 'insufficient';
    summary: string;
}
/**
 * Overall session progress aggregated from tasks
 */
export interface SessionProgress {
    totalTasks: number;
    completedTasks: number;
    failedTasks: number;
    inProgressTasks: number;
    pendingTasks: number;
    percentComplete: number;
    totalAssertions: number;
    totalEvidence: number;
    totalScreenshots: number;
    estimatedMinutesRemaining?: number;
}
/**
 * Active research session in memory
 */
export interface ActiveSession {
    id: string;
    entityId: string;
    entityName: string;
    projectId: string;
    researcherName: string;
    config: ResearchSessionConfig;
    status: ResearchSessionStatus;
    startedAt?: Date;
    pausedAt?: Date;
    coordinatorQuery?: Query;
    childQueries: Map<string, Query>;
    inputQueue: SDKUserMessage[];
    overallProgress: SessionProgress;
    onProgress?: (progress: SessionProgress) => void;
    onTaskUpdate?: (taskId: string, update: any) => void;
    onMessage?: (message: any) => void;
    onComplete?: (summary: SessionSummary) => void;
    onError?: (error: Error) => void;
}
/**
 * Session completion summary
 */
export interface SessionSummary {
    sessionId: string;
    entityId: string;
    entityName: string;
    totalTasks: number;
    completedTasks: number;
    failedTasks: number;
    totalAssertions: number;
    totalScreenshots: number;
    totalExtractions: number;
    durationSeconds: number;
    categoriesResearched: ResearchCategory[];
}
export declare class ResearchSessionManager {
    private activeSessions;
    private sessionCounter;
    /**
     * Create a new research session for an entity
     */
    createSession(config: ResearchSessionConfig): Promise<{
        sessionId: string;
        tasks: any[];
    }>;
    /**
     * Start the research session - launches coordinator agent
     */
    startSession(sessionId: string, callbacks?: {
        onProgress?: (progress: SessionProgress) => void;
        onTaskUpdate?: (taskId: string, update: any) => void;
        onMessage?: (message: any) => void;
        onComplete?: (summary: SessionSummary) => void;
        onError?: (error: Error) => void;
    }): Promise<void>;
    /**
     * Stream responses from coordinator agent
     */
    private streamCoordinatorResponses;
    /**
     * Create async input stream for coordinator
     */
    private createInputStream;
    /**
     * Build initial prompt for coordinator agent
     */
    private buildCoordinatorInitialPrompt;
    /**
     * Send a message to the coordinator agent
     */
    sendMessage(sessionId: string, content: string): void;
    /**
     * Update task progress (called by MCP tools)
     */
    updateTaskProgress(sessionId: string, taskId: string, progress: Partial<TaskProgress>): Promise<void>;
    /**
     * Complete a task with results (called by MCP tools)
     */
    completeTask(sessionId: string, taskId: string, results: TaskResults): Promise<void>;
    /**
     * Fail a task with error (called by MCP tools)
     */
    failTask(sessionId: string, taskId: string, error: string): Promise<void>;
    /**
     * Recalculate overall session progress
     */
    private recalculateProgress;
    /**
     * Complete the research session
     */
    private completeSession;
    /**
     * Pause the session
     */
    pauseSession(sessionId: string): Promise<void>;
    /**
     * Resume a paused session
     */
    resumeSession(sessionId: string): Promise<void>;
    /**
     * Cancel the session
     */
    cancelSession(sessionId: string): Promise<void>;
    /**
     * Get session by ID
     */
    getSession(sessionId: string): ActiveSession | undefined;
    /**
     * Get session status from database
     */
    getSessionStatus(sessionId: string): Promise<any>;
    /**
     * Get all active sessions
     */
    getActiveSessions(): ActiveSession[];
    /**
     * Get category prompt for a specific research category
     */
    getCategoryPrompt(category: ResearchCategory): string;
}
export declare const researchSessionManager: ResearchSessionManager;
//# sourceMappingURL=research-session.d.ts.map