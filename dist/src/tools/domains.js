"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDomain = createDomain;
exports.getDomain = getDomain;
exports.listDomains = listDomains;
exports.updateDomain = updateDomain;
exports.deleteDomain = deleteDomain;
exports.findDomainByName = findDomainByName;
exports.updateDomainDiscoveryStats = updateDomainDiscoveryStats;
exports.getDomainEntities = getDomainEntities;
exports.getDomainSummary = getDomainSummary;
const client_1 = __importDefault(require("../db/client"));
/**
 * Create a new research domain
 */
async function createDomain(input) {
    const domain = await client_1.default.researchDomain.create({
        data: {
            name: input.name,
            description: input.description,
            entityTypes: input.entityTypes || ['tool'],
            inclusionCriteria: input.inclusionCriteria,
            exclusionCriteria: input.exclusionCriteria,
            searchHints: input.searchHints,
            knownLeaders: input.knownLeaders || [],
            relevantTopics: input.relevantTopics || [],
            evaluationDimensions: input.evaluationDimensions,
            createdBy: input.createdBy,
        },
    });
    await client_1.default.researchLog.create({
        data: {
            action: 'domain_created',
            details: { domainId: domain.id, name: domain.name },
        },
    });
    return domain;
}
/**
 * Get a domain by ID or name
 */
async function getDomain(identifier) {
    // Try by ID first, then by name
    let domain = await client_1.default.researchDomain.findUnique({
        where: { id: identifier },
        include: {
            _count: {
                select: { entities: true },
            },
        },
    });
    if (!domain) {
        domain = await client_1.default.researchDomain.findUnique({
            where: { name: identifier },
            include: {
                _count: {
                    select: { entities: true },
                },
            },
        });
    }
    return domain;
}
/**
 * List all research domains
 */
async function listDomains() {
    return client_1.default.researchDomain.findMany({
        include: {
            _count: {
                select: { entities: true },
            },
        },
        orderBy: { updatedAt: 'desc' },
    });
}
/**
 * Update a research domain
 */
async function updateDomain(domainId, input) {
    const domain = await client_1.default.researchDomain.update({
        where: { id: domainId },
        data: {
            ...input,
            updatedAt: new Date(),
        },
    });
    await client_1.default.researchLog.create({
        data: {
            action: 'domain_updated',
            details: { domainId: domain.id, changes: JSON.parse(JSON.stringify(input)) },
        },
    });
    return domain;
}
/**
 * Delete a research domain
 * Note: This will null out domainId on associated entities, not delete them
 */
async function deleteDomain(domainId) {
    // First, get the domain to log its name
    const domain = await client_1.default.researchDomain.findUnique({
        where: { id: domainId },
        select: { name: true },
    });
    await client_1.default.researchLog.create({
        data: {
            action: 'domain_deleted',
            details: { domainId, name: domain?.name },
        },
    });
    return client_1.default.researchDomain.delete({
        where: { id: domainId },
    });
}
/**
 * Find domain by name (case-insensitive)
 */
async function findDomainByName(name) {
    return client_1.default.researchDomain.findFirst({
        where: {
            name: {
                equals: name,
                mode: 'insensitive',
            },
        },
        include: {
            _count: {
                select: { entities: true },
            },
        },
    });
}
/**
 * Update domain entity count and last discovery timestamp
 */
async function updateDomainDiscoveryStats(domainId) {
    const entityCount = await client_1.default.entity.count({
        where: { domainId },
    });
    return client_1.default.researchDomain.update({
        where: { id: domainId },
        data: {
            entityCount,
            lastDiscoveryAt: new Date(),
        },
    });
}
/**
 * Get entities belonging to a domain
 */
async function getDomainEntities(domainId, options) {
    return client_1.default.entity.findMany({
        where: { domainId },
        include: {
            _count: {
                select: { assertions: true, extractions: true },
            },
        },
        orderBy: { createdAt: 'desc' },
        take: options?.limit,
        skip: options?.offset,
    });
}
/**
 * Get domain summary with statistics
 */
async function getDomainSummary(domainId) {
    const domain = await client_1.default.researchDomain.findUnique({
        where: { id: domainId },
        include: {
            _count: {
                select: { entities: true },
            },
        },
    });
    if (!domain)
        return null;
    // Get entity statistics
    const entities = await client_1.default.entity.findMany({
        where: { domainId },
        include: {
            _count: {
                select: { assertions: true, extractions: true },
            },
        },
    });
    const totalAssertions = entities.reduce((sum, e) => sum + e._count.assertions, 0);
    const totalExtractions = entities.reduce((sum, e) => sum + e._count.extractions, 0);
    const entitiesWithUrl = entities.filter(e => e.url).length;
    return {
        domain,
        statistics: {
            totalEntities: domain._count.entities,
            entitiesWithUrl,
            totalAssertions,
            totalExtractions,
            avgAssertionsPerEntity: domain._count.entities > 0 ? totalAssertions / domain._count.entities : 0,
            avgExtractionsPerEntity: domain._count.entities > 0 ? totalExtractions / domain._count.entities : 0,
        },
    };
}
//# sourceMappingURL=domains.js.map