import { useState } from 'react';
import { Megaphone } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import type { FeedCategory, FeedItem } from './types';
import { useFeedData } from './hooks/useFeedData';
import { LiveTicker } from './components/LiveTicker';
import { CommentPanel } from './components/CommentPanel';
import { HeroCard } from './components/HeroCard';
import { ResultCard } from './components/ResultCard';
import { StandardCard } from './components/StandardCard';
import { SolidarityCard } from './components/SolidarityCard';

const FEED_FILTERS: Array<{ id: FeedCategory; label: string; emoji: string }> = [
  { id: 'all', label: 'Tout', emoji: '✦' },
  { id: 'official', label: 'Officiel', emoji: '📣' },
  { id: 'results', label: 'Résultats', emoji: '⚽' },
  { id: 'schedule', label: 'Calendrier', emoji: '📅' },
  { id: 'media', label: 'Médias', emoji: '📸' },
  { id: 'rewards', label: 'Récompenses', emoji: '🏆' },
  { id: 'solidarity', label: 'Solidaire', emoji: '💚' },
  { id: 'sponsored', label: 'Partenaires', emoji: '⭐' },
];

function SectionDivider({ label, count }: { label: string; count: number }) {
  return (
    <div className="flex items-center gap-3 px-5">
      <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.05)' }} />
      <div className="flex items-center gap-1.5">
        <span className="text-[8px] font-black uppercase tracking-[0.22em]" style={{ color: '#556A61' }}>{label}</span>
        <span className="text-[8px] font-bold px-1.5 py-0.5 rounded-md" style={{ background: 'rgba(255,255,255,0.04)', color: '#556A61' }}>{count}</span>
      </div>
      <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.05)' }} />
    </div>
  );
}

function renderCard(item: FeedItem, onComment: () => void) {
  switch (item.type) {
    case 'hero': return <HeroCard key={item.id} item={item} onComment={onComment} />;
    case 'result': return <ResultCard key={item.id} item={item} onComment={onComment} />;
    case 'solidarity': return <SolidarityCard key={item.id} item={item} onComment={onComment} />;
    default: return <StandardCard key={item.id} item={item} onComment={onComment} />;
  }
}

export function FeedScreen() {
  const { items, tickerItems } = useFeedData();
  const [activeFilter, setActiveFilter] = useState<FeedCategory>('all');
  const [openCommentId, setOpenCommentId] = useState<string | null>(null);

  const filtered = activeFilter === 'all' ? items : items.filter((i) => i.category === activeFilter);
  const openItem = openCommentId ? items.find((i) => i.id === openCommentId) : null;

  const todayItems = filtered.filter((i) => i.timeGroup === 'today');
  const yesterdayItems = filtered.filter((i) => i.timeGroup === 'yesterday');
  const olderItems = filtered.filter((i) => i.timeGroup === 'older');

  return (
    <div className="flex flex-col gap-5 pb-4">
      <LiveTicker items={tickerItems} />

      <div className="flex gap-2 overflow-x-auto px-5" style={{ scrollbarWidth: 'none' }}>
        {FEED_FILTERS.map((f) => (
          <button
            key={f.id}
            onClick={() => setActiveFilter(f.id)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-[13px] text-[9px] font-black uppercase tracking-wide whitespace-nowrap transition-all flex-shrink-0"
            style={activeFilter === f.id
              ? { background: '#B7FF1A', color: '#0B221C', boxShadow: '0 4px 16px rgba(183,255,26,0.2)' }
              : { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', color: '#556A61' }}
          >
            <span>{f.emoji}</span>
            <span>{f.label}</span>
            {activeFilter === f.id && filtered.length > 0 && (
              <span className="ml-0.5 px-1.5 py-0.5 rounded-md text-[8px] font-black" style={{ background: 'rgba(11,34,28,0.25)', color: '#0B221C' }}>{filtered.length}</span>
            )}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 gap-4 px-10">
          <div className="w-16 h-16 rounded-[20px] flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
            <Megaphone size={24} style={{ color: '#8A938C' }} />
          </div>
          <p className="text-[13px] font-black text-center" style={{ color: '#D7DBC8' }}>Aucun contenu dans cette catégorie</p>
          <p className="text-[11px] text-center" style={{ color: '#8A938C' }}>Revenez bientôt !</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {todayItems.length > 0 && (
            <div className="flex flex-col gap-4">
              <SectionDivider label="Aujourd'hui" count={todayItems.length} />
              {todayItems.map((item) => renderCard(item, () => setOpenCommentId(item.id)))}
            </div>
          )}
          {yesterdayItems.length > 0 && (
            <div className="flex flex-col gap-4">
              <SectionDivider label="Hier" count={yesterdayItems.length} />
              {yesterdayItems.map((item) => renderCard(item, () => setOpenCommentId(item.id)))}
            </div>
          )}
          {olderItems.length > 0 && (
            <div className="flex flex-col gap-4">
              <SectionDivider label="Cette semaine" count={olderItems.length} />
              {olderItems.map((item) => renderCard(item, () => setOpenCommentId(item.id)))}
            </div>
          )}
        </div>
      )}

      <AnimatePresence>
        {openItem && (
          <>
            <motion.div key="backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[70]" style={{ background: 'rgba(11,34,28,0.7)', backdropFilter: 'blur(4px)' }} onClick={() => setOpenCommentId(null)} />
            <CommentPanel key="comment-panel" item={openItem} onClose={() => setOpenCommentId(null)} />
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
