# AI Agent Guide: Building Slides from Examples

**Target Audience:** AI agents (Claude, GPT, etc.) tasked with creating PowerPoint presentations

## Mission

When a human researcher provides slide examples, your job is to:
1. Analyze the example's style, structure, and design patterns
2. Extract reusable style specifications
3. Generate new slides that match the example's aesthetic
4. Produce fully editable PowerPoint files

## Decision Tree: Which Solution to Use?

```
START: User provides example/requirements
│
├─ Is the user working in Python ecosystem?
│  └─ YES → Use python-pptx (best template system)
│
├─ Does user need deterministic/auditable output?
│  └─ YES → Use json-to-ppt (schema validation)
│
├─ Is content primarily text/markdown?
│  └─ YES → Use Pandoc (simplest workflow)
│
└─ Default: Use python-pptx (most versatile)
```

## Core Workflow

### Phase 1: Example Analysis

When user provides a PowerPoint example:

#### Step 1: Request the file
```
"Please provide the example PowerPoint file so I can analyze its styling."
```

#### Step 2: Analyze structure
Use `tools/analyze_pptx.py`:
```python
python tools/analyze_pptx.py examples/templates/user_example.pptx
```

This extracts:
- Slide layouts available
- Color schemes (theme colors)
- Font families and sizes
- Master slide structure
- Placeholder positions

#### Step 3: Extract style patterns
Use `tools/extract_template_info.py`:
```python
python tools/extract_template_info.py examples/templates/user_example.pptx
```

This generates a style specification document with:
- Typography hierarchy (heading, body, caption sizes/fonts)
- Color palette (primary, secondary, accent colors)
- Layout patterns (margins, spacing, alignment)
- Branding elements (logos, footers, headers)

#### Step 4: Communicate findings
Report to user:
```
"I've analyzed your template. Here's what I found:
- Primary font: [Font Name]
- Heading size: [X]pt
- Body text size: [Y]pt
- Color scheme: [Colors]
- Available layouts: [List]

I'll use these styles for your presentation."
```

### Phase 2: Implementation Selection

#### Choose python-pptx when:
- User has provided a .pptx template file
- Need to match complex styling precisely
- Working with data visualization (charts, tables)
- Python is available in the environment

#### Choose json-to-ppt when:
- User provides structured data/JSON
- Need exact positioning (pixel-perfect)
- Building multi-agent workflows
- JavaScript/Node.js environment

#### Choose Pandoc when:
- Content is in markdown format
- User prefers simple text-based input
- Quick iterations are priority
- Style requirements are moderate

### Phase 3: Style Replication

#### For python-pptx:

**DO:**
- Load user's template: `Presentation('user_template.pptx')`
- Access layouts by name (not index)
- Let placeholders inherit styling automatically
- Use theme colors: `slide.shapes.title.text_frame.paragraphs[0].font.color.theme_color`

**DON'T:**
- Hard-code styles (defeats template purpose)
- Assume layout indices are consistent
- Ignore master slide definitions

**Example:**
```python
from pptx import Presentation

# Load template with user's styles
prs = Presentation('examples/templates/user_template.pptx')

# Get layout by name (robust across templates)
def get_layout(prs, name):
    for layout in prs.slide_layouts:
        if name.lower() in layout.name.lower():
            return layout
    return prs.slide_layouts[0]

# Add slide - styling inherited automatically
title_layout = get_layout(prs, 'title')
slide = prs.slides.add_slide(title_layout)
slide.shapes.title.text = "Presentation Title"

# Styling (font, color, size) comes from template!
prs.save('output.pptx')
```

#### For json-to-ppt:

**DO:**
- Define style presets matching user's theme
- Use consistent positioning based on user's layouts
- Document color codes from user's palette
- Include style reference in JSON

**DON'T:**
- Use arbitrary colors/fonts
- Ignore user's spacing patterns
- Forget to validate JSON against schema

**Example:**
```json
{
  "ppt": {
    "defaultUnit": "px",
    "stylePresets": {
      "heading": {
        "fontSize": 32,
        "fontFamily": "Calibri",
        "color": "#2E4057",
        "bold": true
      },
      "body": {
        "fontSize": 18,
        "fontFamily": "Calibri",
        "color": "#333333"
      }
    },
    "slides": [{
      "elements": [{
        "type": "text",
        "text": "Title",
        "box": {"x": 50, "y": 50, "w": 700, "h": 100},
        "style": {"$ref": "#/stylePresets/heading"}
      }]
    }]
  }
}
```

#### For Pandoc:

**DO:**
- Create/use reference document with user's styles
- Map markdown structure to slide layouts
- Test conversion to ensure style application
- Document layout mappings for user

**DON'T:**
- Skip reference document (results in default styles)
- Assume markdown structure maps perfectly
- Forget to specify output format

**Example:**
```bash
# User provides styled.pptx as example
# Use it as reference document
pandoc content.md -o output.pptx --reference-doc=examples/templates/styled.pptx
```

### Phase 4: Content Generation

#### Understanding User Input Types:

**Type 1: Research notes/documents**
- Extract key points
- Organize into logical slide structure
- Create title + content hierarchy
- Add supporting visuals where applicable

**Type 2: Bullet lists/outlines**
- Map to slide titles and bullets
- Group related points
- Create section dividers
- Maintain hierarchy

**Type 3: Data/tables**
- Create data visualization slides
- Use tables or charts appropriately
- Maintain readability
- Follow template's chart styles

#### Content-to-Slide Mapping:

```
Research Document Structure → PowerPoint Structure

Title/H1              → Title Slide
Main Section/H2       → Section Header Slide
Subsection/H3         → Content Slide Title
Paragraphs            → Bullet points (summarized)
Data/Tables           → Table or Chart Slides
Images                → Image Slides (with captions)
Key Findings          → Highlight/Callout Slides
Conclusion            → Summary Slide
```

### Phase 5: Quality Assurance

Before delivering, verify:

#### ✅ Style Checklist:
- [ ] Fonts match template
- [ ] Colors match template palette
- [ ] Layout spacing matches examples
- [ ] Logo/branding elements present (if applicable)
- [ ] Consistent slide structure

#### ✅ Content Checklist:
- [ ] All key points included
- [ ] Logical flow between slides
- [ ] Titles are clear and concise
- [ ] Bullets are brief (not paragraphs)
- [ ] Visuals support content

#### ✅ Technical Checklist:
- [ ] File is fully editable in PowerPoint
- [ ] No slides exported as images
- [ ] All text is selectable
- [ ] Charts/tables are editable
- [ ] File opens without errors

## Common Patterns

### Pattern: Template Extraction

When user provides example PPTX but wants to use it as template:

```python
from pptx import Presentation

# 1. Load their example
template = Presentation('user_example.pptx')

# 2. Delete all slides (keep structure)
while len(template.slides) > 0:
    rId = template.slides._sldIdLst[0].rId
    template.part.drop_rel(rId)
    del template.slides._sldIdLst[0]

# 3. Save as clean template
template.save('examples/templates/clean_template.pptx')

# 4. Use for new presentations
prs = Presentation('examples/templates/clean_template.pptx')
# Add new slides - styling preserved!
```

### Pattern: Style Documentation

Create a style guide from template:

```python
from tools.extract_template_info import extract_styles

styles = extract_styles('user_template.pptx')

# Document for future use:
"""
STYLE GUIDE (extracted from template)

Typography:
- Heading: {styles['fonts']['heading']} at {styles['sizes']['heading']}pt
- Body: {styles['fonts']['body']} at {styles['sizes']['body']}pt

Colors:
- Primary: {styles['colors']['primary']}
- Accent: {styles['colors']['accent']}

Layouts:
{styles['layouts']}
"""
```

### Pattern: Iterative Refinement

User feedback loop:

```
1. Generate initial version
2. Save to examples/outputs/v1.pptx
3. Ask: "I've created v1. Please review and let me know any adjustments needed."
4. User provides feedback
5. Adjust and save as v2.pptx
6. Repeat until approved
```

## Error Handling

### Common Issues:

**Issue:** "Template not found"
- **Solution:** Verify file path, check examples/templates/ directory

**Issue:** "Layout 'X' not found"
- **Solution:** List available layouts, use closest match, ask user

**Issue:** "Styles not applied"
- **Solution:** Ensure using template's placeholders, not adding raw text boxes

**Issue:** "Content doesn't fit"
- **Solution:** Summarize content, split into multiple slides, adjust font sizes within template ranges

## Best Practices

### 1. Always Communicate
```
Before: "I'll analyze your template and create slides matching its style."
During: "Creating slide 3 of 7..."
After: "Presentation complete! 7 slides generated using your template styles."
```

### 2. Preserve Editability
- Never export slides as images
- Always use native PowerPoint elements
- Test that user can edit the output

### 3. Match Style Precisely
- Extract exact color codes (not "approximately blue")
- Use exact font names (not "similar to Arial")
- Replicate spacing/margins accurately

### 4. Document Decisions
```
"I've mapped your research sections as follows:
- Introduction → Title Slide
- Methodology → 2 content slides
- Results → 3 slides (2 data, 1 summary)
- Conclusion → 1 slide

Total: 7 slides"
```

### 5. Offer Alternatives
```
"I can create this presentation using:
1. python-pptx with your template (recommended - best style matching)
2. Pandoc from markdown (faster, good for text-heavy)
3. json-to-ppt with explicit styling (most precise positioning)

Which approach would you prefer?"
```

## Example Session Flow

```
User: "I need to create slides from my research notes. Here's an example of our company template."
[uploads template.pptx]

AI: "I'll analyze your template first."
[runs analyze_pptx.py]

AI: "Your template has these layouts:
- Title Slide
- Section Header
- Content (title + bullets)
- Two Column
- Picture with Caption

The color scheme is blue (#1F4788) with orange accents (#FF6B35).
Primary font is Segoe UI.

Now, please share your research notes and I'll create slides matching this style."

User: [shares research document]

AI: "I'll create a presentation with:
- Title slide
- 3 section headers (for your main topics)
- 8 content slides
- 2 image slides
- Summary slide

Total: 14 slides

Generating now..."

[uses python-pptx with template]

AI: "Presentation created: examples/outputs/research_presentation.pptx

All slides follow your template's styling. The file is fully editable in PowerPoint.

Would you like me to adjust anything?"
```

## Quick Reference: Tool Commands

```bash
# Analyze template structure
python tools/analyze_pptx.py <template.pptx>

# Extract style guide
python tools/extract_template_info.py <template.pptx>

# Generate from python-pptx
python tools/pptx_generator.py --template <template.pptx> --content <content.json> --output <output.pptx>

# Generate from Pandoc
pandoc <content.md> -o <output.pptx> --reference-doc=<template.pptx>

# Generate from json-to-ppt
node tools/json_to_pptx.js <spec.json> <output.pptx>
```

## Troubleshooting Guide

| Symptom | Cause | Solution |
|---------|-------|----------|
| Styles not matching | Not using template | Load user's PPTX as template |
| Layout errors | Using layout index | Use layout name instead |
| Fonts wrong | Hard-coded fonts | Use placeholder inheritance |
| Colors off | Using arbitrary colors | Extract theme colors from template |
| Can't edit output | Exported as images | Switch from Marp/Slidev to python-pptx |
| Content overflow | Too much text | Summarize or split into multiple slides |

## Advanced Techniques

### Dynamic Layout Selection

```python
def choose_layout(content_type, template):
    """Select appropriate layout based on content type"""

    if content_type == 'title':
        return get_layout(template, 'title')
    elif content_type == 'section':
        return get_layout(template, 'section header')
    elif 'image' in content_type:
        return get_layout(template, 'picture')
    elif 'two_column' in content_type:
        return get_layout(template, 'two content')
    else:
        return get_layout(template, 'content')
```

### Style Interpolation

```python
def apply_emphasis(run, level='normal'):
    """Apply emphasis levels matching template hierarchy"""

    if level == 'strong':
        run.font.bold = True
        run.font.size = Pt(24)  # From template heading size
    elif level == 'emphasis':
        run.font.italic = True
    # else: normal - inherits from placeholder
```

### Bulk Generation

```python
def generate_from_research(research_docs, template_path):
    """Generate presentations from multiple research documents"""

    for doc in research_docs:
        content = parse_research(doc)
        slides = content_to_slides(content)

        prs = Presentation(template_path)
        for slide_content in slides:
            add_slide_from_content(prs, slide_content)

        output_name = f"presentation_{doc.id}.pptx"
        prs.save(f'examples/outputs/{output_name}')
```

## Remember

**Your goal:** Create presentations that look like they were made by a human designer using the company template, not by a robot with default styles.

**Success criteria:** User cannot tell which slides were made by AI vs. manually in PowerPoint.

**When in doubt:** Ask the user to clarify their style preferences rather than guessing.
