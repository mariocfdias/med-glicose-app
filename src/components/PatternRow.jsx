import { useTheme } from '../theme/ThemeProvider.jsx';
import { Icon } from '../icons/Icon.jsx';

export function PatternRow({ icon, title, body, tone }) {
  const { T } = useTheme();
  const c = tone === 'ok' ? T.ok : tone === 'warn' ? T.warn : T.danger;
  const cSoft = tone === 'ok' ? T.okSoft : tone === 'warn' ? T.warnSoft : T.dangerSoft;
  return (
    <div style={{ marginTop: 10, padding: 14, background: T.bg2, border: '1px solid ' + T.line, borderRadius: 16, display: 'flex', alignItems: 'center', gap: 12 }}>
      <div style={{ width: 36, height: 36, borderRadius: 12, background: cSoft, color: c, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <Icon name={icon} size={18}/>
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 13.5, fontWeight: 600 }}>{title}</div>
        <div style={{ fontSize: 12, color: T.text, marginTop: 2, lineHeight: 1.35 }}>{body}</div>
      </div>
      <Icon name="arrowRight" size={16} color={T.textMute}/>
    </div>
  );
}
