import Reveal from './ui/Reveal';
import Icon from './ui/Icon';
import SectionHeading from './ui/SectionHeading';
import { services } from '../data/content';

export default function Services() {
  return (
    <section id="services" className="section-pad">
      <SectionHeading
        eyebrow="Services"
        title="What I can do for you"
        subtitle="Services that honestly match my current level — websites, customization and simple automation."
      />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s, i) => (
          <Reveal key={s.title} delay={i * 0.08}>
            <div className="glass group hover:shadow-brand-500/10 h-full rounded-2xl p-6 transition-all hover:-translate-y-1.5 hover:shadow-xl">
              <span className="from-brand-500 to-accent-500 mb-4 grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br text-white transition-transform group-hover:scale-110">
                <Icon name={s.icon} size={22} />
              </span>
              <h3 className="mb-2 font-semibold">{s.title}</h3>
              <p className="text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                {s.description}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
