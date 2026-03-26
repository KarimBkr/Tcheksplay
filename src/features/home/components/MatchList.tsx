import { useState } from 'react';
import { useRouter } from '@tanstack/react-router';
import { MapPin, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Match } from '@/shared/types';

interface MatchListProps {
  matches: Match[];
}

type MatchFilter = 'all' | 'live' | 'upcoming' | 'finished';

const FILTERS: { id: MatchFilter; label: string }[] = [
  { id: 'all', label: 'Tous' },
  { id: 'live', label: 'En direct' },
  { id: 'upcoming', label: 'À venir' },
  { id: 'finished', label: 'Terminés' },
];

const STATUS_META: Record<Match['status'], { label: string; color: string; bg: string }> = {
  live: { label: 'Live', color: '#FF4C5B', bg: 'rgba(255,76,91,0.12)' },
  upcoming: { label: 'À venir', color: '#B7FF1A', bg: 'rgba(183,255,26,0.08)' },
  finished: { label: 'Terminé', color: '#8A938C', bg: 'rgba(255,255,255,0.05)' },
};

export function MatchList({ matches }: MatchListProps) {
  const [filter, setFilter] = useState<MatchFilter>('all');
  const router = useRouter();

  const filtered = filter === 'all' ? matches : matches.filter((m) => m.status === filter);

  return (
    <section className="px-5">
      <h2
        className="text-[10px] font-black uppercase tracking-[0.2em] mb-3"
        style={{ color: '#8A938C' }}
      >
        Matchs
      </h2>

      <div className="flex gap-2 mb-4 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
        {FILTERS.map((f) => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            className="px-3.5 py-2 rounded-[12px] text-[10px] font-black uppercase tracking-wide whitespace-nowrap flex-shrink-0 transition-all"
            style={
              filter === f.id
                ? { background: '#B7FF1A', color: '#0B221C' }
                : {
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.07)',
                    color: '#8A938C',
                  }
            }
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-2.5">
        {filtered.map((match, i) => {
          const meta = STATUS_META[match.status];
          return (
            <motion.button
              key={match.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() =>
                match.status === 'live'
                  ? router.navigate({ to: '/matches/live' })
                  : router.navigate({ to: '/matches/$matchId', params: { matchId: match.id } })
              }
              className="w-full text-left rounded-[18px] px-4 py-3.5"
              style={{ background: '#123129', border: '1px solid rgba(255,255,255,0.06)' }}
            >
              <div className="flex items-center justify-between mb-2.5">
                <div className="flex items-center gap-2">
                  {match.status === 'live' && (
                    <span
                      className="w-1.5 h-1.5 rounded-full animate-pulse"
                      style={{ background: '#FF4C5B' }}
                    />
                  )}
                  <span
                    className="px-2 py-0.5 rounded-md text-[8px] font-black uppercase tracking-wider"
                    style={{ background: meta.bg, color: meta.color }}
                  >
                    {meta.label}
                  </span>
                  <span
                    className="text-[8px] font-black uppercase tracking-wider"
                    style={{ color: '#8A938C' }}
                  >
                    {match.category}
                  </span>
                </div>
                <span className="text-[9px] font-bold" style={{ color: '#8A938C' }}>
                  {match.date}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-black truncate" style={{ color: '#F2EEDC' }}>
                    {match.homeTeam}
                  </p>
                  <p className="text-[13px] font-black truncate" style={{ color: '#F2EEDC' }}>
                    {match.awayTeam}
                  </p>
                </div>
                {match.status !== 'upcoming' ? (
                  <div className="flex flex-col items-end gap-0.5 mx-3">
                    <span className="text-[16px] font-black tabular-nums" style={{ color: '#F2EEDC' }}>
                      {match.homeScore}
                    </span>
                    <span className="text-[16px] font-black tabular-nums" style={{ color: '#F2EEDC' }}>
                      {match.awayScore}
                    </span>
                  </div>
                ) : (
                  <span className="text-[11px] font-black mx-3" style={{ color: '#8A938C' }}>
                    {match.time}
                  </span>
                )}
                <ChevronRight size={14} style={{ color: 'rgba(255,255,255,0.15)' }} />
              </div>

              <div className="flex items-center gap-1.5 mt-2">
                <MapPin size={9} style={{ color: '#8A938C' }} />
                <span className="text-[8px] font-bold" style={{ color: '#8A938C' }}>
                  {match.venue}
                </span>
              </div>
            </motion.button>
          );
        })}
      </div>
    </section>
  );
}
