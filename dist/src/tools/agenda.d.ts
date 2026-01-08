/**
 * Research Agenda - Batch Processing Queue
 *
 * Create and manage research agendas to systematically work through entities.
 * Agendas persist to JSON files so work can be resumed across sessions.
 *
 * Example workflow:
 * 1. agenda:create - Create agenda for "extract pricing for all entities"
 * 2. agenda:next - Get next entity to process
 * 3. extract:fetch + extract:save - Do the work
 * 4. agenda:complete - Mark done, repeat from step 2
 */
export type AgendaItemStatus = 'pending' | 'in_progress' | 'completed' | 'skipped' | 'failed';
export interface AgendaItem {
    entityId: string;
    entityName: string;
    entityUrl: string | null;
    status: AgendaItemStatus;
    startedAt?: string;
    completedAt?: string;
    error?: string;
    notes?: string;
}
export interface Agenda {
    id: string;
    name: string;
    projectId: string;
    projectName: string;
    taskType: string;
    taskDescription?: string;
    createdAt: string;
    updatedAt: string;
    items: AgendaItem[];
    currentIndex: number;
    stats: {
        total: number;
        pending: number;
        inProgress: number;
        completed: number;
        skipped: number;
        failed: number;
    };
}
export interface CreateAgendaInput {
    projectId: string;
    name: string;
    taskType: string;
    taskDescription?: string;
    entityIds?: string[];
    filter?: {
        missingSchemaType?: string;
        entityType?: string;
        hasUrl?: boolean;
    };
}
/**
 * Create a new research agenda
 */
export declare function createAgenda(input: CreateAgendaInput): Promise<Agenda>;
/**
 * List all agendas
 */
export declare function listAgendas(): Array<{
    id: string;
    name: string;
    projectName: string;
    taskType: string;
    stats: Agenda['stats'];
    createdAt: string;
    updatedAt: string;
}>;
/**
 * Get agenda by ID
 */
export declare function getAgenda(agendaId: string): Agenda | null;
/**
 * Get agenda status/progress
 */
export declare function getAgendaStatus(agendaId: string): {
    agenda: {
        id: string;
        name: string;
        taskType: string;
        projectName: string;
    };
    progress: {
        percent: number;
        completed: number;
        remaining: number;
        total: number;
    };
    stats: Agenda['stats'];
    currentItem: AgendaItem | null;
    recentlyCompleted: AgendaItem[];
    nextItems: AgendaItem[];
} | null;
/**
 * Get next item to work on
 */
export declare function getNextItem(agendaId: string): {
    item: AgendaItem;
    position: number;
    remaining: number;
    command?: string;
} | {
    message: string;
    stats: Agenda['stats'];
} | null;
/**
 * Mark current item as completed
 */
export declare function completeItem(agendaId: string, notes?: string): {
    completed: AgendaItem;
    nextItem: AgendaItem | null;
    progress: {
        percent: number;
        completed: number;
        remaining: number;
    };
} | null;
/**
 * Skip current item
 */
export declare function skipItem(agendaId: string, reason?: string): {
    skipped: AgendaItem;
    nextItem: AgendaItem | null;
} | null;
/**
 * Mark current item as failed
 */
export declare function failItem(agendaId: string, error: string): {
    failed: AgendaItem;
    nextItem: AgendaItem | null;
} | null;
/**
 * Reset agenda (set all items back to pending)
 */
export declare function resetAgenda(agendaId: string, options?: {
    resetCompleted?: boolean;
    resetSkipped?: boolean;
    resetFailed?: boolean;
}): Agenda | null;
/**
 * Delete an agenda
 */
export declare function deleteAgenda(agendaId: string): boolean;
/**
 * Get suggested agendas based on research gaps
 */
export declare function suggestAgendas(projectId: string): Promise<Array<{
    name: string;
    taskType: string;
    entityCount: number;
    description: string;
}>>;
//# sourceMappingURL=agenda.d.ts.map