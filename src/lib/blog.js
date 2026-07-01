/**
 * Blog data layer. Posts are plain Markdown files in src/content/blog/ with a
 * simple YAML-ish frontmatter block. To add a post, just drop a new .md file —
 * no code changes needed.
 *
 * Frontmatter fields: title, date (YYYY-MM-DD), category, excerpt, readTime.
 */

// Vite loads every markdown file's raw text at build time.
const files = import.meta.glob('../content/blog/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
});

// The categories used across the blog (for the filter bar).
export const blogCategories = [
  'All',
  'AI',
  'Programming',
  'Automation',
  'Learning Journey',
  'Web Development',
];

// Minimal frontmatter parser (key: value lines between --- fences).
function parseFrontmatter(raw) {
  const match = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/.exec(raw);
  if (!match) return { data: {}, content: raw };

  const data = {};
  for (const line of match[1].split('\n')) {
    const idx = line.indexOf(':');
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    let value = line.slice(idx + 1).trim();
    value = value.replace(/^["']|["']$/g, ''); // strip surrounding quotes
    data[key] = value;
  }
  return { data, content: match[2] };
}

// Build the post list from the globbed files.
const posts = Object.entries(files)
  .map(([path, raw]) => {
    const slug = path.split('/').pop().replace(/\.md$/, '');
    const { data, content } = parseFrontmatter(raw);
    return {
      slug,
      title: data.title || slug,
      date: data.date || '',
      category: data.category || 'Uncategorized',
      excerpt: data.excerpt || '',
      readTime: data.readTime || '',
      content,
    };
  })
  // Newest first.
  .sort((a, b) => (a.date < b.date ? 1 : -1));

export function getPosts() {
  return posts;
}

export function getPost(slug) {
  return posts.find((p) => p.slug === slug) || null;
}

export function formatDate(iso) {
  if (!iso) return '';
  const d = new Date(iso);
  return Number.isNaN(d.getTime())
    ? iso
    : d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}
