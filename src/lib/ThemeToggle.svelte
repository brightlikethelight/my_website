<script lang="ts">
  import { themeMode, setThemeMode } from './stores';
  import analytics from './utils/analytics';

  type Mode = 'light' | 'auto' | 'dark';
  const modes: Mode[] = ['light', 'auto', 'dark'];

  let currentMode: Mode = 'auto';
  themeMode.subscribe((v) => (currentMode = v));

  function select(mode: Mode) {
    setThemeMode(mode);
    analytics.trackCustomEvent('theme_toggle', 0, { mode });
  }

  function handleKeydown(event: KeyboardEvent, mode: Mode) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      select(mode);
    }
  }

  function activeIndex(mode: Mode): number {
    return modes.indexOf(mode);
  }
</script>

<div
  class="theme-toggle"
  role="radiogroup"
  aria-label="Theme mode"
>
  <!-- Sliding indicator -->
  <div
    class="indicator"
    style="transform: translateX({activeIndex(currentMode) * 100}%)"
  ></div>

  <!-- Light -->
  <button
    class="segment"
    class:active={currentMode === 'light'}
    on:click={() => select('light')}
    on:keydown={(e) => handleKeydown(e, 'light')}
    role="radio"
    aria-checked={currentMode === 'light'}
    aria-label="Light mode"
    title="Light"
  >
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true">
      <circle cx="12" cy="12" r="4"/>
      <path d="M12 2v2"/>
      <path d="M12 20v2"/>
      <path d="M4.93 4.93l1.41 1.41"/>
      <path d="M17.66 17.66l1.41 1.41"/>
      <path d="M2 12h2"/>
      <path d="M20 12h2"/>
      <path d="M6.34 17.66l-1.41 1.41"/>
      <path d="M19.07 4.93l-1.41 1.41"/>
    </svg>
  </button>

  <!-- Auto -->
  <button
    class="segment"
    class:active={currentMode === 'auto'}
    on:click={() => select('auto')}
    on:keydown={(e) => handleKeydown(e, 'auto')}
    role="radio"
    aria-checked={currentMode === 'auto'}
    aria-label="Auto mode (follows time of day)"
    title="Auto"
  >
    <span class="auto-label">Auto</span>
  </button>

  <!-- Dark -->
  <button
    class="segment"
    class:active={currentMode === 'dark'}
    on:click={() => select('dark')}
    on:keydown={(e) => handleKeydown(e, 'dark')}
    role="radio"
    aria-checked={currentMode === 'dark'}
    aria-label="Dark mode"
    title="Dark"
  >
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>
  </button>
</div>

<style>
  .theme-toggle {
    position: relative;
    display: flex;
    align-items: center;
    background: var(--bg-tertiary);
    border: 1px solid var(--border-color);
    border-radius: 8px;
    padding: 2px;
    width: 120px;
    height: 28px;
  }

  .indicator {
    position: absolute;
    top: 2px;
    left: 2px;
    width: calc(100% / 3 - 2px);
    height: calc(100% - 4px);
    background: var(--accent-primary);
    border-radius: 6px;
    transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: 0;
  }

  .segment {
    position: relative;
    z-index: 1;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    height: 100%;
    color: var(--text-tertiary);
    transition: color 0.2s ease;
  }

  .segment.active {
    color: white;
  }

  .segment:hover:not(.active) {
    color: var(--text-primary);
  }

  .segment:focus-visible {
    outline: 2px solid var(--accent-primary);
    outline-offset: 2px;
    border-radius: 6px;
  }

  .auto-label {
    font-size: 0.7rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.03em;
  }

  .segment svg {
    display: block;
  }

  @media (prefers-reduced-motion: reduce) {
    .indicator {
      transition: none;
    }
  }
</style>
