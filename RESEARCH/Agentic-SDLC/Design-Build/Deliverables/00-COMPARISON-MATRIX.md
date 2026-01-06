# Design-Build Phase: Federal Comparison Matrix

**GenAI COTS Team | Accenture Federal Services | December 2025**

---

## Executive Summary

This matrix compares the top 6 AI code assistants evaluated for federal deployment viability. Tools are assessed against the two-path federal model defined in VISION.md:

- **Path A:** FedRAMP-authorized cloud deployment
- **Path B:** Self-hosted with GovCloud LLM endpoints (AWS Bedrock, Azure OpenAI)

**Top Recommendations:**
1. **Tabby** (9/10) - Best for air-gapped/IL5+ environments
2. **Continue.dev** (8.5/10) - Best open-source option with GovCloud flexibility
3. **Claude Code** (8.5/10) - Best for AWS GovCloud with Bedrock
4. **Windsurf** (8.5/10) - Only actual FedRAMP High certified option

---

## Federal Viability Matrix

| Tool | Federal Score | Path | FedRAMP | Air-Gap | GovCloud LLM | Recommendation |
|------|--------------|------|---------|---------|--------------|----------------|
| **Tabby** | 9/10 | B | N/A | Yes | Bedrock, Azure | **Proceed** |
| **Continue.dev** | 8.5/10 | B | N/A | Yes | Bedrock, Azure | **Proceed** |
| **Claude Code** | 8.5/10 | B | Via Bedrock | No | Bedrock | **Conditional** |
| **Windsurf** | 8.5/10 | A+B | High | BYOL only | Bedrock, Azure | **Proceed** |
| **Tabnine** | 8/10 | B | No | Yes | Bedrock, Azure, Vertex | **Proceed** |
| **Qodo** | 8/10 | B | No | Yes | Bedrock, Azure | **Proceed** |

---

## Detailed Comparison

### 1. Federal Compliance

| Tool | FedRAMP Status | DoD IL Support | SOC 2 | Air-Gap Capable | Data Residency |
|------|---------------|----------------|-------|-----------------|----------------|
| **Tabby** | N/A (self-hosted) | IL2-IL6 viable | N/A | **Full** | On-prem only |
| **Continue.dev** | N/A (self-hosted) | IL2-IL6 viable | N/A | **Full** | On-prem only |
| **Claude Code** | High (via Bedrock) | IL4/IL5 | Via AWS | **No** | GovCloud regions |
| **Windsurf** | **High (actual)** | IL4/IL5/IL6, ITAR | Type II | BYOL mode | GovCloud, EU |
| **Tabnine** | No | IL2-IL6 viable | Type II | **Full** | On-prem only |
| **Qodo** | No | IL2-IL6 viable | Type II | **Full** | On-prem only |

### 2. Architecture & Deployment

| Tool | Architecture | Self-Hosted | Cloud Option | Telemetry Control |
|------|-------------|-------------|--------------|-------------------|
| **Tabby** | Rust binary | Full features | N/A | None by design |
| **Continue.dev** | IDE extension | Full features | Optional | Configurable |
| **Claude Code** | CLI client | N/A | Bedrock/Anthropic | Auto-off w/Bedrock |
| **Windsurf** | IDE (VS Code fork) | Reduced features* | Full features | Configurable |
| **Tabnine** | IDE extension | Full features | SaaS option | Configurable |
| **Qodo** | IDE extension | Full features | SaaS option | Configurable |

*Windsurf self-hosted loses Cascade (flagship agentic feature)

### 3. LLM Backend Flexibility

| Tool | Local Models | AWS Bedrock | Azure OpenAI | Custom Endpoints | BYOL |
|------|-------------|-------------|--------------|------------------|------|
| **Tabby** | StarCoder, CodeLlama, Qwen, DeepSeek | Via OpenAI-compat | Via OpenAI-compat | Yes | Yes |
| **Continue.dev** | Ollama, vLLM, LM Studio | **Native provider** | **Native provider** | Yes | Yes |
| **Claude Code** | No | **Native** | No | No | No |
| **Windsurf** | No | Yes | Yes | Yes | Yes |
| **Tabnine** | Proprietary | Yes | Yes | Yes | Yes |
| **Qodo** | Ollama, vLLM | Yes | Yes | LiteLLM proxy | Yes |

### 4. IDE & Platform Support

| Tool | VS Code | JetBrains | Vim/Neovim | CLI/Terminal | Web IDE |
|------|---------|-----------|------------|--------------|---------|
| **Tabby** | Yes | Yes | Yes | No | Yes |
| **Continue.dev** | Yes | Yes | No | No | No |
| **Claude Code** | No | No | No | **Native** | No |
| **Windsurf** | **Native IDE** | No | No | No | No |
| **Tabnine** | Yes | Yes | Yes | No | No |
| **Qodo** | Yes | Yes | No | CLI (PR-Agent) | No |

### 5. Core Capabilities

| Tool | Code Completion | Chat | Agentic/Multi-file | Code Review | Test Gen |
|------|----------------|------|-------------------|-------------|----------|
| **Tabby** | Yes | Yes | Limited | No | No |
| **Continue.dev** | Yes | Yes | Yes (Agent mode) | No | No |
| **Claude Code** | Yes | Yes | **Yes (native)** | Yes | Yes |
| **Windsurf** | Yes | Yes | **Yes (Cascade)** | No | No |
| **Tabnine** | Yes | Yes | Limited | No | No |
| **Qodo** | Yes | Yes | Yes | **Yes (PR-Agent)** | **Yes** |

### 6. Pricing Comparison

| Tool | Free Tier | Per-User Cost | Enterprise | Infrastructure |
|------|-----------|---------------|------------|----------------|
| **Tabby** | **Full (OSS)** | $0 | $0 | GPU: ~$500-2K/mo |
| **Continue.dev** | **Full (OSS)** | $0-10/mo | Custom | Minimal |
| **Claude Code** | Limited | ~$20-50/mo* | Via Bedrock | None |
| **Windsurf** | Yes | $60/user/mo | Custom | Hybrid: minimal |
| **Tabnine** | Limited | $39/user/mo | Custom | GPU for self-hosted |
| **Qodo** | Limited | $45/user/mo | Custom | Varies by deploy |

*Claude Code pricing is token-based via Bedrock (~$3/$15 per 1M tokens)

### 7. Security Features

| Tool | Zero Code Retention | IP Indemnification | License-Safe Training | SSO/SAML | Audit Logs |
|------|--------------------|--------------------|----------------------|----------|------------|
| **Tabby** | **Yes (local)** | N/A (OSS) | Apache-2 models | No | Local logs |
| **Continue.dev** | **Yes (local)** | N/A (OSS) | Configurable | Enterprise | No |
| **Claude Code** | Configurable | Via Anthropic | Anthropic policy | Via AWS | Via AWS |
| **Windsurf** | Yes (Enterprise) | Yes | Permissive only | Yes | Yes |
| **Tabnine** | **Yes (policy)** | **Yes** | **Apache-2 only** | Yes | Yes |
| **Qodo** | 48hr retention | No | Configurable | Yes | Yes |

---

## Path-Based Recommendations

### Path A: FedRAMP Cloud Deployment

| Rank | Tool | Why |
|------|------|-----|
| 1 | **Windsurf** | Only actual FedRAMP High authorization; full features in hybrid mode |
| 2 | **Claude Code** | FedRAMP High via Bedrock; excellent for terminal-based workflows |
| 3 | *GitHub Copilot* | Expected FedRAMP path (verify status) |

### Path B: Self-Hosted with GovCloud LLMs

| Rank | Tool | Why |
|------|------|-----|
| 1 | **Tabby** | Zero dependencies, Rust, full air-gap, Apache 2.0 |
| 2 | **Continue.dev** | Native Bedrock/Azure providers, open-source flexibility |
| 3 | **Tabnine** | Enterprise-ready, turnkey GPU deployment, IP indemnification |
| 4 | **Qodo** | Strong for code review + testing focus, multi-repo awareness |

### Air-Gapped / IL5+ / Classified

| Rank | Tool | Why |
|------|------|-----|
| 1 | **Tabby** | Purpose-built for air-gap, local models, no phone-home |
| 2 | **Tabnine** | Dell partnership for turnkey GPU deployment |
| 3 | **Continue.dev + Ollama** | Open-source stack, fully offline |
| 4 | **Qodo** | On-prem with local LLMs via Ollama/vLLM |

---

## Decision Matrix

### When to Choose Each Tool

| If You Need... | Choose | Because |
|----------------|--------|---------|
| Maximum air-gap security | **Tabby** | Zero cloud deps, Rust, local models |
| FedRAMP SaaS with full features | **Windsurf** | Only FedRAMP High certified |
| Open-source flexibility | **Continue.dev** | Apache 2.0, 20+ LLM providers |
| Terminal/CLI workflow | **Claude Code** | Native terminal, agentic |
| Enterprise air-gap with support | **Tabnine** | SOC 2, IP indemnification, Dell partnership |
| Code review + testing focus | **Qodo** | PR-Agent, test generation, multi-repo |

### Trade-off Analysis

| Trade-off | Best Choice | Compromise |
|-----------|-------------|------------|
| Security vs. Features | Tabby | Fewer advanced features, maximum control |
| Cost vs. Support | Continue.dev | Free but no enterprise SLA |
| Compliance vs. Capability | Windsurf | Self-hosted loses Cascade |
| Simplicity vs. Flexibility | Claude Code | Single LLM provider (Anthropic) |

---

## Infrastructure Requirements

| Tool | Min GPU | Min RAM | Min Storage | Network |
|------|---------|---------|-------------|---------|
| **Tabby** | T4/RTX 20 (1-3B) | 8GB | 20GB | None (air-gap OK) |
| **Continue.dev** | None (cloud LLM) | 4GB | 10GB | To LLM endpoint |
| **Claude Code** | None | 2GB | 1GB | To Bedrock |
| **Windsurf** | None (hybrid) | 8GB | 10GB | To GovCloud |
| **Tabnine** | Varies | 16GB+ | 50GB+ | None (air-gap OK) |
| **Qodo** | Varies | 8GB+ | 20GB+ | Configurable |

---

## Onboarding Complexity

| Tool | Complexity | POC Timeline | Production Timeline |
|------|------------|--------------|---------------------|
| **Tabby** | 3/5 | 1-3 days | 1-2 weeks |
| **Continue.dev** | 2/5 | 1-2 days | 1 week |
| **Claude Code** | 2/5 | 1-2 days | 1 week |
| **Windsurf** | 3/5 | 2-4 weeks | 4-6 weeks |
| **Tabnine** | 3/5 | 1 week | 2-4 weeks |
| **Qodo** | 3/5 | 1 week | 2-4 weeks |

---

## Risk Assessment

| Tool | Primary Risk | Mitigation |
|------|-------------|------------|
| **Tabby** | No enterprise SLA | Fork/maintain internally; active community |
| **Continue.dev** | Telemetry concerns | Network-level blocking; code audit |
| **Claude Code** | No air-gap | Restrict to IL4/IL5 GovCloud only |
| **Windsurf** | Feature loss in self-hosted | Use hybrid mode when possible |
| **Tabnine** | Vendor dependency | BYOL reduces lock-in |
| **Qodo** | Newer vendor | Open-source PR-Agent as fallback |

---

## Conclusion

For federal AI code assistant deployment, the evaluation reveals clear paths:

1. **Air-Gapped/Classified**: Tabby is the gold standard with zero cloud dependencies
2. **AWS GovCloud**: Claude Code via Bedrock offers FedRAMP High with minimal setup
3. **Flexibility**: Continue.dev provides maximum LLM choice with open-source transparency
4. **Enterprise SaaS**: Windsurf is the only vendor with actual FedRAMP High certification

All six tools provide viable federal paths, with the choice depending on specific security requirements, existing infrastructure, and feature priorities.

---

*Document Classification: Internal Use Only*
*Research Conducted: December 2025*
*Contact: christopher.g.roge@afs.com*
