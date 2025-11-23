import { fetchAPI, buildQueryString } from './api';
import { Match } from '@/types/api';

export async function getMatchDates(leagueId?: number, cupId?: number): Promise<string[]> {
    const queryString = buildQueryString({ league: leagueId, cup: cupId });
    return fetchAPI<string[]>(`/api/page/matches/dates${queryString}`);
}

export async function getMatchesByDate(date: string, leagueId?: number, cupId?: number): Promise<Match[]> {
    const queryString = buildQueryString({ date, league: leagueId, cup: cupId });
    return fetchAPI<Match[]>(`/api/page/matches${queryString}`);
}
