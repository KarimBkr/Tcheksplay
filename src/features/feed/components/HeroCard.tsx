import { CheckCircle, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import type { FeedItem } from '../types';
import { ReactionBar } from './ReactionBar';

interface HeroCardProps {
  item: FeedItem;
  onComment: () => void;
}

function TagPill({ label, color }: { label: string; color: string }) {
  return (
    <span
      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-[8px] text-[8px] font-black uppercase tracking-wider"
      style={{ background: `${color}1A`, border: `1px solid ${color}35`, color }}
    >
      {label}
    </span>
  );
}

function AuthorRow({ item }: { item: FeedItem }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <img src={item.author.avatar} alt={item.author.name} className="w-5 h-5 rounded-full object-cover" style={{ border: '1px solid rgba(255,255,255,0.08)' }} />
        <div className="flex items-center gap-1.5">
          <span className="text-[9px] font-bold" style={{ color: '#8A938C' }}>{item.author.name}</span>
          {item.author.verified && (
            <span className="inline-flex items-center justify-center w-3.5 h-3.5 rounded-full flex-shrink-0" style={{ background: '#7BA7D9' }}>
              <CheckCircle size={8} style={{ color: '#0B221C' }} />
            </span>
          )}
        </div>
      </div>
      <span className="text-[9px]" style={{ color: '#556A61' }}>{item.timeLabel}</span>
    </div>
  );
}

export function HeroCard({ item, onComment }: HeroCardProps) {
  return (
    <motion.article
      whileTap={{ scale: 0.99 }}
      className="mx-5 rounded-[28px] overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #183C31 0%, #0B221C 100%)', border: '1px solid rgba(183,255,26,0.12)', boxShadow: '0 8px 40px rgba(0,0,0,0.4)' }}
    >
      <div className="relative h-[240px] overflow-hidden">
        <img src={item.img} alt={item.title} className="w-full h-full object-cover" style={{ filter: 'brightness(0.35)' }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(11,34,28,1) 0%, rgba(11,34,28,0.1) 55%)' }} />
        {item.breaking && (
          <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1.5 rounded-[10px]" style={{ background: '#8E2B36' }}>
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#F2EEDC' }} />
            <span className="text-[9px] font-black uppercase tracking-wider" style={{ color: '#F2EEDC' }}>Breaking</span>
          </div>
        )}
        {item.pinned && (
          <div className="absolute top-4 right-4 w-7 h-7 rounded-[9px] flex items-center justify-center" style={{ background: 'rgba(11,34,28,0.65)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.1)' }}>
            <TrendingUp size={12} style={{ color: '#B7FF1A' }} />
          </div>
        )}
        <div className="absolute bottom-0 left-0 right-0 px-5 pb-5">
          <TagPill label={item.tag} color={item.tagColor} />
          <h2 className="text-[20px] font-black leading-snug mt-2" style={{ color: '#F2EEDC' }}>{item.title}</h2>
        </div>
      </div>
      <div className="px-5 pt-4 pb-5">
        {item.excerpt && <p className="text-[12px] leading-relaxed mb-4" style={{ color: 'rgba(215,219,200,0.6)' }}>{item.excerpt}</p>}
        <AuthorRow item={item} />
        <div className="mt-3">
          <ReactionBar reactions={item.reactions} onComment={onComment} commentCount={item.totalComments} />
        </div>
      </div>
    </motion.article>
  );
}
