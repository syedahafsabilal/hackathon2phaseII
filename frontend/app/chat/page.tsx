'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/auth-context';
import ChatInterface from '../../components/chat/ChatInterface';
import Link from 'next/link';
import { LogoutButton } from '../../components/dashboard/LogoutButton';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';

export default function ChatPage() {
  const { user, isAuthenticated, loading } = useAuth();
  const router = useRouter();
  const [clearTrigger, setClearTrigger] = useState(0);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/auth/sign-in');
    }
  }, [loading, isAuthenticated, router]);

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        background: 'linear-gradient(160deg, #020813 0%, #050d1a 35%, #070f1f 65%, #030a15 100%)',
        gap: '1.25rem',
      }}>
        <LoadingSpinner size="lg" />
        <p style={{ color: 'rgba(125,211,252,0.7)', fontSize: '0.9rem', letterSpacing: '0.05em' }}>Loading AI Chat...</p>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div style={{
      minHeight: '100vh',
      background: '#03050f',
      display: 'flex',
      flexDirection: 'column',
    }}>

      {/* Professional deep-space background */}
      <div style={{ position: 'fixed', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
        {/* Base deep gradient */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(135deg, #03050f 0%, #060918 30%, #08102a 55%, #050c1e 75%, #03050f 100%)',
        }} />
        {/* Subtle indigo aurora — top */}
        <div style={{
          position: 'absolute', top: '-20%', left: '10%',
          width: '80%', height: '60%',
          background: 'radial-gradient(ellipse, rgba(79,70,229,0.07) 0%, rgba(59,130,246,0.04) 40%, transparent 70%)',
          filter: 'blur(40px)',
        }} />
        {/* Electric blue accent — bottom right */}
        <div style={{
          position: 'absolute', bottom: '-10%', right: '-5%',
          width: '500px', height: '500px',
          background: 'radial-gradient(circle, rgba(14,165,233,0.08) 0%, rgba(37,99,235,0.04) 50%, transparent 72%)',
          filter: 'blur(30px)',
        }} />
        {/* Deep violet accent — left */}
        <div style={{
          position: 'absolute', top: '30%', left: '-8%',
          width: '400px', height: '400px',
          background: 'radial-gradient(circle, rgba(99,102,241,0.06) 0%, transparent 65%)',
          filter: 'blur(25px)',
        }} />
        {/* Subtle horizontal light band — mid page */}
        <div style={{
          position: 'absolute', top: '45%', left: 0, right: 0,
          height: '1px',
          background: 'linear-gradient(90deg, transparent 0%, rgba(56,189,248,0.06) 20%, rgba(99,102,241,0.1) 50%, rgba(56,189,248,0.06) 80%, transparent 100%)',
        }} />
      </div>

      {/* ── Diamond sparkle stars ── */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 1, pointerEvents: 'none', overflow: 'hidden' }}>
        <style>{`
          @keyframes chatTwinkle {
            0%, 100% { opacity: 0.2; transform: rotate(45deg) scale(1); }
            25% { opacity: 0.65; transform: rotate(45deg) scale(1.35); }
            50% { opacity: 1; transform: rotate(45deg) scale(2); }
            75% { opacity: 0.55; transform: rotate(45deg) scale(1.35); }
          }
        `}</style>
        {([
          { top: '3%',  left: '7%',  s: 2.5, tw: '2.8s', td: '0s'   },
          { top: '7%',  left: '32%', s: 1.5, tw: '3.4s', td: '0.7s' },
          { top: '5%',  left: '60%', s: 2,   tw: '2.2s', td: '1.3s' },
          { top: '4%',  left: '84%', s: 1.5, tw: '3.9s', td: '0.4s' },
          { top: '13%', left: '16%', s: 1,   tw: '3.1s', td: '2s'   },
          { top: '17%', left: '48%', s: 2,   tw: '2.6s', td: '1s'   },
          { top: '19%', left: '72%', s: 1.5, tw: '3.7s', td: '2.3s' },
          { top: '21%', left: '93%', s: 1,   tw: '2.4s', td: '0.5s' },
          { top: '28%', left: '4%',  s: 2,   tw: '3.2s', td: '1.6s' },
          { top: '31%', left: '27%', s: 1.5, tw: '2.9s', td: '0.8s' },
          { top: '34%', left: '57%', s: 2.5, tw: '3.6s', td: '2.1s' },
          { top: '37%', left: '87%', s: 1,   tw: '2.3s', td: '1.2s' },
          { top: '43%', left: '14%', s: 2,   tw: '4s',   td: '0.6s' },
          { top: '46%', left: '41%', s: 1.5, tw: '2.7s', td: '1.8s' },
          { top: '49%', left: '69%', s: 1,   tw: '3.3s', td: '2.5s' },
          { top: '52%', left: '95%', s: 2,   tw: '2.5s', td: '0.9s' },
          { top: '58%', left: '21%', s: 1.5, tw: '3.8s', td: '1.4s' },
          { top: '61%', left: '51%', s: 2,   tw: '2.1s', td: '2.7s' },
          { top: '64%', left: '77%', s: 1,   tw: '3.5s', td: '0.3s' },
          { top: '68%', left: '9%',  s: 2.5, tw: '2.8s', td: '2s'   },
          { top: '72%', left: '37%', s: 1.5, tw: '3.6s', td: '0.7s' },
          { top: '74%', left: '63%', s: 1,   tw: '2.6s', td: '2.2s' },
          { top: '79%', left: '84%', s: 2,   tw: '4.1s', td: '1.1s' },
          { top: '83%', left: '24%', s: 1.5, tw: '3s',   td: '1.5s' },
          { top: '86%', left: '54%', s: 2,   tw: '2.4s', td: '2.9s' },
          { top: '90%', left: '71%', s: 1,   tw: '3.4s', td: '0.4s' },
          { top: '93%', left: '3%',  s: 1.5, tw: '2.9s', td: '1.7s' },
          { top: '11%', left: '44%', s: 1,   tw: '3.2s', td: '2.4s' },
          { top: '41%', left: '97%', s: 2,   tw: '2.7s', td: '1s'   },
          { top: '56%', left: '33%', s: 1.5, tw: '3.8s', td: '1.8s' },
          { top: '2%',  left: '22%', s: 2,   tw: '2.5s', td: '0.3s' },
          { top: '8%',  left: '91%', s: 1.5, tw: '3.6s', td: '1.9s' },
          { top: '10%', left: '3%',  s: 1,   tw: '2.2s', td: '2.8s' },
          { top: '15%', left: '59%', s: 2.5, tw: '3.1s', td: '0.2s' },
          { top: '23%', left: '80%', s: 1,   tw: '4s',   td: '1.4s' },
          { top: '26%', left: '11%', s: 2,   tw: '2.8s', td: '3s'   },
          { top: '30%', left: '46%', s: 1.5, tw: '3.4s', td: '0.6s' },
          { top: '36%', left: '73%', s: 1,   tw: '2.6s', td: '1.1s' },
          { top: '39%', left: '19%', s: 2,   tw: '3.9s', td: '2.3s' },
          { top: '44%', left: '62%', s: 1.5, tw: '2.3s', td: '0.5s' },
          { top: '47%', left: '86%', s: 2.5, tw: '3.5s', td: '2s'   },
          { top: '50%', left: '8%',  s: 1,   tw: '2.7s', td: '3.2s' },
          { top: '53%', left: '44%', s: 2,   tw: '4.1s', td: '0.8s' },
          { top: '59%', left: '92%', s: 1.5, tw: '2.4s', td: '2.6s' },
          { top: '62%', left: '17%', s: 1,   tw: '3.2s', td: '1.4s' },
          { top: '65%', left: '59%', s: 2,   tw: '2.9s', td: '0.1s' },
          { top: '70%', left: '82%', s: 2.5, tw: '2.2s', td: '2.9s' },
          { top: '75%', left: '50%', s: 1,   tw: '3.8s', td: '0.7s' },
          { top: '81%', left: '29%', s: 1.5, tw: '4.2s', td: '2.2s' },
          { top: '84%', left: '67%', s: 1,   tw: '3s',   td: '0.3s' },
          { top: '87%', left: '13%', s: 2,   tw: '2.8s', td: '1.2s' },
          { top: '91%', left: '42%', s: 2.5, tw: '2.4s', td: '1s'   },
          { top: '94%', left: '88%', s: 1,   tw: '3.3s', td: '1.9s' },
          { top: '97%', left: '26%', s: 1.5, tw: '2.7s', td: '2.4s' },
          { top: '16%', left: '98%', s: 2,   tw: '2.7s', td: '3.1s' },
          { top: '29%', left: '31%', s: 1.5, tw: '3.6s', td: '0.4s' },
          { top: '35%', left: '55%', s: 1,   tw: '2.5s', td: '2.5s' },
          { top: '42%', left: '76%', s: 2,   tw: '4s',   td: '1.1s' },
          { top: '54%', left: '25%', s: 1.5, tw: '2.9s', td: '1.6s' },
          { top: '60%', left: '48%', s: 2.5, tw: '3.4s', td: '0.2s' },
          { top: '73%', left: '94%', s: 1,   tw: '2.6s', td: '2.4s' },
          { top: '82%', left: '57%', s: 2,   tw: '3.8s', td: '0.6s' },
          { top: '95%', left: '14%', s: 1.5, tw: '2.3s', td: '1.3s' },
          { top: '98%', left: '73%', s: 1,   tw: '4.1s', td: '2.8s' },
        ] as {top:string,left:string,s:number,tw:string,td:string}[]).map((st, i) => (
          <div key={i} style={{
            position: 'absolute', top: st.top, left: st.left,
            width: `${st.s}px`, height: `${st.s}px`,
            background: i % 3 === 0 ? '#ffffff' : i % 3 === 1 ? '#bae6fd' : '#38bdf8',
            boxShadow: i % 3 === 0
              ? '0 0 3px #fff, 0 0 8px #fff, 0 0 18px #38bdf8, 0 0 35px #38bdf8aa'
              : i % 3 === 1
              ? '0 0 3px #bae6fd, 0 0 8px #38bdf8, 0 0 20px #38bdf8cc, 0 0 40px #0ea5e955'
              : '0 0 4px #38bdf8, 0 0 10px #38bdf8, 0 0 22px #0ea5e9cc',
            animation: `chatTwinkle ${st.tw} ease-in-out infinite ${st.td}`,
          }} />
        ))}
      </div>

      {/* ── Navbar ── */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0,
        zIndex: 50, height: '5rem',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        paddingLeft: '1.5rem', paddingRight: '1.5rem',
        background: 'linear-gradient(135deg, #0F1B4C, #1E3A8A, #2563EB, #1E3A8A, #0F1B4C)',
        boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
      }}>
        {/* Logo */}
        <Link href="/dashboard" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.75rem', lineHeight: 1 }}>
          <div style={{
            width: '2.5rem', height: '2.5rem', borderRadius: '50%', flexShrink: 0,
            background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(8px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 0 15px rgba(59,130,246,0.5), inset 0 1px 0 rgba(255,255,255,0.4)',
            border: '1px solid rgba(255,255,255,0.3)',
          }}>
            <span style={{ color: 'white', fontWeight: 700, fontSize: '1.125rem', lineHeight: 1, textShadow: '0 0 8px rgba(255,255,255,0.6)' }}>X</span>
          </div>
          <span style={{ color: 'white', fontWeight: 700, fontSize: '1.25rem', lineHeight: 1 }}>TodoAppX</span>
        </Link>

        {/* Centered nav links */}
        <div style={{
          position: 'absolute', left: '50%', transform: 'translateX(-50%)',
          display: 'flex', alignItems: 'center', gap: '2rem',
        }}>
          {[{ label: 'Dashboard', href: '/dashboard' }, { label: 'AI Chat', href: '/chat' }].map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              style={{
                color: label === 'AI Chat' ? '#ffffff' : 'rgba(255,255,255,0.8)',
                fontSize: '1.1rem', fontWeight: label === 'AI Chat' ? 700 : 500,
                lineHeight: 1,
                textDecoration: 'none', transition: 'color 0.2s',
                borderBottom: label === 'AI Chat' ? '2px solid rgba(147,197,253,0.7)' : 'none',
                paddingBottom: '2px',
              }}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Right side: Clear All Chat + Logout */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <button
            onClick={() => setClearTrigger(t => t + 1)}
            style={{
              padding: '0.5rem 1.1rem',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, rgba(127,29,29,0.5) 0%, rgba(185,28,28,0.35) 100%)',
              border: '1px solid rgba(252,165,165,0.3)',
              color: 'rgba(252,165,165,0.9)',
              fontSize: '0.8rem',
              fontWeight: 700,
              cursor: 'pointer',
              letterSpacing: '0.04em',
              boxShadow: '0 0 10px rgba(239,68,68,0.15)',
              transition: 'all 0.2s ease',
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLButtonElement).style.background = 'linear-gradient(135deg, rgba(185,28,28,0.7) 0%, rgba(220,38,38,0.5) 100%)';
              (e.currentTarget as HTMLButtonElement).style.color = '#fca5a5';
              (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 0 16px rgba(239,68,68,0.35)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLButtonElement).style.background = 'linear-gradient(135deg, rgba(127,29,29,0.5) 0%, rgba(185,28,28,0.35) 100%)';
              (e.currentTarget as HTMLButtonElement).style.color = 'rgba(252,165,165,0.9)';
              (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 0 10px rgba(239,68,68,0.15)';
            }}
          >
            🗑 Clear All Chat
          </button>
          <LogoutButton />
        </div>

        {/* French-style decorative bottom line */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: '3px',
          background: 'linear-gradient(90deg, transparent 0%, #b8860b 8%, #ffd700 20%, #ffe9a0 35%, #38bdf8 50%, #ffe9a0 65%, #ffd700 80%, #b8860b 92%, transparent 100%)',
          boxShadow: '0 0 8px rgba(255,215,0,0.5), 0 0 16px rgba(56,189,248,0.3)',
        }} />
        <div style={{
          position: 'absolute', bottom: '3px', left: 0, right: 0, height: '1px',
          background: 'linear-gradient(90deg, transparent 5%, rgba(255,215,0,0.25) 30%, rgba(56,189,248,0.35) 50%, rgba(255,215,0,0.25) 70%, transparent 95%)',
        }} />
      </nav>

      {/* ── Main chat area ── */}
      <main style={{
        flex: 1, position: 'relative', zIndex: 10,
        paddingTop: 'calc(5rem + 1.5rem)',
        paddingBottom: '1.5rem',
        paddingLeft: '1rem', paddingRight: '1rem',
        display: 'flex', flexDirection: 'column',
      }}>
        {/* Glassmorphism chat card */}
        <div style={{
          flex: 1,
          maxWidth: '860px',
          width: '100%',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          background: 'linear-gradient(145deg, rgba(10,20,50,0.7) 0%, rgba(15,27,76,0.5) 50%, rgba(10,20,50,0.7) 100%)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          borderRadius: '24px',
          border: '1px solid rgba(59,130,246,0.2)',
          boxShadow: '0 24px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(59,130,246,0.06), inset 0 1px 0 rgba(255,255,255,0.06)',
          overflow: 'hidden',
          minHeight: 'calc(100vh - 5rem - 3rem)',
        }}>
          {/* Card header */}
          <div style={{
            padding: '1.25rem 1.75rem',
            borderBottom: '1px solid rgba(59,130,246,0.15)',
            display: 'flex', alignItems: 'center', gap: '1rem',
            background: 'linear-gradient(135deg, rgba(15,27,76,0.6) 0%, rgba(30,58,138,0.3) 100%)',
            position: 'relative',
          }}>
            {/* Shimmer line */}
            <div style={{
              position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
              background: 'linear-gradient(90deg, transparent 5%, rgba(147,197,253,0.5) 40%, rgba(191,219,254,0.7) 50%, rgba(147,197,253,0.5) 60%, transparent 95%)',
            }} />
            {/* AI avatar */}
            <div style={{
              width: '44px', height: '44px', borderRadius: '50%',
              background: 'radial-gradient(circle at 35% 35%, #38bdf8, #0284c7 50%, #1d4ed8 100%)',
              boxShadow: '0 0 0 2px rgba(56,189,248,0.3), 0 0 18px rgba(14,165,233,0.6), inset 0 1px 0 rgba(255,255,255,0.3)',
              border: '1.5px solid #7dd3fc',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '20px', flexShrink: 0,
            }}>
              ✨
            </div>
            <div>
              <h1 style={{
                color: '#ffffff', fontWeight: 800, fontSize: '1.15rem',
                margin: 0, letterSpacing: '-0.01em',
                textShadow: '0 0 20px rgba(147,197,253,0.4)',
              }}>
                AI Productivity Assistant
              </h1>
              <p style={{ color: 'rgba(147,197,253,0.6)', fontSize: '0.78rem', margin: '2px 0 0', fontWeight: 500 }}>
                ● Online — ready to help
              </p>
            </div>
          </div>

          {/* Chat interface */}
          <ChatInterface userId={user.id} userName={user.name} clearTrigger={clearTrigger} />
        </div>
      </main>
    </div>
  );
}
