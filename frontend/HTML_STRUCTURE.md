# Grove Frontend - HTML Structure Design

## Observatory Console Aesthetic
- **Dark Theme**: Near-black backgrounds (#0a0e27), text on emerald accents (#10b981)
- **Typography**: JetBrains Mono for data/stats, Inter for body text
- **Visual Language**: Technical precision, circuit-board borders, subtle glow effects
- **Interactive States**: Smooth transitions, luminous borders on focus/hover

---

## DOM Structure Overview

```
<html>
  <head>
    [Meta, Styles, Fonts]
  </head>
  <body class="grove-observatory">
    ├── <div class="grove-root">
    │   ├── <header class="grove-header">
    │   │   ├── [Header Content]
    │   ├── <nav class="grove-breadcrumb">
    │   │   ├── [Breadcrumb Content]
    │   ├── <main class="grove-main">
    │   │   ├── <div class="grove-canvas">
    │   │   │   ├── [D3 Visualization]
    │   │   └── <div class="grove-detail-panel">
    │   │       ├── [Entity Details]
    │   └── <div class="grove-tooltip">
    │       ├── [Tooltip Content]
    └── [Modals, Portals]
```

---

## 1. HEADER SECTION
**Purpose**: Top navigation bar with branding, project selector, and key statistics

### Structure
```html
<header class="grove-header">
  <div class="grove-header__container">

    <!-- Logo & Brand -->
    <div class="grove-header__brand">
      <a href="/" class="grove-logo">
        <svg class="grove-logo__icon" aria-hidden="true">
          <!-- Grove/Observatory icon -->
        </svg>
        <span class="grove-logo__text">Deep Research</span>
      </a>
      <span class="grove-header__subtitle">Observatory Console</span>
    </div>

    <!-- Project Selector -->
    <div class="grove-header__project-selector">
      <label class="grove-label" htmlFor="project-select">Project</label>
      <select id="project-select" class="grove-select grove-select--compact">
        <option value="">Select a project...</option>
      </select>
      <button
        class="grove-button grove-button--icon-only"
        title="New project"
        aria-label="Create new project"
      >
        <span class="grove-icon">+</span>
      </button>
    </div>

    <!-- Stats Chips -->
    <div class="grove-header__stats">
      <div class="grove-chip">
        <span class="grove-chip__label">Entities</span>
        <span class="grove-chip__value grove-mono">0</span>
      </div>
      <div class="grove-chip">
        <span class="grove-chip__label">Assertions</span>
        <span class="grove-chip__value grove-mono">0</span>
      </div>
      <div class="grove-chip">
        <span class="grove-chip__label">Validated</span>
        <span class="grove-chip__value grove-mono">0%</span>
      </div>
      <div class="grove-chip grove-chip--highlight">
        <span class="grove-chip__label">Coverage</span>
        <span class="grove-chip__value grove-mono">0%</span>
      </div>
    </div>

    <!-- User Menu -->
    <div class="grove-header__user-menu">
      <button
        class="grove-button grove-button--icon-only"
        title="Settings"
        aria-label="Open settings"
      >
        <span class="grove-icon">⚙</span>
      </button>
    </div>

  </div>
</header>
```

### Class Structure
- `grove-header` - Main header container
  - `grove-header__container` - Inner flex container
  - `grove-header__brand` - Logo section
    - `grove-logo` - Logo link
      - `grove-logo__icon` - SVG icon
      - `grove-logo__text` - Text label
    - `grove-header__subtitle` - Tagline
  - `grove-header__project-selector` - Project picker
    - `grove-label` - Form label
    - `grove-select` - Native select (emerald accent on focus)
    - `grove-button` - Action button
  - `grove-header__stats` - Stats display
    - `grove-chip` - Individual stat chip
      - `grove-chip__label` - Stat name
      - `grove-chip__value` - Stat number
      - `grove-chip--highlight` - Emphasis variant
  - `grove-header__user-menu` - Right-side menu
    - `grove-button` - Icon-only button

---

## 2. BREADCRUMB SECTION
**Purpose**: Navigation path showing current location in hierarchy

### Structure
```html
<nav
  class="grove-breadcrumb"
  aria-label="Breadcrumb navigation"
>
  <ol class="grove-breadcrumb__list">

    <!-- Home breadcrumb -->
    <li class="grove-breadcrumb__item">
      <a href="/" class="grove-breadcrumb__link">
        <span class="grove-icon">⌂</span>
        <span>Home</span>
      </a>
    </li>

    <!-- Project breadcrumb -->
    <li class="grove-breadcrumb__item">
      <span class="grove-breadcrumb__separator">/</span>
      <a
        href="#/project/abc123"
        class="grove-breadcrumb__link"
        data-breadcrumb-type="project"
      >
        <span class="grove-breadcrumb__icon">📊</span>
        <span class="grove-breadcrumb__text">AI Tools 2025</span>
      </a>
    </li>

    <!-- Category breadcrumb -->
    <li class="grove-breadcrumb__item" data-breadcrumb-type="category">
      <span class="grove-breadcrumb__separator">/</span>
      <a
        href="#/project/abc123/category/xyz789"
        class="grove-breadcrumb__link"
      >
        <span class="grove-breadcrumb__icon">🔍</span>
        <span class="grove-breadcrumb__text">Code Assistants</span>
      </a>
    </li>

    <!-- Entity breadcrumb (read-only current location) -->
    <li class="grove-breadcrumb__item grove-breadcrumb__item--current">
      <span class="grove-breadcrumb__separator">/</span>
      <span class="grove-breadcrumb__text">Cursor</span>
      <span class="grove-breadcrumb__badge">Selected</span>
    </li>

  </ol>

  <!-- Breadcrumb controls -->
  <div class="grove-breadcrumb__controls">
    <button
      class="grove-button grove-button--secondary"
      title="Clear selection"
      aria-label="Clear entity selection"
    >
      ✕ Clear
    </button>
  </div>

</nav>
```

### Class Structure
- `grove-breadcrumb` - Nav container
  - `grove-breadcrumb__list` - Ordered list
    - `grove-breadcrumb__item` - List item
      - `grove-breadcrumb__item--current` - Current page (read-only)
      - `grove-breadcrumb__link` - Navigation link
        - `grove-breadcrumb__icon` - Icon before text
        - `grove-breadcrumb__text` - Link text
      - `grove-breadcrumb__separator` - "/" divider
      - `grove-breadcrumb__badge` - Status badge (e.g., "Selected")
  - `grove-breadcrumb__controls` - Right-side actions

---

## 3. MAIN CANVAS SECTION
**Purpose**: Contains D3 radial visualization and detail panel

### Structure
```html
<main class="grove-main">
  <div class="grove-workspace">

    <!-- Left side: Visualization canvas -->
    <div class="grove-canvas-wrapper">

      <div class="grove-canvas-header">
        <h2 class="grove-canvas-title">
          <span class="grove-icon">◈</span>
          Entity Network
        </h2>
        <div class="grove-canvas-controls">
          <button
            class="grove-button grove-button--icon-only grove-button--sm"
            title="Zoom in"
            aria-label="Zoom in"
          >
            +
          </button>
          <button
            class="grove-button grove-button--icon-only grove-button--sm"
            title="Zoom out"
            aria-label="Zoom out"
          >
            −
          </button>
          <button
            class="grove-button grove-button--icon-only grove-button--sm"
            title="Reset view"
            aria-label="Reset visualization view"
          >
            ⟲
          </button>
          <button
            class="grove-button grove-button--icon-only grove-button--sm"
            title="Simulation settings"
            aria-label="Open simulation settings"
          >
            ⚙
          </button>
        </div>
      </div>

      <!-- SVG Container for D3 -->
      <svg
        class="grove-canvas"
        id="grove-visualization"
        role="img"
        aria-label="Entity network visualization"
      >
        <!-- D3 will populate this -->
      </svg>

      <!-- Loading state -->
      <div
        class="grove-canvas-loading"
        id="grove-canvas-loading"
        aria-hidden="true"
      >
        <div class="grove-spinner">
          <span class="grove-spinner__ring"></span>
        </div>
        <p class="grove-loading-text">Loading network visualization...</p>
      </div>

      <!-- Empty state -->
      <div
        class="grove-canvas-empty"
        id="grove-canvas-empty"
        aria-hidden="true"
      >
        <span class="grove-icon grove-icon--large">○</span>
        <p>No entities in this category</p>
        <button class="grove-button grove-button--primary">
          Add entity
        </button>
      </div>

    </div>

    <!-- Right side: Detail panel (slides in) -->
    <div
      class="grove-detail-panel"
      id="grove-detail-panel"
      aria-hidden="true"
    >
      <div class="grove-detail-panel__content">
        <!-- Content loaded via data attributes and DOM updates -->
      </div>
    </div>

  </div>
</main>
```

### Class Structure
- `grove-main` - Main content area
  - `grove-workspace` - Flex container for canvas + panel
    - `grove-canvas-wrapper` - Left side canvas container
      - `grove-canvas-header` - Title and controls
        - `grove-canvas-title` - Section title
        - `grove-canvas-controls` - Button group
      - `grove-canvas` - SVG element (D3 target)
      - `grove-canvas-loading` - Loading spinner
        - `grove-spinner` - Animated loader
      - `grove-canvas-empty` - Empty state
    - `grove-detail-panel` - Right side sliding panel
      - `grove-detail-panel__content` - Dynamic content area

---

## 4. DETAIL PANEL (RIGHT SIDEBAR)
**Purpose**: Shows full entity details when selected; slides in from right

### Structure
```html
<div
  class="grove-detail-panel"
  id="grove-detail-panel"
  aria-label="Entity detail panel"
  role="complementary"
>
  <div class="grove-detail-panel__content">

    <!-- Close button -->
    <button
      class="grove-detail-panel__close"
      title="Close detail panel"
      aria-label="Close entity details"
    >
      ✕
    </button>

    <!-- Entity Header -->
    <div class="grove-detail-header">
      <div class="grove-entity-header">

        <!-- Logo -->
        <div class="grove-entity-logo">
          <img
            class="grove-entity-logo__image"
            src="/logos/cursor.svg"
            alt="Cursor logo"
            loading="lazy"
          />
        </div>

        <!-- Entity Name & URL -->
        <div class="grove-entity-info">
          <h3 class="grove-entity-name">Cursor</h3>
          <a
            href="https://cursor.com"
            class="grove-entity-url"
            target="_blank"
            rel="noopener noreferrer"
          >
            cursor.com
            <span class="grove-icon grove-icon--sm">↗</span>
          </a>
        </div>

        <!-- Quick Actions -->
        <div class="grove-entity-actions">
          <button
            class="grove-button grove-button--icon-only"
            title="Copy URL"
            aria-label="Copy entity URL to clipboard"
          >
            📋
          </button>
          <button
            class="grove-button grove-button--icon-only"
            title="Edit entity"
            aria-label="Edit entity details"
          >
            ✎
          </button>
        </div>

      </div>
    </div>

    <!-- Divider -->
    <div class="grove-divider"></div>

    <!-- Stats Section -->
    <section class="grove-detail-section">
      <h4 class="grove-detail-section__title">Statistics</h4>

      <div class="grove-stat-grid">

        <div class="grove-stat">
          <span class="grove-stat__label">Total Assertions</span>
          <span class="grove-stat__value grove-mono">24</span>
          <span class="grove-stat__unit">claims</span>
        </div>

        <div class="grove-stat">
          <span class="grove-stat__label">Validated</span>
          <span class="grove-stat__value grove-mono">18</span>
          <span class="grove-stat__unit">75%</span>
        </div>

        <div class="grove-stat">
          <span class="grove-stat__label">Buzz Score</span>
          <span class="grove-stat__value grove-mono">8.4/10</span>
          <span class="grove-stat__badge grove-stat__badge--warm">High</span>
        </div>

        <div class="grove-stat">
          <span class="grove-stat__label">Last Updated</span>
          <span class="grove-stat__value grove-mono">2 hours ago</span>
          <span class="grove-stat__unit">ago</span>
        </div>

      </div>

      <!-- Validation Progress Bar -->
      <div class="grove-progress-container">
        <label class="grove-progress-label">Validation Progress</label>
        <div class="grove-progress-bar">
          <div
            class="grove-progress-fill"
            style="width: 75%"
            role="progressbar"
            aria-valuenow="75"
            aria-valuemin="0"
            aria-valuemax="100"
            aria-label="75% assertions validated"
          ></div>
        </div>
        <span class="grove-progress-text grove-mono">18 of 24</span>
      </div>

    </section>

    <!-- Assertions Section -->
    <section class="grove-detail-section">
      <div class="grove-detail-section__header">
        <h4 class="grove-detail-section__title">Assertions</h4>
        <span class="grove-badge">24</span>
      </div>

      <!-- Assertion Filter Tabs -->
      <div class="grove-assertion-filters">
        <button
          class="grove-filter-tab grove-filter-tab--active"
          data-filter="all"
        >
          All (24)
        </button>
        <button
          class="grove-filter-tab"
          data-filter="claim"
        >
          Claim (6)
        </button>
        <button
          class="grove-filter-tab"
          data-filter="evidence"
        >
          Evidence (18)
        </button>
        <button
          class="grove-filter-tab"
          data-filter="rejected"
        >
          Rejected (0)
        </button>
      </div>

      <!-- Assertions grouped by category -->
      <div class="grove-assertions-list">

        <!-- Category Group: Features -->
        <div class="grove-assertion-group">
          <h5 class="grove-assertion-group__title">
            <span class="grove-icon">✓</span>
            Features
            <span class="grove-badge grove-badge--sm">12</span>
          </h5>

          <ol class="grove-assertion-group__items">

            <!-- Single Assertion Item -->
            <li class="grove-assertion-item">
              <div class="grove-assertion-item__header">
                <span class="grove-assertion-status grove-assertion-status--evidence">
                  ✓ Evidence
                </span>
                <span class="grove-assertion-claim">
                  Supports multi-file editing across project
                </span>
              </div>

              <div class="grove-assertion-item__details">
                <p class="grove-assertion-reasoning">
                  Key differentiator compared to standard VS Code completion
                </p>

                <!-- Evidence Screenshot -->
                <div class="grove-assertion-evidence">
                  <img
                    class="grove-assertion-evidence__image"
                    src="screenshots/cursor-multifile.png"
                    alt="Screenshot showing multi-file editing"
                    loading="lazy"
                  />
                  <p class="grove-assertion-evidence__caption">
                    Multi-file editing in action
                  </p>
                </div>

                <!-- Source Link -->
                <div class="grove-assertion-source">
                  <a
                    href="https://cursor.com/features"
                    class="grove-source-link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span class="grove-icon grove-icon--sm">🔗</span>
                    Source
                  </a>
                </div>
              </div>

              <!-- Actions -->
              <div class="grove-assertion-item__actions">
                <button
                  class="grove-button grove-button--sm grove-button--secondary"
                  title="View assertion details"
                  aria-label="View full assertion details"
                >
                  View
                </button>
                <button
                  class="grove-button grove-button--sm grove-button--icon-only"
                  title="Edit assertion"
                  aria-label="Edit this assertion"
                >
                  ✎
                </button>
              </div>

            </li>

            <!-- Additional assertion items follow same structure -->

          </ol>
        </div>

        <!-- Category Group: Pricing -->
        <div class="grove-assertion-group">
          <h5 class="grove-assertion-group__title">
            <span class="grove-icon">💰</span>
            Pricing
            <span class="grove-badge grove-badge--sm">5</span>
          </h5>

          <ol class="grove-assertion-group__items">
            <!-- Assertion items -->
          </ol>
        </div>

        <!-- Category Group: Compliance -->
        <div class="grove-assertion-group">
          <h5 class="grove-assertion-group__title">
            <span class="grove-icon">🔒</span>
            Compliance
            <span class="grove-badge grove-badge--sm">7</span>
          </h5>

          <ol class="grove-assertion-group__items">
            <!-- Assertion items -->
          </ol>
        </div>

      </div>

    </section>

    <!-- Evidence Screenshots Section -->
    <section class="grove-detail-section">
      <h4 class="grove-detail-section__title">All Evidence</h4>

      <div class="grove-gallery">
        <button
          class="grove-gallery-item"
          data-screenshot-id="screenshot-1"
        >
          <img
            class="grove-gallery-item__image"
            src="screenshots/cursor-ui-1.png"
            alt="Cursor interface screenshot 1"
            loading="lazy"
          />
          <span class="grove-gallery-item__label">UI Overview</span>
        </button>

        <button
          class="grove-gallery-item"
          data-screenshot-id="screenshot-2"
        >
          <img
            class="grove-gallery-item__image"
            src="screenshots/cursor-pricing.png"
            alt="Cursor pricing page screenshot"
            loading="lazy"
          />
          <span class="grove-gallery-item__label">Pricing</span>
        </button>

        <!-- More gallery items -->
      </div>

    </section>

  </div>
</div>
```

### Class Structure
- `grove-detail-panel` - Outer sliding container
  - `grove-detail-panel__content` - Content wrapper
  - `grove-detail-panel__close` - Close button
  - `grove-detail-header` - Entity header section
    - `grove-entity-header` - Header container
      - `grove-entity-logo` - Logo wrapper
        - `grove-entity-logo__image` - Logo image
      - `grove-entity-info` - Name/URL section
        - `grove-entity-name` - Entity name
        - `grove-entity-url` - Website link
      - `grove-entity-actions` - Quick action buttons
  - `grove-divider` - Visual separator
  - `grove-detail-section` - Reusable section container
    - `grove-detail-section__header` - Section header
    - `grove-detail-section__title` - Section title
    - Content varies by section
  - `grove-stat-grid` - Stats grid layout
    - `grove-stat` - Individual stat
      - `grove-stat__label` - Stat name
      - `grove-stat__value` - Stat number (monospace)
      - `grove-stat__unit` - Unit text
      - `grove-stat__badge` - Badge variant
  - `grove-progress-container` - Progress bar section
    - `grove-progress-label` - Label above bar
    - `grove-progress-bar` - Bar container
      - `grove-progress-fill` - Animated fill
    - `grove-progress-text` - Percentage text
  - `grove-assertion-filters` - Filter tabs
    - `grove-filter-tab` - Individual tab button
      - `grove-filter-tab--active` - Currently selected
  - `grove-assertions-list` - All assertions container
    - `grove-assertion-group` - Category group
      - `grove-assertion-group__title` - Group header
      - `grove-assertion-group__items` - List of assertions
        - `grove-assertion-item` - Single assertion
          - `grove-assertion-item__header` - Assertion title/status
            - `grove-assertion-status` - Status badge
              - `grove-assertion-status--evidence` - Status variant
            - `grove-assertion-claim` - Claim text
          - `grove-assertion-item__details` - Details section
            - `grove-assertion-reasoning` - Why it matters
            - `grove-assertion-evidence` - Screenshot section
              - `grove-assertion-evidence__image` - Image
              - `grove-assertion-evidence__caption` - Caption
            - `grove-assertion-source` - Source link
              - `grove-source-link` - Link element
          - `grove-assertion-item__actions` - Action buttons
  - `grove-gallery` - Evidence gallery
    - `grove-gallery-item` - Clickable image
      - `grove-gallery-item__image` - Image element
      - `grove-gallery-item__label` - Label below image

---

## 5. TOOLTIP
**Purpose**: Shows on hover over nodes/assertions with quick info

### Structure
```html
<div
  class="grove-tooltip"
  id="grove-tooltip"
  role="tooltip"
  aria-hidden="true"
>
  <div class="grove-tooltip__content">

    <!-- Entity preview -->
    <div class="grove-tooltip-preview">
      <h4 class="grove-tooltip-title">Cursor</h4>

      <div class="grove-tooltip-meta">
        <span class="grove-tooltip-meta__item">
          <span class="grove-icon">✓</span>
          18 assertions
        </span>
        <span class="grove-tooltip-meta__item">
          <span class="grove-icon">🔍</span>
          75% validated
        </span>
      </div>

      <p class="grove-tooltip-description">
        AI-powered code editor with multi-file editing and 2M token context
      </p>

      <div class="grove-tooltip-actions">
        <button class="grove-button grove-button--sm grove-button--primary">
          View Details
        </button>
      </div>

    </div>

  </div>

  <!-- Arrow/pointer -->
  <div class="grove-tooltip__arrow"></div>
</div>
```

### Class Structure
- `grove-tooltip` - Main container
  - `grove-tooltip__content` - Content wrapper
    - `grove-tooltip-preview` - Entity preview
      - `grove-tooltip-title` - Entity name
      - `grove-tooltip-meta` - Quick stats
        - `grove-tooltip-meta__item` - Individual stat
      - `grove-tooltip-description` - Short description
      - `grove-tooltip-actions` - Action buttons
  - `grove-tooltip__arrow` - Pointer arrow

---

## 6. GLOBAL UTILITY CLASSES

### Base Components
```
.grove-button - Primary button
  .grove-button--primary - Primary variant
  .grove-button--secondary - Secondary variant
  .grove-button--icon-only - Icon-only button
  .grove-button--sm - Small size

.grove-badge - Status badge
  .grove-badge--sm - Small size
  .grove-badge--warm - Warm color
  .grove-badge--cool - Cool color

.grove-icon - Icon wrapper
  .grove-icon--sm - Small icon
  .grove-icon--large - Large icon

.grove-select - Native select element
  .grove-select--compact - Compact size

.grove-label - Form label

.grove-divider - Horizontal line

.grove-spinner - Loading spinner
  .grove-spinner__ring - Spinning ring animation

.grove-mono - Monospace typography (JetBrains Mono)
```

### Layout & Theming
```
.grove-root - Root container with theme
.grove-observatory - Dark theme class on body
.grove-workspace - Flex workspace container
.grove-container - Max-width container
```

### Responsive States
```
.grove-detail-panel--open - Detail panel visible
.grove-detail-panel--closed - Detail panel hidden (translated out)
.grove-canvas-loading--active - Show loading state
.grove-canvas-empty--active - Show empty state
```

### Accessibility States
```
[aria-hidden="true"] - Hidden from a11y tree
[aria-label] - Accessible label
[aria-labelledby] - Label reference
[role="..."] - ARIA role
```

---

## 7. DATA ATTRIBUTES FOR INTERACTIVITY

### Canvas/Nodes
```html
<g class="grove-node"
   data-node-id="entity-abc123"
   data-node-type="entity"
   data-node-category="code_assistants"
   data-buzz-score="8.4">
</g>
```

### Assertions
```html
<li class="grove-assertion-item"
    data-assertion-id="assertion-xyz789"
    data-assertion-status="evidence"
    data-assertion-category="feature">
</li>
```

### Breadcrumbs
```html
<a class="grove-breadcrumb__link"
   data-breadcrumb-type="project"
   href="#/project/abc123">
</a>
```

### Filter Tabs
```html
<button class="grove-filter-tab"
        data-filter="claim">
</button>
```

---

## 8. RESPONSIVE DESIGN BREAKPOINTS

```
Mobile (<768px):
  - Single column layout
  - Detail panel full width (not slide-in)
  - Compact header
  - Hidden breadcrumb on very small screens

Tablet (768px - 1024px):
  - Canvas takes 60%, panel 40%
  - Responsive grid layouts

Desktop (>1024px):
  - Canvas 70%, panel 30%
  - Full breadcrumb visible
  - All controls visible
```

---

## 9. ANIMATION & TRANSITION SPECIFICATIONS

```css
/* Smooth sliding in/out */
.grove-detail-panel
  transition: transform 300ms ease-out, opacity 300ms ease-out

/* Node interactions */
.grove-node
  transition: r 200ms ease-out, opacity 200ms ease-out

/* Hover glow effects */
.grove-node:hover
  filter: drop-shadow(0 0 8px #10b981)

/* Progress bar fill */
.grove-progress-fill
  transition: width 600ms ease-out

/* Spinner rotation */
@keyframes grove-spin
  0% transform: rotate(0deg)
  100% transform: rotate(360deg)
```

---

## 10. SEMANTIC HTML CHECKLIST

- [ ] Proper heading hierarchy (h1 > h2 > h3, etc.)
- [ ] Form elements with associated labels
- [ ] Navigation landmarks (`<nav>`, `<main>`)
- [ ] List elements for grouped content (`<ol>`, `<ul>`)
- [ ] ARIA roles and labels where needed
- [ ] Images have descriptive alt text
- [ ] Links have descriptive text or aria-label
- [ ] Buttons for actionable elements (not links)
- [ ] Complementary role on side panels
- [ ] Progressive enhancement (works without JS for basics)

---

## 11. STYLING STRATEGY

### Color Palette
```
Background: #0a0e27 (near-black)
Surface: #0f1536 (slightly lighter)
Accent: #10b981 (emerald green)
Accent-Light: #6ee7b7 (light emerald)
Accent-Dark: #059669 (dark emerald)
Text-Primary: #f3f4f6 (light gray)
Text-Secondary: #9ca3af (medium gray)
Border: #1f2937 (dark gray)
Error: #ef4444 (red)
Warning: #f59e0b (amber)
Success: #10b981 (emerald)
```

### Typography
```
Headings: Inter, sans-serif
Body: Inter, sans-serif
Data/Mono: JetBrains Mono, monospace

Scale:
  h1: 32px (2rem)
  h2: 24px (1.5rem)
  h3: 20px (1.25rem)
  h4: 16px (1rem)
  h5: 14px (0.875rem)
  body: 14px (0.875rem)
  small: 12px (0.75rem)
```

### Spacing Scale
```
xs: 4px
sm: 8px
md: 16px
lg: 24px
xl: 32px
2xl: 48px
```

### Border & Shadow
```
Border: 1px solid #1f2937 (with subtle glow on focus)
Shadow: 0 4px 6px rgba(0, 0, 0, 0.3)
Glow: 0 0 8px rgba(16, 185, 129, 0.3)
```

---

## 12. EXAMPLE: FULL ENTITY NODE ELEMENT (D3)

```html
<g class="grove-node"
   data-node-id="cursor-123"
   data-node-type="entity"
   data-entity-name="Cursor"
   data-buzz-score="8.4">

  <!-- Node circle -->
  <circle class="grove-node__circle"
          r="24"
          fill="#10b981"
          opacity="0.8"></circle>

  <!-- Outer glow ring (hover state) -->
  <circle class="grove-node__glow"
          r="24"
          fill="none"
          stroke="#10b981"
          stroke-width="2"
          opacity="0"></circle>

  <!-- Entity name label (inside/above node) -->
  <text class="grove-node__label"
        text-anchor="middle"
        dy="-28">
    Cursor
  </text>

  <!-- Icon inside node -->
  <text class="grove-node__icon"
        text-anchor="middle"
        dy="0.3em">
    🖱
  </text>

</g>
```

---

## Summary

This semantic HTML structure provides:

1. **Clear Hierarchy**: Projects → Categories → Entities with breadcrumb navigation
2. **Accessibility**: ARIA labels, semantic tags, keyboard navigation
3. **Modularity**: Reusable component classes (buttons, badges, sections)
4. **Data-Driven**: Data attributes connect UI to JS logic
5. **Responsive**: Mobile-first structure that adapts to all sizes
6. **D3-Ready**: SVG container with proper classes for visualization
7. **Animation-Ready**: Transition classes, state variants for interactions
8. **Observable Console Feel**: Dark theme, monospace data, technical typography, emerald accents
