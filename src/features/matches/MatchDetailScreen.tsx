import { useState } from 'react';
import { ChevronLeft, Activity, Users, Camera, MessageCircle, Send, ThumbsUp, CheckCircle, PlayCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from '@tanstack/react-router';
import type { MatchDetailTab, Reaction } from './types';
import { useMatchData } from './hooks/useMatchData';
import { Scoreboard } from './components/Scoreboard';
import { Timeline, ScorersList, CardsList } from './components/Timeline';

const DETAIL_TABS: { id: MatchDetailTab; label: string; icon: React.ReactNode }[] = [
  { id: 'recap', label: 'Résumé', icon: <Activity size={12} /> },
  { id: 'lineup', label: 'Compos', icon: <Users size={12} /> },
  { id: 'media', label: 'Médias', icon: <Camera size={12} /> },
  { id: 'reactions', label: 'Réactions', icon: <MessageCircle size={12} /> },
];

export function MatchDetailScreen() {
  const router = useRouter();
  const { events, media, reactions: initialReactions } = useMatchData();
  const [activeTab, setActiveTab] = useState<MatchDetailTab>('recap');
  const [reactions, setReactions] = useState<Reaction[]>(initialReactions);
  const [commentText, setCommentText] = useState('');

  const homeGoals = events.filter(e => e.type === 'goal' && e.team === 'home').length;
  const awayGoals = events.filter(e => e.type === 'goal' && e.team === 'away').length;

  const handleLike = (id: string) => {
    setReactions(prev => prev.map(r => r.id === id ? { ...r, liked: !r.liked, likes: r.liked ? r.likes - 1 : r.likes + 1 } : r));
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden pb-28" style={{ background: '#0B221C', color: '#F2EEDC' }}>
      <div className="relative z-10 flex items-center justify-between px-5 pt-12 pb-4">
        <button onClick={() => router.navigate({ to: '/matches' })} className="flex items-center gap-1.5 px-3 py-2 rounded-[12px]" style={{ background: 'rgba(255,255,255,0.05)', color: '#8A938C' }} aria-label="Retour">
          <ChevronLeft size={16} />
          <span className="text-[10px] font-black uppercase tracking-wider">Retour</span>
        </button>
        <span className="px-2.5 py-1.5 rounded-[10px] text-[9px] font-black uppercase tracking-wider" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)', color: '#8A938C' }}>
          FT · Terminé
        </span>
      </div>

      <Scoreboard homeTeam="Annecy FC" awayTeam="Seynod City" homeScore={homeGoals} awayScore={awayGoals} time="FT" status="finished" venue="Terrain des Marquisats" category="Élite" />

      <div className="sticky top-0 z-20 flex overflow-x-auto gap-1.5 px-5 py-3" style={{ background: 'rgba(11,34,28,0.95)', backdropFilter: 'blur(16px)', borderBottom: '1px solid rgba(255,255,255,0.05)', scrollbarWidth: 'none' }}>
        {DETAIL_TABS.map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)} className="flex items-center gap-1.5 px-3.5 py-2 rounded-[12px] text-[10px] font-black uppercase tracking-wide whitespace-nowrap flex-shrink-0 transition-all" style={activeTab === tab.id ? { background: '#B7FF1A', color: '#0B221C' } : { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', color: '#8A938C' }}>
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={activeTab} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.18, ease: 'easeOut' }} className="px-5 pt-5">

          {activeTab === 'recap' && (
            <div className="flex flex-col gap-6">
              <Timeline events={events} />
              <ScorersList events={events} />
              <CardsList events={events} />
            </div>
          )}

          {activeTab === 'lineup' && (
            <div className="py-10 text-center">
              <p className="text-[11px] font-black uppercase" style={{ color: '#8A938C' }}>Compos disponibles prochainement</p>
            </div>
          )}

          {activeTab === 'media' && (
            <div className="flex flex-col gap-4">
              <div className="relative rounded-[24px] overflow-hidden" style={{ height: '200px' }}>
                <img src={media[2]?.img} alt={media[2]?.title} className="w-full h-full object-cover" style={{ filter: 'brightness(0.45)' }} />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(11,34,28,0.95) 0%, transparent 50%)' }} />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full flex items-center justify-center" style={{ background: 'rgba(183,255,26,0.15)', backdropFilter: 'blur(8px)', border: '1.5px solid rgba(183,255,26,0.3)' }}>
                    <PlayCircle size={28} style={{ color: '#B7FF1A' }} />
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="text-[15px] font-black leading-snug" style={{ color: '#F2EEDC' }}>{media[2]?.title}</p>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-[9px] font-bold" style={{ color: '#B7FF1A' }}>{media[2]?.duration}</span>
                    <span className="text-[9px] font-semibold" style={{ color: '#8A938C' }}>{media[2]?.views} vues</span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {media.map(item => (
                  <article key={item.id} className="relative rounded-[18px] overflow-hidden" style={{ aspectRatio: '4/5' }}>
                    <img src={item.img} alt={item.title} className="w-full h-full object-cover" style={{ filter: 'brightness(0.48)' }} />
                    <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-md" style={{ background: 'rgba(11,34,28,0.8)' }}>
                      <span className="text-[9px] font-black" style={{ color: '#D7DBC8' }}>{item.duration}</span>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-3" style={{ background: 'linear-gradient(to top, rgba(11,34,28,0.95), transparent)' }}>
                      <p className="text-[9px] font-bold leading-snug" style={{ color: '#D7DBC8' }}>{item.title}</p>
                      <span className="text-[8px]" style={{ color: '#8A938C' }}>{item.views} vues</span>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'reactions' && (
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3 p-3 rounded-[18px]" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
                <input type="text" placeholder="Ton avis sur ce match…" aria-label="Ajouter un commentaire" value={commentText} onChange={e => setCommentText(e.target.value)} className="flex-1 bg-transparent text-[12px] font-medium focus:outline-none" style={{ color: '#D7DBC8' }} />
                <button className="w-8 h-8 rounded-[10px] flex items-center justify-center flex-shrink-0" style={{ background: commentText.trim() ? '#B7FF1A' : 'rgba(255,255,255,0.06)', color: commentText.trim() ? '#0B221C' : '#8A938C' }} aria-label="Envoyer">
                  <Send size={14} />
                </button>
              </div>
              <div className="flex flex-col gap-3">
                {reactions.map(reaction => (
                  <div key={reaction.id} className="p-4 rounded-[18px]" style={{ background: '#123129', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <div className="flex items-center gap-2.5 mb-2.5">
                      <div className="w-8 h-8 rounded-[10px] overflow-hidden flex-shrink-0" style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
                        <img src={reaction.avatar} alt={reaction.user} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <p className="text-[11px] font-black" style={{ color: '#F2EEDC' }}>{reaction.user}</p>
                        <p className="text-[8px] font-semibold" style={{ color: '#8A938C' }}>{reaction.time}</p>
                      </div>
                      <button onClick={() => handleLike(reaction.id)} className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-[10px] transition-all" style={{ background: reaction.liked ? 'rgba(183,255,26,0.1)' : 'rgba(255,255,255,0.04)', border: reaction.liked ? '1px solid rgba(183,255,26,0.25)' : '1px solid rgba(255,255,255,0.06)' }}>
                        <ThumbsUp size={10} style={{ color: reaction.liked ? '#B7FF1A' : '#8A938C' }} fill={reaction.liked ? '#B7FF1A' : 'none'} />
                        <span className="text-[9px] font-black tabular-nums" style={{ color: reaction.liked ? '#B7FF1A' : '#8A938C' }}>{reaction.likes}</span>
                      </button>
                    </div>
                    <p className="text-[12px] leading-relaxed" style={{ color: '#D7DBC8' }}>{reaction.text}</p>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-2 px-3 py-2.5 rounded-[12px] mb-2" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
                <CheckCircle size={10} style={{ color: '#35D07F' }} />
                <span className="text-[9px] font-semibold" style={{ color: '#8A938C' }}>Espace modéré · Respectez l'esprit du playground</span>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
