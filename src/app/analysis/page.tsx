'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import IdentitySync from '@/components/IdentitySync';
import ScenarioSelection from '@/components/ScenarioSelection';
import EventContextInput from '@/components/EventContextInput';
import TheInquiry from '@/components/TheInquiry';
import StrategyDashboard from '@/components/StrategyDashboard';
import { useConsultationStore } from '@/store/consultationStore';
import { useAuth } from '@/contexts/AuthContext';

export type UserProfile = {
  birthDate: string;
  birthTime: string;
  timezone: string;
};

export type Scenario = 'investment' | 'career' | 'negotiation' | 'timing';

export default function AnalysisPage() {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();
  const {
    step,
    userProfile,
    selectedScenario,
    eventContext,
    setStep,
    setUserProfile,
    setSelectedScenario,
    setEventContext,
    reset,
  } = useConsultationStore();

  // Redirect to signin if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/auth/signin');
    }
  }, [isAuthenticated, isLoading, router]);

  // Show loading state while checking auth
  if (isLoading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </main>
    );
  }

  // Don't render if not authenticated
  if (!isAuthenticated) {
    return null;
  }

  const handleIdentityComplete = (profile: UserProfile) => {
    setUserProfile(profile);
    setStep(2);
  };

  const handleScenarioSelect = (scenario: Scenario) => {
    setSelectedScenario(scenario);
    setStep(3);
  };

  const handleEventContextComplete = (context: { description: string; additionalDetails?: string }) => {
    setEventContext(context);
    setStep(4);
  };

  const handleEventContextBack = () => {
    setStep(2);
  };

  const handleInquiryComplete = async (strategy: any) => {
    // Save consultation to database if user is authenticated
    if (isAuthenticated && userProfile && selectedScenario) {
      try {
        await fetch('/api/consultations', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            birthDate: userProfile.birthDate,
            birthTime: userProfile.birthTime,
            timezone: userProfile.timezone,
            scenario: selectedScenario,
            eventContext: eventContext || undefined,
            efficiencyScore: strategy.efficiency,
            riskIndex: strategy.risk,
            timelineData: strategy.timeline,
            executiveSummary: strategy.summary,
            actionableSteps: strategy.actions,
          }),
        });
      } catch (error) {
        console.error('Error saving consultation:', error);
        // Continue to dashboard even if save fails
      }
    }

    setStep(5);
  };

  const handleReset = () => {
    reset();
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900">
      {step === 1 && (
        <IdentitySync onComplete={handleIdentityComplete} />
      )}

      {step === 2 && (
        <ScenarioSelection onSelect={handleScenarioSelect} />
      )}

      {step === 3 && selectedScenario && (
        <EventContextInput
          scenario={selectedScenario}
          onComplete={handleEventContextComplete}
          onBack={handleEventContextBack}
        />
      )}

      {step === 4 && userProfile && selectedScenario && (
        <TheInquiry
          profile={userProfile}
          scenario={selectedScenario}
          eventContext={eventContext || undefined}
          onComplete={handleInquiryComplete}
        />
      )}

      {step === 5 && selectedScenario && (
        <StrategyDashboard
          scenario={selectedScenario}
          onReset={handleReset}
        />
      )}
    </main>
  );
}
