import {
  Github,
  Star,
  Users,
  GitFork,
  BookMarked,
  GitCommit,
  ExternalLink,
  Eye,
  BrainCircuit,
  Rocket,
} from 'lucide-react';
import Reveal from './ui/Reveal';
import SectionHeading from './ui/SectionHeading';
import { useGitHub } from '../hooks/useGitHub';
import { useVisitorCount } from '../hooks/useVisitorCount';
import { profile } from '../data/profile';
import { projects } from '../data/projects';
import { skillGroups } from '../data/skills';

function StatCard({ icon: Icon, value, label }) {
  return (
    <div className="glass rounded-2xl p-5 text-center">
      <Icon size={22} className="text-brand-500 mx-auto mb-2" />
      <div className="text-2xl font-extrabold md:text-3xl">{value}</div>
      <div className="text-xs text-gray-500 dark:text-gray-400">{label}</div>
    </div>
  );
}

/** Skeleton block shown while live data loads (no fake numbers). */
function Skeleton() {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-5" aria-hidden="true">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="glass h-28 animate-pulse rounded-2xl" />
      ))}
    </div>
  );
}

function timeAgo(iso) {
  const diff = (Date.now() - new Date(iso).getTime()) / 1000;
  const units = [
    ['y', 31536000],
    ['mo', 2592000],
    ['d', 86400],
    ['h', 3600],
    ['m', 60],
  ];
  for (const [label, secs] of units) {
    const v = Math.floor(diff / secs);
    if (v >= 1) return `${v}${label} ago`;
  }
  return 'just now';
}

export default function Dashboard() {
  const { user, repos, languages, stars, recentCommits, latestCommits, loading, error } = useGitHub(
    profile.githubUsername
  );
  const visitors = useVisitorCount();

  // Pinned repos = the chosen names, in order, matched against live repo data.
  const pinned = profile.pinnedRepos
    .map((name) => repos.find((r) => r.name.toLowerCase() === name.toLowerCase()))
    .filter(Boolean);

  const topLangs = Object.entries(languages)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8);

  // Local data — always available, never faked.
  const currentlyLearning = [
    ...new Set(skillGroups.flatMap((g) => g.skills.filter((s) => s.learning).map((s) => s.name))),
  ];
  const currentProject = projects.find((p) => p.id === profile.currentProjectId) ?? projects[0];

  return (
    <section id="dashboard" className="section-pad">
      <SectionHeading
        eyebrow="Dashboard"
        title="Live developer dashboard"
        subtitle="Real-time data from the GitHub API — repositories, activity and what I'm building right now."
      />

      {/* ---------- GitHub: loading ---------- */}
      {loading && <Skeleton />}

      {/* ---------- GitHub: clean placeholder when unavailable ---------- */}
      {!loading && error && (
        <Reveal>
          <div className="glass mx-auto max-w-md rounded-2xl p-8 text-center">
            <Github size={32} className="mx-auto mb-3 text-gray-400" />
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Live GitHub data isn&apos;t available yet (the account{' '}
              <strong>@{profile.githubUsername}</strong> may not exist, or the hourly API limit was
              reached). It will appear here automatically — no placeholder numbers are shown.
            </p>
          </div>
        </Reveal>
      )}

      {/* ---------- GitHub: live data ---------- */}
      {!loading && !error && user && (
        <div className="space-y-10">
          {/* Stat cards */}
          <Reveal>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
              <StatCard icon={BookMarked} value={user.public_repos} label="Repositories" />
              <StatCard icon={Users} value={user.followers} label="Followers" />
              <StatCard icon={GitFork} value={user.following} label="Following" />
              <StatCard icon={Star} value={stars} label="Total Stars" />
              <StatCard icon={GitCommit} value={recentCommits} label="Recent Commits" />
            </div>
          </Reveal>

          {/* Pinned + Latest commits */}
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Pinned repositories */}
            <Reveal>
              <div className="glass h-full rounded-2xl p-6">
                <h3 className="mb-4 flex items-center gap-2 font-semibold">
                  <BookMarked size={18} className="text-brand-500" /> Pinned repositories
                </h3>
                {pinned.length > 0 ? (
                  <div className="space-y-3">
                    {pinned.map((repo) => (
                      <a
                        key={repo.id}
                        href={repo.html_url}
                        target="_blank"
                        rel="noreferrer"
                        className="group hover:border-brand-500/40 block rounded-xl border border-gray-200 p-3 transition-colors dark:border-white/10"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-brand-500 font-medium">{repo.name}</span>
                          <ExternalLink
                            size={14}
                            className="text-gray-400 opacity-0 group-hover:opacity-100"
                          />
                        </div>
                        <p className="mt-0.5 line-clamp-1 text-xs text-gray-500 dark:text-gray-400">
                          {repo.description || 'No description provided.'}
                        </p>
                        <div className="mt-1.5 flex items-center gap-3 text-xs text-gray-400">
                          {repo.language && <span>{repo.language}</span>}
                          <span className="flex items-center gap-1">
                            <Star size={11} /> {repo.stargazers_count}
                          </span>
                          <span className="flex items-center gap-1">
                            <GitFork size={11} /> {repo.forks_count}
                          </span>
                        </div>
                      </a>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    No pinned repositories found yet. They&apos;ll appear once these repos exist on
                    your account.
                  </p>
                )}
              </div>
            </Reveal>

            {/* Latest commits */}
            <Reveal delay={0.1}>
              <div className="glass h-full rounded-2xl p-6">
                <h3 className="mb-4 flex items-center gap-2 font-semibold">
                  <GitCommit size={18} className="text-brand-500" /> Latest commits
                </h3>
                {latestCommits.length > 0 ? (
                  <ul className="space-y-3">
                    {latestCommits.map((c) => (
                      <li key={c.sha}>
                        <a
                          href={c.url}
                          target="_blank"
                          rel="noreferrer"
                          className="group hover:border-brand-500/40 block rounded-xl border border-gray-200 p-3 transition-colors dark:border-white/10"
                        >
                          <p className="line-clamp-1 text-sm font-medium">{c.message}</p>
                          <div className="mt-0.5 flex items-center justify-between text-xs text-gray-400">
                            <span className="font-mono">{c.repo}</span>
                            <span>{timeAgo(c.date)}</span>
                          </div>
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    No recent public commits to show yet — they&apos;ll stream in here as you push.
                  </p>
                )}
              </div>
            </Reveal>
          </div>

          {/* Languages */}
          {topLangs.length > 0 && (
            <Reveal>
              <div className="glass rounded-2xl p-6">
                <h3 className="mb-4 font-semibold">Most-used languages</h3>
                <div className="flex flex-wrap gap-2">
                  {topLangs.map(([lang, count]) => (
                    <span
                      key={lang}
                      className="bg-brand-500/10 text-brand-500 rounded-full px-3 py-1 text-sm"
                    >
                      {lang} · {count}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          )}

          {/* Contribution activity */}
          <Reveal>
            <div className="glass rounded-2xl p-6">
              <h3 className="mb-4 font-semibold">Contribution activity</h3>
              <a href={user.html_url} target="_blank" rel="noreferrer" className="block">
                <img
                  src={`https://github-readme-activity-graph.vercel.app/graph?username=${profile.githubUsername}&bg_color=00000000&hide_border=true&color=6366F1&line=0EA5E9&point=0EA5E9&area=true`}
                  alt={`GitHub contribution activity graph for ${profile.githubUsername}`}
                  loading="lazy"
                  className="w-full rounded-xl"
                />
              </a>
            </div>
          </Reveal>
        </div>
      )}

      {/* ---------- Always-on: current focus + visitor counter (local data) ---------- */}
      <Reveal className="mt-10">
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Currently learning */}
          <div className="glass rounded-2xl p-6">
            <h3 className="mb-4 flex items-center gap-2 font-semibold">
              <BrainCircuit size={18} className="text-brand-500" /> Currently learning
            </h3>
            <div className="flex flex-wrap gap-2">
              {currentlyLearning.map((s) => (
                <span
                  key={s}
                  className="bg-accent-500/10 text-accent-500 rounded-full px-3 py-1 text-sm"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* Current main project */}
          <div className="glass rounded-2xl p-6">
            <h3 className="mb-3 flex items-center gap-2 font-semibold">
              <Rocket size={18} className="text-brand-500" /> Current main project
            </h3>
            <p className="text-brand-500 font-medium">{currentProject.title}</p>
            <span className="bg-brand-500/10 text-brand-500 mt-1 inline-block rounded-full px-2 py-0.5 text-xs">
              {currentProject.status}
            </span>
            <p className="mt-2 line-clamp-3 text-sm text-gray-500 dark:text-gray-400">
              {currentProject.description}
            </p>
          </div>

          {/* Visitor counter */}
          <div className="glass flex flex-col items-center justify-center rounded-2xl p-6 text-center">
            <Eye size={22} className="text-brand-500 mb-2" />
            <div className="text-3xl font-extrabold">
              {visitors.loading ? (
                <span className="text-gray-400">…</span>
              ) : visitors.error || visitors.count == null ? (
                <span className="text-base font-medium text-gray-400">unavailable</span>
              ) : (
                visitors.count.toLocaleString()
              )}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Visitors</div>
          </div>
        </div>
      </Reveal>

      {/* Follow CTA */}
      <Reveal className="mt-8 text-center">
        <a
          href={profile.socials.github}
          target="_blank"
          rel="noreferrer"
          className="from-brand-500 to-accent-500 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r px-6 py-3 font-semibold text-white"
        >
          <Github size={18} /> Follow on GitHub
        </a>
      </Reveal>
    </section>
  );
}
