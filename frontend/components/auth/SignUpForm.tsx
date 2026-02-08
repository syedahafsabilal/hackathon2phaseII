'use client';
import { useState } from 'react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { useAuth } from '../../context/auth-context';
import { validateEmail, validatePassword, validateName } from '../../lib/validations';
import { useRouter } from 'next/navigation';

export const SignUpForm = () => {
  const { register } = useAuth(); // <-- useAuth
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
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

    const newErrors: Record<string, string> = {};
    if (!validateName(formData.name).isValid) newErrors.name = 'Invalid name';
    if (!validateEmail(formData.email).isValid) newErrors.email = 'Invalid email';
    if (!validatePassword(formData.password).isValid) newErrors.password = 'Password too weak';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    const success = await register(formData.name, formData.email, formData.password); // <-- call register

    if (success) {
      router.push('/dashboard'); // <-- redirect after signup
    } else {
      setErrors({ form: 'Registration failed. Please try again.' });
    }
    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-white mb-1">Full Name</label>
        <Input id="name" name="name" type="text" placeholder="John Doe" value={formData.name} onChange={handleChange} />
        {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-white mb-1">Email</label>
        <Input id="email" name="email" type="email" placeholder="your@email.com" value={formData.email} onChange={handleChange} />
        {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-white mb-1">Password</label>
        <Input id="password" name="password" type="password" placeholder="••••••••" value={formData.password} onChange={handleChange} />
        {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
      </div>

      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-white mb-1">Confirm Password</label>
        <Input id="confirmPassword" name="confirmPassword" type="password" placeholder="••••••••" value={formData.confirmPassword} onChange={handleChange} />
        {errors.confirmPassword && <p className="mt-1 text-sm text-red-500">{errors.confirmPassword}</p>}
      </div>

      {errors.form && <div className="p-3 bg-red-50 text-red-700 rounded-md text-sm">{errors.form}</div>}

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? 'Creating Account...' : 'Sign Up'}
      </Button>
    </form>
  );
};
