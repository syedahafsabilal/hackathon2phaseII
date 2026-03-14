'use client';

import { useState, KeyboardEvent } from 'react';

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export default function ChatInput({ onSend, disabled = false }: ChatInputProps) {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    const trimmed = message.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setMessage('');
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const canSend = !disabled && message.trim().length > 0;

  return (
    <div style={{
      padding: '1rem 1.75rem 1.25rem',
      borderTop: '1px solid rgba(59,130,246,0.15)',
      background: 'linear-gradient(135deg, rgba(10,20,50,0.6) 0%, rgba(5,10,30,0.8) 100%)',
      display: 'flex', alignItems: 'center', gap: '0.75rem',
    }}>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={disabled ? 'Waiting for response...' : 'Ask me anything... e.g. "Add a task to buy groceries"'}
        disabled={disabled}
        style={{
          flex: 1,
          padding: '0.85rem 1.25rem',
          borderRadius: '14px',
          background: 'linear-gradient(135deg, rgba(4,8,24,0.98) 0%, rgba(10,18,52,0.95) 100%)',
          border: '1px solid rgba(59,130,246,0.35)',
          boxShadow: 'inset 0 2px 12px rgba(0,0,0,0.5), 0 0 0 1px rgba(59,130,246,0.06)',
          color: '#ffffff',
          fontSize: '0.9rem',
          outline: 'none',
          transition: 'all 0.2s ease',
          opacity: disabled ? 0.5 : 1,
        }}
        onFocus={e => {
          e.currentTarget.style.border = '1px solid rgba(56,189,248,0.7)';
          e.currentTarget.style.boxShadow = 'inset 0 2px 12px rgba(0,0,0,0.5), 0 0 0 3px rgba(56,189,248,0.12), 0 0 20px rgba(14,165,233,0.1)';
        }}
        onBlur={e => {
          e.currentTarget.style.border = '1px solid rgba(59,130,246,0.35)';
          e.currentTarget.style.boxShadow = 'inset 0 2px 12px rgba(0,0,0,0.5), 0 0 0 1px rgba(59,130,246,0.06)';
        }}
      />
      <button
        onClick={handleSend}
        disabled={!canSend}
        style={{
          padding: '0.85rem 1.5rem',
          borderRadius: '14px',
          background: canSend
            ? 'linear-gradient(135deg, #374151 0%, #6b7280 40%, #9ca3af 60%, #6b7280 80%, #374151 100%)'
            : 'rgba(255,255,255,0.06)',
          border: canSend ? '1px solid rgba(209,213,219,0.4)' : '1px solid rgba(255,255,255,0.1)',
          boxShadow: canSend
            ? '0 0 14px rgba(156,163,175,0.4), 0 0 28px rgba(209,213,219,0.2), inset 0 1px 0 rgba(255,255,255,0.35), inset 0 -1px 0 rgba(0,0,0,0.2)'
            : 'none',
          color: canSend ? '#ffffff' : 'rgba(255,255,255,0.35)',
          fontSize: '0.9rem', fontWeight: 700,
          cursor: canSend ? 'pointer' : 'not-allowed',
          transition: 'all 0.25s ease',
          letterSpacing: '0.03em',
          textShadow: canSend ? '0 0 8px rgba(255,255,255,0.6), 0 0 16px rgba(255,255,255,0.3)' : 'none',
          whiteSpace: 'nowrap',
        }}
        onMouseEnter={e => {
          if (canSend) {
            (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 0 20px rgba(156,163,175,0.6), 0 0 40px rgba(209,213,219,0.3), inset 0 1px 0 rgba(255,255,255,0.45)';
            (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-1px)';
          }
        }}
        onMouseLeave={e => {
          if (canSend) {
            (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 0 14px rgba(156,163,175,0.4), 0 0 28px rgba(209,213,219,0.2), inset 0 1px 0 rgba(255,255,255,0.35), inset 0 -1px 0 rgba(0,0,0,0.2)';
            (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)';
          }
        }}
      >
        ➤ Send
      </button>
    </div>
  );
}
