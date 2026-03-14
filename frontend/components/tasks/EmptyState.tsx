interface EmptyStateProps {
  onAddTask?: () => void;
}

export const EmptyState = ({ onAddTask }: EmptyStateProps) => {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      padding: '64px 24px',
      background: 'linear-gradient(135deg, rgba(10,20,50,0.5) 0%, rgba(15,27,70,0.35) 100%)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      border: '1px solid rgba(59,130,246,0.14)',
      borderRadius: '24px',
      boxShadow: '0 8px 48px rgba(0,0,0,0.3)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Top shimmer line */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
        background: 'linear-gradient(90deg, transparent 5%, rgba(147,197,253,0.3) 40%, rgba(191,219,254,0.5) 50%, rgba(147,197,253,0.3) 60%, transparent 95%)',
      }} />

      {/* Background orb */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
        width: '300px', height: '300px',
        background: 'radial-gradient(circle, rgba(37,99,235,0.05) 0%, transparent 70%)',
        borderRadius: '50%', pointerEvents: 'none',
      }} />

      {/* Icon */}
      <div style={{
        width: '84px', height: '84px', borderRadius: '24px', marginBottom: '28px',
        background: 'linear-gradient(135deg, rgba(30,58,138,0.5) 0%, rgba(37,99,235,0.28) 100%)',
        border: '1px solid rgba(59,130,246,0.28)',
        boxShadow: '0 0 40px rgba(59,130,246,0.12), inset 0 1px 0 rgba(255,255,255,0.06)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '38px',
        position: 'relative',
      }}>
        ✨
      </div>

      <h3 style={{
        fontSize: '22px', fontWeight: '700', marginBottom: '12px',
        background: 'linear-gradient(135deg, #ffffff 0%, #93c5fd 60%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        margin: '0 0 12px 0',
      }}>
        No tasks yet
      </h3>

      <p style={{
        color: 'rgba(147,197,253,0.5)', fontSize: '15px', maxWidth: '300px',
        lineHeight: '1.65', marginBottom: '36px', margin: '0 0 36px 0',
        textAlign: 'center',
      }}>
        Your journey begins with a single task. Start today and build momentum.
      </p>

      <button
        onClick={onAddTask}
        style={{
          padding: '13px 30px', borderRadius: '12px', fontSize: '15px', fontWeight: '600',
          background: 'linear-gradient(135deg, #1E3A8A 0%, #2563EB 50%, #3B82F6 100%)',
          backgroundSize: '200% 200%',
          border: 'none', color: 'white', cursor: 'pointer',
          boxShadow: '0 8px 32px rgba(37,99,235,0.4), 0 0 0 1px rgba(59,130,246,0.2)',
          transition: 'all 0.3s ease',
          letterSpacing: '0.2px',
        }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-2px)';
          (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 14px 44px rgba(37,99,235,0.6), 0 0 0 1px rgba(59,130,246,0.4)';
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)';
          (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 8px 32px rgba(37,99,235,0.4), 0 0 0 1px rgba(59,130,246,0.2)';
        }}
      >
        ✦ Add Your First Task
      </button>
    </div>
  );
};
