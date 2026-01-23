<script lang="ts">
  /**
   * Entity Detail Page
   * A refined research dossier view for deep-diving into entity research data
   * Editorial aesthetic with clear information hierarchy
   */

  import { onMount } from 'svelte';

  interface Props {
    entityId: string;
    onBack?: () => void;
  }

  let { entityId, onBack }: Props = $props();

  // State
  let entity = $state<any>(null);
  let extractions = $state<any[]>([]);
  let loading = $state(true);
  let error = $state<string | null>(null);
  let activeTab = $state<string>('overview');
  let expandedAssertion = $state<string | null>(null);
  let evidenceModalOpen = $state(false);
  let selectedEvidence = $state<any>(null);

  // Tabs configuration
  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'dashboard' },
    { id: 'assertions', label: 'Assertions', icon: 'fact_check' },
    { id: 'pricing', label: 'Pricing', icon: 'payments' },
    { id: 'features', label: 'Features', icon: 'auto_awesome' },
    { id: 'integrations', label: 'Integrations', icon: 'hub' },
    { id: 'differentiators', label: 'Differentiators', icon: 'compare' },
    { id: 'compliance', label: 'Compliance', icon: 'verified_user' },
    { id: 'company', label: 'Company', icon: 'business' },
  ];

  // Category styling
  const categoryStyles: Record<string, { color: string; icon: string }> = {
    feature: { color: '#0284c7', icon: 'auto_awesome' },
    pricing: { color: '#059669', icon: 'payments' },
    integration: { color: '#7c3aed', icon: 'hub' },
    security: { color: '#dc2626', icon: 'shield' },
    performance: { color: '#d97706', icon: 'speed' },
    limitation: { color: '#6b7280', icon: 'block' },
    compliance: { color: '#0891b2', icon: 'gavel' },
    comparison: { color: '#db2777', icon: 'compare' },
  };

  const statusStyles: Record<string, { bg: string; color: string; label: string }> = {
    CLAIM: { bg: '#fef3c7', color: '#92400e', label: 'Pending' },
    EVIDENCE: { bg: '#d1fae5', color: '#065f46', label: 'Validated' },
    REJECTED: { bg: '#fee2e2', color: '#991b1b', label: 'Rejected' },
  };

  const criticalityStyles: Record<string, { bg: string; color: string; border: string }> = {
    CRITICAL: { bg: '#fef2f2', color: '#b91c1c', border: '#fca5a5' },
    HIGH: { bg: '#fff7ed', color: '#c2410c', border: '#fdba74' },
    MEDIUM: { bg: '#fefce8', color: '#a16207', border: '#fde047' },
    LOW: { bg: '#f0fdf4', color: '#15803d', border: '#86efac' },
  };

  const sourceTypeStyles: Record<string, { color: string; icon: string }> = {
    vendor_docs: { color: '#059669', icon: 'description' },
    github: { color: '#1f2937', icon: 'code' },
    blog: { color: '#7c3aed', icon: 'article' },
    forum: { color: '#d97706', icon: 'forum' },
    press: { color: '#0284c7', icon: 'newspaper' },
    video: { color: '#dc2626', icon: 'play_circle' },
    paper: { color: '#6366f1', icon: 'school' },
  };

  const relevanceGradeStyles: Record<string, { color: string; score: number }> = {
    DIRECT_EVIDENCE: { color: '#059669', score: 5 },
    STRONG_SUPPORT: { color: '#10b981', score: 4 },
    PARTIAL_SUPPORT: { color: '#eab308', score: 3 },
    WEAK_SUPPORT: { color: '#f97316', score: 2 },
    NOT_RELEVANT: { color: '#dc2626', score: 1 },
    MISLEADING: { color: '#7f1d1d', score: 0 },
  };

  const federalViabilityStyles: Record<string, { color: string; bg: string }> = {
    GREEN: { color: '#059669', bg: '#d1fae5' },
    YELLOW: { color: '#ca8a04', bg: '#fef9c3' },
    ORANGE: { color: '#ea580c', bg: '#ffedd5' },
    RED: { color: '#dc2626', bg: '#fee2e2' },
  };

  // Claim prefix patterns for highlighting
  const claimPrefixes = [
    { pattern: /^UNIQUE DIFFERENTIATOR:/i, label: 'Unique', color: '#7c3aed', icon: 'star' },
    { pattern: /^MARKET LEADER:/i, label: 'Leader', color: '#059669', icon: 'emoji_events' },
    { pattern: /^COMPETITIVE GAP:/i, label: 'Gap', color: '#f97316', icon: 'trending_down' },
    { pattern: /^MISSING FEATURE(\s*\[[^\]]+\])?:/i, label: 'Missing', color: '#dc2626', icon: 'remove_circle' },
    { pattern: /^FEDERAL PATHWAY(\s*\[[^\]]+\])?:/i, label: 'Federal', color: '#0284c7', icon: 'verified_user' },
    { pattern: /^FEDERAL VIABILITY SCORE:/i, label: 'Fed Score', color: '#0891b2', icon: 'speed' },
  ];

  onMount(async () => {
    await fetchEntityData();
  });

  async function fetchEntityData() {
    loading = true;
    error = null;

    try {
      // Fetch entity with assertions
      const entityResponse = await fetch(`/api/entities/${entityId}`);
      const entityResult = await entityResponse.json();

      if (!entityResult.success) {
        throw new Error(entityResult.error || 'Failed to load entity');
      }

      entity = entityResult.data;

      // Fetch extractions
      const extractionsResponse = await fetch(`/api/extractions?entityId=${entityId}`);
      const extractionsResult = await extractionsResponse.json();

      if (extractionsResult.success) {
        extractions = extractionsResult.data || [];
      }
    } catch (err: any) {
      console.error('Failed to fetch entity data:', err);
      error = err.message || 'Failed to load entity data';
    } finally {
      loading = false;
    }
  }

  // Computed values
  const assertionsByCategory = $derived(() => {
    if (!entity?.assertions) return {};
    const grouped: Record<string, any[]> = {};
    for (const assertion of entity.assertions) {
      const cat = assertion.category || 'uncategorized';
      if (!grouped[cat]) grouped[cat] = [];
      grouped[cat].push(assertion);
    }
    return grouped;
  });

  const stats = $derived(() => {
    if (!entity?.assertions) return { total: 0, validated: 0, pending: 0, rejected: 0 };
    const assertions = entity.assertions;
    return {
      total: assertions.length,
      validated: assertions.filter((a: any) => a.status === 'EVIDENCE').length,
      pending: assertions.filter((a: any) => a.status === 'CLAIM').length,
      rejected: assertions.filter((a: any) => a.status === 'REJECTED').length,
    };
  });

  const evidenceRatio = $derived(() => {
    if (!stats().total) return 0;
    return Math.round((stats().validated / stats().total) * 100);
  });

  const latestExtractions = $derived(() => {
    const byType: Record<string, any> = {};
    for (const ext of extractions) {
      if (!byType[ext.schemaType] || new Date(ext.extractedAt) > new Date(byType[ext.schemaType].extractedAt)) {
        byType[ext.schemaType] = ext;
      }
    }
    return byType;
  });

  function getCategoryStyle(category: string) {
    return categoryStyles[category] || { color: '#6b7280', icon: 'label' };
  }

  function openEvidence(evidence: any) {
    selectedEvidence = evidence;
    evidenceModalOpen = true;
  }

  function closeEvidenceModal() {
    evidenceModalOpen = false;
    selectedEvidence = null;
  }

  function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  }

  function formatPrice(price: number | null, cycle?: string) {
    if (price === null || price === undefined) return 'Contact';
    if (price === 0) return 'Free';
    const formatted = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price);
    return cycle ? `${formatted}/${cycle}` : formatted;
  }

  function parseClaimPrefix(claim: string) {
    for (const prefix of claimPrefixes) {
      const match = claim.match(prefix.pattern);
      if (match) {
        return {
          prefix: match[0],
          content: claim.slice(match[0].length).trim(),
          style: prefix,
        };
      }
    }
    return null;
  }

  function getSourceTypeStyle(sourceType: string) {
    return sourceTypeStyles[sourceType] || { color: '#6b7280', icon: 'link' };
  }

  function getRelevanceGradeStyle(grade: string) {
    return relevanceGradeStyles[grade] || { color: '#6b7280', score: 0 };
  }

  // Computed: Pillar assertions (cited in conclusions)
  const pillarAssertions = $derived(() => {
    if (!entity?.assertions) return [];
    return entity.assertions.filter((a: any) => a.citedInConclusion);
  });

  // Computed: Federal viability from compliance extraction
  const federalViability = $derived(() => {
    const compliance = latestExtractions().compliance?.data;
    if (!compliance) return null;
    return {
      score: compliance.federalViabilityScore,
      level: compliance.federalViabilityLevel,
      pathways: compliance.federalPathways || [],
      notes: compliance.federalViabilityNotes,
    };
  });
</script>

<div class="entity-page">
  {#if loading}
    <div class="loading-container">
      <div class="loading-pulse"></div>
      <p>Loading research data...</p>
    </div>
  {:else if error}
    <div class="error-container">
      <span class="material-symbols-rounded error-icon">error_outline</span>
      <h3>Unable to load entity</h3>
      <p>{error}</p>
      <button class="retry-button" onclick={fetchEntityData}>
        <span class="material-symbols-rounded">refresh</span>
        Try Again
      </button>
    </div>
  {:else if entity}
    <!-- Header -->
    <header class="entity-header">
      <div class="header-nav">
        <button class="back-button" onclick={onBack}>
          <span class="material-symbols-rounded">arrow_back</span>
          <span>Back to Grove</span>
        </button>
      </div>

      <div class="header-main">
        <div class="entity-identity">
          {#if entity.logoSvgContent}
            <div class="entity-logo entity-logo-svg">
              {@html entity.logoSvgContent}
              {#if entity.logoVerified}
                <span class="logo-verified" title="Verified logo">
                  <span class="material-symbols-rounded">verified</span>
                </span>
              {/if}
            </div>
          {:else if entity.logoUrl}
            <div class="entity-logo">
              <img src={entity.logoUrl} alt="{entity.name} logo" />
              {#if entity.logoVerified}
                <span class="logo-verified" title="Verified logo">
                  <span class="material-symbols-rounded">verified</span>
                </span>
              {/if}
            </div>
          {:else}
            <div class="entity-logo entity-logo-placeholder">
              <span class="material-symbols-rounded">deployed_code</span>
            </div>
          {/if}

          <div class="entity-info">
            <div class="entity-meta">
              <span class="entity-type">{entity.entityType || 'Entity'}</span>
              {#if entity.category?.displayName}
                <span class="entity-category">{entity.category.displayName}</span>
              {:else if entity.discoveryCategory}
                <span class="entity-category">{entity.discoveryCategory.replace(/_/g, ' ')}</span>
              {/if}
              {#if entity.domain?.name}
                <span class="entity-domain" title="Research Domain">
                  <span class="material-symbols-rounded">science</span>
                  {entity.domain.name}
                </span>
              {/if}
            </div>
            <h1 class="entity-name">{entity.name}</h1>
            {#if entity.description}
              <p class="entity-description">{entity.description}</p>
            {/if}
            {#if entity.url}
              <a href={entity.url} target="_blank" rel="noopener" class="entity-url">
                <span class="material-symbols-rounded">open_in_new</span>
                {entity.url.replace(/^https?:\/\//, '').split('/')[0]}
              </a>
            {/if}
          </div>
        </div>

        <div class="header-stats">
          <div class="stat-card stat-card-primary">
            <div class="stat-ring">
              <svg viewBox="0 0 36 36" class="stat-ring-svg">
                <path
                  class="stat-ring-bg"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  class="stat-ring-fill"
                  stroke-dasharray="{evidenceRatio()}, 100"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div class="stat-ring-value">{evidenceRatio()}%</div>
            </div>
            <div class="stat-label">Validated</div>
          </div>

          <div class="stats-grid">
            <div class="stat-mini">
              <span class="stat-mini-value">{stats().total}</span>
              <span class="stat-mini-label">Total</span>
            </div>
            <div class="stat-mini stat-mini-success">
              <span class="stat-mini-value">{stats().validated}</span>
              <span class="stat-mini-label">Evidence</span>
            </div>
            <div class="stat-mini stat-mini-warning">
              <span class="stat-mini-value">{stats().pending}</span>
              <span class="stat-mini-label">Pending</span>
            </div>
            <div class="stat-mini stat-mini-error">
              <span class="stat-mini-value">{stats().rejected}</span>
              <span class="stat-mini-label">Rejected</span>
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- Tab Navigation -->
    <nav class="tab-nav">
      <div class="tab-list">
        {#each tabs as tab}
          <button
            class="tab-button"
            class:active={activeTab === tab.id}
            onclick={() => activeTab = tab.id}
          >
            <span class="material-symbols-rounded">{tab.icon}</span>
            <span>{tab.label}</span>
            {#if tab.id === 'assertions'}
              <span class="tab-count">{stats().total}</span>
              {#if pillarAssertions().length > 0}
                <span class="tab-pillar-indicator" title="{pillarAssertions().length} pillar assertions">
                  <span class="material-symbols-rounded">star</span>
                </span>
              {/if}
            {:else if tab.id === 'pricing' && latestExtractions().pricing}
              <span class="tab-indicator"></span>
            {:else if tab.id === 'features' && latestExtractions().features}
              <span class="tab-indicator"></span>
            {:else if tab.id === 'integrations' && latestExtractions().integrations}
              <span class="tab-indicator"></span>
            {:else if tab.id === 'differentiators' && latestExtractions().differentiators}
              <span class="tab-indicator"></span>
            {:else if tab.id === 'compliance' && latestExtractions().compliance}
              {#if federalViability()?.level}
                {@const fedStyle = federalViabilityStyles[federalViability()?.level || 'RED']}
                <span class="tab-fed-indicator" style="background: {fedStyle.bg}; color: {fedStyle.color}">
                  {federalViability()?.level}
                </span>
              {:else}
                <span class="tab-indicator"></span>
              {/if}
            {:else if tab.id === 'company' && latestExtractions().company}
              <span class="tab-indicator"></span>
            {/if}
          </button>
        {/each}
      </div>
    </nav>

    <!-- Tab Content -->
    <main class="tab-content">
      {#if activeTab === 'overview'}
        <div class="overview-grid">
          <!-- Quick Stats -->
          <section class="overview-card research-summary">
            <h3>
              <span class="material-symbols-rounded">analytics</span>
              Research Summary
            </h3>
            <div class="summary-content">
              <div class="summary-stat">
                <span class="summary-stat-label">Assertions</span>
                <span class="summary-stat-value">{stats().total}</span>
              </div>
              <div class="summary-stat">
                <span class="summary-stat-label">Evidence Rate</span>
                <span class="summary-stat-value accent">{evidenceRatio()}%</span>
              </div>
              <div class="summary-stat">
                <span class="summary-stat-label">Data Extractions</span>
                <span class="summary-stat-value">{extractions.length}</span>
              </div>
              <div class="summary-stat">
                <span class="summary-stat-label">Pillar Claims</span>
                <span class="summary-stat-value" class:pillar={pillarAssertions().length > 0}>
                  {pillarAssertions().length}
                  {#if pillarAssertions().length > 0}
                    <span class="material-symbols-rounded pillar-star">star</span>
                  {/if}
                </span>
              </div>
            </div>
            {#if federalViability()?.level}
              {@const fedStyle = federalViabilityStyles[federalViability()?.level || 'RED']}
              <div class="federal-viability-badge" style="background: {fedStyle.bg}; border-color: {fedStyle.color}">
                <span class="material-symbols-rounded" style="color: {fedStyle.color}">security</span>
                <span class="fed-label">Federal Viability</span>
                <span class="fed-level" style="color: {fedStyle.color}">{federalViability()?.level}</span>
                {#if federalViability()?.score}
                  <span class="fed-score">({Math.round((federalViability()?.score || 0) * 100)}%)</span>
                {/if}
              </div>
            {/if}
          </section>

          <!-- Extraction Coverage -->
          <section class="overview-card extraction-coverage">
            <h3>
              <span class="material-symbols-rounded">storage</span>
              Data Coverage
            </h3>
            <div class="coverage-grid">
              {#each ['pricing', 'features', 'integrations', 'differentiators', 'company', 'compliance'] as schemaType}
                {@const hasData = !!latestExtractions()[schemaType]}
                {@const isStale = hasData && latestExtractions()[schemaType].expiresAt && new Date(latestExtractions()[schemaType].expiresAt) < new Date()}
                <div class="coverage-item" class:has-data={hasData} class:is-stale={isStale}>
                  <span class="material-symbols-rounded">
                    {hasData ? (isStale ? 'schedule' : 'check_circle') : 'radio_button_unchecked'}
                  </span>
                  <span class="coverage-label">{schemaType}</span>
                  {#if hasData}
                    <span class="coverage-date" class:stale={isStale}>
                      {formatDate(latestExtractions()[schemaType].extractedAt)}
                      {#if isStale}
                        <span class="stale-badge">stale</span>
                      {/if}
                    </span>
                  {/if}
                </div>
              {/each}
            </div>
          </section>

          <!-- Assertions by Category -->
          <section class="overview-card assertions-breakdown">
            <h3>
              <span class="material-symbols-rounded">category</span>
              Assertions by Category
            </h3>
            <div class="category-bars">
              {#each Object.entries(assertionsByCategory()) as [category, assertions]}
                {@const style = getCategoryStyle(category)}
                {@const validated = assertions.filter((a: any) => a.status === 'EVIDENCE').length}
                {@const percentage = Math.round((assertions.length / stats().total) * 100)}
                <div class="category-bar-item">
                  <div class="category-bar-header">
                    <span class="category-bar-icon" style="color: {style.color}">
                      <span class="material-symbols-rounded">{style.icon}</span>
                    </span>
                    <span class="category-bar-name">{category}</span>
                    <span class="category-bar-count">{assertions.length}</span>
                  </div>
                  <div class="category-bar-track">
                    <div class="category-bar-fill" style="width: {percentage}%; background: {style.color}"></div>
                    <div class="category-bar-validated" style="width: {(validated / stats().total) * 100}%; background: {style.color}; opacity: 0.3"></div>
                  </div>
                </div>
              {/each}
            </div>
          </section>

          <!-- Recent Assertions -->
          <section class="overview-card recent-assertions">
            <h3>
              <span class="material-symbols-rounded">history</span>
              Recent Assertions
            </h3>
            <div class="assertion-preview-list">
              {#each entity.assertions.slice(0, 5) as assertion}
                {@const catStyle = getCategoryStyle(assertion.category || 'uncategorized')}
                {@const statusStyle = statusStyles[assertion.status]}
                <div class="assertion-preview">
                  <div class="assertion-preview-header">
                    <span class="assertion-preview-category" style="color: {catStyle.color}">
                      <span class="material-symbols-rounded">{catStyle.icon}</span>
                      {assertion.category || 'uncategorized'}
                    </span>
                    <span class="assertion-preview-status" style="background: {statusStyle.bg}; color: {statusStyle.color}">
                      {statusStyle.label}
                    </span>
                  </div>
                  <p class="assertion-preview-claim">{assertion.claim}</p>
                </div>
              {/each}
            </div>
            {#if entity.assertions.length > 5}
              <button class="view-all-btn" onclick={() => activeTab = 'assertions'}>
                View all {entity.assertions.length} assertions
                <span class="material-symbols-rounded">arrow_forward</span>
              </button>
            {/if}
          </section>
        </div>

      {:else if activeTab === 'assertions'}
        <div class="assertions-view">
          <!-- Assertions grouped by category -->
          {#each Object.entries(assertionsByCategory()) as [category, assertions]}
            {@const style = getCategoryStyle(category)}
            <section class="assertion-category-section">
              <div class="category-header">
                <span class="category-icon" style="background: {style.color}20; color: {style.color}">
                  <span class="material-symbols-rounded">{style.icon}</span>
                </span>
                <h3>{category}</h3>
                <span class="category-count">{assertions.length} assertions</span>
              </div>

              <div class="assertions-list">
                {#each assertions as assertion}
                  {@const statusStyle = statusStyles[assertion.status]}
                  {@const critStyle = criticalityStyles[assertion.criticality] || criticalityStyles.MEDIUM}
                  {@const isExpanded = expandedAssertion === assertion.id}
                  {@const parsedClaim = parseClaimPrefix(assertion.claim)}
                  <article
                    class="assertion-card"
                    class:expanded={isExpanded}
                    class:is-pillar={assertion.citedInConclusion}
                    style="border-left-color: {style.color}"
                  >
                    <div class="assertion-main" onclick={() => expandedAssertion = isExpanded ? null : assertion.id}>
                      <div class="assertion-badges">
                        {#if assertion.citedInConclusion}
                          <span class="assertion-pillar" title={assertion.conclusionContext || 'Pillar Assertion'}>
                            <span class="material-symbols-rounded">star</span>
                            Pillar
                          </span>
                        {/if}
                        <span class="assertion-status" style="background: {statusStyle.bg}; color: {statusStyle.color}">
                          {statusStyle.label}
                        </span>
                        {#if assertion.partiallyValidated}
                          <span class="assertion-partial">Partial</span>
                        {/if}
                        <span class="assertion-criticality" style="background: {critStyle.bg}; color: {critStyle.color}; border-color: {critStyle.border}">
                          {assertion.criticality}
                        </span>
                        {#if assertion.confidence}
                          <span class="assertion-confidence" title={assertion.confidenceFactors ? JSON.stringify(assertion.confidenceFactors, null, 2) : ''}>
                            <span class="material-symbols-rounded">trending_up</span>
                            {Math.round(assertion.confidence * 100)}%
                          </span>
                        {/if}
                        {#if parsedClaim}
                          <span class="claim-prefix-badge" style="background: {parsedClaim.style.color}20; color: {parsedClaim.style.color}">
                            <span class="material-symbols-rounded">{parsedClaim.style.icon}</span>
                            {parsedClaim.style.label}
                          </span>
                        {/if}
                      </div>

                      <p class="assertion-claim">
                        {#if parsedClaim}
                          <span class="claim-prefix" style="color: {parsedClaim.style.color}">{parsedClaim.prefix}</span>
                          {parsedClaim.content}
                        {:else}
                          {assertion.claim}
                        {/if}
                      </p>

                      <div class="assertion-meta">
                        {#if assertion.sources?.length}
                          <span class="meta-item">
                            <span class="material-symbols-rounded">link</span>
                            {assertion.sources.length} source{assertion.sources.length !== 1 ? 's' : ''}
                          </span>
                        {/if}
                        {#if assertion.evidenceScreenshotPath}
                          <span class="meta-item has-evidence">
                            <span class="material-symbols-rounded">photo_camera</span>
                            Evidence
                          </span>
                        {/if}
                        {#if assertion.evidenceChain?.length > 1}
                          <span class="meta-item has-evidence">
                            <span class="material-symbols-rounded">collections</span>
                            {assertion.evidenceChain.length} screenshots
                          </span>
                        {/if}
                        {#if assertion.validatedBy}
                          <span class="meta-item validated-by">
                            <span class="material-symbols-rounded">person</span>
                            {assertion.validatedBy}
                          </span>
                        {/if}
                        <span class="meta-item">
                          <span class="material-symbols-rounded">schedule</span>
                          {formatDate(assertion.createdAt)}
                        </span>
                      </div>

                      <button class="expand-toggle">
                        <span class="material-symbols-rounded">
                          {isExpanded ? 'expand_less' : 'expand_more'}
                        </span>
                      </button>
                    </div>

                    {#if isExpanded}
                      <div class="assertion-details">
                        {#if assertion.conclusionContext}
                          <div class="detail-section pillar-context">
                            <h4>
                              <span class="material-symbols-rounded">star</span>
                              Conclusion Context
                            </h4>
                            <p class="conclusion-context-text">{assertion.conclusionContext}</p>
                          </div>
                        {/if}

                        {#if assertion.evidenceDescription}
                          <div class="detail-section">
                            <h4>
                              <span class="material-symbols-rounded">description</span>
                              Evidence Description
                            </h4>
                            <p>{assertion.evidenceDescription}</p>
                          </div>
                        {/if}

                        {#if assertion.evidenceChain?.length}
                          <div class="detail-section">
                            <h4>
                              <span class="material-symbols-rounded">collections</span>
                              Evidence Chain ({assertion.evidenceChain.length} screenshots)
                            </h4>
                            <div class="evidence-chain-gallery">
                              {#each assertion.evidenceChain as evidence, idx}
                                <button
                                  class="evidence-chain-item"
                                  onclick={() => openEvidence({ path: evidence.screenshotPath, description: evidence.description })}
                                >
                                  <img src={evidence.screenshotPath} alt="Evidence {idx + 1}" />
                                  <div class="evidence-chain-caption">
                                    <span class="evidence-chain-num">{idx + 1}</span>
                                    <span class="evidence-chain-desc">{evidence.description || 'Screenshot'}</span>
                                  </div>
                                </button>
                              {/each}
                            </div>
                          </div>
                        {:else if assertion.evidenceScreenshotPath}
                          <div class="detail-section">
                            <h4>
                              <span class="material-symbols-rounded">image</span>
                              Evidence Screenshot
                            </h4>
                            <button
                              class="evidence-thumbnail"
                              onclick={() => openEvidence({ path: assertion.evidenceScreenshotPath, description: assertion.evidenceDescription })}
                            >
                              <img src={assertion.evidenceScreenshotPath} alt="Evidence screenshot" />
                              <span class="thumbnail-overlay">
                                <span class="material-symbols-rounded">zoom_in</span>
                              </span>
                            </button>
                          </div>
                        {/if}

                        {#if assertion.humanResponse}
                          <div class="detail-section">
                            <h4>
                              <span class="material-symbols-rounded">rate_review</span>
                              Human Response
                            </h4>
                            <p class="human-response">{assertion.humanResponse}</p>
                            {#if assertion.validatedAt && assertion.validatedBy}
                              <div class="validation-meta">
                                <span class="material-symbols-rounded">check_circle</span>
                                Validated by {assertion.validatedBy} on {formatDate(assertion.validatedAt)}
                              </div>
                            {/if}
                          </div>
                        {/if}

                        {#if assertion.reasoning?.length}
                          <div class="detail-section">
                            <h4>
                              <span class="material-symbols-rounded">psychology</span>
                              Reasoning
                            </h4>
                            {#each assertion.reasoning as reason}
                              <p class="reasoning-content">{reason.content}</p>
                            {/each}
                          </div>
                        {/if}

                        {#if assertion.sources?.length}
                          <div class="detail-section">
                            <h4>
                              <span class="material-symbols-rounded">link</span>
                              Sources ({assertion.sources.length})
                            </h4>
                            <ul class="sources-list">
                              {#each assertion.sources as sourceLink}
                                {@const source = sourceLink.source}
                                {@const sourceTypeStyle = getSourceTypeStyle(source.sourceType)}
                                {@const gradeStyle = getRelevanceGradeStyle(sourceLink.relevanceGrade)}
                                <li class="source-item" class:url-broken={source.isAccessible === false}>
                                  <div class="source-header">
                                    <span class="source-type-badge" style="color: {sourceTypeStyle.color}">
                                      <span class="material-symbols-rounded">{sourceTypeStyle.icon}</span>
                                      {source.sourceType || 'link'}
                                    </span>
                                    <a href={source.url} target="_blank" rel="noopener" class="source-link">
                                      <span class="source-title">{source.title || source.url}</span>
                                      <span class="material-symbols-rounded">open_in_new</span>
                                    </a>
                                    {#if source.isAccessible === false}
                                      <span class="url-status-badge broken" title="URL returned {source.lastStatusCode || 'error'}">
                                        <span class="material-symbols-rounded">link_off</span>
                                      </span>
                                    {/if}
                                  </div>
                                  <div class="source-meta-row">
                                    {#if sourceLink.relevanceGrade}
                                      <span class="source-grade" style="background: {gradeStyle.color}20; color: {gradeStyle.color}">
                                        {sourceLink.relevanceGrade.replace(/_/g, ' ')}
                                      </span>
                                    {/if}
                                    {#if sourceLink.addedBy}
                                      <span class="source-added-by">
                                        Added by {sourceLink.addedBy}
                                      </span>
                                    {/if}
                                    {#if source.status && source.status !== 'PROPOSED'}
                                      <span class="source-status" class:validated={source.status === 'VALIDATED'} class:rejected={source.status === 'REJECTED'}>
                                        {source.status}
                                      </span>
                                    {/if}
                                  </div>
                                  {#if sourceLink.quote}
                                    <blockquote class="source-quote">"{sourceLink.quote}"</blockquote>
                                  {/if}
                                  {#if sourceLink.annotation}
                                    <div class="source-annotation">
                                      <span class="material-symbols-rounded">comment</span>
                                      {sourceLink.annotation}
                                    </div>
                                  {/if}
                                </li>
                              {/each}
                            </ul>
                          </div>
                        {/if}

                        {#if assertion.supersededBy}
                          <div class="detail-section superseded-notice">
                            <span class="material-symbols-rounded">update</span>
                            This assertion has been superseded by a newer claim
                          </div>
                        {/if}
                      </div>
                    {/if}
                  </article>
                {/each}
              </div>
            </section>
          {/each}

          {#if Object.keys(assertionsByCategory()).length === 0}
            <div class="empty-state">
              <span class="material-symbols-rounded">inbox</span>
              <h3>No assertions yet</h3>
              <p>Research data will appear here once collected.</p>
            </div>
          {/if}
        </div>

      {:else if activeTab === 'pricing'}
        {@const pricingData = latestExtractions().pricing?.data}
        <div class="extraction-view">
          {#if pricingData}
            <div class="extraction-header">
              <h2>Pricing Information</h2>
              <span class="extraction-date">
                <span class="material-symbols-rounded">schedule</span>
                Updated {formatDate(latestExtractions().pricing.extractedAt)}
              </span>
            </div>

            <div class="pricing-grid">
              {#each pricingData.tiers || [] as tier, index}
                <div class="pricing-card" class:featured={tier.isRecommended || index === 1}>
                  {#if tier.isRecommended}
                    <div class="pricing-badge">Recommended</div>
                  {/if}
                  <h3 class="pricing-name">{tier.name}</h3>
                  <div class="pricing-price">
                    <span class="price-amount">{formatPrice(tier.price, tier.billingCycle)}</span>
                    {#if tier.pricePerUnit}
                      <span class="price-unit">{tier.pricePerUnit}</span>
                    {/if}
                  </div>
                  {#if tier.features?.length}
                    <ul class="pricing-features">
                      {#each tier.features as feature}
                        <li>
                          <span class="material-symbols-rounded">check</span>
                          {feature}
                        </li>
                      {/each}
                    </ul>
                  {/if}
                  {#if tier.limits}
                    <div class="pricing-limits">
                      {#each Object.entries(tier.limits) as [key, value]}
                        <div class="limit-item">
                          <span class="limit-key">{key}</span>
                          <span class="limit-value">{value}</span>
                        </div>
                      {/each}
                    </div>
                  {/if}
                </div>
              {/each}
            </div>

            <div class="pricing-meta">
              {#if pricingData.hasFreeTier}
                <span class="meta-tag success">
                  <span class="material-symbols-rounded">check_circle</span>
                  Free tier available
                </span>
              {/if}
              {#if pricingData.hasEnterprise}
                <span class="meta-tag">
                  <span class="material-symbols-rounded">business</span>
                  Enterprise pricing
                </span>
              {/if}
            </div>
          {:else}
            <div class="empty-state">
              <span class="material-symbols-rounded">payments</span>
              <h3>No pricing data</h3>
              <p>Pricing information hasn't been extracted yet.</p>
            </div>
          {/if}
        </div>

      {:else if activeTab === 'features'}
        {@const featuresData = latestExtractions().features?.data}
        <div class="extraction-view">
          {#if featuresData}
            <div class="extraction-header">
              <h2>Features & Capabilities</h2>
              <span class="extraction-date">
                <span class="material-symbols-rounded">schedule</span>
                Updated {formatDate(latestExtractions().features.extractedAt)}
              </span>
            </div>

            {#if featuresData.highlights?.length}
              <div class="features-highlights">
                <h3>Key Highlights</h3>
                <div class="highlights-grid">
                  {#each featuresData.highlights as highlight}
                    <div class="highlight-card">
                      <span class="material-symbols-rounded">star</span>
                      <span>{highlight}</span>
                    </div>
                  {/each}
                </div>
              </div>
            {/if}

            {#if featuresData.categories?.length}
              <div class="features-categories">
                {#each featuresData.categories as category}
                  <section class="feature-category">
                    <h3>{category.name}</h3>
                    <ul class="feature-list">
                      {#each category.features || [] as feature}
                        <li class="feature-item">
                          <span class="material-symbols-rounded">check_circle</span>
                          <div class="feature-content">
                            <span class="feature-name">{feature.name}</span>
                            {#if feature.description}
                              <span class="feature-desc">{feature.description}</span>
                            {/if}
                          </div>
                          {#if feature.availability && feature.availability !== 'all'}
                            <span class="feature-availability">{feature.availability}</span>
                          {/if}
                          {#if feature.isNew}
                            <span class="feature-new">New</span>
                          {/if}
                        </li>
                      {/each}
                    </ul>
                  </section>
                {/each}
              </div>
            {/if}
          {:else}
            <div class="empty-state">
              <span class="material-symbols-rounded">auto_awesome</span>
              <h3>No features data</h3>
              <p>Feature information hasn't been extracted yet.</p>
            </div>
          {/if}
        </div>

      {:else if activeTab === 'integrations'}
        {@const integrationsData = latestExtractions().integrations?.data}
        <div class="extraction-view">
          {#if integrationsData}
            <div class="extraction-header">
              <h2>Integrations & APIs</h2>
              <span class="extraction-date">
                <span class="material-symbols-rounded">schedule</span>
                Updated {formatDate(latestExtractions().integrations.extractedAt)}
              </span>
            </div>

            <div class="integrations-summary">
              {#if integrationsData.totalCount}
                <div class="integration-stat">
                  <span class="stat-number">{integrationsData.totalCount}</span>
                  <span class="stat-label">Total Integrations</span>
                </div>
              {/if}
              {#if integrationsData.hasApi}
                <div class="integration-badge success">
                  <span class="material-symbols-rounded">api</span>
                  API Available
                </div>
              {/if}
              {#if integrationsData.sdkLanguages?.length}
                <div class="sdk-languages">
                  <span class="sdk-label">SDKs:</span>
                  {#each integrationsData.sdkLanguages as lang}
                    <span class="sdk-tag">{lang}</span>
                  {/each}
                </div>
              {/if}
            </div>

            {#if integrationsData.categories?.length}
              <div class="integrations-categories">
                {#each integrationsData.categories as category}
                  <section class="integration-category">
                    <h3>
                      <span class="material-symbols-rounded">folder</span>
                      {category.name}
                      {#if category.integrations?.length}
                        <span class="category-count">{category.integrations.length}</span>
                      {/if}
                    </h3>
                    {#if category.integrations?.length}
                      <div class="integration-chips">
                        {#each category.integrations as integration}
                          <div class="integration-chip">
                            {#if integration.logo}
                              <img src={integration.logo} alt="" class="integration-logo" />
                            {:else}
                              <span class="material-symbols-rounded">extension</span>
                            {/if}
                            <span class="integration-name">{integration.name || integration}</span>
                            {#if integration.type}
                              <span class="integration-type">{integration.type}</span>
                            {/if}
                          </div>
                        {/each}
                      </div>
                    {/if}
                  </section>
                {/each}
              </div>
            {:else if integrationsData.list?.length}
              <div class="integration-chips flat">
                {#each integrationsData.list as integration}
                  <div class="integration-chip">
                    <span class="material-symbols-rounded">extension</span>
                    <span class="integration-name">{integration.name || integration}</span>
                  </div>
                {/each}
              </div>
            {/if}
          {:else}
            <div class="empty-state">
              <span class="material-symbols-rounded">hub</span>
              <h3>No integrations data</h3>
              <p>Integration information hasn't been extracted yet.</p>
            </div>
          {/if}
        </div>

      {:else if activeTab === 'differentiators'}
        {@const diffData = latestExtractions().differentiators?.data}
        <div class="extraction-view">
          {#if diffData}
            <div class="extraction-header">
              <h2>Competitive Differentiators</h2>
              <span class="extraction-date">
                <span class="material-symbols-rounded">schedule</span>
                Updated {formatDate(latestExtractions().differentiators.extractedAt)}
              </span>
            </div>

            {#if diffData.differentiationSummary}
              <div class="differentiation-summary">
                <span class="material-symbols-rounded">lightbulb</span>
                <p>{diffData.differentiationSummary}</p>
              </div>
            {/if}

            {#if diffData.primaryCompetitors?.length}
              <div class="competitors-section">
                <h3>Primary Competitors</h3>
                <div class="competitor-chips">
                  {#each diffData.primaryCompetitors as competitor}
                    <span class="competitor-chip">{competitor}</span>
                  {/each}
                </div>
              </div>
            {/if}

            <div class="differentiators-grid">
              {#if diffData.uniqueFeatures?.length}
                <section class="diff-section diff-unique">
                  <h3>
                    <span class="material-symbols-rounded">star</span>
                    Unique Differentiators
                  </h3>
                  <p class="diff-section-desc">Features only this entity has</p>
                  <div class="diff-list">
                    {#each diffData.uniqueFeatures as feature}
                      <div class="diff-item unique">
                        <div class="diff-header">
                          <span class="diff-name">{feature.name}</span>
                        </div>
                        {#if feature.description}
                          <p class="diff-desc">{feature.description}</p>
                        {/if}
                        {#if feature.comparedTo?.length}
                          <div class="diff-comparison">
                            {#each feature.comparedTo as comparison}
                              <span class="comparison-tag">{comparison}</span>
                            {/each}
                          </div>
                        {/if}
                      </div>
                    {/each}
                  </div>
                </section>
              {/if}

              {#if diffData.leadingFeatures?.length}
                <section class="diff-section diff-leading">
                  <h3>
                    <span class="material-symbols-rounded">emoji_events</span>
                    Market Leading
                  </h3>
                  <p class="diff-section-desc">Best-in-class capabilities</p>
                  <div class="diff-list">
                    {#each diffData.leadingFeatures as feature}
                      <div class="diff-item leading">
                        <div class="diff-header">
                          <span class="diff-name">{feature.name}</span>
                        </div>
                        {#if feature.description}
                          <p class="diff-desc">{feature.description}</p>
                        {/if}
                        {#if feature.comparedTo?.length}
                          <div class="diff-comparison">
                            {#each feature.comparedTo as comparison}
                              <span class="comparison-tag">{comparison}</span>
                            {/each}
                          </div>
                        {/if}
                      </div>
                    {/each}
                  </div>
                </section>
              {/if}

              {#if diffData.laggingFeatures?.length}
                <section class="diff-section diff-lagging">
                  <h3>
                    <span class="material-symbols-rounded">trending_down</span>
                    Competitive Gaps
                  </h3>
                  <p class="diff-section-desc">Areas where competitors are ahead</p>
                  <div class="diff-list">
                    {#each diffData.laggingFeatures as feature}
                      <div class="diff-item lagging">
                        <div class="diff-header">
                          <span class="diff-name">{feature.name}</span>
                        </div>
                        {#if feature.reason}
                          <p class="diff-desc">{feature.reason}</p>
                        {/if}
                        {#if feature.competitors?.length}
                          <div class="diff-competitors">
                            <span class="competitors-label">Leaders:</span>
                            {#each feature.competitors as comp}
                              <span class="competitor-tag">{comp}</span>
                            {/each}
                          </div>
                        {/if}
                      </div>
                    {/each}
                  </div>
                </section>
              {/if}

              {#if diffData.missingFeatures?.length}
                <section class="diff-section diff-missing">
                  <h3>
                    <span class="material-symbols-rounded">remove_circle</span>
                    Missing Features
                  </h3>
                  <p class="diff-section-desc">Features competitors have that are absent</p>
                  <div class="diff-list">
                    {#each diffData.missingFeatures as feature}
                      <div class="diff-item missing" class:critical={feature.importance === 'critical'}>
                        <div class="diff-header">
                          <span class="diff-name">{feature.name}</span>
                          {#if feature.importance}
                            <span class="importance-badge" class:critical={feature.importance === 'critical'}>
                              {feature.importance}
                            </span>
                          {/if}
                        </div>
                        {#if feature.competitors?.length}
                          <div class="diff-competitors">
                            <span class="competitors-label">Available in:</span>
                            {#each feature.competitors as comp}
                              <span class="competitor-tag">{comp}</span>
                            {/each}
                          </div>
                        {/if}
                      </div>
                    {/each}
                  </div>
                </section>
              {/if}
            </div>

            {#if diffData.tableStakes?.length}
              <section class="table-stakes-section">
                <h3>
                  <span class="material-symbols-rounded">check_box</span>
                  Table Stakes
                </h3>
                <p class="diff-section-desc">Features everyone has (not differentiating)</p>
                <div class="table-stakes-chips">
                  {#each diffData.tableStakes as feature}
                    <span class="table-stake-chip">{feature}</span>
                  {/each}
                </div>
              </section>
            {/if}
          {:else}
            <div class="empty-state">
              <span class="material-symbols-rounded">compare</span>
              <h3>No differentiators data</h3>
              <p>Competitive differentiation hasn't been analyzed yet.</p>
            </div>
          {/if}
        </div>

      {:else if activeTab === 'compliance'}
        {@const complianceData = latestExtractions().compliance?.data}
        <div class="extraction-view">
          {#if complianceData}
            <div class="extraction-header">
              <h2>Security & Compliance</h2>
              <span class="extraction-date">
                <span class="material-symbols-rounded">schedule</span>
                Updated {formatDate(latestExtractions().compliance.extractedAt)}
              </span>
            </div>

            {#if complianceData.certifications?.length}
              <section class="compliance-section">
                <h3>Certifications</h3>
                <div class="certifications-grid">
                  {#each complianceData.certifications as cert}
                    <div class="certification-card" class:certified={cert.status === 'certified'}>
                      <span class="cert-icon material-symbols-rounded">
                        {cert.status === 'certified' ? 'verified' : cert.status === 'in_progress' ? 'pending' : 'help_outline'}
                      </span>
                      <div class="cert-info">
                        <span class="cert-name">{cert.name}</span>
                        <span class="cert-status">{cert.status}</span>
                        {#if cert.validUntil}
                          <span class="cert-valid">Valid until {cert.validUntil}</span>
                        {/if}
                      </div>
                    </div>
                  {/each}
                </div>
              </section>
            {/if}

            <div class="compliance-flags">
              {#if complianceData.soc2}
                <span class="compliance-flag success">
                  <span class="material-symbols-rounded">check_circle</span>
                  SOC 2 Compliant
                </span>
              {/if}
              {#if complianceData.gdprCompliant}
                <span class="compliance-flag success">
                  <span class="material-symbols-rounded">check_circle</span>
                  GDPR Compliant
                </span>
              {/if}
              {#if complianceData.hipaaCompliant}
                <span class="compliance-flag success">
                  <span class="material-symbols-rounded">check_circle</span>
                  HIPAA Compliant
                </span>
              {/if}
              {#if complianceData.fedRampStatus}
                <span class="compliance-flag" class:success={complianceData.fedRampStatus === 'Authorized'}>
                  <span class="material-symbols-rounded">
                    {complianceData.fedRampStatus === 'Authorized' ? 'verified' : 'pending'}
                  </span>
                  FedRAMP: {complianceData.fedRampStatus}
                </span>
              {/if}
            </div>

            {#if complianceData.securityFeatures?.length}
              <section class="compliance-section">
                <h3>Security Features</h3>
                <ul class="security-features-list">
                  {#each complianceData.securityFeatures as feature}
                    <li>
                      <span class="material-symbols-rounded">shield</span>
                      {feature}
                    </li>
                  {/each}
                </ul>
              </section>
            {/if}

            {#if complianceData.dataResidency?.length}
              <section class="compliance-section">
                <h3>Data Residency</h3>
                <div class="residency-tags">
                  {#each complianceData.dataResidency as region}
                    <span class="residency-tag">{region}</span>
                  {/each}
                </div>
              </section>
            {/if}

            {#if complianceData.federalPathways?.length}
              <section class="compliance-section federal-pathways">
                <h3>
                  <span class="material-symbols-rounded">security</span>
                  Federal Pathways
                </h3>
                {#if complianceData.federalViabilityScore !== undefined}
                  {@const fedLevel = complianceData.federalViabilityLevel || 'RED'}
                  {@const fedStyle = federalViabilityStyles[fedLevel]}
                  <div class="federal-viability-card" style="background: {fedStyle.bg}; border-color: {fedStyle.color}">
                    <div class="fed-score-ring" style="--score-color: {fedStyle.color}">
                      <svg viewBox="0 0 36 36" class="fed-ring-svg">
                        <path
                          class="fed-ring-bg"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                        <path
                          class="fed-ring-fill"
                          style="stroke: {fedStyle.color}"
                          stroke-dasharray="{Math.round(complianceData.federalViabilityScore * 100)}, 100"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                      </svg>
                      <div class="fed-ring-value" style="color: {fedStyle.color}">
                        {Math.round(complianceData.federalViabilityScore * 100)}%
                      </div>
                    </div>
                    <div class="fed-viability-info">
                      <span class="fed-viability-level" style="color: {fedStyle.color}">{fedLevel}</span>
                      <span class="fed-viability-label">Federal Viability</span>
                      {#if complianceData.federalViabilityNotes}
                        <p class="fed-viability-notes">{complianceData.federalViabilityNotes}</p>
                      {/if}
                    </div>
                  </div>
                {/if}

                <div class="pathways-grid">
                  {#each complianceData.federalPathways as pathway}
                    {@const pathwayStatus = pathway.status === 'available' ? 'success' : pathway.status === 'in_progress' ? 'warning' : 'pending'}
                    <div class="pathway-card" class:available={pathway.status === 'available'} class:in-progress={pathway.status === 'in_progress'}>
                      <div class="pathway-header">
                        <span class="pathway-type">{pathway.pathway?.replace(/_/g, ' ') || 'Unknown'}</span>
                        <span class="pathway-status {pathwayStatus}">
                          <span class="material-symbols-rounded">
                            {pathway.status === 'available' ? 'check_circle' : pathway.status === 'in_progress' ? 'pending' : 'help_outline'}
                          </span>
                          {pathway.status}
                        </span>
                      </div>
                      {#if pathway.provider}
                        <div class="pathway-provider">
                          <span class="material-symbols-rounded">cloud</span>
                          {pathway.provider}
                        </div>
                      {/if}
                      {#if pathway.authLevel}
                        <div class="pathway-auth">
                          <span class="material-symbols-rounded">verified_user</span>
                          {pathway.authLevel}
                        </div>
                      {/if}
                      {#if pathway.regions?.length}
                        <div class="pathway-regions">
                          {#each pathway.regions as region}
                            <span class="region-tag">{region}</span>
                          {/each}
                        </div>
                      {/if}
                      {#if pathway.notes}
                        <p class="pathway-notes">{pathway.notes}</p>
                      {/if}
                    </div>
                  {/each}
                </div>
              </section>
            {/if}
          {:else}
            <div class="empty-state">
              <span class="material-symbols-rounded">verified_user</span>
              <h3>No compliance data</h3>
              <p>Compliance information hasn't been extracted yet.</p>
            </div>
          {/if}
        </div>

      {:else if activeTab === 'company'}
        {@const companyData = latestExtractions().company?.data}
        <div class="extraction-view">
          {#if companyData}
            <div class="extraction-header">
              <h2>Company Information</h2>
              <span class="extraction-date">
                <span class="material-symbols-rounded">schedule</span>
                Updated {formatDate(latestExtractions().company.extractedAt)}
              </span>
            </div>

            <div class="company-grid">
              <div class="company-basics">
                {#if companyData.name}
                  <div class="company-field">
                    <span class="field-label">Company Name</span>
                    <span class="field-value">{companyData.name}</span>
                  </div>
                {/if}
                {#if companyData.legalName && companyData.legalName !== companyData.name}
                  <div class="company-field">
                    <span class="field-label">Legal Name</span>
                    <span class="field-value">{companyData.legalName}</span>
                  </div>
                {/if}
                {#if companyData.founded}
                  <div class="company-field">
                    <span class="field-label">Founded</span>
                    <span class="field-value">{companyData.founded}</span>
                  </div>
                {/if}
                {#if companyData.headquarters}
                  <div class="company-field">
                    <span class="field-label">Headquarters</span>
                    <span class="field-value">{companyData.headquarters}</span>
                  </div>
                {/if}
                {#if companyData.employeeCount}
                  <div class="company-field">
                    <span class="field-label">Employees</span>
                    <span class="field-value">{companyData.employeeCount}</span>
                  </div>
                {/if}
              </div>

              {#if companyData.funding}
                <div class="company-funding">
                  <h3>Funding</h3>
                  {#if companyData.funding.totalRaised}
                    <div class="funding-total">
                      <span class="funding-amount">{companyData.funding.totalRaised}</span>
                      <span class="funding-label">Total Raised</span>
                    </div>
                  {/if}
                  {#if companyData.funding.lastRound}
                    <div class="funding-round">
                      <span class="round-type">{companyData.funding.lastRound}</span>
                      {#if companyData.funding.lastRoundAmount}
                        <span class="round-amount">{companyData.funding.lastRoundAmount}</span>
                      {/if}
                      {#if companyData.funding.lastRoundDate}
                        <span class="round-date">{companyData.funding.lastRoundDate}</span>
                      {/if}
                    </div>
                  {/if}
                  {#if companyData.funding.investors?.length}
                    <div class="investors">
                      <span class="investors-label">Investors:</span>
                      <span class="investors-list">{companyData.funding.investors.join(', ')}</span>
                    </div>
                  {/if}
                </div>
              {/if}

              {#if companyData.leadership?.length}
                <div class="company-leadership">
                  <h3>Leadership</h3>
                  <div class="leadership-grid">
                    {#each companyData.leadership as leader}
                      <div class="leader-card">
                        <span class="leader-name">{leader.name}</span>
                        <span class="leader-role">{leader.role}</span>
                        {#if leader.linkedIn}
                          <a href={leader.linkedIn} target="_blank" rel="noopener" class="leader-link">
                            <span class="material-symbols-rounded">open_in_new</span>
                          </a>
                        {/if}
                      </div>
                    {/each}
                  </div>
                </div>
              {/if}
            </div>
          {:else}
            <div class="empty-state">
              <span class="material-symbols-rounded">business</span>
              <h3>No company data</h3>
              <p>Company information hasn't been extracted yet.</p>
            </div>
          {/if}
        </div>
      {/if}
    </main>
  {/if}

  <!-- Evidence Modal -->
  {#if evidenceModalOpen && selectedEvidence}
    <div class="evidence-modal-overlay" onclick={closeEvidenceModal}>
      <div class="evidence-modal" onclick={(e) => e.stopPropagation()}>
        <button class="modal-close" onclick={closeEvidenceModal}>
          <span class="material-symbols-rounded">close</span>
        </button>
        <div class="modal-content">
          <img src={selectedEvidence.path} alt="Evidence screenshot" />
        </div>
        {#if selectedEvidence.description}
          <div class="modal-caption">
            <span class="material-symbols-rounded">info</span>
            {selectedEvidence.description}
          </div>
        {/if}
      </div>
    </div>
  {/if}
</div>

<style>
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200');

  /* Base */
  .entity-page {
    min-height: 100vh;
    background: #f8f8f6;
    font-family: 'DM Sans', system-ui, -apple-system, sans-serif;
  }

  .material-symbols-rounded {
    font-family: 'Material Symbols Rounded';
    font-weight: normal;
    font-style: normal;
    font-size: 20px;
    line-height: 1;
    letter-spacing: normal;
    text-transform: none;
    display: inline-block;
    white-space: nowrap;
    word-wrap: normal;
    direction: ltr;
    -webkit-font-feature-settings: 'liga';
    font-feature-settings: 'liga';
    -webkit-font-smoothing: antialiased;
  }

  /* Loading State */
  .loading-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 60vh;
    gap: 20px;
  }

  .loading-pulse {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: linear-gradient(135deg, #059669 0%, #10b981 100%);
    animation: pulse 1.5s ease-in-out infinite;
  }

  @keyframes pulse {
    0%, 100% { transform: scale(0.9); opacity: 0.7; }
    50% { transform: scale(1.1); opacity: 1; }
  }

  .loading-container p {
    color: #6b7280;
    font-size: 14px;
  }

  /* Error State */
  .error-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 60vh;
    gap: 16px;
    text-align: center;
    padding: 40px;
  }

  .error-icon {
    font-size: 56px !important;
    color: #dc2626;
    opacity: 0.8;
  }

  .error-container h3 {
    margin: 0;
    font-size: 20px;
    font-weight: 600;
    color: #1f2937;
  }

  .error-container p {
    margin: 0;
    color: #6b7280;
    font-size: 14px;
    max-width: 400px;
  }

  .retry-button {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 12px 24px;
    background: #059669;
    color: white;
    border: none;
    border-radius: 10px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .retry-button:hover {
    background: #047857;
    transform: translateY(-1px);
  }

  /* Header */
  .entity-header {
    background: white;
    border-bottom: 1px solid #e5e7eb;
    padding: 0 0 32px 0;
  }

  .header-nav {
    padding: 16px 32px;
    border-bottom: 1px solid #f3f4f6;
  }

  .back-button {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 8px 16px;
    background: transparent;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    color: #374151;
    font-size: 13px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.15s ease;
  }

  .back-button:hover {
    background: #f9fafb;
    border-color: #d1d5db;
  }

  .back-button .material-symbols-rounded {
    font-size: 18px;
  }

  .header-main {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 48px;
    padding: 32px 32px 0;
    max-width: 1400px;
    margin: 0 auto;
  }

  .entity-identity {
    display: flex;
    gap: 24px;
    flex: 1;
  }

  .entity-logo {
    width: 80px;
    height: 80px;
    border-radius: 16px;
    background: white;
    border: 1px solid #e5e7eb;
    overflow: hidden;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 12px;
  }

  .entity-logo img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  .entity-logo-placeholder {
    background: linear-gradient(135deg, #059669 0%, #10b981 100%);
  }

  .entity-logo-placeholder .material-symbols-rounded {
    font-size: 36px;
    color: white;
  }

  .entity-info {
    flex: 1;
    min-width: 0;
  }

  .entity-meta {
    display: flex;
    gap: 8px;
    margin-bottom: 8px;
  }

  .entity-type {
    display: inline-block;
    padding: 4px 10px;
    background: #059669;
    color: white;
    font-size: 10px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    border-radius: 4px;
  }

  .entity-category {
    display: inline-block;
    padding: 4px 10px;
    background: #f3f4f6;
    color: #6b7280;
    font-size: 10px;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    border-radius: 4px;
  }

  .entity-name {
    margin: 0 0 8px 0;
    font-size: 32px;
    font-weight: 700;
    color: #111827;
    letter-spacing: -0.5px;
    line-height: 1.2;
  }

  .entity-description {
    margin: 0 0 12px 0;
    font-size: 15px;
    color: #6b7280;
    line-height: 1.5;
    max-width: 600px;
  }

  .entity-url {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    color: #0284c7;
    font-size: 13px;
    text-decoration: none;
    transition: color 0.15s ease;
  }

  .entity-url:hover {
    color: #0369a1;
  }

  .entity-url .material-symbols-rounded {
    font-size: 16px;
  }

  /* Header Stats */
  .header-stats {
    display: flex;
    align-items: flex-start;
    gap: 24px;
    flex-shrink: 0;
  }

  .stat-card-primary {
    text-align: center;
  }

  .stat-ring {
    position: relative;
    width: 100px;
    height: 100px;
  }

  .stat-ring-svg {
    transform: rotate(-90deg);
  }

  .stat-ring-bg {
    fill: none;
    stroke: #e5e7eb;
    stroke-width: 3;
  }

  .stat-ring-fill {
    fill: none;
    stroke: #059669;
    stroke-width: 3;
    stroke-linecap: round;
    transition: stroke-dasharray 0.6s ease;
  }

  .stat-ring-value {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 22px;
    font-weight: 700;
    color: #059669;
  }

  .stat-label {
    margin-top: 8px;
    font-size: 12px;
    font-weight: 500;
    color: #6b7280;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .stats-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }

  .stat-mini {
    padding: 12px 16px;
    background: #f9fafb;
    border-radius: 10px;
    text-align: center;
  }

  .stat-mini-value {
    display: block;
    font-size: 20px;
    font-weight: 700;
    color: #111827;
    line-height: 1;
  }

  .stat-mini-label {
    display: block;
    margin-top: 4px;
    font-size: 10px;
    font-weight: 500;
    color: #9ca3af;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .stat-mini-success .stat-mini-value { color: #059669; }
  .stat-mini-warning .stat-mini-value { color: #d97706; }
  .stat-mini-error .stat-mini-value { color: #dc2626; }

  /* Tab Navigation */
  .tab-nav {
    background: white;
    border-bottom: 1px solid #e5e7eb;
    position: sticky;
    top: 0;
    z-index: 50;
  }

  .tab-list {
    display: flex;
    gap: 4px;
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 32px;
    overflow-x: auto;
  }

  .tab-button {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 16px 20px;
    background: transparent;
    border: none;
    border-bottom: 2px solid transparent;
    color: #6b7280;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.15s ease;
    white-space: nowrap;
  }

  .tab-button:hover {
    color: #374151;
    background: #f9fafb;
  }

  .tab-button.active {
    color: #059669;
    border-bottom-color: #059669;
  }

  .tab-button .material-symbols-rounded {
    font-size: 20px;
  }

  .tab-count {
    padding: 2px 8px;
    background: #f3f4f6;
    border-radius: 10px;
    font-size: 11px;
    font-weight: 600;
  }

  .tab-button.active .tab-count {
    background: #d1fae5;
    color: #059669;
  }

  .tab-indicator {
    width: 6px;
    height: 6px;
    background: #059669;
    border-radius: 50%;
  }

  /* Tab Content */
  .tab-content {
    max-width: 1400px;
    margin: 0 auto;
    padding: 32px;
  }

  /* Overview Grid */
  .overview-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;
  }

  .overview-card {
    background: white;
    border-radius: 16px;
    padding: 24px;
    border: 1px solid #e5e7eb;
  }

  .overview-card h3 {
    display: flex;
    align-items: center;
    gap: 10px;
    margin: 0 0 20px 0;
    font-size: 14px;
    font-weight: 600;
    color: #374151;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .overview-card h3 .material-symbols-rounded {
    font-size: 20px;
    color: #9ca3af;
  }

  /* Research Summary */
  .summary-content {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }

  .summary-stat {
    padding: 16px;
    background: #f9fafb;
    border-radius: 10px;
  }

  .summary-stat-label {
    display: block;
    font-size: 11px;
    font-weight: 500;
    color: #9ca3af;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-bottom: 4px;
  }

  .summary-stat-value {
    font-size: 24px;
    font-weight: 700;
    color: #111827;
  }

  .summary-stat-value.accent {
    color: #059669;
  }

  /* Coverage Grid */
  .coverage-grid {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .coverage-item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 12px 16px;
    background: #f9fafb;
    border-radius: 8px;
    color: #9ca3af;
  }

  .coverage-item.has-data {
    background: #f0fdf4;
    color: #059669;
  }

  .coverage-item .material-symbols-rounded {
    font-size: 20px;
  }

  .coverage-label {
    flex: 1;
    font-size: 13px;
    font-weight: 500;
    text-transform: capitalize;
  }

  .coverage-date {
    font-size: 11px;
    color: #6b7280;
  }

  /* Category Bars */
  .category-bars {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .category-bar-item {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .category-bar-header {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .category-bar-icon {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .category-bar-icon .material-symbols-rounded {
    font-size: 18px;
  }

  .category-bar-name {
    flex: 1;
    font-size: 13px;
    font-weight: 500;
    color: #374151;
    text-transform: capitalize;
  }

  .category-bar-count {
    font-size: 13px;
    font-weight: 600;
    color: #6b7280;
  }

  .category-bar-track {
    position: relative;
    height: 6px;
    background: #f3f4f6;
    border-radius: 3px;
    overflow: hidden;
  }

  .category-bar-fill {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    border-radius: 3px;
    transition: width 0.4s ease;
  }

  .category-bar-validated {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    border-radius: 3px;
  }

  /* Recent Assertions */
  .assertion-preview-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .assertion-preview {
    padding: 16px;
    background: #f9fafb;
    border-radius: 10px;
    border-left: 3px solid #e5e7eb;
  }

  .assertion-preview-header {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 8px;
  }

  .assertion-preview-category {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 11px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .assertion-preview-category .material-symbols-rounded {
    font-size: 14px;
  }

  .assertion-preview-status {
    padding: 3px 8px;
    font-size: 10px;
    font-weight: 600;
    border-radius: 4px;
  }

  .assertion-preview-claim {
    margin: 0;
    font-size: 13px;
    color: #374151;
    line-height: 1.5;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .view-all-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    width: 100%;
    margin-top: 16px;
    padding: 12px;
    background: transparent;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    color: #374151;
    font-size: 13px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.15s ease;
  }

  .view-all-btn:hover {
    background: #f9fafb;
    border-color: #d1d5db;
  }

  .view-all-btn .material-symbols-rounded {
    font-size: 18px;
  }

  /* Assertions View */
  .assertions-view {
    display: flex;
    flex-direction: column;
    gap: 32px;
  }

  .assertion-category-section {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .category-header {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .category-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 10px;
  }

  .category-icon .material-symbols-rounded {
    font-size: 22px;
  }

  .category-header h3 {
    margin: 0;
    font-size: 18px;
    font-weight: 600;
    color: #111827;
    text-transform: capitalize;
  }

  .category-count {
    padding: 4px 12px;
    background: #f3f4f6;
    border-radius: 12px;
    font-size: 12px;
    font-weight: 500;
    color: #6b7280;
  }

  .assertions-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .assertion-card {
    background: white;
    border-radius: 12px;
    border: 1px solid #e5e7eb;
    border-left: 4px solid #e5e7eb;
    overflow: hidden;
    transition: all 0.2s ease;
  }

  .assertion-card:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  }

  .assertion-main {
    position: relative;
    padding: 20px 24px;
    cursor: pointer;
  }

  .assertion-badges {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 12px;
  }

  .assertion-status {
    padding: 4px 10px;
    font-size: 10px;
    font-weight: 600;
    border-radius: 4px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .assertion-criticality {
    padding: 4px 10px;
    font-size: 10px;
    font-weight: 600;
    border-radius: 4px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    border: 1px solid;
  }

  .assertion-confidence {
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 4px 10px;
    background: #f3f4f6;
    border-radius: 4px;
    font-size: 11px;
    font-weight: 500;
    color: #6b7280;
  }

  .assertion-confidence .material-symbols-rounded {
    font-size: 14px;
  }

  .assertion-claim {
    margin: 0 0 12px 0;
    font-size: 15px;
    color: #1f2937;
    line-height: 1.6;
    padding-right: 40px;
  }

  .assertion-meta {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
  }

  .meta-item {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 12px;
    color: #9ca3af;
  }

  .meta-item .material-symbols-rounded {
    font-size: 16px;
  }

  .meta-item.has-evidence {
    color: #059669;
  }

  .expand-toggle {
    position: absolute;
    top: 20px;
    right: 20px;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #f3f4f6;
    border: none;
    border-radius: 8px;
    color: #6b7280;
    cursor: pointer;
    transition: all 0.15s ease;
  }

  .expand-toggle:hover {
    background: #e5e7eb;
    color: #374151;
  }

  /* Assertion Details */
  .assertion-details {
    padding: 0 24px 24px;
    border-top: 1px solid #f3f4f6;
    background: #fafafa;
  }

  .detail-section {
    padding: 20px 0;
    border-bottom: 1px solid #f3f4f6;
  }

  .detail-section:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }

  .detail-section h4 {
    display: flex;
    align-items: center;
    gap: 8px;
    margin: 0 0 12px 0;
    font-size: 12px;
    font-weight: 600;
    color: #6b7280;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .detail-section h4 .material-symbols-rounded {
    font-size: 18px;
  }

  .detail-section p {
    margin: 0;
    font-size: 14px;
    color: #374151;
    line-height: 1.6;
  }

  .evidence-thumbnail {
    position: relative;
    display: block;
    max-width: 300px;
    border-radius: 8px;
    overflow: hidden;
    border: 1px solid #e5e7eb;
    cursor: pointer;
    background: none;
    padding: 0;
  }

  .evidence-thumbnail img {
    display: block;
    width: 100%;
    height: auto;
  }

  .thumbnail-overlay {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.4);
    opacity: 0;
    transition: opacity 0.2s ease;
  }

  .thumbnail-overlay .material-symbols-rounded {
    font-size: 32px;
    color: white;
  }

  .evidence-thumbnail:hover .thumbnail-overlay {
    opacity: 1;
  }

  .reasoning-content {
    padding: 12px 16px;
    background: white;
    border-radius: 8px;
    border-left: 3px solid #059669;
    font-style: italic;
  }

  .sources-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .source-item {
    padding: 12px 16px;
    background: white;
    border-radius: 8px;
    border: 1px solid #e5e7eb;
  }

  .source-link {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    color: #0284c7;
    font-size: 13px;
    font-weight: 500;
    text-decoration: none;
  }

  .source-link:hover {
    color: #0369a1;
    text-decoration: underline;
  }

  .source-link .material-symbols-rounded {
    font-size: 16px;
  }

  .source-title {
    word-break: break-all;
  }

  .source-grade {
    display: inline-block;
    margin-left: 12px;
    padding: 2px 8px;
    background: #f3f4f6;
    border-radius: 4px;
    font-size: 10px;
    font-weight: 500;
    color: #6b7280;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .source-quote {
    margin: 10px 0 0 0;
    padding: 12px 16px;
    background: #f9fafb;
    border-radius: 6px;
    font-size: 13px;
    font-style: italic;
    color: #6b7280;
    border-left: 3px solid #d1d5db;
  }

  /* Empty State */
  .empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 80px 40px;
    text-align: center;
  }

  .empty-state .material-symbols-rounded {
    font-size: 64px;
    color: #d1d5db;
    margin-bottom: 16px;
  }

  .empty-state h3 {
    margin: 0 0 8px 0;
    font-size: 18px;
    font-weight: 600;
    color: #374151;
  }

  .empty-state p {
    margin: 0;
    font-size: 14px;
    color: #9ca3af;
  }

  /* Extraction Views */
  .extraction-view {
    display: flex;
    flex-direction: column;
    gap: 32px;
  }

  .extraction-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .extraction-header h2 {
    margin: 0;
    font-size: 24px;
    font-weight: 700;
    color: #111827;
  }

  .extraction-date {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 13px;
    color: #9ca3af;
  }

  .extraction-date .material-symbols-rounded {
    font-size: 18px;
  }

  /* Pricing Grid */
  .pricing-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 24px;
  }

  .pricing-card {
    position: relative;
    background: white;
    border-radius: 16px;
    padding: 32px 24px;
    border: 1px solid #e5e7eb;
    transition: all 0.2s ease;
  }

  .pricing-card.featured {
    border-color: #059669;
    box-shadow: 0 8px 32px rgba(5, 150, 105, 0.12);
  }

  .pricing-badge {
    position: absolute;
    top: -12px;
    left: 50%;
    transform: translateX(-50%);
    padding: 6px 16px;
    background: #059669;
    color: white;
    font-size: 11px;
    font-weight: 600;
    border-radius: 20px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .pricing-name {
    margin: 0 0 16px 0;
    font-size: 20px;
    font-weight: 600;
    color: #111827;
    text-align: center;
  }

  .pricing-price {
    text-align: center;
    margin-bottom: 24px;
    padding-bottom: 24px;
    border-bottom: 1px solid #f3f4f6;
  }

  .price-amount {
    display: block;
    font-size: 36px;
    font-weight: 700;
    color: #111827;
    line-height: 1;
  }

  .price-unit {
    display: block;
    margin-top: 4px;
    font-size: 13px;
    color: #9ca3af;
  }

  .pricing-features {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .pricing-features li {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    font-size: 14px;
    color: #374151;
    line-height: 1.4;
  }

  .pricing-features .material-symbols-rounded {
    font-size: 18px;
    color: #059669;
    flex-shrink: 0;
    margin-top: 2px;
  }

  .pricing-limits {
    margin-top: 20px;
    padding-top: 20px;
    border-top: 1px solid #f3f4f6;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .limit-item {
    display: flex;
    justify-content: space-between;
    font-size: 13px;
  }

  .limit-key {
    color: #6b7280;
  }

  .limit-value {
    font-weight: 500;
    color: #374151;
  }

  .pricing-meta {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
  }

  .meta-tag {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 8px 16px;
    background: #f3f4f6;
    border-radius: 8px;
    font-size: 13px;
    font-weight: 500;
    color: #6b7280;
  }

  .meta-tag.success {
    background: #d1fae5;
    color: #059669;
  }

  .meta-tag .material-symbols-rounded {
    font-size: 18px;
  }

  /* Features View */
  .features-highlights {
    margin-bottom: 32px;
  }

  .features-highlights h3 {
    margin: 0 0 16px 0;
    font-size: 16px;
    font-weight: 600;
    color: #374151;
  }

  .highlights-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
  }

  .highlight-card {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 14px 20px;
    background: linear-gradient(135deg, #fef9c3 0%, #fef3c7 100%);
    border-radius: 10px;
    font-size: 14px;
    font-weight: 500;
    color: #92400e;
  }

  .highlight-card .material-symbols-rounded {
    font-size: 20px;
    color: #f59e0b;
  }

  .features-categories {
    display: flex;
    flex-direction: column;
    gap: 32px;
  }

  .feature-category h3 {
    margin: 0 0 16px 0;
    font-size: 18px;
    font-weight: 600;
    color: #111827;
  }

  .feature-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .feature-item {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    padding: 14px 18px;
    background: white;
    border-radius: 10px;
    border: 1px solid #e5e7eb;
  }

  .feature-item .material-symbols-rounded {
    font-size: 20px;
    color: #059669;
    flex-shrink: 0;
    margin-top: 1px;
  }

  .feature-content {
    flex: 1;
    min-width: 0;
  }

  .feature-name {
    display: block;
    font-size: 14px;
    font-weight: 500;
    color: #111827;
  }

  .feature-desc {
    display: block;
    margin-top: 4px;
    font-size: 13px;
    color: #6b7280;
    line-height: 1.4;
  }

  .feature-availability {
    flex-shrink: 0;
    padding: 4px 10px;
    background: #f3f4f6;
    border-radius: 4px;
    font-size: 11px;
    font-weight: 500;
    color: #6b7280;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .feature-new {
    flex-shrink: 0;
    padding: 4px 10px;
    background: #dbeafe;
    border-radius: 4px;
    font-size: 10px;
    font-weight: 600;
    color: #1d4ed8;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  /* Compliance View */
  .compliance-section {
    margin-bottom: 32px;
  }

  .compliance-section h3 {
    margin: 0 0 16px 0;
    font-size: 16px;
    font-weight: 600;
    color: #374151;
  }

  .certifications-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 16px;
  }

  .certification-card {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 18px 20px;
    background: white;
    border-radius: 12px;
    border: 1px solid #e5e7eb;
  }

  .certification-card.certified {
    border-color: #059669;
    background: #f0fdf4;
  }

  .cert-icon {
    font-size: 28px !important;
    color: #9ca3af;
  }

  .certification-card.certified .cert-icon {
    color: #059669;
  }

  .cert-info {
    flex: 1;
    min-width: 0;
  }

  .cert-name {
    display: block;
    font-size: 14px;
    font-weight: 600;
    color: #111827;
  }

  .cert-status {
    display: block;
    margin-top: 2px;
    font-size: 12px;
    color: #6b7280;
    text-transform: capitalize;
  }

  .cert-valid {
    display: block;
    margin-top: 4px;
    font-size: 11px;
    color: #9ca3af;
  }

  .compliance-flags {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    margin-bottom: 32px;
  }

  .compliance-flag {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 10px 18px;
    background: #f3f4f6;
    border-radius: 10px;
    font-size: 14px;
    font-weight: 500;
    color: #6b7280;
  }

  .compliance-flag.success {
    background: #d1fae5;
    color: #059669;
  }

  .compliance-flag .material-symbols-rounded {
    font-size: 20px;
  }

  .security-features-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 12px;
  }

  .security-features-list li {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 14px 18px;
    background: white;
    border-radius: 10px;
    border: 1px solid #e5e7eb;
    font-size: 14px;
    color: #374151;
  }

  .security-features-list .material-symbols-rounded {
    font-size: 20px;
    color: #0891b2;
  }

  .residency-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .residency-tag {
    padding: 8px 16px;
    background: #f3f4f6;
    border-radius: 8px;
    font-size: 13px;
    font-weight: 500;
    color: #374151;
  }

  /* Company View */
  .company-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: 24px;
  }

  .company-basics {
    background: white;
    border-radius: 16px;
    padding: 24px;
    border: 1px solid #e5e7eb;
  }

  .company-field {
    padding: 16px 0;
    border-bottom: 1px solid #f3f4f6;
  }

  .company-field:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }

  .field-label {
    display: block;
    font-size: 11px;
    font-weight: 500;
    color: #9ca3af;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-bottom: 4px;
  }

  .field-value {
    font-size: 16px;
    font-weight: 500;
    color: #111827;
  }

  .company-funding {
    background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
    border-radius: 16px;
    padding: 24px;
    border: 1px solid #bbf7d0;
  }

  .company-funding h3 {
    margin: 0 0 20px 0;
    font-size: 14px;
    font-weight: 600;
    color: #166534;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .funding-total {
    text-align: center;
    margin-bottom: 20px;
    padding-bottom: 20px;
    border-bottom: 1px solid #bbf7d0;
  }

  .funding-amount {
    display: block;
    font-size: 32px;
    font-weight: 700;
    color: #059669;
  }

  .funding-label {
    display: block;
    margin-top: 4px;
    font-size: 12px;
    color: #166534;
  }

  .funding-round {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    align-items: center;
    margin-bottom: 16px;
  }

  .round-type {
    padding: 6px 14px;
    background: white;
    border-radius: 6px;
    font-size: 13px;
    font-weight: 600;
    color: #059669;
  }

  .round-amount {
    font-size: 16px;
    font-weight: 600;
    color: #166534;
  }

  .round-date {
    font-size: 13px;
    color: #6b7280;
  }

  .investors {
    font-size: 13px;
  }

  .investors-label {
    font-weight: 500;
    color: #166534;
  }

  .investors-list {
    color: #374151;
  }

  .company-leadership {
    background: white;
    border-radius: 16px;
    padding: 24px;
    border: 1px solid #e5e7eb;
  }

  .company-leadership h3 {
    margin: 0 0 20px 0;
    font-size: 14px;
    font-weight: 600;
    color: #374151;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .leadership-grid {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .leader-card {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 14px 18px;
    background: #f9fafb;
    border-radius: 10px;
  }

  .leader-name {
    font-size: 14px;
    font-weight: 600;
    color: #111827;
  }

  .leader-role {
    flex: 1;
    font-size: 13px;
    color: #6b7280;
  }

  .leader-link {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    background: white;
    border-radius: 6px;
    color: #0284c7;
    text-decoration: none;
    transition: all 0.15s ease;
  }

  .leader-link:hover {
    background: #0284c7;
    color: white;
  }

  .leader-link .material-symbols-rounded {
    font-size: 18px;
  }

  /* Evidence Modal */
  .evidence-modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.75);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    padding: 40px;
    animation: fadeIn 0.2s ease;
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  .evidence-modal {
    position: relative;
    max-width: 90vw;
    max-height: 90vh;
    background: white;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 24px 64px rgba(0, 0, 0, 0.3);
    animation: slideUp 0.3s ease;
  }

  @keyframes slideUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .modal-close {
    position: absolute;
    top: 16px;
    right: 16px;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(255, 255, 255, 0.9);
    border: none;
    border-radius: 10px;
    color: #374151;
    cursor: pointer;
    z-index: 10;
    transition: all 0.15s ease;
  }

  .modal-close:hover {
    background: white;
    color: #111827;
  }

  .modal-content img {
    display: block;
    max-width: 100%;
    max-height: calc(90vh - 80px);
    object-fit: contain;
  }

  .modal-caption {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    padding: 16px 20px;
    background: #f9fafb;
    font-size: 14px;
    color: #374151;
    line-height: 1.5;
  }

  .modal-caption .material-symbols-rounded {
    font-size: 20px;
    color: #9ca3af;
    flex-shrink: 0;
    margin-top: 1px;
  }

  /* Responsive */
  @media (max-width: 1024px) {
    .header-main {
      flex-direction: column;
      gap: 32px;
    }

    .header-stats {
      width: 100%;
      justify-content: center;
    }

    .overview-grid {
      grid-template-columns: 1fr;
    }

    .tab-list {
      padding: 0 16px;
    }

    .tab-content {
      padding: 24px 16px;
    }
  }

  @media (max-width: 640px) {
    .entity-identity {
      flex-direction: column;
      text-align: center;
    }

    .entity-logo {
      margin: 0 auto;
    }

    .entity-meta {
      justify-content: center;
    }

    .entity-name {
      font-size: 24px;
    }

    .tab-button span:not(.material-symbols-rounded):not(.tab-count):not(.tab-indicator) {
      display: none;
    }

    .pricing-grid {
      grid-template-columns: 1fr;
    }
  }

  /* === NEW STYLES FOR ENHANCED DATA DISPLAY === */

  /* Logo SVG inline styles */
  .entity-logo-svg {
    position: relative;
  }

  .entity-logo-svg :global(svg) {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  .logo-verified {
    position: absolute;
    bottom: -4px;
    right: -4px;
    width: 20px;
    height: 20px;
    background: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .logo-verified .material-symbols-rounded {
    font-size: 16px;
    color: #059669;
  }

  /* Domain badge */
  .entity-domain {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 4px 10px;
    background: #dbeafe;
    color: #1d4ed8;
    font-size: 10px;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    border-radius: 4px;
  }

  .entity-domain .material-symbols-rounded {
    font-size: 12px;
  }

  /* Tab pillar indicator */
  .tab-pillar-indicator {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 18px;
    height: 18px;
    background: #fef3c7;
    border-radius: 50%;
  }

  .tab-pillar-indicator .material-symbols-rounded {
    font-size: 12px;
    color: #f59e0b;
  }

  /* Tab federal indicator */
  .tab-fed-indicator {
    padding: 2px 8px;
    font-size: 9px;
    font-weight: 700;
    border-radius: 4px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  /* Pillar summary in stats */
  .summary-stat-value.pillar {
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .pillar-star {
    font-size: 18px !important;
    color: #f59e0b;
  }

  /* Federal viability badge */
  .federal-viability-badge {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-top: 20px;
    padding: 16px 20px;
    border-radius: 12px;
    border: 2px solid;
  }

  .federal-viability-badge .material-symbols-rounded {
    font-size: 28px;
  }

  .fed-label {
    font-size: 12px;
    font-weight: 500;
    color: #6b7280;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .fed-level {
    font-size: 20px;
    font-weight: 700;
  }

  .fed-score {
    font-size: 14px;
    color: #6b7280;
  }

  /* Coverage stale indicator */
  .coverage-item.is-stale {
    background: #fef3c7;
    color: #92400e;
  }

  .coverage-date.stale {
    color: #92400e;
  }

  .stale-badge {
    margin-left: 4px;
    padding: 1px 6px;
    background: #fcd34d;
    border-radius: 3px;
    font-size: 9px;
    font-weight: 600;
    text-transform: uppercase;
  }

  /* Assertion pillar styles */
  .assertion-card.is-pillar {
    border-left-width: 4px;
    background: linear-gradient(90deg, #fef9c3 0%, white 20%);
  }

  .assertion-pillar {
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 4px 10px;
    background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
    color: #92400e;
    font-size: 10px;
    font-weight: 600;
    border-radius: 4px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .assertion-pillar .material-symbols-rounded {
    font-size: 14px;
    color: #f59e0b;
  }

  .assertion-partial {
    padding: 4px 10px;
    background: #fef3c7;
    color: #92400e;
    font-size: 10px;
    font-weight: 600;
    border-radius: 4px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  /* Claim prefix styles */
  .claim-prefix-badge {
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 4px 10px;
    font-size: 10px;
    font-weight: 600;
    border-radius: 4px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .claim-prefix-badge .material-symbols-rounded {
    font-size: 14px;
  }

  .claim-prefix {
    font-weight: 600;
  }

  /* Validated by meta */
  .meta-item.validated-by {
    color: #059669;
  }

  /* Evidence chain gallery */
  .evidence-chain-gallery {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    gap: 16px;
  }

  .evidence-chain-item {
    position: relative;
    border-radius: 10px;
    overflow: hidden;
    border: 1px solid #e5e7eb;
    cursor: pointer;
    background: none;
    padding: 0;
    transition: all 0.2s ease;
  }

  .evidence-chain-item:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  .evidence-chain-item img {
    display: block;
    width: 100%;
    height: 120px;
    object-fit: cover;
  }

  .evidence-chain-caption {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 12px;
    background: #f9fafb;
  }

  .evidence-chain-num {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    background: #059669;
    color: white;
    border-radius: 50%;
    font-size: 12px;
    font-weight: 600;
    flex-shrink: 0;
  }

  .evidence-chain-desc {
    font-size: 12px;
    color: #374151;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  /* Pillar context section */
  .detail-section.pillar-context {
    background: linear-gradient(90deg, #fef9c3 0%, #fafafa 100%);
    margin: 0 -24px;
    padding: 20px 24px;
    border-left: 4px solid #f59e0b;
  }

  .conclusion-context-text {
    font-weight: 500;
    color: #78350f;
  }

  /* Human response styles */
  .human-response {
    padding: 16px;
    background: white;
    border-radius: 8px;
    border-left: 3px solid #0891b2;
    font-style: italic;
  }

  .validation-meta {
    display: flex;
    align-items: center;
    gap: 6px;
    margin-top: 12px;
    font-size: 12px;
    color: #059669;
  }

  .validation-meta .material-symbols-rounded {
    font-size: 16px;
  }

  /* Enhanced source styles */
  .source-header {
    display: flex;
    align-items: center;
    gap: 10px;
    flex-wrap: wrap;
  }

  .source-type-badge {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 11px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .source-type-badge .material-symbols-rounded {
    font-size: 14px;
  }

  .source-item.url-broken {
    border-color: #fca5a5;
    background: #fef2f2;
  }

  .url-status-badge.broken {
    display: flex;
    align-items: center;
    padding: 2px 6px;
    background: #fee2e2;
    border-radius: 4px;
    color: #dc2626;
  }

  .url-status-badge .material-symbols-rounded {
    font-size: 14px;
  }

  .source-meta-row {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-top: 8px;
    flex-wrap: wrap;
  }

  .source-grade {
    padding: 3px 8px;
    font-size: 10px;
    font-weight: 600;
    border-radius: 4px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .source-added-by {
    font-size: 11px;
    color: #9ca3af;
  }

  .source-status {
    padding: 2px 8px;
    font-size: 10px;
    font-weight: 600;
    border-radius: 4px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    background: #f3f4f6;
    color: #6b7280;
  }

  .source-status.validated {
    background: #d1fae5;
    color: #059669;
  }

  .source-status.rejected {
    background: #fee2e2;
    color: #dc2626;
  }

  .source-annotation {
    display: flex;
    align-items: flex-start;
    gap: 8px;
    margin-top: 10px;
    padding: 10px 14px;
    background: #fef3c7;
    border-radius: 6px;
    font-size: 13px;
    color: #92400e;
  }

  .source-annotation .material-symbols-rounded {
    font-size: 16px;
    flex-shrink: 0;
    margin-top: 1px;
  }

  /* Superseded notice */
  .superseded-notice {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 12px 16px;
    background: #fef3c7;
    border-radius: 8px;
    font-size: 13px;
    color: #92400e;
    border: none;
  }

  .superseded-notice .material-symbols-rounded {
    font-size: 20px;
  }

  /* === INTEGRATIONS TAB STYLES === */

  .integrations-summary {
    display: flex;
    align-items: center;
    gap: 20px;
    flex-wrap: wrap;
    margin-bottom: 32px;
  }

  .integration-stat {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 16px 24px;
    background: white;
    border-radius: 12px;
    border: 1px solid #e5e7eb;
  }

  .integration-stat .stat-number {
    font-size: 32px;
    font-weight: 700;
    color: #111827;
  }

  .integration-stat .stat-label {
    font-size: 12px;
    color: #6b7280;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .integration-badge {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 18px;
    background: #f3f4f6;
    border-radius: 10px;
    font-size: 14px;
    font-weight: 500;
    color: #6b7280;
  }

  .integration-badge.success {
    background: #d1fae5;
    color: #059669;
  }

  .integration-badge .material-symbols-rounded {
    font-size: 20px;
  }

  .sdk-languages {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
  }

  .sdk-label {
    font-size: 13px;
    font-weight: 500;
    color: #6b7280;
  }

  .sdk-tag {
    padding: 4px 12px;
    background: #dbeafe;
    color: #1d4ed8;
    font-size: 12px;
    font-weight: 500;
    border-radius: 6px;
  }

  .integrations-categories {
    display: flex;
    flex-direction: column;
    gap: 32px;
  }

  .integration-category h3 {
    display: flex;
    align-items: center;
    gap: 10px;
    margin: 0 0 16px 0;
    font-size: 18px;
    font-weight: 600;
    color: #111827;
  }

  .integration-category h3 .material-symbols-rounded {
    font-size: 22px;
    color: #7c3aed;
  }

  .integration-category .category-count {
    padding: 2px 10px;
    background: #f3f4f6;
    border-radius: 12px;
    font-size: 12px;
    font-weight: 500;
    color: #6b7280;
  }

  .integration-chips {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }

  .integration-chips.flat {
    margin-top: 24px;
  }

  .integration-chip {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 12px 18px;
    background: white;
    border-radius: 10px;
    border: 1px solid #e5e7eb;
    transition: all 0.15s ease;
  }

  .integration-chip:hover {
    border-color: #7c3aed;
    box-shadow: 0 2px 8px rgba(124, 58, 237, 0.1);
  }

  .integration-chip .material-symbols-rounded {
    font-size: 20px;
    color: #7c3aed;
  }

  .integration-logo {
    width: 20px;
    height: 20px;
    object-fit: contain;
  }

  .integration-name {
    font-size: 14px;
    font-weight: 500;
    color: #111827;
  }

  .integration-type {
    padding: 2px 8px;
    background: #f3f4f6;
    border-radius: 4px;
    font-size: 10px;
    font-weight: 500;
    color: #6b7280;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  /* === DIFFERENTIATORS TAB STYLES === */

  .differentiation-summary {
    display: flex;
    align-items: flex-start;
    gap: 14px;
    padding: 20px 24px;
    background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
    border-radius: 12px;
    margin-bottom: 32px;
  }

  .differentiation-summary .material-symbols-rounded {
    font-size: 24px;
    color: #0284c7;
    flex-shrink: 0;
    margin-top: 2px;
  }

  .differentiation-summary p {
    margin: 0;
    font-size: 15px;
    color: #0c4a6e;
    line-height: 1.5;
  }

  .competitors-section {
    margin-bottom: 32px;
  }

  .competitors-section h3 {
    margin: 0 0 12px 0;
    font-size: 14px;
    font-weight: 600;
    color: #374151;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .competitor-chips {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .competitor-chip {
    padding: 8px 16px;
    background: #f3f4f6;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 500;
    color: #374151;
  }

  .differentiators-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: 24px;
    margin-bottom: 32px;
  }

  .diff-section {
    background: white;
    border-radius: 16px;
    padding: 24px;
    border: 1px solid #e5e7eb;
  }

  .diff-section h3 {
    display: flex;
    align-items: center;
    gap: 10px;
    margin: 0 0 4px 0;
    font-size: 16px;
    font-weight: 600;
    color: #111827;
  }

  .diff-section h3 .material-symbols-rounded {
    font-size: 22px;
  }

  .diff-unique h3 .material-symbols-rounded { color: #7c3aed; }
  .diff-leading h3 .material-symbols-rounded { color: #059669; }
  .diff-lagging h3 .material-symbols-rounded { color: #f97316; }
  .diff-missing h3 .material-symbols-rounded { color: #dc2626; }

  .diff-section-desc {
    margin: 0 0 20px 0;
    font-size: 13px;
    color: #9ca3af;
  }

  .diff-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .diff-item {
    padding: 16px;
    background: #f9fafb;
    border-radius: 10px;
    border-left: 3px solid #e5e7eb;
  }

  .diff-item.unique { border-left-color: #7c3aed; background: #faf5ff; }
  .diff-item.leading { border-left-color: #059669; background: #f0fdf4; }
  .diff-item.lagging { border-left-color: #f97316; background: #fff7ed; }
  .diff-item.missing { border-left-color: #dc2626; background: #fef2f2; }
  .diff-item.missing.critical { border-left-color: #7f1d1d; background: #fee2e2; }

  .diff-header {
    display: flex;
    align-items: center;
    gap: 10px;
    flex-wrap: wrap;
  }

  .diff-name {
    font-size: 14px;
    font-weight: 600;
    color: #111827;
  }

  .importance-badge {
    padding: 2px 8px;
    background: #fef3c7;
    color: #92400e;
    font-size: 10px;
    font-weight: 600;
    border-radius: 4px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .importance-badge.critical {
    background: #fee2e2;
    color: #991b1b;
  }

  .diff-desc {
    margin: 8px 0 0 0;
    font-size: 13px;
    color: #6b7280;
    line-height: 1.4;
  }

  .diff-comparison {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin-top: 10px;
  }

  .comparison-tag {
    padding: 4px 10px;
    background: white;
    border-radius: 4px;
    font-size: 11px;
    color: #6b7280;
    border: 1px solid #e5e7eb;
  }

  .diff-competitors {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
    margin-top: 10px;
  }

  .competitors-label {
    font-size: 11px;
    color: #9ca3af;
  }

  .competitor-tag {
    padding: 3px 10px;
    background: white;
    border-radius: 4px;
    font-size: 11px;
    font-weight: 500;
    color: #374151;
    border: 1px solid #e5e7eb;
  }

  .table-stakes-section {
    background: white;
    border-radius: 16px;
    padding: 24px;
    border: 1px solid #e5e7eb;
  }

  .table-stakes-section h3 {
    display: flex;
    align-items: center;
    gap: 10px;
    margin: 0 0 4px 0;
    font-size: 16px;
    font-weight: 600;
    color: #6b7280;
  }

  .table-stakes-section h3 .material-symbols-rounded {
    font-size: 22px;
    color: #9ca3af;
  }

  .table-stakes-chips {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 16px;
  }

  .table-stake-chip {
    padding: 8px 14px;
    background: #f3f4f6;
    border-radius: 6px;
    font-size: 13px;
    color: #6b7280;
  }

  /* === FEDERAL PATHWAYS STYLES === */

  .federal-pathways h3 {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .federal-pathways h3 .material-symbols-rounded {
    font-size: 22px;
    color: #0284c7;
  }

  .federal-viability-card {
    display: flex;
    align-items: center;
    gap: 20px;
    padding: 20px 24px;
    border-radius: 12px;
    border: 2px solid;
    margin-bottom: 24px;
  }

  .fed-score-ring {
    position: relative;
    width: 80px;
    height: 80px;
    flex-shrink: 0;
  }

  .fed-ring-svg {
    transform: rotate(-90deg);
    width: 100%;
    height: 100%;
  }

  .fed-ring-bg {
    fill: none;
    stroke: rgba(0, 0, 0, 0.1);
    stroke-width: 4;
  }

  .fed-ring-fill {
    fill: none;
    stroke-width: 4;
    stroke-linecap: round;
    transition: stroke-dasharray 0.6s ease;
  }

  .fed-ring-value {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 18px;
    font-weight: 700;
  }

  .fed-viability-info {
    flex: 1;
  }

  .fed-viability-level {
    display: block;
    font-size: 24px;
    font-weight: 700;
    line-height: 1;
  }

  .fed-viability-label {
    display: block;
    margin-top: 4px;
    font-size: 12px;
    font-weight: 500;
    color: #6b7280;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .fed-viability-notes {
    margin: 10px 0 0 0;
    font-size: 13px;
    color: #374151;
    line-height: 1.4;
  }

  .pathways-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 16px;
  }

  .pathway-card {
    padding: 18px 20px;
    background: #f9fafb;
    border-radius: 12px;
    border: 1px solid #e5e7eb;
  }

  .pathway-card.available {
    background: #f0fdf4;
    border-color: #bbf7d0;
  }

  .pathway-card.in-progress {
    background: #fef9c3;
    border-color: #fde047;
  }

  .pathway-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 12px;
    margin-bottom: 12px;
  }

  .pathway-type {
    font-size: 14px;
    font-weight: 600;
    color: #111827;
    text-transform: capitalize;
  }

  .pathway-status {
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 3px 10px;
    border-radius: 12px;
    font-size: 11px;
    font-weight: 600;
    text-transform: capitalize;
    background: #f3f4f6;
    color: #6b7280;
  }

  .pathway-status.success {
    background: #d1fae5;
    color: #059669;
  }

  .pathway-status.warning {
    background: #fef3c7;
    color: #92400e;
  }

  .pathway-status .material-symbols-rounded {
    font-size: 14px;
  }

  .pathway-provider,
  .pathway-auth {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 8px;
    font-size: 13px;
    color: #374151;
  }

  .pathway-provider .material-symbols-rounded,
  .pathway-auth .material-symbols-rounded {
    font-size: 18px;
    color: #0284c7;
  }

  .pathway-regions {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin-bottom: 8px;
  }

  .region-tag {
    padding: 3px 10px;
    background: white;
    border-radius: 4px;
    font-size: 11px;
    font-weight: 500;
    color: #0369a1;
    border: 1px solid #bae6fd;
  }

  .pathway-notes {
    margin: 8px 0 0 0;
    font-size: 12px;
    color: #6b7280;
    font-style: italic;
  }
</style>
