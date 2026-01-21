'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { UserProfile, Scenario } from '@/app/page';

type Props = {
  profile: UserProfile;
  scenario: Scenario;
  onComplete: () => void;
};

const analysisSteps = [
  'Initializing temporal matrix...',
  'Calculating celestial coordinates...',
  'Mapping subject-object dynamics...',
  'Analyzing three transmissions path...',
  'Evaluating strategic variables...',
  'Synthesizing decision intelligence...',
];

export default function TheInquiry({ profile, scenario, onComplete }: Props) {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

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
                The Inquiry
              </h2>
              <p className="text-muted-foreground">
                Computing strategic pathways through the temporal matrix
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
                <span>Analyzing</span>
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
                  <span className="text-muted-foreground">Birth Date:</span>
                  <span className="ml-2 text-foreground font-medium">{profile.birthDate}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Birth Time:</span>
                  <span className="ml-2 text-foreground font-medium">{profile.birthTime}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Timezone:</span>
                  <span className="ml-2 text-foreground font-medium">{profile.timezone}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Scenario:</span>
                  <span className="ml-2 text-foreground font-medium capitalize">{scenario}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <p className="text-center text-muted-foreground text-sm mt-6">
          Backend logic engine processing your unique temporal signature
        </p>
      </motion.div>
    </div>
  );
}
