"use strict";
/**
 * Category Concept Tools - Building blocks within discovery categories
 *
 * Concepts explain WHY entities cluster within a category:
 * - METHODOLOGY: Architectural approaches (Device Farms, Record & Replay)
 * - TECHNOLOGY: Core technologies (Selenium, Playwright, WebDriver)
 * - STANDARD: Industry standards (W3C WebDriver, ISO 25010)
 * - PATTERN: Design/practice patterns (Shift-Left Testing, Continuous Testing)
 *
 * Concepts link to entities via ConceptEntityLink with correlation strength.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.createConcept = createConcept;
exports.getConcept = getConcept;
exports.listConcepts = listConcepts;
exports.updateConcept = updateConcept;
exports.deleteConcept = deleteConcept;
exports.linkConcept = linkConcept;
exports.unlinkConcept = unlinkConcept;
exports.getEntityConcepts = getEntityConcepts;
exports.getConceptEntities = getConceptEntities;
exports.getCategoryConceptMap = getCategoryConceptMap;
const client_1 = require("../db/client");
// ============================================
// CONCEPT CRUD
// ============================================
/**
 * Create or update a concept (upsert by [categoryId, name])
 */
async function createConcept(input) {
    const category = await client_1.prisma.discoveryCategory.findUnique({
        where: { id: input.categoryId },
    });
    if (!category) {
        return { success: false, error: `Category not found: ${input.categoryId}` };
    }
    const validTypes = ['METHODOLOGY', 'TECHNOLOGY', 'STANDARD', 'PATTERN'];
    if (!validTypes.includes(input.conceptType)) {
        return { success: false, error: `Invalid conceptType: ${input.conceptType}. Must be one of: ${validTypes.join(', ')}` };
    }
    const concept = await client_1.prisma.categoryConcept.upsert({
        where: {
            categoryId_name: {
                categoryId: input.categoryId,
                name: input.name,
            },
        },
        update: {
            displayName: input.displayName,
            description: input.description,
            conceptType: input.conceptType,
            url: input.url,
            maturity: input.maturity || 'established',
            discoveredBy: input.discoveredBy,
            evidenceDescription: input.evidenceDescription,
        },
        create: {
            categoryId: input.categoryId,
            name: input.name,
            displayName: input.displayName,
            description: input.description,
            conceptType: input.conceptType,
            url: input.url,
            maturity: input.maturity || 'established',
            discoveredBy: input.discoveredBy,
            evidenceDescription: input.evidenceDescription,
        },
        include: {
            category: { select: { id: true, name: true, displayName: true } },
            _count: { select: { entityLinks: true } },
        },
    });
    await client_1.prisma.researchLog.create({
        data: {
            action: 'concept_created',
            agentId: input.discoveredBy,
            details: {
                conceptId: concept.id,
                categoryId: input.categoryId,
                name: input.name,
                conceptType: input.conceptType,
            },
        },
    });
    return { success: true, data: concept };
}
/**
 * Get a concept by ID with entity link count
 */
async function getConcept(conceptId) {
    const concept = await client_1.prisma.categoryConcept.findUnique({
        where: { id: conceptId },
        include: {
            category: { select: { id: true, name: true, displayName: true } },
            entityLinks: {
                include: {
                    entity: { select: { id: true, name: true, url: true, buzzScore: true } },
                },
                orderBy: { strength: 'desc' },
            },
        },
    });
    if (!concept) {
        return { success: false, error: `Concept not found: ${conceptId}` };
    }
    return { success: true, data: concept };
}
/**
 * List concepts for a category, optionally filtered by type
 */
async function listConcepts(input) {
    const where = {
        categoryId: input.categoryId,
    };
    if (input.conceptType) {
        where.conceptType = input.conceptType;
    }
    const concepts = await client_1.prisma.categoryConcept.findMany({
        where,
        include: {
            _count: { select: { entityLinks: true } },
        },
        orderBy: [{ conceptType: 'asc' }, { name: 'asc' }],
    });
    // Group by type
    const byType = {};
    for (const concept of concepts) {
        const type = concept.conceptType;
        if (!byType[type])
            byType[type] = [];
        byType[type].push(concept);
    }
    return {
        success: true,
        data: {
            categoryId: input.categoryId,
            count: concepts.length,
            concepts,
            byType,
        },
    };
}
/**
 * Update a concept's fields
 */
async function updateConcept(conceptId, input) {
    const existing = await client_1.prisma.categoryConcept.findUnique({
        where: { id: conceptId },
    });
    if (!existing) {
        return { success: false, error: `Concept not found: ${conceptId}` };
    }
    if (input.conceptType) {
        const validTypes = ['METHODOLOGY', 'TECHNOLOGY', 'STANDARD', 'PATTERN'];
        if (!validTypes.includes(input.conceptType)) {
            return { success: false, error: `Invalid conceptType: ${input.conceptType}` };
        }
    }
    const updated = await client_1.prisma.categoryConcept.update({
        where: { id: conceptId },
        data: {
            ...(input.displayName !== undefined && { displayName: input.displayName }),
            ...(input.description !== undefined && { description: input.description }),
            ...(input.conceptType !== undefined && { conceptType: input.conceptType }),
            ...(input.url !== undefined && { url: input.url }),
            ...(input.maturity !== undefined && { maturity: input.maturity }),
            ...(input.evidenceDescription !== undefined && { evidenceDescription: input.evidenceDescription }),
        },
        include: {
            category: { select: { id: true, name: true, displayName: true } },
        },
    });
    return { success: true, data: updated };
}
/**
 * Delete a concept (cascades to entity links)
 */
async function deleteConcept(conceptId) {
    const existing = await client_1.prisma.categoryConcept.findUnique({
        where: { id: conceptId },
    });
    if (!existing) {
        return { success: false, error: `Concept not found: ${conceptId}` };
    }
    await client_1.prisma.categoryConcept.delete({
        where: { id: conceptId },
    });
    await client_1.prisma.researchLog.create({
        data: {
            action: 'concept_deleted',
            details: {
                conceptId,
                categoryId: existing.categoryId,
                name: existing.name,
            },
        },
    });
    return { success: true, data: { deleted: true } };
}
// ============================================
// CONCEPT-ENTITY LINKING
// ============================================
/**
 * Link a concept to an entity (upsert by [conceptId, entityId])
 */
async function linkConcept(input) {
    // Validate concept exists
    const concept = await client_1.prisma.categoryConcept.findUnique({
        where: { id: input.conceptId },
    });
    if (!concept) {
        return { success: false, error: `Concept not found: ${input.conceptId}` };
    }
    // Validate entity exists
    const entity = await client_1.prisma.entity.findUnique({
        where: { id: input.entityId },
    });
    if (!entity) {
        return { success: false, error: `Entity not found: ${input.entityId}` };
    }
    // Validate strength
    if (input.strength !== undefined && (input.strength < 0 || input.strength > 1)) {
        return { success: false, error: 'Strength must be between 0.0 and 1.0' };
    }
    // Validate linkType
    if (input.linkType) {
        const validLinkTypes = ['IMPLEMENTS', 'BUILT_ON', 'CONTRIBUTES_TO'];
        if (!validLinkTypes.includes(input.linkType)) {
            return { success: false, error: `Invalid linkType: ${input.linkType}. Must be one of: ${validLinkTypes.join(', ')}` };
        }
    }
    const link = await client_1.prisma.conceptEntityLink.upsert({
        where: {
            conceptId_entityId: {
                conceptId: input.conceptId,
                entityId: input.entityId,
            },
        },
        update: {
            linkType: input.linkType || 'IMPLEMENTS',
            strength: input.strength ?? 0.5,
            context: input.context,
        },
        create: {
            conceptId: input.conceptId,
            entityId: input.entityId,
            linkType: input.linkType || 'IMPLEMENTS',
            strength: input.strength ?? 0.5,
            context: input.context,
        },
        include: {
            concept: { select: { id: true, name: true, displayName: true, conceptType: true } },
            entity: { select: { id: true, name: true } },
        },
    });
    return { success: true, data: link };
}
/**
 * Remove a concept-entity link
 */
async function unlinkConcept(conceptId, entityId) {
    const existing = await client_1.prisma.conceptEntityLink.findUnique({
        where: {
            conceptId_entityId: {
                conceptId,
                entityId,
            },
        },
    });
    if (!existing) {
        return { success: false, error: `Link not found for concept ${conceptId} and entity ${entityId}` };
    }
    await client_1.prisma.conceptEntityLink.delete({
        where: { id: existing.id },
    });
    return { success: true, data: { deleted: true } };
}
// ============================================
// QUERY FUNCTIONS
// ============================================
/**
 * Get all concepts linked to an entity
 */
async function getEntityConcepts(entityId) {
    const entity = await client_1.prisma.entity.findUnique({
        where: { id: entityId },
        select: { id: true, name: true },
    });
    if (!entity) {
        return { success: false, error: `Entity not found: ${entityId}` };
    }
    const links = await client_1.prisma.conceptEntityLink.findMany({
        where: { entityId },
        include: {
            concept: {
                include: {
                    category: { select: { id: true, name: true, displayName: true } },
                },
            },
        },
        orderBy: [{ strength: 'desc' }],
    });
    // Group by concept type
    const byType = {};
    for (const link of links) {
        const type = link.concept.conceptType;
        if (!byType[type])
            byType[type] = [];
        byType[type].push(link);
    }
    return {
        success: true,
        data: {
            entity,
            count: links.length,
            links,
            byType,
        },
    };
}
/**
 * Get all entities linked to a concept
 */
async function getConceptEntities(conceptId) {
    const concept = await client_1.prisma.categoryConcept.findUnique({
        where: { id: conceptId },
        select: { id: true, name: true, displayName: true, conceptType: true },
    });
    if (!concept) {
        return { success: false, error: `Concept not found: ${conceptId}` };
    }
    const links = await client_1.prisma.conceptEntityLink.findMany({
        where: { conceptId },
        include: {
            entity: {
                select: {
                    id: true,
                    name: true,
                    url: true,
                    buzzScore: true,
                    logoSvgContent: true,
                },
            },
        },
        orderBy: { strength: 'desc' },
    });
    return {
        success: true,
        data: {
            concept,
            count: links.length,
            entities: links.map((l) => ({
                ...l.entity,
                linkType: l.linkType,
                strength: l.strength,
                context: l.context,
            })),
        },
    };
}
/**
 * Get the full concept map for a category (for Grove visualization)
 * Returns all concepts with their entity links and counts
 */
async function getCategoryConceptMap(categoryId) {
    const category = await client_1.prisma.discoveryCategory.findUnique({
        where: { id: categoryId },
        select: { id: true, name: true, displayName: true },
    });
    if (!category) {
        return { success: false, error: `Category not found: ${categoryId}` };
    }
    const concepts = await client_1.prisma.categoryConcept.findMany({
        where: { categoryId },
        include: {
            entityLinks: {
                include: {
                    entity: {
                        select: {
                            id: true,
                            name: true,
                            buzzScore: true,
                            logoSvgContent: true,
                        },
                    },
                },
                orderBy: { strength: 'desc' },
            },
        },
        orderBy: [{ conceptType: 'asc' }, { name: 'asc' }],
    });
    // Group by type for visualization
    const byType = {};
    for (const concept of concepts) {
        const type = concept.conceptType;
        if (!byType[type])
            byType[type] = [];
        byType[type].push(concept);
    }
    // Build entity-to-concepts lookup (for drawing connections)
    const entityConceptMap = {};
    for (const concept of concepts) {
        for (const link of concept.entityLinks) {
            if (!entityConceptMap[link.entityId]) {
                entityConceptMap[link.entityId] = [];
            }
            entityConceptMap[link.entityId].push({
                conceptId: concept.id,
                conceptName: concept.displayName,
                conceptType: concept.conceptType,
                strength: link.strength,
            });
        }
    }
    return {
        success: true,
        data: {
            category,
            conceptCount: concepts.length,
            concepts: concepts.map((c) => ({
                id: c.id,
                name: c.name,
                displayName: c.displayName,
                description: c.description,
                conceptType: c.conceptType,
                url: c.url,
                maturity: c.maturity,
                entityCount: c.entityLinks.length,
                entities: c.entityLinks.map((l) => ({
                    id: l.entity.id,
                    name: l.entity.name,
                    strength: l.strength,
                    linkType: l.linkType,
                })),
            })),
            byType,
            entityConceptMap,
        },
    };
}
//# sourceMappingURL=concepts.js.map