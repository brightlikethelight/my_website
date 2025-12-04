<script lang="ts">
  import { onMount } from 'svelte';
  import { link, location } from 'svelte-spa-router';
  import ThemeToggle from './ThemeToggle.svelte';

  let isScrolled = false;
  let isMobileMenuOpen = false;

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/projects', label: 'Projects' },
    { path: '/writings', label: 'Writings' },
    { path: '/quotes', label: 'Quotes' },
    { path: '/teachings', label: 'Teachings' }
  ];

  function handleScroll() {
    isScrolled = window.scrollY > 50;
  }

  function closeMobileMenu() {
    isMobileMenuOpen = false;
  }

  onMount(() => {
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });

  $: currentPath = $location;
</script>

<nav class="nav" class:scrolled={isScrolled} aria-label="Main navigation">
  <div class="nav-container">
    <div class="nav-brand">
      <a 
        href="/"
        use:link
        class="brand-link"
        aria-label="Go to home page"
        on:click={closeMobileMenu}
      >
        Bright Liu
      </a>
    </div>
    
    <div 
      class="nav-links" 
      class:mobile-open={isMobileMenuOpen}
      role="menubar"
      aria-label="Site navigation"
    >
      {#each navLinks.slice(1) as navItem}
        <a 
          href={navItem.path}
          use:link
          class="nav-link" 
          class:active={currentPath === navItem.path}
          role="menuitem"
          aria-label="Go to {navItem.label.toLowerCase()} page"
          aria-current={currentPath === navItem.path ? 'page' : undefined}
          on:click={closeMobileMenu}
        >
          {navItem.label}
        </a>
      {/each}
      
      <ThemeToggle />
    </div>
    
    <button 
      class="mobile-toggle"
      on:click={() => isMobileMenuOpen = !isMobileMenuOpen}
      aria-label="Toggle mobile menu"
      aria-expanded={isMobileMenuOpen}
      aria-controls="mobile-menu"
    >
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </button>
  </div>
</nav>

<style>
  .nav {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    background: var(--glass-bg);
    backdrop-filter: saturate(180%) blur(20px);
    -webkit-backdrop-filter: saturate(180%) blur(20px);
    border-bottom: 1px solid var(--glass-border);
    transition: all var(--transition-base);
  }

  .nav.scrolled {
    background: var(--glass-bg);
    box-shadow: var(--shadow-lg);
    border-bottom: 1px solid transparent;
  }

  .nav.scrolled::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: var(--accent-gradient);
    opacity: 0.2;
  }

  .nav-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 4rem;
  }

  .nav-brand .brand-link {
    font-family: 'Inter', sans-serif;
    font-size: 1.25rem;
    font-weight: 700;
    background: var(--accent-gradient);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    border: none;
    cursor: pointer;
    transition: all var(--transition-base);
    position: relative;
  }

  :global([data-theme="light"]) .nav-brand .brand-link {
    -webkit-text-fill-color: var(--text-primary);
    background: none;
  }

  .nav-brand .brand-link:hover {
    transform: scale(1.05);
  }

  :global([data-theme="light"]) .nav-brand .brand-link:hover {
    color: var(--accent-primary);
  }

  .nav-links {
    display: flex;
    align-items: center;
    gap: 2rem;
  }

  .nav-link {
    font-family: 'Inter', sans-serif;
    font-size: 0.85rem;
    font-weight: 500;
    letter-spacing: 0.03em;
    text-transform: uppercase;
    color: var(--text-secondary);
    background: none;
    border: none;
    cursor: pointer;
    padding: 0.5rem 0.75rem;
    position: relative;
    transition: all var(--transition-base);
    border-radius: 6px;
    text-decoration: none;
  }
  
  .nav-link::before {
    content: '';
    position: absolute;
    inset: 0;
    background: var(--accent-gradient-subtle);
    border-radius: 8px;
    opacity: 0;
    transition: opacity var(--transition-base);
  }
  
  .nav-link::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 50%;
    right: 50%;
    height: 2px;
    background: var(--accent-gradient);
    border-radius: 1px;
    transition: all var(--transition-base);
    opacity: 0;
  }

  .nav-link:hover {
    color: var(--accent-primary);
    transform: translateY(-2px);
  }
  
  .nav-link:hover::before {
    opacity: 1;
  }
  
  .nav-link:hover::after {
    opacity: 0.7;
    left: 25%;
    right: 25%;
  }

  .nav-link.active {
    color: var(--accent-primary);
    font-weight: 600;
  }
  
  .nav-link.active::before {
    opacity: 1;
  }
  
  .nav-link.active::after {
    opacity: 1;
    left: 25%;
    right: 25%;
  }


  .mobile-toggle {
    display: none;
    flex-direction: column;
    width: 2rem;
    height: 2rem;
    border: none;
    background: none;
    cursor: pointer;
    gap: 0.25rem;
    align-items: center;
    justify-content: center;
  }

  .mobile-toggle span {
    width: 1.5rem;
    height: 2px;
    background: var(--text-primary);
    transition: all 0.3s ease;
    border-radius: 1px;
  }

  /* Screen reader only content */
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  @media (max-width: 768px) {
    .nav-container {
      padding: 0 1rem;
    }

    .mobile-toggle {
      display: flex;
    }

    .nav-links {
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      background: var(--bg-primary);
      border-top: 1px solid var(--border-color);
      flex-direction: column;
      padding: 1rem;
      gap: 1rem;
      transform: translateY(-100%);
      opacity: 0;
      visibility: hidden;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .nav-links.mobile-open {
      transform: translateY(0);
      opacity: 1;
      visibility: visible;
    }

    .nav-link {
      padding: 0.75rem 0;
      width: 100%;
      text-align: center;
    }
  }
</style>