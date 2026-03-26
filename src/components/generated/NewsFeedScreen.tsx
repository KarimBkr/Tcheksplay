import React, { useState } from 'react';
import { Heart, MessageCircle, Share2, Bookmark, ChevronRight, MapPin, PlayCircle, Trophy, Calendar, Users, Zap, Star, ArrowUpRight, Shield, Crown, CheckCircle, TrendingUp, Bell, Camera, Image as ImageIcon, Award, Clock, Send, X, ThumbsUp, Megaphone, AlertCircle, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// ─── Types ────────────────────────────────────────────────────────────────────

type FeedCategory = 'all' | 'official' | 'results' | 'schedule' | 'media' | 'rewards' | 'solidarity' | 'sponsored';
type ReactionType = 'fire' | 'clap' | 'heart' | 'wow';
interface FeedAuthor {
  name: string;
  role: string;
  verified: boolean;
  avatar: string;
}
interface FeedReactions {
  fire: number;
  clap: number;
  heart: number;
  wow: number;
}
interface FeedComment {
  id: string;
  author: string;
  avatar: string;
  text: string;
  time: string;
  likes: number;
}
interface FeedItem {
  id: string;
  type: 'hero' | 'result' | 'schedule_change' | 'team_photo' | 'tournament' | 'reward' | 'solidarity' | 'sponsored' | 'announcement' | 'interview';
  category: FeedCategory;
  title: string;
  excerpt?: string;
  img: string;
  timeLabel: string;
  timeGroup: 'today' | 'yesterday' | 'older';
  author: FeedAuthor;
  reactions: FeedReactions;
  comments: FeedComment[];
  totalComments: number;
  pinned?: boolean;
  breaking?: boolean;
  sponsored?: boolean;
  sponsoredBy?: string;
  tag: string;
  tagColor: string;
  tagIcon?: React.ReactNode;
  matchData?: {
    home: string;
    away: string;
    homeScore: number;
    awayScore: number;
    venue: string;
  };
  scheduleData?: {
    match: string;
    oldDate: string;
    newDate: string;
    reason: string;
  };
  rewardData?: {
    player: string;
    award: string;
    team: string;
    img: string;
  };
  solidarityData?: {
    project: string;
    raised: number;
    goal: number;
    donors: number;
  };
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const FEED_FILTERS: Array<{
  id: FeedCategory;
  label: string;
  emoji: string;
}> = [{
  id: 'all',
  label: 'Tout',
  emoji: '✦'
}, {
  id: 'official',
  label: 'Officiel',
  emoji: '📣'
}, {
  id: 'results',
  label: 'Résultats',
  emoji: '⚽'
}, {
  id: 'schedule',
  label: 'Calendrier',
  emoji: '📅'
}, {
  id: 'media',
  label: 'Médias',
  emoji: '📸'
}, {
  id: 'rewards',
  label: 'Récompenses',
  emoji: '🏆'
}, {
  id: 'solidarity',
  label: 'Solidaire',
  emoji: '💚'
}, {
  id: 'sponsored',
  label: 'Partenaires',
  emoji: '⭐'
}];
const FEED_ITEMS: FeedItem[] = [{
  id: 'f1',
  type: 'hero',
  category: 'official',
  title: 'Annecy FC en route vers la finale — une saison historique',
  excerpt: 'Après 14 victoires en 18 matchs, le club des Marquisats s\'impose comme favori incontesté de la Summer Cup S3. Retour sur un parcours hors norme.',
  img: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800&q=80',
  timeLabel: 'Il y a 1 h',
  timeGroup: 'today',
  pinned: true,
  breaking: true,
  author: {
    name: 'Rédaction Tcheksplay',
    role: 'Média Officiel',
    verified: true,
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=80&h=80'
  },
  reactions: {
    fire: 142,
    clap: 87,
    heart: 63,
    wow: 29
  },
  comments: [{
    id: 'c1',
    author: 'Yassin M.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&h=80',
    text: 'Saison de ouf 🔥 Killian est au dessus de tout le monde',
    time: 'Il y a 45 min',
    likes: 12
  }, {
    id: 'c2',
    author: 'Théo G.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=80&h=80',
    text: 'Respect au coach, système tactique impeccable',
    time: 'Il y a 1 h',
    likes: 8
  }],
  totalComments: 34,
  tag: 'À La Une',
  tagColor: '#B7FF1A'
}, {
  id: 'f2',
  type: 'result',
  category: 'results',
  title: 'Victoire éclatante d\'Annecy FC sur Seynod City',
  excerpt: 'Un match dominé de bout en bout. Bersot et Mebrouk ont illuminé le terrain des Marquisats.',
  img: 'https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?auto=format&fit=crop&w=800&q=80',
  timeLabel: 'Il y a 3 h',
  timeGroup: 'today',
  author: {
    name: 'Stats Tcheksplay',
    role: 'Bureau Sportif',
    verified: true,
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=80&h=80'
  },
  reactions: {
    fire: 98,
    clap: 54,
    heart: 41,
    wow: 17
  },
  comments: [{
    id: 'c3',
    author: 'Lucas P.',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=80&h=80',
    text: 'Score mérité. On savait qu\'AFC était au niveau 💪',
    time: 'Il y a 2 h',
    likes: 6
  }],
  totalComments: 19,
  tag: 'Résultat · FT',
  tagColor: '#2E8F57',
  matchData: {
    home: 'Annecy FC',
    away: 'Seynod City',
    homeScore: 2,
    awayScore: 1,
    venue: 'Terrain des Marquisats'
  }
}, {
  id: 'f3',
  type: 'announcement',
  category: 'official',
  title: 'Nouvelles règles arbitrage — en vigueur dès la J19',
  excerpt: 'La commission sportive Tcheksplay a validé 3 ajustements au règlement. Consultez le document officiel.',
  img: 'https://images.unsplash.com/photo-1551958219-acbc595d4c80?auto=format&fit=crop&w=800&q=80',
  timeLabel: 'Il y a 5 h',
  timeGroup: 'today',
  author: {
    name: 'Commission Sportive',
    role: 'Officiel',
    verified: true,
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=80&h=80'
  },
  reactions: {
    fire: 24,
    clap: 61,
    heart: 18,
    wow: 45
  },
  comments: [],
  totalComments: 8,
  tag: 'Annonce',
  tagColor: '#7BA7D9'
}, {
  id: 'f4',
  type: 'schedule_change',
  category: 'schedule',
  title: 'Report du match Veyrier Utd vs Poisy Stars',
  excerpt: 'Suite aux intempéries, la rencontre est déplacée au mercredi 22 janvier.',
  img: 'https://images.unsplash.com/photo-1517927033932-b3d18e61fb3a?auto=format&fit=crop&w=800&q=80',
  timeLabel: 'Il y a 6 h',
  timeGroup: 'today',
  author: {
    name: 'Direction Compétition',
    role: 'Officiel',
    verified: true,
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=80&h=80'
  },
  reactions: {
    fire: 5,
    clap: 12,
    heart: 4,
    wow: 31
  },
  comments: [],
  totalComments: 11,
  tag: 'Calendrier',
  tagColor: '#C9C1A2',
  scheduleData: {
    match: 'Veyrier Utd vs Poisy Stars',
    oldDate: 'Lun. 20 Jan · 20h30',
    newDate: 'Mer. 22 Jan · 20h30',
    reason: 'Conditions météo défavorables'
  }
}, {
  id: 'f5',
  type: 'team_photo',
  category: 'media',
  title: 'Dans les vestiaires d\'Annecy FC — les photos exclusives',
  excerpt: 'Notre photographe était présent avant le coup d\'envoi. 18 clichés inédits à découvrir.',
  img: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=800&q=80',
  timeLabel: 'Hier · 18h',
  timeGroup: 'yesterday',
  author: {
    name: 'Studio Tcheks',
    role: 'Photo & Vidéo',
    verified: true,
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=80&h=80'
  },
  reactions: {
    fire: 76,
    clap: 112,
    heart: 94,
    wow: 38
  },
  comments: [{
    id: 'c4',
    author: 'Amine T.',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf45f1d?auto=format&fit=crop&w=80&h=80',
    text: 'Les photos sont vraiment de qualité 📸',
    time: 'Hier',
    likes: 14
  }],
  totalComments: 22,
  tag: '18 Photos',
  tagColor: '#C9C1A2'
}, {
  id: 'f6',
  type: 'interview',
  category: 'official',
  title: '"On joue pour le quartier, pas pour les stats" — Killian Bersot',
  excerpt: 'Le meilleur buteur de la saison S3 se confie sur sa progression, son équipe et ses ambitions.',
  img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80',
  timeLabel: 'Hier · 14h',
  timeGroup: 'yesterday',
  author: {
    name: 'Rédaction Tcheksplay',
    role: 'Interview',
    verified: true,
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=80&h=80'
  },
  reactions: {
    fire: 201,
    clap: 88,
    heart: 147,
    wow: 52
  },
  comments: [{
    id: 'c5',
    author: 'Yassin M.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&h=80',
    text: 'Killian est trop humble. C\'est un vrai chef 🐐',
    time: 'Hier',
    likes: 23
  }, {
    id: 'c6',
    author: 'Lucas P.',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=80&h=80',
    text: 'Interview motivante, respect',
    time: 'Hier',
    likes: 9
  }],
  totalComments: 47,
  tag: 'Interview',
  tagColor: '#C9C1A2'
}, {
  id: 'f7',
  type: 'reward',
  category: 'rewards',
  title: 'Killian Bersot sacré MVP de la Journée 18',
  excerpt: 'Avec son doublé décisif, le numéro 9 d\'Annecy FC remporte le titre de meilleur joueur.',
  img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=80&h=80',
  timeLabel: 'Il y a 2 j.',
  timeGroup: 'older',
  author: {
    name: 'Tcheksplay Awards',
    role: 'Récompenses',
    verified: true,
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=80&h=80'
  },
  reactions: {
    fire: 183,
    clap: 125,
    heart: 96,
    wow: 44
  },
  comments: [],
  totalComments: 29,
  tag: 'Récompense',
  tagColor: '#F4C542',
  rewardData: {
    player: 'Killian Bersot',
    award: 'MVP Journée 18',
    team: 'Annecy FC',
    img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=80&h=80'
  }
}, {
  id: 'f8',
  type: 'solidarity',
  category: 'solidarity',
  title: 'Rénovation Playground Marquisats — 85 % atteint !',
  excerpt: 'Grâce à la communauté Tcheksplay, le projet avance à grande vitesse. Merci aux 124 donateurs.',
  img: 'https://images.unsplash.com/photo-1553778263-73a83bab9b0c?auto=format&fit=crop&w=800&q=80',
  timeLabel: 'Il y a 2 j.',
  timeGroup: 'older',
  author: {
    name: 'Tcheks Impact',
    role: 'Initiative Solidaire',
    verified: true,
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=80&h=80'
  },
  reactions: {
    fire: 67,
    clap: 201,
    heart: 178,
    wow: 34
  },
  comments: [],
  totalComments: 16,
  tag: 'Solidarité',
  tagColor: '#2E8F57',
  solidarityData: {
    project: 'Playground Marquisats',
    raised: 8500,
    goal: 10000,
    donors: 124
  }
}, {
  id: 'f9',
  type: 'tournament',
  category: 'official',
  title: 'Programme officiel des quarts de finale — Summer Cup S3',
  excerpt: '4 affiches de rêve. Les dates, lieux et horaires confirmés par la direction.',
  img: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800&q=80',
  timeLabel: 'Il y a 3 j.',
  timeGroup: 'older',
  author: {
    name: 'Direction Compétition',
    role: 'Officiel',
    verified: true,
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=80&h=80'
  },
  reactions: {
    fire: 89,
    clap: 76,
    heart: 43,
    wow: 21
  },
  comments: [],
  totalComments: 13,
  tag: 'Tournoi',
  tagColor: '#B7FF1A'
}, {
  id: 'f10',
  type: 'sponsored',
  category: 'sponsored',
  title: 'Nike Football × Tcheksplay — La nouvelle collection arrive',
  excerpt: 'Découvrez les équipements officiels de la saison S3. Commandez avec votre réduction exclusive.',
  img: 'https://images.unsplash.com/photo-1517927033932-b3d18e61fb3a?auto=format&fit=crop&w=800&q=80',
  timeLabel: 'Il y a 4 j.',
  timeGroup: 'older',
  sponsored: true,
  sponsoredBy: 'Nike',
  author: {
    name: 'Nike Football',
    role: 'Partenaire Officiel',
    verified: false,
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=80&h=80'
  },
  reactions: {
    fire: 34,
    clap: 28,
    heart: 19,
    wow: 11
  },
  comments: [],
  totalComments: 4,
  tag: 'Partenaire · Nike',
  tagColor: '#8A938C'
}];
const REACTION_META: Record<ReactionType, {
  emoji: string;
  label: string;
}> = {
  fire: {
    emoji: '🔥',
    label: 'Feu'
  },
  clap: {
    emoji: '👏',
    label: 'Clap'
  },
  heart: {
    emoji: '❤️',
    label: 'Cœur'
  },
  wow: {
    emoji: '😮',
    label: 'Wow'
  }
};
const TICKER_ITEMS = [{
  id: 't1',
  text: "⚽ 78' — Bersot double la mise pour Annecy FC",
  urgent: true
}, {
  id: 't2',
  text: "📅 Report : Veyrier Utd vs Poisy Stars → Mer. 22 Jan",
  urgent: false
}, {
  id: 't3',
  text: "🏆 Meythet FC 0–3 Cran Giants · FT",
  urgent: false
}, {
  id: 't4',
  text: "⚡ Quarts de finale Summer Cup S3 : programme confirmé",
  urgent: false
}];

// ─── Helpers ─────────────────────────────────────────────────────────────────

const VerifiedBadge = () => <span className="inline-flex items-center justify-center w-3.5 h-3.5 rounded-full flex-shrink-0" style={{
  background: '#7BA7D9'
}}>
    <CheckCircle size={8} style={{
    color: '#0B221C'
  }} />
  </span>;
const TagPill = ({
  label,
  color,
  icon
}: {
  label: string;
  color: string;
  icon?: React.ReactNode;
}) => <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-[8px] text-[8px] font-black uppercase tracking-wider" style={{
  background: `${color}1A`,
  border: `1px solid ${color}35`,
  color
}}>
    {icon}
    <span>{label}</span>
  </span>;

// ─── LiveTicker ───────────────────────────────────────────────────────────────

const LiveTicker = () => {
  const [idx, setIdx] = useState(0);
  React.useEffect(() => {
    const interval = setInterval(() => setIdx(prev => (prev + 1) % TICKER_ITEMS.length), 4000);
    return () => clearInterval(interval);
  }, []);
  const current = TICKER_ITEMS[idx];
  return <div className="mx-5 rounded-[14px] flex items-center gap-3 px-4 py-2.5 overflow-hidden" style={{
    background: current.urgent ? 'linear-gradient(90deg, rgba(142,43,54,0.18), rgba(18,49,41,0.7))' : 'rgba(255,255,255,0.03)',
    border: current.urgent ? '1px solid rgba(142,43,54,0.28)' : '1px solid rgba(255,255,255,0.05)'
  }}>
      <div className="flex items-center gap-1.5 flex-shrink-0">
        <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{
        background: current.urgent ? '#D94B5B' : '#B7FF1A'
      }} />
        <span className="text-[8px] font-black uppercase tracking-widest" style={{
        color: current.urgent ? '#D94B5B' : '#B7FF1A'
      }}>Live</span>
      </div>
      <AnimatePresence mode="wait">
        <motion.p key={current.id} initial={{
        opacity: 0,
        y: 5
      }} animate={{
        opacity: 1,
        y: 0
      }} exit={{
        opacity: 0,
        y: -5
      }} transition={{
        duration: 0.25
      }} className="flex-1 text-[11px] font-semibold truncate" style={{
        color: '#D7DBC8'
      }}>
          {current.text}
        </motion.p>
      </AnimatePresence>
      <Bell size={11} style={{
      color: '#556A61',
      flexShrink: 0
    }} />
    </div>;
};

// ─── ReactionBar ─────────────────────────────────────────────────────────────

const ReactionBar = ({
  reactions,
  onComment,
  commentCount
}: {
  reactions: FeedReactions;
  onComment: () => void;
  commentCount: number;
}) => {
  const [localReactions, setLocalReactions] = useState<FeedReactions>({
    ...reactions
  });
  const [tapped, setTapped] = useState<ReactionType | null>(null);
  const handleReaction = (type: ReactionType) => {
    if (tapped === type) {
      setTapped(null);
      setLocalReactions(prev => ({
        ...prev,
        [type]: prev[type] - 1
      }));
    } else {
      if (tapped) setLocalReactions(prev => ({
        ...prev,
        [tapped]: prev[tapped] - 1
      }));
      setTapped(type);
      setLocalReactions(prev => ({
        ...prev,
        [type]: prev[type] + 1
      }));
    }
  };
  return <div className="flex items-center justify-between pt-3" style={{
    borderTop: '1px solid rgba(255,255,255,0.05)'
  }}>
      <div className="flex items-center gap-1">
        {(Object.keys(REACTION_META) as ReactionType[]).map(type => <motion.button key={type} whileTap={{
        scale: 1.3
      }} onClick={() => handleReaction(type)} className="flex items-center gap-0.5 px-1.5 py-1 rounded-[8px] transition-all" style={tapped === type ? {
        background: 'rgba(183,255,26,0.1)',
        border: '1px solid rgba(183,255,26,0.2)'
      } : {
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.05)'
      }}>
            <span className="text-[12px] leading-none">{REACTION_META[type].emoji}</span>
            <span className="text-[9px] font-black" style={{
          color: tapped === type ? '#B7FF1A' : '#8A938C'
        }}>{localReactions[type]}</span>
          </motion.button>)}
      </div>
      <div className="flex items-center gap-3">
        <button onClick={onComment} className="flex items-center gap-1.5" aria-label="Voir les commentaires">
          <MessageCircle size={12} style={{
          color: '#556A61'
        }} />
          <span className="text-[9px] font-bold" style={{
          color: '#556A61'
        }}>{commentCount}</span>
        </button>
        <button aria-label="Partager">
          <Share2 size={12} style={{
          color: '#556A61'
        }} />
        </button>
        <button aria-label="Sauvegarder">
          <Bookmark size={12} style={{
          color: '#556A61'
        }} />
        </button>
      </div>
    </div>;
};

// ─── CommentPanel ─────────────────────────────────────────────────────────────

const CommentPanel = ({
  item,
  onClose,
  onInputFocus
}: {
  item: FeedItem;
  onClose: () => void;
  onInputFocus?: (focused: boolean) => void;
}) => {
  const [commentText, setCommentText] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = () => {
    if (!commentText.trim()) return;
    setSubmitted(true);
    setCommentText('');
    setTimeout(() => setSubmitted(false), 3000);
  };
  return <motion.div initial={{
    y: '100%'
  }} animate={{
    y: 0
  }} exit={{
    y: '100%'
  }} transition={{
    type: 'spring',
    stiffness: 340,
    damping: 36
  }} className="fixed inset-x-0 bottom-0 z-[80] rounded-t-[32px] flex flex-col" style={{
    background: 'rgba(18,49,41,0.98)',
    backdropFilter: 'blur(24px)',
    border: '1px solid rgba(255,255,255,0.07)',
    maxHeight: '75vh'
  }}>
      {/* Drag handle */}
      <div className="flex justify-center pt-3 pb-1 flex-shrink-0">
        <div className="w-10 h-[3px] rounded-full" style={{
        background: 'rgba(255,255,255,0.12)'
      }} />
      </div>
      <div className="flex items-center justify-between px-5 pt-2 pb-3 flex-shrink-0">
        <div className="flex items-center gap-2">
          <MessageCircle size={14} style={{
          color: '#B7FF1A'
        }} />
          <h3 className="text-[13px] font-black" style={{
          color: '#F2EEDC'
        }}>
            <span>{item.totalComments}</span><span> commentaires</span>
          </h3>
        </div>
        <button onClick={onClose} className="w-8 h-8 rounded-full flex items-center justify-center" style={{
        background: 'rgba(255,255,255,0.06)'
      }} aria-label="Fermer">
          <X size={13} style={{
          color: '#8A938C'
        }} />
        </button>
      </div>
      <div className="flex-1 overflow-y-auto px-5 pb-4 flex flex-col gap-4" style={{
      scrollbarWidth: 'none'
    }}>
        {item.comments.length === 0 && <div className="flex flex-col items-center justify-center py-10 gap-3">
            <MessageCircle size={26} style={{
          color: 'rgba(138,147,140,0.35)'
        }} />
            <p className="text-[12px] font-semibold text-center" style={{
          color: '#8A938C'
        }}><span>Sois le premier à commenter</span></p>
          </div>}
        {item.comments.map(c => <div key={c.id} className="flex items-start gap-3">
            <img src={c.avatar} alt={`Avatar de ${c.author}`} className="w-7 h-7 rounded-full object-cover flex-shrink-0" style={{
          border: '1px solid rgba(255,255,255,0.08)'
        }} />
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-black" style={{
              color: '#F2EEDC'
            }}>{c.author}</span>
                <span className="text-[9px]" style={{
              color: '#8A938C'
            }}>{c.time}</span>
              </div>
              <p className="text-[11px] leading-relaxed rounded-[12px] rounded-tl-none px-3 py-2" style={{
            background: 'rgba(255,255,255,0.05)',
            color: '#D7DBC8'
          }}>{c.text}</p>
              <div className="flex items-center gap-1 mt-1.5 pl-1">
                <ThumbsUp size={9} style={{
              color: '#8A938C'
            }} />
                <span className="text-[9px] font-bold" style={{
              color: '#8A938C'
            }}>{c.likes}</span>
              </div>
            </div>
          </div>)}
        {submitted && <motion.div initial={{
        opacity: 0,
        y: 6
      }} animate={{
        opacity: 1,
        y: 0
      }} className="flex items-center gap-2 px-3 py-2 rounded-[12px]" style={{
        background: 'rgba(183,255,26,0.08)',
        border: '1px solid rgba(183,255,26,0.15)'
      }}>
            <CheckCircle size={11} style={{
          color: '#B7FF1A'
        }} />
            <span className="text-[11px] font-bold" style={{
          color: '#B7FF1A'
        }}>Commentaire envoyé !</span>
          </motion.div>}
      </div>
      {/* Input zone — well above safe area, no navbar collision */}
      <div className="px-4 pt-3 pb-5 flex items-center gap-3 flex-shrink-0" style={{
      borderTop: '1px solid rgba(255,255,255,0.06)'
    }}>
        <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=80&h=80" alt="Mon avatar" className="w-7 h-7 rounded-full object-cover flex-shrink-0" style={{
        border: '1px solid rgba(183,255,26,0.25)'
      }} />
        <div className="flex-1 flex items-center gap-2 h-10 px-3 rounded-[18px]" style={{
        background: 'rgba(255,255,255,0.05)',
        border: '1px solid rgba(255,255,255,0.08)'
      }}>
          <input type="text" placeholder="Ajouter un commentaire…" value={commentText} onChange={e => setCommentText(e.target.value)} onFocus={() => onInputFocus?.(true)} onBlur={() => onInputFocus?.(false)} className="flex-1 bg-transparent text-[11px] focus:outline-none" style={{
          color: '#D7DBC8'
        }} />
          <motion.button onClick={handleSubmit} disabled={!commentText.trim()} aria-label="Envoyer" whileTap={{
          scale: 0.9
        }} style={{
          opacity: commentText.trim() ? 1 : 0.3
        }}>
            <Send size={13} style={{
            color: '#B7FF1A'
          }} />
          </motion.button>
        </div>
      </div>
    </motion.div>;
};

// ─── AuthorRow ────────────────────────────────────────────────────────────────

const AuthorRow = ({
  item
}: {
  item: FeedItem;
}) => <div className="flex items-center justify-between">
    <div className="flex items-center gap-2">
      <img src={item.author.avatar} alt={`Avatar de ${item.author.name}`} className="w-5 h-5 rounded-full object-cover" style={{
      border: '1px solid rgba(255,255,255,0.08)'
    }} />
      <div className="flex items-center gap-1.5">
        <span className="text-[9px] font-bold" style={{
        color: '#8A938C'
      }}>{item.author.name}</span>
        {item.author.verified && <VerifiedBadge />}
      </div>
    </div>
    <span className="text-[9px]" style={{
    color: '#556A61'
  }}>{item.timeLabel}</span>
  </div>;

// ─── Card: Hero ───────────────────────────────────────────────────────────────

const HeroCard = ({
  item,
  onComment
}: {
  item: FeedItem;
  onComment: () => void;
}) => <motion.article whileTap={{
  scale: 0.99
}} className="mx-5 rounded-[28px] overflow-hidden" style={{
  background: 'linear-gradient(160deg, #183C31 0%, #0B221C 100%)',
  border: '1px solid rgba(183,255,26,0.12)',
  boxShadow: '0 8px 40px rgba(0,0,0,0.4)'
}}>
    {/* Image hero pleine largeur */}
    <div className="relative h-[240px] overflow-hidden">
      <img src={item.img} alt={item.title} className="w-full h-full object-cover" style={{
      filter: 'brightness(0.35)'
    }} />
      <div className="absolute inset-0" style={{
      background: 'linear-gradient(to top, rgba(11,34,28,1) 0%, rgba(11,34,28,0.1) 55%)'
    }} />
      {item.breaking && <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1.5 rounded-[10px]" style={{
      background: '#8E2B36'
    }}>
          <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{
        background: '#F2EEDC'
      }} />
          <span className="text-[9px] font-black uppercase tracking-wider" style={{
        color: '#F2EEDC'
      }}>Breaking</span>
        </div>}
      {item.pinned && <div className="absolute top-4 right-4 w-7 h-7 rounded-[9px] flex items-center justify-center" style={{
      background: 'rgba(11,34,28,0.65)',
      backdropFilter: 'blur(8px)',
      border: '1px solid rgba(255,255,255,0.1)'
    }}>
          <TrendingUp size={12} style={{
        color: '#B7FF1A'
      }} />
        </div>}
      <div className="absolute bottom-0 left-0 right-0 px-5 pb-5">
        <TagPill label={item.tag} color={item.tagColor} />
        <h2 className="text-[20px] font-black leading-snug mt-2" style={{
        color: '#F2EEDC'
      }}>{item.title}</h2>
      </div>
    </div>
    <div className="px-5 pt-4 pb-5">
      {item.excerpt && <p className="text-[12px] leading-relaxed mb-4" style={{
      color: 'rgba(215,219,200,0.6)'
    }}>{item.excerpt}</p>}
      <AuthorRow item={item} />
      <div className="mt-3">
        <ReactionBar reactions={item.reactions} onComment={onComment} commentCount={item.totalComments} />
      </div>
    </div>
  </motion.article>;

// ─── Card: Result ─────────────────────────────────────────────────────────────

const ResultCard = ({
  item,
  onComment
}: {
  item: FeedItem;
  onComment: () => void;
}) => {
  const md = item.matchData!;
  return <motion.article whileTap={{
    scale: 0.98
  }} className="mx-5 rounded-[24px] overflow-hidden" style={{
    background: '#123129',
    border: '1px solid rgba(46,143,87,0.15)'
  }}>
      {/* Accent bar */}
      <div className="h-[3px] w-full" style={{
      background: 'linear-gradient(90deg, transparent, rgba(46,143,87,0.8), transparent)'
    }} />
      <div className="px-5 pt-4">
        {/* Header: tag + time */}
        <div className="flex items-center justify-between mb-4">
          <TagPill label={item.tag} color={item.tagColor} icon={<CheckCircle size={7} />} />
          <span className="text-[9px]" style={{
          color: '#556A61'
        }}>{item.timeLabel}</span>
        </div>
        {/* Score block */}
        <div className="flex items-center justify-between mb-1">
          <div className="flex flex-col items-center gap-1.5 flex-1">
            <div className="w-11 h-11 rounded-[13px] flex items-center justify-center" style={{
            background: 'rgba(46,143,87,0.12)',
            border: '1px solid rgba(46,143,87,0.18)'
          }}>
              <Shield size={18} style={{
              color: '#2E8F57'
            }} />
            </div>
            <span className="text-[11px] font-black text-center" style={{
            color: '#F2EEDC'
          }}>{md.home}</span>
          </div>
          <div className="flex flex-col items-center gap-1 px-4">
            <span className="text-[38px] font-black tracking-tighter leading-none tabular-nums" style={{
            color: '#F2EEDC'
          }}>
              {md.homeScore}<span style={{
              color: '#556A61',
              margin: '0 2px'
            }}>–</span>{md.awayScore}
            </span>
            <span className="text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md" style={{
            background: 'rgba(46,143,87,0.12)',
            color: '#2E8F57'
          }}>FT · Terminé</span>
          </div>
          <div className="flex flex-col items-center gap-1.5 flex-1">
            <div className="w-11 h-11 rounded-[13px] flex items-center justify-center" style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.07)'
          }}>
              <Shield size={18} style={{
              color: '#8A938C'
            }} />
            </div>
            <span className="text-[11px] font-black text-center" style={{
            color: '#D7DBC8'
          }}>{md.away}</span>
          </div>
        </div>
        <div className="flex items-center justify-center gap-1.5 mb-4">
          <MapPin size={9} style={{
          color: '#556A61'
        }} />
          <span className="text-[9px]" style={{
          color: '#556A61'
        }}>{md.venue}</span>
        </div>
        {item.excerpt && <p className="text-[11px] leading-relaxed mb-4" style={{
        color: 'rgba(215,219,200,0.5)'
      }}>{item.excerpt}</p>}
        <AuthorRow item={item} />
        <div className="mt-3 mb-5">
          <ReactionBar reactions={item.reactions} onComment={onComment} commentCount={item.totalComments} />
        </div>
      </div>
    </motion.article>;
};

// ─── Card: Schedule Change ────────────────────────────────────────────────────

const ScheduleCard = ({
  item,
  onComment
}: {
  item: FeedItem;
  onComment: () => void;
}) => {
  const sd = item.scheduleData!;
  return <motion.article whileTap={{
    scale: 0.98
  }} className="mx-5 rounded-[24px] overflow-hidden" style={{
    background: '#123129',
    border: '1px solid rgba(201,193,162,0.1)'
  }}>
      <div className="px-5 pt-4 pb-5">
        <div className="flex items-start gap-3 mb-4">
          <div className="w-9 h-9 rounded-[11px] flex items-center justify-center flex-shrink-0" style={{
          background: 'rgba(201,193,162,0.08)',
          border: '1px solid rgba(201,193,162,0.12)'
        }}>
            <Calendar size={14} style={{
            color: '#C9C1A2'
          }} />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <TagPill label={item.tag} color={item.tagColor} />
              <span className="text-[9px]" style={{
              color: '#556A61'
            }}>{item.timeLabel}</span>
            </div>
            <h3 className="text-[13px] font-black leading-snug mt-2" style={{
            color: '#F2EEDC'
          }}>{item.title}</h3>
          </div>
        </div>
        <div className="rounded-[14px] p-4 mb-4" style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.05)'
      }}>
          <p className="text-[9px] font-bold uppercase tracking-wider mb-1.5" style={{
          color: '#8A938C'
        }}>Match concerné</p>
          <p className="text-[12px] font-black mb-3" style={{
          color: '#F2EEDC'
        }}>{sd.match}</p>
          <div className="flex items-center gap-2">
            <div className="flex-1">
              <p className="text-[8px] font-bold uppercase tracking-wider mb-1" style={{
              color: 'rgba(217,75,91,0.8)'
            }}>Ancienne date</p>
              <p className="text-[10px] font-black line-through" style={{
              color: 'rgba(215,219,200,0.35)'
            }}>{sd.oldDate}</p>
            </div>
            <ChevronRight size={13} style={{
            color: '#556A61',
            flexShrink: 0
          }} />
            <div className="flex-1">
              <p className="text-[8px] font-bold uppercase tracking-wider mb-1" style={{
              color: '#B7FF1A'
            }}>Nouvelle date</p>
              <p className="text-[10px] font-black" style={{
              color: '#B7FF1A'
            }}>{sd.newDate}</p>
            </div>
          </div>
          <div className="mt-3 flex items-center gap-1.5 px-2.5 py-2 rounded-[9px]" style={{
          background: 'rgba(201,193,162,0.04)',
          border: '1px solid rgba(201,193,162,0.07)'
        }}>
            <AlertCircle size={9} style={{
            color: '#C9C1A2'
          }} />
            <span className="text-[9px]" style={{
            color: 'rgba(215,219,200,0.45)'
          }}>{sd.reason}</span>
          </div>
        </div>
        <AuthorRow item={item} />
        <div className="mt-3">
          <ReactionBar reactions={item.reactions} onComment={onComment} commentCount={item.totalComments} />
        </div>
      </div>
    </motion.article>;
};

// ─── Card: Media ─────────────────────────────────────────────────────────────

const MediaCard = ({
  item,
  onComment
}: {
  item: FeedItem;
  onComment: () => void;
}) => <motion.article whileTap={{
  scale: 0.98
}} className="mx-5 rounded-[24px] overflow-hidden" style={{
  background: '#123129',
  border: '1px solid rgba(255,255,255,0.06)'
}}>
    <div className="relative h-[180px] overflow-hidden">
      <img src={item.img} alt={item.title} className="w-full h-full object-cover" style={{
      filter: 'brightness(0.45)'
    }} />
      <div className="absolute inset-0" style={{
      background: 'linear-gradient(to top, rgba(18,49,41,0.95) 0%, transparent 45%)'
    }} />
      <div className="absolute top-3 left-3">
        <TagPill label={item.tag} color={item.tagColor} icon={<Camera size={8} />} />
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-11 h-11 rounded-full flex items-center justify-center" style={{
        background: 'rgba(11,34,28,0.5)',
        backdropFilter: 'blur(8px)',
        border: '1.5px solid rgba(201,193,162,0.25)'
      }}>
          <ImageIcon size={18} style={{
          color: '#C9C1A2'
        }} />
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 px-4 pb-4">
        <h3 className="text-[14px] font-black leading-snug" style={{
        color: '#F2EEDC'
      }}>{item.title}</h3>
      </div>
    </div>
    <div className="px-5 pt-4 pb-5">
      {item.excerpt && <p className="text-[11px] leading-relaxed mb-4" style={{
      color: 'rgba(215,219,200,0.55)'
    }}>{item.excerpt}</p>}
      <AuthorRow item={item} />
      <div className="mt-3">
        <ReactionBar reactions={item.reactions} onComment={onComment} commentCount={item.totalComments} />
      </div>
    </div>
  </motion.article>;

// ─── Card: Standard (Announcement / Interview / Tournament) ───────────────────

const StandardCard = ({
  item,
  onComment
}: {
  item: FeedItem;
  onComment: () => void;
}) => {
  const iconMap: Record<string, React.ReactNode> = {
    announcement: <Megaphone size={14} style={{
      color: '#7BA7D9'
    }} />,
    interview: <MessageCircle size={14} style={{
      color: '#C9C1A2'
    }} />,
    tournament: <Trophy size={14} style={{
      color: '#B7FF1A'
    }} />
  };
  return <motion.article whileTap={{
    scale: 0.98
  }} className="mx-5 rounded-[24px] overflow-hidden" style={{
    background: '#123129',
    border: '1px solid rgba(255,255,255,0.05)'
  }}>
      <div className="flex gap-4 p-4">
        <div className="w-[84px] h-[84px] rounded-[14px] overflow-hidden flex-shrink-0">
          <img src={item.img} alt={item.title} className="w-full h-full object-cover" style={{
          filter: 'brightness(0.55)'
        }} />
        </div>
        <div className="flex-1 min-w-0 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              {iconMap[item.type] && <span>{iconMap[item.type]}</span>}
              <TagPill label={item.tag} color={item.tagColor} />
            </div>
            <h3 className="text-[12px] font-black leading-snug" style={{
            color: '#F2EEDC'
          }}>{item.title}</h3>
            {item.excerpt && <p className="text-[10px] mt-1 leading-relaxed line-clamp-2" style={{
            color: 'rgba(215,219,200,0.45)'
          }}>{item.excerpt}</p>}
          </div>
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center gap-1.5">
              <img src={item.author.avatar} alt={`Avatar de ${item.author.name}`} className="w-4 h-4 rounded-full object-cover" />
              <div className="flex items-center gap-1">
                <span className="text-[8px] font-bold" style={{
                color: '#8A938C'
              }}>{item.author.name}</span>
                {item.author.verified && <VerifiedBadge />}
              </div>
            </div>
            <span className="text-[8px]" style={{
            color: '#556A61'
          }}>{item.timeLabel}</span>
          </div>
        </div>
      </div>
      <div className="px-5 pb-5">
        <ReactionBar reactions={item.reactions} onComment={onComment} commentCount={item.totalComments} />
      </div>
    </motion.article>;
};

// ─── Card: Reward ─────────────────────────────────────────────────────────────

const RewardCard = ({
  item,
  onComment
}: {
  item: FeedItem;
  onComment: () => void;
}) => {
  const rd = item.rewardData!;
  return <motion.article whileTap={{
    scale: 0.98
  }} className="mx-5 rounded-[24px] overflow-hidden" style={{
    background: 'linear-gradient(135deg, rgba(244,197,66,0.07) 0%, #0B221C 100%)',
    border: '1px solid rgba(244,197,66,0.15)'
  }}>
      {/* Gold accent bar */}
      <div className="h-[2px]" style={{
      background: 'linear-gradient(90deg, transparent, rgba(244,197,66,0.6), transparent)'
    }} />
      <div className="px-5 pt-4 pb-5">
        <div className="flex items-center justify-between mb-4">
          <TagPill label={item.tag} color="#F4C542" icon={<Crown size={8} />} />
          <span className="text-[9px]" style={{
          color: '#556A61'
        }}>{item.timeLabel}</span>
        </div>
        <div className="flex items-center gap-4 mb-4">
          <div className="relative flex-shrink-0">
            <img src={rd.img} alt={`Portrait de ${rd.player}`} className="w-[68px] h-[68px] rounded-[16px] object-cover" style={{
            border: '2px solid rgba(244,197,66,0.25)'
          }} />
            <div className="absolute -bottom-1.5 -right-1.5 w-6 h-6 rounded-[8px] flex items-center justify-center" style={{
            background: '#F4C542'
          }}>
              <Trophy size={11} style={{
              color: '#0B221C'
            }} />
            </div>
          </div>
          <div className="flex-1">
            <p className="text-[8px] font-black uppercase tracking-[0.2em] mb-1" style={{
            color: 'rgba(244,197,66,0.5)'
          }}>{rd.award}</p>
            <h3 className="text-[17px] font-black leading-none mb-1" style={{
            color: '#F2EEDC'
          }}>{rd.player}</h3>
            <p className="text-[10px]" style={{
            color: '#8A938C'
          }}>{rd.team}</p>
          </div>
          <span className="text-[40px] leading-none" aria-hidden="true">🏆</span>
        </div>
        <AuthorRow item={item} />
        <div className="mt-3">
          <ReactionBar reactions={item.reactions} onComment={onComment} commentCount={item.totalComments} />
        </div>
      </div>
    </motion.article>;
};

// ─── Card: Solidarity ─────────────────────────────────────────────────────────

const SolidarityCard = ({
  item,
  onComment
}: {
  item: FeedItem;
  onComment: () => void;
}) => {
  const sd = item.solidarityData!;
  const pct = Math.round(sd.raised / sd.goal * 100);
  return <motion.article whileTap={{
    scale: 0.98
  }} className="mx-5 rounded-[24px] overflow-hidden" style={{
    background: 'linear-gradient(135deg, rgba(46,143,87,0.08) 0%, #0B221C 100%)',
    border: '1px solid rgba(46,143,87,0.15)'
  }}>
      <div className="relative h-[120px] overflow-hidden">
        <img src={item.img} alt={`Visuel du projet ${sd.project}`} className="w-full h-full object-cover" style={{
        filter: 'brightness(0.3)'
      }} />
        <div className="absolute inset-0" style={{
        background: 'linear-gradient(to top, rgba(11,34,28,0.97) 0%, transparent 55%)'
      }} />
        <div className="absolute top-3 left-4">
          <TagPill label={item.tag} color="#2E8F57" icon={<Heart size={8} />} />
        </div>
        <div className="absolute bottom-3 left-4">
          <h3 className="text-[14px] font-black" style={{
          color: '#F2EEDC'
        }}>{sd.project}</h3>
        </div>
      </div>
      <div className="px-5 pt-4 pb-5">
        <p className="text-[11px] leading-relaxed mb-4" style={{
        color: 'rgba(215,219,200,0.55)'
      }}>{item.excerpt}</p>
        {/* Progress */}
        <div className="flex items-end justify-between mb-2">
          <div>
            <p className="text-[9px] font-bold uppercase tracking-wider mb-0.5" style={{
            color: '#8A938C'
          }}>Collecté</p>
            <p className="text-[15px] font-black leading-none" style={{
            color: '#F2EEDC'
          }}>
              {sd.raised.toLocaleString()} €
              <span className="text-[10px] font-semibold ml-1" style={{
              color: '#8A938C'
            }}>/ {sd.goal.toLocaleString()} €</span>
            </p>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-[22px] font-black leading-none" style={{
            color: '#B7FF1A'
          }}>{pct} %</span>
            <span className="text-[8px]" style={{
            color: '#8A938C'
          }}>objectif fin juillet</span>
          </div>
        </div>
        <div className="w-full h-[5px] rounded-full overflow-hidden mb-4" style={{
        background: 'rgba(255,255,255,0.06)'
      }}>
          <motion.div initial={{
          width: '0%'
        }} animate={{
          width: `${pct}%`
        }} transition={{
          duration: 1.2,
          ease: 'easeOut',
          delay: 0.2
        }} className="h-full rounded-full" style={{
          background: 'linear-gradient(90deg, #2E8F57, #B7FF1A)'
        }} />
        </div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-1.5">
            <Users size={10} style={{
            color: '#556A61'
          }} />
            <span className="text-[10px] font-bold" style={{
            color: '#556A61'
          }}>{sd.donors} donateurs</span>
          </div>
          <button className="flex items-center gap-1.5 px-4 py-2 text-[10px] font-black rounded-[11px] uppercase tracking-wider" style={{
          background: '#B7FF1A',
          color: '#0B221C'
        }}>
            <Zap size={9} />
            <span>Soutenir le projet</span>
          </button>
        </div>
        <AuthorRow item={item} />
        <div className="mt-3">
          <ReactionBar reactions={item.reactions} onComment={onComment} commentCount={item.totalComments} />
        </div>
      </div>
    </motion.article>;
};

// ─── Card: Sponsored ─────────────────────────────────────────────────────────

const SponsoredCard = ({
  item,
  onComment
}: {
  item: FeedItem;
  onComment: () => void;
}) => <motion.article whileTap={{
  scale: 0.98
}} className="mx-5 rounded-[24px] overflow-hidden" style={{
  background: '#123129',
  border: '1px solid rgba(255,255,255,0.05)'
}}>
    <div className="relative h-[150px] overflow-hidden">
      <img src={item.img} alt={item.title} className="w-full h-full object-cover" style={{
      filter: 'brightness(0.35)'
    }} />
      <div className="absolute inset-0" style={{
      background: 'linear-gradient(to top, rgba(18,49,41,0.95) 0%, transparent 50%)'
    }} />
      {/* Sponsored badge */}
      <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-[8px]" style={{
      background: 'rgba(138,147,140,0.12)',
      border: '1px solid rgba(138,147,140,0.18)'
    }}>
        <Star size={8} style={{
        color: '#8A938C'
      }} />
        <span className="text-[8px] font-black uppercase tracking-wider" style={{
        color: '#8A938C'
      }}>
          Sponsorisé · {item.sponsoredBy}
        </span>
      </div>
      <div className="absolute bottom-0 left-4 right-4 pb-4">
        <h3 className="text-[14px] font-black leading-snug" style={{
        color: '#F2EEDC'
      }}>{item.title}</h3>
      </div>
    </div>
    <div className="px-5 pt-4 pb-5">
      {item.excerpt && <p className="text-[11px] leading-relaxed mb-4" style={{
      color: 'rgba(215,219,200,0.5)'
    }}>{item.excerpt}</p>}
      <button className="w-full py-2.5 rounded-[13px] text-[10px] font-black uppercase tracking-wider mb-4 flex items-center justify-center gap-2" style={{
      background: 'rgba(255,255,255,0.05)',
      border: '1px solid rgba(255,255,255,0.09)',
      color: '#C9C1A2'
    }}>
        <ArrowUpRight size={12} />
        <span>Découvrir la collection</span>
      </button>
      <AuthorRow item={item} />
      <div className="mt-3">
        <ReactionBar reactions={item.reactions} onComment={onComment} commentCount={item.totalComments} />
      </div>
    </div>
  </motion.article>;

// ─── Feed Section Divider ─────────────────────────────────────────────────────

const SectionDivider = ({
  label,
  count
}: {
  label: string;
  count: number;
}) => <div className="flex items-center gap-3 px-5">
    <div className="flex-1 h-px" style={{
    background: 'rgba(255,255,255,0.05)'
  }} />
    <div className="flex items-center gap-1.5">
      <span className="text-[8px] font-black uppercase tracking-[0.22em]" style={{
      color: '#556A61'
    }}>{label}</span>
      <span className="text-[8px] font-bold px-1.5 py-0.5 rounded-md" style={{
      background: 'rgba(255,255,255,0.04)',
      color: '#556A61'
    }}>{count}</span>
    </div>
    <div className="flex-1 h-px" style={{
    background: 'rgba(255,255,255,0.05)'
  }} />
  </div>;

// ─── NewsFeedScreen ───────────────────────────────────────────────────────────

export const NewsFeedScreen = ({
  onInputFocus
}: {
  onInputFocus?: (focused: boolean) => void;
}) => {
  const [activeFilter, setActiveFilter] = useState<FeedCategory>('all');
  const [openCommentId, setOpenCommentId] = useState<string | null>(null);
  const filteredItems = activeFilter === 'all' ? FEED_ITEMS : FEED_ITEMS.filter(item => item.category === activeFilter);
  const openItem = openCommentId ? FEED_ITEMS.find(i => i.id === openCommentId) : null;

  // Groupement par date pour le feed complet
  const todayItems = filteredItems.filter(i => i.timeGroup === 'today');
  const yesterdayItems = filteredItems.filter(i => i.timeGroup === 'yesterday');
  const olderItems = filteredItems.filter(i => i.timeGroup === 'older');
  const renderCard = (item: FeedItem) => {
    const handleComment = () => setOpenCommentId(item.id);
    if (item.type === 'hero') return <HeroCard key={item.id} item={item} onComment={handleComment} />;
    if (item.type === 'result') return <ResultCard key={item.id} item={item} onComment={handleComment} />;
    if (item.type === 'schedule_change') return <ScheduleCard key={item.id} item={item} onComment={handleComment} />;
    if (item.type === 'team_photo') return <MediaCard key={item.id} item={item} onComment={handleComment} />;
    if (item.type === 'reward') return <RewardCard key={item.id} item={item} onComment={handleComment} />;
    if (item.type === 'solidarity') return <SolidarityCard key={item.id} item={item} onComment={handleComment} />;
    if (item.type === 'sponsored') return <SponsoredCard key={item.id} item={item} onComment={handleComment} />;
    return <StandardCard key={item.id} item={item} onComment={handleComment} />;
  };
  return <div className="flex flex-col gap-5 pb-4">
      {/* Live ticker */}
      <LiveTicker />

      {/* Category filters */}
      <div className="flex gap-2 overflow-x-auto px-5" style={{
      scrollbarWidth: 'none'
    }}>
        {FEED_FILTERS.map(f => <button key={f.id} onClick={() => setActiveFilter(f.id)} className="flex items-center gap-1.5 px-3.5 py-2 rounded-[13px] text-[9px] font-black uppercase tracking-wide whitespace-nowrap transition-all flex-shrink-0" style={activeFilter === f.id ? {
        background: '#B7FF1A',
        color: '#0B221C',
        boxShadow: '0 4px 16px rgba(183,255,26,0.2)'
      } : {
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.07)',
        color: '#556A61'
      }}>
            <span>{f.emoji}</span>
            <span>{f.label}</span>
            {activeFilter === f.id && filteredItems.length > 0 && <span className="ml-0.5 px-1.5 py-0.5 rounded-md text-[8px] font-black" style={{
          background: 'rgba(11,34,28,0.25)',
          color: '#0B221C'
        }}>
                {filteredItems.length}
              </span>}
          </button>)}
      </div>

      {/* Feed with grouped sections */}
      {filteredItems.length === 0 ? <div className="flex flex-col items-center justify-center py-16 gap-4 px-10">
          <div className="w-16 h-16 rounded-[20px] flex items-center justify-center" style={{
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.07)'
      }}>
            <Megaphone size={24} style={{
          color: '#8A938C'
        }} />
          </div>
          <p className="text-[13px] font-black text-center" style={{
        color: '#D7DBC8'
      }}>Aucun contenu dans cette catégorie</p>
          <p className="text-[11px] text-center" style={{
        color: '#8A938C'
      }}>Revenez bientôt !</p>
        </div> : <div className="flex flex-col gap-4">
          {/* Today */}
          {todayItems.length > 0 && <div className="flex flex-col gap-4">
              <SectionDivider label="Aujourd'hui" count={todayItems.length} />
              {todayItems.map(item => renderCard(item))}
            </div>}
          {/* Yesterday */}
          {yesterdayItems.length > 0 && <div className="flex flex-col gap-4">
              <SectionDivider label="Hier" count={yesterdayItems.length} />
              {yesterdayItems.map(item => renderCard(item))}
            </div>}
          {/* Older */}
          {olderItems.length > 0 && <div className="flex flex-col gap-4">
              <SectionDivider label="Cette semaine" count={olderItems.length} />
              {olderItems.map(item => renderCard(item))}
            </div>}
        </div>}

      {/* Comment overlay */}
      <AnimatePresence>
        {openItem && <React.Fragment key="comment-overlay">
            <motion.div key="backdrop" initial={{
          opacity: 0
        }} animate={{
          opacity: 1
        }} exit={{
          opacity: 0
        }} className="fixed inset-0 z-[70]" style={{
          background: 'rgba(11,34,28,0.7)',
          backdropFilter: 'blur(4px)'
        }} onClick={() => setOpenCommentId(null)} />
            <CommentPanel key="comment-panel" item={openItem} onClose={() => setOpenCommentId(null)} onInputFocus={onInputFocus} />
          </React.Fragment>}
      </AnimatePresence>
    </div>;
};