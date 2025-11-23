import { fetchAPI, buildQueryString } from './api';
import { StandingTeam, CupGroup } from '@/types/api';

export async function getCupGroups(cupId: number): Promise<CupGroup[]> {
  const params = buildQueryString({ cup: cupId });
  return fetchAPI<CupGroup[]>(`/api/page/table/cup/group/table${params}`);
}

export async function getStandings(leagueId?: number, cupId?: number): Promise<StandingTeam[]> {
  // Используем разные эндпоинты для лиг и кубков
  if (cupId) {
    const queryString = buildQueryString({ cup: cupId });
    return fetchAPI<StandingTeam[]>(`/api/page/table/cup/group/table${queryString}`);
  }

  if (leagueId) {
    const queryString = buildQueryString({ league: leagueId });
    return fetchAPI<StandingTeam[]>(`/api/page/table/table/results${queryString}`);
  }

  return [];
}
