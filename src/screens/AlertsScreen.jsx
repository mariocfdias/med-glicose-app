import { useState } from 'react';
import { useTheme } from '../theme/ThemeProvider.jsx';
import { Icon } from '../icons/Icon.jsx';
import { STATES } from '../data/states.js';

export function AlertsScreen({ stateKey }) {
  const { T } = useTheme();
  const s = STATES[stateKey];
  const [dismissed, setDismissed] = useState(false);
  const items = dismissed ? [] : [
    s.risk ? { tone: s.risk.whenMin === 0 ? 'danger' : 'warn', when: s.risk.whenMin === 0 ? 'agora' : `em ${s.risk.whenMin} min`, title: s.risk.kind === 'low' ? 'Leitura baixa prevista' : 'Leitura alta prevista', body: s.forecastMessage } : null,
    { tone: 'info', when: 'há 2 h', title: 'Pico pós‑almoço', body: 'Glicose subiu para 184 mg/dL após o almoço.' },
    { tone: 'ok', when: 'há 6 h', title: 'Boa noite', body: 'Você ficou 96% no alvo entre 0h e 6h.' },
    { tone: 'info', when: 'ontem', title: 'Sensor renovado', body: '10 dias restantes. Renovar até 21/05.' },
  ].filter(Boolean);

  return (
    <div style={{ padding: '8px 20px 24px', color: T.textHi }}>
      <div style={{ fontSize: 11, color: T.textMute, letterSpacing: 1.2, textTransform: 'uppercase' }}>Notificações inteligentes</div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginTop: 4 }}>
        <div style={{ fontSize: 24, fontWeight: 500 }}>Alertas</div>
        <button onClick={() => setDismissed(true)} style={{ background: 'transparent', border: 'none', color: T.accent, fontSize: 13, fontFamily: 'inherit', cursor: 'pointer' }}>Marcar lidas</button>
      </div>

      <div style={{ marginTop: 14 }}>
        {items.map((it, i) => {
          const c = it.tone === 'danger' ? T.danger : it.tone === 'warn' ? T.warn : it.tone === 'ok' ? T.ok : T.accent;
          const cSoft = it.tone === 'danger' ? T.dangerSoft : it.tone === 'warn' ? T.warnSoft : it.tone === 'ok' ? T.okSoft : T.accentSoft;
          return (
            <div key={i} style={{ marginTop: 10, padding: 14, background: T.bg2, border: '1px solid ' + T.line, borderRadius: 16, display: 'flex', gap: 12, alignItems: 'flex-start' }}>
              <div style={{ width: 36, height: 36, borderRadius: 12, background: cSoft, color: c, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Icon name={it.tone === 'ok' ? 'check' : it.tone === 'info' ? 'info' : 'sparkles'} size={17}/>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8, alignItems: 'baseline' }}>
                  <div style={{ fontSize: 13.5, fontWeight: 600 }}>{it.title}</div>
                  <div style={{ fontSize: 10.5, color: T.textMute, flexShrink: 0 }}>{it.when}</div>
                </div>
                <div style={{ fontSize: 12, color: T.text, marginTop: 3, lineHeight: 1.4 }}>{it.body}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
