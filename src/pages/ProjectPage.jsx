import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  Github,
  ExternalLink,
  Construction,
  Target,
  Lightbulb,
  CheckCircle2,
  Boxes,
  Layers,
  GitBranch,
  ListChecks,
  AlertTriangle,
  GraduationCap,
  Rocket,
  Images,
  FolderTree,
} from 'lucide-react';
import Reveal from '../components/ui/Reveal';
import Lightbox from '../components/project/Lightbox';
import { getProjectById, getAdjacentProjects, getCaseStudy } from '../lib/caseStudy';

const PLACEHOLDER = `${import.meta.env.BASE_URL}placeholder.svg`;

const statusStyle = {
  Live: 'bg-green-500/15 text-green-500',
  Completed: 'bg-green-500/15 text-green-500',
  'In Progress': 'bg-yellow-500/15 text-yellow-500',
  Planned: 'bg-gray-500/15 text-gray-400',
};

/** A titled content block with an icon, consistent across the page. */
function Block({ icon: Icon, title, children }) {
  return (
    <Reveal>
      <section className="mx-auto max-w-4xl px-6">
        <h2 className="mb-5 flex items-center gap-2.5 text-2xl font-bold">
          <span className="bg-brand-500/10 text-brand-500 grid h-9 w-9 place-items-center rounded-lg">
            <Icon size={18} />
          </span>
          {title}
        </h2>
        <div className="text-gray-600 dark:text-gray-300">{children}</div>
      </section>
    </Reveal>
  );
}

function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center gap-4 text-center">
      <h1 className="text-3xl font-bold">Project not found</h1>
      <p className="text-gray-500">That project doesn&apos;t exist (yet).</p>
      <Link to="/" state={{ scrollTo: 'projects' }} className="text-brand-500 underline">
        ← Back to projects
      </Link>
    </div>
  );
}

export default function ProjectPage() {
  const { id } = useParams();
  const project = getProjectById(id);
  const [lightbox, setLightbox] = useState(null);

  // Per-page SEO.
  useEffect(() => {
    if (!project) return;
    const prevTitle = document.title;
    document.title = `${project.title} — Aissa Slikou`;
    const meta = document.querySelector('meta[name="description"]');
    const prevDesc = meta?.getAttribute('content');
    meta?.setAttribute('content', `${project.title}: ${project.description}`);
    return () => {
      document.title = prevTitle;
      if (meta && prevDesc) meta.setAttribute('content', prevDesc);
    };
  }, [project]);

  if (!project) return <NotFound />;

  const cs = getCaseStudy(project);
  const { prev, next } = getAdjacentProjects(id);
  const hasDemo = Boolean(project.demo);

  return (
    <article className="pt-28 pb-24">
      {/* ===== 1. HERO ===== */}
      <header className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="blob bg-brand-500/30 absolute -top-10 -left-20 h-72 w-72 rounded-full" />
          <div className="blob bg-accent-500/20 absolute top-10 right-0 h-72 w-72 rounded-full" />
        </div>

        <div className="mx-auto max-w-4xl px-6">
          <Link
            to="/"
            state={{ scrollTo: 'projects' }}
            className="hover:text-brand-500 mb-6 inline-flex items-center gap-1.5 text-sm text-gray-500 transition-colors"
          >
            <ArrowLeft size={16} /> Back to projects
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyle[project.status] || statusStyle.Planned}`}
              >
                {project.status}
              </span>
              <span className="text-sm text-gray-400">
                {project.category} · {project.year}
              </span>
            </div>

            <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl">{project.title}</h1>
            <p className="mt-4 max-w-2xl text-lg text-gray-500 dark:text-gray-400">
              {project.description}
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="bg-brand-500/10 text-brand-500 rounded-md px-2.5 py-1 text-sm"
                >
                  {t}
                </span>
              ))}
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="from-brand-500 to-accent-500 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r px-5 py-2.5 font-semibold text-white"
              >
                <Github size={18} /> View Code
              </a>
              {hasDemo ? (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noreferrer"
                  className="glass inline-flex items-center gap-2 rounded-xl px-5 py-2.5 font-semibold"
                >
                  <ExternalLink size={18} /> Live Demo
                </a>
              ) : (
                <button
                  disabled
                  aria-disabled="true"
                  title="No live demo yet"
                  className="inline-flex cursor-not-allowed items-center gap-2 rounded-xl border border-gray-200 px-5 py-2.5 font-semibold text-gray-400 dark:border-white/10"
                >
                  <ExternalLink size={18} /> Live Demo (soon)
                </button>
              )}
            </div>
          </motion.div>
        </div>
      </header>

      {/* Template / Coming-soon notice for unbuilt projects */}
      {cs.isTemplate && (
        <Reveal>
          <div className="mx-auto mt-10 max-w-4xl px-6">
            <div className="flex items-start gap-3 rounded-2xl border border-dashed border-yellow-500/40 bg-yellow-500/5 p-5">
              <Construction className="mt-0.5 shrink-0 text-yellow-500" size={20} />
              <p className="text-sm text-gray-600 dark:text-gray-300">
                <strong>Coming soon.</strong> This project is{' '}
                <span className="font-semibold">{project.status}</span>. The case study below is a
                ready-to-fill <strong>template</strong> — sections marked 🚧 will be replaced with
                real content in{' '}
                <code className="bg-brand-500/10 text-brand-500 rounded px-1">
                  src/data/projects.js
                </code>{' '}
                once it&apos;s built.
              </p>
            </div>
          </div>
        </Reveal>
      )}

      <div className="mt-16 space-y-16">
        {/* ===== 2. OVERVIEW ===== */}
        <Block icon={Boxes} title="Overview">
          <p className="leading-relaxed">{cs.overview}</p>
        </Block>

        {/* ===== 3. PROBLEM ===== */}
        <Block icon={Target} title="Problem">
          <p className="leading-relaxed">{cs.problem}</p>
        </Block>

        {/* ===== 4. SOLUTION ===== */}
        <Block icon={Lightbulb} title="Solution">
          <p className="leading-relaxed">{cs.solution}</p>
        </Block>

        {/* ===== 5. FEATURES ===== */}
        {cs.features.length > 0 && (
          <Block icon={CheckCircle2} title="Features">
            <ul className="grid gap-3 sm:grid-cols-2">
              {cs.features.map((f) => (
                <li key={f} className="glass flex items-start gap-2 rounded-xl p-3 text-sm">
                  <CheckCircle2 size={16} className="text-brand-500 mt-0.5 shrink-0" /> {f}
                </li>
              ))}
            </ul>
          </Block>
        )}

        {/* ===== 6. ARCHITECTURE ===== */}
        <Block icon={Layers} title="Architecture">
          <div className="grid gap-4 sm:grid-cols-3">
            {cs.architecture.components.map((c) => (
              <div key={c.name} className="glass rounded-xl p-4">
                <h3 className="text-brand-500 mb-1 font-semibold">{c.name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{c.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="glass rounded-xl p-5">
              <h3 className="mb-2 flex items-center gap-2 font-semibold">
                <GitBranch size={16} className="text-brand-500" /> Data flow
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">{cs.architecture.dataFlow}</p>
            </div>
            <div className="glass overflow-hidden rounded-xl p-5">
              <h3 className="mb-2 flex items-center gap-2 font-semibold">
                <FolderTree size={16} className="text-brand-500" /> Folder structure
              </h3>
              <pre className="overflow-x-auto font-mono text-xs leading-relaxed text-gray-500 dark:text-gray-400">
                {cs.architecture.folderStructure}
              </pre>
            </div>
          </div>
        </Block>

        {/* ===== 7. TECH STACK ===== */}
        <Block icon={Boxes} title="Tech Stack">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {cs.stack.map((group) => (
              <div key={group.label} className="glass rounded-xl p-4">
                <h3 className="mb-2 text-sm font-semibold tracking-wide text-gray-400 uppercase">
                  {group.label}
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {group.items.map((t) => (
                    <span
                      key={t}
                      className="bg-brand-500/10 text-brand-500 rounded-md px-2 py-0.5 text-sm"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Block>

        {/* ===== 8. DEVELOPMENT PROCESS ===== */}
        <Block icon={ListChecks} title="Development Process">
          <ol className="space-y-3">
            {cs.process.map((step, i) => (
              <li key={i} className="flex gap-3">
                <span className="bg-brand-500/10 text-brand-500 grid h-7 w-7 shrink-0 place-items-center rounded-full text-sm font-bold">
                  {i + 1}
                </span>
                <span className="pt-0.5 text-sm leading-relaxed">{step}</span>
              </li>
            ))}
          </ol>
        </Block>

        {/* ===== 9. CHALLENGES & SOLUTIONS ===== */}
        <Block icon={AlertTriangle} title="Challenges & Solutions">
          <div className="space-y-4">
            {cs.challenges.map((c, i) => (
              <div key={i} className="glass rounded-xl p-5">
                <p className="flex items-start gap-2 font-medium">
                  <AlertTriangle size={16} className="mt-1 shrink-0 text-yellow-500" />{' '}
                  {c.challenge}
                </p>
                <p className="mt-2 flex items-start gap-2 text-sm text-gray-500 dark:text-gray-400">
                  <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-green-500" /> {c.solution}
                </p>
              </div>
            ))}
          </div>
        </Block>

        {/* ===== 10 & 11. LEARNED + FUTURE ===== */}
        <div className="mx-auto grid max-w-4xl gap-6 px-6 md:grid-cols-2">
          <Reveal>
            <div className="glass h-full rounded-2xl p-6">
              <h2 className="mb-4 flex items-center gap-2 text-xl font-bold">
                <GraduationCap size={20} className="text-brand-500" /> What I Learned
              </h2>
              <ul className="space-y-2">
                {cs.learned.map((l) => (
                  <li
                    key={l}
                    className="flex items-start gap-2 text-sm text-gray-500 dark:text-gray-400"
                  >
                    <span className="bg-brand-500 mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" /> {l}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="glass h-full rounded-2xl p-6">
              <h2 className="mb-4 flex items-center gap-2 text-xl font-bold">
                <Rocket size={20} className="text-brand-500" /> Future Improvements
              </h2>
              <ul className="space-y-2">
                {cs.future.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-2 text-sm text-gray-500 dark:text-gray-400"
                  >
                    <span className="bg-accent-500 mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" /> {f}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        {/* ===== 12. GALLERY ===== */}
        <Block icon={Images} title="Gallery">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {cs.gallery.map((img, i) => (
              <button
                key={i}
                onClick={() => setLightbox(i)}
                className="glass group block overflow-hidden rounded-xl text-left"
                aria-label={`Open screenshot ${i + 1}`}
              >
                <div className="aspect-video overflow-hidden">
                  <img
                    src={img.src || PLACEHOLDER}
                    alt={img.caption || `Screenshot ${i + 1}`}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <p className="p-3 text-xs text-gray-500 dark:text-gray-400">{img.caption}</p>
              </button>
            ))}
          </div>
        </Block>

        {/* ===== 13 & 14. REPO + LIVE DEMO CTA ===== */}
        <Reveal>
          <div className="mx-auto max-w-4xl px-6">
            <div className="glass flex flex-col items-center gap-4 rounded-2xl p-8 text-center sm:flex-row sm:justify-between sm:text-left">
              <div>
                <h2 className="text-xl font-bold">Explore the project</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Source on GitHub{hasDemo ? ' · try the live demo' : ' · live demo coming soon'}.
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-3">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="from-brand-500 to-accent-500 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r px-5 py-2.5 font-semibold text-white"
                >
                  <Github size={18} /> Repository
                </a>
                {hasDemo ? (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noreferrer"
                    className="glass inline-flex items-center gap-2 rounded-xl px-5 py-2.5 font-semibold"
                  >
                    <ExternalLink size={18} /> Live Demo
                  </a>
                ) : (
                  <button
                    disabled
                    aria-disabled="true"
                    className="inline-flex cursor-not-allowed items-center gap-2 rounded-xl border border-gray-200 px-5 py-2.5 font-semibold text-gray-400 dark:border-white/10"
                  >
                    <ExternalLink size={18} /> Live Demo (soon)
                  </button>
                )}
              </div>
            </div>
          </div>
        </Reveal>

        {/* ===== 15. PREV / NEXT / BACK ===== */}
        <nav className="mx-auto max-w-4xl px-6" aria-label="Project navigation">
          <div className="grid gap-4 sm:grid-cols-3">
            <Link
              to={`/projects/${prev.id}`}
              className="glass group rounded-xl p-4 transition-transform hover:-translate-y-0.5"
            >
              <span className="flex items-center gap-1 text-xs text-gray-400">
                <ArrowLeft size={14} /> Previous
              </span>
              <span className="text-brand-500 mt-1 block font-semibold">{prev.title}</span>
            </Link>
            <Link
              to="/"
              state={{ scrollTo: 'projects' }}
              className="glass grid place-items-center rounded-xl p-4 text-center text-sm font-medium transition-transform hover:-translate-y-0.5"
            >
              All projects
            </Link>
            <Link
              to={`/projects/${next.id}`}
              className="glass group rounded-xl p-4 text-right transition-transform hover:-translate-y-0.5"
            >
              <span className="flex items-center justify-end gap-1 text-xs text-gray-400">
                Next <ArrowRight size={14} />
              </span>
              <span className="text-brand-500 mt-1 block font-semibold">{next.title}</span>
            </Link>
          </div>
        </nav>
      </div>

      <Lightbox
        images={cs.gallery}
        index={lightbox}
        onClose={() => setLightbox(null)}
        onPrev={() => setLightbox((i) => (i - 1 + cs.gallery.length) % cs.gallery.length)}
        onNext={() => setLightbox((i) => (i + 1) % cs.gallery.length)}
      />
    </article>
  );
}
