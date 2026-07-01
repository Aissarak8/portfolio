import { useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { marked } from 'marked';
import { ArrowLeft, ArrowRight, Calendar, Clock } from 'lucide-react';
import Reveal from '../components/ui/Reveal';
import { getPost, getPosts, formatDate } from '../lib/blog';

marked.setOptions({ gfm: true, breaks: false });

function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center gap-4 text-center">
      <h1 className="text-3xl font-bold">Post not found</h1>
      <Link to="/blog" className="text-brand-500 underline">
        ← Back to the blog
      </Link>
    </div>
  );
}

export default function BlogPost() {
  const { slug } = useParams();
  const post = getPost(slug);
  const posts = getPosts();

  const html = useMemo(() => (post ? marked.parse(post.content) : ''), [post]);

  // Per-page SEO.
  useEffect(() => {
    if (!post) return;
    const prevTitle = document.title;
    document.title = `${post.title} — Aissa Slikou`;
    const meta = document.querySelector('meta[name="description"]');
    const prevDesc = meta?.getAttribute('content');
    meta?.setAttribute('content', post.excerpt);
    return () => {
      document.title = prevTitle;
      if (meta && prevDesc) meta.setAttribute('content', prevDesc);
    };
  }, [post]);

  if (!post) return <NotFound />;

  const i = posts.findIndex((p) => p.slug === slug);
  const prev = i > 0 ? posts[i - 1] : null;
  const next = i < posts.length - 1 ? posts[i + 1] : null;

  return (
    <article className="mx-auto max-w-3xl px-6 pt-28 pb-24 md:px-8">
      <Link
        to="/blog"
        className="hover:text-brand-500 mb-8 inline-flex items-center gap-1.5 text-sm text-gray-500 transition-colors"
      >
        <ArrowLeft size={16} /> All posts
      </Link>

      <Reveal>
        <header className="mb-8">
          <span className="bg-brand-500/10 text-brand-500 mb-4 inline-block rounded-full px-3 py-1 text-xs font-medium">
            {post.category}
          </span>
          <h1 className="text-3xl font-extrabold tracking-tight md:text-4xl">{post.title}</h1>
          <div className="mt-4 flex items-center gap-4 text-sm text-gray-400">
            <span className="flex items-center gap-1.5">
              <Calendar size={15} /> {formatDate(post.date)}
            </span>
            {post.readTime && (
              <span className="flex items-center gap-1.5">
                <Clock size={15} /> {post.readTime}
              </span>
            )}
          </div>
        </header>

        {/* Rendered markdown. Content is self-authored and trusted. */}
        <div
          className="prose prose-neutral dark:prose-invert prose-headings:tracking-tight prose-a:text-brand-500 prose-code:text-brand-500 prose-code:before:content-[''] prose-code:after:content-[''] max-w-none"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </Reveal>

      {/* Prev / next */}
      <nav className="mt-14 grid gap-4 sm:grid-cols-2" aria-label="Post navigation">
        {prev ? (
          <Link
            to={`/blog/${prev.slug}`}
            className="glass rounded-xl p-4 transition-transform hover:-translate-y-0.5"
          >
            <span className="flex items-center gap-1 text-xs text-gray-400">
              <ArrowLeft size={13} /> Previous
            </span>
            <span className="text-brand-500 mt-1 block font-semibold">{prev.title}</span>
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link
            to={`/blog/${next.slug}`}
            className="glass rounded-xl p-4 text-right transition-transform hover:-translate-y-0.5"
          >
            <span className="flex items-center justify-end gap-1 text-xs text-gray-400">
              Next <ArrowRight size={13} />
            </span>
            <span className="text-brand-500 mt-1 block font-semibold">{next.title}</span>
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </article>
  );
}
