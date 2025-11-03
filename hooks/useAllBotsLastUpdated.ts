
import { useState, useEffect } from 'react';
import { Bot } from '../types';

interface GitHubCommit {
  commit: {
    author: {
      date: string;
    };
  };
}

export const useAllBotsLastUpdated = (initialBots: Bot[]) => {
  const [botsWithUpdates, setBotsWithUpdates] = useState<Bot[]>(initialBots);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAllLastCommits = async () => {
      setLoading(true);
      setError(null);

      try {
        const commitPromises = initialBots.map(async (bot) => {
          if (!bot.repoUrl) {
            return bot;
          }

          try {
            const url = bot.repoUrl;
            const urlParts = new URL(url).pathname.split('/').filter(Boolean);
            if (urlParts.length < 2) {
              console.error(`Invalid GitHub repo URL for ${bot.name}: ${url}`);
              return bot; // Return original bot data if URL is invalid
            }
            const [owner, repo] = urlParts;
            const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/commits?per_page=1`);

            if (!response.ok) {
              console.warn(`Failed to fetch commits for ${bot.name}: ${response.statusText}`);
              return bot; // Return original bot data on failed fetch
            }

            const data: GitHubCommit[] = await response.json();

            if (data.length > 0) {
              return { ...bot, lastUpdated: data[0].commit.author.date };
            }
            return bot;
          } catch (error) {
            console.error(`Error fetching commits for ${bot.name}:`, error);
            return bot; // Return original bot on error
          }
        });

        const updatedBots = await Promise.all(commitPromises);
        setBotsWithUpdates(updatedBots);

      } catch (e: any) {
        setError("Failed to fetch commit data for one or more bots.");
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    if (initialBots.length > 0) {
      fetchAllLastCommits();
    } else {
      setLoading(false);
    }
  }, [initialBots]);

  return { botsWithUpdates, loading, error };
};
