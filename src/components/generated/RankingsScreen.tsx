import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Crown, Shield, Target, Activity, Star, Award, TrendingUp, ChevronRight, Users, Zap, Trophy, AlertTriangle, Info } from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────

type RankingTab = 'teams' | 'scorers' | 'assisters' | 'keepers';
type SeasonId = 's1' | 's2' | 's3';
interface TeamRank {
  id: string;
  rank: number;
  name: string;
  abbr: string;
  color: string;
  points: number;
  played: number;
  wins: number;
  draws: number;
  losses: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDiff: number;
  form: ('W' | 'D' | 'L')[];
  badge: 'champion' | 'mvp' | 'fairplay' | null;
}
interface PlayerRank {
  id: string;
  rank: number;
  name: string;
  firstName: string;
  team: string;
  teamColor: string;
  img: string;
  nationality: string;
  goals?: number;
  assists?: number;
  matches: number;
  rating: number;
  badge: 'top' | 'mvp' | null;
  goalsPerMatch?: number;
  assistsPerMatch?: number;
  cleanSheets?: number;
  saves?: number;
  saveRate?: number;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const TEAM_RANKINGS: TeamRank[] = [{
  id: 't1',
  rank: 1,
  name: 'Annecy FC',
  abbr: 'AFC',
  color: '#2E8F57',
  points: 45,
  played: 18,
  wins: 14,
  draws: 3,
  losses: 1,
  goalsFor: 42,
  goalsAgainst: 14,
  goalDiff: 28,
  form: ['W', 'W', 'W', 'D', 'W'],
  badge: 'champion'
}, {
  id: 't2',
  rank: 2,
  name: 'Veyrier Utd',
  abbr: 'VEY',
  color: '#7BA7D9',
  points: 38,
  played: 18,
  wins: 12,
  draws: 2,
  losses: 4,
  goalsFor: 35,
  goalsAgainst: 22,
  goalDiff: 13,
  form: ['W', 'L', 'W', 'W', 'D'],
  badge: null
}, {
  id: 't3',
  rank: 3,
  name: 'Seynod City',
  abbr: 'SEY',
  color: '#C9C1A2',
  points: 32,
  played: 18,
  wins: 10,
  draws: 2,
  losses: 6,
  goalsFor: 28,
  goalsAgainst: 24,
  goalDiff: 4,
  form: ['W', 'W', 'L', 'D', 'W'],
  badge: null
}, {
  id: 't4',
  rank: 4,
  name: 'Poisy Stars',
  abbr: 'POI',
  color: '#F4C542',
  points: 28,
  played: 18,
  wins: 8,
  draws: 4,
  losses: 6,
  goalsFor: 24,
  goalsAgainst: 25,
  goalDiff: -1,
  form: ['D', 'W', 'L', 'W', 'D'],
  badge: 'fairplay'
}, {
  id: 't5',
  rank: 5,
  name: 'Cran Giants',
  abbr: 'CRN',
  color: '#8E2B36',
  points: 24,
  played: 18,
  wins: 7,
  draws: 3,
  losses: 8,
  goalsFor: 21,
  goalsAgainst: 30,
  goalDiff: -9,
  form: ['L', 'W', 'L', 'D', 'W'],
  badge: null
}, {
  id: 't6',
  rank: 6,
  name: 'Meythet FC',
  abbr: 'MEY',
  color: '#B7FF1A',
  points: 19,
  played: 18,
  wins: 5,
  draws: 4,
  losses: 9,
  goalsFor: 18,
  goalsAgainst: 33,
  goalDiff: -15,
  form: ['L', 'D', 'L', 'W', 'L'],
  badge: null
}];
const SCORER_RANKINGS: PlayerRank[] = [{
  id: 'p1',
  rank: 1,
  name: 'Bersot',
  firstName: 'Killian',
  team: 'Annecy FC',
  teamColor: '#2E8F57',
  img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=120&h=120',
  nationality: '🇫🇷',
  goals: 17,
  matches: 18,
  rating: 8.4,
  badge: 'top',
  goalsPerMatch: 0.94
}, {
  id: 'p2',
  rank: 2,
  name: 'Perrin',
  firstName: 'Lucas',
  team: 'Poisy Stars',
  teamColor: '#F4C542',
  img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&h=120',
  nationality: '🇫🇷',
  goals: 13,
  matches: 16,
  rating: 7.2,
  badge: null,
  goalsPerMatch: 0.81
}, {
  id: 'p5',
  rank: 3,
  name: 'Touazi',
  firstName: 'Rayan',
  team: 'Cran Giants',
  teamColor: '#8E2B36',
  img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120',
  nationality: '🇲🇦',
  goals: 11,
  matches: 17,
  rating: 7.0,
  badge: null,
  goalsPerMatch: 0.65
}, {
  id: 'p6',
  rank: 4,
  name: 'Mebrouk',
  firstName: 'Yassin',
  team: 'Veyrier Utd',
  teamColor: '#7BA7D9',
  img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=120&h=120',
  nationality: '🇩🇿',
  goals: 9,
  matches: 18,
  rating: 7.8,
  badge: 'mvp',
  goalsPerMatch: 0.50
}, {
  id: 'p7',
  rank: 5,
  name: 'Garnier',
  firstName: 'Théo',
  team: 'Seynod City',
  teamColor: '#C9C1A2',
  img: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&h=120',
  nationality: '🇫🇷',
  goals: 7,
  matches: 17,
  rating: 6.9,
  badge: null,
  goalsPerMatch: 0.41
}];
const ASSISTER_RANKINGS: PlayerRank[] = [{
  id: 'a1',
  rank: 1,
  name: 'Mebrouk',
  firstName: 'Yassin',
  team: 'Veyrier Utd',
  teamColor: '#7BA7D9',
  img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=120&h=120',
  nationality: '🇩🇿',
  assists: 14,
  matches: 18,
  rating: 7.8,
  badge: 'top',
  assistsPerMatch: 0.78
}, {
  id: 'a2',
  rank: 2,
  name: 'Bersot',
  firstName: 'Killian',
  team: 'Annecy FC',
  teamColor: '#2E8F57',
  img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=120&h=120',
  nationality: '🇫🇷',
  assists: 8,
  matches: 18,
  rating: 8.4,
  badge: 'mvp',
  assistsPerMatch: 0.44
}, {
  id: 'a3',
  rank: 3,
  name: 'Garnier',
  firstName: 'Théo',
  team: 'Seynod City',
  teamColor: '#C9C1A2',
  img: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&h=120',
  nationality: '🇫🇷',
  assists: 6,
  matches: 17,
  rating: 6.9,
  badge: null,
  assistsPerMatch: 0.35
}, {
  id: 'a4',
  rank: 4,
  name: 'Perrin',
  firstName: 'Lucas',
  team: 'Poisy Stars',
  teamColor: '#F4C542',
  img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&h=120',
  nationality: '🇫🇷',
  assists: 5,
  matches: 16,
  rating: 7.2,
  badge: null,
  assistsPerMatch: 0.31
}, {
  id: 'a5',
  rank: 5,
  name: 'Touazi',
  firstName: 'Rayan',
  team: 'Cran Giants',
  teamColor: '#8E2B36',
  img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120',
  nationality: '🇲🇦',
  assists: 3,
  matches: 17,
  rating: 7.0,
  badge: null,
  assistsPerMatch: 0.18
}];
const KEEPER_RANKINGS: PlayerRank[] = [{
  id: 'k1',
  rank: 1,
  name: 'Dubois',
  firstName: 'Maxime',
  team: 'Annecy FC',
  teamColor: '#2E8F57',
  img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=120&h=120',
  nationality: '🇫🇷',
  cleanSheets: 9,
  saves: 58,
  saveRate: 82,
  matches: 18,
  rating: 8.1,
  badge: 'top'
}, {
  id: 'k2',
  rank: 2,
  name: 'Renard',
  firstName: 'Hugo',
  team: 'Veyrier Utd',
  teamColor: '#7BA7D9',
  img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&h=120',
  nationality: '🇫🇷',
  cleanSheets: 6,
  saves: 52,
  saveRate: 76,
  matches: 18,
  rating: 7.3,
  badge: null
}, {
  id: 'k3',
  rank: 3,
  name: 'Faye',
  firstName: 'Omar',
  team: 'Seynod City',
  teamColor: '#C9C1A2',
  img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120',
  nationality: '🇸🇳',
  cleanSheets: 5,
  saves: 63,
  saveRate: 72,
  matches: 17,
  rating: 7.0,
  badge: null
}, {
  id: 'k4',
  rank: 4,
  name: 'Costa',
  firstName: 'Diogo',
  team: 'Poisy Stars',
  teamColor: '#F4C542',
  img: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&h=120',
  nationality: '🇵🇹',
  cleanSheets: 4,
  saves: 48,
  saveRate: 68,
  matches: 16,
  rating: 6.7,
  badge: null
}, {
  id: 'k5',
  rank: 5,
  name: 'Millet',
  firstName: 'Adrien',
  team: 'Cran Giants',
  teamColor: '#8E2B36',
  img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=120&h=120',
  nationality: '🇫🇷',
  cleanSheets: 3,
  saves: 71,
  saveRate: 65,
  matches: 17,
  rating: 6.5,
  badge: null
}];
const RANKING_TABS: {
  id: RankingTab;
  label: string;
  icon: React.ReactNode;
}[] = [{
  id: 'teams',
  label: 'Équipes',
  icon: <Shield size={12} />
}, {
  id: 'scorers',
  label: 'Buteurs',
  icon: <Target size={12} />
}, {
  id: 'assisters',
  label: 'Passeurs',
  icon: <Activity size={12} />
}, {
  id: 'keepers',
  label: 'Gardiens',
  icon: <Users size={12} />
}];
const SEASON_OPTIONS: {
  id: SeasonId;
  label: string;
}[] = [{
  id: 's3',
  label: 'S3 · 2025'
}, {
  id: 's2',
  label: 'S2 · 2024'
}, {
  id: 's1',
  label: 'S1 · 2023'
}];

// ─── Helpers ──────────────────────────────────────────────────────────────────

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
const PODIUM_MEDAL: Record<number, {
  color: string;
  label: string;
}> = {
  1: {
    color: '#B7FF1A',
    label: '1er'
  },
  2: {
    color: '#C9C1A2',
    label: '2e'
  },
  3: {
    color: '#CD7F32',
    label: '3e'
  }
};

// ─── Sub-components ───────────────────────────────────────────────────────────

const FormDot = ({
  result
}: {
  result: 'W' | 'D' | 'L';
}) => {
  const bg = result === 'W' ? '#35D07F' : result === 'D' ? '#F4C542' : '#D94B5B';
  return <div className="w-[18px] h-[18px] rounded-full flex items-center justify-center flex-shrink-0" style={{
    background: `${bg}18`,
    border: `1.5px solid ${bg}`
  }}>
      <span className="text-[7px] font-black" style={{
      color: bg
    }}>{result}</span>
    </div>;
};
const BadgePill = ({
  type
}: {
  type: 'champion' | 'mvp' | 'fairplay' | 'top';
}) => {
  const map = {
    champion: {
      label: 'Champion',
      color: '#B7FF1A',
      bg: 'rgba(183,255,26,0.1)',
      border: 'rgba(183,255,26,0.22)',
      icon: <Crown size={7} />
    },
    mvp: {
      label: 'MVP',
      color: '#C9C1A2',
      bg: 'rgba(201,193,162,0.1)',
      border: 'rgba(201,193,162,0.22)',
      icon: <Star size={7} />
    },
    fairplay: {
      label: 'Fair-play',
      color: '#7BA7D9',
      bg: 'rgba(123,167,217,0.1)',
      border: 'rgba(123,167,217,0.22)',
      icon: <Award size={7} />
    },
    top: {
      label: 'Top',
      color: '#B7FF1A',
      bg: 'rgba(183,255,26,0.1)',
      border: 'rgba(183,255,26,0.22)',
      icon: <Crown size={7} />
    }
  };
  const m = map[type];
  return <div className="flex items-center gap-1 px-2 py-0.5 rounded-full flex-shrink-0" style={{
    background: m.bg,
    border: `1px solid ${m.border}`
  }}>
      <span style={{
      color: m.color
    }}>{m.icon}</span>
      <span className="text-[7px] font-black uppercase tracking-wide" style={{
      color: m.color
    }}>{m.label}</span>
    </div>;
};

// ─── Team Rankings Table ───────────────────────────────────────────────────────

const TeamsTable = () => <div className="flex flex-col gap-2.5">
    {/* Column header */}
    <div className="flex items-center px-3 pb-2" style={{
    borderBottom: '1px solid rgba(255,255,255,0.05)'
  }}>
      <div style={{
      width: 22
    }} />
      <div style={{
      width: 14
    }} />
      <div className="flex-1 ml-3" />
      {/* Stat columns */}
      <div className="flex items-center text-[8px] font-black uppercase tracking-widest" style={{
      color: '#8A938C'
    }}>
        <span className="w-[26px] text-center">MJ</span>
        <span className="w-[22px] text-center" style={{
        color: '#35D07F'
      }}>V</span>
        <span className="w-[22px] text-center" style={{
        color: '#F4C542'
      }}>N</span>
        <span className="w-[22px] text-center" style={{
        color: '#D94B5B'
      }}>D</span>
        <span className="w-[28px] text-center" style={{
        color: '#35D07F'
      }}>BP</span>
        <span className="w-[28px] text-center" style={{
        color: '#D94B5B'
      }}>BC</span>
        <span className="w-[34px] text-center">Pts</span>
      </div>
    </div>

    {TEAM_RANKINGS.map((team, i) => {
    const isLeader = i === 0;
    const isPodium = i < 3;
    return <motion.div key={team.id} initial={{
      opacity: 0,
      x: -12
    }} animate={{
      opacity: 1,
      x: 0
    }} transition={{
      delay: i * 0.05
    }} className="rounded-[20px] overflow-hidden" style={{
      background: isLeader ? 'linear-gradient(135deg, rgba(46,143,87,0.14) 0%, rgba(18,49,41,0.95) 100%)' : i % 2 === 0 ? '#123129' : 'rgba(18,49,41,0.7)',
      border: isLeader ? '1px solid rgba(183,255,26,0.15)' : '1px solid rgba(255,255,255,0.04)'
    }}>
          {isLeader && <div className="h-[2px]" style={{
        background: 'linear-gradient(90deg, transparent, rgba(183,255,26,0.5), transparent)'
      }} />}

          {/* Main row */}
          <div className="flex items-center px-3 py-3">
            {/* Rank */}
            <div className="w-[22px] flex items-center justify-center flex-shrink-0">
              {isLeader ? <Crown size={12} style={{
            color: '#B7FF1A'
          }} /> : <span className="text-[11px] font-black" style={{
            color: isPodium ? '#C9C1A2' : '#556A61'
          }}>{team.rank}</span>}
            </div>

            {/* Color dot */}
            <div className="w-[10px] h-[10px] rounded-full ml-1 mr-2.5 flex-shrink-0" style={{
          background: team.color
        }} />

            {/* Name + badge */}
            <div className="flex-1 min-w-0 flex items-center gap-2 mr-2">
              <span className="text-[12px] font-black truncate" style={{
            color: isLeader ? '#F2EEDC' : '#D7DBC8'
          }}>
                {team.name}
              </span>
              {team.badge && <BadgePill type={team.badge} />}
            </div>

            {/* Stats aligned to columns */}
            <div className="flex items-center text-[11px] font-bold flex-shrink-0 tabular-nums">
              <span className="w-[26px] text-center" style={{
            color: '#8A938C'
          }}>{team.played}</span>
              <span className="w-[22px] text-center" style={{
            color: '#35D07F'
          }}>{team.wins}</span>
              <span className="w-[22px] text-center" style={{
            color: '#F4C542'
          }}>{team.draws}</span>
              <span className="w-[22px] text-center" style={{
            color: '#D94B5B'
          }}>{team.losses}</span>
              <span className="w-[28px] text-center" style={{
            color: '#35D07F'
          }}>{team.goalsFor}</span>
              <span className="w-[28px] text-center" style={{
            color: '#D94B5B'
          }}>{team.goalsAgainst}</span>
              <div className="w-[34px] flex items-center justify-center">
                <span className="text-[12px] font-black px-1.5 py-0.5 rounded-[7px]" style={{
              color: isLeader ? '#0B221C' : '#F2EEDC',
              background: isLeader ? '#B7FF1A' : 'rgba(255,255,255,0.08)'
            }}>
                  {team.points}
                </span>
              </div>
            </div>
          </div>

          {/* Form row */}
          <div className="flex items-center gap-1.5 px-3 pb-2.5">
            <span className="text-[7px] font-black uppercase tracking-widest mr-1" style={{
          color: '#8A938C'
        }}>Forme</span>
            {team.form.map((r, fi) => <FormDot key={fi} result={r} />)}
            <div className="flex-1 flex justify-end">
              <span className="text-[8px] font-bold" style={{
            color: team.goalDiff > 0 ? '#35D07F' : team.goalDiff < 0 ? '#D94B5B' : '#8A938C'
          }}>
                {team.goalDiff > 0 ? '+' : ''}{team.goalDiff}
              </span>
            </div>
          </div>
        </motion.div>;
  })}
  </div>;

// ─── Player Star Card (top of each tab) ──────────────────────────────────────

const PlayerStarCard = ({
  player,
  statLabel,
  statValue,
  statSecondary,
  accentColor
}: {
  player: PlayerRank;
  statLabel: string;
  statValue: string;
  statSecondary: string;
  accentColor: string;
}) => <div className="rounded-[26px] p-5 relative overflow-hidden" style={{
  background: `linear-gradient(135deg, ${accentColor}14 0%, rgba(11,34,28,0.98) 100%)`,
  border: `1px solid ${accentColor}22`
}}>
    <div className="absolute -right-6 -top-6 w-40 h-40 rounded-full" style={{
    background: `radial-gradient(ellipse, ${accentColor}12 0%, transparent 70%)`,
    filter: 'blur(24px)'
  }} />
    <div className="relative flex items-center gap-4">
      {/* Avatar */}
      <div className="flex-shrink-0 relative">
        <div className="w-[72px] h-[72px] rounded-[20px] overflow-hidden" style={{
        border: `2px solid ${accentColor}40`
      }}>
          <img src={player.img} alt={`Portrait de ${player.firstName} ${player.name}`} className="w-full h-full object-cover" />
        </div>
        <div className="absolute -top-1.5 -right-1.5 w-6 h-6 rounded-full flex items-center justify-center" style={{
        background: accentColor,
        border: '2px solid #0B221C'
      }}>
          <Crown size={10} style={{
          color: '#0B221C'
        }} />
        </div>
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5 mb-0.5">
          <span className="text-[9px] font-black uppercase tracking-[0.22em]" style={{
          color: '#8A938C'
        }}>Meilleur</span>
          <span className="text-[9px] font-black uppercase tracking-[0.22em]" style={{
          color: accentColor
        }}>{statLabel}</span>
        </div>
        <h3 className="text-[20px] font-black tracking-tight leading-none mb-1" style={{
        color: '#F2EEDC'
      }}>
          {player.firstName} {player.name}
        </h3>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full flex-shrink-0" style={{
          background: player.teamColor
        }} />
          <span className="text-[9px] font-semibold" style={{
          color: '#8A938C'
        }}>{player.team}</span>
          <span className="text-[9px]">{player.nationality}</span>
        </div>
      </div>

      {/* Stat block */}
      <div className="flex-shrink-0 flex flex-col items-end gap-1">
        <div className="flex items-baseline gap-1">
          <span className="text-[42px] font-black leading-none tracking-tighter" style={{
          color: accentColor
        }}>{statValue}</span>
        </div>
        <span className="text-[8px] font-black uppercase tracking-wider" style={{
        color: '#8A938C'
      }}>{statLabel}</span>
        <span className="text-[9px] font-bold" style={{
        color: '#8A938C'
      }}>{statSecondary}</span>
      </div>
    </div>
  </div>;

// ─── Player Rankings List ─────────────────────────────────────────────────────

const PlayerList = ({
  players,
  statKey,
  statLabel,
  statIcon,
  secondaryKey,
  secondaryLabel
}: {
  players: PlayerRank[];
  statKey: 'goals' | 'assists' | 'cleanSheets';
  statLabel: string;
  statIcon: React.ReactNode;
  secondaryKey?: 'goalsPerMatch' | 'assistsPerMatch';
  secondaryLabel?: string;
}) => <div className="flex flex-col gap-2.5">
    {/* Column header */}
    <div className="flex items-center px-2 pb-2" style={{
    borderBottom: '1px solid rgba(255,255,255,0.05)'
  }}>
      <div style={{
      width: 24
    }} />
      <div style={{
      width: 44
    }} />
      <div className="flex-1 ml-3" />
      <div className="flex items-center gap-3 text-[8px] font-black uppercase tracking-widest" style={{
      color: '#8A938C'
    }}>
        <span className="w-10 text-center">Note</span>
        <span className="w-12 text-center" style={{
        color: '#B7FF1A'
      }}>{statLabel}</span>
      </div>
    </div>

    {players.map((player, i) => {
    const isFirst = i === 0;
    const medal = PODIUM_MEDAL[player.rank];
    const statVal = player[statKey] ?? 0;
    const secondaryVal = secondaryKey ? player[secondaryKey] : undefined;
    return <motion.article key={player.id} initial={{
      opacity: 0,
      y: 10
    }} animate={{
      opacity: 1,
      y: 0
    }} transition={{
      delay: i * 0.06
    }} className="rounded-[20px] overflow-hidden" style={{
      background: isFirst ? 'linear-gradient(135deg, rgba(183,255,26,0.06) 0%, rgba(18,49,41,0.98) 100%)' : i % 2 === 0 ? '#123129' : 'rgba(18,49,41,0.7)',
      border: isFirst ? '1px solid rgba(183,255,26,0.13)' : '1px solid rgba(255,255,255,0.04)'
    }}>
          {isFirst && <div className="h-[2px]" style={{
        background: 'linear-gradient(90deg, transparent, rgba(183,255,26,0.5), transparent)'
      }} />}
          <div className="flex items-center gap-3 px-3 py-3">
            {/* Rank */}
            <div className="w-6 text-center flex-shrink-0">
              {isFirst ? <Crown size={12} style={{
            color: '#B7FF1A'
          }} /> : <span className="text-[11px] font-black" style={{
            color: medal ? medal.color : '#556A61'
          }}>{player.rank}</span>}
            </div>

            {/* Avatar */}
            <div className="w-10 h-10 rounded-[12px] overflow-hidden flex-shrink-0" style={{
          border: isFirst ? '2px solid rgba(183,255,26,0.35)' : '1px solid rgba(255,255,255,0.08)'
        }}>
              <img src={player.img} alt={`Portrait de ${player.firstName} ${player.name}`} className="w-full h-full object-cover" />
            </div>

            {/* Name + meta */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-[12px] font-black" style={{
              color: '#F2EEDC'
            }}>{player.firstName} {player.name}</span>
                <span className="text-[10px]">{player.nationality}</span>
                {player.badge && <BadgePill type={player.badge} />}
              </div>
              <div className="flex items-center gap-1.5 mt-0.5">
                <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{
              background: player.teamColor
            }} />
                <span className="text-[9px] font-semibold" style={{
              color: '#8A938C'
            }}>{player.team}</span>
                {secondaryVal !== undefined && <span className="text-[9px] font-bold" style={{
              color: '#8A938C'
            }}>
                    · {secondaryVal} / match
                  </span>}
              </div>
            </div>

            {/* Rating */}
            <div className="flex-shrink-0 w-9 h-7 rounded-[8px] flex items-center justify-center" style={{
          background: getRatingBg(player.rating),
          border: `1px solid ${getRatingColor(player.rating)}28`
        }}>
              <span className="text-[11px] font-black" style={{
            color: getRatingColor(player.rating)
          }}>
                {player.rating.toFixed(1)}
              </span>
            </div>

            {/* Stat value */}
            <div className="flex-shrink-0 w-12 flex flex-col items-center gap-0.5">
              <div className="flex items-center gap-0.5">
                <span style={{
              color: isFirst ? '#B7FF1A' : '#8A938C'
            }}>{statIcon}</span>
                <span className="text-[22px] font-black leading-none tracking-tighter" style={{
              color: isFirst ? '#B7FF1A' : '#F2EEDC'
            }}>
                  {statVal}
                </span>
              </div>
              <span className="text-[7px] font-black uppercase tracking-widest" style={{
            color: '#8A938C'
          }}>{statLabel}</span>
            </div>
          </div>
        </motion.article>;
  })}
  </div>;

// ─── Keeper Rankings List ─────────────────────────────────────────────────────

const KeeperList = () => <div className="flex flex-col gap-2.5">
    {/* Column header */}
    <div className="flex items-center px-2 pb-2" style={{
    borderBottom: '1px solid rgba(255,255,255,0.05)'
  }}>
      <div style={{
      width: 24
    }} />
      <div style={{
      width: 44
    }} />
      <div className="flex-1 ml-3" />
      <div className="flex items-center gap-3 text-[8px] font-black uppercase tracking-widest" style={{
      color: '#8A938C'
    }}>
        <span className="w-10 text-center">Note</span>
        <span className="w-10 text-center" style={{
        color: '#7BA7D9'
      }}>CS</span>
      </div>
    </div>

    {KEEPER_RANKINGS.map((player, i) => {
    const isFirst = i === 0;
    const medal = PODIUM_MEDAL[player.rank];
    return <motion.article key={player.id} initial={{
      opacity: 0,
      y: 10
    }} animate={{
      opacity: 1,
      y: 0
    }} transition={{
      delay: i * 0.06
    }} className="rounded-[20px] overflow-hidden" style={{
      background: isFirst ? 'linear-gradient(135deg, rgba(123,167,217,0.08) 0%, rgba(18,49,41,0.98) 100%)' : i % 2 === 0 ? '#123129' : 'rgba(18,49,41,0.7)',
      border: isFirst ? '1px solid rgba(123,167,217,0.18)' : '1px solid rgba(255,255,255,0.04)'
    }}>
          {isFirst && <div className="h-[2px]" style={{
        background: 'linear-gradient(90deg, transparent, rgba(123,167,217,0.5), transparent)'
      }} />}
          <div className="flex items-center gap-3 px-3 py-3">
            {/* Rank */}
            <div className="w-6 text-center flex-shrink-0">
              {isFirst ? <Crown size={12} style={{
            color: '#7BA7D9'
          }} /> : <span className="text-[11px] font-black" style={{
            color: medal ? medal.color : '#556A61'
          }}>{player.rank}</span>}
            </div>

            {/* Avatar */}
            <div className="w-10 h-10 rounded-[12px] overflow-hidden flex-shrink-0" style={{
          border: isFirst ? '2px solid rgba(123,167,217,0.35)' : '1px solid rgba(255,255,255,0.08)'
        }}>
              <img src={player.img} alt={`Portrait de ${player.firstName} ${player.name}`} className="w-full h-full object-cover" />
            </div>

            {/* Name + meta */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-[12px] font-black" style={{
              color: '#F2EEDC'
            }}>{player.firstName} {player.name}</span>
                <span className="text-[10px]">{player.nationality}</span>
                {player.badge && <BadgePill type={player.badge} />}
              </div>
              <div className="flex items-center gap-1.5 mt-0.5">
                <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{
              background: player.teamColor
            }} />
                <span className="text-[9px] font-semibold" style={{
              color: '#8A938C'
            }}>{player.team}</span>
                <span className="text-[9px] font-bold" style={{
              color: '#8A938C'
            }}>· {player.matches} j.</span>
              </div>
            </div>

            {/* Rating */}
            <div className="flex-shrink-0 w-9 h-7 rounded-[8px] flex items-center justify-center" style={{
          background: getRatingBg(player.rating),
          border: `1px solid ${getRatingColor(player.rating)}28`
        }}>
              <span className="text-[11px] font-black" style={{
            color: getRatingColor(player.rating)
          }}>
                {player.rating.toFixed(1)}
              </span>
            </div>

            {/* Clean sheets */}
            <div className="flex-shrink-0 w-10 flex flex-col items-center gap-0.5">
              <span className="text-[22px] font-black leading-none tracking-tighter" style={{
            color: isFirst ? '#7BA7D9' : '#F2EEDC'
          }}>
                {player.cleanSheets}
              </span>
              <span className="text-[7px] font-black uppercase tracking-widest" style={{
            color: '#8A938C'
          }}>CS</span>
            </div>
          </div>
        </motion.article>;
  })}

    {/* CS legend */}
    <div className="flex items-center gap-1.5 px-2 pt-1">
      <Info size={9} style={{
      color: '#8A938C'
    }} />
      <span className="text-[8px] font-bold" style={{
      color: '#556A61'
    }}>CS = Clean Sheets (matchs sans buts encaissés)</span>
    </div>
  </div>;

// ─── Top Performers Banner ────────────────────────────────────────────────────

const TopPerformersBanner = () => {
  const topScorer = SCORER_RANKINGS[0];
  const topAssist = ASSISTER_RANKINGS[0];
  const topKeeper = KEEPER_RANKINGS[0];
  const performers = [{
    player: topScorer,
    label: 'Top Buteur',
    stat: `${topScorer.goals} buts`,
    sub: `${topScorer.goalsPerMatch} / match`,
    icon: <Target size={10} />,
    color: '#B7FF1A'
  }, {
    player: topAssist,
    label: 'Top Passeur',
    stat: `${topAssist.assists} p.déc.`,
    sub: `${topAssist.assistsPerMatch} / match`,
    icon: <Activity size={10} />,
    color: '#35D07F'
  }, {
    player: topKeeper,
    label: 'Top Gardien',
    stat: `${topKeeper.cleanSheets} CS`,
    sub: `${topKeeper.saveRate}% arrêts`,
    icon: <Shield size={10} />,
    color: '#7BA7D9'
  }];
  return <div className="rounded-[26px] p-4 relative overflow-hidden" style={{
    background: 'linear-gradient(135deg, #183C31 0%, #0B221C 100%)',
    border: '1px solid rgba(183,255,26,0.08)'
  }}>
      <div className="absolute -top-8 right-0 w-40 h-40 rounded-full" style={{
      background: 'radial-gradient(ellipse, rgba(183,255,26,0.07) 0%, transparent 70%)',
      filter: 'blur(20px)'
    }} />
      <div className="flex items-center gap-2 mb-4">
        <Zap size={12} style={{
        color: '#B7FF1A'
      }} />
        <h3 className="text-[9px] font-black uppercase tracking-[0.22em]" style={{
        color: '#8A938C'
      }}>
          Top Performers · Summer Cup S3
        </h3>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {performers.map(p => <div key={p.label} className="flex flex-col items-center gap-2 p-3 rounded-[16px]" style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.06)'
      }}>
            <div className="w-10 h-10 rounded-[12px] overflow-hidden" style={{
          border: `1.5px solid ${p.color}40`
        }}>
              <img src={p.player.img} alt={`Photo de ${p.player.firstName} ${p.player.name}`} className="w-full h-full object-cover" />
            </div>
            <div className="text-center">
              <p className="text-[7px] font-black uppercase tracking-wide leading-none" style={{
            color: '#8A938C'
          }}>{p.label}</p>
              <p className="text-[9px] font-black mt-0.5 truncate" style={{
            color: '#F2EEDC'
          }}>{p.player.firstName}</p>
            </div>
            <div className="flex flex-col items-center gap-0.5">
              <div className="flex items-center gap-1 px-2 py-0.5 rounded-full" style={{
            background: `${p.color}14`,
            border: `1px solid ${p.color}28`
          }}>
                <span style={{
              color: p.color
            }}>{p.icon}</span>
                <span className="text-[9px] font-black" style={{
              color: p.color
            }}>{p.stat}</span>
              </div>
              <span className="text-[8px] font-bold" style={{
            color: '#8A938C'
          }}>{p.sub}</span>
            </div>
          </div>)}
      </div>
    </div>;
};

// ─── RankingsScreen ───────────────────────────────────────────────────────────

export const RankingsScreen = () => {
  const [activeTab, setActiveTab] = useState<RankingTab>('teams');
  const [season, setSeason] = useState<SeasonId>('s3');
  return <div className="flex flex-col gap-5 pb-4">

      {/* Season selector */}
      <div className="px-5 flex gap-2 overflow-x-auto" style={{
      scrollbarWidth: 'none'
    }}>
        {SEASON_OPTIONS.map(s => <button key={s.id} onClick={() => setSeason(s.id)} className="px-3.5 py-1.5 rounded-[10px] text-[10px] font-black uppercase tracking-wide whitespace-nowrap flex-shrink-0 transition-all" style={season === s.id ? {
        background: 'rgba(46,143,87,0.2)',
        border: '1px solid rgba(46,143,87,0.35)',
        color: '#B7FF1A'
      } : {
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.07)',
        color: '#8A938C'
      }}>
            {s.label}
          </button>)}
        <span className="px-3.5 py-1.5 rounded-[10px] text-[10px] font-black uppercase tracking-wide whitespace-nowrap flex-shrink-0 self-center" style={{
        color: '#556A61'
      }}>
          Summer Cup · Annecy & alentours
        </span>
      </div>

      {/* Top performers banner */}
      <div className="px-5">
        <TopPerformersBanner />
      </div>

      {/* Tab bar */}
      <div className="sticky top-0 z-20 px-5 py-2.5" style={{
      background: 'rgba(11,34,28,0.96)',
      backdropFilter: 'blur(18px)',
      borderBottom: '1px solid rgba(255,255,255,0.05)'
    }}>
        <div className="flex gap-1.5">
          {RANKING_TABS.map(tab => <button key={tab.id} onClick={() => setActiveTab(tab.id)} className="flex items-center gap-1 px-2 py-2.5 rounded-[12px] text-[9px] font-black uppercase tracking-wide flex-1 justify-center transition-all" style={activeTab === tab.id ? {
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
      </div>

      {/* Tab content */}
      <AnimatePresence mode="wait">
        <motion.div key={activeTab} initial={{
        opacity: 0,
        y: 10
      }} animate={{
        opacity: 1,
        y: 0
      }} exit={{
        opacity: 0,
        y: -6
      }} transition={{
        duration: 0.18,
        ease: 'easeOut'
      }} className="px-5 flex flex-col gap-5">
          {/* ── ÉQUIPES ── */}
          {activeTab === 'teams' && <div className="flex flex-col gap-4">
              {/* Leader hero card */}
              <div className="rounded-[26px] p-5 relative overflow-hidden" style={{
            background: 'linear-gradient(135deg, rgba(46,143,87,0.16) 0%, rgba(11,34,28,0.98) 100%)',
            border: '1px solid rgba(183,255,26,0.15)'
          }}>
                <div className="absolute -right-8 -top-8 w-44 h-44 rounded-full" style={{
              background: 'radial-gradient(ellipse, rgba(183,255,26,0.08) 0%, transparent 70%)',
              filter: 'blur(30px)'
            }} />
                <div className="relative flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-[18px] flex items-center justify-center flex-shrink-0" style={{
                  background: `${TEAM_RANKINGS[0].color}18`,
                  border: `1.5px solid ${TEAM_RANKINGS[0].color}35`
                }}>
                      <Shield size={22} style={{
                    color: TEAM_RANKINGS[0].color
                  }} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-0.5">
                        <Crown size={10} style={{
                      color: '#B7FF1A'
                    }} />
                        <span className="text-[8px] font-black uppercase tracking-[0.22em]" style={{
                      color: '#8A938C'
                    }}>Leader · Summer Cup S3</span>
                      </div>
                      <h3 className="text-[20px] font-black tracking-tight leading-none" style={{
                    color: '#F2EEDC'
                  }}>
                        {TEAM_RANKINGS[0].name}
                      </h3>
                      <div className="flex items-center gap-2 mt-1.5">
                        {[{
                      v: TEAM_RANKINGS[0].wins,
                      c: '#35D07F',
                      l: 'V'
                    }, {
                      v: TEAM_RANKINGS[0].draws,
                      c: '#F4C542',
                      l: 'N'
                    }, {
                      v: TEAM_RANKINGS[0].losses,
                      c: '#D94B5B',
                      l: 'D'
                    }].map(item => <div key={item.l} className="flex items-center gap-1">
                            <span className="text-[8px] font-black uppercase" style={{
                        color: item.c
                      }}>{item.l}</span>
                            <span className="text-[12px] font-black" style={{
                        color: '#F2EEDC'
                      }}>{item.v}</span>
                          </div>)}
                        <span className="text-[8px] font-bold" style={{
                      color: '#8A938C'
                    }}>· {TEAM_RANKINGS[0].goalsFor} buts marqués · {TEAM_RANKINGS[0].goalsAgainst} concédés</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <div className="flex items-baseline gap-1">
                      <span className="text-[44px] font-black leading-none tracking-tighter" style={{
                    color: '#B7FF1A'
                  }}>
                        {TEAM_RANKINGS[0].points}
                      </span>
                      <span className="text-[10px] font-black uppercase tracking-widest mb-1" style={{
                    color: '#8A938C'
                  }}>pts</span>
                    </div>
                    <div className="flex gap-1">
                      {TEAM_RANKINGS[0].form.map((r, fi) => <FormDot key={fi} result={r} />)}
                    </div>
                  </div>
                </div>
              </div>

              <TeamsTable />
            </div>}

          {/* ── BUTEURS ── */}
          {activeTab === 'scorers' && <div className="flex flex-col gap-5">
              <PlayerStarCard player={SCORER_RANKINGS[0]} statLabel="buts" statValue={String(SCORER_RANKINGS[0].goals)} statSecondary={`${SCORER_RANKINGS[0].goalsPerMatch} but/match · ${SCORER_RANKINGS[0].matches} j.`} accentColor="#B7FF1A" />
              <PlayerList players={SCORER_RANKINGS} statKey="goals" statLabel="buts" statIcon={<Target size={11} />} secondaryKey="goalsPerMatch" secondaryLabel="/ match" />
            </div>}

          {/* ── PASSEURS ── */}
          {activeTab === 'assisters' && <div className="flex flex-col gap-5">
              <PlayerStarCard player={ASSISTER_RANKINGS[0]} statLabel="p.déc." statValue={String(ASSISTER_RANKINGS[0].assists)} statSecondary={`${ASSISTER_RANKINGS[0].assistsPerMatch} p.déc./match · ${ASSISTER_RANKINGS[0].matches} j.`} accentColor="#35D07F" />
              <PlayerList players={ASSISTER_RANKINGS} statKey="assists" statLabel="p.déc." statIcon={<Activity size={11} />} secondaryKey="assistsPerMatch" secondaryLabel="/ match" />
            </div>}

          {/* ── GARDIENS ── */}
          {activeTab === 'keepers' && <div className="flex flex-col gap-5">
              <PlayerStarCard player={KEEPER_RANKINGS[0]} statLabel="Clean Sheets" statValue={String(KEEPER_RANKINGS[0].cleanSheets)} statSecondary={`${KEEPER_RANKINGS[0].saveRate}% arrêts · ${KEEPER_RANKINGS[0].matches} j.`} accentColor="#7BA7D9" />
              <KeeperList />
            </div>}

          {/* Footer note */}
          <div className="rounded-[16px] px-4 py-3 flex items-center gap-3" style={{
          background: 'rgba(255,255,255,0.02)',
          border: '1px solid rgba(255,255,255,0.05)'
        }}>
            <TrendingUp size={12} style={{
            color: '#8A938C'
          }} />
            <p className="text-[9px] font-bold flex-1" style={{
            color: 'rgba(215,219,200,0.45)'
          }}>
              Classements mis à jour après chaque journée · Summer Cup – Saison 3 en cours
            </p>
          </div>

        </motion.div>
      </AnimatePresence>
    </div>;
};