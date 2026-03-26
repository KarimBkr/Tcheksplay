import { useNavigate } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import { Shield, Trophy, ChevronRight } from 'lucide-react';
import { useTeamsListData } from './hooks/useTeamsListData';

export function TeamsListScreen() {
  const navigate = useNavigate();
  const { teams, loading } = useTeamsListData();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]" style={{ background: '#0B221C' }}>
        <div className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin" style={{ borderColor: '#2E8F57', borderTopColor: 'transparent' }} />
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full pb-32" style={{ background: '#0B221C', color: '#F2EEDC' }}>
      <div className="px-5 pt-14 pb-6">
        <p className="text-[9px] font-black uppercase tracking-[0.22em] mb-1" style={{ color: '#8A938C' }}>Tcheksplay</p>
        <h1 className="text-[28px] font-black tracking-tight uppercase">Équipes</h1>
      </div>

      <div className="px-5 grid grid-cols-2 gap-3">
        {teams.map((team, i) => (
          <motion.button
            key={team.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
            onClick={() => navigate({ to: '/teams/$teamId', params: { teamId: team.id } })}
            className="relative rounded-[22px] overflow-hidden text-left"
            style={{ background: '#123129', border: `1px solid ${team.primaryColor}22`, aspectRatio: '3/4' }}
          >
            <img src={team.coverImg} alt={team.name} className="absolute inset-0 w-full h-full object-cover" style={{ filter: 'brightness(0.2) saturate(0.4)' }} />
            <div className="absolute inset-0" style={{ background: `linear-gradient(180deg, ${team.primaryColor}15 0%, rgba(11,34,28,0.95) 70%)` }} />
            <div className="relative z-10 flex flex-col h-full p-4 justify-between">
              <div className="flex items-center justify-between">
                <div className="w-11 h-11 rounded-[14px] flex items-center justify-center" style={{ background: `${team.primaryColor}20`, border: `1.5px solid ${team.primaryColor}40` }}>
                  <Shield size={20} style={{ color: team.primaryColor }} />
                </div>
                <span className="px-2 py-0.5 rounded-md text-[7px] font-black uppercase" style={{ background: `${team.primaryColor}20`, color: team.primaryColor, border: `1px solid ${team.primaryColor}30` }}>{team.category}</span>
              </div>
              <div>
                <p className="text-[8px] font-bold uppercase tracking-[0.18em] mb-0.5" style={{ color: '#8A938C' }}>{team.city}</p>
                <p className="text-[16px] font-black leading-tight">{team.name}</p>
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex items-center gap-1">
                    <Trophy size={9} style={{ color: '#B7FF1A' }} />
                    <span className="text-[10px] font-black" style={{ color: '#B7FF1A' }}>{team.points} pts</span>
                  </div>
                  <span className="text-[10px] font-bold" style={{ color: '#8A938C' }}>{team.wins}V</span>
                  <ChevronRight size={11} style={{ color: 'rgba(255,255,255,0.15)' }} />
                </div>
              </div>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
