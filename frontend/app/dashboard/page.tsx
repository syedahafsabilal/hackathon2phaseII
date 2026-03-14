'use client';

import { TaskList } from '../../components/tasks/TaskList';
import { Input } from '../../components/ui/Input';
import { Textarea } from '../../components/ui/Textarea';
import { Button } from '../../components/ui/Button';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
import { UserGreeting } from '../../components/dashboard/UserGreeting';
import { useState } from 'react';
import { useTasks } from '../../context/task-context';
import { validateTask } from '../../lib/validations';

export default function DashboardPage() {
  const { tasks, addTask: addTaskToContext, loading } = useTasks();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState({ title: '', description: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => { const n = { ...prev }; delete n[name]; return n; });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateTask({ title: formData.title, description: formData.description || undefined });
    if (!validation.isValid) { setErrors(validation.errors); return; }
    setIsSubmitting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2500));
      await addTaskToContext({ title: formData.title, description: formData.description || undefined });
      setFormData({ title: '', description: '' });
      setIsFormOpen(false);
    } catch (err) {
      console.error('Error adding task:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setIsFormOpen(false);
    setFormData({ title: '', description: '' });
    setErrors({});
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '100%' }}>

      {/* Fixed centered spinner overlay during submission */}
      {isSubmitting && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 9999,
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          background: 'rgba(2,8,20,0.6)',
          backdropFilter: 'blur(6px)',
          WebkitBackdropFilter: 'blur(6px)',
        }}>
          <LoadingSpinner size="lg" />
          <p style={{
            marginTop: '1.2rem', color: '#7dd3fc', fontSize: '15px',
            fontWeight: '600', letterSpacing: '0.06em',
            textShadow: '0 0 12px rgba(56,189,248,0.6)',
          }}>
            Adding your task...
          </p>
        </div>
      )}

      {/* Welcome Card */}
      <UserGreeting />

      {/* Add Task Panel */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(10,22,53,0.65) 0%, rgba(15,27,76,0.45) 100%)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(59,130,246,0.18)',
        borderRadius: '22px',
        overflow: 'visible',
        boxShadow: '0 8px 40px rgba(0,0,0,0.35), 0 0 0 1px rgba(59,130,246,0.05)',
        position: 'relative',
        transition: 'all 0.3s ease',
      }}>
        {/* Gradient border top */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
          background: 'linear-gradient(90deg, transparent 0%, rgba(59,130,246,0.5) 25%, rgba(147,197,253,0.75) 50%, rgba(59,130,246,0.5) 75%, transparent 100%)',
        }} />

        {/* Panel Header */}
        <div
          style={{
            padding: '20px 28px',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            cursor: 'pointer',
            userSelect: 'none',
          }}
          onClick={() => setIsFormOpen(!isFormOpen)}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{
              width: '44px', height: '44px', borderRadius: '50%',
              background: 'radial-gradient(circle at 35% 35%, #38bdf8, #0284c7 50%, #1d4ed8 100%)',
              boxShadow: '0 0 8px 2px #38bdf8, 0 0 24px 6px #0284c7, 0 0 48px 10px rgba(2,132,199,0.45), inset 0 1px 0 rgba(255,255,255,0.4)',
              border: '1.5px solid #7dd3fc',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
              fontSize: '26px', color: '#ffffff', fontWeight: '300', lineHeight: 1,
              textShadow: '0 0 10px #ffffff, 0 0 20px #38bdf8',
            }}>
              +
            </div>
            <div style={{ textAlign: 'left' }}>
              <p style={{ color: 'white', fontWeight: '700', fontSize: '16px', margin: 0 }}>
                Add New Task
              </p>
              <p style={{ color: 'rgba(147,197,253,0.55)', fontSize: '13px', margin: '3px 0 0 0' }}>
                {isFormOpen ? 'Fill in the details below' : 'Click to expand and add a task'}
              </p>
            </div>
          </div>
          <span style={{
            color: 'rgba(147,197,253,0.6)', fontSize: '14px',
            transform: isFormOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.3s ease',
            display: 'inline-block',
          }}>
            ▼
          </span>
        </div>

        {/* Collapsible Form */}
        {isFormOpen && (
          <div style={{
            padding: '0 28px 28px',
            borderTop: '1px solid rgba(59,130,246,0.1)',
          }}>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px', paddingTop: '22px' }}>
              {/* Title row — label tight against input */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', transform: 'translateX(3cm)' }}>
                <label style={{
                  width: '70px', flexShrink: 0, textAlign: 'right',
                  background: 'linear-gradient(135deg, #93c5fd, #60a5fa, #a78bfa)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  fontSize: '13px', fontWeight: '700',
                  letterSpacing: '0.06em', whiteSpace: 'nowrap',
                  textTransform: 'uppercase', marginLeft: '-2cm',
                  textShadow: 'none',
                  filter: 'drop-shadow(0 0 6px rgba(147,197,253,0.4))',
                }}>
                  Title
                </label>
                <div style={{ flex: 1, marginLeft: '-6cm', marginRight: '-3cm' }}>
                  <Input
                    name="title"
                    type="text"
                    placeholder="What needs to be done?"
                    value={formData.title}
                    onChange={handleChange}
                    style={{
                      background: 'linear-gradient(135deg, rgba(4,8,24,0.98) 0%, rgba(10,18,52,0.95) 100%)',
                      border: '1px solid rgba(99,149,255,0.35)',
                      borderLeft: '3px solid rgba(99,149,255,0.8)',
                      borderRadius: '12px',
                      boxShadow: 'inset 0 2px 14px rgba(0,0,0,0.55), 0 0 0 1px rgba(99,149,255,0.06), 0 0 18px rgba(37,99,235,0.1)',
                      color: '#e2e8f0',
                      fontSize: '14px',
                      letterSpacing: '0.02em',
                      height: '2.6rem',
                      transition: 'all 0.25s ease',
                      ...(errors.title ? { borderColor: 'rgba(248,113,113,0.6)', borderLeftColor: 'rgba(248,113,113,0.8)' } : {}),
                    }}
                  />
                  {errors.title && (
                    <div style={{
                      display: 'flex', alignItems: 'center', gap: '6px',
                      marginTop: '7px',
                      padding: '6px 10px',
                      background: 'rgba(239,68,68,0.12)',
                      border: '1px solid rgba(248,113,113,0.4)',
                      borderLeft: '3px solid #f87171',
                      borderRadius: '8px',
                    }}>
                      <span style={{ color: '#fca5a5', fontSize: '13px' }}>⚠</span>
                      <p style={{ color: '#fca5a5', fontSize: '13px', fontWeight: '600', margin: 0 }}>
                        {errors.title}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Description row — label tight against textarea */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '6px', transform: 'translateX(3cm)' }}>
                <label style={{
                  width: '70px', flexShrink: 0, textAlign: 'right',
                  background: 'linear-gradient(135deg, #93c5fd, #60a5fa, #a78bfa)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  fontSize: '13px', fontWeight: '700',
                  letterSpacing: '0.06em', whiteSpace: 'nowrap',
                  textTransform: 'uppercase', paddingTop: '10px', marginLeft: '-2cm',
                  filter: 'drop-shadow(0 0 6px rgba(147,197,253,0.4))',
                }}>
                  Details
                </label>
                <div style={{ flex: 1, marginLeft: '-6cm', marginRight: '-3cm' }}>
                  <Textarea
                    name="description"
                    placeholder="Add notes or details..."
                    value={formData.description}
                    onChange={handleChange}
                    style={{
                      background: 'linear-gradient(135deg, rgba(4,8,24,0.98) 0%, rgba(10,18,52,0.95) 100%)',
                      border: '1px solid rgba(99,149,255,0.35)',
                      borderLeft: '3px solid rgba(99,149,255,0.8)',
                      borderRadius: '12px',
                      boxShadow: 'inset 0 2px 14px rgba(0,0,0,0.55), 0 0 0 1px rgba(99,149,255,0.06), 0 0 18px rgba(37,99,235,0.1)',
                      color: '#e2e8f0',
                      fontSize: '14px',
                      letterSpacing: '0.02em',
                      transition: 'all 0.25s ease',
                    }}
                  />
                  {errors.description && (
                    <p style={{ color: '#f87171', fontSize: '12px', marginTop: '5px', textAlign: 'left' }}>
                      {errors.description}
                    </p>
                  )}
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '12px', paddingTop: '4px' }}>
                <button
                  type="button"
                  onClick={handleCancel}
                  style={{
                    width: '90px', flexShrink: 0,
                    padding: '10px 0', borderRadius: '10px',
                    background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
                    color: 'rgba(255,255,255,0.65)', cursor: 'pointer', fontSize: '14px',
                    fontWeight: '500', transition: 'all 0.2s', textAlign: 'center',
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || loading}
                  style={{
                    width: 'calc(90px + 1cm)', flexShrink: 0,
                    padding: '10px 0', borderRadius: '10px',
                    background: 'linear-gradient(135deg, #1e3a8a 0%, #2563eb 40%, #38bdf8 70%, #2563eb 100%)',
                    backgroundSize: '200% 200%',
                    border: '1px solid rgba(56,189,248,0.5)',
                    boxShadow: '0 0 14px rgba(37,99,235,0.5), 0 0 28px rgba(56,189,248,0.2), inset 0 1px 0 rgba(255,255,255,0.25)',
                    color: '#ffffff', cursor: isSubmitting || loading ? 'not-allowed' : 'pointer',
                    fontSize: '14px', fontWeight: '700', transition: 'all 0.25s', textAlign: 'center',
                    opacity: isSubmitting || loading ? 0.7 : 1, overflow: 'visible',
                    letterSpacing: '0.04em', textShadow: '0 0 8px rgba(255,255,255,0.4)',
                  }}
                  onMouseEnter={e => {
                    if (!isSubmitting && !loading) {
                      (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 0 22px rgba(37,99,235,0.8), 0 0 44px rgba(56,189,248,0.35), inset 0 1px 0 rgba(255,255,255,0.3)';
                      (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-1px)';
                    }
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 0 14px rgba(37,99,235,0.5), 0 0 28px rgba(56,189,248,0.2), inset 0 1px 0 rgba(255,255,255,0.25)';
                    (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)';
                  }}
                >
                  {isSubmitting || loading ? (
                    <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', whiteSpace: 'nowrap' }}>
                      <LoadingSpinner size="md" /> Adding...
                    </span>
                  ) : '✦ Add Task'}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>

      {/* Task List */}
      <TaskList
        tasks={tasks}
        isLoading={loading}
        onAddTask={() => setIsFormOpen(true)}
      />
    </div>
  );
}
