import { Crown } from 'lucide-react';
import type { PlayerRank } from '../types';

interface PlayerStarCardProps {
  player: PlayerRank;
  statLabel: string;
  statValue: string;
  statSecondary: string;
  accentColor: string;
}

export function PlayerStarCard({ player, statLabel, statValue, statSecondary, accentColor }: PlayerStarCardProps) {
  return (
    <div
      className="rounded-[26px] p-5 relative overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${accentColor}14 0%, rgba(11,34,28,0.98) 100%)`,
        border: `1px solid ${accentColor}22`,
      }}
    >
      <div
        className="absolute -right-6 -top-6 w-40 h-40 rounded-full"
        style={{ background: `radial-gradient(ellipse, ${accentColor}12 0%, transparent 70%)`, filter: 'blur(24px)' }}
      />
      <div className="relative flex items-center gap-4">
        <div className="flex-shrink-0 relative">
          <div className="w-[72px] h-[72px] rounded-[20px] overflow-hidden" style={{ border: `2px solid ${accentColor}40` }}>
            <img src={player.img} alt={`${player.firstName} ${player.name}`} className="w-full h-full object-cover" />
          </div>
          <div
            className="absolute -top-1.5 -right-1.5 w-6 h-6 rounded-full flex items-center justify-center"
            style={{ background: accentColor, border: '2px solid #0B221C' }}
          >
            <Crown size={10} style={{ color: '#0B221C' }} />
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 mb-0.5">
            <span className="text-[9px] font-black uppercase tracking-[0.22em]" style={{ color: '#8A938C' }}>Meilleur</span>
            <span className="text-[9px] font-black uppercase tracking-[0.22em]" style={{ color: accentColor }}>{statLabel}</span>
          </div>
          <h3 className="text-[20px] font-black tracking-tight leading-none mb-1" style={{ color: '#F2EEDC' }}>
            {player.firstName} {player.name}
          </h3>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: player.teamColor }} />
            <span className="text-[9px] font-semibold" style={{ color: '#8A938C' }}>{player.team}</span>
            <span className="text-[9px]">{player.nationality}</span>
          </div>
        </div>

        <div className="flex-shrink-0 flex flex-col items-end gap-1">
          <span className="text-[42px] font-black leading-none tracking-tighter" style={{ color: accentColor }}>
            {statValue}
          </span>
          <span className="text-[8px] font-black uppercase tracking-wider" style={{ color: '#8A938C' }}>{statLabel}</span>
          <span className="text-[9px] font-bold" style={{ color: '#8A938C' }}>{statSecondary}</span>
        </div>
      </div>
    </div>
  );
}
