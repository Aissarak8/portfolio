import { CheckCircle2, Circle } from 'lucide-react';
import Reveal from './ui/Reveal';
import SectionHeading from './ui/SectionHeading';
import { learningJourney } from '../data/content';

/** Honest "Learning Journey": what I've started vs what's next. */
export default function LearningJourney() {
  return (
    <section id="learning" className="section-pad">
      <SectionHeading
        eyebrow="Learning Journey"
        title="What I'm learning"
        subtitle="An honest snapshot of where I am and where I'm heading."
      />

      <div className="grid gap-6 md:grid-cols-2">
        {/* Current */}
        <Reveal>
          <div className="glass h-full rounded-2xl p-6">
            <h3 className="mb-5 flex items-center gap-2 font-semibold">
              <CheckCircle2 size={18} className="text-green-500" /> Currently learning
            </h3>
            <ul className="grid gap-2.5 sm:grid-cols-2">
              {learningJourney.current.map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm">
                  <CheckCircle2 size={16} className="shrink-0 text-green-500" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        {/* Future */}
        <Reveal delay={0.1}>
          <div className="glass h-full rounded-2xl p-6">
            <h3 className="mb-5 flex items-center gap-2 font-semibold">
              <Circle size={18} className="text-brand-500" /> Next up
            </h3>
            <ul className="grid gap-2.5 sm:grid-cols-2">
              {learningJourney.future.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400"
                >
                  <Circle size={16} className="text-brand-500/60 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
