/**
 * Hooks для работы с командами
 */

import { useAPI } from './useAPI';
import { fetchTeamPage } from '@/services/team';
import { TeamPageData } from '@/types/api';
import { CACHE_STRATEGIES } from '@/config/cache';

/**
 * Hook для получения данных команды (включая статистику, результаты, календарь)
 *
 * @param teamId - ID команды
 * @returns Объект с данными команды и состоянием загрузки
 *
 * @example
 * const { team, isLoading, isError, refresh } = useTeamPage(123);
 */
export function useTeamPage(teamId?: number) {
  const result = useAPI<TeamPageData>(
    teamId ? `team-page-${teamId}` : null,
    () => fetchTeamPage(teamId!),
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
