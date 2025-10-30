import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-discord-dark py-4 shadow-lg">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <img src="/assets/Meat Bro.png" alt="Meat Bro" className="w-8 h-8 rounded-full" />
          <span className="text-white text-xl font-bold">Baggins <span className="font-light text-discord-gray">/ Discord Bots</span></span>
        </div>
      </div>
    </header>
  );
};

export default Header;