import {
  createRouter,
  createRootRoute,
  createRoute,
} from '@tanstack/react-router';
import { RootLayout } from './layouts/RootLayout';
import { AuthLayout } from './layouts/AuthLayout';
import { LoginScreen } from '@/features/auth/LoginScreen';
import { AccountScreen } from '@/features/account/AccountScreen';
import { HomeScreen } from '@/features/home/HomeScreen';
import { MatchesScreen } from '@/features/matches/MatchesScreen';
import { MatchDetailScreen } from '@/features/matches/MatchDetailScreen';
import { LiveMatchScreen } from '@/features/matches/LiveMatchScreen';
import { RankingsScreen } from '@/features/rankings/RankingsScreen';

const rootRoute = createRootRoute({ component: RootLayout });

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/login',
  component: LoginScreen,
});

const authLayout = createRoute({
  getParentRoute: () => rootRoute,
  id: 'auth',
  component: AuthLayout,
});

const homeRoute = createRoute({
  getParentRoute: () => authLayout,
  path: '/',
  component: HomeScreen,
});

const matchesRoute = createRoute({
  getParentRoute: () => authLayout,
  path: '/matches',
  component: MatchesScreen,
});

const matchDetailRoute = createRoute({
  getParentRoute: () => authLayout,
  path: '/matches/$matchId',
  component: MatchDetailScreen,
});

const liveMatchRoute = createRoute({
  getParentRoute: () => authLayout,
  path: '/matches/live',
  component: LiveMatchScreen,
});

const rankingsRoute = createRoute({
  getParentRoute: () => authLayout,
  path: '/rankings',
  component: RankingsScreen,
});

const playersRoute = createRoute({
  getParentRoute: () => authLayout,
  path: '/players',
  component: () => <PlaceholderPage title="Joueurs" />,
});

const playerDetailRoute = createRoute({
  getParentRoute: () => authLayout,
  path: '/players/$playerId',
  component: () => <PlaceholderPage title="Profil Joueur" />,
});

const teamsRoute = createRoute({
  getParentRoute: () => authLayout,
  path: '/teams',
  component: () => <PlaceholderPage title="Équipes" />,
});

const teamDetailRoute = createRoute({
  getParentRoute: () => authLayout,
  path: '/teams/$teamId',
  component: () => <PlaceholderPage title="Profil Équipe" />,
});

const feedRoute = createRoute({
  getParentRoute: () => authLayout,
  path: '/feed',
  component: () => <PlaceholderPage title="Actualités" />,
});

const mediaRoute = createRoute({
  getParentRoute: () => authLayout,
  path: '/media',
  component: () => <PlaceholderPage title="Médias" />,
});

const rewardsRoute = createRoute({
  getParentRoute: () => authLayout,
  path: '/rewards',
  component: () => <PlaceholderPage title="Récompenses" />,
});

const solidarityRoute = createRoute({
  getParentRoute: () => authLayout,
  path: '/solidarity',
  component: () => <PlaceholderPage title="Solidarité" />,
});

const sponsorsRoute = createRoute({
  getParentRoute: () => authLayout,
  path: '/sponsors',
  component: () => <PlaceholderPage title="Partenaires" />,
});

const venuesRoute = createRoute({
  getParentRoute: () => authLayout,
  path: '/venues',
  component: () => <PlaceholderPage title="Terrains" />,
});

const registrationRoute = createRoute({
  getParentRoute: () => authLayout,
  path: '/registration',
  component: () => <PlaceholderPage title="Inscription" />,
});

const rulesRoute = createRoute({
  getParentRoute: () => authLayout,
  path: '/rules',
  component: () => <PlaceholderPage title="Règlement" />,
});

const accountRoute = createRoute({
  getParentRoute: () => authLayout,
  path: '/account',
  component: AccountScreen,
});

const moreRoute = createRoute({
  getParentRoute: () => authLayout,
  path: '/more',
  component: () => <PlaceholderPage title="Explorer" />,
});

const adminRoute = createRoute({
  getParentRoute: () => authLayout,
  path: '/admin',
  component: () => <PlaceholderPage title="Administration" />,
});

function PlaceholderPage({ title }: { title: string }) {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center">
        <h1 className="text-2xl font-black uppercase" style={{ color: '#F2EEDC' }}>
          {title}
        </h1>
        <p className="text-sm mt-2" style={{ color: '#8A938C' }}>
          En cours de développement
        </p>
      </div>
    </div>
  );
}

const routeTree = rootRoute.addChildren([
  loginRoute,
  authLayout.addChildren([
    homeRoute,
    matchesRoute,
    liveMatchRoute,
    matchDetailRoute,
    rankingsRoute,
    playersRoute,
    playerDetailRoute,
    teamsRoute,
    teamDetailRoute,
    feedRoute,
    mediaRoute,
    rewardsRoute,
    solidarityRoute,
    sponsorsRoute,
    venuesRoute,
    registrationRoute,
    rulesRoute,
    accountRoute,
    moreRoute,
    adminRoute,
  ]),
]);

export const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
