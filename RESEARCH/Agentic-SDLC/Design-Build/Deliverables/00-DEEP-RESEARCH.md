# Design-Build Phase: Deep Research

**GenAI COTS Team | Accenture Federal Services | December 2025**

---

## Executive Summary

This research evaluated **22 AI code assistants** for federal deployment viability, identifying the top candidates for two deployment paths:

- **Path A:** FedRAMP-authorized cloud deployment
- **Path B:** Self-hosted with GovCloud LLM endpoints (AWS Bedrock, Azure OpenAI)

### Top Recommendations

| Tool | Score | Path | Use Case |
|------|-------|------|----------|
| **Tabby** | 9/10 | B | Air-gapped / IL5+ / Classified environments |
| **Continue.dev** | 8.5/10 | B | Open-source flexibility with GovCloud |
| **Claude Code** | 8.5/10 | B | AWS GovCloud with Bedrock |
| **Windsurf** | 8.5/10 | A+B | FedRAMP High SaaS (only certified option) |

---

## Research Deliverables

### Comparison Matrix

- [Federal Comparison Matrix (HTML)](./00-COMPARISON-MATRIX.html)
- [Federal Comparison Matrix (Markdown)](./00-COMPARISON-MATRIX.md)

### Entity Assessments

| Entity | Score | One-Pager | EFFICACY Brief |
|--------|-------|-----------|----------------|
| **Tabby** | 9/10 | [HTML](./Tabby/00-one-pager.html) | [Markdown](./Tabby/00-EFFICACY-BRIEF.md) |
| **Continue.dev** | 8.5/10 | [HTML](./Continue.dev/00-one-pager.html) | [Markdown](./Continue.dev/00-EFFICACY-BRIEF.md) |
| **Claude Code** | 8.5/10 | [HTML](./Claude-Code/00-one-pager.html) | [Markdown](./Claude-Code/00-EFFICACY-BRIEF.md) |

### Entity Logos

All discovered entity logos are available in the [logos directory](./logos/).

---

## Decision Framework

### Air-Gapped / IL5+ / Classified

1. **Tabby** - Purpose-built for air-gap, Rust, local models, zero phone-home
2. **Tabnine** - Enterprise-ready, Dell partnership for turnkey GPU deployment
3. **Continue.dev + Ollama** - Open-source stack, fully offline

### AWS GovCloud Environments

1. **Claude Code + Bedrock** - Native support, terminal-native workflow
2. **Continue.dev + Bedrock** - IDE-based, 20+ provider options
3. **Windsurf Hybrid** - FedRAMP High, full features

### Azure GovCloud Environments

1. **Continue.dev + Azure OpenAI** - Native `.azure.us` endpoint support
2. **Tabnine + Azure** - Private endpoint configuration
3. **Qodo + Azure** - PR focus, multi-repo awareness

### FedRAMP SaaS (Path A)

1. **Windsurf** - Only vendor with actual FedRAMP High certification

---

## Research Methodology

### Discovery Phase

- Web search across analyst reports (Gartner, Forrester)
- GitHub trending repositories (code-generation, AI)
- ProductHunt launches (2024-2025)
- Community forums (Reddit, Hacker News)

### Analysis Phase

- Vendor documentation review
- Federal compliance validation (FedRAMP, DoD IL, SOC 2)
- Architecture assessment (air-gap capability, telemetry)
- Pricing and deployment model analysis

### Entities Discovered

22 entities evaluated across categories:
- AI Code Assistants (7)
- Code Generation Platforms (6)
- IDE Extensions (4)
- Specialized Tools (5)

---

## Contact

**christopher.g.roge@afs.com**

*Document Classification: Internal Use Only*
