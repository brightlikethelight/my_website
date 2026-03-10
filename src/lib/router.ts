import { writable } from 'svelte/store';

const validRoutes = ['/', '/experience', '/projects', '/publications', '/about'];

function parseHash(): string {
  if (typeof window === 'undefined') return '/';
  const hash = window.location.hash;
  if (!hash || hash === '#' || hash === '#/') return '/';
  const route = hash.startsWith('#') ? hash.slice(1) : hash;
  return validRoutes.includes(route) ? route : '/';
}

export const currentRoute = writable<string>(parseHash());

export function navigate(path: string): void {
  window.location.hash = `#${path}`;
  currentRoute.set(path);
  window.scrollTo(0, 0);
}

if (typeof window !== 'undefined') {
  window.addEventListener('hashchange', () => {
    const route = parseHash();
    currentRoute.set(route);
    window.scrollTo(0, 0);
  });
}
