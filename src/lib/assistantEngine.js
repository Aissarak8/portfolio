import kb from '../data/assistant.json';
import { profile } from '../data/profile';
import { projects } from '../data/projects';
import { skillGroups } from '../data/skills';
import { education, experience, learningJourney } from '../data/content';

/**
 * Local, dependency-free "AI" assistant.
 * Matches user input against keyword intents in assistant.json and returns an
 * answer. Data-driven intents (`source`) are rendered from the live site data,
 * so editing assistant.json is enough to extend the bot's knowledge.
 */

const normalize = (s) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9àâçéèêëîïôûùü\s]/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();

// Build the text for a data-driven intent from the existing site data.
function fromSource(source) {
  switch (source) {
    case 'about':
      return profile.about.join(' ');

    case 'skills': {
      const lines = skillGroups.map(
        (g) => `• ${g.category}: ${g.skills.map((s) => s.name).join(', ')}`
      );
      return `Here's Aissa's tech stack:\n${lines.join('\n')}`;
    }

    case 'projects': {
      const lines = projects.map((p) => `• ${p.title} — ${p.category} [${p.status}]`);
      return `Aissa's projects:\n${lines.join(
        '\n'
      )}\n\nThe portfolio is built; the rest are honestly marked as Planned.`;
    }

    case 'education': {
      const e = education[0];
      return `Aissa is studying ${e.degree} at ${e.school} (${e.period}). ${e.description}`;
    }

    case 'experience': {
      if (experience.length === 0) {
        return `Aissa has no professional experience yet — he's a student focused on building real projects and is actively looking for internships. ${profile.careerObjective}`;
      }
      const lines = experience.map((e) => `• ${e.role} — ${e.company} (${e.period})`);
      return `Aissa's experience:\n${lines.join('\n')}`;
    }

    case 'roadmap':
      return `Aissa's learning journey:\nLearning now: ${learningJourney.current.join(
        ', '
      )}\nNext up: ${learningJourney.future.join(', ')}`;

    case 'languages':
      return `Aissa speaks ${profile.languages.map((l) => `${l.name} (${l.level})`).join(', ')}.`;

    case 'contact': {
      const parts = [`📧 ${profile.email}`, `💻 ${profile.socials.github}`];
      if (profile.socials.linkedin) parts.push(`🔗 ${profile.socials.linkedin}`);
      return `Here's how to reach Aissa:\n${parts.join(
        '\n'
      )}\n\nHe's open to internship opportunities.`;
    }

    default:
      return null;
  }
}

// Score an intent by how many of its keywords appear in the normalized input.
function scoreIntent(intent, input) {
  let score = 0;
  for (const kw of intent.keywords) {
    const k = normalize(kw);
    if (!k) continue;
    if (k.includes(' ')) {
      // multi-word phrase: strong signal
      if (input.includes(k)) score += 3;
    } else if (new RegExp(`\\b${k}\\b`).test(input)) {
      score += 1;
    }
  }
  return score;
}

/** Public config for the UI (greeting, suggestion chips, name). */
export const assistantConfig = {
  name: kb.name,
  greeting: kb.greeting,
  defaultSuggestions: kb.suggestions,
};

/**
 * Get the assistant's reply for a user message.
 * @returns {{ text: string, suggestions: string[] }}
 */
export function getReply(message) {
  const input = normalize(message);
  if (!input) {
    return { text: kb.fallback, suggestions: kb.suggestions };
  }

  let best = null;
  let bestScore = 0;
  for (const intent of kb.intents) {
    const score = scoreIntent(intent, input);
    if (score > bestScore) {
      bestScore = score;
      best = intent;
    }
  }

  if (!best || bestScore === 0) {
    return { text: kb.fallback, suggestions: kb.suggestions };
  }

  const text = best.source ? fromSource(best.source) : best.answer;
  return {
    text: text ?? kb.fallback,
    suggestions: best.suggestions ?? kb.suggestions,
  };
}
