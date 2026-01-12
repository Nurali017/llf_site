import { fetchAPI, buildQueryString } from './api';
import { NewsResponse, NewsItem } from '@/types/api';

export async function getNews(organizationId: number, category?: string): Promise<NewsResponse> {
  const params: Record<string, string | number> = { organization: organizationId };
  if (category) {
    params.category = category;
  }
  const queryString = buildQueryString(params);

  // API возвращает массив напрямую, а не { news: [...] }
  const newsArray = await fetchAPI<NewsItem[]>(`/api/news${queryString}`);

  // Фильтруем новости ДК ТОЛЬКО когда категория не указана
  const filteredNews = !category
    ? newsArray.filter(item => item.category !== 'DK')
    : newsArray;

  // Оборачиваем в ожидаемый формат
  return { news: filteredNews };
}

export async function getSingleNews(id: number): Promise<NewsItem> {
  return fetchAPI<NewsItem>(`/api/news/${id}`);
}
