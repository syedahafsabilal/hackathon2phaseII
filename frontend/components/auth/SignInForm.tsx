'use client';
import { useState } from 'react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { useAuth } from '../../context/auth-context';
import { validateEmail, validatePassword } from '../../lib/validations';
import { useRouter } from 'next/navigation';

const rowStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: '0.3rem',
  justifyContent: 'center',
};

const labelStyle: React.CSSProperties = {
  width: '4rem',
  flexShrink: 0,
  textAlign: 'right',
  color: 'rgba(147,197,253,0.85)',
  fontSize: '0.8125rem',
  fontWeight: 600,
  whiteSpace: 'nowrap',
  letterSpacing: '0.03em',
};

const inputWrapStyle: React.CSSProperties = {
  width: '130px',
  flexShrink: 0,
};

const errorStyle: React.CSSProperties = {
  color: '#fca5a5',
  fontSize: '0.72rem',
  marginTop: '0.2rem',
  textAlign: 'left',
};

export const SignInForm = () => {
  const { login } = useAuth();
  const router = useRouter();

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => { const n = { ...prev }; delete n[name]; return n; });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const emailV = validateEmail(formData.email);
    const passV = validatePassword(formData.password);
    const newErrors: Record<string, string> = {};
    if (!emailV.isValid) newErrors.email = emailV.error!;
    if (!passV.isValid) newErrors.password = passV.error!;
    if (Object.keys(newErrors).length > 0) { setErrors(newErrors); return; }

    setIsLoading(true);
    const errorMsg = await login(formData.email, formData.password);
    if (errorMsg === null) {
      router.push('/dashboard');
    } else {
      setErrors({ form: errorMsg });
    }
    setIsLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      autoComplete="off"
      style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', alignItems: 'center', width: '100%' }}
    >
      {/* Fields shifted left */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', alignItems: 'center', width: '100%', transform: 'translateX(-1cm)' }}>
        {/* Email */}
        <div style={rowStyle}>
          <label htmlFor="email" style={labelStyle}>Email</label>
          <div style={inputWrapStyle}>
            <Input id="email" name="email" type="email" autoComplete="new-password"
              placeholder="you@example.com"
              readOnly onFocus={e => e.currentTarget.removeAttribute('readonly')}
              value={formData.email} onChange={handleChange}
              style={{ ...(errors.email ? { borderColor: 'rgba(248,113,113,0.6)' } : {}) }}
            />
            {errors.email && <p style={errorStyle}>{errors.email}</p>}
          </div>
        </div>

        {/* Password */}
        <div style={rowStyle}>
          <label htmlFor="password" style={labelStyle}>Password</label>
          <div style={inputWrapStyle}>
            <Input id="password" name="password" type="password" autoComplete="new-password"
              placeholder="••••••••"
              readOnly onFocus={e => e.currentTarget.removeAttribute('readonly')}
              value={formData.password} onChange={handleChange}
              style={{ ...(errors.password ? { borderColor: 'rgba(248,113,113,0.6)' } : {}) }}
            />
            {errors.password && <p style={errorStyle}>{errors.password}</p>}
          </div>
        </div>
      </div>

      {/* Form-level error */}
      {errors.form && (
        <div style={{
          background: 'rgba(239,68,68,0.15)',
          border: '1px solid rgba(248,113,113,0.4)',
          borderRadius: '0.5rem',
          padding: '0.6rem 1rem',
          color: '#fca5a5',
          fontSize: '0.875rem',
          textAlign: 'center',
        }}>
          {errors.form === 'Failed to fetch' ? 'Incorrect password' : errors.form}
        </div>
      )}

      {/* Submit */}
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '0.75rem' }}>
        <Button type="submit" size="lg" disabled={isLoading}>
          {isLoading ? 'Signing in...' : 'Sign In'}
        </Button>
      </div>
    </form>
  );
};
