import { useState, useEffect } from 'react';
import type { TeamRank, PlayerRank } from '../types';

// TODO: remplacer par Firestore

const TEAM_RANKINGS: TeamRank[] = [
  { id: 't1', rank: 1, name: 'Annecy FC', abbr: 'AFC', color: '#2E8F57', points: 45, played: 18, wins: 14, draws: 3, losses: 1, goalsFor: 42, goalsAgainst: 14, goalDiff: 28, form: ['W','W','W','D','W'], badge: 'champion' },
  { id: 't2', rank: 2, name: 'Veyrier Utd', abbr: 'VEY', color: '#7BA7D9', points: 38, played: 18, wins: 12, draws: 2, losses: 4, goalsFor: 35, goalsAgainst: 22, goalDiff: 13, form: ['W','L','W','W','D'], badge: null },
  { id: 't3', rank: 3, name: 'Seynod City', abbr: 'SEY', color: '#C9C1A2', points: 32, played: 18, wins: 10, draws: 2, losses: 6, goalsFor: 28, goalsAgainst: 24, goalDiff: 4, form: ['W','W','L','D','W'], badge: null },
  { id: 't4', rank: 4, name: 'Poisy Stars', abbr: 'POI', color: '#F4C542', points: 28, played: 18, wins: 8, draws: 4, losses: 6, goalsFor: 24, goalsAgainst: 25, goalDiff: -1, form: ['D','W','L','W','D'], badge: 'fairplay' },
  { id: 't5', rank: 5, name: 'Cran Giants', abbr: 'CRN', color: '#8E2B36', points: 24, played: 18, wins: 7, draws: 3, losses: 8, goalsFor: 21, goalsAgainst: 30, goalDiff: -9, form: ['L','W','L','D','W'], badge: null },
  { id: 't6', rank: 6, name: 'Meythet FC', abbr: 'MEY', color: '#B7FF1A', points: 19, played: 18, wins: 5, draws: 4, losses: 9, goalsFor: 18, goalsAgainst: 33, goalDiff: -15, form: ['L','D','L','W','L'], badge: null },
];

const SCORER_RANKINGS: PlayerRank[] = [
  { id: 'p1', rank: 1, name: 'Bersot', firstName: 'Killian', team: 'Annecy FC', teamColor: '#2E8F57', img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=120&h=120', nationality: '🇫🇷', goals: 17, matches: 18, rating: 8.4, badge: 'top', goalsPerMatch: 0.94 },
  { id: 'p2', rank: 2, name: 'Perrin', firstName: 'Lucas', team: 'Poisy Stars', teamColor: '#F4C542', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&h=120', nationality: '🇫🇷', goals: 13, matches: 16, rating: 7.2, badge: null, goalsPerMatch: 0.81 },
  { id: 'p5', rank: 3, name: 'Touazi', firstName: 'Rayan', team: 'Cran Giants', teamColor: '#8E2B36', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120', nationality: '🇲🇦', goals: 11, matches: 17, rating: 7.0, badge: null, goalsPerMatch: 0.65 },
  { id: 'p6', rank: 4, name: 'Mebrouk', firstName: 'Yassin', team: 'Veyrier Utd', teamColor: '#7BA7D9', img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=120&h=120', nationality: '🇩🇿', goals: 9, matches: 18, rating: 7.8, badge: 'mvp', goalsPerMatch: 0.50 },
  { id: 'p7', rank: 5, name: 'Garnier', firstName: 'Théo', team: 'Seynod City', teamColor: '#C9C1A2', img: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&h=120', nationality: '🇫🇷', goals: 7, matches: 17, rating: 6.9, badge: null, goalsPerMatch: 0.41 },
];

const ASSISTER_RANKINGS: PlayerRank[] = [
  { id: 'a1', rank: 1, name: 'Mebrouk', firstName: 'Yassin', team: 'Veyrier Utd', teamColor: '#7BA7D9', img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=120&h=120', nationality: '🇩🇿', assists: 14, matches: 18, rating: 7.8, badge: 'top', assistsPerMatch: 0.78 },
  { id: 'a2', rank: 2, name: 'Bersot', firstName: 'Killian', team: 'Annecy FC', teamColor: '#2E8F57', img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=120&h=120', nationality: '🇫🇷', assists: 8, matches: 18, rating: 8.4, badge: 'mvp', assistsPerMatch: 0.44 },
  { id: 'a3', rank: 3, name: 'Garnier', firstName: 'Théo', team: 'Seynod City', teamColor: '#C9C1A2', img: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&h=120', nationality: '🇫🇷', assists: 6, matches: 17, rating: 6.9, badge: null, assistsPerMatch: 0.35 },
  { id: 'a4', rank: 4, name: 'Perrin', firstName: 'Lucas', team: 'Poisy Stars', teamColor: '#F4C542', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&h=120', nationality: '🇫🇷', assists: 5, matches: 16, rating: 7.2, badge: null, assistsPerMatch: 0.31 },
  { id: 'a5', rank: 5, name: 'Touazi', firstName: 'Rayan', team: 'Cran Giants', teamColor: '#8E2B36', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120', nationality: '🇲🇦', assists: 3, matches: 17, rating: 7.0, badge: null, assistsPerMatch: 0.18 },
];

const KEEPER_RANKINGS: PlayerRank[] = [
  { id: 'k1', rank: 1, name: 'Dubois', firstName: 'Maxime', team: 'Annecy FC', teamColor: '#2E8F57', img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=120&h=120', nationality: '🇫🇷', cleanSheets: 9, saves: 58, saveRate: 82, matches: 18, rating: 8.1, badge: 'top' },
  { id: 'k2', rank: 2, name: 'Renard', firstName: 'Hugo', team: 'Veyrier Utd', teamColor: '#7BA7D9', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&h=120', nationality: '🇫🇷', cleanSheets: 6, saves: 52, saveRate: 76, matches: 18, rating: 7.3, badge: null },
  { id: 'k3', rank: 3, name: 'Faye', firstName: 'Omar', team: 'Seynod City', teamColor: '#C9C1A2', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120', nationality: '🇸🇳', cleanSheets: 5, saves: 63, saveRate: 72, matches: 17, rating: 7.0, badge: null },
  { id: 'k4', rank: 4, name: 'Costa', firstName: 'Diogo', team: 'Poisy Stars', teamColor: '#F4C542', img: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&h=120', nationality: '🇵🇹', cleanSheets: 4, saves: 48, saveRate: 68, matches: 16, rating: 6.7, badge: null },
  { id: 'k5', rank: 5, name: 'Millet', firstName: 'Adrien', team: 'Cran Giants', teamColor: '#8E2B36', img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=120&h=120', nationality: '🇫🇷', cleanSheets: 3, saves: 71, saveRate: 65, matches: 17, rating: 6.5, badge: null },
];

export function useRankingsData() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 350);
    return () => clearTimeout(timer);
  }, []);

  return {
    teamRankings: TEAM_RANKINGS,
    scorerRankings: SCORER_RANKINGS,
    assisterRankings: ASSISTER_RANKINGS,
    keeperRankings: KEEPER_RANKINGS,
    loading,
  };
}
