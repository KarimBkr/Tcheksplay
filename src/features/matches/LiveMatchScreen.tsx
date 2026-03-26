import { useState, useEffect } from 'react';
import { ChevronLeft, Activity, ListChecks, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from '@tanstack/react-router';
import type { LiveTab } from './types';
import { useMatchData } from './hooks/useMatchData';
import { Scoreboard } from './components/Scoreboard';
import { Timeline, ScorersList } from './components/Timeline';
import { MVPVote } from './components/MVPVote';
import { LiveLineup } from './components/LiveLineup';

const LIVE_TABS: { id: LiveTab; label: string; icon: React.ReactNode }[] = [
  { id: 'live', label: 'Temps réel', icon: <Activity size={13} /> },
  { id: 'lineup', label: 'Compos', icon: <ListChecks size={13} /> },
];

export function LiveMatchScreen() {
  const router = useRouter();
  const { events, liveHomeLineup, liveAwayLineup, homeBench, awayBench, mvpCandidates } = useMatchData();
  const [activeTab, setActiveTab] = useState<LiveTab>('live');
  const [minute, setMinute] = useState(78);

  useEffect(() => {
    const interval = setInterval(() => setMinute(prev => (prev < 90 ? prev + 1 : prev)), 8000);
    return () => clearInterval(interval);
  }, []);

  const homeGoals = events.filter(e => e.type === 'goal' && e.team === 'home').length;
  const awayGoals = events.filter(e => e.type === 'goal' && e.team === 'away').length;

  return (
    <div className="min-h-screen w-full overflow-x-hidden pb-24" style={{ background: '#0B221C', color: '#F2EEDC' }}>
      <div className="relative z-10 flex items-center justify-between px-5 pt-12 pb-4">
        <button onClick={() => router.navigate({ to: '/matches' })} className="flex items-center gap-1.5 px-3 py-2 rounded-[12px]" style={{ background: 'rgba(255,255,255,0.05)', color: '#8A938C' }} aria-label="Retour">
          <ChevronLeft size={16} />
          <span className="text-[10px] font-black uppercase tracking-wider">Retour</span>
        </button>
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-[10px]" style={{ background: '#8E2B36' }}>
          <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#B7FF1A' }} />
          <span className="text-[9px] font-black uppercase tracking-wider" style={{ color: '#F2EEDC' }}>En Direct</span>
        </div>
      </div>

      <Scoreboard homeTeam="Annecy FC" awayTeam="Seynod City" homeScore={homeGoals} awayScore={awayGoals} time={`${minute}'`} status="live" venue="Terrain des Marquisats" category="Élite" minute={minute} />

      <div className="sticky top-0 z-20 px-5 py-3 flex gap-2" style={{ background: 'rgba(11,34,28,0.95)', backdropFilter: 'blur(16px)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        {LIVE_TABS.map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)} className="flex items-center gap-1.5 px-4 py-2 rounded-[12px] text-[10px] font-black uppercase tracking-wide whitespace-nowrap transition-all flex-1 justify-center" style={activeTab === tab.id ? { background: '#B7FF1A', color: '#0B221C' } : { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', color: '#8A938C' }}>
            {tab.icon}<span>{tab.label}</span>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={activeTab} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.18, ease: 'easeOut' }} className="px-5 pt-5">
          {activeTab === 'live' && (
            <div className="flex flex-col gap-6">
              <div className="flex items-center justify-end">
                <div className="flex items-center gap-1.5">
                  <RefreshCw size={9} style={{ color: '#B7FF1A' }} />
                  <span className="text-[9px] font-black" style={{ color: '#B7FF1A' }}>En direct</span>
                </div>
              </div>
              <Timeline events={events} />
              <ScorersList events={events} />
              <MVPVote candidates={mvpCandidates} />
            </div>
          )}
          {activeTab === 'lineup' && (
            <LiveLineup homeLineup={liveHomeLineup} awayLineup={liveAwayLineup} homeBench={homeBench} awayBench={awayBench} />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
