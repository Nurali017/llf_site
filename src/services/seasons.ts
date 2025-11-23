import { fetchAPI, buildQueryString } from './api';
import { SeasonResponse } from '@/types/api';

export async function getCurrentSeason(organizationId: number): Promise<SeasonResponse> {
    const queryString = buildQueryString({
        organization: organizationId,
        current: 'true',
    });
    return fetchAPI<SeasonResponse>(`/api/seasons${queryString}`);
}
