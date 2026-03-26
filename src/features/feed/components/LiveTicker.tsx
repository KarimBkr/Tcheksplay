import { useState, useEffect } from 'react';
import { Bell } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { TickerItem } from '../types';

interface LiveTickerProps {
  items: TickerItem[];
}

export function LiveTicker({ items }: LiveTickerProps) {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setIdx((prev) => (prev + 1) % items.length), 4000);
    return () => clearInterval(interval);
  }, [items.length]);

  const current = items[idx];
  if (!current) return null;

  return (
    <div
      className="mx-5 rounded-[14px] flex items-center gap-3 px-4 py-2.5 overflow-hidden"
      style={{
        background: current.urgent
          ? 'linear-gradient(90deg, rgba(142,43,54,0.18), rgba(18,49,41,0.7))'
          : 'rgba(255,255,255,0.03)',
        border: current.urgent
          ? '1px solid rgba(142,43,54,0.28)'
          : '1px solid rgba(255,255,255,0.05)',
      }}
    >
      <div className="flex items-center gap-1.5 flex-shrink-0">
        <span
          className="w-1.5 h-1.5 rounded-full animate-pulse"
          style={{ background: current.urgent ? '#D94B5B' : '#B7FF1A' }}
        />
        <span
          className="text-[8px] font-black uppercase tracking-widest"
          style={{ color: current.urgent ? '#D94B5B' : '#B7FF1A' }}
        >
          Live
        </span>
      </div>
      <AnimatePresence mode="wait">
        <motion.p
          key={current.id}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          transition={{ duration: 0.25 }}
          className="flex-1 text-[11px] font-semibold truncate"
          style={{ color: '#D7DBC8' }}
        >
          {current.text}
        </motion.p>
      </AnimatePresence>
      <Bell size={11} style={{ color: '#556A61', flexShrink: 0 }} />
    </div>
  );
}
