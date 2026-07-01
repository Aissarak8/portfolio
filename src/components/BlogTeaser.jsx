import { Link } from 'react-router-dom';
import { Calendar, ArrowRight } from 'lucide-react';
import Reveal from './ui/Reveal';
import SectionHeading from './ui/SectionHeading';
import { getPosts, formatDate } from '../lib/blog';

/** Shows the latest posts on the homepage and links to the full blog. */
export default function BlogTeaser() {
  const posts = getPosts().slice(0, 3);
  if (posts.length === 0) return null;

  return (
    <section id="blog-teaser" className="section-pad">
      <SectionHeading
        eyebrow="Blog"
        title="Latest writing"
        subtitle="Notes on what I'm building and learning."
      />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post, i) => (
          <Reveal key={post.slug} delay={i * 0.08}>
            <Link
              to={`/blog/${post.slug}`}
              className="glass group flex h-full flex-col rounded-2xl p-6 transition-transform hover:-translate-y-1"
            >
              <span className="bg-brand-500/10 text-brand-500 mb-3 w-fit rounded-full px-3 py-1 text-xs font-medium">
                {post.category}
              </span>
              <h3 className="group-hover:text-brand-500 font-semibold transition-colors">
                {post.title}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                {post.excerpt}
              </p>
              <span className="mt-4 flex items-center gap-1 text-xs text-gray-400">
                <Calendar size={13} /> {formatDate(post.date)}
              </span>
            </Link>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-10 text-center">
        <Link
          to="/blog"
          className="from-brand-500 to-accent-500 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r px-6 py-3 font-semibold text-white"
        >
          Read the blog <ArrowRight size={18} />
        </Link>
      </Reveal>
    </section>
  );
}
