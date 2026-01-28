# Buzz Score Analysis: Current Data & Proposed Formula

## Executive Summary

**Goal**: Create a composite "Buzz" score (0.0-1.0) to visually differentiate entities (larger icons = higher buzz) and enable stack-ranking for down-selection.

**Current State**: We have schema definitions for buzz-relevant data, but most fields are not yet populated. The infrastructure exists; we need to populate it.

---

## Current Data Inventory

### Data We CAN Capture (Schema Exists)

| Source | Field | Location | Current State |
|--------|-------|----------|---------------|
| **Company Extraction** | `funding.totalRaised` | `extraction.data` (company schema) | Schema exists, rarely extracted |
| **Company Extraction** | `funding.lastRound` | `extraction.data` (company schema) | Schema exists, rarely extracted |
| **Company Extraction** | `employeeCount` | `extraction.data` (company schema) | Schema exists, rarely extracted |
| **Assertion** | `mentionCount` | `assertion.mentionCount` | Field exists, defaults to 1 |
| **Assertion** | `sourceSpread` | `assertion.sourceSpread` | Field exists, defaults to 1 |
| **Discovery** | `noveltyScore` | `raw_discoveries.noveltyScore` | Schema exists, not populated |
| **Discovery** | `relevanceScore` | `raw_discoveries.relevanceScore` | Schema exists, not populated |
| **Trend** | `mentionCount` | `discovery_trends.mentionCount` | Schema exists |
| **Trend** | `velocity` | `discovery_trends.velocity` | Schema exists |
| **Trend** | `trendScore` | `discovery_trends.trendScore` | Schema exists |

### Data We DO NOT Currently Capture

| Data Point | Source | Difficulty | Value |
|------------|--------|------------|-------|
| **GitHub Stars** | GitHub API | Easy | High |
| **GitHub Forks** | GitHub API | Easy | Medium |
| **GitHub Contributors** | GitHub API | Easy | Medium |
| **GitHub Commit Velocity** | GitHub API | Medium | High |
| **npm Downloads** | npm API | Easy | High (for JS tools) |
| **PyPI Downloads** | PyPI API | Easy | High (for Python tools) |
| **Twitter/X Followers** | X API | Medium | Medium |
| **Reddit Mentions** | Reddit API | Medium | High |
| **HackerNews Mentions** | HN API | Easy | High |
| **Google Trends** | Trends API | Medium | Medium |
| **Crunchbase Funding** | Crunchbase API | Hard (paid) | High |
| **G2/Capterra Reviews** | Scraping | Medium | Medium |
| **Job Postings Mentioning** | Indeed/LinkedIn | Hard | High |

---

## Proposed Buzz Score Formula

### Composite Score (0.0-1.0)

```
BuzzScore = (
    MarketPresence * 0.30 +
    DeveloperActivity * 0.25 +
    FundingSignal * 0.20 +
    MentionVelocity * 0.15 +
    ResearchDepth * 0.10
)
```

### Component Breakdown

#### 1. Market Presence (30%)
Measures overall market visibility and adoption.

```typescript
interface MarketPresenceInputs {
  githubStars: number;          // Raw count
  npmWeeklyDownloads?: number;  // Raw count
  employeeCount?: string;       // "50-100", "500+"
  hasEnterpriseTier: boolean;   // From pricing extraction
}

// Normalize to 0-1:
// - Stars: log10 scale (100=0.4, 1000=0.6, 10000=0.8, 50000+=1.0)
// - Downloads: log10 scale
// - Employee proxy: 10-50=0.3, 50-200=0.5, 200-1000=0.7, 1000+=0.9
```

#### 2. Developer Activity (25%)
Measures active development and community engagement.

```typescript
interface DeveloperActivityInputs {
  githubContributors: number;
  commitsLast90Days: number;
  openIssues: number;
  closedIssuesLast90Days: number;
  releaseFrequency: number;     // Releases per quarter
}

// Signals:
// - High contributors + high commit velocity = actively developed
// - Many open issues = either popular or problematic (context matters)
// - Regular releases = maintained product
```

#### 3. Funding Signal (20%)
Measures investment and financial backing.

```typescript
interface FundingSignalInputs {
  totalRaised?: string;         // "$50M" format
  lastRound?: string;           // "Series B"
  lastRoundDate?: string;       // Recency matters
  investors?: string[];         // Tier-1 VCs = higher signal
  isPublicCompany: boolean;     // Different evaluation
  isBootstrapped: boolean;      // Not negative, different signal
}

// Normalize:
// - Seed/Angel: 0.3
// - Series A: 0.5
// - Series B: 0.7
// - Series C+: 0.85
// - Public company: 0.9
// - Bootstrapped profitable: 0.6 (viable, different path)
```

#### 4. Mention Velocity (15%)
Measures recent buzz and trending status.

```typescript
interface MentionVelocityInputs {
  mentionsLast7Days: number;
  mentionsLast30Days: number;
  mentionsLast90Days: number;
  sourceSpread: number;         // Different sources mentioning
  trendDirection: 'up' | 'stable' | 'down';
}

// Signals:
// - Increasing mentions = gaining momentum
// - High source spread = broad awareness (not just one echo chamber)
// - Recent spike = newsworthy event (launch, funding, controversy)
```

#### 5. Research Depth (10%)
Measures our own research coverage (confidence in other scores).

```typescript
interface ResearchDepthInputs {
  assertionCount: number;
  validatedAssertionCount: number;  // EVIDENCE status
  extractionCount: number;
  schemaTypesCovered: string[];     // pricing, features, compliance, etc.
  lastResearchedAt: Date;
}

// This is meta-signal:
// - High research depth = we know more, scores are reliable
// - Low research depth = scores may be stale or incomplete
// - Encourages systematic research to improve buzz accuracy
```

---

## Implementation Plan

### Phase 1: GitHub Metrics (Immediate Value)

Add to Entity model:
```prisma
model Entity {
  // ... existing fields ...

  // GitHub metrics (auto-populated from GitHub API)
  githubUrl         String?
  githubStars       Int?
  githubForks       Int?
  githubContributors Int?
  githubLastCommit  DateTime?
  githubMetricsAt   DateTime?  // When last fetched

  // Computed buzz score
  buzzScore         Float?     // Composite 0.0-1.0
  buzzComponents    Json?      // Breakdown for transparency
  buzzCalculatedAt  DateTime?
}
```

CLI commands:
```bash
npm run cli -- entity:fetchGithub '{"entityId": "..."}'
npm run cli -- entity:calculateBuzz '{"entityId": "..."}'
npm run cli -- entity:rankByBuzz '{"projectId": "...", "limit": 20}'
```

### Phase 2: Discovery Integration

Wire up the existing discovery system to populate:
- `assertion.mentionCount` - increment when same claim found in multiple sources
- `assertion.sourceSpread` - count unique sources per assertion
- `entity` aggregate metrics from child assertions

### Phase 3: External APIs

Add optional integrations:
- npm/PyPI download stats
- Crunchbase funding data (if API access available)
- HackerNews/Reddit mention tracking

---

## Display Recommendations

### Icon Sizing

```typescript
function getEntityIconSize(buzzScore: number): 'xs' | 'sm' | 'md' | 'lg' | 'xl' {
  if (buzzScore >= 0.8) return 'xl';      // Market leaders
  if (buzzScore >= 0.6) return 'lg';      // Strong players
  if (buzzScore >= 0.4) return 'md';      // Established
  if (buzzScore >= 0.2) return 'sm';      // Emerging
  return 'xs';                             // Early/Unknown
}
```

### Visual Indicators

| Buzz Level | Icon Size | Badge | Example |
|------------|-----------|-------|---------|
| 0.8-1.0 | XL (64px) | 🔥 Hot | GitHub Copilot, Cursor |
| 0.6-0.79 | LG (48px) | ⭐ Rising | Codeium, Tabnine |
| 0.4-0.59 | MD (36px) | — | Continue, Sourcegraph Cody |
| 0.2-0.39 | SM (28px) | — | Emerging tools |
| 0.0-0.19 | XS (20px) | ❓ New | Just discovered |

### Stack Ranking View

```
┌─────────────────────────────────────────────────────────┐
│  BUZZ RANKING - Code Assistants                         │
├─────────────────────────────────────────────────────────┤
│  1. 🔥 GitHub Copilot    ████████████████████  0.95     │
│  2. 🔥 Cursor            ██████████████████░░  0.87     │
│  3. ⭐ Codeium           ████████████████░░░░  0.78     │
│  4. ⭐ Tabnine           ██████████████░░░░░░  0.71     │
│  5.    Amazon Q          ████████████░░░░░░░░  0.65     │
│  6.    Sourcegraph Cody  ██████████░░░░░░░░░░  0.58     │
│  7.    Continue          ████████░░░░░░░░░░░░  0.52     │
│  ...                                                     │
└─────────────────────────────────────────────────────────┘
```

### Transparency: Show Components

On hover/click, show buzz breakdown:
```
┌─────────────────────────────────────┐
│  Cursor - Buzz Score: 0.87         │
├─────────────────────────────────────┤
│  Market Presence    ████████░░ 0.82 │
│  Developer Activity ████████░░ 0.85 │
│  Funding Signal     █████████░ 0.92 │
│  Mention Velocity   █████████░ 0.95 │
│  Research Depth     ███████░░░ 0.72 │
├─────────────────────────────────────┤
│  Last Updated: 2 days ago          │
│  [Refresh Metrics]                  │
└─────────────────────────────────────┘
```

---

## Data Gaps to Address

### High Priority (Affects Accuracy)

1. **GitHub metrics not captured** - Need CLI command to fetch from GitHub API
2. **Company extractions rare** - Need to prioritize `extract:company` in research workflow
3. **Assertion mentionCount always 1** - Discovery system not incrementing on duplicates

### Medium Priority

4. **No npm/PyPI stats** - Would help rank developer tools
5. **No trend tracking** - Discovery trends exist but not linked to entities
6. **Manual buzz calculation** - Should auto-recalculate on data changes

### Lower Priority

7. **Social media metrics** - X followers, Reddit karma
8. **Review aggregation** - G2, Capterra scores
9. **Job market signal** - Mentions in job postings

---

## Quick Win: Manual Buzz Override

Until automated collection is complete, allow manual buzz hints:

```bash
npm run cli -- entity:setBuzzHint '{"entityId": "...", "buzzHint": 0.85, "reason": "Series C, 10M downloads, market leader"}'
```

This lets researchers inject knowledge while automation catches up.

---

## Next Steps

1. **Add GitHub fields to Entity model** (Prisma migration)
2. **Create `entity:fetchGithub` CLI command** (uses GitHub API)
3. **Create `entity:calculateBuzz` CLI command** (implements formula)
4. **Wire up discovery to increment `mentionCount`**
5. **Add `buzzScore` to entity list/tree views in frontend**
6. **Create buzz ranking endpoint for stack-ranking UI**
