import { useEffect, useMemo, useRef, useState } from 'react';
import SectionHeading from './ui/SectionHeading';
import Reveal from './ui/Reveal';
import { profile } from '../data/profile';
import { projects } from '../data/projects';
import { skillGroups } from '../data/skills';
import { timeline } from '../data/content';

/**
 * Interactive terminal. Commands answer from the same data that powers the site,
 * so there's a single source of truth. Supports command history (↑/↓) and
 * Tab autocomplete. Fully keyboard-accessible.
 */
export default function Terminal() {
  const prompt = `aissa@portfolio:~$`;

  // ---- Command implementations (return strings or React nodes) ----
  const commands = useMemo(() => {
    const link = (href, label) => (
      <a
        key={href}
        href={href}
        target="_blank"
        rel="noreferrer"
        className="text-accent-400 underline"
      >
        {label || href}
      </a>
    );

    const map = {
      help: () => (
        <div>
          <p className="text-gray-400">Available commands:</p>
          <div className="mt-1 grid grid-cols-2 gap-x-6 sm:grid-cols-3">
            {Object.keys(map)
              .sort()
              .map((c) => (
                <span key={c} className="text-brand-400">
                  {c}
                </span>
              ))}
          </div>
          <p className="mt-2 text-gray-500">Tip: use ↑/↓ for history, Tab to autocomplete.</p>
        </div>
      ),
      about: () => (
        <div className="space-y-1">
          {profile.about.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      ),
      whoami: () => (
        <div>
          <p>
            <span className="text-gray-500">name </span>
            {profile.name} (@{profile.githubUsername})
          </p>
          <p>
            <span className="text-gray-500">role </span>
            {profile.title}
          </p>
          <p>
            <span className="text-gray-500">loc </span>
            {profile.location}
          </p>
          <p>
            <span className="text-gray-500">edu </span>
            {profile.education.degree} · {profile.education.school}
          </p>
          <p>
            <span className="text-gray-500">lang </span>
            {profile.languages.map((l) => `${l.name} (${l.level})`).join(', ')}
          </p>
        </div>
      ),
      skills: () => (
        <div className="space-y-1">
          {skillGroups.map((g) => (
            <p key={g.category}>
              <span className="text-brand-400">{g.category.padEnd(16)}</span>
              {g.skills.map((s) => s.name).join(', ')}
            </p>
          ))}
        </div>
      ),
      projects: () => (
        <div className="space-y-0.5">
          {projects.map((p) => (
            <p key={p.id}>
              <span className="text-brand-400">{`• ${p.title}`.padEnd(26)}</span>
              <span className="text-gray-500">[{p.status}]</span> {link(p.github, 'repo')}
            </p>
          ))}
          <p className="mt-1 text-gray-500">Run `github` to visit the profile.</p>
        </div>
      ),
      roadmap: () => (
        <div className="space-y-0.5">
          {timeline.map((t) => (
            <p key={t.year + t.title}>
              <span className="text-brand-400">{String(t.year).padEnd(8)}</span>
              {t.title} — <span className="text-gray-400">{t.text}</span>
            </p>
          ))}
        </div>
      ),
      contact: () => (
        <div>
          <p>
            <span className="text-gray-500">email </span>
            {link(`mailto:${profile.email}`, profile.email)}
          </p>
          <p>
            <span className="text-gray-500">phone </span>
            {profile.phone}
          </p>
          <p>
            <span className="text-gray-500">github</span>{' '}
            {link(profile.socials.github, `@${profile.githubUsername}`)}
          </p>
        </div>
      ),
      social: () => (
        <div>
          <p>{link(profile.socials.github, 'GitHub')}</p>
          {profile.socials.linkedin ? (
            <p>{link(profile.socials.linkedin, 'LinkedIn')}</p>
          ) : (
            <p className="text-gray-500">LinkedIn: (not set yet)</p>
          )}
          <p>{link(`mailto:${profile.email}`, 'Email')}</p>
        </div>
      ),
      cv: () => (
        <p>
          Download CV: {link(profile.resumeUrl, 'resume.pdf')}{' '}
          <span className="text-gray-500">(🚧 add the real file to public/resume.pdf)</span>
        </p>
      ),
      github: () => {
        if (typeof window !== 'undefined')
          window.open(profile.socials.github, '_blank', 'noopener');
        return <p>Opening {link(profile.socials.github)} …</p>;
      },
      date: () => <p>{new Date().toString()}</p>,
      echo: (args) => <p>{args.join(' ')}</p>,
      neofetch: () => (
        <pre className="leading-snug whitespace-pre-wrap">
          {`      ╭───────────────╮
      │   A   S   ▮    │   ${profile.name}
      │  ▟███▙ ▟██▙    │   ${'-'.repeat(profile.name.length)}
      │  ██ ██ ██▛     │   handle: @${profile.githubUsername}
      │  ▜███▛ ▜██▛    │   role:   AI · Full-Stack · Automation
      │               │   loc:    ${profile.location}
      ╰───────────────╯   stack:  React · Node · Python · n8n`}
        </pre>
      ),
      clear: () => '__CLEAR__',
    };
    return map;
  }, []);

  const welcome = [
    {
      id: 'w1',
      type: 'output',
      content: (
        <div>
          <p className="text-brand-400">Welcome to Aissa Slikou&apos;s interactive terminal 👋</p>
          <p className="text-gray-500">
            Type <span className="text-brand-400">help</span> to see available commands.
          </p>
        </div>
      ),
    },
  ];

  const [lines, setLines] = useState(welcome);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([]);
  const [hIndex, setHIndex] = useState(-1);
  const inputRef = useRef(null);
  const bodyRef = useRef(null);

  // Auto-scroll to newest line.
  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [lines]);

  const run = (raw) => {
    const text = raw.trim();
    const inputLine = { id: `i${Date.now()}`, type: 'input', content: raw };

    if (!text) {
      setLines((l) => [...l, inputLine]);
      return;
    }

    const [cmd, ...args] = text.split(/\s+/);
    const handler = commands[cmd.toLowerCase()];

    if (!handler) {
      setLines((l) => [
        ...l,
        inputLine,
        {
          id: `o${Date.now()}`,
          type: 'output',
          content: (
            <p>
              <span className="text-red-400">command not found:</span> {cmd}. Type{' '}
              <span className="text-brand-400">help</span>.
            </p>
          ),
        },
      ]);
    } else {
      const out = handler(args);
      if (out === '__CLEAR__') {
        setLines([]);
      } else {
        setLines((l) => [...l, inputLine, { id: `o${Date.now()}`, type: 'output', content: out }]);
      }
    }

    setHistory((h) => [...h, text]);
    setHIndex(-1);
  };

  const onKeyDown = (e) => {
    if (e.key === 'Enter') {
      run(input);
      setInput('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length) {
        const idx = hIndex < 0 ? history.length - 1 : Math.max(0, hIndex - 1);
        setHIndex(idx);
        setInput(history[idx]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (hIndex >= 0) {
        const idx = hIndex + 1;
        if (idx >= history.length) {
          setHIndex(-1);
          setInput('');
        } else {
          setHIndex(idx);
          setInput(history[idx]);
        }
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const match = Object.keys(commands).find((c) => c.startsWith(input.toLowerCase()));
      if (match) setInput(match);
    }
  };

  return (
    <section id="terminal" className="section-pad">
      <SectionHeading
        eyebrow="CLI"
        title="Explore via terminal"
        subtitle="Prefer a keyboard? Type a command. Try help, about, projects or neofetch."
      />

      <Reveal>
        <div
          className="glass mx-auto max-w-3xl overflow-hidden rounded-2xl shadow-2xl"
          onClick={() => inputRef.current?.focus()}
        >
          {/* Title bar */}
          <div className="bg-ink-900 flex items-center gap-2 border-b border-white/10 px-4 py-3">
            <span className="h-3 w-3 rounded-full bg-red-400" />
            <span className="h-3 w-3 rounded-full bg-yellow-400" />
            <span className="h-3 w-3 rounded-full bg-green-400" />
            <span className="ml-2 font-mono text-xs text-gray-500">aissa@portfolio — bash</span>
          </div>

          {/* Body */}
          <div
            ref={bodyRef}
            className="bg-ink-950/95 h-80 overflow-y-auto p-4 font-mono text-sm leading-relaxed text-gray-200"
            role="log"
            aria-live="polite"
          >
            {lines.map((line) => (
              <div key={line.id} className="mb-1">
                {line.type === 'input' ? (
                  <p>
                    <span className="text-green-400">{prompt}</span> {line.content}
                  </p>
                ) : (
                  <div className="text-gray-200">{line.content}</div>
                )}
              </div>
            ))}

            {/* Active prompt */}
            <div className="flex items-center">
              <span className="shrink-0 text-green-400">{prompt}</span>
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKeyDown}
                aria-label="Terminal command input"
                autoComplete="off"
                autoCapitalize="off"
                spellCheck="false"
                className="caret-brand-400 ml-2 flex-1 bg-transparent text-gray-100 outline-none"
              />
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
