import { Star } from 'lucide-react';
import { useSponsorsData } from './hooks/useSponsorsData';
import { SponsorCard } from './components/SponsorCard';
import { TIER_META, type SponsorTier } from './types';
import { THEME } from '@/shared/lib/constants';

const TIER_ORDER: SponsorTier[] = ['platinum', 'gold', 'silver', 'bronze'];

export function SponsorsScreen() {
  const { sponsors, loading } = useSponsorsData();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin" style={{ borderColor: `${THEME.yellow} transparent ${THEME.yellow} ${THEME.yellow}` }} />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5 pb-4">
      <div className="px-5 pt-2">
        <h1 className="text-[22px] font-black uppercase tracking-tight" style={{ color: THEME.text }}>
          Partenaires
        </h1>
        <p className="text-[11px] mt-1" style={{ color: THEME.muted }}>
          {sponsors.length} partenaires soutiennent Tcheksplay
        </p>
      </div>

      {TIER_ORDER.map((tier) => {
        const tierSponsors = sponsors.filter((s) => s.tier === tier);
        if (tierSponsors.length === 0) return null;
        const meta = TIER_META[tier];
        return (
          <div key={tier} className="flex flex-col gap-3">
            <div className="flex items-center gap-2 px-5">
              <Star size={12} style={{ color: meta.color }} />
              <span className="text-[10px] font-black uppercase tracking-wider" style={{ color: meta.color }}>
                {meta.emoji} {meta.label}
              </span>
              <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-md" style={{ background: `${meta.color}10`, color: meta.color }}>
                {tierSponsors.length}
              </span>
            </div>
            <div className="flex flex-col gap-3 px-5">
              {tierSponsors.map((sponsor) => (
                <SponsorCard key={sponsor.id} sponsor={sponsor} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
