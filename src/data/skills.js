/**
 * Skills grouped by category. `level` (0–100) drives progress bars.
 * `learning: true` marks tech currently being learned (shown with a badge).
 */
export const skillGroups = [
  {
    category: 'Languages',
    icon: 'Code2',
    skills: [
      { name: 'Java', level: 80 },
      { name: 'Python', level: 78 },
      { name: 'C', level: 70 },
      { name: 'JavaScript', level: 65, learning: true },
      { name: 'PHP', level: 50, learning: true },
      { name: 'HTML5', level: 90 },
      { name: 'CSS3', level: 85 },
    ],
  },
  {
    category: 'Frontend',
    icon: 'Layout',
    skills: [
      { name: 'React', level: 65, learning: true },
      { name: 'Tailwind CSS', level: 75 },
      { name: 'Vite', level: 70 },
      { name: 'Responsive Design', level: 85 },
    ],
  },
  {
    category: 'Backend',
    icon: 'Server',
    skills: [
      { name: 'Node.js', level: 55, learning: true },
      { name: 'Express', level: 50, learning: true },
      { name: 'REST APIs', level: 65 },
      { name: 'WordPress / WooCommerce', level: 60, learning: true },
    ],
  },
  {
    category: 'AI & Automation',
    icon: 'BrainCircuit',
    skills: [
      { name: 'AI Agents', level: 60, learning: true },
      { name: 'RAG', level: 55, learning: true },
      { name: 'MCP', level: 50, learning: true },
      { name: 'n8n', level: 60, learning: true },
      { name: 'Prompt Engineering', level: 75 },
    ],
  },
  {
    category: 'Tools',
    icon: 'Wrench',
    skills: [
      { name: 'Git & GitHub', level: 80 },
      { name: 'VS Code', level: 90 },
      { name: 'Figma', level: 60 },
      { name: 'Postman', level: 70 },
    ],
  },
];

/** Flat tech-stack list for the marquee / tech grid. */
export const techStack = [
  'Java',
  'Python',
  'C',
  'JavaScript',
  'PHP',
  'HTML5',
  'CSS3',
  'React',
  'Node.js',
  'Express',
  'Tailwind CSS',
  'Vite',
  'WordPress',
  'WooCommerce',
  'n8n',
  'Git',
  'GitHub',
  'Figma',
  'LangChain',
  'OpenAI',
  'Claude',
  'Gemini',
];
