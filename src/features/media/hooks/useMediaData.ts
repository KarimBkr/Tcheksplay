import { useState, useEffect } from 'react';
import type { MediaItem, GalleryMatch, GalleryEdition } from '../types';

// TODO: remplacer par Firestore
const EDITIONS: GalleryEdition[] = [
  { id: 'summer', label: 'Summer Cup S3', icon: '☀️', mediaCount: 142, year: '2025' },
  { id: 'winter', label: 'Winter Cup S2', icon: '❄️', mediaCount: 98, year: '2024' },
  { id: 'spring', label: 'Spring Open S1', icon: '🌿', mediaCount: 64, year: '2023' },
];

// TODO: remplacer par Firestore
const MATCHES: GalleryMatch[] = [
  { id: 'm1', label: 'Annecy FC vs Seynod City', date: 'Auj.', mediaCount: 28, img: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=400&q=80', result: '2–1', status: 'FT' },
  { id: 'm2', label: 'Demi-finale · Annecy vs Veyrier', date: 'Sam.', mediaCount: 41, img: 'https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?auto=format&fit=crop&w=400&q=80', result: '3–2', status: 'FT' },
  { id: 'm3', label: 'Finale Summer Cup S2', date: '14 Jan.', mediaCount: 67, img: 'https://images.unsplash.com/photo-1551958219-acbc595d4c80?auto=format&fit=crop&w=400&q=80', result: '1–0', status: 'FT' },
];

// TODO: remplacer par Firestore
const ITEMS: MediaItem[] = [
  { id: 'med1', type: 'video', category: 'highlights', title: "But d'anthologie de Killian — 78'", img: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=600&q=80', duration: '0:42', views: '2.4k', matchId: 'm1', matchLabel: 'Annecy vs Seynod', playerLabel: 'K. Bersot', teamLabel: 'Annecy FC', edition: 'Summer Cup S3', date: 'Auj.', featured: true },
  { id: 'med2', type: 'video', category: 'aftermovies', title: 'Aftermovie Demi-finale — Tension & Beauté', img: 'https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?auto=format&fit=crop&w=600&q=80', duration: '4:17', views: '5.8k', matchId: 'm2', matchLabel: 'Annecy vs Veyrier', teamLabel: 'Annecy FC', edition: 'Summer Cup S3', date: 'Sam.', featured: true },
  { id: 'med3', type: 'photo', category: 'official', title: 'Galerie officielle — Finale Summer Cup S2', img: 'https://images.unsplash.com/photo-1551958219-acbc595d4c80?auto=format&fit=crop&w=600&q=80', duration: '36 photos', views: '3.1k', matchId: 'm3', matchLabel: 'Finale S2', edition: 'Winter Cup S2', date: '14 Jan.' },
  { id: 'med4', type: 'video', category: 'highlights', title: 'Top 10 buts de la saison S3', img: 'https://images.unsplash.com/photo-1517927033932-b3d18e61fb3a?auto=format&fit=crop&w=600&q=80', duration: '2:30', views: '7.2k', edition: 'Summer Cup S3', date: 'Hier', featured: true },
  { id: 'med5', type: 'photo', category: 'celebrations', title: 'La joie de Seynod City après le nul', img: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=600&q=80', duration: '12 photos', views: '890', teamLabel: 'Seynod City', edition: 'Summer Cup S3', date: 'Hier' },
  { id: 'med6', type: 'video', category: 'moments', title: 'Arrêt décisif de Touazi — Quart de finale', img: 'https://images.unsplash.com/photo-1553778263-73a83bab9b0c?auto=format&fit=crop&w=600&q=80', duration: '0:19', views: '1.6k', playerLabel: 'A. Touazi', teamLabel: 'Cran Giants', edition: 'Summer Cup S3', date: '12 Jan.' },
];

interface MediaData {
  items: MediaItem[];
  matches: GalleryMatch[];
  editions: GalleryEdition[];
  loading: boolean;
}

export function useMediaData(): MediaData {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 350);
    return () => clearTimeout(timer);
  }, []);

  return { items: ITEMS, matches: MATCHES, editions: EDITIONS, loading };
}
