import { MapPin, Users, CheckCircle, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import type { SolidProject } from '../types';
import { THEME } from '@/shared/lib/constants';

const STATUS_CONFIG = {
  active: { label: 'En cours', color: THEME.accent },
  completed: { label: 'Terminé', color: THEME.green },
  upcoming: { label: 'À venir', color: THEME.blue },
} as const;

interface ProjectCardProps {
  project: SolidProject;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const pct = Math.min(Math.round((project.raised / project.goal) * 100), 100);
  const status = STATUS_CONFIG[project.status];

  return (
    <motion.div
      whileTap={{ scale: 0.98 }}
      className="rounded-[22px] overflow-hidden"
      style={{ background: THEME.cardBg, border: '1px solid rgba(255,255,255,0.06)' }}
    >
      <div className="relative h-[140px] overflow-hidden">
        <img src={project.img} alt={project.title} className="w-full h-full object-cover" style={{ filter: 'brightness(0.4)' }} />
        <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${THEME.bg} 5%, transparent 60%)` }} />
        <div className="absolute top-3 left-3 flex items-center gap-1.5">
          <span className="text-[8px] font-black uppercase px-2 py-0.5 rounded-md" style={{ background: `${status.color}15`, color: status.color, border: `1px solid ${status.color}30` }}>
            {status.label}
          </span>
          <span className="text-[8px] font-bold px-2 py-0.5 rounded-md" style={{ background: 'rgba(0,0,0,0.4)', color: THEME.text }}>
            {project.categoryEmoji} {project.category}
          </span>
        </div>
      </div>

      <div className="px-4 py-4 -mt-8 relative">
        <h3 className="text-[14px] font-black leading-snug" style={{ color: THEME.text }}>{project.title}</h3>
        <p className="text-[10px] mt-1" style={{ color: THEME.muted }}>{project.subtitle}</p>

        <div className="flex items-center gap-1.5 mt-2">
          <MapPin size={10} style={{ color: THEME.muted }} />
          <span className="text-[9px]" style={{ color: THEME.muted }}>{project.location}</span>
        </div>

        <div className="mt-3">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] font-black" style={{ color: project.color }}>{pct}%</span>
            <span className="text-[9px]" style={{ color: THEME.muted }}>{project.raised.toLocaleString('fr-FR')}€ / {project.goal.toLocaleString('fr-FR')}€</span>
          </div>
          <div className="h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
            <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: project.color }} />
          </div>
        </div>

        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-1.5">
            <Users size={10} style={{ color: THEME.muted }} />
            <span className="text-[9px] font-bold" style={{ color: THEME.muted }}>{project.donors} donateurs</span>
          </div>
          {project.status === 'active' && (
            <button
              className="flex items-center gap-1 px-3 py-1.5 rounded-[10px] text-[9px] font-black uppercase"
              style={{ background: `${project.color}15`, color: project.color, border: `1px solid ${project.color}30` }}
            >
              Contribuer <ArrowUpRight size={10} />
            </button>
          )}
          {project.status === 'completed' && (
            <div className="flex items-center gap-1">
              <CheckCircle size={10} style={{ color: THEME.green }} />
              <span className="text-[9px] font-bold" style={{ color: THEME.green }}>Complété</span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
