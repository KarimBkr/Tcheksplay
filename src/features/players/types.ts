export type ProfileTab = 'stats' | 'trophes' | 'parcours';
export type SeasonFilter = 'all' | 's1' | 's2' | 's3';

export interface SeasonStats {
  season: string;
  seasonId: SeasonFilter;
  edition: string;
  editionIcon: string;
  goals: number;
  assists: number;
  yellowCards: number;
  redCards: number;
  matchesPlayed: number;
  mvp: boolean;
  rating: number;
  teamName: string;
}

export interface Trophy {
  id: string;
  title: string;
  edition: string;
  year: string;
  type: 'champion' | 'mvp' | 'topscorer' | 'fairplay';
  color: string;
}

export interface CareerStep {
  id: string;
  club: string;
  period: string;
  level: string;
  highlight: string;
  color: string;
}

export interface PlayerProfileData {
  id: string;
  firstName: string;
  lastName: string;
  age: number;
  nationality: string;
  nationalityFlag: string;
  currentTeam: string;
  currentTeamColor: string;
  position: string;
  positionShort: string;
  number: number;
  neighborhood: string;
  img: string;
  bestLevel: string;
  bio: string;
  clubs: string[];
  seasonStats: SeasonStats[];
  trophies: Trophy[];
  career: CareerStep[];
}
