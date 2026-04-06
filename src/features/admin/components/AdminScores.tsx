import { useState } from 'react';
import { CheckCircle, Clock, RotateCcw } from 'lucide-react';
import type { ScoreRecord, ScoreTabFilter, PhaseFilter, ScoreResultStatus } from '../types';

const TAB_FILTERS: { id: ScoreTabFilter; label: string }[] = [
  { id: 'all', label: 'Tous' },
  { id: 'awaiting', label: 'En attente' },
  { id: 'validated', label: 'Validés' },
  { id: 'corrected', label: 'Corrigés' },
];

const PHASE_OPTIONS: { id: PhaseFilter; label: string }[] = [
  { id: 'all', label: 'Toutes phases' },
  { id: 'groupes', label: 'Groupes' },
  { id: 'quarts', label: 'Quarts' },
  { id: 'demies', label: 'Demies' },
  { id: 'finale', label: 'Finale' },
];

const STATUS_META: Record<ScoreResultStatus, { label: string; color: string; bg: string; border: string }> = {
  validated: { label: 'Validé', color: '#B7FF1A', bg: 'rgba(183,255,26,0.08)', border: 'rgba(183,255,26,0.15)' },
  awaiting: { label: 'En attente', color: '#F4C542', bg: 'rgba(244,197,66,0.08)', border: 'rgba(244,197,66,0.18)' },
  corrected: { label: 'Corrigé', color: '#7BA7D9', bg: 'rgba(123,167,217,0.08)', border: 'rgba(123,167,217,0.15)' },
  cancelled: { label: 'Annulé', color: '#D94B5B', bg: 'rgba(217,75,91,0.08)', border: 'rgba(217,75,91,0.15)' },
};

interface AdminScoresProps {
  scoreRecords: ScoreRecord[];
}

export function AdminScores({ scoreRecords }: AdminScoresProps) {
  const [tabFilter, setTabFilter] = useState<ScoreTabFilter>('all');
  const [phaseFilter, setPhaseFilter] = useState<PhaseFilter>('all');

  const filtered = scoreRecords.filter(r => {
    const statusOk = tabFilter === 'all' || r.status === tabFilter;
    const phaseOk = phaseFilter === 'all' || r.phase === phaseFilter;
    return statusOk && phaseOk;
  });

  const awaitingCount = scoreRecords.filter(r => r.status === 'awaiting').length;
  const validatedCount = scoreRecords.filter(r => r.status === 'validated').length;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-[14px] font-black" style={{ color: '#F2EEDC' }}>Scores & Stats</h2>
        <div className="flex gap-3 text-[10px] font-semibold">
          <span style={{ color: '#B7FF1A' }}>{validatedCount} validés</span>
          <span style={{ color: '#F4C542' }}>{awaitingCount} en attente</span>
        </div>
      </div>

      {/* Tab filters */}
      <div className="flex gap-2">
        {TAB_FILTERS.map(tab => (
          <button
            key={tab.id}
            onClick={() => setTabFilter(tab.id)}
            className="px-3 py-1.5 rounded-full text-[10px] font-bold transition-all"
            style={tabFilter === tab.id
              ? { background: 'rgba(183,255,26,0.12)', color: '#B7FF1A', border: '1px solid rgba(183,255,26,0.2)' }
              : { background: 'rgba(255,255,255,0.04)', color: '#8A938C', border: '1px solid transparent' }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Phase filter */}
      <div className="flex gap-1.5">
        {PHASE_OPTIONS.map(p => (
          <button
            key={p.id}
            onClick={() => setPhaseFilter(p.id)}
            className="px-2.5 py-1 rounded-[8px] text-[9px] font-semibold"
            style={phaseFilter === p.id
              ? { background: 'rgba(183,255,26,0.08)', color: '#B7FF1A' }
              : { background: 'transparent', color: '#5A6B5E' }}
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Score records */}
      <div className="flex flex-col gap-2.5">
        {filtered.length === 0 && (
          <p className="text-[11px] text-center py-6" style={{ color: '#5A6B5E' }}>Aucun score</p>
        )}
        {filtered.map(record => {
          const meta = STATUS_META[record.status];
          return (
            <div key={record.id} className="rounded-[14px] p-4 flex flex-col gap-2" style={{ background: '#123129', border: `1px solid ${meta.border}` }}>
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-bold px-2 py-0.5 rounded-full" style={{ background: meta.bg, color: meta.color }}>
                  {record.status === 'validated' && <CheckCircle size={8} className="inline mr-1" style={{ verticalAlign: 'middle' }} />}
                  {record.status === 'awaiting' && <Clock size={8} className="inline mr-1" style={{ verticalAlign: 'middle' }} />}
                  {record.status === 'corrected' && <RotateCcw size={8} className="inline mr-1" style={{ verticalAlign: 'middle' }} />}
                  {meta.label}
                </span>
                <span className="text-[9px]" style={{ color: '#5A6B5E' }}>J{record.journee} · {record.date}</span>
              </div>
              <div className="flex items-center gap-2 text-[12px] font-bold" style={{ color: '#F2EEDC' }}>
                <span className="truncate">{record.home}</span>
                <span className="font-black" style={{ color: '#B7FF1A' }}>{record.homeScore}</span>
                <span style={{ color: '#5A6B5E' }}>–</span>
                <span className="font-black" style={{ color: '#B7FF1A' }}>{record.awayScore}</span>
                <span className="truncate">{record.away}</span>
              </div>
              {record.scorers.length > 0 && (
                <p className="text-[9px]" style={{ color: '#8A938C' }}>
                  {record.scorers.join(' · ')}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
