"use strict";
/**
 * MCP tools for validation workflow
 * These tools are exposed to Claude via the Agent SDK
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
exports.validationTools = void 0;
exports.createValidationMcpServer = createValidationMcpServer;
const zod_1 = require("zod");
const claude_agent_sdk_1 = require("@anthropic-ai/claude-agent-sdk");
const dbTools = __importStar(require("../../tools"));
const client_1 = require("../../../generated/prisma/client");
// Tool definitions using Zod schemas
const getNextAssertionTool = (0, claude_agent_sdk_1.tool)('get_next_assertion', 'Get the next assertion pending validation, ordered by criticality', {
    projectId: zod_1.z.string().optional().describe('Filter by project ID'),
    criticality: zod_1.z.enum(['CRITICAL', 'HIGH', 'MEDIUM', 'LOW']).optional().describe('Filter by criticality level'),
}, async (args) => {
    const where = {
        status: client_1.AssertionStatus.CLAIM,
    };
    if (args.projectId) {
        where.entity = { projectId: args.projectId };
    }
    if (args.criticality) {
        where.criticality = args.criticality;
    }
    const assertion = await dbTools.prisma.assertion.findFirst({
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
    });
    // Get count of remaining assertions
    const remaining = await dbTools.prisma.assertion.count({
        where,
    });
    if (!assertion) {
        return {
            content: [{
                    type: 'text',
                    text: JSON.stringify({
                        found: false,
                        message: 'No more assertions pending validation',
                        remaining: 0,
                    }),
                }],
        };
    }
    return {
        content: [{
                type: 'text',
                text: JSON.stringify({
                    found: true,
                    remaining: remaining - 1,
                    assertion: {
                        id: assertion.id,
                        claim: assertion.claim,
                        category: assertion.category,
                        criticality: assertion.criticality,
                        citedInConclusion: assertion.citedInConclusion,
                        entity: {
                            id: assertion.entity.id,
                            name: assertion.entity.name,
                            url: assertion.entity.url,
                            project: assertion.entity.project,
                        },
                        sources: assertion.sources.map((as) => ({
                            url: as.source.url,
                            title: as.source.title,
                            quote: as.quote,
                            sourceType: as.source.sourceType,
                        })),
                        reasoning: assertion.reasoning.map((r) => r.content),
                    },
                }),
            }],
    };
});
const getAssertionByIdTool = (0, claude_agent_sdk_1.tool)('get_assertion_by_id', 'Get a specific assertion by its ID for validation', {
    assertionId: zod_1.z.string().describe('The assertion ID to fetch'),
}, async (args) => {
    const assertion = await dbTools.prisma.assertion.findUnique({
        where: { id: args.assertionId },
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
    });
    if (!assertion) {
        return {
            content: [{
                    type: 'text',
                    text: JSON.stringify({
                        found: false,
                        message: 'Assertion not found',
                    }),
                }],
        };
    }
    // Get count of remaining assertions
    const remaining = await dbTools.prisma.assertion.count({
        where: { status: client_1.AssertionStatus.CLAIM },
    });
    return {
        content: [{
                type: 'text',
                text: JSON.stringify({
                    found: true,
                    remaining: remaining,
                    assertion: {
                        id: assertion.id,
                        claim: assertion.claim,
                        category: assertion.category,
                        criticality: assertion.criticality,
                        status: assertion.status,
                        citedInConclusion: assertion.citedInConclusion,
                        entity: {
                            id: assertion.entity.id,
                            name: assertion.entity.name,
                            url: assertion.entity.url,
                            project: assertion.entity.project,
                        },
                        sources: assertion.sources.map((as) => ({
                            url: as.source.url,
                            title: as.source.title,
                            quote: as.quote,
                            sourceType: as.source.sourceType,
                        })),
                        reasoning: assertion.reasoning.map((r) => r.content),
                    },
                }),
            }],
    };
});
const validateAssertionTool = (0, claude_agent_sdk_1.tool)('validate_assertion', 'Mark an assertion as validated (promotes CLAIM to EVIDENCE)', {
    assertionId: zod_1.z.string().describe('The assertion ID to validate'),
    validatedBy: zod_1.z.string().describe('Name of the human validator'),
    humanResponse: zod_1.z.string().optional().describe('Optional notes from the researcher'),
}, async (args) => {
    const updated = await dbTools.prisma.assertion.update({
        where: { id: args.assertionId },
        data: {
            status: client_1.AssertionStatus.EVIDENCE,
            validatedAt: new Date(),
            validatedBy: args.validatedBy,
            humanResponse: args.humanResponse,
        },
    });
    // Log the action
    await dbTools.prisma.researchLog.create({
        data: {
            action: 'assertion_validated',
            details: {
                assertionId: args.assertionId,
                validatedBy: args.validatedBy,
                humanResponse: args.humanResponse,
            },
            agentId: 'validation-agent',
        },
    });
    return {
        content: [{
                type: 'text',
                text: JSON.stringify({
                    success: true,
                    message: `Assertion validated successfully`,
                    assertionId: updated.id,
                    newStatus: 'EVIDENCE',
                }),
            }],
    };
});
const rejectAssertionTool = (0, claude_agent_sdk_1.tool)('reject_assertion', 'Reject an assertion with a reason', {
    assertionId: zod_1.z.string().describe('The assertion ID to reject'),
    validatedBy: zod_1.z.string().describe('Name of the human validator'),
    rejectionReason: zod_1.z.string().describe('Reason for rejection'),
}, async (args) => {
    const updated = await dbTools.prisma.assertion.update({
        where: { id: args.assertionId },
        data: {
            status: client_1.AssertionStatus.REJECTED,
            validatedAt: new Date(),
            validatedBy: args.validatedBy,
            rejectionReason: args.rejectionReason,
        },
    });
    // Log the action
    await dbTools.prisma.researchLog.create({
        data: {
            action: 'assertion_rejected',
            details: {
                assertionId: args.assertionId,
                validatedBy: args.validatedBy,
                rejectionReason: args.rejectionReason,
            },
            agentId: 'validation-agent',
        },
    });
    return {
        content: [{
                type: 'text',
                text: JSON.stringify({
                    success: true,
                    message: `Assertion rejected`,
                    assertionId: updated.id,
                    newStatus: 'REJECTED',
                    rejectionReason: args.rejectionReason,
                }),
            }],
    };
});
const addValidationNoteTool = (0, claude_agent_sdk_1.tool)('add_validation_note', 'Add a note to the validation conversation thread', {
    assertionId: zod_1.z.string().describe('The assertion ID'),
    role: zod_1.z.enum(['human', 'agent']).describe('Who is adding the note'),
    content: zod_1.z.string().describe('The note content'),
}, async (args) => {
    const assertion = await dbTools.prisma.assertion.findUnique({
        where: { id: args.assertionId },
    });
    if (!assertion) {
        return {
            content: [{
                    type: 'text',
                    text: JSON.stringify({ success: false, error: 'Assertion not found' }),
                }],
        };
    }
    const notes = assertion.validationNotes || [];
    notes.push({
        role: args.role,
        content: args.content,
        timestamp: new Date().toISOString(),
    });
    await dbTools.prisma.assertion.update({
        where: { id: args.assertionId },
        data: { validationNotes: notes },
    });
    return {
        content: [{
                type: 'text',
                text: JSON.stringify({ success: true, message: 'Note added to validation thread' }),
            }],
    };
});
const createFollowupAssertionTool = (0, claude_agent_sdk_1.tool)('create_followup_assertion', 'Create a new assertion based on researcher discovery during validation', {
    entityId: zod_1.z.string().describe('The entity ID'),
    claim: zod_1.z.string().describe('The new claim being made'),
    category: zod_1.z.string().optional().describe('Category: feature, pricing, integration, etc.'),
    reasoning: zod_1.z.string().optional().describe('Why this claim matters'),
    sourceUrl: zod_1.z.string().optional().describe('Source URL for the claim'),
    sourceQuote: zod_1.z.string().optional().describe('Relevant quote from the source'),
}, async (args) => {
    // Create the assertion
    const newAssertion = await dbTools.prisma.assertion.create({
        data: {
            entityId: args.entityId,
            claim: args.claim,
            category: args.category,
            status: client_1.AssertionStatus.CLAIM,
            criticality: client_1.AssertionCriticality.MEDIUM,
        },
    });
    // Add reasoning if provided
    if (args.reasoning) {
        await dbTools.prisma.reasoning.create({
            data: {
                assertionId: newAssertion.id,
                content: args.reasoning,
            },
        });
    }
    // Add source if provided
    if (args.sourceUrl) {
        let source = await dbTools.prisma.source.findUnique({
            where: { url: args.sourceUrl },
        });
        if (!source) {
            source = await dbTools.prisma.source.create({
                data: {
                    url: args.sourceUrl,
                    sourceType: 'vendor_docs',
                },
            });
        }
        await dbTools.prisma.assertionSource.create({
            data: {
                assertionId: newAssertion.id,
                sourceId: source.id,
                quote: args.sourceQuote,
            },
        });
    }
    // Log the action
    await dbTools.prisma.researchLog.create({
        data: {
            action: 'followup_assertion_created',
            details: {
                assertionId: newAssertion.id,
                entityId: args.entityId,
                claim: args.claim,
            },
            agentId: 'validation-agent',
        },
    });
    return {
        content: [{
                type: 'text',
                text: JSON.stringify({
                    success: true,
                    message: 'Follow-up assertion created',
                    assertionId: newAssertion.id,
                    claim: args.claim,
                }),
            }],
    };
});
const getPendingCountTool = (0, claude_agent_sdk_1.tool)('get_pending_count', 'Get count of pending assertions by criticality', {
    projectId: zod_1.z.string().optional().describe('Filter by project ID'),
}, async (args) => {
    const where = {
        status: client_1.AssertionStatus.CLAIM,
    };
    if (args.projectId) {
        where.entity = { projectId: args.projectId };
    }
    const counts = await Promise.all([
        dbTools.prisma.assertion.count({ where: { ...where, criticality: 'CRITICAL' } }),
        dbTools.prisma.assertion.count({ where: { ...where, criticality: 'HIGH' } }),
        dbTools.prisma.assertion.count({ where: { ...where, criticality: 'MEDIUM' } }),
        dbTools.prisma.assertion.count({ where: { ...where, criticality: 'LOW' } }),
    ]);
    return {
        content: [{
                type: 'text',
                text: JSON.stringify({
                    critical: counts[0],
                    high: counts[1],
                    medium: counts[2],
                    low: counts[3],
                    total: counts.reduce((a, b) => a + b, 0),
                }),
            }],
    };
});
// Export individual tools for testing
exports.validationTools = {
    getNextAssertion: getNextAssertionTool,
    getAssertionById: getAssertionByIdTool,
    validateAssertion: validateAssertionTool,
    rejectAssertion: rejectAssertionTool,
    addValidationNote: addValidationNoteTool,
    createFollowupAssertion: createFollowupAssertionTool,
    getPendingCount: getPendingCountTool,
};
// Create the MCP server with all validation tools
function createValidationMcpServer() {
    return (0, claude_agent_sdk_1.createSdkMcpServer)({
        name: 'validation',
        version: '1.0.0',
        tools: [
            getNextAssertionTool,
            getAssertionByIdTool,
            validateAssertionTool,
            rejectAssertionTool,
            addValidationNoteTool,
            createFollowupAssertionTool,
            getPendingCountTool,
        ],
    });
}
//# sourceMappingURL=tools.js.map