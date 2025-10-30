import React, { useState, useEffect } from 'react';

interface PopupProps {
  onClose: () => void;
  administratorInviteUrl: string;
  minimalInviteUrl: string;
}

const Popup: React.FC<PopupProps> = ({ onClose, administratorInviteUrl, minimalInviteUrl }) => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsAnimating(true), 50); // Delay to ensure transition is applied
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-opacity duration-300 ${isAnimating ? 'opacity-100' : 'opacity-0'}`}>
      <div className={`bg-discord-dark rounded-lg shadow-xl p-6 w-full max-w-md mx-4 transform transition-all duration-300 ${isAnimating ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-white">Add to Server</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        <div className="space-y-4">
          <a
            href={minimalInviteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative block w-full text-center bg-discord-blurple text-white font-bold py-3 px-4 rounded-md hover:bg-opacity-80 transition-colors"
          >
            Minimal Permissions
            <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full transform transition-transform duration-200 group-hover:scale-110">
              Recommended
            </span>
          </a>
          <a
            href={administratorInviteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full text-center bg-yellow-500 text-white font-bold py-3 px-4 rounded-md hover:bg-opacity-80 transition-colors"
          >
            Administrator Permissions
          </a>
        </div>
      </div>
    </div>
  );
};

export default Popup;
