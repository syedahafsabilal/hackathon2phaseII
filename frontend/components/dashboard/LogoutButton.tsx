'use client';

import { Button } from '../ui/Button';
import { useAuth } from '../../context/auth-context';
import { useRouter } from 'next/navigation';

export const LogoutButton = () => {
  const { logout, loading } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/auth/sign-in');
  };

  return (
    <button
      onClick={handleLogout}
      disabled={loading}
      style={{
        marginRight: '2cm',
        padding: '8px 24px',
        borderRadius: '12px',
        background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)',
        border: '1px solid rgba(255,255,255,0.25)',
        boxShadow: '0 0 12px rgba(147,197,253,0.15), inset 0 1px 0 rgba(255,255,255,0.15)',
        color: 'rgba(255,255,255,0.9)',
        fontSize: '14px',
        fontWeight: '600',
        letterSpacing: '0.04em',
        cursor: loading ? 'not-allowed' : 'pointer',
        opacity: loading ? 0.6 : 1,
        transition: 'all 0.2s ease',
        backdropFilter: 'blur(8px)',
        textShadow: '0 0 8px rgba(255,255,255,0.3)',
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLButtonElement).style.background = 'linear-gradient(135deg, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0.06) 100%)';
        (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 0 20px rgba(147,197,253,0.3), inset 0 1px 0 rgba(255,255,255,0.2)';
        (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.45)';
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLButtonElement).style.background = 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)';
        (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 0 12px rgba(147,197,253,0.15), inset 0 1px 0 rgba(255,255,255,0.15)';
        (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.25)';
      }}
    >
      {loading ? 'Logging out...' : 'Logout'}
    </button>
  );
};