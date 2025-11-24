# Pandoc Implementation Guide

## Overview

Pandoc is ideal for AI agents when:
- Content is primarily text/markdown
- User wants simple, fast workflow
- Markdown is natural LLM output format
- Template/reference document is available

## Installation

### macOS
```bash
brew install pandoc
```

### Ubuntu/Debian
```bash
sudo apt-get install pandoc
```

### Windows
Download from: https://pandoc.org/installing.html

### Verify Installation
```bash
pandoc --version
```

## Core Concepts

### 1. Markdown to PPTX Conversion

Basic command:
```bash
pandoc input.md -o output.pptx
```

### 2. Reference Documents

Apply custom styling:
```bash
pandoc input.md -o output.pptx --reference-doc=template.pptx
```

### 3. Slide Delimiters

Markdown structure maps to slides:
```markdown
# Section Header
Becomes a section slide

## Slide Title
Content becomes bullet points

---
Horizontal rule creates new slide
```

## Template-Based Workflow

### Step 1: Prepare Reference Document

Option A: Use existing template
```bash
# User provides template.pptx
# Use it directly as reference
pandoc slides.md -o output.pptx --reference-doc=user_template.pptx
```

Option B: Create from default
```bash
# Extract Pandoc's default reference
pandoc --print-default-data-file reference.pptx > my_reference.pptx

# Customize my_reference.pptx in PowerPoint:
# - Edit master slides
# - Change fonts, colors
# - Add logos
# - Adjust layouts

# Use customized reference
pandoc slides.md -o output.pptx --reference-doc=my_reference.pptx
```

### Step 2: Markdown Structure

```markdown
---
title: "Presentation Title"
author: "Author Name"
date: "2025-01-19"
---

# Introduction

This is a section header slide.

## Slide Title

- Bullet point 1
- Bullet point 2
  - Sub-bullet
- Bullet point 3

## Another Slide

Content paragraph that becomes body text.

## Slide with Image

![Caption text](path/to/image.png)

## Two Column Layout

::: columns
:::: column
Left column content
::::

:::: column
Right column content
::::
:::
```

### Step 3: Generate Presentation

```bash
pandoc slides.md -o presentation.pptx --reference-doc=examples/templates/user_template.pptx
```

## AI Agent Patterns

### Pattern 1: Research to Markdown

```python
def research_to_markdown(research_content, output_path):
    """
    Convert research content to Pandoc markdown

    AI workflow:
    1. LLM analyzes research document
    2. LLM generates structured markdown
    3. Pandoc converts to PPTX with template
    """

    # Example: LLM generates this markdown
    markdown = """---
title: "Research Findings: AI in Healthcare"
author: "Research Team"
date: "January 2025"
---

# Executive Summary

## Overview

- Background on AI adoption in healthcare
- Key research questions
- Methodology overview

## Research Questions

1. How is AI currently being used?
2. What are the barriers to adoption?
3. What are the future opportunities?

# Methodology

## Research Design

- Literature review of 150+ papers
- Interviews with 50 healthcare professionals
- Case studies from 10 institutions

## Data Collection

- Quantitative surveys (n=500)
- Qualitative interviews (n=50)
- Secondary data analysis

# Key Findings

## Finding 1: Increasing Adoption

- 65% of hospitals now use some form of AI
- Most common: diagnostic imaging (45%)
- Growing: predictive analytics (30%)

## Finding 2: Barriers

- Data quality and integration
- Regulatory concerns
- Staff training needs
- Cost considerations

## Finding 3: Future Outlook

- Expected 200% growth in next 5 years
- Focus areas: personalized medicine, drug discovery
- Need for governance frameworks

# Conclusion

## Summary

- AI adoption is accelerating in healthcare
- Significant barriers remain
- Strategic planning essential for success

## Recommendations

1. Invest in data infrastructure
2. Develop training programs
3. Establish governance frameworks
4. Foster cross-functional collaboration
"""

    with open(output_path, 'w') as f:
        f.write(markdown)

    print(f"Markdown saved: {output_path}")
    return output_path
```

### Pattern 2: Automatic Conversion

```python
import subprocess

def markdown_to_pptx(md_path, template_path, output_path):
    """Convert markdown to PPTX using Pandoc"""

    cmd = [
        'pandoc',
        md_path,
        '-o', output_path,
        '--reference-doc', template_path
    ]

    result = subprocess.run(cmd, capture_output=True, text=True)

    if result.returncode == 0:
        print(f"✓ Presentation created: {output_path}")
        return True
    else:
        print(f"✗ Error: {result.stderr}")
        return False

# Example usage
md_file = research_to_markdown(research_content, 'slides.md')
markdown_to_pptx(
    'slides.md',
    'examples/templates/user_template.pptx',
    'examples/outputs/research_presentation.pptx'
)
```

### Pattern 3: LLM Prompt for Markdown Generation

```
Generate a PowerPoint presentation in Pandoc markdown format.

Requirements:
- Start with YAML metadata (title, author, date)
- Use # for section headers (section slides)
- Use ## for slide titles
- Use bullet points for content
- Keep bullets concise (1-2 lines each)
- Maximum 5-6 bullets per slide
- Use --- to force new slides when needed

Structure:
1. Title slide (from YAML metadata)
2. Introduction section (# Introduction)
   - Overview slide (## Overview)
   - Objectives slide (## Objectives)
3. Main content sections (# Section Name)
   - Multiple content slides (## Slide Title)
4. Conclusion section (# Conclusion)
   - Summary slide
   - Next steps slide

Example format:
---
title: "Your Title"
author: "Name"
date: "Date"
---

# Introduction

## Overview
- Point 1
- Point 2

## Objectives
- Objective 1
- Objective 2

# Main Content

## Key Points
- Important point
- Another point

Generate the presentation now.
```

## Advanced Features

### Layout Hints

```markdown
## Slide Title {.title-slide}
This uses title slide layout

## Content {.content}
This uses content layout

## Two Columns {.two-column}
This uses two-column layout
```

### Speaker Notes

```markdown
## Slide Title

Visible content here.

::: notes
Speaker notes go here.
These won't appear on the slide.
:::
```

### Incremental Bullets

```markdown
## Gradual Reveal

::: incremental
- Appears first
- Appears second
- Appears third
:::
```

### Custom Backgrounds

```markdown
## Special Slide {background-color="#1F4788"}

Content on colored background
```

## Markdown Syntax Reference

| Element | Markdown | Result |
|---------|----------|--------|
| Section Header | `# Title` | Section slide |
| Slide Title | `## Title` | Content slide |
| Bullet | `- Point` | Bullet point |
| Sub-bullet | `  - Point` | Nested bullet |
| Bold | `**text**` | **Bold text** |
| Italic | `*text*` | *Italic text* |
| Code | `` `code` `` | `Inline code` |
| Link | `[text](url)` | Hyperlink |
| Image | `![alt](path)` | Image on slide |
| Forced break | `---` | New slide |

## Common Issues & Solutions

### Issue 1: Styles Not Applied

**Problem:** Generated slides don't match template

**Solution:**
```bash
# Ensure using --reference-doc flag
pandoc slides.md -o output.pptx --reference-doc=template.pptx

# NOT just:
pandoc slides.md -o output.pptx  # Uses default styles
```

### Issue 2: Layout Not Recognized

**Problem:** `{.layout-name}` doesn't work

**Solution:**
Layout names must match exactly what's in the reference document. Check with:
```python
from pptx import Presentation
prs = Presentation('template.pptx')
for layout in prs.slide_layouts:
    print(layout.name)
```

### Issue 3: Images Too Large

**Problem:** Images don't fit on slide

**Solution:**
```markdown
# Specify image size
![](image.png){width=80%}

# Or fixed dimensions
![](image.png){width=6in height=4in}
```

### Issue 4: Too Much Text

**Problem:** Text overflows slide

**Solution:**
```markdown
# Split into multiple slides
## Key Points (1/2)
- Point 1
- Point 2
- Point 3

## Key Points (2/2)
- Point 4
- Point 5
- Point 6
```

## Validation & Testing

```python
def validate_markdown(md_path):
    """Validate markdown before conversion"""

    with open(md_path, 'r') as f:
        content = f.read()

    issues = []

    # Check for metadata
    if not content.startswith('---'):
        issues.append("Missing YAML metadata")

    # Check slide structure
    if '# ' not in content and '## ' not in content:
        issues.append("No slide headers found")

    # Check for overly long bullets
    lines = content.split('\n')
    for line in lines:
        if line.startswith('- ') and len(line) > 100:
            issues.append(f"Long bullet: {line[:50]}...")

    if issues:
        print("⚠ Validation warnings:")
        for issue in issues:
            print(f"  - {issue}")
    else:
        print("✓ Markdown validation passed")

    return len(issues) == 0
```

## Complete Example Workflow

```python
#!/usr/bin/env python3
"""
Complete workflow: Research → Markdown → PowerPoint
"""

import subprocess
from pathlib import Path

def generate_presentation(research_text, template_path, output_name):
    """
    Full pipeline from research to presentation

    Steps:
    1. Convert research to markdown (via LLM)
    2. Validate markdown
    3. Convert to PPTX with Pandoc
    4. Validate output
    """

    # Step 1: Generate markdown (placeholder - LLM would do this)
    markdown = f"""---
title: "Research Summary"
author: "AI Agent"
date: "2025-01-19"
---

# Introduction

## Overview

- Research background
- Key objectives
- Methodology

# Findings

## Key Results

- Finding 1
- Finding 2
- Finding 3

# Conclusion

## Summary

- Main takeaways
- Implications
- Next steps
"""

    # Save markdown
    md_path = Path('examples/outputs') / f"{output_name}.md"
    md_path.parent.mkdir(parents=True, exist_ok=True)

    with open(md_path, 'w') as f:
        f.write(markdown)

    print(f"✓ Markdown created: {md_path}")

    # Step 2: Validate
    if not validate_markdown(md_path):
        print("⚠ Validation warnings detected, but continuing...")

    # Step 3: Convert with Pandoc
    output_path = Path('examples/outputs') / f"{output_name}.pptx"

    cmd = [
        'pandoc',
        str(md_path),
        '-o', str(output_path),
        '--reference-doc', template_path
    ]

    result = subprocess.run(cmd, capture_output=True, text=True)

    if result.returncode != 0:
        print(f"✗ Pandoc error: {result.stderr}")
        return None

    print(f"✓ Presentation created: {output_path}")

    # Step 4: Verify output
    if output_path.exists():
        print(f"✓ File size: {output_path.stat().st_size / 1024:.1f} KB")
        return output_path
    else:
        print("✗ Output file not created")
        return None

# Example usage
if __name__ == "__main__":
    generate_presentation(
        research_text="Your research content here...",
        template_path="examples/templates/user_template.pptx",
        output_name="research_presentation"
    )
```

## Best Practices for AI Agents

### 1. Always Use Reference Documents
```bash
# Good
pandoc slides.md -o output.pptx --reference-doc=template.pptx

# Bad
pandoc slides.md -o output.pptx  # Default styling only
```

### 2. Structure Content Hierarchically
```markdown
# Level 1: Section (big divider slides)
## Level 2: Slide titles
### Level 3: Sub-headings within slide
- Bullets for content
```

### 3. Keep Slides Focused
```markdown
# Good: Focused
## Three Key Benefits
- Benefit 1
- Benefit 2
- Benefit 3

# Bad: Too much
## Everything About Our Product
- Feature 1 with long explanation
- Feature 2 with more details
- Benefit 1 and why it matters
- Benefit 2 and its implications
... (10+ bullets)
```

### 4. Test Before Batch Generation
```bash
# Create test slide first
echo "## Test\n- Point 1\n- Point 2" > test.md
pandoc test.md -o test.pptx --reference-doc=template.pptx
# Open and verify styling
# Then proceed with full generation
```

## For AI Agents: Quick Checklist

- [ ] User provided reference template or created custom one
- [ ] Markdown has YAML metadata (title, author, date)
- [ ] Used `#` for sections, `##` for slide titles
- [ ] Bullets are concise (< 100 characters)
- [ ] Maximum 5-6 bullets per slide
- [ ] Images have appropriate sizing
- [ ] Validated markdown syntax
- [ ] Used `--reference-doc` flag
- [ ] Tested output in PowerPoint

## When to Choose Pandoc

Choose Pandoc when:
- ✅ Content is primarily text-based
- ✅ Markdown is natural LLM output
- ✅ Speed is priority
- ✅ User has reference template
- ✅ Simple workflow preferred

Choose python-pptx when:
- Need programmatic control
- Complex layouts required
- Data visualizations needed

Choose json-to-ppt when:
- Exact positioning required
- Schema validation needed
- Deterministic output critical

## Resources

- **Official Docs:** https://pandoc.org/
- **PPTX Writer:** https://pandoc.org/MANUAL.html#slide-shows
- **Markdown Guide:** https://pandoc.org/MANUAL.html#pandocs-markdown
