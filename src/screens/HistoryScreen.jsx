import { useState, useMemo } from 'react';
import { useTheme } from '../theme/ThemeProvider.jsx';
import { ScreenHeader } from '../components/ScreenHeader.jsx';
import { ChipGroup } from '../components/ChipGroup.jsx';
import { Section } from '../components/FormLayout.jsx';
import { Icon } from '../icons/Icon.jsx';

const FILTERS = [
  { value: '1d', label: 'Hoje' },
  { value: '7d', label: '7 dias' },
  { value: '30d', label: '30 dias' },
];

const EVENTS = [
  { day: 'Hoje, 16 de maio', items: [
    { type: 'glucose', time: '14:42', tone: 'warn', title: '184 mg/dL', meta: 'Acima do alvo' },
    { type: 'meal', time: '13:55', tone: 'warn', title: 'Refeição', meta: 'Almoço · 52 g de carbs' },
    { type: 'insulin', time: '13:48', tone: 'accent', title: '6 UI', meta: 'Rápida' },
    { type: 'glucose', time: '12:10', tone: 'ok', title: '118 mg/dL', meta: 'Em alvo' },
    { type: 'activity', time: '07:30', tone: 'ok', title: '22 min de caminhada', meta: 'Intensidade leve' },
  ]},
  { day: 'Quarta, 15 de maio', items: [
    { type: 'glucose', time: '22:14', tone: 'ok', title: '124 mg/dL', meta: 'Em alvo' },
    { type: 'meal', time: '19:30', tone: 'warn', title: 'Refeição', meta: 'Jantar · 38 g de carbs' },
    { type: 'insulin', time: '19:22', tone: 'accent', title: '5 UI', meta: 'Rápida' },
    { type: 'activity', time: '17:05', tone: 'ok', title: '45 min de bicicleta', meta: 'Intensidade moderada' },
    { type: 'glucose', time: '08:00', tone: 'warn', title: '64 mg/dL', meta: 'Abaixo do alvo' },
  ]},
  { day: 'Terça, 14 de maio', items: [
    { type: 'sensor', time: '11:30', tone: 'accent', title: 'Sensor calibrado', meta: 'Calibração manual' },
    { type: 'meal', time: '12:50', tone: 'warn', title: 'Refeição', meta: 'Almoço · 48 g de carbs' },
    { type: 'glucose', time: '08:24', tone: 'ok', title: '102 mg/dL', meta: 'Em alvo' },
  ]},
];

const TYPE_META = {
  glucose: { icon: 'drop', label: 'Leitura' },
  meal: { icon: 'food', label: 'Refeição' },
  insulin: { icon: 'syringe', label: 'Insulina' },
  activity: { icon: 'walk', label: 'Atividade' },
  sensor: { icon: 'sensor', label: 'Sensor' },
};

export function HistoryScreen({ onClose }) {
  const { T } = useTheme();
  const [range, setRange] = useState('7d');
  const [typeFilter, setTypeFilter] = useState('all');

  const filtered = useMemo(() => {
    if (typeFilter === 'all') return EVENTS;
    return EVENTS.map(g => ({
      ...g,
      items: g.items.filter(it => it.type === typeFilter),
    })).filter(g => g.items.length > 0);
  }, [typeFilter]);

  return (
    <div style={{ padding: '8px 20px 24px', color: T.textHi }}>
      <div style={{ marginLeft: -8, marginRight: -8 }}>
        <ScreenHeader title="Histórico" onBack={onClose} actionLabel="" onAction={() => {}} actionDisabled/>
      </div>

      <Section label="Período">
        <ChipGroup options={FILTERS} value={range} onChange={setRange}/>
      </Section>

      <Section label="Tipo">
        <div style={{
          overflowX: 'auto', overflowY: 'hidden',
          marginLeft: -20, marginRight: -20,
          paddingBottom: 4,
        }} className="sg-scroll">
          <div style={{
            display: 'flex', gap: 8,
            paddingLeft: 20, paddingRight: 20,
            width: 'max-content',
          }}>
            <FilterPill iconName={null}    label="Todos"        active={typeFilter === 'all'}      onClick={() => setTypeFilter('all')}/>
            <FilterPill iconName="drop"    label="Leituras"     active={typeFilter === 'glucose'}  onClick={() => setTypeFilter('glucose')}/>
            <FilterPill iconName="food"    label="Refeição"     active={typeFilter === 'meal'}     onClick={() => setTypeFilter('meal')}/>
            <FilterPill iconName="syringe" label="Insulina"     active={typeFilter === 'insulin'}  onClick={() => setTypeFilter('insulin')}/>
            <FilterPill iconName="walk"    label="Atividade"    active={typeFilter === 'activity'} onClick={() => setTypeFilter('activity')}/>
          </div>
        </div>
      </Section>

      {filtered.map((group, gi) => (
        <div key={gi} style={{ marginTop: 22 }}>
          <div style={{
            fontSize: 11.5, color: T.textMute, letterSpacing: 1.2,
            textTransform: 'uppercase', marginBottom: 10, paddingLeft: 4,
          }}>{group.day}</div>
          <div style={{
            background: T.bg2, border: '1px solid ' + T.line, borderRadius: 20,
            overflow: 'hidden',
          }}>
            {group.items.map((it, i) => (
              <EventRow key={i} item={it} last={i === group.items.length - 1}/>
            ))}
          </div>
        </div>
      ))}

      {filtered.length === 0 && (
        <div style={{
          marginTop: 32, padding: 32, textAlign: 'center',
          color: T.textMute, fontSize: 13,
        }}>
          Nenhum evento encontrado nesse filtro.
        </div>
      )}
    </div>
  );
}

function EventRow({ item, last }) {
  const { T } = useTheme();
  const c = item.tone === 'danger' ? T.danger : item.tone === 'warn' ? T.warn : item.tone === 'ok' ? T.ok : T.accent;
  const cSoft = item.tone === 'danger' ? T.dangerSoft : item.tone === 'warn' ? T.warnSoft : item.tone === 'ok' ? T.okSoft : T.accentSoft;
  const meta = TYPE_META[item.type];
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 12,
      padding: '12px 14px',
      borderBottom: last ? 'none' : '1px solid ' + T.line,
    }}>
      <div style={{
        width: 36, height: 36, borderRadius: 12,
        background: cSoft, color: c,
        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
      }}>
        <Icon name={meta.icon} size={17}/>
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 14, color: T.textHi, fontWeight: 600 }}>{item.title}</div>
        <div style={{ fontSize: 11.5, color: T.textMute, marginTop: 2, lineHeight: 1.3 }}>{item.meta}</div>
      </div>
      <div style={{
        fontSize: 12, color: T.textMute,
        fontVariantNumeric: 'tabular-nums', flexShrink: 0,
      }}>{item.time}</div>
    </div>
  );
}

function FilterPill({ iconName, label, active, onClick }) {
  const { T } = useTheme();
  return (
    <button onClick={onClick} style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      padding: iconName ? '7px 13px 7px 10px' : '7px 13px',
      borderRadius: 99,
      background: active ? T.brand : T.bg3,
      color: active ? T.brandText : T.text,
      border: '1px solid ' + (active ? 'transparent' : T.line),
      fontFamily: 'inherit', fontSize: 12.5, fontWeight: 500,
      cursor: 'pointer', flexShrink: 0,
      transition: 'background .18s, color .18s',
    }}>
      {iconName && <Icon name={iconName} size={13} stroke={active ? 2.2 : 1.8}/>}
      {label}
    </button>
  );
}
