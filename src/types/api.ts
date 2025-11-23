export interface City {
  id: number;
  name: string;
  organizationId: number;
}

export interface Organization {
  id: number;
  name: string;
  demo: boolean;
  city: City | null;
  leagueId?: number;
  currentSeasonId?: number;
  cupId?: number;
}

export interface OrganizationWithSlug extends Organization {
  slug: string;
  displayName: string;
}

// Standing (Турнирная таблица)
export interface StandingTeam {
  team: {
    id: number;
    name: string;
    image: string;
    uniform_color?: string;
  };
  game_count: number;
  scored: number;
  missed: number;
  score_diff: number;
  point: number;
  wins: number;
  draw: number;
  defeat: number;
}

// Scorers (Бомбардиры)
export interface Scorer {
  team: {
    id: number;
    name: string;
  };
  player: {
    id: number;
    firstname: string;
    lastname: string;
    image: string | null;
    goldCardStatus?: boolean;
  };
  game_count: number;
  scored: number;
}

// Match Team Info
export interface MatchTeam {
  id: number;
  name: string;
  image: string;
  goals?: number | null;
  penalty_goals?: number | null;
}

// Match
export interface Match {
  id: number;
  type?: string;
  date?: string;
  time: string;
  penalty_status?: boolean;
  chess_result_type?: string;
  team_1: MatchTeam;
  team_2: MatchTeam;
  addresses?: string[];
  address?: string | {
    id: number;
    name: string;
  };
  status?: string;
}

// Live Match
export interface LiveMatch extends Match {
  current_time?: string;
  status: 'LIVE';
}

// News
export interface NewsItem {
  id: number;
  image: string;
  title: string;
  description: string;
  date?: string;
}

export interface NewsResponse {
  news: NewsItem[];
}

// Cards (Желтые/Красные карточки)
export interface Card {
  team: {
    id: number;
    name: string;
  };
  player: {
    id: number;
    firstname: string;
    lastname: string;
    image: string | null;
    goldCardStatus?: boolean;
  };
  game_count: number;
  card_count: number;
}

// Seasons
export interface SeasonLeague {
  id: number;
  name: string;
  image?: string;
  priority?: number;
  tours?: { id: number; number: number }[];
}

export interface SeasonCup {
  id: number;
  name: string;
  image?: string;
  priority?: number;
  playoffs?: { id: number; name: string }[];
}

export interface Season {
  id: number;
  name: string;
  current: boolean;
  leagues: SeasonLeague[];
  cups: SeasonCup[];
}

export type SeasonResponse = Season[];

// Partners
export interface Partner {
  id: number;
  name: string;
  image: string;
  link?: string;
  is_general: boolean;
  sort_order: number;
  organization_id?: number;
  active?: boolean;
}

// Cup Standings
export interface CupGroupResult {
  team: { id: number; name: string; image: string };
  game_count: number;
  scored: number;
  missed: number;
  score_diff: number;
  point: number;
  wins: number;
  draw: number;
  defeat: number;
}

export interface CupGroup {
  group: {
    id: number;
    name: string;
    results: CupGroupResult[];
  };
}

// Playoff
export interface PlayoffStage {
  id: number;
  name: string;
  is_final: boolean;
  cup: { id: number; name: string };
}

export interface PlayoffMatch {
  id: number;
  type: string;
  penalty_status: boolean;
  chess_result_type: string | null;
  team_1: {
    id: number;
    name: string;
    image: string;
    goals: number;
    penalty_goals: number;
  };
  team_2: {
    id: number;
    name: string;
    image: string;
    goals: number;
    penalty_goals: number;
  };
}
