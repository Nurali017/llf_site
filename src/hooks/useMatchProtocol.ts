/**
 * Hook для работы с протоколом матча
 */

import { useAPI } from './useAPI';
import { getMatchProtocol } from '@/services/matches';
import { MatchProtocol } from '@/types/api';
import { CACHE_STRATEGIES } from '@/config/cache';

/**
 * Hook для получения протокола матча
 *
 * @param matchId - ID матча
 * @returns Объект с протоколом матча и состоянием загрузки
 *
 * @example
 * const { match, isLoading, isError, refresh } = useMatchProtocol(123);
 */
export function useMatchProtocol(matchId?: number) {
  const result = useAPI<MatchProtocol>(
    matchId ? `match-protocol-${matchId}` : null,
    () => getMatchProtocol(matchId!),
    CACHE_STRATEGIES.RECENT
  );

  return {
    match: result.data,
    isLoading: result.isLoading,
    isError: result.isError,
    error: result.error,
    refresh: result.refresh,
  };
}
