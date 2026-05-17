import { useState, useRef, useEffect } from 'react';
import { useTheme } from '../theme/ThemeProvider.jsx';
import { Icon } from '../icons/Icon.jsx';
import { STATES } from '../data/states.js';

export function RiskBanner({ risk, stateKey, onSeeDetails }) {
  const { T } = useTheme();
  const s = STATES[stateKey];
  const isLow = risk.kind === 'low';
  const isImmediate = risk.whenMin === 0;
  const tone = isImmediate ? 'danger' : 'warn';
  const c = tone === 'danger' ? T.danger : T.warn;
  const cSoft = tone === 'danger' ? T.dangerSoft : T.warnSoft;

  const [notifyState, setNotifyState] = useState('idle');
  const timeoutRef = useRef(null);
  useEffect(() => () => timeoutRef.current && clearTimeout(timeoutRef.current), []);

  const handleNotify = () => {
    setNotifyState('scheduled');
    timeoutRef.current = setTimeout(() => setNotifyState('idle'), 2000);
  };

  const title = isImmediate
    ? (isLow ? 'Leitura abaixo do alvo' : 'Leitura acima do alvo')
    : (isLow ? `Possível queda em ${risk.whenMin} min` : `Possível alta em ~${Math.round(risk.whenMin / 10) * 10} min`);

  const scheduled = notifyState === 'scheduled';

  return (
    <div style={{
      marginTop: 14, padding: '14px 14px 12px', borderRadius: 18,
      background: cSoft, border: '1px solid ' + c + '55'
    }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
        <div style={{
          width: 34, height: 34, borderRadius: 99,
          background: c + '33', color: c,
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
        }}>
          <Icon name={isLow ? 'arrowDown' : 'arrowUpRight'} size={18}/>
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 14, color: T.textHi, fontWeight: 600 }}>{title}</div>
          <div style={{ fontSize: 12.5, color: T.text, marginTop: 4, lineHeight: 1.4 }}>
            {isImmediate
              ? (isLow ? 'Sua glicose está em 58 mg/dL.' : 'Sua glicose está em 248 mg/dL e ainda subindo.')
              : `Pode atingir ~${risk.level} mg/dL nos próximos ~${risk.whenMin} min.`
            }
          </div>
          <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
            <button
              onClick={onSeeDetails}
              style={{
                fontFamily: 'inherit',
                padding: '8px 14px', borderRadius: 99,
                background: c, color: T.bg,
                fontSize: 12.5, fontWeight: 600, border: 'none', cursor: 'pointer'
              }}
            >Ver detalhes</button>
            <button
              onClick={handleNotify}
              disabled={scheduled}
              style={{
                fontFamily: 'inherit',
                padding: '8px 14px', borderRadius: 99,
                background: 'transparent',
                color: scheduled ? T.ok : T.text,
                fontSize: 12.5, fontWeight: 500,
                border: '1px solid ' + (scheduled ? T.ok + '55' : T.line2),
                cursor: scheduled ? 'default' : 'pointer',
                display: 'inline-flex', alignItems: 'center', gap: 4,
                transition: 'color .18s, border-color .18s',
              }}
            >
              {scheduled && <Icon name="check" size={14} stroke={2.4}/>}
              {scheduled ? 'Agendado' : 'Notificar em 30 minutos'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
