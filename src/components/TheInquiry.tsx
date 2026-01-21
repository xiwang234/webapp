'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { UserProfile, Scenario } from '@/app/page';
import { useLanguage } from '@/contexts/LanguageContext';

type Props = {
  profile: UserProfile;
  scenario: Scenario;
  onComplete: () => void;
};

export default function TheInquiry({ profile, scenario, onComplete }: Props) {
  const { t } = useLanguage();
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  const analysisSteps = [
    t('inquiry.step1'),
    t('inquiry.step2'),
    t('inquiry.step3'),
    t('inquiry.step4'),
    t('inquiry.step5'),
    t('inquiry.step6'),
  ];

  useEffect(() => {
    // Simulate analysis progress
    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < analysisSteps.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 1200);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev < 100) {
          return prev + 2;
        }
        return prev;
      });
    }, 100);

    const timeout = setTimeout(() => {
      onComplete();
    }, 7500);

    return () => {
      clearInterval(stepInterval);
      clearInterval(progressInterval);
      clearTimeout(timeout);
    };
  }, [onComplete]);

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="w-full max-w-3xl"
      >
        <div className="glass-card rounded-2xl p-12 relative overflow-hidden">
          {/* Animated Background */}
          <div className="absolute inset-0 opacity-5">
            <motion.div
              animate={{
                backgroundPosition: ['0% 0%', '100% 100%'],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                repeatType: 'reverse',
              }}
              className="w-full h-full"
              style={{
                backgroundImage: 'linear-gradient(45deg, #facc15 25%, transparent 25%, transparent 75%, #facc15 75%, #facc15), linear-gradient(45deg, #facc15 25%, transparent 25%, transparent 75%, #facc15 75%, #facc15)',
                backgroundSize: '40px 40px',
                backgroundPosition: '0 0, 20px 20px',
              }}
            />
          </div>

          <div className="relative z-10">
            {/* Header */}
            <div className="text-center mb-12">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                className="inline-block mb-6"
              >
                <Loader2 className="w-16 h-16 text-primary" />
              </motion.div>
              <h2 className="text-3xl font-display font-bold text-foreground mb-3">
                {t('inquiry.title')}
              </h2>
              <p className="text-muted-foreground">
                {t('inquiry.subtitle')}
              </p>
            </div>

            {/* Progress Bar */}
            <div className="mb-8">
              <div className="h-2 bg-secondary rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-primary via-yellow-300 to-primary"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                <span>{t('inquiry.analyzing')}</span>
                <span>{progress}%</span>
              </div>
            </div>

            {/* Analysis Steps */}
            <div className="space-y-3 min-h-[240px]">
              <AnimatePresence mode="popLayout">
                {analysisSteps.slice(0, currentStep + 1).map((step, index) => (
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.4 }}
                    className="flex items-center gap-3 font-mono text-sm"
                  >
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    <span className={index === currentStep ? 'text-primary' : 'text-muted-foreground'}>
                      {step}
                    </span>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Metadata Display */}
            <div className="mt-12 pt-8 border-t border-border">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">{t('inquiry.birthDate')}</span>
                  <span className="ml-2 text-foreground font-medium">{profile.birthDate}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">{t('inquiry.birthTime')}</span>
                  <span className="ml-2 text-foreground font-medium">{profile.birthTime}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">{t('inquiry.timezone')}</span>
                  <span className="ml-2 text-foreground font-medium">{profile.timezone}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">{t('inquiry.scenario')}</span>
                  <span className="ml-2 text-foreground font-medium capitalize">{t(`inquiry.scenario.${scenario}`)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <p className="text-center text-muted-foreground text-sm mt-6">
          {t('inquiry.footer')}
        </p>
      </motion.div>
    </div>
  );
}
