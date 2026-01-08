/**
 * Hooks для работы с матчами
 */

import { useAPI, useAPIArray } from './useAPI';
import { getMatches, getLiveMatches } from '@/services/matches';
import { Match, LiveMatch } from '@/types/api';
import { CACHE_STRATEGIES } from '@/config/cache';
import useSWR from 'swr';

/**
 * Hook для получения списка матчей (предстоящие + завершенные)
 *
 * @param organizationId - ID организации
 * @returns Объект с массивом матчей и состоянием загрузки
 *
 * @example
 * const { matches, isLoading, isError } = useMatches(1);
 */
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
      ...CACHE_STRATEGIES.RECENT,
      dedupingInterval: 15000, // Специфичная настройка для матчей
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
      ...CACHE_STRATEGIES.RECENT,
      dedupingInterval: 15000,
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

/**
 * Hook для получения live матчей (матчи идущие сейчас)
 *
 * @param organizationId - ID организации
 * @returns Объект с массивом live матчей и состоянием загрузки
 *
 * @example
 * const { liveMatches, isLoading, refresh } = useLiveMatches(1);
 */
export function useLiveMatches(organizationId?: number) {
  const result = useAPIArray<LiveMatch>(
    organizationId ? `live-matches-${organizationId}` : null,
    () => getLiveMatches(organizationId!),
    CACHE_STRATEGIES.LIVE
  );

  return {
    liveMatches: result.data,
    isLoading: result.isLoading,
    isError: result.isError,
    error: result.error,
    refresh: result.refresh,
  };
}
