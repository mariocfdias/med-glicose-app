import { useTheme } from '../theme/ThemeProvider.jsx';

export function Section({ label, hint, children }) {
  const { T } = useTheme();
  return (
    <div style={{ marginTop: 18 }}>
      {label && (
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', paddingLeft: 4, paddingRight: 4, marginBottom: 10 }}>
          <div style={{ fontSize: 11, color: T.textMute, letterSpacing: 1.2, textTransform: 'uppercase' }}>{label}</div>
          {hint && <div style={{ fontSize: 11, color: T.textMute }}>{hint}</div>}
        </div>
      )}
      {children}
    </div>
  );
}

export function Card({ children, padded = true, style }) {
  const { T } = useTheme();
  return (
    <div style={{
      background: T.bg2, border: '1px solid ' + T.line, borderRadius: 20,
      padding: padded ? '14px 14px' : 0,
      ...style,
    }}>{children}</div>
  );
}

export function Row({ children, onClick, last = false }) {
  const { T } = useTheme();
  const interactive = !!onClick;
  return (
    <div
      onClick={onClick}
      style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12,
        padding: '4px 0',
        cursor: interactive ? 'pointer' : 'default',
        borderBottom: last ? 'none' : undefined,
      }}
    >{children}</div>
  );
}

export function Divider({ inset = 0 }) {
  const { T } = useTheme();
  return <div style={{ height: 1, background: T.line, margin: `12px -14px 12px ${-14 + inset}px` }}/>;
}

export function Switch({ checked, onChange, label }) {
  const { T } = useTheme();
  return (
    <button
      onClick={() => onChange(!checked)}
      aria-pressed={checked}
      aria-label={label}
      style={{
        width: 44, height: 26, borderRadius: 99,
        background: checked ? T.brand : T.switchOff,
        border: 'none', cursor: 'pointer',
        position: 'relative', flexShrink: 0,
        transition: 'background .22s',
        padding: 0,
      }}
    >
      <div style={{
        position: 'absolute', top: 2, left: checked ? 20 : 2,
        width: 22, height: 22, borderRadius: 99, background: T.switchThumb,
        boxShadow: T.shadowSm,
        transition: 'left .22s cubic-bezier(.32,.72,.24,1)',
      }}/>
    </button>
  );
}

export function Label({ children, hint }) {
  const { T } = useTheme();
  return (
    <div style={{ flex: 1, minWidth: 0 }}>
      <div style={{ fontSize: 13.5, color: T.textHi, fontWeight: 500 }}>{children}</div>
      {hint && <div style={{ fontSize: 11.5, color: T.textMute, marginTop: 2, lineHeight: 1.35 }}>{hint}</div>}
    </div>
  );
}

export function FootnoteCard({ icon, tone = 'info', children }) {
  const { T } = useTheme();
  const c = tone === 'ok' ? T.ok : tone === 'warn' ? T.warn : tone === 'danger' ? T.danger : T.accent;
  const cSoft = tone === 'ok' ? T.okSoft : tone === 'warn' ? T.warnSoft : tone === 'danger' ? T.dangerSoft : T.accentSoft;
  return (
    <div style={{
      marginTop: 14,
      padding: '12px 14px', borderRadius: 14,
      background: cSoft,
      border: '1px solid ' + c + '33',
      display: 'flex', alignItems: 'flex-start', gap: 10,
      fontSize: 12, color: T.text, lineHeight: 1.45,
    }}>
      {icon && (
        <div style={{
          width: 22, height: 22, borderRadius: 7,
          background: c + '33', color: c,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0, marginTop: 1,
        }}>{icon}</div>
      )}
      <div style={{ flex: 1, minWidth: 0 }}>{children}</div>
    </div>
  );
}
