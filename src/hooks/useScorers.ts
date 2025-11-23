import useSWR from 'swr';
import { getScorers } from '@/services/scorers';
import { Scorer } from '@/types/api';

export function useScorers(leagueId?: number, cupId?: number) {
  const shouldFetch = leagueId || cupId;

  const { data, error, isLoading } = useSWR<Scorer[]>(
    shouldFetch ? (cupId ? `/api/page/table/table/scorers?cup=${cupId}` : `/api/page/table/table/scorers?league=${leagueId}`) : null,
    () => getScorers(leagueId, cupId),
    {
      revalidateOnFocus: false,
      dedupingInterval: 30000, // Кеш на 30 секунд
      revalidateOnReconnect: true,
    }
  );

  return {
    scorers: data,
    isLoading,
    isError: !!error,
    error,
  };
}
