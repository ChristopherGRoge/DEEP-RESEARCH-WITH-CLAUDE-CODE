/**
 * GitHub Metrics Tool - Fetch repository metrics from GitHub API
 *
 * Uses the public GitHub API (no auth required for basic metrics).
 * Rate limited to 60 requests/hour without auth, 5000 with auth.
 */
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
    pushedAt: Date;
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
/**
 * Parse a GitHub URL to extract owner and repo name
 */
export declare function parseGitHubUrl(url: string): GitHubRepoInfo | null;
/**
 * Find GitHub URL for an entity by checking common patterns
 */
export declare function findGitHubUrl(entityId: string): Promise<string | null>;
/**
 * Fetch all GitHub metrics for a repository
 */
export declare function fetchGitHubMetrics(owner: string, repo: string): Promise<GitHubMetrics>;
/**
 * Fetch GitHub metrics for an entity and update the database
 */
export declare function fetchEntityGitHubMetrics(input: {
    entityId: string;
    githubUrl?: string;
}): Promise<GitHubFetchResult>;
/**
 * Fetch GitHub metrics for all entities in a project that have GitHub URLs
 */
export declare function fetchProjectGitHubMetrics(input: {
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
}>;
/**
 * Get entities ranked by GitHub stars
 */
export declare function getEntitiesByGitHubStars(input: {
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
}>;
//# sourceMappingURL=github.d.ts.map