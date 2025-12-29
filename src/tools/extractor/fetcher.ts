/**
 * URL Fetcher - Playwright-based page fetching and screenshot capture
 *
 * Handles JavaScript-rendered content, captures screenshots for evidence,
 * and validates source URLs.
 */

import { chromium, Browser, Page } from 'playwright';
import * as fs from 'fs';
import * as path from 'path';
import * as crypto from 'crypto';

// ============================================
// TYPES
// ============================================

export interface FetchResult {
  success: boolean;
  url: string;
  finalUrl: string;  // After redirects
  statusCode: number;
  html: string;
  text: string;      // Visible text content
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

// ============================================
// BROWSER MANAGEMENT
// ============================================

let browserInstance: Browser | null = null;

async function getBrowser(): Promise<Browser> {
  if (!browserInstance) {
    browserInstance = await chromium.launch({
      headless: true,
    });
  }
  return browserInstance;
}

export async function closeBrowser(): Promise<void> {
  if (browserInstance) {
    await browserInstance.close();
    browserInstance = null;
  }
}

// ============================================
// PAGE FETCHING
// ============================================

export async function fetchUrl(url: string, options: FetchOptions = {}): Promise<FetchResult> {
  const {
    timeout = 30000,
    waitForSelector,
    userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  } = options;

  let page: Page | null = null;

  try {
    const browser = await getBrowser();
    page = await browser.newPage({
      userAgent,
    });

    // Navigate to URL
    const response = await page.goto(url, {
      timeout,
      waitUntil: 'networkidle',
    });

    if (!response) {
      return {
        success: false,
        url,
        finalUrl: url,
        statusCode: 0,
        html: '',
        text: '',
        contentHash: '',
        error: 'No response received',
      };
    }

    // Wait for optional selector
    if (waitForSelector) {
      try {
        await page.waitForSelector(waitForSelector, { timeout: 10000 });
      } catch {
        // Selector not found, but continue
      }
    }

    // Extract content
    const html = await page.content();
    const text = await page.evaluate(() => document.body.innerText);
    const finalUrl = page.url();
    const statusCode = response.status();

    // Generate content hash for change detection
    const contentHash = crypto.createHash('md5').update(text).digest('hex');

    return {
      success: statusCode >= 200 && statusCode < 400,
      url,
      finalUrl,
      statusCode,
      html,
      text,
      contentHash,
    };
  } catch (error) {
    return {
      success: false,
      url,
      finalUrl: url,
      statusCode: 0,
      html: '',
      text: '',
      contentHash: '',
      error: error instanceof Error ? error.message : String(error),
    };
  } finally {
    if (page) {
      await page.close();
    }
  }
}

// ============================================
// SCREENSHOT CAPTURE
// ============================================

export async function captureScreenshot(
  url: string,
  options: {
    fullPage?: boolean;
    selector?: string;
    directory?: string;
  } = {}
): Promise<ScreenshotResult> {
  const {
    fullPage = true,
    selector,
    directory = 'screenshots',
  } = options;

  let page: Page | null = null;

  try {
    const browser = await getBrowser();
    page = await browser.newPage({
      viewport: { width: 1920, height: 1080 },
    });

    await page.goto(url, {
      timeout: 30000,
      waitUntil: 'networkidle',
    });

    // Create directory structure: screenshots/YYYY-MM/
    const now = new Date();
    const monthDir = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
    const fullDir = path.join(directory, monthDir);

    if (!fs.existsSync(fullDir)) {
      fs.mkdirSync(fullDir, { recursive: true });
    }

    // Generate filename from URL
    const urlHash = crypto.createHash('md5').update(url).digest('hex').substring(0, 8);
    const urlSlug = new URL(url).hostname.replace(/\./g, '-');
    const filename = `${urlSlug}-${urlHash}.png`;
    const filePath = path.join(fullDir, filename);

    // Capture screenshot
    let screenshotOptions: any = {
      path: filePath,
      fullPage,
    };

    if (selector) {
      const element = await page.$(selector);
      if (element) {
        await element.screenshot({ path: filePath });
      } else {
        await page.screenshot(screenshotOptions);
      }
    } else {
      await page.screenshot(screenshotOptions);
    }

    // Get dimensions
    const viewport = page.viewportSize();

    return {
      success: true,
      filePath,
      width: viewport?.width,
      height: viewport?.height,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : String(error),
    };
  } finally {
    if (page) {
      await page.close();
    }
  }
}

// ============================================
// URL VALIDATION
// ============================================

export async function validateUrl(url: string): Promise<{
  isAccessible: boolean;
  statusCode: number;
  redirectUrl?: string;
  contentType?: string;
  error?: string;
}> {
  let page: Page | null = null;

  try {
    const browser = await getBrowser();
    page = await browser.newPage();

    const response = await page.goto(url, {
      timeout: 15000,
      waitUntil: 'domcontentloaded',
    });

    if (!response) {
      return {
        isAccessible: false,
        statusCode: 0,
        error: 'No response',
      };
    }

    const finalUrl = page.url();
    const headers = response.headers();

    return {
      isAccessible: response.status() >= 200 && response.status() < 400,
      statusCode: response.status(),
      redirectUrl: finalUrl !== url ? finalUrl : undefined,
      contentType: headers['content-type'],
    };
  } catch (error) {
    return {
      isAccessible: false,
      statusCode: 0,
      error: error instanceof Error ? error.message : String(error),
    };
  } finally {
    if (page) {
      await page.close();
    }
  }
}
