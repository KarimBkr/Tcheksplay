import { motion } from 'framer-motion';
import { Crown, Star, Target, Award, Share2, Zap } from 'lucide-react';
import type { Trophy } from '../types';

const TROPHY_META: Record<Trophy['type'], { icon: React.ReactNode; label: string }> = {
  champion: { icon: <Crown size={14} />, label: 'Champion' },
  mvp: { icon: <Star size={14} />, label: 'MVP' },
  topscorer: { icon: <Target size={14} />, label: 'Buteur' },
  fairplay: { icon: <Award size={14} />, label: 'Fair-play' },
};

export function PlayerTrophiesTab({ trophies }: { trophies: Trophy[] }) {
  const mvpCount = trophies.filter((t) => t.type === 'mvp').length;

  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-[24px] p-5 flex items-center gap-4 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, rgba(201,193,162,0.08) 0%, rgba(11,34,28,0.98) 100%)', border: '1px solid rgba(201,193,162,0.15)' }}>
        <div className="absolute right-4 top-0 w-28 h-28 rounded-full" style={{ background: 'radial-gradient(ellipse, rgba(201,193,162,0.08) 0%, transparent 70%)', filter: 'blur(20px)' }} />
        <div className="w-16 h-16 rounded-[20px] flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(201,193,162,0.1)', border: '1px solid rgba(201,193,162,0.22)' }}>
          <Crown size={28} style={{ color: '#C9C1A2' }} />
        </div>
        <div className="flex-1">
          <p className="text-[9px] font-black uppercase tracking-[0.22em]" style={{ color: '#8A938C' }}>Palmarès complet</p>
          <p className="text-[26px] font-black leading-none tracking-tight mt-0.5" style={{ color: '#F2EEDC' }}>{trophies.length}</p>
          <p className="text-[10px] font-semibold" style={{ color: '#8A938C' }}>distinctions · {mvpCount}× MVP</p>
        </div>
      </div>

      {trophies.map((trophy, i) => {
        const meta = TROPHY_META[trophy.type];
        return (
          <motion.div key={trophy.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }} className="flex items-center gap-4 px-4 py-4 rounded-[20px]" style={{ background: '#123129', border: `1px solid ${trophy.color}18` }}>
            <div className="w-12 h-12 rounded-[16px] flex items-center justify-center flex-shrink-0" style={{ background: `${trophy.color}12`, border: `1.5px solid ${trophy.color}30`, boxShadow: `0 4px 16px ${trophy.color}12`, color: trophy.color }}>
              {meta.icon}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[14px] font-black leading-none" style={{ color: '#F2EEDC' }}>{trophy.title}</p>
              <p className="text-[10px] font-semibold mt-1" style={{ color: '#8A938C' }}>{trophy.edition}</p>
            </div>
            <div className="flex flex-col items-end gap-0.5">
              <span className="px-2 py-0.5 rounded-[7px] text-[8px] font-black uppercase tracking-wide" style={{ background: `${trophy.color}14`, color: trophy.color, border: `1px solid ${trophy.color}28` }}>{meta.label}</span>
              <span className="text-[9px] font-semibold" style={{ color: '#8A938C' }}>{trophy.year}</span>
            </div>
          </motion.div>
        );
      })}

      <div className="rounded-[20px] px-4 py-4 flex items-center justify-between" style={{ background: 'rgba(183,255,26,0.05)', border: '1px solid rgba(183,255,26,0.12)' }}>
        <div className="flex items-center gap-3">
          <Zap size={16} style={{ color: '#B7FF1A' }} />
          <div>
            <p className="text-[11px] font-black" style={{ color: '#F2EEDC' }}>Partage ton palmarès</p>
            <p className="text-[9px] font-semibold" style={{ color: '#8A938C' }}>Montre qui tu es sur le terrain</p>
          </div>
        </div>
        <button className="flex items-center gap-1.5 px-3.5 py-2 rounded-[12px] text-[10px] font-black uppercase tracking-wider flex-shrink-0" style={{ background: '#B7FF1A', color: '#0B221C' }} aria-label="Partager le palmarès">
          <Share2 size={11} />
          <span>Partager</span>
        </button>
      </div>
    </div>
  );
}
