import type { ReactNode } from 'react';

export type FeedCategory =
  | 'all'
  | 'official'
  | 'results'
  | 'schedule'
  | 'media'
  | 'rewards'
  | 'solidarity'
  | 'sponsored';

export type ReactionType = 'fire' | 'clap' | 'heart' | 'wow';

export interface FeedAuthor {
  name: string;
  role: string;
  verified: boolean;
  avatar: string;
}

export interface FeedReactions {
  fire: number;
  clap: number;
  heart: number;
  wow: number;
}

export interface FeedComment {
  id: string;
  author: string;
  avatar: string;
  text: string;
  time: string;
  likes: number;
}

export interface FeedItem {
  id: string;
  type:
    | 'hero'
    | 'result'
    | 'schedule_change'
    | 'team_photo'
    | 'tournament'
    | 'reward'
    | 'solidarity'
    | 'sponsored'
    | 'announcement'
    | 'interview';
  category: FeedCategory;
  title: string;
  excerpt?: string;
  img: string;
  timeLabel: string;
  timeGroup: 'today' | 'yesterday' | 'older';
  author: FeedAuthor;
  reactions: FeedReactions;
  comments: FeedComment[];
  totalComments: number;
  pinned?: boolean;
  breaking?: boolean;
  sponsored?: boolean;
  sponsoredBy?: string;
  tag: string;
  tagColor: string;
  tagIcon?: ReactNode;
  matchData?: { home: string; away: string; homeScore: number; awayScore: number; venue: string };
  scheduleData?: { match: string; oldDate: string; newDate: string; reason: string };
  rewardData?: { player: string; award: string; team: string; img: string };
  solidarityData?: { project: string; raised: number; goal: number; donors: number };
}

export interface TickerItem {
  id: string;
  text: string;
  urgent: boolean;
}
