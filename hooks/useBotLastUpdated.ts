
import { useState, useEffect } from 'react';
import { Bot } from '../types';

interface GitHubCommit {
  commit: {
    author: {
      date: string;
    };
  };
}

export const useBotLastUpdated = (bot: Bot | null) => {
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLastCommit = async () => {
      if (!bot?.repoUrl) {
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);
      try {
        // NOTE: This is an unauthenticated request to the GitHub API.
        // In a production environment, this should be replaced with an
        // authenticated request to a backend proxy to avoid rate-limiting.
        const url = bot.repoUrl;
        const urlParts = new URL(url).pathname.split('/').filter(Boolean);
        if (urlParts.length < 2) {
          throw new Error(`Invalid GitHub repo URL: ${url}`);
        }
        const [owner, repo] = urlParts;
        const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/commits?per_page=1`);
        if (!response.ok) {
          throw new Error(`Failed to fetch commits from ${url}: ${response.statusText}`);
        }
        const data: GitHubCommit[] = await response.json();
        if (data.length > 0) {
          setLastUpdated(data[0].commit.author.date);
        }
      } catch (error: any) {
        setError(error.message);
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchLastCommit();
  }, [bot]);

  return { lastUpdated, loading, error };
};
