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

import { query, SDKUserMessage, Query } from '@anthropic-ai/claude-agent-sdk';
import { prisma } from '../../tools';
import { createResearchMcpServer } from './research-tools';
import {
  RESEARCH_COORDINATOR_SYSTEM_PROMPT,
  PRICING_RESEARCH_PROMPT,
  FEATURES_RESEARCH_PROMPT,
  COMPANY_RESEARCH_PROMPT,
  COMPLIANCE_RESEARCH_PROMPT,
  INTEGRATIONS_RESEARCH_PROMPT,
} from './research-prompts';
import {
  ResearchSessionStatus,
  ResearchTaskStatus,
} from '../../../generated/prisma/client';

// ============================================
// Type Definitions
// ============================================

/**
 * Research categories aligned with extraction schema types
 */
export type ResearchCategory =
  | 'pricing'
  | 'features'
  | 'company'
  | 'compliance'
  | 'integrations';

/**
 * Session configuration for creating a new research session
 */
export interface ResearchSessionConfig {
  entityId: string;
  entityName: string;
  entityUrl: string;
  projectId: string;
  researcherName: string;
  model?: string; // Default: claude-sonnet-4-20250514
  categories?: ResearchCategory[]; // Which categories to research
  mode?: 'sequential' | 'parallel'; // How to run category tasks
}

/**
 * Task progress tracking
 */
export interface TaskProgress {
  stage: TaskStage;
  stageDescription: string;
  percentComplete: number; // 0-100

  // Granular progress
  urlsFetched: number;
  screenshotsCaptured: number;
  assertionsCreated: number;
  evidenceCollected: number;
}

export type TaskStage =
  | 'initializing'
  | 'fetching_urls'
  | 'capturing_evidence'
  | 'analyzing_content'
  | 'creating_assertions'
  | 'validating_data'
  | 'finalizing';

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
  percentComplete: number; // 0-100
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

  // Active queries
  coordinatorQuery?: Query;
  childQueries: Map<string, Query>; // taskId -> query

  // Input queue for streaming messages to coordinator
  inputQueue: SDKUserMessage[];

  // Progress tracking
  overallProgress: SessionProgress;

  // Callbacks for WebSocket notifications
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

// ============================================
// ResearchSessionManager Class
// ============================================

export class ResearchSessionManager {
  private activeSessions: Map<string, ActiveSession> = new Map();
  private sessionCounter = 0;

  /**
   * Create a new research session for an entity
   */
  async createSession(config: ResearchSessionConfig): Promise<{ sessionId: string; tasks: any[] }> {
    // Validate entity exists
    const entity = await prisma.entity.findUnique({
      where: { id: config.entityId },
      include: { project: true },
    });

    if (!entity) {
      throw new Error(`Entity ${config.entityId} not found`);
    }

    // Determine categories to research
    const categories: ResearchCategory[] = config.categories || [
      'pricing',
      'features',
      'company',
      'compliance',
      'integrations',
    ];

    // Create session in database
    const dbSession = await prisma.researchSession.create({
      data: {
        entityId: config.entityId,
        projectId: config.projectId,
        researcherName: config.researcherName,
        status: ResearchSessionStatus.INITIALIZING,
        categories,
        mode: config.mode || 'sequential',
        config: config as any,
        totalTasks: categories.length,
      },
    });

    // Create tasks for each category
    const tasks = await Promise.all(
      categories.map((category) =>
        prisma.researchTask.create({
          data: {
            sessionId: dbSession.id,
            category,
            status: ResearchTaskStatus.PENDING,
            progress: {
              stage: 'initializing',
              stageDescription: 'Task queued',
              percentComplete: 0,
              urlsFetched: 0,
              screenshotsCaptured: 0,
              assertionsCreated: 0,
              evidenceCollected: 0,
            },
          },
        })
      )
    );

    // Create active session in memory
    const activeSession: ActiveSession = {
      id: dbSession.id,
      entityId: config.entityId,
      entityName: config.entityName,
      projectId: config.projectId,
      researcherName: config.researcherName,
      config,
      status: ResearchSessionStatus.INITIALIZING,
      childQueries: new Map(),
      inputQueue: [],
      overallProgress: {
        totalTasks: categories.length,
        completedTasks: 0,
        failedTasks: 0,
        inProgressTasks: 0,
        pendingTasks: categories.length,
        percentComplete: 0,
        totalAssertions: 0,
        totalEvidence: 0,
        totalScreenshots: 0,
      },
    };

    this.activeSessions.set(dbSession.id, activeSession);

    return {
      sessionId: dbSession.id,
      tasks: tasks.map((t) => ({
        id: t.id,
        category: t.category,
        status: t.status,
      })),
    };
  }

  /**
   * Start the research session - launches coordinator agent
   */
  async startSession(
    sessionId: string,
    callbacks?: {
      onProgress?: (progress: SessionProgress) => void;
      onTaskUpdate?: (taskId: string, update: any) => void;
      onMessage?: (message: any) => void;
      onComplete?: (summary: SessionSummary) => void;
      onError?: (error: Error) => void;
    }
  ): Promise<void> {
    const session = this.activeSessions.get(sessionId);
    if (!session) {
      throw new Error(`Session ${sessionId} not found`);
    }

    // Set callbacks
    if (callbacks) {
      session.onProgress = callbacks.onProgress;
      session.onTaskUpdate = callbacks.onTaskUpdate;
      session.onMessage = callbacks.onMessage;
      session.onComplete = callbacks.onComplete;
      session.onError = callbacks.onError;
    }

    // Update status
    session.status = ResearchSessionStatus.PLANNING;
    session.startedAt = new Date();

    await prisma.researchSession.update({
      where: { id: sessionId },
      data: {
        status: ResearchSessionStatus.PLANNING,
        startedAt: session.startedAt,
      },
    });

    // Build initial prompt for coordinator
    const initialPrompt = this.buildCoordinatorInitialPrompt(session);

    // Create MCP server with research tools
    const mcpServer = createResearchMcpServer(sessionId, this);

    // Create coordinator query
    try {
      const coordinatorQuery = query({
        prompt: this.createInputStream(sessionId, initialPrompt),
        options: {
          systemPrompt: RESEARCH_COORDINATOR_SYSTEM_PROMPT,
          mcpServers: {
            research: mcpServer,
          },
          model: session.config.model || 'claude-sonnet-4-20250514',
          permissionMode: 'acceptEdits',
          includePartialMessages: true,
          cwd: process.cwd(),
        },
      });

      session.coordinatorQuery = coordinatorQuery;

      // Stream responses
      await this.streamCoordinatorResponses(session, coordinatorQuery);
    } catch (error) {
      session.status = ResearchSessionStatus.FAILED;
      await prisma.researchSession.update({
        where: { id: sessionId },
        data: { status: ResearchSessionStatus.FAILED },
      });

      if (session.onError) {
        session.onError(error as Error);
      }
      throw error;
    }
  }

  /**
   * Stream responses from coordinator agent
   */
  private async streamCoordinatorResponses(
    session: ActiveSession,
    coordinatorQuery: Query
  ): Promise<void> {
    try {
      for await (const event of coordinatorQuery) {
        if (session.status === ResearchSessionStatus.PAUSED) {
          break;
        }

        if (session.status === ResearchSessionStatus.CANCELLED) {
          break;
        }

        // Handle different event types
        if (event.type === 'assistant' && event.message) {
          // Extract text content
          const textContent = event.message.content
            ?.filter((c: any) => c.type === 'text')
            .map((c: any) => c.text)
            .join('');

          if (textContent && session.onMessage) {
            session.onMessage({
              type: 'coordinator_message',
              content: textContent,
            });
          }
        }
        // Note: Tool use events are handled internally by the SDK
        // Results come back via the research MCP tools
      }

      // Session completed
      if (session.status !== ResearchSessionStatus.CANCELLED) {
        await this.completeSession(session.id);
      }
    } catch (error) {
      console.error('Coordinator streaming error:', error);
      session.status = ResearchSessionStatus.FAILED;

      await prisma.researchSession.update({
        where: { id: session.id },
        data: { status: ResearchSessionStatus.FAILED },
      });

      if (session.onError) {
        session.onError(error as Error);
      }
    }
  }

  /**
   * Create async input stream for coordinator
   */
  private async *createInputStream(
    sessionId: string,
    initialPrompt: string
  ): AsyncGenerator<SDKUserMessage> {
    const session = this.activeSessions.get(sessionId);
    if (!session) return;

    // First message
    yield {
      type: 'user',
      message: { role: 'user', content: initialPrompt },
      parent_tool_use_id: null,
      session_id: sessionId,
    };

    // Then stream from input queue
    while (session.status === ResearchSessionStatus.RESEARCHING) {
      if (session.inputQueue.length > 0) {
        yield session.inputQueue.shift()!;
      } else {
        await new Promise((resolve) => setTimeout(resolve, 100));
      }
    }
  }

  /**
   * Build initial prompt for coordinator agent
   */
  private buildCoordinatorInitialPrompt(session: ActiveSession): string {
    const categories = session.config.categories || [
      'pricing',
      'features',
      'company',
      'compliance',
      'integrations',
    ];

    return `Research session started for entity: ${session.entityName}
Entity URL: ${session.config.entityUrl}
Entity ID: ${session.entityId}
Researcher: ${session.researcherName}

Your role is to coordinate research across these categories: ${categories.join(', ')}
Mode: ${session.config.mode || 'sequential'}

CRITICAL: Follow the Evidence-First Research Protocol
1. For each category, use the research tools to fetch pages and capture screenshots
2. Analyze screenshots visually to extract data
3. Create assertions with evidenceDescription referencing specific screenshot content
4. Save structured extractions for each category

Available research tools:
- fetch_url: Fetch a URL and capture screenshot
- save_extraction: Save structured data extracted from a page
- create_assertion: Create an assertion with evidence
- update_task_progress: Report progress on a task
- complete_task: Mark a task as completed with results
- fail_task: Mark a task as failed with error

Start by planning your research approach, then work through each category systematically.
Report progress frequently so the UI can update in real-time.`;
  }

  /**
   * Send a message to the coordinator agent
   */
  sendMessage(sessionId: string, content: string): void {
    const session = this.activeSessions.get(sessionId);
    if (!session || session.status !== ResearchSessionStatus.RESEARCHING) {
      throw new Error(`Session ${sessionId} not active`);
    }

    session.inputQueue.push({
      type: 'user',
      message: { role: 'user', content },
      parent_tool_use_id: null,
      session_id: sessionId,
    });
  }

  /**
   * Update task progress (called by MCP tools)
   */
  async updateTaskProgress(
    sessionId: string,
    taskId: string,
    progress: Partial<TaskProgress>
  ): Promise<void> {
    const session = this.activeSessions.get(sessionId);
    if (!session) return;

    // Update in database
    const task = await prisma.researchTask.update({
      where: { id: taskId },
      data: {
        status: ResearchTaskStatus.IN_PROGRESS,
        startedAt: new Date(),
        progress: progress as any,
      },
    });

    // Notify via callback
    if (session.onTaskUpdate) {
      session.onTaskUpdate(taskId, {
        type: 'task_progress',
        taskId,
        category: task.category,
        progress,
      });
    }

    // Recalculate overall progress
    await this.recalculateProgress(session);
  }

  /**
   * Complete a task with results (called by MCP tools)
   */
  async completeTask(
    sessionId: string,
    taskId: string,
    results: TaskResults
  ): Promise<void> {
    const session = this.activeSessions.get(sessionId);
    if (!session) return;

    // Update in database
    const task = await prisma.researchTask.update({
      where: { id: taskId },
      data: {
        status: ResearchTaskStatus.COMPLETED,
        completedAt: new Date(),
        results: results as any,
        progress: {
          stage: 'finalizing',
          stageDescription: 'Task completed',
          percentComplete: 100,
          urlsFetched: 1,
          screenshotsCaptured: results.screenshotPaths.length,
          assertionsCreated: results.assertionIds.length,
          evidenceCollected: results.sourcesFound,
        },
      },
    });

    // Update session metrics
    await prisma.researchSession.update({
      where: { id: sessionId },
      data: {
        completedTasks: { increment: 1 },
        totalAssertions: { increment: results.assertionIds.length },
        totalScreenshots: { increment: results.screenshotPaths.length },
        totalExtractions: results.extractionId ? { increment: 1 } : undefined,
      },
    });

    // Notify via callback
    if (session.onTaskUpdate) {
      session.onTaskUpdate(taskId, {
        type: 'task_completed',
        taskId,
        category: task.category,
        results,
      });
    }

    // Recalculate progress
    await this.recalculateProgress(session);
  }

  /**
   * Fail a task with error (called by MCP tools)
   */
  async failTask(sessionId: string, taskId: string, error: string): Promise<void> {
    const session = this.activeSessions.get(sessionId);
    if (!session) return;

    // Update in database
    const task = await prisma.researchTask.update({
      where: { id: taskId },
      data: {
        status: ResearchTaskStatus.FAILED,
        completedAt: new Date(),
        error,
      },
    });

    // Update session metrics
    await prisma.researchSession.update({
      where: { id: sessionId },
      data: {
        failedTasks: { increment: 1 },
      },
    });

    // Notify via callback
    if (session.onTaskUpdate) {
      session.onTaskUpdate(taskId, {
        type: 'task_failed',
        taskId,
        category: task.category,
        error,
      });
    }

    // Recalculate progress
    await this.recalculateProgress(session);
  }

  /**
   * Recalculate overall session progress
   */
  private async recalculateProgress(session: ActiveSession): Promise<void> {
    const tasks = await prisma.researchTask.findMany({
      where: { sessionId: session.id },
    });

    const completed = tasks.filter((t) => t.status === ResearchTaskStatus.COMPLETED).length;
    const failed = tasks.filter((t) => t.status === ResearchTaskStatus.FAILED).length;
    const inProgress = tasks.filter((t) => t.status === ResearchTaskStatus.IN_PROGRESS).length;
    const pending = tasks.filter((t) => t.status === ResearchTaskStatus.PENDING).length;

    // Calculate aggregate metrics
    let totalAssertions = 0;
    let totalScreenshots = 0;

    for (const task of tasks) {
      if (task.results) {
        const results = task.results as unknown as TaskResults;
        totalAssertions += results.assertionIds?.length || 0;
        totalScreenshots += results.screenshotPaths?.length || 0;
      }
    }

    // Calculate percent complete
    const percentComplete =
      tasks.length > 0
        ? Math.round(((completed + failed) / tasks.length) * 100)
        : 0;

    session.overallProgress = {
      totalTasks: tasks.length,
      completedTasks: completed,
      failedTasks: failed,
      inProgressTasks: inProgress,
      pendingTasks: pending,
      percentComplete,
      totalAssertions,
      totalEvidence: totalAssertions, // Each assertion has evidence
      totalScreenshots,
      estimatedMinutesRemaining: (pending + inProgress) * 2, // ~2 min per task
    };

    // Update in database
    await prisma.researchSession.update({
      where: { id: session.id },
      data: {
        overallProgress: session.overallProgress as any,
      },
    });

    // Notify via callback
    if (session.onProgress) {
      session.onProgress(session.overallProgress);
    }
  }

  /**
   * Complete the research session
   */
  private async completeSession(sessionId: string): Promise<void> {
    const session = this.activeSessions.get(sessionId);
    if (!session) return;

    session.status = ResearchSessionStatus.COMPLETED;
    const completedAt = new Date();
    const durationSeconds = session.startedAt
      ? Math.round((completedAt.getTime() - session.startedAt.getTime()) / 1000)
      : 0;

    // Get final task data
    const tasks = await prisma.researchTask.findMany({
      where: { sessionId },
    });

    const completedCategories = tasks
      .filter((t) => t.status === ResearchTaskStatus.COMPLETED)
      .map((t) => t.category as ResearchCategory);

    // Update database
    const dbSession = await prisma.researchSession.update({
      where: { id: sessionId },
      data: {
        status: ResearchSessionStatus.COMPLETED,
        completedAt,
      },
    });

    // Build summary
    const summary: SessionSummary = {
      sessionId,
      entityId: session.entityId,
      entityName: session.entityName,
      totalTasks: tasks.length,
      completedTasks: session.overallProgress.completedTasks,
      failedTasks: session.overallProgress.failedTasks,
      totalAssertions: dbSession.totalAssertions,
      totalScreenshots: dbSession.totalScreenshots,
      totalExtractions: dbSession.totalExtractions,
      durationSeconds,
      categoriesResearched: completedCategories,
    };

    // Notify via callback
    if (session.onComplete) {
      session.onComplete(summary);
    }

    // Clean up active session
    this.activeSessions.delete(sessionId);
  }

  /**
   * Pause the session
   */
  async pauseSession(sessionId: string): Promise<void> {
    const session = this.activeSessions.get(sessionId);
    if (!session) return;

    session.status = ResearchSessionStatus.PAUSED;
    session.pausedAt = new Date();

    // Interrupt coordinator if running
    if (session.coordinatorQuery) {
      await session.coordinatorQuery.interrupt();
    }

    // Interrupt all child queries
    for (const [taskId, childQuery] of session.childQueries) {
      await childQuery.interrupt();
    }

    await prisma.researchSession.update({
      where: { id: sessionId },
      data: {
        status: ResearchSessionStatus.PAUSED,
        pausedAt: session.pausedAt,
      },
    });
  }

  /**
   * Resume a paused session
   */
  async resumeSession(sessionId: string): Promise<void> {
    const session = this.activeSessions.get(sessionId);
    if (!session || session.status !== ResearchSessionStatus.PAUSED) return;

    session.status = ResearchSessionStatus.RESEARCHING;

    await prisma.researchSession.update({
      where: { id: sessionId },
      data: {
        status: ResearchSessionStatus.RESEARCHING,
      },
    });

    // Send resume message to coordinator
    this.sendMessage(sessionId, '[RESUME] Continue research from where we paused.');
  }

  /**
   * Cancel the session
   */
  async cancelSession(sessionId: string): Promise<void> {
    const session = this.activeSessions.get(sessionId);
    if (!session) return;

    session.status = ResearchSessionStatus.CANCELLED;

    // Interrupt all queries
    if (session.coordinatorQuery) {
      await session.coordinatorQuery.interrupt();
    }

    for (const childQuery of session.childQueries.values()) {
      await childQuery.interrupt();
    }

    // Update tasks
    await prisma.researchTask.updateMany({
      where: {
        sessionId,
        status: { in: [ResearchTaskStatus.PENDING, ResearchTaskStatus.IN_PROGRESS] },
      },
      data: {
        status: ResearchTaskStatus.CANCELLED,
      },
    });

    await prisma.researchSession.update({
      where: { id: sessionId },
      data: {
        status: ResearchSessionStatus.CANCELLED,
      },
    });

    // Clean up
    this.activeSessions.delete(sessionId);
  }

  /**
   * Get session by ID
   */
  getSession(sessionId: string): ActiveSession | undefined {
    return this.activeSessions.get(sessionId);
  }

  /**
   * Get session status from database
   */
  async getSessionStatus(sessionId: string): Promise<any> {
    const session = await prisma.researchSession.findUnique({
      where: { id: sessionId },
      include: {
        tasks: true,
        entity: {
          select: { id: true, name: true, url: true },
        },
      },
    });

    return session;
  }

  /**
   * Get all active sessions
   */
  getActiveSessions(): ActiveSession[] {
    return Array.from(this.activeSessions.values());
  }

  /**
   * Get category prompt for a specific research category
   */
  getCategoryPrompt(category: ResearchCategory): string {
    const prompts: Record<ResearchCategory, string> = {
      pricing: PRICING_RESEARCH_PROMPT,
      features: FEATURES_RESEARCH_PROMPT,
      company: COMPANY_RESEARCH_PROMPT,
      compliance: COMPLIANCE_RESEARCH_PROMPT,
      integrations: INTEGRATIONS_RESEARCH_PROMPT,
    };
    return prompts[category];
  }
}

// Export singleton instance
export const researchSessionManager = new ResearchSessionManager();
