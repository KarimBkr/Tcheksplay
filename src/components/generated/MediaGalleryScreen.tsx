import React, { useState } from 'react';
import { PlayCircle, Image, Camera, Video, ChevronLeft, ChevronRight, X, Eye, Calendar, Shield, User, Trophy, Download, Share2, Star, Zap, Filter, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// ─── Types ────────────────────────────────────────────────────────────────────

type MediaType = 'all' | 'video' | 'photo';
type MediaCategory = 'all' | 'highlights' | 'aftermovies' | 'official' | 'celebrations' | 'moments';
type GalleryView = 'gallery' | 'matches' | 'editions';
interface MediaItem {
  id: string;
  type: 'video' | 'photo';
  category: MediaCategory;
  title: string;
  img: string;
  duration?: string;
  views: string;
  matchId?: string;
  matchLabel?: string;
  teamId?: string;
  teamLabel?: string;
  playerId?: string;
  playerLabel?: string;
  edition: string;
  date: string;
  featured?: boolean;
}
interface GalleryMatch {
  id: string;
  label: string;
  date: string;
  mediaCount: number;
  img: string;
  result: string;
  status: 'FT' | 'live' | 'upcoming';
}
interface GalleryEdition {
  id: string;
  label: string;
  icon: string;
  mediaCount: number;
  year: string;
}
interface FilterTag {
  id: string;
  label: string;
  type: 'match' | 'team' | 'player';
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const GALLERY_EDITIONS: GalleryEdition[] = [{
  id: 'summer',
  label: 'Summer Cup S3',
  icon: '☀️',
  mediaCount: 142,
  year: '2025'
}, {
  id: 'winter',
  label: 'Winter Cup S2',
  icon: '❄️',
  mediaCount: 98,
  year: '2024'
}, {
  id: 'spring',
  label: 'Spring Open S1',
  icon: '🌿',
  mediaCount: 64,
  year: '2023'
}];
const GALLERY_MATCHES: GalleryMatch[] = [{
  id: 'm1',
  label: 'Annecy FC vs Seynod City',
  date: 'Auj.',
  mediaCount: 28,
  img: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=400&q=80',
  result: '2–1',
  status: 'FT'
}, {
  id: 'm2',
  label: 'Demi-finale · Annecy vs Veyrier',
  date: 'Sam.',
  mediaCount: 41,
  img: 'https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?auto=format&fit=crop&w=400&q=80',
  result: '3–2',
  status: 'FT'
}, {
  id: 'm3',
  label: 'Finale Summer Cup S2',
  date: '14 Jan.',
  mediaCount: 67,
  img: 'https://images.unsplash.com/photo-1551958219-acbc595d4c80?auto=format&fit=crop&w=400&q=80',
  result: '1–0',
  status: 'FT'
}];
const MEDIA_CATEGORY_FILTERS: Array<{
  id: MediaCategory;
  label: string;
  emoji: string;
}> = [{
  id: 'all',
  label: 'Tout',
  emoji: '✦'
}, {
  id: 'highlights',
  label: 'Highlights',
  emoji: '⚡'
}, {
  id: 'aftermovies',
  label: 'Aftermovies',
  emoji: '🎬'
}, {
  id: 'official',
  label: 'Officielles',
  emoji: '📸'
}, {
  id: 'celebrations',
  label: 'Célébrations',
  emoji: '🏆'
}, {
  id: 'moments',
  label: 'Moments Forts',
  emoji: '🔥'
}];
const FILTER_TAGS: FilterTag[] = [{
  id: 'afc',
  label: 'Annecy FC',
  type: 'team'
}, {
  id: 'vey',
  label: 'Veyrier Utd',
  type: 'team'
}, {
  id: 'sey',
  label: 'Seynod City',
  type: 'team'
}, {
  id: 'kbersot',
  label: 'K. Bersot',
  type: 'player'
}, {
  id: 'ymebrouk',
  label: 'Y. Mebrouk',
  type: 'player'
}, {
  id: 'finale',
  label: 'Finale',
  type: 'match'
}];
const MEDIA_ITEMS: MediaItem[] = [{
  id: 'med1',
  type: 'video',
  category: 'highlights',
  title: "But d'anthologie de Killian — 78'",
  img: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=600&q=80',
  duration: '0:42',
  views: '2.4k',
  matchId: 'm1',
  matchLabel: 'Annecy vs Seynod',
  playerLabel: 'K. Bersot',
  teamLabel: 'Annecy FC',
  edition: 'Summer Cup S3',
  date: 'Auj.',
  featured: true
}, {
  id: 'med2',
  type: 'video',
  category: 'aftermovies',
  title: 'Aftermovie Demi-finale — Tension & Beauté',
  img: 'https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?auto=format&fit=crop&w=600&q=80',
  duration: '4:17',
  views: '5.8k',
  matchId: 'm2',
  matchLabel: 'Annecy vs Veyrier',
  teamLabel: 'Annecy FC',
  edition: 'Summer Cup S3',
  date: 'Sam.',
  featured: true
}, {
  id: 'med3',
  type: 'photo',
  category: 'official',
  title: 'Galerie officielle — Finale Summer Cup S2',
  img: 'https://images.unsplash.com/photo-1551958219-acbc595d4c80?auto=format&fit=crop&w=600&q=80',
  duration: '36 photos',
  views: '3.1k',
  matchId: 'm3',
  matchLabel: 'Finale S2',
  edition: 'Winter Cup S2',
  date: '14 Jan.'
}, {
  id: 'med4',
  type: 'video',
  category: 'highlights',
  title: 'Top 10 buts de la saison S3',
  img: 'https://images.unsplash.com/photo-1517927033932-b3d18e61fb3a?auto=format&fit=crop&w=600&q=80',
  duration: '2:30',
  views: '7.2k',
  edition: 'Summer Cup S3',
  date: 'Hier',
  featured: true
}, {
  id: 'med5',
  type: 'photo',
  category: 'celebrations',
  title: 'La joie de Seynod City après le nul',
  img: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=600&q=80',
  duration: '12 photos',
  views: '890',
  teamLabel: 'Seynod City',
  edition: 'Summer Cup S3',
  date: 'Hier'
}, {
  id: 'med6',
  type: 'video',
  category: 'moments',
  title: 'Arrêt décisif de Touazi — Quart de finale',
  img: 'https://images.unsplash.com/photo-1553778263-73a83bab9b0c?auto=format&fit=crop&w=600&q=80',
  duration: '0:19',
  views: '1.6k',
  playerLabel: 'A. Touazi',
  teamLabel: 'Cran Giants',
  edition: 'Summer Cup S3',
  date: 'Il y a 2j'
}, {
  id: 'med7',
  type: 'photo',
  category: 'official',
  title: 'Portraits officiels S3 — Tous les joueurs',
  img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80',
  duration: '86 photos',
  views: '4.3k',
  edition: 'Summer Cup S3',
  date: 'Il y a 3j'
}, {
  id: 'med8',
  type: 'video',
  category: 'aftermovies',
  title: 'Aftermovie complet — Winter Cup S2',
  img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
  duration: '6:54',
  views: '9.1k',
  edition: 'Winter Cup S2',
  date: 'Il y a 5j',
  featured: false
}];
const CATEGORY_CONFIG: Record<MediaCategory, {
  color: string;
  bg: string;
}> = {
  all: {
    color: '#B7FF1A',
    bg: 'rgba(183,255,26,0.1)'
  },
  highlights: {
    color: '#F4C542',
    bg: 'rgba(244,197,66,0.12)'
  },
  aftermovies: {
    color: '#7BA7D9',
    bg: 'rgba(123,167,217,0.12)'
  },
  official: {
    color: '#C9C1A2',
    bg: 'rgba(201,193,162,0.12)'
  },
  celebrations: {
    color: '#35D07F',
    bg: 'rgba(53,208,127,0.12)'
  },
  moments: {
    color: '#D94B5B',
    bg: 'rgba(217,75,91,0.12)'
  }
};

// ─── MediaLightbox ────────────────────────────────────────────────────────────

const MediaLightbox = ({
  item,
  onClose,
  onPrev,
  onNext,
  hasPrev,
  hasNext
}: {
  item: MediaItem;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  hasPrev: boolean;
  hasNext: boolean;
}) => <motion.div initial={{
  opacity: 0
}} animate={{
  opacity: 1
}} exit={{
  opacity: 0
}} className="fixed inset-0 z-[100] flex flex-col" style={{
  background: 'rgba(11,34,28,0.97)',
  backdropFilter: 'blur(20px)'
}}>
    {/* Top bar */}
    <div className="flex items-center justify-between px-5 pt-12 pb-4 flex-shrink-0">
      <button onClick={onClose} aria-label="Fermer" className="w-9 h-9 rounded-full flex items-center justify-center" style={{
      background: 'rgba(255,255,255,0.07)',
      border: '1px solid rgba(255,255,255,0.1)'
    }}>
        <X size={16} style={{
        color: '#F2EEDC'
      }} />
      </button>
      <div className="flex items-center gap-3">
        <button aria-label="Partager" className="w-9 h-9 rounded-full flex items-center justify-center" style={{
        background: 'rgba(255,255,255,0.05)'
      }}>
          <Share2 size={15} style={{
          color: '#8A938C'
        }} />
        </button>
        <button aria-label="Télécharger" className="w-9 h-9 rounded-full flex items-center justify-center" style={{
        background: 'rgba(255,255,255,0.05)'
      }}>
          <Download size={15} style={{
          color: '#8A938C'
        }} />
        </button>
      </div>
    </div>

    {/* Media area */}
    <div className="flex-1 flex items-center justify-center px-5 relative">
      <div className="w-full rounded-[24px] overflow-hidden relative" style={{
      maxHeight: '55vh'
    }}>
        <img src={item.img} alt={item.title} className="w-full object-cover" style={{
        maxHeight: '55vh',
        filter: 'brightness(0.7)'
      }} />
        {item.type === 'video' && <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{
          background: 'rgba(183,255,26,0.15)',
          backdropFilter: 'blur(8px)',
          border: '2px solid rgba(183,255,26,0.35)'
        }}>
              <PlayCircle size={30} style={{
            color: '#B7FF1A'
          }} />
            </div>
          </div>}
        <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg" style={{
        background: 'rgba(11,34,28,0.8)',
        backdropFilter: 'blur(6px)'
      }}>
          <span className="text-[10px] font-black" style={{
          color: '#D7DBC8'
        }}>{item.duration}</span>
        </div>
      </div>
      {hasPrev && <button onClick={onPrev} aria-label="Précédent" className="absolute left-2 w-9 h-9 rounded-full flex items-center justify-center" style={{
      background: 'rgba(18,49,41,0.9)',
      border: '1px solid rgba(255,255,255,0.08)'
    }}>
          <ChevronLeft size={18} style={{
        color: '#F2EEDC'
      }} />
        </button>}
      {hasNext && <button onClick={onNext} aria-label="Suivant" className="absolute right-2 w-9 h-9 rounded-full flex items-center justify-center" style={{
      background: 'rgba(18,49,41,0.9)',
      border: '1px solid rgba(255,255,255,0.08)'
    }}>
          <ChevronRight size={18} style={{
        color: '#F2EEDC'
      }} />
        </button>}
    </div>

    {/* Info panel */}
    <div className="px-5 pt-5 pb-10 flex-shrink-0">
      <h3 className="text-[16px] font-black leading-snug mb-3" style={{
      color: '#F2EEDC'
    }}>{item.title}</h3>
      <div className="flex flex-wrap gap-2 mb-4">
        {item.matchLabel && <span className="flex items-center gap-1 px-2.5 py-1 rounded-[10px] text-[9px] font-black" style={{
        background: 'rgba(183,255,26,0.08)',
        border: '1px solid rgba(183,255,26,0.15)',
        color: '#B7FF1A'
      }}>
            <Trophy size={8} />
            <span>{item.matchLabel}</span>
          </span>}
        {item.teamLabel && <span className="flex items-center gap-1 px-2.5 py-1 rounded-[10px] text-[9px] font-black" style={{
        background: 'rgba(46,143,87,0.1)',
        border: '1px solid rgba(46,143,87,0.2)',
        color: '#2E8F57'
      }}>
            <Shield size={8} />
            <span>{item.teamLabel}</span>
          </span>}
        {item.playerLabel && <span className="flex items-center gap-1 px-2.5 py-1 rounded-[10px] text-[9px] font-black" style={{
        background: 'rgba(123,167,217,0.1)',
        border: '1px solid rgba(123,167,217,0.2)',
        color: '#7BA7D9'
      }}>
            <User size={8} />
            <span>{item.playerLabel}</span>
          </span>}
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <Eye size={11} style={{
            color: '#8A938C'
          }} />
            <span className="text-[10px] font-bold" style={{
            color: '#8A938C'
          }}>{item.views} vues</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar size={11} style={{
            color: '#8A938C'
          }} />
            <span className="text-[10px] font-bold" style={{
            color: '#8A938C'
          }}>{item.date}</span>
          </div>
        </div>
        <span className="text-[9px] font-black uppercase tracking-wider px-2.5 py-1 rounded-[8px]" style={{
        background: 'rgba(255,255,255,0.05)',
        color: '#8A938C'
      }}>{item.edition}</span>
      </div>
    </div>
  </motion.div>;

// ─── CategoryBadge ────────────────────────────────────────────────────────────

const CategoryBadge = ({
  category,
  label
}: {
  category: MediaCategory;
  label: string;
}) => {
  const cfg = CATEGORY_CONFIG[category];
  return <span className="text-[8px] font-black uppercase tracking-wider px-2 py-0.5 rounded-[6px]" style={{
    background: cfg.bg,
    color: cfg.color
  }}>
      {label}
    </span>;
};

// ─── MediaGalleryScreen ────────────────────────────────────────────────────────

export const MediaGalleryScreen = () => {
  const [mediaType, setMediaType] = useState<MediaType>('all');
  const [category, setCategory] = useState<MediaCategory>('all');
  const [activeEdition, setActiveEdition] = useState<string>('summer');
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [lightboxItem, setLightboxItem] = useState<MediaItem | null>(null);
  const [galleryView, setGalleryView] = useState<GalleryView>('gallery');
  const filtered = MEDIA_ITEMS.filter(item => {
    if (mediaType !== 'all' && item.type !== mediaType) return false;
    if (category !== 'all' && item.category !== category) return false;
    if (activeTag) {
      const tag = FILTER_TAGS.find(t => t.id === activeTag);
      if (tag?.type === 'team' && item.teamLabel !== tag.label) return false;
      if (tag?.type === 'player') {
        const playerMap: Record<string, string> = {
          'kbersot': 'Bersot',
          'ymebrouk': 'Mebrouk'
        };
        if (!item.playerLabel?.includes(playerMap[activeTag] ?? '')) return false;
      }
    }
    return true;
  });
  const lightboxIndex = lightboxItem ? filtered.indexOf(lightboxItem) : -1;
  const featuredItem = MEDIA_ITEMS.find(m => m.featured)!;
  const filteredCount = filtered.length;
  const categoryLabel = MEDIA_CATEGORY_FILTERS.find(f => f.id === category)?.label ?? 'Tout';
  const typeLabel = mediaType === 'all' ? 'tous' : mediaType === 'video' ? 'vidéos' : 'photos';
  return <div className="flex flex-col gap-0 pb-4">

      {/* ── HERO : À La Une ─────────────────────────────────────────────── */}
      <div className="relative mx-5 rounded-[28px] overflow-hidden mb-5" style={{
      height: '320px'
    }}>
        <img src={featuredItem.img} alt={featuredItem.title} className="w-full h-full object-cover" style={{
        filter: 'brightness(0.3)'
      }} />
        <div className="absolute inset-0" style={{
        background: 'linear-gradient(180deg, rgba(11,34,28,0.05) 0%, rgba(11,34,28,0.55) 45%, rgba(11,34,28,0.98) 100%)'
      }} />
        <div className="absolute inset-0" style={{
        background: 'linear-gradient(90deg, rgba(46,143,87,0.08) 0%, transparent 60%)'
      }} />

        {/* Top badges */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-[12px]" style={{
          background: 'rgba(11,34,28,0.75)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(183,255,26,0.25)'
        }}>
            <Star size={9} style={{
            color: '#B7FF1A'
          }} />
            <span className="text-[9px] font-black uppercase tracking-wider" style={{
            color: '#B7FF1A'
          }}>À La Une</span>
          </div>
          <div className="px-2.5 py-1.5 rounded-[10px]" style={{
          background: 'rgba(11,34,28,0.75)',
          backdropFilter: 'blur(12px)'
        }}>
            <CategoryBadge category={featuredItem.category} label="Highlight" />
          </div>
        </div>

        {/* Play button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.button whileTap={{
          scale: 0.93
        }} aria-label="Lire le highlight" className="w-[72px] h-[72px] rounded-full flex items-center justify-center" style={{
          background: 'rgba(183,255,26,0.18)',
          backdropFilter: 'blur(12px)',
          border: '2px solid rgba(183,255,26,0.45)'
        }}>
            <PlayCircle size={34} style={{
            color: '#B7FF1A'
          }} />
          </motion.button>
        </div>

        {/* Bottom info */}
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <p className="text-[8px] font-black uppercase tracking-[0.22em] mb-1.5" style={{
          color: 'rgba(183,255,26,0.65)'
        }}>
            {featuredItem.duration} · {featuredItem.views} vues · {featuredItem.teamLabel}
          </p>
          <h2 className="text-[19px] font-black leading-snug mb-2" style={{
          color: '#F2EEDC'
        }}>{featuredItem.title}</h2>
          <div className="flex items-center justify-between">
            <span className="text-[9px] font-bold" style={{
            color: '#8A938C'
          }}>{featuredItem.edition} · {featuredItem.date}</span>
            {/* Reel dots */}
            <div className="flex items-center gap-1">
              {MEDIA_ITEMS.filter(m => m.featured).map((m, i) => <div key={m.id} className="rounded-full transition-all" style={{
              width: i === 0 ? 18 : 5,
              height: 4,
              background: i === 0 ? '#B7FF1A' : 'rgba(255,255,255,0.3)'
            }} />)}
            </div>
          </div>
        </div>
      </div>

      {/* ── LEVEL 1 : Mode d'exploration ─────────────────────────────────── */}
      <div className="px-5 mb-1">
        <p className="text-[8px] font-black uppercase tracking-[0.2em] mb-2.5" style={{
        color: '#556A61'
      }}>Explorer par</p>
        <div className="flex gap-2">
          {[{
          id: 'gallery' as const,
          label: 'Galerie',
          icon: <Camera size={11} />
        }, {
          id: 'matches' as const,
          label: 'Par Match',
          icon: <Trophy size={11} />
        }, {
          id: 'editions' as const,
          label: 'Par Édition',
          icon: <Calendar size={11} />
        }].map(tab => <button key={tab.id} onClick={() => setGalleryView(tab.id)} className="flex items-center gap-1.5 px-3.5 py-2 rounded-[12px] text-[10px] font-black uppercase tracking-wide transition-all" style={galleryView === tab.id ? {
          background: '#B7FF1A',
          color: '#0B221C'
        } : {
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.07)',
          color: '#8A938C'
        }}>
              {tab.icon}
              <span>{tab.label}</span>
            </button>)}
        </div>
      </div>

      {/* ── BY MATCH view ─────────────────────────────────────────────────── */}
      {galleryView === 'matches' && <div className="px-5 pt-4 flex flex-col gap-3">
          {GALLERY_MATCHES.map(match => <motion.article key={match.id} whileTap={{
        scale: 0.98
      }} className="relative rounded-[22px] overflow-hidden cursor-pointer" style={{
        height: '130px'
      }}>
              <img src={match.img} alt={`Galerie du match ${match.label}`} className="w-full h-full object-cover" style={{
          filter: 'brightness(0.3)'
        }} />
              <div className="absolute inset-0" style={{
          background: 'linear-gradient(90deg, rgba(11,34,28,0.96) 0%, rgba(11,34,28,0.4) 60%, transparent 100%)'
        }} />
              <div className="absolute inset-0 flex items-center px-4 gap-4">
                <div className="flex flex-col flex-1 gap-1">
                  {/* Line 1: status + date */}
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-[6px] text-[8px] font-black uppercase" style={{
                background: 'rgba(201,193,162,0.15)',
                color: '#C9C1A2'
              }}>
                      {match.status}
                    </span>
                    <span className="text-[9px] font-bold" style={{
                color: '#8A938C'
              }}>{match.date}</span>
                  </div>
                  {/* Line 2: match name */}
                  <h4 className="text-[13px] font-black leading-snug" style={{
              color: '#F2EEDC'
            }}>{match.label}</h4>
                  {/* Line 3: score + count */}
                  <div className="flex items-center gap-2">
                    <span className="text-[15px] font-black tracking-tight" style={{
                color: '#B7FF1A'
              }}>{match.result}</span>
                    <span className="text-[9px] font-bold" style={{
                color: '#8A938C'
              }}>· {match.mediaCount} médias</span>
                  </div>
                </div>
                <div className="flex flex-col items-center gap-1 flex-shrink-0">
                  <div className="w-10 h-10 rounded-[14px] flex items-center justify-center" style={{
              background: 'rgba(183,255,26,0.1)',
              border: '1px solid rgba(183,255,26,0.2)'
            }}>
                    <Camera size={16} style={{
                color: '#B7FF1A'
              }} />
                  </div>
                  <span className="text-[8px] font-black uppercase tracking-wide" style={{
              color: '#8A938C'
            }}>Voir →</span>
                </div>
              </div>
            </motion.article>)}
        </div>}

      {/* ── BY EDITION view ───────────────────────────────────────────────── */}
      {galleryView === 'editions' && <div className="px-5 pt-4">
          <div className="flex gap-2 mb-5 overflow-x-auto" style={{
        scrollbarWidth: 'none'
      }}>
            {GALLERY_EDITIONS.map(ed => <button key={ed.id} onClick={() => setActiveEdition(ed.id)} className="flex items-center gap-1.5 px-3.5 py-2 rounded-[14px] text-[10px] font-black uppercase tracking-wide whitespace-nowrap transition-all" style={activeEdition === ed.id ? {
          background: '#B7FF1A',
          color: '#0B221C'
        } : {
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.07)',
          color: '#8A938C'
        }}>
                <span>{ed.icon}</span>
                <span>{ed.label}</span>
              </button>)}
          </div>
          {/* Edition meta */}
          {(() => {
        const ed = GALLERY_EDITIONS.find(e => e.id === activeEdition)!;
        return <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-[14px] font-black" style={{
              color: '#F2EEDC'
            }}>{ed.label} · {ed.year}</p>
                  <p className="text-[9px] font-bold" style={{
              color: '#8A938C'
            }}>{ed.mediaCount} médias disponibles</p>
                </div>
              </div>;
      })()}
          <div className="grid grid-cols-3 gap-2">
            {MEDIA_ITEMS.slice(0, 9).map(item => <motion.article key={item.id} whileTap={{
          scale: 0.95
        }} onClick={() => setLightboxItem(item)} className="relative rounded-[14px] overflow-hidden cursor-pointer" style={{
          aspectRatio: '1'
        }}>
                <img src={item.img} alt={item.title} className="w-full h-full object-cover" style={{
            filter: 'brightness(0.5)'
          }} />
                <div className="absolute inset-0 flex items-center justify-center">
                  {item.type === 'video' ? <PlayCircle size={18} style={{
              color: 'rgba(183,255,26,0.85)'
            }} /> : <Image size={14} style={{
              color: 'rgba(201,193,162,0.75)'
            }} />}
                </div>
                {/* Duration badge */}
                <div className="absolute bottom-1.5 left-1.5 px-1.5 py-0.5 rounded-[5px]" style={{
            background: 'rgba(11,34,28,0.8)'
          }}>
                  <span className="text-[8px] font-black" style={{
              color: '#D7DBC8'
            }}>{item.duration}</span>
                </div>
              </motion.article>)}
          </div>
        </div>}

      {/* ── GALLERY view ──────────────────────────────────────────────────── */}
      {galleryView === 'gallery' && <div className="flex flex-col gap-4 pt-4">

          {/* LEVEL 2 : Type de média */}
          <div className="px-5">
            <p className="text-[8px] font-black uppercase tracking-[0.2em] mb-2" style={{
          color: '#556A61'
        }}>Type</p>
            <div className="flex items-center gap-2">
              {[{
            id: 'all' as MediaType,
            label: 'Tout',
            icon: <Filter size={10} />
          }, {
            id: 'video' as MediaType,
            label: 'Vidéos',
            icon: <Video size={10} />
          }, {
            id: 'photo' as MediaType,
            label: 'Photos',
            icon: <Camera size={10} />
          }].map(t => <button key={t.id} onClick={() => setMediaType(t.id)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-[10px] text-[10px] font-black uppercase tracking-wide transition-all" style={mediaType === t.id ? {
            background: 'rgba(46,143,87,0.22)',
            border: '1px solid rgba(46,143,87,0.35)',
            color: '#B7FF1A'
          } : {
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.06)',
            color: '#8A938C'
          }}>
                  {t.icon}
                  <span>{t.label}</span>
                </button>)}
            </div>
          </div>

          {/* LEVEL 3 : Catégorie éditoriale */}
          <div className="px-5">
            <p className="text-[8px] font-black uppercase tracking-[0.2em] mb-2" style={{
          color: '#556A61'
        }}>Catégorie</p>
            <div className="flex gap-2 overflow-x-auto" style={{
          scrollbarWidth: 'none'
        }}>
              {MEDIA_CATEGORY_FILTERS.map(f => {
            const cfg = CATEGORY_CONFIG[f.id];
            const isActive = category === f.id;
            return <button key={f.id} onClick={() => setCategory(f.id)} className="flex items-center gap-1 px-3 py-1.5 rounded-[10px] text-[10px] font-black whitespace-nowrap transition-all flex-shrink-0" style={isActive ? {
              background: cfg.bg,
              border: `1px solid ${cfg.color}35`,
              color: cfg.color
            } : {
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.06)',
              color: '#8A938C'
            }}>
                    <span>{f.emoji}</span>
                    <span>{f.label}</span>
                  </button>;
          })}
            </div>
          </div>

          {/* LEVEL 4 : Filtres contextuels */}
          <div className="px-5">
            <p className="text-[8px] font-black uppercase tracking-[0.2em] mb-2" style={{
          color: '#556A61'
        }}>Équipe / Joueur</p>
            <div className="flex gap-2 overflow-x-auto" style={{
          scrollbarWidth: 'none'
        }}>
              {FILTER_TAGS.map(tag => <button key={tag.id} onClick={() => setActiveTag(activeTag === tag.id ? null : tag.id)} className="flex items-center gap-1 px-2.5 py-1.5 rounded-[9px] text-[9px] font-black whitespace-nowrap transition-all flex-shrink-0" style={activeTag === tag.id ? {
            background: tag.type === 'team' ? 'rgba(46,143,87,0.2)' : tag.type === 'player' ? 'rgba(123,167,217,0.2)' : 'rgba(183,255,26,0.12)',
            border: `1px solid ${tag.type === 'team' ? 'rgba(46,143,87,0.4)' : tag.type === 'player' ? 'rgba(123,167,217,0.4)' : 'rgba(183,255,26,0.3)'}`,
            color: tag.type === 'team' ? '#35D07F' : tag.type === 'player' ? '#7BA7D9' : '#B7FF1A'
          } : {
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.05)',
            color: '#8A938C'
          }}>
                  {tag.type === 'team' ? <Shield size={8} /> : tag.type === 'player' ? <User size={8} /> : <Trophy size={8} />}
                  <span className="ml-0.5">{tag.label}</span>
                </button>)}
            </div>
          </div>

          {/* Results count */}
          <div className="px-5 flex items-center gap-2">
            <span className="text-[11px] font-black" style={{
          color: '#F2EEDC'
        }}>{filteredCount}</span>
            <span className="text-[10px] font-bold" style={{
          color: '#8A938C'
        }}>
              {typeLabel} · {categoryLabel}
            </span>
            {activeTag && <button onClick={() => setActiveTag(null)} className="flex items-center gap-1 ml-1 px-2 py-0.5 rounded-full text-[8px] font-black" style={{
          background: 'rgba(217,75,91,0.12)',
          border: '1px solid rgba(217,75,91,0.25)',
          color: '#D94B5B'
        }}>
                <X size={8} />
                <span>Effacer</span>
              </button>}
          </div>

          {/* Media grid */}
          <div className="px-5 flex flex-col gap-3">
            {/* Featured wide card */}
            {filtered.length > 0 && <motion.article whileTap={{
          scale: 0.98
        }} onClick={() => setLightboxItem(filtered[0])} className="relative rounded-[24px] overflow-hidden cursor-pointer" style={{
          height: '230px'
        }}>
                <img src={filtered[0].img} alt={filtered[0].title} className="w-full h-full object-cover" style={{
            filter: 'brightness(0.38)'
          }} />
                <div className="absolute inset-0" style={{
            background: 'linear-gradient(to top, rgba(11,34,28,0.97) 0%, transparent 45%)'
          }} />

                {filtered[0].type === 'video' && <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full flex items-center justify-center" style={{
              background: 'rgba(183,255,26,0.14)',
              backdropFilter: 'blur(8px)',
              border: '1.5px solid rgba(183,255,26,0.32)'
            }}>
                      <PlayCircle size={26} style={{
                color: '#B7FF1A'
              }} />
                    </div>
                  </div>}

                {/* Top: type badge + duration */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                  <CategoryBadge category={filtered[0].category} label={MEDIA_CATEGORY_FILTERS.find(f => f.id === filtered[0].category)?.label ?? ''} />
                  <span className="px-2.5 py-1 rounded-[8px] text-[10px] font-black" style={{
              background: 'rgba(11,34,28,0.75)',
              backdropFilter: 'blur(6px)',
              color: '#D7DBC8'
            }}>
                    {filtered[0].duration}
                  </span>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-[14px] font-black leading-snug mb-1.5" style={{
              color: '#F2EEDC'
            }}>{filtered[0].title}</h3>
                  <div className="flex items-center gap-2">
                    <Eye size={10} style={{
                color: '#8A938C'
              }} />
                    <span className="text-[9px] font-bold" style={{
                color: '#8A938C'
              }}>{filtered[0].views} vues</span>
                    {filtered[0].teamLabel && <span className="text-[9px] font-bold" style={{
                color: '#8A938C'
              }}>· {filtered[0].teamLabel}</span>}
                    <span className="text-[9px] font-bold" style={{
                color: '#8A938C'
              }}>· {filtered[0].date}</span>
                  </div>
                </div>
              </motion.article>}

            {/* Grid of remaining */}
            <div className="grid grid-cols-2 gap-3">
              {filtered.slice(1).map(item => <motion.article key={item.id} whileTap={{
            scale: 0.96
          }} onClick={() => setLightboxItem(item)} className="relative rounded-[20px] overflow-hidden cursor-pointer" style={{
            aspectRatio: '4/5'
          }}>
                  <img src={item.img} alt={item.title} className="w-full h-full object-cover" style={{
              filter: 'brightness(0.42)'
            }} />
                  <div className="absolute inset-0" style={{
              background: 'linear-gradient(to top, rgba(11,34,28,0.96) 0%, transparent 45%)'
            }} />

                  {/* Play/image icon */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    {item.type === 'video' ? <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{
                background: 'rgba(183,255,26,0.1)',
                backdropFilter: 'blur(6px)',
                border: '1px solid rgba(183,255,26,0.25)'
              }}>
                          <PlayCircle size={16} style={{
                  color: '#B7FF1A'
                }} />
                        </div> : <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{
                background: 'rgba(201,193,162,0.1)',
                backdropFilter: 'blur(6px)',
                border: '1px solid rgba(201,193,162,0.2)'
              }}>
                          <Image size={14} style={{
                  color: '#C9C1A2'
                }} />
                        </div>}
                  </div>

                  {/* Duration top right */}
                  <div className="absolute top-2 right-2 px-2 py-0.5 rounded-[6px]" style={{
              background: 'rgba(11,34,28,0.78)',
              backdropFilter: 'blur(4px)'
            }}>
                    <span className="text-[9px] font-black" style={{
                color: '#D7DBC8'
              }}>{item.duration}</span>
                  </div>

                  {/* Category badge top left */}
                  <div className="absolute top-2 left-2">
                    <CategoryBadge category={item.category} label={MEDIA_CATEGORY_FILTERS.find(f => f.id === item.category)?.emoji ?? ''} />
                  </div>

                  {/* Bottom info */}
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <p className="text-[9px] font-bold leading-snug mb-0.5" style={{
                color: '#D7DBC8'
              }}>{item.title}</p>
                    <div className="flex items-center gap-1">
                      {(item.teamLabel || item.playerLabel) && <p className="text-[8px] font-bold" style={{
                  color: '#8A938C'
                }}>{item.teamLabel ?? item.playerLabel}</p>}
                      <span className="text-[8px] font-bold" style={{
                  color: '#556A61'
                }}>· {item.date}</span>
                    </div>
                  </div>
                </motion.article>)}
            </div>

            {filtered.length === 0 && <div className="flex flex-col items-center justify-center py-16 gap-3">
                <Camera size={28} style={{
            color: 'rgba(138,147,140,0.35)'
          }} />
                <p className="text-[13px] font-black" style={{
            color: '#D7DBC8'
          }}>Aucun média trouvé</p>
                <p className="text-[11px]" style={{
            color: '#8A938C'
          }}>Modifiez vos filtres</p>
              </div>}
          </div>

          {/* Stats bar */}
          <div className="mx-5 rounded-[20px] px-5 py-4 grid grid-cols-3 gap-0" style={{
        background: '#123129',
        border: '1px solid rgba(255,255,255,0.05)'
      }}>
            {[{
          label: 'Vidéos',
          value: '48',
          color: '#B7FF1A'
        }, {
          label: 'Photos',
          value: '94',
          color: '#C9C1A2'
        }, {
          label: 'Vues',
          value: '38k',
          color: '#7BA7D9'
        }].map((s, i) => <div key={s.label} className="flex flex-col items-center gap-1" style={{
          borderRight: i < 2 ? '1px solid rgba(255,255,255,0.05)' : 'none'
        }}>
                <span className="text-[20px] font-black leading-none tracking-tight" style={{
            color: s.color
          }}>{s.value}</span>
                <span className="text-[8px] font-black uppercase tracking-[0.15em]" style={{
            color: '#8A938C'
          }}>{s.label}</span>
              </div>)}
          </div>
        </div>}

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxItem && <MediaLightbox key="lightbox" item={lightboxItem} onClose={() => setLightboxItem(null)} onPrev={() => lightboxIndex > 0 && setLightboxItem(filtered[lightboxIndex - 1])} onNext={() => lightboxIndex < filtered.length - 1 && setLightboxItem(filtered[lightboxIndex + 1])} hasPrev={lightboxIndex > 0} hasNext={lightboxIndex < filtered.length - 1} />}
      </AnimatePresence>
    </div>;
};