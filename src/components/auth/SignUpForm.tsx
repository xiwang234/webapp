'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Mail, Lock, User, Loader2 } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { register } from '@/services/auth-service';

export default function SignUpForm() {
  const { t } = useLanguage();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    console.log('[SignUpForm] handleSubmit triggered', { email, displayName });

    if (password !== confirmPassword) {
      setError(t('auth.error.passwordMismatch'));
      console.log('[SignUpForm] password mismatch');
      return;
    }

    if (password.length < 8) {
      setError(t('auth.error.passwordTooShort'));
      console.log('[SignUpForm] password too short');
      return;
    }

    setIsLoading(true);

    try {
      console.log('[SignUpForm] calling register...');
      // 调用后端注册接口
      const message = await register(displayName || email, email, password);

      // 注册成功，显示成功消息
      console.log('[SignUpForm] 注册成功:', message);

      // 跳转到登录页（不自动登录，让用户手动登录）
      router.push('/auth/signin?registered=true');
    } catch (err: any) {
      console.error('[SignUpForm] register failed:', err);
      setError(err.message || t('auth.error.generic'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md"
    >
      <div className="glass-card rounded-2xl p-8">
        <h2 className="text-2xl font-display font-bold text-foreground mb-6">
          {t('auth.signup.title')}
        </h2>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/50 text-red-400 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="flex items-center gap-2 text-sm font-medium mb-2 text-foreground">
              <User className="w-4 h-4 text-primary" />
              {t('auth.displayName')}
            </label>
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="w-full bg-secondary/50 border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              disabled={isLoading}
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium mb-2 text-foreground">
              <Mail className="w-4 h-4 text-primary" />
              {t('auth.email')}
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-secondary/50 border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              required
              disabled={isLoading}
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium mb-2 text-foreground">
              <Lock className="w-4 h-4 text-primary" />
              {t('auth.password')}
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-secondary/50 border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              required
              disabled={isLoading}
              minLength={8}
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium mb-2 text-foreground">
              <Lock className="w-4 h-4 text-primary" />
              {t('auth.confirmPassword')}
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full bg-secondary/50 border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              required
              disabled={isLoading}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary text-primary-foreground font-semibold py-3 rounded-lg hover:bg-primary/90 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
            {t('auth.signup.submit')}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          {t('auth.signup.hasAccount')}{' '}
          <a href="/auth/signin" className="text-primary hover:underline">
            {t('auth.signin.link')}
          </a>
        </p>
      </div>
    </motion.div>
  );
}
