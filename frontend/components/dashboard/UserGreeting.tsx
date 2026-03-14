'use client';

import { useAuth } from '../../context/auth-context';

export const UserGreeting = () => {
  const { user } = useAuth();

  if (!user) return null;

  const firstName = user.name?.split(' ')[0] || user.name;

  return (
    <div style={{
      background: 'linear-gradient(135deg, rgba(15,27,76,0.55) 0%, rgba(30,58,138,0.28) 50%, rgba(15,27,76,0.55) 100%)',
      backdropFilter: 'blur(24px)',
      WebkitBackdropFilter: 'blur(24px)',
      border: '1px solid rgba(59,130,246,0.22)',
      borderRadius: '22px',
      padding: '32px 36px',
      boxShadow: '0 8px 48px rgba(0,0,0,0.45), 0 0 0 1px rgba(59,130,246,0.08), inset 0 1px 0 rgba(255,255,255,0.06)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Top shimmer line */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
        background: 'linear-gradient(90deg, transparent 5%, rgba(147,197,253,0.45) 40%, rgba(191,219,254,0.6) 50%, rgba(147,197,253,0.45) 60%, transparent 95%)',
      }} />

      {/* Corner glow */}
      <div style={{
        position: 'absolute', top: '-40px', right: '-40px',
        width: '180px', height: '180px',
        background: 'radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)',
        borderRadius: '50%',
      }} />

      <p style={{
        fontSize: '11px', fontWeight: '600', letterSpacing: '2px',
        color: 'rgba(147,197,253,0.6)', textTransform: 'uppercase', marginBottom: '10px',
        textAlign: 'left', margin: '0 0 10px 0',
      }}>
        Welcome back
      </p>

      <h2 style={{
        fontSize: '30px', fontWeight: '800', lineHeight: '1.2',
        background: 'linear-gradient(135deg, #ffffff 0%, #bfdbfe 35%, #dbeafe 65%, #ffffff 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        textAlign: 'left',
        margin: 0,
      }}>
        Good to see you, {firstName} <span style={{ WebkitTextFillColor: 'initial', backgroundImage: 'none' }}>👋</span>
      </h2>

      <p style={{
        fontSize: '14px', color: 'rgba(147,197,253,0.5)', marginTop: '10px',
        textAlign: 'left', margin: '10px 0 0 0', lineHeight: '1.5',
      }}>
        Here&apos;s your task overview for today. Stay focused and get things done.
      </p>
    </div>
  );
};
