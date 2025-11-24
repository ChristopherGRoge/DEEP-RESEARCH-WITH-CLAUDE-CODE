# json-to-ppt Implementation Guide

## Overview

json-to-ppt is optimal for AI agents that need:
- Deterministic output (same JSON = same PPTX)
- Schema validation for correctness
- Explicit positioning and styling
- Auditable, reproducible presentations

## Installation

```bash
npm install -g @jsonforge/json-to-ppt

# Or for project-local:
npm install @jsonforge/json-to-ppt
```

## Core Concepts

### 1. JSON Structure

All presentations are defined as JSON documents:

```json
{
  "ppt": {
    "defaultUnit": "px",
    "slides": [
      {
        "title": "Slide Title",
        "elements": [...]
      }
    ]
  }
}
```

### 2. Style Presets

Define reusable styles:

```json
{
  "stylePresets": {
    "heading": {
      "fontSize": 32,
      "fontFamily": "Arial",
      "color": "#1F4788",
      "bold": true
    }
  }
}
```

### 3. Elements

Slides contain elements (text, images, shapes, etc.):

```json
{
  "type": "text",
  "text": "Content",
  "box": {"x": 100, "y": 100, "w": 800, "h": 400},
  "style": {"fontSize": 24, "color": "#333"}
}
```

## Template-Based Workflow

### Step 1: Extract Style from User Template

Use `extract_template_info.py` to get colors and fonts:

```bash
python tools/extract_template_info.py user_template.pptx --json config.json
```

### Step 2: Convert to Style Presets

```json
{
  "ppt": {
    "defaultUnit": "px",
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
    "slides": []
  }
}
```

### Step 3: Define Layout Templates

Standard slide layouts as JSON:

```json
{
  "layoutPresets": {
    "titleSlide": {
      "title": {
        "box": {"x": 100, "y": 200, "w": 800, "h": 150}
      },
      "subtitle": {
        "box": {"x": 100, "y": 370, "w": 800, "h": 80}
      }
    },
    "contentSlide": {
      "title": {
        "box": {"x": 60, "y": 40, "w": 880, "h": 80}
      },
      "body": {
        "box": {"x": 60, "y": 140, "w": 880, "h": 420}
      }
    }
  }
}
```

## AI Agent Patterns

### Pattern 1: Structured Content to JSON

```javascript
// AI generates this structure
const content = {
  title: "Presentation Title",
  slides: [
    {
      type: "title",
      title: "Main Title",
      subtitle: "Subtitle"
    },
    {
      type: "content",
      title: "Key Points",
      bullets: ["Point 1", "Point 2", "Point 3"]
    }
  ]
};

// Convert to json-to-ppt format
function contentToJsonToPpt(content, stylePresets, layoutPresets) {
  const presentation = {
    ppt: {
      defaultUnit: "px",
      stylePresets,
      slides: []
    }
  };

  content.slides.forEach(slide => {
    if (slide.type === "title") {
      presentation.ppt.slides.push({
        elements: [
          {
            type: "text",
            text: slide.title,
            box: layoutPresets.titleSlide.title.box,
            style: { $ref: "#/stylePresets/slideTitle" }
          },
          {
            type: "text",
            text: slide.subtitle,
            box: layoutPresets.titleSlide.subtitle.box,
            style: { $ref: "#/stylePresets/body" }
          }
        ]
      });
    } else if (slide.type === "content") {
      const elements = [
        {
          type: "text",
          text: slide.title,
          box: layoutPresets.contentSlide.title.box,
          style: { $ref: "#/stylePresets/heading" }
        }
      ];

      // Add bullets
      const bulletText = slide.bullets.map(b => `• ${b}`).join('\n');
      elements.push({
        type: "text",
        text: bulletText,
        box: layoutPresets.contentSlide.body.box,
        style: { $ref: "#/stylePresets/body" }
      });

      presentation.ppt.slides.push({ elements });
    }
  });

  return presentation;
}
```

### Pattern 2: LLM Prompt for JSON Generation

Include this in your prompt to the LLM:

```
Generate a presentation as JSON following this schema:

{
  "ppt": {
    "defaultUnit": "px",
    "slides": [
      {
        "elements": [
          {
            "type": "text",
            "text": "Your content here",
            "box": {"x": 100, "y": 100, "w": 800, "h": 400},
            "style": {
              "fontSize": 24,
              "fontFamily": "Helvetica Neue",
              "color": "#333333"
            }
          }
        ]
      }
    ]
  }
}

Style constraints:
- Primary color: #1F4788
- Font: Helvetica Neue
- Title size: 44pt
- Body size: 18pt
- Standard slide: 960x540 px

Use these exact values for consistency.
```

### Pattern 3: Complete Example

```json
{
  "ppt": {
    "defaultUnit": "px",
    "stylePresets": {
      "title": {
        "fontSize": 44,
        "fontFamily": "Helvetica Neue",
        "color": "#1F4788",
        "bold": true
      },
      "body": {
        "fontSize": 18,
        "fontFamily": "Helvetica Neue",
        "color": "#333333"
      }
    },
    "slides": [
      {
        "elements": [
          {
            "type": "text",
            "text": "Presentation Title",
            "box": {"x": 100, "y": 200, "w": 800, "h": 150},
            "style": {"$ref": "#/stylePresets/title"}
          },
          {
            "type": "text",
            "text": "Subtitle",
            "box": {"x": 100, "y": 370, "w": 800, "h": 80},
            "style": {"$ref": "#/stylePresets/body"}
          }
        ]
      },
      {
        "elements": [
          {
            "type": "text",
            "text": "Key Points",
            "box": {"x": 60, "y": 40, "w": 880, "h": 80},
            "style": {"$ref": "#/stylePresets/title"}
          },
          {
            "type": "text",
            "text": "• Point 1\n• Point 2\n• Point 3",
            "box": {"x": 60, "y": 140, "w": 880, "h": 420},
            "style": {"$ref": "#/stylePresets/body"}
          }
        ]
      }
    ]
  }
}
```

## Supported Element Types

### Text

```json
{
  "type": "text",
  "text": "Content",
  "box": {"x": 100, "y": 100, "w": 800, "h": 400},
  "style": {
    "fontSize": 24,
    "fontFamily": "Arial",
    "color": "#333333",
    "bold": false,
    "italic": false,
    "align": "left"
  }
}
```

### Image

```json
{
  "type": "image",
  "src": "path/to/image.png",  // or URL or base64
  "box": {"x": 200, "y": 200, "w": 400, "h": 300}
}
```

### Rectangle

```json
{
  "type": "rect",
  "box": {"x": 50, "y": 50, "w": 900, "h": 500},
  "style": {
    "fill": "#1F4788",
    "stroke": "#FF6B35",
    "strokeWidth": 2
  }
}
```

### Table

```json
{
  "type": "table",
  "box": {"x": 100, "y": 150, "w": 800, "h": 300},
  "rows": [
    ["Header 1", "Header 2", "Header 3"],
    ["Row 1 Col 1", "Row 1 Col 2", "Row 1 Col 3"],
    ["Row 2 Col 1", "Row 2 Col 2", "Row 2 Col 3"]
  ],
  "style": {
    "headerBg": "#1F4788",
    "headerColor": "#FFFFFF"
  }
}
```

### Chart

```json
{
  "type": "chart",
  "chartType": "bar",
  "box": {"x": 150, "y": 150, "w": 700, "h": 350},
  "data": {
    "labels": ["Q1", "Q2", "Q3", "Q4"],
    "datasets": [
      {
        "label": "Sales",
        "data": [10, 15, 12, 18]
      }
    ]
  }
}
```

## Best Practices for AI Agents

### 1. Use Style References

**Good:**
```json
"style": {"$ref": "#/stylePresets/heading"}
```

**Bad:**
```json
"style": {"fontSize": 32, "fontFamily": "Arial", "color": "#1F4788"}
```

### 2. Define Layouts Once

```json
{
  "layoutPresets": {
    "standard": {
      "title": {"box": {"x": 60, "y": 40, "w": 880, "h": 80}},
      "body": {"box": {"x": 60, "y": 140, "w": 880, "h": 420}}
    }
  }
}
```

### 3. Validate Before Generation

Check for:
- Required fields (`type`, `box`)
- Valid box coordinates (x, y, w, h)
- Color codes start with `#`
- Font sizes are numbers

### 4. Use Consistent Units

Stick to one unit type:
```json
{"defaultUnit": "px"}  // Recommended for precision
```

## Common Pitfalls

### Pitfall 1: Incorrect Box Coordinates

**Problem:**
```json
"box": {"x": 100, "y": 100}  // Missing width and height!
```

**Solution:**
```json
"box": {"x": 100, "y": 100, "w": 800, "h": 400}
```

### Pitfall 2: Invalid Color Codes

**Problem:**
```json
"color": "blue"  // Not valid
```

**Solution:**
```json
"color": "#0000FF"  // Hex codes only
```

### Pitfall 3: Overlapping Elements

**Problem:**
Elements with same position overlap.

**Solution:**
Define clear layout grid:
```json
{
  "title": {"y": 40},
  "body": {"y": 140},  // No overlap
  "footer": {"y": 500}
}
```

## Validation & Testing

```javascript
function validateJsonToPpt(spec) {
  if (!spec.ppt) {
    throw new Error("Missing 'ppt' root key");
  }

  if (!spec.ppt.slides || !Array.isArray(spec.ppt.slides)) {
    throw new Error("Missing or invalid 'slides' array");
  }

  spec.ppt.slides.forEach((slide, idx) => {
    if (!slide.elements || !Array.isArray(slide.elements)) {
      throw new Error(`Slide ${idx}: missing elements array`);
    }

    slide.elements.forEach((elem, elemIdx) => {
      if (!elem.type) {
        throw new Error(`Slide ${idx}, Element ${elemIdx}: missing type`);
      }

      if (!elem.box || !elem.box.x || !elem.box.y || !elem.box.w || !elem.box.h) {
        throw new Error(`Slide ${idx}, Element ${elemIdx}: invalid box`);
      }
    });
  });

  console.log("✓ Validation passed");
  return true;
}
```

## Generation Command

```bash
# Save JSON to file
cat > presentation.json << 'EOF'
{
  "ppt": {
    "defaultUnit": "px",
    "slides": [...]
  }
}
EOF

# Generate PPTX
json-to-ppt presentation.json output.pptx
```

## For AI Agents: Quick Checklist

When generating json-to-ppt presentations:

- [ ] Extract style colors/fonts from user template
- [ ] Define `stylePresets` at top level
- [ ] Define `layoutPresets` for reuse
- [ ] Use `$ref` to reference presets
- [ ] Include all required box properties (x, y, w, h)
- [ ] Use hex color codes (#RRGGBB)
- [ ] Validate JSON before generation
- [ ] Test with small sample first

## Resources

- **GitHub:** https://github.com/jsonforge/json-to-ppt
- **Schema Reference:** See `PROMPT_FOR_LLM.md` in repo
- **Examples:** Check repo `/examples` directory

## When to Choose json-to-ppt

Choose this over python-pptx when:
- ✅ Need deterministic output
- ✅ Building multi-agent workflows
- ✅ Want schema validation
- ✅ LLM generates structured JSON easily
- ✅ JavaScript/Node.js environment

Choose python-pptx when:
- Template inheritance is priority
- Working in Python ecosystem
- Need complex PowerPoint features
