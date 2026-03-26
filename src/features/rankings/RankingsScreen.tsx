import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Target, Activity, Users, TrendingUp } from 'lucide-react';
import type { RankingTab, SeasonId } from './types';
import { useRankingsData } from './hooks/useRankingsData';
import { TeamsTable } from './components/TeamsTable';
import { PlayerList } from './components/PlayerList';
import { TopPerformersBanner } from './components/TopPerformersBanner';
import { PlayerStarCard } from './components/PlayerStarCard';

const RANKING_TABS: { id: RankingTab; label: string; icon: React.ReactNode }[] = [
  { id: 'teams', label: 'Équipes', icon: <Shield size={12} /> },
  { id: 'scorers', label: 'Buteurs', icon: <Target size={12} /> },
  { id: 'assisters', label: 'Passeurs', icon: <Activity size={12} /> },
  { id: 'keepers', label: 'Gardiens', icon: <Users size={12} /> },
];

const SEASON_OPTIONS: { id: SeasonId; label: string }[] = [
  { id: 's3', label: 'S3 · 2025' },
  { id: 's2', label: 'S2 · 2024' },
  { id: 's1', label: 'S1 · 2023' },
];

export function RankingsScreen() {
  const [activeTab, setActiveTab] = useState<RankingTab>('teams');
  const [season, setSeason] = useState<SeasonId>('s3');
  const { teamRankings, scorerRankings, assisterRankings, keeperRankings } = useRankingsData();

  return (
    <div className="flex flex-col gap-5 pb-4">
      <div className="px-5 flex gap-2 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
        {SEASON_OPTIONS.map((s) => (
          <button
            key={s.id}
            onClick={() => setSeason(s.id)}
            className="px-3.5 py-1.5 rounded-[10px] text-[10px] font-black uppercase tracking-wide whitespace-nowrap flex-shrink-0 transition-all"
            style={season === s.id
              ? { background: 'rgba(46,143,87,0.2)', border: '1px solid rgba(46,143,87,0.35)', color: '#B7FF1A' }
              : { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', color: '#8A938C' }}
          >
            {s.label}
          </button>
        ))}
        <span className="px-3.5 py-1.5 rounded-[10px] text-[10px] font-black uppercase tracking-wide whitespace-nowrap flex-shrink-0 self-center" style={{ color: '#556A61' }}>
          Summer Cup · Annecy & alentours
        </span>
      </div>

      <div className="px-5">
        <TopPerformersBanner topScorer={scorerRankings[0]} topAssister={assisterRankings[0]} topKeeper={keeperRankings[0]} />
      </div>

      <div className="sticky top-0 z-20 px-5 py-2.5" style={{ background: 'rgba(11,34,28,0.96)', backdropFilter: 'blur(18px)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="flex gap-1.5">
          {RANKING_TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="flex items-center gap-1 px-2 py-2.5 rounded-[12px] text-[9px] font-black uppercase tracking-wide flex-1 justify-center transition-all"
              style={activeTab === tab.id
                ? { background: '#B7FF1A', color: '#0B221C' }
                : { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', color: '#8A938C' }}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.18, ease: 'easeOut' }}
          className="px-5 flex flex-col gap-5"
        >
          {activeTab === 'teams' && <TeamsTable teams={teamRankings} />}

          {activeTab === 'scorers' && (
            <div className="flex flex-col gap-5">
              <PlayerStarCard player={scorerRankings[0]} statLabel="buts" statValue={String(scorerRankings[0].goals)} statSecondary={`${scorerRankings[0].goalsPerMatch} but/match · ${scorerRankings[0].matches} j.`} accentColor="#B7FF1A" />
              <PlayerList players={scorerRankings} statKey="goals" statLabel="buts" statIcon={<Target size={11} />} accentColor="#B7FF1A" secondaryKey="goalsPerMatch" />
            </div>
          )}

          {activeTab === 'assisters' && (
            <div className="flex flex-col gap-5">
              <PlayerStarCard player={assisterRankings[0]} statLabel="p.déc." statValue={String(assisterRankings[0].assists)} statSecondary={`${assisterRankings[0].assistsPerMatch} p.déc./match · ${assisterRankings[0].matches} j.`} accentColor="#35D07F" />
              <PlayerList players={assisterRankings} statKey="assists" statLabel="p.déc." statIcon={<Activity size={11} />} accentColor="#35D07F" secondaryKey="assistsPerMatch" />
            </div>
          )}

          {activeTab === 'keepers' && (
            <div className="flex flex-col gap-5">
              <PlayerStarCard player={keeperRankings[0]} statLabel="Clean Sheets" statValue={String(keeperRankings[0].cleanSheets)} statSecondary={`${keeperRankings[0].saveRate}% arrêts · ${keeperRankings[0].matches} j.`} accentColor="#7BA7D9" />
              <PlayerList players={keeperRankings} statKey="cleanSheets" statLabel="CS" statIcon={<Shield size={11} />} accentColor="#7BA7D9" />
            </div>
          )}

          <div className="rounded-[16px] px-4 py-3 flex items-center gap-3" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
            <TrendingUp size={12} style={{ color: '#8A938C' }} />
            <p className="text-[9px] font-bold flex-1" style={{ color: 'rgba(215,219,200,0.45)' }}>
              Classements mis à jour après chaque journée · Summer Cup – Saison 3 en cours
            </p>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
