"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_CATEGORIES = void 0;
exports.createCategory = createCategory;
exports.getCategory = getCategory;
exports.getCategoryByName = getCategoryByName;
exports.listCategories = listCategories;
exports.updateCategory = updateCategory;
exports.deleteCategory = deleteCategory;
exports.getCategoryWithEntities = getCategoryWithEntities;
exports.getCategorySummary = getCategorySummary;
exports.updateCategoryStats = updateCategoryStats;
exports.updateAllCategoryStats = updateAllCategoryStats;
exports.buildClassificationPrompt = buildClassificationPrompt;
exports.parseClassificationResponse = parseClassificationResponse;
exports.getClassificationContext = getClassificationContext;
exports.applyClassification = applyClassification;
exports.explainClassification = explainClassification;
exports.getUnclassifiedEntities = getUnclassifiedEntities;
exports.getReclassificationPreview = getReclassificationPreview;
exports.seedCategories = seedCategories;
exports.migrateFromLegacyCategories = migrateFromLegacyCategories;
exports.suggestCategoryIcon = suggestCategoryIcon;
exports.setCategoryIcon = setCategoryIcon;
exports.autoAssignCategoryIcons = autoAssignCategoryIcons;
exports.calculateCategoryWeight = calculateCategoryWeight;
exports.calculateAllCategoryWeights = calculateAllCategoryWeights;
const client_1 = __importDefault(require("../db/client"));
// ============================================
// CRUD OPERATIONS
// ============================================
/**
 * Create a new discovery category
 */
async function createCategory(input) {
    const category = await client_1.default.discoveryCategory.create({
        data: {
            name: input.name,
            displayName: input.displayName,
            description: input.description,
            inclusionCriteria: input.inclusionCriteria,
            exclusionCriteria: input.exclusionCriteria,
            exemplarEntities: input.exemplarEntities || [],
            antiExemplars: input.antiExemplars || [],
        },
    });
    await client_1.default.researchLog.create({
        data: {
            action: 'category_created',
            details: { categoryId: category.id, name: category.name },
        },
    });
    return category;
}
/**
 * Get a category by ID
 */
async function getCategory(categoryId) {
    return client_1.default.discoveryCategory.findUnique({
        where: { id: categoryId },
        include: {
            _count: {
                select: { entities: true },
            },
        },
    });
}
/**
 * Get a category by name
 */
async function getCategoryByName(name) {
    return client_1.default.discoveryCategory.findUnique({
        where: { name },
        include: {
            _count: {
                select: { entities: true },
            },
        },
    });
}
/**
 * List all categories
 */
async function listCategories() {
    return client_1.default.discoveryCategory.findMany({
        include: {
            _count: {
                select: { entities: true },
            },
        },
        orderBy: { name: 'asc' },
    });
}
/**
 * Update a category
 */
async function updateCategory(categoryId, input) {
    const category = await client_1.default.discoveryCategory.update({
        where: { id: categoryId },
        data: {
            ...input,
            updatedAt: new Date(),
        },
    });
    await client_1.default.researchLog.create({
        data: {
            action: 'category_updated',
            details: { categoryId: category.id, changes: JSON.parse(JSON.stringify(input)) },
        },
    });
    return category;
}
/**
 * Delete a category
 * Note: This will null out categoryId on associated entities, not delete them
 */
async function deleteCategory(categoryId) {
    // First, get the category to log its name
    const category = await client_1.default.discoveryCategory.findUnique({
        where: { id: categoryId },
        select: { name: true },
    });
    await client_1.default.researchLog.create({
        data: {
            action: 'category_deleted',
            details: { categoryId, name: category?.name },
        },
    });
    return client_1.default.discoveryCategory.delete({
        where: { id: categoryId },
    });
}
// ============================================
// ANALYSIS & STATISTICS
// ============================================
/**
 * Get category with all entities
 */
async function getCategoryWithEntities(categoryId, options) {
    const category = await client_1.default.discoveryCategory.findUnique({
        where: { id: categoryId },
        include: {
            entities: {
                include: {
                    _count: {
                        select: { assertions: true, extractions: true },
                    },
                },
                orderBy: { name: 'asc' },
                take: options?.limit,
                skip: options?.offset,
            },
            _count: {
                select: { entities: true },
            },
        },
    });
    return category;
}
/**
 * Get summary statistics for a category
 */
async function getCategorySummary(categoryId) {
    const category = await client_1.default.discoveryCategory.findUnique({
        where: { id: categoryId },
        include: {
            _count: {
                select: { entities: true },
            },
        },
    });
    if (!category)
        return null;
    // Get entity statistics
    const entities = await client_1.default.entity.findMany({
        where: { categoryId },
        include: {
            _count: {
                select: { assertions: true, extractions: true },
            },
        },
    });
    const totalAssertions = entities.reduce((sum, e) => sum + e._count.assertions, 0);
    const totalExtractions = entities.reduce((sum, e) => sum + e._count.extractions, 0);
    const entitiesWithUrl = entities.filter(e => e.url).length;
    const entitiesWithLogo = entities.filter(e => e.logoUrl || e.logoPath).length;
    return {
        category,
        statistics: {
            totalEntities: category._count.entities,
            entitiesWithUrl,
            entitiesWithLogo,
            totalAssertions,
            totalExtractions,
            avgAssertionsPerEntity: category._count.entities > 0 ? totalAssertions / category._count.entities : 0,
            avgExtractionsPerEntity: category._count.entities > 0 ? totalExtractions / category._count.entities : 0,
        },
    };
}
/**
 * Update category entity count
 */
async function updateCategoryStats(categoryId) {
    const entityCount = await client_1.default.entity.count({
        where: { categoryId },
    });
    return client_1.default.discoveryCategory.update({
        where: { id: categoryId },
        data: { entityCount },
    });
}
/**
 * Update stats for all categories
 */
async function updateAllCategoryStats() {
    const categories = await client_1.default.discoveryCategory.findMany({
        select: { id: true },
    });
    const results = [];
    for (const cat of categories) {
        const updated = await updateCategoryStats(cat.id);
        results.push({ categoryId: cat.id, entityCount: updated.entityCount });
    }
    return results;
}
// ============================================
// LLM CLASSIFICATION
// ============================================
/**
 * Build a classification prompt with all category definitions
 * This prompt is designed for Claude to reason about and classify entities
 */
async function buildClassificationPrompt(entityName, entityDescription) {
    const categories = await listCategories();
    const categoryDefinitions = categories.map(cat => `
### ${cat.displayName} (${cat.name})
${cat.description}

**Include if:** ${cat.inclusionCriteria || 'No specific criteria defined'}
**Exclude if:** ${cat.exclusionCriteria || 'No specific criteria defined'}
**Examples:** ${cat.exemplarEntities.length > 0 ? cat.exemplarEntities.join(', ') : 'None defined'}
**NOT this category:** ${cat.antiExemplars.length > 0 ? cat.antiExemplars.join(', ') : 'None defined'}
`).join('\n');
    return `You are classifying a software entity into one of the following categories.

## Entity to Classify
Name: ${entityName}
Description: ${entityDescription || 'No description available'}

## Available Categories
${categoryDefinitions}

## Instructions
1. Read the entity name and description carefully
2. Consider which category best fits based on the inclusion/exclusion criteria
3. Pay special attention to the examples and anti-exemplars
4. If the entity appears in anti-exemplars for a category, do NOT classify it there
5. Choose the most specific category that applies

Return your response as JSON in this exact format:
\`\`\`json
{
  "categoryName": "the_category_name",
  "confidence": "high|medium|low",
  "reasoning": "Brief explanation of why this category fits"
}
\`\`\`

Confidence levels:
- high: Entity clearly matches category definition and/or is similar to exemplars
- medium: Entity reasonably fits but could potentially belong elsewhere
- low: Best guess, entity doesn't clearly fit any category`;
}
/**
 * Parse a classification response from Claude
 * This is a helper to extract structured data from LLM output
 */
function parseClassificationResponse(response) {
    // Try to extract JSON from the response
    const jsonMatch = response.match(/```json\s*([\s\S]*?)\s*```/) ||
        response.match(/\{[\s\S]*"categoryName"[\s\S]*\}/);
    if (!jsonMatch) {
        return null;
    }
    try {
        const jsonStr = jsonMatch[1] || jsonMatch[0];
        const parsed = JSON.parse(jsonStr);
        if (!parsed.categoryName) {
            return null;
        }
        return {
            categoryId: '', // Will be filled in by caller
            categoryName: parsed.categoryName,
            confidence: parsed.confidence || 'medium',
            reasoning: parsed.reasoning || 'No reasoning provided',
        };
    }
    catch {
        return null;
    }
}
/**
 * Get classification context for an entity
 * Returns the prompt and metadata needed for classification
 */
async function getClassificationContext(entityId) {
    const entity = await client_1.default.entity.findUnique({
        where: { id: entityId },
        select: {
            id: true,
            name: true,
            description: true,
            categoryId: true,
            category: {
                select: { name: true, displayName: true },
            },
        },
    });
    if (!entity) {
        throw new Error(`Entity not found: ${entityId}`);
    }
    const prompt = await buildClassificationPrompt(entity.name, entity.description);
    return {
        entity: {
            id: entity.id,
            name: entity.name,
            description: entity.description,
            currentCategory: entity.category?.name || null,
            currentCategoryDisplay: entity.category?.displayName || null,
        },
        prompt,
    };
}
/**
 * Apply classification result to an entity
 * This saves the classification to the database
 */
async function applyClassification(entityId, classification) {
    // Find the category by name
    const category = await getCategoryByName(classification.categoryName);
    if (!category) {
        return {
            success: false,
            error: `Category not found: ${classification.categoryName}`,
        };
    }
    // Update the entity
    const entity = await client_1.default.entity.update({
        where: { id: entityId },
        data: {
            categoryId: category.id,
            // Also update the legacy field for backwards compatibility
            discoveryCategory: classification.categoryName,
        },
        include: {
            category: {
                select: { name: true, displayName: true },
            },
        },
    });
    // Update category stats
    await updateCategoryStats(category.id);
    // Log the classification
    await client_1.default.researchLog.create({
        data: {
            action: 'entity_classified',
            details: {
                entityId,
                categoryId: category.id,
                categoryName: classification.categoryName,
                confidence: classification.confidence,
                reasoning: classification.reasoning,
            },
        },
    });
    return { success: true, entity };
}
/**
 * Explain why an entity has its current classification
 */
async function explainClassification(entityId) {
    const entity = await client_1.default.entity.findUnique({
        where: { id: entityId },
        include: {
            category: true,
        },
    });
    if (!entity) {
        throw new Error(`Entity not found: ${entityId}`);
    }
    if (!entity.category) {
        return {
            entity: {
                id: entity.id,
                name: entity.name,
                description: entity.description,
            },
            classification: null,
            explanation: 'This entity has not been classified yet.',
            suggestedAction: 'Run category:classify to classify this entity.',
        };
    }
    // Check if entity is in exemplars or anti-exemplars
    const isExemplar = entity.category.exemplarEntities.some(e => e.toLowerCase() === entity.name.toLowerCase());
    const categories = await listCategories();
    const inAntiExemplars = categories
        .filter(c => c.antiExemplars.some(ae => ae.toLowerCase() === entity.name.toLowerCase()))
        .map(c => c.displayName);
    return {
        entity: {
            id: entity.id,
            name: entity.name,
            description: entity.description,
        },
        classification: {
            categoryId: entity.category.id,
            categoryName: entity.category.name,
            displayName: entity.category.displayName,
        },
        categoryDefinition: {
            description: entity.category.description,
            inclusionCriteria: entity.category.inclusionCriteria,
            exclusionCriteria: entity.category.exclusionCriteria,
            exemplarEntities: entity.category.exemplarEntities,
            antiExemplars: entity.category.antiExemplars,
        },
        analysis: {
            isExemplar,
            inAntiExemplarsFor: inAntiExemplars,
        },
        explanation: isExemplar
            ? `"${entity.name}" is listed as an exemplar entity for ${entity.category.displayName}.`
            : `"${entity.name}" is classified as ${entity.category.displayName} based on the category definition.`,
    };
}
/**
 * Get entities that need classification
 */
async function getUnclassifiedEntities(projectId, limit = 50) {
    const where = {
        categoryId: null,
    };
    if (projectId) {
        where.projectId = projectId;
    }
    return client_1.default.entity.findMany({
        where,
        select: {
            id: true,
            name: true,
            description: true,
            projectId: true,
            discoveryCategory: true,
        },
        orderBy: { createdAt: 'desc' },
        take: limit,
    });
}
async function getReclassificationPreview(options) {
    const { projectId, onlyUnclassified = false, limit = 100 } = options;
    const where = { projectId };
    if (onlyUnclassified) {
        where.categoryId = null;
    }
    const entities = await client_1.default.entity.findMany({
        where,
        include: {
            category: {
                select: { name: true, displayName: true },
            },
        },
        take: limit,
    });
    return {
        totalEntities: entities.length,
        withCategory: entities.filter(e => e.categoryId).length,
        withoutCategory: entities.filter(e => !e.categoryId).length,
        entities: entities.map(e => ({
            id: e.id,
            name: e.name,
            description: e.description,
            currentCategory: e.category?.name || null,
            legacyCategory: e.discoveryCategory,
        })),
        nextStep: 'Use the classification prompt from buildClassificationPrompt() to classify each entity',
    };
}
// ============================================
// SEED DATA
// ============================================
/**
 * Default category definitions for seeding
 */
exports.DEFAULT_CATEGORIES = [
    {
        name: 'ai_code_assistants',
        displayName: 'Code Assistants',
        description: 'AI-powered tools that assist developers with code completion, generation, and inline suggestions. These tools integrate directly into IDEs and provide real-time coding assistance as you type.',
        inclusionCriteria: 'Tools that: provide inline code completion, generate code from natural language prompts, integrate with IDEs/editors, offer real-time suggestions while coding',
        exclusionCriteria: 'Tools that: only review existing code without generating, only run tests, only generate documentation, are primarily security scanners',
        exemplarEntities: ['GitHub Copilot', 'Cursor', 'Codeium', 'Tabnine', 'Amazon Q Developer', 'Sourcegraph Cody', 'Continue', 'Supermaven'],
        antiExemplars: ['SonarQube', 'Snyk', 'Mintlify', 'Datadog', 'DocuWriter.ai', 'CodeRabbit', 'Codacy'],
    },
    {
        name: 'ai_code_review',
        displayName: 'Code Review',
        description: 'AI tools that analyze existing code for quality, bugs, style violations, and maintainability issues. These tools review code that has already been written rather than generating new code.',
        inclusionCriteria: 'Tools that: analyze pull requests, identify code quality issues, perform static analysis, suggest improvements to existing code, automate code review processes',
        exclusionCriteria: 'Tools that: generate new code from scratch, provide inline completions while typing, are primarily security-focused vulnerability scanners',
        exemplarEntities: ['CodeRabbit', 'Codacy', 'SonarQube', 'Sourcery', 'Codeball', 'GitClear', 'Bito'],
        antiExemplars: ['GitHub Copilot', 'Cursor', 'Snyk', 'Checkmarx'],
    },
    {
        name: 'ai_debugging',
        displayName: 'Debugging & Error Analysis',
        description: 'AI tools that help identify, diagnose, and fix bugs in code. These tools analyze errors, stack traces, and runtime behavior to help developers understand and resolve issues.',
        inclusionCriteria: 'Tools that: analyze error messages and stack traces, identify root causes of bugs, suggest fixes for runtime errors, help with troubleshooting, provide crash analytics',
        exclusionCriteria: 'Tools that: only generate new code, only perform static analysis without debugging context, are primarily monitoring/observability platforms',
        exemplarEntities: ['Sentry', 'Raygun', 'Rollbar', 'Bugsnag', 'Jam.dev'],
        antiExemplars: ['Datadog', 'New Relic', 'GitHub Copilot', 'SonarQube'],
    },
    {
        name: 'ai_testing',
        displayName: 'Testing & QA',
        description: 'AI tools that help with software testing, including test generation, test execution, and quality assurance automation. These tools focus on verifying code correctness.',
        inclusionCriteria: 'Tools that: generate unit tests, generate integration/E2E tests, automate test execution, provide test coverage analysis, help with QA automation',
        exclusionCriteria: 'Tools that: only generate production code, only review code without testing context, are primarily monitoring or observability tools',
        exemplarEntities: ['Qodo (formerly Codium)', 'Testim', 'Mabl', 'Katalon', 'Functionize', 'Applitools', 'Launchable', 'Autify'],
        antiExemplars: ['GitHub Copilot', 'Cursor', 'SonarQube', 'Datadog'],
    },
    {
        name: 'ai_documentation',
        displayName: 'Documentation',
        description: 'AI tools that help create, maintain, and improve software documentation. These tools generate or enhance documentation for code, APIs, and technical content.',
        inclusionCriteria: 'Tools that: generate code documentation, create API documentation, write README files, generate docstrings/comments, help with technical writing',
        exclusionCriteria: 'Tools that: only generate code, only review code, are general-purpose writing assistants without developer focus',
        exemplarEntities: ['Mintlify', 'ReadMe', 'GitBook', 'Stoplight', 'Swimm', 'Archbee', 'DocuWriter.ai'],
        antiExemplars: ['GitHub Copilot', 'Cursor', 'Grammarly', 'Notion AI'],
    },
    {
        name: 'ai_security',
        displayName: 'Security',
        description: 'AI tools focused on identifying security vulnerabilities, performing security analysis, and helping developers write more secure code. These tools prioritize finding and fixing security issues.',
        inclusionCriteria: 'Tools that: scan for security vulnerabilities, perform SAST/DAST analysis, identify CVEs, help with secure coding practices, analyze dependencies for security issues',
        exclusionCriteria: 'Tools that: only perform general code review without security focus, only generate code, are primarily compliance tools without security scanning',
        exemplarEntities: ['Snyk', 'Checkmarx', 'Veracode', 'Fortify', 'Semgrep', 'Sonatype', 'Mend', 'Aikido Security', 'Orca Security', 'Wiz'],
        antiExemplars: ['SonarQube', 'CodeRabbit', 'GitHub Copilot', 'Datadog'],
    },
    {
        name: 'ai_devops',
        displayName: 'DevOps & Infrastructure',
        description: 'AI tools that help with DevOps practices, CI/CD pipelines, infrastructure management, and deployment automation. These tools focus on the operational side of software development.',
        inclusionCriteria: 'Tools that: manage CI/CD pipelines, automate deployments, handle infrastructure as code, optimize Kubernetes/container operations, provide AIOps capabilities',
        exclusionCriteria: 'Tools that: only write application code, only perform code review, are primarily monitoring without operational automation',
        exemplarEntities: ['Harness', 'GitLab CI', 'CircleCI', 'Argo CD', 'Flux', 'Pulumi', 'Spacelift', 'env0'],
        antiExemplars: ['GitHub Copilot', 'Datadog', 'New Relic', 'SonarQube'],
    },
    {
        name: 'ai_analytics',
        displayName: 'Analytics & Observability',
        description: 'AI tools focused on monitoring, observability, and analytics for software systems. These tools help understand system behavior, performance, and usage patterns.',
        inclusionCriteria: 'Tools that: provide application performance monitoring, offer log analysis, deliver business intelligence for engineering, track metrics and dashboards, provide AI-powered insights into system behavior',
        exclusionCriteria: 'Tools that: only generate code, only perform static code analysis, are primarily debugging tools focused on individual errors',
        exemplarEntities: ['Datadog', 'New Relic', 'Dynatrace', 'Grafana', 'Splunk', 'Honeycomb', 'Langfuse'],
        antiExemplars: ['Sentry', 'GitHub Copilot', 'SonarQube', 'Snyk'],
    },
    {
        name: 'genai_concepts',
        displayName: 'GenAI & LLM Infrastructure',
        description: 'Frameworks, libraries, and platforms for building generative AI applications. These are tools for creating AI-powered applications rather than tools that use AI to help with coding.',
        inclusionCriteria: 'Tools that: provide LLM orchestration frameworks, offer RAG (retrieval augmented generation) capabilities, enable agent/agentic workflows, provide prompt management, offer vector databases or embedding infrastructure',
        exclusionCriteria: 'Tools that: use AI to help write code (those are code assistants), are end-user AI products, are AI-powered developer tools in other categories',
        exemplarEntities: ['LangChain', 'LlamaIndex', 'AutoGen', 'CrewAI', 'Semantic Kernel', 'DSPy', 'Instructor', 'Pinecone', 'Weaviate'],
        antiExemplars: ['GitHub Copilot', 'Cursor', 'ChatGPT', 'Claude'],
    },
];
/**
 * Seed default categories into the database
 * Will skip categories that already exist (by name)
 */
async function seedCategories() {
    const results = {
        created: [],
        skipped: [],
        errors: [],
    };
    for (const categoryData of exports.DEFAULT_CATEGORIES) {
        try {
            // Check if category already exists
            const existing = await getCategoryByName(categoryData.name);
            if (existing) {
                results.skipped.push(categoryData.name);
                continue;
            }
            // Create the category
            await createCategory(categoryData);
            results.created.push(categoryData.name);
        }
        catch (error) {
            results.errors.push({
                name: categoryData.name,
                error: error instanceof Error ? error.message : String(error),
            });
        }
    }
    return {
        success: results.errors.length === 0,
        summary: {
            total: exports.DEFAULT_CATEGORIES.length,
            created: results.created.length,
            skipped: results.skipped.length,
            errors: results.errors.length,
        },
        details: results,
    };
}
/**
 * Migrate entities from legacy discoveryCategory to new categoryId
 * Maps string values to database category records
 */
async function migrateFromLegacyCategories(options) {
    const { projectId, dryRun = false } = options || {};
    // Get all entities with legacy category but no new category
    const where = {
        discoveryCategory: { not: null },
        categoryId: null,
    };
    if (projectId) {
        where.projectId = projectId;
    }
    const entities = await client_1.default.entity.findMany({
        where,
        select: {
            id: true,
            name: true,
            discoveryCategory: true,
        },
    });
    const results = {
        total: entities.length,
        migrated: 0,
        categoryNotFound: 0,
        errors: 0,
        details: [],
    };
    for (const entity of entities) {
        const legacyCategory = entity.discoveryCategory;
        // Try to find matching category
        const category = await getCategoryByName(legacyCategory);
        if (!category) {
            results.categoryNotFound++;
            results.details.push({
                entityId: entity.id,
                name: entity.name,
                from: legacyCategory,
                to: null,
                status: 'category_not_found',
            });
            continue;
        }
        if (!dryRun) {
            try {
                await client_1.default.entity.update({
                    where: { id: entity.id },
                    data: { categoryId: category.id },
                });
                results.migrated++;
                results.details.push({
                    entityId: entity.id,
                    name: entity.name,
                    from: legacyCategory,
                    to: category.name,
                    status: 'migrated',
                });
            }
            catch (error) {
                results.errors++;
                results.details.push({
                    entityId: entity.id,
                    name: entity.name,
                    from: legacyCategory,
                    to: category.name,
                    status: 'error',
                });
            }
        }
        else {
            results.migrated++;
            results.details.push({
                entityId: entity.id,
                name: entity.name,
                from: legacyCategory,
                to: category.name,
                status: 'would_migrate',
            });
        }
    }
    // Update category stats if not dry run
    if (!dryRun) {
        await updateAllCategoryStats();
    }
    return {
        dryRun,
        ...results,
    };
}
// ============================================
// MATERIAL ICONS - Visual Identity
// ============================================
/**
 * Mapping of category names to contextually appropriate Google Material Icons
 * Icons are chosen based on the category's semantic meaning and visual recognition
 * Reference: https://fonts.google.com/icons
 */
const CATEGORY_ICON_MAPPING = {
    ai_code_assistants: 'smart_toy', // AI assistant/robot
    ai_code_review: 'rate_review', // Review/feedback
    ai_debugging: 'bug_report', // Bug/debugging
    ai_testing: 'science', // Testing/experimentation
    ai_documentation: 'description', // Documents
    ai_security: 'security', // Security shield
    ai_devops: 'settings_suggest', // DevOps/automation
    ai_analytics: 'insights', // Analytics/insights
    genai_concepts: 'psychology', // AI/brain concepts
};
/**
 * Alternative icons for each category (for variety)
 */
const CATEGORY_ICON_ALTERNATIVES = {
    ai_code_assistants: ['code', 'terminal', 'assistant', 'auto_fix_high', 'lightbulb'],
    ai_code_review: ['checklist', 'fact_check', 'grading', 'rule', 'verified'],
    ai_debugging: ['pest_control', 'troubleshoot', 'build_circle', 'emergency'],
    ai_testing: ['biotech', 'experiment', 'quiz', 'check_circle', 'verified_user'],
    ai_documentation: ['article', 'menu_book', 'library_books', 'edit_document', 'summarize'],
    ai_security: ['shield', 'lock', 'gpp_good', 'admin_panel_settings', 'verified_user'],
    ai_devops: ['integration_instructions', 'rocket_launch', 'engineering', 'developer_board', 'cloud_sync'],
    ai_analytics: ['query_stats', 'monitoring', 'bar_chart', 'trending_up', 'analytics'],
    genai_concepts: ['neurology', 'auto_awesome', 'model_training', 'hub', 'memory'],
};
/**
 * Suggest a Material Icon for a category based on its name and description
 */
async function suggestCategoryIcon(categoryIdOrName) {
    // Try to get category by ID first, then by name
    let category = await client_1.default.discoveryCategory.findUnique({
        where: { id: categoryIdOrName },
    });
    if (!category) {
        category = await client_1.default.discoveryCategory.findUnique({
            where: { name: categoryIdOrName },
        });
    }
    if (!category) {
        // For unknown category names, try to infer from the name
        const lowerName = categoryIdOrName.toLowerCase();
        // Infer from keywords in the name
        if (lowerName.includes('code') || lowerName.includes('assist') || lowerName.includes('copilot')) {
            return { icon: 'smart_toy', alternatives: CATEGORY_ICON_ALTERNATIVES.ai_code_assistants, confidence: 'inferred' };
        }
        if (lowerName.includes('review') || lowerName.includes('quality')) {
            return { icon: 'rate_review', alternatives: CATEGORY_ICON_ALTERNATIVES.ai_code_review, confidence: 'inferred' };
        }
        if (lowerName.includes('debug') || lowerName.includes('error') || lowerName.includes('bug')) {
            return { icon: 'bug_report', alternatives: CATEGORY_ICON_ALTERNATIVES.ai_debugging, confidence: 'inferred' };
        }
        if (lowerName.includes('test') || lowerName.includes('qa')) {
            return { icon: 'science', alternatives: CATEGORY_ICON_ALTERNATIVES.ai_testing, confidence: 'inferred' };
        }
        if (lowerName.includes('doc') || lowerName.includes('write')) {
            return { icon: 'description', alternatives: CATEGORY_ICON_ALTERNATIVES.ai_documentation, confidence: 'inferred' };
        }
        if (lowerName.includes('secur') || lowerName.includes('vuln')) {
            return { icon: 'security', alternatives: CATEGORY_ICON_ALTERNATIVES.ai_security, confidence: 'inferred' };
        }
        if (lowerName.includes('devops') || lowerName.includes('deploy') || lowerName.includes('ci')) {
            return { icon: 'settings_suggest', alternatives: CATEGORY_ICON_ALTERNATIVES.ai_devops, confidence: 'inferred' };
        }
        if (lowerName.includes('analytics') || lowerName.includes('monitor') || lowerName.includes('observ')) {
            return { icon: 'insights', alternatives: CATEGORY_ICON_ALTERNATIVES.ai_analytics, confidence: 'inferred' };
        }
        if (lowerName.includes('genai') || lowerName.includes('llm') || lowerName.includes('agent')) {
            return { icon: 'psychology', alternatives: CATEGORY_ICON_ALTERNATIVES.genai_concepts, confidence: 'inferred' };
        }
        // Default fallback
        return { icon: 'category', alternatives: ['apps', 'grid_view', 'view_module'], confidence: 'inferred' };
    }
    // Known category - use exact mapping
    const icon = CATEGORY_ICON_MAPPING[category.name] || 'category';
    const alternatives = CATEGORY_ICON_ALTERNATIVES[category.name] || ['apps', 'grid_view'];
    return {
        icon,
        alternatives,
        confidence: CATEGORY_ICON_MAPPING[category.name] ? 'exact' : 'inferred',
    };
}
/**
 * Set the Material Icon for a category
 */
async function setCategoryIcon(categoryId, iconName) {
    const category = await client_1.default.discoveryCategory.update({
        where: { id: categoryId },
        data: {
            materialIcon: iconName,
            updatedAt: new Date(),
        },
    });
    await client_1.default.researchLog.create({
        data: {
            action: 'category_icon_set',
            details: { categoryId, iconName },
        },
    });
    return category;
}
/**
 * Auto-assign icons to all categories that don't have one
 */
async function autoAssignCategoryIcons() {
    const categories = await client_1.default.discoveryCategory.findMany({
        where: {
            OR: [
                { materialIcon: null },
                { materialIcon: '' },
            ],
        },
    });
    const results = [];
    for (const cat of categories) {
        const suggestion = await suggestCategoryIcon(cat.name);
        const updated = await setCategoryIcon(cat.id, suggestion.icon);
        results.push({
            categoryId: cat.id,
            name: cat.name,
            icon: suggestion.icon,
            confidence: suggestion.confidence,
        });
    }
    return {
        updated: results.length,
        categories: results,
    };
}
/**
 * Calculate weight for a category based on entity count and cumulative buzz
 *
 * Formula: weight = (avgBuzz * entityCount * 0.5) + (entityCount * 0.5)
 * This blends "quality" (avg buzz) with "quantity" (entity count)
 */
async function calculateCategoryWeight(categoryId) {
    const category = await client_1.default.discoveryCategory.findUnique({
        where: { id: categoryId },
        include: {
            entities: {
                select: {
                    buzzScore: true,
                },
            },
        },
    });
    if (!category)
        return null;
    const entityCount = category.entities.length;
    const buzzScores = category.entities.map(e => e.buzzScore || 0);
    const totalBuzz = buzzScores.reduce((sum, b) => sum + b, 0);
    const avgBuzz = entityCount > 0 ? totalBuzz / entityCount : 0;
    // Blend formula: 50% from buzz quality, 50% from entity volume
    // Normalize avgBuzz (0-1) and scale entityCount logarithmically
    const buzzComponent = avgBuzz * Math.log10(Math.max(1, entityCount) + 1);
    const countComponent = Math.log10(Math.max(1, entityCount) + 1);
    const weight = (buzzComponent * 0.5) + (countComponent * 0.5);
    return {
        categoryId: category.id,
        categoryName: category.name,
        displayName: category.displayName,
        materialIcon: category.materialIcon,
        entityCount,
        totalBuzz,
        avgBuzz,
        weight,
        normalizedWeight: 0, // Will be calculated when comparing across categories
    };
}
/**
 * Calculate weights for all categories in a project
 * Returns weights normalized to 0-1 range for visualization sizing
 */
async function calculateAllCategoryWeights(projectId) {
    // Get all categories
    const categories = await client_1.default.discoveryCategory.findMany({
        include: {
            entities: {
                where: projectId ? { projectId } : undefined,
                select: {
                    buzzScore: true,
                },
            },
        },
    });
    const weights = [];
    for (const category of categories) {
        const entityCount = category.entities.length;
        if (entityCount === 0)
            continue; // Skip empty categories
        const buzzScores = category.entities.map(e => e.buzzScore || 0);
        const totalBuzz = buzzScores.reduce((sum, b) => sum + b, 0);
        const avgBuzz = totalBuzz / entityCount;
        // Blend formula
        const buzzComponent = avgBuzz * Math.log10(entityCount + 1);
        const countComponent = Math.log10(entityCount + 1);
        const weight = (buzzComponent * 0.5) + (countComponent * 0.5);
        weights.push({
            categoryId: category.id,
            categoryName: category.name,
            displayName: category.displayName,
            materialIcon: category.materialIcon,
            entityCount,
            totalBuzz,
            avgBuzz,
            weight,
            normalizedWeight: 0,
        });
    }
    // Normalize weights to 0-1 range
    const maxWeight = Math.max(...weights.map(w => w.weight), 1);
    const minWeight = Math.min(...weights.map(w => w.weight), 0);
    const range = maxWeight - minWeight || 1;
    for (const w of weights) {
        w.normalizedWeight = (w.weight - minWeight) / range;
    }
    // Sort by weight descending
    weights.sort((a, b) => b.weight - a.weight);
    return {
        categories: weights,
        maxWeight,
        minWeight,
    };
}
//# sourceMappingURL=categories.js.map