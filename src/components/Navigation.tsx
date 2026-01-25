'use client';

import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home,
  History,
  User,
  LogOut,
  LogIn,
  Menu,
  X,
  Settings,
  Globe
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { signOut } from 'next-auth/react';

export default function Navigation() {
  const { t, language, setLanguage } = useLanguage();
  const { isAuthenticated, user } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  // Don't show navigation on auth pages
  if (pathname?.startsWith('/auth')) {
    return null;
  }

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/auth/signin' });
  };

  const navItems = [
    { href: '/', label: t('nav.home'), icon: Home },
    ...(isAuthenticated ? [
      { href: '/history', label: t('nav.history'), icon: History },
    ] : []),
  ];

  return (
    <>
      {/* Desktop Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-40 bg-card/80 backdrop-blur-md border-b border-border"
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div
              onClick={() => router.push('/')}
              className="flex items-center gap-2 cursor-pointer"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-yellow-600 rounded-lg" />
              <span className="text-xl font-display font-bold gradient-text">
                Life Strategy AI
              </span>
            </div>

            {/* Desktop Nav Items */}
            <div className="hidden md:flex items-center gap-4">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;

                return (
                  <button
                    key={item.href}
                    onClick={() => router.push(item.href)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                      isActive
                        ? 'bg-primary/10 text-primary'
                        : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {item.label}
                  </button>
                );
              })}

              {/* Language Switcher - Desktop */}
              <div className="flex items-center gap-1 px-2 py-1 bg-secondary/50 rounded-lg">
                <Globe className="w-3 h-3 text-primary" />
                <button
                  onClick={() => setLanguage('en')}
                  className={`px-3 py-1 rounded text-xs font-medium transition-all ${
                    language === 'en'
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  EN
                </button>
                <button
                  onClick={() => setLanguage('zh')}
                  className={`px-3 py-1 rounded text-xs font-medium transition-all ${
                    language === 'zh'
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  中文
                </button>
              </div>

              {/* User Menu or Sign In */}
              {isAuthenticated ? (
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center gap-2 px-4 py-2 bg-secondary/50 rounded-lg hover:bg-secondary transition-all"
                  >
                    <User className="w-4 h-4" />
                    <span className="text-sm">{user?.email?.split('@')[0]}</span>
                  </button>

                  <AnimatePresence>
                    {showUserMenu && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute top-full right-0 mt-2 w-48 bg-card border border-border rounded-lg shadow-xl overflow-hidden"
                      >
                        <button
                          onClick={() => {
                            router.push('/profile');
                            setShowUserMenu(false);
                          }}
                          className="w-full flex items-center gap-2 px-4 py-3 text-foreground hover:bg-secondary/50 transition-all"
                        >
                          <Settings className="w-4 h-4" />
                          {t('nav.profile')}
                        </button>
                        <button
                          onClick={handleSignOut}
                          className="w-full flex items-center gap-2 px-4 py-3 text-red-400 hover:bg-red-500/10 transition-all"
                        >
                          <LogOut className="w-4 h-4" />
                          {t('nav.signOut')}
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <button
                  onClick={() => router.push('/auth/signin')}
                  className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all"
                >
                  <LogIn className="w-4 h-4" />
                  {t('nav.signIn')}
                </button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="md:hidden p-2 text-foreground"
            >
              {showMobileMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {showMobileMenu && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="fixed top-[73px] left-0 right-0 z-30 bg-card/95 backdrop-blur-md border-b border-border md:hidden"
          >
            <div className="px-6 py-4 space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;

                return (
                  <button
                    key={item.href}
                    onClick={() => {
                      router.push(item.href);
                      setShowMobileMenu(false);
                    }}
                    className={`w-full flex items-center gap-2 px-4 py-3 rounded-lg transition-all ${
                      isActive
                        ? 'bg-primary/10 text-primary'
                        : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {item.label}
                  </button>
                );
              })}

              {/* Language Switcher - Mobile */}
              <div className="pt-2 border-t border-border">
                <div className="flex items-center gap-2 px-4 py-3">
                  <Globe className="w-4 h-4 text-primary" />
                  <span className="text-sm text-muted-foreground flex-1">语言 / Language</span>
                </div>
                <div className="flex gap-2 px-4">
                  <button
                    onClick={() => {
                      setLanguage('en');
                      setShowMobileMenu(false);
                    }}
                    className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      language === 'en'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-secondary/50 text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    English
                  </button>
                  <button
                    onClick={() => {
                      setLanguage('zh');
                      setShowMobileMenu(false);
                    }}
                    className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      language === 'zh'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-secondary/50 text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    中文
                  </button>
                </div>
              </div>

              {isAuthenticated ? (
                <>
                  <button
                    onClick={() => {
                      router.push('/profile');
                      setShowMobileMenu(false);
                    }}
                    className="w-full flex items-center gap-2 px-4 py-3 text-foreground hover:bg-secondary/50 rounded-lg transition-all"
                  >
                    <Settings className="w-4 h-4" />
                    {t('nav.profile')}
                  </button>
                  <button
                    onClick={handleSignOut}
                    className="w-full flex items-center gap-2 px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
                  >
                    <LogOut className="w-4 h-4" />
                    {t('nav.signOut')}
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    router.push('/auth/signin');
                    setShowMobileMenu(false);
                  }}
                  className="w-full flex items-center gap-2 px-4 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all"
                >
                  <LogIn className="w-4 h-4" />
                  {t('nav.signIn')}
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spacer to prevent content from going under fixed nav */}
      <div className="h-[73px]" />
    </>
  );
}
