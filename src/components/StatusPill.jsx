import { useTheme } from '../theme/ThemeProvider.jsx';

export function StatusPill({ tone, text }) {
  const { T } = useTheme();
  const map = {
    ok: { bg: T.okSoft, fg: T.ok },
    warn: { bg: T.warnSoft, fg: T.warn },
    danger: { bg: T.dangerSoft, fg: T.danger },
    info: { bg: T.accentSoft, fg: T.accent },
  };
  const c = map[tone] || map.info;
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      fontSize: 11, fontWeight: 600, letterSpacing: 0.2,
      padding: '4px 9px', borderRadius: 99,
      background: c.bg, color: c.fg, textTransform: 'uppercase'
    }}>
      <span style={{ width: 6, height: 6, borderRadius: 99, background: c.fg }}/>
      {text}
    </span>
  );
}
