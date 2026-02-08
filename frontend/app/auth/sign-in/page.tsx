'use client';

import React from 'react';
import Link from 'next/link';
import { SignInForm } from '../../../components/auth/SignInForm';

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted p-4">
      <div className="w-full max-w-md bg-card p-8 rounded-xl shadow-lg border">
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
            <span className="text-2xl">📋</span>
          </div>
          <h1 className="text-2xl font-bold text-white">Welcome Back</h1>
          <p className="text-white/80 mt-2">Sign in to your account</p>
        </div>

        <SignInForm />

        <div className="mt-6 text-center">
          <p className="text-white/80">
            Don't have an account?{' '}
            <Link href="/auth/sign-up" className="text-primary hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
