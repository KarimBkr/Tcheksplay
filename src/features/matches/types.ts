export type EventType = 'goal' | 'yellow_card' | 'red_card' | 'substitution' | 'assist';

export interface MatchDetailEvent {
  id: string;
  minute: number;
  type: EventType;
  team: 'home' | 'away';
  playerName: string;
  playerOut?: string;
  detail?: string;
}

export type TimelineEvent = MatchDetailEvent;

export interface LineupPlayer {
  id: string;
  name: string;
  number: number;
  position: string;
  positionLabel: string;
  isCaptain: boolean;
  img: string;
  rating?: number;
  goals?: number;
  assists?: number;
  yellowCard?: boolean;
  redCard?: boolean;
  substitutedOff?: number;
  substitutedOn?: number;
  nationality?: string;
  age?: number;
}

export type DetailLineupPlayer = LineupPlayer;
export type LiveLineupPlayer = LineupPlayer;

export interface BenchPlayer {
  id: string;
  name: string;
  number: number;
  position: string;
  isCaptain: boolean;
  img: string;
}

export interface SubstitutionEntry {
  id: string;
  playerIn: string;
  playerInNumber: number;
  playerInImg: string;
  playerOut: string;
  minute: number;
  rating?: number;
}

export interface MatchMedia {
  id: string;
  title: string;
  type: 'video' | 'photo';
  duration: string;
  img: string;
  views: string;
}

export interface Reaction {
  id: string;
  user: string;
  avatar: string;
  text: string;
  likes: number;
  time: string;
  liked: boolean;
}

export interface MVPCandidate {
  id: string;
  name: string;
  team: string;
  votes: number;
  img: string;
  stat: string;
}

export type MatchDetailTab = 'recap' | 'lineup' | 'media' | 'reactions';
export type LineupViewMode = 'performance' | 'poste' | 'nationalite' | 'age';
export type LiveTab = 'live' | 'lineup';
export type MatchStatus = 'all' | 'live' | 'upcoming' | 'finished';
export type MatchCategory = 'all' | 'Élite' | 'Challenger';
