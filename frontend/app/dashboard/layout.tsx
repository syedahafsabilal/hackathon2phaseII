'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import { LogoutButton } from '../../components/dashboard/LogoutButton';
import { ProtectedRoute } from '../../components/route/protected-route';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <ProtectedRoute>
      <div
        className="min-h-screen relative"
        style={{ background: '#000408' }}
      >
        {/* ── Full-viewport animated electric-blue background ── */}
        <div style={{
          position: 'fixed', inset: 0, zIndex: 0, overflow: 'hidden', pointerEvents: 'none',
          background: '#000408',
        }}>
          <style>{`
            @keyframes twinkle {
              0%, 100% { opacity: 0.25; transform: rotate(45deg) scale(1); }
              25% { opacity: 0.7; transform: rotate(45deg) scale(1.3); }
              50% { opacity: 1; transform: rotate(45deg) scale(2); }
              75% { opacity: 0.6; transform: rotate(45deg) scale(1.3); }
            }
            @keyframes meteorPulse {
              0%, 100% { opacity: 0.82; filter: brightness(1); }
              50% { opacity: 1; filter: brightness(1.25); }
            }
          `}</style>

          {/* ── Huge electric blue meteoroid ── */}
          {/* Wide atmospheric glow */}
          <div style={{
            position: 'absolute', top: '-8%', right: '12%',
            width: '120px', height: '600px',
            background: 'linear-gradient(180deg, transparent 0%, rgba(14,165,233,0.04) 30%, rgba(56,189,248,0.09) 60%, transparent 100%)',
            borderRadius: '50%',
            transform: 'rotate(18deg)',
            transformOrigin: 'top center',
            filter: 'blur(20px)',
            animation: 'meteorPulse 3.5s ease-in-out infinite 0.5s',
          }} />
          {/* Blurred tail */}
          <div style={{
            position: 'absolute', top: '-6%', right: '18%',
            width: '18px', height: '520px',
            background: 'linear-gradient(180deg, transparent 0%, rgba(56,189,248,0.08) 15%, rgba(56,189,248,0.25) 45%, rgba(14,165,233,0.5) 75%, rgba(0,220,255,0.0) 100%)',
            borderRadius: '999px',
            transform: 'rotate(18deg)',
            transformOrigin: 'top center',
            filter: 'blur(6px)',
            animation: 'meteorPulse 3.5s ease-in-out infinite',
          }} />
          {/* Sharp core body */}
          <div style={{
            position: 'absolute', top: '-4%', right: '18.6%',
            width: '7px', height: '380px',
            background: 'linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(125,211,252,0.5) 20%, rgba(56,189,248,0.95) 55%, rgba(14,165,233,1) 80%, rgba(0,200,255,0.1) 100%)',
            borderRadius: '999px',
            transform: 'rotate(18deg)',
            transformOrigin: 'top center',
            boxShadow: '0 0 12px rgba(56,189,248,0.8), 0 0 30px rgba(14,165,233,0.5), 0 0 60px rgba(0,200,255,0.25)',
            animation: 'meteorPulse 3.5s ease-in-out infinite',
          }} />
          {/* Bright sparkling head */}
          <div style={{
            position: 'absolute', top: '26%', right: '16.8%',
            width: '28px', height: '28px',
            borderRadius: '50%',
            background: 'radial-gradient(circle at 35% 30%, #ffffff 0%, #7dd3fc 25%, #38bdf8 55%, #0284c7 80%, #1d4ed8 100%)',
            boxShadow: '0 0 10px #fff, 0 0 22px #38bdf8, 0 0 50px #0ea5e9, 0 0 90px rgba(14,165,233,0.5), 0 0 140px rgba(14,165,233,0.25)',
            animation: 'meteorPulse 3.5s ease-in-out infinite',
          }} />


          {/* Very faint depth orb — top left */}
          <div style={{
            position: 'absolute', top: '-15%', left: '-10%',
            width: '650px', height: '650px', borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(14,165,233,0.06) 0%, transparent 65%)',
          }} />
          {/* Very faint depth orb — bottom right */}
          <div style={{
            position: 'absolute', bottom: '-12%', right: '-8%',
            width: '550px', height: '550px', borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(56,189,248,0.05) 0%, transparent 65%)',
          }} />

          {/* ── Glowing static stars ── */}
          {[
            { top: '4%',  left: '8%',  s: 2.5, tw: '2.8s', td: '0s'   },
            { top: '9%',  left: '35%', s: 1.5, tw: '3.5s', td: '0.6s' },
            { top: '6%',  left: '62%', s: 2,   tw: '2.2s', td: '1.1s' },
            { top: '3%',  left: '82%', s: 1.5, tw: '4s',   td: '0.3s' },
            { top: '15%', left: '18%', s: 1,   tw: '3.1s', td: '1.8s' },
            { top: '18%', left: '50%', s: 2,   tw: '2.6s', td: '0.9s' },
            { top: '20%', left: '74%', s: 1.5, tw: '3.8s', td: '2.2s' },
            { top: '22%', left: '93%', s: 1,   tw: '2.4s', td: '0.4s' },
            { top: '30%', left: '5%',  s: 2,   tw: '3.3s', td: '1.5s' },
            { top: '33%', left: '28%', s: 1.5, tw: '2.9s', td: '0.7s' },
            { top: '35%', left: '58%', s: 2.5, tw: '3.6s', td: '2s'   },
            { top: '38%', left: '88%', s: 1,   tw: '2.3s', td: '1.2s' },
            { top: '45%', left: '15%', s: 2,   tw: '4.1s', td: '0.5s' },
            { top: '48%', left: '42%', s: 1.5, tw: '2.7s', td: '1.7s' },
            { top: '50%', left: '70%', s: 1,   tw: '3.2s', td: '2.4s' },
            { top: '55%', left: '95%', s: 2,   tw: '2.5s', td: '0.8s' },
            { top: '60%', left: '22%', s: 1.5, tw: '3.9s', td: '1.3s' },
            { top: '63%', left: '52%', s: 2,   tw: '2.1s', td: '2.6s' },
            { top: '65%', left: '78%', s: 1,   tw: '3.4s', td: '0.2s' },
            { top: '70%', left: '10%', s: 2.5, tw: '2.8s', td: '1.9s' },
            { top: '73%', left: '38%', s: 1.5, tw: '3.7s', td: '0.6s' },
            { top: '75%', left: '65%', s: 1,   tw: '2.6s', td: '2.1s' },
            { top: '80%', left: '85%', s: 2,   tw: '4.2s', td: '1s'   },
            { top: '85%', left: '25%', s: 1.5, tw: '3s',   td: '1.4s' },
            { top: '88%', left: '55%', s: 2,   tw: '2.4s', td: '2.8s' },
            { top: '92%', left: '72%', s: 1,   tw: '3.5s', td: '0.3s' },
            { top: '95%', left: '5%',  s: 1.5, tw: '2.9s', td: '1.6s' },
            { top: '12%', left: '45%', s: 1,   tw: '3.3s', td: '2.3s' },
            { top: '42%', left: '97%', s: 2,   tw: '2.7s', td: '0.9s' },
            { top: '57%', left: '33%', s: 1.5, tw: '3.8s', td: '1.7s' },
            { top: '2%',  left: '25%', s: 2,   tw: '2.5s', td: '0.4s' },
            { top: '7%',  left: '90%', s: 1.5, tw: '3.6s', td: '1.8s' },
            { top: '11%', left: '3%',  s: 1,   tw: '2.2s', td: '2.7s' },
            { top: '16%', left: '58%', s: 2.5, tw: '3.1s', td: '0.2s' },
            { top: '24%', left: '80%', s: 1,   tw: '4s',   td: '1.3s' },
            { top: '26%', left: '12%', s: 2,   tw: '2.8s', td: '2.9s' },
            { top: '31%', left: '47%', s: 1.5, tw: '3.4s', td: '0.6s' },
            { top: '37%', left: '72%', s: 1,   tw: '2.6s', td: '1.1s' },
            { top: '40%', left: '20%', s: 2,   tw: '3.9s', td: '2.2s' },
            { top: '44%', left: '63%', s: 1.5, tw: '2.3s', td: '0.5s' },
            { top: '47%', left: '86%', s: 2.5, tw: '3.5s', td: '1.9s' },
            { top: '52%', left: '8%',  s: 1,   tw: '2.7s', td: '3.1s' },
            { top: '54%', left: '44%', s: 2,   tw: '4.1s', td: '0.8s' },
            { top: '59%', left: '91%', s: 1.5, tw: '2.4s', td: '2.5s' },
            { top: '62%', left: '17%', s: 1,   tw: '3.2s', td: '1.4s' },
            { top: '67%', left: '60%', s: 2,   tw: '2.9s', td: '0.1s' },
            { top: '69%', left: '38%', s: 1.5, tw: '3.7s', td: '1.7s' },
            { top: '71%', left: '82%', s: 2.5, tw: '2.2s', td: '2.8s' },
            { top: '76%', left: '50%', s: 1,   tw: '3.8s', td: '0.7s' },
            { top: '79%', left: '6%',  s: 2,   tw: '2.6s', td: '1.5s' },
            { top: '82%', left: '30%', s: 1.5, tw: '4.2s', td: '2.1s' },
            { top: '86%', left: '67%', s: 1,   tw: '3s',   td: '0.3s' },
            { top: '89%', left: '14%', s: 2,   tw: '2.8s', td: '1.2s' },
            { top: '91%', left: '78%', s: 1.5, tw: '3.5s', td: '2.6s' },
            { top: '93%', left: '42%', s: 2.5, tw: '2.4s', td: '0.9s' },
            { top: '97%', left: '88%', s: 1,   tw: '3.3s', td: '1.8s' },
            { top: '17%', left: '97%', s: 2,   tw: '2.7s', td: '3s'   },
            { top: '29%', left: '32%', s: 1.5, tw: '3.6s', td: '0.4s' },
            { top: '36%', left: '55%', s: 1,   tw: '2.5s', td: '2.4s' },
            { top: '43%', left: '75%', s: 2,   tw: '4s',   td: '1s'   },
            { top: '53%', left: '26%', s: 1.5, tw: '2.9s', td: '1.6s' },
            { top: '61%', left: '48%', s: 2.5, tw: '3.4s', td: '0.2s' },
            { top: '74%', left: '93%', s: 1,   tw: '2.6s', td: '2.3s' },
            { top: '83%', left: '57%', s: 2,   tw: '3.8s', td: '0.6s' },
            { top: '87%', left: '3%',  s: 1.5, tw: '2.3s', td: '1.4s' },
            { top: '96%', left: '62%', s: 1,   tw: '4.1s', td: '2.7s' },
            { top: '1%',  left: '50%', s: 2,   tw: '2.6s', td: '0.4s' },
            { top: '6%',  left: '76%', s: 1.5, tw: '3.3s', td: '1.1s' },
            { top: '10%', left: '2%',  s: 1,   tw: '2.1s', td: '2.9s' },
            { top: '14%', left: '29%', s: 2.5, tw: '3.8s', td: '0.2s' },
            { top: '16%', left: '91%', s: 1,   tw: '2.4s', td: '1.6s' },
            { top: '23%', left: '66%', s: 2,   tw: '4.2s', td: '0.7s' },
            { top: '27%', left: '11%', s: 1.5, tw: '2.7s', td: '3s'   },
            { top: '32%', left: '83%', s: 1,   tw: '3.5s', td: '1.3s' },
            { top: '36%', left: '36%', s: 2,   tw: '2.3s', td: '2.6s' },
            { top: '40%', left: '54%', s: 1.5, tw: '3.9s', td: '0.5s' },
            { top: '44%', left: '79%', s: 2.5, tw: '2.8s', td: '1.8s' },
            { top: '48%', left: '22%', s: 1,   tw: '3.1s', td: '2.1s' },
            { top: '51%', left: '47%', s: 2,   tw: '2.5s', td: '0.8s' },
            { top: '55%', left: '68%', s: 1.5, tw: '4s',   td: '3.2s' },
            { top: '59%', left: '6%',  s: 1,   tw: '2.9s', td: '1.4s' },
            { top: '63%', left: '90%', s: 2,   tw: '3.6s', td: '0.3s' },
            { top: '66%', left: '31%', s: 1.5, tw: '2.2s', td: '2.7s' },
            { top: '70%', left: '58%', s: 2.5, tw: '3.4s', td: '0.9s' },
            { top: '73%', left: '14%', s: 1,   tw: '2.6s', td: '1.7s' },
            { top: '77%', left: '44%', s: 2,   tw: '4.1s', td: '2.3s' },
            { top: '80%', left: '72%', s: 1.5, tw: '2.8s', td: '0.6s' },
            { top: '84%', left: '19%', s: 1,   tw: '3.7s', td: '1.9s' },
            { top: '88%', left: '86%', s: 2,   tw: '2.4s', td: '2.5s' },
            { top: '91%', left: '39%', s: 1.5, tw: '3.2s', td: '1.1s' },
            { top: '94%', left: '53%', s: 2.5, tw: '2.7s', td: '0.4s' },
            { top: '98%', left: '25%', s: 1,   tw: '3.8s', td: '2s'   },
            { top: '8%',  left: '17%', s: 2,   tw: '3s',   td: '1.5s' },
            { top: '19%', left: '38%', s: 1.5, tw: '2.3s', td: '0.9s' },
            { top: '45%', left: '13%', s: 2,   tw: '2.6s', td: '1.2s' },
            { top: '57%', left: '42%', s: 1.5, tw: '3.5s', td: '2.8s' },
            { top: '69%', left: '25%', s: 2.5, tw: '2.9s', td: '0.1s' },
            { top: '78%', left: '64%', s: 1,   tw: '3.3s', td: '1.7s' },
            { top: '92%', left: '81%', s: 2,   tw: '2.1s', td: '3.1s' },
          ].map((st, i) => (
            <div key={`star-${i}`} style={{
              position: 'absolute', top: st.top, left: st.left,
              width: `${st.s}px`, height: `${st.s}px`,
              transform: 'rotate(45deg)',
              background: i % 3 === 0 ? '#ffffff' : i % 3 === 1 ? '#bae6fd' : '#38bdf8',
              boxShadow: i % 3 === 0
                ? '0 0 3px #fff, 0 0 8px #fff, 0 0 18px #38bdf8, 0 0 35px #38bdf8aa, 0 0 60px #0ea5e933'
                : i % 3 === 1
                ? '0 0 3px #bae6fd, 0 0 8px #38bdf8, 0 0 20px #38bdf8cc, 0 0 40px #0ea5e955'
                : '0 0 4px #38bdf8, 0 0 10px #38bdf8, 0 0 22px #0ea5e9cc, 0 0 40px #0ea5e966',
              animation: `twinkle ${st.tw} ease-in-out infinite ${st.td}`,
            }} />
          ))}

        </div>

        {/* ── Navbar — identical style to home page ── */}
        <nav style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          height: '5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingLeft: '1.5rem',
          paddingRight: '3rem',
          background: 'linear-gradient(135deg, #0F1B4C, #1E3A8A, #2563EB, #1E3A8A, #0F1B4C)',
          boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
        }}>
          {/* Logo — same as home page */}
          <Link href="/dashboard" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.75rem', lineHeight: 1 }}>
            <div style={{
              width: '2.5rem',
              height: '2.5rem',
              borderRadius: '50%',
              flexShrink: 0,
              background: 'rgba(255,255,255,0.2)',
              backdropFilter: 'blur(8px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 15px rgba(59,130,246,0.5), inset 0 1px 0 rgba(255,255,255,0.4)',
              border: '1px solid rgba(255,255,255,0.3)',
            }}>
              <span style={{ color: 'white', fontWeight: 700, fontSize: '1.125rem', lineHeight: 1, textShadow: '0 0 8px rgba(255,255,255,0.6)' }}>X</span>
            </div>
            <span style={{ color: 'white', fontWeight: 700, fontSize: '1.25rem', lineHeight: 1 }}>TodoAppX</span>
          </Link>

          {/* Nav links — centered */}
          <div style={{
            position: 'absolute', left: '50%', transform: 'translateX(-50%)',
            display: 'flex', alignItems: 'center', gap: '2rem',
          }}>
            {[{ label: 'Dashboard', href: '/dashboard' }, { label: 'AI Chat', href: '/chat' }].map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                style={{
                  color: 'rgba(255,255,255,0.8)',
                  fontSize: '1.1rem',
                  fontWeight: 500,
                  textDecoration: 'none',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = '#ffffff'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.8)'; }}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Logout */}
          <LogoutButton />

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

        {/* Main content */}
        <main style={{ position: 'relative', zIndex: 10, padding: '2.5rem 1rem', paddingTop: 'calc(5rem + 1cm)' }}>
          <div style={{ maxWidth: '820px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {children}
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
