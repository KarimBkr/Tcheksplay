import { Shield } from 'lucide-react';
import { useRulesData } from './hooks/useRulesData';
import { RuleAccordion } from './components/RuleAccordion';
import { THEME } from '@/shared/lib/constants';

export function RulesScreen() {
  const { sections, loading } = useRulesData();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin" style={{ borderColor: `${THEME.blue} transparent ${THEME.blue} ${THEME.blue}` }} />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5 pb-4">
      <div className="px-5 pt-2">
        <h1 className="text-[22px] font-black uppercase tracking-tight" style={{ color: THEME.text }}>
          Règlement
        </h1>
        <p className="text-[11px] mt-1" style={{ color: THEME.muted }}>Summer Cup S3 · Règles officielles</p>
      </div>

      <div className="grid grid-cols-4 gap-2 px-5">
        {[
          { label: '2×25min', sub: 'Durée', color: THEME.accent },
          { label: '7v7', sub: 'Format', color: THEME.blue },
          { label: '3 pts', sub: 'Victoire', color: THEME.green },
          { label: '5 tireurs', sub: 'TAB', color: THEME.gold },
        ].map((s) => (
          <div
            key={s.label}
            className="rounded-[14px] p-2.5 flex flex-col items-center gap-0.5"
            style={{ background: `${s.color}08`, border: `1px solid ${s.color}15` }}
          >
            <span className="text-[14px] font-black" style={{ color: s.color }}>{s.label}</span>
            <span className="text-[7px] font-bold uppercase tracking-wider" style={{ color: THEME.muted }}>{s.sub}</span>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-3 px-5">
        {sections.map((section, i) => (
          <RuleAccordion key={section.id} section={section} defaultOpen={i === 0} />
        ))}
      </div>

      <div className="mx-5 rounded-[18px] p-4 flex items-center gap-3" style={{ background: 'rgba(123,167,217,0.06)', border: '1px solid rgba(123,167,217,0.15)' }}>
        <Shield size={18} style={{ color: THEME.blue }} />
        <p className="text-[10px] leading-relaxed" style={{ color: THEME.muted }}>
          Ce règlement est validé par la Commission Sportive Tcheksplay. Toute réclamation sous 24h par email officiel.
        </p>
      </div>
    </div>
  );
}
