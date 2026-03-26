import { Shield, MapPin, Clock, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from '@tanstack/react-router';

interface MatchCardProps {
  match: {
    id: string; homeTeam: string; awayTeam: string;
    homeScore?: number; awayScore?: number;
    status: 'live' | 'upcoming' | 'finished';
    time: string; venue: string; category: string; dayLabel: string;
  };
}

export function MatchCard({ match }: MatchCardProps) {
  const router = useRouter();
  const { status, category } = match;
  const isLive = status === 'live';
  const isFinished = status === 'finished';
  const isUpcoming = status === 'upcoming';
  const handlePress = () => router.navigate(isLive ? { to: '/matches/live' } : { to: '/matches/$matchId', params: { matchId: match.id } });

  return (
    <motion.article whileTap={{ scale: 0.98 }} onClick={handlePress} className="rounded-[22px] overflow-hidden cursor-pointer" style={{ background: isLive ? 'linear-gradient(150deg, #2A0D13 0%, #1A1018 100%)' : '#0F2B23', border: isLive ? '1px solid rgba(142,43,54,0.4)' : '1px solid rgba(255,255,255,0.06)' }}>
      <div className="flex items-center justify-between px-4 pt-3.5 pb-2.5" style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-[7px] text-[8px] font-black uppercase tracking-wider" style={{ background: isLive ? 'rgba(142,43,54,0.3)' : isUpcoming ? 'rgba(123,167,217,0.1)' : 'rgba(255,255,255,0.05)', color: isLive ? '#F4A5AE' : isUpcoming ? '#7BA7D9' : '#8A938C', border: `1px solid ${isLive ? 'rgba(142,43,54,0.4)' : isUpcoming ? 'rgba(123,167,217,0.18)' : 'rgba(255,255,255,0.07)'}` }}>
            {isLive && <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#B7FF1A' }} />}
            {isLive ? 'En direct' : isUpcoming ? 'À venir' : 'Terminé'}
          </span>
          {isLive && <span className="text-[10px] font-black tabular-nums" style={{ color: '#B7FF1A' }}>{match.time}</span>}
          {isUpcoming && <span className="flex items-center gap-1"><Clock size={9} style={{ color: '#7BA7D9' }} /><span className="text-[10px] font-bold tabular-nums" style={{ color: '#7BA7D9' }}>{match.time}</span></span>}
        </div>
        <span className="px-2 py-0.5 rounded-[6px] text-[8px] font-black uppercase" style={{ background: category === 'Élite' ? 'rgba(183,255,26,0.07)' : 'rgba(255,255,255,0.04)', color: category === 'Élite' ? '#B7FF1A' : '#8A938C', border: `1px solid ${category === 'Élite' ? 'rgba(183,255,26,0.12)' : 'rgba(255,255,255,0.07)'}` }}>{category}</span>
      </div>

      <div className="flex items-center gap-3 px-4 py-3.5">
        <div className="flex items-center gap-2.5 flex-1 min-w-0">
          <div className="w-9 h-9 rounded-[11px] flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(46,143,87,0.12)', border: '1px solid rgba(46,143,87,0.2)' }}><Shield size={14} style={{ color: '#2E8F57' }} /></div>
          <span className="text-[13px] font-black truncate" style={{ color: '#F2EEDC' }}>{match.homeTeam}</span>
        </div>
        <div className="flex-shrink-0 flex flex-col items-center gap-0.5">
          {(isLive || isFinished) && match.homeScore !== undefined
            ? <span className="text-[22px] font-black tracking-[-0.04em] tabular-nums leading-none" style={{ color: '#F2EEDC' }}>{match.homeScore}<span style={{ color: 'rgba(255,255,255,0.2)', margin: '0 2px' }}>–</span>{match.awayScore}</span>
            : <span className="text-[18px] font-black" style={{ color: 'rgba(255,255,255,0.2)' }}>–</span>}
          {isFinished && <span className="text-[7px] font-black uppercase tracking-widest" style={{ color: '#8A938C' }}>Terminé</span>}
        </div>
        <div className="flex items-center justify-end gap-2.5 flex-1 min-w-0">
          <span className="text-[13px] font-black truncate text-right" style={{ color: '#D7DBC8' }}>{match.awayTeam}</span>
          <div className="w-9 h-9 rounded-[11px] flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}><Shield size={14} style={{ color: '#8A938C' }} /></div>
        </div>
      </div>

      <div className="flex items-center justify-between px-4 pb-3.5 pt-0.5">
        <div className="flex items-center gap-1.5"><MapPin size={9} style={{ color: '#556A61' }} /><span className="text-[9px] font-semibold truncate" style={{ color: '#556A61', maxWidth: 160 }}>{match.venue}</span></div>
        <div className="flex items-center gap-1" style={{ color: '#8A938C' }}><span className="text-[9px] font-black">{isLive ? 'Voir le live' : 'Détail'}</span><ChevronRight size={10} /></div>
      </div>
    </motion.article>
  );
}
