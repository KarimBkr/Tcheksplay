import { useState } from 'react';
import { Trophy, Award, Crown } from 'lucide-react';
import { useRewardsData } from './hooks/useRewardsData';
import { BadgeCard } from './components/BadgeCard';
import { HallOfFameCard } from './components/HallOfFameCard';
import type { RewardTab } from './types';
import { THEME } from '@/shared/lib/constants';

const TABS: Array<{ id: RewardTab; label: string; icon: typeof Trophy }> = [
  { id: 'podium', label: 'Podium', icon: Crown },
  { id: 'badges', label: 'Badges', icon: Award },
  { id: 'halloffame', label: 'Hall of Fame', icon: Trophy },
];

export function RewardsScreen() {
  const { badges, hallOfFame, podium, distinctions, loading } = useRewardsData();
  const [activeTab, setActiveTab] = useState<RewardTab>('podium');

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin" style={{ borderColor: `${THEME.yellow} transparent ${THEME.yellow} ${THEME.yellow}` }} />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5 pb-4">
      <div className="px-5 pt-2">
        <h1 className="text-[22px] font-black uppercase tracking-tight" style={{ color: THEME.text }}>
          Récompenses
        </h1>
        <p className="text-[11px] mt-1" style={{ color: THEME.muted }}>Summer Cup S3 · Palmarès</p>
      </div>

      <div className="flex gap-2 px-5">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-[13px] text-[9px] font-black uppercase tracking-wide transition-all"
              style={active
                ? { background: THEME.accent, color: THEME.bg }
                : { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', color: THEME.muted }}
            >
              <Icon size={12} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {activeTab === 'podium' && (
        <div className="flex flex-col gap-4 px-5">
          <div className="flex items-end justify-center gap-3 py-6">
            {[podium[1], podium[0], podium[2]].filter(Boolean).map((entry) => {
              const heights = { 1: 'h-28', 2: 'h-20', 3: 'h-16' } as const;
              const colors = { 1: THEME.yellow, 2: '#C0C0C0', 3: '#CD7F32' } as const;
              return (
                <div key={entry.id} className="flex flex-col items-center gap-2">
                  <img src={entry.img} alt={entry.name} className="w-12 h-12 rounded-full object-cover" style={{ border: `2px solid ${colors[entry.rank]}` }} />
                  <p className="text-[10px] font-black text-center" style={{ color: THEME.text }}>{entry.name}</p>
                  <div className={`w-20 ${heights[entry.rank]} rounded-t-[14px] flex flex-col items-center justify-center`} style={{ background: `${colors[entry.rank]}15`, border: `1px solid ${colors[entry.rank]}30`, borderBottom: 'none' }}>
                    <span className="text-[20px] font-black" style={{ color: colors[entry.rank] }}>{entry.value}</span>
                    <span className="text-[8px] font-bold" style={{ color: THEME.muted }}>{entry.valueLabel}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {distinctions.length > 0 && (
            <div className="flex flex-col gap-3">
              <h2 className="text-[11px] font-black uppercase tracking-wider" style={{ color: THEME.muted }}>Distinctions spéciales</h2>
              {distinctions.map((d) => (
                <div key={d.id} className="rounded-[18px] p-4 flex items-center gap-3" style={{ background: `${d.color}08`, border: `1px solid ${d.color}20` }}>
                  <img src={d.holderImg} alt={d.holder} className="w-10 h-10 rounded-full object-cover" />
                  <div className="flex-1">
                    <p className="text-[11px] font-black" style={{ color: d.color }}>{d.title}</p>
                    <p className="text-[9px]" style={{ color: THEME.muted }}>{d.holder} · {d.edition}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === 'badges' && (
        <div className="flex flex-col gap-3 px-5">
          {badges.map((badge) => <BadgeCard key={badge.id} badge={badge} />)}
        </div>
      )}

      {activeTab === 'halloffame' && (
        <div className="flex flex-col gap-4 px-5">
          {hallOfFame.map((entry) => <HallOfFameCard key={entry.id} entry={entry} />)}
        </div>
      )}
    </div>
  );
}
