import { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import { useTheme } from '../theme/ThemeProvider.jsx';
import { ScreenHeader } from '../components/ScreenHeader.jsx';
import { Section, Card, Divider, FootnoteCard } from '../components/FormLayout.jsx';
import { Icon } from '../icons/Icon.jsx';

export function AboutScreen({ onClose }) {
  const { T, mode } = useTheme();
  const chartRef = useRef(null);

  useEffect(() => {
    if (!chartRef.current) return;
    const inst = echarts.init(chartRef.current);
    inst.setOption(buildClarkeOption(T));
    const onResize = () => inst.resize();
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
      inst.dispose();
    };
  }, [T, mode]);

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
          diferentes horizontes — curto prazo para evitar hipoglicemia, longo
          para antecipar tendências — e disparam alertas quando o risco é alto.
        </div>
      </div>

      <Section label="Desempenho clínico" hint="Acurácia em A+B">
        <Card>
          <MetricRow tone="ok"     value=">92%" label="Cenário global"          hint="Horizonte de 105 min · todas as faixas"/>
          <Divider/>
          <MetricRow tone="accent" value="≈96%" label="Hipoglicemia"            hint="Horizonte de 30 min · risco imediato"/>
          <Divider/>
          <MetricRow tone="warn"   value="91%"  label="Hipoglicemia noturna"    hint="Horizonte de 5 h · sono"/>
        </Card>
      </Section>

      <Section label="Clarke Error Grid" hint="Predição vs. referência">
        <Card padded={false} style={{ padding: 14 }}>
          <div ref={chartRef} style={{ width: '100%', height: 300 }}/>
          <div style={{ display: 'flex', gap: 14, marginTop: 8, flexWrap: 'wrap', justifyContent: 'center' }}>
            <LegendDot color={T.ok}     label="A"/>
            <LegendDot color={T.accent} label="B"/>
            <LegendDot color={T.warn}   label="C"/>
            <LegendDot color={T.danger} label="D / E"/>
            <LegendDot color={T.brand}  label="Predições" symbol="dot"/>
          </div>
        </Card>

        <FootnoteCard tone="info" icon={<Icon name="info" size={12}/>}>
          O gráfico compara cada predição (eixo Y) com o valor real medido
          (eixo X). Quanto mais próximo da diagonal, melhor.
        </FootnoteCard>
      </Section>

      <Section label="Como ler A e B">
        <Card>
          <ZoneBlock
            tone="ok"
            letter="A"
            title="Clinicamente exata"
            text="Predição dentro de ±20% do valor real (ou ambos abaixo de 70 mg/dL). A decisão tomada com base nela é a mesma que seria tomada com a medida verdadeira."
          />
          <Divider/>
          <ZoneBlock
            tone="accent"
            letter="B"
            title="Desvio benigno"
            text="Fora dos ±20%, porém o erro não muda a conduta clínica — a decisão continua segura para o paciente."
          />
          <Divider/>
          <div style={{ fontSize: 12.5, color: T.text, lineHeight: 1.5, paddingTop: 4 }}>
            <strong style={{ color: T.textHi }}>A soma A + B</strong> mede a fração
            de predições que <em>não</em> levariam a um tratamento errado. É a
            métrica padrão para validar modelos preditivos de glicose. Zonas C,
            D e E representam erros progressivamente mais perigosos.
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

function LegendDot({ color, label, symbol = 'square' }) {
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
      <div style={{ fontSize: 11.5, color: T.text }}>{label}</div>
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

function buildClarkeOption(T) {
  const MAX = 400;

  const zones = [
    {
      name: 'A',
      color: T.ok,
      polys: [
        [[0,0],[70,0],[70,56],[290,232],[400,320],[400,400],[0,0]],
        [[0,0],[58.33,70],[70,84],[400,400],[0,0]],
      ],
    },
    {
      name: 'B',
      color: T.accent,
      polys: [
        [[70,0],[180,0],[180,70],[70,56],[70,0]],
        [[180,0],[400,0],[400,320],[290,232],[180,70],[180,0]],
        [[0,70],[58.33,70],[70,84],[400,400],[400,400],[0,180],[0,70]],
        [[0,180],[400,400],[260,400],[0,180]],
      ],
    },
    {
      name: 'C',
      color: T.warn,
      polys: [
        [[70,180],[70,400],[180,400],[180,70*(180/70)],[70,180]],
      ],
    },
    {
      name: 'D',
      color: T.danger,
      polys: [
        [[70,0],[180,0],[180,70],[70,70],[70,0]],
        [[180,70],[400,70],[400,180],[180,180],[180,70]],
      ],
    },
    {
      name: 'E',
      color: T.danger,
      polys: [
        [[0,180],[70,180],[70,400],[0,400],[0,180]],
        [[180,0],[400,0],[400,70],[180,70],[180,0]],
      ],
    },
  ];

  const zoneSeries = zones.map(z => ({
    type: 'custom',
    silent: true,
    z: z.name === 'A' ? 3 : z.name === 'B' ? 2 : 1,
    data: z.polys,
    renderItem: (params, api) => {
      const poly = z.polys[params.dataIndex];
      const points = poly.map(p => api.coord(p));
      return {
        type: 'polygon',
        shape: { points },
        style: {
          fill: z.color,
          opacity: z.name === 'A' ? 0.22 : z.name === 'B' ? 0.18 : 0.14,
          stroke: z.color,
          lineWidth: 0.5,
          strokeOpacity: 0.3,
        },
      };
    },
  }));

  const zoneLabels = [
    { coord: [35, 35],   text: 'A', color: T.ok },
    { coord: [200, 260], text: 'A', color: T.ok },
    { coord: [130, 30],  text: 'B', color: T.accent },
    { coord: [330, 270], text: 'B', color: T.accent },
    { coord: [50, 250],  text: 'B', color: T.accent },
    { coord: [125, 320], text: 'C', color: T.warn },
    { coord: [125, 130], text: 'D', color: T.danger },
    { coord: [340, 130], text: 'D', color: T.danger },
    { coord: [30, 360],  text: 'E', color: T.danger },
    { coord: [330, 30],  text: 'E', color: T.danger },
  ];

  const labelSeries = {
    type: 'scatter',
    silent: true,
    symbol: 'none',
    data: zoneLabels.map(l => l.coord),
    label: {
      show: true,
      formatter: (p) => zoneLabels[p.dataIndex].text,
      color: T.textHi,
      fontSize: 11,
      fontWeight: 700,
      opacity: 0.6,
    },
    z: 5,
  };

  const diagonal = {
    type: 'line',
    silent: true,
    showSymbol: false,
    data: [[0,0],[MAX,MAX]],
    lineStyle: { color: T.textMute, type: 'dashed', width: 1, opacity: 0.7 },
    z: 4,
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
    itemStyle: { color: T.brand, opacity: 0.85, borderColor: T.brand, borderWidth: 0 },
    z: 6,
  };

  return {
    animation: false,
    backgroundColor: 'transparent',
    grid: { left: 44, right: 12, top: 14, bottom: 36 },
    xAxis: {
      type: 'value', min: 0, max: MAX, interval: 100,
      name: 'Referência (mg/dL)',
      nameLocation: 'middle', nameGap: 22,
      nameTextStyle: { color: T.textMute, fontSize: 10 },
      axisLine: { lineStyle: { color: T.line2 } },
      axisTick: { lineStyle: { color: T.line2 } },
      axisLabel: { color: T.textMute, fontSize: 10 },
      splitLine: { lineStyle: { color: T.line, type: 'dashed' } },
    },
    yAxis: {
      type: 'value', min: 0, max: MAX, interval: 100,
      name: 'Predição',
      nameLocation: 'middle', nameGap: 32,
      nameTextStyle: { color: T.textMute, fontSize: 10 },
      axisLine: { lineStyle: { color: T.line2 } },
      axisTick: { lineStyle: { color: T.line2 } },
      axisLabel: { color: T.textMute, fontSize: 10 },
      splitLine: { lineStyle: { color: T.line, type: 'dashed' } },
    },
    tooltip: {
      trigger: 'item',
      backgroundColor: T.bg2,
      borderColor: T.line2,
      textStyle: { color: T.textHi, fontSize: 11 },
      formatter: (p) => p.seriesType === 'scatter' && p.data && p.data.length === 2
        ? `Ref ${p.data[0]} → Pred ${p.data[1]} mg/dL` : '',
    },
    series: [...zoneSeries, diagonal, labelSeries, scatter],
  };
}
