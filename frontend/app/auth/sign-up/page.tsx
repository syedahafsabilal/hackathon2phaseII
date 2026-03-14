'use client';

import { useState } from 'react';
import Link from 'next/link';
import { SignUpForm } from '../../../components/auth/SignUpForm';
import UniversalBackground from '../../../components/layout/UniversalBackground';

export default function SignUpPage() {
  const [founderOpen, setFounderOpen] = useState(false);
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        boxSizing: 'border-box',
      }}
    >
      {/* Animated particle background */}
      <UniversalBackground />

      {/* Diamond sparkle stars */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 1, pointerEvents: 'none', overflow: 'hidden' }}>
        <style>{`
          @keyframes suTwinkle {
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
          { top: '67%', left: '38%', s: 1.5, tw: '3.7s', td: '1.7s' },
          { top: '70%', left: '82%', s: 2.5, tw: '2.2s', td: '2.9s' },
          { top: '75%', left: '50%', s: 1,   tw: '3.8s', td: '0.7s' },
          { top: '77%', left: '5%',  s: 2,   tw: '2.6s', td: '1.5s' },
          { top: '81%', left: '29%', s: 1.5, tw: '4.2s', td: '2.2s' },
          { top: '84%', left: '67%', s: 1,   tw: '3s',   td: '0.3s' },
          { top: '87%', left: '13%', s: 2,   tw: '2.8s', td: '1.2s' },
          { top: '89%', left: '78%', s: 1.5, tw: '3.5s', td: '2.7s' },
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
            animation: `suTwinkle ${st.tw} ease-in-out infinite ${st.td}`,
          }} />
        ))}
      </div>

      {/* ── Navbar ── */}
      <nav
        style={{
          position: 'relative',
          zIndex: 100,
          width: '100%',
          height: '5rem',
          flexShrink: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingLeft: '1.5rem',
          paddingRight: '3rem',
          background: 'linear-gradient(135deg, #0F1B4C, #1E3A8A, #2563EB, #1E3A8A, #0F1B4C)',
          boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
        }}
      >
        {/* Logo — links home */}
        <Link href="/" style={{ textDecoration: 'none' }}>
          <div
            style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', lineHeight: 1, cursor: 'pointer' }}
            onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.opacity = '0.85'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.opacity = '1'; }}
          >
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
          <style>{`@keyframes suNavStar{0%,100%{opacity:.2;transform:rotate(45deg) scale(1)}50%{opacity:1;transform:rotate(45deg) scale(2.2)}}`}</style>
          <span style={{ position: 'relative', display: 'inline-flex', alignItems: 'center' }}>
            {[
              { top:'-8px',  left:'-10px', s:2.5, tw:'1.8s', td:'0s'   },
              { top:'-10px', left:'50%',   s:2,   tw:'2.2s', td:'0.4s' },
              { top:'-7px',  right:'-10px',s:2.5, tw:'1.6s', td:'0.8s' },
              { top:'50%',   left:'-12px', s:2,   tw:'2.4s', td:'1.1s' },
              { top:'50%',   right:'-12px',s:2,   tw:'1.9s', td:'0.6s' },
              { bottom:'-8px',left:'-8px', s:2,   tw:'2.1s', td:'1.3s' },
              { bottom:'-9px',left:'50%',  s:2.5, tw:'1.7s', td:'0.3s' },
              { bottom:'-8px',right:'-8px',s:2,   tw:'2s',   td:'0.9s' },
            ].map((sp, i) => (
              <span key={i} style={{
                position:'absolute', top:(sp as {top?:string}).top, left:(sp as {left?:string}).left,
                right:(sp as {right?:string}).right, bottom:(sp as {bottom?:string}).bottom,
                width:`${sp.s}px`, height:`${sp.s}px`,
                background: i%2===0?'#ffd700':'#ffe9a0',
                boxShadow:'0 0 4px #ffd700, 0 0 10px #ffd700, 0 0 20px #f0d98a88',
                pointerEvents:'none', transform:'rotate(45deg)',
                animation:`suNavStar ${sp.tw} ease-in-out infinite ${sp.td}`,
              }}/>
            ))}
            <button
              onClick={() => setFounderOpen(true)}
              style={{
                background:'none', border:'none', cursor:'pointer', padding:0,
                color:'#f0d98a', fontSize:'1.25rem', fontWeight:700, lineHeight:1,
                textShadow:'0 0 10px rgba(255,215,0,0.4), 0 0 22px rgba(255,215,0,0.18)',
                transition:'color 0.2s',
              }}
              onMouseEnter={e=>{(e.currentTarget as HTMLButtonElement).style.color='#ffe9a0';}}
              onMouseLeave={e=>{(e.currentTarget as HTMLButtonElement).style.color='#f0d98a';}}
            >Founder</button>
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

      {/* ── Centered form area ── */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1.5rem 1rem',
          overflowY: 'auto',
          position: 'relative',
          zIndex: 10,
        }}
      >
        {/* Form card */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: '34rem',
            background: 'linear-gradient(145deg, #080e1f 0%, #0f172a 50%, #1a2540 100%)',
            borderRadius: '1.25rem',
            border: '1px solid rgba(59,130,246,0.2)',
            boxShadow:
              '0 32px 64px rgba(0,0,0,0.8), 0 16px 32px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04), inset 0 1px 0 rgba(255,255,255,0.08)',
            padding: '2.5rem 2rem',
          }}
        >
          {/* Top glow accent */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: '50%',
              transform: 'translateX(-50%)',
              width: '60%',
              height: '1px',
              background: 'linear-gradient(90deg, transparent, rgba(59,130,246,0.6), transparent)',
            }}
          />

          {/* Header */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '2rem' }}>
            <div
              style={{
                width: '4.5rem',
                height: '4.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, rgba(30,58,138,0.4), rgba(37,99,235,0.2))',
                border: '1px solid rgba(59,130,246,0.35)',
                boxShadow: '0 8px 24px rgba(30,58,138,0.3), inset 0 1px 0 rgba(255,255,255,0.1)',
                marginBottom: '1rem',
              }}
            >
              <span style={{ fontSize: '1.75rem' }}>✍️</span>
            </div>
            <h1 style={{ color: '#ffffff', fontSize: '1.5rem', fontWeight: 800, textAlign: 'center', margin: 0, letterSpacing: '-0.02em' }}>
              Create Account
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.875rem', marginTop: '0.375rem', textAlign: 'center' }}>
              Join us today to boost your productivity
            </p>
          </div>

          {/* Form */}
          <SignUpForm />

          {/* Footer */}
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.875rem', textAlign: 'center', marginTop: '1.5rem' }}>
            Already have an account?{' '}
            <Link href="/auth/sign-in" style={{ color: '#93c5fd', fontWeight: 600, textDecoration: 'none' }}>
              Sign In
            </Link>
          </p>
        </div>
      </div>

      {/* ── Founder Modal ── */}
      {founderOpen && (
        <div
          onClick={() => setFounderOpen(false)}
          style={{
            position: 'fixed', inset: 0, zIndex: 9999,
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
              <path id="sfe1" d="M 5vw 20vh Q 15vw 5vh 30vw 25vh Q 45vw 45vh 60vw 15vh Q 72vw 2vh 88vw 30vh"/>
              <path id="sfe2" d="M 2vw 55vh Q 18vw 40vh 35vw 60vh Q 50vw 78vh 68vw 50vh Q 80vw 35vh 98vw 58vh"/>
              <path id="sfe3" d="M 10vw 85vh Q 25vw 70vh 40vw 88vh Q 55vw 100vh 75vw 80vh Q 88vw 65vh 97vw 82vh"/>
              <path id="sfe4" d="M 0vw 38vh Q 12vw 25vh 22vw 45vh Q 32vw 62vh 18vw 75vh Q 8vw 88vh 15vw 98vh"/>
              <path id="sfe5" d="M 85vw 10vh Q 92vw 28vh 80vw 45vh Q 70vw 60vh 88vw 72vh Q 95vw 83vh 90vw 96vh"/>
              <path id="sfe6" d="M 40vw 2vh Q 50vw 18vh 38vw 35vh Q 28vw 50vh 45vw 65vh Q 58vw 80vh 42vw 95vh"/>
            </defs>
            <use href="#sfe1" fill="none" stroke="#1d4ed8" strokeWidth="3" filter="url(#eglow-l)">
              <animate attributeName="stroke-dasharray" values="0 2000;400 2000;0 2000" dur="4s" repeatCount="indefinite"/>
              <animate attributeName="stroke-dashoffset" values="0;-2000" dur="4s" repeatCount="indefinite"/>
              <animate attributeName="opacity" values="0.1;0.55;0.1" dur="4s" repeatCount="indefinite"/>
            </use>
            <use href="#sfe1" fill="none" stroke="#7dd3fc" strokeWidth="0.8" filter="url(#eglow-s)">
              <animate attributeName="stroke-dasharray" values="0 2000;300 2000;0 2000" dur="4s" repeatCount="indefinite"/>
              <animate attributeName="stroke-dashoffset" values="0;-2000" dur="4s" repeatCount="indefinite"/>
              <animate attributeName="opacity" values="0.2;0.85;0.2" dur="4s" repeatCount="indefinite"/>
            </use>
            <use href="#sfe2" fill="none" stroke="#1e40af" strokeWidth="2.5" filter="url(#eglow-l)">
              <animate attributeName="stroke-dasharray" values="0 2000;350 2000;0 2000" dur="5s" repeatCount="indefinite"/>
              <animate attributeName="stroke-dashoffset" values="0;-2000" dur="5s" repeatCount="indefinite"/>
              <animate attributeName="opacity" values="0.08;0.45;0.08" dur="5s" repeatCount="indefinite"/>
            </use>
            <use href="#sfe2" fill="none" stroke="#bae6fd" strokeWidth="0.6" filter="url(#eglow-s)">
              <animate attributeName="stroke-dasharray" values="0 2000;250 2000;0 2000" dur="5s" repeatCount="indefinite"/>
              <animate attributeName="stroke-dashoffset" values="0;-2000" dur="5s" repeatCount="indefinite"/>
              <animate attributeName="opacity" values="0.15;0.7;0.15" dur="5s" repeatCount="indefinite"/>
            </use>
            <use href="#sfe3" fill="none" stroke="#2563eb" strokeWidth="2" filter="url(#eglow-m)">
              <animate attributeName="stroke-dasharray" values="0 2000;300 2000;0 2000" dur="6s" repeatCount="indefinite"/>
              <animate attributeName="stroke-dashoffset" values="0;-2000" dur="6s" repeatCount="indefinite"/>
              <animate attributeName="opacity" values="0.1;0.4;0.1" dur="6s" repeatCount="indefinite"/>
            </use>
            <use href="#sfe4" fill="none" stroke="#0ea5e9" strokeWidth="1.5" filter="url(#eglow-m)">
              <animate attributeName="stroke-dasharray" values="0 2000;200 2000;0 2000" dur="4.5s" repeatCount="indefinite"/>
              <animate attributeName="stroke-dashoffset" values="0;-2000" dur="4.5s" repeatCount="indefinite"/>
              <animate attributeName="opacity" values="0.1;0.5;0.1" dur="4.5s" repeatCount="indefinite"/>
            </use>
            <use href="#sfe5" fill="none" stroke="#3b82f6" strokeWidth="2" filter="url(#eglow-m)">
              <animate attributeName="stroke-dasharray" values="0 2000;280 2000;0 2000" dur="5.5s" repeatCount="indefinite"/>
              <animate attributeName="stroke-dashoffset" values="0;-2000" dur="5.5s" repeatCount="indefinite"/>
              <animate attributeName="opacity" values="0.08;0.42;0.08" dur="5.5s" repeatCount="indefinite"/>
            </use>
            <use href="#sfe6" fill="none" stroke="#60a5fa" strokeWidth="1.5" filter="url(#eglow-s)">
              <animate attributeName="stroke-dasharray" values="0 2000;220 2000;0 2000" dur="3.8s" repeatCount="indefinite"/>
              <animate attributeName="stroke-dashoffset" values="0;-2000" dur="3.8s" repeatCount="indefinite"/>
              <animate attributeName="opacity" values="0.12;0.6;0.12" dur="3.8s" repeatCount="indefinite"/>
            </use>
          </svg>

          {/* Modal card */}
          <div
            onClick={e => e.stopPropagation()}
            style={{
              position: 'relative', zIndex: 10000,
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
    </div>
  );
}
