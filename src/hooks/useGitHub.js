import { useEffect, useState } from 'react';

/**
 * Fetches a GitHub user's public profile, repositories and recent activity.
 * No token required for public, low-volume use (60 req/hour/IP).
 *
 * Returns aggregated stars, language frequency, recent commit count (from public
 * PushEvents) and a flat list of the latest commits. All data is live — when the
 * account doesn't exist yet or the rate limit is hit, `error` is set so the UI
 * can show a clean placeholder instead of fake numbers.
 *
 * @param {string} username GitHub username
 */
export function useGitHub(username) {
  const [state, setState] = useState({
    user: null,
    repos: [],
    languages: {},
    stars: 0,
    recentCommits: 0,
    latestCommits: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    if (!username) return;
    const controller = new AbortController();
    const opts = { signal: controller.signal };

    async function load() {
      try {
        const [userRes, reposRes, eventsRes] = await Promise.all([
          fetch(`https://api.github.com/users/${username}`, opts),
          fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`, opts),
          fetch(`https://api.github.com/users/${username}/events/public?per_page=100`, opts),
        ]);

        if (!userRes.ok || !reposRes.ok) throw new Error('GitHub API request failed');

        const user = await userRes.json();
        const repos = await reposRes.json();
        // Events can fail/empty independently — never let it break the dashboard.
        const events = eventsRes.ok ? await eventsRes.json() : [];

        // Aggregate stars + language frequency.
        let stars = 0;
        const languages = {};
        for (const repo of repos) {
          stars += repo.stargazers_count;
          if (repo.language) languages[repo.language] = (languages[repo.language] || 0) + 1;
        }

        // Recent commits from public PushEvents.
        let recentCommits = 0;
        const latestCommits = [];
        for (const ev of Array.isArray(events) ? events : []) {
          if (ev.type !== 'PushEvent') continue;
          const commits = ev.payload?.commits ?? [];
          recentCommits += commits.length;
          for (const c of commits) {
            latestCommits.push({
              sha: c.sha,
              message: c.message.split('\n')[0],
              repo: ev.repo?.name,
              date: ev.created_at,
              url: `https://github.com/${ev.repo?.name}/commit/${c.sha}`,
            });
          }
        }

        setState({
          user,
          repos,
          languages,
          stars,
          recentCommits,
          latestCommits: latestCommits.slice(0, 6),
          loading: false,
          error: null,
        });
      } catch (err) {
        if (err.name !== 'AbortError') {
          setState((s) => ({ ...s, loading: false, error: err.message }));
        }
      }
    }

    load();
    return () => controller.abort();
  }, [username]);

  return state;
}
