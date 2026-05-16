export const STATES = {
  normal: {
    label: 'Em alvo', tone: 'ok',
    now: 118, trend: 'estável', trendArrow: '→',
    forecastIn2h: 132, forecastConfidence: 88,
    forecastMessage: 'Você deve continuar dentro do alvo.',
    mascotMood: 'happy',
    timeInRange: 82,
    avg7: 124,
    yesterdayDelta: +4,
    nightRisk: 0.18,
    risk: null,
  },
  rising: {
    label: 'Subindo lentamente', tone: 'warn',
    now: 162, trend: 'subindo lento', trendArrow: '↗',
    forecastIn2h: 198, forecastConfidence: 76,
    forecastMessage: 'Sua glicose pode passar de 180 em ~1h40.',
    mascotMood: 'rising',
    timeInRange: 71,
    avg7: 138,
    yesterdayDelta: +12,
    nightRisk: 0.44,
    risk: { kind: 'high', whenMin: 100, level: 198 },
  },
  high: {
    label: 'Alta', tone: 'danger',
    now: 248, trend: 'subindo', trendArrow: '↑',
    forecastIn2h: 290, forecastConfidence: 81,
    forecastMessage: 'Sua glicose deve continuar subindo nas próximas 2h.',
    mascotMood: 'angry',
    timeInRange: 48,
    avg7: 186,
    yesterdayDelta: +38,
    nightRisk: 0.57,
    risk: { kind: 'high', whenMin: 0, level: 248 },
  },
  lowSoon: {
    label: 'Queda prevista', tone: 'warn',
    now: 96, trend: 'caindo', trendArrow: '↘',
    forecastIn2h: 62, forecastConfidence: 84,
    forecastMessage: 'Você deve cair abaixo de 70 em cerca de 25 min.',
    mascotMood: 'lowsoon',
    timeInRange: 74,
    avg7: 121,
    yesterdayDelta: -8,
    nightRisk: 0.76,
    risk: { kind: 'low', whenMin: 25, level: 62 },
  },
  low: {
    label: 'Baixa', tone: 'danger',
    now: 58, trend: 'caindo', trendArrow: '↓',
    forecastIn2h: 72, forecastConfidence: 70,
    forecastMessage: 'Sua leitura atual está abaixo do alvo recomendado.',
    mascotMood: 'sad',
    timeInRange: 59,
    avg7: 102,
    yesterdayDelta: -22,
    nightRisk: 0.91,
    risk: { kind: 'low', whenMin: 0, level: 58 },
  },
};

export function generateCurve(stateKey) {
  const past = 96, future = 24;
  const arr = [];
  const seed = stateKey.length * 17;
  function rand(i) { return (Math.sin(i * 0.7 + seed) + Math.sin(i * 0.31 + seed * 0.3)) * 0.5; }
  const s = STATES[stateKey];
  let base;
  switch (stateKey) {
    case 'normal':  base = (i) => 115 + rand(i) * 12; break;
    case 'rising':  base = (i) => 110 + (i / past) * 52 + rand(i) * 8; break;
    case 'high':    base = (i) => 170 + (i / past) * 78 + rand(i) * 10; break;
    case 'lowSoon': base = (i) => 145 - (i / past) * 50 + rand(i) * 6; break;
    case 'low':     base = (i) => 110 - (i / past) * 52 + rand(i) * 5; break;
  }
  for (let i = 0; i < past; i++) arr.push({ t: i, v: Math.max(40, base(i)), kind: 'past' });
  const lastVal = arr[arr.length - 1].v;
  const tgt = s.forecastIn2h;
  for (let i = 0; i < future; i++) {
    const frac = (i + 1) / future;
    const v = lastVal + (tgt - lastVal) * frac + rand(past + i) * 4;
    arr.push({ t: past + i, v, kind: 'future' });
  }
  return arr;
}
