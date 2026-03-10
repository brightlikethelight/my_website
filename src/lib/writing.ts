import { marked } from 'marked';

export interface Post {
  slug: string;
  title: string;
  date: string;
  description: string;
  content: string;
  html: string;
}

/** Parse simple YAML frontmatter from a markdown string */
function parseFrontmatter(raw: string): { meta: Record<string, string>; body: string } {
  const meta: Record<string, string> = {};
  if (!raw.startsWith('---')) return { meta, body: raw };

  const end = raw.indexOf('---', 3);
  if (end === -1) return { meta, body: raw };

  const yaml = raw.slice(3, end).trim();
  for (const line of yaml.split('\n')) {
    const idx = line.indexOf(':');
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    const val = line.slice(idx + 1).trim().replace(/^["']|["']$/g, '');
    meta[key] = val;
  }

  return { meta, body: raw.slice(end + 3).trim() };
}

// Load all markdown files at build time
const modules = import.meta.glob('/src/content/writing/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>;

// Parse into Post objects
const posts: Post[] = Object.entries(modules)
  .map(([path, raw]) => {
    const slug = path.split('/').pop()!.replace(/\.md$/, '');
    const { meta, body } = parseFrontmatter(raw);
    return {
      slug,
      title: meta.title || slug,
      date: meta.date || '',
      description: meta.description || '',
      content: body,
      html: marked.parse(body) as string,
    };
  })
  .sort((a, b) => (b.date > a.date ? 1 : -1));

export function getAllPosts(): Post[] {
  return posts;
}

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}
