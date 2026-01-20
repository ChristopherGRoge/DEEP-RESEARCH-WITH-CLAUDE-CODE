<script>
  let {
    messages = [],
    streamingText = '',
    onSendMessage
  } = $props();

  let inputValue = $state('');
  let chatContainer;

  function handleSubmit(e) {
    e.preventDefault();
    if (inputValue.trim() && onSendMessage) {
      onSendMessage(inputValue.trim());
      inputValue = '';
    }
  }

  function scrollToBottom() {
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }

  // Scroll to bottom when messages or streaming text changes
  $effect(() => {
    // Track these values
    const _ = messages.length + streamingText.length;
    // Scroll after DOM update
    setTimeout(scrollToBottom, 0);
  });

  function formatMarkdown(text) {
    return text
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.+?)\*/g, '<em>$1</em>')
      .replace(/`(.+?)`/g, '<code>$1</code>')
      .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank">$1</a>')
      .replace(/\n/g, '<br>');
  }
</script>

<div class="chat-panel">
  <div class="chat-header">
    <h3>Coordinator Chat</h3>
  </div>

  <div class="chat-messages" bind:this={chatContainer}>
    {#if messages.length === 0 && !streamingText}
      <div class="empty-state">
        Start a conversation with the research coordinator
      </div>
    {/if}

    {#each messages as message (message)}
      <div class="message message-{message.role}">
        <div class="message-header">
          {message.role === 'user' ? 'You' : 'Coordinator'}
        </div>
        <div class="message-content">
          {@html formatMarkdown(message.content)}
        </div>
      </div>
    {/each}

    {#if streamingText}
      <div class="message message-assistant">
        <div class="message-header">
          Coordinator
          <span class="streaming-indicator">...</span>
        </div>
        <div class="message-content">
          {@html formatMarkdown(streamingText)}
        </div>
      </div>
    {/if}
  </div>

  <form class="chat-input" onsubmit={handleSubmit}>
    <input
      type="text"
      bind:value={inputValue}
      placeholder="Ask the coordinator..."
      class="input-field"
    />
    <button
      type="submit"
      class="send-button"
      disabled={!inputValue.trim()}
    >
      Send
    </button>
  </form>
</div>

<style>
  .chat-panel {
    display: flex;
    flex-direction: column;
    height: 100%;
    background: white;
    border-radius: 8px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    overflow: hidden;
  }

  .chat-header {
    padding: 16px;
    border-bottom: 1px solid #e5e7eb;
  }

  .chat-header h3 {
    margin: 0;
    font-size: 18px;
    font-weight: 600;
    color: #111827;
  }

  .chat-messages {
    flex: 1;
    overflow-y: auto;
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .empty-state {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    color: #9ca3af;
    font-size: 14px;
    padding: 32px;
  }

  .message {
    display: flex;
    flex-direction: column;
    gap: 8px;
    max-width: 80%;
  }

  .message-user {
    align-self: flex-end;
  }

  .message-assistant {
    align-self: flex-start;
  }

  .message-header {
    font-size: 12px;
    font-weight: 600;
    color: #6b7280;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .streaming-indicator {
    color: #3b82f6;
    animation: pulse 1.5s ease-in-out infinite;
  }

  @keyframes pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.4;
    }
  }

  .message-content {
    padding: 12px 16px;
    border-radius: 8px;
    font-size: 14px;
    line-height: 1.6;
  }

  .message-user .message-content {
    background: #3b82f6;
    color: white;
  }

  .message-assistant .message-content {
    background: #f3f4f6;
    color: #111827;
  }

  .message-content :global(strong) {
    font-weight: 700;
  }

  .message-content :global(em) {
    font-style: italic;
  }

  .message-content :global(code) {
    padding: 2px 6px;
    background: rgba(0, 0, 0, 0.1);
    border-radius: 3px;
    font-family: monospace;
    font-size: 13px;
  }

  .message-user .message-content :global(code) {
    background: rgba(255, 255, 255, 0.2);
  }

  .message-content :global(a) {
    color: inherit;
    text-decoration: underline;
  }

  .message-content :global(br) {
    display: block;
    content: "";
    margin-top: 8px;
  }

  .chat-input {
    display: flex;
    gap: 8px;
    padding: 16px;
    border-top: 1px solid #e5e7eb;
    background: #f9fafb;
  }

  .input-field {
    flex: 1;
    padding: 10px 16px;
    border: 1px solid #d1d5db;
    border-radius: 6px;
    font-size: 14px;
    background: white;
    color: #111827;
    outline: none;
    transition: border-color 0.15s;
  }

  .input-field:focus {
    border-color: #3b82f6;
  }

  .input-field::placeholder {
    color: #9ca3af;
  }

  .send-button {
    padding: 10px 24px;
    background: #3b82f6;
    color: white;
    border: none;
    border-radius: 6px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.15s;
  }

  .send-button:hover:not(:disabled) {
    background: #2563eb;
  }

  .send-button:disabled {
    background: #d1d5db;
    cursor: not-allowed;
  }
</style>
