import { Briefcase, GraduationCap } from 'lucide-react';
import Reveal from './ui/Reveal';
import SectionHeading from './ui/SectionHeading';
import { experience, education, timeline } from '../data/content';

function TimelineItem({ icon: Icon, title, subtitle, period, children, last }) {
  return (
    <div className="relative pl-10">
      {/* line */}
      {!last && (
        <span className="absolute top-8 left-[15px] h-full w-px bg-gray-200 dark:bg-white/10" />
      )}
      {/* dot */}
      <span className="bg-brand-500/10 text-brand-500 absolute top-1 left-0 grid h-8 w-8 place-items-center rounded-full">
        <Icon size={16} />
      </span>
      <div className="pb-8">
        <div className="flex flex-wrap items-baseline justify-between gap-x-4">
          <h4 className="font-semibold">{title}</h4>
          <span className="text-brand-500 text-xs font-medium">{period}</span>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400">{subtitle}</p>
        {children}
      </div>
    </div>
  );
}

export default function Experience() {
  return (
    <section id="experience" className="section-pad">
      <SectionHeading eyebrow="Journey" title="Experience & education" />

      <div className="grid gap-12 md:grid-cols-2">
        {/* Experience */}
        <Reveal>
          <h3 className="mb-8 flex items-center gap-2 text-lg font-bold">
            <Briefcase size={18} className="text-brand-500" /> Experience
          </h3>
          {experience.map((e, i) => (
            <TimelineItem
              key={e.role}
              icon={Briefcase}
              title={e.role}
              subtitle={`${e.company} · ${e.location}`}
              period={e.period}
              last={i === experience.length - 1}
            >
              <ul className="mt-2 space-y-1.5">
                {e.points.map((p) => (
                  <li
                    key={p}
                    className="flex items-start gap-2 text-sm text-gray-500 dark:text-gray-400"
                  >
                    <span className="bg-brand-500 mt-1.5 h-1 w-1 shrink-0 rounded-full" /> {p}
                  </li>
                ))}
              </ul>
            </TimelineItem>
          ))}
        </Reveal>

        {/* Education + mini timeline */}
        <Reveal delay={0.15}>
          <h3 className="mb-8 flex items-center gap-2 text-lg font-bold">
            <GraduationCap size={18} className="text-brand-500" /> Education
          </h3>
          {education.map((ed, i) => (
            <TimelineItem
              key={ed.degree}
              icon={GraduationCap}
              title={ed.degree}
              subtitle={ed.school}
              period={ed.period}
              last={i === education.length - 1}
            >
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{ed.description}</p>
            </TimelineItem>
          ))}

          {/* Milestones */}
          <h3 className="mt-4 mb-6 text-lg font-bold">Milestones</h3>
          <div className="space-y-3">
            {timeline.map((t) => (
              <div key={t.year} className="glass flex gap-4 rounded-xl p-4">
                <span className="text-brand-500 font-mono text-sm font-bold">{t.year}</span>
                <div>
                  <p className="text-sm font-semibold">{t.title}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{t.text}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
