import { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import { useTheme } from '../theme/ThemeProvider.jsx';
import { ScreenHeader } from '../components/ScreenHeader.jsx';
import { Section, Card, Divider, FootnoteCard } from '../components/FormLayout.jsx';
import { Icon } from '../icons/Icon.jsx';

export function AboutScreen({ onClose }) {
  const { T } = useTheme();
  const chartRef = useRef(null);

  useEffect(() => {
    if (!chartRef.current) return;
    const inst = echarts.init(chartRef.current);
    inst.setOption(buildClarkeOption());
    const onResize = () => inst.resize();
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
      inst.dispose();
    };
  }, []);

  return (
    <div style={{ padding: '8px 20px 24px', color: T.textHi }}>
      <div style={{ marginLeft: -8, marginRight: -8 }}>
        <ScreenHeader title="Sobre" onBack={onClose} actionLabel="" actionDisabled/>
      </div>

      <div style={{
        marginTop: 6, padding: '20px 18px 22px', borderRadius: 24,
        background: T.bg2, border: '1px solid ' + T.line,
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: -40, opacity: 0.5,
          background: `radial-gradient(circle at 20% 0%, ${T.brand}22 0%, transparent 60%)`,
          pointerEvents: 'none',
        }}/>
        <div style={{ fontSize: 11, color: T.textMute, letterSpacing: 1.2, textTransform: 'uppercase', zIndex: 1, position: 'relative' }}>
          Tecnologia
        </div>
        <div style={{ fontSize: 22, fontWeight: 600, marginTop: 4, zIndex: 1, position: 'relative' }}>
          Modelos de regressão
        </div>
        <div style={{ fontSize: 13, color: T.text, lineHeight: 1.55, marginTop: 10, zIndex: 1, position: 'relative' }}>
          A Bee combina modelos de regressão treinados em séries temporais de
          CGM, insulina e refeições. A cada minuto eles projetam a glicose em
          diferentes horizontes, do curto prazo (para evitar hipoglicemia) ao
          longo (para antecipar tendências), e disparam alertas quando o risco
          é alto.
        </div>
      </div>

      <Section label="Desempenho clínico" hint="Acurácia em A+B">
        <Card>
          <MetricRow tone="ok"     value="≈92%" label="Cenário global"          hint="Horizonte de 105 min · todas as faixas"/>
          <Divider/>
          <MetricRow tone="accent" value="≈96%" label="Hipoglicemia"            hint="Horizonte de 30 min · risco imediato"/>
          <Divider/>
          <MetricRow tone="warn"   value="≈91%" label="Hipoglicemia noturna"    hint="Horizonte de 5 h · sono"/>
        </Card>
      </Section>

      <Section label="Clarke Error Grid" hint="Predição vs. referência">
        <Card padded={false} style={{ padding: 0, overflow: 'hidden' }}>
          <div style={{ background: CHART_PALETTE.bg, padding: 14 }}>
            <div ref={chartRef} style={{ width: '100%', height: 300 }}/>
            <div style={{ display: 'flex', gap: 14, marginTop: 8, flexWrap: 'wrap', justifyContent: 'center' }}>
              <LegendDot color={CHART_PALETTE.zoneA} label="A" textColor={CHART_PALETTE.text}/>
              <LegendDot color={CHART_PALETTE.zoneB} label="B" textColor={CHART_PALETTE.text}/>
              <LegendDot color={CHART_PALETTE.zoneC} label="C" textColor={CHART_PALETTE.text}/>
              <LegendDot color={CHART_PALETTE.zoneD} label="D" textColor={CHART_PALETTE.text}/>
              <LegendDot color={CHART_PALETTE.zoneE} label="E" textColor={CHART_PALETTE.text}/>
              <LegendDot color={CHART_PALETTE.point} label="Predições" symbol="dot" textColor={CHART_PALETTE.text}/>
            </div>
          </div>
        </Card>

        <FootnoteCard tone="info" icon={<Icon name="info" size={12}/>}>
          O gráfico compara cada predição (eixo Y) com o valor real medido
          (eixo X). Quanto mais próximo da diagonal, melhor.
        </FootnoteCard>
      </Section>

      <Section label="Como interpretar as zonas A e B" hint="Clarke Error Grid">
        <Card>
          <div style={{ fontSize: 13, color: T.text, lineHeight: 1.55, paddingBottom: 6 }}>
            O Clarke Error Grid avalia se o erro de uma predição de glicose teria impacto clínico na tomada de decisão.
          </div>
          <Divider/>
          <ZoneBlock
            tone="ok"
            letter="A"
            title="Predições clinicamente corretas"
            text="Inclui predições muito próximas do valor real: geralmente dentro de ±20% da glicose medida, ou quando tanto o valor real quanto o previsto indicam hipoglicemia abaixo de 70 mg/dL. Na prática, uma predição nessa zona levaria à mesma decisão clínica que seria tomada usando o valor real."
          />
          <Divider/>
          <ZoneBlock
            tone="accent"
            letter="B"
            title="Erros clinicamente aceitáveis"
            text="Inclui predições que não estão dentro da margem de ±20%, mas cujo erro não levaria a uma decisão perigosa ou inadequada. Ou seja, apesar da diferença numérica, a conduta clínica provavelmente continuaria segura para o paciente."
          />
          <Divider/>
          <div style={{ fontSize: 12.5, color: T.text, lineHeight: 1.55, paddingTop: 4 }}>
            Assim, a soma <strong style={{ color: T.textHi }}>A + B</strong> representa
            a proporção de predições consideradas clinicamente seguras ou aceitáveis.
            Por isso, ela é frequentemente usada para avaliar modelos de predição de
            glicose. Já as zonas C, D e E indicam erros com maior potencial de levar a
            decisões clínicas incorretas, sendo progressivamente mais preocupantes.
          </div>
        </Card>
      </Section>

      <div style={{ marginTop: 18, fontSize: 11, color: T.textMute, textAlign: 'center', lineHeight: 1.5 }}>
        Pontos do gráfico são ilustrativos.<br/>
        Métodos baseados em Clarke et al., Diabetes Care, 1987.
      </div>
    </div>
  );
}

function MetricRow({ value, label, hint, tone = 'ok' }) {
  const { T } = useTheme();
  const c = tone === 'ok' ? T.ok : tone === 'warn' ? T.warn : tone === 'danger' ? T.danger : T.accent;
  const cSoft = tone === 'ok' ? T.okSoft : tone === 'warn' ? T.warnSoft : tone === 'danger' ? T.dangerSoft : T.accentSoft;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '6px 0' }}>
      <div style={{
        minWidth: 64, padding: '8px 10px', borderRadius: 12,
        background: cSoft, color: c,
        fontSize: 16, fontWeight: 700, textAlign: 'center',
        fontVariantNumeric: 'tabular-nums', letterSpacing: -0.3,
      }}>{value}</div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 13.5, color: T.textHi, fontWeight: 600 }}>{label}</div>
        <div style={{ fontSize: 11.5, color: T.textMute, marginTop: 2, lineHeight: 1.35 }}>{hint}</div>
      </div>
    </div>
  );
}

function LegendDot({ color, label, symbol = 'square', textColor }) {
  const { T } = useTheme();
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
      <div style={{
        width: symbol === 'dot' ? 8 : 10,
        height: symbol === 'dot' ? 8 : 10,
        borderRadius: symbol === 'dot' ? 99 : 3,
        background: color,
        opacity: symbol === 'dot' ? 1 : 0.55,
        border: symbol === 'dot' ? 'none' : '1px solid ' + color,
      }}/>
      <div style={{ fontSize: 11.5, color: textColor || T.text }}>{label}</div>
    </div>
  );
}

function ZoneBlock({ letter, title, text, tone }) {
  const { T } = useTheme();
  const c = tone === 'ok' ? T.ok : tone === 'warn' ? T.warn : tone === 'danger' ? T.danger : T.accent;
  const cSoft = tone === 'ok' ? T.okSoft : tone === 'warn' ? T.warnSoft : tone === 'danger' ? T.dangerSoft : T.accentSoft;
  return (
    <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start', padding: '4px 0' }}>
      <div style={{
        width: 34, height: 34, borderRadius: 10,
        background: cSoft, color: c,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontWeight: 700, fontSize: 15, flexShrink: 0,
      }}>{letter}</div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 13.5, color: T.textHi, fontWeight: 600 }}>{title}</div>
        <div style={{ fontSize: 12, color: T.text, marginTop: 3, lineHeight: 1.45 }}>{text}</div>
      </div>
    </div>
  );
}

// Paleta fixa do gráfico: sempre clara, independente do tema do app.
// O Clarke Error Grid precisa de cores nítidas e estáveis para ser legível.
const CHART_PALETTE = {
  bg: '#FAFBFD',
  textHi: '#0B1020',
  text: '#3A4159',
  textMute: '#6B7490',
  line: 'rgba(11,16,32,0.10)',
  line2: 'rgba(11,16,32,0.18)',
  zoneA: '#1FAE6E', // verde
  zoneB: '#2E7BD6', // azul
  zoneC: '#E0890D', // âmbar
  zoneD: '#E1394A', // vermelho
  zoneE: '#8B5CF6', // roxo
  point: '#0B6B33', // verde-escuro (brand) para contraste sobre o fundo claro
};

function clarkeZone(ref, pred) {
  if ((ref < 70 && pred < 70) || Math.abs(pred - ref) <= 0.2 * ref) return 'A';
  if (ref <= 70 && pred >= 180) return 'E';
  if (ref >= 180 && pred <= 70) return 'E';
  if (ref >= 240 && pred >= 70 && pred <= 180) return 'D';
  if (ref <= 70 && pred >= 70 && pred <= 180) return 'D';
  if (ref >= 70 && ref <= 290 && pred >= ref + 110) return 'C';
  if (ref >= 130 && ref <= 180 && pred <= (7 / 5) * ref - 182) return 'C';
  return 'B';
}

function buildClarkeOption() {
  const C = CHART_PALETTE;
  const MAX = 400;
  const STEP = 4;

  const zoneFill = {
    A: C.zoneA,
    B: C.zoneB,
    C: C.zoneC,
    D: C.zoneD,
    E: C.zoneE,
  };
  const zoneOpacity = { A: 0.32, B: 0.22, C: 0.26, D: 0.30, E: 0.28 };

  // Classifica células varrendo a malha [0..400] x [0..400].
  // Agrupa células contíguas de mesma zona em retângulos por linha
  // para reduzir o número de shapes desenhadas.
  const rects = [];
  for (let p = 0; p < MAX; p += STEP) {
    let runStart = 0;
    let runZone = clarkeZone(STEP / 2, p + STEP / 2);
    for (let r = STEP; r < MAX; r += STEP) {
      const z = clarkeZone(r + STEP / 2, p + STEP / 2);
      if (z !== runZone) {
        rects.push([runStart, p, r, p + STEP, runZone]);
        runStart = r;
        runZone = z;
      }
    }
    rects.push([runStart, p, MAX, p + STEP, runZone]);
  }

  const cellSeries = {
    type: 'custom',
    silent: true,
    progressive: 0,
    animation: false,
    data: rects,
    renderItem: (params, api) => {
      const d = rects[params.dataIndex];
      const tl = api.coord([d[0], d[3]]);
      const br = api.coord([d[2], d[1]]);
      const w = br[0] - tl[0];
      const h = br[1] - tl[1];
      const zone = d[4];
      return {
        type: 'rect',
        shape: { x: tl[0] - 0.5, y: tl[1] - 0.5, width: w + 1, height: h + 1 },
        style: {
          fill: zoneFill[zone],
          opacity: zoneOpacity[zone],
        },
      };
    },
    z: 1,
  };

  const zoneLabels = [
    { coord: [55, 55],   text: 'A' },
    { coord: [250, 250], text: 'A' },
    { coord: [355, 240], text: 'B' },
    { coord: [220, 305], text: 'B' },
    { coord: [140, 335], text: 'C' },
    { coord: [40, 125],  text: 'D' },
    { coord: [320, 125], text: 'D' },
    { coord: [35, 320],  text: 'E' },
    { coord: [330, 35],  text: 'E' },
  ];

  const labelSeries = {
    type: 'scatter',
    silent: true,
    symbol: 'none',
    data: zoneLabels.map(l => l.coord),
    label: {
      show: true,
      formatter: (p) => zoneLabels[p.dataIndex].text,
      color: C.textHi,
      fontSize: 11,
      fontWeight: 700,
      opacity: 0.85,
    },
    z: 5,
  };

  const diagonal = {
    type: 'line',
    silent: true,
    showSymbol: false,
    data: [[0,0],[MAX,MAX]],
    lineStyle: { color: C.textMute, type: 'dashed', width: 1, opacity: 0.7 },
    z: 4,
  };

  const lowerBound = {
    type: 'line',
    silent: true,
    showSymbol: false,
    data: [[0,0],[MAX, MAX * 0.8]],
    lineStyle: { color: C.textMute, type: 'dotted', width: 1, opacity: 0.4 },
    z: 3,
  };
  const upperBound = {
    type: 'line',
    silent: true,
    showSymbol: false,
    data: [[0,0],[MAX / 1.2, MAX]],
    lineStyle: { color: C.textMute, type: 'dotted', width: 1, opacity: 0.4 },
    z: 3,
  };

  const points = [];
  let seed = 1;
  const rand = () => { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; };
  for (let i = 0; i < 130; i++) {
    const x = 40 + rand() * 320;
    const drift = (rand() - 0.5) * 0.18;
    let y = x * (1 + drift) + (rand() - 0.5) * 10;
    if (rand() < 0.04) y += (rand() - 0.5) * 80;
    y = Math.max(10, Math.min(390, y));
    points.push([Math.round(x), Math.round(y)]);
  }

  const scatter = {
    type: 'scatter',
    symbolSize: 5,
    data: points,
    itemStyle: { color: C.point, opacity: 0.95, borderColor: '#FFFFFF', borderWidth: 0.5 },
    z: 6,
  };

  return {
    animation: false,
    backgroundColor: C.bg,
    grid: { left: 44, right: 12, top: 14, bottom: 36 },
    xAxis: {
      type: 'value', min: 0, max: MAX, interval: 100,
      name: 'Referência (mg/dL)',
      nameLocation: 'middle', nameGap: 22,
      nameTextStyle: { color: C.textMute, fontSize: 10 },
      axisLine: { lineStyle: { color: C.line2 } },
      axisTick: { lineStyle: { color: C.line2 } },
      axisLabel: { color: C.textMute, fontSize: 10 },
      splitLine: { lineStyle: { color: C.line, type: 'dashed' } },
    },
    yAxis: {
      type: 'value', min: 0, max: MAX, interval: 100,
      name: 'Predição',
      nameLocation: 'middle', nameGap: 32,
      nameTextStyle: { color: C.textMute, fontSize: 10 },
      axisLine: { lineStyle: { color: C.line2 } },
      axisTick: { lineStyle: { color: C.line2 } },
      axisLabel: { color: C.textMute, fontSize: 10 },
      splitLine: { lineStyle: { color: C.line, type: 'dashed' } },
    },
    tooltip: {
      trigger: 'item',
      backgroundColor: '#FFFFFF',
      borderColor: C.line2,
      textStyle: { color: C.textHi, fontSize: 11 },
      formatter: (p) => p.seriesType === 'scatter' && p.data && p.data.length === 2
        ? `Ref ${p.data[0]} → Pred ${p.data[1]} mg/dL` : '',
    },
    series: [cellSeries, lowerBound, upperBound, diagonal, labelSeries, scatter],
  };
}
