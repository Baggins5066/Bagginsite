
import React, { useState, useMemo } from 'react';
import { BOTS_DATA } from '../constants';
import { Bot } from '../types';
import { useAllBotsLastUpdated } from '../hooks/useAllBotsLastUpdated';
import { useBotStatus } from '../hooks/useBotStatus';
import SearchBar from '../components/SearchBar';
import BotCard from '../components/BotCard';
import BotProfileCard from '../components/BotProfileCard';
import discordLogo from '../assets/discord-logo.svg';
import Updates from '../components/Updates';

const DiscordBots: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBot, setSelectedBot] = useState<Bot | null>(null);
  const { botsWithUpdates, loading: botsLoading, error: botsError } = useAllBotsLastUpdated(BOTS_DATA);
  const { botsWithStatus, loading: statusLoading, error: statusError } = useBotStatus(botsWithUpdates.length > 0 ? botsWithUpdates : BOTS_DATA);

  const filteredBots = useMemo(() => {
    const botsToFilter = botsWithStatus.length > 0 ? botsWithStatus : (botsWithUpdates.length > 0 ? botsWithUpdates : BOTS_DATA);
    if (!searchTerm) {
      return botsToFilter;
    }
    return botsToFilter.filter(bot =>
      bot.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bot.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bot.tags.some(tag => tag.name.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [searchTerm, botsWithStatus, botsWithUpdates]);

  const handleCardClick = (bot: Bot) => {
    const botWithAllData = botsWithStatus.find(b => b.id === bot.id) || bot;
    setSelectedBot(botWithAllData);
  };

  const handleCloseProfile = () => {
    setSelectedBot(null);
  };

  return (
    <div className="min-h-screen bg-discord-darker text-discord-light-gray font-sans">
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

        <Updates bots={BOTS_DATA} />

      </main>

      {selectedBot && (
        <BotProfileCard bot={selectedBot} onClose={handleCloseProfile} />
      )}
    </div>
  );
};

export default DiscordBots;
