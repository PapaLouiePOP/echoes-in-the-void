import { useMemo } from 'react';
import { NODES } from '../data/artifacts';
import { ZONE_ORDER, ZONES } from '../data/zones';
import { REDUCED } from '../lib/motion';
import OrbittoGuide from './OrbittoGuide';
import Sticker from './Sticker';

export const MISSION_COMPLETE_LINE = 'You did it! All 14 mission stamps are in your album.';

const CONFETTI = ['#7ff3ff', '#ffbe6b', '#b9a2ff', '#ffd98a', '#ff9ad5', '#8dffcf'];

/* Unlocks when all 14 stamps are collected. */
export default function MissionComplete({ onClose, onReplay, talking }) {
  const pieces = useMemo(() => Array.from({ length: REDUCED ? 0 : 48 }, (_, i) => ({
    l: Math.random() * 100, d: Math.random() * 4, t: 3.5 + Math.random() * 3, s: 6 + Math.random() * 7, r: Math.random() * 360, c: CONFETTI[i % CONFETTI.length]
  })), []);

  return (
    <div className="overlay celebrate" onClick={onClose}>
      <div className="confetti" aria-hidden="true">
        {pieces.map((p, i) => (
          <i key={i} style={{ left: `${p.l}%`, width: p.s, height: p.s * 0.45, background: p.c, animationDelay: `${p.d}s`, animationDuration: `${p.t}s`, transform: `rotate(${p.r}deg)` }} />
        ))}
      </div>
      <div className="panel mc-panel scroll" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-label="Mission complete">
        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
          <div className="w-28 md:w-36 shrink-0"><OrbittoGuide mood="proud" wave talking={talking} /></div>
          <div className="speech"><b className="speech-name">Orbitto</b>{MISSION_COMPLETE_LINE}</div>
        </div>
        <div className="text-center mt-3">
          <h2 className="game-title mc-title">Mission complete</h2>
          <p className="big-sub" style={{ marginTop: '.4rem' }}>ABANDONED, BUT NOT FORGOTTEN.</p>
        </div>
        {ZONE_ORDER.map((zk, gi) => (
          <section key={zk} className="mc-group">
            <h3>{ZONES[zk].icon} {ZONES[zk].name}</h3>
            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              {NODES.filter((n) => n.zone === zk).map((n, i) => (
                <div key={n.id} className="slot pop" style={{ animationDelay: `${gi * 0.5 + i * 0.1}s` }}>
                  <div className="badge-glow" style={{ '--gc': ZONES[zk].b, animationDelay: `${i * 0.2}s` }}><Sticker id={n.id} size={86} /></div>
                  <span className="slot-name">{n.name}</span>
                </div>
              ))}
            </div>
          </section>
        ))}
        <div className="flex flex-wrap gap-3 justify-center mt-6">
          <button className="btn btn-primary" onClick={onClose}>Keep exploring</button>
          <button className="btn" onClick={onReplay}>Replay the expedition</button>
        </div>
      </div>
    </div>
  );
}
