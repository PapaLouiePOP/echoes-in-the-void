import { useState } from 'react';
import { NODES } from '../data/artifacts';
import { ZONE_ORDER, ZONES } from '../data/zones';
import Sticker from './Sticker';

/* Stamp album, grouped like the script's interactive map: Moon, Mars, Deep Space. */
export default function StampAlbum({ collected, onClose, onReset, onCelebrate }) {
  const [armed, setArmed] = useState(false);
  const all = NODES.every((n) => collected.includes(n.id));
  return (
    <div className="overlay" onClick={onClose}>
      <div className="panel modal scroll" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-label="Stamp album">
        <div className="flex items-center justify-between gap-3">
          <h2 className="modal-title">📒 Stamp album <span className="badge">{collected.length}/14</span></h2>
          <button className="btn btn-sm" onClick={onClose}>Close</button>
        </div>
        {all && <button className="btn btn-gold w-full mt-4" onClick={onCelebrate}>🏆 Mission complete: view all badges</button>}
        {ZONE_ORDER.map((zk) => (
          <section key={zk} className="mc-group">
            <h3>{ZONES[zk].icon} {ZONES[zk].name}</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
              {NODES.filter((n) => n.zone === zk).map((n) => {
                const has = collected.includes(n.id);
                return (
                  <div key={n.id} className="slot">
                    {has ? <Sticker id={n.id} size={84} /> : <div className="slot-empty">?</div>}
                    <span className="slot-name">{n.name}</span>
                  </div>
                );
              })}
            </div>
          </section>
        ))}
        <div className="flex justify-end mt-6">
          <button className="btn btn-sm" onClick={() => { if (armed) { onReset(); setArmed(false); } else setArmed(true); }}>
            {armed ? 'Tap again to reset' : 'Reset progress'}
          </button>
        </div>
      </div>
    </div>
  );
}
