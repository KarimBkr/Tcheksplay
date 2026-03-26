import { Outlet, useRouter } from '@tanstack/react-router';
import { useAuth } from '@/features/auth/AuthContext';
import { BottomNav } from '@/shared/components/BottomNav';

export function AuthLayout() {
  const { profile, loading } = useAuth();
  const router = useRouter();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin" style={{ borderColor: '#2E8F57', borderTopColor: 'transparent' }} />
      </div>
    );
  }

  if (!profile) {
    router.navigate({ to: '/login' });
    return null;
  }

  return (
    <div className="pb-32">
      <Outlet />
      <BottomNav />
    </div>
  );
}
