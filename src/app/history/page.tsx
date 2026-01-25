'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  Calendar,
  Clock,
  TrendingUp,
  Briefcase,
  MessageSquare,
  Timer,
  Trash2,
  Eye,
  Loader2,
  Filter,
  ChevronDown,
  AlertCircle
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { format } from 'date-fns';
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

const scenarioIcons = {
  investment: TrendingUp,
  career: Briefcase,
  negotiation: MessageSquare,
  timing: Timer,
};

export default function HistoryPage() {
  const { t } = useLanguage();
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const router = useRouter();

  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedScenario, setSelectedScenario] = useState<Scenario | 'all'>('all');
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/auth/signin');
    }
  }, [isAuthenticated, authLoading, router]);

  useEffect(() => {
    if (isAuthenticated) {
      loadConsultations();
    }
  }, [isAuthenticated, selectedScenario]);

  const loadConsultations = async () => {
    setIsLoading(true);
    try {
      const url = selectedScenario === 'all'
        ? '/api/consultations'
        : `/api/consultations?scenario=${selectedScenario}`;

      const response = await fetch(url);
      const data = await response.json();

      if (response.ok) {
        setConsultations(data.consultations);
      }
    } catch (error) {
      console.error('Error loading consultations:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm(t('history.confirmDelete'))) {
      return;
    }

    setDeletingId(id);
    try {
      const response = await fetch(`/api/consultations/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setConsultations(consultations.filter(c => c.id !== id));
      }
    } catch (error) {
      console.error('Error deleting consultation:', error);
    } finally {
      setDeletingId(null);
    }
  };

  const handleView = (consultation: Consultation) => {
    // Store consultation in sessionStorage and navigate to view
    sessionStorage.setItem('viewConsultation', JSON.stringify(consultation));
    router.push(`/history/${consultation.id}`);
  };

  if (authLoading || !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-display font-bold gradient-text mb-4">
            {t('history.title')}
          </h1>
          <p className="text-muted-foreground text-lg">
            {t('history.subtitle')}
          </p>
        </motion.div>

        {/* Filter Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="mb-6 flex items-center gap-4"
        >
          <div className="relative">
            <button
              onClick={() => setShowFilterMenu(!showFilterMenu)}
              className="flex items-center gap-2 px-4 py-2 bg-secondary/50 border border-border rounded-lg text-foreground hover:bg-secondary/70 transition-all"
            >
              <Filter className="w-4 h-4" />
              {t(`history.filter.${selectedScenario}`)}
              <ChevronDown className="w-4 h-4" />
            </button>

            {showFilterMenu && (
              <div className="absolute top-full mt-2 left-0 w-48 bg-card border border-border rounded-lg shadow-xl z-10">
                {['all', 'investment', 'career', 'negotiation', 'timing'].map((scenario) => (
                  <button
                    key={scenario}
                    onClick={() => {
                      setSelectedScenario(scenario as Scenario | 'all');
                      setShowFilterMenu(false);
                    }}
                    className={`w-full text-left px-4 py-3 hover:bg-secondary/50 transition-all first:rounded-t-lg last:rounded-b-lg ${
                      selectedScenario === scenario ? 'bg-secondary/30 text-primary' : 'text-foreground'
                    }`}
                  >
                    {t(`history.filter.${scenario}`)}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="text-sm text-muted-foreground">
            {consultations.length} {t('history.results')}
          </div>
        </motion.div>

        {/* Consultations List */}
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : consultations.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="glass-card rounded-2xl p-12 text-center"
          >
            <AlertCircle className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">
              {t('history.empty.title')}
            </h3>
            <p className="text-muted-foreground mb-6">
              {t('history.empty.description')}
            </p>
            <button
              onClick={() => router.push('/')}
              className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-all"
            >
              {t('history.empty.cta')}
            </button>
          </motion.div>
        ) : (
          <div className="space-y-4">
            {consultations.map((consultation, index) => {
              const Icon = scenarioIcons[consultation.scenario];

              return (
                <motion.div
                  key={consultation.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="glass-card rounded-xl p-6 hover:border-primary/50 transition-all"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      {/* Header */}
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <Icon className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-foreground">
                            {t(`scenarios.${consultation.scenario}.title`)}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {format(new Date(consultation.createdAt), 'PPP p')}
                          </p>
                        </div>
                      </div>

                      {/* Event Context Preview */}
                      {consultation.eventContext && (
                        <div className="mb-3 p-3 bg-secondary/30 rounded-lg">
                          <p className="text-sm text-foreground line-clamp-2">
                            {consultation.eventContext.description}
                          </p>
                        </div>
                      )}

                      {/* Metrics */}
                      <div className="flex items-center gap-6 mb-3">
                        <div className="flex items-center gap-2">
                          <div className="text-xs text-muted-foreground">
                            {t('dashboard.efficiency')}
                          </div>
                          <div className="text-lg font-bold text-primary">
                            {consultation.efficiencyScore}%
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="text-xs text-muted-foreground">
                            {t('dashboard.risk')}
                          </div>
                          <div className="text-lg font-bold text-orange-400">
                            {consultation.riskIndex}%
                          </div>
                        </div>
                      </div>

                      {/* Birth Info */}
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {consultation.birthDate}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {consultation.birthTime}
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleView(consultation)}
                        className="p-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-all"
                        title={t('history.view')}
                      >
                        <Eye className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(consultation.id)}
                        disabled={deletingId === consultation.id}
                        className="p-2 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20 transition-all disabled:opacity-50"
                        title={t('history.delete')}
                      >
                        {deletingId === consultation.id ? (
                          <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                          <Trash2 className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
