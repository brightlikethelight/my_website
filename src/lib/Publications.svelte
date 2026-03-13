<script lang="ts">

  // Academic work organized by category
  const technicalReports = [
    {
      id: 'sae-feature-stability',
      title: 'At Standard Training Budgets, SAE Features Match Random Baseline: Evidence for Underconstrained Sparse Reconstruction',
      authors: ['Bright Liu'],
      date: '2026',
      type: 'Research Paper',
      category: 'Mechanistic Interpretability',
      abstract: 'Multi-seed stability analysis showing trained SAE features are practically indistinguishable from randomly initialized SAEs at standard training budgets, with evidence that the sparse reconstruction objective is underconstrained.',
      keywords: ['Sparse Autoencoders', 'Mechanistic Interpretability', 'Feature Stability', 'Reproducibility'],
      file: 'SAE_Feature_Stability.pdf',
      size: '146 KB',
      pages: '15 pages',
      featured: true
    },
    {
      id: 'latent-diffusion-models',
      title: 'Latent Diffusion Models for High-Resolution Image Generation',
      authors: ['Bright Liu'],
      date: '2024',
      type: 'Technical Report',
      category: 'Machine Learning',
      abstract: 'Technical exploration of latent diffusion models for high-resolution image generation, examining architectural approaches and training methodologies.',
      keywords: ['Diffusion Models', 'Deep Learning', 'Computer Vision', 'Generative AI'],
      file: 'Latent_Diffusion_Models_Paper.pdf',
      size: '3.9 MB',
      pages: '6 pages',
      featured: true
    },
    {
      id: 'empirical-spectral-distributions',
      title: 'Empirical Spectral Distributions of Random Matrices',
      authors: ['Bright Liu'],
      date: '2024',
      type: 'Technical Report',
      category: 'Random Matrix Theory',
      abstract: 'Study of empirical spectral distributions of large random matrices, focusing on convergence properties and applications to high-dimensional statistics.',
      keywords: ['Random Matrix Theory', 'Spectral Analysis', 'High-Dimensional Statistics'],
      file: 'Empirical_Spectral_Distributions_Of_Random_Matrices.pdf',
      size: '397 KB',
      pages: '20 pages',
      featured: true
    },
    {
      id: 'evolutionary-dynamics',
      title: 'Evolutionary Dynamics in Multi-Agent Systems',
      authors: ['Bright Liu'],
      date: '2024',
      type: 'Technical Report',
      category: 'Game Theory',
      abstract: 'Analysis of evolutionary game theory applied to multi-agent systems, with focus on strategy evolution under different selection pressures.',
      keywords: ['Evolutionary Game Theory', 'Multi-Agent Systems', 'Nash Equilibrium'],
      file: 'Evolutionary_Dynamics_Paper.pdf',
      size: '335 KB',
      pages: '13 pages',
      featured: false
    },
    {
      id: 'girko-circular-law',
      title: 'The Girko Method and Circular Law for Random Matrices',
      authors: ['Bright Liu'],
      date: '2024',
      type: 'Technical Report',
      category: 'Mathematical Analysis',
      abstract: 'Exposition of Girko\'s method for proving the circular law in random matrix theory, with detailed proofs and applications.',
      keywords: ['Circular Law', 'Random Matrices', 'Complex Analysis', 'Eigenvalues'],
      file: 'Girko_Method_Circular_Law.pdf',
      size: '310 KB',
      pages: '31 pages',
      featured: false
    },
    {
      id: 'matrix-concentration',
      title: 'Matrix Concentration Inequalities and Applications',
      authors: ['Bright Liu'],
      date: '2024',
      type: 'Survey',
      category: 'Probability Theory',
      abstract: 'Survey of matrix concentration inequalities, including recent developments in non-commutative probability and applications to machine learning.',
      keywords: ['Concentration Inequalities', 'Matrix Analysis', 'Non-commutative Probability'],
      file: 'Matrix_Concentration_Inequalities.pdf',
      size: '290 KB',
      pages: '24 pages',
      featured: false
    },
    {
      id: 'election-forecasting',
      title: 'Election Forecasting with Sparse Statistical Models',
      authors: ['Bright Liu'],
      date: '2024',
      type: 'Technical Report',
      category: 'Political Statistics',
      abstract: 'Development of sparse regression models for election forecasting, incorporating polling data, economic indicators, and demographic factors.',
      keywords: ['Political Forecasting', 'Sparse Regression', 'Statistical Modeling'],
      file: 'Election_Forecasting_Sparse_Models.pdf',
      size: '195 KB',
      pages: '15 pages',
      featured: false
    }
  ];
  
  // Combine all publications for display
  const allPublications = [...technicalReports];
</script>

<section class="section">
  <h2>Course Projects & Technical Reports</h2>
  <p class="section-subtitle">
    Selected course projects, technical reports, and teaching materials from Harvard coursework
  </p>
  
  <div class="publications-list">
    {#each allPublications as publication, index}
      <div class="publication-item">
        <div class="publication-header">
          <h3 class="publication-title">
            <a href="/papers/{publication.file}" target="_blank" rel="noopener">
              {publication.title}
            </a>
          </h3>
          <div class="publication-meta">
            <span class="publication-type">{publication.type}</span>
            <span class="publication-date">{publication.date}</span>
            <span class="publication-pages">{publication.pages}</span>
          </div>
        </div>
        
        <p class="publication-abstract">{publication.abstract}</p>
        
        <div class="publication-topics">
          {#each publication.keywords as keyword}
            <span class="topic-tag">{keyword}</span>
          {/each}
        </div>
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

  .publications-list {
    display: flex;
    flex-direction: column;
    gap: 3rem;
  }

  .publication-item {
    border-bottom: 1px solid var(--border-color);
    padding-bottom: 2rem;
  }

  .publication-item:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }

  .publication-header {
    margin-bottom: 0.75rem;
  }

  .publication-title {
    font-size: 1.125rem;
    font-weight: 500;
    margin-bottom: 0.5rem;
    line-height: 1.3;
  }

  .publication-title a {
    color: var(--text-primary);
    text-decoration: none;
    border-bottom: 1px solid transparent;
    transition: border-color 0.2s ease;
  }

  .publication-title a:hover {
    border-bottom-color: var(--accent-primary);
  }

  .publication-meta {
    display: flex;
    gap: 1rem;
    font-size: 0.875rem;
    color: var(--text-tertiary);
  }

  .publication-type {
    font-weight: 500;
  }

  .publication-abstract {
    color: var(--text-secondary);
    line-height: 1.6;
    margin-bottom: 1rem;
    font-size: 0.95rem;
  }

  .publication-topics {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .topic-tag {
    background: var(--bg-secondary);
    color: var(--text-secondary);
    padding: 0.125rem 0.5rem;
    border-radius: 4px;
    font-size: 0.8rem;
    font-weight: 400;
  }

  @media (max-width: 768px) {
    .publications-list {
      gap: 2rem;
    }

    .publication-item {
      padding-bottom: 1.5rem;
    }

    .publication-meta {
      flex-direction: column;
      gap: 0.25rem;
    }
  }
</style>