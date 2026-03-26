import { Zap, Target, Activity, Shield } from 'lucide-react';
import type { PlayerRank } from '../types';

interface TopPerformersBannerProps {
  topScorer: PlayerRank;
  topAssister: PlayerRank;
  topKeeper: PlayerRank;
}

export function TopPerformersBanner({ topScorer, topAssister, topKeeper }: TopPerformersBannerProps) {
  const performers = [
    { player: topScorer, label: 'Top Buteur', stat: `${topScorer.goals} buts`, sub: `${topScorer.goalsPerMatch} / match`, icon: <Target size={10} />, color: '#B7FF1A' },
    { player: topAssister, label: 'Top Passeur', stat: `${topAssister.assists} p.déc.`, sub: `${topAssister.assistsPerMatch} / match`, icon: <Activity size={10} />, color: '#35D07F' },
    { player: topKeeper, label: 'Top Gardien', stat: `${topKeeper.cleanSheets} CS`, sub: `${topKeeper.saveRate}% arrêts`, icon: <Shield size={10} />, color: '#7BA7D9' },
  ];

  return (
    <div
      className="rounded-[26px] p-4 relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #183C31 0%, #0B221C 100%)', border: '1px solid rgba(183,255,26,0.08)' }}
    >
      <div
        className="absolute -top-8 right-0 w-40 h-40 rounded-full"
        style={{ background: 'radial-gradient(ellipse, rgba(183,255,26,0.07) 0%, transparent 70%)', filter: 'blur(20px)' }}
      />
      <div className="flex items-center gap-2 mb-4">
        <Zap size={12} style={{ color: '#B7FF1A' }} />
        <h3 className="text-[9px] font-black uppercase tracking-[0.22em]" style={{ color: '#8A938C' }}>
          Top Performers · Summer Cup S3
        </h3>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {performers.map((p) => (
          <div
            key={p.label}
            className="flex flex-col items-center gap-2 p-3 rounded-[16px]"
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
          >
            <div className="w-10 h-10 rounded-[12px] overflow-hidden" style={{ border: `1.5px solid ${p.color}40` }}>
              <img src={p.player.img} alt={`${p.player.firstName} ${p.player.name}`} className="w-full h-full object-cover" />
            </div>
            <div className="text-center">
              <p className="text-[7px] font-black uppercase tracking-wide leading-none" style={{ color: '#8A938C' }}>{p.label}</p>
              <p className="text-[9px] font-black mt-0.5 truncate" style={{ color: '#F2EEDC' }}>{p.player.firstName}</p>
            </div>
            <div className="flex flex-col items-center gap-0.5">
              <div className="flex items-center gap-1 px-2 py-0.5 rounded-full" style={{ background: `${p.color}14`, border: `1px solid ${p.color}28` }}>
                <span style={{ color: p.color }}>{p.icon}</span>
                <span className="text-[9px] font-black" style={{ color: p.color }}>{p.stat}</span>
              </div>
              <span className="text-[8px] font-bold" style={{ color: '#8A938C' }}>{p.sub}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
