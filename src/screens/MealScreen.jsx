import { useState } from 'react';
import { useTheme } from '../theme/ThemeProvider.jsx';
import { ScreenHeader } from '../components/ScreenHeader.jsx';
import { ChipGroup } from '../components/ChipGroup.jsx';
import { NumericStepper } from '../components/NumericStepper.jsx';
import { TimeField } from '../components/TimeField.jsx';
import { Icon } from '../icons/Icon.jsx';

const MEAL_TYPES = [
  { value: 'breakfast', label: 'Café', icon: 'sun' },
  { value: 'lunch', label: 'Almoço', icon: 'food' },
  { value: 'snack', label: 'Lanche', icon: 'sparkles' },
  { value: 'dinner', label: 'Jantar', icon: 'moon' },
];

const MEAL_LABEL = {
  breakfast: 'Café da manhã',
  lunch: 'Almoço',
  snack: 'Lanche',
  dinner: 'Jantar',
};

function defaultMealByHour() {
  const h = new Date().getHours();
  if (h < 11) return 'breakfast';
  if (h < 15) return 'lunch';
  if (h < 18) return 'snack';
  return 'dinner';
}

function formatHM(date) {
  const h = String(date.getHours()).padStart(2, '0');
  const m = String(date.getMinutes()).padStart(2, '0');
  return `${h}:${m}`;
}

export function MealScreen({ onClose, onSave }) {
  const { T } = useTheme();
  const [meal, setMeal] = useState(defaultMealByHour);
  const [carbs, setCarbs] = useState(30);
  const [time, setTime] = useState('now');
  const [actionState, setActionState] = useState('idle');

  const handleSave = () => {
    setActionState('saved');
    setTimeout(() => { onSave?.({ meal, carbs, time }); onClose?.(); }, 720);
  };

  const timeLabel = time === 'now' ? 'agora' : formatHM(time);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0 }}>
      <div style={{ padding: '0 6px' }}>
        <ScreenHeader
          title="Refeição"
          onBack={onClose}
          actionLabel="Salvar"
          onAction={handleSave}
          actionState={actionState}
        />
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '14px 20px 28px' }} className="sg-scroll">
        <Section label="Quando">
          <Card>
            <ChipGroup options={MEAL_TYPES} value={meal} onChange={setMeal} />
            <Divider/>
            <Row>
              <div style={{ fontSize: 13.5, color: T.text }}>Horário</div>
              <TimeField value={time} onChange={setTime} />
            </Row>
          </Card>
        </Section>

        <Section label="Carboidratos">
          <Card padded={false}>
            <div style={{ padding: '6px 16px 14px' }}>
              <NumericStepper
                value={carbs}
                onChange={setCarbs}
                step={5}
                min={0}
                max={300}
                unit="g"
                size="lg"
              />
              <div style={{ marginTop: 4, textAlign: 'center', fontSize: 11.5, color: T.textMute }}>
                Passos de 5 g · ajuste fino disponível em breve
              </div>
            </div>
          </Card>
        </Section>

        <Section label="Resumo">
          <Card>
            <Row>
              <div style={{ fontSize: 13, color: T.textMute }}>Refeição</div>
              <div style={{ fontSize: 13.5, color: T.textHi, fontWeight: 500 }}>{MEAL_LABEL[meal]}</div>
            </Row>
            <Divider/>
            <Row>
              <div style={{ fontSize: 13, color: T.textMute }}>Carboidratos</div>
              <div style={{ fontSize: 13.5, color: T.textHi, fontWeight: 500, fontVariantNumeric: 'tabular-nums' }}>{carbs} g</div>
            </Row>
            <Divider/>
            <Row>
              <div style={{ fontSize: 13, color: T.textMute }}>Horário</div>
              <div style={{ fontSize: 13.5, color: T.textHi, fontWeight: 500 }}>{timeLabel}</div>
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

function Divider() {
  const { T } = useTheme();
  return <div style={{ height: 1, background: T.line, margin: '14px -14px' }}/>;
}

function Row({ children }) {
  return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>{children}</div>;
}
