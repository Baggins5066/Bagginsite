
import React, { useState, useMemo } from 'react';
import { BOTS_DATA } from './constants';
import { Bot } from './types';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import BotCard from './components/BotCard';
import BotProfileCard from './components/BotProfileCard';
import discordLogo from './assets/discord-logo.svg';

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBot, setSelectedBot] = useState<Bot | null>(null);

  const filteredBots = useMemo(() => {
    if (!searchTerm) {
      return BOTS_DATA;
    }
    return BOTS_DATA.filter(bot =>
      bot.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bot.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bot.tags.some(tag => tag.name.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [searchTerm]);

  const handleCardClick = (bot: Bot) => {
    setSelectedBot(bot);
  };

  const handleCloseProfile = () => {
    setSelectedBot(null);
  };

  return (
    <div className="min-h-screen bg-discord-darker text-discord-light-gray font-sans">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <div className="flex justify-center items-center mb-2">
            <img src={discordLogo} alt="Discord Logo" className="h-12 w-12 mr-4" />
            <h1 className="text-4xl md:text-5xl font-bold text-white">Discord bots</h1>
          </div>
        </div>
        
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        {filteredBots.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredBots.map(bot => (
              <BotCard key={bot.id} bot={bot} onCardClick={handleCardClick} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <h2 className="text-2xl font-semibold text-white">No Bots Found</h2>
            <p className="text-discord-gray mt-2">Try adjusting your search term.</p>
          </div>
        )}
      </main>
      <footer className="text-center py-6 text-sm text-discord-gray border-t border-discord-dark">
        <p>&copy; 2025 Baggins. All rights reserved.</p>
      </footer>

      {selectedBot && (
        <BotProfileCard bot={selectedBot} onClose={handleCloseProfile} />
      )}
    </div>
  );
};

export default App;
