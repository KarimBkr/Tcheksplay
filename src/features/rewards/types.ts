export type RewardTab = 'podium' | 'badges' | 'halloffame';

export type BadgeRarity = 'legendary' | 'epic' | 'rare' | 'common';

export type BadgeCategory = 'match' | 'day' | 'tournament' | 'fairplay' | 'scorer' | 'special';

export interface BadgeAward {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  iconName: string;
  rarity: BadgeRarity;
  category: BadgeCategory;
  holder: string;
  holderTeam: string;
  holderImg: string;
  edition: string;
  value?: string | number;
  locked?: boolean;
}

export interface HallOfFameEntry {
  id: string;
  name: string;
  title: string;
  team: string;
  season: string;
  img: string;
  stat: string;
  statLabel: string;
  accentColor: string;
}

export interface PodiumEntry {
  id: string;
  rank: 1 | 2 | 3;
  name: string;
  team: string;
  img: string;
  value: string;
  valueLabel: string;
  badge?: string;
}

export interface SpecialDistinction {
  id: string;
  title: string;
  description: string;
  iconName: string;
  color: string;
  holder: string;
  holderImg: string;
  edition: string;
}
