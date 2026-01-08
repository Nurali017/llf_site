import { fetchAPI, buildQueryString } from './api';
import { Match, LiveMatch, MatchProtocol } from '@/types/api';

export async function getMatches(
  organizationId: number,
  startDate?: string,
  endDate?: string
): Promise<Match[]> {
  const queryString = buildQueryString({
    organization: organizationId,
    startDate,
    endDate,
  });
  return fetchAPI<Match[]>(`/api/page/table/league/upcoming-matches${queryString}`);
}

export async function getLiveMatches(organizationId: number): Promise<LiveMatch[]> {
  const queryString = buildQueryString({ organization: organizationId });
  return fetchAPI<LiveMatch[]>(`/api/page/tape/live${queryString}`);
}

export async function getMatchProtocol(matchId: number): Promise<MatchProtocol> {
  return fetchAPI<MatchProtocol>(`/api/page/match?id=${matchId}`);
}
