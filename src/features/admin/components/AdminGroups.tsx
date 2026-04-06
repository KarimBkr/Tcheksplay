import { useState } from 'react';
import { Shuffle, Award, MapPin, CheckCircle, AlertTriangle } from 'lucide-react';
import type { PoolTeam, Pool, DistributionMode, GroupsState } from '../types';

const DISTRIBUTION_MODES: { id: DistributionMode; label: string; desc: string; icon: React.ReactNode }[] = [
  { id: 'random', label: 'Aléatoire', desc: 'Répartition purement aléatoire', icon: <Shuffle size={14} /> },
  { id: 'seeded', label: 'Seedée S2/S3', desc: 'Têtes de série selon classement', icon: <Award size={14} /> },
  { id: 'no_derbies', label: 'Sans derbies', desc: 'Évite les mêmes communes', icon: <MapPin size={14} /> },
];

const POOL_LABELS = ['A', 'B', 'C', 'D', 'E', 'F'];

function generatePools(teams: PoolTeam[], poolCount: number, mode: DistributionMode): Pool[] {
  let ordered: PoolTeam[];
  if (mode === 'seeded') {
    ordered = [...teams].sort((a, b) => (a.seed ?? 99) - (b.seed ?? 99));
  } else {
    ordered = [...teams].sort(() => Math.random() - 0.5);
  }
  const pools: Pool[] = Array.from({ length: poolCount }, (_, i) => ({
    id: `pool-${i}`,
    label: POOL_LABELS[i],
    teams: [],
  }));
  ordered.forEach((team, idx) => {
    pools[idx % poolCount].teams.push(team);
  });
  return pools;
}

interface AdminGroupsProps {
  validatedTeams: PoolTeam[];
}

export function AdminGroups({ validatedTeams }: AdminGroupsProps) {
  const [state, setState] = useState<GroupsState>('idle');
  const [poolCount, setPoolCount] = useState(4);
  const [mode, setMode] = useState<DistributionMode>('random');
  const [pools, setPools] = useState<Pool[]>([]);

  const handleGenerate = () => {
    setPools(generatePools(validatedTeams, poolCount, mode));
    setState('generated');
  };

  const handleConfirm = () => setState('confirmed');
  const handleReset = () => { setPools([]); setState('idle'); };

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-[14px] font-black" style={{ color: '#F2EEDC' }}>
        Génération des Poules
        <span className="ml-2 text-[10px] font-medium" style={{ color: '#8A938C' }}>
          {validatedTeams.length} équipes validées
        </span>
      </h2>

      {/* Distribution mode */}
      <div className="flex flex-col gap-2">
        {DISTRIBUTION_MODES.map(dm => (
          <button
            key={dm.id}
            onClick={() => setMode(dm.id)}
            className="flex items-center gap-3 px-3.5 py-3 rounded-[12px] text-left transition-all"
            style={mode === dm.id
              ? { background: 'rgba(183,255,26,0.08)', border: '1px solid rgba(183,255,26,0.15)' }
              : { background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.04)' }}
          >
            <span style={{ color: mode === dm.id ? '#B7FF1A' : '#8A938C' }}>{dm.icon}</span>
            <div>
              <p className="text-[11px] font-bold" style={{ color: mode === dm.id ? '#B7FF1A' : '#D7DBC8' }}>{dm.label}</p>
              <p className="text-[9px]" style={{ color: '#5A6B5E' }}>{dm.desc}</p>
            </div>
          </button>
        ))}
      </div>

      {/* Pool count */}
      <div className="flex items-center gap-3">
        <span className="text-[10px] font-semibold" style={{ color: '#8A938C' }}>Nombre de poules</span>
        <div className="flex gap-1.5">
          {[3, 4, 5].map(n => (
            <button
              key={n}
              onClick={() => setPoolCount(n)}
              className="w-8 h-8 rounded-[8px] text-[12px] font-bold"
              style={poolCount === n
                ? { background: 'rgba(183,255,26,0.12)', color: '#B7FF1A', border: '1px solid rgba(183,255,26,0.2)' }
                : { background: 'rgba(255,255,255,0.04)', color: '#8A938C', border: '1px solid transparent' }}
            >
              {n}
            </button>
          ))}
        </div>
      </div>

      {/* Generate / Confirm / Reset */}
      <div className="flex gap-2">
        {state === 'idle' && (
          <button onClick={handleGenerate} className="flex-1 py-2.5 rounded-[12px] text-[11px] font-black" style={{ background: '#B7FF1A', color: '#0B221C' }}>
            Générer les poules
          </button>
        )}
        {state === 'generated' && (
          <>
            <button onClick={handleConfirm} className="flex-1 py-2.5 rounded-[12px] text-[11px] font-black flex items-center justify-center gap-1.5" style={{ background: '#B7FF1A', color: '#0B221C' }}>
              <CheckCircle size={12} /> Confirmer
            </button>
            <button onClick={handleGenerate} className="px-4 py-2.5 rounded-[12px] text-[11px] font-bold" style={{ background: 'rgba(255,255,255,0.06)', color: '#D7DBC8' }}>
              Regénérer
            </button>
          </>
        )}
        {state === 'confirmed' && (
          <div className="flex-1 flex items-center justify-between">
            <span className="text-[11px] font-bold flex items-center gap-1.5" style={{ color: '#B7FF1A' }}>
              <CheckCircle size={12} /> Poules confirmées
            </span>
            <button onClick={handleReset} className="text-[10px] font-semibold" style={{ color: '#D94B5B' }}>
              Réinitialiser
            </button>
          </div>
        )}
      </div>

      {/* Pool grid */}
      {pools.length > 0 && (
        <div className="grid grid-cols-2 gap-2.5">
          {pools.map(pool => (
            <div key={pool.id} className="rounded-[14px] p-3 flex flex-col gap-2" style={{ background: '#123129', border: '1px solid rgba(255,255,255,0.05)' }}>
              <p className="text-[10px] font-black uppercase tracking-[0.15em]" style={{ color: '#B7FF1A' }}>
                Poule {pool.label}
              </p>
              {pool.teams.map(team => (
                <div key={team.id} className="flex items-center gap-2 px-2 py-1.5 rounded-[8px]" style={{ background: 'rgba(255,255,255,0.03)' }}>
                  <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: team.color }} />
                  <span className="text-[10px] font-semibold truncate" style={{ color: '#D7DBC8' }}>{team.name}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}

      {state === 'idle' && pools.length === 0 && (
        <div className="flex items-center justify-center py-8 rounded-[14px]" style={{ background: '#123129', border: '1px dashed rgba(255,255,255,0.08)' }}>
          <span className="text-[11px] flex items-center gap-1.5" style={{ color: '#5A6B5E' }}>
            <AlertTriangle size={12} /> Configurez et générez les poules
          </span>
        </div>
      )}
    </div>
  );
}
