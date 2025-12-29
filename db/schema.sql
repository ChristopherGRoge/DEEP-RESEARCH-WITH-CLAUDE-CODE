-- Research Orchestration System Database Schema
-- PostgreSQL 14+
--
-- Setup:
--   createdb research_system
--   psql research_system < schema.sql
--
-- Or with Docker:
--   docker run -d --name research-db \
--     -e POSTGRES_DB=research_system \
--     -e POSTGRES_USER=research \
--     -e POSTGRES_PASSWORD=<secure-password> \
--     -p 5432:5432 postgres:14

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================================================
-- RESEARCH SESSIONS
-- =============================================================================
-- Each RESEARCH.md file creates a session that tracks the research lifecycle

CREATE TABLE research_sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    domain VARCHAR(255) NOT NULL,
    research_md_path TEXT NOT NULL,

    -- Status: draft, discovery, analysis, synthesis, deliverables, review, complete, archived
    status VARCHAR(50) DEFAULT 'draft',
    current_phase INTEGER DEFAULT 1,

    -- Metadata from RESEARCH.md
    primary_question TEXT,
    researcher VARCHAR(255),
    impact_level_target VARCHAR(50),

    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    completed_at TIMESTAMP WITH TIME ZONE,

    -- Flexible metadata storage
    metadata JSONB DEFAULT '{}'::jsonb,

    CONSTRAINT valid_status CHECK (status IN (
        'draft', 'discovery', 'analysis', 'synthesis',
        'deliverables', 'review', 'complete', 'archived'
    ))
);

-- Index for querying active sessions
CREATE INDEX idx_sessions_status ON research_sessions(status);
CREATE INDEX idx_sessions_domain ON research_sessions(domain);

-- =============================================================================
-- ENTITIES
-- =============================================================================
-- Tools, platforms, products discovered during research

CREATE TABLE entities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_id UUID NOT NULL REFERENCES research_sessions(id) ON DELETE CASCADE,

    -- Core identification
    name VARCHAR(255) NOT NULL,
    vendor VARCHAR(255),
    category VARCHAR(255),
    url TEXT,

    -- Assessment scores
    fit_score VARCHAR(20) CHECK (fit_score IN ('Strong', 'Moderate', 'Weak')),
    federal_score INTEGER CHECK (federal_score >= 0 AND federal_score <= 10),

    -- Status progression: discovered -> analyzing -> analyzed -> recommended | excluded
    status VARCHAR(50) DEFAULT 'discovered',

    -- Phase tracking
    discovered_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    analysis_started_at TIMESTAMP WITH TIME ZONE,
    analysis_completed_at TIMESTAMP WITH TIME ZONE,

    -- Counts (denormalized for performance)
    claims_count INTEGER DEFAULT 0,
    evidence_count INTEGER DEFAULT 0,

    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

    -- Flexible metadata
    metadata JSONB DEFAULT '{}'::jsonb,

    -- Unique entity per session
    UNIQUE(session_id, name),

    CONSTRAINT valid_entity_status CHECK (status IN (
        'discovered', 'approved_for_analysis', 'analyzing',
        'analyzed', 'recommended', 'monitoring', 'excluded'
    ))
);

-- Indexes for common queries
CREATE INDEX idx_entities_session ON entities(session_id);
CREATE INDEX idx_entities_status ON entities(status);
CREATE INDEX idx_entities_federal_score ON entities(federal_score DESC);
CREATE INDEX idx_entities_fit ON entities(fit_score);

-- =============================================================================
-- SOURCES
-- =============================================================================
-- URLs and references used in research

CREATE TABLE sources (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_id UUID NOT NULL REFERENCES research_sessions(id) ON DELETE CASCADE,

    -- Source identification
    url TEXT NOT NULL,
    title VARCHAR(500),
    source_type VARCHAR(50),  -- vendor, analyst, community, news, documentation, academic

    -- Validation status
    status VARCHAR(50) DEFAULT 'proposed',  -- proposed, validated, invalid, outdated
    validated_by VARCHAR(100),  -- 'agent' or researcher name
    validated_at TIMESTAMP WITH TIME ZONE,

    -- Access tracking
    access_date DATE DEFAULT CURRENT_DATE,
    last_verified_at TIMESTAMP WITH TIME ZONE,

    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

    -- Flexible metadata (e.g., archive.org snapshot URL)
    metadata JSONB DEFAULT '{}'::jsonb,

    -- Unique URL per session
    UNIQUE(session_id, url),

    CONSTRAINT valid_source_type CHECK (source_type IN (
        'vendor', 'analyst', 'community', 'news',
        'documentation', 'academic', 'government', 'other'
    )),
    CONSTRAINT valid_source_status CHECK (status IN (
        'proposed', 'validated', 'invalid', 'outdated'
    ))
);

-- Indexes
CREATE INDEX idx_sources_session ON sources(session_id);
CREATE INDEX idx_sources_status ON sources(status);
CREATE INDEX idx_sources_type ON sources(source_type);

-- =============================================================================
-- ASSERTIONS (Claims)
-- =============================================================================
-- Claims made about entities, with validation lifecycle

CREATE TABLE assertions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    entity_id UUID NOT NULL REFERENCES entities(id) ON DELETE CASCADE,
    source_id UUID REFERENCES sources(id) ON DELETE SET NULL,

    -- The claim itself
    claim_text TEXT NOT NULL,
    claim_category VARCHAR(100),  -- performance, scale, compliance, technical, customer, comparison

    -- Validation status: claim -> evidence | refuted | unverifiable | superseded
    status VARCHAR(50) DEFAULT 'claim',

    -- Validation details
    evidence_url TEXT,
    evidence_notes TEXT,
    validated_by VARCHAR(100),  -- 'agent' or researcher name
    validated_at TIMESTAMP WITH TIME ZONE,

    -- If superseded, link to newer assertion
    superseded_by UUID REFERENCES assertions(id),

    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

    -- Flexible metadata
    metadata JSONB DEFAULT '{}'::jsonb,

    CONSTRAINT valid_claim_category CHECK (claim_category IN (
        'performance', 'scale', 'compliance', 'technical',
        'customer', 'comparison', 'pricing', 'other'
    )),
    CONSTRAINT valid_assertion_status CHECK (status IN (
        'claim', 'evidence', 'refuted', 'unverifiable', 'superseded'
    ))
);

-- Indexes
CREATE INDEX idx_assertions_entity ON assertions(entity_id);
CREATE INDEX idx_assertions_status ON assertions(status);
CREATE INDEX idx_assertions_category ON assertions(claim_category);

-- =============================================================================
-- DELIVERABLES
-- =============================================================================
-- Track generated research outputs

CREATE TABLE deliverables (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_id UUID NOT NULL REFERENCES research_sessions(id) ON DELETE CASCADE,
    entity_id UUID REFERENCES entities(id) ON DELETE SET NULL,  -- NULL for domain-level

    -- Deliverable type
    template_type VARCHAR(100) NOT NULL,  -- EFFICACY, DISCOVERY, ONE_PAGER_STANDARD, ONE_PAGER_EXECUTIVE, EXECUTIVE_SUMMARY
    file_path TEXT NOT NULL,

    -- Generation details
    generated_by VARCHAR(100),  -- agent model: haiku, sonnet, opus
    generated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

    -- Approval workflow
    status VARCHAR(50) DEFAULT 'draft',  -- draft, review, revision_requested, approved, published
    approved_by VARCHAR(100),
    approved_at TIMESTAMP WITH TIME ZONE,

    -- Version tracking
    version INTEGER DEFAULT 1,
    previous_version_id UUID REFERENCES deliverables(id),

    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

    -- Flexible metadata
    metadata JSONB DEFAULT '{}'::jsonb,

    CONSTRAINT valid_template_type CHECK (template_type IN (
        'EFFICACY', 'DISCOVERY', 'ONE_PAGER_STANDARD',
        'ONE_PAGER_EXECUTIVE', 'EXECUTIVE_SUMMARY', 'COMPARISON_MATRIX'
    )),
    CONSTRAINT valid_deliverable_status CHECK (status IN (
        'draft', 'review', 'revision_requested', 'approved', 'published'
    ))
);

-- Indexes
CREATE INDEX idx_deliverables_session ON deliverables(session_id);
CREATE INDEX idx_deliverables_entity ON deliverables(entity_id);
CREATE INDEX idx_deliverables_status ON deliverables(status);

-- =============================================================================
-- AGENT ACTIVITY LOG
-- =============================================================================
-- Audit trail of all agent operations

CREATE TABLE agent_activity (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_id UUID REFERENCES research_sessions(id) ON DELETE CASCADE,

    -- Agent identification
    agent_type VARCHAR(100) NOT NULL,  -- orchestrator, discovery, analysis, synthesis, db_writer, formatter, validator, extractor
    model VARCHAR(50) NOT NULL,  -- opus, sonnet, haiku

    -- Activity details
    action VARCHAR(255) NOT NULL,
    input_summary TEXT,
    output_summary TEXT,

    -- Performance metrics
    duration_ms INTEGER,
    tokens_input INTEGER,
    tokens_output INTEGER,
    estimated_cost_usd DECIMAL(10, 4),

    -- Status
    status VARCHAR(50) DEFAULT 'running',  -- running, completed, failed, cancelled
    error_message TEXT,

    -- Timestamps
    started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    completed_at TIMESTAMP WITH TIME ZONE,

    -- Flexible metadata
    metadata JSONB DEFAULT '{}'::jsonb,

    CONSTRAINT valid_agent_type CHECK (agent_type IN (
        'orchestrator', 'discovery', 'analysis', 'synthesis',
        'db_writer', 'formatter', 'validator', 'extractor'
    )),
    CONSTRAINT valid_model CHECK (model IN ('opus', 'sonnet', 'haiku')),
    CONSTRAINT valid_activity_status CHECK (status IN (
        'running', 'completed', 'failed', 'cancelled'
    ))
);

-- Indexes
CREATE INDEX idx_activity_session ON agent_activity(session_id);
CREATE INDEX idx_activity_model ON agent_activity(model);
CREATE INDEX idx_activity_status ON agent_activity(status);
CREATE INDEX idx_activity_started ON agent_activity(started_at DESC);

-- =============================================================================
-- VIEWS
-- =============================================================================

-- Entity summary with claim/evidence counts
CREATE VIEW entity_summary AS
SELECT
    e.id,
    e.session_id,
    e.name,
    e.vendor,
    e.category,
    e.fit_score,
    e.federal_score,
    e.status,
    COUNT(a.id) FILTER (WHERE a.status = 'claim') AS pending_claims,
    COUNT(a.id) FILTER (WHERE a.status = 'evidence') AS validated_claims,
    COUNT(a.id) FILTER (WHERE a.status = 'refuted') AS refuted_claims,
    COUNT(DISTINCT s.id) AS source_count
FROM entities e
LEFT JOIN assertions a ON a.entity_id = e.id
LEFT JOIN sources s ON a.source_id = s.id
GROUP BY e.id;

-- Session progress overview
CREATE VIEW session_progress AS
SELECT
    rs.id,
    rs.domain,
    rs.status,
    rs.current_phase,
    COUNT(DISTINCT e.id) AS total_entities,
    COUNT(DISTINCT e.id) FILTER (WHERE e.status = 'analyzed') AS analyzed_entities,
    COUNT(a.id) AS total_claims,
    COUNT(a.id) FILTER (WHERE a.status = 'evidence') AS validated_claims,
    COUNT(DISTINCT d.id) AS deliverables_count,
    COUNT(DISTINCT d.id) FILTER (WHERE d.status = 'approved') AS approved_deliverables,
    SUM(aa.estimated_cost_usd) AS total_cost_usd
FROM research_sessions rs
LEFT JOIN entities e ON e.session_id = rs.id
LEFT JOIN assertions a ON a.entity_id = e.id
LEFT JOIN deliverables d ON d.session_id = rs.id
LEFT JOIN agent_activity aa ON aa.session_id = rs.id
GROUP BY rs.id;

-- Cost analysis by model
CREATE VIEW cost_by_model AS
SELECT
    session_id,
    model,
    COUNT(*) AS call_count,
    SUM(tokens_input) AS total_input_tokens,
    SUM(tokens_output) AS total_output_tokens,
    SUM(estimated_cost_usd) AS total_cost_usd,
    AVG(duration_ms) AS avg_duration_ms
FROM agent_activity
WHERE status = 'completed'
GROUP BY session_id, model;

-- =============================================================================
-- FUNCTIONS
-- =============================================================================

-- Update entity claim counts (trigger function)
CREATE OR REPLACE FUNCTION update_entity_claim_counts()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE entities SET
        claims_count = (
            SELECT COUNT(*) FROM assertions WHERE entity_id = COALESCE(NEW.entity_id, OLD.entity_id)
        ),
        evidence_count = (
            SELECT COUNT(*) FROM assertions
            WHERE entity_id = COALESCE(NEW.entity_id, OLD.entity_id)
            AND status = 'evidence'
        ),
        updated_at = NOW()
    WHERE id = COALESCE(NEW.entity_id, OLD.entity_id);
    RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

-- Trigger for claim count updates
CREATE TRIGGER trigger_update_entity_claims
AFTER INSERT OR UPDATE OR DELETE ON assertions
FOR EACH ROW
EXECUTE FUNCTION update_entity_claim_counts();

-- Update session timestamp on modification
CREATE OR REPLACE FUNCTION update_session_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_session_updated
BEFORE UPDATE ON research_sessions
FOR EACH ROW
EXECUTE FUNCTION update_session_timestamp();

-- =============================================================================
-- SAMPLE DATA (for testing)
-- =============================================================================

-- Uncomment to insert sample data:
/*
INSERT INTO research_sessions (domain, research_md_path, status, primary_question, researcher)
VALUES (
    'Agentic-SDLC',
    'RESEARCH/Agentic-SDLC/RESEARCH.md',
    'discovery',
    'What AI-powered development tools are viable for federal IL-4+ environments?',
    'Christopher Roge'
);
*/

-- =============================================================================
-- PERMISSIONS (adjust for your environment)
-- =============================================================================

-- Create application role
-- CREATE ROLE research_app WITH LOGIN PASSWORD 'secure_password';
-- GRANT SELECT, INSERT, UPDATE ON ALL TABLES IN SCHEMA public TO research_app;
-- GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO research_app;
-- GRANT SELECT ON ALL TABLES IN SCHEMA public TO research_app;
