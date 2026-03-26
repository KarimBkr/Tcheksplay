import { useState } from 'react';
import { motion } from 'framer-motion';
import { Target, Activity, AlertTriangle, Star } from 'lucide-react';
import type { SeasonStats, SeasonFilter } from '../types';

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

const SEASON_FILTERS: { id: SeasonFilter; label: string }[] = [
  { id: 'all', label: 'Tout' },
  { id: 's3', label: 'S3 · 2025' },
  { id: 's2', label: 'S2 · 2024' },
  { id: 's1', label: 'S1 · 2023' },
];

const StatBar = ({ value, max, color }: { value: number; max: number; color: string }) => (
  <div className="w-full h-[4px] rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.07)' }}>
    <motion.div initial={{ width: '0%' }} animate={{ width: `${Math.min((value / max) * 100, 100)}%` }} transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }} className="h-full rounded-full" style={{ background: color }} />
  </div>
);

export function PlayerStatsTab({ stats }: { stats: SeasonStats[] }) {
  const [seasonFilter, setSeasonFilter] = useState<SeasonFilter>('all');
  const filtered = seasonFilter === 'all' ? stats : stats.filter((s) => s.seasonId === seasonFilter);
  const totalGoals = filtered.reduce((a, s) => a + s.goals, 0);
  const totalAssists = filtered.reduce((a, s) => a + s.assists, 0);
  const totalMatches = filtered.reduce((a, s) => a + s.matchesPlayed, 0);
  const totalYellow = filtered.reduce((a, s) => a + s.yellowCards, 0);
  const totalRed = filtered.reduce((a, s) => a + s.redCards, 0);
  const avgRating = filtered.length > 0 ? filtered.reduce((a, s) => a + s.rating, 0) / filtered.length : 0;
  const mvpCount = filtered.filter((s) => s.mvp).length;

  return (
    <div className="flex flex-col gap-5">
      <div className="flex gap-2 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
        {SEASON_FILTERS.map((f) => (
          <button key={f.id} onClick={() => setSeasonFilter(f.id)} className="px-3.5 py-2 rounded-[12px] text-[10px] font-black uppercase tracking-wide whitespace-nowrap flex-shrink-0 transition-all" style={seasonFilter === f.id ? { background: '#B7FF1A', color: '#0B221C' } : { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', color: '#8A938C' }}>
            {f.label}
          </button>
        ))}
      </div>

      <div className="rounded-[24px] p-5" style={{ background: 'linear-gradient(135deg, #183C31 0%, #0B221C 100%)', border: '1px solid rgba(183,255,26,0.08)' }}>
        <div className="flex items-center justify-between mb-5">
          <div>
            <p className="text-[9px] font-black uppercase tracking-[0.22em]" style={{ color: '#8A938C' }}>{seasonFilter === 'all' ? 'Toutes saisons' : SEASON_FILTERS.find((f) => f.id === seasonFilter)?.label}</p>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-[36px] font-black tracking-tighter leading-none" style={{ color: getRatingColor(avgRating) }}>{avgRating.toFixed(1)}</span>
              <div className="flex flex-col gap-0.5">
                <span className="text-[9px] font-black uppercase tracking-wider" style={{ color: '#8A938C' }}>Note moy.</span>
                {mvpCount > 0 && <div className="flex items-center gap-1"><Star size={9} fill="#C9C1A2" style={{ color: '#C9C1A2' }} /><span className="text-[9px] font-black" style={{ color: '#C9C1A2' }}>{mvpCount}× MVP</span></div>}
              </div>
            </div>
          </div>
          <div className="w-16 h-16 rounded-[20px] flex items-center justify-center" style={{ background: getRatingBg(avgRating), border: `1.5px solid ${getRatingColor(avgRating)}30` }}>
            <span className="text-[22px] font-black" style={{ color: getRatingColor(avgRating) }}>{totalGoals}</span>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {[{ label: 'Buts', value: totalGoals, color: '#B7FF1A' }, { label: 'Passes', value: totalAssists, color: '#35D07F' }, { label: 'Matchs', value: totalMatches, color: '#7BA7D9' }].map((item) => (
            <div key={item.label} className="flex flex-col items-center gap-0.5 py-2.5 rounded-[12px]" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <span className="text-[16px] font-black leading-none" style={{ color: item.color }}>{item.value}</span>
              <span className="text-[7px] font-black uppercase tracking-[0.15em]" style={{ color: '#8A938C' }}>{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      {filtered.map((stat, idx) => (
        <motion.div key={stat.seasonId} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.06 }} className="rounded-[22px] overflow-hidden" style={{ background: '#123129', border: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="flex items-center justify-between px-4 pt-4 pb-3" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
            <div className="flex items-center gap-2.5">
              <span className="text-[16px]">{stat.editionIcon}</span>
              <div>
                <p className="text-[12px] font-black leading-none" style={{ color: '#F2EEDC' }}>{stat.season}</p>
                <p className="text-[9px] font-semibold mt-0.5" style={{ color: '#8A938C' }}>{stat.edition} · {stat.teamName}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {stat.mvp && <div className="flex items-center gap-1 px-2 py-1 rounded-[8px]" style={{ background: 'rgba(201,193,162,0.1)', border: '1px solid rgba(201,193,162,0.2)' }}><Star size={9} fill="#C9C1A2" style={{ color: '#C9C1A2' }} /><span className="text-[8px] font-black uppercase tracking-wide" style={{ color: '#C9C1A2' }}>MVP</span></div>}
              <div className="px-2.5 py-1 rounded-[8px]" style={{ background: getRatingBg(stat.rating), border: `1px solid ${getRatingColor(stat.rating)}30` }}>
                <span className="text-[13px] font-black tabular-nums" style={{ color: getRatingColor(stat.rating) }}>{stat.rating.toFixed(1)}</span>
              </div>
            </div>
          </div>
          <div className="px-4 pt-3 pb-4 flex flex-col gap-3">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-1.5"><Target size={10} style={{ color: '#B7FF1A' }} /><span className="text-[10px] font-black uppercase tracking-wider" style={{ color: '#8A938C' }}>Buts</span></div>
                <span className="text-[15px] font-black tabular-nums" style={{ color: '#F2EEDC' }}>{stat.goals}</span>
              </div>
              <StatBar value={stat.goals} max={20} color="#B7FF1A" />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-1.5"><Activity size={10} style={{ color: '#35D07F' }} /><span className="text-[10px] font-black uppercase tracking-wider" style={{ color: '#8A938C' }}>Passes décisives</span></div>
                <span className="text-[15px] font-black tabular-nums" style={{ color: '#F2EEDC' }}>{stat.assists}</span>
              </div>
              <StatBar value={stat.assists} max={15} color="#35D07F" />
            </div>
            <div className="grid grid-cols-3 gap-2 mt-1">
              <div className="flex flex-col items-center gap-0.5 py-2.5 rounded-[10px]" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}>
                <div className="flex items-center gap-1"><div className="w-2.5 h-3.5 rounded-[2px]" style={{ background: '#F4C542' }} /><span className="text-[14px] font-black" style={{ color: '#F2EEDC' }}>{stat.yellowCards}</span></div>
                <span className="text-[7px] font-black uppercase tracking-[0.12em]" style={{ color: '#8A938C' }}>Jaunes</span>
              </div>
              <div className="flex flex-col items-center gap-0.5 py-2.5 rounded-[10px]" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}>
                <div className="flex items-center gap-1"><div className="w-2.5 h-3.5 rounded-[2px]" style={{ background: '#D94B5B' }} /><span className="text-[14px] font-black" style={{ color: '#F2EEDC' }}>{stat.redCards}</span></div>
                <span className="text-[7px] font-black uppercase tracking-[0.12em]" style={{ color: '#8A938C' }}>Rouges</span>
              </div>
              <div className="flex flex-col items-center gap-0.5 py-2.5 rounded-[10px]" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}>
                <span className="text-[14px] font-black" style={{ color: '#F2EEDC' }}>{stat.matchesPlayed}</span>
                <span className="text-[7px] font-black uppercase tracking-[0.12em]" style={{ color: '#8A938C' }}>Matchs</span>
              </div>
            </div>
          </div>
        </motion.div>
      ))}

      {seasonFilter === 'all' && (
        <div className="rounded-[18px] px-4 py-3.5 flex items-center justify-between" style={{ background: '#123129', border: '1px solid rgba(255,255,255,0.05)' }}>
          <div className="flex items-center gap-2"><AlertTriangle size={13} style={{ color: '#8A938C' }} /><span className="text-[11px] font-black uppercase tracking-wide" style={{ color: '#8A938C' }}>Discipline totale</span></div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5"><div className="w-3 h-4 rounded-[2px]" style={{ background: '#F4C542' }} /><span className="text-[13px] font-black" style={{ color: '#F2EEDC' }}>{totalYellow}</span></div>
            <div className="flex items-center gap-1.5"><div className="w-3 h-4 rounded-[2px]" style={{ background: '#D94B5B' }} /><span className="text-[13px] font-black" style={{ color: '#F2EEDC' }}>{totalRed}</span></div>
          </div>
        </div>
      )}
    </div>
  );
}
