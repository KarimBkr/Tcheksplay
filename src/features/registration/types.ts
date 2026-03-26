export type Step = 'preregistration' | 'team' | 'players' | 'validation' | 'confirmation';

export interface StepMeta {
  id: Step;
  label: string;
  short: string;
}

export interface TeamForm {
  name: string;
  city: string;
  neighborhood: string;
  sector: string;
  origin: string;
}

export interface PlayerForm {
  id: string;
  firstName: string;
  lastName: string;
  age: string;
  pastClubs: string;
  bestLevel: string;
  jerseySize: string;
  shortsSize: string;
}

export const STEPS: StepMeta[] = [
  { id: 'preregistration', label: 'Pré-inscription', short: '1' },
  { id: 'team', label: 'Équipe', short: '2' },
  { id: 'players', label: 'Joueurs', short: '3' },
  { id: 'validation', label: 'Validation', short: '4' },
  { id: 'confirmation', label: 'Confirmation', short: '5' },
];

export const JERSEY_SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
export const SHORTS_SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
export const BEST_LEVELS = ['Loisir', 'Départemental', 'Régional', 'National', 'Professionnel'];
