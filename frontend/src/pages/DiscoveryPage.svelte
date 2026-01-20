<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import SourcesPanel from '../components/discovery/SourcesPanel.svelte';
  import CrawlPanel from '../components/discovery/CrawlPanel.svelte';
  import DiscoveriesPanel from '../components/discovery/DiscoveriesPanel.svelte';
  import TrendsPanel from '../components/discovery/TrendsPanel.svelte';
  import EntityPipeline from '../components/discovery/EntityPipeline.svelte';
  import CriticalityPanel from '../components/discovery/CriticalityPanel.svelte';

  // State
  let projects = $state<any[]>([]);
  let selectedProjectId = $state('');
  let sourceStats = $state<any>(null);
  let discoveryStats = $state<any>(null);
  let activeCrawl = $state<any>(null);
  let loading = $state(true);
  let error = $state('');
  let activeTab = $state<'sources' | 'crawl' | 'discoveries' | 'trends' | 'pipeline' | 'criticality'>('sources');

  // Create Project Modal
  let showCreateProject = $state(false);
  let newProjectName = $state('');
  let newProjectDescription = $state('');
  let creatingProject = $state(false);

  // Polling interval for updates
  let pollInterval: number;

  onMount(async () => {
    await loadProjects();
    await loadStats();

    // Poll for updates every 5 seconds
    pollInterval = setInterval(async () => {
      if (activeCrawl) {
        await refreshCrawlStatus();
      }
      await loadStats();
    }, 5000);
  });

  onDestroy(() => {
    if (pollInterval) {
      clearInterval(pollInterval);
    }
  });

  async function loadProjects() {
    try {
      const res = await fetch('/api/projects');
      const data = await res.json();
      if (data.success) {
        projects = data.data || [];
        // Auto-select first project or look for Discovery project
        const discoveryProject = projects.find(p => p.workflow === 'DISCOVERY');
        if (discoveryProject) {
          selectedProjectId = discoveryProject.id;
        } else if (projects.length > 0) {
          selectedProjectId = projects[0].id;
        }
      }
    } catch (e) {
      console.error('Failed to load projects:', e);
    }
  }

  async function loadStats() {
    loading = true;
    try {
      // Load source stats
      const sourceRes = await fetch('/api/discovery/sources/stats');
      const sourceData = await sourceRes.json();
      if (sourceData.success) {
        sourceStats = sourceData.data;
      }

      // Load discovery stats if project selected
      if (selectedProjectId) {
        const discRes = await fetch(`/api/discovery/stats?projectId=${selectedProjectId}`);
        const discData = await discRes.json();
        if (discData.success) {
          discoveryStats = discData.data;
        }
      }
    } catch (e) {
      console.error('Failed to load stats:', e);
    } finally {
      loading = false;
    }
  }

  async function refreshCrawlStatus() {
    if (!activeCrawl?.crawlId) return;
    try {
      const res = await fetch(`/api/discovery/crawl/${activeCrawl.crawlId}/status`);
      const data = await res.json();
      if (data.success) {
        activeCrawl = { ...activeCrawl, ...data.data };
        if (activeCrawl.status === 'COMPLETED' || activeCrawl.status === 'FAILED' || activeCrawl.status === 'CANCELLED') {
          activeCrawl = null;
          await loadStats();
        }
      }
    } catch (e) {
      console.error('Failed to refresh crawl status:', e);
    }
  }

  async function seedSources() {
    try {
      const res = await fetch('/api/discovery/sources/seed', { method: 'POST' });
      const data = await res.json();
      if (data.success) {
        await loadStats();
      } else {
        error = data.error;
      }
    } catch (e) {
      error = String(e);
    }
  }

  async function startCrawl(config: any) {
    try {
      const res = await fetch('/api/discovery/crawl/start', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...config, projectId: selectedProjectId }),
      });
      const data = await res.json();
      if (data.success) {
        activeCrawl = data.data;
        activeTab = 'crawl';
      } else {
        error = data.error;
      }
    } catch (e) {
      error = String(e);
    }
  }

  async function processDiscoveries(limit?: number) {
    try {
      const res = await fetch('/api/discovery/process/batch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ projectId: selectedProjectId, limit }),
      });
      const data = await res.json();
      if (data.success) {
        await loadStats();
        return data.data;
      } else {
        error = data.error;
      }
    } catch (e) {
      error = String(e);
    }
  }

  async function detectTrends() {
    try {
      const res = await fetch('/api/discovery/trends/detect', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ projectId: selectedProjectId }),
      });
      const data = await res.json();
      if (data.success) {
        activeTab = 'trends';
        return data.data;
      } else {
        error = data.error;
      }
    } catch (e) {
      error = String(e);
    }
  }

  async function scoreCriticality() {
    try {
      const res = await fetch('/api/discovery/criticality/score-project', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ projectId: selectedProjectId }),
      });
      const data = await res.json();
      if (data.success) {
        activeTab = 'criticality';
        return data.data;
      } else {
        error = data.error;
      }
    } catch (e) {
      error = String(e);
    }
  }

  function navigateToResearch(entityId: string) {
    // Navigate to research page for this entity
    window.location.hash = `#/research?entityId=${entityId}`;
  }

  function navigateToValidation() {
    // Navigate to validation page
    window.location.href = '/validate';
  }

  async function createProject() {
    if (!newProjectName.trim()) {
      error = 'Project name is required';
      return;
    }
    creatingProject = true;
    try {
      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newProjectName.trim(),
          description: newProjectDescription.trim() || undefined,
          workflow: 'DISCOVERY',
        }),
      });
      const data = await res.json();
      if (data.success) {
        await loadProjects();
        selectedProjectId = data.data.id;
        showCreateProject = false;
        newProjectName = '';
        newProjectDescription = '';
        await loadStats();
      } else {
        error = data.error || 'Failed to create project';
      }
    } catch (e) {
      error = String(e);
    } finally {
      creatingProject = false;
    }
  }

  function closeCreateProjectModal() {
    showCreateProject = false;
    newProjectName = '';
    newProjectDescription = '';
  }
</script>

<div class="discovery-page">
  <!-- Header -->
  <header class="discovery-header">
    <div class="header-left">
      <h1>Discovery Control Tower</h1>
      <p class="subtitle">Monitor sources, track discoveries, detect trends</p>
    </div>
    <div class="header-right">
      <div class="project-selector">
        <select bind:value={selectedProjectId} onchange={loadStats} class="project-select">
          <option value="">Select Project</option>
          {#each projects as project}
            <option value={project.id}>{project.name}</option>
          {/each}
        </select>
        <button class="btn-icon" onclick={() => showCreateProject = true} title="Create new project">
          +
        </button>
      </div>
      <button class="btn-secondary" onclick={() => window.location.hash = '#/research'}>
        Research Mode
      </button>
      <button class="btn-secondary" onclick={navigateToValidation}>
        Validation Mode
      </button>
    </div>
  </header>

  <!-- Stats Bar -->
  {#if sourceStats}
    <div class="stats-bar">
      <div class="stat">
        <span class="stat-value">{sourceStats.totalSources}</span>
        <span class="stat-label">Sources</span>
      </div>
      <div class="stat">
        <span class="stat-value">{sourceStats.activeSources}</span>
        <span class="stat-label">Active</span>
      </div>
      <div class="stat">
        <span class="stat-value">{discoveryStats?.total || 0}</span>
        <span class="stat-label">Discoveries</span>
      </div>
      <div class="stat">
        <span class="stat-value">{discoveryStats?.pending || 0}</span>
        <span class="stat-label">Pending</span>
      </div>
      <div class="stat">
        <span class="stat-value">{discoveryStats?.entitiesCreated || 0}</span>
        <span class="stat-label">Entities</span>
      </div>
      {#if activeCrawl}
        <div class="stat crawl-active">
          <span class="stat-value">{activeCrawl.sourcesComplete}/{activeCrawl.sourcesTotal}</span>
          <span class="stat-label">Crawling...</span>
        </div>
      {/if}
    </div>
  {/if}

  <!-- Error Banner -->
  {#if error}
    <div class="error-banner">
      <span>{error}</span>
      <button onclick={() => error = ''}>Dismiss</button>
    </div>
  {/if}

  <!-- Tab Navigation -->
  <nav class="tab-nav">
    <button class:active={activeTab === 'sources'} onclick={() => activeTab = 'sources'}>
      Sources
    </button>
    <button class:active={activeTab === 'crawl'} onclick={() => activeTab = 'crawl'}>
      Crawl
      {#if activeCrawl}
        <span class="badge">Active</span>
      {/if}
    </button>
    <button class:active={activeTab === 'discoveries'} onclick={() => activeTab = 'discoveries'}>
      Discoveries
      {#if discoveryStats?.pending > 0}
        <span class="badge">{discoveryStats.pending}</span>
      {/if}
    </button>
    <button class:active={activeTab === 'trends'} onclick={() => activeTab = 'trends'}>
      Trends
    </button>
    <button class:active={activeTab === 'pipeline'} onclick={() => activeTab = 'pipeline'}>
      Pipeline
    </button>
    <button class:active={activeTab === 'criticality'} onclick={() => activeTab = 'criticality'}>
      Criticality
    </button>
  </nav>

  <!-- Main Content -->
  <main class="discovery-content">
    {#if loading && !sourceStats}
      <div class="loading-state">
        <div class="spinner"></div>
        <p>Loading discovery data...</p>
      </div>
    {:else if !sourceStats || sourceStats.totalSources === 0}
      <div class="empty-state">
        <h2>No Sources Configured</h2>
        <p>Seed the default 73 curated sources to get started with discovery.</p>
        <button class="btn-primary" onclick={seedSources}>
          Seed Default Sources
        </button>
      </div>
    {:else}
      {#if activeTab === 'sources'}
        <SourcesPanel
          {sourceStats}
          onStartCrawl={(config: any) => startCrawl(config)}
        />
      {:else if activeTab === 'crawl'}
        <CrawlPanel
          {activeCrawl}
          projectId={selectedProjectId}
          onStartCrawl={(config: any) => startCrawl(config)}
        />
      {:else if activeTab === 'discoveries'}
        <DiscoveriesPanel
          projectId={selectedProjectId}
          pendingCount={discoveryStats?.pending || 0}
          onProcess={() => processDiscoveries()}
        />
      {:else if activeTab === 'trends'}
        <TrendsPanel
          projectId={selectedProjectId}
          onDetect={detectTrends}
        />
      {:else if activeTab === 'pipeline'}
        <EntityPipeline
          projectId={selectedProjectId}
          onResearch={(entityId: string) => navigateToResearch(entityId)}
        />
      {:else if activeTab === 'criticality'}
        <CriticalityPanel
          projectId={selectedProjectId}
          onScore={scoreCriticality}
          onValidate={navigateToValidation}
        />
      {/if}
    {/if}
  </main>

  <!-- Create Project Modal -->
  {#if showCreateProject}
    <div class="modal-overlay" onclick={closeCreateProjectModal}>
      <div class="modal" onclick={(e) => e.stopPropagation()}>
        <div class="modal-header">
          <h2>Create New Project</h2>
          <button class="modal-close" onclick={closeCreateProjectModal}>x</button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label for="project-name">Project Name</label>
            <input
              id="project-name"
              type="text"
              bind:value={newProjectName}
              placeholder="e.g., AI Code Assistants for Federal"
              class="form-input"
            />
          </div>
          <div class="form-group">
            <label for="project-description">Description (optional)</label>
            <textarea
              id="project-description"
              bind:value={newProjectDescription}
              placeholder="What are you researching?"
              rows="3"
              class="form-textarea"
            ></textarea>
          </div>
          <p class="form-hint">
            Projects organize your research. The project name doesn't affect what gets crawled -
            use Research Focus in crawl settings to narrow results.
          </p>
        </div>
        <div class="modal-footer">
          <button class="btn-secondary" onclick={closeCreateProjectModal}>Cancel</button>
          <button class="btn-primary" onclick={createProject} disabled={creatingProject || !newProjectName.trim()}>
            {creatingProject ? 'Creating...' : 'Create Project'}
          </button>
        </div>
      </div>
    </div>
  {/if}
</div>

<style>
  .discovery-page {
    min-height: 100vh;
    background: var(--color-bg, #FDFBF7);
  }

  .discovery-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
    background: white;
    border-bottom: 1px solid var(--color-border, #e5e5e5);
  }

  .discovery-header h1 {
    font-size: 1.5rem;
    font-weight: 600;
    color: var(--color-text, #1a1a1a);
    margin: 0;
  }

  .subtitle {
    font-size: 0.875rem;
    color: var(--color-text-secondary, #666);
    margin: 0.25rem 0 0 0;
  }

  .header-right {
    display: flex;
    gap: 0.75rem;
    align-items: center;
  }

  .project-select {
    padding: 0.5rem 1rem;
    border: 1px solid var(--color-border, #e5e5e5);
    border-radius: 6px;
    background: white;
    font-size: 0.875rem;
    min-width: 200px;
  }

  .btn-primary, .btn-secondary {
    padding: 0.5rem 1rem;
    border-radius: 6px;
    font-size: 0.875rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
  }

  .btn-primary {
    background: var(--color-primary, #2563eb);
    color: white;
    border: none;
  }

  .btn-primary:hover {
    background: var(--color-primary-dark, #1d4ed8);
  }

  .btn-secondary {
    background: white;
    color: var(--color-text, #1a1a1a);
    border: 1px solid var(--color-border, #e5e5e5);
  }

  .btn-secondary:hover {
    background: var(--color-bg-secondary, #f5f5f5);
  }

  .stats-bar {
    display: flex;
    gap: 2rem;
    padding: 1rem 2rem;
    background: var(--color-bg-secondary, #f7f5f0);
    border-bottom: 1px solid var(--color-border, #e5e5e5);
  }

  .stat {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .stat-value {
    font-size: 1.5rem;
    font-weight: 600;
    color: var(--color-text, #1a1a1a);
  }

  .stat-label {
    font-size: 0.75rem;
    color: var(--color-text-secondary, #666);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .stat.crawl-active .stat-value {
    color: var(--color-primary, #2563eb);
  }

  .error-banner {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.75rem 2rem;
    background: #fee2e2;
    color: #991b1b;
    border-bottom: 1px solid #fca5a5;
  }

  .error-banner button {
    background: none;
    border: none;
    color: #991b1b;
    cursor: pointer;
    font-weight: 500;
  }

  .tab-nav {
    display: flex;
    gap: 0;
    padding: 0 2rem;
    background: white;
    border-bottom: 1px solid var(--color-border, #e5e5e5);
  }

  .tab-nav button {
    padding: 1rem 1.5rem;
    background: none;
    border: none;
    border-bottom: 2px solid transparent;
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--color-text-secondary, #666);
    cursor: pointer;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .tab-nav button:hover {
    color: var(--color-text, #1a1a1a);
  }

  .tab-nav button.active {
    color: var(--color-primary, #2563eb);
    border-bottom-color: var(--color-primary, #2563eb);
  }

  .badge {
    background: var(--color-primary, #2563eb);
    color: white;
    padding: 0.125rem 0.5rem;
    border-radius: 999px;
    font-size: 0.75rem;
    font-weight: 600;
  }

  .discovery-content {
    padding: 2rem;
  }

  .loading-state, .empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 4rem 2rem;
    text-align: center;
  }

  .spinner {
    width: 32px;
    height: 32px;
    border: 3px solid var(--color-border, #e5e5e5);
    border-top-color: var(--color-primary, #2563eb);
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin-bottom: 1rem;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  .empty-state h2 {
    font-size: 1.25rem;
    margin-bottom: 0.5rem;
  }

  .empty-state p {
    color: var(--color-text-secondary, #666);
    margin-bottom: 1.5rem;
  }

  /* Project Selector */
  .project-selector {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .btn-icon {
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--color-primary, #2563eb);
    color: white;
    border: none;
    border-radius: 6px;
    font-size: 1.25rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
  }

  .btn-icon:hover {
    background: var(--color-primary-dark, #1d4ed8);
  }

  /* Modal */
  .modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    padding: 1rem;
  }

  .modal {
    background: white;
    border-radius: 12px;
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.2);
    width: 100%;
    max-width: 500px;
    overflow: hidden;
  }

  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.25rem 1.5rem;
    border-bottom: 1px solid var(--color-border, #e5e5e5);
  }

  .modal-header h2 {
    font-size: 1.125rem;
    font-weight: 600;
    margin: 0;
  }

  .modal-close {
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    border: 1px solid var(--color-border, #e5e5e5);
    border-radius: 6px;
    font-size: 1rem;
    cursor: pointer;
    color: var(--color-text-secondary, #666);
  }

  .modal-close:hover {
    background: var(--color-bg-secondary, #f7f5f0);
  }

  .modal-body {
    padding: 1.5rem;
  }

  .modal-body .form-group {
    margin-bottom: 1rem;
  }

  .modal-body .form-group:last-of-type {
    margin-bottom: 0.5rem;
  }

  .modal-body label {
    display: block;
    font-size: 0.875rem;
    font-weight: 500;
    margin-bottom: 0.375rem;
    color: var(--color-text, #1a1a1a);
  }

  .form-input, .form-textarea {
    width: 100%;
    padding: 0.625rem 0.875rem;
    border: 1px solid var(--color-border, #e5e5e5);
    border-radius: 6px;
    font-size: 0.9375rem;
    font-family: inherit;
    transition: border-color 0.2s;
  }

  .form-input:focus, .form-textarea:focus {
    outline: none;
    border-color: var(--color-primary, #2563eb);
  }

  .form-textarea {
    resize: vertical;
    min-height: 80px;
  }

  .form-hint {
    font-size: 0.8125rem;
    color: var(--color-text-secondary, #666);
    margin: 0.75rem 0 0 0;
    line-height: 1.4;
  }

  .modal-footer {
    display: flex;
    justify-content: flex-end;
    gap: 0.75rem;
    padding: 1rem 1.5rem;
    background: var(--color-bg-secondary, #f7f5f0);
    border-top: 1px solid var(--color-border, #e5e5e5);
  }
</style>
