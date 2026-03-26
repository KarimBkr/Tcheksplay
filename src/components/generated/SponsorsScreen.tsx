import React, { useState } from 'react';
import { Star, ArrowUpRight, Trophy, Shield, Crown, CheckCircle, ExternalLink, Zap, Globe } from 'lucide-react';
import { motion } from 'framer-motion';

// ─── Types ────────────────────────────────────────────────────────────────────

type SponsorTier = 'platinum' | 'gold' | 'silver' | 'bronze';
interface Sponsor {
  id: string;
  name: string;
  tier: SponsorTier;
  tagline: string;
  description: string;
  url: string;
  logo?: string;
  logoPlaceholder: string;
  featured?: boolean;
  matchSponsor?: boolean;
  editionSponsor?: boolean;
  category: string;
  since: string;
  color: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const SPONSORS: Sponsor[] = [{
  id: 'sp1',
  name: 'Nike Football',
  tier: 'platinum',
  tagline: 'Équipementier officiel Tcheksplay',
  description: 'Nike équipe l\'intégralité des équipes du tournoi depuis la Saison 1. Maillots, shorts, chaussettes et équipements de match fournis à toutes les équipes participantes.',
  url: 'https://nike.com',
  logoPlaceholder: 'NIKE',
  featured: true,
  matchSponsor: true,
  editionSponsor: true,
  category: 'Équipement sportif',
  since: 'Saison 1',
  color: '#F2EEDC'
}, {
  id: 'sp2',
  name: "Ville d'Annecy",
  tier: 'platinum',
  tagline: 'Partenaire institutionnel',
  description: 'La Ville d\'Annecy soutient Tcheksplay dans sa mission de développement du sport et des liens sociaux sur le territoire annécien.',
  url: 'https://annecy.fr',
  logoPlaceholder: 'ANNECY',
  featured: true,
  editionSponsor: true,
  category: 'Collectivité',
  since: 'Saison 2',
  color: '#7BA7D9'
}, {
  id: 'sp3',
  name: 'Red Bull',
  tier: 'gold',
  tagline: 'Partenaire énergie',
  description: 'Red Bull booste l\'énergie des joueurs et du public lors de chaque journée de compétition. Présent sur toutes les tribunes.',
  url: 'https://redbull.com',
  logoPlaceholder: 'RED BULL',
  category: 'Boisson',
  since: 'Saison 2',
  color: '#D94B5B'
}, {
  id: 'sp4',
  name: "L'Équipe",
  tier: 'gold',
  tagline: 'Partenaire médias',
  description: 'L\'Équipe couvre Tcheksplay dans ses pages locales et sur ses supports numériques. La voix du football de proximité.',
  url: 'https://lequipe.fr',
  logoPlaceholder: "L'ÉQUIPE",
  category: 'Média',
  since: 'Saison 3',
  color: '#F4C542'
}, {
  id: 'sp5',
  name: 'Intersport',
  tier: 'silver',
  tagline: 'Détaillant officiel',
  description: 'Intersport propose une réduction exclusive de 15% à tous les joueurs et staff des équipes du tournoi.',
  url: 'https://intersport.fr',
  logoPlaceholder: 'INTERSPORT',
  category: 'Commerce sportif',
  since: 'Saison 3',
  color: '#2E8F57'
}, {
  id: 'sp6',
  name: 'Mairie de Seynod',
  tier: 'silver',
  tagline: 'Support terrain',
  description: 'La mairie de Seynod met à disposition le terrain municipal pour 4 journées de compétition par saison.',
  url: 'https://seynod.fr',
  logoPlaceholder: 'SEYNOD',
  category: 'Collectivité',
  since: 'Saison 2',
  color: '#C9C1A2'
}, {
  id: 'sp7',
  name: 'Pizza King',
  tier: 'bronze',
  tagline: 'Restauration officielle',
  description: 'Pizza King régale joueurs et supporters lors des soirées de match. Tarif spécial sur présentation de la carte joueur.',
  url: '#',
  logoPlaceholder: 'PIZZA KING',
  category: 'Restauration',
  since: 'Saison 3',
  color: '#F4C542'
}, {
  id: 'sp8',
  name: 'Aqua Lac 74',
  tier: 'bronze',
  tagline: 'Hydratation des équipes',
  description: 'Bouteilles d\'eau et récupération sportive fournis à toutes les équipes pour chaque match de la compétition.',
  url: '#',
  logoPlaceholder: 'AQUA 74',
  category: 'Hydratation',
  since: 'Saison 3',
  color: '#7BA7D9'
}];
const TIER_META: Record<SponsorTier, {
  label: string;
  color: string;
  bg: string;
  border: string;
  icon: React.ReactNode;
}> = {
  platinum: {
    label: 'Platine',
    color: '#F2EEDC',
    bg: 'rgba(242,238,220,0.08)',
    border: 'rgba(242,238,220,0.2)',
    icon: <Crown size={10} />
  },
  gold: {
    label: 'Or',
    color: '#F4C542',
    bg: 'rgba(244,197,66,0.08)',
    border: 'rgba(244,197,66,0.2)',
    icon: <Star size={10} />
  },
  silver: {
    label: 'Argent',
    color: '#C9C1A2',
    bg: 'rgba(201,193,162,0.08)',
    border: 'rgba(201,193,162,0.15)',
    icon: <Shield size={10} />
  },
  bronze: {
    label: 'Bronze',
    color: '#8A938C',
    bg: 'rgba(138,147,140,0.06)',
    border: 'rgba(138,147,140,0.12)',
    icon: <CheckCircle size={10} />
  }
};
const TIER_ORDER: SponsorTier[] = ['platinum', 'gold', 'silver', 'bronze'];

// ─── SponsorCard ──────────────────────────────────────────────────────────────

const SponsorCard = ({
  sponsor,
  expanded,
  onToggle
}: {
  sponsor: Sponsor;
  expanded: boolean;
  onToggle: () => void;
}) => {
  const tier = TIER_META[sponsor.tier];
  return <motion.article layout className="rounded-[24px] overflow-hidden" style={{
    background: sponsor.tier === 'platinum' ? 'linear-gradient(145deg, #1E4B37 0%, #0B221C 100%)' : '#123129',
    border: `1px solid ${tier.border}`
  }}>
      <div className="p-5">
        {/* Logo placeholder + tier */}
        <div className="flex items-start justify-between mb-4">
          <div className="px-4 py-3 rounded-[16px] flex items-center justify-center" style={{
          background: tier.bg,
          border: `1px solid ${tier.border}`,
          minWidth: 80,
          minHeight: 48
        }}>
            <span className="font-black tracking-tight leading-none" style={{
            color: tier.color,
            fontSize: sponsor.tier === 'platinum' ? 15 : 13
          }}>
              {sponsor.logoPlaceholder}
            </span>
          </div>

          <div className="flex flex-col items-end gap-2">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-[10px]" style={{
            background: tier.bg,
            border: `1px solid ${tier.border}`
          }}>
              <span style={{
              color: tier.color
            }}>{tier.icon}</span>
              <span className="text-[9px] font-black uppercase tracking-wider" style={{
              color: tier.color
            }}>{tier.label}</span>
            </div>
            {sponsor.matchSponsor && <div className="flex items-center gap-1 px-2 py-0.5 rounded-[8px]" style={{
            background: 'rgba(183,255,26,0.08)',
            border: '1px solid rgba(183,255,26,0.15)'
          }}>
                <Zap size={8} style={{
              color: '#B7FF1A'
            }} />
                <span className="text-[8px] font-black uppercase tracking-wider" style={{
              color: '#B7FF1A'
            }}>Match</span>
              </div>}
            {sponsor.editionSponsor && <div className="flex items-center gap-1 px-2 py-0.5 rounded-[8px]" style={{
            background: 'rgba(183,255,26,0.05)',
            border: '1px solid rgba(183,255,26,0.1)'
          }}>
                <Trophy size={8} style={{
              color: '#B7FF1A'
            }} />
                <span className="text-[8px] font-black uppercase tracking-wider" style={{
              color: '#B7FF1A'
            }}>Édition</span>
              </div>}
          </div>
        </div>

        {/* Info */}
        <h3 className="font-black leading-tight mb-0.5" style={{
        fontSize: sponsor.tier === 'platinum' ? 18 : 15,
        color: '#F2EEDC'
      }}>
          {sponsor.name}
        </h3>
        <p className="text-[10px] font-bold uppercase tracking-wide mb-3" style={{
        color: tier.color
      }}>{sponsor.tagline}</p>

        <div className="flex items-center gap-2 mb-4">
          <span className="text-[9px] font-bold px-2 py-0.5 rounded-md" style={{
          background: 'rgba(255,255,255,0.05)',
          color: '#8A938C'
        }}>{sponsor.category}</span>
          <span className="text-[9px] font-bold" style={{
          color: '#8A938C'
        }}>· Depuis {sponsor.since}</span>
        </div>

        {/* Description (always visible for platinum, toggle for others) */}
        {(sponsor.tier === 'platinum' || expanded) && <motion.p initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} className="text-[11px] leading-relaxed mb-4" style={{
        color: 'rgba(215,219,200,0.6)'
      }}>
            {sponsor.description}
          </motion.p>}

        {/* Actions */}
        <div className="flex items-center gap-2 mt-2">
          {sponsor.tier !== 'bronze' && <button onClick={onToggle} className="flex-1 py-2.5 rounded-[12px] text-[10px] font-black uppercase tracking-wider flex items-center justify-center gap-1.5" style={{
          background: 'rgba(255,255,255,0.05)',
          border: '1px solid rgba(255,255,255,0.08)',
          color: '#D7DBC8'
        }}>
              <span>{expanded ? 'Réduire' : 'En savoir plus'}</span>
            </button>}
          <a href={sponsor.url} target="_blank" rel="noopener noreferrer" aria-label={`Visiter le site de ${sponsor.name}`} className="flex items-center gap-1.5 px-4 py-2.5 rounded-[12px] text-[10px] font-black uppercase tracking-wider" style={sponsor.tier === 'platinum' ? {
          background: '#B7FF1A',
          color: '#0B221C'
        } : {
          background: tier.bg,
          border: `1px solid ${tier.border}`,
          color: tier.color
        }}>
            <Globe size={11} />
            <span>Site</span>
            <ArrowUpRight size={10} />
          </a>
        </div>
      </div>
    </motion.article>;
};

// ─── SponsorsScreen ────────────────────────────────────────────────────────────

export const SponsorsScreen = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [activeTier, setActiveTier] = useState<SponsorTier | 'all'>('all');
  const matchSponsor = SPONSORS.find(s => s.matchSponsor);
  const editionSponsor = SPONSORS.find(s => s.editionSponsor && s.tier === 'platinum');
  const filtered = activeTier === 'all' ? SPONSORS : SPONSORS.filter(s => s.tier === activeTier);
  return <div className="flex flex-col gap-6 px-5 pb-4">

      {/* Header banner */}
      <div className="rounded-[28px] p-5" style={{
      background: 'linear-gradient(135deg, #183C31 0%, #0B221C 100%)',
      border: '1px solid rgba(201,193,162,0.1)'
    }}>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-[16px] flex items-center justify-center flex-shrink-0" style={{
          background: 'rgba(201,193,162,0.1)',
          border: '1px solid rgba(201,193,162,0.2)'
        }}>
            <Crown size={22} style={{
            color: '#C9C1A2'
          }} />
          </div>
          <div>
            <h2 className="text-[20px] font-black leading-tight tracking-tight" style={{
            color: '#F2EEDC'
          }}>Partenaires Officiels</h2>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{
            color: '#8A938C'
          }}>Summer Cup · Saison 3 · 2025</p>
          </div>
        </div>
        <p className="text-[12px] leading-relaxed" style={{
        color: 'rgba(215,219,200,0.55)'
      }}>
          Tcheksplay remercie ses partenaires qui rendent possible l'organisation d'un tournoi de qualité et soutiennent les valeurs du football de quartier.
        </p>

        {/* Partner count */}
        <div className="flex items-center gap-3 mt-4">
          {TIER_ORDER.map(tier => {
          const count = SPONSORS.filter(s => s.tier === tier).length;
          const meta = TIER_META[tier];
          return <div key={tier} className="flex flex-col items-center gap-0.5">
                <span className="text-[15px] font-black leading-none" style={{
              color: meta.color
            }}>{count}</span>
                <span className="text-[7px] font-black uppercase tracking-wider" style={{
              color: '#8A938C'
            }}>{meta.label}</span>
              </div>;
        })}
          <div className="ml-auto">
            <span className="text-[26px] font-black leading-none tracking-tight" style={{
            color: '#C9C1A2'
          }}>{SPONSORS.length}</span>
            <span className="text-[10px] font-bold ml-1" style={{
            color: '#8A938C'
          }}>partenaires</span>
          </div>
        </div>
      </div>

      {/* Spotlight: match + edition sponsor */}
      {matchSponsor && <div>
          <h3 className="text-[9px] font-black uppercase tracking-[0.2em] mb-3" style={{
        color: '#8A938C'
      }}>Partenaire du Match</h3>
          <div className="rounded-[22px] p-4 flex items-center gap-4" style={{
        background: 'linear-gradient(145deg, rgba(183,255,26,0.07) 0%, rgba(18,49,41,0.98) 100%)',
        border: '1px solid rgba(183,255,26,0.12)'
      }}>
            <div className="w-16 h-16 rounded-[16px] flex items-center justify-center flex-shrink-0" style={{
          background: 'rgba(183,255,26,0.08)',
          border: '1px solid rgba(183,255,26,0.18)'
        }}>
              <span className="text-[14px] font-black" style={{
            color: '#B7FF1A'
          }}>{matchSponsor.logoPlaceholder}</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 mb-0.5">
                <Zap size={9} style={{
              color: '#B7FF1A'
            }} />
                <span className="text-[8px] font-black uppercase tracking-[0.2em]" style={{
              color: '#B7FF1A'
            }}>Partenaire du Match</span>
              </div>
              <p className="text-[15px] font-black leading-none mb-1" style={{
            color: '#F2EEDC'
          }}>{matchSponsor.name}</p>
              <p className="text-[10px]" style={{
            color: '#8A938C'
          }}>{matchSponsor.tagline}</p>
            </div>
            <a href={matchSponsor.url} aria-label={`Visiter ${matchSponsor.name}`} className="w-9 h-9 rounded-full flex items-center justify-center" style={{
          background: 'rgba(183,255,26,0.1)',
          border: '1px solid rgba(183,255,26,0.2)'
        }}>
              <ExternalLink size={14} style={{
            color: '#B7FF1A'
          }} />
            </a>
          </div>
        </div>}

      {editionSponsor && <div>
          <h3 className="text-[9px] font-black uppercase tracking-[0.2em] mb-3" style={{
        color: '#8A938C'
      }}>Partenaire de l'Édition</h3>
          <div className="rounded-[22px] p-4 flex items-center gap-4" style={{
        background: 'linear-gradient(145deg, rgba(242,238,220,0.05) 0%, rgba(18,49,41,0.98) 100%)',
        border: '1px solid rgba(242,238,220,0.12)'
      }}>
            <div className="w-16 h-16 rounded-[16px] flex items-center justify-center flex-shrink-0" style={{
          background: 'rgba(242,238,220,0.06)',
          border: '1px solid rgba(242,238,220,0.15)'
        }}>
              <span className="text-[11px] font-black" style={{
            color: '#F2EEDC'
          }}>{editionSponsor.logoPlaceholder}</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 mb-0.5">
                <Trophy size={9} style={{
              color: '#C9C1A2'
            }} />
                <span className="text-[8px] font-black uppercase tracking-[0.2em]" style={{
              color: '#C9C1A2'
            }}>Partenaire Édition</span>
              </div>
              <p className="text-[15px] font-black leading-none mb-1" style={{
            color: '#F2EEDC'
          }}>{editionSponsor.name}</p>
              <p className="text-[10px]" style={{
            color: '#8A938C'
          }}>{editionSponsor.tagline}</p>
            </div>
            <a href={editionSponsor.url} aria-label={`Visiter ${editionSponsor.name}`} className="w-9 h-9 rounded-full flex items-center justify-center" style={{
          background: 'rgba(242,238,220,0.06)',
          border: '1px solid rgba(242,238,220,0.15)'
        }}>
              <ExternalLink size={14} style={{
            color: '#C9C1A2'
          }} />
            </a>
          </div>
        </div>}

      {/* Tier filter */}
      <div className="flex gap-2 overflow-x-auto" style={{
      scrollbarWidth: 'none'
    }}>
        {[{
        id: 'all' as const,
        label: 'Tous'
      }, ...TIER_ORDER.map(t => ({
        id: t,
        label: TIER_META[t].label
      }))].map(f => <button key={f.id} onClick={() => setActiveTier(f.id)} className="flex items-center gap-1 px-3.5 py-2 rounded-[12px] text-[10px] font-black uppercase tracking-wide whitespace-nowrap transition-all" style={activeTier === f.id ? {
        background: '#B7FF1A',
        color: '#0B221C'
      } : {
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.07)',
        color: '#8A938C'
      }}>
            {f.id !== 'all' && <span style={{
          color: activeTier === f.id ? '#0B221C' : TIER_META[f.id as SponsorTier].color
        }}>{TIER_META[f.id as SponsorTier].icon}</span>}
            <span>{f.label}</span>
          </button>)}
      </div>

      {/* Sponsor list grouped by tier */}
      {TIER_ORDER.filter(tier => filtered.some(s => s.tier === tier)).map(tier => {
      const tierSponsors = filtered.filter(s => s.tier === tier);
      const meta = TIER_META[tier];
      return <div key={tier} className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <span style={{
            color: meta.color
          }}>{meta.icon}</span>
              <span className="text-[9px] font-black uppercase tracking-[0.2em]" style={{
            color: '#8A938C'
          }}>Niveau {meta.label}</span>
              <div className="flex-1 h-px" style={{
            background: 'rgba(255,255,255,0.05)'
          }} />
            </div>
            {tierSponsors.map(sponsor => <SponsorCard key={sponsor.id} sponsor={sponsor} expanded={expandedId === sponsor.id} onToggle={() => setExpandedId(expandedId === sponsor.id ? null : sponsor.id)} />)}
          </div>;
    })}

      {/* Become partner CTA */}
      <div className="rounded-[22px] p-5 text-center" style={{
      background: 'rgba(255,255,255,0.02)',
      border: '1px dashed rgba(255,255,255,0.1)'
    }}>
        <p className="text-[12px] font-black mb-1" style={{
        color: '#D7DBC8'
      }}>Devenez partenaire Tcheksplay</p>
        <p className="text-[10px] mb-4" style={{
        color: '#8A938C'
      }}>Touchez une communauté locale passionnée et engagée</p>
        <button className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[14px] text-[11px] font-black uppercase tracking-wider" style={{
        background: 'rgba(183,255,26,0.1)',
        border: '1px solid rgba(183,255,26,0.2)',
        color: '#B7FF1A'
      }}>
          <ArrowUpRight size={13} />
          <span>Nous contacter</span>
        </button>
      </div>

    </div>;
};