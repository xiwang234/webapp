'use client';

import { createContext, useContext, ReactNode } from 'react';
import { useSession } from 'next-auth/react';

type AuthContextType = {
  user: {
    id: string;
    email: string;
    name?: string;
  } | null;
  isLoading: boolean;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession();

  const value: AuthContextType = {
    user: session?.user ? {
      id: (session.user as any).id,
      email: session.user.email!,
      name: session.user.name || undefined,
    } : null,
    isLoading: status === 'loading',
    isAuthenticated: !!session?.user,
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
