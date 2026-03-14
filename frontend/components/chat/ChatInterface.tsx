'use client';

import { useState, useEffect, useRef } from 'react';
import ChatInput from './ChatInput';
import MessageBubble from './MessageBubble';
import { LoadingSpinner } from '../ui/LoadingSpinner';
import { sendMessage, getConversation } from '../../lib/api';

interface Message {
  id: string;
  role: 'user' | 'assistant' | 'error';
  content: string;
  created_at?: string;
}

interface ChatInterfaceProps {
  userId: string;
  userName?: string;
  clearTrigger?: number;
}

export default function ChatInterface({ userId, userName, clearTrigger = 0 }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const firstName = userName?.split(' ')[0] || 'there';

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (clearTrigger > 0) {
      setMessages([]);
    }
  }, [clearTrigger]);

  useEffect(() => {
    async function loadHistory() {
      try {
        const data = await getConversation(userId);
        if (data.messages && data.messages.length > 0) {
          setMessages(
            data.messages.map((msg) => ({
              id: msg.id,
              role: msg.role,
              content: msg.content,
              created_at: msg.created_at,
            }))
          );
        }
      } catch {
        // No conversation yet — fine
      } finally {
        setInitialLoading(false);
      }
    }
    loadHistory();
  }, [userId]);

  const handleSend = async (text: string) => {
    const userMsg: Message = {
      id: `temp-${Date.now()}`,
      role: 'user',
      content: text,
      created_at: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    try {
      const response = await sendMessage(userId, text);
      const assistantMsg: Message = {
        id: `resp-${Date.now()}`,
        role: 'assistant',
        content: response.response,
        created_at: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err: any) {
      const errorMsg: Message = {
        id: `err-${Date.now()}`,
        role: 'error',
        content: err.message || 'Something went wrong. Please try again.',
        created_at: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1.25rem' }}>
        <LoadingSpinner size="lg" />
        <p style={{ color: 'rgba(125,211,252,0.7)', fontSize: '0.9rem', letterSpacing: '0.05em' }}>Loading conversation...</p>
      </div>
    );
  }

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      {/* Messages area */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem 1.75rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>

        {/* Welcome message — shown when no chat history */}
        {messages.length === 0 && (
          <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '1rem' }}>
            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-end', maxWidth: '80%' }}>
              {/* AI avatar */}
              <div style={{
                width: '32px', height: '32px', borderRadius: '50%', flexShrink: 0,
                background: 'radial-gradient(circle at 35% 35%, #38bdf8, #0284c7 50%, #1d4ed8 100%)',
                boxShadow: '0 0 10px rgba(14,165,233,0.5)', border: '1px solid #7dd3fc',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px',
              }}>✨</div>
              <div style={{
                background: 'linear-gradient(135deg, rgba(15,30,70,0.95) 0%, rgba(10,18,50,0.98) 100%)',
                border: '1px solid rgba(59,130,246,0.25)',
                borderRadius: '1.25rem 1.25rem 1.25rem 0.25rem',
                padding: '1rem 1.25rem',
                boxShadow: '0 4px 20px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)',
              }}>
                <div style={{ fontSize: '0.7rem', color: 'rgba(147,197,253,0.6)', marginBottom: '0.4rem', fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                  AI Assistant
                </div>
                <div style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.9)', lineHeight: '1.6' }}>
                  Hi {firstName}! 😊 I&apos;m your AI productivity assistant.<br />
                  I can help you <span style={{ color: '#7dd3fc', fontWeight: 600 }}>plan tasks</span>, stay productive, and organize your day.<br /><br />
                  What would you like help with today?
                </div>
                <div style={{ marginTop: '0.75rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {['📋 Add a task', '📊 Show my tasks', '💡 Suggest tasks'].map(hint => (
                    <span key={hint} style={{
                      fontSize: '0.72rem', padding: '3px 10px', borderRadius: '20px',
                      background: 'rgba(59,130,246,0.15)', border: '1px solid rgba(59,130,246,0.3)',
                      color: 'rgba(147,197,253,0.8)', cursor: 'default',
                    }}>{hint}</span>
                  ))}
                  <span style={{
                    fontSize: '0.72rem',
                    padding: '6px 14px',
                    borderRadius: '999px',
                    background: 'linear-gradient(180deg, rgba(127,29,29,0.25) 0%, rgba(185,28,28,0.18) 50%, rgba(127,29,29,0.25) 100%)',
                    border: '1px solid rgba(252,165,165,0.3)',
                    color: 'rgba(252,165,165,0.85)',
                    cursor: 'default',
                    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08), inset 0 -1px 0 rgba(0,0,0,0.15), 0 2px 6px rgba(239,68,68,0.1)',
                    letterSpacing: '0.02em',
                  }}>🗑️ Delete a task</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {messages.map((msg) => (
          <MessageBubble
            key={msg.id}
            role={msg.role}
            content={msg.content}
            timestamp={msg.created_at}
          />
        ))}

        {/* Typing indicator */}
        {loading && (
          <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '0.75rem' }}>
            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-end' }}>
              <div style={{
                width: '32px', height: '32px', borderRadius: '50%', flexShrink: 0,
                background: 'radial-gradient(circle at 35% 35%, #38bdf8, #0284c7 50%, #1d4ed8 100%)',
                boxShadow: '0 0 10px rgba(14,165,233,0.5)', border: '1px solid #7dd3fc',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px',
              }}>✨</div>
              <div style={{
                background: 'linear-gradient(135deg, rgba(15,30,70,0.95) 0%, rgba(10,18,50,0.98) 100%)',
                border: '1px solid rgba(59,130,246,0.2)',
                borderRadius: '1.25rem 1.25rem 1.25rem 0.25rem',
                padding: '0.85rem 1.1rem',
                boxShadow: '0 4px 16px rgba(0,0,0,0.35)',
              }}>
                <div style={{ fontSize: '0.7rem', color: 'rgba(147,197,253,0.6)', marginBottom: '0.4rem', fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                  AI Assistant
                </div>
                <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
                  {[0, 150, 300].map((delay) => (
                    <span key={delay} style={{
                      width: '7px', height: '7px', borderRadius: '50%',
                      background: 'linear-gradient(135deg, #38bdf8, #7dd3fc)',
                      boxShadow: '0 0 6px rgba(56,189,248,0.6)',
                      display: 'inline-block',
                      animation: 'bounce 1.2s infinite ease-in-out',
                      animationDelay: `${delay}ms`,
                    }} />
                  ))}
                  <style>{`@keyframes bounce { 0%,80%,100%{transform:translateY(0)} 40%{transform:translateY(-6px)} }`}</style>
                </div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <ChatInput onSend={handleSend} disabled={loading} />
    </div>
  );
}
