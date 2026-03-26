import { useAuth } from '@/features/auth/AuthContext';
import { useHomeData } from './hooks/useHomeData';
import { HomeHeader } from './components/HomeHeader';
import { LiveHeroBlock } from './components/LiveHeroBlock';
import { NextMatchCard } from './components/NextMatchCard';
import { MatchList } from './components/MatchList';
import { StandingsPreview } from './components/StandingsPreview';
import { TopScorerCard } from './components/TopScorerCard';
import { SolidarityBanner } from './components/SolidarityBanner';

export function HomeScreen() {
  const { profile } = useAuth();
  const { matches, standings, topScorer, liveMatch, nextMatch, loading } =
    useHomeData();

  if (loading) {
    return (
      <div
        className="flex items-center justify-center min-h-[60vh]"
        style={{ background: '#0B221C' }}
      >
        <div
          className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin"
          style={{ borderColor: '#2E8F57', borderTopColor: 'transparent' }}
        />
      </div>
    );
  }

  return (
    <div
      className="min-h-screen w-full pb-8"
      style={{ background: '#0B221C' }}
    >
      <HomeHeader user={profile} />

      <div className="flex flex-col gap-6 mt-2">
        {liveMatch && <LiveHeroBlock match={liveMatch} />}
        {nextMatch && <NextMatchCard match={nextMatch} />}
        <MatchList matches={matches} />
        <StandingsPreview standings={standings} />
        <TopScorerCard player={topScorer} />
        <SolidarityBanner />
      </div>
    </div>
  );
}
