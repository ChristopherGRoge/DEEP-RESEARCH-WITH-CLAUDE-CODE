/**
 * DiscoverySessionManager - Topic-based research discovery
 *
 * Handles DISCOVERY workflow: cast a broad net to find entities matching
 * a research topic, then deep-dive into each discovered entity.
 *
 * Flow:
 * 1. User provides topic (e.g., "AI tools for SDLC with FedRAMP potential")
 * 2. Web search to discover entities matching criteria
 * 3. For each entity: create in database, research each category
 * 4. Report progress in real-time via WebSocket
 */

import { query, SDKUserMessage, Query } from '@anthropic-ai/claude-agent-sdk';
import { prisma } from '../../tools';
import { createDiscoveryMcpServer } from './discovery-tools';
import { DISCOVERY_COORDINATOR_SYSTEM_PROMPT } from './discovery-prompts';
import {
  ResearchSessionStatus,
  ResearchTaskStatus,
  ResearchWorkflow,
} from '../../../generated/prisma/client';
import type { SessionProgress, TaskResults } from './research-session';

// ============================================
// Type Definitions
// ============================================

export interface DiscoverySessionConfig {
  topic: string;
  researcher: string;
  categories: string[];
  mode: 'autonomous' | 'interactive';
  exampleEntities?: string[]; // Example entities to guide discovery
  projectId?: string; // If provided, use existing project
  projectName?: string; // If no projectId, create project with this name
}

export interface DiscoveredEntity {
  name: string;
  url: string;
  description: string;
  entityType: string;
  relevanceScore: number;
  matchedCriteria: string[];
}

export interface DiscoveryProgress extends SessionProgress {
  phase: 'initializing' | 'discovering' | 'researching' | 'completing';
  entitiesDiscovered: number;
  entitiesResearched: number;
  currentEntity?: string;
}

export interface ActiveDiscoverySession {
  id: string;
  config: DiscoverySessionConfig;
  projectId: string;
  status: ResearchSessionStatus;
  startedAt?: Date;
  pausedAt?: Date;

  // Active query
  coordinatorQuery?: Query;

  // Input queue for streaming messages
  inputQueue: SDKUserMessage[];

  // Progress tracking
  progress: DiscoveryProgress;
  discoveredEntities: DiscoveredEntity[];

  // Callbacks for WebSocket notifications
  onProgress?: (progress: DiscoveryProgress) => void;
  onTaskUpdate?: (taskId: string, update: any) => void;
  onMessage?: (message: any) => void;
  onComplete?: (summary: DiscoverySummary) => void;
  onError?: (error: Error) => void;
}

export interface DiscoverySummary {
  sessionId: string;
  projectId: string;
  topic: string;
  entitiesDiscovered: number;
  entitiesResearched: number;
  totalAssertions: number;
  totalScreenshots: number;
  totalExtractions: number;
  durationSeconds: number;
  entities: Array<{
    id: string;
    name: string;
    assertionCount: number;
  }>;
}

// ============================================
// DiscoverySessionManager Class
// ============================================

export class DiscoverySessionManager {
  private activeSessions: Map<string, ActiveDiscoverySession> = new Map();

  /**
   * Create a new discovery session for a research topic
   */
  async createSession(config: DiscoverySessionConfig): Promise<{
    sessionId: string;
    projectId: string;
    tasks: any[];
  }> {
    // Get or create project
    let projectId = config.projectId;

    if (!projectId) {
      // Create project from topic
      const projectName = config.projectName || `Discovery: ${config.topic.slice(0, 50)}`;

      // Check if project exists
      let project = await prisma.researchProject.findFirst({
        where: { name: projectName },
      });

      if (!project) {
        project = await prisma.researchProject.create({
          data: {
            name: projectName,
            description: config.topic,
            workflow: ResearchWorkflow.DISCOVERY,
          },
        });
      }

      projectId = project.id;
    }

    // Generate session ID
    const sessionId = `discovery-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    // Create tasks for each category
    const tasks = config.categories.map((category, index) => ({
      taskId: `task-${index + 1}`,
      category,
      status: 'pending' as const,
      progress: 0,
    }));

    // Create active session in memory
    const activeSession: ActiveDiscoverySession = {
      id: sessionId,
      config,
      projectId,
      status: ResearchSessionStatus.INITIALIZING,
      inputQueue: [],
      discoveredEntities: [],
      progress: {
        phase: 'initializing',
        totalTasks: tasks.length,
        completedTasks: 0,
        failedTasks: 0,
        inProgressTasks: 0,
        pendingTasks: tasks.length,
        percentComplete: 0,
        totalAssertions: 0,
        totalEvidence: 0,
        totalScreenshots: 0,
        entitiesDiscovered: 0,
        entitiesResearched: 0,
      },
    };

    this.activeSessions.set(sessionId, activeSession);

    // Log start
    await prisma.researchLog.create({
      data: {
        action: 'discovery_session_created',
        details: {
          sessionId,
          topic: config.topic,
          researcher: config.researcher,
          categories: config.categories,
        },
        agentId: `discovery-${sessionId}`,
      },
    });

    return {
      sessionId,
      projectId,
      tasks,
    };
  }

  /**
   * Start the discovery session - launches coordinator agent
   */
  async startSession(
    sessionId: string,
    callbacks?: {
      onProgress?: (progress: DiscoveryProgress) => void;
      onTaskUpdate?: (taskId: string, update: any) => void;
      onMessage?: (message: any) => void;
      onComplete?: (summary: DiscoverySummary) => void;
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

    // Build initial prompt
    const initialPrompt = this.buildInitialPrompt(session);

    // Create MCP server with discovery tools
    const mcpServer = createDiscoveryMcpServer(sessionId, this);

    // Create coordinator query
    try {
      const coordinatorQuery = query({
        prompt: this.createInputStream(sessionId, initialPrompt),
        options: {
          systemPrompt: DISCOVERY_COORDINATOR_SYSTEM_PROMPT,
          mcpServers: {
            discovery: mcpServer,
          },
          model: 'claude-sonnet-4-20250514',
          permissionMode: 'bypassPermissions',
          includePartialMessages: true,
          cwd: process.cwd(),
        },
      });

      session.coordinatorQuery = coordinatorQuery;

      // Stream responses
      await this.streamResponses(session, coordinatorQuery);
    } catch (error) {
      session.status = ResearchSessionStatus.FAILED;

      if (session.onError) {
        session.onError(error as Error);
      }
      throw error;
    }
  }

  /**
   * Stream responses from coordinator agent
   */
  private async streamResponses(
    session: ActiveDiscoverySession,
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
      }

      // Session completed
      if (session.status !== ResearchSessionStatus.CANCELLED) {
        await this.completeSession(session.id);
      }
    } catch (error) {
      console.error('Discovery coordinator error:', error);
      session.status = ResearchSessionStatus.FAILED;

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
    while (
      session.status === ResearchSessionStatus.RESEARCHING ||
      session.status === ResearchSessionStatus.PLANNING
    ) {
      if (session.inputQueue.length > 0) {
        yield session.inputQueue.shift()!;
      } else {
        await new Promise((resolve) => setTimeout(resolve, 100));
      }
    }
  }

  /**
   * Build initial prompt for discovery coordinator
   */
  private buildInitialPrompt(session: ActiveDiscoverySession): string {
    const exampleSection = session.config.exampleEntities?.length
      ? `
EXAMPLE ENTITIES (TARGET PROFILE):
${session.config.exampleEntities.join(', ')}

CRITICAL: These examples define the TARGET PROFILE for your discovery.
- Study these entities to understand what KIND of tools/products the researcher wants
- Prioritize discovering entities SIMILAR IN NATURE to these examples
- Start by researching the example entities themselves
- Then find more entities that match the same profile
`
      : '';

    return `Discovery research session started.

RESEARCH TOPIC:
${session.config.topic}
${exampleSection}
RESEARCHER: ${session.config.researcher}
PROJECT ID: ${session.projectId}
MODE: ${session.config.mode}

CATEGORIES TO RESEARCH FOR EACH ENTITY:
${session.config.categories.join(', ')}

YOUR MISSION:
1. DISCOVERY PHASE: Search the web to find entities (tools, products, services) matching the research topic
   - Look for tools/products that match the criteria in the topic${session.config.exampleEntities?.length ? '\n   - Use the example entities as your primary guide for what to discover' : ''}
   - Focus on finding at least 5-10 relevant entities
   - Prioritize vendor documentation and official sources
   - Note FedRAMP status, air-gapped capabilities, standalone deployment options

2. RESEARCH PHASE: For each discovered entity:
   - Create the entity in the database using create_entity
   - Research each category (${session.config.categories.join(', ')}) using evidence-first protocol
   - Capture screenshots before making assertions
   - Save extractions with structured data

3. COMPLETION: Generate summary of findings

${session.config.exampleEntities?.length
  ? `Start by creating and researching the example entities: ${session.config.exampleEntities.join(', ')}
Then discover more entities that match the same profile.`
  : `Start by searching for entities matching: "${session.config.topic}"`}

Use the web_search tool to begin discovery.`;
  }

  /**
   * Send a message to the coordinator
   */
  sendMessage(sessionId: string, content: string): void {
    const session = this.activeSessions.get(sessionId);
    if (!session) {
      throw new Error(`Session ${sessionId} not found`);
    }

    session.inputQueue.push({
      type: 'user',
      message: { role: 'user', content },
      parent_tool_use_id: null,
      session_id: sessionId,
    });
  }

  /**
   * Update session progress
   */
  updateProgress(sessionId: string, progress: Partial<DiscoveryProgress>): void {
    const session = this.activeSessions.get(sessionId);
    if (!session) return;

    session.progress = { ...session.progress, ...progress };

    if (session.onProgress) {
      session.onProgress(session.progress);
    }
  }

  /**
   * Add a discovered entity
   */
  addDiscoveredEntity(sessionId: string, entity: DiscoveredEntity): void {
    const session = this.activeSessions.get(sessionId);
    if (!session) return;

    session.discoveredEntities.push(entity);
    session.progress.entitiesDiscovered = session.discoveredEntities.length;

    if (session.onProgress) {
      session.onProgress(session.progress);
    }
  }

  /**
   * Notify task update
   */
  notifyTaskUpdate(sessionId: string, taskId: string, update: any): void {
    const session = this.activeSessions.get(sessionId);
    if (!session?.onTaskUpdate) return;

    session.onTaskUpdate(taskId, update);
  }

  /**
   * Notify message
   */
  notifyMessage(sessionId: string, message: any): void {
    const session = this.activeSessions.get(sessionId);
    if (!session?.onMessage) return;

    session.onMessage(message);
  }

  /**
   * Complete the session
   */
  private async completeSession(sessionId: string): Promise<void> {
    const session = this.activeSessions.get(sessionId);
    if (!session) return;

    session.status = ResearchSessionStatus.COMPLETED;
    const completedAt = new Date();
    const durationSeconds = session.startedAt
      ? Math.round((completedAt.getTime() - session.startedAt.getTime()) / 1000)
      : 0;

    // Get entity counts from database
    const entities = await prisma.entity.findMany({
      where: { projectId: session.projectId },
      include: {
        _count: {
          select: { assertions: true },
        },
      },
    });

    // Calculate totals
    let totalAssertions = 0;
    let totalExtractions = 0;
    let totalScreenshots = 0;

    for (const entity of entities) {
      totalAssertions += entity._count.assertions;
    }

    const extractionCount = await prisma.extraction.count({
      where: {
        entity: { projectId: session.projectId },
      },
    });
    totalExtractions = extractionCount;

    // Build summary
    const summary: DiscoverySummary = {
      sessionId,
      projectId: session.projectId,
      topic: session.config.topic,
      entitiesDiscovered: session.discoveredEntities.length,
      entitiesResearched: entities.length,
      totalAssertions,
      totalScreenshots,
      totalExtractions,
      durationSeconds,
      entities: entities.map((e) => ({
        id: e.id,
        name: e.name,
        assertionCount: e._count.assertions,
      })),
    };

    // Log completion
    await prisma.researchLog.create({
      data: {
        action: 'discovery_session_completed',
        details: summary as any,
        agentId: `discovery-${sessionId}`,
      },
    });

    // Notify completion
    if (session.onComplete) {
      session.onComplete(summary);
    }

    // Clean up
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

    if (session.coordinatorQuery) {
      await session.coordinatorQuery.interrupt();
    }
  }

  /**
   * Resume a paused session
   */
  async resumeSession(sessionId: string): Promise<void> {
    const session = this.activeSessions.get(sessionId);
    if (!session || session.status !== ResearchSessionStatus.PAUSED) return;

    session.status = ResearchSessionStatus.RESEARCHING;
    this.sendMessage(sessionId, '[RESUME] Continue discovery research from where we paused.');
  }

  /**
   * Cancel the session
   */
  async cancelSession(sessionId: string): Promise<void> {
    const session = this.activeSessions.get(sessionId);
    if (!session) return;

    session.status = ResearchSessionStatus.CANCELLED;

    if (session.coordinatorQuery) {
      await session.coordinatorQuery.interrupt();
    }

    // Log cancellation
    await prisma.researchLog.create({
      data: {
        action: 'discovery_session_cancelled',
        details: {
          sessionId,
          entitiesDiscovered: session.discoveredEntities.length,
        },
        agentId: `discovery-${sessionId}`,
      },
    });

    // Clean up
    this.activeSessions.delete(sessionId);
  }

  /**
   * Get session by ID
   */
  getSession(sessionId: string): ActiveDiscoverySession | undefined {
    return this.activeSessions.get(sessionId);
  }

  /**
   * Get session status
   */
  async getSessionStatus(sessionId: string): Promise<any> {
    const session = this.activeSessions.get(sessionId);
    if (!session) return null;

    return {
      id: session.id,
      status: session.status,
      progress: session.progress,
      discoveredEntities: session.discoveredEntities,
      projectId: session.projectId,
    };
  }
}

// Export singleton instance
export const discoverySessionManager = new DiscoverySessionManager();
