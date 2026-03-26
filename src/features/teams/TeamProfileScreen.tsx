import { useState } from 'react';
import { useNavigate, useParams } from '@tanstack/react-router';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, Share2, MapPin, Shield, Trophy, Users, Target, Crown, Calendar, Camera, BarChart3 } from 'lucide-react';
import { useTeamData } from './hooks/useTeamData';
import { TeamStatsTab } from './components/TeamStatsTab';
import { TeamRosterTab } from './components/TeamRosterTab';
import { TeamMatchesTab } from './components/TeamMatchesTab';
import type { TeamTab } from './types';

const TEAM_TABS: { id: TeamTab; label: string; icon: React.ReactNode }[] = [
  { id: 'stats', label: 'Stats', icon: <BarChart3 size={12} /> },
  { id: 'roster', label: 'Effectif', icon: <Users size={12} /> },
  { id: 'matchs', label: 'Matchs', icon: <Calendar size={12} /> },
  { id: 'media', label: 'Médias', icon: <Camera size={12} /> },
];

export function TeamProfileScreen() {
  const navigate = useNavigate();
  const { teamId } = useParams({ strict: false });
  const { team, loading } = useTeamData(teamId ?? 't1');
  const [activeTab, setActiveTab] = useState<TeamTab>('stats');

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]" style={{ background: '#0B221C' }}>
        <div className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin" style={{ borderColor: '#2E8F57', borderTopColor: 'transparent' }} />
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full overflow-x-hidden pb-32" style={{ background: '#0B221C', color: '#F2EEDC' }}>
      <div className="relative overflow-hidden" style={{ minHeight: 340 }}>
        <div className="absolute inset-0">
          <img src={team.coverImg} alt={team.name} className="w-full h-full object-cover" style={{ filter: 'brightness(0.22) saturate(0.5)' }} />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(11,34,28,0.15) 0%, rgba(11,34,28,0.55) 45%, rgba(11,34,28,1) 100%)' }} />
        </div>

        <div className="relative z-10 flex items-center justify-between px-5 pt-12 pb-4">
          <button onClick={() => navigate({ to: '/teams' })} className="flex items-center gap-1.5 px-3 py-2 rounded-[12px]" style={{ background: 'rgba(255,255,255,0.05)', color: '#8A938C' }} aria-label="Retour">
            <ChevronLeft size={16} />
            <span className="text-[10px] font-black uppercase tracking-wider">Retour</span>
          </button>
          <button className="flex items-center gap-1.5 px-3 py-2 rounded-[12px]" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', color: '#8A938C' }} aria-label="Partager">
            <Share2 size={14} />
          </button>
        </div>

        <div className="relative z-10 px-5 pb-10 flex gap-5 items-end">
          <div className="relative flex-shrink-0">
            <div className="w-[88px] h-[88px] rounded-[26px] flex items-center justify-center" style={{ background: `linear-gradient(145deg, ${team.primaryColor}25, #123129)`, border: `2.5px solid ${team.primaryColor}50`, boxShadow: `0 0 32px ${team.primaryColor}18` }}>
              <Shield size={38} style={{ color: team.primaryColor }} />
            </div>
            <div className="absolute -bottom-2 -right-2 px-2 py-0.5 rounded-[9px]" style={{ background: team.secondaryColor, border: '2px solid #0B221C' }}>
              <span className="text-[10px] font-black" style={{ color: '#0B221C' }}>{team.abbr}</span>
            </div>
          </div>
          <div className="flex-1 min-w-0 pb-1">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2 py-0.5 rounded-md text-[8px] font-black uppercase tracking-wider" style={{ background: `${team.primaryColor}20`, border: `1px solid ${team.primaryColor}35`, color: team.primaryColor }}>{team.category}</span>
              <span className="px-2 py-0.5 rounded-md text-[8px] font-black uppercase tracking-wider" style={{ background: 'rgba(183,255,26,0.08)', border: '1px solid rgba(183,255,26,0.15)', color: '#B7FF1A' }}>{team.formation}</span>
            </div>
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] mb-0.5" style={{ color: 'rgba(215,219,200,0.4)' }}>{team.city}</p>
            <h1 className="text-[30px] font-black tracking-[-0.04em] leading-none uppercase" style={{ color: '#F2EEDC' }}>{team.name}</h1>
            <div className="flex items-center gap-1.5 mt-2">
              <MapPin size={9} style={{ color: '#8A938C' }} />
              <span className="text-[9px] font-bold tracking-wide" style={{ color: '#8A938C' }}>{team.neighborhood} · {team.city}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="px-5 -mt-1 mb-5">
        <div className="rounded-[18px] px-4 py-3.5 flex items-center justify-between" style={{ background: `linear-gradient(135deg, ${team.primaryColor}12 0%, rgba(18,49,41,0.9) 100%)`, border: `1px solid ${team.primaryColor}22` }}>
          <div>
            <p className="text-[8px] font-black uppercase tracking-[0.18em]" style={{ color: '#8A938C' }}>Coach</p>
            <p className="text-[13px] font-black" style={{ color: '#F2EEDC' }}>{team.coachName}</p>
          </div>
          <div className="flex flex-col items-end">
            <p className="text-[8px] font-black uppercase tracking-[0.18em]" style={{ color: '#8A938C' }}>Fondé en</p>
            <p className="text-[14px] font-black" style={{ color: team.secondaryColor }}>{team.founded}</p>
          </div>
        </div>
      </div>

      <div className="px-5 mb-5">
        <p className="text-[12px] leading-relaxed" style={{ color: 'rgba(215,219,200,0.62)' }}>{team.bio}</p>
      </div>

      <div className="px-5 mb-6 flex gap-2 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
        {[{ label: `${team.trophies.length} titres`, color: '#B7FF1A', icon: <Trophy size={11} /> }, { label: `${team.seasonStats[0]?.goalsFor ?? 0} buts S3`, color: '#35D07F', icon: <Target size={11} /> }, { label: '#1 Classement', color: '#C9C1A2', icon: <Crown size={11} /> }, { label: `${team.rosterSize} joueurs`, color: '#7BA7D9', icon: <Users size={11} /> }].map((chip) => (
          <div key={chip.label} className="flex items-center gap-1.5 px-3.5 py-2 rounded-full flex-shrink-0" style={{ background: `${chip.color}14`, border: `1px solid ${chip.color}28` }}>
            <span style={{ color: chip.color }}>{chip.icon}</span>
            <span className="text-[11px] font-black" style={{ color: chip.color }}>{chip.label}</span>
          </div>
        ))}
      </div>

      <div className="sticky top-0 z-20 flex gap-1.5 px-5 py-3 mb-6" style={{ background: 'rgba(11,34,28,0.96)', backdropFilter: 'blur(18px)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        {TEAM_TABS.map((tab) => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)} className="flex items-center gap-1.5 px-3 py-2.5 rounded-[12px] text-[10px] font-black uppercase tracking-wide flex-1 justify-center transition-all" style={activeTab === tab.id ? { background: '#B7FF1A', color: '#0B221C', boxShadow: '0 2px 12px rgba(183,255,26,0.2)' } : { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', color: '#8A938C' }}>
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }} className="px-5">
          {activeTab === 'stats' && <TeamStatsTab stats={team.seasonStats} />}
          {activeTab === 'roster' && <TeamRosterTab roster={team.roster} />}
          {activeTab === 'matchs' && <TeamMatchesTab matches={team.recentMatches} teamName={team.name} />}
          {activeTab === 'media' && (
            <div className="text-center py-12">
              <p className="text-[11px] font-black uppercase tracking-wider" style={{ color: '#8A938C' }}>Médias à venir</p>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
