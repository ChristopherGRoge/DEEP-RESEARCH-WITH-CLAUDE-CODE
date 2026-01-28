<script>
  import { websocket } from '../stores/websocket';
  import { onMount } from 'svelte';
  import ConnectionStatus from '../components/ConnectionStatus.svelte';

  // Configuration state
  let topic = $state('');
  let researcherName = $state('');
  let exampleEntities = $state('');
  let selectedCategories = $state({
    pricing: true,
    features: true,
    company: true,
    compliance: true,
    integrations: true
  });
  let executionMode = $state('autonomous');

  // UI state
  let isConfiguring = $state(true);

  // Reactive copy of websocket state (updated via subscription)
  let wsState = $state(websocket.getSnapshot());

  // Derived state from websocket store (using reactive copy)
  let sessionActive = $derived(
    wsState.session.status === 'in_progress' ||
    wsState.session.status === 'paused'
  );

  let sessionComplete = $derived(
    wsState.session.status === 'completed' ||
    wsState.session.status === 'failed' ||
    wsState.session.status === 'cancelled'
  );

  let isPaused = $derived(wsState.session.status === 'paused');

  let canStartResearch = $derived(
    topic.trim().length > 0 &&
    researcherName.trim().length > 0 &&
    Object.values(selectedCategories).some(v => v)
  );

  // Reference to chat messages container for auto-scroll
  let chatContainer = $state(null);

  // Auto-scroll chat when new messages arrive
  $effect(() => {
    if (chatContainer && (wsState.coordinatorMessages.length > 0 || wsState.streamingText)) {
      setTimeout(() => {
        chatContainer.scrollTop = chatContainer.scrollHeight;
      }, 50);
    }
  });

  // Subscribe to websocket updates and connect
  onMount(() => {
    // Connect to WebSocket
    websocket.connect();

    // Subscribe to state updates
    const unsubscribe = websocket.subscribe(() => {
      wsState = websocket.getSnapshot();
    });

    return () => {
      unsubscribe();
      // Don't disconnect - keep connection alive for session
    };
  });

  // Initialize from URL params (hash-based routing) and localStorage
  onMount(() => {
    // Parse params from hash (e.g., #/research?topic=...&researcher=...)
    const hash = window.location.hash;
    const queryStart = hash.indexOf('?');
    if (queryStart !== -1) {
      const params = new URLSearchParams(hash.slice(queryStart));
      const urlTopic = params.get('topic');
      const urlResearcher = params.get('researcher');

      if (urlTopic) topic = urlTopic;
      if (urlResearcher) researcherName = urlResearcher;
    }

    // Fall back to localStorage for researcher name
    if (!researcherName) {
      researcherName = localStorage.getItem('researcherName') || '';
    }
  });

  // Save researcher name to localStorage when it changes
  function saveResearcherName() {
    if (researcherName.trim()) {
      localStorage.setItem('researcherName', researcherName);
    }
  }

  // Handle start research
  function handleStartResearch() {
    if (!canStartResearch) return;

    const categories = Object.entries(selectedCategories)
      .filter(([_, enabled]) => enabled)
      .map(([category, _]) => category);

    // Parse example entities from comma-separated string
    const examples = exampleEntities
      .split(',')
      .map(e => e.trim())
      .filter(e => e.length > 0);

    websocket.send({
      type: 'start_session',
      payload: {
        topic,
        researcher: researcherName,
        categories,
        mode: executionMode,
        exampleEntities: examples
      }
    });

    isConfiguring = false;
  }

  // Handle pause/resume
  function handlePauseResume() {
    websocket.send({
      type: isPaused ? 'resume_session' : 'pause_session'
    });
  }

  // Handle cancel
  function handleCancel() {
    if (confirm('Are you sure you want to cancel this research session?')) {
      websocket.send({
        type: 'cancel_session'
      });
    }
  }

  // Handle new research
  function handleNewResearch() {
    isConfiguring = true;
    topic = '';
    selectedCategories = {
      pricing: true,
      features: true,
      company: true,
      compliance: true,
      integrations: true
    };
    executionMode = 'autonomous';
  }

  // Format message content (markdown-like)
  function formatMessage(content) {
    if (!content) return '';
    return content
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\n/g, '<br>');
  }

  // Format timestamp
  function formatTime(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });
  }
</script>

<div class="research-page">
  <!-- Header -->
  <header class="header">
    <div class="header-brand">
      <a href="#/" class="back-link" title="Back to home">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M19 12H5M12 19l-7-7 7-7"/>
        </svg>
      </a>
      <span class="brand-text">Deep Research</span>
    </div>

    <div class="header-stats">
      {#if !isConfiguring}
        <div class="stat">
          <span class="stat-count">{wsState.progress.percent}%</span>
          <span class="stat-label">Progress</span>
        </div>
        <span class="stat-divider"></span>
        <div class="stat">
          <span class="stat-count">{wsState.progress.completed}/{wsState.progress.total}</span>
          <span class="stat-label">Tasks</span>
        </div>
      {/if}
    </div>

    <div class="header-right">
      <a href="#/grove" class="grove-link" title="View Research Grove">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M12 2v6m0 4v10M7 8h10M4 14h16"/>
        </svg>
        Grove
      </a>
      <ConnectionStatus status={wsState.connectionStatus} />
    </div>
  </header>

  <!-- Main Layout -->
  <main class="main-layout">
    {#if isConfiguring}
      <!-- Configuration View -->
      <div class="config-view">
        <div class="config-card">
          <h2>Configure Research Session</h2>
          <p class="config-subtitle">Set up your deep research parameters</p>

          <div class="form-group">
            <label for="topic">Research Topic</label>
            <textarea
              id="topic"
              bind:value={topic}
              placeholder="Describe what you want to research, e.g., AI-powered testing tools with FedRAMP potential for federal government use..."
              class="input-textarea"
              rows="3"
            ></textarea>
          </div>

          <div class="form-group">
            <label for="examples">Example Entities <span class="label-hint">(optional)</span></label>
            <input
              id="examples"
              type="text"
              bind:value={exampleEntities}
              placeholder="e.g., Claude Code, Cursor, Windsurf, GitHub Copilot"
              class="input-text"
            />
            <p class="form-hint">Comma-separated list of entities that represent the target profile for discovery</p>
          </div>

          <div class="form-row">
            <div class="form-group form-group-half">
              <label for="researcher">Researcher</label>
              <input
                id="researcher"
                type="text"
                bind:value={researcherName}
                onblur={saveResearcherName}
                placeholder="Your name"
                class="input-text"
              />
            </div>

            <div class="form-group form-group-half">
              <label>Mode</label>
              <select bind:value={executionMode} class="input-select">
                <option value="autonomous">Autonomous</option>
                <option value="interactive">Interactive</option>
              </select>
            </div>
          </div>

          <div class="form-group">
            <label>Categories</label>
            <div class="category-pills">
              {#each Object.entries(selectedCategories) as [category, enabled]}
                <label class="category-pill" class:selected={enabled}>
                  <input type="checkbox" bind:checked={selectedCategories[category]} />
                  <span>{category.charAt(0).toUpperCase() + category.slice(1)}</span>
                </label>
              {/each}
            </div>
          </div>

          <button
            class="btn-start"
            disabled={!canStartResearch}
            onclick={handleStartResearch}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polygon points="5 3 19 12 5 21 5 3"/>
            </svg>
            Start Research
          </button>
        </div>
      </div>
    {:else}
      <!-- Research View - Split Layout -->
      <div class="research-view">
        <!-- Left Panel: Tasks & Activity -->
        <aside class="sidebar">
          <!-- Session Controls -->
          <div class="session-controls">
            {#if sessionActive}
              <button class="btn-control pause" onclick={handlePauseResume}>
                {#if isPaused}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polygon points="5 3 19 12 5 21 5 3"/>
                  </svg>
                  Resume
                {:else}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="6" y="4" width="4" height="16"/>
                    <rect x="14" y="4" width="4" height="16"/>
                  </svg>
                  Pause
                {/if}
              </button>
              <button class="btn-control cancel" onclick={handleCancel}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M18 6L6 18M6 6l12 12"/>
                </svg>
                Cancel
              </button>
            {/if}
            {#if sessionComplete}
              <button class="btn-control new" onclick={handleNewResearch}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M12 5v14M5 12h14"/>
                </svg>
                New Research
              </button>
            {/if}
          </div>

          <!-- Tasks -->
          <div class="panel-section">
            <div class="panel-header">
              <h3>Research Tasks</h3>
              <span class="panel-count">{wsState.tasks.length}</span>
            </div>
            <div class="task-list">
              {#each wsState.tasks as task}
                <div class="task-item" class:in_progress={task.status === 'in_progress'} class:completed={task.status === 'completed'} class:failed={task.status === 'failed'}>
                  <div class="task-icon">
                    {#if task.status === 'in_progress'}
                      <svg class="spinning" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
                      </svg>
                    {:else if task.status === 'completed'}
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                        <path d="M20 6L9 17l-5-5"/>
                      </svg>
                    {:else if task.status === 'failed'}
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M18 6L6 18M6 6l12 12"/>
                      </svg>
                    {:else}
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="12" cy="12" r="10"/>
                      </svg>
                    {/if}
                  </div>
                  <span class="task-name">{task.category}</span>
                  <span class="task-status">{task.status === 'pending' ? 'Pending' : task.status === 'in_progress' ? 'Running' : task.status === 'completed' ? 'Done' : 'Failed'}</span>
                </div>
              {/each}
              {#if wsState.tasks.length === 0}
                <div class="empty-state">No tasks yet</div>
              {/if}
            </div>
          </div>

          <!-- Activity Feed -->
          <div class="panel-section activity-section">
            <div class="panel-header">
              <h3>Activity</h3>
            </div>
            <div class="activity-list">
              {#each wsState.activityLog.slice(0, 30) as item}
                <div class="activity-item">
                  <span class="activity-time">{formatTime(item.timestamp)}</span>
                  <span class="activity-text">{item.message}</span>
                </div>
              {/each}
              {#if wsState.activityLog.length === 0}
                <p class="empty-state">No activity yet</p>
              {/if}
            </div>
          </div>
        </aside>

        <!-- Main Content: Research Workflow -->
        <section class="workflow-panel">
          <div class="workflow-header">
            <h3>Research Workflow</h3>
            {#if wsState.session.sessionId}
              <span class="session-id">{wsState.session.sessionId}</span>
            {/if}
          </div>

          <div class="workflow-content" bind:this={chatContainer}>
            {#if wsState.streamingText}
              <!-- Live streaming update -->
              <div class="workflow-live">
                <div class="live-indicator">
                  <span class="pulse"></span>
                  <span>Live</span>
                </div>
                <div class="workflow-text">{@html formatMessage(wsState.streamingText)}</div>
              </div>
            {:else if wsState.coordinatorMessages.length > 0}
              <!-- Latest coordinator reasoning -->
              <div class="workflow-current">
                <div class="workflow-text">{@html formatMessage(wsState.coordinatorMessages[wsState.coordinatorMessages.length - 1].content)}</div>
              </div>
            {:else}
              <!-- Empty state -->
              <div class="workflow-empty">
                <p>Start a research session to see coordinator reasoning</p>
              </div>
            {/if}

            {#if wsState.coordinatorMessages.length > 1}
              <!-- Previous updates (collapsed) -->
              <details class="workflow-history">
                <summary>Previous updates ({wsState.coordinatorMessages.length - 1})</summary>
                <div class="history-list">
                  {#each wsState.coordinatorMessages.slice(0, -1).reverse() as message}
                    <div class="history-item">
                      <span class="history-time">{formatTime(message.timestamp)}</span>
                      <div class="history-text">{@html formatMessage(message.content)}</div>
                    </div>
                  {/each}
                </div>
              </details>
            {/if}
          </div>
        </section>
      </div>
    {/if}
  </main>
</div>

<style>
  /* Swiss Editorial Design - Consistent with Validation App */
  .research-page {
    width: 100%;
    min-width: 100%;
    height: 100vh;
    max-height: 100vh;
    display: flex;
    flex-direction: column;
    background: #FDFBF7;
    font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;
    color: #1a1a1a;
    overflow: hidden;
  }

  /* Header */
  .header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 56px;
    background: #FDFBF7;
    border-bottom: 1px solid #e8e5de;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 24px;
    z-index: 100;
  }

  .header-brand {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  .back-link {
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #5c5c5c;
    text-decoration: none;
    border-radius: 6px;
    transition: background 0.12s ease, color 0.12s ease;
  }

  .back-link:hover {
    background: #EFECE6;
    color: #1a1a1a;
  }

  .brand-text {
    font-family: 'Source Serif 4', Georgia, serif;
    font-size: 1.125rem;
    font-weight: 500;
    letter-spacing: -0.02em;
    color: #1a1a1a;
  }

  .header-stats {
    display: flex;
    align-items: center;
    gap: 24px;
  }

  .stat {
    display: flex;
    align-items: baseline;
    gap: 4px;
  }

  .stat-count {
    font-family: 'Source Serif 4', Georgia, serif;
    font-size: 1.25rem;
    font-weight: 600;
    color: #1a1a1a;
  }

  .stat-label {
    font-size: 0.75rem;
    color: #8a8a8a;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .stat-divider {
    width: 1px;
    height: 20px;
    background: #e8e5de;
  }

  .header-right {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  .grove-link {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 6px 12px;
    background: #dcfce7;
    border-radius: 6px;
    color: #166534;
    text-decoration: none;
    font-size: 0.875rem;
    font-weight: 500;
    transition: all 0.15s ease;
  }

  .grove-link:hover {
    background: #bbf7d0;
  }

  .grove-link svg {
    stroke: #166534;
  }

  /* Main Layout */
  .main-layout {
    flex: 1;
    display: flex;
    margin-top: 56px;
    height: calc(100vh - 56px);
    width: 100%;
    min-width: 100%;
    min-height: 0;
    overflow: hidden;
  }

  /* Configuration View */
  .config-view {
    flex: 1;
    display: flex;
    width: 100%;
    min-width: 100%;
    align-items: center;
    justify-content: center;
    padding: 48px 24px;
  }

  .config-card {
    background: #fff;
    border: 1px solid #e8e5de;
    border-radius: 12px;
    padding: 40px;
    max-width: 560px;
    width: 100%;
    box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  }

  .config-card h2 {
    font-family: 'Source Serif 4', Georgia, serif;
    font-size: 1.75rem;
    font-weight: 600;
    color: #1a1a1a;
    margin: 0 0 8px 0;
  }

  .config-subtitle {
    color: #5c5c5c;
    margin: 0 0 32px 0;
    font-size: 0.9375rem;
  }

  .form-group {
    margin-bottom: 24px;
  }

  .form-group label {
    display: block;
    margin-bottom: 8px;
    font-weight: 500;
    color: #1a1a1a;
    font-size: 0.875rem;
  }

  .label-hint {
    font-weight: 400;
    color: #8a8a8a;
    font-size: 0.8125rem;
  }

  .form-hint {
    margin: 8px 0 0 0;
    font-size: 0.75rem;
    color: #8a8a8a;
    line-height: 1.4;
  }

  .form-row {
    display: flex;
    gap: 16px;
  }

  .form-group-half {
    flex: 1;
  }

  .input-text,
  .input-textarea,
  .input-select {
    width: 100%;
    padding: 12px 16px;
    background: #F7F5F0;
    border: 1px solid transparent;
    border-radius: 8px;
    color: #1a1a1a;
    font-family: inherit;
    font-size: 0.9375rem;
    transition: border-color 0.12s ease, background 0.12s ease;
  }

  .input-text:focus,
  .input-textarea:focus,
  .input-select:focus {
    outline: none;
    background: #FDFBF7;
    border-color: #d4d0c8;
  }

  .input-text::placeholder,
  .input-textarea::placeholder {
    color: #b0b0b0;
  }

  .input-textarea {
    resize: vertical;
    min-height: 80px;
    line-height: 1.5;
  }

  .category-pills {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .category-pill {
    display: inline-flex;
    align-items: center;
    padding: 8px 16px;
    background: #F7F5F0;
    border: 1px solid transparent;
    border-radius: 20px;
    cursor: pointer;
    font-size: 0.875rem;
    color: #5c5c5c;
    transition: all 0.12s ease;
  }

  .category-pill input {
    display: none;
  }

  .category-pill:hover {
    background: #EFECE6;
  }

  .category-pill.selected {
    background: #2d2d2d;
    color: #fff;
  }

  .btn-start {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    width: 100%;
    padding: 14px 24px;
    background: #2d6a4f;
    color: #fff;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.12s ease;
    margin-top: 8px;
  }

  .btn-start:hover:not(:disabled) {
    background: #245840;
    transform: translateY(-1px);
  }

  .btn-start:disabled {
    background: #d4d0c8;
    color: #8a8a8a;
    cursor: not-allowed;
  }

  /* Research View - Split Layout */
  .research-view {
    flex: 1;
    display: flex;
    width: 100%;
    min-width: 100%;
    height: 100%;
    min-height: 0; /* Critical for nested flex overflow */
    overflow: hidden;
  }

  /* Sidebar - Narrower to give chat more prominence */
  .sidebar {
    width: 280px;
    min-width: 280px;
    background: #F7F5F0;
    border-right: 1px solid #e8e5de;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    flex-shrink: 0;
  }

  .session-controls {
    display: flex;
    gap: 8px;
    padding: 12px 16px;
    border-bottom: 1px solid #e8e5de;
  }

  .btn-control {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 8px 12px;
    font-size: 0.8125rem;
    font-weight: 500;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.12s ease;
  }

  .btn-control.pause {
    background: #fef3c7;
    color: #b45309;
  }

  .btn-control.pause:hover {
    background: #fde68a;
  }

  .btn-control.cancel {
    background: #ffe5e5;
    color: #9d4444;
  }

  .btn-control.cancel:hover {
    background: #ffcdcd;
  }

  .btn-control.new {
    background: #d8f3dc;
    color: #2d6a4f;
  }

  .btn-control.new:hover {
    background: #b7e4c7;
  }

  .panel-section {
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  .activity-section {
    flex: 1;
    min-height: 0;
  }

  .panel-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 16px;
    border-bottom: 1px solid #e8e5de;
  }

  .panel-header h3 {
    font-size: 0.75rem;
    font-weight: 600;
    color: #5c5c5c;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    margin: 0;
  }

  .panel-count {
    font-size: 0.75rem;
    color: #8a8a8a;
  }

  .task-list {
    padding: 8px;
    max-height: 240px;
    overflow-y: auto;
  }

  .task-item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 12px;
    background: #FDFBF7;
    border: 1px solid #e8e5de;
    border-radius: 6px;
    margin-bottom: 6px;
  }

  .task-item.in_progress {
    border-color: #457b9d;
    background: #f0f9ff;
  }

  .task-item.completed {
    border-color: #2d6a4f;
    background: #d8f3dc;
  }

  .task-item.failed {
    border-color: #9d4444;
    background: #ffe5e5;
  }

  .task-icon {
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #8a8a8a;
  }

  .task-item.in_progress .task-icon {
    color: #457b9d;
  }

  .task-item.completed .task-icon {
    color: #2d6a4f;
  }

  .task-item.failed .task-icon {
    color: #9d4444;
  }

  .task-icon .spinning {
    animation: spin 1.5s linear infinite;
  }

  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  .task-name {
    flex: 1;
    font-size: 0.875rem;
    font-weight: 500;
    color: #1a1a1a;
    text-transform: capitalize;
  }

  .task-status {
    font-size: 0.6875rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: #8a8a8a;
  }

  .activity-list {
    flex: 1;
    overflow-y: auto;
    padding: 0;
  }

  .activity-item {
    padding: 6px 12px;
    border-bottom: 1px solid #e8e5de;
    font-size: 0.75rem;
    line-height: 1.5;
    text-align: left;
  }

  .activity-time {
    font-family: 'JetBrains Mono', monospace;
    color: #8a8a8a;
    margin-right: 8px;
  }

  .activity-text {
    color: #1a1a1a;
    text-align: left;
  }

  .empty-state {
    padding: 24px;
    text-align: center;
    color: #8a8a8a;
    font-size: 0.875rem;
  }

  /* Workflow Panel - Main Content (Takes remaining space) */
  .workflow-panel {
    flex: 1;
    display: flex;
    flex-direction: column;
    background: #FDFBF7;
    width: calc(100% - 280px); /* Explicit width = 100% minus sidebar */
    min-width: 0;
    height: 100%;
    min-height: 0;
    overflow: hidden;
  }

  .workflow-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 24px;
    border-bottom: 1px solid #e8e5de;
    flex-shrink: 0;
  }

  .workflow-header h3 {
    font-family: 'Source Serif 4', Georgia, serif;
    font-size: 1.125rem;
    font-weight: 600;
    color: #1a1a1a;
    margin: 0;
  }

  .session-id {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.6875rem;
    color: #8a8a8a;
  }

  .workflow-content {
    flex: 1;
    width: 100%;
    min-height: 0;
    overflow-y: auto;
    overflow-x: hidden;
    padding: 24px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: stretch;
  }

  /* Live streaming indicator */
  .workflow-live {
    animation: fadeIn 0.2s ease;
  }

  .live-indicator {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 4px 10px;
    background: #fef3f2;
    border: 1px solid #fecaca;
    border-radius: 4px;
    font-size: 0.6875rem;
    font-weight: 600;
    color: #dc2626;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-bottom: 16px;
  }

  .pulse {
    width: 6px;
    height: 6px;
    background: #dc2626;
    border-radius: 50%;
    animation: pulse 1.5s ease-in-out infinite;
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.5; transform: scale(0.8); }
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  /* Current workflow text */
  .workflow-current,
  .workflow-live {
    background: #fff;
    border: 1px solid #e8e5de;
    border-radius: 8px;
    padding: 20px 24px;
    margin-bottom: 16px;
    width: 100%;
    min-width: 0;
    min-height: 200px;
    box-sizing: border-box;
    flex-shrink: 0;
  }

  .workflow-text {
    font-size: 0.9375rem;
    line-height: 1.8;
    color: #1a1a1a;
    text-align: left;
    word-wrap: break-word;
    overflow-wrap: break-word;
  }

  .workflow-text :global(strong) {
    font-weight: 600;
    color: #2d6a4f;
  }

  /* Empty state */
  .workflow-empty {
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    padding: 24px;
    color: #8a8a8a;
    font-size: 0.9375rem;
    text-align: left;
  }

  /* Previous updates (collapsible history) */
  .workflow-history {
    margin-top: 24px;
    border-top: 1px solid #e8e5de;
    padding-top: 16px;
  }

  .workflow-history summary {
    cursor: pointer;
    font-size: 0.75rem;
    font-weight: 500;
    color: #8a8a8a;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    padding: 8px 0;
    user-select: none;
  }

  .workflow-history summary:hover {
    color: #1a1a1a;
  }

  .history-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-top: 12px;
  }

  .history-item {
    padding: 12px 16px;
    background: #F7F5F0;
    border-radius: 6px;
    border-left: 3px solid #d4d0c8;
    text-align: left;
    width: 100%;
    box-sizing: border-box;
  }

  .history-time {
    display: block;
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.6875rem;
    color: #8a8a8a;
    margin-bottom: 6px;
    text-align: left;
  }

  .history-text {
    font-size: 0.8125rem;
    line-height: 1.6;
    color: #666;
    text-align: left;
  }

  /* Scrollbar */
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-track {
    background: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background: #d4d0c8;
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #b0b0b0;
  }

  /* Responsive */
  @media (max-width: 968px) {
    .research-view {
      flex-direction: column;
    }

    .sidebar {
      width: 100%;
      max-height: 300px;
      border-right: none;
      border-bottom: 1px solid #e8e5de;
    }

    .task-list {
      max-height: 150px;
    }
  }

  @media (max-width: 640px) {
    .header {
      padding: 0 16px;
    }

    .header-stats {
      display: none;
    }

    .config-view {
      padding: 24px 16px;
    }

    .config-card {
      padding: 24px;
    }

    .form-row {
      flex-direction: column;
    }

    .workflow-content {
      padding: 16px;
    }

    .workflow-current,
    .workflow-live {
      padding: 16px;
    }
  }
</style>
