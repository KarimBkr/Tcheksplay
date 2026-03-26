import { useRouter } from '@tanstack/react-router';
import { Star, Activity, Flame, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Player } from '@/shared/types';

interface TopScorerCardProps {
  player: Player;
}

export function TopScorerCard({ player }: TopScorerCardProps) {
  const router = useRouter();

  return (
    <section className="px-5">
      <div className="flex items-center justify-between mb-3">
        <h2
          className="text-[10px] font-black uppercase tracking-[0.2em]"
          style={{ color: '#8A938C' }}
        >
          Meilleur buteur
        </h2>
        <button
          onClick={() => router.navigate({ to: '/players' })}
          className="flex items-center gap-1"
        >
          <span
            className="text-[9px] font-black uppercase tracking-wider"
            style={{ color: '#B7FF1A' }}
          >
            Tous les joueurs
          </span>
          <ArrowUpRight size={11} style={{ color: '#B7FF1A' }} />
        </button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="rounded-[22px] overflow-hidden relative"
        style={{
          background: 'linear-gradient(135deg, rgba(183,255,26,0.06) 0%, #123129 100%)',
          border: '1px solid rgba(183,255,26,0.12)',
        }}
      >
        <div
          className="absolute top-0 right-0 w-40 h-40 rounded-full"
          style={{
            background: 'radial-gradient(ellipse, rgba(183,255,26,0.05) 0%, transparent 70%)',
            filter: 'blur(32px)',
            transform: 'translate(20%, -30%)',
          }}
        />

        <div className="relative px-4 py-4 flex items-center gap-4">
          <div className="relative flex-shrink-0">
            <div
              className="w-16 h-16 rounded-[20px] overflow-hidden"
              style={{ border: '2px solid rgba(183,255,26,0.25)' }}
            >
              <img
                src={player.img}
                alt={player.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div
              className="absolute -top-1.5 -right-1.5 w-6 h-6 rounded-full flex items-center justify-center"
              style={{ background: '#B7FF1A', border: '2px solid #0B221C' }}
            >
              <Star size={10} fill="#0B221C" style={{ color: '#0B221C' }} />
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <p
              className="text-[8px] font-black uppercase tracking-[0.18em]"
              style={{ color: '#8A938C' }}
            >
              {player.nationality} {player.team} · {player.position}
            </p>
            <p
              className="text-[16px] font-black leading-tight mt-0.5"
              style={{ color: '#F2EEDC' }}
            >
              {player.name}
            </p>

            <div className="flex items-center gap-3 mt-2">
              <div className="flex items-center gap-1.5">
                <Flame size={11} style={{ color: '#B7FF1A' }} />
                <span
                  className="text-[14px] font-black tabular-nums"
                  style={{ color: '#B7FF1A' }}
                >
                  {player.goals}
                </span>
                <span
                  className="text-[8px] font-black uppercase tracking-wider"
                  style={{ color: '#8A938C' }}
                >
                  Buts
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <Activity size={11} style={{ color: '#35D07F' }} />
                <span
                  className="text-[14px] font-black tabular-nums"
                  style={{ color: '#35D07F' }}
                >
                  {player.assists}
                </span>
                <span
                  className="text-[8px] font-black uppercase tracking-wider"
                  style={{ color: '#8A938C' }}
                >
                  Passes D.
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <span
                  className="text-[14px] font-black tabular-nums"
                  style={{ color: '#C9C1A2' }}
                >
                  {player.matches}
                </span>
                <span
                  className="text-[8px] font-black uppercase tracking-wider"
                  style={{ color: '#8A938C' }}
                >
                  Matchs
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
