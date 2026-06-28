import { Award, ExternalLink } from 'lucide-react';
import Reveal from './ui/Reveal';
import SectionHeading from './ui/SectionHeading';
import { certificates } from '../data/content';

export default function Certificates() {
  return (
    <section id="certificates" className="section-pad">
      <SectionHeading
        eyebrow="Certificates"
        title="Courses & credentials"
        subtitle="Continuous learning — add your real certificates here as you earn them."
      />

      {certificates.length === 0 && (
        <Reveal>
          <div className="glass mx-auto max-w-lg rounded-2xl border-dashed p-10 text-center">
            <Award size={32} className="text-brand-500/50 mx-auto mb-3" />
            <p className="font-medium">Certificates coming soon</p>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              🚧 TODO — real credentials will appear here as they're earned. Add them in{' '}
              <code className="bg-brand-500/10 text-brand-500 rounded px-1">
                src/data/content.js
              </code>
              .
            </p>
          </div>
        </Reveal>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {certificates.map((c, i) => (
          <Reveal key={c.title} delay={i * 0.06}>
            <a
              href={c.url}
              target="_blank"
              rel="noreferrer"
              className="glass group flex h-full flex-col rounded-2xl p-5 transition-all hover:-translate-y-1"
            >
              <span className="bg-brand-500/10 text-brand-500 mb-4 grid h-11 w-11 place-items-center rounded-xl">
                <Award size={20} />
              </span>
              <h3 className="leading-snug font-semibold">{c.title}</h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{c.issuer}</p>
              <div className="mt-auto flex items-center justify-between pt-4 text-xs text-gray-400">
                <span>{c.year}</span>
                <ExternalLink
                  size={14}
                  className="opacity-0 transition-opacity group-hover:opacity-100"
                />
              </div>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
