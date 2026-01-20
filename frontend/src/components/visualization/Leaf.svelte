<script lang="ts">
  /**
   * Botanical leaf SVG component for entity visualization
   * Color intensity reflects evidence validation ratio
   */

  interface Props {
    name: string;
    evidenceRatio?: number;  // 0-1, controls color saturation
    assertionCount?: number;
    size?: number;
    onClick?: () => void;
    onHover?: (hovering: boolean) => void;
  }

  let {
    name,
    evidenceRatio = 0,
    assertionCount = 0,
    size = 40,
    onClick,
    onHover
  }: Props = $props();

  // Calculate leaf color based on evidence ratio
  // More validated = greener, less = more yellow/brown
  const getLeafColor = (ratio: number) => {
    // Interpolate from pale yellow-green to rich green
    const hue = 80 + (ratio * 40);  // 80 (yellow-green) to 120 (green)
    const saturation = 30 + (ratio * 50);  // 30% to 80%
    const lightness = 55 - (ratio * 15);   // 55% to 40%
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  };

  const leafColor = $derived(getLeafColor(evidenceRatio));
  const veinColor = $derived(`hsl(${80 + (evidenceRatio * 40)}, ${40 + (evidenceRatio * 30)}%, ${35 - (evidenceRatio * 10)}%)`);

  // Scale leaf size slightly based on assertion count (subtle)
  const scale = $derived(1 + Math.min(assertionCount * 0.02, 0.3));
  const scaledSize = $derived(size * scale);

  let hovering = $state(false);
</script>

<g
  class="leaf-node"
  class:hovering
  role="button"
  tabindex="0"
  onclick={onClick}
  onmouseenter={() => { hovering = true; onHover?.(true); }}
  onmouseleave={() => { hovering = false; onHover?.(false); }}
  onkeydown={(e) => e.key === 'Enter' && onClick?.()}
>
  <!-- Leaf shape -->
  <svg
    width={scaledSize}
    height={scaledSize * 1.2}
    viewBox="0 0 100 120"
    style="overflow: visible; transform-origin: center bottom;"
  >
    <!-- Drop shadow on hover -->
    {#if hovering}
      <filter id="leaf-shadow-{name.replace(/\s/g, '-')}" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="2" dy="4" stdDeviation="3" flood-opacity="0.3"/>
      </filter>
    {/if}

    <!-- Main leaf body -->
    <path
      d="M50 8
         Q85 35 75 75
         Q60 100 50 108
         Q40 100 25 75
         Q15 35 50 8"
      fill={leafColor}
      stroke={veinColor}
      stroke-width="1.5"
      filter={hovering ? `url(#leaf-shadow-${name.replace(/\s/g, '-')})` : undefined}
      class="leaf-body"
    />

    <!-- Central vein -->
    <path
      d="M50 12 Q50 55 50 105"
      stroke={veinColor}
      stroke-width="2"
      fill="none"
      class="leaf-vein"
    />

    <!-- Side veins -->
    <g stroke={veinColor} stroke-width="1" fill="none" opacity="0.7">
      <path d="M50 30 Q65 35 72 45" />
      <path d="M50 30 Q35 35 28 45" />
      <path d="M50 50 Q68 52 73 62" />
      <path d="M50 50 Q32 52 27 62" />
      <path d="M50 70 Q62 72 68 80" />
      <path d="M50 70 Q38 72 32 80" />
    </g>

    <!-- Stem -->
    <path
      d="M50 108 Q50 112 48 118"
      stroke={veinColor}
      stroke-width="2.5"
      fill="none"
      stroke-linecap="round"
    />
  </svg>

  <!-- Label (shown on hover) -->
  {#if hovering}
    <g class="leaf-label" transform="translate(0, {scaledSize * 1.3})">
      <rect
        x="-5"
        y="-2"
        width={Math.max(name.length * 6.5 + 10, 50)}
        height="18"
        rx="4"
        fill="rgba(0,0,0,0.8)"
      />
      <text
        x="0"
        y="11"
        fill="white"
        font-size="11"
        font-family="Inter, system-ui, sans-serif"
      >
        {name}
      </text>
    </g>
  {/if}
</g>

<style>
  .leaf-node {
    cursor: pointer;
    transition: transform 0.2s ease;
  }

  .leaf-node:focus {
    outline: none;
  }

  .leaf-node:focus .leaf-body {
    stroke-width: 3;
  }

  .leaf-node.hovering {
    transform: scale(1.1) translateY(-3px);
  }

  .leaf-body {
    transition: fill 0.3s ease, stroke-width 0.2s ease;
  }

  .leaf-vein {
    transition: stroke 0.3s ease;
  }

  .leaf-label {
    pointer-events: none;
  }
</style>
