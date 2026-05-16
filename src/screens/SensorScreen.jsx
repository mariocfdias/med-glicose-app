import { useTheme } from '../theme/ThemeProvider.jsx';
import { ScreenHeader } from '../components/ScreenHeader.jsx';
import { Section, Card, Row, Divider, Label } from '../components/FormLayout.jsx';
import { Icon } from '../icons/Icon.jsx';

const TOTAL_DAYS = 14;
const REMAINING = 10;

export function SensorScreen({ onClose }) {
  const { T, mode } = useTheme();
  const indicatorStroke = mode === 'dark' ? '#FFFFFF' : '#3A4159';
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
          <Row>
            <Label hint="168 dias acompanhados nos últimos 12 meses">12 sensores usados</Label>
            <Icon name="arrowRight" size={14} color={T.textMute}/>
          </Row>
        </Card>
      </Section>

      <button style={{
        marginTop: 22, width: '100%',
        padding: '14px 16px', borderRadius: 14,
        background: T.brand, color: '#E8F5EE',
        border: 'none', fontFamily: 'inherit', fontSize: 15, fontWeight: 600,
        cursor: 'pointer',
        boxShadow: '0 10px 24px ' + T.brand + '55',
      }}>Trocar sensor</button>
    </div>
  );
}
