# Example Processing Guide for AI Agents

## Purpose

This guide explains how to analyze user-provided PowerPoint examples to extract style patterns and replicate them in new presentations.

## Analysis Workflow

### Step 1: Receive Example

User provides example in one of these forms:

#### Form A: Complete PPTX file
```
User: "Here's our company template: [template.pptx]"
```
**Action:** Save to `examples/templates/` and analyze

#### Form B: Screenshot/Image
```
User: "Make slides that look like this: [image.png]"
```
**Action:** Analyze visual elements manually, ask for PPTX if possible

#### Form C: Description
```
User: "Use our brand colors: blue (#1F4788) and orange (#FF6B35), Helvetica font"
```
**Action:** Document specifications, create reference guide

#### Form D: Example slides in current presentation
```
User: "Match the style of slides 1-3, apply to rest of deck"
```
**Action:** Load file, extract styles from specified slides

### Step 2: Extract Information

Use the analysis tools to extract:

#### 2A: Structural Information
```bash
python tools/analyze_pptx.py examples/templates/user_template.pptx
```

**Outputs:**
- Number of slide layouts
- Layout names and purposes
- Master slide structure
- Placeholder positions and types

**Example output:**
```
TEMPLATE ANALYSIS: user_template.pptx
=====================================

Slide Layouts (5 total):
1. Title Slide
   - Placeholders: Title (center), Subtitle (center)
   - Background: White with blue footer

2. Section Header
   - Placeholders: Title (left-aligned)
   - Background: Blue (#1F4788) full width

3. Content
   - Placeholders: Title (top), Content (body)
   - Background: White

4. Two Content
   - Placeholders: Title (top), Left Content, Right Content
   - Background: White

5. Picture with Caption
   - Placeholders: Title, Picture, Caption
   - Background: White
```

#### 2B: Style Information
```bash
python tools/extract_template_info.py examples/templates/user_template.pptx
```

**Outputs:**
- Color palette (theme colors + RGB values)
- Font families and sizes
- Text alignment patterns
- Spacing and margins

**Example output:**
```
STYLE GUIDE: user_template.pptx
================================

TYPOGRAPHY
----------
Title font: Helvetica Neue Bold, 44pt, #1F4788
Heading font: Helvetica Neue Bold, 32pt, #1F4788
Body font: Helvetica Neue Regular, 18pt, #333333
Caption font: Helvetica Neue Light, 14pt, #666666

COLOR PALETTE
-------------
Primary: #1F4788 (Dark Blue)
Secondary: #4A90E2 (Light Blue)
Accent: #FF6B35 (Orange)
Text: #333333 (Dark Gray)
Background: #FFFFFF (White)

SPACING
-------
Title margin-top: 40px
Content margin-left: 60px
Bullet indent: 30px
Line spacing: 1.2
```

#### 2C: Visual Elements
```bash
python tools/analyze_pptx.py examples/templates/user_template.pptx --extract-images
```

**Outputs:**
- Logo files (extracted to examples/templates/assets/)
- Background images
- Decorative elements
- Icon sets

### Step 3: Create Style Specification

Document the findings in a structured format:

```markdown
# Style Specification for [User/Project Name]

## Overview
Template: user_template.pptx
Created: [Date]
For: [Project/User]

## Typography Hierarchy

| Element | Font | Size | Color | Weight |
|---------|------|------|-------|--------|
| Slide Title | Helvetica Neue | 44pt | #1F4788 | Bold |
| Section Title | Helvetica Neue | 32pt | #1F4788 | Bold |
| Body Text | Helvetica Neue | 18pt | #333333 | Regular |
| Bullets L1 | Helvetica Neue | 18pt | #333333 | Regular |
| Bullets L2 | Helvetica Neue | 16pt | #666666 | Regular |
| Caption | Helvetica Neue | 14pt | #666666 | Light |

## Color System

Primary Colors:
- Brand Blue: #1F4788 (headings, headers)
- Brand Orange: #FF6B35 (accents, highlights)

Supporting Colors:
- Light Blue: #4A90E2 (charts, graphics)
- Dark Gray: #333333 (body text)
- Medium Gray: #666666 (captions, notes)
- Light Gray: #F5F5F5 (backgrounds)

## Layout Patterns

### Title Slide
- Title: Centered, top 1/3 of slide
- Subtitle: Centered, below title
- Logo: Bottom right corner

### Content Slide
- Title: Left-aligned, 40px from top
- Content area: 60px left margin, 40px right margin
- Bullets: 30px indent per level

### Section Header
- Full-width background: #1F4788
- Title: Left-aligned, white text, vertically centered
- Optional icon: Right side

## Branding Elements

- Logo: company_logo.png (150x50px, bottom right)
- Footer: Slide number right-aligned, 14pt gray
- No header elements

## Do's and Don'ts

DO:
- Use brand colors exclusively
- Maintain consistent spacing
- Keep bullets brief (1-2 lines max)
- Use section headers between major topics

DON'T:
- Use colors outside the palette
- Change font families
- Overcrowd slides (max 5-6 bullets)
- Use busy backgrounds
```

### Step 4: Create Implementation Guide

Based on analysis, create specific instructions for the chosen tool:

#### For python-pptx:

```python
"""
IMPLEMENTATION GUIDE: user_template.pptx with python-pptx

SETUP:
------
from pptx import Presentation
from pptx.util import Pt, Inches
from pptx.enum.text import PP_ALIGN
from pptx.dml.color import RGBColor

# Load template
prs = Presentation('examples/templates/user_template.pptx')

LAYOUT MAPPING:
---------------
Title Slide = prs.slide_layouts[0]
Section Header = prs.slide_layouts[1]
Content = prs.slide_layouts[2]
Two Content = prs.slide_layouts[3]
Picture with Caption = prs.slide_layouts[4]

COLOR CONSTANTS:
----------------
BRAND_BLUE = RGBColor(31, 71, 136)    # #1F4788
BRAND_ORANGE = RGBColor(255, 107, 53)  # #FF6B35
TEXT_GRAY = RGBColor(51, 51, 51)       # #333333

USAGE EXAMPLES:
---------------

# Add title slide
slide = prs.slides.add_slide(prs.slide_layouts[0])
slide.shapes.title.text = "Presentation Title"
slide.placeholders[1].text = "Subtitle"

# Add content slide
slide = prs.slides.add_slide(prs.slide_layouts[2])
slide.shapes.title.text = "Slide Title"
content = slide.placeholders[1].text_frame
content.text = "First bullet"
# Styling is inherited from template automatically!

# Save
prs.save('output.pptx')
"""
```

#### For json-to-ppt:

```json
{
  "IMPLEMENTATION_GUIDE": {
    "template": "user_template.pptx",
    "tool": "json-to-ppt"
  },

  "stylePresets": {
    "slideTitle": {
      "fontSize": 44,
      "fontFamily": "Helvetica Neue",
      "color": "#1F4788",
      "bold": true,
      "align": "left"
    },
    "heading": {
      "fontSize": 32,
      "fontFamily": "Helvetica Neue",
      "color": "#1F4788",
      "bold": true
    },
    "body": {
      "fontSize": 18,
      "fontFamily": "Helvetica Neue",
      "color": "#333333"
    },
    "caption": {
      "fontSize": 14,
      "fontFamily": "Helvetica Neue",
      "color": "#666666"
    }
  },

  "layoutPresets": {
    "standardSlide": {
      "title": {
        "box": {"x": 60, "y": 40, "w": 880, "h": 80}
      },
      "content": {
        "box": {"x": 60, "y": 140, "w": 880, "h": 420}
      }
    }
  },

  "brandAssets": {
    "logo": "examples/templates/assets/company_logo.png",
    "logoPosition": {"x": 850, "y": 520, "w": 150, "h": 50}
  }
}
```

#### For Pandoc:

```markdown
# IMPLEMENTATION GUIDE: user_template.pptx with Pandoc

## Setup
1. Reference document: examples/templates/user_template.pptx
2. Command: `pandoc input.md -o output.pptx --reference-doc=examples/templates/user_template.pptx`

## Markdown Structure Mapping

```markdown
---
title: "Presentation Title"
author: "Author Name"
date: "Date"
---

# Section Header {.section-header}
This becomes a section header slide with blue background

## Slide Title {.content}
- Bullet point 1
- Bullet point 2
  - Sub-bullet
- Bullet point 3

## Two Column Example {.two-content}

::: columns
:::: column
Left content
::::

:::: column
Right content
::::
:::
```

## Layout Hints
- H1 (#) → Section Header
- H2 (##) → Content Slide Title
- Lists → Bullets
- Images → Picture slides
- Tables → Table layout
```

## Step 5: Test and Validate

Create a test presentation to verify style extraction:

```python
# test_template.py
from pptx import Presentation

prs = Presentation('examples/templates/user_template.pptx')

# Test each layout
test_slide = prs.slides.add_slide(prs.slide_layouts[2])
test_slide.shapes.title.text = "Test Slide"
test_slide.placeholders[1].text = "If this looks correct, template extraction succeeded!"

prs.save('examples/outputs/template_test.pptx')
print("Test file created. Open in PowerPoint and verify styling.")
```

**Validation checklist:**
- [ ] Fonts match original
- [ ] Colors match original
- [ ] Layout spacing matches original
- [ ] Logo/branding present (if applicable)
- [ ] File is fully editable

## Common Scenarios

### Scenario 1: User provides PPTX but some slides are inconsistent

**Problem:** Template has 20 slides with varying styles

**Solution:**
```
1. Ask user: "Which slides represent your preferred style?"
2. Analyze only the specified slides
3. Ignore inconsistent ones
4. Document: "Based on slides 1, 5, and 8 as reference"
```

### Scenario 2: User provides image/screenshot only

**Problem:** Can't extract exact values

**Solution:**
```
1. Visually estimate:
   - Font sizes (compare to standard 18pt, 24pt, 32pt)
   - Colors (use color picker tools, ask user to confirm)
   - Spacing (estimate in pixels/inches)

2. Ask user: "I've estimated these values from your image:
   - Heading: ~32pt
   - Body: ~18pt
   - Primary color: appears to be dark blue (#1F4788?)

   Can you confirm or provide the exact template file?"

3. Create best-effort match
4. Offer to refine when user provides actual template
```

### Scenario 3: User describes style verbally

**Problem:** No visual reference

**Solution:**
```
1. Document specifications exactly as provided
2. Create style guide document
3. Generate sample slide
4. Ask for feedback: "I've created a sample slide. Does this match your vision?"
5. Iterate based on feedback
```

### Scenario 4: User wants to merge multiple templates

**Problem:** "Use template A's colors with template B's layouts"

**Solution:**
```
1. Extract colors from template A
2. Extract layouts from template B
3. Create hybrid specification
4. Test with sample slides
5. Confirm with user before bulk generation
```

## Pro Tips for AI Agents

### Tip 1: Always Verify Font Availability
```python
# Check if font exists before using
from pptx import Presentation

prs = Presentation('template.pptx')
fonts_used = set()

for slide in prs.slides:
    for shape in slide.shapes:
        if hasattr(shape, "text_frame"):
            for paragraph in shape.text_frame.paragraphs:
                for run in paragraph.runs:
                    fonts_used.add(run.font.name)

print(f"Fonts in template: {fonts_used}")
# If user's system lacks these fonts, suggest alternatives
```

### Tip 2: Extract Exact Colors
```python
from pptx.util import Pt
from pptx.dml.color import RGBColor

def get_rgb_from_shape(shape):
    """Extract exact RGB values"""
    if hasattr(shape, 'text_frame'):
        for paragraph in shape.text_frame.paragraphs:
            for run in paragraph.runs:
                if run.font.color.type == 1:  # RGB color
                    rgb = run.font.color.rgb
                    hex_color = f"#{rgb[0]:02x}{rgb[1]:02x}{rgb[2]:02x}"
                    return hex_color
    return None
```

### Tip 3: Map Layout Names Intelligently
```python
def find_layout_by_purpose(prs, purpose):
    """Find layout by purpose, not just name"""
    purpose_keywords = {
        'title': ['title', 'cover', 'front'],
        'content': ['content', 'bullet', 'text'],
        'section': ['section', 'header', 'divider'],
        'image': ['picture', 'image', 'photo'],
        'two_column': ['two', 'comparison', 'columns']
    }

    keywords = purpose_keywords.get(purpose, [])

    for layout in prs.slide_layouts:
        layout_name_lower = layout.name.lower()
        if any(keyword in layout_name_lower for keyword in keywords):
            return layout

    # Fallback to index-based
    defaults = {'title': 0, 'content': 1, 'section': 2}
    return prs.slide_layouts[defaults.get(purpose, 1)]
```

### Tip 4: Document Assumptions
```
When extracting styles, always document:

"ASSUMPTIONS MADE:
- Used slide 1 as reference for title styling
- Body text size estimated at 18pt (slide 3)
- Brand color extracted from title on slide 1: #1F4788
- Layout spacing measured from slide 2
- Logo position from slide master

User: Please confirm these are correct or provide corrections."
```

### Tip 5: Create Reusable Style Configs
```python
# Save extracted styles for reuse
import json

style_config = {
    "template_name": "user_template.pptx",
    "extracted_date": "2025-01-19",
    "typography": {
        "title": {"font": "Helvetica Neue", "size": 44, "color": "#1F4788"},
        "body": {"font": "Helvetica Neue", "size": 18, "color": "#333333"}
    },
    "colors": {
        "primary": "#1F4788",
        "accent": "#FF6B35"
    },
    "layouts": {
        "title": 0,
        "content": 2
    }
}

with open('examples/templates/user_template_config.json', 'w') as f:
    json.dump(style_config, f, indent=2)

# Load for future use
with open('examples/templates/user_template_config.json') as f:
    config = json.load(f)
```

## Quick Reference

| User Provides | Your Action | Tool to Use |
|---------------|-------------|-------------|
| PPTX file | Analyze structure and styles | `analyze_pptx.py` + `extract_template_info.py` |
| Screenshot | Visual analysis, request PPTX | Manual extraction, confirm with user |
| Color codes + fonts | Document specs, create config | Create JSON config file |
| Example slides | Extract from those specific slides | `extract_template_info.py --slides 1,2,3` |
| Verbal description | Document, create sample, iterate | Create sample with python-pptx |

## Remember

**The goal is not perfection on first try, but:**
1. Accurate extraction of available information
2. Clear documentation of assumptions
3. Validation with user before bulk generation
4. Iteration based on feedback

**When in doubt:** Ask the user to clarify rather than guessing.
