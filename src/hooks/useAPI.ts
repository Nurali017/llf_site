/**
 * Factory Hook для упрощения работы с SWR
 * Предоставляет единообразный интерфейс для всех API hooks
 */

import useSWR, { type SWRConfiguration } from 'swr';
import { SWR_DEFAULT_CONFIG } from '@/config/cache';

/**
 * Результат useAPI hook
 */
export interface UseAPIResult<T> {
  /** Загруженные данные */
  data: T | undefined;
  /** Флаг загрузки */
  isLoading: boolean;
  /** Флаг ошибки */
  isError: boolean;
  /** Объект ошибки */
  error: Error | undefined;
  /** Функция для принудительного обновления данных */
  refresh: () => Promise<T | undefined>;
  /** Функция для мутации данных без запроса */
  mutate: (data?: T | Promise<T> | ((current?: T) => T | Promise<T>), shouldRevalidate?: boolean) => Promise<T | undefined>;
}

/**
 * Universal API Hook - Factory для создания data fetching hooks
 *
 * @param key - Ключ кеша SWR (null если не нужно загружать)
 * @param fetcher - Функция для загрузки данных
 * @param options - Дополнительные опции SWR
 * @returns Объект с данными, состоянием загрузки и методами управления
 *
 * @example
 * ```typescript
 * export function usePlayer(playerId: number | undefined) {
 *   return useAPI(
 *     playerId ? `player-${playerId}` : null,
 *     () => getPlayer(playerId!),
 *     CACHE_STRATEGIES.PROFILE
 *   );
 * }
 * ```
 */
export function useAPI<T>(
  key: string | null,
  fetcher: () => Promise<T>,
  options?: SWRConfiguration
): UseAPIResult<T> {
  const { data, error, isLoading, mutate } = useSWR<T>(
    key,
    key ? fetcher : null,
    {
      ...SWR_DEFAULT_CONFIG,
      ...options,
    }
  );

  return {
    data,
    isLoading,
    isError: !!error,
    error,
    refresh: () => mutate(),
    mutate,
  };
}

/**
 * Hook для загрузки данных с автоматической обработкой массива
 * Если данных нет, возвращает пустой массив вместо undefined
 *
 * @param key - Ключ кеша SWR
 * @param fetcher - Функция для загрузки данных
 * @param options - Дополнительные опции SWR
 * @returns Объект с массивом данных
 *
 * @example
 * ```typescript
 * export function useNews(organizationId: number | undefined) {
 *   return useAPIArray(
 *     organizationId ? `news-${organizationId}` : null,
 *     () => getNews(organizationId!),
 *     CACHE_STRATEGIES.RECENT
 *   );
 * }
 * ```
 */
export function useAPIArray<T>(
  key: string | null,
  fetcher: () => Promise<T[]>,
  options?: SWRConfiguration
): Omit<UseAPIResult<T[]>, 'data'> & { data: T[] } {
  const result = useAPI(key, fetcher, options);

  return {
    ...result,
    data: result.data || [],
  };
}

/**
 * Hook для conditional fetching (загрузка только при определенном условии)
 *
 * @param condition - Условие для загрузки
 * @param key - Ключ кеша SWR
 * @param fetcher - Функция для загрузки данных
 * @param options - Дополнительные опции SWR
 * @returns Объект с данными
 *
 * @example
 * ```typescript
 * const { data } = useAPIConditional(
 *   activeTournament?.type === 'cup',
 *   `cup-groups-${cupId}`,
 *   () => getCupGroups(cupId),
 *   CACHE_STRATEGIES.STATIC
 * );
 * ```
 */
export function useAPIConditional<T>(
  condition: boolean,
  key: string,
  fetcher: () => Promise<T>,
  options?: SWRConfiguration
): UseAPIResult<T> {
  return useAPI(
    condition ? key : null,
    fetcher,
    options
  );
}
