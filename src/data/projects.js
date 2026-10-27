/**
 * Project catalog — the single source of truth for cards AND case-study pages.
 *
 * INTEGRITY RULE: only real projects with credible evidence of implementation
 * or contribution. Keep descriptions and case studies aligned with what is
 * actually present in the project or its repository.
 *
 * status:     'Completed' | 'Release Candidate' | 'In Progress' | 'Planned'
 * difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
 */
export const categories = ['All', 'AI', 'Web'];

const GH = 'https://github.com/Aissarak8';
const BASE = import.meta.env.BASE_URL;

export const projects = [
  {
    id: 'agentpilot',
    title: 'AgentPilot — AI Coding Agent Control Center',
    category: 'AI',
    year: 2026,
    status: 'Release Candidate',
    difficulty: 'Advanced',
    image: `${BASE}projects/agentpilot-dashboard.png`,
    description:
      'An open-source, local-first VS Code extension for managing supported Codex workflows, tracking token usage, choosing AI models, and receiving desktop or Telegram notifications.',
    tech: [
      'JavaScript',
      'Node.js',
      'VS Code Extension API',
      'Codex CLI',
      'Telegram Bot API',
      'PowerShell',
    ],
    features: [
      'AgentPilot-owned multi-turn Codex Chat with explicit startup and per-action approvals',
      'Explainable, local Smart Model Advisor using the available Codex model catalog',
      'Verified token metadata with deduplication and cumulative-snapshot safeguards',
      'Agent activity dashboard with VS Code and native Windows notifications',
      'Persistent Telegram delivery queue with bounded retries and uncertain-delivery handling',
      'Local-first metadata storage without prompts, source code, credentials, or transcripts',
    ],
    caseStudy:
      'Built as a local-first VS Code control center for AgentPilot-owned Codex sessions and supported CLI workflows, with security boundaries that preserve workspace trust, sandboxing, and explicit approvals.',
    github: `${GH}/agentpilot`,
    demo: `${GH}/agentpilot/releases/tag/v1.0.0-rc.1`,
    demoLabel: 'Download RC',
    license: 'MIT',
    featured: true,
    details: {
      overview:
        'AgentPilot brings AgentPilot-owned Codex chat, lifecycle monitoring, token analytics, model guidance, and optional notifications into one VS Code-native experience. Version v1.0.0-rc.1 is a public pre-release for evaluation, not a stable v1.0 release.',
      problem:
        'Long-running coding-agent work is easy to lose track of across terminals, notifications, model choices, and usage records. Developers also need strong privacy and approval boundaries instead of another hosted dashboard that collects their prompts or project content.',
      solution:
        'AgentPilot owns the processes it can reliably observe, normalizes metadata locally, and presents status, usage, and delivery history inside VS Code. It keeps Codex sandbox and approval policies intact and does not attach to or claim visibility into private conversations owned by the official Codex VS Code extension.',
      architecture: {
        components: [
          {
            name: 'VS Code Extension Host',
            desc: 'Commands, Webviews, workspace-trust checks, SecretStorage, and lifecycle coordination.',
          },
          {
            name: 'Supported Codex Processes',
            desc: 'AgentPilot-owned app-server and CLI processes provide structured lifecycle and usage events.',
          },
          {
            name: 'Local Metadata Stores',
            desc: 'Bounded, atomic stores retain normalized events, usage, sessions, and delivery state—not transcripts.',
          },
          {
            name: 'Notification Adapters',
            desc: 'Independent VS Code, Windows, and optional Telegram delivery paths with deduplication.',
          },
        ],
        dataFlow:
          'Supported structured Codex events → validation and normalization → local bounded stores → Dashboard and notification adapters. Credentials remain in VS Code SecretStorage.',
        folderStructure:
          'agentpilot/\n├── extension.js             # activation, dashboard, dispatch\n├── codex-app-server.js      # owned chat process client\n├── codex-chat.js            # conversation lifecycle\n├── usage.js                 # verified token accounting\n├── delivery-queue.js        # Telegram reliability\n├── scripts/                 # supported hooks and Windows toast\n└── tests/                   # Node.js regression suite',
      },
      stack: [
        {
          label: 'Extension',
          items: ['JavaScript', 'Node.js', 'VS Code Extension API', 'Webviews'],
        },
        { label: 'Codex', items: ['Codex CLI', 'Codex app-server', 'Structured JSONL'] },
        { label: 'Notifications', items: ['VS Code', 'Windows PowerShell', 'Telegram Bot API'] },
        {
          label: 'Quality',
          items: ['Node.js test runner', 'VSIX packaging', 'Atomic local storage'],
        },
      ],
      process: [
        'Started with local lifecycle event logging and a VS Code activity dashboard.',
        'Added supported Codex CLI hooks and AgentPilot-owned CLI/app-server execution paths.',
        'Built persistent notification deduplication, token accounting safeguards, and restart recovery.',
        'Hardened workspace trust, startup confirmation, individual approvals, sanitized logs, and package contents for the public release candidate.',
      ],
      challenges: [
        {
          challenge:
            'Avoiding unsupported claims about official Codex VS Code Extension conversations.',
          solution:
            'Limited monitoring to documented CLI hooks and processes AgentPilot starts and owns; private IDE-hosted conversations remain outside the integration boundary.',
        },
        {
          challenge:
            'Preventing duplicate token totals and notifications after reconnects or rescans.',
          solution:
            'Used stable identities, persisted cursors, scoped incremental deltas, notification claims, and bounded delivery state.',
        },
        {
          challenge: 'Keeping optional remote notifications private and resilient.',
          solution:
            'Stored Telegram credentials in SecretStorage, sent metadata-only messages, and treated post-send timeouts as uncertain instead of automatically resending.',
        },
      ],
      learned: [
        'Designing a secure VS Code Webview and Extension Host message boundary.',
        'Building crash-safe local metadata stores and idempotent event pipelines.',
        'Handling cumulative versus incremental token usage without rewriting historical data.',
      ],
      future: [
        'Validate core workflows on macOS and Linux.',
        'Expand supported integrations only when documented lifecycle and usage interfaces are available.',
        'Promote a stable v1.0 only after release-candidate feedback and compatibility testing.',
      ],
      gallery: [
        {
          src: `${BASE}projects/agentpilot-dashboard.png`,
          caption:
            'Activity and usage dashboard — historical v0.9 beta capture; totals are test history, not current billing.',
        },
        {
          src: `${BASE}projects/agentpilot-chat.png`,
          caption: 'AgentPilot-owned Codex Chat — privacy-cropped to exclude conversation content.',
        },
        {
          src: `${BASE}projects/agentpilot-advisor.png`,
          caption: 'Smart Model Advisor with a local, explainable recommendation.',
        },
      ],
    },
  },
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

  {
    id: 'weather-dashboard',
    title: 'Weather Dashboard',
    category: 'Web',
    year: 2026,
    status: 'Completed',
    difficulty: 'Beginner',
    image: '',
    description:
      'A responsive weather dashboard with city search, current conditions, hourly forecasts, air-condition metrics, and a seven-day forecast.',
    tech: ['JavaScript', 'HTML', 'CSS', 'OpenWeatherMap API'],
    features: [
      'Search current weather by city',
      "Today's hourly forecast",
      'Real feel, wind, pressure, and chance of rain',
      'Seven-day forecast',
    ],
    caseStudy:
      'Built as a vanilla JavaScript learning project using OpenWeatherMap data and a responsive dashboard layout.',
    github: `${GH}/weather-dashboard`,
    demo: '',
    featured: true,
    details: {
      overview:
        'A functional weather dashboard built with HTML, CSS, and vanilla JavaScript. It fetches OpenWeatherMap data and presents current weather, hourly conditions, air metrics, and a seven-day forecast.',
      problem:
        'Weather API responses contain several kinds of forecast data that need to remain readable across desktop and small-screen layouts.',
      solution:
        'Use a city search form to fetch weather data, render each forecast section with DOM updates, and organize the interface as responsive cards and scrollable forecast tables.',
      architecture: {
        components: [
          { name: 'HTML', desc: 'Semantic search and forecast sections.' },
          {
            name: 'CSS',
            desc: 'Responsive grid, cards, tables, and accessible interaction states.',
          },
          { name: 'JavaScript', desc: 'API requests, error handling, and DOM rendering.' },
        ],
        dataFlow:
          'City search → OpenWeatherMap request → response validation → current, hourly, air-condition, and seven-day UI updates.',
        folderStructure:
          'weather-dashboard/\n├── index.html\n├── style.css\n├── app.js\n├── config.example.js\n└── README.md',
      },
      stack: [
        { label: 'Frontend', items: ['HTML', 'CSS', 'JavaScript'] },
        { label: 'Data', items: ['OpenWeatherMap API'] },
      ],
      process: [
        'Created the semantic page structure and dashboard sections.',
        'Built the responsive dark-theme layout and forecast tables.',
        'Connected the OpenWeatherMap API and rendered live forecast data.',
        'Improved error states, keyboard focus, contrast, and small-screen behavior.',
      ],
      challenges: [
        {
          challenge: 'Keeping wide forecast data usable on small screens.',
          solution: 'Added responsive layouts and horizontal scrolling for forecast tables.',
        },
        {
          challenge: 'Handling unsuccessful weather requests clearly.',
          solution:
            'Surface the actual HTTP status reason instead of always reporting an unknown city.',
        },
      ],
      learned: [
        'Fetching and validating third-party API data with vanilla JavaScript.',
        'Rendering multiple forecast views from one data flow.',
        'Improving responsive and accessible UI states.',
      ],
      future: ['Add a hosted demo without exposing the OpenWeatherMap API key.'],
      gallery: [],
    },
  },
];
