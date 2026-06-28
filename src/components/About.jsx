import { MapPin, GraduationCap, Mail, Phone, Languages } from 'lucide-react';
import Reveal from './ui/Reveal';
import SectionHeading from './ui/SectionHeading';
import { profile } from '../data/profile';

export default function About() {
  return (
    <section id="about" className="section-pad">
      <SectionHeading eyebrow="About" title="A bit about me" />

      <div className="grid items-center gap-12 md:grid-cols-2">
        <Reveal>
          <div className="space-y-4 text-lg leading-relaxed text-gray-600 dark:text-gray-300">
            {profile.about.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          <div className="mt-8 space-y-3 text-sm">
            <div className="flex items-center gap-3">
              <MapPin size={18} className="text-brand-500" /> {profile.location}
            </div>
            <div className="flex items-center gap-3">
              <GraduationCap size={18} className="text-brand-500" />
              {profile.education.degree} · {profile.education.school} ({profile.education.period})
            </div>
            <div className="flex items-center gap-3">
              <Languages size={18} className="text-brand-500" />
              {profile.languages.map((l) => `${l.name} (${l.level})`).join(' · ')}
            </div>
            <div className="flex items-center gap-3">
              <Mail size={18} className="text-brand-500" />
              <a href={profile.socials.email} className="hover:text-brand-500">
                {profile.email}
              </a>
            </div>
            <div className="flex items-center gap-3">
              <Phone size={18} className="text-brand-500" />
              <a href={`tel:${profile.phone.replace(/\s/g, '')}`} className="hover:text-brand-500">
                {profile.phone}
              </a>
            </div>
          </div>
        </Reveal>

        {/* Stats grid */}
        <Reveal delay={0.15}>
          <div className="grid grid-cols-2 gap-4">
            {profile.stats.map((s) => (
              <div
                key={s.label}
                className="glass rounded-2xl p-6 text-center transition-transform hover:-translate-y-1"
              >
                <div className="gradient-text text-3xl font-extrabold md:text-4xl">{s.value}</div>
                <div className="mt-1 text-sm text-gray-500 dark:text-gray-400">{s.label}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
