import { motion } from 'framer-motion';
import type { HallOfFameEntry } from '../types';
import { THEME } from '@/shared/lib/constants';

interface HallOfFameCardProps {
  entry: HallOfFameEntry;
}

export function HallOfFameCard({ entry }: HallOfFameCardProps) {
  return (
    <motion.div
      whileTap={{ scale: 0.98 }}
      className="relative rounded-[22px] overflow-hidden h-[180px]"
      style={{ border: `1px solid ${entry.accentColor}25` }}
    >
      <img src={entry.img} alt={entry.name} className="w-full h-full object-cover" style={{ filter: 'brightness(0.3)' }} />
      <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${THEME.bg} 10%, transparent 70%)` }} />

      <div className="absolute bottom-0 left-0 right-0 p-4">
        <span
          className="text-[8px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md"
          style={{ background: `${entry.accentColor}20`, color: entry.accentColor, border: `1px solid ${entry.accentColor}35` }}
        >
          {entry.title}
        </span>
        <h3 className="text-[16px] font-black mt-1.5" style={{ color: THEME.text }}>{entry.name}</h3>
        <div className="flex items-center justify-between mt-1">
          <span className="text-[10px]" style={{ color: THEME.muted }}>{entry.team} · {entry.season}</span>
          <div className="flex items-baseline gap-1">
            <span className="text-[18px] font-black" style={{ color: entry.accentColor }}>{entry.stat}</span>
            <span className="text-[9px] font-bold" style={{ color: THEME.muted }}>{entry.statLabel}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
