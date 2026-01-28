/**
 * GitHub Metrics Tool - Fetch repository metrics from GitHub API
 *
 * Uses the public GitHub API (no auth required for basic metrics).
 * Rate limited to 60 requests/hour without auth, 5000 with auth.
 */

import { prisma } from '../db/client';

// ============================================
// TYPES
// ============================================

export interface GitHubRepoInfo {
  owner: string;
  repo: string;
}

export interface GitHubMetrics {
  stars: number;
  forks: number;
  watchers: number;
  openIssues: number;
  language: string | null;
  license: string | null;
  createdAt: Date;
  pushedAt: Date;  // Last commit
  contributors?: number;
  latestRelease?: Date;
}

export interface GitHubFetchResult {
  success: boolean;
  entityId: string;
  entityName: string;
  githubUrl?: string;
  metrics?: GitHubMetrics;
  error?: string;
}

// ============================================
// URL PARSING
// ============================================

/**
 * Parse a GitHub URL to extract owner and repo name
 */
export function parseGitHubUrl(url: string): GitHubRepoInfo | null {
  if (!url) return null;

  // Handle various GitHub URL formats:
  // https://github.com/owner/repo
  // https://github.com/owner/repo.git
  // https://github.com/owner/repo/tree/main
  // github.com/owner/repo
  // git@github.com:owner/repo.git

  let cleanUrl = url.trim();

  // Handle SSH format
  if (cleanUrl.startsWith('git@github.com:')) {
    cleanUrl = cleanUrl.replace('git@github.com:', 'https://github.com/');
  }

  // Remove .git suffix
  cleanUrl = cleanUrl.replace(/\.git$/, '');

  // Parse URL
  try {
    // Add protocol if missing
    if (!cleanUrl.startsWith('http')) {
      cleanUrl = 'https://' + cleanUrl;
    }

    const urlObj = new URL(cleanUrl);

    if (!urlObj.hostname.includes('github.com')) {
      return null;
    }

    const pathParts = urlObj.pathname.split('/').filter(Boolean);

    if (pathParts.length >= 2) {
      return {
        owner: pathParts[0],
        repo: pathParts[1],
      };
    }
  } catch {
    // Invalid URL
  }

  return null;
}

/**
 * Find GitHub URL for an entity by checking common patterns
 */
export async function findGitHubUrl(entityId: string): Promise<string | null> {
  const entity = await prisma.entity.findUnique({
    where: { id: entityId },
    include: {
      assertions: {
        include: { sources: { include: { source: true } } },
      },
    },
  });

  if (!entity) return null;

  // Check if entity already has a GitHub URL
  if (entity.githubUrl) {
    return entity.githubUrl;
  }

  // Check entity's main URL
  if (entity.url && entity.url.includes('github.com')) {
    return entity.url;
  }

  // Check assertion sources for GitHub URLs
  for (const assertion of entity.assertions) {
    for (const as of assertion.sources) {
      if (as.source.url.includes('github.com')) {
        return as.source.url;
      }
    }
  }

  return null;
}

// ============================================
// GITHUB API
// ============================================

const GITHUB_API_BASE = 'https://api.github.com';

/**
 * Fetch repository metadata from GitHub API
 */
async function fetchRepoMetadata(owner: string, repo: string): Promise<any> {
  const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}`;

  const headers: Record<string, string> = {
    Accept: 'application/vnd.github.v3+json',
    'User-Agent': 'DeepResearch/1.0',
  };

  // Use auth token if available (increases rate limit)
  if (process.env.GITHUB_TOKEN) {
    headers['Authorization'] = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  const response = await fetch(url, { headers });

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error(`Repository not found: ${owner}/${repo}`);
    }
    if (response.status === 403) {
      throw new Error('GitHub API rate limit exceeded. Set GITHUB_TOKEN for higher limits.');
    }
    throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

/**
 * Fetch contributor count (requires separate API call)
 */
async function fetchContributorCount(owner: string, repo: string): Promise<number> {
  const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/contributors?per_page=1&anon=true`;

  const headers: Record<string, string> = {
    Accept: 'application/vnd.github.v3+json',
    'User-Agent': 'DeepResearch/1.0',
  };

  if (process.env.GITHUB_TOKEN) {
    headers['Authorization'] = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  const response = await fetch(url, { headers });

  if (!response.ok) {
    return 0; // Non-critical, return 0 on failure
  }

  // GitHub returns contributor count in Link header
  const linkHeader = response.headers.get('Link');
  if (linkHeader) {
    // Parse "last" page number from Link header
    const match = linkHeader.match(/page=(\d+)>; rel="last"/);
    if (match) {
      return parseInt(match[1], 10);
    }
  }

  // If no pagination, count is in the response
  const data = await response.json();
  return Array.isArray(data) ? data.length : 0;
}

/**
 * Fetch latest release date
 */
async function fetchLatestRelease(owner: string, repo: string): Promise<Date | null> {
  const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/releases/latest`;

  const headers: Record<string, string> = {
    Accept: 'application/vnd.github.v3+json',
    'User-Agent': 'DeepResearch/1.0',
  };

  if (process.env.GITHUB_TOKEN) {
    headers['Authorization'] = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  const response = await fetch(url, { headers });

  if (!response.ok) {
    return null; // No releases or error
  }

  const data = await response.json();
  return data.published_at ? new Date(data.published_at) : null;
}

/**
 * Fetch all GitHub metrics for a repository
 */
export async function fetchGitHubMetrics(
  owner: string,
  repo: string
): Promise<GitHubMetrics> {
  // Fetch main repo data
  const repoData = await fetchRepoMetadata(owner, repo);

  // Fetch additional metrics in parallel
  const [contributors, latestRelease] = await Promise.all([
    fetchContributorCount(owner, repo).catch(() => undefined),
    fetchLatestRelease(owner, repo).catch(() => null),
  ]);

  return {
    stars: repoData.stargazers_count ?? 0,
    forks: repoData.forks_count ?? 0,
    watchers: repoData.subscribers_count ?? 0, // "watchers" in API is actually stars
    openIssues: repoData.open_issues_count ?? 0,
    language: repoData.language,
    license: repoData.license?.spdx_id ?? null,
    createdAt: new Date(repoData.created_at),
    pushedAt: new Date(repoData.pushed_at),
    contributors,
    latestRelease: latestRelease ?? undefined,
  };
}

// ============================================
// ENTITY OPERATIONS
// ============================================

/**
 * Fetch GitHub metrics for an entity and update the database
 */
export async function fetchEntityGitHubMetrics(input: {
  entityId: string;
  githubUrl?: string;
}): Promise<GitHubFetchResult> {
  const { entityId, githubUrl: providedUrl } = input;

  // Get entity
  const entity = await prisma.entity.findUnique({
    where: { id: entityId },
  });

  if (!entity) {
    return {
      success: false,
      entityId,
      entityName: 'Unknown',
      error: 'Entity not found',
    };
  }

  // Find GitHub URL
  let githubUrl = providedUrl || entity.githubUrl;

  if (!githubUrl) {
    githubUrl = await findGitHubUrl(entityId);
  }

  if (!githubUrl) {
    return {
      success: false,
      entityId,
      entityName: entity.name,
      error: 'No GitHub URL found for entity. Provide githubUrl parameter or add GitHub source.',
    };
  }

  // Parse URL
  const repoInfo = parseGitHubUrl(githubUrl);

  if (!repoInfo) {
    return {
      success: false,
      entityId,
      entityName: entity.name,
      githubUrl,
      error: `Invalid GitHub URL: ${githubUrl}`,
    };
  }

  try {
    // Fetch metrics
    const metrics = await fetchGitHubMetrics(repoInfo.owner, repoInfo.repo);

    // Update entity
    await prisma.entity.update({
      where: { id: entityId },
      data: {
        githubUrl,
        githubOwner: repoInfo.owner,
        githubRepo: repoInfo.repo,
        githubStars: metrics.stars,
        githubForks: metrics.forks,
        githubWatchers: metrics.watchers,
        githubOpenIssues: metrics.openIssues,
        githubContributors: metrics.contributors,
        githubLastCommit: metrics.pushedAt,
        githubLastRelease: metrics.latestRelease,
        githubLanguage: metrics.language,
        githubLicense: metrics.license,
        githubCreatedAt: metrics.createdAt,
        githubMetricsAt: new Date(),
      },
    });

    return {
      success: true,
      entityId,
      entityName: entity.name,
      githubUrl,
      metrics,
    };
  } catch (error) {
    return {
      success: false,
      entityId,
      entityName: entity.name,
      githubUrl,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Fetch GitHub metrics for all entities in a project that have GitHub URLs
 */
export async function fetchProjectGitHubMetrics(input: {
  projectId: string;
  forceRefresh?: boolean;
  maxAgeDays?: number;
}): Promise<{
  success: boolean;
  projectId: string;
  total: number;
  fetched: number;
  skipped: number;
  failed: number;
  results: GitHubFetchResult[];
}> {
  const { projectId, forceRefresh = false, maxAgeDays = 7 } = input;

  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - maxAgeDays);

  // Find entities that need GitHub metrics
  const entities = await prisma.entity.findMany({
    where: {
      projectId,
      OR: [
        { githubUrl: { not: null } },
        { url: { contains: 'github.com' } },
      ],
    },
  });

  const results: GitHubFetchResult[] = [];
  let fetched = 0;
  let skipped = 0;
  let failed = 0;

  for (const entity of entities) {
    // Skip if recently fetched (unless force refresh)
    if (
      !forceRefresh &&
      entity.githubMetricsAt &&
      entity.githubMetricsAt > cutoffDate
    ) {
      skipped++;
      continue;
    }

    const result = await fetchEntityGitHubMetrics({ entityId: entity.id });
    results.push(result);

    if (result.success) {
      fetched++;
    } else {
      failed++;
    }

    // Rate limit: wait 1 second between requests (conservative)
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }

  return {
    success: true,
    projectId,
    total: entities.length,
    fetched,
    skipped,
    failed,
    results,
  };
}

/**
 * Get entities ranked by GitHub stars
 */
export async function getEntitiesByGitHubStars(input: {
  projectId: string;
  limit?: number;
}): Promise<{
  success: boolean;
  entities: Array<{
    id: string;
    name: string;
    githubStars: number | null;
    githubForks: number | null;
    githubUrl: string | null;
  }>;
}> {
  const { projectId, limit = 20 } = input;

  const entities = await prisma.entity.findMany({
    where: {
      projectId,
      githubStars: { not: null },
    },
    orderBy: { githubStars: 'desc' },
    take: limit,
    select: {
      id: true,
      name: true,
      githubStars: true,
      githubForks: true,
      githubUrl: true,
    },
  });

  return {
    success: true,
    entities,
  };
}
