import { useState } from 'react';
import { CheckCircle, XCircle, Users, MapPin, SortDesc } from 'lucide-react';
import type { PendingRegistration, RegFilterStatus, RegSortType } from '../types';

const STATUS_TABS: { id: RegFilterStatus; label: string }[] = [
  { id: 'pending', label: 'En attente' },
  { id: 'validated', label: 'Validées' },
  { id: 'refused', label: 'Refusées' },
];

const SORT_OPTIONS: { id: RegSortType; label: string }[] = [
  { id: 'newest', label: 'Plus récentes' },
  { id: 'oldest', label: 'Plus anciennes' },
  { id: 'players_desc', label: 'Plus de joueurs' },
  { id: 'players_asc', label: 'Moins de joueurs' },
];

interface AdminRegistrationsProps {
  registrations: PendingRegistration[];
  onValidate: (id: string) => void | Promise<void>;
  onRefuse: (id: string) => void | Promise<void>;
}

export function AdminRegistrations({ registrations: regs, onValidate, onRefuse }: AdminRegistrationsProps) {
  const [statusFilter, setStatusFilter] = useState<RegFilterStatus>('pending');
  const [sort, setSort] = useState<RegSortType>('oldest');
  const [sortOpen, setSortOpen] = useState(false);

  const filtered = regs.filter(r => r.status === statusFilter).sort((a, b) => {
    if (sort === 'newest') return a.submittedTimestamp - b.submittedTimestamp;
    if (sort === 'oldest') return b.submittedTimestamp - a.submittedTimestamp;
    if (sort === 'players_desc') return b.players - a.players;
    return a.players - b.players;
  });

  const pendingCount = regs.filter(r => r.status === 'pending').length;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-[14px] font-black" style={{ color: '#F2EEDC' }}>
          Inscriptions
          {pendingCount > 0 && (
            <span className="ml-2 text-[10px] px-2 py-0.5 rounded-full font-bold" style={{ background: 'rgba(244,197,66,0.12)', color: '#F4C542' }}>
              {pendingCount}
            </span>
          )}
        </h2>
        <div className="relative">
          <button onClick={() => setSortOpen(!sortOpen)} className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-[10px] text-[10px] font-semibold" style={{ background: 'rgba(255,255,255,0.05)', color: '#8A938C' }}>
            <SortDesc size={11} /> Trier
          </button>
          {sortOpen && (
            <div className="absolute right-0 top-full mt-1 rounded-[12px] overflow-hidden z-20" style={{ background: '#1A3D33', border: '1px solid rgba(255,255,255,0.08)', minWidth: 150 }}>
              {SORT_OPTIONS.map(o => (
                <button key={o.id} onClick={() => { setSort(o.id); setSortOpen(false); }} className="w-full text-left px-3 py-2 text-[11px] font-medium hover:bg-white/5" style={{ color: sort === o.id ? '#B7FF1A' : '#D7DBC8' }}>
                  {o.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Status tabs */}
      <div className="flex gap-2">
        {STATUS_TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => setStatusFilter(tab.id)}
            className="px-3 py-1.5 rounded-full text-[10px] font-bold transition-all"
            style={statusFilter === tab.id
              ? { background: 'rgba(183,255,26,0.12)', color: '#B7FF1A', border: '1px solid rgba(183,255,26,0.2)' }
              : { background: 'rgba(255,255,255,0.04)', color: '#8A938C', border: '1px solid transparent' }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Registration list */}
      <div className="flex flex-col gap-2.5">
        {filtered.length === 0 && (
          <p className="text-[11px] text-center py-6" style={{ color: '#5A6B5E' }}>Aucune inscription</p>
        )}
        {filtered.map(reg => (
          <div key={reg.id} className="rounded-[14px] p-4 flex flex-col gap-2.5" style={{ background: '#123129', border: '1px solid rgba(255,255,255,0.05)' }}>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-[10px] flex items-center justify-center text-[13px] font-black" style={{ background: `${reg.logoColor}20`, color: reg.logoColor }}>
                {reg.teamName.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[12px] font-bold truncate" style={{ color: '#F2EEDC' }}>{reg.teamName}</p>
                <p className="text-[9px] flex items-center gap-1" style={{ color: '#8A938C' }}>
                  <MapPin size={8} /> {reg.city} · {reg.captain}
                </p>
              </div>
              <span className="text-[9px] font-mono" style={{ color: '#5A6B5E' }}>{reg.code}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] flex items-center gap-1" style={{ color: '#8A938C' }}>
                <Users size={10} /> {reg.players} joueurs · {reg.submittedAt}
              </span>
              {reg.status === 'pending' && (
                <div className="flex gap-2">
                  <button type="button" onClick={() => void onValidate(reg.id)} className="flex items-center gap-1 px-2.5 py-1 rounded-[8px] text-[10px] font-bold" style={{ background: 'rgba(183,255,26,0.1)', color: '#B7FF1A' }}>
                    <CheckCircle size={10} /> Valider
                  </button>
                  <button type="button" onClick={() => void onRefuse(reg.id)} className="flex items-center gap-1 px-2.5 py-1 rounded-[8px] text-[10px] font-bold" style={{ background: 'rgba(217,75,91,0.1)', color: '#D94B5B' }}>
                    <XCircle size={10} /> Refuser
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
