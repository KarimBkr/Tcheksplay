import { useState, useEffect } from 'react';
import type { SolidProject, SeasonContrib } from '../types';

// TODO: remplacer par Firestore
const SEASON_CONTRIBS: SeasonContrib[] = [
  { id: 's3', label: 'Saison 3 · 2025', amount: 8500, color: '#B7FF1A' },
  { id: 's2', label: 'Saison 2 · 2024', amount: 3200, color: '#7BA7D9' },
  { id: 's1', label: 'Saison 1 · 2023', amount: 1800, color: '#C9C1A2' },
];

// TODO: remplacer par Firestore
const PROJECTS: SolidProject[] = [
  { id: 'sp1', title: 'Rénovation Playground Marquisats', subtitle: 'Redonner vie au terrain du quartier', location: 'Annecy Centre', raised: 8500, goal: 10000, donors: 124, status: 'active', edition: 'Summer Cup S3', img: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=400&q=80', description: 'Le playground des Marquisats est le berceau de nombreux joueurs du tournoi.', impact: '300+ jeunes bénéficiaires directs', color: '#2E8F57', category: 'Infrastructure', categoryEmoji: '🏗️', updates: [{ id: 'u1', date: 'Il y a 2j', text: 'Les travaux de peinture des lignes sont terminés.' }, { id: 'u2', date: 'Il y a 1 sem.', text: '124 donateurs réunis ! Merci à toute la communauté.' }] },
  { id: 'sp2', title: 'Équipements jeunes Seynod', subtitle: 'Offrir des maillots aux U12 du quartier', location: 'Seynod', raised: 3200, goal: 5000, donors: 67, status: 'active', edition: 'Summer Cup S3', img: 'https://images.unsplash.com/photo-1553778263-73a83bab9b0c?auto=format&fit=crop&w=400&q=80', description: 'Des maillots, shorts et chaussures pour les jeunes de Seynod.', impact: '48 enfants équipés en intégralité', color: '#7BA7D9', category: 'Équipement', categoryEmoji: '👕', updates: [{ id: 'u3', date: 'Il y a 4j', text: 'Commande de 24 kits passée chez notre partenaire.' }] },
  { id: 'sp3', title: 'Stage Football & Citoyenneté', subtitle: 'Un stage estival gratuit pour les 10–16 ans', location: 'Cran-Gevrier', raised: 1800, goal: 3000, donors: 41, status: 'completed', edition: 'Winter Cup S2', img: 'https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?auto=format&fit=crop&w=400&q=80', description: 'Une semaine alliant pratique sportive et ateliers sur les valeurs.', impact: '32 jeunes ayant participé', color: '#C9C1A2', category: 'Éducation', categoryEmoji: '📚', updates: [] },
];

interface GlobalStats {
  totalRaised: number;
  totalDonors: number;
  totalProjects: number;
}

interface SolidarityData {
  projects: SolidProject[];
  globalStats: GlobalStats;
  seasonContribs: SeasonContrib[];
  loading: boolean;
}

export function useSolidarityData(): SolidarityData {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 350);
    return () => clearTimeout(timer);
  }, []);

  const globalStats: GlobalStats = {
    totalRaised: SEASON_CONTRIBS.reduce((s, c) => s + c.amount, 0),
    totalDonors: PROJECTS.reduce((s, p) => s + p.donors, 0),
    totalProjects: PROJECTS.length,
  };

  return { projects: PROJECTS, globalStats, seasonContribs: SEASON_CONTRIBS, loading };
}
