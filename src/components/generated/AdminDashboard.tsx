import React, { useState } from 'react';
import { LayoutDashboard, Calendar, Shield, Users, Trophy, Image, Heart, Star, Settings, ChevronRight, Plus, Edit3, CheckCircle, XCircle, Clock, TrendingUp, AlertTriangle, Newspaper, MapPin, BarChart3, Zap, Upload, Bell, LogOut, Search, Filter, Eye, AlertCircle, Radio, Send, ChevronDown, Megaphone, Lock, UserCircle2, ArrowRight, SortDesc, Info, Layers, CheckSquare, Square, X, ChevronUp, Wifi, RefreshCw, Database, Target, Award, Activity, ExternalLink, RotateCcw, Hash, CheckCheck, Shuffle, ChevronLeft, MoveHorizontal, ArrowUpDown, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// ─── Types ────────────────────────────────────────────────────────────────────

type AdminSection = 'dashboard' | 'editions' | 'matches' | 'teams' | 'registrations' | 'scores' | 'news' | 'media' | 'solidarity' | 'sponsors' | 'groups' | 'bracket';
type MatchFilterType = 'all' | 'awaiting_score' | 'live' | 'scheduled';
type RegFilterStatus = 'pending' | 'validated' | 'refused';
type RegSortType = 'newest' | 'oldest' | 'players_asc' | 'players_desc';
type MatchDateFilter = 'today' | 'week' | 'all';
type ScoreResultStatus = 'validated' | 'awaiting' | 'corrected' | 'cancelled';
type ScoreTabFilter = 'all' | 'validated' | 'awaiting' | 'corrected';
type StatsTabView = 'results' | 'teams' | 'players';
type PhaseFilter = 'all' | 'groupes' | 'quarts' | 'demies' | 'finale';
type DistributionMode = 'random' | 'seeded' | 'no_derbies';
type GroupsState = 'idle' | 'generated' | 'confirmed';
interface AdminStat {
  id: string;
  label: string;
  value: string;
  delta?: string;
  positive?: boolean;
  color: string;
  section: AdminSection;
}
interface SeasonBlocker {
  id: string;
  label: string;
  count: number;
  severity: 'high' | 'medium' | 'low';
  section: AdminSection;
}
interface PendingRegistration {
  id: string;
  teamName: string;
  city: string;
  players: number;
  submittedAt: string;
  submittedTimestamp: number;
  captain: string;
  code: string;
  status: 'pending' | 'validated' | 'refused';
  logoColor: string;
}
interface AdminMatch {
  id: string;
  home: string;
  away: string;
  date: string;
  dateGroup: 'today' | 'yesterday' | 'older';
  venue: string;
  status: 'scheduled' | 'live' | 'finished' | 'awaiting_score' | 'score_pending_validation';
  homeScore?: number;
  awayScore?: number;
  time?: string;
  issue?: 'score_missing' | 'report' | 'incident';
}
interface AdminNotif {
  id: string;
  type: 'registration' | 'score' | 'alert' | 'info';
  category: 'action' | 'info';
  text: string;
  time: string;
  read: boolean;
}
interface ScoreRecord {
  id: string;
  journee: number;
  phase: PhaseFilter;
  home: string;
  away: string;
  homeScore: number;
  awayScore: number;
  date: string;
  status: ScoreResultStatus;
  classementUpdated: boolean;
  scorers: string[];
}
interface TeamStatRow {
  id: string;
  rank: number;
  team: string;
  color: string;
  played: number;
  wins: number;
  draws: number;
  losses: number;
  gf: number;
  ga: number;
  gd: number;
  points: number;
}
interface PlayerStatRow {
  id: string;
  rank: number;
  name: string;
  team: string;
  teamColor: string;
  goals: number;
  assists: number;
  cleanSheets: number;
}
interface PoolTeam {
  id: string;
  name: string;
  city: string;
  color: string;
  seed?: number;
}
interface Pool {
  id: string;
  label: string;
  teams: PoolTeam[];
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const ADMIN_STATS: AdminStat[] = [{
  id: 'matches',
  label: 'Matchs J.',
  value: '142',
  delta: '+8 ce mois',
  positive: true,
  color: '#B7FF1A',
  section: 'matches'
}, {
  id: 'teams',
  label: 'Équipes',
  value: '16',
  delta: '+2 inscrites',
  positive: true,
  color: '#7BA7D9',
  section: 'teams'
}, {
  id: 'pending',
  label: 'En attente',
  value: '3',
  delta: 'inscriptions',
  positive: false,
  color: '#F4C542',
  section: 'registrations'
}, {
  id: 'news',
  label: 'Articles',
  value: '24',
  delta: '+3 ce mois',
  positive: true,
  color: '#C9C1A2',
  section: 'news'
}];
const SEASON_BLOCKERS: SeasonBlocker[] = [{
  id: 'b1',
  label: 'scores manquants',
  count: 4,
  severity: 'high',
  section: 'scores'
}, {
  id: 'b2',
  label: 'équipes incomplètes',
  count: 2,
  severity: 'medium',
  section: 'teams'
}, {
  id: 'b3',
  label: 'inscriptions en attente',
  count: 3,
  severity: 'medium',
  section: 'registrations'
}];
const PENDING_REGISTRATIONS: PendingRegistration[] = [{
  id: 'r1',
  teamName: 'Pringy Warriors',
  city: 'Pringy',
  players: 13,
  submittedAt: 'Il y a 1h',
  submittedTimestamp: 1,
  captain: 'Omar Diallo',
  code: 'TCK-9XF2KP',
  status: 'pending',
  logoColor: '#D94B5B'
}, {
  id: 'r2',
  teamName: 'Argonay FC',
  city: 'Argonay',
  players: 11,
  submittedAt: 'Il y a 3h',
  submittedTimestamp: 3,
  captain: 'Mehdi Saad',
  code: 'TCK-7AH4BQ',
  status: 'pending',
  logoColor: '#7BA7D9'
}, {
  id: 'r3',
  teamName: 'Fillière United',
  city: 'Fillière',
  players: 14,
  submittedAt: 'Hier',
  submittedTimestamp: 24,
  captain: 'Rémi Bourgeat',
  code: 'TCK-2GJ8XN',
  status: 'pending',
  logoColor: '#F4C542'
}];
const ADMIN_MATCHES: AdminMatch[] = [{
  id: 'am1',
  home: 'Annecy FC',
  away: 'Seynod City',
  date: 'Auj. 19:00',
  dateGroup: 'today',
  venue: 'Marquisats',
  status: 'live',
  homeScore: 2,
  awayScore: 1,
  time: '67'
}, {
  id: 'am2',
  home: 'Veyrier Utd',
  away: 'Poisy Stars',
  date: 'Auj. 20:30',
  dateGroup: 'today',
  venue: 'Plateau Veyrier',
  status: 'scheduled'
}, {
  id: 'am5',
  home: 'Argonay FC',
  away: 'Pringy FC',
  date: 'Auj. 21:00',
  dateGroup: 'today',
  venue: 'Complexe Argonay',
  status: 'scheduled'
}, {
  id: 'am3',
  home: 'Meythet FC',
  away: 'Cran Giants',
  date: 'Hier',
  dateGroup: 'yesterday',
  venue: 'Complexe Meythet',
  status: 'awaiting_score',
  issue: 'score_missing'
}, {
  id: 'am6',
  home: 'Seynod City',
  away: 'Fillière Utd',
  date: 'Hier',
  dateGroup: 'yesterday',
  venue: 'Stade Seynod',
  status: 'score_pending_validation',
  homeScore: 1,
  awayScore: 2
}, {
  id: 'am4',
  home: 'Cran Giants',
  away: 'Argonay FC',
  date: 'Avant-hier',
  dateGroup: 'older',
  venue: 'Stade Cran',
  status: 'awaiting_score',
  issue: 'score_missing'
}];
const ADMIN_NOTIFS: AdminNotif[] = [{
  id: 'n1',
  type: 'registration',
  category: 'action',
  text: 'Nouvelle inscription : Pringy Warriors (13 joueurs)',
  time: 'Il y a 1h',
  read: false
}, {
  id: 'n2',
  type: 'alert',
  category: 'action',
  text: 'Score manquant : Meythet FC vs Cran Giants',
  time: 'Il y a 2h',
  read: false
}, {
  id: 'n3',
  type: 'score',
  category: 'info',
  text: 'Score validé : Annecy FC 2–1 Seynod City',
  time: 'Il y a 3h',
  read: true
}, {
  id: 'n4',
  type: 'info',
  category: 'info',
  text: 'Publication : "Annecy FC inarrêtable" — 142 vues',
  time: 'Il y a 5h',
  read: true
}];
const SCORE_RECORDS: ScoreRecord[] = [{
  id: 'sr1',
  journee: 18,
  phase: 'groupes',
  home: 'Annecy FC',
  away: 'Seynod City',
  homeScore: 2,
  awayScore: 1,
  date: 'Auj. 19:00',
  status: 'validated',
  classementUpdated: true,
  scorers: ['Bersot 23\'', 'Mebrouk 67\'']
}, {
  id: 'sr2',
  journee: 18,
  phase: 'groupes',
  home: 'Seynod City',
  away: 'Fillière Utd',
  homeScore: 1,
  awayScore: 2,
  date: 'Hier',
  status: 'awaiting',
  classementUpdated: false,
  scorers: []
}, {
  id: 'sr3',
  journee: 18,
  phase: 'groupes',
  home: 'Meythet FC',
  away: 'Cran Giants',
  homeScore: 0,
  awayScore: 0,
  date: 'Hier',
  status: 'awaiting',
  classementUpdated: false,
  scorers: []
}, {
  id: 'sr4',
  journee: 17,
  phase: 'groupes',
  home: 'Veyrier Utd',
  away: 'Annecy FC',
  homeScore: 0,
  awayScore: 3,
  date: 'Il y a 4j',
  status: 'corrected',
  classementUpdated: true,
  scorers: ['Garnier 12\'', 'Garnier 45\'', 'Bersot 78\'']
}, {
  id: 'sr5',
  journee: 17,
  phase: 'groupes',
  home: 'Cran Giants',
  away: 'Argonay FC',
  homeScore: 0,
  awayScore: 0,
  date: 'Il y a 4j',
  status: 'awaiting',
  classementUpdated: false,
  scorers: []
}, {
  id: 'sr6',
  journee: 17,
  phase: 'groupes',
  home: 'Pringy FC',
  away: 'Poisy Stars',
  homeScore: 1,
  awayScore: 1,
  date: 'Il y a 5j',
  status: 'validated',
  classementUpdated: true,
  scorers: ['Ouedraogo 55\'']
}, {
  id: 'sr7',
  journee: 16,
  phase: 'groupes',
  home: 'Fillière Utd',
  away: 'Meythet FC',
  homeScore: 2,
  awayScore: 0,
  date: 'Il y a 8j',
  status: 'validated',
  classementUpdated: true,
  scorers: ['Bourgeat 11\'', 'Bourgeat 34\'']
}, {
  id: 'sr8',
  journee: 16,
  phase: 'groupes',
  home: 'Poisy Stars',
  away: 'Veyrier Utd',
  homeScore: 3,
  awayScore: 2,
  date: 'Il y a 8j',
  status: 'validated',
  classementUpdated: true,
  scorers: ['Lacroix 5\'', 'Lacroix 22\'', 'Samba 88\'']
}];
const TEAM_STATS: TeamStatRow[] = [{
  id: 'ts1',
  rank: 1,
  team: 'Annecy FC',
  color: '#B7FF1A',
  played: 17,
  wins: 13,
  draws: 2,
  losses: 2,
  gf: 41,
  ga: 14,
  gd: 27,
  points: 41
}, {
  id: 'ts2',
  rank: 2,
  team: 'Fillière Utd',
  color: '#F4C542',
  played: 17,
  wins: 11,
  draws: 3,
  losses: 3,
  gf: 33,
  ga: 20,
  gd: 13,
  points: 36
}, {
  id: 'ts3',
  rank: 3,
  team: 'Poisy Stars',
  color: '#7BA7D9',
  played: 17,
  wins: 9,
  draws: 4,
  losses: 4,
  gf: 28,
  ga: 22,
  gd: 6,
  points: 31
}, {
  id: 'ts4',
  rank: 4,
  team: 'Veyrier Utd',
  color: '#C9C1A2',
  played: 17,
  wins: 8,
  draws: 3,
  losses: 6,
  gf: 25,
  ga: 24,
  gd: 1,
  points: 27
}, {
  id: 'ts5',
  rank: 5,
  team: 'Seynod City',
  color: '#D94B5B',
  played: 17,
  wins: 7,
  draws: 4,
  losses: 6,
  gf: 26,
  ga: 27,
  gd: -1,
  points: 25
}, {
  id: 'ts6',
  rank: 6,
  team: 'Meythet FC',
  color: '#8A938C',
  played: 17,
  wins: 4,
  draws: 3,
  losses: 10,
  gf: 18,
  ga: 32,
  gd: -14,
  points: 15
}];
const PLAYER_STATS: PlayerStatRow[] = [{
  id: 'ps1',
  rank: 1,
  name: 'L. Garnier',
  team: 'Annecy FC',
  teamColor: '#B7FF1A',
  goals: 18,
  assists: 7,
  cleanSheets: 0
}, {
  id: 'ps2',
  rank: 2,
  name: 'Y. Bourgeat',
  team: 'Fillière Utd',
  teamColor: '#F4C542',
  goals: 14,
  assists: 4,
  cleanSheets: 0
}, {
  id: 'ps3',
  rank: 3,
  name: 'K. Lacroix',
  team: 'Poisy Stars',
  teamColor: '#7BA7D9',
  goals: 12,
  assists: 9,
  cleanSheets: 0
}, {
  id: 'ps4',
  rank: 4,
  name: 'T. Mebrouk',
  team: 'Annecy FC',
  teamColor: '#B7FF1A',
  goals: 10,
  assists: 5,
  cleanSheets: 0
}, {
  id: 'ps5',
  rank: 5,
  name: 'D. Ouedraogo',
  team: 'Pringy FC',
  teamColor: '#D94B5B',
  goals: 9,
  assists: 3,
  cleanSheets: 0
}, {
  id: 'ps6',
  rank: 6,
  name: 'R. Samba',
  team: 'Poisy Stars',
  teamColor: '#7BA7D9',
  goals: 8,
  assists: 6,
  cleanSheets: 0
}];
const NAV_SECTIONS: Array<{
  id: AdminSection;
  label: string;
  icon: React.ReactNode;
  group: string;
}> = [{
  id: 'dashboard',
  label: 'Tableau de bord',
  icon: <LayoutDashboard size={16} />,
  group: 'Général'
}, {
  id: 'editions',
  label: 'Éditions & Saisons',
  icon: <Trophy size={16} />,
  group: 'Général'
}, {
  id: 'teams',
  label: 'Équipes',
  icon: <Shield size={16} />,
  group: 'Compétition'
}, {
  id: 'registrations',
  label: 'Inscriptions',
  icon: <Users size={16} />,
  group: 'Compétition'
}, {
  id: 'matches',
  label: 'Matchs',
  icon: <Calendar size={16} />,
  group: 'Compétition'
}, {
  id: 'scores',
  label: 'Scores & Stats',
  icon: <BarChart3 size={16} />,
  group: 'Compétition'
}, {
  id: 'groups',
  label: 'Poules',
  icon: <Layers size={16} />,
  group: 'Compétition'
}, {
  id: 'bracket',
  label: 'Phase Finale',
  icon: <TrendingUp size={16} />,
  group: 'Compétition'
}, {
  id: 'news',
  label: 'Actualités',
  icon: <Newspaper size={16} />,
  group: 'Contenu'
}, {
  id: 'media',
  label: 'Médias',
  icon: <Image size={16} />,
  group: 'Contenu'
}, {
  id: 'solidarity',
  label: 'Projets Solidaires',
  icon: <Heart size={16} />,
  group: 'Contenu'
}, {
  id: 'sponsors',
  label: 'Sponsors',
  icon: <Star size={16} />,
  group: 'Contenu'
}];
const NOTIF_META: Record<AdminNotif['type'], {
  icon: React.ReactNode;
  actionColor: string;
  infoColor: string;
}> = {
  registration: {
    icon: <Users size={12} />,
    actionColor: '#7BA7D9',
    infoColor: '#5a7d99'
  },
  score: {
    icon: <CheckCircle size={12} />,
    actionColor: '#B7FF1A',
    infoColor: '#7aaa10'
  },
  alert: {
    icon: <AlertTriangle size={12} />,
    actionColor: '#F4C542',
    infoColor: '#a88a2c'
  },
  info: {
    icon: <Bell size={12} />,
    actionColor: '#C9C1A2',
    infoColor: '#8A938C'
  }
};
const MATCH_STATUS_META: Record<AdminMatch['status'], {
  label: string;
  color: string;
  bg: string;
}> = {
  scheduled: {
    label: 'Programmé',
    color: '#7BA7D9',
    bg: 'rgba(123,167,217,0.1)'
  },
  live: {
    label: 'En Direct',
    color: '#D94B5B',
    bg: 'rgba(217,75,91,0.12)'
  },
  finished: {
    label: 'Terminé',
    color: '#8A938C',
    bg: 'rgba(255,255,255,0.05)'
  },
  awaiting_score: {
    label: 'Score manquant',
    color: '#F4C542',
    bg: 'rgba(244,197,66,0.1)'
  },
  score_pending_validation: {
    label: 'À valider',
    color: '#C9C1A2',
    bg: 'rgba(201,193,162,0.1)'
  }
};
const BLOCKER_COLORS: Record<SeasonBlocker['severity'], {
  dot: string;
  bg: string;
  border: string;
  text: string;
}> = {
  high: {
    dot: '#D94B5B',
    bg: 'rgba(217,75,91,0.08)',
    border: 'rgba(217,75,91,0.18)',
    text: '#D94B5B'
  },
  medium: {
    dot: '#F4C542',
    bg: 'rgba(244,197,66,0.06)',
    border: 'rgba(244,197,66,0.15)',
    text: '#F4C542'
  },
  low: {
    dot: '#7BA7D9',
    bg: 'rgba(123,167,217,0.06)',
    border: 'rgba(123,167,217,0.15)',
    text: '#7BA7D9'
  }
};
const MATCH_FILTER_TABS: Array<{
  id: MatchFilterType;
  label: string;
}> = [{
  id: 'all',
  label: 'Tous'
}, {
  id: 'live',
  label: 'En direct'
}, {
  id: 'awaiting_score',
  label: 'Scores'
}, {
  id: 'scheduled',
  label: 'Programmés'
}];
const REG_RULES = [{
  label: 'Équipes max.',
  value: '20',
  icon: <Shield size={9} />
}, {
  label: 'Min. joueurs',
  value: '10',
  icon: <Users size={9} />
}, {
  label: 'Zones éligibles',
  value: 'Haute-Savoie',
  icon: <MapPin size={9} />
}];
const REG_SORT_OPTIONS: Array<{
  id: RegSortType;
  label: string;
}> = [{
  id: 'newest',
  label: 'Plus récentes'
}, {
  id: 'oldest',
  label: 'Plus anciennes'
}, {
  id: 'players_desc',
  label: 'Plus de joueurs'
}, {
  id: 'players_asc',
  label: 'Moins de joueurs'
}];
const SCORE_STATUS_META: Record<ScoreResultStatus, {
  label: string;
  color: string;
  bg: string;
  border: string;
}> = {
  validated: {
    label: 'Validé',
    color: '#B7FF1A',
    bg: 'rgba(183,255,26,0.08)',
    border: 'rgba(183,255,26,0.15)'
  },
  awaiting: {
    label: 'En attente',
    color: '#F4C542',
    bg: 'rgba(244,197,66,0.08)',
    border: 'rgba(244,197,66,0.18)'
  },
  corrected: {
    label: 'Corrigé',
    color: '#7BA7D9',
    bg: 'rgba(123,167,217,0.08)',
    border: 'rgba(123,167,217,0.15)'
  },
  cancelled: {
    label: 'Annulé',
    color: '#D94B5B',
    bg: 'rgba(217,75,91,0.08)',
    border: 'rgba(217,75,91,0.15)'
  }
};
const SCORE_TAB_FILTERS: Array<{
  id: ScoreTabFilter;
  label: string;
}> = [{
  id: 'all',
  label: 'Tous'
}, {
  id: 'awaiting',
  label: 'En attente'
}, {
  id: 'validated',
  label: 'Validés'
}, {
  id: 'corrected',
  label: 'Corrigés'
}];
const PHASE_FILTERS: Array<{
  id: PhaseFilter;
  label: string;
}> = [{
  id: 'all',
  label: 'Toutes phases'
}, {
  id: 'groupes',
  label: 'Groupes'
}, {
  id: 'quarts',
  label: 'Quarts'
}, {
  id: 'demies',
  label: 'Demies'
}, {
  id: 'finale',
  label: 'Finale'
}];
const STATS_TABS: Array<{
  id: StatsTabView;
  label: string;
  icon: React.ReactNode;
}> = [{
  id: 'results',
  label: 'Résultats',
  icon: <Database size={12} />
}, {
  id: 'teams',
  label: 'Équipes',
  icon: <Shield size={12} />
}, {
  id: 'players',
  label: 'Joueurs',
  icon: <Users size={12} />
}];
const ALL_VALIDATED_TEAMS: PoolTeam[] = [{
  id: 'vt1',
  name: 'Annecy FC',
  city: 'Annecy',
  color: '#B7FF1A',
  seed: 1
}, {
  id: 'vt2',
  name: 'Fillière Utd',
  city: 'Fillière',
  color: '#F4C542',
  seed: 2
}, {
  id: 'vt3',
  name: 'Poisy Stars',
  city: 'Poisy',
  color: '#7BA7D9',
  seed: 3
}, {
  id: 'vt4',
  name: 'Veyrier Utd',
  city: 'Veyrier',
  color: '#C9C1A2',
  seed: 4
}, {
  id: 'vt5',
  name: 'Seynod City',
  city: 'Seynod',
  color: '#D94B5B',
  seed: 5
}, {
  id: 'vt6',
  name: 'Meythet FC',
  city: 'Meythet',
  color: '#8A938C',
  seed: 6
}, {
  id: 'vt7',
  name: 'Cran Giants',
  city: 'Cran-Gevrier',
  color: '#9B7CDB',
  seed: 7
}, {
  id: 'vt8',
  name: 'Argonay FC',
  city: 'Argonay',
  color: '#E8845A',
  seed: 8
}, {
  id: 'vt9',
  name: 'Pringy Warriors',
  city: 'Pringy',
  color: '#5ABFE8',
  seed: 9
}, {
  id: 'vt10',
  name: 'Epagny Sport',
  city: 'Epagny',
  color: '#E85A9B',
  seed: 10
}, {
  id: 'vt11',
  name: 'Semnoz FC',
  city: 'Semnoz',
  color: '#5AE89B',
  seed: 11
}, {
  id: 'vt12',
  name: 'Nâves-Parmelan',
  city: 'Nâves',
  color: '#E8C55A',
  seed: 12
}, {
  id: 'vt13',
  name: 'Rumilly United',
  city: 'Rumilly',
  color: '#845AE8',
  seed: 13
}, {
  id: 'vt14',
  name: 'Thônes Élite',
  city: 'Thônes',
  color: '#5AE8D4',
  seed: 14
}, {
  id: 'vt15',
  name: 'Faverges SC',
  city: 'Faverges',
  color: '#E87C5A',
  seed: 15
}, {
  id: 'vt16',
  name: 'Duingt FC',
  city: 'Duingt',
  color: '#B05AE8',
  seed: 16
}];
const DISTRIBUTION_MODES: Array<{
  id: DistributionMode;
  label: string;
  desc: string;
  icon: React.ReactNode;
}> = [{
  id: 'random',
  label: 'Aléatoire',
  desc: 'Répartition purement aléatoire des équipes',
  icon: <Shuffle size={14} />
}, {
  id: 'seeded',
  label: 'Seedée S2/S3',
  desc: 'Têtes de série basées sur le classement précédent',
  icon: <Award size={14} />
}, {
  id: 'no_derbies',
  label: 'Sans derbies',
  desc: 'Évite les équipes d\'une même commune dans la même poule',
  icon: <MapPin size={14} />
}];
const POOL_LABELS = ['A', 'B', 'C', 'D', 'E', 'F'];
function generatePools(teamCount: number, poolCount: number, mode: DistributionMode): Pool[] {
  const teams = [...ALL_VALIDATED_TEAMS].slice(0, teamCount);
  let ordered: PoolTeam[];
  if (mode === 'seeded') {
    ordered = [...teams].sort((a, b) => (a.seed ?? 99) - (b.seed ?? 99));
  } else if (mode === 'no_derbies') {
    ordered = [...teams].sort(() => Math.random() - 0.5);
  } else {
    ordered = [...teams].sort(() => Math.random() - 0.5);
  }
  const pools: Pool[] = Array.from({
    length: poolCount
  }, (_, i) => ({
    id: `pool-${i}`,
    label: POOL_LABELS[i],
    teams: []
  }));
  ordered.forEach((team, idx) => {
    pools[idx % poolCount].teams.push(team);
  });
  return pools;
}

// ─── ScoreEntrySheet ──────────────────────────────────────────────────────────

const ScoreEntrySheet = ({
  match,
  onClose
}: {
  match: AdminMatch;
  onClose: () => void;
}) => {
  const [homeScore, setHomeScore] = useState(match.homeScore?.toString() ?? '');
  const [awayScore, setAwayScore] = useState(match.awayScore?.toString() ?? '');
  const [scorers, setScorers] = useState('');
  const [saved, setSaved] = useState(false);
  const handleSave = () => {
    setSaved(true);
    setTimeout(onClose, 1200);
  };
  return <motion.div initial={{
    y: '100%'
  }} animate={{
    y: 0
  }} exit={{
    y: '100%'
  }} transition={{
    type: 'spring',
    stiffness: 320,
    damping: 36
  }} className="fixed inset-x-0 bottom-0 z-[90] rounded-t-[32px]" style={{
    background: '#0F2E25',
    border: '1px solid rgba(255,255,255,0.07)',
    maxHeight: '80vh'
  }}>
    <div className="flex items-center justify-between px-5 pt-5 pb-4">
      <h3 className="text-[14px] font-black" style={{
        color: '#F2EEDC'
      }}>Saisie du Score</h3>
      <button onClick={onClose} className="w-8 h-8 rounded-full flex items-center justify-center" style={{
        background: 'rgba(255,255,255,0.06)'
      }} aria-label="Fermer">
        <XCircle size={15} style={{
          color: '#8A938C'
        }} />
      </button>
    </div>
    <div className="px-5 pb-8 flex flex-col gap-5" style={{
      overflowY: 'auto',
      maxHeight: '65vh'
    }}>
      <div className="flex items-center justify-between gap-4">
        <div className="flex-1 flex flex-col items-center gap-2">
          <p className="text-[11px] font-black text-center" style={{
            color: '#D7DBC8'
          }}>{match.home}</p>
          <input type="number" value={homeScore} onChange={e => setHomeScore(e.target.value)} min="0" className="w-full h-14 rounded-[16px] text-center text-[28px] font-black focus:outline-none" style={{
            background: 'rgba(183,255,26,0.06)',
            border: '2px solid rgba(183,255,26,0.2)',
            color: '#B7FF1A'
          }} aria-label={`Score de ${match.home}`} />
        </div>
        <span className="text-[24px] font-black" style={{
          color: '#8A938C'
        }}>—</span>
        <div className="flex-1 flex flex-col items-center gap-2">
          <p className="text-[11px] font-black text-center" style={{
            color: '#D7DBC8'
          }}>{match.away}</p>
          <input type="number" value={awayScore} onChange={e => setAwayScore(e.target.value)} min="0" className="w-full h-14 rounded-[16px] text-center text-[28px] font-black focus:outline-none" style={{
            background: 'rgba(183,255,26,0.06)',
            border: '2px solid rgba(183,255,26,0.2)',
            color: '#B7FF1A'
          }} aria-label={`Score de ${match.away}`} />
        </div>
      </div>
      <div className="flex flex-col gap-1.5">
        <label className="text-[9px] font-black uppercase tracking-[0.2em]" style={{
          color: '#8A938C'
        }}>Buteurs & Passeurs</label>
        <textarea value={scorers} onChange={e => setScorers(e.target.value)} placeholder="Ex: Bersot (23', 67') — Mebrouk (45'+2) — Assist: Garnier..." rows={3} className="w-full px-4 py-3 rounded-[14px] text-[12px] font-medium focus:outline-none resize-none" style={{
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.08)',
          color: '#F2EEDC'
        }} />
      </div>
      <div className="flex flex-col gap-1.5">
        <label className="text-[9px] font-black uppercase tracking-[0.2em]" style={{
          color: '#8A938C'
        }}>Cartons</label>
        <input type="text" placeholder="Ex: Jaune — Mebrouk (38') · Rouge — Perrin (72')" className="w-full h-11 px-4 rounded-[14px] text-[12px] font-medium focus:outline-none" style={{
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.08)',
          color: '#F2EEDC'
        }} aria-label="Cartons" />
      </div>
      <button onClick={handleSave} disabled={!homeScore || !awayScore} className="w-full py-4 rounded-[16px] text-[12px] font-black uppercase tracking-wider flex items-center justify-center gap-2" style={{
        background: saved ? '#2E8F57' : '#B7FF1A',
        color: '#0B221C',
        opacity: !homeScore || !awayScore ? 0.4 : 1
      }}>
        <CheckCircle size={14} />
        <span>{saved ? 'Score enregistré !' : 'Valider le score'}</span>
      </button>
    </div>
  </motion.div>;
};

// ─── ScoreCorrectSheet ────────────────────────────────────────────────────────

const ScoreCorrectSheet = ({
  record,
  onClose
}: {
  record: ScoreRecord;
  onClose: () => void;
}) => {
  const [homeScore, setHomeScore] = useState(record.homeScore.toString());
  const [awayScore, setAwayScore] = useState(record.awayScore.toString());
  const [reason, setReason] = useState('');
  const [saved, setSaved] = useState(false);
  const handleSave = () => {
    setSaved(true);
    setTimeout(onClose, 1200);
  };
  return <motion.div initial={{
    y: '100%'
  }} animate={{
    y: 0
  }} exit={{
    y: '100%'
  }} transition={{
    type: 'spring',
    stiffness: 320,
    damping: 36
  }} className="fixed inset-x-0 bottom-0 z-[90] rounded-t-[32px]" style={{
    background: '#0F2E25',
    border: '1px solid rgba(255,255,255,0.07)',
    maxHeight: '82vh'
  }}>
    <div className="flex items-center justify-between px-5 pt-5 pb-4">
      <div>
        <p className="text-[9px] font-black uppercase tracking-[0.15em] mb-0.5" style={{
          color: '#8A938C'
        }}>Correction de score</p>
        <h3 className="text-[13px] font-black" style={{
          color: '#F2EEDC'
        }}>{record.home} — {record.away}</h3>
      </div>
      <button onClick={onClose} className="w-8 h-8 rounded-full flex items-center justify-center" style={{
        background: 'rgba(255,255,255,0.06)'
      }} aria-label="Fermer">
        <XCircle size={15} style={{
          color: '#8A938C'
        }} />
      </button>
    </div>
    <div className="px-5 pb-8 flex flex-col gap-4" style={{
      overflowY: 'auto',
      maxHeight: '68vh'
    }}>
      <div className="flex items-center justify-between px-4 py-3 rounded-[14px]" style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.06)'
      }}>
        <span className="text-[9px] font-black uppercase tracking-wider" style={{
          color: '#8A938C'
        }}>Score actuel</span>
        <span className="text-[18px] font-black" style={{
          color: '#D7DBC8'
        }}>{record.homeScore}–{record.awayScore}</span>
      </div>
      <div className="flex flex-col gap-1.5">
        <p className="text-[9px] font-black uppercase tracking-[0.15em]" style={{
          color: '#8A938C'
        }}>Nouveau score</p>
        <div className="flex items-center gap-3">
          <div className="flex-1 flex flex-col items-center gap-1.5">
            <span className="text-[9px] font-bold" style={{
              color: '#D7DBC8'
            }}>{record.home}</span>
            <input type="number" value={homeScore} onChange={e => setHomeScore(e.target.value)} min="0" className="w-full h-14 rounded-[16px] text-center text-[26px] font-black focus:outline-none" style={{
              background: 'rgba(123,167,217,0.06)',
              border: '2px solid rgba(123,167,217,0.2)',
              color: '#7BA7D9'
            }} aria-label={`Nouveau score ${record.home}`} />
          </div>
          <span className="text-[20px] font-black" style={{
            color: '#8A938C'
          }}>–</span>
          <div className="flex-1 flex flex-col items-center gap-1.5">
            <span className="text-[9px] font-bold" style={{
              color: '#D7DBC8'
            }}>{record.away}</span>
            <input type="number" value={awayScore} onChange={e => setAwayScore(e.target.value)} min="0" className="w-full h-14 rounded-[16px] text-center text-[26px] font-black focus:outline-none" style={{
              background: 'rgba(123,167,217,0.06)',
              border: '2px solid rgba(123,167,217,0.2)',
              color: '#7BA7D9'
            }} aria-label={`Nouveau score ${record.away}`} />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-1.5">
        <label className="text-[9px] font-black uppercase tracking-[0.15em]" style={{
          color: '#8A938C'
        }}>Motif de la correction</label>
        <textarea value={reason} onChange={e => setReason(e.target.value)} placeholder="Ex: Erreur de saisie initiale, contestation validée..." rows={2} className="w-full px-4 py-3 rounded-[14px] text-[12px] font-medium focus:outline-none resize-none" style={{
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.08)',
          color: '#F2EEDC'
        }} />
      </div>
      <div className="flex items-start gap-2.5 px-3 py-3 rounded-[12px]" style={{
        background: 'rgba(244,197,66,0.06)',
        border: '1px solid rgba(244,197,66,0.14)'
      }}>
        <AlertTriangle size={11} style={{
          color: '#F4C542',
          flexShrink: 0,
          marginTop: 1
        }} />
        <p className="text-[9px] font-bold leading-relaxed" style={{
          color: '#F4C542'
        }}>
          Cette correction mettra à jour le classement, les stats équipes et les stats joueurs en temps réel.
        </p>
      </div>
      <button onClick={handleSave} className="w-full py-4 rounded-[16px] text-[12px] font-black uppercase tracking-wider flex items-center justify-center gap-2" style={{
        background: saved ? '#2E8F57' : '#7BA7D9',
        color: '#0B221C'
      }}>
        <RotateCcw size={14} />
        <span>{saved ? 'Correction enregistrée !' : 'Corriger le score'}</span>
      </button>
    </div>
  </motion.div>;
};

// ─── MoveTeamSheet ────────────────────────────────────────────────────────────

const MoveTeamSheet = ({
  team,
  currentPoolId,
  pools,
  onMove,
  onClose
}: {
  team: PoolTeam;
  currentPoolId: string;
  pools: Pool[];
  onMove: (teamId: string, fromPoolId: string, toPoolId: string) => void;
  onClose: () => void;
}) => {
  return <motion.div initial={{
    y: '100%'
  }} animate={{
    y: 0
  }} exit={{
    y: '100%'
  }} transition={{
    type: 'spring',
    stiffness: 320,
    damping: 36
  }} className="fixed inset-x-0 bottom-0 z-[90] rounded-t-[32px]" style={{
    background: '#0F2E25',
    border: '1px solid rgba(255,255,255,0.07)'
  }}>
    <div className="flex items-center justify-between px-5 pt-5 pb-2">
      <div>
        <p className="text-[9px] font-black uppercase tracking-[0.15em] mb-0.5" style={{
          color: '#8A938C'
        }}>Déplacer l'équipe</p>
        <h3 className="text-[14px] font-black" style={{
          color: '#F2EEDC'
        }}>{team.name}</h3>
      </div>
      <button onClick={onClose} className="w-8 h-8 rounded-full flex items-center justify-center" style={{
        background: 'rgba(255,255,255,0.06)'
      }} aria-label="Fermer">
        <XCircle size={15} style={{
          color: '#8A938C'
        }} />
      </button>
    </div>
    <div className="px-5 pb-8 pt-3 flex flex-col gap-2">
      <p className="text-[10px] font-semibold mb-1" style={{
        color: '#8A938C'
      }}>Choisir la poule de destination :</p>
      {pools.map(pool => {
        const isCurrent = pool.id === currentPoolId;
        const isFull = pool.teams.length >= Math.ceil(16 / pools.length);
        return <button key={pool.id} onClick={() => {
          if (!isCurrent && !isFull) {
            onMove(team.id, currentPoolId, pool.id);
            onClose();
          }
        }} disabled={isCurrent || isFull} className="flex items-center gap-4 px-4 py-3.5 rounded-[16px] w-full text-left transition-all" style={{
          background: isCurrent ? 'rgba(183,255,26,0.06)' : isFull ? 'rgba(255,255,255,0.02)' : 'rgba(255,255,255,0.04)',
          border: `1px solid ${isCurrent ? 'rgba(183,255,26,0.2)' : 'rgba(255,255,255,0.07)'}`,
          opacity: isFull && !isCurrent ? 0.4 : 1
        }}>
          <div className="w-9 h-9 rounded-[11px] flex items-center justify-center flex-shrink-0" style={{
            background: isCurrent ? 'rgba(183,255,26,0.12)' : 'rgba(255,255,255,0.05)',
            border: `1px solid ${isCurrent ? 'rgba(183,255,26,0.25)' : 'rgba(255,255,255,0.08)'}`
          }}>
            <span className="text-[13px] font-black" style={{
              color: isCurrent ? '#B7FF1A' : '#D7DBC8'
            }}>
              {pool.label}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[12px] font-black" style={{
              color: isCurrent ? '#B7FF1A' : '#D7DBC8'
            }}>
              <span>Poule </span><span>{pool.label}</span>
            </p>
            <p className="text-[9px] font-semibold mt-0.5" style={{
              color: '#8A938C'
            }}>
              <span>{pool.teams.length} équipe{pool.teams.length !== 1 ? 's' : ''}</span>
              {isCurrent && <span> · actuelle</span>}
              {isFull && !isCurrent && <span> · poule pleine</span>}
            </p>
          </div>
          {isCurrent && <Check size={14} style={{
            color: '#B7FF1A',
            flexShrink: 0
          }} />}
          {!isCurrent && !isFull && <ArrowRight size={13} style={{
            color: '#8A938C',
            flexShrink: 0
          }} />}
        </button>;
      })}
    </div>
  </motion.div>;
};

// ─── AdminDashboard ───────────────────────────────────────────────────────────

export const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState<AdminSection>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [scoreMatch, setScoreMatch] = useState<AdminMatch | null>(null);
  const [notifications, setNotifications] = useState<AdminNotif[]>(ADMIN_NOTIFS);
  const [matchFilter, setMatchFilter] = useState<MatchFilterType>('all');
  const [matchDateFilter, setMatchDateFilter] = useState<MatchDateFilter>('all');
  const [blockersExpanded, setBlockersExpanded] = useState(false);

  // Registrations state
  const [registrations, setRegistrations] = useState<PendingRegistration[]>(PENDING_REGISTRATIONS);
  const [regStatusFilter, setRegStatusFilter] = useState<RegFilterStatus>('pending');
  const [regSort, setRegSort] = useState<RegSortType>('oldest');
  const [regSortOpen, setRegSortOpen] = useState(false);
  const [selectedRegs, setSelectedRegs] = useState<string[]>([]);
  const [regRulesOpen, setRegRulesOpen] = useState(false);

  // Scores & Stats state
  const [scoreTabFilter, setScoreTabFilter] = useState<ScoreTabFilter>('all');
  const [phaseFilter, setPhaseFilter] = useState<PhaseFilter>('all');
  const [statsView, setStatsView] = useState<StatsTabView>('results');
  const [correctRecord, setCorrectRecord] = useState<ScoreRecord | null>(null);
  const [lastRecalc, setLastRecalc] = useState('il y a 3 min');
  const [recalcPulse, setRecalcPulse] = useState(false);

  // Groups / Poules state
  const [groupsState, setGroupsState] = useState<GroupsState>('idle');
  const [poolCount, setPoolCount] = useState(4);
  const [distributionMode, setDistributionMode] = useState<DistributionMode>('random');
  const [pools, setPools] = useState<Pool[]>([]);
  const [showGenerateWarning, setShowGenerateWarning] = useState(false);
  const [moveTeam, setMoveTeam] = useState<{
    team: PoolTeam;
    poolId: string;
  } | null>(null);
  const [confirming, setConfirming] = useState(false);
  const validatedTeamCount = ALL_VALIDATED_TEAMS.length;
  const teamsPerPool = Math.ceil(validatedTeamCount / poolCount);
  const unreadCount = notifications.filter(n => !n.read).length;
  const actionNotifs = notifications.filter(n => n.category === 'action');
  const infoNotifs = notifications.filter(n => n.category === 'info');
  const sectionMeta = NAV_SECTIONS.find(s => s.id === activeSection);
  const navGroups = Array.from(new Set(NAV_SECTIONS.map(s => s.group)));
  const markAllRead = () => setNotifications(prev => prev.map(n => ({
    ...n,
    read: true
  })));
  const totalBlockers = SEASON_BLOCKERS.reduce((acc, b) => acc + b.count, 0);

  // ── Filtered & sorted registrations ──
  const filteredRegs = registrations.filter(r => r.status === regStatusFilter).sort((a, b) => {
    if (regSort === 'newest') return a.submittedTimestamp - b.submittedTimestamp;
    if (regSort === 'oldest') return b.submittedTimestamp - a.submittedTimestamp;
    if (regSort === 'players_desc') return b.players - a.players;
    if (regSort === 'players_asc') return a.players - b.players;
    return 0;
  });
  const pendingCount = registrations.filter(r => r.status === 'pending').length;
  const handleValidate = (id: string) => setRegistrations(prev => prev.map(r => r.id === id ? {
    ...r,
    status: 'validated'
  } : r));
  const handleRefuse = (id: string) => setRegistrations(prev => prev.map(r => r.id === id ? {
    ...r,
    status: 'refused'
  } : r));
  const handleBulkValidate = () => {
    setRegistrations(prev => prev.map(r => selectedRegs.includes(r.id) ? {
      ...r,
      status: 'validated'
    } : r));
    setSelectedRegs([]);
  };
  const handleBulkRefuse = () => {
    setRegistrations(prev => prev.map(r => selectedRegs.includes(r.id) ? {
      ...r,
      status: 'refused'
    } : r));
    setSelectedRegs([]);
  };
  const toggleRegSelect = (id: string) => {
    setSelectedRegs(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  // ── Filtered matches ──
  const filteredMatches = ADMIN_MATCHES.filter(m => {
    const statusOk = matchFilter === 'all' ? true : m.status === matchFilter;
    const dateOk = matchDateFilter === 'all' ? true : matchDateFilter === 'today' ? m.dateGroup === 'today' : matchDateFilter === 'week' ? m.dateGroup !== 'older' : true;
    return statusOk && dateOk;
  });
  const liveMatches = filteredMatches.filter(m => m.status === 'live');
  const upcomingMatches = filteredMatches.filter(m => m.status === 'scheduled');
  const toHandleMatches = filteredMatches.filter(m => m.status === 'awaiting_score' || m.status === 'score_pending_validation');
  const awaitingScoreCount = ADMIN_MATCHES.filter(m => m.status === 'awaiting_score').length;

  // ── Filtered score records ──
  const filteredScoreRecords = SCORE_RECORDS.filter(r => {
    const statusOk = scoreTabFilter === 'all' ? true : r.status === scoreTabFilter;
    const phaseOk = phaseFilter === 'all' ? true : r.phase === phaseFilter;
    return statusOk && phaseOk;
  });
  const awaitingScores = SCORE_RECORDS.filter(r => r.status === 'awaiting').length;
  const validatedScores = SCORE_RECORDS.filter(r => r.status === 'validated').length;
  const correctedScores = SCORE_RECORDS.filter(r => r.status === 'corrected').length;
  const totalScored = validatedScores + correctedScores;
  const handleRecalc = () => {
    setRecalcPulse(true);
    setLastRecalc('il y a quelques sec.');
    setTimeout(() => setRecalcPulse(false), 1000);
  };

  // ── Groups / Poules handlers ──
  const handleGeneratePools = () => {
    const generated = generatePools(validatedTeamCount, poolCount, distributionMode);
    setPools(generated);
    setGroupsState('generated');
    setShowGenerateWarning(false);
  };
  const handleRegeneratePools = () => {
    setShowGenerateWarning(true);
  };
  const handleMoveTeam = (teamId: string, fromPoolId: string, toPoolId: string) => {
    setPools(prev => {
      const next = prev.map(p => ({
        ...p,
        teams: [...p.teams]
      }));
      const fromPool = next.find(p => p.id === fromPoolId);
      const toPool = next.find(p => p.id === toPoolId);
      if (!fromPool || !toPool) return prev;
      const teamIdx = fromPool.teams.findIndex(t => t.id === teamId);
      if (teamIdx === -1) return prev;
      const [team] = fromPool.teams.splice(teamIdx, 1);
      toPool.teams.push(team);
      return next;
    });
  };
  const handleConfirmPools = () => {
    setConfirming(true);
    setTimeout(() => {
      setGroupsState('confirmed');
      setConfirming(false);
    }, 1200);
  };
  return <div className="flex flex-col min-h-screen" style={{
    background: '#080F0D',
    color: '#F2EEDC'
  }}>

    {/* Admin top bar */}
    <header className="flex items-center gap-3 px-4 pt-12 pb-4 flex-shrink-0" style={{
      borderBottom: '1px solid rgba(255,255,255,0.06)'
    }}>
      <button onClick={() => setSidebarOpen(true)} className="w-9 h-9 rounded-[11px] flex items-center justify-center" style={{
        background: 'rgba(183,255,26,0.08)',
        border: '1px solid rgba(183,255,26,0.15)'
      }} aria-label="Ouvrir le menu">
        <LayoutDashboard size={16} style={{
          color: '#B7FF1A'
        }} />
      </button>
      <div className="flex-1 min-w-0">
        <p className="text-[9px] font-black uppercase tracking-[0.2em]" style={{
          color: '#8A938C'
        }}>Back-office</p>
        <h1 className="text-[15px] font-black leading-none truncate" style={{
          color: '#F2EEDC'
        }}>{sectionMeta?.label}</h1>
      </div>
      <div className="flex items-center gap-2">
        <button className="relative w-9 h-9 rounded-[11px] flex items-center justify-center" style={{
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.07)'
        }} aria-label="Notifications" onClick={markAllRead}>
          <Bell size={15} style={{
            color: '#8A938C'
          }} />
          {unreadCount > 0 && <span className="absolute top-1.5 right-1.5 w-[7px] h-[7px] rounded-full" style={{
            background: '#D94B5B'
          }} />}
        </button>
        <div className="w-9 h-9 rounded-[11px] overflow-hidden" style={{
          border: '1.5px solid rgba(183,255,26,0.2)'
        }}>
          <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=80&h=80" alt="Avatar admin" className="w-full h-full object-cover" />
        </div>
      </div>
    </header>

    {/* Main content */}
    <main className="flex-1 overflow-y-auto pb-20" style={{
      scrollbarWidth: 'none'
    }}>

      {/* ── DASHBOARD ── */}
      {activeSection === 'dashboard' && <div className="flex flex-col gap-5 p-4">

        {/* Admin identity banner */}
        <div className="flex items-center gap-3 px-4 py-3 rounded-[16px]" style={{
          background: 'linear-gradient(135deg, rgba(183,255,26,0.06) 0%, rgba(46,143,87,0.1) 100%)',
          border: '1px solid rgba(183,255,26,0.1)'
        }}>
          <div className="w-9 h-9 rounded-full overflow-hidden flex-shrink-0" style={{
            border: '2px solid rgba(183,255,26,0.25)'
          }}>
            <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=80&h=80" alt="Karim B." className="w-full h-full object-cover" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[12px] font-black leading-none" style={{
              color: '#F2EEDC'
            }}>Karim Bensalah</p>
            <div className="flex items-center gap-1.5 mt-0.5">
              <Lock size={8} style={{
                color: '#B7FF1A'
              }} />
              <span className="text-[9px] font-black uppercase tracking-[0.12em]" style={{
                color: '#B7FF1A'
              }}>Super-admin</span>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-[8px] font-bold" style={{
              color: '#8A938C'
            }}>Saison</span>
            <span className="text-[10px] font-black" style={{
              color: '#D7DBC8'
            }}>2024–2025</span>
          </div>
        </div>

        {/* Season health bar */}
        <div className="rounded-[20px] px-4 py-4" style={{
          background: '#123129',
          border: '1px solid rgba(255,255,255,0.05)'
        }}>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Radio size={12} style={{
                color: '#B7FF1A'
              }} />
              <span className="text-[10px] font-black uppercase tracking-wider" style={{
                color: '#D7DBC8'
              }}>Journée 18 sur 20</span>
            </div>
            <span className="text-[9px] font-bold px-2 py-0.5 rounded-full" style={{
              background: 'rgba(123,167,217,0.12)',
              color: '#7BA7D9'
            }}>Phase de groupes</span>
          </div>
          <div className="w-full h-1.5 rounded-full mb-3" style={{
            background: 'rgba(255,255,255,0.07)'
          }}>
            <div className="h-full rounded-full" style={{
              width: '90%',
              background: 'linear-gradient(90deg, #2E8F57, #B7FF1A)'
            }} />
          </div>
          <button onClick={() => setBlockersExpanded(v => !v)} className="w-full flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertCircle size={11} style={{
                color: totalBlockers > 0 ? '#F4C542' : '#2E8F57'
              }} />
              <span className="text-[10px] font-black" style={{
                color: totalBlockers > 0 ? '#F4C542' : '#2E8F57'
              }}>
                {totalBlockers > 0 ? `${totalBlockers} points bloquants` : 'Aucun bloquant'}
              </span>
            </div>
            <ChevronDown size={13} style={{
              color: '#8A938C',
              transform: blockersExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.2s'
            }} />
          </button>
          <AnimatePresence>
            {blockersExpanded && <motion.div initial={{
              height: 0,
              opacity: 0
            }} animate={{
              height: 'auto',
              opacity: 1
            }} exit={{
              height: 0,
              opacity: 0
            }} transition={{
              duration: 0.22
            }} style={{
              overflow: 'hidden'
            }}>
              <div className="flex flex-col gap-2 mt-3">
                {SEASON_BLOCKERS.map(blocker => {
                  const meta = BLOCKER_COLORS[blocker.severity];
                  return <button key={blocker.id} onClick={() => setActiveSection(blocker.section)} className="flex items-center gap-3 px-3 py-2 rounded-[10px] w-full text-left" style={{
                    background: meta.bg,
                    border: `1px solid ${meta.border}`
                  }}>
                    <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{
                      background: meta.dot
                    }} />
                    <span className="flex-1 text-[10px] font-bold" style={{
                      color: meta.text
                    }}>
                      <strong>{blocker.count}</strong>
                      <span> {blocker.label}</span>
                    </span>
                    <ArrowRight size={10} style={{
                      color: meta.text,
                      opacity: 0.6
                    }} />
                  </button>;
                })}
              </div>
            </motion.div>}
          </AnimatePresence>
        </div>

        {/* Stats grid — clickable */}
        <div className="grid grid-cols-2 gap-3">
          {ADMIN_STATS.map(stat => <button key={stat.id} onClick={() => setActiveSection(stat.section)} className="rounded-[20px] p-4 text-left transition-all active:scale-95" style={{
            background: '#123129',
            border: '1px solid rgba(255,255,255,0.05)'
          }}>
            <p className="text-[9px] font-black uppercase tracking-[0.15em] mb-1" style={{
              color: '#8A938C'
            }}>{stat.label}</p>
            <p className="text-[28px] font-black leading-none tracking-tight mb-1" style={{
              color: stat.color
            }}>{stat.value}</p>
            <div className="flex items-center justify-between">
              {stat.delta && <p className="text-[9px] font-bold" style={{
                color: stat.positive ? '#2E8F57' : '#F4C542'
              }}>{stat.delta}</p>}
              <ArrowRight size={10} style={{
                color: 'rgba(255,255,255,0.2)',
                marginLeft: 'auto'
              }} />
            </div>
          </button>)}
        </div>

        {/* Communication pulse */}
        <div className="rounded-[20px] px-4 py-4 flex flex-col gap-3" style={{
          background: '#123129',
          border: '1px solid rgba(255,255,255,0.05)'
        }}>
          <div className="flex items-center gap-2">
            <Megaphone size={12} style={{
              color: '#C9C1A2'
            }} />
            <span className="text-[10px] font-black uppercase tracking-wider" style={{
              color: '#D7DBC8'
            }}>Communication</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {[{
              label: 'Push envoyées',
              value: '3',
              sub: "aujourd'hui",
              color: '#7BA7D9',
              icon: <Send size={10} />
            }, {
              label: 'Dernière news',
              value: '2h',
              sub: 'publiée il y a',
              color: '#C9C1A2',
              icon: <Newspaper size={10} />
            }].map(item => <div key={item.label} className="flex flex-col gap-1 px-3 py-2.5 rounded-[12px]" style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.05)'
            }}>
              <div className="flex items-center gap-1.5" style={{
                color: item.color
              }}>
                {item.icon}
                <span className="text-[8px] font-black uppercase tracking-[0.1em]" style={{
                  color: '#8A938C'
                }}>{item.label}</span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-[20px] font-black leading-none" style={{
                  color: item.color
                }}>{item.value}</span>
                <span className="text-[8px]" style={{
                  color: '#8A938C'
                }}>{item.sub}</span>
              </div>
            </div>)}
          </div>
        </div>

        {/* Notifications — split by category */}
        <div className="rounded-[22px] overflow-hidden" style={{
          background: '#123129',
          border: '1px solid rgba(255,255,255,0.05)'
        }}>
          <div className="flex items-center justify-between px-4 py-3" style={{
            borderBottom: '1px solid rgba(255,255,255,0.05)'
          }}>
            <div className="flex items-center gap-2">
              <Bell size={13} style={{
                color: '#B7FF1A'
              }} />
              <span className="text-[10px] font-black uppercase tracking-wider" style={{
                color: '#D7DBC8'
              }}>Notifications</span>
            </div>
            {unreadCount > 0 && <span className="text-[9px] font-black px-2 py-0.5 rounded-full" style={{
              background: '#D94B5B',
              color: '#F2EEDC'
            }}>{unreadCount}</span>}
          </div>
          {actionNotifs.length > 0 && <div>
            <div className="flex items-center gap-1.5 px-4 py-2" style={{
              background: 'rgba(217,75,91,0.04)'
            }}>
              <AlertCircle size={9} style={{
                color: '#D94B5B'
              }} />
              <span className="text-[8px] font-black uppercase tracking-[0.15em]" style={{
                color: '#D94B5B'
              }}>Action requise</span>
            </div>
            {actionNotifs.map(notif => {
              const meta = NOTIF_META[notif.type];
              return <div key={notif.id} className="flex items-start gap-3 px-4 py-3" style={{
                borderBottom: '1px solid rgba(255,255,255,0.04)',
                background: notif.read ? 'transparent' : 'rgba(217,75,91,0.03)'
              }}>
                <div className="w-6 h-6 rounded-[8px] flex items-center justify-center flex-shrink-0 mt-0.5" style={{
                  background: 'rgba(217,75,91,0.1)',
                  color: meta.actionColor
                }}>{meta.icon}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] font-black leading-snug" style={{
                    color: notif.read ? '#D7DBC8' : '#F2EEDC'
                  }}>{notif.text}</p>
                  <p className="text-[9px] mt-0.5" style={{
                    color: '#8A938C'
                  }}>{notif.time}</p>
                </div>
                {!notif.read && <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{
                  background: '#D94B5B'
                }} />}
              </div>;
            })}
          </div>}
          {infoNotifs.length > 0 && <div>
            <div className="flex items-center gap-1.5 px-4 py-2" style={{
              background: 'rgba(255,255,255,0.02)'
            }}>
              <Bell size={9} style={{
                color: '#8A938C'
              }} />
              <span className="text-[8px] font-black uppercase tracking-[0.15em]" style={{
                color: '#8A938C'
              }}>Informations</span>
            </div>
            {infoNotifs.map(notif => {
              const meta = NOTIF_META[notif.type];
              return <div key={notif.id} className="flex items-start gap-3 px-4 py-3" style={{
                borderBottom: '1px solid rgba(255,255,255,0.03)',
                background: 'transparent'
              }}>
                <div className="w-6 h-6 rounded-[8px] flex items-center justify-center flex-shrink-0 mt-0.5" style={{
                  background: 'rgba(255,255,255,0.04)',
                  color: meta.infoColor
                }}>{meta.icon}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] font-medium leading-snug" style={{
                    color: '#8A938C'
                  }}>{notif.text}</p>
                  <p className="text-[9px] mt-0.5" style={{
                    color: '#8A938C'
                  }}>{notif.time}</p>
                </div>
              </div>;
            })}
          </div>}
        </div>

        {/* Quick actions */}
        <div>
          <h3 className="text-[9px] font-black uppercase tracking-[0.2em] mb-3" style={{
            color: '#8A938C'
          }}>Actions Rapides</h3>
          <div className="grid grid-cols-2 gap-3">
            {[{
              label: 'Créer un match',
              icon: <Plus size={16} />,
              section: 'matches' as AdminSection,
              color: '#B7FF1A'
            }, {
              label: 'Valider inscriptions',
              icon: <CheckCircle size={16} />,
              section: 'registrations' as AdminSection,
              color: '#7BA7D9'
            }, {
              label: 'Publier actualité',
              icon: <Newspaper size={16} />,
              section: 'news' as AdminSection,
              color: '#C9C1A2'
            }, {
              label: 'Générer les poules',
              icon: <Layers size={16} />,
              section: 'groups' as AdminSection,
              color: '#F4C542'
            }].map(action => <button key={action.label} onClick={() => setActiveSection(action.section)} className="flex flex-col items-start gap-3 p-4 rounded-[18px] transition-all active:scale-95" style={{
              background: '#123129',
              border: `1px solid ${action.color}18`
            }}>
              <div className="w-9 h-9 rounded-[11px] flex items-center justify-center" style={{
                background: `${action.color}14`,
                color: action.color
              }}>{action.icon}</div>
              <span className="text-[11px] font-black text-left leading-snug" style={{
                color: '#D7DBC8'
              }}>{action.label}</span>
            </button>)}
          </div>
        </div>

        {/* Matches to handle — dashboard widget */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-[9px] font-black uppercase tracking-[0.2em]" style={{
              color: '#8A938C'
            }}>Matchs à Gérer</h3>
            <button onClick={() => setActiveSection('matches')} className="flex items-center gap-1 text-[9px] font-black" style={{
              color: '#B7FF1A'
            }}>
              <span>Voir tous</span>
              <ArrowRight size={9} />
            </button>
          </div>
          <div className="flex items-center gap-1.5 mb-3 overflow-x-auto" style={{
            scrollbarWidth: 'none'
          }}>
            {MATCH_FILTER_TABS.map(tab => <button key={tab.id} onClick={() => setMatchFilter(tab.id)} className="flex-shrink-0 px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-wide transition-all" style={matchFilter === tab.id ? {
              background: 'rgba(183,255,26,0.12)',
              color: '#B7FF1A',
              border: '1px solid rgba(183,255,26,0.2)'
            } : {
              background: 'rgba(255,255,255,0.04)',
              color: '#8A938C',
              border: '1px solid rgba(255,255,255,0.06)'
            }}>
              <span>{tab.label}</span>
              {tab.id === 'awaiting_score' && <span className="ml-1.5 px-1 rounded-sm" style={{
                background: '#F4C542',
                color: '#0B221C',
                fontSize: '7px',
                fontWeight: 900
              }}>{awaitingScoreCount}</span>}
            </button>)}
          </div>
          <div className="flex flex-col gap-2">
            {filteredMatches.slice(0, 4).map(match => {
              const statusMeta = MATCH_STATUS_META[match.status];
              return <button key={match.id} className="flex items-center gap-3 px-4 py-3.5 rounded-[16px] w-full text-left transition-all active:scale-[0.99]" style={{
                background: '#123129',
                border: `1px solid ${match.status === 'awaiting_score' ? 'rgba(244,197,66,0.15)' : match.status === 'live' ? 'rgba(217,75,91,0.15)' : 'rgba(255,255,255,0.05)'}`
              }} onClick={() => match.status === 'awaiting_score' || match.status === 'live' ? setScoreMatch(match) : undefined}>
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] font-black truncate" style={{
                    color: '#F2EEDC'
                  }}>{match.home} — {match.away}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[8px] font-bold px-1.5 py-0.5 rounded-md" style={{
                      background: statusMeta.bg,
                      color: statusMeta.color
                    }}>{statusMeta.label}</span>
                    <span className="text-[8px]" style={{
                      color: '#8A938C'
                    }}>{match.date}</span>
                    <span className="text-[8px]" style={{
                      color: '#8A938C'
                    }}>{match.venue}</span>
                  </div>
                </div>
                {match.homeScore !== undefined && <span className="text-[14px] font-black" style={{
                  color: '#D7DBC8'
                }}>{match.homeScore}–{match.awayScore}</span>}
                {(match.status === 'awaiting_score' || match.status === 'live') && <div className="w-8 h-8 rounded-[9px] flex items-center justify-center flex-shrink-0" style={{
                  background: 'rgba(183,255,26,0.1)',
                  border: '1px solid rgba(183,255,26,0.2)'
                }} aria-label="Saisir le score"><Edit3 size={12} style={{
                    color: '#B7FF1A'
                  }} /></div>}
                {match.status === 'scheduled' && <ChevronRight size={14} style={{
                  color: '#8A938C',
                  flexShrink: 0
                }} />}
              </button>;
            })}
            {filteredMatches.length === 0 && <div className="flex flex-col items-center justify-center py-8 rounded-[16px]" style={{
              background: '#123129',
              border: '1px solid rgba(255,255,255,0.05)'
            }}>
              <p className="text-[11px]" style={{
                color: '#8A938C'
              }}>Aucun match dans cette catégorie</p>
            </div>}
          </div>
        </div>
      </div>}

      {/* ── REGISTRATIONS ── */}
      {activeSection === 'registrations' && <div className="flex flex-col gap-4 p-4">

        {/* Rules context banner */}
        <button onClick={() => setRegRulesOpen(v => !v)} className="w-full flex items-center justify-between px-4 py-3 rounded-[14px]" style={{
          background: 'rgba(123,167,217,0.07)',
          border: '1px solid rgba(123,167,217,0.15)'
        }}>
          <div className="flex items-center gap-2">
            <Info size={12} style={{
              color: '#7BA7D9'
            }} />
            <span className="text-[10px] font-black" style={{
              color: '#7BA7D9'
            }}>Critères d'inscription</span>
          </div>
          <ChevronDown size={13} style={{
            color: '#7BA7D9',
            transform: regRulesOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.2s'
          }} />
        </button>
        <AnimatePresence>
          {regRulesOpen && <motion.div initial={{
            height: 0,
            opacity: 0
          }} animate={{
            height: 'auto',
            opacity: 1
          }} exit={{
            height: 0,
            opacity: 0
          }} transition={{
            duration: 0.2
          }} style={{
            overflow: 'hidden',
            marginTop: -8
          }}>
            <div className="flex gap-2 px-1 pb-1 pt-2">
              {REG_RULES.map(rule => <div key={rule.label} className="flex-1 flex flex-col items-center gap-1 px-2 py-2.5 rounded-[12px]" style={{
                background: 'rgba(123,167,217,0.05)',
                border: '1px solid rgba(123,167,217,0.1)'
              }}>
                <div style={{
                  color: '#7BA7D9'
                }}>{rule.icon}</div>
                <span className="text-[9px] font-black text-center" style={{
                  color: '#7BA7D9'
                }}>{rule.value}</span>
                <span className="text-[7px] font-bold text-center uppercase tracking-wide" style={{
                  color: '#8A938C'
                }}>{rule.label}</span>
              </div>)}
            </div>
          </motion.div>}
        </AnimatePresence>

        {/* Status tabs + sort */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1 p-1 rounded-[12px] flex-1" style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.06)'
          }}>
            {(['pending', 'validated', 'refused'] as RegFilterStatus[]).map(s => {
              const count = registrations.filter(r => r.status === s).length;
              const labels: Record<RegFilterStatus, string> = {
                pending: 'Attente',
                validated: 'Validées',
                refused: 'Refusées'
              };
              const colors: Record<RegFilterStatus, string> = {
                pending: '#F4C542',
                validated: '#B7FF1A',
                refused: '#D94B5B'
              };
              return <button key={s} onClick={() => {
                setRegStatusFilter(s);
                setSelectedRegs([]);
              }} className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-[9px] text-[9px] font-black uppercase tracking-wide transition-all" style={regStatusFilter === s ? {
                background: `${colors[s]}15`,
                color: colors[s],
                border: `1px solid ${colors[s]}30`
              } : {
                color: '#8A938C'
              }}>
                <span>{labels[s]}</span>
                {count > 0 && <span className="w-4 h-4 rounded-full flex items-center justify-center text-[7px] font-black" style={{
                  background: regStatusFilter === s ? `${colors[s]}25` : 'rgba(255,255,255,0.07)',
                  color: regStatusFilter === s ? colors[s] : '#8A938C'
                }}>{count}</span>}
              </button>;
            })}
          </div>

          {/* Sort dropdown */}
          <div className="relative">
            <button onClick={() => setRegSortOpen(v => !v)} className="flex items-center gap-1.5 px-3 py-2.5 rounded-[12px] text-[9px] font-black" style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.07)',
              color: '#8A938C'
            }}>
              <SortDesc size={11} />
              <span>Trier</span>
            </button>
            <AnimatePresence>
              {regSortOpen && <motion.div initial={{
                opacity: 0,
                y: -6,
                scale: 0.97
              }} animate={{
                opacity: 1,
                y: 0,
                scale: 1
              }} exit={{
                opacity: 0,
                y: -6,
                scale: 0.97
              }} transition={{
                duration: 0.15
              }} className="absolute right-0 top-full mt-1 rounded-[14px] overflow-hidden z-20 min-w-[160px]" style={{
                background: '#1a3d2e',
                border: '1px solid rgba(255,255,255,0.1)'
              }}>
                {REG_SORT_OPTIONS.map(opt => <button key={opt.id} onClick={() => {
                  setRegSort(opt.id);
                  setRegSortOpen(false);
                }} className="w-full text-left px-4 py-2.5 text-[10px] font-black flex items-center justify-between" style={{
                  color: regSort === opt.id ? '#B7FF1A' : '#D7DBC8',
                  background: regSort === opt.id ? 'rgba(183,255,26,0.07)' : 'transparent'
                }}>
                  <span>{opt.label}</span>
                  {regSort === opt.id && <CheckCircle size={10} style={{
                    color: '#B7FF1A'
                  }} />}
                </button>)}
              </motion.div>}
            </AnimatePresence>
          </div>
        </div>

        {/* Bulk action bar */}
        <AnimatePresence>
          {selectedRegs.length > 0 && <motion.div initial={{
            height: 0,
            opacity: 0
          }} animate={{
            height: 'auto',
            opacity: 1
          }} exit={{
            height: 0,
            opacity: 0
          }} transition={{
            duration: 0.18
          }} style={{
            overflow: 'hidden'
          }}>
            <div className="flex items-center gap-2 px-4 py-3 rounded-[14px]" style={{
              background: 'rgba(183,255,26,0.06)',
              border: '1px solid rgba(183,255,26,0.15)'
            }}>
              <div className="flex-1 flex items-center gap-1.5">
                <CheckSquare size={12} style={{
                  color: '#B7FF1A'
                }} />
                <span className="text-[10px] font-black" style={{
                  color: '#B7FF1A'
                }}>{selectedRegs.length} sélectionnée{selectedRegs.length > 1 ? 's' : ''}</span>
              </div>
              <button onClick={handleBulkRefuse} className="px-3 py-1.5 rounded-[9px] text-[9px] font-black uppercase" style={{
                background: 'rgba(217,75,91,0.12)',
                color: '#D94B5B',
                border: '1px solid rgba(217,75,91,0.2)'
              }}>
                <span>Refuser tout</span>
              </button>
              <button onClick={handleBulkValidate} className="px-3 py-1.5 rounded-[9px] text-[9px] font-black uppercase" style={{
                background: '#B7FF1A',
                color: '#0B221C'
              }}>
                <span>Valider tout</span>
              </button>
            </div>
          </motion.div>}
        </AnimatePresence>

        {/* Pending count */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 px-3 py-2 rounded-[12px]" style={{
            background: 'rgba(244,197,66,0.1)',
            border: '1px solid rgba(244,197,66,0.2)'
          }}>
            <Clock size={12} style={{
              color: '#F4C542'
            }} />
            <span className="text-[10px] font-black" style={{
              color: '#F4C542'
            }}>{pendingCount} en attente</span>
          </div>
          <p className="text-[9px] font-bold" style={{
            color: '#8A938C'
          }}>
            {regSort === 'oldest' ? 'Plus anciennes en priorité' : REG_SORT_OPTIONS.find(o => o.id === regSort)?.label}
          </p>
        </div>

        {/* Registration cards */}
        {filteredRegs.length === 0 && <div className="flex flex-col items-center justify-center py-12 rounded-[20px]" style={{
          background: '#123129',
          border: '1px solid rgba(255,255,255,0.05)'
        }}>
          <p className="text-[13px] font-black mb-1" style={{
            color: '#8A938C'
          }}>Aucune inscription</p>
          <p className="text-[10px]" style={{
            color: '#8A938C'
          }}>dans cette catégorie</p>
        </div>}

        {filteredRegs.map(reg => {
          const isSelected = selectedRegs.includes(reg.id);
          return <div key={reg.id} className="rounded-[20px] overflow-hidden transition-all" style={{
            background: '#123129',
            border: `1px solid ${isSelected ? 'rgba(183,255,26,0.25)' : reg.status === 'pending' ? 'rgba(244,197,66,0.1)' : reg.status === 'validated' ? 'rgba(183,255,26,0.1)' : 'rgba(217,75,91,0.1)'}`
          }}>
            <div className="p-4">
              {/* Card header */}
              <div className="flex items-start gap-3 mb-3">
                <button onClick={() => reg.status === 'pending' && toggleRegSelect(reg.id)} className="w-10 h-10 rounded-[12px] flex items-center justify-center flex-shrink-0 transition-all" style={{
                  background: isSelected ? 'rgba(183,255,26,0.15)' : `${reg.logoColor}20`,
                  border: `2px solid ${isSelected ? '#B7FF1A' : reg.logoColor}40`
                }}>
                  {isSelected ? <CheckSquare size={16} style={{
                    color: '#B7FF1A'
                  }} /> : <Shield size={16} style={{
                    color: reg.logoColor
                  }} />}
                </button>
                <div className="flex-1 min-w-0">
                  <h3 className="text-[14px] font-black" style={{
                    color: '#F2EEDC'
                  }}>{reg.teamName}</h3>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <MapPin size={9} style={{
                      color: '#8A938C'
                    }} />
                    <span className="text-[9px] font-bold" style={{
                      color: '#8A938C'
                    }}>{reg.city}</span>
                  </div>
                </div>
                <div className="px-2.5 py-1 rounded-[8px]" style={{
                  background: reg.status === 'pending' ? 'rgba(244,197,66,0.1)' : reg.status === 'validated' ? 'rgba(183,255,26,0.1)' : 'rgba(217,75,91,0.1)',
                  border: `1px solid ${reg.status === 'pending' ? 'rgba(244,197,66,0.2)' : reg.status === 'validated' ? 'rgba(183,255,26,0.2)' : 'rgba(217,75,91,0.2)'}`
                }}>
                  <span className="text-[8px] font-black uppercase tracking-wider" style={{
                    color: reg.status === 'pending' ? '#F4C542' : reg.status === 'validated' ? '#B7FF1A' : '#D94B5B'
                  }}>
                    {reg.status === 'pending' ? 'En attente' : reg.status === 'validated' ? 'Validée' : 'Refusée'}
                  </span>
                </div>
              </div>

              {/* Stats row */}
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center gap-1">
                  <Users size={10} style={{
                    color: '#8A938C'
                  }} />
                  <span className="text-[10px] font-bold" style={{
                    color: reg.players >= 10 ? '#D7DBC8' : '#D94B5B'
                  }}>{reg.players} joueurs</span>
                  {reg.players < 10 && <span className="text-[8px] font-black px-1 rounded" style={{
                    background: 'rgba(217,75,91,0.12)',
                    color: '#D94B5B'
                  }}>min. 10</span>}
                </div>
                <div className="flex items-center gap-1">
                  <Clock size={10} style={{
                    color: '#8A938C'
                  }} />
                  <span className="text-[10px] font-bold" style={{
                    color: '#8A938C'
                  }}>{reg.submittedAt}</span>
                </div>
              </div>

              {/* Code & contact */}
              <div className="flex flex-col gap-1.5 px-3 py-3 rounded-[12px] mb-4" style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.05)'
              }}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[8px] font-black uppercase tracking-[0.1em]" style={{
                      color: '#8A938C'
                    }}>Code</span>
                    <span className="text-[11px] font-black tracking-wide" style={{
                      color: '#B7FF1A'
                    }}>{reg.code}</span>
                  </div>
                </div>
                <div className="h-px" style={{
                  background: 'rgba(255,255,255,0.04)'
                }} />
                <div className="flex items-center gap-1.5">
                  <span className="text-[8px] font-black uppercase tracking-[0.1em]" style={{
                    color: '#8A938C'
                  }}>Contact</span>
                  <span className="text-[10px] font-bold" style={{
                    color: '#D7DBC8'
                  }}>{reg.captain}</span>
                </div>
              </div>

              {/* Actions */}
              {reg.status === 'pending' && <div className="flex gap-2">
                <button onClick={() => handleRefuse(reg.id)} className="flex-1 py-2.5 rounded-[12px] flex items-center justify-center gap-1.5 text-[10px] font-black uppercase tracking-wider" style={{
                  background: 'rgba(217,75,91,0.1)',
                  border: '1px solid rgba(217,75,91,0.2)',
                  color: '#D94B5B'
                }}>
                  <XCircle size={12} />
                  <span>Refuser</span>
                </button>
                <button onClick={() => handleValidate(reg.id)} className="flex-1 py-2.5 rounded-[12px] flex items-center justify-center gap-1.5 text-[10px] font-black uppercase tracking-wider" style={{
                  background: '#B7FF1A',
                  color: '#0B221C'
                }}>
                  <CheckCircle size={12} />
                  <span>Valider</span>
                </button>
              </div>}
            </div>
          </div>;
        })}
      </div>}

      {/* ── MATCHES ── */}
      {activeSection === 'matches' && <div className="flex flex-col gap-4 p-4">

        {/* Create match CTA */}
        <button className="w-full py-3.5 rounded-[16px] flex items-center justify-center gap-2 text-[12px] font-black uppercase tracking-wider" style={{
          background: '#B7FF1A',
          color: '#0B221C'
        }}>
          <Plus size={15} />
          <span>Créer un match</span>
        </button>

        {/* Filters row */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-1.5 overflow-x-auto" style={{
            scrollbarWidth: 'none'
          }}>
            {MATCH_FILTER_TABS.map(tab => <button key={tab.id} onClick={() => setMatchFilter(tab.id)} className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-wide transition-all" style={matchFilter === tab.id ? {
              background: 'rgba(183,255,26,0.12)',
              color: '#B7FF1A',
              border: '1px solid rgba(183,255,26,0.2)'
            } : {
              background: 'rgba(255,255,255,0.04)',
              color: '#8A938C',
              border: '1px solid rgba(255,255,255,0.06)'
            }}>
              <span>{tab.label}</span>
              {tab.id === 'awaiting_score' && awaitingScoreCount > 0 && <span className="w-3.5 h-3.5 rounded-full flex items-center justify-center text-[7px] font-black" style={{
                background: '#F4C542',
                color: '#0B221C'
              }}>{awaitingScoreCount}</span>}
              {tab.id === 'live' && liveMatches.length > 0 && <span className="w-3.5 h-3.5 rounded-full flex items-center justify-center text-[7px] font-black" style={{
                background: '#D94B5B',
                color: '#F2EEDC'
              }}>{liveMatches.length}</span>}
            </button>)}
          </div>
          <div className="flex items-center gap-1.5">
            {([{
              id: 'all',
              label: 'Toutes dates'
            }, {
              id: 'today',
              label: "Aujourd'hui"
            }, {
              id: 'week',
              label: 'Cette semaine'
            }] as Array<{
              id: MatchDateFilter;
              label: string;
            }>).map(opt => <button key={opt.id} onClick={() => setMatchDateFilter(opt.id)} className="flex-shrink-0 px-3 py-1 rounded-full text-[9px] font-black transition-all" style={matchDateFilter === opt.id ? {
              background: 'rgba(123,167,217,0.12)',
              color: '#7BA7D9',
              border: '1px solid rgba(123,167,217,0.2)'
            } : {
              background: 'rgba(255,255,255,0.03)',
              color: '#8A938C',
              border: '1px solid rgba(255,255,255,0.05)'
            }}>
              <span>{opt.label}</span>
            </button>)}
          </div>
        </div>

        {/* Group: En Direct */}
        {liveMatches.length > 0 && <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="flex items-center gap-1.5 px-2 py-1 rounded-full" style={{
              background: 'rgba(217,75,91,0.1)',
              border: '1px solid rgba(217,75,91,0.2)'
            }}>
              <div className="w-1.5 h-1.5 rounded-full" style={{
                background: '#D94B5B',
                boxShadow: '0 0 5px #D94B5B'
              }} />
              <span className="text-[9px] font-black uppercase tracking-wider" style={{
                color: '#D94B5B'
              }}>En Direct</span>
            </div>
            <span className="text-[8px] font-bold" style={{
              color: '#8A938C'
            }}>{liveMatches.length} match{liveMatches.length > 1 ? 's' : ''}</span>
          </div>
          <div className="flex flex-col gap-2">
            {liveMatches.map(match => <button key={match.id} onClick={() => setScoreMatch(match)} className="w-full rounded-[18px] overflow-hidden text-left transition-all active:scale-[0.99]" style={{
              background: '#123129',
              border: '1px solid rgba(217,75,91,0.2)'
            }}>
              <div className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full" style={{
                      background: '#D94B5B',
                      boxShadow: '0 0 4px #D94B5B'
                    }} />
                    <span className="text-[8px] font-black uppercase tracking-wide" style={{
                      color: '#D94B5B'
                    }}>Live</span>
                    {match.time && <span className="text-[8px] font-bold" style={{
                      color: '#8A938C'
                    }}>{match.time}'</span>}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button className="w-7 h-7 rounded-[8px] flex items-center justify-center" style={{
                      background: 'rgba(255,255,255,0.05)'
                    }} aria-label="Voir le match"><Eye size={11} style={{
                        color: '#8A938C'
                      }} /></button>
                    <button className="w-7 h-7 rounded-[8px] flex items-center justify-center" style={{
                      background: 'rgba(255,255,255,0.05)'
                    }} aria-label="Modifier le match"><Edit3 size={11} style={{
                        color: '#8A938C'
                      }} /></button>
                  </div>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[13px] font-black" style={{
                    color: '#F2EEDC'
                  }}>{match.home}</span>
                  <span className="text-[22px] font-black tracking-tight" style={{
                    color: '#D94B5B'
                  }}>{match.homeScore}–{match.awayScore}</span>
                  <span className="text-[13px] font-black" style={{
                    color: '#D7DBC8'
                  }}>{match.away}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <MapPin size={9} style={{
                      color: '#8A938C'
                    }} />
                    <span className="text-[9px] font-bold" style={{
                      color: '#8A938C'
                    }}>{match.venue}</span>
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-[9px]" style={{
                    background: 'rgba(183,255,26,0.08)',
                    border: '1px solid rgba(183,255,26,0.15)'
                  }}>
                    <Edit3 size={10} style={{
                      color: '#B7FF1A'
                    }} />
                    <span className="text-[9px] font-black" style={{
                      color: '#B7FF1A'
                    }}>Mettre à jour</span>
                  </div>
                </div>
              </div>
            </button>)}
          </div>
        </div>}

        {/* Group: À venir */}
        {upcomingMatches.length > 0 && <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="flex items-center gap-1.5 px-2 py-1 rounded-full" style={{
              background: 'rgba(123,167,217,0.1)',
              border: '1px solid rgba(123,167,217,0.18)'
            }}>
              <Clock size={9} style={{
                color: '#7BA7D9'
              }} />
              <span className="text-[9px] font-black uppercase tracking-wider" style={{
                color: '#7BA7D9'
              }}>À venir</span>
            </div>
            <span className="text-[8px] font-bold" style={{
              color: '#8A938C'
            }}>{upcomingMatches.length} match{upcomingMatches.length > 1 ? 's' : ''}</span>
          </div>
          <div className="flex flex-col gap-2">
            {upcomingMatches.map(match => <div key={match.id} className="rounded-[18px] overflow-hidden" style={{
              background: '#123129',
              border: '1px solid rgba(255,255,255,0.05)'
            }}>
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[8px] font-black uppercase px-2 py-0.5 rounded-md" style={{
                    background: 'rgba(123,167,217,0.1)',
                    color: '#7BA7D9'
                  }}>Programmé</span>
                  <div className="flex items-center gap-1.5">
                    <button className="w-7 h-7 rounded-[8px] flex items-center justify-center" style={{
                      background: 'rgba(255,255,255,0.05)'
                    }} aria-label="Voir"><Eye size={11} style={{
                        color: '#8A938C'
                      }} /></button>
                    <button className="w-7 h-7 rounded-[8px] flex items-center justify-center" style={{
                      background: 'rgba(255,255,255,0.05)'
                    }} aria-label="Modifier"><Edit3 size={11} style={{
                        color: '#8A938C'
                      }} /></button>
                  </div>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[13px] font-black" style={{
                    color: '#F2EEDC'
                  }}>{match.home}</span>
                  <div className="flex flex-col items-center">
                    <span className="text-[18px] font-black tracking-tight" style={{
                      color: '#D7DBC8'
                    }}>—</span>
                    <span className="text-[8px] font-bold" style={{
                      color: '#8A938C'
                    }}>{match.date}</span>
                  </div>
                  <span className="text-[13px] font-black" style={{
                    color: '#D7DBC8'
                  }}>{match.away}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin size={9} style={{
                    color: '#8A938C'
                  }} />
                  <span className="text-[9px] font-bold" style={{
                    color: '#8A938C'
                  }}>{match.venue}</span>
                </div>
              </div>
            </div>)}
          </div>
        </div>}

        {/* Group: À traiter */}
        {toHandleMatches.length > 0 && <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="flex items-center gap-1.5 px-2 py-1 rounded-full" style={{
              background: 'rgba(244,197,66,0.1)',
              border: '1px solid rgba(244,197,66,0.2)'
            }}>
              <AlertTriangle size={9} style={{
                color: '#F4C542'
              }} />
              <span className="text-[9px] font-black uppercase tracking-wider" style={{
                color: '#F4C542'
              }}>À traiter</span>
            </div>
            <span className="text-[8px] font-bold" style={{
              color: '#8A938C'
            }}>{toHandleMatches.length} match{toHandleMatches.length > 1 ? 's' : ''}</span>
          </div>
          <div className="flex flex-col gap-2">
            {toHandleMatches.map(match => {
              const isPendingValidation = match.status === 'score_pending_validation';
              const statusMeta = MATCH_STATUS_META[match.status];
              return <button key={match.id} onClick={() => setScoreMatch(match)} className="w-full rounded-[18px] overflow-hidden text-left transition-all active:scale-[0.99]" style={{
                background: '#123129',
                border: `1px solid ${isPendingValidation ? 'rgba(201,193,162,0.15)' : 'rgba(244,197,66,0.18)'}`
              }}>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[8px] font-black uppercase px-2 py-0.5 rounded-md" style={{
                      background: statusMeta.bg,
                      color: statusMeta.color
                    }}>{statusMeta.label}</span>
                    <div className="flex items-center gap-1.5">
                      <button className="w-7 h-7 rounded-[8px] flex items-center justify-center" style={{
                        background: 'rgba(255,255,255,0.05)'
                      }} aria-label="Voir" onClick={e => e.stopPropagation()}><Eye size={11} style={{
                          color: '#8A938C'
                        }} /></button>
                      <button className="w-7 h-7 rounded-[8px] flex items-center justify-center" style={{
                        background: 'rgba(255,255,255,0.05)'
                      }} aria-label="Modifier" onClick={e => e.stopPropagation()}><Edit3 size={11} style={{
                          color: '#8A938C'
                        }} /></button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[13px] font-black" style={{
                      color: '#F2EEDC'
                    }}>{match.home}</span>
                    <div className="flex flex-col items-center">
                      <span className="text-[18px] font-black tracking-tight" style={{
                        color: isPendingValidation ? '#C9C1A2' : '#D7DBC8'
                      }}>
                        {match.homeScore !== undefined ? `${match.homeScore}–${match.awayScore}` : '—'}
                      </span>
                      <span className="text-[8px] font-bold" style={{
                        color: '#8A938C'
                      }}>{match.date}</span>
                    </div>
                    <span className="text-[13px] font-black" style={{
                      color: '#D7DBC8'
                    }}>{match.away}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <MapPin size={9} style={{
                        color: '#8A938C'
                      }} />
                      <span className="text-[9px] font-bold" style={{
                        color: '#8A938C'
                      }}>{match.venue}</span>
                    </div>
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-[9px]" style={{
                      background: isPendingValidation ? 'rgba(201,193,162,0.08)' : 'rgba(183,255,26,0.08)',
                      border: `1px solid ${isPendingValidation ? 'rgba(201,193,162,0.15)' : 'rgba(183,255,26,0.15)'}`
                    }}>
                      <Edit3 size={10} style={{
                        color: isPendingValidation ? '#C9C1A2' : '#B7FF1A'
                      }} />
                      <span className="text-[9px] font-black" style={{
                        color: isPendingValidation ? '#C9C1A2' : '#B7FF1A'
                      }}>{isPendingValidation ? 'Valider score' : 'Saisir le score'}</span>
                    </div>
                  </div>
                </div>
              </button>;
            })}
          </div>
        </div>}

        {filteredMatches.length === 0 && <div className="flex flex-col items-center justify-center py-12 rounded-[18px]" style={{
          background: '#123129',
          border: '1px solid rgba(255,255,255,0.05)'
        }}>
          <Calendar size={28} style={{
            color: '#8A938C',
            marginBottom: 12
          }} />
          <p className="text-[13px] font-black mb-1" style={{
            color: '#8A938C'
          }}>Aucun match</p>
          <p className="text-[10px]" style={{
            color: '#8A938C'
          }}>dans ces filtres</p>
        </div>}
      </div>}

      {/* ── SCORES & STATS ── */}
      {activeSection === 'scores' && <div className="flex flex-col gap-4 p-4">

        {/* Health banner */}
        <div className="rounded-[18px] px-4 py-4" style={{
          background: '#123129',
          border: '1px solid rgba(255,255,255,0.05)'
        }}>
          <div className="flex items-center justify-between mb-3">
            <p className="text-[9px] font-black uppercase tracking-[0.15em]" style={{
              color: '#8A938C'
            }}>Centre de résultats officiels</p>
            <button onClick={handleRecalc} className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-[9px] text-[9px] font-black" style={{
              background: 'rgba(183,255,26,0.08)',
              border: '1px solid rgba(183,255,26,0.15)',
              color: '#B7FF1A'
            }}>
              <motion.div animate={recalcPulse ? {
                rotate: 360
              } : {
                rotate: 0
              }} transition={{
                duration: 0.6
              }}>
                <RefreshCw size={10} />
              </motion.div>
              <span>Recalculer</span>
            </button>
          </div>
          <div className="grid grid-cols-3 gap-2 mb-3">
            {[{
              label: 'Saisis',
              value: `${totalScored}`,
              sub: `/ ${SCORE_RECORDS.length}`,
              color: '#B7FF1A'
            }, {
              label: 'En attente',
              value: `${awaitingScores}`,
              sub: 'scores',
              color: '#F4C542'
            }, {
              label: 'Corrigés',
              value: `${correctedScores}`,
              sub: 'ce mois',
              color: '#7BA7D9'
            }].map(kpi => <div key={kpi.label} className="flex flex-col gap-0.5 px-3 py-2.5 rounded-[12px]" style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.05)'
            }}>
              <p className="text-[8px] font-black uppercase tracking-[0.1em]" style={{
                color: '#8A938C'
              }}>{kpi.label}</p>
              <div className="flex items-baseline gap-0.5">
                <span className="text-[20px] font-black leading-none" style={{
                  color: kpi.color
                }}>{kpi.value}</span>
                <span className="text-[8px] font-bold" style={{
                  color: '#8A938C'
                }}>{kpi.sub}</span>
              </div>
            </div>)}
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full" style={{
                background: '#2E8F57'
              }} />
              <span className="text-[9px] font-bold" style={{
                color: '#8A938C'
              }}>Dernier recalcul : {lastRecalc}</span>
            </div>
            <button onClick={() => setActiveSection('matches')} className="flex items-center gap-1 text-[9px] font-black" style={{
              color: '#F4C542'
            }}>
              <span>{awaitingScores} manquants</span>
              <ArrowRight size={9} />
            </button>
          </div>
        </div>

        {/* Main tab switcher */}
        <div className="flex items-center p-1 rounded-[14px]" style={{
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.06)'
        }}>
          {STATS_TABS.map(tab => <button key={tab.id} onClick={() => setStatsView(tab.id)} className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-[11px] text-[9px] font-black uppercase tracking-wide transition-all" style={statsView === tab.id ? {
            background: 'rgba(183,255,26,0.1)',
            color: '#B7FF1A',
            border: '1px solid rgba(183,255,26,0.18)'
          } : {
            color: '#8A938C'
          }}>
            {tab.icon}
            <span>{tab.label}</span>
          </button>)}
        </div>

        {/* ─── RÉSULTATS VIEW ─── */}
        {statsView === 'results' && <div className="flex flex-col gap-3">
          <div className="flex items-center gap-1.5 overflow-x-auto" style={{
            scrollbarWidth: 'none'
          }}>
            {SCORE_TAB_FILTERS.map(f => <button key={f.id} onClick={() => setScoreTabFilter(f.id)} className="flex-shrink-0 px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-wide transition-all" style={scoreTabFilter === f.id ? {
              background: 'rgba(183,255,26,0.12)',
              color: '#B7FF1A',
              border: '1px solid rgba(183,255,26,0.2)'
            } : {
              background: 'rgba(255,255,255,0.04)',
              color: '#8A938C',
              border: '1px solid rgba(255,255,255,0.05)'
            }}>
              <span>{f.label}</span>
              {f.id === 'awaiting' && awaitingScores > 0 && <span className="ml-1.5 px-1 rounded-sm" style={{
                background: '#F4C542',
                color: '#0B221C',
                fontSize: '7px',
                fontWeight: 900
              }}>{awaitingScores}</span>}
            </button>)}
          </div>
          <div className="flex items-center gap-1.5 overflow-x-auto" style={{
            scrollbarWidth: 'none'
          }}>
            {PHASE_FILTERS.map(f => <button key={f.id} onClick={() => setPhaseFilter(f.id)} className="flex-shrink-0 px-3 py-1 rounded-full text-[9px] font-black transition-all" style={phaseFilter === f.id ? {
              background: 'rgba(123,167,217,0.12)',
              color: '#7BA7D9',
              border: '1px solid rgba(123,167,217,0.2)'
            } : {
              background: 'rgba(255,255,255,0.03)',
              color: '#8A938C',
              border: '1px solid rgba(255,255,255,0.05)'
            }}>
              <span>{f.label}</span>
            </button>)}
          </div>
          {filteredScoreRecords.map(record => {
            const meta = SCORE_STATUS_META[record.status];
            return <div key={record.id} className="rounded-[18px] overflow-hidden" style={{
              background: '#123129',
              border: `1px solid ${meta.border}`
            }}>
              <div className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[8px] font-black uppercase tracking-wider px-2 py-0.5 rounded-[6px]" style={{
                      background: meta.bg,
                      color: meta.color
                    }}>{meta.label}</span>
                    <span className="text-[8px] font-bold px-1.5 py-0.5 rounded-[6px]" style={{
                      background: 'rgba(255,255,255,0.04)',
                      color: '#8A938C'
                    }}>J{record.journee}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    {record.classementUpdated && <div className="flex items-center gap-1" title="Classement mis à jour">
                      <CheckCheck size={9} style={{
                        color: '#2E8F57'
                      }} />
                      <span className="text-[7px] font-black uppercase" style={{
                        color: '#2E8F57'
                      }}>Classement ✓</span>
                    </div>}
                    <span className="text-[8px] font-bold" style={{
                      color: '#8A938C'
                    }}>{record.date}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="flex-1 text-[13px] font-black text-right leading-none" style={{
                    color: '#F2EEDC'
                  }}>{record.home}</span>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-[10px]" style={{
                    background: record.status === 'awaiting' ? 'rgba(244,197,66,0.06)' : 'rgba(255,255,255,0.06)',
                    border: `1px solid ${record.status === 'awaiting' ? 'rgba(244,197,66,0.12)' : 'rgba(255,255,255,0.08)'}`
                  }}>
                    {record.status === 'awaiting' ? <span className="text-[14px] font-black tracking-widest" style={{
                      color: '#F4C542'
                    }}>?–?</span> : <span className="text-[18px] font-black tracking-tight" style={{
                      color: '#F2EEDC'
                    }}>{record.homeScore}–{record.awayScore}</span>}
                  </div>
                  <span className="flex-1 text-[13px] font-black leading-none" style={{
                    color: '#D7DBC8'
                  }}>{record.away}</span>
                </div>
                {record.scorers.length > 0 && <div className="flex flex-wrap gap-1 mb-3">
                  {record.scorers.map(scorer => <span key={scorer} className="text-[8px] font-bold px-2 py-0.5 rounded-full" style={{
                    background: 'rgba(183,255,26,0.06)',
                    color: '#8A938C',
                    border: '1px solid rgba(183,255,26,0.1)'
                  }}>{scorer}</span>)}
                </div>}
                <div className="flex items-center justify-between pt-2" style={{
                  borderTop: '1px solid rgba(255,255,255,0.04)'
                }}>
                  <button onClick={() => setActiveSection('matches')} className="flex items-center gap-1 text-[9px] font-bold" style={{
                    color: '#8A938C'
                  }}>
                    <ExternalLink size={9} />
                    <span>Fiche match</span>
                  </button>
                  <div className="flex items-center gap-1.5">
                    {record.status === 'awaiting' && <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-[9px] text-[9px] font-black" style={{
                      background: 'rgba(183,255,26,0.1)',
                      border: '1px solid rgba(183,255,26,0.2)',
                      color: '#B7FF1A'
                    }}>
                      <Edit3 size={9} />
                      <span>Saisir</span>
                    </button>}
                    {(record.status === 'validated' || record.status === 'corrected') && <button onClick={() => setCorrectRecord(record)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-[9px] text-[9px] font-black" style={{
                      background: 'rgba(123,167,217,0.08)',
                      border: '1px solid rgba(123,167,217,0.15)',
                      color: '#7BA7D9'
                    }}>
                      <RotateCcw size={9} />
                      <span>Corriger</span>
                    </button>}
                  </div>
                </div>
              </div>
            </div>;
          })}
          {filteredScoreRecords.length === 0 && <div className="flex flex-col items-center justify-center py-12 rounded-[18px]" style={{
            background: '#123129',
            border: '1px solid rgba(255,255,255,0.05)'
          }}>
            <BarChart3 size={28} style={{
              color: '#8A938C',
              marginBottom: 12
            }} />
            <p className="text-[13px] font-black mb-1" style={{
              color: '#8A938C'
            }}>Aucun résultat</p>
            <p className="text-[10px]" style={{
              color: '#8A938C'
            }}>dans ces filtres</p>
          </div>}
        </div>}

        {/* ─── ÉQUIPES VIEW ─── */}
        {statsView === 'teams' && <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between px-1">
            <p className="text-[9px] font-black uppercase tracking-[0.15em]" style={{
              color: '#8A938C'
            }}>Classement général — Saison 24/25</p>
            <button className="flex items-center gap-1 text-[9px] font-black" style={{
              color: '#B7FF1A'
            }}>
              <Activity size={9} />
              <span>Live</span>
            </button>
          </div>
          <div className="grid gap-1.5 px-3 py-2 rounded-[10px]" style={{
            gridTemplateColumns: '24px 1fr 28px 28px 28px 28px 28px 28px 32px',
            background: 'rgba(255,255,255,0.03)'
          }}>
            <span className="text-[7px] font-black uppercase text-center" style={{
              color: '#8A938C'
            }}>#</span>
            <span className="text-[7px] font-black uppercase" style={{
              color: '#8A938C'
            }}>Équipe</span>
            <span className="text-[7px] font-black uppercase text-center" style={{
              color: '#8A938C'
            }}>J</span>
            <span className="text-[7px] font-black uppercase text-center" style={{
              color: '#8A938C'
            }}>G</span>
            <span className="text-[7px] font-black uppercase text-center" style={{
              color: '#8A938C'
            }}>N</span>
            <span className="text-[7px] font-black uppercase text-center" style={{
              color: '#8A938C'
            }}>P</span>
            <span className="text-[7px] font-black uppercase text-center" style={{
              color: '#8A938C'
            }}>BP</span>
            <span className="text-[7px] font-black uppercase text-center" style={{
              color: '#8A938C'
            }}>Diff</span>
            <span className="text-[7px] font-black uppercase text-center" style={{
              color: '#B7FF1A'
            }}>Pts</span>
          </div>
          {TEAM_STATS.map((row, idx) => <div key={row.id} className="grid items-center gap-1.5 px-3 py-3 rounded-[14px]" style={{
            gridTemplateColumns: '24px 1fr 28px 28px 28px 28px 28px 28px 32px',
            background: '#123129',
            border: `1px solid ${idx === 0 ? 'rgba(183,255,26,0.12)' : 'rgba(255,255,255,0.04)'}`
          }}>
            <span className="text-[10px] font-black text-center" style={{
              color: idx === 0 ? '#B7FF1A' : '#8A938C'
            }}>{row.rank}</span>
            <div className="flex items-center gap-1.5 min-w-0">
              <div className="w-2 h-2 rounded-full flex-shrink-0" style={{
                background: row.color
              }} />
              <span className="text-[10px] font-black truncate" style={{
                color: '#F2EEDC'
              }}>{row.team}</span>
            </div>
            <span className="text-[10px] font-bold text-center" style={{
              color: '#8A938C'
            }}>{row.played}</span>
            <span className="text-[10px] font-bold text-center" style={{
              color: '#B7FF1A'
            }}>{row.wins}</span>
            <span className="text-[10px] font-bold text-center" style={{
              color: '#8A938C'
            }}>{row.draws}</span>
            <span className="text-[10px] font-bold text-center" style={{
              color: '#D94B5B'
            }}>{row.losses}</span>
            <span className="text-[10px] font-bold text-center" style={{
              color: '#D7DBC8'
            }}>{row.gf}</span>
            <span className="text-[10px] font-bold text-center" style={{
              color: row.gd >= 0 ? '#B7FF1A' : '#D94B5B'
            }}>{row.gd > 0 ? `+${row.gd}` : row.gd}</span>
            <span className="text-[11px] font-black text-center" style={{
              color: '#B7FF1A'
            }}>{row.points}</span>
          </div>)}
          <div className="flex items-center justify-between px-4 py-3 rounded-[14px]" style={{
            background: 'rgba(183,255,26,0.04)',
            border: '1px solid rgba(183,255,26,0.1)'
          }}>
            <p className="text-[9px] font-bold" style={{
              color: '#8A938C'
            }}>Ces stats alimentent le classement public en temps réel.</p>
            <ArrowRight size={12} style={{
              color: '#B7FF1A',
              flexShrink: 0
            }} />
          </div>
        </div>}

        {/* ─── JOUEURS VIEW ─── */}
        {statsView === 'players' && <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2 overflow-x-auto pb-1" style={{
            scrollbarWidth: 'none'
          }}>
            {[{
              label: 'Buteurs',
              active: true
            }, {
              label: 'Passeurs',
              active: false
            }, {
              label: 'Clean Sheets',
              active: false
            }].map(cat => <button key={cat.label} className="flex-shrink-0 px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-wide" style={cat.active ? {
              background: 'rgba(183,255,26,0.12)',
              color: '#B7FF1A',
              border: '1px solid rgba(183,255,26,0.2)'
            } : {
              background: 'rgba(255,255,255,0.04)',
              color: '#8A938C',
              border: '1px solid rgba(255,255,255,0.05)'
            }}>
              <span>{cat.label}</span>
            </button>)}
          </div>
          {PLAYER_STATS.map(player => <div key={player.id} className="flex items-center gap-3 px-4 py-3.5 rounded-[16px]" style={{
            background: '#123129',
            border: `1px solid ${player.rank <= 3 ? 'rgba(183,255,26,0.08)' : 'rgba(255,255,255,0.04)'}`
          }}>
            <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0" style={{
              background: player.rank === 1 ? 'rgba(183,255,26,0.15)' : player.rank === 2 ? 'rgba(201,193,162,0.12)' : player.rank === 3 ? 'rgba(244,197,66,0.1)' : 'rgba(255,255,255,0.05)'
            }}>
              <span className="text-[10px] font-black" style={{
                color: player.rank === 1 ? '#B7FF1A' : player.rank === 2 ? '#C9C1A2' : player.rank === 3 ? '#F4C542' : '#8A938C'
              }}>{player.rank}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[12px] font-black" style={{
                color: '#F2EEDC'
              }}>{player.name}</p>
              <div className="flex items-center gap-1 mt-0.5">
                <div className="w-1.5 h-1.5 rounded-full" style={{
                  background: player.teamColor
                }} />
                <span className="text-[9px] font-bold" style={{
                  color: '#8A938C'
                }}>{player.team}</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex flex-col items-center">
                <span className="text-[18px] font-black leading-none" style={{
                  color: '#B7FF1A'
                }}>{player.goals}</span>
                <span className="text-[7px] font-black uppercase" style={{
                  color: '#8A938C'
                }}>buts</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-[14px] font-black leading-none" style={{
                  color: '#7BA7D9'
                }}>{player.assists}</span>
                <span className="text-[7px] font-black uppercase" style={{
                  color: '#8A938C'
                }}>passes</span>
              </div>
            </div>
          </div>)}
          <div className="flex items-center justify-between px-4 py-3 rounded-[14px]" style={{
            background: 'rgba(123,167,217,0.04)',
            border: '1px solid rgba(123,167,217,0.1)'
          }}>
            <p className="text-[9px] font-bold" style={{
              color: '#8A938C'
            }}>Stats alimentées par les résultats validés.</p>
            <ArrowRight size={12} style={{
              color: '#7BA7D9',
              flexShrink: 0
            }} />
          </div>
        </div>}
      </div>}

      {/* ── GROUPS / POULES ── */}
      {activeSection === 'groups' && <div className="flex flex-col gap-4 p-4">

        {/* ── STATE: CONFIRMED ── */}
        {groupsState === 'confirmed' && <div className="flex flex-col gap-4">

          {/* Confirmed banner */}
          <div className="flex items-center gap-3 px-4 py-4 rounded-[18px]" style={{
            background: 'linear-gradient(135deg, rgba(46,143,87,0.15) 0%, rgba(183,255,26,0.06) 100%)',
            border: '1px solid rgba(183,255,26,0.2)'
          }}>
            <div className="w-10 h-10 rounded-[13px] flex items-center justify-center flex-shrink-0" style={{
              background: 'rgba(183,255,26,0.15)',
              border: '1px solid rgba(183,255,26,0.3)'
            }}>
              <CheckCircle size={18} style={{
                color: '#B7FF1A'
              }} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[12px] font-black" style={{
                color: '#F2EEDC'
              }}>Poules confirmées et publiées</p>
              <p className="text-[9px] font-semibold mt-0.5" style={{
                color: '#8A938C'
              }}>
                <span>{pools.length} poules · {validatedTeamCount} équipes réparties</span>
              </p>
            </div>
          </div>

          {/* Transition links */}
          <div className="flex flex-col gap-2">
            <p className="text-[9px] font-black uppercase tracking-[0.18em]" style={{
              color: '#8A938C'
            }}>Prochaines étapes</p>
            <button onClick={() => setActiveSection('matches')} className="flex items-center gap-4 px-4 py-3.5 rounded-[16px] w-full text-left" style={{
              background: '#123129',
              border: '1px solid rgba(183,255,26,0.1)'
            }}>
              <div className="w-9 h-9 rounded-[11px] flex items-center justify-center flex-shrink-0" style={{
                background: 'rgba(183,255,26,0.1)',
                border: '1px solid rgba(183,255,26,0.2)'
              }}>
                <Calendar size={16} style={{
                  color: '#B7FF1A'
                }} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[12px] font-black" style={{
                  color: '#F2EEDC'
                }}>Générer le calendrier</p>
                <p className="text-[9px] font-semibold mt-0.5" style={{
                  color: '#8A938C'
                }}>Phase de groupes · Matchs aller-retour</p>
              </div>
              <ArrowRight size={14} style={{
                color: '#B7FF1A',
                flexShrink: 0
              }} />
            </button>
            <button onClick={() => setActiveSection('scores')} className="flex items-center gap-4 px-4 py-3.5 rounded-[16px] w-full text-left" style={{
              background: '#123129',
              border: '1px solid rgba(123,167,217,0.08)'
            }}>
              <div className="w-9 h-9 rounded-[11px] flex items-center justify-center flex-shrink-0" style={{
                background: 'rgba(123,167,217,0.1)',
                border: '1px solid rgba(123,167,217,0.2)'
              }}>
                <BarChart3 size={16} style={{
                  color: '#7BA7D9'
                }} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[12px] font-black" style={{
                  color: '#F2EEDC'
                }}>Classement par poule</p>
                <p className="text-[9px] font-semibold mt-0.5" style={{
                  color: '#8A938C'
                }}>Disponible après les premiers matchs</p>
              </div>
              <ArrowRight size={14} style={{
                color: '#7BA7D9',
                flexShrink: 0
              }} />
            </button>
          </div>

          {/* Confirmed pool summary */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <p className="text-[9px] font-black uppercase tracking-[0.18em]" style={{
                color: '#8A938C'
              }}>Résumé des poules</p>
              <button onClick={() => setGroupsState('generated')} className="flex items-center gap-1.5 px-3 py-1.5 rounded-[9px] text-[9px] font-black" style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                color: '#8A938C'
              }}>
                <Edit3 size={9} />
                <span>Modifier</span>
              </button>
            </div>
            {pools.map(pool => <div key={pool.id} className="rounded-[16px] overflow-hidden" style={{
              background: '#123129',
              border: '1px solid rgba(255,255,255,0.05)'
            }}>
              <div className="flex items-center gap-3 px-4 py-3" style={{
                borderBottom: '1px solid rgba(255,255,255,0.04)'
              }}>
                <div className="w-7 h-7 rounded-[9px] flex items-center justify-center flex-shrink-0" style={{
                  background: 'rgba(183,255,26,0.1)',
                  border: '1px solid rgba(183,255,26,0.2)'
                }}>
                  <span className="text-[11px] font-black" style={{
                    color: '#B7FF1A'
                  }}>{pool.label}</span>
                </div>
                <span className="text-[12px] font-black" style={{
                  color: '#F2EEDC'
                }}>
                  <span>Poule </span><span>{pool.label}</span>
                </span>
                <span className="ml-auto text-[9px] font-bold" style={{
                  color: '#8A938C'
                }}>
                  <span>{pool.teams.length} équipe{pool.teams.length !== 1 ? 's' : ''}</span>
                </span>
              </div>
              <div className="px-4 py-2">
                {pool.teams.map((team, ti) => <div key={team.id} className="flex items-center gap-2.5 py-2" style={{
                  borderBottom: ti < pool.teams.length - 1 ? '1px solid rgba(255,255,255,0.03)' : 'none'
                }}>
                  <div className="w-2 h-2 rounded-full flex-shrink-0" style={{
                    background: team.color
                  }} />
                  <span className="text-[11px] font-black" style={{
                    color: '#D7DBC8'
                  }}>{team.name}</span>
                  <span className="ml-auto text-[8px] font-bold" style={{
                    color: '#8A938C'
                  }}>{team.city}</span>
                </div>)}
              </div>
            </div>)}
          </div>
        </div>}

        {/* ── STATE: GENERATED ── */}
        {groupsState === 'generated' && <div className="flex flex-col gap-4">

          {/* Generated header bar */}
          <div className="flex items-center gap-3 px-4 py-3.5 rounded-[16px]" style={{
            background: 'rgba(123,167,217,0.07)',
            border: '1px solid rgba(123,167,217,0.15)'
          }}>
            <div className="w-2 h-2 rounded-full flex-shrink-0" style={{
              background: '#7BA7D9'
            }} />
            <p className="flex-1 text-[10px] font-black" style={{
              color: '#7BA7D9'
            }}>
              <span>Poules générées — </span><span>ajustez manuellement si besoin</span>
            </p>
            <span className="text-[9px] font-bold" style={{
              color: '#8A938C'
            }}>
              <span>{validatedTeamCount} équipes · {pools.length} poules</span>
            </span>
          </div>

          {/* Tip */}
          <div className="flex items-start gap-2.5 px-3.5 py-3 rounded-[13px]" style={{
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(255,255,255,0.05)'
          }}>
            <MoveHorizontal size={11} style={{
              color: '#8A938C',
              flexShrink: 0,
              marginTop: 1
            }} />
            <p className="text-[9px] font-semibold leading-relaxed" style={{
              color: '#8A938C'
            }}>
              Appuyez sur une équipe pour la déplacer dans une autre poule. Les équipes verrouillées (têtes de série) ne peuvent pas être bougées.
            </p>
          </div>

          {/* Pool cards */}
          {pools.map(pool => <div key={pool.id} className="rounded-[20px] overflow-hidden" style={{
            background: '#123129',
            border: '1px solid rgba(255,255,255,0.06)'
          }}>
            {/* Pool header */}
            <div className="flex items-center gap-3 px-4 py-3.5" style={{
              borderBottom: '1px solid rgba(255,255,255,0.05)'
            }}>
              <div className="w-8 h-8 rounded-[10px] flex items-center justify-center flex-shrink-0" style={{
                background: 'rgba(183,255,26,0.1)',
                border: '1px solid rgba(183,255,26,0.2)'
              }}>
                <span className="text-[13px] font-black" style={{
                  color: '#B7FF1A'
                }}>{pool.label}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-black" style={{
                  color: '#F2EEDC'
                }}>
                  <span>Poule </span><span>{pool.label}</span>
                </p>
                <p className="text-[9px] font-semibold" style={{
                  color: '#8A938C'
                }}>
                  <span>{pool.teams.length} équipe{pool.teams.length !== 1 ? 's' : ''} · {pool.teams.length} matchs aller-retour à programmer</span>
                </p>
              </div>
            </div>

            {/* Team rows */}
            <div className="px-4 py-2">
              {pool.teams.map((team, ti) => {
                const isSeeded = distributionMode === 'seeded' && team.seed !== undefined && team.seed <= pools.length;
                return <div key={team.id} className="flex items-center gap-3 py-2.5 cursor-pointer" style={{
                  borderBottom: ti < pool.teams.length - 1 ? '1px solid rgba(255,255,255,0.03)' : 'none'
                }} onClick={() => !isSeeded && setMoveTeam({
                  team,
                  poolId: pool.id
                })}>
                  <div className="w-2 h-2 rounded-full flex-shrink-0" style={{
                    background: team.color
                  }} />
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] font-black" style={{
                      color: '#D7DBC8'
                    }}>{team.name}</p>
                    <p className="text-[8px] font-semibold" style={{
                      color: '#8A938C'
                    }}>{team.city}</p>
                  </div>
                  {isSeeded && <div className="flex items-center gap-1 px-2 py-0.5 rounded-[6px]" style={{
                    background: 'rgba(244,197,66,0.1)',
                    border: '1px solid rgba(244,197,66,0.18)'
                  }}>
                    <Star size={8} style={{
                      color: '#F4C542'
                    }} />
                    <span className="text-[7px] font-black uppercase tracking-wide" style={{
                      color: '#F4C542'
                    }}>Tête de série</span>
                  </div>}
                  {!isSeeded && <div className="w-7 h-7 rounded-[8px] flex items-center justify-center flex-shrink-0" style={{
                    background: 'rgba(255,255,255,0.04)'
                  }}>
                    <ArrowUpDown size={10} style={{
                      color: '#8A938C'
                    }} />
                  </div>}
                </div>;
              })}
            </div>
          </div>)}

          {/* Action row */}
          <div className="flex flex-col gap-3 pt-1">
            {/* Warning for regenerate */}
            <AnimatePresence>
              {showGenerateWarning && <motion.div initial={{
                height: 0,
                opacity: 0
              }} animate={{
                height: 'auto',
                opacity: 1
              }} exit={{
                height: 0,
                opacity: 0
              }} transition={{
                duration: 0.2
              }} style={{
                overflow: 'hidden'
              }}>
                <div className="flex flex-col gap-3 p-4 rounded-[16px]" style={{
                  background: 'rgba(244,197,66,0.06)',
                  border: '1px solid rgba(244,197,66,0.2)'
                }}>
                  <div className="flex items-start gap-2">
                    <AlertTriangle size={13} style={{
                      color: '#F4C542',
                      flexShrink: 0,
                      marginTop: 1
                    }} />
                    <p className="text-[10px] font-bold leading-relaxed" style={{
                      color: '#F4C542'
                    }}>
                      Cette action va regénérer l'ensemble des poules. Tous vos ajustements manuels seront perdus.
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => setShowGenerateWarning(false)} className="flex-1 py-2.5 rounded-[11px] text-[10px] font-black uppercase" style={{
                      background: 'rgba(255,255,255,0.05)',
                      color: '#8A938C',
                      border: '1px solid rgba(255,255,255,0.07)'
                    }}>
                      <span>Annuler</span>
                    </button>
                    <button onClick={handleGeneratePools} className="flex-1 py-2.5 rounded-[11px] text-[10px] font-black uppercase flex items-center justify-center gap-1.5" style={{
                      background: '#F4C542',
                      color: '#0B221C'
                    }}>
                      <Shuffle size={11} />
                      <span>Regénérer</span>
                    </button>
                  </div>
                </div>
              </motion.div>}
            </AnimatePresence>

            <div className="flex gap-2">
              <button onClick={handleRegeneratePools} className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-[14px] text-[10px] font-black uppercase tracking-wider" style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                color: '#8A938C'
              }}>
                <Shuffle size={13} />
                <span>Regénérer</span>
              </button>
              <button onClick={handleConfirmPools} className="flex-[2] flex items-center justify-center gap-2 py-3.5 rounded-[14px] text-[11px] font-black uppercase tracking-wider" style={{
                background: confirming ? '#2E8F57' : '#B7FF1A',
                color: '#0B221C'
              }}>
                {confirming ? <CheckCheck size={14} /> : <CheckCircle size={14} />}
                <span>{confirming ? 'Confirmation…' : 'Confirmer les poules'}</span>
              </button>
            </div>
          </div>
        </div>}

        {/* ── STATE: IDLE ── */}
        {groupsState === 'idle' && <div className="flex flex-col gap-4">

          {/* Intro banner */}
          <div className="flex items-center gap-3 px-4 py-3 rounded-[16px]" style={{
            background: 'linear-gradient(135deg, rgba(183,255,26,0.05) 0%, rgba(46,143,87,0.08) 100%)',
            border: '1px solid rgba(183,255,26,0.1)'
          }}>
            <div className="w-9 h-9 rounded-full overflow-hidden flex-shrink-0" style={{
              border: '1.5px solid rgba(183,255,26,0.2)'
            }}>
              <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=80&h=80" alt="Admin Karim B." className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[12px] font-black leading-none" style={{
                color: '#F2EEDC'
              }}>Karim Bensalah</p>
              <p className="text-[9px] font-semibold mt-0.5 leading-relaxed" style={{
                color: '#8A938C'
              }}>
                Générez automatiquement les poules à partir des équipes inscrites et validées.
              </p>
            </div>
          </div>

          {/* Key stats */}
          <div className="grid grid-cols-3 gap-2">
            {[{
              label: 'Équipes validées',
              value: `${validatedTeamCount}`,
              color: '#B7FF1A'
            }, {
              label: 'Poules prévues',
              value: `${poolCount}`,
              color: '#7BA7D9'
            }, {
              label: 'Équipes/poule',
              value: `${teamsPerPool}`,
              color: '#C9C1A2'
            }].map(s => <div key={s.label} className="flex flex-col gap-1.5 px-3 py-3 rounded-[16px]" style={{
              background: '#123129',
              border: '1px solid rgba(255,255,255,0.05)'
            }}>
              <p className="text-[8px] font-black uppercase tracking-[0.12em]" style={{
                color: '#8A938C'
              }}>{s.label}</p>
              <p className="text-[24px] font-black leading-none" style={{
                color: s.color
              }}>{s.value}</p>
            </div>)}
          </div>

          {/* Pool count selector */}
          <div className="rounded-[18px] p-4" style={{
            background: '#123129',
            border: '1px solid rgba(255,255,255,0.05)'
          }}>
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-[10px] font-black" style={{
                  color: '#F2EEDC'
                }}>Nombre de poules</p>
                <p className="text-[9px] font-semibold mt-0.5" style={{
                  color: '#8A938C'
                }}>
                  <span>Calcul auto : {teamsPerPool} équipes/poule</span>
                </p>
              </div>
              <div className="flex items-center gap-1">
                {[2, 3, 4, 5, 6].map(n => <button key={n} onClick={() => setPoolCount(n)} className="w-8 h-8 rounded-[9px] flex items-center justify-center text-[11px] font-black transition-all" style={poolCount === n ? {
                  background: '#B7FF1A',
                  color: '#0B221C'
                } : {
                  background: 'rgba(255,255,255,0.05)',
                  color: '#8A938C',
                  border: '1px solid rgba(255,255,255,0.07)'
                }}>
                  <span>{n}</span>
                </button>)}
              </div>
            </div>
          </div>

          {/* Distribution mode */}
          <div className="rounded-[18px] p-4" style={{
            background: '#123129',
            border: '1px solid rgba(255,255,255,0.05)'
          }}>
            <p className="text-[10px] font-black mb-3" style={{
              color: '#F2EEDC'
            }}>Mode de répartition</p>
            <div className="flex flex-col gap-2">
              {DISTRIBUTION_MODES.map(mode => <button key={mode.id} onClick={() => setDistributionMode(mode.id)} className="flex items-center gap-3 px-4 py-3 rounded-[14px] w-full text-left transition-all" style={distributionMode === mode.id ? {
                background: 'rgba(183,255,26,0.07)',
                border: '1px solid rgba(183,255,26,0.2)'
              } : {
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.06)'
              }}>
                <div className="w-8 h-8 rounded-[10px] flex items-center justify-center flex-shrink-0" style={{
                  background: distributionMode === mode.id ? 'rgba(183,255,26,0.15)' : 'rgba(255,255,255,0.05)',
                  color: distributionMode === mode.id ? '#B7FF1A' : '#8A938C'
                }}>
                  {mode.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] font-black" style={{
                    color: distributionMode === mode.id ? '#F2EEDC' : '#8A938C'
                  }}>{mode.label}</p>
                  <p className="text-[9px] font-semibold mt-0.5 leading-tight" style={{
                    color: '#8A938C'
                  }}>{mode.desc}</p>
                </div>
                <div className="w-4 h-4 rounded-full border flex items-center justify-center flex-shrink-0" style={{
                  borderColor: distributionMode === mode.id ? '#B7FF1A' : 'rgba(255,255,255,0.15)',
                  background: distributionMode === mode.id ? 'rgba(183,255,26,0.2)' : 'transparent'
                }}>
                  {distributionMode === mode.id && <div className="w-2 h-2 rounded-full" style={{
                    background: '#B7FF1A'
                  }} />}
                </div>
              </button>)}
            </div>
          </div>

          {/* Warning before generate */}
          <div className="flex items-start gap-2.5 px-3.5 py-3 rounded-[13px]" style={{
            background: 'rgba(123,167,217,0.05)',
            border: '1px solid rgba(123,167,217,0.12)'
          }}>
            <Info size={11} style={{
              color: '#7BA7D9',
              flexShrink: 0,
              marginTop: 1
            }} />
            <p className="text-[9px] font-semibold leading-relaxed" style={{
              color: '#8A938C'
            }}>
              Cette action va répartir automatiquement les {validatedTeamCount} équipes validées en {poolCount} poules de {teamsPerPool}. Vous pourrez ajuster manuellement ensuite.
            </p>
          </div>

          {/* Generate CTA */}
          <button onClick={handleGeneratePools} className="w-full py-4 rounded-[16px] flex items-center justify-center gap-2.5 text-[12px] font-black uppercase tracking-wider" style={{
            background: 'linear-gradient(135deg, #B7FF1A, #8ED419)',
            color: '#0B221C',
            boxShadow: '0 8px 32px rgba(183,255,26,0.2)'
          }}>
            <Zap size={16} />
            <span>Générer les poules</span>
          </button>

          {/* Link to Inscriptions */}
          <button onClick={() => setActiveSection('registrations')} className="flex items-center gap-3 px-4 py-3 rounded-[14px] w-full" style={{
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(255,255,255,0.05)'
          }}>
            <Users size={13} style={{
              color: '#8A938C'
            }} />
            <span className="flex-1 text-left text-[10px] font-bold" style={{
              color: '#8A938C'
            }}>
              <span>{validatedTeamCount} équipes validées — voir dans Inscriptions</span>
            </span>
            <ArrowRight size={12} style={{
              color: '#8A938C'
            }} />
          </button>
        </div>}
      </div>}

      {/* ── BRACKET ── */}
      {activeSection === 'bracket' && <div className="flex flex-col gap-5 p-4">
        <div className="rounded-[22px] p-5" style={{
          background: '#123129',
          border: '1px solid rgba(183,255,26,0.1)'
        }}>
          <h3 className="text-[14px] font-black mb-2" style={{
            color: '#F2EEDC'
          }}>Phase Finale</h3>
          <p className="text-[11px] leading-relaxed mb-4" style={{
            color: 'rgba(215,219,200,0.55)'
          }}>
            Générez le tableau de la phase éliminatoire à partir des classements de groupes validés.
          </p>
          <div className="flex flex-col gap-2 mb-4">
            {[{
              round: 'Quarts de finale',
              teams: '8 équipes',
              ready: true
            }, {
              round: 'Demi-finales',
              teams: '4 équipes',
              ready: false
            }, {
              round: 'Finale',
              teams: '2 équipes',
              ready: false
            }].map(r => <div key={r.round} className="flex items-center gap-3 px-3.5 py-2.5 rounded-[12px]" style={{
              background: 'rgba(255,255,255,0.03)',
              border: `1px solid ${r.ready ? 'rgba(183,255,26,0.15)' : 'rgba(255,255,255,0.06)'}`
            }}>
              <div className="w-5 h-5 rounded-full flex items-center justify-center" style={{
                background: r.ready ? 'rgba(183,255,26,0.15)' : 'rgba(255,255,255,0.05)'
              }}>
                {r.ready ? <CheckCircle size={11} style={{
                  color: '#B7FF1A'
                }} /> : <Clock size={11} style={{
                  color: '#8A938C'
                }} />}
              </div>
              <span className="flex-1 text-[11px] font-black" style={{
                color: r.ready ? '#F2EEDC' : '#8A938C'
              }}>{r.round}</span>
              <span className="text-[9px] font-bold" style={{
                color: '#8A938C'
              }}>{r.teams}</span>
            </div>)}
          </div>
          <button className="w-full py-3.5 rounded-[16px] flex items-center justify-center gap-2 text-[12px] font-black uppercase tracking-wider" style={{
            background: '#B7FF1A',
            color: '#0B221C'
          }}>
            <TrendingUp size={15} />
            <span>Générer le tableau</span>
          </button>
        </div>
      </div>}

      {/* ── DEFAULT placeholder ── */}
      {!['dashboard', 'registrations', 'matches', 'scores', 'groups', 'bracket'].includes(activeSection) && <div className="flex flex-col items-center justify-center p-10 gap-5">
        <div className="w-16 h-16 rounded-[20px] flex items-center justify-center" style={{
          background: 'rgba(183,255,26,0.06)',
          border: '1px solid rgba(183,255,26,0.12)'
        }}>
          <span style={{
            color: '#B7FF1A'
          }}>{NAV_SECTIONS.find(s => s.id === activeSection)?.icon}</span>
        </div>
        <div className="text-center">
          <p className="text-[14px] font-black mb-1" style={{
            color: '#D7DBC8'
          }}>{sectionMeta?.label}</p>
          <p className="text-[11px]" style={{
            color: '#8A938C'
          }}>Module en cours de déploiement</p>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 rounded-[14px] text-[11px] font-black uppercase tracking-wider" style={{
          background: '#B7FF1A',
          color: '#0B221C'
        }}>
          <Plus size={13} />
          <span>Créer le premier élément</span>
        </button>
      </div>}

    </main>

    {/* Bottom nav */}
    <nav className="fixed bottom-0 left-0 right-0 flex items-center justify-around px-4 py-3 z-50" style={{
      background: 'rgba(8,15,13,0.96)',
      backdropFilter: 'blur(20px)',
      borderTop: '1px solid rgba(255,255,255,0.07)'
    }}>
      {[{
        id: 'dashboard' as AdminSection,
        icon: <LayoutDashboard size={20} />,
        label: 'Dashboard'
      }, {
        id: 'registrations' as AdminSection,
        icon: <Users size={20} />,
        label: 'Inscriptions'
      }, {
        id: 'matches' as AdminSection,
        icon: <Calendar size={20} />,
        label: 'Matchs'
      }, {
        id: 'scores' as AdminSection,
        icon: <BarChart3 size={20} />,
        label: 'Scores'
      }, {
        id: 'groups' as AdminSection,
        icon: <Layers size={20} />,
        label: 'Poules'
      }].map(tab => <button key={tab.id} onClick={() => setActiveSection(tab.id)} aria-label={tab.label} className="flex flex-col items-center gap-1 py-1 px-2 transition-all" style={{
        color: activeSection === tab.id ? '#B7FF1A' : '#8A938C'
      }}>
        {tab.icon}
        <span className="text-[7px] font-black uppercase tracking-wide">{tab.label}</span>
      </button>)}
    </nav>

    {/* Sidebar drawer */}
    <AnimatePresence>
      {sidebarOpen && <div>
        <motion.div key="overlay" initial={{
          opacity: 0
        }} animate={{
          opacity: 1
        }} exit={{
          opacity: 0
        }} className="fixed inset-0 z-[85]" style={{
          background: 'rgba(8,15,13,0.8)',
          backdropFilter: 'blur(4px)'
        }} onClick={() => setSidebarOpen(false)} />
        <motion.aside key="sidebar" initial={{
          x: '-100%'
        }} animate={{
          x: 0
        }} exit={{
          x: '-100%'
        }} transition={{
          type: 'spring',
          stiffness: 320,
          damping: 36
        }} className="fixed top-0 left-0 bottom-0 z-[90] flex flex-col overflow-y-auto" style={{
          width: '80vw',
          maxWidth: 320,
          background: '#0F2E25',
          borderRight: '1px solid rgba(255,255,255,0.07)',
          scrollbarWidth: 'none'
        }}>
          <div className="px-5 pt-14 pb-5 flex-shrink-0" style={{
            borderBottom: '1px solid rgba(255,255,255,0.06)'
          }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-[13px] flex items-center justify-center" style={{
                background: 'linear-gradient(145deg, #2E8F57, #123129)'
              }}>
                <Trophy size={18} style={{
                  color: '#B7FF1A'
                }} />
              </div>
              <div>
                <p className="text-[15px] font-black leading-none" style={{
                  color: '#F2EEDC'
                }}>Tcheksplay</p>
                <p className="text-[9px] font-bold uppercase tracking-wider" style={{
                  color: '#8A938C'
                }}>Back-office Admin</p>
              </div>
            </div>
            <div className="flex items-center gap-3 px-3 py-2.5 rounded-[12px]" style={{
              background: 'rgba(183,255,26,0.05)',
              border: '1px solid rgba(183,255,26,0.1)'
            }}>
              <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0" style={{
                border: '1.5px solid rgba(183,255,26,0.2)'
              }}>
                <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=80&h=80" alt="Karim B." className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[11px] font-black truncate" style={{
                  color: '#F2EEDC'
                }}>Karim Bensalah</p>
                <div className="flex items-center gap-1">
                  <Lock size={7} style={{
                    color: '#B7FF1A'
                  }} />
                  <span className="text-[8px] font-black uppercase tracking-wide" style={{
                    color: '#B7FF1A'
                  }}>Super-admin</span>
                </div>
              </div>
              <Settings size={13} style={{
                color: '#8A938C',
                flexShrink: 0
              }} />
            </div>
          </div>
          <div className="flex-1 px-3 py-4 flex flex-col gap-1">
            {navGroups.map(group => <div key={group} className="mb-3">
              <p className="text-[8px] font-black uppercase tracking-[0.25em] px-3 mb-1.5" style={{
                color: '#8A938C'
              }}>{group}</p>
              {NAV_SECTIONS.filter(s => s.group === group).map(section => <button key={section.id} onClick={() => {
                setActiveSection(section.id);
                setSidebarOpen(false);
              }} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-[12px] text-left transition-all" style={activeSection === section.id ? {
                background: 'rgba(183,255,26,0.1)',
                border: '1px solid rgba(183,255,26,0.15)',
                color: '#B7FF1A'
              } : {
                background: 'transparent',
                color: '#8A938C'
              }}>
                {section.icon}
                <span className="text-[12px] font-black">{section.label}</span>
                {section.id === 'registrations' && pendingCount > 0 && <span className="ml-auto text-[9px] font-black px-1.5 py-0.5 rounded-full" style={{
                  background: '#F4C542',
                  color: '#0B221C'
                }}>{pendingCount}</span>}
                {section.id === 'scores' && awaitingScores > 0 && <span className="ml-auto text-[9px] font-black px-1.5 py-0.5 rounded-full" style={{
                  background: '#D94B5B',
                  color: '#F2EEDC'
                }}>{awaitingScores}</span>}
              </button>)}
            </div>)}
          </div>
          <div className="px-3 py-4 flex-shrink-0" style={{
            borderTop: '1px solid rgba(255,255,255,0.06)'
          }}>
            <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-[12px]" style={{
              color: '#8A938C'
            }}>
              <LogOut size={16} />
              <span className="text-[12px] font-black">Déconnexion</span>
            </button>
          </div>
        </motion.aside>
      </div>}
    </AnimatePresence>

    {/* Score entry sheet */}
    <AnimatePresence>
      {scoreMatch && <div>
        <motion.div key="score-overlay" initial={{
          opacity: 0
        }} animate={{
          opacity: 1
        }} exit={{
          opacity: 0
        }} className="fixed inset-0 z-[80]" style={{
          background: 'rgba(8,15,13,0.7)',
          backdropFilter: 'blur(4px)'
        }} onClick={() => setScoreMatch(null)} />
        <ScoreEntrySheet key="score-sheet" match={scoreMatch} onClose={() => setScoreMatch(null)} />
      </div>}
    </AnimatePresence>

    {/* Score correction sheet */}
    <AnimatePresence>
      {correctRecord && <div>
        <motion.div key="correct-overlay" initial={{
          opacity: 0
        }} animate={{
          opacity: 1
        }} exit={{
          opacity: 0
        }} className="fixed inset-0 z-[80]" style={{
          background: 'rgba(8,15,13,0.7)',
          backdropFilter: 'blur(4px)'
        }} onClick={() => setCorrectRecord(null)} />
        <ScoreCorrectSheet key="correct-sheet" record={correctRecord} onClose={() => setCorrectRecord(null)} />
      </div>}
    </AnimatePresence>

    {/* Move team sheet */}
    <AnimatePresence>
      {moveTeam && <div>
        <motion.div key="move-overlay" initial={{
          opacity: 0
        }} animate={{
          opacity: 1
        }} exit={{
          opacity: 0
        }} className="fixed inset-0 z-[80]" style={{
          background: 'rgba(8,15,13,0.7)',
          backdropFilter: 'blur(4px)'
        }} onClick={() => setMoveTeam(null)} />
        <MoveTeamSheet key="move-sheet" team={moveTeam.team} currentPoolId={moveTeam.poolId} pools={pools} onMove={handleMoveTeam} onClose={() => setMoveTeam(null)} />
      </div>}
    </AnimatePresence>

  </div>;
};