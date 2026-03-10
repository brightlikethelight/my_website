<script lang="ts">
  import { navigate } from './router';
  import { getAllPosts } from './writing';

  const posts = getAllPosts();
</script>

<section class="section">
  <h2>Writing</h2>

  {#if posts.length === 0}
    <p class="empty">Nothing here yet.</p>
  {:else}
    <div class="post-list">
      {#each posts as post}
        <button
          class="post-item"
          on:click={() => navigate(`/writing/${post.slug}`)}
        >
          <time class="post-date">{post.date}</time>
          <div class="post-info">
            <span class="post-title">{post.title}</span>
            <span class="post-desc">{post.description}</span>
          </div>
        </button>
      {/each}
    </div>
  {/if}
</section>

<style>
  .post-list {
    display: flex;
    flex-direction: column;
  }

  .post-item {
    display: flex;
    align-items: baseline;
    gap: 2rem;
    padding: 1.25rem 0;
    border-bottom: 1px solid var(--border-color);
    background: none;
    border-left: none;
    border-right: none;
    border-top: none;
    cursor: pointer;
    text-align: left;
    width: 100%;
    transition: color 0.2s ease;
  }

  .post-item:first-child {
    border-top: 1px solid var(--border-color);
  }

  .post-item:hover .post-title {
    color: var(--accent-primary);
  }

  .post-date {
    font-size: 0.875rem;
    color: var(--text-tertiary);
    white-space: nowrap;
    flex-shrink: 0;
    font-variant-numeric: tabular-nums;
  }

  .post-info {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    min-width: 0;
  }

  .post-title {
    font-size: 1.1rem;
    font-weight: 500;
    color: var(--text-primary);
    transition: color 0.2s ease;
  }

  .post-desc {
    font-size: 0.9rem;
    color: var(--text-secondary);
    line-height: 1.5;
  }

  .empty {
    color: var(--text-tertiary);
  }

  @media (max-width: 640px) {
    .post-item {
      flex-direction: column;
      gap: 0.25rem;
    }
  }
</style>
