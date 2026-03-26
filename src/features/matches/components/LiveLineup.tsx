import { useState } from 'react';
import { Shield } from 'lucide-react';
import type { LiveLineupPlayer, BenchPlayer } from '../types';

interface LiveLineupProps {
  homeLineup: LiveLineupPlayer[];
  awayLineup: LiveLineupPlayer[];
  homeBench: BenchPlayer[];
  awayBench: BenchPlayer[];
}

function rColor(r: number) { return r >= 8.5 ? '#B7FF1A' : r >= 7.5 ? '#35D07F' : r >= 6.5 ? '#F4C542' : r >= 5.5 ? '#FF8C42' : '#D94B5B'; }
function rBg(r: number) { return r >= 8.5 ? 'rgba(183,255,26,0.22)' : r >= 7.5 ? 'rgba(53,208,127,0.22)' : r >= 6.5 ? 'rgba(244,197,66,0.22)' : r >= 5.5 ? 'rgba(255,140,66,0.22)' : 'rgba(217,75,91,0.22)'; }

const ROWS: number[][] = [[0], [1, 2], [3, 4, 5], [6]];

export function LiveLineup({ homeLineup, awayLineup, homeBench, awayBench }: LiveLineupProps) {
  const [lineupTeam, setLineupTeam] = useState<'home' | 'away'>('home');
  const lineup = lineupTeam === 'home' ? homeLineup : awayLineup;
  const bench = lineupTeam === 'home' ? homeBench : awayBench;
  const teamName = lineupTeam === 'home' ? 'Annecy FC' : 'Seynod City';
  const avg = (lineup.reduce((s, p) => s + (p.rating ?? 0), 0) / lineup.filter(p => p.rating).length).toFixed(1);

  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-[18px] px-4 py-3 flex items-center justify-between" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-[10px] flex items-center justify-center flex-shrink-0" style={{ background: lineupTeam === 'home' ? 'rgba(46,143,87,0.2)' : 'rgba(255,255,255,0.07)', border: lineupTeam === 'home' ? '1px solid rgba(46,143,87,0.3)' : '1px solid rgba(255,255,255,0.1)' }}>
            <Shield size={14} style={{ color: lineupTeam === 'home' ? '#2E8F57' : '#8A938C' }} />
          </div>
          <div>
            <p className="text-[13px] font-black leading-none" style={{ color: '#F2EEDC' }}>{teamName}</p>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="text-[9px] font-black px-1.5 py-0.5 rounded" style={{ background: 'rgba(244,197,66,0.18)', color: '#F4C542' }}>{avg}</span>
              <span className="text-[9px] font-semibold" style={{ color: '#8A938C' }}>Note moy.</span>
            </div>
          </div>
        </div>
        <span className="text-[10px] font-black px-2.5 py-1 rounded-md" style={{ background: 'rgba(255,255,255,0.06)', color: '#8A938C' }}>1-2-3-1</span>
      </div>

      <div className="flex items-center rounded-full p-1" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
        {(['home', 'away'] as const).map(team => (
          <button key={team} onClick={() => setLineupTeam(team)} className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-full text-[11px] font-black transition-all" style={lineupTeam === team ? { background: '#F2EEDC', color: '#0B221C' } : { color: '#8A938C' }}>
            <Shield size={11} style={{ color: lineupTeam === team ? (team === 'home' ? '#2E8F57' : '#3B5BDB') : '#8A938C' }} />
            <span>{team === 'home' ? 'Annecy FC' : 'Seynod City'}</span>
          </button>
        ))}
      </div>

      <div className="rounded-[20px] overflow-hidden" style={{ background: 'linear-gradient(180deg, #0d2a1e 0%, #102e22 40%, #0d2a1e 100%)', border: '1px solid rgba(255,255,255,0.07)' }}>
        <div className="relative z-10 flex flex-col justify-between py-6 px-2" style={{ minHeight: 420 }}>
          {[...ROWS].reverse().map((row, ri) => (
            <div key={ri} className="flex items-center justify-around">
              {row.map(pi => {
                const p = lineup[pi];
                if (!p) return null;
                const goal = (p.goals ?? 0) > 0;
                const rc = p.rating ? rColor(p.rating) : '#8A938C';
                const rb = p.rating ? rBg(p.rating) : 'rgba(138,147,140,0.15)';
                return (
                  <div key={p.id} className="flex flex-col items-center gap-1" style={{ minWidth: 60 }}>
                    <div className="relative">
                      <div className="w-12 h-12 rounded-full overflow-hidden" style={{ border: goal ? '2.5px solid #B7FF1A' : '2px solid rgba(255,255,255,0.18)', boxShadow: goal ? '0 0 8px rgba(183,255,26,0.4)' : 'none' }}><img src={p.img} alt={p.name} className="w-full h-full object-cover" /></div>
                      {goal && <div className="absolute -top-1 -left-1 w-5 h-5 rounded-full flex items-center justify-center" style={{ background: 'rgba(11,34,28,0.95)', border: '1.5px solid #B7FF1A' }}><span style={{ fontSize: 9 }}>⚽</span></div>}
                      {p.yellowCard && <div className="absolute -top-1 -right-1 rounded-[2px]" style={{ background: '#F4C542', width: 9, height: 13 }} />}
                      {p.isCaptain && <div className="absolute -bottom-0.5 -left-0.5 w-4 h-4 rounded-full flex items-center justify-center" style={{ background: '#C9C1A2' }}><span style={{ fontSize: 7, color: '#0B221C', fontWeight: 900 }}>C</span></div>}
                    </div>
                    {p.rating != null && <div className="px-2 py-0.5 rounded-[5px]" style={{ background: rb, border: `1px solid ${rc}50`, minWidth: 36 }}><span className="text-[10px] font-black tabular-nums leading-none" style={{ color: rc }}>{p.rating.toFixed(1)}</span></div>}
                    <span className="text-[10px] font-black leading-none" style={{ color: '#F2EEDC' }}>{p.number} <span style={{ color: '#C9C1A2' }}>{p.name.split(' ')[0]}</span></span>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <h2 className="text-[10px] font-black uppercase tracking-[0.2em] mb-3" style={{ color: '#8A938C' }}>Banc</h2>
        <div className="rounded-[20px] overflow-hidden" style={{ background: '#0F2B23', border: '1px solid rgba(255,255,255,0.07)' }}>
          {bench.map((p, i) => (
            <div key={p.id} className="flex items-center gap-3 px-4 py-3" style={{ borderBottom: i < bench.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
              <div className="w-9 h-9 rounded-full overflow-hidden flex-shrink-0" style={{ border: '1.5px solid rgba(123,167,217,0.25)', opacity: 0.85 }}><img src={p.img} alt={p.name} className="w-full h-full object-cover" /></div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5"><span className="text-[9px] font-black px-1 py-0.5 rounded" style={{ background: 'rgba(255,255,255,0.06)', color: '#8A938C' }}>{p.number}</span><p className="text-[12px] font-black truncate" style={{ color: '#D7DBC8' }}>{p.name}</p></div>
                <p className="text-[9px] font-semibold mt-0.5" style={{ color: '#8A938C' }}>{p.position}</p>
              </div>
              <div className="px-2 py-0.5 rounded-md" style={{ background: 'rgba(123,167,217,0.08)', border: '1px solid rgba(123,167,217,0.15)' }}><span className="text-[8px] font-black" style={{ color: '#7BA7D9' }}>REM</span></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
