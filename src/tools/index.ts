// Deep Research Tools - Main Export
// These tools are designed for use by Claude Code subagents

export * from './projects';
export * from './entities';
export * from './assertions';
export * from './sources';
export * from './search';
export * from './extractor';
export * from './queries';
export * from './diff';
export * from './agenda';
export * from './logos';
export * from './validation-dashboard';
export * from './orchestrator';
export * from './evidence-validator';
export * from './criticality-scorer';
export * from './crawlers';
export * from './discovery-sources';
export * from './discovery-processor';
export * from './trend-detector';
export * from './crawl-orchestrator';
export * from './domains';

// Re-export Prisma client for direct access if needed
export { prisma } from '../db/client';

// Re-export enums for convenience
export {
  AssertionStatus,
  AssertionCriticality,
  SourceStatus,
  ResearchWorkflow,
  ExtractionStatus
} from '../../generated/prisma/client';
