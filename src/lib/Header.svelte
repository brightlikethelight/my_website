<script lang="ts">
  import { slide } from 'svelte/transition';
  import ContactForm from './ContactForm.svelte';
  
  let showContactForm = false;
  
  function toggleContactForm() {
    showContactForm = !showContactForm;
  }
</script>

<div class="hero">
  <div class="hero-content">
    <div class="hero-main">
      <div class="hero-text">
        <h1 class="hero-title">Bright Liu</h1>
        
        <div class="hero-subtitle">
          <span class="education">Harvard University</span>
          <span class="degree">Mathematics & Computer Science + Master of Science in Statistics</span>
        </div>
        
        <p class="hero-description">
          Harvard Mathematics & Statistics student with AWS AI/ML engineering experience. <br/>
          Specializing in quantitative finance, deep learning, and high-performance computing.
        </p>
        
        <div class="hero-links">
          <button 
            on:click={toggleContactForm} 
            class="contact-link"
            class:active={showContactForm}
            aria-label="Toggle contact form"
          >
            Contact
          </button>
          <a href="https://www.linkedin.com/in/bright-liu-701174216" target="_blank" rel="noopener" class="contact-link">LinkedIn</a>
          <a href="https://github.com/brightlikethelight" target="_blank" rel="noopener" class="contact-link">GitHub</a>
        </div>
      </div>
      
      <div class="hero-image">
        <img 
          src="/profile.jpg" 
          alt="Bright Liu - Professional headshot" 
          class="profile-photo"
        />
      </div>
    </div>
  </div>
</div>

<!-- Dynamic sections -->
{#if showContactForm}
  <div class="dynamic-section" transition:slide>
    <ContactForm />
  </div>
{/if}


<style>
  .hero {
    padding: 6rem 0;
    text-align: center;
  }

  .hero-content {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
  }

  .hero-main {
    display: flex;
    align-items: center;
    gap: 4rem;
    text-align: left;
  }

  .hero-text {
    flex: 1;
    min-width: 0;
  }

  .hero-image {
    flex: 0 0 300px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .profile-photo {
    width: 280px;
    height: 280px;
    border-radius: 50%;
    object-fit: cover;
    object-position: center 25%;
    border: 4px solid var(--accent-primary);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }

  .profile-photo:hover {
    transform: scale(1.05);
    box-shadow: 0 12px 48px rgba(0, 0, 0, 0.15);
  }

  .hero-title {
    font-size: clamp(2.5rem, 6vw, 4rem);
    font-weight: 900;
    line-height: 1.2;
    margin-bottom: 1.5rem;
    color: var(--text-primary);
  }

  .hero-subtitle {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
    margin-bottom: 2rem;
  }

  .education {
    font-size: clamp(1.1rem, 2.5vw, 1.4rem);
    font-weight: 700;
    color: var(--accent-primary);
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }

  .degree {
    font-size: clamp(1.25rem, 3vw, 1.75rem);
    font-weight: 600;
    color: var(--text-primary);
    letter-spacing: -0.01em;
  }

  .hero-description {
    font-size: clamp(1rem, 2vw, 1.2rem);
    color: var(--text-secondary);
    max-width: 600px;
    margin: 0 0 3rem 0;
    line-height: 1.6;
  }

  .hero-links {
    display: flex;
    gap: 1rem;
    justify-content: flex-start;
    margin-bottom: 2rem;
    align-items: center;
  }

  .contact-link {
    padding: 0.75rem 1.5rem;
    background: var(--bg-secondary);
    color: var(--text-secondary);
    border: 1px solid var(--border-color);
    border-radius: 8px;
    font-weight: 500;
    font-size: 0.9rem;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    overflow: hidden;
    z-index: 1;
    text-align: center;
    min-width: 100px;
  }
  
  .contact-link::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    background: var(--accent-primary);
    border-radius: 50%;
    transform: translate(-50%, -50%);
    transition: width 0.6s ease, height 0.6s ease;
    z-index: -1;
  }

  .contact-link:hover {
    color: white;
    border-color: var(--accent-primary);
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
  }
  
  .contact-link:hover::before {
    width: 300%;
    height: 300%;
  }

  .contact-link.active {
    background: var(--accent-primary);
    color: white;
    border-color: var(--accent-primary);
  }

  .dynamic-section {
    max-width: 800px;
    margin: 2rem auto 0;
    padding: 0 2rem;
  }


  @media (max-width: 768px) {
    .hero {
      padding: 4rem 1rem;
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

    .profile-photo {
      width: 200px;
      height: 200px;
    }

    .hero-subtitle {
      align-items: center;
    }

    .hero-description {
      text-align: center;
      margin: 0 auto 3rem;
    }

    .hero-links {
      flex-direction: column;
      gap: 0.75rem;
      align-items: center;
      justify-content: center;
    }

    .contact-link {
      width: 100%;
      max-width: 280px;
      text-align: center;
    }
  }

  @media (max-width: 480px) {
    .profile-photo {
      width: 160px;
      height: 160px;
    }

    .hero-subtitle {
      gap: 0.25rem;
    }

    .hero-links {
      gap: 0.5rem;
    }
  }
</style>