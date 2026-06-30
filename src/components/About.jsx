import { MapPin, GraduationCap, Mail, Languages, Heart, Building2 } from 'lucide-react';
import Reveal from './ui/Reveal';
import SectionHeading from './ui/SectionHeading';
import { profile } from '../data/profile';

export default function About() {
  return (
    <section id="about" className="section-pad">
      <SectionHeading eyebrow="About" title="A bit about me" />

      <div className="grid items-start gap-12 md:grid-cols-2">
        {/* Left: bio + key facts */}
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
          </div>
        </Reveal>

        {/* Right: avatar + stats + interests */}
        <Reveal delay={0.15}>
          <div className="flex flex-col items-center">
            {/* 🚧 TODO: replace public/avatar.svg with a real photo (public/avatar.jpg) */}
            <img
              src={`${import.meta.env.BASE_URL}${profile.avatar.replace(/^\//, '')}`}
              alt={`${profile.name} avatar`}
              className="ring-brand-500/20 mb-8 h-32 w-32 rounded-full ring-4"
              width="128"
              height="128"
            />

            <div className="grid w-full grid-cols-2 gap-4">
              {profile.stats.map((s) => (
                <div
                  key={s.label}
                  className="glass rounded-2xl p-5 text-center transition-transform hover:-translate-y-1"
                >
                  <div className="gradient-text text-2xl font-extrabold md:text-3xl">{s.value}</div>
                  <div className="mt-1 text-sm text-gray-500 dark:text-gray-400">{s.label}</div>
                </div>
              ))}
            </div>

            {/* Interests */}
            <div className="glass mt-4 w-full rounded-2xl p-5">
              <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold">
                <Heart size={16} className="text-brand-500" /> Interests
              </h3>
              <div className="flex flex-wrap gap-2">
                {profile.hobbies.map((h) => (
                  <span
                    key={h}
                    className="bg-brand-500/10 text-brand-500 rounded-full px-3 py-1 text-sm"
                  >
                    {h}
                  </span>
                ))}
              </div>
            </div>

            {/* Dream companies */}
            <div className="glass mt-4 flex w-full items-center gap-3 rounded-2xl p-5 text-sm">
              <Building2 size={18} className="text-brand-500 shrink-0" />
              <span className="text-gray-500 dark:text-gray-400">
                Dream companies:{' '}
                <strong className="text-gray-700 dark:text-gray-200">
                  {profile.dreamCompanies.join(' · ')}
                </strong>
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
