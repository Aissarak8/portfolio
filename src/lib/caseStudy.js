import { projects } from '../data/projects';

/**
 * Case-study layer. Every project page is built from this.
 *
 * - If a project has a `details` object (in data/projects.js), its REAL content
 *   is used.
 * - If it doesn't (e.g. a Planned project not built yet), a clearly-marked
 *   TEMPLATE is generated so the page is complete and "Coming Soon", ready for
 *   you to drop in real content later. Template sections carry `isTemplate: true`.
 *
 * This keeps every project's information centralized in data/projects.js.
 */

// Maps known technologies to a stack category. Unknown tech → "core".
const TECH_CATEGORY = {
  // frontend
  React: 'frontend',
  Tailwind: 'frontend',
  'Tailwind CSS': 'frontend',
  Vite: 'frontend',
  'Framer Motion': 'frontend',
  'HTML5 Canvas': 'frontend',
  JavaScript: 'frontend',
  HTML: 'frontend',
  CSS: 'frontend',
  'Responsive Design': 'frontend',
  // backend
  'Node.js': 'backend',
  Express: 'backend',
  PHP: 'backend',
  Java: 'backend',
  Python: 'backend',
  // database
  PostgreSQL: 'database',
  MongoDB: 'database',
  MySQL: 'database',
  LocalStorage: 'database',
  'File I/O': 'database',
  // ai
  OpenAI: 'ai',
  Claude: 'ai',
  Gemini: 'ai',
  LangChain: 'ai',
  RAG: 'ai',
  MCP: 'ai',
  // apis / integrations
  'REST APIs': 'apis',
  Webhooks: 'apis',
  n8n: 'apis',
  WooCommerce: 'apis',
  Stripe: 'apis',
  // deployment
  'GitHub Pages': 'deployment',
  Vercel: 'deployment',
  Docker: 'deployment',
  WordPress: 'deployment',
};

const STACK_LABELS = {
  frontend: 'Frontend',
  backend: 'Backend',
  database: 'Database',
  ai: 'AI',
  apis: 'APIs & Integrations',
  deployment: 'Deployment',
  core: 'Core',
};

function categorizeTech(tech = []) {
  const groups = {};
  for (const t of tech) {
    const cat = TECH_CATEGORY[t] || 'core';
    (groups[cat] ||= []).push(t);
  }
  // Return ordered, labelled groups.
  const order = ['frontend', 'backend', 'database', 'ai', 'apis', 'deployment', 'core'];
  return order
    .filter((cat) => groups[cat]?.length)
    .map((cat) => ({ label: STACK_LABELS[cat], items: groups[cat] }));
}

// Generates placeholder gallery slides (no real screenshots yet).
function templateGallery(count = 3) {
  return Array.from({ length: count }).map((_, i) => ({
    src: '', // empty → component renders the placeholder.svg
    caption: `Screenshot ${i + 1} — replace in data/projects.js`,
  }));
}

/** Build the full case study for a project, filling gaps with a marked template. */
export function getCaseStudy(project) {
  const d = project.details ?? {};
  const isTemplate = !project.details;

  const T = '🚧 Template — replace with real content in data/projects.js.';

  return {
    ...project,
    isTemplate,

    overview: d.overview || project.caseStudy || project.description,

    problem:
      d.problem ||
      `${T} Describe the problem ${project.title} solves: who has it, why it matters, and what's painful about the status quo.`,

    solution:
      d.solution ||
      `${T} Explain how ${project.title} solves it: the approach, the core idea, and what makes it a good solution.`,

    features: project.features || [],

    architecture: d.architecture || {
      components: [
        { name: 'UI Layer', desc: `${T} The user-facing components.` },
        { name: 'Logic Layer', desc: `${T} State, hooks and business logic.` },
        { name: 'Data Layer', desc: `${T} APIs, storage or services.` },
      ],
      dataFlow:
        d.dataFlow || `${T} Describe how data moves: input → processing → storage → output.`,
      folderStructure: `${project.id}/\n├── src/\n│   ├── components/\n│   └── ...\n└── README.md   # ${T}`,
    },

    stack: d.stack || categorizeTech(project.tech),

    process: d.process || [
      `${T} Step 1 — planning & research.`,
      `${T} Step 2 — building the core.`,
      `${T} Step 3 — polish, test & ship.`,
    ],

    challenges: d.challenges || [
      { challenge: `${T} A real challenge you hit.`, solution: 'How you solved it.' },
    ],

    learned: d.learned || [`${T} A key thing you'll learn building ${project.title}.`],

    future: d.future || [`${T} A planned improvement or next milestone for ${project.title}.`],

    gallery: d.gallery || templateGallery(),
  };
}

/** Helpers for routing / navigation between project pages. */
export function getProjectById(id) {
  return projects.find((p) => p.id === id) || null;
}

export function getAdjacentProjects(id) {
  const i = projects.findIndex((p) => p.id === id);
  if (i === -1) return { prev: null, next: null };
  return {
    prev: i > 0 ? projects[i - 1] : projects[projects.length - 1],
    next: i < projects.length - 1 ? projects[i + 1] : projects[0],
  };
}
