import { useRef } from 'react';
import { useTheme } from '../theme/ThemeProvider.jsx';
import { Icon } from '../icons/Icon.jsx';

function formatHM(date) {
  const h = String(date.getHours()).padStart(2, '0');
  const m = String(date.getMinutes()).padStart(2, '0');
  return `${h}:${m}`;
}

function parseHM(str) {
  const [h, m] = str.split(':').map(Number);
  const d = new Date();
  d.setHours(h ?? 0, m ?? 0, 0, 0);
  return d;
}

export function TimeField({ value = 'now', onChange }) {
  const { T } = useTheme();
  const inputRef = useRef(null);
  const isNow = value === 'now';
  const display = isNow ? 'Agora' : formatHM(value);

  const openPicker = () => {
    const el = inputRef.current;
    if (!el) return;
    if (typeof el.showPicker === 'function') {
      try { el.showPicker(); return; } catch (e) {}
    }
    el.focus();
    el.click();
  };

  return (
    <div style={{ position: 'relative' }}>
      <button onClick={openPicker} style={{
        display: 'inline-flex', alignItems: 'center', gap: 7,
        padding: '8px 14px 8px 12px',
        borderRadius: 99,
        background: isNow ? T.brandSoft : T.bg3,
        color: isNow ? T.brand : T.textHi,
        border: '1px solid ' + (isNow ? 'transparent' : T.line),
        fontFamily: 'inherit', fontSize: 13, fontWeight: 600,
        cursor: 'pointer',
        fontVariantNumeric: 'tabular-nums',
      }}>
        <Icon name="clock" size={14} stroke={2}/>
        {display}
      </button>
      <input
        ref={inputRef}
        type="time"
        defaultValue={isNow ? formatHM(new Date()) : formatHM(value)}
        onChange={(e) => {
          if (!e.target.value) return;
          onChange?.(parseHM(e.target.value));
        }}
        style={{
          position: 'absolute', left: 0, top: '100%',
          width: 1, height: 1, opacity: 0, pointerEvents: 'none',
        }}
      />
    </div>
  );
}
