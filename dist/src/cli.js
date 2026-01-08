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
            case 'project:update':
                result = await tools.updateProject(args.projectId, args);
                break;
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
            case 'entity:update':
                result = await tools.updateEntity(args.entityId, args);
                break;
            case 'entity:delete':
                result = await tools.deleteEntity(args.entityId);
                break;
            case 'entity:exists':
                result = await tools.entityExists(args.projectId, args.name);
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
            case 'assertion:update':
                result = await tools.updateAssertion(args.assertionId, args);
                break;
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
            case 'source:update':
                result = await tools.updateSource(args.sourceId, args);
                break;
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
                'extract:pricing', 'extract:features', 'extract:company', 'extract:compliance', 'extract:integrations',
                'extract:validate', 'extract:list', 'extract:latest', 'extract:stale', 'extract:summary',
                // Standard commands
                'project:create', 'project:get', 'project:list', 'project:update', 'project:delete', 'project:find',
                'entity:create', 'entity:get', 'entity:find', 'entity:list', 'entity:search', 'entity:update', 'entity:delete', 'entity:exists',
                'assertion:create', 'assertion:get', 'assertion:list', 'assertion:search', 'assertion:update', 'assertion:validate', 'assertion:reject', 'assertion:delete', 'assertion:addReasoning', 'assertion:findSimilar',
                'assertion:setCriticality', 'assertion:markCited', 'assertion:pendingValidation', 'assertion:rejectedForReresearch', 'assertion:supersede',
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