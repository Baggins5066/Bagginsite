import React, { useState, useEffect } from 'react';

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
  author: {
    login: string;
    avatar_url: string;
  } | null; // Author can be null
}

// Define the props for the Updates component
interface UpdatesProps {
  repoUrls: string[];
}

// A single commit component for better structure
const CommitCard: React.FC<{ commit: GitHubCommit }> = ({ commit }) => {
  const repoName = new URL(commit.html_url).pathname.split('/').slice(1, 3).join('/');
  return (
    <a
      href={commit.html_url}
      target="_blank"
      rel="noopener noreferrer"
      className="block bg-discord-dark p-4 rounded-lg hover:bg-discord-dark-gray transition-colors duration-200 animate-fade-in"
    >
      <div className="flex items-start">
        {commit.author?.avatar_url && (
          <img src={commit.author.avatar_url} alt={commit.author.login} className="w-10 h-10 rounded-full mr-4" />
        )}
        <div className="flex-grow">
          <p className="font-semibold text-white truncate">{commit.commit.message.split('\n')[0]}</p>
          <p className="text-sm text-discord-light-gray mt-1">
            <span className="font-mono text-xs bg-discord-darker px-1 py-0.5 rounded">{commit.sha.substring(0, 7)}</span> by <span className="font-semibold">{commit.commit.author.name}</span> to <span className="font-semibold">{repoName}</span>
          </p>
        </div>
        <p className="text-xs text-discord-gray flex-shrink-0 ml-4 pt-1">
          {new Date(commit.commit.author.date).toLocaleDateString()}
        </p>
      </div>
    </a>
  );
};

const Updates: React.FC<UpdatesProps> = ({ repoUrls }) => {
  const [commits, setCommits] = useState<GitHubCommit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCommits = async () => {
      setLoading(true);
      setError(null);
      let allCommits: GitHubCommit[] = [];

      // Use a Set to avoid processing duplicate repo URLs
      const uniqueRepoUrls = [...new Set(repoUrls)];

      try {
        const commitPromises = uniqueRepoUrls.map(async (url) => {
          try {
            const urlParts = new URL(url).pathname.split('/').filter(Boolean);
            if (urlParts.length < 2) {
              console.error(`Invalid GitHub repo URL: ${url}`);
              return [];
            }
            const [owner, repo] = urlParts;
            const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/commits`);
            if (!response.ok) {
              // Handle rate limiting
              if (response.status === 403) {
                console.warn(`Rate limit exceeded for ${url}.`);
                return []; // Return empty so other repos can still load
              }
              throw new Error(`Failed to fetch commits from ${url}`);
            }
            const data: GitHubCommit[] = await response.json();
            return data.slice(0, 5); // Get latest 5 commits from each repo
          } catch (error) {
            console.error(error);
            return []; // Return empty array on error for a specific repo
          }
        });

        const results = await Promise.all(commitPromises);
        allCommits = results.flat();

        // Sort all commits by date to get the most recent ones overall
        allCommits.sort((a, b) => new Date(b.commit.author.date).getTime() - new Date(a.commit.author.date).getTime());

        setCommits(allCommits.slice(0, 10)); // Show the top 10 most recent commits
      } catch (e) {
        setError('Failed to fetch commit data.');
      } finally {
        setLoading(false);
      }
    };

    if (repoUrls && repoUrls.length > 0) {
      fetchCommits();
    } else {
      setLoading(false);
    }
  }, [repoUrls]);

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
