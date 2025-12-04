<script lang="ts">
  import { slide } from 'svelte/transition';
  import { onMount } from 'svelte';
  
  export let project: any;
  
  let isExpanded = false;
  let isHovered = false;
  let cardElement: HTMLElement;
  let animatedMetrics: { [key: string]: number } = {};
  
  function toggleExpanded() {
    isExpanded = !isExpanded;
    
    // Track project expand/collapse
    if (isExpanded) {
      import('./utils/analytics').then(({ default: analytics }) => {
        analytics.trackProjectExpand(project.id);
      });
    }
  }
  
  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      toggleExpanded();
    }
  }
  
  function openGitHub() {
    if (project.githubUrl) {
      window.open(project.githubUrl, '_blank', 'noopener,noreferrer');
    }
  }
  
  function getStatusColor(status: string): string {
    switch (status) {
      case 'active':
        return '#22c55e';
      case 'completed':
        return '#3b82f6';
      default:
        return '#6b7280';
    }
  }
  
  function extractNumber(text: string): number {
    const match = text.match(/(\d+\.?\d*)/);
    return match ? parseFloat(match[1]) : 0;
  }
  
  function animateNumber(key: string, target: number, suffix: string = '') {
    const start = animatedMetrics[key] || 0;
    const duration = 2000; // 2 seconds
    const startTime = performance.now();
    
    function updateNumber(currentTime: number) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function for smooth animation
      const easeOutCubic = 1 - Math.pow(1 - progress, 3);
      animatedMetrics[key] = start + (target - start) * easeOutCubic;
      
      if (progress < 1) {
        requestAnimationFrame(updateNumber);
      } else {
        animatedMetrics[key] = target;
      }
    }
    
    requestAnimationFrame(updateNumber);
  }
  
  function formatMetricValue(key: string, originalValue: string): string {
    if (animatedMetrics[key] !== undefined) {
      const number = animatedMetrics[key];
      const suffix = originalValue.replace(/[\d.]/g, '');
      
      if (suffix.includes('%')) {
        return `${number.toFixed(1)}%`;
      } else if (suffix.includes('x')) {
        return `${number.toFixed(2)}x`;
      } else {
        return `${Math.round(number)}${suffix}`;
      }
    }
    return originalValue;
  }
  
  onMount(() => {
    // Initialize metric animations with a slight delay for better UX
    setTimeout(() => {
      if (project.metrics) {
        Object.entries(project.metrics).forEach(([key, value]) => {
          const numericValue = extractNumber(value as string);
          if (numericValue > 0) {
            animateNumber(key, numericValue);
          }
        });
      }
    }, 500);
  });
</script>

<div 
  class="project-card"
  class:expanded={isExpanded}
  class:hovered={isHovered}
  class:featured={project.featured}
  bind:this={cardElement}
  on:mouseenter={() => isHovered = true}
  on:mouseleave={() => isHovered = false}
  role="article"
  aria-label="Project: {project.title}"
>
  <div class="card-header">
    <div class="project-info">
      <h3 class="project-title">
        {#if project.githubUrl}
          <a 
            href={project.githubUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            class="title-link"
            aria-label="View {project.title} on GitHub"
          >
            {project.title}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
              <polyline points="15,3 21,3 21,9"/>
              <line x1="10" y1="14" x2="21" y2="3"/>
            </svg>
          </a>
        {:else}
          {project.title}
        {/if}
      </h3>
      <div class="project-meta">
        <span class="organization">{project.organization}</span>
        <span class="date">{project.date}</span>
      </div>
    </div>
    
    <div class="card-actions">
      <span 
        class="status-badge"
        style="background-color: {getStatusColor(project.status)}"
        aria-label="Project status: {project.status}"
      >
        {project.status === 'active' ? 'Ongoing' : 'Completed'}
      </span>
      
      <button
        class="expand-btn"
        on:click={toggleExpanded}
        on:keydown={handleKeydown}
        aria-label={isExpanded ? 'Collapse project details' : 'Expand project details'}
        aria-expanded={isExpanded}
      >
        <svg 
          class="expand-icon" 
          class:rotated={isExpanded}
          width="20" 
          height="20" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          stroke-width="2"
          aria-hidden="true"
        >
          <polyline points="6,9 12,15 18,9"/>
        </svg>
      </button>
    </div>
  </div>
  
  <div class="project-description">
    <p>{project.description}</p>
  </div>
  
  <div class="project-technologies">
    {#each project.technologies as tech}
      <span class="tech-tag">{tech}</span>
    {/each}
  </div>
  
  {#if isExpanded}
    <div class="expanded-content" transition:slide>
      <div class="project-impact">
        <h4>Impact & Results</h4>
        <p>{project.impact}</p>
      </div>
      
      {#if project.metrics}
        <div class="project-metrics">
          <h4>Key Metrics</h4>
          <div class="metrics-grid">
            {#each Object.entries(project.metrics) as [key, value]}
              <div class="metric-item">
                <span class="metric-label">{key.replace(/([A-Z])/g, ' $1').trim()}:</span>
                <span class="metric-value">{formatMetricValue(key, value)}</span>
              </div>
            {/each}
          </div>
        </div>
      {/if}
      
      {#if project.githubUrl}
        <div class="project-links">
          <button 
            class="github-btn"
            on:click={openGitHub}
            aria-label="Open {project.title} GitHub repository"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
            </svg>
            View on GitHub
          </button>
        </div>
      {/if}
    </div>
  {/if}
  
  <div class="card-glow"></div>
</div>

<style>
  .project-card {
    position: relative;
    background: var(--bg-secondary);
    border: 1px solid var(--border-color);
    border-radius: 12px;
    padding: 1.5rem;
    margin-bottom: 1.5rem;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    opacity: 1;
    transform: translateY(0);
    overflow: hidden;
  }
  
  .project-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: var(--accent-gradient);
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.3s ease;
  }
  
  .project-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
    border-color: var(--accent-primary);
    background: var(--bg-primary);
  }
  
  .project-card:hover::before {
    transform: scaleX(1);
  }
  
  .project-card:focus-visible {
    outline: 2px solid var(--accent-primary);
    outline-offset: 4px;
  }
  
  .project-card.featured {
    position: relative;
  }
  
  .project-card.featured::before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: var(--accent-gradient-warm);
    border-radius: 14px;
    z-index: -1;
    opacity: 0.7;
    transition: opacity 0.3s ease;
  }
  
  .project-card.featured:hover::before {
    opacity: 1;
  }
  
  .project-card.expanded {
    border-color: var(--accent-primary);
    box-shadow: var(--shadow-md);
  }
  
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 1rem;
    gap: 1rem;
  }
  
  .project-info {
    flex: 1;
  }
  
  .project-title {
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--text-primary);
    margin: 0 0 0.5rem 0;
    line-height: 1.3;
  }
  
  .title-link {
    color: var(--text-primary);
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    transition: color 0.3s ease;
  }
  
  .title-link:hover {
    color: var(--accent-primary);
  }
  
  .project-meta {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }
  
  .organization {
    font-size: 0.95rem;
    color: var(--accent-primary);
    font-weight: 500;
  }
  
  .date {
    font-size: 0.85rem;
    color: var(--text-tertiary);
  }
  
  .card-actions {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    flex-shrink: 0;
  }
  
  .status-badge {
    font-size: 0.8rem;
    font-weight: 500;
    color: white;
    padding: 0.25rem 0.75rem;
    border-radius: 12px;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
  
  .expand-btn {
    background: none;
    border: none;
    cursor: pointer;
    padding: 0.5rem;
    border-radius: 6px;
    transition: all 0.3s ease;
    color: var(--text-secondary);
  }
  
  .expand-btn:hover {
    background: var(--bg-tertiary);
    color: var(--accent-primary);
  }
  
  .expand-icon {
    transition: transform 0.3s ease;
  }
  
  .expand-icon.rotated {
    transform: rotate(180deg);
  }
  
  .project-description {
    margin-bottom: 1rem;
  }
  
  .project-description p {
    color: var(--text-secondary);
    line-height: 1.6;
    margin: 0;
  }
  
  .project-technologies {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 1rem;
  }
  
  .tech-tag {
    background: var(--accent-primary);
    color: white;
    padding: 0.25rem 0.75rem;
    border-radius: 6px;
    font-size: 0.8rem;
    font-weight: 500;
    border: none;
    transition: all 0.2s ease;
    cursor: default;
  }
  
  .tech-tag:hover {
    background: var(--accent-secondary);
    transform: translateY(-1px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .expanded-content {
    border-top: 1px solid var(--border-color);
    padding-top: 1rem;
    margin-top: 1rem;
  }
  
  .expanded-content h4 {
    font-size: 1rem;
    font-weight: 600;
    color: var(--text-primary);
    margin: 0 0 0.75rem 0;
  }
  
  .project-impact p {
    color: var(--text-secondary);
    line-height: 1.6;
    margin: 0 0 1.5rem 0;
  }
  
  .metrics-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 0.75rem;
    margin-bottom: 1.5rem;
  }
  
  .metric-item {
    background: var(--bg-tertiary);
    padding: 0.75rem;
    border-radius: 6px;
    border: 1px solid var(--border-color);
  }
  
  .metric-label {
    display: block;
    font-size: 0.8rem;
    font-weight: 500;
    color: var(--text-tertiary);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-bottom: 0.25rem;
  }
  
  .metric-value {
    font-size: 1rem;
    font-weight: 600;
    color: var(--text-primary);
  }
  
  .project-links {
    display: flex;
    gap: 1rem;
  }
  
  .github-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    background: var(--accent-primary);
    color: white;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.3s ease;
    font-weight: 500;
  }
  
  .github-btn:hover {
    background: var(--accent-secondary);
    transform: translateY(-2px);
  }
  
  .card-glow {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(600px circle at var(--mouse-x, 0) var(--mouse-y, 0), rgba(0, 0, 0, 0.1), transparent 40%);
    opacity: 0;
    transition: opacity 0.3s ease;
    pointer-events: none;
  }
  
  .project-card:hover .card-glow {
    opacity: 1;
  }
  
  @media (max-width: 768px) {
    .card-header {
      flex-direction: column;
      gap: 1rem;
    }
    
    .card-actions {
      align-self: flex-start;
    }
    
    .metrics-grid {
      grid-template-columns: 1fr;
    }
    
    .project-links {
      flex-direction: column;
    }
    
    .github-btn {
      width: 100%;
      justify-content: center;
    }
  }
</style>