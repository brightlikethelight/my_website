<script lang="ts">
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';
  import Router from 'svelte-spa-router';
  import { routes } from './routes';
  import Navigation from './lib/Navigation.svelte';
  import { measureWebVitals } from './lib/utils/intersectionObserver';
  import analytics from './lib/utils/analytics';

  let showBackToTop = false;
  let scrollProgress = 0;
  
  function handleScroll() {
    const scrollY = window.scrollY;
    const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
    
    // Show/hide back to top button
    showBackToTop = scrollY > 500;
    
    // Calculate scroll progress
    scrollProgress = documentHeight > 0 ? (scrollY / documentHeight) * 100 : 0;
  }
  
  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  
  onMount(() => {
    // Initialize web vitals monitoring
    measureWebVitals();
    
    // Track initial page view
    analytics.trackPageView('home');
    
    // Add scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initial scroll check
    handleScroll();
    
    // Log current performance metrics
    setTimeout(() => {
      const metrics = analytics.getMetrics();
      console.log('📊 Performance Metrics:', metrics);
    }, 2000);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });
</script>

<!-- Scroll Progress Bar -->
<div class="scroll-progress" style="width: {scrollProgress}%"></div>

<!-- Skip to content link for accessibility -->
<a href="#main-content" class="skip-link">Skip to main content</a>

<Navigation />
<main id="main-content">
  <Router {routes} />
</main>

<!-- Back to Top Button -->
{#if showBackToTop}
  <button 
    class="back-to-top"
    on:click={scrollToTop}
    aria-label="Back to top"
    transition:fade={{ duration: 300 }}
  >
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
      <path d="M12 19V5"/>
      <path d="M5 12l7-7 7 7"/>
    </svg>
  </button>
{/if}

<style>
  /* CSS Custom Properties for Theming */
  :global(:root),
  :global([data-theme="light"]) {
    /* Professional White Theme - Clean & Modern */
    --bg-primary: #FAFAFA;
    --bg-secondary: #FFFFFF;
    --bg-tertiary: #F5F5F5;
    --bg-hover: rgba(37, 99, 235, 0.04);
    --text-primary: #212121;
    --text-secondary: #757575;
    --text-tertiary: #9E9E9E;
    --accent-primary: #2563EB;
    --accent-secondary: #1E40AF;
    --accent-tertiary: #3B82F6;
    --accent-warm: #2563EB;
    --accent-success: #059669;
    --accent-gradient: linear-gradient(135deg, #2563EB 0%, #3B82F6 50%, #60A5FA 100%);
    --accent-gradient-warm: linear-gradient(135deg, #2563EB 0%, #3B82F6 50%, #60A5FA 100%);
    --accent-gradient-cool: linear-gradient(135deg, #1E40AF 0%, #2563EB 50%, #3B82F6 100%);
    --accent-gradient-subtle: linear-gradient(135deg, rgba(37, 99, 235, 0.06) 0%, rgba(59, 130, 246, 0.02) 100%);
    --border-color: #E0E0E0;
    --border-color-focus: #BDBDBD;
    --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.04);
    --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.06), 0 2px 4px -1px rgba(0, 0, 0, 0.04);
    --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -2px rgba(0, 0, 0, 0.04);
    --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
    --shadow-2xl: 0 25px 50px -12px rgba(0, 0, 0, 0.15);
    --shadow-inner: inset 0 2px 4px 0 rgba(0, 0, 0, 0.04);
    --glass-bg: rgba(255, 255, 255, 0.98);
    --glass-border: rgba(0, 0, 0, 0.08);
    --transition-fast: 150ms cubic-bezier(0.4, 0, 0.2, 1);
    --transition-base: 250ms cubic-bezier(0.4, 0, 0.2, 1);
    --transition-slow: 350ms cubic-bezier(0.4, 0, 0.2, 1);
  }

  :global([data-theme="dark"]) {
    /* Modern Professional Dark Theme - Premium Feel */
    --bg-primary: #0a0f1b;
    --bg-secondary: #111827;
    --bg-tertiary: #1f2937;
    --bg-hover: rgba(96, 165, 250, 0.1);
    --text-primary: #f9fafb;
    --text-secondary: #e5e7eb;
    --text-tertiary: #9ca3af;
    --accent-primary: #60a5fa;
    --accent-secondary: #3b82f6;
    --accent-tertiary: #2563eb;
    --accent-warm: #06b6d4;
    --accent-success: #10b981;
    --accent-gradient: linear-gradient(135deg, #60a5fa 0%, #3b82f6 50%, #2563eb 100%);
    --accent-gradient-warm: linear-gradient(135deg, #06b6d4 0%, #0891b2 50%, #0e7490 100%);
    --accent-gradient-cool: linear-gradient(135deg, #818cf8 0%, #60a5fa 50%, #3b82f6 100%);
    --accent-gradient-subtle: linear-gradient(135deg, rgba(96, 165, 250, 0.15) 0%, rgba(59, 130, 246, 0.1) 100%);
    --border-color: #374151;
    --border-color-focus: #4b5563;
    --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.4);
    --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.5), 0 2px 4px -1px rgba(0, 0, 0, 0.3);
    --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.6), 0 4px 6px -2px rgba(0, 0, 0, 0.4);
    --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.7), 0 10px 10px -5px rgba(0, 0, 0, 0.5);
    --shadow-2xl: 0 25px 50px -12px rgba(0, 0, 0, 0.8);
    --shadow-inner: inset 0 2px 4px 0 rgba(0, 0, 0, 0.3);
    --glass-bg: rgba(17, 24, 39, 0.95);
    --glass-border: rgba(55, 65, 81, 0.6);
    --transition-fast: 150ms cubic-bezier(0.4, 0, 0.2, 1);
    --transition-base: 250ms cubic-bezier(0.4, 0, 0.2, 1);
    --transition-slow: 350ms cubic-bezier(0.4, 0, 0.2, 1);
  }

  /* Global Styles */
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


  /* Typography */
  :global(h1, h2, h3, h4, h5, h6) {
    color: var(--text-primary);
    font-weight: 500;
    line-height: 1.3;
    margin: 0;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  }

  :global(h1) {
    font-size: clamp(2.75rem, 6vw, 4rem);
    font-weight: 700;
    letter-spacing: -0.03em;
    line-height: 1.05;
    margin-bottom: 1.5rem;
    background: var(--accent-gradient);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  :global([data-theme="light"]) :global(h1) {
    -webkit-text-fill-color: var(--text-primary);
    background: none;
  }

  :global(h2) {
    font-size: clamp(1.75rem, 3.5vw, 2.25rem);
    font-weight: 600;
    letter-spacing: -0.02em;
    margin-bottom: 3rem;
    position: relative;
    color: var(--text-primary);
  }

  :global(h2::after) {
    content: '';
    position: absolute;
    bottom: -0.75rem;
    left: 0;
    width: 3rem;
    height: 3px;
    background: var(--accent-gradient);
    border-radius: 2px;
  }

  :global(h3) {
    font-size: clamp(1.25rem, 2.5vw, 1.5rem);
    font-weight: 600;
    margin-bottom: 1.25rem;
    letter-spacing: -0.01em;
    color: var(--text-primary);
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

  /* Section Styles */
  :global(.section) {
    background: transparent;
    padding: 0;
    margin: 0;
    position: relative;
  }

  /* Item Styles */
  :global(.item) {
    padding: 2.5rem 0;
    border-bottom: 1px solid var(--border-color);
    position: relative;
    transition: transform var(--transition-base), box-shadow var(--transition-base);
  }
  
  :global(.item:hover) {
    transform: translateX(4px);
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
    font-size: 1.375rem;
    font-weight: 600;
    color: var(--text-primary);
    margin-bottom: 0.5rem;
    line-height: 1.3;
    transition: color var(--transition-fast);
  }
  
  :global(.item:hover .item-title) {
    color: var(--accent-primary);
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
    font-size: 0.875rem;
    font-weight: 500;
    white-space: nowrap;
    background: var(--accent-gradient-subtle);
    padding: 0.375rem 1rem;
    border-radius: 20px;
    border: 1px solid var(--border-color);
    margin-left: auto;
    text-align: right;
    transition: all var(--transition-base);
  }
  
  :global(.item:hover .item-date) {
    background: var(--accent-gradient);
    color: white;
    border-color: transparent;
    transform: scale(1.05);
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

  /* Responsive Design */
  @media (max-width: 768px) {
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

  /* Accessibility - Skip link */
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

  /* Focus styles for keyboard navigation */
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
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  @keyframes slideIn {
    from { 
      opacity: 0;
      transform: scale(0.9) translateY(-20px);
    }
    to { 
      opacity: 1;
      transform: scale(1) translateY(0);
    }
  }

  /* Scroll Progress Bar */
  .scroll-progress {
    position: fixed;
    top: 0;
    left: 0;
    height: 3px;
    background: var(--accent-gradient);
    z-index: 10001;
    transition: width 0.1s ease-out;
    box-shadow: 0 2px 8px rgba(59, 130, 246, 0.4);
  }
  
  /* Back to Top Button */
  .back-to-top {
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    width: 48px;
    height: 48px;
    background: var(--accent-gradient);
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    box-shadow: var(--shadow-lg);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all var(--transition-base);
    z-index: 999;
    animation: fadeSlideIn 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  @keyframes fadeSlideIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .back-to-top:hover {
    transform: translateY(-4px) scale(1.1);
    box-shadow: var(--shadow-xl);
  }
  
  .back-to-top:active {
    transform: translateY(-2px) scale(1.05);
  }
  
  /* Scroll Animations */
  :global(section) {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.6s ease-out, transform 0.6s ease-out;
  }
  
  :global(section.in-view) {
    opacity: 1;
    transform: translateY(0);
  }
  
  :global(section#home) {
    opacity: 1;
    transform: none;
  }
  
  /* Smooth Animations */
  @media (prefers-reduced-motion: reduce) {
    :global(*) {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
    
    .back-to-top {
      animation: none;
    }
    
    :global(section) {
      opacity: 1;
      transform: none;
    }
  }
</style>
