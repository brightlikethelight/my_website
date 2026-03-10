<script lang="ts">
  import { slide } from 'svelte/transition';

  export let project: any;

  let isExpanded = false;

  function toggleExpanded() {
    isExpanded = !isExpanded;
  }

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      toggleExpanded();
    }
  }
</script>

<div
  class="project-card"
  class:expanded={isExpanded}
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
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
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

    <button
      class="expand-btn"
      on:click={toggleExpanded}
      on:keydown={handleKeydown}
      aria-label={isExpanded ? 'Collapse details' : 'Expand details'}
      aria-expanded={isExpanded}
    >
      <svg
        class="expand-icon"
        class:rotated={isExpanded}
        width="18"
        height="18"
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

  <p class="project-description">{project.description}</p>

  <div class="project-technologies">
    {#each project.technologies as tech}
      <span class="tech-tag">{tech}</span>
    {/each}
  </div>

  {#if isExpanded}
    <div class="expanded-content" transition:slide>
      <p class="project-impact">{project.impact}</p>

      {#if project.githubUrl}
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          class="github-link"
        >
          View on GitHub &rarr;
        </a>
      {/if}
    </div>
  {/if}
</div>

<style>
  .project-card {
    padding: 1.5rem 0;
    border-bottom: 1px solid var(--border-color);
  }

  .project-card:last-child {
    border-bottom: none;
  }

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 0.75rem;
    gap: 1rem;
  }

  .project-info {
    flex: 1;
  }

  .project-title {
    font-size: 1.15rem;
    font-weight: 600;
    color: var(--text-primary);
    margin: 0 0 0.25rem 0;
    line-height: 1.3;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  }

  .title-link {
    color: var(--text-primary);
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    transition: color 0.2s ease;
  }

  .title-link:hover {
    color: var(--accent-primary);
  }

  .project-meta {
    display: flex;
    gap: 1rem;
    align-items: baseline;
  }

  .organization {
    font-size: 0.9rem;
    color: var(--accent-primary);
    font-weight: 500;
  }

  .date {
    font-size: 0.85rem;
    color: var(--text-tertiary);
  }

  .expand-btn {
    background: none;
    border: none;
    cursor: pointer;
    padding: 0.25rem;
    color: var(--text-tertiary);
    transition: color 0.2s ease;
    flex-shrink: 0;
  }

  .expand-btn:hover {
    color: var(--accent-primary);
  }

  .expand-icon {
    transition: transform 0.2s ease;
    display: block;
  }

  .expand-icon.rotated {
    transform: rotate(180deg);
  }

  .project-description {
    color: var(--text-secondary);
    line-height: 1.6;
    margin: 0 0 0.75rem 0;
    font-size: 0.95rem;
  }

  .project-technologies {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
  }

  .tech-tag {
    background: var(--bg-tertiary);
    color: var(--text-secondary);
    padding: 0.2rem 0.6rem;
    border-radius: 4px;
    font-size: 0.8rem;
    font-weight: 500;
  }

  .expanded-content {
    border-top: 1px solid var(--border-color);
    padding-top: 1rem;
    margin-top: 1rem;
  }

  .project-impact {
    color: var(--text-secondary);
    line-height: 1.6;
    margin: 0 0 0.75rem 0;
    font-size: 0.95rem;
  }

  .github-link {
    color: var(--accent-primary);
    font-size: 0.9rem;
    font-weight: 500;
    text-decoration: none;
    transition: color 0.2s ease;
  }

  .github-link:hover {
    color: var(--accent-secondary);
  }

  @media (max-width: 768px) {
    .project-meta {
      flex-direction: column;
      gap: 0.15rem;
    }
  }
</style>
