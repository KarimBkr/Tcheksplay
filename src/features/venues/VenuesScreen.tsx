import { MapPin } from 'lucide-react';
import { useVenuesData } from './hooks/useVenuesData';
import { VenueCard } from './components/VenueCard';
import { THEME } from '@/shared/lib/constants';

export function VenuesScreen() {
  const { venues, loading } = useVenuesData();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin" style={{ borderColor: `${THEME.green} transparent ${THEME.green} ${THEME.green}` }} />
      </div>
    );
  }

  const featured = venues.find((v) => v.featured);
  const others = venues.filter((v) => !v.featured);

  return (
    <div className="flex flex-col gap-5 pb-4">
      <div className="px-5 pt-2">
        <h1 className="text-[22px] font-black uppercase tracking-tight" style={{ color: THEME.text }}>
          Terrains
        </h1>
        <p className="text-[11px] mt-1" style={{ color: THEME.muted }}>
          {venues.length} terrains · Summer Cup S3
        </p>
      </div>

      {featured && (
        <div className="px-5">
          <span className="text-[9px] font-black uppercase tracking-wider mb-2 block" style={{ color: THEME.accent }}>
            Terrain principal
          </span>
          <VenueCard venue={featured} />
        </div>
      )}

      <div className="flex flex-col gap-3 px-5">
        {others.length > 0 && (
          <div className="flex items-center gap-2">
            <MapPin size={12} style={{ color: THEME.muted }} />
            <span className="text-[9px] font-black uppercase tracking-wider" style={{ color: THEME.muted }}>
              Autres terrains
            </span>
          </div>
        )}
        {others.map((venue) => (
          <VenueCard key={venue.id} venue={venue} />
        ))}
      </div>
    </div>
  );
}
