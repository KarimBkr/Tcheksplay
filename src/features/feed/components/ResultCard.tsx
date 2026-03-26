import { CheckCircle, Shield, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import type { FeedItem } from '../types';
import { ReactionBar } from './ReactionBar';

interface ResultCardProps {
  item: FeedItem;
  onComment: () => void;
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

export function ResultCard({ item, onComment }: ResultCardProps) {
  const md = item.matchData!;

  return (
    <motion.article whileTap={{ scale: 0.98 }} className="mx-5 rounded-[24px] overflow-hidden" style={{ background: '#123129', border: '1px solid rgba(46,143,87,0.15)' }}>
      <div className="h-[3px] w-full" style={{ background: 'linear-gradient(90deg, transparent, rgba(46,143,87,0.8), transparent)' }} />
      <div className="px-5 pt-4">
        <div className="flex items-center justify-between mb-4">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-[8px] text-[8px] font-black uppercase tracking-wider" style={{ background: `${item.tagColor}1A`, border: `1px solid ${item.tagColor}35`, color: item.tagColor }}>
            <CheckCircle size={7} />{item.tag}
          </span>
          <span className="text-[9px]" style={{ color: '#556A61' }}>{item.timeLabel}</span>
        </div>

        <div className="flex items-center justify-between mb-1">
          <div className="flex flex-col items-center gap-1.5 flex-1">
            <div className="w-11 h-11 rounded-[13px] flex items-center justify-center" style={{ background: 'rgba(46,143,87,0.12)', border: '1px solid rgba(46,143,87,0.18)' }}>
              <Shield size={18} style={{ color: '#2E8F57' }} />
            </div>
            <span className="text-[11px] font-black text-center" style={{ color: '#F2EEDC' }}>{md.home}</span>
          </div>
          <div className="flex flex-col items-center gap-1 px-4">
            <span className="text-[38px] font-black tracking-tighter leading-none tabular-nums" style={{ color: '#F2EEDC' }}>
              {md.homeScore}<span style={{ color: '#556A61', margin: '0 2px' }}>–</span>{md.awayScore}
            </span>
            <span className="text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md" style={{ background: 'rgba(46,143,87,0.12)', color: '#2E8F57' }}>FT · Terminé</span>
          </div>
          <div className="flex flex-col items-center gap-1.5 flex-1">
            <div className="w-11 h-11 rounded-[13px] flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
              <Shield size={18} style={{ color: '#8A938C' }} />
            </div>
            <span className="text-[11px] font-black text-center" style={{ color: '#D7DBC8' }}>{md.away}</span>
          </div>
        </div>

        <div className="flex items-center justify-center gap-1.5 mb-4">
          <MapPin size={9} style={{ color: '#556A61' }} />
          <span className="text-[9px]" style={{ color: '#556A61' }}>{md.venue}</span>
        </div>
        {item.excerpt && <p className="text-[11px] leading-relaxed mb-4" style={{ color: 'rgba(215,219,200,0.5)' }}>{item.excerpt}</p>}
        <AuthorRow item={item} />
        <div className="mt-3 mb-5">
          <ReactionBar reactions={item.reactions} onComment={onComment} commentCount={item.totalComments} />
        </div>
      </div>
    </motion.article>
  );
}
