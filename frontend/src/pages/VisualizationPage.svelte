<script lang="ts">
  /**
   * Research Grove - Drill-Down Visualization Page
   * Clean, professional interface for entity exploration
   */

  import { onMount } from 'svelte';
  import TreeVisualization from '../components/visualization/TreeVisualization.svelte';

  interface TreeNode {
    name: string;
    type: 'project' | 'category' | 'entity';
    key?: string;
    id?: string;
    url?: string;
    entityType?: string;
    assertionCount?: number;
    evidenceRatio?: number;
    children?: TreeNode[];
  }

  interface Project {
    id: string;
    name: string;
  }

  let projects = $state<Project[]>([]);
  let selectedProjectId = $state<string | null>(null);
  let treeData = $state<TreeNode | null>(null);
  let loading = $state(false);
  let error = $state<string | null>(null);

  let containerWidth = $state(1200);
  let containerHeight = $state(700);

  onMount(async () => {
    await fetchProjects();

    const updateDimensions = () => {
      const container = document.querySelector('.grove-canvas');
      if (container) {
        containerWidth = container.clientWidth;
        containerHeight = Math.max(650, window.innerHeight - 140);
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);

    return () => window.removeEventListener('resize', updateDimensions);
  });

  async function fetchProjects() {
    try {
      const response = await fetch('/api/projects');
      const result = await response.json();
      if (result.success) {
        projects = result.data;
        if (projects.length > 0 && !selectedProjectId) {
          selectedProjectId = projects[0].id;
          await fetchTreeData(projects[0].id);
        }
      }
    } catch (err) {
      console.error('Failed to fetch projects:', err);
      error = 'Failed to load projects';
    }
  }

  async function fetchTreeData(projectId: string) {
    loading = true;
    error = null;

    try {
      const response = await fetch(`/api/entities/tree/${projectId}`);
      const result = await response.json();

      if (result.success) {
        treeData = result.data;
      } else {
        error = result.error || 'Failed to load tree data';
      }
    } catch (err) {
      console.error('Failed to fetch tree data:', err);
      error = 'Failed to load visualization data';
    } finally {
      loading = false;
    }
  }

  function handleProjectChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    selectedProjectId = select.value;
    if (selectedProjectId) {
      fetchTreeData(selectedProjectId);
    }
  }

  function handleEntityClick(entity: TreeNode) {
    console.log('Entity clicked:', entity);
  }

  const stats = $derived(() => {
    if (!treeData || !treeData.children) return null;

    let totalEntities = 0;
    let totalAssertions = 0;
    let totalValidated = 0;

    for (const category of treeData.children) {
      if (category.children) {
        totalEntities += category.children.length;
        for (const entity of category.children) {
          const count = entity.assertionCount || 0;
          const ratio = entity.evidenceRatio || 0;
          totalAssertions += count;
          totalValidated += count * ratio;
        }
      }
    }

    return {
      categories: treeData.children.length,
      entities: totalEntities,
      assertions: totalAssertions,
      validatedPercent: totalAssertions > 0 ? Math.round((totalValidated / totalAssertions) * 100) : 0
    };
  });
</script>

<div class="grove-page">
  <header class="grove-header">
    <div class="header-left">
      <a href="#/" class="home-link" title="Back to Home">
        <span class="material-symbols-rounded">home</span>
      </a>
      <div class="nav-divider"></div>
      <div class="logo-mark">
        <span class="material-symbols-rounded logo-icon">account_tree</span>
      </div>
      <div class="title-group">
        <h1>Research Grove</h1>
        <p class="tagline">Entity Knowledge Graph</p>
      </div>
    </div>

    <div class="header-center">
      {#if stats()}
        <div class="stats-inline">
          <div class="stat-chip">
            <span class="material-symbols-rounded">grid_view</span>
            <span class="stat-value">{stats()?.categories}</span>
            <span class="stat-label">categories</span>
          </div>

          <div class="stat-chip highlight">
            <span class="material-symbols-rounded">deployed_code</span>
            <span class="stat-value">{stats()?.entities}</span>
            <span class="stat-label">entities</span>
          </div>

          <div class="stat-chip">
            <span class="material-symbols-rounded">chat</span>
            <span class="stat-value">{stats()?.assertions}</span>
            <span class="stat-label">assertions</span>
          </div>

          <div class="stat-chip accent">
            <span class="material-symbols-rounded">verified</span>
            <span class="stat-value">{stats()?.validatedPercent}%</span>
            <span class="stat-label">validated</span>
          </div>
        </div>
      {/if}
    </div>

    <div class="header-right">
      <div class="project-selector">
        <span class="material-symbols-rounded selector-icon">folder</span>
        <select
          id="project-select"
          value={selectedProjectId}
          onchange={handleProjectChange}
        >
          {#each projects as project}
            <option value={project.id}>{project.name}</option>
          {/each}
        </select>
      </div>
    </div>
  </header>

  <main class="grove-main">
    <div class="grove-canvas">
      {#if loading}
        <div class="loading-state">
          <div class="loading-spinner">
            <span class="material-symbols-rounded spinning">progress_activity</span>
          </div>
          <p class="loading-text">Loading research grove...</p>
        </div>
      {:else if error}
        <div class="error-state">
          <span class="material-symbols-rounded error-icon">error</span>
          <p class="error-text">{error}</p>
          <button class="retry-btn" onclick={() => selectedProjectId && fetchTreeData(selectedProjectId)}>
            <span class="material-symbols-rounded">refresh</span>
            Try Again
          </button>
        </div>
      {:else if treeData}
        <TreeVisualization
          data={treeData}
          width={containerWidth}
          height={containerHeight}
          onEntityClick={handleEntityClick}
        />
      {:else}
        <div class="empty-state">
          <span class="material-symbols-rounded empty-icon">park</span>
          <p>Select a project to explore its research grove</p>
        </div>
      {/if}
    </div>
  </main>
</div>

<style>
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200');

  .grove-page {
    min-height: 100vh;
    background: #f8f8f6;
    display: flex;
    flex-direction: column;
  }

  /* Material Symbols base style */
  .material-symbols-rounded {
    font-family: 'Material Symbols Rounded';
    font-weight: normal;
    font-style: normal;
    font-size: 24px;
    line-height: 1;
    letter-spacing: normal;
    text-transform: none;
    display: inline-block;
    white-space: nowrap;
    word-wrap: normal;
    direction: ltr;
    -webkit-font-feature-settings: 'liga';
    font-feature-settings: 'liga';
    -webkit-font-smoothing: antialiased;
  }

  /* Header */
  .grove-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 24px;
    background: #ffffff;
    border-bottom: 1px solid #e8e8e5;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
    flex-shrink: 0;
  }

  .header-left {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .home-link {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    background: #f5f5f3;
    border-radius: 8px;
    color: #7a7a7a;
    text-decoration: none;
    transition: all 0.15s ease;
  }

  .home-link:hover {
    background: #e8e8e5;
    color: #1a1a1a;
  }

  .home-link .material-symbols-rounded {
    font-size: 20px;
  }

  .nav-divider {
    width: 1px;
    height: 24px;
    background: #e8e8e5;
  }

  .logo-mark {
    width: 38px;
    height: 38px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #059669 0%, #10b981 100%);
    border-radius: 10px;
    box-shadow: 0 2px 8px rgba(5, 150, 105, 0.25);
  }

  .logo-icon {
    color: #ffffff;
    font-size: 22px;
  }

  .title-group h1 {
    margin: 0;
    font-family: 'DM Sans', system-ui, sans-serif;
    font-size: 20px;
    font-weight: 700;
    color: #1a1a1a;
    letter-spacing: -0.3px;
  }

  .tagline {
    margin: 1px 0 0 0;
    font-family: 'DM Sans', system-ui, sans-serif;
    font-size: 11px;
    color: #7a7a7a;
    font-weight: 500;
  }

  .header-center {
    display: flex;
    align-items: center;
  }

  .stats-inline {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .stat-chip {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 6px 12px;
    background: #f5f5f3;
    border-radius: 8px;
    border: 1px solid #e8e8e5;
  }

  .stat-chip .material-symbols-rounded {
    font-size: 16px;
    color: #9a9a9a;
  }

  .stat-chip.highlight .material-symbols-rounded {
    color: #059669;
  }

  .stat-chip.accent .material-symbols-rounded {
    color: #059669;
  }

  .stat-chip .stat-value {
    font-family: 'DM Sans', system-ui, sans-serif;
    font-size: 15px;
    font-weight: 700;
    color: #1a1a1a;
  }

  .stat-chip.accent .stat-value {
    color: #059669;
  }

  .stat-chip .stat-label {
    font-family: 'DM Sans', system-ui, sans-serif;
    font-size: 11px;
    color: #9a9a9a;
    font-weight: 500;
  }

  .header-right {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  .project-selector {
    display: flex;
    align-items: center;
    gap: 8px;
    background: #f5f5f3;
    padding: 4px 4px 4px 10px;
    border-radius: 10px;
    border: 1px solid #e8e8e5;
  }

  .selector-icon {
    color: #7a7a7a;
    font-size: 18px;
  }

  .project-selector select {
    padding: 6px 28px 6px 6px;
    background: transparent;
    border: none;
    font-family: 'DM Sans', system-ui, sans-serif;
    font-size: 13px;
    font-weight: 500;
    color: #1a1a1a;
    min-width: 160px;
    cursor: pointer;
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%237a7a7a' stroke-width='2' xmlns='http://www.w3.org/2000/svg'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 6px center;
  }

  .project-selector select:focus {
    outline: none;
  }

  /* Main Content */
  .grove-main {
    flex: 1;
    display: flex;
    position: relative;
  }

  .grove-canvas {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 8px;
  }

  /* Loading State */
  .loading-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
  }

  .loading-spinner {
    color: #059669;
  }

  .spinning {
    font-size: 48px;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  .loading-text {
    font-family: 'DM Sans', system-ui, sans-serif;
    font-size: 14px;
    color: #7a7a7a;
  }

  /* Error State */
  .error-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
  }

  .error-icon {
    font-size: 48px;
    color: #dc2626;
    opacity: 0.7;
  }

  .error-text {
    font-family: 'DM Sans', system-ui, sans-serif;
    font-size: 14px;
    color: #dc2626;
  }

  .retry-btn {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 10px 18px;
    background: #059669;
    border: none;
    border-radius: 8px;
    color: #ffffff;
    font-family: 'DM Sans', system-ui, sans-serif;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.15s ease;
  }

  .retry-btn .material-symbols-rounded {
    font-size: 18px;
  }

  .retry-btn:hover {
    background: #047857;
  }

  /* Empty State */
  .empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
  }

  .empty-icon {
    font-size: 48px;
    color: #9a9a9a;
  }

  .empty-state p {
    font-family: 'DM Sans', system-ui, sans-serif;
    font-size: 14px;
    color: #7a7a7a;
  }
</style>
