import { fetchAPI } from './api';
import { Team, TeamStats } from '@/types/api';

export async function fetchTeam(teamId: number): Promise<Team> {
  return fetchAPI<Team>(`/api/teams/${teamId}`);
}

export async function fetchTeamStats(teamId: number): Promise<TeamStats> {
  return fetchAPI<TeamStats>(`/api/page/table/team?id=${teamId}`);
}
