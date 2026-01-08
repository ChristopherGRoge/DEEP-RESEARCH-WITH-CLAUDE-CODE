"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createEntity = createEntity;
exports.getEntity = getEntity;
exports.findEntityByName = findEntityByName;
exports.listEntities = listEntities;
exports.searchEntities = searchEntities;
exports.updateEntity = updateEntity;
exports.deleteEntity = deleteEntity;
exports.entityExists = entityExists;
const client_1 = __importDefault(require("../db/client"));
/**
 * Create a new entity within a project
 * Uses upsert to avoid duplicates - if entity with same name exists, returns existing
 */
async function createEntity(input) {
    const entity = await client_1.default.entity.upsert({
        where: {
            projectId_name: {
                projectId: input.projectId,
                name: input.name,
            },
        },
        update: {
            // Only update if new data is more complete
            description: input.description || undefined,
            entityType: input.entityType || undefined,
            url: input.url || undefined,
        },
        create: {
            projectId: input.projectId,
            name: input.name,
            description: input.description,
            entityType: input.entityType,
            url: input.url,
        },
    });
    await client_1.default.researchLog.create({
        data: {
            action: 'entity_created',
            details: { entityId: entity.id, name: entity.name, projectId: input.projectId },
        },
    });
    return entity;
}
/**
 * Get an entity by ID with all related data
 */
async function getEntity(entityId) {
    return client_1.default.entity.findUnique({
        where: { id: entityId },
        include: {
            project: true,
            assertions: {
                include: {
                    sources: { include: { source: true } },
                    reasoning: true,
                },
                orderBy: { createdAt: 'desc' },
            },
        },
    });
}
/**
 * Find entity by name within a project
 */
async function findEntityByName(projectId, name) {
    return client_1.default.entity.findFirst({
        where: {
            projectId,
            name: {
                equals: name,
                mode: 'insensitive',
            },
        },
        include: {
            assertions: {
                include: {
                    sources: { include: { source: true } },
                    reasoning: true,
                },
            },
        },
    });
}
/**
 * List all entities in a project
 */
async function listEntities(projectId) {
    return client_1.default.entity.findMany({
        where: { projectId },
        include: {
            _count: {
                select: { assertions: true },
            },
        },
        orderBy: { updatedAt: 'desc' },
    });
}
/**
 * Search entities across projects
 */
async function searchEntities(input) {
    const where = {};
    if (input.projectId) {
        where.projectId = input.projectId;
    }
    if (input.query) {
        where.OR = [
            { name: { contains: input.query, mode: 'insensitive' } },
            { description: { contains: input.query, mode: 'insensitive' } },
        ];
    }
    if (input.entityType) {
        where.entityType = input.entityType;
    }
    return client_1.default.entity.findMany({
        where,
        include: {
            project: { select: { id: true, name: true } },
            _count: {
                select: { assertions: true },
            },
        },
        orderBy: { updatedAt: 'desc' },
        take: 50,
    });
}
/**
 * Update an entity
 */
async function updateEntity(entityId, input) {
    const entity = await client_1.default.entity.update({
        where: { id: entityId },
        data: input,
    });
    await client_1.default.researchLog.create({
        data: {
            action: 'entity_updated',
            details: { entityId: entity.id, changes: JSON.parse(JSON.stringify(input)) },
        },
    });
    return entity;
}
/**
 * Delete an entity and all related assertions
 */
async function deleteEntity(entityId) {
    await client_1.default.researchLog.create({
        data: {
            action: 'entity_deleted',
            details: { entityId },
        },
    });
    return client_1.default.entity.delete({
        where: { id: entityId },
    });
}
/**
 * Check if an entity exists by name in a project
 */
async function entityExists(projectId, name) {
    const count = await client_1.default.entity.count({
        where: {
            projectId,
            name: {
                equals: name,
                mode: 'insensitive',
            },
        },
    });
    return count > 0;
}
//# sourceMappingURL=entities.js.map