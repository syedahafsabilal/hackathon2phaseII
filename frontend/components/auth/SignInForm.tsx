'use client';
import { useState } from 'react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { useAuth } from '../../context/auth-context';
import { validateEmail, validatePassword } from '../../lib/validations';
import { useRouter } from 'next/navigation';

export const SignInForm = () => {
  const { login } = useAuth(); // <-- useAuth
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    const emailValidation = validateEmail(formData.email);
    const passwordValidation = validatePassword(formData.password);

    const newErrors: Record<string, string> = {};
    if (!emailValidation.isValid) newErrors.email = emailValidation.error!;
    if (!passwordValidation.isValid) newErrors.password = passwordValidation.error!;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    const success = await login(formData.email, formData.password); // <-- call login

    if (success) {
      router.push('/dashboard'); // <-- redirect after login
    } else {
      setErrors({ form: 'Invalid email or password.' });
    }
    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-white mb-1">Email</label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="your@email.com"
          value={formData.email}
          onChange={handleChange}
          className={errors.email ? 'border-red-500' : ''}
        />
        {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-white mb-1">Password</label>
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="••••••••"
          value={formData.password}
          onChange={handleChange}
          className={errors.password ? 'border-red-500' : ''}
        />
        {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
      </div>

      {errors.form && <div className="p-3 bg-red-50 text-red-700 rounded-md text-sm">{errors.form}</div>}

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? 'Signing in...' : 'Sign In'}
      </Button>
    </form>
  );
};
