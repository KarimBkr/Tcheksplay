export type UserRole = 'player' | 'admin';

export interface AppUser {
  id: string;
  name: string;
  role: UserRole;
  team: string;
  avatar: string;
  email: string;
}

export interface Match {
  id: string;
  homeTeam: string;
  awayTeam: string;
  homeScore?: number;
  awayScore?: number;
  time: string;
  status: 'live' | 'upcoming' | 'finished';
  category: string;
  venue: string;
  date: string;
}

export interface Player {
  id: string;
  name: string;
  team: string;
  position: string;
  goals: number;
  assists: number;
  matches: number;
  img: string;
  nationality: string;
}

export interface TeamStat {
  name: string;
  abbr: string;
  points: number;
  wins: number;
  draws: number;
  losses: number;
  goals: number;
  goalsAgainst: number;
  rank: number;
}

export interface Venue {
  id: string;
  name: string;
  address: string;
  city: string;
  surface: 'synthetic' | 'natural' | 'futsal';
  capacity: number;
  lighting: boolean;
  parking: boolean;
  img: string;
}

export interface Sponsor {
  id: string;
  name: string;
  tier: 'platinum' | 'gold' | 'silver' | 'bronze';
  tagline: string;
  description: string;
  url: string;
  category: string;
  since: string;
  color: string;
}

export interface FeedItem {
  id: string;
  type: string;
  category: string;
  title: string;
  excerpt?: string;
  img: string;
  timeLabel: string;
  tag: string;
  tagColor: string;
}

export interface Registration {
  id: string;
  teamName: string;
  city: string;
  players: number;
  captain: string;
  code: string;
  status: 'pending' | 'validated' | 'refused';
  submittedAt: string;
}

export type NavItem =
  | 'home'
  | 'matches'
  | 'rankings'
  | 'players'
  | 'teams'
  | 'media'
  | 'solidarity'
  | 'profile'
  | 'liveMatch'
  | 'matchDetail'
  | 'teamProfile'
  | 'rewards'
  | 'feed'
  | 'sponsors'
  | 'venues'
  | 'registration'
  | 'rules'
  | 'admin'
  | 'account';
