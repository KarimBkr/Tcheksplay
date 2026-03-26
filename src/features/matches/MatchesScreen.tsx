import { useState } from 'react';
import { Calendar, Filter } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import type { MatchStatus, MatchCategory } from './types';
import { useMatchData } from './hooks/useMatchData';
import { MatchCard } from './components/MatchCard';

const STATUS_LABELS: Record<MatchStatus, string> = {
  all: 'Tous',
  live: 'En direct',
  upcoming: 'À venir',
  finished: 'Terminés',
};

const DAY_LABELS: Record<string, string> = {
  'Auj.': "Aujourd'hui",
  'Hier': 'Hier',
  'Mar.': 'Mardi',
  'Mer.': 'Mercredi',
  'Dim.': 'Dimanche',
};

export function MatchesScreen() {
  const { allMatches, loading } = useMatchData();
  const [statusFilter, setStatusFilter] = useState<MatchStatus>('all');
  const [categoryFilter, setCategoryFilter] = useState<MatchCategory>('all');
  const [showFilters, setShowFilters] = useState(false);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]" style={{ background: '#0B221C' }}>
        <div className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin" style={{ borderColor: '#2E8F57', borderTopColor: 'transparent' }} />
      </div>
    );
  }

  const filtered = allMatches.filter(m => {
    if (statusFilter !== 'all' && m.status !== statusFilter) return false;
    if (categoryFilter !== 'all' && m.category !== categoryFilter) return false;
    return true;
  });

  const activeFilterCount = [statusFilter !== 'all', categoryFilter !== 'all'].filter(Boolean).length;

  const sortOrder = (m: typeof filtered[0]) => (m.status === 'live' ? 0 : m.status === 'upcoming' ? 1 : 2);
  const sorted = [...filtered].sort((a, b) => sortOrder(a) - sortOrder(b));

  const groupedByDay: { day: string; matches: typeof sorted }[] = [];
  const seen = new Set<string>();
  sorted.forEach(m => {
    if (!seen.has(m.date)) {
      seen.add(m.date);
      groupedByDay.push({ day: m.date, matches: [] });
    }
    groupedByDay.find(g => g.day === m.date)!.matches.push(m);
  });

  return (
    <div className="flex flex-col gap-0 pb-4">
      <div className="px-5 pt-12 pb-3">
        <h1 className="text-[22px] font-black tracking-[-0.03em] uppercase leading-none" style={{ color: '#F2EEDC' }}>Matchs</h1>
        <p className="text-[10px] font-semibold mt-0.5" style={{ color: '#8A938C' }}>
          Summer Cup – Saison 3 · {filtered.length} match{filtered.length !== 1 ? 's' : ''}
        </p>
      </div>

      <div className="flex gap-2 px-5 pb-4 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
        {(['all', 'live', 'upcoming', 'finished'] as MatchStatus[]).map(s => (
          <button key={s} onClick={() => setStatusFilter(s)} className="flex items-center gap-1.5 px-3.5 py-2 rounded-full text-[10px] font-black uppercase tracking-wide whitespace-nowrap flex-shrink-0 transition-all" style={statusFilter === s ? { background: '#B7FF1A', color: '#0B221C' } : { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: '#8A938C' }}>
            {STATUS_LABELS[s]}
          </button>
        ))}
        <button onClick={() => setShowFilters(v => !v)} className="flex items-center gap-1.5 px-3.5 py-2 rounded-full whitespace-nowrap flex-shrink-0 transition-all" style={showFilters || activeFilterCount > 0 ? { background: 'rgba(183,255,26,0.1)', border: '1px solid rgba(183,255,26,0.3)', color: '#B7FF1A' } : { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: '#8A938C' }}>
          <Filter size={12} />
          {activeFilterCount > 0 && (
            <span className="w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-black" style={{ background: '#B7FF1A', color: '#0B221C' }}>{activeFilterCount}</span>
          )}
        </button>
      </div>

      <AnimatePresence>
        {showFilters && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.18 }} className="overflow-hidden">
            <div className="mx-5 mb-4 rounded-[16px] p-4" style={{ background: '#123129', border: '1px solid rgba(255,255,255,0.06)' }}>
              <p className="text-[8px] font-black uppercase tracking-[0.2em] mb-2" style={{ color: '#8A938C' }}>Catégorie</p>
              <div className="flex gap-2">
                {(['all', 'Élite', 'Challenger'] as MatchCategory[]).map(cat => (
                  <button key={cat} onClick={() => setCategoryFilter(cat)} className="px-3.5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wide transition-all" style={categoryFilter === cat ? { background: '#B7FF1A', color: '#0B221C' } : { background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', color: '#8A938C' }}>
                    {cat === 'all' ? 'Toutes' : cat}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {filtered.some(m => m.status === 'live') && (
        <div className="mx-5 mb-4 flex items-center gap-2 px-3 py-2 rounded-[12px]" style={{ background: 'rgba(142,43,54,0.12)', border: '1px solid rgba(142,43,54,0.25)' }}>
          <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#B7FF1A' }} />
          <span className="text-[10px] font-black uppercase tracking-wider" style={{ color: '#F4A5AE' }}>Match en cours maintenant</span>
        </div>
      )}

      {filtered.length === 0 && (
        <div className="mx-5 py-14 rounded-[22px] flex flex-col items-center gap-3" style={{ background: '#0F2B23', border: '1px solid rgba(255,255,255,0.05)' }}>
          <Calendar size={28} style={{ color: '#8A938C' }} />
          <p className="text-[12px] font-black" style={{ color: '#8A938C' }}>Aucun match trouvé</p>
          <button onClick={() => { setStatusFilter('all'); setCategoryFilter('all'); }} className="text-[10px] font-black px-3 py-1.5 rounded-full" style={{ background: 'rgba(183,255,26,0.08)', color: '#B7FF1A', border: '1px solid rgba(183,255,26,0.15)' }}>
            Réinitialiser
          </button>
        </div>
      )}

      <div className="flex flex-col gap-6 px-5">
        {groupedByDay.map(group => (
          <div key={group.day}>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: group.matches.some(m => m.status === 'live') ? '#B7FF1A' : '#556A61' }}>
                {DAY_LABELS[group.day] ?? group.day}
              </span>
              <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.05)' }} />
              <span className="text-[8px] font-black" style={{ color: '#556A61' }}>
                {group.matches.length} match{group.matches.length > 1 ? 's' : ''}
              </span>
            </div>
            <div className="flex flex-col gap-3">
              {group.matches.map(match => (
                <MatchCard key={match.id} match={{ ...match, dayLabel: group.day }} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
