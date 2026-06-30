import { Briefcase, GraduationCap, Target } from 'lucide-react';
import Reveal from './ui/Reveal';
import SectionHeading from './ui/SectionHeading';
import { experience, education } from '../data/content';
import { profile } from '../data/profile';

function TimelineItem({ icon: Icon, title, subtitle, period, children, last }) {
  return (
    <div className="relative pl-10">
      {!last && (
        <span className="absolute top-8 left-[15px] h-full w-px bg-gray-200 dark:bg-white/10" />
      )}
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
        {/* Experience — honest: none yet */}
        <Reveal>
          <h3 className="mb-8 flex items-center gap-2 text-lg font-bold">
            <Briefcase size={18} className="text-brand-500" /> Experience
          </h3>

          {experience.length > 0 ? (
            experience.map((e, i) => (
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
            ))
          ) : (
            <div className="glass rounded-2xl p-6">
              <p className="font-medium">No professional experience yet — and that&apos;s okay.</p>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                I&apos;m a student focused on building real projects and learning by doing. This
                section will grow as I take on internships and freelance work.
              </p>
              <div className="bg-brand-500/5 mt-5 flex items-start gap-2 rounded-xl p-4">
                <Target size={18} className="text-brand-500 mt-0.5 shrink-0" />
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {profile.careerObjective}
                </p>
              </div>
            </div>
          )}
        </Reveal>

        {/* Education */}
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
        </Reveal>
      </div>
    </section>
  );
}
