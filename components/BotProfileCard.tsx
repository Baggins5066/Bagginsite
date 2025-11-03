
import React, { useState } from 'react';
import { Bot } from '../types';
import { useBotLastUpdated } from '../hooks/useBotLastUpdated';

interface BotProfileCardProps {
  bot: Bot;
  onClose: () => void;
}

const VerifiedIcon: React.FC = () => (
    <svg className="w-6 h-6 text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
    </svg>
);

const BotProfileCard: React.FC<BotProfileCardProps> = ({ bot, onClose }) => {
  const { lastUpdated, loading, error } = useBotLastUpdated(bot);
  const [showAddButtons, setShowAddButtons] = useState(false);

  const wasUpdatedRecently = () => {
    if (!lastUpdated) return false;
    const lastUpdatedDate = new Date(lastUpdated);
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    return lastUpdatedDate > oneWeekAgo;
  };

  const handleAddToServerClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowAddButtons(true);
  };

  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(onClose, 300); // Match animation duration
  };

  return (
    <div className={`fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4 transition-opacity duration-300 ${isClosing ? 'opacity-0' : 'opacity-100'}`} onClick={handleClose}>
      <div className={`bg-discord-dark rounded-xl shadow-2xl w-full max-w-2xl mx-auto transform transition-transform duration-300 ${isClosing ? 'scale-95' : 'scale-100'} animate-scale-in`} onClick={(e) => e.stopPropagation()}>
        <div className="p-8 relative">
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-discord-gray hover:text-white transition-colors bg-discord-darker rounded-full p-2"
            aria-label="Close profile"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
            </svg>
          </button>

          <div className="flex flex-col sm:flex-row items-center mb-6 text-center sm:text-left">
            <img src={bot.avatarUrl} alt={`${bot.name} avatar`} className="w-32 h-32 rounded-full mr-0 sm:mr-6 mb-4 sm:mb-0 border-4 border-discord-darker" />
            <div>
              <div className="flex items-center justify-center sm:justify-start gap-3">
                <h2 className="text-5xl font-bold text-white">{bot.name}</h2>
                {bot.isVerified && <VerifiedIcon />}
              </div>
              <div className="mt-2 text-sm text-discord-gray">
                {loading && <span>Loading last updated date...</span>}
                {error && <span className="text-red-500">Error: {error}</span>}
                {!loading && !error && lastUpdated && (
                  <div className="flex items-center gap-2">
                    <p>
                      Last updated: {new Date(lastUpdated).toLocaleDateString()}
                    </p>
                    {wasUpdatedRecently() && (
                      <span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full animate-pulse">
                        Updated recently
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          <p className="text-discord-light-gray mb-6 text-xl">
            {bot.description}
          </p>

          <div className="flex flex-wrap justify-center sm:justify-start gap-3 mb-8">
            {bot.tags.map(tag => (
              <span key={tag.name} className="bg-discord-darker text-base text-discord-light-gray font-semibold px-4 py-2 rounded-full shadow-md flex items-center gap-2">
                {tag.icon && <span className="material-symbols-outlined text-base">{tag.icon}</span>}
                {tag.name}
              </span>
            ))}
          </div>

          <div className="relative h-28 flex items-center justify-center">
            {/* "Add to Server" Button */}
            <div className={`absolute w-full transition-all duration-300 ease-in-out ${showAddButtons ? 'opacity-0 transform -translate-y-5 pointer-events-none' : 'opacity-100 transform translate-y-0'}`}>
              <button
                onClick={handleAddToServerClick}
                className="w-full text-center bg-discord-blurple text-white font-bold py-4 px-8 rounded-lg hover:bg-opacity-85 transition-all duration-300 text-xl shadow-lg hover:shadow-xl"
              >
                Add to Server
              </button>
            </div>

            {/* Two Invite Buttons */}
            <div className={`absolute w-full grid grid-cols-1 gap-3 transition-all duration-300 ease-in-out ${showAddButtons ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-5 pointer-events-none'}`}>
              <a href={bot.minimalInviteUrl} target="_blank" rel="noopener noreferrer" className="text-center bg-discord-blurple text-white font-bold py-4 px-8 rounded-lg hover:bg-opacity-85 transition-all duration-300 text-xl shadow-lg hover:shadow-xl flex justify-center items-center gap-2">
                <span>Minimal Permissions</span>
                <span className="text-sm bg-green-500 text-white font-bold px-3 py-1 rounded-full">Recommended</span>
              </a>
              <a href={bot.administratorInviteUrl} target="_blank" rel="noopener noreferrer" className="text-center bg-yellow-500 text-black font-bold py-4 px-8 rounded-lg hover:bg-opacity-85 transition-all duration-300 text-xl shadow-lg hover:shadow-xl">
                Administrator Permissions
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BotProfileCard;
