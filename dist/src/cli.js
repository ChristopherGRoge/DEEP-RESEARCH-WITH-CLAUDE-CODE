#!/usr/bin/env npx ts-node
"use strict";
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
require("dotenv/config");
const tools = __importStar(require("./tools"));
async function executeCommand(command, args) {
    try {
        let result;
        switch (command) {
            // Project commands
            case 'project:create':
                result = await tools.createProject(args);
                break;
            case 'project:get':
                result = await tools.getProject(args.projectId);
                break;
            case 'project:list':
                result = await tools.listProjects();
                break;
            case 'project:update': {
                const { projectId, ...updateData } = args;
                result = await tools.updateProject(projectId, updateData);
                break;
            }
            case 'project:delete':
                result = await tools.deleteProject(args.projectId);
                break;
            case 'project:find':
                result = await tools.findProjectByName(args.name);
                break;
            // Entity commands
            case 'entity:create':
                result = await tools.createEntity(args);
                break;
            case 'entity:get':
                result = await tools.getEntity(args.entityId);
                break;
            case 'entity:find':
                result = await tools.findEntityByName(args.projectId, args.name);
                break;
            case 'entity:list':
                result = await tools.listEntities(args.projectId);
                break;
            case 'entity:search':
                result = await tools.searchEntities(args);
                break;
            case 'entity:update': {
                const { entityId, ...updateData } = args;
                result = await tools.updateEntity(entityId, updateData);
                break;
            }
            case 'entity:delete':
                result = await tools.deleteEntity(args.entityId);
                break;
            case 'entity:exists':
                result = await tools.entityExists(args.projectId, args.name);
                break;
            case 'entity:categorize':
                result = await tools.categorizeEntities(args);
                break;
            // Assertion commands
            case 'assertion:create':
                result = await tools.createAssertion(args);
                break;
            case 'assertion:get':
                result = await tools.getAssertion(args.assertionId);
                break;
            case 'assertion:list':
                result = await tools.listAssertions(args.entityId);
                break;
            case 'assertion:search':
                result = await tools.searchAssertions(args);
                break;
            case 'assertion:update': {
                const { assertionId, ...updateData } = args;
                result = await tools.updateAssertion(assertionId, updateData);
                break;
            }
            case 'assertion:validate':
                result = await tools.validateAssertion(args.assertionId, args.validatedBy);
                break;
            case 'assertion:reject':
                result = await tools.rejectAssertion(args.assertionId, args.validatedBy, args.rejectionReason);
                break;
            case 'assertion:setCriticality':
                result = await tools.setCriticality(args.assertionId, args.criticality);
                break;
            case 'assertion:markCited':
                result = await tools.markCitedInConclusion(args.assertionId, args.conclusionContext);
                break;
            case 'assertion:pendingValidation':
                result = await tools.getAssertionsPendingValidation(args.projectId);
                break;
            case 'assertion:rejectedForReresearch':
                result = await tools.getRejectedForReresearch(args.projectId);
                break;
            case 'assertion:supersede':
                result = await tools.supersededAssertion(args.rejectedId, args.newAssertionId);
                break;
            case 'assertion:respond':
                result = await tools.addHumanResponse(args.assertionId, args.response, args.validatedBy, {
                    partiallyValidated: args.partiallyValidated,
                    validatedClaims: args.validatedClaims,
                    challengedClaims: args.challengedClaims,
                });
                break;
            case 'assertion:agentRespond':
                result = await tools.addAgentResponse(args.assertionId, args.response, args.agentId);
                break;
            case 'assertion:dialogues':
                result = await tools.getActiveDialogues(args.projectId);
                break;
            case 'assertion:delete':
                result = await tools.deleteAssertion(args.assertionId);
                break;
            case 'assertion:addReasoning':
                result = await tools.addReasoning(args.assertionId, args.content, args.agentId);
                break;
            case 'assertion:findSimilar':
                result = await tools.findSimilarAssertions(args.entityId, args.claim);
                break;
            case 'assertion:calculate-confidence':
                result = await tools.calculateConfidence(args.assertionId);
                break;
            case 'assertion:set-confidence':
                result = await tools.updateConfidence(args.assertionId, args.score, args.factors);
                break;
            case 'assertion:by-confidence':
                result = await tools.getAssertionsByConfidence(args.entityId, args.minConfidence, args.maxConfidence);
                break;
            case 'assertion:low-confidence':
                result = await tools.getLowConfidenceAssertions(args.projectId, args.threshold);
                break;
            case 'assertion:recalculate-confidence':
                result = await tools.recalculateProjectConfidence(args.projectId);
                break;
            // Source commands
            case 'source:create':
                result = await tools.createSource(args);
                break;
            case 'source:get':
                result = await tools.getSource(args.sourceId);
                break;
            case 'source:find':
                result = await tools.findSourceByUrl(args.url);
                break;
            case 'source:list':
                result = await tools.listSources(args.status);
                break;
            case 'source:search':
                result = await tools.searchSources(args.query);
                break;
            case 'source:link':
                result = await tools.linkSourceToAssertion(args);
                break;
            case 'source:update': {
                const { sourceId, ...updateData } = args;
                result = await tools.updateSource(sourceId, updateData);
                break;
            }
            case 'source:validate':
                result = await tools.validateSource(args.sourceId, args.validatedBy);
                break;
            case 'source:reject':
                result = await tools.rejectSource(args.sourceId, args.validatedBy);
                break;
            case 'source:delete':
                result = await tools.deleteSource(args.sourceId);
                break;
            case 'source:byType':
                result = await tools.getSourcesByType(args.sourceType);
                break;
            // Search commands
            case 'search:global':
                result = await tools.globalSearch(args);
                break;
            case 'search:summary':
                result = await tools.getResearchSummary(args.projectId);
                break;
            case 'search:pending':
                result = await tools.getPendingValidation(args.projectId);
                break;
            case 'search:activity':
                result = await tools.getRecentActivity(args.limit);
                break;
            case 'search:noAssertions':
                result = await tools.getEntitiesWithoutAssertions(args.projectId);
                break;
            case 'search:noSources':
                result = await tools.getAssertionsWithoutSources(args.projectId);
                break;
            // ============================================
            // RESEARCH GAPS - What needs to be researched?
            // ============================================
            case 'research:gaps':
                result = await tools.getResearchGaps(args.projectId);
                break;
            // ============================================
            // CROSS-ENTITY QUERIES - Analyze across entities
            // ============================================
            case 'query:search':
                result = await tools.queryExtractions(args);
                break;
            case 'query:values':
                result = await tools.getFieldValues(args);
                break;
            case 'query:pricing':
                result = await tools.queryPricing(args);
                break;
            case 'query:compliance':
                result = await tools.queryCompliance(args);
                break;
            case 'query:features':
                result = await tools.queryFeatures(args);
                break;
            case 'query:integrations':
                result = await tools.queryIntegrations(args);
                break;
            case 'query:companies':
                result = await tools.queryCompanies(args);
                break;
            case 'query:compare':
                result = await tools.compareEntities(args);
                break;
            // ============================================
            // EXTRACTION DIFF - Track changes over time
            // ============================================
            case 'diff:latest':
                result = await tools.getLatestDiff(args);
                break;
            case 'diff:compare':
                result = await tools.diffExtractions(args);
                break;
            case 'diff:history':
                result = await tools.getExtractionHistory(args);
                break;
            case 'diff:changes':
                result = await tools.findRecentChanges(args);
                break;
            // ============================================
            // RESEARCH AGENDA - Batch processing queue
            // ============================================
            case 'agenda:create':
                result = await tools.createAgenda(args);
                break;
            case 'agenda:list':
                result = tools.listAgendas();
                break;
            case 'agenda:get':
                result = tools.getAgenda(args.agendaId);
                break;
            case 'agenda:status':
                result = tools.getAgendaStatus(args.agendaId);
                break;
            case 'agenda:next':
                result = tools.getNextItem(args.agendaId);
                break;
            case 'agenda:complete':
                result = tools.completeItem(args.agendaId, args.notes);
                break;
            case 'agenda:skip':
                result = tools.skipItem(args.agendaId, args.reason);
                break;
            case 'agenda:fail':
                result = tools.failItem(args.agendaId, args.error);
                break;
            case 'agenda:reset':
                result = tools.resetAgenda(args.agendaId, args);
                break;
            case 'agenda:delete':
                result = tools.deleteAgenda(args.agendaId);
                break;
            case 'agenda:suggest':
                result = await tools.suggestAgendas(args.projectId);
                break;
            // ============================================
            // LOGO COMMANDS - Entity branding/visual identity
            // ============================================
            case 'logo:search':
                result = await tools.searchForLogo(args.entityId);
                break;
            case 'logo:verify':
                result = await tools.verifyLogoUrl(args.url);
                break;
            case 'logo:download':
                result = await tools.downloadLogo(args.url, args.entityName);
                break;
            case 'logo:save':
                result = await tools.saveLogo(args);
                break;
            case 'logo:fetch':
                result = await tools.fetchLogo(args.entityId);
                break;
            case 'logo:missing':
                result = await tools.getEntitiesWithoutLogos(args.projectId);
                break;
            case 'logo:summary':
                result = await tools.getLogoSummary(args.projectId);
                break;
            case 'logo:validate':
                result = await tools.verifyEntityLogo(args.entityId, args.verifiedBy);
                break;
            case 'logo:clear':
                result = await tools.clearLogo(args.entityId);
                break;
            case 'logo:inline':
                result = await tools.getLogoInline(args.entityId);
                break;
            // ============================================
            // RSS CRAWLER - Automated entity discovery from feeds
            // ============================================
            case 'rss:crawl':
                result = await tools.crawlRSSFeed(args);
                break;
            case 'rss:save':
                result = await tools.saveDiscoveries(args.discoveries);
                break;
            case 'rss:stats':
                result = await tools.getCrawlStats(args.projectId);
                break;
            // ============================================
            // VALIDATION DASHBOARD - Human-in-the-loop review
            // ============================================
            case 'validation:generate':
                result = await tools.generateValidationDashboard({
                    projectId: args.projectId,
                    outputPath: args.outputPath,
                    validatorName: args.validatorName,
                });
                break;
            // ============================================
            // EXTRACTION COMMANDS - Primary deep research tool
            // ============================================
            // RECOMMENDED: Fetch + Claude reasoning workflow (no API key needed)
            case 'extract:fetch':
                result = await tools.fetchForExtraction(args);
                break;
            case 'extract:cache':
                result = await tools.readCachedContent(args.cacheId);
                break;
            case 'extract:save':
                result = await tools.saveExtraction(args);
                break;
            // Automated extraction (requires ANTHROPIC_API_KEY)
            case 'extract:pricing':
                result = await tools.extractPricing(args.url, args.entityId, { screenshot: args.screenshot, createAssertions: args.createAssertions });
                break;
            case 'extract:features':
                result = await tools.extractFeatures(args.url, args.entityId, { screenshot: args.screenshot, createAssertions: args.createAssertions });
                break;
            case 'extract:company':
                result = await tools.extractCompany(args.url, args.entityId, { screenshot: args.screenshot, createAssertions: args.createAssertions });
                break;
            case 'extract:compliance':
                result = await tools.extractCompliance(args.url, args.entityId, { screenshot: args.screenshot, createAssertions: args.createAssertions });
                break;
            case 'extract:integrations':
                result = await tools.extractIntegrations(args.url, args.entityId, { screenshot: args.screenshot, createAssertions: args.createAssertions });
                break;
            case 'extract:differentiators':
                result = await tools.extractDifferentiators(args.url, args.entityId, { screenshot: args.screenshot, createAssertions: args.createAssertions });
                break;
            case 'extract:validate':
                result = await tools.validateUrl(args.url);
                break;
            case 'extract:list':
                result = await tools.getExtractions(args.entityId, args.schemaType);
                break;
            case 'extract:latest':
                result = await tools.getLatestExtraction(args.entityId, args.schemaType);
                break;
            case 'extract:stale':
                result = await tools.getStaleExtractions(args.projectId);
                break;
            case 'extract:summary':
                result = await tools.getExtractionSummary(args.projectId);
                break;
            // ============================================
            // CITATION VERIFICATION - Mandatory before citing quotes
            // ============================================
            case 'cite:verify':
                result = await tools.verifyCitation(args);
                break;
            // ============================================
            // ADVERSARIAL VALIDATION - Structured validation storage
            // ============================================
            case 'validation:create':
                result = await tools.createValidation(args);
                break;
            case 'validation:get':
                result = await tools.getValidation(args);
                break;
            case 'validation:list':
                result = await tools.listValidations(args);
                break;
            case 'validation:summary':
                result = await tools.getValidationSummary(args);
                break;
            case 'validation:latest':
                result = await tools.getLatestValidation({ assertionId: args.assertionId });
                break;
            case 'validation:history':
                result = await tools.getValidationHistory({ assertionId: args.assertionId });
                break;
            case 'validation:unvalidated':
                result = await tools.getUnvalidatedAssertions({
                    entityId: args.entityId,
                    criticality: args.criticality,
                });
                break;
            case 'validation:pillars':
                result = await tools.getPillarAssertions({ entityId: args.entityId });
                break;
            // ============================================
            // RULINGS - Close the validation loop
            // ============================================
            case 'ruling:create':
                result = await tools.createRuling(args);
                break;
            case 'ruling:get':
                result = await tools.getRuling(args);
                break;
            case 'ruling:list':
                result = await tools.listRulings(args);
                break;
            // Verified citations (from cite:verify, persisted)
            case 'citation:create':
                result = await tools.createCitation(args);
                break;
            case 'citation:list':
                result = await tools.listCitations(args);
                break;
            case 'citation:find':
                result = await tools.findCitation({ url: args.url, quote: args.quote });
                break;
            // ============================================
            // CRAWLERS - Web discovery tools
            // ============================================
            case 'crawl:hn':
                result = await tools.crawlHackerNews(args);
                break;
            case 'crawl:hn-persist':
                result = await tools.crawlAndPersist(args);
                break;
            case 'crawl:show-hn':
                result = await tools.crawlShowHN(args.projectId, args.limit);
                break;
            case 'crawl:top-ai':
                result = await tools.crawlTopAIStories(args.projectId, args.limit);
                break;
            // ============================================
            // EVIDENCE VALIDATION - Evidence quality and integrity
            // ============================================
            case 'evidence:conflicts':
                result = await tools.findConflictingEvidence(args);
                break;
            case 'evidence:crossref':
                result = await tools.crossReferenceEvidence(args);
                break;
            case 'evidence:freshness':
                result = await tools.checkEvidenceFreshness(args);
                break;
            case 'evidence:validate-chain':
                result = await tools.validateEvidenceChain(args);
                break;
            case 'evidence:confidence':
                result = await tools.calculateEvidenceConfidence(args);
                break;
            // ============================================
            // ORCHESTRATOR COMMANDS - Spawn and manage subagents
            // ============================================
            case 'orchestrate:spawn':
                result = await tools.spawnSubagent(args);
                break;
            case 'orchestrate:status':
                result = tools.getSubagentStatus(args.taskId);
                break;
            case 'orchestrate:list':
                result = tools.listAllSubagents(args);
                break;
            case 'orchestrate:active':
                result = tools.listActiveSubagents();
                break;
            case 'orchestrate:cancel':
                result = tools.cancelSubagent(args.taskId);
                break;
            case 'orchestrate:send':
                tools.sendInputToSubagent(args.taskId, args.message);
                result = { success: true, message: 'Input sent to subagent' };
                break;
            case 'orchestrate:cleanup':
                result = tools.cleanupOldTasks(args.olderThanHours);
                break;
            // Convenience spawners
            case 'orchestrate:haiku':
                result = await tools.spawnHaikuAgent(args.taskType, args.prompt, args);
                break;
            case 'orchestrate:sonnet':
                result = await tools.spawnSonnetAgent(args.taskType, args.prompt, args);
                break;
            case 'orchestrate:opus':
                result = await tools.spawnOpusAgent(args.taskType, args.prompt, args);
                break;
            // Synchronous spawners (wait for completion)
            case 'orchestrate:run':
                result = await tools.spawnSubagentSync({
                    taskType: args.taskType || 'custom',
                    prompt: args.prompt,
                    model: args.model,
                    entityId: args.entityId,
                    timeout: args.timeout,
                });
                break;
            case 'orchestrate:run-haiku':
                result = await tools.spawnSubagentSync({
                    taskType: args.taskType || 'custom',
                    prompt: args.prompt,
                    model: 'haiku',
                    entityId: args.entityId,
                    timeout: args.timeout,
                });
                break;
            case 'orchestrate:run-sonnet':
                result = await tools.spawnSubagentSync({
                    taskType: args.taskType || 'custom',
                    prompt: args.prompt,
                    model: 'sonnet',
                    entityId: args.entityId,
                    timeout: args.timeout,
                });
                break;
            // ============================================
            // REDDIT CRAWLER - Community research
            // ============================================
            case 'crawler:reddit':
                result = await tools.crawlSubreddit(args, args.crawlSessionId || 'manual');
                break;
            case 'crawler:reddit-multi':
                result = await tools.crawlMultipleSubreddits(args.configs, args.crawlSessionId || 'manual');
                break;
            case 'crawler:reddit-comments':
                result = await tools.fetchPostComments(args.permalink, args.limit);
                break;
            case 'crawler:reddit-aggregate':
                result = tools.aggregateRedditDiscoveries(args.results);
                break;
            // ============================================
            // DISCOVERY SOURCE REGISTRY - Source management
            // ============================================
            case 'discovery:source:create':
                result = await tools.createDiscoverySource(args);
                break;
            case 'discovery:source:get':
                result = await tools.getDiscoverySource(args.sourceId);
                break;
            case 'discovery:source:update':
                result = await tools.updateDiscoverySource(args.sourceId, args);
                break;
            case 'discovery:source:delete':
                result = await tools.deleteDiscoverySource(args.sourceId);
                break;
            case 'discovery:source:list':
                result = await tools.listDiscoverySources(args);
                break;
            case 'discovery:source:byType':
                result = await tools.getDiscoverySourcesByType(args.sourceType);
                break;
            case 'discovery:source:stale':
                result = await tools.getStaleSources(args.maxAgeHours);
                break;
            case 'discovery:source:stats':
                result = await tools.getSourceStats();
                break;
            case 'discovery:source:markCrawled':
                result = await tools.markSourceCrawled(args.sourceId, args.success, args.error);
                break;
            case 'discovery:source:updateMetrics':
                result = await tools.updateSourceMetrics(args.sourceId, args);
                break;
            case 'discovery:source:seed':
                result = await tools.seedDefaultSources();
                break;
            // ============================================
            // DISCOVERY CRAWL ORCHESTRATOR - Coordinate crawls
            // ============================================
            case 'discovery:crawl:start':
                result = await tools.startDiscoveryCrawl(args);
                break;
            case 'discovery:crawl:status':
                result = await tools.getCrawlStatus(args.crawlId);
                break;
            case 'discovery:crawl:pause':
                result = await tools.pauseCrawl(args.crawlId);
                break;
            case 'discovery:crawl:resume':
                result = await tools.resumeCrawl(args.crawlId);
                break;
            case 'discovery:crawl:cancel':
                result = await tools.cancelCrawl(args.crawlId);
                break;
            case 'discovery:crawl:history':
                result = await tools.getCrawlHistory(args.projectId, args.limit);
                break;
            case 'discovery:crawl:due':
                result = await tools.getSourcesDueForCrawl();
                break;
            case 'discovery:crawl:scheduled':
                result = await tools.runScheduledCrawl(args.projectId);
                break;
            // ============================================
            // DISCOVERY PROCESSOR - Deduplication and entity resolution
            // ============================================
            case 'discovery:process:one':
                result = await tools.processRawDiscovery(args.projectId, args.rawDiscoveryId);
                break;
            case 'discovery:process:pending':
                result = await tools.processPendingDiscoveries(args.projectId, args.limit);
                break;
            case 'discovery:process:match':
                result = await tools.findMatchingEntity(args.projectId, args.name, args.urls || [], args.description);
                break;
            case 'discovery:process:save':
                result = await tools.saveRawDiscovery(args);
                break;
            case 'discovery:process:getPending':
                result = await tools.getPendingDiscoveries(args.projectId, args.limit);
                break;
            case 'discovery:process:search':
                result = await tools.searchDiscoveries(args.query, args);
                break;
            case 'discovery:process:stats':
                result = await tools.getDiscoveryStats(args.projectId);
                break;
            // ============================================
            // CRITICALITY SCORING - Prioritize assertions
            // ============================================
            case 'discovery:criticality:calculate':
                result = await tools.calculateCriticality(args.assertionId, args.weights);
                break;
            case 'discovery:criticality:scoreEntity':
                result = await tools.scoreEntityAssertions(args.entityId, args.weights);
                break;
            case 'discovery:criticality:scoreProject':
                result = await tools.scoreProjectAssertions(args.projectId, args.weights);
                break;
            case 'discovery:criticality:byLevel':
                result = await tools.getAssertionsByCriticality(args.projectId, args.level, args.limit);
                break;
            case 'discovery:criticality:needingValidation':
                result = await tools.getCriticalAssertionsNeedingValidation(args.projectId);
                break;
            case 'discovery:criticality:summary':
                result = await tools.getCriticalitySummary(args.projectId);
                break;
            // ============================================
            // TREND DETECTION - Pattern analysis
            // ============================================
            case 'discovery:trends:detect':
                result = await tools.detectTrends(args.projectId, args);
                break;
            case 'discovery:trends:list':
                result = await tools.listTrends(args.projectId, args);
                break;
            case 'discovery:trends:details':
                result = await tools.getTrendDetails(args.trendId);
                break;
            case 'discovery:trends:entities':
                result = await tools.getTrendingEntities(args.projectId, args.limit);
                break;
            case 'discovery:trends:report':
                result = await tools.generateTrendReport(args.projectId);
                break;
            case 'discovery:trends:export':
                result = await tools.exportTrendsMarkdown(args.projectId);
                break;
            // ============================================
            // GITHUB CRAWLER - Awesome lists and trending
            // ============================================
            case 'crawler:github-awesome':
                result = await tools.crawlAwesomeList(args, args.crawlSessionId || 'manual');
                break;
            case 'crawler:github-trending':
                result = await tools.crawlGitHubTrending(args, args.crawlSessionId || 'manual');
                break;
            case 'crawler:github-diff':
                result = await tools.diffAwesomeList(args.oldEntries, args.newEntries);
                break;
            // ============================================
            // NITTER/X CRAWLER - Twitter/X via Nitter
            // ============================================
            case 'crawler:nitter':
                result = await tools.crawlAccount(args);
                break;
            case 'crawler:nitter-search':
                result = await tools.crawlSearch(args);
                break;
            // ============================================
            // RESEARCH DOMAIN COMMANDS - Domain-driven research
            // ============================================
            case 'domain:create':
                result = await tools.createDomain(args);
                break;
            case 'domain:get':
                result = await tools.getDomain((args.domainId || args.name || args.identifier));
                break;
            case 'domain:list':
                result = await tools.listDomains();
                break;
            case 'domain:update': {
                const { domainId, ...domainUpdateData } = args;
                result = await tools.updateDomain(domainId, domainUpdateData);
                break;
            }
            case 'domain:delete':
                result = await tools.deleteDomain(args.domainId);
                break;
            case 'domain:find':
                result = await tools.findDomainByName(args.name);
                break;
            case 'domain:entities':
                result = await tools.getDomainEntities(args.domainId, { limit: args.limit, offset: args.offset });
                break;
            case 'domain:summary':
                result = await tools.getDomainSummary(args.domainId);
                break;
            case 'domain:updateStats':
                result = await tools.updateDomainDiscoveryStats(args.domainId);
                break;
            // ============================================
            // DISCOVERY CATEGORY COMMANDS - LLM-based classification
            // ============================================
            case 'category:create':
                result = await tools.createCategory(args);
                break;
            case 'category:get':
                result = await tools.getCategory(args.categoryId);
                break;
            case 'category:getByName':
                result = await tools.getCategoryByName(args.name);
                break;
            case 'category:list':
                result = await tools.listCategories();
                break;
            case 'category:update': {
                const { categoryId, ...categoryUpdateData } = args;
                result = await tools.updateCategory(categoryId, categoryUpdateData);
                break;
            }
            case 'category:delete':
                result = await tools.deleteCategory(args.categoryId);
                break;
            // Category analysis
            case 'category:entities':
                result = await tools.getCategoryWithEntities(args.categoryId, { limit: args.limit, offset: args.offset });
                break;
            case 'category:summary':
                result = await tools.getCategorySummary(args.categoryId);
                break;
            case 'category:updateStats':
                result = await tools.updateCategoryStats(args.categoryId);
                break;
            case 'category:updateAllStats':
                result = await tools.updateAllCategoryStats();
                break;
            // Classification
            case 'category:prompt':
                result = await tools.buildClassificationPrompt(args.entityName, args.description);
                break;
            case 'category:context':
                result = await tools.getClassificationContext(args.entityId);
                break;
            case 'category:apply':
                result = await tools.applyClassification(args.entityId, args.classification);
                break;
            case 'category:explain':
                result = await tools.explainClassification(args.entityId);
                break;
            case 'category:unclassified':
                result = await tools.getUnclassifiedEntities(args.projectId, args.limit);
                break;
            case 'category:preview':
                result = await tools.getReclassificationPreview(args);
                break;
            // Seeding and migration
            case 'category:seed':
                result = await tools.seedCategories();
                break;
            case 'category:migrate':
                result = await tools.migrateFromLegacyCategories({ projectId: args.projectId, dryRun: args.dryRun });
                break;
            // Category icon commands
            case 'category:suggestIcon':
                result = await tools.suggestCategoryIcon(args.categoryId || args.name);
                break;
            case 'category:setIcon':
                result = await tools.setCategoryIcon(args.categoryId, args.icon);
                break;
            case 'category:autoAssignIcons':
                result = await tools.autoAssignCategoryIcons();
                break;
            // Category weight commands
            case 'category:weight':
                result = await tools.calculateCategoryWeight(args.categoryId);
                break;
            case 'category:weights':
                result = await tools.calculateAllCategoryWeights(args.projectId);
                break;
            // GitHub metrics commands
            case 'github:fetch':
                result = await tools.fetchEntityGitHubMetrics({
                    entityId: args.entityId,
                    githubUrl: args.githubUrl,
                });
                break;
            case 'github:fetchProject':
                result = await tools.fetchProjectGitHubMetrics({
                    projectId: args.projectId,
                    forceRefresh: args.forceRefresh,
                    maxAgeDays: args.maxAgeDays,
                });
                break;
            case 'github:rank':
                result = await tools.getEntitiesByGitHubStars({
                    projectId: args.projectId,
                    limit: args.limit,
                });
                break;
            // Buzz score commands
            case 'buzz:calculate':
                result = await tools.calculateBuzzScore({
                    entityId: args.entityId,
                });
                break;
            case 'buzz:calculateProject':
                result = await tools.calculateProjectBuzzScores({
                    projectId: args.projectId,
                    forceRecalculate: args.forceRecalculate,
                });
                break;
            case 'buzz:rank':
                result = await tools.getEntitiesByBuzzScore({
                    projectId: args.projectId,
                    limit: args.limit,
                    minBuzz: args.minBuzz,
                    categoryId: args.categoryId,
                });
                break;
            case 'buzz:override':
                result = await tools.setBuzzOverride({
                    entityId: args.entityId,
                    buzzOverride: args.buzzOverride,
                    reason: args.reason,
                });
                break;
            case 'buzz:clearOverride':
                result = await tools.clearBuzzOverride({
                    entityId: args.entityId,
                });
                break;
            // ============================================
            // World Model commands
            // ============================================
            case 'worldmodel:get':
                result = await tools.getWorldModel({ entityId: args.entityId });
                break;
            case 'worldmodel:summary':
                result = await tools.getWorldModelSummary({ entityId: args.entityId });
                break;
            // Relationship commands
            case 'relationship:create':
                result = await tools.createRelationship(args);
                break;
            case 'relationship:list':
                result = await tools.listRelationships({ entityId: args.entityId });
                break;
            case 'relationship:graph':
                result = await tools.getRelationshipGraph({ projectId: args.projectId });
                break;
            case 'relationship:delete':
                result = await tools.deleteRelationship({ relationshipId: args.relationshipId });
                break;
            // Positioning commands
            case 'positioning:set':
                result = await tools.setPositioning(args);
                break;
            case 'positioning:get':
                result = await tools.getPositioning({ entityId: args.entityId });
                break;
            case 'positioning:compare':
                result = await tools.comparePositioning({ entityIds: args.entityIds });
                break;
            // Force commands
            case 'force:create':
                result = await tools.createForce(args);
                break;
            case 'force:list':
                result = await tools.listForces({ entityId: args.entityId });
                break;
            case 'force:delete':
                result = await tools.deleteForce({ forceId: args.forceId });
                break;
            // ============================================
            // Category Concept commands
            // ============================================
            case 'concept:create':
                result = await tools.createConcept(args);
                break;
            case 'concept:get':
                result = await tools.getConcept(args.conceptId);
                break;
            case 'concept:list':
                result = await tools.listConcepts(args);
                break;
            case 'concept:update': {
                const { conceptId: cid, ...conceptUpdateData } = args;
                result = await tools.updateConcept(cid, conceptUpdateData);
                break;
            }
            case 'concept:delete':
                result = await tools.deleteConcept(args.conceptId);
                break;
            case 'concept:link':
                result = await tools.linkConcept(args);
                break;
            case 'concept:unlink':
                result = await tools.unlinkConcept(args.conceptId, args.entityId);
                break;
            case 'concept:byEntity':
                result = await tools.getEntityConcepts(args.entityId);
                break;
            case 'concept:entities':
                result = await tools.getConceptEntities(args.conceptId);
                break;
            case 'concept:map':
                result = await tools.getCategoryConceptMap(args.categoryId);
                break;
            default:
                return { success: false, error: `Unknown command: ${command}` };
        }
        return { success: true, data: result };
    }
    catch (error) {
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
                // Rulings - close validation loop
                'ruling:create', 'ruling:get', 'ruling:list',
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
                // World Model - Entity ecosystem positioning
                'worldmodel:get', 'worldmodel:summary',
                'relationship:create', 'relationship:list', 'relationship:graph', 'relationship:delete',
                'positioning:set', 'positioning:get', 'positioning:compare',
                'force:create', 'force:list', 'force:delete',
                // Category Concepts - Building blocks within categories
                'concept:create', 'concept:get', 'concept:list', 'concept:update', 'concept:delete',
                'concept:link', 'concept:unlink', 'concept:byEntity', 'concept:entities', 'concept:map',
            ],
        }));
        process.exit(1);
    }
    const command = args[0];
    let commandArgs = {};
    // Parse JSON args if provided
    if (args[1]) {
        try {
            commandArgs = JSON.parse(args[1]);
        }
        catch {
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
//# sourceMappingURL=cli.js.map