import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { AuthProvider } from '../context/auth-context';
import { TaskProvider } from '../context/task-context';
import UniversalBackground from '../components/layout/UniversalBackground'; // import it back

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Todo Application Phase II',
  description: 'A modern, professional todo application with premium UI',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} text-[#1E3A8A] flex items-center justify-center text-center`}
      >
        {/* Background video */}
        <UniversalBackground />

        {/* Light overlay to make text visible */}
        <div className="absolute inset-0 bg-white/30 pointer-events-none"></div>

        {/* App content */}
        <AuthProvider>
          <TaskProvider>
            <div className="relative z-10 w-full">{children}</div>
          </TaskProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
