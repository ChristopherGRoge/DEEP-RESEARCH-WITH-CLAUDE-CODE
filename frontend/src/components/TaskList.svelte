<script>
  let { tasks = [], onRetry } = $props();

  function getStatusClass(status) {
    switch(status) {
      case 'PENDING': return 'status-pending';
      case 'IN_PROGRESS': return 'status-progress';
      case 'COMPLETED': return 'status-completed';
      case 'FAILED': return 'status-failed';
      default: return 'status-pending';
    }
  }

  function getStatusLabel(status) {
    switch(status) {
      case 'PENDING': return 'Pending';
      case 'IN_PROGRESS': return 'In Progress';
      case 'COMPLETED': return 'Completed';
      case 'FAILED': return 'Failed';
      default: return status;
    }
  }

  function handleRetry(taskId) {
    if (onRetry) {
      onRetry(taskId);
    }
  }
</script>

<div class="task-list">
  <div class="list-header">
    <h3>Research Tasks</h3>
    <span class="task-count">{tasks.length}</span>
  </div>
  <div class="list-content">
    {#if tasks.length === 0}
      <div class="empty-state">No tasks yet</div>
    {:else}
      {#each tasks as task (task.id)}
        <div class="task-item">
          <div class="task-header">
            <span class="task-category">{task.category}</span>
            <span class="task-status {getStatusClass(task.status)}">
              {getStatusLabel(task.status)}
            </span>
          </div>

          {#if task.status === 'IN_PROGRESS' && task.progress !== undefined}
            <div class="progress-bar">
              <div class="progress-fill" style="width: {task.progress}%"></div>
            </div>
            <div class="progress-text">{task.progress}%</div>
          {/if}

          {#if task.results}
            <div class="task-results">
              {#if task.results.assertionsCreated}
                <span class="result-badge">
                  {task.results.assertionsCreated} assertions
                </span>
              {/if}
              {#if task.results.screenshotPath}
                <span class="result-badge">Screenshot captured</span>
              {/if}
              {#if task.results.extractionId}
                <span class="result-badge">Data extracted</span>
              {/if}
            </div>
          {/if}

          {#if task.error}
            <div class="task-error">
              {task.error}
              {#if task.status === 'FAILED'}
                <button
                  class="retry-button"
                  onclick={() => handleRetry(task.id)}
                >
                  Retry
                </button>
              {/if}
            </div>
          {/if}
        </div>
      {/each}
    {/if}
  </div>
</div>

<style>
  .task-list {
    display: flex;
    flex-direction: column;
    height: 100%;
    background: white;
    border-radius: 8px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    overflow: hidden;
  }

  .list-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px;
    border-bottom: 1px solid #e5e7eb;
  }

  .list-header h3 {
    margin: 0;
    font-size: 18px;
    font-weight: 600;
    color: #111827;
  }

  .task-count {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 24px;
    height: 24px;
    padding: 0 8px;
    background: #e5e7eb;
    border-radius: 12px;
    font-size: 12px;
    font-weight: 600;
    color: #4b5563;
  }

  .list-content {
    flex: 1;
    overflow-y: auto;
    padding: 8px;
  }

  .empty-state {
    padding: 32px;
    text-align: center;
    color: #9ca3af;
    font-size: 14px;
  }

  .task-item {
    padding: 16px;
    border: 1px solid #e5e7eb;
    border-radius: 6px;
    margin-bottom: 8px;
    background: white;
    transition: box-shadow 0.15s;
  }

  .task-item:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  }

  .task-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 8px;
  }

  .task-category {
    font-size: 14px;
    font-weight: 600;
    color: #111827;
    text-transform: capitalize;
  }

  .task-status {
    padding: 4px 12px;
    border-radius: 12px;
    font-size: 12px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .status-pending {
    background: #f3f4f6;
    color: #6b7280;
  }

  .status-progress {
    background: #dbeafe;
    color: #1e40af;
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }

  .status-completed {
    background: #d1fae5;
    color: #065f46;
  }

  .status-failed {
    background: #fee2e2;
    color: #991b1b;
  }

  @keyframes pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.7;
    }
  }

  .progress-bar {
    height: 4px;
    background: #e5e7eb;
    border-radius: 2px;
    overflow: hidden;
    margin-bottom: 4px;
  }

  .progress-fill {
    height: 100%;
    background: #3b82f6;
    transition: width 0.3s ease;
  }

  .progress-text {
    font-size: 12px;
    color: #6b7280;
    text-align: right;
    margin-bottom: 8px;
  }

  .task-results {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin-top: 8px;
  }

  .result-badge {
    display: inline-block;
    padding: 4px 8px;
    background: #f0fdf4;
    border: 1px solid #bbf7d0;
    border-radius: 4px;
    font-size: 12px;
    color: #15803d;
  }

  .task-error {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    margin-top: 8px;
    padding: 8px 12px;
    background: #fef2f2;
    border: 1px solid #fecaca;
    border-radius: 4px;
    font-size: 13px;
    color: #991b1b;
  }

  .retry-button {
    padding: 4px 12px;
    background: #dc2626;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.15s;
  }

  .retry-button:hover {
    background: #b91c1c;
  }
</style>
