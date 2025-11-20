
import React from 'react';

interface StatusIndicatorProps {
  isOnline?: boolean;
  size?: 'small' | 'medium' | 'large';
}

const StatusIndicator: React.FC<StatusIndicatorProps> = ({ isOnline, size = 'small' }) => {
  // Determine size classes
  const sizeClasses = {
    small: 'w-3 h-3',
    medium: 'w-4 h-4',
    large: 'w-5 h-5',
  };

  // Determine status color and animation
  const getStatusClasses = () => {
    if (isOnline === true) {
      return 'bg-green-500 animate-pulse';
    } else if (isOnline === false) {
      return 'bg-gray-500';
    } else {
      // Unknown status
      return 'bg-yellow-500';
    }
  };

  const getStatusLabel = () => {
    if (isOnline === true) {
      return 'Online';
    } else if (isOnline === false) {
      return 'Offline';
    } else {
      return 'Unknown';
    }
  };

  return (
    <div className="flex items-center gap-2">
      <div 
        className={`rounded-full ${sizeClasses[size]} ${getStatusClasses()}`}
        title={getStatusLabel()}
        aria-label={`Status: ${getStatusLabel()}`}
      />
      <span className="text-xs text-discord-light-gray">{getStatusLabel()}</span>
    </div>
  );
};

export default StatusIndicator;
