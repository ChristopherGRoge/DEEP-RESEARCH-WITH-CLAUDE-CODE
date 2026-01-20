<script>
  let {
    assertion,
    onValidate = () => {},
    onReject = () => {},
    onChallenge = () => {},
    onRequestEvidence = () => {}
  } = $props();

  let showRejectInput = $state(false);
  let showChallengeInput = $state(false);
  let rejectReason = $state('');
  let challengeComment = $state('');
  let showScreenshotModal = $state(false);

  const categoryColors = {
    pricing: '#3b82f6',
    feature: '#10b981',
    integration: '#8b5cf6',
    performance: '#f59e0b',
    limitation: '#ef4444',
    comparison: '#6366f1',
    security: '#ec4899',
    compliance: '#14b8a6'
  };

  const statusColors = {
    CLAIM: '#6b7280',
    EVIDENCE: '#10b981',
    REJECTED: '#ef4444'
  };

  let confidenceColor = $derived(() => {
    if (!assertion.confidence) return '#6b7280';
    if (assertion.confidence >= 80) return '#10b981';
    if (assertion.confidence >= 60) return '#f59e0b';
    return '#ef4444';
  });

  function handleValidate() {
    onValidate(assertion.id);
  }

  function handleReject() {
    if (!showRejectInput) {
      showRejectInput = true;
      showChallengeInput = false;
      return;
    }
    if (rejectReason.trim()) {
      onReject(assertion.id, rejectReason);
      showRejectInput = false;
      rejectReason = '';
    }
  }

  function handleChallenge() {
    if (!showChallengeInput) {
      showChallengeInput = true;
      showRejectInput = false;
      return;
    }
    if (challengeComment.trim()) {
      onChallenge(assertion.id, challengeComment);
      showChallengeInput = false;
      challengeComment = '';
    }
  }

  function handleRequestEvidence() {
    onRequestEvidence(assertion.id);
  }

  function cancelReject() {
    showRejectInput = false;
    rejectReason = '';
  }

  function cancelChallenge() {
    showChallengeInput = false;
    challengeComment = '';
  }

  function toggleScreenshot() {
    showScreenshotModal = !showScreenshotModal;
  }

  function formatDate(dateString) {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  }
</script>

<div class="assertion-card">
  <div class="card-header">
    <span class="category-badge" style="background-color: {categoryColors[assertion.category] || '#6b7280'}">
      {assertion.category}
    </span>
    <span class="status-badge" style="background-color: {statusColors[assertion.status] || '#6b7280'}">
      {assertion.status}
    </span>
    {#if assertion.confidence}
      <div class="confidence-indicator">
        <div class="confidence-bar">
          <div class="confidence-fill" style="width: {assertion.confidence}%; background-color: {confidenceColor()}"></div>
        </div>
        <span class="confidence-text">{assertion.confidence}%</span>
      </div>
    {/if}
  </div>

  <div class="claim-text">
    {assertion.claim}
  </div>

  {#if assertion.source}
    <div class="source-section">
      <svg class="icon" viewBox="0 0 20 20" fill="currentColor">
        <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"></path>
        <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"></path>
      </svg>
      <a href={assertion.source} target="_blank" rel="noopener noreferrer" class="source-link">
        {new URL(assertion.source).hostname}
      </a>
    </div>
  {/if}

  {#if assertion.evidenceScreenshot}
    <div class="screenshot-section">
      <button class="screenshot-thumbnail" onclick={toggleScreenshot} type="button">
        <img src={assertion.evidenceScreenshot} alt="Evidence screenshot" />
        <div class="screenshot-overlay">
          <svg class="icon-large" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path>
            <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd"></path>
          </svg>
        </div>
      </button>
    </div>
  {/if}

  {#if assertion.validatedBy}
    <div class="validation-info">
      <svg class="icon" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
      </svg>
      <span>Validated by {assertion.validatedBy}</span>
      {#if assertion.validatedAt}
        <span class="validation-date">on {formatDate(assertion.validatedAt)}</span>
      {/if}
    </div>
  {/if}

  {#if showRejectInput}
    <div class="input-section">
      <textarea
        bind:value={rejectReason}
        placeholder="Why are you rejecting this assertion?"
        rows="3"
        class="input-textarea"
      ></textarea>
      <div class="input-actions">
        <button onclick={handleReject} class="btn btn-danger" disabled={!rejectReason.trim()}>
          Submit Rejection
        </button>
        <button onclick={cancelReject} class="btn btn-secondary">
          Cancel
        </button>
      </div>
    </div>
  {/if}

  {#if showChallengeInput}
    <div class="input-section">
      <textarea
        bind:value={challengeComment}
        placeholder="What concerns do you have? AI will reconsider."
        rows="3"
        class="input-textarea"
      ></textarea>
      <div class="input-actions">
        <button onclick={handleChallenge} class="btn btn-warning" disabled={!challengeComment.trim()}>
          Submit Challenge
        </button>
        <button onclick={cancelChallenge} class="btn btn-secondary">
          Cancel
        </button>
      </div>
    </div>
  {/if}

  {#if assertion.status === 'CLAIM'}
    <div class="action-buttons">
      <button onclick={handleValidate} class="btn btn-success" title="Mark as Evidence">
        <svg class="icon" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
        </svg>
        Validate
      </button>
      <button onclick={handleReject} class="btn btn-danger" title="Reject Assertion">
        <svg class="icon" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
        </svg>
        Reject
      </button>
      <button onclick={handleChallenge} class="btn btn-warning" title="Challenge Assertion">
        <svg class="icon" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"></path>
        </svg>
        Challenge
      </button>
      <button onclick={handleRequestEvidence} class="btn btn-info" title="Request More Evidence">
        <svg class="icon" viewBox="0 0 20 20" fill="currentColor">
          <path d="M9 9a2 2 0 114 0 2 2 0 01-4 0z"></path>
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a4 4 0 00-3.446 6.032l-2.261 2.26a1 1 0 101.414 1.415l2.261-2.261A4 4 0 1011 5z" clip-rule="evenodd"></path>
        </svg>
        Request Evidence
      </button>
    </div>
  {/if}
</div>

{#if showScreenshotModal}
  <div class="modal-backdrop" onclick={toggleScreenshot}>
    <div class="modal-content" onclick={(e) => e.stopPropagation()}>
      <button class="modal-close" onclick={toggleScreenshot} type="button">
        <svg class="icon" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
        </svg>
      </button>
      <img src={assertion.evidenceScreenshot} alt="Evidence screenshot" class="modal-image" />
    </div>
  </div>
{/if}

<style>
  .assertion-card {
    background-color: #1f2937;
    border: 1px solid #374151;
    border-radius: 8px;
    padding: 16px;
    margin-bottom: 12px;
    transition: border-color 0.2s;
  }

  .assertion-card:hover {
    border-color: #4b5563;
  }

  .card-header {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 12px;
    flex-wrap: wrap;
  }

  .category-badge,
  .status-badge {
    padding: 4px 10px;
    border-radius: 12px;
    font-size: 11px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    color: white;
  }

  .confidence-indicator {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-left: auto;
  }

  .confidence-bar {
    width: 80px;
    height: 6px;
    background-color: #374151;
    border-radius: 3px;
    overflow: hidden;
  }

  .confidence-fill {
    height: 100%;
    transition: width 0.3s ease;
  }

  .confidence-text {
    font-size: 12px;
    color: #9ca3af;
    font-weight: 500;
    min-width: 35px;
  }

  .claim-text {
    color: #f3f4f6;
    font-size: 15px;
    line-height: 1.6;
    margin-bottom: 12px;
  }

  .source-section {
    display: flex;
    align-items: center;
    gap: 6px;
    margin-bottom: 12px;
  }

  .source-link {
    color: #60a5fa;
    text-decoration: none;
    font-size: 13px;
    transition: color 0.2s;
  }

  .source-link:hover {
    color: #93c5fd;
    text-decoration: underline;
  }

  .screenshot-section {
    margin-bottom: 12px;
  }

  .screenshot-thumbnail {
    position: relative;
    display: block;
    width: 100%;
    max-width: 300px;
    border-radius: 6px;
    overflow: hidden;
    cursor: pointer;
    border: 2px solid #374151;
    transition: border-color 0.2s;
    background: transparent;
    padding: 0;
  }

  .screenshot-thumbnail:hover {
    border-color: #60a5fa;
  }

  .screenshot-thumbnail img {
    width: 100%;
    height: auto;
    display: block;
  }

  .screenshot-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.2s;
  }

  .screenshot-thumbnail:hover .screenshot-overlay {
    opacity: 1;
  }

  .validation-info {
    display: flex;
    align-items: center;
    gap: 6px;
    color: #10b981;
    font-size: 13px;
    margin-bottom: 12px;
    padding: 8px;
    background-color: rgba(16, 185, 129, 0.1);
    border-radius: 6px;
  }

  .validation-date {
    color: #9ca3af;
    margin-left: 4px;
  }

  .input-section {
    margin-top: 12px;
    padding-top: 12px;
    border-top: 1px solid #374151;
  }

  .input-textarea {
    width: 100%;
    background-color: #111827;
    border: 1px solid #374151;
    border-radius: 6px;
    padding: 10px;
    color: #f3f4f6;
    font-size: 14px;
    font-family: inherit;
    resize: vertical;
    margin-bottom: 8px;
  }

  .input-textarea:focus {
    outline: none;
    border-color: #60a5fa;
  }

  .input-textarea::placeholder {
    color: #6b7280;
  }

  .input-actions {
    display: flex;
    gap: 8px;
  }

  .action-buttons {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    margin-top: 12px;
    padding-top: 12px;
    border-top: 1px solid #374151;
  }

  .btn {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 8px 14px;
    border-radius: 6px;
    font-size: 13px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
    border: none;
    color: white;
  }

  .btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .btn-success {
    background-color: #10b981;
  }

  .btn-success:hover:not(:disabled) {
    background-color: #059669;
  }

  .btn-danger {
    background-color: #ef4444;
  }

  .btn-danger:hover:not(:disabled) {
    background-color: #dc2626;
  }

  .btn-warning {
    background-color: #f59e0b;
  }

  .btn-warning:hover:not(:disabled) {
    background-color: #d97706;
  }

  .btn-info {
    background-color: #3b82f6;
  }

  .btn-info:hover:not(:disabled) {
    background-color: #2563eb;
  }

  .btn-secondary {
    background-color: #4b5563;
  }

  .btn-secondary:hover:not(:disabled) {
    background-color: #374151;
  }

  .icon {
    width: 16px;
    height: 16px;
  }

  .icon-large {
    width: 24px;
    height: 24px;
    color: white;
  }

  .modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    padding: 20px;
  }

  .modal-content {
    position: relative;
    max-width: 90vw;
    max-height: 90vh;
    background-color: #1f2937;
    border-radius: 8px;
    padding: 20px;
  }

  .modal-close {
    position: absolute;
    top: 10px;
    right: 10px;
    background-color: #374151;
    border: none;
    border-radius: 50%;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background-color 0.2s;
    color: white;
  }

  .modal-close:hover {
    background-color: #4b5563;
  }

  .modal-image {
    max-width: 100%;
    max-height: calc(90vh - 40px);
    border-radius: 6px;
  }
</style>
