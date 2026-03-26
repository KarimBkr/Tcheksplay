import { useState, useEffect } from 'react';
import type { Match, Player, TeamStat } from '@/shared/types';

// TODO: remplacer par Firestore
const MOCK_MATCHES: Match[] = [
  {
    id: 'm1',
    homeTeam: 'Annecy FC',
    awayTeam: 'Seynod City',
    homeScore: 2,
    awayScore: 1,
    time: "78'",
    status: 'live',
    category: 'Élite',
    venue: 'Terrain des Marquisats',
    date: "Aujourd'hui",
  },
  {
    id: 'm2',
    homeTeam: 'Veyrier Utd',
    awayTeam: 'Poisy Stars',
    time: '18:30',
    status: 'upcoming',
    category: 'Challenger',
    venue: 'Stade de Veyrier',
    date: 'Demain',
  },
  {
    id: 'm3',
    homeTeam: 'Cran Giants',
    awayTeam: 'Meythet FC',
    homeScore: 0,
    awayScore: 0,
    time: '16:00',
    status: 'upcoming',
    category: 'Élite',
    venue: 'Complexe de Cran',
    date: 'Sam. 28 juin',
  },
  {
    id: 'm4',
    homeTeam: 'Annecy FC',
    awayTeam: 'Cran Giants',
    homeScore: 5,
    awayScore: 1,
    time: 'Terminé',
    status: 'finished',
    category: 'Élite',
    venue: 'Terrain des Marquisats',
    date: 'Il y a 3j',
  },
  {
    id: 'm5',
    homeTeam: 'Poisy Stars',
    awayTeam: 'Annecy FC',
    homeScore: 0,
    awayScore: 4,
    time: 'Terminé',
    status: 'finished',
    category: 'Challenger',
    venue: 'Terrain de Poisy',
    date: 'Il y a 8j',
  },
];

// TODO: remplacer par Firestore
const MOCK_STANDINGS: TeamStat[] = [
  { name: 'Annecy FC', abbr: 'AFC', points: 45, wins: 14, draws: 3, losses: 1, goals: 42, goalsAgainst: 12, rank: 1 },
  { name: 'Veyrier Utd', abbr: 'VEY', points: 38, wins: 12, draws: 2, losses: 4, goals: 35, goalsAgainst: 18, rank: 2 },
  { name: 'Seynod City', abbr: 'SEY', points: 34, wins: 10, draws: 4, losses: 4, goals: 28, goalsAgainst: 15, rank: 3 },
];

// TODO: remplacer par Firestore
const MOCK_TOP_SCORER: Player = {
  id: 'p1',
  name: 'Killian Bersot',
  team: 'Annecy FC',
  position: 'Attaquant',
  goals: 17,
  assists: 8,
  matches: 18,
  img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=120&h=120',
  nationality: '🇫🇷',
};

interface HomeData {
  matches: Match[];
  standings: TeamStat[];
  topScorer: Player;
  liveMatch: Match | null;
  nextMatch: Match | null;
  loading: boolean;
}

export function useHomeData(): HomeData {
  const [loading, setLoading] = useState(true);

  // TODO: remplacer par Firestore — simuler un délai réseau
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(timer);
  }, []);

  const liveMatch = MOCK_MATCHES.find((m) => m.status === 'live') ?? null;
  const nextMatch = MOCK_MATCHES.find((m) => m.status === 'upcoming') ?? null;

  return {
    matches: MOCK_MATCHES,
    standings: MOCK_STANDINGS,
    topScorer: MOCK_TOP_SCORER,
    liveMatch,
    nextMatch,
    loading,
  };
}
