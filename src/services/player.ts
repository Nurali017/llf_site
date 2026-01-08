import { fetchAPI } from './api';
import { Player, PlayerStats } from '@/types/api';

export async function fetchPlayer(playerId: number): Promise<Player> {
  return fetchAPI<Player>(`/api/players/${playerId}`);
}

export async function fetchPlayerStats(playerId: number): Promise<PlayerStats> {
  return fetchAPI<PlayerStats>(`/api/players/${playerId}/stats`);
}
