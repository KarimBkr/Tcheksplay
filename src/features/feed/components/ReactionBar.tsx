import { useState } from 'react';
import { MessageCircle, Share2, Bookmark } from 'lucide-react';
import { motion } from 'framer-motion';
import type { FeedReactions, ReactionType } from '../types';

const REACTION_META: Record<ReactionType, { emoji: string; label: string }> = {
  fire: { emoji: '🔥', label: 'Feu' },
  clap: { emoji: '👏', label: 'Clap' },
  heart: { emoji: '❤️', label: 'Cœur' },
  wow: { emoji: '😮', label: 'Wow' },
};

interface ReactionBarProps {
  reactions: FeedReactions;
  commentCount: number;
  onComment: () => void;
}

export function ReactionBar({ reactions, commentCount, onComment }: ReactionBarProps) {
  const [localReactions, setLocalReactions] = useState<FeedReactions>({ ...reactions });
  const [tapped, setTapped] = useState<ReactionType | null>(null);

  const handleReaction = (type: ReactionType) => {
    if (tapped === type) {
      setTapped(null);
      setLocalReactions((prev) => ({ ...prev, [type]: prev[type] - 1 }));
    } else {
      if (tapped) setLocalReactions((prev) => ({ ...prev, [tapped]: prev[tapped] - 1 }));
      setTapped(type);
      setLocalReactions((prev) => ({ ...prev, [type]: prev[type] + 1 }));
    }
  };

  return (
    <div
      className="flex items-center justify-between pt-3"
      style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
    >
      <div className="flex items-center gap-1">
        {(Object.keys(REACTION_META) as ReactionType[]).map((type) => (
          <motion.button
            key={type}
            whileTap={{ scale: 1.3 }}
            onClick={() => handleReaction(type)}
            className="flex items-center gap-0.5 px-1.5 py-1 rounded-[8px] transition-all"
            style={
              tapped === type
                ? { background: 'rgba(183,255,26,0.1)', border: '1px solid rgba(183,255,26,0.2)' }
                : { background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }
            }
          >
            <span className="text-[12px] leading-none">{REACTION_META[type].emoji}</span>
            <span className="text-[9px] font-black" style={{ color: tapped === type ? '#B7FF1A' : '#8A938C' }}>
              {localReactions[type]}
            </span>
          </motion.button>
        ))}
      </div>
      <div className="flex items-center gap-3">
        <button onClick={onComment} className="flex items-center gap-1.5" aria-label="Voir les commentaires">
          <MessageCircle size={12} style={{ color: '#556A61' }} />
          <span className="text-[9px] font-bold" style={{ color: '#556A61' }}>{commentCount}</span>
        </button>
        <button aria-label="Partager"><Share2 size={12} style={{ color: '#556A61' }} /></button>
        <button aria-label="Sauvegarder"><Bookmark size={12} style={{ color: '#556A61' }} /></button>
      </div>
    </div>
  );
}
