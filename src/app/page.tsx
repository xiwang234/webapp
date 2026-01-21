'use client';

import { useState } from 'react';
import IdentitySync from '@/components/IdentitySync';
import ScenarioSelection from '@/components/ScenarioSelection';
import TheInquiry from '@/components/TheInquiry';
import StrategyDashboard from '@/components/StrategyDashboard';
import LanguageSwitcher from '@/components/LanguageSwitcher';

export type UserProfile = {
  birthDate: string;
  birthTime: string;
  timezone: string;
};

export type Scenario = 'investment' | 'career' | 'negotiation' | 'timing';

export default function Home() {
  const [step, setStep] = useState<number>(1);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [selectedScenario, setSelectedScenario] = useState<Scenario | null>(null);

  const handleProfileComplete = (profile: UserProfile) => {
    setUserProfile(profile);
    setStep(2);
  };

  const handleScenarioSelect = (scenario: Scenario) => {
    setSelectedScenario(scenario);
    setStep(3);
  };

  const handleAnalysisComplete = () => {
    setStep(4);
  };

  const handleReset = () => {
    setStep(1);
    setUserProfile(null);
    setSelectedScenario(null);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900">
      <LanguageSwitcher />
      {step === 1 && <IdentitySync onComplete={handleProfileComplete} />}
      {step === 2 && <ScenarioSelection onSelect={handleScenarioSelect} />}
      {step === 3 && userProfile && selectedScenario && (
        <TheInquiry 
          profile={userProfile} 
          scenario={selectedScenario} 
          onComplete={handleAnalysisComplete} 
        />
      )}
      {step === 4 && selectedScenario && (
        <StrategyDashboard 
          scenario={selectedScenario} 
          onReset={handleReset} 
        />
      )}
    </main>
  );
}
