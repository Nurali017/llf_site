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

// Match Protocol (детали матча)
export interface MatchEvent {
  id: number;
  time: string;
  type: 'goal' | 'yellow' | 'red' | 'own_goal' | 'penalty';
  game_time: 'FIRST' | 'SECOND' | 'PENALTY';
  success?: boolean; // для пенальти
  number?: number; // номер пенальти
  match_player: {
    id: number;
    firstname: string;
    lastname: string;
    player_number: number;
    team_id: number;
    goldCardStatus: boolean;
  };
}

export interface MatchPlayer {
  player_number: number;
  position: 'FORWARD' | 'DEFENDER' | 'MIDFIELDER' | 'GOALKEEPER';
  id: number;
  firstname: string;
  lastname: string;
  goldCardStatus: boolean;
}

export interface MatchProtocolTeam {
  id: number;
  name: string;
  image: string;
  uniform_color: string | null;
  goals: number;
  penalty_goals: number;
  players: MatchPlayer[];
  team_players: { player: { id: number; firstname: string; lastname: string; image: string | null } }[];
}

export interface MatchProtocol {
  id: number;
  status: 'FINISHED' | 'NOT_STARTED' | 'LIVE';
  type: string;
  time: string;
  video: string;
  league_tour?: { league: { id: number; name: string } };
  cup_tour?: { cup: { id: number; name: string } };
  cup_playoff?: { id: number; name: string };
  tournament_name: string;
  tournament_id: number;
  isCup: boolean;
  team_1: MatchProtocolTeam;
  team_2: MatchProtocolTeam;
  address: { id: number; name: string } | null;
  referees: { id: number; name: string }[];
  first_time_events: MatchEvent[];
  second_time_events: MatchEvent[];
  penalty_events: MatchEvent[];
  penalty_status: boolean;
  disqualified_players: { id: number; firstname: string; lastname: string }[];
}

// Player (Игрок - полные данные)
export interface PlayerTeamMembership {
  id: number;
  team_id: number;
  player_id: number;
  position: 'FORWARD' | 'DEFENDER' | 'MIDFIELDER' | 'GOALKEEPER' | null;
  active: boolean;
  joined: string;
  left: string | null;
  captain: boolean;
  is_banned: boolean;
}

export interface Player {
  id: number;
  user_id: number;
  firstname: string;
  lastname: string;
  patronymic: string;
  birthday: string | null;
  growth: number | null;
  weight: number | null;
  foot_size: number | null;
  favorite_club: string | null;
  image: { url: string }[] | null;
  instagram: string | null;
  position: string | null;
  goldCardStatus: boolean;
  total_matches: number;
  wins: number;
  draws: number;
  losses: number;
  teams: PlayerTeamMembership[];
}

export interface PlayerTournamentStats {
  name: string;
  type: 'LEAGUE' | 'CUP';
  teamPosition: number;
  totalTeams: number;
  playerGoals: number;
  playerMatches: number;
}

export interface PlayerStats {
  playerId: number;
  playerName: string;
  position: string | null;
  age: number;
  totalMatches: number;
  totalGoals: number;
  yellowCards: number;
  redCards: number;
  cleanSheets: number;
  goalsConceded: number;
  wins: number;
  draws: number;
  losses: number;
  teamWinRate: number;
  tournaments: PlayerTournamentStats[];
}

// Team (Команда - полные данные)
export interface TeamPlayer {
  player: {
    id: number;
    firstname: string;
    lastname: string;
    image: string | null;
    position: string | null;
  };
}

export interface Team {
  id: number;
  name: string;
  image: string | null;
  instagram: string | null;
  uniform_color: string | null;
  players: TeamPlayer[];
}

// Team page data from /api/page/teams/{id}
export interface TeamPagePlayer {
  player: {
    id: number;
    firstname: string;
    lastname: string;
    image: string | null;
    birthday: string | null;
    goldCardStatus: boolean;
    position: 'FORWARD' | 'DEFENDER' | 'MIDFIELDER' | 'GOALKEEPER' | null;
  };
}

export interface TeamPageMatchResult {
  id: number;
  time: string;
  type: string;
  chess_result_type: string | null;
  team_1: {
    id: number;
    name: string;
    goals: number;
    image: string;
  };
  team_2: {
    id: number;
    name: string;
    goals: number;
    image: string;
  };
}

export interface TeamPageCalendarMatch {
  id: number;
  type: string;
  time: string;
  team_1: { id: number; name: string; image: string };
  team_2: { id: number; name: string; image: string };
  address: { id: number; name: string } | null;
}

export interface TeamPageStats {
  match_count: number;
  wins: number;
  draws: number;
  defeats: number;
  tournaments: number;
  goals: number;
  missed_goals: number;
  red_count: number;
  yellow_count: number;
  no_misses_count: number;
  avg_team_player_age: number;
}

export interface TeamPageData {
  id: number;
  name: string;
  image: string | null;
  instagram: string | null;
  uniform_color: string | null;
  players: TeamPagePlayer[];
  results: TeamPageMatchResult[];
  calendar: TeamPageCalendarMatch[];
  stats: TeamPageStats;
}

export interface TeamStats {
  teamId: number;
  teamName: string;
  totalMatches: number;
  wins: number;
  draws: number;
  losses: number;
  goalsScored: number;
  goalsConceded: number;
  yellowCards: number;
  redCards: number;
  cleanSheets: number;
  tournaments: number;
  recentMatches: TeamRecentMatch[];
}

export interface TeamRecentMatch {
  id: number;
  date: string;
  opponentId: number;
  opponentName: string;
  opponentImage: string | null;
  homeScore: number;
  awayScore: number;
  isHome: boolean;
  result: 'W' | 'L' | 'D';
}
