import { useState } from 'react';
import { motion } from 'framer-motion';
import { Target, Shield, Star, Crown, Info } from 'lucide-react';
import type { TeamSeasonStats, SeasonFilter } from '../types';

const SEASON_FILTERS: { id: SeasonFilter; label: string }[] = [
  { id: 'all', label: 'Tout' },
  { id: 's3', label: 'S3 · 2025' },
  { id: 's2', label: 'S2 · 2024' },
  { id: 's1', label: 'S1 · 2023' },
];

const StatBar = ({ value, max, color }: { value: number; max: number; color: string }) => (
  <div className="w-full h-[3px] rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.07)' }}>
    <motion.div initial={{ width: '0%' }} animate={{ width: `${Math.min((value / max) * 100, 100)}%` }} transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }} className="h-full rounded-full" style={{ background: color }} />
  </div>
);

export function TeamStatsTab({ stats }: { stats: TeamSeasonStats[] }) {
  const [seasonFilter, setSeasonFilter] = useState<SeasonFilter>('all');
  const filtered = seasonFilter === 'all' ? stats : stats.filter((s) => s.seasonId === seasonFilter);
  const totalWins = filtered.reduce((a, s) => a + s.wins, 0);
  const totalDraws = filtered.reduce((a, s) => a + s.draws, 0);
  const totalLosses = filtered.reduce((a, s) => a + s.losses, 0);
  const totalGF = filtered.reduce((a, s) => a + s.goalsFor, 0);
  const totalGA = filtered.reduce((a, s) => a + s.goalsAgainst, 0);
  const totalMatches = filtered.reduce((a, s) => a + s.matchesPlayed, 0);
  const totalPoints = filtered.reduce((a, s) => a + s.points, 0);
  const winRate = totalMatches > 0 ? Math.round((totalWins / totalMatches) * 100) : 0;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex gap-2 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
        {SEASON_FILTERS.map((f) => (
          <button key={f.id} onClick={() => setSeasonFilter(f.id)} className="px-3.5 py-2 rounded-[12px] text-[10px] font-black uppercase tracking-wide whitespace-nowrap flex-shrink-0 transition-all" style={seasonFilter === f.id ? { background: '#B7FF1A', color: '#0B221C' } : { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', color: '#8A938C' }}>
            {f.label}
          </button>
        ))}
      </div>

      <div className="rounded-[24px] p-5" style={{ background: 'linear-gradient(135deg, #183C31 0%, #0B221C 100%)', border: '1px solid rgba(183,255,26,0.1)' }}>
        <div className="flex items-start justify-between mb-5">
          <div>
            <p className="text-[9px] font-black uppercase tracking-[0.22em]" style={{ color: '#8A938C' }}>{seasonFilter === 'all' ? 'Toutes saisons' : SEASON_FILTERS.find((f) => f.id === seasonFilter)?.label}</p>
            <div className="flex items-end gap-2 mt-1.5">
              <span className="text-[52px] font-black tracking-tighter leading-none" style={{ color: '#B7FF1A' }}>{winRate}</span>
              <div className="flex flex-col gap-0.5 pb-1.5">
                <span className="text-[10px] font-black" style={{ color: 'rgba(183,255,26,0.55)' }}>%</span>
                <span className="text-[9px] font-black uppercase tracking-wider" style={{ color: '#8A938C' }}>victoires</span>
              </div>
            </div>
            <div className="flex items-center gap-2 mt-1.5">
              <span className="text-[12px] font-black tabular-nums" style={{ color: '#35D07F' }}>{totalPoints} pts</span>
              <span className="w-1 h-1 rounded-full" style={{ background: 'rgba(255,255,255,0.15)' }} />
              <span className="text-[12px] font-black" style={{ color: '#C9C1A2' }}>#{filtered.length > 0 ? filtered[0].ranking : '—'}</span>
            </div>
          </div>
          <div className="w-16 h-16 rounded-[20px] flex items-center justify-center" style={{ background: 'rgba(183,255,26,0.08)', border: '1.5px solid rgba(183,255,26,0.18)' }}>
            <Crown size={26} style={{ color: '#B7FF1A' }} />
          </div>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {[{ l: 'Victoires', v: totalWins, c: '#35D07F' }, { l: 'Nuls', v: totalDraws, c: '#F4C542' }, { l: 'Défaites', v: totalLosses, c: '#D94B5B' }, { l: 'Matchs', v: totalMatches, c: '#7BA7D9' }].map((item) => (
            <div key={item.l} className="flex flex-col items-center gap-0.5 py-2.5 rounded-[12px]" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <span className="text-[16px] font-black leading-none" style={{ color: item.c }}>{item.v}</span>
              <span className="text-[7px] font-black uppercase tracking-[0.1em]" style={{ color: '#8A938C' }}>{item.l}</span>
            </div>
          ))}
        </div>
      </div>

      {filtered.map((stat, idx) => (
        <motion.div key={stat.seasonId} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.07 }} className="rounded-[22px] overflow-hidden" style={{ background: '#123129', border: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="flex items-center justify-between px-4 pt-4 pb-3" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
            <div className="flex items-center gap-2.5">
              <span className="text-[20px]">{stat.editionIcon}</span>
              <div>
                <p className="text-[13px] font-black leading-none" style={{ color: '#F2EEDC' }}>{stat.season}</p>
                <p className="text-[9px] font-semibold mt-0.5" style={{ color: '#8A938C' }}>{stat.edition} · {stat.matchesPlayed} matchs</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 px-2 py-1 rounded-[8px]" style={{ background: 'rgba(183,255,26,0.08)', border: '1px solid rgba(183,255,26,0.15)' }}>
                <Crown size={9} style={{ color: '#B7FF1A' }} />
                <span className="text-[9px] font-black" style={{ color: '#B7FF1A' }}>#{stat.ranking}</span>
              </div>
              <div className="px-2.5 py-1 rounded-[8px]" style={{ background: 'rgba(183,255,26,0.1)', border: '1px solid rgba(183,255,26,0.2)' }}>
                <span className="text-[13px] font-black tabular-nums" style={{ color: '#B7FF1A' }}>{stat.points}<span className="text-[8px] ml-0.5" style={{ color: '#8A938C' }}>pts</span></span>
              </div>
            </div>
          </div>
          <div className="px-4 pt-3 pb-4 flex flex-col gap-3">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-1.5"><Target size={10} style={{ color: '#35D07F' }} /><span className="text-[10px] font-black uppercase tracking-wider" style={{ color: '#8A938C' }}>Buts marqués</span></div>
                <span className="text-[15px] font-black tabular-nums" style={{ color: '#F2EEDC' }}>{stat.goalsFor}</span>
              </div>
              <StatBar value={stat.goalsFor} max={50} color="#35D07F" />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-1.5"><Shield size={10} style={{ color: '#7BA7D9' }} /><span className="text-[10px] font-black uppercase tracking-wider" style={{ color: '#8A938C' }}>Buts encaissés</span></div>
                <span className="text-[15px] font-black tabular-nums" style={{ color: '#F2EEDC' }}>{stat.goalsAgainst}</span>
              </div>
              <StatBar value={stat.goalsAgainst} max={30} color="#7BA7D9" />
            </div>
            <div className="grid grid-cols-4 gap-2 mt-1">
              {[{ l: 'V', v: stat.wins, c: '#35D07F', bg: 'rgba(53,208,127,0.06)', bd: 'rgba(53,208,127,0.12)' }, { l: 'N', v: stat.draws, c: '#F4C542', bg: 'rgba(244,197,66,0.06)', bd: 'rgba(244,197,66,0.12)' }, { l: 'D', v: stat.losses, c: '#D94B5B', bg: 'rgba(217,75,91,0.06)', bd: 'rgba(217,75,91,0.12)' }, { l: 'CS', v: stat.cleanSheets, c: '#F4C542', bg: 'rgba(244,197,66,0.06)', bd: 'rgba(244,197,66,0.12)' }].map((item) => (
                <div key={item.l} className="flex flex-col items-center gap-0.5 py-2.5 rounded-[10px]" style={{ background: item.bg, border: `1px solid ${item.bd}` }}>
                  <span className="text-[15px] font-black" style={{ color: item.c }}>{item.v}</span>
                  <span className="text-[7px] font-black uppercase tracking-[0.12em]" style={{ color: '#8A938C' }}>{item.l}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-1.5 self-end"><Info size={8} style={{ color: '#8A938C' }} /><span className="text-[8px] font-semibold" style={{ color: '#8A938C' }}>CS = Clean sheets (matchs sans encaisser)</span></div>
            <div className="rounded-[12px] overflow-hidden" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}>
              <div className="flex items-center gap-3 px-3 py-2.5" style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                <Star size={10} fill="#C9C1A2" style={{ color: '#C9C1A2', flexShrink: 0 }} />
                <span className="text-[9px] font-black uppercase tracking-wider flex-1" style={{ color: '#8A938C' }}>MVP</span>
                <span className="text-[11px] font-black" style={{ color: '#C9C1A2' }}>{stat.mvpPlayer}</span>
              </div>
              <div className="flex items-center gap-3 px-3 py-2.5">
                <Target size={10} style={{ color: '#B7FF1A', flexShrink: 0 }} />
                <span className="text-[9px] font-black uppercase tracking-wider flex-1" style={{ color: '#8A938C' }}>Top buteur</span>
                <span className="text-[11px] font-black" style={{ color: '#F2EEDC' }}>{stat.topScorer}<span className="ml-1.5 px-1.5 py-0.5 rounded-md text-[9px] font-black" style={{ background: 'rgba(183,255,26,0.1)', color: '#B7FF1A' }}>{stat.topScorerGoals} buts</span></span>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
