/**
 * Project catalog. Each entry powers a project card + case-study modal.
 *
 * INTEGRITY RULE: none of these are finished/deployed yet, so every project is
 * honestly marked 'Planned' or 'In Progress'. Update a project to 'Live' and add
 * a real `demo` URL ONLY once it is actually built and deployed.
 *
 * status:     'Live' | 'In Progress' | 'Planned'
 * difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
 */
export const categories = ['All', 'AI', 'Web', 'Automation', 'SaaS', 'Mobile'];

const GH = 'https://github.com/Aissarak8';

export const projects = [
  {
    id: 'portfolio',
    title: 'Developer Portfolio',
    category: 'Web',
    year: 2026,
    status: 'In Progress',
    difficulty: 'Intermediate',
    image: '', // 🚧 TODO: add /public/projects/portfolio.png
    description:
      'This website — a fast, animated, SEO-optimized portfolio with live GitHub integration, dark mode and glassmorphism UI.',
    tech: ['React', 'Tailwind', 'Vite', 'Framer Motion'],
    features: [
      'Dark / light mode',
      'Live GitHub API stats',
      'Project filtering & search',
      'Scroll animations',
    ],
    caseStudy:
      'Designed Apple-inspired: minimal, lots of whitespace, premium typography. Built component-first and deployed on GitHub Pages.',
    github: `${GH}/portfolio`,
    demo: '', // 🚧 TODO: add live URL after deploying
    featured: true,
  },
  {
    id: 'swaply',
    title: 'Swaply',
    category: 'SaaS',
    year: 2026,
    status: 'Planned',
    difficulty: 'Advanced',
    image: '',
    description:
      'A planned flagship SaaS platform to swap, sell and discover items — with auth, payments and an AI recommendation layer.',
    tech: ['React', 'Node.js', 'Tailwind', 'PostgreSQL', 'OpenAI'],
    features: [
      'User authentication & profiles',
      'AI-powered recommendations',
      'Real-time chat between users',
      'Stripe payments integration',
    ],
    caseStudy:
      'Swaply is my main long-term product goal. The plan is to learn the full SaaS lifecycle: idea → MVP → users → monetization, combining a React frontend, a Node/Express API, and an AI recommendation service.',
    github: `${GH}/swaply`,
    demo: '',
    featured: true,
  },
  {
    id: 'ai-research-agent',
    title: 'AI Research Agent',
    category: 'AI',
    year: 2026,
    status: 'Planned',
    difficulty: 'Advanced',
    image: '',
    description:
      'A planned autonomous agent that researches a topic, reads sources via RAG, and produces a cited report — built with the Model Context Protocol (MCP).',
    tech: ['Python', 'LangChain', 'RAG', 'MCP', 'Claude'],
    features: [
      'Multi-step reasoning',
      'RAG over documents',
      'Tool calling via MCP',
      'Cited markdown output',
    ],
    caseStudy:
      'A planned deep-dive into agentic AI: planning, tool use, retrieval-augmented generation and the MCP standard for connecting models to tools and data.',
    github: `${GH}/ai-agents`,
    demo: '',
    featured: true,
  },
  {
    id: 'n8n-automations',
    title: 'n8n Automation Suite',
    category: 'Automation',
    year: 2026,
    status: 'Planned',
    difficulty: 'Intermediate',
    image: '',
    description:
      'A planned collection of automations — lead capture, email digests, social posting and data sync — orchestrated with n8n.',
    tech: ['n8n', 'REST APIs', 'Webhooks', 'JavaScript'],
    features: [
      'Automated lead pipeline',
      'Scheduled reports',
      'Multi-app sync',
      'Error handling & retries',
    ],
    caseStudy:
      'Planned real automations that save hours every week. Each workflow will be documented and exportable as JSON so anyone can import and reuse it.',
    github: `${GH}/n8n-workflows`,
    demo: '',
    featured: true,
  },
  {
    id: 'woocommerce-store',
    title: 'WooCommerce Store',
    category: 'Web',
    year: 2026,
    status: 'Planned',
    difficulty: 'Intermediate',
    image: '',
    description:
      'A planned custom WordPress + WooCommerce store with a tailored theme, payment gateway and optimized product pages.',
    tech: ['WordPress', 'WooCommerce', 'PHP', 'CSS'],
    features: ['Custom theme', 'Payment gateway', 'SEO product pages', 'Responsive design'],
    caseStudy:
      'A planned real e-commerce build to learn the PHP/WordPress ecosystem, theming and the practical side of online stores.',
    github: `${GH}/wordpress-projects`,
    demo: '',
    featured: false,
  },
  {
    id: 'algo-visualizer',
    title: 'Algorithm Visualizer',
    category: 'Web',
    year: 2026,
    status: 'Planned',
    difficulty: 'Intermediate',
    image: '',
    description:
      'A planned interactive visualizer for sorting and pathfinding algorithms, to help learners see how the code actually runs.',
    tech: ['JavaScript', 'HTML5 Canvas', 'CSS'],
    features: ['Sorting animations', 'Pathfinding grid', 'Adjustable speed', 'Step-by-step mode'],
    caseStudy:
      'Planned to deepen my DSA knowledge by turning abstract algorithms into something visual and intuitive.',
    github: `${GH}/algorithms`,
    demo: '',
    featured: false,
  },
  {
    id: 'expense-tracker',
    title: 'Expense Tracker',
    category: 'Mobile',
    year: 2026,
    status: 'Planned',
    difficulty: 'Beginner',
    image: '',
    description:
      'A planned clean mobile-first app to track income and expenses with charts, categories and monthly summaries.',
    tech: ['React', 'Tailwind', 'LocalStorage'],
    features: [
      'Add / edit transactions',
      'Category breakdown',
      'Monthly charts',
      'Offline support',
    ],
    caseStudy:
      'A focused planned build to practice state management, charts and mobile-first responsive design.',
    github: `${GH}/mini-projects`,
    demo: '',
    featured: false,
  },
  {
    id: 'java-bank-system',
    title: 'Java Banking System',
    category: 'Web',
    year: 2026,
    status: 'Planned',
    difficulty: 'Beginner',
    image: '',
    description:
      'A planned console-based banking system in Java demonstrating OOP, file persistence and clean architecture.',
    tech: ['Java', 'OOP', 'File I/O'],
    features: [
      'Accounts & transactions',
      'Object-oriented design',
      'Data persistence',
      'Input validation',
    ],
    caseStudy:
      'A planned foundational Java project focused on OOP principles, encapsulation and writing maintainable code.',
    github: `${GH}/java-projects`,
    demo: '',
    featured: false,
  },
];
