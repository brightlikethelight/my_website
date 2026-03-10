<script lang="ts">
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';
  import { currentRoute, getWritingSlug } from './lib/router';
  import Navigation from './lib/Navigation.svelte';
  import Header from './lib/Header.svelte';
  import Education from './lib/Education.svelte';
  import Experience from './lib/Experience.svelte';
  import Projects from './lib/Projects.svelte';
  import Publications from './lib/Publications.svelte';
  import Honors from './lib/Honors.svelte';
  import WritingList from './lib/WritingList.svelte';
  import WritingPost from './lib/WritingPost.svelte';
  import { measureWebVitals } from './lib/utils/intersectionObserver';
  import analytics from './lib/utils/analytics';

  onMount(() => {
    measureWebVitals();
    analytics.trackPageView($currentRoute);

    const unsubscribe = currentRoute.subscribe((route) => {
      analytics.trackPageView(route);
    });

    return unsubscribe;
  });
</script>

<a href="#main-content" class="skip-link">Skip to main content</a>

<Navigation />
<main id="main-content">
  {#key $currentRoute}
    <div class="page" in:fade={{ duration: 150 }}>
      {#if $currentRoute === '/'}
        <Header />
      {:else if $currentRoute === '/experience'}
        <section><Experience /></section>
      {:else if $currentRoute === '/projects'}
        <section><Projects /></section>
      {:else if $currentRoute === '/publications'}
        <section><Publications /></section>
      {:else if $currentRoute === '/writing'}
        <section><WritingList /></section>
      {:else if getWritingSlug($currentRoute)}
        <section><WritingPost slug={getWritingSlug($currentRoute) || ''} /></section>
      {:else if $currentRoute === '/about'}
        <section><Education /></section>
        <section><Honors /></section>
      {/if}
    </div>
  {/key}
</main>

<style>
  /* CSS Custom Properties for Theming */
  :global(:root),
  :global([data-theme="light"]) {
    --bg-primary: #ffffff;
    --bg-secondary: #f8f9fa;
    --bg-tertiary: #e3e8ef;
    --text-primary: #1e293b;
    --text-secondary: #4a5568;
    --text-tertiary: #718096;
    --accent-primary: #1e40af;
    --accent-secondary: #2563eb;
    --accent-tertiary: #3b82f6;
    --accent-warm: #0891b2;
    --accent-gradient: linear-gradient(135deg, #1e40af 0%, #2563eb 100%);
    --accent-gradient-warm: linear-gradient(135deg, #0891b2 0%, #06b6d4 100%);
    --accent-gradient-cool: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
    --border-color: #e2e8f0;
    --shadow-sm: 0 1px 3px 0 rgba(44, 62, 80, 0.06);
    --shadow-md: 0 4px 6px -1px rgba(44, 62, 80, 0.08);
    --shadow-lg: 0 10px 15px -3px rgba(44, 62, 80, 0.10);
    --shadow-xl: 0 20px 25px -5px rgba(44, 62, 80, 0.12);
    --glass-bg: rgba(248, 249, 250, 0.98);
    --glass-border: rgba(222, 226, 230, 0.8);
  }

  :global([data-theme="dark"]) {
    --bg-primary: #0f172a;
    --bg-secondary: #1e293b;
    --bg-tertiary: #334155;
    --text-primary: #f1f5f9;
    --text-secondary: #cbd5e1;
    --text-tertiary: #94a3b8;
    --accent-primary: #60a5fa;
    --accent-secondary: #3b82f6;
    --accent-tertiary: #2563eb;
    --accent-warm: #06b6d4;
    --accent-gradient: linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%);
    --accent-gradient-warm: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%);
    --accent-gradient-cool: linear-gradient(135deg, #60a5fa 0%, #2563eb 100%);
    --border-color: #475569;
    --shadow-sm: 0 1px 3px 0 rgba(0, 0, 0, 0.3);
    --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.4);
    --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.5);
    --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.6);
    --glass-bg: rgba(15, 20, 25, 0.98);
    --glass-border: rgba(55, 62, 71, 0.8);
  }

  :global(*) {
    box-sizing: border-box;
  }

  :global(html) {
    scroll-behavior: smooth;
  }

  :global(body) {
    margin: 0;
    padding: 0;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
    font-feature-settings: 'cv05', 'cv01', 'cv03', 'cv04';
    line-height: 1.5;
    color: var(--text-primary);
    background: var(--bg-primary);
    transition: background-color 0.2s ease, color 0.2s ease;
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  main {
    padding-top: 4rem;
  }

  .page section {
    min-height: auto;
    padding: 5rem 0;
    max-width: 800px;
    margin: 0 auto;
    padding-left: 2rem;
    padding-right: 2rem;
  }

  .page section:first-child {
    padding-top: 2rem;
  }

  /* Typography - serif for h1-h3 headings */
  :global(h1, h2, h3) {
    color: var(--text-primary);
    font-weight: 500;
    line-height: 1.3;
    margin: 0;
    font-family: 'DM Serif Display', Georgia, serif;
  }

  :global(h4, h5, h6) {
    color: var(--text-primary);
    font-weight: 500;
    line-height: 1.3;
    margin: 0;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  }

  :global(h1) {
    font-size: clamp(2.5rem, 5vw, 3.5rem);
    font-weight: 400;
    letter-spacing: -0.02em;
    line-height: 1.1;
    margin-bottom: 1rem;
  }

  :global(h2) {
    font-size: clamp(1.5rem, 3vw, 2rem);
    font-weight: 400;
    letter-spacing: -0.01em;
    margin-bottom: 3rem;
    position: relative;
  }

  :global(h3) {
    font-size: clamp(1.125rem, 2vw, 1.375rem);
    font-weight: 400;
    margin-bottom: 1rem;
    letter-spacing: -0.005em;
  }

  :global(p) {
    color: var(--text-secondary);
    line-height: 1.6;
    margin: 0 0 1rem 0;
    font-size: 1rem;
  }

  :global(a) {
    color: var(--accent-primary);
    text-decoration: none;
    transition: all 0.3s ease;
    position: relative;
  }

  :global(a:hover) {
    color: var(--accent-secondary);
  }

  :global(.section) {
    background: transparent;
    padding: 0;
    margin: 0;
    position: relative;
  }

  :global(.item) {
    padding: 2rem 0;
    border-bottom: 1px solid var(--border-color);
    position: relative;
  }

  :global(.item:last-child) {
    border-bottom: none;
  }

  :global(.item-header) {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 0.5rem;
    gap: 1rem;
  }

  :global(.item-header:last-of-type) {
    margin-bottom: 1rem;
  }

  :global(.item-title) {
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--text-primary);
    margin-bottom: 0.25rem;
    line-height: 1.3;
  }

  :global(.item-org) {
    font-size: 1.1rem;
    font-weight: 500;
    color: var(--accent-primary);
    font-style: normal;
  }

  :global(.item-location) {
    color: var(--text-tertiary);
    font-size: 0.9rem;
    font-weight: 500;
    margin-left: auto;
    text-align: right;
  }

  :global(.item-date) {
    color: var(--text-tertiary);
    font-size: 0.9rem;
    font-weight: 500;
    white-space: nowrap;
    background: var(--bg-tertiary);
    padding: 0.25rem 0.75rem;
    border-radius: 8px;
    border: 1px solid var(--border-color);
    margin-left: auto;
    text-align: right;
  }

  :global(.item-description) {
    color: var(--text-secondary);
    line-height: 1.6;
  }

  :global(.item-description ul) {
    margin: 1rem 0;
    padding-left: 0;
    list-style: none;
  }

  :global(.item-description li) {
    margin-bottom: 0.75rem;
    padding-left: 1.5rem;
    position: relative;
    line-height: 1.6;
  }

  :global(.item-description li::before) {
    content: '';
    position: absolute;
    left: 0;
    top: 0.65rem;
    width: 4px;
    height: 4px;
    background: var(--accent-primary);
    border-radius: 50%;
  }

  /* Responsive */
  @media (max-width: 1024px) {
    .page section {
      padding-left: 1.5rem;
      padding-right: 1.5rem;
      padding-top: 3rem;
      padding-bottom: 3rem;
    }
  }

  @media (max-width: 768px) {
    .page section {
      padding-left: 1rem;
      padding-right: 1rem;
      padding-top: 2.5rem;
      padding-bottom: 2.5rem;
      max-width: 100%;
    }

    :global(.item-header) {
      flex-direction: column;
      align-items: flex-start;
      gap: 0.5rem;
    }

    :global(.item-location),
    :global(.item-date) {
      margin-left: 0;
      text-align: left;
    }
  }

  @media (max-width: 480px) {
    .page section {
      padding-left: 1rem;
      padding-right: 1rem;
      padding-top: 2rem;
      padding-bottom: 2rem;
    }
  }

  /* Accessibility */
  .skip-link {
    position: absolute;
    top: -40px;
    left: 6px;
    background: var(--accent-primary);
    color: var(--bg-primary);
    padding: 8px;
    border-radius: 4px;
    text-decoration: none;
    font-weight: 600;
    z-index: 10000;
    transition: all 0.3s ease;
  }

  .skip-link:focus {
    top: 6px;
    outline: 2px solid var(--accent-secondary);
    outline-offset: 2px;
  }

  .skip-link:hover {
    background: var(--accent-secondary);
  }

  :global(*:focus) {
    outline: none;
  }

  :global(*:focus-visible) {
    outline: 2px solid var(--accent-primary);
    outline-offset: 2px;
    border-radius: 4px;
  }

  :global(button:focus-visible),
  :global(a:focus-visible) {
    outline-offset: 4px;
  }

  @media (prefers-reduced-motion: reduce) {
    :global(*) {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }
</style>
