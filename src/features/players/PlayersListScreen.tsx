import { useNavigate } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import { Target, Activity, ChevronRight } from 'lucide-react';
import { usePlayersListData } from './hooks/usePlayersListData';

export function PlayersListScreen() {
  const navigate = useNavigate();
  const { players, loading } = usePlayersListData();

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
        <h1 className="text-[28px] font-black tracking-tight uppercase">Joueurs</h1>
      </div>

      <div className="px-5 flex flex-col gap-2.5">
        {players.map((player, i) => (
          <motion.button
            key={player.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            onClick={() => navigate({ to: '/players/$playerId', params: { playerId: player.id } })}
            className="flex items-center gap-3 px-4 py-3.5 rounded-[18px] w-full text-left transition-all"
            style={{ background: '#123129', border: '1px solid rgba(255,255,255,0.06)' }}
          >
            <span className="w-6 text-[13px] font-black tabular-nums text-center flex-shrink-0" style={{ color: i < 3 ? '#B7FF1A' : '#8A938C' }}>
              {i + 1}
            </span>
            <div className="w-11 h-11 rounded-[14px] overflow-hidden flex-shrink-0" style={{ border: '1.5px solid rgba(255,255,255,0.08)' }}>
              <img src={player.img} alt={player.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[14px] font-black truncate" style={{ color: '#F2EEDC' }}>{player.name}</p>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-[9px] font-bold" style={{ color: '#8A938C' }}>{player.team}</span>
                <span className="px-1.5 py-0.5 rounded-md text-[7px] font-black uppercase" style={{ background: 'rgba(255,255,255,0.05)', color: '#8A938C', border: '1px solid rgba(255,255,255,0.07)' }}>{player.position}</span>
              </div>
            </div>
            <div className="flex items-center gap-3 flex-shrink-0">
              <div className="flex items-center gap-1">
                <Target size={9} style={{ color: '#B7FF1A' }} />
                <span className="text-[12px] font-black tabular-nums" style={{ color: '#F2EEDC' }}>{player.goals}</span>
              </div>
              <div className="flex items-center gap-1">
                <Activity size={9} style={{ color: '#35D07F' }} />
                <span className="text-[12px] font-black tabular-nums" style={{ color: '#F2EEDC' }}>{player.assists}</span>
              </div>
              <ChevronRight size={14} style={{ color: 'rgba(255,255,255,0.15)' }} />
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
