/**
 * Central profile config. Edit THIS file to update the whole site.
 * All content here is real and honest — no invented experience or inflated claims.
 */
export const profile = {
  name: 'Aissa Slikou',
  firstName: 'Aissa',
  title: 'Applied Computer Science Student | Future AI Engineer',
  // Short bio used in the hero.
  tagline:
    'Applied Computer Science student passionate about AI, automation and full-stack development — building practical projects and learning in public.',
  location: 'Marrakech, Morocco',
  email: 'aissaslikou2@gmail.com',

  // GitHub handle — single source of truth for every link in the app.
  githubUsername: 'Aissarak8',
  portfolioUrl: 'https://aissarak8.github.io/portfolio/',

  // 🚧 TODO: replace with your real professional photo at public/avatar.jpg,
  //          then point this to '/avatar.jpg'. For now a clean placeholder avatar.
  avatar: '/avatar.svg',

  // 🚧 TODO: add a real resume PDF at public/resume.pdf
  resumeUrl: '/resume.pdf',

  // Shown as "pins" on the dashboard (GitHub REST has no pinned endpoint without a token).
  pinnedRepos: ['portfolio', 'swaply', 'ai-whatsapp-agent', 'github-analyzer', 'weather-dashboard'],

  // Featured as the current main project on the dashboard.
  currentProjectId: 'portfolio',

  education: {
    degree: 'Licence en Informatique Appliquée (Applied Computer Science)',
    school: 'Faculté des Sciences Semlalia',
    location: 'Marrakech, Morocco',
    period: '2025 — Present',
  },

  // Spoken languages.
  languages: [
    { name: 'Arabic', level: 'Native' },
    { name: 'English', level: 'Intermediate' },
    { name: 'French', level: 'Basic' },
  ],

  about: [
    "I'm Aissa Slikou, an Applied Computer Science student based in Marrakech, Morocco.",
    'My goal is to become an AI Engineer by mastering software engineering, artificial intelligence, automation, and modern web development.',
    "I enjoy transforming ideas into real applications that solve meaningful problems. I'm currently focused on learning Python, Java, C, AI, automation, and full-stack development while building production-quality projects for my portfolio.",
    'I believe the best way to learn is by building real products, documenting the journey, and continuously improving through practice. My long-term ambition is to work on innovative products at companies like Google or Microsoft while also building successful SaaS products of my own.',
  ],

  careerObjective:
    "I'm looking for internship opportunities where I can contribute to real software projects, collaborate with experienced engineers, and continue developing my technical skills in AI, automation, and software engineering.",

  longTermGoal:
    'Become a world-class AI Engineer capable of building intelligent software products, scalable SaaS platforms, and advanced automation systems.',

  dreamCompanies: ['Google', 'Microsoft'],

  hobbies: ['Football', 'Technology', 'Reading'],

  socials: {
    github: 'https://github.com/Aissarak8',
    linkedin: 'https://www.linkedin.com/in/aissa-slikou-5422ba237',
    email: 'mailto:aissaslikou2@gmail.com',
  },

  // Honest, defensible stats only.
  stats: [
    { label: 'Languages', value: '3' },
    { label: 'Coding Since', value: '2025' },
    { label: 'Focus Areas', value: 'AI · Web' },
    { label: 'Curiosity', value: '∞' },
  ],
};
