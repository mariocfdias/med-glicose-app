import { useTheme } from '../theme/ThemeProvider.jsx';

export function GlucoseChart({ data, tone, compact = false, forecast = true }) {
  const { T } = useTheme();
  const w = compact ? 312 : 332;
  const h = compact ? 130 : 180;
  const pad = { l: 26, r: 12, t: 14, b: 22 };
  const xs = data.map(d => d.t);
  const minX = Math.min(...xs), maxX = Math.max(...xs);
  const yMin = 40, yMax = Math.max(260, Math.ceil(Math.max(...data.map(d => d.v)) / 40) * 40);
  const X = (t) => pad.l + ((t - minX) / (maxX - minX)) * (w - pad.l - pad.r);
  const Y = (v) => pad.t + (1 - (v - yMin) / (yMax - yMin)) * (h - pad.t - pad.b);

  const pastD = data.filter(d => d.kind === 'past');
  const futureD = data.filter(d => d.kind === 'future');
  const futWithBridge = pastD.length ? [pastD[pastD.length - 1], ...futureD] : futureD;

  const pathPast = pastD.map((d, i) => (i ? 'L' : 'M') + X(d.t) + ' ' + Y(d.v)).join(' ');
  const pathFut = futWithBridge.map((d, i) => (i ? 'L' : 'M') + X(d.t) + ' ' + Y(d.v)).join(' ');

  const bandTop = futWithBridge.map((d, i) => {
    const spread = i * 1.2 + 4;
    return (i ? 'L' : 'M') + X(d.t) + ' ' + Y(d.v + spread);
  }).join(' ');
  const bandBot = futWithBridge.slice().reverse().map((d, i) => {
    const idx = futWithBridge.length - 1 - i;
    const spread = idx * 1.2 + 4;
    return 'L' + X(d.t) + ' ' + Y(d.v - spread);
  }).join(' ');

  const toneColor = tone === 'ok' ? T.ok : tone === 'warn' ? T.warn : tone === 'danger' ? T.danger : T.accent;
  const nowX = pastD.length ? X(pastD[pastD.length - 1].t) : X((minX + maxX) / 2);

  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} style={{ display: 'block' }}>
      <rect x={pad.l} y={Y(180)} width={w - pad.l - pad.r} height={Y(70) - Y(180)} fill={T.accentSoft} opacity="0.5"/>
      {[
        { v: 70,  color: T.danger },
        { v: 180, color: T.warn },
      ].map(t => (
        <g key={t.v}>
          <line x1={pad.l} x2={w - pad.r} y1={Y(t.v)} y2={Y(t.v)} stroke={t.color} strokeOpacity="0.7" strokeDasharray="2 4"/>
          <text x={pad.l - 4} y={Y(t.v) + 3} fill={t.color} opacity="0.9" fontSize="9" textAnchor="end">{t.v}</text>
        </g>
      ))}
      {!compact && [
        { t: minX, label: '−8h' },
        { t: (minX + maxX) * 0.5, label: 'agora' },
        { t: maxX, label: '+100m' },
      ].map((p, i) => {
        const lx = i === 1 ? nowX : X(p.t);
        return <text key={i} x={lx} y={h - 6} fill={T.textMute} fontSize="9" textAnchor="middle">{p.label}</text>;
      })}
      <line x1={nowX} x2={nowX} y1={pad.t} y2={h - pad.b} stroke={T.line2} strokeDasharray="3 3"/>
      {forecast && <text x={nowX + 4} y={pad.t + 8} fill={T.textMute} fontSize="9">previsão</text>}
      {forecast && <path d={bandTop + ' ' + bandBot + ' Z'} fill={toneColor} opacity="0.10"/>}
      <path d={pathPast} fill="none" stroke={T.textHi} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round"/>
      {forecast && <path d={pathFut} fill="none" stroke={toneColor} strokeWidth="2.5" strokeDasharray="4 4" strokeLinejoin="round" strokeLinecap="round"/>}
      <circle cx={nowX} cy={Y(pastD[pastD.length - 1]?.v || 100)} r="5" fill={toneColor} stroke={T.bg2} strokeWidth="2"/>
      {forecast && futureD.length > 0 && (
        <circle cx={X(futureD[futureD.length - 1].t)} cy={Y(futureD[futureD.length - 1].v)} r="4" fill={toneColor} opacity="0.7"/>
      )}
    </svg>
  );
}
