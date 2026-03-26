import React, { useState } from 'react';
import { Heart, MapPin, Users, Zap, ChevronRight, ArrowUpRight, CheckCircle, Calendar, TrendingUp, Star, Camera } from 'lucide-react';
import { motion } from 'framer-motion';

// ─── Types ────────────────────────────────────────────────────────────────────

type ProjectStatus = 'active' | 'completed' | 'upcoming';
interface ProjectUpdate {
  id: string;
  date: string;
  text: string;
  img?: string;
}
interface SolidProject {
  id: string;
  title: string;
  subtitle: string;
  location: string;
  raised: number;
  goal: number;
  donors: number;
  status: ProjectStatus;
  edition: string;
  img: string;
  coverImg: string;
  description: string;
  impact: string;
  color: string;
  updates: ProjectUpdate[];
  category: string;
  categoryEmoji: string;
}
interface SeasonContrib {
  id: string;
  label: string;
  amount: number;
  color: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const SEASON_CONTRIBS: SeasonContrib[] = [{
  id: 's3',
  label: 'Saison 3 · 2025',
  amount: 8500,
  color: '#B7FF1A'
}, {
  id: 's2',
  label: 'Saison 2 · 2024',
  amount: 3200,
  color: '#7BA7D9'
}, {
  id: 's1',
  label: 'Saison 1 · 2023',
  amount: 1800,
  color: '#C9C1A2'
}];
const SOLID_PROJECTS: SolidProject[] = [{
  id: 'sp1',
  title: 'Rénovation Playground Marquisats',
  subtitle: 'Redonner vie au terrain du quartier',
  location: 'Annecy Centre',
  raised: 8500,
  goal: 10000,
  donors: 124,
  status: 'active',
  edition: 'Summer Cup S3',
  img: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=400&q=80',
  coverImg: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=800&q=80',
  description: 'Le playground des Marquisats est le berceau de nombreux joueurs du tournoi. Ce projet vise à rénover entièrement les équipements sportifs pour les jeunes du quartier.',
  impact: '300+ jeunes bénéficiaires directs',
  color: '#2E8F57',
  category: 'Infrastructure',
  categoryEmoji: '🏗️',
  updates: [{
    id: 'u1',
    date: 'Il y a 2j',
    text: 'Les travaux de peinture des lignes sont terminés. La phase 2 commence la semaine prochaine.',
    img: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=300&q=80'
  }, {
    id: 'u2',
    date: 'Il y a 1 sem.',
    text: '124 donateurs réunis ! Merci à toute la communauté Tcheksplay pour votre soutien exceptionnel.'
  }]
}, {
  id: 'sp2',
  title: 'Équipements jeunes Seynod',
  subtitle: 'Offrir des maillots aux U12 du quartier',
  location: 'Seynod',
  raised: 3200,
  goal: 5000,
  donors: 67,
  status: 'active',
  edition: 'Summer Cup S3',
  img: 'https://images.unsplash.com/photo-1553778263-73a83bab9b0c?auto=format&fit=crop&w=400&q=80',
  coverImg: 'https://images.unsplash.com/photo-1553778263-73a83bab9b0c?auto=format&fit=crop&w=800&q=80',
  description: 'Des maillots, shorts et chaussures pour les jeunes de Seynod qui veulent jouer mais n\'ont pas les moyens de s\'équiper. Aucun enfant ne doit rester sur le banc faute d\'équipement.',
  impact: '48 enfants équipés en intégralité',
  color: '#7BA7D9',
  category: 'Équipement',
  categoryEmoji: '👕',
  updates: [{
    id: 'u3',
    date: 'Il y a 4j',
    text: 'Commande de 24 kits complètes passée chez notre partenaire Intersport. Livraison prévue mi-février.'
  }]
}, {
  id: 'sp3',
  title: 'Stage Football & Citoyenneté',
  subtitle: 'Un stage estival gratuit pour les 10–16 ans',
  location: 'Cran-Gevrier',
  raised: 1800,
  goal: 3000,
  donors: 41,
  status: 'completed',
  edition: 'Winter Cup S2',
  img: 'https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?auto=format&fit=crop&w=400&q=80',
  coverImg: 'https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?auto=format&fit=crop&w=800&q=80',
  description: 'Une semaine de stage alliant pratique sportive et ateliers sur les valeurs : respect, fair-play, esprit d\'équipe. Encadré par les joueurs du tournoi Tcheksplay.',
  impact: '32 jeunes ayant participé',
  color: '#C9C1A2',
  category: 'Éducation',
  categoryEmoji: '📚',
  updates: [{
    id: 'u4',
    date: 'Juil. 2024',
    text: 'Stage terminé avec succès ! 32 jeunes ont participé. Les retours sont magnifiques. Merci à tous.',
    img: 'https://images.unsplash.com/photo-1551958219-acbc595d4c80?auto=format&fit=crop&w=300&q=80'
  }]
}];
const GLOBAL_STATS = [{
  label: 'Projets',
  value: '4',
  color: '#B7FF1A'
}, {
  label: 'Donateurs',
  value: '232',
  color: '#C9C1A2'
}, {
  label: 'Collecté',
  value: '13.5k€',
  color: '#35D07F'
}, {
  label: 'Bénéficiaires',
  value: '380+',
  color: '#7BA7D9'
}];
const STATUS_META: Record<ProjectStatus, {
  label: string;
  color: string;
  bg: string;
}> = {
  active: {
    label: 'En cours',
    color: '#B7FF1A',
    bg: 'rgba(183,255,26,0.1)'
  },
  completed: {
    label: 'Terminé',
    color: '#C9C1A2',
    bg: 'rgba(201,193,162,0.1)'
  },
  upcoming: {
    label: 'À venir',
    color: '#7BA7D9',
    bg: 'rgba(123,167,217,0.1)'
  }
};

// ─── ProjectCard ──────────────────────────────────────────────────────────────

const ProjectCard = ({
  project,
  onExpand,
  expanded
}: {
  project: SolidProject;
  onExpand: () => void;
  expanded: boolean;
}) => {
  const pct = Math.min(100, Math.round(project.raised / project.goal * 100));
  const status = STATUS_META[project.status];
  return <motion.article layout className="rounded-[28px] overflow-hidden" style={{
    background: '#123129',
    border: `1px solid rgba(255,255,255,0.06)`
  }}>
      {/* Cover */}
      <div className="relative overflow-hidden" style={{
      height: 160
    }}>
        <img src={project.coverImg} alt={`Photo du projet ${project.title}`} className="w-full h-full object-cover" style={{
        filter: 'brightness(0.32)'
      }} />
        <div className="absolute inset-0" style={{
        background: `linear-gradient(180deg, transparent 20%, ${project.color}15 60%, rgba(18,49,41,0.98) 100%)`
      }} />
        <div className="absolute inset-0" style={{
        background: 'linear-gradient(90deg, rgba(18,49,41,0.3) 0%, transparent 60%)'
      }} />

        {/* Status */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1.5 rounded-[12px]" style={{
        background: status.bg,
        border: `1px solid ${project.color}30`
      }}>
          {project.status === 'active' && <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{
          background: project.color
        }} />}
          {project.status === 'completed' && <CheckCircle size={9} style={{
          color: status.color
        }} />}
          <span className="text-[9px] font-black uppercase tracking-wider" style={{
          color: status.color
        }}>{status.label}</span>
        </div>

        {/* Category */}
        <div className="absolute top-3 right-3 px-2.5 py-1 rounded-[10px] text-[9px] font-black" style={{
        background: 'rgba(11,34,28,0.75)',
        backdropFilter: 'blur(6px)',
        color: '#C9C1A2'
      }}>
          <span>{project.categoryEmoji}</span>
          <span className="ml-1">{project.category}</span>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-4">
          <p className="text-[8px] font-black uppercase tracking-[0.2em] mb-1" style={{
          color: `${project.color}99`
        }}>{project.edition}</p>
          <h3 className="text-[16px] font-black leading-tight" style={{
          color: '#F2EEDC'
        }}>{project.title}</h3>
        </div>
      </div>

      {/* Body */}
      <div className="p-5">
        <p className="text-[11px] font-semibold italic mb-3" style={{
        color: 'rgba(215,219,200,0.55)'
      }}>{project.subtitle}</p>

        <div className="flex items-center gap-1 mb-4">
          <MapPin size={9} style={{
          color: '#8A938C'
        }} />
          <span className="text-[10px] font-bold" style={{
          color: '#8A938C'
        }}>{project.location}</span>
        </div>

        {/* Progress */}
        <div className="flex items-center justify-between mb-2">
          <div>
            <span className="text-[18px] font-black tracking-tight leading-none" style={{
            color: '#35D07F'
          }}>
              {project.raised.toLocaleString('fr-FR')}€
            </span>
            <span className="text-[10px] font-semibold ml-1.5" style={{
            color: '#8A938C'
          }}>
              sur {project.goal.toLocaleString('fr-FR')}€
            </span>
          </div>
          <span className="text-[22px] font-black leading-none tracking-tight" style={{
          color: project.color
        }}>{pct}%</span>
        </div>

        <div className="w-full h-[6px] rounded-full overflow-hidden mb-4" style={{
        background: 'rgba(255,255,255,0.06)'
      }}>
          <motion.div initial={{
          width: '0%'
        }} animate={{
          width: `${pct}%`
        }} transition={{
          duration: 1.4,
          ease: 'easeOut',
          delay: 0.2
        }} className="h-full rounded-full" style={{
          background: `linear-gradient(90deg, ${project.color}80, ${project.color})`
        }} />
        </div>

        {/* Impact */}
        <div className="flex items-center gap-2 px-3 py-2.5 rounded-[12px] mb-4" style={{
        background: `${project.color}0C`,
        border: `1px solid ${project.color}20`
      }}>
          <TrendingUp size={11} style={{
          color: project.color
        }} />
          <span className="text-[10px] font-black" style={{
          color: project.color
        }}>{project.impact}</span>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-1.5">
            <Users size={10} style={{
            color: '#8A938C'
          }} />
            <span className="text-[10px] font-bold" style={{
            color: '#8A938C'
          }}>{project.donors} donateurs</span>
          </div>
          <button onClick={onExpand} className="flex items-center gap-1 text-[10px] font-black" style={{
          color: '#8A938C'
        }}>
            <span>{expanded ? 'Réduire' : 'Détails & Avancées'}</span>
            <ChevronRight size={11} style={{
            transform: expanded ? 'rotate(90deg)' : 'none',
            transition: 'transform 0.2s'
          }} />
          </button>
        </div>

        {/* Expanded content */}
        <AnimatePresenceSimple visible={expanded}>
          <div className="flex flex-col gap-4 pt-4" style={{
          borderTop: '1px solid rgba(255,255,255,0.06)'
        }}>
            <p className="text-[12px] leading-relaxed" style={{
            color: 'rgba(215,219,200,0.65)'
          }}>{project.description}</p>

            {project.updates.length > 0 && <div>
                <h4 className="text-[9px] font-black uppercase tracking-[0.2em] mb-3" style={{
              color: '#8A938C'
            }}>Dernières avancées</h4>
                <div className="flex flex-col gap-3">
                  {project.updates.map(upd => <div key={upd.id} className="flex gap-3">
                      <div className="flex flex-col items-center">
                        <div className="w-2 h-2 rounded-full mt-1 flex-shrink-0" style={{
                    background: project.color
                  }} />
                        <div className="flex-1 w-px mt-1" style={{
                    background: 'rgba(255,255,255,0.07)'
                  }} />
                      </div>
                      <div className="flex-1 pb-2">
                        <span className="text-[9px] font-bold" style={{
                    color: '#8A938C'
                  }}>{upd.date}</span>
                        <p className="text-[11px] leading-relaxed mt-0.5" style={{
                    color: '#D7DBC8'
                  }}>{upd.text}</p>
                        {upd.img && <div className="mt-2 rounded-[12px] overflow-hidden" style={{
                    height: 80
                  }}>
                            <img src={upd.img} alt="Photo de l'avancée du projet" className="w-full h-full object-cover" style={{
                      filter: 'brightness(0.7)'
                    }} />
                          </div>}
                      </div>
                    </div>)}
                </div>
              </div>}
          </div>
        </AnimatePresenceSimple>

        {/* CTA */}
        {project.status === 'active' && <button className="w-full mt-4 py-3.5 rounded-[16px] text-[12px] font-black uppercase tracking-wider flex items-center justify-center gap-2" style={{
        background: '#B7FF1A',
        color: '#0B221C'
      }}>
            <Heart size={14} fill="#0B221C" />
            <span>Soutenir ce projet</span>
          </button>}
        {project.status === 'completed' && <div className="mt-4 py-3 rounded-[16px] text-[11px] font-black uppercase tracking-wider flex items-center justify-center gap-2" style={{
        background: 'rgba(201,193,162,0.08)',
        border: '1px solid rgba(201,193,162,0.15)',
        color: '#C9C1A2'
      }}>
            <CheckCircle size={13} />
            <span>Projet accompli — Merci à tous !</span>
          </div>}
      </div>
    </motion.article>;
};

// Helper: simple show/hide with no framer dep
const AnimatePresenceSimple = ({
  visible,
  children
}: {
  visible: boolean;
  children: React.ReactNode;
}) => {
  if (!visible) return null;
  return <motion.div initial={{
    opacity: 0,
    height: 0
  }} animate={{
    opacity: 1,
    height: 'auto'
  }} exit={{
    opacity: 0
  }}>{children}</motion.div>;
};

// ─── SolidarityScreen ─────────────────────────────────────────────────────────

export const SolidarityScreen = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<ProjectStatus | 'all'>('all');
  const filtered = activeFilter === 'all' ? SOLID_PROJECTS : SOLID_PROJECTS.filter(p => p.status === activeFilter);
  const totalRaised = SOLID_PROJECTS.reduce((s, p) => s + p.raised, 0);
  return <div className="flex flex-col gap-6 px-5 pb-4">

      {/* Hero banner */}
      <div className="relative rounded-[28px] overflow-hidden" style={{
      background: 'linear-gradient(135deg, #183C31 0%, #0B221C 100%)',
      border: '1px solid rgba(46,143,87,0.15)'
    }}>
        {/* Glow */}
        <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full pointer-events-none" style={{
        background: 'radial-gradient(ellipse, rgba(46,143,87,0.15) 0%, transparent 70%)',
        filter: 'blur(30px)'
      }} />

        <div className="relative z-10 p-5">
          {/* Icon + title */}
          <div className="flex items-center gap-3 mb-5">
            <div className="w-14 h-14 rounded-[18px] flex items-center justify-center flex-shrink-0" style={{
            background: 'linear-gradient(145deg, #2E8F57, #1C5B39)',
            boxShadow: '0 8px 24px rgba(46,143,87,0.3)'
          }}>
              <Heart size={24} fill="#F2EEDC" style={{
              color: '#F2EEDC'
            }} />
            </div>
            <div>
              <h2 className="text-[22px] font-black leading-tight tracking-tight" style={{
              color: '#F2EEDC'
            }}>Tcheks Impact</h2>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{
              color: '#8A938C'
            }}>Solidarité · Saison 3</p>
            </div>
          </div>

          {/* Quote */}
          <blockquote className="text-[13px] leading-relaxed mb-5" style={{
          color: 'rgba(215,219,200,0.65)',
          borderLeft: '2px solid rgba(46,143,87,0.4)',
          paddingLeft: '12px'
        }}>
            Le football, ici, c'est plus qu'un sport. C'est un levier de vie.
          </blockquote>

          {/* Total raised */}
          <div className="flex items-end gap-2 mb-4">
            <span className="text-[36px] font-black leading-none tracking-tighter" style={{
            color: '#35D07F'
          }}>
              {totalRaised.toLocaleString('fr-FR')}€
            </span>
            <span className="text-[12px] font-bold mb-1.5" style={{
            color: '#8A938C'
          }}>collectés au total</span>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-4 gap-2">
            {GLOBAL_STATS.map((s, i) => <div key={s.label} className="flex flex-col items-center gap-0.5 py-3 rounded-[14px]" style={{
            background: 'rgba(255,255,255,0.04)',
            border: `1px solid rgba(255,255,255,0.06)`
          }}>
                <span className="text-[15px] font-black leading-none" style={{
              color: s.color
            }}>{s.value}</span>
                <span className="text-[7px] font-black uppercase tracking-wider text-center" style={{
              color: '#8A938C'
            }}>{s.label}</span>
              </div>)}
          </div>
        </div>
      </div>

      {/* Season contribution breakdown */}
      <div className="rounded-[22px] p-5" style={{
      background: '#123129',
      border: '1px solid rgba(255,255,255,0.05)'
    }}>
        <h3 className="text-[9px] font-black uppercase tracking-[0.2em] mb-4" style={{
        color: '#8A938C'
      }}>Contributions par Saison</h3>
        <div className="flex flex-col gap-3">
          {SEASON_CONTRIBS.map(s => {
          const pct = Math.round(s.amount / totalRaised * 100);
          return <div key={s.id} className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-black" style={{
                color: '#D7DBC8'
              }}>{s.label}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-[12px] font-black" style={{
                  color: s.color
                }}>{s.amount.toLocaleString('fr-FR')}€</span>
                    <span className="text-[9px] font-bold" style={{
                  color: '#8A938C'
                }}>{pct}%</span>
                  </div>
                </div>
                <div className="w-full h-[4px] rounded-full overflow-hidden" style={{
              background: 'rgba(255,255,255,0.06)'
            }}>
                  <motion.div initial={{
                width: '0%'
              }} animate={{
                width: `${pct}%`
              }} transition={{
                duration: 1.2,
                ease: 'easeOut',
                delay: 0.1
              }} className="h-full rounded-full" style={{
                background: s.color
              }} />
                </div>
              </div>;
        })}
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2">
        {[{
        id: 'all' as const,
        label: 'Tous',
        emoji: '✦'
      }, {
        id: 'active' as ProjectStatus,
        label: 'En cours',
        emoji: '🟢'
      }, {
        id: 'completed' as ProjectStatus,
        label: 'Accomplis',
        emoji: '✅'
      }].map(f => <button key={f.id} onClick={() => setActiveFilter(f.id)} className="flex items-center gap-1.5 px-3.5 py-2 rounded-[12px] text-[10px] font-black whitespace-nowrap transition-all" style={activeFilter === f.id ? {
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

      {/* Section label */}
      <div className="-mt-2">
        <h2 className="text-[10px] font-black uppercase tracking-[0.2em]" style={{
        color: '#8A938C'
      }}>Projets — Saison 3</h2>
      </div>

      {/* Projects */}
      <div className="flex flex-col gap-5 -mt-4">
        {filtered.map(project => <ProjectCard key={project.id} project={project} expanded={expandedId === project.id} onExpand={() => setExpandedId(expandedId === project.id ? null : project.id)} />)}
      </div>

      {/* Partner trust block */}
      <div className="rounded-[22px] p-5 flex items-start gap-4" style={{
      background: 'linear-gradient(135deg, rgba(46,143,87,0.08) 0%, rgba(18,49,41,0.98) 100%)',
      border: '1px solid rgba(46,143,87,0.12)'
    }}>
        <div className="w-10 h-10 rounded-[12px] flex items-center justify-center flex-shrink-0" style={{
        background: 'rgba(46,143,87,0.15)',
        border: '1px solid rgba(46,143,87,0.2)'
      }}>
          <CheckCircle size={18} style={{
          color: '#2E8F57'
        }} />
        </div>
        <div className="flex-1">
          <p className="text-[12px] font-black mb-1" style={{
          color: '#F2EEDC'
        }}>Transparence totale</p>
          <p className="text-[11px] leading-relaxed" style={{
          color: 'rgba(215,219,200,0.55)'
        }}>Chaque euro collecté est tracé et publié. Les comptes de Tcheks Impact sont disponibles sur demande.</p>
        </div>
      </div>

    </div>;
};