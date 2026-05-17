import { useState } from 'react';
import { useTheme } from '../theme/ThemeProvider.jsx';
import { ScreenHeader } from '../components/ScreenHeader.jsx';
import { NumericStepper } from '../components/NumericStepper.jsx';
import { TimeField } from '../components/TimeField.jsx';
import { STATES } from '../data/states.js';

export function CommentScreen({ onClose, onSave, stateKey = 'normal' }) {
  const { T } = useTheme();
  const baseGlucose = STATES[stateKey]?.now ?? 110;
  const [text, setText] = useState('');
  const [glucose, setGlucose] = useState(baseGlucose);
  const [time, setTime] = useState('now');
  const [actionState, setActionState] = useState('idle');

  const handleSave = () => {
    setActionState('saved');
    setTimeout(() => { onSave?.({ text, glucose, time }); onClose?.(); }, 720);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0 }}>
      <div style={{ padding: '0 6px' }}>
        <ScreenHeader
          title="Comentário"
          onBack={onClose}
          actionLabel="Salvar"
          onAction={handleSave}
          actionState={actionState}
        />
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '14px 20px 28px' }} className="sg-scroll">
        <Section label="Comentário">
          <Card>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={6}
              placeholder="Anote como você está se sentindo, o que comeu, ou qualquer observação..."
              style={{
                width: '100%', boxSizing: 'border-box',
                background: T.bg3, color: T.textHi,
                border: '1px solid ' + T.line, borderRadius: 16,
                padding: 12, resize: 'none',
                fontFamily: 'inherit', fontSize: 14, lineHeight: 1.45,
                outline: 'none',
              }}
            />
            <div style={{ marginTop: 6, textAlign: 'right', fontSize: 11.5, color: T.textMute }}>
              {text.length} caracteres
            </div>
          </Card>
        </Section>

        <Section label="Glicemia agora">
          <Card padded={false}>
            <div style={{ padding: '6px 16px 14px' }}>
              <NumericStepper
                value={glucose}
                onChange={setGlucose}
                step={1}
                min={30}
                max={500}
                unit="mg/dL"
                size="lg"
              />
              <div style={{ marginTop: 4, textAlign: 'center', fontSize: 11.5, color: T.textMute }}>
                Ajuste se for diferente do sensor
              </div>
            </div>
          </Card>
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
