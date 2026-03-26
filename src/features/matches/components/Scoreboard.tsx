import { Shield, MapPin, Calendar, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

interface ScoreboardProps {
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  time: string;
  status: 'live' | 'upcoming' | 'finished';
  venue: string;
  category: string;
  minute?: number;
}

export function Scoreboard({ homeTeam, awayTeam, homeScore, awayScore, time, status, venue, category, minute }: ScoreboardProps) {
  const isLive = status === 'live';

  return (
    <div className="relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #0F2B23 0%, #0B221C 100%)' }}>
      <div className="absolute inset-0" style={{ opacity: 0.025, backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 28px, rgba(255,255,255,1) 28px, rgba(255,255,255,1) 29px), repeating-linear-gradient(90deg, transparent, transparent 28px, rgba(255,255,255,1) 28px, rgba(255,255,255,1) 29px)' }} />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-40 rounded-full" style={{ background: `radial-gradient(ellipse, ${isLive ? 'rgba(142,43,54,0.35)' : 'rgba(46,143,87,0.2)'} 0%, transparent 70%)`, filter: 'blur(32px)' }} />

      <div className="relative z-10 px-5 mb-3 flex items-center gap-2">
        <span className="text-[9px] font-black uppercase tracking-[0.2em] px-2.5 py-1 rounded-lg" style={{ background: 'rgba(201,193,162,0.08)', color: '#C9C1A2', border: '1px solid rgba(201,193,162,0.12)' }}>
          {category} · Summer Cup S3
        </span>
        <div className="flex items-center gap-1">
          <MapPin size={8} style={{ color: '#8A938C' }} />
          <span className="text-[9px] font-semibold" style={{ color: '#8A938C' }}>{venue}</span>
        </div>
      </div>

      <div className="relative z-10 px-5 pb-6">
        <div className="flex items-center justify-between">
          <div className="flex flex-col items-center gap-3 flex-1">
            <div className="w-16 h-16 rounded-[22px] flex items-center justify-center" style={{ background: 'rgba(46,143,87,0.18)', border: '1.5px solid rgba(46,143,87,0.35)' }}>
              <Shield size={26} style={{ color: '#2E8F57' }} />
            </div>
            <div className="text-center">
              <p className="text-[15px] font-black leading-none" style={{ color: '#F2EEDC' }}>{homeTeam}</p>
              <p className="text-[9px] font-bold mt-0.5 uppercase tracking-wide" style={{ color: '#2E8F57' }}>Domicile</p>
            </div>
          </div>

          <div className="flex flex-col items-center gap-1.5 px-2">
            <motion.div key={`${homeScore}-${awayScore}`} initial={{ scale: 1.1 }} animate={{ scale: 1 }} transition={{ duration: 0.3 }} className="flex items-center gap-2">
              <span className="text-[64px] font-black tracking-[-0.06em] leading-none tabular-nums" style={{ color: '#F2EEDC' }}>{homeScore}</span>
              <span className="text-[28px] font-black" style={{ color: '#8A938C' }}>–</span>
              <span className="text-[64px] font-black tracking-[-0.06em] leading-none tabular-nums" style={{ color: '#D7DBC8' }}>{awayScore}</span>
            </motion.div>
            <div className="w-24 h-1 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.07)' }}>
              <motion.div
                initial={{ width: '0%' }}
                animate={{ width: isLive && minute ? `${Math.min(minute / 90 * 100, 100)}%` : '100%' }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className="h-full rounded-full"
                style={{ background: 'linear-gradient(90deg, #2E8F57, #B7FF1A)' }}
              />
            </div>
            <span className="text-[8px] font-black uppercase tracking-widest" style={{ color: '#8A938C' }}>
              {isLive ? (minute && minute < 45 ? '1ère mi-temps' : '2ème mi-temps') : 'Temps Plein'}
            </span>
            {!isLive && (
              <div className="flex items-center gap-1.5 mt-1">
                <Calendar size={8} style={{ color: '#8A938C' }} />
                <span className="text-[8px] font-semibold" style={{ color: '#8A938C' }}>Hier · 19:00</span>
              </div>
            )}
            {isLive && minute != null && (
              <div className="flex items-center gap-1 px-2.5 py-1.5 rounded-[10px] mt-1" style={{ background: 'rgba(183,255,26,0.1)', border: '1px solid rgba(183,255,26,0.2)' }}>
                <Clock size={9} style={{ color: '#B7FF1A' }} />
                <span className="text-[11px] font-black" style={{ color: '#B7FF1A' }}>{minute}'</span>
              </div>
            )}
          </div>

          <div className="flex flex-col items-center gap-3 flex-1">
            <div className="w-16 h-16 rounded-[22px] flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.05)', border: '1.5px solid rgba(255,255,255,0.1)' }}>
              <Shield size={26} style={{ color: '#8A938C' }} />
            </div>
            <div className="text-center">
              <p className="text-[15px] font-black leading-none" style={{ color: '#D7DBC8' }}>{awayTeam}</p>
              <p className="text-[9px] font-bold mt-0.5 uppercase tracking-wide" style={{ color: '#8A938C' }}>Extérieur</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
