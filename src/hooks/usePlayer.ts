/**
 * Hooks для работы с игроками
 */

import { useAPI } from './useAPI';
import { fetchPlayer, fetchPlayerStats } from '@/services/player';
import { Player, PlayerStats } from '@/types/api';
import { CACHE_STRATEGIES } from '@/config/cache';

/**
 * Hook для получения данных игрока
 *
 * @param playerId - ID игрока
 * @returns Объект с данными игрока и состоянием загрузки
 *
 * @example
 * const { player, isLoading, isError, refresh } = usePlayer(123);
 */
export function usePlayer(playerId?: number) {
  const result = useAPI<Player>(
    playerId ? `player-${playerId}` : null,
    () => fetchPlayer(playerId!),
    CACHE_STRATEGIES.PROFILE
  );

  return {
    player: result.data,
    isLoading: result.isLoading,
    isError: result.isError,
    error: result.error,
    refresh: result.refresh,
  };
}

/**
 * Hook для получения статистики игрока
 *
 * @param playerId - ID игрока
 * @returns Объект со статистикой игрока и состоянием загрузки
 *
 * @example
 * const { stats, isLoading, isError } = usePlayerStats(123);
 */
export function usePlayerStats(playerId?: number) {
  const result = useAPI<PlayerStats>(
    playerId ? `player-stats-${playerId}` : null,
    () => fetchPlayerStats(playerId!),
    CACHE_STRATEGIES.PROFILE
  );

  return {
    stats: result.data,
    isLoading: result.isLoading,
    isError: result.isError,
    error: result.error,
    refresh: result.refresh,
  };
}
