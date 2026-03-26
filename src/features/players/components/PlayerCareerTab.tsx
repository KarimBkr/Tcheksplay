import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import type { CareerStep } from '../types';

export function PlayerCareerTab({ career }: { career: CareerStep[] }) {
  return (
    <div className="flex flex-col gap-0">
      {career.map((step, i) => (
        <motion.div key={step.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} className="flex gap-4">
          <div className="flex flex-col items-center" style={{ width: 28, flexShrink: 0 }}>
            <div className="w-3 h-3 rounded-full flex-shrink-0 mt-1" style={{ background: step.color, boxShadow: `0 0 8px ${step.color}50`, border: '2px solid #0B221C' }} />
            {i < career.length - 1 && <div className="flex-1 w-px mt-1" style={{ background: 'rgba(255,255,255,0.07)', minHeight: 32 }} />}
          </div>
          <div className="flex-1 pb-5 rounded-[18px] p-4 mb-1" style={{ background: '#123129', border: `1px solid ${step.color}18` }}>
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-[14px] font-black leading-none" style={{ color: '#F2EEDC' }}>{step.club}</p>
                <p className="text-[9px] font-bold mt-0.5 uppercase tracking-wide" style={{ color: step.color }}>{step.level}</p>
              </div>
              <span className="text-[8px] font-black px-2 py-0.5 rounded-md flex-shrink-0" style={{ background: 'rgba(255,255,255,0.05)', color: '#8A938C', border: '1px solid rgba(255,255,255,0.07)' }}>
                {step.period}
              </span>
            </div>
            <div className="flex items-center gap-1.5 mt-2.5">
              <ChevronRight size={9} style={{ color: step.color }} />
              <p className="text-[10px] font-semibold" style={{ color: 'rgba(215,219,200,0.6)' }}>{step.highlight}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
