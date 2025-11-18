import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import BagginsLogo from '../assets/Baggins-logo.png';

const Header: React.FC = () => {
  const location = useLocation();

  return (
    <header className="bg-discord-dark py-4 shadow-lg">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
          <img src={BagginsLogo} alt="Baggins Logo" className="w-8 h-8 rounded-full" />
          <span className="text-white text-xl font-bold">Bagginsite</span>
        </Link>
        <nav className="flex space-x-6">
          <Link 
            to="/" 
            className={`text-lg transition-colors ${
              location.pathname === '/' ? 'text-white font-semibold' : 'text-discord-gray hover:text-white'
            }`}
          >
            Home
          </Link>
          <Link 
            to="/apps" 
            className={`text-lg transition-colors ${
              location.pathname === '/apps' ? 'text-white font-semibold' : 'text-discord-gray hover:text-white'
            }`}
          >
            Apps
          </Link>
          <Link 
            to="/discord-bots" 
            className={`text-lg transition-colors ${
              location.pathname === '/discord-bots' ? 'text-white font-semibold' : 'text-discord-gray hover:text-white'
            }`}
          >
            Discord Bots
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;