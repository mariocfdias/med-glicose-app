import { useTheme } from '../theme/ThemeProvider.jsx';

export function StatCard({ label, value, sub, tone }) {
  const { T } = useTheme();
  const c = tone === 'ok' ? T.ok : tone === 'warn' ? T.warn : tone === 'danger' ? T.danger : T.textHi;
  return (
    <div style={{ background: T.bg2, border: '1px solid ' + T.line, borderRadius: 18, padding: '14px 12px' }}>
      <div style={{ fontSize: 10, color: T.textMute, letterSpacing: 1.2, textTransform: 'uppercase' }}>{label}</div>
      <div style={{ fontSize: 22, color: c, fontWeight: 500, marginTop: 6, fontVariantNumeric: 'tabular-nums' }}>{value}</div>
      <div style={{ fontSize: 10, color: T.textMute, marginTop: 2 }}>{sub}</div>
    </div>
  );
}
