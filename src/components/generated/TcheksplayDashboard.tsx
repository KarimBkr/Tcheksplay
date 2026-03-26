import React, { useState, useEffect } from 'react';
import { Trophy, Users, Heart, Calendar, BarChart3, PlayCircle, MapPin, Bell, Shield, Zap, ArrowUpRight, Clock, ChevronRight, Target, User, Award, Activity, Crown, Radio, Newspaper, BookOpen, Settings, Star, ChevronLeft, Flame, LogOut, Lock, Eye, EyeOff, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { LiveMatchScreen } from './LiveMatchScreen';
import { MatchDetailScreen, EnhancedMatchesScreen } from './MatchDetailScreen';
import { PlayerProfile } from './PlayerProfile';
import { TeamProfile } from './TeamProfile';
import { RankingsScreen } from './RankingsScreen';
import { RewardsScreen } from './RewardsScreen';
import { NewsFeedScreen } from './NewsFeedScreen';
import { MediaGalleryScreen } from './MediaGalleryScreen';
import { SolidarityScreen } from './SolidarityScreen';
import { SponsorsScreen } from './SponsorsScreen';
import { VenuesScreen } from './VenuesScreen';
import { RegistrationScreen } from './RegistrationScreen';
import { TournamentRulesScreen } from './TournamentRulesScreen';
import { AdminDashboard } from './AdminDashboard';

// ─── Types ────────────────────────────────────────────────────────────────────

type UserRole = 'player' | 'admin';
type NavItem = 'home' | 'matches' | 'rankings' | 'players' | 'teams' | 'media' | 'solidarity' | 'profile' | 'liveMatch' | 'matchDetail' | 'teamProfile' | 'rewards' | 'feed' | 'sponsors' | 'venues' | 'registration' | 'rules' | 'admin' | 'account';
type MatchFilter = 'all' | 'live' | 'upcoming' | 'finished';
interface AppUser {
  id: string;
  name: string;
  role: UserRole;
  team: string;
  avatar: string;
  email: string;
}
interface TournamentMatch {
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
}
interface Player {
  id: string;
  name: string;
  team: string;
  position: string;
  goals: number;
  assists: number;
  matches: number;
  img: string;
  nationality: string;
}
interface TeamStat {
  name: string;
  abbr: string;
  points: number;
  wins: number;
  draws: number;
  losses: number;
  goals: number;
  goalsAgainst: number;
  rank: number;
}
interface MoreMenuItem {
  id: NavItem;
  icon: React.ReactNode;
  label: string;
  description: string;
}

// ─── Mock accounts ────────────────────────────────────────────────────────────

const MOCK_ACCOUNTS: (AppUser & {
  password: string;
})[] = [{
  id: 'u1',
  name: 'Killian Bersot',
  role: 'admin',
  team: 'Annecy FC',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=80&h=80',
  email: 'killian@tcheksplay.fr',
  password: 'admin123'
}, {
  id: 'u2',
  name: 'Yassin Mebrouk',
  role: 'player',
  team: 'Veyrier Utd',
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&h=80',
  email: 'yassin@tcheksplay.fr',
  password: 'joueur123'
}];

// ─── Data ─────────────────────────────────────────────────────────────────────

const MATCHES: TournamentMatch[] = [{
  id: 'm1',
  homeTeam: 'Annecy FC',
  awayTeam: 'Seynod City',
  homeScore: 2,
  awayScore: 1,
  time: "78'",
  status: 'live',
  category: 'Élite',
  venue: 'Terrain des Marquisats',
  date: "Auj."
}, {
  id: 'm2',
  homeTeam: 'Veyrier Utd',
  awayTeam: 'Poisy Stars',
  time: '20:30',
  status: 'upcoming',
  category: 'Élite',
  venue: 'Plateau de Veyrier',
  date: 'Auj. 20:30'
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
  date: 'Hier'
}, {
  id: 'm4',
  homeTeam: 'Poisy Stars',
  awayTeam: 'Annecy FC',
  time: '18:00',
  status: 'upcoming',
  category: 'Élite',
  venue: 'Stade de Poisy',
  date: 'Mar. 18:00'
}];
const PLAYERS: Player[] = [{
  id: 'p1',
  name: 'Killian Bersot',
  team: 'Annecy FC',
  position: 'Attaquant',
  goals: 17,
  assists: 8,
  matches: 18,
  img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=120&h=120',
  nationality: '🇫🇷'
}, {
  id: 'p2',
  name: 'Yassin Mebrouk',
  team: 'Veyrier Utd',
  position: 'Milieu',
  goals: 11,
  assists: 14,
  matches: 19,
  img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120',
  nationality: '🇩🇿'
}, {
  id: 'p3',
  name: 'Théo Garnier',
  team: 'Seynod City',
  position: 'Défenseur',
  goals: 3,
  assists: 6,
  matches: 20,
  img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&h=120',
  nationality: '🇫🇷'
}];
const TEAM_STATS: TeamStat[] = [{
  name: 'Annecy FC',
  abbr: 'AFC',
  points: 45,
  wins: 14,
  draws: 3,
  losses: 1,
  goals: 42,
  goalsAgainst: 14,
  rank: 1
}, {
  name: 'Veyrier Utd',
  abbr: 'VEY',
  points: 38,
  wins: 12,
  draws: 2,
  losses: 4,
  goals: 35,
  goalsAgainst: 22,
  rank: 2
}, {
  name: 'Seynod City',
  abbr: 'SEY',
  points: 32,
  wins: 10,
  draws: 2,
  losses: 6,
  goals: 28,
  goalsAgainst: 24,
  rank: 3
}, {
  name: 'Poisy Stars',
  abbr: 'POI',
  points: 28,
  wins: 8,
  draws: 4,
  losses: 6,
  goals: 24,
  goalsAgainst: 25,
  rank: 4
}, {
  name: 'Cran Giants',
  abbr: 'CRN',
  points: 24,
  wins: 7,
  draws: 3,
  losses: 8,
  goals: 21,
  goalsAgainst: 30,
  rank: 5
}, {
  name: 'Meythet FC',
  abbr: 'MEY',
  points: 19,
  wins: 5,
  draws: 4,
  losses: 9,
  goals: 18,
  goalsAgainst: 33,
  rank: 6
}];
const BOTTOM_NAV_TABS = [{
  id: 'home' as NavItem,
  icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>,
  label: 'Accueil'
}, {
  id: 'matches' as NavItem,
  icon: <Calendar size={22} />,
  label: 'Matchs'
}, {
  id: 'feed' as NavItem,
  icon: <Newspaper size={22} />,
  label: 'Actu'
}, {
  id: 'more' as NavItem,
  icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="5" r="1" /><circle cx="12" cy="12" r="1" /><circle cx="12" cy="19" r="1" /></svg>,
  label: 'Plus'
}];
const MATCH_FILTER_TABS: {
  id: MatchFilter;
  label: string;
}[] = [{
  id: 'all',
  label: 'Tous'
}, {
  id: 'live',
  label: 'En direct'
}, {
  id: 'upcoming',
  label: 'À venir'
}, {
  id: 'finished',
  label: 'Terminés'
}];

// ─── LoginScreen ──────────────────────────────────────────────────────────────

const LoginScreen = ({
  onLogin
}: {
  onLogin: (user: AppUser) => void;
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    setTimeout(() => {
      const found = MOCK_ACCOUNTS.find(a => a.email === email.trim().toLowerCase() && a.password === password);
      if (found) {
        const {
          password: _pw,
          ...user
        } = found;
        onLogin(user);
      } else {
        setError('Email ou mot de passe incorrect.');
      }
      setLoading(false);
    }, 700);
  };
  const handleQuickLogin = (account: typeof MOCK_ACCOUNTS[0]) => {
    setLoading(true);
    setTimeout(() => {
      const {
        password: _pw,
        ...user
      } = account;
      onLogin(user);
      setLoading(false);
    }, 500);
  };
  return <div className="min-h-screen w-full flex flex-col" style={{
    background: '#0B221C',
    color: '#F2EEDC'
  }}>
      {/* Ambient glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[240px] rounded-full" style={{
        opacity: 0.18,
        background: 'radial-gradient(ellipse, rgba(46,143,87,0.5) 0%, transparent 70%)'
      }} />
      </div>

      <div className="flex-1 flex flex-col justify-between px-5 pt-16 pb-10 relative z-10">
        {/* Logo */}
        <div className="flex flex-col items-center gap-5 mb-12">
          <div className="w-[68px] h-[68px] rounded-[22px] flex items-center justify-center" style={{
          background: 'linear-gradient(145deg, #2E8F57, #123129)',
          boxShadow: '0 20px 60px rgba(46,143,87,0.3)',
          color: '#B7FF1A'
        }}>
            <Trophy size={30} />
          </div>
          <div className="text-center">
            <h1 className="text-[30px] font-black tracking-[-0.04em] uppercase leading-none" style={{
            color: '#F2EEDC'
          }}>
              <span>Tcheks</span><span style={{
              color: '#B7FF1A'
            }}>play</span>
            </h1>
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] mt-1.5" style={{
            color: '#8A938C'
          }}>L'Esprit du Playground</p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label htmlFor="login-email" className="text-[10px] font-black uppercase tracking-[0.18em] mb-2 block" style={{
            color: '#8A938C'
          }}>
              Adresse email
            </label>
            <input id="login-email" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="ton@email.fr" autoComplete="email" required className="w-full h-[52px] rounded-[16px] px-4 text-[14px] font-semibold outline-none transition-all" style={{
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            color: '#F2EEDC'
          }} />
          </div>
          <div>
            <label htmlFor="login-password" className="text-[10px] font-black uppercase tracking-[0.18em] mb-2 block" style={{
            color: '#8A938C'
          }}>
              Mot de passe
            </label>
            <div className="relative">
              <input id="login-password" type={showPass ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" autoComplete="current-password" required className="w-full h-[52px] rounded-[16px] px-4 pr-12 text-[14px] font-semibold outline-none transition-all" style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              color: '#F2EEDC'
            }} />
              <button type="button" onClick={() => setShowPass(v => !v)} className="absolute right-3.5 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-[10px]" style={{
              color: '#8A938C'
            }} aria-label={showPass ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}>
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {error && <p className="text-[12px] font-semibold px-3 py-2 rounded-[10px]" style={{
          background: 'rgba(217,75,91,0.1)',
          color: '#D94B5B',
          border: '1px solid rgba(217,75,91,0.2)'
        }}>
              {error}
            </p>}

          <motion.button whileTap={{
          scale: 0.97
        }} type="submit" disabled={loading} className="h-[54px] rounded-[16px] text-[14px] font-black uppercase tracking-wider transition-all mt-1" style={{
          background: loading ? 'rgba(183,255,26,0.5)' : '#B7FF1A',
          color: '#0B221C'
        }}>
            {loading ? 'Connexion...' : 'Se connecter'}
          </motion.button>
        </form>

        {/* Quick access demo accounts */}
        <div className="mt-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex-1 h-px" style={{
            background: 'rgba(255,255,255,0.06)'
          }} />
            <span className="text-[9px] font-black uppercase tracking-[0.2em]" style={{
            color: '#556A61'
          }}>Accès rapide (démo)</span>
            <div className="flex-1 h-px" style={{
            background: 'rgba(255,255,255,0.06)'
          }} />
          </div>
          <div className="flex flex-col gap-2">
            {MOCK_ACCOUNTS.map(account => <motion.button key={account.id} whileTap={{
            scale: 0.98
          }} onClick={() => handleQuickLogin(account)} className="flex items-center gap-3 px-4 py-3 rounded-[16px] text-left" style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.07)'
          }}>
                <img src={account.avatar} alt={`Avatar de ${account.name}`} className="w-9 h-9 rounded-[11px] object-cover flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-black" style={{
                color: '#F2EEDC'
              }}>{account.name}</p>
                  <p className="text-[10px] font-semibold" style={{
                color: '#8A938C'
              }}>{account.email}</p>
                </div>
                <div className="flex items-center gap-1.5 px-2 py-1 rounded-[8px] flex-shrink-0" style={{
              background: account.role === 'admin' ? 'rgba(217,75,91,0.1)' : 'rgba(46,143,87,0.1)',
              border: `1px solid ${account.role === 'admin' ? 'rgba(217,75,91,0.2)' : 'rgba(46,143,87,0.2)'}`,
              color: account.role === 'admin' ? '#D94B5B' : '#35D07F'
            }}>
                  {account.role === 'admin' ? <Shield size={9} /> : <User size={9} />}
                  <span className="text-[8px] font-black uppercase tracking-wide">{account.role === 'admin' ? 'Admin' : 'Joueur'}</span>
                </div>
              </motion.button>)}
          </div>
        </div>
      </div>
    </div>;
};

// ─── LogoutConfirmModal ───────────────────────────────────────────────────────

const LogoutConfirmModal = ({
  user,
  onConfirm,
  onCancel
}: {
  user: AppUser;
  onConfirm: () => void;
  onCancel: () => void;
}) => <motion.div initial={{
  opacity: 0
}} animate={{
  opacity: 1
}} exit={{
  opacity: 0
}} className="fixed inset-0 z-[200] flex items-end justify-center px-4 pb-8" style={{
  background: 'rgba(0,0,0,0.7)',
  backdropFilter: 'blur(8px)'
}} onClick={onCancel}>
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
    stiffness: 320,
    damping: 30
  }} onClick={e => e.stopPropagation()} className="w-full max-w-sm rounded-[28px] overflow-hidden" style={{
    background: '#142E25',
    border: '1px solid rgba(255,255,255,0.09)'
  }}>
      <div className="px-6 pt-6 pb-5">
        <div className="flex items-center justify-between mb-5">
          <div className="w-11 h-11 rounded-[14px] flex items-center justify-center" style={{
          background: 'rgba(217,75,91,0.12)',
          color: '#D94B5B'
        }}>
            <LogOut size={20} />
          </div>
          <button onClick={onCancel} className="w-9 h-9 rounded-[11px] flex items-center justify-center" style={{
          background: 'rgba(255,255,255,0.05)',
          color: '#8A938C'
        }} aria-label="Annuler">
            <X size={16} />
          </button>
        </div>
        <h2 className="text-[18px] font-black tracking-[-0.03em] mb-1.5" style={{
        color: '#F2EEDC'
      }}>
          Se déconnecter ?
        </h2>
        <p className="text-[13px] font-semibold leading-relaxed mb-5" style={{
        color: '#8A938C'
      }}>
          <span>Tu es connecté en tant que </span><span style={{
          color: '#F2EEDC'
        }}>{user.name}</span><span>. Tu pourras te reconnecter à tout moment.</span>
        </p>
        <div className="flex gap-3">
          <button onClick={onCancel} className="flex-1 h-[48px] rounded-[14px] text-[13px] font-black uppercase tracking-wider" style={{
          background: 'rgba(255,255,255,0.06)',
          color: '#8A938C',
          border: '1px solid rgba(255,255,255,0.08)'
        }}>
            Annuler
          </button>
          <motion.button whileTap={{
          scale: 0.96
        }} onClick={onConfirm} className="flex-1 h-[48px] rounded-[14px] text-[13px] font-black uppercase tracking-wider flex items-center justify-center gap-2" style={{
          background: 'rgba(217,75,91,0.15)',
          color: '#D94B5B',
          border: '1px solid rgba(217,75,91,0.25)'
        }}>
            <LogOut size={14} />
            <span>Déconnecter</span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  </motion.div>;

// ─── AccountScreen ────────────────────────────────────────────────────────────

const AccountScreen = ({
  user,
  onLogout,
  onNav
}: {
  user: AppUser;
  onLogout: () => void;
  onNav: (id: NavItem) => void;
}) => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const isAdmin = user.role === 'admin';
  return <div className="px-5 pt-2 pb-8">
      <header className="pt-12 pb-6">
        <h1 className="text-[26px] font-black tracking-[-0.04em] uppercase leading-none" style={{
        color: '#F2EEDC'
      }}>
          Compte
        </h1>
        <p className="text-[11px] font-semibold mt-1" style={{
        color: '#8A938C'
      }}>
          Paramètres &amp; identité
        </p>
      </header>

      {/* User card */}
      <motion.button whileTap={{
      scale: 0.98
    }} onClick={() => onNav('profile')} className="w-full flex items-center gap-4 p-4 rounded-[22px] mb-5 text-left" style={{
      background: 'rgba(183,255,26,0.04)',
      border: '1px solid rgba(183,255,26,0.1)'
    }}>
        <div className="relative flex-shrink-0">
          <img src={user.avatar} alt={`Avatar de ${user.name}`} className="w-14 h-14 rounded-[16px] object-cover" style={{
          border: '2px solid rgba(183,255,26,0.3)'
        }} />
          {isAdmin && <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-[6px] flex items-center justify-center" style={{
          background: '#D94B5B'
        }}>
              <Shield size={9} style={{
            color: '#fff'
          }} />
            </div>}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <p className="text-[15px] font-black" style={{
            color: '#F2EEDC'
          }}>{user.name}</p>
            {isAdmin && <span className="px-1.5 py-0.5 rounded-[6px] text-[7px] font-black uppercase tracking-wider" style={{
            background: 'rgba(217,75,91,0.12)',
            color: '#D94B5B',
            border: '1px solid rgba(217,75,91,0.2)'
          }}>
                Admin
              </span>}
          </div>
          <p className="text-[11px] font-semibold" style={{
          color: '#8A938C'
        }}>{user.email}</p>
          <p className="text-[10px] font-semibold mt-0.5" style={{
          color: '#556A61'
        }}>{user.team}</p>
        </div>
        <ChevronRight size={16} style={{
        color: '#556A61',
        flexShrink: 0
      }} />
      </motion.button>

      {/* Settings section */}
      <div className="mb-5">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-[9px] font-black uppercase tracking-[0.22em]" style={{
          color: '#556A61'
        }}>Paramètres</span>
          <div className="flex-1 h-px" style={{
          background: 'rgba(255,255,255,0.05)'
        }} />
        </div>
        <div className="flex flex-col gap-2">
          {[{
          icon: <Bell size={18} />,
          label: 'Notifications',
          desc: 'Alertes matchs & actu'
        }, {
          icon: <User size={18} />,
          label: 'Mon profil joueur',
          desc: `${user.team} · Statistiques`
        }].map(item => <motion.button key={item.label} whileTap={{
          scale: 0.98
        }} onClick={() => item.label === 'Mon profil joueur' ? onNav('profile') : undefined} className="flex items-center gap-4 p-4 rounded-[20px] text-left w-full" style={{
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.06)'
        }}>
              <div className="w-11 h-11 rounded-[14px] flex items-center justify-center flex-shrink-0" style={{
            background: 'rgba(46,143,87,0.12)',
            color: '#2E8F57'
          }}>
                {item.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[14px] font-black leading-none" style={{
              color: '#F2EEDC'
            }}>{item.label}</p>
                <p className="text-[11px] font-semibold mt-0.5" style={{
              color: '#8A938C'
            }}>{item.desc}</p>
              </div>
              <ChevronRight size={16} style={{
            color: '#556A61',
            flexShrink: 0
          }} />
            </motion.button>)}
        </div>
      </div>

      {/* Admin section — only if admin */}
      {isAdmin && <div className="mb-5">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-[9px] font-black uppercase tracking-[0.22em]" style={{
          color: '#556A61'
        }}>Administration</span>
            <div className="flex-1 h-px" style={{
          background: 'rgba(255,255,255,0.05)'
        }} />
          </div>
          <motion.button whileTap={{
        scale: 0.98
      }} onClick={() => onNav('admin')} className="flex items-center gap-4 p-4 rounded-[20px] text-left w-full" style={{
        background: 'rgba(217,75,91,0.05)',
        border: '1px solid rgba(217,75,91,0.15)'
      }}>
            <div className="w-11 h-11 rounded-[14px] flex items-center justify-center flex-shrink-0" style={{
          background: 'rgba(217,75,91,0.12)',
          color: '#D94B5B'
        }}>
              <Settings size={20} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <p className="text-[14px] font-black leading-none" style={{
              color: '#F2EEDC'
            }}>Back-office</p>
                <span className="px-1.5 py-0.5 rounded-[6px] text-[7px] font-black uppercase tracking-wider" style={{
              background: 'rgba(217,75,91,0.12)',
              color: '#D94B5B',
              border: '1px solid rgba(217,75,91,0.2)'
            }}>Admin</span>
              </div>
              <p className="text-[11px] font-semibold" style={{
            color: '#8A938C'
          }}>Gestion · Commission sportive</p>
            </div>
            <ChevronRight size={16} style={{
          color: '#556A61',
          flexShrink: 0
        }} />
          </motion.button>
        </div>}

      {/* Logout */}
      <div>
        <div className="flex items-center gap-3 mb-3">
          <span className="text-[9px] font-black uppercase tracking-[0.22em]" style={{
          color: '#556A61'
        }}>Session</span>
          <div className="flex-1 h-px" style={{
          background: 'rgba(255,255,255,0.05)'
        }} />
        </div>
        <motion.button whileTap={{
        scale: 0.98
      }} onClick={() => setShowLogoutModal(true)} className="flex items-center gap-4 p-4 rounded-[20px] text-left w-full" style={{
        background: 'rgba(217,75,91,0.05)',
        border: '1px solid rgba(217,75,91,0.12)'
      }}>
          <div className="w-11 h-11 rounded-[14px] flex items-center justify-center flex-shrink-0" style={{
          background: 'rgba(217,75,91,0.1)',
          color: '#D94B5B'
        }}>
            <LogOut size={20} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[14px] font-black leading-none" style={{
            color: '#D94B5B'
          }}>Se déconnecter</p>
            <p className="text-[11px] font-semibold mt-0.5" style={{
            color: '#8A938C'
          }}>Quitter la session {user.name}</p>
          </div>
        </motion.button>
      </div>

      <AnimatePresence>
        {showLogoutModal && <LogoutConfirmModal user={user} onConfirm={onLogout} onCancel={() => setShowLogoutModal(false)} />}
      </AnimatePresence>
    </div>;
};

// ─── SplashScreen ─────────────────────────────────────────────────────────────

const SplashScreen = () => <motion.div initial={{
  opacity: 1
}} exit={{
  opacity: 0,
  transition: {
    duration: 0.4,
    ease: 'easeInOut'
  }
}} className="fixed inset-0 z-[100] flex flex-col items-center justify-center" style={{
  background: '#0B221C'
}}>
  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
    <div className="w-72 h-72 rounded-full" style={{
      background: 'radial-gradient(ellipse, rgba(46,143,87,0.25) 0%, transparent 70%)',
      filter: 'blur(40px)'
    }} />
  </div>
  <motion.div animate={{
    scale: [0.9, 1.04, 1],
    opacity: [0, 1]
  }} transition={{
    duration: 0.6,
    ease: 'easeOut',
    delay: 0.2
  }} className="flex flex-col items-center gap-6 relative z-10">
    <div className="w-20 h-20 rounded-[28px] flex items-center justify-center" style={{
      background: 'linear-gradient(145deg, #2E8F57, #123129)',
      boxShadow: '0 20px 60px rgba(46,143,87,0.3)',
      color: '#B7FF1A'
    }}>
      <Trophy size={38} />
    </div>
    <div className="text-center">
      <h1 className="text-[32px] font-black tracking-[-0.04em] uppercase leading-none" style={{
        color: '#F2EEDC'
      }}>
        <span>Tcheks</span><span style={{
          color: '#B7FF1A'
        }}>play</span>
      </h1>
      <p className="text-[10px] font-bold uppercase tracking-[0.3em] mt-2" style={{
        color: '#8A938C'
      }}>
        L'Esprit du Playground
      </p>
    </div>
    <div className="w-40 h-[2px] rounded-full overflow-hidden" style={{
      background: 'rgba(255,255,255,0.07)'
    }}>
      <motion.div initial={{
        width: '0%'
      }} animate={{
        width: '100%'
      }} transition={{
        duration: 0.85,
        ease: 'easeInOut'
      }} className="h-full rounded-full" style={{
        background: 'linear-gradient(90deg, #2E8F57, #B7FF1A)'
      }} />
    </div>
  </motion.div>
</motion.div>;

// ─── BottomNav ────────────────────────────────────────────────────────────────

const BottomNav = ({
  active,
  onSelect
}: {
  active: NavItem | 'more';
  onSelect: (id: NavItem | 'more') => void;
}) => <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50" style={{
  width: 'calc(100% - 32px)',
  maxWidth: 400
}}>
  <div className="flex items-center justify-around h-[62px] rounded-[30px] px-2" style={{
    background: 'rgba(15,35,28,0.96)',
    backdropFilter: 'blur(28px)',
    border: '1px solid rgba(255,255,255,0.08)',
    boxShadow: '0 20px 60px rgba(0,0,0,0.55)'
  }}>
    {BOTTOM_NAV_TABS.map(tab => {
      const isActive = active === tab.id;
      return <button key={tab.id} onClick={() => onSelect(tab.id)} aria-label={tab.label} className="relative flex flex-col items-center justify-center gap-0.5 w-14 h-12 rounded-[18px] transition-all duration-200" style={{
        color: isActive ? '#B7FF1A' : '#556A61',
        background: isActive ? 'rgba(183,255,26,0.08)' : 'transparent'
      }}>
        {tab.icon}
        <span className="text-[9px] font-black uppercase tracking-wide" style={{
          color: isActive ? '#B7FF1A' : '#556A61'
        }}>{tab.label}</span>
      </button>;
    })}
    {/* Center live button */}
    <div className="absolute left-1/2 -translate-x-1/2 -top-5">
      <button aria-label="Voir le match en direct" onClick={() => onSelect('liveMatch')} className="w-[54px] h-[54px] rounded-[20px] flex items-center justify-center transition-all active:scale-95" style={{
        background: 'linear-gradient(145deg, #8E2B36, #5C1B23)',
        boxShadow: '0 8px 32px rgba(142,43,54,0.5), 0 0 0 1px rgba(183,255,26,0.12)',
        color: '#F2EEDC'
      }}>
        <Radio size={22} />
      </button>
    </div>
  </div>
</nav>;

// ─── MoreScreen ───────────────────────────────────────────────────────────────

const MORE_COMPETITION_ITEMS: MoreMenuItem[] = [{
  id: 'rankings',
  icon: <BarChart3 size={20} />,
  label: 'Classement',
  description: 'Général · Saison 3'
}, {
  id: 'players',
  icon: <User size={20} />,
  label: 'Joueurs',
  description: 'Tous les effectifs'
}, {
  id: 'teams',
  icon: <Shield size={20} />,
  label: 'Équipes',
  description: '6 équipes · Saison 3'
}, {
  id: 'rules',
  icon: <BookOpen size={20} />,
  label: 'Règlement',
  description: 'Summer Cup – Saison 3'
}];
const MORE_ECOSYSTEM_ITEMS: MoreMenuItem[] = [{
  id: 'media',
  icon: <PlayCircle size={20} />,
  label: 'Médias',
  description: 'Galerie vidéos & photos'
}, {
  id: 'rewards',
  icon: <Award size={20} />,
  label: 'Récompenses',
  description: 'Badges & distinctions'
}, {
  id: 'solidarity',
  icon: <Heart size={20} />,
  label: 'Solidaire',
  description: 'Tcheks Impact'
}, {
  id: 'sponsors',
  icon: <Star size={20} />,
  label: 'Partenaires',
  description: 'Sponsors officiels'
}, {
  id: 'venues',
  icon: <MapPin size={20} />,
  label: 'Terrains',
  description: 'Logistique & disponibilités'
}, {
  id: 'registration',
  icon: <Users size={20} />,
  label: 'Inscription',
  description: 'Rejoindre le tournoi'
}];
const MoreScreen = ({
  onNav,
  user
}: {
  onNav: (id: NavItem) => void;
  user: AppUser | null;
}) => {
  const isAdmin = user?.role === 'admin';
  return <div className="px-5 pt-2 pb-8">
      <header className="pt-12 pb-6">
        <h1 className="text-[26px] font-black tracking-[-0.04em] uppercase leading-none" style={{
        color: '#F2EEDC'
      }}>
          Explorer
        </h1>
        <p className="text-[11px] font-semibold mt-1" style={{
        color: '#8A938C'
      }}>
          Toutes les sections de Tcheksplay
        </p>
      </header>

      {/* Section 1: Compétition & Jeu */}
      <div className="mb-5">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-[9px] font-black uppercase tracking-[0.22em]" style={{
          color: '#556A61'
        }}>
            Compétition &amp; Jeu
          </span>
          <div className="flex-1 h-px" style={{
          background: 'rgba(255,255,255,0.05)'
        }} />
        </div>
        <div className="flex flex-col gap-2">
          {MORE_COMPETITION_ITEMS.map(item => <motion.button key={item.id} whileTap={{
          scale: 0.98
        }} onClick={() => onNav(item.id)} className="flex items-center gap-4 p-4 rounded-[20px] text-left w-full transition-all" style={{
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.06)'
        }}>
              <div className="w-11 h-11 rounded-[14px] flex items-center justify-center flex-shrink-0" style={{
            background: 'rgba(46,143,87,0.12)',
            color: '#2E8F57'
          }}>
                {item.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[14px] font-black leading-none" style={{
              color: '#F2EEDC'
            }}>{item.label}</p>
                <p className="text-[11px] font-semibold mt-0.5" style={{
              color: '#8A938C'
            }}>{item.description}</p>
              </div>
              <ChevronRight size={16} style={{
            color: '#556A61',
            flexShrink: 0
          }} />
            </motion.button>)}
        </div>
      </div>

      {/* Section 2: Écosystème & Services */}
      <div className="mb-5">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-[9px] font-black uppercase tracking-[0.22em]" style={{
          color: '#556A61'
        }}>
            Écosystème &amp; Services
          </span>
          <div className="flex-1 h-px" style={{
          background: 'rgba(255,255,255,0.05)'
        }} />
        </div>
        <div className="flex flex-col gap-2">
          {MORE_ECOSYSTEM_ITEMS.map(item => <motion.button key={item.id} whileTap={{
          scale: 0.98
        }} onClick={() => onNav(item.id)} className="flex items-center gap-4 p-4 rounded-[20px] text-left w-full transition-all" style={{
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.06)'
        }}>
              <div className="w-11 h-11 rounded-[14px] flex items-center justify-center flex-shrink-0" style={{
            background: 'rgba(46,143,87,0.12)',
            color: '#2E8F57'
          }}>
                {item.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[14px] font-black leading-none" style={{
              color: '#F2EEDC'
            }}>{item.label}</p>
                <p className="text-[11px] font-semibold mt-0.5" style={{
              color: '#8A938C'
            }}>{item.description}</p>
              </div>
              <ChevronRight size={16} style={{
            color: '#556A61',
            flexShrink: 0
          }} />
            </motion.button>)}
        </div>
      </div>

      {/* Mon compte / profil */}
      <div className="mb-5">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-[9px] font-black uppercase tracking-[0.22em]" style={{
          color: '#556A61'
        }}>Mon espace</span>
          <div className="flex-1 h-px" style={{
          background: 'rgba(255,255,255,0.05)'
        }} />
        </div>
        <div className="flex flex-col gap-2">
          <motion.button whileTap={{
          scale: 0.98
        }} onClick={() => onNav('profile')} className="flex items-center gap-4 p-4 rounded-[20px] text-left w-full transition-all" style={{
          background: 'rgba(183,255,26,0.04)',
          border: '1px solid rgba(183,255,26,0.1)'
        }}>
            <div className="w-11 h-11 rounded-[14px] flex items-center justify-center flex-shrink-0 overflow-hidden" style={{
            background: 'rgba(183,255,26,0.1)',
            color: '#B7FF1A'
          }}>
              {user ? <img src={user.avatar} alt={`Avatar de ${user.name}`} className="w-11 h-11 rounded-[14px] object-cover" /> : <User size={20} />}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[14px] font-black leading-none" style={{
              color: '#F2EEDC'
            }}>Mon Profil</p>
              <p className="text-[11px] font-semibold mt-0.5" style={{
              color: '#8A938C'
            }}>{user ? user.name : 'Non connecté'}</p>
            </div>
            <ChevronRight size={16} style={{
            color: '#556A61',
            flexShrink: 0
          }} />
          </motion.button>
          <motion.button whileTap={{
          scale: 0.98
        }} onClick={() => onNav('account')} className="flex items-center gap-4 p-4 rounded-[20px] text-left w-full transition-all" style={{
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.06)'
        }}>
            <div className="w-11 h-11 rounded-[14px] flex items-center justify-center flex-shrink-0" style={{
            background: 'rgba(46,143,87,0.12)',
            color: '#2E8F57'
          }}>
              <Settings size={20} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[14px] font-black leading-none" style={{
              color: '#F2EEDC'
            }}>Compte &amp; Paramètres</p>
              <p className="text-[11px] font-semibold mt-0.5" style={{
              color: '#8A938C'
            }}>Déconnexion &amp; préférences</p>
            </div>
            <ChevronRight size={16} style={{
            color: '#556A61',
            flexShrink: 0
          }} />
          </motion.button>
        </div>
      </div>

      {/* Admin — visible uniquement si compte admin */}
      {isAdmin && <div>
          <div className="flex items-center gap-3 mb-3">
            <span className="text-[9px] font-black uppercase tracking-[0.22em]" style={{
          color: '#556A61'
        }}>
              Administration
            </span>
            <div className="flex-1 h-px" style={{
          background: 'rgba(255,255,255,0.05)'
        }} />
          </div>
          <motion.button whileTap={{
        scale: 0.98
      }} onClick={() => onNav('admin')} className="flex items-center gap-4 p-4 rounded-[20px] text-left w-full" style={{
        background: 'rgba(217,75,91,0.06)',
        border: '1px solid rgba(217,75,91,0.15)'
      }}>
            <div className="w-11 h-11 rounded-[14px] flex items-center justify-center flex-shrink-0" style={{
          background: 'rgba(217,75,91,0.12)',
          color: '#D94B5B'
        }}>
              <Settings size={20} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <p className="text-[14px] font-black leading-none" style={{
              color: '#F2EEDC'
            }}>Back-office</p>
                <span className="px-1.5 py-0.5 rounded-[6px] text-[7px] font-black uppercase tracking-wider" style={{
              background: 'rgba(217,75,91,0.12)',
              color: '#D94B5B',
              border: '1px solid rgba(217,75,91,0.2)'
            }}>Admin</span>
              </div>
              <p className="text-[11px] font-semibold" style={{
            color: '#8A938C'
          }}>Commission sportive · Gestion</p>
            </div>
            <ChevronRight size={16} style={{
          color: '#556A61',
          flexShrink: 0
        }} />
          </motion.button>
        </div>}
    </div>;
};

// ─── HomeScreen ───────────────────────────────────────────────────────────────

const HomeScreen = ({
  onNav,
  user
}: {
  onNav: (tab: NavItem, matchId?: string) => void;
  user: AppUser | null;
}) => {
  const [matchFilter, setMatchFilter] = useState<MatchFilter>('all');
  const liveMatch = MATCHES.find(m => m.status === 'live');
  const nextMatch = MATCHES.find(m => m.status === 'upcoming');
  const filteredMatches = matchFilter === 'all' ? MATCHES.filter(m => m.status !== 'live') : MATCHES.filter(m => m.status === matchFilter);
  return <div className="flex flex-col">

    {/* ── HEADER ── */}
    <header className="flex items-center justify-between px-5 pt-12 pb-4">
      <div>
        <h1 className="text-[26px] font-black tracking-[-0.04em] uppercase leading-none" style={{
          color: '#F2EEDC'
        }}>
          Tcheks<span style={{
            color: '#B7FF1A'
          }}>play</span>
        </h1>
        <div className="flex items-center gap-1 mt-0.5">
          <span className="text-[9px] font-bold tracking-[0.18em] uppercase" style={{
            color: '#8A938C'
          }}>
            Summer Cup – Saison 3 · Annecy
          </span>
        </div>
      </div>
      <div className="flex items-center gap-2.5">
        <button aria-label="Notifications" className="relative w-10 h-10 rounded-2xl flex items-center justify-center" style={{
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.07)',
          color: '#8A938C'
        }}>
          <Bell size={18} />
          <span className="absolute top-2 right-2 w-[6px] h-[6px] rounded-full border-[1.5px]" style={{
            background: '#B7FF1A',
            borderColor: '#0B221C'
          }} />
        </button>
        <button onClick={() => onNav(user ? 'profile' : 'account')} className="w-10 h-10 rounded-2xl overflow-hidden" style={{
          border: '2px solid rgba(183,255,26,0.3)',
          background: '#123129'
        }} aria-label="Mon profil">
          {user ? <img src={user.avatar} alt="Avatar utilisateur" className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center" style={{
            color: '#8A938C'
          }}>
              <User size={16} />
            </div>}
        </button>
      </div>
    </header>

    {/* ── LIVE HERO BLOCK ── */}
    {liveMatch && <section className="px-5 mb-6">
      <motion.button whileTap={{
        scale: 0.985
      }} onClick={() => onNav('liveMatch')} className="w-full text-left rounded-[28px] overflow-hidden" style={{
        background: 'linear-gradient(145deg, #2A0D13 0%, #1C0B0E 60%, #150D10 100%)',
        border: '1px solid rgba(142,43,54,0.45)',
        boxShadow: '0 12px 48px rgba(142,43,54,0.25)'
      }} aria-label={`Voir le match en direct ${liveMatch.homeTeam} vs ${liveMatch.awayTeam}`}>
        {/* Top strip */}
        <div className="flex items-center justify-between px-5 pt-4 pb-3" style={{
          borderBottom: '1px solid rgba(255,255,255,0.05)'
        }}>
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full animate-pulse" style={{
                background: '#B7FF1A'
              }} />
              <span className="text-[9px] font-black uppercase tracking-[0.22em]" style={{
                color: '#B7FF1A'
              }}>En direct</span>
            </span>
            <span className="w-px h-3" style={{
              background: 'rgba(255,255,255,0.1)'
            }} />
            <span className="px-2 py-0.5 rounded-md text-[8px] font-black uppercase" style={{
              background: 'rgba(183,255,26,0.08)',
              color: '#B7FF1A',
              border: '1px solid rgba(183,255,26,0.15)'
            }}>
              {liveMatch.category}
            </span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-[10px]" style={{
            background: 'rgba(142,43,54,0.3)',
            border: '1px solid rgba(142,43,54,0.4)'
          }}>
            <Clock size={10} style={{
              color: '#F4A5AE'
            }} />
            <span className="text-[13px] font-black tabular-nums" style={{
              color: '#F4A5AE'
            }}>{liveMatch.time}</span>
          </div>
        </div>

        {/* Score area */}
        <div className="px-5 py-5 flex items-center justify-between">
          <div className="flex flex-col items-center gap-2 flex-1">
            <div className="w-14 h-14 rounded-[18px] flex items-center justify-center" style={{
              background: 'rgba(46,143,87,0.15)',
              border: '1px solid rgba(46,143,87,0.25)'
            }}>
              <Shield size={22} style={{
                color: '#2E8F57'
              }} />
            </div>
            <span className="text-[13px] font-black text-center leading-tight" style={{
              color: '#F2EEDC'
            }}>{liveMatch.homeTeam}</span>
          </div>
          <div className="flex flex-col items-center gap-1 px-4">
            <span className="text-[52px] font-black tracking-[-0.06em] leading-none" style={{
              color: '#F2EEDC'
            }}>
              {liveMatch.homeScore}
              <span style={{
                color: 'rgba(255,255,255,0.25)'
              }}>–</span>
              {liveMatch.awayScore}
            </span>
          </div>
          <div className="flex flex-col items-center gap-2 flex-1">
            <div className="w-14 h-14 rounded-[18px] flex items-center justify-center" style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.08)'
            }}>
              <Shield size={22} style={{
                color: '#8A938C'
              }} />
            </div>
            <span className="text-[13px] font-black text-center leading-tight" style={{
              color: '#D7DBC8'
            }}>{liveMatch.awayTeam}</span>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-5 pb-4">
          <div className="flex items-center gap-1.5">
            <MapPin size={9} style={{
              color: '#8A938C'
            }} />
            <span className="text-[9px] font-semibold" style={{
              color: '#8A938C'
            }}>{liveMatch.venue}</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-[10px]" style={{
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.09)'
          }}>
            <span className="text-[9px] font-black uppercase tracking-wider" style={{
              color: '#F2EEDC'
            }}>Voir le live</span>
            <ChevronRight size={11} style={{
              color: '#8A938C'
            }} />
          </div>
        </div>
      </motion.button>
    </section>}

    {/* ── PROCHAIN MATCH ── */}
    {nextMatch && <section className="px-5 mb-6">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-[10px] font-black uppercase tracking-[0.2em]" style={{
          color: '#8A938C'
        }}>Prochain match</h2>
        <button onClick={() => onNav('matches')} className="flex items-center gap-0.5 text-[10px] font-black" style={{
          color: '#B7FF1A'
        }}>
          <span>Agenda</span>
          <ArrowUpRight size={12} />
        </button>
      </div>
      <motion.button whileTap={{
        scale: 0.98
      }} onClick={() => onNav('matchDetail', nextMatch.id)} className="w-full flex items-center gap-4 px-4 py-3.5 rounded-[20px] text-left" style={{
        background: '#0F2B23',
        border: '1px solid rgba(255,255,255,0.06)'
      }}>
        <div className="flex items-center gap-1.5 flex-shrink-0">
          <Clock size={11} style={{
            color: '#7BA7D9'
          }} />
          <span className="text-[11px] font-black" style={{
            color: '#7BA7D9'
          }}>{nextMatch.date}</span>
        </div>
        <div className="flex-1 flex items-center justify-center gap-2 min-w-0">
          <span className="text-[12px] font-black truncate" style={{
            color: '#F2EEDC'
          }}>{nextMatch.homeTeam}</span>
          <span className="text-[11px] font-black flex-shrink-0 px-1.5 py-0.5 rounded-[6px]" style={{
            background: 'rgba(255,255,255,0.06)',
            color: '#8A938C'
          }}>vs</span>
          <span className="text-[12px] font-black truncate" style={{
            color: '#D7DBC8'
          }}>{nextMatch.awayTeam}</span>
        </div>
        <span className="px-2 py-0.5 rounded-md text-[8px] font-black uppercase flex-shrink-0" style={{
          background: nextMatch.category === 'Élite' ? 'rgba(183,255,26,0.08)' : 'rgba(255,255,255,0.06)',
          color: nextMatch.category === 'Élite' ? '#B7FF1A' : '#8A938C',
          border: `1px solid ${nextMatch.category === 'Élite' ? 'rgba(183,255,26,0.15)' : 'rgba(255,255,255,0.08)'}`
        }}>
          {nextMatch.category}
        </span>
      </motion.button>
    </section>}

    {/* ── MODULE MATCHS ── */}
    <section className="mb-7">
      <div className="flex items-center justify-between px-5 mb-3">
        <h2 className="text-[10px] font-black uppercase tracking-[0.2em]" style={{
          color: '#8A938C'
        }}>Matchs</h2>
        <button onClick={() => onNav('matches')} className="flex items-center gap-0.5 text-[11px] font-black" style={{
          color: '#B7FF1A'
        }}>
          <span>Calendrier complet</span>
          <ArrowUpRight size={13} />
        </button>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 px-5 mb-3 overflow-x-auto" style={{
        scrollbarWidth: 'none'
      }}>
        {MATCH_FILTER_TABS.map(tab => <button key={tab.id} onClick={() => setMatchFilter(tab.id)} className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[10px] font-black whitespace-nowrap flex-shrink-0 transition-all" style={matchFilter === tab.id ? {
          background: '#B7FF1A',
          color: '#0B221C'
        } : {
          background: 'rgba(255,255,255,0.05)',
          border: '1px solid rgba(255,255,255,0.08)',
          color: '#8A938C'
        }}>
          {tab.id === 'live' && <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{
            background: matchFilter === 'live' ? '#0B221C' : '#B7FF1A'
          }} />}
          <span>{tab.label}</span>
        </button>)}
      </div>

      {/* Match list */}
      <div className="flex flex-col gap-2 px-5">
        {filteredMatches.map(match => {
          const isLive = match.status === 'live';
          const isUpcoming = match.status === 'upcoming';
          const isFinished = match.status === 'finished';
          return <motion.article key={match.id} whileTap={{
            scale: 0.98
          }} onClick={() => isLive ? onNav('liveMatch') : onNav('matchDetail', match.id)} className="flex items-center gap-3 px-4 py-3.5 rounded-[20px] cursor-pointer" style={{
            background: '#0F2B23',
            border: `1px solid ${isLive ? 'rgba(142,43,54,0.3)' : 'rgba(255,255,255,0.06)'}`
          }}>

            {/* Status col */}
            <div className="flex flex-col items-center gap-1 flex-shrink-0" style={{
              width: 52
            }}>
              <span className="flex items-center gap-1 px-1.5 py-0.5 rounded-[6px] text-[7px] font-black uppercase tracking-wider" style={{
                background: isLive ? 'rgba(142,43,54,0.25)' : isUpcoming ? 'rgba(123,167,217,0.1)' : 'rgba(255,255,255,0.05)',
                color: isLive ? '#F4A5AE' : isUpcoming ? '#7BA7D9' : '#8A938C',
                border: `1px solid ${isLive ? 'rgba(142,43,54,0.35)' : isUpcoming ? 'rgba(123,167,217,0.15)' : 'rgba(255,255,255,0.07)'}`
              }}>
                {isLive && <span className="w-1 h-1 rounded-full animate-pulse" style={{
                  background: '#B7FF1A'
                }} />}
                <span>{isLive ? 'Live' : isUpcoming ? 'À venir' : 'FT'}</span>
              </span>
              <span className="text-[8px] font-bold text-center tabular-nums" style={{
                color: isLive ? '#B7FF1A' : isUpcoming ? '#7BA7D9' : '#8A938C'
              }}>
                {isLive ? match.time : isUpcoming ? match.time : match.date}
              </span>
            </div>

            {/* Teams + score */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <div className="flex flex-col gap-0.5 flex-1 min-w-0">
                  <span className="text-[12px] font-black truncate" style={{
                    color: '#F2EEDC'
                  }}>{match.homeTeam}</span>
                  <span className="text-[12px] font-black truncate" style={{
                    color: '#A0A89E'
                  }}>{match.awayTeam}</span>
                </div>
                {(isLive || isFinished) && match.homeScore !== undefined && <div className="flex flex-col items-center gap-0.5 flex-shrink-0">
                  <span className="text-[16px] font-black leading-none tabular-nums" style={{
                    color: '#F2EEDC'
                  }}>{match.homeScore}</span>
                  <span className="text-[16px] font-black leading-none tabular-nums" style={{
                    color: '#A0A89E'
                  }}>{match.awayScore}</span>
                </div>}
              </div>
              <div className="flex items-center gap-2 mt-1.5">
                <MapPin size={8} style={{
                  color: '#8A938C'
                }} />
                <span className="text-[8px] font-semibold truncate" style={{
                  color: '#8A938C'
                }}>{match.venue}</span>
              </div>
            </div>

            {/* Category + arrow */}
            <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
              <span className="px-1.5 py-0.5 rounded-[5px] text-[7px] font-black uppercase" style={{
                background: match.category === 'Élite' ? 'rgba(183,255,26,0.07)' : 'rgba(255,255,255,0.05)',
                color: match.category === 'Élite' ? '#B7FF1A' : '#8A938C',
                border: `1px solid ${match.category === 'Élite' ? 'rgba(183,255,26,0.12)' : 'rgba(255,255,255,0.07)'}`
              }}>
                {match.category}
              </span>
              <ChevronRight size={12} style={{
                color: '#556A61'
              }} />
            </div>
          </motion.article>;
        })}
      </div>
    </section>

    {/* ── CLASSEMENT GÉNÉRAL ── */}
    <section className="px-5 mb-7">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-[10px] font-black uppercase tracking-[0.2em]" style={{
            color: '#8A938C'
          }}>Classement Général</h2>
          <p className="text-[8px] font-semibold mt-0.5" style={{
            color: 'rgba(138,147,140,0.6)'
          }}>Élite · Summer Cup – Saison 3</p>
        </div>
        <button onClick={() => onNav('rankings')} className="flex items-center gap-0.5 text-[11px] font-black" style={{
          color: '#B7FF1A'
        }}>
          <span>Complet</span>
          <ArrowUpRight size={13} />
        </button>
      </div>

      <div className="rounded-[22px] overflow-hidden" style={{
        background: '#0F2B23',
        border: '1px solid rgba(255,255,255,0.06)'
      }}>
        {/* Header row */}
        <div className="flex items-center px-4 py-2.5" style={{
          borderBottom: '1px solid rgba(255,255,255,0.05)'
        }}>
          <div style={{
            width: 28,
            marginRight: 10,
            flexShrink: 0
          }} />
          <div style={{
            width: 32,
            marginRight: 12,
            flexShrink: 0
          }} />
          <span className="flex-1 text-[8px] font-black uppercase tracking-wider" style={{
            color: '#556A61'
          }}>Équipe</span>
          <div className="flex items-center" style={{
            gap: 0,
            marginRight: 8,
            width: 54,
            flexShrink: 0
          }}>
            <span className="text-[7px] font-black uppercase tracking-wider text-center tabular-nums" style={{
              color: '#35D07F',
              width: 18
            }}>V</span>
            <span className="text-[7px] font-black uppercase tracking-wider text-center tabular-nums" style={{
              color: '#8A938C',
              width: 18
            }}>N</span>
            <span className="text-[7px] font-black uppercase tracking-wider text-center tabular-nums" style={{
              color: '#D94B5B',
              width: 18
            }}>D</span>
          </div>
          <div className="flex items-center" style={{
            gap: 4,
            marginRight: 8,
            width: 44,
            flexShrink: 0
          }}>
            <span className="text-[7px] font-black uppercase text-center tabular-nums" style={{
              color: '#B7FF1A',
              width: 20
            }}>BP</span>
            <span className="text-[7px] font-black uppercase text-center tabular-nums" style={{
              color: '#D94B5B',
              width: 20
            }}>BC</span>
          </div>
          <div style={{
            width: 36,
            flexShrink: 0
          }}>
            <span className="text-[7px] font-black uppercase tracking-wider" style={{
              color: '#8A938C'
            }}>Pts</span>
          </div>
        </div>

        {TEAM_STATS.slice(0, 3).map((team, i) => <motion.button key={team.abbr} whileTap={{
          scale: 0.98
        }} onClick={() => onNav('teams')} className="flex items-center w-full px-4 py-3.5" style={{
          borderBottom: i < 2 ? '1px solid rgba(255,255,255,0.04)' : 'none'
        }}>
          {/* Rank */}
          <div style={{
            width: 28,
            marginRight: 10,
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            {i === 0 ? <Crown size={12} style={{
              color: '#B7FF1A'
            }} /> : <span className="text-[11px] font-black" style={{
              color: i === 1 ? '#C9C1A2' : '#8A938C'
            }}>{team.rank}</span>}
          </div>
          {/* Logo */}
          <div style={{
            width: 32,
            height: 32,
            borderRadius: 10,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: 12,
            flexShrink: 0,
            background: 'rgba(46,143,87,0.1)',
            border: '1px solid rgba(46,143,87,0.15)'
          }}>
            <Shield size={13} style={{
              color: '#2E8F57'
            }} />
          </div>
          {/* Name */}
          <span className="flex-1 text-[12px] font-black text-left" style={{
            color: '#F2EEDC'
          }}>{team.name}</span>
          {/* W/D/L */}
          <div className="flex items-center" style={{
            gap: 0,
            marginRight: 8,
            width: 54,
            flexShrink: 0
          }}>
            <span className="text-[11px] font-black text-center tabular-nums" style={{
              color: '#35D07F',
              width: 18
            }}>{team.wins}</span>
            <span className="text-[11px] font-black text-center tabular-nums" style={{
              color: '#8A938C',
              width: 18
            }}>{team.draws}</span>
            <span className="text-[11px] font-black text-center tabular-nums" style={{
              color: '#D94B5B',
              width: 18
            }}>{team.losses}</span>
          </div>
          {/* Goals for / against */}
          <div className="flex items-center" style={{
            gap: 4,
            marginRight: 8,
            width: 44,
            flexShrink: 0
          }}>
            <span className="text-[11px] font-black text-center tabular-nums" style={{
              color: '#B7FF1A',
              width: 20
            }}>{team.goals}</span>
            <span className="text-[11px] font-black text-center tabular-nums" style={{
              color: '#D94B5B',
              width: 20
            }}>{team.goalsAgainst}</span>
          </div>
          {/* Points */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 36,
            padding: '4px 0',
            borderRadius: 8,
            background: i === 0 ? 'rgba(183,255,26,0.1)' : 'rgba(255,255,255,0.04)',
            border: i === 0 ? '1px solid rgba(183,255,26,0.2)' : '1px solid rgba(255,255,255,0.06)',
            flexShrink: 0
          }}>
            <span className="text-[13px] font-black tabular-nums" style={{
              color: i === 0 ? '#B7FF1A' : '#F2EEDC'
            }}>{team.points}</span>
          </div>
        </motion.button>)}
      </div>
    </section>

    {/* ── TOP BUTEUR ── */}
    <section className="px-5 mb-7">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-[10px] font-black uppercase tracking-[0.2em]" style={{
          color: '#8A938C'
        }}>Top Buteur – Saison 3</h2>
        <button onClick={() => onNav('players')} className="flex items-center gap-0.5 text-[11px] font-black" style={{
          color: '#B7FF1A'
        }}>
          <span>Tous les buteurs</span>
          <ArrowUpRight size={13} />
        </button>
      </div>
      <motion.button whileTap={{
        scale: 0.98
      }} onClick={() => onNav('profile')} className="w-full flex items-center gap-4 p-4 rounded-[22px]" style={{
        background: 'linear-gradient(135deg, #183C31 0%, #0F2B23 100%)',
        border: '1px solid rgba(201,193,162,0.1)'
      }}>
        <div className="relative flex-shrink-0">
          <div className="w-16 h-16 rounded-[18px] overflow-hidden" style={{
            border: '2px solid rgba(201,193,162,0.3)'
          }}>
            <img src={PLAYERS[0].img} alt={`Portrait de ${PLAYERS[0].name}, meilleur buteur`} className="w-full h-full object-cover" />
          </div>
          <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-[6px] flex items-center justify-center" style={{
            background: '#C9C1A2'
          }}>
            <Star size={9} fill="#0B221C" style={{
              color: '#0B221C'
            }} />
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[8px] font-black uppercase tracking-[0.15em] mb-0.5" style={{
            color: 'rgba(201,193,162,0.55)'
          }}>
            Meilleur Buteur · Saison 3
          </p>
          <h3 className="text-[15px] font-black tracking-tight leading-none" style={{
            color: '#F2EEDC'
          }}>
            {PLAYERS[0].name}
          </h3>
          <p className="text-[10px] font-semibold mt-0.5" style={{
            color: '#8A938C'
          }}>
            {PLAYERS[0].team} · {PLAYERS[0].position}
          </p>
          <div className="flex items-center gap-3 mt-2">
            <div className="flex items-center gap-1">
              <Activity size={9} style={{
                color: '#35D07F'
              }} />
              <span className="text-[10px] font-black" style={{
                color: '#8A938C'
              }}>{PLAYERS[0].assists} passes</span>
            </div>
            <div className="flex items-center gap-1">
              <Flame size={9} style={{
                color: '#F4C542'
              }} />
              <span className="text-[9px] font-semibold" style={{
                color: '#8A938C'
              }}>{(PLAYERS[0].goals / PLAYERS[0].matches).toFixed(1)} b/m</span>
            </div>
          </div>
        </div>
        {/* Big goal number */}
        <div className="flex flex-col items-end flex-shrink-0">
          <span className="text-[44px] font-black leading-none tracking-tighter" style={{
            color: '#C9C1A2'
          }}>{PLAYERS[0].goals}</span>
          <span className="text-[7px] font-black uppercase tracking-widest mt-0.5" style={{
            color: '#8A938C'
          }}>buts</span>
        </div>
      </motion.button>
    </section>

    {/* ── TCHEKS IMPACT ── */}
    <section className="px-5 mb-10">
      <motion.button whileTap={{
        scale: 0.98
      }} onClick={() => onNav('solidarity')} className="w-full flex items-start gap-4 p-5 rounded-[22px] relative overflow-hidden text-left" style={{
        background: 'linear-gradient(135deg, rgba(46,143,87,0.12) 0%, rgba(11,34,28,0.95) 100%)',
        border: '1px solid rgba(46,143,87,0.2)'
      }}>
        <div className="w-12 h-12 rounded-[15px] flex items-center justify-center flex-shrink-0" style={{
          background: '#2E8F57',
          boxShadow: '0 6px 20px rgba(46,143,87,0.3)'
        }}>
          <Heart size={20} fill="#F2EEDC" style={{
            color: '#F2EEDC'
          }} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-0.5">
            <h3 className="text-[14px] font-black leading-none" style={{
              color: '#F2EEDC'
            }}>Tcheks Impact</h3>
            <span className="text-[18px] font-black leading-none" style={{
              color: '#B7FF1A'
            }}>85%</span>
          </div>
          <p className="text-[10px] font-semibold mb-2" style={{
            color: '#B7FF1A'
          }}>
            Rénovation Playground – Marquisats
          </p>
          <p className="text-[9px] leading-relaxed mb-3" style={{
            color: 'rgba(138,147,140,0.75)'
          }}>
            Projet communautaire financé par la communauté Tcheksplay. Objectif : rénover le terrain des Marquisats avant fin juillet.
          </p>
          <div className="flex items-center justify-between">
            <span className="text-[9px] font-semibold" style={{
              color: 'rgba(138,147,140,0.6)'
            }}>
              100% atteint avant fin juillet
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-[10px] text-[9px] font-black uppercase" style={{
              background: '#B7FF1A',
              color: '#0B221C'
            }}>
              <Zap size={9} />
              <span>Soutenir le projet</span>
            </span>
          </div>
        </div>
      </motion.button>
    </section>
  </div>;
};

// ─── TcheksplayDashboard ──────────────────────────────────────────────────────

export const TcheksplayDashboard = () => {
  const [activeTab, setActiveTab] = useState<NavItem | 'more'>('home');
  const [isLoading, setIsLoading] = useState(true);
  const [matchDetailId, setMatchDetailId] = useState<string>('m1');
  const [inputFocused, setInputFocused] = useState(false);
  const [currentUser, setCurrentUser] = useState<AppUser | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 1100);
    return () => clearTimeout(t);
  }, []);
  const handleLogin = (user: AppUser) => {
    setCurrentUser(user);
    setIsAuthenticated(true);
    setActiveTab('home');
  };
  const handleLogout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    setActiveTab('home');
  };
  const isFullScreen = activeTab === 'liveMatch' || activeTab === 'matchDetail' || activeTab === 'admin';
  const showBottomNav = !isFullScreen && !inputFocused;
  const handleNav = (id: NavItem | 'more', matchId?: string) => {
    if (id === 'matchDetail' && matchId) setMatchDetailId(matchId);
    setActiveTab(id);
  };
  const handleBack = () => setActiveTab('home');
  const TITLED_SCREENS: Partial<Record<NavItem, string>> = {
    rankings: 'Classement',
    players: 'Joueurs',
    teams: 'Équipes',
    media: 'Médias',
    rewards: 'Récompenses',
    solidarity: 'Solidaire',
    sponsors: 'Partenaires',
    venues: 'Terrains',
    registration: 'Inscription',
    rules: 'Règlement',
    feed: 'Actualités',
    teamProfile: 'Équipe',
    profile: 'Profil',
    account: 'Compte'
  };
  const needsSubHeader = activeTab !== 'home' && activeTab !== 'more' && activeTab !== 'matches' && !isFullScreen && activeTab in TITLED_SCREENS;

  // If not authenticated, show login
  if (!isAuthenticated && !isLoading) {
    return <div className="min-h-screen w-full font-sans overflow-x-hidden" style={{
      background: '#0B221C',
      color: '#F2EEDC'
    }}>
        <LoginScreen onLogin={handleLogin} />
      </div>;
  }
  return <div className="min-h-screen w-full font-sans overflow-x-hidden pb-32" style={{
    background: '#0B221C',
    color: '#F2EEDC'
  }}>
    {/* Ambient background glow */}
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[240px] rounded-full" style={{
        opacity: 0.18,
        background: 'radial-gradient(ellipse, rgba(46,143,87,0.5) 0%, transparent 70%)'
      }} />
    </div>

    {/* Sub-screen back header */}
    {needsSubHeader && <header className="flex items-center gap-3 px-5 pt-12 pb-4">
      <button onClick={handleBack} className="flex items-center gap-1.5 px-3 py-2 rounded-[12px]" style={{
        background: 'rgba(255,255,255,0.05)',
        color: '#8A938C'
      }} aria-label="Retour">
        <ChevronLeft size={16} />
        <span className="text-[10px] font-black uppercase tracking-wider">Retour</span>
      </button>
      <h1 className="text-[20px] font-black tracking-[-0.03em] uppercase" style={{
        color: '#F2EEDC'
      }}>
        {TITLED_SCREENS[activeTab as NavItem]}
      </h1>
    </header>}

    <main className="relative z-10">
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
          {activeTab === 'home' && <HomeScreen onNav={handleNav} user={currentUser} />}
          {activeTab === 'more' && <MoreScreen onNav={handleNav} user={currentUser} />}
          {activeTab === 'account' && currentUser && <AccountScreen user={currentUser} onLogout={handleLogout} onNav={handleNav} />}
          {activeTab === 'matches' && <EnhancedMatchesScreen onMatchDetail={id => {
            setMatchDetailId(id);
            setActiveTab('matchDetail');
          }} onLive={() => setActiveTab('liveMatch')} />}
          {activeTab === 'rankings' && <RankingsScreen />}
          {activeTab === 'players' && <PlayersSimpleScreen onNav={handleNav} />}
          {activeTab === 'teams' && <TeamsSimpleScreen onTeamProfile={() => setActiveTab('teamProfile')} />}
          {activeTab === 'media' && <MediaGalleryScreen />}
          {activeTab === 'solidarity' && <SolidarityScreen />}
          {activeTab === 'profile' && <PlayerProfile />}
          {activeTab === 'rewards' && <RewardsScreen />}
          {activeTab === 'feed' && <NewsFeedScreen onInputFocus={setInputFocused} />}
          {activeTab === 'teamProfile' && <TeamProfile onBack={() => setActiveTab('teams')} />}
          {activeTab === 'liveMatch' && <LiveMatchScreen onBack={() => setActiveTab('matches')} />}
          {activeTab === 'matchDetail' && <MatchDetailScreen matchId={matchDetailId} onBack={() => setActiveTab('matches')} onLive={() => setActiveTab('liveMatch')} />}
          {activeTab === 'sponsors' && <SponsorsScreen />}
          {activeTab === 'venues' && <VenuesScreen />}
          {activeTab === 'registration' && <RegistrationScreen />}
          {activeTab === 'rules' && <TournamentRulesScreen />}
          {activeTab === 'admin' && currentUser?.role === 'admin' && <AdminDashboard />}
        </motion.div>
      </AnimatePresence>
    </main>

    {/* Navbar */}
    <AnimatePresence>
      {showBottomNav && <motion.div key="bottom-nav" initial={{
        opacity: 1,
        y: 0
      }} exit={{
        opacity: 0,
        y: 80
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.22,
        ease: 'easeInOut'
      }}>
        <BottomNav active={activeTab} onSelect={handleNav} />
      </motion.div>}
    </AnimatePresence>

    <AnimatePresence>
      {isLoading && <SplashScreen key="splash" />}
    </AnimatePresence>
  </div>;
};

// ─── PlayersSimpleScreen ──────────────────────────────────────────────────────

const ALL_PLAYERS = [{
  id: 'p1',
  name: 'Killian Bersot',
  team: 'Annecy FC',
  position: 'Attaquant',
  goals: 17,
  assists: 8,
  matches: 18,
  img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=120&h=120',
  nationality: '🇫🇷'
}, {
  id: 'p2',
  name: 'Yassin Mebrouk',
  team: 'Veyrier Utd',
  position: 'Milieu',
  goals: 11,
  assists: 14,
  matches: 19,
  img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120',
  nationality: '🇩🇿'
}, {
  id: 'p3',
  name: 'Théo Garnier',
  team: 'Seynod City',
  position: 'Défenseur',
  goals: 3,
  assists: 6,
  matches: 20,
  img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&h=120',
  nationality: '🇫🇷'
}, {
  id: 'p4',
  name: 'Amine Touazi',
  team: 'Cran Giants',
  position: 'Gardien',
  goals: 0,
  assists: 1,
  matches: 17,
  img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=120&h=120',
  nationality: '🇲🇦'
}, {
  id: 'p5',
  name: 'Lucas Perrin',
  team: 'Poisy Stars',
  position: 'Attaquant',
  goals: 9,
  assists: 5,
  matches: 16,
  img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=120&h=120',
  nationality: '🇫🇷'
}];
const PlayersSimpleScreen = ({
  onNav
}: {
  onNav: (id: NavItem | 'more') => void;
}) => <div className="flex flex-col gap-3 px-5 pt-2 pb-4">
  {ALL_PLAYERS.map((player, i) => <motion.article key={player.id} whileTap={{
    scale: 0.98
  }} onClick={() => onNav('profile')} className="flex items-center gap-4 p-4 rounded-[20px] cursor-pointer" style={{
    background: '#0F2B23',
    border: '1px solid rgba(255,255,255,0.05)'
  }}>
    <span className="w-5 text-[11px] font-black" style={{
      color: i === 0 ? '#B7FF1A' : '#8A938C'
    }}>{i + 1}</span>
    <div className="w-12 h-12 rounded-[14px] overflow-hidden flex-shrink-0" style={{
      border: i === 0 ? '2px solid rgba(183,255,26,0.3)' : '1px solid rgba(255,255,255,0.08)'
    }}>
      <img src={player.img} alt={`Portrait de ${player.name}`} className="w-full h-full object-cover" />
    </div>
    <div className="flex-1 min-w-0">
      <div className="flex items-center gap-2">
        <h4 className="text-[13px] font-black" style={{
          color: '#F2EEDC'
        }}>{player.name}</h4>
        <span>{player.nationality}</span>
      </div>
      <p className="text-[10px] font-semibold" style={{
        color: '#8A938C'
      }}>{player.team} · {player.position}</p>
    </div>
    <div className="flex flex-col items-end gap-0.5">
      <div className="flex items-center gap-1">
        <Target size={9} style={{
          color: '#B7FF1A'
        }} />
        <span className="text-[14px] font-black" style={{
          color: '#F2EEDC'
        }}>{player.goals}</span>
      </div>
      <div className="flex items-center gap-1">
        <Activity size={9} style={{
          color: '#7BA7D9'
        }} />
        <span className="text-[10px] font-bold" style={{
          color: '#8A938C'
        }}>{player.assists} ast</span>
      </div>
    </div>
  </motion.article>)}
</div>;

// ─── TeamsSimpleScreen ────────────────────────────────────────────────────────

const ALL_TEAMS = [{
  id: 't1',
  name: 'Annecy FC',
  abbr: 'AFC',
  players: 16,
  category: 'Élite',
  wins: 14,
  img: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=200&q=80'
}, {
  id: 't2',
  name: 'Veyrier Utd',
  abbr: 'VEY',
  players: 14,
  category: 'Élite',
  wins: 12,
  img: 'https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?auto=format&fit=crop&w=200&q=80'
}, {
  id: 't3',
  name: 'Seynod City',
  abbr: 'SEY',
  players: 15,
  category: 'Élite',
  wins: 10,
  img: 'https://images.unsplash.com/photo-1551958219-acbc595d4c80?auto=format&fit=crop&w=200&q=80'
}, {
  id: 't4',
  name: 'Poisy Stars',
  abbr: 'POI',
  players: 13,
  category: 'Challenger',
  wins: 8,
  img: 'https://images.unsplash.com/photo-1517927033932-b3d18e61fb3a?auto=format&fit=crop&w=200&q=80'
}, {
  id: 't5',
  name: 'Cran Giants',
  abbr: 'CRN',
  players: 14,
  category: 'Challenger',
  wins: 7,
  img: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=200&q=80'
}, {
  id: 't6',
  name: 'Meythet FC',
  abbr: 'MEY',
  players: 12,
  category: 'Challenger',
  wins: 5,
  img: 'https://images.unsplash.com/photo-1553778263-73a83bab9b0c?auto=format&fit=crop&w=200&q=80'
}];
const TeamsSimpleScreen = ({
  onTeamProfile
}: {
  onTeamProfile: () => void;
}) => <div className="grid grid-cols-2 gap-3 px-5 pt-2 pb-4">
  {ALL_TEAMS.map(team => <motion.article key={team.id} whileTap={{
    scale: 0.97
  }} onClick={onTeamProfile} className="rounded-[22px] overflow-hidden cursor-pointer" style={{
    background: '#0F2B23',
    border: '1px solid rgba(255,255,255,0.05)'
  }}>
    <div className="h-24 relative overflow-hidden">
      <img src={team.img} alt={`Photo de l'équipe ${team.name}`} className="w-full h-full object-cover" style={{
        filter: 'brightness(0.4)'
      }} />
      <div className="absolute inset-0" style={{
        background: 'linear-gradient(to bottom, transparent 20%, rgba(15,43,35,0.96) 100%)'
      }} />
      <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-md text-[8px] font-black uppercase" style={{
        background: team.category === 'Élite' ? 'rgba(183,255,26,0.07)' : 'rgba(255,255,255,0.05)',
        color: team.category === 'Élite' ? '#B7FF1A' : '#8A938C',
        border: `1px solid ${team.category === 'Élite' ? 'rgba(183,255,26,0.12)' : 'rgba(255,255,255,0.07)'}`
      }}>
        {team.category}
      </div>
    </div>
    <div className="p-3">
      <p className="text-[9px] font-black uppercase tracking-wider mb-0.5" style={{
        color: 'rgba(183,255,26,0.6)'
      }}>{team.abbr}</p>
      <h4 className="text-[13px] font-black leading-tight" style={{
        color: '#F2EEDC'
      }}>{team.name}</h4>
      <div className="flex items-center gap-2 mt-1.5">
        <div className="flex items-center gap-1">
          <Users size={9} style={{
            color: '#8A938C'
          }} />
          <span className="text-[9px] font-bold" style={{
            color: '#8A938C'
          }}>{team.players}</span>
        </div>
        <div className="flex items-center gap-1">
          <Trophy size={9} style={{
            color: '#B7FF1A'
          }} />
          <span className="text-[9px] font-bold" style={{
            color: '#B7FF1A'
          }}>{team.wins}V</span>
        </div>
      </div>
    </div>
  </motion.article>)}
</div>;