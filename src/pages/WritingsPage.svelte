<script lang="ts">
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';
  import Publications from '../lib/Publications.svelte';
  
  let mounted = false;
  let activeTab = 'publications';
  
  onMount(() => {
    document.title = "Writings - Bright Liu";
    mounted = true;
  });

  // Blog posts / writings - can be expanded later
  const blogPosts = [
    {
      id: 'ai-safety-intro',
      title: 'An Introduction to AI Safety Research',
      excerpt: 'Exploring the fundamental challenges and approaches in ensuring AI systems remain beneficial and aligned with human values.',
      date: 'Coming Soon',
      category: 'AI Safety',
      readTime: '10 min read',
      status: 'draft'
    },
    {
      id: 'quant-finance-ml',
      title: 'Machine Learning in Quantitative Finance',
      excerpt: 'How modern ML techniques are transforming algorithmic trading and risk management.',
      date: 'Coming Soon',
      category: 'Finance',
      readTime: '8 min read',
      status: 'draft'
    }
  ];
</script>

<div class="writings-page">
  <header class="page-header">
    <div class="header-content">
      {#if mounted}
        <h1 in:fade={{ duration: 400 }}>Writings</h1>
        <p class="subtitle" in:fade={{ duration: 400, delay: 100 }}>
          Publications, blog posts, and technical reports
        </p>
      {:else}
        <h1>Writings</h1>
        <p class="subtitle">Publications, blog posts, and technical reports</p>
      {/if}
    </div>
  </header>

  <nav class="tab-nav">
    <button 
      class="tab-btn" 
      class:active={activeTab === 'publications'}
      on:click={() => activeTab = 'publications'}
    >
      Publications
    </button>
    <button 
      class="tab-btn" 
      class:active={activeTab === 'blog'}
      on:click={() => activeTab = 'blog'}
    >
      Blog Posts
    </button>
  </nav>

  <main class="content">
    {#if activeTab === 'publications'}
      <section class="section" in:fade={{ duration: 300 }}>
        <Publications />
      </section>
    {/if}

    {#if activeTab === 'blog'}
      <section class="section blog-section" in:fade={{ duration: 300 }}>
        <h2>Blog Posts</h2>
        <p class="coming-soon-note">
          I'm working on some blog posts. Check back soon!
        </p>
        <div class="blog-grid">
          {#each blogPosts as post}
            <article class="blog-card" class:draft={post.status === 'draft'}>
              <div class="blog-meta">
                <span class="blog-category">{post.category}</span>
                <span class="blog-date">{post.date}</span>
              </div>
              <h3>{post.title}</h3>
              <p>{post.excerpt}</p>
              <div class="blog-footer">
                <span class="read-time">{post.readTime}</span>
                {#if post.status === 'draft'}
                  <span class="draft-badge">Coming Soon</span>
                {/if}
              </div>
            </article>
          {/each}
        </div>
      </section>
    {/if}
  </main>
</div>

<style>
  .writings-page {
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

  .tab-nav {
    display: flex;
    justify-content: center;
    gap: 0.5rem;
    padding: 1rem 2rem;
    background: var(--bg-primary);
    border-bottom: 1px solid var(--border-color);
    position: sticky;
    top: 60px;
    z-index: 100;
  }

  .tab-btn {
    padding: 0.625rem 1.25rem;
    background: transparent;
    border: 1px solid transparent;
    border-radius: 6px;
    font-size: 0.9rem;
    font-weight: 500;
    color: var(--text-secondary);
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .tab-btn:hover {
    background: var(--bg-secondary);
    color: var(--text-primary);
  }

  .tab-btn.active {
    background: var(--accent-primary);
    color: white;
    border-color: var(--accent-primary);
  }

  .content {
    max-width: 900px;
    margin: 0 auto;
    padding: 2rem;
  }

  .section {
    margin-bottom: 2rem;
  }

  .section h2 {
    font-size: 1.5rem;
    font-weight: 600;
    color: var(--text-primary);
    margin-bottom: 1rem;
    position: relative;
  }

  .section h2::after {
    content: '';
    position: absolute;
    bottom: -0.5rem;
    left: 0;
    width: 2.5rem;
    height: 3px;
    background: var(--accent-gradient);
    border-radius: 2px;
  }

  .coming-soon-note {
    color: var(--text-tertiary);
    font-style: italic;
    margin-bottom: 1.5rem;
  }

  .blog-grid {
    display: grid;
    gap: 1.5rem;
  }

  .blog-card {
    padding: 1.5rem;
    background: var(--bg-secondary);
    border: 1px solid var(--border-color);
    border-radius: 12px;
    transition: all 0.2s ease;
  }

  .blog-card:hover {
    border-color: var(--accent-primary);
    box-shadow: var(--shadow-md);
  }

  .blog-card.draft {
    opacity: 0.7;
  }

  .blog-meta {
    display: flex;
    gap: 1rem;
    margin-bottom: 0.75rem;
  }

  .blog-category {
    padding: 0.25rem 0.625rem;
    background: var(--accent-primary);
    color: white;
    border-radius: 4px;
    font-size: 0.75rem;
    font-weight: 600;
  }

  .blog-date {
    color: var(--text-tertiary);
    font-size: 0.85rem;
  }

  .blog-card h3 {
    font-size: 1.2rem;
    font-weight: 600;
    color: var(--text-primary);
    margin-bottom: 0.5rem;
  }

  .blog-card p {
    color: var(--text-secondary);
    font-size: 0.95rem;
    line-height: 1.6;
    margin-bottom: 1rem;
  }

  .blog-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .read-time {
    color: var(--text-tertiary);
    font-size: 0.8rem;
  }

  .draft-badge {
    padding: 0.25rem 0.5rem;
    background: var(--bg-tertiary);
    color: var(--text-tertiary);
    border-radius: 4px;
    font-size: 0.75rem;
    font-weight: 500;
  }

  @media (max-width: 768px) {
    .tab-nav {
      top: 56px;
    }

    .content {
      padding: 1.5rem 1rem;
    }
  }
</style>
