import { useState, useEffect } from 'react';
import type { Match } from '@/shared/types';
import type {
  MatchDetailEvent,
  DetailLineupPlayer,
  SubstitutionEntry,
  LiveLineupPlayer,
  BenchPlayer,
  MatchMedia,
  Reaction,
  MVPCandidate,
} from '../types';

// TODO: remplacer par Firestore
const MOCK_EVENTS: MatchDetailEvent[] = [
  { id: 'e1', minute: 12, type: 'goal', team: 'home', playerName: 'Killian Bersot', detail: 'Pied droit · Surface' },
  { id: 'e2', minute: 24, type: 'yellow_card', team: 'away', playerName: 'Marius Fontaine', detail: 'Faute' },
  { id: 'e3', minute: 31, type: 'goal', team: 'away', playerName: 'Rayan Amiri', detail: 'Tête · Corner' },
  { id: 'e4', minute: 47, type: 'substitution', team: 'home', playerName: 'Noah Bernard', playerOut: 'Théo Duval', detail: "Mi-temps" },
  { id: 'e5', minute: 58, type: 'goal', team: 'home', playerName: 'Killian Bersot', detail: 'Pied gauche · Distance' },
  { id: 'e6', minute: 65, type: 'assist', team: 'home', playerName: 'Yassin Mebrouk', detail: 'Passe décisive' },
  { id: 'e7', minute: 72, type: 'yellow_card', team: 'home', playerName: 'Lucas Favre', detail: 'Simulation' },
];

const IMG = (id: string) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=80&h=80`;

// TODO: remplacer par Firestore
const MOCK_HOME_LINEUP: DetailLineupPlayer[] = [
  { id: 'l1', name: 'A. Touazi', number: 1, position: 'GK', positionLabel: 'Gardien', isCaptain: false, img: IMG('1472099645785-5658abf4ff4e'), rating: 7.1, nationality: '🇫🇷 France', age: 24 },
  { id: 'l2', name: 'T. Garnier', number: 5, position: 'CB', positionLabel: 'Défenseur', isCaptain: false, img: IMG('1500648767791-00dcc994a43e'), rating: 6.8, nationality: '🇫🇷 France', age: 22 },
  { id: 'l3', name: 'L. Favre', number: 3, position: 'LB', positionLabel: 'Défenseur', isCaptain: true, img: IMG('1507003211169-0a1dd7228f2d'), rating: 6.4, yellowCard: true, nationality: '🇫🇷 France', age: 26 },
  { id: 'l4', name: 'M. Dubois', number: 4, position: 'CM', positionLabel: 'Milieu', isCaptain: false, img: IMG('1506794778202-cad84cf45f1d'), rating: 7.0, nationality: '🇫🇷 France', age: 23 },
  { id: 'l5', name: 'Y. Mebrouk', number: 8, position: 'CM', positionLabel: 'Milieu', isCaptain: false, img: IMG('1507003211169-0a1dd7228f2d'), rating: 7.8, assists: 1, nationality: '🇩🇿 Algérie', age: 21 },
  { id: 'l6', name: 'N. Bernard', number: 10, position: 'CM', positionLabel: 'Milieu', isCaptain: false, img: IMG('1535713875002-d1d0cf377fde'), rating: 7.2, substitutedOn: 47, nationality: '🇫🇷 France', age: 20 },
  { id: 'l7', name: 'K. Bersot', number: 9, position: 'FW', positionLabel: 'Attaquant', isCaptain: false, img: IMG('1506794778202-cad84cf45f1d'), rating: 9.1, goals: 2, nationality: '🇫🇷 France', age: 25 },
];

// TODO: remplacer par Firestore
const MOCK_AWAY_LINEUP: DetailLineupPlayer[] = [
  { id: 'a1', name: 'R. Blanc', number: 1, position: 'GK', positionLabel: 'Gardien', isCaptain: false, img: IMG('1472099645785-5658abf4ff4e'), rating: 6.3, nationality: '🇫🇷 France', age: 28 },
  { id: 'a2', name: 'K. Saidi', number: 6, position: 'CB', positionLabel: 'Défenseur', isCaptain: true, img: IMG('1500648767791-00dcc994a43e'), rating: 6.7, nationality: '🇩🇿 Algérie', age: 27 },
  { id: 'a3', name: 'B. Rizzi', number: 4, position: 'CB', positionLabel: 'Défenseur', isCaptain: false, img: IMG('1472099645785-5658abf4ff4e'), rating: 6.2, nationality: '🇮🇹 Italie', age: 25 },
  { id: 'a4', name: 'M. Fontaine', number: 7, position: 'CM', positionLabel: 'Milieu', isCaptain: false, img: IMG('1507003211169-0a1dd7228f2d'), rating: 5.8, yellowCard: true, nationality: '🇫🇷 France', age: 24 },
  { id: 'a5', name: 'S. Leclerc', number: 3, position: 'CM', positionLabel: 'Milieu', isCaptain: false, img: IMG('1535713875002-d1d0cf377fde'), rating: 6.5, nationality: '🇫🇷 France', age: 22 },
  { id: 'a6', name: 'C. Mora', number: 8, position: 'CM', positionLabel: 'Milieu', isCaptain: false, img: IMG('1500648767791-00dcc994a43e'), rating: 6.6, substitutedOff: 62, nationality: '🇪🇸 Espagne', age: 21 },
  { id: 'a7', name: 'R. Amiri', number: 11, position: 'FW', positionLabel: 'Attaquant', isCaptain: false, img: IMG('1506794778202-cad84cf45f1d'), rating: 7.5, goals: 1, nationality: '🇩🇿 Algérie', age: 23 },
];

// TODO: remplacer par Firestore
const MOCK_HOME_BENCH: BenchPlayer[] = [
  { id: 'hb1', name: 'P. Lefebvre', number: 12, position: 'GK', isCaptain: false, img: IMG('1560250097-0b93528c311a') },
  { id: 'hb2', name: 'J. Moreau', number: 14, position: 'MF', isCaptain: false, img: IMG('1542156822-6924d1a71ace') },
  { id: 'hb3', name: 'T. Duval', number: 17, position: 'FW', isCaptain: false, img: IMG('1463453091185-61582044d556') },
];

// TODO: remplacer par Firestore
const MOCK_AWAY_BENCH: BenchPlayer[] = [
  { id: 'ab1', name: 'D. Petrov', number: 13, position: 'GK', isCaptain: false, img: IMG('1566492031773-4f4e44671857') },
  { id: 'ab2', name: 'O. Diallo', number: 15, position: 'CB', isCaptain: false, img: IMG('1548372290-8d01b6c8e78c') },
  { id: 'ab3', name: 'L. Nguyen', number: 19, position: 'FW', isCaptain: false, img: IMG('1519085360753-af0119f7cbe7') },
];

// TODO: remplacer par Firestore
const MOCK_MEDIA: MatchMedia[] = [
  { id: 'med1', title: 'But de Bersot — 58e minute', type: 'video', duration: '0:32', img: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=300&q=80', views: '1.8k' },
  { id: 'med2', title: 'Galerie officielle · 24 photos', type: 'photo', duration: '24 photos', img: 'https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?auto=format&fit=crop&w=300&q=80', views: '942' },
  { id: 'med3', title: 'Résumé du match · 2 min', type: 'video', duration: '2:04', img: 'https://images.unsplash.com/photo-1551958219-acbc595d4c80?auto=format&fit=crop&w=300&q=80', views: '3.2k' },
];

// TODO: remplacer par Firestore
const MOCK_REACTIONS: Reaction[] = [
  { id: 'r1', user: 'Thomas R.', avatar: IMG('1535713875002-d1d0cf377fde'), text: 'Quelle performance de Bersot ce soir 🔥 Doublé + grande influence sur le jeu. Le meilleur joueur de la saison sans hésiter.', likes: 24, time: 'Il y a 12 min', liked: false },
  { id: 'r2', user: 'Ines M.', avatar: IMG('1438761681033-6461ffad8d80'), text: 'Seynod a bien joué en première mi-temps mais Annecy a été trop fort. Belle ambiance aux Marquisats!', likes: 11, time: 'Il y a 18 min', liked: false },
  { id: 'r3', user: 'Karim A.', avatar: IMG('1472099645785-5658abf4ff4e'), text: 'Le but du break à la 58e était incroyable. Pied gauche depuis 25m, ça rentre dans la lucarne. Pur talent.', likes: 36, time: 'Il y a 25 min', liked: true },
];

// TODO: remplacer par Firestore
const MOCK_MVP: MVPCandidate[] = [
  { id: 'm1', name: 'Killian Bersot', team: 'Annecy FC', votes: 68, img: IMG('1506794778202-cad84cf45f1d'), stat: '2 buts' },
  { id: 'm2', name: 'Yassin Mebrouk', team: 'Annecy FC', votes: 22, img: IMG('1507003211169-0a1dd7228f2d'), stat: '1 passe déc.' },
  { id: 'm3', name: 'Rayan Amiri', team: 'Seynod City', votes: 10, img: IMG('1500648767791-00dcc994a43e'), stat: '1 but' },
];

// TODO: remplacer par Firestore
const MOCK_MATCHES: Match[] = [
  { id: 'm1', homeTeam: 'Annecy FC', awayTeam: 'Seynod City', homeScore: 2, awayScore: 1, time: 'FT', status: 'finished', category: 'Élite', venue: 'Terrain des Marquisats', date: 'Hier' },
  { id: 'm2', homeTeam: 'Veyrier Utd', awayTeam: 'Poisy Stars', time: '20:30', status: 'upcoming', category: 'Élite', venue: 'Plateau de Veyrier', date: 'Auj.' },
  { id: 'm3', homeTeam: 'Meythet FC', awayTeam: 'Cran Giants', homeScore: 0, awayScore: 3, time: 'FT', status: 'finished', category: 'Challenger', venue: 'Complexe de Meythet', date: 'Hier' },
  { id: 'm4', homeTeam: 'Annecy FC', awayTeam: 'Seynod City', homeScore: 2, awayScore: 1, time: "78'", status: 'live', category: 'Élite', venue: 'Terrain des Marquisats', date: 'Auj.' },
  { id: 'm5', homeTeam: 'Poisy Stars', awayTeam: 'Annecy FC', time: '18:00', status: 'upcoming', category: 'Élite', venue: 'Stade de Poisy', date: 'Mar.' },
  { id: 'm6', homeTeam: 'Seynod City', awayTeam: 'Veyrier Utd', time: '20:00', status: 'upcoming', category: 'Challenger', venue: 'Terrain de Seynod', date: 'Mer.' },
  { id: 'm7', homeTeam: 'Cran Giants', awayTeam: 'Meythet FC', homeScore: 2, awayScore: 0, time: 'FT', status: 'finished', category: 'Challenger', venue: 'Terrain de Cran', date: 'Dim.' },
];

export interface MatchData {
  events: MatchDetailEvent[];
  homeLineup: DetailLineupPlayer[];
  awayLineup: DetailLineupPlayer[];
  homeSubs: SubstitutionEntry[];
  awaySubs: SubstitutionEntry[];
  liveHomeLineup: LiveLineupPlayer[];
  liveAwayLineup: LiveLineupPlayer[];
  homeBench: BenchPlayer[];
  awayBench: BenchPlayer[];
  media: MatchMedia[];
  reactions: Reaction[];
  mvpCandidates: MVPCandidate[];
  allMatches: Match[];
  loading: boolean;
}

export function useMatchData(): MatchData {
  const [loading, setLoading] = useState(true);

  // TODO: remplacer par Firestore — simuler un délai réseau
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  return {
    events: MOCK_EVENTS,
    homeLineup: MOCK_HOME_LINEUP,
    awayLineup: MOCK_AWAY_LINEUP,
    homeSubs: [],
    awaySubs: [],
    liveHomeLineup: MOCK_HOME_LINEUP as LiveLineupPlayer[],
    liveAwayLineup: MOCK_AWAY_LINEUP as LiveLineupPlayer[],
    homeBench: MOCK_HOME_BENCH,
    awayBench: MOCK_AWAY_BENCH,
    media: MOCK_MEDIA,
    reactions: MOCK_REACTIONS,
    mvpCandidates: MOCK_MVP,
    allMatches: MOCK_MATCHES,
    loading,
  };
}
