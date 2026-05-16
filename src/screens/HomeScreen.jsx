import { useMemo, useState } from 'react';
import { useTheme } from '../theme/ThemeProvider.jsx';
import { Icon } from '../icons/Icon.jsx';
import { STATES, generateCurve } from '../data/states.js';
import { Bee } from '../components/Bee.jsx';
import { GlucoseChart } from '../components/GlucoseChart.jsx';
import { RiskBanner } from '../components/RiskBanner.jsx';
import { InsightCard } from '../components/InsightCard.jsx';
import { StatCard } from '../components/StatCard.jsx';
import { LogTile } from '../components/LogTile.jsx';

export function HomeScreen({ stateKey, setStateKey, onRegister }) {
  const { T } = useTheme();
  const s = STATES[stateKey];
  const data = useMemo(() => generateCurve(stateKey), [stateKey]);
  const toneColor = s.tone === 'ok' ? T.ok : s.tone === 'warn' ? T.warn : T.danger;
  const stateOrder = ['normal', 'rising', 'high', 'lowSoon', 'low'];
  const [showInsight, setShowInsight] = useState(true);

  return (
    <div style={{ padding: '8px 20px 24px', color: T.textHi, fontFamily: 'inherit' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
        <div>
          <div style={{ fontSize: 11, color: T.textMute, letterSpacing: 1.2, textTransform: 'uppercase' }}>Bom dia, Lara</div>
          <div style={{ fontSize: 15, color: T.text, marginTop: 2 }}>{new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' }).replace(/^./, c => c.toUpperCase())}</div>
        </div>
        <button onClick={() => {
          const i = stateOrder.indexOf(stateKey);
          setStateKey(stateOrder[(i + 1) % stateOrder.length]);
        }} style={{
          width: 38, height: 38, borderRadius: 99, background: T.bg3, border: '1px solid ' + T.line,
          display: 'flex', alignItems: 'center', justifyContent: 'center', color: T.text, cursor: 'pointer'
        }}>
          <Icon name="bell" size={18}/>
        </button>
      </div>

      <div style={{
        background: T.bg2, borderRadius: 24, padding: '22px 20px',
        border: '1px solid ' + T.line,
        position: 'relative', overflow: 'hidden'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div style={{ fontSize: 11, color: T.textMute, letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 6 }}>Sua glicose</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
              <div style={{ fontSize: 64, fontWeight: 300, color: toneColor, lineHeight: 1, fontVariantNumeric: 'tabular-nums', letterSpacing: -2 }}>
                {s.now}
              </div>
              <div style={{ fontSize: 14, color: T.textMute, fontWeight: 500 }}>mg/dL</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 8 }}>
              <span style={{ fontSize: 18, color: toneColor, lineHeight: 1 }}>{s.trendArrow}</span>
              <span style={{ fontSize: 13, color: T.text }}>{s.label}</span>
            </div>
          </div>
          <Bee mood={s.mascotMood} frame={120}/>
        </div>

        <div style={{
          marginTop: 18, padding: '14px 14px', borderRadius: 16,
          background: T.bg3, border: '1px solid ' + T.line,
          display: 'flex', alignItems: 'center', gap: 12
        }}>
          <div style={{
            width: 36, height: 36, borderRadius: 99,
            background: toneColor + '22',
            display: 'flex', alignItems: 'center', justifyContent: 'center', color: toneColor, flexShrink: 0
          }}>
            <Icon name="sparkles" size={16}/>
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 11, color: T.textMute, letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 2 }}>
              Previsão em 100 min
            </div>
            <div style={{ fontSize: 15, color: T.textHi, fontWeight: 500, lineHeight: 1.35 }}>
              {s.forecastMessage}
            </div>
          </div>
          <div style={{ textAlign: 'right', flexShrink: 0 }}>
            <div style={{ fontSize: 22, fontWeight: 500, color: toneColor, lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>~{s.forecastIn2h}</div>
            <div style={{ fontSize: 10, color: T.textMute, marginTop: 3 }}>{s.forecastConfidence}% conf.</div>
          </div>
        </div>

        <div style={{ marginTop: 14, marginLeft: -4, marginRight: -4 }}>
          <GlucoseChart data={data} tone={s.tone}/>
        </div>
      </div>

      {s.risk && <RiskBanner risk={s.risk} stateKey={stateKey}/>}

      {showInsight && stateKey === 'normal' && (
        <InsightCard
          icon="shield"
          tone="ok"
          title="Boa noite de sono"
          body="Você ficou 96% no alvo entre 0h e 6h. Continue assim."
          onClose={() => setShowInsight(false)}
        />
      )}
      {stateKey === 'rising' && (
        <InsightCard
          icon="food"
          tone="warn"
          title="Padrão pós-refeição"
          body="Sua glicose costuma subir cerca de 30 min após o almoço."
        />
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginTop: 16 }}>
        <StatCard label="No alvo" value={s.timeInRange + '%'} sub="hoje" tone={s.timeInRange >= 70 ? 'ok' : s.timeInRange >= 50 ? 'warn' : 'danger'}/>
        <StatCard label="Média 7d" value={s.avg7} sub="mg/dL"/>
        <StatCard label="Vs. ontem" value={(s.yesterdayDelta >= 0 ? '+' : '') + s.yesterdayDelta} sub="mg/dL" tone={Math.abs(s.yesterdayDelta) > 15 ? 'warn' : 'ok'}/>
      </div>

      <div style={{ marginTop: 24, marginBottom: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <div style={{ fontSize: 13, color: T.textMute, letterSpacing: 1.2, textTransform: 'uppercase' }}>Registrar</div>
        <div style={{ fontSize: 12, color: T.textMute }}>Toque para anotar</div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
        <LogTile icon="food" label="Refeição" onClick={() => onRegister?.('meal')}/>
        <LogTile icon="syringe" label="Insulina" onClick={() => onRegister?.('insulin')}/>
        <LogTile icon="walk" label="Atividade" onClick={() => onRegister?.('activity')}/>
      </div>
    </div>
  );
}
