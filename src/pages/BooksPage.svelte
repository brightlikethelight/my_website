<script lang="ts">
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';
  
  let mounted = false;
  let selectedCategory = 'all';
  
  onMount(() => {
    document.title = "Favorite Books - Bright Liu";
    mounted = true;
  });

  const categories = ['all', 'AI & Technology', 'Mathematics', 'Philosophy', 'Science', 'Fiction'];

  const books = [
    {
      id: 1,
      title: 'Superintelligence',
      author: 'Nick Bostrom',
      category: 'AI & Technology',
      description: 'A foundational text on the potential risks and challenges of artificial general intelligence.',
      why: 'Essential reading for anyone interested in AI safety and the long-term future of humanity.',
      year: '2014'
    },
    {
      id: 2,
      title: 'The Alignment Problem',
      author: 'Brian Christian',
      category: 'AI & Technology',
      description: 'An accessible exploration of the challenges in building AI systems that do what we want.',
      why: 'Brilliantly connects technical AI alignment challenges with broader philosophical questions.',
      year: '2020'
    },
    {
      id: 3,
      title: 'Gödel, Escher, Bach',
      author: 'Douglas Hofstadter',
      category: 'Mathematics',
      description: 'A Pulitzer Prize-winning exploration of consciousness, self-reference, and formal systems.',
      why: 'Changed how I think about recursion, consciousness, and the nature of meaning.',
      year: '1979'
    },
    {
      id: 4,
      title: 'The Structure of Scientific Revolutions',
      author: 'Thomas Kuhn',
      category: 'Philosophy',
      description: 'A landmark work on how scientific paradigms shift and evolve.',
      why: 'Provides crucial perspective on how knowledge advances and why paradigm shifts are so difficult.',
      year: '1962'
    },
    {
      id: 5,
      title: 'Thinking, Fast and Slow',
      author: 'Daniel Kahneman',
      category: 'Science',
      description: 'Nobel laureate\'s exploration of the two systems that drive how we think.',
      why: 'Understanding cognitive biases is essential for both research and daily decision-making.',
      year: '2011'
    },
    {
      id: 6,
      title: 'The Elegant Universe',
      author: 'Brian Greene',
      category: 'Science',
      description: 'An introduction to string theory and the quest for a unified theory of physics.',
      why: 'Made complex physics accessible and sparked my interest in theoretical physics.',
      year: '1999'
    },
    {
      id: 7,
      title: 'Meditations',
      author: 'Marcus Aurelius',
      category: 'Philosophy',
      description: 'Personal writings of the Roman Emperor on Stoic philosophy.',
      why: 'Timeless wisdom on resilience, perspective, and living a meaningful life.',
      year: '~180 AD'
    },
    {
      id: 8,
      title: 'The Three-Body Problem',
      author: 'Liu Cixin',
      category: 'Fiction',
      description: 'Hard science fiction exploring first contact and the Fermi paradox.',
      why: 'Combines rigorous scientific thinking with compelling storytelling about humanity\'s place in the universe.',
      year: '2008'
    }
  ];

  $: filteredBooks = selectedCategory === 'all' 
    ? books 
    : books.filter(b => b.category === selectedCategory);
</script>

<div class="books-page">
  <header class="page-header">
    <div class="header-content">
      {#if mounted}
        <h1 in:fade={{ duration: 400 }}>Favorite Books</h1>
        <p class="subtitle" in:fade={{ duration: 400, delay: 100 }}>
          Books that have shaped my thinking
        </p>
      {:else}
        <h1>Favorite Books</h1>
        <p class="subtitle">Books that have shaped my thinking</p>
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
    <div class="books-grid">
      {#each filteredBooks as book, index (book.id)}
        <article 
          class="book-card" 
          in:fade={{ duration: 300, delay: index * 50 }}
        >
          <div class="book-header">
            <span class="book-category">{book.category}</span>
            <span class="book-year">{book.year}</span>
          </div>
          <h3 class="book-title">{book.title}</h3>
          <p class="book-author">by {book.author}</p>
          <p class="book-description">{book.description}</p>
          <div class="book-why">
            <span class="why-label">Why I recommend it:</span>
            <p>{book.why}</p>
          </div>
        </article>
      {/each}
    </div>

    {#if filteredBooks.length === 0}
      <div class="no-books">
        <p>No books in this category yet.</p>
      </div>
    {/if}
  </main>
</div>

<style>
  .books-page {
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
    max-width: 1000px;
    margin: 0 auto;
    padding: 2rem;
  }

  .books-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
  }

  .book-card {
    padding: 1.5rem;
    background: var(--bg-secondary);
    border: 1px solid var(--border-color);
    border-radius: 12px;
    transition: all 0.2s ease;
  }

  .book-card:hover {
    border-color: var(--accent-primary);
    box-shadow: var(--shadow-md);
    transform: translateY(-2px);
  }

  .book-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.75rem;
  }

  .book-category {
    padding: 0.25rem 0.625rem;
    background: var(--accent-primary);
    color: white;
    border-radius: 4px;
    font-size: 0.7rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.03em;
  }

  .book-year {
    font-size: 0.8rem;
    color: var(--text-tertiary);
  }

  .book-title {
    font-size: 1.15rem;
    font-weight: 600;
    color: var(--text-primary);
    margin-bottom: 0.25rem;
    line-height: 1.3;
  }

  .book-author {
    font-size: 0.9rem;
    color: var(--accent-primary);
    margin-bottom: 0.75rem;
    font-weight: 500;
  }

  .book-description {
    font-size: 0.9rem;
    color: var(--text-secondary);
    line-height: 1.6;
    margin-bottom: 1rem;
  }

  .book-why {
    padding-top: 1rem;
    border-top: 1px solid var(--border-color);
  }

  .why-label {
    font-size: 0.7rem;
    font-weight: 600;
    color: var(--text-tertiary);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    display: block;
    margin-bottom: 0.375rem;
  }

  .book-why p {
    font-size: 0.85rem;
    color: var(--text-secondary);
    margin: 0;
    line-height: 1.5;
    font-style: italic;
  }

  .no-books {
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

    .books-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
