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

const GitHubIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    fill="currentColor"
    viewBox="0 0 24 24"
    className={className}
  >
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

const CommitCard: React.FC<{ commit: CommitWithBotInfo }> = ({ commit }) => {
  return (
    <div
      className="bg-discord-dark p-4 rounded-lg animate-fade-in"
    >
      <div className="flex items-start gap-4">
        <img src={commit.botAvatarUrl} alt={commit.botName} className="w-10 h-10 rounded-full flex-shrink-0" />
        <div className="flex-grow min-w-0">
          <p className="text-sm text-discord-light-gray">
            <span className="font-semibold text-white">{commit.botName}</span>
            <span className="ml-2 text-xs text-discord-gray">{new Date(commit.commit.author.date).toLocaleDateString()}</span>
          </p>
          <p className="text-white mt-1 break-words">{commit.commit.message.split('\n')[0]}</p>
        </div>
        <a
          href={commit.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-black text-white p-2 rounded-md flex items-center group transition-all duration-300 ease-in-out flex-shrink-0"
        >
          <GitHubIcon className="h-5 w-5" />
          <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs group-hover:ml-2 transition-all duration-300 ease-in-out">
            View on GitHub
          </span>
        </a>
      </div>
    </div>
  );
};

const Updates: React.FC<UpdatesProps> = ({ bots }) => {
  const [allCommits, setAllCommits] = useState<CommitWithBotInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const COMMITS_PER_PAGE = 10;

  useEffect(() => {
    const fetchCommits = async () => {
      setLoading(true);
      setError(null);
      let fetchedCommits: CommitWithBotInfo[] = [];

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
            const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/commits?per_page=10`);
            if (!response.ok) {
              if (response.status === 403) {
                console.warn(`Rate limit exceeded for ${url}.`);
                return [];
              }
              throw new Error(`Failed to fetch commits from ${url}`);
            }
            const data: GitHubCommit[] = await response.json();
            return data.map(commit => ({
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
        fetchedCommits = results.flat();

        fetchedCommits.sort((a, b) => new Date(b.commit.author.date).getTime() - new Date(a.commit.author.date).getTime());

        setAllCommits(fetchedCommits);
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

  const totalPages = Math.ceil(allCommits.length / COMMITS_PER_PAGE);
  const paginatedCommits = allCommits.slice(currentPage * COMMITS_PER_PAGE, (currentPage + 1) * COMMITS_PER_PAGE);

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1));
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 0));
  };

  return (
    <div className="mt-16">
      <h2 className="text-3xl font-bold text-white mb-6 text-center">Recent Updates</h2>
      <div className="max-w-3xl mx-auto">
        {loading && <p className="text-center">Loading updates...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}
        {!loading && !error && allCommits.length === 0 && <p className="text-center">No recent updates found.</p>}
        {!loading && !error && allCommits.length > 0 && (
          <>
            <div className="space-y-4">
              {paginatedCommits.map((commit) => (
                <CommitCard key={commit.sha} commit={commit} />
              ))}
            </div>
            {totalPages > 1 && (
              <div className="flex justify-center items-center mt-6 space-x-4">
                <button
                  onClick={handlePrevPage}
                  disabled={currentPage === 0}
                  className="bg-discord-blurple text-white px-4 py-2 rounded-md disabled:bg-discord-dark-gray disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <span className="text-white">
                  Page {currentPage + 1} of {totalPages}
                </span>
                <button
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages - 1}
                  className="bg-discord-blurple text-white px-4 py-2 rounded-md disabled:bg-discord-dark-gray disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Updates;
