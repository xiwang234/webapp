import { create } from 'zustand';

export type UserProfile = {
  birthDate: string;
  birthTime: string;
  timezone: string;
};

export type Scenario = 'investment' | 'career' | 'negotiation' | 'timing';

export type EventContext = {
  description: string;
  additionalDetails?: string;
};

export type ConsultationState = {
  // Current consultation flow
  step: number;
  userProfile: UserProfile | null;
  selectedScenario: Scenario | null;
  eventContext: EventContext | null;

  // Saved profile (from database)
  savedProfile: UserProfile | null;
  useSavedProfile: boolean;

  // Actions
  setStep: (step: number) => void;
  setUserProfile: (profile: UserProfile | null) => void;
  setSelectedScenario: (scenario: Scenario | null) => void;
  setEventContext: (context: EventContext | null) => void;
  setSavedProfile: (profile: UserProfile | null) => void;
  setUseSavedProfile: (use: boolean) => void;
  reset: () => void;
};

export const useConsultationStore = create<ConsultationState>((set) => ({
  step: 1,
  userProfile: null,
  selectedScenario: null,
  eventContext: null,
  savedProfile: null,
  useSavedProfile: false,

  setStep: (step) => set({ step }),
  setUserProfile: (userProfile) => set({ userProfile }),
  setSelectedScenario: (selectedScenario) => set({ selectedScenario }),
  setEventContext: (eventContext) => set({ eventContext }),
  setSavedProfile: (savedProfile) => set({ savedProfile }),
  setUseSavedProfile: (useSavedProfile) => set({ useSavedProfile }),
  reset: () => set({
    step: 1,
    userProfile: null,
    selectedScenario: null,
    eventContext: null,
    useSavedProfile: false,
  }),
}));
