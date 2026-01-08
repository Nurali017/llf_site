/**
 * Hooks для работы с командами
 */

import { useAPI } from './useAPI';
import { fetchTeam, fetchTeamStats } from '@/services/team';
import { Team, TeamStats } from '@/types/api';
import { CACHE_STRATEGIES } from '@/config/cache';

/**
 * Hook для получения данных команды
 *
 * @param teamId - ID команды
 * @returns Объект с данными команды и состоянием загрузки
 *
 * @example
 * const { team, isLoading, isError, refresh } = useTeam(123);
 */
export function useTeam(teamId?: number) {
  const result = useAPI<Team>(
    teamId ? `team-${teamId}` : null,
    () => fetchTeam(teamId!),
    CACHE_STRATEGIES.PROFILE
  );

  return {
    team: result.data,
    isLoading: result.isLoading,
    isError: result.isError,
    error: result.error,
    refresh: result.refresh,
  };
}

/**
 * Hook для получения статистики команды
 *
 * @param teamId - ID команды
 * @returns Объект со статистикой команды и состоянием загрузки
 *
 * @example
 * const { stats, isLoading, isError } = useTeamStats(123);
 */
export function useTeamStats(teamId?: number) {
  const result = useAPI<TeamStats>(
    teamId ? `team-stats-${teamId}` : null,
    () => fetchTeamStats(teamId!),
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
