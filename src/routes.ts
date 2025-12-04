import HomePage from './pages/HomePage.svelte';
import AboutPage from './pages/AboutPage.svelte';
import ProjectsPage from './pages/ProjectsPage.svelte';
import WritingsPage from './pages/WritingsPage.svelte';
import QuotesPage from './pages/QuotesPage.svelte';
import TeachingsPage from './pages/TeachingsPage.svelte';
import BooksPage from './pages/BooksPage.svelte';
import NotFoundPage from './pages/NotFoundPage.svelte';

export const routes = {
  '/': HomePage,
  '/about': AboutPage,
  '/projects': ProjectsPage,
  '/writings': WritingsPage,
  '/quotes': QuotesPage,
  '/teachings': TeachingsPage,
  '/books': BooksPage,
  '*': NotFoundPage,  // Wildcard route for 404
};
