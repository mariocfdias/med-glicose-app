import { useState } from 'react';
import { useTheme } from '../theme/ThemeProvider.jsx';
import { ScreenHeader } from '../components/ScreenHeader.jsx';
import { Section, Card, Row, Divider, Switch, Label, FootnoteCard } from '../components/FormLayout.jsx';
import { NumericStepper } from '../components/NumericStepper.jsx';
import { Icon } from '../icons/Icon.jsx';

export function TargetScreen({ onClose, onSave }) {
  const { T } = useTheme();
  const [low, setLow] = useState(70);
  const [high, setHigh] = useState(180);
  const [nightEnabled, setNightEnabled] = useState(false);
  const [nightLow, setNightLow] = useState(80);
  const [nightHigh, setNightHigh] = useState(160);
  const [actionState, setActionState] = useState('idle');

  const handleSave = () => {
    setActionState('saved');
    setTimeout(() => { onSave?.({ low, high, nightEnabled, nightLow, nightHigh }); onClose?.(); }, 720);
  };

  return (
    <div style={{ padding: '8px 20px 24px', color: T.textHi }}>
      <div style={{ marginLeft: -8, marginRight: -8 }}>
        <ScreenHeader title="Meta de glicose" onBack={onClose} actionLabel="Salvar" onAction={handleSave} actionState={actionState}/>
      </div>

      <RangeVisual low={low} high={high}/>

      <Section label="Faixa principal" hint="mg/dL">
        <Card>
          <Row>
            <Label hint={`Limite inferior · alerta abaixo de ${low} mg/dL`}>Mínimo</Label>
          </Row>
          <NumericStepper value={low} onChange={(v) => setLow(Math.min(v, high - 10))} step={5} min={50} max={120} unit="mg/dL" size="md"/>
          <Divider/>
          <Row>
            <Label hint={`Limite superior · alerta acima de ${high} mg/dL`}>Máximo</Label>
          </Row>
          <NumericStepper value={high} onChange={(v) => setHigh(Math.max(v, low + 10))} step={5} min={140} max={280} unit="mg/dL" size="md"/>
        </Card>
      </Section>

      <Section label="Faixa noturna">
        <Card>
          <Row>
            <Label hint="Aplicada entre 22h e 06h">Usar faixa diferente à noite</Label>
            <Switch checked={nightEnabled} onChange={setNightEnabled} label="Faixa noturna"/>
          </Row>
          {nightEnabled && (
            <>
              <Divider/>
              <Row><Label>Mínimo noturno</Label></Row>
              <NumericStepper value={nightLow} onChange={(v) => setNightLow(Math.min(v, nightHigh - 10))} step={5} min={50} max={130} unit="mg/dL" size="md"/>
              <Divider/>
              <Row><Label>Máximo noturno</Label></Row>
              <NumericStepper value={nightHigh} onChange={(v) => setNightHigh(Math.max(v, nightLow + 10))} step={5} min={130} max={260} unit="mg/dL" size="md"/>
            </>
          )}
        </Card>
      </Section>

      <FootnoteCard icon={<Icon name="info" size={13}/>}>
        A faixa configurada aqui define quando o app gera alertas de leitura fora do alvo. Confirme valores com seu profissional de saúde.
      </FootnoteCard>
    </div>
  );
}

function RangeVisual({ low, high }) {
  const { T } = useTheme();
  const min = 40, max = 300;
  const pct = (v) => ((v - min) / (max - min)) * 100;
  const w = '100%', h = 84;
  const barTop = 36, barH = 12;
  return (
    <div style={{
      marginTop: 6, padding: '16px 16px 12px', borderRadius: 20,
      background: T.bg2, border: '1px solid ' + T.line,
    }}>
      <div style={{ fontSize: 11, color: T.textMute, letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 6 }}>
        Faixa atual
      </div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 8 }}>
        <div style={{ fontSize: 28, fontWeight: 300, color: T.brand, fontVariantNumeric: 'tabular-nums', letterSpacing: -0.5 }}>
          {low} – {high}
        </div>
        <div style={{ fontSize: 13, color: T.textMute, fontWeight: 500 }}>mg/dL</div>
      </div>
      <svg width={w} height={h} viewBox={`0 0 100 ${h}`} preserveAspectRatio="none" style={{ display: 'block' }}>
        <rect x="0" y={barTop} width="100" height={barH} rx="6" fill={T.bg3}/>
        <rect x={pct(low)} y={barTop} width={pct(high) - pct(low)} height={barH} fill={T.brand} opacity="0.85"/>
        <line x1={pct(low)} x2={pct(low)} y1={barTop - 6} y2={barTop + barH + 6} stroke={T.textHi} strokeWidth="0.6"/>
        <line x1={pct(high)} x2={pct(high)} y1={barTop - 6} y2={barTop + barH + 6} stroke={T.textHi} strokeWidth="0.6"/>
      </svg>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: T.textMute, marginTop: 2, fontVariantNumeric: 'tabular-nums' }}>
        <span>40</span><span>120</span><span>200</span><span>300</span>
      </div>
    </div>
  );
}
