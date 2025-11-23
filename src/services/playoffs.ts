import { fetchAPI, buildQueryString } from './api';
import { PlayoffStage, PlayoffMatch } from '@/types/api';

export async function getPlayoffStages(cupId: number): Promise<PlayoffStage[]> {
    const params = buildQueryString({ cup: cupId });
    return fetchAPI<PlayoffStage[]>(`/api/cups-playoffs${params}`);
}

export async function getPlayoffResults(playoffId: number): Promise<PlayoffMatch[]> {
    const params = buildQueryString({ playoff: playoffId });
    return fetchAPI<PlayoffMatch[]>(`/api/page/table/cup/playoff/results${params}`);
}
