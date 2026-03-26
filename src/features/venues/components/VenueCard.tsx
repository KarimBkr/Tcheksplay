import { MapPin, Users, Car, Navigation } from 'lucide-react';
import { motion } from 'framer-motion';
import type { VenueInfo, SurfaceType, AvailabilityStatus } from '../types';
import { THEME } from '@/shared/lib/constants';

const SURFACE_META: Record<SurfaceType, { label: string; color: string; icon: string }> = {
  synthetic: { label: 'Synthétique', color: THEME.accent, icon: '🟩' },
  natural: { label: 'Naturelle', color: THEME.green, icon: '🌿' },
  futsal: { label: 'Futsal', color: THEME.blue, icon: '🔵' },
};

const AVAILABILITY_META: Record<AvailabilityStatus, { label: string; color: string; dot: boolean }> = {
  available: { label: 'Disponible', color: THEME.accent, dot: true },
  occupied: { label: 'Match en cours', color: THEME.red, dot: true },
  maintenance: { label: 'Maintenance', color: THEME.gold, dot: false },
};

interface VenueCardProps {
  venue: VenueInfo;
}

export function VenueCard({ venue }: VenueCardProps) {
  const surface = SURFACE_META[venue.surface];
  const avail = AVAILABILITY_META[venue.availability];

  return (
    <motion.div
      whileTap={{ scale: 0.98 }}
      className="rounded-[22px] overflow-hidden"
      style={{ background: THEME.cardBg, border: '1px solid rgba(255,255,255,0.06)' }}
    >
      <div className="relative h-[130px] overflow-hidden">
        <img src={venue.img} alt={venue.name} className="w-full h-full object-cover" style={{ filter: 'brightness(0.4)' }} />
        <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${THEME.bg} 5%, transparent 60%)` }} />
        <div className="absolute top-3 left-3 flex gap-1.5">
          <span className="text-[8px] font-black uppercase px-2 py-0.5 rounded-md" style={{ background: `${surface.color}15`, color: surface.color, border: `1px solid ${surface.color}30` }}>
            {surface.icon} {surface.label}
          </span>
          <span className="flex items-center gap-1 text-[8px] font-black uppercase px-2 py-0.5 rounded-md" style={{ background: `${avail.color}10`, color: avail.color, border: `1px solid ${avail.color}25` }}>
            {avail.dot && <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: avail.color }} />}
            {avail.label}
          </span>
        </div>
      </div>

      <div className="px-4 py-4 -mt-6 relative">
        <h3 className="text-[14px] font-black" style={{ color: THEME.text }}>{venue.name}</h3>
        <div className="flex items-center gap-1.5 mt-1">
          <MapPin size={10} style={{ color: THEME.muted }} />
          <span className="text-[10px]" style={{ color: THEME.muted }}>{venue.address} · {venue.city}</span>
        </div>

        <div className="flex items-center gap-4 mt-3">
          <div className="flex items-center gap-1.5">
            <Users size={10} style={{ color: THEME.muted }} />
            <span className="text-[9px] font-bold" style={{ color: THEME.muted }}>{venue.capacity} places</span>
          </div>
          {venue.parking && (
            <div className="flex items-center gap-1.5">
              <Car size={10} style={{ color: THEME.muted }} />
              <span className="text-[9px] font-bold" style={{ color: THEME.muted }}>Parking</span>
            </div>
          )}
          {venue.lighting && (
            <span className="text-[9px] font-bold" style={{ color: THEME.muted }}>💡 Éclairage</span>
          )}
        </div>

        {venue.nextMatch && (
          <div className="mt-3 px-3 py-2 rounded-[12px]" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}>
            <span className="text-[9px] font-bold" style={{ color: THEME.gold }}>{venue.nextMatch}</span>
          </div>
        )}

        {venue.transport.length > 0 && (
          <div className="flex items-center gap-3 mt-2">
            {venue.transport.map((t) => (
              <div key={t.label} className="flex items-center gap-1">
                <Navigation size={8} style={{ color: THEME.muted }} />
                <span className="text-[8px]" style={{ color: THEME.muted }}>{t.label} · {t.detail}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
