import { motion } from 'framer-motion';
import { LogOut, X } from 'lucide-react';
import type { AppUser } from '@/shared/types';

interface Props {
  user: AppUser;
  onConfirm: () => void;
  onCancel: () => void;
}

export function LogoutConfirmModal({ user, onConfirm, onCancel }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] flex items-end justify-center px-4 pb-8"
      style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)' }}
      onClick={onCancel}
    >
      <motion.div
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 60, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 320, damping: 30 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-sm rounded-[28px] overflow-hidden"
        style={{ background: '#142E25', border: '1px solid rgba(255,255,255,0.09)' }}
      >
        <div className="px-6 pt-6 pb-5">
          <div className="flex items-center justify-between mb-5">
            <div className="w-11 h-11 rounded-[14px] flex items-center justify-center" style={{ background: 'rgba(217,75,91,0.12)', color: '#D94B5B' }}>
              <LogOut size={20} />
            </div>
            <button onClick={onCancel} className="w-9 h-9 rounded-[11px] flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.05)', color: '#8A938C' }} aria-label="Annuler">
              <X size={16} />
            </button>
          </div>

          <h2 className="text-[18px] font-black tracking-[-0.03em] mb-1.5" style={{ color: '#F2EEDC' }}>Se déconnecter ?</h2>
          <p className="text-[13px] font-semibold leading-relaxed mb-5" style={{ color: '#8A938C' }}>
            Tu es connecté en tant que <span style={{ color: '#F2EEDC' }}>{user.name}</span>. Tu pourras te reconnecter à tout moment.
          </p>

          <div className="flex gap-3">
            <button onClick={onCancel} className="flex-1 h-[48px] rounded-[14px] text-[13px] font-black uppercase tracking-wider" style={{ background: 'rgba(255,255,255,0.06)', color: '#8A938C', border: '1px solid rgba(255,255,255,0.08)' }}>
              Annuler
            </button>
            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={onConfirm}
              className="flex-1 h-[48px] rounded-[14px] text-[13px] font-black uppercase tracking-wider flex items-center justify-center gap-2"
              style={{ background: 'rgba(217,75,91,0.15)', color: '#D94B5B', border: '1px solid rgba(217,75,91,0.25)' }}
            >
              <LogOut size={14} />
              <span>Déconnecter</span>
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
