<script lang="ts">
  import { onMount } from 'svelte';

  interface Props {
    projectId: string;
    onDetect?: (result: { trendsDetected: number }) => void;
  }

  let { projectId, onDetect }: Props = $props();

  let trends = $state<any[]>([]);
  let trendingEntities = $state<any[]>([]);
  let selectedTrend = $state<any>(null);
  let loading = $state(true);
  let detecting = $state(false);
  let error = $state('');

  // Filter state
  let filterCategory = $state('');
  let filterMinScore = $state(0);
  let filterEmerging = $state(false);

  // Detection config
  let detectConfig = $state({
    windowDays: 30,
    minMentions: 2,
    minSources: 1,
  });

  const categories = [
    { value: '', label: 'All Categories' },
    { value: 'code_generation', label: 'Code Generation' },
    { value: 'agents', label: 'Agents' },
    { value: 'rag', label: 'RAG' },
    { value: 'security', label: 'Security' },
    { value: 'testing', label: 'Testing' },
    { value: 'devops', label: 'DevOps' },
    { value: 'ide', label: 'IDE' },
    { value: 'llm', label: 'LLM' },
    { value: 'infrastructure', label: 'Infrastructure' },
    { value: 'other', label: 'Other' },
  ];

  onMount(async () => {
    await Promise.all([loadTrends(), loadTrendingEntities()]);
    loading = false;
  });

  async function loadTrends() {
    if (!projectId) return;
    try {
      const params = new URLSearchParams();
      params.set('projectId', projectId);
      if (filterMinScore > 0) params.set('minScore', String(filterMinScore));
      if (filterCategory) params.set('category', filterCategory);
      if (filterEmerging) params.set('emerging', 'true');

      const res = await fetch(`/api/discovery/trends?${params.toString()}`);
      const data = await res.json();
      if (data.success) {
        trends = data.data || [];
      } else {
        error = data.error || 'Failed to load trends';
      }
    } catch (e) {
      console.error('Failed to load trends:', e);
      error = 'Failed to load trends';
    }
  }

  async function loadTrendingEntities() {
    if (!projectId) return;
    try {
      const res = await fetch(`/api/discovery/trends/entities?projectId=${projectId}`);
      const data = await res.json();
      if (data.success) {
        trendingEntities = data.data || [];
      }
    } catch (e) {
      console.error('Failed to load trending entities:', e);
    }
  }

  async function loadTrendDetails(trendId: string) {
    try {
      const res = await fetch(`/api/discovery/trends/${trendId}`);
      const data = await res.json();
      if (data.success) {
        selectedTrend = data.data;
      }
    } catch (e) {
      console.error('Failed to load trend details:', e);
    }
  }

  async function runTrendDetection() {
    if (!projectId) return;
    detecting = true;
    error = '';
    try {
      const res = await fetch('/api/discovery/trends/detect', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectId,
          windowDays: detectConfig.windowDays,
          minMentions: detectConfig.minMentions,
          minSources: detectConfig.minSources,
        }),
      });
      const data = await res.json();
      if (data.success) {
        await loadTrends();
        onDetect?.({ trendsDetected: data.data?.trendsDetected || 0 });
      } else {
        error = data.error || 'Trend detection failed';
      }
    } catch (e) {
      console.error('Trend detection failed:', e);
      error = 'Trend detection failed';
    } finally {
      detecting = false;
    }
  }

  function applyFilters() {
    loading = true;
    loadTrends().then(() => {
      loading = false;
    });
  }

  function selectTrend(trend: any) {
    loadTrendDetails(trend.id);
  }

  function closeTrendDetails() {
    selectedTrend = null;
  }

  function getCategoryColor(category: string): string {
    const colors: Record<string, string> = {
      code_generation: '#3b82f6',
      agents: '#8b5cf6',
      rag: '#06b6d4',
      security: '#ef4444',
      testing: '#22c55e',
      devops: '#f59e0b',
      ide: '#ec4899',
      llm: '#6366f1',
      infrastructure: '#14b8a6',
      other: '#6b7280',
    };
    return colors[category] || colors.other;
  }

  function getScoreClass(score: number): string {
    if (score >= 0.8) return 'score-high';
    if (score >= 0.5) return 'score-medium';
    return 'score-low';
  }

  function formatPercent(value: number): string {
    return `${Math.round(value * 100)}%`;
  }

  function formatDate(date: string): string {
    return new Date(date).toLocaleDateString();
  }
</script>

<div class="trends-panel">
  <!-- Detection Section -->
  <div class="detection-section">
    <div class="section-header">
      <h3>Trend Detection</h3>
      <button
        class="btn-primary"
        onclick={runTrendDetection}
        disabled={detecting || !projectId}
      >
        {detecting ? 'Detecting...' : 'Run Detection'}
      </button>
    </div>

    <details class="detection-config">
      <summary>Detection Settings</summary>
      <div class="config-form">
        <div class="form-row">
          <div class="form-group">
            <label for="windowDays">Window (days)</label>
            <input
              id="windowDays"
              type="number"
              bind:value={detectConfig.windowDays}
              min="1"
              max="365"
            />
          </div>
          <div class="form-group">
            <label for="minMentions">Min Mentions</label>
            <input
              id="minMentions"
              type="number"
              bind:value={detectConfig.minMentions}
              min="1"
              max="100"
            />
          </div>
          <div class="form-group">
            <label for="minSources">Min Sources</label>
            <input
              id="minSources"
              type="number"
              bind:value={detectConfig.minSources}
              min="1"
              max="50"
            />
          </div>
        </div>
      </div>
    </details>

    {#if error}
      <div class="error-message">{error}</div>
    {/if}
  </div>

  <!-- Filters -->
  <div class="filters-section">
    <div class="filters">
      <select bind:value={filterCategory} onchange={applyFilters}>
        {#each categories as cat}
          <option value={cat.value}>{cat.label}</option>
        {/each}
      </select>
      <div class="filter-group">
        <label for="minScore">Min Score:</label>
        <input
          id="minScore"
          type="range"
          bind:value={filterMinScore}
          min="0"
          max="1"
          step="0.1"
          onchange={applyFilters}
        />
        <span class="score-value">{formatPercent(filterMinScore)}</span>
      </div>
      <label class="checkbox-label">
        <input
          type="checkbox"
          bind:checked={filterEmerging}
          onchange={applyFilters}
        />
        Emerging Only
      </label>
    </div>
  </div>

  <!-- Trends List -->
  <div class="trends-list">
    <div class="section-header">
      <h3>Detected Trends</h3>
      <span class="count-badge">{trends.length}</span>
    </div>

    {#if loading}
      <div class="loading">Loading trends...</div>
    {:else if trends.length === 0}
      <div class="empty-state">
        <p>No trends detected yet.</p>
        <p class="hint">Run trend detection to analyze discoveries.</p>
      </div>
    {:else}
      <div class="trends-grid">
        {#each trends as trend}
          <button
            class="trend-card"
            class:selected={selectedTrend?.id === trend.id}
            onclick={() => selectTrend(trend)}
          >
            <div class="trend-header">
              <span
                class="category-badge"
                style="background: {getCategoryColor(trend.category)}"
              >
                {trend.category?.replace('_', ' ') || 'uncategorized'}
              </span>
              {#if trend.isEmerging}
                <span class="emerging-badge">Emerging</span>
              {/if}
            </div>
            <div class="trend-name">{trend.name}</div>
            <div class="trend-metrics">
              <div class="metric">
                <span class="metric-value {getScoreClass(trend.score)}">{formatPercent(trend.score)}</span>
                <span class="metric-label">Score</span>
              </div>
              <div class="metric">
                <span class="metric-value">{trend.mentionCount || 0}</span>
                <span class="metric-label">Mentions</span>
              </div>
              <div class="metric">
                <span class="metric-value">{trend.sourceCount || 0}</span>
                <span class="metric-label">Sources</span>
              </div>
            </div>
            {#if trend.velocity !== undefined}
              <div class="velocity-bar">
                <div class="velocity-label">Velocity</div>
                <div class="velocity-track">
                  <div
                    class="velocity-fill"
                    style="width: {Math.min(trend.velocity * 100, 100)}%"
                  ></div>
                </div>
              </div>
            {/if}
          </button>
        {/each}
      </div>
    {/if}
  </div>

  <!-- Trending Entities -->
  {#if trendingEntities.length > 0}
    <div class="trending-entities">
      <div class="section-header">
        <h3>Trending Entities</h3>
        <span class="count-badge">{trendingEntities.length}</span>
      </div>
      <div class="entities-list">
        {#each trendingEntities.slice(0, 10) as entity}
          <div class="entity-item">
            <div class="entity-info">
              <span class="entity-name">{entity.name}</span>
              {#if entity.trendScore}
                <span class="trend-score {getScoreClass(entity.trendScore)}">
                  {formatPercent(entity.trendScore)}
                </span>
              {/if}
            </div>
            {#if entity.trendCategories?.length > 0}
              <div class="entity-categories">
                {#each entity.trendCategories.slice(0, 3) as cat}
                  <span
                    class="mini-badge"
                    style="background: {getCategoryColor(cat)}"
                  >
                    {cat.replace('_', ' ')}
                  </span>
                {/each}
              </div>
            {/if}
          </div>
        {/each}
        {#if trendingEntities.length > 10}
          <div class="more-link">+{trendingEntities.length - 10} more entities</div>
        {/if}
      </div>
    </div>
  {/if}

  <!-- Trend Details Modal -->
  {#if selectedTrend}
    <div class="trend-details-overlay" onclick={closeTrendDetails} onkeydown={(e) => e.key === 'Escape' && closeTrendDetails()} role="button" tabindex="0">
      <div class="trend-details" onclick={(e) => e.stopPropagation()} onkeydown={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
        <div class="details-header">
          <div class="details-title">
            <h2>{selectedTrend.name}</h2>
            <span
              class="category-badge large"
              style="background: {getCategoryColor(selectedTrend.category)}"
            >
              {selectedTrend.category?.replace('_', ' ') || 'uncategorized'}
            </span>
            {#if selectedTrend.isEmerging}
              <span class="emerging-badge large">Emerging</span>
            {/if}
          </div>
          <button class="close-btn" onclick={closeTrendDetails}>x</button>
        </div>

        <div class="details-body">
          <!-- Score Visualization -->
          <div class="score-section">
            <div class="score-circle {getScoreClass(selectedTrend.score)}">
              <span class="score-number">{formatPercent(selectedTrend.score)}</span>
              <span class="score-label">Overall Score</span>
            </div>
            <div class="score-breakdown">
              <div class="breakdown-item">
                <span class="breakdown-label">Mentions</span>
                <span class="breakdown-value">{selectedTrend.mentionCount || 0}</span>
              </div>
              <div class="breakdown-item">
                <span class="breakdown-label">Sources</span>
                <span class="breakdown-value">{selectedTrend.sourceCount || 0}</span>
              </div>
              <div class="breakdown-item">
                <span class="breakdown-label">Velocity</span>
                <span class="breakdown-value">{selectedTrend.velocity?.toFixed(2) || '0.00'}</span>
              </div>
              <div class="breakdown-item">
                <span class="breakdown-label">Emerging Score</span>
                <span class="breakdown-value">{formatPercent(selectedTrend.emergingScore || 0)}</span>
              </div>
            </div>
          </div>

          <!-- Keywords -->
          {#if selectedTrend.keywords?.length > 0}
            <div class="keywords-section">
              <h4>Keywords</h4>
              <div class="keywords-list">
                {#each selectedTrend.keywords as keyword}
                  <span class="keyword-chip">{keyword}</span>
                {/each}
              </div>
            </div>
          {/if}

          <!-- Related Entities -->
          {#if selectedTrend.entities?.length > 0}
            <div class="entities-section">
              <h4>Related Entities ({selectedTrend.entities.length})</h4>
              <div class="related-entities">
                {#each selectedTrend.entities as entity}
                  <a
                    href="/entities/{entity.id}"
                    class="related-entity"
                    target="_blank"
                    rel="noopener"
                  >
                    <span class="entity-name">{entity.name}</span>
                    {#if entity.url}
                      <span class="entity-url">{entity.url}</span>
                    {/if}
                  </a>
                {/each}
              </div>
            </div>
          {/if}

          <!-- Metadata -->
          <div class="metadata-section">
            <div class="metadata-item">
              <span class="metadata-label">First Seen</span>
              <span class="metadata-value">{formatDate(selectedTrend.firstSeenAt || selectedTrend.createdAt)}</span>
            </div>
            <div class="metadata-item">
              <span class="metadata-label">Last Updated</span>
              <span class="metadata-value">{formatDate(selectedTrend.updatedAt)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  {/if}
</div>

<style>
  .trends-panel {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .detection-section, .filters-section, .trends-list, .trending-entities {
    background: white;
    border-radius: 8px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    padding: 1.5rem;
  }

  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
  }

  .section-header h3 {
    font-size: 1rem;
    font-weight: 600;
    margin: 0;
  }

  .count-badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 24px;
    height: 24px;
    padding: 0 8px;
    background: var(--color-bg-secondary, #f7f5f0);
    border-radius: 12px;
    font-size: 0.75rem;
    font-weight: 600;
    color: var(--color-text-secondary, #666);
  }

  .btn-primary {
    padding: 0.5rem 1rem;
    border-radius: 6px;
    font-size: 0.875rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
    border: none;
    background: var(--color-primary, #2563eb);
    color: white;
  }

  .btn-primary:hover:not(:disabled) {
    background: #1d4ed8;
  }

  .btn-primary:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .detection-config {
    margin-top: 1rem;
    border-top: 1px solid var(--color-border, #e5e5e5);
    padding-top: 1rem;
  }

  .detection-config summary {
    cursor: pointer;
    font-weight: 500;
    color: var(--color-text-secondary, #666);
  }

  .config-form {
    margin-top: 1rem;
  }

  .form-row {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .form-group label {
    font-size: 0.875rem;
    font-weight: 500;
  }

  input[type="number"] {
    padding: 0.5rem;
    border: 1px solid var(--color-border, #e5e5e5);
    border-radius: 4px;
    font-size: 0.875rem;
  }

  .error-message {
    margin-top: 1rem;
    padding: 0.75rem 1rem;
    background: #fee2e2;
    border: 1px solid #fca5a5;
    border-radius: 6px;
    color: #991b1b;
    font-size: 0.875rem;
  }

  .filters-section {
    padding: 1rem 1.5rem;
  }

  .filters {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    flex-wrap: wrap;
  }

  .filters select {
    padding: 0.375rem 0.75rem;
    border: 1px solid var(--color-border, #e5e5e5);
    border-radius: 4px;
    font-size: 0.875rem;
  }

  .filter-group {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .filter-group label {
    font-size: 0.875rem;
    color: var(--color-text-secondary, #666);
  }

  input[type="range"] {
    width: 100px;
  }

  .score-value {
    font-size: 0.875rem;
    font-weight: 500;
    min-width: 40px;
  }

  .checkbox-label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.875rem;
    cursor: pointer;
  }

  .loading, .empty-state {
    text-align: center;
    padding: 2rem;
    color: var(--color-text-secondary, #666);
  }

  .empty-state p {
    margin: 0;
  }

  .empty-state .hint {
    font-size: 0.875rem;
    margin-top: 0.5rem;
    opacity: 0.8;
  }

  .trends-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1rem;
  }

  .trend-card {
    display: block;
    width: 100%;
    padding: 1rem;
    background: var(--color-bg-secondary, #f7f5f0);
    border: 2px solid transparent;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s;
    text-align: left;
  }

  .trend-card:hover {
    border-color: var(--color-primary, #2563eb);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  }

  .trend-card.selected {
    border-color: var(--color-primary, #2563eb);
    background: white;
  }

  .trend-header {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.5rem;
  }

  .category-badge {
    padding: 0.125rem 0.5rem;
    border-radius: 4px;
    font-size: 0.75rem;
    font-weight: 500;
    color: white;
    text-transform: capitalize;
  }

  .category-badge.large {
    padding: 0.25rem 0.75rem;
    font-size: 0.875rem;
  }

  .emerging-badge {
    padding: 0.125rem 0.5rem;
    background: linear-gradient(135deg, #f59e0b, #d97706);
    border-radius: 4px;
    font-size: 0.75rem;
    font-weight: 600;
    color: white;
    animation: pulse 2s infinite;
  }

  .emerging-badge.large {
    padding: 0.25rem 0.75rem;
    font-size: 0.875rem;
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.8; }
  }

  .trend-name {
    font-size: 1rem;
    font-weight: 600;
    margin-bottom: 0.75rem;
    color: var(--color-text, #1a1a1a);
  }

  .trend-metrics {
    display: flex;
    gap: 1rem;
    margin-bottom: 0.75rem;
  }

  .metric {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .metric-value {
    font-size: 1.25rem;
    font-weight: 600;
  }

  .metric-value.score-high { color: #22c55e; }
  .metric-value.score-medium { color: #f59e0b; }
  .metric-value.score-low { color: #6b7280; }

  .metric-label {
    font-size: 0.625rem;
    color: var(--color-text-secondary, #666);
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .velocity-bar {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .velocity-label {
    font-size: 0.625rem;
    color: var(--color-text-secondary, #666);
    text-transform: uppercase;
    min-width: 50px;
  }

  .velocity-track {
    flex: 1;
    height: 4px;
    background: var(--color-border, #e5e5e5);
    border-radius: 2px;
    overflow: hidden;
  }

  .velocity-fill {
    height: 100%;
    background: linear-gradient(90deg, #3b82f6, #8b5cf6);
    transition: width 0.3s;
  }

  .trending-entities .entities-list {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .entity-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.75rem;
    background: var(--color-bg-secondary, #f7f5f0);
    border-radius: 6px;
  }

  .entity-info {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .entity-name {
    font-weight: 500;
  }

  .trend-score {
    padding: 0.125rem 0.5rem;
    border-radius: 4px;
    font-size: 0.75rem;
    font-weight: 600;
  }

  .trend-score.score-high { background: #dcfce7; color: #166534; }
  .trend-score.score-medium { background: #fef3c7; color: #92400e; }
  .trend-score.score-low { background: #f3f4f6; color: #6b7280; }

  .entity-categories {
    display: flex;
    gap: 0.25rem;
  }

  .mini-badge {
    padding: 0.125rem 0.375rem;
    border-radius: 3px;
    font-size: 0.625rem;
    font-weight: 500;
    color: white;
    text-transform: capitalize;
  }

  .more-link {
    text-align: center;
    font-size: 0.875rem;
    color: var(--color-text-secondary, #666);
    padding: 0.5rem;
  }

  /* Trend Details Modal */
  .trend-details-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    padding: 2rem;
  }

  .trend-details {
    background: white;
    border-radius: 12px;
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.2);
    max-width: 600px;
    width: 100%;
    max-height: 80vh;
    overflow-y: auto;
  }

  .details-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding: 1.5rem;
    border-bottom: 1px solid var(--color-border, #e5e5e5);
  }

  .details-title {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.75rem;
  }

  .details-title h2 {
    margin: 0;
    font-size: 1.25rem;
    font-weight: 600;
    width: 100%;
  }

  .close-btn {
    padding: 0.25rem 0.75rem;
    background: transparent;
    border: 1px solid var(--color-border, #e5e5e5);
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;
    line-height: 1;
  }

  .close-btn:hover {
    background: var(--color-bg-secondary, #f7f5f0);
  }

  .details-body {
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .score-section {
    display: flex;
    gap: 2rem;
    align-items: center;
  }

  .score-circle {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background: var(--color-bg-secondary, #f7f5f0);
    border: 4px solid;
  }

  .score-circle.score-high { border-color: #22c55e; }
  .score-circle.score-medium { border-color: #f59e0b; }
  .score-circle.score-low { border-color: #6b7280; }

  .score-number {
    font-size: 1.5rem;
    font-weight: 700;
  }

  .score-circle .score-label {
    font-size: 0.625rem;
    color: var(--color-text-secondary, #666);
    text-transform: uppercase;
  }

  .score-breakdown {
    flex: 1;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }

  .breakdown-item {
    display: flex;
    flex-direction: column;
  }

  .breakdown-label {
    font-size: 0.75rem;
    color: var(--color-text-secondary, #666);
  }

  .breakdown-value {
    font-size: 1.125rem;
    font-weight: 600;
  }

  .keywords-section h4, .entities-section h4 {
    font-size: 0.875rem;
    font-weight: 600;
    margin: 0 0 0.75rem 0;
  }

  .keywords-list {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .keyword-chip {
    padding: 0.25rem 0.75rem;
    background: var(--color-bg-secondary, #f7f5f0);
    border: 1px solid var(--color-border, #e5e5e5);
    border-radius: 999px;
    font-size: 0.875rem;
  }

  .related-entities {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    max-height: 200px;
    overflow-y: auto;
  }

  .related-entity {
    display: flex;
    flex-direction: column;
    padding: 0.75rem;
    background: var(--color-bg-secondary, #f7f5f0);
    border-radius: 6px;
    text-decoration: none;
    color: inherit;
    transition: background 0.2s;
  }

  .related-entity:hover {
    background: var(--color-border, #e5e5e5);
  }

  .related-entity .entity-name {
    font-weight: 500;
    color: var(--color-primary, #2563eb);
  }

  .related-entity .entity-url {
    font-size: 0.75rem;
    color: var(--color-text-secondary, #666);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .metadata-section {
    display: flex;
    gap: 2rem;
    padding-top: 1rem;
    border-top: 1px solid var(--color-border, #e5e5e5);
  }

  .metadata-item {
    display: flex;
    flex-direction: column;
  }

  .metadata-label {
    font-size: 0.75rem;
    color: var(--color-text-secondary, #666);
  }

  .metadata-value {
    font-size: 0.875rem;
    font-weight: 500;
  }
</style>
