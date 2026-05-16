import { useTheme } from '../theme/ThemeProvider.jsx';

export function SegmentedControl({ options, value, onChange }) {
  const { T, mode } = useTheme();
  const idx = Math.max(0, options.findIndex(o => o.value === value));
  const segPct = 100 / options.length;

  return (
    <div style={{
      position: 'relative',
      display: 'grid',
      gridTemplateColumns: `repeat(${options.length}, 1fr)`,
      padding: 3,
      borderRadius: 12,
      background: T.bg3,
      border: '1px solid ' + T.line,
      fontFamily: 'inherit',
    }}>
      <div style={{
        position: 'absolute',
        top: 3, bottom: 3,
        left: `calc(${idx * segPct}% + 3px)`,
        width: `calc(${segPct}% - 6px)`,
        borderRadius: 9,
        background: mode === 'dark' ? 'rgba(255,255,255,0.08)' : '#FFFFFF',
        border: '1px solid ' + (mode === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(11,16,32,0.06)'),
        boxShadow: mode === 'dark'
          ? '0 1px 2px rgba(0,0,0,0.4)'
          : '0 1px 3px rgba(11,16,32,0.10), 0 1px 1px rgba(11,16,32,0.04)',
        transition: 'left .26s cubic-bezier(.32,.72,.24,1)',
        zIndex: 0,
      }}/>
      {options.map((opt, i) => {
        const active = i === idx;
        return (
          <button key={opt.value} onClick={() => onChange(opt.value)} style={{
            position: 'relative', zIndex: 1,
            padding: '9px 6px',
            background: 'transparent', border: 'none', cursor: 'pointer',
            color: active ? T.textHi : T.textMute,
            fontFamily: 'inherit', fontSize: 13, fontWeight: active ? 600 : 500,
            transition: 'color .18s, font-weight .18s',
          }}>
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
