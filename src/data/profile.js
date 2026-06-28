/**
 * Central profile config. Edit THIS file to update the whole site.
 *
 * ✅ Verified facts: name, location, email, phone, education, languages, GitHub handle.
 * 🚧 TODO items below are clearly marked — fill them in as they become real.
 *    Never replace a TODO with invented data.
 */
export const profile = {
  name: 'Aissa Slikou',
  firstName: 'Aissa',
  title: 'AI Engineer · Full-Stack Developer · Software Entrepreneur',
  tagline: 'I build AI agents, web apps, and automations — and I learn in public.',
  location: 'Marrakech, Morocco',
  email: 'aissaslikou2@gmail.com',
  phone: '+212 621 805 770',

  // GitHub handle — single source of truth for every link in the app.
  githubUsername: 'Aissarak8',

  // 🚧 TODO: add a real resume PDF at portfolio/public/resume.pdf
  resumeUrl: '/resume.pdf',

  // GitHub REST API has no "pinned" endpoint (it's GraphQL-only, needs a token),
  // so the dashboard shows THESE repos as your pins. Keep in sync with what you
  // actually pin on github.com/Aissarak8.
  pinnedRepos: [
    'portfolio',
    'swaply',
    'ai-agents',
    'n8n-workflows',
    'react-projects',
    'python-projects',
  ],

  // The project id (from data/projects.js) to feature as your current main focus.
  currentProjectId: 'portfolio',

  education: {
    degree: 'Licence en Informatique Appliquée',
    school: 'Faculté des Sciences Semlalia',
    location: 'Marrakech, Morocco',
    period: '2025 — Present',
  },

  // Spoken languages (CEFR levels).
  languages: [
    { name: 'Arabic', level: 'Native' },
    { name: 'French', level: 'B2' },
    { name: 'English', level: 'B1' },
  ],

  about: [
    "I'm a Computer Science student at Faculté des Sciences Semlalia in Marrakech, focused on Artificial Intelligence, automation, and full-stack web development.",
    'I learn in public and aim to ship something every month — from AI agents and RAG pipelines to React apps and n8n automations.',
    'My goal is to grow into an AI Engineer, Full-Stack Developer and software entrepreneur — building real products and SaaS while contributing to teams as an intern or remote developer.',
  ],

  socials: {
    github: 'https://github.com/Aissarak8',
    email: 'mailto:aissaslikou2@gmail.com',
    // 🚧 TODO: add real profile URLs, then re-enable these links.
    linkedin: '', // e.g. 'https://www.linkedin.com/in/your-handle'
    twitter: '', // optional
  },

  // Honest, defensible stats only — no inflated numbers.
  stats: [
    { label: 'Languages Spoken', value: '3' },
    { label: 'Technologies', value: '20+' },
    { label: 'Month Roadmap', value: '12' },
    { label: 'Curiosity', value: '∞' },
  ],
};
