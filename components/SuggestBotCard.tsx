
import React from 'react';

interface SuggestBotCardProps {
  onClick: () => void;
}

const SuggestBotCard: React.FC<SuggestBotCardProps> = ({ onClick }) => {
  return (
    <div
      className="relative bg-discord-dark rounded-lg shadow-lg flex flex-col transition-all duration-300 hover:shadow-discord-blurple/30 hover:shadow-2xl hover:-translate-y-1 cursor-pointer transform hover:scale-105 border-2 border-dashed border-discord-blurple"
      onClick={onClick}
    >
      <div className="p-5 flex-grow">
        <div className="flex items-center mb-4">
          <div className="w-20 h-20 rounded-full mr-4 bg-discord-darker flex items-center justify-center">
            <span className="material-symbols-outlined text-5xl text-discord-blurple">add_circle</span>
          </div>
          <div className="flex flex-col justify-center">
            <h3 className="text-2xl font-bold text-white">Suggest a Bot</h3>
            <p className="text-discord-gray text-sm">Have an idea?</p>
          </div>
        </div>
        <p className="text-discord-light-gray text-base mb-4 h-24 overflow-hidden text-ellipsis">
          Got an idea for a bot you'd like to see? Click here to suggest a new bot and share your thoughts with us!
        </p>
        <div className="flex flex-wrap gap-2">
          <span className="bg-discord-blurple text-sm text-white font-semibold px-3 py-1 rounded-full flex items-center gap-2">
            <span className="material-symbols-outlined text-base">lightbulb</span>
            Suggestion
          </span>
        </div>
      </div>
      <div className="bg-discord-darker p-5 flex items-center justify-center mt-auto h-32">
        <button className="w-full text-center bg-discord-blurple text-white font-bold py-3 px-5 rounded-lg hover:bg-opacity-80 transition-all duration-300 transform hover:scale-105 active:scale-95">
          Submit Suggestion
        </button>
      </div>
    </div>
  );
};

export default SuggestBotCard;
