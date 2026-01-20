<script lang="ts">
  import { onMount } from 'svelte';
  import LandingPage from './pages/LandingPage.svelte';
  import ResearchPage from './pages/ResearchPage.svelte';
  import DiscoveryPage from './pages/DiscoveryPage.svelte';
  import VisualizationPage from './pages/VisualizationPage.svelte';

  // Current route state
  let currentRoute = $state<'landing' | 'discovery' | 'research' | 'validate' | 'grove'>('landing');

  // Parse hash and set route
  function updateRoute() {
    const hash = window.location.hash.slice(1) || '/';

    if (hash === '/' || hash === '') {
      currentRoute = 'landing';
    } else if (hash.startsWith('/discovery')) {
      currentRoute = 'discovery';
    } else if (hash.startsWith('/research')) {
      currentRoute = 'research';
    } else if (hash === '/validate') {
      currentRoute = 'validate';
    } else if (hash === '/grove' || hash.startsWith('/grove')) {
      currentRoute = 'grove';
    } else {
      // Default to landing for unknown routes
      currentRoute = 'landing';
    }
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
      <h1>Validation</h1>
      <p>Validation coming soon</p>
    </div>
  {:else if currentRoute === 'grove'}
    <VisualizationPage />
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
</style>
