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

import * as fs from 'fs';
import * as path from 'path';
import * as crypto from 'crypto';
import { prisma } from '../db/client';

// ============================================
// TYPES
// ============================================

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
  taskType: string;  // e.g., "extract:pricing", "extract:features", "custom"
  taskDescription?: string;
  createdAt: string;
  updatedAt: string;
  items: AgendaItem[];
  currentIndex: number;  // Index of current item being worked on
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
  // Target selection (one of these)
  entityIds?: string[];  // Specific entities
  filter?: {
    missingSchemaType?: string;  // Entities missing this extraction type
    entityType?: string;  // Filter by entity type
    hasUrl?: boolean;  // Only entities with URLs
  };
}

// ============================================
// FILE OPERATIONS
// ============================================

const AGENDA_DIR = '.agenda';

function getAgendaPath(agendaId: string): string {
  return path.resolve(AGENDA_DIR, `${agendaId}.json`);
}

function ensureAgendaDir(): void {
  const dir = path.resolve(AGENDA_DIR);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function saveAgenda(agenda: Agenda): void {
  ensureAgendaDir();
  agenda.updatedAt = new Date().toISOString();
  agenda.stats = calculateStats(agenda.items);
  fs.writeFileSync(getAgendaPath(agenda.id), JSON.stringify(agenda, null, 2));
}

function loadAgenda(agendaId: string): Agenda | null {
  const agendaPath = getAgendaPath(agendaId);
  if (!fs.existsSync(agendaPath)) {
    return null;
  }
  return JSON.parse(fs.readFileSync(agendaPath, 'utf-8'));
}

function calculateStats(items: AgendaItem[]): Agenda['stats'] {
  return {
    total: items.length,
    pending: items.filter(i => i.status === 'pending').length,
    inProgress: items.filter(i => i.status === 'in_progress').length,
    completed: items.filter(i => i.status === 'completed').length,
    skipped: items.filter(i => i.status === 'skipped').length,
    failed: items.filter(i => i.status === 'failed').length,
  };
}

// ============================================
// AGENDA OPERATIONS
// ============================================

/**
 * Create a new research agenda
 */
export async function createAgenda(input: CreateAgendaInput): Promise<Agenda> {
  const { projectId, name, taskType, taskDescription, entityIds, filter } = input;

  // Get project
  const project = await prisma.researchProject.findUnique({
    where: { id: projectId },
  });

  if (!project) {
    throw new Error(`Project not found: ${projectId}`);
  }

  // Get target entities
  let entities: Array<{ id: string; name: string; url: string | null }>;

  if (entityIds && entityIds.length > 0) {
    // Specific entities
    entities = await prisma.entity.findMany({
      where: { id: { in: entityIds }, projectId },
      select: { id: true, name: true, url: true },
      orderBy: { name: 'asc' },
    });
  } else if (filter) {
    // Filter-based selection
    const where: any = { projectId };

    if (filter.entityType) {
      where.entityType = filter.entityType;
    }

    if (filter.hasUrl !== undefined) {
      if (filter.hasUrl) {
        where.url = { not: null };
      } else {
        where.url = null;
      }
    }

    let allEntities = await prisma.entity.findMany({
      where,
      select: { id: true, name: true, url: true },
      orderBy: { name: 'asc' },
    });

    // Filter by missing schema type
    if (filter.missingSchemaType) {
      const extractions = await prisma.extraction.findMany({
        where: {
          entityId: { in: allEntities.map(e => e.id) },
          schemaType: filter.missingSchemaType,
          status: 'COMPLETED',
        },
        select: { entityId: true },
      });

      const entitiesWithExtraction = new Set(extractions.map(e => e.entityId));
      allEntities = allEntities.filter(e => !entitiesWithExtraction.has(e.id));
    }

    entities = allEntities;
  } else {
    // All entities in project
    entities = await prisma.entity.findMany({
      where: { projectId },
      select: { id: true, name: true, url: true },
      orderBy: { name: 'asc' },
    });
  }

  if (entities.length === 0) {
    throw new Error('No entities match the selection criteria');
  }

  // Create agenda
  const agendaId = crypto.randomBytes(6).toString('hex');
  const items: AgendaItem[] = entities.map(e => ({
    entityId: e.id,
    entityName: e.name,
    entityUrl: e.url,
    status: 'pending' as AgendaItemStatus,
  }));

  const agenda: Agenda = {
    id: agendaId,
    name,
    projectId,
    projectName: project.name,
    taskType,
    taskDescription,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    items,
    currentIndex: 0,
    stats: calculateStats(items),
  };

  saveAgenda(agenda);

  return agenda;
}

/**
 * List all agendas
 */
export function listAgendas(): Array<{
  id: string;
  name: string;
  projectName: string;
  taskType: string;
  stats: Agenda['stats'];
  createdAt: string;
  updatedAt: string;
}> {
  ensureAgendaDir();
  const dir = path.resolve(AGENDA_DIR);
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.json'));

  return files.map(file => {
    const agenda = JSON.parse(fs.readFileSync(path.join(dir, file), 'utf-8')) as Agenda;
    return {
      id: agenda.id,
      name: agenda.name,
      projectName: agenda.projectName,
      taskType: agenda.taskType,
      stats: agenda.stats,
      createdAt: agenda.createdAt,
      updatedAt: agenda.updatedAt,
    };
  }).sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
}

/**
 * Get agenda by ID
 */
export function getAgenda(agendaId: string): Agenda | null {
  return loadAgenda(agendaId);
}

/**
 * Get agenda status/progress
 */
export function getAgendaStatus(agendaId: string): {
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
} | null {
  const agenda = loadAgenda(agendaId);
  if (!agenda) return null;

  const completed = agenda.stats.completed + agenda.stats.skipped;
  const remaining = agenda.stats.pending + agenda.stats.inProgress;
  const percent = agenda.stats.total > 0
    ? Math.round((completed / agenda.stats.total) * 100)
    : 0;

  // Find current item (first in_progress or first pending)
  let currentItem = agenda.items.find(i => i.status === 'in_progress') || null;
  if (!currentItem) {
    currentItem = agenda.items.find(i => i.status === 'pending') || null;
  }

  // Recently completed (last 5)
  const recentlyCompleted = agenda.items
    .filter(i => i.status === 'completed')
    .sort((a, b) => (b.completedAt || '').localeCompare(a.completedAt || ''))
    .slice(0, 5);

  // Next items (first 5 pending)
  const nextItems = agenda.items
    .filter(i => i.status === 'pending')
    .slice(0, 5);

  return {
    agenda: {
      id: agenda.id,
      name: agenda.name,
      taskType: agenda.taskType,
      projectName: agenda.projectName,
    },
    progress: {
      percent,
      completed,
      remaining,
      total: agenda.stats.total,
    },
    stats: agenda.stats,
    currentItem,
    recentlyCompleted,
    nextItems,
  };
}

/**
 * Get next item to work on
 */
export function getNextItem(agendaId: string): {
  item: AgendaItem;
  position: number;
  remaining: number;
  command?: string;
} | { message: string; stats: Agenda['stats'] } | null {
  const agenda = loadAgenda(agendaId);
  if (!agenda) return null;

  // Find first pending item
  const itemIndex = agenda.items.findIndex(i => i.status === 'pending');

  if (itemIndex === -1) {
    return {
      message: 'Agenda complete! No more pending items.',
      stats: agenda.stats,
    };
  }

  const item = agenda.items[itemIndex];

  // Mark as in_progress
  item.status = 'in_progress';
  item.startedAt = new Date().toISOString();
  agenda.currentIndex = itemIndex;
  saveAgenda(agenda);

  // Generate suggested command
  let command: string | undefined;
  if (agenda.taskType.startsWith('extract:') && item.entityUrl) {
    const schemaType = agenda.taskType.replace('extract:', '');
    command = `npm run cli -- extract:fetch '{"url": "${item.entityUrl}", "entityId": "${item.entityId}"}'`;
  }

  return {
    item,
    position: itemIndex + 1,
    remaining: agenda.stats.pending - 1,
    command,
  };
}

/**
 * Mark current item as completed
 */
export function completeItem(agendaId: string, notes?: string): {
  completed: AgendaItem;
  nextItem: AgendaItem | null;
  progress: { percent: number; completed: number; remaining: number };
} | null {
  const agenda = loadAgenda(agendaId);
  if (!agenda) return null;

  // Find in_progress item
  const item = agenda.items.find(i => i.status === 'in_progress');
  if (!item) {
    throw new Error('No item currently in progress');
  }

  // Mark as completed
  item.status = 'completed';
  item.completedAt = new Date().toISOString();
  if (notes) item.notes = notes;

  saveAgenda(agenda);

  // Find next pending item
  const nextItem = agenda.items.find(i => i.status === 'pending') || null;

  const completed = agenda.stats.completed + 1;
  const remaining = agenda.stats.pending;
  const percent = Math.round((completed / agenda.stats.total) * 100);

  return {
    completed: item,
    nextItem,
    progress: { percent, completed, remaining },
  };
}

/**
 * Skip current item
 */
export function skipItem(agendaId: string, reason?: string): {
  skipped: AgendaItem;
  nextItem: AgendaItem | null;
} | null {
  const agenda = loadAgenda(agendaId);
  if (!agenda) return null;

  // Find in_progress item
  const item = agenda.items.find(i => i.status === 'in_progress');
  if (!item) {
    throw new Error('No item currently in progress');
  }

  // Mark as skipped
  item.status = 'skipped';
  item.completedAt = new Date().toISOString();
  if (reason) item.notes = reason;

  saveAgenda(agenda);

  // Find next pending item
  const nextItem = agenda.items.find(i => i.status === 'pending') || null;

  return {
    skipped: item,
    nextItem,
  };
}

/**
 * Mark current item as failed
 */
export function failItem(agendaId: string, error: string): {
  failed: AgendaItem;
  nextItem: AgendaItem | null;
} | null {
  const agenda = loadAgenda(agendaId);
  if (!agenda) return null;

  // Find in_progress item
  const item = agenda.items.find(i => i.status === 'in_progress');
  if (!item) {
    throw new Error('No item currently in progress');
  }

  // Mark as failed
  item.status = 'failed';
  item.completedAt = new Date().toISOString();
  item.error = error;

  saveAgenda(agenda);

  // Find next pending item
  const nextItem = agenda.items.find(i => i.status === 'pending') || null;

  return {
    failed: item,
    nextItem,
  };
}

/**
 * Reset agenda (set all items back to pending)
 */
export function resetAgenda(agendaId: string, options?: {
  resetCompleted?: boolean;
  resetSkipped?: boolean;
  resetFailed?: boolean;
}): Agenda | null {
  const agenda = loadAgenda(agendaId);
  if (!agenda) return null;

  const { resetCompleted = true, resetSkipped = true, resetFailed = true } = options || {};

  for (const item of agenda.items) {
    if (item.status === 'in_progress') {
      item.status = 'pending';
      delete item.startedAt;
    }
    if (resetCompleted && item.status === 'completed') {
      item.status = 'pending';
      delete item.startedAt;
      delete item.completedAt;
      delete item.notes;
    }
    if (resetSkipped && item.status === 'skipped') {
      item.status = 'pending';
      delete item.startedAt;
      delete item.completedAt;
      delete item.notes;
    }
    if (resetFailed && item.status === 'failed') {
      item.status = 'pending';
      delete item.startedAt;
      delete item.completedAt;
      delete item.error;
    }
  }

  agenda.currentIndex = 0;
  saveAgenda(agenda);

  return agenda;
}

/**
 * Delete an agenda
 */
export function deleteAgenda(agendaId: string): boolean {
  const agendaPath = getAgendaPath(agendaId);
  if (!fs.existsSync(agendaPath)) {
    return false;
  }
  fs.unlinkSync(agendaPath);
  return true;
}

/**
 * Get suggested agendas based on research gaps
 */
export async function suggestAgendas(projectId: string): Promise<Array<{
  name: string;
  taskType: string;
  entityCount: number;
  description: string;
}>> {
  const suggestions: Array<{
    name: string;
    taskType: string;
    entityCount: number;
    description: string;
  }> = [];

  // Get all entities
  const entities = await prisma.entity.findMany({
    where: { projectId },
    select: { id: true, url: true },
  });

  const entitiesWithUrl = entities.filter(e => e.url);

  // Get all extractions
  const extractions = await prisma.extraction.findMany({
    where: {
      entity: { projectId },
      status: 'COMPLETED',
    },
    select: { entityId: true, schemaType: true },
  });

  // Group extractions by entity
  const extractionsByEntity = new Map<string, Set<string>>();
  for (const ext of extractions) {
    if (!extractionsByEntity.has(ext.entityId)) {
      extractionsByEntity.set(ext.entityId, new Set());
    }
    extractionsByEntity.get(ext.entityId)!.add(ext.schemaType);
  }

  // Check each schema type
  const schemaTypes = ['pricing', 'features', 'company', 'compliance', 'integrations'];

  for (const schemaType of schemaTypes) {
    const entitiesMissing = entitiesWithUrl.filter(e => {
      const schemas = extractionsByEntity.get(e.id);
      return !schemas || !schemas.has(schemaType);
    });

    if (entitiesMissing.length > 0) {
      suggestions.push({
        name: `Extract ${schemaType} for all entities`,
        taskType: `extract:${schemaType}`,
        entityCount: entitiesMissing.length,
        description: `${entitiesMissing.length} entities with URLs are missing ${schemaType} data`,
      });
    }
  }

  // Sort by entity count descending
  suggestions.sort((a, b) => b.entityCount - a.entityCount);

  return suggestions;
}
