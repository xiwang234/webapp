'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import StrategyDashboard from '@/components/StrategyDashboard';
import { Scenario } from '@/app/page';

type Consultation = {
  id: string;
  birthDate: string;
  birthTime: string;
  timezone: string;
  scenario: Scenario;
  eventContext?: {
    description: string;
    additionalDetails?: string;
  };
  efficiencyScore: number;
  riskIndex: number;
  timelineData: any;
  executiveSummary: string;
  actionableSteps: any[];
  createdAt: string;
};

export default function ConsultationViewPage() {
  const { t } = useLanguage();
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const router = useRouter();
  const params = useParams();
  const [consultation, setConsultation] = useState<Consultation | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/auth/signin');
    }
  }, [isAuthenticated, authLoading, router]);

  useEffect(() => {
    if (isAuthenticated && params.id) {
      loadConsultation();
    }
  }, [isAuthenticated, params.id]);

  const loadConsultation = async () => {
    setIsLoading(true);
    try {
      // Try sessionStorage first (faster)
      const cached = sessionStorage.getItem('viewConsultation');
      if (cached) {
        const parsed = JSON.parse(cached);
        if (parsed.id === params.id) {
          setConsultation(parsed);
          setIsLoading(false);
          return;
        }
      }

      // Fallback to API
      const response = await fetch(`/api/consultations/${params.id}`);
      const data = await response.json();

      if (response.ok) {
        setConsultation(data.consultation);
      } else {
        router.push('/history');
      }
    } catch (error) {
      console.error('Error loading consultation:', error);
      router.push('/history');
    } finally {
      setIsLoading(false);
    }
  };

  if (authLoading || isLoading || !consultation) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  // Transform consultation data to match StrategyDashboard props
  const strategyData = {
    efficiency: consultation.efficiencyScore,
    risk: consultation.riskIndex,
    timeline: consultation.timelineData,
    summary: consultation.executiveSummary,
    actions: consultation.actionableSteps,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900">
      {/* Back Button */}
      <div className="fixed top-6 left-6 z-50">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => router.push('/history')}
          className="flex items-center gap-2 px-4 py-2 bg-secondary/80 backdrop-blur-sm border border-border rounded-lg text-foreground hover:bg-secondary transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          {t('history.backToHistory')}
        </motion.button>
      </div>

      {/* Event Context Display (if exists) */}
      {consultation.eventContext && (
        <div className="pt-24 px-6 max-w-4xl mx-auto mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card rounded-xl p-6"
          >
            <h3 className="text-lg font-semibold text-foreground mb-3">
              {t('eventContext.title')}
            </h3>
            <p className="text-foreground mb-2">
              {consultation.eventContext.description}
            </p>
            {consultation.eventContext.additionalDetails && (
              <p className="text-sm text-muted-foreground">
                {consultation.eventContext.additionalDetails}
              </p>
            )}
          </motion.div>
        </div>
      )}

      {/* Reuse StrategyDashboard component */}
      <StrategyDashboard
        scenario={consultation.scenario}
        strategy={strategyData}
        onReset={() => router.push('/history')}
        isHistoryView={true}
      />
    </div>
  );
}
