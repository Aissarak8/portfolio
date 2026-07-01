import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Calendar, Clock, ArrowRight, ArrowLeft } from 'lucide-react';
import Reveal from '../components/ui/Reveal';
import { getPosts, blogCategories, formatDate } from '../lib/blog';

export default function Blog() {
  const [filter, setFilter] = useState('All');
  const [query, setQuery] = useState('');
  const posts = getPosts();

  // Per-page SEO.
  useEffect(() => {
    const prev = document.title;
    document.title = 'Blog — Aissa Slikou';
    return () => {
      document.title = prev;
    };
  }, []);

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return posts.filter((p) => {
      const matchesCat = filter === 'All' || p.category === filter;
      const matchesQuery =
        !q || p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q);
      return matchesCat && matchesQuery;
    });
  }, [posts, filter, query]);

  return (
    <main className="mx-auto max-w-5xl px-6 pt-28 pb-24 md:px-8">
      <Link
        to="/"
        className="hover:text-brand-500 mb-6 inline-flex items-center gap-1.5 text-sm text-gray-500 transition-colors"
      >
        <ArrowLeft size={16} /> Back home
      </Link>

      <Reveal>
        <span className="text-brand-500 mb-3 inline-block text-sm font-semibold tracking-widest uppercase">
          Blog
        </span>
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Learning journal</h1>
        <p className="mt-3 max-w-xl text-gray-500 dark:text-gray-400">
          Notes on what I'm building and learning — AI, web development, automation and the journey
          in between.
        </p>
      </Reveal>

      {/* Controls */}
      <Reveal className="mt-8 mb-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap gap-2">
          {blogCategories.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                filter === c
                  ? 'bg-brand-500 text-white'
                  : 'glass hover:text-brand-500 text-gray-600 dark:text-gray-300'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-64">
          <Search size={16} className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search posts..."
            aria-label="Search blog posts"
            className="glass focus:ring-brand-500/40 w-full rounded-full py-2 pr-4 pl-9 text-sm outline-none focus:ring-2"
          />
        </div>
      </Reveal>

      {/* Posts */}
      <motion.div layout className="grid gap-6 sm:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {filtered.map((post) => (
            <motion.article
              key={post.slug}
              layout
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.3 }}
            >
              <Link
                to={`/blog/${post.slug}`}
                className="glass group flex h-full flex-col rounded-2xl p-6 transition-transform hover:-translate-y-1"
              >
                <span className="bg-brand-500/10 text-brand-500 mb-3 w-fit rounded-full px-3 py-1 text-xs font-medium">
                  {post.category}
                </span>
                <h2 className="group-hover:text-brand-500 text-lg font-semibold transition-colors">
                  {post.title}
                </h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                  {post.excerpt}
                </p>
                <div className="mt-4 flex items-center gap-4 text-xs text-gray-400">
                  <span className="flex items-center gap-1">
                    <Calendar size={13} /> {formatDate(post.date)}
                  </span>
                  {post.readTime && (
                    <span className="flex items-center gap-1">
                      <Clock size={13} /> {post.readTime}
                    </span>
                  )}
                  <span className="text-brand-500 ml-auto flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                    Read <ArrowRight size={13} />
                  </span>
                </div>
              </Link>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 && (
        <p className="py-12 text-center text-gray-400">No posts match your search yet.</p>
      )}
    </main>
  );
}
