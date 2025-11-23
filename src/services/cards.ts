import { fetchAPI, buildQueryString } from './api';
import { Card } from '@/types/api';

export async function getYellowCards(leagueId: number): Promise<Card[]> {
    const queryString = buildQueryString({ league: leagueId });
    return fetchAPI<Card[]>(`/api/page/table/table/yellow${queryString}`);
}

export async function getRedCards(leagueId: number): Promise<Card[]> {
    const queryString = buildQueryString({ league: leagueId });
    return fetchAPI<Card[]>(`/api/page/table/table/red${queryString}`);
}
