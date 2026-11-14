import { useEffect, useRef, useState } from 'react';
import { ARTIFACTS, NODES } from './data/artifacts';
import { CHAPTERS } from './data/script';
import { ZONES } from './data/zones';
import { REDUCED, useTypewriter } from './lib/motion';
import { EMPTY_PROGRESS, loadProgress, saveProgress } from './lib/progress';
import { useOrbittoAudio } from './lib/useOrbittoAudio';
import ArtifactCard from './components/ArtifactCard';
import DialogueDock from './components/DialogueDock';
import MissionComplete, { MISSION_COMPLETE_LINE } from './components/MissionComplete';
import MissionHUD from './components/MissionHUD';
import SpaceBackground from './components/SpaceBackground';
import { StoryView } from './components/Stage';
import StampAlbum from './components/StampAlbum';
import EndScreen from './components/screens/EndScreen';
import TitleScreen from './components/screens/TitleScreen';
import ZoneComplete from './components/screens/ZoneComplete';

/*
  Screens: title → story (script beats) → card (artifact) → … → complete (zone break)
           → finale (story) → end.  Overlays: stamp album, mission complete.
  `init` lets tests or demos start on any screen.
*/
export default function App({ init = {} }) {
  const [screen, setScreen] = useState(init.screen || 'title');
  const [ci, setCi] = useState(init.ci || 0);
  const [bi, setBi] = useState(init.bi || 0);
  const [tab, setTab] = useState('museum');
  const [scanning, setScanning] = useState(false);
  const [prog, setProg] = useState(() => init.prog || loadProgress());
  const [preview, setPreview] = useState(null);
  const [toast, setToast] = useState(null);
  const [album, setAlbum] = useState(!!init.album);
  const [celebrate, setCelebrate] = useState(!!init.celebrate);
  const [popId, setPopId] = useState(null);
  const toastT = useRef();
  const scanT = useRef();
  const celebT = useRef();
  const audio = useOrbittoAudio();

  useEffect(() => { saveProgress(prog); }, [prog]);
  useEffect(() => () => { clearTimeout(toastT.current); clearTimeout(scanT.current); clearTimeout(celebT.current); }, []);

  const chapter = CHAPTERS[ci];
  const beat = chapter.beats[Math.min(bi, chapter.beats.length - 1)];
  const artId = chapter.artifact;
  const art = artId ? ARTIFACTS[artId] : null;
  const zoneKey = preview || chapter.zone;
  const Z = ZONES[zoneKey];
  const scanned = !!artId && prog.scanned.includes(artId);
  const collected = !!artId && prog.collected.includes(artId);
  const lastBeat = bi >= chapter.beats.length - 1;
  const nextCh = CHAPTERS[ci + 1];
  const zoneEnds = !nextCh || nextCh.zone !== chapter.zone || (!!nextCh.epilogue && !chapter.epilogue);
  const allCollected = NODES.every((n) => prog.collected.includes(n.id));
  const fx = screen === 'story' ? beat.fx || '' : '';

  /* ---------- What Orbitto says in the dock ---------- */
  let dText = '', dMood = 'happy', dCue = null, dLabel = 'Orbitto', dTag = null, dKey = screen;
  if (screen === 'story') {
    dText = beat.text; dMood = beat.mood; dCue = beat.cue; dKey = `s${ci}-${bi}`;
  } else if (screen === 'card') {
    if (scanning) { dLabel = 'Scanner'; dText = 'Scanning the artifact…'; dMood = 'curious'; dKey = 'scan' + ci; }
    else if (scanned) { dTag = '💡 Fun fact'; dText = art.funFact; dMood = collected ? 'proud' : 'amazed'; dKey = 'fun' + ci; }
    else { dLabel = 'Hint'; dText = 'Scan the artifact to reveal its fun fact, then collect its stamp.'; dMood = 'curious'; dKey = 'hint' + ci; }
  } else if (screen === 'complete') {
    dLabel = 'Hint'; dMood = 'proud'; dKey = 'complete' + ci;
    dText = `Zone ${ZONES[chapter.zone].num} complete. ` + (nextCh && nextCh.epilogue ? 'Next stop: the museum.'
      : nextCh ? `Next stop: Zone ${ZONES[nextCh.zone].num}, ${ZONES[nextCh.zone].name}.` : '');
  }
  const showDock = screen !== 'title' && screen !== 'end';
  const [shown, done, finish] = useTypewriter(showDock ? dText : '', dKey);
  const orbittoLine = showDock && dLabel === 'Orbitto' && !!dText;

  /* ---------- Sound: Orbitto's voice + typewriter bleeps ---------- */
  const { speak, stop: stopVoice, sfx } = audio;
  useEffect(() => {
    if (celebrate) return;
    if (orbittoLine) speak(dText); else stopVoice();
  }, [dKey, dText, orbittoLine, celebrate, speak, stopVoice]);
  useEffect(() => {
    if (showDock && !done && shown) sfx.blip(shown[shown.length - 1]);
  }, [shown, done, showDock, sfx]);
  useEffect(() => {
    if (!celebrate) return;
    sfx.fanfare();
    speak(MISSION_COMPLETE_LINE);
  }, [celebrate, speak, sfx]);

  /* ---------- Actions ---------- */
  const showToast = (msg) => { setToast(msg); clearTimeout(toastT.current); toastT.current = setTimeout(() => setToast(null), 3400); };
  const goChapter = (i, to = 'story') => {
    setCi(i); setBi(0); setScreen(to); setTab('museum');
    setScanning(false); clearTimeout(scanT.current); setPreview(null);
  };
  const advance = () => {
    if (screen !== 'story') return;
    if (!done) { finish(); return; }
    if (!lastBeat) { setBi(bi + 1); return; }
    if (chapter.artifact) { setScreen('card'); setTab('museum'); return; }
    if (nextCh) goChapter(ci + 1); else { setScreen('end'); setPreview(null); }
  };
  const back = () => {
    if (screen === 'card') { setScreen('story'); setBi(chapter.beats.length - 1); return; }
    if (bi > 0) setBi(bi - 1);
    else if (ci > 0) { setCi(ci - 1); setBi(CHAPTERS[ci - 1].beats.length - 1); }
  };
  const nextFromCard = () => {
    if (!zoneEnds) goChapter(ci + 1);
    else { setScreen('complete'); setPreview(null); clearTimeout(scanT.current); setScanning(false); }
  };
  const scan = () => {
    if (scanning || !artId) return;
    const id = artId;
    setScanning(true);
    sfx.sparkle();
    scanT.current = setTimeout(() => {
      setScanning(false);
      sfx.scanDone();
      setProg((p) => (p.scanned.includes(id) ? p : { ...p, scanned: [...p.scanned, id] }));
    }, REDUCED ? 500 : 2600);
  };
  const collect = () => {
    if (!scanned || collected) return;
    setProg((p) => ({ ...p, collected: [...p.collected, artId] }));
    setPopId(artId);
    sfx.jingle();
    showToast(`★ Stamp collected: ${art.short}`);
    if (NODES.every((n) => n.id === artId || prog.collected.includes(n.id))) {
      clearTimeout(celebT.current);
      celebT.current = setTimeout(() => setCelebrate(true), 1100);
    }
  };
  const onNode = (n) => goChapter(CHAPTERS.findIndex((c) => c.artifact === n.id));
  const firstOf = (zone) => CHAPTERS.findIndex((c) => c.zone === zone && c.artifact);

  /* ---------- Keyboard ---------- */
  const H = useRef({});
  H.current = { advance, back, screen, modal: album || celebrate, toggleMute: audio.toggleMute };
  useEffect(() => {
    const onKey = (e) => {
      const h = H.current;
      if (h.modal) { if (e.key === 'Escape') { setAlbum(false); setCelebrate(false); } return; }
      const tag = (e.target && e.target.tagName) || '';
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;
      if (e.key === 'Escape' && h.screen === 'card') { h.back(); return; }
      if ((e.key === 'm' || e.key === 'M') && !e.metaKey && !e.ctrlKey && !e.altKey) { h.toggleMute(); return; }
      if (tag === 'BUTTON' || tag === 'A') return;
      if (h.screen === 'story') {
        if (e.key === ' ' || e.key === 'Enter' || e.key === 'ArrowRight') { e.preventDefault(); h.advance(); }
        else if (e.key === 'ArrowLeft') h.back();
      } else if (h.screen === 'card' && e.key === 'ArrowLeft') h.back();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  /* ---------- Screens ---------- */
  let main;
  if (screen === 'title') {
    main = <TitleScreen onStart={() => goChapter(0)} onSkip={() => goChapter(firstOf('moon'))} onMars={() => goChapter(firstOf('mars'))} onDeep={() => goChapter(firstOf('deep'))} />;
  } else if (screen === 'story') {
    main = <StoryView chapter={chapter} ci={ci} beat={beat} />;
  } else if (screen === 'card') {
    main = (
      <ArtifactCard
        key={artId} artId={artId} tab={tab} onTab={setTab} scanning={scanning} scanned={scanned} collected={collected}
        popping={popId === artId} onScan={scan} onCollect={collect} onNext={nextFromCard} onReplay={() => goChapter(ci)} onClose={back}
        isLast={zoneEnds} finishLabel={`Finish Zone ${ZONES[chapter.zone].num} ▸`}
      />
    );
  } else if (screen === 'end') {
    main = (
      <EndScreen
        allCollected={allCollected} collectedCount={prog.collected.length}
        onMuseum={() => goChapter(firstOf('moon'), 'card')} onMap={() => setAlbum(true)}
        onTimeline={() => goChapter(CHAPTERS.findIndex((c) => c.id === 'c-final'))} onCelebrate={() => setCelebrate(true)}
      />
    );
  } else {
    const nextLabel = !nextCh ? null : nextCh.epilogue ? '🏛️ Continue to the museum'
      : `${ZONES[nextCh.zone].icon} Continue to Zone ${ZONES[nextCh.zone].num}: ${ZONES[nextCh.zone].name}`;
    main = (
      <ZoneComplete
        zone={chapter.zone} collected={prog.collected} nextLabel={nextLabel} onNext={() => goChapter(ci + 1)}
        onAlbum={() => setAlbum(true)} onReplay={() => goChapter(firstOf(chapter.zone))} onTitle={() => { setScreen('title'); setPreview(null); }}
      />
    );
  }

  let footer = null;
  if (screen === 'story') {
    footer = (
      <div className="dfoot">
        <div className="beat-dots" aria-hidden="true">
          {chapter.beats.map((_, i) => <span key={i} className={'bdot' + (i === bi ? ' on' : i < bi ? ' past' : '')} />)}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button className="btn btn-sm" onClick={back} disabled={ci === 0 && bi === 0}>‹ Back</button>
          {chapter.artifact && !lastBeat && <button className="btn btn-sm" onClick={() => { setScreen('card'); setTab('museum'); }}>Skip to card</button>}
          {lastBeat && chapter.artifact && done
            ? <button className="btn btn-sm btn-primary" onClick={advance}>🔎 VISIT THE ARTIFACT</button>
            : <button className="btn btn-sm btn-primary" onClick={advance}>{!done ? 'Show all' : lastBeat ? 'Continue ▸' : 'Next ▾'}</button>}
        </div>
      </div>
    );
  } else if (screen === 'card') {
    footer = <div className="dfoot dfoot-end"><button className="btn btn-sm" onClick={back}>‹ Back to story</button></div>;
  }

  return (
    <div className={`app screen-${screen}`} style={{ '--zA': Z.a, '--zB': Z.b, '--zC': Z.c, '--zBg': Z.bg }}>
      <SpaceBackground zone={zoneKey} dim={(chapter.dim || fx.includes('dark')) && screen === 'story'} />
      <div className="app-shell">
        {showDock && (
          <MissionHUD
            zoneKey={zoneKey} preview={!!preview} onBadge={() => setPreview(null)}
            activeId={(screen === 'story' || screen === 'card') && !chapter.epilogue ? artId : null}
            collected={prog.collected} onNode={onNode} onAlbum={() => setAlbum(true)}
            muted={audio.muted} onToggleMute={audio.toggleMute}
          />
        )}
        <main className="app-main">{main}</main>
        {showDock && (
          <DialogueDock
            label={dLabel} tag={dTag} cue={dCue} typingKey={dKey} shown={shown} done={done} fullText={dText}
            mood={dMood} fx={fx} compact={screen === 'card'} footer={footer}
            talking={audio.speaking || (orbittoLine && !done)}
            voice={{ supported: audio.voiceSupported, muted: audio.muted, speaking: audio.speaking, onReplay: () => speak(dText) }}
            onTextClick={() => { if (!done) finish(); else if (screen === 'story') advance(); }}
          />
        )}
      </div>
      {album && (
        <StampAlbum
          collected={prog.collected} onClose={() => setAlbum(false)}
          onCelebrate={() => { setAlbum(false); setCelebrate(true); }}
          onReset={() => { setProg(EMPTY_PROGRESS); showToast('Progress reset'); }}
        />
      )}
      {celebrate && <MissionComplete talking={audio.speaking} onClose={() => { setCelebrate(false); stopVoice(); }} onReplay={() => { setCelebrate(false); setAlbum(false); goChapter(0); }} />}
      {toast && <div className="toast" role="status" key={toast}>{toast}</div>}
    </div>
  );
}
