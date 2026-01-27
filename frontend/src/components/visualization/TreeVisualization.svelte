<script lang="ts">
  /**
   * Research Grove - Drill-Down Tree Visualization
   * Project → Categories → Entities hierarchy with navigation
   */

  import { onMount } from 'svelte';
  import * as d3 from 'd3';

  interface BuzzComponents {
    marketPresence?: number;
    developerActivity?: number;
    fundingSignal?: number;
    mentionVelocity?: number;
    researchDepth?: number;
  }

  interface TreeNode {
    name: string;
    type: 'project' | 'category' | 'entity';
    key?: string;
    id?: string;
    url?: string;
    entityType?: string;
    logoUrl?: string;
    logoSvgContent?: string;
    assertionCount?: number;
    evidenceRatio?: number;
    // Buzz score fields
    buzzScore?: number;
    buzzComponents?: BuzzComponents;
    githubStars?: number;
    children?: TreeNode[];
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

  // Drill-down navigation state
  let viewLevel = $state<'project' | 'category'>('project');
  let selectedCategory = $state<TreeNode | null>(null);

  // Light mode color palette
  const palette = {
    bg: {
      primary: '#fafaf8',
      secondary: '#f5f4f0',
      tertiary: '#eeedea',
    },
    branch: {
      primary: '#8b6914',
      secondary: '#a67c00',
      light: '#c9a227',
    },
    text: {
      primary: '#1a1a1a',
      secondary: '#4a4a4a',
      muted: '#7a7a7a',
      light: '#9a9a9a',
    },
    accent: {
      green: '#059669',
      blue: '#0284c7',
    },
    card: {
      bg: '#ffffff',
      border: '#e5e5e0',
      shadow: 'rgba(0, 0, 0, 0.08)',
    }
  };

  // Category configuration with Material Symbols icons
  const categoryMeta: Record<string, { icon: string; color: string; label: string }> = {
    ai_code_assistants: { icon: 'terminal', color: '#0284c7', label: 'Code Assistants' },
    ai_code_review: { icon: 'rate_review', color: '#7c3aed', label: 'Code Review' },
    ai_debugging: { icon: 'bug_report', color: '#dc2626', label: 'Debugging' },
    ai_testing: { icon: 'science', color: '#059669', label: 'Testing' },
    ai_documentation: { icon: 'description', color: '#d97706', label: 'Documentation' },
    ai_security: { icon: 'shield', color: '#db2777', label: 'Security' },
    ai_devops: { icon: 'engineering', color: '#0891b2', label: 'DevOps' },
    ai_analytics: { icon: 'analytics', color: '#7c3aed', label: 'Analytics' },
    genai_concepts: { icon: 'auto_awesome', color: '#ea580c', label: 'GenAI Concepts' },
    uncategorized: { icon: 'category', color: '#6b7280', label: 'Uncategorized' },
  };

  const getCategoryMeta = (key: string) => {
    return categoryMeta[key] || categoryMeta.uncategorized;
  };

  // Entity icon and color based on evidence ratio
  const getEntityStyle = (ratio: number = 0) => {
    const hue = 145 + (ratio * 25); // 145 to 170 (teal-green range)
    const saturation = 40 + (ratio * 35); // 40% to 75%
    const lightness = 45 - (ratio * 10); // 45% to 35%

    return {
      bg: `hsl(${hue}, ${saturation}%, ${lightness}%)`,
      border: `hsl(${hue}, ${saturation + 10}%, ${lightness - 10}%)`,
      icon: '#ffffff',
    };
  };

  // Buzz score-based node sizing (from DEVELOPER-GUIDE.md)
  // XL (64px): 0.80-1.00 - Market leaders
  // LG (48px): 0.60-0.79 - Strong players
  // MD (36px): 0.40-0.59 - Established
  // SM (28px): 0.20-0.39 - Emerging
  // XS (20px): 0.00-0.19 - Just discovered
  const getBuzzNodeSize = (buzzScore: number = 0): number => {
    if (buzzScore >= 0.80) return 32; // XL (scaled for radial layout)
    if (buzzScore >= 0.60) return 28; // LG
    if (buzzScore >= 0.40) return 24; // MD
    if (buzzScore >= 0.20) return 20; // SM
    return 18; // XS
  };

  // Get buzz tier info for badges and styling
  const getBuzzTier = (buzzScore: number = 0): { tier: string; badge: string; color: string; glow: boolean } => {
    if (buzzScore >= 0.80) return { tier: 'hot', badge: '🔥', color: '#ef4444', glow: true };
    if (buzzScore >= 0.60) return { tier: 'rising', badge: '⭐', color: '#f59e0b', glow: true };
    if (buzzScore >= 0.40) return { tier: 'established', badge: '', color: '#059669', glow: false };
    if (buzzScore >= 0.20) return { tier: 'emerging', badge: '', color: '#6b7280', glow: false };
    return { tier: 'new', badge: '❓', color: '#9ca3af', glow: false };
  };

  // Format buzz score as percentage
  const formatBuzzScore = (score: number = 0): string => {
    return `${Math.round(score * 100)}%`;
  };

  onMount(() => {
    if (data) {
      renderTree();
    }
  });

  $effect(() => {
    if (data && svgElement) {
      renderTree();
    }
  });

  // Navigation functions
  function drillIntoCategory(category: TreeNode) {
    selectedCategory = category;
    viewLevel = 'category';
    renderTree();
  }

  function navigateBack() {
    viewLevel = 'project';
    selectedCategory = null;
    renderTree();
  }

  function renderTree() {
    if (!data || !svgElement) return;

    d3.select(svgElement).selectAll('*').remove();

    const svg = d3.select(svgElement)
      .attr('width', width)
      .attr('height', height);

    const defs = svg.append('defs');

    // Subtle shadow filter
    const shadowFilter = defs.append('filter')
      .attr('id', 'node-shadow')
      .attr('x', '-30%').attr('y', '-30%')
      .attr('width', '160%').attr('height', '160%');
    shadowFilter.append('feDropShadow')
      .attr('dx', '0').attr('dy', '3')
      .attr('stdDeviation', '4')
      .attr('flood-color', 'rgba(0,0,0,0.12)');

    // Hover glow
    const hoverGlow = defs.append('filter')
      .attr('id', 'hover-glow')
      .attr('x', '-50%').attr('y', '-50%')
      .attr('width', '200%').attr('height', '200%');
    hoverGlow.append('feDropShadow')
      .attr('dx', '0').attr('dy', '0')
      .attr('stdDeviation', '6')
      .attr('flood-color', 'rgba(5, 150, 105, 0.4)');

    // Hot buzz glow (red/orange pulsing)
    const hotGlow = defs.append('filter')
      .attr('id', 'hot-glow')
      .attr('x', '-50%').attr('y', '-50%')
      .attr('width', '200%').attr('height', '200%');
    hotGlow.append('feDropShadow')
      .attr('dx', '0').attr('dy', '0')
      .attr('stdDeviation', '8')
      .attr('flood-color', 'rgba(239, 68, 68, 0.5)');

    // Rising buzz glow (amber)
    const risingGlow = defs.append('filter')
      .attr('id', 'rising-glow')
      .attr('x', '-50%').attr('y', '-50%')
      .attr('width', '200%').attr('height', '200%');
    risingGlow.append('feDropShadow')
      .attr('dx', '0').attr('dy', '0')
      .attr('stdDeviation', '6')
      .attr('flood-color', 'rgba(245, 158, 11, 0.4)');

    // Logo clip paths for various sizes (including buzz-based sizes)
    [16, 18, 20, 22, 24, 26, 28, 30, 32, 36, 40].forEach(size => {
      defs.append('clipPath')
        .attr('id', `logo-clip-${size}`)
        .append('circle')
        .attr('r', size * 0.7);
    });

    // Background
    svg.append('rect')
      .attr('width', width)
      .attr('height', height)
      .attr('fill', palette.bg.primary);

    // Subtle grid pattern
    const gridSize = 50;
    for (let x = gridSize; x < width; x += gridSize) {
      for (let y = gridSize; y < height; y += gridSize) {
        svg.append('circle')
          .attr('cx', x)
          .attr('cy', y)
          .attr('r', 1)
          .attr('fill', palette.text.light)
          .attr('opacity', 0.25);
      }
    }

    const zoomGroup = svg.append('g');

    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.4, 2.5])
      .on('zoom', (event) => {
        zoomGroup.attr('transform', event.transform);
      });

    svg.call(zoom);

    if (viewLevel === 'project') {
      renderProjectView(zoomGroup, data);
    } else if (viewLevel === 'category' && selectedCategory) {
      renderCategoryView(zoomGroup, selectedCategory);
    }

    // Instructions
    const instructions = viewLevel === 'project'
      ? 'Click a category to drill down · Scroll to zoom · Drag to pan'
      : 'Click an entity for details · Scroll to zoom · Drag to pan';

    svg.append('text')
      .attr('x', width - 20)
      .attr('y', height - 14)
      .attr('text-anchor', 'end')
      .attr('fill', palette.text.light)
      .attr('font-size', '11px')
      .attr('font-family', '"DM Sans", system-ui, sans-serif')
      .text(instructions);
  }

  function renderProjectView(container: d3.Selection<SVGGElement, unknown, null, undefined>, project: TreeNode) {
    const centerX = width / 2;
    const centerY = height / 2;
    const categories = project.children || [];

    const g = container.append('g');

    // Project root node (center)
    const rootGroup = g.append('g')
      .attr('transform', `translate(${centerX}, ${centerY})`)
      .attr('class', 'root-node');

    // Root circle with shadow
    rootGroup.append('circle')
      .attr('r', 55)
      .attr('fill', palette.card.bg)
      .attr('stroke', palette.accent.green)
      .attr('stroke-width', 3)
      .attr('filter', 'url(#node-shadow)');

    // Project icon
    rootGroup.append('text')
      .attr('class', 'material-symbols-rounded')
      .attr('text-anchor', 'middle')
      .attr('dy', 8)
      .attr('fill', palette.accent.green)
      .attr('font-size', '32px')
      .text('account_tree');

    // Project name below
    rootGroup.append('text')
      .attr('y', 80)
      .attr('text-anchor', 'middle')
      .attr('fill', palette.text.primary)
      .attr('font-size', '16px')
      .attr('font-family', '"DM Sans", system-ui, sans-serif')
      .attr('font-weight', '600')
      .text(project.name);

    // Calculate category positions in a circle around the root
    const radius = Math.min(width, height) * 0.32;
    const angleStep = (2 * Math.PI) / categories.length;
    const startAngle = -Math.PI / 2; // Start from top

    categories.forEach((category, index) => {
      const angle = startAngle + index * angleStep;
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);
      const catMeta = getCategoryMeta(category.key || category.name);
      const entityCount = category.children?.length || 0;

      // Branch from root to category
      const controlRadius = radius * 0.5;
      const controlX = centerX + controlRadius * Math.cos(angle);
      const controlY = centerY + controlRadius * Math.sin(angle);

      g.append('path')
        .attr('d', `M${centerX},${centerY} Q${controlX},${controlY} ${x},${y}`)
        .attr('stroke', palette.branch.light)
        .attr('stroke-width', 3)
        .attr('stroke-linecap', 'round')
        .attr('fill', 'none')
        .attr('opacity', 0.6);

      // Category node
      const categoryGroup = g.append('g')
        .attr('transform', `translate(${x}, ${y})`)
        .attr('class', 'category-node')
        .style('cursor', 'pointer')
        .on('click', () => drillIntoCategory(category))
        .on('mouseenter', function() {
          d3.select(this).select('circle')
            .transition()
            .duration(200)
            .attr('r', 42)
            .attr('filter', 'url(#hover-glow)');
        })
        .on('mouseleave', function() {
          d3.select(this).select('circle')
            .transition()
            .duration(150)
            .attr('r', 38)
            .attr('filter', 'url(#node-shadow)');
        });

      // Category circle
      categoryGroup.append('circle')
        .attr('r', 38)
        .attr('fill', palette.card.bg)
        .attr('stroke', catMeta.color)
        .attr('stroke-width', 2.5)
        .attr('filter', 'url(#node-shadow)');

      // Category icon
      categoryGroup.append('text')
        .attr('class', 'material-symbols-rounded')
        .attr('text-anchor', 'middle')
        .attr('dy', 8)
        .attr('fill', catMeta.color)
        .attr('font-size', '24px')
        .text(catMeta.icon);

      // Entity count badge
      categoryGroup.append('circle')
        .attr('cx', 28)
        .attr('cy', -28)
        .attr('r', 14)
        .attr('fill', catMeta.color);

      categoryGroup.append('text')
        .attr('x', 28)
        .attr('y', -24)
        .attr('text-anchor', 'middle')
        .attr('fill', '#ffffff')
        .attr('font-size', '11px')
        .attr('font-family', '"DM Sans", system-ui, sans-serif')
        .attr('font-weight', '600')
        .text(entityCount);

      // Category label
      const labelY = y > centerY ? 58 : -52;
      categoryGroup.append('text')
        .attr('y', labelY)
        .attr('text-anchor', 'middle')
        .attr('fill', palette.text.primary)
        .attr('font-size', '13px')
        .attr('font-family', '"DM Sans", system-ui, sans-serif')
        .attr('font-weight', '500')
        .text(catMeta.label);

      categoryGroup.append('title')
        .text(`${catMeta.label}\n${entityCount} entities\nClick to explore`);
    });
  }

  function renderCategoryView(container: d3.Selection<SVGGElement, unknown, null, undefined>, category: TreeNode) {
    const entities = category.children || [];
    const catMeta = getCategoryMeta(category.key || category.name);

    const centerX = width / 2;
    const centerY = height / 2;
    const g = container.append('g');

    // Category root node (center)
    const rootGroup = g.append('g')
      .attr('transform', `translate(${centerX}, ${centerY})`)
      .attr('class', 'category-root');

    // Root circle
    rootGroup.append('circle')
      .attr('r', 55)
      .attr('fill', palette.card.bg)
      .attr('stroke', catMeta.color)
      .attr('stroke-width', 3)
      .attr('filter', 'url(#node-shadow)');

    // Category icon
    rootGroup.append('text')
      .attr('class', 'material-symbols-rounded')
      .attr('text-anchor', 'middle')
      .attr('dy', 8)
      .attr('fill', catMeta.color)
      .attr('font-size', '32px')
      .text(catMeta.icon);

    // Category name below
    rootGroup.append('text')
      .attr('y', 80)
      .attr('text-anchor', 'middle')
      .attr('fill', palette.text.primary)
      .attr('font-size', '16px')
      .attr('font-family', '"DM Sans", system-ui, sans-serif')
      .attr('font-weight', '600')
      .text(catMeta.label);

    rootGroup.append('text')
      .attr('y', 98)
      .attr('text-anchor', 'middle')
      .attr('fill', catMeta.color)
      .attr('font-size', '12px')
      .attr('font-family', '"DM Sans", system-ui, sans-serif')
      .text(`${entities.length} entities`);

    // Calculate radial layout with multiple rings if needed
    const maxPerRing = 12; // Max entities per ring before adding another ring
    const baseRadius = Math.min(width, height) * 0.28;
    const ringSpacing = 95; // Space between rings

    // Distribute entities across rings
    const rings: TreeNode[][] = [];
    let remaining = [...entities];
    let ringIndex = 0;

    while (remaining.length > 0) {
      // More entities in outer rings (proportional to circumference)
      const ringCapacity = Math.min(
        Math.floor(maxPerRing * (1 + ringIndex * 0.5)),
        remaining.length
      );
      rings.push(remaining.slice(0, ringCapacity));
      remaining = remaining.slice(ringCapacity);
      ringIndex++;
    }

    // Render entities in radial layout
    rings.forEach((ringEntities, rIndex) => {
      const radius = baseRadius + rIndex * ringSpacing;
      const angleStep = (2 * Math.PI) / ringEntities.length;
      const startAngle = -Math.PI / 2; // Start from top

      ringEntities.forEach((entity, eIndex) => {
        const angle = startAngle + eIndex * angleStep;
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);

        const ratio = entity.evidenceRatio || 0;
        const style = getEntityStyle(ratio);

        // Buzz-based sizing and styling
        const buzzScore = entity.buzzScore || 0;
        const nodeSize = getBuzzNodeSize(buzzScore);
        const buzzTier = getBuzzTier(buzzScore);

        // Branch from center to entity - thicker for high-buzz entities
        const controlRadius = radius * 0.5;
        const controlX = centerX + controlRadius * Math.cos(angle);
        const controlY = centerY + controlRadius * Math.sin(angle);
        const branchWidth = buzzTier.glow ? 2.5 : 1.5;

        g.append('path')
          .attr('d', `M${centerX},${centerY} Q${controlX},${controlY} ${x},${y}`)
          .attr('stroke', buzzTier.glow ? buzzTier.color : palette.branch.light)
          .attr('stroke-width', branchWidth)
          .attr('stroke-linecap', 'round')
          .attr('fill', 'none')
          .attr('opacity', buzzTier.glow ? 0.7 : 0.5);

        // Get default filter based on buzz tier
        const getDefaultFilter = () => {
          if (buzzTier.tier === 'hot') return 'url(#hot-glow)';
          if (buzzTier.tier === 'rising') return 'url(#rising-glow)';
          return 'url(#node-shadow)';
        };

        // Entity node
        const entityGroup = g.append('g')
          .attr('transform', `translate(${x}, ${y})`)
          .attr('class', 'entity-node')
          .style('cursor', 'pointer')
          .on('click', (event) => {
            event.stopPropagation();
            selectedEntity = entity;
            onEntityClick?.(entity);
          })
          .on('mouseenter', function() {
            hoveredNode = entity;
            d3.select(this)
              .transition()
              .duration(200)
              .attr('transform', `translate(${x}, ${y}) scale(1.15)`);
            d3.select(this).select('.entity-circle')
              .attr('filter', 'url(#hover-glow)');
          })
          .on('mouseleave', function() {
            hoveredNode = null;
            d3.select(this)
              .transition()
              .duration(150)
              .attr('transform', `translate(${x}, ${y}) scale(1)`);
            d3.select(this).select('.entity-circle')
              .attr('filter', getDefaultFilter());
          });

        // Entity circle background with buzz-based styling
        const hasLogo = entity.logoUrl;
        const strokeColor = buzzTier.glow ? buzzTier.color : (hasLogo ? palette.card.border : style.border);
        const strokeWidth = buzzTier.glow ? 3 : 2;

        entityGroup.append('circle')
          .attr('class', 'entity-circle')
          .attr('r', nodeSize)
          .attr('fill', hasLogo ? '#ffffff' : style.bg)
          .attr('stroke', strokeColor)
          .attr('stroke-width', strokeWidth)
          .attr('filter', getDefaultFilter());

        // Entity icon or logo
        if (entity.logoUrl) {
          // Create a unique clip path ID for this entity
          const clipId = `logo-clip-${entity.id || Math.random().toString(36).substr(2, 9)}`;
          const clipDef = entityGroup.append('defs');
          clipDef.append('clipPath')
            .attr('id', clipId)
            .append('circle')
            .attr('r', nodeSize * 0.75);

          // Use external logo image with circular clip
          entityGroup.append('image')
            .attr('href', entity.logoUrl)
            .attr('x', -nodeSize * 0.75)
            .attr('y', -nodeSize * 0.75)
            .attr('width', nodeSize * 1.5)
            .attr('height', nodeSize * 1.5)
            .attr('preserveAspectRatio', 'xMidYMid slice')
            .attr('clip-path', `url(#${clipId})`);
        } else {
          // Fallback to Material icon
          entityGroup.append('text')
            .attr('class', 'material-symbols-rounded')
            .attr('text-anchor', 'middle')
            .attr('dy', 6)
            .attr('fill', style.icon)
            .attr('font-size', `${nodeSize * 0.65}px`)
            .text('deployed_code');
        }

        // Buzz badge for hot/rising entities
        if (buzzTier.badge) {
          entityGroup.append('text')
            .attr('x', nodeSize * 0.7)
            .attr('y', -nodeSize * 0.7)
            .attr('text-anchor', 'middle')
            .attr('font-size', '14px')
            .attr('filter', 'drop-shadow(0 1px 2px rgba(0,0,0,0.3))')
            .text(buzzTier.badge);
        }

        // Entity name - position based on angle to avoid overlap with center
        const labelDistance = nodeSize + 14;
        const labelAngle = angle;
        const labelX = labelDistance * Math.cos(labelAngle) * 0.3;
        const labelY = labelDistance + (y > centerY ? 4 : -nodeSize * 2 - 4);

        entityGroup.append('text')
          .attr('x', 0)
          .attr('y', y > centerY ? nodeSize + 14 : -nodeSize - 6)
          .attr('text-anchor', 'middle')
          .attr('fill', buzzTier.glow ? buzzTier.color : palette.text.secondary)
          .attr('font-size', '10px')
          .attr('font-family', '"DM Sans", system-ui, sans-serif')
          .attr('font-weight', buzzTier.glow ? '600' : '500')
          .text(entity.name.length > 12 ? entity.name.slice(0, 10) + '…' : entity.name);

        // Tooltip with buzz info
        const buzzText = buzzScore > 0 ? `\nBuzz: ${formatBuzzScore(buzzScore)} (${buzzTier.tier})` : '';
        entityGroup.append('title')
          .text(`${entity.name}\n${entity.entityType || 'entity'}\n${entity.assertionCount || 0} assertions\n${Math.round(ratio * 100)}% validated${buzzText}`);
      });
    });
  }
</script>

<div class="grove-container">
  <!-- Breadcrumb Navigation -->
  <div class="breadcrumb">
    {#if viewLevel === 'project'}
      <span class="breadcrumb-current">
        <span class="material-symbols-rounded">account_tree</span>
        {data?.name || 'Project'}
      </span>
    {:else if viewLevel === 'category' && selectedCategory}
      <button class="breadcrumb-link" onclick={navigateBack}>
        <span class="material-symbols-rounded">account_tree</span>
        {data?.name || 'Project'}
      </button>
      <span class="material-symbols-rounded breadcrumb-separator">chevron_right</span>
      <span class="breadcrumb-current" style="color: {getCategoryMeta(selectedCategory.key || selectedCategory.name).color}">
        <span class="material-symbols-rounded">{getCategoryMeta(selectedCategory.key || selectedCategory.name).icon}</span>
        {getCategoryMeta(selectedCategory.key || selectedCategory.name).label}
      </span>
    {/if}
  </div>

  <svg bind:this={svgElement} class="grove-svg"></svg>

  {#if hoveredNode}
    {@const buzzTier = getBuzzTier(hoveredNode.buzzScore || 0)}
    <div class="hover-card" role="tooltip">
      <div class="hover-card-header">
        {#if hoveredNode.logoUrl || hoveredNode.logoSvgContent}
          <div class="hover-logo">
            {#if hoveredNode.logoUrl}
              <img src={hoveredNode.logoUrl} alt="{hoveredNode.name} logo" />
            {:else if hoveredNode.logoSvgContent}
              {@html hoveredNode.logoSvgContent}
            {/if}
          </div>
        {/if}
        <div class="hover-card-info">
          <div class="hover-card-badges">
            <span class="hover-card-type">{hoveredNode.entityType || 'entity'}</span>
            {#if buzzTier.badge}
              <span class="buzz-badge" style="background: {buzzTier.color}">
                {buzzTier.badge} {buzzTier.tier}
              </span>
            {/if}
          </div>
          <h4>{hoveredNode.name}</h4>
        </div>
      </div>
      <div class="hover-card-stats">
        <div class="hover-stat">
          <span class="hover-stat-value">{hoveredNode.assertionCount || 0}</span>
          <span class="hover-stat-label">assertions</span>
        </div>
        <div class="hover-stat">
          <span class="hover-stat-value">{Math.round((hoveredNode.evidenceRatio || 0) * 100)}%</span>
          <span class="hover-stat-label">validated</span>
        </div>
        {#if hoveredNode.buzzScore}
          <div class="hover-stat buzz-stat">
            <span class="hover-stat-value" style="color: {buzzTier.color}">{formatBuzzScore(hoveredNode.buzzScore)}</span>
            <span class="hover-stat-label">buzz</span>
          </div>
        {/if}
      </div>

      {#if hoveredNode.buzzComponents}
        <div class="buzz-breakdown">
          <div class="buzz-breakdown-title">Buzz Components</div>
          <div class="buzz-components">
            {#if hoveredNode.buzzComponents.marketPresence !== undefined}
              <div class="buzz-component">
                <span class="buzz-component-label">Market</span>
                <div class="buzz-bar">
                  <div class="buzz-bar-fill" style="width: {hoveredNode.buzzComponents.marketPresence * 100}%"></div>
                </div>
              </div>
            {/if}
            {#if hoveredNode.buzzComponents.developerActivity !== undefined}
              <div class="buzz-component">
                <span class="buzz-component-label">Dev Activity</span>
                <div class="buzz-bar">
                  <div class="buzz-bar-fill" style="width: {hoveredNode.buzzComponents.developerActivity * 100}%"></div>
                </div>
              </div>
            {/if}
            {#if hoveredNode.buzzComponents.fundingSignal !== undefined}
              <div class="buzz-component">
                <span class="buzz-component-label">Funding</span>
                <div class="buzz-bar">
                  <div class="buzz-bar-fill" style="width: {hoveredNode.buzzComponents.fundingSignal * 100}%"></div>
                </div>
              </div>
            {/if}
            {#if hoveredNode.buzzComponents.mentionVelocity !== undefined}
              <div class="buzz-component">
                <span class="buzz-component-label">Mentions</span>
                <div class="buzz-bar">
                  <div class="buzz-bar-fill" style="width: {hoveredNode.buzzComponents.mentionVelocity * 100}%"></div>
                </div>
              </div>
            {/if}
            {#if hoveredNode.buzzComponents.researchDepth !== undefined}
              <div class="buzz-component">
                <span class="buzz-component-label">Research</span>
                <div class="buzz-bar">
                  <div class="buzz-bar-fill" style="width: {hoveredNode.buzzComponents.researchDepth * 100}%"></div>
                </div>
              </div>
            {/if}
          </div>
        </div>
      {/if}

      {#if hoveredNode.githubStars}
        <div class="hover-github">
          <span class="material-symbols-rounded">star</span>
          {hoveredNode.githubStars.toLocaleString()} GitHub stars
        </div>
      {/if}

      {#if hoveredNode.url}
        <div class="hover-card-url">{hoveredNode.url}</div>
      {/if}
    </div>
  {/if}

  {#if selectedEntity}
    {@const selectedBuzzTier = getBuzzTier(selectedEntity.buzzScore || 0)}
    <div class="entity-detail-panel">
      <button class="close-btn" onclick={() => selectedEntity = null} aria-label="Close panel">
        <span class="material-symbols-rounded">close</span>
      </button>

      <div class="panel-header">
        {#if selectedEntity.logoUrl}
          <div class="panel-icon panel-icon-logo">
            <img src={selectedEntity.logoUrl} alt="{selectedEntity.name} logo" />
          </div>
        {:else if selectedEntity.logoSvgContent}
          <div class="panel-icon panel-icon-logo">
            {@html selectedEntity.logoSvgContent}
          </div>
        {:else}
          <div class="panel-icon" style="background: {getEntityStyle(selectedEntity.evidenceRatio || 0).bg}">
            <span class="material-symbols-rounded">deployed_code</span>
          </div>
        {/if}
        <div class="panel-title">
          <div class="panel-badges">
            <span class="entity-type-badge">{selectedEntity.entityType || 'entity'}</span>
            {#if selectedBuzzTier.badge}
              <span class="panel-buzz-badge" style="background: {selectedBuzzTier.color}">
                {selectedBuzzTier.badge} {selectedBuzzTier.tier}
              </span>
            {/if}
          </div>
          <h3>{selectedEntity.name}</h3>
        </div>
      </div>

      {#if selectedEntity.url}
        <a href={selectedEntity.url} target="_blank" rel="noopener" class="entity-url">
          <span class="material-symbols-rounded">open_in_new</span>
          {selectedEntity.url.replace(/^https?:\/\//, '').slice(0, 35)}
        </a>
      {/if}

      <div class="panel-stats">
        <div class="panel-stat">
          <div class="panel-stat-value">{selectedEntity.assertionCount || 0}</div>
          <div class="panel-stat-label">Assertions</div>
        </div>
        <div class="panel-stat">
          <div class="panel-stat-value">{Math.round((selectedEntity.evidenceRatio || 0) * 100)}%</div>
          <div class="panel-stat-label">Validated</div>
        </div>
        {#if selectedEntity.buzzScore}
          <div class="panel-stat">
            <div class="panel-stat-value" style="color: {selectedBuzzTier.color}">{formatBuzzScore(selectedEntity.buzzScore)}</div>
            <div class="panel-stat-label">Buzz</div>
          </div>
        {/if}
      </div>

      <div class="validation-bar">
        <div class="validation-fill" style="width: {(selectedEntity.evidenceRatio || 0) * 100}%"></div>
      </div>

      {#if selectedEntity.buzzScore}
        <div class="panel-buzz-section">
          <div class="panel-buzz-header">
            <span class="material-symbols-rounded" style="color: {selectedBuzzTier.color}">trending_up</span>
            <span>Buzz Score</span>
          </div>
          <div class="panel-buzz-meter">
            <div class="panel-buzz-track">
              <div class="panel-buzz-fill" style="width: {(selectedEntity.buzzScore || 0) * 100}%; background: {selectedBuzzTier.color}"></div>
            </div>
            <span class="panel-buzz-value" style="color: {selectedBuzzTier.color}">{formatBuzzScore(selectedEntity.buzzScore)}</span>
          </div>
          {#if selectedEntity.buzzComponents}
            <div class="panel-buzz-components">
              {#if selectedEntity.buzzComponents.marketPresence !== undefined}
                <div class="panel-buzz-item">
                  <span class="material-symbols-rounded">storefront</span>
                  <span>Market: {Math.round(selectedEntity.buzzComponents.marketPresence * 100)}%</span>
                </div>
              {/if}
              {#if selectedEntity.buzzComponents.developerActivity !== undefined}
                <div class="panel-buzz-item">
                  <span class="material-symbols-rounded">code</span>
                  <span>Dev: {Math.round(selectedEntity.buzzComponents.developerActivity * 100)}%</span>
                </div>
              {/if}
              {#if selectedEntity.buzzComponents.fundingSignal !== undefined}
                <div class="panel-buzz-item">
                  <span class="material-symbols-rounded">attach_money</span>
                  <span>Funding: {Math.round(selectedEntity.buzzComponents.fundingSignal * 100)}%</span>
                </div>
              {/if}
            </div>
          {/if}
        </div>
      {/if}

      {#if selectedEntity.githubStars}
        <div class="panel-github">
          <span class="material-symbols-rounded">star</span>
          {selectedEntity.githubStars.toLocaleString()} GitHub stars
        </div>
      {/if}

      {#if selectedEntity.id}
        <a href="#/entity/{selectedEntity.id}" class="view-details-btn">
          View Full Details
          <span class="material-symbols-rounded">arrow_forward</span>
        </a>
      {/if}
    </div>
  {/if}
</div>

<style>
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200');

  .grove-container {
    position: relative;
    width: 100%;
    height: 100%;
    background: #fafaf8;
    border-radius: 12px;
    overflow: hidden;
  }

  .grove-svg {
    display: block;
  }

  /* Material Symbols */
  :global(.material-symbols-rounded) {
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

  /* Breadcrumb Navigation */
  .breadcrumb {
    position: absolute;
    top: 16px;
    left: 20px;
    display: flex;
    align-items: center;
    gap: 8px;
    z-index: 50;
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(8px);
    padding: 10px 16px;
    border-radius: 10px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
    border: 1px solid #e5e5e0;
  }

  .breadcrumb-link {
    display: flex;
    align-items: center;
    gap: 6px;
    background: none;
    border: none;
    padding: 0;
    font-family: 'DM Sans', system-ui, sans-serif;
    font-size: 13px;
    font-weight: 500;
    color: #059669;
    cursor: pointer;
    transition: color 0.15s ease;
  }

  .breadcrumb-link:hover {
    color: #047857;
  }

  .breadcrumb-link .material-symbols-rounded {
    font-size: 18px;
  }

  .breadcrumb-separator {
    font-size: 18px !important;
    color: #9a9a9a;
  }

  .breadcrumb-current {
    display: flex;
    align-items: center;
    gap: 6px;
    font-family: 'DM Sans', system-ui, sans-serif;
    font-size: 13px;
    font-weight: 600;
    color: #1a1a1a;
  }

  .breadcrumb-current .material-symbols-rounded {
    font-size: 18px;
  }

  /* Hover Card */
  .hover-card {
    position: fixed;
    top: 100px;
    right: 24px;
    background: #ffffff;
    border: 1px solid #e5e5e0;
    border-radius: 12px;
    padding: 16px 20px;
    min-width: 200px;
    z-index: 100;
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.1),
                0 1px 3px rgba(0, 0, 0, 0.08);
    animation: fadeIn 0.15s ease-out;
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-6px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .hover-card-header {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    margin-bottom: 12px;
  }

  .hover-logo {
    width: 40px;
    height: 40px;
    border-radius: 8px;
    background: #ffffff;
    border: 1px solid #e5e5e0;
    padding: 4px;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }

  .hover-logo img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  .hover-logo :global(svg) {
    width: 100%;
    height: 100%;
  }

  .hover-card-info {
    flex: 1;
    min-width: 0;
  }

  .hover-card-type {
    display: inline-block;
    font-size: 10px;
    font-family: 'DM Sans', system-ui, sans-serif;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: #7a7a7a;
    background: #f5f4f0;
    padding: 3px 8px;
    border-radius: 4px;
    margin-bottom: 6px;
  }

  .hover-card h4 {
    margin: 0;
    font-family: 'DM Sans', system-ui, sans-serif;
    font-size: 16px;
    font-weight: 600;
    color: #1a1a1a;
  }

  .hover-card-stats {
    display: flex;
    gap: 20px;
    margin-bottom: 8px;
  }

  .hover-stat {
    display: flex;
    flex-direction: column;
  }

  .hover-stat-value {
    font-family: 'DM Sans', system-ui, sans-serif;
    font-size: 20px;
    font-weight: 600;
    color: #059669;
  }

  .hover-stat-label {
    font-size: 10px;
    color: #7a7a7a;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .hover-card-url {
    font-size: 11px;
    color: #9a9a9a;
    word-break: break-all;
    font-family: 'DM Sans', system-ui, sans-serif;
  }

  /* Entity Detail Panel */
  .entity-detail-panel {
    position: absolute;
    bottom: 24px;
    right: 24px;
    width: 320px;
    background: #ffffff;
    border: 1px solid #e5e5e0;
    border-radius: 16px;
    padding: 24px;
    z-index: 100;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12),
                0 2px 8px rgba(0, 0, 0, 0.08);
    animation: slideIn 0.25s ease-out;
  }

  @keyframes slideIn {
    from { opacity: 0; transform: translateY(16px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .close-btn {
    position: absolute;
    top: 14px;
    right: 14px;
    background: #f5f4f0;
    border: none;
    border-radius: 8px;
    padding: 6px;
    cursor: pointer;
    color: #7a7a7a;
    transition: all 0.15s ease;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .close-btn .material-symbols-rounded {
    font-size: 18px;
  }

  .close-btn:hover {
    background: #eeedea;
    color: #4a4a4a;
  }

  .panel-header {
    display: flex;
    align-items: flex-start;
    gap: 14px;
    margin-bottom: 14px;
  }

  .panel-icon {
    width: 48px;
    height: 48px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .panel-icon .material-symbols-rounded {
    font-size: 24px;
    color: #ffffff;
  }

  .panel-icon-logo {
    background: #ffffff;
    border: 1px solid #e5e5e0;
    padding: 6px;
    overflow: hidden;
  }

  .panel-icon-logo img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  .panel-icon-logo :global(svg) {
    width: 100%;
    height: 100%;
  }

  .panel-title {
    flex: 1;
    min-width: 0;
  }

  .entity-type-badge {
    display: inline-block;
    font-size: 10px;
    font-family: 'DM Sans', system-ui, sans-serif;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: #059669;
    background: rgba(5, 150, 105, 0.1);
    padding: 3px 8px;
    border-radius: 4px;
    margin-bottom: 6px;
  }

  .entity-detail-panel h3 {
    margin: 0;
    font-family: 'DM Sans', system-ui, sans-serif;
    font-size: 18px;
    font-weight: 600;
    color: #1a1a1a;
    line-height: 1.3;
  }

  .entity-url {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 12px;
    color: #0284c7;
    text-decoration: none;
    font-family: 'DM Sans', system-ui, sans-serif;
    margin-bottom: 18px;
    word-break: break-all;
    transition: color 0.15s ease;
  }

  .entity-url .material-symbols-rounded {
    font-size: 16px;
  }

  .entity-url:hover {
    color: #0369a1;
  }

  .panel-stats {
    display: flex;
    gap: 28px;
    margin-bottom: 14px;
  }

  .panel-stat {
    flex: 1;
  }

  .panel-stat-value {
    font-family: 'DM Sans', system-ui, sans-serif;
    font-size: 28px;
    font-weight: 700;
    color: #1a1a1a;
    line-height: 1;
  }

  .panel-stat-label {
    font-size: 11px;
    color: #7a7a7a;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-top: 4px;
  }

  .validation-bar {
    height: 6px;
    background: #eeedea;
    border-radius: 3px;
    overflow: hidden;
    margin-bottom: 18px;
  }

  .validation-fill {
    height: 100%;
    background: linear-gradient(90deg, #059669 0%, #10b981 100%);
    border-radius: 3px;
    transition: width 0.4s ease-out;
  }

  .view-details-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    width: 100%;
    padding: 12px 18px;
    background: #059669;
    border: none;
    border-radius: 10px;
    color: #ffffff;
    text-decoration: none;
    font-family: 'DM Sans', system-ui, sans-serif;
    font-size: 13px;
    font-weight: 600;
    transition: all 0.15s ease;
  }

  .view-details-btn .material-symbols-rounded {
    font-size: 18px;
  }

  .view-details-btn:hover {
    background: #047857;
    transform: translateY(-1px);
  }

  :global(.entity-node) {
    transition: transform 0.2s ease;
  }

  :global(.category-node) {
    transition: transform 0.2s ease;
  }

  /* Buzz Badge Styles */
  .hover-card-badges {
    display: flex;
    gap: 6px;
    align-items: center;
    flex-wrap: wrap;
    margin-bottom: 6px;
  }

  .buzz-badge {
    display: inline-flex;
    align-items: center;
    gap: 3px;
    font-size: 10px;
    font-family: 'DM Sans', system-ui, sans-serif;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    color: #ffffff;
    padding: 3px 8px;
    border-radius: 4px;
    font-weight: 600;
  }

  .buzz-stat {
    border-left: 1px solid #e5e5e0;
    padding-left: 12px;
    margin-left: 8px;
  }

  /* Buzz Breakdown in Hover Card */
  .buzz-breakdown {
    margin: 12px 0;
    padding-top: 12px;
    border-top: 1px solid #f0f0ec;
  }

  .buzz-breakdown-title {
    font-size: 10px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    color: #7a7a7a;
    margin-bottom: 8px;
    font-weight: 500;
  }

  .buzz-components {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .buzz-component {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .buzz-component-label {
    font-size: 9px;
    color: #7a7a7a;
    width: 65px;
    flex-shrink: 0;
  }

  .buzz-bar {
    flex: 1;
    height: 4px;
    background: #eeedea;
    border-radius: 2px;
    overflow: hidden;
  }

  .buzz-bar-fill {
    height: 100%;
    background: linear-gradient(90deg, #059669 0%, #10b981 100%);
    border-radius: 2px;
    transition: width 0.3s ease;
  }

  /* GitHub Stars in Hover Card */
  .hover-github {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 11px;
    color: #7a7a7a;
    margin-top: 10px;
    padding-top: 10px;
    border-top: 1px solid #f0f0ec;
  }

  .hover-github .material-symbols-rounded {
    font-size: 14px;
    color: #f59e0b;
  }

  /* Panel Buzz Styles */
  .panel-badges {
    display: flex;
    gap: 6px;
    align-items: center;
    flex-wrap: wrap;
    margin-bottom: 6px;
  }

  .panel-buzz-badge {
    display: inline-flex;
    align-items: center;
    gap: 3px;
    font-size: 10px;
    font-family: 'DM Sans', system-ui, sans-serif;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    color: #ffffff;
    padding: 3px 8px;
    border-radius: 4px;
    font-weight: 600;
  }

  .panel-buzz-section {
    margin: 16px 0;
    padding: 14px;
    background: #f9f9f7;
    border-radius: 10px;
    border: 1px solid #eeedea;
  }

  .panel-buzz-header {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 12px;
    font-weight: 600;
    color: #4a4a4a;
    margin-bottom: 10px;
  }

  .panel-buzz-header .material-symbols-rounded {
    font-size: 18px;
  }

  .panel-buzz-meter {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 12px;
  }

  .panel-buzz-track {
    flex: 1;
    height: 8px;
    background: #e5e5e0;
    border-radius: 4px;
    overflow: hidden;
  }

  .panel-buzz-fill {
    height: 100%;
    border-radius: 4px;
    transition: width 0.4s ease-out;
  }

  .panel-buzz-value {
    font-size: 16px;
    font-weight: 700;
    min-width: 40px;
    text-align: right;
  }

  .panel-buzz-components {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .panel-buzz-item {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 10px;
    color: #7a7a7a;
    background: #ffffff;
    padding: 4px 8px;
    border-radius: 4px;
    border: 1px solid #eeedea;
  }

  .panel-buzz-item .material-symbols-rounded {
    font-size: 12px;
    color: #9a9a9a;
  }

  .panel-github {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 12px;
    color: #7a7a7a;
    margin-bottom: 14px;
    padding: 8px 12px;
    background: #fffbeb;
    border-radius: 6px;
    border: 1px solid #fef3c7;
  }

  .panel-github .material-symbols-rounded {
    font-size: 16px;
    color: #f59e0b;
  }
</style>
