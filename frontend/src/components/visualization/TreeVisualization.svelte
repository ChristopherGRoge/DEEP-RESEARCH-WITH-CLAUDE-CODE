<script lang="ts">
  /**
   * D3-powered forest visualization of entities grouped by category
   * Categories are root nodes, entities are leaves branching from each category
   * Uses botanical leaf metaphor with zoom/pan support
   */

  import { onMount } from 'svelte';
  import * as d3 from 'd3';

  interface TreeNode {
    name: string;
    type: 'project' | 'category' | 'entity';
    id?: string;
    url?: string;
    logoUrl?: string;
    logoSvgContent?: string;
    assertionCount?: number;
    evidenceRatio?: number;
    children?: TreeNode[];
    _collapsed?: boolean;
  }

  interface Props {
    data: TreeNode | null;
    width?: number;
    height?: number;
    onEntityClick?: (entity: TreeNode) => void;
  }

  let {
    data,
    width = 1200,
    height = 800,
    onEntityClick
  }: Props = $props();

  let svgElement: SVGSVGElement;
  let selectedEntity = $state<TreeNode | null>(null);
  let hoveredNode = $state<TreeNode | null>(null);
  let collapsedCategories = $state<Set<string>>(new Set());

  // Category colors for branches - earth tones
  const categoryColors: Record<string, string> = {
    tool: '#8B4513',      // Saddle brown
    service: '#654321',   // Dark brown
    framework: '#A0522D', // Sienna
    product: '#6B4423',   // Brown
    library: '#8B7355',   // Tan
    company: '#5D3A1A',   // Dark brown
    uncategorized: '#696969', // Gray
  };

  const getBranchColor = (category: string) => {
    return categoryColors[category.toLowerCase()] || categoryColors.uncategorized;
  };

  // Leaf color based on evidence ratio
  const getLeafColor = (ratio: number = 0) => {
    const hue = 80 + (ratio * 40);
    const saturation = 30 + (ratio * 50);
    const lightness = 55 - (ratio * 15);
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  };

  const getVeinColor = (ratio: number = 0) => {
    return `hsl(${80 + (ratio * 40)}, ${40 + (ratio * 30)}%, ${35 - (ratio * 10)}%)`;
  };

  onMount(() => {
    if (data) {
      renderForest();
    }
  });

  $effect(() => {
    if (data && svgElement) {
      renderForest();
    }
  });

  function toggleCategory(categoryName: string) {
    const newSet = new Set(collapsedCategories);
    if (newSet.has(categoryName)) {
      newSet.delete(categoryName);
    } else {
      newSet.add(categoryName);
    }
    collapsedCategories = newSet;
    renderForest();
  }

  function renderForest() {
    if (!data || !svgElement || !data.children) return;

    // Clear previous rendering
    d3.select(svgElement).selectAll('*').remove();

    const margin = { top: 30, right: 200, bottom: 30, left: 50 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const svg = d3.select(svgElement)
      .attr('width', width)
      .attr('height', height);

    // Create a group for zoom/pan
    const zoomGroup = svg.append('g');

    // Add zoom behavior
    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.3, 3])
      .on('zoom', (event) => {
        zoomGroup.attr('transform', event.transform);
      });

    svg.call(zoom);

    // Main content group with margin
    const g = zoomGroup.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Get categories (children of root project node)
    const categories = data.children;

    // Calculate layout - each category gets a vertical slice
    const categoryHeight = innerHeight / Math.max(categories.length, 1);
    const branchStartX = 20;
    const branchLength = innerWidth * 0.25;

    categories.forEach((category, categoryIndex) => {
      const categoryY = categoryIndex * categoryHeight + categoryHeight / 2;
      const isCollapsed = collapsedCategories.has(category.name);
      const entities = category.children || [];
      const branchColor = getBranchColor(category.name);

      // Category group
      const categoryGroup = g.append('g')
        .attr('class', 'category-group')
        .attr('transform', `translate(0, ${categoryY})`);

      // Main branch line from left edge to category node
      categoryGroup.append('path')
        .attr('d', `M${branchStartX},0 L${branchStartX + branchLength},0`)
        .attr('stroke', branchColor)
        .attr('stroke-width', 8)
        .attr('stroke-linecap', 'round')
        .attr('fill', 'none');

      // Category node (clickable to collapse/expand)
      const categoryNode = categoryGroup.append('g')
        .attr('transform', `translate(${branchStartX + branchLength}, 0)`)
        .attr('class', 'category-node')
        .style('cursor', 'pointer')
        .on('click', () => toggleCategory(category.name));

      // Category circle
      categoryNode.append('circle')
        .attr('r', 18)
        .attr('fill', branchColor)
        .attr('stroke', '#3D2A1A')
        .attr('stroke-width', 3);

      // Collapse/expand indicator
      categoryNode.append('text')
        .attr('text-anchor', 'middle')
        .attr('dy', 5)
        .attr('fill', 'white')
        .attr('font-size', '16px')
        .attr('font-weight', 'bold')
        .text(isCollapsed ? '+' : '−');

      // Category label
      categoryGroup.append('text')
        .attr('x', branchStartX)
        .attr('y', -15)
        .attr('text-anchor', 'start')
        .attr('font-size', '14px')
        .attr('font-weight', '600')
        .attr('fill', '#333')
        .text(`${category.name} (${entities.length})`);

      // If collapsed, don't render entities
      if (isCollapsed) return;

      // Calculate entity positions - fan out from category node
      const entityStartX = branchStartX + branchLength + 40;
      const maxEntityWidth = innerWidth - entityStartX - 50;

      // Arrange entities in rows if many
      const entitiesPerRow = Math.max(1, Math.floor(maxEntityWidth / 80));
      const entitySpacingX = Math.min(80, maxEntityWidth / Math.min(entities.length, entitiesPerRow));
      const entitySpacingY = 60;
      const totalRows = Math.ceil(entities.length / entitiesPerRow);
      const rowOffset = (totalRows - 1) * entitySpacingY / 2;

      entities.forEach((entity, entityIndex) => {
        const row = Math.floor(entityIndex / entitiesPerRow);
        const col = entityIndex % entitiesPerRow;
        const entityX = entityStartX + col * entitySpacingX;
        const entityY = row * entitySpacingY - rowOffset;

        // Branch to entity
        const branchPath = `M${branchStartX + branchLength + 18},0
                           Q${entityStartX - 20},${entityY * 0.3}
                           ${entityX},${entityY}`;

        categoryGroup.append('path')
          .attr('d', branchPath)
          .attr('stroke', branchColor)
          .attr('stroke-width', 2)
          .attr('stroke-linecap', 'round')
          .attr('fill', 'none')
          .attr('opacity', 0.6);

        // Entity leaf
        const ratio = entity.evidenceRatio || 0;
        const leafColor = getLeafColor(ratio);
        const veinColor = getVeinColor(ratio);
        const baseSize = 28;
        const size = baseSize + Math.min((entity.assertionCount || 0) * 1.5, 12);

        const leafGroup = categoryGroup.append('g')
          .attr('transform', `translate(${entityX}, ${entityY})`)
          .attr('class', 'leaf-group')
          .style('cursor', 'pointer')
          .on('click', (event) => {
            event.stopPropagation();
            selectedEntity = entity;
            onEntityClick?.(entity);
          })
          .on('mouseenter', function(event) {
            hoveredNode = entity;
            d3.select(this)
              .transition()
              .duration(200)
              .attr('transform', `translate(${entityX}, ${entityY}) scale(1.3)`);
          })
          .on('mouseleave', function() {
            hoveredNode = null;
            d3.select(this)
              .transition()
              .duration(200)
              .attr('transform', `translate(${entityX}, ${entityY}) scale(1)`);
          });

        // Leaf body - pointed oval shape
        leafGroup.append('path')
          .attr('d', `M0 ${-size/2}
                      Q${size*0.6} ${-size*0.15} ${size*0.45} ${size*0.3}
                      Q${size*0.15} ${size*0.55} 0 ${size*0.65}
                      Q${-size*0.15} ${size*0.55} ${-size*0.45} ${size*0.3}
                      Q${-size*0.6} ${-size*0.15} 0 ${-size/2}`)
          .attr('fill', leafColor)
          .attr('stroke', veinColor)
          .attr('stroke-width', 1.5);

        // Central vein
        leafGroup.append('path')
          .attr('d', `M0 ${-size*0.4} Q0 0 0 ${size*0.6}`)
          .attr('fill', 'none')
          .attr('stroke', veinColor)
          .attr('stroke-width', 1.5);

        // Side veins
        const veinPaths = [
          `M0 ${-size*0.1} Q${size*0.2} ${-size*0.02} ${size*0.3} ${size*0.1}`,
          `M0 ${-size*0.1} Q${-size*0.2} ${-size*0.02} ${-size*0.3} ${size*0.1}`,
          `M0 ${size*0.15} Q${size*0.15} ${size*0.2} ${size*0.25} ${size*0.32}`,
          `M0 ${size*0.15} Q${-size*0.15} ${size*0.2} ${-size*0.25} ${size*0.32}`,
        ];

        veinPaths.forEach(path => {
          leafGroup.append('path')
            .attr('d', path)
            .attr('fill', 'none')
            .attr('stroke', veinColor)
            .attr('stroke-width', 0.7)
            .attr('opacity', 0.5);
        });

        // Entity name label (always visible, below leaf)
        leafGroup.append('text')
          .attr('y', size * 0.85)
          .attr('text-anchor', 'middle')
          .attr('font-size', '10px')
          .attr('fill', '#555')
          .text(entity.name.length > 12 ? entity.name.slice(0, 10) + '…' : entity.name);

        // Tooltip
        leafGroup.append('title')
          .text(`${entity.name}\n${entity.assertionCount || 0} assertions\n${Math.round(ratio * 100)}% validated`);
      });
    });

    // Add zoom controls hint
    svg.append('text')
      .attr('x', width - 10)
      .attr('y', height - 10)
      .attr('text-anchor', 'end')
      .attr('font-size', '11px')
      .attr('fill', '#999')
      .text('Scroll to zoom • Drag to pan • Click category to collapse');
  }
</script>

<div class="tree-container">
  <svg bind:this={svgElement} class="tree-svg"></svg>

  {#if hoveredNode}
    <div class="tooltip" style="pointer-events: none;">
      <strong>{hoveredNode.name}</strong>
      {#if hoveredNode.assertionCount !== undefined}
        <span class="stat">{hoveredNode.assertionCount} assertions</span>
      {/if}
      {#if hoveredNode.evidenceRatio !== undefined}
        <span class="stat">{Math.round(hoveredNode.evidenceRatio * 100)}% validated</span>
      {/if}
    </div>
  {/if}

  {#if selectedEntity}
    <div class="entity-panel">
      <button class="close-btn" onclick={() => selectedEntity = null}>&times;</button>
      <h3>{selectedEntity.name}</h3>
      {#if selectedEntity.url}
        <a href={selectedEntity.url} target="_blank" rel="noopener">{selectedEntity.url}</a>
      {/if}
      <div class="stats">
        <div class="stat-item">
          <span class="label">Assertions</span>
          <span class="value">{selectedEntity.assertionCount || 0}</span>
        </div>
        <div class="stat-item">
          <span class="label">Validated</span>
          <span class="value">{Math.round((selectedEntity.evidenceRatio || 0) * 100)}%</span>
        </div>
      </div>
      {#if selectedEntity.id}
        <a href="#/entity/{selectedEntity.id}" class="view-link">View Details</a>
      {/if}
    </div>
  {/if}
</div>

<style>
  .tree-container {
    position: relative;
    width: 100%;
    height: 100%;
    background: linear-gradient(to bottom, #f0f7f0 0%, #e8f5e9 100%);
    border-radius: 8px;
    overflow: hidden;
  }

  .tree-svg {
    display: block;
  }

  .tooltip {
    position: fixed;
    top: 20px;
    right: 20px;
    background: rgba(0, 0, 0, 0.85);
    color: white;
    padding: 12px 16px;
    border-radius: 8px;
    font-size: 13px;
    display: flex;
    flex-direction: column;
    gap: 4px;
    z-index: 100;
  }

  .tooltip strong {
    font-size: 14px;
  }

  .tooltip .stat {
    opacity: 0.8;
    font-size: 12px;
  }

  .entity-panel {
    position: absolute;
    bottom: 20px;
    right: 20px;
    background: white;
    border-radius: 12px;
    padding: 20px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
    min-width: 250px;
    z-index: 100;
  }

  .entity-panel h3 {
    margin: 0 0 8px 0;
    font-size: 18px;
    color: #333;
  }

  .entity-panel a {
    color: #2196F3;
    font-size: 12px;
    word-break: break-all;
  }

  .close-btn {
    position: absolute;
    top: 10px;
    right: 10px;
    background: none;
    border: none;
    font-size: 20px;
    cursor: pointer;
    color: #666;
    line-height: 1;
    padding: 4px;
  }

  .close-btn:hover {
    color: #333;
  }

  .stats {
    display: flex;
    gap: 20px;
    margin: 16px 0;
  }

  .stat-item {
    display: flex;
    flex-direction: column;
  }

  .stat-item .label {
    font-size: 11px;
    color: #666;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .stat-item .value {
    font-size: 24px;
    font-weight: 600;
    color: #333;
  }

  .view-link {
    display: inline-block;
    margin-top: 8px;
    padding: 8px 16px;
    background: #4CAF50;
    color: white !important;
    text-decoration: none;
    border-radius: 6px;
    font-size: 13px;
    font-weight: 500;
  }

  .view-link:hover {
    background: #43A047;
  }

  :global(.node-entity) {
    transition: transform 0.2s ease;
  }

  :global(.leaf-group) {
    transform-origin: center center;
  }
</style>
