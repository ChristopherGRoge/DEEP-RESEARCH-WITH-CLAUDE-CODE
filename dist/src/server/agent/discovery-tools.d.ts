/**
 * MCP tools for discovery workflow
 *
 * These tools enable AI agents to discover entities matching research criteria
 * and persist them to the database for deep research.
 */
import { DiscoverySessionManager } from './discovery-session';
/**
 * Create an MCP server with all discovery tools
 */
export declare function createDiscoveryMcpServer(sessionId: string, sessionManager: DiscoverySessionManager): import("@anthropic-ai/claude-agent-sdk").McpSdkServerConfigWithInstance;
//# sourceMappingURL=discovery-tools.d.ts.map