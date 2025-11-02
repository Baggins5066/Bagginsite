import React from 'react';
import BagginsLogo from '../assets/Baggins-logo.png';

const Header: React.FC = () => {
  return (
    <header className="bg-discord-dark py-4 shadow-lg">
      <div className="container mx-auto px-4 flex items-baseline justify-between">
        <div className="flex items-baseline space-x-3">
          <img src={BagginsLogo} alt="Baggins Logo" className="w-8 h-8 rounded-full" />
          <span className="text-white text-xl font-bold">Bagginsite <span className="font-light text-discord-gray">/ Discord Bots</span></span>
        </div>
      </div>
    </header>
  );
};

export default Header;