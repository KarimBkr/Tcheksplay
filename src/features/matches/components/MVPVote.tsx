import { useState } from 'react';
import { Users, Star, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import type { MVPCandidate } from '../types';

interface MVPVoteProps {
  candidates: MVPCandidate[];
}

export function MVPVote({ candidates }: MVPVoteProps) {
  const [votedMvp, setVotedMvp] = useState<string | null>(null);
  const totalVotes = candidates.reduce((sum, c) => sum + c.votes, 0);

  return (
    <section className="mb-4">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: '#8A938C' }}>
          Vote MVP du Match
        </h2>
        <div className="flex items-center gap-1 px-2 py-1 rounded-lg" style={{ background: 'rgba(201,193,162,0.08)', border: '1px solid rgba(201,193,162,0.12)' }}>
          <Users size={9} style={{ color: '#C9C1A2' }} />
          <span className="text-[9px] font-black" style={{ color: '#C9C1A2' }}>
            {totalVotes + (votedMvp ? 1 : 0)} votes
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        {candidates.map((candidate, i) => {
          const isVoted = votedMvp === candidate.id;
          const isLeader = i === 0;
          const votePct = Math.round((candidate.votes / totalVotes) * 100);

          return (
            <motion.button
              key={candidate.id}
              whileTap={{ scale: 0.98 }}
              onClick={() => setVotedMvp(candidate.id)}
              className="flex items-center gap-3 p-3 rounded-[18px] w-full text-left transition-all"
              style={{
                background: isVoted ? 'rgba(183,255,26,0.07)' : isLeader ? 'rgba(201,193,162,0.04)' : 'rgba(255,255,255,0.02)',
                border: isVoted ? '1.5px solid rgba(183,255,26,0.3)' : isLeader ? '1px solid rgba(201,193,162,0.1)' : '1px solid rgba(255,255,255,0.05)',
              }}
            >
              <div className="relative flex-shrink-0">
                <div className="w-11 h-11 rounded-[14px] overflow-hidden" style={{ border: isVoted ? '1.5px solid rgba(183,255,26,0.4)' : isLeader ? '1.5px solid rgba(201,193,162,0.25)' : '1px solid rgba(255,255,255,0.08)' }}>
                  <img src={candidate.img} alt={candidate.name} className="w-full h-full object-cover" />
                </div>
                {isLeader && (
                  <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center" style={{ background: '#C9C1A2' }}>
                    <Star size={7} fill="#0B221C" style={{ color: '#0B221C' }} />
                  </div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-[12px] font-black" style={{ color: '#F2EEDC' }}>{candidate.name}</p>
                <p className="text-[9px] font-semibold" style={{ color: '#8A938C' }}>{candidate.team} · {candidate.stat}</p>
                <div className="w-full h-1 rounded-full overflow-hidden mt-1.5" style={{ background: 'rgba(255,255,255,0.07)' }}>
                  <motion.div
                    initial={{ width: '0%' }}
                    animate={{ width: `${votePct}%` }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className="h-full rounded-full"
                    style={{ background: isVoted ? '#B7FF1A' : isLeader ? '#C9C1A2' : '#8A938C' }}
                  />
                </div>
              </div>

              <span className="text-[12px] font-black flex-shrink-0 tabular-nums" style={{ color: isVoted ? '#B7FF1A' : isLeader ? '#C9C1A2' : '#8A938C' }}>
                {votePct}%
              </span>
            </motion.button>
          );
        })}

        {!votedMvp && (
          <p className="text-[9px] font-semibold text-center mt-1" style={{ color: '#8A938C' }}>Touchez pour voter</p>
        )}
        {votedMvp && (
          <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-center gap-1.5 py-2">
            <Zap size={10} style={{ color: '#B7FF1A' }} />
            <span className="text-[9px] font-black uppercase tracking-wider" style={{ color: '#B7FF1A' }}>Vote enregistré !</span>
          </motion.div>
        )}
      </div>
    </section>
  );
}
