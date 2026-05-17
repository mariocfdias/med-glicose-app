import beeSprite from '/bee-sprite.png';
import { useTheme } from '../theme/ThemeProvider.jsx';

export function Bee({ mood = 'happy', frame = 116 }) {
  const { T } = useTheme();
  const POS  = { happy: [0, 0], rising: [2, 0], angry: [3, 0], lowsoon: [1, 0], sad: [4, 0] };
  const FINE = { happy: [0, 0], rising: [0, 0], angry: [0, 0], lowsoon: [-15, 0], sad: [0, 0] };
  const [col, row] = POS[mood] || POS.happy;
  const [fdx, fdy] = FINE[mood] || [0, 0];
  const cellW = 1536 / 5;
  const cellH = 1024 / 3;
  const sc = frame / cellW;
  const bgW = Math.round(1536 * sc);
  const bgH = Math.round(1024 * sc);
  const bgX = -Math.round(col * frame) + fdx;
  const bgY = -Math.round(row * cellH * sc) + fdy;
  return (
    <div style={{
      width: frame, height: frame, flexShrink: 0,
      borderRadius: 20,
      background: `linear-gradient(160deg, ${T.accentSoft}, ${T.brandSoft})`,
      border: '1px solid ' + T.line,
      overflow: 'hidden',
      position: 'relative',
      boxShadow: T.shadowInset + ', ' + T.shadowMd,
    }}>
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `url(${beeSprite})`,
        backgroundSize: `${bgW}px ${bgH}px`,
        backgroundPosition: `${bgX}px ${bgY}px`,
        backgroundRepeat: 'no-repeat',
      }}/>
    </div>
  );
}
