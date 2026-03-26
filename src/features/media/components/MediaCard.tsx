import { PlayCircle, Eye } from 'lucide-react';
import { motion } from 'framer-motion';
import type { MediaItem } from '../types';
import { THEME } from '@/shared/lib/constants';

interface MediaCardProps {
  item: MediaItem;
}

export function MediaCard({ item }: MediaCardProps) {
  return (
    <motion.div
      whileTap={{ scale: 0.97 }}
      className="rounded-[20px] overflow-hidden cursor-pointer"
      style={{ background: THEME.cardBg, border: '1px solid rgba(255,255,255,0.06)' }}
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={item.img}
          alt={item.title}
          className="w-full h-full object-cover"
          style={{ filter: 'brightness(0.55)' }}
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to top, rgba(11,34,28,0.95) 0%, transparent 60%)' }}
        />

        {item.type === 'video' && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{ background: 'rgba(11,34,28,0.7)', backdropFilter: 'blur(8px)', border: `1px solid ${THEME.accent}40` }}
            >
              <PlayCircle size={22} style={{ color: THEME.accent }} />
            </div>
          </div>
        )}

        {item.duration && (
          <span
            className="absolute top-3 right-3 px-2 py-0.5 rounded-md text-[9px] font-black"
            style={{ background: 'rgba(11,34,28,0.75)', color: THEME.text, backdropFilter: 'blur(6px)' }}
          >
            {item.duration}
          </span>
        )}

        {item.featured && (
          <span
            className="absolute top-3 left-3 px-2 py-0.5 rounded-md text-[8px] font-black uppercase tracking-wider"
            style={{ background: `${THEME.accent}20`, color: THEME.accent, border: `1px solid ${THEME.accent}35` }}
          >
            En vedette
          </span>
        )}
      </div>

      <div className="px-4 py-3">
        <h3 className="text-[12px] font-black leading-snug line-clamp-2" style={{ color: THEME.text }}>
          {item.title}
        </h3>
        <div className="flex items-center gap-2 mt-1.5">
          {item.matchLabel && (
            <span className="text-[9px] font-bold" style={{ color: THEME.muted }}>
              {item.matchLabel}
            </span>
          )}
          <div className="flex items-center gap-1">
            <Eye size={9} style={{ color: THEME.muted }} />
            <span className="text-[9px]" style={{ color: THEME.muted }}>{item.views}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
