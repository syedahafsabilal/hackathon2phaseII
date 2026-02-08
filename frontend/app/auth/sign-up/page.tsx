'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { SignUpForm } from '../../../components/auth/SignUpForm';

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted p-4">
      <div className="w-full max-w-md bg-card p-8 rounded-xl shadow-lg border">
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
            <span className="text-2xl">✍️</span>
          </div>
          <h1 className="text-2xl font-bold text-foreground">Create Account</h1>
          <p className="text-muted-foreground mt-2">Join us today to boost your productivity</p>
        </div>

        <SignUpForm />

        <div className="mt-6 text-center">
          <p className="text-muted-foreground">
            Already have an account?{' '}
            <Link href="/auth/sign-in" className="text-primary hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}