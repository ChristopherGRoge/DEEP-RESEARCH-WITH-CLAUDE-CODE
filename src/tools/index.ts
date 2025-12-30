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

// Re-export Prisma client for direct access if needed
export { prisma } from '../db/client';

// Re-export enums for convenience
export {
  AssertionStatus,
  SourceStatus,
  ResearchWorkflow,
  ExtractionStatus
} from '../../generated/prisma/client';
