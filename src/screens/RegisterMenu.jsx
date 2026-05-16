import { useTheme } from '../theme/ThemeProvider.jsx';
import { Icon } from '../icons/Icon.jsx';
import { ScreenHeader } from '../components/ScreenHeader.jsx';

const ITEMS = [
  {
    type: 'meal',
    icon: 'food',
    title: 'Refeição',
    desc: 'Anote carboidratos e horário da refeição',
    accent: 'warn',
  },
  {
    type: 'insulin',
    icon: 'syringe',
    title: 'Insulina',
    desc: 'Registre dose rápida ou lenta aplicada',
    accent: 'accent',
  },
  {
    type: 'activity',
    icon: 'walk',
    title: 'Atividade',
    desc: 'Caminhada, corrida, bicicleta ou outra',
    accent: 'ok',
  },
];

export function RegisterMenu({ onPick, onClose }) {
  const { T } = useTheme();
  const accentColor = (a) => a === 'warn' ? T.warn : a === 'accent' ? T.accent : T.ok;
  const accentSoft = (a) => a === 'warn' ? T.warnSoft : a === 'accent' ? T.accentSoft : T.okSoft;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0 }}>
      <div style={{ padding: '0 6px' }}>
        <ScreenHeader title="Registrar" onBack={onClose} actionLabel="" onAction={() => {}} actionDisabled />
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '14px 20px 28px' }} className="sg-scroll">
        <div style={{ fontSize: 13, color: T.textMute, lineHeight: 1.45, marginBottom: 18 }}>
          O que você quer registrar agora?
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {ITEMS.map(it => (
            <button key={it.type} onClick={() => onPick(it.type)} style={{
              display: 'flex', alignItems: 'center', gap: 14,
              padding: '16px 18px 16px 14px',
              borderRadius: 20,
              background: T.bg2,
              border: '1px solid ' + T.line,
              cursor: 'pointer',
              fontFamily: 'inherit', textAlign: 'left',
              color: 'inherit',
              transition: 'transform .12s, border-color .15s',
            }}>
              <div style={{
                width: 48, height: 48, borderRadius: 14,
                background: accentSoft(it.accent),
                color: accentColor(it.accent),
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              }}>
                <Icon name={it.icon} size={22} stroke={2}/>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 16, fontWeight: 600, color: T.textHi }}>{it.title}</div>
                <div style={{ fontSize: 12.5, color: T.textMute, marginTop: 3, lineHeight: 1.35 }}>{it.desc}</div>
              </div>
              <Icon name="arrowRight" size={16} color={T.textMute}/>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
