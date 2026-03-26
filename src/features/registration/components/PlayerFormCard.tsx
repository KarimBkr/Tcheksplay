import { useState } from 'react';
import { Trash2, ChevronDown } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import type { PlayerForm } from '../types';
import { JERSEY_SIZES, SHORTS_SIZES, BEST_LEVELS } from '../types';
import { THEME } from '@/shared/lib/constants';

interface PlayerFormCardProps {
  player: PlayerForm;
  index: number;
  onChange: (id: string, field: keyof PlayerForm, value: string) => void;
  onRemove: (id: string) => void;
  canRemove: boolean;
}

function SelectChips({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (v: string) => void }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[9px] font-black uppercase tracking-[0.2em]" style={{ color: THEME.muted }}>{label}</label>
      <div className="flex gap-2 flex-wrap">
        {options.map((opt) => (
          <button
            key={opt} type="button" onClick={() => onChange(opt)}
            className="px-3 py-1.5 rounded-[10px] text-[10px] font-black transition-all"
            style={value === opt ? { background: THEME.accent, color: THEME.bg } : { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: THEME.muted }}
          >{opt}</button>
        ))}
      </div>
    </div>
  );
}

export function PlayerFormCard({ player, index, onChange, onRemove, canRemove }: PlayerFormCardProps) {
  const [expanded, setExpanded] = useState(true);
  const hasBasics = player.firstName && player.lastName;

  return (
    <div className="rounded-[22px] overflow-hidden" style={{ background: THEME.darkGreen, border: '1px solid rgba(255,255,255,0.06)' }}>
      <button type="button" onClick={() => setExpanded(!expanded)} className="w-full flex items-center justify-between px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-[10px] flex items-center justify-center" style={{ background: `${THEME.accent}08`, border: `1px solid ${THEME.accent}15` }}>
            <span className="text-[11px] font-black" style={{ color: THEME.accent }}>#{index + 1}</span>
          </div>
          <div className="text-left">
            <p className="text-[12px] font-black" style={{ color: THEME.text }}>
              {hasBasics ? `${player.firstName} ${player.lastName}` : `Joueur ${index + 1}`}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {canRemove && (
            <button type="button" onClick={(e) => { e.stopPropagation(); onRemove(player.id); }} className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: `${THEME.red}10`, border: `1px solid ${THEME.red}20` }}>
              <Trash2 size={11} style={{ color: THEME.red }} />
            </button>
          )}
          <ChevronDown size={12} className="transition-transform" style={{ color: THEME.muted, transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)' }} />
        </div>
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden">
            <div className="px-4 pb-4 flex flex-col gap-3">
              <div className="grid grid-cols-2 gap-3">
                {(['firstName', 'lastName'] as const).map((field) => (
                  <div key={field} className="flex flex-col gap-1.5">
                    <label className="text-[9px] font-black uppercase tracking-[0.2em]" style={{ color: THEME.muted }}>
                      {field === 'firstName' ? 'Prénom' : 'Nom'} <span style={{ color: THEME.accent }}>*</span>
                    </label>
                    <input value={player[field]} onChange={(e) => onChange(player.id, field, e.target.value)} className="w-full h-12 px-4 rounded-[14px] text-[13px] font-medium focus:outline-none" style={{ background: 'rgba(255,255,255,0.04)', border: `1px solid ${player[field] ? `${THEME.accent}25` : 'rgba(255,255,255,0.08)'}`, color: THEME.text }} />
                  </div>
                ))}
              </div>
              <SelectChips label="Maillot" value={player.jerseySize} options={JERSEY_SIZES} onChange={(v) => onChange(player.id, 'jerseySize', v)} />
              <SelectChips label="Short" value={player.shortsSize} options={SHORTS_SIZES} onChange={(v) => onChange(player.id, 'shortsSize', v)} />
              <SelectChips label="Meilleur niveau" value={player.bestLevel} options={BEST_LEVELS} onChange={(v) => onChange(player.id, 'bestLevel', v)} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
