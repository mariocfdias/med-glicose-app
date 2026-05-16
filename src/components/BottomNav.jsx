import { useTheme } from '../theme/ThemeProvider.jsx';
import { Icon } from '../icons/Icon.jsx';

export function BottomNav({ tab, setTab, onPrimaryAction }) {
  const { T } = useTheme();
  const items = [
    { id: 'home', label: 'Início', icon: 'home' },
    { id: 'patterns', label: 'Padrões', icon: 'chart' },
    { id: 'add', label: '', icon: 'plus', primary: true },
    { id: 'alerts', label: 'Alertas', icon: 'bell' },
    { id: 'more', label: 'Mais', icon: 'menu' },
  ];
  return (
    <div style={{
      flexShrink: 0,
      padding: '10px 14px 34px',
      background: T.bg,
      borderTop: '1px solid ' + T.line,
      display: 'flex', justifyContent: 'space-around', alignItems: 'flex-end'
    }}>
      {items.map(it => (
        <button key={it.id || it.label}
          onClick={() => it.primary ? onPrimaryAction?.() : (it.id && setTab(it.id))}
          style={{
            background: 'transparent', border: 'none', cursor: 'pointer',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
            color: tab === it.id ? T.brand : T.textMute,
            fontFamily: 'inherit', padding: '6px 8px'
          }}>
          {it.primary ? (
            <div style={{
              width: 50, height: 50, borderRadius: 99, background: T.brand,
              color: '#E8F5EE', display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 10px 30px ' + T.brand + '88', marginTop: -18
            }}>
              <Icon name="plus" size={26} stroke={2.2}/>
            </div>
          ) : (
            <Icon name={it.icon} size={22} stroke={tab === it.id ? 2.2 : 1.7}/>
          )}
          {it.label && <div style={{ fontSize: 10, fontWeight: 500 }}>{it.label}</div>}
        </button>
      ))}
    </div>
  );
}
