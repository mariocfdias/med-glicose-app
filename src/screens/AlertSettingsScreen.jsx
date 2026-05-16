import { useState } from 'react';
import { useTheme } from '../theme/ThemeProvider.jsx';
import { ScreenHeader } from '../components/ScreenHeader.jsx';
import { Section, Card, Row, Divider, Switch, Label } from '../components/FormLayout.jsx';
import { Icon } from '../icons/Icon.jsx';

export function AlertSettingsScreen({ onClose, onSave }) {
  const { T } = useTheme();
  const [low, setLow] = useState(true);
  const [high, setHigh] = useState(true);
  const [predLow, setPredLow] = useState(true);
  const [predHigh, setPredHigh] = useState(true);
  const [nightSafety, setNightSafety] = useState(true);
  const [sensorIssues, setSensorIssues] = useState(true);
  const [sound, setSound] = useState(true);
  const [vibration, setVibration] = useState(true);
  const [quietHours, setQuietHours] = useState(false);
  const [actionState, setActionState] = useState('idle');

  const handleSave = () => {
    setActionState('saved');
    setTimeout(() => { onSave?.(); onClose?.(); }, 720);
  };

  const activeCount = [low, high, predLow, predHigh, nightSafety].filter(Boolean).length;

  return (
    <div style={{ padding: '8px 20px 24px', color: T.textHi }}>
      <div style={{ marginLeft: -8, marginRight: -8 }}>
        <ScreenHeader title="Alertas" onBack={onClose} actionLabel="Salvar" onAction={handleSave} actionState={actionState}/>
      </div>

      <div style={{
        marginTop: 6, padding: '14px 16px', borderRadius: 18,
        background: T.brandSoft, border: '1px solid ' + 'rgba(0,137,61,0.22)',
        display: 'flex', alignItems: 'center', gap: 12,
      }}>
        <div style={{
          width: 38, height: 38, borderRadius: 12, background: T.brand + '30', color: T.brand,
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
        }}>
          <Icon name="bell" size={18}/>
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 13.5, color: T.textHi, fontWeight: 600 }}>
            <span style={{ color: T.brand }}>{activeCount}</span> alertas ativos
          </div>
          <div style={{ fontSize: 11.5, color: T.textMute, marginTop: 2 }}>
            Configure quais variações você quer ser avisada
          </div>
        </div>
      </div>

      <Section label="Glicose">
        <Card>
          <ToggleRow
            iconName="arrowDown" tone="danger"
            title="Leitura baixa"
            hint="Alerta quando ficar abaixo da faixa"
            value={low} onChange={setLow}
          />
          <Divider/>
          <ToggleRow
            iconName="arrowUpRight" tone="warn"
            title="Leitura alta"
            hint="Alerta quando passar do limite máximo"
            value={high} onChange={setHigh}
          />
        </Card>
      </Section>

      <Section label="Previsões">
        <Card>
          <ToggleRow
            iconName="sparkles" tone="warn"
            title="Possível queda"
            hint="Aviso antes de uma queda prevista"
            value={predLow} onChange={setPredLow}
          />
          <Divider/>
          <ToggleRow
            iconName="sparkles" tone="warn"
            title="Possível alta"
            hint="Aviso antes de uma elevação prevista"
            value={predHigh} onChange={setPredHigh}
          />
          <Divider/>
          <ToggleRow
            iconName="moon" tone="accent"
            title="Risco noturno"
            hint="Resumo diário de variações durante a noite"
            value={nightSafety} onChange={setNightSafety}
          />
        </Card>
      </Section>

      <Section label="Sistema">
        <Card>
          <ToggleRow
            iconName="sensor" tone="accent"
            title="Sensor"
            hint="Conexão, calibração e vida útil"
            value={sensorIssues} onChange={setSensorIssues}
          />
        </Card>
      </Section>

      <Section label="Entrega">
        <Card>
          <Row>
            <Label hint="Toca o som padrão de notificação">Som</Label>
            <Switch checked={sound} onChange={setSound} label="Som"/>
          </Row>
          <Divider/>
          <Row>
            <Label hint="Vibração no aparelho">Vibrar</Label>
            <Switch checked={vibration} onChange={setVibration} label="Vibrar"/>
          </Row>
          <Divider/>
          <Row>
            <Label hint="Silenciar entre 23h e 06h, exceto alertas críticos">Modo silencioso</Label>
            <Switch checked={quietHours} onChange={setQuietHours} label="Modo silencioso"/>
          </Row>
        </Card>
      </Section>
    </div>
  );
}

function ToggleRow({ iconName, tone, title, hint, value, onChange }) {
  const { T } = useTheme();
  const c = tone === 'danger' ? T.danger : tone === 'warn' ? T.warn : tone === 'ok' ? T.ok : T.accent;
  const cSoft = tone === 'danger' ? T.dangerSoft : tone === 'warn' ? T.warnSoft : tone === 'ok' ? T.okSoft : T.accentSoft;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '4px 0' }}>
      <div style={{
        width: 32, height: 32, borderRadius: 10,
        background: cSoft, color: c,
        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
      }}>
        <Icon name={iconName} size={16}/>
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 13.5, color: T.textHi, fontWeight: 500 }}>{title}</div>
        <div style={{ fontSize: 11.5, color: T.textMute, marginTop: 2, lineHeight: 1.35 }}>{hint}</div>
      </div>
      <Switch checked={value} onChange={onChange} label={title}/>
    </div>
  );
}
