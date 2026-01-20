<script lang="ts">
  import { onMount } from 'svelte';

  interface Props {
    projectId: string;
    pendingCount?: number;
    onProcess?: (result: any) => void;
  }

  let { projectId, pendingCount = 0, onProcess }: Props = $props();

  let discoveries = $state<any[]>([]);
  let loading = $state(true);
  let processing = $state(false);
  let processingId = $state<string | null>(null);
  let filterSourceType = $state('');
  let searchQuery = $state('');
  let batchLimit = $state(20);
  let lastProcessResult = $state<any>(null);
  let selectedDiscoveryId = $state<string | null>(null);

  const sourceTypes = [
    { value: '', label: 'All Sources' },
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
    await loadDiscoveries();
  });

  async function loadDiscoveries() {
    if (!projectId) return;
    loading = true;
    try {
      let url = `/api/discovery/pending?projectId=${projectId}&limit=50`;
      if (filterSourceType) {
        url += `&sourceType=${filterSourceType}`;
      }
      const res = await fetch(url);
      const data = await res.json();
      if (data.success) {
        discoveries = data.data || [];
      }
    } catch (e) {
      console.error('Failed to load discoveries:', e);
    } finally {
      loading = false;
    }
  }

  async function searchDiscoveries() {
    if (!projectId) return;
    loading = true;
    try {
      const res = await fetch('/api/discovery/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: searchQuery,
          sourceType: filterSourceType || undefined,
          processed: false,
        }),
      });
      const data = await res.json();
      if (data.success) {
        discoveries = data.data || [];
      }
    } catch (e) {
      console.error('Failed to search discoveries:', e);
    } finally {
      loading = false;
    }
  }

  async function processAll() {
    if (!projectId) return;
    processing = true;
    lastProcessResult = null;
    try {
      const res = await fetch('/api/discovery/process/batch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectId,
          limit: batchLimit,
        }),
      });
      const data = await res.json();
      if (data.success) {
        lastProcessResult = data.data;
        onProcess?.(data.data);
        await loadDiscoveries();
      }
    } catch (e) {
      console.error('Failed to batch process:', e);
    } finally {
      processing = false;
    }
  }

  async function processOne(rawDiscoveryId: string) {
    if (!projectId) return;
    processingId = rawDiscoveryId;
    try {
      const res = await fetch('/api/discovery/process/one', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectId,
          rawDiscoveryId,
        }),
      });
      const data = await res.json();
      if (data.success) {
        onProcess?.({ processed: 1, ...data.data });
        await loadDiscoveries();
      }
    } catch (e) {
      console.error('Failed to process discovery:', e);
    } finally {
      processingId = null;
    }
  }

  function handleFilterChange() {
    if (searchQuery) {
      searchDiscoveries();
    } else {
      loadDiscoveries();
    }
  }

  function handleSearch() {
    if (searchQuery) {
      searchDiscoveries();
    } else {
      loadDiscoveries();
    }
  }

  function toggleDetails(id: string) {
    selectedDiscoveryId = selectedDiscoveryId === id ? null : id;
  }

  function formatDate(date: string): string {
    const d = new Date(date);
    const now = new Date();
    const hours = Math.floor((now.getTime() - d.getTime()) / (1000 * 60 * 60));
    if (hours < 1) return 'Just now';
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    if (days < 7) return `${days}d ago`;
    return d.toLocaleDateString();
  }

  function truncateText(text: string, maxLength: number = 100): string {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
  }

  function getSourceTypeColor(type: string): string {
    const colors: Record<string, string> = {
      'BLOG': 'blog',
      'GITHUB': 'github',
      'REDDIT': 'reddit',
      'TWITTER': 'twitter',
      'NEWSLETTER': 'newsletter',
      'AGGREGATOR': 'aggregator',
      'ACADEMIC': 'academic',
      'DEV_COMMUNITY': 'dev-community',
    };
    return colors[type] || 'default';
  }
</script>

<div class="discoveries-panel">
  <div class="panel-header">
    <div class="header-left">
      <h2>Pending Discoveries</h2>
      <span class="count-badge">{pendingCount || discoveries.length}</span>
    </div>
    <div class="header-actions">
      <div class="batch-config">
        <label for="batchLimit">Batch size:</label>
        <input
          id="batchLimit"
          type="number"
          bind:value={batchLimit}
          min="1"
          max="100"
        />
      </div>
      <button
        class="btn-primary"
        onclick={processAll}
        disabled={processing || discoveries.length === 0}
      >
        {#if processing}
          Processing...
        {:else}
          Process All ({Math.min(batchLimit, discoveries.length)})
        {/if}
      </button>
    </div>
  </div>

  <!-- Filters & Search -->
  <div class="filters-bar">
    <div class="search-box">
      <input
        type="text"
        bind:value={searchQuery}
        placeholder="Search discoveries..."
        onkeydown={(e) => e.key === 'Enter' && handleSearch()}
      />
      <button class="btn-search" onclick={handleSearch}>Search</button>
    </div>
    <select bind:value={filterSourceType} onchange={handleFilterChange}>
      {#each sourceTypes as type}
        <option value={type.value}>{type.label}</option>
      {/each}
    </select>
    <button class="btn-secondary" onclick={loadDiscoveries}>Refresh</button>
  </div>

  <!-- Processing Results -->
  {#if lastProcessResult}
    <div class="process-results">
      <div class="results-header">
        <h4>Last Processing Results</h4>
        <button class="btn-dismiss" onclick={() => lastProcessResult = null}>Dismiss</button>
      </div>
      <div class="results-stats">
        <div class="stat">
          <span class="stat-value">{lastProcessResult.processed || 0}</span>
          <span class="stat-label">Processed</span>
        </div>
        <div class="stat">
          <span class="stat-value">{lastProcessResult.entitiesCreated || 0}</span>
          <span class="stat-label">New Entities</span>
        </div>
        <div class="stat">
          <span class="stat-value">{lastProcessResult.entitiesMatched || 0}</span>
          <span class="stat-label">Matched Existing</span>
        </div>
        <div class="stat">
          <span class="stat-value">{lastProcessResult.duplicatesSkipped || 0}</span>
          <span class="stat-label">Duplicates</span>
        </div>
        {#if lastProcessResult.errors?.length > 0}
          <div class="stat error">
            <span class="stat-value">{lastProcessResult.errors.length}</span>
            <span class="stat-label">Errors</span>
          </div>
        {/if}
      </div>
      {#if lastProcessResult.errors?.length > 0}
        <div class="results-errors">
          <h5>Errors:</h5>
          <ul>
            {#each lastProcessResult.errors.slice(0, 5) as error}
              <li>{error}</li>
            {/each}
            {#if lastProcessResult.errors.length > 5}
              <li class="more">+{lastProcessResult.errors.length - 5} more errors</li>
            {/if}
          </ul>
        </div>
      {/if}
    </div>
  {/if}

  <!-- Discoveries List -->
  <div class="discoveries-list">
    {#if loading}
      <div class="loading">Loading discoveries...</div>
    {:else if discoveries.length === 0}
      <div class="empty">
        <p>No pending discoveries found</p>
        <p class="hint">Run a crawl to find new entities</p>
      </div>
    {:else}
      {#each discoveries as discovery}
        <div class="discovery-card" class:expanded={selectedDiscoveryId === discovery.id}>
          <div class="discovery-main" onclick={() => toggleDetails(discovery.id)}>
            <div class="discovery-info">
              <div class="discovery-header">
                <span class="mentioned-name">{discovery.mentionedName}</span>
                <span class="source-badge {getSourceTypeColor(discovery.sourceType)}">
                  {discovery.sourceType}
                </span>
              </div>
              <div class="discovery-meta">
                <span class="source-name">{discovery.sourceName || 'Unknown source'}</span>
                <span class="separator">|</span>
                <span class="discovered-at">{formatDate(discovery.discoveredAt)}</span>
              </div>
              {#if discovery.context}
                <div class="discovery-context">
                  {truncateText(discovery.context, 150)}
                </div>
              {/if}
            </div>
            <div class="discovery-actions">
              <button
                class="btn-process"
                onclick={(e) => { e.stopPropagation(); processOne(discovery.id); }}
                disabled={processingId === discovery.id}
              >
                {#if processingId === discovery.id}
                  Processing...
                {:else}
                  Process
                {/if}
              </button>
              <button
                class="btn-expand"
                onclick={(e) => { e.stopPropagation(); toggleDetails(discovery.id); }}
              >
                {selectedDiscoveryId === discovery.id ? 'Less' : 'More'}
              </button>
            </div>
          </div>

          {#if selectedDiscoveryId === discovery.id}
            <div class="discovery-details">
              <div class="detail-section">
                <h5>Source Details</h5>
                <div class="detail-row">
                  <span class="detail-label">Source URL:</span>
                  <a href={discovery.sourceUrl} target="_blank" rel="noopener" class="detail-value link">
                    {truncateText(discovery.sourceUrl, 60)}
                  </a>
                </div>
                {#if discovery.mentionedUrl}
                  <div class="detail-row">
                    <span class="detail-label">Mentioned URL:</span>
                    <a href={discovery.mentionedUrl} target="_blank" rel="noopener" class="detail-value link">
                      {truncateText(discovery.mentionedUrl, 60)}
                    </a>
                  </div>
                {/if}
              </div>

              {#if discovery.context}
                <div class="detail-section">
                  <h5>Full Context</h5>
                  <div class="context-full">{discovery.context}</div>
                </div>
              {/if}

              {#if discovery.metadata}
                <div class="detail-section">
                  <h5>Metadata</h5>
                  <pre class="metadata-json">{JSON.stringify(discovery.metadata, null, 2)}</pre>
                </div>
              {/if}

              <div class="detail-section">
                <h5>Discovery Info</h5>
                <div class="detail-row">
                  <span class="detail-label">Confidence:</span>
                  <span class="detail-value">{discovery.confidence ? `${(discovery.confidence * 100).toFixed(0)}%` : 'N/A'}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Discovered:</span>
                  <span class="detail-value">{new Date(discovery.discoveredAt).toLocaleString()}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">ID:</span>
                  <span class="detail-value mono">{discovery.id}</span>
                </div>
              </div>
            </div>
          {/if}
        </div>
      {/each}
    {/if}
  </div>
</div>

<style>
  .discoveries-panel {
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

  .header-left {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .panel-header h2 {
    font-size: 1.125rem;
    font-weight: 600;
    margin: 0;
  }

  .count-badge {
    padding: 0.125rem 0.5rem;
    background: var(--color-primary, #2563eb);
    color: white;
    border-radius: 999px;
    font-size: 0.75rem;
    font-weight: 600;
  }

  .header-actions {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .batch-config {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .batch-config label {
    font-size: 0.875rem;
    color: var(--color-text-secondary, #666);
  }

  .batch-config input {
    width: 60px;
    padding: 0.375rem 0.5rem;
    border: 1px solid var(--color-border, #e5e5e5);
    border-radius: 4px;
    font-size: 0.875rem;
  }

  .filters-bar {
    display: flex;
    gap: 0.75rem;
    padding: 1rem 1.5rem;
    border-bottom: 1px solid var(--color-border, #e5e5e5);
    background: var(--color-bg-secondary, #f7f5f0);
  }

  .search-box {
    display: flex;
    flex: 1;
    gap: 0.5rem;
  }

  .search-box input {
    flex: 1;
    padding: 0.5rem 0.75rem;
    border: 1px solid var(--color-border, #e5e5e5);
    border-radius: 4px;
    font-size: 0.875rem;
  }

  .filters-bar select {
    padding: 0.5rem 0.75rem;
    border: 1px solid var(--color-border, #e5e5e5);
    border-radius: 4px;
    font-size: 0.875rem;
    background: white;
  }

  .btn-primary, .btn-secondary, .btn-search {
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

  .btn-primary:hover:not(:disabled) {
    background: #1d4ed8;
  }

  .btn-primary:disabled {
    background: #93c5fd;
    cursor: not-allowed;
  }

  .btn-secondary {
    background: white;
    color: var(--color-text, #1a1a1a);
    border: 1px solid var(--color-border, #e5e5e5);
  }

  .btn-secondary:hover {
    background: var(--color-bg, #fdfbf7);
  }

  .btn-search {
    background: white;
    border: 1px solid var(--color-border, #e5e5e5);
    color: var(--color-text, #1a1a1a);
  }

  .btn-search:hover {
    background: var(--color-bg, #fdfbf7);
  }

  .process-results {
    margin: 1rem 1.5rem;
    padding: 1rem;
    background: #dcfce7;
    border: 1px solid #22c55e;
    border-radius: 6px;
  }

  .results-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.75rem;
  }

  .results-header h4 {
    margin: 0;
    font-size: 0.875rem;
    font-weight: 600;
    color: #166534;
  }

  .btn-dismiss {
    padding: 0.25rem 0.5rem;
    font-size: 0.75rem;
    background: transparent;
    border: 1px solid #22c55e;
    border-radius: 4px;
    color: #166534;
    cursor: pointer;
  }

  .results-stats {
    display: flex;
    gap: 1.5rem;
    flex-wrap: wrap;
  }

  .stat {
    text-align: center;
  }

  .stat-value {
    display: block;
    font-size: 1.5rem;
    font-weight: 600;
    color: #166534;
  }

  .stat-label {
    font-size: 0.75rem;
    color: #15803d;
  }

  .stat.error .stat-value {
    color: #991b1b;
  }

  .stat.error .stat-label {
    color: #991b1b;
  }

  .results-errors {
    margin-top: 1rem;
    padding-top: 1rem;
    border-top: 1px solid #22c55e;
  }

  .results-errors h5 {
    margin: 0 0 0.5rem 0;
    font-size: 0.75rem;
    color: #991b1b;
  }

  .results-errors ul {
    margin: 0;
    padding-left: 1.25rem;
    font-size: 0.75rem;
    color: #991b1b;
  }

  .results-errors .more {
    color: #666;
    font-style: italic;
  }

  .discoveries-list {
    max-height: 600px;
    overflow-y: auto;
  }

  .loading, .empty {
    text-align: center;
    padding: 3rem;
    color: var(--color-text-secondary, #666);
  }

  .empty p {
    margin: 0.25rem 0;
  }

  .empty .hint {
    font-size: 0.875rem;
    color: #9ca3af;
  }

  .discovery-card {
    border-bottom: 1px solid var(--color-border, #e5e5e5);
    transition: background 0.2s;
  }

  .discovery-card:hover {
    background: var(--color-bg, #fdfbf7);
  }

  .discovery-card.expanded {
    background: var(--color-bg-secondary, #f7f5f0);
  }

  .discovery-main {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding: 1rem 1.5rem;
    cursor: pointer;
  }

  .discovery-info {
    flex: 1;
    min-width: 0;
  }

  .discovery-header {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 0.25rem;
  }

  .mentioned-name {
    font-weight: 600;
    font-size: 1rem;
    color: var(--color-text, #1a1a1a);
  }

  .source-badge {
    padding: 0.125rem 0.5rem;
    border-radius: 4px;
    font-size: 0.625rem;
    font-weight: 600;
    text-transform: uppercase;
  }

  .source-badge.blog { background: #dbeafe; color: #1e40af; }
  .source-badge.github { background: #f3f4f6; color: #1f2937; }
  .source-badge.reddit { background: #fef3c7; color: #92400e; }
  .source-badge.twitter { background: #cffafe; color: #0891b2; }
  .source-badge.newsletter { background: #fae8ff; color: #86198f; }
  .source-badge.aggregator { background: #dcfce7; color: #166534; }
  .source-badge.academic { background: #e0e7ff; color: #3730a3; }
  .source-badge.dev-community { background: #fee2e2; color: #991b1b; }
  .source-badge.default { background: #f3f4f6; color: #6b7280; }

  .discovery-meta {
    font-size: 0.75rem;
    color: var(--color-text-secondary, #666);
    margin-bottom: 0.5rem;
  }

  .separator {
    margin: 0 0.5rem;
    color: #d1d5db;
  }

  .discovery-context {
    font-size: 0.875rem;
    color: var(--color-text-secondary, #666);
    line-height: 1.4;
  }

  .discovery-actions {
    display: flex;
    gap: 0.5rem;
    flex-shrink: 0;
    margin-left: 1rem;
  }

  .btn-process {
    padding: 0.375rem 0.75rem;
    font-size: 0.75rem;
    font-weight: 500;
    background: var(--color-primary, #2563eb);
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background 0.2s;
  }

  .btn-process:hover:not(:disabled) {
    background: #1d4ed8;
  }

  .btn-process:disabled {
    background: #93c5fd;
    cursor: not-allowed;
  }

  .btn-expand {
    padding: 0.375rem 0.75rem;
    font-size: 0.75rem;
    background: white;
    border: 1px solid var(--color-border, #e5e5e5);
    border-radius: 4px;
    cursor: pointer;
  }

  .btn-expand:hover {
    background: var(--color-bg, #fdfbf7);
  }

  .discovery-details {
    padding: 0 1.5rem 1.5rem 1.5rem;
    background: var(--color-bg-secondary, #f7f5f0);
    border-top: 1px solid var(--color-border, #e5e5e5);
  }

  .detail-section {
    margin-top: 1rem;
  }

  .detail-section h5 {
    margin: 0 0 0.5rem 0;
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    color: var(--color-text-secondary, #666);
  }

  .detail-row {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 0.25rem;
    font-size: 0.875rem;
  }

  .detail-label {
    font-weight: 500;
    color: var(--color-text-secondary, #666);
    min-width: 120px;
  }

  .detail-value {
    color: var(--color-text, #1a1a1a);
    word-break: break-word;
  }

  .detail-value.link {
    color: var(--color-primary, #2563eb);
    text-decoration: none;
  }

  .detail-value.link:hover {
    text-decoration: underline;
  }

  .detail-value.mono {
    font-family: monospace;
    font-size: 0.8rem;
  }

  .context-full {
    padding: 0.75rem;
    background: white;
    border-radius: 4px;
    font-size: 0.875rem;
    line-height: 1.5;
    white-space: pre-wrap;
  }

  .metadata-json {
    margin: 0;
    padding: 0.75rem;
    background: white;
    border-radius: 4px;
    font-size: 0.75rem;
    overflow-x: auto;
  }
</style>
