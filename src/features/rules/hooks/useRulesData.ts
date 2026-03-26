import { useState, useEffect } from 'react';
import type { RuleSection } from '../types';

// TODO: remplacer par Firestore
const SECTIONS: RuleSection[] = [
  { id: 'format', title: 'Format de Compétition', emoji: '🏆', color: '#B7FF1A', summary: 'Phase de groupes + élimination directe', rules: [
    { id: 'f1', label: "Nombre d'équipes", value: '8 équipes par poule', highlight: true },
    { id: 'f2', label: 'Phase de groupes', value: '2 poules de 4 équipes — matchs aller-retour' },
    { id: 'f3', label: 'Qualification', value: 'Top 2 de chaque poule → Demi-finales' },
    { id: 'f4', label: 'Phase finale', value: 'Quarts · Demis · Finale' },
    { id: 'f5', label: 'Match pour la 3ème place', value: 'Oui — obligatoire', note: 'Les deux perdants des demi-finales s\'affrontent' },
  ] },
  { id: 'points', title: 'Système de Points', emoji: '📊', color: '#7BA7D9', summary: 'Victoire 3 pts · Nul 1 pt · Défaite 0 pt', rules: [
    { id: 'p1', label: 'Victoire', value: '3 points', highlight: true },
    { id: 'p2', label: 'Match nul', value: '1 point' },
    { id: 'p3', label: 'Défaite', value: '0 point' },
    { id: 'p4', label: 'Forfait', value: '-1 point + match perdu 3-0' },
  ] },
  { id: 'tiebreak', title: 'Départage & Égalités', emoji: '⚖️', color: '#C9C1A2', summary: 'Confrontation directe → diff. buts → buts → fair-play', rules: [
    { id: 't1', label: '1er critère', value: 'Confrontation directe', highlight: true },
    { id: 't2', label: '2ème critère', value: 'Différence de buts générale' },
    { id: 't3', label: '3ème critère', value: 'Nombre de buts marqués' },
    { id: 't4', label: '4ème critère', value: 'Fair-play (moins de cartons)' },
    { id: 't5', label: 'Cas extrême', value: 'Tirage au sort en présence des capitaines' },
  ] },
  { id: 'match', title: 'Règles du Match', emoji: '⚽', color: '#2E8F57', summary: '2×25 min · 7v7 · Changements illimités', rules: [
    { id: 'm1', label: 'Durée de jeu', value: '2 × 25 minutes', highlight: true },
    { id: 'm2', label: 'Mi-temps', value: '10 minutes — obligatoire' },
    { id: 'm3', label: 'Changements', value: 'Illimités — avec accord de l\'arbitre' },
    { id: 'm4', label: 'Prolongations', value: '2 × 10 min si match nul en phase finale' },
    { id: 'm5', label: 'Tirs au but', value: '5 tireurs · mort subite si encore à égalité', note: 'Uniquement en phase éliminatoire' },
    { id: 'm6', label: 'Joueurs sur le terrain', value: '7 joueurs (dont gardien)', note: '5 joueurs minimum pour démarrer' },
  ] },
  { id: 'fairplay', title: 'Fair-Play & Valeurs', emoji: '🤝', color: '#35D07F', summary: 'Respect · Intégrité · Fraternité', rules: [
    { id: 'fp1', label: 'Esprit Fair-Play', value: 'Mandatory — zéro tolérance', highlight: true },
    { id: 'fp2', label: 'Respect des arbitres', value: 'Décision finale · pas de contestation' },
    { id: 'fp3', label: 'Prix Fair-Play', value: 'Remis à l\'équipe la plus fair-play' },
    { id: 'fp4', label: 'Tenue vestimentaire', value: 'Maillot officiel obligatoire avec numéro' },
    { id: 'fp5', label: 'Ponctualité', value: 'Forfait si 15 min de retard sans excuse' },
  ] },
  { id: 'sanctions', title: 'Sanctions & Cartons', emoji: '🟨', color: '#F4C542', summary: 'Jaune · Rouge · Suspensions · Appel 24h', rules: [
    { id: 's1', label: 'Carton jaune', value: '3 jaunes = 1 match de suspension', highlight: true },
    { id: 's2', label: 'Carton rouge direct', value: '1 match de suspension minimum' },
    { id: 's3', label: 'Carton rouge grave', value: '3 matchs de suspension + convocation' },
    { id: 's4', label: 'Violence physique', value: 'Exclusion définitive du tournoi', note: 'Décision de la commission disciplinaire' },
    { id: 's5', label: 'Appel possible', value: 'Sous 24h — par email officiel' },
  ] },
];

interface RulesData {
  sections: RuleSection[];
  loading: boolean;
}

export function useRulesData(): RulesData {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 350);
    return () => clearTimeout(timer);
  }, []);

  return { sections: SECTIONS, loading };
}
