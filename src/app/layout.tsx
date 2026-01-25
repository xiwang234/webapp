'use client';

import "./globals.css";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { SessionProvider } from "next-auth/react";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import Navigation from "@/components/Navigation";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="font-sans antialiased">
        <SessionProvider>
          <AuthProvider>
            <LanguageProvider>
              <Navigation />
              {children}
            </LanguageProvider>
          </AuthProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
