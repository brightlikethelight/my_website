<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { lazyLoad } from './utils/intersectionObserver';

  export let sectionId: string;
  export let threshold: number = 0.1;
  export let rootMargin: string = '50px';
  export let component: any = null;
  export let props: any = {};

  let sectionElement: HTMLElement;
  let isVisible = false;
  let hasLoaded = false;
  let observer: any;

  onMount(() => {
    if (sectionElement) {
      observer = lazyLoad(sectionElement, {
        threshold,
        rootMargin,
        once: true
      });

      // Listen for lazy-loaded event
      sectionElement.addEventListener('lazy-loaded', () => {
        isVisible = true;
        hasLoaded = true;
        
        // Track section view for analytics
        import('./utils/analytics').then(({ default: analytics }) => {
          analytics.trackSectionView(sectionId);
        });
      });

      // Fallback: check if element is already visible or if we're in development
      setTimeout(() => {
        if (!isVisible && sectionElement) {
          const rect = sectionElement.getBoundingClientRect();
          const isVisibleNow = rect.top < window.innerHeight + 200 && rect.bottom > -200;
          // In development or if element is close to viewport, show it immediately
          if (isVisibleNow || import.meta.env.DEV) {
            isVisible = true;
            hasLoaded = true;
          }
        }
      }, 100);
      
      // Additional fallback for development
      if (import.meta.env.DEV) {
        setTimeout(() => {
          if (!isVisible) {
            isVisible = true;
            hasLoaded = true;
          }
        }, 1000);
      }
    }
  });

  onDestroy(() => {
    if (observer) {
      observer.destroy();
    }
  });
</script>

<section 
  id={sectionId} 
  class="lazy-section" 
  class:loaded={hasLoaded}
  bind:this={sectionElement}
>
  {#if isVisible && component}
    <div class="section-content">
      <svelte:component this={component} {...props} />
    </div>
  {:else}
    <div class="section-placeholder" aria-hidden="true">
      <div class="skeleton-header"></div>
      <div class="skeleton-content">
        <div class="skeleton-line"></div>
        <div class="skeleton-line"></div>
        <div class="skeleton-line short"></div>
      </div>
    </div>
  {/if}
</section>

<style>
  .lazy-section {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.6s ease-out, transform 0.6s ease-out;
  }

  .lazy-section.loaded {
    opacity: 1;
    transform: translateY(0);
  }

  .section-content {
    opacity: 0;
    animation: fadeIn 0.8s ease-out forwards;
  }

  .section-placeholder {
    padding: 8rem 0;
  }

  .skeleton-header {
    width: 30%;
    height: 2.5rem;
    background: linear-gradient(90deg, var(--bg-tertiary) 25%, var(--bg-secondary) 50%, var(--bg-tertiary) 75%);
    background-size: 200% 100%;
    animation: shimmer 2s infinite;
    border-radius: 4px;
    margin-bottom: 3rem;
  }

  .skeleton-content {
    max-width: 600px;
  }

  .skeleton-line {
    width: 100%;
    height: 1rem;
    background: linear-gradient(90deg, var(--bg-tertiary) 25%, var(--bg-secondary) 50%, var(--bg-tertiary) 75%);
    background-size: 200% 100%;
    animation: shimmer 2s infinite;
    border-radius: 4px;
    margin-bottom: 1rem;
  }

  .skeleton-line.short {
    width: 60%;
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }

  :global(.fade-in) {
    animation: fadeIn 0.8s ease-out forwards;
  }

  @media (prefers-reduced-motion: reduce) {
    .lazy-section {
      transition: none;
      transform: none;
    }
    
    .section-content {
      animation: none;
    }
    
    .skeleton-header,
    .skeleton-line {
      animation: none;
    }
  }
</style>