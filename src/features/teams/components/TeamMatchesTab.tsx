import { motion } from 'framer-motion';
import type { RecentMatch } from '../types';

const RESULT_CONFIG = {
  win: { color: '#35D07F', label: 'V' },
  draw: { color: '#F4C542', label: 'N' },
  loss: { color: '#D94B5B', label: 'D' },
} as const;

export function TeamMatchesTab({ matches, teamName }: { matches: RecentMatch[]; teamName: string }) {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: '#8A938C' }}>Résultats récents</h2>

      {matches.map((match, i) => {
        const cfg = RESULT_CONFIG[match.result];
        return (
          <motion.article key={match.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }} className="rounded-[20px] overflow-hidden" style={{ background: '#123129', border: `1px solid ${cfg.color}18` }}>
            <div className="h-[3px]" style={{ background: `linear-gradient(90deg, transparent, ${cfg.color}60, transparent)` }} />
            <div className="px-4 py-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: `${cfg.color}18`, border: `1.5px solid ${cfg.color}40` }}>
                    <span className="text-[10px] font-black" style={{ color: cfg.color }}>{cfg.label}</span>
                  </div>
                  <span className="text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md" style={{ background: 'rgba(255,255,255,0.05)', color: '#8A938C' }}>{match.edition}</span>
                  <span className="text-[9px] font-semibold" style={{ color: '#8A938C' }}>{match.isHome ? 'Domicile' : 'Extérieur'}</span>
                </div>
                <span className="text-[9px] font-bold" style={{ color: '#8A938C' }}>{match.date}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-wider" style={{ color: match.result === 'win' ? '#2E8F57' : '#8A938C' }}>{match.isHome ? teamName : match.opponent}</span>
                <div className="flex items-center gap-2">
                  <span className="text-[28px] font-black tracking-[-0.05em] leading-none" style={{ color: '#F2EEDC' }}>{match.goalsFor}</span>
                  <span className="text-[14px] font-black" style={{ color: '#8A938C' }}>—</span>
                  <span className="text-[28px] font-black tracking-[-0.05em] leading-none" style={{ color: '#F2EEDC' }}>{match.goalsAgainst}</span>
                </div>
                <span className="text-[10px] font-black uppercase tracking-wider" style={{ color: '#8A938C' }}>{match.isHome ? match.opponent : teamName}</span>
              </div>
            </div>
          </motion.article>
        );
      })}

      <div className="rounded-[18px] px-4 py-3.5 grid grid-cols-3 gap-0" style={{ background: '#123129', border: '1px solid rgba(255,255,255,0.05)' }}>
        {[{ label: 'Victoires', value: matches.filter((m) => m.result === 'win').length, color: '#35D07F' }, { label: 'Nuls', value: matches.filter((m) => m.result === 'draw').length, color: '#F4C542' }, { label: 'Défaites', value: matches.filter((m) => m.result === 'loss').length, color: '#D94B5B' }].map((item, idx) => (
          <div key={item.label} className="flex flex-col items-center gap-0.5 py-1" style={{ borderRight: idx < 2 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
            <span className="text-[22px] font-black leading-none" style={{ color: item.color }}>{item.value}</span>
            <span className="text-[7px] font-black uppercase tracking-[0.15em]" style={{ color: '#8A938C' }}>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
