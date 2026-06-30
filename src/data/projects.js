/**
 * Project catalog — the single source of truth for cards AND case-study pages.
 *
 * INTEGRITY RULE: only real projects. The portfolio is built; the rest are
 * honestly marked 'Planned' (the UI shows "Coming Soon" + a fillable template,
 * with NO fake screenshots or fabricated details). Update a project to
 * 'Completed' and add real `details` + `demo` only once it's actually built.
 *
 * status:     'Completed' | 'In Progress' | 'Planned'
 * difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
 */
export const categories = ['All', 'AI', 'Web', 'Automation', 'SaaS'];

const GH = 'https://github.com/Aissarak8';

export const projects = [
  {
    id: 'portfolio',
    title: 'Portfolio Website',
    category: 'Web',
    year: 2026,
    status: 'Completed',
    difficulty: 'Intermediate',
    image: '', // 🚧 TODO: add /public/projects/portfolio.png
    description:
      'This website — a fast, animated, SEO-optimized developer portfolio with a live GitHub dashboard, an interactive terminal, a local AI assistant, dark mode and glassmorphism UI.',
    tech: ['React', 'Tailwind', 'Vite', 'Framer Motion'],
    features: [
      'Dark / light mode',
      'Live GitHub dashboard',
      'Interactive terminal',
      'Local AI assistant',
      'Project case-study pages',
      'Responsive & SEO-friendly',
    ],
    caseStudy:
      'Designed Apple-inspired: minimal, lots of whitespace, premium typography. Built component-first and deployed on GitHub Pages.',
    github: `${GH}/portfolio`,
    demo: 'https://aissarak8.github.io/portfolio/',
    featured: true,
    // ✅ Real, fully-written case study (this very site).
    details: {
      overview:
        'A fast, modern, Apple-inspired portfolio that doubles as a developer hub: live GitHub dashboard, an interactive terminal, a local AI assistant, and case-study pages — all in one cohesive, data-driven React app.',
      problem:
        'A junior developer needs to stand out in the first 10 seconds. A plain CV or a generic template portfolio blends in and fails to show real engineering ability, taste, or live activity.',
      solution:
        'Build a premium, interactive portfolio that is itself a portfolio piece: it shows live GitHub data, lets visitors explore via a terminal and an AI assistant, and presents projects as proper case studies — proving front-end skill, attention to detail, and product thinking.',
      architecture: {
        components: [
          {
            name: 'Pages',
            desc: 'Home (section stack) and per-project case-study pages via React Router.',
          },
          {
            name: 'Sections',
            desc: 'Hero, About, Skills, Projects, Dashboard, Terminal, Contact — composed from small reusable UI primitives.',
          },
          {
            name: 'Hooks & lib',
            desc: 'useGitHub, useVisitorCount, the local assistant engine and the case-study layer.',
          },
          {
            name: 'Data',
            desc: 'A single source of truth in src/data/* — edit data, not components.',
          },
        ],
        dataFlow:
          'data/* (facts) → hooks/lib (logic & live fetches) → components (presentation). The GitHub API and a visitor-count API are fetched client-side; everything else is local.',
        folderStructure:
          'portfolio/\n├── src/\n│   ├── components/   # UI + sections\n│   ├── pages/        # Home, ProjectPage\n│   ├── hooks/        # useGitHub, useVisitorCount\n│   ├── lib/          # assistant engine, case-study layer\n│   ├── data/         # single source of truth\n│   └── context/      # theme\n├── .github/workflows/deploy.yml\n└── vite.config.js',
      },
      stack: [
        { label: 'Frontend', items: ['React 18', 'Vite', 'Tailwind CSS v4', 'Framer Motion'] },
        { label: 'Data / APIs', items: ['GitHub REST API', 'Abacus (visitor count)'] },
        { label: 'Tooling', items: ['ESLint', 'Prettier'] },
        { label: 'Deployment', items: ['GitHub Pages', 'GitHub Actions'] },
      ],
      process: [
        'Designed an Apple-inspired system: lots of whitespace, premium type, a single indigo→sky gradient.',
        'Built component-first with a strict data/logic/presentation separation.',
        'Added live integrations (GitHub, visitor counter) with graceful loading & error states.',
        'Layered in interactive features: terminal, local AI assistant, and case-study pages.',
      ],
      challenges: [
        {
          challenge: 'Showing live GitHub data without a backend or leaking a token.',
          solution:
            'Used the public REST API client-side with strict loading/error handling, so it degrades to a clean placeholder instead of fake numbers.',
        },
        {
          challenge: 'Keeping content honest while the other projects are still being built.',
          solution:
            'Centralized all content in data files and built an auto-template system that clearly marks unbuilt projects as Planned / Coming Soon.',
        },
      ],
      learned: [
        'Designing and shipping a cohesive design system in Tailwind v4.',
        'Integrating third-party APIs cleanly with React hooks.',
        'Structuring a scalable React app with clear separation of concerns.',
      ],
      future: [
        'Add a markdown blog section.',
        'Add real project screenshots and a downloadable CV.',
        'Add automated tests and a Lighthouse CI check.',
      ],
      gallery: [
        { src: '', caption: 'Hero & landing — add /projects/portfolio-hero.png' },
        { src: '', caption: 'Live dashboard — add /projects/portfolio-dashboard.png' },
        { src: '', caption: 'Interactive terminal — add /projects/portfolio-terminal.png' },
      ],
    },
  },

  // ----- Planned projects (Coming Soon — no fake details or screenshots) -----
  {
    id: 'swaply',
    title: 'Swaply',
    category: 'SaaS',
    year: 2026,
    status: 'Planned',
    difficulty: 'Advanced',
    image: '',
    description: 'A planned SaaS platform to swap, sell and discover items. Not built yet.',
    tech: ['React', 'Node.js', 'Tailwind', 'SQL'],
    features: ['Planned: user accounts', 'Planned: listings & search', 'Planned: messaging'],
    caseStudy: '',
    github: `${GH}/swaply`,
    demo: '',
    featured: true,
  },
  {
    id: 'ai-whatsapp-agent',
    title: 'AI WhatsApp Agent',
    category: 'AI',
    year: 2026,
    status: 'Planned',
    difficulty: 'Advanced',
    image: '',
    description: 'A planned AI agent that answers WhatsApp messages automatically. Not built yet.',
    tech: ['Python', 'AI Agents', 'n8n'],
    features: [
      'Planned: auto-reply to messages',
      'Planned: simple knowledge base',
      'Planned: n8n automation',
    ],
    caseStudy: '',
    github: `${GH}/ai-whatsapp-agent`,
    demo: '',
    featured: true,
  },
  {
    id: 'github-analyzer',
    title: 'GitHub Analyzer',
    category: 'Web',
    year: 2026,
    status: 'Planned',
    difficulty: 'Intermediate',
    image: '',
    description:
      'A planned web app that analyzes a GitHub profile and visualizes its stats. Not built yet.',
    tech: ['React', 'GitHub API', 'Tailwind'],
    features: ['Planned: profile stats', 'Planned: language breakdown', 'Planned: activity charts'],
    caseStudy: '',
    github: `${GH}/github-analyzer`,
    demo: '',
    featured: false,
  },
  {
    id: 'weather-dashboard',
    title: 'Weather Dashboard',
    category: 'Web',
    year: 2026,
    status: 'Planned',
    difficulty: 'Beginner',
    image: '',
    description:
      'A planned weather dashboard showing current conditions and forecasts by city. Not built yet.',
    tech: ['JavaScript', 'Weather API', 'CSS'],
    features: ['Planned: city search', 'Planned: current weather', 'Planned: multi-day forecast'],
    caseStudy: '',
    github: `${GH}/weather-dashboard`,
    demo: '',
    featured: false,
  },
];
