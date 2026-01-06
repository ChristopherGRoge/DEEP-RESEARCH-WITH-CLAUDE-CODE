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

    // UI state
    sidebarCollapsed: false,
    statusFilter: null, // null = all, 'pending', 'validated', 'rejected'

    // Panel layout: 'auto' follows screen width, 'split' forces side-by-side, 'stacked' forces vertical
    panelLayout: 'auto',
    assertionPanelOpen: true, // For split mode - whether assertion panel is visible

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
      validated: 0,
      rejected: 0,
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

      // Restore validator name from localStorage (preference only)
      const savedName = localStorage.getItem('validatorName');
      if (savedName) {
        this.validatorName = savedName;
      }
    },

    // Save conversation to API
    async saveConversationToApi(assertionId) {
      if (!assertionId) return;
      const conv = this.conversations[assertionId];
      if (!conv) return;

      try {
        await fetch(`/api/assertions/${assertionId}/conversation`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            messages: conv.messages,
            status: conv.status,
          }),
        });
      } catch (e) {
        console.error('Failed to save conversation:', e);
      }
    },

    // Load conversation from API
    async loadConversationFromApi(assertionId) {
      if (!assertionId) return null;

      try {
        const res = await fetch(`/api/assertions/${assertionId}/conversation`);
        const data = await res.json();
        if (data.success) {
          return {
            messages: data.data.messages || [],
            currentStreamText: '',
            status: data.data.status || 'not_started',
          };
        }
      } catch (e) {
        console.error('Failed to load conversation:', e);
      }
      return null;
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
          this.saveConversationToApi(this.currentAssertionId);

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

    // Toggle status filter
    toggleStatusFilter(filter) {
      this.statusFilter = this.statusFilter === filter ? null : filter;
    },

    // Toggle assertion panel visibility (for split layout)
    toggleAssertionPanel() {
      this.assertionPanelOpen = !this.assertionPanelOpen;
    },

    // Filter assertions by status
    filterAssertions(assertions) {
      if (!this.statusFilter) return assertions;

      return assertions.filter(assertion => {
        const status = this.getAssertionStatus(assertion.id, assertion.status);
        if (this.statusFilter === 'pending') {
          return status === 'not_started' || status === 'in_progress';
        }
        return status === this.statusFilter;
      });
    },

    // Get filtered assertions by project (for sidebar)
    getFilteredAssertionsByProject() {
      return this.assertionsByProject.map(group => ({
        ...group,
        assertions: this.filterAssertions(group.assertions),
      })).filter(group => group.assertions.length > 0);
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
    async selectAssertion(assertion) {
      // Save any streaming content to previous conversation
      if (this.currentAssertionId && this.isStreaming && this.currentStreamText) {
        const prevConv = this.conversations[this.currentAssertionId];
        if (prevConv) {
          prevConv.currentStreamText = this.currentStreamText;
          await this.saveConversationToApi(this.currentAssertionId);
        }
      }

      this.currentAssertionId = assertion.id;
      this.currentAssertion = assertion;

      // Fetch full assertion details with sources and reasoning
      try {
        const res = await fetch(`/api/assertions/${assertion.id}`);
        const data = await res.json();
        if (data.success && data.data) {
          // Flatten sources - merge AssertionSource fields with nested Source fields
          const flattenedSources = (data.data.sources || []).map(as => ({
            // AssertionSource fields
            id: as.id,
            quote: as.quote,
            addedBy: as.addedBy, // null = agent-added, string = researcher name
            relevanceGrade: as.relevanceGrade,
            annotation: as.annotation,
            gradedBy: as.gradedBy,
            gradedAt: as.gradedAt,
            // Source fields (flattened)
            sourceId: as.source?.id,
            url: as.source?.url,
            title: as.source?.title,
            sourceType: as.source?.sourceType,
            // UI state
            expanded: false,
          }));

          // Merge full data into currentAssertion
          this.currentAssertion = {
            ...assertion,
            ...data.data,
            sources: flattenedSources,
            reasoning: data.data.reasoning || [],
          };
        }
      } catch (error) {
        console.error('Failed to fetch assertion details:', error);
      }

      // Load conversation from API (or create new one)
      let conv = await this.loadConversationFromApi(assertion.id);
      if (!conv) {
        conv = { messages: [], currentStreamText: '', status: 'not_started' };
      }
      this.conversations[assertion.id] = conv;
      this.currentStreamText = conv.currentStreamText || '';

      this.scrollToBottom();
    },

    // Truncate text helper
    truncate(text, maxLength) {
      if (!text) return '';
      if (text.length <= maxLength) return text;
      return text.substring(0, maxLength) + '...';
    },

    // Truncate URL for display
    truncateUrl(url) {
      if (!url) return '';
      try {
        const parsed = new URL(url);
        const path = parsed.pathname.length > 30 ? parsed.pathname.substring(0, 30) + '...' : parsed.pathname;
        return parsed.hostname + path;
      } catch {
        return url.length > 50 ? url.substring(0, 50) + '...' : url;
      }
    },

    // Format grade enum for display
    formatGrade(grade) {
      if (!grade) return '';
      const labels = {
        'DIRECT_EVIDENCE': 'Direct',
        'STRONG_SUPPORT': 'Strong',
        'PARTIAL_SUPPORT': 'Partial',
        'WEAK_SUPPORT': 'Weak',
        'NOT_RELEVANT': 'N/A',
        'MISLEADING': 'Wrong',
      };
      return labels[grade] || grade;
    },

    // Extract URLs from text
    extractUrls(text) {
      if (!text) return [];
      // Match http/https URLs
      const urlRegex = /https?:\/\/[^\s<>"{}|\\^`\[\]]+/gi;
      const matches = text.match(urlRegex) || [];
      // Clean up trailing punctuation
      return matches.map(url => url.replace(/[.,;:!?)]+$/, ''));
    },

    // Add researcher-found sources to assertion
    async addResearcherSources(assertionId, urls) {
      if (!urls || urls.length === 0 || !this.validatorName) return;

      try {
        const res = await fetch(`/api/assertions/${assertionId}/researcher-sources`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            urls,
            addedBy: this.validatorName,
          }),
        });

        const data = await res.json();
        if (data.success && data.data.sources) {
          // Add new sources to currentAssertion
          const newSources = data.data.sources.map(s => ({
            id: s.id,
            quote: s.quote,
            relevanceGrade: s.relevanceGrade,
            annotation: s.annotation,
            gradedBy: s.gradedBy,
            gradedAt: s.gradedAt,
            addedBy: s.addedBy,
            sourceId: s.source?.id,
            url: s.source?.url,
            title: s.source?.title,
            sourceType: s.source?.sourceType,
            isResearcherAdded: true,
            expanded: false,
          }));

          // Merge with existing sources (avoid duplicates)
          const existingUrls = new Set(this.currentAssertion?.sources?.map(s => s.url) || []);
          for (const ns of newSources) {
            if (!existingUrls.has(ns.url)) {
              this.currentAssertion.sources.push(ns);
            }
          }
        }
      } catch (error) {
        console.error('Failed to add researcher sources:', error);
      }
    },

    // Grade a source's relevance
    async gradeSource(assertionSourceId, grade) {
      if (!this.validatorName) {
        alert('Please enter your name first');
        return;
      }

      try {
        const res = await fetch(`/api/sources/${assertionSourceId}/grade`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            relevanceGrade: grade,
            gradedBy: this.validatorName,
          }),
        });

        const data = await res.json();
        if (data.success) {
          // Update the source in currentAssertion
          const source = this.currentAssertion?.sources?.find(s => s.id === assertionSourceId);
          if (source) {
            source.relevanceGrade = grade;
            source.gradedBy = this.validatorName;
            source.gradedAt = new Date().toISOString();
          }
        } else {
          console.error('Failed to grade source:', data.error);
        }
      } catch (error) {
        console.error('Failed to grade source:', error);
      }
    },

    // Save source annotation
    async saveSourceAnnotation(assertionSourceId, annotation) {
      if (!this.validatorName) return;

      try {
        const source = this.currentAssertion?.sources?.find(s => s.id === assertionSourceId);
        const res = await fetch(`/api/sources/${assertionSourceId}/grade`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            relevanceGrade: source?.relevanceGrade || null,
            annotation: annotation,
            gradedBy: this.validatorName,
          }),
        });

        const data = await res.json();
        if (data.success && source) {
          source.annotation = annotation;
        }
      } catch (error) {
        console.error('Failed to save annotation:', error);
      }
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
            this.saveConversationToApi(this.currentAssertionId);
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
            this.saveConversationToApi(this.currentAssertionId);
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
    async sendMessage() {
      const content = this.userInput.trim();
      if (!content || !this.currentAssertionId) return;

      const conv = this.ensureConversation(this.currentAssertionId);
      if (conv.status !== 'in_progress') return;

      // Extract URLs and add as researcher sources
      const urls = this.extractUrls(content);
      if (urls.length > 0) {
        await this.addResearcherSources(this.currentAssertionId, urls);
      }

      // Add to current assertion's conversation
      conv.messages.push({
        role: 'user',
        content: content,
      });
      this.saveConversationToApi(this.currentAssertionId);

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

      // Extract URLs and add as researcher sources
      const urls = this.extractUrls(verificationText);
      if (urls.length > 0) {
        await this.addResearcherSources(this.currentAssertionId, urls);
      }

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

      // Save to API and refresh counts
      await this.saveConversationToApi(this.currentAssertionId);

      // Refresh counts and sidebar after validation/rejection
      if (action === 'validate' || action === 'reject') {
        await this.loadPendingCounts();
        await this.loadAssertionsByProject();
      }

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
