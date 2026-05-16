import { useMemo } from 'react';
import { useTheme } from '../theme/ThemeProvider.jsx';
import { STATES, generateCurve } from '../data/states.js';
import { GlucoseChart } from '../components/GlucoseChart.jsx';
import { NightRiskGauge } from '../components/NightRiskGauge.jsx';
import { PatternRow } from '../components/PatternRow.jsx';

export function PatternsScreen({ stateKey }) {
  const { T } = useTheme();
  const s = STATES[stateKey];
  const data = useMemo(() => generateCurve(stateKey), [stateKey]);
  return (
    <div style={{ padding: '8px 20px 24px', color: T.textHi }}>
      <div style={{ fontSize: 11, color: T.textMute, letterSpacing: 1.2, textTransform: 'uppercase' }}>Últimos 7 dias</div>
      <div style={{ fontSize: 24, fontWeight: 500, marginTop: 4 }}>Padrões</div>

      <div style={{ marginTop: 18, background: T.bg2, border: '1px solid ' + T.line, borderRadius: 20, padding: '16px 16px 8px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <div style={{ fontSize: 13, color: T.text }}>Tempo no alvo</div>
          <div style={{ fontSize: 22, color: T.ok, fontWeight: 500 }}>{s.timeInRange}%</div>
        </div>
        <div style={{ height: 10, background: T.bg3, borderRadius: 99, marginTop: 10, overflow: 'hidden', display: 'flex' }}>
          <div style={{ width: '12%', background: T.danger }}/>
          <div style={{ width: '8%', background: T.warn }}/>
          <div style={{ width: s.timeInRange + '%', background: T.ok }}/>
          <div style={{ flex: 1, background: T.warn }}/>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6, fontSize: 10, color: T.textMute }}>
          <span>Muito baixo 1%</span><span>Baixo 5%</span><span>No alvo {s.timeInRange}%</span><span>Alto {Math.max(0, 100 - s.timeInRange - 6)}%</span>
        </div>
      </div>

      <div style={{ marginTop: 14, background: T.bg2, border: '1px solid ' + T.line, borderRadius: 20, padding: 16 }}>
        <div style={{ fontSize: 11, color: T.textMute, letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 10 }}>Dia típico</div>
        <GlucoseChart data={data} tone="info" forecast={false}/>
      </div>

      <div style={{ marginTop: 14, fontSize: 11, color: T.textMute, letterSpacing: 1.2, textTransform: 'uppercase' }}>Padrões detectados</div>

      <NightRiskGauge value={s.nightRisk}/>

      <PatternRow icon="moon" title="Variações noturnas recorrentes" body="3 variações abaixo do alvo entre 02h e 04h nos últimos 7 dias." tone="warn"/>
      <PatternRow icon="food" title="Pico pós‑almoço" body="Média de +84 mg/dL 60 min após o almoço." tone="warn"/>
      <PatternRow icon="walk" title="Após caminhada" body="Glicose registrou queda média de 28 mg/dL nos 15 min seguintes." tone="ok"/>
    </div>
  );
}
