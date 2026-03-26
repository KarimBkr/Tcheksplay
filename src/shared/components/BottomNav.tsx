import { Calendar, Newspaper, Radio } from 'lucide-react';
import { useRouter, useLocation } from '@tanstack/react-router';

const TABS = [
  {
    path: '/',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
    label: 'Accueil',
  },
  {
    path: '/matches',
    icon: <Calendar size={22} />,
    label: 'Matchs',
  },
  {
    path: '/feed',
    icon: <Newspaper size={22} />,
    label: 'Actu',
  },
  {
    path: '/more',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="5" r="1" />
        <circle cx="12" cy="12" r="1" />
        <circle cx="12" cy="19" r="1" />
      </svg>
    ),
    label: 'Plus',
  },
] as const;

export function BottomNav() {
  const router = useRouter();
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50" style={{ width: 'calc(100% - 32px)', maxWidth: 400 }}>
      <div
        className="flex items-center justify-around h-[62px] rounded-[30px] px-2"
        style={{
          background: 'rgba(15,35,28,0.96)',
          backdropFilter: 'blur(28px)',
          border: '1px solid rgba(255,255,255,0.08)',
          boxShadow: '0 20px 60px rgba(0,0,0,0.55)',
        }}
      >
        {TABS.map((tab) => {
          const isActive = currentPath === tab.path || (tab.path !== '/' && currentPath.startsWith(tab.path));
          return (
            <button
              key={tab.path}
              onClick={() => router.navigate({ to: tab.path })}
              aria-label={tab.label}
              className="relative flex flex-col items-center justify-center gap-0.5 w-14 h-12 rounded-[18px] transition-all duration-200"
              style={{
                color: isActive ? '#B7FF1A' : '#556A61',
                background: isActive ? 'rgba(183,255,26,0.08)' : 'transparent',
              }}
            >
              {tab.icon}
              <span className="text-[9px] font-black uppercase tracking-wide" style={{ color: isActive ? '#B7FF1A' : '#556A61' }}>
                {tab.label}
              </span>
            </button>
          );
        })}

        <div className="absolute left-1/2 -translate-x-1/2 -top-5">
          <button
            aria-label="Voir le match en direct"
            onClick={() => router.navigate({ to: '/matches/live' })}
            className="w-[54px] h-[54px] rounded-[20px] flex items-center justify-center transition-all active:scale-95"
            style={{
              background: 'linear-gradient(145deg, #8E2B36, #5C1B23)',
              boxShadow: '0 8px 32px rgba(142,43,54,0.5), 0 0 0 1px rgba(183,255,26,0.12)',
              color: '#F2EEDC',
            }}
          >
            <Radio size={22} />
          </button>
        </div>
      </div>
    </nav>
  );
}
