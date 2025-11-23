import useSWR from 'swr';
import { getNews } from '@/services/news';
import { NewsResponse } from '@/types/api';

export function useNews(organizationId?: number) {
  const { data, error, isLoading } = useSWR<NewsResponse>(
    organizationId ? `/api/page/tape?organization=${organizationId}` : null,
    () => getNews(organizationId!),
    {
      revalidateOnFocus: false,
      dedupingInterval: 60000, // Кеш на 60 секунд
      revalidateOnReconnect: true,
    }
  );

  return {
    news: data?.news || [],
    isLoading,
    isError: !!error,
    error,
  };
}
