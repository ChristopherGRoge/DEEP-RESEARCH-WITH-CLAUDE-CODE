---
name: research-to-deck
description: Creates PowerPoint presentations from research documents. Use when asked to make slides, create a deck, generate a presentation, or convert research to PowerPoint. Works with Efficacy Briefs, one-pagers, and any markdown research documents.
---

# Research to Deck

Create professional, consistent PowerPoint presentations from research documents using this project's established styling and templates.

**IMPORTANT:** Deck generation is a REQUIRED deliverable for all research phases. Every completed research phase must produce a PPTX following the template at `docs/RESEARCH-TEMPLATES/DECK-TEMPLATE.md`.

## When to Use

This skill should be invoked when:
- User asks to "create slides" or "make a deck"
- User wants to "convert research to presentation"
- User mentions "PowerPoint", "PPTX", or "slides"
- User wants to generate one-pagers or executive briefings
- User has an Efficacy Brief that needs presentation format
- **Research phase is marked complete** (deck is required deliverable)
- User asks to run `/research-to-deck` skill

## Prerequisites

Ensure these are available:
- `python-pptx` installed (`pip install python-pptx`) - **REQUIRED**
- Deck template spec at `docs/RESEARCH-TEMPLATES/DECK-TEMPLATE.md`
- Research data: RESEARCH.md, comparison matrix, EFFICACY briefs
- Template file at `docs/template/` (if using existing styles)
- Pandoc installed (optional, for markdown workflow)

## Workflow

### Step 1: Analyze Source Material

Read the research document to understand:
- Document type (Efficacy Brief, Discovery catalog, one-pager)
- Key sections and structure
- Critical findings and recommendations
- Data points and metrics

### Step 2: Choose Approach

**For Efficacy Briefs → One-Pager Slides:**
```
Source: *-Efficacy/00-EFFICACY-BRIEF.md
Output: *-Efficacy/00-one-pager.html (standard) + 01-one-pager.html (executive)
```

**For Custom Research → New Presentation:**
```python
from pptx import Presentation

# Load template if available
prs = Presentation('docs/template/reference.pptx')  # or create new

# Map content to slides
```

### Step 3: Content Structure Mapping

| Research Section | Slide Type | Content |
|-----------------|------------|---------|
| Executive Summary | Title Slide | Tool name, recommendation, date |
| Critical Finding | Alert Callout | Federal blocker in bold |
| Assessment Dimensions | 5-Column Table | Stack, Differentiation, Security, ROI, Backing |
| Bottom Line | Summary Callout | 2-3 sentence synthesis |
| Technical Architecture | Content Slide | Marketing vs. Reality |
| Decision Framework | Two-Column | Proceed if / Halt if |

### Step 4: Styling Reference

Use this project's color system:

```python
# Primary colors
BRAND_PURPLE = "#7500c0"
ACCENT_PURPLE = "#a055f5"

# Callout gradients
CRITICAL_FINDING_START = "#FEF3C7"
CRITICAL_FINDING_END = "#FDE68A"
CRITICAL_BORDER = "#F59E0B"

PROCEED_START = "#D1FAE5"
PROCEED_END = "#A7F3D0"
PROCEED_BORDER = "#10B981"

BOTTOM_LINE_START = "#F3E8FF"
BOTTOM_LINE_END = "#E9D5FF"
BOTTOM_LINE_BORDER = "#7500c0"

# Typography
HEADLINE_SIZE = 44  # pt
BODY_SIZE = 18  # pt
CALLOUT_SIZE = 24  # pt
```

### Step 5: Generate Research Phase Deck (REQUIRED)

For completed research phases, generate a PPTX following `docs/RESEARCH-TEMPLATES/DECK-TEMPLATE.md`:

```python
#!/usr/bin/env python3
"""
Generate research deck for [Phase Name]
Template: docs/RESEARCH-TEMPLATES/DECK-TEMPLATE.md
"""

from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR
from pptx.enum.shapes import MSO_SHAPE

# Standard colors (from DECK-TEMPLATE.md)
BRAND_PURPLE = RGBColor(117, 0, 192)  # #7500c0
ACCENT_PURPLE = RGBColor(160, 85, 245)  # #a055f5
DARK_GRAY = RGBColor(51, 51, 51)
LIGHT_GRAY = RGBColor(128, 128, 128)
WHITE = RGBColor(255, 255, 255)
PROCEED_GREEN = RGBColor(16, 185, 129)  # Score >= 8.5
CAUTION_AMBER = RGBColor(245, 158, 11)  # Score < 8.5

def main():
    prs = Presentation()
    prs.slide_width = Inches(10)
    prs.slide_height = Inches(5.63)  # 16:9

    # REQUIRED SLIDES (in order):
    # 1. Title Slide
    # 2. Executive Summary
    # 3. Context/Framework (1-2 slides)
    # 4. Comparison Tables (1-2 slides)
    # 5. Top Recommendations (4-6 entity slides)
    # 6. Decision Matrix
    # 7. Next Steps
    # 8. Summary/Takeaways

    prs.save(f"Deliverables/00-{PHASE_NAME}-RESEARCH.pptx")

if __name__ == "__main__":
    main()
```

**Slide count targets:**
- Discovery research: 8-12 slides
- Analysis research: 12-20 slides
- Full phase: 15-25 slides

**Reference implementation:** `RESEARCH/Agentic-SDLC/Design-Build/Deliverables/generate_deck.py`

### Step 6: Generate HTML One-Pagers

For Efficacy Briefs, generate styled HTML one-pagers:

```html
<!DOCTYPE html>
<html>
<head>
    <style>
        :root {
            --primary-purple: #7500c0;
            --accent-purple: #a055f5;
        }
        .critical-finding {
            background: linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%);
            border-left: 4px solid #F59E0B;
            padding: 1.5rem;
        }
        .recommendation-proceed {
            background: linear-gradient(135deg, #D1FAE5 0%, #A7F3D0 100%);
            border-left: 4px solid #10B981;
        }
        .recommendation-wait {
            background: linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%);
            border-left: 4px solid #F59E0B;
        }
        .bottom-line {
            background: linear-gradient(135deg, #F3E8FF 0%, #E9D5FF 100%);
            border-left: 4px solid #7500c0;
        }
        .highlight {
            color: var(--primary-purple);
            font-weight: 600;
        }
    </style>
</head>
<body>
    <!-- Content structure -->
</body>
</html>
```

### Step 6: Generate PPTX (When Requested)

```python
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN

def create_efficacy_deck(brief_path, output_path):
    """Convert Efficacy Brief to PowerPoint"""

    prs = Presentation()

    # Title slide
    title_layout = prs.slide_layouts[0]
    slide = prs.slides.add_slide(title_layout)
    slide.shapes.title.text = "[Tool Name] Critical Assessment"
    slide.placeholders[1].text = "GenAI COTS Team | Accenture Federal Services"

    # Assessment slide (table)
    content_layout = prs.slide_layouts[5]  # Blank
    slide = prs.slides.add_slide(content_layout)

    # Add 5-column table for assessment dimensions
    rows, cols = 2, 5
    table = slide.shapes.add_table(rows, cols,
        Inches(0.5), Inches(1.5), Inches(9), Inches(3)).table

    # Headers
    headers = ["Alignment", "Differentiation", "Security", "ROI", "Backing"]
    for i, header in enumerate(headers):
        cell = table.cell(0, i)
        cell.text = header
        # Style header cell

    # Content row with assessments...

    prs.save(output_path)
```

## Content Guidelines

### For 00-one-pager (Standard - Detailed)
- Overview: 1-2 sentences (30-50 words)
- Critical Finding: 2-4 sentences (50-80 words)
- Recommendation: 1 sentence (15-25 words)
- Table cells: 2-4 sentences each (40-70 words)
- Bottom Line: 2-3 sentences (40-60 words)

### For 01-one-pager (Executive - Concise)
- Overview: 1 sentence (20-30 words)
- Critical Finding: 1-2 sentences (30-40 words)
- Recommendation: 1 sentence (10-15 words)
- Table cells: 1-2 sentences each (25-40 words)
- Bottom Line: 1-2 sentences (20-30 words)

### Writing Style
- Use active voice
- Bold the single most critical constraint
- Use ~X% format for metrics with vendor attribution
- Name specific entities (Platform One, not "authorized path")
- Eliminate hedge words ("possibly", "potentially", "may")

## Output Locations

```
[Tool]-Efficacy/
├── 00-EFFICACY-BRIEF.md     # Source
├── 00-EFFICACY-BRIEF.html   # Rendered full brief
├── 00-one-pager.html        # Standard one-pager
├── 01-one-pager.html        # Executive one-pager
└── 01-one-pager.pptx        # PowerPoint (if requested)
```

## Examples

### Example 1: Generate One-Pagers from Brief

```
User: "Create one-pagers from the Harness efficacy brief"

Action:
1. Read Harness-Efficacy/00-EFFICACY-BRIEF.md
2. Extract key information (tool overview, critical finding, recommendation, dimensions)
3. Generate 00-one-pager.html with standard styling
4. Generate 01-one-pager.html with executive concision
```

### Example 2: Create Custom Deck

```
User: "Create a presentation comparing Braintrust, CoTester, and Harness"

Action:
1. Read all three Efficacy Briefs
2. Create comparison matrix
3. Generate PPTX with:
   - Title slide
   - Individual tool summaries (3 slides)
   - Comparison table slide
   - Recommendation slide
```

### Example 3: Convert Markdown Research

```
User: "Turn my research notes into slides"

Action:
1. Analyze markdown structure
2. Map H1 → Section headers, H2 → Slide titles
3. Use Pandoc with reference template:
   pandoc notes.md -o slides.pptx --reference-doc=template.pptx
```

## Validation Checklist

Before delivering:
- [ ] Fonts and colors match project styling
- [ ] Critical constraint is bold and prominent
- [ ] Metrics have vendor attribution (~X%)
- [ ] Recommendation is unambiguous (Proceed/Wait/Halt)
- [ ] File is fully editable in PowerPoint
- [ ] Content fits without overflow
- [ ] No marketing fluff - all substance

## Related Files

- `docs/RESEARCH-TEMPLATES/DECK-TEMPLATE.md` - **REQUIRED** deck template specification
- `docs/template/00-one-pager.md` - Standard one-pager template
- `docs/template/01-one-pager.md` - Executive one-pager template
- `docs/research-to-deck/AI_AGENT_GUIDE.md` - Detailed agent instructions
- `docs/research-to-deck/python-pptx-guide.md` - python-pptx reference
- `docs/RESEARCH-TEMPLATES/EFFICACY` - Full Efficacy Brief template
- `RESEARCH/Agentic-SDLC/Design-Build/Deliverables/generate_deck.py` - Reference implementation

## Research Phase Deck Checklist

Before marking a research deck as complete:

- [ ] Follows `docs/RESEARCH-TEMPLATES/DECK-TEMPLATE.md` structure
- [ ] Title slide with phase name, domain, date
- [ ] Executive summary with entity count and top recommendations
- [ ] Comparison tables with federal viability data
- [ ] Individual slides for top 4-6 entities
- [ ] Decision matrix ("If you need X, choose Y")
- [ ] Next steps with actionable recommendations
- [ ] Summary with key takeaways
- [ ] Score badges use correct colors (green ≥8.5, amber <8.5)
- [ ] All text is editable (no images of text)
- [ ] File opens without errors in PowerPoint
