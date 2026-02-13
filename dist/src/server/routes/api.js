"use strict";
/**
 * REST API routes for validation server
 * Wraps existing database tools for HTTP access
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
const hono_1 = require("hono");
const tools = __importStar(require("../../tools"));
const auth_1 = require("../middleware/auth");
const client_1 = require("../../../generated/prisma/client");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const assessment_1 = require("../agent/assessment");
const investigate_1 = require("../agent/investigate");
const api = new hono_1.Hono();
// ============================================
// Auth Status
// ============================================
api.get('/auth/status', (c) => {
    const status = (0, auth_1.getAuthStatus)();
    return c.json(status);
});
// ============================================
// Projects
// ============================================
api.get('/projects', async (c) => {
    const projects = await tools.listProjects();
    return c.json({ success: true, data: projects });
});
api.get('/projects/:id', async (c) => {
    const projectId = c.req.param('id');
    const project = await tools.getProject(projectId);
    if (!project) {
        return c.json({ success: false, error: 'Project not found' }, 404);
    }
    return c.json({ success: true, data: project });
});
api.get('/projects/:id/summary', async (c) => {
    const projectId = c.req.param('id');
    const summary = await tools.getResearchSummary(projectId);
    return c.json({ success: true, data: summary });
});
// ============================================
// Assertions
// ============================================
api.get('/assertions/pending', async (c) => {
    const projectId = c.req.query('projectId');
    const criticality = c.req.query('criticality');
    const where = {
        status: client_1.AssertionStatus.CLAIM,
    };
    if (projectId) {
        where.entity = { projectId };
    }
    if (criticality) {
        where.criticality = criticality;
    }
    const assertions = await tools.prisma.assertion.findMany({
        where,
        include: {
            entity: {
                select: {
                    id: true,
                    name: true,
                    url: true,
                    project: { select: { id: true, name: true } },
                },
            },
            reasoning: true,
            sources: {
                include: {
                    source: true,
                },
            },
        },
        orderBy: [
            { criticality: 'asc' },
            { citedInConclusion: 'desc' },
            { createdAt: 'desc' },
        ],
        take: 100,
    });
    // Get counts by criticality (pending only)
    const pendingCounts = await Promise.all([
        tools.prisma.assertion.count({ where: { ...where, criticality: 'CRITICAL' } }),
        tools.prisma.assertion.count({ where: { ...where, criticality: 'HIGH' } }),
        tools.prisma.assertion.count({ where: { ...where, criticality: 'MEDIUM' } }),
        tools.prisma.assertion.count({ where: { ...where, criticality: 'LOW' } }),
    ]);
    // Get validated and rejected counts (across all, or filtered by project)
    const statusWhere = {};
    if (projectId) {
        statusWhere.entity = { projectId };
    }
    const [validatedCount, rejectedCount] = await Promise.all([
        tools.prisma.assertion.count({ where: { ...statusWhere, status: client_1.AssertionStatus.EVIDENCE } }),
        tools.prisma.assertion.count({ where: { ...statusWhere, status: client_1.AssertionStatus.REJECTED } }),
    ]);
    return c.json({
        success: true,
        data: {
            assertions,
            counts: {
                critical: pendingCounts[0],
                high: pendingCounts[1],
                medium: pendingCounts[2],
                low: pendingCounts[3],
                total: pendingCounts.reduce((a, b) => a + b, 0),
                validated: validatedCount,
                rejected: rejectedCount,
            },
        },
    });
});
// Get assertions grouped by project for sidebar (all statuses)
// When projectId is specified, groups by entity within that project
api.get('/assertions/by-project', async (c) => {
    const projectId = c.req.query('projectId');
    const where = {};
    if (projectId) {
        where.entity = { projectId };
    }
    const assertions = await tools.prisma.assertion.findMany({
        where,
        include: {
            entity: {
                select: {
                    id: true,
                    name: true,
                    project: { select: { id: true, name: true } },
                },
            },
        },
        orderBy: [
            { criticality: 'asc' }, // Critical first
            { createdAt: 'desc' },
        ],
    });
    // When projectId is specified, group by entity within the project
    if (projectId) {
        const byEntity = new Map();
        for (const assertion of assertions) {
            const entityId = assertion.entity.id;
            const entityName = assertion.entity.name;
            if (!byEntity.has(entityId)) {
                byEntity.set(entityId, {
                    entityId,
                    entityName,
                    projectId: assertion.entity.project.id,
                    projectName: assertion.entity.project.name,
                    assertions: [],
                });
            }
            byEntity.get(entityId).assertions.push({
                id: assertion.id,
                claim: assertion.claim,
                category: assertion.category,
                criticality: assertion.criticality,
                status: assertion.status,
                entityId: assertion.entity.id,
                entityName: assertion.entity.name,
            });
        }
        // Sort entities by name
        const sortedEntities = Array.from(byEntity.values()).sort((a, b) => a.entityName.localeCompare(b.entityName));
        return c.json({
            success: true,
            data: sortedEntities,
            groupedBy: 'entity',
        });
    }
    // When no projectId, group by project (original behavior)
    const byProject = new Map();
    for (const assertion of assertions) {
        const projId = assertion.entity.project.id;
        const projName = assertion.entity.project.name;
        if (!byProject.has(projId)) {
            byProject.set(projId, {
                projectId: projId,
                projectName: projName,
                assertions: [],
            });
        }
        byProject.get(projId).assertions.push({
            id: assertion.id,
            claim: assertion.claim,
            category: assertion.category,
            criticality: assertion.criticality,
            status: assertion.status,
            entityId: assertion.entity.id,
            entityName: assertion.entity.name,
        });
    }
    return c.json({
        success: true,
        data: Array.from(byProject.values()),
        groupedBy: 'project',
    });
});
api.get('/assertions/:id', async (c) => {
    const assertionId = c.req.param('id');
    const assertion = await tools.getAssertion(assertionId);
    if (!assertion) {
        return c.json({ success: false, error: 'Assertion not found' }, 404);
    }
    return c.json({ success: true, data: assertion });
});
api.post('/assertions/:id/validate', async (c) => {
    const assertionId = c.req.param('id');
    const body = await c.req.json();
    const { validatedBy } = body;
    if (!validatedBy) {
        return c.json({ success: false, error: 'validatedBy is required' }, 400);
    }
    const result = await tools.validateAssertion(assertionId, validatedBy);
    return c.json({ success: true, data: result });
});
api.post('/assertions/:id/reject', async (c) => {
    const assertionId = c.req.param('id');
    const body = await c.req.json();
    const { validatedBy, rejectionReason } = body;
    if (!validatedBy) {
        return c.json({ success: false, error: 'validatedBy is required' }, 400);
    }
    const result = await tools.rejectAssertion(assertionId, validatedBy, rejectionReason);
    return c.json({ success: true, data: result });
});
api.post('/assertions/:id/notes', async (c) => {
    const assertionId = c.req.param('id');
    const body = await c.req.json();
    const { response, validatedBy, partiallyValidated } = body;
    if (!response || !validatedBy) {
        return c.json({ success: false, error: 'response and validatedBy are required' }, 400);
    }
    const result = await tools.addHumanResponse(assertionId, response, validatedBy, { partiallyValidated });
    return c.json({ success: true, data: result });
});
// Upload evidence screenshot for an assertion
api.post('/assertions/:id/evidence', async (c) => {
    const assertionId = c.req.param('id');
    // Get the assertion to verify it exists
    const assertion = await tools.getAssertion(assertionId);
    if (!assertion) {
        return c.json({ success: false, error: 'Assertion not found' }, 404);
    }
    // Parse multipart form data
    const formData = await c.req.formData();
    const file = formData.get('screenshot');
    if (!file) {
        return c.json({ success: false, error: 'No screenshot file provided' }, 400);
    }
    // Ensure evidence directory exists
    const evidenceDir = path.join(process.cwd(), 'evidence', 'validation');
    if (!fs.existsSync(evidenceDir)) {
        fs.mkdirSync(evidenceDir, { recursive: true });
    }
    // Generate unique filename
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const ext = file.type === 'image/png' ? 'png' : file.type === 'image/jpeg' ? 'jpg' : 'png';
    const filename = `${assertionId}-${timestamp}.${ext}`;
    const filepath = path.join(evidenceDir, filename);
    const relativePath = `evidence/validation/${filename}`;
    // Write file to disk
    const buffer = Buffer.from(await file.arrayBuffer());
    fs.writeFileSync(filepath, buffer);
    // Update assertion with new evidence screenshot
    const existingScreenshots = assertion.evidenceScreenshots || [];
    await tools.prisma.assertion.update({
        where: { id: assertionId },
        data: {
            evidenceScreenshots: [...existingScreenshots, relativePath],
        },
    });
    return c.json({
        success: true,
        data: {
            path: relativePath,
            url: `/${relativePath}`,
            assertionId,
        },
    });
});
// Get evidence screenshots for an assertion
api.get('/assertions/:id/evidence', async (c) => {
    const assertionId = c.req.param('id');
    const assertion = await tools.prisma.assertion.findUnique({
        where: { id: assertionId },
        select: { evidenceScreenshots: true },
    });
    if (!assertion) {
        return c.json({ success: false, error: 'Assertion not found' }, 404);
    }
    return c.json({
        success: true,
        data: {
            screenshots: assertion.evidenceScreenshots || [],
        },
    });
});
// Get conversation state for an assertion (messages, status)
api.get('/assertions/:id/conversation', async (c) => {
    const assertionId = c.req.param('id');
    const assertion = await tools.prisma.assertion.findUnique({
        where: { id: assertionId },
        select: {
            id: true,
            status: true,
            validationNotes: true,
            partiallyValidated: true,
        },
    });
    if (!assertion) {
        return c.json({ success: false, error: 'Assertion not found' }, 404);
    }
    // Determine conversation status from assertion status
    let conversationStatus = 'not_started';
    if (assertion.status === 'EVIDENCE') {
        conversationStatus = 'validated';
    }
    else if (assertion.status === 'REJECTED') {
        conversationStatus = 'rejected';
    }
    else if (assertion.validationNotes && Array.isArray(assertion.validationNotes) && assertion.validationNotes.length > 0) {
        conversationStatus = 'in_progress';
    }
    return c.json({
        success: true,
        data: {
            messages: assertion.validationNotes || [],
            status: conversationStatus,
            partiallyValidated: assertion.partiallyValidated,
        },
    });
});
// Save conversation state for an assertion
api.put('/assertions/:id/conversation', async (c) => {
    const assertionId = c.req.param('id');
    const body = await c.req.json();
    const { messages, status } = body;
    const assertion = await tools.prisma.assertion.findUnique({
        where: { id: assertionId },
    });
    if (!assertion) {
        return c.json({ success: false, error: 'Assertion not found' }, 404);
    }
    // Update the validationNotes with the full conversation
    const updateData = {
        validationNotes: messages || [],
    };
    // If status changed to validated or rejected, update assertion status too
    if (status === 'validated' && assertion.status === 'CLAIM') {
        updateData.status = 'EVIDENCE';
        updateData.validatedAt = new Date();
    }
    else if (status === 'rejected' && assertion.status === 'CLAIM') {
        updateData.status = 'REJECTED';
    }
    else if (status === 'in_progress') {
        updateData.partiallyValidated = true;
    }
    const updated = await tools.prisma.assertion.update({
        where: { id: assertionId },
        data: updateData,
    });
    return c.json({
        success: true,
        data: {
            id: updated.id,
            status: status,
            messages: updated.validationNotes,
        },
    });
});
// ============================================
// AI Assessment (Pre-Validation)
// ============================================
// AI pre-assessment of an assertion's evidence quality
api.post('/assertions/:id/ai-assess', async (c) => {
    const assertionId = c.req.param('id');
    // Fetch full assertion with evidence
    const assertion = await tools.prisma.assertion.findUnique({
        where: { id: assertionId },
        include: {
            entity: {
                select: { name: true },
            },
            reasoning: {
                select: { content: true },
            },
            sources: {
                include: {
                    source: {
                        select: { url: true },
                    },
                },
            },
        },
    });
    if (!assertion) {
        return c.json({ success: false, error: 'Assertion not found' }, 404);
    }
    // Transform to AssertionForAssessment interface
    const assertionForAssessment = {
        id: assertion.id,
        claim: assertion.claim,
        category: assertion.category,
        evidenceDescription: assertion.evidenceDescription,
        evidenceScreenshotPath: assertion.evidenceScreenshotPath,
        evidenceChain: assertion.evidenceChain,
        entity: assertion.entity,
        reasoning: assertion.reasoning,
        sources: assertion.sources.map(s => ({
            quote: s.quote,
            source: s.source,
        })),
    };
    try {
        const assessment = await (0, assessment_1.assessAssertion)(assertionForAssessment);
        return c.json({ success: true, data: assessment });
    }
    catch (error) {
        console.error('AI Assessment error:', error);
        return c.json({
            success: false,
            error: error.message || 'Failed to assess assertion',
        }, 500);
    }
});
// Investigate an evidence gap for an assertion
api.post('/assertions/:id/investigate-gap', async (c) => {
    const assertionId = c.req.param('id');
    const body = await c.req.json();
    const { gapDescription, searchQuery } = body;
    if (!gapDescription) {
        return c.json({ success: false, error: 'gapDescription is required' }, 400);
    }
    // Fetch assertion with entity info
    const assertion = await tools.prisma.assertion.findUnique({
        where: { id: assertionId },
        include: {
            entity: {
                select: { name: true },
            },
        },
    });
    if (!assertion) {
        return c.json({ success: false, error: 'Assertion not found' }, 404);
    }
    const request = {
        assertionId,
        entityName: assertion.entity.name,
        claim: assertion.claim,
        gapDescription,
        searchQuery: searchQuery || gapDescription, // Use description as fallback search
    };
    try {
        console.log(`Investigating gap for assertion ${assertionId}: "${gapDescription}"`);
        const result = await (0, investigate_1.investigateGap)(request);
        // If evidence was found, optionally add to assertion's evidence chain
        if (result.evidenceFound && result.sourceUrl) {
            // Add source to assertion if not already present
            const existingSource = await tools.prisma.source.findUnique({
                where: { url: result.sourceUrl },
            });
            let sourceId;
            if (existingSource) {
                sourceId = existingSource.id;
            }
            else {
                const newSource = await tools.prisma.source.create({
                    data: { url: result.sourceUrl },
                });
                sourceId = newSource.id;
            }
            // Link source to assertion with the quote
            await tools.prisma.assertionSource.upsert({
                where: {
                    assertionId_sourceId: {
                        assertionId,
                        sourceId,
                    },
                },
                update: {
                    quote: result.sourceQuote,
                    addedBy: 'gap-investigation',
                },
                create: {
                    assertionId,
                    sourceId,
                    quote: result.sourceQuote,
                    addedBy: 'gap-investigation',
                },
            });
            // If screenshot was captured, add to evidence chain
            if (result.screenshotPath && result.screenshotDescription) {
                const currentChain = assertion.evidenceChain || [];
                const newEvidence = {
                    screenshotPath: result.screenshotPath,
                    description: result.screenshotDescription,
                    capturedAt: new Date().toISOString(),
                    source: 'gap-investigation',
                    gapDescription: gapDescription,
                };
                await tools.prisma.assertion.update({
                    where: { id: assertionId },
                    data: {
                        evidenceChain: [...currentChain, newEvidence],
                    },
                });
            }
            // Log the investigation
            await tools.prisma.researchLog.create({
                data: {
                    action: 'gap_investigated',
                    details: {
                        assertionId,
                        gapDescription,
                        evidenceFound: result.evidenceFound,
                        sourceUrl: result.sourceUrl,
                    },
                },
            });
        }
        return c.json({ success: true, data: result });
    }
    catch (error) {
        console.error('Gap Investigation error:', error);
        return c.json({
            success: false,
            error: error.message || 'Failed to investigate gap',
        }, 500);
    }
});
// ============================================
// Source Grading
// ============================================
// Grade a source's relevance to an assertion
api.put('/sources/:assertionSourceId/grade', async (c) => {
    const assertionSourceId = c.req.param('assertionSourceId');
    const body = await c.req.json();
    const { relevanceGrade, annotation, gradedBy } = body;
    if (!gradedBy) {
        return c.json({ success: false, error: 'gradedBy is required' }, 400);
    }
    // Validate relevanceGrade if provided
    const validGrades = ['DIRECT_EVIDENCE', 'STRONG_SUPPORT', 'PARTIAL_SUPPORT', 'WEAK_SUPPORT', 'NOT_RELEVANT', 'MISLEADING'];
    if (relevanceGrade && !validGrades.includes(relevanceGrade)) {
        return c.json({ success: false, error: `Invalid relevanceGrade. Must be one of: ${validGrades.join(', ')}` }, 400);
    }
    try {
        const updated = await tools.prisma.assertionSource.update({
            where: { id: assertionSourceId },
            data: {
                relevanceGrade: relevanceGrade,
                annotation,
                gradedBy,
                gradedAt: new Date(),
            },
            include: {
                source: true,
            },
        });
        return c.json({
            success: true,
            data: updated,
        });
    }
    catch (error) {
        if (error.code === 'P2025') {
            return c.json({ success: false, error: 'Source link not found' }, 404);
        }
        throw error;
    }
});
// Get all source grades for an assertion
api.get('/assertions/:id/sources', async (c) => {
    const assertionId = c.req.param('id');
    const sources = await tools.prisma.assertionSource.findMany({
        where: { assertionId },
        include: {
            source: true,
        },
        orderBy: { createdAt: 'asc' },
    });
    return c.json({
        success: true,
        data: sources,
    });
});
// Add researcher-found sources to an assertion
api.post('/assertions/:id/researcher-sources', async (c) => {
    const assertionId = c.req.param('id');
    const body = await c.req.json();
    const { urls, addedBy } = body;
    if (!addedBy) {
        return c.json({ success: false, error: 'addedBy is required' }, 400);
    }
    if (!urls || !Array.isArray(urls) || urls.length === 0) {
        return c.json({ success: false, error: 'urls array is required' }, 400);
    }
    // Verify assertion exists
    const assertion = await tools.prisma.assertion.findUnique({
        where: { id: assertionId },
    });
    if (!assertion) {
        return c.json({ success: false, error: 'Assertion not found' }, 404);
    }
    const createdSources = [];
    for (const url of urls) {
        try {
            // Upsert the Source record
            const source = await tools.prisma.source.upsert({
                where: { url },
                create: {
                    url,
                    sourceType: 'researcher_found',
                },
                update: {}, // Don't update existing sources
            });
            // Check if this source is already linked to the assertion
            const existingLink = await tools.prisma.assertionSource.findUnique({
                where: {
                    assertionId_sourceId: {
                        assertionId,
                        sourceId: source.id,
                    },
                },
            });
            if (!existingLink) {
                // Create the link with addedBy
                const assertionSource = await tools.prisma.assertionSource.create({
                    data: {
                        assertionId,
                        sourceId: source.id,
                        addedBy,
                    },
                    include: {
                        source: true,
                    },
                });
                createdSources.push(assertionSource);
            }
        }
        catch (error) {
            console.error(`Failed to add source ${url}:`, error);
        }
    }
    return c.json({
        success: true,
        data: {
            sources: createdSources,
            count: createdSources.length,
        },
    });
});
// Get grading statistics for a project (for research quality analysis)
api.get('/projects/:id/source-grades', async (c) => {
    const projectId = c.req.param('id');
    // Get all assertion sources for this project with grades
    const assertionSources = await tools.prisma.assertionSource.findMany({
        where: {
            assertion: {
                entity: {
                    projectId,
                },
            },
            relevanceGrade: { not: null },
        },
        select: {
            relevanceGrade: true,
            annotation: true,
            gradedBy: true,
            assertion: {
                select: {
                    category: true,
                },
            },
        },
    });
    // Aggregate statistics
    const gradeDistribution = {};
    const gradesByCategory = {};
    for (const as of assertionSources) {
        const grade = as.relevanceGrade;
        gradeDistribution[grade] = (gradeDistribution[grade] || 0) + 1;
        const category = as.assertion.category || 'uncategorized';
        if (!gradesByCategory[category]) {
            gradesByCategory[category] = {};
        }
        gradesByCategory[category][grade] = (gradesByCategory[category][grade] || 0) + 1;
    }
    // Calculate quality metrics
    const totalGraded = assertionSources.length;
    const highQuality = (gradeDistribution['DIRECT_EVIDENCE'] || 0) + (gradeDistribution['STRONG_SUPPORT'] || 0);
    const lowQuality = (gradeDistribution['NOT_RELEVANT'] || 0) + (gradeDistribution['MISLEADING'] || 0);
    return c.json({
        success: true,
        data: {
            totalGraded,
            gradeDistribution,
            gradesByCategory,
            qualityMetrics: {
                highQualityPercent: totalGraded > 0 ? Math.round((highQuality / totalGraded) * 100) : 0,
                lowQualityPercent: totalGraded > 0 ? Math.round((lowQuality / totalGraded) * 100) : 0,
            },
            // Annotations can be used for agent training
            annotations: assertionSources
                .filter(as => as.annotation)
                .map(as => ({
                grade: as.relevanceGrade,
                annotation: as.annotation,
                category: as.assertion.category,
            })),
        },
    });
});
// ============================================
// Entities
// ============================================
api.get('/entities', async (c) => {
    const projectId = c.req.query('projectId');
    if (!projectId) {
        return c.json({ success: false, error: 'projectId is required' }, 400);
    }
    const entities = await tools.listEntities(projectId);
    return c.json({ success: true, data: entities });
});
// Get entities grouped by discoveryCategory for tree visualization
// Discovery categories: ai_code_assistants, ai_code_review, ai_debugging, ai_testing,
//                       ai_documentation, ai_security, ai_devops, ai_analytics, genai_concepts
api.get('/entities/tree/:projectId', async (c) => {
    const projectId = c.req.param('projectId');
    const groupBy = c.req.query('groupBy') || 'discoveryCategory'; // or 'entityType'
    // Get project info
    const project = await tools.getProject(projectId);
    if (!project) {
        return c.json({ success: false, error: 'Project not found' }, 404);
    }
    // Get all entities with assertion counts
    const entities = await tools.prisma.entity.findMany({
        where: { projectId },
        include: {
            _count: {
                select: { assertions: true },
            },
            assertions: {
                select: {
                    status: true,
                },
            },
        },
    });
    // Get category metadata (icons, weights, concept counts) from database
    const dbCategories = await tools.prisma.discoveryCategory.findMany({
        select: {
            name: true,
            displayName: true,
            materialIcon: true,
            _count: { select: { concepts: true } },
        },
    });
    // Build lookup maps for category metadata
    const categoryDisplayNames = {};
    const categoryIcons = {};
    const categoryConceptCounts = {};
    for (const cat of dbCategories) {
        categoryDisplayNames[cat.name] = cat.displayName;
        if (cat.materialIcon) {
            categoryIcons[cat.name] = cat.materialIcon;
        }
        categoryConceptCounts[cat.name] = cat._count.concepts;
    }
    // Default icons for categories (fallback)
    const defaultCategoryIcons = {
        ai_code_assistants: 'smart_toy',
        ai_code_review: 'rate_review',
        ai_debugging: 'bug_report',
        ai_testing: 'science',
        ai_documentation: 'description',
        ai_security: 'security',
        ai_devops: 'settings_suggest',
        ai_analytics: 'insights',
        genai_concepts: 'psychology',
        uncategorized: 'category',
    };
    // Group by the specified field (default: discoveryCategory)
    const grouped = new Map();
    for (const entity of entities) {
        const groupKey = groupBy === 'entityType'
            ? (entity.entityType || 'uncategorized')
            : (entity.discoveryCategory || 'uncategorized');
        if (!grouped.has(groupKey)) {
            grouped.set(groupKey, []);
        }
        // Calculate evidence ratio (validated / total)
        const totalAssertions = entity._count.assertions;
        const validatedCount = entity.assertions.filter(a => a.status === 'EVIDENCE').length;
        const evidenceRatio = totalAssertions > 0 ? validatedCount / totalAssertions : 0;
        grouped.get(groupKey).push({
            id: entity.id,
            name: entity.name,
            url: entity.url,
            entityType: entity.entityType,
            discoveryCategory: entity.discoveryCategory,
            logoUrl: entity.logoUrl,
            logoSvgContent: entity.logoSvgContent,
            assertionCount: totalAssertions,
            evidenceRatio,
            // Buzz score for visual emphasis
            buzzScore: entity.buzzScore,
            buzzComponents: entity.buzzComponents,
            // GitHub metrics for display
            githubStars: entity.githubStars,
        });
    }
    // Calculate category weights based on entity count + cumulative buzz
    const categoryWeights = {};
    let maxWeight = 0;
    let minWeight = Infinity;
    for (const [key, categoryEntities] of grouped.entries()) {
        const entityCount = categoryEntities.length;
        const buzzScores = categoryEntities.map((e) => e.buzzScore || 0);
        const totalBuzz = buzzScores.reduce((sum, b) => sum + b, 0);
        const avgBuzz = entityCount > 0 ? totalBuzz / entityCount : 0;
        // Weight formula: blend of buzz quality and entity volume
        const buzzComponent = avgBuzz * Math.log10(entityCount + 1);
        const countComponent = Math.log10(entityCount + 1);
        const weight = (buzzComponent * 0.5) + (countComponent * 0.5);
        categoryWeights[key] = { weight, normalizedWeight: 0, totalBuzz, avgBuzz };
        maxWeight = Math.max(maxWeight, weight);
        minWeight = Math.min(minWeight, weight);
    }
    // Normalize weights to 0-1 range
    const weightRange = maxWeight - minWeight || 1;
    for (const key of Object.keys(categoryWeights)) {
        categoryWeights[key].normalizedWeight = (categoryWeights[key].weight - minWeight) / weightRange;
    }
    // Sort categories by a logical order (discovery categories first, then alphabetically)
    const categoryOrder = [
        'ai_code_assistants', 'ai_code_review', 'ai_debugging', 'ai_testing',
        'ai_documentation', 'ai_security', 'ai_devops', 'ai_analytics', 'genai_concepts'
    ];
    const sortedEntries = Array.from(grouped.entries()).sort(([a], [b]) => {
        const aIndex = categoryOrder.indexOf(a);
        const bIndex = categoryOrder.indexOf(b);
        if (aIndex >= 0 && bIndex >= 0)
            return aIndex - bIndex;
        if (aIndex >= 0)
            return -1;
        if (bIndex >= 0)
            return 1;
        return a.localeCompare(b);
    });
    // Build tree structure for D3 - categories as root nodes (no project parent)
    const treeData = {
        name: project.name,
        type: 'project',
        children: sortedEntries.map(([key, catEntities]) => ({
            name: categoryDisplayNames[key] || key,
            key: key, // Original key for filtering
            // Category visual metadata
            materialIcon: categoryIcons[key] || defaultCategoryIcons[key] || 'category',
            weight: categoryWeights[key]?.weight || 0,
            normalizedWeight: categoryWeights[key]?.normalizedWeight || 0,
            totalBuzz: categoryWeights[key]?.totalBuzz || 0,
            avgBuzz: categoryWeights[key]?.avgBuzz || 0,
            conceptCount: categoryConceptCounts[key] || 0,
            type: 'category',
            children: catEntities
                // Sort entities by buzz score (highest first)
                .sort((a, b) => (b.buzzScore || 0) - (a.buzzScore || 0))
                .map((e) => ({
                name: e.name,
                type: 'entity',
                id: e.id,
                url: e.url,
                entityType: e.entityType,
                discoveryCategory: e.discoveryCategory,
                logoUrl: e.logoUrl,
                logoSvgContent: e.logoSvgContent,
                assertionCount: e.assertionCount,
                evidenceRatio: e.evidenceRatio,
                buzzScore: e.buzzScore,
                buzzComponents: e.buzzComponents,
                githubStars: e.githubStars,
            })),
        })),
    };
    // Also return available entity types for slicer/filter UI
    const entityTypes = [...new Set(entities.map(e => e.entityType).filter(Boolean))];
    return c.json({
        success: true,
        data: treeData,
        meta: {
            groupBy,
            entityTypes,
            totalEntities: entities.length,
            categoriesCount: grouped.size,
        }
    });
});
api.get('/entities/:id', async (c) => {
    const entityId = c.req.param('id');
    const entity = await tools.getEntity(entityId);
    if (!entity) {
        return c.json({ success: false, error: 'Entity not found' }, 404);
    }
    return c.json({ success: true, data: entity });
});
// Get full entity research data for the entity research page
api.get('/entities/:id/full', async (c) => {
    const entityId = c.req.param('id');
    // Get entity with full data
    const entity = await tools.prisma.entity.findUnique({
        where: { id: entityId },
        include: {
            project: {
                select: { id: true, name: true },
            },
            category: {
                select: { id: true, name: true, displayName: true },
            },
            domain: {
                select: { id: true, name: true, description: true },
            },
            assertions: {
                include: {
                    sources: {
                        include: {
                            source: true,
                        },
                    },
                    reasoning: true,
                    validations: {
                        include: { citations: true, rulings: true },
                        orderBy: { validatedAt: 'desc' },
                    },
                    rulings: {
                        orderBy: { ruledAt: 'desc' },
                    },
                },
                orderBy: [
                    { criticality: 'asc' },
                    { status: 'asc' },
                    { createdAt: 'desc' },
                ],
            },
            extractions: {
                include: {
                    source: true,
                    screenshot: true,
                },
                orderBy: { extractedAt: 'desc' },
            },
            researchSessions: {
                include: {
                    tasks: {
                        orderBy: { startedAt: 'desc' },
                    },
                },
                orderBy: { createdAt: 'desc' },
                take: 10,
            },
        },
    });
    if (!entity) {
        return c.json({ success: false, error: 'Entity not found' }, 404);
    }
    // Group extractions by schema type (latest per type)
    const extractionsByType = {};
    const allExtractions = [];
    for (const extraction of entity.extractions) {
        allExtractions.push(extraction);
        if (!extractionsByType[extraction.schemaType]) {
            extractionsByType[extraction.schemaType] = extraction;
        }
    }
    // Collect all evidence screenshots (deduplicated)
    const evidenceGallery = [];
    const seenPaths = new Set();
    function addToGallery(item) {
        const normalizedPath = item.path.replace(/^\/+/, '');
        if (!seenPaths.has(normalizedPath)) {
            seenPaths.add(normalizedPath);
            evidenceGallery.push({ ...item, path: normalizedPath });
        }
    }
    for (const assertion of entity.assertions) {
        // Primary evidence screenshot
        if (assertion.evidenceScreenshotPath) {
            addToGallery({
                path: assertion.evidenceScreenshotPath,
                description: assertion.evidenceDescription || undefined,
                assertionId: assertion.id,
                claim: assertion.claim,
            });
        }
        // Evidence chain screenshots
        if (assertion.evidenceChain && Array.isArray(assertion.evidenceChain)) {
            for (const item of assertion.evidenceChain) {
                if (item.screenshotPath) {
                    addToGallery({
                        path: item.screenshotPath,
                        description: item.description,
                        assertionId: assertion.id,
                        claim: assertion.claim,
                    });
                }
            }
        }
        // Legacy validation screenshots
        if (assertion.evidenceScreenshots && Array.isArray(assertion.evidenceScreenshots)) {
            for (const screenshotPath of assertion.evidenceScreenshots) {
                addToGallery({
                    path: screenshotPath,
                    assertionId: assertion.id,
                    claim: assertion.claim,
                });
            }
        }
    }
    // Add extraction screenshots
    for (const extraction of entity.extractions) {
        if (extraction.screenshot?.filePath) {
            addToGallery({
                path: extraction.screenshot.filePath,
                description: `${extraction.schemaType} extraction from ${extraction.source?.url || 'unknown source'}`,
            });
        }
    }
    // Calculate summary stats
    const totalAssertions = entity.assertions.length;
    const validatedAssertions = entity.assertions.filter(a => a.status === 'EVIDENCE').length;
    const pendingAssertions = entity.assertions.filter(a => a.status === 'CLAIM').length;
    const rejectedAssertions = entity.assertions.filter(a => a.status === 'REJECTED').length;
    // Group assertions by category
    const assertionsByCategory = {};
    for (const assertion of entity.assertions) {
        const cat = assertion.category || 'uncategorized';
        if (!assertionsByCategory[cat]) {
            assertionsByCategory[cat] = [];
        }
        assertionsByCategory[cat].push(assertion);
    }
    // Calculate criticality breakdown
    const criticalityBreakdown = {
        critical: entity.assertions.filter(a => a.criticality === 'CRITICAL').length,
        high: entity.assertions.filter(a => a.criticality === 'HIGH').length,
        medium: entity.assertions.filter(a => a.criticality === 'MEDIUM').length,
        low: entity.assertions.filter(a => a.criticality === 'LOW').length,
    };
    // Validation stats
    const validationStats = {
        totalValidations: 0,
        byVerdict: { ROBUST: 0, CONDITIONAL: 0, WEAK: 0, REFUTED: 0, UNVERIFIABLE: 0 },
        assertionsWithValidations: 0,
        assertionsWithoutValidations: 0,
        totalRulings: 0,
        byRulingVerdict: { AFFIRM: 0, REVISE: 0, OVERTURN: 0 },
    };
    for (const assertion of entity.assertions) {
        const validations = assertion.validations || [];
        if (validations.length > 0) {
            validationStats.assertionsWithValidations++;
            for (const v of validations) {
                validationStats.totalValidations++;
                if (validationStats.byVerdict[v.verdict] !== undefined) {
                    validationStats.byVerdict[v.verdict]++;
                }
                const rulings = v.rulings || [];
                for (const r of rulings) {
                    validationStats.totalRulings++;
                    if (validationStats.byRulingVerdict[r.verdict] !== undefined) {
                        validationStats.byRulingVerdict[r.verdict]++;
                    }
                }
            }
        }
        else {
            validationStats.assertionsWithoutValidations++;
        }
        // Also count assertion-level rulings
        const assertionRulings = assertion.rulings || [];
        for (const r of assertionRulings) {
            // Only count if not already counted via validation rulings
            // (they reference the same records, so avoid double counting)
        }
    }
    // Build validationPairs - assertions sorted by validation status
    const validationPairs = [...entity.assertions].sort((a, b) => {
        const aValidations = a.validations || [];
        const bValidations = b.validations || [];
        const aHasValidation = aValidations.length > 0;
        const bHasValidation = bValidations.length > 0;
        // Validated first
        if (aHasValidation && !bHasValidation)
            return -1;
        if (!aHasValidation && bHasValidation)
            return 1;
        // Among validated, sort by most recent validation date
        if (aHasValidation && bHasValidation) {
            const aDate = new Date(aValidations[0].validatedAt).getTime();
            const bDate = new Date(bValidations[0].validatedAt).getTime();
            return bDate - aDate;
        }
        // Among unvalidated, sort by criticality
        return 0;
    });
    // Calculate pillar validation rate
    const pillarAssertions = entity.assertions.filter(a => a.criticality === 'CRITICAL' || a.criticality === 'HIGH');
    const pillarValidated = pillarAssertions.filter(a => a.status === 'EVIDENCE').length;
    const pillarValidationRate = pillarAssertions.length > 0
        ? Math.round((pillarValidated / pillarAssertions.length) * 100) : 0;
    return c.json({
        success: true,
        data: {
            // Entity metadata
            id: entity.id,
            name: entity.name,
            description: entity.description,
            entityType: entity.entityType,
            url: entity.url,
            logoUrl: entity.logoUrl,
            logoSvgContent: entity.logoSvgContent,
            logoPath: entity.logoPath,
            logoFormat: entity.logoFormat,
            discoveryCategory: entity.discoveryCategory,
            createdAt: entity.createdAt,
            updatedAt: entity.updatedAt,
            // Relationships
            project: entity.project,
            category: entity.category,
            domain: entity.domain,
            // GitHub metrics
            github: entity.githubUrl ? {
                url: entity.githubUrl,
                owner: entity.githubOwner,
                repo: entity.githubRepo,
                stars: entity.githubStars,
                forks: entity.githubForks,
                watchers: entity.githubWatchers,
                openIssues: entity.githubOpenIssues,
                contributors: entity.githubContributors,
                lastCommit: entity.githubLastCommit,
                lastRelease: entity.githubLastRelease,
                language: entity.githubLanguage,
                license: entity.githubLicense,
                createdAt: entity.githubCreatedAt,
                metricsAt: entity.githubMetricsAt,
            } : null,
            // Buzz score
            buzz: entity.buzzScore !== null ? {
                score: entity.buzzScore,
                components: entity.buzzComponents,
                calculatedAt: entity.buzzCalculatedAt,
                override: entity.buzzOverride,
                overrideReason: entity.buzzOverrideReason,
            } : null,
            // Extractions
            extractionsByType,
            allExtractions,
            // Assertions
            assertions: entity.assertions,
            assertionsByCategory,
            // Validation pairs (assertions sorted by validation status)
            validationPairs,
            // Evidence
            evidenceGallery,
            // Research sessions
            researchSessions: entity.researchSessions,
            // Summary stats
            stats: {
                totalAssertions,
                validatedAssertions,
                pendingAssertions,
                rejectedAssertions,
                validationRate: totalAssertions > 0 ? Math.round((validatedAssertions / totalAssertions) * 100) : 0,
                totalExtractions: entity.extractions.length,
                extractionTypes: Object.keys(extractionsByType),
                evidenceCount: evidenceGallery.length,
                sessionsCount: entity.researchSessions.length,
                criticalityBreakdown,
                validationStats,
                pillarValidationRate,
                pillarTotal: pillarAssertions.length,
                pillarValidated,
            },
        },
    });
});
// ============================================
// Extractions
// ============================================
api.get('/extractions', async (c) => {
    const entityId = c.req.query('entityId');
    if (!entityId) {
        return c.json({ success: false, error: 'entityId query parameter is required' }, 400);
    }
    const extractions = await tools.getExtractions(entityId);
    return c.json({ success: true, data: extractions });
});
// ============================================
// Search
// ============================================
api.get('/search', async (c) => {
    const query = c.req.query('q');
    const projectId = c.req.query('projectId');
    if (!query) {
        return c.json({ success: false, error: 'Query parameter q is required' }, 400);
    }
    const results = await tools.globalSearch({ query, projectId });
    return c.json({ success: true, data: results });
});
// ============================================
// World Model - Entity Ecosystem Positioning
// ============================================
api.get('/entities/:id/world-model', async (c) => {
    try {
        const entityId = c.req.param('id');
        const worldModel = await tools.getWorldModel({ entityId });
        if (!worldModel) {
            return c.json({ success: false, error: 'Entity not found' }, 404);
        }
        // Include concept links in world model response
        const conceptResult = await tools.getEntityConcepts(entityId);
        const concepts = conceptResult.success ? conceptResult.data : null;
        return c.json({ success: true, data: { ...worldModel, concepts } });
    }
    catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to get world model';
        return c.json({ success: false, error: message }, 500);
    }
});
api.get('/projects/:id/relationship-graph', async (c) => {
    try {
        const projectId = c.req.param('id');
        const graph = await tools.getRelationshipGraph({ projectId });
        return c.json({ success: true, data: graph });
    }
    catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to get relationship graph';
        return c.json({ success: false, error: message }, 500);
    }
});
// ============================================
// Category Concepts - Building blocks within categories
// ============================================
api.get('/categories/:id/concepts', async (c) => {
    try {
        const categoryId = c.req.param('id');
        const conceptType = c.req.query('conceptType');
        const result = await tools.listConcepts({ categoryId, conceptType: conceptType });
        return c.json(result);
    }
    catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to list concepts';
        return c.json({ success: false, error: message }, 500);
    }
});
api.get('/categories/:id/concept-map', async (c) => {
    try {
        let categoryId = c.req.param('id');
        // If id doesn't look like a cuid, try to resolve by name
        if (!categoryId.match(/^c[a-z0-9]{24}/)) {
            const cat = await tools.getCategoryByName(categoryId);
            if (cat) {
                categoryId = cat.id;
            }
            else {
                return c.json({ success: false, error: `Category not found: ${categoryId}` }, 404);
            }
        }
        const result = await tools.getCategoryConceptMap(categoryId);
        return c.json(result);
    }
    catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to get concept map';
        return c.json({ success: false, error: message }, 500);
    }
});
api.get('/concepts/:id', async (c) => {
    try {
        const conceptId = c.req.param('id');
        const result = await tools.getConcept(conceptId);
        if (!result.success) {
            return c.json(result, 404);
        }
        return c.json(result);
    }
    catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to get concept';
        return c.json({ success: false, error: message }, 500);
    }
});
api.get('/entities/:id/concepts', async (c) => {
    try {
        const entityId = c.req.param('id');
        const result = await tools.getEntityConcepts(entityId);
        return c.json(result);
    }
    catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to get entity concepts';
        return c.json({ success: false, error: message }, 500);
    }
});
// ============================================
// Compliance Batch Lookup
// ============================================
api.get('/entities/compliance-batch', async (c) => {
    try {
        const idsParam = c.req.query('ids');
        if (!idsParam) {
            return c.json({ success: false, error: 'ids query parameter required' }, 400);
        }
        const ids = idsParam.split(',').map(id => id.trim()).filter(Boolean);
        if (ids.length === 0) {
            return c.json({ success: true, data: {} });
        }
        const extractions = await tools.prisma.extraction.findMany({
            where: {
                schemaType: 'compliance',
                status: 'COMPLETED',
                entityId: { in: ids },
            },
            orderBy: { extractedAt: 'desc' },
        });
        // Deduplicate by entity (keep latest)
        const latestByEntity = new Map();
        for (const ext of extractions) {
            if (!latestByEntity.has(ext.entityId)) {
                latestByEntity.set(ext.entityId, ext);
            }
        }
        const result = {};
        for (const [entityId, ext] of latestByEntity) {
            const data = ext.data;
            if (data) {
                result[entityId] = {
                    soc2: data.soc2 || false,
                    fedRampStatus: data.fedRampStatus || null,
                    gdprCompliant: data.gdprCompliant || false,
                    hipaaCompliant: data.hipaaCompliant || false,
                    certifications: data.certifications || [],
                };
            }
        }
        return c.json({ success: true, data: result });
    }
    catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to fetch compliance data';
        return c.json({ success: false, error: message }, 500);
    }
});
// ============================================
// Error handling
// ============================================
api.onError((err, c) => {
    console.error('API Error:', err);
    return c.json({
        success: false,
        error: err.message || 'Internal server error',
    }, 500);
});
exports.default = api;
//# sourceMappingURL=api.js.map