import { useState } from 'react';
import { useTheme } from '../theme/ThemeProvider.jsx';
import { Icon } from '../icons/Icon.jsx';
import { Bee } from '../components/Bee.jsx';
import { SensorScreen } from './SensorScreen.jsx';
import { TargetScreen } from './TargetScreen.jsx';
import { AlertSettingsScreen } from './AlertSettingsScreen.jsx';
import { HistoryScreen } from './HistoryScreen.jsx';
import { ShareScreen } from './ShareScreen.jsx';
import { AboutScreen } from './AboutScreen.jsx';

const ITEMS = [
  { id: 'sensor',  icon: 'sensor', label: 'Sensor',        value: '10 dias restantes' },
  { id: 'target',  icon: 'target', label: 'Meta',          value: '70 – 180 mg/dL' },
  { id: 'alerts',  icon: 'bell',   label: 'Alertas',       value: '5 ativos' },
  { id: 'history', icon: 'clock',  label: 'Histórico',     value: 'Ver tudo' },
  { id: 'share',   icon: 'shield', label: 'Compartilhar',  value: 'Família e médico' },
  { id: 'about',   icon: 'info',   label: 'Sobre',         value: 'Modelos de IA' },
];

export function MoreScreen() {
  const { T } = useTheme();
  const [subview, setSubview] = useState(null);
  const close = () => setSubview(null);

  if (subview === 'sensor')  return <SensorScreen onClose={close}/>;
  if (subview === 'target')  return <TargetScreen onClose={close} onSave={() => {}}/>;
  if (subview === 'alerts')  return <AlertSettingsScreen onClose={close} onSave={() => {}}/>;
  if (subview === 'history') return <HistoryScreen onClose={close}/>;
  if (subview === 'share')   return <ShareScreen onClose={close}/>;
  if (subview === 'about')   return <AboutScreen onClose={close}/>;

  return (
    <div style={{ padding: '8px 20px 24px', color: T.textHi }}>
      <div style={{ fontSize: 11, color: T.textMute, letterSpacing: 1.2, textTransform: 'uppercase' }}>Conta</div>
      <div style={{ fontSize: 24, fontWeight: 500, marginTop: 4 }}>Mais</div>

      <div style={{ marginTop: 18, padding: '18px 16px', borderRadius: 20, background: T.bg2, border: '1px solid ' + T.line, display: 'flex', alignItems: 'center', gap: 14 }}>
        <div style={{ width: 54, height: 54, borderRadius: 99, background: T.brandSoft, color: T.brand, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600, fontSize: 20 }}>LM</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 16, fontWeight: 600 }}>Lara Mendes</div>
          <div style={{ fontSize: 12, color: T.textMute, marginTop: 2 }}>Diabetes tipo 1 · desde 2018</div>
        </div>
      </div>

      <div style={{ marginTop: 16, background: T.bg2, border: '1px solid ' + T.line, borderRadius: 20, overflow: 'hidden' }}>
        {ITEMS.map((it, i) => (
          <button
            key={it.id}
            onClick={() => setSubview(it.id)}
            style={{
              display: 'flex', alignItems: 'center', gap: 14,
              padding: '14px 16px',
              borderTop: i ? '1px solid ' + T.line : 'none',
              background: 'transparent', border: 'none',
              cursor: 'pointer', textAlign: 'left',
              fontFamily: 'inherit', color: 'inherit',
              width: '100%',
            }}
          >
            <div style={{ width: 34, height: 34, borderRadius: 10, background: T.bg3, color: T.accent, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Icon name={it.icon} size={17}/>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, color: T.textHi }}>{it.label}</div>
            </div>
            <div style={{ fontSize: 12, color: T.textMute, marginRight: 6 }}>{it.value}</div>
            <Icon name="arrowRight" size={14} color={T.textMute}/>
          </button>
        ))}
      </div>

      <div style={{ marginTop: 16, padding: '14px 16px', borderRadius: 20, background: T.bg2, border: '1px solid ' + T.line, display: 'flex', alignItems: 'center', gap: 12 }}>
        <Bee mood="happy" frame={44}/>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13.5, fontWeight: 600 }}>Sua assistente Smart</div>
          <div style={{ fontSize: 12, color: T.textMute, marginTop: 2 }}>Aprende seus padrões há 47 dias</div>
        </div>
      </div>
    </div>
  );
}
