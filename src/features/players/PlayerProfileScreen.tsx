import { useState } from 'react';
import { useNavigate, useParams } from '@tanstack/react-router';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, Share2, MapPin, Shield, Star, Target, Activity, Calendar, BarChart3, Trophy, TrendingUp } from 'lucide-react';
import { usePlayerData } from './hooks/usePlayerData';
import { PlayerStatsTab } from './components/PlayerStatsTab';
import { PlayerTrophiesTab } from './components/PlayerTrophiesTab';
import { PlayerCareerTab } from './components/PlayerCareerTab';
import type { ProfileTab } from './types';

const PROFILE_TABS: { id: ProfileTab; label: string; icon: React.ReactNode }[] = [
  { id: 'stats', label: 'Stats', icon: <BarChart3 size={12} /> },
  { id: 'trophes', label: 'Trophées', icon: <Trophy size={12} /> },
  { id: 'parcours', label: 'Parcours', icon: <TrendingUp size={12} /> },
];

export function PlayerProfileScreen() {
  const navigate = useNavigate();
  const { playerId } = useParams({ strict: false });
  const { player, loading } = usePlayerData(playerId ?? 'p1');
  const [activeTab, setActiveTab] = useState<ProfileTab>('stats');

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]" style={{ background: '#0B221C' }}>
        <div className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin" style={{ borderColor: '#2E8F57', borderTopColor: 'transparent' }} />
      </div>
    );
  }

  const filteredStats = player.seasonStats;
  const totalGoals = filteredStats.reduce((a, s) => a + s.goals, 0);
  const totalAssists = filteredStats.reduce((a, s) => a + s.assists, 0);
  const mvpCount = filteredStats.filter((s) => s.mvp).length;

  return (
    <div className="min-h-screen w-full overflow-x-hidden pb-32" style={{ background: '#0B221C', color: '#F2EEDC' }}>
      <div className="relative overflow-hidden" style={{ minHeight: 340 }}>
        <div className="absolute inset-0">
          <img src={player.img} alt={`${player.firstName} ${player.lastName}`} className="w-full h-full object-cover object-top" style={{ filter: 'brightness(0.28) saturate(0.6)' }} />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(11,34,28,0.25) 0%, rgba(11,34,28,0.6) 50%, rgba(11,34,28,1) 100%)' }} />
        </div>

        <div className="relative z-10 flex items-center justify-between px-5 pt-12 pb-4">
          <button onClick={() => navigate({ to: '/players' })} className="flex items-center gap-1.5 px-3 py-2 rounded-[12px]" style={{ background: 'rgba(255,255,255,0.05)', color: '#8A938C' }} aria-label="Retour">
            <ChevronLeft size={16} />
            <span className="text-[10px] font-black uppercase tracking-wider">Retour</span>
          </button>
          <button className="flex items-center gap-1.5 px-3 py-2 rounded-[12px]" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', color: '#8A938C' }} aria-label="Partager">
            <Share2 size={14} />
          </button>
        </div>

        <div className="relative z-10 px-5 pb-8 flex gap-5 items-end">
          <div className="relative flex-shrink-0">
            <div className="w-[88px] h-[88px] rounded-[26px] overflow-hidden" style={{ border: '2.5px solid rgba(183,255,26,0.4)', boxShadow: '0 0 28px rgba(183,255,26,0.12)' }}>
              <img src={player.img} alt={`${player.firstName} ${player.lastName}`} className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-2 -right-2 w-9 h-9 rounded-[12px] flex items-center justify-center" style={{ background: 'linear-gradient(145deg, #2E8F57, #123129)', border: '2px solid #0B221C' }}>
              <span className="text-[14px] font-black" style={{ color: '#B7FF1A' }}>{player.number}</span>
            </div>
          </div>
          <div className="flex-1 min-w-0 pb-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 rounded-md text-[8px] font-black uppercase tracking-wider" style={{ background: `${player.currentTeamColor}20`, border: `1px solid ${player.currentTeamColor}35`, color: player.currentTeamColor }}>{player.positionShort}</span>
              <span className="px-2 py-0.5 rounded-md text-[8px] font-black uppercase tracking-wider" style={{ background: 'rgba(183,255,26,0.08)', border: '1px solid rgba(183,255,26,0.15)', color: '#B7FF1A' }}>{player.nationalityFlag}</span>
            </div>
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] mb-0.5" style={{ color: 'rgba(215,219,200,0.45)' }}>{player.firstName}</p>
            <h1 className="text-[30px] font-black tracking-[-0.04em] leading-none uppercase" style={{ color: '#F2EEDC' }}>{player.lastName}</h1>
            <div className="flex items-center gap-1.5 mt-2">
              <MapPin size={9} style={{ color: '#8A938C' }} />
              <span className="text-[9px] font-bold tracking-wide" style={{ color: '#8A938C' }}>{player.neighborhood}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="px-5 -mt-1 mb-6">
        <div className="rounded-[18px] px-4 py-3.5 flex items-center justify-between" style={{ background: 'linear-gradient(135deg, rgba(46,143,87,0.1) 0%, rgba(18,49,41,0.9) 100%)', border: '1px solid rgba(46,143,87,0.18)' }}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-[13px] flex items-center justify-center flex-shrink-0" style={{ background: `${player.currentTeamColor}1A`, border: `1px solid ${player.currentTeamColor}30` }}>
              <Shield size={17} style={{ color: player.currentTeamColor }} />
            </div>
            <div>
              <p className="text-[9px] font-black uppercase tracking-[0.18em]" style={{ color: '#8A938C' }}>Équipe actuelle</p>
              <p className="text-[14px] font-black" style={{ color: '#F2EEDC' }}>{player.currentTeam}</p>
            </div>
          </div>
          <p className="text-[10px] font-black" style={{ color: '#B7FF1A' }}>{player.bestLevel}</p>
        </div>
      </div>

      <div className="px-5 mb-6 flex gap-2 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
        {[{ label: `${totalGoals} buts`, color: '#B7FF1A', icon: <Target size={11} /> }, { label: `${totalAssists} passes`, color: '#35D07F', icon: <Activity size={11} /> }, { label: `${mvpCount}× MVP`, color: '#C9C1A2', icon: <Star size={11} /> }, { label: `${player.age} ans`, color: '#8A938C', icon: <Calendar size={11} /> }].map((chip) => (
          <div key={chip.label} className="flex items-center gap-1.5 px-3.5 py-2 rounded-full flex-shrink-0" style={{ background: `${chip.color}14`, border: `1px solid ${chip.color}28` }}>
            <span style={{ color: chip.color }}>{chip.icon}</span>
            <span className="text-[11px] font-black" style={{ color: chip.color }}>{chip.label}</span>
          </div>
        ))}
      </div>

      <div className="sticky top-0 z-20 flex gap-1.5 px-5 py-3 mb-5" style={{ background: 'rgba(11,34,28,0.96)', backdropFilter: 'blur(18px)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        {PROFILE_TABS.map((tab) => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)} className="flex items-center gap-1.5 px-4 py-2.5 rounded-[12px] text-[10px] font-black uppercase tracking-wide flex-1 justify-center transition-all" style={activeTab === tab.id ? { background: '#B7FF1A', color: '#0B221C' } : { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', color: '#8A938C' }}>
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }} className="px-5">
          {activeTab === 'stats' && <PlayerStatsTab stats={player.seasonStats} />}
          {activeTab === 'trophes' && <PlayerTrophiesTab trophies={player.trophies} />}
          {activeTab === 'parcours' && <PlayerCareerTab career={player.career} />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
