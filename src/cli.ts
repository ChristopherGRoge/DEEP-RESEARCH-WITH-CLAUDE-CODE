#!/usr/bin/env npx ts-node

/**
 * Deep Research CLI
 *
 * A command-line interface for subagents to interact with the research database.
 *
 * Usage:
 *   npx ts-node src/cli.ts <command> [options]
 *
 * Commands are executed and results are returned as JSON.
 */

import 'dotenv/config';
import * as tools from './tools';

interface CommandResult {
  success: boolean;
  data?: unknown;
  error?: string;
}

async function executeCommand(command: string, args: Record<string, unknown>): Promise<CommandResult> {
  try {
    let result: unknown;

    switch (command) {
      // Project commands
      case 'project:create':
        result = await tools.createProject(args as unknown as tools.CreateProjectInput);
        break;
      case 'project:get':
        result = await tools.getProject(args.projectId as string);
        break;
      case 'project:list':
        result = await tools.listProjects();
        break;
      case 'project:update':
        result = await tools.updateProject(args.projectId as string, args as unknown as tools.UpdateProjectInput);
        break;
      case 'project:delete':
        result = await tools.deleteProject(args.projectId as string);
        break;
      case 'project:find':
        result = await tools.findProjectByName(args.name as string);
        break;

      // Entity commands
      case 'entity:create':
        result = await tools.createEntity(args as unknown as tools.CreateEntityInput);
        break;
      case 'entity:get':
        result = await tools.getEntity(args.entityId as string);
        break;
      case 'entity:find':
        result = await tools.findEntityByName(args.projectId as string, args.name as string);
        break;
      case 'entity:list':
        result = await tools.listEntities(args.projectId as string);
        break;
      case 'entity:search':
        result = await tools.searchEntities(args as unknown as tools.SearchEntitiesInput);
        break;
      case 'entity:update':
        result = await tools.updateEntity(args.entityId as string, args as unknown as tools.UpdateEntityInput);
        break;
      case 'entity:delete':
        result = await tools.deleteEntity(args.entityId as string);
        break;
      case 'entity:exists':
        result = await tools.entityExists(args.projectId as string, args.name as string);
        break;

      // Assertion commands
      case 'assertion:create':
        result = await tools.createAssertion(args as unknown as tools.CreateAssertionInput);
        break;
      case 'assertion:get':
        result = await tools.getAssertion(args.assertionId as string);
        break;
      case 'assertion:list':
        result = await tools.listAssertions(args.entityId as string);
        break;
      case 'assertion:search':
        result = await tools.searchAssertions(args as unknown as tools.SearchAssertionsInput);
        break;
      case 'assertion:update':
        result = await tools.updateAssertion(args.assertionId as string, args as unknown as tools.UpdateAssertionInput);
        break;
      case 'assertion:validate':
        result = await tools.validateAssertion(args.assertionId as string, args.validatedBy as string);
        break;
      case 'assertion:reject':
        result = await tools.rejectAssertion(args.assertionId as string, args.validatedBy as string);
        break;
      case 'assertion:delete':
        result = await tools.deleteAssertion(args.assertionId as string);
        break;
      case 'assertion:addReasoning':
        result = await tools.addReasoning(args.assertionId as string, args.content as string, args.agentId as string | undefined);
        break;
      case 'assertion:findSimilar':
        result = await tools.findSimilarAssertions(args.entityId as string, args.claim as string);
        break;

      // Source commands
      case 'source:create':
        result = await tools.createSource(args as unknown as tools.CreateSourceInput);
        break;
      case 'source:get':
        result = await tools.getSource(args.sourceId as string);
        break;
      case 'source:find':
        result = await tools.findSourceByUrl(args.url as string);
        break;
      case 'source:list':
        result = await tools.listSources(args.status as tools.SourceStatus | undefined);
        break;
      case 'source:search':
        result = await tools.searchSources(args.query as string);
        break;
      case 'source:link':
        result = await tools.linkSourceToAssertion(args as unknown as tools.LinkSourceInput);
        break;
      case 'source:update':
        result = await tools.updateSource(args.sourceId as string, args as unknown as tools.UpdateSourceInput);
        break;
      case 'source:validate':
        result = await tools.validateSource(args.sourceId as string, args.validatedBy as string);
        break;
      case 'source:reject':
        result = await tools.rejectSource(args.sourceId as string, args.validatedBy as string);
        break;
      case 'source:delete':
        result = await tools.deleteSource(args.sourceId as string);
        break;
      case 'source:byType':
        result = await tools.getSourcesByType(args.sourceType as string);
        break;

      // Search commands
      case 'search:global':
        result = await tools.globalSearch(args as unknown as tools.GlobalSearchInput);
        break;
      case 'search:summary':
        result = await tools.getResearchSummary(args.projectId as string);
        break;
      case 'search:pending':
        result = await tools.getPendingValidation(args.projectId as string | undefined);
        break;
      case 'search:activity':
        result = await tools.getRecentActivity(args.limit as number | undefined);
        break;
      case 'search:noAssertions':
        result = await tools.getEntitiesWithoutAssertions(args.projectId as string);
        break;
      case 'search:noSources':
        result = await tools.getAssertionsWithoutSources(args.projectId as string | undefined);
        break;

      // ============================================
      // RESEARCH GAPS - What needs to be researched?
      // ============================================
      case 'research:gaps':
        result = await tools.getResearchGaps(args.projectId as string);
        break;

      // ============================================
      // CROSS-ENTITY QUERIES - Analyze across entities
      // ============================================
      case 'query:search':
        result = await tools.queryExtractions(args as unknown as tools.GenericQueryInput);
        break;
      case 'query:values':
        result = await tools.getFieldValues(args as { projectId: string; schemaType: string; fieldPath: string });
        break;
      case 'query:pricing':
        result = await tools.queryPricing(args as unknown as tools.PricingQueryInput);
        break;
      case 'query:compliance':
        result = await tools.queryCompliance(args as unknown as tools.ComplianceQueryInput);
        break;
      case 'query:features':
        result = await tools.queryFeatures(args as unknown as tools.FeatureQueryInput);
        break;
      case 'query:integrations':
        result = await tools.queryIntegrations(args as { projectId: string; hasApi?: boolean; hasSdk?: boolean; searchTerm?: string });
        break;
      case 'query:companies':
        result = await tools.queryCompanies(args as { projectId: string; minFounding?: number; maxFounding?: number });
        break;
      case 'query:compare':
        result = await tools.compareEntities(args as unknown as tools.CompareEntitiesInput);
        break;

      // ============================================
      // EXTRACTION DIFF - Track changes over time
      // ============================================
      case 'diff:latest':
        result = await tools.getLatestDiff(args as { entityId: string; schemaType: string });
        break;
      case 'diff:compare':
        result = await tools.diffExtractions(args as { oldExtractionId: string; newExtractionId: string });
        break;
      case 'diff:history':
        result = await tools.getExtractionHistory(args as { entityId: string; schemaType: string; limit?: number });
        break;
      case 'diff:changes':
        result = await tools.findRecentChanges(args as { projectId: string; schemaType?: string; daysBack?: number });
        break;

      // ============================================
      // RESEARCH AGENDA - Batch processing queue
      // ============================================
      case 'agenda:create':
        result = await tools.createAgenda(args as unknown as tools.CreateAgendaInput);
        break;
      case 'agenda:list':
        result = tools.listAgendas();
        break;
      case 'agenda:get':
        result = tools.getAgenda(args.agendaId as string);
        break;
      case 'agenda:status':
        result = tools.getAgendaStatus(args.agendaId as string);
        break;
      case 'agenda:next':
        result = tools.getNextItem(args.agendaId as string);
        break;
      case 'agenda:complete':
        result = tools.completeItem(args.agendaId as string, args.notes as string | undefined);
        break;
      case 'agenda:skip':
        result = tools.skipItem(args.agendaId as string, args.reason as string | undefined);
        break;
      case 'agenda:fail':
        result = tools.failItem(args.agendaId as string, args.error as string);
        break;
      case 'agenda:reset':
        result = tools.resetAgenda(args.agendaId as string, args as { resetCompleted?: boolean; resetSkipped?: boolean; resetFailed?: boolean });
        break;
      case 'agenda:delete':
        result = tools.deleteAgenda(args.agendaId as string);
        break;
      case 'agenda:suggest':
        result = await tools.suggestAgendas(args.projectId as string);
        break;

      // ============================================
      // EXTRACTION COMMANDS - Primary deep research tool
      // ============================================

      // RECOMMENDED: Fetch + Claude reasoning workflow (no API key needed)
      case 'extract:fetch':
        result = await tools.fetchForExtraction(args as unknown as tools.FetchInput);
        break;
      case 'extract:cache':
        result = await tools.readCachedContent(args.cacheId as string);
        break;
      case 'extract:save':
        result = await tools.saveExtraction(args as unknown as tools.SaveExtractionInput);
        break;

      // Automated extraction (requires ANTHROPIC_API_KEY)
      case 'extract:pricing':
        result = await tools.extractPricing(
          args.url as string,
          args.entityId as string,
          { screenshot: args.screenshot as boolean, createAssertions: args.createAssertions as boolean }
        );
        break;
      case 'extract:features':
        result = await tools.extractFeatures(
          args.url as string,
          args.entityId as string,
          { screenshot: args.screenshot as boolean, createAssertions: args.createAssertions as boolean }
        );
        break;
      case 'extract:company':
        result = await tools.extractCompany(
          args.url as string,
          args.entityId as string,
          { screenshot: args.screenshot as boolean, createAssertions: args.createAssertions as boolean }
        );
        break;
      case 'extract:compliance':
        result = await tools.extractCompliance(
          args.url as string,
          args.entityId as string,
          { screenshot: args.screenshot as boolean, createAssertions: args.createAssertions as boolean }
        );
        break;
      case 'extract:integrations':
        result = await tools.extractIntegrations(
          args.url as string,
          args.entityId as string,
          { screenshot: args.screenshot as boolean, createAssertions: args.createAssertions as boolean }
        );
        break;
      case 'extract:validate':
        result = await tools.validateUrl(args.url as string);
        break;
      case 'extract:list':
        result = await tools.getExtractions(
          args.entityId as string,
          args.schemaType as tools.SchemaType | undefined
        );
        break;
      case 'extract:latest':
        result = await tools.getLatestExtraction(
          args.entityId as string,
          args.schemaType as tools.SchemaType
        );
        break;
      case 'extract:stale':
        result = await tools.getStaleExtractions(args.projectId as string | undefined);
        break;
      case 'extract:summary':
        result = await tools.getExtractionSummary(args.projectId as string);
        break;

      default:
        return { success: false, error: `Unknown command: ${command}` };
    }

    return { success: true, data: result };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log(JSON.stringify({
      success: false,
      error: 'No command provided. Usage: npx ts-node src/cli.ts <command> [json-args]',
      availableCommands: [
        // EXTRACTION - Primary deep research commands (USE THESE!)
        // Recommended: fetch + Claude reasoning + save workflow
        'extract:fetch', 'extract:cache', 'extract:save',
        // Automated (requires ANTHROPIC_API_KEY)
        'extract:pricing', 'extract:features', 'extract:company', 'extract:compliance', 'extract:integrations',
        'extract:validate', 'extract:list', 'extract:latest', 'extract:stale', 'extract:summary',
        // Standard commands
        'project:create', 'project:get', 'project:list', 'project:update', 'project:delete', 'project:find',
        'entity:create', 'entity:get', 'entity:find', 'entity:list', 'entity:search', 'entity:update', 'entity:delete', 'entity:exists',
        'assertion:create', 'assertion:get', 'assertion:list', 'assertion:search', 'assertion:update', 'assertion:validate', 'assertion:reject', 'assertion:delete', 'assertion:addReasoning', 'assertion:findSimilar',
        'source:create', 'source:get', 'source:find', 'source:list', 'source:search', 'source:link', 'source:update', 'source:validate', 'source:reject', 'source:delete', 'source:byType',
        'search:global', 'search:summary', 'search:pending', 'search:activity', 'search:noAssertions', 'search:noSources',
        // Research planning
        'research:gaps',
        // Cross-entity queries
        'query:search', 'query:values', 'query:pricing', 'query:compliance', 'query:features', 'query:integrations', 'query:companies', 'query:compare',
        // Extraction diff
        'diff:latest', 'diff:compare', 'diff:history', 'diff:changes',
        // Research agenda
        'agenda:create', 'agenda:list', 'agenda:get', 'agenda:status', 'agenda:next', 'agenda:complete', 'agenda:skip', 'agenda:fail', 'agenda:reset', 'agenda:delete', 'agenda:suggest',
      ],
    }));
    process.exit(1);
  }

  const command = args[0];
  let commandArgs: Record<string, unknown> = {};

  // Parse JSON args if provided
  if (args[1]) {
    try {
      commandArgs = JSON.parse(args[1]);
    } catch {
      // Try to parse as key=value pairs
      for (let i = 1; i < args.length; i++) {
        const [key, ...valueParts] = args[i].split('=');
        commandArgs[key] = valueParts.join('=');
      }
    }
  }

  const result = await executeCommand(command, commandArgs);
  console.log(JSON.stringify(result, null, 2));

  // Disconnect Prisma client
  await tools.prisma.$disconnect();
}

main().catch((error) => {
  console.log(JSON.stringify({ success: false, error: error.message }));
  process.exit(1);
});
