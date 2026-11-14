import { ARTIFACTS } from '../data/artifacts';
import { ZONES } from '../data/zones';
import { useUid } from '../lib/motion';
import { ARTS } from './art/lineArt';

/* Scalloped seal outline for the mission stamps. */
const SEAL = (() => {
  const n = 22, R = 58, r = 52, c = 60;
  let d = '';
  for (let i = 0; i < n * 2; i++) {
    const a = (Math.PI * 2 * i) / (n * 2) - Math.PI / 2;
    const rr = i % 2 ? r : R;
    d += (i ? 'L' : 'M') + (c + rr * Math.cos(a)).toFixed(2) + ' ' + (c + rr * Math.sin(a)).toFixed(2) + ' ';
  }
  return d + 'Z';
})();

export default function Sticker({ id, size = 104, pop = false, dim = false }) {
  const a = ARTIFACTS[id];
  const z = ZONES[a.zone];
  const g = useUid('st');
  return (
    <div className={['sticker', pop && 'pop', dim && 'dim'].filter(Boolean).join(' ')} style={{ width: size, height: size }}>
      <svg viewBox="0 0 120 120" role="img" aria-label={`${a.short} stamp`}>
        <defs>
          <linearGradient id={g} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor={z.b} /><stop offset="1" stopColor={z.c} /></linearGradient>
        </defs>
        <path d={SEAL} fill={`url(#${g})`} />
        <circle cx="60" cy="60" r="42" fill="#121640" />
        <circle cx="60" cy="60" r="37" fill="none" stroke="#fff" strokeOpacity=".55" strokeWidth="1.6" strokeDasharray="3 4" />
        <svg x="28" y="26" width="64" height="46" viewBox="0 0 200 140" fill="none" stroke="#fff" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round">
          {ARTS[a.art]()}
        </svg>
        <text x="60" y="87" textAnchor="middle" fontFamily="Fredoka, ui-rounded, sans-serif" fontWeight="600" fontSize="12" fill={z.b}>{a.year}</text>
      </svg>
    </div>
  );
}
