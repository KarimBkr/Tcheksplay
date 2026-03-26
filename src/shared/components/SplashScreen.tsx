import { motion } from 'framer-motion';
import { Trophy } from 'lucide-react';

export function SplashScreen() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.4, ease: 'easeInOut' } }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
      style={{ background: '#0B221C' }}
    >
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className="w-72 h-72 rounded-full"
          style={{
            background: 'radial-gradient(ellipse, rgba(46,143,87,0.25) 0%, transparent 70%)',
            filter: 'blur(40px)',
          }}
        />
      </div>

      <motion.div
        animate={{ scale: [0.9, 1.04, 1], opacity: [0, 1] }}
        transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
        className="flex flex-col items-center gap-6 relative z-10"
      >
        <div
          className="w-20 h-20 rounded-[28px] flex items-center justify-center"
          style={{
            background: 'linear-gradient(145deg, #2E8F57, #123129)',
            boxShadow: '0 20px 60px rgba(46,143,87,0.3)',
            color: '#B7FF1A',
          }}
        >
          <Trophy size={38} />
        </div>

        <div className="text-center">
          <h1
            className="text-[32px] font-black tracking-[-0.04em] uppercase leading-none"
            style={{ color: '#F2EEDC' }}
          >
            <span>Tcheks</span>
            <span style={{ color: '#B7FF1A' }}>play</span>
          </h1>
          <p
            className="text-[10px] font-bold uppercase tracking-[0.3em] mt-2"
            style={{ color: '#8A938C' }}
          >
            L'Esprit du Playground
          </p>
        </div>

        <div
          className="w-40 h-[2px] rounded-full overflow-hidden"
          style={{ background: 'rgba(255,255,255,0.07)' }}
        >
          <motion.div
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 0.85, ease: 'easeInOut' }}
            className="h-full rounded-full"
            style={{ background: 'linear-gradient(90deg, #2E8F57, #B7FF1A)' }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}
