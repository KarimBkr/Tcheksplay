import { TrendingUp, AlertTriangle, Users, CheckCircle, Bell } from 'lucide-react';
import type { AdminStat, SeasonBlocker, AdminNotif } from '../types';

const BLOCKER_COLORS: Record<SeasonBlocker['severity'], { dot: string; bg: string; border: string }> = {
  high: { dot: '#D94B5B', bg: 'rgba(217,75,91,0.08)', border: 'rgba(217,75,91,0.18)' },
  medium: { dot: '#F4C542', bg: 'rgba(244,197,66,0.06)', border: 'rgba(244,197,66,0.15)' },
  low: { dot: '#7BA7D9', bg: 'rgba(123,167,217,0.06)', border: 'rgba(123,167,217,0.15)' },
};

const NOTIF_ICON: Record<AdminNotif['type'], { icon: React.ReactNode; color: string }> = {
  registration: { icon: <Users size={12} />, color: '#7BA7D9' },
  score: { icon: <CheckCircle size={12} />, color: '#B7FF1A' },
  alert: { icon: <AlertTriangle size={12} />, color: '#F4C542' },
  info: { icon: <Bell size={12} />, color: '#C9C1A2' },
};

interface AdminOverviewProps {
  stats: AdminStat[];
  blockers: SeasonBlocker[];
  notifications: AdminNotif[];
}

export function AdminOverview({ stats, blockers, notifications }: AdminOverviewProps) {
  return (
    <div className="flex flex-col gap-5">
      {/* Stat cards */}
      <div className="grid grid-cols-2 gap-3">
        {stats.map(stat => (
          <div
            key={stat.id}
            className="rounded-[16px] p-4 flex flex-col gap-1"
            style={{ background: '#123129', border: '1px solid rgba(255,255,255,0.05)' }}
          >
            <p className="text-[22px] font-black leading-none" style={{ color: stat.color }}>
              {stat.value}
            </p>
            <p className="text-[11px] font-semibold" style={{ color: '#D7DBC8' }}>{stat.label}</p>
            {stat.delta && (
              <span className="text-[9px] flex items-center gap-1 mt-0.5" style={{ color: stat.positive ? '#B7FF1A' : '#F4C542' }}>
                {stat.positive && <TrendingUp size={9} />}
                {stat.delta}
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Blockers */}
      {blockers.length > 0 && (
        <div className="rounded-[16px] p-4 flex flex-col gap-2.5" style={{ background: '#123129', border: '1px solid rgba(255,255,255,0.05)' }}>
          <p className="text-[10px] font-black uppercase tracking-[0.15em]" style={{ color: '#F4C542' }}>
            <AlertTriangle size={10} className="inline mr-1" style={{ verticalAlign: 'middle' }} />
            Bloquants saison
          </p>
          {blockers.map(b => {
            const bc = BLOCKER_COLORS[b.severity];
            return (
              <div
                key={b.id}
                className="flex items-center gap-2.5 px-3 py-2 rounded-[10px]"
                style={{ background: bc.bg, border: `1px solid ${bc.border}` }}
              >
                <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: bc.dot }} />
                <span className="text-[11px] font-semibold flex-1" style={{ color: '#D7DBC8' }}>
                  {b.count} {b.label}
                </span>
              </div>
            );
          })}
        </div>
      )}

      {/* Notifications */}
      <div className="rounded-[16px] p-4 flex flex-col gap-2.5" style={{ background: '#123129', border: '1px solid rgba(255,255,255,0.05)' }}>
        <p className="text-[10px] font-black uppercase tracking-[0.15em]" style={{ color: '#C9C1A2' }}>
          Notifications récentes
        </p>
        {notifications.map(n => {
          const meta = NOTIF_ICON[n.type];
          return (
            <div
              key={n.id}
              className="flex items-start gap-2.5 px-3 py-2.5 rounded-[10px]"
              style={{ background: n.read ? 'transparent' : 'rgba(183,255,26,0.03)', border: `1px solid ${n.read ? 'rgba(255,255,255,0.03)' : 'rgba(183,255,26,0.08)'}` }}
            >
              <span className="mt-0.5 flex-shrink-0" style={{ color: meta.color }}>{meta.icon}</span>
              <div className="flex-1 min-w-0">
                <p className="text-[11px] font-medium leading-snug" style={{ color: '#D7DBC8' }}>{n.text}</p>
                <p className="text-[9px] mt-0.5" style={{ color: '#5A6B5E' }}>{n.time}</p>
              </div>
              {!n.read && <span className="w-1.5 h-1.5 rounded-full mt-1 flex-shrink-0" style={{ background: '#B7FF1A' }} />}
            </div>
          );
        })}
      </div>
    </div>
  );
}
