/**
 * Données admin : stratégie « vraies données »
 *
 * - Inscriptions : source Firestore collection `registrations` (temps réel). Dès qu’au moins un
 *   document existe, l’UI et valider/refuser utilisent Firestore (`patchDoc`).
 *   Si la collection est vide : repli sur le mock de démo (activable/désactivable via
 *   `VITE_ADMIN_REGISTRATIONS_MOCK_FALLBACK` dans `.env`).
 * - Tableau de bord, matchs, scores, poules, etc. : encore des constantes dans `adminMockSeed.ts`.
 *   Pour passer en prod : créer les collections Firestore (ou réutiliser `matches`, `teams`…),
 *   puis remplacer chaque `MOCK_*` par un `subscribe` / `fetchCollection` + normalisation,
 *   comme pour les inscriptions.
 */
import { useState, useEffect, useCallback } from 'react';
import { subscribe, patchDoc } from '@/firebase/firestore';
import type { PendingRegistration } from '../types';
import { ADMIN_REGISTRATIONS } from '../lib/firestorePaths';
import {
  MOCK_ADMIN_STATS,
  MOCK_BLOCKERS,
  MOCK_REGISTRATIONS,
  MOCK_ADMIN_MATCHES,
  MOCK_NOTIFICATIONS,
  MOCK_SCORE_RECORDS,
  MOCK_TEAM_STATS,
  MOCK_PLAYER_STATS,
  MOCK_VALIDATED_TEAMS,
} from '../data/adminMockSeed';

const REGISTRATIONS_MOCK_WHEN_EMPTY =
  import.meta.env.VITE_ADMIN_REGISTRATIONS_MOCK_FALLBACK !== 'false';

function normalizeRegistration(raw: PendingRegistration): PendingRegistration {
  const status = raw.status;
  const safeStatus =
    status === 'validated' || status === 'refused' || status === 'pending' ? status : 'pending';
  return {
    id: raw.id,
    teamName: String(raw.teamName ?? ''),
    city: String(raw.city ?? ''),
    players: Number(raw.players ?? 0),
    submittedAt: String(raw.submittedAt ?? ''),
    submittedTimestamp: Number(raw.submittedTimestamp ?? 0),
    captain: String(raw.captain ?? ''),
    code: String(raw.code ?? ''),
    status: safeStatus,
    logoColor: String(raw.logoColor ?? '#8A938C'),
  };
}

export function useAdminData(enabled: boolean) {
  const [loading, setLoading] = useState(true);
  const [registrations, setRegistrations] = useState<PendingRegistration[]>(MOCK_REGISTRATIONS);
  const [registrationsFromFirestore, setRegistrationsFromFirestore] = useState(false);

  useEffect(() => {
    if (!enabled) {
      setLoading(false);
      return;
    }
    setLoading(true);
    const unsub = subscribe<PendingRegistration>(ADMIN_REGISTRATIONS, (items) => {
      if (items.length === 0) {
        if (REGISTRATIONS_MOCK_WHEN_EMPTY) {
          setRegistrations(MOCK_REGISTRATIONS);
          setRegistrationsFromFirestore(false);
        } else {
          setRegistrations([]);
          setRegistrationsFromFirestore(true);
        }
      } else {
        setRegistrations(items.map(normalizeRegistration));
        setRegistrationsFromFirestore(true);
      }
      setLoading(false);
    });
    return unsub;
  }, [enabled]);

  const updateRegistrationStatus = useCallback(
    async (id: string, status: 'validated' | 'refused') => {
      if (registrationsFromFirestore) {
        await patchDoc(ADMIN_REGISTRATIONS, id, { status });
        return;
      }
      setRegistrations((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
    },
    [registrationsFromFirestore],
  );

  return {
    stats: MOCK_ADMIN_STATS,
    blockers: MOCK_BLOCKERS,
    registrations,
    matches: MOCK_ADMIN_MATCHES,
    notifications: MOCK_NOTIFICATIONS,
    scoreRecords: MOCK_SCORE_RECORDS,
    teamStats: MOCK_TEAM_STATS,
    playerStats: MOCK_PLAYER_STATS,
    validatedTeams: MOCK_VALIDATED_TEAMS,
    loading,
    updateRegistrationStatus,
  };
}
