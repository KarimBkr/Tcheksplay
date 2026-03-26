import React, { useState } from 'react';
import { Shield, Clock, AlertTriangle, ChevronRight, CheckCircle, Trophy, Target, Award, BarChart3, Swords } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// ─── Types ────────────────────────────────────────────────────────────────────

interface RuleSection {
  id: string;
  title: string;
  emoji: string;
  color: string;
  summary: string;
  detailHint: string;
  rules: RuleItem[];
}
interface RuleItem {
  id: string;
  label: string;
  value: string;
  highlight?: boolean;
  note?: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const RULE_SECTIONS: RuleSection[] = [{
  id: 'format',
  title: 'Format de Compétition',
  emoji: '🏆',
  color: '#B7FF1A',
  summary: 'Phase de groupes · tous contre tous, puis élimination directe',
  detailHint: 'Phase de groupes + élimination directe',
  rules: [{
    id: 'f1',
    label: 'Nombre d\'équipes',
    value: '8 équipes par poule',
    highlight: true
  }, {
    id: 'f2',
    label: 'Phase de groupes',
    value: '2 poules de 4 équipes — matchs aller-retour'
  }, {
    id: 'f3',
    label: 'Qualification',
    value: 'Top 2 de chaque poule → Demi-finales'
  }, {
    id: 'f4',
    label: 'Phase finale',
    value: 'Quarts · Demis · Finale'
  }, {
    id: 'f5',
    label: 'Match pour la 3ème place',
    value: 'Oui — obligatoire',
    note: 'Les deux perdants des demi-finales s\'affrontent'
  }]
}, {
  id: 'points',
  title: 'Système de Points',
  emoji: '📊',
  color: '#7BA7D9',
  summary: 'Victoire 3 pts · Nul 1 pt · Défaite 0 pt',
  detailHint: 'Victoire · Nul · Défaite · Forfait',
  rules: [{
    id: 'p1',
    label: 'Victoire',
    value: '3 points',
    highlight: true
  }, {
    id: 'p2',
    label: 'Match nul',
    value: '1 point'
  }, {
    id: 'p3',
    label: 'Défaite',
    value: '0 point'
  }, {
    id: 'p4',
    label: 'Forfait',
    value: '-1 point + match perdu 3-0'
  }]
}, {
  id: 'tiebreak',
  title: 'Départage & Égalités',
  emoji: '⚖️',
  color: '#C9C1A2',
  summary: 'En cas d\'égalité au classement',
  detailHint: 'Confrontation directe → diff. buts → buts → fair-play → tirage',
  rules: [{
    id: 't1',
    label: '1er critère',
    value: 'Confrontation directe',
    highlight: true
  }, {
    id: 't2',
    label: '2ème critère',
    value: 'Différence de buts générale'
  }, {
    id: 't3',
    label: '3ème critère',
    value: 'Nombre de buts marqués'
  }, {
    id: 't4',
    label: '4ème critère',
    value: 'Fair-play (moins de cartons)'
  }, {
    id: 't5',
    label: 'Cas extrême',
    value: 'Tirage au sort en présence des capitaines'
  }]
}, {
  id: 'match',
  title: 'Règles du Match',
  emoji: '⚽',
  color: '#2E8F57',
  summary: '2×25 min · Changements illimités · Prolongations 2×10 min',
  detailHint: 'Durée · Changements · Prolongations · Tirs au but',
  rules: [{
    id: 'm1',
    label: 'Durée de jeu',
    value: '2 × 25 minutes',
    highlight: true
  }, {
    id: 'm2',
    label: 'Mi-temps',
    value: '10 minutes — obligatoire'
  }, {
    id: 'm3',
    label: 'Changements',
    value: 'Illimités — avec accord de l\'arbitre'
  }, {
    id: 'm4',
    label: 'Prolongations',
    value: '2 × 10 min si match nul en phase finale'
  }, {
    id: 'm5',
    label: 'Tirs au but',
    value: '5 tireurs · mort subite si encore à égalité',
    note: 'Uniquement en phase éliminatoire'
  }, {
    id: 'm6',
    label: 'Ballon de jeu',
    value: 'Taille 5 · fourni par l\'organisation'
  }, {
    id: 'm7',
    label: 'Joueurs sur le terrain',
    value: '7 joueurs (dont gardien)',
    note: '5 joueurs minimum pour démarrer'
  }]
}, {
  id: 'fairplay',
  title: 'Fair-Play & Valeurs',
  emoji: '🤝',
  color: '#35D07F',
  summary: 'Respect · Intégrité · Fraternité',
  detailHint: 'Respect arbitres · Prix fair-play · Tenue · Ponctualité',
  rules: [{
    id: 'fp1',
    label: 'Esprit Fair-Play',
    value: 'Mandatory — zéro tolérance',
    highlight: true
  }, {
    id: 'fp2',
    label: 'Respect des arbitres',
    value: 'Décision finale · pas de contestation'
  }, {
    id: 'fp3',
    label: 'Prix Fair-Play',
    value: 'Remis à l\'équipe la plus fair-play de la saison'
  }, {
    id: 'fp4',
    label: 'Tenue vestimentaire',
    value: 'Maillot officiel obligatoire avec numéro'
  }, {
    id: 'fp5',
    label: 'Ponctualité',
    value: 'Forfait si 15 min de retard sans excuse'
  }]
}, {
  id: 'sanctions',
  title: 'Sanctions & Cartons',
  emoji: '🟨',
  color: '#F4C542',
  summary: 'Jaune · Rouge · Suspensions · Appel 24h',
  detailHint: 'Cartons jaunes · rouges · exclusion · procédure d\'appel',
  rules: [{
    id: 's1',
    label: 'Carton jaune',
    value: '3 jaunes = 1 match de suspension',
    highlight: true
  }, {
    id: 's2',
    label: 'Carton rouge direct',
    value: '1 match de suspension minimum'
  }, {
    id: 's3',
    label: 'Carton rouge grave',
    value: '3 matchs de suspension + convocation'
  }, {
    id: 's4',
    label: 'Violence physique',
    value: 'Exclusion définitive du tournoi',
    note: 'Décision de la commission disciplinaire'
  }, {
    id: 's5',
    label: 'Cumul jaune-rouge',
    value: 'Équivaut à carton rouge — 1 match'
  }, {
    id: 's6',
    label: 'Appel possible',
    value: 'Sous 24h — par email officiel'
  }]
}];
const FORMAT_VISUAL = [{
  round: 'Phase de groupes',
  icon: '⚽',
  note: 'Tous contre tous',
  id: 'fv1'
}, {
  round: 'Quarts de finale',
  icon: '🔥',
  note: '4 équipes qualifiées',
  id: 'fv2'
}, {
  round: 'Demi-finales',
  icon: '⚡',
  note: '2 matchs décisifs',
  id: 'fv3'
}, {
  round: 'Finale',
  icon: '🏆',
  note: 'Le grand rendez-vous',
  id: 'fv4'
}];
const QUICK_STATS = [{
  label: '2×25min',
  sub: 'Durée de jeu',
  color: '#B7FF1A',
  id: 'qs1'
}, {
  label: '7v7',
  sub: 'Format terrain',
  color: '#7BA7D9',
  id: 'qs2'
}, {
  label: '3 pts',
  sub: 'Par victoire',
  color: '#2E8F57',
  id: 'qs3'
}, {
  label: '5 tireurs',
  sub: 'Tirs au but',
  color: '#C9C1A2',
  id: 'qs4'
}];
const POINTS_DATA = [{
  result: 'Victoire',
  pts: '3',
  color: '#B7FF1A',
  emoji: '🟢',
  id: 'pd1'
}, {
  result: 'Nul',
  pts: '1',
  color: '#7BA7D9',
  emoji: '🟡',
  id: 'pd2'
}, {
  result: 'Défaite',
  pts: '0',
  color: '#8A938C',
  emoji: '🔴',
  id: 'pd3'
}];
const CARD_DATA = [{
  card: '🟨',
  label: 'Carton Jaune',
  desc: '3 jaunes = 1 match de suspension',
  color: '#F4C542',
  id: 'cd1'
}, {
  card: '🟥',
  label: 'Carton Rouge',
  desc: '1 à 3 matchs de suspension',
  color: '#D94B5B',
  id: 'cd2'
}, {
  card: '⛔',
  label: 'Violence',
  desc: 'Exclusion définitive du tournoi',
  color: '#8E2B36',
  id: 'cd3'
}];
const TIEBREAK_CRITERIA = [{
  label: 'Confrontation directe',
  id: 'tb1'
}, {
  label: 'Différence de buts générale',
  id: 'tb2'
}, {
  label: 'Nombre de buts marqués',
  id: 'tb3'
}, {
  label: 'Fair-play (moins de cartons)',
  id: 'tb4'
}, {
  label: 'Tirage au sort (capitaines)',
  id: 'tb5'
}];
const MATCH_PHASES = [{
  label: '1ère mi-temps',
  duration: '25 min',
  color: '#2E8F57',
  flex: 5,
  borderRadius: '12px 0 0 12px',
  borderRight: 'none',
  id: 'mp1'
}, {
  label: 'Mi-temps',
  duration: '10 min',
  color: '#8A938C',
  flex: 2,
  borderRadius: '0',
  borderRight: 'none',
  id: 'mp2'
}, {
  label: '2ème mi-temps',
  duration: '25 min',
  color: '#2E8F57',
  flex: 5,
  borderRadius: '0 12px 12px 0',
  borderRight: undefined,
  id: 'mp3'
}];

// ─── RuleSectionCard ──────────────────────────────────────────────────────────

const RuleSectionCard = ({
  section
}: {
  section: RuleSection;
}) => {
  const [expanded, setExpanded] = useState(false);
  return <div className="rounded-[24px] overflow-hidden transition-all" style={{
    background: '#123129',
    border: `1px solid ${expanded ? section.color + '22' : 'rgba(255,255,255,0.05)'}`,
    boxShadow: expanded ? `0 4px 24px ${section.color}08` : 'none'
  }}>
      <button onClick={() => setExpanded(!expanded)} className="w-full flex items-center justify-between p-5 transition-all active:scale-[0.99]" aria-expanded={expanded} aria-label={`${section.title} — ${section.rules.length} règles`}>
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-[14px] flex items-center justify-center flex-shrink-0 text-[18px] transition-all" style={{
          background: expanded ? `${section.color}18` : `${section.color}10`,
          border: `1px solid ${section.color}${expanded ? '30' : '18'}`
        }}>
            {section.emoji}
          </div>
          <div className="text-left">
            <h3 className="text-[14px] font-black leading-tight" style={{
            color: expanded ? '#F2EEDC' : '#D7DBC8'
          }}>
              {section.title}
            </h3>
            <p className="text-[9px] font-semibold mt-0.5 leading-snug" style={{
            color: '#8A938C'
          }}>
              {section.detailHint}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="text-[9px] font-black px-2 py-1 rounded-[8px]" style={{
          background: `${section.color}12`,
          color: section.color,
          border: `1px solid ${section.color}20`
        }}>
            {section.rules.length} règles
          </span>
          <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-200" style={{
          background: expanded ? `${section.color}14` : 'rgba(255,255,255,0.04)',
          transform: expanded ? 'rotate(90deg)' : 'none'
        }}>
            <ChevronRight size={13} style={{
            color: expanded ? section.color : '#8A938C'
          }} />
          </div>
        </div>
      </button>

      <AnimatePresence>
        {expanded && <motion.div initial={{
        height: 0,
        opacity: 0
      }} animate={{
        height: 'auto',
        opacity: 1
      }} exit={{
        height: 0,
        opacity: 0
      }} transition={{
        duration: 0.25,
        ease: 'easeOut'
      }} className="overflow-hidden">
            <div className="px-5 pb-5 flex flex-col gap-2.5" style={{
          borderTop: `1px solid ${section.color}12`
        }}>
              <div className="h-3" />
              {section.rules.map((rule, i) => <div key={rule.id} className="flex items-start gap-3 px-3.5 py-3 rounded-[14px]" style={{
            background: rule.highlight ? `${section.color}09` : 'rgba(255,255,255,0.02)',
            border: rule.highlight ? `1px solid ${section.color}22` : '1px solid rgba(255,255,255,0.04)'
          }}>
                  <div className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5" style={{
              background: `${section.color}16`
            }}>
                    <span className="text-[8px] font-black" style={{
                color: section.color
              }}>
                      {i + 1}
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[9px] font-black uppercase tracking-wider" style={{
                  color: '#8A938C'
                }}>
                        {rule.label}
                      </span>
                      {rule.highlight && <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{
                  background: section.color
                }} />}
                    </div>
                    <p className="text-[12px] font-black mt-0.5 leading-snug" style={{
                color: rule.highlight ? section.color : '#D7DBC8'
              }}>
                      {rule.value}
                    </p>
                    {rule.note && <p className="text-[9px] mt-1 leading-relaxed" style={{
                color: 'rgba(215,219,200,0.42)'
              }}>
                        {rule.note}
                      </p>}
                  </div>
                </div>)}
            </div>
          </motion.div>}
      </AnimatePresence>
    </div>;
};

// ─── SectionLabel ─────────────────────────────────────────────────────────────

const SectionLabel = ({
  label,
  accent
}: {
  label: string;
  accent?: boolean;
}) => <div className="flex items-center gap-3 mb-4">
    <span className="text-[9px] font-black uppercase tracking-[0.22em]" style={{
    color: accent ? '#B7FF1A' : '#556A61'
  }}>
      {label}
    </span>
    <div className="flex-1 h-px" style={{
    background: accent ? 'rgba(183,255,26,0.12)' : 'rgba(255,255,255,0.05)'
  }} />
  </div>;

// ─── TournamentRulesScreen ────────────────────────────────────────────────────

export const TournamentRulesScreen = () => {
  return <div className="flex flex-col gap-6 px-5 pb-4">

      {/* ── HERO HEADER ── */}
      <div className="rounded-[28px] p-5 relative overflow-hidden" style={{
      background: 'linear-gradient(145deg, #183C31 0%, #0B221C 100%)',
      border: '1px solid rgba(183,255,26,0.1)'
    }}>
        <div className="absolute -top-6 -right-6 w-40 h-40 rounded-full pointer-events-none" style={{
        background: 'radial-gradient(ellipse, rgba(183,255,26,0.08) 0%, transparent 70%)',
        filter: 'blur(20px)'
      }} />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-14 h-14 rounded-[18px] flex items-center justify-center flex-shrink-0" style={{
            background: 'linear-gradient(145deg, #2E8F57, #123129)',
            boxShadow: '0 8px 24px rgba(46,143,87,0.3)'
          }}>
              <Trophy size={26} style={{
              color: '#B7FF1A'
            }} />
            </div>
            <div>
              <h1 className="text-[22px] font-black leading-tight tracking-tight" style={{
              color: '#F2EEDC'
            }}>
                Règlement
              </h1>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{
              color: '#8A938C'
            }}>
                <span>Summer Cup · Saison 3 · 2025</span>
              </p>
            </div>
          </div>
          <p className="text-[12px] leading-relaxed" style={{
          color: 'rgba(215,219,200,0.55)'
        }}>
            Rédigé dans un esprit de fair-play, de transparence et de respect de tous les participants. L'esprit Tcheksplay avant tout.
          </p>
        </div>
      </div>

      {/* ── SECTION LABEL: APERÇU RAPIDE ── */}
      <SectionLabel label="Aperçu rapide" accent />

      {/* ── QUICK STATS ── */}
      <div className="grid grid-cols-4 gap-2 -mt-2">
        {QUICK_STATS.map(r => <div key={r.id} className="flex flex-col items-center gap-1.5 py-3.5 rounded-[14px]" style={{
        background: '#123129',
        border: `1px solid ${r.color}14`
      }}>
            <span className="text-[16px] font-black leading-none tracking-tight" style={{
          color: r.color
        }}>
              {r.label}
            </span>
            <span className="text-[7px] font-black uppercase tracking-wider text-center px-1 leading-tight" style={{
          color: '#8A938C'
        }}>
              {r.sub}
            </span>
          </div>)}
      </div>

      {/* ── FORMAT DU TOURNOI ── */}
      <div className="rounded-[22px] p-5" style={{
      background: '#123129',
      border: '1px solid rgba(255,255,255,0.05)'
    }}>
        <h2 className="text-[9px] font-black uppercase tracking-[0.2em] mb-4" style={{
        color: '#8A938C'
      }}>
          Format du Tournoi · Phase de groupes → Élimination directe
        </h2>
        <div className="relative">
          <div className="absolute top-5 left-5 right-5 h-px" style={{
          background: 'rgba(255,255,255,0.06)'
        }} />
          <div className="flex items-start justify-between">
            {FORMAT_VISUAL.map((phase, i) => <div key={phase.id} className="flex flex-col items-center gap-2" style={{
            flex: 1
          }}>
                <div className="w-10 h-10 rounded-full flex items-center justify-center relative z-10 text-[18px]" style={{
              background: i === FORMAT_VISUAL.length - 1 ? 'linear-gradient(145deg, #B7FF1A, #2E8F57)' : 'rgba(255,255,255,0.05)',
              border: i === FORMAT_VISUAL.length - 1 ? 'none' : '1px solid rgba(255,255,255,0.1)',
              boxShadow: i === FORMAT_VISUAL.length - 1 ? '0 4px 20px rgba(183,255,26,0.3)' : 'none'
            }}>
                  {phase.icon}
                </div>
                <div className="flex flex-col items-center gap-0.5 text-center">
                  <p className="text-[8px] font-black leading-snug" style={{
                color: i === FORMAT_VISUAL.length - 1 ? '#B7FF1A' : '#D7DBC8'
              }}>
                    {phase.round}
                  </p>
                  <p className="text-[7px]" style={{
                color: '#8A938C'
              }}>
                    {phase.note}
                  </p>
                </div>
              </div>)}
          </div>
        </div>
      </div>

      {/* ── SYSTÈME DE POINTS ── */}
      <div className="rounded-[22px] p-5" style={{
      background: '#123129',
      border: '1px solid rgba(255,255,255,0.05)'
    }}>
        <h2 className="text-[9px] font-black uppercase tracking-[0.2em] mb-4" style={{
        color: '#8A938C'
      }}>
          Système de Points · Victoire 3 pts · Nul 1 pt · Défaite 0 pt
        </h2>
        <div className="flex items-stretch gap-3">
          {POINTS_DATA.map(item => <div key={item.id} className="flex-1 flex flex-col items-center gap-2 py-4 rounded-[16px]" style={{
          background: `${item.color}0C`,
          border: `1px solid ${item.color}1E`
        }}>
              <span className="text-[18px]">{item.emoji}</span>
              <span className="text-[28px] font-black leading-none tabular-nums" style={{
            color: item.color
          }}>
                {item.pts}
              </span>
              <span className="text-[9px] font-black uppercase tracking-wide" style={{
            color: '#8A938C'
          }}>
                {item.result}
              </span>
            </div>)}
        </div>
      </div>

      {/* ── DURÉE D'UN MATCH ── */}
      <div className="rounded-[22px] p-5" style={{
      background: '#123129',
      border: '1px solid rgba(255,255,255,0.05)'
    }}>
        <h2 className="text-[9px] font-black uppercase tracking-[0.2em] mb-4" style={{
        color: '#8A938C'
      }}>
          Durée d'un Match · 2×25 min + mi-temps 10 min
        </h2>
        <div className="flex items-stretch gap-0">
          {MATCH_PHASES.map((phase, i) => <div key={phase.id} className="flex flex-col items-center justify-center py-3 gap-1" style={{
          flex: phase.flex,
          background: i === 1 ? 'rgba(255,255,255,0.04)' : `${phase.color}12`,
          borderRadius: phase.borderRadius,
          border: `1px solid ${phase.color}1E`,
          borderRight: phase.borderRight
        }}>
              <span className="text-[14px] font-black tabular-nums" style={{
            color: phase.color
          }}>
                {phase.duration}
              </span>
              <span className="text-[7px] font-black uppercase tracking-wider text-center px-1 leading-tight" style={{
            color: '#8A938C'
          }}>
                {phase.label}
              </span>
            </div>)}
        </div>
        <p className="text-[10px] mt-3 text-center" style={{
        color: '#8A938C'
      }}>
          Durée totale : 60 min · Prolongations 2×10 min si nécessaire
        </p>
      </div>

      {/* ── SANCTIONS CARTONS ── */}
      <div>
        <h2 className="text-[9px] font-black uppercase tracking-[0.2em] mb-3" style={{
        color: '#8A938C'
      }}>
          Sanctions Cartons · Jaune · Rouge · Exclusion
        </h2>
        <div className="flex flex-col gap-2">
          {CARD_DATA.map(item => <div key={item.id} className="flex items-center gap-3 px-4 py-3.5 rounded-[16px]" style={{
          background: `${item.color}0C`,
          border: `1px solid ${item.color}20`
        }}>
              <span className="text-[22px] flex-shrink-0">{item.card}</span>
              <div className="flex-1">
                <p className="text-[12px] font-black" style={{
              color: '#F2EEDC'
            }}>
                  {item.label}
                </p>
                <p className="text-[10px]" style={{
              color: '#8A938C'
            }}>
                  {item.desc}
                </p>
              </div>
              <AlertTriangle size={14} style={{
            color: item.color,
            flexShrink: 0
          }} />
            </div>)}
        </div>
      </div>

      {/* ── CRITÈRES DE DÉPARTAGE ── */}
      <div className="rounded-[22px] p-5" style={{
      background: '#123129',
      border: '1px solid rgba(255,255,255,0.05)'
    }}>
        <h2 className="text-[9px] font-black uppercase tracking-[0.2em] mb-4" style={{
        color: '#8A938C'
      }}>
          Critères de Départage · En cas d'égalité au classement
        </h2>
        <div className="flex flex-col gap-2.5">
          {TIEBREAK_CRITERIA.map((criterion, i) => <div key={criterion.id} className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0" style={{
            background: i === 0 ? 'rgba(183,255,26,0.15)' : 'rgba(255,255,255,0.04)',
            border: i === 0 ? '1px solid rgba(183,255,26,0.25)' : '1px solid rgba(255,255,255,0.07)'
          }}>
                <span className="text-[9px] font-black" style={{
              color: i === 0 ? '#B7FF1A' : '#556A61'
            }}>
                  {i + 1}
                </span>
              </div>
              <span className="flex-1 text-[11px] font-black leading-snug" style={{
            color: i === 0 ? '#F2EEDC' : i < 3 ? '#D7DBC8' : '#8A938C'
          }}>
                {criterion.label}
              </span>
              {i === 0 && <span className="flex-shrink-0 text-[8px] font-black px-2 py-0.5 rounded-md" style={{
            background: 'rgba(183,255,26,0.08)',
            color: '#B7FF1A',
            border: '1px solid rgba(183,255,26,0.14)'
          }}>
                  Prioritaire
                </span>}
              {i === 4 && <span className="flex-shrink-0 text-[8px] font-semibold" style={{
            color: '#556A61'
          }}>
                  Extrême
                </span>}
            </div>)}
        </div>
      </div>

      {/* ── SECTION LABEL: DÉTAILS COMPLETS ── */}
      <SectionLabel label="Détails complets du règlement" />

      {/* ── RÈGLEMENT COMPLET (accordéon) ── */}
      <div className="flex flex-col gap-3 -mt-2">
        {RULE_SECTIONS.map(section => <RuleSectionCard key={section.id} section={section} />)}
      </div>

      {/* ── FAIR-PLAY BANNER ── */}
      <div className="rounded-[22px] p-5 flex items-start gap-4" style={{
      background: 'linear-gradient(135deg, rgba(53,208,127,0.08) 0%, rgba(18,49,41,0.98) 100%)',
      border: '1px solid rgba(53,208,127,0.15)'
    }}>
        <div className="w-11 h-11 rounded-[14px] flex items-center justify-center flex-shrink-0" style={{
        background: 'rgba(53,208,127,0.12)',
        border: '1px solid rgba(53,208,127,0.2)'
      }}>
          <CheckCircle size={20} style={{
          color: '#35D07F'
        }} />
        </div>
        <div>
          <p className="text-[13px] font-black mb-1" style={{
          color: '#F2EEDC'
        }}>
            L'esprit Tcheksplay avant tout
          </p>
          <p className="text-[11px] leading-relaxed" style={{
          color: 'rgba(215,219,200,0.55)'
        }}>
            Ce tournoi est avant tout une fête du football local. Respect, fraternité et fair-play sont des valeurs non négociables — comme le prouve le projet Playground Marquisats porté par la communauté.
          </p>
        </div>
      </div>

    </div>;
};