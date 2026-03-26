import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, CheckCircle, Users, User, MapPin, Shield, Plus, Trash2, Trophy, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// ─── Types ────────────────────────────────────────────────────────────────────

type Step = 'preregistration' | 'team' | 'players' | 'validation' | 'confirmation';
interface TeamForm {
  name: string;
  city: string;
  neighborhood: string;
  sector: string;
  origin: string;
}
interface PlayerForm {
  id: string;
  firstName: string;
  lastName: string;
  age: string;
  pastClubs: string;
  bestLevel: string;
  jerseySize: string;
  shortsSize: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const STEPS: Array<{
  id: Step;
  label: string;
  short: string;
}> = [{
  id: 'preregistration',
  label: 'Pré-inscription',
  short: '1'
}, {
  id: 'team',
  label: 'Équipe',
  short: '2'
}, {
  id: 'players',
  label: 'Joueurs',
  short: '3'
}, {
  id: 'validation',
  label: 'Validation',
  short: '4'
}, {
  id: 'confirmation',
  label: 'Confirmation',
  short: '5'
}];
const JERSEY_SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
const SHORTS_SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
const BEST_LEVELS = ['Loisir', 'Départemental', 'Régional', 'National', 'Professionnel'];
const createEmptyPlayer = (): PlayerForm => ({
  id: `p_${Date.now()}_${Math.random()}`,
  firstName: '',
  lastName: '',
  age: '',
  pastClubs: '',
  bestLevel: '',
  jerseySize: '',
  shortsSize: ''
});

// ─── StepIndicator ────────────────────────────────────────────────────────────

const StepIndicator = ({
  current
}: {
  current: Step;
}) => {
  const currentIndex = STEPS.findIndex(s => s.id === current);
  return <div className="flex items-center justify-center gap-0 px-5 mb-8">
      {STEPS.map((step, i) => {
      const done = i < currentIndex;
      const active = i === currentIndex;
      return <React.Fragment key={step.id}>
            <div className="flex flex-col items-center gap-1">
              <div className="w-8 h-8 rounded-full flex items-center justify-center transition-all" style={done ? {
            background: '#B7FF1A'
          } : active ? {
            background: 'rgba(183,255,26,0.15)',
            border: '2px solid #B7FF1A'
          } : {
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)'
          }}>
                {done ? <CheckCircle size={14} style={{
              color: '#0B221C'
            }} /> : <span className="text-[10px] font-black" style={{
              color: active ? '#B7FF1A' : '#8A938C'
            }}>{step.short}</span>}
              </div>
            </div>
            {i < STEPS.length - 1 && <div className="flex-1 h-[2px] mx-1" style={{
          background: i < currentIndex ? '#B7FF1A' : 'rgba(255,255,255,0.07)',
          maxWidth: 24
        }} />}
          </React.Fragment>;
    })}
    </div>;
};

// ─── FormField ────────────────────────────────────────────────────────────────

const FormField = ({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
  required
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
}) => <div className="flex flex-col gap-1.5">
    <label className="text-[9px] font-black uppercase tracking-[0.2em]" style={{
    color: '#8A938C'
  }}>
      {label}{required && <span style={{
      color: '#B7FF1A'
    }}> *</span>}
    </label>
    <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} className="w-full h-12 px-4 rounded-[14px] text-[13px] font-medium focus:outline-none transition-all" style={{
    background: 'rgba(255,255,255,0.04)',
    border: `1px solid ${value ? 'rgba(183,255,26,0.25)' : 'rgba(255,255,255,0.08)'}`,
    color: '#F2EEDC'
  }} />
  </div>;

// ─── SelectField ──────────────────────────────────────────────────────────────

const SelectField = ({
  label,
  value,
  onChange,
  options,
  placeholder
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
  placeholder?: string;
}) => <div className="flex flex-col gap-1.5">
    <label className="text-[9px] font-black uppercase tracking-[0.2em]" style={{
    color: '#8A938C'
  }}>{label}</label>
    <div className="flex gap-2 flex-wrap">
      {options.map(opt => <button key={opt} type="button" onClick={() => onChange(opt)} className="px-3 py-1.5 rounded-[10px] text-[10px] font-black transition-all" style={value === opt ? {
      background: '#B7FF1A',
      color: '#0B221C'
    } : {
      background: 'rgba(255,255,255,0.04)',
      border: '1px solid rgba(255,255,255,0.08)',
      color: '#8A938C'
    }}>
          {opt}
        </button>)}
    </div>
  </div>;

// ─── PlayerFormCard ───────────────────────────────────────────────────────────

const PlayerFormCard = ({
  player,
  index,
  onChange,
  onRemove,
  canRemove
}: {
  player: PlayerForm;
  index: number;
  onChange: (id: string, field: keyof PlayerForm, value: string) => void;
  onRemove: (id: string) => void;
  canRemove: boolean;
}) => {
  const [expanded, setExpanded] = useState(true);
  const hasBasics = player.firstName && player.lastName;
  return <div className="rounded-[22px] overflow-hidden" style={{
    background: '#123129',
    border: '1px solid rgba(255,255,255,0.06)'
  }}>
      <button type="button" onClick={() => setExpanded(!expanded)} className="w-full flex items-center justify-between px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-[10px] flex items-center justify-center" style={{
          background: 'rgba(183,255,26,0.08)',
          border: '1px solid rgba(183,255,26,0.15)'
        }}>
            <span className="text-[11px] font-black" style={{
            color: '#B7FF1A'
          }}>#{index + 1}</span>
          </div>
          <div className="text-left">
            <p className="text-[12px] font-black" style={{
            color: '#F2EEDC'
          }}>
              {hasBasics ? `${player.firstName} ${player.lastName}` : `Joueur ${index + 1}`}
            </p>
            {player.jerseySize && <p className="text-[9px] font-bold" style={{
            color: '#8A938C'
          }}>Maillot {player.jerseySize} · Short {player.shortsSize || '?'}</p>}
          </div>
        </div>
        <div className="flex items-center gap-2">
          {canRemove && <button type="button" onClick={e => {
          e.stopPropagation();
          onRemove(player.id);
        }} className="w-7 h-7 rounded-full flex items-center justify-center" style={{
          background: 'rgba(217,75,91,0.1)',
          border: '1px solid rgba(217,75,91,0.2)'
        }} aria-label="Retirer le joueur">
              <Trash2 size={11} style={{
            color: '#D94B5B'
          }} />
            </button>}
          <ChevronRight size={14} style={{
          color: '#8A938C',
          transform: expanded ? 'rotate(90deg)' : 'none',
          transition: 'transform 0.2s'
        }} />
        </div>
      </button>

      {expanded && <div className="px-4 pb-4 flex flex-col gap-4" style={{
      borderTop: '1px solid rgba(255,255,255,0.05)'
    }}>
          <div className="h-2" />
          <div className="grid grid-cols-2 gap-3">
            <FormField label="Prénom" value={player.firstName} onChange={v => onChange(player.id, 'firstName', v)} placeholder="Killian" required />
            <FormField label="Nom" value={player.lastName} onChange={v => onChange(player.id, 'lastName', v)} placeholder="Bersot" required />
          </div>
          <FormField label="Âge" value={player.age} onChange={v => onChange(player.id, 'age', v)} placeholder="24" type="number" />
          <FormField label="Clubs passés" value={player.pastClubs} onChange={v => onChange(player.id, 'pastClubs', v)} placeholder="AS Annecy, FC Seynod..." />
          <SelectField label="Meilleur niveau" value={player.bestLevel} onChange={v => onChange(player.id, 'bestLevel', v)} options={BEST_LEVELS} />
          <div className="grid grid-cols-2 gap-3">
            <SelectField label="Taille maillot" value={player.jerseySize} onChange={v => onChange(player.id, 'jerseySize', v)} options={JERSEY_SIZES} />
            <SelectField label="Taille short" value={player.shortsSize} onChange={v => onChange(player.id, 'shortsSize', v)} options={SHORTS_SIZES} />
          </div>
        </div>}
    </div>;
};

// ─── RegistrationScreen ────────────────────────────────────────────────────────

export const RegistrationScreen = () => {
  const [step, setStep] = useState<Step>('preregistration');
  const [accepted, setAccepted] = useState(false);
  const [team, setTeam] = useState<TeamForm>({
    name: '',
    city: '',
    neighborhood: '',
    sector: '',
    origin: ''
  });
  const [players, setPlayers] = useState<PlayerForm[]>([createEmptyPlayer(), createEmptyPlayer()]);
  const [registrationCode] = useState(() => 'TCK-' + Math.random().toString(36).substring(2, 8).toUpperCase());
  const updateTeam = (field: keyof TeamForm, value: string) => setTeam(prev => ({
    ...prev,
    [field]: value
  }));
  const updatePlayer = (id: string, field: keyof PlayerForm, value: string) => {
    setPlayers(prev => prev.map(p => p.id === id ? {
      ...p,
      [field]: value
    } : p));
  };
  const addPlayer = () => setPlayers(prev => [...prev, createEmptyPlayer()]);
  const removePlayer = (id: string) => setPlayers(prev => prev.filter(p => p.id !== id));
  const currentStepIndex = STEPS.findIndex(s => s.id === step);
  const goNext = () => step !== 'confirmation' && setStep(STEPS[currentStepIndex + 1].id);
  const goBack = () => step !== 'preregistration' && setStep(STEPS[currentStepIndex - 1].id);
  return <div className="flex flex-col px-5 pb-4">

      {/* Step indicator */}
      <StepIndicator current={step} />

      <AnimatePresence mode="wait">
        <motion.div key={step} initial={{
        opacity: 0,
        x: 20
      }} animate={{
        opacity: 1,
        x: 0
      }} exit={{
        opacity: 0,
        x: -20
      }} transition={{
        duration: 0.22,
        ease: 'easeOut'
      }} className="flex flex-col gap-6">

          {/* STEP 1: Pre-registration */}
          {step === 'preregistration' && <div className="flex flex-col gap-5">
              <div className="rounded-[28px] overflow-hidden" style={{
            background: 'linear-gradient(145deg, #183C31, #0B221C)',
            border: '1px solid rgba(183,255,26,0.1)'
          }}>
                <div className="p-5">
                  <div className="w-14 h-14 rounded-[18px] flex items-center justify-center mb-4" style={{
                background: 'linear-gradient(145deg, #2E8F57, #123129)',
                boxShadow: '0 8px 24px rgba(46,143,87,0.3)'
              }}>
                    <Trophy size={24} style={{
                  color: '#B7FF1A'
                }} />
                  </div>
                  <h2 className="text-[22px] font-black tracking-tight mb-1" style={{
                color: '#F2EEDC'
              }}>Inscription Équipe</h2>
                  <p className="text-[12px] leading-relaxed" style={{
                color: 'rgba(215,219,200,0.6)'
              }}>Summer Cup · Saison 3 · 2025</p>
                </div>
                <div className="px-5 pb-5 flex flex-col gap-3">
                  {[{
                step: '1',
                label: 'Pré-inscription',
                desc: 'Vos coordonnées de contact'
              }, {
                step: '2',
                label: 'Infos équipe',
                desc: 'Nom, ville, origine'
              }, {
                step: '3',
                label: 'Ajout joueurs',
                desc: 'Jusqu\'à 18 joueurs'
              }, {
                step: '4',
                label: 'Validation',
                desc: 'Vérification et confirmation'
              }].map(s => <div key={s.step} className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0" style={{
                  background: 'rgba(183,255,26,0.1)',
                  border: '1px solid rgba(183,255,26,0.2)'
                }}>
                        <span className="text-[9px] font-black" style={{
                    color: '#B7FF1A'
                  }}>{s.step}</span>
                      </div>
                      <div>
                        <p className="text-[11px] font-black" style={{
                    color: '#F2EEDC'
                  }}>{s.label}</p>
                        <p className="text-[9px]" style={{
                    color: '#8A938C'
                  }}>{s.desc}</p>
                      </div>
                    </div>)}
                </div>
              </div>

              <div className="rounded-[22px] p-4" style={{
            background: '#123129',
            border: '1px solid rgba(255,255,255,0.05)'
          }}>
                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] mb-4" style={{
              color: '#8A938C'
            }}>Vos Coordonnées</h3>
                <div className="flex flex-col gap-3">
                  <FormField label="Nom du responsable" value="" onChange={() => {}} placeholder="Killian Bersot" required />
                  <FormField label="Email" value="" onChange={() => {}} placeholder="contact@annecyfc.com" type="email" required />
                  <FormField label="Téléphone" value="" onChange={() => {}} placeholder="+33 6 12 34 56 78" type="tel" required />
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-[16px] cursor-pointer" style={{
            background: 'rgba(255,255,255,0.03)',
            border: `1px solid ${accepted ? 'rgba(183,255,26,0.25)' : 'rgba(255,255,255,0.07)'}`
          }} onClick={() => setAccepted(!accepted)}>
                <div className="w-5 h-5 rounded-[6px] flex items-center justify-center flex-shrink-0 mt-0.5 transition-all" style={{
              background: accepted ? '#B7FF1A' : 'rgba(255,255,255,0.05)',
              border: `1px solid ${accepted ? '#B7FF1A' : 'rgba(255,255,255,0.1)'}`
            }}>
                  {accepted && <CheckCircle size={11} style={{
                color: '#0B221C'
              }} />}
                </div>
                <p className="text-[11px] leading-relaxed" style={{
              color: 'rgba(215,219,200,0.6)'
            }}>
                  J'accepte le règlement du tournoi et je certifie que les informations renseignées sont exactes.
                </p>
              </div>
            </div>}

          {/* STEP 2: Team */}
          {step === 'team' && <div className="flex flex-col gap-5">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-[16px] flex items-center justify-center" style={{
              background: 'rgba(183,255,26,0.08)',
              border: '1px solid rgba(183,255,26,0.15)'
            }}>
                  <Shield size={22} style={{
                color: '#B7FF1A'
              }} />
                </div>
                <div>
                  <h2 className="text-[18px] font-black" style={{
                color: '#F2EEDC'
              }}>Informations Équipe</h2>
                  <p className="text-[10px] font-bold" style={{
                color: '#8A938C'
              }}>Étape 2 sur 4</p>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <FormField label="Nom de l'équipe" value={team.name} onChange={v => updateTeam('name', v)} placeholder="Annecy FC" required />
                <FormField label="Ville" value={team.city} onChange={v => updateTeam('city', v)} placeholder="Annecy" required />
                <FormField label="Quartier" value={team.neighborhood} onChange={v => updateTeam('neighborhood', v)} placeholder="Les Marquisats" />
                <FormField label="Secteur" value={team.sector} onChange={v => updateTeam('sector', v)} placeholder="Centre-Annecy" />
                <div className="flex flex-col gap-2">
                  <label className="text-[9px] font-black uppercase tracking-[0.2em]" style={{
                color: '#8A938C'
              }}>Origine de l'équipe</label>
                  <textarea value={team.origin} onChange={e => updateTeam('origin', e.target.value)} placeholder="Décrivez l'histoire ou les motivations de votre équipe..." rows={3} className="w-full px-4 py-3 rounded-[14px] text-[12px] font-medium focus:outline-none resize-none" style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                color: '#F2EEDC'
              }} />
                </div>
              </div>
            </div>}

          {/* STEP 3: Players */}
          {step === 'players' && <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-[16px] flex items-center justify-center" style={{
                background: 'rgba(183,255,26,0.08)',
                border: '1px solid rgba(183,255,26,0.15)'
              }}>
                    <Users size={22} style={{
                  color: '#B7FF1A'
                }} />
                  </div>
                  <div>
                    <h2 className="text-[18px] font-black" style={{
                  color: '#F2EEDC'
                }}>Joueurs</h2>
                    <p className="text-[10px] font-bold" style={{
                  color: '#8A938C'
                }}>{players.length} / 18 joueurs</p>
                  </div>
                </div>
              </div>

              {/* Progress bar */}
              <div className="w-full h-[4px] rounded-full overflow-hidden" style={{
            background: 'rgba(255,255,255,0.06)'
          }}>
                <div className="h-full rounded-full transition-all" style={{
              width: `${players.length / 18 * 100}%`,
              background: 'linear-gradient(90deg, #2E8F57, #B7FF1A)'
            }} />
              </div>

              {players.map((player, i) => <PlayerFormCard key={player.id} player={player} index={i} onChange={updatePlayer} onRemove={removePlayer} canRemove={players.length > 1} />)}

              {players.length < 18 && <button type="button" onClick={addPlayer} className="w-full py-4 rounded-[18px] flex items-center justify-center gap-2 text-[12px] font-black uppercase tracking-wider transition-all" style={{
            background: 'rgba(183,255,26,0.06)',
            border: '1px dashed rgba(183,255,26,0.2)',
            color: '#B7FF1A'
          }}>
                  <Plus size={16} />
                  <span>Ajouter un joueur</span>
                </button>}
            </div>}

          {/* STEP 4: Validation */}
          {step === 'validation' && <div className="flex flex-col gap-5">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-[16px] flex items-center justify-center" style={{
              background: 'rgba(183,255,26,0.08)',
              border: '1px solid rgba(183,255,26,0.15)'
            }}>
                  <CheckCircle size={22} style={{
                color: '#B7FF1A'
              }} />
                </div>
                <div>
                  <h2 className="text-[18px] font-black" style={{
                color: '#F2EEDC'
              }}>Validation</h2>
                  <p className="text-[10px] font-bold" style={{
                color: '#8A938C'
              }}>Vérifiez avant de soumettre</p>
                </div>
              </div>

              {/* Team recap */}
              <div className="rounded-[22px] p-4" style={{
            background: '#123129',
            border: '1px solid rgba(255,255,255,0.06)'
          }}>
                <div className="flex items-center gap-2 mb-3">
                  <Shield size={12} style={{
                color: '#B7FF1A'
              }} />
                  <span className="text-[9px] font-black uppercase tracking-[0.2em]" style={{
                color: '#8A938C'
              }}>Équipe</span>
                </div>
                <div className="flex flex-col gap-1.5">
                  {[{
                label: 'Nom',
                value: team.name || '—'
              }, {
                label: 'Ville',
                value: team.city || '—'
              }, {
                label: 'Quartier',
                value: team.neighborhood || '—'
              }, {
                label: 'Secteur',
                value: team.sector || '—'
              }].map(item => <div key={item.label} className="flex items-center justify-between">
                      <span className="text-[10px] font-bold" style={{
                  color: '#8A938C'
                }}>{item.label}</span>
                      <span className="text-[11px] font-black" style={{
                  color: '#F2EEDC'
                }}>{item.value}</span>
                    </div>)}
                </div>
              </div>

              {/* Players recap */}
              <div className="rounded-[22px] p-4" style={{
            background: '#123129',
            border: '1px solid rgba(255,255,255,0.06)'
          }}>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Users size={12} style={{
                  color: '#B7FF1A'
                }} />
                    <span className="text-[9px] font-black uppercase tracking-[0.2em]" style={{
                  color: '#8A938C'
                }}>Joueurs</span>
                  </div>
                  <span className="text-[11px] font-black" style={{
                color: '#B7FF1A'
              }}>{players.length}</span>
                </div>
                <div className="flex flex-col gap-2">
                  {players.map((p, i) => <div key={p.id} className="flex items-center gap-2.5 py-2" style={{
                borderBottom: i < players.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none'
              }}>
                      <span className="text-[10px] font-black" style={{
                  color: '#8A938C'
                }}>#{i + 1}</span>
                      <span className="flex-1 text-[11px] font-black" style={{
                  color: p.firstName ? '#F2EEDC' : '#8A938C'
                }}>
                        {p.firstName && p.lastName ? `${p.firstName} ${p.lastName}` : 'Non renseigné'}
                      </span>
                      {p.jerseySize && <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-md" style={{
                  background: 'rgba(183,255,26,0.08)',
                  color: '#B7FF1A'
                }}>{p.jerseySize}</span>}
                    </div>)}
                </div>
              </div>

              <div className="rounded-[16px] p-4 flex items-start gap-3" style={{
            background: 'rgba(183,255,26,0.06)',
            border: '1px solid rgba(183,255,26,0.15)'
          }}>
                <Zap size={14} style={{
              color: '#B7FF1A',
              flexShrink: 0,
              marginTop: 1
            }} />
                <p className="text-[11px] leading-relaxed" style={{
              color: 'rgba(215,219,200,0.7)'
            }}>
                  Après soumission, votre inscription sera traitée sous 48h. Vous recevrez un email de confirmation avec votre code d'équipe.
                </p>
              </div>
            </div>}

          {/* STEP 5: Confirmation */}
          {step === 'confirmation' && <div className="flex flex-col items-center gap-6 pt-4">
              <motion.div initial={{
            scale: 0.7,
            opacity: 0
          }} animate={{
            scale: 1,
            opacity: 1
          }} transition={{
            type: 'spring',
            stiffness: 300,
            damping: 22
          }} className="w-24 h-24 rounded-[28px] flex items-center justify-center" style={{
            background: 'linear-gradient(145deg, #2E8F57, #123129)',
            boxShadow: '0 16px 48px rgba(46,143,87,0.35)'
          }}>
                <CheckCircle size={44} style={{
              color: '#B7FF1A'
            }} />
              </motion.div>

              <div className="text-center">
                <h2 className="text-[26px] font-black tracking-tight mb-2" style={{
              color: '#F2EEDC'
            }}>Inscription envoyée !</h2>
                <p className="text-[13px] leading-relaxed" style={{
              color: 'rgba(215,219,200,0.6)'
            }}>Bienvenue dans le tournoi Tcheksplay. Votre dossier est en cours d'examen.</p>
              </div>

              <div className="w-full rounded-[22px] p-5 text-center" style={{
            background: '#123129',
            border: '1px solid rgba(183,255,26,0.15)'
          }}>
                <p className="text-[9px] font-black uppercase tracking-[0.2em] mb-2" style={{
              color: '#8A938C'
            }}>Votre code d'inscription</p>
                <p className="text-[32px] font-black tracking-[-0.03em] mb-2" style={{
              color: '#B7FF1A'
            }}>{registrationCode}</p>
                <p className="text-[10px]" style={{
              color: '#8A938C'
            }}>Conservez ce code — il vous sera demandé pour la validation finale.</p>
              </div>

              <div className="w-full flex flex-col gap-3">
                {[{
              emoji: '📧',
              label: 'Email de confirmation',
              desc: 'Envoyé sous 5 minutes'
            }, {
              emoji: '📞',
              label: 'Contact organisateur',
              desc: 'Validation sous 48h'
            }, {
              emoji: '📅',
              label: 'Calendrier',
              desc: 'Horaires communiqués en semaine'
            }].map(item => <div key={item.label} className="flex items-center gap-3 px-4 py-3 rounded-[14px]" style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.05)'
            }}>
                    <span className="text-[18px]">{item.emoji}</span>
                    <div>
                      <p className="text-[11px] font-black" style={{
                  color: '#D7DBC8'
                }}>{item.label}</p>
                      <p className="text-[9px]" style={{
                  color: '#8A938C'
                }}>{item.desc}</p>
                    </div>
                  </div>)}
              </div>
            </div>}

        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      {step !== 'confirmation' && <div className="flex items-center gap-3 mt-8">
          {step !== 'preregistration' && <button onClick={goBack} className="flex items-center gap-2 px-5 py-3.5 rounded-[16px] text-[11px] font-black uppercase tracking-wider" style={{
        background: 'rgba(255,255,255,0.05)',
        border: '1px solid rgba(255,255,255,0.08)',
        color: '#D7DBC8'
      }}>
              <ChevronLeft size={14} />
              <span>Retour</span>
            </button>}
          <button onClick={goNext} disabled={step === 'preregistration' && !accepted} className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-[16px] text-[12px] font-black uppercase tracking-wider transition-all" style={step === 'preregistration' && !accepted ? {
        background: 'rgba(183,255,26,0.1)',
        color: 'rgba(183,255,26,0.3)',
        cursor: 'not-allowed'
      } : {
        background: '#B7FF1A',
        color: '#0B221C'
      }}>
            <span>{step === 'validation' ? 'Soumettre l\'inscription' : 'Continuer'}</span>
            <ChevronRight size={14} />
          </button>
        </div>}

    </div>;
};