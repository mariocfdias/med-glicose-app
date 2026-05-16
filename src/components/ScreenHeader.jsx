import { useTheme } from '../theme/ThemeProvider.jsx';
import { Icon } from '../icons/Icon.jsx';

export function ScreenHeader({ title, onBack, actionLabel = 'Salvar', onAction, actionDisabled = false, actionState = 'idle' }) {
  const { T } = useTheme();
  const isSaved = actionState === 'saved';

  return (
    <div style={{
      flexShrink: 0,
      display: 'grid', gridTemplateColumns: '64px 1fr 64px',
      alignItems: 'center',
      padding: '8px 8px 14px',
      borderBottom: '1px solid ' + T.line,
    }}>
      <button onClick={onBack} aria-label="Fechar" style={{
        width: 44, height: 44, borderRadius: 99,
        background: 'transparent', border: 'none', cursor: 'pointer',
        color: T.text, display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <Icon name="chevronLeft" size={22} stroke={2}/>
      </button>

      <div style={{
        fontSize: 17, fontWeight: 600, color: T.textHi,
        textAlign: 'center', letterSpacing: -0.2,
      }}>{title}</div>

      <button onClick={onAction} disabled={actionDisabled || isSaved} style={{
        height: 44, padding: '0 14px', borderRadius: 99,
        background: 'transparent', border: 'none', cursor: actionDisabled ? 'default' : 'pointer',
        color: isSaved ? T.ok : T.brand,
        fontFamily: 'inherit', fontSize: 15, fontWeight: 600,
        opacity: actionDisabled ? 0.4 : 1,
        display: 'inline-flex', alignItems: 'center', gap: 4,
        transition: 'color .18s',
      }}>
        {isSaved && <Icon name="check" size={16} stroke={2.4}/>}
        {isSaved ? 'Salvo' : actionLabel}
      </button>
    </div>
  );
}
