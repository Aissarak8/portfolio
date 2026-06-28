import { Quote } from 'lucide-react';
import Reveal from './ui/Reveal';
import SectionHeading from './ui/SectionHeading';
import { testimonials } from '../data/content';

export default function Testimonials() {
  return (
    <section id="testimonials" className="section-pad">
      <SectionHeading
        eyebrow="Testimonials"
        title="What people say"
        subtitle="Placeholder reviews — replace with real feedback as you collect it."
      />

      {testimonials.length === 0 && (
        <Reveal>
          <div className="glass mx-auto max-w-lg rounded-2xl border-dashed p-10 text-center">
            <Quote size={32} className="text-brand-500/40 mx-auto mb-3" />
            <p className="font-medium">Testimonials coming soon</p>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              🚧 TODO — real reviews from clients and collaborators will appear here. No placeholder
              quotes, by design. Add them in{' '}
              <code className="bg-brand-500/10 text-brand-500 rounded px-1">
                src/data/content.js
              </code>
              .
            </p>
          </div>
        </Reveal>
      )}

      <div className="grid gap-6 md:grid-cols-3">
        {testimonials.map((t, i) => (
          <Reveal key={t.name} delay={i * 0.1}>
            <figure className="glass flex h-full flex-col rounded-2xl p-6">
              <Quote size={28} className="text-brand-500/40 mb-4" />
              <blockquote className="flex-1 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                "{t.text}"
              </blockquote>
              <figcaption className="mt-5 flex items-center gap-3">
                <span className="from-brand-500 to-accent-500 grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br font-semibold text-white">
                  {t.name.charAt(0)}
                </span>
                <div>
                  <div className="text-sm font-semibold">{t.name}</div>
                  <div className="text-xs text-gray-400">{t.role}</div>
                </div>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
