<script lang="ts">
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';
  import Projects from '../lib/Projects.svelte';
  
  let mounted = false;
  
  onMount(() => {
    document.title = "Projects - Bright Liu";
    mounted = true;
  });
</script>

<div class="projects-page">
  <header class="page-header">
    <div class="header-content">
      {#if mounted}
        <h1 in:fade={{ duration: 400 }}>Projects</h1>
        <p class="subtitle" in:fade={{ duration: 400, delay: 100 }}>
          Technical projects and research initiatives
        </p>
      {:else}
        <h1>Projects</h1>
        <p class="subtitle">Technical projects and research initiatives</p>
      {/if}
    </div>
  </header>

  <main class="content">
    {#if mounted}
      <div in:fade={{ duration: 400, delay: 150 }}>
        <Projects />
      </div>
    {:else}
      <Projects />
    {/if}
  </main>
</div>

<style>
  .projects-page {
    min-height: 100vh;
    padding-bottom: 4rem;
  }

  .page-header {
    padding: 3rem 2rem 2rem;
    text-align: center;
    border-bottom: 1px solid var(--border-color);
    background: var(--bg-secondary);
  }

  .header-content {
    max-width: 800px;
    margin: 0 auto;
  }

  .page-header h1 {
    font-size: clamp(2rem, 4vw, 2.75rem);
    font-weight: 700;
    color: var(--text-primary);
    margin-bottom: 0.5rem;
    letter-spacing: -0.02em;
  }

  .subtitle {
    font-size: 1.1rem;
    color: var(--text-tertiary);
    margin: 0;
  }

  .content {
    max-width: 1000px;
    margin: 0 auto;
    padding: 2rem;
  }

  @media (max-width: 768px) {
    .content {
      padding: 1.5rem 1rem;
    }
  }
</style>
