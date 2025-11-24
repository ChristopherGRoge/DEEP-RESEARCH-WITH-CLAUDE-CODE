# python-pptx Implementation Guide

## Overview

python-pptx is the recommended solution for AI agents in Python environments. It provides:
- Best-in-class template support via master slides and layouts
- Fully editable native PPTX output
- Extensive LLM training data (well-known library)
- Strong integration with Python data stack

## Installation

```bash
pip install python-pptx
```

## Core Concepts

### 1. Presentation Object
The main container for your slides:

```python
from pptx import Presentation

# Create new presentation (default template)
prs = Presentation()

# Load existing template
prs = Presentation('template.pptx')
```

### 2. Slide Layouts
Pre-designed layouts that define structure and styling:

```python
# List available layouts
for idx, layout in enumerate(prs.slide_layouts):
    print(f"{idx}: {layout.name}")

# Get specific layout
title_layout = prs.slide_layouts[0]  # By index
```

### 3. Slides
Individual slides created from layouts:

```python
# Add slide using layout
slide = prs.slides.add_slide(title_layout)

# Access slide elements
slide.shapes.title.text = "My Title"
```

### 4. Placeholders
Pre-positioned text boxes that inherit styling:

```python
# Title placeholder (most layouts have this)
slide.shapes.title.text = "Title"

# Access by index
slide.placeholders[1].text = "Content"

# List all placeholders
for ph in slide.placeholders:
    print(f"[{ph.placeholder_format.idx}] {ph.name}")
```

## Template-Based Workflow

### Step 1: Analyze Template

```python
from pptx import Presentation

def analyze_template(template_path):
    """Analyze template structure"""

    prs = Presentation(template_path)

    print(f"Layouts: {len(prs.slide_layouts)}")

    for idx, layout in enumerate(prs.slide_layouts):
        print(f"\n{idx}. {layout.name}")
        for ph in layout.placeholders:
            print(f"   - [{ph.placeholder_format.idx}] {ph.name}")

analyze_template('examples/templates/user_template.pptx')
```

### Step 2: Create Layout Helper

```python
def get_layout_by_name(prs, name):
    """Find layout by name (case-insensitive, partial match)"""

    name_lower = name.lower()

    # Exact match
    for layout in prs.slide_layouts:
        if layout.name.lower() == name_lower:
            return layout

    # Partial match
    for layout in prs.slide_layouts:
        if name_lower in layout.name.lower():
            return layout

    # Fallback
    print(f"Warning: Layout '{name}' not found")
    return prs.slide_layouts[1]  # Default to content layout
```

### Step 3: Build Presentation

```python
from pptx import Presentation
from pptx.util import Pt, Inches

# Load user's template
prs = Presentation('examples/templates/user_template.pptx')

# Title slide
title_slide = prs.slides.add_slide(get_layout_by_name(prs, 'title'))
title_slide.shapes.title.text = "Presentation Title"
title_slide.placeholders[1].text = "Subtitle"

# Content slide
content_slide = prs.slides.add_slide(get_layout_by_name(prs, 'content'))
content_slide.shapes.title.text = "Key Points"

# Add bullets
content = content_slide.placeholders[1].text_frame
content.text = "First point"

p = content.add_paragraph()
p.text = "Second point"
p.level = 0

p = content.add_paragraph()
p.text = "Sub-point"
p.level = 1

# Save
prs.save('examples/outputs/result.pptx')
```

## AI Agent Patterns

### Pattern 1: Content-to-Slides Function

```python
def create_presentation_from_content(template_path, content_dict, output_path):
    """
    Generate presentation from structured content

    Args:
        template_path: Path to PPTX template
        content_dict: Dict with 'slides' key containing slide specs
        output_path: Output file path

    Example content_dict:
    {
        "slides": [
            {
                "type": "title",
                "title": "Main Title",
                "subtitle": "Subtitle"
            },
            {
                "type": "content",
                "title": "Slide Title",
                "bullets": ["Point 1", "Point 2"]
            }
        ]
    }
    """
    prs = Presentation(template_path)

    for slide_spec in content_dict['slides']:
        slide_type = slide_spec.get('type', 'content')

        if slide_type == 'title':
            layout = get_layout_by_name(prs, 'title')
            slide = prs.slides.add_slide(layout)
            slide.shapes.title.text = slide_spec['title']

            if 'subtitle' in slide_spec:
                slide.placeholders[1].text = slide_spec['subtitle']

        elif slide_type == 'content':
            layout = get_layout_by_name(prs, 'content')
            slide = prs.slides.add_slide(layout)
            slide.shapes.title.text = slide_spec['title']

            if 'bullets' in slide_spec:
                text_frame = slide.placeholders[1].text_frame
                text_frame.clear()

                for idx, bullet in enumerate(slide_spec['bullets']):
                    if idx == 0:
                        p = text_frame.paragraphs[0]
                    else:
                        p = text_frame.add_paragraph()
                    p.text = bullet

        elif slide_type == 'section':
            layout = get_layout_by_name(prs, 'section')
            slide = prs.slides.add_slide(layout)
            slide.shapes.title.text = slide_spec['title']

    prs.save(output_path)
    print(f"Created presentation: {output_path}")
```

### Pattern 2: Research Document to Slides

```python
def research_to_slides(template_path, research_text, output_path):
    """
    Convert research document to slides

    AI workflow:
    1. LLM analyzes research text
    2. LLM generates structured outline
    3. This function creates slides
    """

    # Example: LLM would generate this structure
    outline = {
        "title": "Research Findings",
        "sections": [
            {
                "title": "Introduction",
                "points": ["Background", "Objectives", "Methodology"]
            },
            {
                "title": "Results",
                "points": ["Finding 1", "Finding 2", "Finding 3"]
            },
            {
                "title": "Conclusion",
                "points": ["Summary", "Implications"]
            }
        ]
    }

    prs = Presentation(template_path)

    # Title slide
    title_slide = prs.slides.add_slide(get_layout_by_name(prs, 'title'))
    title_slide.shapes.title.text = outline['title']

    # Section slides
    for section in outline['sections']:
        # Section header
        section_slide = prs.slides.add_slide(get_layout_by_name(prs, 'section'))
        section_slide.shapes.title.text = section['title']

        # Content slide
        content_slide = prs.slides.add_slide(get_layout_by_name(prs, 'content'))
        content_slide.shapes.title.text = section['title']

        text_frame = content_slide.placeholders[1].text_frame
        text_frame.clear()

        for idx, point in enumerate(section['points']):
            if idx == 0:
                p = text_frame.paragraphs[0]
            else:
                p = text_frame.add_paragraph()
            p.text = point

    prs.save(output_path)
```

### Pattern 3: Style Inheritance Test

```python
def test_template_styles(template_path):
    """
    Test that template styles are properly inherited

    Creates sample slides to verify:
    - Font families match template
    - Colors match template
    - Layouts work correctly
    """

    prs = Presentation(template_path)

    # Test each layout
    for layout in prs.slide_layouts[:3]:  # First 3 layouts
        slide = prs.slides.add_slide(layout)

        # Add test content
        if hasattr(slide.shapes, 'title'):
            slide.shapes.title.text = f"Test: {layout.name}"

        # Try to add body content
        for ph in slide.placeholders:
            if ph.placeholder_format.type == 2:  # Body
                ph.text = "Test content - verify this matches template styling"

    prs.save('examples/outputs/template_test.pptx')
    print("Test presentation created. Open and verify styling matches template.")
```

## Advanced Techniques

### Working with Charts

```python
from pptx.chart.data import CategoryChartData
from pptx.enum.chart import XL_CHART_TYPE
from pptx.util import Inches

def add_chart_slide(prs, title, chart_data):
    """Add slide with chart"""

    slide = prs.slides.add_slide(get_layout_by_name(prs, 'content'))
    slide.shapes.title.text = title

    # Define chart data
    chart_data_obj = CategoryChartData()
    chart_data_obj.categories = chart_data['categories']

    for series_name, values in chart_data['series'].items():
        chart_data_obj.add_series(series_name, values)

    # Add chart
    x, y, cx, cy = Inches(2), Inches(2), Inches(6), Inches(4)
    chart = slide.shapes.add_chart(
        XL_CHART_TYPE.COLUMN_CLUSTERED,
        x, y, cx, cy,
        chart_data_obj
    ).chart

    return slide

# Example usage
chart_data = {
    'categories': ['Q1', 'Q2', 'Q3', 'Q4'],
    'series': {
        'Sales': [10, 15, 12, 18],
        'Costs': [8, 10, 9, 12]
    }
}

prs = Presentation('template.pptx')
add_chart_slide(prs, 'Quarterly Results', chart_data)
prs.save('output.pptx')
```

### Working with Tables

```python
from pptx.util import Inches

def add_table_slide(prs, title, table_data):
    """Add slide with table"""

    slide = prs.slides.add_slide(get_layout_by_name(prs, 'blank'))
    slide.shapes.title.text = title

    rows = len(table_data)
    cols = len(table_data[0])

    # Add table
    x, y, cx, cy = Inches(1), Inches(2), Inches(8), Inches(4)
    table = slide.shapes.add_table(rows, cols, x, y, cx, cy).table

    # Fill table
    for row_idx, row_data in enumerate(table_data):
        for col_idx, cell_value in enumerate(row_data):
            table.cell(row_idx, col_idx).text = str(cell_value)

    return slide

# Example usage
table_data = [
    ['Category', 'Q1', 'Q2', 'Q3'],
    ['Sales', '100', '150', '180'],
    ['Costs', '80', '100', '120']
]

prs = Presentation('template.pptx')
add_table_slide(prs, 'Financial Summary', table_data)
prs.save('output.pptx')
```

### Adding Images

```python
from pptx.util import Inches

def add_image_slide(prs, title, image_path):
    """Add slide with image"""

    slide = prs.slides.add_slide(get_layout_by_name(prs, 'picture'))
    slide.shapes.title.text = title

    # Add image (centered)
    left = Inches(2)
    top = Inches(2)
    width = Inches(6)

    slide.shapes.add_picture(image_path, left, top, width=width)

    return slide
```

## Common Pitfalls & Solutions

### Pitfall 1: Hard-coding Layout Indices

**Problem:**
```python
# BAD: Assumes Title Slide is always index 0
slide = prs.slides.add_slide(prs.slide_layouts[0])
```

**Solution:**
```python
# GOOD: Use name-based lookup
slide = prs.slides.add_slide(get_layout_by_name(prs, 'title'))
```

### Pitfall 2: Not Using Placeholders

**Problem:**
```python
# BAD: Adding text boxes manually (breaks template styling)
txBox = slide.shapes.add_textbox(left, top, width, height)
txBox.text = "Content"
```

**Solution:**
```python
# GOOD: Use template placeholders
slide.placeholders[1].text = "Content"  # Inherits styling!
```

### Pitfall 3: Ignoring Template Colors

**Problem:**
```python
# BAD: Hard-coding colors
run.font.color.rgb = RGBColor(0, 0, 255)
```

**Solution:**
```python
# GOOD: Use theme colors or let template handle it
# If placeholder is used, colors are inherited automatically
# For custom text, extract theme colors first
```

## Testing & Validation

```python
def validate_presentation(pptx_path):
    """Validate generated presentation"""

    prs = Presentation(pptx_path)

    print(f"✓ File loads successfully")
    print(f"✓ Total slides: {len(prs.slides)}")

    for idx, slide in enumerate(prs.slides):
        print(f"  Slide {idx + 1}: {slide.slide_layout.name}")

        # Check for content
        has_content = False
        for shape in slide.shapes:
            if hasattr(shape, 'text') and shape.text.strip():
                has_content = True
                break

        if has_content:
            print(f"    ✓ Has content")
        else:
            print(f"    ⚠ No content")

    print("\n✓ Validation complete")

# Use after generation
validate_presentation('examples/outputs/result.pptx')
```

## Quick Reference

| Task | Code |
|------|------|
| Load template | `prs = Presentation('template.pptx')` |
| Add title slide | `slide = prs.slides.add_slide(prs.slide_layouts[0])` |
| Set title | `slide.shapes.title.text = "Title"` |
| Add bullets | `p = text_frame.add_paragraph(); p.text = "Bullet"` |
| Save | `prs.save('output.pptx')` |
| List layouts | `for l in prs.slide_layouts: print(l.name)` |

## Resources

- **Official Docs:** https://python-pptx.readthedocs.io/
- **GitHub:** https://github.com/scanny/python-pptx
- **Examples:** https://python-pptx.readthedocs.io/en/latest/user/quickstart.html

## For AI Agents

**Key Points:**
1. Always load user's template if provided
2. Use `get_layout_by_name()` helper for robustness
3. Prefer placeholders over manual text boxes
4. Let template handle styling (don't override unless necessary)
5. Test with `validate_presentation()` before delivering

**Success Metric:** Generated slides should be indistinguishable from manually-created slides using the same template.
