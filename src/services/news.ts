import { fetchAPI, buildQueryString } from './api';
import { NewsResponse } from '@/types/api';

export async function getNews(organizationId: number, category?: string): Promise<NewsResponse> {
  const params: Record<string, string | number> = { organization: organizationId };
  if (category) {
    params.category = category;
  }
  const queryString = buildQueryString(params);
  return fetchAPI<NewsResponse>(`/api/page/tape${queryString}`);
}
