<script lang="ts">
  import { onMount } from 'svelte';
  import LandingPage from './pages/LandingPage.svelte';
  import ResearchPage from './pages/ResearchPage.svelte';
  import DiscoveryPage from './pages/DiscoveryPage.svelte';
  import VisualizationPage from './pages/VisualizationPage.svelte';
  import EntityDetailPage from './components/visualization/EntityDetailPage.svelte';

  // Current route state
  let currentRoute = $state<'landing' | 'discovery' | 'research' | 'validate' | 'grove' | 'entity'>('landing');
  let entityId = $state<string | null>(null);

  // Parse hash and set route
  function updateRoute() {
    const hash = window.location.hash.slice(1) || '/';

    if (hash === '/' || hash === '') {
      currentRoute = 'landing';
      entityId = null;
    } else if (hash.startsWith('/discovery')) {
      currentRoute = 'discovery';
      entityId = null;
    } else if (hash.startsWith('/research')) {
      currentRoute = 'research';
      entityId = null;
    } else if (hash === '/validate') {
      currentRoute = 'validate';
      entityId = null;
    } else if (hash.startsWith('/entity/')) {
      currentRoute = 'entity';
      entityId = hash.replace('/entity/', '');
    } else if (hash === '/grove' || hash.startsWith('/grove')) {
      currentRoute = 'grove';
      entityId = null;
    } else {
      // Default to landing for unknown routes
      currentRoute = 'landing';
      entityId = null;
    }
  }

  function navigateToGrove() {
    window.location.hash = '#/grove';
  }

  // Initialize on mount and listen for hash changes
  onMount(() => {
    updateRoute();
    window.addEventListener('hashchange', updateRoute);

    return () => {
      window.removeEventListener('hashchange', updateRoute);
    };
  });
</script>

<main>
  {#if currentRoute === 'landing'}
    <LandingPage />
  {:else if currentRoute === 'discovery'}
    <DiscoveryPage />
  {:else if currentRoute === 'research'}
    <ResearchPage />
  {:else if currentRoute === 'validate'}
    <div class="placeholder">
      <div class="placeholder-nav">
        <a href="#/" class="placeholder-link">Home</a>
        <span class="placeholder-divider">|</span>
        <a href="#/grove" class="placeholder-link grove">Grove</a>
      </div>
      <h1>Validation</h1>
      <p>Validation dashboard coming soon</p>
    </div>
  {:else if currentRoute === 'grove'}
    <VisualizationPage />
  {:else if currentRoute === 'entity' && entityId}
    <EntityDetailPage entityId={entityId} onBack={navigateToGrove} />
  {/if}
</main>

<style>
  main {
    min-height: 100vh;
  }

  .placeholder {
    max-width: 1280px;
    margin: 0 auto;
    padding: 2rem;
    text-align: center;
  }

  .placeholder h1 {
    font-size: 3.2em;
    line-height: 1.1;
    color: #646cff;
  }

  .placeholder-nav {
    display: flex;
    gap: 1rem;
    justify-content: center;
    margin-bottom: 2rem;
  }

  .placeholder-link {
    padding: 0.5rem 1rem;
    background: #f5f5f3;
    border-radius: 6px;
    color: #666;
    text-decoration: none;
    font-weight: 500;
    transition: all 0.15s ease;
  }

  .placeholder-link:hover {
    background: #e8e8e5;
    color: #1a1a1a;
  }

  .placeholder-link.grove {
    background: #dcfce7;
    color: #166534;
  }

  .placeholder-link.grove:hover {
    background: #bbf7d0;
  }

  .placeholder-divider {
    color: #e5e5e5;
    align-self: center;
  }
</style>
