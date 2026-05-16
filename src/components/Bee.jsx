import beeSprite from '/bee-sprite.png';

export function Bee({ mood = 'happy', frame = 116 }) {
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
      background: 'linear-gradient(160deg, rgba(91,168,255,0.10), rgba(0,137,61,0.06))',
      border: '1px solid rgba(255,255,255,0.06)',
      overflow: 'hidden',
      position: 'relative',
      boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.2), 0 8px 20px rgba(0,0,0,0.35)',
    }}>
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `url(${beeSprite})`,
        backgroundSize: `${bgW}px ${bgH}px`,
        backgroundPosition: `${bgX}px ${bgY}px`,
        backgroundRepeat: 'no-repeat',
        filter: 'drop-shadow(0 4px 10px rgba(0,0,0,0.4))',
      }}/>
    </div>
  );
}
