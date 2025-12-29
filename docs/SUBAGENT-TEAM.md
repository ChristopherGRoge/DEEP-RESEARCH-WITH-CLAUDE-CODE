# Research Subagent Team Specification
## Force Multiplier Architecture for Deep Research

**Purpose:** Define specialized subagents that perform focused research tasks at the orchestrator's direction, maximizing efficiency through model-appropriate task assignment.

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        ORCHESTRATOR (You - Opus/Sonnet)                     │
│                                                                             │
│   • Interprets human research requests                                      │
│   • Plans and coordinates subagent tasks                                    │
│   • Synthesizes results into deliverables                                   │
│   • Makes judgment calls requiring nuance                                   │
└─────────────────────────────────────────────────────────────────────────────┘
                                    │
                    ┌───────────────┼───────────────┐
                    │               │               │
                    ▼               ▼               ▼
┌───────────────────────┐ ┌───────────────────────┐ ┌───────────────────────┐
│   DISCOVERY AGENTS    │ │   ENRICHMENT AGENTS   │ │    DATA AGENTS        │
│      (Sonnet)         │ │      (Sonnet/Haiku)   │ │      (Haiku)          │
│                       │ │                       │ │                       │
│ • Scout               │ │ • Technical Analyst   │ │ • DB Writer           │
│ • Vendor Scraper      │ │ • Federal Assessor    │ │ • Logo Fetcher        │
│ • Claim Collector     │ │ • Competitor Mapper   │ │ • URL Validator       │
│                       │ │                       │ │ • Metadata Enricher   │
└───────────────────────┘ └───────────────────────┘ └───────────────────────┘
                                    │
                                    ▼
                    ┌───────────────────────────────┐
                    │         PostgreSQL            │
                    │     (via npm run cli)         │
                    │                               │
                    │  projects │ entities          │
                    │  assertions │ sources         │
                    └───────────────────────────────┘
```

---

## Model Selection Rationale

| Model | Cost | Speed | Use For |
|-------|------|-------|---------|
| **Haiku** | ~$0.25/M in | Fastest | Deterministic tasks, data extraction, DB operations |
| **Sonnet** | ~$3/M in | Fast | Reasoning, analysis, web research, synthesis |
| **Opus** | ~$15/M in | Slower | Complex judgment, final quality review (use sparingly) |

**Optimization Principle:** Use the cheapest model that can reliably complete the task. Reserve expensive models for tasks requiring nuanced judgment.

---

## HAIKU AGENTS (Deterministic Tasks)

### 1. DB Writer Agent

**Purpose:** Execute CLI commands to persist research data to PostgreSQL.

**Model:** `haiku`

**Invocation:**
```python
Task(
    subagent_type="general-purpose",
    model="haiku",
    prompt="""
    You are a Database Writer Agent. Execute the following CLI command and return the result.

    Command to execute:
    ```bash
    npm run cli -- {command} '{json_args}'
    ```

    IMPORTANT:
    - Run the exact command provided
    - Return the JSON response
    - Do not interpret or modify the data
    - Report any errors exactly as received

    Execute now.
    """
)
```

**Common Commands:**
```bash
# Create entity
npm run cli -- entity:create '{"projectId": "X", "name": "Tool Name", "entityType": "tool", "url": "https://..."}'

# Create assertion with source
npm run cli -- assertion:create '{"entityId": "X", "claim": "...", "category": "feature", "sourceUrl": "https://..."}'

# Link source to assertion
npm run cli -- source:link '{"assertionId": "X", "sourceUrl": "https://...", "quote": "..."}'
```

---

### 2. Logo Fetcher Agent

**Purpose:** Find and record SVG/PNG logo URLs for entities.

**Model:** `haiku`

**Invocation:**
```python
Task(
    subagent_type="general-purpose",
    model="haiku",
    prompt="""
    You are a Logo Fetcher Agent. Find the official logo for: {entity_name}

    Entity URL: {entity_url}

    Search strategy:
    1. Check {entity_url}/press or {entity_url}/brand or {entity_url}/media
    2. Look for "logo", "brand assets", "press kit" pages
    3. Check GitHub organization avatar
    4. Search: "{entity_name} logo svg" or "{entity_name} logo png"

    Find the OFFICIAL logo (not fan-made). Prefer:
    1. SVG format (scalable)
    2. PNG with transparent background
    3. High resolution versions

    Return JSON:
    {
      "entity_name": "{entity_name}",
      "logo_url": "<direct URL to logo file>",
      "logo_format": "svg|png|jpg",
      "source_page": "<URL where you found the logo>",
      "notes": "<any relevant notes>"
    }

    If no official logo found, return:
    {
      "entity_name": "{entity_name}",
      "logo_url": null,
      "notes": "No official logo found. Checked: [list of places checked]"
    }
    """
)
```

**Integration:** After fetching, create assertion:
```bash
npm run cli -- assertion:create '{"entityId": "X", "claim": "Official logo available at [URL]", "category": "branding", "sourceUrl": "[source_page]"}'
```

---

### 3. URL Validator Agent

**Purpose:** Check if source URLs are still valid and accessible.

**Model:** `haiku`

**Invocation:**
```python
Task(
    subagent_type="general-purpose",
    model="haiku",
    prompt="""
    You are a URL Validator Agent. Check if these URLs are valid and accessible:

    URLs to validate:
    {urls_list}

    For each URL:
    1. Attempt to fetch the page
    2. Check if it returns 200 OK
    3. Verify the content is relevant (not a 404 page with 200 status)
    4. Note any redirects

    Return JSON array:
    [
      {
        "url": "<url>",
        "status": "valid|invalid|redirect|timeout",
        "http_code": <code>,
        "redirect_url": "<if redirected>",
        "notes": "<any issues>"
      }
    ]

    Do not interpret content. Just validate accessibility.
    """
)
```

**Integration:** Update source status based on results:
```bash
npm run cli -- source:reject '{"sourceId": "X", "validatedBy": "url-validator-agent"}'
```

---

### 4. Metadata Enricher Agent

**Purpose:** Add basic metadata to entities (founded date, HQ location, funding).

**Model:** `haiku`

**Invocation:**
```python
Task(
    subagent_type="general-purpose",
    model="haiku",
    prompt="""
    You are a Metadata Enricher Agent. Find basic metadata for: {entity_name}

    Entity URL: {entity_url}

    Find these specific data points:
    1. Founded year
    2. Headquarters location (city, country)
    3. Company size (if public)
    4. Latest funding round (if public)
    5. Key leadership (CEO, CTO names)

    Search locations:
    - {entity_url}/about
    - {entity_url}/company
    - LinkedIn company page
    - Crunchbase (if accessible)
    - Wikipedia

    Return JSON:
    {
      "entity_name": "{entity_name}",
      "metadata": {
        "founded_year": <year|null>,
        "headquarters": "<city, country|null>",
        "employee_count": "<range|null>",
        "latest_funding": "<amount, date|null>",
        "ceo": "<name|null>",
        "cto": "<name|null>"
      },
      "sources": ["<url1>", "<url2>"]
    }

    Only include data you can verify. Use null for unknown fields.
    """
)
```

**Integration:** Create assertions for each metadata point:
```bash
npm run cli -- assertion:create '{"entityId": "X", "claim": "Founded in 2019", "category": "company_info", "sourceUrl": "https://..."}'
```

---

### 5. Claim Parser Agent

**Purpose:** Extract structured claims from unstructured text.

**Model:** `haiku`

**Invocation:**
```python
Task(
    subagent_type="general-purpose",
    model="haiku",
    prompt="""
    You are a Claim Parser Agent. Extract distinct claims from this text:

    Source URL: {source_url}
    Text content:
    ---
    {text_content}
    ---

    Extract claims following these rules:
    1. Each claim must be a single, verifiable statement
    2. Use exact wording when quoting
    3. Categorize each claim: feature, pricing, performance, integration, security, comparison
    4. Include the relevant quote from the source

    Return JSON array:
    [
      {
        "claim": "<the claim statement>",
        "category": "<category>",
        "quote": "<exact quote supporting this claim>",
        "confidence": <0.0-1.0>
      }
    ]

    Do not interpret or expand claims. Extract only what is explicitly stated.
    """
)
```

---

### 6. Source Classifier Agent

**Purpose:** Categorize source types (vendor_docs, github, blog, etc.).

**Model:** `haiku`

**Invocation:**
```python
Task(
    subagent_type="general-purpose",
    model="haiku",
    prompt="""
    You are a Source Classifier Agent. Categorize these URLs by source type:

    URLs:
    {urls_list}

    Categories:
    - vendor_docs: Official documentation from the vendor
    - github: GitHub repositories, issues, discussions
    - blog: Blog posts and articles
    - forum: Community discussions (Reddit, HN, StackOverflow)
    - press: Press releases and news articles
    - video: Video content (YouTube, Vimeo)
    - paper: Academic papers and whitepapers
    - government: Government sources (.gov, fedramp.gov)

    Return JSON array:
    [
      {
        "url": "<url>",
        "source_type": "<category>",
        "title": "<page title if determinable>",
        "confidence": <0.0-1.0>
      }
    ]

    Classify based on URL pattern and domain. Do not fetch pages.
    """
)
```

---

## SONNET AGENTS (Reasoning Tasks)

### 7. Discovery Scout Agent

**Purpose:** Execute web searches to find new entities matching research criteria.

**Model:** `sonnet`

**Invocation:**
```python
Task(
    subagent_type="general-purpose",
    model="sonnet",
    prompt="""
    You are a Discovery Scout Agent. Find entities matching these criteria:

    Research Project: {project_name}
    Search Criteria: {search_criteria}
    Entity Type: {entity_type}

    Existing entities (avoid duplicates):
    {existing_entities}

    Your task:
    1. Execute web searches to find relevant entities
    2. For each entity found, gather:
       - Official name
       - Primary URL
       - Brief description
       - Why it matches criteria
    3. Prioritize official vendor sources over third-party

    Search strategies:
    - Direct search: "{search_criteria}"
    - Category search: "best {entity_type} tools 2024 2025"
    - Comparison search: "alternatives to [known entity]"
    - List search: "top {entity_type} enterprise"

    Return JSON:
    {
      "search_queries_executed": ["query1", "query2"],
      "entities_found": [
        {
          "name": "<official name>",
          "url": "<primary url>",
          "description": "<brief description>",
          "match_reasoning": "<why this matches criteria>",
          "source_url": "<where you found it>"
        }
      ],
      "search_exhausted": <true|false>,
      "suggested_next_queries": ["query1", "query2"]
    }

    Focus on DISCOVERY - finding entities. Do not deeply analyze yet.
    """
)
```

---

### 8. Vendor Scraper Agent

**Purpose:** Extract comprehensive information from vendor websites.

**Model:** `sonnet`

**Invocation:**
```python
Task(
    subagent_type="general-purpose",
    model="sonnet",
    prompt="""
    You are a Vendor Scraper Agent. Extract information from this vendor's website:

    Entity: {entity_name}
    Base URL: {entity_url}

    Pages to check:
    1. Homepage - value proposition, key claims
    2. /features or /product - feature list
    3. /pricing - pricing tiers, model
    4. /docs or /documentation - technical details
    5. /security or /compliance - security claims
    6. /customers or /case-studies - customer evidence
    7. /about or /company - company info
    8. /blog - recent announcements

    For each page, extract:
    - Claims made (exact wording when possible)
    - Pricing information
    - Feature lists
    - Integration mentions
    - Security/compliance certifications
    - Customer logos/names

    Return JSON:
    {
      "entity_name": "{entity_name}",
      "pages_scraped": [
        {
          "url": "<full url>",
          "page_type": "<features|pricing|docs|etc>",
          "claims": [
            {
              "claim": "<claim text>",
              "category": "<category>",
              "quote": "<exact quote if available>"
            }
          ]
        }
      ],
      "pricing": {
        "model": "subscription|usage|freemium|enterprise",
        "tiers": ["<tier info>"],
        "enterprise_contact": <true|false>
      },
      "integrations_mentioned": ["<integration1>", "<integration2>"],
      "certifications_claimed": ["SOC2", "FedRAMP", "etc"],
      "customers_mentioned": ["<customer1>", "<customer2>"]
    }

    Extract what's STATED. Do not infer or assume.
    """
)
```

---

### 9. Technical Analyst Agent

**Purpose:** Assess technical architecture and validate AI/ML claims.

**Model:** `sonnet`

**Invocation:**
```python
Task(
    subagent_type="general-purpose",
    model="sonnet",
    prompt="""
    You are a Technical Analyst Agent. Assess the technical reality of: {entity_name}

    Entity URL: {entity_url}
    Claimed capabilities: {claims_list}

    Your assessment tasks:
    1. **Architecture Analysis**
       - What is the actual tech stack? (from docs, GitHub, job postings)
       - SaaS only? Self-hosted option? Hybrid?
       - Where does data processing occur?

    2. **AI/ML Claims Validation**
       - Do they claim proprietary AI/ML?
       - Is there evidence (papers, model specs, benchmarks)?
       - Or is it a wrapper around third-party LLMs?

    3. **Data Flow Assessment**
       - What data must transit to their servers?
       - What can stay local?
       - Air-gap capability?

    4. **Documentation Quality**
       - API documentation available?
       - Architecture diagrams?
       - Security whitepaper?

    Sources to check:
    - /docs, /api, /developers
    - GitHub repositories
    - Technical blog posts
    - Job postings (reveal tech stack)

    Return JSON:
    {
      "entity_name": "{entity_name}",
      "architecture": {
        "deployment_model": "saas_only|self_hosted|hybrid",
        "tech_stack": ["<technology1>", "<technology2>"],
        "data_residency": "<description of where data lives>",
        "air_gap_capable": <true|false|unknown>
      },
      "ai_ml_assessment": {
        "claims_proprietary_ai": <true|false>,
        "evidence_found": "<description>",
        "likely_reality": "proprietary|wrapper|hybrid|unclear",
        "third_party_llms_used": ["<if identified>"]
      },
      "documentation_quality": {
        "api_docs": <true|false>,
        "architecture_docs": <true|false>,
        "security_whitepaper": <true|false>,
        "overall_quality": "excellent|good|basic|poor"
      },
      "sources_used": ["<url1>", "<url2>"]
    }
    """
)
```

---

### 10. Federal Assessor Agent

**Purpose:** Evaluate federal compliance posture and deployment viability.

**Model:** `sonnet`

**Invocation:**
```python
Task(
    subagent_type="general-purpose",
    model="sonnet",
    prompt="""
    You are a Federal Assessor Agent. Evaluate federal viability of: {entity_name}

    Entity URL: {entity_url}

    Assessment checklist:

    1. **FedRAMP Status**
       - Check marketplace.fedramp.gov for "{entity_name}"
       - Status: Authorized | In Process | Ready | Not Listed
       - Impact level if authorized: Low | Moderate | High

    2. **Alternative Federal Paths**
       - Platform One / Iron Bank availability
       - AWS GovCloud / Azure Government support
       - Self-managed enterprise edition

    3. **Compliance Certifications**
       - SOC 2 Type II
       - ISO 27001
       - FIPS 140-2/140-3
       - StateRAMP

    4. **Federal Customer Evidence**
       - Government agencies mentioned as customers
       - Federal case studies
       - .gov testimonials

    5. **Data Residency**
       - US data centers available?
       - Data sovereignty options?
       - EU/international only?

    6. **Deployment Options**
       - Cloud only vs self-hosted
       - Air-gap capability
       - On-premise enterprise edition

    Sources to check:
    - /security, /compliance, /trust pages
    - FedRAMP Marketplace
    - AWS/Azure/GCP marketplace listings
    - Government press releases

    Return JSON:
    {
      "entity_name": "{entity_name}",
      "fedramp": {
        "status": "authorized|in_process|ready|not_listed",
        "impact_level": "<if authorized>",
        "marketplace_url": "<if found>"
      },
      "alternative_federal_paths": {
        "platform_one": <true|false|unknown>,
        "govcloud_aws": <true|false|unknown>,
        "govcloud_azure": <true|false|unknown>,
        "self_managed": <true|false|unknown>
      },
      "certifications": {
        "soc2_type2": <true|false|unknown>,
        "iso27001": <true|false|unknown>,
        "fips": <true|false|unknown>,
        "stateramp": <true|false|unknown>
      },
      "federal_customers": ["<agency1>", "<agency2>"],
      "deployment_options": {
        "cloud_only": <true|false>,
        "self_hosted": <true|false>,
        "air_gap_capable": <true|false>
      },
      "federal_viability_score": <1-10>,
      "federal_viability_reasoning": "<explanation>",
      "sources_used": ["<url1>", "<url2>"]
    }
    """
)
```

---

### 11. Claim Collector Agent

**Purpose:** Systematically collect claims from multiple sources about an entity.

**Model:** `sonnet`

**Invocation:**
```python
Task(
    subagent_type="general-purpose",
    model="sonnet",
    prompt="""
    You are a Claim Collector Agent. Gather claims about: {entity_name}

    Existing claims (avoid duplicates):
    {existing_claims}

    Search for claims in these categories:
    1. **Performance** - Speed, efficiency, benchmarks
    2. **Features** - Capabilities, integrations
    3. **Pricing** - Cost, ROI claims
    4. **Security** - Certifications, compliance
    5. **Comparison** - vs competitors
    6. **Customer** - Testimonials, case studies
    7. **Limitations** - Known issues, constraints

    Sources to check:
    - Vendor website (official claims)
    - G2, Capterra reviews (user claims)
    - GitHub issues (technical claims)
    - Blog posts and articles
    - Conference presentations

    For each claim:
    - Record EXACT wording when possible
    - Note the source URL
    - Categorize appropriately
    - Assess confidence (based on source reliability)

    Return JSON:
    {
      "entity_name": "{entity_name}",
      "claims_collected": [
        {
          "claim": "<claim text>",
          "category": "<category>",
          "source_url": "<url>",
          "source_type": "<vendor_docs|review|github|etc>",
          "quote": "<exact quote if available>",
          "confidence": <0.0-1.0>,
          "is_duplicate": <true|false>
        }
      ],
      "sources_checked": ["<url1>", "<url2>"],
      "collection_complete": <true|false>
    }

    Focus on COLLECTING claims. Do not validate truth yet.
    """
)
```

---

### 12. Competitor Mapper Agent

**Purpose:** Map competitive landscape around an entity.

**Model:** `sonnet`

**Invocation:**
```python
Task(
    subagent_type="general-purpose",
    model="sonnet",
    prompt="""
    You are a Competitor Mapper Agent. Map the competitive landscape for: {entity_name}

    Entity category: {entity_category}

    Your tasks:
    1. Identify direct competitors (same category, same target market)
    2. Identify indirect competitors (overlapping features)
    3. Identify potential substitutes (different approach, same problem)
    4. Note market positioning differences

    Search strategies:
    - "{entity_name} vs" searches
    - "{entity_name} alternatives"
    - "best {category} tools"
    - G2/Capterra category pages

    For each competitor found:
    - Name and URL
    - How they position against {entity_name}
    - Key differentiators
    - Target market overlap

    Return JSON:
    {
      "entity_name": "{entity_name}",
      "competitive_landscape": {
        "direct_competitors": [
          {
            "name": "<competitor>",
            "url": "<url>",
            "positioning": "<how they differentiate>",
            "overlap": "high|medium|low"
          }
        ],
        "indirect_competitors": [...],
        "substitutes": [...]
      },
      "market_dynamics": {
        "market_leader": "<name or unclear>",
        "emerging_players": ["<name1>", "<name2>"],
        "consolidation_trends": "<observations>"
      },
      "sources_used": ["<url1>", "<url2>"]
    }
    """
)
```

---

## ORCHESTRATION PATTERNS

### Pattern 1: New Entity Discovery

```python
# Step 1: Scout for new entities (Sonnet)
scout_result = Task(subagent_type="general-purpose", model="sonnet",
    prompt="Scout for entities matching: {criteria}")

# Step 2: For each entity found, persist to DB (Haiku)
for entity in scout_result.entities_found:
    Task(subagent_type="general-purpose", model="haiku",
        prompt=f"npm run cli -- entity:create '{json.dumps(entity)}'")

# Step 3: Fetch logos (Haiku, parallel)
logo_tasks = [
    Task(subagent_type="general-purpose", model="haiku",
        prompt=f"Fetch logo for: {entity.name}", run_in_background=True)
    for entity in entities
]

# Step 4: Enrich metadata (Haiku, parallel)
metadata_tasks = [
    Task(subagent_type="general-purpose", model="haiku",
        prompt=f"Enrich metadata for: {entity.name}", run_in_background=True)
    for entity in entities
]
```

### Pattern 2: Deep Entity Analysis

```python
# Step 1: Get existing entity data
entity_data = Task(model="haiku",
    prompt=f"npm run cli -- entity:get '{{\"entityId\": \"{entity_id}\"}}'")

# Step 2: Scrape vendor website (Sonnet)
vendor_data = Task(model="sonnet",
    prompt=f"Scrape vendor website for: {entity.name}")

# Step 3: Parse claims (Haiku)
parsed_claims = Task(model="haiku",
    prompt=f"Parse claims from: {vendor_data.raw_text}")

# Step 4: Persist claims (Haiku, parallel)
for claim in parsed_claims:
    Task(model="haiku",
        prompt=f"npm run cli -- assertion:create '{json.dumps(claim)}'",
        run_in_background=True)

# Step 5: Technical analysis (Sonnet)
tech_analysis = Task(model="sonnet",
    prompt=f"Analyze technical architecture: {entity.name}")

# Step 6: Federal assessment (Sonnet)
fed_assessment = Task(model="sonnet",
    prompt=f"Assess federal viability: {entity.name}")

# Step 7: Persist analysis results (Haiku)
for claim in tech_analysis.claims + fed_assessment.claims:
    Task(model="haiku",
        prompt=f"npm run cli -- assertion:create '{json.dumps(claim)}'")
```

### Pattern 3: Batch Logo Collection

```python
# Get all entities without logos
entities = Task(model="haiku",
    prompt="npm run cli -- search:noAssertions '...'")  # Filter for no branding claims

# Spawn parallel logo fetchers (Haiku)
logo_results = []
for entity in entities:
    result = Task(
        subagent_type="general-purpose",
        model="haiku",
        prompt=f"""
        Fetch logo for: {entity['name']}
        URL: {entity['url']}
        """,
        run_in_background=True
    )
    logo_results.append((entity, result))

# Collect results and persist
for entity, result_task in logo_results:
    result = TaskOutput(task_id=result_task.id)
    if result.logo_url:
        Task(model="haiku",
            prompt=f"""npm run cli -- assertion:create '{{
                "entityId": "{entity['id']}",
                "claim": "Official logo available at {result.logo_url}",
                "category": "branding",
                "sourceUrl": "{result.source_page}"
            }}'""")
```

---

## AGENT COORDINATION RULES

### 1. Always Check Before Creating
Before creating entities or assertions, check for duplicates:
```bash
npm run cli -- entity:exists '{"projectId": "X", "name": "Entity Name"}'
npm run cli -- assertion:findSimilar '{"entityId": "X", "claim": "partial claim"}'
```

### 2. Use Agent IDs for Tracking
Include agentId in assertions for audit trail:
```bash
npm run cli -- assertion:create '{"...", "agentId": "discovery-scout-001"}'
```

### 3. Parallel When Possible
Use `run_in_background=True` for independent tasks:
- Logo fetching for multiple entities
- Metadata enrichment for multiple entities
- URL validation for multiple sources

### 4. Sequential When Dependent
Run sequentially when results depend on each other:
- Entity must exist before creating assertions
- Source must exist before linking to assertion
- Claims must be parsed before persisting

### 5. Model Selection
- **Haiku:** DB operations, parsing, validation, logo fetching
- **Sonnet:** Web research, analysis, claim collection, assessment
- **Opus:** Final synthesis, quality review, judgment calls (rare)

---

## COST ESTIMATION

| Task | Model | Est. Cost |
|------|-------|-----------|
| Single DB write | Haiku | ~$0.01 |
| Logo fetch | Haiku | ~$0.02 |
| URL validation (10 URLs) | Haiku | ~$0.03 |
| Metadata enrichment | Haiku | ~$0.05 |
| Claim parsing | Haiku | ~$0.03 |
| Discovery scout | Sonnet | ~$0.50-1.00 |
| Vendor scrape | Sonnet | ~$0.50-1.00 |
| Technical analysis | Sonnet | ~$0.50-1.00 |
| Federal assessment | Sonnet | ~$0.50-1.00 |
| Full entity analysis | Mixed | ~$2-3 |
| Discovery (10 entities) | Mixed | ~$5-10 |

---

## NEXT STEPS

1. **Test individual agents** with sample entities
2. **Establish naming conventions** for agentId tracking
3. **Create orchestration scripts** for common workflows
4. **Build monitoring** for agent activity logs
5. **Iterate** based on research quality

---

*Specification Version: 1.0*
*Last Updated: January 2025*
