<script lang="ts">
  /**
   * Research Grove - Tree visualization of entities by category
   * Entities appear as leaves on category branches
   */

  import { onMount } from 'svelte';
  import TreeVisualization from '../components/visualization/TreeVisualization.svelte';

  interface TreeNode {
    name: string;
    type: 'project' | 'category' | 'entity';
    id?: string;
    url?: string;
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

  // Dimensions
  let containerWidth = $state(1200);
  let containerHeight = $state(700);

  onMount(async () => {
    await fetchProjects();

    // Handle resize
    const updateDimensions = () => {
      const container = document.querySelector('.viz-container');
      if (container) {
        containerWidth = container.clientWidth - 40;
        containerHeight = Math.max(600, window.innerHeight - 200);
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
        // Auto-select first project if available
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
    // Could navigate to entity detail or open modal
  }

  // Calculate summary stats
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

<div class="visualization-page">
  <header class="page-header">
    <div class="title-section">
      <h1>Research Grove</h1>
      <p class="subtitle">Explore entities as leaves on the tree of knowledge</p>
    </div>

    <div class="controls">
      <label for="project-select">Project:</label>
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
  </header>

  {#if stats()}
    <div class="stats-bar">
      <div class="stat">
        <span class="stat-value">{stats()?.categories}</span>
        <span class="stat-label">Categories</span>
      </div>
      <div class="stat">
        <span class="stat-value">{stats()?.entities}</span>
        <span class="stat-label">Entities</span>
      </div>
      <div class="stat">
        <span class="stat-value">{stats()?.assertions}</span>
        <span class="stat-label">Assertions</span>
      </div>
      <div class="stat">
        <span class="stat-value">{stats()?.validatedPercent}%</span>
        <span class="stat-label">Validated</span>
      </div>
    </div>
  {/if}

  <div class="viz-container">
    {#if loading}
      <div class="loading">
        <div class="spinner"></div>
        <p>Growing the research tree...</p>
      </div>
    {:else if error}
      <div class="error">
        <p>{error}</p>
        <button onclick={() => selectedProjectId && fetchTreeData(selectedProjectId)}>
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
      <div class="empty">
        <p>Select a project to visualize its research tree</p>
      </div>
    {/if}
  </div>

  <div class="legend">
    <h4>Legend</h4>
    <div class="legend-items">
      <div class="legend-item">
        <div class="legend-color" style="background: hsl(80, 30%, 55%);"></div>
        <span>New (0% validated)</span>
      </div>
      <div class="legend-item">
        <div class="legend-color" style="background: hsl(100, 55%, 47%);"></div>
        <span>Partial (50% validated)</span>
      </div>
      <div class="legend-item">
        <div class="legend-color" style="background: hsl(120, 80%, 40%);"></div>
        <span>Complete (100% validated)</span>
      </div>
      <div class="legend-item">
        <div class="legend-color leaf-size-small"></div>
        <span>Few assertions</span>
      </div>
      <div class="legend-item">
        <div class="legend-color leaf-size-large"></div>
        <span>Many assertions</span>
      </div>
    </div>
  </div>
</div>

<style>
  .visualization-page {
    min-height: 100vh;
    background: #fafafa;
    padding: 0;
  }

  .page-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 30px;
    background: white;
    border-bottom: 1px solid #e0e0e0;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  }

  .title-section h1 {
    margin: 0;
    font-size: 28px;
    color: #2E7D32;
    font-weight: 600;
  }

  .subtitle {
    margin: 4px 0 0 0;
    color: #666;
    font-size: 14px;
  }

  .controls {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .controls label {
    font-size: 14px;
    color: #555;
    font-weight: 500;
  }

  .controls select {
    padding: 8px 12px;
    border: 1px solid #ddd;
    border-radius: 6px;
    font-size: 14px;
    background: white;
    min-width: 200px;
    cursor: pointer;
  }

  .controls select:focus {
    outline: none;
    border-color: #4CAF50;
  }

  .stats-bar {
    display: flex;
    justify-content: center;
    gap: 40px;
    padding: 16px 30px;
    background: #f5f5f5;
    border-bottom: 1px solid #e0e0e0;
  }

  .stat {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .stat-value {
    font-size: 24px;
    font-weight: 600;
    color: #333;
  }

  .stat-label {
    font-size: 12px;
    color: #666;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .viz-container {
    padding: 20px;
    min-height: 600px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .loading, .error, .empty {
    text-align: center;
    padding: 60px;
  }

  .spinner {
    width: 40px;
    height: 40px;
    border: 3px solid #e0e0e0;
    border-top-color: #4CAF50;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin: 0 auto 16px;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  .loading p {
    color: #666;
    font-style: italic;
  }

  .error {
    color: #c62828;
  }

  .error button {
    margin-top: 16px;
    padding: 10px 20px;
    background: #4CAF50;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 14px;
  }

  .error button:hover {
    background: #43A047;
  }

  .empty {
    color: #666;
  }

  .legend {
    position: fixed;
    bottom: 20px;
    left: 20px;
    background: white;
    padding: 16px 20px;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    z-index: 50;
  }

  .legend h4 {
    margin: 0 0 12px 0;
    font-size: 12px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    color: #666;
  }

  .legend-items {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .legend-item {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 12px;
    color: #555;
  }

  .legend-color {
    width: 20px;
    height: 12px;
    border-radius: 6px;
  }

  .leaf-size-small {
    width: 12px;
    height: 8px;
    background: hsl(100, 50%, 50%);
  }

  .leaf-size-large {
    width: 24px;
    height: 16px;
    background: hsl(100, 50%, 50%);
  }
</style>
