import { writable, derived } from 'svelte/store';

const browser = typeof window !== 'undefined';

// --- Theme System (3-mode: auto / light / dark) ---

type ThemeMode = 'auto' | 'light' | 'dark';

function getInitialMode(): ThemeMode {
  if (!browser) return 'auto';
  // Migrate old key
  const oldTheme = localStorage.getItem('theme');
  if (oldTheme === 'light' || oldTheme === 'dark') {
    localStorage.setItem('themeMode', oldTheme);
    localStorage.removeItem('theme');
    return oldTheme;
  }
  const saved = localStorage.getItem('themeMode') as ThemeMode | null;
  return saved && ['auto', 'light', 'dark'].includes(saved) ? saved : 'auto';
}

function resolveAuto(): 'light' | 'dark' {
  const hour = new Date().getHours();
  return hour >= 6 && hour < 18 ? 'light' : 'dark';
}

export const themeMode = writable<ThemeMode>(getInitialMode());

// Tracks the auto-resolved value so it can change over time
const autoResolved = writable<'light' | 'dark'>(resolveAuto());

export const resolvedTheme = derived(
  [themeMode, autoResolved],
  ([$mode, $auto]) => ($mode === 'auto' ? $auto : $mode)
);

// Apply theme to DOM whenever resolvedTheme changes
if (browser) {
  resolvedTheme.subscribe((theme) => {
    document.body.setAttribute('data-theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  });

  // Re-check auto resolution every 60s
  setInterval(() => {
    autoResolved.set(resolveAuto());
  }, 60_000);
}

export function setThemeMode(mode: ThemeMode): void {
  themeMode.set(mode);
  if (browser) {
    localStorage.setItem('themeMode', mode);
  }
}

// --- Animation store ---
export const animatedElements = writable<Set<string>>(new Set());
