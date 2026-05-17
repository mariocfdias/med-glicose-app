import { useTheme } from '../theme/ThemeProvider.jsx';

export function Timeline({ steps = [] }) {
  const { T } = useTheme();
  const CIRCLE = 32;

  return (
    <div style={{ padding: '4px 0' }}>
      {steps.map((step, i) => {
        const isLast = i === steps.length - 1;
        return (
          <div key={i} style={{ display: 'flex', gap: 14 }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
              <div style={{
                width: CIRCLE, height: CIRCLE, borderRadius: 99,
                background: T.brand, color: T.brandText,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 13, fontWeight: 700, flexShrink: 0,
              }}>{step.number ?? i + 1}</div>
              {!isLast && (
                <div style={{
                  width: 2, flex: 1, minHeight: 20,
                  background: T.line, marginTop: 4, marginBottom: 4,
                }}/>
              )}
            </div>
            <div style={{ paddingTop: 6, paddingBottom: isLast ? 0 : 20 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: T.textHi, lineHeight: 1.25 }}>{step.title}</div>
              <div style={{ fontSize: 12.5, color: T.text, marginTop: 4, lineHeight: 1.5 }}>{step.body}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
