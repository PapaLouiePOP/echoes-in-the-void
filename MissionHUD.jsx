import { Fragment } from 'react';
import { NODES } from '../data/artifacts';
import { ZONES } from '../data/zones';
import { OrbittoFace, SPARK } from './OrbittoGuide';
import { SpeakerIcon } from './SpeakerIcon';

/* Top HUD: zone badge, 14-node star map, Orbitto chip and the discovery counter. */
export default function MissionHUD({ zoneKey, preview, onBadge, activeId, collected, onNode, onAlbum, muted, onToggleMute }) {
  const Z = ZONES[zoneKey];
  return (
    <header className="hud">
      <div className="hud-inner panel">
        <button className="zone-badge" onClick={onBadge} title={preview ? 'Back to the current zone' : 'Current zone'}>
          <span className="zb-icon" aria-hidden="true">{Z.icon}</span>
          <span><small>{preview ? 'Palette preview' : `Zone ${Z.num}`}</small><b>{Z.name}</b></span>
        </button>

        <nav className="hud-map" aria-label="Star map">
          <div className="sm-track">
            {NODES.map((n, i) => {
              const z = ZONES[n.zone];
              const got = collected.includes(n.id);
              const gap = i > 0 && NODES[i - 1].zone !== n.zone;
              return (
                <Fragment key={n.id}>
                  {i > 0 && <span className={'sm-link' + (gap ? ' gap' : '')} />}
                  <button
                    className={['sm-node', n.id === activeId && 'active', got && 'got', !n.built && 'locked'].filter(Boolean).join(' ')}
                    style={{ '--nc': z.b }}
                    onClick={() => onNode(n)}
                    aria-label={`${n.year}, ${n.name}${got ? ', stamp collected' : ''}`}
                  >
                    <svg viewBox="0 0 24 24" aria-hidden="true"><path d={SPARK} /></svg>
                    <span className="sm-tip">{n.year} {n.name}</span>
                  </button>
                </Fragment>
              );
            })}
          </div>
        </nav>

        <div className="hud-right">
          <button
            className={'mute-btn' + (muted ? ' is-muted' : '')}
            onClick={onToggleMute}
            aria-pressed={muted}
            aria-label={muted ? 'Unmute sound' : 'Mute sound'}
            title={muted ? 'Unmute sound (M)' : 'Mute sound (M)'}
          >
            <SpeakerIcon muted={muted} />
          </button>
          <span className="orbitto-chip" title="Your guide, Orbitto"><OrbittoFace size={26} /><span>Orbitto</span></span>
          <button className="counter" onClick={onAlbum} aria-label={`Artifacts Discovered: ${collected.length} of 14. Open the stamp album`}>
            <svg className="cstar" viewBox="0 0 24 24" aria-hidden="true"><path d={SPARK} /></svg>
            <span className="counter-text"><span className="counter-label">Artifacts Discovered<span className="counter-colon">:</span></span> <b>{collected.length}/14</b></span>
          </button>
        </div>
      </div>
    </header>
  );
}
