import { useTheme } from '../theme/ThemeProvider.jsx';
import { Icon } from '../icons/Icon.jsx';

export function TweaksPanel({ stateKey, setStateKey, tab, setTab, onClose, mode = 'dark', onToggleTheme = () => {} }) {
  const { T } = useTheme();
  const isDark = mode === 'dark';
  return (
    <div style={{
      position: 'fixed', right: 20, top: 20, width: 280,
      background: T.bg2, border: '1px solid ' + T.line,
      borderRadius: 14, padding: 14, color: T.textHi, zIndex: 9999,
      boxShadow: isDark ? '0 20px 60px rgba(0,0,0,0.6)' : '0 20px 60px rgba(11,16,32,0.18)',
      fontFamily: '-apple-system, system-ui, sans-serif', fontSize: 13
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
        <div style={{ fontWeight: 600 }}>Tweaks</div>
        <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: T.textMute, cursor: 'pointer' }}><Icon name="x" size={14}/></button>
      </div>

      <div style={{ fontSize: 10.5, color: T.textMute, letterSpacing: 1.2, textTransform: 'uppercase' }}>Tema</div>
      <button onClick={onToggleTheme} aria-label="Alternar tema claro e escuro" style={{
        marginTop: 8, width: '100%', padding: '10px 12px', borderRadius: 10,
        background: T.bg3, border: '1px solid ' + T.line,
        display: 'flex', alignItems: 'center', gap: 10,
        color: 'inherit', fontFamily: 'inherit', textAlign: 'left', cursor: 'pointer'
      }}>
        <div style={{
          width: 28, height: 28, borderRadius: 8,
          background: T.brandSoft, color: T.brand,
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <Icon name={isDark ? 'moon' : 'sun'} size={15}/>
        </div>
        <div style={{ flex: 1, fontSize: 12, color: T.textHi, fontWeight: 500 }}>
          {isDark ? 'Escuro' : 'Claro'}
        </div>
        <div style={{
          width: 38, height: 22, borderRadius: 99,
          background: isDark ? T.brand : 'rgba(11,16,32,0.18)',
          position: 'relative', flexShrink: 0, transition: 'background .2s'
        }}>
          <div style={{
            position: 'absolute', top: 2, left: isDark ? 18 : 2,
            width: 18, height: 18, borderRadius: 99, background: '#fff',
            boxShadow: '0 1px 3px rgba(0,0,0,0.25)', transition: 'left .2s'
          }}/>
        </div>
      </button>

      <div style={{ fontSize: 10.5, color: T.textMute, letterSpacing: 1.2, textTransform: 'uppercase', marginTop: 14 }}>Estado da glicose</div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6, marginTop: 8 }}>
        {[
          ['normal', 'Em alvo'], ['rising', 'Subindo'],
          ['high', 'Alta'], ['lowSoon', 'Queda prevista'],
          ['low', 'Baixa'],
        ].map(([k, l]) => (
          <button key={k} onClick={() => setStateKey(k)} style={{
            padding: '8px 10px', borderRadius: 9, fontFamily: 'inherit',
            background: stateKey === k ? T.brand : T.bg3,
            color: stateKey === k ? '#E8F5EE' : T.text,
            border: stateKey === k ? 'none' : '1px solid ' + T.line,
            cursor: 'pointer', fontSize: 12, fontWeight: 500
          }}>{l}</button>
        ))}
      </div>
      <div style={{ fontSize: 10.5, color: T.textMute, letterSpacing: 1.2, textTransform: 'uppercase', marginTop: 14 }}>Tela</div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6, marginTop: 8 }}>
        {[['home', 'Início'], ['patterns', 'Padrões'], ['alerts', 'Alertas'], ['more', 'Mais']].map(([k, l]) => (
          <button key={k} onClick={() => setTab(k)} style={{
            padding: '8px 10px', borderRadius: 9, fontFamily: 'inherit',
            background: tab === k ? T.accent : T.bg3,
            color: tab === k ? T.bg : T.text,
            border: tab === k ? 'none' : '1px solid ' + T.line,
            cursor: 'pointer', fontSize: 12, fontWeight: 500
          }}>{l}</button>
        ))}
      </div>
      <div style={{ marginTop: 12, fontSize: 10.5, color: T.textMute, lineHeight: 1.4 }}>
        Mexa nos estados para ver como o app responde com diferentes previsões.
      </div>
    </div>
  );
}
