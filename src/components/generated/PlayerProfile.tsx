import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Target, Activity, Shield, Trophy, Star, MapPin, Award, Calendar, TrendingUp, Share2, Crown, AlertTriangle, Zap, BarChart3, Users } from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────

type ProfileTab = 'stats' | 'trophes' | 'parcours';
type SeasonFilter = 'all' | 's1' | 's2' | 's3';
interface SeasonStats {
  season: string;
  seasonId: SeasonFilter;
  edition: string;
  editionIcon: string;
  goals: number;
  assists: number;
  yellowCards: number;
  redCards: number;
  matchesPlayed: number;
  mvp: boolean;
  rating: number;
  teamName: string;
}
interface Trophy {
  id: string;
  title: string;
  edition: string;
  year: string;
  type: 'champion' | 'mvp' | 'topscorer' | 'fairplay';
  color: string;
}
interface CareerStep {
  id: string;
  club: string;
  period: string;
  level: string;
  highlight: string;
  color: string;
}
interface PlayerProfileData {
  id: string;
  firstName: string;
  lastName: string;
  age: number;
  nationality: string;
  nationalityFlag: string;
  currentTeam: string;
  currentTeamColor: string;
  position: string;
  positionShort: string;
  number: number;
  neighborhood: string;
  img: string;
  bestLevel: string;
  bio: string;
  clubs: string[];
  seasonStats: SeasonStats[];
  trophies: Trophy[];
  career: CareerStep[];
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const SEASON_STATS_DATA: SeasonStats[] = [{
  season: 'Saison 3',
  seasonId: 's3',
  edition: 'Summer Cup',
  editionIcon: '☀️',
  goals: 17,
  assists: 8,
  yellowCards: 2,
  redCards: 0,
  matchesPlayed: 18,
  mvp: true,
  rating: 8.4,
  teamName: 'Annecy FC'
}, {
  season: 'Saison 2',
  seasonId: 's2',
  edition: 'Winter Cup',
  editionIcon: '❄️',
  goals: 12,
  assists: 5,
  yellowCards: 3,
  redCards: 1,
  matchesPlayed: 15,
  mvp: false,
  rating: 7.6,
  teamName: 'Annecy FC'
}, {
  season: 'Saison 1',
  seasonId: 's1',
  edition: 'Spring Open',
  editionIcon: '🌿',
  goals: 9,
  assists: 4,
  yellowCards: 1,
  redCards: 0,
  matchesPlayed: 12,
  mvp: false,
  rating: 7.1,
  teamName: 'Seynod City'
}];
const TROPHIES_DATA: Trophy[] = [{
  id: 't1',
  title: 'Champion',
  edition: 'Summer Cup',
  year: '2025',
  type: 'champion',
  color: '#B7FF1A'
}, {
  id: 't2',
  title: 'MVP du Tournoi',
  edition: 'Summer Cup S3',
  year: '2025',
  type: 'mvp',
  color: '#C9C1A2'
}, {
  id: 't3',
  title: 'Meilleur Buteur',
  edition: 'Summer Cup S3',
  year: '2025',
  type: 'topscorer',
  color: '#35D07F'
}, {
  id: 't4',
  title: 'Champion',
  edition: 'Winter Cup',
  year: '2024',
  type: 'champion',
  color: '#7BA7D9'
}];
const CAREER_DATA: CareerStep[] = [{
  id: 'c1',
  club: 'Annecy FC',
  period: '2023 – présent',
  level: 'Élite · Tcheksplay',
  highlight: 'Capitaine & meilleur buteur S3',
  color: '#2E8F57'
}, {
  id: 'c2',
  club: 'Seynod City',
  period: '2022 – 2023',
  level: 'Élite · Tcheksplay',
  highlight: "Fondateur de l'équipe",
  color: '#C9C1A2'
}, {
  id: 'c3',
  club: 'AS Marquisats U18',
  period: '2018 – 2022',
  level: 'Formation · District',
  highlight: 'Révélation catégorie U18',
  color: '#7BA7D9'
}];
const PLAYER_DATA: PlayerProfileData = {
  id: 'p1',
  firstName: 'Killian',
  lastName: 'Bersot',
  age: 25,
  nationality: 'Français',
  nationalityFlag: '🇫🇷',
  currentTeam: 'Annecy FC',
  currentTeamColor: '#2E8F57',
  position: 'Attaquant',
  positionShort: 'ATT',
  number: 9,
  neighborhood: 'Marquisats · Annecy',
  img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80',
  bestLevel: 'Élite Tcheksplay · S3 Champion',
  bio: 'Produit pur du playground des Marquisats. Killian incarne l\'âme du Tcheksplay — technique, impact, mentalité. Meilleur buteur trois saisons consécutives.',
  clubs: ['Annecy FC', 'Seynod City', 'AS Marquisats U18'],
  seasonStats: SEASON_STATS_DATA,
  trophies: TROPHIES_DATA,
  career: CAREER_DATA
};
const PROFILE_TABS: {
  id: ProfileTab;
  label: string;
  icon: React.ReactNode;
}[] = [{
  id: 'stats',
  label: 'Stats',
  icon: <BarChart3 size={12} />
}, {
  id: 'trophes',
  label: 'Trophées',
  icon: <Trophy size={12} />
}, {
  id: 'parcours',
  label: 'Parcours',
  icon: <TrendingUp size={12} />
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
const TROPHY_META: Record<Trophy['type'], {
  icon: React.ReactNode;
  label: string;
}> = {
  champion: {
    icon: <Crown size={14} />,
    label: 'Champion'
  },
  mvp: {
    icon: <Star size={14} />,
    label: 'MVP'
  },
  topscorer: {
    icon: <Target size={14} />,
    label: 'Buteur'
  },
  fairplay: {
    icon: <Award size={14} />,
    label: 'Fair-play'
  }
};
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
}) => <div className="w-full h-[4px] rounded-full overflow-hidden" style={{
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

// ─── PlayerProfile ────────────────────────────────────────────────────────────

export const PlayerProfile = ({
  onBack
}: {
  onBack?: () => void;
}) => {
  const [activeTab, setActiveTab] = useState<ProfileTab>('stats');
  const [seasonFilter, setSeasonFilter] = useState<SeasonFilter>('all');
  const player = PLAYER_DATA;
  const filteredStats = seasonFilter === 'all' ? player.seasonStats : player.seasonStats.filter(s => s.seasonId === seasonFilter);
  const totalGoals = filteredStats.reduce((s, st) => s + st.goals, 0);
  const totalAssists = filteredStats.reduce((s, st) => s + st.assists, 0);
  const totalMatches = filteredStats.reduce((s, st) => s + st.matchesPlayed, 0);
  const totalYellow = filteredStats.reduce((s, st) => s + st.yellowCards, 0);
  const totalRed = filteredStats.reduce((s, st) => s + st.redCards, 0);
  const avgRating = filteredStats.length > 0 ? filteredStats.reduce((s, st) => s + st.rating, 0) / filteredStats.length : 0;
  const mvpCount = filteredStats.filter(s => s.mvp).length;
  return <div className="min-h-screen w-full overflow-x-hidden pb-32" style={{
    background: '#0B221C',
    color: '#F2EEDC'
  }}>
      {/* ── HERO ── */}
      <div className="relative overflow-hidden" style={{
      minHeight: 340
    }}>
        {/* Background photo */}
        <div className="absolute inset-0">
          <img src={player.img} alt={`Photo de profil de ${player.firstName} ${player.lastName}`} className="w-full h-full object-cover object-top" style={{
          filter: 'brightness(0.28) saturate(0.6)'
        }} />
          <div className="absolute inset-0" style={{
          background: 'linear-gradient(180deg, rgba(11,34,28,0.25) 0%, rgba(11,34,28,0.6) 50%, rgba(11,34,28,1) 100%)'
        }} />
          <div className="absolute inset-0" style={{
          background: 'linear-gradient(90deg, rgba(46,143,87,0.15) 0%, transparent 60%)'
        }} />
        </div>

        {/* Ambient glow */}
        <div className="absolute top-0 right-0 w-56 h-56 rounded-full" style={{
        background: 'radial-gradient(ellipse, rgba(183,255,26,0.08) 0%, transparent 70%)',
        filter: 'blur(40px)'
      }} />

        {/* Back button */}
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
        }} aria-label="Partager le profil">
            <Share2 size={14} />
            <span className="text-[10px] font-black uppercase tracking-wider">Partager</span>
          </button>
        </div>

        {/* Player info */}
        <div className="relative z-10 px-5 pb-8 flex gap-5 items-end">
          {/* Avatar */}
          <div className="relative flex-shrink-0">
            <div className="w-[88px] h-[88px] rounded-[26px] overflow-hidden" style={{
            border: '2.5px solid rgba(183,255,26,0.4)',
            boxShadow: '0 0 28px rgba(183,255,26,0.12)'
          }}>
              <img src={player.img} alt={`Portrait de ${player.firstName} ${player.lastName}`} className="w-full h-full object-cover" />
            </div>
            {/* Number badge */}
            <div className="absolute -bottom-2 -right-2 w-9 h-9 rounded-[12px] flex items-center justify-center" style={{
            background: 'linear-gradient(145deg, #2E8F57, #123129)',
            border: '2px solid #0B221C',
            boxShadow: '0 4px 12px rgba(46,143,87,0.4)'
          }}>
              <span className="text-[14px] font-black" style={{
              color: '#B7FF1A'
            }}>
                {player.number}
              </span>
            </div>
          </div>

          {/* Identity */}
          <div className="flex-1 min-w-0 pb-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 rounded-md text-[8px] font-black uppercase tracking-wider" style={{
              background: `${player.currentTeamColor}20`,
              border: `1px solid ${player.currentTeamColor}35`,
              color: player.currentTeamColor
            }}>
                {player.positionShort}
              </span>
              <span className="px-2 py-0.5 rounded-md text-[8px] font-black uppercase tracking-wider" style={{
              background: 'rgba(183,255,26,0.08)',
              border: '1px solid rgba(183,255,26,0.15)',
              color: '#B7FF1A'
            }}>
                {player.nationalityFlag}
              </span>
              {mvpCount > 0 && <div className="w-6 h-6 rounded-[7px] flex items-center justify-center" style={{
              background: 'rgba(201,193,162,0.15)',
              border: '1px solid rgba(201,193,162,0.25)'
            }}>
                  <Star size={10} fill="#C9C1A2" style={{
                color: '#C9C1A2'
              }} />
                </div>}
            </div>
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] mb-0.5" style={{
            color: 'rgba(215,219,200,0.45)'
          }}>
              {player.firstName}
            </p>
            <h1 className="text-[30px] font-black tracking-[-0.04em] leading-none uppercase" style={{
            color: '#F2EEDC'
          }}>
              {player.lastName}
            </h1>
            <div className="flex items-center gap-1.5 mt-2">
              <MapPin size={9} style={{
              color: '#8A938C'
            }} />
              <span className="text-[9px] font-bold tracking-wide" style={{
              color: '#8A938C'
            }}>
                {player.neighborhood}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ── TEAM + LEVEL BANNER ── */}
      <div className="px-5 -mt-1 mb-6">
        <div className="rounded-[18px] px-4 py-3.5 flex items-center justify-between" style={{
        background: 'linear-gradient(135deg, rgba(46,143,87,0.1) 0%, rgba(18,49,41,0.9) 100%)',
        border: '1px solid rgba(46,143,87,0.18)'
      }}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-[13px] flex items-center justify-center flex-shrink-0" style={{
            background: `${player.currentTeamColor}1A`,
            border: `1px solid ${player.currentTeamColor}30`
          }}>
              <Shield size={17} style={{
              color: player.currentTeamColor
            }} />
            </div>
            <div>
              <p className="text-[9px] font-black uppercase tracking-[0.18em]" style={{
              color: '#8A938C'
            }}>
                Équipe actuelle
              </p>
              <p className="text-[14px] font-black" style={{
              color: '#F2EEDC'
            }}>
                {player.currentTeam}
              </p>
            </div>
          </div>
          <div className="flex flex-col items-end gap-0.5">
            <p className="text-[8px] font-black uppercase tracking-[0.18em]" style={{
            color: '#8A938C'
          }}>
              Meilleur niveau
            </p>
            <p className="text-[10px] font-black" style={{
            color: '#B7FF1A'
          }}>
              {player.bestLevel}
            </p>
          </div>
        </div>
      </div>

      {/* ── BIO ── */}
      <div className="px-5 mb-6">
        <p className="text-[12px] leading-relaxed" style={{
        color: 'rgba(215,219,200,0.65)'
      }}>
          {player.bio}
        </p>
      </div>

      {/* ── QUICK SUMMARY CHIPS ── */}
      <div className="px-5 mb-6 flex gap-2 overflow-x-auto" style={{
      scrollbarWidth: 'none'
    }}>
        <div className="flex items-center gap-1.5 px-3.5 py-2 rounded-full flex-shrink-0" style={{
        background: 'rgba(183,255,26,0.08)',
        border: '1px solid rgba(183,255,26,0.16)'
      }}>
          <Target size={11} style={{
          color: '#B7FF1A'
        }} />
          <span className="text-[11px] font-black" style={{
          color: '#B7FF1A'
        }}>
            {totalGoals} buts
          </span>
        </div>
        <div className="flex items-center gap-1.5 px-3.5 py-2 rounded-full flex-shrink-0" style={{
        background: 'rgba(53,208,127,0.08)',
        border: '1px solid rgba(53,208,127,0.16)'
      }}>
          <Activity size={11} style={{
          color: '#35D07F'
        }} />
          <span className="text-[11px] font-black" style={{
          color: '#35D07F'
        }}>
            {totalAssists} passes
          </span>
        </div>
        <div className="flex items-center gap-1.5 px-3.5 py-2 rounded-full flex-shrink-0" style={{
        background: 'rgba(201,193,162,0.08)',
        border: '1px solid rgba(201,193,162,0.16)'
      }}>
          <Star size={11} style={{
          color: '#C9C1A2'
        }} />
          <span className="text-[11px] font-black" style={{
          color: '#C9C1A2'
        }}>
            {mvpCount}× MVP
          </span>
        </div>
        <div className="flex items-center gap-1.5 px-3.5 py-2 rounded-full flex-shrink-0" style={{
        background: 'rgba(255,255,255,0.05)',
        border: '1px solid rgba(255,255,255,0.09)'
      }}>
          <Calendar size={11} style={{
          color: '#8A938C'
        }} />
          <span className="text-[11px] font-black" style={{
          color: '#8A938C'
        }}>
            {player.age} ans
          </span>
        </div>
      </div>

      {/* ── TAB BAR ── */}
      <div className="sticky top-0 z-20 flex gap-1.5 px-5 py-3 mb-5" style={{
      background: 'rgba(11,34,28,0.96)',
      backdropFilter: 'blur(18px)',
      borderBottom: '1px solid rgba(255,255,255,0.05)'
    }}>
        {PROFILE_TABS.map(tab => <button key={tab.id} onClick={() => setActiveTab(tab.id)} className="flex items-center gap-1.5 px-4 py-2.5 rounded-[12px] text-[10px] font-black uppercase tracking-wide flex-1 justify-center transition-all" style={activeTab === tab.id ? {
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
          {activeTab === 'stats' && <div className="flex flex-col gap-5">

              {/* Season filter */}
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

              {/* Global summary card */}
              <div className="rounded-[24px] p-5" style={{
            background: 'linear-gradient(135deg, #183C31 0%, #0B221C 100%)',
            border: '1px solid rgba(183,255,26,0.08)'
          }}>
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <p className="text-[9px] font-black uppercase tracking-[0.22em]" style={{
                  color: '#8A938C'
                }}>
                      {seasonFilter === 'all' ? 'Toutes saisons' : SEASON_FILTERS.find(f => f.id === seasonFilter)?.label}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[36px] font-black tracking-tighter leading-none" style={{
                    color: getRatingColor(avgRating)
                  }}>
                        {avgRating.toFixed(1)}
                      </span>
                      <div className="flex flex-col gap-0.5">
                        <span className="text-[9px] font-black uppercase tracking-wider" style={{
                      color: '#8A938C'
                    }}>
                          Note moy.
                        </span>
                        {mvpCount > 0 && <div className="flex items-center gap-1">
                            <Star size={9} fill="#C9C1A2" style={{
                        color: '#C9C1A2'
                      }} />
                            <span className="text-[9px] font-black" style={{
                        color: '#C9C1A2'
                      }}>
                              {mvpCount}× MVP
                            </span>
                          </div>}
                      </div>
                    </div>
                  </div>
                  <div className="w-16 h-16 rounded-[20px] flex items-center justify-center" style={{
                background: getRatingBg(avgRating),
                border: `1.5px solid ${getRatingColor(avgRating)}30`
              }}>
                    <span className="text-[22px] font-black" style={{
                  color: getRatingColor(avgRating)
                }}>
                      {totalGoals}
                    </span>
                  </div>
                </div>

                {/* Mini grid */}
                <div className="grid grid-cols-3 gap-2">
                  {[{
                label: 'Buts',
                value: String(totalGoals),
                color: '#B7FF1A'
              }, {
                label: 'Passes',
                value: String(totalAssists),
                color: '#35D07F'
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
                }}>
                        {item.value}
                      </span>
                      <span className="text-[7px] font-black uppercase tracking-[0.15em]" style={{
                  color: '#8A938C'
                }}>
                        {item.label}
                      </span>
                    </div>)}
                </div>
              </div>

              {/* Per-season cards */}
              {filteredStats.map((stat, idx) => <motion.div key={stat.seasonId} initial={{
            opacity: 0,
            y: 14
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: idx * 0.06
          }} className="rounded-[22px] overflow-hidden" style={{
            background: '#123129',
            border: '1px solid rgba(255,255,255,0.06)'
          }}>
                  {/* Card header */}
                  <div className="flex items-center justify-between px-4 pt-4 pb-3" style={{
              borderBottom: '1px solid rgba(255,255,255,0.05)'
            }}>
                    <div className="flex items-center gap-2.5">
                      <span className="text-[16px]">{stat.editionIcon}</span>
                      <div>
                        <p className="text-[12px] font-black leading-none" style={{
                    color: '#F2EEDC'
                  }}>
                          {stat.season}
                        </p>
                        <p className="text-[9px] font-semibold mt-0.5" style={{
                    color: '#8A938C'
                  }}>
                          {stat.edition} · {stat.teamName}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {stat.mvp && <div className="flex items-center gap-1 px-2 py-1 rounded-[8px]" style={{
                  background: 'rgba(201,193,162,0.1)',
                  border: '1px solid rgba(201,193,162,0.2)'
                }}>
                          <Star size={9} fill="#C9C1A2" style={{
                    color: '#C9C1A2'
                  }} />
                          <span className="text-[8px] font-black uppercase tracking-wide" style={{
                    color: '#C9C1A2'
                  }}>
                            MVP
                          </span>
                        </div>}
                      <div className="px-2.5 py-1 rounded-[8px]" style={{
                  background: getRatingBg(stat.rating),
                  border: `1px solid ${getRatingColor(stat.rating)}30`
                }}>
                        <span className="text-[13px] font-black tabular-nums" style={{
                    color: getRatingColor(stat.rating)
                  }}>
                          {stat.rating.toFixed(1)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Stat rows */}
                  <div className="px-4 pt-3 pb-4 flex flex-col gap-3">
                    {/* Goals row */}
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-1.5">
                          <Target size={10} style={{
                      color: '#B7FF1A'
                    }} />
                          <span className="text-[10px] font-black uppercase tracking-wider" style={{
                      color: '#8A938C'
                    }}>
                            Buts
                          </span>
                        </div>
                        <span className="text-[15px] font-black tabular-nums" style={{
                    color: '#F2EEDC'
                  }}>
                          {stat.goals}
                        </span>
                      </div>
                      <StatBar value={stat.goals} max={20} color="#B7FF1A" />
                    </div>

                    {/* Assists row */}
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-1.5">
                          <Activity size={10} style={{
                      color: '#35D07F'
                    }} />
                          <span className="text-[10px] font-black uppercase tracking-wider" style={{
                      color: '#8A938C'
                    }}>
                            Passes décisives
                          </span>
                        </div>
                        <span className="text-[15px] font-black tabular-nums" style={{
                    color: '#F2EEDC'
                  }}>
                          {stat.assists}
                        </span>
                      </div>
                      <StatBar value={stat.assists} max={15} color="#35D07F" />
                    </div>

                    {/* Bottom row — cards + matches */}
                    <div className="grid grid-cols-3 gap-2 mt-1">
                      <div className="flex flex-col items-center gap-0.5 py-2.5 rounded-[10px]" style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.05)'
                }}>
                        <div className="flex items-center gap-1">
                          <div className="w-2.5 h-3.5 rounded-[2px]" style={{
                      background: '#F4C542'
                    }} />
                          <span className="text-[14px] font-black" style={{
                      color: '#F2EEDC'
                    }}>
                            {stat.yellowCards}
                          </span>
                        </div>
                        <span className="text-[7px] font-black uppercase tracking-[0.12em]" style={{
                    color: '#8A938C'
                  }}>
                          Jaunes
                        </span>
                      </div>
                      <div className="flex flex-col items-center gap-0.5 py-2.5 rounded-[10px]" style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.05)'
                }}>
                        <div className="flex items-center gap-1">
                          <div className="w-2.5 h-3.5 rounded-[2px]" style={{
                      background: '#D94B5B'
                    }} />
                          <span className="text-[14px] font-black" style={{
                      color: '#F2EEDC'
                    }}>
                            {stat.redCards}
                          </span>
                        </div>
                        <span className="text-[7px] font-black uppercase tracking-[0.12em]" style={{
                    color: '#8A938C'
                  }}>
                          Rouges
                        </span>
                      </div>
                      <div className="flex flex-col items-center gap-0.5 py-2.5 rounded-[10px]" style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.05)'
                }}>
                        <span className="text-[14px] font-black" style={{
                    color: '#F2EEDC'
                  }}>
                          {stat.matchesPlayed}
                        </span>
                        <span className="text-[7px] font-black uppercase tracking-[0.12em]" style={{
                    color: '#8A938C'
                  }}>
                          Matchs
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>)}

              {/* Aggregated discipline line */}
              {seasonFilter === 'all' && <div className="rounded-[18px] px-4 py-3.5 flex items-center justify-between" style={{
            background: '#123129',
            border: '1px solid rgba(255,255,255,0.05)'
          }}>
                  <div className="flex items-center gap-2">
                    <AlertTriangle size={13} style={{
                color: '#8A938C'
              }} />
                    <span className="text-[11px] font-black uppercase tracking-wide" style={{
                color: '#8A938C'
              }}>
                      Discipline totale
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5">
                      <div className="w-3 h-4 rounded-[2px]" style={{
                  background: '#F4C542'
                }} />
                      <span className="text-[13px] font-black" style={{
                  color: '#F2EEDC'
                }}>
                        {totalYellow}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-3 h-4 rounded-[2px]" style={{
                  background: '#D94B5B'
                }} />
                      <span className="text-[13px] font-black" style={{
                  color: '#F2EEDC'
                }}>
                        {totalRed}
                      </span>
                    </div>
                  </div>
                </div>}
            </div>}

          {/* ══ TROPHÉES TAB ══ */}
          {activeTab === 'trophes' && <div className="flex flex-col gap-4">

              {/* Crown trophy header */}
              <div className="rounded-[24px] p-5 flex items-center gap-4 relative overflow-hidden" style={{
            background: 'linear-gradient(135deg, rgba(201,193,162,0.08) 0%, rgba(11,34,28,0.98) 100%)',
            border: '1px solid rgba(201,193,162,0.15)'
          }}>
                <div className="absolute right-4 top-0 w-28 h-28 rounded-full" style={{
              background: 'radial-gradient(ellipse, rgba(201,193,162,0.08) 0%, transparent 70%)',
              filter: 'blur(20px)'
            }} />
                <div className="w-16 h-16 rounded-[20px] flex items-center justify-center flex-shrink-0" style={{
              background: 'rgba(201,193,162,0.1)',
              border: '1px solid rgba(201,193,162,0.22)'
            }}>
                  <Crown size={28} style={{
                color: '#C9C1A2'
              }} />
                </div>
                <div className="flex-1">
                  <p className="text-[9px] font-black uppercase tracking-[0.22em]" style={{
                color: '#8A938C'
              }}>
                    Palmarès complet
                  </p>
                  <p className="text-[26px] font-black leading-none tracking-tight mt-0.5" style={{
                color: '#F2EEDC'
              }}>
                    {player.trophies.length}
                  </p>
                  <p className="text-[10px] font-semibold" style={{
                color: '#8A938C'
              }}>
                    distinctions · {mvpCount}× MVP
                  </p>
                </div>
              </div>

              {/* Trophy list */}
              {player.trophies.map((trophy, i) => {
            const meta = TROPHY_META[trophy.type];
            return <motion.div key={trophy.id} initial={{
              opacity: 0,
              x: -10
            }} animate={{
              opacity: 1,
              x: 0
            }} transition={{
              delay: i * 0.07
            }} className="flex items-center gap-4 px-4 py-4 rounded-[20px]" style={{
              background: '#123129',
              border: `1px solid ${trophy.color}18`
            }}>
                    <div className="w-12 h-12 rounded-[16px] flex items-center justify-center flex-shrink-0" style={{
                background: `${trophy.color}12`,
                border: `1.5px solid ${trophy.color}30`,
                boxShadow: `0 4px 16px ${trophy.color}12`,
                color: trophy.color
              }}>
                      {meta.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[14px] font-black leading-none" style={{
                  color: '#F2EEDC'
                }}>
                        {trophy.title}
                      </p>
                      <p className="text-[10px] font-semibold mt-1" style={{
                  color: '#8A938C'
                }}>
                        {trophy.edition}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-0.5">
                      <span className="px-2 py-0.5 rounded-[7px] text-[8px] font-black uppercase tracking-wide" style={{
                  background: `${trophy.color}14`,
                  color: trophy.color,
                  border: `1px solid ${trophy.color}28`
                }}>
                        {meta.label}
                      </span>
                      <span className="text-[9px] font-semibold" style={{
                  color: '#8A938C'
                }}>
                        {trophy.year}
                      </span>
                    </div>
                  </motion.div>;
          })}

              {/* Share card */}
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
                }}>
                      Partage ton palmarès
                    </p>
                    <p className="text-[9px] font-semibold" style={{
                  color: '#8A938C'
                }}>
                      Montre qui tu es sur le terrain
                    </p>
                  </div>
                </div>
                <button className="flex items-center gap-1.5 px-3.5 py-2 rounded-[12px] text-[10px] font-black uppercase tracking-wider flex-shrink-0" style={{
              background: '#B7FF1A',
              color: '#0B221C'
            }} aria-label="Partager le palmarès">
                  <Share2 size={11} />
                  <span>Partager</span>
                </button>
              </div>
            </div>}

          {/* ══ PARCOURS TAB ══ */}
          {activeTab === 'parcours' && <div className="flex flex-col gap-5">

              {/* Info card */}
              <div className="rounded-[22px] p-4 grid grid-cols-2 gap-3" style={{
            background: '#123129',
            border: '1px solid rgba(255,255,255,0.05)'
          }}>
                {[{
              label: 'Poste',
              value: player.position,
              color: player.currentTeamColor
            }, {
              label: 'Nationalité',
              value: `${player.nationalityFlag} ${player.nationality}`,
              color: '#C9C1A2'
            }, {
              label: 'Âge',
              value: `${player.age} ans`,
              color: '#7BA7D9'
            }, {
              label: 'Quartier',
              value: player.neighborhood,
              color: '#8A938C'
            }].map(item => <div key={item.label} className="flex flex-col gap-0.5 px-3 py-2.5 rounded-[12px]" style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.05)'
            }}>
                    <span className="text-[8px] font-black uppercase tracking-[0.18em]" style={{
                color: '#8A938C'
              }}>
                      {item.label}
                    </span>
                    <span className="text-[11px] font-black" style={{
                color: item.color
              }}>
                      {item.value}
                    </span>
                  </div>)}
              </div>

              {/* Clubs tag cloud */}
              <div>
                <h2 className="text-[9px] font-black uppercase tracking-[0.22em] mb-3" style={{
              color: '#8A938C'
            }}>
                  Clubs fréquentés
                </h2>
                <div className="flex gap-2 flex-wrap">
                  {player.clubs.map(club => <div key={club} className="flex items-center gap-1.5 px-3.5 py-2 rounded-full" style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.09)'
              }}>
                      <Shield size={10} style={{
                  color: '#2E8F57'
                }} />
                      <span className="text-[10px] font-black" style={{
                  color: '#D7DBC8'
                }}>
                        {club}
                      </span>
                    </div>)}
                </div>
              </div>

              {/* Career timeline */}
              <div>
                <h2 className="text-[9px] font-black uppercase tracking-[0.22em] mb-4" style={{
              color: '#8A938C'
            }}>
                  Carrière
                </h2>
                <div className="flex flex-col gap-0">
                  {player.career.map((step, i) => <motion.div key={step.id} initial={{
                opacity: 0,
                y: 10
              }} animate={{
                opacity: 1,
                y: 0
              }} transition={{
                delay: i * 0.08
              }} className="flex gap-4">
                      {/* Timeline line */}
                      <div className="flex flex-col items-center" style={{
                  width: 28,
                  flexShrink: 0
                }}>
                        <div className="w-3 h-3 rounded-full flex-shrink-0 mt-1" style={{
                    background: step.color,
                    boxShadow: `0 0 8px ${step.color}50`,
                    border: '2px solid #0B221C'
                  }} />
                        {i < player.career.length - 1 && <div className="flex-1 w-px mt-1" style={{
                    background: 'rgba(255,255,255,0.07)',
                    minHeight: 32
                  }} />}
                      </div>

                      {/* Content */}
                      <div className="flex-1 pb-5 rounded-[18px] p-4 mb-1" style={{
                  background: '#123129',
                  border: `1px solid ${step.color}18`
                }}>
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <p className="text-[14px] font-black leading-none" style={{
                        color: '#F2EEDC'
                      }}>
                              {step.club}
                            </p>
                            <p className="text-[9px] font-bold mt-0.5 uppercase tracking-wide" style={{
                        color: step.color
                      }}>
                              {step.level}
                            </p>
                          </div>
                          <span className="text-[8px] font-black px-2 py-0.5 rounded-md flex-shrink-0" style={{
                      background: 'rgba(255,255,255,0.05)',
                      color: '#8A938C',
                      border: '1px solid rgba(255,255,255,0.07)'
                    }}>
                            {step.period}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 mt-2.5">
                          <ChevronRight size={9} style={{
                      color: step.color
                    }} />
                          <p className="text-[10px] font-semibold" style={{
                      color: 'rgba(215,219,200,0.6)'
                    }}>
                            {step.highlight}
                          </p>
                        </div>
                      </div>
                    </motion.div>)}
                </div>
              </div>

              {/* Best level badge */}
              <div className="rounded-[20px] p-4 flex items-center gap-4" style={{
            background: 'linear-gradient(135deg, rgba(46,143,87,0.1) 0%, rgba(18,49,41,0.95) 100%)',
            border: '1px solid rgba(46,143,87,0.2)'
          }}>
                <div className="w-12 h-12 rounded-[15px] flex items-center justify-center flex-shrink-0" style={{
              background: 'linear-gradient(145deg, #2E8F57, #123129)',
              boxShadow: '0 6px 20px rgba(46,143,87,0.3)'
            }}>
                  <Award size={20} style={{
                color: '#B7FF1A'
              }} />
                </div>
                <div>
                  <p className="text-[9px] font-black uppercase tracking-[0.18em]" style={{
                color: '#8A938C'
              }}>
                    Meilleur niveau atteint
                  </p>
                  <p className="text-[14px] font-black" style={{
                color: '#F2EEDC'
              }}>
                    {player.bestLevel}
                  </p>
                  <p className="text-[9px] font-semibold mt-0.5" style={{
                color: '#35D07F'
              }}>
                    Tcheksplay · Annecy
                  </p>
                </div>
              </div>

              {/* Teams played with */}
              <div className="rounded-[20px] px-4 py-3.5 flex items-center gap-3" style={{
            background: '#123129',
            border: '1px solid rgba(255,255,255,0.05)'
          }}>
                <Users size={15} style={{
              color: '#8A938C'
            }} />
                <span className="text-[11px] font-black flex-1" style={{
              color: '#F2EEDC'
            }}>
                  {player.clubs.length} clubs au total
                </span>
                <span className="text-[10px] font-bold" style={{
              color: '#8A938C'
            }}>
                  {player.clubs.join(' · ')}
                </span>
              </div>
            </div>}
        </motion.div>
      </AnimatePresence>
    </div>;
};