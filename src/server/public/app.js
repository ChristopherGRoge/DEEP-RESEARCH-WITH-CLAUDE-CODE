/**
 * Validation App - Alpine.js Application
 */

function validationApp() {
  return {
    // State
    ws: null,
    wsConnected: false,
    sessionActive: false,
    sessionId: null,
    validatorName: '',
    selectedProject: '',
    projects: [],

    // Chat state - per assertion conversations and status
    // Status: 'not_started' | 'in_progress' | 'validated' | 'rejected'
    conversations: {}, // Map of assertionId -> { messages: [], currentStreamText: '', status: string }
    userInput: '',
    isStreaming: false,
    currentStreamText: '',

    // Queue stats
    pendingCounts: {
      critical: 0,
      high: 0,
      medium: 0,
      low: 0,
      total: 0,
    },

    // Assertions by project (topic)
    assertionsByProject: [],
    currentAssertionId: null,
    currentAssertion: null,

    // Auth
    authStatus: {
      method: 'checking',
      valid: false,
      details: 'Checking authentication...',
    },

    // Modal
    showRejectModal: false,
    rejectReason: '',

    // Action selection
    selectedAction: 'validate',

    // Screenshot state
    pendingScreenshot: null, // { file: File, preview: string }
    isUploadingScreenshot: false,

    // Initialize
    async init() {
      // Load projects
      await this.loadProjects();

      // Check auth status
      await this.checkAuth();

      // Connect WebSocket
      this.connectWebSocket();

      // Load pending counts and assertions
      await this.loadPendingCounts();
      await this.loadAssertionsByProject();

      // Restore validator name from localStorage
      const savedName = localStorage.getItem('validatorName');
      if (savedName) {
        this.validatorName = savedName;
      }

      // Restore conversations from localStorage
      this.loadConversationsFromStorage();
    },

    // Save conversations to localStorage
    saveConversationsToStorage() {
      try {
        const data = JSON.stringify(this.conversations);
        localStorage.setItem('validation-conversations', data);
      } catch (e) {
        console.error('Failed to save conversations:', e);
      }
    },

    // Load conversations from localStorage
    loadConversationsFromStorage() {
      try {
        const data = localStorage.getItem('validation-conversations');
        if (data) {
          this.conversations = JSON.parse(data);
        }
      } catch (e) {
        console.error('Failed to load conversations:', e);
        this.conversations = {};
      }
    },

    // Auto-grow textarea as user types
    autoGrow(event) {
      const textarea = event.target;
      textarea.style.height = 'auto';
      textarea.style.height = Math.min(textarea.scrollHeight, 150) + 'px';
    },

    // Handle paste event for screenshots
    handlePaste(event) {
      const items = event.clipboardData?.items;
      if (!items) return;

      for (const item of items) {
        if (item.type.startsWith('image/')) {
          event.preventDefault();
          const file = item.getAsFile();
          if (file) {
            this.setPendingScreenshot(file);
          }
          return;
        }
      }
    },

    // Set pending screenshot with preview
    setPendingScreenshot(file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.pendingScreenshot = {
          file: file,
          preview: e.target.result,
        };
      };
      reader.readAsDataURL(file);
    },

    // Clear pending screenshot
    clearPendingScreenshot() {
      this.pendingScreenshot = null;
    },

    // Upload screenshot as evidence
    async uploadScreenshot() {
      if (!this.pendingScreenshot || !this.currentAssertionId) return null;

      this.isUploadingScreenshot = true;

      try {
        const formData = new FormData();
        formData.append('screenshot', this.pendingScreenshot.file);

        const res = await fetch(`/api/assertions/${this.currentAssertionId}/evidence`, {
          method: 'POST',
          body: formData,
        });

        const data = await res.json();

        if (data.success) {
          // Add to conversation
          const conv = this.ensureConversation(this.currentAssertionId);
          conv.messages.push({
            role: 'evidence',
            content: data.data.url,
            type: 'screenshot',
          });
          this.saveConversationsToStorage();

          this.pendingScreenshot = null;
          return data.data.url;
        } else {
          console.error('Failed to upload screenshot:', data.error);
          return null;
        }
      } catch (error) {
        console.error('Failed to upload screenshot:', error);
        return null;
      } finally {
        this.isUploadingScreenshot = false;
      }
    },

    // Check auth status
    async checkAuth() {
      try {
        const res = await fetch('/api/auth/status');
        this.authStatus = await res.json();
      } catch (error) {
        console.error('Failed to check auth:', error);
        this.authStatus = {
          method: 'error',
          valid: false,
          details: 'Failed to check authentication',
        };
      }
    },

    // Load projects
    async loadProjects() {
      try {
        const res = await fetch('/api/projects');
        const data = await res.json();
        if (data.success) {
          this.projects = data.data;
        }
      } catch (error) {
        console.error('Failed to load projects:', error);
      }
    },

    // Load pending counts
    async loadPendingCounts() {
      try {
        const params = this.selectedProject ? `?projectId=${this.selectedProject}` : '';
        const res = await fetch(`/api/assertions/pending${params}`);
        const data = await res.json();
        if (data.success) {
          this.pendingCounts = data.data.counts;
        }
      } catch (error) {
        console.error('Failed to load pending counts:', error);
      }
    },

    // Load assertions grouped by project
    async loadAssertionsByProject() {
      try {
        const params = this.selectedProject ? `?projectId=${this.selectedProject}` : '';
        const res = await fetch(`/api/assertions/by-project${params}`);
        const data = await res.json();
        if (data.success) {
          // Add expanded state to each group
          this.assertionsByProject = data.data.map(group => ({
            ...group,
            expanded: true, // Default expanded
          }));
        }
      } catch (error) {
        console.error('Failed to load assertions:', error);
        this.assertionsByProject = [];
      }
    },

    // Get current conversation messages
    get chatMessages() {
      if (!this.currentAssertionId) return [];
      const conv = this.conversations[this.currentAssertionId];
      return conv ? conv.messages : [];
    },

    // Initialize conversation for an assertion if needed
    ensureConversation(assertionId) {
      if (!this.conversations[assertionId]) {
        this.conversations[assertionId] = {
          messages: [],
          currentStreamText: '',
          status: 'not_started',
        };
      }
      return this.conversations[assertionId];
    },

    // Get assertion status - checks conversation first, then falls back to database status
    // Can pass optional dbStatus from the assertion object for efficiency
    getAssertionStatus(assertionId, dbStatus = null) {
      // First check if we have a conversation with status
      const conv = this.conversations[assertionId];
      if (conv && conv.status !== 'not_started') {
        return conv.status;
      }

      // Use provided database status or look it up
      const status = dbStatus || this.findAssertionDbStatus(assertionId);
      if (status === 'EVIDENCE') return 'validated';
      if (status === 'REJECTED') return 'rejected';

      return conv ? conv.status : 'not_started';
    },

    // Find assertion database status by ID
    findAssertionDbStatus(assertionId) {
      for (const group of this.assertionsByProject) {
        const found = group.assertions.find(a => a.id === assertionId);
        if (found) return found.status;
      }
      return null;
    },

    // Get status label for display
    getStatusLabel(assertionId, dbStatus = null) {
      const status = this.getAssertionStatus(assertionId, dbStatus);
      const labels = {
        'not_started': 'Not Started',
        'in_progress': 'In Progress',
        'validated': 'Validated',
        'rejected': 'Rejected',
      };
      return labels[status] || status;
    },

    // Start validation for the current assertion
    async startAssertionValidation() {
      if (!this.currentAssertionId || !this.validatorName.trim()) return;

      // Save validator name
      localStorage.setItem('validatorName', this.validatorName);

      // Ensure conversation exists and set to in_progress
      const conv = this.ensureConversation(this.currentAssertionId);
      conv.status = 'in_progress';

      // Connect WebSocket if not connected
      if (!this.wsConnected) {
        this.connectWebSocket();
        // Wait for connection
        await new Promise(resolve => setTimeout(resolve, 500));
      }

      // Start a session with the specific assertionId
      // The session's initial prompt will tell Claude to fetch this assertion
      this.sendWs({
        type: 'start_session',
        validatorName: this.validatorName.trim(),
        assertionId: this.currentAssertionId,
      });
    },

    // Select an assertion to validate
    selectAssertion(assertion) {
      // Save any streaming content to previous conversation
      if (this.currentAssertionId && this.isStreaming && this.currentStreamText) {
        const prevConv = this.conversations[this.currentAssertionId];
        if (prevConv) {
          prevConv.currentStreamText = this.currentStreamText;
        }
      }

      this.currentAssertionId = assertion.id;
      this.currentAssertion = assertion;

      // Ensure conversation exists and restore streaming state
      const conv = this.ensureConversation(assertion.id);
      this.currentStreamText = conv.currentStreamText || '';

      this.scrollToBottom();
    },

    // Truncate text helper
    truncate(text, maxLength) {
      if (!text) return '';
      if (text.length <= maxLength) return text;
      return text.substring(0, maxLength) + '...';
    },

    // Check if assertion has a conversation started
    hasConversation(assertionId) {
      const conv = this.conversations[assertionId];
      return conv && conv.messages && conv.messages.length > 0;
    },

    // WebSocket Connection
    connectWebSocket() {
      const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
      const wsUrl = `${protocol}//${window.location.host}/ws/validation`;

      this.ws = new WebSocket(wsUrl);

      this.ws.onopen = () => {
        console.log('WebSocket connected');
        this.wsConnected = true;
      };

      this.ws.onclose = () => {
        console.log('WebSocket disconnected');
        this.wsConnected = false;
        this.sessionActive = false;

        // Reconnect after delay
        setTimeout(() => this.connectWebSocket(), 3000);
      };

      this.ws.onerror = (error) => {
        console.error('WebSocket error:', error);
      };

      this.ws.onmessage = (event) => {
        this.handleMessage(JSON.parse(event.data));
      };
    },

    // Handle incoming WebSocket messages
    handleMessage(msg) {
      switch (msg.type) {
        case 'auth_status':
          this.authStatus = {
            method: msg.method,
            valid: msg.valid,
            details: msg.details,
          };
          break;

        case 'session_started':
          this.sessionId = msg.sessionId;
          this.sessionActive = true;
          // Don't clear conversations - they persist across session restarts
          localStorage.setItem('validatorName', this.validatorName);
          break;

        case 'assistant_chunk':
          // Streaming text - add to current assertion's conversation
          if (!this.isStreaming) {
            this.isStreaming = true;
            this.currentStreamText = '';
          }
          this.currentStreamText += msg.text;
          // Also update the conversation's stream text
          if (this.currentAssertionId) {
            const conv = this.ensureConversation(this.currentAssertionId);
            conv.currentStreamText = this.currentStreamText;
          }
          this.scrollToBottom();
          break;

        case 'assistant_message':
          // Complete message - add to current assertion's conversation
          if (this.currentAssertionId) {
            const conv = this.ensureConversation(this.currentAssertionId);
            if (this.isStreaming) {
              // Flush streaming content
              conv.messages.push({
                role: 'assistant',
                content: this.currentStreamText,
              });
              this.currentStreamText = '';
              conv.currentStreamText = '';
              this.isStreaming = false;
            } else {
              conv.messages.push({
                role: 'assistant',
                content: msg.content,
              });
            }
            this.saveConversationsToStorage();
          }
          this.scrollToBottom();
          break;

        case 'assistant_complete':
          if (this.currentAssertionId) {
            const conv = this.ensureConversation(this.currentAssertionId);
            if (this.isStreaming && this.currentStreamText) {
              conv.messages.push({
                role: 'assistant',
                content: this.currentStreamText,
              });
              this.currentStreamText = '';
              conv.currentStreamText = '';
            }
            this.saveConversationsToStorage();
          }
          this.isStreaming = false;
          // Refresh counts after each completion
          this.loadPendingCounts();
          this.loadAssertionsByProject();
          break;

        case 'result':
          this.isStreaming = false;
          if (!msg.success) {
            this.chatMessages.push({
              role: 'system',
              content: 'Session ended with errors.',
            });
          }
          break;

        case 'error':
          this.chatMessages.push({
            role: 'system',
            content: `Error: ${msg.message}`,
          });
          this.isStreaming = false;
          break;

        case 'pong':
          // Heartbeat response
          break;

        default:
          console.log('Unknown message type:', msg.type);
      }
    },

    // Start validation session
    startSession() {
      if (!this.validatorName.trim()) {
        alert('Please enter your name');
        return;
      }

      if (!this.authStatus.valid) {
        alert('Authentication required. Run `claude login` or set ANTHROPIC_API_KEY');
        return;
      }

      this.sendWs({
        type: 'start_session',
        projectId: this.selectedProject || undefined,
        validatorName: this.validatorName.trim(),
      });
    },

    // End session
    endSession() {
      this.sendWs({ type: 'interrupt' });
      this.sessionActive = false;
      this.sessionId = null;
    },

    // Send user message (question)
    sendMessage() {
      const content = this.userInput.trim();
      if (!content || !this.currentAssertionId) return;

      const conv = this.ensureConversation(this.currentAssertionId);
      if (conv.status !== 'in_progress') return;

      // Add to current assertion's conversation
      conv.messages.push({
        role: 'user',
        content: content,
      });
      this.saveConversationsToStorage();

      this.sendWs({
        type: 'user_message',
        content: `[Assertion ${this.currentAssertionId}] ${content}`,
      });

      this.userInput = '';
      this.scrollToBottom();
    },

    // Send action (validate/reject/skip)
    sendAction(action) {
      if (!this.sessionActive) return;

      const actionText = {
        validate: 'Validating...',
        reject: 'Rejecting...',
        skip: 'Skipping...',
      };

      this.chatMessages.push({
        role: 'user',
        content: actionText[action] || action,
      });

      this.sendWs({
        type: 'action',
        action: action,
      });

      this.scrollToBottom();
    },

    // Submit with action - requires verification text
    async submitWithAction(action) {
      const verificationText = this.userInput.trim();
      if (!verificationText || !this.currentAssertionId) return;

      const conv = this.ensureConversation(this.currentAssertionId);
      if (conv.status !== 'in_progress') return;

      // Upload pending screenshot first if one exists
      let screenshotUrl = null;
      if (this.pendingScreenshot) {
        screenshotUrl = await this.uploadScreenshot();
      }

      // Build message with verification and action
      const actionLabels = {
        validate: 'VALIDATE',
        reject: 'REJECT',
        skip: 'SKIP',
      };

      const actionLabel = actionLabels[action] || action.toUpperCase();
      const fullMessage = `[${actionLabel}] ${verificationText}`;

      // Add to current assertion's conversation
      conv.messages.push({
        role: 'user',
        content: fullMessage,
      });

      // Update status based on action
      if (action === 'validate') {
        conv.status = 'validated';
      } else if (action === 'reject') {
        conv.status = 'rejected';
      }
      // 'skip' keeps it in_progress

      this.saveConversationsToStorage();

      // Build message content, include screenshot if uploaded
      let messageContent = `[Assertion ${this.currentAssertionId}] ${fullMessage}`;
      if (screenshotUrl) {
        messageContent += `\n[Evidence screenshot: ${screenshotUrl}]`;
      }

      // Send as user message with assertion context
      this.sendWs({
        type: 'user_message',
        content: messageContent,
      });

      // Also send action for tool invocation
      this.sendWs({
        type: 'action',
        action: action,
        assertionId: this.currentAssertionId,
        reason: verificationText,
      });

      // Clear input and update state
      this.userInput = '';
      this.selectedAction = action;
      this.scrollToBottom();
    },

    // Submit rejection with reason
    submitRejection() {
      if (!this.rejectReason.trim()) return;

      this.chatMessages.push({
        role: 'user',
        content: `Rejecting: ${this.rejectReason}`,
      });

      this.sendWs({
        type: 'action',
        action: 'reject',
        reason: this.rejectReason.trim(),
      });

      this.rejectReason = '';
      this.showRejectModal = false;
      this.scrollToBottom();
    },

    // Send WebSocket message
    sendWs(data) {
      if (this.ws && this.ws.readyState === WebSocket.OPEN) {
        this.ws.send(JSON.stringify(data));
      }
    },

    // Scroll chat to bottom
    scrollToBottom() {
      this.$nextTick(() => {
        const container = this.$refs.chatContainer;
        if (container) {
          container.scrollTop = container.scrollHeight;
        }
      });
    },

    // Format message content (basic markdown-like formatting)
    formatMessage(content) {
      if (!content) return '';

      // Escape HTML
      let html = content
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');

      // Bold: **text**
      html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');

      // Italic: *text*
      html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');

      // Code: `text`
      html = html.replace(/`(.+?)`/g, '<code>$1</code>');

      // Links: [text](url) or bare URLs
      html = html.replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');
      html = html.replace(/(https?:\/\/[^\s<]+)/g, '<a href="$1" target="_blank" rel="noopener">$1</a>');

      // Blockquotes: > text
      html = html.replace(/^&gt;\s*(.+)$/gm, '<blockquote>$1</blockquote>');

      // Line breaks
      html = html.replace(/\n/g, '<br>');

      return html;
    },
  };
}
