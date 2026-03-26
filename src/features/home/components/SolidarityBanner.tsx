import { useRouter } from '@tanstack/react-router';
import { Heart, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

export function SolidarityBanner() {
  const router = useRouter();

  return (
    <section className="px-5">
      <motion.button
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        onClick={() => router.navigate({ to: '/solidarity' })}
        className="w-full text-left rounded-[22px] overflow-hidden relative"
        style={{
          background: 'linear-gradient(135deg, rgba(217,75,91,0.1) 0%, #123129 100%)',
          border: '1px solid rgba(217,75,91,0.18)',
        }}
      >
        <div
          className="absolute top-0 left-0 w-48 h-48 rounded-full"
          style={{
            background: 'radial-gradient(ellipse, rgba(217,75,91,0.08) 0%, transparent 70%)',
            filter: 'blur(40px)',
            transform: 'translate(-30%, -40%)',
          }}
        />

        <div className="relative px-5 py-4 flex items-center gap-4">
          <div
            className="w-12 h-12 rounded-[16px] flex items-center justify-center flex-shrink-0"
            style={{
              background: 'rgba(217,75,91,0.12)',
              border: '1.5px solid rgba(217,75,91,0.25)',
            }}
          >
            <Heart size={22} style={{ color: '#D94B5B' }} />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span
                className="text-[9px] font-black uppercase tracking-[0.18em]"
                style={{ color: '#D94B5B' }}
              >
                Tcheks Impact
              </span>
              <Zap size={10} style={{ color: '#F4C542' }} />
            </div>
            <p
              className="text-[13px] font-black leading-snug"
              style={{ color: '#F2EEDC' }}
            >
              Le foot qui fait du bien
            </p>
            <p
              className="text-[9px] font-semibold mt-0.5"
              style={{ color: '#8A938C' }}
            >
              Découvre nos actions solidaires et engage-toi
            </p>
          </div>

          <div
            className="px-3 py-2 rounded-[12px] flex-shrink-0"
            style={{
              background: 'rgba(217,75,91,0.12)',
              border: '1px solid rgba(217,75,91,0.2)',
            }}
          >
            <span
              className="text-[9px] font-black uppercase tracking-wider"
              style={{ color: '#D94B5B' }}
            >
              Voir
            </span>
          </div>
        </div>
      </motion.button>
    </section>
  );
}
