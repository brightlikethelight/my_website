<script lang="ts">
  import { onMount } from 'svelte';
  import { activeSection } from './stores';
  import ThemeToggle from './ThemeToggle.svelte';

  let isScrolled = false;
  let isMobileMenuOpen = false;

  const sections = [
    { id: 'home', label: 'Home' },
    { id: 'education', label: 'Education' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'publications', label: 'Publications' },
    { id: 'honors', label: 'Honors' },
    { id: 'skills', label: 'Skills' }
  ];

  function scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      isMobileMenuOpen = false;
    }
  }

  function handleScroll() {
    isScrolled = window.scrollY > 50;
    
    // Update active section
    const scrollPosition = window.scrollY + 100;
    for (const section of sections) {
      const element = document.getElementById(section.id);
      if (element) {
        const { offsetTop, offsetHeight } = element;
        if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
          activeSection.set(section.id);
          break;
        }
      }
    }
  }

  onMount(() => {
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });
</script>

<nav class="nav" class:scrolled={isScrolled} aria-label="Main navigation">
  <div class="nav-container">
    <div class="nav-brand">
      <button 
        on:click={() => scrollToSection('home')} 
        class="brand-link"
        aria-label="Go to home section"
      >
        Bright Liu
      </button>
    </div>
    
    <div 
      class="nav-links" 
      class:mobile-open={isMobileMenuOpen}
      role="menubar"
      aria-label="Portfolio sections"
    >
      {#each sections.slice(1) as section}
        <button 
          class="nav-link" 
          class:active={$activeSection === section.id}
          on:click={() => scrollToSection(section.id)}
          role="menuitem"
          aria-label="Go to {section.label.toLowerCase()} section"
          aria-current={$activeSection === section.id ? 'page' : undefined}
        >
          {section.label}
        </button>
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
    background: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(20px);
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  :global([data-theme="dark"]) .nav {
    background: rgba(26, 26, 26, 0.8);
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }

  .nav.scrolled {
    background: rgba(255, 255, 255, 0.95);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  }

  :global([data-theme="dark"]) .nav.scrolled {
    background: rgba(26, 26, 26, 0.95);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
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
    color: var(--text-primary);
    background: none;
    border: none;
    cursor: pointer;
    transition: color 0.3s ease;
  }

  .nav-brand .brand-link:hover {
    color: var(--accent-primary);
  }

  .nav-links {
    display: flex;
    align-items: center;
    gap: 2rem;
  }

  .nav-link {
    font-family: 'Inter', sans-serif;
    font-size: 0.95rem;
    font-weight: 500;
    color: var(--text-secondary);
    background: none;
    border: none;
    cursor: pointer;
    padding: 0.5rem 0;
    position: relative;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  .nav-link::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    right: 50%;
    height: 2px;
    background: var(--accent-primary);
    border-radius: 1px;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    opacity: 0;
  }

  .nav-link:hover {
    color: var(--accent-primary);
    transform: translateY(-1px);
  }
  
  .nav-link:hover::after {
    opacity: 0.5;
    left: 20%;
    right: 20%;
  }

  .nav-link.active {
    color: var(--accent-primary);
  }
  
  .nav-link.active::after {
    opacity: 1;
    left: 0;
    right: 0;
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