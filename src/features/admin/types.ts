export type AdminSection =
  | 'dashboard'
  | 'editions'
  | 'matches'
  | 'teams'
  | 'registrations'
  | 'scores'
  | 'news'
  | 'media'
  | 'solidarity'
  | 'sponsors'
  | 'groups'
  | 'bracket';

export type MatchFilterType = 'all' | 'awaiting_score' | 'live' | 'scheduled';
export type MatchDateFilter = 'today' | 'week' | 'all';
export type RegFilterStatus = 'pending' | 'validated' | 'refused';
export type RegSortType = 'newest' | 'oldest' | 'players_asc' | 'players_desc';
export type ScoreResultStatus = 'validated' | 'awaiting' | 'corrected' | 'cancelled';
export type ScoreTabFilter = 'all' | 'validated' | 'awaiting' | 'corrected';
export type StatsTabView = 'results' | 'teams' | 'players';
export type PhaseFilter = 'all' | 'groupes' | 'quarts' | 'demies' | 'finale';
export type DistributionMode = 'random' | 'seeded' | 'no_derbies';
export type GroupsState = 'idle' | 'generated' | 'confirmed';

export interface AdminStat {
  id: string;
  label: string;
  value: string;
  delta?: string;
  positive?: boolean;
  color: string;
  section: AdminSection;
}

export interface SeasonBlocker {
  id: string;
  label: string;
  count: number;
  severity: 'high' | 'medium' | 'low';
  section: AdminSection;
}

export interface PendingRegistration {
  id: string;
  teamName: string;
  city: string;
  players: number;
  submittedAt: string;
  submittedTimestamp: number;
  captain: string;
  code: string;
  status: 'pending' | 'validated' | 'refused';
  logoColor: string;
}

export interface AdminMatch {
  id: string;
  home: string;
  away: string;
  date: string;
  dateGroup: 'today' | 'yesterday' | 'older';
  venue: string;
  status: 'scheduled' | 'live' | 'finished' | 'awaiting_score' | 'score_pending_validation';
  homeScore?: number;
  awayScore?: number;
  time?: string;
  issue?: 'score_missing' | 'report' | 'incident';
}

export interface AdminNotif {
  id: string;
  type: 'registration' | 'score' | 'alert' | 'info';
  category: 'action' | 'info';
  text: string;
  time: string;
  read: boolean;
}

export interface ScoreRecord {
  id: string;
  journee: number;
  phase: PhaseFilter;
  home: string;
  away: string;
  homeScore: number;
  awayScore: number;
  date: string;
  status: ScoreResultStatus;
  classementUpdated: boolean;
  scorers: string[];
}

export interface TeamStatRow {
  id: string;
  rank: number;
  team: string;
  color: string;
  played: number;
  wins: number;
  draws: number;
  losses: number;
  gf: number;
  ga: number;
  gd: number;
  points: number;
}

export interface PlayerStatRow {
  id: string;
  rank: number;
  name: string;
  team: string;
  teamColor: string;
  goals: number;
  assists: number;
  cleanSheets: number;
}

export interface PoolTeam {
  id: string;
  name: string;
  city: string;
  color: string;
  seed?: number;
}

export interface Pool {
  id: string;
  label: string;
  teams: PoolTeam[];
}
