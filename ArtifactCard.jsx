import { ARTIFACTS, NODES } from '../data/artifacts';
import { ZONES } from '../data/zones';
import ArtifactImage from './ArtifactImage';
import OrbittoGuide from './OrbittoGuide';
import Sticker from './Sticker';

/* The script's three buttons for every mission. */
const TABS = [
  { id: 'discover', label: '🔬 What did it discover?' },
  { id: 'where', label: '📍 Where is it?' },
  { id: 'museum', label: '🏛️ Visit in the museum' }
];
const DISCOVER_ROWS = ['Objective', 'Original objective', 'Result'];
const WHERE_ROWS = ['Landing', 'Arrival on Mars', 'Location', 'Status'];

export default function ArtifactCard({
  artId, tab, onTab, scanning, scanned, collected, popping,
  onScan, onCollect, onNext, onReplay, onClose, isLast, finishLabel
}) {
  const a = ARTIFACTS[artId];
  const z = ZONES[a.zone];
  const idx = NODES.findIndex((n) => n.id === artId) + 1;
  const rows = tab === 'discover' ? a.sheet.filter((r) => DISCOVER_ROWS.includes(r[0]))
    : tab === 'where' ? a.sheet.filter((r) => WHERE_ROWS.includes(r[0]))
    : a.sheet;

  return (
    <div className="card-screen">
      <div className="mx-auto max-w-4xl enter">
        <div className="card-glow">
          <article className="card" aria-labelledby={`card-${artId}`}>
            <header className="flex flex-wrap items-center gap-2 justify-between">
              <div className="flex flex-wrap gap-2">
                <span className="badge badge-zone">{z.icon} {z.name}</span>
                <span className="badge">🗓️ Mission era {a.year}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="badge badge-num">#{String(idx).padStart(2, '0')} of 14</span>
                <button className="card-close" onClick={onClose} aria-label="Close the artifact card" title="Close (Esc)">✕</button>
              </div>
            </header>
            <h1 id={`card-${artId}`} className="card-title">{a.name}</h1>
            <p className="card-sub">{a.sub}</p>

            <div className="grid md:grid-cols-2 gap-4 md:gap-5 mt-4">
              <div>
                <div className="imgbox">
                  <ArtifactImage image={a.image} art={a.art} name={a.name} />
                  {scanning && (
                    <div className="scan-fx">
                      <div className="scan-grid" /><div className="beam" /><div className="laser" /><div className="emitter" />
                      <div className="scan-mini"><div><OrbittoGuide mood="curious" scanning /></div></div>
                      <span className="scan-label">Scanning</span>
                    </div>
                  )}
                  {collected && <div className="stamp-slot"><Sticker id={artId} size={88} pop={popping} /></div>}
                </div>
                <div className="grid grid-cols-2 gap-3 mt-4">
                  <button className="btn btn-primary" onClick={onScan} disabled={scanning}>
                    {scanning ? 'Scanning…' : scanned ? '↻ Scan again' : '⌖ Scan Artifact'}
                  </button>
                  <button className={'btn ' + (collected ? 'btn-done' : 'btn-gold')} onClick={onCollect} disabled={!scanned || collected} title={!scanned ? 'Scan the artifact first' : undefined}>
                    {collected ? '✓ Stamp collected' : '★ Collect Stamp'}
                  </button>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <div className="tabs" role="tablist" aria-label="Artifact details">
                  {TABS.map((t) => (
                    <button key={t.id} role="tab" className="tab" aria-selected={tab === t.id} onClick={() => onTab(t.id)}>{t.label}</button>
                  ))}
                </div>
                <dl className="sheet" key={tab}>
                  {rows.map((r) => (
                    <div key={r[0]} className="enter"><dt>{r[0]}</dt><dd>{r[0] === 'Name' ? <em>{r[1]}</em> : r[1]}</dd></div>
                  ))}
                </dl>
                {scanned && <div className="funfact enter"><h4>💡 Fun fact</h4><p>{a.funFact}</p></div>}
              </div>
            </div>

            <footer className="flex flex-wrap gap-3 justify-between items-center mt-5">
              <button className="btn btn-sm" onClick={onReplay}>↺ Replay story</button>
              <button className="btn btn-sm btn-primary" onClick={onNext}>{isLast ? finishLabel : 'Continue Expedition ▸'}</button>
            </footer>
          </article>
        </div>
      </div>
    </div>
  );
}
