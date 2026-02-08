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
    <Button
      variant="outline"
      onClick={handleLogout}
      disabled={loading}
      className="text-sm"
    >
      {loading ? 'Logging out...' : 'Logout'}
    </Button>
  );
};