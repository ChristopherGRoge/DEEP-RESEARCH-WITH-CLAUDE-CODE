"use strict";
/**
 * URL Fetcher - Playwright-based page fetching and screenshot capture
 *
 * Handles JavaScript-rendered content, captures screenshots for evidence,
 * and validates source URLs.
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.closeBrowser = closeBrowser;
exports.fetchUrl = fetchUrl;
exports.captureScreenshot = captureScreenshot;
exports.validateUrl = validateUrl;
const playwright_1 = require("playwright");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const crypto = __importStar(require("crypto"));
// ============================================
// BROWSER MANAGEMENT
// ============================================
let browserInstance = null;
async function getBrowser() {
    if (!browserInstance) {
        browserInstance = await playwright_1.chromium.launch({
            headless: true,
        });
    }
    return browserInstance;
}
async function closeBrowser() {
    if (browserInstance) {
        await browserInstance.close();
        browserInstance = null;
    }
}
// ============================================
// PAGE FETCHING
// ============================================
async function fetchUrl(url, options = {}) {
    const { timeout = 30000, waitForSelector, userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36', } = options;
    let page = null;
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
            }
            catch {
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
    }
    catch (error) {
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
    }
    finally {
        if (page) {
            await page.close();
        }
    }
}
// ============================================
// SCREENSHOT CAPTURE
// ============================================
async function captureScreenshot(url, options = {}) {
    const { fullPage = true, selector, directory = 'screenshots', } = options;
    let page = null;
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
        let screenshotOptions = {
            path: filePath,
            fullPage,
        };
        if (selector) {
            const element = await page.$(selector);
            if (element) {
                await element.screenshot({ path: filePath });
            }
            else {
                await page.screenshot(screenshotOptions);
            }
        }
        else {
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
    }
    catch (error) {
        return {
            success: false,
            error: error instanceof Error ? error.message : String(error),
        };
    }
    finally {
        if (page) {
            await page.close();
        }
    }
}
// ============================================
// URL VALIDATION
// ============================================
async function validateUrl(url) {
    let page = null;
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
    }
    catch (error) {
        return {
            isAccessible: false,
            statusCode: 0,
            error: error instanceof Error ? error.message : String(error),
        };
    }
    finally {
        if (page) {
            await page.close();
        }
    }
}
//# sourceMappingURL=fetcher.js.map