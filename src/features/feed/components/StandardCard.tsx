import { Megaphone, MessageCircle, Trophy, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import type { FeedItem } from '../types';
import { ReactionBar } from './ReactionBar';

interface StandardCardProps {
  item: FeedItem;
  onComment: () => void;
}

const ICON_MAP: Record<string, ReactNode> = {
  announcement: <Megaphone size={14} style={{ color: '#7BA7D9' }} />,
  interview: <MessageCircle size={14} style={{ color: '#C9C1A2' }} />,
  tournament: <Trophy size={14} style={{ color: '#B7FF1A' }} />,
};

export function StandardCard({ item, onComment }: StandardCardProps) {
  return (
    <motion.article whileTap={{ scale: 0.98 }} className="mx-5 rounded-[24px] overflow-hidden" style={{ background: '#123129', border: '1px solid rgba(255,255,255,0.05)' }}>
      <div className="flex gap-4 p-4">
        <div className="w-[84px] h-[84px] rounded-[14px] overflow-hidden flex-shrink-0">
          <img src={item.img} alt={item.title} className="w-full h-full object-cover" style={{ filter: 'brightness(0.55)' }} />
        </div>
        <div className="flex-1 min-w-0 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              {ICON_MAP[item.type] && <span>{ICON_MAP[item.type]}</span>}
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-[8px] text-[8px] font-black uppercase tracking-wider" style={{ background: `${item.tagColor}1A`, border: `1px solid ${item.tagColor}35`, color: item.tagColor }}>
                {item.tag}
              </span>
            </div>
            <h3 className="text-[12px] font-black leading-snug" style={{ color: '#F2EEDC' }}>{item.title}</h3>
            {item.excerpt && <p className="text-[10px] mt-1 leading-relaxed line-clamp-2" style={{ color: 'rgba(215,219,200,0.45)' }}>{item.excerpt}</p>}
          </div>
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center gap-1.5">
              <img src={item.author.avatar} alt={item.author.name} className="w-4 h-4 rounded-full object-cover" />
              <div className="flex items-center gap-1">
                <span className="text-[8px] font-bold" style={{ color: '#8A938C' }}>{item.author.name}</span>
                {item.author.verified && (
                  <span className="inline-flex items-center justify-center w-3.5 h-3.5 rounded-full flex-shrink-0" style={{ background: '#7BA7D9' }}>
                    <CheckCircle size={8} style={{ color: '#0B221C' }} />
                  </span>
                )}
              </div>
            </div>
            <span className="text-[8px]" style={{ color: '#556A61' }}>{item.timeLabel}</span>
          </div>
        </div>
      </div>
      <div className="px-5 pb-5">
        <ReactionBar reactions={item.reactions} onComment={onComment} commentCount={item.totalComments} />
      </div>
    </motion.article>
  );
}
