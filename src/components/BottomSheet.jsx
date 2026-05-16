import { useEffect, useState } from 'react';
import { useTheme } from '../theme/ThemeProvider.jsx';

export function BottomSheet({ open, onClose, heightPercent = 92, children }) {
  const { T } = useTheme();
  const [mounted, setMounted] = useState(open);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (open) {
      setMounted(true);
      requestAnimationFrame(() => requestAnimationFrame(() => setVisible(true)));
    } else if (mounted) {
      setVisible(false);
      const t = setTimeout(() => setMounted(false), 280);
      return () => clearTimeout(t);
    }
  }, [open, mounted]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === 'Escape') onClose?.(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!mounted) return null;

  return (
    <div style={{
      position: 'absolute', inset: 0, zIndex: 80,
      pointerEvents: visible ? 'auto' : 'none',
    }}>
      <div
        onClick={onClose}
        style={{
          position: 'absolute', inset: 0,
          background: T.overlay,
          opacity: visible ? 1 : 0,
          transition: 'opacity .26s ease-out',
          backdropFilter: 'blur(2px)',
          WebkitBackdropFilter: 'blur(2px)',
        }}
      />
      <div style={{
        position: 'absolute', left: 0, right: 0, bottom: 0,
        height: `${heightPercent}%`,
        background: T.bg,
        borderRadius: '24px 24px 0 0',
        boxShadow: '0 -24px 60px rgba(0,0,0,0.35)',
        transform: visible ? 'translateY(0)' : 'translateY(100%)',
        transition: 'transform .32s cubic-bezier(.32,.72,.24,1)',
        display: 'flex', flexDirection: 'column',
        overflow: 'hidden',
      }}>
        <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 8, paddingBottom: 4, flexShrink: 0 }}>
          <div style={{
            width: 36, height: 4, borderRadius: 99,
            background: T.textMute, opacity: 0.4,
          }}/>
        </div>
        {children}
      </div>
    </div>
  );
}
