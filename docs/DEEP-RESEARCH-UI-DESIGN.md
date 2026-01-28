# Deep Research UI Design Document

**Date:** 2026-01-08
**Purpose:** Browser-based deep research interface using Claude Agent SDK / Claude Code Headless

---

## 1. Overview

The Deep Research UI enables researchers to conduct systematic entity research through a browser interface. It mirrors the validation tool's architecture but focuses on automated evidence collection, extraction workflows, and assertion generation rather than human validation.

### Key Differences from Validation Tool

| Validation Tool | Deep Research Tool |
|----------------|-------------------|
| Human validates agent claims | Agent collects evidence for entities |
| Conversation per assertion | Research session per entity |
| Binary outcome (validate/reject) | Progressive evidence accumulation |
| Screenshot upload | Screenshot capture & analysis |
| Source grading | Extraction workflows |

---

## 2. UI Architecture

### 2.1 Layout Structure

```
┌─────────────────────────────────────────────────────────────┐
│ Header                                                       │
│ [≡] Research | [Stats] | Connection • | [Name Input]        │
├──────────┬──────────────────────────────────────────────────┤
│ Sidebar  │ Content Area (Split View)                        │
│          ├──────────────────────┬───────────────────────────┤
│ Projects │ Conversation Panel   │ Research Progress Panel   │
│ Entities │                      │                           │
│ [+New]   │ Chat Thread          │ Entity Info               │
│          │                      │ Evidence Status           │
│ Project1 │ ┌──────────────────┐ │ ┌──────────────────────┐ │
│ ├Entity1 │ │Assistant: ...    │ │ │ Cursor               │ │
│ ├Entity2 │ │                  │ │ │ https://cursor.com   │ │
│ ├Entity3 │ │User: ...         │ │ └──────────────────────┘ │
│          │ │                  │ │                           │
│ Project2 │ │Screenshot:       │ │ Extraction Coverage:      │
│ ├Entity4 │ │[📷 pricing]      │ │ ✓ Pricing (3 days ago)   │
│          │ └──────────────────┘ │ ✓ Features (3 days ago)  │
│          │                      │ ⚠ Compliance (stale)      │
│          │ [Input Area]         │ ⏳ Company Info (running) │
│          │ [▶ Start Research]   │ ✗ Integrations (missing) │
└──────────┴──────────────────────┴───────────────────────────┘
```

### 2.2 Responsive Breakpoints

- **Wide (>1200px):** Side-by-side conversation + progress panel
- **Medium (768-1200px):** Stacked vertical panels, progress panel collapsible
- **Mobile (<768px):** Single column, sidebar drawer

---

## 3. Component Design

### 3.1 Sidebar Component

```html
<aside class="sidebar research-sidebar">
  <div class="sidebar-header">
    <!-- Project Filter -->
    <select x-model="selectedProject" @change="filterEntities()">
      <option value="">All Projects</option>
      <option x-for="p in projects" :value="p.id" x-text="p.name"></option>
    </select>

    <!-- New Entity Button -->
    <button class="btn-new-entity" @click="showEntityModal = true">
      <svg><!-- plus icon --></svg>
      New Entity
    </button>
  </div>

  <!-- Entity List -->
  <div class="entity-list">
    <template x-for="project in groupedEntities" :key="project.id">
      <div class="project-group">
        <button class="project-toggle" @click="toggleProject(project.id)">
          <svg class="chevron" :class="{ expanded: project.expanded }"></svg>
          <span x-text="project.name"></span>
          <span class="entity-count" x-text="project.entities.length"></span>
        </button>

        <div x-show="project.expanded" x-collapse>
          <template x-for="entity in project.entities" :key="entity.id">
            <button
              class="entity-item"
              :class="{
                selected: currentEntityId === entity.id,
                researching: getResearchStatus(entity.id) === 'researching',
                complete: getResearchStatus(entity.id) === 'complete',
                stale: hasStaleExtractions(entity.id)
              }"
              @click="selectEntity(entity)"
            >
              <!-- Status Indicator -->
              <span class="status-dot" :class="getResearchStatus(entity.id)"></span>

              <!-- Entity Logo -->
              <img
                x-show="entity.logoPath"
                :src="entity.logoPath"
                class="entity-logo-mini"
              >

              <!-- Entity Name -->
              <span class="entity-name" x-text="entity.name"></span>

              <!-- Progress Indicator -->
              <span
                class="progress-badge"
                :class="{ complete: entity.extractionCount === 5 }"
                x-text="entity.extractionCount + '/5'"
              ></span>
            </button>
          </template>
        </div>
      </div>
    </template>
  </div>
</aside>
```

**Alpine.js State:**

```javascript
{
  // Sidebar
  projects: [],
  selectedProject: '',
  groupedEntities: [], // [{ projectId, name, expanded, entities: [...] }]
  currentEntityId: null,
  showEntityModal: false,

  // Entity status tracking
  researchSessions: {}, // Map of entityId -> { status: 'idle'|'researching'|'complete', progress: {...} }
}
```

---

### 3.2 Research Progress Panel

```html
<aside class="research-panel" :class="{ collapsed: !panelOpen }">
  <div class="panel-header">
    <span class="panel-title">Research Progress</span>
    <button class="panel-close-btn" @click="panelOpen = false">×</button>
  </div>

  <div class="panel-content">
    <!-- Entity Card -->
    <div class="entity-card">
      <div class="entity-header">
        <img
          x-show="currentEntity.logoPath"
          :src="currentEntity.logoPath"
          class="entity-logo"
        >
        <div class="entity-meta">
          <h2 x-text="currentEntity.name"></h2>
          <a :href="currentEntity.url" target="_blank" x-text="currentEntity.url"></a>
        </div>
      </div>

      <!-- Research Status Banner -->
      <div class="status-banner" :class="researchStatus">
        <span x-show="researchStatus === 'idle'">Ready to research</span>
        <span x-show="researchStatus === 'researching'">Researching...</span>
        <span x-show="researchStatus === 'complete'">✓ Research complete</span>
      </div>
    </div>

    <!-- Extraction Coverage -->
    <div class="coverage-section">
      <h3>Extraction Coverage</h3>

      <div class="coverage-grid">
        <template x-for="schema in schemas" :key="schema.type">
          <div class="coverage-item" :class="getCoverageStatus(schema.type)">
            <div class="coverage-header">
              <span class="schema-icon" x-html="schema.icon"></span>
              <span class="schema-label" x-text="schema.label"></span>
              <button
                class="btn-extract"
                :disabled="isExtracting(schema.type)"
                @click="startExtraction(schema.type)"
              >
                <span x-show="!isExtracting(schema.type)">Extract</span>
                <span x-show="isExtracting(schema.type)">⏳</span>
              </button>
            </div>

            <!-- Extraction Status -->
            <template x-if="getExtraction(schema.type)">
              <div class="extraction-status">
                <span class="status-badge" :class="getExtractionFreshness(schema.type)">
                  <span x-text="getExtractionAge(schema.type)"></span>
                </span>
                <span class="assertion-count" x-text="getAssertionCount(schema.type) + ' claims'"></span>
              </div>
            </template>

            <template x-if="!getExtraction(schema.type)">
              <div class="extraction-status">
                <span class="status-badge missing">Not extracted</span>
              </div>
            </template>
          </div>
        </template>
      </div>
    </div>

    <!-- Generated Assertions -->
    <div class="assertions-section">
      <h3>Generated Assertions</h3>
      <div class="assertions-list">
        <template x-for="assertion in recentAssertions" :key="assertion.id">
          <div class="assertion-card mini">
            <div class="assertion-meta">
              <span class="category-badge" x-text="assertion.category"></span>
              <span class="extraction-source" x-text="assertion.schemaType"></span>
            </div>
            <p class="assertion-claim" x-text="assertion.claim"></p>
            <div class="assertion-evidence">
              <span x-show="assertion.evidenceScreenshotPath">📷 Evidence</span>
              <span x-show="assertion.sourceUrl">🔗 Source</span>
            </div>
          </div>
        </template>
      </div>
    </div>

    <!-- Evidence Gallery -->
    <template x-if="screenshots.length > 0">
      <div class="evidence-gallery">
        <h3>Captured Evidence</h3>
        <div class="evidence-grid">
          <template x-for="screenshot in screenshots" :key="screenshot.path">
            <a :href="screenshot.path" target="_blank" class="evidence-thumb">
              <img :src="screenshot.path" :alt="screenshot.description">
              <span class="screenshot-label" x-text="screenshot.schemaType"></span>
            </a>
          </template>
        </div>
      </div>
    </template>
  </div>
</aside>
```

**Alpine.js State:**

```javascript
{
  // Progress Panel
  panelOpen: true,
  currentEntity: null,
  researchStatus: 'idle', // 'idle' | 'researching' | 'complete'

  schemas: [
    { type: 'pricing', label: 'Pricing', icon: '💰' },
    { type: 'features', label: 'Features', icon: '✨' },
    { type: 'compliance', label: 'Compliance', icon: '🔒' },
    { type: 'company', label: 'Company', icon: '🏢' },
    { type: 'integrations', label: 'Integrations', icon: '🔌' }
  ],

  extractions: [], // Current entity's extractions
  recentAssertions: [], // Recent assertions created during research
  screenshots: [], // Evidence screenshots captured

  // Methods
  getCoverageStatus(schemaType) {
    const extraction = this.extractions.find(e => e.schemaType === schemaType);
    if (!extraction) return 'missing';
    if (this.isStale(extraction.createdAt)) return 'stale';
    if (this.isExtracting(schemaType)) return 'extracting';
    return 'complete';
  },

  isStale(dateString) {
    const days = (Date.now() - new Date(dateString)) / (1000 * 60 * 60 * 24);
    return days > 30;
  }
}
```

---

### 3.3 Conversation Panel

```html
<div class="conversation-panel">
  <!-- Chat Header -->
  <div class="chat-header">
    <div class="chat-label">Research Session</div>
    <button class="panel-toggle-btn" @click="panelOpen = !panelOpen">
      <svg><!-- toggle icon --></svg>
    </button>
  </div>

  <!-- Chat Thread -->
  <div class="chat-thread" x-ref="chatContainer">
    <template x-for="msg in chatMessages" :key="msg.id">
      <!-- Text Message -->
      <div
        x-show="msg.type === 'text'"
        class="message"
        :class="msg.role"
      >
        <div class="message-bubble" x-html="formatMessage(msg.content)"></div>
      </div>

      <!-- Screenshot Message -->
      <div x-show="msg.type === 'screenshot'" class="message assistant">
        <div class="screenshot-message">
          <div class="screenshot-header">
            <span class="schema-badge" x-text="msg.schemaType"></span>
            <span class="screenshot-label">Evidence Captured</span>
          </div>
          <a :href="msg.screenshotPath" target="_blank">
            <img :src="msg.screenshotPath" class="screenshot-preview">
          </a>
          <p class="screenshot-description" x-text="msg.description"></p>
        </div>
      </div>

      <!-- Extraction Result -->
      <div x-show="msg.type === 'extraction'" class="message assistant">
        <div class="extraction-message">
          <div class="extraction-header">
            <span class="schema-icon" x-html="getSchemaIcon(msg.schemaType)"></span>
            <span class="extraction-label" x-text="msg.schemaType + ' Extracted'"></span>
          </div>

          <div class="extraction-summary">
            <span x-text="msg.assertionCount + ' assertions created'"></span>
            <span x-show="msg.screenshotPath">• Evidence captured</span>
          </div>

          <!-- Quick preview of extracted data -->
          <div class="data-preview">
            <pre x-text="JSON.stringify(msg.dataSummary, null, 2)"></pre>
          </div>
        </div>
      </div>

      <!-- Action Menu -->
      <div x-show="msg.type === 'actions'" class="message assistant">
        <div class="action-menu">
          <p>What would you like to research next?</p>
          <div class="action-buttons">
            <button
              x-for="action in msg.actions"
              :key="action.id"
              class="btn-action-choice"
              @click="executeAction(action)"
            >
              <span x-text="action.label"></span>
            </button>
          </div>
        </div>
      </div>
    </template>

    <!-- Streaming Indicator -->
    <template x-if="isStreaming">
      <div class="message assistant streaming">
        <div class="message-bubble">
          <span x-text="currentStreamText"></span>
          <span class="cursor"></span>
        </div>
      </div>
    </template>
  </div>

  <!-- Input Area -->
  <div class="input-area">
    <!-- Not Started State -->
    <template x-if="researchStatus === 'idle'">
      <div class="start-prompt">
        <h3>Research <span x-text="currentEntity.name"></span></h3>
        <div class="start-actions">
          <button
            class="btn-start-full"
            @click="startFullResearch()"
            :disabled="!validatorName"
          >
            ▶ Start Full Research
          </button>
          <button
            class="btn-start-custom"
            @click="showCustomResearchModal = true"
            :disabled="!validatorName"
          >
            ⚙ Custom Research
          </button>
        </div>
      </div>
    </template>

    <!-- Researching State -->
    <template x-if="researchStatus === 'researching'">
      <div class="active-research">
        <div class="research-controls">
          <button
            class="btn-control pause"
            @click="pauseResearch()"
          >
            ⏸ Pause
          </button>
          <button
            class="btn-control stop"
            @click="stopResearch()"
          >
            ⏹ Stop
          </button>
        </div>

        <textarea
          x-model="userInput"
          @keydown.ctrl.enter="sendMessage()"
          placeholder="Ask questions or provide guidance..."
          class="research-input"
          rows="2"
        ></textarea>

        <button
          class="btn-send"
          @click="sendMessage()"
          :disabled="!userInput.trim() || isStreaming"
        >
          Send
        </button>
      </div>
    </template>

    <!-- Complete State -->
    <template x-if="researchStatus === 'complete'">
      <div class="complete-message">
        <span>✓ Research complete</span>
        <button class="btn-restart" @click="restartResearch()">
          Restart Research
        </button>
      </div>
    </template>
  </div>
</div>
```

**Alpine.js State:**

```javascript
{
  // Chat State
  chatMessages: [], // Array of message objects
  currentStreamText: '',
  isStreaming: false,
  userInput: '',

  // Message Types
  // { id, type: 'text', role: 'assistant'|'user', content: string }
  // { id, type: 'screenshot', schemaType: string, screenshotPath: string, description: string }
  // { id, type: 'extraction', schemaType: string, assertionCount: number, dataSummary: object }
  // { id, type: 'actions', actions: [{ id, label, command }] }
}
```

---

## 4. WebSocket Message Protocol

### 4.1 Client → Server Messages

```typescript
// Start Research Session
{
  type: 'start_research',
  entityId: string,
  researcherName: string,
  mode: 'full' | 'custom',
  schemas?: string[] // For custom mode: ['pricing', 'features']
}

// Send User Message
{
  type: 'user_message',
  entityId: string,
  content: string
}

// Control Actions
{
  type: 'pause_research',
  entityId: string
}

{
  type: 'stop_research',
  entityId: string
}

{
  type: 'resume_research',
  entityId: string
}

// Manual Extraction Request
{
  type: 'extract_schema',
  entityId: string,
  schemaType: 'pricing' | 'features' | 'compliance' | 'company' | 'integrations',
  url?: string // Optional specific URL to extract from
}

// Skip Schema
{
  type: 'skip_schema',
  entityId: string,
  schemaType: string,
  reason: string
}
```

### 4.2 Server → Client Messages

```typescript
// Session Started
{
  type: 'session_started',
  sessionId: string,
  entityId: string,
  entityName: string,
  researchPlan: {
    schemas: string[],
    totalSteps: number
  }
}

// Research Progress Update
{
  type: 'progress_update',
  entityId: string,
  currentStep: number,
  totalSteps: number,
  currentSchema: string,
  status: 'extracting' | 'analyzing' | 'complete'
}

// Screenshot Captured
{
  type: 'screenshot_captured',
  entityId: string,
  schemaType: string,
  screenshotPath: string,
  screenshotDescription: string,
  url: string
}

// Extraction Complete
{
  type: 'extraction_complete',
  entityId: string,
  extractionId: string,
  schemaType: string,
  assertionCount: number,
  dataSummary: object, // Preview of extracted data
  screenshotPath?: string
}

// Assertion Created
{
  type: 'assertion_created',
  entityId: string,
  assertion: {
    id: string,
    claim: string,
    category: string,
    evidenceScreenshotPath?: string,
    sourceUrl?: string
  }
}

// Assistant Message (streaming)
{
  type: 'assistant_chunk',
  entityId: string,
  text: string
}

// Assistant Message (complete)
{
  type: 'assistant_message',
  entityId: string,
  content: string
}

// Action Menu
{
  type: 'action_menu',
  entityId: string,
  message: string,
  actions: [
    { id: string, label: string, command: string }
  ]
}

// Research Complete
{
  type: 'research_complete',
  entityId: string,
  summary: {
    totalExtractions: number,
    totalAssertions: number,
    schemasCompleted: string[],
    schemasMissing: string[]
  }
}

// Error
{
  type: 'error',
  entityId: string,
  message: string,
  recoverable: boolean
}
```

---

## 5. Research Workflow States

### 5.1 State Machine

```
┌─────────┐
│  IDLE   │ (Entity selected, not researching)
└─────────┘
     │
     │ User clicks "Start Full Research"
     ▼
┌─────────────┐
│ INITIALIZING│ (Setting up session, loading entity data)
└─────────────┘
     │
     ▼
┌─────────────┐
│ RESEARCHING │ (Agent conducting extractions)
└─────────────┘
     │
     │ ┌──────── User clicks "Pause" ─────┐
     ▼                                     ▼
┌─────────┐                          ┌────────┐
│ PAUSED  │ ◄──── User resumes ───── │ PAUSED │
└─────────┘                          └────────┘
     │
     │ User clicks "Stop"
     ▼
┌──────────┐
│ COMPLETE │ (Research session finished)
└──────────┘
```

### 5.2 Status Indicators

| State | Icon | Color | Description |
|-------|------|-------|-------------|
| `idle` | ○ | Gray | Ready to research |
| `initializing` | ⏳ | Blue | Setting up session |
| `researching` | ● | Amber | Active research |
| `extracting-{schema}` | 📷 | Blue | Extracting specific schema |
| `paused` | ⏸ | Yellow | Paused by user |
| `complete` | ✓ | Green | All extractions done |
| `error` | ⚠ | Red | Error occurred |

---

## 6. Research Control Panel

### 6.1 Full Research Mode

When user clicks "Start Full Research":

1. WebSocket sends `start_research` with `mode: 'full'`
2. Agent determines research agenda:
   - Check existing extractions
   - Identify missing/stale schemas
   - Create ordered extraction plan
3. Agent proceeds through each schema sequentially:
   - Fetch URL
   - Capture screenshot
   - Extract data
   - Generate assertions
   - Report progress
4. User sees real-time updates in conversation panel

### 6.2 Custom Research Mode

Modal appears with checkboxes:

```html
<div class="modal custom-research-modal">
  <h3>Custom Research</h3>
  <p>Select schemas to extract:</p>

  <div class="schema-checklist">
    <label x-for="schema in schemas" :key="schema.type">
      <input
        type="checkbox"
        x-model="selectedSchemas"
        :value="schema.type"
      >
      <span x-html="schema.icon"></span>
      <span x-text="schema.label"></span>
      <span
        x-show="hasExtraction(schema.type)"
        class="stale-indicator"
        :class="{ stale: isStale(schema.type) }"
      >
        (last: <span x-text="getExtractionAge(schema.type)"></span>)
      </span>
    </label>
  </div>

  <div class="modal-actions">
    <button @click="showCustomResearchModal = false">Cancel</button>
    <button
      @click="startCustomResearch()"
      :disabled="selectedSchemas.length === 0"
    >
      Start Research (<span x-text="selectedSchemas.length"></span> schemas)
    </button>
  </div>
</div>
```

### 6.3 Manual Extraction Controls

Individual "Extract" buttons in Research Progress Panel:

- Disabled if extraction is already running for that schema
- Shows "⏳" spinner when active
- Updates immediately when extraction completes

---

## 7. Evidence Display

### 7.1 Screenshot Capture Flow

```
Agent Perspective:
1. CLI command: extract:fetch
2. Screenshot saved to disk
3. WebSocket: screenshot_captured message
4. Frontend receives message
5. Screenshot appears in chat thread
6. Screenshot thumbnail added to Evidence Gallery

User sees:
- Real-time screenshot in conversation
- Thumbnail in Research Progress Panel
- Full-size link in Evidence Gallery
```

### 7.2 Screenshot Message Component

```html
<div class="screenshot-message">
  <div class="screenshot-header">
    <span class="schema-badge pricing">💰 Pricing</span>
    <span class="screenshot-label">Evidence Captured</span>
    <span class="timestamp">2m ago</span>
  </div>

  <a href="/screenshots/2025-01/cursor-pricing-abc123.png" target="_blank">
    <img
      src="/screenshots/2025-01/cursor-pricing-abc123.png"
      class="screenshot-preview"
      loading="lazy"
    >
  </a>

  <p class="screenshot-description">
    Captured pricing page showing three tiers: Hobby (free), Pro ($20/mo), Business ($40/mo)
  </p>
</div>
```

**Styles:**

```css
.screenshot-message {
  background: var(--bg-secondary);
  border: 1px solid var(--border-light);
  border-radius: 12px;
  padding: var(--space-md);
  max-width: 85%;
}

.screenshot-header {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  margin-bottom: var(--space-sm);
}

.schema-badge {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 3px 8px;
  font-size: 0.75rem;
  font-weight: 500;
  border-radius: 4px;
  background: var(--status-validated-bg);
  color: var(--status-validated);
}

.screenshot-preview {
  width: 100%;
  max-height: 400px;
  object-fit: contain;
  border-radius: 8px;
  border: 1px solid var(--border-light);
  cursor: pointer;
  transition: transform var(--transition-fast);
}

.screenshot-preview:hover {
  transform: scale(1.02);
}

.screenshot-description {
  margin-top: var(--space-sm);
  font-size: 0.875rem;
  color: var(--text-secondary);
  font-style: italic;
}
```

---

## 8. Extraction Result Display

### 8.1 Extraction Complete Message

```html
<div class="extraction-message">
  <div class="extraction-header">
    <span class="schema-icon">💰</span>
    <span class="extraction-label">Pricing Extracted</span>
    <span class="assertion-count">12 assertions created</span>
  </div>

  <div class="extraction-summary">
    <div class="summary-item">
      <span class="summary-label">Free Tier:</span>
      <span class="summary-value">Yes (Hobby)</span>
    </div>
    <div class="summary-item">
      <span class="summary-label">Enterprise:</span>
      <span class="summary-value">Yes (Custom pricing)</span>
    </div>
    <div class="summary-item">
      <span class="summary-label">Tiers:</span>
      <span class="summary-value">3 (Hobby, Pro, Business)</span>
    </div>
    <div class="summary-item">
      <span class="summary-label">Lowest Price:</span>
      <span class="summary-value">$20/month</span>
    </div>
  </div>

  <button
    class="btn-view-data"
    @click="viewExtractionData(msg.extractionId)"
  >
    View Full Data
  </button>
</div>
```

### 8.2 Extraction Data Modal

When user clicks "View Full Data":

```html
<div class="modal extraction-data-modal">
  <div class="modal-header">
    <h3>Pricing Extraction Data</h3>
    <button @click="closeModal()">×</button>
  </div>

  <div class="modal-body">
    <div class="extraction-metadata">
      <div class="meta-row">
        <span class="meta-label">URL:</span>
        <a :href="extraction.url" target="_blank" x-text="extraction.url"></a>
      </div>
      <div class="meta-row">
        <span class="meta-label">Extracted:</span>
        <span x-text="formatDate(extraction.createdAt)"></span>
      </div>
      <div class="meta-row">
        <span class="meta-label">Screenshot:</span>
        <a :href="extraction.screenshotPath" target="_blank">View</a>
      </div>
    </div>

    <div class="extraction-data">
      <h4>Extracted Data</h4>
      <pre class="json-viewer" x-text="JSON.stringify(extraction.data, null, 2)"></pre>
    </div>

    <div class="generated-assertions">
      <h4>Generated Assertions (<span x-text="assertions.length"></span>)</h4>
      <div class="assertions-list">
        <template x-for="assertion in assertions" :key="assertion.id">
          <div class="assertion-card">
            <div class="assertion-header">
              <span class="category-badge" x-text="assertion.category"></span>
            </div>
            <p class="assertion-claim" x-text="assertion.claim"></p>
            <div class="assertion-meta">
              <span x-show="assertion.evidenceScreenshotPath">📷 Evidence</span>
              <span x-show="assertion.sourceUrl">🔗 Source</span>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</div>
```

---

## 9. Research Session Management

### 9.1 Session Persistence

**Problem:** User refreshes page during research session.

**Solution:**

1. Store active session in localStorage:
   ```javascript
   localStorage.setItem('activeResearchSession', JSON.stringify({
     entityId: 'xxx',
     sessionId: 'yyy',
     status: 'researching',
     startedAt: Date.now()
   }));
   ```

2. On page load, check for active session:
   ```javascript
   async init() {
     const saved = localStorage.getItem('activeResearchSession');
     if (saved) {
       const session = JSON.parse(saved);

       // Check if session is still valid (< 1 hour old)
       if (Date.now() - session.startedAt < 3600000) {
         // Attempt to reconnect
         this.currentEntityId = session.entityId;
         await this.loadEntity(session.entityId);

         // WebSocket will auto-resume on connection
       } else {
         // Session expired, clean up
         localStorage.removeItem('activeResearchSession');
       }
     }
   }
   ```

3. WebSocket reconnection:
   ```javascript
   ws.onopen = () => {
     const saved = localStorage.getItem('activeResearchSession');
     if (saved) {
       const session = JSON.parse(saved);
       this.sendWs({
         type: 'resume_session',
         sessionId: session.sessionId,
         entityId: session.entityId
       });
     }
   };
   ```

### 9.2 Multiple Entity Research

**Use Case:** User wants to research multiple entities in parallel.

**UI Pattern:**

- Sidebar shows status indicator for all entities
- Only one entity is "active" in conversation panel
- Background research sessions continue for other entities
- Notifications when background sessions complete

```javascript
{
  // Track multiple sessions
  researchSessions: {
    'entity-1': { status: 'researching', progress: 40 },
    'entity-2': { status: 'complete', progress: 100 },
    'entity-3': { status: 'paused', progress: 60 }
  },

  // Handle background completion
  handleMessage(msg) {
    if (msg.type === 'research_complete' && msg.entityId !== this.currentEntityId) {
      // Show notification
      this.showNotification({
        title: `Research complete: ${msg.entityName}`,
        type: 'success',
        action: {
          label: 'View Results',
          callback: () => this.selectEntity(msg.entityId)
        }
      });
    }
  }
}
```

---

## 10. Integration with Existing System

### 10.1 Shared Components

Reuse from validation tool:

- Header component (with "Research" title instead of "Validation")
- Sidebar structure (different content)
- WebSocket connection logic
- Message formatting utilities
- Alpine.js reactive patterns
- CSS design tokens and base styles

### 10.2 New Backend Endpoints

```typescript
// Research Session Management
POST   /api/research/start
POST   /api/research/:sessionId/pause
POST   /api/research/:sessionId/resume
POST   /api/research/:sessionId/stop
GET    /api/research/:sessionId/status

// Entity Research Data
GET    /api/entities/:id/extractions
GET    /api/entities/:id/research-status
GET    /api/entities/:id/recent-assertions

// Manual Extraction
POST   /api/entities/:id/extract/:schemaType

// Research Progress
GET    /api/projects/:id/research-gaps
GET    /api/projects/:id/coverage-summary
```

### 10.3 WebSocket Namespaces

Separate WebSocket namespaces to avoid confusion:

- `/ws/validation` - Existing validation tool
- `/ws/research` - New deep research tool

### 10.4 Authentication

Reuse existing auth check:

```javascript
async checkAuth() {
  try {
    const res = await fetch('/api/auth/status');
    this.authStatus = await res.json();

    if (!this.authStatus.valid) {
      // Show warning banner
      this.showAuthWarning = true;
    }
  } catch (error) {
    console.error('Failed to check auth:', error);
  }
}
```

---

## 11. User Experience Flows

### 11.1 Flow: First-Time Research

1. User opens Deep Research UI
2. Selects a project from sidebar
3. Clicks entity "Cursor"
4. Research Progress Panel shows:
   - Entity info
   - Coverage: All schemas missing
5. User clicks "▶ Start Full Research"
6. Conversation panel shows:
   ```
   Assistant: I'll research Cursor systematically across 5 areas:
   1. Pricing
   2. Features
   3. Compliance
   4. Company Info
   5. Integrations

   Starting with pricing...
   ```
7. User sees screenshot appear: "📷 Pricing page captured"
8. Extraction message: "💰 Pricing Extracted - 12 assertions created"
9. Progress panel updates: "✓ Pricing (just now)"
10. Process repeats for remaining schemas
11. Final message: "✓ Research complete. 5 extractions, 47 assertions created."

### 11.2 Flow: Refresh Stale Data

1. User selects entity with existing extractions
2. Research Progress Panel shows:
   - ✓ Pricing (3 days ago)
   - ✓ Features (3 days ago)
   - ⚠ Compliance (45 days ago) ← stale
3. User clicks "Extract" button next to Compliance
4. Agent fetches URL, captures screenshot, extracts data
5. Progress panel updates: "✓ Compliance (just now)"
6. User sees diff: "Changed: FedRAMP status updated from 'Not Authorized' to 'In Process'"

### 11.3 Flow: Custom Research

1. User clicks "⚙ Custom Research"
2. Modal shows schema checklist
3. User selects: Pricing, Features
4. Clicks "Start Research (2 schemas)"
5. Agent only extracts selected schemas
6. User can ask questions during research:
   ```
   User: Does Cursor have a free tier?
   Assistant: Yes, according to the pricing data I just extracted,
   Cursor offers a "Hobby" tier which is free and includes 2000
   completions per month.
   ```

---

## 12. Styling Guidelines

### 12.1 Design Tokens (Additional)

```css
:root {
  /* Research-specific colors */
  --research-in-progress: #457b9d;
  --research-complete: #2d6a4f;
  --research-stale: #e9c46a;
  --research-missing: #e8e5de;

  /* Extraction schema colors */
  --schema-pricing: #22c55e;
  --schema-features: #3b82f6;
  --schema-compliance: #8b5cf6;
  --schema-company: #f59e0b;
  --schema-integrations: #ec4899;
}
```

### 12.2 Component Styles

**Research Status Badges:**

```css
.status-dot.researching {
  background: var(--research-in-progress);
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.status-dot.complete {
  background: var(--research-complete);
}

.status-dot.stale {
  background: var(--research-stale);
  border: 2px solid var(--criticality-high);
}
```

**Coverage Grid:**

```css
.coverage-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-sm);
}

.coverage-item {
  background: var(--bg-secondary);
  border: 1px solid var(--border-light);
  border-radius: 8px;
  padding: var(--space-md);
  transition: border-color var(--transition-fast);
}

.coverage-item.complete {
  border-left: 3px solid var(--research-complete);
}

.coverage-item.stale {
  border-left: 3px solid var(--research-stale);
  background: #fff9e6;
}

.coverage-item.missing {
  border-left: 3px solid var(--research-missing);
}

.coverage-item.extracting {
  border-left: 3px solid var(--research-in-progress);
  background: #e3f2fd;
}
```

---

## 13. Implementation Phases

### Phase 1: Core UI (Week 1)
- [ ] Create `/research` HTML page
- [ ] Build sidebar with entity list
- [ ] Build research progress panel
- [ ] Build conversation panel (basic)
- [ ] Implement WebSocket connection
- [ ] Add session state management

### Phase 2: Research Controls (Week 2)
- [ ] Implement "Start Full Research" flow
- [ ] Add custom research modal
- [ ] Add manual extraction buttons
- [ ] Add pause/resume/stop controls
- [ ] Implement session persistence

### Phase 3: Evidence Display (Week 3)
- [ ] Screenshot message components
- [ ] Extraction result messages
- [ ] Evidence gallery in progress panel
- [ ] Assertion list display
- [ ] Extraction data modal

### Phase 4: Advanced Features (Week 4)
- [ ] Multi-entity research tracking
- [ ] Background research notifications
- [ ] Extraction diff viewer (detect changes)
- [ ] Research analytics dashboard
- [ ] Export research reports

---

## 14. Testing Plan

### 14.1 Unit Tests

- Alpine.js state mutations
- Message formatting functions
- WebSocket message handlers
- Date/time utilities (staleness checks)

### 14.2 Integration Tests

- Full research workflow
- Custom research workflow
- Session persistence after page reload
- Multi-entity research coordination
- Error recovery (network failures, timeout)

### 14.3 Manual Testing Scenarios

1. Research new entity (no prior extractions)
2. Refresh stale extractions
3. Pause and resume research
4. Stop research mid-extraction
5. Navigate between entities during research
6. Refresh page during active research
7. Handle WebSocket disconnection/reconnection
8. Test responsive layouts (mobile, tablet, desktop)

---

## 15. Open Questions

1. **Agent Autonomy:** Should agent automatically identify and fix gaps, or wait for user approval?
   - **Recommendation:** Agent identifies gaps, user clicks "Investigate Gap" buttons (similar to validation tool)

2. **Concurrent Extractions:** Should agent extract multiple schemas in parallel?
   - **Recommendation:** Sequential for now (easier to follow), parallel in Phase 4

3. **Research History:** Should we show extraction history (multiple versions over time)?
   - **Recommendation:** Yes, add "View History" button to show extraction timeline

4. **Entity Creation:** Should users create entities from within Deep Research UI?
   - **Recommendation:** Yes, add "New Entity" modal in sidebar

5. **Research Templates:** Should we offer preset research templates (e.g., "Federal Viability")?
   - **Recommendation:** Phase 4 feature - templates select specific schemas and custom prompts

---

## 16. Success Metrics

### 16.1 Performance Metrics

- Time to complete full entity research (target: <5 minutes)
- Screenshot capture success rate (target: >95%)
- Extraction parsing accuracy (measure against manual validation)
- WebSocket reconnection reliability (target: 100%)

### 16.2 User Experience Metrics

- Session completion rate (% of started sessions that finish)
- Average number of manual interventions per session
- User-initiated research vs. automated research ratio
- Time spent reviewing results vs. initiating research

### 16.3 Data Quality Metrics

- Assertions generated per extraction (average)
- Evidence chain completeness (% with screenshots)
- Extraction staleness (% older than 30 days)
- Coverage per entity (average schemas extracted)

---

## Appendix A: Complete Alpine.js Schema

```javascript
function deepResearchApp() {
  return {
    // ===== WebSocket =====
    ws: null,
    wsConnected: false,

    // ===== Auth =====
    authStatus: { method: 'checking', valid: false },
    validatorName: '',

    // ===== Sidebar =====
    projects: [],
    selectedProject: '',
    groupedEntities: [],
    sidebarCollapsed: false,
    showEntityModal: false,

    // ===== Current Entity =====
    currentEntityId: null,
    currentEntity: null,

    // ===== Research Session =====
    researchStatus: 'idle', // 'idle' | 'initializing' | 'researching' | 'paused' | 'complete'
    sessionId: null,
    researchProgress: {
      currentStep: 0,
      totalSteps: 0,
      currentSchema: null
    },

    // ===== Extractions =====
    schemas: [
      { type: 'pricing', label: 'Pricing', icon: '💰' },
      { type: 'features', label: 'Features', icon: '✨' },
      { type: 'compliance', label: 'Compliance', icon: '🔒' },
      { type: 'company', label: 'Company Info', icon: '🏢' },
      { type: 'integrations', label: 'Integrations', icon: '🔌' }
    ],
    extractions: [],
    extractingSchemas: new Set(), // Track which schemas are currently extracting

    // ===== Assertions & Evidence =====
    recentAssertions: [],
    screenshots: [],

    // ===== Conversation =====
    chatMessages: [],
    currentStreamText: '',
    isStreaming: false,
    userInput: '',

    // ===== Panels =====
    panelOpen: true,

    // ===== Modals =====
    showCustomResearchModal: false,
    selectedSchemas: [],

    // ===== Notifications =====
    notifications: [],

    // ===== Init =====
    async init() {
      await this.checkAuth();
      await this.loadProjects();
      await this.loadEntities();

      // Restore state
      const savedName = localStorage.getItem('researcherName');
      if (savedName) this.validatorName = savedName;

      const savedEntityId = localStorage.getItem('currentResearchEntity');
      if (savedEntityId) {
        await this.selectEntityById(savedEntityId);
      }

      this.connectWebSocket();
    },

    // ===== Entity Management =====
    async loadEntities() {
      const params = this.selectedProject ? `?projectId=${this.selectedProject}` : '';
      const res = await fetch(`/api/entities/with-research${params}`);
      const data = await res.json();

      if (data.success) {
        this.groupedEntities = data.data.map(project => ({
          ...project,
          expanded: true
        }));
      }
    },

    async selectEntity(entity) {
      this.currentEntityId = entity.id;
      this.currentEntity = entity;

      localStorage.setItem('currentResearchEntity', entity.id);

      // Load research data
      await Promise.all([
        this.loadExtractions(entity.id),
        this.loadRecentAssertions(entity.id),
        this.loadScreenshots(entity.id)
      ]);

      // Load conversation if session exists
      const conv = await this.loadConversation(entity.id);
      if (conv) {
        this.chatMessages = conv.messages;
        this.researchStatus = conv.status;
      } else {
        this.chatMessages = [];
        this.researchStatus = 'idle';
      }
    },

    // ===== Research Session =====
    startFullResearch() {
      if (!this.validatorName.trim() || !this.currentEntityId) return;

      localStorage.setItem('researcherName', this.validatorName);

      this.sendWs({
        type: 'start_research',
        entityId: this.currentEntityId,
        researcherName: this.validatorName,
        mode: 'full'
      });

      this.researchStatus = 'initializing';
    },

    startCustomResearch() {
      if (this.selectedSchemas.length === 0) return;

      this.sendWs({
        type: 'start_research',
        entityId: this.currentEntityId,
        researcherName: this.validatorName,
        mode: 'custom',
        schemas: this.selectedSchemas
      });

      this.showCustomResearchModal = false;
      this.researchStatus = 'initializing';
    },

    pauseResearch() {
      this.sendWs({
        type: 'pause_research',
        entityId: this.currentEntityId
      });
    },

    stopResearch() {
      this.sendWs({
        type: 'stop_research',
        entityId: this.currentEntityId
      });
    },

    // ===== Extraction Controls =====
    startExtraction(schemaType) {
      this.extractingSchemas.add(schemaType);

      this.sendWs({
        type: 'extract_schema',
        entityId: this.currentEntityId,
        schemaType: schemaType
      });
    },

    isExtracting(schemaType) {
      return this.extractingSchemas.has(schemaType);
    },

    // ===== Coverage Helpers =====
    getExtraction(schemaType) {
      return this.extractions.find(e => e.schemaType === schemaType);
    },

    getCoverageStatus(schemaType) {
      if (this.isExtracting(schemaType)) return 'extracting';

      const extraction = this.getExtraction(schemaType);
      if (!extraction) return 'missing';

      if (this.isStale(extraction.createdAt)) return 'stale';

      return 'complete';
    },

    isStale(dateString) {
      const days = (Date.now() - new Date(dateString)) / (1000 * 60 * 60 * 24);
      return days > 30;
    },

    getExtractionAge(schemaType) {
      const extraction = this.getExtraction(schemaType);
      if (!extraction) return 'never';

      const days = Math.floor((Date.now() - new Date(extraction.createdAt)) / (1000 * 60 * 60 * 24));

      if (days === 0) return 'today';
      if (days === 1) return 'yesterday';
      if (days < 7) return `${days} days ago`;
      if (days < 30) return `${Math.floor(days / 7)} weeks ago`;
      return `${Math.floor(days / 30)} months ago`;
    },

    // ===== WebSocket =====
    connectWebSocket() {
      const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
      const wsUrl = `${protocol}//${window.location.host}/ws/research`;

      this.ws = new WebSocket(wsUrl);

      this.ws.onopen = () => {
        console.log('Research WebSocket connected');
        this.wsConnected = true;

        // Resume session if active
        const savedSession = localStorage.getItem('activeResearchSession');
        if (savedSession) {
          const session = JSON.parse(savedSession);
          if (Date.now() - session.startedAt < 3600000) {
            this.sendWs({
              type: 'resume_session',
              sessionId: session.sessionId,
              entityId: session.entityId
            });
          }
        }
      };

      this.ws.onclose = () => {
        console.log('Research WebSocket disconnected');
        this.wsConnected = false;
        setTimeout(() => this.connectWebSocket(), 3000);
      };

      this.ws.onmessage = (event) => {
        this.handleMessage(JSON.parse(event.data));
      };
    },

    handleMessage(msg) {
      switch (msg.type) {
        case 'session_started':
          this.sessionId = msg.sessionId;
          this.researchStatus = 'researching';
          this.researchProgress = msg.researchPlan;

          localStorage.setItem('activeResearchSession', JSON.stringify({
            sessionId: msg.sessionId,
            entityId: msg.entityId,
            status: 'researching',
            startedAt: Date.now()
          }));
          break;

        case 'progress_update':
          this.researchProgress = {
            currentStep: msg.currentStep,
            totalSteps: msg.totalSteps,
            currentSchema: msg.currentSchema
          };
          break;

        case 'screenshot_captured':
          this.chatMessages.push({
            id: Date.now(),
            type: 'screenshot',
            role: 'assistant',
            schemaType: msg.schemaType,
            screenshotPath: msg.screenshotPath,
            description: msg.screenshotDescription,
            url: msg.url
          });

          this.screenshots.push({
            path: msg.screenshotPath,
            schemaType: msg.schemaType,
            description: msg.screenshotDescription
          });

          this.scrollToBottom();
          break;

        case 'extraction_complete':
          this.chatMessages.push({
            id: Date.now(),
            type: 'extraction',
            role: 'assistant',
            extractionId: msg.extractionId,
            schemaType: msg.schemaType,
            assertionCount: msg.assertionCount,
            dataSummary: msg.dataSummary,
            screenshotPath: msg.screenshotPath
          });

          // Remove from extracting set
          this.extractingSchemas.delete(msg.schemaType);

          // Refresh extractions
          this.loadExtractions(this.currentEntityId);

          this.scrollToBottom();
          break;

        case 'assertion_created':
          this.recentAssertions.unshift(msg.assertion);
          if (this.recentAssertions.length > 20) {
            this.recentAssertions = this.recentAssertions.slice(0, 20);
          }
          break;

        case 'assistant_chunk':
          if (!this.isStreaming) {
            this.isStreaming = true;
            this.currentStreamText = '';
          }
          this.currentStreamText += msg.text;
          this.scrollToBottom();
          break;

        case 'assistant_message':
          if (this.isStreaming) {
            this.chatMessages.push({
              id: Date.now(),
              type: 'text',
              role: 'assistant',
              content: this.currentStreamText
            });
            this.currentStreamText = '';
            this.isStreaming = false;
          } else {
            this.chatMessages.push({
              id: Date.now(),
              type: 'text',
              role: 'assistant',
              content: msg.content
            });
          }
          this.scrollToBottom();
          break;

        case 'research_complete':
          this.researchStatus = 'complete';
          this.chatMessages.push({
            id: Date.now(),
            type: 'text',
            role: 'assistant',
            content: `✓ Research complete!\n\n` +
                     `- ${msg.summary.totalExtractions} extractions\n` +
                     `- ${msg.summary.totalAssertions} assertions created\n` +
                     `- Schemas completed: ${msg.summary.schemasCompleted.join(', ')}`
          });

          localStorage.removeItem('activeResearchSession');

          this.scrollToBottom();
          break;

        case 'error':
          this.chatMessages.push({
            id: Date.now(),
            type: 'text',
            role: 'system',
            content: `Error: ${msg.message}`
          });

          if (!msg.recoverable) {
            this.researchStatus = 'idle';
          }
          break;
      }
    },

    sendWs(data) {
      if (this.ws && this.ws.readyState === WebSocket.OPEN) {
        this.ws.send(JSON.stringify(data));
      }
    },

    // ===== UI Utilities =====
    scrollToBottom() {
      this.$nextTick(() => {
        const container = this.$refs.chatContainer;
        if (container) {
          container.scrollTop = container.scrollHeight;
        }
      });
    },

    formatMessage(content) {
      // Same as validation tool
      return content; // Simplified - use actual markdown formatting
    }
  };
}
```

---

## Appendix B: Backend Session Manager Pseudocode

```typescript
// src/server/research-session-manager.ts

import { query } from '@anthropic-ai/agent-sdk';

class ResearchSession {
  entityId: string;
  sessionId: string;
  status: 'initializing' | 'researching' | 'paused' | 'complete';
  researchPlan: { schemas: string[], totalSteps: number };
  currentStep: number;
  ws: WebSocket;

  async start(mode: 'full' | 'custom', schemas?: string[]) {
    this.status = 'initializing';

    // Determine research plan
    if (mode === 'full') {
      this.researchPlan = await this.planFullResearch();
    } else {
      this.researchPlan = { schemas, totalSteps: schemas.length };
    }

    // Send session started
    this.ws.send(JSON.stringify({
      type: 'session_started',
      sessionId: this.sessionId,
      entityId: this.entityId,
      researchPlan: this.researchPlan
    }));

    this.status = 'researching';

    // Execute research using Claude Agent SDK
    await this.executeResearch();
  }

  async executeResearch() {
    for (const schemaType of this.researchPlan.schemas) {
      if (this.status !== 'researching') break;

      this.currentStep++;

      // Send progress update
      this.ws.send(JSON.stringify({
        type: 'progress_update',
        entityId: this.entityId,
        currentStep: this.currentStep,
        totalSteps: this.researchPlan.totalSteps,
        currentSchema: schemaType
      }));

      // Use Claude Agent SDK to execute extraction
      await this.extractSchema(schemaType);
    }

    this.status = 'complete';

    // Send completion
    this.ws.send(JSON.stringify({
      type: 'research_complete',
      entityId: this.entityId,
      summary: await this.getResearchSummary()
    }));
  }

  async extractSchema(schemaType: string) {
    // 1. Fetch URL using CLI
    const fetchResult = await query({
      systemPrompt: RESEARCH_AGENT_PROMPT,
      userMessage: `Execute: npm run cli -- extract:fetch '{"url": "${this.entity.url}/${schemaType}", "entityId": "${this.entityId}"}'`,
      tools: MCP_TOOLS
    });

    // Parse result to get screenshotPath, cacheId
    const { screenshotPath, cacheId } = parseFetchResult(fetchResult);

    // 2. Send screenshot captured message
    this.ws.send(JSON.stringify({
      type: 'screenshot_captured',
      entityId: this.entityId,
      schemaType: schemaType,
      screenshotPath: screenshotPath,
      screenshotDescription: `Captured ${schemaType} page`,
      url: `${this.entity.url}/${schemaType}`
    }));

    // 3. Analyze screenshot and extract data
    const extractionResult = await query({
      systemPrompt: RESEARCH_AGENT_PROMPT,
      userMessage: `Analyze the screenshot and extract ${schemaType} data. Then save with: npm run cli -- extract:save`,
      tools: MCP_TOOLS,
      images: [{
        path: screenshotPath
      }]
    });

    // Parse extraction result
    const { extractionId, assertionsCreated } = parseExtractionResult(extractionResult);

    // 4. Send extraction complete
    this.ws.send(JSON.stringify({
      type: 'extraction_complete',
      entityId: this.entityId,
      extractionId: extractionId,
      schemaType: schemaType,
      assertionCount: assertionsCreated.length,
      dataSummary: await this.getExtractionSummary(extractionId),
      screenshotPath: screenshotPath
    }));

    // 5. Send assertion created messages
    for (const assertionId of assertionsCreated) {
      const assertion = await this.loadAssertion(assertionId);
      this.ws.send(JSON.stringify({
        type: 'assertion_created',
        entityId: this.entityId,
        assertion: assertion
      }));
    }
  }
}
```

---

## Summary

This design document provides a complete blueprint for building a browser-based deep research UI that:

1. **Mirrors validation tool architecture** - Reuses sidebar, WebSocket, Alpine.js patterns
2. **Focuses on evidence collection** - Screenshot capture, extraction workflows, assertion generation
3. **Provides real-time progress** - Live updates, streaming responses, status indicators
4. **Enables human oversight** - Manual extraction controls, custom research modes, conversation panel
5. **Integrates with existing system** - Uses same CLI commands, database schema, MCP tools

The design is production-ready and can be implemented in phases over 4 weeks.
