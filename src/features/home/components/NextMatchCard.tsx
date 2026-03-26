import { useRouter } from '@tanstack/react-router';
import { Clock, ArrowUpRight } from 'lucide-react';
import type { Match } from '@/shared/types';

interface NextMatchCardProps {
  match: Match;
}

export function NextMatchCard({ match }: NextMatchCardProps) {
  const router = useRouter();

  return (
    <section className="px-5">
      <div className="flex items-center justify-between mb-3">
        <h2
          className="text-[10px] font-black uppercase tracking-[0.2em]"
          style={{ color: '#8A938C' }}
        >
          Prochain match
        </h2>
        <button
          onClick={() => router.navigate({ to: '/matches' })}
          className="flex items-center gap-1"
        >
          <span
            className="text-[9px] font-black uppercase tracking-wider"
            style={{ color: '#B7FF1A' }}
          >
            Calendrier
          </span>
          <ArrowUpRight size={11} style={{ color: '#B7FF1A' }} />
        </button>
      </div>

      <button
        onClick={() =>
          router.navigate({
            to: '/matches/$matchId',
            params: { matchId: match.id },
          })
        }
        className="w-full text-left rounded-[20px] px-4 py-4"
        style={{
          background: '#123129',
          border: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <div className="flex items-center justify-between mb-3">
          <span
            className="px-2.5 py-1 rounded-[8px] text-[9px] font-black uppercase tracking-wider"
            style={{
              background: 'rgba(183,255,26,0.08)',
              border: '1px solid rgba(183,255,26,0.15)',
              color: '#B7FF1A',
            }}
          >
            {match.category}
          </span>
          <span
            className="text-[9px] font-bold"
            style={{ color: '#8A938C' }}
          >
            {match.date}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span
            className="text-[14px] font-black uppercase tracking-wide"
            style={{ color: '#F2EEDC' }}
          >
            {match.homeTeam}
          </span>
          <span
            className="text-[11px] font-black"
            style={{ color: '#8A938C' }}
          >
            vs
          </span>
          <span
            className="text-[14px] font-black uppercase tracking-wide text-right"
            style={{ color: '#F2EEDC' }}
          >
            {match.awayTeam}
          </span>
        </div>

        <div className="flex items-center gap-1.5 mt-3">
          <Clock size={10} style={{ color: '#8A938C' }} />
          <span
            className="text-[10px] font-bold"
            style={{ color: '#8A938C' }}
          >
            {match.time} · {match.venue}
          </span>
        </div>
      </button>
    </section>
  );
}
