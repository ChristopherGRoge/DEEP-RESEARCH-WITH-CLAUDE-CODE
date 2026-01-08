"use strict";
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
exports.closeLogoBrowser = closeLogoBrowser;
exports.searchForLogo = searchForLogo;
exports.verifyLogoUrl = verifyLogoUrl;
exports.downloadLogo = downloadLogo;
exports.saveLogo = saveLogo;
exports.fetchLogo = fetchLogo;
exports.getEntitiesWithoutLogos = getEntitiesWithoutLogos;
exports.getLogoSummary = getLogoSummary;
exports.verifyEntityLogo = verifyEntityLogo;
exports.clearLogo = clearLogo;
exports.getLogoInline = getLogoInline;
const playwright_1 = require("playwright");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const crypto = __importStar(require("crypto"));
const https = __importStar(require("https"));
const http = __importStar(require("http"));
const client_1 = require("../db/client");
// ============================================
// CONSTANTS
// ============================================
const LOGO_DIR = 'logos';
const SUPPORTED_FORMATS = ['svg', 'png', 'jpg', 'jpeg', 'webp', 'gif'];
// Common logo-related paths to check
const LOGO_PATHS = [
    '/press',
    '/press-kit',
    '/presskit',
    '/brand',
    '/brand-assets',
    '/branding',
    '/media',
    '/media-kit',
    '/about',
    '/company',
    '/assets',
    '/resources',
];
// Common logo filename patterns
const LOGO_PATTERNS = [
    /logo/i,
    /brand/i,
    /mark/i,
    /icon/i,
    /symbol/i,
];
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
async function closeLogoBrowser() {
    if (browserInstance) {
        await browserInstance.close();
        browserInstance = null;
    }
}
// ============================================
// LOGO SEARCH
// ============================================
/**
 * Search for logo URLs on an entity's website
 */
async function searchForLogo(entityId) {
    // Get entity
    const entity = await client_1.prisma.entity.findUnique({
        where: { id: entityId },
    });
    if (!entity) {
        return {
            success: false,
            entityId,
            entityName: '',
            candidates: [],
            searchedPages: [],
            error: `Entity not found: ${entityId}`,
        };
    }
    if (!entity.url) {
        return {
            success: false,
            entityId,
            entityName: entity.name,
            candidates: [],
            searchedPages: [],
            error: 'Entity has no URL',
        };
    }
    const candidates = [];
    const searchedPages = [];
    let page = null;
    try {
        const browser = await getBrowser();
        page = await browser.newPage({
            userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        });
        const baseUrl = new URL(entity.url);
        // Search the main page and common logo paths
        const pagesToSearch = [
            entity.url,
            ...LOGO_PATHS.map(p => `${baseUrl.origin}${p}`),
        ];
        for (const pageUrl of pagesToSearch) {
            try {
                const response = await page.goto(pageUrl, {
                    timeout: 15000,
                    waitUntil: 'domcontentloaded',
                });
                if (!response || response.status() >= 400) {
                    continue;
                }
                searchedPages.push(pageUrl);
                // Find all images on the page
                const images = await page.evaluate(() => {
                    const imgs = [];
                    // Check <img> tags
                    document.querySelectorAll('img').forEach(img => {
                        if (img.src) {
                            imgs.push({
                                src: img.src,
                                alt: img.alt || '',
                                classes: img.className || '',
                                id: img.id || '',
                                width: img.naturalWidth || img.width || 0,
                                height: img.naturalHeight || img.height || 0,
                            });
                        }
                    });
                    // Check SVG elements with links
                    document.querySelectorAll('svg').forEach(svg => {
                        const use = svg.querySelector('use');
                        if (use) {
                            const href = use.getAttribute('href') || use.getAttribute('xlink:href');
                            if (href) {
                                imgs.push({
                                    src: href,
                                    alt: 'svg',
                                    classes: svg.className.baseVal || '',
                                    id: svg.id || '',
                                    width: 0,
                                    height: 0,
                                });
                            }
                        }
                    });
                    // Check CSS background images
                    const elements = document.querySelectorAll('[class*="logo"], [id*="logo"], header img, nav img');
                    elements.forEach(el => {
                        const style = window.getComputedStyle(el);
                        const bgImage = style.backgroundImage;
                        if (bgImage && bgImage !== 'none') {
                            const match = bgImage.match(/url\(['"]?([^'"]+)['"]?\)/);
                            if (match) {
                                imgs.push({
                                    src: match[1],
                                    alt: 'background',
                                    classes: el.className || '',
                                    id: el.id || '',
                                    width: 0,
                                    height: 0,
                                });
                            }
                        }
                    });
                    return imgs;
                });
                // Score each image as potential logo
                for (const img of images) {
                    const score = scoreLogoCandidate(img, entity.name, pageUrl);
                    if (score > 0.3) {
                        const format = getImageFormat(img.src);
                        if (format && SUPPORTED_FORMATS.includes(format)) {
                            candidates.push({
                                url: img.src,
                                format,
                                source: pageUrl,
                                confidence: score,
                                reason: getScoreReason(img, entity.name),
                            });
                        }
                    }
                }
                // Also look for direct links to logo files
                const links = await page.evaluate(() => {
                    const anchors = [];
                    document.querySelectorAll('a').forEach(a => {
                        if (a.href)
                            anchors.push(a.href);
                    });
                    return anchors;
                });
                for (const link of links) {
                    if (isLogoLink(link, entity.name)) {
                        const format = getImageFormat(link);
                        if (format && SUPPORTED_FORMATS.includes(format)) {
                            candidates.push({
                                url: link,
                                format,
                                source: pageUrl,
                                confidence: 0.8,
                                reason: 'Direct link to logo file',
                            });
                        }
                    }
                }
            }
            catch {
                // Page not accessible, continue to next
                continue;
            }
        }
        // Deduplicate and sort by confidence
        const uniqueCandidates = deduplicateCandidates(candidates);
        uniqueCandidates.sort((a, b) => b.confidence - a.confidence);
        return {
            success: true,
            entityId,
            entityName: entity.name,
            candidates: uniqueCandidates.slice(0, 10), // Top 10
            searchedPages,
        };
    }
    catch (error) {
        return {
            success: false,
            entityId,
            entityName: entity.name,
            candidates: [],
            searchedPages,
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
// LOGO VERIFICATION
// ============================================
/**
 * Verify that a URL returns a valid image
 */
async function verifyLogoUrl(url) {
    return new Promise((resolve) => {
        try {
            const parsedUrl = new URL(url);
            const protocol = parsedUrl.protocol === 'https:' ? https : http;
            const request = protocol.request(url, {
                method: 'HEAD',
                timeout: 10000,
            }, (response) => {
                const contentType = response.headers['content-type'] || '';
                const contentLength = parseInt(response.headers['content-length'] || '0', 10);
                // Check if it's an image
                const isImage = contentType.includes('image/') ||
                    contentType.includes('svg') ||
                    url.endsWith('.svg');
                if (!isImage || response.statusCode !== 200) {
                    resolve({
                        success: true,
                        url,
                        isValid: false,
                        error: `Not a valid image: ${contentType} (status ${response.statusCode})`,
                    });
                    return;
                }
                // Determine format
                let format = 'unknown';
                if (contentType.includes('svg'))
                    format = 'svg';
                else if (contentType.includes('png'))
                    format = 'png';
                else if (contentType.includes('jpeg') || contentType.includes('jpg'))
                    format = 'jpg';
                else if (contentType.includes('webp'))
                    format = 'webp';
                else if (contentType.includes('gif'))
                    format = 'gif';
                else {
                    // Try to determine from URL
                    const urlFormat = getImageFormat(url);
                    if (urlFormat)
                        format = urlFormat;
                }
                resolve({
                    success: true,
                    url,
                    isValid: true,
                    format,
                    sizeBytes: contentLength,
                });
            });
            request.on('error', (error) => {
                resolve({
                    success: false,
                    url,
                    isValid: false,
                    error: error.message,
                });
            });
            request.on('timeout', () => {
                request.destroy();
                resolve({
                    success: false,
                    url,
                    isValid: false,
                    error: 'Request timeout',
                });
            });
            request.end();
        }
        catch (error) {
            resolve({
                success: false,
                url,
                isValid: false,
                error: error instanceof Error ? error.message : String(error),
            });
        }
    });
}
// ============================================
// LOGO DOWNLOAD
// ============================================
/**
 * Download a logo and save it locally
 */
async function downloadLogo(url, entityName) {
    return new Promise((resolve) => {
        try {
            const parsedUrl = new URL(url);
            const protocol = parsedUrl.protocol === 'https:' ? https : http;
            const request = protocol.get(url, {
                timeout: 30000,
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                },
            }, (response) => {
                // Handle redirects
                if (response.statusCode === 301 || response.statusCode === 302) {
                    const redirectUrl = response.headers.location;
                    if (redirectUrl) {
                        downloadLogo(redirectUrl, entityName).then(resolve);
                        return;
                    }
                }
                if (response.statusCode !== 200) {
                    resolve({
                        success: false,
                        url,
                        error: `HTTP ${response.statusCode}`,
                    });
                    return;
                }
                // Determine format
                const contentType = response.headers['content-type'] || '';
                let format = getImageFormat(url) || 'png';
                if (contentType.includes('svg'))
                    format = 'svg';
                else if (contentType.includes('png'))
                    format = 'png';
                else if (contentType.includes('jpeg') || contentType.includes('jpg'))
                    format = 'jpg';
                else if (contentType.includes('webp'))
                    format = 'webp';
                // Create logos directory
                const logoDir = path.resolve(LOGO_DIR);
                if (!fs.existsSync(logoDir)) {
                    fs.mkdirSync(logoDir, { recursive: true });
                }
                // Generate filename
                const slug = entityName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
                const hash = crypto.createHash('md5').update(url).digest('hex').substring(0, 6);
                const filename = `${slug}-${hash}.${format}`;
                const filePath = path.join(logoDir, filename);
                // Download file
                const chunks = [];
                response.on('data', (chunk) => chunks.push(chunk));
                response.on('end', () => {
                    const buffer = Buffer.concat(chunks);
                    fs.writeFileSync(filePath, buffer);
                    // Extract SVG content if it's an SVG
                    let svgContent;
                    if (format === 'svg') {
                        svgContent = buffer.toString('utf-8');
                        // Validate it looks like SVG
                        if (!svgContent.includes('<svg') || !svgContent.includes('</svg>')) {
                            svgContent = undefined;
                        }
                    }
                    resolve({
                        success: true,
                        url,
                        localPath: filePath,
                        format,
                        sizeBytes: buffer.length,
                        svgContent,
                    });
                });
            });
            request.on('error', (error) => {
                resolve({
                    success: false,
                    url,
                    error: error.message,
                });
            });
            request.on('timeout', () => {
                request.destroy();
                resolve({
                    success: false,
                    url,
                    error: 'Download timeout',
                });
            });
        }
        catch (error) {
            resolve({
                success: false,
                url,
                error: error instanceof Error ? error.message : String(error),
            });
        }
    });
}
// ============================================
// SAVE LOGO TO ENTITY
// ============================================
/**
 * Save logo information to an entity
 */
async function saveLogo(input) {
    const { entityId, logoUrl, logoSourceUrl, logoFormat, svgContent: inputSvgContent, download = true } = input;
    // Get entity
    const entity = await client_1.prisma.entity.findUnique({
        where: { id: entityId },
    });
    if (!entity) {
        return {
            success: false,
            entityId,
            entityName: '',
            logoUrl,
            error: `Entity not found: ${entityId}`,
        };
    }
    let localPath;
    let format = logoFormat;
    let svgContent = inputSvgContent;
    // Verify the logo URL
    const verification = await verifyLogoUrl(logoUrl);
    if (!verification.isValid) {
        return {
            success: false,
            entityId,
            entityName: entity.name,
            logoUrl,
            error: verification.error || 'Logo URL is not valid',
        };
    }
    format = format || verification.format;
    // Download if requested (SVG content is extracted during download)
    if (download) {
        const downloadResult = await downloadLogo(logoUrl, entity.name);
        if (downloadResult.success) {
            localPath = downloadResult.localPath;
            format = downloadResult.format;
            // Use downloaded SVG content if we don't already have it
            if (!svgContent && downloadResult.svgContent) {
                svgContent = downloadResult.svgContent;
            }
        }
    }
    // Update entity with SVG content stored inline
    await client_1.prisma.entity.update({
        where: { id: entityId },
        data: {
            logoUrl,
            logoPath: localPath,
            logoFormat: format,
            logoSvgContent: svgContent, // Store SVG inline in database
            logoSourceUrl,
            logoFetchedAt: new Date(),
            logoVerified: false, // Needs human verification
        },
    });
    return {
        success: true,
        entityId,
        entityName: entity.name,
        logoUrl,
        logoPath: localPath,
        logoFormat: format,
        hasSvgContent: !!svgContent,
    };
}
// ============================================
// COMBINED FETCH WORKFLOW
// ============================================
/**
 * Full workflow: search, verify, download, and save logo
 * Prioritizes SVG format for inline storage
 */
async function fetchLogo(entityId) {
    // Search for logos
    const searchResult = await searchForLogo(entityId);
    if (!searchResult.success) {
        return {
            success: false,
            entityName: searchResult.entityName,
            error: searchResult.error,
        };
    }
    if (searchResult.candidates.length === 0) {
        return {
            success: false,
            entityName: searchResult.entityName,
            searchedPages: searchResult.searchedPages,
            candidatesFound: 0,
            error: 'No logo candidates found',
        };
    }
    // Prioritize SVG candidates - try them first for inline storage
    const svgCandidates = searchResult.candidates.filter(c => c.format === 'svg');
    const otherCandidates = searchResult.candidates.filter(c => c.format !== 'svg');
    const orderedCandidates = [...svgCandidates, ...otherCandidates];
    // Try candidates in order (SVGs first, then by confidence)
    for (const candidate of orderedCandidates) {
        const saveResult = await saveLogo({
            entityId,
            logoUrl: candidate.url,
            logoSourceUrl: candidate.source,
            logoFormat: candidate.format,
            download: true,
        });
        if (saveResult.success) {
            return {
                success: true,
                entityName: searchResult.entityName,
                logoUrl: saveResult.logoUrl,
                logoPath: saveResult.logoPath,
                logoFormat: saveResult.logoFormat,
                hasSvgContent: saveResult.hasSvgContent,
                searchedPages: searchResult.searchedPages,
                candidatesFound: searchResult.candidates.length,
            };
        }
    }
    return {
        success: false,
        entityName: searchResult.entityName,
        searchedPages: searchResult.searchedPages,
        candidatesFound: searchResult.candidates.length,
        error: 'All logo candidates failed verification',
    };
}
// ============================================
// QUERY FUNCTIONS
// ============================================
/**
 * Get entities without logos
 */
async function getEntitiesWithoutLogos(projectId) {
    const where = {
        logoUrl: null,
    };
    if (projectId) {
        where.projectId = projectId;
    }
    const entities = await client_1.prisma.entity.findMany({
        where,
        select: {
            id: true,
            name: true,
            url: true,
        },
        orderBy: { name: 'asc' },
    });
    return entities.map(e => ({
        id: e.id,
        name: e.name,
        url: e.url,
        hasUrl: !!e.url,
    }));
}
/**
 * Get logo status summary for a project
 */
async function getLogoSummary(projectId) {
    const entities = await client_1.prisma.entity.findMany({
        where: { projectId },
        select: {
            id: true,
            name: true,
            url: true,
            logoUrl: true,
            logoPath: true,
            logoVerified: true,
        },
    });
    const withLogo = entities.filter(e => e.logoUrl);
    const verified = entities.filter(e => e.logoVerified);
    const downloaded = entities.filter(e => e.logoPath);
    const needingLogos = entities
        .filter(e => !e.logoUrl)
        .map(e => ({ id: e.id, name: e.name, hasUrl: !!e.url }))
        .slice(0, 20);
    return {
        total: entities.length,
        withLogo: withLogo.length,
        withoutLogo: entities.length - withLogo.length,
        verified: verified.length,
        downloaded: downloaded.length,
        coverage: entities.length > 0
            ? Math.round((withLogo.length / entities.length) * 100)
            : 0,
        entitiesNeedingLogos: needingLogos,
    };
}
/**
 * Verify a logo (human action)
 */
async function verifyEntityLogo(entityId, verifiedBy) {
    const entity = await client_1.prisma.entity.findUnique({
        where: { id: entityId },
    });
    if (!entity) {
        return { success: false, error: 'Entity not found' };
    }
    if (!entity.logoUrl) {
        return { success: false, error: 'Entity has no logo' };
    }
    await client_1.prisma.entity.update({
        where: { id: entityId },
        data: {
            logoVerified: true,
        },
    });
    // Log the verification
    await client_1.prisma.researchLog.create({
        data: {
            action: 'logo_verified',
            details: {
                entityId,
                entityName: entity.name,
                logoUrl: entity.logoUrl,
                verifiedBy,
            },
        },
    });
    return { success: true };
}
/**
 * Clear logo from entity
 */
async function clearLogo(entityId) {
    const entity = await client_1.prisma.entity.findUnique({
        where: { id: entityId },
    });
    if (!entity) {
        return { success: false, error: 'Entity not found' };
    }
    // Delete local file if exists
    if (entity.logoPath && fs.existsSync(entity.logoPath)) {
        fs.unlinkSync(entity.logoPath);
    }
    await client_1.prisma.entity.update({
        where: { id: entityId },
        data: {
            logoUrl: null,
            logoPath: null,
            logoFormat: null,
            logoSvgContent: null,
            logoSourceUrl: null,
            logoFetchedAt: null,
            logoVerified: false,
        },
    });
    return { success: true };
}
/**
 * Get inline SVG content for an entity
 * Returns the raw SVG markup for direct embedding in HTML/documents
 */
async function getLogoInline(entityId) {
    const entity = await client_1.prisma.entity.findUnique({
        where: { id: entityId },
        select: {
            id: true,
            name: true,
            logoUrl: true,
            logoFormat: true,
            logoSvgContent: true,
            logoPath: true,
        },
    });
    if (!entity) {
        return {
            success: false,
            entityId,
            entityName: '',
            error: 'Entity not found',
        };
    }
    if (!entity.logoUrl) {
        return {
            success: false,
            entityId,
            entityName: entity.name,
            error: 'Entity has no logo',
        };
    }
    // Return inline SVG if available in database
    if (entity.logoSvgContent) {
        return {
            success: true,
            entityId,
            entityName: entity.name,
            format: 'svg',
            svgContent: entity.logoSvgContent,
            logoUrl: entity.logoUrl,
        };
    }
    // Try to read from local file if it's an SVG
    if (entity.logoFormat === 'svg' && entity.logoPath && fs.existsSync(entity.logoPath)) {
        const content = fs.readFileSync(entity.logoPath, 'utf-8');
        if (content.includes('<svg') && content.includes('</svg>')) {
            // Also store it in database for future use
            await client_1.prisma.entity.update({
                where: { id: entityId },
                data: { logoSvgContent: content },
            });
            return {
                success: true,
                entityId,
                entityName: entity.name,
                format: 'svg',
                svgContent: content,
                logoUrl: entity.logoUrl,
            };
        }
    }
    // Not an SVG or no inline content available
    return {
        success: false,
        entityId,
        entityName: entity.name,
        format: entity.logoFormat || undefined,
        logoUrl: entity.logoUrl,
        error: entity.logoFormat === 'svg'
            ? 'SVG content not available inline'
            : `Logo is ${entity.logoFormat}, not SVG. Use logoUrl instead.`,
    };
}
// ============================================
// HELPER FUNCTIONS
// ============================================
function getImageFormat(url) {
    const match = url.match(/\.(svg|png|jpe?g|webp|gif)(\?|$)/i);
    if (match) {
        const format = match[1].toLowerCase();
        return format === 'jpeg' ? 'jpg' : format;
    }
    return null;
}
function scoreLogoCandidate(img, entityName, pageUrl) {
    let score = 0;
    const src = img.src.toLowerCase();
    const alt = img.alt.toLowerCase();
    const classes = img.classes.toLowerCase();
    const id = img.id.toLowerCase();
    const entityLower = entityName.toLowerCase();
    // Check for logo keywords
    if (LOGO_PATTERNS.some(p => p.test(src)))
        score += 0.3;
    if (LOGO_PATTERNS.some(p => p.test(alt)))
        score += 0.2;
    if (LOGO_PATTERNS.some(p => p.test(classes)))
        score += 0.2;
    if (LOGO_PATTERNS.some(p => p.test(id)))
        score += 0.2;
    // Check for entity name
    if (src.includes(entityLower.replace(/\s+/g, '')))
        score += 0.3;
    if (alt.includes(entityLower))
        score += 0.2;
    // STRONGLY prefer SVG (can be stored inline, scales infinitely)
    if (src.endsWith('.svg'))
        score += 0.5;
    // Penalize very small or very large images
    if (img.width > 0 && img.height > 0) {
        if (img.width < 20 || img.height < 20)
            score -= 0.3;
        if (img.width > 1000 || img.height > 1000)
            score -= 0.2;
    }
    // Boost if on press/brand page
    if (pageUrl.includes('press') || pageUrl.includes('brand'))
        score += 0.2;
    // Penalize common non-logo patterns
    if (src.includes('avatar') || src.includes('profile'))
        score -= 0.5;
    if (src.includes('banner') || src.includes('hero'))
        score -= 0.3;
    if (src.includes('screenshot') || src.includes('demo'))
        score -= 0.3;
    return Math.min(1, Math.max(0, score));
}
function getScoreReason(img, entityName) {
    const reasons = [];
    const src = img.src.toLowerCase();
    const alt = img.alt.toLowerCase();
    const classes = img.classes.toLowerCase();
    if (LOGO_PATTERNS.some(p => p.test(src)))
        reasons.push('logo in filename');
    if (LOGO_PATTERNS.some(p => p.test(alt)))
        reasons.push('logo in alt text');
    if (LOGO_PATTERNS.some(p => p.test(classes)))
        reasons.push('logo class');
    if (src.includes(entityName.toLowerCase()))
        reasons.push('entity name in URL');
    if (src.endsWith('.svg'))
        reasons.push('SVG format');
    return reasons.join(', ') || 'potential match';
}
function isLogoLink(url, entityName) {
    const lower = url.toLowerCase();
    const entityLower = entityName.toLowerCase().replace(/\s+/g, '');
    // Must be an image file
    if (!getImageFormat(url))
        return false;
    // Check for logo indicators
    if (LOGO_PATTERNS.some(p => p.test(lower)))
        return true;
    if (lower.includes(entityLower) && getImageFormat(url))
        return true;
    return false;
}
function deduplicateCandidates(candidates) {
    const seen = new Set();
    return candidates.filter(c => {
        const normalized = c.url.split('?')[0]; // Remove query params
        if (seen.has(normalized))
            return false;
        seen.add(normalized);
        return true;
    });
}
//# sourceMappingURL=logos.js.map