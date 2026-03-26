import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Share2, MapPin, Shield, Trophy, Star, Users, Target, Activity, Calendar, Clock, TrendingUp, Award, Crown, Zap, BarChart3, ChevronRight, Camera, PlayCircle, Flame, Swords, Info, ExternalLink } from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────

type TeamTab = 'stats' | 'roster' | 'matchs' | 'media';
type SeasonFilter = 'all' | 's1' | 's2' | 's3';
interface TeamSeasonStats {
  season: string;
  seasonId: SeasonFilter;
  edition: string;
  editionIcon: string;
  wins: number;
  draws: number;
  losses: number;
  goalsFor: number;
  goalsAgainst: number;
  matchesPlayed: number;
  points: number;
  ranking: number;
  mvpPlayer: string;
  topScorer: string;
  topScorerGoals: number;
  cleanSheets: number;
}
interface TeamTrophy {
  id: string;
  title: string;
  edition: string;
  year: string;
  type: 'champion' | 'finalists' | 'fairplay' | 'topscorer_team';
  color: string;
}
interface RosterPlayer {
  id: string;
  name: string;
  number: number;
  position: string;
  positionShort: string;
  goals: number;
  assists: number;
  img: string;
  isCaptain: boolean;
  rating: number;
}
interface RecentMatch {
  id: string;
  opponent: string;
  goalsFor: number;
  goalsAgainst: number;
  isHome: boolean;
  date: string;
  edition: string;
  result: 'win' | 'draw' | 'loss';
}
interface MediaItem {
  id: string;
  title: string;
  img: string;
  duration: string;
  views: string;
  type: 'video' | 'photo';
}
interface TeamProfileData {
  id: string;
  name: string;
  abbr: string;
  city: string;
  neighborhood: string;
  origin: string;
  founded: string;
  category: string;
  formation: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  coverImg: string;
  coachName: string;
  coachImg: string;
  bio: string;
  bestLevel: string;
  rivalTeam: string;
  rosterSize: number;
  roster: RosterPlayer[];
  seasonStats: TeamSeasonStats[];
  trophies: TeamTrophy[];
  recentMatches: RecentMatch[];
  media: MediaItem[];
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const ROSTER_DATA: RosterPlayer[] = [{
  id: 'r1',
  name: 'Killian Bersot',
  number: 9,
  position: 'Attaquant',
  positionShort: 'ATT',
  goals: 17,
  assists: 8,
  img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=120&h=120',
  isCaptain: true,
  rating: 8.4
}, {
  id: 'r2',
  name: 'Théo Garnier',
  number: 5,
  position: 'Défenseur',
  positionShort: 'DEF',
  goals: 2,
  assists: 3,
  img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&h=120',
  isCaptain: false,
  rating: 7.6
}, {
  id: 'r3',
  name: 'Maxime Aubert',
  number: 8,
  position: 'Milieu',
  positionShort: 'MIL',
  goals: 5,
  assists: 9,
  img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120',
  isCaptain: false,
  rating: 7.9
}, {
  id: 'r4',
  name: 'Amine Touazi',
  number: 1,
  position: 'Gardien',
  positionShort: 'GK',
  goals: 0,
  assists: 1,
  img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=120&h=120',
  isCaptain: false,
  rating: 7.3
}, {
  id: 'r5',
  name: 'Lucas Perrin',
  number: 11,
  position: 'Attaquant',
  positionShort: 'ATT',
  goals: 8,
  assists: 4,
  img: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&h=120',
  isCaptain: false,
  rating: 7.5
}, {
  id: 'r6',
  name: 'Rayan Mounir',
  number: 4,
  position: 'Défenseur',
  positionShort: 'DEF',
  goals: 1,
  assists: 2,
  img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=120&h=120',
  isCaptain: false,
  rating: 7.1
}, {
  id: 'r7',
  name: 'Jules Fontaine',
  number: 7,
  position: 'Milieu',
  positionShort: 'MIL',
  goals: 4,
  assists: 6,
  img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=120&h=120',
  isCaptain: false,
  rating: 7.4
}];
const TEAM_SEASON_STATS: TeamSeasonStats[] = [{
  season: 'Saison 3',
  seasonId: 's3',
  edition: 'Summer Cup',
  editionIcon: '☀️',
  wins: 14,
  draws: 3,
  losses: 1,
  goalsFor: 42,
  goalsAgainst: 12,
  matchesPlayed: 18,
  points: 45,
  ranking: 1,
  mvpPlayer: 'K. Bersot',
  topScorer: 'K. Bersot',
  topScorerGoals: 17,
  cleanSheets: 5
}, {
  season: 'Saison 2',
  seasonId: 's2',
  edition: 'Winter Cup',
  editionIcon: '❄️',
  wins: 10,
  draws: 2,
  losses: 3,
  goalsFor: 31,
  goalsAgainst: 14,
  matchesPlayed: 15,
  points: 32,
  ranking: 2,
  mvpPlayer: 'M. Aubert',
  topScorer: 'K. Bersot',
  topScorerGoals: 12,
  cleanSheets: 3
}, {
  season: 'Saison 1',
  seasonId: 's1',
  edition: 'Spring Open',
  editionIcon: '🌿',
  wins: 7,
  draws: 3,
  losses: 2,
  goalsFor: 22,
  goalsAgainst: 11,
  matchesPlayed: 12,
  points: 24,
  ranking: 3,
  mvpPlayer: 'K. Bersot',
  topScorer: 'K. Bersot',
  topScorerGoals: 9,
  cleanSheets: 2
}];
const TEAM_TROPHIES: TeamTrophy[] = [{
  id: 'tt1',
  title: 'Champions',
  edition: 'Summer Cup S3',
  year: '2025',
  type: 'champion',
  color: '#B7FF1A'
}, {
  id: 'tt2',
  title: 'Finalistes',
  edition: 'Winter Cup S2',
  year: '2024',
  type: 'finalists',
  color: '#C9C1A2'
}, {
  id: 'tt3',
  title: 'Meilleure Attaque',
  edition: 'Summer Cup S3',
  year: '2025',
  type: 'topscorer_team',
  color: '#35D07F'
}, {
  id: 'tt4',
  title: 'Fair-play',
  edition: 'Spring Open S1',
  year: '2023',
  type: 'fairplay',
  color: '#7BA7D9'
}];
const RECENT_MATCHES: RecentMatch[] = [{
  id: 'rm1',
  opponent: 'Seynod City',
  goalsFor: 2,
  goalsAgainst: 1,
  isHome: true,
  date: "Auj. 78'",
  edition: 'Élite',
  result: 'win'
}, {
  id: 'rm2',
  opponent: 'Veyrier Utd',
  goalsFor: 3,
  goalsAgainst: 3,
  isHome: false,
  date: 'Il y a 5j',
  edition: 'Élite',
  result: 'draw'
}, {
  id: 'rm3',
  opponent: 'Poisy Stars',
  goalsFor: 4,
  goalsAgainst: 0,
  isHome: true,
  date: 'Il y a 8j',
  edition: 'Challenger',
  result: 'win'
}, {
  id: 'rm4',
  opponent: 'Meythet FC',
  goalsFor: 1,
  goalsAgainst: 2,
  isHome: false,
  date: 'Il y a 12j',
  edition: 'Élite',
  result: 'loss'
}, {
  id: 'rm5',
  opponent: 'Cran Giants',
  goalsFor: 5,
  goalsAgainst: 1,
  isHome: true,
  date: 'Il y a 15j',
  edition: 'Élite',
  result: 'win'
}];
const TEAM_MEDIA: MediaItem[] = [{
  id: 'tm1',
  title: "Finale S3 — Les buts d'Annecy FC",
  img: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=300&q=80',
  duration: '1:42',
  views: '3.8k',
  type: 'video'
}, {
  id: 'tm2',
  title: "Célébration titre Summer Cup",
  img: 'https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?auto=format&fit=crop&w=300&q=80',
  duration: '0:58',
  views: '2.1k',
  type: 'video'
}, {
  id: 'tm3',
  title: 'Galerie — Saison 3 complète',
  img: 'https://images.unsplash.com/photo-1551958219-acbc595d4c80?auto=format&fit=crop&w=300&q=80',
  duration: '47 photos',
  views: '5.2k',
  type: 'photo'
}, {
  id: 'tm4',
  title: 'Meilleurs gestes collectifs',
  img: 'https://images.unsplash.com/photo-1517927033932-b3d18e61fb3a?auto=format&fit=crop&w=300&q=80',
  duration: '2:14',
  views: '1.9k',
  type: 'video'
}];
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
  media: TEAM_MEDIA
};

// ─── Constants ────────────────────────────────────────────────────────────────

const TEAM_TABS: {
  id: TeamTab;
  label: string;
  icon: React.ReactNode;
}[] = [{
  id: 'stats',
  label: 'Stats',
  icon: <BarChart3 size={12} />
}, {
  id: 'roster',
  label: 'Effectif',
  icon: <Users size={12} />
}, {
  id: 'matchs',
  label: 'Matchs',
  icon: <Calendar size={12} />
}, {
  id: 'media',
  label: 'Médias',
  icon: <Camera size={12} />
}];
const SEASON_FILTERS: {
  id: SeasonFilter;
  label: string;
}[] = [{
  id: 'all',
  label: 'Tout'
}, {
  id: 's3',
  label: 'S3 · 2025'
}, {
  id: 's2',
  label: 'S2 · 2024'
}, {
  id: 's1',
  label: 'S1 · 2023'
}];
const TROPHY_META: Record<TeamTrophy['type'], {
  icon: React.ReactNode;
  label: string;
}> = {
  champion: {
    icon: <Crown size={18} />,
    label: 'Champion'
  },
  finalists: {
    icon: <Shield size={18} />,
    label: 'Finaliste'
  },
  topscorer_team: {
    icon: <Target size={18} />,
    label: 'Attaque'
  },
  fairplay: {
    icon: <Award size={18} />,
    label: 'Fair-play'
  }
};
const POSITION_ORDER = ['GK', 'DEF', 'MIL', 'ATT'];
function getRatingColor(r: number): string {
  if (r >= 8.5) return '#B7FF1A';
  if (r >= 7.5) return '#35D07F';
  if (r >= 6.5) return '#F4C542';
  return '#FF8C42';
}
function getRatingBg(r: number): string {
  if (r >= 8.5) return 'rgba(183,255,26,0.14)';
  if (r >= 7.5) return 'rgba(53,208,127,0.14)';
  if (r >= 6.5) return 'rgba(244,197,66,0.14)';
  return 'rgba(255,140,66,0.14)';
}

// ─── StatBar ──────────────────────────────────────────────────────────────────

const StatBar = ({
  value,
  max,
  color
}: {
  value: number;
  max: number;
  color: string;
}) => <div className="w-full h-[3px] rounded-full overflow-hidden" style={{
  background: 'rgba(255,255,255,0.07)'
}}>
    <motion.div initial={{
    width: '0%'
  }} animate={{
    width: `${Math.min(value / max * 100, 100)}%`
  }} transition={{
    duration: 1,
    ease: 'easeOut',
    delay: 0.2
  }} className="h-full rounded-full" style={{
    background: color
  }} />
  </div>;

// ─── FormDot ──────────────────────────────────────────────────────────────────

const FormDot = ({
  result
}: {
  result: 'win' | 'draw' | 'loss';
}) => {
  const colorMap = {
    win: '#35D07F',
    draw: '#F4C542',
    loss: '#D94B5B'
  };
  const labelMap = {
    win: 'V',
    draw: 'N',
    loss: 'D'
  };
  return <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0" style={{
    background: `${colorMap[result]}18`,
    border: `1.5px solid ${colorMap[result]}40`
  }}>
      <span className="text-[9px] font-black" style={{
      color: colorMap[result]
    }}>
        {labelMap[result]}
      </span>
    </div>;
};

// ─── SectionLabel ─────────────────────────────────────────────────────────────

const SectionLabel = ({
  children
}: {
  children: React.ReactNode;
}) => <div className="flex items-center gap-2.5 mb-1">
    <div className="h-px flex-1" style={{
    background: 'rgba(255,255,255,0.06)'
  }} />
    <span className="text-[9px] font-black uppercase tracking-[0.26em] px-2" style={{
    color: '#8A938C'
  }}>
      {children}
    </span>
    <div className="h-px flex-1" style={{
    background: 'rgba(255,255,255,0.06)'
  }} />
  </div>;

// ─── TeamProfile ──────────────────────────────────────────────────────────────

export const TeamProfile = ({
  onBack
}: {
  onBack?: () => void;
}) => {
  const [activeTab, setActiveTab] = useState<TeamTab>('stats');
  const [seasonFilter, setSeasonFilter] = useState<SeasonFilter>('all');
  const team = TEAM_DATA;
  const filteredStats = seasonFilter === 'all' ? team.seasonStats : team.seasonStats.filter(s => s.seasonId === seasonFilter);
  const totalWins = filteredStats.reduce((s, st) => s + st.wins, 0);
  const totalDraws = filteredStats.reduce((s, st) => s + st.draws, 0);
  const totalLosses = filteredStats.reduce((s, st) => s + st.losses, 0);
  const totalGoalsFor = filteredStats.reduce((s, st) => s + st.goalsFor, 0);
  const totalGoalsAgainst = filteredStats.reduce((s, st) => s + st.goalsAgainst, 0);
  const totalMatches = filteredStats.reduce((s, st) => s + st.matchesPlayed, 0);
  const totalPoints = filteredStats.reduce((s, st) => s + st.points, 0);
  const totalCleanSheets = filteredStats.reduce((s, st) => s + st.cleanSheets, 0);
  const winRate = totalMatches > 0 ? Math.round(totalWins / totalMatches * 100) : 0;
  const sortedRoster = [...team.roster].sort((a, b) => POSITION_ORDER.indexOf(a.positionShort) - POSITION_ORDER.indexOf(b.positionShort));
  return <div className="min-h-screen w-full overflow-x-hidden pb-32" style={{
    background: '#0B221C',
    color: '#F2EEDC'
  }}>

      {/* ── HERO ── */}
      <div className="relative overflow-hidden" style={{
      minHeight: 340
    }}>
        <div className="absolute inset-0">
          <img src={team.coverImg} alt={`Photo de couverture de l'équipe ${team.name}`} className="w-full h-full object-cover" style={{
          filter: 'brightness(0.22) saturate(0.5)'
        }} />
          <div className="absolute inset-0" style={{
          background: 'linear-gradient(180deg, rgba(11,34,28,0.15) 0%, rgba(11,34,28,0.55) 45%, rgba(11,34,28,1) 100%)'
        }} />
          <div className="absolute inset-0" style={{
          background: `linear-gradient(120deg, ${team.primaryColor}20 0%, transparent 55%)`
        }} />
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full" style={{
        background: `radial-gradient(ellipse, ${team.secondaryColor}10 0%, transparent 70%)`,
        filter: 'blur(48px)'
      }} />

        {/* Top bar */}
        <div className="relative z-10 flex items-center justify-between px-5 pt-12 pb-4">
          {onBack ? <button onClick={onBack} className="flex items-center gap-1.5 px-3 py-2 rounded-[12px]" style={{
          background: 'rgba(255,255,255,0.05)',
          color: '#8A938C'
        }} aria-label="Retour">
              <ChevronLeft size={16} />
              <span className="text-[10px] font-black uppercase tracking-wider">Retour</span>
            </button> : <div />}
          <button className="flex items-center gap-1.5 px-3 py-2 rounded-[12px]" style={{
          background: 'rgba(255,255,255,0.05)',
          border: '1px solid rgba(255,255,255,0.08)',
          color: '#8A938C'
        }} aria-label="Partager le profil d'équipe">
            <Share2 size={14} />
            <span className="text-[10px] font-black uppercase tracking-wider">Partager</span>
          </button>
        </div>

        {/* Identity block */}
        <div className="relative z-10 px-5 pb-10 flex gap-5 items-end">
          {/* Crest */}
          <div className="relative flex-shrink-0">
            <div className="w-[88px] h-[88px] rounded-[26px] flex items-center justify-center" style={{
            background: `linear-gradient(145deg, ${team.primaryColor}25, #123129)`,
            border: `2.5px solid ${team.primaryColor}50`,
            boxShadow: `0 0 32px ${team.primaryColor}18`
          }}>
              <Shield size={38} style={{
              color: team.primaryColor
            }} />
            </div>
            <div className="absolute -bottom-2 -right-2 px-2 py-0.5 rounded-[9px]" style={{
            background: team.secondaryColor,
            border: '2px solid #0B221C'
          }}>
              <span className="text-[10px] font-black" style={{
              color: '#0B221C'
            }}>{team.abbr}</span>
            </div>
          </div>

          {/* Name + meta */}
          <div className="flex-1 min-w-0 pb-1">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2 py-0.5 rounded-md text-[8px] font-black uppercase tracking-wider" style={{
              background: `${team.primaryColor}20`,
              border: `1px solid ${team.primaryColor}35`,
              color: team.primaryColor
            }}>
                {team.category}
              </span>
              <span className="px-2 py-0.5 rounded-md text-[8px] font-black uppercase tracking-wider" style={{
              background: 'rgba(183,255,26,0.08)',
              border: '1px solid rgba(183,255,26,0.15)',
              color: '#B7FF1A'
            }}>
                <span style={{
                color: 'rgba(183,255,26,0.55)',
                marginRight: 2
              }}>Système</span>
                {team.formation}
              </span>
            </div>
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] mb-0.5" style={{
            color: 'rgba(215,219,200,0.4)'
          }}>
              {team.city}
            </p>
            <h1 className="text-[30px] font-black tracking-[-0.04em] leading-none uppercase" style={{
            color: '#F2EEDC'
          }}>
              {team.name}
            </h1>
            <div className="flex items-center gap-1.5 mt-2">
              <MapPin size={9} style={{
              color: '#8A938C'
            }} />
              <span className="text-[9px] font-bold tracking-wide" style={{
              color: '#8A938C'
            }}>
                {team.neighborhood} · {team.city}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ── IDENTITY BANNER ── */}
      <div className="px-5 -mt-1 mb-5">
        <div className="rounded-[18px] px-4 py-3.5 flex items-center justify-between" style={{
        background: `linear-gradient(135deg, ${team.primaryColor}12 0%, rgba(18,49,41,0.9) 100%)`,
        border: `1px solid ${team.primaryColor}22`
      }}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-[13px] overflow-hidden flex-shrink-0" style={{
            border: `1px solid ${team.primaryColor}35`
          }}>
              <img src={team.coachImg} alt={`Photo de ${team.coachName}, coach`} className="w-full h-full object-cover" />
            </div>
            <div>
              <p className="text-[8px] font-black uppercase tracking-[0.18em]" style={{
              color: '#8A938C'
            }}>Coach</p>
              <p className="text-[13px] font-black" style={{
              color: '#F2EEDC'
            }}>{team.coachName}</p>
            </div>
          </div>
          <div className="flex flex-col items-end gap-0.5">
            <p className="text-[8px] font-black uppercase tracking-[0.18em]" style={{
            color: '#8A938C'
          }}>Fondé en</p>
            <p className="text-[14px] font-black" style={{
            color: team.secondaryColor
          }}>{team.founded}</p>
          </div>
        </div>
      </div>

      {/* ── BIO ── */}
      <div className="px-5 mb-5">
        <p className="text-[12px] leading-relaxed" style={{
        color: 'rgba(215,219,200,0.62)'
      }}>
          {team.bio}
        </p>
      </div>

      {/* ── QUICK CHIPS ── */}
      <div className="px-5 mb-6 flex gap-2 overflow-x-auto" style={{
      scrollbarWidth: 'none'
    }}>
        <div className="flex items-center gap-1.5 px-3.5 py-2 rounded-full flex-shrink-0" style={{
        background: 'rgba(183,255,26,0.08)',
        border: '1px solid rgba(183,255,26,0.16)'
      }}>
          <Trophy size={11} style={{
          color: '#B7FF1A'
        }} />
          <span className="text-[11px] font-black" style={{
          color: '#B7FF1A'
        }}>{team.trophies.length} titres</span>
        </div>
        <div className="flex items-center gap-1.5 px-3.5 py-2 rounded-full flex-shrink-0" style={{
        background: 'rgba(53,208,127,0.08)',
        border: '1px solid rgba(53,208,127,0.16)'
      }}>
          <Target size={11} style={{
          color: '#35D07F'
        }} />
          <span className="text-[11px] font-black" style={{
          color: '#35D07F'
        }}>{TEAM_SEASON_STATS[0].goalsFor} buts S3</span>
        </div>
        <div className="flex items-center gap-1.5 px-3.5 py-2 rounded-full flex-shrink-0" style={{
        background: 'rgba(201,193,162,0.08)',
        border: '1px solid rgba(201,193,162,0.16)'
      }}>
          <Crown size={11} style={{
          color: '#C9C1A2'
        }} />
          <span className="text-[11px] font-black" style={{
          color: '#C9C1A2'
        }}>#1 Classement</span>
        </div>
        <div className="flex items-center gap-1.5 px-3.5 py-2 rounded-full flex-shrink-0" style={{
        background: 'rgba(123,167,217,0.08)',
        border: '1px solid rgba(123,167,217,0.16)'
      }}>
          <Users size={11} style={{
          color: '#7BA7D9'
        }} />
          <span className="text-[11px] font-black" style={{
          color: '#7BA7D9'
        }}>{team.rosterSize} joueurs</span>
        </div>
        {/* Rival chip — clickable badge */}
        <button className="flex items-center gap-1.5 px-3.5 py-2 rounded-full flex-shrink-0 transition-all" style={{
        background: 'rgba(217,75,91,0.1)',
        border: '1px solid rgba(217,75,91,0.25)',
        cursor: 'pointer'
      }} aria-label={`Voir la fiche de ${team.rivalTeam}`}>
          <Swords size={11} style={{
          color: '#D94B5B'
        }} />
          <span className="text-[11px] font-black" style={{
          color: '#D94B5B'
        }}>Rival</span>
          <span className="text-[11px] font-black" style={{
          color: 'rgba(217,75,91,0.6)'
        }}>·</span>
          <span className="text-[11px] font-bold" style={{
          color: '#F2EEDC'
        }}>{team.rivalTeam}</span>
          <ExternalLink size={9} style={{
          color: 'rgba(217,75,91,0.5)'
        }} />
        </button>
      </div>

      {/* ── RECENT FORM ── */}
      <div className="px-5 mb-6">
        <div className="rounded-[18px] px-4 py-3.5 flex items-center gap-3" style={{
        background: '#123129',
        border: '1px solid rgba(255,255,255,0.05)'
      }}>
          <Flame size={14} style={{
          color: '#FF8C42'
        }} />
          <span className="text-[10px] font-black uppercase tracking-[0.18em] flex-1" style={{
          color: '#8A938C'
        }}>Forme récente</span>
          <div className="flex items-center gap-1.5">
            {RECENT_MATCHES.map(m => <FormDot key={m.id} result={m.result} />)}
          </div>
        </div>
      </div>

      {/* ── TAB BAR ── */}
      <div className="sticky top-0 z-20 flex gap-1.5 px-5 py-3 mb-6" style={{
      background: 'rgba(11,34,28,0.96)',
      backdropFilter: 'blur(18px)',
      borderBottom: '1px solid rgba(255,255,255,0.05)'
    }}>
        {TEAM_TABS.map(tab => <button key={tab.id} onClick={() => setActiveTab(tab.id)} className="flex items-center gap-1.5 px-3 py-2.5 rounded-[12px] text-[10px] font-black uppercase tracking-wide flex-1 justify-center transition-all" style={activeTab === tab.id ? {
        background: '#B7FF1A',
        color: '#0B221C',
        boxShadow: '0 2px 12px rgba(183,255,26,0.2)'
      } : {
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.07)',
        color: '#8A938C'
      }}>
            {tab.icon}
            <span>{tab.label}</span>
          </button>)}
      </div>

      {/* ── TAB CONTENT ── */}
      <AnimatePresence mode="wait">
        <motion.div key={activeTab} initial={{
        opacity: 0,
        y: 10
      }} animate={{
        opacity: 1,
        y: 0
      }} exit={{
        opacity: 0,
        y: -8
      }} transition={{
        duration: 0.2,
        ease: 'easeOut'
      }} className="px-5">

          {/* ══ STATS TAB ══ */}
          {activeTab === 'stats' && <div className="flex flex-col gap-6">

              {/* Season filter pills */}
              <div className="flex gap-2 overflow-x-auto" style={{
            scrollbarWidth: 'none'
          }}>
                {SEASON_FILTERS.map(f => <button key={f.id} onClick={() => setSeasonFilter(f.id)} className="px-3.5 py-2 rounded-[12px] text-[10px] font-black uppercase tracking-wide whitespace-nowrap flex-shrink-0 transition-all" style={seasonFilter === f.id ? {
              background: '#B7FF1A',
              color: '#0B221C'
            } : {
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.07)',
              color: '#8A938C'
            }}>
                    {f.label}
                  </button>)}
              </div>

              {/* ── Bilan global ── */}
              <div className="flex flex-col gap-3">
                <SectionLabel>Bilan global</SectionLabel>

                {/* Main summary card */}
                <div className="rounded-[24px] p-5" style={{
              background: 'linear-gradient(135deg, #183C31 0%, #0B221C 100%)',
              border: '1px solid rgba(183,255,26,0.1)'
            }}>
                  <div className="flex items-start justify-between mb-5">
                    <div>
                      <p className="text-[9px] font-black uppercase tracking-[0.22em]" style={{
                    color: '#8A938C'
                  }}>
                        {seasonFilter === 'all' ? 'Toutes saisons' : SEASON_FILTERS.find(f => f.id === seasonFilter)?.label}
                      </p>
                      <div className="flex items-end gap-2 mt-1.5">
                        <span className="text-[52px] font-black tracking-tighter leading-none" style={{
                      color: '#B7FF1A'
                    }}>
                          {winRate}
                        </span>
                        <div className="flex flex-col gap-0.5 pb-1.5">
                          <span className="text-[10px] font-black" style={{
                        color: 'rgba(183,255,26,0.55)'
                      }}>%</span>
                          <span className="text-[9px] font-black uppercase tracking-wider" style={{
                        color: '#8A938C'
                      }}>victoires</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 mt-1.5">
                        <span className="text-[12px] font-black tabular-nums" style={{
                      color: '#35D07F'
                    }}>{totalPoints} pts</span>
                        <span className="w-1 h-1 rounded-full" style={{
                      background: 'rgba(255,255,255,0.15)'
                    }} />
                        <span className="text-[12px] font-black" style={{
                      color: '#C9C1A2'
                    }}>
                          #{filteredStats.length > 0 ? filteredStats[0].ranking : '—'}
                        </span>
                      </div>
                    </div>
                    <div className="w-16 h-16 rounded-[20px] flex items-center justify-center" style={{
                  background: 'rgba(183,255,26,0.08)',
                  border: '1.5px solid rgba(183,255,26,0.18)'
                }}>
                      <Crown size={26} style={{
                    color: '#B7FF1A'
                  }} />
                    </div>
                  </div>

                  {/* W / D / L / M row */}
                  <div className="grid grid-cols-4 gap-2 mb-4">
                    {[{
                  label: 'Victoires',
                  value: String(totalWins),
                  color: '#35D07F'
                }, {
                  label: 'Nuls',
                  value: String(totalDraws),
                  color: '#F4C542'
                }, {
                  label: 'Défaites',
                  value: String(totalLosses),
                  color: '#D94B5B'
                }, {
                  label: 'Matchs',
                  value: String(totalMatches),
                  color: '#7BA7D9'
                }].map(item => <div key={item.label} className="flex flex-col items-center gap-0.5 py-2.5 rounded-[12px]" style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.06)'
                }}>
                        <span className="text-[16px] font-black leading-none" style={{
                    color: item.color
                  }}>{item.value}</span>
                        <span className="text-[7px] font-black uppercase tracking-[0.1em]" style={{
                    color: '#8A938C'
                  }}>{item.label}</span>
                      </div>)}
                  </div>

                  {/* Goals + CS row */}
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    {[{
                  label: 'Buts marqués',
                  value: String(totalGoalsFor),
                  color: '#35D07F',
                  icon: <Target size={9} style={{
                    color: '#35D07F'
                  }} />
                }, {
                  label: 'Buts encaissés',
                  value: String(totalGoalsAgainst),
                  color: '#7BA7D9',
                  icon: <Shield size={9} style={{
                    color: '#7BA7D9'
                  }} />
                }, {
                  label: 'Clean sheets',
                  value: String(totalCleanSheets),
                  color: '#F4C542',
                  icon: <Star size={9} style={{
                    color: '#F4C542'
                  }} />
                }].map(item => <div key={item.label} className="flex flex-col items-center gap-0.5 py-2.5 rounded-[12px]" style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.05)'
                }}>
                        <div className="flex items-center gap-1 mb-0.5">{item.icon}</div>
                        <span className="text-[15px] font-black leading-none" style={{
                    color: item.color
                  }}>{item.value}</span>
                        <span className="text-[6.5px] font-black uppercase tracking-[0.1em] text-center px-1" style={{
                    color: '#8A938C'
                  }}>{item.label}</span>
                      </div>)}
                  </div>

                  {/* BP/BC visual bars */}
                  <div className="flex flex-col gap-2.5">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-1.5">
                          <Target size={9} style={{
                        color: '#35D07F'
                      }} />
                          <span className="text-[9px] font-black uppercase tracking-wider" style={{
                        color: '#8A938C'
                      }}>Pour</span>
                        </div>
                        <span className="text-[11px] font-black tabular-nums" style={{
                      color: '#F2EEDC'
                    }}>{totalGoalsFor}</span>
                      </div>
                      <StatBar value={totalGoalsFor} max={120} color="#35D07F" />
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-1.5">
                          <Shield size={9} style={{
                        color: '#7BA7D9'
                      }} />
                          <span className="text-[9px] font-black uppercase tracking-wider" style={{
                        color: '#8A938C'
                      }}>Contre</span>
                        </div>
                        <span className="text-[11px] font-black tabular-nums" style={{
                      color: '#F2EEDC'
                    }}>{totalGoalsAgainst}</span>
                      </div>
                      <StatBar value={totalGoalsAgainst} max={120} color="#7BA7D9" />
                    </div>
                  </div>
                </div>
              </div>

              {/* ── Historique par saison ── */}
              {filteredStats.length > 0 && <div className="flex flex-col gap-3">
                  <SectionLabel>Historique par saison</SectionLabel>

                  {filteredStats.map((stat, idx) => <motion.div key={stat.seasonId} initial={{
              opacity: 0,
              y: 14
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              delay: idx * 0.07
            }} className="rounded-[22px] overflow-hidden" style={{
              background: '#123129',
              border: '1px solid rgba(255,255,255,0.06)'
            }}>
                      {/* Card header */}
                      <div className="flex items-center justify-between px-4 pt-4 pb-3" style={{
                borderBottom: '1px solid rgba(255,255,255,0.05)'
              }}>
                        <div className="flex items-center gap-2.5">
                          <span className="text-[20px]">{stat.editionIcon}</span>
                          <div>
                            <p className="text-[13px] font-black leading-none" style={{
                      color: '#F2EEDC'
                    }}>{stat.season}</p>
                            <p className="text-[9px] font-semibold mt-0.5" style={{
                      color: '#8A938C'
                    }}>
                              {stat.edition} · {stat.matchesPlayed} matchs
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1 px-2 py-1 rounded-[8px]" style={{
                    background: 'rgba(183,255,26,0.08)',
                    border: '1px solid rgba(183,255,26,0.15)'
                  }}>
                            <Crown size={9} style={{
                      color: '#B7FF1A'
                    }} />
                            <span className="text-[9px] font-black" style={{
                      color: '#B7FF1A'
                    }}>#{stat.ranking}</span>
                          </div>
                          <div className="px-2.5 py-1 rounded-[8px]" style={{
                    background: 'rgba(183,255,26,0.1)',
                    border: '1px solid rgba(183,255,26,0.2)'
                  }}>
                            <span className="text-[13px] font-black tabular-nums" style={{
                      color: '#B7FF1A'
                    }}>
                              {stat.points}
                              <span className="text-[8px] ml-0.5" style={{
                        color: '#8A938C'
                      }}>pts</span>
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="px-4 pt-3 pb-4 flex flex-col gap-3">
                        {/* Goals bars */}
                        <div>
                          <div className="flex items-center justify-between mb-1.5">
                            <div className="flex items-center gap-1.5">
                              <Target size={10} style={{
                        color: '#35D07F'
                      }} />
                              <span className="text-[10px] font-black uppercase tracking-wider" style={{
                        color: '#8A938C'
                      }}>Buts marqués</span>
                            </div>
                            <span className="text-[15px] font-black tabular-nums" style={{
                      color: '#F2EEDC'
                    }}>{stat.goalsFor}</span>
                          </div>
                          <StatBar value={stat.goalsFor} max={50} color="#35D07F" />
                        </div>
                        <div>
                          <div className="flex items-center justify-between mb-1.5">
                            <div className="flex items-center gap-1.5">
                              <Shield size={10} style={{
                        color: '#7BA7D9'
                      }} />
                              <span className="text-[10px] font-black uppercase tracking-wider" style={{
                        color: '#8A938C'
                      }}>Buts encaissés</span>
                            </div>
                            <span className="text-[15px] font-black tabular-nums" style={{
                      color: '#F2EEDC'
                    }}>{stat.goalsAgainst}</span>
                          </div>
                          <StatBar value={stat.goalsAgainst} max={30} color="#7BA7D9" />
                        </div>

                        {/* W / D / L / CS grid with CS legend */}
                        <div className="grid grid-cols-4 gap-2 mt-1">
                          <div className="flex flex-col items-center gap-0.5 py-2.5 rounded-[10px]" style={{
                    background: 'rgba(53,208,127,0.06)',
                    border: '1px solid rgba(53,208,127,0.12)'
                  }}>
                            <span className="text-[15px] font-black" style={{
                      color: '#35D07F'
                    }}>{stat.wins}</span>
                            <span className="text-[7px] font-black uppercase tracking-[0.12em]" style={{
                      color: '#8A938C'
                    }}>V</span>
                          </div>
                          <div className="flex flex-col items-center gap-0.5 py-2.5 rounded-[10px]" style={{
                    background: 'rgba(244,197,66,0.06)',
                    border: '1px solid rgba(244,197,66,0.12)'
                  }}>
                            <span className="text-[15px] font-black" style={{
                      color: '#F4C542'
                    }}>{stat.draws}</span>
                            <span className="text-[7px] font-black uppercase tracking-[0.12em]" style={{
                      color: '#8A938C'
                    }}>N</span>
                          </div>
                          <div className="flex flex-col items-center gap-0.5 py-2.5 rounded-[10px]" style={{
                    background: 'rgba(217,75,91,0.06)',
                    border: '1px solid rgba(217,75,91,0.12)'
                  }}>
                            <span className="text-[15px] font-black" style={{
                      color: '#D94B5B'
                    }}>{stat.losses}</span>
                            <span className="text-[7px] font-black uppercase tracking-[0.12em]" style={{
                      color: '#8A938C'
                    }}>D</span>
                          </div>
                          <div className="flex flex-col items-center gap-0.5 py-2.5 rounded-[10px]" style={{
                    background: 'rgba(244,197,66,0.06)',
                    border: '1px solid rgba(244,197,66,0.12)'
                  }}>
                            <span className="text-[15px] font-black" style={{
                      color: '#F4C542'
                    }}>{stat.cleanSheets}</span>
                            <span className="text-[7px] font-black uppercase tracking-[0.12em]" style={{
                      color: '#8A938C'
                    }}>CS</span>
                          </div>
                        </div>

                        {/* CS legend pill */}
                        <div className="flex items-center gap-1.5 self-end">
                          <Info size={8} style={{
                    color: '#8A938C'
                  }} />
                          <span className="text-[8px] font-semibold" style={{
                    color: '#8A938C'
                  }}>CS = Clean sheets (matchs sans encaisser)</span>
                        </div>

                        {/* MVP & top scorer — clearly distinguished */}
                        <div className="rounded-[12px] overflow-hidden" style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.05)'
                }}>
                          <div className="flex items-center gap-3 px-3 py-2.5" style={{
                    borderBottom: '1px solid rgba(255,255,255,0.04)'
                  }}>
                            <Star size={10} fill="#C9C1A2" style={{
                      color: '#C9C1A2',
                      flexShrink: 0
                    }} />
                            <span className="text-[9px] font-black uppercase tracking-wider flex-1" style={{
                      color: '#8A938C'
                    }}>MVP</span>
                            <span className="text-[11px] font-black" style={{
                      color: '#C9C1A2'
                    }}>{stat.mvpPlayer}</span>
                          </div>
                          <div className="flex items-center gap-3 px-3 py-2.5">
                            <Target size={10} style={{
                      color: '#B7FF1A',
                      flexShrink: 0
                    }} />
                            <span className="text-[9px] font-black uppercase tracking-wider flex-1" style={{
                      color: '#8A938C'
                    }}>Top buteur</span>
                            <span className="text-[11px] font-black" style={{
                      color: '#F2EEDC'
                    }}>
                              {stat.topScorer}
                              <span className="ml-1.5 px-1.5 py-0.5 rounded-md text-[9px] font-black" style={{
                        background: 'rgba(183,255,26,0.1)',
                        color: '#B7FF1A'
                      }}>
                                {stat.topScorerGoals} buts
                              </span>
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>)}
                </div>}

              {/* ── Palmarès ── */}
              <div className="flex flex-col gap-3">
                <SectionLabel>Palmarès</SectionLabel>

                {/* Trophy count card */}
                <div className="rounded-[24px] p-5 flex items-center gap-4 relative overflow-hidden" style={{
              background: 'linear-gradient(135deg, rgba(201,193,162,0.07) 0%, rgba(11,34,28,0.98) 100%)',
              border: '1px solid rgba(201,193,162,0.15)'
            }}>
                  <div className="absolute right-0 top-0 w-40 h-40 rounded-full" style={{
                background: 'radial-gradient(ellipse, rgba(201,193,162,0.06) 0%, transparent 70%)',
                filter: 'blur(24px)',
                transform: 'translate(20%, -20%)'
              }} />
                  <div className="w-16 h-16 rounded-[20px] flex items-center justify-center flex-shrink-0" style={{
                background: 'rgba(201,193,162,0.1)',
                border: '1.5px solid rgba(201,193,162,0.25)'
              }}>
                    <Trophy size={28} style={{
                  color: '#C9C1A2'
                }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[9px] font-black uppercase tracking-[0.22em]" style={{
                  color: '#8A938C'
                }}>Palmarès officiel</p>
                    <p className="text-[40px] font-black leading-none tracking-tight mt-0.5" style={{
                  color: '#F2EEDC'
                }}>{team.trophies.length}</p>
                    <p className="text-[10px] font-semibold" style={{
                  color: '#8A938C'
                }}>distinctions toutes éditions</p>
                  </div>
                  <div className="flex flex-col items-end gap-1 flex-shrink-0">
                    <span className="text-[8px] font-black uppercase tracking-wider px-2 py-1 rounded-[7px]" style={{
                  background: 'rgba(183,255,26,0.08)',
                  color: '#B7FF1A',
                  border: '1px solid rgba(183,255,26,0.14)'
                }}>
                      Meilleur niveau
                    </span>
                    <p className="text-[9px] font-bold text-right" style={{
                  color: '#35D07F'
                }}>{team.bestLevel}</p>
                  </div>
                </div>

                {/* Trophy list */}
                <div className="flex flex-col gap-2.5">
                  {team.trophies.map((trophy, i) => {
                const meta = TROPHY_META[trophy.type];
                return <motion.button key={trophy.id} initial={{
                  opacity: 0,
                  x: -10
                }} animate={{
                  opacity: 1,
                  x: 0
                }} transition={{
                  delay: i * 0.07
                }} className="flex items-center gap-4 px-4 py-4 rounded-[20px] w-full text-left transition-all" style={{
                  background: '#123129',
                  border: `1px solid ${trophy.color}18`
                }} aria-label={`${trophy.title} — ${trophy.edition} ${trophy.year}`}>
                        <div className="w-12 h-12 rounded-[15px] flex items-center justify-center flex-shrink-0" style={{
                    background: `${trophy.color}12`,
                    border: `1.5px solid ${trophy.color}35`,
                    boxShadow: `0 4px 18px ${trophy.color}14`,
                    color: trophy.color
                  }}>
                          {meta.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[14px] font-black leading-none" style={{
                      color: '#F2EEDC'
                    }}>{trophy.title}</p>
                          <p className="text-[10px] font-semibold mt-1" style={{
                      color: '#8A938C'
                    }}>{trophy.edition}</p>
                        </div>
                        <div className="flex flex-col items-end gap-1 flex-shrink-0">
                          <span className="px-2 py-0.5 rounded-[7px] text-[8px] font-black uppercase tracking-wide" style={{
                      background: `${trophy.color}14`,
                      color: trophy.color,
                      border: `1px solid ${trophy.color}28`
                    }}>
                            {meta.label}
                          </span>
                          <span className="text-[9px] font-semibold" style={{
                      color: '#8A938C'
                    }}>{trophy.year}</span>
                        </div>
                        <ChevronRight size={13} style={{
                    color: 'rgba(255,255,255,0.15)',
                    flexShrink: 0
                  }} />
                      </motion.button>;
              })}
                </div>
              </div>

              {/* Meilleur niveau spacer */}
              <div className="h-2" />
            </div>}

          {/* ══ ROSTER TAB ══ */}
          {activeTab === 'roster' && <div className="flex flex-col gap-4">
              {/* Coach card */}
              <div className="rounded-[22px] p-4 flex items-center gap-4" style={{
            background: `linear-gradient(135deg, ${team.primaryColor}10 0%, #123129 100%)`,
            border: `1px solid ${team.primaryColor}20`
          }}>
                <div className="w-14 h-14 rounded-[18px] overflow-hidden flex-shrink-0" style={{
              border: `2px solid ${team.primaryColor}40`
            }}>
                  <img src={team.coachImg} alt={`Photo de ${team.coachName}, entraîneur`} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <p className="text-[8px] font-black uppercase tracking-[0.22em] mb-0.5" style={{
                color: '#8A938C'
              }}>Entraîneur</p>
                  <p className="text-[15px] font-black" style={{
                color: '#F2EEDC'
              }}>{team.coachName}</p>
                  <p className="text-[9px] font-bold mt-0.5" style={{
                color: team.primaryColor
              }}>
                    {team.name} · <span style={{
                  color: '#8A938C'
                }}>Système</span> {team.formation}
                  </p>
                </div>
                <div className="px-2.5 py-1 rounded-[8px] flex-shrink-0" style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.08)'
            }}>
                  <span className="text-[9px] font-black uppercase tracking-wide" style={{
                color: '#8A938C'
              }}>Coach</span>
                </div>
              </div>

              {/* Roster header */}
              <div className="flex items-center justify-between">
                <h2 className="text-[10px] font-black uppercase tracking-[0.2em]" style={{
              color: '#8A938C'
            }}>
                  <span>Effectif · </span>
                  <span>{team.rosterSize} joueurs</span>
                </h2>
                <span className="text-[9px] font-black uppercase tracking-wide px-2.5 py-1 rounded-md" style={{
              background: `${team.primaryColor}15`,
              color: team.primaryColor,
              border: `1px solid ${team.primaryColor}25`
            }}>
                  {team.formation}
                </span>
              </div>

              {/* Player list */}
              <div className="flex flex-col gap-2">
                {sortedRoster.map((player, i) => <motion.div key={player.id} initial={{
              opacity: 0,
              x: -10
            }} animate={{
              opacity: 1,
              x: 0
            }} transition={{
              delay: i * 0.05
            }} className="flex items-center gap-3 px-4 py-3 rounded-[18px]" style={{
              background: '#123129',
              border: `1px solid ${player.isCaptain ? team.primaryColor + '25' : 'rgba(255,255,255,0.05)'}`
            }}>
                    <span className="w-5 text-[11px] font-black tabular-nums text-center flex-shrink-0" style={{
                color: '#8A938C'
              }}>
                      {player.number}
                    </span>
                    <div className="relative flex-shrink-0">
                      <div className="w-10 h-10 rounded-[13px] overflow-hidden" style={{
                  border: `1.5px solid ${player.isCaptain ? team.primaryColor + '60' : 'rgba(255,255,255,0.08)'}`
                }}>
                        <img src={player.img} alt={`Portrait de ${player.name}`} className="w-full h-full object-cover" />
                      </div>
                      {player.isCaptain && <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center" style={{
                  background: '#C9C1A2',
                  border: '1.5px solid #0B221C'
                }}>
                          <Crown size={8} style={{
                    color: '#0B221C'
                  }} />
                        </div>}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <p className="text-[13px] font-black truncate" style={{
                    color: '#F2EEDC'
                  }}>{player.name}</p>
                        {player.isCaptain && <span className="text-[7px] font-black px-1.5 py-0.5 rounded-md flex-shrink-0" style={{
                    background: 'rgba(201,193,162,0.12)',
                    color: '#C9C1A2',
                    border: '1px solid rgba(201,193,162,0.2)'
                  }}>
                            CAP
                          </span>}
                      </div>
                      <p className="text-[9px] font-semibold" style={{
                  color: '#8A938C'
                }}>{player.position}</p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <div className="flex flex-col items-end gap-0.5">
                        <div className="flex items-center gap-1">
                          <Target size={8} style={{
                      color: '#B7FF1A'
                    }} />
                          <span className="text-[11px] font-black tabular-nums" style={{
                      color: '#F2EEDC'
                    }}>{player.goals}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Activity size={8} style={{
                      color: '#7BA7D9'
                    }} />
                          <span className="text-[9px] font-bold tabular-nums" style={{
                      color: '#8A938C'
                    }}>{player.assists}</span>
                        </div>
                      </div>
                      <div className="w-9 h-8 rounded-[8px] flex items-center justify-center flex-shrink-0" style={{
                  background: getRatingBg(player.rating),
                  border: `1px solid ${getRatingColor(player.rating)}30`
                }}>
                        <span className="text-[12px] font-black tabular-nums" style={{
                    color: getRatingColor(player.rating)
                  }}>
                          {player.rating.toFixed(1)}
                        </span>
                      </div>
                    </div>
                  </motion.div>)}
              </div>

              {/* Rival chip */}
              <button className="rounded-[18px] px-4 py-3.5 flex items-center gap-3 w-full text-left transition-all" style={{
            background: 'rgba(217,75,91,0.06)',
            border: '1px solid rgba(217,75,91,0.16)'
          }} aria-label={`Voir la fiche de ${team.rivalTeam}`}>
                <Swords size={16} style={{
              color: '#D94B5B'
            }} />
                <div className="flex-1">
                  <p className="text-[9px] font-black uppercase tracking-[0.18em]" style={{
                color: '#8A938C'
              }}>Rivalité principale</p>
                  <p className="text-[13px] font-black" style={{
                color: '#F2EEDC'
              }}>
                    <span>vs </span>
                    <span>{team.rivalTeam}</span>
                  </p>
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-[9px] flex-shrink-0" style={{
              background: 'rgba(217,75,91,0.1)',
              border: '1px solid rgba(217,75,91,0.2)'
            }}>
                  <span className="text-[9px] font-black uppercase tracking-wide" style={{
                color: '#D94B5B'
              }}>Rival</span>
                </div>
                <ChevronRight size={14} style={{
              color: '#8A938C'
            }} />
              </button>
            </div>}

          {/* ══ MATCHS TAB ══ */}
          {activeTab === 'matchs' && <div className="flex flex-col gap-4">
              <h2 className="text-[10px] font-black uppercase tracking-[0.2em]" style={{
            color: '#8A938C'
          }}>Résultats récents</h2>

              {team.recentMatches.map((match, i) => {
            const resultColor = {
              win: '#35D07F',
              draw: '#F4C542',
              loss: '#D94B5B'
            }[match.result];
            const resultLabel = {
              win: 'V',
              draw: 'N',
              loss: 'D'
            }[match.result];
            const isWin = match.result === 'win';
            return <motion.article key={match.id} initial={{
              opacity: 0,
              y: 10
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              delay: i * 0.06
            }} className="rounded-[20px] overflow-hidden" style={{
              background: '#123129',
              border: `1px solid ${resultColor}18`
            }}>
                    <div className="h-[3px]" style={{
                background: `linear-gradient(90deg, transparent, ${resultColor}60, transparent)`
              }} />
                    <div className="px-4 py-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{
                      background: `${resultColor}18`,
                      border: `1.5px solid ${resultColor}40`
                    }}>
                            <span className="text-[10px] font-black" style={{
                        color: resultColor
                      }}>{resultLabel}</span>
                          </div>
                          <span className="text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md" style={{
                      background: 'rgba(255,255,255,0.05)',
                      color: '#8A938C'
                    }}>
                            {match.edition}
                          </span>
                          <span className="text-[9px] font-semibold" style={{
                      color: '#8A938C'
                    }}>
                            {match.isHome ? 'Domicile' : 'Extérieur'}
                          </span>
                        </div>
                        <span className="text-[9px] font-bold" style={{
                    color: '#8A938C'
                  }}>{match.date}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex flex-col gap-0.5">
                          <span className="text-[10px] font-black uppercase tracking-wider" style={{
                      color: isWin ? team.primaryColor : '#8A938C'
                    }}>
                            {match.isHome ? team.name : match.opponent}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[28px] font-black tracking-[-0.05em] leading-none" style={{
                      color: '#F2EEDC'
                    }}>{match.goalsFor}</span>
                          <span className="text-[14px] font-black" style={{
                      color: '#8A938C'
                    }}>—</span>
                          <span className="text-[28px] font-black tracking-[-0.05em] leading-none" style={{
                      color: '#F2EEDC'
                    }}>{match.goalsAgainst}</span>
                        </div>
                        <div className="flex flex-col items-end gap-0.5">
                          <span className="text-[10px] font-black uppercase tracking-wider" style={{
                      color: '#8A938C'
                    }}>
                            {match.isHome ? match.opponent : team.name}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.article>;
          })}

              {/* W/D/L summary row */}
              <div className="rounded-[18px] px-4 py-3.5 grid grid-cols-3 gap-0" style={{
            background: '#123129',
            border: '1px solid rgba(255,255,255,0.05)'
          }}>
                {[{
              label: 'Victoires',
              value: String(RECENT_MATCHES.filter(m => m.result === 'win').length),
              color: '#35D07F'
            }, {
              label: 'Nuls',
              value: String(RECENT_MATCHES.filter(m => m.result === 'draw').length),
              color: '#F4C542'
            }, {
              label: 'Défaites',
              value: String(RECENT_MATCHES.filter(m => m.result === 'loss').length),
              color: '#D94B5B'
            }].map((item, idx) => <div key={item.label} className="flex flex-col items-center gap-0.5 py-1" style={{
              borderRight: idx < 2 ? '1px solid rgba(255,255,255,0.05)' : 'none'
            }}>
                    <span className="text-[22px] font-black leading-none" style={{
                color: item.color
              }}>{item.value}</span>
                    <span className="text-[7px] font-black uppercase tracking-[0.15em]" style={{
                color: '#8A938C'
              }}>{item.label}</span>
                  </div>)}
              </div>

              {/* Calendar CTA */}
              <div className="rounded-[20px] px-4 py-4 flex items-center justify-between" style={{
            background: 'rgba(183,255,26,0.05)',
            border: '1px solid rgba(183,255,26,0.12)'
          }}>
                <div className="flex items-center gap-3">
                  <TrendingUp size={16} style={{
                color: '#B7FF1A'
              }} />
                  <div>
                    <p className="text-[11px] font-black" style={{
                  color: '#F2EEDC'
                }}>Voir tous les matchs</p>
                    <p className="text-[9px] font-semibold" style={{
                  color: '#8A938C'
                }}>Calendrier complet · S3</p>
                  </div>
                </div>
                <button className="flex items-center gap-1.5 px-3.5 py-2 rounded-[12px] text-[10px] font-black uppercase tracking-wider flex-shrink-0" style={{
              background: '#B7FF1A',
              color: '#0B221C'
            }} aria-label="Voir le calendrier complet">
                  <ChevronRight size={12} />
                  <span>Calendrier</span>
                </button>
              </div>
            </div>}

          {/* ══ MEDIA TAB ══ */}
          {activeTab === 'media' && <div className="flex flex-col gap-4">
              <h2 className="text-[10px] font-black uppercase tracking-[0.2em]" style={{
            color: '#8A938C'
          }}>Contenus médias</h2>

              {/* Featured video */}
              <article className="relative rounded-[24px] overflow-hidden" style={{
            height: 200
          }}>
                <img src={team.media[0].img} alt={team.media[0].title} className="w-full h-full object-cover" style={{
              filter: 'brightness(0.4)'
            }} />
                <div className="absolute inset-0" style={{
              background: 'linear-gradient(to top, rgba(11,34,28,0.95) 0%, rgba(11,34,28,0.15) 55%)'
            }} />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full flex items-center justify-center" style={{
                background: 'rgba(183,255,26,0.15)',
                backdropFilter: 'blur(8px)',
                border: '1.5px solid rgba(183,255,26,0.3)'
              }}>
                    <PlayCircle size={28} style={{
                  color: '#B7FF1A'
                }} />
                  </div>
                </div>
                <div className="absolute top-4 left-4 flex items-center gap-1.5 px-2.5 py-1 rounded-lg" style={{
              background: '#8E2B36'
            }}>
                  <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{
                background: '#B7FF1A'
              }} />
                  <span className="text-[9px] font-black uppercase tracking-wider" style={{
                color: '#F2EEDC'
              }}>À la une</span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-[15px] font-black leading-snug" style={{
                color: '#F2EEDC'
              }}>{team.media[0].title}</h3>
                  <div className="flex items-center gap-3 mt-1">
                    <div className="flex items-center gap-1">
                      <PlayCircle size={11} style={{
                    color: '#B7FF1A'
                  }} />
                      <span className="text-[10px] font-bold" style={{
                    color: '#D7DBC8'
                  }}>{team.media[0].duration}</span>
                    </div>
                    <span className="text-[10px] font-bold" style={{
                  color: '#8A938C'
                }}>{team.media[0].views} vues</span>
                  </div>
                </div>
              </article>

              {/* Media grid */}
              <div className="grid grid-cols-2 gap-3">
                {team.media.slice(1).map(item => <article key={item.id} className="relative rounded-[20px] overflow-hidden" style={{
              aspectRatio: '4/5'
            }}>
                    <img src={item.img} alt={item.title} className="w-full h-full object-cover" style={{
                filter: 'brightness(0.45)'
              }} />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{
                  background: 'rgba(183,255,26,0.12)',
                  backdropFilter: 'blur(6px)',
                  border: '1px solid rgba(183,255,26,0.25)'
                }}>
                        {item.type === 'video' ? <PlayCircle size={16} style={{
                    color: '#B7FF1A'
                  }} /> : <Camera size={16} style={{
                    color: '#B7FF1A'
                  }} />}
                      </div>
                    </div>
                    <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-md" style={{
                background: 'rgba(11,34,28,0.8)',
                backdropFilter: 'blur(4px)'
              }}>
                      <span className="text-[9px] font-black" style={{
                  color: '#D7DBC8'
                }}>{item.duration}</span>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-3" style={{
                background: 'linear-gradient(to top, rgba(11,34,28,0.95), transparent)'
              }}>
                      <p className="text-[9px] font-bold leading-snug" style={{
                  color: '#D7DBC8'
                }}>{item.title}</p>
                      <p className="text-[8px] mt-0.5" style={{
                  color: '#8A938C'
                }}>{item.views} vues</p>
                    </div>
                  </article>)}
              </div>

              {/* Share CTA */}
              <div className="rounded-[20px] px-4 py-4 flex items-center justify-between" style={{
            background: 'rgba(183,255,26,0.05)',
            border: '1px solid rgba(183,255,26,0.12)'
          }}>
                <div className="flex items-center gap-3">
                  <Zap size={16} style={{
                color: '#B7FF1A'
              }} />
                  <div>
                    <p className="text-[11px] font-black" style={{
                  color: '#F2EEDC'
                }}>Partage l'équipe</p>
                    <p className="text-[9px] font-semibold" style={{
                  color: '#8A938C'
                }}>Fais connaître <span>{team.name}</span></p>
                  </div>
                </div>
                <button className="flex items-center gap-1.5 px-3.5 py-2 rounded-[12px] text-[10px] font-black uppercase tracking-wider flex-shrink-0" style={{
              background: '#B7FF1A',
              color: '#0B221C'
            }} aria-label={`Partager la page de l'équipe ${team.name}`}>
                  <Share2 size={11} />
                  <span>Partager</span>
                </button>
              </div>
            </div>}

        </motion.div>
      </AnimatePresence>
    </div>;
};