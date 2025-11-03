import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/Baggins-logo.png';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-discord-darker text-discord-light-gray flex flex-col justify-center items-center font-sans">
      <img src={logo} alt="Baggins Logo" className="w-64 h-64 mb-8" />
      <h1 className="text-5xl font-bold text-white mb-4">Baggins</h1>
      <p className="text-xl text-discord-gray mb-8">The best bots for your Discord server.</p>
      <div>
        <Link to="/bots" className="bg-blurple hover:bg-blurple-dark text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200">
          Explore Bots
        </Link>
      </div>
    </div>
  );
};

export default Home;
