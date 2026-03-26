import { Target, AlertTriangle, ArrowUpRight, Shuffle } from 'lucide-react';
import { motion } from 'framer-motion';
import type { MatchDetailEvent, EventType } from '../types';

interface TimelineProps { events: MatchDetailEvent[] }

const EVENT_CFG: Record<EventType, { icon: React.ReactNode; color: string; bgColor: string; label: string }> = {
  goal: { icon: <Target size={11} />, color: '#B7FF1A', bgColor: 'rgba(183,255,26,0.12)', label: 'But' },
  yellow_card: { icon: <AlertTriangle size={10} />, color: '#F4C542', bgColor: 'rgba(244,197,66,0.12)', label: 'Carton jaune' },
  red_card: { icon: <AlertTriangle size={10} />, color: '#D94B5B', bgColor: 'rgba(217,75,91,0.12)', label: 'Carton rouge' },
  substitution: { icon: <Shuffle size={10} />, color: '#7BA7D9', bgColor: 'rgba(123,167,217,0.1)', label: 'Remplacement' },
  assist: { icon: <ArrowUpRight size={10} />, color: '#35D07F', bgColor: 'rgba(53,208,127,0.1)', label: 'Passe déc.' },
};

export function Timeline({ events }: TimelineProps) {
  const reversed = [...events].reverse();
  return (
    <section>
      <h2 className="text-[10px] font-black uppercase tracking-[0.2em] mb-4" style={{ color: '#8A938C' }}>Fil du Match</h2>
      <div className="flex flex-col gap-0">
        {reversed.map((event, idx) => {
          const cfg = EVENT_CFG[event.type];
          const isHome = event.team === 'home';
          return (
            <motion.div key={event.id} initial={{ opacity: 0, x: isHome ? -8 : 8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.04, duration: 0.2 }} className={`flex items-center ${isHome ? 'flex-row' : 'flex-row-reverse'}`}>
              <div className={`flex items-center gap-2 flex-1 py-3 ${isHome ? 'pr-3' : 'pl-3 flex-row-reverse'}`}>
                <div className="w-8 h-8 rounded-[10px] flex items-center justify-center flex-shrink-0" style={{ background: cfg.bgColor, color: cfg.color }}>{cfg.icon}</div>
                <div className={`flex flex-col ${isHome ? 'items-start' : 'items-end'}`}>
                  <p className="text-[11px] font-black" style={{ color: '#F2EEDC' }}>{event.playerName}</p>
                  {event.playerOut && <p className="text-[9px] font-semibold" style={{ color: '#8A938C' }}>↓ {event.playerOut}</p>}
                  <p className="text-[9px] font-semibold" style={{ color: '#8A938C' }}>{event.detail}</p>
                </div>
              </div>
              <div className="flex flex-col items-center flex-shrink-0 w-12 gap-1">
                <span className="text-[10px] font-black px-2 py-0.5 rounded-lg tabular-nums" style={{ background: 'rgba(255,255,255,0.05)', color: cfg.color }}>{event.minute}'</span>
                {idx < reversed.length - 1 && <div className="w-px h-4" style={{ background: 'rgba(255,255,255,0.06)' }} />}
              </div>
              <div className="flex-1" />
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

export function ScorersList({ events }: TimelineProps) {
  const scoring = events.filter(e => e.type === 'goal' || e.type === 'assist');
  return (
    <section>
      <h2 className="text-[10px] font-black uppercase tracking-[0.2em] mb-3" style={{ color: '#8A938C' }}>Buteurs & Passeurs</h2>
      <div className="rounded-[20px] overflow-hidden" style={{ background: '#123129', border: '1px solid rgba(255,255,255,0.06)' }}>
        {scoring.map((event, i) => {
          const cfg = EVENT_CFG[event.type];
          return (
            <div key={event.id} className="flex items-center gap-3 px-4 py-3" style={{ borderBottom: i < scoring.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
              <div className="w-7 h-7 rounded-[9px] flex items-center justify-center flex-shrink-0" style={{ background: cfg.bgColor, color: cfg.color }}>{cfg.icon}</div>
              <div className="flex-1">
                <p className="text-[12px] font-black" style={{ color: '#F2EEDC' }}>{event.playerName}</p>
                <p className="text-[9px] font-semibold" style={{ color: '#8A938C' }}>{event.team === 'home' ? 'Annecy FC' : 'Seynod City'} · {cfg.label}</p>
              </div>
              <span className="text-[10px] font-black px-2 py-0.5 rounded-md tabular-nums" style={{ background: 'rgba(255,255,255,0.05)', color: cfg.color }}>{event.minute}'</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export function CardsList({ events }: TimelineProps) {
  const cards = events.filter(e => e.type === 'yellow_card' || e.type === 'red_card');
  return (
    <section className="mb-2">
      <h2 className="text-[10px] font-black uppercase tracking-[0.2em] mb-3" style={{ color: '#8A938C' }}>Cartons</h2>
      <div className="flex flex-col gap-2">
        {cards.map(event => {
          const isYellow = event.type === 'yellow_card';
          return (
            <div key={event.id} className="flex items-center gap-3 px-4 py-3 rounded-[16px]" style={{ background: isYellow ? 'rgba(244,197,66,0.06)' : 'rgba(217,75,91,0.06)', border: `1px solid ${isYellow ? 'rgba(244,197,66,0.14)' : 'rgba(217,75,91,0.14)'}` }}>
              <div className="w-4 h-5 rounded-[3px] flex-shrink-0" style={{ background: isYellow ? '#F4C542' : '#D94B5B' }} />
              <div className="flex-1">
                <p className="text-[12px] font-black" style={{ color: '#F2EEDC' }}>{event.playerName}</p>
                <p className="text-[9px] font-semibold" style={{ color: '#8A938C' }}>{event.team === 'home' ? 'Annecy FC' : 'Seynod City'} · {event.detail}</p>
              </div>
              <span className="text-[10px] font-black tabular-nums" style={{ color: isYellow ? '#F4C542' : '#D94B5B' }}>{event.minute}'</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
