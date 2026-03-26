import { ChevronRight, ChevronLeft, Plus, CheckCircle, Trophy } from 'lucide-react';
import { StepIndicator } from './components/StepIndicator';
import { PlayerFormCard } from './components/PlayerFormCard';
import { useRegistrationForm } from './hooks/useRegistrationForm';
import type { TeamForm } from './types';
import { THEME } from '@/shared/lib/constants';

function FormField({ label, value, onChange, placeholder, required }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string; required?: boolean }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[9px] font-black uppercase tracking-[0.2em]" style={{ color: THEME.muted }}>
        {label}{required && <span style={{ color: THEME.accent }}> *</span>}
      </label>
      <input value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className="w-full h-12 px-4 rounded-[14px] text-[13px] font-medium focus:outline-none transition-all" style={{ background: 'rgba(255,255,255,0.04)', border: `1px solid ${value ? `${THEME.accent}25` : 'rgba(255,255,255,0.08)'}`, color: THEME.text }} />
    </div>
  );
}

export function RegistrationScreen() {
  const { step, team, players, goNext, goBack, updateTeam, updatePlayer, addPlayer, removePlayer } = useRegistrationForm();

  return (
    <div className="flex flex-col gap-5 pb-4">
      <div className="px-5 pt-2">
        <h1 className="text-[22px] font-black uppercase tracking-tight" style={{ color: THEME.text }}>Inscription</h1>
        <p className="text-[11px] mt-1" style={{ color: THEME.muted }}>Summer Cup S3 · Formulaire d'inscription</p>
      </div>

      <StepIndicator current={step} />

      {step === 'preregistration' && (
        <div className="px-5 flex flex-col gap-5">
          <div className="rounded-[22px] p-5 text-center" style={{ background: `${THEME.accent}06`, border: `1px solid ${THEME.accent}15` }}>
            <Trophy size={32} className="mx-auto mb-3" style={{ color: THEME.accent }} />
            <h2 className="text-[16px] font-black" style={{ color: THEME.text }}>Inscrivez votre équipe</h2>
            <p className="text-[11px] mt-2 leading-relaxed" style={{ color: THEME.muted }}>
              Remplissez le formulaire pour participer à la Summer Cup S3. Minimum 5 joueurs, maximum 12.
            </p>
          </div>
          <NavButton label="Commencer l'inscription" onClick={goNext} />
        </div>
      )}

      {step === 'team' && (
        <div className="px-5 flex flex-col gap-4">
          <h2 className="text-[14px] font-black" style={{ color: THEME.text }}>Informations de l'équipe</h2>
          {(['name', 'city', 'neighborhood', 'sector', 'origin'] as (keyof TeamForm)[]).map((field) => {
            const labels: Record<keyof TeamForm, string> = { name: 'Nom de l\'équipe', city: 'Ville', neighborhood: 'Quartier', sector: 'Secteur', origin: 'Origine du groupe' };
            return <FormField key={field} label={labels[field]} value={team[field]} onChange={(v) => updateTeam(field, v)} required={field === 'name' || field === 'city'} />;
          })}
          <NavButtons onBack={goBack} onNext={goNext} nextDisabled={!team.name || !team.city} />
        </div>
      )}

      {step === 'players' && (
        <div className="px-5 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-[14px] font-black" style={{ color: THEME.text }}>Joueurs ({players.length})</h2>
            <button onClick={addPlayer} className="flex items-center gap-1 px-3 py-1.5 rounded-[10px] text-[9px] font-black" style={{ background: `${THEME.accent}12`, color: THEME.accent, border: `1px solid ${THEME.accent}25` }}>
              <Plus size={10} /> Ajouter
            </button>
          </div>
          {players.map((p, i) => (
            <PlayerFormCard key={p.id} player={p} index={i} onChange={updatePlayer} onRemove={removePlayer} canRemove={players.length > 1} />
          ))}
          <NavButtons onBack={goBack} onNext={goNext} nextDisabled={players.length < 1} />
        </div>
      )}

      {step === 'validation' && (
        <div className="px-5 flex flex-col gap-4">
          <h2 className="text-[14px] font-black" style={{ color: THEME.text }}>Récapitulatif</h2>
          <div className="rounded-[18px] p-4" style={{ background: THEME.cardBg, border: '1px solid rgba(255,255,255,0.06)' }}>
            <p className="text-[12px] font-black" style={{ color: THEME.text }}>{team.name || 'Équipe sans nom'}</p>
            <p className="text-[10px] mt-1" style={{ color: THEME.muted }}>{team.city} · {players.length} joueurs</p>
          </div>
          {players.map((p, i) => (
            <div key={p.id} className="flex items-center gap-3 px-3 py-2 rounded-[14px]" style={{ background: 'rgba(255,255,255,0.03)' }}>
              <span className="text-[10px] font-black" style={{ color: THEME.accent }}>#{i + 1}</span>
              <span className="text-[11px] font-bold" style={{ color: THEME.text }}>{p.firstName} {p.lastName || '—'}</span>
              {p.jerseySize && <span className="text-[9px]" style={{ color: THEME.muted }}>· {p.jerseySize}</span>}
            </div>
          ))}
          <NavButtons onBack={goBack} onNext={goNext} nextLabel="Valider l'inscription" />
        </div>
      )}

      {step === 'confirmation' && (
        <div className="px-5 flex flex-col items-center gap-4 py-8">
          <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ background: `${THEME.accent}15` }}>
            <CheckCircle size={32} style={{ color: THEME.accent }} />
          </div>
          <h2 className="text-[18px] font-black text-center" style={{ color: THEME.text }}>Inscription envoyée !</h2>
          <p className="text-[12px] text-center leading-relaxed" style={{ color: THEME.muted }}>
            Votre inscription a bien été transmise. Vous recevrez une confirmation sous 48h.
          </p>
        </div>
      )}
    </div>
  );
}

function NavButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button onClick={onClick} className="w-full h-14 rounded-[16px] text-[13px] font-black uppercase tracking-wide flex items-center justify-center gap-2" style={{ background: THEME.accent, color: THEME.bg }}>
      {label} <ChevronRight size={16} />
    </button>
  );
}

function NavButtons({ onBack, onNext, nextDisabled, nextLabel }: { onBack: () => void; onNext: () => void; nextDisabled?: boolean; nextLabel?: string }) {
  return (
    <div className="flex gap-3 mt-2">
      <button onClick={onBack} className="flex-1 h-12 rounded-[14px] text-[11px] font-black uppercase flex items-center justify-center gap-1" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: THEME.muted }}>
        <ChevronLeft size={14} /> Retour
      </button>
      <button onClick={onNext} disabled={nextDisabled} className="flex-[2] h-12 rounded-[14px] text-[11px] font-black uppercase flex items-center justify-center gap-1 transition-opacity" style={{ background: nextDisabled ? `${THEME.accent}30` : THEME.accent, color: THEME.bg, opacity: nextDisabled ? 0.5 : 1 }}>
        {nextLabel ?? 'Suivant'} <ChevronRight size={14} />
      </button>
    </div>
  );
}
