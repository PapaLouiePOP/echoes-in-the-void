import { Fragment, useEffect, useState } from 'react';
import { ARTIFACTS, NODES } from '../data/artifacts';
import { ZONES } from '../data/zones';
import { REDUCED } from '../lib/motion';
import { Holo } from './art/lineArt';
import { EarthOrb, GasGiant, JupiterOrb, MarsOrb, MoonOrb, SaturnOrb } from './art/planets';

function Countdown() {
  const [n, setN] = useState(REDUCED ? 0 : 10);
  useEffect(() => {
    if (n <= 0) return undefined;
    const t = setTimeout(() => setN(n - 1), 260);
    return () => clearTimeout(t);
  }, [n]);
  return (
    <div className="flex flex-col items-center">
      <div className="count">{n}</div>
      <h2 className="big-title">APOLLO 11</h2>
    </div>
  );
}

/* Draws the visual for one script beat. */
export function Stage({ v, chapter }) {
  const art = chapter.artifact ? ARTIFACTS[chapter.artifact].art : 'surveyor';
  switch (v.k) {
    case 'radio':
      return (
        <div className="radio">
          <span className="ring" /><span className="ring r2" /><span className="ring r3" /><span className="radio-core" />
          <div className="radio-worlds"><span><MoonOrb /></span><span><MarsOrb /></span><span><GasGiant /></span></div>
        </div>
      );
    case 'museum': return <Holo art="museum" />;
    case 'earth': return <div className="earth-pull"><EarthOrb /></div>;
    case 'points':
      return (
        <div className="flex items-center gap-8 md:gap-16">
          <div className="orb-ping w-28 md:w-44"><MoonOrb /><i style={{ left: '58%', top: '40%' }} /><i style={{ left: '30%', top: '62%', animationDelay: '.6s' }} /></div>
          <div className="orb-ping w-24 md:w-36"><MarsOrb /><i style={{ left: '44%', top: '46%', animationDelay: '.3s' }} /><i style={{ left: '64%', top: '64%', animationDelay: '.9s' }} /></div>
        </div>
      );
    case 'moon': return <div className="planet-lg"><MoonOrb /></div>;
    case 'planet': return <div className="planet-lg">{v.p === 'mars' ? <MarsOrb /> : <MoonOrb />}</div>;
    case 'jupiter': return <div className="planet-lg"><JupiterOrb /></div>;
    case 'saturn': return <div className="planet-lg"><SaturnOrb /></div>;
    case 'title':
      return v.final ? (
        <div className="px-2"><h2 className="big-title">ABANDONED, BUT NOT FORGOTTEN.</h2></div>
      ) : (
        <div className="px-2">
          <h2 className="big-title">ABANDONED, BUT NOT FORGOTTEN</h2>
          <p className="big-sub">The stories of the equipment NASA left on the Moon, Mars and in deep space.</p>
        </div>
      );
    case 'path':
      return (
        <div className="flex items-center justify-center gap-2 md:gap-4 w-full max-w-2xl">
          <div className="w-20 md:w-32 shrink-0"><EarthOrb /></div>
          <svg viewBox="0 0 300 80" className="flex-1" style={{ maxWidth: 360, color: 'var(--zB)' }} aria-hidden="true">
            <path className="dash-path" d="M6 60 Q150 -20 294 60" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          </svg>
          <div className="w-14 md:w-24 shrink-0"><MoonOrb /></div>
        </div>
      );
    case 'question': return <h2 className="question">{v.text}</h2>;
    case 'duo': {
      const ghostA = v.ghost === 'a';
      return (
        <div className="flex items-end justify-center gap-4 md:gap-10">
          <div className="flex flex-col items-center"><Holo art={v.a} small ghost={ghostA} /><span className="holo-label">{v.la}</span></div>
          <div className="flex flex-col items-center"><Holo art={v.b} small ghost={!ghostA} /><span className="holo-label">{v.lb}</span></div>
        </div>
      );
    }
    case 'banner': {
      const parts = v.text.split('→').map((s) => s.trim());
      return (
        <div className="flex flex-col items-center">
          <div className="banner-kind">{v.kind}</div>
          <div className="banner-wrap">
            {parts.map((p, i) => (
              <Fragment key={i}>
                {i > 0 && <span className="banner-arrow">→</span>}
                <span className="banner-chip" style={{ animationDelay: `${i * 0.25}s` }}>{p}</span>
              </Fragment>
            ))}
          </div>
        </div>
      );
    }
    case 'storm':
      return <div className="storm"><div className="storm-orb"><MarsOrb /></div><div className="swirl" /><div className="swirl s2" /></div>;
    case 'quake':
      return (
        <div className="flex flex-col items-center">
          <Holo art="insight" anim="shake" />
          <svg className="seismo" viewBox="0 0 300 60" aria-hidden="true">
            <path d="M0 30 H40 L48 12 L56 48 L64 20 L72 40 L80 30 H120 L126 4 L134 56 L142 10 L150 50 L158 30 H200 L206 20 L212 40 L218 30 H300" />
          </svg>
        </div>
      );
    case 'countdown': return <Countdown />;
    case 'trajectories':
      return (
        <svg className="traj" viewBox="0 0 420 210" role="img" aria-label="The trajectories of Pioneer 10 and Pioneer 11">
          <circle cx="40" cy="105" r="16" fill="#ffd98a" style={{ filter: 'drop-shadow(0 0 14px #ffd98a)' }} />
          <circle cx="74" cy="112" r="4" fill="#6fb6ff" />
          <path className="dash-path" d="M40 105 C150 70 270 40 404 18" fill="none" style={{ stroke: 'var(--zB)' }} strokeWidth="3" strokeLinecap="round" />
          <path className="dash-path" d="M40 105 C150 140 270 172 404 192" fill="none" style={{ stroke: 'var(--zA)' }} strokeWidth="3" strokeLinecap="round" />
          <circle cx="404" cy="18" r="5" fill="#fff" /><circle cx="404" cy="192" r="5" fill="#fff" />
          <text x="300" y="20" textAnchor="end">Pioneer 10</text><text x="300" y="200" textAnchor="end">Pioneer 11</text>
        </svg>
      );
    case 'timeline': {
      const pts = NODES.slice().sort((a, b) => Number(a.year) - Number(b.year));
      const years = [...new Set(pts.map((n) => n.year))];
      return (
        <div className="flex flex-col items-center">
          <div className="tl" role="img" aria-label="The 14 artifacts on a timeline">
            {pts.map((n, i) => (
              <Fragment key={n.id}>
                {i > 0 && <span className="tl-link" />}
                <span className="tl-dot" title={`${n.year} ${n.name}`} style={{ '--nc': ZONES[n.zone].b, animationDelay: `${i * 0.12}s` }} />
              </Fragment>
            ))}
          </div>
          {v.years && (
            <div className="tl-years">
              {years.map((y, i) => <span key={y} style={{ animationDelay: `${i * 0.08}s` }}>{i > 0 && <b>→ </b>}{y}</span>)}
            </div>
          )}
        </div>
      );
    }
    case 'words':
      return (
        <div className="words">
          {['DATA', 'DISCOVERIES', 'EXPERIENCE', 'HISTORY'].map((w, i) => (
            <Fragment key={w}>
              {i > 0 && <span className="dotsep">·</span>}
              <span className="banner-chip" style={{ animationDelay: `${i * 0.3}s` }}>{w}</span>
            </Fragment>
          ))}
        </div>
      );
    default:
      return <Holo art={v.art || art} anim={v.anim} />;
  }
}

/* The story screen: chapter badge + the beat's visual. */
export function StoryView({ chapter, ci, beat }) {
  const v = beat.visual || { k: 'holo' };
  const vk = `${ci}:${v.k}:${v.text || v.art || ''}:${v.anim || ''}:${v.years ? 'y' : ''}`;
  const z = ZONES[chapter.zone];
  return (
    <div className="story-view">
      <div key={'c' + ci} className="badge badge-zone enter"><span aria-hidden="true">{z.icon}</span>{chapter.tag}</div>
      <div className="stage-area">
        <div key={vk} className="enter w-full flex items-center justify-center"><Stage v={v} chapter={chapter} /></div>
      </div>
    </div>
  );
}
