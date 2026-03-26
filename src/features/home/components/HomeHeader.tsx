import { useRouter } from '@tanstack/react-router';
import { Bell } from 'lucide-react';
import type { AppUser } from '@/shared/types';

interface HomeHeaderProps {
  user: AppUser | null;
}

export function HomeHeader({ user }: HomeHeaderProps) {
  const router = useRouter();

  return (
    <header className="flex items-center justify-between px-5 pt-12 pb-4">
      <div className="flex-1 min-w-0">
        <h1
          className="text-[22px] font-black tracking-[-0.03em] uppercase leading-none"
          style={{ color: '#F2EEDC' }}
        >
          Tcheksplay
        </h1>
        <p
          className="text-[10px] font-bold tracking-[0.15em] uppercase mt-1"
          style={{ color: '#8A938C' }}
        >
          Summer Cup – Saison 3 · Annecy
        </p>
      </div>

      <div className="flex items-center gap-3">
        <button
          className="relative w-10 h-10 rounded-[14px] flex items-center justify-center"
          style={{
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.08)',
          }}
          aria-label="Notifications"
        >
          <Bell size={18} style={{ color: '#8A938C' }} />
          <span
            className="absolute top-2 right-2 w-2 h-2 rounded-full"
            style={{ background: '#B7FF1A', border: '2px solid #0B221C' }}
          />
        </button>

        <button
          onClick={() => router.navigate({ to: '/account' })}
          className="w-10 h-10 rounded-[14px] overflow-hidden flex-shrink-0"
          style={{ border: '2px solid rgba(46,143,87,0.4)' }}
          aria-label="Mon profil"
        >
          {user?.avatar ? (
            <img
              src={user.avatar}
              alt={user.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div
              className="w-full h-full flex items-center justify-center text-[13px] font-black"
              style={{ background: '#2E8F57', color: '#0B221C' }}
            >
              {user?.name?.charAt(0).toUpperCase() ?? '?'}
            </div>
          )}
        </button>
      </div>
    </header>
  );
}
