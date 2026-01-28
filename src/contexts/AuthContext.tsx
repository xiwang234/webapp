'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getAuthState, clearAuthTokens } from '@/lib/auth-utils';
import { useRouter } from 'next/navigation';

type User = {
  encryptedUserId: string;
  username: string;
  maskedEmail: string;
} | null;

type AuthContextType = {
  user: User;
  isLoading: boolean;
  isAuthenticated: boolean;
  logout: () => void;
  refreshAuth: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // 从 localStorage 加载认证状态
  const loadAuthState = () => {
    try {
      const authState = getAuthState();
      setUser(authState.user);
      setIsLoading(false);
    } catch (error) {
      console.error('[AuthContext] Failed to load auth state:', error);
      setUser(null);
      setIsLoading(false);
    }
  };

  // 初始化时加载认证状态
  useEffect(() => {
    loadAuthState();
  }, []);

  // 登出函数
  const logout = () => {
    clearAuthTokens();
    setUser(null);
    router.push('/auth/signin');
  };

  // 刷新认证状态（用于登录后更新）
  const refreshAuth = () => {
    loadAuthState();
  };

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: !!user,
    logout,
    refreshAuth,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
