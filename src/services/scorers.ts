import { fetchAPI, buildQueryString } from './api';
import { Scorer } from '@/types/api';

export async function getScorers(leagueId?: number, cupId?: number): Promise<Scorer[]> {
  if (cupId) {
    const queryString = buildQueryString({ cup: cupId });
    // The endpoint is the same as for leagues, just with a different parameter
    return fetchAPI<Scorer[]>(`/api/page/table/table/scorers${queryString}`);
  }

  if (leagueId) {
    const queryString = buildQueryString({ league: leagueId });
    return fetchAPI<Scorer[]>(`/api/page/table/table/scorers${queryString}`);
  }

  return [];
}
