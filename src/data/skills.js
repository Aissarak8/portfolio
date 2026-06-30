/**
 * Skills grouped by category.
 * - Skills with a `level` (0–100, mapped from an honest self-rating /5) show a bar.
 * - Skills WITHOUT a level render as a chip (e.g. tools, or tech I'm still learning),
 *   so nothing implies a proficiency I don't have.
 */
export const skillGroups = [
  {
    category: 'Programming',
    icon: 'Code2',
    skills: [
      { name: 'HTML', level: 80 }, // 4/5
      { name: 'CSS', level: 60 }, // 3/5
      { name: 'JavaScript', level: 40 }, // 2/5
      { name: 'Python', level: 40 }, // 2/5
      { name: 'Java', level: 20 }, // 1/5
      { name: 'C', level: 20 }, // 1/5
    ],
  },
  {
    category: 'AI & Automation',
    icon: 'BrainCircuit',
    skills: [
      { name: 'AI Agents', level: 40 }, // 2/5
      { name: 'n8n', level: 40 }, // 2/5
    ],
  },
  {
    category: 'Tools',
    icon: 'Wrench',
    skills: [
      { name: 'GitHub', level: 40 }, // 2/5
      { name: 'Git', level: 20 }, // 1/5
      { name: 'VS Code' }, // chip
    ],
  },
  {
    category: 'Currently Learning',
    icon: 'GraduationCap',
    skills: [
      { name: 'React', learning: true },
      { name: 'Node.js', learning: true },
      { name: 'Express.js', learning: true },
      { name: 'Tailwind CSS', learning: true },
      { name: 'SQL', learning: true },
      { name: 'WordPress', learning: true },
      { name: 'Docker', learning: true },
      { name: 'RAG', learning: true },
      { name: 'MCP', learning: true },
    ],
  },
];

/** Flat tech list for the marquee. */
export const techStack = [
  'HTML',
  'CSS',
  'JavaScript',
  'Python',
  'Java',
  'C',
  'React',
  'Node.js',
  'Express.js',
  'Tailwind CSS',
  'SQL',
  'Git',
  'GitHub',
  'VS Code',
  'WordPress',
  'Docker',
  'AI Agents',
  'n8n',
  'RAG',
  'MCP',
];
