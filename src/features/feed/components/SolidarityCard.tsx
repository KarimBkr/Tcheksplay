import { Heart, Users, Zap, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import type { FeedItem } from '../types';
import { ReactionBar } from './ReactionBar';

interface SolidarityCardProps {
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

export function SolidarityCard({ item, onComment }: SolidarityCardProps) {
  const sd = item.solidarityData!;
  const pct = Math.round((sd.raised / sd.goal) * 100);

  return (
    <motion.article whileTap={{ scale: 0.98 }} className="mx-5 rounded-[24px] overflow-hidden" style={{ background: 'linear-gradient(135deg, rgba(46,143,87,0.08) 0%, #0B221C 100%)', border: '1px solid rgba(46,143,87,0.15)' }}>
      <div className="relative h-[120px] overflow-hidden">
        <img src={item.img} alt={`Visuel du projet ${sd.project}`} className="w-full h-full object-cover" style={{ filter: 'brightness(0.3)' }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(11,34,28,0.97) 0%, transparent 55%)' }} />
        <div className="absolute top-3 left-4">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-[8px] text-[8px] font-black uppercase tracking-wider" style={{ background: 'rgba(46,143,87,0.1)', border: '1px solid rgba(46,143,87,0.2)', color: '#2E8F57' }}>
            <Heart size={8} />{item.tag}
          </span>
        </div>
        <div className="absolute bottom-3 left-4">
          <h3 className="text-[14px] font-black" style={{ color: '#F2EEDC' }}>{sd.project}</h3>
        </div>
      </div>
      <div className="px-5 pt-4 pb-5">
        <p className="text-[11px] leading-relaxed mb-4" style={{ color: 'rgba(215,219,200,0.55)' }}>{item.excerpt}</p>
        <div className="flex items-end justify-between mb-2">
          <div>
            <p className="text-[9px] font-bold uppercase tracking-wider mb-0.5" style={{ color: '#8A938C' }}>Collecté</p>
            <p className="text-[15px] font-black leading-none" style={{ color: '#F2EEDC' }}>
              {sd.raised.toLocaleString()} €
              <span className="text-[10px] font-semibold ml-1" style={{ color: '#8A938C' }}>/ {sd.goal.toLocaleString()} €</span>
            </p>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-[22px] font-black leading-none" style={{ color: '#B7FF1A' }}>{pct} %</span>
            <span className="text-[8px]" style={{ color: '#8A938C' }}>objectif fin juillet</span>
          </div>
        </div>
        <div className="w-full h-[5px] rounded-full overflow-hidden mb-4" style={{ background: 'rgba(255,255,255,0.06)' }}>
          <motion.div
            initial={{ width: '0%' }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 1.2, ease: 'easeOut', delay: 0.2 }}
            className="h-full rounded-full"
            style={{ background: 'linear-gradient(90deg, #2E8F57, #B7FF1A)' }}
          />
        </div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-1.5">
            <Users size={10} style={{ color: '#556A61' }} />
            <span className="text-[10px] font-bold" style={{ color: '#556A61' }}>{sd.donors} donateurs</span>
          </div>
          <button className="flex items-center gap-1.5 px-4 py-2 text-[10px] font-black rounded-[11px] uppercase tracking-wider" style={{ background: '#B7FF1A', color: '#0B221C' }}>
            <Zap size={9} />
            <span>Soutenir le projet</span>
          </button>
        </div>
        <AuthorRow item={item} />
        <div className="mt-3">
          <ReactionBar reactions={item.reactions} onComment={onComment} commentCount={item.totalComments} />
        </div>
      </div>
    </motion.article>
  );
}
