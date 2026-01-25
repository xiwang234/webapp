'use client';

import { motion } from 'framer-motion';
import { ArrowRight, TrendingUp, AlertTriangle, CheckCircle, RotateCcw } from 'lucide-react';
import { Scenario } from '@/app/page';
import { useLanguage } from '@/contexts/LanguageContext';

type Props = {
  scenario: Scenario;
  strategy?: {
    efficiency: number;
    risk: number;
    timeline: any[];
    summary: string;
    actions: string[];
  };
  onReset: () => void;
  isHistoryView?: boolean;
};

export default function StrategyDashboard({ scenario, strategy, onReset, isHistoryView = false }: Props) {
  const { t } = useLanguage();
  
  // Mock data structure with translation keys
  const mockStrategyData = {
    investment: {
      efficiency: 78,
      risk: 42,
      timeline: [
        { phase: t('dashboard.phase.initial'), status: t('strategy.investment.timeline.initial.status'), deity: t('strategy.investment.timeline.initial.deity'), color: 'text-emerald-400' },
        { phase: t('dashboard.phase.middle'), status: t('strategy.investment.timeline.middle.status'), deity: t('strategy.investment.timeline.middle.deity'), color: 'text-orange-400' },
        { phase: t('dashboard.phase.final'), status: t('strategy.investment.timeline.final.status'), deity: t('strategy.investment.timeline.final.deity'), color: 'text-emerald-400' },
      ],
      summary: t('strategy.investment.summary'),
      actions: [
        t('strategy.investment.action1'),
        t('strategy.investment.action2'),
        t('strategy.investment.action3'),
        t('strategy.investment.action4'),
      ],
    },
    career: {
      efficiency: 65,
      risk: 58,
      timeline: [
        { phase: t('dashboard.phase.initial'), status: t('strategy.career.timeline.initial.status'), deity: t('strategy.career.timeline.initial.deity'), color: 'text-purple-400' },
        { phase: t('dashboard.phase.middle'), status: t('strategy.career.timeline.middle.status'), deity: t('strategy.career.timeline.middle.deity'), color: 'text-blue-400' },
        { phase: t('dashboard.phase.final'), status: t('strategy.career.timeline.final.status'), deity: t('strategy.career.timeline.final.deity'), color: 'text-slate-400' },
      ],
      summary: t('strategy.career.summary'),
      actions: [
        t('strategy.career.action1'),
        t('strategy.career.action2'),
        t('strategy.career.action3'),
        t('strategy.career.action4'),
      ],
    },
    negotiation: {
      efficiency: 82,
      risk: 35,
      timeline: [
        { phase: t('dashboard.phase.initial'), status: t('strategy.negotiation.timeline.initial.status'), deity: t('strategy.negotiation.timeline.initial.deity'), color: 'text-cyan-400' },
        { phase: t('dashboard.phase.middle'), status: t('strategy.negotiation.timeline.middle.status'), deity: t('strategy.negotiation.timeline.middle.deity'), color: 'text-yellow-400' },
        { phase: t('dashboard.phase.final'), status: t('strategy.negotiation.timeline.final.status'), deity: t('strategy.negotiation.timeline.final.deity'), color: 'text-green-400' },
      ],
      summary: t('strategy.negotiation.summary'),
      actions: [
        t('strategy.negotiation.action1'),
        t('strategy.negotiation.action2'),
        t('strategy.negotiation.action3'),
        t('strategy.negotiation.action4'),
      ],
    },
    timing: {
      efficiency: 71,
      risk: 48,
      timeline: [
        { phase: t('dashboard.phase.initial'), status: t('strategy.timing.timeline.initial.status'), deity: t('strategy.timing.timeline.initial.deity'), color: 'text-red-400' },
        { phase: t('dashboard.phase.middle'), status: t('strategy.timing.timeline.middle.status'), deity: t('strategy.timing.timeline.middle.deity'), color: 'text-blue-400' },
        { phase: t('dashboard.phase.final'), status: t('strategy.timing.timeline.final.status'), deity: t('strategy.timing.timeline.final.deity'), color: 'text-emerald-400' },
      ],
      summary: t('strategy.timing.summary'),
      actions: [
        t('strategy.timing.action1'),
        t('strategy.timing.action2'),
        t('strategy.timing.action3'),
        t('strategy.timing.action4'),
      ],
    },
  };

  // Use provided strategy data if available, otherwise use mock data
  const data = strategy || mockStrategyData[scenario];

  return (
    <div className="min-h-screen p-6 py-12">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto"
      >
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h1
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-5xl font-display font-bold gradient-text mb-4"
          >
            {t('dashboard.title')}
          </motion.h1>
          <motion.p
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-muted-foreground text-lg capitalize"
          >
            {t(`dashboard.subtitle.${scenario}`)}
          </motion.p>
        </div>

        {/* Strategic Scores */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="glass-card rounded-2xl p-8"
          >
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp className="w-6 h-6 text-emerald-400" />
              <h3 className="text-xl font-semibold text-foreground">{t('dashboard.efficiency')}</h3>
            </div>
            <div className="flex items-end gap-4">
              <div className="text-6xl font-bold gradient-text">{data.efficiency}</div>
              <div className="text-2xl text-muted-foreground mb-2">/100</div>
            </div>
            <div className="mt-4 h-2 bg-secondary rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${data.efficiency}%` }}
                transition={{ delay: 0.6, duration: 1 }}
                className="h-full bg-gradient-to-r from-emerald-500 to-teal-500"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="glass-card rounded-2xl p-8"
          >
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle className="w-6 h-6 text-orange-400" />
              <h3 className="text-xl font-semibold text-foreground">{t('dashboard.risk')}</h3>
            </div>
            <div className="flex items-end gap-4">
              <div className="text-6xl font-bold text-orange-400">{data.risk}</div>
              <div className="text-2xl text-muted-foreground mb-2">/100</div>
            </div>
            <div className="mt-4 h-2 bg-secondary rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${data.risk}%` }}
                transition={{ delay: 0.7, duration: 1 }}
                className="h-full bg-gradient-to-r from-orange-500 to-red-500"
              />
            </div>
          </motion.div>
        </div>

        {/* Three Transmissions Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="glass-card rounded-2xl p-8 mb-8"
        >
          <h3 className="text-2xl font-semibold text-foreground mb-6">{t('dashboard.evolution')}</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {data.timeline.map((phase, index) => (
              <div key={phase.phase} className="relative">
                {index < data.timeline.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-border -z-10" />
                )}
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-secondary/50 border-2 border-primary flex items-center justify-center mb-4">
                    <span className="text-2xl font-bold text-primary">{index + 1}</span>
                  </div>
                  <h4 className="text-lg font-semibold text-foreground mb-2">{phase.phase}</h4>
                  <p className={`text-sm font-medium mb-1 ${phase.color}`}>{phase.status}</p>
                  <p className="text-xs text-muted-foreground">{phase.deity}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Executive Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="glass-card rounded-2xl p-8 mb-8"
        >
          <h3 className="text-2xl font-semibold text-foreground mb-4">{t('dashboard.summary')}</h3>
          <p className="text-muted-foreground leading-relaxed">{data.summary}</p>
        </motion.div>

        {/* Actionable Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="glass-card rounded-2xl p-8 mb-8"
        >
          <h3 className="text-2xl font-semibold text-foreground mb-6">{t('dashboard.actions')}</h3>
          <div className="space-y-4">
            {data.actions.map((action, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9 + index * 0.1 }}
                className="flex items-start gap-4 p-4 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-all"
              >
                <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-foreground">{action}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button
            onClick={onReset}
            className="flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-secondary text-foreground font-semibold hover:bg-secondary/80 transition-all"
          >
            <RotateCcw className="w-5 h-5" />
            {isHistoryView ? t('history.backToHistory') : t('dashboard.newAnalysis')}
          </button>
          <button className="flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all glow-effect">
            {t('dashboard.export')}
            <ArrowRight className="w-5 h-5" />
          </button>
        </motion.div>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="text-center text-muted-foreground text-sm mt-12"
        >
          {t('dashboard.footer')}
        </motion.p>
      </motion.div>
    </div>
  );
}
