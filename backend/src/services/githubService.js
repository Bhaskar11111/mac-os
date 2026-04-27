const GITHUB_CACHE_TTL_MS = 1000 * 60 * 60 * 6;

export const shouldRefreshGithubRepos = (profile) => {
  if (!profile?.githubReposFetchedAt) return true;
  return Date.now() - profile.githubReposFetchedAt.getTime() > GITHUB_CACHE_TTL_MS;
};

export const fetchTopGithubRepos = async (username) => {
  if (!username) return [];

  const response = await fetch(
    `https://api.github.com/users/${encodeURIComponent(
      username
    )}/repos?sort=updated&per_page=30`,
    {
      headers: {
        Accept: "application/vnd.github+json",
        ...(process.env.GITHUB_TOKEN
          ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
          : {})
      }
    }
  );

  if (!response.ok) {
    throw new Error("Unable to fetch GitHub repositories");
  }

  const repos = await response.json();

  return repos
    .filter((repo) => !repo.fork)
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, 5)
    .map((repo) => ({
      name: repo.name,
      description: repo.description || "",
      url: repo.html_url,
      language: repo.language || "",
      stars: repo.stargazers_count || 0,
      forks: repo.forks_count || 0,
      updatedAt: repo.updated_at ? new Date(repo.updated_at) : null
    }));
};
