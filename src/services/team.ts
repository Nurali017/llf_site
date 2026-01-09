import { fetchAPI } from './api';
import { TeamPageData } from '@/types/api';

/**
 * Fetch team page data (basic info + stats + results + calendar)
 */
export async function fetchTeamPage(teamId: number): Promise<TeamPageData> {
  return fetchAPI<TeamPageData>(`/api/page/teams/${teamId}`);
}
