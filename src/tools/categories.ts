import prisma from '../db/client';

// ============================================
// DISCOVERY CATEGORY TOOLS
// LLM-based semantic entity classification
// ============================================

export interface CreateCategoryInput {
  name: string;
  displayName: string;
  description: string;
  inclusionCriteria?: string;
  exclusionCriteria?: string;
  exemplarEntities?: string[];
  antiExemplars?: string[];
}

export interface UpdateCategoryInput {
  displayName?: string;
  description?: string;
  inclusionCriteria?: string;
  exclusionCriteria?: string;
  exemplarEntities?: string[];
  antiExemplars?: string[];
}

export interface ClassificationResult {
  categoryId: string;
  categoryName: string;
  confidence: 'high' | 'medium' | 'low';
  reasoning: string;
}

export interface ReclassifyResult {
  total: number;
  processed: number;
  changed: number;
  unchanged: number;
  errors: number;
  results: {
    entityId: string;
    name: string;
    oldCategory: string | null;
    newCategory: string | null;
    confidence: string;
    reasoning: string;
    status: 'changed' | 'unchanged' | 'error';
  }[];
}

// ============================================
// CRUD OPERATIONS
// ============================================

/**
 * Create a new discovery category
 */
export async function createCategory(input: CreateCategoryInput) {
  const category = await prisma.discoveryCategory.create({
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

  await prisma.researchLog.create({
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
export async function getCategory(categoryId: string) {
  return prisma.discoveryCategory.findUnique({
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
export async function getCategoryByName(name: string) {
  return prisma.discoveryCategory.findUnique({
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
export async function listCategories() {
  return prisma.discoveryCategory.findMany({
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
export async function updateCategory(categoryId: string, input: UpdateCategoryInput) {
  const category = await prisma.discoveryCategory.update({
    where: { id: categoryId },
    data: {
      ...input,
      updatedAt: new Date(),
    },
  });

  await prisma.researchLog.create({
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
export async function deleteCategory(categoryId: string) {
  // First, get the category to log its name
  const category = await prisma.discoveryCategory.findUnique({
    where: { id: categoryId },
    select: { name: true },
  });

  await prisma.researchLog.create({
    data: {
      action: 'category_deleted',
      details: { categoryId, name: category?.name },
    },
  });

  return prisma.discoveryCategory.delete({
    where: { id: categoryId },
  });
}

// ============================================
// ANALYSIS & STATISTICS
// ============================================

/**
 * Get category with all entities
 */
export async function getCategoryWithEntities(categoryId: string, options?: { limit?: number; offset?: number }) {
  const category = await prisma.discoveryCategory.findUnique({
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
export async function getCategorySummary(categoryId: string) {
  const category = await prisma.discoveryCategory.findUnique({
    where: { id: categoryId },
    include: {
      _count: {
        select: { entities: true },
      },
    },
  });

  if (!category) return null;

  // Get entity statistics
  const entities = await prisma.entity.findMany({
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
export async function updateCategoryStats(categoryId: string) {
  const entityCount = await prisma.entity.count({
    where: { categoryId },
  });

  return prisma.discoveryCategory.update({
    where: { id: categoryId },
    data: { entityCount },
  });
}

/**
 * Update stats for all categories
 */
export async function updateAllCategoryStats() {
  const categories = await prisma.discoveryCategory.findMany({
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
export async function buildClassificationPrompt(
  entityName: string,
  entityDescription?: string | null
): Promise<string> {
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
export function parseClassificationResponse(response: string): ClassificationResult | null {
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
  } catch {
    return null;
  }
}

/**
 * Get classification context for an entity
 * Returns the prompt and metadata needed for classification
 */
export async function getClassificationContext(entityId: string) {
  const entity = await prisma.entity.findUnique({
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
export async function applyClassification(
  entityId: string,
  classification: ClassificationResult
): Promise<{ success: boolean; entity?: any; error?: string }> {
  // Find the category by name
  const category = await getCategoryByName(classification.categoryName);

  if (!category) {
    return {
      success: false,
      error: `Category not found: ${classification.categoryName}`,
    };
  }

  // Update the entity
  const entity = await prisma.entity.update({
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
  await prisma.researchLog.create({
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
export async function explainClassification(entityId: string) {
  const entity = await prisma.entity.findUnique({
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
  const isExemplar = entity.category.exemplarEntities.some(
    e => e.toLowerCase() === entity.name.toLowerCase()
  );
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
export async function getUnclassifiedEntities(projectId?: string, limit: number = 50) {
  const where: any = {
    categoryId: null,
  };

  if (projectId) {
    where.projectId = projectId;
  }

  return prisma.entity.findMany({
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

/**
 * Get reclassification preview for a project
 * Returns what would change without actually changing anything
 */
export interface ReclassifyOptions {
  projectId: string;
  dryRun?: boolean;
  onlyUnclassified?: boolean;
  limit?: number;
}

export async function getReclassificationPreview(options: ReclassifyOptions) {
  const { projectId, onlyUnclassified = false, limit = 100 } = options;

  const where: any = { projectId };
  if (onlyUnclassified) {
    where.categoryId = null;
  }

  const entities = await prisma.entity.findMany({
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
export const DEFAULT_CATEGORIES: CreateCategoryInput[] = [
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
export async function seedCategories() {
  const results = {
    created: [] as string[],
    skipped: [] as string[],
    errors: [] as { name: string; error: string }[],
  };

  for (const categoryData of DEFAULT_CATEGORIES) {
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
    } catch (error) {
      results.errors.push({
        name: categoryData.name,
        error: error instanceof Error ? error.message : String(error),
      });
    }
  }

  return {
    success: results.errors.length === 0,
    summary: {
      total: DEFAULT_CATEGORIES.length,
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
export async function migrateFromLegacyCategories(options?: { projectId?: string; dryRun?: boolean }) {
  const { projectId, dryRun = false } = options || {};

  // Get all entities with legacy category but no new category
  const where: any = {
    discoveryCategory: { not: null },
    categoryId: null,
  };
  if (projectId) {
    where.projectId = projectId;
  }

  const entities = await prisma.entity.findMany({
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
    details: [] as { entityId: string; name: string; from: string; to: string | null; status: string }[],
  };

  for (const entity of entities) {
    const legacyCategory = entity.discoveryCategory!;

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
        await prisma.entity.update({
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
      } catch (error) {
        results.errors++;
        results.details.push({
          entityId: entity.id,
          name: entity.name,
          from: legacyCategory,
          to: category.name,
          status: 'error',
        });
      }
    } else {
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
