import React, { useState, useEffect } from 'react';
import { Bot } from '../types';

// Define the structure of the commit data from the GitHub API
interface GitHubCommit {
  sha: string;
  commit: {
    author: {
      name: string;
      date: string;
    };
    message: string;
  };
  html_url: string;
}

// Extend the commit data to include bot information
interface CommitWithBotInfo extends GitHubCommit {
  botName: string;
  botAvatarUrl: string;
}

// Define the props for the Updates component
interface UpdatesProps {
  bots: Bot[];
}

// A single commit component for better structure
const CommitCard: React.FC<{ commit: CommitWithBotInfo }> = ({ commit }) => {
  return (
    <div
      className="bg-discord-dark p-4 rounded-lg animate-fade-in"
    >
      <div className="flex items-center">
        <img src={commit.botAvatarUrl} alt={commit.botName} className="w-10 h-10 rounded-full mr-4" />
        <div className="flex-grow">
          <p className="text-sm text-discord-light-gray">
            <span className="font-semibold text-white">{commit.botName}</span>
          </p>
          <p className="text-white truncate mt-1">{commit.commit.message.split('\n')[0]}</p>
        </div>
        <a
          href={commit.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-4 bg-discord-blurple text-white px-3 py-1.5 rounded-md text-sm font-semibold hover:bg-discord-blurple-dark transition-colors duration-200 flex-shrink-0"
        >
          View on GitHub
        </a>
      </div>
    </div>
  );
};

const Updates: React.FC<UpdatesProps> = ({ bots }) => {
  const [commits, setCommits] = useState<CommitWithBotInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCommits = async () => {
      setLoading(true);
      setError(null);
      let allCommits: CommitWithBotInfo[] = [];

      const botsWithRepos = bots.filter(bot => bot.repoUrl);

      try {
        const commitPromises = botsWithRepos.map(async (bot) => {
          try {
            const url = bot.repoUrl!;
            const urlParts = new URL(url).pathname.split('/').filter(Boolean);
            if (urlParts.length < 2) {
              console.error(`Invalid GitHub repo URL: ${url}`);
              return [];
            }
            const [owner, repo] = urlParts;
            const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/commits`);
            if (!response.ok) {
              if (response.status === 403) {
                console.warn(`Rate limit exceeded for ${url}.`);
                return [];
              }
              throw new Error(`Failed to fetch commits from ${url}`);
            }
            const data: GitHubCommit[] = await response.json();
            return data.slice(0, 5).map(commit => ({
              ...commit,
              botName: bot.name,
              botAvatarUrl: bot.avatarUrl,
            }));
          } catch (error) {
            console.error(error);
            return [];
          }
        });

        const results = await Promise.all(commitPromises);
        allCommits = results.flat();

        allCommits.sort((a, b) => new Date(b.commit.author.date).getTime() - new Date(a.commit.author.date).getTime());

        setCommits(allCommits.slice(0, 10));
      } catch (e) {
        setError('Failed to fetch commit data.');
      } finally {
        setLoading(false);
      }
    };

    if (bots && bots.length > 0) {
      fetchCommits();
    } else {
      setLoading(false);
    }
  }, [bots]);

  return (
    <div className="mt-16">
      <h2 className="text-3xl font-bold text-white mb-6 text-center">Recent Updates</h2>
      <div className="max-w-3xl mx-auto">
        {loading && <p className="text-center">Loading updates...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}
        {!loading && !error && commits.length === 0 && <p className="text-center">No recent updates found.</p>}
        {!loading && !error && commits.length > 0 && (
          <div className="space-y-4">
            {commits.map((commit) => (
              <CommitCard key={commit.sha} commit={commit} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Updates;
