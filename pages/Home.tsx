
import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-discord-darker text-discord-light-gray font-sans">
      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">Welcome to Bagginsite</h1>
          <p className="text-xl text-discord-gray">Explore our collection of apps and Discord bots</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Link 
            to="/apps" 
            className="bg-discord-dark hover:bg-discord-dark/80 transition-all duration-300 p-8 rounded-lg shadow-lg border border-discord-dark hover:border-discord-gray/30"
          >
            <div className="text-center">
              <div className="text-5xl mb-4">📱</div>
              <h2 className="text-3xl font-bold text-white mb-3">Apps</h2>
              <p className="text-discord-gray">Check out our web applications</p>
            </div>
          </Link>

          <Link 
            to="/discord-bots" 
            className="bg-discord-dark hover:bg-discord-dark/80 transition-all duration-300 p-8 rounded-lg shadow-lg border border-discord-dark hover:border-discord-gray/30"
          >
            <div className="text-center">
              <div className="text-5xl mb-4">🤖</div>
              <h2 className="text-3xl font-bold text-white mb-3">Discord Bots</h2>
              <p className="text-discord-gray">Discover our Discord bots</p>
            </div>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Home;
