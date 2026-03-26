import { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Eye, EyeOff, Shield, User } from 'lucide-react';
import { useAuth } from './AuthContext';
import { useRouter } from '@tanstack/react-router';

const DEMO_ACCOUNTS = [
  { email: 'killian@tcheksplay.fr', password: 'admin123', name: 'Killian Bersot', role: 'admin' as const, avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=80&h=80' },
  { email: 'yassin@tcheksplay.fr', password: 'joueur123', name: 'Yassin Mebrouk', role: 'player' as const, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&h=80' },
];

export function LoginScreen() {
  const { signIn } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await signIn(email.trim().toLowerCase(), password);
      router.navigate({ to: '/' });
    } catch {
      setError('Email ou mot de passe incorrect.');
    } finally {
      setLoading(false);
    }
  }

  async function handleQuickLogin(account: (typeof DEMO_ACCOUNTS)[number]) {
    setLoading(true);
    try {
      await signIn(account.email, account.password);
      router.navigate({ to: '/' });
    } catch {
      setError('Compte démo non configuré dans Firebase.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen w-full flex flex-col" style={{ background: '#0B221C', color: '#F2EEDC' }}>
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[240px] rounded-full" style={{ opacity: 0.18, background: 'radial-gradient(ellipse, rgba(46,143,87,0.5) 0%, transparent 70%)' }} />
      </div>

      <div className="flex-1 flex flex-col justify-between px-5 pt-16 pb-10 relative z-10">
        <Logo />
        <LoginForm
          email={email}
          password={password}
          showPass={showPass}
          loading={loading}
          error={error}
          onEmailChange={setEmail}
          onPasswordChange={setPassword}
          onTogglePass={() => setShowPass((v) => !v)}
          onSubmit={handleSubmit}
        />
        <DemoAccounts accounts={DEMO_ACCOUNTS} loading={loading} onQuickLogin={handleQuickLogin} />
      </div>
    </div>
  );
}

function Logo() {
  return (
    <div className="flex flex-col items-center gap-5 mb-12">
      <div className="w-[68px] h-[68px] rounded-[22px] flex items-center justify-center" style={{ background: 'linear-gradient(145deg, #2E8F57, #123129)', boxShadow: '0 20px 60px rgba(46,143,87,0.3)', color: '#B7FF1A' }}>
        <Trophy size={30} />
      </div>
      <div className="text-center">
        <h1 className="text-[30px] font-black tracking-[-0.04em] uppercase leading-none" style={{ color: '#F2EEDC' }}>
          <span>Tcheks</span><span style={{ color: '#B7FF1A' }}>play</span>
        </h1>
        <p className="text-[10px] font-bold uppercase tracking-[0.3em] mt-1.5" style={{ color: '#8A938C' }}>L'Esprit du Playground</p>
      </div>
    </div>
  );
}

function LoginForm({ email, password, showPass, loading, error, onEmailChange, onPasswordChange, onTogglePass, onSubmit }: {
  email: string; password: string; showPass: boolean; loading: boolean; error: string;
  onEmailChange: (v: string) => void; onPasswordChange: (v: string) => void; onTogglePass: () => void; onSubmit: (e: React.FormEvent) => void;
}) {
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <div>
        <label htmlFor="login-email" className="text-[10px] font-black uppercase tracking-[0.18em] mb-2 block" style={{ color: '#8A938C' }}>Adresse email</label>
        <input id="login-email" type="email" value={email} onChange={(e) => onEmailChange(e.target.value)} placeholder="ton@email.fr" autoComplete="email" required className="w-full h-[52px] rounded-[16px] px-4 text-[14px] font-semibold outline-none transition-all" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#F2EEDC' }} />
      </div>
      <div>
        <label htmlFor="login-password" className="text-[10px] font-black uppercase tracking-[0.18em] mb-2 block" style={{ color: '#8A938C' }}>Mot de passe</label>
        <div className="relative">
          <input id="login-password" type={showPass ? 'text' : 'password'} value={password} onChange={(e) => onPasswordChange(e.target.value)} placeholder="••••••••" autoComplete="current-password" required className="w-full h-[52px] rounded-[16px] px-4 pr-12 text-[14px] font-semibold outline-none transition-all" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#F2EEDC' }} />
          <button type="button" onClick={onTogglePass} className="absolute right-3.5 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-[10px]" style={{ color: '#8A938C' }} aria-label={showPass ? 'Masquer' : 'Afficher'}>
            {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
      </div>
      {error && <p className="text-[12px] font-semibold px-3 py-2 rounded-[10px]" style={{ background: 'rgba(217,75,91,0.1)', color: '#D94B5B', border: '1px solid rgba(217,75,91,0.2)' }}>{error}</p>}
      <motion.button whileTap={{ scale: 0.97 }} type="submit" disabled={loading} className="h-[54px] rounded-[16px] text-[14px] font-black uppercase tracking-wider transition-all mt-1" style={{ background: loading ? 'rgba(183,255,26,0.5)' : '#B7FF1A', color: '#0B221C' }}>
        {loading ? 'Connexion...' : 'Se connecter'}
      </motion.button>
    </form>
  );
}

function DemoAccounts({ accounts, loading, onQuickLogin }: { accounts: typeof DEMO_ACCOUNTS; loading: boolean; onQuickLogin: (a: (typeof DEMO_ACCOUNTS)[number]) => void }) {
  return (
    <div className="mt-8">
      <div className="flex items-center gap-3 mb-3">
        <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.06)' }} />
        <span className="text-[9px] font-black uppercase tracking-[0.2em]" style={{ color: '#556A61' }}>Accès rapide (démo)</span>
        <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.06)' }} />
      </div>
      <div className="flex flex-col gap-2">
        {accounts.map((account) => (
          <motion.button key={account.email} whileTap={{ scale: 0.98 }} disabled={loading} onClick={() => onQuickLogin(account)} className="flex items-center gap-3 px-4 py-3 rounded-[16px] text-left" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
            <img src={account.avatar} alt={account.name} className="w-9 h-9 rounded-[11px] object-cover flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-black" style={{ color: '#F2EEDC' }}>{account.name}</p>
              <p className="text-[10px] font-semibold" style={{ color: '#8A938C' }}>{account.email}</p>
            </div>
            <div className="flex items-center gap-1.5 px-2 py-1 rounded-[8px] flex-shrink-0" style={{ background: account.role === 'admin' ? 'rgba(217,75,91,0.1)' : 'rgba(46,143,87,0.1)', border: `1px solid ${account.role === 'admin' ? 'rgba(217,75,91,0.2)' : 'rgba(46,143,87,0.2)'}`, color: account.role === 'admin' ? '#D94B5B' : '#35D07F' }}>
              {account.role === 'admin' ? <Shield size={9} /> : <User size={9} />}
              <span className="text-[8px] font-black uppercase tracking-wide">{account.role === 'admin' ? 'Admin' : 'Joueur'}</span>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
