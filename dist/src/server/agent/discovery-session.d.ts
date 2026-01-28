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
import { SDKUserMessage, Query } from '@anthropic-ai/claude-agent-sdk';
import { ResearchSessionStatus } from '../../../generated/prisma/client';
import type { SessionProgress } from './research-session';
export interface DiscoverySessionConfig {
    topic: string;
    researcher: string;
    categories: string[];
    mode: 'autonomous' | 'interactive';
    exampleEntities?: string[];
    projectId?: string;
    projectName?: string;
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
    coordinatorQuery?: Query;
    inputQueue: SDKUserMessage[];
    progress: DiscoveryProgress;
    discoveredEntities: DiscoveredEntity[];
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
export declare class DiscoverySessionManager {
    private activeSessions;
    /**
     * Create a new discovery session for a research topic
     */
    createSession(config: DiscoverySessionConfig): Promise<{
        sessionId: string;
        projectId: string;
        tasks: any[];
    }>;
    /**
     * Start the discovery session - launches coordinator agent
     */
    startSession(sessionId: string, callbacks?: {
        onProgress?: (progress: DiscoveryProgress) => void;
        onTaskUpdate?: (taskId: string, update: any) => void;
        onMessage?: (message: any) => void;
        onComplete?: (summary: DiscoverySummary) => void;
        onError?: (error: Error) => void;
    }): Promise<void>;
    /**
     * Stream responses from coordinator agent
     */
    private streamResponses;
    /**
     * Create async input stream for coordinator
     */
    private createInputStream;
    /**
     * Build initial prompt for discovery coordinator
     */
    private buildInitialPrompt;
    /**
     * Send a message to the coordinator
     */
    sendMessage(sessionId: string, content: string): void;
    /**
     * Update session progress
     */
    updateProgress(sessionId: string, progress: Partial<DiscoveryProgress>): void;
    /**
     * Add a discovered entity
     */
    addDiscoveredEntity(sessionId: string, entity: DiscoveredEntity): void;
    /**
     * Notify task update
     */
    notifyTaskUpdate(sessionId: string, taskId: string, update: any): void;
    /**
     * Notify message
     */
    notifyMessage(sessionId: string, message: any): void;
    /**
     * Complete the session
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
    getSession(sessionId: string): ActiveDiscoverySession | undefined;
    /**
     * Get session status
     */
    getSessionStatus(sessionId: string): Promise<any>;
}
export declare const discoverySessionManager: DiscoverySessionManager;
//# sourceMappingURL=discovery-session.d.ts.map