import React from 'react';

const BagginsIcon: React.FC = () => (
    <div className="w-8 h-8 bg-discord-blurple rounded-full flex items-center justify-center">
        <span className="text-white font-bold text-xl">B</span>
    </div>
);

const Header: React.FC = () => {
  return (
    <header className="bg-discord-dark py-4 shadow-lg">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <BagginsIcon />
          <span className="text-white text-xl font-bold">Baggins <span className="font-light text-discord-gray">/ Discord Bots</span></span>
        </div>
        <nav>
          <a href="#" className="text-discord-light-gray hover:text-white transition-colors">Home</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;