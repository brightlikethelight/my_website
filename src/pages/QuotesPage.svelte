<script lang="ts">
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';
  
  let mounted = false;
  let selectedCategory = 'all';
  
  onMount(() => {
    document.title = "Quotes - Bright Liu";
    mounted = true;
  });

  const categories = ['all', 'AI & Technology', 'Mathematics', 'Philosophy', 'Science', 'Life'];

  const quotes = [
    {
      id: 1,
      text: "The question of whether a computer can think is no more interesting than the question of whether a submarine can swim.",
      author: "Edsger W. Dijkstra",
      category: "AI & Technology",
      note: "A reminder that the framing of questions matters as much as the answers."
    },
    {
      id: 2,
      text: "Mathematics is the language with which God has written the universe.",
      author: "Galileo Galilei",
      category: "Mathematics",
      note: "The elegance of mathematical descriptions of natural phenomena never ceases to amaze me."
    },
    {
      id: 3,
      text: "The only way to do great work is to love what you do.",
      author: "Steve Jobs",
      category: "Life",
      note: "Passion is the foundation of meaningful contribution."
    },
    {
      id: 4,
      text: "In theory, there is no difference between theory and practice. In practice, there is.",
      author: "Yogi Berra",
      category: "Science",
      note: "A humbling reminder for anyone working in applied research."
    },
    {
      id: 5,
      text: "The measure of intelligence is the ability to change.",
      author: "Albert Einstein",
      category: "Philosophy",
      note: "Adaptability and learning are the true markers of intelligence."
    },
    {
      id: 6,
      text: "We can only see a short distance ahead, but we can see plenty there that needs to be done.",
      author: "Alan Turing",
      category: "AI & Technology",
      note: "Turing's pragmatic optimism about the future of computing."
    },
    {
      id: 7,
      text: "A mathematician is a device for turning coffee into theorems.",
      author: "Paul Erdős",
      category: "Mathematics",
      note: "The dedication required for mathematical research, with a touch of humor."
    },
    {
      id: 8,
      text: "The important thing is not to stop questioning. Curiosity has its own reason for existing.",
      author: "Albert Einstein",
      category: "Science",
      note: "Curiosity drives all meaningful discovery."
    }
  ];

  $: filteredQuotes = selectedCategory === 'all' 
    ? quotes 
    : quotes.filter(q => q.category === selectedCategory);
</script>

<div class="quotes-page">
  <header class="page-header">
    <div class="header-content">
      {#if mounted}
        <h1 in:fade={{ duration: 400 }}>Quotes & Ideas</h1>
        <p class="subtitle" in:fade={{ duration: 400, delay: 100 }}>
          Thoughts and quotes that inspire my work
        </p>
      {:else}
        <h1>Quotes & Ideas</h1>
        <p class="subtitle">Thoughts and quotes that inspire my work</p>
      {/if}
    </div>
  </header>

  <nav class="filter-nav">
    {#each categories as category}
      <button 
        class="filter-btn" 
        class:active={selectedCategory === category}
        on:click={() => selectedCategory = category}
      >
        {category === 'all' ? 'All' : category}
      </button>
    {/each}
  </nav>

  <main class="content">
    <div class="quotes-grid">
      {#each filteredQuotes as quote, index (quote.id)}
        <article 
          class="quote-card" 
          in:fade={{ duration: 300, delay: index * 50 }}
        >
          <div class="quote-content">
            <blockquote>"{quote.text}"</blockquote>
            <cite>— {quote.author}</cite>
          </div>
          {#if quote.note}
            <div class="quote-note">
              <span class="note-label">My thoughts:</span>
              <p>{quote.note}</p>
            </div>
          {/if}
          <div class="quote-category">
            <span class="category-tag">{quote.category}</span>
          </div>
        </article>
      {/each}
    </div>

    {#if filteredQuotes.length === 0}
      <div class="no-quotes">
        <p>No quotes in this category yet.</p>
      </div>
    {/if}
  </main>
</div>

<style>
  .quotes-page {
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

  .filter-nav {
    display: flex;
    justify-content: center;
    gap: 0.5rem;
    padding: 1rem 2rem;
    background: var(--bg-primary);
    border-bottom: 1px solid var(--border-color);
    position: sticky;
    top: 60px;
    z-index: 100;
    flex-wrap: wrap;
  }

  .filter-btn {
    padding: 0.5rem 1rem;
    background: transparent;
    border: 1px solid var(--border-color);
    border-radius: 20px;
    font-size: 0.85rem;
    font-weight: 500;
    color: var(--text-secondary);
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .filter-btn:hover {
    background: var(--bg-secondary);
    color: var(--text-primary);
    border-color: var(--accent-primary);
  }

  .filter-btn.active {
    background: var(--accent-primary);
    color: white;
    border-color: var(--accent-primary);
  }

  .content {
    max-width: 900px;
    margin: 0 auto;
    padding: 2rem;
  }

  .quotes-grid {
    display: grid;
    gap: 1.5rem;
  }

  .quote-card {
    padding: 1.75rem;
    background: var(--bg-secondary);
    border: 1px solid var(--border-color);
    border-radius: 12px;
    transition: all 0.2s ease;
    position: relative;
  }

  .quote-card:hover {
    border-color: var(--accent-primary);
    box-shadow: var(--shadow-md);
  }

  .quote-card::before {
    content: '"';
    position: absolute;
    top: 0.5rem;
    left: 1rem;
    font-size: 4rem;
    color: var(--accent-primary);
    opacity: 0.15;
    font-family: Georgia, serif;
    line-height: 1;
  }

  .quote-content {
    position: relative;
    z-index: 1;
  }

  blockquote {
    font-size: 1.15rem;
    line-height: 1.7;
    color: var(--text-primary);
    margin: 0 0 1rem 0;
    font-style: italic;
  }

  cite {
    display: block;
    font-size: 0.95rem;
    color: var(--accent-primary);
    font-style: normal;
    font-weight: 500;
  }

  .quote-note {
    margin-top: 1.25rem;
    padding-top: 1rem;
    border-top: 1px solid var(--border-color);
  }

  .note-label {
    font-size: 0.75rem;
    font-weight: 600;
    color: var(--text-tertiary);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    display: block;
    margin-bottom: 0.5rem;
  }

  .quote-note p {
    font-size: 0.9rem;
    color: var(--text-secondary);
    margin: 0;
    line-height: 1.6;
  }

  .quote-category {
    margin-top: 1rem;
  }

  .category-tag {
    display: inline-block;
    padding: 0.25rem 0.75rem;
    background: var(--bg-tertiary);
    color: var(--text-tertiary);
    border-radius: 4px;
    font-size: 0.75rem;
    font-weight: 500;
  }

  .no-quotes {
    text-align: center;
    padding: 3rem;
    color: var(--text-tertiary);
  }

  @media (max-width: 768px) {
    .filter-nav {
      top: 56px;
      gap: 0.375rem;
    }

    .filter-btn {
      padding: 0.375rem 0.75rem;
      font-size: 0.8rem;
    }

    .content {
      padding: 1.5rem 1rem;
    }

    blockquote {
      font-size: 1.05rem;
    }
  }
</style>
