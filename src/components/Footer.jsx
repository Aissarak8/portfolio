import { Github, Linkedin, Mail, ArrowUp, Heart } from 'lucide-react';
import { profile } from '../data/profile';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-gray-200 dark:border-white/10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-6 py-10 md:flex-row md:px-8">
        <div className="text-center md:text-left">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="font-bold"
          >
            Aissa<span className="text-brand-500">.</span>
          </button>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{profile.title}</p>
        </div>

        <div className="flex items-center gap-4">
          <a
            href={profile.socials.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="hover:text-brand-500 text-gray-500"
          >
            <Github size={20} />
          </a>
          {profile.socials.linkedin && (
            <a
              href={profile.socials.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="hover:text-brand-500 text-gray-500"
            >
              <Linkedin size={20} />
            </a>
          )}
          <a
            href={profile.socials.email}
            aria-label="Email"
            className="hover:text-brand-500 text-gray-500"
          >
            <Mail size={20} />
          </a>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Back to top"
            className="bg-brand-500/10 text-brand-500 hover:bg-brand-500/20 grid h-10 w-10 place-items-center rounded-xl"
          >
            <ArrowUp size={18} />
          </button>
        </div>
      </div>

      <div className="border-t border-gray-200 py-5 text-center text-sm text-gray-400 dark:border-white/10">
        <p className="flex items-center justify-center gap-1.5">
          © {year} {profile.name}. Built with <Heart size={14} className="text-brand-500" /> using
          React &amp; Tailwind.
        </p>
      </div>
    </footer>
  );
}
