<script lang="ts">
  import { link } from 'svelte-spa-router';
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';

  let mounted = false;

  onMount(() => {
    document.title = "404 - Page Not Found | Bright Liu";
    mounted = true;
  });
</script>

<div class="not-found-page">
  <div class="not-found-content">
    {#if mounted}
      <div class="error-code" in:fade={{ duration: 400 }}>404</div>
      <h1 in:fade={{ duration: 400, delay: 100 }}>Page Not Found</h1>
      <p class="error-message" in:fade={{ duration: 400, delay: 200 }}>
        The page you're looking for doesn't exist or may have been moved.
      </p>
      <div class="actions" in:fade={{ duration: 400, delay: 300 }}>
        <a href="/" use:link class="home-btn">Go Home</a>
        <a href="/#/about" use:link class="link-btn">About</a>
        <a href="/#/projects" use:link class="link-btn">Projects</a>
      </div>
    {:else}
      <div class="error-code">404</div>
      <h1>Page Not Found</h1>
      <p class="error-message">
        The page you're looking for doesn't exist or may have been moved.
      </p>
      <div class="actions">
        <a href="/" use:link class="home-btn">Go Home</a>
        <a href="/#/about" use:link class="link-btn">About</a>
        <a href="/#/projects" use:link class="link-btn">Projects</a>
      </div>
    {/if}
  </div>
</div>

<style>
  .not-found-page {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
  }

  .not-found-content {
    text-align: center;
    max-width: 600px;
  }

  .error-code {
    font-size: clamp(6rem, 15vw, 10rem);
    font-weight: 900;
    color: var(--accent-primary);
    line-height: 1;
    margin-bottom: 1rem;
  }

  .not-found-page h1 {
    font-size: clamp(2rem, 4vw, 2.5rem);
    font-weight: 700;
    color: var(--text-primary);
    margin-bottom: 1rem;
  }

  .error-message {
    font-size: 1.1rem;
    color: var(--text-secondary);
    margin-bottom: 2rem;
    line-height: 1.6;
  }

  .actions {
    display: flex;
    gap: 1rem;
    justify-content: center;
    flex-wrap: wrap;
  }

  .home-btn {
    padding: 0.875rem 1.75rem;
    background: var(--accent-primary);
    color: white;
    border-radius: 8px;
    font-weight: 500;
    text-decoration: none;
    transition: all 0.2s ease;
  }

  .home-btn:hover {
    background: var(--accent-secondary);
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
  }

  .link-btn {
    padding: 0.875rem 1.75rem;
    background: var(--bg-secondary);
    color: var(--text-secondary);
    border: 1px solid var(--border-color);
    border-radius: 8px;
    font-weight: 500;
    text-decoration: none;
    transition: all 0.2s ease;
  }

  .link-btn:hover {
    background: var(--bg-tertiary);
    color: var(--text-primary);
    border-color: var(--accent-primary);
    transform: translateY(-2px);
  }

  @media (max-width: 480px) {
    .actions {
      flex-direction: column;
      width: 100%;
    }

    .home-btn, .link-btn {
      width: 100%;
    }
  }
</style>
