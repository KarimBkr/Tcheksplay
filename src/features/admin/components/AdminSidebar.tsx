import { motion } from 'framer-motion';
import {
  LayoutDashboard, Trophy, Shield, Users, Calendar, BarChart3,
  Layers, TrendingUp, Newspaper, Image, Heart, Star, X,
} from 'lucide-react';
import type { AdminSection } from '../types';
import type { ReactNode } from 'react';

interface NavItem {
  id: AdminSection;
  label: string;
  icon: ReactNode;
  group: string;
}

const NAV_SECTIONS: NavItem[] = [
  { id: 'dashboard', label: 'Tableau de bord', icon: <LayoutDashboard size={16} />, group: 'Général' },
  { id: 'editions', label: 'Éditions & Saisons', icon: <Trophy size={16} />, group: 'Général' },
  { id: 'teams', label: 'Équipes', icon: <Shield size={16} />, group: 'Compétition' },
  { id: 'registrations', label: 'Inscriptions', icon: <Users size={16} />, group: 'Compétition' },
  { id: 'matches', label: 'Matchs', icon: <Calendar size={16} />, group: 'Compétition' },
  { id: 'scores', label: 'Scores & Stats', icon: <BarChart3 size={16} />, group: 'Compétition' },
  { id: 'groups', label: 'Poules', icon: <Layers size={16} />, group: 'Compétition' },
  { id: 'bracket', label: 'Phase Finale', icon: <TrendingUp size={16} />, group: 'Compétition' },
  { id: 'news', label: 'Actualités', icon: <Newspaper size={16} />, group: 'Contenu' },
  { id: 'media', label: 'Médias', icon: <Image size={16} />, group: 'Contenu' },
  { id: 'solidarity', label: 'Projets Solidaires', icon: <Heart size={16} />, group: 'Contenu' },
  { id: 'sponsors', label: 'Sponsors', icon: <Star size={16} />, group: 'Contenu' },
];

const groups = Array.from(new Set(NAV_SECTIONS.map(s => s.group)));

interface AdminSidebarProps {
  activeSection: AdminSection;
  onSelect: (section: AdminSection) => void;
  onClose: () => void;
}

export function AdminSidebar({ activeSection, onSelect, onClose }: AdminSidebarProps) {
  return (
    <div>
      <motion.div
        key="overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[80]"
        style={{ background: 'rgba(0,0,0,0.6)' }}
        onClick={onClose}
      />
      <motion.aside
        key="sidebar"
        initial={{ x: '-100%' }}
        animate={{ x: 0 }}
        exit={{ x: '-100%' }}
        transition={{ type: 'spring', stiffness: 340, damping: 38 }}
        className="fixed top-0 left-0 bottom-0 z-[85] w-[260px] flex flex-col"
        style={{ background: '#0B221C', borderRight: '1px solid rgba(255,255,255,0.06)' }}
      >
        <div className="flex items-center justify-between px-5 pt-5 pb-3">
          <span className="text-[11px] font-black uppercase tracking-[0.2em]" style={{ color: '#B7FF1A' }}>
            Admin
          </span>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full flex items-center justify-center"
            style={{ background: 'rgba(255,255,255,0.06)' }}
            aria-label="Fermer"
          >
            <X size={13} style={{ color: '#8A938C' }} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-3 pb-6 flex flex-col gap-4">
          {groups.map(group => (
            <div key={group}>
              <p className="text-[8px] font-bold uppercase tracking-[0.2em] px-3 mb-1.5" style={{ color: '#5A6B5E' }}>
                {group}
              </p>
              {NAV_SECTIONS.filter(s => s.group === group).map(section => (
                <button
                  key={section.id}
                  onClick={() => { onSelect(section.id); onClose(); }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-[12px] text-left transition-all"
                  style={activeSection === section.id ? {
                    background: 'rgba(183,255,26,0.1)',
                    border: '1px solid rgba(183,255,26,0.15)',
                    color: '#B7FF1A',
                  } : {
                    background: 'transparent',
                    border: '1px solid transparent',
                    color: '#8A938C',
                  }}
                >
                  {section.icon}
                  <span className="text-[12px] font-semibold">{section.label}</span>
                </button>
              ))}
            </div>
          ))}
        </div>
      </motion.aside>
    </div>
  );
}
