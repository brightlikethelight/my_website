<script lang="ts">
  import ProjectCard from './ProjectCard.svelte';

  interface Project {
    id: string;
    title: string;
    organization: string;
    date: string;
    description: string;
    technologies: string[];
    impact: string;
    githubUrl?: string;
  }

  const projects: Project[] = [
    {
      id: 'kempner',
      title: 'Optimal Compute Allocation for Inference',
      organization: 'Kempner Institute for Artificial Intelligence',
      date: 'Jan 2025 - Present',
      description: 'Studying the trade-off between generator/verifier model sizes and search complexity for large-scale inference under fixed compute budgets, with applications to mathematical reasoning.',
      technologies: ['Python', 'PyTorch', 'CUDA', 'JAX'],
      impact: 'Ongoing research on optimal resource allocation strategies for inference-time compute.',
    },
    {
      id: 'iquhack-2025',
      title: 'Quantum Error Correction with Cat Qubits',
      organization: 'MIT iQuHACK 2025',
      date: 'Jan 2025',
      description: 'Implemented quantum error correction using superconducting cat qubits and the DynamiQ library, exploring buffer vs bufferless systems and Zeno gate implementations.',
      technologies: ['Python', 'DynamiQ', 'JAX', 'NumPy'],
      impact: '1st place, MIT iQuHACK 2025.',
      githubUrl: 'https://github.com/brightlikethelight/iQuHACK_2025'
    },
    {
      id: 'networkx-mcp-server',
      title: 'NetworkX MCP Server',
      organization: 'Personal Project',
      date: 'Dec 2024 - Present',
      description: 'A graph analysis server built on NetworkX and Model Context Protocol, with modular architecture and comprehensive test coverage.',
      technologies: ['Python', 'NetworkX', 'FastMCP', 'Docker'],
      impact: 'Open-source tool for LLM-accessible graph analysis.',
      githubUrl: 'https://github.com/brightlikethelight/networkx-mcp-server'
    },
    {
      id: 'music-gen-ai',
      title: 'Text-to-Music Generation',
      organization: 'Personal Project',
      date: 'Nov 2024 - Present',
      description: 'Transformer-based system for text-to-music generation using EnCodec, supporting multi-instrument composition and real-time streaming.',
      technologies: ['Python', 'PyTorch', 'Transformers', 'FastAPI'],
      impact: 'End-to-end pipeline from text prompts to multi-track audio.',
      githubUrl: 'https://github.com/brightlikethelight/music-gen-ai'
    },
    {
      id: 'ai-safety',
      title: 'LLM Failure Mode Analysis',
      organization: 'Harvard AI Safety Team',
      date: 'Sep 2022 - May 2023',
      description: 'Analyzed LLM failure modes by examining model logits and attention patterns to identify triggers for out-of-distribution hallucinations.',
      technologies: ['Python', 'TensorFlow', 'Statistical Analysis'],
      impact: 'Presented findings at the Harvard-MIT Existential Risks Summit.',
    }
  ];
</script>

<section class="section">
  <h2>Projects</h2>

  <div class="projects-list">
    {#each projects as project (project.id)}
      <ProjectCard {project} />
    {/each}
  </div>
</section>

<style>
  .projects-list {
    display: flex;
    flex-direction: column;
  }
</style>
