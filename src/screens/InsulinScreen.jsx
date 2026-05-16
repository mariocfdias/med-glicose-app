import { useState } from 'react';
import { useTheme } from '../theme/ThemeProvider.jsx';
import { ScreenHeader } from '../components/ScreenHeader.jsx';
import { SegmentedControl } from '../components/SegmentedControl.jsx';
import { NumericStepper } from '../components/NumericStepper.jsx';
import { TimeField } from '../components/TimeField.jsx';
import { Icon } from '../icons/Icon.jsx';
import { STATES } from '../data/states.js';

const KINDS = [
  { value: 'fast', label: 'Rápida' },
  { value: 'slow', label: 'Lenta' },
];

export function InsulinScreen({ onClose, onSave, stateKey = 'normal' }) {
  const { T } = useTheme();
  const [kind, setKind] = useState('fast');
  const [units, setUnits] = useState(4);
  const [time, setTime] = useState('now');
  const [actionState, setActionState] = useState('idle');

  const s = STATES[stateKey] ?? STATES.normal;
  const toneColor = s.tone === 'ok' ? T.ok : s.tone === 'warn' ? T.warn : T.danger;
  const toneSoft = s.tone === 'ok' ? T.okSoft : s.tone === 'warn' ? T.warnSoft : T.dangerSoft;

  const handleSave = () => {
    setActionState('saved');
    setTimeout(() => { onSave?.({ kind, units, time }); onClose?.(); }, 720);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0 }}>
      <div style={{ padding: '0 6px' }}>
        <ScreenHeader
          title="Insulina"
          onBack={onClose}
          actionLabel="Salvar"
          onAction={handleSave}
          actionState={actionState}
        />
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '14px 20px 28px' }} className="sg-scroll">
        <Section label="Tipo">
          <SegmentedControl options={KINDS} value={kind} onChange={setKind} />
        </Section>

        <Section label="Unidades">
          <Card padded={false}>
            <div style={{ padding: '6px 16px 14px' }}>
              <NumericStepper
                value={units}
                onChange={setUnits}
                step={0.5}
                min={0}
                max={60}
                unit="UI"
                decimals={1}
                size="lg"
              />
              <div style={{ marginTop: 4, textAlign: 'center', fontSize: 11.5, color: T.textMute }}>
                Passos de 0,5 UI
              </div>
            </div>
          </Card>
        </Section>

        <Section label="Quando">
          <Card>
            <Row>
              <div style={{ fontSize: 13.5, color: T.text }}>Horário da aplicação</div>
              <TimeField value={time} onChange={setTime} />
            </Row>
          </Card>
        </Section>

        <Section label="Contexto">
          <div style={{
            padding: '14px 14px', borderRadius: 20,
            background: toneSoft,
            border: '1px solid ' + toneColor + '33',
            display: 'flex', alignItems: 'center', gap: 12,
          }}>
            <div style={{
              width: 38, height: 38, borderRadius: 12,
              background: toneColor + '33', color: toneColor,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}>
              <Icon name="drop" size={18}/>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 11.5, color: T.textMute, letterSpacing: 1.2, textTransform: 'uppercase' }}>Sua glicose agora</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginTop: 2 }}>
                <div style={{ fontSize: 22, color: toneColor, fontWeight: 600, fontVariantNumeric: 'tabular-nums', lineHeight: 1 }}>{s.now}</div>
                <div style={{ fontSize: 11.5, color: T.textMute, fontWeight: 500 }}>mg/dL · {s.label.toLowerCase()}</div>
              </div>
            </div>
          </div>
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
