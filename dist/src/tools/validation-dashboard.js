"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateValidationDashboard = generateValidationDashboard;
const client_1 = __importDefault(require("../db/client"));
const client_2 = require("../../generated/prisma/client");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
/**
 * Generate static HTML validation dashboard for human-in-the-loop review
 */
async function generateValidationDashboard(options = {}) {
    const { projectId, outputPath = './validation-dashboard.html', validatorName = 'researcher' } = options;
    // Get assertions pending validation, sorted by criticality
    const where = {
        status: client_2.AssertionStatus.CLAIM,
    };
    if (projectId) {
        where.entity = { projectId };
    }
    const assertions = await client_1.default.assertion.findMany({
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
    // Get rejected assertions pending re-research
    const rejectedAssertions = await client_1.default.assertion.findMany({
        where: {
            status: client_2.AssertionStatus.REJECTED,
            supersededBy: null,
            ...(projectId ? { entity: { projectId } } : {}),
        },
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
            { createdAt: 'desc' },
        ],
    });
    // Group assertions by criticality
    const grouped = {
        CRITICAL: assertions.filter(a => a.criticality === client_2.AssertionCriticality.CRITICAL),
        HIGH: assertions.filter(a => a.criticality === client_2.AssertionCriticality.HIGH),
        MEDIUM: assertions.filter(a => a.criticality === client_2.AssertionCriticality.MEDIUM),
        LOW: assertions.filter(a => a.criticality === client_2.AssertionCriticality.LOW),
    };
    // Generate HTML
    const html = generateHtml(grouped, rejectedAssertions, validatorName);
    // Write to file
    const fullPath = path.resolve(outputPath);
    fs.writeFileSync(fullPath, html);
    return {
        outputPath: fullPath,
        stats: {
            total: assertions.length,
            critical: grouped.CRITICAL.length,
            high: grouped.HIGH.length,
            medium: grouped.MEDIUM.length,
            low: grouped.LOW.length,
            rejectedPendingReresearch: rejectedAssertions.length,
        },
    };
}
function generateHtml(grouped, rejected, validatorName) {
    const criticalityColors = {
        CRITICAL: { bg: '#FEE2E2', border: '#DC2626', text: '#991B1B' },
        HIGH: { bg: '#FEF3C7', border: '#F59E0B', text: '#92400E' },
        MEDIUM: { bg: '#E0E7FF', border: '#6366F1', text: '#3730A3' },
        LOW: { bg: '#F3F4F6', border: '#9CA3AF', text: '#374151' },
    };
    const renderAssertion = (assertion, criticality) => {
        const colors = criticalityColors[criticality];
        const sources = assertion.sources.map((as) => ({
            url: as.source.url,
            quote: as.quote,
            title: as.source.title,
        }));
        const validateCmd = `npm run cli -- assertion:validate '{"assertionId": "${assertion.id}", "validatedBy": "${validatorName}"}'`;
        const rejectCmd = `npm run cli -- assertion:reject '{"assertionId": "${assertion.id}", "validatedBy": "${validatorName}", "rejectionReason": "REASON_HERE"}'`;
        return `
      <div class="assertion-card" style="border-left: 4px solid ${colors.border}; background: ${colors.bg};">
        <div class="assertion-header">
          <span class="entity-name">${escapeHtml(assertion.entity.name)}</span>
          <span class="criticality-badge" style="background: ${colors.border}; color: white;">${criticality}</span>
          ${assertion.citedInConclusion ? '<span class="cited-badge">CITED IN CONCLUSIONS</span>' : ''}
        </div>
        <div class="claim">${escapeHtml(assertion.claim)}</div>
        ${assertion.category ? `<div class="category">Category: ${escapeHtml(assertion.category)}</div>` : ''}

        ${sources.length > 0 ? `
          <div class="sources">
            <strong>Sources:</strong>
            ${sources.map((s) => `
              <div class="source">
                <a href="${escapeHtml(s.url)}" target="_blank" rel="noopener">${escapeHtml(s.title || s.url)}</a>
                ${s.quote ? `<blockquote>${escapeHtml(s.quote)}</blockquote>` : ''}
              </div>
            `).join('')}
          </div>
        ` : '<div class="no-sources">No sources linked</div>'}

        ${assertion.reasoning.length > 0 ? `
          <div class="reasoning">
            <strong>Reasoning:</strong>
            ${assertion.reasoning.map((r) => `<p>${escapeHtml(r.content)}</p>`).join('')}
          </div>
        ` : ''}

        <div class="actions">
          <button class="validate-btn" onclick="copyToClipboard(\`${escapeHtml(validateCmd)}\`)">
            Copy VALIDATE Command
          </button>
          <button class="reject-btn" onclick="copyToClipboard(\`${escapeHtml(rejectCmd)}\`)">
            Copy REJECT Command
          </button>
        </div>
        <div class="assertion-id">ID: ${assertion.id}</div>
      </div>
    `;
    };
    const renderRejected = (assertion) => {
        const supersedCmd = `npm run cli -- assertion:supersede '{"rejectedId": "${assertion.id}", "newAssertionId": "NEW_ASSERTION_ID"}'`;
        return `
      <div class="assertion-card rejected">
        <div class="assertion-header">
          <span class="entity-name">${escapeHtml(assertion.entity.name)}</span>
          <span class="criticality-badge rejected-badge">REJECTED</span>
        </div>
        <div class="claim">${escapeHtml(assertion.claim)}</div>
        ${assertion.rejectionReason ? `<div class="rejection-reason"><strong>Rejection Reason:</strong> ${escapeHtml(assertion.rejectionReason)}</div>` : ''}
        <div class="actions">
          <button class="supersede-btn" onclick="copyToClipboard(\`${escapeHtml(supersedCmd)}\`)">
            Copy SUPERSEDE Command
          </button>
        </div>
        <div class="assertion-id">ID: ${assertion.id}</div>
      </div>
    `;
    };
    const total = Object.values(grouped).reduce((sum, arr) => sum + arr.length, 0);
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Assertion Validation Dashboard</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif;
            background: #f5f5f5;
            padding: 20px;
            max-width: 1200px;
            margin: 0 auto;
        }
        h1 {
            color: #7500c0;
            border-bottom: 3px solid #7500c0;
            padding-bottom: 10px;
            margin-bottom: 20px;
        }
        .stats {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: 15px;
            margin-bottom: 30px;
        }
        .stat-box {
            background: white;
            padding: 20px;
            border-radius: 8px;
            text-align: center;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .stat-value { font-size: 2em; font-weight: bold; color: #7500c0; }
        .stat-label { color: #6b7280; font-size: 0.9em; }
        .section { margin-bottom: 30px; }
        .section h2 {
            color: #374151;
            margin-bottom: 15px;
            padding: 10px 15px;
            border-radius: 6px;
        }
        .section.critical h2 { background: #FEE2E2; border-left: 4px solid #DC2626; }
        .section.high h2 { background: #FEF3C7; border-left: 4px solid #F59E0B; }
        .section.medium h2 { background: #E0E7FF; border-left: 4px solid #6366F1; }
        .section.low h2 { background: #F3F4F6; border-left: 4px solid #9CA3AF; }
        .section.rejected h2 { background: #FEE2E2; border-left: 4px solid #991B1B; }
        .assertion-card {
            background: white;
            padding: 20px;
            margin-bottom: 15px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .assertion-card.rejected { border-left-color: #991B1B !important; }
        .assertion-header {
            display: flex;
            align-items: center;
            gap: 10px;
            margin-bottom: 10px;
        }
        .entity-name { font-weight: 600; color: #7500c0; }
        .criticality-badge {
            padding: 2px 8px;
            border-radius: 4px;
            font-size: 0.75em;
            font-weight: 600;
        }
        .cited-badge {
            background: #7500c0;
            color: white;
            padding: 2px 8px;
            border-radius: 4px;
            font-size: 0.75em;
        }
        .rejected-badge { background: #991B1B !important; }
        .claim {
            font-size: 1.1em;
            margin-bottom: 10px;
            line-height: 1.5;
        }
        .category { color: #6b7280; font-size: 0.9em; margin-bottom: 10px; }
        .sources { margin: 15px 0; padding: 10px; background: rgba(0,0,0,0.03); border-radius: 6px; }
        .source { margin: 10px 0; }
        .source a { color: #7500c0; }
        .source blockquote {
            margin: 5px 0 0 15px;
            padding-left: 10px;
            border-left: 2px solid #d1d5db;
            color: #6b7280;
            font-style: italic;
        }
        .no-sources { color: #DC2626; font-weight: 600; }
        .reasoning { margin: 15px 0; color: #374151; }
        .reasoning p { margin: 5px 0; }
        .rejection-reason { margin: 10px 0; padding: 10px; background: #FEE2E2; border-radius: 6px; }
        .actions {
            display: flex;
            gap: 10px;
            margin-top: 15px;
            flex-wrap: wrap;
        }
        button {
            padding: 8px 16px;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            font-weight: 600;
            font-size: 0.9em;
            transition: transform 0.1s, opacity 0.1s;
        }
        button:hover { transform: translateY(-1px); }
        button:active { transform: translateY(0); opacity: 0.8; }
        .validate-btn { background: #10B981; color: white; }
        .reject-btn { background: #DC2626; color: white; }
        .supersede-btn { background: #6366F1; color: white; }
        .assertion-id { font-size: 0.8em; color: #9ca3af; margin-top: 10px; }
        .toast {
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: #1f2937;
            color: white;
            padding: 12px 24px;
            border-radius: 8px;
            display: none;
            z-index: 1000;
        }
        .toast.show { display: block; animation: fadeIn 0.3s; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .workflow-note {
            background: linear-gradient(135deg, #F3E8FF, #E9D5FF);
            border-left: 4px solid #7500c0;
            padding: 15px 20px;
            margin-bottom: 20px;
            border-radius: 6px;
        }
        .workflow-note h3 { color: #7500c0; margin-bottom: 10px; }
        .workflow-note ol { margin-left: 20px; }
        .workflow-note li { margin: 5px 0; }
        .workflow-note code { background: rgba(0,0,0,0.1); padding: 2px 6px; border-radius: 3px; }
    </style>
</head>
<body>
    <h1>Assertion Validation Dashboard</h1>

    <div class="workflow-note">
        <h3>Validation Workflow</h3>
        <ol>
            <li>Review each assertion and its source links</li>
            <li>Click the source URL to verify the claim</li>
            <li>Click <strong>Copy VALIDATE Command</strong> or <strong>Copy REJECT Command</strong></li>
            <li>Paste and run the command in your terminal</li>
            <li>Regenerate this dashboard: <code>npm run cli -- validation:generate</code></li>
        </ol>
    </div>

    <div class="stats">
        <div class="stat-box">
            <div class="stat-value">${total}</div>
            <div class="stat-label">Total Pending</div>
        </div>
        <div class="stat-box" style="border-left: 4px solid #DC2626;">
            <div class="stat-value" style="color: #DC2626;">${grouped.CRITICAL.length}</div>
            <div class="stat-label">Critical</div>
        </div>
        <div class="stat-box" style="border-left: 4px solid #F59E0B;">
            <div class="stat-value" style="color: #F59E0B;">${grouped.HIGH.length}</div>
            <div class="stat-label">High</div>
        </div>
        <div class="stat-box" style="border-left: 4px solid #6366F1;">
            <div class="stat-value" style="color: #6366F1;">${grouped.MEDIUM.length}</div>
            <div class="stat-label">Medium</div>
        </div>
        <div class="stat-box" style="border-left: 4px solid #9CA3AF;">
            <div class="stat-value" style="color: #9CA3AF;">${grouped.LOW.length}</div>
            <div class="stat-label">Low</div>
        </div>
        <div class="stat-box" style="border-left: 4px solid #991B1B;">
            <div class="stat-value" style="color: #991B1B;">${rejected.length}</div>
            <div class="stat-label">Rejected (Re-research)</div>
        </div>
    </div>

    ${grouped.CRITICAL.length > 0 ? `
      <div class="section critical">
        <h2>CRITICAL - Must Validate Before Conclusions (${grouped.CRITICAL.length})</h2>
        ${grouped.CRITICAL.map(a => renderAssertion(a, 'CRITICAL')).join('')}
      </div>
    ` : ''}

    ${grouped.HIGH.length > 0 ? `
      <div class="section high">
        <h2>HIGH - Should Validate (${grouped.HIGH.length})</h2>
        ${grouped.HIGH.map(a => renderAssertion(a, 'HIGH')).join('')}
      </div>
    ` : ''}

    ${grouped.MEDIUM.length > 0 ? `
      <div class="section medium">
        <h2>MEDIUM - Validate as Time Permits (${grouped.MEDIUM.length})</h2>
        ${grouped.MEDIUM.map(a => renderAssertion(a, 'MEDIUM')).join('')}
      </div>
    ` : ''}

    ${grouped.LOW.length > 0 ? `
      <div class="section low">
        <h2>LOW - Optional Validation (${grouped.LOW.length})</h2>
        ${grouped.LOW.map(a => renderAssertion(a, 'LOW')).join('')}
      </div>
    ` : ''}

    ${rejected.length > 0 ? `
      <div class="section rejected">
        <h2>REJECTED - Pending Re-Research (${rejected.length})</h2>
        ${rejected.map(a => renderRejected(a)).join('')}
      </div>
    ` : ''}

    ${total === 0 && rejected.length === 0 ? `
      <div class="assertion-card" style="text-align: center; padding: 40px;">
        <h2 style="color: #10B981;">All assertions validated!</h2>
        <p style="color: #6b7280; margin-top: 10px;">No pending assertions require validation.</p>
      </div>
    ` : ''}

    <div class="toast" id="toast">Command copied to clipboard!</div>

    <script>
        function copyToClipboard(text) {
            navigator.clipboard.writeText(text).then(() => {
                const toast = document.getElementById('toast');
                toast.classList.add('show');
                setTimeout(() => toast.classList.remove('show'), 2000);
            });
        }
    </script>
</body>
</html>`;
}
function escapeHtml(text) {
    if (!text)
        return '';
    return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;')
        .replace(/`/g, '&#96;');
}
//# sourceMappingURL=validation-dashboard.js.map