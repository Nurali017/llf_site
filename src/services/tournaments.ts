import { fetchAPI, buildQueryString } from './api';

// Full tournament response from API
export interface TournamentAPIResponse {
  id: number;
  name: string;
  information: string | null;
  autocalculation_statistics: boolean;
  line_up_count: number;
  start_date: string;
  end_date: string;
  addressId: number | null;
  cityId: number | null;
  organizerId: number | null;
  format: string | null;
  price: number | null;
  maxTeams: number | null;
  season: {
    id: number;
    name: string;
    current: boolean;
  };
  image: string | null;
  priority: number;
  type: string;
  transfer: boolean;
  half_time_duration: number;
  category: number;
  isCup: boolean;
  teamsCount: number;
}

// Simplified tournament for frontend use
export interface Tournament {
  id: number;
  name: string;
  type: 'league' | 'cup';
  image?: string;
  priority: number;
}

/**
 * Get all tournaments for an organization with priorities
 * Uses /api/tournaments endpoint which includes priority field
 */
export async function getTournaments(organizationId: number): Promise<Tournament[]> {
  const queryString = buildQueryString({ organization: organizationId });
  const response = await fetchAPI<TournamentAPIResponse[]>(`/api/tournaments${queryString}`);

  // Transform API response to simplified Tournament format
  return response.map(tournament => ({
    id: tournament.id,
    name: tournament.name,
    type: tournament.isCup ? 'cup' : 'league',
    image: tournament.image || undefined,
    priority: tournament.priority,
  }));
}
