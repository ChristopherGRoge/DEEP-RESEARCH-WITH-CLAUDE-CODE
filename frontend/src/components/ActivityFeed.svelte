<script>
  let { activities = [] } = $props();

  function getIcon(type) {
    switch(type) {
      case 'task': return '📋';
      case 'screenshot': return '📸';
      case 'extraction': return '🔍';
      case 'assertion': return '✓';
      case 'error': return '⚠️';
      default: return '•';
    }
  }

  function formatTime(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', { hour12: false });
  }
</script>

<div class="activity-feed">
  <div class="feed-header">
    <h3>Activity Feed</h3>
  </div>
  <div class="feed-content">
    {#if activities.length === 0}
      <div class="empty-state">No activity yet</div>
    {:else}
      {#each activities as activity (activity.timestamp)}
        <div class="activity-item">
          <span class="activity-icon">{getIcon(activity.type)}</span>
          <div class="activity-body">
            <div class="activity-message">{activity.message}</div>
            {#if activity.details}
              <div class="activity-details">{activity.details}</div>
            {/if}
            {#if activity.screenshotPath}
              <a href={activity.screenshotPath} target="_blank" class="activity-link">
                View Screenshot
              </a>
            {/if}
          </div>
          <span class="activity-time">{formatTime(activity.timestamp)}</span>
        </div>
      {/each}
    {/if}
  </div>
</div>

<style>
  .activity-feed {
    display: flex;
    flex-direction: column;
    height: 100%;
    background: white;
    border-radius: 8px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    overflow: hidden;
  }

  .feed-header {
    padding: 16px;
    border-bottom: 1px solid #e5e7eb;
  }

  .feed-header h3 {
    margin: 0;
    font-size: 18px;
    font-weight: 600;
    color: #111827;
  }

  .feed-content {
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

  .activity-item {
    display: flex;
    gap: 12px;
    padding: 12px;
    border-radius: 6px;
    margin-bottom: 4px;
    transition: background 0.15s;
  }

  .activity-item:hover {
    background: #f9fafb;
  }

  .activity-icon {
    flex-shrink: 0;
    font-size: 18px;
    width: 24px;
    text-align: center;
  }

  .activity-body {
    flex: 1;
    min-width: 0;
  }

  .activity-message {
    font-size: 14px;
    color: #111827;
    margin-bottom: 4px;
  }

  .activity-details {
    font-size: 13px;
    color: #6b7280;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .activity-link {
    display: inline-block;
    margin-top: 4px;
    font-size: 12px;
    color: #3b82f6;
    text-decoration: none;
  }

  .activity-link:hover {
    text-decoration: underline;
  }

  .activity-time {
    flex-shrink: 0;
    font-size: 12px;
    color: #9ca3af;
    font-family: monospace;
  }
</style>
