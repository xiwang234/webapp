'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Mail, Lock, Loader2 } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { login } from '@/services/auth-service';

export default function SignInForm() {
  const { t } = useLanguage();
  const { refreshAuth } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // 检查是否从注册页面跳转过来
  useEffect(() => {
    if (searchParams.get('registered') === 'true') {
      setSuccessMessage(t('auth.signup.success') || 'Registration successful! Please sign in.');
    }
  }, [searchParams, t]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    console.log('[SignInForm] handleSubmit triggered', { email });

    try {
      console.log('[SignInForm] calling login...');
      // 调用后端登录接口
      const authData = await login(email, password);

      console.log('[SignInForm] 登录成功:', authData);

      // 刷新认证状态
      refreshAuth();

      // 登录成功后跳转到首页
      router.push('/');
      router.refresh();
    } catch (err: any) {
      console.error('[SignInForm] login failed:', err);
      setError(err.message || t('auth.error.invalidCredentials'));
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
          {t('auth.signin.title')}
        </h2>

        {successMessage && (
          <div className="mb-4 p-3 rounded-lg bg-green-500/10 border border-green-500/50 text-green-400 text-sm">
            {successMessage}
          </div>
        )}

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/50 text-red-400 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
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
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary text-primary-foreground font-semibold py-3 rounded-lg hover:bg-primary/90 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
            {t('auth.signin.submit')}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          {t('auth.signin.noAccount')}{' '}
          <a href="/auth/signup" className="text-primary hover:underline">
            {t('auth.signup.link')}
          </a>
        </p>
      </div>
    </motion.div>
  );
}
