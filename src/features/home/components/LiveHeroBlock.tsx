import { useRouter } from '@tanstack/react-router';
import { Shield, Clock, MapPin, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Match } from '@/shared/types';

interface LiveHeroBlockProps {
  match: Match;
}

export function LiveHeroBlock({ match }: LiveHeroBlockProps) {
  const router = useRouter();

  return (
    <motion.button
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      onClick={() => router.navigate({ to: '/matches/live' })}
      className="w-full text-left mx-5 rounded-[24px] overflow-hidden relative"
      style={{
        background: 'linear-gradient(135deg, #1A3F33 0%, #0B221C 100%)',
        border: '1px solid rgba(183,255,26,0.15)',
        boxShadow: '0 8px 32px rgba(183,255,26,0.08)',
        width: 'calc(100% - 40px)',
      }}
    >
      <div
        className="absolute top-0 right-0 w-48 h-48 rounded-full"
        style={{
          background: 'radial-gradient(ellipse, rgba(183,255,26,0.06) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />

      <div className="relative px-5 pt-4 pb-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ background: '#FF4C5B' }}
            />
            <span
              className="text-[10px] font-black uppercase tracking-[0.2em]"
              style={{ color: '#FF4C5B' }}
            >
              En direct
            </span>
            <span
              className="px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-wider"
              style={{
                background: 'rgba(255,255,255,0.06)',
                color: '#8A938C',
              }}
            >
              {match.category}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock size={10} style={{ color: '#B7FF1A' }} />
            <span
              className="text-[11px] font-black tabular-nums"
              style={{ color: '#B7FF1A' }}
            >
              {match.time}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3 flex-1">
            <div
              className="w-12 h-12 rounded-[16px] flex items-center justify-center"
              style={{
                background: 'rgba(46,143,87,0.15)',
                border: '1.5px solid rgba(46,143,87,0.3)',
              }}
            >
              <Shield size={22} style={{ color: '#2E8F57' }} />
            </div>
            <span
              className="text-[14px] font-black uppercase tracking-wide"
              style={{ color: '#F2EEDC' }}
            >
              {match.homeTeam}
            </span>
          </div>

          <div className="flex items-center gap-3 px-4">
            <span
              className="text-[36px] font-black tabular-nums leading-none"
              style={{ color: '#F2EEDC' }}
            >
              {match.homeScore ?? 0}
            </span>
            <span
              className="text-[16px] font-black"
              style={{ color: '#8A938C' }}
            >
              —
            </span>
            <span
              className="text-[36px] font-black tabular-nums leading-none"
              style={{ color: '#F2EEDC' }}
            >
              {match.awayScore ?? 0}
            </span>
          </div>

          <div className="flex items-center gap-3 flex-1 justify-end">
            <span
              className="text-[14px] font-black uppercase tracking-wide text-right"
              style={{ color: '#F2EEDC' }}
            >
              {match.awayTeam}
            </span>
            <div
              className="w-12 h-12 rounded-[16px] flex items-center justify-center"
              style={{
                background: 'rgba(255,255,255,0.06)',
                border: '1.5px solid rgba(255,255,255,0.1)',
              }}
            >
              <Shield size={22} style={{ color: '#8A938C' }} />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <MapPin size={10} style={{ color: '#8A938C' }} />
            <span className="text-[9px] font-bold" style={{ color: '#8A938C' }}>
              {match.venue}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-[9px] font-black uppercase tracking-wider" style={{ color: '#B7FF1A' }}>Suivre</span>
            <ChevronRight size={12} style={{ color: '#B7FF1A' }} />
          </div>
        </div>
      </div>
    </motion.button>
  );
}
