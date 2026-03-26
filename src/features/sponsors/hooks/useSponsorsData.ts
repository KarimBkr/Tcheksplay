import { useState, useEffect } from 'react';
import type { Sponsor } from '../types';

// TODO: remplacer par Firestore
const SPONSORS: Sponsor[] = [
  { id: 'sp1', name: 'Nike Football', tier: 'platinum', tagline: 'Équipementier officiel Tcheksplay', description: 'Nike équipe l\'intégralité des équipes du tournoi depuis la Saison 1.', url: 'https://nike.com', logoPlaceholder: 'NIKE', featured: true, matchSponsor: true, editionSponsor: true, category: 'Équipement sportif', since: 'Saison 1', color: '#F2EEDC' },
  { id: 'sp2', name: 'Ville d\'Annecy', tier: 'platinum', tagline: 'Partenaire institutionnel', description: 'La Ville d\'Annecy soutient Tcheksplay dans sa mission de développement du sport.', url: 'https://annecy.fr', logoPlaceholder: 'ANNECY', featured: true, editionSponsor: true, category: 'Collectivité', since: 'Saison 2', color: '#7BA7D9' },
  { id: 'sp3', name: 'Red Bull', tier: 'gold', tagline: 'Partenaire énergie', description: 'Red Bull booste l\'énergie des joueurs et du public lors de chaque journée.', url: 'https://redbull.com', logoPlaceholder: 'RED BULL', category: 'Boisson', since: 'Saison 2', color: '#D94B5B' },
  { id: 'sp4', name: 'L\'Équipe', tier: 'gold', tagline: 'Partenaire médias', description: 'L\'Équipe couvre Tcheksplay dans ses pages locales et sur ses supports numériques.', url: 'https://lequipe.fr', logoPlaceholder: "L'ÉQUIPE", category: 'Média', since: 'Saison 3', color: '#F4C542' },
  { id: 'sp5', name: 'Intersport', tier: 'silver', tagline: 'Détaillant officiel', description: 'Intersport propose une réduction exclusive de 15% à tous les joueurs.', url: 'https://intersport.fr', logoPlaceholder: 'INTERSPORT', category: 'Commerce sportif', since: 'Saison 3', color: '#2E8F57' },
  { id: 'sp6', name: 'Mairie de Seynod', tier: 'silver', tagline: 'Support terrain', description: 'La mairie de Seynod met à disposition le terrain municipal.', url: 'https://seynod.fr', logoPlaceholder: 'SEYNOD', category: 'Collectivité', since: 'Saison 2', color: '#C9C1A2' },
  { id: 'sp7', name: 'Pizza King', tier: 'bronze', tagline: 'Restauration officielle', description: 'Pizza King régale joueurs et supporters lors des soirées de match.', url: '#', logoPlaceholder: 'PIZZA KING', category: 'Restauration', since: 'Saison 3', color: '#F4C542' },
  { id: 'sp8', name: 'Aqua Lac 74', tier: 'bronze', tagline: 'Hydratation des équipes', description: 'Bouteilles d\'eau et récupération sportive fournies à toutes les équipes.', url: '#', logoPlaceholder: 'AQUA 74', category: 'Hydratation', since: 'Saison 3', color: '#7BA7D9' },
];

interface SponsorsData {
  sponsors: Sponsor[];
  loading: boolean;
}

export function useSponsorsData(): SponsorsData {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 350);
    return () => clearTimeout(timer);
  }, []);

  return { sponsors: SPONSORS, loading };
}
