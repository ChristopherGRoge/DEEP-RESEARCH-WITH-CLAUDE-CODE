/**
 * Extraction Diff - Track Changes Over Time
 *
 * Compare extractions to see what changed:
 * - Price changes
 * - Feature additions/removals
 * - Compliance status updates
 * - Any data evolution
 */

import { prisma } from '../db/client';

// ============================================
// TYPES
// ============================================

export interface DiffChange {
  path: string;
  type: 'added' | 'removed' | 'changed';
  oldValue?: any;
  newValue?: any;
}

export interface ExtractionDiff {
  entityId: string;
  entityName: string;
  schemaType: string;
  hasChanges: boolean;
  changes: DiffChange[];
  summary: {
    added: number;
    removed: number;
    changed: number;
    total: number;
  };
  oldExtraction: {
    id: string;
    extractedAt: Date;
    sourceUrl: string;
  };
  newExtraction: {
    id: string;
    extractedAt: Date;
    sourceUrl: string;
  };
  daysBetween: number;
}

export interface ExtractionHistoryItem {
  id: string;
  extractedAt: Date;
  status: string;
  confidence: number | null;
  sourceUrl: string;
  screenshotPath: string | null;
  dataPreview: any;
}

export interface ExtractionHistory {
  entityId: string;
  entityName: string;
  schemaType: string;
  totalExtractions: number;
  extractions: ExtractionHistoryItem[];
  firstExtraction: Date | null;
  latestExtraction: Date | null;
  averageDaysBetween: number | null;
}

// ============================================
// EXTRACTION HISTORY
// ============================================

/**
 * Get extraction history for an entity and schema type
 */
export async function getExtractionHistory(input: {
  entityId: string;
  schemaType: string;
  limit?: number;
}): Promise<ExtractionHistory | null> {
  const { entityId, schemaType, limit = 20 } = input;

  const entity = await prisma.entity.findUnique({
    where: { id: entityId },
  });

  if (!entity) {
    return null;
  }

  const extractions = await prisma.extraction.findMany({
    where: {
      entityId,
      schemaType,
    },
    include: {
      source: true,
      screenshot: true,
    },
    orderBy: { extractedAt: 'desc' },
    take: limit,
  });

  if (extractions.length === 0) {
    return {
      entityId,
      entityName: entity.name,
      schemaType,
      totalExtractions: 0,
      extractions: [],
      firstExtraction: null,
      latestExtraction: null,
      averageDaysBetween: null,
    };
  }

  // Calculate average days between extractions
  let totalDays = 0;
  for (let i = 0; i < extractions.length - 1; i++) {
    const daysDiff = Math.abs(
      extractions[i].extractedAt.getTime() - extractions[i + 1].extractedAt.getTime()
    ) / (1000 * 60 * 60 * 24);
    totalDays += daysDiff;
  }
  const averageDaysBetween = extractions.length > 1
    ? Math.round((totalDays / (extractions.length - 1)) * 10) / 10
    : null;

  // Create preview of data (truncate for readability)
  const historyItems: ExtractionHistoryItem[] = extractions.map(ext => ({
    id: ext.id,
    extractedAt: ext.extractedAt,
    status: ext.status,
    confidence: ext.confidence,
    sourceUrl: ext.source.url,
    screenshotPath: ext.screenshot?.filePath || null,
    dataPreview: createDataPreview(ext.data as any),
  }));

  return {
    entityId,
    entityName: entity.name,
    schemaType,
    totalExtractions: extractions.length,
    extractions: historyItems,
    firstExtraction: extractions[extractions.length - 1].extractedAt,
    latestExtraction: extractions[0].extractedAt,
    averageDaysBetween,
  };
}

/**
 * Create a truncated preview of extraction data
 */
function createDataPreview(data: any, maxDepth: number = 2): any {
  if (data === null || data === undefined) return data;

  if (typeof data !== 'object') {
    if (typeof data === 'string' && data.length > 100) {
      return data.substring(0, 100) + '...';
    }
    return data;
  }

  if (Array.isArray(data)) {
    if (maxDepth <= 0) return `[${data.length} items]`;
    return data.slice(0, 3).map(item => createDataPreview(item, maxDepth - 1));
  }

  if (maxDepth <= 0) return '{...}';

  const preview: any = {};
  const keys = Object.keys(data).slice(0, 5);
  for (const key of keys) {
    preview[key] = createDataPreview(data[key], maxDepth - 1);
  }
  if (Object.keys(data).length > 5) {
    preview['...'] = `+${Object.keys(data).length - 5} more`;
  }
  return preview;
}

// ============================================
// DIFF FUNCTIONS
// ============================================

/**
 * Compare two extractions and return differences
 */
export async function diffExtractions(input: {
  oldExtractionId: string;
  newExtractionId: string;
}): Promise<ExtractionDiff | null> {
  const { oldExtractionId, newExtractionId } = input;

  const [oldExt, newExt] = await Promise.all([
    prisma.extraction.findUnique({
      where: { id: oldExtractionId },
      include: { entity: true, source: true },
    }),
    prisma.extraction.findUnique({
      where: { id: newExtractionId },
      include: { entity: true, source: true },
    }),
  ]);

  if (!oldExt || !newExt) {
    return null;
  }

  if (oldExt.schemaType !== newExt.schemaType) {
    throw new Error('Cannot diff extractions of different schema types');
  }

  const changes = deepDiff(oldExt.data as any, newExt.data as any);

  const daysBetween = Math.round(
    Math.abs(newExt.extractedAt.getTime() - oldExt.extractedAt.getTime()) / (1000 * 60 * 60 * 24)
  );

  return {
    entityId: newExt.entityId,
    entityName: newExt.entity.name,
    schemaType: newExt.schemaType,
    hasChanges: changes.length > 0,
    changes,
    summary: {
      added: changes.filter(c => c.type === 'added').length,
      removed: changes.filter(c => c.type === 'removed').length,
      changed: changes.filter(c => c.type === 'changed').length,
      total: changes.length,
    },
    oldExtraction: {
      id: oldExt.id,
      extractedAt: oldExt.extractedAt,
      sourceUrl: oldExt.source.url,
    },
    newExtraction: {
      id: newExt.id,
      extractedAt: newExt.extractedAt,
      sourceUrl: newExt.source.url,
    },
    daysBetween,
  };
}

/**
 * Get diff between latest and previous extraction for an entity
 */
export async function getLatestDiff(input: {
  entityId: string;
  schemaType: string;
}): Promise<ExtractionDiff | { message: string; extractionCount: number } | null> {
  const { entityId, schemaType } = input;

  const entity = await prisma.entity.findUnique({
    where: { id: entityId },
  });

  if (!entity) {
    return null;
  }

  const extractions = await prisma.extraction.findMany({
    where: {
      entityId,
      schemaType,
      status: 'COMPLETED',
    },
    include: { source: true },
    orderBy: { extractedAt: 'desc' },
    take: 2,
  });

  if (extractions.length === 0) {
    return {
      message: `No ${schemaType} extractions found for ${entity.name}`,
      extractionCount: 0,
    };
  }

  if (extractions.length === 1) {
    return {
      message: `Only one ${schemaType} extraction exists for ${entity.name}. Need at least 2 to diff.`,
      extractionCount: 1,
    };
  }

  return diffExtractions({
    oldExtractionId: extractions[1].id,
    newExtractionId: extractions[0].id,
  });
}

/**
 * Find entities with recent changes (extractions that differ from previous)
 */
export async function findRecentChanges(input: {
  projectId: string;
  schemaType?: string;
  daysBack?: number;
}): Promise<{
  entitiesWithChanges: Array<{
    entityId: string;
    entityName: string;
    schemaType: string;
    changeCount: number;
    latestChange: Date;
    changeTypes: { added: number; removed: number; changed: number };
  }>;
  summary: {
    entitiesChecked: number;
    entitiesWithChanges: number;
    totalChanges: number;
  };
}> {
  const { projectId, schemaType, daysBack = 30 } = input;

  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - daysBack);

  // Get entities with multiple extractions
  const where: any = {
    entity: { projectId },
    status: 'COMPLETED',
    extractedAt: { gte: cutoffDate },
  };
  if (schemaType) {
    where.schemaType = schemaType;
  }

  const recentExtractions = await prisma.extraction.findMany({
    where,
    include: { entity: true, source: true },
    orderBy: { extractedAt: 'desc' },
  });

  // Group by entity and schema type
  const grouped = new Map<string, typeof recentExtractions>();
  for (const ext of recentExtractions) {
    const key = `${ext.entityId}:${ext.schemaType}`;
    if (!grouped.has(key)) {
      grouped.set(key, []);
    }
    grouped.get(key)!.push(ext);
  }

  // Find entities with changes
  const entitiesWithChanges: Array<{
    entityId: string;
    entityName: string;
    schemaType: string;
    changeCount: number;
    latestChange: Date;
    changeTypes: { added: number; removed: number; changed: number };
  }> = [];

  let totalChanges = 0;

  for (const [key, extractions] of grouped.entries()) {
    if (extractions.length < 2) continue;

    // Compare latest two
    const changes = deepDiff(extractions[1].data as any, extractions[0].data as any);

    if (changes.length > 0) {
      totalChanges += changes.length;
      entitiesWithChanges.push({
        entityId: extractions[0].entityId,
        entityName: extractions[0].entity.name,
        schemaType: extractions[0].schemaType,
        changeCount: changes.length,
        latestChange: extractions[0].extractedAt,
        changeTypes: {
          added: changes.filter(c => c.type === 'added').length,
          removed: changes.filter(c => c.type === 'removed').length,
          changed: changes.filter(c => c.type === 'changed').length,
        },
      });
    }
  }

  // Sort by change count descending
  entitiesWithChanges.sort((a, b) => b.changeCount - a.changeCount);

  return {
    entitiesWithChanges,
    summary: {
      entitiesChecked: grouped.size,
      entitiesWithChanges: entitiesWithChanges.length,
      totalChanges,
    },
  };
}

// ============================================
// DEEP DIFF ALGORITHM
// ============================================

/**
 * Deep diff two objects, returning list of changes
 */
function deepDiff(oldObj: any, newObj: any, path: string = ''): DiffChange[] {
  const changes: DiffChange[] = [];

  // Handle null/undefined
  if (oldObj === null || oldObj === undefined) {
    if (newObj !== null && newObj !== undefined) {
      changes.push({ path: path || 'root', type: 'added', newValue: newObj });
    }
    return changes;
  }

  if (newObj === null || newObj === undefined) {
    changes.push({ path: path || 'root', type: 'removed', oldValue: oldObj });
    return changes;
  }

  // Handle different types
  if (typeof oldObj !== typeof newObj) {
    changes.push({ path: path || 'root', type: 'changed', oldValue: oldObj, newValue: newObj });
    return changes;
  }

  // Handle primitives
  if (typeof oldObj !== 'object') {
    if (oldObj !== newObj) {
      changes.push({ path: path || 'root', type: 'changed', oldValue: oldObj, newValue: newObj });
    }
    return changes;
  }

  // Handle arrays
  if (Array.isArray(oldObj) && Array.isArray(newObj)) {
    return diffArrays(oldObj, newObj, path);
  }

  // Handle objects
  const allKeys = new Set([...Object.keys(oldObj), ...Object.keys(newObj)]);

  for (const key of allKeys) {
    const newPath = path ? `${path}.${key}` : key;
    const oldValue = oldObj[key];
    const newValue = newObj[key];

    if (!(key in oldObj)) {
      changes.push({ path: newPath, type: 'added', newValue });
    } else if (!(key in newObj)) {
      changes.push({ path: newPath, type: 'removed', oldValue });
    } else {
      changes.push(...deepDiff(oldValue, newValue, newPath));
    }
  }

  return changes;
}

/**
 * Diff two arrays, trying to match items intelligently
 */
function diffArrays(oldArr: any[], newArr: any[], path: string): DiffChange[] {
  const changes: DiffChange[] = [];

  // Try to find a good key for matching (name, id, etc.)
  const matchKey = findArrayMatchKey(oldArr, newArr);

  if (matchKey) {
    // Match by key
    const oldByKey = new Map(oldArr.map(item => [item[matchKey], item]));
    const newByKey = new Map(newArr.map(item => [item[matchKey], item]));

    // Find removed items
    for (const [key, oldItem] of oldByKey) {
      if (!newByKey.has(key)) {
        changes.push({
          path: `${path}[${matchKey}=${key}]`,
          type: 'removed',
          oldValue: oldItem,
        });
      }
    }

    // Find added and changed items
    for (const [key, newItem] of newByKey) {
      if (!oldByKey.has(key)) {
        changes.push({
          path: `${path}[${matchKey}=${key}]`,
          type: 'added',
          newValue: newItem,
        });
      } else {
        const oldItem = oldByKey.get(key);
        const itemChanges = deepDiff(oldItem, newItem, `${path}[${matchKey}=${key}]`);
        changes.push(...itemChanges);
      }
    }
  } else {
    // Fall back to index-based comparison
    const maxLen = Math.max(oldArr.length, newArr.length);

    for (let i = 0; i < maxLen; i++) {
      const itemPath = `${path}[${i}]`;

      if (i >= oldArr.length) {
        changes.push({ path: itemPath, type: 'added', newValue: newArr[i] });
      } else if (i >= newArr.length) {
        changes.push({ path: itemPath, type: 'removed', oldValue: oldArr[i] });
      } else {
        changes.push(...deepDiff(oldArr[i], newArr[i], itemPath));
      }
    }
  }

  return changes;
}

/**
 * Find a key that can be used to match array items
 */
function findArrayMatchKey(arr1: any[], arr2: any[]): string | null {
  if (arr1.length === 0 && arr2.length === 0) return null;

  const sample = arr1[0] || arr2[0];
  if (typeof sample !== 'object' || sample === null) return null;

  // Prefer these keys for matching
  const preferredKeys = ['name', 'id', 'key', 'title', 'type'];

  for (const key of preferredKeys) {
    if (key in sample) {
      // Verify all items have this key and values are unique
      const allItems = [...arr1, ...arr2];
      const values = allItems.map(item => item[key]).filter(v => v !== undefined);
      const uniqueValues = new Set(values);

      // Good if most items have unique values for this key
      if (values.length > 0 && uniqueValues.size >= values.length * 0.8) {
        return key;
      }
    }
  }

  return null;
}

// ============================================
// CHANGE SUMMARY HELPERS
// ============================================

/**
 * Get a human-readable summary of changes
 */
export function summarizeChanges(changes: DiffChange[]): string[] {
  const summaries: string[] = [];

  for (const change of changes) {
    switch (change.type) {
      case 'added':
        summaries.push(`+ ${change.path}: ${formatValue(change.newValue)}`);
        break;
      case 'removed':
        summaries.push(`- ${change.path}: ${formatValue(change.oldValue)}`);
        break;
      case 'changed':
        summaries.push(`~ ${change.path}: ${formatValue(change.oldValue)} → ${formatValue(change.newValue)}`);
        break;
    }
  }

  return summaries;
}

function formatValue(value: any): string {
  if (value === null || value === undefined) return 'null';
  if (typeof value === 'string') return `"${value.substring(0, 50)}${value.length > 50 ? '...' : ''}"`;
  if (typeof value === 'number') return String(value);
  if (typeof value === 'boolean') return String(value);
  if (Array.isArray(value)) return `[${value.length} items]`;
  if (typeof value === 'object') return `{${Object.keys(value).length} fields}`;
  return String(value);
}
