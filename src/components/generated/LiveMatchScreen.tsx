import React, { useState, useEffect } from 'react';
import { Shield, MapPin, Clock, ChevronLeft, Target, AlertTriangle, ArrowUpRight, Users, Star, Zap, Activity, RefreshCw, ListChecks, Shuffle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// ─── Types ────────────────────────────────────────────────────────────────────

type LiveTab = 'live' | 'lineup';
interface TimelineEvent {
  id: string;
  minute: number;
  type: 'goal' | 'yellow_card' | 'red_card' | 'substitution' | 'assist';
  team: 'home' | 'away';
  playerName: string;
  playerOut?: string;
  detail?: string;
}
interface LiveLineupPlayer {
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
}
interface BenchPlayer {
  id: string;
  name: string;
  number: number;
  position: string;
  isCaptain: boolean;
  img: string;
}
interface MVPCandidate {
  id: string;
  name: string;
  team: string;
  votes: number;
  img: string;
  stat: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const TIMELINE_EVENTS: TimelineEvent[] = [{
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
  detail: "47'"
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
const HOME_LINEUP: LiveLineupPlayer[] = [{
  id: 'l1',
  name: 'A. Touazi',
  number: 1,
  position: 'GK',
  positionLabel: 'Gardien',
  isCaptain: false,
  img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=80&h=80',
  rating: 7.1
}, {
  id: 'l2',
  name: 'T. Garnier',
  number: 5,
  position: 'CB',
  positionLabel: 'Défenseur',
  isCaptain: false,
  img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=80&h=80',
  rating: 6.8
}, {
  id: 'l3',
  name: 'L. Favre',
  number: 3,
  position: 'LB',
  positionLabel: 'Défenseur',
  isCaptain: true,
  img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&h=80',
  rating: 6.4,
  yellowCard: true
}, {
  id: 'l4',
  name: 'M. Dubois',
  number: 4,
  position: 'CM',
  positionLabel: 'Milieu',
  isCaptain: false,
  img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=80&h=80',
  rating: 7.0
}, {
  id: 'l5',
  name: 'Y. Mebrouk',
  number: 8,
  position: 'CM',
  positionLabel: 'Milieu',
  isCaptain: false,
  img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&h=80',
  rating: 7.8,
  assists: 1
}, {
  id: 'l6',
  name: 'N. Bernard',
  number: 10,
  position: 'CM',
  positionLabel: 'Milieu',
  isCaptain: false,
  img: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=80&h=80',
  rating: 7.2,
  substitutedOn: 47
}, {
  id: 'l7',
  name: 'K. Bersot',
  number: 9,
  position: 'FW',
  positionLabel: 'Attaquant',
  isCaptain: false,
  img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=80&h=80',
  rating: 9.1,
  goals: 2
}];
const HOME_BENCH: BenchPlayer[] = [{
  id: 'hb1',
  name: 'P. Lefebvre',
  number: 12,
  position: 'GK',
  isCaptain: false,
  img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=60&h=60'
}, {
  id: 'hb2',
  name: 'J. Moreau',
  number: 14,
  position: 'MF',
  isCaptain: false,
  img: 'https://images.unsplash.com/photo-1542156822-6924d1a71ace?auto=format&fit=crop&w=60&h=60'
}, {
  id: 'hb3',
  name: 'T. Duval',
  number: 17,
  position: 'FW',
  isCaptain: false,
  img: 'https://images.unsplash.com/photo-1463453091185-61582044d556?auto=format&fit=crop&w=60&h=60'
}];
const AWAY_LINEUP: LiveLineupPlayer[] = [{
  id: 'a1',
  name: 'R. Blanc',
  number: 1,
  position: 'GK',
  positionLabel: 'Gardien',
  isCaptain: false,
  img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=80&h=80',
  rating: 6.3
}, {
  id: 'a2',
  name: 'K. Saidi',
  number: 6,
  position: 'CB',
  positionLabel: 'Défenseur',
  isCaptain: true,
  img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=80&h=80',
  rating: 6.7
}, {
  id: 'a3',
  name: 'B. Rizzi',
  number: 4,
  position: 'CB',
  positionLabel: 'Défenseur',
  isCaptain: false,
  img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=80&h=80',
  rating: 6.2
}, {
  id: 'a4',
  name: 'M. Fontaine',
  number: 7,
  position: 'CM',
  positionLabel: 'Milieu',
  isCaptain: false,
  img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&h=80',
  rating: 5.8,
  yellowCard: true
}, {
  id: 'a5',
  name: 'S. Leclerc',
  number: 3,
  position: 'CM',
  positionLabel: 'Milieu',
  isCaptain: false,
  img: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=80&h=80',
  rating: 6.5
}, {
  id: 'a6',
  name: 'C. Mora',
  number: 8,
  position: 'CM',
  positionLabel: 'Milieu',
  isCaptain: false,
  img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=80&h=80',
  rating: 6.6
}, {
  id: 'a7',
  name: 'R. Amiri',
  number: 11,
  position: 'FW',
  positionLabel: 'Attaquant',
  isCaptain: false,
  img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=80&h=80',
  rating: 7.5,
  goals: 1
}];
const AWAY_BENCH: BenchPlayer[] = [{
  id: 'ab1',
  name: 'D. Petrov',
  number: 13,
  position: 'GK',
  isCaptain: false,
  img: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&w=60&h=60'
}, {
  id: 'ab2',
  name: 'O. Diallo',
  number: 15,
  position: 'CB',
  isCaptain: false,
  img: 'https://images.unsplash.com/photo-1548372290-8d01b6c8e78c?auto=format&fit=crop&w=60&h=60'
}, {
  id: 'ab3',
  name: 'L. Nguyen',
  number: 19,
  position: 'FW',
  isCaptain: false,
  img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=60&h=60'
}];
const MVP_CANDIDATES: MVPCandidate[] = [{
  id: 'm1',
  name: 'Killian Bersot',
  team: 'Annecy FC',
  votes: 68,
  img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=80&h=80',
  stat: '2 buts'
}, {
  id: 'm2',
  name: 'Yassin Mebrouk',
  team: 'Annecy FC',
  votes: 22,
  img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&h=80',
  stat: '1 passe déc.'
}, {
  id: 'm3',
  name: 'Rayan Amiri',
  team: 'Seynod City',
  votes: 10,
  img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=80&h=80',
  stat: '1 but'
}];
const LIVE_TABS: {
  id: LiveTab;
  label: string;
  icon: React.ReactNode;
}[] = [{
  id: 'live',
  label: 'Temps réel',
  icon: <Activity size={13} />
}, {
  id: 'lineup',
  label: 'Compos',
  icon: <ListChecks size={13} />
}];
const FORMATION_ROWS_HOME: number[][] = [[0], [1, 2], [3, 4, 5], [6]];
const FORMATION_ROWS_AWAY: number[][] = [[0], [1, 2], [3, 4, 5], [6]];

// ─── Helper: event config ─────────────────────────────────────────────────────

const EVENT_CONFIG: Record<TimelineEvent['type'], {
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

// ─── LiveMatchScreen ──────────────────────────────────────────────────────────

interface LiveMatchScreenProps {
  onBack: () => void;
}
export const LiveMatchScreen = ({
  onBack
}: LiveMatchScreenProps) => {
  const [activeTab, setActiveTab] = useState<LiveTab>('live');
  const [minute, setMinute] = useState(78);
  const [votedMvp, setVotedMvp] = useState<string | null>(null);
  const [lineupTeam, setLineupTeam] = useState<'home' | 'away'>('home');
  useEffect(() => {
    const interval = setInterval(() => {
      setMinute(prev => prev < 90 ? prev + 1 : prev);
    }, 8000);
    return () => clearInterval(interval);
  }, []);
  const homeGoals = TIMELINE_EVENTS.filter(e => e.type === 'goal' && e.team === 'home').length;
  const awayGoals = TIMELINE_EVENTS.filter(e => e.type === 'goal' && e.team === 'away').length;
  const totalVotes = MVP_CANDIDATES.reduce((sum, c) => sum + c.votes, 0);
  const activeLineup = lineupTeam === 'home' ? HOME_LINEUP : AWAY_LINEUP;
  const activeBench = lineupTeam === 'home' ? HOME_BENCH : AWAY_BENCH;
  const activeTeamName = lineupTeam === 'home' ? 'Annecy FC' : 'Seynod City';
  const activeFormation = '1-2-3-1';
  const activeFormationRows = lineupTeam === 'home' ? FORMATION_ROWS_HOME : FORMATION_ROWS_AWAY;
  const activeTeamAvgRating = (activeLineup.reduce((s, p) => s + (p.rating ?? 0), 0) / activeLineup.filter(p => p.rating).length).toFixed(1);
  return <div className="min-h-screen w-full overflow-x-hidden pb-24" style={{
    background: '#0B221C',
    color: '#F2EEDC'
  }}>

      {/* ── LIVE HERO SCOREBOARD ─────────────────────────────────────────── */}
      <div className="relative overflow-hidden" style={{
      background: 'linear-gradient(180deg, #0F2B23 0%, #0B221C 100%)'
    }}>
        {/* Pitch texture overlay */}
        <div className="absolute inset-0" style={{
        opacity: 0.03,
        backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 28px, rgba(255,255,255,1) 28px, rgba(255,255,255,1) 29px),
            repeating-linear-gradient(90deg, transparent, transparent 28px, rgba(255,255,255,1) 28px, rgba(255,255,255,1) 29px)`
      }} />
        {/* Ambient glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-36 rounded-full" style={{
        background: 'radial-gradient(ellipse, rgba(142,43,54,0.35) 0%, transparent 70%)',
        filter: 'blur(24px)'
      }} />

        {/* Back button + header */}
        <div className="relative z-10 flex items-center justify-between px-5 pt-12 pb-4">
          <button onClick={onBack} className="flex items-center gap-1.5 px-3 py-2 rounded-[12px]" style={{
          background: 'rgba(255,255,255,0.05)',
          color: '#8A938C'
        }} aria-label="Retour">
            <ChevronLeft size={16} />
            <span className="text-[10px] font-black uppercase tracking-wider">Retour</span>
          </button>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-[10px]" style={{
            background: '#8E2B36'
          }}>
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{
              background: '#B7FF1A'
            }} />
              <span className="text-[9px] font-black uppercase tracking-wider" style={{
              color: '#F2EEDC'
            }}>En Direct</span>
            </div>
            <div className="flex items-center gap-1 px-2.5 py-1.5 rounded-[10px]" style={{
            background: 'rgba(183,255,26,0.1)',
            border: '1px solid rgba(183,255,26,0.2)'
          }}>
              <Clock size={9} style={{
              color: '#B7FF1A'
            }} />
              <span className="text-[11px] font-black" style={{
              color: '#B7FF1A'
            }}>{minute}'</span>
            </div>
          </div>
        </div>

        {/* Match context */}
        <div className="relative z-10 px-5 mb-3">
          <div className="flex items-center gap-2">
            <span className="text-[9px] font-black uppercase tracking-[0.2em] px-2.5 py-1 rounded-lg" style={{
            background: 'rgba(201,193,162,0.08)',
            color: '#C9C1A2',
            border: '1px solid rgba(201,193,162,0.12)'
          }}>
              Élite · Summer Cup S3
            </span>
            <div className="flex items-center gap-1">
              <MapPin size={8} style={{
              color: '#8A938C'
            }} />
              <span className="text-[9px] font-semibold" style={{
              color: '#8A938C'
            }}>Terrain des Marquisats</span>
            </div>
          </div>
        </div>

        {/* SCORE BLOCK */}
        <div className="relative z-10 px-5 pb-8">
          <div className="flex items-center justify-between">
            {/* Home team */}
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

            {/* Score */}
            <div className="flex flex-col items-center gap-2 px-2">
              <motion.div key={`${homeGoals}-${awayGoals}`} initial={{
              scale: 1.1
            }} animate={{
              scale: 1
            }} transition={{
              duration: 0.3
            }} className="flex items-center gap-2">
                <span className="text-[68px] font-black tracking-[-0.06em] leading-none tabular-nums" style={{
                color: '#F2EEDC'
              }}>{homeGoals}</span>
                <span className="text-[32px] font-black" style={{
                color: '#8A938C'
              }}>–</span>
                <span className="text-[68px] font-black tracking-[-0.06em] leading-none tabular-nums" style={{
                color: '#D7DBC8'
              }}>{awayGoals}</span>
              </motion.div>
              <div className="w-24 h-1 rounded-full overflow-hidden" style={{
              background: 'rgba(255,255,255,0.07)'
            }}>
                <motion.div initial={{
                width: '0%'
              }} animate={{
                width: `${Math.min(minute / 90 * 100, 100)}%`
              }} transition={{
                duration: 1,
                ease: 'easeOut'
              }} className="h-full rounded-full" style={{
                background: 'linear-gradient(90deg, #2E8F57, #B7FF1A)'
              }} />
              </div>
              <span className="text-[8px] font-black uppercase tracking-widest" style={{
              color: '#8A938C'
            }}>
                {minute < 45 ? '1ère mi-temps' : '2ème mi-temps'}
              </span>
            </div>

            {/* Away team */}
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

          {/* Goal scorers quick line */}
          <div className="mt-5 flex items-center justify-between px-4 py-2.5 rounded-[16px]" style={{
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.06)'
        }}>
            <div className="flex flex-col gap-0.5">
              {TIMELINE_EVENTS.filter(e => e.type === 'goal' && e.team === 'home').map(e => <div key={e.id} className="flex items-center gap-1.5">
                  <Target size={8} style={{
                color: '#B7FF1A'
              }} />
                  <span className="text-[9px] font-bold" style={{
                color: '#D7DBC8'
              }}>
                    {e.playerName} <span style={{
                  color: '#8A938C'
                }}>{e.minute}'</span>
                  </span>
                </div>)}
            </div>
            <div className="w-px h-8" style={{
            background: 'rgba(255,255,255,0.06)'
          }} />
            <div className="flex flex-col items-end gap-0.5">
              {TIMELINE_EVENTS.filter(e => e.type === 'goal' && e.team === 'away').map(e => <div key={e.id} className="flex items-center gap-1.5">
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
        </div>
      </div>

      {/* ── TAB NAV ──────────────────────────────────────────────────────── */}
      <div className="sticky top-0 z-20 px-5 py-3 flex gap-2" style={{
      background: 'rgba(11,34,28,0.95)',
      backdropFilter: 'blur(16px)',
      borderBottom: '1px solid rgba(255,255,255,0.05)'
    }}>
        {LIVE_TABS.map(tab => <button key={tab.id} onClick={() => setActiveTab(tab.id)} className="flex items-center gap-1.5 px-4 py-2 rounded-[12px] text-[10px] font-black uppercase tracking-wide whitespace-nowrap transition-all flex-1 justify-center" style={activeTab === tab.id ? {
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

      {/* ── TAB CONTENT ──────────────────────────────────────────────────── */}
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

          {/* ── LIVE TAB ─────────────────────────────────────────────────── */}
          {activeTab === 'live' && <div className="flex flex-col gap-6">

              {/* Timeline */}
              <section>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-[10px] font-black uppercase tracking-[0.2em]" style={{
                color: '#8A938C'
              }}>Fil du Match</h2>
                  <div className="flex items-center gap-1.5">
                    <RefreshCw size={9} style={{
                  color: '#B7FF1A'
                }} />
                    <span className="text-[9px] font-black" style={{
                  color: '#B7FF1A'
                }}>En direct</span>
                  </div>
                </div>
                <div className="flex flex-col gap-0">
                  {[...TIMELINE_EVENTS].reverse().map((event, idx) => {
                const cfg = EVENT_CONFIG[event.type];
                const isHome = event.team === 'home';
                if (event.type !== 'goal' && event.type !== 'assist' && event.type !== 'red_card') return null;
                return <motion.div key={event.id} initial={{
                  opacity: 0,
                  x: isHome ? -8 : 8
                }} animate={{
                  opacity: 1,
                  x: 0
                }} transition={{
                  delay: idx * 0.04,
                  duration: 0.2
                }} className={`flex items-center gap-0 ${isHome ? 'flex-row' : 'flex-row-reverse'}`}>
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
                      }}>{event.playerName}</p>
                            {event.playerOut && <p className="text-[9px] font-semibold" style={{
                        color: '#8A938C'
                      }}>↓ {event.playerOut}</p>}
                            <p className="text-[9px] font-semibold" style={{
                        color: '#8A938C'
                      }}>{event.detail}</p>
                          </div>
                        </div>
                        <div className="flex flex-col items-center flex-shrink-0 w-12 gap-1">
                          <span className="text-[10px] font-black px-2 py-0.5 rounded-lg tabular-nums" style={{
                      background: 'rgba(255,255,255,0.05)',
                      color: cfg.color
                    }}>{event.minute}'</span>
                          {idx < TIMELINE_EVENTS.length - 1 && <div className="w-px h-4" style={{
                      background: 'rgba(255,255,255,0.06)'
                    }} />}
                        </div>
                        <div className="flex-1" />
                      </motion.div>;
              })}
                </div>
              </section>

              {/* Scorers summary */}
              <section>
                <h2 className="text-[10px] font-black uppercase tracking-[0.2em] mb-3" style={{
              color: '#8A938C'
            }}>Buteurs & Passeurs</h2>
                <div className="rounded-[20px] overflow-hidden" style={{
              background: '#123129',
              border: '1px solid rgba(255,255,255,0.06)'
            }}>
                  {TIMELINE_EVENTS.filter(e => e.type === 'goal' || e.type === 'assist').map((event, i, arr) => {
                const cfg = EVENT_CONFIG[event.type];
                return <div key={event.id} className="flex items-center gap-3 px-4 py-3" style={{
                  borderBottom: i < arr.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none'
                }}>
                        <div className="w-7 h-7 rounded-[9px] flex items-center justify-center flex-shrink-0" style={{
                    background: cfg.bgColor,
                    color: cfg.color
                  }}>{cfg.icon}</div>
                        <div className="flex-1">
                          <p className="text-[12px] font-black" style={{
                      color: '#F2EEDC'
                    }}>{event.playerName}</p>
                          <p className="text-[9px] font-semibold" style={{
                      color: '#8A938C'
                    }}>{event.team === 'home' ? 'Annecy FC' : 'Seynod City'} · {cfg.label}</p>
                        </div>
                        <span className="text-[10px] font-black px-2 py-0.5 rounded-md tabular-nums" style={{
                    background: 'rgba(255,255,255,0.05)',
                    color: cfg.color
                  }}>{event.minute}'</span>
                      </div>;
              })}
                </div>
              </section>

              {/* Cards summary */}
              <section>
                <h2 className="text-[10px] font-black uppercase tracking-[0.2em] mb-3" style={{
              color: '#8A938C'
            }}>Cartons Rouges</h2>
                <div className="flex gap-2">
                  {TIMELINE_EVENTS.filter(e => e.type === 'red_card').length === 0 ? <p className="text-[10px] font-semibold" style={{
                color: '#8A938C'
              }}>Aucun carton rouge</p> : TIMELINE_EVENTS.filter(e => e.type === 'red_card').map(event => {
                return <div key={event.id} className="flex-1 flex items-center gap-2.5 px-3 py-3 rounded-[16px]" style={{
                  background: 'rgba(217,75,91,0.07)',
                  border: '1px solid rgba(217,75,91,0.15)'
                }}>
                        <div className="w-4 h-5 rounded-[3px] flex-shrink-0" style={{
                    background: '#D94B5B'
                  }} />
                        <div>
                          <p className="text-[10px] font-black" style={{
                      color: '#F2EEDC'
                    }}>{event.playerName}</p>
                          <p className="text-[8px] font-semibold" style={{
                      color: '#8A938C'
                    }}>{event.team === 'home' ? 'Annecy FC' : 'Seynod City'} · {event.minute}'</p>
                        </div>
                      </div>;
              })}
                </div>
              </section>

              {/* MVP Vote */}
              <section className="mb-4">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-[10px] font-black uppercase tracking-[0.2em]" style={{
                color: '#8A938C'
              }}>Vote MVP du Match</h2>
                  <div className="flex items-center gap-1 px-2 py-1 rounded-lg" style={{
                background: 'rgba(201,193,162,0.08)',
                border: '1px solid rgba(201,193,162,0.12)'
              }}>
                    <Users size={9} style={{
                  color: '#C9C1A2'
                }} />
                    <span className="text-[9px] font-black" style={{
                  color: '#C9C1A2'
                }}>{totalVotes + (votedMvp ? 1 : 0)} votes</span>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  {MVP_CANDIDATES.map((candidate, i) => {
                const isVoted = votedMvp === candidate.id;
                const isLeader = i === 0;
                const votePct = Math.round(candidate.votes / totalVotes * 100);
                return <motion.button key={candidate.id} whileTap={{
                  scale: 0.98
                }} onClick={() => setVotedMvp(candidate.id)} className="flex items-center gap-3 p-3 rounded-[18px] w-full text-left transition-all" style={{
                  background: isVoted ? 'rgba(183,255,26,0.07)' : isLeader ? 'rgba(201,193,162,0.04)' : 'rgba(255,255,255,0.02)',
                  border: isVoted ? '1.5px solid rgba(183,255,26,0.3)' : isLeader ? '1px solid rgba(201,193,162,0.1)' : '1px solid rgba(255,255,255,0.05)'
                }}>
                        <div className="relative flex-shrink-0">
                          <div className="w-11 h-11 rounded-[14px] overflow-hidden" style={{
                      border: isVoted ? '1.5px solid rgba(183,255,26,0.4)' : isLeader ? '1.5px solid rgba(201,193,162,0.25)' : '1px solid rgba(255,255,255,0.08)'
                    }}>
                            <img src={candidate.img} alt={`Portrait de ${candidate.name}`} className="w-full h-full object-cover" />
                          </div>
                          {isLeader && <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center" style={{
                      background: '#C9C1A2'
                    }}>
                              <Star size={7} fill="#0B221C" style={{
                        color: '#0B221C'
                      }} />
                            </div>}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[12px] font-black" style={{
                      color: '#F2EEDC'
                    }}>{candidate.name}</p>
                          <p className="text-[9px] font-semibold" style={{
                      color: '#8A938C'
                    }}>{candidate.team} · {candidate.stat}</p>
                          <div className="w-full h-1 rounded-full overflow-hidden mt-1.5" style={{
                      background: 'rgba(255,255,255,0.07)'
                    }}>
                            <motion.div initial={{
                        width: '0%'
                      }} animate={{
                        width: `${votePct}%`
                      }} transition={{
                        duration: 0.8,
                        ease: 'easeOut'
                      }} className="h-full rounded-full" style={{
                        background: isVoted ? '#B7FF1A' : isLeader ? '#C9C1A2' : '#8A938C'
                      }} />
                          </div>
                        </div>
                        <span className="text-[12px] font-black flex-shrink-0 tabular-nums" style={{
                    color: isVoted ? '#B7FF1A' : isLeader ? '#C9C1A2' : '#8A938C'
                  }}>{votePct}%</span>
                      </motion.button>;
              })}
                  {!votedMvp && <p className="text-[9px] font-semibold text-center mt-1" style={{
                color: '#8A938C'
              }}>Touchez pour voter</p>}
                  {votedMvp && <motion.div initial={{
                opacity: 0,
                y: 4
              }} animate={{
                opacity: 1,
                y: 0
              }} className="flex items-center justify-center gap-1.5 py-2">
                      <Zap size={10} style={{
                  color: '#B7FF1A'
                }} />
                      <span className="text-[9px] font-black uppercase tracking-wider" style={{
                  color: '#B7FF1A'
                }}>Vote enregistré !</span>
                    </motion.div>}
                </div>
              </section>
            </div>}

          {/* ── COMPOS TAB ─── Performance uniquement, sans filtres ────────── */}
          {activeTab === 'lineup' && <div className="flex flex-col gap-4">

              {/* Team header */}
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

              {/* Team toggle */}
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

              {/* PITCH VISUAL */}
              <div className="rounded-[20px] overflow-hidden" style={{
            background: 'linear-gradient(180deg, #0d2a1e 0%, #102e22 40%, #0d2a1e 100%)',
            border: '1px solid rgba(255,255,255,0.07)'
          }}>
                <div className="relative w-full" style={{
              minHeight: 420
            }}>
                  {/* Grass stripes */}
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

                  {/* Players on pitch */}
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
                    const badgeLabel = player.rating !== undefined ? player.rating.toFixed(1) : '';
                    return <div key={player.id} className="flex flex-col items-center gap-1" style={{
                      minWidth: 60
                    }}>
                              <div className="relative">
                                <div className="w-12 h-12 rounded-full overflow-hidden" style={{
                          border: hasGoal ? '2.5px solid #B7FF1A' : hasAssist ? '2.5px solid #35D07F' : isSubOn ? '2.5px solid #7BA7D9' : '2px solid rgba(255,255,255,0.18)',
                          boxShadow: hasGoal ? '0 0 8px rgba(183,255,26,0.4)' : hasAssist ? '0 0 8px rgba(53,208,127,0.35)' : 'none'
                        }}>
                                  <img src={player.img} alt={`Photo de ${player.name}`} className="w-full h-full object-cover" />
                                </div>
                                {hasGoal && <div className="absolute -top-1 -left-1 w-5 h-5 rounded-full flex items-center justify-center" style={{
                          background: 'rgba(11,34,28,0.95)',
                          border: '1.5px solid #B7FF1A'
                        }}>
                                    <span style={{
                            fontSize: 9
                          }}>⚽</span>
                                  </div>}
                                {!hasGoal && hasAssist && <div className="absolute -top-1 -left-1 w-5 h-5 rounded-full flex items-center justify-center" style={{
                          background: 'rgba(11,34,28,0.95)',
                          border: '1.5px solid #35D07F'
                        }}>
                                    <span style={{
                            fontSize: 8
                          }}>🅰</span>
                                  </div>}
                                {player.yellowCard && <div className="absolute -top-1 -right-1 rounded-[2px]" style={{
                          background: '#F4C542',
                          width: 9,
                          height: 13
                        }} />}
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

                              {badgeLabel !== '' && <div className="px-2 py-0.5 rounded-[5px] flex items-center justify-center" style={{
                        background: ratingBg,
                        border: `1px solid ${ratingColor}50`,
                        minWidth: 36
                      }}>
                                  <span className="text-[10px] font-black tabular-nums leading-none" style={{
                          color: ratingColor,
                          whiteSpace: 'nowrap'
                        }}>
                                    {badgeLabel}
                                  </span>
                                </div>}

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

              {/* Banc de remplaçants */}
              <div className="mb-4">
                <h2 className="text-[10px] font-black uppercase tracking-[0.2em] mb-3" style={{
              color: '#8A938C'
            }}>Banc</h2>
                <div className="rounded-[20px] overflow-hidden" style={{
              background: '#0F2B23',
              border: '1px solid rgba(255,255,255,0.07)'
            }}>
                  {activeBench.map((player, i) => <div key={player.id} className="flex items-center gap-3 px-4 py-3" style={{
                borderBottom: i < activeBench.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none'
              }}>
                      <div className="w-9 h-9 rounded-full overflow-hidden flex-shrink-0" style={{
                  border: '1.5px solid rgba(123,167,217,0.25)',
                  opacity: 0.85
                }}>
                        <img src={player.img} alt={`Portrait de ${player.name}`} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="text-[9px] font-black px-1 py-0.5 rounded" style={{
                      background: 'rgba(255,255,255,0.06)',
                      color: '#8A938C'
                    }}>{player.number}</span>
                          <p className="text-[12px] font-black truncate" style={{
                      color: '#D7DBC8'
                    }}>{player.name}</p>
                        </div>
                        <p className="text-[9px] font-semibold mt-0.5" style={{
                    color: '#8A938C'
                  }}>{player.position}</p>
                      </div>
                      <div className="px-2 py-0.5 rounded-md" style={{
                  background: 'rgba(123,167,217,0.08)',
                  border: '1px solid rgba(123,167,217,0.15)'
                }}>
                        <span className="text-[8px] font-black" style={{
                    color: '#7BA7D9'
                  }}>REM</span>
                      </div>
                    </div>)}
                </div>
              </div>

            </div>}

        </motion.div>
      </AnimatePresence>
    </div>;
};