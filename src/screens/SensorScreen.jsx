import { useState } from 'react';
import { useTheme } from '../theme/ThemeProvider.jsx';
import { ScreenHeader } from '../components/ScreenHeader.jsx';
import { Section, Card, Row, Divider, Label, FootnoteCard } from '../components/FormLayout.jsx';
import { Icon } from '../icons/Icon.jsx';
import { Timeline } from '../components/Timeline.jsx';

const TOTAL_DAYS = 14;
const REMAINING = 10;

const EXCHANGE_STEPS = [
  { title: 'Prepare a área', body: 'Lave e seque bem a pele antes de aplicar.' },
  { title: 'Escolha o local', body: 'Alterne entre abdômen, parte posterior do braço e coxa. Evite repetir o mesmo ponto consecutivo.' },
  { title: 'Remova o sensor antigo', body: 'Descole devagar puxando a lateral. Descarte na embalagem original.' },
  { title: 'Limpe o local antigo', body: 'Use álcool 70% e aguarde secar por 30 segundos.' },
  { title: 'Aplique o novo sensor', body: 'Posicione o aplicador no local escolhido, pressione firme por 3 segundos e recolha o protetor.' },
  { title: 'Ative no aplicativo', body: 'Aguarde até 60 min de aquecimento antes da primeira leitura.' },
];

const SENSOR_HISTORY = [
  { serial: 'SM-01M2H110', site: 'Braço esq.',  from: '12/05/26', to: '26/05/26', days: 14 },
  { serial: 'SM-01MF4FTW', site: 'Abdômen',      from: '28/04/26', to: '12/05/26', days: 14 },
  { serial: 'SM-01MDG9UH', site: 'Braço dir.',   from: '14/04/26', to: '28/04/26', days: 14 },
  { serial: 'SM-02A7R5PQ', site: 'Coxa esq.',    from: '31/03/26', to: '14/04/26', days: 14 },
  { serial: 'SM-02B3K9LM', site: 'Abdômen',      from: '17/03/26', to: '31/03/26', days: 14 },
  { serial: 'SM-02C8X2NV', site: 'Braço esq.',   from: '01/03/26', to: '17/03/26', days: 14 },
  { serial: 'SM-03D4F6RT', site: 'Braço dir.',   from: '15/02/26', to: '01/03/26', days: 14 },
  { serial: 'SM-03E1G0WS', site: 'Abdômen',      from: '01/02/26', to: '15/02/26', days: 14 },
  { serial: 'SM-03F7H3YZ', site: 'Coxa esq.',    from: '18/01/26', to: '01/02/26', days: 14 },
  { serial: 'SM-04G2J5AK', site: 'Braço esq.',   from: '04/01/26', to: '18/01/26', days: 14 },
  { serial: 'SM-04H9L8BV', site: 'Abdômen',      from: '21/12/25', to: '04/01/26', days: 14 },
  { serial: 'SM-04I0N1CX', site: 'Braço dir.',   from: '07/12/25', to: '21/12/25', days: 14 },
];

export function SensorScreen({ onClose }) {
  const { T, mode } = useTheme();
  const [view, setView] = useState('info');

  if (view === 'exchange') return <SensorExchangeView onBack={() => setView('info')} />;
  if (view === 'history')  return <SensorHistoryView  onBack={() => setView('info')} />;

  const indicatorStroke = T.indicatorStroke;
  const progress = REMAINING / TOTAL_DAYS;
  const R = 76, cx = 110, cy = 110;
  const circumference = 2 * Math.PI * R;
  const dashOffset = circumference * (1 - progress);
  const toneColor = REMAINING > 4 ? T.ok : REMAINING > 2 ? T.warn : T.danger;

  return (
    <div style={{ padding: '8px 20px 24px', color: T.textHi }}>
      <div style={{ marginLeft: -8, marginRight: -8 }}>
        <ScreenHeader title="Sensor" onBack={onClose} actionLabel="" onAction={() => {}} actionDisabled />
      </div>

      <div style={{
        marginTop: 6, padding: '20px 16px 22px', borderRadius: 24,
        background: T.bg2, border: '1px solid ' + T.line,
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: -40, opacity: 0.5,
          background: `radial-gradient(circle at 50% 0%, ${toneColor}22 0%, transparent 60%)`,
          pointerEvents: 'none',
        }}/>
        <div style={{ fontSize: 11, color: T.textMute, letterSpacing: 1.2, textTransform: 'uppercase', zIndex: 1 }}>
          Sensor ativo
        </div>
        <svg width={220} height={220} viewBox="0 0 220 220" style={{ overflow: 'visible', zIndex: 1 }}>
          <circle cx={cx} cy={cy} r={R} fill="none" stroke={T.bg3} strokeWidth={14}/>
          <circle
            cx={cx} cy={cy} r={R}
            fill="none" stroke={toneColor} strokeWidth={14} strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
            transform={`rotate(-90 ${cx} ${cy})`}
            style={{ transition: 'stroke-dashoffset .6s ease-out' }}
          />
          <text x={cx} y={cy - 4} textAnchor="middle" fontSize="56" fontWeight="300"
            fill={T.textHi} fontFamily="Inter, system-ui" style={{ fontVariantNumeric: 'tabular-nums' }}>{REMAINING}</text>
          <text x={cx} y={cy + 26} textAnchor="middle" fontSize="13" fontWeight="500"
            fill={T.textMute} fontFamily="Inter, system-ui">dias restantes</text>
          <circle
            cx={cx + R * Math.cos((-90 + progress * 360) * Math.PI / 180)}
            cy={cy + R * Math.sin((-90 + progress * 360) * Math.PI / 180)}
            r={9} fill={T.bg2} stroke={indicatorStroke} strokeWidth={3}
          />
        </svg>
        <div style={{ fontSize: 12.5, color: T.text, zIndex: 1 }}>
          Renovar até <strong style={{ color: T.textHi, fontWeight: 600 }}>21 de maio</strong>
        </div>
      </div>

      <Section label="Status">
        <Card>
          <Row>
            <div style={{
              width: 32, height: 32, borderRadius: 10,
              background: T.okSoft, color: T.ok,
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }}>
              <Icon name="sensor" size={16}/>
            </div>
            <Label hint="Última leitura há 1 min">Sinal forte</Label>
          </Row>
          <Divider/>
          <Row>
            <div style={{
              width: 32, height: 32, borderRadius: 10,
              background: T.accentSoft, color: T.accent,
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }}>
              <Icon name="info" size={16}/>
            </div>
            <Label hint="Modelo CGM Pro G6 · serial #4F8A2D">Conectado via Bluetooth</Label>
          </Row>
        </Card>
      </Section>

      <Section label="Detalhes">
        <Card>
          <Row>
            <Label>Aplicado em</Label>
            <div style={{ fontSize: 13.5, color: T.textHi, fontWeight: 500, fontVariantNumeric: 'tabular-nums' }}>11/05 · 09:24</div>
          </Row>
          <Divider/>
          <Row>
            <Label>Local</Label>
            <div style={{ fontSize: 13.5, color: T.text }}>Braço esquerdo</div>
          </Row>
          <Divider/>
          <Row>
            <Label>Última calibração</Label>
            <div style={{ fontSize: 13.5, color: T.text }}>há 12 h</div>
          </Row>
        </Card>
      </Section>

      <Section label="Histórico">
        <Card>
          <Row onClick={() => setView('history')} style={{ cursor: 'pointer' }}>
            <Label hint="168 dias acompanhados nos últimos 12 meses">12 sensores usados</Label>
            <Icon name="arrowRight" size={14} color={T.textMute}/>
          </Row>
        </Card>
      </Section>

      <button
        onClick={() => setView('exchange')}
        style={{
          marginTop: 22, width: '100%',
          padding: '14px 16px', borderRadius: 14,
          background: T.brand, color: T.brandText,
          border: 'none', fontFamily: 'inherit', fontSize: 15, fontWeight: 600,
          cursor: 'pointer',
          boxShadow: '0 10px 24px ' + T.brand + '55',
        }}
      >Trocar sensor</button>
    </div>
  );
}

function SensorExchangeView({ onBack }) {
  const { T } = useTheme();
  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0, color: T.textHi }}>
      <div style={{ padding: '8px 20px 0', marginLeft: -8, marginRight: -8 }}>
        <ScreenHeader title="Trocar sensor" onBack={onBack} actionLabel="" actionDisabled/>
      </div>
      <div className="sg-scroll" style={{ flex: 1, overflowY: 'auto', padding: '14px 20px 28px' }}>
        <div style={{ fontSize: 13, color: T.textMute, lineHeight: 1.5, marginBottom: 20 }}>
          Siga os passos abaixo para trocar o sensor com segurança e garantir leituras precisas.
        </div>
        <Timeline steps={EXCHANGE_STEPS}/>
        <div style={{ marginTop: 24 }}>
          <FootnoteCard tone="info" icon={<Icon name="info" size={12}/>}>
            Consulte o manual do seu sensor para instruções específicas do fabricante.
          </FootnoteCard>
        </div>
      </div>
    </div>
  );
}

function SensorHistoryView({ onBack }) {
  const { T } = useTheme();
  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0, color: T.textHi }}>
      <div style={{ padding: '8px 20px 0', marginLeft: -8, marginRight: -8 }}>
        <ScreenHeader title="Histórico de sensores" onBack={onBack} actionLabel="" actionDisabled/>
      </div>
      <div className="sg-scroll" style={{ flex: 1, overflowY: 'auto', padding: '14px 20px 28px' }}>
        <div style={{ fontSize: 12, color: T.textMute, marginBottom: 14 }}>
          12 sensores · 168 dias acompanhados
        </div>
        <Card>
          {SENSOR_HISTORY.map((s, i) => (
            <div key={s.serial}>
              {i > 0 && <Divider/>}
              <div style={{ padding: '10px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: T.textHi, fontVariantNumeric: 'tabular-nums', letterSpacing: 0.2 }}>{s.serial}</div>
                  <div style={{ fontSize: 11.5, color: T.textMute, marginTop: 2 }}>{s.site}</div>
                </div>
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <div style={{ fontSize: 12, color: T.text, fontVariantNumeric: 'tabular-nums' }}>{s.from} – {s.to}</div>
                  <div style={{ fontSize: 11, color: T.textMute, marginTop: 2 }}>{s.days} dias</div>
                </div>
              </div>
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
}

