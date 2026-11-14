import { useEffect, useState } from 'react';
import { REDUCED } from '../lib/motion';
import OrbittoGuide, { OrbittoFace } from './OrbittoGuide';
import { SpeakerIcon } from './SpeakerIcon';

/*
  The RPG dialogue dock pinned to the bottom of the screen.
  compact: smaller dock for the artifact card screen; on phones it can be tucked away
  so it never covers the card.
  voice: { supported, muted, speaking, onReplay } for the Replay Voice button.
*/
export default function DialogueDock({ label = 'Orbitto', tag, cue, typingKey, shown, done, fullText, mood, fx = '', onTextClick, footer, compact, talking, voice = {} }) {
  const [tucked, setTucked] = useState(false);
  useEffect(() => { if (!compact) setTucked(false); }, [compact]);
  const motion = REDUCED ? '' : ['shake', 'hop', 'stuck', 'float'].find((f) => fx.includes(f)) || '';
  const isOrbitto = label === 'Orbitto';

  if (compact && tucked) {
    return (
      <section className="dock dock-tucked">
        <button className="dock-pill" onClick={() => setTucked(false)} aria-label="Show Orbitto’s message">
          <OrbittoFace size={32} /><span>Orbitto</span><span className="pill-hint">{tag || label}</span>
        </button>
      </section>
    );
  }

  return (
    <section className={'dock' + (compact ? ' dock-compact' : '')}>
      <div className="dock-inner">
        <div className="dock-mascot">
          <div className={motion ? `fx-${motion}` : undefined}>
            <OrbittoGuide mood={mood} dusty={fx.includes('dust')} talking={talking} />
          </div>
        </div>
        <div className={'dbox' + (isOrbitto && voice.supported ? ' has-voice' : '')}>
          <span className={'nametag' + (isOrbitto ? '' : ' sys')}>{isOrbitto && <OrbittoFace size={20} />}{label}</span>
          {tag && <span className="funtag">{tag}</span>}
          {isOrbitto && voice.supported && (
            <button
              className={'voice-btn' + (voice.speaking ? ' is-speaking' : '')}
              onClick={voice.onReplay}
              disabled={voice.muted}
              aria-label={voice.muted ? 'Replay voice (sound is off)' : 'Replay Orbitto’s voice'}
              title={voice.muted ? 'Sound is off. Unmute to hear Orbitto.' : 'Replay voice'}
            >
              <SpeakerIcon />
            </button>
          )}
          {compact && <button className="dock-min" onClick={() => setTucked(true)} aria-label="Tuck Orbitto away">⌄</button>}
          {cue && <p className="cue" key={'cue' + typingKey}>▸ {cue}</p>}
          <p className="dtext" onClick={onTextClick} aria-hidden="true">{shown}{!done && <span className="caret" />}</p>
          <p className="sr-only" aria-live="polite">{fullText}</p>
          {footer}
        </div>
      </div>
    </section>
  );
}
