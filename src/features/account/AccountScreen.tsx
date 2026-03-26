import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, User, Settings, ChevronRight, LogOut, Shield } from 'lucide-react';
import { useAuth } from '@/features/auth/AuthContext';
import { LogoutConfirmModal } from '@/features/auth/LogoutConfirmModal';
import { useRouter } from '@tanstack/react-router';

export function AccountScreen() {
  const { profile, signOut } = useAuth();
  const router = useRouter();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  if (!profile) return null;

  const isAdmin = profile.role === 'admin';

  async function handleLogout() {
    await signOut();
    router.navigate({ to: '/login' });
  }

  return (
    <div className="px-5 pt-2 pb-8">
      <header className="pt-12 pb-6">
        <h1 className="text-[26px] font-black tracking-[-0.04em] uppercase leading-none" style={{ color: '#F2EEDC' }}>Compte</h1>
        <p className="text-[11px] font-semibold mt-1" style={{ color: '#8A938C' }}>Paramètres & identité</p>
      </header>

      <UserCard profile={profile} isAdmin={isAdmin} />

      <Section title="Paramètres">
        <SettingsItem icon={<Bell size={18} />} label="Notifications" desc="Alertes matchs & actu" />
        <SettingsItem icon={<User size={18} />} label="Mon profil joueur" desc={`${profile.team} · Statistiques`} onClick={() => router.navigate({ to: '/players' })} />
      </Section>

      {isAdmin && (
        <Section title="Administration">
          <motion.button whileTap={{ scale: 0.98 }} onClick={() => router.navigate({ to: '/admin' })} className="flex items-center gap-4 p-4 rounded-[20px] text-left w-full" style={{ background: 'rgba(217,75,91,0.05)', border: '1px solid rgba(217,75,91,0.15)' }}>
            <div className="w-11 h-11 rounded-[14px] flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(217,75,91,0.12)', color: '#D94B5B' }}>
              <Settings size={20} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <p className="text-[14px] font-black leading-none" style={{ color: '#F2EEDC' }}>Back-office</p>
                <span className="px-1.5 py-0.5 rounded-[6px] text-[7px] font-black uppercase tracking-wider" style={{ background: 'rgba(217,75,91,0.12)', color: '#D94B5B', border: '1px solid rgba(217,75,91,0.2)' }}>Admin</span>
              </div>
              <p className="text-[11px] font-semibold" style={{ color: '#8A938C' }}>Gestion · Commission sportive</p>
            </div>
            <ChevronRight size={16} style={{ color: '#556A61', flexShrink: 0 }} />
          </motion.button>
        </Section>
      )}

      <Section title="Session">
        <motion.button whileTap={{ scale: 0.98 }} onClick={() => setShowLogoutModal(true)} className="flex items-center gap-4 p-4 rounded-[20px] text-left w-full" style={{ background: 'rgba(217,75,91,0.05)', border: '1px solid rgba(217,75,91,0.12)' }}>
          <div className="w-11 h-11 rounded-[14px] flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(217,75,91,0.1)', color: '#D94B5B' }}>
            <LogOut size={20} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[14px] font-black leading-none" style={{ color: '#D94B5B' }}>Se déconnecter</p>
            <p className="text-[11px] font-semibold mt-0.5" style={{ color: '#8A938C' }}>Quitter la session {profile.name}</p>
          </div>
        </motion.button>
      </Section>

      <AnimatePresence>
        {showLogoutModal && <LogoutConfirmModal user={profile} onConfirm={handleLogout} onCancel={() => setShowLogoutModal(false)} />}
      </AnimatePresence>
    </div>
  );
}

function UserCard({ profile, isAdmin }: { profile: { name: string; email: string; team: string; avatar: string }; isAdmin: boolean }) {
  return (
    <div className="w-full flex items-center gap-4 p-4 rounded-[22px] mb-5 text-left" style={{ background: 'rgba(183,255,26,0.04)', border: '1px solid rgba(183,255,26,0.1)' }}>
      <div className="relative flex-shrink-0">
        <img src={profile.avatar} alt={profile.name} className="w-14 h-14 rounded-[16px] object-cover" style={{ border: '2px solid rgba(183,255,26,0.3)' }} />
        {isAdmin && <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-[6px] flex items-center justify-center" style={{ background: '#D94B5B' }}><Shield size={9} style={{ color: '#fff' }} /></div>}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <p className="text-[15px] font-black" style={{ color: '#F2EEDC' }}>{profile.name}</p>
          {isAdmin && <span className="px-1.5 py-0.5 rounded-[6px] text-[7px] font-black uppercase tracking-wider" style={{ background: 'rgba(217,75,91,0.12)', color: '#D94B5B', border: '1px solid rgba(217,75,91,0.2)' }}>Admin</span>}
        </div>
        <p className="text-[11px] font-semibold" style={{ color: '#8A938C' }}>{profile.email}</p>
        <p className="text-[10px] font-semibold mt-0.5" style={{ color: '#556A61' }}>{profile.team}</p>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-5">
      <div className="flex items-center gap-3 mb-3">
        <span className="text-[9px] font-black uppercase tracking-[0.22em]" style={{ color: '#556A61' }}>{title}</span>
        <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.05)' }} />
      </div>
      <div className="flex flex-col gap-2">{children}</div>
    </div>
  );
}

function SettingsItem({ icon, label, desc, onClick }: { icon: React.ReactNode; label: string; desc: string; onClick?: () => void }) {
  return (
    <motion.button whileTap={{ scale: 0.98 }} onClick={onClick} className="flex items-center gap-4 p-4 rounded-[20px] text-left w-full" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
      <div className="w-11 h-11 rounded-[14px] flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(46,143,87,0.12)', color: '#2E8F57' }}>{icon}</div>
      <div className="flex-1 min-w-0">
        <p className="text-[14px] font-black leading-none" style={{ color: '#F2EEDC' }}>{label}</p>
        <p className="text-[11px] font-semibold mt-0.5" style={{ color: '#8A938C' }}>{desc}</p>
      </div>
      <ChevronRight size={16} style={{ color: '#556A61', flexShrink: 0 }} />
    </motion.button>
  );
}
