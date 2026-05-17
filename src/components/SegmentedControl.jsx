import { useTheme } from '../theme/ThemeProvider.jsx';

export function SegmentedControl({ options, value, onChange }) {
  const { T } = useTheme();
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
        background: T.segActive,
        border: '1px solid ' + T.segActiveBorder,
        boxShadow: T.shadowSm,
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
