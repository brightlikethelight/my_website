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
          <span class="degree">Mathematics & Computer Science + M.S. Statistics</span>
        </div>

        <p class="hero-description">
          I'm a student at Harvard studying mathematics and statistics.
          My research interests include deep learning, quantitative methods,
          and high-performance computing.
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
          alt="Bright Liu"
          class="profile-photo"
        />
      </div>
    </div>
  </div>
</div>

{#if showContactForm}
  <div class="dynamic-section" transition:slide>
    <ContactForm />
  </div>
{/if}

<style>
  .hero {
    padding: 5rem 0 3rem;
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
    flex: 0 0 240px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .profile-photo {
    width: 220px;
    height: 220px;
    border-radius: 12px;
    object-fit: cover;
    object-position: center 25%;
    border: 1px solid var(--border-color);
  }

  .hero-title {
    font-size: clamp(2.5rem, 6vw, 3.5rem);
    font-weight: 700;
    line-height: 1.2;
    margin-bottom: 1.5rem;
    color: var(--text-primary);
  }

  .hero-subtitle {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.25rem;
    margin-bottom: 1.5rem;
  }

  .education {
    font-size: clamp(1rem, 2vw, 1.2rem);
    font-weight: 600;
    color: var(--accent-primary);
  }

  .degree {
    font-size: clamp(1rem, 2vw, 1.2rem);
    font-weight: 500;
    color: var(--text-secondary);
  }

  .hero-description {
    font-size: 1.05rem;
    color: var(--text-secondary);
    max-width: 540px;
    margin: 0 0 2rem 0;
    line-height: 1.7;
  }

  .hero-links {
    display: flex;
    gap: 0.75rem;
    justify-content: flex-start;
    align-items: center;
  }

  .contact-link {
    padding: 0.6rem 1.25rem;
    background: var(--bg-secondary);
    color: var(--text-secondary);
    border: 1px solid var(--border-color);
    border-radius: 6px;
    font-weight: 500;
    font-size: 0.9rem;
    transition: color 0.2s ease, border-color 0.2s ease;
    text-align: center;
    cursor: pointer;
  }

  .contact-link:hover {
    color: var(--accent-primary);
    border-color: var(--accent-primary);
  }

  .contact-link.active {
    color: var(--accent-primary);
    border-color: var(--accent-primary);
  }

  .dynamic-section {
    max-width: 800px;
    margin: 2rem auto 0;
    padding: 0 2rem;
  }

  @media (max-width: 768px) {
    .hero {
      padding: 3rem 1rem;
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
      width: 180px;
      height: 180px;
    }

    .hero-subtitle {
      align-items: center;
    }

    .hero-description {
      text-align: center;
      margin: 0 auto 2rem;
    }

    .hero-links {
      justify-content: center;
    }
  }

  @media (max-width: 480px) {
    .profile-photo {
      width: 150px;
      height: 150px;
    }

    .hero-links {
      flex-direction: column;
      gap: 0.5rem;
      align-items: stretch;
    }

    .contact-link {
      text-align: center;
    }
  }
</style>
