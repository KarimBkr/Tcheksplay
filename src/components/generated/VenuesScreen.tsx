import React, { useState } from 'react';
import { MapPin, Car, Train, Users, ChevronRight, CheckCircle, Clock, Shield, Navigation, ExternalLink, Wind, Layers } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// ─── Types ────────────────────────────────────────────────────────────────────

type SurfaceType = 'synthetic' | 'natural' | 'futsal';
type AvailabilityStatus = 'available' | 'occupied' | 'maintenance';
interface VenueTransport {
  type: 'bus' | 'tram' | 'walk';
  label: string;
  detail: string;
}
interface VenueInfo {
  id: string;
  name: string;
  address: string;
  city: string;
  mapsUrl: string;
  surface: SurfaceType;
  capacity: number;
  lighting: boolean;
  parking: boolean;
  parkingDetails: string;
  changing: boolean;
  changingDetails: string;
  transport: VenueTransport[];
  notes: string;
  img: string;
  availability: AvailabilityStatus;
  nextMatch?: string;
  matchCount: number;
  featured?: boolean;
}
interface PlayerAvailability {
  id: string;
  name: string;
  team: string;
  avatar: string;
  confirmed: boolean;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const SURFACE_META: Record<SurfaceType, {
  label: string;
  color: string;
  icon: string;
}> = {
  synthetic: {
    label: 'Synthétique',
    color: '#B7FF1A',
    icon: '🟩'
  },
  natural: {
    label: 'Naturelle',
    color: '#2E8F57',
    icon: '🌿'
  },
  futsal: {
    label: 'Futsal',
    color: '#7BA7D9',
    icon: '🔵'
  }
};
const AVAILABILITY_META: Record<AvailabilityStatus, {
  label: string;
  color: string;
  bg: string;
  dot: boolean;
}> = {
  available: {
    label: 'Disponible',
    color: '#B7FF1A',
    bg: 'rgba(183,255,26,0.1)',
    dot: true
  },
  occupied: {
    label: 'Match en cours',
    color: '#D94B5B',
    bg: 'rgba(217,75,91,0.1)',
    dot: true
  },
  maintenance: {
    label: 'Maintenance',
    color: '#C9C1A2',
    bg: 'rgba(201,193,162,0.1)',
    dot: false
  }
};
const VENUES: VenueInfo[] = [{
  id: 'v1',
  name: 'Terrain des Marquisats',
  address: '2 Allée des Marquisats',
  city: 'Annecy Centre',
  mapsUrl: 'https://maps.google.com',
  surface: 'synthetic',
  capacity: 200,
  lighting: true,
  parking: true,
  parkingDetails: 'Parking gratuit sur place — 80 places. Accès côté lac, entrée avenue d\'Albigny.',
  changing: true,
  changingDetails: '2 vestiaires avec douches chaudes, 1 arbitre, capacité 15 personnes chacun.',
  transport: [{
    type: 'bus',
    label: 'Bus Ligne 1',
    detail: 'Arrêt Marquisats — 3 min à pied'
  }, {
    type: 'walk',
    label: 'Depuis la gare',
    detail: '18 min à pied'
  }],
  notes: 'Terrain principal du tournoi. Vue sur le lac d\'Annecy. Éclairage LED haute performance pour les matchs du soir.',
  img: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800&q=80',
  availability: 'occupied',
  nextMatch: 'Annecy FC vs Seynod City · Auj. 19:00',
  matchCount: 48,
  featured: true
}, {
  id: 'v2',
  name: 'Plateau de Veyrier',
  address: 'Rue du Plateau Sportif',
  city: 'Veyrier-du-Lac',
  mapsUrl: 'https://maps.google.com',
  surface: 'synthetic',
  capacity: 120,
  lighting: true,
  parking: true,
  parkingDetails: 'Parking municipal adjacent — 40 places. Gratuit en soirée et week-end.',
  changing: true,
  changingDetails: '2 vestiaires rénovés en 2024, douches modernes.',
  transport: [{
    type: 'bus',
    label: 'Bus Ligne 7',
    detail: 'Arrêt Veyrier-Centre — 5 min à pied'
  }],
  notes: 'Terrain secondaire. Ambiance village. Accès direct depuis la nationale.',
  img: 'https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?auto=format&fit=crop&w=800&q=80',
  availability: 'available',
  nextMatch: 'Veyrier Utd vs Poisy Stars · Auj. 20:30',
  matchCount: 22
}, {
  id: 'v3',
  name: 'Complexe de Meythet',
  address: '15 Chemin du Stade',
  city: 'Meythet',
  mapsUrl: 'https://maps.google.com',
  surface: 'natural',
  capacity: 80,
  lighting: false,
  parking: true,
  parkingDetails: 'Parking sur rue, accès depuis rue de la Paix.',
  changing: true,
  changingDetails: '1 vestiaire commun, douches froides uniquement.',
  transport: [{
    type: 'tram',
    label: 'Tram Ligne 2',
    detail: 'Arrêt Meythet-Parc — 8 min à pied'
  }],
  notes: 'Terrain naturel, uniquement disponible par temps sec. Matchs en journée recommandés (pas d\'éclairage).',
  img: 'https://images.unsplash.com/photo-1551958219-acbc595d4c80?auto=format&fit=crop&w=800&q=80',
  availability: 'available',
  matchCount: 14
}, {
  id: 'v4',
  name: 'Salle Futsal Seynod',
  address: 'Avenue du Sport',
  city: 'Seynod',
  mapsUrl: 'https://maps.google.com',
  surface: 'futsal',
  capacity: 150,
  lighting: true,
  parking: false,
  parkingDetails: 'Pas de parking dédié. Stationnement sur rue (payant en semaine).',
  changing: true,
  changingDetails: '4 vestiaires avec douches chaudes. Accueil + arbitrage sur place.',
  transport: [{
    type: 'bus',
    label: 'Bus Ligne 3',
    detail: 'Arrêt Seynod-Sport — 2 min à pied'
  }, {
    type: 'walk',
    label: 'Depuis Cran-Gevrier',
    detail: '12 min à pied'
  }],
  notes: 'Salle couverte climatisée. Utilisée pour les matchs de repêchage et les jours de mauvais temps.',
  img: 'https://images.unsplash.com/photo-1517927033932-b3d18e61fb3a?auto=format&fit=crop&w=800&q=80',
  availability: 'maintenance',
  matchCount: 8
}];
const PLAYER_AVAILABILITIES: PlayerAvailability[] = [{
  id: 'pa1',
  name: 'Killian Bersot',
  team: 'Annecy FC',
  avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=80&h=80',
  confirmed: true
}, {
  id: 'pa2',
  name: 'Yassin Mebrouk',
  team: 'Veyrier Utd',
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&h=80',
  confirmed: true
}, {
  id: 'pa3',
  name: 'Théo Garnier',
  team: 'Seynod City',
  avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=80&h=80',
  confirmed: false
}, {
  id: 'pa4',
  name: 'Amine Touazi',
  team: 'Cran Giants',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=80&h=80',
  confirmed: true
}, {
  id: 'pa5',
  name: 'Lucas Perrin',
  team: 'Poisy Stars',
  avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=80&h=80',
  confirmed: false
}];
const TRANSPORT_ICONS: Record<string, React.ReactNode> = {
  bus: <div className="w-4 h-4 rounded-[5px] flex items-center justify-center text-[7px] font-black" style={{
    background: '#7BA7D9',
    color: '#0B221C'
  }}>🚌</div>,
  tram: <div className="w-4 h-4 rounded-[5px] flex items-center justify-center text-[7px]" style={{
    background: '#2E8F57',
    color: '#0B221C'
  }}>🚃</div>,
  walk: <div className="w-4 h-4 rounded-[5px] flex items-center justify-center text-[7px]" style={{
    background: 'rgba(255,255,255,0.08)',
    color: '#C9C1A2'
  }}>🚶</div>
};

// ─── VenueDetail ──────────────────────────────────────────────────────────────

const VenueDetail = ({
  venue,
  onClose
}: {
  venue: VenueInfo;
  onClose: () => void;
}) => {
  const [myAvail, setMyAvail] = useState(false);
  const availMeta = AVAILABILITY_META[venue.availability];
  const surfMeta = SURFACE_META[venue.surface];
  const confirmedCount = PLAYER_AVAILABILITIES.filter(p => p.confirmed).length + (myAvail ? 1 : 0);
  return <motion.div initial={{
    y: '100%'
  }} animate={{
    y: 0
  }} exit={{
    y: '100%'
  }} transition={{
    type: 'spring',
    stiffness: 320,
    damping: 36
  }} className="fixed inset-x-0 bottom-0 z-[90] rounded-t-[32px] flex flex-col overflow-hidden" style={{
    maxHeight: '90vh',
    background: '#0B221C',
    border: '1px solid rgba(255,255,255,0.07)'
  }}>
      {/* Cover */}
      <div className="relative flex-shrink-0" style={{
      height: 180
    }}>
        <img src={venue.img} alt={`Photo de ${venue.name}`} className="w-full h-full object-cover" style={{
        filter: 'brightness(0.35)'
      }} />
        <div className="absolute inset-0" style={{
        background: 'linear-gradient(to top, rgba(11,34,28,0.98) 0%, rgba(11,34,28,0.2) 60%)'
      }} />
        <button onClick={onClose} className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center" style={{
        background: 'rgba(11,34,28,0.8)',
        border: '1px solid rgba(255,255,255,0.1)'
      }} aria-label="Fermer">
          <ChevronRight size={16} style={{
          color: '#F2EEDC',
          transform: 'rotate(90deg)'
        }} />
        </button>
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <div className="flex items-center gap-1.5 mb-2">
            <span>{surfMeta.icon}</span>
            <span className="text-[9px] font-black uppercase tracking-wider" style={{
            color: surfMeta.color
          }}>{surfMeta.label}</span>
          </div>
          <h3 className="text-[22px] font-black leading-tight" style={{
          color: '#F2EEDC'
        }}>{venue.name}</h3>
          <p className="text-[10px] font-bold mt-0.5" style={{
          color: '#8A938C'
        }}>{venue.address} · {venue.city}</p>
        </div>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto" style={{
      scrollbarWidth: 'none'
    }}>
        <div className="flex flex-col gap-5 px-5 pt-4 pb-28">

          {/* Status + next match */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-[10px]" style={{
            background: availMeta.bg,
            border: `1px solid ${availMeta.color}25`
          }}>
              {availMeta.dot && <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{
              background: availMeta.color
            }} />}
              <span className="text-[9px] font-black uppercase tracking-wider" style={{
              color: availMeta.color
            }}>{availMeta.label}</span>
            </div>
            <a href={venue.mapsUrl} target="_blank" rel="noopener noreferrer" aria-label="Ouvrir dans Google Maps" className="flex items-center gap-1.5 px-3 py-1.5 rounded-[10px] text-[10px] font-black" style={{
            background: 'rgba(183,255,26,0.08)',
            border: '1px solid rgba(183,255,26,0.18)',
            color: '#B7FF1A'
          }}>
              <Navigation size={11} />
              <span>Maps</span>
              <ExternalLink size={9} />
            </a>
          </div>

          {venue.nextMatch && <div className="flex items-center gap-2 px-3.5 py-2.5 rounded-[14px]" style={{
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.06)'
        }}>
              <Clock size={11} style={{
            color: '#8A938C'
          }} />
              <span className="text-[10px] font-bold" style={{
            color: '#D7DBC8'
          }}>{venue.nextMatch}</span>
            </div>}

          {/* Info cards */}
          <div className="grid grid-cols-2 gap-2.5">
            {[{
            label: 'Surface',
            value: surfMeta.label,
            icon: <Layers size={13} style={{
              color: surfMeta.color
            }} />,
            color: surfMeta.color
          }, {
            label: 'Capacité',
            value: `${venue.capacity} pers.`,
            icon: <Users size={13} style={{
              color: '#7BA7D9'
            }} />,
            color: '#7BA7D9'
          }, {
            label: 'Éclairage',
            value: venue.lighting ? 'Oui — LED' : 'Non disponible',
            icon: <Wind size={13} style={{
              color: venue.lighting ? '#B7FF1A' : '#8A938C'
            }} />,
            color: venue.lighting ? '#B7FF1A' : '#8A938C'
          }, {
            label: 'Matchs joués',
            value: `${venue.matchCount}`,
            icon: <Shield size={13} style={{
              color: '#C9C1A2'
            }} />,
            color: '#C9C1A2'
          }].map(info => <div key={info.label} className="flex flex-col gap-2 p-3 rounded-[14px]" style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.05)'
          }}>
                {info.icon}
                <div>
                  <p className="text-[8px] font-black uppercase tracking-wider mb-0.5" style={{
                color: '#8A938C'
              }}>{info.label}</p>
                  <p className="text-[11px] font-black" style={{
                color: info.color
              }}>{info.value}</p>
                </div>
              </div>)}
          </div>

          {/* Parking */}
          <div className="rounded-[18px] p-4" style={{
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.05)'
        }}>
            <div className="flex items-center gap-2 mb-2">
              <Car size={13} style={{
              color: venue.parking ? '#B7FF1A' : '#8A938C'
            }} />
              <span className="text-[10px] font-black uppercase tracking-wider" style={{
              color: venue.parking ? '#D7DBC8' : '#8A938C'
            }}>
                {venue.parking ? 'Parking disponible' : 'Pas de parking dédié'}
              </span>
            </div>
            <p className="text-[11px] leading-relaxed" style={{
            color: 'rgba(215,219,200,0.55)'
          }}>{venue.parkingDetails}</p>
          </div>

          {/* Changing rooms */}
          <div className="rounded-[18px] p-4" style={{
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.05)'
        }}>
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle size={13} style={{
              color: '#2E8F57'
            }} />
              <span className="text-[10px] font-black uppercase tracking-wider" style={{
              color: '#D7DBC8'
            }}>Vestiaires</span>
            </div>
            <p className="text-[11px] leading-relaxed" style={{
            color: 'rgba(215,219,200,0.55)'
          }}>{venue.changingDetails}</p>
          </div>

          {/* Transport */}
          <div>
            <h4 className="text-[9px] font-black uppercase tracking-[0.2em] mb-3" style={{
            color: '#8A938C'
          }}>Accès Transports</h4>
            <div className="flex flex-col gap-2">
              {venue.transport.map((t, i) => <div key={i} className="flex items-center gap-3 px-3.5 py-2.5 rounded-[12px]" style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.05)'
            }}>
                  {TRANSPORT_ICONS[t.type]}
                  <div className="flex-1">
                    <p className="text-[10px] font-black" style={{
                  color: '#D7DBC8'
                }}>{t.label}</p>
                    <p className="text-[9px]" style={{
                  color: '#8A938C'
                }}>{t.detail}</p>
                  </div>
                </div>)}
            </div>
          </div>

          {/* Notes */}
          {venue.notes && <div className="px-4 py-3 rounded-[14px]" style={{
          background: 'rgba(201,193,162,0.05)',
          border: '1px solid rgba(201,193,162,0.1)'
        }}>
              <p className="text-[10px] font-black uppercase tracking-wider mb-1" style={{
            color: '#8A938C'
          }}>Notes pratiques</p>
              <p className="text-[11px] leading-relaxed" style={{
            color: 'rgba(215,219,200,0.6)'
          }}>{venue.notes}</p>
            </div>}

          {/* Player availability */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-[9px] font-black uppercase tracking-[0.2em]" style={{
              color: '#8A938C'
            }}>Présences Confirmées</h4>
              <span className="text-[10px] font-black" style={{
              color: '#B7FF1A'
            }}>{confirmedCount}/{PLAYER_AVAILABILITIES.length + 1} joueurs</span>
            </div>

            <div className="flex flex-col gap-2 mb-3">
              {PLAYER_AVAILABILITIES.map(p => <div key={p.id} className="flex items-center gap-3 px-3 py-2.5 rounded-[12px]" style={{
              background: 'rgba(255,255,255,0.03)',
              border: `1px solid ${p.confirmed ? 'rgba(183,255,26,0.1)' : 'rgba(255,255,255,0.05)'}`
            }}>
                  <img src={p.avatar} alt={`Avatar de ${p.name}`} className="w-7 h-7 rounded-full object-cover flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] font-black leading-none" style={{
                  color: '#F2EEDC'
                }}>{p.name}</p>
                    <p className="text-[9px]" style={{
                  color: '#8A938C'
                }}>{p.team}</p>
                  </div>
                  <div className="flex items-center gap-1" style={{
                color: p.confirmed ? '#B7FF1A' : '#8A938C'
              }}>
                    {p.confirmed ? <CheckCircle size={14} style={{
                  color: '#B7FF1A'
                }} /> : <div className="w-3.5 h-3.5 rounded-full" style={{
                  border: '1.5px solid rgba(138,147,140,0.4)'
                }} />}
                  </div>
                </div>)}
            </div>

            <button onClick={() => setMyAvail(!myAvail)} className="w-full py-3 rounded-[14px] text-[11px] font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-all" style={myAvail ? {
            background: 'rgba(183,255,26,0.15)',
            border: '1px solid rgba(183,255,26,0.3)',
            color: '#B7FF1A'
          } : {
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.09)',
            color: '#D7DBC8'
          }}>
              <CheckCircle size={13} />
              <span>{myAvail ? 'Présence confirmée ✓' : 'Confirmer ma présence'}</span>
            </button>
          </div>

        </div>
      </div>
    </motion.div>;
};

// ─── VenuesScreen ─────────────────────────────────────────────────────────────

export const VenuesScreen = () => {
  const [selectedVenue, setSelectedVenue] = useState<VenueInfo | null>(null);
  const [surfaceFilter, setSurfaceFilter] = useState<SurfaceType | 'all'>('all');
  const filtered = surfaceFilter === 'all' ? VENUES : VENUES.filter(v => v.surface === surfaceFilter);
  return <div className="flex flex-col gap-5 px-5 pb-4">

      {/* Header */}
      <div className="rounded-[22px] p-4 flex items-center gap-3" style={{
      background: '#123129',
      border: '1px solid rgba(255,255,255,0.05)'
    }}>
        <div className="w-11 h-11 rounded-[14px] flex items-center justify-center flex-shrink-0" style={{
        background: 'rgba(183,255,26,0.08)',
        border: '1px solid rgba(183,255,26,0.15)'
      }}>
          <MapPin size={20} style={{
          color: '#B7FF1A'
        }} />
        </div>
        <div>
          <p className="text-[14px] font-black" style={{
          color: '#F2EEDC'
        }}>{VENUES.length} Terrains</p>
          <p className="text-[9px] font-bold uppercase tracking-wider" style={{
          color: '#8A938C'
        }}>Annecy & alentours · Saison 3</p>
        </div>
        <div className="ml-auto flex flex-col items-end gap-1">
          <span className="text-[20px] font-black leading-none" style={{
          color: '#B7FF1A'
        }}>{VENUES.filter(v => v.availability === 'available').length}</span>
          <span className="text-[8px] font-black uppercase" style={{
          color: '#8A938C'
        }}>dispo</span>
        </div>
      </div>

      {/* Surface filter */}
      <div className="flex gap-2 overflow-x-auto" style={{
      scrollbarWidth: 'none'
    }}>
        {[{
        id: 'all' as const,
        label: 'Tous',
        emoji: '📍'
      }, {
        id: 'synthetic' as SurfaceType,
        label: 'Synthétique',
        emoji: '🟩'
      }, {
        id: 'natural' as SurfaceType,
        label: 'Naturel',
        emoji: '🌿'
      }, {
        id: 'futsal' as SurfaceType,
        label: 'Futsal',
        emoji: '🔵'
      }].map(f => <button key={f.id} onClick={() => setSurfaceFilter(f.id)} className="flex items-center gap-1 px-3.5 py-2 rounded-[12px] text-[10px] font-black whitespace-nowrap transition-all" style={surfaceFilter === f.id ? {
        background: '#B7FF1A',
        color: '#0B221C'
      } : {
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.07)',
        color: '#8A938C'
      }}>
            <span>{f.emoji}</span>
            <span>{f.label}</span>
          </button>)}
      </div>

      {/* Venue cards */}
      {filtered.map(venue => {
      const availMeta = AVAILABILITY_META[venue.availability];
      const surfMeta = SURFACE_META[venue.surface];
      return <motion.article key={venue.id} whileTap={{
        scale: 0.98
      }} onClick={() => setSelectedVenue(venue)} className="rounded-[24px] overflow-hidden cursor-pointer" style={{
        background: '#123129',
        border: `1px solid ${venue.featured ? 'rgba(183,255,26,0.1)' : 'rgba(255,255,255,0.05)'}`
      }}>
            {/* Image */}
            <div className="relative overflow-hidden" style={{
          height: 140
        }}>
              <img src={venue.img} alt={`Photo de ${venue.name}`} className="w-full h-full object-cover" style={{
            filter: 'brightness(0.35)'
          }} />
              <div className="absolute inset-0" style={{
            background: 'linear-gradient(to bottom, transparent 30%, rgba(18,49,41,0.97) 100%)'
          }} />

              {/* Availability */}
              <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1.5 rounded-[10px]" style={{
            background: availMeta.bg,
            border: `1px solid ${availMeta.color}25`,
            backdropFilter: 'blur(8px)'
          }}>
                {availMeta.dot && <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{
              background: availMeta.color
            }} />}
                <span className="text-[8px] font-black uppercase tracking-wider" style={{
              color: availMeta.color
            }}>{availMeta.label}</span>
              </div>

              {/* Surface badge */}
              <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-[10px]" style={{
            background: 'rgba(11,34,28,0.8)',
            backdropFilter: 'blur(8px)'
          }}>
                <span className="text-[10px]">{surfMeta.icon}</span>
                <span className="text-[8px] font-black" style={{
              color: surfMeta.color
            }}>{surfMeta.label}</span>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="text-[15px] font-black leading-tight" style={{
              color: '#F2EEDC'
            }}>{venue.name}</h3>
              </div>
            </div>

            {/* Info row */}
            <div className="px-4 py-3.5">
              <div className="flex items-center gap-1 mb-2.5">
                <MapPin size={9} style={{
              color: '#8A938C'
            }} />
                <span className="text-[10px] font-bold" style={{
              color: '#8A938C'
            }}>{venue.address} · {venue.city}</span>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                {venue.parking && <span className="flex items-center gap-1 px-2 py-0.5 rounded-[7px] text-[8px] font-black" style={{
              background: 'rgba(255,255,255,0.04)',
              color: '#8A938C'
            }}>
                    <Car size={8} />
                    <span>Parking</span>
                  </span>}
                {venue.changing && <span className="flex items-center gap-1 px-2 py-0.5 rounded-[7px] text-[8px] font-black" style={{
              background: 'rgba(255,255,255,0.04)',
              color: '#8A938C'
            }}>
                    <CheckCircle size={8} />
                    <span>Vestiaires</span>
                  </span>}
                {venue.lighting && <span className="flex items-center gap-1 px-2 py-0.5 rounded-[7px] text-[8px] font-black" style={{
              background: 'rgba(255,255,255,0.04)',
              color: '#8A938C'
            }}>
                    <Wind size={8} />
                    <span>Éclairé</span>
                  </span>}
                <span className="flex items-center gap-1 px-2 py-0.5 rounded-[7px] text-[8px] font-black" style={{
              background: 'rgba(255,255,255,0.04)',
              color: '#8A938C'
            }}>
                  <Shield size={8} />
                  <span>{venue.matchCount} matchs</span>
                </span>
              </div>

              <div className="flex items-center justify-between mt-3">
                <div className="flex items-center gap-1">
                  <Train size={10} style={{
                color: '#7BA7D9'
              }} />
                  <span className="text-[9px] font-bold" style={{
                color: '#8A938C'
              }}>{venue.transport[0]?.label}</span>
                </div>
                <div className="flex items-center gap-1 text-[9px] font-black" style={{
              color: '#B7FF1A'
            }}>
                  <span>Voir détails</span>
                  <ChevronRight size={11} />
                </div>
              </div>
            </div>
          </motion.article>;
    })}

      {/* Venue detail sheet */}
      <AnimatePresence>
        {selectedVenue && <>
            <motion.div key="backdrop" initial={{
          opacity: 0
        }} animate={{
          opacity: 1
        }} exit={{
          opacity: 0
        }} className="fixed inset-0 z-[80]" style={{
          background: 'rgba(11,34,28,0.7)',
          backdropFilter: 'blur(4px)'
        }} onClick={() => setSelectedVenue(null)} />
            <VenueDetail key="detail" venue={selectedVenue} onClose={() => setSelectedVenue(null)} />
          </>}
      </AnimatePresence>

    </div>;
};