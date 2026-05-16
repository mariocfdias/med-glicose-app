import { useTheme } from '../theme/ThemeProvider.jsx';

export function NightRiskGauge({ value }) {
  const { T, mode } = useTheme();
  const indicatorStroke = mode === 'dark' ? '#FFFFFF' : '#3A4159';
  const R = 70, cx = 100, cy = 104;
  const angle = value * Math.PI;
  const ix = cx + R * Math.cos(angle);
  const iy = cy - R * Math.sin(angle);
  const label = value < 0.35 ? 'Baixo' : value < 0.65 ? 'Moderado' : 'Alto';
  const c = value < 0.35 ? T.ok : value < 0.65 ? T.warn : T.danger;
  return (
    <div style={{ background: T.bg2, border: '1px solid ' + T.line, borderRadius: 20, padding: '16px 16px 12px', marginTop: 14 }}>
      <div style={{ fontSize: 11, color: T.textMute, letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 4 }}>
        Risco noturno de variação baixa
      </div>
      <svg width="100%" viewBox="0 0 200 174" style={{ display: 'block', overflow: 'visible' }}>
        <defs>
          <linearGradient id="nightGaugeGrad" x1={cx - R} y1={cy} x2={cx + R} y2={cy} gradientUnits="userSpaceOnUse">
            <stop offset="0%"   stopColor="#ef4444"/>
            <stop offset="32%"  stopColor="#f97316"/>
            <stop offset="62%"  stopColor="#eab308"/>
            <stop offset="100%" stopColor="#22c55e"/>
          </linearGradient>
        </defs>
        <path d={`M ${cx - R} ${cy} A ${R} ${R} 0 0 1 ${cx + R} ${cy}`}
          fill="none" stroke={T.bg3} strokeWidth="18" strokeLinecap="round"/>
        <path d={`M ${cx - R} ${cy} A ${R} ${R} 0 0 1 ${cx + R} ${cy}`}
          fill="none" stroke="url(#nightGaugeGrad)" strokeWidth="18" strokeLinecap="round"
          strokeOpacity="0.9"/>
        <circle cx={ix} cy={iy} r={11} fill={T.bg2} stroke={indicatorStroke} strokeWidth="3.5"/>
        <text x={cx} y={cy + 42} textAnchor="middle" fontSize="26" fontWeight="700"
          fill={c} fontFamily="Inter, -apple-system, system-ui, sans-serif">{label}</text>
        <text x={cx} y={cy + 64} textAnchor="middle" fontSize="12"
          fill={T.textMute} fontFamily="Inter, -apple-system, system-ui, sans-serif">Risco</text>
      </svg>
      <div style={{ fontSize: 12, color: T.text, textAlign: 'center', marginTop: 6, paddingBottom: 2, lineHeight: 1.6 }}>
        Probabilidade de variação abaixo do alvo esta noite
      </div>
    </div>
  );
}
