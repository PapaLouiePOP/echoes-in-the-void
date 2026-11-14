import { REDUCED, useUid } from '../lib/motion';

/*
  Orbitto — the chibi robot guide.
  mood:     happy | amazed | curious | proud | wistful | neutral
  wave:     waves a tiny arm
  scanning: holds out the artifact scanner
  dusty:    Martian dust on the visor and suit
  talking:  mouth and visor LEDs move while Orbitto speaks
  Colors follow the current zone through the CSS variables --zA, --zB, --zC.
*/

export const SPARK = 'M12 1.5 L14.6 9.4 L22.5 12 L14.6 14.6 L12 22.5 L9.4 14.6 L1.5 12 L9.4 9.4 Z';
const EYE_X = [76, 124];
const EYE_Y = 86;

function Eyes({ mood, led, glow }) {
  const ledFill = `url(#${led})`;
  const filter = `url(#${glow})`;
  if (mood === 'happy') {
    return (
      <g fill="none" stroke={ledFill} strokeWidth="7" strokeLinecap="round" filter={filter}>
        {EYE_X.map((x) => <path key={x} d={`M${x - 12} 93 Q${x} 73 ${x + 12} 93`} />)}
      </g>
    );
  }
  if (mood === 'proud') {
    return (
      <g fill={ledFill} filter={filter}>
        {EYE_X.map((x) => <path key={x} className="led-twinkle" d={SPARK} transform={`translate(${x - 15} ${EYE_Y - 15}) scale(1.25)`} />)}
      </g>
    );
  }
  if (mood === 'amazed') {
    return (
      <g filter={filter}>
        {EYE_X.map((x) => (
          <g key={x} className={REDUCED ? undefined : 'led-blink'}>
            <circle cx={x} cy={EYE_Y} r="14.5" fill={ledFill} />
            <path d={SPARK} transform={`translate(${x - 10} ${EYE_Y - 13}) scale(.62)`} fill="#ffffff" />
            <circle cx={x + 6} cy={EYE_Y + 6} r="2.4" fill="#ffffff" />
          </g>
        ))}
      </g>
    );
  }
  if (mood === 'wistful') {
    return (
      <g filter={filter}>
        {EYE_X.map((x) => (
          <path key={x} d={`M${x - 10} 86 H${x + 10} V89 a10 10 0 0 1 -20 0 Z`} fill={ledFill} />
        ))}
        <path className="led-tear" d="M134 104 q4 6 0 9 q-4 -3 0 -9 Z" fill="#a8e6ff" />
      </g>
    );
  }
  // neutral & curious: rounded LED pills that blink
  const look = mood === 'curious' ? 4 : 0;
  return (
    <g filter={filter}>
      {EYE_X.map((x, i) => {
        const h = mood === 'curious' && i === 1 ? 18 : 28;
        return (
          <g key={x} className={REDUCED ? undefined : 'led-blink'}>
            <rect x={x - 9 + look} y={EYE_Y - h / 2} width="18" height={h} rx="9" fill={ledFill} />
            <rect x={x - 4.5 + look} y={EYE_Y - h / 2 + 4} width="5" height={Math.min(9, h / 3)} rx="2.5" fill="#ffffff" opacity=".9" />
          </g>
        );
      })}
    </g>
  );
}

function Mouth({ mood, led, glow }) {
  const stroke = `url(#${led})`;
  const common = { fill: 'none', stroke, strokeWidth: 3.6, strokeLinecap: 'round', strokeLinejoin: 'round', filter: `url(#${glow})` };
  switch (mood) {
    case 'happy': return <path {...common} d="M90 109 Q95 116 100 109 Q105 116 110 109" />;
    case 'amazed': return <ellipse {...common} cx="100" cy="113" rx="5" ry="6" />;
    case 'proud': return <path d="M88 107 Q100 122 112 107 Z" fill={stroke} filter={`url(#${glow})`} />;
    case 'curious': return <path {...common} d="M94 113 L107 109" />;
    case 'wistful': return <path {...common} d="M93 115 Q100 109 107 115" />;
    default: return <path {...common} d="M93 110 Q100 116 107 110" />;
  }
}

export default function OrbittoGuide({ mood = 'happy', wave = false, scanning = false, dusty = false, talking = false }) {
  const id = useUid('orb');
  const m = mood;
  const tilt = m === 'curious' ? -8 : m === 'wistful' ? 5 : m === 'proud' ? -3 : 0;
  const leftDeg = m === 'amazed' ? 150 : m === 'proud' ? 40 : 14;
  const rightDeg = scanning ? -95 : m === 'amazed' ? -150 : m === 'proud' ? -40 : -14;
  const waving = !scanning && !REDUCED && (wave || m === 'happy');
  const arm = (deg, ox) => ({ transformOrigin: `${ox}px 150px`, transform: `rotate(${deg}deg)` });
  const ids = { head: id + 'h', visor: id + 'v', led: id + 'l', body: id + 'b', glow: id + 'g', soft: id + 's' };

  return (
    <div className={`orbitto mood-${m}${talking ? ' is-talking' : ''}`} role="img" aria-label={`Orbitto looks ${m}${talking ? ' and is talking' : ''}`}>
      <svg viewBox="0 0 200 212">
        <defs>
          <radialGradient id={ids.head} cx="34%" cy="24%" r="85%">
            <stop offset="0" stopColor="#ffffff" /><stop offset=".62" stopColor="#eef1ff" /><stop offset="1" stopColor="#c8cff0" />
          </radialGradient>
          <linearGradient id={ids.visor} x1="0" y1="0" x2=".3" y2="1">
            <stop offset="0" stopColor="#2b3570" /><stop offset=".55" stopColor="#151b45" /><stop offset="1" stopColor="#0a0d28" />
          </linearGradient>
          <linearGradient id={ids.led} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#ffffff" /><stop offset=".55" style={{ stopColor: 'var(--zB)' }} /><stop offset="1" style={{ stopColor: 'var(--zC)' }} />
          </linearGradient>
          <radialGradient id={ids.body} cx="38%" cy="25%" r="90%">
            <stop offset="0" stopColor="#ffffff" /><stop offset="1" stopColor="#d3daf6" />
          </radialGradient>
          <filter id={ids.glow} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2.4" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id={ids.soft} x="-80%" y="-80%" width="260%" height="260%"><feGaussianBlur stdDeviation="4" /></filter>
        </defs>

        <ellipse className="orb-shadow" cx="100" cy="204" rx="40" ry="5.5" fill="#000" opacity=".35" />

        <g className="orb-float">
          <g className="orb-squish">
            {/* floating ringed antenna orb — a tiny planet of its own */}
            <g className="orb-antenna">
              <circle cx="100" cy="6" r="11" style={{ fill: 'var(--zB)' }} opacity=".45" filter={`url(#${ids.soft})`} />
              <circle cx="100" cy="6" r="6.5" style={{ fill: 'var(--zB)' }} />
              <circle cx="98" cy="4" r="2.2" fill="#fff" opacity=".9" />
              <ellipse cx="100" cy="7" rx="11" ry="3.2" fill="none" stroke="#fff" strokeWidth="1.6" opacity=".75" transform="rotate(-14 100 7)" />
            </g>

            {/* feet & squishy body */}
            <ellipse cx="82" cy="194" rx="13" ry="7.5" fill="#c3cbec" />
            <ellipse cx="118" cy="194" rx="13" ry="7.5" fill="#c3cbec" />
            <g className="arm" style={arm(leftDeg, 72)}>
              <ellipse cx="68" cy="164" rx="9" ry="13" fill="#f4f6ff" stroke="#d3daf3" strokeWidth="1.5" />
            </g>
            <rect x="64" y="138" width="72" height="58" rx="29" fill={`url(#${ids.body})`} stroke="#ffffff" strokeOpacity=".7" strokeWidth="2" />
            <rect x="86" y="156" width="28" height="21" rx="10.5" fill="#1d2352" />
            <path d="M100 173 l-6.5 -6.5 a3.8 3.8 0 0 1 6.5 -4.4 a3.8 3.8 0 0 1 6.5 4.4 z" fill="#ff9ad5" filter={`url(#${ids.glow})`} className="led-heart" />
            <circle cx="78" cy="150" r="2.6" style={{ fill: 'var(--zB)' }} />
            <circle cx="122" cy="150" r="2.6" fill="#ffd98a" />
            <g className={'arm' + (waving ? ' waving' : '')} style={arm(waving ? -140 : rightDeg, 128)}>
              <ellipse cx="132" cy="164" rx="9" ry="13" fill="#f4f6ff" stroke="#d3daf3" strokeWidth="1.5" />
              {scanning && (
                <g>
                  <rect x="125" y="172" width="14" height="16" rx="4" fill="#2a3570" />
                  <circle cx="132" cy="190" r="4" style={{ fill: 'var(--zB)' }} filter={`url(#${ids.glow})`} />
                </g>
              )}
            </g>

            {/* the big round head */}
            <g className="headtilt" style={{ transform: `rotate(${tilt}deg)` }}>
              <rect x="95" y="15" width="10" height="10" rx="5" fill="#dfe4fa" />
              <circle cx="28" cy="86" r="13" style={{ fill: 'var(--zC)' }} />
              <circle cx="28" cy="86" r="6" fill="#fff" opacity=".55" />
              <circle cx="172" cy="86" r="13" style={{ fill: 'var(--zC)' }} />
              <circle cx="172" cy="86" r="6" fill="#fff" opacity=".55" />
              <rect x="26" y="22" width="148" height="128" rx="62" fill={`url(#${ids.head})`} stroke="#ffffff" strokeWidth="3" />
              <path d="M44 132 Q100 152 156 132" fill="none" stroke="#b9c2e8" strokeWidth="3" strokeLinecap="round" opacity=".6" />

              {/* oversized glossy visor */}
              <rect x="38" y="40" width="124" height="92" rx="45" fill={`url(#${ids.visor})`} style={{ stroke: 'var(--zB)', strokeOpacity: 0.55 }} strokeWidth="2.5" />
              <rect className="orb-visor-glow" x="38" y="40" width="124" height="92" rx="45" style={{ fill: 'var(--zB)' }} />
              <rect x="44" y="46" width="112" height="80" rx="40" fill="none" stroke="#ffffff" strokeOpacity=".06" strokeWidth="6" />

              <Eyes mood={m} led={ids.led} glow={ids.glow} />
              <g fill="#ff9ad5" opacity={m === 'wistful' ? 0.35 : 0.85} filter={`url(#${ids.glow})`}>
                <rect x="50" y="102" width="15" height="7" rx="3.5" />
                <rect x="135" y="102" width="15" height="7" rx="3.5" />
              </g>
              <g className="orb-mouth"><Mouth mood={m} led={ids.led} glow={ids.glow} /></g>

              {/* visor gloss */}
              <path d="M52 78 Q55 54 84 49" fill="none" stroke="#fff" strokeWidth="7" strokeLinecap="round" opacity=".5" />
              <circle cx="145" cy="58" r="4.5" fill="#fff" opacity=".8" />
              <circle cx="136" cy="54" r="2" fill="#fff" opacity=".6" />
              <path d="M128 122 Q142 116 148 102" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" opacity=".18" />

              {dusty && (
                <g fill="#c27a45">
                  <ellipse cx="100" cy="46" rx="40" ry="6" opacity=".35" />
                  <circle cx="64" cy="34" r="3.4" opacity=".75" /><circle cx="122" cy="28" r="2.5" opacity=".6" />
                  <circle cx="150" cy="44" r="3" opacity=".7" /><circle cx="56" cy="120" r="2.4" opacity=".55" />
                  <circle cx="142" cy="118" r="2.8" opacity=".6" /><circle cx="84" cy="62" r="2" opacity=".5" />
                </g>
              )}
            </g>
            {dusty && (
              <g fill="#c27a45" opacity=".6"><circle cx="80" cy="152" r="2.6" /><circle cx="120" cy="176" r="2.2" /><circle cx="96" cy="186" r="1.8" /></g>
            )}
          </g>
        </g>

        {m === 'amazed' && (
          <g style={{ fill: 'var(--zA)' }}>
            <path className="twk" d={SPARK} transform="translate(4 30) scale(.9)" />
            <path className="twk" d={SPARK} transform="translate(176 22) scale(.7)" style={{ animationDelay: '.5s' }} />
            <path className="twk" d={SPARK} transform="translate(180 110) scale(.5)" style={{ animationDelay: '1s' }} />
          </g>
        )}
        {m === 'proud' && <path className="twk" d={SPARK} transform="translate(166 30) scale(.85)" fill="#ffd98a" />}
        {m === 'curious' && <text x="172" y="40" className="orb-q">?</text>}
      </svg>
    </div>
  );
}

/* Tiny Orbitto face for nameplates, the HUD and buttons. */
export function OrbittoFace({ size = 28 }) {
  const id = useUid('of');
  return (
    <svg className="orbitto-face" width={size} height={size} viewBox="0 0 64 64" aria-hidden="true">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#ffffff" /><stop offset="1" style={{ stopColor: 'var(--zB)' }} /></linearGradient>
      </defs>
      <circle cx="32" cy="6" r="4" style={{ fill: 'var(--zB)' }} />
      <rect x="6" y="12" width="52" height="46" rx="22" fill="#f1f3ff" />
      <rect x="11" y="19" width="42" height="32" rx="16" fill="#151b45" />
      <rect x="21" y="27" width="6" height="11" rx="3" fill={`url(#${id})`} />
      <rect x="37" y="27" width="6" height="11" rx="3" fill={`url(#${id})`} />
      <rect x="15" y="39" width="5" height="3" rx="1.5" fill="#ff9ad5" />
      <rect x="44" y="39" width="5" height="3" rx="1.5" fill="#ff9ad5" />
    </svg>
  );
}
