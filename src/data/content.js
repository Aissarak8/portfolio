/**
 * Services, experience, education, certificates, testimonials, learning journey.
 *
 * INTEGRITY RULE: nothing here is invented. No professional experience or
 * certificates yet, so those are empty and the UI shows an honest message.
 */

// Only services that honestly match the current level.
export const services = [
  {
    icon: 'Layout',
    title: 'Landing Page Development',
    description:
      'Clean, fast, single-page landing sites built with modern HTML, CSS and JavaScript.',
  },
  {
    icon: 'Code2',
    title: 'Portfolio Website Development',
    description:
      'Personal and portfolio websites — like this one — built with React and Tailwind CSS.',
  },
  {
    icon: 'Paintbrush',
    title: 'Website Customization',
    description: 'Tweaking and customizing existing websites: layout, styling and small features.',
  },
  {
    icon: 'Globe',
    title: 'Responsive Web Design',
    description: 'Mobile-first, responsive layouts that look great on every screen size.',
  },
  {
    icon: 'Workflow',
    title: 'AI Automation',
    description:
      'Building simple automations and AI agents with n8n — currently learning and taking on small projects.',
  },
];

// No professional experience yet — kept empty on purpose. The UI shows an honest
// note + career objective instead of inventing roles.
// 🚧 TODO: add real internships / freelance work here once you have them.
export const experience = [];

export const education = [
  {
    degree: 'Licence en Informatique Appliquée (Applied Computer Science)',
    school: 'Faculté des Sciences Semlalia',
    period: '2025 — Present',
    description:
      'Applied Computer Science — programming, algorithms, databases, software engineering and web technologies. Marrakech, Morocco.',
  },
];

// 🚧 TODO: none yet — add real certificates as they are earned. The UI shows a
// tasteful placeholder while empty.
export const certificates = [];

// 🚧 TODO: empty until real reviews are collected (no fake testimonials).
export const testimonials = [];

/** Learning Journey — what I've started vs what's next. Honest checklist. */
export const learningJourney = {
  current: ['Python', 'Java', 'C', 'React', 'Node.js', 'AI', 'AI Agents', 'n8n'],
  future: ['Docker', 'SQL', 'RAG', 'MCP', 'Next.js', 'AWS', 'Kubernetes'],
};
