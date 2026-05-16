import { useTheme } from '../theme/ThemeProvider.jsx';
import { Icon } from '../icons/Icon.jsx';

export function NumericStepper({
  value, onChange,
  step = 1, min = 0, max = Infinity,
  unit = '', decimals = 0,
  size = 'lg',
}) {
  const { T } = useTheme();
  const big = size === 'lg';
  const btnSize = big ? 56 : 44;
  const numSize = big ? 64 : 44;
  const unitSize = big ? 16 : 13;

  const canDec = value - step >= min - 0.0001;
  const canInc = value + step <= max + 0.0001;

  const dec = () => canDec && onChange(round(value - step));
  const inc = () => canInc && onChange(round(value + step));

  function round(n) {
    const p = Math.pow(10, decimals);
    return Math.round(n * p) / p;
  }

  const btnStyle = (enabled) => ({
    width: btnSize, height: btnSize, borderRadius: 99,
    background: T.bg3,
    border: '1px solid ' + T.line,
    cursor: enabled ? 'pointer' : 'default',
    color: enabled ? T.brand : T.textMute,
    opacity: enabled ? 1 : 0.4,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    transition: 'transform .12s, background .15s',
  });

  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: big ? '8px 6px' : '4px 0',
    }}>
      <button onClick={dec} disabled={!canDec} style={btnStyle(canDec)} aria-label="Diminuir">
        <Icon name="minus" size={big ? 22 : 18} stroke={2.4}/>
      </button>

      <div style={{
        flex: 1, display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: 6,
        fontVariantNumeric: 'tabular-nums',
      }}>
        <div style={{
          fontSize: numSize, fontWeight: 300, color: T.textHi,
          lineHeight: 1, letterSpacing: -1.5,
        }}>
          {value.toFixed(decimals)}
        </div>
        {unit && <div style={{ fontSize: unitSize, color: T.textMute, fontWeight: 500 }}>{unit}</div>}
      </div>

      <button onClick={inc} disabled={!canInc} style={btnStyle(canInc)} aria-label="Aumentar">
        <Icon name="plus" size={big ? 22 : 18} stroke={2.4}/>
      </button>
    </div>
  );
}
