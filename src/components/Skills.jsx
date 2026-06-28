import { motion } from 'framer-motion';
import Reveal from './ui/Reveal';
import Icon from './ui/Icon';
import SectionHeading from './ui/SectionHeading';
import { skillGroups, techStack } from '../data/skills';

function Bar({ name, level, learning }) {
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between text-sm">
        <span className="font-medium">
          {name}
          {learning && (
            <span className="bg-accent-500/15 text-accent-500 ml-2 rounded-full px-2 py-0.5 text-[10px] font-semibold tracking-wide uppercase">
              learning
            </span>
          )}
        </span>
        <span className="text-gray-400">{level}%</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-gray-200 dark:bg-white/10">
        <motion.div
          className="from-brand-500 to-accent-500 h-full rounded-full bg-gradient-to-r"
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="section-pad">
      <SectionHeading
        eyebrow="Skills"
        title="My tech stack"
        subtitle="The languages and tools I use to build — plus what I'm currently learning."
      />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group, i) => (
          <Reveal key={group.category} delay={i * 0.08}>
            <div className="glass h-full rounded-2xl p-6">
              <div className="mb-5 flex items-center gap-3">
                <span className="bg-brand-500/10 text-brand-500 grid h-10 w-10 place-items-center rounded-xl">
                  <Icon name={group.icon} size={20} />
                </span>
                <h3 className="font-semibold">{group.category}</h3>
              </div>
              <div className="space-y-4">
                {group.skills.map((s) => (
                  <Bar key={s.name} {...s} />
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      {/* Tech marquee */}
      <Reveal className="mt-12">
        <div className="relative overflow-hidden py-4">
          <div className="flex w-max animate-[scroll_30s_linear_infinite] gap-3">
            {[...techStack, ...techStack].map((t, i) => (
              <span
                key={i}
                className="glass rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </Reveal>

      <style>{`@keyframes scroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }`}</style>
    </section>
  );
}
