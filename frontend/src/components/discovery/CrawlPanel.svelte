<script lang="ts">
  import { onMount } from 'svelte';

  interface Props {
    activeCrawl: any;
    projectId: string;
    onStartCrawl?: (config: any) => void;
  }

  let { activeCrawl, projectId, onStartCrawl }: Props = $props();

  let crawlHistory = $state<any[]>([]);
  let sourcesDue = $state<any[]>([]);
  let loading = $state(true);
  let crawlConfig = $state({
    sourceTypes: [] as string[],
    maxSources: 10,
    concurrency: 3,
    researchFocus: '',
  });

  const sourceTypes = [
    { value: 'BLOG', label: 'Blogs' },
    { value: 'GITHUB', label: 'GitHub' },
    { value: 'REDDIT', label: 'Reddit' },
    { value: 'TWITTER', label: 'Twitter/X' },
    { value: 'NEWSLETTER', label: 'Newsletters' },
    { value: 'AGGREGATOR', label: 'Aggregators' },
    { value: 'ACADEMIC', label: 'Academic' },
    { value: 'DEV_COMMUNITY', label: 'Dev Communities' },
  ];

  onMount(async () => {
    await Promise.all([loadHistory(), loadSourcesDue()]);
    loading = false;
  });

  async function loadHistory() {
    if (!projectId) return;
    try {
      const res = await fetch(`/api/discovery/crawl/history?projectId=${projectId}&limit=10`);
      const data = await res.json();
      if (data.success) {
        crawlHistory = data.data || [];
      }
    } catch (e) {
      console.error('Failed to load crawl history:', e);
    }
  }

  async function loadSourcesDue() {
    try {
      const res = await fetch('/api/discovery/sources/due');
      const data = await res.json();
      if (data.success) {
        sourcesDue = data.data || [];
      }
    } catch (e) {
      console.error('Failed to load sources due:', e);
    }
  }

  function startCrawl() {
    onStartCrawl?.({
      sourceTypes: crawlConfig.sourceTypes.length > 0 ? crawlConfig.sourceTypes : undefined,
      maxSources: crawlConfig.maxSources,
      concurrency: crawlConfig.concurrency,
      researchFocus: crawlConfig.researchFocus || undefined,
    });
  }

  function startScheduledCrawl() {
    onStartCrawl?.({
      sourceIds: sourcesDue.map(s => s.id),
    });
  }

  async function pauseCrawl() {
    if (!activeCrawl?.crawlId) return;
    await fetch(`/api/discovery/crawl/${activeCrawl.crawlId}/pause`, { method: 'POST' });
  }

  async function resumeCrawl() {
    if (!activeCrawl?.crawlId) return;
    await fetch(`/api/discovery/crawl/${activeCrawl.crawlId}/resume`, { method: 'POST' });
  }

  async function cancelCrawl() {
    if (!activeCrawl?.crawlId) return;
    await fetch(`/api/discovery/crawl/${activeCrawl.crawlId}/cancel`, { method: 'POST' });
  }

  function formatDuration(seconds: number): string {
    if (seconds < 60) return `${seconds}s`;
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  }

  function formatDate(date: string): string {
    return new Date(date).toLocaleString();
  }

  function toggleSourceType(type: string) {
    if (crawlConfig.sourceTypes.includes(type)) {
      crawlConfig.sourceTypes = crawlConfig.sourceTypes.filter(t => t !== type);
    } else {
      crawlConfig.sourceTypes = [...crawlConfig.sourceTypes, type];
    }
  }
</script>

<div class="crawl-panel">
  <!-- Active Crawl -->
  {#if activeCrawl}
    <div class="active-crawl">
      <div class="crawl-header">
        <h3>Active Crawl</h3>
        <div class="crawl-actions">
          {#if activeCrawl.status === 'IN_PROGRESS'}
            <button class="btn-secondary" onclick={pauseCrawl}>Pause</button>
          {:else if activeCrawl.status === 'PAUSED'}
            <button class="btn-primary" onclick={resumeCrawl}>Resume</button>
          {/if}
          <button class="btn-danger" onclick={cancelCrawl}>Cancel</button>
        </div>
      </div>

      <div class="crawl-progress">
        <div class="progress-bar">
          <div
            class="progress-fill"
            style="width: {(activeCrawl.sourcesComplete / activeCrawl.sourcesTotal) * 100}%"
          ></div>
        </div>
        <div class="progress-stats">
          <span>{activeCrawl.sourcesComplete} / {activeCrawl.sourcesTotal} sources</span>
          <span>{activeCrawl.discoveriesFound} discoveries</span>
          {#if activeCrawl.currentSource}
            <span class="current-source">Currently: {activeCrawl.currentSource}</span>
          {/if}
        </div>
      </div>

      {#if activeCrawl.errors?.length > 0}
        <div class="crawl-errors">
          <h4>Errors ({activeCrawl.errors.length})</h4>
          <ul>
            {#each activeCrawl.errors.slice(-5) as error}
              <li>{error}</li>
            {/each}
          </ul>
        </div>
      {/if}
    </div>
  {:else}
    <!-- Start New Crawl -->
    <div class="start-crawl">
      <h3>Start New Crawl</h3>

      <!-- Quick Actions -->
      <div class="quick-actions">
        <button class="btn-primary" onclick={startCrawl}>
          Start Full Crawl
        </button>
        {#if sourcesDue.length > 0}
          <button class="btn-secondary" onclick={startScheduledCrawl}>
            Crawl {sourcesDue.length} Due Sources
          </button>
        {/if}
      </div>

      <!-- Advanced Config -->
      <details class="advanced-config">
        <summary>Advanced Options</summary>
        <div class="config-form">
          <div class="form-group">
            <label>Source Types</label>
            <div class="source-type-chips">
              {#each sourceTypes as type}
                <button
                  class="chip"
                  class:selected={crawlConfig.sourceTypes.includes(type.value)}
                  onclick={() => toggleSourceType(type.value)}
                >
                  {type.label}
                </button>
              {/each}
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="maxSources">Max Sources</label>
              <input
                id="maxSources"
                type="number"
                bind:value={crawlConfig.maxSources}
                min="1"
                max="100"
              />
            </div>
            <div class="form-group">
              <label for="concurrency">Concurrency</label>
              <input
                id="concurrency"
                type="number"
                bind:value={crawlConfig.concurrency}
                min="1"
                max="10"
              />
            </div>
          </div>

          <div class="form-group">
            <label for="researchFocus">Research Focus (optional)</label>
            <input
              id="researchFocus"
              type="text"
              bind:value={crawlConfig.researchFocus}
              placeholder="e.g., AI coding assistants, FedRAMP tools"
            />
          </div>

          <button class="btn-primary" onclick={startCrawl}>
            Start Custom Crawl
          </button>
        </div>
      </details>
    </div>
  {/if}

  <!-- Sources Due -->
  {#if sourcesDue.length > 0}
    <div class="sources-due">
      <h3>Sources Due for Crawl ({sourcesDue.length})</h3>
      <div class="due-list">
        {#each sourcesDue.slice(0, 10) as source}
          <div class="due-item">
            <span class="source-name">{source.name}</span>
            <span class="source-type">{source.sourceType}</span>
            <span class="source-freq">{source.crawlFrequency}</span>
          </div>
        {/each}
        {#if sourcesDue.length > 10}
          <div class="more">+{sourcesDue.length - 10} more</div>
        {/if}
      </div>
    </div>
  {/if}

  <!-- Crawl History -->
  <div class="crawl-history">
    <h3>Recent Crawls</h3>
    {#if loading}
      <div class="loading">Loading...</div>
    {:else if crawlHistory.length === 0}
      <div class="empty">No crawl history yet</div>
    {:else}
      <table>
        <thead>
          <tr>
            <th>Started</th>
            <th>Status</th>
            <th>Sources</th>
            <th>Discoveries</th>
            <th>Duration</th>
          </tr>
        </thead>
        <tbody>
          {#each crawlHistory as crawl}
            <tr>
              <td>{formatDate(crawl.startedAt)}</td>
              <td>
                <span class="status-badge {crawl.status.toLowerCase()}">
                  {crawl.status}
                </span>
              </td>
              <td>{crawl.sourcesComplete}/{crawl.sourcesTotal}</td>
              <td>{crawl.discoveriesFound}</td>
              <td>{crawl.duration ? formatDuration(crawl.duration) : '-'}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    {/if}
  </div>
</div>

<style>
  .crawl-panel {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .active-crawl, .start-crawl, .sources-due, .crawl-history {
    background: white;
    border-radius: 8px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    padding: 1.5rem;
  }

  h3 {
    font-size: 1rem;
    font-weight: 600;
    margin: 0 0 1rem 0;
  }

  .crawl-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
  }

  .crawl-actions {
    display: flex;
    gap: 0.5rem;
  }

  .btn-primary, .btn-secondary, .btn-danger {
    padding: 0.5rem 1rem;
    border-radius: 6px;
    font-size: 0.875rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
    border: none;
  }

  .btn-primary {
    background: var(--color-primary, #2563eb);
    color: white;
  }

  .btn-secondary {
    background: white;
    color: var(--color-text, #1a1a1a);
    border: 1px solid var(--color-border, #e5e5e5);
  }

  .btn-danger {
    background: #fee2e2;
    color: #991b1b;
    border: 1px solid #fca5a5;
  }

  .progress-bar {
    height: 8px;
    background: var(--color-bg-secondary, #f7f5f0);
    border-radius: 4px;
    overflow: hidden;
  }

  .progress-fill {
    height: 100%;
    background: var(--color-primary, #2563eb);
    transition: width 0.3s;
  }

  .progress-stats {
    display: flex;
    gap: 1.5rem;
    margin-top: 0.5rem;
    font-size: 0.875rem;
    color: var(--color-text-secondary, #666);
  }

  .current-source {
    font-style: italic;
  }

  .crawl-errors {
    margin-top: 1rem;
    padding: 1rem;
    background: #fee2e2;
    border-radius: 6px;
  }

  .crawl-errors h4 {
    font-size: 0.875rem;
    color: #991b1b;
    margin: 0 0 0.5rem 0;
  }

  .crawl-errors ul {
    margin: 0;
    padding-left: 1.5rem;
    font-size: 0.75rem;
    color: #991b1b;
  }

  .quick-actions {
    display: flex;
    gap: 0.75rem;
    margin-bottom: 1rem;
  }

  .advanced-config {
    border-top: 1px solid var(--color-border, #e5e5e5);
    padding-top: 1rem;
  }

  .advanced-config summary {
    cursor: pointer;
    font-weight: 500;
    color: var(--color-text-secondary, #666);
  }

  .config-form {
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
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

  .form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }

  input[type="number"], input[type="text"] {
    padding: 0.5rem;
    border: 1px solid var(--color-border, #e5e5e5);
    border-radius: 4px;
    font-size: 0.875rem;
  }

  .source-type-chips {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .chip {
    padding: 0.25rem 0.75rem;
    border: 1px solid var(--color-border, #e5e5e5);
    border-radius: 999px;
    background: white;
    font-size: 0.75rem;
    cursor: pointer;
    transition: all 0.2s;
  }

  .chip:hover {
    border-color: var(--color-primary, #2563eb);
  }

  .chip.selected {
    background: var(--color-primary, #2563eb);
    border-color: var(--color-primary, #2563eb);
    color: white;
  }

  .due-list {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .due-item {
    display: flex;
    justify-content: space-between;
    padding: 0.5rem;
    background: var(--color-bg-secondary, #f7f5f0);
    border-radius: 4px;
    font-size: 0.875rem;
  }

  .source-name {
    font-weight: 500;
  }

  .source-type, .source-freq {
    color: var(--color-text-secondary, #666);
    font-size: 0.75rem;
  }

  .more {
    text-align: center;
    font-size: 0.875rem;
    color: var(--color-text-secondary, #666);
    padding: 0.5rem;
  }

  table {
    width: 100%;
    border-collapse: collapse;
  }

  th, td {
    padding: 0.75rem 1rem;
    text-align: left;
    border-bottom: 1px solid var(--color-border, #e5e5e5);
  }

  th {
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    color: var(--color-text-secondary, #666);
  }

  .status-badge {
    padding: 0.125rem 0.5rem;
    border-radius: 4px;
    font-size: 0.75rem;
    font-weight: 500;
  }

  .status-badge.completed { background: #dcfce7; color: #166534; }
  .status-badge.failed { background: #fee2e2; color: #991b1b; }
  .status-badge.in_progress { background: #dbeafe; color: #1e40af; }
  .status-badge.cancelled { background: #f3f4f6; color: #6b7280; }

  .loading, .empty {
    text-align: center;
    padding: 2rem;
    color: var(--color-text-secondary, #666);
  }
</style>
