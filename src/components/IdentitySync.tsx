'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Globe, Save, Loader2 } from 'lucide-react';
import { UserProfile } from '@/app/page';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { useConsultationStore } from '@/store/consultationStore';

type Props = {
  onComplete: (profile: UserProfile) => void;
};

export default function IdentitySync({ onComplete }: Props) {
  const { t, language } = useLanguage();
  const { isAuthenticated } = useAuth();
  const { savedProfile, setSavedProfile, useSavedProfile, setUseSavedProfile } = useConsultationStore();

  const [birthDate, setBirthDate] = useState('');
  const [birthTime, setBirthTime] = useState('');
  const [timezone, setTimezone] = useState('UTC+0');
  const [isLoadingProfile, setIsLoadingProfile] = useState(false);
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [saveProfileChecked, setSaveProfileChecked] = useState(false);

  // Load saved profile on mount if authenticated
  useEffect(() => {
    if (isAuthenticated && !savedProfile) {
      loadSavedProfile();
    }
  }, [isAuthenticated]);

  // Auto-populate form if using saved profile
  useEffect(() => {
    if (useSavedProfile && savedProfile) {
      setBirthDate(savedProfile.birthDate);
      setBirthTime(savedProfile.birthTime);
      setTimezone(savedProfile.timezone);
    }
  }, [useSavedProfile, savedProfile]);

  const loadSavedProfile = async () => {
    setIsLoadingProfile(true);
    try {
      const response = await fetch('/api/profile');
      const data = await response.json();

      if (data.profile) {
        setSavedProfile(data.profile);
        setUseSavedProfile(true);
      }
    } catch (error) {
      console.error('Error loading profile:', error);
    } finally {
      setIsLoadingProfile(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const profile: UserProfile = {
      birthDate,
      birthTime,
      timezone,
    };

    // Save profile if user is authenticated and checkbox is checked
    if (isAuthenticated && saveProfileChecked && !useSavedProfile) {
      setIsSavingProfile(true);
      try {
        const response = await fetch('/api/profile', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(profile),
        });

        if (response.ok) {
          const data = await response.json();
          setSavedProfile(data.profile);
        }
      } catch (error) {
        console.error('Error saving profile:', error);
      } finally {
        setIsSavingProfile(false);
      }
    }

    onComplete(profile);
  };

  const handleUseSavedProfile = () => {
    setUseSavedProfile(!useSavedProfile);
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

        {/* Saved Profile Option */}
        {isAuthenticated && savedProfile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mb-6 glass-card rounded-xl p-4"
          >
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={useSavedProfile}
                onChange={handleUseSavedProfile}
                className="w-5 h-5 rounded border-border bg-secondary text-primary focus:ring-2 focus:ring-primary/50"
              />
              <div className="flex-1">
                <p className="text-foreground font-medium">
                  {t('identity.useSavedProfile')}
                </p>
                <p className="text-sm text-muted-foreground">
                  {savedProfile.birthDate} • {savedProfile.birthTime} • {savedProfile.timezone}
                </p>
              </div>
            </label>
          </motion.div>
        )}

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

            {isLoadingProfile ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            ) : (
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
                    lang={language === 'zh' ? 'zh-CN' : 'en-US'}
                    className="w-full bg-secondary/50 border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    required
                    disabled={useSavedProfile}
                  />
                  <p className="mt-2 text-xs text-muted-foreground">
                    {t('identity.birthDateFormat')}
                  </p>
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
                    disabled={useSavedProfile}
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
                    disabled={useSavedProfile}
                  >
                    <option value="UTC-8">{t('identity.timezone.pacific')}</option>
                    <option value="UTC-5">{t('identity.timezone.eastern')}</option>
                    <option value="UTC+0">{t('identity.timezone.london')}</option>
                    <option value="UTC+1">{t('identity.timezone.europe')}</option>
                    <option value="UTC+8">{t('identity.timezone.asia')}</option>
                    <option value="UTC+9">{t('identity.timezone.japan')}</option>
                  </select>
                </div>

                {/* Save Profile Checkbox (only for authenticated users without saved profile) */}
                {isAuthenticated && !useSavedProfile && (
                  <div className="pt-4 border-t border-border">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={saveProfileChecked}
                        onChange={(e) => setSaveProfileChecked(e.target.checked)}
                        className="w-5 h-5 rounded border-border bg-secondary text-primary focus:ring-2 focus:ring-primary/50"
                      />
                      <div className="flex items-center gap-2">
                        <Save className="w-4 h-4 text-primary" />
                        <span className="text-foreground">
                          {t('identity.saveProfile')}
                        </span>
                      </div>
                    </label>
                    <p className="mt-2 ml-8 text-xs text-muted-foreground">
                      {t('identity.saveProfileHint')}
                    </p>
                  </div>
                )}

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isSavingProfile}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-primary text-primary-foreground font-semibold py-4 rounded-lg hover:bg-primary/90 transition-all glow-effect disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isSavingProfile && <Loader2 className="w-5 h-5 animate-spin" />}
                  {t('identity.submit')}
                </motion.button>
              </form>
            )}

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
