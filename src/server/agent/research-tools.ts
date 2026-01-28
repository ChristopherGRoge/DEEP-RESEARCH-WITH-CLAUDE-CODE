/**
 * MCP tools for research workflow
 *
 * These tools are exposed to research agents via the Claude Agent SDK.
 * They wrap the existing CLI extraction tools and provide task management
 * for the research session.
 */

import { z } from 'zod';
import { tool, createSdkMcpServer } from '@anthropic-ai/claude-agent-sdk';
import { prisma } from '../../tools';
import {
  fetchForExtraction,
  saveExtraction,
  readCachedContent,
  SchemaType,
} from '../../tools/extractor';
import { createAssertion as dbCreateAssertion } from '../../tools/assertions';
import { ResearchSessionManager, TaskProgress, TaskResults } from './research-session';
import { AssertionStatus, AssertionCriticality } from '../../../generated/prisma/client';

// ============================================
// URL Fetching and Evidence Capture
// ============================================

const fetchUrlTool = (sessionId: string, sessionManager: ResearchSessionManager) =>
  tool(
    'fetch_url',
    'Fetch a URL and capture a screenshot as evidence. ALWAYS use this before creating assertions.',
    {
      url: z.string().describe('The URL to fetch'),
      entityId: z.string().describe('The entity ID this URL is about'),
    },
    async (args) => {
      try {
        const result = await fetchForExtraction({
          url: args.url,
          entityId: args.entityId,
          screenshot: true,
        });

        if (!result.success) {
          return {
            content: [
              {
                type: 'text' as const,
                text: JSON.stringify({
                  success: false,
                  error: result.error,
                }),
              },
            ],
          };
        }

        // Notify session about screenshot capture
        const session = sessionManager.getSession(sessionId);
        if (session?.onMessage) {
          session.onMessage({
            type: 'screenshot_captured',
            url: args.url,
            screenshotPath: result.screenshotPath,
            entityName: result.entityName,
          });
        }

        return {
          content: [
            {
              type: 'text' as const,
              text: JSON.stringify({
                success: true,
                cacheId: result.cacheId,
                cachePath: result.cachePath,
                screenshotPath: result.screenshotPath,
                url: result.url,
                entityId: result.entityId,
                entityName: result.entityName,
                contentPreview: result.contentPreview,
                message:
                  'URL fetched and screenshot captured. Analyze the screenshot to extract data.',
              }),
            },
          ],
        };
      } catch (error) {
        return {
          content: [
            {
              type: 'text' as const,
              text: JSON.stringify({
                success: false,
                error: error instanceof Error ? error.message : String(error),
              }),
            },
          ],
        };
      }
    }
  );

const getCachedContentTool = tool(
  'get_cached_content',
  'Read cached content from a previous fetch operation',
  {
    cacheId: z.string().describe('The cache ID from a previous fetch'),
  },
  async (args) => {
    const result = await readCachedContent(args.cacheId);

    return {
      content: [
        {
          type: 'text' as const,
          text: JSON.stringify(result),
        },
      ],
    };
  }
);

// ============================================
// Data Extraction and Storage
// ============================================

const saveExtractionTool = (sessionId: string, sessionManager: ResearchSessionManager) =>
  tool(
    'save_extraction',
    'Save structured data extracted from a page. Use after analyzing screenshot/content.',
    {
      entityId: z.string().describe('The entity ID'),
      schemaType: z
        .enum(['pricing', 'features', 'company', 'compliance', 'integrations'])
        .describe('Type of data being saved'),
      url: z.string().describe('The source URL'),
      screenshotPath: z.string().optional().describe('Path to evidence screenshot'),
      data: z.record(z.any()).describe('The structured data extracted'),
      createAssertions: z
        .boolean()
        .optional()
        .default(true)
        .describe('Whether to auto-generate assertions'),
    },
    async (args) => {
      try {
        const result = await saveExtraction({
          entityId: args.entityId,
          schemaType: args.schemaType as SchemaType,
          url: args.url,
          screenshotPath: args.screenshotPath,
          data: args.data,
          createAssertions: args.createAssertions,
        });

        if (!result.success) {
          return {
            content: [
              {
                type: 'text' as const,
                text: JSON.stringify({
                  success: false,
                  error: result.error,
                }),
              },
            ],
          };
        }

        // Notify session about extraction
        const session = sessionManager.getSession(sessionId);
        if (session?.onMessage) {
          session.onMessage({
            type: 'extraction_complete',
            schemaType: args.schemaType,
            extractionId: result.extractionId,
            assertionCount: result.assertionsCreated?.length || 0,
          });
        }

        return {
          content: [
            {
              type: 'text' as const,
              text: JSON.stringify({
                success: true,
                extractionId: result.extractionId,
                assertionsCreated: result.assertionsCreated,
                message: `Saved ${args.schemaType} extraction with ${result.assertionsCreated?.length || 0} assertions`,
              }),
            },
          ],
        };
      } catch (error) {
        return {
          content: [
            {
              type: 'text' as const,
              text: JSON.stringify({
                success: false,
                error: error instanceof Error ? error.message : String(error),
              }),
            },
          ],
        };
      }
    }
  );

// ============================================
// Assertion Creation
// ============================================

const createAssertionTool = (sessionId: string, sessionManager: ResearchSessionManager) =>
  tool(
    'create_assertion',
    'Create an assertion with evidence. MUST include evidenceDescription and evidenceScreenshotPath.',
    {
      entityId: z.string().describe('The entity ID'),
      claim: z.string().describe('The claim being made'),
      category: z
        .string()
        .optional()
        .describe('Category: feature, pricing, integration, compliance, etc.'),
      evidenceDescription: z
        .string()
        .describe(
          'REQUIRED: Description of evidence. Format: "On screenshot at <path>, the text <quote> appears in <location>"'
        ),
      evidenceScreenshotPath: z
        .string()
        .describe('REQUIRED: Path to the screenshot that contains the evidence'),
      sourceUrl: z.string().optional().describe('The source URL where evidence was found'),
      reasoning: z.string().optional().describe('Why this claim is significant'),
      criticality: z
        .enum(['CRITICAL', 'HIGH', 'MEDIUM', 'LOW'])
        .optional()
        .default('MEDIUM')
        .describe('How important this claim is'),
    },
    async (args) => {
      try {
        // Validate required evidence fields
        if (!args.evidenceDescription || !args.evidenceScreenshotPath) {
          return {
            content: [
              {
                type: 'text' as const,
                text: JSON.stringify({
                  success: false,
                  error:
                    'Evidence-First Protocol violation: evidenceDescription and evidenceScreenshotPath are REQUIRED',
                }),
              },
            ],
          };
        }

        // Create the assertion
        const assertion = await prisma.assertion.create({
          data: {
            entityId: args.entityId,
            claim: args.claim,
            category: args.category,
            status: AssertionStatus.CLAIM,
            criticality:
              (args.criticality as AssertionCriticality) || AssertionCriticality.MEDIUM,
            evidenceDescription: args.evidenceDescription,
            evidenceScreenshotPath: args.evidenceScreenshotPath,
          },
        });

        // Add reasoning if provided
        if (args.reasoning) {
          await prisma.reasoning.create({
            data: {
              assertionId: assertion.id,
              content: args.reasoning,
            },
          });
        }

        // Add source if URL provided
        if (args.sourceUrl) {
          let source = await prisma.source.findUnique({
            where: { url: args.sourceUrl },
          });

          if (!source) {
            source = await prisma.source.create({
              data: {
                url: args.sourceUrl,
                sourceType: 'vendor_docs',
              },
            });
          }

          await prisma.assertionSource.create({
            data: {
              assertionId: assertion.id,
              sourceId: source.id,
            },
          });
        }

        // Log the action
        await prisma.researchLog.create({
          data: {
            action: 'assertion_created',
            details: {
              assertionId: assertion.id,
              entityId: args.entityId,
              claim: args.claim,
              sessionId,
            },
            agentId: `research-agent-${sessionId}`,
          },
        });

        // Notify session
        const session = sessionManager.getSession(sessionId);
        if (session?.onMessage) {
          session.onMessage({
            type: 'assertion_created',
            assertionId: assertion.id,
            claim: args.claim,
            category: args.category,
          });
        }

        return {
          content: [
            {
              type: 'text' as const,
              text: JSON.stringify({
                success: true,
                assertionId: assertion.id,
                claim: args.claim,
                message: 'Assertion created with evidence chain',
              }),
            },
          ],
        };
      } catch (error) {
        return {
          content: [
            {
              type: 'text' as const,
              text: JSON.stringify({
                success: false,
                error: error instanceof Error ? error.message : String(error),
              }),
            },
          ],
        };
      }
    }
  );

// ============================================
// Task Progress Management
// ============================================

const updateTaskProgressTool = (sessionId: string, sessionManager: ResearchSessionManager) =>
  tool(
    'update_task_progress',
    'Report progress on a research task',
    {
      taskId: z.string().describe('The task ID to update'),
      stage: z
        .enum([
          'initializing',
          'fetching_urls',
          'capturing_evidence',
          'analyzing_content',
          'creating_assertions',
          'validating_data',
          'finalizing',
        ])
        .describe('Current stage of the task'),
      stageDescription: z.string().describe('Human-readable description of current work'),
      percentComplete: z.number().min(0).max(100).describe('Percent complete (0-100)'),
      urlsFetched: z.number().optional().default(0).describe('Number of URLs fetched'),
      screenshotsCaptured: z
        .number()
        .optional()
        .default(0)
        .describe('Number of screenshots captured'),
      assertionsCreated: z
        .number()
        .optional()
        .default(0)
        .describe('Number of assertions created'),
      evidenceCollected: z
        .number()
        .optional()
        .default(0)
        .describe('Number of evidence items collected'),
    },
    async (args) => {
      try {
        const progress: TaskProgress = {
          stage: args.stage,
          stageDescription: args.stageDescription,
          percentComplete: args.percentComplete,
          urlsFetched: args.urlsFetched || 0,
          screenshotsCaptured: args.screenshotsCaptured || 0,
          assertionsCreated: args.assertionsCreated || 0,
          evidenceCollected: args.evidenceCollected || 0,
        };

        await sessionManager.updateTaskProgress(sessionId, args.taskId, progress);

        return {
          content: [
            {
              type: 'text' as const,
              text: JSON.stringify({
                success: true,
                message: `Task progress updated: ${args.stageDescription} (${args.percentComplete}%)`,
              }),
            },
          ],
        };
      } catch (error) {
        return {
          content: [
            {
              type: 'text' as const,
              text: JSON.stringify({
                success: false,
                error: error instanceof Error ? error.message : String(error),
              }),
            },
          ],
        };
      }
    }
  );

const completeTaskTool = (sessionId: string, sessionManager: ResearchSessionManager) =>
  tool(
    'complete_task',
    'Mark a research task as completed with results',
    {
      taskId: z.string().describe('The task ID to complete'),
      category: z
        .enum(['pricing', 'features', 'company', 'compliance', 'integrations'])
        .describe('The research category'),
      extractionId: z.string().optional().describe('ID of the extraction created'),
      assertionIds: z.array(z.string()).describe('IDs of assertions created'),
      screenshotPaths: z.array(z.string()).describe('Paths to screenshots captured'),
      sourcesFound: z.number().describe('Number of source URLs found'),
      dataQuality: z
        .enum(['high', 'medium', 'low', 'insufficient'])
        .describe('Quality assessment of extracted data'),
      summary: z.string().describe('Brief summary of findings'),
    },
    async (args) => {
      try {
        const results: TaskResults = {
          category: args.category,
          extractionId: args.extractionId,
          assertionIds: args.assertionIds,
          screenshotPaths: args.screenshotPaths,
          sourcesFound: args.sourcesFound,
          dataQuality: args.dataQuality,
          summary: args.summary,
        };

        await sessionManager.completeTask(sessionId, args.taskId, results);

        return {
          content: [
            {
              type: 'text' as const,
              text: JSON.stringify({
                success: true,
                message: `Task completed: ${args.category} - ${args.summary}`,
                assertionCount: args.assertionIds.length,
                screenshotCount: args.screenshotPaths.length,
              }),
            },
          ],
        };
      } catch (error) {
        return {
          content: [
            {
              type: 'text' as const,
              text: JSON.stringify({
                success: false,
                error: error instanceof Error ? error.message : String(error),
              }),
            },
          ],
        };
      }
    }
  );

const failTaskTool = (sessionId: string, sessionManager: ResearchSessionManager) =>
  tool(
    'fail_task',
    'Mark a research task as failed with an error message',
    {
      taskId: z.string().describe('The task ID that failed'),
      error: z.string().describe('Error message explaining what went wrong'),
    },
    async (args) => {
      try {
        await sessionManager.failTask(sessionId, args.taskId, args.error);

        return {
          content: [
            {
              type: 'text' as const,
              text: JSON.stringify({
                success: true,
                message: `Task marked as failed: ${args.error}`,
              }),
            },
          ],
        };
      } catch (error) {
        return {
          content: [
            {
              type: 'text' as const,
              text: JSON.stringify({
                success: false,
                error: error instanceof Error ? error.message : String(error),
              }),
            },
          ],
        };
      }
    }
  );

// ============================================
// Session Information
// ============================================

const getTasksTool = (sessionId: string) =>
  tool(
    'get_tasks',
    'Get the list of tasks for this research session',
    {},
    async () => {
      try {
        const tasks = await prisma.researchTask.findMany({
          where: { sessionId },
          orderBy: { category: 'asc' },
        });

        return {
          content: [
            {
              type: 'text' as const,
              text: JSON.stringify({
                success: true,
                tasks: tasks.map((t) => ({
                  id: t.id,
                  category: t.category,
                  status: t.status,
                  progress: t.progress,
                })),
              }),
            },
          ],
        };
      } catch (error) {
        return {
          content: [
            {
              type: 'text' as const,
              text: JSON.stringify({
                success: false,
                error: error instanceof Error ? error.message : String(error),
              }),
            },
          ],
        };
      }
    }
  );

const getEntityTool = (sessionId: string, sessionManager: ResearchSessionManager) =>
  tool(
    'get_entity',
    'Get entity information for this research session',
    {},
    async () => {
      try {
        const session = sessionManager.getSession(sessionId);
        if (!session) {
          return {
            content: [
              {
                type: 'text' as const,
                text: JSON.stringify({ success: false, error: 'Session not found' }),
              },
            ],
          };
        }

        const entity = await prisma.entity.findUnique({
          where: { id: session.entityId },
          include: {
            project: { select: { id: true, name: true } },
          },
        });

        return {
          content: [
            {
              type: 'text' as const,
              text: JSON.stringify({
                success: true,
                entity: {
                  id: entity?.id,
                  name: entity?.name,
                  url: entity?.url,
                  entityType: entity?.entityType,
                  project: entity?.project,
                },
              }),
            },
          ],
        };
      } catch (error) {
        return {
          content: [
            {
              type: 'text' as const,
              text: JSON.stringify({
                success: false,
                error: error instanceof Error ? error.message : String(error),
              }),
            },
          ],
        };
      }
    }
  );

// ============================================
// MCP Server Factory
// ============================================

/**
 * Create an MCP server with all research tools for a specific session
 */
export function createResearchMcpServer(
  sessionId: string,
  sessionManager: ResearchSessionManager
) {
  return createSdkMcpServer({
    name: 'research',
    version: '1.0.0',
    tools: [
      // URL fetching and evidence capture
      fetchUrlTool(sessionId, sessionManager),
      getCachedContentTool,

      // Data extraction and storage
      saveExtractionTool(sessionId, sessionManager),
      createAssertionTool(sessionId, sessionManager),

      // Task progress management
      updateTaskProgressTool(sessionId, sessionManager),
      completeTaskTool(sessionId, sessionManager),
      failTaskTool(sessionId, sessionManager),

      // Session information
      getTasksTool(sessionId),
      getEntityTool(sessionId, sessionManager),
    ],
  });
}

/**
 * Export individual tools for testing
 */
export const researchTools = {
  fetchUrl: fetchUrlTool,
  getCachedContent: getCachedContentTool,
  saveExtraction: saveExtractionTool,
  createAssertion: createAssertionTool,
  updateTaskProgress: updateTaskProgressTool,
  completeTask: completeTaskTool,
  failTask: failTaskTool,
  getTasks: getTasksTool,
  getEntity: getEntityTool,
};
