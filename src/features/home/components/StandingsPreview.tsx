import { useRouter } from '@tanstack/react-router';
import { Crown, Shield, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import type { TeamStat } from '@/shared/types';

interface StandingsPreviewProps {
  standings: TeamStat[];
}

const RANK_STYLES: Record<number, { color: string; bg: string; border: string }> = {
  1: { color: '#B7FF1A', bg: 'rgba(183,255,26,0.1)', border: 'rgba(183,255,26,0.2)' },
  2: { color: '#C9C1A2', bg: 'rgba(201,193,162,0.08)', border: 'rgba(201,193,162,0.15)' },
  3: { color: '#7BA7D9', bg: 'rgba(123,167,217,0.08)', border: 'rgba(123,167,217,0.15)' },
};

export function StandingsPreview({ standings }: StandingsPreviewProps) {
  const router = useRouter();
  const top3 = standings.slice(0, 3);

  return (
    <section className="px-5">
      <div className="flex items-center justify-between mb-3">
        <h2
          className="text-[10px] font-black uppercase tracking-[0.2em]"
          style={{ color: '#8A938C' }}
        >
          Classement
        </h2>
        <button
          onClick={() => router.navigate({ to: '/rankings' })}
          className="flex items-center gap-1"
        >
          <span
            className="text-[9px] font-black uppercase tracking-wider"
            style={{ color: '#B7FF1A' }}
          >
            Voir tout
          </span>
          <ArrowUpRight size={11} style={{ color: '#B7FF1A' }} />
        </button>
      </div>

      <div
        className="rounded-[20px] overflow-hidden"
        style={{ background: '#123129', border: '1px solid rgba(255,255,255,0.06)' }}
      >
        <div
          className="grid grid-cols-[auto_1fr_auto_auto_auto] gap-x-3 px-4 py-2.5"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}
        >
          <span className="text-[8px] font-black uppercase tracking-wider" style={{ color: '#8A938C' }}>#</span>
          <span className="text-[8px] font-black uppercase tracking-wider" style={{ color: '#8A938C' }}>Équipe</span>
          <span className="text-[8px] font-black uppercase tracking-wider text-right" style={{ color: '#8A938C' }}>V</span>
          <span className="text-[8px] font-black uppercase tracking-wider text-right" style={{ color: '#8A938C' }}>Diff</span>
          <span className="text-[8px] font-black uppercase tracking-wider text-right" style={{ color: '#8A938C' }}>Pts</span>
        </div>

        {top3.map((team, i) => {
          const style = RANK_STYLES[team.rank] ?? RANK_STYLES[3];
          return (
            <motion.button
              key={team.abbr}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.06 }}
              onClick={() => router.navigate({ to: '/teams' })}
              className="grid grid-cols-[auto_1fr_auto_auto_auto] gap-x-3 items-center w-full px-4 py-3 text-left"
              style={{
                borderBottom: i < top3.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
              }}
            >
              <div
                className="w-6 h-6 rounded-[8px] flex items-center justify-center"
                style={{ background: style.bg, border: `1px solid ${style.border}` }}
              >
                {team.rank === 1 ? (
                  <Crown size={11} style={{ color: style.color }} />
                ) : (
                  <span className="text-[10px] font-black" style={{ color: style.color }}>
                    {team.rank}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2 min-w-0">
                <div
                  className="w-7 h-7 rounded-[9px] flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(255,255,255,0.05)' }}
                >
                  <Shield size={13} style={{ color: '#8A938C' }} />
                </div>
                <div className="min-w-0">
                  <p className="text-[12px] font-black truncate" style={{ color: '#F2EEDC' }}>
                    {team.name}
                  </p>
                  <p className="text-[8px] font-bold" style={{ color: '#8A938C' }}>
                    {team.wins}V {team.draws}N {team.losses}D
                  </p>
                </div>
              </div>

              <span className="text-[12px] font-black tabular-nums text-right" style={{ color: '#35D07F' }}>
                {team.wins}
              </span>
              <span className="text-[12px] font-black tabular-nums text-right" style={{ color: '#F2EEDC' }}>
                {team.goals - team.goalsAgainst > 0 ? '+' : ''}
                {team.goals - team.goalsAgainst}
              </span>
              <span className="text-[13px] font-black tabular-nums text-right" style={{ color: style.color }}>
                {team.points}
              </span>
            </motion.button>
          );
        })}
      </div>
    </section>
  );
}
