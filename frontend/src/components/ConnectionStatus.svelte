<script>
  let { status = 'disconnected' } = $props();

  function getStatusConfig(status) {
    switch(status) {
      case 'connected':
        return {
          color: '#10b981',
          label: 'Connected',
          pulse: false
        };
      case 'connecting':
        return {
          color: '#f59e0b',
          label: 'Connecting',
          pulse: true
        };
      case 'disconnected':
      default:
        return {
          color: '#ef4444',
          label: 'Disconnected',
          pulse: false
        };
    }
  }

  let config = $derived(getStatusConfig(status));
</script>

<div class="connection-status" style="--status-color: {config.color}">
  <span class="status-dot" class:pulse={config.pulse}></span>
  <span class="status-label">{config.label}</span>
</div>

<style>
  .connection-status {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 6px 12px;
    background: rgba(0, 0, 0, 0.03);
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 16px;
    font-size: 12px;
    font-weight: 600;
    color: var(--status-color);
  }

  .status-dot {
    width: 8px;
    height: 8px;
    background: var(--status-color);
    border-radius: 50%;
    flex-shrink: 0;
  }

  .status-dot.pulse {
    animation: pulse-dot 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }

  @keyframes pulse-dot {
    0%, 100% {
      opacity: 1;
      transform: scale(1);
    }
    50% {
      opacity: 0.6;
      transform: scale(0.85);
    }
  }

  .status-label {
    white-space: nowrap;
  }
</style>
