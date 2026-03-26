import { useState, useEffect } from 'react';
import type { TeamProfileData, RosterPlayer, TeamSeasonStats, TeamTrophy, RecentMatch, MediaItem } from '../types';

// TODO: remplacer par Firestore
const ROSTER_DATA: RosterPlayer[] = [
  { id: 'r1', name: 'Killian Bersot', number: 9, position: 'Attaquant', positionShort: 'ATT', goals: 17, assists: 8, img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=120&h=120', isCaptain: true, rating: 8.4 },
  { id: 'r2', name: 'Théo Garnier', number: 5, position: 'Défenseur', positionShort: 'DEF', goals: 2, assists: 3, img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&h=120', isCaptain: false, rating: 7.6 },
  { id: 'r3', name: 'Maxime Aubert', number: 8, position: 'Milieu', positionShort: 'MIL', goals: 5, assists: 9, img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120', isCaptain: false, rating: 7.9 },
  { id: 'r4', name: 'Amine Touazi', number: 1, position: 'Gardien', positionShort: 'GK', goals: 0, assists: 1, img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=120&h=120', isCaptain: false, rating: 7.3 },
  { id: 'r5', name: 'Lucas Perrin', number: 11, position: 'Attaquant', positionShort: 'ATT', goals: 8, assists: 4, img: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&h=120', isCaptain: false, rating: 7.5 },
  { id: 'r6', name: 'Rayan Mounir', number: 4, position: 'Défenseur', positionShort: 'DEF', goals: 1, assists: 2, img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=120&h=120', isCaptain: false, rating: 7.1 },
  { id: 'r7', name: 'Jules Fontaine', number: 7, position: 'Milieu', positionShort: 'MIL', goals: 4, assists: 6, img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=120&h=120', isCaptain: false, rating: 7.4 },
];

const TEAM_SEASON_STATS: TeamSeasonStats[] = [
  { season: 'Saison 3', seasonId: 's3', edition: 'Summer Cup', editionIcon: '☀️', wins: 14, draws: 3, losses: 1, goalsFor: 42, goalsAgainst: 12, matchesPlayed: 18, points: 45, ranking: 1, mvpPlayer: 'K. Bersot', topScorer: 'K. Bersot', topScorerGoals: 17, cleanSheets: 5 },
  { season: 'Saison 2', seasonId: 's2', edition: 'Winter Cup', editionIcon: '❄️', wins: 10, draws: 2, losses: 3, goalsFor: 31, goalsAgainst: 14, matchesPlayed: 15, points: 32, ranking: 2, mvpPlayer: 'M. Aubert', topScorer: 'K. Bersot', topScorerGoals: 12, cleanSheets: 3 },
  { season: 'Saison 1', seasonId: 's1', edition: 'Spring Open', editionIcon: '🌿', wins: 7, draws: 3, losses: 2, goalsFor: 22, goalsAgainst: 11, matchesPlayed: 12, points: 24, ranking: 3, mvpPlayer: 'K. Bersot', topScorer: 'K. Bersot', topScorerGoals: 9, cleanSheets: 2 },
];

const TEAM_TROPHIES: TeamTrophy[] = [
  { id: 'tt1', title: 'Champions', edition: 'Summer Cup S3', year: '2025', type: 'champion', color: '#B7FF1A' },
  { id: 'tt2', title: 'Finalistes', edition: 'Winter Cup S2', year: '2024', type: 'finalists', color: '#C9C1A2' },
  { id: 'tt3', title: 'Meilleure Attaque', edition: 'Summer Cup S3', year: '2025', type: 'topscorer_team', color: '#35D07F' },
  { id: 'tt4', title: 'Fair-play', edition: 'Spring Open S1', year: '2023', type: 'fairplay', color: '#7BA7D9' },
];

const RECENT_MATCHES: RecentMatch[] = [
  { id: 'rm1', opponent: 'Seynod City', goalsFor: 2, goalsAgainst: 1, isHome: true, date: "Auj. 78'", edition: 'Élite', result: 'win' },
  { id: 'rm2', opponent: 'Veyrier Utd', goalsFor: 3, goalsAgainst: 3, isHome: false, date: 'Il y a 5j', edition: 'Élite', result: 'draw' },
  { id: 'rm3', opponent: 'Poisy Stars', goalsFor: 4, goalsAgainst: 0, isHome: true, date: 'Il y a 8j', edition: 'Challenger', result: 'win' },
  { id: 'rm4', opponent: 'Meythet FC', goalsFor: 1, goalsAgainst: 2, isHome: false, date: 'Il y a 12j', edition: 'Élite', result: 'loss' },
  { id: 'rm5', opponent: 'Cran Giants', goalsFor: 5, goalsAgainst: 1, isHome: true, date: 'Il y a 15j', edition: 'Élite', result: 'win' },
];

const TEAM_MEDIA: MediaItem[] = [
  { id: 'tm1', title: "Finale S3 — Les buts d'Annecy FC", img: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=300&q=80', duration: '1:42', views: '3.8k', type: 'video' },
  { id: 'tm2', title: 'Célébration titre Summer Cup', img: 'https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?auto=format&fit=crop&w=300&q=80', duration: '0:58', views: '2.1k', type: 'video' },
  { id: 'tm3', title: 'Galerie — Saison 3 complète', img: 'https://images.unsplash.com/photo-1551958219-acbc595d4c80?auto=format&fit=crop&w=300&q=80', duration: '47 photos', views: '5.2k', type: 'photo' },
  { id: 'tm4', title: 'Meilleurs gestes collectifs', img: 'https://images.unsplash.com/photo-1517927033932-b3d18e61fb3a?auto=format&fit=crop&w=300&q=80', duration: '2:14', views: '1.9k', type: 'video' },
];

// TODO: remplacer par Firestore
const TEAM_DATA: TeamProfileData = {
  id: 't1',
  name: 'Annecy FC',
  abbr: 'AFC',
  city: 'Annecy',
  neighborhood: 'Marquisats',
  origin: 'Né du playground des Marquisats',
  founded: '2022',
  category: 'Élite',
  formation: '2-3-1',
  primaryColor: '#2E8F57',
  secondaryColor: '#B7FF1A',
  accentColor: '#35D07F',
  coverImg: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800&q=80',
  coachName: 'Malik Rezzouk',
  coachImg: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=120&h=120',
  bio: "Collectif fondé sur les terrains des Marquisats, Annecy FC incarne la fierté locale et l'intensité du football de quartier. Trois saisons d'excellence, un titre de champion, une identité indestructible.",
  bestLevel: 'Champions Élite · Summer Cup S3',
  rivalTeam: 'Veyrier Utd',
  rosterSize: 16,
  roster: ROSTER_DATA,
  seasonStats: TEAM_SEASON_STATS,
  trophies: TEAM_TROPHIES,
  recentMatches: RECENT_MATCHES,
  media: TEAM_MEDIA,
};

interface UseTeamDataResult {
  team: TeamProfileData;
  loading: boolean;
}

export function useTeamData(_teamId: string): UseTeamDataResult {
  const [loading, setLoading] = useState(true);

  // TODO: remplacer par Firestore — simuler un délai réseau
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 350);
    return () => clearTimeout(timer);
  }, [_teamId]);

  return { team: TEAM_DATA, loading };
}
