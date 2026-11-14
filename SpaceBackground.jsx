import { useEffect, useRef } from 'react';
import { ZONES } from '../data/zones';
import { REDUCED } from '../lib/motion';
import { GasGiant, MarsOrb, MoonOrb } from './art/planets';

/* Pointer position shared by the canvas and the CSS parallax (--px / --py). */
const PTR = { x: 0, y: 0, sx: 0, sy: 0 };
const hexRgb = (h) => { const n = parseInt(h.slice(1), 16); return [(n >> 16) & 255, (n >> 8) & 255, n & 255]; };

/* Three parallax star layers + drifting space dust; colors ease toward the current zone. */
function Starfield({ zone }) {
  const ref = useRef(null);
  const pal = useRef(ZONES[zone]);
  useEffect(() => { pal.current = ZONES[zone]; }, [zone]);

  useEffect(() => {
    const cv = ref.current;
    const ctx = cv && cv.getContext ? cv.getContext('2d') : null;
    if (!ctx) return undefined;
    let w = 0, h = 0, raf = 0, stars = [], dust = [], last = performance.now(), drift = 0;
    const cur = { a: hexRgb(pal.current.a), b: hexRgb(pal.current.b) };
    const layers = [{ n: 150, d: 0.15, s: [0.35, 1] }, { n: 70, d: 0.45, s: [0.7, 1.5] }, { n: 26, d: 1, s: [1.2, 2.2] }];

    function init() {
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      w = cv.clientWidth; h = cv.clientHeight;
      cv.width = w * dpr; cv.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const k = Math.max(0.35, (w * h) / (1280 * 800));
      stars = [];
      layers.forEach((L) => {
        for (let i = 0; i < L.n * k; i++) {
          stars.push({ x: Math.random() * w, y: Math.random() * h, r: L.s[0] + Math.random() * (L.s[1] - L.s[0]), d: L.d, tw: Math.random() * 6.28, ts: 0.4 + Math.random() * 1.4, tint: Math.random() < 0.3 });
        }
      });
      dust = Array.from({ length: Math.round(34 * k) + 8 }, () => ({ x: Math.random() * w, y: Math.random() * h, r: 0.8 + Math.random() * 2.4, vx: (Math.random() - 0.5) * 0.14, vy: -0.04 - Math.random() * 0.14, a: 0.12 + Math.random() * 0.3 }));
    }

    function frame(t) {
      raf = requestAnimationFrame(frame);
      if (document.hidden) return;
      const dt = Math.min(50, t - last); last = t;
      if (!REDUCED) drift += dt * 0.004;
      const ta = hexRgb(pal.current.a), tb = hexRgb(pal.current.b);
      for (let i = 0; i < 3; i++) { cur.a[i] += (ta[i] - cur.a[i]) * 0.03; cur.b[i] += (tb[i] - cur.b[i]) * 0.03; }
      PTR.sx += (PTR.x - PTR.sx) * 0.05; PTR.sy += (PTR.y - PTR.sy) * 0.05;
      document.documentElement.style.setProperty('--px', PTR.sx.toFixed(3));
      document.documentElement.style.setProperty('--py', PTR.sy.toFixed(3));
      ctx.clearRect(0, 0, w, h);
      const px = PTR.sx * 34, py = PTR.sy * 22;
      const B = cur.b.map(Math.round).join(','), A = cur.a.map(Math.round).join(',');
      for (const s of stars) {
        let x = (s.x - drift * s.d * 2 - px * s.d) % w; if (x < 0) x += w;
        let y = (s.y - py * s.d) % h; if (y < 0) y += h;
        const tw = REDUCED ? 0.8 : 0.35 + 0.65 * Math.pow(Math.sin(t * 0.001 * s.ts + s.tw), 2);
        ctx.fillStyle = s.tint ? `rgba(${B},${tw})` : `rgba(236,241,255,${tw})`;
        ctx.beginPath(); ctx.arc(x, y, s.r, 0, 6.283); ctx.fill();
        if (s.r > 1.8 && tw > 0.7) { ctx.fillRect(x - s.r * 3, y - 0.4, s.r * 6, 0.8); ctx.fillRect(x - 0.4, y - s.r * 3, 0.8, s.r * 6); }
      }
      for (const p of dust) {
        if (!REDUCED) { p.x += p.vx * dt * 0.06; p.y += p.vy * dt * 0.06; }
        if (p.y < -10) { p.y = h + 10; p.x = Math.random() * w; }
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;
        ctx.fillStyle = `rgba(${A},${p.a})`;
        ctx.beginPath(); ctx.arc(p.x - px * 1.4, p.y - py * 1.4, p.r, 0, 6.283); ctx.fill();
      }
    }

    const onMove = (e) => {
      if (REDUCED) return;
      PTR.x = (e.clientX / window.innerWidth) * 2 - 1;
      PTR.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    init();
    raf = requestAnimationFrame(frame);
    window.addEventListener('resize', init);
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', init); window.removeEventListener('pointermove', onMove); };
  }, []);

  return <canvas ref={ref} className="stars" aria-hidden="true" />;
}

function Celestial({ zone }) {
  return (
    <div className="celestial" aria-hidden="true">
      <div className="par par-main">
        <div className={'cbody' + (zone === 'moon' ? ' on' : '')}><MoonOrb /></div>
        <div className={'cbody' + (zone === 'mars' ? ' on' : '')}><MarsOrb /></div>
        <div className={'cbody' + (zone === 'deep' ? ' on' : '')}><GasGiant /></div>
      </div>
      <div className="par par-far"><div className="far-orb" /></div>
    </div>
  );
}

export default function SpaceBackground({ zone, dim }) {
  return (
    <>
      <div className="bg-base" />
      <div className="nebula" aria-hidden="true"><span className="neb n1" /><span className="neb n2" /><span className="neb n3" /></div>
      <Starfield zone={zone} />
      <Celestial zone={zone} />
      <div className={'vignette' + (dim ? ' dim' : '')} />
    </>
  );
}
