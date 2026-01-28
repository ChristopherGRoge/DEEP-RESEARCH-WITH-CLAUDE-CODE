/**
 * Research App - Alpine.js Application
 * Handles deep research sessions with real-time WebSocket updates
 */

function researchApp() {
  return {
    // Connection state
    ws: null,
    wsConnected: false,

    // Auth
    authStatus: {
      method: 'checking',
      valid: false,
      details: 'Checking authentication...',
    },

    // User
    researcherName: '',

    // Project & Entity selection
    projects: [],
    selectedProject: '',
    entities: [],
    selectedEntity: null,

    // Research configuration
    selectedCategories: ['pricing', 'features', 'company', 'compliance', 'integrations'],
    executionMode: 'sequential',

    // Session state
    activeSession: null,
    sessionStatus: 'INITIALIZING',
    tasks: [],
    sessionProgress: {
      overallPercent: 0,
      completedTasks: 0,
      totalTasks: 0,
      failedTasks: 0,
      totalAssertions: 0,
      totalScreenshots: 0,
      totalExtractions: 0,
    },

    // Activity log
    activityLog: [],

    // Coordinator chat
    coordinatorMessages: [],
    userMessage: '',
    isStreaming: false,
    currentStreamText: '',
    chatCollapsed: false,

    // Initialize
    async init() {
      // Load researcher name
      const savedName = localStorage.getItem('researcherName');
      if (savedName) {
        this.researcherName = savedName;
      }

      // Check auth status
      await this.checkAuth();

      // Load projects
      await this.loadProjects();

      // Connect WebSocket
      this.connectWebSocket();
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

    // Load entities for selected project
    async loadEntities() {
      if (!this.selectedProject) {
        this.entities = [];
        this.selectedEntity = null;
        return;
      }

      try {
        const res = await fetch(`/api/entities?projectId=${this.selectedProject}`);
        const data = await res.json();
        if (data.success) {
          this.entities = data.data;
        }
      } catch (error) {
        console.error('Failed to load entities:', error);
        this.entities = [];
      }
    },

    // Select entity for research
    selectEntity(entity) {
      this.selectedEntity = entity;
    },

    // WebSocket connection
    connectWebSocket() {
      const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
      const wsUrl = `${protocol}//${window.location.host}/ws/research`;

      this.ws = new WebSocket(wsUrl);

      this.ws.onopen = () => {
        console.log('Research WebSocket connected');
        this.wsConnected = true;
      };

      this.ws.onclose = () => {
        console.log('Research WebSocket disconnected');
        this.wsConnected = false;

        // Reconnect after delay
        setTimeout(() => this.connectWebSocket(), 3000);
      };

      this.ws.onerror = (error) => {
        console.error('Research WebSocket error:', error);
      };

      this.ws.onmessage = (event) => {
        this.handleMessage(JSON.parse(event.data));
      };
    },

    // Handle WebSocket messages
    handleMessage(msg) {
      switch (msg.type) {
        case 'auth_status':
          this.authStatus = {
            method: msg.method,
            valid: msg.valid,
            details: msg.details,
          };
          break;

        case 'session_created':
          this.activeSession = msg.sessionId;
          this.tasks = msg.tasks || [];
          this.sessionStatus = 'INITIALIZING';
          this.addActivity('task', 'Session created', `${this.tasks.length} research tasks queued`);
          break;

        case 'session_started':
          this.sessionStatus = 'RESEARCHING';
          this.addActivity('task', 'Research started', 'Coordinator agent initialized');
          break;

        case 'session_paused':
          this.sessionStatus = 'PAUSED';
          this.addActivity('task', 'Session paused');
          break;

        case 'session_resumed':
          this.sessionStatus = 'RESEARCHING';
          this.addActivity('task', 'Session resumed');
          break;

        case 'session_completed':
          this.sessionStatus = 'COMPLETED';
          if (msg.summary) {
            this.sessionProgress = {
              ...this.sessionProgress,
              totalAssertions: msg.summary.totalAssertions || 0,
              totalScreenshots: msg.summary.totalScreenshots || 0,
              totalExtractions: msg.summary.totalExtractions || 0,
            };
          }
          this.addActivity('task', 'Research complete', `Generated ${this.sessionProgress.totalAssertions} assertions`);
          break;

        case 'session_failed':
          this.sessionStatus = 'FAILED';
          this.addActivity('error', 'Session failed', msg.error);
          break;

        case 'session_cancelled':
          this.sessionStatus = 'CANCELLED';
          this.addActivity('task', 'Session cancelled');
          break;

        case 'task_started':
          this.updateTask(msg.taskId, { status: 'IN_PROGRESS' });
          this.addActivity('task', `Started ${this.formatCategory(msg.category)} research`);
          break;

        case 'task_progress':
          this.updateTask(msg.taskId, { progress: msg.progress });
          break;

        case 'task_completed':
          this.updateTask(msg.taskId, { status: 'COMPLETED', results: msg.results });
          this.sessionProgress.completedTasks++;
          this.updateOverallProgress();
          this.addActivity('task', `Completed ${this.formatCategory(msg.category)} research`);
          break;

        case 'task_failed':
          this.updateTask(msg.taskId, { status: 'FAILED', error: msg.error });
          this.sessionProgress.failedTasks++;
          this.addActivity('error', `Failed ${this.formatCategory(msg.category)} research`, msg.error);
          break;

        case 'overall_progress':
          if (msg.progress) {
            this.sessionProgress = {
              ...this.sessionProgress,
              overallPercent: msg.progress.percentComplete || 0,
              completedTasks: msg.progress.completedTasks || 0,
              totalTasks: msg.progress.totalTasks || 0,
              totalAssertions: msg.progress.totalAssertions || this.sessionProgress.totalAssertions,
              totalScreenshots: msg.progress.totalScreenshots || this.sessionProgress.totalScreenshots,
              totalExtractions: msg.progress.totalExtractions || this.sessionProgress.totalExtractions,
            };
          }
          break;

        case 'screenshot_captured':
          this.sessionProgress.totalScreenshots++;
          this.addActivity('screenshot', `Screenshot captured`, msg.url, msg.screenshotPath);
          break;

        case 'extraction_complete':
          this.sessionProgress.totalExtractions++;
          this.addActivity('extraction', `Extracted ${msg.schemaType} data`, `${msg.assertionCount} assertions generated`);
          break;

        case 'assertion_created':
          this.sessionProgress.totalAssertions++;
          this.addActivity('assertion', 'Assertion created', msg.claim);
          break;

        case 'coordinator_message':
          this.coordinatorMessages.push({
            role: 'assistant',
            content: msg.content,
          });
          this.scrollChatToBottom();
          break;

        case 'coordinator_chunk':
          if (!this.isStreaming) {
            this.isStreaming = true;
            this.currentStreamText = '';
          }
          this.currentStreamText += msg.text;
          this.scrollChatToBottom();
          break;

        case 'error':
          this.addActivity('error', 'Error', msg.message);
          break;

        case 'pong':
          // Heartbeat response
          break;

        default:
          console.log('Unknown message type:', msg.type);
      }
    },

    // Update task in list
    updateTask(taskId, updates) {
      const task = this.tasks.find(t => t.id === taskId);
      if (task) {
        Object.assign(task, updates);
      }
    },

    // Update overall progress percentage
    updateOverallProgress() {
      if (this.sessionProgress.totalTasks > 0) {
        this.sessionProgress.overallPercent = Math.round(
          (this.sessionProgress.completedTasks / this.sessionProgress.totalTasks) * 100
        );
      }
    },

    // Add activity to log
    addActivity(type, message, details = null, screenshotPath = null) {
      this.activityLog.unshift({
        type,
        message,
        details,
        screenshotPath,
        timestamp: new Date(),
      });

      // Keep log at reasonable size
      if (this.activityLog.length > 100) {
        this.activityLog.pop();
      }

      // Scroll activity feed
      this.$nextTick(() => {
        const feed = this.$refs.activityFeed;
        if (feed) {
          feed.scrollTop = 0;
        }
      });
    },

    // Start research session
    startResearch() {
      if (!this.selectedEntity || !this.researcherName || this.selectedCategories.length === 0) {
        return;
      }

      // Save researcher name
      localStorage.setItem('researcherName', this.researcherName);

      // Reset state
      this.activityLog = [];
      this.coordinatorMessages = [];
      this.tasks = [];
      this.sessionProgress = {
        overallPercent: 0,
        completedTasks: 0,
        totalTasks: 0,
        failedTasks: 0,
        totalAssertions: 0,
        totalScreenshots: 0,
        totalExtractions: 0,
      };

      // Send start message
      this.sendWs({
        type: 'start_research',
        entityId: this.selectedEntity.id,
        entityName: this.selectedEntity.name,
        entityUrl: this.selectedEntity.url,
        projectId: this.selectedProject,
        researcherName: this.researcherName,
        categories: this.selectedCategories,
        mode: this.executionMode,
      });
    },

    // Pause session
    pauseSession() {
      this.sendWs({ type: 'pause_session' });
    },

    // Resume session
    resumeSession() {
      this.sendWs({ type: 'resume_session' });
    },

    // Cancel session
    cancelSession() {
      if (confirm('Are you sure you want to cancel this research session?')) {
        this.sendWs({ type: 'cancel_session' });
      }
    },

    // Retry failed task
    async retryTask(taskId) {
      try {
        const res = await fetch(`/api/research/sessions/${this.activeSession}/tasks/${taskId}/retry`, {
          method: 'POST',
        });
        const data = await res.json();
        if (data.success) {
          this.addActivity('task', 'Retrying task');
          this.updateTask(taskId, { status: 'PENDING', error: null });
        }
      } catch (error) {
        console.error('Failed to retry task:', error);
      }
    },

    // Send message to coordinator
    sendMessage() {
      if (!this.userMessage.trim() || this.sessionStatus !== 'RESEARCHING') {
        return;
      }

      // Add to chat
      this.coordinatorMessages.push({
        role: 'user',
        content: this.userMessage,
      });

      // Send to WebSocket
      this.sendWs({
        type: 'user_message',
        content: this.userMessage,
      });

      this.userMessage = '';
      this.scrollChatToBottom();
    },

    // Reset session to start new research
    resetSession() {
      this.activeSession = null;
      this.sessionStatus = 'INITIALIZING';
      this.tasks = [];
      this.activityLog = [];
      this.coordinatorMessages = [];
      this.sessionProgress = {
        overallPercent: 0,
        completedTasks: 0,
        totalTasks: 0,
        failedTasks: 0,
        totalAssertions: 0,
        totalScreenshots: 0,
        totalExtractions: 0,
      };
    },

    // Send WebSocket message
    sendWs(data) {
      if (this.ws && this.ws.readyState === WebSocket.OPEN) {
        this.ws.send(JSON.stringify(data));
      }
    },

    // Scroll chat to bottom
    scrollChatToBottom() {
      this.$nextTick(() => {
        const chat = this.$refs.chatMessages;
        if (chat) {
          chat.scrollTop = chat.scrollHeight;
        }
      });
    },

    // Format category name
    formatCategory(category) {
      const names = {
        pricing: 'Pricing',
        features: 'Features',
        company: 'Company',
        compliance: 'Compliance',
        integrations: 'Integrations',
      };
      return names[category] || category;
    },

    // Format session status
    formatStatus(status) {
      const labels = {
        INITIALIZING: 'Initializing',
        PLANNING: 'Planning',
        RESEARCHING: 'Researching',
        PAUSED: 'Paused',
        COMPLETED: 'Completed',
        FAILED: 'Failed',
        CANCELLED: 'Cancelled',
      };
      return labels[status] || status;
    },

    // Format time for activity log
    formatTime(timestamp) {
      const date = new Date(timestamp);
      return date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        second: '2-digit',
      });
    },

    // Format message content (basic markdown)
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

      // Links
      html = html.replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');
      html = html.replace(/(https?:\/\/[^\s<]+)/g, '<a href="$1" target="_blank" rel="noopener">$1</a>');

      // Line breaks
      html = html.replace(/\n/g, '<br>');

      return html;
    },
  };
}
