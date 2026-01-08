/**
 * Hook для работы с турнирной таблицей
 */

import { useAPIArray } from './useAPI';
import { getStandings } from '@/services/standings';
import { StandingTeam } from '@/types/api';
import { CACHE_STRATEGIES } from '@/config/cache';

/**
 * Hook для получения турнирной таблицы (лиги или кубка)
 *
 * @param leagueId - ID лиги (для лиги)
 * @param cupId - ID кубка (для кубка)
 * @returns Объект с турнирной таблицей и состоянием загрузки
 *
 * @example
 * const { standings, isLoading, isError } = useStandings(1); // League
 * const { standings, isLoading, isError } = useStandings(undefined, 5); // Cup
 */
export function useStandings(leagueId?: number, cupId?: number) {
  // Формируем уникальный ключ кэша в зависимости от типа турнира
  const cacheKey = cupId
    ? `standings-cup-${cupId}`
    : leagueId
    ? `standings-league-${leagueId}`
    : null;

  const result = useAPIArray<StandingTeam>(
    cacheKey,
    () => getStandings(leagueId, cupId),
    CACHE_STRATEGIES.STATIC
  );

  return {
    standings: result.data,
    isLoading: result.isLoading,
    isError: result.isError,
    error: result.error,
    refresh: result.refresh,
  };
}
