export interface TeamRank {
  id: string;
  rank: number;
  name: string;
  abbr: string;
  color: string;
  points: number;
  played: number;
  wins: number;
  draws: number;
  losses: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDiff: number;
  form: ('W' | 'D' | 'L')[];
  badge: 'champion' | 'mvp' | 'fairplay' | null;
}

export interface PlayerRank {
  id: string;
  rank: number;
  name: string;
  firstName: string;
  team: string;
  teamColor: string;
  img: string;
  nationality: string;
  goals?: number;
  assists?: number;
  matches: number;
  rating: number;
  badge: 'top' | 'mvp' | null;
  goalsPerMatch?: number;
  assistsPerMatch?: number;
  cleanSheets?: number;
  saves?: number;
  saveRate?: number;
}

export type RankingTab = 'teams' | 'scorers' | 'assisters' | 'keepers';

export type SeasonId = 's1' | 's2' | 's3';

export interface RankingTabDef {
  id: RankingTab;
  label: string;
}

export interface SeasonOption {
  id: SeasonId;
  label: string;
}

export function getRatingColor(r: number): string {
  if (r >= 8.5) return '#B7FF1A';
  if (r >= 7.5) return '#35D07F';
  if (r >= 6.5) return '#F4C542';
  return '#FF8C42';
}

export function getRatingBg(r: number): string {
  if (r >= 8.5) return 'rgba(183,255,26,0.14)';
  if (r >= 7.5) return 'rgba(53,208,127,0.14)';
  if (r >= 6.5) return 'rgba(244,197,66,0.14)';
  return 'rgba(255,140,66,0.14)';
}
