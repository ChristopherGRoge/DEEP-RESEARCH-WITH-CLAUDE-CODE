/**
 * WebSocket Store for Research Application
 * Uses plain JavaScript state - reactivity handled by components via polling or callbacks
 */

type ConnectionStatus = 'disconnected' | 'connecting' | 'connected';

interface SessionInfo {
  sessionId: string | null;
  status: string | null;
  entityId: string | null;
  entityName: string | null;
  mode: string | null;
  researcherName: string | null;
}

interface Task {
  taskId: string;
  category: string;
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  progress: number;
  message?: string;
  error?: string;
}

interface ActivityLogItem {
  id: string;
  timestamp: string;
  type: string;
  message: string;
  data?: unknown;
}

interface SessionProgress {
  percent: number;
  completed: number;
  total: number;
  current?: string;
}

interface CoordinatorMessage {
  id: string;
  role: 'coordinator' | 'user';
  content: string;
  timestamp: string;
  streaming?: boolean;
}

type StateChangeCallback = () => void;

// Internal state (plain JavaScript)
const state = {
  connectionStatus: 'disconnected' as ConnectionStatus,
  session: {
    sessionId: null,
    status: null,
    entityId: null,
    entityName: null,
    mode: null,
    researcherName: null,
  } as SessionInfo,
  tasks: [] as Task[],
  activityLog: [] as ActivityLogItem[],
  progress: {
    percent: 0,
    completed: 0,
    total: 0,
  } as SessionProgress,
  coordinatorMessages: [] as CoordinatorMessage[],
  streamingText: '',
  lastError: null as string | null,
};

// Subscribers for state changes
const subscribers: Set<StateChangeCallback> = new Set();

function notifySubscribers(): void {
  subscribers.forEach(cb => cb());
}

// Private variables
let ws: WebSocket | null = null;
let reconnectAttempts = 0;
const maxReconnectAttempts = 10;
const baseReconnectDelay = 1000;
let reconnectTimer: number | null = null;
let heartbeatTimer: number | null = null;
const heartbeatInterval = 30000;
let autoReconnect = true;

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

function formatActivityMessage(type: string, data: Record<string, unknown>): string {
  switch (type) {
    case 'session_created':
      return `Research session created for ${data.entityName}`;
    case 'session_started':
      return `Research session started`;
    case 'session_completed':
      return `Research session completed`;
    case 'task_started':
      return `Started: ${data.category}`;
    case 'task_completed':
      return `Completed: ${data.category}`;
    case 'task_failed':
      return `Failed: ${data.category} - ${data.error || 'Unknown error'}`;
    case 'screenshot_captured':
      return `Screenshot captured: ${data.path || 'unknown'}`;
    case 'extraction_complete':
      return `Extraction complete: ${data.schemaType || 'unknown'}`;
    case 'assertion_created':
      return `Assertion created: ${data.category || 'unknown'}`;
    case 'entity_created':
      return `Entity discovered: ${data.name || 'unknown'}`;
    // Subagent messages
    case 'subagent_spawned':
      return `Spawned ${data.model} subagent: ${data.taskType || 'custom'}`;
    case 'subagent_completed':
      return `Subagent completed (${data.durationMs ? Math.round(Number(data.durationMs) / 1000) + 's' : 'done'})`;
    case 'subagent_error':
      return `Subagent error: ${data.message || 'unknown'}`;
    case 'error':
      return `Error: ${data.message || 'Unknown error'}`;
    default:
      return data.message ? String(data.message) : type;
  }
}

function addActivityLog(type: string, data: Record<string, unknown>): void {
  state.activityLog.unshift({
    id: generateId(),
    timestamp: new Date().toISOString(),
    type,
    message: formatActivityMessage(type, data),
    data,
  });

  if (state.activityLog.length > 100) {
    state.activityLog = state.activityLog.slice(0, 100);
  }
  notifySubscribers();
}

function updateTask(taskUpdate: Partial<Task> & { taskId: string }): void {
  const index = state.tasks.findIndex((t) => t.taskId === taskUpdate.taskId);

  if (index >= 0) {
    state.tasks[index] = { ...state.tasks[index], ...taskUpdate };
  } else {
    state.tasks.push({
      taskId: taskUpdate.taskId,
      category: taskUpdate.category || 'unknown',
      status: taskUpdate.status || 'pending',
      progress: taskUpdate.progress || 0,
      ...taskUpdate,
    } as Task);
  }
  notifySubscribers();
}

function handleMessage(data: string): void {
  try {
    const message = JSON.parse(data);
    const { type, ...payload } = message;

    if (type !== 'pong' && type !== 'coordinator_chunk') {
      addActivityLog(type, message);
    }

    switch (type) {
      case 'auth_status':
        console.log('[WebSocket] Auth status:', payload.authenticated);
        break;

      case 'session_created':
      case 'session_started':
        state.session = {
          sessionId: payload.sessionId,
          status: payload.status || 'in_progress',
          entityId: payload.entityId,
          entityName: payload.entityName,
          mode: payload.mode,
          researcherName: payload.researcherName,
        };
        if (payload.tasks) {
          state.tasks = payload.tasks;
        }
        notifySubscribers();
        break;

      case 'session_paused':
      case 'session_resumed':
      case 'session_completed':
      case 'session_failed':
      case 'session_cancelled':
        state.session.status = payload.status;
        notifySubscribers();
        break;

      case 'task_started':
        updateTask({
          taskId: payload.taskId,
          category: payload.category,
          status: 'in_progress',
          progress: 0,
          message: payload.message,
        });
        break;

      case 'task_progress':
        updateTask({
          taskId: payload.taskId,
          category: payload.category,
          progress: payload.progress || 0,
          message: payload.message,
        });
        break;

      case 'task_completed':
        updateTask({
          taskId: payload.taskId,
          category: payload.category,
          status: 'completed',
          progress: 100,
          message: payload.message,
        });
        break;

      case 'task_failed':
        updateTask({
          taskId: payload.taskId,
          category: payload.category,
          status: 'failed',
          message: payload.message,
          error: payload.error,
        });
        break;

      case 'overall_progress':
        // Handle both old format (percent, completed, total) and new format (percentComplete, completedTasks, totalTasks)
        state.progress = {
          percent: payload.progress?.percentComplete ?? payload.percentComplete ?? payload.percent ?? 0,
          completed: payload.progress?.completedTasks ?? payload.completedTasks ?? payload.completed ?? 0,
          total: payload.progress?.totalTasks ?? payload.totalTasks ?? payload.total ?? 0,
          current: payload.current,
        };
        notifySubscribers();
        break;

      case 'coordinator_message':
        state.coordinatorMessages.push({
          id: payload.messageId || generateId(),
          role: 'coordinator',
          content: payload.content,
          timestamp: payload.timestamp || new Date().toISOString(),
        });
        state.streamingText = '';
        notifySubscribers();
        break;

      case 'coordinator_chunk':
        state.streamingText += payload.chunk || '';
        notifySubscribers();
        break;

      case 'error':
        state.lastError = payload.message || 'Unknown error';
        console.error('[WebSocket] Error:', payload);
        notifySubscribers();
        break;

      case 'pong':
        break;

      // Subagent messages - already logged to activity feed via addActivityLog above
      case 'subagent_spawned':
      case 'subagent_completed':
      case 'subagent_error':
        // Activity log already updated, just notify
        notifySubscribers();
        break;

      default:
        console.log('[WebSocket] Unknown message type:', type, payload);
    }
  } catch (error) {
    console.error('[WebSocket] Failed to parse message:', error);
    state.lastError = 'Failed to parse server message';
    notifySubscribers();
  }
}

function startHeartbeat(): void {
  stopHeartbeat();
  heartbeatTimer = window.setInterval(() => {
    if (state.connectionStatus === 'connected') {
      send({ type: 'ping' });
    }
  }, heartbeatInterval);
}

function stopHeartbeat(): void {
  if (heartbeatTimer) {
    clearInterval(heartbeatTimer);
    heartbeatTimer = null;
  }
}

function scheduleReconnect(): void {
  if (reconnectAttempts >= maxReconnectAttempts) {
    console.error('[WebSocket] Max reconnection attempts reached');
    state.lastError = 'Failed to reconnect after multiple attempts';
    notifySubscribers();
    return;
  }

  const delay = Math.min(
    baseReconnectDelay * Math.pow(2, reconnectAttempts),
    30000
  );

  reconnectAttempts++;
  console.log(`[WebSocket] Reconnecting in ${delay}ms (attempt ${reconnectAttempts}/${maxReconnectAttempts})`);

  reconnectTimer = window.setTimeout(() => {
    connect();
  }, delay);
}

function connect(): void {
  if (ws && ws.readyState === WebSocket.OPEN) {
    console.log('[WebSocket] Already connected');
    return;
  }

  state.connectionStatus = 'connecting';
  state.lastError = null;
  notifySubscribers();

  const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
  const wsUrl = `${protocol}//${window.location.host}/ws/research`;

  console.log('[WebSocket] Connecting to:', wsUrl);

  try {
    ws = new WebSocket(wsUrl);

    ws.onopen = () => {
      console.log('[WebSocket] Connected');
      state.connectionStatus = 'connected';
      reconnectAttempts = 0;
      startHeartbeat();
      notifySubscribers();
    };

    ws.onmessage = (event) => {
      handleMessage(event.data);
    };

    ws.onerror = (error) => {
      console.error('[WebSocket] Error:', error);
      state.lastError = 'WebSocket connection error';
      notifySubscribers();
    };

    ws.onclose = () => {
      console.log('[WebSocket] Disconnected');
      state.connectionStatus = 'disconnected';
      stopHeartbeat();
      notifySubscribers();

      if (autoReconnect) {
        scheduleReconnect();
      }
    };
  } catch (error) {
    console.error('[WebSocket] Connection failed:', error);
    state.connectionStatus = 'disconnected';
    state.lastError = 'Failed to create WebSocket connection';
    notifySubscribers();
    if (autoReconnect) {
      scheduleReconnect();
    }
  }
}

function disconnect(): void {
  autoReconnect = false;
  if (reconnectTimer) {
    clearTimeout(reconnectTimer);
    reconnectTimer = null;
  }
  stopHeartbeat();

  if (ws) {
    ws.close();
    ws = null;
  }
  state.connectionStatus = 'disconnected';
  notifySubscribers();
}

function send(data: object): void {
  if (!ws || ws.readyState !== WebSocket.OPEN) {
    console.error('[WebSocket] Cannot send - not connected');
    state.lastError = 'Not connected to server';
    notifySubscribers();
    return;
  }

  try {
    ws.send(JSON.stringify(data));
  } catch (error) {
    console.error('[WebSocket] Send failed:', error);
    state.lastError = 'Failed to send message';
    notifySubscribers();
  }
}

function sendUserMessage(content: string): void {
  if (!state.session.sessionId) {
    console.error('[WebSocket] No active session');
    return;
  }

  state.coordinatorMessages.push({
    id: generateId(),
    role: 'user',
    content,
    timestamp: new Date().toISOString(),
  });
  notifySubscribers();

  send({
    type: 'user_message',
    sessionId: state.session.sessionId,
    content,
  });
}

function clearSession(): void {
  state.session = {
    sessionId: null,
    status: null,
    entityId: null,
    entityName: null,
    mode: null,
    researcherName: null,
  };
  state.tasks = [];
  state.progress = { percent: 0, completed: 0, total: 0 };
  state.coordinatorMessages = [];
  state.streamingText = '';
  notifySubscribers();
}

function subscribe(callback: StateChangeCallback): () => void {
  subscribers.add(callback);
  return () => subscribers.delete(callback);
}

function getSnapshot() {
  return { ...state };
}

// Export store with getters and methods
export const websocket = {
  // Getters for state (returns current snapshot)
  get connectionStatus() { return state.connectionStatus; },
  get session() { return state.session; },
  get tasks() { return state.tasks; },
  get activityLog() { return state.activityLog; },
  get progress() { return state.progress; },
  get coordinatorMessages() { return state.coordinatorMessages; },
  get streamingText() { return state.streamingText; },
  get lastError() { return state.lastError; },

  // Derived getters
  get isConnected() { return state.connectionStatus === 'connected'; },
  get failedTasks() { return state.tasks.filter(t => t.status === 'failed'); },

  // Methods
  connect,
  disconnect,
  send,
  sendUserMessage,
  clearSession,
  subscribe,
  getSnapshot,
};
