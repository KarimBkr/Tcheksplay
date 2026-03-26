export type MediaType = 'all' | 'video' | 'photo';

export type MediaCategory =
  | 'all'
  | 'highlights'
  | 'aftermovies'
  | 'official'
  | 'celebrations'
  | 'moments';

export type GalleryView = 'gallery' | 'matches' | 'editions';

export interface MediaItem {
  id: string;
  type: 'video' | 'photo';
  category: MediaCategory;
  title: string;
  img: string;
  duration?: string;
  views: string;
  matchId?: string;
  matchLabel?: string;
  teamId?: string;
  teamLabel?: string;
  playerId?: string;
  playerLabel?: string;
  edition: string;
  date: string;
  featured?: boolean;
}

export interface GalleryMatch {
  id: string;
  label: string;
  date: string;
  mediaCount: number;
  img: string;
  result: string;
  status: 'FT' | 'live' | 'upcoming';
}

export interface GalleryEdition {
  id: string;
  label: string;
  icon: string;
  mediaCount: number;
  year: string;
}

export interface FilterTag {
  id: string;
  label: string;
  type: 'match' | 'team' | 'player';
}
