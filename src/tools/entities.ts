import prisma from '../db/client';

// Valid discovery categories for the /discover skill
export type DiscoveryCategory =
  | 'ai_code_assistants'
  | 'ai_code_review'
  | 'ai_debugging'
  | 'ai_testing'
  | 'ai_documentation'
  | 'ai_security'
  | 'ai_devops'
  | 'ai_analytics'
  | 'genai_concepts';

export interface CreateEntityInput {
  projectId: string;
  name: string;
  description?: string;
  entityType?: string;
  url?: string;
  discoveryCategory?: DiscoveryCategory | string;  // DEPRECATED: Use domainId
  domainId?: string;  // New domain-driven categorization
}

export interface UpdateEntityInput {
  name?: string;
  description?: string;
  entityType?: string;
  url?: string;
  discoveryCategory?: DiscoveryCategory | string;  // DEPRECATED: Use domainId
  domainId?: string;  // New domain-driven categorization
}

export interface SearchEntitiesInput {
  projectId?: string;
  query?: string;
  entityType?: string;
}

/**
 * Create a new entity within a project
 * Uses upsert to avoid duplicates - if entity with same name exists, returns existing
 */
export async function createEntity(input: CreateEntityInput) {
  const entity = await prisma.entity.upsert({
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

  await prisma.researchLog.create({
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
export async function getEntity(entityId: string) {
  return prisma.entity.findUnique({
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
export async function findEntityByName(projectId: string, name: string) {
  return prisma.entity.findFirst({
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
export async function listEntities(projectId: string) {
  return prisma.entity.findMany({
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
export async function searchEntities(input: SearchEntitiesInput) {
  const where: any = {};

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

  return prisma.entity.findMany({
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
export async function updateEntity(entityId: string, input: UpdateEntityInput) {
  const entity = await prisma.entity.update({
    where: { id: entityId },
    data: input,
  });

  await prisma.researchLog.create({
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
export async function deleteEntity(entityId: string) {
  await prisma.researchLog.create({
    data: {
      action: 'entity_deleted',
      details: { entityId },
    },
  });

  return prisma.entity.delete({
    where: { id: entityId },
  });
}

/**
 * Check if an entity exists by name in a project
 */
export async function entityExists(projectId: string, name: string): Promise<boolean> {
  const count = await prisma.entity.count({
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
const categoryPatterns: Record<DiscoveryCategory, RegExp[]> = {
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
export function inferDiscoveryCategory(name: string, description?: string | null): DiscoveryCategory | null {
  const text = `${name} ${description || ''}`.toLowerCase();

  // Score each category by number of pattern matches
  const scores: { category: DiscoveryCategory; score: number }[] = [];

  for (const [category, patterns] of Object.entries(categoryPatterns)) {
    let score = 0;
    for (const pattern of patterns) {
      const matches = text.match(pattern);
      if (matches) {
        score += matches.length;
      }
    }
    if (score > 0) {
      scores.push({ category: category as DiscoveryCategory, score });
    }
  }

  // Return highest scoring category, or null if no matches
  if (scores.length === 0) return null;

  scores.sort((a, b) => b.score - a.score);
  return scores[0].category;
}

export interface CategorizeEntitiesInput {
  projectId: string;
  dryRun?: boolean; // If true, don't update, just return what would be categorized
  overwrite?: boolean; // If true, re-categorize even if already has a category
}

export interface CategorizeEntitiesResult {
  total: number;
  processed: number;
  categorized: number;
  skipped: number;
  uncategorizable: number;
  results: {
    entityId: string;
    name: string;
    oldCategory: string | null;
    newCategory: string | null;
    status: 'categorized' | 'skipped' | 'uncategorizable';
  }[];
}

/**
 * Categorize entities in a project using keyword pattern matching
 */
export async function categorizeEntities(input: CategorizeEntitiesInput): Promise<CategorizeEntitiesResult> {
  const { projectId, dryRun = false, overwrite = false } = input;

  // Get all entities in the project
  const entities = await prisma.entity.findMany({
    where: { projectId },
    select: {
      id: true,
      name: true,
      description: true,
      discoveryCategory: true,
    },
  });

  const result: CategorizeEntitiesResult = {
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
      await prisma.entity.update({
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
    await prisma.researchLog.create({
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
