/**
 * REST API routes for validation server
 * Wraps existing database tools for HTTP access
 */

import { Hono } from 'hono';
import * as tools from '../../tools';
import { getAuthStatus } from '../middleware/auth';
import { AssertionStatus, AssertionCriticality } from '../../../generated/prisma/client';
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

  // Get counts by criticality
  const counts = await Promise.all([
    tools.prisma.assertion.count({ where: { ...where, criticality: 'CRITICAL' } }),
    tools.prisma.assertion.count({ where: { ...where, criticality: 'HIGH' } }),
    tools.prisma.assertion.count({ where: { ...where, criticality: 'MEDIUM' } }),
    tools.prisma.assertion.count({ where: { ...where, criticality: 'LOW' } }),
  ]);

  return c.json({
    success: true,
    data: {
      assertions,
      counts: {
        critical: counts[0],
        high: counts[1],
        medium: counts[2],
        low: counts[3],
        total: counts.reduce((a, b) => a + b, 0),
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
