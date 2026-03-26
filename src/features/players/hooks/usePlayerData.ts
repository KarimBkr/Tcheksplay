import { useState, useEffect } from 'react';
import type { PlayerProfileData, SeasonStats, Trophy, CareerStep } from '../types';

// TODO: remplacer par Firestore
const SEASON_STATS_DATA: SeasonStats[] = [
  { season: 'Saison 3', seasonId: 's3', edition: 'Summer Cup', editionIcon: '☀️', goals: 17, assists: 8, yellowCards: 2, redCards: 0, matchesPlayed: 18, mvp: true, rating: 8.4, teamName: 'Annecy FC' },
  { season: 'Saison 2', seasonId: 's2', edition: 'Winter Cup', editionIcon: '❄️', goals: 12, assists: 5, yellowCards: 3, redCards: 1, matchesPlayed: 15, mvp: false, rating: 7.6, teamName: 'Annecy FC' },
  { season: 'Saison 1', seasonId: 's1', edition: 'Spring Open', editionIcon: '🌿', goals: 9, assists: 4, yellowCards: 1, redCards: 0, matchesPlayed: 12, mvp: false, rating: 7.1, teamName: 'Seynod City' },
];

// TODO: remplacer par Firestore
const TROPHIES_DATA: Trophy[] = [
  { id: 't1', title: 'Champion', edition: 'Summer Cup', year: '2025', type: 'champion', color: '#B7FF1A' },
  { id: 't2', title: 'MVP du Tournoi', edition: 'Summer Cup S3', year: '2025', type: 'mvp', color: '#C9C1A2' },
  { id: 't3', title: 'Meilleur Buteur', edition: 'Summer Cup S3', year: '2025', type: 'topscorer', color: '#35D07F' },
  { id: 't4', title: 'Champion', edition: 'Winter Cup', year: '2024', type: 'champion', color: '#7BA7D9' },
];

// TODO: remplacer par Firestore
const CAREER_DATA: CareerStep[] = [
  { id: 'c1', club: 'Annecy FC', period: '2023 – présent', level: 'Élite · Tcheksplay', highlight: 'Capitaine & meilleur buteur S3', color: '#2E8F57' },
  { id: 'c2', club: 'Seynod City', period: '2022 – 2023', level: 'Élite · Tcheksplay', highlight: "Fondateur de l'équipe", color: '#C9C1A2' },
  { id: 'c3', club: 'AS Marquisats U18', period: '2018 – 2022', level: 'Formation · District', highlight: 'Révélation catégorie U18', color: '#7BA7D9' },
];

// TODO: remplacer par Firestore
const PLAYER_DATA: PlayerProfileData = {
  id: 'p1',
  firstName: 'Killian',
  lastName: 'Bersot',
  age: 25,
  nationality: 'Français',
  nationalityFlag: '🇫🇷',
  currentTeam: 'Annecy FC',
  currentTeamColor: '#2E8F57',
  position: 'Attaquant',
  positionShort: 'ATT',
  number: 9,
  neighborhood: 'Marquisats · Annecy',
  img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80',
  bestLevel: 'Élite Tcheksplay · S3 Champion',
  bio: "Produit pur du playground des Marquisats. Killian incarne l'âme du Tcheksplay — technique, impact, mentalité. Meilleur buteur trois saisons consécutives.",
  clubs: ['Annecy FC', 'Seynod City', 'AS Marquisats U18'],
  seasonStats: SEASON_STATS_DATA,
  trophies: TROPHIES_DATA,
  career: CAREER_DATA,
};

interface UsePlayerDataResult {
  player: PlayerProfileData;
  loading: boolean;
}

export function usePlayerData(_playerId: string): UsePlayerDataResult {
  const [loading, setLoading] = useState(true);

  // TODO: remplacer par Firestore — simuler un délai réseau
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 350);
    return () => clearTimeout(timer);
  }, [_playerId]);

  return { player: PLAYER_DATA, loading };
}
