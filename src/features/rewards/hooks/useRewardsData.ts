import { useState, useEffect } from 'react';
import type { BadgeAward, HallOfFameEntry, PodiumEntry, SpecialDistinction } from '../types';

// TODO: remplacer par Firestore
const BADGES: BadgeAward[] = [
  { id: 'ba1', title: 'MVP du Match', subtitle: 'Meilleur joueur du match', description: 'Performance exceptionnelle sur 90 minutes.', iconName: 'Zap', rarity: 'epic', category: 'match', holder: 'Killian Bersot', holderTeam: 'Annecy FC', holderImg: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=120&h=120', edition: 'Summer Cup S3', value: '9.2' },
  { id: 'ba2', title: 'Meilleur du Jour', subtitle: 'Top performer de la journée', description: 'Élu meilleur joueur sur l\'ensemble des matchs de la journée.', iconName: 'Star', rarity: 'rare', category: 'day', holder: 'Yassin Mebrouk', holderTeam: 'Veyrier Utd', holderImg: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120', edition: 'J14 · Summer Cup', value: '8.7' },
  { id: 'ba3', title: 'MVP Tournoi', subtitle: 'Meilleur joueur de l\'édition', description: 'La distinction suprême.', iconName: 'Crown', rarity: 'legendary', category: 'tournament', holder: 'Killian Bersot', holderTeam: 'Annecy FC', holderImg: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=120&h=120', edition: 'Summer Cup S3', value: '8.9' },
  { id: 'ba4', title: 'Équipe Fair-Play', subtitle: 'Esprit sportif exemplaire', description: 'Zéro carton rouge, fair-play constant.', iconName: 'Heart', rarity: 'rare', category: 'fairplay', holder: 'Seynod City', holderTeam: 'Seynod City', holderImg: 'https://images.unsplash.com/photo-1551958219-acbc595d4c80?auto=format&fit=crop&w=120&h=120', edition: 'Summer Cup S3', value: '0' },
  { id: 'ba5', title: 'Meilleur Buteur', subtitle: 'Top scorer de la saison', description: 'Le plus grand nombre de buts inscrits.', iconName: 'Target', rarity: 'epic', category: 'scorer', holder: 'Killian Bersot', holderTeam: 'Annecy FC', holderImg: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=120&h=120', edition: 'Summer Cup S3', value: '17' },
  { id: 'ba6', title: 'Meilleur Passeur', subtitle: 'Roi des passes décisives', description: 'Le plus grand nombre de passes décisives.', iconName: 'TrendingUp', rarity: 'epic', category: 'special', holder: 'Yassin Mebrouk', holderTeam: 'Veyrier Utd', holderImg: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120', edition: 'Summer Cup S3', value: '14' },
];

// TODO: remplacer par Firestore
const HALL_OF_FAME: HallOfFameEntry[] = [
  { id: 'hof1', name: 'Killian Bersot', title: 'MVP Saison 3', team: 'Annecy FC', season: 'Summer Cup S3 · 2025', img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80', stat: '17', statLabel: 'buts', accentColor: '#B7FF1A' },
  { id: 'hof2', name: 'Yassin Mebrouk', title: 'Meilleur Passeur S2', team: 'Veyrier Utd', season: 'Winter Cup S2 · 2024', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80', stat: '14', statLabel: 'passes déc.', accentColor: '#C9C1A2' },
  { id: 'hof3', name: 'Théo Garnier', title: 'Champion S1', team: 'Seynod City', season: 'Spring Open S1 · 2023', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80', stat: '1er', statLabel: 'classement', accentColor: '#D94B5B' },
];

// TODO: remplacer par Firestore
const PODIUM: PodiumEntry[] = [
  { id: 'ps1', rank: 1, name: 'Killian Bersot', team: 'Annecy FC', img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=120&h=120', value: '17', valueLabel: 'buts', badge: 'MVP' },
  { id: 'ps2', rank: 2, name: 'Lucas Perrin', team: 'Poisy Stars', img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=120&h=120', value: '9', valueLabel: 'buts' },
  { id: 'ps3', rank: 3, name: 'Yassin Mebrouk', team: 'Veyrier Utd', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120', value: '11', valueLabel: 'buts' },
];

// TODO: remplacer par Firestore
const DISTINCTIONS: SpecialDistinction[] = [
  { id: 'sd1', title: 'But de l\'Édition', description: 'Le but le plus spectaculaire de toute la saison.', iconName: 'Flame', color: '#D94B5B', holder: 'Killian Bersot', holderImg: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=120&h=120', edition: 'Summer Cup S3' },
  { id: 'sd2', title: 'Équipe de la Saison', description: 'Le onze idéal élu par les coaches et capitaines.', iconName: 'Users', color: '#7BA7D9', holder: 'Annecy FC · Ligne d\'attaque', holderImg: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=120&h=120', edition: 'Summer Cup S3' },
];

interface RewardsData {
  badges: BadgeAward[];
  hallOfFame: HallOfFameEntry[];
  podium: PodiumEntry[];
  distinctions: SpecialDistinction[];
  loading: boolean;
}

export function useRewardsData(): RewardsData {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 350);
    return () => clearTimeout(timer);
  }, []);

  return { badges: BADGES, hallOfFame: HALL_OF_FAME, podium: PODIUM, distinctions: DISTINCTIONS, loading };
}
