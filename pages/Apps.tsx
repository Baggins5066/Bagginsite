
import React from 'react';

const Apps: React.FC = () => {
  return (
    <div className="min-h-screen bg-discord-darker text-discord-light-gray font-sans">
      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Apps</h1>
          <p className="text-xl text-discord-gray">Web applications by Baggins</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <a 
            href="https://baggins5066.github.io/portfolio-balancer/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-discord-dark hover:bg-discord-dark/80 transition-all duration-300 p-6 rounded-lg shadow-lg border border-discord-dark hover:border-discord-gray/30 group"
          >
            <div className="text-center">
              <div className="text-4xl mb-3">💼</div>
              <h2 className="text-2xl font-bold text-white mb-2">Portfolio Balancer</h2>
              <div className="mt-4 text-sm text-discord-gray group-hover:text-white transition-colors">
                Launch
              </div>
            </div>
          </a>
        </div>
      </main>
    </div>
  );
};

export default Apps;
