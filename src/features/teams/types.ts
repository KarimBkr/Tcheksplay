export type TeamTab = 'stats' | 'roster' | 'matchs' | 'media';
export type SeasonFilter = 'all' | 's1' | 's2' | 's3';

export interface TeamSeasonStats {
  season: string;
  seasonId: SeasonFilter;
  edition: string;
  editionIcon: string;
  wins: number;
  draws: number;
  losses: number;
  goalsFor: number;
  goalsAgainst: number;
  matchesPlayed: number;
  points: number;
  ranking: number;
  mvpPlayer: string;
  topScorer: string;
  topScorerGoals: number;
  cleanSheets: number;
}

export interface TeamTrophy {
  id: string;
  title: string;
  edition: string;
  year: string;
  type: 'champion' | 'finalists' | 'fairplay' | 'topscorer_team';
  color: string;
}

export interface RosterPlayer {
  id: string;
  name: string;
  number: number;
  position: string;
  positionShort: string;
  goals: number;
  assists: number;
  img: string;
  isCaptain: boolean;
  rating: number;
}

export interface RecentMatch {
  id: string;
  opponent: string;
  goalsFor: number;
  goalsAgainst: number;
  isHome: boolean;
  date: string;
  edition: string;
  result: 'win' | 'draw' | 'loss';
}

export interface MediaItem {
  id: string;
  title: string;
  img: string;
  duration: string;
  views: string;
  type: 'video' | 'photo';
}

export interface TeamProfileData {
  id: string;
  name: string;
  abbr: string;
  city: string;
  neighborhood: string;
  origin: string;
  founded: string;
  category: string;
  formation: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  coverImg: string;
  coachName: string;
  coachImg: string;
  bio: string;
  bestLevel: string;
  rivalTeam: string;
  rosterSize: number;
  roster: RosterPlayer[];
  seasonStats: TeamSeasonStats[];
  trophies: TeamTrophy[];
  recentMatches: RecentMatch[];
  media: MediaItem[];
}
