import { useState } from 'react';
import { Camera, Video, Image } from 'lucide-react';
import { useMediaData } from './hooks/useMediaData';
import { MediaCard } from './components/MediaCard';
import type { MediaType, MediaCategory } from './types';
import { THEME } from '@/shared/lib/constants';

const TYPE_FILTERS: Array<{ id: MediaType; label: string; icon: typeof Camera }> = [
  { id: 'all', label: 'Tout', icon: Camera },
  { id: 'video', label: 'Vidéos', icon: Video },
  { id: 'photo', label: 'Photos', icon: Image },
];

const CATEGORY_FILTERS: Array<{ id: MediaCategory; label: string; emoji: string }> = [
  { id: 'all', label: 'Tout', emoji: '✦' },
  { id: 'highlights', label: 'Highlights', emoji: '⚡' },
  { id: 'aftermovies', label: 'Aftermovies', emoji: '🎬' },
  { id: 'official', label: 'Officielles', emoji: '📸' },
  { id: 'celebrations', label: 'Célébrations', emoji: '🏆' },
  { id: 'moments', label: 'Moments Forts', emoji: '🔥' },
];

export function MediaScreen() {
  const { items, loading } = useMediaData();
  const [typeFilter, setTypeFilter] = useState<MediaType>('all');
  const [catFilter, setCatFilter] = useState<MediaCategory>('all');

  const filtered = items
    .filter((i) => typeFilter === 'all' || i.type === typeFilter)
    .filter((i) => catFilter === 'all' || i.category === catFilter);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin" style={{ borderColor: `${THEME.accent} transparent ${THEME.accent} ${THEME.accent}` }} />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5 pb-4">
      <div className="px-5 pt-2">
        <h1 className="text-[22px] font-black uppercase tracking-tight" style={{ color: THEME.text }}>
          Médias
        </h1>
        <p className="text-[11px] mt-1" style={{ color: THEME.muted }}>
          {items.length} contenus · Summer Cup S3
        </p>
      </div>

      <div className="flex gap-2 px-5">
        {TYPE_FILTERS.map((f) => {
          const Icon = f.icon;
          const active = typeFilter === f.id;
          return (
            <button
              key={f.id}
              onClick={() => setTypeFilter(f.id)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-[13px] text-[9px] font-black uppercase tracking-wide transition-all"
              style={active
                ? { background: THEME.accent, color: THEME.bg }
                : { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', color: THEME.muted }}
            >
              <Icon size={12} />
              <span>{f.label}</span>
            </button>
          );
        })}
      </div>

      <div className="flex gap-2 overflow-x-auto px-5" style={{ scrollbarWidth: 'none' }}>
        {CATEGORY_FILTERS.map((f) => {
          const active = catFilter === f.id;
          return (
            <button
              key={f.id}
              onClick={() => setCatFilter(f.id)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-[10px] text-[9px] font-black uppercase tracking-wide whitespace-nowrap flex-shrink-0 transition-all"
              style={active
                ? { background: `${THEME.accent}20`, color: THEME.accent, border: `1px solid ${THEME.accent}35` }
                : { background: 'rgba(255,255,255,0.03)', color: THEME.muted }}
            >
              <span>{f.emoji}</span>
              <span>{f.label}</span>
            </button>
          );
        })}
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 gap-3 px-10">
          <Camera size={28} style={{ color: THEME.muted }} />
          <p className="text-[13px] font-black text-center" style={{ color: THEME.text }}>Aucun média trouvé</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3 px-5">
          {filtered.map((item) => (
            <MediaCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}
