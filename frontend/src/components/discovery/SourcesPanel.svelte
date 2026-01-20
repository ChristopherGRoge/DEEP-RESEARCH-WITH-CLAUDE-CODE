<script lang="ts">
  import { onMount } from 'svelte';

  interface Props {
    sourceStats: any;
    onStartCrawl?: (config: any) => void;
  }

  let { sourceStats, onStartCrawl }: Props = $props();

  let sources = $state<any[]>([]);
  let loading = $state(true);
  let filterType = $state('');
  let filterCategory = $state('');

  const sourceTypes = ['BLOG', 'GITHUB', 'REDDIT', 'TWITTER', 'NEWSLETTER', 'AGGREGATOR', 'ACADEMIC', 'DEV_COMMUNITY'];
  const categories = ['blogs', 'github', 'reddit', 'twitter', 'newsletters', 'aggregators', 'academic', 'dev_communities'];

  onMount(async () => {
    await loadSources();
  });

  async function loadSources() {
    loading = true;
    try {
      let url = '/api/discovery/sources';
      const params = new URLSearchParams();
      if (filterType) params.set('sourceType', filterType);
      if (filterCategory) params.set('category', filterCategory);
      if (params.toString()) url += '?' + params.toString();

      const res = await fetch(url);
      const data = await res.json();
      if (data.success) {
        sources = data.data || [];
      }
    } catch (e) {
      console.error('Failed to load sources:', e);
    } finally {
      loading = false;
    }
  }

  function getStatusColor(source: any): string {
    if (!source.lastCrawledAt) return 'never';
    if (source.consecutiveErrors > 0) return 'error';
    const hoursSince = (Date.now() - new Date(source.lastCrawledAt).getTime()) / (1000 * 60 * 60);
    if (source.crawlFrequency === 'hourly' && hoursSince > 2) return 'stale';
    if (source.crawlFrequency === 'daily' && hoursSince > 48) return 'stale';
    return 'ok';
  }

  function formatLastCrawl(date: string | null): string {
    if (!date) return 'Never';
    const d = new Date(date);
    const now = new Date();
    const hours = Math.floor((now.getTime() - d.getTime()) / (1000 * 60 * 60));
    if (hours < 1) return 'Just now';
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  }

  async function toggleSource(source: any) {
    try {
      await fetch(`/api/discovery/sources/${source.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: !source.isActive }),
      });
      await loadSources();
    } catch (e) {
      console.error('Failed to toggle source:', e);
    }
  }

  function startCrawlForType(type: string) {
    onStartCrawl?.({ sourceTypes: [type] });
  }

  function startCrawlForCategory(category: string) {
    const sourceIds = sources.filter(s => s.category === category).map(s => s.id);
    onStartCrawl?.({ sourceIds });
  }
</script>

<div class="sources-panel">
  <div class="panel-header">
    <h2>Source Registry</h2>
    <div class="filters">
      <select bind:value={filterType} onchange={loadSources}>
        <option value="">All Types</option>
        {#each sourceTypes as type}
          <option value={type}>{type}</option>
        {/each}
      </select>
      <select bind:value={filterCategory} onchange={loadSources}>
        <option value="">All Categories</option>
        {#each categories as cat}
          <option value={cat}>{cat}</option>
        {/each}
      </select>
    </div>
  </div>

  <!-- Category Summary -->
  {#if sourceStats?.byCategory}
    <div class="category-grid">
      {#each Object.entries(sourceStats.byCategory) as [category, stats]}
        <div class="category-card">
          <div class="category-header">
            <span class="category-name">{category}</span>
            <button class="btn-small" onclick={() => startCrawlForCategory(category)}>
              Crawl
            </button>
          </div>
          <div class="category-stats">
            <span class="stat-count">{stats.count}</span>
            <span class="stat-label">sources</span>
          </div>
          <div class="category-discoveries">
            {stats.discoveries} discoveries
          </div>
        </div>
      {/each}
    </div>
  {/if}

  <!-- Sources Table -->
  <div class="sources-table">
    {#if loading}
      <div class="loading">Loading sources...</div>
    {:else}
      <table>
        <thead>
          <tr>
            <th>Status</th>
            <th>Name</th>
            <th>Type</th>
            <th>Strategy</th>
            <th>Last Crawl</th>
            <th>Discoveries</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {#each sources as source}
            <tr class:inactive={!source.isActive}>
              <td>
                <span class="status-dot {getStatusColor(source)}"></span>
              </td>
              <td>
                <div class="source-name">
                  <a href={source.url} target="_blank" rel="noopener">{source.name}</a>
                </div>
                {#if source.description}
                  <div class="source-desc">{source.description}</div>
                {/if}
              </td>
              <td><span class="type-badge">{source.sourceType}</span></td>
              <td>{source.crawlStrategy}</td>
              <td>
                <span class="last-crawl">{formatLastCrawl(source.lastCrawledAt)}</span>
                {#if source.lastError}
                  <div class="error-hint" title={source.lastError}>Error</div>
                {/if}
              </td>
              <td>{source.discoveriesCount}</td>
              <td>
                <button
                  class="btn-toggle {source.isActive ? 'active' : 'inactive'}"
                  onclick={() => toggleSource(source)}
                >
                  {source.isActive ? 'Active' : 'Inactive'}
                </button>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    {/if}
  </div>
</div>

<style>
  .sources-panel {
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

  .filters {
    display: flex;
    gap: 0.5rem;
  }

  .filters select {
    padding: 0.375rem 0.75rem;
    border: 1px solid var(--color-border, #e5e5e5);
    border-radius: 4px;
    font-size: 0.875rem;
  }

  .category-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 1rem;
    padding: 1.5rem;
    border-bottom: 1px solid var(--color-border, #e5e5e5);
  }

  .category-card {
    padding: 1rem;
    background: var(--color-bg-secondary, #f7f5f0);
    border-radius: 6px;
  }

  .category-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.5rem;
  }

  .category-name {
    font-weight: 600;
    text-transform: capitalize;
  }

  .btn-small {
    padding: 0.25rem 0.5rem;
    font-size: 0.75rem;
    background: white;
    border: 1px solid var(--color-border, #e5e5e5);
    border-radius: 4px;
    cursor: pointer;
  }

  .btn-small:hover {
    background: var(--color-bg, #fdfbf7);
  }

  .category-stats {
    display: flex;
    align-items: baseline;
    gap: 0.25rem;
  }

  .stat-count {
    font-size: 1.5rem;
    font-weight: 600;
  }

  .stat-label {
    font-size: 0.75rem;
    color: var(--color-text-secondary, #666);
  }

  .category-discoveries {
    font-size: 0.75rem;
    color: var(--color-text-secondary, #666);
    margin-top: 0.25rem;
  }

  .sources-table {
    overflow-x: auto;
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
    background: var(--color-bg-secondary, #f7f5f0);
  }

  tr.inactive {
    opacity: 0.5;
  }

  .status-dot {
    display: inline-block;
    width: 10px;
    height: 10px;
    border-radius: 50%;
  }

  .status-dot.ok { background: #22c55e; }
  .status-dot.stale { background: #f59e0b; }
  .status-dot.error { background: #ef4444; }
  .status-dot.never { background: #9ca3af; }

  .source-name a {
    color: var(--color-text, #1a1a1a);
    text-decoration: none;
    font-weight: 500;
  }

  .source-name a:hover {
    text-decoration: underline;
  }

  .source-desc {
    font-size: 0.75rem;
    color: var(--color-text-secondary, #666);
    max-width: 300px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .type-badge {
    padding: 0.125rem 0.5rem;
    background: var(--color-bg-secondary, #f7f5f0);
    border-radius: 4px;
    font-size: 0.75rem;
    font-weight: 500;
  }

  .last-crawl {
    font-size: 0.875rem;
  }

  .error-hint {
    font-size: 0.75rem;
    color: #ef4444;
  }

  .btn-toggle {
    padding: 0.25rem 0.5rem;
    font-size: 0.75rem;
    border-radius: 4px;
    border: 1px solid;
    cursor: pointer;
  }

  .btn-toggle.active {
    background: #dcfce7;
    border-color: #22c55e;
    color: #166534;
  }

  .btn-toggle.inactive {
    background: #f3f4f6;
    border-color: #d1d5db;
    color: #6b7280;
  }

  .loading {
    padding: 2rem;
    text-align: center;
    color: var(--color-text-secondary, #666);
  }
</style>
