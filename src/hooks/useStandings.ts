import useSWR from 'swr';
import { getStandings } from '@/services/standings';
import { StandingTeam } from '@/types/api';

export function useStandings(leagueId?: number, cupId?: number) {
  // Формируем правильный ключ кэша в зависимости от типа турнира
  const cacheKey = cupId
    ? `/api/page/table/cup/group/table?cup=${cupId}`
    : leagueId
    ? `/api/page/table/table/results?league=${leagueId}`
    : null;

  const { data, error, isLoading } = useSWR<StandingTeam[]>(
    cacheKey,
    () => getStandings(leagueId, cupId),
    {
      revalidateOnFocus: false,
      dedupingInterval: 30000, // Кеш на 30 секунд
      revalidateOnReconnect: true,
    }
  );

  return {
    standings: data,
    isLoading,
    isError: !!error,
    error,
  };
}
