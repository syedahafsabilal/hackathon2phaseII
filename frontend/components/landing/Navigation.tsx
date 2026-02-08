'use client';

import Link from 'next/link';
import { Button } from '../ui/Button';

interface NavigationProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
}

export const Navigation = ({ isMenuOpen, setIsMenuOpen }: NavigationProps) => {
  return (
    <nav className="bg-card border-b py-4 text-white">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-primary rounded-full"></div>
          <span className="text-xl font-bold text-white">TodoApp</span>
        </div>


        <div className="hidden md:block">
          <div className="flex space-x-4">
            <Link href="/auth/sign-in">
              <Button variant="outline">Sign In</Button>
            </Link>
            <Link href="/auth/sign-up">
              <Button>Sign Up</Button>
            </Link>
          </div>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-card py-4 px-4 border-t text-white">
          <div className="flex flex-col space-y-4">
            <div className="pt-4 flex flex-col space-y-3">
              <Link href="/auth/sign-in">
                <Button variant="outline" className="w-full">Sign In</Button>
              </Link>
              <Link href="/auth/sign-up">
                <Button className="w-full">Sign Up</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};