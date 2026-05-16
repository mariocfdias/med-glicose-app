import { useTheme } from '../theme/ThemeProvider.jsx';
import { Icon } from '../icons/Icon.jsx';

export function InsightCard({ icon, tone, title, body, onClose }) {
  const { T } = useTheme();
  const c = tone === 'ok' ? T.ok : tone === 'warn' ? T.warn : T.accent;
  const cSoft = tone === 'ok' ? T.okSoft : tone === 'warn' ? T.warnSoft : T.accentSoft;
  return (
    <div style={{
      marginTop: 14, padding: '12px 14px', borderRadius: 16,
      background: T.bg2, border: '1px solid ' + T.line,
      display: 'flex', alignItems: 'center', gap: 12
    }}>
      <div style={{
        width: 32, height: 32, borderRadius: 10,
        background: cSoft, color: c,
        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
      }}>
        <Icon name={icon} size={16}/>
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 13, color: T.textHi, fontWeight: 600 }}>{title}</div>
        <div style={{ fontSize: 12, color: T.text, marginTop: 2, lineHeight: 1.35 }}>{body}</div>
      </div>
      {onClose && (
        <button onClick={onClose} style={{
          background: 'transparent', border: 'none', color: T.textMute, cursor: 'pointer', padding: 4
        }}><Icon name="x" size={14}/></button>
      )}
    </div>
  );
}
