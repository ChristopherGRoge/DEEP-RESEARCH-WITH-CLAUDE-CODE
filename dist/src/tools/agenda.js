"use strict";
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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAgenda = createAgenda;
exports.listAgendas = listAgendas;
exports.getAgenda = getAgenda;
exports.getAgendaStatus = getAgendaStatus;
exports.getNextItem = getNextItem;
exports.completeItem = completeItem;
exports.skipItem = skipItem;
exports.failItem = failItem;
exports.resetAgenda = resetAgenda;
exports.deleteAgenda = deleteAgenda;
exports.suggestAgendas = suggestAgendas;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const crypto = __importStar(require("crypto"));
const client_1 = require("../db/client");
// ============================================
// FILE OPERATIONS
// ============================================
const AGENDA_DIR = '.agenda';
function getAgendaPath(agendaId) {
    return path.resolve(AGENDA_DIR, `${agendaId}.json`);
}
function ensureAgendaDir() {
    const dir = path.resolve(AGENDA_DIR);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
}
function saveAgenda(agenda) {
    ensureAgendaDir();
    agenda.updatedAt = new Date().toISOString();
    agenda.stats = calculateStats(agenda.items);
    fs.writeFileSync(getAgendaPath(agenda.id), JSON.stringify(agenda, null, 2));
}
function loadAgenda(agendaId) {
    const agendaPath = getAgendaPath(agendaId);
    if (!fs.existsSync(agendaPath)) {
        return null;
    }
    return JSON.parse(fs.readFileSync(agendaPath, 'utf-8'));
}
function calculateStats(items) {
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
async function createAgenda(input) {
    const { projectId, name, taskType, taskDescription, entityIds, filter } = input;
    // Get project
    const project = await client_1.prisma.researchProject.findUnique({
        where: { id: projectId },
    });
    if (!project) {
        throw new Error(`Project not found: ${projectId}`);
    }
    // Get target entities
    let entities;
    if (entityIds && entityIds.length > 0) {
        // Specific entities
        entities = await client_1.prisma.entity.findMany({
            where: { id: { in: entityIds }, projectId },
            select: { id: true, name: true, url: true },
            orderBy: { name: 'asc' },
        });
    }
    else if (filter) {
        // Filter-based selection
        const where = { projectId };
        if (filter.entityType) {
            where.entityType = filter.entityType;
        }
        if (filter.hasUrl !== undefined) {
            if (filter.hasUrl) {
                where.url = { not: null };
            }
            else {
                where.url = null;
            }
        }
        let allEntities = await client_1.prisma.entity.findMany({
            where,
            select: { id: true, name: true, url: true },
            orderBy: { name: 'asc' },
        });
        // Filter by missing schema type
        if (filter.missingSchemaType) {
            const extractions = await client_1.prisma.extraction.findMany({
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
    }
    else {
        // All entities in project
        entities = await client_1.prisma.entity.findMany({
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
    const items = entities.map(e => ({
        entityId: e.id,
        entityName: e.name,
        entityUrl: e.url,
        status: 'pending',
    }));
    const agenda = {
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
function listAgendas() {
    ensureAgendaDir();
    const dir = path.resolve(AGENDA_DIR);
    const files = fs.readdirSync(dir).filter(f => f.endsWith('.json'));
    return files.map(file => {
        const agenda = JSON.parse(fs.readFileSync(path.join(dir, file), 'utf-8'));
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
function getAgenda(agendaId) {
    return loadAgenda(agendaId);
}
/**
 * Get agenda status/progress
 */
function getAgendaStatus(agendaId) {
    const agenda = loadAgenda(agendaId);
    if (!agenda)
        return null;
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
function getNextItem(agendaId) {
    const agenda = loadAgenda(agendaId);
    if (!agenda)
        return null;
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
    let command;
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
function completeItem(agendaId, notes) {
    const agenda = loadAgenda(agendaId);
    if (!agenda)
        return null;
    // Find in_progress item
    const item = agenda.items.find(i => i.status === 'in_progress');
    if (!item) {
        throw new Error('No item currently in progress');
    }
    // Mark as completed
    item.status = 'completed';
    item.completedAt = new Date().toISOString();
    if (notes)
        item.notes = notes;
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
function skipItem(agendaId, reason) {
    const agenda = loadAgenda(agendaId);
    if (!agenda)
        return null;
    // Find in_progress item
    const item = agenda.items.find(i => i.status === 'in_progress');
    if (!item) {
        throw new Error('No item currently in progress');
    }
    // Mark as skipped
    item.status = 'skipped';
    item.completedAt = new Date().toISOString();
    if (reason)
        item.notes = reason;
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
function failItem(agendaId, error) {
    const agenda = loadAgenda(agendaId);
    if (!agenda)
        return null;
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
function resetAgenda(agendaId, options) {
    const agenda = loadAgenda(agendaId);
    if (!agenda)
        return null;
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
function deleteAgenda(agendaId) {
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
async function suggestAgendas(projectId) {
    const suggestions = [];
    // Get all entities
    const entities = await client_1.prisma.entity.findMany({
        where: { projectId },
        select: { id: true, url: true },
    });
    const entitiesWithUrl = entities.filter(e => e.url);
    // Get all extractions
    const extractions = await client_1.prisma.extraction.findMany({
        where: {
            entity: { projectId },
            status: 'COMPLETED',
        },
        select: { entityId: true, schemaType: true },
    });
    // Group extractions by entity
    const extractionsByEntity = new Map();
    for (const ext of extractions) {
        if (!extractionsByEntity.has(ext.entityId)) {
            extractionsByEntity.set(ext.entityId, new Set());
        }
        extractionsByEntity.get(ext.entityId).add(ext.schemaType);
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
//# sourceMappingURL=agenda.js.map