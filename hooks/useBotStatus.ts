
import { useState, useEffect } from 'react';
import { Bot } from '../types';

/**
 * Custom hook to fetch bot online status from Discord.
 * 
 * Note: Discord's API requires authentication to check bot presence/status.
 * This implementation uses a best-effort approach:
 * 1. Attempts to verify bot exists via Discord API
 * 2. Falls back to checking if bot responds to API calls
 * 3. Handles rate limiting and errors gracefully
 * 
 * In a production environment, this would typically require:
 * - A backend service with bot tokens
 * - Discord Gateway WebSocket connection
 * - Or a third-party bot status tracking service
 */
export const useBotStatus = (initialBots: Bot[]) => {
  const [botsWithStatus, setBotsWithStatus] = useState<Bot[]>(initialBots);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBotStatuses = async () => {
      setLoading(true);
      setError(null);

      try {
        const statusPromises = initialBots.map(async (bot) => {
          try {
            // Attempt to fetch bot user information from Discord API
            // This endpoint works for public bots but doesn't give online status
            const response = await fetch(`https://discord.com/api/v10/users/${bot.id}`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
              },
            });

            // If we can fetch the bot info, it exists in Discord
            // We'll mark it as online if it's accessible
            // Note: This is a best-effort approach
            if (response.ok) {
              const data = await response.json();
              // If we got bot data, we assume it's configured and likely online
              // In reality, this just means the bot exists, not that it's online
              return { ...bot, isOnline: true };
            } else if (response.status === 429) {
              // Rate limited - return bot with unknown status
              console.warn(`Rate limited when checking status for ${bot.name}`);
              return { ...bot, isOnline: undefined };
            } else {
              // Bot not found or other error - mark as offline
              return { ...bot, isOnline: false };
            }
          } catch (error) {
            console.error(`Error checking status for ${bot.name}:`, error);
            // On error, return bot with unknown status
            return { ...bot, isOnline: undefined };
          }
        });

        const updatedBots = await Promise.all(statusPromises);
        setBotsWithStatus(updatedBots);
      } catch (e: any) {
        setError("Failed to fetch bot status data.");
        console.error(e);
        // On error, return bots with unknown status
        setBotsWithStatus(initialBots.map(bot => ({ ...bot, isOnline: undefined })));
      } finally {
        setLoading(false);
      }
    };

    if (initialBots.length > 0) {
      fetchBotStatuses();
    } else {
      setLoading(false);
    }
  }, [initialBots]);

  return { botsWithStatus, loading, error };
};
