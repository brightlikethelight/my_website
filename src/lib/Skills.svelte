<script lang="ts">

  const skillCategories = [
    {
      id: 'programming',
      title: 'Programming & Development',
      skills: ['Python', 'C++', 'JavaScript/TypeScript', 'SQL', 'MATLAB', 'R', 'Git', 'Linux/Unix']
    },
    {
      id: 'ml-ai',
      title: 'Machine Learning & AI',
      skills: ['PyTorch', 'TensorFlow', 'Scikit-learn', 'JAX', 'Transformers', 'OpenCV', 'CUDA', 'Docker']
    },
    {
      id: 'finance',
      title: 'Quantitative Finance',
      skills: ['Options Pricing', 'Portfolio Optimization', 'Risk Management', 'Time Series Analysis', 'Monte Carlo Methods', 'Backtesting']
    },
    {
      id: 'mathematics',
      title: 'Mathematical Methods',
      skills: ['Stochastic Calculus', 'Linear Algebra', 'Statistics & Probability', 'Optimization Theory', 'Numerical Analysis']
    },
    {
      id: 'tools',
      title: 'Tools & Platforms',
      skills: ['AWS', 'PostgreSQL', 'Jupyter', 'LaTeX', 'Tableau', 'Bloomberg Terminal']
    }
  ];

  const activitiesGroups = [
    {
      title: 'Academic Leadership & Organizations',
      activities: [
        'Captain of Computer Science Peer Concentration Advisors',
        'Undergraduate Advisory Board Member - Harvard SEAS',
        'Harvard Wolfram Ambassador',
        'Event Organizer & Test Writer - Harvard Science Olympiad',
        'Founder of Harvard Book Club'
      ]
    },
    {
      title: 'Athletic & Recreational Activities',
      activities: [
        'Harvard Ultimate Frisbee Team',
        'Cambridge Half Marathon Runner',
        'Harvard Poker Club Member',
        'Harvard MIT Mathematics Tournament Volunteer'
      ]
    },
    {
      title: 'Technical & Research Interests',
      activities: [
        'Open Source Contributions & Development',
        'AI Safety & Interpretability Research',
        'Teaching Mathematics, Computer Science & Statistics',
        'Algorithmic Trading & Financial Analysis'
      ]
    },
    {
      title: 'Creative & Personal Interests',
      activities: [
        'Choir, Guitar & Piano Performance',
        'Backyard Astronomy & Stargazing',
        'Calisthenics, Meditation, Reading & Hiking'
      ]
    }
  ];
</script>

<section class="section">
  <h2>Technical Skills & Interests</h2>
  
  <div class="skills-container">
    <!-- Technical Skills Grid -->
    <div class="skills-grid">
      {#each skillCategories as category}
        <div class="skill-category">
          <h3 class="category-title">{category.title}</h3>
          <div class="skills-tags">
            {#each category.skills as skill}
              <span class="skill-tag">{skill}</span>
            {/each}
          </div>
        </div>
      {/each}
    </div>

    <!-- Activities Section -->
    <div class="activities-section">
      <h3>Activities & Interests</h3>
      <div class="activities-groups">
        {#each activitiesGroups as group}
          <div class="activity-group">
            <h4 class="group-title">{group.title}</h4>
            <div class="group-activities">
              {#each group.activities as activity}
                <div class="activity-item">{activity}</div>
              {/each}
            </div>
          </div>
        {/each}
      </div>
    </div>
  </div>
</section>

<style>
  .skills-container {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  .skills-grid {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 1.5rem;
  }

  .skill-category {
    background: var(--bg-secondary);
    border: 1px solid var(--border-color);
    border-radius: 8px;
    padding: 1.5rem;
  }

  .category-title {
    font-size: 1rem;
    font-weight: 600;
    margin-bottom: 1rem;
    color: var(--text-primary);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .skills-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .skill-tag {
    background: var(--bg-primary);
    color: var(--text-secondary);
    padding: 0.375rem 0.75rem;
    border-radius: 6px;
    font-size: 0.875rem;
    font-weight: 500;
    border: 1px solid var(--border-color);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    cursor: pointer;
  }

  .skill-tag:hover {
    background: var(--accent-primary);
    color: white;
    border-color: var(--accent-primary);
    transform: translateY(-2px) scale(1.05);
    box-shadow: var(--shadow-md);
  }

  .activities-section {
    margin-top: 2rem;
    padding-top: 2rem;
    border-top: 1px solid var(--border-color);
  }

  .activities-section h3 {
    color: var(--text-primary);
    margin-bottom: 1.5rem;
    font-size: 1.125rem;
    font-weight: 500;
  }

  .activities-groups {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
  }

  .activity-group {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .group-title {
    color: var(--text-primary);
    font-size: 1rem;
    font-weight: 600;
    margin: 0;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid var(--border-color);
  }

  .group-activities {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .activity-item {
    color: var(--text-secondary);
    font-size: 0.9rem;
    line-height: 1.5;
    position: relative;
    padding-left: 1rem;
  }

  .activity-item::before {
    content: '▸';
    position: absolute;
    left: 0;
    color: var(--accent-primary);
    font-size: 0.8rem;
  }

  @media (max-width: 768px) {
    .skills-container {
      gap: 1.5rem;
    }

    .skills-grid {
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 1rem;
    }

    .skill-category {
      padding: 1rem;
    }

    .activities-groups {
      grid-template-columns: 1fr;
      gap: 1.5rem;
    }
  }
</style>