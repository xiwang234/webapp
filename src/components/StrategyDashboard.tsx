'use client';

import { motion } from 'framer-motion';
import { ArrowRight, TrendingUp, AlertTriangle, CheckCircle, RotateCcw } from 'lucide-react';
import { Scenario } from '@/app/page';

type Props = {
  scenario: Scenario;
  onReset: () => void;
};

// Mock data - in production, this comes from your Java backend + Gemini API
const mockStrategyData = {
  investment: {
    efficiency: 78,
    risk: 42,
    timeline: [
      { phase: 'Initial', status: 'Strong Growth Signal', deity: 'Qing-Long (Capital)', color: 'text-emerald-400' },
      { phase: 'Middle', status: 'Competitive Pressure', deity: 'Bai-Hu (Force)', color: 'text-orange-400' },
      { phase: 'Final', status: 'Return to Growth', deity: 'Qing-Long (Capital)', color: 'text-emerald-400' },
    ],
    summary: 'The temporal matrix indicates a favorable window for capital deployment. Initial momentum is strong, supported by positive market alignment. Mid-phase turbulence is expected due to competitive dynamics, but structural advantages position you for recovery.',
    actions: [
      'Execute entry within 72 hours to capture peak momentum',
      'Allocate 30% reserve for mid-phase volatility hedge',
      'Set profit-taking threshold at 85% efficiency score',
      'Monitor for competitive signal reversal in weeks 8-10',
    ],
  },
  career: {
    efficiency: 65,
    risk: 58,
    timeline: [
      { phase: 'Initial', status: 'Hidden Opportunity', deity: 'Tian-Kong (Void)', color: 'text-purple-400' },
      { phase: 'Middle', status: 'Power Alignment', deity: 'Gou-Chen (Authority)', color: 'text-blue-400' },
      { phase: 'Final', status: 'Stable Foundation', deity: 'Teng-She (Structure)', color: 'text-slate-400' },
    ],
    summary: 'Career transition shows moderate strategic advantage with patience required. Initial phase reveals non-obvious opportunities requiring deeper exploration. Authority alignment emerges mid-cycle, creating negotiation leverage.',
    actions: [
      'Research 3-5 unconventional pathways before committing',
      'Schedule critical conversations during weeks 4-6',
      'Document achievements for leverage in negotiations',
      'Build strategic relationships with decision-makers',
    ],
  },
  negotiation: {
    efficiency: 82,
    risk: 35,
    timeline: [
      { phase: 'Initial', status: 'Mutual Benefit Signal', deity: 'Tai-Yin (Harmony)', color: 'text-cyan-400' },
      { phase: 'Middle', status: 'Strategic Clarity', deity: 'Tian-Hou (Nobility)', color: 'text-yellow-400' },
      { phase: 'Final', status: 'Sustainable Win-Win', deity: 'Liu-He (Alliance)', color: 'text-green-400' },
    ],
    summary: 'Negotiation matrix shows exceptional alignment for mutually beneficial outcomes. Harmony indicators suggest counterparty shares strategic interests. High probability of sustainable partnership formation.',
    actions: [
      'Lead with collaborative framing in opening statements',
      'Propose tiered value-exchange structure',
      'Schedule final agreement signing within 10-day window',
      'Build long-term relationship mechanisms into contract',
    ],
  },
  timing: {
    efficiency: 71,
    risk: 48,
    timeline: [
      { phase: 'Initial', status: 'Premature Launch Risk', deity: 'Zhu-Que (Speed)', color: 'text-red-400' },
      { phase: 'Middle', status: 'Resource Consolidation', deity: 'Gou-Chen (Control)', color: 'text-blue-400' },
      { phase: 'Final', status: 'Optimal Execution Window', deity: 'Qing-Long (Success)', color: 'text-emerald-400' },
    ],
    summary: 'Timing analysis reveals patience will yield superior outcomes. Initial impulse to act should be resisted. Mid-phase requires resource preparation and stakeholder alignment before final execution window opens.',
    actions: [
      'Delay launch by 2-3 weeks from original plan',
      'Use initial phase for stress-testing and preparation',
      'Consolidate resources and team alignment mid-cycle',
      'Execute during final window for maximum impact',
    ],
  },
};

export default function StrategyDashboard({ scenario, onReset }: Props) {
  const data = mockStrategyData[scenario];

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
            Strategy Dashboard
          </motion.h1>
          <motion.p
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-muted-foreground text-lg capitalize"
          >
            {scenario} Analysis Complete
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
              <h3 className="text-xl font-semibold text-foreground">Efficiency Score</h3>
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
              <h3 className="text-xl font-semibold text-foreground">Risk Index</h3>
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
          <h3 className="text-2xl font-semibold text-foreground mb-6">Evolution Path</h3>
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
          <h3 className="text-2xl font-semibold text-foreground mb-4">Executive Summary</h3>
          <p className="text-muted-foreground leading-relaxed">{data.summary}</p>
        </motion.div>

        {/* Actionable Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="glass-card rounded-2xl p-8 mb-8"
        >
          <h3 className="text-2xl font-semibold text-foreground mb-6">Actionable Steps</h3>
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
            New Analysis
          </button>
          <button className="flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all glow-effect">
            Export Report
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
          Strategic intelligence generated by temporal logic engine + AI synthesis
        </motion.p>
      </motion.div>
    </div>
  );
}
