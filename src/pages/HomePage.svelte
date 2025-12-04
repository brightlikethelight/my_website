<script lang="ts">
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';
  import { link } from 'svelte-spa-router';
  import ContactForm from '../lib/ContactForm.svelte';
  
  let showContactForm = false;
  let mounted = false;
  
  function toggleContactForm() {
    showContactForm = !showContactForm;
  }
  
  onMount(() => {
    document.title = "Bright Liu - Harvard CS Student | AI Safety & Quantitative Finance";
    mounted = true;
  });
</script>

<div class="home-page">
  <div class="hero">
    <div class="hero-content">
      <div class="hero-main">
        <div class="hero-text">
          {#if mounted}
            <p class="welcome-text" in:fade={{ duration: 600, delay: 100 }}>Welcome!</p>
            <h1 class="hero-title" in:fade={{ duration: 600, delay: 200 }}>I'm Bright Liu</h1>
          {:else}
            <p class="welcome-text">Welcome!</p>
            <h1 class="hero-title">I'm Bright Liu</h1>
          {/if}
          
          {#if mounted}
            <p class="hero-intro" in:fade={{ duration: 600, delay: 300 }}>
              A senior at Harvard studying computer science, mathematics, and statistics.
              I work on <strong>AI safety</strong> at <strong>Google DeepMind</strong>
              <span class="highlight">(Astra Fellow)</span> and previously engineered
              <strong>quantitative analytics systems</strong> at <strong>AWS</strong>,
              specializing in real-time risk metrics and anomaly detection.
            </p>
            
            <p class="hero-interests" in:fade={{ duration: 600, delay: 400 }}>
              I also enjoy <a href="/#/books" use:link>reading</a>, playing music, and running.
            </p>
          {:else}
            <p class="hero-intro">
              A senior at Harvard studying computer science, mathematics, and statistics.
              I work on <strong>AI safety</strong> at <strong>Google DeepMind</strong>
              <span class="highlight">(Astra Fellow)</span> and previously engineered
              <strong>quantitative analytics systems</strong> at <strong>AWS</strong>,
              specializing in real-time risk metrics and anomaly detection.
            </p>
            
            <p class="hero-interests">
              I also enjoy <a href="/#/books">reading</a>, playing music, and running.
            </p>
          {/if}
          
          {#if mounted}
            <div class="cta-section" in:fade={{ duration: 600, delay: 500 }}>
              <a href="/#/about" use:link class="read-more-btn">
                Read more about me
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </a>
            </div>
          {/if}
          
          {#if mounted}
            <div class="hero-links" in:fade={{ duration: 600, delay: 600 }}>
              <button 
                on:click={toggleContactForm} 
                class="contact-link"
                class:active={showContactForm}
                aria-label="Toggle contact form"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
                Contact
              </button>
              <a href="https://www.linkedin.com/in/bright-liu-701174216" target="_blank" rel="noopener" class="contact-link">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
                LinkedIn
              </a>
              <a href="https://github.com/brightlikethelight" target="_blank" rel="noopener" class="contact-link">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                GitHub
              </a>
            </div>
          {/if}
        </div>
        
        {#if mounted}
          <div class="hero-image" in:fade={{ duration: 800, delay: 200 }}>
            <div class="profile-photo-container">
              <div class="profile-photo-ring"></div>
              <img 
                src="/profile.jpg" 
                alt="Bright Liu - Professional headshot" 
                class="profile-photo"
                loading="eager"
              />
            </div>
          </div>
        {:else}
          <div class="hero-image">
            <div class="profile-photo-container">
              <img 
                src="/profile.jpg" 
                alt="Bright Liu - Professional headshot" 
                class="profile-photo"
                loading="eager"
              />
            </div>
          </div>
        {/if}
      </div>
    </div>
  </div>
  
  {#if showContactForm}
    <div class="dynamic-section" transition:fade>
      <ContactForm />
    </div>
  {/if}
  
  <!-- Quick Links Section -->
  {#if mounted}
    <div class="quick-links" in:fade={{ duration: 600, delay: 700 }}>
      <h2>Explore</h2>
      <div class="links-grid">
        <a href="/#/about" use:link class="quick-link-card">
          <div class="card-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
          </div>
          <h3>About</h3>
          <p>Education, experience, and background</p>
        </a>
        <a href="/#/projects" use:link class="quick-link-card">
          <div class="card-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <polyline points="16 18 22 12 16 6"/>
              <polyline points="8 6 2 12 8 18"/>
            </svg>
          </div>
          <h3>Projects</h3>
          <p>Technical projects and research</p>
        </a>
        <a href="/#/writings" use:link class="quick-link-card">
          <div class="card-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M12 19l7-7 3 3-7 7-3-3z"/>
              <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/>
              <path d="M2 2l7.586 7.586"/>
              <circle cx="11" cy="11" r="2"/>
            </svg>
          </div>
          <h3>Writings</h3>
          <p>Blog posts and publications</p>
        </a>
        <a href="/#/teachings" use:link class="quick-link-card">
          <div class="card-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
              <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
            </svg>
          </div>
          <h3>Teachings</h3>
          <p>Courses and materials I've taught</p>
        </a>
      </div>
    </div>
  {/if}
</div>

<style>
  .home-page {
    min-height: 100vh;
  }

  .hero {
    padding: 4rem 0 2rem;
    min-height: 70vh;
    display: flex;
    align-items: center;
  }

  .hero-content {
    max-width: 1100px;
    margin: 0 auto;
    padding: 0 2rem;
  }

  .hero-main {
    display: flex;
    align-items: center;
    gap: 4rem;
  }

  .hero-text {
    flex: 1;
    min-width: 0;
  }

  .welcome-text {
    font-size: 1.25rem;
    color: var(--accent-primary);
    font-weight: 500;
    margin-bottom: 0.5rem;
    letter-spacing: 0.02em;
  }

  .hero-title {
    font-size: clamp(2.5rem, 5vw, 3.5rem);
    font-weight: 700;
    line-height: 1.2;
    margin-bottom: 1.5rem;
    color: var(--text-primary);
    letter-spacing: -0.02em;
  }

  .hero-intro {
    font-size: 1.2rem;
    color: var(--text-secondary);
    line-height: 1.7;
    margin-bottom: 1rem;
    max-width: 550px;
  }

  .hero-intro strong {
    color: var(--text-primary);
    font-weight: 600;
  }

  .hero-intro .highlight {
    color: var(--accent-warm);
    font-weight: 500;
  }

  .hero-interests {
    font-size: 1.1rem;
    color: var(--text-secondary);
    line-height: 1.6;
    margin-bottom: 2rem;
  }

  .hero-interests a {
    color: var(--accent-warm);
    text-decoration: underline;
    text-underline-offset: 3px;
    transition: color 0.2s ease;
  }

  .hero-interests a:hover {
    color: var(--accent-warm);
    opacity: 0.8;
  }

  .cta-section {
    margin-bottom: 2rem;
  }

  .read-more-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.875rem 1.5rem;
    background: var(--accent-primary);
    color: white;
    border-radius: 8px;
    font-weight: 500;
    font-size: 1rem;
    transition: all 0.2s ease;
    text-decoration: none;
  }

  .read-more-btn:hover {
    background: var(--accent-secondary);
    transform: translateX(4px);
    color: white;
  }

  .read-more-btn svg {
    transition: transform 0.2s ease;
  }

  .read-more-btn:hover svg {
    transform: translateX(4px);
  }

  .hero-image {
    flex: 0 0 280px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .profile-photo-container {
    position: relative;
    width: 260px;
    height: 260px;
  }
  
  .profile-photo-ring {
    position: absolute;
    inset: -4px;
    border-radius: 50%;
    background: var(--accent-gradient);
    animation: rotate 20s linear infinite;
  }
  
  @keyframes rotate {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  
  .profile-photo {
    position: relative;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
    object-position: center 25%;
    border: 4px solid var(--bg-primary);
    box-shadow: var(--shadow-2xl);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }

  .profile-photo-container:hover .profile-photo {
    transform: scale(1.03);
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
  }

  .hero-links {
    display: flex;
    gap: 0.75rem;
    flex-wrap: wrap;
    align-items: center;
  }

  .contact-link {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.625rem 1rem;
    background: var(--bg-secondary);
    color: var(--text-secondary);
    border: 1px solid var(--border-color);
    border-radius: 8px;
    font-weight: 500;
    font-size: 0.875rem;
    transition: all 0.2s ease;
    cursor: pointer;
    text-decoration: none;
  }

  .contact-link:hover {
    background: var(--bg-tertiary);
    color: var(--text-primary);
    border-color: var(--accent-primary);
  }

  .contact-link.active {
    background: var(--accent-primary);
    color: white;
    border-color: var(--accent-primary);
  }

  .dynamic-section {
    max-width: 700px;
    margin: 2rem auto;
    padding: 0 2rem;
  }

  /* Quick Links Section */
  .quick-links {
    max-width: 1100px;
    margin: 0 auto;
    padding: 3rem 2rem 4rem;
  }

  .quick-links h2 {
    font-size: 1.5rem;
    font-weight: 600;
    color: var(--text-primary);
    margin-bottom: 1.5rem;
    position: relative;
  }

  .quick-links h2::after {
    content: '';
    position: absolute;
    bottom: -0.5rem;
    left: 0;
    width: 2.5rem;
    height: 3px;
    background: var(--accent-gradient);
    border-radius: 2px;
  }

  .links-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 1.25rem;
  }

  .quick-link-card {
    padding: 1.5rem;
    background: var(--bg-secondary);
    border: 1px solid var(--border-color);
    border-radius: 12px;
    text-decoration: none;
    transition: all 0.2s ease;
  }

  .quick-link-card:hover {
    background: var(--bg-tertiary);
    border-color: var(--accent-primary);
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
  }

  .card-icon {
    margin-bottom: 0.75rem;
    color: var(--accent-primary);
  }

  .card-icon svg {
    width: 28px;
    height: 28px;
  }

  .quick-link-card h3 {
    font-size: 1.1rem;
    font-weight: 600;
    color: var(--text-primary);
    margin-bottom: 0.5rem;
  }

  .quick-link-card p {
    font-size: 0.875rem;
    color: var(--text-tertiary);
    margin: 0;
    line-height: 1.5;
  }

  @media (max-width: 768px) {
    .hero {
      padding: 2rem 0;
      min-height: auto;
    }

    .hero-main {
      flex-direction: column;
      gap: 2rem;
      text-align: center;
    }

    .hero-text {
      order: 2;
    }

    .hero-image {
      order: 1;
      flex: none;
    }

    .profile-photo-container {
      width: 200px;
      height: 200px;
    }

    .hero-intro,
    .hero-interests {
      text-align: center;
      max-width: 100%;
    }

    .cta-section {
      display: flex;
      justify-content: center;
    }

    .hero-links {
      justify-content: center;
    }

    .quick-links h2 {
      text-align: center;
    }

    .quick-links h2::after {
      left: 50%;
      transform: translateX(-50%);
    }
  }

  @media (max-width: 480px) {
    .profile-photo-container {
      width: 160px;
      height: 160px;
    }

    .hero-links {
      flex-direction: column;
      width: 100%;
    }

    .contact-link {
      width: 100%;
      justify-content: center;
    }

    .links-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
