import { Trophy, Star, Crown, Zap, Target, Heart, TrendingUp, Shield } from 'lucide-react';
import { motion } from 'framer-motion';
import type { BadgeAward, BadgeRarity } from '../types';
import { THEME } from '@/shared/lib/constants';

const RARITY_STYLES: Record<BadgeRarity, { bg: string; border: string; glow: string }> = {
  legendary: { bg: 'rgba(244,197,66,0.08)', border: 'rgba(244,197,66,0.3)', glow: 'rgba(244,197,66,0.15)' },
  epic: { bg: 'rgba(183,255,26,0.06)', border: 'rgba(183,255,26,0.25)', glow: 'rgba(183,255,26,0.1)' },
  rare: { bg: 'rgba(123,167,217,0.06)', border: 'rgba(123,167,217,0.25)', glow: 'rgba(123,167,217,0.1)' },
  common: { bg: 'rgba(255,255,255,0.03)', border: 'rgba(255,255,255,0.08)', glow: 'none' },
};

const RARITY_LABELS: Record<BadgeRarity, { label: string; color: string }> = {
  legendary: { label: 'Légendaire', color: THEME.yellow },
  epic: { label: 'Épique', color: THEME.accent },
  rare: { label: 'Rare', color: THEME.blue },
  common: { label: 'Commun', color: THEME.muted },
};

const ICON_MAP: Record<string, typeof Trophy> = {
  Trophy, Star, Crown, Zap, Target, Heart, TrendingUp, Shield,
};

interface BadgeCardProps {
  badge: BadgeAward;
}

export function BadgeCard({ badge }: BadgeCardProps) {
  const style = RARITY_STYLES[badge.rarity];
  const rarityInfo = RARITY_LABELS[badge.rarity];
  const Icon = ICON_MAP[badge.iconName] ?? Trophy;

  return (
    <motion.div
      whileTap={{ scale: 0.97 }}
      className="rounded-[22px] p-4 flex gap-3"
      style={{ background: style.bg, border: `1px solid ${style.border}`, boxShadow: `0 4px 20px ${style.glow}` }}
    >
      <div
        className="w-12 h-12 rounded-[14px] flex items-center justify-center flex-shrink-0"
        style={{ background: `${rarityInfo.color}15`, border: `1px solid ${rarityInfo.color}30` }}
      >
        <Icon size={20} style={{ color: rarityInfo.color }} />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h3 className="text-[12px] font-black truncate" style={{ color: THEME.text }}>{badge.title}</h3>
          <span
            className="text-[7px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded-md flex-shrink-0"
            style={{ background: `${rarityInfo.color}15`, color: rarityInfo.color }}
          >
            {rarityInfo.label}
          </span>
        </div>
        <p className="text-[10px] mt-0.5" style={{ color: THEME.muted }}>{badge.subtitle}</p>
        <div className="flex items-center gap-2 mt-2">
          <img src={badge.holderImg} alt={badge.holder} className="w-5 h-5 rounded-full object-cover" />
          <span className="text-[9px] font-bold" style={{ color: THEME.gold }}>{badge.holder}</span>
          <span className="text-[8px]" style={{ color: THEME.muted }}>· {badge.holderTeam}</span>
        </div>
      </div>
    </motion.div>
  );
}
