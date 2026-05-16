import { useState, useEffect } from 'react';
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

  const [draft, setDraft] = useState(value.toFixed(decimals));

  useEffect(() => {
    setDraft(value.toFixed(decimals));
  }, [value, decimals]);

  const canDec = value - step >= min - 0.0001;
  const canInc = value + step <= max + 0.0001;

  const dec = () => canDec && onChange(round(value - step));
  const inc = () => canInc && onChange(round(value + step));

  function round(n) {
    const p = Math.pow(10, decimals);
    return Math.round(n * p) / p;
  }

  const commit = () => {
    const parsed = parseFloat(draft.replace(',', '.'));
    if (!Number.isFinite(parsed)) {
      setDraft(value.toFixed(decimals));
      return;
    }
    const clamped = Math.min(max, Math.max(min, parsed));
    const next = round(clamped);
    onChange(next);
    setDraft(next.toFixed(decimals));
  };

  const btnStyle = (enabled) => ({
    width: btnSize, height: btnSize, borderRadius: 99,
    background: T.bg3,
    border: '1px solid ' + T.line,
    cursor: enabled ? 'pointer' : 'default',
    color: enabled ? T.brand : T.textMute,
    opacity: enabled ? 1 : 0.4,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    transition: 'transform .12s, background .15s',
    flexShrink: 0,
  });

  const widthCh = Math.max(2, String(Math.floor(max)).length + (decimals ? decimals + 1 : 0));

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
        fontVariantNumeric: 'tabular-nums', minWidth: 0,
      }}>
        <input
          type="text"
          inputMode="decimal"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onBlur={commit}
          onFocus={(e) => e.target.select()}
          onKeyDown={(e) => {
            if (e.key === 'Enter') e.target.blur();
            if (e.key === 'Escape') { setDraft(value.toFixed(decimals)); e.target.blur(); }
          }}
          size={widthCh}
          aria-label="Valor"
          style={{
            fontSize: numSize, fontWeight: 300, color: T.textHi,
            lineHeight: 1, letterSpacing: -1.5,
            fontFamily: 'inherit',
            fontVariantNumeric: 'tabular-nums',
            background: 'transparent', border: 'none', outline: 'none',
            textAlign: 'center', padding: 0, margin: 0,
            caretColor: T.brand,
            minWidth: 0,
          }}
        />
        {unit && <div style={{ fontSize: unitSize, color: T.textMute, fontWeight: 500 }}>{unit}</div>}
      </div>

      <button onClick={inc} disabled={!canInc} style={btnStyle(canInc)} aria-label="Aumentar">
        <Icon name="plus" size={big ? 22 : 18} stroke={2.4}/>
      </button>
    </div>
  );
}
