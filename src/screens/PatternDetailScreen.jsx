import { useTheme } from '../theme/ThemeProvider.jsx';
import { ScreenHeader } from '../components/ScreenHeader.jsx';
import { Section, Card, Divider, FootnoteCard } from '../components/FormLayout.jsx';
import { Icon } from '../icons/Icon.jsx';

export function PatternDetailScreen({ id, onClose }) {
  switch (id) {
    case 'night-risk':    return <NightRiskDetail onClose={onClose}/>;
    case 'night-variation': return <NightVariationDetail onClose={onClose}/>;
    case 'lunch-spike':   return <LunchSpikeDetail onClose={onClose}/>;
    case 'after-walk':    return <AfterWalkDetail onClose={onClose}/>;
    default:              return null;
  }
}

function DetailShell({ title, tone = 'info', onClose, children }) {
  const { T } = useTheme();
  const c = tone === 'ok' ? T.ok : tone === 'warn' ? T.warn : tone === 'danger' ? T.danger : T.accent;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0, color: T.textHi }}>
      <div style={{ padding: '0 6px', flexShrink: 0 }}>
        <ScreenHeader title={title} onBack={onClose} actionLabel="" actionDisabled/>
      </div>
      <div className="sg-scroll" style={{ flex: 1, overflowY: 'auto', padding: '10px 20px 28px' }}>
        {children}
      </div>
    </div>
  );
}

function StatBadge({ value, label, tone = 'accent' }) {
  const { T } = useTheme();
  const c = tone === 'ok' ? T.ok : tone === 'warn' ? T.warn : tone === 'danger' ? T.danger : T.accent;
  const cSoft = tone === 'ok' ? T.okSoft : tone === 'warn' ? T.warnSoft : tone === 'danger' ? T.dangerSoft : T.accentSoft;
  return (
    <div style={{ flex: 1, background: cSoft, borderRadius: 16, padding: '14px 10px', textAlign: 'center' }}>
      <div style={{ fontSize: 26, fontWeight: 700, color: c, fontVariantNumeric: 'tabular-nums', lineHeight: 1 }}>{value}</div>
      <div style={{ fontSize: 11, color: c, marginTop: 4, opacity: 0.8, lineHeight: 1.3 }}>{label}</div>
    </div>
  );
}

function BulletItem({ children }) {
  const { T } = useTheme();
  return (
    <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginTop: 10 }}>
      <div style={{ width: 6, height: 6, borderRadius: 99, background: T.textMute, marginTop: 6, flexShrink: 0 }}/>
      <div style={{ fontSize: 13, color: T.text, lineHeight: 1.5, flex: 1 }}>{children}</div>
    </div>
  );
}

function NightRiskDetail({ onClose }) {
  const { T } = useTheme();
  return (
    <DetailShell title="Risco noturno" tone="warn" onClose={onClose}>
      <div style={{ display: 'flex', gap: 10, marginTop: 6 }}>
        <StatBadge value="44%" label="Risco esta noite" tone="warn"/>
        <StatBadge value="02h–06h" label="Janela monitorada" tone="accent"/>
      </div>

      <Section label="O que é este indicador?">
        <Card>
          <div style={{ fontSize: 13, color: T.text, lineHeight: 1.55 }}>
            O indicador de risco noturno estima a probabilidade de sua glicose cair abaixo do alvo (70 mg/dL) durante o sono, com base no histórico dos últimos 14 dias e na tendência atual.
          </div>
          <Divider/>
          <div style={{ fontSize: 13, color: T.text, lineHeight: 1.55 }}>
            <strong style={{ color: T.textHi }}>Baixo</strong> (&lt;35%) — probabilidade pequena. <strong style={{ color: T.textHi }}>Moderado</strong> (35–65%) — atenção recomendada. <strong style={{ color: T.textHi }}>Alto</strong> (&gt;65%) — risco elevado.
          </div>
        </Card>
      </Section>

      <Section label="Histórico recente">
        <Card>
          <div style={{ fontSize: 13, color: T.text, lineHeight: 1.55 }}>
            Nos últimos 7 dias, foram registradas <strong style={{ color: T.warn }}>3 variações noturnas</strong> abaixo de 70 mg/dL, concentradas entre 02h e 04h da manhã.
          </div>
        </Card>
      </Section>

      <Section label="Recomendações">
        <BulletItem>Verifique a glicose antes de dormir — valores entre 100 e 140 mg/dL são ideais.</BulletItem>
        <BulletItem>Considere um lanche leve com carboidratos de absorção lenta se estiver abaixo de 120 mg/dL ao deitar.</BulletItem>
        <BulletItem>Converse com seu endocrinologista sobre ajustes na insulina basal noturna.</BulletItem>
      </Section>
    </DetailShell>
  );
}

function NightVariationDetail({ onClose }) {
  const { T } = useTheme();
  return (
    <DetailShell title="Variações noturnas" tone="warn" onClose={onClose}>
      <div style={{ display: 'flex', gap: 10, marginTop: 6 }}>
        <StatBadge value="3×" label="nos últimos 7 dias" tone="warn"/>
        <StatBadge value="02h–04h" label="horário frequente" tone="accent"/>
      </div>

      <Section label="O que acontece">
        <Card>
          <div style={{ fontSize: 13, color: T.text, lineHeight: 1.55 }}>
            O modelo detectou 3 episódios de glicose abaixo de 70 mg/dL entre 02h e 04h da manhã nos últimos 7 dias. Esse padrão recorrente pode indicar excesso de insulina basal noturna ou atividade física tardia.
          </div>
        </Card>
      </Section>

      <Section label="Possíveis causas">
        <BulletItem>Dose de insulina basal noturna elevada para a rotina atual.</BulletItem>
        <BulletItem>Atividade física intensa realizada à tarde ou à noite.</BulletItem>
        <BulletItem>Jantar com poucos carboidratos sem ajuste de dose.</BulletItem>
      </Section>

      <Section label="O que fazer">
        <BulletItem>Registre o que comeu e a dose de insulina nos dias em que houve variação.</BulletItem>
        <BulletItem>Considere um lanche antes de dormir com 15–20 g de carboidrato.</BulletItem>
        <BulletItem>Compartilhe esse padrão com seu endocrinologista na próxima consulta.</BulletItem>
      </Section>

      <div style={{ marginTop: 14 }}>
        <FootnoteCard tone="warn" icon={<Icon name="bell" size={12}/>}>
          Ative alertas noturnos em Alertas → Configurações para ser avisada caso a glicose caia durante o sono.
        </FootnoteCard>
      </div>
    </DetailShell>
  );
}

function LunchSpikeDetail({ onClose }) {
  const { T } = useTheme();
  return (
    <DetailShell title="Pico pós-almoço" tone="warn" onClose={onClose}>
      <div style={{ display: 'flex', gap: 10, marginTop: 6 }}>
        <StatBadge value="+84" label="mg/dL médio" tone="warn"/>
        <StatBadge value="60 min" label="após o almoço" tone="accent"/>
      </div>

      <Section label="O que acontece">
        <Card>
          <div style={{ fontSize: 13, color: T.text, lineHeight: 1.55 }}>
            Após o almoço, sua glicose costuma subir em média 84 mg/dL em 60 minutos. Esse padrão ocorreu em 5 dos últimos 7 almoços registrados e pode estar relacionado ao horário da insulina ou à composição da refeição.
          </div>
        </Card>
      </Section>

      <Section label="Estratégias">
        <BulletItem>Aplique a insulina 15–20 minutos antes de comer (pré-bolus), se o seu médico permitir.</BulletItem>
        <BulletItem>Prefira carboidratos de índice glicêmico mais baixo: arroz integral, legumes, feijão.</BulletItem>
        <BulletItem>Uma caminhada leve de 10–15 minutos após o almoço pode reduzir o pico em até 30%.</BulletItem>
        <BulletItem>Evite refeições com grande volume de carboidrato refinado em um único prato.</BulletItem>
      </Section>

      <div style={{ marginTop: 14 }}>
        <FootnoteCard tone="info" icon={<Icon name="info" size={12}/>}>
          Registre suas refeições no aplicativo para ajudar o modelo a personalizar as previsões pós-prandiais.
        </FootnoteCard>
      </div>
    </DetailShell>
  );
}

function AfterWalkDetail({ onClose }) {
  const { T } = useTheme();
  return (
    <DetailShell title="Após caminhada" tone="ok" onClose={onClose}>
      <div style={{ display: 'flex', gap: 10, marginTop: 6 }}>
        <StatBadge value="−28" label="mg/dL em 15 min" tone="ok"/>
        <StatBadge value="5×" label="registros esta semana" tone="accent"/>
      </div>

      <Section label="Ótimo padrão!">
        <Card>
          <div style={{ fontSize: 13, color: T.text, lineHeight: 1.55 }}>
            Suas caminhadas estão produzindo uma redução média de 28 mg/dL nos primeiros 15 minutos após o exercício. Esse efeito é positivo para o controle glicêmico geral — continue assim!
          </div>
        </Card>
      </Section>

      <Section label="Dicas para otimizar">
        <BulletItem>Meça a glicose antes de caminhar — se estiver abaixo de 100 mg/dL, faça um lanche leve primeiro.</BulletItem>
        <BulletItem>Caminhadas de 20–30 minutos oferecem o melhor balanço entre benefício e segurança.</BulletItem>
        <BulletItem>Após exercício intenso, fique atenta nas próximas 4 horas — a sensibilidade à insulina aumenta.</BulletItem>
        <BulletItem>Registre a atividade no app para que o modelo leve em conta no cálculo de risco noturno.</BulletItem>
      </Section>

      <div style={{ marginTop: 14 }}>
        <FootnoteCard tone="ok" icon={<Icon name="check" size={12}/>}>
          Manter a regularidade de exercícios é um dos fatores mais impactantes no controle glicêmico a longo prazo.
        </FootnoteCard>
      </div>
    </DetailShell>
  );
}
