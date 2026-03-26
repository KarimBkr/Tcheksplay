import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Crown, Star } from 'lucide-react';
import type { PlayerRank } from '../types';
import { getRatingColor, getRatingBg } from '../types';

const PODIUM_MEDAL: Record<number, { color: string }> = {
  1: { color: '#B7FF1A' },
  2: { color: '#C9C1A2' },
  3: { color: '#CD7F32' },
};

function PlayerBadge({ type }: { type: 'top' | 'mvp' }) {
  const map = {
    top: { label: 'Top', color: '#B7FF1A', bg: 'rgba(183,255,26,0.1)', border: 'rgba(183,255,26,0.22)', icon: <Crown size={7} /> },
    mvp: { label: 'MVP', color: '#C9C1A2', bg: 'rgba(201,193,162,0.1)', border: 'rgba(201,193,162,0.22)', icon: <Star size={7} /> },
  };
  const m = map[type];
  return (
    <div className="flex items-center gap-1 px-2 py-0.5 rounded-full flex-shrink-0" style={{ background: m.bg, border: `1px solid ${m.border}` }}>
      <span style={{ color: m.color }}>{m.icon}</span>
      <span className="text-[7px] font-black uppercase tracking-wide" style={{ color: m.color }}>{m.label}</span>
    </div>
  );
}

interface PlayerListProps {
  players: PlayerRank[];
  statKey: 'goals' | 'assists' | 'cleanSheets';
  statLabel: string;
  statIcon: ReactNode;
  accentColor?: string;
  secondaryKey?: 'goalsPerMatch' | 'assistsPerMatch';
}

export function PlayerList({ players, statKey, statLabel, statIcon, accentColor = '#B7FF1A', secondaryKey }: PlayerListProps) {
  return (
    <div className="flex flex-col gap-2.5">
      <div className="flex items-center px-2 pb-2" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ width: 24 }} />
        <div style={{ width: 44 }} />
        <div className="flex-1 ml-3" />
        <div className="flex items-center gap-3 text-[8px] font-black uppercase tracking-widest" style={{ color: '#8A938C' }}>
          <span className="w-10 text-center">Note</span>
          <span className="w-12 text-center" style={{ color: accentColor }}>{statLabel}</span>
        </div>
      </div>

      {players.map((player, i) => {
        const isFirst = i === 0;
        const medal = PODIUM_MEDAL[player.rank];
        const statVal = player[statKey] ?? 0;
        const secondaryVal = secondaryKey ? player[secondaryKey] : undefined;
        return (
          <motion.article
            key={player.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className="rounded-[20px] overflow-hidden"
            style={{
              background: isFirst
                ? `linear-gradient(135deg, ${accentColor}0F 0%, rgba(18,49,41,0.98) 100%)`
                : i % 2 === 0 ? '#123129' : 'rgba(18,49,41,0.7)',
              border: isFirst ? `1px solid ${accentColor}21` : '1px solid rgba(255,255,255,0.04)',
            }}
          >
            {isFirst && <div className="h-[2px]" style={{ background: `linear-gradient(90deg, transparent, ${accentColor}80, transparent)` }} />}
            <div className="flex items-center gap-3 px-3 py-3">
              <div className="w-6 text-center flex-shrink-0">
                {isFirst
                  ? <Crown size={12} style={{ color: accentColor }} />
                  : <span className="text-[11px] font-black" style={{ color: medal?.color ?? '#556A61' }}>{player.rank}</span>}
              </div>
              <div
                className="w-10 h-10 rounded-[12px] overflow-hidden flex-shrink-0"
                style={{ border: isFirst ? `2px solid ${accentColor}59` : '1px solid rgba(255,255,255,0.08)' }}
              >
                <img src={player.img} alt={`${player.firstName} ${player.name}`} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-[12px] font-black" style={{ color: '#F2EEDC' }}>{player.firstName} {player.name}</span>
                  <span className="text-[10px]">{player.nationality}</span>
                  {player.badge && <PlayerBadge type={player.badge} />}
                </div>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: player.teamColor }} />
                  <span className="text-[9px] font-semibold" style={{ color: '#8A938C' }}>{player.team}</span>
                  {secondaryVal !== undefined && (
                    <span className="text-[9px] font-bold" style={{ color: '#8A938C' }}>· {secondaryVal} / match</span>
                  )}
                </div>
              </div>
              <div className="flex-shrink-0 w-9 h-7 rounded-[8px] flex items-center justify-center" style={{ background: getRatingBg(player.rating), border: `1px solid ${getRatingColor(player.rating)}28` }}>
                <span className="text-[11px] font-black" style={{ color: getRatingColor(player.rating) }}>{player.rating.toFixed(1)}</span>
              </div>
              <div className="flex-shrink-0 w-12 flex flex-col items-center gap-0.5">
                <div className="flex items-center gap-0.5">
                  <span style={{ color: isFirst ? accentColor : '#8A938C' }}>{statIcon}</span>
                  <span className="text-[22px] font-black leading-none tracking-tighter" style={{ color: isFirst ? accentColor : '#F2EEDC' }}>
                    {statVal}
                  </span>
                </div>
                <span className="text-[7px] font-black uppercase tracking-widest" style={{ color: '#8A938C' }}>{statLabel}</span>
              </div>
            </div>
          </motion.article>
        );
      })}
    </div>
  );
}
