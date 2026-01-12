const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://1sportkz.com';

export class APIError extends Error {
  constructor(
    message: string,
    public status?: number,
    public statusText?: string
  ) {
    super(message);
    this.name = 'APIError';
  }
}

export function buildQueryString(params: Record<string, string | number | undefined>): string {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      searchParams.append(key, String(value));
    }
  });

  const queryString = searchParams.toString();
  return queryString ? `?${queryString}` : '';
}

export async function fetchAPI<T>(endpoint: string): Promise<T> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        'Accept-Language': 'ru',
      },
    });

    if (!response.ok) {
      throw new APIError(
        `API request failed: ${response.statusText}`,
        response.status,
        response.statusText
      );
    }

    return response.json();
  } catch (error) {
    if (error instanceof APIError) {
      throw error;
    }
    throw new APIError(
      `Network error: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}

// Hall of Fame Types
export interface HallOfFameTeam {
  id: number;
  name: string;
  image: string;
}

export interface HallOfFameTournament {
  id: number;
  name: string;
  sport_type: string;
}

export interface HallOfFameItem {
  team: HallOfFameTeam;
  tournament: HallOfFameTournament;
  trophy_photo: string;
  place: number;
  year: number;
}

export interface HallOfFameResponse {
  data: HallOfFameItem[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface HallOfFameParams {
  page?: number;
  limit?: number;
  place?: number;
  year?: number;
  sport_type?: string;
}

// Hall of Fame API (organizationId = 1)
export async function getHallOfFame(params?: HallOfFameParams): Promise<HallOfFameResponse> {
  const query = buildQueryString(params as Record<string, string | number | undefined> || {});
  return fetchAPI<HallOfFameResponse>(`/api/organizations/1/hall-of-fame${query}`);
}
