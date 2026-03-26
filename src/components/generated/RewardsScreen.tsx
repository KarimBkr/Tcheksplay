import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Star, Crown, Zap, Target, Shield, Award, Heart, ChevronRight, Share2, Users, TrendingUp, Flame, Medal } from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────

type RewardTab = 'podium' | 'badges' | 'halloffame';
interface BadgeAward {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
  rarity: 'legendary' | 'epic' | 'rare' | 'common';
  category: 'match' | 'day' | 'tournament' | 'fairplay' | 'scorer' | 'special';
  holder: string;
  holderTeam: string;
  holderImg: string;
  edition: string;
  value?: string | number;
  locked?: boolean;
}
interface HallOfFameEntry {
  id: string;
  name: string;
  title: string;
  team: string;
  season: string;
  img: string;
  stat: string;
  statLabel: string;
  accentColor: string;
}
interface PodiumEntry {
  id: string;
  rank: 1 | 2 | 3;
  name: string;
  team: string;
  img: string;
  value: string;
  valueLabel: string;
  badge?: string;
}
interface SpecialDistinction {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  holder: string;
  holderImg: string;
  edition: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const BADGE_AWARDS: BadgeAward[] = [{
  id: 'ba1',
  title: 'MVP du Match',
  subtitle: 'Meilleur joueur du match',
  description: 'Performance exceptionnelle sur 90 minutes. Décisif, dominateur, incontournable.',
  icon: <Zap size={22} />,
  rarity: 'epic',
  category: 'match',
  holder: 'Killian Bersot',
  holderTeam: 'Annecy FC',
  holderImg: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=120&h=120',
  edition: 'Summer Cup S3',
  value: '9.2'
}, {
  id: 'ba2',
  title: 'Meilleur du Jour',
  subtitle: 'Top performer de la journée',
  description: 'Élu meilleur joueur sur l\'ensemble des matchs de la journée.',
  icon: <Star size={22} />,
  rarity: 'rare',
  category: 'day',
  holder: 'Yassin Mebrouk',
  holderTeam: 'Veyrier Utd',
  holderImg: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120',
  edition: 'J14 · Summer Cup',
  value: '8.7'
}, {
  id: 'ba3',
  title: 'MVP Tournoi',
  subtitle: 'Meilleur joueur de l\'édition',
  description: 'La distinction suprême. Élu meilleur joueur sur l\'ensemble de la saison.',
  icon: <Crown size={22} />,
  rarity: 'legendary',
  category: 'tournament',
  holder: 'Killian Bersot',
  holderTeam: 'Annecy FC',
  holderImg: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=120&h=120',
  edition: 'Summer Cup S3',
  value: '8.9'
}, {
  id: 'ba4',
  title: 'Équipe Fair-Play',
  subtitle: 'Esprit sportif exemplaire',
  description: 'Zéro carton rouge, fair-play constant, ambassadeurs du tournoi.',
  icon: <Heart size={22} />,
  rarity: 'rare',
  category: 'fairplay',
  holder: 'Seynod City',
  holderTeam: 'Seynod City',
  holderImg: 'https://images.unsplash.com/photo-1551958219-acbc595d4c80?auto=format&fit=crop&w=120&h=120',
  edition: 'Summer Cup S3',
  value: '0'
}, {
  id: 'ba5',
  title: 'Meilleur Buteur',
  subtitle: 'Top scorer de la saison',
  description: 'Le plus grand nombre de buts inscrits sur toute la saison.',
  icon: <Target size={22} />,
  rarity: 'epic',
  category: 'scorer',
  holder: 'Killian Bersot',
  holderTeam: 'Annecy FC',
  holderImg: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=120&h=120',
  edition: 'Summer Cup S3',
  value: '17'
}, {
  id: 'ba6',
  title: 'Meilleur Passeur',
  subtitle: 'Roi des passes décisives',
  description: 'Le plus grand nombre de passes décisives délivrées sur la saison.',
  icon: <TrendingUp size={22} />,
  rarity: 'epic',
  category: 'special',
  holder: 'Yassin Mebrouk',
  holderTeam: 'Veyrier Utd',
  holderImg: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120',
  edition: 'Summer Cup S3',
  value: '14'
}, {
  id: 'ba7',
  title: 'Meilleur Gardien',
  subtitle: 'Rempart infranchissable',
  description: 'Le gardien le plus décisif avec le plus grand nombre de cleansheets.',
  icon: <Shield size={22} />,
  rarity: 'rare',
  category: 'special',
  holder: 'Amine Touazi',
  holderTeam: 'Cran Giants',
  holderImg: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=120&h=120',
  edition: 'Summer Cup S3',
  value: '9'
}, {
  id: 'ba8',
  title: 'Distinction Spéciale',
  subtitle: 'Génie de l\'édition',
  description: 'Performance individuelle unique et mémorable. Moment de grâce rare.',
  icon: <Flame size={22} />,
  rarity: 'legendary',
  category: 'special',
  holder: 'Killian Bersot',
  holderTeam: 'Annecy FC',
  holderImg: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=120&h=120',
  edition: 'Summer Cup S3',
  value: 'Unique'
}];
const HALL_OF_FAME: HallOfFameEntry[] = [{
  id: 'hof1',
  name: 'Killian Bersot',
  title: 'MVP Saison 3',
  team: 'Annecy FC',
  season: 'Summer Cup S3 · 2025',
  img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80',
  stat: '17',
  statLabel: 'buts',
  accentColor: '#B7FF1A'
}, {
  id: 'hof2',
  name: 'Yassin Mebrouk',
  title: 'Meilleur Passeur S2',
  team: 'Veyrier Utd',
  season: 'Winter Cup S2 · 2024',
  img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
  stat: '14',
  statLabel: 'passes déc.',
  accentColor: '#C9C1A2'
}, {
  id: 'hof3',
  name: 'Théo Garnier',
  title: 'Champion S1',
  team: 'Seynod City',
  season: 'Spring Open S1 · 2023',
  img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
  stat: '1er',
  statLabel: 'classement',
  accentColor: '#D94B5B'
}];
const SPECIAL_DISTINCTIONS: SpecialDistinction[] = [{
  id: 'sd1',
  title: 'But de l\'Édition',
  description: 'Le but le plus spectaculaire de toute la saison, élu par la communauté.',
  icon: <Flame size={18} />,
  color: '#D94B5B',
  holder: 'Killian Bersot',
  holderImg: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=120&h=120',
  edition: 'Summer Cup S3'
}, {
  id: 'sd2',
  title: 'Équipe de la Saison',
  description: 'Le onze idéal élu par les coaches et capitaines à l\'issue de la saison.',
  icon: <Users size={18} />,
  color: '#7BA7D9',
  holder: 'Annecy FC · Ligne d\'attaque',
  holderImg: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=120&h=120',
  edition: 'Summer Cup S3'
}];
const TOP_SCORERS_PODIUM: PodiumEntry[] = [{
  id: 'ps1',
  rank: 1,
  name: 'Killian Bersot',
  team: 'Annecy FC',
  img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=120&h=120',
  value: '17',
  valueLabel: 'buts',
  badge: 'MVP'
}, {
  id: 'ps2',
  rank: 2,
  name: 'Lucas Perrin',
  team: 'Poisy Stars',
  img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=120&h=120',
  value: '9',
  valueLabel: 'buts'
}, {
  id: 'ps3',
  rank: 3,
  name: 'Yassin Mebrouk',
  team: 'Veyrier Utd',
  img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120',
  value: '11',
  valueLabel: 'buts'
}];
const REWARD_TABS: {
  id: RewardTab;
  label: string;
  icon: React.ReactNode;
}[] = [{
  id: 'podium',
  label: 'Podium',
  icon: <Trophy size={14} />
}, {
  id: 'badges',
  label: 'Badges',
  icon: <Award size={14} />
}, {
  id: 'halloffame',
  label: 'Hall of Fame',
  icon: <Crown size={14} />
}];

// ─── Rarity Config ────────────────────────────────────────────────────────────

const RARITY_CONFIG = {
  legendary: {
    label: 'Légendaire',
    color: '#D94B5B',
    bg: 'rgba(217,75,91,0.12)',
    border: 'rgba(217,75,91,0.35)',
    glow: 'rgba(217,75,91,0.2)',
    gradient: 'linear-gradient(135deg, rgba(217,75,91,0.15) 0%, rgba(11,34,28,0.97) 100%)'
  },
  epic: {
    label: 'Épique',
    color: '#B7FF1A',
    bg: 'rgba(183,255,26,0.10)',
    border: 'rgba(183,255,26,0.3)',
    glow: 'rgba(183,255,26,0.15)',
    gradient: 'linear-gradient(135deg, rgba(183,255,26,0.08) 0%, rgba(11,34,28,0.97) 100%)'
  },
  rare: {
    label: 'Rare',
    color: '#7BA7D9',
    bg: 'rgba(123,167,217,0.10)',
    border: 'rgba(123,167,217,0.3)',
    glow: 'rgba(123,167,217,0.15)',
    gradient: 'linear-gradient(135deg, rgba(123,167,217,0.08) 0%, rgba(11,34,28,0.97) 100%)'
  },
  common: {
    label: 'Standard',
    color: '#C9C1A2',
    bg: 'rgba(201,193,162,0.08)',
    border: 'rgba(201,193,162,0.2)',
    glow: 'rgba(201,193,162,0.10)',
    gradient: 'linear-gradient(135deg, rgba(201,193,162,0.05) 0%, rgba(11,34,28,0.97) 100%)'
  }
};

// ─── PodiumSection ────────────────────────────────────────────────────────────

const PodiumSection = () => {
  const first = TOP_SCORERS_PODIUM.find(p => p.rank === 1)!;
  const second = TOP_SCORERS_PODIUM.find(p => p.rank === 2)!;
  const third = TOP_SCORERS_PODIUM.find(p => p.rank === 3)!;
  return <div className="flex flex-col gap-6">
      {/* Podium visuel */}
      <div className="mx-5 rounded-[28px] overflow-hidden relative" style={{
      background: 'linear-gradient(160deg, #183C31 0%, #0B221C 100%)',
      border: '1px solid rgba(255,255,255,0.06)'
    }}>
        <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse at 50% 0%, rgba(183,255,26,0.08) 0%, transparent 70%)'
      }} />
        <div className="px-5 pt-5 pb-2">
          <p className="text-[9px] font-black uppercase tracking-[0.25em] mb-0.5" style={{
          color: '#8A938C'
        }}>Summer Cup · Saison 3</p>
          <h2 className="text-[18px] font-black tracking-[-0.03em]" style={{
          color: '#F2EEDC'
        }}>Top Buteurs</h2>
        </div>
        <div className="flex items-end justify-center gap-0 px-4 pb-0 pt-4">
          {/* 2nd */}
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: 0.1
        }} className="flex flex-col items-center gap-2 flex-1">
            <div className="relative">
              <div className="w-[54px] h-[54px] rounded-full overflow-hidden" style={{
              border: '2px solid rgba(201,193,162,0.4)'
            }}>
                <img src={second.img} alt={second.name} className="w-full h-full object-cover" />
              </div>
              <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-black" style={{
              background: 'rgba(201,193,162,0.2)',
              border: '1px solid rgba(201,193,162,0.4)',
              color: '#C9C1A2'
            }}>2</div>
            </div>
            <p className="text-[9px] font-black text-center leading-tight" style={{
            color: '#C9C1A2'
          }}>{second.name.split(' ')[0]}</p>
            <div className="w-full flex flex-col items-center justify-end rounded-t-[14px] pt-3 pb-4" style={{
            background: 'rgba(201,193,162,0.06)',
            border: '1px solid rgba(201,193,162,0.1)',
            borderBottom: 'none',
            height: '70px'
          }}>
              <span className="text-[22px] font-black leading-none" style={{
              color: '#C9C1A2'
            }}>{second.value}</span>
              <span className="text-[7px] font-black uppercase tracking-wider" style={{
              color: '#8A938C'
            }}>{second.valueLabel}</span>
            </div>
          </motion.div>

          {/* 1st */}
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: 0.0
        }} className="flex flex-col items-center gap-2 flex-1 -mb-0 z-10">
            <motion.div animate={{
            scale: [1, 1.04, 1]
          }} transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: 'easeInOut'
          }}>
              <Crown size={18} style={{
              color: '#B7FF1A'
            }} />
            </motion.div>
            <div className="relative">
              <div className="w-[68px] h-[68px] rounded-full overflow-hidden" style={{
              border: '2.5px solid rgba(183,255,26,0.5)',
              boxShadow: '0 0 24px rgba(183,255,26,0.2)'
            }}>
                <img src={first.img} alt={first.name} className="w-full h-full object-cover" />
              </div>
              {first.badge && <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full text-[7px] font-black whitespace-nowrap" style={{
              background: '#B7FF1A',
              color: '#0B221C'
            }}>{first.badge}</div>}
            </div>
            <p className="text-[10px] font-black text-center leading-tight" style={{
            color: '#F2EEDC'
          }}>{first.name.split(' ')[0]}</p>
            <div className="w-full flex flex-col items-center justify-end rounded-t-[14px] pt-3 pb-4" style={{
            background: 'rgba(183,255,26,0.07)',
            border: '1px solid rgba(183,255,26,0.15)',
            borderBottom: 'none',
            height: '90px'
          }}>
              <span className="text-[28px] font-black leading-none" style={{
              color: '#B7FF1A'
            }}>{first.value}</span>
              <span className="text-[7px] font-black uppercase tracking-wider" style={{
              color: '#8A938C'
            }}>{first.valueLabel}</span>
            </div>
          </motion.div>

          {/* 3rd */}
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: 0.2
        }} className="flex flex-col items-center gap-2 flex-1">
            <div className="relative">
              <div className="w-[50px] h-[50px] rounded-full overflow-hidden" style={{
              border: '2px solid rgba(201,193,162,0.2)'
            }}>
                <img src={third.img} alt={third.name} className="w-full h-full object-cover" />
              </div>
              <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-black" style={{
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.12)',
              color: '#8A938C'
            }}>3</div>
            </div>
            <p className="text-[9px] font-black text-center leading-tight" style={{
            color: '#D7DBC8'
          }}>{third.name.split(' ')[0]}</p>
            <div className="w-full flex flex-col items-center justify-end rounded-t-[14px] pt-3 pb-4" style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.07)',
            borderBottom: 'none',
            height: '55px'
          }}>
              <span className="text-[18px] font-black leading-none" style={{
              color: '#D7DBC8'
            }}>{third.value}</span>
              <span className="text-[7px] font-black uppercase tracking-wider" style={{
              color: '#8A938C'
            }}>{third.valueLabel}</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Distinctions en vedette */}
      <div className="px-5">
        <p className="text-[9px] font-black uppercase tracking-[0.2em] mb-4" style={{
        color: '#8A938C'
      }}>Distinctions de l'Édition</p>
        <div className="flex flex-col gap-3">
          {BADGE_AWARDS.filter(b => b.rarity === 'legendary' || b.rarity === 'epic').map(award => {
          const cfg = RARITY_CONFIG[award.rarity];
          return <motion.div key={award.id} whileTap={{
            scale: 0.98
          }} className="relative rounded-[22px] overflow-hidden p-4 flex items-center gap-4" style={{
            background: cfg.gradient,
            border: `1px solid ${cfg.border}`
          }}>
                <div className="absolute top-0 right-0 w-28 h-28 rounded-full pointer-events-none" style={{
              background: `radial-gradient(ellipse, ${cfg.glow} 0%, transparent 70%)`,
              filter: 'blur(20px)'
            }} />
                <div className="w-12 h-12 rounded-[16px] flex items-center justify-center flex-shrink-0" style={{
              background: cfg.bg,
              border: `1px solid ${cfg.border}`,
              color: cfg.color
            }}>
                  {award.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <h3 className="text-[13px] font-black leading-tight" style={{
                  color: '#F2EEDC'
                }}>{award.title}</h3>
                    <span className="text-[7px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded-md" style={{
                  background: cfg.bg,
                  border: `1px solid ${cfg.border}`,
                  color: cfg.color
                }}>{cfg.label}</span>
                  </div>
                  <p className="text-[9px] font-semibold" style={{
                color: '#8A938C'
              }}>{award.subtitle}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <img src={award.holderImg} alt={award.holder} className="w-5 h-5 rounded-full object-cover" style={{
                  border: `1px solid ${cfg.border}`
                }} />
                    <span className="text-[10px] font-black" style={{
                  color: cfg.color
                }}>{award.holder}</span>
                  </div>
                </div>
                {award.value !== undefined && <div className="flex-shrink-0 flex flex-col items-end">
                    <span className="text-[26px] font-black leading-none tracking-tighter" style={{
                color: cfg.color
              }}>{award.value}</span>
                    <span className="text-[7px] font-black uppercase tracking-widest" style={{
                color: '#8A938C'
              }}>
                      {award.category === 'scorer' ? 'buts' : award.category === 'match' || award.category === 'day' || award.category === 'tournament' ? 'note' : award.category === 'fairplay' ? 'rouge' : 'assists'}
                    </span>
                  </div>}
              </motion.div>;
        })}
        </div>
      </div>

      {/* Distinctions spéciales */}
      <div className="px-5">
        <p className="text-[9px] font-black uppercase tracking-[0.2em] mb-4" style={{
        color: '#8A938C'
      }}>Distinctions Spéciales</p>
        <div className="flex flex-col gap-3">
          {SPECIAL_DISTINCTIONS.map(sd => <motion.div key={sd.id} whileTap={{
          scale: 0.98
        }} className="rounded-[20px] p-4 flex items-center gap-4" style={{
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.06)'
        }}>
              <div className="w-11 h-11 rounded-[14px] flex items-center justify-center flex-shrink-0" style={{
            background: `${sd.color}15`,
            border: `1px solid ${sd.color}30`,
            color: sd.color
          }}>
                {sd.icon}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-[12px] font-black mb-0.5" style={{
              color: '#F2EEDC'
            }}>{sd.title}</h4>
                <p className="text-[9px] leading-relaxed" style={{
              color: '#8A938C'
            }}>{sd.description}</p>
                <div className="flex items-center gap-1.5 mt-2">
                  <img src={sd.holderImg} alt={sd.holder} className="w-4 h-4 rounded-full object-cover" />
                  <span className="text-[9px] font-bold" style={{
                color: sd.color
              }}>{sd.holder}</span>
                </div>
              </div>
              <ChevronRight size={14} style={{
            color: '#8A938C',
            flexShrink: 0
          }} />
            </motion.div>)}
        </div>
      </div>
    </div>;
};

// ─── BadgesSection ────────────────────────────────────────────────────────────

const BadgesSection = () => {
  const [selectedBadge, setSelectedBadge] = useState<BadgeAward | null>(null);
  return <div className="flex flex-col gap-6 px-5">
      {/* Intro */}
      <div className="rounded-[22px] p-5 flex items-center gap-4" style={{
      background: 'linear-gradient(135deg, rgba(183,255,26,0.06) 0%, rgba(11,34,28,0.98) 100%)',
      border: '1px solid rgba(183,255,26,0.1)'
    }}>
        <div className="w-12 h-12 rounded-[16px] flex items-center justify-center flex-shrink-0" style={{
        background: 'rgba(183,255,26,0.1)',
        border: '1px solid rgba(183,255,26,0.2)',
        color: '#B7FF1A'
      }}>
          <Award size={22} />
        </div>
        <div>
          <h3 className="text-[14px] font-black leading-tight" style={{
          color: '#F2EEDC'
        }}>Collection de Badges</h3>
          <p className="text-[10px] mt-0.5" style={{
          color: '#8A938C'
        }}><span className="font-black" style={{
            color: '#B7FF1A'
          }}>{BADGE_AWARDS.filter(b => !b.locked).length}</span> badges actifs · Saison 3</p>
        </div>
      </div>

      {/* Grille de badges */}
      <div>
        <p className="text-[9px] font-black uppercase tracking-[0.2em] mb-4" style={{
        color: '#8A938C'
      }}>Tous les badges · S3</p>
        <div className="grid grid-cols-2 gap-3">
          {BADGE_AWARDS.map(award => {
          const cfg = RARITY_CONFIG[award.rarity];
          return <motion.button key={award.id} whileTap={{
            scale: 0.96
          }} onClick={() => setSelectedBadge(award)} className="relative rounded-[20px] p-4 flex flex-col items-center gap-3 text-center" style={{
            background: cfg.gradient,
            border: `1px solid ${cfg.border}`
          }}>
                <div className="absolute top-0 left-0 right-0 h-px" style={{
              background: `linear-gradient(90deg, transparent, ${cfg.color}40, transparent)`
            }} />
                <div className="w-14 h-14 rounded-[18px] flex items-center justify-center" style={{
              background: cfg.bg,
              border: `1px solid ${cfg.border}`,
              color: cfg.color,
              boxShadow: `0 4px 16px ${cfg.glow}`
            }}>
                  {award.icon}
                </div>
                <div>
                  <p className="text-[11px] font-black leading-tight mb-1" style={{
                color: '#F2EEDC'
              }}>{award.title}</p>
                  <span className="text-[7px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full" style={{
                background: cfg.bg,
                border: `1px solid ${cfg.border}`,
                color: cfg.color
              }}>{cfg.label}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <img src={award.holderImg} alt={award.holder} className="w-4 h-4 rounded-full object-cover" style={{
                border: `1px solid ${cfg.border}`
              }} />
                  <span className="text-[8px] font-bold truncate max-w-[80px]" style={{
                color: '#8A938C'
              }}>{award.holder.split(' ')[0]}</span>
                </div>
              </motion.button>;
        })}
        </div>
      </div>

      {/* Modal Badge Detail */}
      <AnimatePresence>
        {selectedBadge && <motion.div initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} exit={{
        opacity: 0
      }} className="fixed inset-0 z-50 flex items-end justify-center" style={{
        background: 'rgba(0,0,0,0.75)',
        backdropFilter: 'blur(8px)'
      }} onClick={() => setSelectedBadge(null)}>
            <motion.div initial={{
          y: 60,
          opacity: 0
        }} animate={{
          y: 0,
          opacity: 1
        }} exit={{
          y: 60,
          opacity: 0
        }} transition={{
          type: 'spring',
          damping: 26,
          stiffness: 320
        }} className="w-full max-w-md rounded-t-[32px] p-6 pb-10" style={{
          background: '#0F2B23',
          border: '1px solid rgba(255,255,255,0.08)',
          borderBottom: 'none'
        }} onClick={e => e.stopPropagation()}>
              {(() => {
            const cfg = RARITY_CONFIG[selectedBadge.rarity];
            return <div className="flex flex-col items-center gap-4">
                    <div className="w-2 h-1 rounded-full mx-auto mb-2" style={{
                background: 'rgba(255,255,255,0.15)'
              }} />
                    <div className="w-20 h-20 rounded-[24px] flex items-center justify-center" style={{
                background: cfg.bg,
                border: `1.5px solid ${cfg.border}`,
                color: cfg.color,
                boxShadow: `0 8px 32px ${cfg.glow}`
              }}>
                      {React.cloneElement(selectedBadge.icon as React.ReactElement<{
                  size?: number;
                }>, {
                  size: 34
                })}
                    </div>
                    <div className="text-center">
                      <span className="text-[8px] font-black uppercase tracking-wider px-2 py-1 rounded-full mb-2 inline-block" style={{
                  background: cfg.bg,
                  border: `1px solid ${cfg.border}`,
                  color: cfg.color
                }}>{cfg.label}</span>
                      <h3 className="text-[22px] font-black tracking-[-0.03em] mt-2" style={{
                  color: '#F2EEDC'
                }}>{selectedBadge.title}</h3>
                      <p className="text-[11px] mt-1 font-semibold" style={{
                  color: '#8A938C'
                }}>{selectedBadge.subtitle}</p>
                    </div>
                    <p className="text-[12px] text-center leading-relaxed" style={{
                color: 'rgba(215,219,200,0.7)'
              }}>{selectedBadge.description}</p>
                    <div className="w-full rounded-[18px] p-4 flex items-center gap-4" style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.06)'
              }}>
                      <img src={selectedBadge.holderImg} alt={selectedBadge.holder} className="w-12 h-12 rounded-full object-cover" style={{
                  border: `2px solid ${cfg.border}`
                }} />
                      <div>
                        <p className="text-[9px] font-black uppercase tracking-wider mb-0.5" style={{
                    color: '#8A938C'
                  }}>Attribué à</p>
                        <p className="text-[14px] font-black" style={{
                    color: '#F2EEDC'
                  }}>{selectedBadge.holder}</p>
                        <p className="text-[10px] font-semibold" style={{
                    color: cfg.color
                  }}>{selectedBadge.holderTeam} · {selectedBadge.edition}</p>
                      </div>
                      {selectedBadge.value !== undefined && <div className="ml-auto flex flex-col items-end">
                          <span className="text-[30px] font-black leading-none" style={{
                    color: cfg.color
                  }}>{selectedBadge.value}</span>
                        </div>}
                    </div>
                    <button className="w-full flex items-center justify-center gap-2 py-3.5 rounded-[16px] text-[12px] font-black uppercase tracking-wider" style={{
                background: '#B7FF1A',
                color: '#0B221C'
              }}>
                      <Share2 size={14} />
                      <span>Partager ce badge</span>
                    </button>
                  </div>;
          })()}
            </motion.div>
          </motion.div>}
      </AnimatePresence>
    </div>;
};

// ─── HallOfFameSection ────────────────────────────────────────────────────────

const HallOfFameSection = () => <div className="flex flex-col gap-6 px-5">
    {/* Banner */}
    <div className="relative rounded-[24px] overflow-hidden" style={{
    height: '140px'
  }}>
      <img src="https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800&q=80" alt="Hall of Fame Tcheksplay" className="w-full h-full object-cover" style={{
      filter: 'brightness(0.25)'
    }} />
      <div className="absolute inset-0" style={{
      background: 'linear-gradient(to top, rgba(11,34,28,0.98) 0%, rgba(11,34,28,0.3) 60%)'
    }} />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
        <div className="flex items-center gap-2">
          <div className="w-px h-6" style={{
          background: 'linear-gradient(to bottom, transparent, rgba(201,193,162,0.4), transparent)'
        }} />
          <Crown size={22} style={{
          color: '#C9C1A2'
        }} />
          <div className="w-px h-6" style={{
          background: 'linear-gradient(to bottom, transparent, rgba(201,193,162,0.4), transparent)'
        }} />
        </div>
        <h2 className="text-[22px] font-black tracking-[0.06em] uppercase" style={{
        color: '#F2EEDC'
      }}>Hall of Fame</h2>
        <p className="text-[9px] font-black uppercase tracking-[0.25em]" style={{
        color: '#8A938C'
      }}>Tcheksplay · Les Légendes</p>
      </div>
    </div>

    {/* Entries */}
    <div className="flex flex-col gap-4">
      {HALL_OF_FAME.map((entry, idx) => <motion.article key={entry.id} initial={{
      opacity: 0,
      x: -20
    }} animate={{
      opacity: 1,
      x: 0
    }} transition={{
      delay: idx * 0.1
    }} className="relative rounded-[24px] overflow-hidden" style={{
      background: '#123129',
      border: `1px solid ${entry.accentColor}20`
    }}>
          <div className="absolute inset-0 pointer-events-none" style={{
        background: `linear-gradient(135deg, ${entry.accentColor}06 0%, transparent 60%)`
      }} />
          <div className="relative h-36 overflow-hidden">
            <img src={entry.img} alt={`Portrait de ${entry.name} au Hall of Fame`} className="w-full h-full object-cover object-top" style={{
          filter: 'brightness(0.35)'
        }} />
            <div className="absolute inset-0" style={{
          background: `linear-gradient(to bottom, transparent 10%, rgba(18,49,41,0.97) 80%)`
        }} />
            <div className="absolute top-3 left-3 px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-wider" style={{
          background: `${entry.accentColor}18`,
          border: `1px solid ${entry.accentColor}35`,
          color: entry.accentColor
        }}>{entry.title}</div>
          </div>
          <div className="p-4 flex items-center gap-4">
            <div className="flex-1">
              <h3 className="text-[16px] font-black tracking-[-0.02em]" style={{
            color: '#F2EEDC'
          }}>{entry.name}</h3>
              <p className="text-[10px] font-semibold" style={{
            color: '#8A938C'
          }}>{entry.team} · {entry.season}</p>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-[32px] font-black leading-none tracking-tighter" style={{
            color: entry.accentColor
          }}>{entry.stat}</span>
              <span className="text-[8px] font-black uppercase tracking-wider" style={{
            color: '#8A938C'
          }}>{entry.statLabel}</span>
            </div>
          </div>
          <div className="absolute top-0 left-0 right-0 h-px" style={{
        background: `linear-gradient(90deg, transparent, ${entry.accentColor}40, transparent)`
      }} />
        </motion.article>)}
    </div>

    {/* Footer message */}
    <div className="rounded-[20px] p-5 text-center" style={{
    background: 'rgba(201,193,162,0.04)',
    border: '1px solid rgba(201,193,162,0.08)'
  }}>
      <Medal size={20} className="mx-auto mb-3" style={{
      color: '#C9C1A2'
    }} />
      <p className="text-[12px] font-black mb-1" style={{
      color: '#F2EEDC'
    }}>Tu veux entrer dans l'histoire ?</p>
      <p className="text-[10px] leading-relaxed" style={{
      color: '#8A938C'
    }}>Performe, domine, et rejoins les légendes de Tcheksplay.</p>
    </div>
  </div>;

// ─── RewardsScreen ────────────────────────────────────────────────────────────

export const RewardsScreen = () => {
  const [activeTab, setActiveTab] = useState<RewardTab>('podium');
  return <div className="flex flex-col gap-0">
      {/* Hero Header */}
      <div className="relative mx-5 mb-6 rounded-[28px] overflow-hidden" style={{
      height: '170px'
    }}>
        <img src="https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=800&q=80" alt="Récompenses et trophées Tcheksplay" className="w-full h-full object-cover" style={{
        filter: 'brightness(0.28)'
      }} />
        <div className="absolute inset-0" style={{
        background: 'linear-gradient(to top, rgba(11,34,28,0.97) 0%, rgba(11,34,28,0.3) 55%)'
      }} />
        <div className="absolute inset-0" style={{
        background: 'radial-gradient(ellipse at 50% 100%, rgba(183,255,26,0.1) 0%, transparent 60%)'
      }} />
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <p className="text-[8px] font-black uppercase tracking-[0.3em] mb-1" style={{
          color: 'rgba(183,255,26,0.6)'
        }}>Tcheksplay · Summer Cup</p>
          <h1 className="text-[26px] font-black tracking-[-0.04em] leading-none uppercase" style={{
          color: '#F2EEDC'
        }}>
            Récompenses
          </h1>
          <p className="text-[10px] font-semibold mt-1" style={{
          color: '#8A938C'
        }}>Saison 3 · Annecy & alentours</p>
        </div>
        <div className="absolute top-4 right-4">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-[12px]" style={{
          background: 'rgba(201,193,162,0.1)',
          border: '1px solid rgba(201,193,162,0.2)'
        }}>
            <Trophy size={11} style={{
            color: '#C9C1A2'
          }} />
            <span className="text-[9px] font-black" style={{
            color: '#C9C1A2'
          }}>{BADGE_AWARDS.length} badges</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 px-5 mb-6 overflow-x-auto" style={{
      scrollbarWidth: 'none'
    }}>
        {REWARD_TABS.map(tab => <button key={tab.id} onClick={() => setActiveTab(tab.id)} className="flex items-center gap-1.5 px-4 py-2.5 rounded-[14px] text-[10px] font-black uppercase tracking-wide whitespace-nowrap flex-shrink-0 transition-all" style={activeTab === tab.id ? {
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

      {/* Tab Content */}
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
      }}>
          {activeTab === 'podium' && <PodiumSection />}
          {activeTab === 'badges' && <BadgesSection />}
          {activeTab === 'halloffame' && <HallOfFameSection />}
        </motion.div>
      </AnimatePresence>
    </div>;
};