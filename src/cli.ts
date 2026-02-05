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
import { SourceType } from '../generated/prisma/client';

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
      case 'project:update': {
        const { projectId, ...updateData } = args;
        result = await tools.updateProject(projectId as string, updateData as unknown as tools.UpdateProjectInput);
        break;
      }
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
      case 'entity:update': {
        const { entityId, ...updateData } = args;
        result = await tools.updateEntity(entityId as string, updateData as unknown as tools.UpdateEntityInput);
        break;
      }
      case 'entity:delete':
        result = await tools.deleteEntity(args.entityId as string);
        break;
      case 'entity:exists':
        result = await tools.entityExists(args.projectId as string, args.name as string);
        break;
      case 'entity:categorize':
        result = await tools.categorizeEntities(args as unknown as tools.CategorizeEntitiesInput);
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
      case 'assertion:update': {
        const { assertionId, ...updateData } = args;
        result = await tools.updateAssertion(assertionId as string, updateData as unknown as tools.UpdateAssertionInput);
        break;
      }
      case 'assertion:validate':
        result = await tools.validateAssertion(args.assertionId as string, args.validatedBy as string);
        break;
      case 'assertion:reject':
        result = await tools.rejectAssertion(args.assertionId as string, args.validatedBy as string, args.rejectionReason as string | undefined);
        break;
      case 'assertion:setCriticality':
        result = await tools.setCriticality(args.assertionId as string, args.criticality as tools.AssertionCriticality);
        break;
      case 'assertion:markCited':
        result = await tools.markCitedInConclusion(args.assertionId as string, args.conclusionContext as string);
        break;
      case 'assertion:pendingValidation':
        result = await tools.getAssertionsPendingValidation(args.projectId as string | undefined);
        break;
      case 'assertion:rejectedForReresearch':
        result = await tools.getRejectedForReresearch(args.projectId as string | undefined);
        break;
      case 'assertion:supersede':
        result = await tools.supersededAssertion(args.rejectedId as string, args.newAssertionId as string);
        break;
      case 'assertion:respond':
        result = await tools.addHumanResponse(
          args.assertionId as string,
          args.response as string,
          args.validatedBy as string,
          {
            partiallyValidated: args.partiallyValidated as boolean | undefined,
            validatedClaims: args.validatedClaims as string[] | undefined,
            challengedClaims: args.challengedClaims as string[] | undefined,
          }
        );
        break;
      case 'assertion:agentRespond':
        result = await tools.addAgentResponse(
          args.assertionId as string,
          args.response as string,
          args.agentId as string | undefined
        );
        break;
      case 'assertion:dialogues':
        result = await tools.getActiveDialogues(args.projectId as string | undefined);
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
      case 'assertion:calculate-confidence':
        result = await tools.calculateConfidence(args.assertionId as string);
        break;
      case 'assertion:set-confidence':
        result = await tools.updateConfidence(
          args.assertionId as string,
          args.score as number | undefined,
          args.factors as tools.AssertionConfidenceFactors | undefined
        );
        break;
      case 'assertion:by-confidence':
        result = await tools.getAssertionsByConfidence(
          args.entityId as string,
          args.minConfidence as number,
          args.maxConfidence as number | undefined
        );
        break;
      case 'assertion:low-confidence':
        result = await tools.getLowConfidenceAssertions(
          args.projectId as string | undefined,
          args.threshold as number | undefined
        );
        break;
      case 'assertion:recalculate-confidence':
        result = await tools.recalculateProjectConfidence(args.projectId as string);
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
      case 'source:update': {
        const { sourceId, ...updateData } = args;
        result = await tools.updateSource(sourceId as string, updateData as unknown as tools.UpdateSourceInput);
        break;
      }
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
      // LOGO COMMANDS - Entity branding/visual identity
      // ============================================
      case 'logo:search':
        result = await tools.searchForLogo(args.entityId as string);
        break;
      case 'logo:verify':
        result = await tools.verifyLogoUrl(args.url as string);
        break;
      case 'logo:download':
        result = await tools.downloadLogo(args.url as string, args.entityName as string);
        break;
      case 'logo:save':
        result = await tools.saveLogo(args as unknown as tools.LogoSaveInput);
        break;
      case 'logo:fetch':
        result = await tools.fetchLogo(args.entityId as string);
        break;
      case 'logo:missing':
        result = await tools.getEntitiesWithoutLogos(args.projectId as string | undefined);
        break;
      case 'logo:summary':
        result = await tools.getLogoSummary(args.projectId as string);
        break;
      case 'logo:validate':
        result = await tools.verifyEntityLogo(args.entityId as string, args.verifiedBy as string);
        break;
      case 'logo:clear':
        result = await tools.clearLogo(args.entityId as string);
        break;
      case 'logo:inline':
        result = await tools.getLogoInline(args.entityId as string);
        break;

      // ============================================
      // RSS CRAWLER - Automated entity discovery from feeds
      // ============================================
      case 'rss:crawl':
        result = await tools.crawlRSSFeed(args as unknown as tools.RSSCrawlerConfig);
        break;
      case 'rss:save':
        result = await tools.saveDiscoveries(args.discoveries as tools.RawDiscoveryInput[]);
        break;
      case 'rss:stats':
        result = await tools.getCrawlStats(args.projectId as string);
        break;

      // ============================================
      // VALIDATION DASHBOARD - Human-in-the-loop review
      // ============================================
      case 'validation:generate':
        result = await tools.generateValidationDashboard({
          projectId: args.projectId as string | undefined,
          outputPath: args.outputPath as string | undefined,
          validatorName: args.validatorName as string | undefined,
        });
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
      case 'extract:differentiators':
        result = await tools.extractDifferentiators(
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

      // ============================================
      // CITATION VERIFICATION - Mandatory before citing quotes
      // ============================================
      case 'cite:verify':
        result = await tools.verifyCitation(args as unknown as tools.CiteVerifyInput);
        break;

      // ============================================
      // ADVERSARIAL VALIDATION - Structured validation storage
      // ============================================
      case 'validation:create':
        result = await tools.createValidation(args as unknown as tools.ValidationCreateInput);
        break;
      case 'validation:get':
        result = await tools.getValidation(args as unknown as tools.ValidationGetInput);
        break;
      case 'validation:list':
        result = await tools.listValidations(args as unknown as tools.ValidationListInput);
        break;
      case 'validation:summary':
        result = await tools.getValidationSummary(args as unknown as tools.ValidationSummaryInput);
        break;
      case 'validation:latest':
        result = await tools.getLatestValidation({ assertionId: args.assertionId as string });
        break;
      case 'validation:history':
        result = await tools.getValidationHistory({ assertionId: args.assertionId as string });
        break;
      case 'validation:unvalidated':
        result = await tools.getUnvalidatedAssertions({
          entityId: args.entityId as string,
          criticality: args.criticality as string | undefined,
        });
        break;
      case 'validation:pillars':
        result = await tools.getPillarAssertions({ entityId: args.entityId as string });
        break;

      // Verified citations (from cite:verify, persisted)
      case 'citation:create':
        result = await tools.createCitation(args as unknown as tools.CitationCreateInput);
        break;
      case 'citation:list':
        result = await tools.listCitations(args as unknown as tools.CitationListInput);
        break;
      case 'citation:find':
        result = await tools.findCitation({ url: args.url as string, quote: args.quote as string });
        break;

      // ============================================
      // CRAWLERS - Web discovery tools
      // ============================================
      case 'crawl:hn':
        result = await tools.crawlHackerNews(args as unknown as tools.HNCrawlerConfig);
        break;
      case 'crawl:hn-persist':
        result = await tools.crawlAndPersist(args as unknown as tools.HNCrawlerConfig & { projectId: string });
        break;
      case 'crawl:show-hn':
        result = await tools.crawlShowHN(args.projectId as string, args.limit as number | undefined);
        break;
      case 'crawl:top-ai':
        result = await tools.crawlTopAIStories(args.projectId as string, args.limit as number | undefined);
        break;

      // ============================================
      // EVIDENCE VALIDATION - Evidence quality and integrity
      // ============================================
      case 'evidence:conflicts':
        result = await tools.findConflictingEvidence(args as unknown as tools.FindConflictsInput);
        break;
      case 'evidence:crossref':
        result = await tools.crossReferenceEvidence(args as unknown as tools.CrossReferenceInput);
        break;
      case 'evidence:freshness':
        result = await tools.checkEvidenceFreshness(args as unknown as tools.CheckFreshnessInput);
        break;
      case 'evidence:validate-chain':
        result = await tools.validateEvidenceChain(args as unknown as tools.ValidateChainInput);
        break;
      case 'evidence:confidence':
        result = await tools.calculateEvidenceConfidence(args as unknown as tools.CalculateEvidenceConfidenceInput);
        break;

      // ============================================
      // ORCHESTRATOR COMMANDS - Spawn and manage subagents
      // ============================================
      case 'orchestrate:spawn':
        result = await tools.spawnSubagent(args as unknown as tools.SpawnSubagentInput);
        break;
      case 'orchestrate:status':
        result = tools.getSubagentStatus(args.taskId as string);
        break;
      case 'orchestrate:list':
        result = tools.listAllSubagents(args as { status?: tools.TaskStatus; taskType?: tools.TaskType });
        break;
      case 'orchestrate:active':
        result = tools.listActiveSubagents();
        break;
      case 'orchestrate:cancel':
        result = tools.cancelSubagent(args.taskId as string);
        break;
      case 'orchestrate:send':
        tools.sendInputToSubagent(args.taskId as string, args.message as string);
        result = { success: true, message: 'Input sent to subagent' };
        break;
      case 'orchestrate:cleanup':
        result = tools.cleanupOldTasks(args.olderThanHours as number | undefined);
        break;

      // Convenience spawners
      case 'orchestrate:haiku':
        result = await tools.spawnHaikuAgent(
          args.taskType as tools.TaskType,
          args.prompt as string,
          args as Partial<tools.SpawnSubagentInput>
        );
        break;
      case 'orchestrate:sonnet':
        result = await tools.spawnSonnetAgent(
          args.taskType as tools.TaskType,
          args.prompt as string,
          args as Partial<tools.SpawnSubagentInput>
        );
        break;
      case 'orchestrate:opus':
        result = await tools.spawnOpusAgent(
          args.taskType as tools.TaskType,
          args.prompt as string,
          args as Partial<tools.SpawnSubagentInput>
        );
        break;

      // Synchronous spawners (wait for completion)
      case 'orchestrate:run':
        result = await tools.spawnSubagentSync({
          taskType: (args.taskType as tools.TaskType) || 'custom',
          prompt: args.prompt as string,
          model: args.model as tools.ModelTier,
          entityId: args.entityId as string | undefined,
          timeout: args.timeout as number | undefined,
        });
        break;
      case 'orchestrate:run-haiku':
        result = await tools.spawnSubagentSync({
          taskType: (args.taskType as tools.TaskType) || 'custom',
          prompt: args.prompt as string,
          model: 'haiku',
          entityId: args.entityId as string | undefined,
          timeout: args.timeout as number | undefined,
        });
        break;
      case 'orchestrate:run-sonnet':
        result = await tools.spawnSubagentSync({
          taskType: (args.taskType as tools.TaskType) || 'custom',
          prompt: args.prompt as string,
          model: 'sonnet',
          entityId: args.entityId as string | undefined,
          timeout: args.timeout as number | undefined,
        });
        break;

      // ============================================
      // REDDIT CRAWLER - Community research
      // ============================================
      case 'crawler:reddit':
        result = await tools.crawlSubreddit(args as unknown as tools.RedditCrawlerConfig, args.crawlSessionId as string || 'manual');
        break;
      case 'crawler:reddit-multi':
        result = await tools.crawlMultipleSubreddits(args.configs as tools.RedditCrawlerConfig[], args.crawlSessionId as string || 'manual');
        break;
      case 'crawler:reddit-comments':
        result = await tools.fetchPostComments(args.permalink as string, args.limit as number | undefined);
        break;
      case 'crawler:reddit-aggregate':
        result = tools.aggregateRedditDiscoveries(args.results as tools.RedditCrawlResult[]);
        break;

      // ============================================
      // DISCOVERY SOURCE REGISTRY - Source management
      // ============================================
      case 'discovery:source:create':
        result = await tools.createDiscoverySource(args as unknown as tools.SourceCreateInput);
        break;
      case 'discovery:source:get':
        result = await tools.getDiscoverySource(args.sourceId as string);
        break;
      case 'discovery:source:update':
        result = await tools.updateDiscoverySource(args.sourceId as string, args as Partial<tools.SourceCreateInput>);
        break;
      case 'discovery:source:delete':
        result = await tools.deleteDiscoverySource(args.sourceId as string);
        break;
      case 'discovery:source:list':
        result = await tools.listDiscoverySources(args as { sourceType?: SourceType; isActive?: boolean; category?: string });
        break;
      case 'discovery:source:byType':
        result = await tools.getDiscoverySourcesByType(args.sourceType as SourceType);
        break;
      case 'discovery:source:stale':
        result = await tools.getStaleSources(args.maxAgeHours as number);
        break;
      case 'discovery:source:stats':
        result = await tools.getSourceStats();
        break;
      case 'discovery:source:markCrawled':
        result = await tools.markSourceCrawled(
          args.sourceId as string,
          args.success as boolean,
          args.error as string | undefined
        );
        break;
      case 'discovery:source:updateMetrics':
        result = await tools.updateSourceMetrics(
          args.sourceId as string,
          args as { discoveriesCount?: number; validatedCount?: number }
        );
        break;
      case 'discovery:source:seed':
        result = await tools.seedDefaultSources();
        break;

      // ============================================
      // DISCOVERY CRAWL ORCHESTRATOR - Coordinate crawls
      // ============================================
      case 'discovery:crawl:start':
        result = await tools.startDiscoveryCrawl(args as unknown as tools.CrawlConfig);
        break;
      case 'discovery:crawl:status':
        result = await tools.getCrawlStatus(args.crawlId as string);
        break;
      case 'discovery:crawl:pause':
        result = await tools.pauseCrawl(args.crawlId as string);
        break;
      case 'discovery:crawl:resume':
        result = await tools.resumeCrawl(args.crawlId as string);
        break;
      case 'discovery:crawl:cancel':
        result = await tools.cancelCrawl(args.crawlId as string);
        break;
      case 'discovery:crawl:history':
        result = await tools.getCrawlHistory(args.projectId as string, args.limit as number | undefined);
        break;
      case 'discovery:crawl:due':
        result = await tools.getSourcesDueForCrawl();
        break;
      case 'discovery:crawl:scheduled':
        result = await tools.runScheduledCrawl(args.projectId as string);
        break;

      // ============================================
      // DISCOVERY PROCESSOR - Deduplication and entity resolution
      // ============================================
      case 'discovery:process:one':
        result = await tools.processRawDiscovery(args.projectId as string, args.rawDiscoveryId as string);
        break;
      case 'discovery:process:pending':
        result = await tools.processPendingDiscoveries(args.projectId as string, args.limit as number | undefined);
        break;
      case 'discovery:process:match':
        result = await tools.findMatchingEntity(
          args.projectId as string,
          args.name as string,
          args.urls as string[] || [],
          args.description as string | undefined
        );
        break;
      case 'discovery:process:save':
        result = await tools.saveRawDiscovery(args as unknown as tools.DiscoveryProcessorInput);
        break;
      case 'discovery:process:getPending':
        result = await tools.getPendingDiscoveries(args.projectId as string | undefined, args.limit as number | undefined);
        break;
      case 'discovery:process:search':
        result = await tools.searchDiscoveries(
          args.query as string,
          args as { sourceType?: string; processed?: boolean }
        );
        break;
      case 'discovery:process:stats':
        result = await tools.getDiscoveryStats(args.projectId as string);
        break;

      // ============================================
      // CRITICALITY SCORING - Prioritize assertions
      // ============================================
      case 'discovery:criticality:calculate':
        result = await tools.calculateCriticality(args.assertionId as string, args.weights as any);
        break;
      case 'discovery:criticality:scoreEntity':
        result = await tools.scoreEntityAssertions(args.entityId as string, args.weights as any);
        break;
      case 'discovery:criticality:scoreProject':
        result = await tools.scoreProjectAssertions(args.projectId as string, args.weights as any);
        break;
      case 'discovery:criticality:byLevel':
        result = await tools.getAssertionsByCriticality(
          args.projectId as string,
          args.level as 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW',
          args.limit as number | undefined
        );
        break;
      case 'discovery:criticality:needingValidation':
        result = await tools.getCriticalAssertionsNeedingValidation(args.projectId as string);
        break;
      case 'discovery:criticality:summary':
        result = await tools.getCriticalitySummary(args.projectId as string);
        break;

      // ============================================
      // TREND DETECTION - Pattern analysis
      // ============================================
      case 'discovery:trends:detect':
        result = await tools.detectTrends(
          args.projectId as string,
          args as { windowDays?: number; minMentions?: number; minSources?: number }
        );
        break;
      case 'discovery:trends:list':
        result = await tools.listTrends(
          args.projectId as string,
          args as { minScore?: number; category?: string; emerging?: boolean; limit?: number }
        );
        break;
      case 'discovery:trends:details':
        result = await tools.getTrendDetails(args.trendId as string);
        break;
      case 'discovery:trends:entities':
        result = await tools.getTrendingEntities(args.projectId as string, args.limit as number | undefined);
        break;
      case 'discovery:trends:report':
        result = await tools.generateTrendReport(args.projectId as string);
        break;
      case 'discovery:trends:export':
        result = await tools.exportTrendsMarkdown(args.projectId as string);
        break;

      // ============================================
      // GITHUB CRAWLER - Awesome lists and trending
      // ============================================
      case 'crawler:github-awesome':
        result = await tools.crawlAwesomeList(
          args as unknown as tools.GitHubListConfig,
          args.crawlSessionId as string || 'manual'
        );
        break;
      case 'crawler:github-trending':
        result = await tools.crawlGitHubTrending(
          args as unknown as tools.GitHubTrendingConfig,
          args.crawlSessionId as string || 'manual'
        );
        break;
      case 'crawler:github-diff':
        result = await tools.diffAwesomeList(
          args.oldEntries as tools.AwesomeListEntry[],
          args.newEntries as tools.AwesomeListEntry[]
        );
        break;

      // ============================================
      // NITTER/X CRAWLER - Twitter/X via Nitter
      // ============================================
      case 'crawler:nitter':
        result = await tools.crawlAccount(args as unknown as tools.NitterAccountConfig);
        break;
      case 'crawler:nitter-search':
        result = await tools.crawlSearch(args as unknown as tools.NitterSearchConfig);
        break;

      // ============================================
      // RESEARCH DOMAIN COMMANDS - Domain-driven research
      // ============================================
      case 'domain:create':
        result = await tools.createDomain(args as unknown as tools.CreateDomainInput);
        break;
      case 'domain:get':
        result = await tools.getDomain((args.domainId || args.name || args.identifier) as string);
        break;
      case 'domain:list':
        result = await tools.listDomains();
        break;
      case 'domain:update': {
        const { domainId, ...domainUpdateData } = args;
        result = await tools.updateDomain(domainId as string, domainUpdateData as unknown as tools.UpdateDomainInput);
        break;
      }
      case 'domain:delete':
        result = await tools.deleteDomain(args.domainId as string);
        break;
      case 'domain:find':
        result = await tools.findDomainByName(args.name as string);
        break;
      case 'domain:entities':
        result = await tools.getDomainEntities(args.domainId as string, { limit: args.limit as number, offset: args.offset as number });
        break;
      case 'domain:summary':
        result = await tools.getDomainSummary(args.domainId as string);
        break;
      case 'domain:updateStats':
        result = await tools.updateDomainDiscoveryStats(args.domainId as string);
        break;

      // ============================================
      // DISCOVERY CATEGORY COMMANDS - LLM-based classification
      // ============================================
      case 'category:create':
        result = await tools.createCategory(args as unknown as tools.CreateCategoryInput);
        break;
      case 'category:get':
        result = await tools.getCategory(args.categoryId as string);
        break;
      case 'category:getByName':
        result = await tools.getCategoryByName(args.name as string);
        break;
      case 'category:list':
        result = await tools.listCategories();
        break;
      case 'category:update': {
        const { categoryId, ...categoryUpdateData } = args;
        result = await tools.updateCategory(categoryId as string, categoryUpdateData as unknown as tools.UpdateCategoryInput);
        break;
      }
      case 'category:delete':
        result = await tools.deleteCategory(args.categoryId as string);
        break;

      // Category analysis
      case 'category:entities':
        result = await tools.getCategoryWithEntities(args.categoryId as string, { limit: args.limit as number, offset: args.offset as number });
        break;
      case 'category:summary':
        result = await tools.getCategorySummary(args.categoryId as string);
        break;
      case 'category:updateStats':
        result = await tools.updateCategoryStats(args.categoryId as string);
        break;
      case 'category:updateAllStats':
        result = await tools.updateAllCategoryStats();
        break;

      // Classification
      case 'category:prompt':
        result = await tools.buildClassificationPrompt(args.entityName as string, args.description as string | undefined);
        break;
      case 'category:context':
        result = await tools.getClassificationContext(args.entityId as string);
        break;
      case 'category:apply':
        result = await tools.applyClassification(args.entityId as string, args.classification as tools.ClassificationResult);
        break;
      case 'category:explain':
        result = await tools.explainClassification(args.entityId as string);
        break;
      case 'category:unclassified':
        result = await tools.getUnclassifiedEntities(args.projectId as string | undefined, args.limit as number | undefined);
        break;
      case 'category:preview':
        result = await tools.getReclassificationPreview(args as unknown as tools.ReclassifyOptions);
        break;

      // Seeding and migration
      case 'category:seed':
        result = await tools.seedCategories();
        break;
      case 'category:migrate':
        result = await tools.migrateFromLegacyCategories({ projectId: args.projectId as string, dryRun: args.dryRun as boolean });
        break;

      // Category icon commands
      case 'category:suggestIcon':
        result = await tools.suggestCategoryIcon(args.categoryId as string || args.name as string);
        break;
      case 'category:setIcon':
        result = await tools.setCategoryIcon(args.categoryId as string, args.icon as string);
        break;
      case 'category:autoAssignIcons':
        result = await tools.autoAssignCategoryIcons();
        break;

      // Category weight commands
      case 'category:weight':
        result = await tools.calculateCategoryWeight(args.categoryId as string);
        break;
      case 'category:weights':
        result = await tools.calculateAllCategoryWeights(args.projectId as string | undefined);
        break;

      // GitHub metrics commands
      case 'github:fetch':
        result = await tools.fetchEntityGitHubMetrics({
          entityId: args.entityId as string,
          githubUrl: args.githubUrl as string | undefined,
        });
        break;
      case 'github:fetchProject':
        result = await tools.fetchProjectGitHubMetrics({
          projectId: args.projectId as string,
          forceRefresh: args.forceRefresh as boolean | undefined,
          maxAgeDays: args.maxAgeDays as number | undefined,
        });
        break;
      case 'github:rank':
        result = await tools.getEntitiesByGitHubStars({
          projectId: args.projectId as string,
          limit: args.limit as number | undefined,
        });
        break;

      // Buzz score commands
      case 'buzz:calculate':
        result = await tools.calculateBuzzScore({
          entityId: args.entityId as string,
        });
        break;
      case 'buzz:calculateProject':
        result = await tools.calculateProjectBuzzScores({
          projectId: args.projectId as string,
          forceRecalculate: args.forceRecalculate as boolean | undefined,
        });
        break;
      case 'buzz:rank':
        result = await tools.getEntitiesByBuzzScore({
          projectId: args.projectId as string,
          limit: args.limit as number | undefined,
          minBuzz: args.minBuzz as number | undefined,
          categoryId: args.categoryId as string | undefined,
        });
        break;
      case 'buzz:override':
        result = await tools.setBuzzOverride({
          entityId: args.entityId as string,
          buzzOverride: args.buzzOverride as number,
          reason: args.reason as string,
        });
        break;
      case 'buzz:clearOverride':
        result = await tools.clearBuzzOverride({
          entityId: args.entityId as string,
        });
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
        'extract:pricing', 'extract:features', 'extract:company', 'extract:compliance', 'extract:integrations', 'extract:differentiators',
        'extract:validate', 'extract:list', 'extract:latest', 'extract:stale', 'extract:summary',
        // Citation verification (REQUIRED before citing quotes)
        'cite:verify',
        // Adversarial validation - structured storage
        'validation:create', 'validation:get', 'validation:list', 'validation:summary', 'validation:latest', 'validation:history',
        'validation:unvalidated', 'validation:pillars',
        // Verified citations (persisted)
        'citation:create', 'citation:list', 'citation:find',
        // Standard commands
        'project:create', 'project:get', 'project:list', 'project:update', 'project:delete', 'project:find',
        'entity:create', 'entity:get', 'entity:find', 'entity:list', 'entity:search', 'entity:update', 'entity:delete', 'entity:exists',
        'assertion:create', 'assertion:get', 'assertion:list', 'assertion:search', 'assertion:update', 'assertion:validate', 'assertion:reject', 'assertion:delete', 'assertion:addReasoning', 'assertion:findSimilar',
        'assertion:setCriticality', 'assertion:markCited', 'assertion:pendingValidation', 'assertion:rejectedForReresearch', 'assertion:supersede',
        'assertion:calculate-confidence', 'assertion:set-confidence', 'assertion:by-confidence', 'assertion:low-confidence', 'assertion:recalculate-confidence',
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
        // Logo/branding (SVG-focused)
        'logo:search', 'logo:verify', 'logo:download', 'logo:save', 'logo:fetch', 'logo:missing', 'logo:summary', 'logo:validate', 'logo:clear', 'logo:inline',
        // Validation dashboard
        'validation:generate',
        // Evidence validation
        'evidence:conflicts', 'evidence:crossref', 'evidence:freshness', 'evidence:validate-chain', 'evidence:confidence',
        // Orchestrator - Spawn and manage subagents
        'orchestrate:spawn', 'orchestrate:status', 'orchestrate:list', 'orchestrate:active', 'orchestrate:cancel', 'orchestrate:send', 'orchestrate:cleanup',
        'orchestrate:haiku', 'orchestrate:sonnet', 'orchestrate:opus',
        'orchestrate:run', 'orchestrate:run-haiku', 'orchestrate:run-sonnet',
        // Reddit crawler - Community research
        'crawler:reddit', 'crawler:reddit-multi', 'crawler:reddit-comments', 'crawler:reddit-aggregate',
        // Discovery Source Registry - Source management
        'discovery:source:create', 'discovery:source:get', 'discovery:source:update', 'discovery:source:delete', 'discovery:source:list',
        'discovery:source:byType', 'discovery:source:stale', 'discovery:source:stats', 'discovery:source:markCrawled', 'discovery:source:updateMetrics', 'discovery:source:seed',
        // Discovery Crawl Orchestrator
        'discovery:crawl:start', 'discovery:crawl:status', 'discovery:crawl:pause', 'discovery:crawl:resume', 'discovery:crawl:cancel',
        'discovery:crawl:history', 'discovery:crawl:due', 'discovery:crawl:scheduled',
        // Discovery Processor (deduplication)
        'discovery:process:one', 'discovery:process:pending', 'discovery:process:match', 'discovery:process:save',
        'discovery:process:getPending', 'discovery:process:search', 'discovery:process:stats',
        // Criticality Scoring
        'discovery:criticality:calculate', 'discovery:criticality:scoreEntity', 'discovery:criticality:scoreProject',
        'discovery:criticality:byLevel', 'discovery:criticality:needingValidation', 'discovery:criticality:summary',
        // Trend Detection
        'discovery:trends:detect', 'discovery:trends:list', 'discovery:trends:details', 'discovery:trends:entities',
        'discovery:trends:report', 'discovery:trends:export',
        // GitHub Crawler
        'crawler:github-awesome', 'crawler:github-trending', 'crawler:github-diff',
        // Nitter/X Crawler
        'crawler:nitter', 'crawler:nitter-search',
        // Research Domains - Domain-driven research
        'domain:create', 'domain:get', 'domain:list', 'domain:update', 'domain:delete', 'domain:find', 'domain:entities', 'domain:summary', 'domain:updateStats',
        // Discovery Categories - LLM-based classification
        'category:create', 'category:get', 'category:getByName', 'category:list', 'category:update', 'category:delete',
        'category:entities', 'category:summary', 'category:updateStats', 'category:updateAllStats',
        'category:prompt', 'category:context', 'category:apply', 'category:explain', 'category:unclassified', 'category:preview',
        'category:suggestIcon', 'category:setIcon', 'category:autoAssignIcons', 'category:weight', 'category:weights',
        'category:seed', 'category:migrate',
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
