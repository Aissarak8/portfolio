import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Github, ExternalLink, Search, ArrowRight } from 'lucide-react';
import Reveal from './ui/Reveal';
import SectionHeading from './ui/SectionHeading';
import { projects, categories } from '../data/projects';

const statusColor = {
  Completed: 'bg-green-500/15 text-green-500',
  Live: 'bg-green-500/15 text-green-500',
  'In Progress': 'bg-yellow-500/15 text-yellow-500',
  Planned: 'bg-gray-500/15 text-gray-400',
};

function ProjectCard({ project }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className="glass group flex flex-col overflow-hidden rounded-2xl"
    >
      {/* Image / placeholder — links to the case study */}
      <Link
        to={`/projects/${project.id}`}
        className="from-brand-500/20 to-accent-500/20 relative block aspect-video overflow-hidden bg-gradient-to-br"
      >
        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="text-brand-500/40 flex h-full items-center justify-center text-4xl font-bold">
            {project.title.charAt(0)}
          </div>
        )}
        <span
          className={`absolute top-3 right-3 rounded-full px-2.5 py-1 text-xs font-semibold ${statusColor[project.status]}`}
        >
          {project.status}
        </span>
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="font-semibold">
            <Link to={`/projects/${project.id}`} className="hover:text-brand-500 transition-colors">
              {project.title}
            </Link>
          </h3>
          <span className="text-xs text-gray-400">{project.year}</span>
        </div>
        <p className="mb-4 flex-1 text-sm leading-relaxed text-gray-500 dark:text-gray-400">
          {project.description}
        </p>

        <div className="mb-4 flex flex-wrap gap-1.5">
          {project.tech.slice(0, 4).map((t) => (
            <span key={t} className="bg-brand-500/10 text-brand-500 rounded-md px-2 py-0.5 text-xs">
              {t}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Link
            to={`/projects/${project.id}`}
            className="from-brand-500 to-accent-500 flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-gradient-to-r px-3 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            Case Study <ArrowRight size={15} />
          </Link>
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              aria-label={`${project.title} on GitHub`}
              className="grid h-9 w-9 place-items-center rounded-lg border border-gray-200 hover:bg-gray-100 dark:border-white/10 dark:hover:bg-white/5"
            >
              <Github size={16} />
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noreferrer"
              aria-label={`${project.title} live demo`}
              className="grid h-9 w-9 place-items-center rounded-lg border border-gray-200 hover:bg-gray-100 dark:border-white/10 dark:hover:bg-white/5"
            >
              <ExternalLink size={16} />
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}

export default function Projects() {
  const [filter, setFilter] = useState('All');
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      const matchesCat = filter === 'All' || p.category === filter;
      const q = query.toLowerCase();
      const matchesQuery =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tech.some((t) => t.toLowerCase().includes(q));
      return matchesCat && matchesQuery;
    });
  }, [filter, query]);

  return (
    <section id="projects" className="section-pad">
      <SectionHeading
        eyebrow="Portfolio"
        title="Featured projects"
        subtitle="A selection of things I'm building. Open a case study, or filter and search to explore."
      />

      {/* Controls */}
      <Reveal className="mb-10 flex flex-col items-center justify-between gap-4 md:flex-row">
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
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
            placeholder="Search projects..."
            aria-label="Search projects"
            className="glass focus:ring-brand-500/40 w-full rounded-full py-2 pr-4 pl-9 text-sm outline-none focus:ring-2"
          />
        </div>
      </Reveal>

      {/* Grid */}
      <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 && (
        <p className="py-12 text-center text-gray-400">No projects match your search.</p>
      )}
    </section>
  );
}
