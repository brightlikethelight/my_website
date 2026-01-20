<script lang="ts">
  import ProjectFilter from './ProjectFilter.svelte';
  import ProjectCard from './ProjectCard.svelte';

  interface Project {
    id: string;
    title: string;
    organization: string;
    date: string;
    status: 'active' | 'completed';
    description: string;
    technologies: string[];
    impact: string;
    metrics?: Record<string, string>;
    category: string;
    featured: boolean;
    githubUrl?: string;
  }

  let filteredProjects: Project[] = [];
  let activeFilter = 'all';

  const projects: Project[] = [
    {
      id: 'iquhack-2025',
      title: 'Quantum Error Correction with Cat Qubits',
      organization: 'MIT iQuHACK 2025',
      date: 'January 2025',
      status: 'completed',
      description: 'Implemented advanced quantum error correction using superconducting cat qubits and DynamiQ library, exploring buffer vs bufferless quantum systems and Zeno gate implementations for robust quantum computation.',
      technologies: ['Python', 'DynamiQ', 'JAX', 'NumPy', 'Matplotlib', 'Quantum Computing'],
      impact: 'Won 1st place at MIT iQuHACK 2025 quantum computing hackathon',
      metrics: {
        gateFidelity: '99%+ for optimized control sequences',
        coherenceTime: 'Significant improvement demonstrated',
        qubitReduction: 'Reduced physical qubits required for error correction'
      },
      category: 'Quantum Computing',
      featured: true,
      githubUrl: 'https://github.com/brightlikethelight/iQuHACK_2025'
    },
    {
      id: 'networkx-mcp-server',
      title: 'NetworkX MCP Server',
      organization: 'Personal Project',
      date: 'December 2024 - Present',
      status: 'active',
      description: 'Developed a production-ready graph analysis server using NetworkX and Model Context Protocol (MCP), featuring modular architecture with enterprise-grade security, monitoring, and horizontal scaling capabilities.',
      technologies: ['Python', 'NetworkX', 'FastMCP', 'Docker', 'Kubernetes', 'Graph Theory'],
      impact: 'Production-ready graph analysis platform with 80%+ test coverage',
      metrics: {
        testCoverage: '80%+',
        architecture: 'Modular 4-layer design',
        scalability: 'Horizontal scaling supported'
      },
      category: 'Systems Engineering',
      featured: true,
      githubUrl: 'https://github.com/brightlikethelight/networkx-mcp-server'
    },
    {
      id: 'academic-portfolio',
      title: 'Academic Portfolio Website',
      organization: 'MIT 6.S898 Graduate Deep Learning',
      date: 'Fall 2024',
      status: 'completed',
      description: 'Built responsive academic portfolio using Jekyll and al-folio theme, featuring blog functionality, publication management, and Docker deployment for showcasing deep learning research and projects.',
      technologies: ['Jekyll', 'HTML', 'JavaScript', 'Docker', 'GitHub Actions'],
      impact: 'Professional academic portfolio with responsive design and CI/CD integration',
      category: 'Web Development',
      featured: true,
      githubUrl: 'https://github.com/brightlikethelight/elephantfish.github.io'
    },
    {
      id: 'music-gen-ai',
      title: 'AI Music Generation System',
      organization: 'Personal Project',
      date: 'November 2024 - Present',
      status: 'active',
      description: 'Implemented transformer-based text-to-music generation system using PyTorch and EnCodec, supporting multi-instrument composition, real-time streaming, and professional audio mixing with REST API interface.',
      technologies: ['Python', 'PyTorch', 'Transformers', 'FastAPI', 'Docker', 'CUDA'],
      impact: 'High-quality music generation with real-time streaming capabilities',
      metrics: {
        audioQuality: 'Professional-grade output',
        realTime: 'Streaming audio generation',
        multiInstrument: 'Multi-track composition support'
      },
      category: 'AI/ML',
      featured: true,
      githubUrl: 'https://github.com/brightlikethelight/music-gen-ai'
    },
    {
      id: 'kempner',
      title: 'AI Resource Optimization Research',
      organization: 'Kempner Institute for Artificial Intelligence',
      date: 'January 2025 - Present',
      status: 'active',
      description: 'Quantified the optimal trade off between generator/verifier model sizes and search complexity (e.g., beam search) for large scale inference under a fixed compute budget, improving performance on mathematical reasoning tasks.',
      technologies: ['Python', 'PyTorch', 'CUDA', 'JAX', 'Distributed Computing'],
      impact: 'Research ongoing on optimal resource allocation for large-scale inference',
      category: 'AI Research',
      featured: true
    },
    {
      id: 'ai-safety',
      title: 'AI Safety & Model Interpretability',
      organization: 'Harvard AI Safety Team',
      date: 'September 2022 - May 2023',
      status: 'completed',
      description: 'Conducted quantitative analysis of LLM failure modes by examining model logits and attention patterns to identify triggers for out-of-distribution hallucinations; presented findings at Harvard-MIT Existential Risks Summit.',
      technologies: ['Python', 'TensorFlow', 'Interpretability Tools', 'Statistical Analysis'],
      impact: 'Presented research at Harvard-MIT Existential Risks Summit',
      category: 'AI Safety',
      featured: true
    }
  ];
  
  // Get unique categories for filtering
  const categories = [...new Set(projects.map(p => p.category))];
  
  // Initialize filtered projects
  filteredProjects = projects;
  
  function handleFilter(event: CustomEvent<string>) {
    const filter = event.detail;
    activeFilter = filter;

    if (filter === 'all') {
      filteredProjects = projects;
    } else {
      filteredProjects = projects.filter(p => p.category === filter);
    }
  }

  function handleSearch(event: Event) {
    const target = event.target as HTMLInputElement;
    const searchTerm = target.value.toLowerCase();
    
    let baseProjects = activeFilter === 'all' ? projects : projects.filter(p => p.category === activeFilter);
    
    if (searchTerm) {
      filteredProjects = baseProjects.filter(p => 
        p.title.toLowerCase().includes(searchTerm) ||
        p.description.toLowerCase().includes(searchTerm) ||
        p.organization.toLowerCase().includes(searchTerm) ||
        p.technologies.some(tech => tech.toLowerCase().includes(searchTerm))
      );
    } else {
      filteredProjects = baseProjects;
    }
  }
</script>

<section class="section">
  <h2>Technical Projects</h2>
  <p class="section-subtitle">
    Featured personal projects and research initiatives showcasing my technical skills
  </p>
  
  <div class="projects-controls">
    <ProjectFilter 
      {categories}
      {activeFilter}
      on:filter={handleFilter}
    />
    
    <div class="search-container">
      <label for="project-search" class="sr-only">Search projects</label>
      <input
        id="project-search"
        type="text"
        placeholder="Search projects..."
        class="search-input"
        on:input={handleSearch}
        aria-label="Search through projects"
      />
      <svg class="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
        <circle cx="11" cy="11" r="8"/>
        <path d="m21 21-4.35-4.35"/>
      </svg>
    </div>
  </div>
  
  <div class="featured-projects-indicator">
    <span class="indicator-dot"></span>
    <span class="indicator-text">Featured projects highlighted with gradient accents</span>
  </div>
  
  <div class="projects-grid">
    {#each filteredProjects as project (project.id)}
      <ProjectCard {project} />
    {:else}
      <div class="no-projects">
        <p>No projects found matching your criteria.</p>
      </div>
    {/each}
  </div>
</section>

<style>
  .section-subtitle {
    color: var(--text-secondary);
    font-size: 1rem;
    margin-bottom: 3rem;
    font-weight: 400;
  }

  .projects-controls {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 2rem;
    margin-bottom: 2rem;
  }

  .search-container {
    position: relative;
    flex: 0 0 300px;
  }

  .search-input {
    width: 100%;
    padding: 0.75rem 1rem 0.75rem 2.5rem;
    border: 1px solid var(--border-color);
    border-radius: 6px;
    background: var(--bg-secondary);
    color: var(--text-primary);
    font-size: 0.9rem;
    transition: border-color 0.3s ease, box-shadow 0.3s ease;
  }

  .search-input:focus {
    outline: none;
    border-color: var(--accent-primary);
    box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.1);
  }

  .search-input::placeholder {
    color: var(--text-tertiary);
  }

  .search-icon {
    position: absolute;
    left: 0.75rem;
    top: 50%;
    transform: translateY(-50%);
    color: var(--text-tertiary);
    pointer-events: none;
  }

  .projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
    gap: 2rem;
    margin-top: 2rem;
  }

  .no-projects {
    grid-column: 1 / -1;
    text-align: center;
    padding: 4rem 2rem;
    color: var(--text-secondary);
    background: var(--bg-secondary);
    border: 1px solid var(--border-color);
    border-radius: 8px;
  }

  .no-projects p {
    margin: 0;
    font-size: 1.1rem;
  }

  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }
  
  .featured-projects-indicator {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin: 1rem 0;
    padding: 0.75rem 1rem;
    background: linear-gradient(135deg, var(--bg-secondary) 0%, var(--bg-tertiary) 100%);
    border: 1px solid var(--border-color);
    border-radius: 8px;
    font-size: 0.875rem;
    color: var(--text-secondary);
  }
  
  .indicator-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--accent-gradient-warm);
    box-shadow: 0 0 8px rgba(52, 152, 219, 0.4);
    animation: pulse 2s infinite;
  }
  
  @keyframes pulse {
    0%, 100% { 
      transform: scale(1);
      opacity: 1;
    }
    50% { 
      transform: scale(1.1);
      opacity: 0.8;
    }
  }


  @media (max-width: 768px) {
    .projects-controls {
      flex-direction: column;
      gap: 1.5rem;
    }

    .search-container {
      flex: 1;
    }

    .projects-grid {
      grid-template-columns: 1fr;
      gap: 1.5rem;
    }
  }
</style>