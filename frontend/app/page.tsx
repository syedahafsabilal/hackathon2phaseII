'use client';

import { Hero } from '../components/landing/Hero';
import { ValueProposition } from '../components/landing/ValueProposition';
import { Button } from '../components/ui/Button';
import UniversalBackground from '../components/layout/UniversalBackground';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center relative overflow-hidden text-foreground">
      {/* Background video */}
      <UniversalBackground />

      <main className="relative w-full max-w-6xl mx-auto px-4 flex-grow flex flex-col justify-center items-center z-10 min-h-screen">
        <Hero />
        <ValueProposition />

        <section className="py-16 w-full">
          <div className="container mx-auto px-4 text-foreground">
            <div className="flex justify-center">
              <a href="/auth/sign-up">
                <Button
                  size="lg"
                  className="
                    px-8 py-4 text-white
                    bg-[#1E3A8A]
                    rounded-xl
                    font-bold
                    animate-glitter
                  "
                >
                  Get Started Free
                </Button>
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-6 relative w-full text-center z-10">
        <div className="container mx-auto px-4">
          <p className="text-foreground">© 2026 Todo Application Phase II. All rights reserved.Made by Syeda Hafsa Bilal</p>
        </div>
      </footer>
    </div>
  );
}
