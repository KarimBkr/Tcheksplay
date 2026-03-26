import React, { useState } from 'react';
import { Shield, MapPin, Clock, ChevronLeft, Target, AlertTriangle, ArrowUpRight, Users, Star, Activity, Calendar, Filter, MessageCircle, Send, ThumbsUp, ChevronRight, PlayCircle, Camera, CheckCircle, Shuffle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// ─── Types ────────────────────────────────────────────────────────────────────

type MatchDetailTab = 'recap' | 'lineup' | 'media' | 'reactions';
type LineupViewMode = 'performance' | 'poste' | 'nationalite' | 'age';
interface MatchDetailEvent {
  id: string;
  minute: number;
  type: 'goal' | 'yellow_card' | 'red_card' | 'substitution' | 'assist';
  team: 'home' | 'away';
  playerName: string;
  playerOut?: string;
  detail?: string;
}
interface DetailLineupPlayer {
  id: string;
  name: string;
  number: number;
  position: string;
  positionLabel: string;
  isCaptain: boolean;
  img: string;
  rating?: number;
  goals?: number;
  assists?: number;
  yellowCard?: boolean;
  redCard?: boolean;
  substitutedOff?: number;
  substitutedOn?: number;
  nationality?: string;
  age?: number;
}
interface SubstitutionEntry {
  id: string;
  playerIn: string;
  playerInNumber: number;
  playerInImg: string;
  playerOut: string;
  minute: number;
  rating?: number;
}
interface MatchMedia {
  id: string;
  title: string;
  type: 'video' | 'photo';
  duration: string;
  img: string;
  views: string;
}
interface Reaction {
  id: string;
  user: string;
  avatar: string;
  text: string;
  likes: number;
  time: string;
  liked: boolean;
}
interface MatchDetailProps {
  matchId: string;
  onBack: () => void;
  onLive?: () => void;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const DETAIL_EVENTS: MatchDetailEvent[] = [{
  id: 'e1',
  minute: 12,
  type: 'goal',
  team: 'home',
  playerName: 'Killian Bersot',
  detail: 'Pied droit · Surface'
}, {
  id: 'e2',
  minute: 24,
  type: 'yellow_card',
  team: 'away',
  playerName: 'Marius Fontaine',
  detail: 'Faute'
}, {
  id: 'e3',
  minute: 31,
  type: 'goal',
  team: 'away',
  playerName: 'Rayan Amiri',
  detail: 'Tête · Corner'
}, {
  id: 'e4',
  minute: 47,
  type: 'substitution',
  team: 'home',
  playerName: 'Noah Bernard',
  playerOut: 'Théo Duval',
  detail: "Mi-temps"
}, {
  id: 'e5',
  minute: 58,
  type: 'goal',
  team: 'home',
  playerName: 'Killian Bersot',
  detail: 'Pied gauche · Distance'
}, {
  id: 'e6',
  minute: 65,
  type: 'assist',
  team: 'home',
  playerName: 'Yassin Mebrouk',
  detail: 'Passe décisive'
}, {
  id: 'e7',
  minute: 72,
  type: 'yellow_card',
  team: 'home',
  playerName: 'Lucas Favre',
  detail: 'Simulation'
}];
const DETAIL_HOME_LINEUP: DetailLineupPlayer[] = [{
  id: 'l1',
  name: 'A. Touazi',
  number: 1,
  position: 'GK',
  positionLabel: 'Gardien',
  isCaptain: false,
  img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=80&h=80',
  rating: 7.1,
  nationality: '🇫🇷 France',
  age: 24
}, {
  id: 'l2',
  name: 'T. Garnier',
  number: 5,
  position: 'CB',
  positionLabel: 'Défenseur',
  isCaptain: false,
  img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=80&h=80',
  rating: 6.8,
  nationality: '🇫🇷 France',
  age: 22
}, {
  id: 'l3',
  name: 'L. Favre',
  number: 3,
  position: 'LB',
  positionLabel: 'Défenseur',
  isCaptain: true,
  img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&h=80',
  rating: 6.4,
  yellowCard: true,
  nationality: '🇫🇷 France',
  age: 26
}, {
  id: 'l4',
  name: 'M. Dubois',
  number: 4,
  position: 'CM',
  positionLabel: 'Milieu',
  isCaptain: false,
  img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=80&h=80',
  rating: 7.0,
  nationality: '🇫🇷 France',
  age: 23
}, {
  id: 'l5',
  name: 'Y. Mebrouk',
  number: 8,
  position: 'CM',
  positionLabel: 'Milieu',
  isCaptain: false,
  img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&h=80',
  rating: 7.8,
  assists: 1,
  nationality: '🇩🇿 Algérie',
  age: 21
}, {
  id: 'l6',
  name: 'N. Bernard',
  number: 10,
  position: 'CM',
  positionLabel: 'Milieu',
  isCaptain: false,
  img: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=80&h=80',
  rating: 7.2,
  substitutedOn: 47,
  nationality: '🇫🇷 France',
  age: 20
}, {
  id: 'l7',
  name: 'K. Bersot',
  number: 9,
  position: 'FW',
  positionLabel: 'Attaquant',
  isCaptain: false,
  img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=80&h=80',
  rating: 9.1,
  goals: 2,
  nationality: '🇫🇷 France',
  age: 25
}];
const DETAIL_AWAY_LINEUP: DetailLineupPlayer[] = [{
  id: 'a1',
  name: 'R. Blanc',
  number: 1,
  position: 'GK',
  positionLabel: 'Gardien',
  isCaptain: false,
  img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=80&h=80',
  rating: 6.3,
  nationality: '🇫🇷 France',
  age: 28
}, {
  id: 'a2',
  name: 'K. Saidi',
  number: 6,
  position: 'CB',
  positionLabel: 'Défenseur',
  isCaptain: true,
  img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=80&h=80',
  rating: 6.7,
  nationality: '🇩🇿 Algérie',
  age: 27
}, {
  id: 'a3',
  name: 'B. Rizzi',
  number: 4,
  position: 'CB',
  positionLabel: 'Défenseur',
  isCaptain: false,
  img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=80&h=80',
  rating: 6.2,
  nationality: '🇮🇹 Italie',
  age: 25
}, {
  id: 'a4',
  name: 'M. Fontaine',
  number: 7,
  position: 'CM',
  positionLabel: 'Milieu',
  isCaptain: false,
  img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&h=80',
  rating: 5.8,
  yellowCard: true,
  nationality: '🇫🇷 France',
  age: 24
}, {
  id: 'a5',
  name: 'S. Leclerc',
  number: 3,
  position: 'CM',
  positionLabel: 'Milieu',
  isCaptain: false,
  img: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=80&h=80',
  rating: 6.5,
  nationality: '🇫🇷 France',
  age: 22
}, {
  id: 'a6',
  name: 'C. Mora',
  number: 8,
  position: 'CM',
  positionLabel: 'Milieu',
  isCaptain: false,
  img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=80&h=80',
  rating: 6.6,
  substitutedOff: 62,
  nationality: '🇪🇸 Espagne',
  age: 21
}, {
  id: 'a7',
  name: 'R. Amiri',
  number: 11,
  position: 'FW',
  positionLabel: 'Attaquant',
  isCaptain: false,
  img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=80&h=80',
  rating: 7.5,
  goals: 1,
  nationality: '🇩🇿 Algérie',
  age: 23
}];
const HOME_SUBS: SubstitutionEntry[] = [{
  id: 'hs1',
  playerIn: 'N. Bernard',
  playerInNumber: 10,
  playerInImg: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=80&h=80',
  playerOut: 'Théo Duval',
  minute: 47,
  rating: 7.2
}, {
  id: 'hs2',
  playerIn: 'Jordan Petit',
  playerInNumber: 14,
  playerInImg: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=80&h=80',
  playerOut: 'M. Dubois',
  minute: 68,
  rating: 6.9
}];
const AWAY_SUBS: SubstitutionEntry[] = [{
  id: 'as1',
  playerIn: 'D. Ferri',
  playerInNumber: 17,
  playerInImg: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=80&h=80',
  playerOut: 'C. Mora',
  minute: 62,
  rating: 6.1
}, {
  id: 'as2',
  playerIn: 'L. Vidal',
  playerInNumber: 22,
  playerInImg: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&h=80',
  playerOut: 'M. Fontaine',
  minute: 74,
  rating: undefined
}];
const MATCH_MEDIA_ITEMS: MatchMedia[] = [{
  id: 'med1',
  title: "But de Bersot — 58e minute",
  type: 'video',
  duration: '0:32',
  img: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=300&q=80',
  views: '1.8k'
}, {
  id: 'med2',
  title: "Galerie officielle · 24 photos",
  type: 'photo',
  duration: '24 photos',
  img: 'https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?auto=format&fit=crop&w=300&q=80',
  views: '942'
}, {
  id: 'med3',
  title: "Résumé du match · 2 min",
  type: 'video',
  duration: '2:04',
  img: 'https://images.unsplash.com/photo-1551958219-acbc595d4c80?auto=format&fit=crop&w=300&q=80',
  views: '3.2k'
}];
const REACTIONS_DATA: Reaction[] = [{
  id: 'r1',
  user: 'Thomas R.',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=60&h=60',
  text: 'Quelle performance de Bersot ce soir 🔥 Doublé + grande influence sur le jeu. Le meilleur joueur de la saison sans hésiter.',
  likes: 24,
  time: 'Il y a 12 min',
  liked: false
}, {
  id: 'r2',
  user: 'Ines M.',
  avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=60&h=60',
  text: 'Seynod a bien joué en première mi-temps mais Annecy a été trop fort. Belle ambiance aux Marquisats!',
  likes: 11,
  time: 'Il y a 18 min',
  liked: false
}, {
  id: 'r3',
  user: 'Karim A.',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=60&h=60',
  text: 'Le but du break à la 58e était incroyable. Pied gauche depuis 25m, ça rentre dans la lucarne. Pur talent.',
  likes: 36,
  time: 'Il y a 25 min',
  liked: true
}];
const DETAIL_TABS: {
  id: MatchDetailTab;
  label: string;
  icon: React.ReactNode;
}[] = [{
  id: 'recap',
  label: 'Résumé',
  icon: <Activity size={12} />
}, {
  id: 'lineup',
  label: 'Compos',
  icon: <Users size={12} />
}, {
  id: 'media',
  label: 'Médias',
  icon: <Camera size={12} />
}, {
  id: 'reactions',
  label: 'Réactions',
  icon: <MessageCircle size={12} />
}];
const EVENT_CFG: Record<MatchDetailEvent['type'], {
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  label: string;
}> = {
  goal: {
    icon: <Target size={11} />,
    color: '#B7FF1A',
    bgColor: 'rgba(183,255,26,0.12)',
    label: 'But'
  },
  yellow_card: {
    icon: <AlertTriangle size={10} />,
    color: '#F4C542',
    bgColor: 'rgba(244,197,66,0.12)',
    label: 'Carton jaune'
  },
  red_card: {
    icon: <AlertTriangle size={10} />,
    color: '#D94B5B',
    bgColor: 'rgba(217,75,91,0.12)',
    label: 'Carton rouge'
  },
  substitution: {
    icon: <Shuffle size={10} />,
    color: '#7BA7D9',
    bgColor: 'rgba(123,167,217,0.1)',
    label: 'Remplacement'
  },
  assist: {
    icon: <ArrowUpRight size={10} />,
    color: '#35D07F',
    bgColor: 'rgba(53,208,127,0.1)',
    label: 'Passe déc.'
  }
};
const LINEUP_VIEW_MODES: {
  id: LineupViewMode;
  label: string;
}[] = [{
  id: 'performance',
  label: 'Performance'
}, {
  id: 'poste',
  label: 'Poste'
}, {
  id: 'nationalite',
  label: 'Nationalité'
}, {
  id: 'age',
  label: 'Âge'
}];

// Formation rows for 7-a-side: GK / DEF-DEF / MID-MID-MID / FW
// player indices into the lineup array: [0]=GK, [1][2]=DEF, [3][4][5]=MID, [6]=FW
const FORMATION_ROWS_HOME: number[][] = [[0], [1, 2], [3, 4, 5], [6]];
const FORMATION_ROWS_AWAY: number[][] = [[0], [1, 2], [3, 4, 5], [6]];
function getRatingColor(rating: number): string {
  if (rating >= 8.5) return '#B7FF1A';
  if (rating >= 7.5) return '#35D07F';
  if (rating >= 6.5) return '#F4C542';
  if (rating >= 5.5) return '#FF8C42';
  return '#D94B5B';
}
function getRatingBg(rating: number): string {
  if (rating >= 8.5) return 'rgba(183,255,26,0.22)';
  if (rating >= 7.5) return 'rgba(53,208,127,0.22)';
  if (rating >= 6.5) return 'rgba(244,197,66,0.22)';
  if (rating >= 5.5) return 'rgba(255,140,66,0.22)';
  return 'rgba(217,75,91,0.22)';
}

// ─── MatchDetailScreen ────────────────────────────────────────────────────────

export const MatchDetailScreen = ({
  onBack,
  onLive
}: MatchDetailProps) => {
  const [activeTab, setActiveTab] = useState<MatchDetailTab>('recap');
  const [reactions, setReactions] = useState<Reaction[]>(REACTIONS_DATA);
  const [commentText, setCommentText] = useState('');
  const [lineupTeam, setLineupTeam] = useState<'home' | 'away'>('home');
  const [lineupView, setLineupView] = useState<LineupViewMode>('performance');
  const homeGoals = DETAIL_EVENTS.filter(e => e.type === 'goal' && e.team === 'home').length;
  const awayGoals = DETAIL_EVENTS.filter(e => e.type === 'goal' && e.team === 'away').length;
  const handleLike = (id: string) => {
    setReactions(prev => prev.map(r => r.id === id ? {
      ...r,
      liked: !r.liked,
      likes: r.liked ? r.likes - 1 : r.likes + 1
    } : r));
  };
  const activeLineup = lineupTeam === 'home' ? DETAIL_HOME_LINEUP : DETAIL_AWAY_LINEUP;
  const activeSubs = lineupTeam === 'home' ? HOME_SUBS : AWAY_SUBS;
  const activeTeamName = lineupTeam === 'home' ? 'Annecy FC' : 'Seynod City';
  const activeFormation = '1-2-3-1';
  const activeFormationRows = lineupTeam === 'home' ? FORMATION_ROWS_HOME : FORMATION_ROWS_AWAY;
  const activeTeamAvgRating = (activeLineup.reduce((s, p) => s + (p.rating ?? 0), 0) / activeLineup.filter(p => p.rating).length).toFixed(1);
  return <div className="min-h-screen w-full overflow-x-hidden pb-28" style={{
    background: '#0B221C',
    color: '#F2EEDC'
  }}>
      {/* ── HERO SCOREBOARD ── */}
      <div className="relative overflow-hidden" style={{
      background: 'linear-gradient(180deg, #0F2B23 0%, #0B221C 100%)'
    }}>
        {/* pitch texture */}
        <div className="absolute inset-0" style={{
        opacity: 0.025,
        backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 28px, rgba(255,255,255,1) 28px, rgba(255,255,255,1) 29px), repeating-linear-gradient(90deg, transparent, transparent 28px, rgba(255,255,255,1) 28px, rgba(255,255,255,1) 29px)`
      }} />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-40 rounded-full" style={{
        background: 'radial-gradient(ellipse, rgba(46,143,87,0.2) 0%, transparent 70%)',
        filter: 'blur(32px)'
      }} />

        {/* Back + badges */}
        <div className="relative z-10 flex items-center justify-between px-5 pt-12 pb-4">
          <button onClick={onBack} className="flex items-center gap-1.5 px-3 py-2 rounded-[12px]" style={{
          background: 'rgba(255,255,255,0.05)',
          color: '#8A938C'
        }} aria-label="Retour">
            <ChevronLeft size={16} />
            <span className="text-[10px] font-black uppercase tracking-wider">Retour</span>
          </button>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1.5 rounded-[10px] text-[9px] font-black uppercase tracking-wider" style={{
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.08)',
            color: '#8A938C'
          }}>
              <span>FT · Terminé</span>
            </span>
            {onLive && <button onClick={onLive} className="flex items-center gap-1.5 px-3 py-1.5 rounded-[10px]" style={{
            background: '#8E2B36'
          }}>
                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{
              background: '#B7FF1A'
            }} />
                <span className="text-[9px] font-black uppercase tracking-wider" style={{
              color: '#F2EEDC'
            }}>
                  En Direct
                </span>
              </button>}
          </div>
        </div>

        {/* Context */}
        <div className="relative z-10 px-5 mb-3 flex items-center gap-2">
          <span className="text-[9px] font-black uppercase tracking-[0.2em] px-2.5 py-1 rounded-lg" style={{
          background: 'rgba(201,193,162,0.08)',
          color: '#C9C1A2',
          border: '1px solid rgba(201,193,162,0.12)'
        }}>
            <span>Élite · Summer Cup S3</span>
          </span>
          <div className="flex items-center gap-1">
            <MapPin size={8} style={{
            color: '#8A938C'
          }} />
            <span className="text-[9px] font-semibold" style={{
            color: '#8A938C'
          }}>
              Terrain des Marquisats
            </span>
          </div>
        </div>

        {/* Score */}
        <div className="relative z-10 px-5 pb-6">
          <div className="flex items-center justify-between">
            <div className="flex flex-col items-center gap-3 flex-1">
              <div className="w-16 h-16 rounded-[22px] flex items-center justify-center" style={{
              background: 'rgba(46,143,87,0.18)',
              border: '1.5px solid rgba(46,143,87,0.35)'
            }}>
                <Shield size={26} style={{
                color: '#2E8F57'
              }} />
              </div>
              <div className="text-center">
                <p className="text-[15px] font-black leading-none" style={{
                color: '#F2EEDC'
              }}>Annecy FC</p>
                <p className="text-[9px] font-bold mt-0.5 uppercase tracking-wide" style={{
                color: '#2E8F57'
              }}>Domicile</p>
              </div>
            </div>

            <div className="flex flex-col items-center gap-1.5 px-2">
              <div className="flex items-center gap-2">
                <span className="text-[64px] font-black tracking-[-0.06em] leading-none tabular-nums" style={{
                color: '#F2EEDC'
              }}>
                  {homeGoals}
                </span>
                <span className="text-[28px] font-black" style={{
                color: '#8A938C'
              }}>–</span>
                <span className="text-[64px] font-black tracking-[-0.06em] leading-none tabular-nums" style={{
                color: '#D7DBC8'
              }}>
                  {awayGoals}
                </span>
              </div>
              <div className="w-24 h-1 rounded-full overflow-hidden" style={{
              background: 'rgba(255,255,255,0.07)'
            }}>
                <div className="h-full w-full rounded-full" style={{
                background: 'linear-gradient(90deg, #2E8F57, #B7FF1A)'
              }} />
              </div>
              <span className="text-[8px] font-black uppercase tracking-widest" style={{
              color: '#8A938C'
            }}>
                Temps Plein
              </span>
              <div className="flex items-center gap-1.5 mt-1">
                <Calendar size={8} style={{
                color: '#8A938C'
              }} />
                <span className="text-[8px] font-semibold" style={{
                color: '#8A938C'
              }}>Hier · 19:00</span>
              </div>
            </div>

            <div className="flex flex-col items-center gap-3 flex-1">
              <div className="w-16 h-16 rounded-[22px] flex items-center justify-center" style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1.5px solid rgba(255,255,255,0.1)'
            }}>
                <Shield size={26} style={{
                color: '#8A938C'
              }} />
              </div>
              <div className="text-center">
                <p className="text-[15px] font-black leading-none" style={{
                color: '#D7DBC8'
              }}>Seynod City</p>
                <p className="text-[9px] font-bold mt-0.5 uppercase tracking-wide" style={{
                color: '#8A938C'
              }}>Extérieur</p>
              </div>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between px-4 py-2.5 rounded-[16px]" style={{
          background: 'rgba(201,193,162,0.03)',
          border: '1px solid rgba(201,193,162,0.06)'
        }}>
            <div className="flex flex-col gap-0.5">
              {DETAIL_EVENTS.filter(e => e.type === 'goal' && e.team === 'home').map(e => <div key={e.id} className="flex items-center gap-1.5">
                  <Target size={8} style={{
                color: '#B7FF1A'
              }} />
                  <span className="text-[9px] font-bold" style={{
                color: '#D7DBC8'
              }}>
                    {e.playerName}{' '}
                    <span style={{
                  color: '#8A938C'
                }}>{e.minute}'</span>
                  </span>
                </div>)}
            </div>
            <div className="w-px h-8" style={{
            background: 'rgba(255,255,255,0.06)'
          }} />
            <div className="flex flex-col items-end gap-0.5">
              {DETAIL_EVENTS.filter(e => e.type === 'goal' && e.team === 'away').map(e => <div key={e.id} className="flex items-center gap-1.5">
                  <span className="text-[9px] font-bold" style={{
                color: '#D7DBC8'
              }}>
                    <span style={{
                  color: '#8A938C'
                }}>{e.minute}'</span> {e.playerName}
                  </span>
                  <Target size={8} style={{
                color: '#8A938C'
              }} />
                </div>)}
            </div>
          </div>

          <div className="mt-3 flex items-center gap-3 px-4 py-3 rounded-[16px]" style={{
          background: 'rgba(201,193,162,0.05)',
          border: '1px solid rgba(201,193,162,0.1)'
        }}>
            <div className="w-9 h-9 rounded-[12px] overflow-hidden flex-shrink-0" style={{
            border: '1.5px solid rgba(201,193,162,0.3)'
          }}>
              <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=80&h=80" alt="Portrait du MVP du match" className="w-full h-full object-cover" />
            </div>
            <div className="flex-1">
              <p className="text-[8px] font-black uppercase tracking-[0.15em]" style={{
              color: 'rgba(201,193,162,0.6)'
            }}>
                MVP du Match
              </p>
              <p className="text-[13px] font-black leading-tight" style={{
              color: '#F2EEDC'
            }}>
                Killian Bersot
              </p>
              <p className="text-[9px] font-semibold" style={{
              color: '#8A938C'
            }}>
                2 buts · Annecy FC
              </p>
            </div>
            <div className="flex flex-col items-center gap-0.5">
              <Star size={14} fill="#C9C1A2" style={{
              color: '#C9C1A2'
            }} />
              <span className="text-[8px] font-black" style={{
              color: '#C9C1A2'
            }}>Élu</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── TAB BAR ── */}
      <div className="sticky top-0 z-20 flex overflow-x-auto gap-1.5 px-5 py-3" style={{
      background: 'rgba(11,34,28,0.95)',
      backdropFilter: 'blur(16px)',
      borderBottom: '1px solid rgba(255,255,255,0.05)',
      scrollbarWidth: 'none'
    }}>
        {DETAIL_TABS.map(tab => <button key={tab.id} onClick={() => setActiveTab(tab.id)} className="flex items-center gap-1.5 px-3.5 py-2 rounded-[12px] text-[10px] font-black uppercase tracking-wide whitespace-nowrap flex-shrink-0 transition-all" style={activeTab === tab.id ? {
        background: '#B7FF1A',
        color: '#0B221C'
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
        y: 8
      }} animate={{
        opacity: 1,
        y: 0
      }} exit={{
        opacity: 0,
        y: -6
      }} transition={{
        duration: 0.18,
        ease: 'easeOut'
      }} className="px-5 pt-5">

          {/* ── RÉSUMÉ ── */}
          {activeTab === 'recap' && <div className="flex flex-col gap-6">
              <section>
                <h2 className="text-[10px] font-black uppercase tracking-[0.2em] mb-4" style={{
              color: '#8A938C'
            }}>
                  Fil du Match
                </h2>
                <div className="flex flex-col gap-0">
                  {[...DETAIL_EVENTS].reverse().map((event, idx) => {
                const cfg = EVENT_CFG[event.type];
                const isHome = event.team === 'home';
                return <motion.div key={event.id} initial={{
                  opacity: 0,
                  x: isHome ? -8 : 8
                }} animate={{
                  opacity: 1,
                  x: 0
                }} transition={{
                  delay: idx * 0.04,
                  duration: 0.2
                }} className={`flex items-center ${isHome ? 'flex-row' : 'flex-row-reverse'}`}>
                        <div className={`flex items-center gap-2 flex-1 py-3 ${isHome ? 'pr-3' : 'pl-3 flex-row-reverse'}`}>
                          <div className="w-8 h-8 rounded-[10px] flex items-center justify-center flex-shrink-0" style={{
                      background: cfg.bgColor,
                      color: cfg.color
                    }}>
                            {cfg.icon}
                          </div>
                          <div className={`flex flex-col ${isHome ? 'items-start' : 'items-end'}`}>
                            <p className="text-[11px] font-black" style={{
                        color: '#F2EEDC'
                      }}>
                              {event.playerName}
                            </p>
                            {event.playerOut && <p className="text-[9px] font-semibold" style={{
                        color: '#8A938C'
                      }}>
                                ↓ {event.playerOut}
                              </p>}
                            <p className="text-[9px] font-semibold" style={{
                        color: '#8A938C'
                      }}>
                              {event.detail}
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-col items-center flex-shrink-0 w-12 gap-1">
                          <span className="text-[10px] font-black px-2 py-0.5 rounded-lg tabular-nums" style={{
                      background: 'rgba(255,255,255,0.05)',
                      color: cfg.color
                    }}>
                            {event.minute}'
                          </span>
                          {idx < DETAIL_EVENTS.length - 1 && <div className="w-px h-4" style={{
                      background: 'rgba(255,255,255,0.06)'
                    }} />}
                        </div>
                        <div className="flex-1" />
                      </motion.div>;
              })}
                </div>
              </section>

              <section>
                <h2 className="text-[10px] font-black uppercase tracking-[0.2em] mb-3" style={{
              color: '#8A938C'
            }}>
                  Buteurs & Passeurs
                </h2>
                <div className="rounded-[20px] overflow-hidden" style={{
              background: '#123129',
              border: '1px solid rgba(255,255,255,0.06)'
            }}>
                  {DETAIL_EVENTS.filter(e => e.type === 'goal' || e.type === 'assist').map((event, i, arr) => {
                const cfg = EVENT_CFG[event.type];
                return <div key={event.id} className="flex items-center gap-3 px-4 py-3" style={{
                  borderBottom: i < arr.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none'
                }}>
                        <div className="w-7 h-7 rounded-[9px] flex items-center justify-center flex-shrink-0" style={{
                    background: cfg.bgColor,
                    color: cfg.color
                  }}>
                          {cfg.icon}
                        </div>
                        <div className="flex-1">
                          <p className="text-[12px] font-black" style={{
                      color: '#F2EEDC'
                    }}>
                            {event.playerName}
                          </p>
                          <p className="text-[9px] font-semibold" style={{
                      color: '#8A938C'
                    }}>
                            {event.team === 'home' ? 'Annecy FC' : 'Seynod City'} · {cfg.label}
                          </p>
                        </div>
                        <span className="text-[10px] font-black px-2 py-0.5 rounded-md tabular-nums" style={{
                    background: 'rgba(255,255,255,0.05)',
                    color: cfg.color
                  }}>
                          {event.minute}'
                        </span>
                      </div>;
              })}
                </div>
              </section>

              <section className="mb-2">
                <h2 className="text-[10px] font-black uppercase tracking-[0.2em] mb-3" style={{
              color: '#8A938C'
            }}>
                  Cartons
                </h2>
                <div className="flex flex-col gap-2">
                  {DETAIL_EVENTS.filter(e => e.type === 'yellow_card' || e.type === 'red_card').map(event => {
                const isYellow = event.type === 'yellow_card';
                return <div key={event.id} className="flex items-center gap-3 px-4 py-3 rounded-[16px]" style={{
                  background: isYellow ? 'rgba(244,197,66,0.06)' : 'rgba(217,75,91,0.06)',
                  border: `1px solid ${isYellow ? 'rgba(244,197,66,0.14)' : 'rgba(217,75,91,0.14)'}`
                }}>
                        <div className="w-4 h-5 rounded-[3px] flex-shrink-0" style={{
                    background: isYellow ? '#F4C542' : '#D94B5B'
                  }} />
                        <div className="flex-1">
                          <p className="text-[12px] font-black" style={{
                      color: '#F2EEDC'
                    }}>
                            {event.playerName}
                          </p>
                          <p className="text-[9px] font-semibold" style={{
                      color: '#8A938C'
                    }}>
                            {event.team === 'home' ? 'Annecy FC' : 'Seynod City'} · {event.detail}
                          </p>
                        </div>
                        <span className="text-[10px] font-black tabular-nums" style={{
                    color: isYellow ? '#F4C542' : '#D94B5B'
                  }}>
                          {event.minute}'
                        </span>
                      </div>;
              })}
                </div>
              </section>
            </div>}

          {/* ── COMPOS ── */}
          {activeTab === 'lineup' && <div className="flex flex-col gap-4">

              {/* ── View mode filter chips ── */}
              <div className="flex gap-2 overflow-x-auto pb-1" style={{
            scrollbarWidth: 'none'
          }}>
                {LINEUP_VIEW_MODES.map(mode => <button key={mode.id} onClick={() => setLineupView(mode.id)} className="flex items-center gap-1.5 px-4 py-2 rounded-full text-[11px] font-black whitespace-nowrap flex-shrink-0 transition-all" style={lineupView === mode.id ? {
              background: '#F2EEDC',
              color: '#0B221C'
            } : {
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.1)',
              color: '#8A938C'
            }}>
                    {mode.id === 'performance' && lineupView === mode.id && <span style={{
                fontSize: 8
              }}>▼ </span>}
                    <span>{mode.label}</span>
                  </button>)}
              </div>

              {/* ── Team header ── */}
              <div className="rounded-[18px] px-4 py-3 flex items-center justify-between" style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.07)'
          }}>
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-[10px] flex items-center justify-center flex-shrink-0" style={{
                background: lineupTeam === 'home' ? 'rgba(46,143,87,0.2)' : 'rgba(255,255,255,0.07)',
                border: lineupTeam === 'home' ? '1px solid rgba(46,143,87,0.3)' : '1px solid rgba(255,255,255,0.1)'
              }}>
                    <Shield size={14} style={{
                  color: lineupTeam === 'home' ? '#2E8F57' : '#8A938C'
                }} />
                  </div>
                  <div>
                    <p className="text-[13px] font-black leading-none" style={{
                  color: '#F2EEDC'
                }}>{activeTeamName}</p>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className="text-[9px] font-black px-1.5 py-0.5 rounded" style={{
                    background: 'rgba(244,197,66,0.18)',
                    color: '#F4C542'
                  }}>{activeTeamAvgRating}</span>
                      <span className="text-[9px] font-semibold" style={{
                    color: '#8A938C'
                  }}>Note moy.</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black px-2.5 py-1 rounded-md" style={{
                background: 'rgba(255,255,255,0.06)',
                color: '#8A938C'
              }}>{activeFormation}</span>
                  <div className="w-7 h-8 rounded-[6px] overflow-hidden" style={{
                border: '1px solid rgba(255,255,255,0.1)'
              }}>
                    <div className="w-full h-1/2" style={{
                  background: lineupTeam === 'home' ? '#2E8F57' : '#E8E8E8'
                }} />
                    <div className="w-full h-1/2" style={{
                  background: lineupTeam === 'home' ? '#F2EEDC' : '#3B5BDB'
                }} />
                  </div>
                </div>
              </div>

              {/* ── Team toggle ── */}
              <div className="flex items-center rounded-full p-1" style={{
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.08)'
          }}>
                <button onClick={() => setLineupTeam('home')} className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-full text-[11px] font-black transition-all" style={lineupTeam === 'home' ? {
              background: '#F2EEDC',
              color: '#0B221C'
            } : {
              color: '#8A938C'
            }}>
                  <Shield size={11} style={{
                color: lineupTeam === 'home' ? '#2E8F57' : '#8A938C'
              }} />
                  <span>Annecy FC</span>
                </button>
                <button onClick={() => setLineupTeam('away')} className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-full text-[11px] font-black transition-all" style={lineupTeam === 'away' ? {
              background: '#F2EEDC',
              color: '#0B221C'
            } : {
              color: '#8A938C'
            }}>
                  <Shield size={11} style={{
                color: lineupTeam === 'away' ? '#3B5BDB' : '#8A938C'
              }} />
                  <span>Seynod City</span>
                </button>
              </div>

              {/* ── PITCH VISUAL ── */}
              <div className="rounded-[20px] overflow-hidden" style={{
            background: 'linear-gradient(180deg, #0d2a1e 0%, #102e22 40%, #0d2a1e 100%)',
            border: '1px solid rgba(255,255,255,0.07)'
          }}>
                {/* Pitch markings */}
                <div className="relative w-full" style={{
              minHeight: 420
            }}>
                  {/* Pitch grass stripes */}
                  <div className="absolute inset-0" style={{
                backgroundImage: 'repeating-linear-gradient(180deg, rgba(255,255,255,0.015) 0px, rgba(255,255,255,0.015) 30px, transparent 30px, transparent 60px)'
              }} />
                  {/* Center line */}
                  <div className="absolute left-6 right-6" style={{
                top: '50%',
                height: '1px',
                background: 'rgba(255,255,255,0.12)'
              }} />
                  {/* Center circle */}
                  <div className="absolute" style={{
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 64,
                height: 64,
                borderRadius: '50%',
                border: '1px solid rgba(255,255,255,0.12)'
              }} />
                  {/* Top goal area */}
                  <div className="absolute" style={{
                top: 0,
                left: '50%',
                transform: 'translateX(-50%)',
                width: 90,
                height: 28,
                border: '1px solid rgba(255,255,255,0.12)',
                borderTop: 'none'
              }} />
                  {/* Bottom goal area */}
                  <div className="absolute" style={{
                bottom: 0,
                left: '50%',
                transform: 'translateX(-50%)',
                width: 90,
                height: 28,
                border: '1px solid rgba(255,255,255,0.12)',
                borderBottom: 'none'
              }} />

                  {/* Players on pitch — rows from top (FW) to bottom (GK), mirroring SofaScore layout */}
                  <div className="relative z-10 flex flex-col justify-between py-6 px-2" style={{
                minHeight: 420
              }}>
                    {[...activeFormationRows].reverse().map((row, rowIdx) => <div key={`row-${rowIdx}`} className="flex items-center justify-around">
                        {row.map(playerIdx => {
                    const player = activeLineup[playerIdx];
                    if (!player) return null;
                    const hasGoal = (player.goals ?? 0) > 0;
                    const hasAssist = (player.assists ?? 0) > 0;
                    const isSubOn = !!player.substitutedOn;
                    const isSubOff = !!player.substitutedOff;
                    const ratingColor = player.rating ? getRatingColor(player.rating) : '#8A938C';
                    const ratingBg = player.rating ? getRatingBg(player.rating) : 'rgba(138,147,140,0.15)';
                    let badgeLabel: string = '';
                    if (lineupView === 'performance') badgeLabel = player.rating !== undefined ? player.rating.toFixed(1) : '';else if (lineupView === 'poste') badgeLabel = player.positionLabel;else if (lineupView === 'nationalite') badgeLabel = player.nationality ?? player.positionLabel;else if (lineupView === 'age') badgeLabel = player.age ? `${player.age} ans` : '';
                    return <div key={player.id} className="flex flex-col items-center gap-1" style={{
                      minWidth: 60
                    }}>
                              {/* Avatar with icons */}
                              <div className="relative">
                                <div className="w-12 h-12 rounded-full overflow-hidden" style={{
                          border: hasGoal ? '2.5px solid #B7FF1A' : hasAssist ? '2.5px solid #35D07F' : isSubOn ? '2.5px solid #7BA7D9' : '2px solid rgba(255,255,255,0.18)',
                          boxShadow: hasGoal ? '0 0 8px rgba(183,255,26,0.4)' : hasAssist ? '0 0 8px rgba(53,208,127,0.35)' : 'none'
                        }}>
                                  <img src={player.img} alt={`Photo de ${player.name}`} className="w-full h-full object-cover" />
                                </div>

                                {/* Goal icon top-left */}
                                {hasGoal && <div className="absolute -top-1 -left-1 w-5 h-5 rounded-full flex items-center justify-center" style={{
                          background: 'rgba(11,34,28,0.95)',
                          border: '1.5px solid #B7FF1A'
                        }}>
                                  <span style={{
                            fontSize: 9
                          }}>⚽</span>
                                </div>}

                                {/* Assist icon top-left (if no goal) */}
                                {!hasGoal && hasAssist && <div className="absolute -top-1 -left-1 w-5 h-5 rounded-full flex items-center justify-center" style={{
                          background: 'rgba(11,34,28,0.95)',
                          border: '1.5px solid #35D07F'
                        }}>
                                  <span style={{
                            fontSize: 8
                          }}>🅰</span>
                                </div>}

                                {/* Yellow card top-right */}
                                {player.yellowCard && <div className="absolute -top-1 -right-1 w-3.5 h-4.5 rounded-[2px]" style={{
                          background: '#F4C542',
                          width: 9,
                          height: 13
                        }} />}

                                {/* Sub-on badge bottom-right */}
                                {isSubOn && <div className="absolute -bottom-0.5 -right-0.5 w-5 h-5 rounded-full flex items-center justify-center" style={{
                          background: '#0B221C',
                          border: '1.5px solid #7BA7D9'
                        }}>
                                  <span style={{
                            fontSize: 8,
                            color: '#7BA7D9',
                            fontWeight: 900
                          }}>↑</span>
                                </div>}

                                {/* Sub-off badge bottom-right */}
                                {isSubOff && <div className="absolute -bottom-0.5 -right-0.5 w-5 h-5 rounded-full flex items-center justify-center" style={{
                          background: '#0B221C',
                          border: '1.5px solid #D94B5B'
                        }}>
                                  <span style={{
                            fontSize: 8,
                            color: '#D94B5B',
                            fontWeight: 900
                          }}>↓</span>
                                </div>}

                                {/* Captain badge */}
                                {player.isCaptain && <div className="absolute -bottom-0.5 -left-0.5 w-4 h-4 rounded-full flex items-center justify-center" style={{
                          background: '#C9C1A2',
                          border: '1px solid rgba(255,255,255,0.2)'
                        }}>
                                  <span style={{
                            fontSize: 7,
                            color: '#0B221C',
                            fontWeight: 900
                          }}>C</span>
                                </div>}
                              </div>

                              {/* Rating / label badge */}
                              {badgeLabel !== '' && <div className="px-2 py-0.5 rounded-[5px] flex items-center justify-center" style={lineupView === 'performance' ? {
                        background: ratingBg,
                        border: `1px solid ${ratingColor}50`,
                        minWidth: 36
                      } : {
                        background: 'rgba(255,255,255,0.08)',
                        border: '1px solid rgba(255,255,255,0.12)',
                        minWidth: 36
                      }}>
                                <span className="text-[10px] font-black tabular-nums leading-none" style={{
                          color: lineupView === 'performance' ? ratingColor : '#C9C1A2',
                          whiteSpace: 'nowrap'
                        }}>
                                  {badgeLabel}
                                </span>
                              </div>}

                              {/* Number + name */}
                              <div className="flex flex-col items-center gap-0" style={{
                        maxWidth: 64
                      }}>
                                <span className="text-[10px] font-black leading-none" style={{
                          color: '#F2EEDC'
                        }}>
                                  {player.number} <span style={{
                            color: '#C9C1A2'
                          }}>{player.name.split(' ')[0]}</span>
                                </span>
                              </div>
                            </div>;
                  })}
                      </div>)}
                  </div>
                </div>
              </div>

              {/* ── Substitutions ── */}
              {activeSubs.length > 0 && <div>
                  <h2 className="text-[10px] font-black uppercase tracking-[0.2em] mb-3" style={{
              color: '#8A938C'
            }}>
                    Remplacements
                  </h2>
                  <div className="rounded-[20px] overflow-hidden" style={{
              background: '#0F2B23',
              border: '1px solid rgba(255,255,255,0.07)'
            }}>
                    {activeSubs.map((sub, i) => <div key={sub.id} className="flex items-center gap-3 px-4 py-3" style={{
                borderBottom: i < activeSubs.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none'
              }}>
                        <div className="relative flex-shrink-0">
                          <div className="w-10 h-10 rounded-full overflow-hidden" style={{
                    border: '2px solid rgba(123,167,217,0.3)'
                  }}>
                            <img src={sub.playerInImg} alt={`Portrait de ${sub.playerIn}`} className="w-full h-full object-cover" />
                          </div>
                          <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full flex items-center justify-center" style={{
                    background: '#1A3D4F',
                    border: '1.5px solid #7BA7D9'
                  }}>
                            <span style={{
                      fontSize: 7,
                      color: '#7BA7D9',
                      fontWeight: 900
                    }}>↑</span>
                          </div>
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className="text-[9px] font-black px-1 py-0.5 rounded" style={{
                      background: 'rgba(255,255,255,0.06)',
                      color: '#8A938C'
                    }}>
                              {sub.playerInNumber}
                            </span>
                            <p className="text-[12px] font-black truncate" style={{
                      color: '#F2EEDC'
                    }}>
                              {sub.playerIn}
                            </p>
                          </div>
                          <div className="flex items-center gap-1 mt-0.5">
                            <span className="text-[9px]" style={{
                      color: '#35D07F'
                    }}>↑</span>
                            <span className="text-[9px] font-semibold" style={{
                      color: '#8A938C'
                    }}>
                              {sub.minute}'{' · '}Remplace {sub.playerOut}
                            </span>
                          </div>
                        </div>

                        {sub.rating !== undefined && <div className="flex-shrink-0 w-10 h-8 rounded-[8px] flex items-center justify-center" style={{
                  background: getRatingBg(sub.rating),
                  border: `1px solid ${getRatingColor(sub.rating)}40`
                }}>
                            <span className="text-[13px] font-black tabular-nums" style={{
                    color: getRatingColor(sub.rating)
                  }}>
                              {sub.rating.toFixed(1)}
                            </span>
                          </div>}
                      </div>)}
                  </div>
                </div>}

            </div>}

          {/* ── MÉDIAS ── */}
          {activeTab === 'media' && <div className="flex flex-col gap-4">
              <div className="relative rounded-[24px] overflow-hidden" style={{
            height: '200px'
          }}>
                <img src={MATCH_MEDIA_ITEMS[2].img} alt={MATCH_MEDIA_ITEMS[2].title} className="w-full h-full object-cover" style={{
              filter: 'brightness(0.45)'
            }} />
                <div className="absolute inset-0" style={{
              background: 'linear-gradient(to top, rgba(11,34,28,0.95) 0%, transparent 50%)'
            }} />
                <div className="absolute top-4 left-4 px-2.5 py-1 rounded-lg flex items-center gap-1.5" style={{
              background: '#8E2B36'
            }}>
                  <span className="text-[9px] font-black uppercase tracking-wider" style={{
                color: '#F2EEDC'
              }}>Résumé</span>
                </div>
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
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="text-[15px] font-black leading-snug" style={{
                color: '#F2EEDC'
              }}>{MATCH_MEDIA_ITEMS[2].title}</p>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-[9px] font-bold" style={{
                  color: '#B7FF1A'
                }}>{MATCH_MEDIA_ITEMS[2].duration}</span>
                    <span className="text-[9px] font-semibold" style={{
                  color: '#8A938C'
                }}>{MATCH_MEDIA_ITEMS[2].views} vues</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {MATCH_MEDIA_ITEMS.map(item => <article key={item.id} className="relative rounded-[18px] overflow-hidden" style={{
              aspectRatio: '4/5'
            }}>
                    <img src={item.img} alt={item.title} className="w-full h-full object-cover" style={{
                filter: 'brightness(0.48)'
              }} />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{
                  background: 'rgba(183,255,26,0.12)',
                  backdropFilter: 'blur(6px)',
                  border: '1px solid rgba(183,255,26,0.25)'
                }}>
                        {item.type === 'video' ? <PlayCircle size={16} style={{
                    color: '#B7FF1A'
                  }} /> : <Camera size={14} style={{
                    color: '#B7FF1A'
                  }} />}
                      </div>
                    </div>
                    <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-md" style={{
                background: 'rgba(11,34,28,0.8)'
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
                      <span className="text-[8px]" style={{
                  color: '#8A938C'
                }}>{item.views} vues</span>
                    </div>
                  </article>)}
              </div>
            </div>}

          {/* ── RÉACTIONS ── */}
          {activeTab === 'reactions' && <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3 p-3 rounded-[18px]" style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.07)'
          }}>
                <div className="w-8 h-8 rounded-[10px] overflow-hidden flex-shrink-0" style={{
              border: '1px solid rgba(255,255,255,0.08)'
            }}>
                  <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=60&h=60" alt="Avatar utilisateur" className="w-full h-full object-cover" />
                </div>
                <input type="text" placeholder="Ton avis sur ce match…" aria-label="Ajouter un commentaire" value={commentText} onChange={e => setCommentText(e.target.value)} className="flex-1 bg-transparent text-[12px] font-medium focus:outline-none" style={{
              color: '#D7DBC8'
            }} />
                <button className="w-8 h-8 rounded-[10px] flex items-center justify-center flex-shrink-0" style={{
              background: commentText.trim() ? '#B7FF1A' : 'rgba(255,255,255,0.06)',
              color: commentText.trim() ? '#0B221C' : '#8A938C'
            }} aria-label="Envoyer">
                  <Send size={14} />
                </button>
              </div>

              <div className="flex items-center gap-4 px-4 py-3 rounded-[16px]" style={{
            background: '#123129',
            border: '1px solid rgba(255,255,255,0.06)'
          }}>
                <div className="flex flex-col items-center flex-1">
                  <span className="text-[18px] font-black" style={{
                color: '#F2EEDC'
              }}>{reactions.length}</span>
                  <span className="text-[8px] font-black uppercase tracking-wider" style={{
                color: '#8A938C'
              }}>Réactions</span>
                </div>
                <div className="w-px h-8" style={{
              background: 'rgba(255,255,255,0.05)'
            }} />
                <div className="flex flex-col items-center flex-1">
                  <span className="text-[18px] font-black" style={{
                color: '#B7FF1A'
              }}>
                    {reactions.reduce((s, r) => s + r.likes, 0)}
                  </span>
                  <span className="text-[8px] font-black uppercase tracking-wider" style={{
                color: '#8A938C'
              }}>Likes</span>
                </div>
                <div className="w-px h-8" style={{
              background: 'rgba(255,255,255,0.05)'
            }} />
                <div className="flex flex-col items-center flex-1">
                  <span className="text-[18px] font-black" style={{
                color: '#C9C1A2'
              }}>K. Bersot</span>
                  <span className="text-[8px] font-black uppercase tracking-wider" style={{
                color: '#8A938C'
              }}>+ mentionné</span>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                {reactions.map(reaction => <div key={reaction.id} className="p-4 rounded-[18px]" style={{
              background: '#123129',
              border: '1px solid rgba(255,255,255,0.05)'
            }}>
                    <div className="flex items-center gap-2.5 mb-2.5">
                      <div className="w-8 h-8 rounded-[10px] overflow-hidden flex-shrink-0" style={{
                  border: '1px solid rgba(255,255,255,0.08)'
                }}>
                        <img src={reaction.avatar} alt={`Avatar de ${reaction.user}`} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <p className="text-[11px] font-black" style={{
                    color: '#F2EEDC'
                  }}>{reaction.user}</p>
                        <p className="text-[8px] font-semibold" style={{
                    color: '#8A938C'
                  }}>{reaction.time}</p>
                      </div>
                      <button onClick={() => handleLike(reaction.id)} className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-[10px] transition-all" style={{
                  background: reaction.liked ? 'rgba(183,255,26,0.1)' : 'rgba(255,255,255,0.04)',
                  border: reaction.liked ? '1px solid rgba(183,255,26,0.25)' : '1px solid rgba(255,255,255,0.06)'
                }}>
                        <ThumbsUp size={10} style={{
                    color: reaction.liked ? '#B7FF1A' : '#8A938C'
                  }} fill={reaction.liked ? '#B7FF1A' : 'none'} />
                        <span className="text-[9px] font-black tabular-nums" style={{
                    color: reaction.liked ? '#B7FF1A' : '#8A938C'
                  }}>
                          {reaction.likes}
                        </span>
                      </button>
                    </div>
                    <p className="text-[12px] leading-relaxed" style={{
                color: '#D7DBC8'
              }}>
                      {reaction.text}
                    </p>
                  </div>)}
              </div>

              <div className="flex items-center gap-2 px-3 py-2.5 rounded-[12px] mb-2" style={{
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(255,255,255,0.05)'
          }}>
                <CheckCircle size={10} style={{
              color: '#35D07F'
            }} />
                <span className="text-[9px] font-semibold" style={{
              color: '#8A938C'
            }}>
                  Espace modéré · Respectez l'esprit du playground
                </span>
              </div>
            </div>}
        </motion.div>
      </AnimatePresence>
    </div>;
};

// ─── EnhancedMatchesScreen ────────────────────────────────────────────────────

type MatchStatus = 'all' | 'live' | 'upcoming' | 'finished';
type MatchCategory = 'all' | 'Élite' | 'Challenger';
interface FilteredMatch {
  id: string;
  homeTeam: string;
  awayTeam: string;
  homeScore?: number;
  awayScore?: number;
  time: string;
  status: 'live' | 'upcoming' | 'finished';
  category: string;
  venue: string;
  date: string;
  dayLabel: string;
}
const ALL_MATCHES: FilteredMatch[] = [{
  id: 'm1',
  homeTeam: 'Annecy FC',
  awayTeam: 'Seynod City',
  homeScore: 2,
  awayScore: 1,
  time: "FT",
  status: 'finished',
  category: 'Élite',
  venue: 'Terrain des Marquisats',
  date: '2025-05-20',
  dayLabel: 'Hier'
}, {
  id: 'm2',
  homeTeam: 'Veyrier Utd',
  awayTeam: 'Poisy Stars',
  time: '20:30',
  status: 'upcoming',
  category: 'Élite',
  venue: 'Plateau de Veyrier',
  date: '2025-05-21',
  dayLabel: "Auj."
}, {
  id: 'm3',
  homeTeam: 'Meythet FC',
  awayTeam: 'Cran Giants',
  homeScore: 0,
  awayScore: 3,
  time: 'FT',
  status: 'finished',
  category: 'Challenger',
  venue: 'Complexe de Meythet',
  date: '2025-05-20',
  dayLabel: 'Hier'
}, {
  id: 'm4',
  homeTeam: 'Annecy FC',
  awayTeam: 'Seynod City',
  homeScore: 2,
  awayScore: 1,
  time: "78'",
  status: 'live',
  category: 'Élite',
  venue: 'Terrain des Marquisats',
  date: '2025-05-21',
  dayLabel: 'Auj.'
}, {
  id: 'm5',
  homeTeam: 'Poisy Stars',
  awayTeam: 'Annecy FC',
  time: '18:00',
  status: 'upcoming',
  category: 'Élite',
  venue: 'Stade de Poisy',
  date: '2025-05-23',
  dayLabel: 'Mar.'
}, {
  id: 'm6',
  homeTeam: 'Seynod City',
  awayTeam: 'Veyrier Utd',
  time: '20:00',
  status: 'upcoming',
  category: 'Challenger',
  venue: 'Terrain de Seynod',
  date: '2025-05-24',
  dayLabel: 'Mer.'
}, {
  id: 'm7',
  homeTeam: 'Cran Giants',
  awayTeam: 'Meythet FC',
  homeScore: 2,
  awayScore: 0,
  time: 'FT',
  status: 'finished',
  category: 'Challenger',
  venue: 'Terrain de Cran',
  date: '2025-05-18',
  dayLabel: 'Dim.'
}];
const VENUES_LIST = ['Tous les terrains', 'Terrain des Marquisats', 'Plateau de Veyrier', 'Complexe de Meythet', 'Stade de Poisy', 'Terrain de Seynod', 'Terrain de Cran'];
const TEAMS_LIST = ['Toutes les équipes', 'Annecy FC', 'Veyrier Utd', 'Seynod City', 'Poisy Stars', 'Cran Giants', 'Meythet FC'];
const STATUS_CHIP_META = {
  live: {
    label: 'En Direct',
    bg: '#8E2B36',
    color: '#F2EEDC',
    dot: true
  },
  upcoming: {
    label: 'À Venir',
    bg: '#183C31',
    color: '#D7DBC8',
    dot: false
  },
  finished: {
    label: 'Terminé',
    bg: 'rgba(255,255,255,0.06)',
    color: '#8A938C',
    dot: false
  }
};
export const EnhancedMatchesScreen = ({
  onMatchDetail,
  onLive
}: {
  onMatchDetail: (id: string) => void;
  onLive: () => void;
}) => {
  const [statusFilter, setStatusFilter] = useState<MatchStatus>('all');
  const [categoryFilter, setCategoryFilter] = useState<MatchCategory>('all');
  const [showFilters, setShowFilters] = useState(false);
  const filtered = ALL_MATCHES.filter(m => {
    if (statusFilter !== 'all' && m.status !== statusFilter) return false;
    if (categoryFilter !== 'all' && m.category !== categoryFilter) return false;
    return true;
  });
  const activeFilterCount = [statusFilter !== 'all', categoryFilter !== 'all'].filter(Boolean).length;

  // Group matches by dayLabel in a stable order
  const DAY_ORDER = ['Auj.', 'Hier', 'Mar.', 'Mer.', 'Dim.'];
  const groupedByDay: {
    day: string;
    matches: FilteredMatch[];
  }[] = [];
  const seen = new Set<string>();
  // Live first, then upcoming (auj), then finished (desc)
  const sortOrder = (m: FilteredMatch) => {
    if (m.status === 'live') return 0;
    if (m.status === 'upcoming') return 1;
    return 2;
  };
  const sorted = [...filtered].sort((a, b) => sortOrder(a) - sortOrder(b));
  sorted.forEach(m => {
    if (!seen.has(m.dayLabel)) {
      seen.add(m.dayLabel);
      groupedByDay.push({
        day: m.dayLabel,
        matches: []
      });
    }
    groupedByDay.find(g => g.day === m.dayLabel)!.matches.push(m);
  });
  return <div className="flex flex-col gap-0 pb-4">
      {/* ── Header ── */}
      <div className="px-5 pt-12 pb-3">
        <h1 className="text-[22px] font-black tracking-[-0.03em] uppercase leading-none" style={{
        color: '#F2EEDC'
      }}>
          Matchs
        </h1>
        <p className="text-[10px] font-semibold mt-0.5" style={{
        color: '#8A938C'
      }}>
          Summer Cup – Saison 3 · {filtered.length} match{filtered.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* ── Status filter chips ── */}
      <div className="flex gap-2 px-5 pb-4 overflow-x-auto" style={{
      scrollbarWidth: 'none'
    }}>
        {(['all', 'live', 'upcoming', 'finished'] as MatchStatus[]).map(s => <button key={s} onClick={() => setStatusFilter(s)} className="flex items-center gap-1.5 px-3.5 py-2 rounded-full text-[10px] font-black uppercase tracking-wide whitespace-nowrap flex-shrink-0 transition-all" style={statusFilter === s ? {
        background: '#B7FF1A',
        color: '#0B221C'
      } : {
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.08)',
        color: '#8A938C'
      }}>
            {s === 'all' ? 'Tous' : s === 'live' ? 'En direct' : s === 'upcoming' ? 'À venir' : 'Terminés'}
          </button>)}
        {/* Category filter */}
        <button onClick={() => setShowFilters(v => !v)} className="flex items-center gap-1.5 px-3.5 py-2 rounded-full whitespace-nowrap flex-shrink-0 transition-all" style={showFilters || activeFilterCount > 0 ? {
        background: 'rgba(183,255,26,0.1)',
        border: '1px solid rgba(183,255,26,0.3)',
        color: '#B7FF1A'
      } : {
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.08)',
        color: '#8A938C'
      }}>
          <Filter size={12} />
          {activeFilterCount > 0 && <span className="w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-black" style={{
          background: '#B7FF1A',
          color: '#0B221C'
        }}>
              {activeFilterCount}
            </span>}
        </button>
      </div>

      {/* ── Category dropdown ── */}
      <AnimatePresence>
        {showFilters && <motion.div initial={{
        opacity: 0,
        height: 0
      }} animate={{
        opacity: 1,
        height: 'auto'
      }} exit={{
        opacity: 0,
        height: 0
      }} transition={{
        duration: 0.18
      }} className="overflow-hidden">
            <div className="mx-5 mb-4 rounded-[16px] p-4" style={{
          background: '#123129',
          border: '1px solid rgba(255,255,255,0.06)'
        }}>
              <p className="text-[8px] font-black uppercase tracking-[0.2em] mb-2" style={{
            color: '#8A938C'
          }}>Catégorie</p>
              <div className="flex gap-2">
                {(['all', 'Élite', 'Challenger'] as MatchCategory[]).map(cat => <button key={cat} onClick={() => setCategoryFilter(cat)} className="px-3.5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wide transition-all" style={categoryFilter === cat ? {
              background: '#B7FF1A',
              color: '#0B221C'
            } : {
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.08)',
              color: '#8A938C'
            }}>
                    {cat === 'all' ? 'Toutes' : cat}
                  </button>)}
              </div>
            </div>
          </motion.div>}
      </AnimatePresence>

      {/* ── Live indicator bar ── */}
      {filtered.some(m => m.status === 'live') && <div className="mx-5 mb-4 flex items-center gap-2 px-3 py-2 rounded-[12px]" style={{
      background: 'rgba(142,43,54,0.12)',
      border: '1px solid rgba(142,43,54,0.25)'
    }}>
          <span className="w-2 h-2 rounded-full animate-pulse" style={{
        background: '#B7FF1A'
      }} />
          <span className="text-[10px] font-black uppercase tracking-wider" style={{
        color: '#F4A5AE'
      }}>Match en cours maintenant</span>
        </div>}

      {/* ── Empty state ── */}
      {filtered.length === 0 && <div className="mx-5 py-14 rounded-[22px] flex flex-col items-center gap-3" style={{
      background: '#0F2B23',
      border: '1px solid rgba(255,255,255,0.05)'
    }}>
          <Calendar size={28} style={{
        color: '#8A938C'
      }} />
          <p className="text-[12px] font-black" style={{
        color: '#8A938C'
      }}>Aucun match trouvé</p>
          <button onClick={() => {
        setStatusFilter('all');
        setCategoryFilter('all');
      }} className="text-[10px] font-black px-3 py-1.5 rounded-full" style={{
        background: 'rgba(183,255,26,0.08)',
        color: '#B7FF1A',
        border: '1px solid rgba(183,255,26,0.15)'
      }}>
            Réinitialiser
          </button>
        </div>}

      {/* ── Grouped match list ── */}
      <div className="flex flex-col gap-6 px-5">
        {groupedByDay.map(group => <div key={group.day}>
            {/* Day header */}
            <div className="flex items-center gap-3 mb-3">
              <span className="text-[10px] font-black uppercase tracking-[0.2em]" style={{
            color: group.matches.some(m => m.status === 'live') ? '#B7FF1A' : '#556A61'
          }}>
                {group.day === 'Auj.' ? 'Aujourd\'hui' : group.day === 'Hier' ? 'Hier' : group.day === 'Mar.' ? 'Mardi' : group.day === 'Mer.' ? 'Mercredi' : group.day === 'Dim.' ? 'Dimanche' : group.day}
              </span>
              <div className="flex-1 h-px" style={{
            background: 'rgba(255,255,255,0.05)'
          }} />
              <span className="text-[8px] font-black" style={{
            color: '#556A61'
          }}>{group.matches.length} match{group.matches.length > 1 ? 's' : ''}</span>
            </div>

            {/* Cards */}
            <div className="flex flex-col gap-3">
              {group.matches.map(match => {
            const isLive = match.status === 'live';
            const isUpcoming = match.status === 'upcoming';
            const isFinished = match.status === 'finished';
            return <motion.article key={match.id} whileTap={{
              scale: 0.98
            }} onClick={() => isLive ? onLive() : onMatchDetail(match.id)} className="rounded-[22px] overflow-hidden cursor-pointer" style={{
              background: isLive ? 'linear-gradient(150deg, #2A0D13 0%, #1A1018 100%)' : '#0F2B23',
              border: isLive ? '1px solid rgba(142,43,54,0.4)' : '1px solid rgba(255,255,255,0.06)'
            }}>
                    {/* Row 1 — Status + Category */}
                    <div className="flex items-center justify-between px-4 pt-3.5 pb-2.5" style={{
                borderBottom: '1px solid rgba(255,255,255,0.04)'
              }}>
                      <div className="flex items-center gap-2">
                        {/* Status badge */}
                        <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-[7px] text-[8px] font-black uppercase tracking-wider" style={{
                    background: isLive ? 'rgba(142,43,54,0.3)' : isUpcoming ? 'rgba(123,167,217,0.1)' : 'rgba(255,255,255,0.05)',
                    color: isLive ? '#F4A5AE' : isUpcoming ? '#7BA7D9' : '#8A938C',
                    border: `1px solid ${isLive ? 'rgba(142,43,54,0.4)' : isUpcoming ? 'rgba(123,167,217,0.18)' : 'rgba(255,255,255,0.07)'}`
                  }}>
                          {isLive && <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{
                      background: '#B7FF1A'
                    }} />}
                          <span>{isLive ? 'En direct' : isUpcoming ? 'À venir' : 'Terminé'}</span>
                        </span>
                        {/* Time / minute */}
                        {isLive && <span className="text-[10px] font-black tabular-nums" style={{
                    color: '#B7FF1A'
                  }}>{match.time}</span>}
                        {isUpcoming && <span className="flex items-center gap-1">
                            <Clock size={9} style={{
                      color: '#7BA7D9'
                    }} />
                            <span className="text-[10px] font-bold tabular-nums" style={{
                      color: '#7BA7D9'
                    }}>{match.time}</span>
                          </span>}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="px-2 py-0.5 rounded-[6px] text-[8px] font-black uppercase" style={{
                    background: match.category === 'Élite' ? 'rgba(183,255,26,0.07)' : 'rgba(255,255,255,0.04)',
                    color: match.category === 'Élite' ? '#B7FF1A' : '#8A938C',
                    border: `1px solid ${match.category === 'Élite' ? 'rgba(183,255,26,0.12)' : 'rgba(255,255,255,0.07)'}`
                  }}>
                          {match.category}
                        </span>
                      </div>
                    </div>

                    {/* Row 2 — Teams + Score */}
                    <div className="flex items-center gap-3 px-4 py-3.5">
                      {/* Home team */}
                      <div className="flex items-center gap-2.5 flex-1 min-w-0">
                        <div className="w-9 h-9 rounded-[11px] flex items-center justify-center flex-shrink-0" style={{
                    background: 'rgba(46,143,87,0.12)',
                    border: '1px solid rgba(46,143,87,0.2)'
                  }}>
                          <Shield size={14} style={{
                      color: '#2E8F57'
                    }} />
                        </div>
                        <span className="text-[13px] font-black truncate" style={{
                    color: '#F2EEDC'
                  }}>{match.homeTeam}</span>
                      </div>

                      {/* Score or dash */}
                      <div className="flex-shrink-0 flex flex-col items-center gap-0.5">
                        {(isLive || isFinished) && match.homeScore !== undefined ? <span className="text-[22px] font-black tracking-[-0.04em] tabular-nums leading-none" style={{
                    color: '#F2EEDC'
                  }}>
                            {match.homeScore}
                            <span style={{
                      color: 'rgba(255,255,255,0.2)',
                      margin: '0 2px'
                    }}>–</span>
                            {match.awayScore}
                          </span> : <span className="text-[18px] font-black" style={{
                    color: 'rgba(255,255,255,0.2)'
                  }}>–</span>}
                        {isFinished && <span className="text-[7px] font-black uppercase tracking-widest" style={{
                    color: '#8A938C'
                  }}>Terminé</span>}
                      </div>

                      {/* Away team */}
                      <div className="flex items-center justify-end gap-2.5 flex-1 min-w-0">
                        <span className="text-[13px] font-black truncate text-right" style={{
                    color: '#D7DBC8'
                  }}>{match.awayTeam}</span>
                        <div className="w-9 h-9 rounded-[11px] flex items-center justify-center flex-shrink-0" style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.07)'
                  }}>
                          <Shield size={14} style={{
                      color: '#8A938C'
                    }} />
                        </div>
                      </div>
                    </div>

                    {/* Row 3 — Venue + CTA */}
                    <div className="flex items-center justify-between px-4 pb-3.5 pt-0.5">
                      <div className="flex items-center gap-1.5">
                        <MapPin size={9} style={{
                    color: '#556A61'
                  }} />
                        <span className="text-[9px] font-semibold truncate" style={{
                    color: '#556A61',
                    maxWidth: 160
                  }}>{match.venue}</span>
                      </div>
                      <div className="flex items-center gap-1" style={{
                  color: '#8A938C'
                }}>
                        <span className="text-[9px] font-black">{isLive ? 'Voir le live' : 'Détail'}</span>
                        <ChevronRight size={10} />
                      </div>
                    </div>
                  </motion.article>;
          })}
            </div>
          </div>)}
      </div>
    </div>;
};