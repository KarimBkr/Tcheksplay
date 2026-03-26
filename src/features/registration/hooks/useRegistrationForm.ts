import { useState, useCallback } from 'react';
import type { Step, TeamForm, PlayerForm } from '../types';
import { STEPS } from '../types';

// TODO: remplacer par Firestore (soumission du formulaire)

function createEmptyPlayer(): PlayerForm {
  return {
    id: `p_${Date.now()}_${Math.random()}`,
    firstName: '',
    lastName: '',
    age: '',
    pastClubs: '',
    bestLevel: '',
    jerseySize: '',
    shortsSize: '',
  };
}

const EMPTY_TEAM: TeamForm = { name: '', city: '', neighborhood: '', sector: '', origin: '' };

export function useRegistrationForm() {
  const [step, setStep] = useState<Step>('preregistration');
  const [team, setTeam] = useState<TeamForm>(EMPTY_TEAM);
  const [players, setPlayers] = useState<PlayerForm[]>([createEmptyPlayer()]);

  const stepIndex = STEPS.findIndex((s) => s.id === step);

  const goNext = useCallback(() => {
    if (stepIndex < STEPS.length - 1) setStep(STEPS[stepIndex + 1].id);
  }, [stepIndex]);

  const goBack = useCallback(() => {
    if (stepIndex > 0) setStep(STEPS[stepIndex - 1].id);
  }, [stepIndex]);

  const updateTeam = useCallback((field: keyof TeamForm, value: string) => {
    setTeam((prev) => ({ ...prev, [field]: value }));
  }, []);

  const updatePlayer = useCallback((id: string, field: keyof PlayerForm, value: string) => {
    setPlayers((prev) => prev.map((p) => (p.id === id ? { ...p, [field]: value } : p)));
  }, []);

  const addPlayer = useCallback(() => {
    setPlayers((prev) => [...prev, createEmptyPlayer()]);
  }, []);

  const removePlayer = useCallback((id: string) => {
    setPlayers((prev) => prev.filter((p) => p.id !== id));
  }, []);

  return {
    step, stepIndex, team, players,
    goNext, goBack, updateTeam, updatePlayer, addPlayer, removePlayer,
  };
}
