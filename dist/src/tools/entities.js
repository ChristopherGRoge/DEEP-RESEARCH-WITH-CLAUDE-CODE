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
exports.inferDiscoveryCategory = inferDiscoveryCategory;
exports.categorizeEntities = categorizeEntities;
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
            discoveryCategory: input.discoveryCategory || undefined,
            domainId: input.domainId || undefined,
        },
        create: {
            projectId: input.projectId,
            name: input.name,
            description: input.description,
            entityType: input.entityType,
            url: input.url,
            discoveryCategory: input.discoveryCategory,
            domainId: input.domainId,
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
            { name: { contains: input.query } },
            { description: { contains: input.query } },
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
            },
        },
    });
    return count > 0;
}
/**
 * Keyword patterns for inferring discovery category from entity name/description
 */
const categoryPatterns = {
    ai_code_assistants: [
        /\b(copilot|cursor|codeium|tabnine|code\s*completion|code\s*assist|ai\s*code|coding\s*assistant|ai\s*ide|code\s*editor|autocomplete|intellicode)\b/i,
        /\b(github\s*copilot|amazon\s*q|aws\s*codewhisperer|sourcegraph\s*cody|continue\.dev|supermaven|codegpt)\b/i,
    ],
    ai_code_review: [
        /\b(code\s*review|pull\s*request|pr\s*review|codacy|codeclimate|sonar|lint|static\s*analysis|code\s*quality)\b/i,
        /\b(codeball|gitclear|prhythm|bito|coderabbit|sourcery)\b/i,
    ],
    ai_debugging: [
        /\b(debug|debugger|error\s*detect|bug\s*find|exception|stack\s*trace|root\s*cause|troubleshoot)\b/i,
        /\b(whyline|buglab|sentry|raygun|rollbar)\b/i,
    ],
    ai_testing: [
        /\b(test|testing|qa|quality\s*assurance|unit\s*test|e2e|end.to.end|selenium|playwright|cypress|pytest)\b/i,
        /\b(qodo|codium|testim|mabl|katalon|functionize|applitools|launchable|autify)\b/i,
    ],
    ai_documentation: [
        /\b(document|documentation|readme|api\s*doc|javadoc|jsdoc|docstring|technical\s*writ|spec\s*writ)\b/i,
        /\b(mintlify|readme\.io|gitbook|stoplight|swimm|archbee)\b/i,
    ],
    ai_security: [
        /\b(security|secure|vulnerab|cve|sast|dast|appsec|pentest|penetration|exploit|malware|threat)\b/i,
        /\b(snyk|checkmarx|veracode|fortify|semgrep|sonatype|mend|aikido|orca|wiz)\b/i,
    ],
    ai_devops: [
        /\b(devops|ci\/cd|cicd|pipeline|deploy|kubernetes|k8s|docker|terraform|ansible|infrastructure|aiops)\b/i,
        /\b(harness|gitlab|circleci|jenkins|argo|flux|pulumi|spacelift|env0)\b/i,
    ],
    ai_analytics: [
        /\b(analytics|bi\b|business\s*intelligence|data\s*viz|dashboard|metric|insight|forecast|predict)\b/i,
        /\b(tableau|looker|powerbi|metabase|mode|thoughtspot|databricks|snowflake|dbt)\b/i,
    ],
    genai_concepts: [
        /\b(rag|retrieval|augment|agent|agentic|llm|large\s*language|prompt|langchain|llamaindex|vector|embedding)\b/i,
        /\b(autogen|crewai|semantic\s*kernel|guidance|dspy|instructor)\b/i,
    ],
};
/**
 * Infer the discovery category from entity name and description using keyword matching
 */
function inferDiscoveryCategory(name, description) {
    const text = `${name} ${description || ''}`.toLowerCase();
    // Score each category by number of pattern matches
    const scores = [];
    for (const [category, patterns] of Object.entries(categoryPatterns)) {
        let score = 0;
        for (const pattern of patterns) {
            const matches = text.match(pattern);
            if (matches) {
                score += matches.length;
            }
        }
        if (score > 0) {
            scores.push({ category: category, score });
        }
    }
    // Return highest scoring category, or null if no matches
    if (scores.length === 0)
        return null;
    scores.sort((a, b) => b.score - a.score);
    return scores[0].category;
}
/**
 * Categorize entities in a project using keyword pattern matching
 */
async function categorizeEntities(input) {
    const { projectId, dryRun = false, overwrite = false } = input;
    // Get all entities in the project
    const entities = await client_1.default.entity.findMany({
        where: { projectId },
        select: {
            id: true,
            name: true,
            description: true,
            discoveryCategory: true,
        },
    });
    const result = {
        total: entities.length,
        processed: 0,
        categorized: 0,
        skipped: 0,
        uncategorizable: 0,
        results: [],
    };
    for (const entity of entities) {
        result.processed++;
        // Skip if already has category and not overwriting
        if (entity.discoveryCategory && !overwrite) {
            result.skipped++;
            result.results.push({
                entityId: entity.id,
                name: entity.name,
                oldCategory: entity.discoveryCategory,
                newCategory: entity.discoveryCategory,
                status: 'skipped',
            });
            continue;
        }
        // Infer category
        const inferredCategory = inferDiscoveryCategory(entity.name, entity.description);
        if (!inferredCategory) {
            result.uncategorizable++;
            result.results.push({
                entityId: entity.id,
                name: entity.name,
                oldCategory: entity.discoveryCategory,
                newCategory: null,
                status: 'uncategorizable',
            });
            continue;
        }
        // Update entity if not dry run
        if (!dryRun) {
            await client_1.default.entity.update({
                where: { id: entity.id },
                data: { discoveryCategory: inferredCategory },
            });
        }
        result.categorized++;
        result.results.push({
            entityId: entity.id,
            name: entity.name,
            oldCategory: entity.discoveryCategory,
            newCategory: inferredCategory,
            status: 'categorized',
        });
    }
    // Log the categorization action
    if (!dryRun) {
        await client_1.default.researchLog.create({
            data: {
                action: 'entities_categorized',
                details: {
                    projectId,
                    total: result.total,
                    categorized: result.categorized,
                    uncategorizable: result.uncategorizable,
                },
            },
        });
    }
    return result;
}
//# sourceMappingURL=entities.js.map