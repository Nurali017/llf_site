/**
 * Hook для работы с новостями
 */

import { useAPI } from './useAPI';
import { getNews } from '@/services/news';
import { NewsResponse } from '@/types/api';
import { CACHE_STRATEGIES } from '@/config/cache';

/**
 * Hook для получения новостей организации
 *
 * @param organizationId - ID организации
 * @param category - Категория новостей (опционально)
 * @returns Массив новостей и состояние загрузки
 *
 * @example
 * const { news, isLoading, isError, refresh } = useNews(1);
 * const { news } = useNews(1, 'match');
 */
export function useNews(organizationId?: number, category?: string) {
  const cacheKey = organizationId
    ? `news-${organizationId}${category ? `-${category}` : ''}`
    : null;

  const result = useAPI<NewsResponse>(
    cacheKey,
    () => getNews(organizationId!, category),
    CACHE_STRATEGIES.RECENT
  );

  return {
    news: result.data?.news || [],
    isLoading: result.isLoading,
    isError: result.isError,
    error: result.error,
    refresh: result.refresh,
  };
}
