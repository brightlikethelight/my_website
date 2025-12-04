<script lang="ts">

  const honors = [
    {
      id: 'harvard-kaggle-2025',
      place: '1st',
      title: '2025 Harvard Advanced Data Science Kaggle Competition',
      description: 'Implemented ensemble deep learning model for financial time series prediction, achieving 0.937 AUC',
      date: '2025',
      participants: 'Top 1 out of 150+ teams',
      category: 'Data Science',
      medal: '🥇',
      details: 'Private leaderboard score: 0.937, 4% improvement over 2nd place'
    },
    {
      id: 'mit-quantum-2025',
      place: '1st', 
      title: '2025 MIT Quantum Hackathon (iQuHACK)',
      description: 'Simulated superconducting cat qubit dynamics using GPU-accelerated dynamiqs software at both effective Hamiltonian and hardware levels. Explored circuit-level quantum error correction with cat qubits to reduce hardware overhead and increase robustness against quantum errors.',
      date: '2025',
      participants: 'Top 1 out of 200+ participants',
      category: 'Quantum Computing',
      medal: '🥇',
      details: 'Presented innovative quantum computing scalability solutions addressing hardware overhead reduction'
    },
    {
      id: 'mit-puzzle-2023',
      place: '1st',
      title: '2023 MIT Mystery Puzzle Hunt',
      description: 'Led team in solving cryptic puzzles combining math, CS, and lateral thinking',
      date: '2023',
      participants: 'Top 1 out of 400 teams',
      category: 'Problem Solving',
      medal: '🥇',
      details: 'Completed meta-puzzle in 48 hours, fastest solve time'
    }
  ];

  let hoveredHonor: string | null = null;
</script>

<section class="section">
  <h2>Honors & Competitions</h2>
  
  <div class="honors-grid">
    {#each honors as honor, index}
      <div 
        class="honor-card"
        class:hovered={hoveredHonor === honor.id}
        class:first-place={honor.place === '1st'}
        on:mouseenter={() => hoveredHonor = honor.id}
        on:mouseleave={() => hoveredHonor = null}
        role="button"
        tabindex="0"
      >
        <div class="honor-header">
          <div class="medal-section">
            <div class="medal">{honor.medal}</div>
            <div class="place-badge">{honor.place} Place</div>
          </div>
          <div class="category-badge">{honor.category}</div>
        </div>
        
        <div class="honor-content">
          <h3 class="honor-title">{honor.title}</h3>
          <p class="honor-description">{honor.description}</p>
          
          <div class="honor-details">
            <div class="detail-item">
              <span class="detail-label">Year:</span>
              <span class="detail-value">{honor.date}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Achievement:</span>
              <span class="detail-value">{honor.participants}</span>
            </div>
            {#if honor.details}
            <div class="detail-item">
              <span class="detail-label">Results:</span>
              <span class="detail-value">{honor.details}</span>
            </div>
            {/if}
          </div>
        </div>
        
        <div class="honor-glow"></div>
      </div>
    {/each}
  </div>
</section>

<style>
  .honors-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 2rem;
    margin-top: 2rem;
  }

  .honor-card {
    position: relative;
    background: var(--glass-bg);
    backdrop-filter: blur(20px);
    border: 1px solid var(--glass-border);
    border-radius: 20px;
    padding: 2rem;
    cursor: pointer;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    overflow: hidden;
    transform-origin: center;
  }

  .honor-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(135deg, #ffd700 0%, #ffb347 50%, #ff6b6b 100%);
    border-radius: 20px 20px 0 0;
  }

  .honor-card:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: 0 20px 40px -12px rgba(255, 215, 0, 0.3), var(--shadow-xl);
    border-color: #ffd700;
  }
  
  .honor-card.first-place {
    background: linear-gradient(135deg, 
      rgba(255, 215, 0, 0.05) 0%, 
      rgba(248, 249, 250, 0.98) 20%, 
      rgba(248, 249, 250, 0.98) 80%, 
      rgba(255, 179, 71, 0.05) 100%);
  }
  
  :global([data-theme="dark"]) .honor-card.first-place {
    background: linear-gradient(135deg, 
      rgba(255, 215, 0, 0.08) 0%, 
      rgba(15, 20, 25, 0.98) 20%, 
      rgba(15, 20, 25, 0.98) 80%, 
      rgba(255, 179, 71, 0.08) 100%);
  }

  .honor-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 1.5rem;
    min-height: 60px;
  }

  .medal-section {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .medal {
    font-size: 3rem;
    filter: drop-shadow(0 4px 8px rgba(255, 215, 0, 0.4));
  }

  .place-badge {
    background: linear-gradient(135deg, #ffd700 0%, #ffb347 100%);
    color: #1a1a1a;
    padding: 0.5rem 1rem;
    border-radius: 20px;
    font-weight: 700;
    font-size: 0.9rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    box-shadow: 0 4px 15px rgba(255, 215, 0, 0.4);
  }

  .category-badge {
    background: var(--accent-primary);
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 8px;
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    white-space: nowrap;
    border: 1px solid var(--border-color);
    box-shadow: var(--shadow-sm);
    flex-shrink: 0;
  }

  .honor-content {
    position: relative;
    z-index: 2;
  }

  .honor-title {
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--text-primary);
    margin-bottom: 0.75rem;
    line-height: 1.3;
  }

  .honor-description {
    color: var(--text-secondary);
    line-height: 1.6;
    margin-bottom: 1.5rem;
    font-size: 1rem;
  }

  .honor-details {
    display: grid;
    gap: 0.75rem;
  }

  .detail-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.75rem;
    background: var(--bg-tertiary);
    border-radius: 10px;
    border: 1px solid var(--border-color);
  }

  .detail-label {
    font-size: 0.85rem;
    font-weight: 600;
    color: var(--text-tertiary);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .detail-value {
    font-size: 0.95rem;
    font-weight: 600;
    color: var(--text-primary);
  }

  .honor-glow {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100px;
    height: 100px;
    background: radial-gradient(circle, rgba(255, 215, 0, 0.3) 0%, transparent 70%);
    transform: translate(-50%, -50%);
    opacity: 0;
    transition: opacity 0.4s ease;
    pointer-events: none;
  }

  .honor-card.hovered .honor-glow {
    opacity: 0.3;
  }

  @media (max-width: 768px) {
    .honors-grid {
      grid-template-columns: 1fr;
      gap: 1.5rem;
    }

    .honor-card {
      padding: 1.5rem;
    }

    .honor-header {
      flex-direction: row;
      flex-wrap: wrap;
      gap: 1rem;
      align-items: flex-start;
      min-height: auto;
    }

    .category-badge {
      order: 3;
      align-self: flex-end;
    }

    .medal {
      font-size: 2.5rem;
    }

    .honor-card:hover {
      box-shadow: var(--shadow-md);
    }

    .detail-item {
      flex-direction: column;
      align-items: flex-start;
      gap: 0.25rem;
    }
  }
</style>