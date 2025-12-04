<script lang="ts">
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';
  import Education from '../lib/Education.svelte';
  import Experience from '../lib/Experience.svelte';
  
  let mounted = false;
  let activeTab = 'overview';
  
  onMount(() => {
    document.title = "About - Bright Liu";
    mounted = true;
  });

  const honors = [
    {
      id: 'harvard-kaggle-2025',
      place: '1st',
      title: '2025 Harvard Advanced Data Science Kaggle Competition',
      description: 'Applied machine learning techniques to financial data analysis problems',
      date: '2025',
      category: 'Data Science',
      medal: '🥇'
    },
    {
      id: 'mit-quantum-2025',
      place: '1st', 
      title: '2025 MIT Quantum Hackathon (iQuHACK)',
      description: 'Developed quantum computing solutions focusing on scalability and error correction',
      date: '2025',
      category: 'Quantum Computing',
      medal: '🥇'
    },
    {
      id: 'mit-puzzle-2023',
      place: '1st',
      title: '2023 MIT Mystery Puzzle Hunt',
      description: 'Led team in solving complex puzzles combining mathematics, computer science, and logical reasoning',
      date: '2023',
      category: 'Problem Solving',
      medal: '🥇'
    }
  ];

  const skillCategories = [
    {
      id: 'programming',
      title: 'Programming & Development',
      icon: '💻',
      skills: ['Python', 'C++', 'JavaScript/TypeScript', 'SQL', 'MATLAB', 'R'],
      otherSkills: ['NumPy', 'Pandas', 'SciPy', 'Parallel Computing', 'Git', 'Linux/Unix']
    },
    {
      id: 'ml-ai',
      title: 'Machine Learning & AI',
      icon: '🤖',
      skills: ['PyTorch', 'TensorFlow', 'Scikit-learn', 'JAX'],
      otherSkills: ['Transformers', 'OpenCV', 'CUDA', 'Docker']
    },
    {
      id: 'finance',
      title: 'Quantitative Finance',
      icon: '📈',
      skills: ['Options Pricing', 'Statistical Arbitrage', 'Portfolio Optimization', 'Time Series Analysis'],
      otherSkills: ['Black-Scholes Model', 'Greeks', 'Market Making', 'VaR & Risk Management']
    },
    {
      id: 'mathematics',
      title: 'Mathematical Methods',
      icon: '∑',
      skills: ['Stochastic Calculus', 'Linear Algebra', 'Statistics & Probability', 'Optimization Theory'],
      otherSkills: ['Martingale Theory', 'Ito Calculus', 'Numerical Analysis', 'Differential Equations']
    }
  ];

  const activitiesGroups = [
    {
      title: 'Academic Leadership',
      activities: [
        'Captain of Computer Science Peer Concentration Advisors',
        'Undergraduate Advisory Board Member - Harvard SEAS',
        'Harvard Wolfram Ambassador',
        'Event Organizer & Test Writer - Harvard Science Olympiad',
        'Founder of Harvard Book Club'
      ]
    },
    {
      title: 'Athletics & Recreation',
      activities: [
        'Harvard Ultimate Frisbee Team',
        'Cambridge Half Marathon Runner',
        'Harvard Poker Club Member',
        'Harvard MIT Mathematics Tournament Volunteer'
      ]
    },
    {
      title: 'Research Interests',
      activities: [
        'Open Source Contributions & Development',
        'AI Safety & Interpretability Research',
        'Teaching Mathematics, Computer Science & Statistics',
        'Algorithmic Trading & Financial Analysis'
      ]
    },
    {
      title: 'Personal Interests',
      activities: [
        'Choir, Guitar & Piano Performance',
        'Backyard Astronomy & Stargazing',
        'Calisthenics, Meditation, Reading & Hiking'
      ]
    }
  ];
</script>

<div class="about-page">
  <header class="page-header">
    <div class="header-content">
      {#if mounted}
        <h1 in:fade={{ duration: 400 }}>About Me</h1>
        <p class="subtitle" in:fade={{ duration: 400, delay: 100 }}>
          Education, experience, skills, and interests
        </p>
      {:else}
        <h1>About Me</h1>
        <p class="subtitle">Education, experience, skills, and interests</p>
      {/if}
    </div>
  </header>

  <nav class="tab-nav">
    <button 
      class="tab-btn" 
      class:active={activeTab === 'overview'}
      on:click={() => activeTab = 'overview'}
    >
      Overview
    </button>
    <button 
      class="tab-btn" 
      class:active={activeTab === 'skills'}
      on:click={() => activeTab = 'skills'}
    >
      Skills
    </button>
    <button 
      class="tab-btn" 
      class:active={activeTab === 'activities'}
      on:click={() => activeTab = 'activities'}
    >
      Activities
    </button>
    <button 
      class="tab-btn" 
      class:active={activeTab === 'honors'}
      on:click={() => activeTab = 'honors'}
    >
      Honors
    </button>
  </nav>

  <main class="content">
    {#if activeTab === 'overview'}
      <section class="section" in:fade={{ duration: 300 }}>
        <Education />
      </section>
      
      <section class="section" in:fade={{ duration: 300, delay: 100 }}>
        <Experience />
      </section>
    {/if}

    {#if activeTab === 'skills'}
      <section class="section skills-section" in:fade={{ duration: 300 }}>
        <h2>Technical Skills</h2>
        <div class="skills-grid">
          {#each skillCategories as category}
            <div class="skill-category">
              <div class="category-header">
                <span class="category-icon">{category.icon}</span>
                <h3>{category.title}</h3>
              </div>
              <div class="skills-list">
                {#each category.skills as skill}
                  <span class="skill-tag primary">{skill}</span>
                {/each}
              </div>
              {#if category.otherSkills.length > 0}
                <div class="other-skills">
                  {#each category.otherSkills as skill}
                    <span class="skill-tag secondary">{skill}</span>
                  {/each}
                </div>
              {/if}
            </div>
          {/each}
        </div>
      </section>
    {/if}

    {#if activeTab === 'activities'}
      <section class="section activities-section" in:fade={{ duration: 300 }}>
        <h2>Activities & Interests</h2>
        <div class="activities-grid">
          {#each activitiesGroups as group}
            <div class="activity-group">
              <h3>{group.title}</h3>
              <ul>
                {#each group.activities as activity}
                  <li>{activity}</li>
                {/each}
              </ul>
            </div>
          {/each}
        </div>
      </section>
    {/if}

    {#if activeTab === 'honors'}
      <section class="section honors-section" in:fade={{ duration: 300 }}>
        <h2>Honors & Achievements</h2>
        <div class="honors-list">
          {#each honors as honor}
            <div class="honor-card">
              <div class="honor-medal">{honor.medal}</div>
              <div class="honor-content">
                <div class="honor-header">
                  <span class="honor-place">{honor.place} Place</span>
                  <span class="honor-category">{honor.category}</span>
                </div>
                <h3>{honor.title}</h3>
                <p>{honor.description}</p>
                <span class="honor-date">{honor.date}</span>
              </div>
            </div>
          {/each}
        </div>
      </section>
    {/if}
  </main>
</div>

<style>
  .about-page {
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
    margin-bottom: 3rem;
  }

  .section h2 {
    font-size: 1.5rem;
    font-weight: 600;
    color: var(--text-primary);
    margin-bottom: 1.5rem;
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

  /* Skills Section */
  .skills-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.5rem;
  }

  .skill-category {
    padding: 1.5rem;
    background: var(--bg-secondary);
    border: 1px solid var(--border-color);
    border-radius: 12px;
  }

  .category-header {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 1rem;
  }

  .category-icon {
    font-size: 1.5rem;
  }

  .skill-category h3 {
    font-size: 1rem;
    font-weight: 600;
    color: var(--text-primary);
    margin: 0;
  }

  .skills-list {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 0.75rem;
  }

  .skill-tag {
    padding: 0.375rem 0.75rem;
    border-radius: 6px;
    font-size: 0.8rem;
    font-weight: 500;
  }

  .skill-tag.primary {
    background: var(--accent-primary);
    color: white;
  }

  .skill-tag.secondary {
    background: var(--bg-tertiary);
    color: var(--text-secondary);
    border: 1px solid var(--border-color);
  }

  .other-skills {
    display: flex;
    flex-wrap: wrap;
    gap: 0.375rem;
    padding-top: 0.75rem;
    border-top: 1px solid var(--border-color);
  }

  /* Activities Section */
  .activities-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
  }

  .activity-group {
    padding: 1.5rem;
    background: var(--bg-secondary);
    border: 1px solid var(--border-color);
    border-radius: 12px;
  }

  .activity-group h3 {
    font-size: 1rem;
    font-weight: 600;
    color: var(--text-primary);
    margin-bottom: 1rem;
  }

  .activity-group ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .activity-group li {
    padding: 0.5rem 0;
    padding-left: 1.25rem;
    position: relative;
    color: var(--text-secondary);
    font-size: 0.9rem;
    line-height: 1.5;
    border-bottom: 1px solid var(--border-color);
  }

  .activity-group li:last-child {
    border-bottom: none;
  }

  .activity-group li::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0.9rem;
    width: 6px;
    height: 6px;
    background: var(--accent-primary);
    border-radius: 50%;
  }

  /* Honors Section */
  .honors-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .honor-card {
    display: flex;
    gap: 1.25rem;
    padding: 1.5rem;
    background: var(--bg-secondary);
    border: 1px solid var(--border-color);
    border-radius: 12px;
    transition: all 0.2s ease;
  }

  .honor-card:hover {
    border-color: var(--accent-primary);
    box-shadow: var(--shadow-md);
  }

  .honor-medal {
    font-size: 2.5rem;
    flex-shrink: 0;
  }

  .honor-content {
    flex: 1;
  }

  .honor-header {
    display: flex;
    gap: 0.75rem;
    margin-bottom: 0.5rem;
  }

  .honor-place {
    padding: 0.25rem 0.625rem;
    background: var(--accent-primary);
    color: white;
    border-radius: 4px;
    font-size: 0.75rem;
    font-weight: 600;
  }

  .honor-category {
    padding: 0.25rem 0.625rem;
    background: var(--bg-tertiary);
    color: var(--text-secondary);
    border-radius: 4px;
    font-size: 0.75rem;
    font-weight: 500;
  }

  .honor-content h3 {
    font-size: 1.1rem;
    font-weight: 600;
    color: var(--text-primary);
    margin-bottom: 0.5rem;
  }

  .honor-content p {
    font-size: 0.9rem;
    color: var(--text-secondary);
    margin-bottom: 0.5rem;
    line-height: 1.5;
  }

  .honor-date {
    font-size: 0.8rem;
    color: var(--text-tertiary);
  }

  @media (max-width: 768px) {
    .tab-nav {
      flex-wrap: wrap;
      top: 56px;
    }

    .tab-btn {
      padding: 0.5rem 1rem;
      font-size: 0.85rem;
    }

    .content {
      padding: 1.5rem 1rem;
    }

    .honor-card {
      flex-direction: column;
      gap: 1rem;
    }

    .honor-medal {
      font-size: 2rem;
    }
  }
</style>
