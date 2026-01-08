"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSource = createSource;
exports.getSource = getSource;
exports.findSourceByUrl = findSourceByUrl;
exports.listSources = listSources;
exports.searchSources = searchSources;
exports.linkSourceToAssertion = linkSourceToAssertion;
exports.updateSource = updateSource;
exports.validateSource = validateSource;
exports.rejectSource = rejectSource;
exports.deleteSource = deleteSource;
exports.getSourcesByType = getSourcesByType;
const client_1 = __importDefault(require("../db/client"));
const client_2 = require("../../generated/prisma/client");
/**
 * Create or get a source by URL
 */
async function createSource(input) {
    const source = await client_1.default.source.upsert({
        where: { url: input.url },
        update: {
            title: input.title || undefined,
            description: input.description || undefined,
            sourceType: input.sourceType || undefined,
        },
        create: {
            url: input.url,
            title: input.title,
            description: input.description,
            sourceType: input.sourceType,
            status: client_2.SourceStatus.PROPOSED,
        },
    });
    await client_1.default.researchLog.create({
        data: {
            action: 'source_created',
            details: { sourceId: source.id, url: source.url },
        },
    });
    return source;
}
/**
 * Get a source by ID
 */
async function getSource(sourceId) {
    return client_1.default.source.findUnique({
        where: { id: sourceId },
        include: {
            assertions: {
                include: {
                    assertion: {
                        include: {
                            entity: { select: { id: true, name: true } },
                        },
                    },
                },
            },
        },
    });
}
/**
 * Find source by URL
 */
async function findSourceByUrl(url) {
    return client_1.default.source.findUnique({
        where: { url },
        include: {
            assertions: {
                include: {
                    assertion: true,
                },
            },
        },
    });
}
/**
 * List all sources
 */
async function listSources(status) {
    const where = status ? { status } : {};
    return client_1.default.source.findMany({
        where,
        include: {
            _count: {
                select: { assertions: true },
            },
        },
        orderBy: { createdAt: 'desc' },
    });
}
/**
 * Search sources
 */
async function searchSources(query) {
    return client_1.default.source.findMany({
        where: {
            OR: [
                { url: { contains: query, mode: 'insensitive' } },
                { title: { contains: query, mode: 'insensitive' } },
                { description: { contains: query, mode: 'insensitive' } },
            ],
        },
        include: {
            _count: {
                select: { assertions: true },
            },
        },
        orderBy: { createdAt: 'desc' },
        take: 50,
    });
}
/**
 * Link a source to an assertion
 */
async function linkSourceToAssertion(input) {
    let sourceId = input.sourceId;
    // If URL provided instead of ID, find or create the source
    if (input.sourceUrl && !sourceId) {
        const source = await client_1.default.source.upsert({
            where: { url: input.sourceUrl },
            update: {},
            create: { url: input.sourceUrl },
        });
        sourceId = source.id;
    }
    if (!sourceId) {
        throw new Error('Either sourceId or sourceUrl must be provided');
    }
    const link = await client_1.default.assertionSource.upsert({
        where: {
            assertionId_sourceId: {
                assertionId: input.assertionId,
                sourceId,
            },
        },
        update: {
            quote: input.quote || undefined,
        },
        create: {
            assertionId: input.assertionId,
            sourceId,
            quote: input.quote,
        },
    });
    await client_1.default.researchLog.create({
        data: {
            action: 'source_linked',
            agentId: input.agentId,
            details: {
                assertionId: input.assertionId,
                sourceId,
                quote: input.quote,
            },
        },
    });
    return link;
}
/**
 * Update a source
 */
async function updateSource(sourceId, input) {
    const source = await client_1.default.source.update({
        where: { id: sourceId },
        data: input,
    });
    await client_1.default.researchLog.create({
        data: {
            action: 'source_updated',
            details: { sourceId, changes: JSON.parse(JSON.stringify(input)) },
        },
    });
    return source;
}
/**
 * Validate a source (human action)
 */
async function validateSource(sourceId, validatedBy) {
    const source = await client_1.default.source.update({
        where: { id: sourceId },
        data: {
            status: client_2.SourceStatus.VALIDATED,
            validatedAt: new Date(),
            validatedBy,
        },
    });
    await client_1.default.researchLog.create({
        data: {
            action: 'source_validated',
            details: { sourceId, validatedBy },
        },
    });
    return source;
}
/**
 * Reject a source (human action)
 */
async function rejectSource(sourceId, validatedBy) {
    const source = await client_1.default.source.update({
        where: { id: sourceId },
        data: {
            status: client_2.SourceStatus.REJECTED,
            validatedAt: new Date(),
            validatedBy,
        },
    });
    await client_1.default.researchLog.create({
        data: {
            action: 'source_rejected',
            details: { sourceId, validatedBy },
        },
    });
    return source;
}
/**
 * Delete a source
 */
async function deleteSource(sourceId) {
    await client_1.default.researchLog.create({
        data: {
            action: 'source_deleted',
            details: { sourceId },
        },
    });
    return client_1.default.source.delete({
        where: { id: sourceId },
    });
}
/**
 * Get sources by type
 */
async function getSourcesByType(sourceType) {
    return client_1.default.source.findMany({
        where: { sourceType },
        include: {
            _count: {
                select: { assertions: true },
            },
        },
        orderBy: { createdAt: 'desc' },
    });
}
//# sourceMappingURL=sources.js.map