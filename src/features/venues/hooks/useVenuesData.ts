import { useState, useEffect } from 'react';
import type { VenueInfo } from '../types';

// TODO: remplacer par Firestore
const VENUES: VenueInfo[] = [
  { id: 'v1', name: 'Terrain des Marquisats', address: '2 Allée des Marquisats', city: 'Annecy Centre', mapsUrl: 'https://maps.google.com', surface: 'synthetic', capacity: 200, lighting: true, parking: true, parkingDetails: 'Parking gratuit — 80 places.', changing: true, changingDetails: '2 vestiaires avec douches chaudes.', transport: [{ type: 'bus', label: 'Bus Ligne 1', detail: 'Arrêt Marquisats — 3 min' }, { type: 'walk', label: 'Depuis la gare', detail: '18 min à pied' }], notes: 'Terrain principal du tournoi. Vue sur le lac.', img: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800&q=80', availability: 'occupied', nextMatch: 'Annecy FC vs Seynod City · Auj. 19:00', matchCount: 48, featured: true },
  { id: 'v2', name: 'Plateau de Veyrier', address: 'Rue du Plateau Sportif', city: 'Veyrier-du-Lac', mapsUrl: 'https://maps.google.com', surface: 'synthetic', capacity: 120, lighting: true, parking: true, parkingDetails: 'Parking municipal — 40 places.', changing: true, changingDetails: '2 vestiaires rénovés en 2024.', transport: [{ type: 'bus', label: 'Bus Ligne 7', detail: 'Arrêt Veyrier-Centre — 5 min' }], notes: 'Terrain secondaire. Ambiance village.', img: 'https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?auto=format&fit=crop&w=800&q=80', availability: 'available', nextMatch: 'Veyrier Utd vs Poisy Stars · Auj. 20:30', matchCount: 22 },
  { id: 'v3', name: 'Complexe de Meythet', address: '15 Chemin du Stade', city: 'Meythet', mapsUrl: 'https://maps.google.com', surface: 'natural', capacity: 80, lighting: false, parking: true, parkingDetails: 'Parking sur rue.', changing: true, changingDetails: '1 vestiaire commun, douches froides.', transport: [{ type: 'tram', label: 'Tram Ligne 2', detail: 'Arrêt Meythet-Parc — 8 min' }], notes: 'Terrain naturel, uniquement par temps sec.', img: 'https://images.unsplash.com/photo-1551958219-acbc595d4c80?auto=format&fit=crop&w=800&q=80', availability: 'available', matchCount: 14 },
  { id: 'v4', name: 'Salle Futsal Seynod', address: 'Avenue du Sport', city: 'Seynod', mapsUrl: 'https://maps.google.com', surface: 'futsal', capacity: 150, lighting: true, parking: false, parkingDetails: 'Pas de parking dédié.', changing: true, changingDetails: '4 vestiaires avec douches chaudes.', transport: [{ type: 'bus', label: 'Bus Ligne 3', detail: 'Arrêt Seynod-Sport — 2 min' }, { type: 'walk', label: 'Depuis Cran-Gevrier', detail: '12 min à pied' }], notes: 'Salle couverte climatisée.', img: 'https://images.unsplash.com/photo-1517927033932-b3d18e61fb3a?auto=format&fit=crop&w=800&q=80', availability: 'maintenance', matchCount: 8 },
];

interface VenuesData {
  venues: VenueInfo[];
  loading: boolean;
}

export function useVenuesData(): VenuesData {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 350);
    return () => clearTimeout(timer);
  }, []);

  return { venues: VENUES, loading };
}
