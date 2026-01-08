/**
 * Hook для работы с бомбардирами
 */

import { useAPIArray } from './useAPI';
import { getScorers } from '@/services/scorers';
import { Scorer } from '@/types/api';
import { CACHE_STRATEGIES } from '@/config/cache';

/**
 * Hook для получения списка бомбардиров турнира
 *
 * @param leagueId - ID лиги (для лиги)
 * @param cupId - ID кубка (для кубка)
 * @returns Объект с массивом бомбардиров и состоянием загрузки
 *
 * @example
 * const { scorers, isLoading, isError } = useScorers(1); // League
 * const { scorers, isLoading, isError } = useScorers(undefined, 5); // Cup
 */
export function useScorers(leagueId?: number, cupId?: number) {
  const shouldFetch = leagueId || cupId;

  const cacheKey = shouldFetch
    ? (cupId ? `scorers-cup-${cupId}` : `scorers-league-${leagueId}`)
    : null;

  const result = useAPIArray<Scorer>(
    cacheKey,
    () => getScorers(leagueId, cupId),
    CACHE_STRATEGIES.STATIC
  );

  return {
    scorers: result.data,
    isLoading: result.isLoading,
    isError: result.isError,
    error: result.error,
    refresh: result.refresh,
  };
}
