import { fetchAPI, buildQueryString } from './api';
import { NewsResponse } from '@/types/api';

export async function getNews(organizationId: number): Promise<NewsResponse> {
  const queryString = buildQueryString({ organization: organizationId });
  return fetchAPI<NewsResponse>(`/api/page/tape${queryString}`);
}
