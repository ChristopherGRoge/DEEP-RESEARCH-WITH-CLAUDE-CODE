<script lang="ts">
  import { onMount } from 'svelte';

  interface Props {
    projectId: string;
    onResearch?: (entityId: string) => void;
  }

  let { projectId, onResearch }: Props = $props();

  let newEntities = $state<any[]>([]);
  let readyEntities = $state<any[]>([]);
  let loadingNew = $state(true);
  let loadingReady = $state(true);
  let daysBack = $state(7);
  let limit = $state(20);

  $effect(() => {
    if (projectId) {
      loadNewEntities();
      loadReadyEntities();
    }
  });

  onMount(async () => {
    if (projectId) {
      await Promise.all([loadNewEntities(), loadReadyEntities()]);
    }
  });

  async function loadNewEntities() {
    if (!projectId) return;
    loadingNew = true;
    try {
      const params = new URLSearchParams({
        projectId,
        limit: limit.toString(),
        daysBack: daysBack.toString(),
      });
      const res = await fetch(`/api/discovery/entities/new?${params}`);
      const data = await res.json();
      if (data.success) {
        newEntities = data.data || [];
      }
    } catch (e) {
      console.error('Failed to load new entities:', e);
    } finally {
      loadingNew = false;
    }
  }

  async function loadReadyEntities() {
    if (!projectId) return;
    loadingReady = true;
    try {
      const params = new URLSearchParams({
        projectId,
        limit: limit.toString(),
      });
      const res = await fetch(`/api/discovery/entities/ready-for-research?${params}`);
      const data = await res.json();
      if (data.success) {
        readyEntities = data.data || [];
      }
    } catch (e) {
      console.error('Failed to load ready entities:', e);
    } finally {
      loadingReady = false;
    }
  }

  function handleStartResearch(entityId: string, entityName: string) {
    onResearch?.(entityId);
  }

  function formatDate(date: string): string {
    const d = new Date(date);
    const now = new Date();
    const diffMs = now.getTime() - d.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffHours < 1) return 'Just now';
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays}d ago`;
    return d.toLocaleDateString();
  }

  function getExtractionProgress(entity: any): { percent: number; label: string } {
    const extractionCount = entity.extractionCount || 0;
    const targetExtractions = 5; // pricing, features, company, compliance, integrations
    const percent = Math.min((extractionCount / targetExtractions) * 100, 100);
    return {
      percent,
      label: `${extractionCount}/${targetExtractions} extractions`,
    };
  }

  function getPriorityClass(entity: any): string {
    const extractionCount = entity.extractionCount || 0;
    if (extractionCount === 0) return 'priority-high';
    if (extractionCount < 3) return 'priority-medium';
    return 'priority-low';
  }

  function refreshData() {
    loadNewEntities();
    loadReadyEntities();
  }
</script>

<div class="entity-pipeline">
  <!-- Pipeline Header -->
  <div class="pipeline-header">
    <h2>Entity Research Pipeline</h2>
    <div class="header-actions">
      <select bind:value={daysBack} onchange={loadNewEntities}>
        <option value={1}>Last 24h</option>
        <option value={3}>Last 3 days</option>
        <option value={7}>Last 7 days</option>
        <option value={14}>Last 2 weeks</option>
        <option value={30}>Last 30 days</option>
      </select>
      <button class="btn-refresh" onclick={refreshData}>
        Refresh
      </button>
    </div>
  </div>

  <div class="pipeline-grid">
    <!-- Stage 1: Newly Discovered Entities -->
    <div class="pipeline-stage">
      <div class="stage-header">
        <div class="stage-title">
          <span class="stage-number">1</span>
          <h3>Newly Discovered</h3>
        </div>
        <span class="stage-count">{newEntities.length}</span>
      </div>
      <p class="stage-description">Entities discovered from sources, awaiting research</p>

      <div class="entity-list">
        {#if loadingNew}
          <div class="loading">Loading...</div>
        {:else if newEntities.length === 0}
          <div class="empty-state">
            <span class="empty-icon">*</span>
            <span>No new entities in the last {daysBack} days</span>
          </div>
        {:else}
          {#each newEntities as entity}
            <div class="entity-card new">
              <div class="entity-header">
                <span class="entity-name">{entity.name}</span>
                <span class="entity-type">{entity.entityType || 'unknown'}</span>
              </div>
              {#if entity.url}
                <a href={entity.url} target="_blank" rel="noopener" class="entity-url">
                  {entity.url}
                </a>
              {:else}
                <span class="no-url">No URL available</span>
              {/if}
              <div class="entity-meta">
                <span class="discovery-date">Discovered {formatDate(entity.createdAt)}</span>
                {#if entity.discoverySource}
                  <span class="discovery-source">via {entity.discoverySource}</span>
                {/if}
              </div>
              <div class="entity-actions">
                {#if entity.url}
                  <button
                    class="btn-start-research"
                    onclick={() => handleStartResearch(entity.id, entity.name)}
                  >
                    Start Research
                  </button>
                {:else}
                  <span class="needs-url">Needs URL first</span>
                {/if}
              </div>
            </div>
          {/each}
        {/if}
      </div>
    </div>

    <!-- Stage 2: Ready for Research -->
    <div class="pipeline-stage">
      <div class="stage-header">
        <div class="stage-title">
          <span class="stage-number">2</span>
          <h3>Ready for Research</h3>
        </div>
        <span class="stage-count">{readyEntities.length}</span>
      </div>
      <p class="stage-description">Entities with URLs, ready for deep research</p>

      <div class="entity-list">
        {#if loadingReady}
          <div class="loading">Loading...</div>
        {:else if readyEntities.length === 0}
          <div class="empty-state">
            <span class="empty-icon">*</span>
            <span>No entities ready for research</span>
          </div>
        {:else}
          {#each readyEntities as entity}
            {@const progress = getExtractionProgress(entity)}
            <div class="entity-card ready {getPriorityClass(entity)}">
              <div class="entity-header">
                <span class="entity-name">{entity.name}</span>
                <span class="priority-badge {getPriorityClass(entity)}">
                  {#if entity.extractionCount === 0}
                    High Priority
                  {:else if entity.extractionCount < 3}
                    Medium
                  {:else}
                    Low
                  {/if}
                </span>
              </div>
              {#if entity.url}
                <a href={entity.url} target="_blank" rel="noopener" class="entity-url">
                  {entity.url}
                </a>
              {/if}

              <!-- Research Progress -->
              <div class="research-progress">
                <div class="progress-header">
                  <span class="progress-label">Research Progress</span>
                  <span class="progress-value">{progress.label}</span>
                </div>
                <div class="progress-bar">
                  <div class="progress-fill" style="width: {progress.percent}%"></div>
                </div>
              </div>

              <!-- Extraction Status -->
              {#if entity.extractions}
                <div class="extraction-status">
                  {#each ['pricing', 'features', 'company', 'compliance', 'integrations'] as schemaType}
                    {@const hasExtraction = entity.extractions.some(e => e.schemaType === schemaType)}
                    <span class="extraction-badge {hasExtraction ? 'complete' : 'missing'}">
                      {schemaType}
                    </span>
                  {/each}
                </div>
              {/if}

              <div class="entity-actions">
                <button
                  class="btn-start-research primary"
                  onclick={() => handleStartResearch(entity.id, entity.name)}
                >
                  {#if entity.extractionCount === 0}
                    Start Research
                  {:else}
                    Continue Research
                  {/if}
                </button>
              </div>
            </div>
          {/each}
        {/if}
      </div>
    </div>
  </div>

  <!-- Summary Stats -->
  <div class="pipeline-summary">
    <div class="summary-stat">
      <span class="stat-value">{newEntities.length}</span>
      <span class="stat-label">New Discoveries</span>
    </div>
    <div class="summary-stat">
      <span class="stat-value">{readyEntities.filter(e => e.extractionCount === 0).length}</span>
      <span class="stat-label">Unresearched</span>
    </div>
    <div class="summary-stat">
      <span class="stat-value">{readyEntities.filter(e => e.extractionCount > 0 && e.extractionCount < 5).length}</span>
      <span class="stat-label">In Progress</span>
    </div>
    <div class="summary-stat">
      <span class="stat-value">{readyEntities.filter(e => e.extractionCount >= 5).length}</span>
      <span class="stat-label">Complete</span>
    </div>
  </div>
</div>

<style>
  .entity-pipeline {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .pipeline-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 1.5rem;
    background: white;
    border-radius: 8px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }

  .pipeline-header h2 {
    font-size: 1.25rem;
    font-weight: 600;
    margin: 0;
    color: #111827;
  }

  .header-actions {
    display: flex;
    gap: 0.75rem;
    align-items: center;
  }

  .header-actions select {
    padding: 0.5rem 0.75rem;
    border: 1px solid #e5e7eb;
    border-radius: 6px;
    font-size: 0.875rem;
    background: white;
    cursor: pointer;
  }

  .btn-refresh {
    padding: 0.5rem 1rem;
    background: #f3f4f6;
    border: 1px solid #e5e7eb;
    border-radius: 6px;
    font-size: 0.875rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
  }

  .btn-refresh:hover {
    background: #e5e7eb;
  }

  .pipeline-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    gap: 1.5rem;
  }

  .pipeline-stage {
    background: white;
    border-radius: 8px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
  }

  .stage-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.5rem;
  }

  .stage-title {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .stage-number {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    background: #3b82f6;
    color: white;
    border-radius: 50%;
    font-size: 0.875rem;
    font-weight: 600;
  }

  .stage-title h3 {
    font-size: 1rem;
    font-weight: 600;
    margin: 0;
    color: #111827;
  }

  .stage-count {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 28px;
    height: 28px;
    padding: 0 10px;
    background: #e5e7eb;
    border-radius: 14px;
    font-size: 0.875rem;
    font-weight: 600;
    color: #4b5563;
  }

  .stage-description {
    font-size: 0.875rem;
    color: #6b7280;
    margin: 0 0 1rem 0;
  }

  .entity-list {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    flex: 1;
    max-height: 500px;
    overflow-y: auto;
  }

  .loading {
    padding: 2rem;
    text-align: center;
    color: #6b7280;
    font-size: 0.875rem;
  }

  .empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    text-align: center;
    color: #9ca3af;
    font-size: 0.875rem;
    gap: 0.5rem;
  }

  .empty-icon {
    font-size: 1.5rem;
  }

  .entity-card {
    padding: 1rem;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    background: #fafafa;
    transition: all 0.2s;
  }

  .entity-card:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    border-color: #d1d5db;
  }

  .entity-card.priority-high {
    border-left: 3px solid #ef4444;
  }

  .entity-card.priority-medium {
    border-left: 3px solid #f59e0b;
  }

  .entity-card.priority-low {
    border-left: 3px solid #10b981;
  }

  .entity-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.5rem;
  }

  .entity-name {
    font-weight: 600;
    font-size: 0.9375rem;
    color: #111827;
  }

  .entity-type {
    padding: 0.125rem 0.5rem;
    background: #e5e7eb;
    border-radius: 4px;
    font-size: 0.75rem;
    font-weight: 500;
    color: #4b5563;
    text-transform: capitalize;
  }

  .priority-badge {
    padding: 0.125rem 0.5rem;
    border-radius: 4px;
    font-size: 0.75rem;
    font-weight: 600;
  }

  .priority-badge.priority-high {
    background: #fee2e2;
    color: #991b1b;
  }

  .priority-badge.priority-medium {
    background: #fef3c7;
    color: #92400e;
  }

  .priority-badge.priority-low {
    background: #d1fae5;
    color: #065f46;
  }

  .entity-url {
    display: block;
    font-size: 0.75rem;
    color: #3b82f6;
    text-decoration: none;
    margin-bottom: 0.5rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .entity-url:hover {
    text-decoration: underline;
  }

  .no-url {
    display: block;
    font-size: 0.75rem;
    color: #9ca3af;
    font-style: italic;
    margin-bottom: 0.5rem;
  }

  .entity-meta {
    display: flex;
    gap: 1rem;
    font-size: 0.75rem;
    color: #6b7280;
    margin-bottom: 0.75rem;
  }

  .discovery-source {
    font-style: italic;
  }

  .research-progress {
    margin-bottom: 0.75rem;
  }

  .progress-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.375rem;
  }

  .progress-label {
    font-size: 0.75rem;
    font-weight: 500;
    color: #374151;
  }

  .progress-value {
    font-size: 0.75rem;
    color: #6b7280;
  }

  .progress-bar {
    height: 6px;
    background: #e5e7eb;
    border-radius: 3px;
    overflow: hidden;
  }

  .progress-fill {
    height: 100%;
    background: linear-gradient(90deg, #3b82f6 0%, #2563eb 100%);
    border-radius: 3px;
    transition: width 0.3s ease;
  }

  .extraction-status {
    display: flex;
    flex-wrap: wrap;
    gap: 0.375rem;
    margin-bottom: 0.75rem;
  }

  .extraction-badge {
    padding: 0.125rem 0.5rem;
    border-radius: 4px;
    font-size: 0.6875rem;
    font-weight: 500;
    text-transform: capitalize;
  }

  .extraction-badge.complete {
    background: #d1fae5;
    color: #065f46;
  }

  .extraction-badge.missing {
    background: #f3f4f6;
    color: #9ca3af;
  }

  .entity-actions {
    display: flex;
    justify-content: flex-end;
    gap: 0.5rem;
  }

  .btn-start-research {
    padding: 0.5rem 1rem;
    border-radius: 6px;
    font-size: 0.8125rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
    border: 1px solid #e5e7eb;
    background: white;
    color: #374151;
  }

  .btn-start-research:hover {
    background: #f3f4f6;
  }

  .btn-start-research.primary {
    background: #3b82f6;
    border-color: #3b82f6;
    color: white;
  }

  .btn-start-research.primary:hover {
    background: #2563eb;
    border-color: #2563eb;
  }

  .needs-url {
    font-size: 0.75rem;
    color: #9ca3af;
    font-style: italic;
  }

  .pipeline-summary {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
    gap: 1rem;
    background: white;
    border-radius: 8px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    padding: 1.5rem;
  }

  .summary-stat {
    text-align: center;
    padding: 0.75rem;
    background: #f9fafb;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
  }

  .summary-stat .stat-value {
    font-size: 1.75rem;
    font-weight: 700;
    color: #111827;
    display: block;
    margin-bottom: 0.25rem;
  }

  .summary-stat .stat-label {
    font-size: 0.75rem;
    font-weight: 600;
    color: #6b7280;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
</style>
