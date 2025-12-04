<script lang="ts">
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';
  
  let mounted = false;
  
  onMount(() => {
    document.title = "Teachings - Bright Liu";
    mounted = true;
  });

  const teachings = [
    {
      id: 'evolutionary-dynamics',
      title: 'Evolutionary Dynamics & Game Theory',
      institution: 'Harvard University',
      instructor: 'Prof. Martin Nowak',
      role: 'Graduate Teaching Assistant',
      period: 'February 2023 - May 2024',
      description: 'Co-instructed graduate-level mathematical game theory and stochastic processes, developing multi-agent system models to analyze emergent behaviors and strategic interactions.',
      topics: [
        'Mathematical Game Theory',
        'Stochastic Processes',
        'Multi-agent Systems',
        'Evolutionary Dynamics',
        'Nash Equilibria',
        'Replicator Dynamics'
      ],
      level: 'Graduate'
    },
    {
      id: 'cs-advising',
      title: 'Computer Science Peer Advising',
      institution: 'Harvard University',
      instructor: 'Harvard SEAS',
      role: 'Captain of Peer Concentration Advisors',
      period: '2023 - Present',
      description: 'Lead a team of peer advisors helping undergraduate students navigate the computer science curriculum, course selection, and career planning.',
      topics: [
        'Course Planning',
        'Career Guidance',
        'Research Opportunities',
        'Graduate School Preparation',
        'Technical Interview Prep'
      ],
      level: 'Undergraduate'
    },
    {
      id: 'science-olympiad',
      title: 'Science Olympiad Event Writing',
      institution: 'Harvard Science Olympiad',
      instructor: 'Harvard University',
      role: 'Event Organizer & Test Writer',
      period: '2022 - Present',
      description: 'Design and write competition problems for Science Olympiad events, focusing on mathematics, physics, and computer science topics.',
      topics: [
        'Problem Design',
        'Mathematical Reasoning',
        'Physics Concepts',
        'Competition Mathematics',
        'Scientific Method'
      ],
      level: 'High School'
    }
  ];

  const tutoringSessions = [
    {
      subject: 'Linear Algebra',
      description: 'Matrix operations, eigenvalues, vector spaces, and applications'
    },
    {
      subject: 'Probability & Statistics',
      description: 'Distributions, hypothesis testing, Bayesian inference'
    },
    {
      subject: 'Machine Learning',
      description: 'Supervised/unsupervised learning, neural networks, optimization'
    },
    {
      subject: 'Algorithms',
      description: 'Data structures, complexity analysis, dynamic programming'
    }
  ];
</script>

<div class="teachings-page">
  <header class="page-header">
    <div class="header-content">
      {#if mounted}
        <h1 in:fade={{ duration: 400 }}>Teachings</h1>
        <p class="subtitle" in:fade={{ duration: 400, delay: 100 }}>
          Courses, mentorship, and educational materials
        </p>
      {:else}
        <h1>Teachings</h1>
        <p class="subtitle">Courses, mentorship, and educational materials</p>
      {/if}
    </div>
  </header>

  <main class="content">
    <section class="section">
      <h2>Teaching Experience</h2>
      <div class="teachings-list">
        {#each teachings as teaching, index}
          {#if mounted}
            <article class="teaching-card" in:fade={{ duration: 300, delay: index * 100 }}>
              <div class="teaching-content">
                <div class="teaching-header">
                  <h3>{teaching.title}</h3>
                  <span class="level-badge">{teaching.level}</span>
                </div>
                <div class="teaching-meta">
                  <span class="institution">{teaching.institution}</span>
                  <span class="separator">•</span>
                  <span class="role">{teaching.role}</span>
                </div>
                <p class="period">{teaching.period}</p>
                <p class="description">{teaching.description}</p>
                <div class="topics">
                  {#each teaching.topics as topic}
                    <span class="topic-tag">{topic}</span>
                  {/each}
                </div>
              </div>
            </article>
          {:else}
            <article class="teaching-card">
              <div class="teaching-content">
                <div class="teaching-header">
                  <h3>{teaching.title}</h3>
                  <span class="level-badge">{teaching.level}</span>
                </div>
                <div class="teaching-meta">
                  <span class="institution">{teaching.institution}</span>
                  <span class="separator">•</span>
                  <span class="role">{teaching.role}</span>
                </div>
                <p class="period">{teaching.period}</p>
                <p class="description">{teaching.description}</p>
                <div class="topics">
                  {#each teaching.topics as topic}
                    <span class="topic-tag">{topic}</span>
                  {/each}
                </div>
              </div>
            </article>
          {/if}
        {/each}
      </div>
    </section>

    <section class="section">
      <h2>Tutoring & Mentorship</h2>
      <p class="section-intro">
        I enjoy helping students understand complex topics. Here are some subjects I frequently tutor:
      </p>
      <div class="tutoring-grid">
        {#each tutoringSessions as session, index}
          {#if mounted}
            <div class="tutoring-card" in:fade={{ duration: 300, delay: 300 + index * 75 }}>
              <h3>{session.subject}</h3>
              <p>{session.description}</p>
            </div>
          {:else}
            <div class="tutoring-card">
              <h3>{session.subject}</h3>
              <p>{session.description}</p>
            </div>
          {/if}
        {/each}
      </div>
    </section>

    <section class="section cta-section">
      <div class="cta-card">
        <h3>Interested in Learning Together?</h3>
        <p>
          I'm always happy to help fellow students or discuss interesting problems. 
          Feel free to reach out if you'd like to study together or need guidance on coursework.
        </p>
        <a href="/#/" class="cta-btn">Get in Touch</a>
      </div>
    </section>
  </main>
</div>

<style>
  .teachings-page {
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

  .section-intro {
    color: var(--text-secondary);
    margin-bottom: 1.5rem;
  }

  /* Teaching Cards */
  .teachings-list {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .teaching-card {
    display: flex;
    gap: 1.5rem;
    padding: 1.75rem;
    background: var(--bg-secondary);
    border: 1px solid var(--border-color);
    border-radius: 12px;
    transition: all 0.2s ease;
  }

  .teaching-card:hover {
    border-color: var(--accent-primary);
    box-shadow: var(--shadow-md);
  }

  .teaching-content {
    flex: 1;
  }

  .teaching-header {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 0.5rem;
    flex-wrap: wrap;
  }

  .teaching-header h3 {
    font-size: 1.2rem;
    font-weight: 600;
    color: var(--text-primary);
    margin: 0;
  }

  .level-badge {
    padding: 0.25rem 0.625rem;
    background: var(--accent-primary);
    color: white;
    border-radius: 4px;
    font-size: 0.7rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.03em;
  }

  .teaching-meta {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.25rem;
    flex-wrap: wrap;
  }

  .institution {
    font-weight: 500;
    color: var(--text-primary);
    font-size: 0.95rem;
  }

  .separator {
    color: var(--text-tertiary);
  }

  .role {
    color: var(--text-primary);
    font-weight: 500;
    font-size: 0.95rem;
  }

  .period {
    font-size: 0.85rem;
    color: var(--text-tertiary);
    margin-bottom: 0.75rem;
  }

  .description {
    color: var(--text-secondary);
    font-size: 0.95rem;
    line-height: 1.6;
    margin-bottom: 1rem;
  }

  .topics {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .topic-tag {
    padding: 0.25rem 0.625rem;
    background: var(--bg-tertiary);
    color: var(--text-secondary);
    border-radius: 4px;
    font-size: 0.75rem;
    font-weight: 500;
  }

  /* Tutoring Grid */
  .tutoring-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1.25rem;
  }

  .tutoring-card {
    padding: 1.5rem;
    background: var(--bg-secondary);
    border: 1px solid var(--border-color);
    border-radius: 12px;
    text-align: center;
    transition: all 0.2s ease;
  }

  .tutoring-card:hover {
    border-color: var(--accent-primary);
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
  }

  .tutoring-card h3 {
    font-size: 1rem;
    font-weight: 600;
    color: var(--text-primary);
    margin-bottom: 0.5rem;
  }

  .tutoring-card p {
    font-size: 0.85rem;
    color: var(--text-tertiary);
    margin: 0;
    line-height: 1.5;
  }

  /* CTA Section */
  .cta-section {
    margin-top: 2rem;
  }

  .cta-card {
    padding: 2rem;
    background: var(--accent-gradient-subtle);
    border: 1px solid var(--border-color);
    border-radius: 12px;
    text-align: center;
  }

  .cta-card h3 {
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--text-primary);
    margin-bottom: 0.75rem;
  }

  .cta-card p {
    color: var(--text-secondary);
    margin-bottom: 1.5rem;
    max-width: 500px;
    margin-left: auto;
    margin-right: auto;
  }

  .cta-btn {
    display: inline-block;
    padding: 0.75rem 1.5rem;
    background: var(--accent-primary);
    color: white;
    border-radius: 8px;
    font-weight: 500;
    text-decoration: none;
    transition: all 0.2s ease;
  }

  .cta-btn:hover {
    background: var(--accent-secondary);
    transform: translateY(-2px);
    color: white;
  }

  @media (max-width: 768px) {
    .content {
      padding: 1.5rem 1rem;
    }

    .teaching-card {
      flex-direction: column;
      gap: 1rem;
    }

    .teaching-header {
      flex-direction: column;
      align-items: flex-start;
      gap: 0.5rem;
    }
  }
</style>
