<script lang="ts">
  import { navigate } from './router';
  import { getPost } from './writing';

  export let slug: string;

  const post = getPost(slug);
</script>

<section class="section">
  {#if post}
    <button class="back-link" on:click={() => navigate('/writing')}>
      &larr; Writing
    </button>

    <article class="article">
      <header class="article-header">
        <h1 class="article-title">{post.title}</h1>
        <time class="article-date">{post.date}</time>
      </header>

      <div class="article-body">
        {@html post.html}
      </div>
    </article>
  {:else}
    <p>Post not found.</p>
    <button class="back-link" on:click={() => navigate('/writing')}>
      &larr; Back to writing
    </button>
  {/if}
</section>

<style>
  .back-link {
    display: inline-block;
    background: none;
    border: none;
    cursor: pointer;
    color: var(--text-tertiary);
    font-size: 0.9rem;
    padding: 0;
    margin-bottom: 2rem;
    transition: color 0.2s ease;
  }

  .back-link:hover {
    color: var(--accent-primary);
  }

  .article-header {
    margin-bottom: 3rem;
  }

  .article-title {
    font-size: clamp(1.75rem, 4vw, 2.5rem);
    line-height: 1.2;
    margin-bottom: 0.75rem;
  }

  .article-date {
    font-size: 0.9rem;
    color: var(--text-tertiary);
  }

  .article-body {
    line-height: 1.75;
    color: var(--text-secondary);
  }

  .article-body :global(h2) {
    font-size: 1.5rem;
    margin-top: 2.5rem;
    margin-bottom: 1rem;
    color: var(--text-primary);
  }

  .article-body :global(h3) {
    font-size: 1.25rem;
    margin-top: 2rem;
    margin-bottom: 0.75rem;
    color: var(--text-primary);
  }

  .article-body :global(p) {
    margin-bottom: 1.25rem;
    font-size: 1.05rem;
  }

  .article-body :global(ul),
  .article-body :global(ol) {
    margin: 1rem 0;
    padding-left: 1.5rem;
  }

  .article-body :global(li) {
    margin-bottom: 0.5rem;
    font-size: 1.05rem;
  }

  .article-body :global(code) {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.9em;
    background: var(--bg-tertiary);
    padding: 0.15rem 0.4rem;
    border-radius: 4px;
  }

  .article-body :global(pre) {
    background: var(--bg-secondary);
    border: 1px solid var(--border-color);
    border-radius: 8px;
    padding: 1.25rem;
    overflow-x: auto;
    margin: 1.5rem 0;
  }

  .article-body :global(pre code) {
    background: none;
    padding: 0;
  }

  .article-body :global(blockquote) {
    border-left: 3px solid var(--accent-primary);
    margin: 1.5rem 0;
    padding: 0.5rem 1.25rem;
    color: var(--text-tertiary);
  }

  .article-body :global(a) {
    color: var(--accent-primary);
    text-decoration: underline;
    text-underline-offset: 2px;
  }

  .article-body :global(hr) {
    border: none;
    border-top: 1px solid var(--border-color);
    margin: 2rem 0;
  }
</style>
