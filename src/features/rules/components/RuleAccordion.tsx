import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { RuleSection } from '../types';
import { THEME } from '@/shared/lib/constants';

interface RuleAccordionProps {
  section: RuleSection;
  defaultOpen?: boolean;
}

export function RuleAccordion({ section, defaultOpen = false }: RuleAccordionProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div
      className="rounded-[22px] overflow-hidden"
      style={{ background: THEME.cardBg, border: `1px solid ${open ? `${section.color}20` : 'rgba(255,255,255,0.06)'}` }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-3 px-4 py-4 text-left"
      >
        <div
          className="w-10 h-10 rounded-[12px] flex items-center justify-center flex-shrink-0 text-[18px]"
          style={{ background: `${section.color}10`, border: `1px solid ${section.color}20` }}
        >
          {section.emoji}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-[13px] font-black" style={{ color: THEME.text }}>{section.title}</h3>
          <p className="text-[9px] mt-0.5 truncate" style={{ color: THEME.muted }}>{section.summary}</p>
        </div>
        <ChevronDown
          size={14}
          className="flex-shrink-0 transition-transform"
          style={{ color: THEME.muted, transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 flex flex-col gap-2">
              {section.rules.map((rule) => (
                <div
                  key={rule.id}
                  className="flex items-start gap-3 px-3 py-2.5 rounded-[14px]"
                  style={{ background: rule.highlight ? `${section.color}06` : 'rgba(255,255,255,0.02)' }}
                >
                  <div className="flex-1">
                    <p className="text-[10px] font-black" style={{ color: rule.highlight ? section.color : THEME.text }}>
                      {rule.label}
                    </p>
                    <p className="text-[10px] mt-0.5" style={{ color: THEME.muted }}>{rule.value}</p>
                    {rule.note && (
                      <p className="text-[8px] mt-1 italic" style={{ color: `${THEME.muted}90` }}>
                        {rule.note}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
