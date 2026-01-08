/**
 * Logo Tools - Fetch, verify, and store entity logos
 *
 * Workflow:
 * 1. logo:search - Find potential logo URLs for an entity
 * 2. logo:verify - Verify a URL returns a valid image
 * 3. logo:download - Download and store logo locally
 * 4. logo:save - Update entity with logo information
 *
 * Or use the combined workflow:
 * 1. logo:fetch - Search, verify, download, and save in one step
 */
export interface LogoSearchResult {
    success: boolean;
    entityId: string;
    entityName: string;
    candidates: LogoCandidate[];
    searchedPages: string[];
    error?: string;
}
export interface LogoCandidate {
    url: string;
    format: string;
    source: string;
    confidence: number;
    reason: string;
}
export interface LogoVerifyResult {
    success: boolean;
    url: string;
    isValid: boolean;
    format?: string;
    width?: number;
    height?: number;
    sizeBytes?: number;
    error?: string;
}
export interface LogoDownloadResult {
    success: boolean;
    url: string;
    localPath?: string;
    format?: string;
    sizeBytes?: number;
    svgContent?: string;
    error?: string;
}
export interface LogoSaveInput {
    entityId: string;
    logoUrl: string;
    logoSourceUrl?: string;
    logoFormat?: string;
    svgContent?: string;
    download?: boolean;
}
export interface LogoSaveResult {
    success: boolean;
    entityId: string;
    entityName: string;
    logoUrl: string;
    logoPath?: string;
    logoFormat?: string;
    hasSvgContent?: boolean;
    error?: string;
}
export declare function closeLogoBrowser(): Promise<void>;
/**
 * Search for logo URLs on an entity's website
 */
export declare function searchForLogo(entityId: string): Promise<LogoSearchResult>;
/**
 * Verify that a URL returns a valid image
 */
export declare function verifyLogoUrl(url: string): Promise<LogoVerifyResult>;
/**
 * Download a logo and save it locally
 */
export declare function downloadLogo(url: string, entityName: string): Promise<LogoDownloadResult>;
/**
 * Save logo information to an entity
 */
export declare function saveLogo(input: LogoSaveInput): Promise<LogoSaveResult>;
/**
 * Full workflow: search, verify, download, and save logo
 * Prioritizes SVG format for inline storage
 */
export declare function fetchLogo(entityId: string): Promise<{
    success: boolean;
    entityName: string;
    logoUrl?: string;
    logoPath?: string;
    logoFormat?: string;
    hasSvgContent?: boolean;
    searchedPages?: string[];
    candidatesFound?: number;
    error?: string;
}>;
/**
 * Get entities without logos
 */
export declare function getEntitiesWithoutLogos(projectId?: string): Promise<Array<{
    id: string;
    name: string;
    url: string | null;
    hasUrl: boolean;
}>>;
/**
 * Get logo status summary for a project
 */
export declare function getLogoSummary(projectId: string): Promise<{
    total: number;
    withLogo: number;
    withoutLogo: number;
    verified: number;
    downloaded: number;
    coverage: number;
    entitiesNeedingLogos: Array<{
        id: string;
        name: string;
        hasUrl: boolean;
    }>;
}>;
/**
 * Verify a logo (human action)
 */
export declare function verifyEntityLogo(entityId: string, verifiedBy: string): Promise<{
    success: boolean;
    error?: string;
}>;
/**
 * Clear logo from entity
 */
export declare function clearLogo(entityId: string): Promise<{
    success: boolean;
    error?: string;
}>;
/**
 * Get inline SVG content for an entity
 * Returns the raw SVG markup for direct embedding in HTML/documents
 */
export declare function getLogoInline(entityId: string): Promise<{
    success: boolean;
    entityId: string;
    entityName: string;
    format?: string;
    svgContent?: string;
    logoUrl?: string;
    error?: string;
}>;
//# sourceMappingURL=logos.d.ts.map