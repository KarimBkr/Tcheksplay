import { useState, useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { AnimatePresence } from 'framer-motion';
import { ChevronLeft, LayoutDashboard } from 'lucide-react';
import { useAuth } from '@/features/auth/AuthContext';
import { useAdminData } from './hooks/useAdminData';
import { AdminSidebar } from './components/AdminSidebar';
import { AdminOverview } from './components/AdminOverview';
import { AdminRegistrations } from './components/AdminRegistrations';
import { AdminMatches } from './components/AdminMatches';
import { AdminScores } from './components/AdminScores';
import { AdminGroups } from './components/AdminGroups';
import type { AdminSection } from './types';

const SECTION_LABELS: Record<AdminSection, string> = {
  dashboard: 'Tableau de bord',
  editions: 'Éditions & Saisons',
  matches: 'Matchs',
  teams: 'Équipes',
  registrations: 'Inscriptions',
  scores: 'Scores & Stats',
  news: 'Actualités',
  media: 'Médias',
  solidarity: 'Projets Solidaires',
  sponsors: 'Sponsors',
  groups: 'Poules',
  bracket: 'Phase Finale',
};

export function AdminScreen() {
  const navigate = useNavigate();
  const { profile, loading: authLoading, firebaseUser } = useAuth();
  const isAdmin = profile?.role === 'admin';
  const data = useAdminData(Boolean(!authLoading && isAdmin));

  const [activeSection, setActiveSection] = useState<AdminSection>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (authLoading) return;
    if (!firebaseUser) {
      navigate({ to: '/login' });
      return;
    }
    if (!profile || profile.role !== 'admin') {
      navigate({ to: '/' });
    }
  }, [authLoading, firebaseUser, profile, navigate]);

  if (authLoading || !firebaseUser || !profile || profile.role !== 'admin') {
    return (
      <div className="flex items-center justify-center min-h-screen" style={{ background: '#0B221C' }}>
        <div className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin" style={{ borderColor: '#2E8F57', borderTopColor: 'transparent' }} />
      </div>
    );
  }

  if (data.loading) {
    return (
      <div className="flex items-center justify-center min-h-screen" style={{ background: '#0B221C' }}>
        <div className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin" style={{ borderColor: '#2E8F57', borderTopColor: 'transparent' }} />
      </div>
    );
  }

  const renderSection = () => {
    switch (activeSection) {
      case 'dashboard':
        return <AdminOverview stats={data.stats} blockers={data.blockers} notifications={data.notifications} />;
      case 'registrations':
        return (
          <AdminRegistrations
            registrations={data.registrations}
            onValidate={(id) => data.updateRegistrationStatus(id, 'validated')}
            onRefuse={(id) => data.updateRegistrationStatus(id, 'refused')}
          />
        );
      case 'matches':
        return <AdminMatches matches={data.matches} />;
      case 'scores':
        return <AdminScores scoreRecords={data.scoreRecords} />;
      case 'groups':
        return <AdminGroups validatedTeams={data.validatedTeams} />;
      default:
        return (
          <div className="flex items-center justify-center py-16">
            <div className="text-center">
              <p className="text-[14px] font-black" style={{ color: '#F2EEDC' }}>{SECTION_LABELS[activeSection]}</p>
              <p className="text-[11px] mt-1" style={{ color: '#8A938C' }}>En cours de développement</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen w-full" style={{ background: '#0B221C' }}>
      {/* Header */}
      <div className="sticky top-0 z-50 px-4 pt-4 pb-3 flex items-center gap-3" style={{ background: '#0B221C', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
        <button
          onClick={() => navigate({ to: '/' })}
          className="w-9 h-9 rounded-[11px] flex items-center justify-center"
          style={{ background: 'rgba(255,255,255,0.05)' }}
          aria-label="Retour"
        >
          <ChevronLeft size={16} style={{ color: '#8A938C' }} />
        </button>
        <button
          onClick={() => setSidebarOpen(true)}
          className="w-9 h-9 rounded-[11px] flex items-center justify-center"
          style={{ background: 'rgba(183,255,26,0.08)', border: '1px solid rgba(183,255,26,0.15)' }}
          aria-label="Ouvrir le menu"
        >
          <LayoutDashboard size={16} style={{ color: '#B7FF1A' }} />
        </button>
        <div className="flex-1 min-w-0">
          <p className="text-[9px] font-bold uppercase tracking-[0.15em]" style={{ color: '#5A6B5E' }}>Administration</p>
          <p className="text-[13px] font-black truncate" style={{ color: '#F2EEDC' }}>{SECTION_LABELS[activeSection]}</p>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-4">
        {renderSection()}
      </div>

      {/* Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <AdminSidebar
            activeSection={activeSection}
            onSelect={setActiveSection}
            onClose={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
