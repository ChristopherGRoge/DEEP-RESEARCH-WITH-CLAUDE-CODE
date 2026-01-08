/**
 * URL Fetcher - Playwright-based page fetching and screenshot capture
 *
 * Handles JavaScript-rendered content, captures screenshots for evidence,
 * and validates source URLs.
 */
export interface FetchResult {
    success: boolean;
    url: string;
    finalUrl: string;
    statusCode: number;
    html: string;
    text: string;
    contentHash: string;
    error?: string;
}
export interface ScreenshotResult {
    success: boolean;
    filePath?: string;
    width?: number;
    height?: number;
    error?: string;
}
export interface FetchOptions {
    timeout?: number;
    waitForSelector?: string;
    userAgent?: string;
}
export declare function closeBrowser(): Promise<void>;
export declare function fetchUrl(url: string, options?: FetchOptions): Promise<FetchResult>;
export declare function captureScreenshot(url: string, options?: {
    fullPage?: boolean;
    selector?: string;
    directory?: string;
}): Promise<ScreenshotResult>;
export declare function validateUrl(url: string): Promise<{
    isAccessible: boolean;
    statusCode: number;
    redirectUrl?: string;
    contentType?: string;
    error?: string;
}>;
//# sourceMappingURL=fetcher.d.ts.map