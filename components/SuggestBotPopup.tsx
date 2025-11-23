import React, { useState, useEffect } from 'react';

interface SuggestBotPopupProps {
  onClose: () => void;
  formUrl?: string; // Optional, can be added later
}

const SuggestBotPopup: React.FC<SuggestBotPopupProps> = ({ onClose, formUrl }) => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsAnimating(true), 50);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-opacity duration-300 ${isAnimating ? 'opacity-100' : 'opacity-0'}`}>
      <div className={`bg-discord-dark rounded-lg shadow-xl w-full max-w-4xl mx-4 h-[90vh] flex flex-col transform transition-all duration-300 ${isAnimating ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
        <div className="flex justify-between items-center p-6 border-b border-discord-darker">
          <h3 className="text-2xl font-bold text-white">Suggest a Bot</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        <div className="flex-grow overflow-hidden p-6">
          {formUrl ? (
            <iframe
              src={formUrl}
              width="100%"
              height="100%"
              frameBorder="0"
              marginHeight={0}
              marginWidth={0}
              className="rounded-lg"
              title="Bot Suggestion Form"
            >
              Loading form...
            </iframe>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <span className="material-symbols-outlined text-6xl text-discord-blurple mb-4">construction</span>
              <h4 className="text-xl font-bold text-white mb-2">Form Coming Soon</h4>
              <p className="text-discord-light-gray max-w-md">
                The bot suggestion form is currently being set up. 
                Please check back later to submit your bot ideas!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SuggestBotPopup;