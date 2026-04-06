import { useState } from 'react';
import { Radio, Clock, AlertTriangle, Calendar } from 'lucide-react';
import type { AdminMatch, MatchFilterType, MatchDateFilter } from '../types';

const FILTER_TABS: { id: MatchFilterType; label: string }[] = [
  { id: 'all', label: 'Tous' },
  { id: 'live', label: 'En direct' },
  { id: 'awaiting_score', label: 'Scores' },
  { id: 'scheduled', label: 'Programmés' },
];

const DATE_FILTERS: { id: MatchDateFilter; label: string }[] = [
  { id: 'all', label: 'Tout' },
  { id: 'today', label: "Aujourd'hui" },
  { id: 'week', label: 'Semaine' },
];

const STATUS_META: Record<AdminMatch['status'], { label: string; color: string; bg: string }> = {
  scheduled: { label: 'Programmé', color: '#7BA7D9', bg: 'rgba(123,167,217,0.1)' },
  live: { label: 'En Direct', color: '#D94B5B', bg: 'rgba(217,75,91,0.12)' },
  finished: { label: 'Terminé', color: '#8A938C', bg: 'rgba(255,255,255,0.05)' },
  awaiting_score: { label: 'Score manquant', color: '#F4C542', bg: 'rgba(244,197,66,0.1)' },
  score_pending_validation: { label: 'À valider', color: '#C9C1A2', bg: 'rgba(201,193,162,0.1)' },
};

interface AdminMatchesProps {
  matches: AdminMatch[];
}

export function AdminMatches({ matches }: AdminMatchesProps) {
  const [filter, setFilter] = useState<MatchFilterType>('all');
  const [dateFilter, setDateFilter] = useState<MatchDateFilter>('all');

  const filtered = matches.filter(m => {
    const statusOk = filter === 'all' || m.status === filter;
    const dateOk = dateFilter === 'all' || (dateFilter === 'today' ? m.dateGroup === 'today' : m.dateGroup !== 'older');
    return statusOk && dateOk;
  });

  const awaitingCount = matches.filter(m => m.status === 'awaiting_score').length;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-[14px] font-black" style={{ color: '#F2EEDC' }}>
          Matchs
          {awaitingCount > 0 && (
            <span className="ml-2 text-[10px] px-2 py-0.5 rounded-full font-bold" style={{ background: 'rgba(244,197,66,0.12)', color: '#F4C542' }}>
              {awaitingCount} en attente
            </span>
          )}
        </h2>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 flex-wrap">
        {FILTER_TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => setFilter(tab.id)}
            className="px-3 py-1.5 rounded-full text-[10px] font-bold transition-all"
            style={filter === tab.id
              ? { background: 'rgba(183,255,26,0.12)', color: '#B7FF1A', border: '1px solid rgba(183,255,26,0.2)' }
              : { background: 'rgba(255,255,255,0.04)', color: '#8A938C', border: '1px solid transparent' }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Date filters */}
      <div className="flex gap-1.5">
        {DATE_FILTERS.map(d => (
          <button
            key={d.id}
            onClick={() => setDateFilter(d.id)}
            className="px-2.5 py-1 rounded-[8px] text-[9px] font-semibold"
            style={dateFilter === d.id
              ? { background: 'rgba(183,255,26,0.08)', color: '#B7FF1A' }
              : { background: 'transparent', color: '#5A6B5E' }}
          >
            {d.label}
          </button>
        ))}
      </div>

      {/* Match list */}
      <div className="flex flex-col gap-2.5">
        {filtered.length === 0 && (
          <p className="text-[11px] text-center py-6" style={{ color: '#5A6B5E' }}>Aucun match</p>
        )}
        {filtered.map(match => {
          const meta = STATUS_META[match.status];
          return (
            <div key={match.id} className="rounded-[14px] p-4 flex flex-col gap-2" style={{ background: '#123129', border: '1px solid rgba(255,255,255,0.05)' }}>
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 text-[12px] font-bold" style={{ color: '#F2EEDC' }}>
                    <span className="truncate">{match.home}</span>
                    {match.homeScore != null && (
                      <span className="font-black" style={{ color: '#B7FF1A' }}>{match.homeScore}</span>
                    )}
                    <span style={{ color: '#5A6B5E' }}>–</span>
                    {match.awayScore != null && (
                      <span className="font-black" style={{ color: '#B7FF1A' }}>{match.awayScore}</span>
                    )}
                    <span className="truncate">{match.away}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[9px] flex items-center gap-1" style={{ color: '#8A938C' }}>
                  <Calendar size={9} /> {match.date} · {match.venue}
                </span>
                <span className="text-[9px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1" style={{ background: meta.bg, color: meta.color }}>
                  {match.status === 'live' && <Radio size={8} />}
                  {match.status === 'awaiting_score' && <AlertTriangle size={8} />}
                  {match.status === 'scheduled' && <Clock size={8} />}
                  {meta.label}
                  {match.status === 'live' && match.time && <span>· {match.time}'</span>}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
