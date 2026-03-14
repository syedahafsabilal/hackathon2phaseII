'use client';

interface MessageBubbleProps {
  role: 'user' | 'assistant' | 'error';
  content: string;
  timestamp?: string;
}

export default function MessageBubble({ role, content, timestamp }: MessageBubbleProps) {
  const isUser = role === 'user';
  const isError = role === 'error';

  return (
    <div style={{
      display: 'flex',
      justifyContent: isUser ? 'flex-end' : 'flex-start',
      marginBottom: '0.75rem',
      alignItems: 'flex-end',
      gap: '0.75rem',
    }}>
      {/* AI avatar — left side */}
      {!isUser && (
        <div style={{
          width: '32px', height: '32px', borderRadius: '50%', flexShrink: 0,
          background: isError
            ? 'radial-gradient(circle, #f87171, #dc2626)'
            : 'radial-gradient(circle at 35% 35%, #38bdf8, #0284c7 50%, #1d4ed8 100%)',
          boxShadow: isError ? '0 0 8px rgba(248,113,113,0.5)' : '0 0 10px rgba(14,165,233,0.5)',
          border: isError ? '1px solid rgba(248,113,113,0.6)' : '1px solid #7dd3fc',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '14px',
        }}>
          {isError ? '⚠' : '✨'}
        </div>
      )}

      {/* Bubble */}
      <div style={{
        maxWidth: '72%',
        padding: '0.8rem 1.1rem',
        color: 'white',
        ...(isUser ? {
          background: 'linear-gradient(135deg, #1d4ed8 0%, #1e3a8a 100%)',
          boxShadow: '0 4px 16px rgba(30,58,138,0.55), inset 0 1px 0 rgba(255,255,255,0.15)',
          borderRadius: '1.25rem 1.25rem 0.25rem 1.25rem',
          border: '1px solid rgba(99,149,255,0.3)',
        } : isError ? {
          background: 'linear-gradient(135deg, #7f1d1d 0%, #450a0a 100%)',
          boxShadow: '0 4px 12px rgba(127,29,29,0.4)',
          borderRadius: '1.25rem 1.25rem 1.25rem 0.25rem',
          border: '1px solid rgba(248,113,113,0.3)',
        } : {
          background: 'linear-gradient(135deg, rgba(15,30,70,0.95) 0%, rgba(10,18,50,0.98) 100%)',
          boxShadow: '0 4px 16px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)',
          borderRadius: '1.25rem 1.25rem 1.25rem 0.25rem',
          border: '1px solid rgba(59,130,246,0.2)',
        }),
      }}>
        {!isUser && !isError && (
          <div style={{
            fontSize: '0.68rem', color: 'rgba(147,197,253,0.6)',
            marginBottom: '0.35rem', fontWeight: 600,
            letterSpacing: '0.05em', textTransform: 'uppercase',
          }}>
            AI Assistant
          </div>
        )}
        {isUser && (
          <div style={{
            fontSize: '0.68rem', color: 'rgba(191,219,254,0.6)',
            marginBottom: '0.35rem', fontWeight: 600,
            letterSpacing: '0.05em', textTransform: 'uppercase',
            textAlign: 'right',
          }}>
            You
          </div>
        )}
        <div style={{
          fontSize: '0.875rem', whiteSpace: 'pre-wrap',
          lineHeight: '1.6', color: 'rgba(255,255,255,0.93)',
        }}>
          {content}
        </div>
        {timestamp && (
          <div style={{
            fontSize: '0.68rem', marginTop: '0.35rem',
            color: isUser ? 'rgba(191,219,254,0.5)' : 'rgba(255,255,255,0.35)',
            textAlign: isUser ? 'right' : 'left',
          }}>
            {new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
        )}
      </div>

      {/* User avatar — right side */}
      {isUser && (
        <div style={{
          width: '32px', height: '32px', borderRadius: '50%', flexShrink: 0,
          background: 'linear-gradient(135deg, #1e3a8a, #2563eb)',
          boxShadow: '0 0 10px rgba(37,99,235,0.5)',
          border: '1px solid rgba(99,149,255,0.4)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '14px', color: 'white', fontWeight: 700,
        }}>
          👤
        </div>
      )}
    </div>
  );
}
