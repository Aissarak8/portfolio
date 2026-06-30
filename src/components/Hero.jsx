import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, ArrowDown } from 'lucide-react';
import { profile } from '../data/profile';

export default function Hero() {
  return (
    <section id="home" className="relative flex min-h-screen items-center overflow-hidden">
      {/* Animated background blobs */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="blob bg-brand-500/40 absolute top-20 -left-20 h-72 w-72 rounded-full" />
        <div
          className="blob bg-accent-500/30 absolute top-40 right-0 h-80 w-80 rounded-full"
          style={{ animationDelay: '-5s' }}
        />
        <div
          className="blob bg-brand-400/20 absolute bottom-0 left-1/3 h-72 w-72 rounded-full"
          style={{ animationDelay: '-9s' }}
        />
      </div>

      <div className="section-pad grid w-full items-center gap-12 md:grid-cols-[1.2fr_1fr]">
        {/* Text */}
        <div>
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
            </span>
            Available for internships & freelance
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-6 text-4xl leading-[1.1] font-extrabold tracking-tight sm:text-5xl md:text-6xl"
          >
            Hi, I'm <span className="gradient-text">{profile.firstName}</span>.
            <br />
            Future <span className="gradient-text">AI Engineer</span>.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-brand-500 mt-3 font-medium"
          >
            {profile.title}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 max-w-xl text-lg text-gray-500 dark:text-gray-400"
          >
            Based in {profile.location}. {profile.tagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <a
              href="#projects"
              className="from-brand-500 to-accent-500 shadow-brand-500/30 rounded-xl bg-gradient-to-r px-6 py-3 font-semibold text-white shadow-lg transition-transform hover:scale-[1.03]"
            >
              View My Work
            </a>
            <a
              href="#contact"
              className="glass inline-flex items-center gap-2 rounded-xl px-6 py-3 font-semibold transition-transform hover:scale-[1.03]"
            >
              <Mail size={18} /> Contact Me
            </a>
          </motion.div>

          {/* Socials */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8 flex items-center gap-4"
          >
            {[
              { icon: Github, href: profile.socials.github, label: 'GitHub' },
              { icon: Linkedin, href: profile.socials.linkedin, label: 'LinkedIn' },
              { icon: Mail, href: profile.socials.email, label: 'Email' },
            ]
              .filter(({ href }) => href) // skip TODO/empty socials
              .map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-brand-500 text-gray-500 transition-colors dark:text-gray-400"
                >
                  <Icon size={22} />
                </a>
              ))}
          </motion.div>
        </div>

        {/* Code card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="glass relative rounded-2xl p-1 shadow-2xl"
        >
          <div className="bg-ink-900 rounded-xl p-5 font-mono text-sm leading-relaxed text-gray-300">
            <div className="mb-4 flex gap-1.5">
              <span className="h-3 w-3 rounded-full bg-red-400" />
              <span className="h-3 w-3 rounded-full bg-yellow-400" />
              <span className="h-3 w-3 rounded-full bg-green-400" />
            </div>
            <pre className="whitespace-pre-wrap">
              <span className="text-purple-400">const</span>{' '}
              <span className="text-accent-400">developer</span> = {'{'}
              {'\n'} name: <span className="text-green-400">'Aissa Slikou'</span>,{'\n'} role:{' '}
              <span className="text-green-400">'CS Student · Future AI Engineer'</span>,{'\n'}{' '}
              stack: [<span className="text-green-400">'Python'</span>,{' '}
              <span className="text-green-400">'JavaScript'</span>,{' '}
              <span className="text-green-400">'HTML'</span>,{' '}
              <span className="text-green-400">'CSS'</span>],
              {'\n'} learning: [<span className="text-green-400">'React'</span>,{' '}
              <span className="text-green-400">'AI Agents'</span>],{'\n'} building:{' '}
              <span className="text-brand-400">true</span>,{'\n'}
              {'}'};
            </pre>
          </div>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <a
        href="#about"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gray-400"
        aria-label="Scroll down"
      >
        <motion.span animate={{ y: [0, 8, 0] }} transition={{ duration: 1.6, repeat: Infinity }}>
          <ArrowDown size={22} />
        </motion.span>
      </a>
    </section>
  );
}
