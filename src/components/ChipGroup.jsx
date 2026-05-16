import { useTheme } from '../theme/ThemeProvider.jsx';
import { Icon } from '../icons/Icon.jsx';

export function ChipGroup({ options, value, onChange }) {
  const { T } = useTheme();
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
      {options.map(opt => {
        const selected = value === opt.value;
        return (
          <button key={opt.value} onClick={() => onChange(opt.value)} style={{
            display: 'inline-flex', alignItems: 'center', gap: 7,
            padding: opt.icon ? '8px 14px 8px 11px' : '9px 16px',
            borderRadius: 99,
            background: selected ? T.brand : T.bg3,
            color: selected ? '#E8F5EE' : T.text,
            border: '1px solid ' + (selected ? 'transparent' : T.line),
            fontFamily: 'inherit', fontSize: 13, fontWeight: 500,
            cursor: 'pointer',
            transition: 'background .18s, color .18s, border-color .18s',
            boxShadow: selected ? '0 4px 14px ' + T.brand + '40' : 'none',
          }}>
            {opt.icon && <Icon name={opt.icon} size={15} stroke={selected ? 2.2 : 1.8}/>}
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
