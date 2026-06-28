/**
 * Services, experience, education, certificates, testimonials, timeline.
 *
 * INTEGRITY RULE: nothing here is invented. Anything not yet real is an empty
 * array or a clearly-marked 🚧 TODO. Fill them in only with true information.
 */

export const services = [
  {
    icon: 'BrainCircuit',
    title: 'AI & Agents',
    description:
      'Custom AI agents, RAG pipelines and MCP integrations that automate real tasks and reason over your data.',
  },
  {
    icon: 'Code2',
    title: 'Full-Stack Web',
    description:
      'Modern, responsive web apps with React & Node.js — from landing pages to full products with APIs and auth.',
  },
  {
    icon: 'Workflow',
    title: 'Automation',
    description:
      'Workflow automation with n8n and custom scripts — connect your apps and remove repetitive manual work.',
  },
  {
    icon: 'ShoppingCart',
    title: 'WordPress & WooCommerce',
    description:
      'Custom WordPress sites and WooCommerce stores with tailored themes and optimized, SEO-friendly pages.',
  },
];

/**
 * Honest "journey" — self-directed learning & building, NOT employment.
 * 🚧 TODO: add real internships / freelance / client work here once you have it,
 *    with the real company, role and dates. Do not invent.
 */
export const experience = [
  {
    role: 'Aspiring Full-Stack & AI Developer (Self-Directed)',
    company: 'Independent Learning & Open Source',
    period: '2025 — Present',
    location: 'Marrakech, Morocco',
    points: [
      'Building a public portfolio of projects across web, AI and automation.',
      'Studying AI engineering: agents, RAG pipelines and the Model Context Protocol (MCP).',
      'Learning full-stack development with React, Node.js and modern tooling.',
    ],
  },
  // 🚧 TODO: { role: '', company: '', period: '', location: '', points: [] }
];

export const education = [
  {
    degree: 'Licence en Informatique Appliquée',
    school: 'Faculté des Sciences Semlalia',
    period: '2025 — Present',
    description:
      'Applied Computer Science — programming, algorithms, databases, software engineering and web technologies. Marrakech, Morocco.',
  },
];

/**
 * 🚧 TODO: Certificates — currently EMPTY on purpose (none invented).
 * Add real ones as you earn them, e.g.:
 *   { title: 'Responsive Web Design', issuer: 'freeCodeCamp', year: '2026', url: 'https://...' }
 */
export const certificates = [];

/**
 * 🚧 TODO: Testimonials — EMPTY until you collect real reviews.
 * Fake testimonials hurt credibility, so the section shows a tasteful placeholder
 * until this array has real entries.
 *   { name: '', role: '', text: '', avatar: '' }
 */
export const testimonials = [];

export const timeline = [
  {
    year: '2025',
    title: 'Started CS Degree',
    text: 'Began Licence en Informatique Appliquée at Faculté des Sciences Semlalia.',
  },
  {
    year: '2025',
    title: 'Foundations',
    text: 'Building on Java, C and Python; learning HTML, CSS & JavaScript.',
  },
  {
    year: '2026',
    title: 'Full-Stack & AI',
    text: 'Focusing on React, Node.js, AI agents, RAG, MCP and n8n automation.',
  },
  {
    year: 'Goal',
    title: 'Ship Products',
    text: 'Build and launch real SaaS products like Swaply, and land internships / remote roles.',
  },
];
