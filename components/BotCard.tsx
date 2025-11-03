
import React,
{
  useState,
  useRef,
  useEffect
} from 'react';
import { Bot } from '../types';

interface BotCardProps {
  bot: Bot;
  onCardClick: (bot: Bot) => void;
}

const VerifiedIcon: React.FC = () => (
    <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
    </svg>
);

const BotCard: React.FC<BotCardProps> = ({ bot, onCardClick }) => {
  const [showAddButtons, setShowAddButtons] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleAddToServerClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowAddButtons(true);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
        setShowAddButtons(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const wasUpdatedRecently = () => {
    if (!bot.lastUpdated) return false;
    const lastUpdatedDate = new Date(bot.lastUpdated);
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    return lastUpdatedDate > oneWeekAgo;
  };

  return (
    <div
      ref={cardRef}
      className="relative bg-discord-dark rounded-lg shadow-lg overflow-hidden flex flex-col transition-all duration-300 hover:shadow-discord-blurple/30 hover:shadow-2xl hover:-translate-y-1 cursor-pointer transform hover:scale-105"
      onClick={() => onCardClick(bot)}
    >
      {wasUpdatedRecently() && (
        <div className="absolute top-2 right-2 z-10">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-base font-bold bg-green-500 text-white animate-glow-strong">
            Updated Recently
          </span>
        </div>
      )}
      <div className="p-5 flex-grow">
        <div className="flex items-center mb-4">
          <img src={bot.avatarUrl} alt={`${bot.name} avatar`} className="w-20 h-20 rounded-full mr-4" />
            <div>
              <div className="flex items-center gap-2">
                  <h3 className="text-2xl font-bold text-white">{bot.name}</h3>
                  {bot.isVerified && <VerifiedIcon />}
              </div>
            </div>
          </div>
          <p className="text-discord-light-gray text-base mb-4 h-24 overflow-hidden text-ellipsis">
            {bot.description}
          </p>
          <div className="flex flex-wrap gap-2">
            {bot.tags.map(tag => (
              <span key={tag.name} className="bg-discord-darker text-sm text-discord-light-gray font-semibold px-3 py-1 rounded-full flex items-center gap-2">
                {tag.icon && <span className="material-symbols-outlined text-base">{tag.icon}</span>}
                {tag.name}
              </span>
            ))}
          </div>
        </div>
        <div className="bg-discord-darker p-5 flex items-center justify-between mt-auto h-32">
          <div className="relative w-full h-full flex items-center justify-center">
            {/* "Add to Server" Button */}
            <div className={`absolute w-full transition-all duration-300 ease-in-out ${showAddButtons ? 'opacity-0 transform -translate-y-5 pointer-events-none' : 'opacity-100 transform translate-y-0'}`}>
              <button
                onClick={handleAddToServerClick}
                className="w-full text-center bg-discord-blurple text-white font-bold py-3 px-5 rounded-lg hover:bg-opacity-80 transition-all duration-300 transform hover:scale-105 active:scale-95"
              >
                Add to Server
              </button>
            </div>

            {/* Two Invite Buttons */}
            <div className={`absolute w-full grid grid-cols-1 gap-3 transition-all duration-300 ease-in-out ${showAddButtons ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-5 pointer-events-none'}`}>
              <a href={bot.minimalInviteUrl} target="_blank" rel="noopener noreferrer" className="text-center bg-discord-blurple text-white font-bold py-3 px-5 rounded-lg hover:bg-opacity-80 transition-all duration-300 transform hover:scale-105 active:scale-95 flex justify-center items-center gap-2">
                <span>Minimal</span>
                <span className="text-xs bg-green-500 text-white font-bold px-2 py-0.5 rounded-full">Recommended</span>
              </a>
              <a href={bot.administratorInviteUrl} target="_blank" rel="noopener noreferrer" className="text-center bg-yellow-500 text-black font-bold py-3 px-5 rounded-lg hover:bg-opacity-80 transition-all duration-300 transform hover:scale-105 active:scale-95">
                Administrator
              </a>
            </div>
          </div>
        </div>
    </div>
  );
};

export default BotCard;
