import { useState, useEffect } from 'react';

export interface PlayerListItem {
  id: string;
  name: string;
  team: string;
  position: string;
  goals: number;
  assists: number;
  img: string;
  nationality: string;
}

// TODO: remplacer par Firestore
const PLAYERS: PlayerListItem[] = [
  { id: 'p1', name: 'Killian Bersot', team: 'Annecy FC', position: 'ATT', goals: 17, assists: 8, img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=120&h=120', nationality: '🇫🇷' },
  { id: 'p2', name: 'Théo Garnier', team: 'Annecy FC', position: 'DEF', goals: 2, assists: 3, img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&h=120', nationality: '🇫🇷' },
  { id: 'p3', name: 'Maxime Aubert', team: 'Annecy FC', position: 'MIL', goals: 5, assists: 9, img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120', nationality: '🇫🇷' },
  { id: 'p4', name: 'Lucas Perrin', team: 'Veyrier Utd', position: 'ATT', goals: 8, assists: 4, img: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&h=120', nationality: '🇫🇷' },
  { id: 'p5', name: 'Rayan Mounir', team: 'Seynod City', position: 'DEF', goals: 1, assists: 2, img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=120&h=120', nationality: '🇫🇷' },
];

interface UsePlayersListResult {
  players: PlayerListItem[];
  loading: boolean;
}

export function usePlayersListData(): UsePlayersListResult {
  const [loading, setLoading] = useState(true);

  // TODO: remplacer par Firestore
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  return { players: PLAYERS, loading };
}
