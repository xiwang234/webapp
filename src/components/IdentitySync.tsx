'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Globe } from 'lucide-react';
import { UserProfile } from '@/app/page';
import { useLanguage } from '@/contexts/LanguageContext';

type Props = {
  onComplete: (profile: UserProfile) => void;
};

export default function IdentitySync({ onComplete }: Props) {
  const { t } = useLanguage();
  const [birthDate, setBirthDate] = useState('');
  const [birthTime, setBirthTime] = useState('');
  const [timezone, setTimezone] = useState('UTC+0');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (birthDate && birthTime && timezone) {
      onComplete({ birthDate, birthTime, timezone });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-2xl"
      >
        {/* Logo & Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mb-6"
          >
            <h1 className="font-display text-5xl md:text-6xl font-bold gradient-text mb-4">
              {t('identity.title')}
            </h1>
            <p className="text-muted-foreground text-lg">
              {t('identity.subtitle')}
            </p>
          </motion.div>
        </div>

        {/* Matrix Background Effect */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="glass-card rounded-2xl p-8 md:p-12 relative overflow-hidden"
        >
          {/* Animated Background Grid */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(250, 204, 21, 0.3) 1px, transparent 0)',
              backgroundSize: '40px 40px'
            }} />
          </div>

          <div className="relative z-10">
            <h2 className="text-2xl font-semibold mb-2 text-foreground">{t('identity.heading')}</h2>
            <p className="text-muted-foreground mb-8">
              {t('identity.description')}
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Birth Date */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium mb-3 text-foreground">
                  <Calendar className="w-4 h-4 text-primary" />
                  {t('identity.birthDate')}
                </label>
                <input
                  type="date"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  className="w-full bg-secondary/50 border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  required
                />
              </div>

              {/* Birth Time */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium mb-3 text-foreground">
                  <Clock className="w-4 h-4 text-primary" />
                  {t('identity.birthTime')}
                </label>
                <input
                  type="time"
                  value={birthTime}
                  onChange={(e) => setBirthTime(e.target.value)}
                  className="w-full bg-secondary/50 border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  required
                />
              </div>

              {/* Timezone */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium mb-3 text-foreground">
                  <Globe className="w-4 h-4 text-primary" />
                  {t('identity.timezone')}
                </label>
                <select
                  value={timezone}
                  onChange={(e) => setTimezone(e.target.value)}
                  className="w-full bg-secondary/50 border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  required
                >
                  <option value="UTC-8">{t('identity.timezone.pacific')}</option>
                  <option value="UTC-5">{t('identity.timezone.eastern')}</option>
                  <option value="UTC+0">{t('identity.timezone.london')}</option>
                  <option value="UTC+1">{t('identity.timezone.europe')}</option>
                  <option value="UTC+8">{t('identity.timezone.asia')}</option>
                  <option value="UTC+9">{t('identity.timezone.japan')}</option>
                </select>
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-primary text-primary-foreground font-semibold py-4 rounded-lg hover:bg-primary/90 transition-all glow-effect"
              >
                {t('identity.submit')}
              </motion.button>
            </form>

            <p className="text-xs text-muted-foreground mt-6 text-center">
              {t('identity.privacy')}
            </p>
          </div>
        </motion.div>

        {/* Footer Note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center text-muted-foreground text-sm mt-8"
        >
          {t('identity.footer')}
        </motion.p>
      </motion.div>
    </div>
  );
}
