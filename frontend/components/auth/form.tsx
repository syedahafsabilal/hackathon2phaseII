import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { useAuth } from '../../context/auth-context';
import Link from 'next/link';

interface AuthFormProps {
  type: 'login' | 'register';
}

const AuthForm = ({ type }: AuthFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const { login, register } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (type === 'register' && !formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      let success = false;

      if (type === 'login') {
        success = await login(formData.email, formData.password);
      } else {
        success = await register(formData.name, formData.email, formData.password);
      }

      if (!success) {
        setErrors({ general: type === 'login' ? 'Invalid credentials' : 'Registration failed' });
      }
    } catch (error) {
      setErrors({ general: 'An unexpected error occurred' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md bg-gray-900/80 backdrop-blur-sm border-gray-700 text-white">
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-4xl font-bold text-white">
          {type === 'login' ? 'Sign In' : 'Create Account'}
        </CardTitle>
        <CardDescription className="text-white">
          {type === 'login'
            ? 'Enter your credentials to access your account'
            : 'Enter your details to create a new account'}
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          {type === 'register' && (
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium text-white">Name</label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
              />
              {errors.name && <p className="text-white text-sm">{errors.name}</p>}
            </div>
          )}

          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-white">Email</label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="name@example.com"
              value={formData.email}
              onChange={handleChange}
              className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
            />
            {errors.email && <p className="text-white text-sm">{errors.email}</p>}
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium text-white">Password</label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
            />
            {errors.password && <p className="text-white text-sm">{errors.password}</p>}
          </div>

          {errors.general && <p className="text-white text-sm text-center">{errors.general}</p>}
        </CardContent>
        <CardFooter className="flex flex-col">
          <Button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-6 text-lg"
            disabled={isLoading}
          >
            {isLoading ? 'Processing...' : type === 'login' ? 'Sign In' : 'Create Account'}
          </Button>

          <div className="mt-4 text-center text-sm text-white">
            {type === 'login' ? "Don't have an account?" : "Already have an account?"}
            {' '}
            <Link
              href={type === 'login' ? '/(auth)/sign-up' : '/(auth)/sign-in'}
              className="font-semibold text-white hover:text-white"
            >
              {type === 'login' ? 'Sign up' : 'Sign in'}
            </Link>
          </div>
        </CardFooter>
      </form>
    </Card>
  );
};

export default AuthForm;