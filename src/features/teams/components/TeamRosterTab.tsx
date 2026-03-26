import { motion } from 'framer-motion';
import { Target, Activity, Crown } from 'lucide-react';
import type { RosterPlayer } from '../types';

const POSITION_ORDER = ['GK', 'DEF', 'MIL', 'ATT'];

function getRatingColor(r: number): string {
  if (r >= 8.5) return '#B7FF1A';
  if (r >= 7.5) return '#35D07F';
  if (r >= 6.5) return '#F4C542';
  return '#FF8C42';
}

function getRatingBg(r: number): string {
  if (r >= 8.5) return 'rgba(183,255,26,0.14)';
  if (r >= 7.5) return 'rgba(53,208,127,0.14)';
  if (r >= 6.5) return 'rgba(244,197,66,0.14)';
  return 'rgba(255,140,66,0.14)';
}

export function TeamRosterTab({ roster }: { roster: RosterPlayer[] }) {
  const sorted = [...roster].sort(
    (a, b) => POSITION_ORDER.indexOf(a.positionShort) - POSITION_ORDER.indexOf(b.positionShort),
  );

  return (
    <div className="flex flex-col gap-2">
      {sorted.map((player, i) => (
        <motion.div key={player.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }} className="flex items-center gap-3 px-4 py-3 rounded-[18px]" style={{ background: '#123129', border: `1px solid ${player.isCaptain ? '#2E8F5725' : 'rgba(255,255,255,0.05)'}` }}>
          <span className="w-5 text-[11px] font-black tabular-nums text-center flex-shrink-0" style={{ color: '#8A938C' }}>{player.number}</span>
          <div className="relative flex-shrink-0">
            <div className="w-10 h-10 rounded-[13px] overflow-hidden" style={{ border: `1.5px solid ${player.isCaptain ? '#2E8F5760' : 'rgba(255,255,255,0.08)'}` }}>
              <img src={player.img} alt={player.name} className="w-full h-full object-cover" />
            </div>
            {player.isCaptain && (
              <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center" style={{ background: '#C9C1A2', border: '1.5px solid #0B221C' }}>
                <Crown size={8} style={{ color: '#0B221C' }} />
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <p className="text-[13px] font-black truncate" style={{ color: '#F2EEDC' }}>{player.name}</p>
              {player.isCaptain && <span className="text-[7px] font-black px-1.5 py-0.5 rounded-md flex-shrink-0" style={{ background: 'rgba(201,193,162,0.12)', color: '#C9C1A2', border: '1px solid rgba(201,193,162,0.2)' }}>CAP</span>}
            </div>
            <p className="text-[9px] font-semibold" style={{ color: '#8A938C' }}>{player.position}</p>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <div className="flex flex-col items-end gap-0.5">
              <div className="flex items-center gap-1"><Target size={8} style={{ color: '#B7FF1A' }} /><span className="text-[11px] font-black tabular-nums" style={{ color: '#F2EEDC' }}>{player.goals}</span></div>
              <div className="flex items-center gap-1"><Activity size={8} style={{ color: '#7BA7D9' }} /><span className="text-[9px] font-bold tabular-nums" style={{ color: '#8A938C' }}>{player.assists}</span></div>
            </div>
            <div className="w-9 h-8 rounded-[8px] flex items-center justify-center flex-shrink-0" style={{ background: getRatingBg(player.rating), border: `1px solid ${getRatingColor(player.rating)}30` }}>
              <span className="text-[12px] font-black tabular-nums" style={{ color: getRatingColor(player.rating) }}>{player.rating.toFixed(1)}</span>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
