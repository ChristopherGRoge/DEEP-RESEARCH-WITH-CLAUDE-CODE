/**
 * REST API routes for validation server
 * Wraps existing database tools for HTTP access
 */

import { Hono } from 'hono';
import * as tools from '../../tools';
import { getAuthStatus } from '../middleware/auth';
import { AssertionStatus, AssertionCriticality, SourceRelevance } from '../../../generated/prisma/client';
import * as fs from 'fs';
import * as path from 'path';

const api = new Hono();

// ============================================
// Auth Status
// ============================================

api.get('/auth/status', (c) => {
  const status = getAuthStatus();
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
  const criticality = c.req.query('criticality') as AssertionCriticality | undefined;

  const where: any = {
    status: AssertionStatus.CLAIM,
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
  const statusWhere: any = {};
  if (projectId) {
    statusWhere.entity = { projectId };
  }

  const [validatedCount, rejectedCount] = await Promise.all([
    tools.prisma.assertion.count({ where: { ...statusWhere, status: AssertionStatus.EVIDENCE } }),
    tools.prisma.assertion.count({ where: { ...statusWhere, status: AssertionStatus.REJECTED } }),
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
api.get('/assertions/by-project', async (c) => {
  const projectId = c.req.query('projectId');

  const where: any = {};

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

  // Group by project
  const byProject = new Map<string, { projectId: string; projectName: string; assertions: any[] }>();

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

    byProject.get(projId)!.assertions.push({
      id: assertion.id,
      claim: assertion.claim,
      category: assertion.category,
      criticality: assertion.criticality,
      status: assertion.status, // Include status for UI
      entityId: assertion.entity.id,
      entityName: assertion.entity.name,
    });
  }

  return c.json({
    success: true,
    data: Array.from(byProject.values()),
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
  const file = formData.get('screenshot') as File | null;

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
  const existingScreenshots = (assertion as any).evidenceScreenshots || [];
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
  } else if (assertion.status === 'REJECTED') {
    conversationStatus = 'rejected';
  } else if (assertion.validationNotes && Array.isArray(assertion.validationNotes) && assertion.validationNotes.length > 0) {
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
  const updateData: any = {
    validationNotes: messages || [],
  };

  // If status changed to validated or rejected, update assertion status too
  if (status === 'validated' && assertion.status === 'CLAIM') {
    updateData.status = 'EVIDENCE';
    updateData.validatedAt = new Date();
  } else if (status === 'rejected' && assertion.status === 'CLAIM') {
    updateData.status = 'REJECTED';
  } else if (status === 'in_progress') {
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
        relevanceGrade: relevanceGrade as SourceRelevance,
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
  } catch (error: any) {
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

  const createdSources: any[] = [];

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
    } catch (error) {
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
  const gradeDistribution: Record<string, number> = {};
  const gradesByCategory: Record<string, Record<string, number>> = {};

  for (const as of assertionSources) {
    const grade = as.relevanceGrade as string;
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

api.get('/entities/:id', async (c) => {
  const entityId = c.req.param('id');
  const entity = await tools.getEntity(entityId);
  if (!entity) {
    return c.json({ success: false, error: 'Entity not found' }, 404);
  }
  return c.json({ success: true, data: entity });
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
// Error handling
// ============================================

api.onError((err, c) => {
  console.error('API Error:', err);
  return c.json({
    success: false,
    error: err.message || 'Internal server error',
  }, 500);
});

export default api;
