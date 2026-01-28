<script>
  import { onMount } from 'svelte';

  let topic = $state('');
  let researcher = $state('');

  const templates = [
    { label: 'AI Code Assistants', value: 'AI code assistants for enterprise federal environments' },
    { label: 'DevOps Tools', value: 'DevOps and CI/CD tools for government cloud infrastructure' },
    { label: 'Security Platforms', value: 'Enterprise security platforms with FedRAMP compliance' },
    { label: 'Compliance Solutions', value: 'Compliance and governance solutions for federal agencies' }
  ];

  // Load researcher name from localStorage on init
  onMount(() => {
    const savedResearcher = localStorage.getItem('researcher');
    if (savedResearcher) {
      researcher = savedResearcher;
    }
  });

  function selectTemplate(template) {
    topic = template.value;
  }

  function beginResearch() {
    if (!topic.trim()) {
      alert('Please enter a research topic');
      return;
    }

    if (!researcher.trim()) {
      alert('Please enter your name');
      return;
    }

    // Save researcher name to localStorage
    localStorage.setItem('researcher', researcher);

    // Navigate to research page using hash-based routing
    const params = new URLSearchParams({
      topic: topic.trim(),
      researcher: researcher.trim()
    });
    window.location.hash = `/research?${params.toString()}`;
  }

  function handleKeydown(e) {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      beginResearch();
    }
  }
</script>

<div class="landing-page">
  <div class="container">
    <!-- Hero Section -->
    <div class="hero">
      <div class="hero-icon">🔬</div>
      <h1 class="hero-title">Deep Research</h1>
      <p class="hero-tagline">
        AI-powered research orchestration for systematic entity discovery,
        claim validation, and evidence collection
      </p>
    </div>

    <!-- Main Form -->
    <div class="form-card">
      <!-- Research Topic Input -->
      <div class="form-group">
        <label for="topic" class="form-label">Research Topic</label>
        <textarea
          id="topic"
          bind:value={topic}
          onkeydown={handleKeydown}
          placeholder="e.g., AI code assistants for enterprise federal environments"
          rows="4"
          class="form-textarea"
        ></textarea>
        <p class="form-hint">Describe what you want to research. Press Cmd/Ctrl+Enter to begin.</p>
      </div>

      <!-- Quick Start Templates -->
      <div class="form-group">
        <label class="form-label">Quick Start Templates</label>
        <div class="template-chips">
          {#each templates as template}
            <button
              type="button"
              class="chip"
              class:active={topic === template.value}
              onclick={() => selectTemplate(template)}
            >
              {template.label}
            </button>
          {/each}
        </div>
      </div>

      <!-- Researcher Name -->
      <div class="form-group">
        <label for="researcher" class="form-label">Your Name</label>
        <input
          id="researcher"
          type="text"
          bind:value={researcher}
          onkeydown={handleKeydown}
          placeholder="e.g., Jane Doe"
          class="form-input"
        />
        <p class="form-hint">Used for tracking validation and research attribution</p>
      </div>

      <!-- CTA Button -->
      <button
        type="button"
        class="cta-button"
        onclick={beginResearch}
        disabled={!topic.trim() || !researcher.trim()}
      >
        Begin Research
        <span class="cta-arrow">→</span>
      </button>
    </div>

    <!-- Features -->
    <div class="features">
      <div class="feature">
        <div class="feature-icon">🎯</div>
        <h3>Entity Discovery</h3>
        <p>Systematically identify and catalog entities matching your research criteria</p>
      </div>
      <div class="feature">
        <div class="feature-icon">✓</div>
        <h3>Claim Validation</h3>
        <p>Track assertions through validation states from claims to evidence</p>
      </div>
      <div class="feature">
        <div class="feature-icon">📊</div>
        <h3>Evidence Collection</h3>
        <p>Capture screenshots, structured data, and source references</p>
      </div>
    </div>

    <!-- Navigation Links -->
    <div class="nav-links">
      <a href="#/discovery" class="nav-link">
        <span class="nav-icon">📡</span>
        <div class="nav-content">
          <span class="nav-title">Discovery Control Tower</span>
          <span class="nav-desc">Monitor sources, crawl data, detect trends</span>
        </div>
        <span class="nav-arrow">→</span>
      </a>
      <a href="#/validate" class="nav-link">
        <span class="nav-icon">✅</span>
        <div class="nav-content">
          <span class="nav-title">Validation Dashboard</span>
          <span class="nav-desc">Review and validate assertions</span>
        </div>
        <span class="nav-arrow">→</span>
      </a>
      <a href="#/grove" class="nav-link grove-link">
        <span class="nav-icon">🌳</span>
        <div class="nav-content">
          <span class="nav-title">Research Grove</span>
          <span class="nav-desc">Explore entity knowledge graph visualization</span>
        </div>
        <span class="nav-arrow">→</span>
      </a>
    </div>
  </div>
</div>

<style>
  .landing-page {
    min-height: 100vh;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    padding: 3rem 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .container {
    max-width: 800px;
    width: 100%;
    margin: 0 auto;
  }

  /* Hero Section */
  .hero {
    text-align: center;
    margin-bottom: 3rem;
    color: white;
  }

  .hero-icon {
    font-size: 4rem;
    margin-bottom: 1rem;
    filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.1));
  }

  .hero-title {
    font-size: 3.5rem;
    font-weight: 700;
    margin: 0 0 1rem 0;
    letter-spacing: -0.02em;
    text-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  .hero-tagline {
    font-size: 1.125rem;
    line-height: 1.6;
    opacity: 0.95;
    max-width: 600px;
    margin: 0 auto;
    font-weight: 400;
  }

  /* Form Card */
  .form-card {
    background: white;
    border-radius: 16px;
    padding: 2.5rem;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
    margin-bottom: 3rem;
  }

  .form-group {
    margin-bottom: 2rem;
  }

  .form-group:last-of-type {
    margin-bottom: 2.5rem;
  }

  .form-label {
    display: block;
    font-size: 0.875rem;
    font-weight: 600;
    color: #1f2937;
    margin-bottom: 0.5rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .form-textarea,
  .form-input {
    width: 100%;
    padding: 0.875rem 1rem;
    border: 2px solid #e5e7eb;
    border-radius: 8px;
    font-size: 1rem;
    font-family: inherit;
    transition: all 0.2s ease;
    background: white;
  }

  .form-textarea {
    resize: vertical;
    min-height: 120px;
    line-height: 1.5;
  }

  .form-textarea:focus,
  .form-input:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }

  .form-hint {
    font-size: 0.875rem;
    color: #6b7280;
    margin-top: 0.5rem;
    margin-bottom: 0;
  }

  /* Template Chips */
  .template-chips {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
  }

  .chip {
    padding: 0.625rem 1.25rem;
    background: #f3f4f6;
    border: 2px solid transparent;
    border-radius: 9999px;
    font-size: 0.875rem;
    font-weight: 500;
    color: #374151;
    cursor: pointer;
    transition: all 0.2s ease;
    white-space: nowrap;
  }

  .chip:hover {
    background: #e5e7eb;
    transform: translateY(-1px);
  }

  .chip.active {
    background: #ede9fe;
    border-color: #667eea;
    color: #667eea;
  }

  /* CTA Button */
  .cta-button {
    width: 100%;
    padding: 1rem 2rem;
    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
    color: white;
    border: none;
    border-radius: 10px;
    font-size: 1.125rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    box-shadow: 0 4px 14px rgba(16, 185, 129, 0.3);
  }

  .cta-button:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(16, 185, 129, 0.4);
  }

  .cta-button:active:not(:disabled) {
    transform: translateY(0);
  }

  .cta-button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    box-shadow: none;
  }

  .cta-arrow {
    font-size: 1.5rem;
    transition: transform 0.2s ease;
  }

  .cta-button:hover:not(:disabled) .cta-arrow {
    transform: translateX(4px);
  }

  /* Features */
  .features {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 1.5rem;
    color: white;
  }

  .feature {
    text-align: center;
    padding: 1.5rem;
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    border-radius: 12px;
    border: 1px solid rgba(255, 255, 255, 0.2);
  }

  .feature-icon {
    font-size: 2.5rem;
    margin-bottom: 0.75rem;
  }

  .feature h3 {
    font-size: 1.125rem;
    font-weight: 600;
    margin: 0 0 0.5rem 0;
  }

  .feature p {
    font-size: 0.875rem;
    margin: 0;
    opacity: 0.9;
    line-height: 1.5;
  }

  /* Navigation Links */
  .nav-links {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-top: 2rem;
  }

  .nav-link {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1.25rem 1.5rem;
    background: rgba(255, 255, 255, 0.15);
    backdrop-filter: blur(10px);
    border-radius: 12px;
    border: 1px solid rgba(255, 255, 255, 0.25);
    color: white;
    text-decoration: none;
    transition: all 0.2s ease;
  }

  .nav-link:hover {
    background: rgba(255, 255, 255, 0.25);
    transform: translateX(4px);
  }

  .nav-icon {
    font-size: 1.75rem;
  }

  .nav-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .nav-title {
    font-size: 1rem;
    font-weight: 600;
  }

  .nav-desc {
    font-size: 0.875rem;
    opacity: 0.85;
  }

  .nav-arrow {
    font-size: 1.25rem;
    opacity: 0.7;
    transition: transform 0.2s ease;
  }

  .nav-link:hover .nav-arrow {
    transform: translateX(4px);
    opacity: 1;
  }

  .grove-link {
    background: rgba(34, 197, 94, 0.2);
    border-color: rgba(34, 197, 94, 0.4);
  }

  .grove-link:hover {
    background: rgba(34, 197, 94, 0.35);
  }

  /* Responsive */
  @media (max-width: 768px) {
    .landing-page {
      padding: 2rem 1rem;
    }

    .hero-title {
      font-size: 2.5rem;
    }

    .hero-tagline {
      font-size: 1rem;
    }

    .form-card {
      padding: 1.5rem;
    }

    .features {
      grid-template-columns: 1fr;
    }
  }
</style>
