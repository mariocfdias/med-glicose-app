import { useState } from 'react';
import { useTheme } from '../theme/ThemeProvider.jsx';
import { ScreenHeader } from '../components/ScreenHeader.jsx';
import { ChipGroup } from '../components/ChipGroup.jsx';
import { SegmentedControl } from '../components/SegmentedControl.jsx';
import { NumericStepper } from '../components/NumericStepper.jsx';
import { TimeField } from '../components/TimeField.jsx';

const ACTIVITIES = [
  { value: 'walk', label: 'Caminhada', icon: 'walk' },
  { value: 'run', label: 'Corrida', icon: 'run' },
  { value: 'bike', label: 'Bicicleta', icon: 'bike' },
  { value: 'other', label: 'Outro', icon: 'sparkles' },
];

const INTENSITY = [
  { value: 'light', label: 'Leve' },
  { value: 'moderate', label: 'Moderada' },
  { value: 'intense', label: 'Intensa' },
];

export function ActivityScreen({ onClose, onSave }) {
  const { T } = useTheme();
  const [kind, setKind] = useState('walk');
  const [minutes, setMinutes] = useState(30);
  const [intensity, setIntensity] = useState('moderate');
  const [time, setTime] = useState('now');
  const [actionState, setActionState] = useState('idle');

  const handleSave = () => {
    setActionState('saved');
    setTimeout(() => { onSave?.({ kind, minutes, intensity, time }); onClose?.(); }, 720);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0 }}>
      <div style={{ padding: '0 6px' }}>
        <ScreenHeader
          title="Atividade"
          onBack={onClose}
          actionLabel="Salvar"
          onAction={handleSave}
          actionState={actionState}
        />
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '14px 20px 28px' }} className="sg-scroll">
        <Section label="Tipo">
          <ChipGroup options={ACTIVITIES} value={kind} onChange={setKind} />
        </Section>

        <Section label="Duração">
          <Card padded={false}>
            <div style={{ padding: '6px 16px 14px' }}>
              <NumericStepper
                value={minutes}
                onChange={setMinutes}
                step={5}
                min={5}
                max={240}
                unit="min"
                size="lg"
              />
              <div style={{ marginTop: 4, textAlign: 'center', fontSize: 11.5, color: T.textMute }}>
                Passos de 5 min
              </div>
            </div>
          </Card>
        </Section>

        <Section label="Intensidade">
          <SegmentedControl options={INTENSITY} value={intensity} onChange={setIntensity} />
        </Section>

        <Section label="Quando">
          <Card>
            <Row>
              <div style={{ fontSize: 13.5, color: T.text }}>Horário</div>
              <TimeField value={time} onChange={setTime} />
            </Row>
          </Card>
        </Section>

      </div>
    </div>
  );
}

function Section({ label, children }) {
  const { T } = useTheme();
  return (
    <div style={{ marginTop: 18 }}>
      <div style={{ fontSize: 11, color: T.textMute, letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 10, paddingLeft: 4 }}>
        {label}
      </div>
      {children}
    </div>
  );
}

function Card({ children, padded = true }) {
  const { T } = useTheme();
  return (
    <div style={{
      background: T.bg2, border: '1px solid ' + T.line, borderRadius: 20,
      padding: padded ? '14px 14px' : 0,
    }}>{children}</div>
  );
}

function Row({ children }) {
  return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>{children}</div>;
}
