<script lang="ts">
</script>

<section class="section">
  <h2>Selected Awards</h2>

  <div class="awards-list">
    <div class="award-item">
      <span class="award-name">Harvard Advanced Data Science Kaggle Competition, 1st Place</span>
      <span class="award-year">2025</span>
    </div>
    <div class="award-item">
      <span class="award-name">MIT iQuHACK Quantum Computing Hackathon, 1st Place</span>
      <span class="award-year">2025</span>
    </div>
    <div class="award-item">
      <span class="award-name">MIT Mystery Puzzle Hunt, 1st Place</span>
      <span class="award-year">2023</span>
    </div>
  </div>
</section>

<style>
  .awards-list {
    display: flex;
    flex-direction: column;
  }

  .award-item {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    padding: 1rem 0;
    border-bottom: 1px solid var(--border-color);
    gap: 2rem;
  }

  .award-item:last-child {
    border-bottom: none;
  }

  .award-name {
    color: var(--text-primary);
    font-size: 1rem;
    line-height: 1.5;
  }

  .award-year {
    color: var(--text-tertiary);
    font-size: 0.9rem;
    white-space: nowrap;
    flex-shrink: 0;
  }

  @media (max-width: 640px) {
    .award-item {
      flex-direction: column;
      gap: 0.25rem;
    }
  }
</style>
