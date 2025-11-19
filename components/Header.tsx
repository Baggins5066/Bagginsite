import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import BagginsLogo from '../assets/Baggins-logo.png';

const Header: React.FC = () => {
  const location = useLocation();

  // Get the current page info based on the path
  const getPageInfo = () => {
    switch (location.pathname) {
      case '/':
        return { name: 'Home', path: '/' };
      case '/apps':
        return { name: 'Apps', path: '/apps' };
      case '/discord-bots':
        return { name: 'Discord Bots', path: '/discord-bots' };
      default:
        return { name: 'Home', path: '/' };
    }
  };

  const pageInfo = getPageInfo();

  return (
    <header className="bg-discord-dark py-4 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center space-x-3">
          <img src={BagginsLogo} alt="Baggins Logo" className="w-8 h-8 rounded-full" />
          <div className="text-white text-xl font-bold">
            <Link to="/" className="hover:opacity-80 transition-opacity">
              Bagginsite
            </Link>
            <span className="font-light text-discord-gray"> / </span>
            <Link to={pageInfo.path} className="font-light text-discord-gray hover:text-white transition-colors">
              {pageInfo.name}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;