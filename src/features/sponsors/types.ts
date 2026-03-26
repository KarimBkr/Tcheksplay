export type SponsorTier = 'platinum' | 'gold' | 'silver' | 'bronze';

export interface Sponsor {
  id: string;
  name: string;
  tier: SponsorTier;
  tagline: string;
  description: string;
  url: string;
  logoPlaceholder: string;
  featured?: boolean;
  matchSponsor?: boolean;
  editionSponsor?: boolean;
  category: string;
  since: string;
  color: string;
}

export const TIER_META: Record<SponsorTier, { label: string; color: string; emoji: string }> = {
  platinum: { label: 'Platine', color: '#F2EEDC', emoji: '💎' },
  gold: { label: 'Or', color: '#F4C542', emoji: '🥇' },
  silver: { label: 'Argent', color: '#C9C1A2', emoji: '🥈' },
  bronze: { label: 'Bronze', color: '#8A938C', emoji: '🥉' },
};
