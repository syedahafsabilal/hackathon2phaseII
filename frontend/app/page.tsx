'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import UniversalBackground from '../components/layout/UniversalBackground';

const flashCards = [
  { icon: '🌟', text: 'Your AI knows your schedule better than you do.', color: '#93c5fd' },
  { icon: '💫', text: 'Every goal starts with a single task — let AI find it.', color: '#bfdbfe' },
  { icon: '⚡', text: 'Smarter priorities. Less stress. More done.', color: '#60a5fa' },
  { icon: '🪄', text: 'Magic happens when AI meets your to-do list.', color: '#a5f3fc' },
  { icon: '✨', text: 'Your best day starts with the right task first.', color: '#e0f2fe' },
  { icon: '🚀', text: 'Stop guessing. Let AI plan your perfect day.', color: '#93c5fd' },
];

export default function HomePage() {
  const [flashIdx, setFlashIdx] = useState(0);
  const [visible, setVisible] = useState(true);
  const [founderOpen, setFounderOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setFlashIdx(i => (i + 1) % flashCards.length);
        setVisible(true);
      }, 400);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* ── Navbar — outside scroll container so position:fixed works in all browsers ── */}
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingLeft: '1.5rem',
          paddingRight: '3rem',
          zIndex: 100,
          background: 'linear-gradient(135deg, #0F1B4C, #1E3A8A, #2563EB, #1E3A8A, #0F1B4C)',
          boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
        }}
      >
        {/* Logo */}
        <Link href="/" style={{ textDecoration: 'none' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', lineHeight: 1 }}>
            <div
              style={{
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
              }}
            >
              <span style={{ color: 'white', fontWeight: 700, fontSize: '1.125rem', lineHeight: 1, textShadow: '0 0 8px rgba(255,255,255,0.6)' }}>X</span>
            </div>
            <span style={{ color: 'white', fontWeight: 700, fontSize: '1.25rem', lineHeight: 1 }}>TodoAppX</span>
          </div>
        </Link>

        {/* Nav links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', marginRight: '6rem' }}>
          {[{ label: 'Home', href: '/' }, { label: 'About', href: '/#about' }, { label: 'AI Chat', href: '/#ai-chat' }, { label: 'Sign In', href: '/auth/sign-in' }, { label: 'Sign Up', href: '/auth/sign-up' }].map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              style={{
                color: 'rgba(255,255,255,0.8)',
                fontSize: '1.25rem',
                fontWeight: 500,
                lineHeight: 1,
                textDecoration: 'none',
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = '#ffffff'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.8)'; }}
            >
              {label}
            </Link>
          ))}
          {/* Founder button with sparkle stars */}
          <style>{`
            @keyframes navStar {
              0%,100% { opacity:0.2; transform:rotate(45deg) scale(1); }
              50%      { opacity:1;   transform:rotate(45deg) scale(2.2); }
            }
          `}</style>
          <span style={{ position: 'relative', display: 'inline-flex', alignItems: 'center' }}>
            {/* sparkle stars */}
            {[
              { top:'-8px',  left:'-10px', s:2.5, tw:'1.8s', td:'0s'    },
              { top:'-10px', left:'50%',   s:2,   tw:'2.2s', td:'0.4s'  },
              { top:'-7px',  right:'-10px',s:2.5, tw:'1.6s', td:'0.8s'  },
              { top:'50%',   left:'-12px', s:2,   tw:'2.4s', td:'1.1s'  },
              { top:'50%',   right:'-12px',s:2,   tw:'1.9s', td:'0.6s'  },
              { bottom:'-8px',left:'-8px', s:2,   tw:'2.1s', td:'1.3s'  },
              { bottom:'-9px',left:'50%',  s:2.5, tw:'1.7s', td:'0.3s'  },
              { bottom:'-8px',right:'-8px',s:2,   tw:'2s',   td:'0.9s'  },
            ].map((sp, i) => (
              <span key={i} style={{
                position: 'absolute',
                top: sp.top, left: (sp as {left?:string}).left, right: (sp as {right?:string}).right, bottom: (sp as {bottom?:string}).bottom,
                width: `${sp.s}px`, height: `${sp.s}px`,
                background: i % 2 === 0 ? '#ffd700' : '#ffe9a0',
                boxShadow: '0 0 4px #ffd700, 0 0 10px #ffd700, 0 0 20px #f0d98a88',
                pointerEvents: 'none',
                animation: `navStar ${sp.tw} ease-in-out infinite ${sp.td}`,
                transform: 'rotate(45deg)',
              }} />
            ))}
            <button
              onClick={() => setFounderOpen(true)}
              style={{
                background: 'none', border: 'none', cursor: 'pointer', padding: 0,
                color: '#f0d98a',
                fontSize: '1.25rem',
                fontWeight: 700,
                lineHeight: 1,
                textShadow: '0 0 10px rgba(255,215,0,0.4), 0 0 22px rgba(255,215,0,0.18)',
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = '#ffe9a0'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = '#f0d98a'; }}
            >
              Founder
            </button>
          </span>
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

    <div
      style={{
        height: '100vh',
        overflowY: 'auto',
        scrollSnapType: 'y mandatory',
        scrollBehavior: 'smooth',
      }}
    >
      {/* Animated particle background — fixed, behind everything */}
      <UniversalBackground />

      {/* ── Diamond sparkle star field ── */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 1, pointerEvents: 'none', overflow: 'hidden' }}>
        <style>{`
          @keyframes homeTwinkle {
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
          { top: '2%',  left: '23%', s: 2,   tw: '2.5s', td: '0.3s' },
          { top: '9%',  left: '90%', s: 1.5, tw: '3.6s', td: '1.9s' },
          { top: '25%', left: '79%', s: 1,   tw: '4s',   td: '1.3s' },
          { top: '39%', left: '20%', s: 2,   tw: '3.9s', td: '2.2s' },
          { top: '47%', left: '62%', s: 1.5, tw: '2.3s', td: '0.6s' },
          { top: '55%', left: '88%', s: 2.5, tw: '3.5s', td: '2s'   },
          { top: '66%', left: '46%', s: 1,   tw: '2.7s', td: '3.1s' },
          { top: '76%', left: '6%',  s: 2,   tw: '4.2s', td: '0.9s' },
          { top: '88%', left: '39%', s: 1.5, tw: '2.4s', td: '2.6s' },
          { top: '96%', left: '61%', s: 1,   tw: '4.1s', td: '2.8s' },
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
          { top: '84%', left: '2%',  s: 1,   tw: '3.7s', td: '1.9s' },
          { top: '87%', left: '86%', s: 2,   tw: '2.4s', td: '2.5s' },
          { top: '91%', left: '19%', s: 1.5, tw: '3.2s', td: '1.1s' },
          { top: '94%', left: '53%', s: 2.5, tw: '2.7s', td: '0.4s' },
          { top: '97%', left: '35%', s: 1,   tw: '3.8s', td: '2s'   },
          { top: '8%',  left: '17%', s: 2,   tw: '3s',   td: '1.5s' },
          { top: '19%', left: '38%', s: 1.5, tw: '2.3s', td: '0.9s' },
          { top: '33%', left: '96%', s: 1,   tw: '4.2s', td: '2.4s' },
          { top: '45%', left: '13%', s: 2,   tw: '2.6s', td: '1.2s' },
          { top: '57%', left: '42%', s: 1.5, tw: '3.5s', td: '2.8s' },
          { top: '69%', left: '25%', s: 2.5, tw: '2.9s', td: '0.1s' },
          { top: '78%', left: '64%', s: 1,   tw: '3.3s', td: '1.7s' },
          { top: '92%', left: '81%', s: 2,   tw: '2.1s', td: '3.1s' },
        ] as {top:string,left:string,s:number,tw:string,td:string}[]).map((st, i) => (
          <div key={i} style={{
            position: 'absolute', top: st.top, left: st.left,
            width: `${st.s}px`, height: `${st.s}px`,
            background: i % 3 === 0 ? '#ffffff' : i % 3 === 1 ? '#bae6fd' : '#38bdf8',
            boxShadow: i % 3 === 0
              ? '0 0 3px #fff, 0 0 8px #fff, 0 0 18px #38bdf8, 0 0 35px #38bdf8aa, 0 0 60px #0ea5e933'
              : i % 3 === 1
              ? '0 0 3px #bae6fd, 0 0 8px #38bdf8, 0 0 20px #38bdf8cc, 0 0 40px #0ea5e955'
              : '0 0 4px #38bdf8, 0 0 10px #38bdf8, 0 0 22px #0ea5e9cc, 0 0 40px #0ea5e966',
            animation: `homeTwinkle ${st.tw} ease-in-out infinite ${st.td}`,
          }} />
        ))}
      </div>

      {/* ═══════════════════════════════════════
          SLIDE 1 — HERO
          ═══════════════════════════════════════ */}
      <section
        style={{
          minHeight: '100vh',
          scrollSnapAlign: 'start',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem 1rem',
          textAlign: 'center',
          position: 'relative',
          zIndex: 10,
        }}
      >
        {/* Hero content */}
        <div style={{ maxWidth: '56rem', width: '100%', paddingTop: '5rem' }}>
          {/* Badge */}
          <div
            style={{
              display: 'inline-block',
              padding: '0.375rem 1rem',
              borderRadius: '9999px',
              background: 'rgba(59,130,246,0.2)',
              border: '1px solid rgba(59,130,246,0.4)',
              color: '#93c5fd',
              fontSize: '0.875rem',
              fontWeight: 600,
              marginBottom: '2rem',
              letterSpacing: '0.05em',
            }}
          >
            ✨ Modern Task Management
          </div>

          {/* Headline */}
          <h1
            style={{
              color: '#ffffff',
              fontSize: 'clamp(2rem, 5vw, 3.75rem)',
              fontWeight: 800,
              lineHeight: 1.15,
              marginBottom: '1.5rem',
              textShadow: '0 0 40px rgba(59,130,246,0.3)',
            }}
          >
            Boost Your Productivity with{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #60a5fa, #a78bfa)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Smart Task Management
            </span>
          </h1>

          {/* Subtext */}
          <p
            style={{
              color: 'rgba(255,255,255,0.75)',
              fontSize: 'clamp(1rem, 2vw, 1.25rem)',
              lineHeight: 1.7,
              marginBottom: '2.5rem',
              maxWidth: '40rem',
              margin: '0 auto 2.5rem',
            }}
          >
            Our modern todo application helps you organize your tasks, focus on what matters,
            and achieve your goals with a beautifully designed, intuitive interface.
          </p>

          {/* CTA Button */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Link href="/auth/sign-up">
              <button
                style={{
                  padding: '1rem 2.5rem',
                  fontSize: '1.125rem',
                  fontWeight: 700,
                  color: '#ffffff',
                  background: 'linear-gradient(135deg, #1E3A8A, #2563EB, #1E3A8A)',
                  backgroundSize: '300% 300%',
                  borderRadius: '0.75rem',
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 8px 30px rgba(30,58,138,0.6), 0 4px 12px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.2)',
                  animation: 'glitter 3s ease-in-out infinite alternate',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                  letterSpacing: '0.03em',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-3px) scale(1.03)';
                  (e.currentTarget as HTMLButtonElement).style.boxShadow =
                    '0 12px 40px rgba(30,58,138,0.8), 0 6px 20px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.25)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0) scale(1)';
                  (e.currentTarget as HTMLButtonElement).style.boxShadow =
                    '0 8px 30px rgba(30,58,138,0.6), 0 4px 12px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.2)';
                }}
              >
                Get Started Free
              </button>
            </Link>
          </div>

          {/* Scroll hint */}
          <div style={{ marginTop: '4rem', color: 'rgba(255,255,255,0.3)', fontSize: '0.75rem', letterSpacing: '0.1em' }}>
            SCROLL DOWN ↓
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SLIDE 2 — FEATURES
          ═══════════════════════════════════════ */}
      <section
        id="about"
        style={{
          minHeight: '100vh',
          scrollSnapAlign: 'start',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '5rem 1rem 3rem',
          textAlign: 'center',
          position: 'relative',
          zIndex: 10,
          background: 'rgba(0,0,0,0.3)',
        }}
      >
        <div style={{ maxWidth: '56rem', width: '100%' }}>
          {/* Section label */}
          <p
            style={{
              color: '#60a5fa',
              fontSize: '0.875rem',
              fontWeight: 600,
              letterSpacing: '0.15em',
              marginBottom: '1rem',
              textTransform: 'uppercase',
            }}
          >
            Why TodoAppX?
          </p>

          {/* Section heading */}
          <h2
            style={{
              color: '#ffffff',
              fontSize: 'clamp(1.75rem, 4vw, 3rem)',
              fontWeight: 800,
              marginBottom: '1rem',
            }}
          >
            Everything you need to stay productive
          </h2>

          {/* Section subtext */}
          <p
            style={{
              color: 'rgba(255,255,255,0.6)',
              fontSize: '1.125rem',
              marginBottom: '3.5rem',
              maxWidth: '36rem',
              margin: '0 auto 3.5rem',
            }}
          >
            Powerful features designed to help you accomplish more.
          </p>

          {/* Feature cards */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '1.5rem',
              marginBottom: '4rem',
            }}
          >
            {[
              {
                icon: '✨',
                title: 'Intuitive Interface',
                desc: 'Clean, modern design that makes task management effortless and enjoyable.',
              },
              {
                icon: '📊',
                title: 'Smart Organization',
                desc: 'Categorize and prioritize tasks with our intelligent system.',
              },
              {
                icon: '🔄',
                title: 'Cross-Device Sync',
                desc: 'Access your tasks anywhere, anytime with seamless synchronization.',
              },
            ].map((feature) => (
              <div
                key={feature.title}
                style={{
                  background: 'linear-gradient(145deg, rgba(15,23,42,0.9), rgba(30,41,59,0.9))',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '1rem',
                  padding: '2rem 1.5rem',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.07)',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-6px)';
                  (e.currentTarget as HTMLDivElement).style.boxShadow =
                    '0 16px 48px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
                  (e.currentTarget as HTMLDivElement).style.boxShadow =
                    '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.07)';
                }}
              >
                <div
                  style={{
                    fontSize: '2.5rem',
                    marginBottom: '1rem',
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  {feature.icon}
                </div>
                <h3
                  style={{
                    color: '#ffffff',
                    fontSize: '1.125rem',
                    fontWeight: 700,
                    marginBottom: '0.75rem',
                  }}
                >
                  {feature.title}
                </h3>
                <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9375rem', lineHeight: 1.6 }}>
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Ending CTA */}
          <div
            style={{
              background: 'linear-gradient(135deg, rgba(30,58,138,0.4), rgba(37,99,235,0.2))',
              border: '1px solid rgba(59,130,246,0.3)',
              borderRadius: '1.25rem',
              padding: '3rem 2rem',
              marginBottom: '3rem',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08)',
            }}
          >
            <h3
              style={{
                color: '#ffffff',
                fontSize: 'clamp(1.25rem, 3vw, 1.875rem)',
                fontWeight: 700,
                marginBottom: '1rem',
              }}
            >
              Ready to Transform Your Productivity?
            </h3>
            <p
              style={{
                color: 'rgba(255,255,255,0.7)',
                fontSize: '1rem',
                lineHeight: 1.7,
                maxWidth: '36rem',
                margin: '0 auto 2rem',
              }}
            >
              Join thousands of users who have already improved their task management workflow.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Link href="/auth/sign-up">
                <button
                  style={{
                    padding: '0.875rem 2.5rem',
                    fontSize: '1.0625rem',
                    fontWeight: 700,
                    color: '#ffffff',
                    background: 'linear-gradient(135deg, #1E3A8A, #2563EB, #1E3A8A)',
                    backgroundSize: '300% 300%',
                    borderRadius: '0.75rem',
                    border: 'none',
                    cursor: 'pointer',
                    boxShadow:
                      '0 8px 30px rgba(30,58,138,0.6), 0 4px 12px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.2)',
                    animation: 'glitter 3s ease-in-out infinite alternate',
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-3px) scale(1.03)';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0) scale(1)';
                  }}
                >
                  Get Started Free
                </button>
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* ═══════════════════════════════════════
          SLIDE 3 — AI CHAT (GLAM)
          ═══════════════════════════════════════ */}
      <section
        id="ai-chat"
        style={{
          minHeight: '100vh',
          scrollSnapAlign: 'start',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '5rem 1rem calc(17rem + 3cm)',
          textAlign: 'center',
          position: 'relative',
          zIndex: 10,
          background: 'rgba(0,0,0,0.3)',
          overflow: 'hidden',
        }}
      >
        {/* Decorative blurred orbs — blue theme */}
        <div style={{
          position: 'absolute', top: '10%', left: '5%',
          width: '22rem', height: '22rem', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(37,99,235,0.2) 0%, transparent 70%)',
          filter: 'blur(40px)', pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', bottom: '10%', right: '5%',
          width: '28rem', height: '28rem', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%)',
          filter: 'blur(50px)', pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', top: '40%', left: '50%',
          transform: 'translateX(-50%)',
          width: '40rem', height: '16rem', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(147,197,253,0.07) 0%, transparent 70%)',
          filter: 'blur(60px)', pointerEvents: 'none',
        }} />

        <div style={{ maxWidth: '58rem', width: '100%', position: 'relative' }}>

          {/* Crown / badge */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            padding: '0.4rem 1.25rem',
            borderRadius: '9999px',
            background: 'linear-gradient(135deg, rgba(37,99,235,0.25), rgba(59,130,246,0.2))',
            border: '1px solid rgba(59,130,246,0.45)',
            marginBottom: '1.5cm',
            boxShadow: '0 0 20px rgba(59,130,246,0.2)',
          }}>
            <span style={{ fontSize: '1rem' }}>👑</span>
            <span style={{ color: '#93c5fd', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase' }}>
              Meet Your AI Assistant
            </span>
            <span style={{ fontSize: '1rem' }}>✨</span>
          </div>

          {/* Headline */}
          <h2 style={{
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontWeight: 900,
            marginTop: 0,
            marginBottom: 'calc(1.25rem + 1cm)',
            lineHeight: 1.15,
            background: 'linear-gradient(135deg, #bfdbfe 0%, #60a5fa 40%, #93c5fd 70%, #ffffff 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            letterSpacing: '-0.02em',
          }}>
            Your Personal AI<br />Task Stylist 💅
          </h2>

          {/* Subheading */}
          <p style={{
            color: 'rgba(147,197,253,0.85)',
            fontSize: 'clamp(1rem, 2vw, 1.2rem)',
            lineHeight: 1.75,
            maxWidth: '38rem',
            margin: '0 auto 1.5rem',
          }}>
            Darling, why manage tasks alone? Our glamorous AI chat is here to organise your life,
            suggest priorities, and keep your goals looking absolutely flawless. ✨
          </p>

          {/* CTA */}
          <Link href="/auth/sign-up" style={{ marginBottom: '1cm', display: 'inline-block' }}>
            <button
              style={{
                padding: '1rem 3rem',
                fontSize: '1.125rem',
                fontWeight: 800,
                color: '#ffffff',
                background: 'linear-gradient(135deg, #0F1B4C, #1E3A8A, #2563EB, #93c5fd, #2563EB, #1E3A8A, #0F1B4C)',
                backgroundSize: '400% 400%',
                borderRadius: '9999px',
                border: '1px solid rgba(147,197,253,0.5)',
                cursor: 'pointer',
                boxShadow: '0 8px 30px rgba(37,99,235,0.6), 0 4px 12px rgba(0,0,0,0.3), inset 0 2px 0 rgba(255,255,255,0.45), inset 0 -1px 0 rgba(0,0,0,0.2), 0 0 25px rgba(147,197,253,0.3)',
                animation: 'glitter 3s ease-in-out infinite alternate',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                letterSpacing: '0.04em',
                textShadow: '0 1px 3px rgba(0,0,0,0.4)',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-3px) scale(1.04)';
                (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 14px 40px rgba(37,99,235,0.8), 0 6px 20px rgba(0,0,0,0.4), inset 0 2px 0 rgba(255,255,255,0.55), inset 0 -1px 0 rgba(0,0,0,0.2), 0 0 50px rgba(147,197,253,0.45)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0) scale(1)';
                (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 8px 30px rgba(37,99,235,0.6), 0 4px 12px rgba(0,0,0,0.3), inset 0 2px 0 rgba(255,255,255,0.45), inset 0 -1px 0 rgba(0,0,0,0.2), 0 0 25px rgba(147,197,253,0.3)';
              }}
            >
              💅 Try AI Chat Now
            </button>
          </Link>

          {/* Footer note */}
          <p style={{ color: 'rgba(147,197,253,0.4)', fontSize: '0.8rem', marginTop: '0', marginBottom: 'calc(3.5rem + 1cm)', letterSpacing: '0.05em' }}>
            ✨ Powered by Gemini AI · Always chic, always smart ✨
          </p>

          {/* Feature pills row */}
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', gap: '0.75rem', margin: '2cm auto 1.5rem', width: '100%', textAlign: 'center' }}>
            {['💬 Smart Chat', '🌸 Task Suggestions', '💎 Priority Styling', '🪄 AI Insights', '✨ Daily Glam Plan'].map(pill => (
              <span key={pill} style={{
                padding: '0.45rem 1.1rem',
                borderRadius: '9999px',
                background: 'linear-gradient(135deg, rgba(30,58,138,0.4), rgba(37,99,235,0.2))',
                border: '1px solid rgba(59,130,246,0.35)',
                color: '#93c5fd',
                fontSize: '0.875rem',
                fontWeight: 600,
                letterSpacing: '0.02em',
                boxShadow: '0 2px 12px rgba(37,99,235,0.15)',
              }}>{pill}</span>
            ))}
          </div>

          {/* Flashing sparkly cycling card — centre of slide */}
          <div
            style={{
              marginTop: '4cm',
              marginBottom: '2cm',
              maxWidth: '36rem',
              marginLeft: 'auto',
              marginRight: 'auto',
              padding: '1.75rem 2rem',
              borderRadius: '1.5rem',
              background: 'linear-gradient(135deg, rgba(8,14,31,0.95), rgba(15,27,76,0.9), rgba(30,58,138,0.5))',
              border: `1px solid ${flashCards[flashIdx].color}55`,
              boxShadow: `0 0 30px ${flashCards[flashIdx].color}33, 0 0 60px ${flashCards[flashIdx].color}18, inset 0 1px 0 rgba(255,255,255,0.08)`,
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0) scale(1)' : 'translateY(6px) scale(0.98)',
              transition: 'opacity 0.4s ease, transform 0.4s ease, box-shadow 0.4s ease, border-color 0.4s ease',
            }}
          >
            <div style={{ fontSize: '2.25rem', marginBottom: '0.75rem' }}>{flashCards[flashIdx].icon}</div>
            <p style={{
              color: flashCards[flashIdx].color,
              fontSize: '1.1rem',
              fontWeight: 700,
              letterSpacing: '0.03em',
              lineHeight: 1.6,
              margin: 0,
              textShadow: `0 0 20px ${flashCards[flashIdx].color}88`,
            }}>
              {flashCards[flashIdx].text}
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginTop: '1rem' }}>
              {flashCards.map((_, i) => (
                <div key={i} style={{
                  width: i === flashIdx ? '1.5rem' : '0.4rem',
                  height: '0.4rem',
                  borderRadius: '9999px',
                  background: i === flashIdx ? flashCards[flashIdx].color : 'rgba(255,255,255,0.2)',
                  boxShadow: i === flashIdx ? `0 0 8px ${flashCards[flashIdx].color}` : 'none',
                  transition: 'all 0.4s ease',
                }} />
              ))}
            </div>
          </div>

          {/* 3 glamour cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1.5rem',
            marginTop: '5cm',
            marginBottom: 'calc(3.5rem + 1cm)',
          }}>
            {[
              { icon: '💬', title: 'AI Productivity Partner', desc: 'Plan your day, organize tasks, and get instant help from your built-in AI assistant.' },
              { icon: '💅', title: 'Curated Priorities', desc: 'The AI reads your tasks and serves you a perfectly curated to-do list, like a personal stylist for your schedule.' },
              { icon: '🌸', title: 'Task Creator', desc: 'Add and manage tasks effortlessly to keep your productivity on track.' },
            ].map(card => (
              <div
                key={card.title}
                style={{
                  background: 'linear-gradient(145deg, rgba(8,14,31,0.95), rgba(15,23,42,0.9), rgba(26,37,64,0.9))',
                  border: '1px solid rgba(59,130,246,0.2)',
                  borderRadius: '1.25rem',
                  padding: '2rem 1.5rem',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.07)',
                  transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                  cursor: 'default',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-8px)';
                  (e.currentTarget as HTMLDivElement).style.boxShadow = '0 20px 50px rgba(37,99,235,0.3), inset 0 1px 0 rgba(147,197,253,0.15)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
                  (e.currentTarget as HTMLDivElement).style.boxShadow = '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.07)';
                }}
              >
                <div style={{ fontSize: '2.75rem', marginBottom: '1rem' }}>{card.icon}</div>
                <h3 style={{
                  background: 'linear-gradient(135deg, #bfdbfe, #60a5fa)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  fontSize: '1.125rem',
                  fontWeight: 800,
                  marginBottom: '0.75rem',
                }}>{card.title}</h3>
                <p style={{ color: 'rgba(147,197,253,0.75)', fontSize: '0.9375rem', lineHeight: 1.65 }}>{card.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Full-width footer pinned to bottom */}
        <footer
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            width: '100%',
            padding: 'calc(3rem - 5cm) 3rem calc(8rem - 1cm)',
            background: 'linear-gradient(135deg, #0F1B4C, #1E3A8A, #0a1535, #1E3A8A, #0F1B4C)',
            backgroundSize: '300% 300%',
            animation: 'glitter 4s ease-in-out infinite alternate',
            boxShadow: '0 -4px 30px rgba(30,58,138,0.5), 0 0 60px rgba(37,99,235,0.15), inset 0 1px 0 rgba(255,255,255,0.1)',
            borderTop: '1px solid rgba(59,130,246,0.35)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            gap: '0.25rem',
          }}
        >
          {/* Footer inner row: left brand + right description */}
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', width: '100%', marginTop: '5rem', position: 'relative' }}>

            {/* Left — logo + credit */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div
                  style={{
                    width: '4rem',
                    height: '4rem',
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.18)',
                    backdropFilter: 'blur(8px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 0 20px rgba(59,130,246,0.6), inset 0 1px 0 rgba(255,255,255,0.4)',
                    border: '1px solid rgba(255,255,255,0.3)',
                  }}
                >
                  <span style={{ color: 'white', fontWeight: 700, fontSize: '1.5rem', textShadow: '0 0 8px rgba(255,255,255,0.6)' }}>X</span>
                </div>
                <span style={{ color: 'white', fontWeight: 800, fontSize: '1.5rem', letterSpacing: '0.05em' }}>TodoAppX</span>
              </div>
              <p
                style={{
                  fontFamily: "'Palatino Linotype', Palatino, Georgia, serif",
                  fontStyle: 'italic',
                  fontWeight: 900,
                  fontSize: '1.05rem',
                  letterSpacing: '0.12em',
                  color: '#f0d98a',
                  textShadow: '0 0 10px rgba(255,215,0,0.4), 0 0 22px rgba(255,215,0,0.18)',
                  margin: 0,
                }}
              >
                — Made by SyedaHafsaBilal
              </p>
            </div>

            {/* Right — description */}
            <div style={{ position: 'absolute', right: 'calc(3rem + 1.5cm)', width: '36%', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', marginTop: '0.5cm' }}>
              <p style={{
                textAlign: 'center',
                fontWeight: 700,
                fontSize: '0.9rem',
                lineHeight: 1.8,
                letterSpacing: '0.06em',
                margin: 0,
                wordBreak: 'break-word',
                background: 'linear-gradient(135deg, #ffffff 0%, #bfdbfe 20%, #e0e7ff 35%, #ffffff 50%, #93c5fd 65%, #e0f2fe 80%, #ffffff 100%)',
                backgroundSize: '300% 300%',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                animation: 'glitter 3s ease-in-out infinite alternate',
                textShadow: 'none',
              }}>
                TodoAppX is your all-in-one smart task manager. Organize, prioritize, and achieve your goals with an AI-powered assistant by your side a beautifully.
              </p>
            </div>

          </div>
        </footer>
      </section>
    </div>

      {/* ── Founder Modal ── */}
      {founderOpen && (
        <div
          onClick={() => setFounderOpen(false)}
          style={{
            position: 'fixed', inset: 0, zIndex: 999,
            background: 'rgba(2,5,18,0.97)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '1.5rem',
          }}
        >
          <style>{`
            @keyframes founderTwinkle {
              0%, 100% { opacity: 0.15; transform: rotate(45deg) scale(1); }
              25% { opacity: 0.65; transform: rotate(45deg) scale(1.4); }
              50% { opacity: 1; transform: rotate(45deg) scale(2.1); }
              75% { opacity: 0.5; transform: rotate(45deg) scale(1.4); }
            }
            @keyframes founderFadeIn {
              from { opacity: 0; transform: scale(0.96) translateY(12px); }
              to   { opacity: 1; transform: scale(1) translateY(0); }
            }
          `}</style>

          {/* Diamond stars — blue/white theme */}
          {([
            { top:'2%', left:'5%', s:2.5, tw:'2.9s', td:'0s' },
            { top:'5%', left:'18%', s:1.5, tw:'3.5s', td:'0.6s' },
            { top:'3%', left:'38%', s:2, tw:'2.3s', td:'1.2s' },
            { top:'4%', left:'58%', s:1.5, tw:'3.8s', td:'0.3s' },
            { top:'2%', left:'75%', s:2, tw:'2.6s', td:'1.7s' },
            { top:'5%', left:'90%', s:1, tw:'3.2s', td:'0.9s' },
            { top:'10%', left:'3%', s:1.5, tw:'4s', td:'2.1s' },
            { top:'12%', left:'28%', s:2, tw:'2.7s', td:'0.4s' },
            { top:'9%', left:'50%', s:1, tw:'3.4s', td:'1.5s' },
            { top:'11%', left:'70%', s:2.5, tw:'2.5s', td:'2.3s' },
            { top:'8%', left:'85%', s:1.5, tw:'3.1s', td:'0.7s' },
            { top:'18%', left:'10%', s:1, tw:'2.8s', td:'1.9s' },
            { top:'20%', left:'45%', s:2, tw:'4.1s', td:'0.2s' },
            { top:'17%', left:'92%', s:1.5, tw:'2.4s', td:'2.6s' },
            { top:'25%', left:'2%', s:2, tw:'3.6s', td:'1.1s' },
            { top:'27%', left:'32%', s:1, tw:'2.2s', td:'2.8s' },
            { top:'24%', left:'65%', s:2.5, tw:'3.9s', td:'0.5s' },
            { top:'30%', left:'80%', s:1.5, tw:'2.7s', td:'1.4s' },
            { top:'35%', left:'15%', s:1, tw:'3.3s', td:'2.2s' },
            { top:'38%', left:'55%', s:2, tw:'2.6s', td:'0.8s' },
            { top:'33%', left:'96%', s:1.5, tw:'4.2s', td:'1.6s' },
            { top:'42%', left:'7%', s:2, tw:'2.9s', td:'2.9s' },
            { top:'44%', left:'40%', s:1, tw:'3.5s', td:'0.1s' },
            { top:'40%', left:'72%', s:2.5, tw:'2.3s', td:'1.8s' },
            { top:'48%', left:'22%', s:1.5, tw:'3.7s', td:'2.4s' },
            { top:'50%', left:'60%', s:2, tw:'2.5s', td:'0.6s' },
            { top:'46%', left:'88%', s:1, tw:'4s', td:'1.3s' },
            { top:'55%', left:'4%', s:2, tw:'3.2s', td:'2.7s' },
            { top:'57%', left:'35%', s:1.5, tw:'2.8s', td:'0.4s' },
            { top:'53%', left:'78%', s:1, tw:'3.6s', td:'1.9s' },
            { top:'62%', left:'14%', s:2.5, tw:'2.4s', td:'2.1s' },
            { top:'60%', left:'50%', s:1.5, tw:'3.9s', td:'0.7s' },
            { top:'65%', left:'90%', s:2, tw:'2.7s', td:'1.5s' },
            { top:'68%', left:'25%', s:1, tw:'4.1s', td:'2.6s' },
            { top:'70%', left:'68%', s:2.5, tw:'2.2s', td:'0.3s' },
            { top:'74%', left:'5%', s:1.5, tw:'3.4s', td:'1.1s' },
            { top:'72%', left:'42%', s:1, tw:'2.9s', td:'2.3s' },
            { top:'78%', left:'82%', s:2, tw:'3.7s', td:'0.8s' },
            { top:'80%', left:'19%', s:1.5, tw:'2.5s', td:'1.7s' },
            { top:'76%', left:'58%', s:1, tw:'4.2s', td:'2.9s' },
            { top:'85%', left:'8%', s:2, tw:'2.6s', td:'0.5s' },
            { top:'83%', left:'35%', s:2.5, tw:'3.1s', td:'1.4s' },
            { top:'87%', left:'72%', s:1.5, tw:'2.3s', td:'2.2s' },
            { top:'90%', left:'48%', s:1, tw:'3.8s', td:'0.9s' },
            { top:'88%', left:'93%', s:2, tw:'2.7s', td:'1.6s' },
            { top:'93%', left:'15%', s:1.5, tw:'4s', td:'2.5s' },
            { top:'95%', left:'62%', s:2.5, tw:'2.4s', td:'0.2s' },
            { top:'97%', left:'30%', s:1, tw:'3.5s', td:'1.8s' },
            { top:'96%', left:'85%', s:2, tw:'2.8s', td:'3s' },
            { top:'6%', left:'44%', s:1, tw:'3.3s', td:'1.2s' },
            { top:'14%', left:'60%', s:2, tw:'2.6s', td:'0.7s' },
            { top:'22%', left:'78%', s:1.5, tw:'3.9s', td:'2s' },
            { top:'29%', left:'20%', s:1, tw:'2.5s', td:'1.3s' },
            { top:'37%', left:'88%', s:2, tw:'4.1s', td:'0.4s' },
            { top:'43%', left:'53%', s:1.5, tw:'2.9s', td:'2.7s' },
            { top:'51%', left:'11%', s:2.5, tw:'3.6s', td:'0.1s' },
            { top:'58%', left:'66%', s:1, tw:'2.3s', td:'1.6s' },
            { top:'63%', left:'33%', s:2, tw:'3.7s', td:'2.4s' },
            { top:'71%', left:'76%', s:1.5, tw:'2.6s', td:'0.6s' },
            { top:'79%', left:'43%', s:1, tw:'4.2s', td:'1.9s' },
            { top:'86%', left:'55%', s:2, tw:'2.8s', td:'2.8s' },
            { top:'92%', left:'6%', s:1.5, tw:'3.2s', td:'0.3s' },
            { top:'99%', left:'50%', s:2.5, tw:'2.5s', td:'1.1s' },
            { top:'16%', left:'97%', s:1, tw:'3.4s', td:'2.5s' },
            { top:'26%', left:'47%', s:2, tw:'2.7s', td:'0.8s' },
            { top:'32%', left:'6%', s:1.5, tw:'3.8s', td:'1.7s' },
            { top:'49%', left:'97%', s:1, tw:'2.4s', td:'2.2s' },
            { top:'66%', left:'3%', s:2, tw:'3s', td:'0.5s' },
            { top:'75%', left:'96%', s:1.5, tw:'4.1s', td:'1.3s' },
            { top:'84%', left:'27%', s:2.5, tw:'2.2s', td:'2.6s' },
            { top:'91%', left:'75%', s:1, tw:'3.6s', td:'0.9s' },
            { top:'98%', left:'18%', s:2, tw:'2.9s', td:'1.5s' },
          ] as {top:string,left:string,s:number,tw:string,td:string}[]).map((st, i) => (
            <div key={i} style={{
              position: 'fixed', top: st.top, left: st.left,
              width: `${st.s}px`, height: `${st.s}px`,
              background: i % 3 === 0 ? '#ffffff' : i % 3 === 1 ? '#bae6fd' : '#38bdf8',
              boxShadow: i % 3 === 0
                ? '0 0 3px #fff, 0 0 8px #fff, 0 0 18px #38bdf8, 0 0 35px #38bdf8aa'
                : i % 3 === 1
                ? '0 0 3px #bae6fd, 0 0 8px #38bdf8, 0 0 20px #38bdf8cc, 0 0 40px #0ea5e955'
                : '0 0 4px #38bdf8, 0 0 10px #38bdf8, 0 0 22px #0ea5e9cc',
              animation: `founderTwinkle ${st.tw} ease-in-out infinite ${st.td}`,
              pointerEvents: 'none',
            }} />
          ))}

          {/* ── Flowing electric energy currents — blue theme ── */}
          <svg style={{ position:'fixed', inset:0, width:'100%', height:'100%', pointerEvents:'none', overflow:'visible' }} xmlns="http://www.w3.org/2000/svg">
            <defs>
              <filter id="eglow-s"><feGaussianBlur stdDeviation="3" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
              <filter id="eglow-m"><feGaussianBlur stdDeviation="6" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
              <filter id="eglow-l"><feGaussianBlur stdDeviation="10" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
              <path id="fe1" d="M 5vw 20vh Q 15vw 5vh 30vw 25vh Q 45vw 45vh 60vw 15vh Q 72vw 2vh 88vw 30vh"/>
              <path id="fe2" d="M 2vw 55vh Q 18vw 40vh 35vw 60vh Q 50vw 78vh 68vw 50vh Q 80vw 35vh 98vw 58vh"/>
              <path id="fe3" d="M 10vw 85vh Q 25vw 70vh 40vw 88vh Q 55vw 100vh 75vw 80vh Q 88vw 65vh 97vw 82vh"/>
              <path id="fe4" d="M 0vw 38vh Q 12vw 25vh 22vw 45vh Q 32vw 62vh 18vw 75vh Q 8vw 88vh 15vw 98vh"/>
              <path id="fe5" d="M 85vw 10vh Q 92vw 28vh 80vw 45vh Q 70vw 60vh 88vw 72vh Q 95vw 83vh 90vw 96vh"/>
              <path id="fe6" d="M 40vw 2vh Q 50vw 18vh 38vw 35vh Q 28vw 50vh 45vw 65vh Q 58vw 80vh 42vw 95vh"/>
            </defs>
            {/* Arc 1 */}
            <use href="#fe1" fill="none" stroke="#1d4ed8" strokeWidth="3" filter="url(#eglow-l)">
              <animate attributeName="stroke-dasharray" values="0 2000;400 2000;0 2000" dur="4s" repeatCount="indefinite"/>
              <animate attributeName="stroke-dashoffset" values="0;-2000" dur="4s" repeatCount="indefinite"/>
              <animate attributeName="opacity" values="0.1;0.55;0.1" dur="4s" repeatCount="indefinite"/>
            </use>
            <use href="#fe1" fill="none" stroke="#7dd3fc" strokeWidth="0.8" filter="url(#eglow-s)">
              <animate attributeName="stroke-dasharray" values="0 2000;300 2000;0 2000" dur="4s" repeatCount="indefinite"/>
              <animate attributeName="stroke-dashoffset" values="0;-2000" dur="4s" repeatCount="indefinite"/>
              <animate attributeName="opacity" values="0.2;0.85;0.2" dur="4s" repeatCount="indefinite"/>
            </use>
            {/* Arc 2 */}
            <use href="#fe2" fill="none" stroke="#0369a1" strokeWidth="3" filter="url(#eglow-l)">
              <animate attributeName="stroke-dasharray" values="0 2000;500 2000;0 2000" dur="5.5s" repeatCount="indefinite" begin="1.2s"/>
              <animate attributeName="stroke-dashoffset" values="0;-2200" dur="5.5s" repeatCount="indefinite" begin="1.2s"/>
              <animate attributeName="opacity" values="0.05;0.45;0.05" dur="5.5s" repeatCount="indefinite" begin="1.2s"/>
            </use>
            <use href="#fe2" fill="none" stroke="#38bdf8" strokeWidth="0.8" filter="url(#eglow-s)">
              <animate attributeName="stroke-dasharray" values="0 2000;350 2000;0 2000" dur="5.5s" repeatCount="indefinite" begin="1.2s"/>
              <animate attributeName="stroke-dashoffset" values="0;-2200" dur="5.5s" repeatCount="indefinite" begin="1.2s"/>
              <animate attributeName="opacity" values="0.1;0.75;0.1" dur="5.5s" repeatCount="indefinite" begin="1.2s"/>
            </use>
            {/* Arc 3 */}
            <use href="#fe3" fill="none" stroke="#1e40af" strokeWidth="2.5" filter="url(#eglow-m)">
              <animate attributeName="stroke-dasharray" values="0 2000;450 2000;0 2000" dur="6s" repeatCount="indefinite" begin="2.5s"/>
              <animate attributeName="stroke-dashoffset" values="0;-2000" dur="6s" repeatCount="indefinite" begin="2.5s"/>
              <animate attributeName="opacity" values="0.1;0.4;0.1" dur="6s" repeatCount="indefinite" begin="2.5s"/>
            </use>
            <use href="#fe3" fill="none" stroke="#bae6fd" strokeWidth="0.7" filter="url(#eglow-s)">
              <animate attributeName="stroke-dasharray" values="0 2000;300 2000;0 2000" dur="6s" repeatCount="indefinite" begin="2.5s"/>
              <animate attributeName="stroke-dashoffset" values="0;-2000" dur="6s" repeatCount="indefinite" begin="2.5s"/>
              <animate attributeName="opacity" values="0.15;0.8;0.15" dur="6s" repeatCount="indefinite" begin="2.5s"/>
            </use>
            {/* Arc 4 */}
            <use href="#fe4" fill="none" stroke="#2563eb" strokeWidth="2" filter="url(#eglow-m)">
              <animate attributeName="stroke-dasharray" values="0 1500;350 1500;0 1500" dur="4.8s" repeatCount="indefinite" begin="0.6s"/>
              <animate attributeName="stroke-dashoffset" values="0;-1500" dur="4.8s" repeatCount="indefinite" begin="0.6s"/>
              <animate attributeName="opacity" values="0.08;0.5;0.08" dur="4.8s" repeatCount="indefinite" begin="0.6s"/>
            </use>
            <use href="#fe4" fill="none" stroke="#e0f2fe" strokeWidth="0.6" filter="url(#eglow-s)">
              <animate attributeName="stroke-dasharray" values="0 1500;250 1500;0 1500" dur="4.8s" repeatCount="indefinite" begin="0.6s"/>
              <animate attributeName="stroke-dashoffset" values="0;-1500" dur="4.8s" repeatCount="indefinite" begin="0.6s"/>
              <animate attributeName="opacity" values="0.2;0.9;0.2" dur="4.8s" repeatCount="indefinite" begin="0.6s"/>
            </use>
            {/* Arc 5 */}
            <use href="#fe5" fill="none" stroke="#0284c7" strokeWidth="2" filter="url(#eglow-m)">
              <animate attributeName="stroke-dasharray" values="0 1500;400 1500;0 1500" dur="5.2s" repeatCount="indefinite" begin="1.8s"/>
              <animate attributeName="stroke-dashoffset" values="0;-1500" dur="5.2s" repeatCount="indefinite" begin="1.8s"/>
              <animate attributeName="opacity" values="0.1;0.45;0.1" dur="5.2s" repeatCount="indefinite" begin="1.8s"/>
            </use>
            <use href="#fe5" fill="none" stroke="#7dd3fc" strokeWidth="0.7" filter="url(#eglow-s)">
              <animate attributeName="stroke-dasharray" values="0 1500;280 1500;0 1500" dur="5.2s" repeatCount="indefinite" begin="1.8s"/>
              <animate attributeName="stroke-dashoffset" values="0;-1500" dur="5.2s" repeatCount="indefinite" begin="1.8s"/>
              <animate attributeName="opacity" values="0.15;0.8;0.15" dur="5.2s" repeatCount="indefinite" begin="1.8s"/>
            </use>
            {/* Arc 6 */}
            <use href="#fe6" fill="none" stroke="#1d4ed8" strokeWidth="2.5" filter="url(#eglow-l)">
              <animate attributeName="stroke-dasharray" values="0 1800;380 1800;0 1800" dur="7s" repeatCount="indefinite" begin="3.1s"/>
              <animate attributeName="stroke-dashoffset" values="0;-1800" dur="7s" repeatCount="indefinite" begin="3.1s"/>
              <animate attributeName="opacity" values="0.05;0.4;0.05" dur="7s" repeatCount="indefinite" begin="3.1s"/>
            </use>
            <use href="#fe6" fill="none" stroke="#38bdf8" strokeWidth="0.8" filter="url(#eglow-s)">
              <animate attributeName="stroke-dasharray" values="0 1800;260 1800;0 1800" dur="7s" repeatCount="indefinite" begin="3.1s"/>
              <animate attributeName="stroke-dashoffset" values="0;-1800" dur="7s" repeatCount="indefinite" begin="3.1s"/>
              <animate attributeName="opacity" values="0.1;0.7;0.1" dur="7s" repeatCount="indefinite" begin="3.1s"/>
            </use>
          </svg>

          {/* Modal card */}
          <div
            onClick={e => e.stopPropagation()}
            style={{
              position: 'relative', zIndex: 1000,
              maxWidth: '680px', width: '100%',
              maxHeight: '82vh', overflowY: 'auto',
              background: 'linear-gradient(145deg, rgba(4,10,30,0.95) 0%, rgba(8,18,50,0.95) 50%, rgba(4,10,30,0.95) 100%)',
              border: '1px solid rgba(56,189,248,0.18)',
              borderRadius: '20px',
              padding: '2.5rem 2.75rem',
              boxShadow: '0 0 60px rgba(14,165,233,0.15), 0 0 120px rgba(37,99,235,0.08), inset 0 1px 0 rgba(125,211,252,0.1)',
              animation: 'founderFadeIn 0.35s ease forwards',
            }}
          >
            {/* Shimmer top edge */}
            <div style={{
              position: 'absolute', top: 0, left: 0, right: 0, height: '1px', borderRadius: '20px 20px 0 0',
              background: 'linear-gradient(90deg, transparent 5%, rgba(56,189,248,0.5) 40%, rgba(186,230,253,0.7) 50%, rgba(56,189,248,0.5) 60%, transparent 95%)',
            }} />

            {/* Close button */}
            <button
              onClick={() => setFounderOpen(false)}
              style={{
                position: 'absolute', top: '1rem', right: '1.25rem',
                background: 'none', border: 'none', cursor: 'pointer',
                color: 'rgba(125,211,252,0.4)', fontSize: '1.4rem', lineHeight: 1,
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = '#7dd3fc'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = 'rgba(125,211,252,0.4)'; }}
            >
              ✕
            </button>

            {/* Heading */}
            <h2 style={{
              color: '#ffffff',
              fontSize: '1.4rem',
              fontWeight: 800,
              marginBottom: '0.5rem',
              textShadow: '0 0 18px rgba(56,189,248,0.5), 0 0 40px rgba(14,165,233,0.25)',
              letterSpacing: '0.02em',
            }}>
              ✨ Meet the Founder
            </h2>

            {/* LinkedIn badge */}
            <a
              href="https://www.linkedin.com/in/hafsabilal"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                marginBottom: '1.5rem',
                padding: '0.35rem 1rem',
                borderRadius: '9999px',
                background: 'linear-gradient(135deg, rgba(14,165,233,0.15), rgba(37,99,235,0.1))',
                border: '1px solid rgba(56,189,248,0.3)',
                color: '#7dd3fc',
                fontSize: '0.82rem',
                fontWeight: 600,
                textDecoration: 'none',
                letterSpacing: '0.04em',
                boxShadow: '0 0 14px rgba(14,165,233,0.12)',
                transition: 'all 0.2s',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLAnchorElement).style.background = 'linear-gradient(135deg, rgba(14,165,233,0.28), rgba(37,99,235,0.2))';
                (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 0 22px rgba(14,165,233,0.3)';
                (e.currentTarget as HTMLAnchorElement).style.color = '#bae6fd';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLAnchorElement).style.background = 'linear-gradient(135deg, rgba(14,165,233,0.15), rgba(37,99,235,0.1))';
                (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 0 14px rgba(14,165,233,0.12)';
                (e.currentTarget as HTMLAnchorElement).style.color = '#7dd3fc';
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              linkedin.com/in/hafsabilal
            </a>

            {/* Bio text */}
            <p style={{
              color: 'rgba(219,234,254,0.85)',
              fontSize: '1rem',
              lineHeight: 1.85,
              textShadow: '0 0 12px rgba(56,189,248,0.1)',
              margin: 0,
              letterSpacing: '0.01em',
            }}>
              Hi! I&apos;m <strong style={{ color: '#bae6fd', textShadow: '0 0 14px rgba(56,189,248,0.5)' }}>Syeda Hafsa Bilal</strong>, the founder and developer of <strong style={{ color: '#bae6fd' }}>TodoAppX</strong>, a smart productivity app designed to help users manage tasks more efficiently with the support of artificial intelligence. TodoAppX combines a clean task management system with an integrated AI chat assistant that helps users plan tasks, stay organized, and stay productive.
              <br /><br />
              Alongside building this project, I&apos;m a <strong style={{ color: '#bae6fd' }}>medical student</strong> with a strong passion for technology, artificial intelligence, and software development. I enjoy creating practical applications using Python and modern AI tools that make everyday work easier and more organized.
              <br /><br />
              I&apos;m also currently studying at the <strong style={{ color: '#bae6fd' }}>Governor Sindh Initiative for Artificial Intelligence, Web 3.0, and the Metaverse (GIAIC)</strong>, where I&apos;m learning advanced concepts in AI, agentic systems, and emerging technologies. Through projects like TodoAppX, my goal is to combine innovation, AI, and real-world usability to build tools that help people work smarter and stay productive. 🚀
            </p>
          </div>
        </div>
      )}
    </>
  );
}
