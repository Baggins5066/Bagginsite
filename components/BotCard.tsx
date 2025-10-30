
import React, { useState } from 'react';
import { Bot } from '../types';
import Popup from './Popup';

interface BotCardProps {
  bot: Bot;
}

const VerifiedIcon: React.FC = () => (
    <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
    </svg>
);

const BotCard: React.FC<BotCardProps> = ({ bot }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  return (
    <>
      <div className="bg-discord-dark rounded-lg shadow-lg overflow-hidden flex flex-col transition-all duration-300 hover:shadow-discord-blurple/30 hover:shadow-2xl hover:-translate-y-1">
        <div className="p-5 flex-grow">
          <div className="flex items-center mb-4">
            <img src={bot.avatarUrl} alt={`${bot.name} avatar`} className="w-16 h-16 rounded-full mr-4" />
            <div>
              <div className="flex items-center gap-2">
                  <h3 className="text-xl font-bold text-white">{bot.name}</h3>
                  {bot.isVerified && <VerifiedIcon />}
              </div>
            </div>
          </div>
          <p className="text-discord-light-gray text-sm mb-4 h-20 overflow-hidden text-ellipsis">
            {bot.description}
          </p>
          <div className="flex flex-wrap gap-2">
            {bot.tags.map(tag => (
              <span key={tag} className="bg-discord-darker text-xs text-discord-light-gray font-semibold px-2 py-1 rounded-full">
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="bg-discord-darker p-4 flex items-center justify-between mt-auto">
          <button
              onClick={() => setIsPopupOpen(true)}
              className="w-full text-center bg-discord-blurple text-white font-bold py-2 px-4 rounded-md hover:bg-opacity-80 transition-colors"
          >
            Add to Server
          </button>
        </div>
      </div>
      {isPopupOpen && (
        <Popup
          onClose={() => setIsPopupOpen(false)}
          administratorInviteUrl={bot.administratorInviteUrl}
          minimalInviteUrl={bot.minimalInviteUrl}
        />
      )}
    </>
  );
};

export default BotCard;