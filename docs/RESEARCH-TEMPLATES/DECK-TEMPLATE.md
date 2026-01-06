# Research Deck Template Specification

**Version:** 1.0
**Format:** PowerPoint (PPTX)
**Generator:** python-pptx

This template defines the standard structure for research presentation decks generated from completed research phases.

---

## Deck Structure

Every research deck MUST include these sections in order:

### 1. Title Slide
- **Title:** `[Phase Name] Research: [Domain]`
- **Subtitle:** `[Domain] | [Research Type]`
- **Footer:** `GenAI COTS Team | Accenture Federal Services | [Date]`

### 2. Executive Summary (1 slide)
- Bullet points covering:
  - Number of entities evaluated
  - Deployment paths identified
  - Top 3-4 recommendations with scores
  - Key decision factors

### 3. Context/Framework (1-2 slides)
- Deployment paths or evaluation framework
- Key criteria from VISION.md
- Scoring methodology

### 4. Comparison Matrix (1-2 slides)
- Federal viability comparison table
- Architecture/capabilities comparison table
- Must include columns: Entity, Score, Key Differentiator, Recommendation

### 5. Top Recommendations (1 slide per top 4-6 entities)
Each entity slide includes:
- **Header:** Entity name with score badge
- **Path indicator:** Deployment path (A, B, or Hybrid)
- **5-6 key features:** As bullet points with checkmarks
- **Recommendation box:** Clear proceed/conditional/wait guidance

### 6. Decision Matrix (1 slide)
- "If you need X, choose Y" format
- 5-7 decision scenarios
- Arrow pointing to recommended tool
- Brief rationale

### 7. Next Steps (1 slide)
- 4-6 actionable recommendations
- POC timeline
- Pilot scope
- Vendor engagement

### 8. Summary/Takeaways (1 slide)
- Purple background
- 5 key takeaways
- Contact information

---

## Slide Counts

| Research Type | Min Slides | Max Slides |
|---------------|------------|------------|
| Discovery (broad) | 8 | 12 |
| Analysis (deep) | 12 | 20 |
| Full Phase | 15 | 25 |
| Single Entity Efficacy | 6 | 10 |

---

## Visual Style

### Color Palette

```python
# Primary brand colors
BRAND_PURPLE = "#7500c0"
ACCENT_PURPLE = "#a055f5"

# Text colors
DARK_GRAY = "#333333"
LIGHT_GRAY = "#808080"
WHITE = "#FFFFFF"

# Status colors
PROCEED_GREEN = "#10B981"
CAUTION_AMBER = "#F59E0B"
HALT_RED = "#EF4444"

# Callout backgrounds
CRITICAL_BG = "#FEF3C7"
PROCEED_BG = "#D1FAE5"
BOTTOM_LINE_BG = "#F3E8FF"
```

### Typography

| Element | Font | Size | Weight |
|---------|------|------|--------|
| Slide title | System sans | 28-36pt | Bold |
| Section header | System sans | 36-44pt | Bold |
| Body text | System sans | 16-18pt | Regular |
| Table header | System sans | 12pt | Bold |
| Table content | System sans | 11pt | Regular |
| Callout text | System sans | 14pt | Bold |
| Footer | System sans | 10pt | Regular |

### Layout Rules

- **Title bar:** Purple header (100% width, 0.8-1" height)
- **Content margins:** 0.5" left/right, 1.2" top (below title bar)
- **Footer:** Bottom 0.5" reserved
- **Tables:** Full width minus margins, max 6 rows before split
- **Score badges:** Rounded rectangle, colored by score (green ≥8.5, amber <8.5)

---

## Slide Templates

### Title Slide Template
```
┌─────────────────────────────────┐
│ ███████████████████████████████ │ ← Purple header (2.5")
│ TITLE TEXT (white, 40pt bold)   │
│ Subtitle (white, 18pt)          │
│                                 │
│                                 │
│                                 │
│ Footer (gray, 10pt)             │
└─────────────────────────────────┘
```

### Content Slide Template
```
┌─────────────────────────────────┐
│ ██ SLIDE TITLE ██████████████ █ │ ← Purple bar (0.8")
│                                 │
│ • Bullet point 1                │
│ • Bullet point 2                │
│ • Bullet point 3                │
│ • Bullet point 4                │
│                                 │
└─────────────────────────────────┘
```

### Entity Highlight Template
```
┌─────────────────────────────────┐
│ ██ ENTITY NAME ██████ [SCORE] █ │ ← Purple bar + score badge
│ Path: B (Self-Hosted)           │
│                                 │
│ ✓ Key feature 1                 │
│ ✓ Key feature 2                 │
│ ✓ Key feature 3                 │
│ ✓ Key feature 4                 │
│                                 │
│ ┌─────────────────────────────┐ │
│ │ Recommendation: PROCEED     │ │ ← Light purple callout
│ └─────────────────────────────┘ │
└─────────────────────────────────┘
```

### Table Slide Template
```
┌─────────────────────────────────┐
│ ██ TABLE TITLE ███████████████ │ ← Purple bar (0.8")
│                                 │
│ ┌───┬───┬───┬───┬───┐          │
│ │HDR│HDR│HDR│HDR│HDR│          │ ← Purple header row
│ ├───┼───┼───┼───┼───┤          │
│ │   │   │   │   │   │          │ ← Alternating gray/white
│ │   │   │   │   │   │          │
│ │   │   │   │   │   │          │
│ └───┴───┴───┴───┴───┘          │
└─────────────────────────────────┘
```

---

## Content Guidelines

### Writing Style

- **Active voice** - "Tabby provides air-gapped deployment" not "Air-gapped deployment is provided by Tabby"
- **Concise bullets** - Max 12 words per bullet
- **Specific entities** - "Platform One" not "authorized marketplace"
- **Quantified claims** - "~30% faster" not "significantly faster"
- **No hedge words** - Avoid "potentially", "possibly", "may"

### Recommendation Language

| Status | Language | Color |
|--------|----------|-------|
| PROCEED | "Proceed with pilot" / "Ready for evaluation" | Green |
| CONDITIONAL | "Conditional on X" / "If Y available" | Amber |
| MONITOR | "Monitor for updates" / "Reassess in Q3" | Amber |
| WAIT | "Wait for X" / "Not ready" | Amber |
| SKIP | "Do not pursue" / "Does not meet requirements" | Red |

### Table Content Rules

- Max 6 columns (7 with tool name)
- Max 6 data rows per table (split across slides if needed)
- Highlight score column with light purple background
- Use abbreviations for boolean: Yes/No, N/A
- Use icons where possible: ✓, ✗, ~

---

## File Naming

```
{phase}/Deliverables/00-{PHASE-NAME}-RESEARCH.pptx

Examples:
- Design-Build/Deliverables/00-DESIGN-BUILD-RESEARCH.pptx
- Quality-Engineering/Deliverables/00-QUALITY-ENGINEERING-RESEARCH.pptx
```

---

## Generation Script Structure

Every deck generation script should follow this pattern:

```python
#!/usr/bin/env python3
"""
Generate research deck for [Phase Name]
"""

from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR
from pptx.enum.shapes import MSO_SHAPE

# Color constants from template spec
BRAND_PURPLE = RGBColor(117, 0, 192)
# ... (see Visual Style section)

# Helper functions
def add_title_slide(prs, title, subtitle): ...
def add_section_header(prs, title, subtitle=None): ...
def add_content_slide(prs, title, bullets, highlight_first=False): ...
def add_table_slide(prs, title, headers, rows, highlight_col=None): ...
def add_tool_highlight_slide(prs, name, score, path, features, recommendation): ...
def add_decision_matrix_slide(prs, decisions): ...
def add_summary_slide(prs, takeaways): ...

def main():
    prs = Presentation()
    prs.slide_width = Inches(10)
    prs.slide_height = Inches(5.63)  # 16:9

    # 1. Title
    add_title_slide(prs, ...)

    # 2. Executive Summary
    add_content_slide(prs, "Executive Summary", [...])

    # 3. Framework/Context
    add_section_header(prs, ...)
    add_content_slide(prs, ...)

    # 4. Comparison Tables
    add_section_header(prs, ...)
    add_table_slide(prs, ...)

    # 5. Top Recommendations
    add_section_header(prs, ...)
    for entity in top_entities:
        add_tool_highlight_slide(prs, ...)

    # 6. Decision Matrix
    add_decision_matrix_slide(prs, ...)

    # 7. Next Steps
    add_content_slide(prs, "Next Steps", [...])

    # 8. Summary
    add_summary_slide(prs, [...])

    prs.save(output_path)

if __name__ == "__main__":
    main()
```

---

## Checklist Before Delivery

- [ ] All slides follow template structure
- [ ] Color scheme matches specification
- [ ] Score badges use correct colors (green/amber/red)
- [ ] Tables have alternating row colors
- [ ] No slide exceeds 6 bullets or 6 table rows
- [ ] Recommendations use approved language
- [ ] Entity count and scores match research data
- [ ] File saved with correct naming convention
- [ ] Presentation opens without errors in PowerPoint
- [ ] All text is editable (no images of text)

---

## Example Reference

See: `RESEARCH/Agentic-SDLC/Design-Build/Deliverables/00-DESIGN-BUILD-RESEARCH.pptx`

This deck demonstrates all template elements and serves as the canonical reference for future research decks.
