import { Outlet } from '@tanstack/react-router';
import { BottomNav } from '@/shared/components/BottomNav';

export function AuthLayout() {
  return (
    <div className="pb-32">
      <Outlet />
      <BottomNav />
    </div>
  );
}
