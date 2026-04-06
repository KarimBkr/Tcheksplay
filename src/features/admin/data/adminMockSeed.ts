import type {
  AdminStat,
  SeasonBlocker,
  PendingRegistration,
  AdminMatch,
  AdminNotif,
  ScoreRecord,
  TeamStatRow,
  PlayerStatRow,
  PoolTeam,
} from '../types';

export const MOCK_ADMIN_STATS: AdminStat[] = [
  { id: 'matches', label: 'Matchs J.', value: '142', delta: '+8 ce mois', positive: true, color: '#B7FF1A', section: 'matches' },
  { id: 'teams', label: 'Équipes', value: '16', delta: '+2 inscrites', positive: true, color: '#7BA7D9', section: 'teams' },
  { id: 'pending', label: 'En attente', value: '3', delta: 'inscriptions', positive: false, color: '#F4C542', section: 'registrations' },
  { id: 'news', label: 'Articles', value: '24', delta: '+3 ce mois', positive: true, color: '#C9C1A2', section: 'news' },
];

export const MOCK_BLOCKERS: SeasonBlocker[] = [
  { id: 'b1', label: 'scores manquants', count: 4, severity: 'high', section: 'scores' },
  { id: 'b2', label: 'équipes incomplètes', count: 2, severity: 'medium', section: 'teams' },
  { id: 'b3', label: 'inscriptions en attente', count: 3, severity: 'medium', section: 'registrations' },
];

export const MOCK_REGISTRATIONS: PendingRegistration[] = [
  { id: 'r1', teamName: 'Pringy Warriors', city: 'Pringy', players: 13, submittedAt: 'Il y a 1h', submittedTimestamp: 1, captain: 'Omar Diallo', code: 'TCK-9XF2KP', status: 'pending', logoColor: '#D94B5B' },
  { id: 'r2', teamName: 'Argonay FC', city: 'Argonay', players: 11, submittedAt: 'Il y a 3h', submittedTimestamp: 3, captain: 'Mehdi Saad', code: 'TCK-7AH4BQ', status: 'pending', logoColor: '#7BA7D9' },
  { id: 'r3', teamName: 'Fillière United', city: 'Fillière', players: 14, submittedAt: 'Hier', submittedTimestamp: 24, captain: 'Rémi Bourgeat', code: 'TCK-2GJ8XN', status: 'pending', logoColor: '#F4C542' },
];

export const MOCK_ADMIN_MATCHES: AdminMatch[] = [
  { id: 'am1', home: 'Annecy FC', away: 'Seynod City', date: 'Auj. 19:00', dateGroup: 'today', venue: 'Marquisats', status: 'live', homeScore: 2, awayScore: 1, time: '67' },
  { id: 'am2', home: 'Veyrier Utd', away: 'Poisy Stars', date: 'Auj. 20:30', dateGroup: 'today', venue: 'Plateau Veyrier', status: 'scheduled' },
  { id: 'am5', home: 'Argonay FC', away: 'Pringy FC', date: 'Auj. 21:00', dateGroup: 'today', venue: 'Complexe Argonay', status: 'scheduled' },
  { id: 'am3', home: 'Meythet FC', away: 'Cran Giants', date: 'Hier', dateGroup: 'yesterday', venue: 'Complexe Meythet', status: 'awaiting_score', issue: 'score_missing' },
  { id: 'am6', home: 'Seynod City', away: 'Fillière Utd', date: 'Hier', dateGroup: 'yesterday', venue: 'Stade Seynod', status: 'score_pending_validation', homeScore: 1, awayScore: 2 },
  { id: 'am4', home: 'Cran Giants', away: 'Argonay FC', date: 'Avant-hier', dateGroup: 'older', venue: 'Stade Cran', status: 'awaiting_score', issue: 'score_missing' },
];

export const MOCK_NOTIFICATIONS: AdminNotif[] = [
  { id: 'n1', type: 'registration', category: 'action', text: 'Nouvelle inscription : Pringy Warriors (13 joueurs)', time: 'Il y a 1h', read: false },
  { id: 'n2', type: 'alert', category: 'action', text: 'Score manquant : Meythet FC vs Cran Giants', time: 'Il y a 2h', read: false },
  { id: 'n3', type: 'score', category: 'info', text: 'Score validé : Annecy FC 2–1 Seynod City', time: 'Il y a 3h', read: true },
  { id: 'n4', type: 'info', category: 'info', text: 'Publication : "Annecy FC inarrêtable" — 142 vues', time: 'Il y a 5h', read: true },
];

export const MOCK_SCORE_RECORDS: ScoreRecord[] = [
  { id: 'sr1', journee: 18, phase: 'groupes', home: 'Annecy FC', away: 'Seynod City', homeScore: 2, awayScore: 1, date: 'Auj. 19:00', status: 'validated', classementUpdated: true, scorers: ['Bersot 23\'', 'Mebrouk 67\''] },
  { id: 'sr2', journee: 18, phase: 'groupes', home: 'Seynod City', away: 'Fillière Utd', homeScore: 1, awayScore: 2, date: 'Hier', status: 'awaiting', classementUpdated: false, scorers: [] },
  { id: 'sr3', journee: 18, phase: 'groupes', home: 'Meythet FC', away: 'Cran Giants', homeScore: 0, awayScore: 0, date: 'Hier', status: 'awaiting', classementUpdated: false, scorers: [] },
  { id: 'sr4', journee: 17, phase: 'groupes', home: 'Veyrier Utd', away: 'Annecy FC', homeScore: 0, awayScore: 3, date: 'Il y a 4j', status: 'corrected', classementUpdated: true, scorers: ['Garnier 12\'', 'Garnier 45\'', 'Bersot 78\''] },
  { id: 'sr5', journee: 17, phase: 'groupes', home: 'Cran Giants', away: 'Argonay FC', homeScore: 0, awayScore: 0, date: 'Il y a 4j', status: 'awaiting', classementUpdated: false, scorers: [] },
  { id: 'sr6', journee: 17, phase: 'groupes', home: 'Pringy FC', away: 'Poisy Stars', homeScore: 1, awayScore: 1, date: 'Il y a 5j', status: 'validated', classementUpdated: true, scorers: ['Ouedraogo 55\''] },
  { id: 'sr7', journee: 16, phase: 'groupes', home: 'Fillière Utd', away: 'Meythet FC', homeScore: 2, awayScore: 0, date: 'Il y a 8j', status: 'validated', classementUpdated: true, scorers: ['Bourgeat 11\'', 'Bourgeat 34\''] },
  { id: 'sr8', journee: 16, phase: 'groupes', home: 'Poisy Stars', away: 'Veyrier Utd', homeScore: 3, awayScore: 2, date: 'Il y a 8j', status: 'validated', classementUpdated: true, scorers: ['Lacroix 5\'', 'Lacroix 22\'', 'Samba 88\''] },
];

export const MOCK_TEAM_STATS: TeamStatRow[] = [
  { id: 'ts1', rank: 1, team: 'Annecy FC', color: '#B7FF1A', played: 17, wins: 13, draws: 2, losses: 2, gf: 41, ga: 14, gd: 27, points: 41 },
  { id: 'ts2', rank: 2, team: 'Fillière Utd', color: '#F4C542', played: 17, wins: 11, draws: 3, losses: 3, gf: 33, ga: 20, gd: 13, points: 36 },
  { id: 'ts3', rank: 3, team: 'Poisy Stars', color: '#7BA7D9', played: 17, wins: 9, draws: 4, losses: 4, gf: 28, ga: 22, gd: 6, points: 31 },
  { id: 'ts4', rank: 4, team: 'Veyrier Utd', color: '#C9C1A2', played: 17, wins: 8, draws: 3, losses: 6, gf: 25, ga: 24, gd: 1, points: 27 },
  { id: 'ts5', rank: 5, team: 'Seynod City', color: '#D94B5B', played: 17, wins: 7, draws: 4, losses: 6, gf: 26, ga: 27, gd: -1, points: 25 },
  { id: 'ts6', rank: 6, team: 'Meythet FC', color: '#8A938C', played: 17, wins: 4, draws: 3, losses: 10, gf: 18, ga: 32, gd: -14, points: 15 },
];

export const MOCK_PLAYER_STATS: PlayerStatRow[] = [
  { id: 'ps1', rank: 1, name: 'L. Garnier', team: 'Annecy FC', teamColor: '#B7FF1A', goals: 18, assists: 7, cleanSheets: 0 },
  { id: 'ps2', rank: 2, name: 'Y. Bourgeat', team: 'Fillière Utd', teamColor: '#F4C542', goals: 14, assists: 4, cleanSheets: 0 },
  { id: 'ps3', rank: 3, name: 'K. Lacroix', team: 'Poisy Stars', teamColor: '#7BA7D9', goals: 12, assists: 9, cleanSheets: 0 },
  { id: 'ps4', rank: 4, name: 'T. Mebrouk', team: 'Annecy FC', teamColor: '#B7FF1A', goals: 10, assists: 5, cleanSheets: 0 },
  { id: 'ps5', rank: 5, name: 'D. Ouedraogo', team: 'Pringy FC', teamColor: '#D94B5B', goals: 9, assists: 3, cleanSheets: 0 },
  { id: 'ps6', rank: 6, name: 'R. Samba', team: 'Poisy Stars', teamColor: '#7BA7D9', goals: 8, assists: 6, cleanSheets: 0 },
];

export const MOCK_VALIDATED_TEAMS: PoolTeam[] = [
  { id: 'vt1', name: 'Annecy FC', city: 'Annecy', color: '#B7FF1A', seed: 1 },
  { id: 'vt2', name: 'Fillière Utd', city: 'Fillière', color: '#F4C542', seed: 2 },
  { id: 'vt3', name: 'Poisy Stars', city: 'Poisy', color: '#7BA7D9', seed: 3 },
  { id: 'vt4', name: 'Veyrier Utd', city: 'Veyrier', color: '#C9C1A2', seed: 4 },
  { id: 'vt5', name: 'Seynod City', city: 'Seynod', color: '#D94B5B', seed: 5 },
  { id: 'vt6', name: 'Meythet FC', city: 'Meythet', color: '#8A938C', seed: 6 },
  { id: 'vt7', name: 'Cran Giants', city: 'Cran-Gevrier', color: '#9B7CDB', seed: 7 },
  { id: 'vt8', name: 'Argonay FC', city: 'Argonay', color: '#E8845A', seed: 8 },
  { id: 'vt9', name: 'Pringy Warriors', city: 'Pringy', color: '#5ABFE8', seed: 9 },
  { id: 'vt10', name: 'Epagny Sport', city: 'Epagny', color: '#E85A9B', seed: 10 },
  { id: 'vt11', name: 'Semnoz FC', city: 'Semnoz', color: '#5AE89B', seed: 11 },
  { id: 'vt12', name: 'Nâves-Parmelan', city: 'Nâves', color: '#E8C55A', seed: 12 },
  { id: 'vt13', name: 'Rumilly United', city: 'Rumilly', color: '#845AE8', seed: 13 },
  { id: 'vt14', name: 'Thônes Élite', city: 'Thônes', color: '#5AE8D4', seed: 14 },
  { id: 'vt15', name: 'Faverges SC', city: 'Faverges', color: '#E87C5A', seed: 15 },
  { id: 'vt16', name: 'Duingt FC', city: 'Duingt', color: '#B05AE8', seed: 16 },
];
