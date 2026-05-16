import { useState } from 'react';
import { useTheme } from '../theme/ThemeProvider.jsx';
import { ScreenHeader } from '../components/ScreenHeader.jsx';
import { Section, Card, Row, Divider, Switch, Label, FootnoteCard } from '../components/FormLayout.jsx';
import { Icon } from '../icons/Icon.jsx';

const INITIAL_PEOPLE = [
  { id: 1, name: 'Dr. Helena Vargas',   role: 'Endocrinologista', status: 'active',  permission: 'full',     initials: 'HV', tint: 'accent' },
  { id: 2, name: 'Marcos Mendes',       role: 'Pai',              status: 'active',  permission: 'realtime', initials: 'MM', tint: 'brand'  },
  { id: 3, name: 'Júlia Mendes',        role: 'Irmã',             status: 'invited', permission: 'summary',  initials: 'JM', tint: 'warn'   },
];

const PERMISSION_LABEL = {
  full: 'Acesso completo',
  realtime: 'Tempo real',
  summary: 'Resumo diário',
  emergency: 'Apenas emergências',
};

export function ShareScreen({ onClose }) {
  const { T } = useTheme();
  const [people, setPeople] = useState(INITIAL_PEOPLE);
  const [realtimeOn, setRealtimeOn] = useState(true);
  const [dailySummary, setDailySummary] = useState(true);
  const [emergencyAlerts, setEmergencyAlerts] = useState(true);

  const activeCount = people.filter(p => p.status === 'active').length;
  const invitedCount = people.filter(p => p.status === 'invited').length;

  return (
    <div style={{ padding: '8px 20px 24px', color: T.textHi }}>
      <div style={{ marginLeft: -8, marginRight: -8 }}>
        <ScreenHeader title="Compartilhar" onBack={onClose} actionLabel="" onAction={() => {}} actionDisabled/>
      </div>

      <div style={{
        marginTop: 6, padding: '14px 16px', borderRadius: 18,
        background: T.bg2, border: '1px solid ' + T.line,
        display: 'flex', alignItems: 'center', gap: 12,
      }}>
        <div style={{
          width: 42, height: 42, borderRadius: 14,
          background: 'linear-gradient(135deg, ' + T.brand + ', #00B850)',
          color: '#E8F5EE',
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          boxShadow: '0 6px 16px ' + T.brand + '40',
        }}>
          <Icon name="shield" size={20}/>
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 14, color: T.textHi, fontWeight: 600 }}>
            {activeCount} {activeCount === 1 ? 'pessoa acompanha' : 'pessoas acompanham'} você
          </div>
          <div style={{ fontSize: 11.5, color: T.textMute, marginTop: 2 }}>
            {invitedCount} convite{invitedCount === 1 ? '' : 's'} pendente{invitedCount === 1 ? '' : 's'}
          </div>
        </div>
      </div>

      <Section label="Pessoas com acesso">
        <Card padded={false}>
          {people.map((p, i) => (
            <PersonRow key={p.id} person={p} last={i === people.length - 1}/>
          ))}
        </Card>
        <button style={{
          marginTop: 12, width: '100%',
          padding: '13px 16px', borderRadius: 14,
          background: 'transparent', color: T.brand,
          border: '1px dashed ' + T.brand + '88',
          fontFamily: 'inherit', fontSize: 13.5, fontWeight: 600,
          cursor: 'pointer',
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 7,
        }}>
          <Icon name="plus" size={15} stroke={2.4}/>
          Adicionar pessoa
        </button>
      </Section>

      <Section label="Tipos de compartilhamento">
        <Card>
          <Row>
            <Label hint="Pessoas autorizadas veem suas leituras conforme acontecem">Tempo real</Label>
            <Switch checked={realtimeOn} onChange={setRealtimeOn} label="Tempo real"/>
          </Row>
          <Divider/>
          <Row>
            <Label hint="Envio diário com tempo no alvo, médias e padrões">Resumo diário</Label>
            <Switch checked={dailySummary} onChange={setDailySummary} label="Resumo diário"/>
          </Row>
          <Divider/>
          <Row>
            <Label hint="Alerta imediato em caso de leitura crítica">Apenas emergências</Label>
            <Switch checked={emergencyAlerts} onChange={setEmergencyAlerts} label="Emergências"/>
          </Row>
        </Card>
      </Section>

      <FootnoteCard icon={<Icon name="info" size={13}/>}>
        Você pode revogar o acesso a qualquer momento. As pessoas com acesso recebem apenas as informações configuradas.
      </FootnoteCard>
    </div>
  );
}

function PersonRow({ person, last }) {
  const { T } = useTheme();
  const tint = person.tint === 'brand' ? T.brand
             : person.tint === 'accent' ? T.accent
             : person.tint === 'warn' ? T.warn
             : T.ok;
  const tintSoft = person.tint === 'brand' ? T.brandSoft
                 : person.tint === 'accent' ? T.accentSoft
                 : person.tint === 'warn' ? T.warnSoft
                 : T.okSoft;
  const isPending = person.status === 'invited';

  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 12,
      padding: '14px 14px',
      borderBottom: last ? 'none' : '1px solid ' + T.line,
    }}>
      <div style={{
        width: 42, height: 42, borderRadius: 99,
        background: tintSoft, color: tint,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontWeight: 700, fontSize: 14, letterSpacing: 0.3,
        flexShrink: 0,
        border: '1px solid ' + tint + '33',
        opacity: isPending ? 0.7 : 1,
      }}>{person.initials}</div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <div style={{ fontSize: 14, color: T.textHi, fontWeight: 600 }}>{person.name}</div>
          {isPending && (
            <span style={{
              fontSize: 9.5, color: T.warn, letterSpacing: 0.8, textTransform: 'uppercase',
              padding: '2px 6px', borderRadius: 99,
              background: T.warnSoft, fontWeight: 700,
            }}>convite</span>
          )}
        </div>
        <div style={{ fontSize: 11.5, color: T.textMute, marginTop: 2 }}>
          {person.role} · {PERMISSION_LABEL[person.permission]}
        </div>
      </div>
      <Icon name="arrowRight" size={14} color={T.textMute}/>
    </div>
  );
}
