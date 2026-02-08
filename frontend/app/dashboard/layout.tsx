'use client';

import { ReactNode } from 'react';
import { UserGreeting } from '../../components/dashboard/UserGreeting';
import { LogoutButton } from '../../components/dashboard/LogoutButton';
import { ProtectedRoute } from '../../components/route/protected-route';

export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background relative" style={{ zIndex: 1 }}>
        <header className="bg-card border-b relative w-full">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-full"></div>
              <span className="text-xl font-bold text-white">TodoApp</span>
            </div>

            <div className="flex items-center justify-center space-x-4" style={{ zIndex: 15 }}>
              <UserGreeting />
              <LogoutButton />
            </div>
          </div>
        </header>

        <main className="w-full px-4 py-8 relative" style={{ zIndex: 10 }}>
          {children}
        </main>
      </div>
    </ProtectedRoute>
  );
}