import { writable } from 'svelte/store';

const exactRoutes = ['/', '/experience', '/projects', '/publications', '/about', '/writing'];

function parseHash(): string {
  if (typeof window === 'undefined') return '/';
  const hash = window.location.hash;
  if (!hash || hash === '#' || hash === '#/') return '/';
  const route = hash.startsWith('#') ? hash.slice(1) : hash;
  if (exactRoutes.includes(route)) return route;
  if (route.startsWith('/writing/')) return route;
  return '/';
}

export const currentRoute = writable<string>(parseHash());

export function navigate(path: string): void {
  window.location.hash = `#${path}`;
  currentRoute.set(path);
  window.scrollTo(0, 0);
}

/** Extract the slug from a `/writing/some-slug` route */
export function getWritingSlug(route: string): string | null {
  if (!route.startsWith('/writing/')) return null;
  return route.slice('/writing/'.length) || null;
}

if (typeof window !== 'undefined') {
  window.addEventListener('hashchange', () => {
    const route = parseHash();
    currentRoute.set(route);
    window.scrollTo(0, 0);
  });
}
