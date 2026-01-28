# Research Session Manager - Architecture Design

## Overview

The ResearchSessionManager extends the existing ValidationSessionManager pattern to support browser-based deep research workflows. It coordinates multiple AI agents working in sequence or parallel to research an entity across different categories (pricing, features, compliance, etc.), track progress, and aggregate results.

## Key Design Principles

1. **Extend Existing Pattern**: Built on top of ValidationSessionManager architecture
2. **Multi-Agent Coordination**: Spawn child agents for different research tasks
3. **Real-Time Progress**: Stream progress updates via WebSocket to browser UI
4. **Evidence-First**: Capture screenshots before making assertions (per CLAUDE.md)
5. **Fault Tolerant**: Handle agent failures gracefully, allow resume
6. **Queryable State**: Track research progress with structured state

---

## 1. TypeScript Interfaces

### Session State

```typescript
/**
 * Research session configuration
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
 * Research categories aligned with extraction schema types
 */
export type ResearchCategory =
  | 'pricing'
  | 'features'
  | 'company'
  | 'compliance'
  | 'integrations'
  | 'all'; // Research all categories

/**
 * Research task - a single agent working on one category
 */
export interface ResearchTask {
  id: string; // task-{sessionId}-{category}-{timestamp}
  sessionId: string;
  category: ResearchCategory;
  status: TaskStatus;
  agentId?: string; // Agent assigned to this task
  startedAt?: Date;
  completedAt?: Date;
  error?: string;

  // Progress tracking
  progress: TaskProgress;

  // Results
  results?: TaskResults;
}

export type TaskStatus =
  | 'pending'      // Not started
  | 'in_progress'  // Agent working
  | 'completed'    // Successfully finished
  | 'failed'       // Error occurred
  | 'cancelled'    // Manually cancelled
  | 'paused';      // Temporarily paused

/**
 * Task progress details
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
  | 'initializing'       // Setting up task
  | 'fetching_urls'      // Fetching web pages
  | 'capturing_evidence' // Taking screenshots
  | 'analyzing_content'  // Claude analyzing content
  | 'creating_assertions' // Recording findings
  | 'validating_data'    // Checking data quality
  | 'finalizing';        // Cleanup and summary

/**
 * Task results - what the agent found
 */
export interface TaskResults {
  category: ResearchCategory;
  extractionId?: string; // ID of created Extraction record
  assertionIds: string[]; // IDs of created Assertions
  screenshotPaths: string[]; // Paths to captured screenshots
  sourcesFound: number;
  dataQuality: 'high' | 'medium' | 'low' | 'insufficient';
  summary: string; // Brief summary of findings
}

/**
 * Complete research session
 */
export interface ResearchSession {
  id: string;
  entityId: string;
  entityName: string;
  projectId: string;
  researcherName: string;

  // Session lifecycle
  status: SessionStatus;
  createdAt: Date;
  startedAt?: Date;
  completedAt?: Date;
  pausedAt?: Date;

  // Configuration
  config: ResearchSessionConfig;

  // Task management
  tasks: Map<string, ResearchTask>; // taskId -> task

  // Agent coordination
  query: Query; // Main coordinator query
  childAgents: Map<string, Query>; // agentId -> agent query

  // Progress tracking
  overallProgress: SessionProgress;

  // Communication
  inputQueue: SDKUserMessage[]; // Messages to coordinator

  // State
  isActive: boolean;
  isPaused: boolean;
}

export type SessionStatus =
  | 'initializing'  // Setting up
  | 'planning'      // Determining research plan
  | 'researching'   // Active research
  | 'paused'        // Temporarily paused
  | 'completed'     // All tasks finished
  | 'failed'        // Unrecoverable error
  | 'cancelled';    // Manually cancelled

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

  // Aggregate metrics
  totalAssertions: number;
  totalEvidence: number;
  totalScreenshots: number;

  // Estimated completion
  estimatedMinutesRemaining?: number;
}
```

---

## 2. ResearchSessionManager Class

```typescript
/**
 * Manages browser-based deep research sessions with multi-agent coordination
 *
 * Extends the ValidationSessionManager pattern to support:
 * - Multiple child agents researching different categories
 * - Real-time progress tracking and updates
 * - Task-based research with pause/resume
 * - Evidence-first research protocol
 */
export class ResearchSessionManager {
  private sessions: Map<string, ResearchSession> = new Map();
  private sessionCounter = 0;

  /**
   * Create a new research session for an entity
   *
   * @param config Session configuration
   * @returns Created session with initial state
   */
  async createSession(config: ResearchSessionConfig): Promise<ResearchSession> {
    const sessionId = `research-${Date.now()}-${++this.sessionCounter}`;

    // Validate entity exists
    const entity = await tools.getEntity(config.entityId);
    if (!entity) {
      throw new Error(`Entity ${config.entityId} not found`);
    }

    // Create MCP server with research tools
    const researchMcp = createResearchMcpServer();

    // Build initial coordinator prompt
    const initialPrompt = this.buildCoordinatorPrompt(config);

    // Create input queue for streaming messages
    const inputQueue: SDKUserMessage[] = [];

    // Create coordinator query - manages child agents
    const coordinatorQuery = query({
      prompt: this.createInputStream(sessionId, initialPrompt, inputQueue),
      options: {
        systemPrompt: RESEARCH_COORDINATOR_SYSTEM_PROMPT,
        mcpServers: {
          research: researchMcp,
        },
        allowedTools: [
          // Task management
          'mcp__research__create_task',
          'mcp__research__get_task_status',
          'mcp__research__update_task_progress',
          'mcp__research__spawn_child_agent',

          // Entity research
          'mcp__research__fetch_url',
          'mcp__research__capture_screenshot',
          'mcp__research__create_assertion',
          'mcp__research__save_extraction',

          // Progress reporting
          'mcp__research__report_progress',
          'mcp__research__report_completion',
        ],
        model: config.model || 'claude-sonnet-4-20250514',
        permissionMode: 'acceptEdits',
        includePartialMessages: true,
        cwd: process.cwd(),
      },
    });

    // Determine research plan - which categories to research
    const categories = config.categories || ['all'];
    const tasks = this.createTaskPlan(sessionId, categories);

    // Create session object
    const session: ResearchSession = {
      id: sessionId,
      entityId: config.entityId,
      entityName: config.entityName,
      projectId: config.projectId,
      researcherName: config.researcherName,
      status: 'initializing',
      createdAt: new Date(),
      config,
      tasks,
      query: coordinatorQuery,
      childAgents: new Map(),
      overallProgress: {
        totalTasks: tasks.size,
        completedTasks: 0,
        failedTasks: 0,
        inProgressTasks: 0,
        pendingTasks: tasks.size,
        percentComplete: 0,
        totalAssertions: 0,
        totalEvidence: 0,
        totalScreenshots: 0,
      },
      inputQueue,
      isActive: true,
      isPaused: false,
    };

    this.sessions.set(sessionId, session);
    return session;
  }

  /**
   * Start the research session - coordinator begins work
   *
   * @param sessionId Session to start
   */
  async startSession(sessionId: string): Promise<void> {
    const session = this.sessions.get(sessionId);
    if (!session) {
      throw new Error(`Session ${sessionId} not found`);
    }

    session.status = 'planning';
    session.startedAt = new Date();

    // The coordinator query will start streaming when we begin consuming it
    // This is handled by streamResponses() in the WebSocket handler
  }

  /**
   * Spawn a child agent for a specific research task
   *
   * @param sessionId Parent session
   * @param taskId Task to work on
   * @returns Agent ID
   */
  async spawnChildAgent(
    sessionId: string,
    taskId: string
  ): Promise<string> {
    const session = this.sessions.get(sessionId);
    if (!session) {
      throw new Error(`Session ${sessionId} not found`);
    }

    const task = session.tasks.get(taskId);
    if (!task) {
      throw new Error(`Task ${taskId} not found`);
    }

    const agentId = `agent-${sessionId}-${task.category}-${Date.now()}`;

    // Create specialized MCP server for this category
    const categoryMcp = createCategoryMcpServer(task.category);

    // Build agent-specific prompt
    const agentPrompt = this.buildAgentPrompt(session, task);

    // Create child agent query
    const agentQuery = query({
      prompt: async function* () {
        yield {
          type: 'user',
          message: { role: 'user', content: agentPrompt },
          parent_tool_use_id: null,
          session_id: agentId,
        };
      }(),
      options: {
        systemPrompt: this.getAgentSystemPrompt(task.category),
        mcpServers: {
          research: categoryMcp,
        },
        allowedTools: this.getAgentTools(task.category),
        model: session.config.model || 'claude-sonnet-4-20250514',
        permissionMode: 'acceptEdits',
        includePartialMessages: true,
        cwd: process.cwd(),
      },
    });

    // Register agent
    session.childAgents.set(agentId, agentQuery);
    task.agentId = agentId;
    task.status = 'in_progress';
    task.startedAt = new Date();

    return agentId;
  }

  /**
   * Send a message to the coordinator agent
   *
   * @param sessionId Session to message
   * @param content Message content
   * @param images Optional images (screenshots)
   */
  sendMessage(
    sessionId: string,
    content: string,
    images?: Array<{ base64: string; mediaType: string }>
  ): void {
    const session = this.sessions.get(sessionId);
    if (!session || !session.isActive) {
      throw new Error(`Session ${sessionId} not found or inactive`);
    }

    // Build multimodal content if images provided
    let messageContent: any;
    if (images && images.length > 0) {
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
    } else {
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
   * Update task progress (called by agents via MCP tools)
   *
   * @param sessionId Session containing task
   * @param taskId Task to update
   * @param progress Progress update
   */
  async updateTaskProgress(
    sessionId: string,
    taskId: string,
    progress: Partial<TaskProgress>
  ): Promise<void> {
    const session = this.sessions.get(sessionId);
    if (!session) return;

    const task = session.tasks.get(taskId);
    if (!task) return;

    // Update task progress
    task.progress = {
      ...task.progress,
      ...progress,
    };

    // Recalculate overall progress
    this.recalculateProgress(session);
  }

  /**
   * Mark task as completed
   *
   * @param sessionId Session containing task
   * @param taskId Task to complete
   * @param results Task results
   */
  async completeTask(
    sessionId: string,
    taskId: string,
    results: TaskResults
  ): Promise<void> {
    const session = this.sessions.get(sessionId);
    if (!session) return;

    const task = session.tasks.get(taskId);
    if (!task) return;

    task.status = 'completed';
    task.completedAt = new Date();
    task.results = results;
    task.progress.percentComplete = 100;

    // Cleanup child agent
    if (task.agentId) {
      session.childAgents.delete(task.agentId);
    }

    // Recalculate overall progress
    this.recalculateProgress(session);

    // Check if all tasks completed
    const allCompleted = Array.from(session.tasks.values()).every(
      t => t.status === 'completed' || t.status === 'failed'
    );

    if (allCompleted) {
      session.status = 'completed';
      session.completedAt = new Date();
    }
  }

  /**
   * Mark task as failed
   *
   * @param sessionId Session containing task
   * @param taskId Task that failed
   * @param error Error message
   */
  async failTask(
    sessionId: string,
    taskId: string,
    error: string
  ): Promise<void> {
    const session = this.sessions.get(sessionId);
    if (!session) return;

    const task = session.tasks.get(taskId);
    if (!task) return;

    task.status = 'failed';
    task.error = error;

    // Cleanup child agent
    if (task.agentId) {
      session.childAgents.delete(task.agentId);
    }

    // Recalculate progress
    this.recalculateProgress(session);
  }

  /**
   * Pause the session - stop all agents
   *
   * @param sessionId Session to pause
   */
  async pauseSession(sessionId: string): Promise<void> {
    const session = this.sessions.get(sessionId);
    if (!session) return;

    session.isPaused = true;
    session.pausedAt = new Date();
    session.status = 'paused';

    // Interrupt coordinator
    await session.query.interrupt();

    // Interrupt all child agents
    for (const [agentId, agentQuery] of session.childAgents.entries()) {
      await agentQuery.interrupt();
    }
  }

  /**
   * Resume a paused session
   *
   * @param sessionId Session to resume
   */
  async resumeSession(sessionId: string): Promise<void> {
    const session = this.sessions.get(sessionId);
    if (!session || !session.isPaused) return;

    session.isPaused = false;
    session.status = 'researching';

    // Send resume message to coordinator
    this.sendMessage(sessionId, '[RESUME] Continue research from where we paused.');
  }

  /**
   * Cancel the session - stop and cleanup
   *
   * @param sessionId Session to cancel
   */
  async cancelSession(sessionId: string): Promise<void> {
    const session = this.sessions.get(sessionId);
    if (!session) return;

    session.status = 'cancelled';
    session.isActive = false;

    // Interrupt all agents
    await session.query.interrupt();
    for (const agentQuery of session.childAgents.values()) {
      await agentQuery.interrupt();
    }

    // Mark all in-progress tasks as cancelled
    for (const task of session.tasks.values()) {
      if (task.status === 'in_progress' || task.status === 'pending') {
        task.status = 'cancelled';
      }
    }
  }

  /**
   * Get session by ID
   */
  getSession(sessionId: string): ResearchSession | undefined {
    return this.sessions.get(sessionId);
  }

  /**
   * Get all active sessions
   */
  getActiveSessions(): ResearchSession[] {
    return Array.from(this.sessions.values()).filter(s => s.isActive);
  }

  /**
   * Close and cleanup a session
   */
  closeSession(sessionId: string): void {
    const session = this.sessions.get(sessionId);
    if (session) {
      session.isActive = false;
      this.sessions.delete(sessionId);
    }
  }

  // ============================================
  // Private Helper Methods
  // ============================================

  /**
   * Create task plan based on research categories
   */
  private createTaskPlan(
    sessionId: string,
    categories: ResearchCategory[]
  ): Map<string, ResearchTask> {
    const tasks = new Map<string, ResearchTask>();

    const categoriesToResearch = categories.includes('all')
      ? ['pricing', 'features', 'company', 'compliance', 'integrations']
      : categories;

    for (const category of categoriesToResearch) {
      const taskId = `task-${sessionId}-${category}`;
      tasks.set(taskId, {
        id: taskId,
        sessionId,
        category: category as ResearchCategory,
        status: 'pending',
        progress: {
          stage: 'initializing',
          stageDescription: 'Task queued',
          percentComplete: 0,
          urlsFetched: 0,
          screenshotsCaptured: 0,
          assertionsCreated: 0,
          evidenceCollected: 0,
        },
      });
    }

    return tasks;
  }

  /**
   * Build coordinator prompt
   */
  private buildCoordinatorPrompt(config: ResearchSessionConfig): string {
    return `Research session started for entity: ${config.entityName}
Entity URL: ${config.entityUrl}
Researcher: ${config.researcherName}

Your role is to coordinate research across these categories: ${config.categories?.join(', ') || 'all'}

Follow the Evidence-First Research Protocol:
1. Fetch URLs using extract:fetch (captures screenshot)
2. Analyze screenshot visually to extract data
3. Create assertions with evidenceDescription referencing screenshot
4. Save structured extractions with extract:save

For each category, spawn a child agent to research that specific area.
Track progress and report completion when all categories are researched.`;
  }

  /**
   * Build agent-specific prompt for category research
   */
  private buildAgentPrompt(
    session: ResearchSession,
    task: ResearchTask
  ): string {
    return `Research ${task.category} for ${session.entityName}
Entity URL: ${session.config.entityUrl}

Follow the Evidence-First Protocol:
1. Fetch the relevant page (e.g., /pricing, /features)
2. Capture screenshot as evidence FIRST
3. Analyze screenshot visually
4. Extract structured data
5. Create assertions with evidenceDescription
6. Save extraction

Report progress at each stage using update_task_progress.
When complete, call report_task_completion with results.`;
  }

  /**
   * Get system prompt for category agent
   */
  private getAgentSystemPrompt(category: ResearchCategory): string {
    // Category-specific prompts defined in prompts.ts
    const prompts: Record<ResearchCategory, string> = {
      pricing: PRICING_RESEARCH_PROMPT,
      features: FEATURES_RESEARCH_PROMPT,
      company: COMPANY_RESEARCH_PROMPT,
      compliance: COMPLIANCE_RESEARCH_PROMPT,
      integrations: INTEGRATIONS_RESEARCH_PROMPT,
      all: RESEARCH_COORDINATOR_SYSTEM_PROMPT,
    };
    return prompts[category];
  }

  /**
   * Get tools allowed for category agent
   */
  private getAgentTools(category: ResearchCategory): string[] {
    return [
      // URL fetching and evidence capture
      'mcp__research__fetch_url',
      'mcp__research__capture_screenshot',
      'mcp__research__get_cached_content',

      // Data extraction and storage
      'mcp__research__save_extraction',
      'mcp__research__create_assertion',

      // Progress reporting
      'mcp__research__update_task_progress',
      'mcp__research__report_task_completion',
    ];
  }

  /**
   * Create async input stream for coordinator
   */
  private async* createInputStream(
    sessionId: string,
    initialPrompt: string,
    inputQueue: SDKUserMessage[]
  ): AsyncGenerator<SDKUserMessage> {
    // First message
    yield {
      type: 'user',
      message: { role: 'user', content: initialPrompt },
      parent_tool_use_id: null,
      session_id: sessionId,
    };

    // Then stream from queue
    while (true) {
      if (inputQueue.length > 0) {
        yield inputQueue.shift()!;
      } else {
        await new Promise((resolve) => setTimeout(resolve, 100));
      }
    }
  }

  /**
   * Recalculate overall session progress from tasks
   */
  private recalculateProgress(session: ResearchSession): void {
    const tasks = Array.from(session.tasks.values());

    session.overallProgress.totalTasks = tasks.length;
    session.overallProgress.completedTasks = tasks.filter(t => t.status === 'completed').length;
    session.overallProgress.failedTasks = tasks.filter(t => t.status === 'failed').length;
    session.overallProgress.inProgressTasks = tasks.filter(t => t.status === 'in_progress').length;
    session.overallProgress.pendingTasks = tasks.filter(t => t.status === 'pending').length;

    // Calculate percent complete
    const totalProgress = tasks.reduce((sum, t) => sum + t.progress.percentComplete, 0);
    session.overallProgress.percentComplete = tasks.length > 0
      ? Math.round(totalProgress / tasks.length)
      : 0;

    // Aggregate metrics
    session.overallProgress.totalAssertions = tasks.reduce(
      (sum, t) => sum + (t.results?.assertionIds?.length || 0),
      0
    );
    session.overallProgress.totalScreenshots = tasks.reduce(
      (sum, t) => sum + (t.results?.screenshotPaths?.length || 0),
      0
    );
    session.overallProgress.totalEvidence = tasks.reduce(
      (sum, t) => sum + (t.results?.sourcesFound || 0),
      0
    );

    // Estimate time remaining (rough heuristic: 2-5 min per task)
    const remainingTasks = session.overallProgress.pendingTasks + session.overallProgress.inProgressTasks;
    session.overallProgress.estimatedMinutesRemaining = remainingTasks * 3;
  }
}

// Export singleton instance
export const researchSessionManager = new ResearchSessionManager();
```

---

## 3. WebSocket Message Types

```typescript
/**
 * Incoming messages from browser client
 */
export type ResearchWsIncomingMessage =
  | {
      type: 'start_research';
      entityId: string;
      entityName: string;
      entityUrl: string;
      projectId: string;
      researcherName: string;
      categories?: ResearchCategory[];
      mode?: 'sequential' | 'parallel';
    }
  | { type: 'user_message'; content: string; images?: Array<{ base64: string; mediaType: string }> }
  | { type: 'pause_session' }
  | { type: 'resume_session' }
  | { type: 'cancel_session' }
  | { type: 'retry_task'; taskId: string }
  | { type: 'ping' };

/**
 * Outgoing messages to browser client
 */
export type ResearchWsOutgoingMessage =
  // Session lifecycle
  | { type: 'session_started'; sessionId: string; taskCount: number }
  | { type: 'session_paused' }
  | { type: 'session_resumed' }
  | { type: 'session_completed'; results: SessionSummary }
  | { type: 'session_failed'; error: string }

  // Task lifecycle
  | { type: 'task_started'; taskId: string; category: ResearchCategory }
  | { type: 'task_progress'; taskId: string; progress: TaskProgress }
  | { type: 'task_completed'; taskId: string; results: TaskResults }
  | { type: 'task_failed'; taskId: string; error: string }

  // Progress updates
  | { type: 'overall_progress'; progress: SessionProgress }

  // Evidence collection notifications
  | { type: 'screenshot_captured'; taskId: string; path: string; url: string }
  | { type: 'extraction_saved'; taskId: string; extractionId: string; category: string }
  | { type: 'assertion_created'; taskId: string; assertionId: string; claim: string }

  // Agent messages
  | { type: 'agent_message'; agentId: string; category: ResearchCategory; content: string }
  | { type: 'agent_thinking'; agentId: string; stage: TaskStage }

  // Coordinator messages
  | { type: 'coordinator_message'; content: string }
  | { type: 'coordinator_chunk'; text: string }

  // Errors
  | { type: 'error'; message: string }
  | { type: 'pong' };

/**
 * Session completion summary
 */
export interface SessionSummary {
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
```

---

## 4. API Endpoints

```typescript
/**
 * REST API routes for research session management
 */

// Start a new research session
POST /api/research/sessions
Body: {
  entityId: string;
  categories?: ResearchCategory[];
  mode?: 'sequential' | 'parallel';
}
Response: {
  success: boolean;
  data: {
    sessionId: string;
    status: SessionStatus;
    tasks: ResearchTask[];
  }
}

// Get session status
GET /api/research/sessions/:sessionId
Response: {
  success: boolean;
  data: {
    session: ResearchSession;
    progress: SessionProgress;
    tasks: ResearchTask[];
  }
}

// Get session progress
GET /api/research/sessions/:sessionId/progress
Response: {
  success: boolean;
  data: SessionProgress;
}

// Get task details
GET /api/research/sessions/:sessionId/tasks/:taskId
Response: {
  success: boolean;
  data: ResearchTask;
}

// Pause session
POST /api/research/sessions/:sessionId/pause
Response: {
  success: boolean;
  data: { status: SessionStatus }
}

// Resume session
POST /api/research/sessions/:sessionId/resume
Response: {
  success: boolean;
  data: { status: SessionStatus }
}

// Cancel session
POST /api/research/sessions/:sessionId/cancel
Response: {
  success: boolean;
  data: { status: SessionStatus }
}

// Retry failed task
POST /api/research/sessions/:sessionId/tasks/:taskId/retry
Response: {
  success: boolean;
  data: ResearchTask;
}

// Get session summary
GET /api/research/sessions/:sessionId/summary
Response: {
  success: boolean;
  data: SessionSummary;
}

// List active sessions
GET /api/research/sessions
Query: ?projectId=<id>
Response: {
  success: boolean;
  data: {
    sessions: ResearchSession[];
  }
}
```

---

## 5. MCP Tools for Research Agents

```typescript
/**
 * MCP tools exposed to research agents
 */

// Task management
create_task(sessionId: string, category: ResearchCategory): TaskId
get_task_status(taskId: string): TaskStatus
update_task_progress(taskId: string, progress: Partial<TaskProgress>): void
spawn_child_agent(sessionId: string, taskId: string): AgentId

// URL fetching and evidence capture
fetch_url(url: string, entityId: string): { cacheId, screenshotPath, contentPreview }
capture_screenshot(url: string, filename?: string): { path, url }
get_cached_content(cacheId: string): { markdown, html, text }

// Data extraction and storage
save_extraction(args: SaveExtractionArgs): { extractionId, assertionIds }
create_assertion(args: CreateAssertionArgs): { assertionId }

// Progress reporting
report_progress(taskId: string, progress: TaskProgress): void
report_task_completion(taskId: string, results: TaskResults): void
report_task_failure(taskId: string, error: string): void

/**
 * Tool argument types
 */
interface SaveExtractionArgs {
  entityId: string;
  schemaType: 'pricing' | 'features' | 'company' | 'compliance' | 'integrations';
  url: string;
  screenshotPath: string;
  data: Record<string, any>; // Schema-specific structured data
}

interface CreateAssertionArgs {
  entityId: string;
  claim: string;
  category: string;
  evidenceDescription: string; // Required: what on screenshot supports claim
  evidenceScreenshotPath: string; // Required: screenshot path
  evidenceChain?: Array<{ screenshotPath: string; description: string }>;
  sourceUrl?: string;
  reasoning?: string;
}
```

---

## 6. Integration with Existing MCP Tools

The ResearchSessionManager integrates with existing CLI tools:

```typescript
/**
 * Existing tools used by research agents
 */

// From existing tools.ts
import {
  getEntity,
  createAssertion,
  getProject,
  prisma,
} from '../../tools';

// From extraction commands
import {
  extractFetch,      // Fetch URL + screenshot
  extractSave,       // Save structured extraction
  extractCache,      // Get cached content
} from '../../tools/extraction';

// These CLI tools are wrapped as MCP tools for agent access
function createResearchMcpServer() {
  return createSdkMcpServer({
    tools: [
      // Wrap CLI tools as MCP tools
      fetchUrlTool,           // Wraps extract:fetch
      captureScreenshotTool,  // Wraps screenshot capture
      saveExtractionTool,     // Wraps extract:save
      createAssertionTool,    // Wraps assertion:create
      getCachedContentTool,   // Wraps extract:cache

      // Task management tools (new)
      createTaskTool,
      updateTaskProgressTool,
      reportCompletionTool,
      spawnChildAgentTool,
    ],
  });
}
```

---

## 7. System Prompts

```typescript
/**
 * System prompts for research agents (in prompts.ts)
 */

export const RESEARCH_COORDINATOR_SYSTEM_PROMPT = `You are a research coordinator managing deep research on an entity.

Your responsibilities:
1. Plan research across multiple categories (pricing, features, company, compliance, integrations)
2. Spawn child agents to research each category
3. Track progress across all agents
4. Aggregate results into cohesive entity profile
5. Report completion when all research is done

Follow the Evidence-First Protocol:
- Screenshots are PRIMARY evidence
- Always capture screenshot BEFORE making assertions
- Reference specific screenshot content in evidenceDescription

Coordinate agents efficiently:
- Spawn agents for different categories
- Monitor their progress
- Handle failures gracefully
- Report overall progress to UI`;

export const PRICING_RESEARCH_PROMPT = `You are a pricing research specialist.

Your task:
1. Find the pricing page (usually /pricing, /plans)
2. Fetch URL using extract:fetch (captures screenshot)
3. Analyze screenshot to identify tiers, prices, features
4. Extract structured pricing data
5. Save extraction using extract:save with schemaType: 'pricing'
6. Create assertions for key pricing facts with evidenceDescription

Report progress:
- Stage: fetching_urls, capturing_evidence, analyzing_content, creating_assertions
- Metrics: urlsFetched, screenshotsCaptured, assertionsCreated`;

export const FEATURES_RESEARCH_PROMPT = `You are a features research specialist.

Your task:
1. Find features/capabilities pages
2. Fetch URLs using extract:fetch
3. Analyze screenshots to identify feature categories
4. Extract structured features data
5. Save extraction with schemaType: 'features'
6. Create assertions for notable features

Report progress at each stage.`;

export const COMPANY_RESEARCH_PROMPT = `You are a company info research specialist.

Your task:
1. Find about/company pages
2. Extract: founding year, HQ location, funding, leadership
3. Save extraction with schemaType: 'company'
4. Create assertions for key company facts

Report progress at each stage.`;

export const COMPLIANCE_RESEARCH_PROMPT = `You are a compliance research specialist.

Your task:
1. Find security/compliance pages
2. Extract: SOC2, FedRAMP, certifications, security features
3. Save extraction with schemaType: 'compliance'
4. Create assertions for compliance posture

Report progress at each stage.`;

export const INTEGRATIONS_RESEARCH_PROMPT = `You are an integrations research specialist.

Your task:
1. Find integrations/API pages
2. Extract: APIs, SDKs, native integrations, partnerships
3. Save extraction with schemaType: 'integrations'
4. Create assertions for integration capabilities

Report progress at each stage.`;
```

---

## 8. Usage Example

```typescript
/**
 * Example: Start research session for an entity
 */

// 1. Create session via API
const response = await fetch('/api/research/sessions', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    entityId: 'cm...',
    categories: ['pricing', 'features', 'compliance'],
    mode: 'parallel',
  }),
});

const { sessionId } = await response.json();

// 2. Connect WebSocket
const ws = new WebSocket(`ws://localhost:3000/ws/research`);

// 3. Start session
ws.send(JSON.stringify({
  type: 'start_research',
  entityId: 'cm...',
  entityName: 'Cursor',
  entityUrl: 'https://cursor.com',
  projectId: 'proj...',
  researcherName: 'Christopher',
  categories: ['pricing', 'features', 'compliance'],
}));

// 4. Listen for progress updates
ws.onmessage = (event) => {
  const message = JSON.parse(event.data);

  switch (message.type) {
    case 'session_started':
      console.log(`Research started with ${message.taskCount} tasks`);
      break;

    case 'task_started':
      console.log(`Task started: ${message.category}`);
      break;

    case 'task_progress':
      console.log(`Task ${message.taskId}: ${message.progress.percentComplete}%`);
      console.log(`Stage: ${message.progress.stageDescription}`);
      break;

    case 'screenshot_captured':
      console.log(`Screenshot captured: ${message.path}`);
      break;

    case 'assertion_created':
      console.log(`Assertion created: ${message.claim}`);
      break;

    case 'task_completed':
      console.log(`Task completed: ${message.category}`);
      console.log(`Results: ${JSON.stringify(message.results)}`);
      break;

    case 'overall_progress':
      console.log(`Overall: ${message.progress.percentComplete}% complete`);
      console.log(`${message.progress.completedTasks}/${message.progress.totalTasks} tasks done`);
      break;

    case 'session_completed':
      console.log('Research completed!');
      console.log(`Created ${message.results.totalAssertions} assertions`);
      console.log(`Captured ${message.results.totalScreenshots} screenshots`);
      break;
  }
};

// 5. Pause/resume if needed
setTimeout(() => {
  ws.send(JSON.stringify({ type: 'pause_session' }));

  setTimeout(() => {
    ws.send(JSON.stringify({ type: 'resume_session' }));
  }, 5000);
}, 10000);
```

---

## 9. Database Schema Additions

Add research session tracking to Prisma schema:

```prisma
/// Research session for multi-agent entity investigation
model ResearchSession {
  id            String   @id @default(cuid())
  entityId      String
  projectId     String
  researcherName String

  status        String   // initializing, planning, researching, paused, completed, failed, cancelled

  createdAt     DateTime @default(now())
  startedAt     DateTime?
  completedAt   DateTime?
  pausedAt      DateTime?

  // Configuration
  categories    String[] // Categories researched
  mode          String   // sequential, parallel

  // Progress metrics
  totalTasks    Int      @default(0)
  completedTasks Int     @default(0)
  failedTasks   Int      @default(0)

  totalAssertions   Int @default(0)
  totalScreenshots  Int @default(0)
  totalExtractions  Int @default(0)

  // Session data (JSON)
  config        Json?    // ResearchSessionConfig
  overallProgress Json?  // SessionProgress

  // Relations
  entity        Entity   @relation(fields: [entityId], references: [id], onDelete: Cascade)
  tasks         ResearchTask[]

  @@index([entityId])
  @@index([projectId])
  @@index([status])
  @@map("research_sessions")
}

/// Individual research task within a session
model ResearchTask {
  id          String   @id @default(cuid())
  sessionId   String
  category    String   // pricing, features, company, compliance, integrations

  status      String   // pending, in_progress, completed, failed, cancelled, paused
  agentId     String?  // ID of agent working on this task

  startedAt   DateTime?
  completedAt DateTime?

  error       String?  // Error message if failed

  // Progress (JSON)
  progress    Json?    // TaskProgress
  results     Json?    // TaskResults

  // Relations
  session     ResearchSession @relation(fields: [sessionId], references: [id], onDelete: Cascade)

  @@index([sessionId])
  @@index([status])
  @@index([category])
  @@map("research_tasks")
}
```

---

## 10. Next Steps for Implementation

1. **Create ResearchSessionManager class** (`src/server/agent/research-session.ts`)
2. **Add system prompts** to `src/server/agent/prompts.ts`
3. **Create MCP tools** for research agents (`src/server/agent/research-tools.ts`)
4. **Add WebSocket handler** for research sessions (`src/server/routes/research-websocket.ts`)
5. **Add REST API routes** (`src/server/routes/research-api.ts`)
6. **Update Prisma schema** with ResearchSession and ResearchTask models
7. **Create frontend components** for research UI (progress dashboard, task list, results)

---

## Summary

This design extends the existing ValidationSessionManager pattern to support:

- **Multi-agent coordination** - Coordinator spawns child agents for each research category
- **Task-based workflow** - Each category is a task with status, progress, results
- **Evidence-first protocol** - Screenshots captured before assertions
- **Real-time progress** - WebSocket streams progress updates to browser
- **Pause/resume** - Sessions can be interrupted and resumed
- **Fault tolerance** - Failed tasks can be retried
- **Queryable state** - Full session state accessible via API

The architecture follows the existing patterns (ValidationSession, WebSocket handler, MCP tools) while adding the orchestration layer needed for complex multi-agent research workflows.
