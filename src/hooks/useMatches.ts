import useSWR from 'swr';
import { getMatches, getLiveMatches } from '@/services/matches';
import { Match, LiveMatch } from '@/types/api';

export function useMatches(organizationId?: number) {
  const formatDate = (date: Date) => date.toISOString().split('T')[0];

  // Запрос 1: Предстоящие матчи (БЕЗ дат) → NOT_STARTED
  const { data: upcomingData, error: upcomingError, isLoading: upcomingLoading } = useSWR<Match[]>(
    organizationId ? ['matches-upcoming', organizationId] : null,
    async () => {
      // БЕЗ дат - бэкенд вернет NOT_STARTED матчи (сегодня + 7 дней)
      return getMatches(organizationId!);
    },
    {
      revalidateOnFocus: false,
      dedupingInterval: 15000,
      revalidateOnReconnect: true,
    }
  );

  // Запрос 2: Прошедшие матчи (С датами в прошлом) → FINISHED
  const { data: finishedData, error: finishedError, isLoading: finishedLoading } = useSWR<Match[]>(
    organizationId ? ['matches-finished', organizationId] : null,
    async () => {
      const today = new Date();
      const start = new Date(today);
      start.setDate(today.getDate() - 10); // 10 дней назад
      const end = new Date(today);

      // С датами в прошлом - получим FINISHED матчи
      return getMatches(organizationId!, formatDate(start), formatDate(end));
    },
    {
      revalidateOnFocus: false,
      dedupingInterval: 15000,
      revalidateOnReconnect: true,
    }
  );

  // Объединяем результаты
  const allMatches = [...(upcomingData || []), ...(finishedData || [])];

  return {
    matches: allMatches.length > 0 ? allMatches : undefined,
    isLoading: upcomingLoading || finishedLoading,
    isError: !!upcomingError || !!finishedError,
    error: upcomingError || finishedError,
  };
}

export function useLiveMatches(organizationId?: number) {
  const { data, error, isLoading } = useSWR<LiveMatch[]>(
    organizationId ? `/api/page/tape/live?organization=${organizationId}` : null,
    () => getLiveMatches(organizationId!),
    {
      revalidateOnFocus: false,
      dedupingInterval: 5000, // Кеш на 5 секунд для live обновлений
      revalidateOnReconnect: true,
      refreshInterval: 10000, // Автообновление каждые 10 секунд
    }
  );

  return {
    liveMatches: data,
    isLoading,
    isError: !!error,
    error,
  };
}
