import { Outlet } from '@tanstack/react-router';

export function RootLayout() {
  return (
    <div
      className="min-h-screen w-full font-sans overflow-x-hidden"
      style={{ background: '#0B221C', color: '#F2EEDC' }}
    >
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[240px] rounded-full"
          style={{
            opacity: 0.18,
            background: 'radial-gradient(ellipse, rgba(46,143,87,0.5) 0%, transparent 70%)',
          }}
        />
      </div>
      <div className="relative z-10">
        <Outlet />
      </div>
    </div>
  );
}
