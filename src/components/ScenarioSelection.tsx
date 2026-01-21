'use client';

import { motion } from 'framer-motion';
import { TrendingUp, Briefcase, Users, Calendar as CalendarIcon } from 'lucide-react';
import { Scenario } from '@/app/page';
import { useLanguage } from '@/contexts/LanguageContext';

type Props = {
  onSelect: (scenario: Scenario) => void;
};

export default function ScenarioSelection({ onSelect }: Props) {
  const { t } = useLanguage();
  
  const scenarios = [
    {
      id: 'investment' as Scenario,
      title: t('scenario.investment.title'),
      description: t('scenario.investment.desc'),
      icon: TrendingUp,
      color: 'from-emerald-500 to-teal-500',
    },
    {
      id: 'career' as Scenario,
      title: t('scenario.career.title'),
      description: t('scenario.career.desc'),
      icon: Briefcase,
      color: 'from-blue-500 to-cyan-500',
    },
    {
      id: 'negotiation' as Scenario,
      title: t('scenario.negotiation.title'),
      description: t('scenario.negotiation.desc'),
      icon: Users,
      color: 'from-purple-500 to-pink-500',
    },
    {
      id: 'timing' as Scenario,
      title: t('scenario.timing.title'),
      description: t('scenario.timing.desc'),
      icon: CalendarIcon,
      color: 'from-orange-500 to-red-500',
    },
  ];
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-6xl"
      >
        <div className="text-center mb-12">
          <motion.h2
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-5xl font-display font-bold gradient-text mb-4"
          >
            {t('scenario.title')}
          </motion.h2>
          <motion.p
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-muted-foreground text-lg"
          >
            {t('scenario.subtitle')}
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {scenarios.map((scenario, index) => {
            const Icon = scenario.icon;
            return (
              <motion.button
                key={scenario.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index + 0.4 }}
                whileHover={{ scale: 1.02, y: -5 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onSelect(scenario.id)}
                className="glass-card rounded-2xl p-8 text-left hover:border-primary/50 transition-all group"
              >
                <div className="flex items-start gap-4">
                  <div className={`p-4 rounded-xl bg-gradient-to-br ${scenario.color} opacity-90 group-hover:opacity-100 transition-opacity`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {scenario.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {scenario.description}
                    </p>
                  </div>
                </div>

                {/* Hover Arrow */}
                <div className="mt-6 flex items-center gap-2 text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-sm font-medium">{t('scenario.action')}</span>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </motion.button>
            );
          })}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center text-muted-foreground text-sm mt-12"
        >
          {t('scenario.footer')}
        </motion.p>
      </motion.div>
    </div>
  );
}
