import { motion } from 'framer-motion';
import { Crown, Star, Award } from 'lucide-react';
import type { TeamRank } from '../types';

function FormDot({ result }: { result: 'W' | 'D' | 'L' }) {
  const bg = result === 'W' ? '#35D07F' : result === 'D' ? '#F4C542' : '#D94B5B';
  return (
    <div
      className="w-[18px] h-[18px] rounded-full flex items-center justify-center flex-shrink-0"
      style={{ background: `${bg}18`, border: `1.5px solid ${bg}` }}
    >
      <span className="text-[7px] font-black" style={{ color: bg }}>{result}</span>
    </div>
  );
}

function BadgePill({ type }: { type: 'champion' | 'mvp' | 'fairplay' }) {
  const map = {
    champion: { label: 'Champion', color: '#B7FF1A', bg: 'rgba(183,255,26,0.1)', border: 'rgba(183,255,26,0.22)', icon: <Crown size={7} /> },
    mvp:      { label: 'MVP',      color: '#C9C1A2', bg: 'rgba(201,193,162,0.1)', border: 'rgba(201,193,162,0.22)', icon: <Star size={7} /> },
    fairplay: { label: 'Fair-play', color: '#7BA7D9', bg: 'rgba(123,167,217,0.1)', border: 'rgba(123,167,217,0.22)', icon: <Award size={7} /> },
  };
  const m = map[type];
  return (
    <div className="flex items-center gap-1 px-2 py-0.5 rounded-full flex-shrink-0" style={{ background: m.bg, border: `1px solid ${m.border}` }}>
      <span style={{ color: m.color }}>{m.icon}</span>
      <span className="text-[7px] font-black uppercase tracking-wide" style={{ color: m.color }}>{m.label}</span>
    </div>
  );
}

export function TeamsTable({ teams }: { teams: TeamRank[] }) {
  return (
    <div className="flex flex-col gap-2.5">
      <div className="flex items-center px-3 pb-2" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ width: 22 }} />
        <div style={{ width: 14 }} />
        <div className="flex-1 ml-3" />
        <div className="flex items-center text-[8px] font-black uppercase tracking-widest" style={{ color: '#8A938C' }}>
          <span className="w-[26px] text-center">MJ</span>
          <span className="w-[22px] text-center" style={{ color: '#35D07F' }}>V</span>
          <span className="w-[22px] text-center" style={{ color: '#F4C542' }}>N</span>
          <span className="w-[22px] text-center" style={{ color: '#D94B5B' }}>D</span>
          <span className="w-[28px] text-center" style={{ color: '#35D07F' }}>BP</span>
          <span className="w-[28px] text-center" style={{ color: '#D94B5B' }}>BC</span>
          <span className="w-[34px] text-center">Pts</span>
        </div>
      </div>

      {teams.map((team, i) => {
        const isLeader = i === 0;
        const isPodium = i < 3;
        return (
          <motion.div
            key={team.id}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className="rounded-[20px] overflow-hidden"
            style={{
              background: isLeader
                ? 'linear-gradient(135deg, rgba(46,143,87,0.14) 0%, rgba(18,49,41,0.95) 100%)'
                : i % 2 === 0 ? '#123129' : 'rgba(18,49,41,0.7)',
              border: isLeader ? '1px solid rgba(183,255,26,0.15)' : '1px solid rgba(255,255,255,0.04)',
            }}
          >
            {isLeader && (
              <div className="h-[2px]" style={{ background: 'linear-gradient(90deg, transparent, rgba(183,255,26,0.5), transparent)' }} />
            )}
            <div className="flex items-center px-3 py-3">
              <div className="w-[22px] flex items-center justify-center flex-shrink-0">
                {isLeader
                  ? <Crown size={12} style={{ color: '#B7FF1A' }} />
                  : <span className="text-[11px] font-black" style={{ color: isPodium ? '#C9C1A2' : '#556A61' }}>{team.rank}</span>}
              </div>
              <div className="w-[10px] h-[10px] rounded-full ml-1 mr-2.5 flex-shrink-0" style={{ background: team.color }} />
              <div className="flex-1 min-w-0 flex items-center gap-2 mr-2">
                <span className="text-[12px] font-black truncate" style={{ color: isLeader ? '#F2EEDC' : '#D7DBC8' }}>
                  {team.name}
                </span>
                {team.badge && <BadgePill type={team.badge} />}
              </div>
              <div className="flex items-center text-[11px] font-bold flex-shrink-0 tabular-nums">
                <span className="w-[26px] text-center" style={{ color: '#8A938C' }}>{team.played}</span>
                <span className="w-[22px] text-center" style={{ color: '#35D07F' }}>{team.wins}</span>
                <span className="w-[22px] text-center" style={{ color: '#F4C542' }}>{team.draws}</span>
                <span className="w-[22px] text-center" style={{ color: '#D94B5B' }}>{team.losses}</span>
                <span className="w-[28px] text-center" style={{ color: '#35D07F' }}>{team.goalsFor}</span>
                <span className="w-[28px] text-center" style={{ color: '#D94B5B' }}>{team.goalsAgainst}</span>
                <div className="w-[34px] flex items-center justify-center">
                  <span
                    className="text-[12px] font-black px-1.5 py-0.5 rounded-[7px]"
                    style={{
                      color: isLeader ? '#0B221C' : '#F2EEDC',
                      background: isLeader ? '#B7FF1A' : 'rgba(255,255,255,0.08)',
                    }}
                  >
                    {team.points}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1.5 px-3 pb-2.5">
              <span className="text-[7px] font-black uppercase tracking-widest mr-1" style={{ color: '#8A938C' }}>Forme</span>
              {team.form.map((r, fi) => <FormDot key={fi} result={r} />)}
              <div className="flex-1 flex justify-end">
                <span className="text-[8px] font-bold" style={{ color: team.goalDiff > 0 ? '#35D07F' : team.goalDiff < 0 ? '#D94B5B' : '#8A938C' }}>
                  {team.goalDiff > 0 ? '+' : ''}{team.goalDiff}
                </span>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
