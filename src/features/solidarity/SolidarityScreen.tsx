import { Heart, Users, TrendingUp } from 'lucide-react';
import { useSolidarityData } from './hooks/useSolidarityData';
import { ProjectCard } from './components/ProjectCard';
import { THEME } from '@/shared/lib/constants';

export function SolidarityScreen() {
  const { projects, globalStats, seasonContribs, loading } = useSolidarityData();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin" style={{ borderColor: `${THEME.green} transparent ${THEME.green} ${THEME.green}` }} />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5 pb-4">
      <div className="px-5 pt-2">
        <h1 className="text-[22px] font-black uppercase tracking-tight" style={{ color: THEME.text }}>
          Solidarité
        </h1>
        <p className="text-[11px] mt-1" style={{ color: THEME.muted }}>Tcheks Impact · Ensemble on va plus loin</p>
      </div>

      <div className="grid grid-cols-3 gap-3 px-5">
        {[
          { icon: TrendingUp, label: 'Collectés', value: `${(globalStats.totalRaised / 1000).toFixed(1)}k€`, color: THEME.accent },
          { icon: Users, label: 'Donateurs', value: String(globalStats.totalDonors), color: THEME.blue },
          { icon: Heart, label: 'Projets', value: String(globalStats.totalProjects), color: THEME.green },
        ].map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="rounded-[16px] p-3 flex flex-col items-center gap-1.5"
              style={{ background: `${stat.color}08`, border: `1px solid ${stat.color}20` }}
            >
              <Icon size={16} style={{ color: stat.color }} />
              <span className="text-[16px] font-black" style={{ color: THEME.text }}>{stat.value}</span>
              <span className="text-[8px] font-black uppercase tracking-wider" style={{ color: THEME.muted }}>{stat.label}</span>
            </div>
          );
        })}
      </div>

      <div className="px-5">
        <div className="flex items-center gap-2 mb-2">
          {seasonContribs.map((c) => (
            <div key={c.id} className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full" style={{ background: c.color }} />
              <span className="text-[8px] font-bold" style={{ color: THEME.muted }}>{c.label}: {c.amount.toLocaleString('fr-FR')}€</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-4 px-5">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}
