<script>
  let {
    progress = {
      overallPercent: 0,
      completedTasks: 0,
      totalTasks: 0,
      failedTasks: 0,
      totalAssertions: 0,
      totalScreenshots: 0,
      totalExtractions: 0
    },
    sessionStatus = 'idle'
  } = $props();

  let percent = $derived(progress.overallPercent || 0);

  function getStatusInfo(status) {
    switch(status) {
      case 'active':
        return { label: 'Research Active', color: '#3b82f6' };
      case 'paused':
        return { label: 'Paused', color: '#f59e0b' };
      case 'completed':
        return { label: 'Completed', color: '#10b981' };
      case 'error':
        return { label: 'Error', color: '#ef4444' };
      default:
        return { label: 'Idle', color: '#6b7280' };
    }
  }

  let statusInfo = $derived(getStatusInfo(sessionStatus));
</script>

<div class="progress-header">
  <div class="header-top">
    <h1>Research Session</h1>
    <div class="session-status" style="--status-color: {statusInfo.color}">
      <span class="status-dot"></span>
      {statusInfo.label}
    </div>
  </div>

  <div class="progress-section">
    <div class="progress-label">
      <span>Overall Progress</span>
      <span class="progress-percent">{percent.toFixed(0)}%</span>
    </div>
    <div class="progress-bar">
      <div
        class="progress-fill"
        style="width: {percent}%"
      ></div>
    </div>
    <div class="progress-detail">
      {progress.completedTasks} of {progress.totalTasks} tasks completed
      {#if progress.failedTasks > 0}
        <span class="failed-count">({progress.failedTasks} failed)</span>
      {/if}
    </div>
  </div>

  <div class="stats-grid">
    <div class="stat-card">
      <div class="stat-value">{progress.totalAssertions}</div>
      <div class="stat-label">Assertions</div>
    </div>
    <div class="stat-card">
      <div class="stat-value">{progress.totalScreenshots}</div>
      <div class="stat-label">Screenshots</div>
    </div>
    <div class="stat-card">
      <div class="stat-value">{progress.totalExtractions}</div>
      <div class="stat-label">Extractions</div>
    </div>
    <div class="stat-card">
      <div class="stat-value">{progress.completedTasks}</div>
      <div class="stat-label">Completed</div>
    </div>
  </div>
</div>

<style>
  .progress-header {
    background: white;
    border-radius: 8px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    padding: 24px;
  }

  .header-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 24px;
  }

  .header-top h1 {
    margin: 0;
    font-size: 24px;
    font-weight: 700;
    color: #111827;
  }

  .session-status {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 16px;
    background: #f9fafb;
    border: 1px solid #e5e7eb;
    border-radius: 20px;
    font-size: 14px;
    font-weight: 600;
    color: var(--status-color);
  }

  .status-dot {
    width: 8px;
    height: 8px;
    background: var(--status-color);
    border-radius: 50%;
    animation: pulse-dot 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }

  @keyframes pulse-dot {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }

  .progress-section {
    margin-bottom: 24px;
  }

  .progress-label {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 8px;
    font-size: 14px;
    font-weight: 600;
    color: #374151;
  }

  .progress-percent {
    font-size: 20px;
    color: #111827;
  }

  .progress-bar {
    height: 12px;
    background: #e5e7eb;
    border-radius: 6px;
    overflow: hidden;
    margin-bottom: 8px;
  }

  .progress-fill {
    height: 100%;
    background: linear-gradient(90deg, #3b82f6 0%, #2563eb 100%);
    border-radius: 6px;
    transition: width 0.5s ease;
  }

  .progress-detail {
    font-size: 13px;
    color: #6b7280;
  }

  .failed-count {
    color: #dc2626;
    font-weight: 600;
  }

  .stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: 16px;
  }

  .stat-card {
    padding: 16px;
    background: #f9fafb;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    text-align: center;
  }

  .stat-value {
    font-size: 28px;
    font-weight: 700;
    color: #111827;
    margin-bottom: 4px;
  }

  .stat-label {
    font-size: 12px;
    font-weight: 600;
    color: #6b7280;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
</style>
