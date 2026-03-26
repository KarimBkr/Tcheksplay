export type ProjectStatus = 'active' | 'completed' | 'upcoming';

export interface ProjectUpdate {
  id: string;
  date: string;
  text: string;
  img?: string;
}

export interface SolidProject {
  id: string;
  title: string;
  subtitle: string;
  location: string;
  raised: number;
  goal: number;
  donors: number;
  status: ProjectStatus;
  edition: string;
  img: string;
  description: string;
  impact: string;
  color: string;
  category: string;
  categoryEmoji: string;
  updates: ProjectUpdate[];
}

export interface SeasonContrib {
  id: string;
  label: string;
  amount: number;
  color: string;
}
