'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, ArrowRight, ArrowLeft } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Scenario } from '@/app/page';
import { EventContext } from '@/store/consultationStore';

type Props = {
  scenario: Scenario;
  onComplete: (context: EventContext) => void;
  onBack: () => void;
};

export default function EventContextInput({ scenario, onComplete, onBack }: Props) {
  const { t } = useLanguage();
  const [description, setDescription] = useState('');
  const [additionalDetails, setAdditionalDetails] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (description.trim()) {
      onComplete({
        description: description.trim(),
        additionalDetails: additionalDetails.trim() || undefined,
      });
    }
  };

  const placeholderText = {
    investment: t('eventContext.placeholder.investment'),
    career: t('eventContext.placeholder.career'),
    negotiation: t('eventContext.placeholder.negotiation'),
    timing: t('eventContext.placeholder.timing'),
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-3xl"
      >
        <div className="text-center mb-8">
          <motion.h2
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-5xl font-display font-bold gradient-text mb-4"
          >
            {t('eventContext.title')}
          </motion.h2>
          <motion.p
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-muted-foreground text-lg"
          >
            {t(`eventContext.subtitle.${scenario}`)}
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="glass-card rounded-2xl p-8 md:p-12"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="flex items-center gap-2 text-sm font-medium mb-3 text-foreground">
                <FileText className="w-4 h-4 text-primary" />
                {t('eventContext.description.label')}
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder={placeholderText[scenario]}
                className="w-full bg-secondary/50 border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all min-h-[150px] resize-y"
                required
              />
              <p className="mt-2 text-xs text-muted-foreground">
                {t('eventContext.description.hint')}
              </p>
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-medium mb-3 text-foreground">
                <FileText className="w-4 h-4 text-primary" />
                {t('eventContext.additional.label')}
                <span className="text-muted-foreground text-xs">({t('common.optional')})</span>
              </label>
              <textarea
                value={additionalDetails}
                onChange={(e) => setAdditionalDetails(e.target.value)}
                placeholder={t('eventContext.additional.placeholder')}
                className="w-full bg-secondary/50 border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all min-h-[100px] resize-y"
              />
            </div>

            <div className="flex gap-4">
              <button
                type="button"
                onClick={onBack}
                className="flex-1 bg-secondary text-foreground font-semibold py-4 rounded-lg hover:bg-secondary/80 transition-all flex items-center justify-center gap-2"
              >
                <ArrowLeft className="w-5 h-5" />
                {t('common.back')}
              </button>
              <button
                type="submit"
                disabled={!description.trim()}
                className="flex-1 bg-primary text-primary-foreground font-semibold py-4 rounded-lg hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {t('common.continue')}
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </form>
        </motion.div>

        {/* Progress indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-8 flex justify-center gap-2"
        >
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className={`h-2 rounded-full transition-all ${
                i === 3 ? 'w-8 bg-primary' : 'w-2 bg-secondary'
              }`}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}
