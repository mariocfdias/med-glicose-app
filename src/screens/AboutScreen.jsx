import { useTheme } from '../theme/ThemeProvider.jsx';
import { ScreenHeader } from '../components/ScreenHeader.jsx';
import { Section, Card } from '../components/FormLayout.jsx';

export function AboutScreen({ onClose }) {
  const { T } = useTheme();

  return (
    <div style={{ padding: '8px 20px 24px', color: T.textHi }}>
      <div style={{ marginLeft: -8, marginRight: -8 }}>
        <ScreenHeader title="Sobre" onBack={onClose} actionLabel="" actionDisabled/>
      </div>

      <div style={{
        marginTop: 18, paddingBottom: 20, textAlign: 'center',
        borderBottom: '1px solid ' + T.line,
      }}>
        <div style={{
          fontSize: 30, fontWeight: 600, letterSpacing: -0.5,
          fontFamily: '-apple-system, "SF Pro Display", "Inter", system-ui, sans-serif',
        }}>
          <span style={{ color: T.brand }}>SmartMed</span>
          <span style={{ color: T.textMute }}> - Medlevensohn</span>
        </div>
        <div style={{ marginTop: 16, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <img
            src="/logo-medlevensohn-min.png.webp"
            alt="Medlevensohn"
            style={{
              height: 48,
              width: 'auto',
              filter: 'brightness(0) saturate(100%) invert(36%) sepia(90%) saturate(1200%) hue-rotate(109deg) brightness(66%)',
            }}
          />
        </div>
      </div>

      <Section label="Aplicativo">
        <Card>
          <InfoRow label="Nome" value="SmartMed - Medlevensohn"/>
          <InfoDivider/>
          <InfoRow label="Versão do software" value="1"/>
          <InfoDivider/>
          <InfoRow label="Versão completa do software" value="1.0.0-beta.47"/>
          <InfoDivider/>
          <InfoRow label="Número de registro" value="80146502168" mono/>
        </Card>
      </Section>

      <Section label="Último sensor">
        <Card>
          <InfoRow label="Sensor" value="SM-01M2H110" mono/>
          <InfoDivider/>
          <InfoRow label="Status" value="A4VT7ZJ2" mono muted/>
          <InfoDivider/>
          <InfoRow label="Aplicado em" value="12/05/2026, 09:34" mono/>
        </Card>
      </Section>

      <Section label="Dispositivo">
        <Card>
          <InfoRow label="Versão do OS" value="18.7.9" mono/>
          <InfoDivider/>
          <InfoRow label="Modelo do smartphone" value="iPhone"/>
          <InfoDivider/>
          <InfoRow label="País/Região" value="Brasil"/>
        </Card>
      </Section>

      <Section label="Atendimento">
        <Card>
          <InfoRow label="Serviço de Atendimento ao Cliente" value="suporte.smartmed.app" link/>
        </Card>
      </Section>
    </div>
  );
}

function InfoRow({ label, value, mono = false, muted = false, link = false }) {
  const { T } = useTheme();
  const valueColor = link ? T.accent : muted ? T.textMute : T.textHi;
  return (
    <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 12, padding: '4px 0' }}>
      <div style={{ fontSize: 13, color: T.textMute, flexShrink: 0 }}>{label}</div>
      <div style={{
        fontSize: 13.5, color: valueColor, fontWeight: 500,
        textAlign: 'right', minWidth: 0,
        wordBreak: 'break-all',
        fontVariantNumeric: mono ? 'tabular-nums' : 'normal',
      }}>{value}</div>
    </div>
  );
}

function InfoDivider() {
  const { T } = useTheme();
  return <div style={{ height: 1, background: T.line, margin: '10px -14px' }}/>;
}
