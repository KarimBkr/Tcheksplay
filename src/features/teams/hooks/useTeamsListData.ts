import { useState, useEffect } from 'react';

export interface TeamListItem {
  id: string;
  name: string;
  abbr: string;
  city: string;
  category: string;
  primaryColor: string;
  wins: number;
  points: number;
  coverImg: string;
}

// TODO: remplacer par Firestore
const TEAMS: TeamListItem[] = [
  { id: 't1', name: 'Annecy FC', abbr: 'AFC', city: 'Annecy', category: 'Élite', primaryColor: '#2E8F57', wins: 14, points: 45, coverImg: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=300&q=80' },
  { id: 't2', name: 'Veyrier Utd', abbr: 'VEY', city: 'Veyrier', category: 'Élite', primaryColor: '#7BA7D9', wins: 12, points: 38, coverImg: 'https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?auto=format&fit=crop&w=300&q=80' },
  { id: 't3', name: 'Seynod City', abbr: 'SEY', city: 'Seynod', category: 'Élite', primaryColor: '#C9C1A2', wins: 10, points: 34, coverImg: 'https://images.unsplash.com/photo-1551958219-acbc595d4c80?auto=format&fit=crop&w=300&q=80' },
  { id: 't4', name: 'Poisy Stars', abbr: 'POI', city: 'Poisy', category: 'Challenger', primaryColor: '#F4C542', wins: 8, points: 28, coverImg: 'https://images.unsplash.com/photo-1517927033932-b3d18e61fb3a?auto=format&fit=crop&w=300&q=80' },
  { id: 't5', name: 'Meythet FC', abbr: 'MEY', city: 'Meythet', category: 'Élite', primaryColor: '#D94B5B', wins: 7, points: 25, coverImg: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=300&q=80' },
  { id: 't6', name: 'Cran Giants', abbr: 'CRA', city: 'Cran-Gevrier', category: 'Challenger', primaryColor: '#FF8C42', wins: 6, points: 22, coverImg: 'https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?auto=format&fit=crop&w=300&q=80' },
];

interface UseTeamsListResult {
  teams: TeamListItem[];
  loading: boolean;
}

export function useTeamsListData(): UseTeamsListResult {
  const [loading, setLoading] = useState(true);

  // TODO: remplacer par Firestore
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  return { teams: TEAMS, loading };
}
