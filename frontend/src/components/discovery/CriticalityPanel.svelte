<script lang="ts">
  import { onMount } from 'svelte';

  interface Props {
    projectId: string;
    onScore?: (result: { scored: number }) => void;
    onValidate?: () => void;
  }

  let { projectId, onScore, onValidate }: Props = $props();

  interface CriticalitySummary {
    CRITICAL: number;
    HIGH: number;
    MEDIUM: number;
    LOW: number;
    UNSCORED: number;
    total: number;
  }

  interface AssertionNeedingValidation {
    id: string;
    claim: string;
    category: string;
    criticality: 'CRITICAL' | 'HIGH';
    criticalityScore: number;
    entityName: string;
    entityId: string;
    source?: string;
    createdAt: string;
  }

  interface ScoringWeights {
    federalRelevance: number;
    securityImpact: number;
    pricingImpact: number;
    novelty: number;
    sourceTrust: number;
  }

  let summary = $state<CriticalitySummary | null>(null);
  let needsValidation = $state<AssertionNeedingValidation[]>([]);
  let loading = $state(true);
  let scoring = $state(false);
  let showWeightsConfig = $state(false);
  let weights = $state<ScoringWeights>({
    federalRelevance: 0.30,
    securityImpact: 0.25,
    pricingImpact: 0.20,
    novelty: 0.15,
    sourceTrust: 0.10,
  });

  const criticalityColors: Record<string, string> = {
    CRITICAL: '#dc2626',
    HIGH: '#f59e0b',
    MEDIUM: '#3b82f6',
    LOW: '#6b7280',
    UNSCORED: '#9ca3af',
  };

  const criticalityLabels: Record<string, string> = {
    CRITICAL: 'Critical',
    HIGH: 'High',
    MEDIUM: 'Medium',
    LOW: 'Low',
    UNSCORED: 'Unscored',
  };

  onMount(async () => {
    await Promise.all([loadSummary(), loadNeedsValidation()]);
    loading = false;
  });

  async function loadSummary() {
    if (!projectId) return;
    try {
      const res = await fetch(`/api/discovery/criticality/summary?projectId=${projectId}`);
      const data = await res.json();
      if (data.success) {
        summary = data.data;
      }
    } catch (e) {
      console.error('Failed to load criticality summary:', e);
    }
  }

  async function loadNeedsValidation() {
    if (!projectId) return;
    try {
      const res = await fetch(`/api/discovery/criticality/needs-validation?projectId=${projectId}`);
      const data = await res.json();
      if (data.success) {
        needsValidation = data.data || [];
      }
    } catch (e) {
      console.error('Failed to load assertions needing validation:', e);
    }
  }

  async function scoreProject() {
    if (!projectId || scoring) return;
    scoring = true;
    try {
      const res = await fetch('/api/discovery/criticality/score-project', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ projectId, weights }),
      });
      const data = await res.json();
      if (data.success) {
        onScore?.({ scored: data.data?.scored || 0 });
        await Promise.all([loadSummary(), loadNeedsValidation()]);
      }
    } catch (e) {
      console.error('Failed to score project:', e);
    } finally {
      scoring = false;
    }
  }

  function handleValidate(assertion: AssertionNeedingValidation) {
    onValidate?.();
  }

  function formatDate(date: string): string {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  }

  function getTotalPercent(level: keyof CriticalitySummary): number {
    if (!summary || !summary.total || summary.total === 0) return 0;
    const count = summary[level];
    if (typeof count !== 'number') return 0;
    return Math.round((count / summary.total) * 100);
  }

  function formatWeight(value: number): string {
    return (value * 100).toFixed(0) + '%';
  }

  function updateWeight(key: keyof ScoringWeights, value: number) {
    weights[key] = value / 100;
    // Normalize weights to sum to 1
    const total = Object.values(weights).reduce((a, b) => a + b, 0);
    if (total > 0) {
      for (const k of Object.keys(weights) as (keyof ScoringWeights)[]) {
        weights[k] = weights[k] / total;
      }
    }
  }
</script>

<div class="criticality-panel">
  <div class="panel-header">
    <h2>Criticality Triage</h2>
    <div class="header-actions">
      <button
        class="btn-icon"
        onclick={() => showWeightsConfig = !showWeightsConfig}
        title="Configure scoring weights"
      >
        <svg class="icon" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd"></path>
        </svg>
      </button>
      <button
        class="btn-primary"
        onclick={scoreProject}
        disabled={scoring}
      >
        {#if scoring}
          <span class="spinner"></span>
          Scoring...
        {:else}
          <svg class="icon" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V8z" clip-rule="evenodd"></path>
          </svg>
          Score All Assertions
        {/if}
      </button>
    </div>
  </div>

  <!-- Weights Configuration -->
  {#if showWeightsConfig}
    <div class="weights-config">
      <h4>Scoring Weights</h4>
      <p class="weights-description">
        Adjust how different factors contribute to criticality scores. Weights automatically normalize to 100%.
      </p>
      <div class="weights-grid">
        <div class="weight-item">
          <label for="weight-federal">
            <span class="weight-label">Federal Relevance</span>
            <span class="weight-value">{formatWeight(weights.federalRelevance)}</span>
          </label>
          <input
            id="weight-federal"
            type="range"
            min="0"
            max="100"
            value={weights.federalRelevance * 100}
            oninput={(e) => updateWeight('federalRelevance', Number(e.currentTarget.value))}
          />
          <span class="weight-hint">FedRAMP, compliance, government use</span>
        </div>
        <div class="weight-item">
          <label for="weight-security">
            <span class="weight-label">Security Impact</span>
            <span class="weight-value">{formatWeight(weights.securityImpact)}</span>
          </label>
          <input
            id="weight-security"
            type="range"
            min="0"
            max="100"
            value={weights.securityImpact * 100}
            oninput={(e) => updateWeight('securityImpact', Number(e.currentTarget.value))}
          />
          <span class="weight-hint">Vulnerabilities, data protection</span>
        </div>
        <div class="weight-item">
          <label for="weight-pricing">
            <span class="weight-label">Pricing Impact</span>
            <span class="weight-value">{formatWeight(weights.pricingImpact)}</span>
          </label>
          <input
            id="weight-pricing"
            type="range"
            min="0"
            max="100"
            value={weights.pricingImpact * 100}
            oninput={(e) => updateWeight('pricingImpact', Number(e.currentTarget.value))}
          />
          <span class="weight-hint">Budget decisions, cost changes</span>
        </div>
        <div class="weight-item">
          <label for="weight-novelty">
            <span class="weight-label">Novelty</span>
            <span class="weight-value">{formatWeight(weights.novelty)}</span>
          </label>
          <input
            id="weight-novelty"
            type="range"
            min="0"
            max="100"
            value={weights.novelty * 100}
            oninput={(e) => updateWeight('novelty', Number(e.currentTarget.value))}
          />
          <span class="weight-hint">New information, recent changes</span>
        </div>
        <div class="weight-item">
          <label for="weight-source">
            <span class="weight-label">Source Trust</span>
            <span class="weight-value">{formatWeight(weights.sourceTrust)}</span>
          </label>
          <input
            id="weight-source"
            type="range"
            min="0"
            max="100"
            value={weights.sourceTrust * 100}
            oninput={(e) => updateWeight('sourceTrust', Number(e.currentTarget.value))}
          />
          <span class="weight-hint">Official vs third-party sources</span>
        </div>
      </div>
    </div>
  {/if}

  <!-- Summary Cards -->
  <div class="summary-section">
    {#if loading}
      <div class="loading">Loading criticality data...</div>
    {:else if summary}
      <div class="summary-grid">
        {#each ['CRITICAL', 'HIGH', 'MEDIUM', 'LOW', 'UNSCORED'] as level}
          <div class="summary-card" style="--level-color: {criticalityColors[level]}">
            <div class="summary-count" style="color: {criticalityColors[level]}">
              {summary[level as keyof CriticalitySummary] || 0}
            </div>
            <div class="summary-label">{criticalityLabels[level]}</div>
            <div class="summary-percent">{getTotalPercent(level as keyof CriticalitySummary)}%</div>
            <div class="summary-bar">
              <div
                class="summary-bar-fill"
                style="width: {getTotalPercent(level as keyof CriticalitySummary)}%; background-color: {criticalityColors[level]}"
              ></div>
            </div>
          </div>
        {/each}
      </div>
      <div class="total-count">
        Total: {summary.total} assertions
      </div>
    {:else}
      <div class="empty">No criticality data available</div>
    {/if}
  </div>

  <!-- Needs Validation List -->
  <div class="validation-section">
    <div class="section-header">
      <h3>
        <svg class="icon" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>
        </svg>
        Needs Validation ({needsValidation.length})
      </h3>
      <span class="section-subtitle">Critical and high-priority claims awaiting review</span>
    </div>

    {#if loading}
      <div class="loading">Loading...</div>
    {:else if needsValidation.length === 0}
      <div class="empty-validation">
        <svg class="icon-large" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
        </svg>
        <span>All critical assertions have been validated</span>
      </div>
    {:else}
      <div class="validation-list">
        {#each needsValidation as assertion}
          <div class="validation-item">
            <div class="validation-header">
              <span
                class="criticality-badge"
                style="background-color: {criticalityColors[assertion.criticality]}"
              >
                {assertion.criticality}
              </span>
              <span class="category-badge">{assertion.category}</span>
              <span class="entity-name">{assertion.entityName}</span>
              <span class="score-badge" title="Criticality score">
                {assertion.criticalityScore}
              </span>
            </div>
            <div class="validation-claim">
              {assertion.claim}
            </div>
            {#if assertion.source}
              <div class="validation-source">
                <svg class="icon-small" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"></path>
                  <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"></path>
                </svg>
                <a href={assertion.source} target="_blank" rel="noopener noreferrer">
                  {new URL(assertion.source).hostname}
                </a>
              </div>
            {/if}
            <div class="validation-footer">
              <span class="validation-date">{formatDate(assertion.createdAt)}</span>
              <button
                class="btn-validate"
                onclick={() => handleValidate(assertion)}
              >
                <svg class="icon" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                </svg>
                Validate
              </button>
            </div>
          </div>
        {/each}
      </div>
    {/if}
  </div>
</div>

<style>
  .criticality-panel {
    background: white;
    border-radius: 8px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }

  .panel-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 1.5rem;
    border-bottom: 1px solid var(--color-border, #e5e5e5);
  }

  .panel-header h2 {
    font-size: 1.125rem;
    font-weight: 600;
    margin: 0;
  }

  .header-actions {
    display: flex;
    gap: 0.5rem;
    align-items: center;
  }

  .btn-icon {
    padding: 0.5rem;
    background: transparent;
    border: 1px solid var(--color-border, #e5e5e5);
    border-radius: 6px;
    cursor: pointer;
    color: var(--color-text-secondary, #666);
    transition: all 0.2s;
  }

  .btn-icon:hover {
    background: var(--color-bg-secondary, #f7f5f0);
    color: var(--color-text, #1a1a1a);
  }

  .btn-primary {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    background: var(--color-primary, #2563eb);
    color: white;
    border: none;
    border-radius: 6px;
    font-size: 0.875rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
  }

  .btn-primary:hover:not(:disabled) {
    background: #1d4ed8;
  }

  .btn-primary:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  .spinner {
    width: 14px;
    height: 14px;
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-top-color: white;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  .icon {
    width: 16px;
    height: 16px;
  }

  .icon-small {
    width: 14px;
    height: 14px;
  }

  .icon-large {
    width: 24px;
    height: 24px;
  }

  /* Weights Configuration */
  .weights-config {
    padding: 1rem 1.5rem;
    background: var(--color-bg-secondary, #f7f5f0);
    border-bottom: 1px solid var(--color-border, #e5e5e5);
  }

  .weights-config h4 {
    font-size: 0.875rem;
    font-weight: 600;
    margin: 0 0 0.25rem 0;
  }

  .weights-description {
    font-size: 0.75rem;
    color: var(--color-text-secondary, #666);
    margin: 0 0 1rem 0;
  }

  .weights-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 1rem;
  }

  .weight-item {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .weight-item label {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.875rem;
  }

  .weight-label {
    font-weight: 500;
  }

  .weight-value {
    font-weight: 600;
    color: var(--color-primary, #2563eb);
  }

  .weight-item input[type="range"] {
    width: 100%;
    height: 6px;
    appearance: none;
    background: #e5e5e5;
    border-radius: 3px;
    cursor: pointer;
  }

  .weight-item input[type="range"]::-webkit-slider-thumb {
    appearance: none;
    width: 16px;
    height: 16px;
    background: var(--color-primary, #2563eb);
    border-radius: 50%;
    cursor: pointer;
  }

  .weight-hint {
    font-size: 0.7rem;
    color: var(--color-text-secondary, #666);
  }

  /* Summary Section */
  .summary-section {
    padding: 1.5rem;
    border-bottom: 1px solid var(--color-border, #e5e5e5);
  }

  .summary-grid {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 1rem;
  }

  @media (max-width: 768px) {
    .summary-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  .summary-card {
    padding: 1rem;
    background: var(--color-bg-secondary, #f7f5f0);
    border-radius: 6px;
    text-align: center;
    border-left: 3px solid var(--level-color);
  }

  .summary-count {
    font-size: 2rem;
    font-weight: 700;
    line-height: 1;
  }

  .summary-label {
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    color: var(--color-text-secondary, #666);
    margin-top: 0.25rem;
  }

  .summary-percent {
    font-size: 0.75rem;
    color: var(--color-text-secondary, #666);
    margin-top: 0.25rem;
  }

  .summary-bar {
    height: 4px;
    background: #e5e5e5;
    border-radius: 2px;
    margin-top: 0.5rem;
    overflow: hidden;
  }

  .summary-bar-fill {
    height: 100%;
    transition: width 0.3s ease;
  }

  .total-count {
    text-align: center;
    margin-top: 1rem;
    font-size: 0.875rem;
    color: var(--color-text-secondary, #666);
  }

  /* Validation Section */
  .validation-section {
    padding: 1.5rem;
  }

  .section-header {
    margin-bottom: 1rem;
  }

  .section-header h3 {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 1rem;
    font-weight: 600;
    margin: 0;
    color: #dc2626;
  }

  .section-subtitle {
    display: block;
    font-size: 0.75rem;
    color: var(--color-text-secondary, #666);
    margin-top: 0.25rem;
  }

  .validation-list {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .validation-item {
    padding: 1rem;
    background: var(--color-bg-secondary, #f7f5f0);
    border-radius: 6px;
    border: 1px solid var(--color-border, #e5e5e5);
    transition: border-color 0.2s;
  }

  .validation-item:hover {
    border-color: #d1d5db;
  }

  .validation-header {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    flex-wrap: wrap;
    margin-bottom: 0.5rem;
  }

  .criticality-badge {
    padding: 0.125rem 0.5rem;
    border-radius: 4px;
    font-size: 0.675rem;
    font-weight: 600;
    text-transform: uppercase;
    color: white;
  }

  .category-badge {
    padding: 0.125rem 0.5rem;
    border-radius: 4px;
    font-size: 0.675rem;
    font-weight: 500;
    text-transform: uppercase;
    background: #e5e5e5;
    color: var(--color-text-secondary, #666);
  }

  .entity-name {
    font-size: 0.75rem;
    font-weight: 500;
    color: var(--color-text, #1a1a1a);
  }

  .score-badge {
    margin-left: auto;
    padding: 0.125rem 0.375rem;
    background: #e5e5e5;
    border-radius: 4px;
    font-size: 0.7rem;
    font-weight: 600;
    color: var(--color-text-secondary, #666);
  }

  .validation-claim {
    font-size: 0.875rem;
    line-height: 1.5;
    color: var(--color-text, #1a1a1a);
    margin-bottom: 0.5rem;
  }

  .validation-source {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    margin-bottom: 0.5rem;
  }

  .validation-source svg {
    color: var(--color-text-secondary, #666);
  }

  .validation-source a {
    font-size: 0.75rem;
    color: var(--color-primary, #2563eb);
    text-decoration: none;
  }

  .validation-source a:hover {
    text-decoration: underline;
  }

  .validation-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 0.5rem;
    padding-top: 0.5rem;
    border-top: 1px solid var(--color-border, #e5e5e5);
  }

  .validation-date {
    font-size: 0.75rem;
    color: var(--color-text-secondary, #666);
  }

  .btn-validate {
    display: flex;
    align-items: center;
    gap: 0.375rem;
    padding: 0.375rem 0.75rem;
    background: #10b981;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 0.75rem;
    font-weight: 500;
    cursor: pointer;
    transition: background 0.2s;
  }

  .btn-validate:hover {
    background: #059669;
  }

  .btn-validate .icon {
    width: 14px;
    height: 14px;
  }

  .empty-validation {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 1.5rem;
    background: #dcfce7;
    border-radius: 6px;
    color: #166534;
    font-size: 0.875rem;
  }

  .empty-validation svg {
    color: #10b981;
  }

  .loading, .empty {
    text-align: center;
    padding: 2rem;
    color: var(--color-text-secondary, #666);
  }
</style>
