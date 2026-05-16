import { useTheme } from '../theme/ThemeProvider.jsx';
import { Icon } from '../icons/Icon.jsx';

export function LogTile({ icon, label, onClick }) {
  const { T } = useTheme();
  return (
    <button onClick={onClick} style={{
      background: T.bg2, border: '1px solid ' + T.line, borderRadius: 18,
      padding: '14px 10px', color: T.text, cursor: 'pointer',
      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
      fontFamily: 'inherit'
    }}>
      <div style={{
        width: 34, height: 34, borderRadius: 10,
        background: T.bg3, display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: T.brand
      }}>
        <Icon name={icon} size={18} stroke={1.8}/>
      </div>
      <div style={{ fontSize: 12, fontWeight: 500 }}>{label}</div>
    </button>
  );
}
