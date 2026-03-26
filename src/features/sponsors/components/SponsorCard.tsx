import { useState } from 'react';
import { ArrowUpRight, CheckCircle, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Sponsor } from '../types';
import { TIER_META } from '../types';
import { THEME } from '@/shared/lib/constants';

interface SponsorCardProps {
  sponsor: Sponsor;
}

export function SponsorCard({ sponsor }: SponsorCardProps) {
  const [expanded, setExpanded] = useState(false);
  const tier = TIER_META[sponsor.tier];

  return (
    <motion.div
      whileTap={{ scale: 0.98 }}
      className="rounded-[22px] overflow-hidden"
      style={{ background: THEME.cardBg, border: `1px solid ${sponsor.color}15` }}
    >
      <button onClick={() => setExpanded(!expanded)} className="w-full px-4 py-4 flex items-center gap-3 text-left">
        <div
          className="w-12 h-12 rounded-[14px] flex items-center justify-center flex-shrink-0"
          style={{ background: `${sponsor.color}10`, border: `1px solid ${sponsor.color}25` }}
        >
          <span className="text-[9px] font-black tracking-wider" style={{ color: sponsor.color }}>
            {sponsor.logoPlaceholder}
          </span>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="text-[13px] font-black truncate" style={{ color: THEME.text }}>{sponsor.name}</h3>
            {sponsor.featured && <CheckCircle size={12} style={{ color: THEME.accent }} />}
          </div>
          <p className="text-[10px]" style={{ color: THEME.muted }}>{sponsor.tagline}</p>
        </div>

        <div className="flex flex-col items-end gap-1 flex-shrink-0">
          <span
            className="text-[7px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded-md"
            style={{ background: `${tier.color}12`, color: tier.color }}
          >
            {tier.emoji} {tier.label}
          </span>
          <ChevronDown
            size={12}
            className="transition-transform"
            style={{ color: THEME.muted, transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)' }}
          />
        </div>
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 border-t" style={{ borderColor: 'rgba(255,255,255,0.04)' }}>
              <p className="text-[11px] leading-relaxed mt-3" style={{ color: 'rgba(215,219,200,0.6)' }}>
                {sponsor.description}
              </p>
              <div className="flex items-center gap-3 mt-3">
                <span className="text-[9px]" style={{ color: THEME.muted }}>{sponsor.category} · Depuis {sponsor.since}</span>
                {sponsor.url !== '#' && (
                  <a
                    href={sponsor.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-[9px] font-bold"
                    style={{ color: sponsor.color }}
                  >
                    Site <ArrowUpRight size={10} />
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
