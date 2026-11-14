# Echoes in the Void — every project file

Each section is one file. Save the code under the exact path shown (paths are relative to the project folder `echoes-in-the-void/`).

## Folder structure

```
.gitignore
.nvmrc
README.md
index.html
netlify.toml
package.json
postcss.config.js
public/orbitto.svg
src/App.jsx
src/components/ArtifactCard.jsx
src/components/ArtifactImage.jsx
src/components/DialogueDock.jsx
src/components/MissionComplete.jsx
src/components/MissionHUD.jsx
src/components/OrbittoGuide.jsx
src/components/SpaceBackground.jsx
src/components/SpeakerIcon.jsx
src/components/Stage.jsx
src/components/StampAlbum.jsx
src/components/Sticker.jsx
src/components/art/lineArt.jsx
src/components/art/planets.jsx
src/components/screens/EndScreen.jsx
src/components/screens/TitleScreen.jsx
src/components/screens/ZoneComplete.jsx
src/data/artifacts.js
src/data/script.js
src/data/zones.js
src/index.css
src/lib/motion.js
src/lib/progress.js
src/lib/sfx.js
src/lib/useOrbittoAudio.js
src/lib/voice.js
src/main.jsx
src/styles/background.css
src/styles/card.css
src/styles/orbitto.css
src/styles/overlays.css
src/styles/stage.css
src/styles/tokens.css
src/styles/ui.css
tailwind.config.js
vercel.json
vite.config.js
```

## `package.json`

```json
{
  "name": "echoes-in-the-void",
  "private": true,
  "version": "1.0.0",
  "description": "A cozy chibi space-museum game about the NASA machines that stayed behind, guided by Orbitto.",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "19.3.1",
    "react-dom": "19.3.1"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "4.7.0",
    "autoprefixer": "10.6.2",
    "postcss": "8.5.32",
    "tailwindcss": "3.4.19",
    "vite": "6.4.5"
  },
  "overrides": {
    "rollup": "npm:@rollup/wasm-node@4.67.2"
  },
  "engines": {
    "node": ">=18.18"
  }
}
```

## `index.html`

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
    <meta name="theme-color" content="#050916" />
    <meta name="description" content="Echoes in the Void: a cozy space museum game about the NASA machines that stayed on the Moon, Mars and in deep space." />
    <title>Echoes in the Void</title>
    <meta property="og:type" content="website" />
    <meta property="og:title" content="Echoes in the Void" />
    <meta property="og:description" content="Explore the NASA machines that stayed behind on the Moon, Mars and in deep space, with Orbitto, your chibi robot guide." />
    <meta property="og:image" content="/orbitto.svg" />
    <meta name="twitter:card" content="summary" />
    <link rel="icon" type="image/svg+xml" href="/orbitto.svg" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;600;700&family=Nunito:wght@600;700;800&display=swap" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

## `vite.config.js`

```js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Static single-page app: `npm run build` writes everything to dist/.
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: false,
    chunkSizeWarningLimit: 800
  }
});
```

## `tailwind.config.js`

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Fredoka', 'ui-rounded', '"Trebuchet MS"', 'system-ui', 'sans-serif'],
        body: ['Nunito', 'ui-rounded', 'system-ui', 'sans-serif']
      }
    }
  },
  plugins: []
};
```

## `postcss.config.js`

```js
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {}
  }
};
```

## `vercel.json`

```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "framework": "vite",
  "buildCommand": "npm run build",
  "outputDirectory": "dist"
}
```

## `netlify.toml`

```toml
[build]
  command = "npm run build"
  publish = "dist"

[build.environment]
  NODE_VERSION = "20"
```

## `.nvmrc`

```
20
```

## `.gitignore`

```
node_modules
dist
.DS_Store
*.log
.vercel
.netlify
```

## `src/main.jsx`

```jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
```

## `src/index.css`

```css
/*
  Style entry point.
  Order matters: Tailwind's reset → design tokens → game styles → Tailwind utilities last,
  so utility classes in the JSX (mt-4, gap-3, md:grid-cols-2…) can still fine-tune the game styles.
*/
@import "tailwindcss/base";
@import "./styles/tokens.css";

@import "tailwindcss/components";
@import "./styles/background.css";
@import "./styles/ui.css";
@import "./styles/orbitto.css";
@import "./styles/stage.css";
@import "./styles/card.css";
@import "./styles/overlays.css";

@import "tailwindcss/utilities";
```

## `src/App.jsx`

```jsx
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
```

## `README.md`

````markdown
# Echoes in the Void

A cozy chibi space-museum game about the NASA machines that stayed behind on the Moon, on Mars and in deep space. Your guide is **Orbitto**, a small floating robot with LED eyes.

Built with React 19, Vite 6 and Tailwind CSS 3. It has no other runtime dependencies: Orbitto's voice uses the browser's built-in speech, and every sound effect is synthesized live.

## Run it

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build in dist/
npm run preview   # serve the production build
```

Requires Node 18.18 or newer (Node 20 recommended).

## Deploy

The project is a static site: `npm run build` writes everything to `dist/`.

**Vercel:** push the folder to GitHub, then in Vercel choose *Add New → Project* and import the repository. `vercel.json` already sets the framework (Vite), the build command (`npm run build`) and the output folder (`dist`). Click *Deploy*.

**Netlify:** choose *Add new site → Import an existing project* and pick the repository. `netlify.toml` already sets the build command, the `dist` publish folder and Node 20. Click *Deploy*. You can also drag the `dist/` folder onto Netlify's *Deploys* page.

### Why the install works on any machine

- **No platform-specific build binaries for Rollup.** Vite 6 bundles with Rollup, which normally installs a separate native binary for each operating system. A lockfile created on one system can then break installs on another, which is the usual cause of "Cannot find module @rollup/rollup-…" errors. The `overrides` entry in `package.json` swaps in `@rollup/wasm-node`, Rollup's official WebAssembly build, which is identical on Windows, macOS, Linux and build servers.
- **Tailwind 3 + PostCSS** are plain JavaScript.
- **No other dependencies:** no icon library, no audio library, no UI kit.
- **Lockfile:** run `npm install` once on your machine and commit the `package-lock.json` it creates, so every deploy installs exactly the same versions. If an install ever fails after switching machines, delete `node_modules` and `package-lock.json` and run `npm install` again.

## Project structure

```
echoes-in-the-void/
├── index.html                 Fonts (Fredoka + Nunito), title, metadata, favicon
├── package.json               Pinned versions + the Rollup override
├── vite.config.js             Vite + React plugin
├── tailwind.config.js         Content paths, Fredoka/Nunito font families
├── postcss.config.js          Tailwind + Autoprefixer
├── vercel.json                Vercel build settings
├── netlify.toml               Netlify build settings
├── .nvmrc                     Node 20 for local tools and Netlify
├── public/orbitto.svg         Favicon
└── src/
    ├── main.jsx               Entry point
    ├── index.css              Style entry: Tailwind reset → game styles → Tailwind utilities
    ├── App.jsx                Game flow: title → story → card → zone break → finale → end
    ├── data/
    │   ├── script.js          The full English script: every line, stage direction and mood
    │   ├── artifacts.js       14 artifact cards (fact sheets, fun facts, image props) + star map
    │   └── zones.js           Zone palettes: Moon, Mars, Deep Space
    ├── lib/
    │   ├── motion.js          Typewriter, reduced-motion flag, SVG-safe ids
    │   ├── voice.js           Orbitto's voice (Web Speech API): voice picking, pitch, rate
    │   ├── sfx.js             Synthesized sounds (Web Audio API): bleeps, chimes, jingles
    │   ├── useOrbittoAudio.js One mute switch for voice + sound, saved in the browser
    │   └── progress.js        Saves stamps in localStorage
    ├── components/
    │   ├── OrbittoGuide.jsx   Orbitto (moods, wave, scanner, dust) + OrbittoFace avatar
    │   ├── DialogueDock.jsx   RPG dialogue box pinned to the bottom
    │   ├── MissionHUD.jsx     Zone badge, 14-node star map, Orbitto chip, counter
    │   ├── ArtifactCard.jsx   Collectible card: tabs, Scan Artifact, Collect Stamp
    │   ├── ArtifactImage.jsx  NASA image slot with hologram fallback
    │   ├── Stage.jsx          Story visuals for each script beat
    │   ├── SpaceBackground.jsx Parallax stars, dust, nebula, planets
    │   ├── Sticker.jsx        Mission stamp badges
    │   ├── SpeakerIcon.jsx    Icon for the mute toggle and Replay Voice button
    │   ├── StampAlbum.jsx     Album grouped by zone
    │   ├── MissionComplete.jsx Celebration when all 14 stamps are collected
    │   ├── art/lineArt.jsx    Hologram line art for every artifact
    │   ├── art/planets.jsx    Moon, Mars, Earth, Jupiter, Saturn, gas giant
    │   └── screens/           TitleScreen, ZoneComplete, EndScreen
    └── styles/
        ├── tokens.css         Colors, fonts, page base
        ├── ui.css             Panels, chunky buttons, badges, HUD, dialogue dock
        ├── orbitto.css        Orbitto's float, squish and mood animations
        ├── stage.css          Story stage visuals
        ├── card.css           Artifact card, scanner, stamps
        └── overlays.css       Title, zone break, end, modals, celebration, toasts
```

## The script

All story text lives in `src/data/script.js` (Orbitto's lines and the stage directions) and `src/data/artifacts.js` (fact sheets and fun facts). Components never hold story text, so you can review or edit the script in one place.

A beat looks like this:

```js
L('A helicopter flew on another planet.', 'amazed', { k: 'holo', anim: 'fly' }, 'The helicopter takes off.', 'hop')
//  Orbitto's line                         mood      stage visual                  stage direction            reaction
```

- **Moods:** `happy`, `amazed`, `curious`, `proud`, `wistful`. Each one changes Orbitto's LED eyes, mouth and body motion.
- **Reactions (`fx`):** `hop`, `shake`, `stuck`, `float`, `dust` (dusty visor), `dark` (dims the screen). Combine them with spaces, e.g. `'dust dark'`.

The only lines that are not from the script are interface text: button labels, hints, and Orbitto's speech bubble in the Mission Complete window.

## Adding NASA images

Every artifact in `src/data/artifacts.js` has an `image` object:

```js
image: { src: '', nasaId: '', alt: 'Surveyor 1 — NASA image', credit: 'NASA' },
```

There are two ways to fill it:

1. **By NASA ID (recommended).** Find the image on [images.nasa.gov](https://images.nasa.gov). The ID is the last part of the page URL (`images.nasa.gov/details/<nasaId>`). Paste it into `nasaId`. The card builds the image URL with `nasaImageUrl()` and links the credit to the NASA page.
2. **By URL.** Put any full image URL in `src`. It takes priority over `nasaId`.

If both are empty, or the image fails to load, the card shows the animated hologram instead. To change the size, change the default `'medium'` in `nasaImageUrl()` to `'small'`, `'large'` or `'orig'`.

## Sound

**Orbitto's voice.** Orbitto reads its lines aloud in English using `window.speechSynthesis`. On load, `lib/voice.js` scores the voices installed in the browser. It prefers clear, friendly English voices (Google US English, Samantha, Microsoft's Natural voices, and so on) and skips novelty voices. Pitch and rate are set in `VOICE_SETTINGS` (pitch 1.42, rate 1.07). While Orbitto talks, its LED mouth moves in time with each spoken word and its visor glows softly. Only Orbitto's lines are spoken: hints, stage directions and button text are not.

**Sound effects.** `lib/sfx.js` builds every sound from oscillators, so there are no audio files:

- `blip` is the bubbly typewriter bleep. Each letter maps to a note on a pentatonic scale.
- `sparkle` plays when a scan starts, and `scanDone` when it finishes.
- `jingle` is the level-up tune for collecting a stamp.
- `fanfare` plays for Mission Complete.
- `pop` plays when sound is turned back on.

**Controls.** The speaker button in the HUD (or the **M** key) mutes and unmutes all sound; the choice is saved in this browser. The speaker button inside the dialogue box replays Orbitto's current line.

Browsers only allow sound after the player interacts with the page, so audio starts with the first tap or key press (for example, "Start the tour"). The available voices differ between browsers and operating systems, so Orbitto may sound slightly different on each device. If a browser has no speech support, the Replay Voice button is hidden and the sound effects still play.

## Responsive behavior

- **Phones:** the HUD stacks into two rows, Orbitto shrinks, and the dialogue dock stays at the bottom without overlapping the content above it. On artifact cards the dock becomes compact, and the ⌄ button tucks it into a small pill so the whole card is visible.
- **Tablets and desktops:** single-row HUD, large Orbitto, and full dialogue text.
- Safe areas (notches, home bars) are respected, and hover effects only run on devices that can hover.

## Accessibility

- Keyboard: Space or Enter advances, ← goes back, M mutes or unmutes sound, Esc closes the artifact card and other windows.
- Orbitto's full line is announced to screen readers while it types out on screen.
- With "reduce motion" turned on, text appears instantly and animations stop.

## Customizing

- **Zone colors:** `src/data/zones.js` (`a` highlight, `b` main neon, `c` secondary glow, `bg` sky).
- **Global colors and the bounce curve:** `src/styles/tokens.css`.
- **Animation names:** custom `@keyframes` must not reuse Tailwind's built-in names (`spin`, `ping`, `pulse`, `bounce`), or Tailwind's version replaces yours. The two that clashed are now `ev-glow-orbit` and `ev-ping`; use the same `ev-` prefix for new animations.
- **Progress:** stored under the localStorage key `echoes-in-the-void:v1`. "Reset progress" is in the stamp album.
````

## `public/orbitto.svg`

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><circle cx="32" cy="6" r="4" fill="#7ff3ff"/><rect x="6" y="12" width="52" height="46" rx="22" fill="#f1f3ff"/><rect x="11" y="19" width="42" height="32" rx="16" fill="#151b45"/><rect x="21" y="27" width="6" height="11" rx="3" fill="#7ff3ff"/><rect x="37" y="27" width="6" height="11" rx="3" fill="#7ff3ff"/><rect x="15" y="39" width="5" height="3" rx="1.5" fill="#ff9ad5"/><rect x="44" y="39" width="5" height="3" rx="1.5" fill="#ff9ad5"/></svg>
```

## `src/components/ArtifactCard.jsx`

```jsx
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
```

## `src/components/ArtifactImage.jsx`

```jsx
import { useEffect, useState } from 'react';
import { nasaImageUrl, nasaPageUrl } from '../data/artifacts';
import { Holo } from './art/lineArt';

/*
  The card's picture. Reads the artifact's `image` prop:
    { src, nasaId, alt, credit }
  - src set            → shows that URL
  - only nasaId set    → builds the images.nasa.gov asset URL
  - neither, or error  → shows the hologram placeholder
*/
export default function ArtifactImage({ image = {}, art, name }) {
  const src = image.src || nasaImageUrl(image.nasaId);
  const [failed, setFailed] = useState(false);
  useEffect(() => { setFailed(false); }, [src]);

  if (src && !failed) {
    const page = nasaPageUrl(image.nasaId);
    return (
      <figure className="nasa-figure">
        <img src={src} alt={image.alt || name} loading="lazy" decoding="async" onError={() => setFailed(true)} />
        <figcaption className="img-credit">
          {page ? <a href={page} target="_blank" rel="noreferrer">{image.credit || 'NASA'}</a> : image.credit || 'NASA'}
        </figcaption>
      </figure>
    );
  }
  return (
    <div className="nasa-placeholder">
      <Holo art={art} />
      <span className="img-note">📷 NASA image slot</span>
    </div>
  );
}
```

## `src/components/DialogueDock.jsx`

```jsx
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
```

## `src/components/MissionComplete.jsx`

```jsx
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
```

## `src/components/MissionHUD.jsx`

```jsx
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
```

## `src/components/OrbittoGuide.jsx`

```jsx
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
```

## `src/components/SpaceBackground.jsx`

```jsx
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
```

## `src/components/SpeakerIcon.jsx`

```jsx
/* Speaker icon for the Mute toggle and the Replay Voice button. Sound waves animate while Orbitto speaks. */
export function SpeakerIcon({ muted = false }) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 9.5h3.2L12 5.5v13l-4.8-4H4z" fill="currentColor" fillOpacity=".25" />
      {muted ? (
        <path d="M16 9.5l5 5M21 9.5l-5 5" />
      ) : (
        <>
          <path className="wave w1" d="M15.5 9.2a4 4 0 0 1 0 5.6" />
          <path className="wave w2" d="M18.3 6.6a7.6 7.6 0 0 1 0 10.8" />
        </>
      )}
    </svg>
  );
}
```

## `src/components/Stage.jsx`

```jsx
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
```

## `src/components/StampAlbum.jsx`

```jsx
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
```

## `src/components/Sticker.jsx`

```jsx
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
```

## `src/components/art/lineArt.jsx`

```jsx
/* Hologram line art for every artifact (viewBox 0 0 200 140, stroke = currentColor). */
export const ARTS = {
  surveyor: () => (<>
    <path d="M100 20 V62" />
    <path d="M84 30 Q100 16 116 30 Z" fill="currentColor" fillOpacity=".14" />
    <g transform="rotate(-16 126 46)"><rect x="106" y="36" width="42" height="20" rx="2" fill="currentColor" fillOpacity=".14" /><path d="M120 36 V56 M134 36 V56" opacity=".55" /></g>
    <rect x="78" y="62" width="44" height="24" rx="4" fill="currentColor" fillOpacity=".12" />
    <circle cx="91" cy="74" r="4" />
    <path d="M106 70 H116 M106 78 H116" opacity=".6" />
    <path d="M82 86 L54 118 M118 86 L146 118 M100 86 V122" />
    <ellipse cx="54" cy="120" rx="10" ry="3.5" /><ellipse cx="146" cy="120" rx="10" ry="3.5" /><ellipse cx="100" cy="124" rx="10" ry="3.5" />
    <path d="M24 130 H176" opacity=".35" strokeDasharray="2 7" /></>),
  surveyor3: () => (<>
    {ARTS.surveyor()}
    <path d="M122 80 L140 96 L154 92" />
    <path d="M152 87 l7 6 l-5 3 z" fill="currentColor" fillOpacity=".35" /></>),
  lm: () => (<>
    <path d="M78 70 V48 L90 34 H112 L124 48 V70" strokeDasharray="4 5" opacity=".5" />
    <path d="M94 34 V26 M108 34 L114 24" strokeDasharray="3 4" opacity=".45" />
    <path d="M68 70 H132 L140 84 L132 98 H68 L60 84 Z" fill="currentColor" fillOpacity=".16" />
    <path d="M68 84 H132" opacity=".5" />
    <path d="M92 98 L96 108 H104 L108 98" />
    <path d="M64 94 L40 124 M136 94 L160 124 M80 98 L74 128 M120 98 L126 128" />
    <ellipse cx="40" cy="126" rx="9" ry="3" /><ellipse cx="160" cy="126" rx="9" ry="3" /><ellipse cx="74" cy="130" rx="8" ry="2.6" /><ellipse cx="126" cy="130" rx="8" ry="2.6" />
    <path d="M20 134 H180" opacity=".35" strokeDasharray="2 7" /></>),
  alsep: () => (<>
    <rect x="80" y="72" width="44" height="26" rx="3" fill="currentColor" fillOpacity=".14" />
    <path d="M86 80 H118 M86 88 H118" opacity=".5" />
    <path d="M102 72 V46" /><path d="M88 46 Q102 34 116 46 Z" fill="currentColor" fillOpacity=".14" />
    <path d="M84 98 V114 M120 98 V114" />
    <path d="M46 114 Q58 96 70 114 Z" fill="currentColor" fillOpacity=".16" />
    <path d="M70 110 Q76 104 82 100" strokeDasharray="3 3" />
    <rect x="140" y="100" width="24" height="14" rx="2" fill="currentColor" fillOpacity=".14" />
    <path d="M152 100 V90 M146 90 H158" />
    <path d="M124 92 Q134 98 140 106" strokeDasharray="3 3" />
    <path d="M20 118 H180" opacity=".35" strokeDasharray="2 7" /></>),
  lrv: () => (<>
    <path d="M36 90 H164 L156 78 H44 Z" fill="currentColor" fillOpacity=".14" />
    <circle cx="60" cy="100" r="15" /><circle cx="60" cy="100" r="5" />
    <circle cx="140" cy="100" r="15" /><circle cx="140" cy="100" r="5" />
    <path d="M44 90 Q60 78 76 90 M124 90 Q140 78 156 90" opacity=".5" />
    <path d="M84 78 V62 H96 M106 78 V62 H118" />
    <path d="M62 78 V50" /><path d="M48 50 Q62 40 76 50 Z" fill="currentColor" fillOpacity=".16" />
    <path d="M142 78 V58 L154 54" /><rect x="150" y="47" width="10" height="8" rx="2" />
    <path d="M18 116 H182" opacity=".35" strokeDasharray="2 7" /></>),
  fallen: () => (<>
    <rect x="104" y="64" width="62" height="38" rx="3" fill="currentColor" fillOpacity=".12" />
    <path d="M112 74 H158 M112 82 H150 M112 90 H156" opacity=".6" />
    <path d="M108 102 V112 M162 102 V112" />
    <circle cx="52" cy="104" r="6" fill="currentColor" fillOpacity=".25" />
    <path d="M58 104 H84" />
    <path d="M66 104 L72 96 M66 104 L72 112 M84 104 L92 98 M84 104 L92 110" />
    <path d="M20 114 H180" opacity=".35" strokeDasharray="2 7" /></>),
  walker: () => (<>
    <circle cx="100" cy="46" r="14" fill="currentColor" fillOpacity=".14" />
    <path d="M92 44 Q100 38 108 44" opacity=".6" />
    <rect x="88" y="60" width="24" height="32" rx="9" fill="currentColor" fillOpacity=".12" />
    <rect x="110" y="62" width="9" height="22" rx="3" />
    <path d="M90 68 L78 86 M110 68 L120 82" />
    <path d="M94 92 L86 118 M106 92 L116 116" />
    <ellipse cx="62" cy="124" rx="5" ry="2" opacity=".55" /><ellipse cx="46" cy="126" rx="5" ry="2" opacity=".4" /><ellipse cx="30" cy="124" rx="5" ry="2" opacity=".28" />
    <path d="M14 130 H186" opacity=".35" strokeDasharray="2 7" /></>),
  viking: () => (<>
    <path d="M70 66 L84 54 H116 L130 66 L116 78 H84 Z" fill="currentColor" fillOpacity=".16" />
    <path d="M70 66 V76 L84 88 H116 L130 76 V66" />
    <path d="M78 84 L52 116 M122 84 L148 116 M100 88 V120" />
    <ellipse cx="52" cy="118" rx="10" ry="3.4" /><ellipse cx="148" cy="118" rx="10" ry="3.4" /><ellipse cx="100" cy="122" rx="10" ry="3.4" />
    <path d="M108 54 V34" /><path d="M94 34 Q108 22 122 34 Z" fill="currentColor" fillOpacity=".16" />
    <path d="M82 54 V40 M77 40 H87" />
    <path d="M130 72 L150 84 L162 80" />
    <path d="M70 70 L58 64 M70 76 L58 80" opacity=".6" />
    <path d="M20 128 H180" opacity=".35" strokeDasharray="2 7" /></>),
  sojourner: () => (<>
    <rect x="62" y="68" width="76" height="8" rx="2" fill="currentColor" fillOpacity=".22" />
    <path d="M76 68 V76 M100 68 V76 M124 68 V76" opacity=".5" />
    <rect x="70" y="76" width="60" height="16" rx="3" fill="currentColor" fillOpacity=".12" />
    <path d="M118 68 V54 L128 50" />
    <path d="M64 98 H136" />
    <path d="M72 92 V98 M100 92 V98 M128 92 V98" />
    <circle cx="72" cy="106" r="8" /><circle cx="100" cy="106" r="8" /><circle cx="128" cy="106" r="8" />
    <path d="M130 86 L142 92" /><circle cx="145" cy="94" r="3" />
    <path d="M18 116 H182" opacity=".35" strokeDasharray="2 7" /></>),
  mer: () => (<>
    <path d="M38 72 H162 L154 64 H46 Z" fill="currentColor" fillOpacity=".2" />
    <path d="M70 64 V72 M100 64 V72 M130 64 V72" opacity=".45" />
    <rect x="70" y="72" width="60" height="18" rx="3" fill="currentColor" fillOpacity=".12" />
    <path d="M86 64 V34" /><rect x="76" y="24" width="22" height="10" rx="3" fill="currentColor" fillOpacity=".22" />
    <circle cx="81" cy="29" r="1.8" /><circle cx="93" cy="29" r="1.8" />
    <path d="M122 64 V44 M116 44 H128" />
    <path d="M60 96 H140" />
    <path d="M66 90 V97 M100 90 V97 M134 90 V97" />
    <circle cx="66" cy="106" r="9" /><circle cx="100" cy="106" r="9" /><circle cx="134" cy="106" r="9" />
    <path d="M14 118 H186" opacity=".35" strokeDasharray="2 7" /></>),
  insight: () => (<>
    <circle cx="52" cy="72" r="22" fill="currentColor" fillOpacity=".1" />
    <path d="M52 50 V94 M30 72 H74 M36 56 L68 88 M68 56 L36 88" opacity=".35" />
    <circle cx="148" cy="72" r="22" fill="currentColor" fillOpacity=".1" />
    <path d="M148 50 V94 M126 72 H170 M132 56 L164 88 M164 56 L132 88" opacity=".35" />
    <path d="M74 72 H126" />
    <path d="M80 72 H120 L126 86 H74 Z" fill="currentColor" fillOpacity=".16" />
    <path d="M84 86 L74 110 M116 86 L126 110" />
    <ellipse cx="74" cy="112" rx="7" ry="2.6" /><ellipse cx="126" cy="112" rx="7" ry="2.6" />
    <path d="M108 72 L112 46 L128 40" />
    <path d="M140 118 Q152 100 164 118 Z" fill="currentColor" fillOpacity=".22" />
    <path d="M120 100 Q132 112 140 116" strokeDasharray="3 3" />
    <path d="M18 120 H182" opacity=".35" strokeDasharray="2 7" /></>),
  heli: () => (<>
    <g className="rotor"><path d="M48 28 H152" strokeWidth="4" /></g>
    <g className="rotor r2"><path d="M54 40 H146" strokeWidth="4" /></g>
    <path d="M100 16 V60" />
    <rect x="86" y="9" width="28" height="7" rx="1.5" fill="currentColor" fillOpacity=".25" />
    <rect x="84" y="60" width="32" height="24" rx="5" fill="currentColor" fillOpacity=".14" />
    <circle cx="100" cy="72" r="3" />
    <path d="M86 84 L64 114 M114 84 L136 114 M92 84 L86 116 M108 84 L114 116" />
    <circle cx="64" cy="116" r="2.5" /><circle cx="136" cy="116" r="2.5" /><circle cx="86" cy="118" r="2.5" /><circle cx="114" cy="118" r="2.5" />
    <path d="M18 126 H182" opacity=".35" strokeDasharray="2 7" /></>),
  pioneer: () => (<>
    <circle cx="96" cy="58" r="40" fill="currentColor" fillOpacity=".1" />
    <circle cx="96" cy="58" r="26" opacity=".45" strokeDasharray="4 5" />
    <path d="M68 30 L96 58 L124 30 M96 58 V98" opacity=".45" />
    <circle cx="96" cy="58" r="4.5" fill="currentColor" />
    <rect x="86" y="96" width="20" height="12" rx="2" fill="currentColor" fillOpacity=".18" />
    <path d="M84 102 L58 120 M108 102 L134 120" />
    <rect x="44" y="116" width="18" height="9" rx="3" fill="currentColor" fillOpacity=".2" transform="rotate(-34 53 120)" />
    <rect x="130" y="116" width="18" height="9" rx="3" fill="currentColor" fillOpacity=".2" transform="rotate(34 139 120)" />
    <path d="M136 58 H184" /><circle cx="187" cy="58" r="3" /></>),
  museum: () => (<>
    <path d="M28 52 L100 20 L172 52 Z" fill="currentColor" fillOpacity=".1" />
    <path d="M34 52 H166 M34 58 H166" />
    <path d="M46 58 V112 M70 58 V112 M130 58 V112 M154 58 V112" />
    <path d="M26 112 H174 M20 120 H180" />
    <path d="M100 66 Q110 80 106 98 H94 Q90 80 100 66 Z" fill="currentColor" fillOpacity=".2" />
    <path d="M94 98 L88 106 M106 98 L112 106 M100 98 V108" />
    <circle cx="100" cy="82" r="3" /></>)
};

export function ArtSvg({ art, stroke = 'currentColor', strokeWidth = 2.6 }) {
  const draw = ARTS[art] || ARTS.surveyor;
  return (
    <svg viewBox="0 0 200 140" fill="none" stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {draw()}
    </svg>
  );
}

/* A floating hologram on a glowing pedestal. anim: drive | fly | still | stuck | shake | dusty | drift */
export function Holo({ art, anim, small, ghost }) {
  return (
    <div className={['holo', small && 'sm', ghost && 'ghost', anim].filter(Boolean).join(' ')}>
      <div className="holo-base" />
      <ArtSvg art={art} />
    </div>
  );
}
```

## `src/components/art/planets.jsx`

```jsx
import { useUid } from '../../lib/motion';

const url = (id) => `url(#${id})`;

export function MoonOrb() {
  const id = useUid('mo');
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true">
      <defs>
        <radialGradient id={id} cx="38%" cy="34%" r="72%"><stop offset="0" stopColor="#f8faff" /><stop offset=".6" stopColor="#bcc4d6" /><stop offset="1" stopColor="#5f6880" /></radialGradient>
        <linearGradient id={id + 's'} x1="0" y1="0" x2="1" y2="1"><stop offset=".45" stopColor="#000" stopOpacity="0" /><stop offset="1" stopColor="#000" stopOpacity=".5" /></linearGradient>
      </defs>
      <circle cx="50" cy="50" r="48" fill={url(id)} />
      <g fill="#8e97ab" opacity=".55"><circle cx="35" cy="37" r="8" /><circle cx="63" cy="29" r="5" /><circle cx="60" cy="62" r="11" /><circle cx="30" cy="66" r="6" /><circle cx="77" cy="50" r="4" /><circle cx="46" cy="82" r="3.5" /></g>
      <circle cx="50" cy="50" r="48" fill={url(id + 's')} />
    </svg>
  );
}

export function MarsOrb() {
  const id = useUid('ma');
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true">
      <defs><radialGradient id={id} cx="38%" cy="34%" r="72%"><stop offset="0" stopColor="#ffc7a2" /><stop offset=".55" stopColor="#d0613a" /><stop offset="1" stopColor="#4d170b" /></radialGradient></defs>
      <circle cx="50" cy="50" r="48" fill={url(id)} />
      <g fill="#7a2a16" opacity=".55"><path d="M20 52 Q34 44 48 52 T76 50 Q70 60 52 60 T20 52Z" /><circle cx="64" cy="32" r="6" /><circle cx="34" cy="72" r="5" /></g>
      <ellipse cx="46" cy="7" rx="14" ry="4" fill="#fff" opacity=".8" />
    </svg>
  );
}

export function EarthOrb() {
  const id = useUid('ea');
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true">
      <defs><radialGradient id={id} cx="38%" cy="34%" r="72%"><stop offset="0" stopColor="#a8e2ff" /><stop offset=".55" stopColor="#2f78dc" /><stop offset="1" stopColor="#0a2560" /></radialGradient></defs>
      <circle cx="50" cy="50" r="48" fill={url(id)} />
      <g fill="#5fd18c" opacity=".9"><path d="M26 30 Q36 20 46 28 Q50 40 40 46 Q30 50 26 40Z" /><path d="M58 50 Q72 44 78 56 Q74 72 62 74 Q54 64 58 50Z" /><path d="M30 64 Q38 60 42 68 Q38 76 32 72Z" /></g>
      <g fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" opacity=".55"><path d="M18 50 Q30 44 44 50" /><path d="M54 30 Q66 26 80 34" /><path d="M40 86 Q54 82 66 86" /></g>
      <circle cx="50" cy="50" r="48" fill="none" stroke="#a8e2ff" strokeOpacity=".5" strokeWidth="2" />
    </svg>
  );
}

/* The violet-indigo ringed world that floats behind Zone 3. */
export function GasGiant() {
  const id = useUid('gg');
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#f3edff" /><stop offset=".22" stopColor="#b9a2ff" /><stop offset=".38" stopColor="#e2d8ff" /><stop offset=".55" stopColor="#7c7cff" /><stop offset=".72" stopColor="#a98cff" /><stop offset="1" stopColor="#1d1658" /></linearGradient>
        <clipPath id={id + 'c'}><circle cx="50" cy="50" r="40" /></clipPath>
      </defs>
      <ellipse cx="50" cy="52" rx="58" ry="12" fill="none" stroke="#d6c8ff" strokeOpacity=".35" strokeWidth="5" />
      <circle cx="50" cy="50" r="40" fill={url(id)} />
      <circle cx="50" cy="50" r="40" fill="#000" opacity=".28" clipPath={url(id + 'c')} transform="translate(16 12)" />
      <path d="M8 56 Q50 70 92 56" fill="none" stroke="#e2d8ff" strokeOpacity=".8" strokeWidth="5" />
      <g fill="#fff"><circle cx="14" cy="18" r="1.1" /><circle cx="88" cy="12" r=".9" /><circle cx="94" cy="86" r="1.2" /></g>
    </svg>
  );
}

export function JupiterOrb() {
  const id = useUid('ju');
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#f4e6cc" /><stop offset=".16" stopColor="#d8a473" /><stop offset=".28" stopColor="#f6ead4" /><stop offset=".42" stopColor="#c7875a" /><stop offset=".56" stopColor="#efdcbc" /><stop offset=".7" stopColor="#b5764f" /><stop offset=".84" stopColor="#e6cfa9" /><stop offset="1" stopColor="#7c4f35" /></linearGradient>
        <radialGradient id={id + 's'} cx="30%" cy="28%" r="80%"><stop offset=".5" stopColor="#000" stopOpacity="0" /><stop offset="1" stopColor="#000" stopOpacity=".55" /></radialGradient>
      </defs>
      <circle cx="50" cy="50" r="46" fill={url(id)} />
      <ellipse cx="62" cy="64" rx="9" ry="5" fill="#c4553a" opacity=".85" />
      <circle cx="50" cy="50" r="46" fill={url(id + 's')} />
    </svg>
  );
}

export function SaturnOrb() {
  const id = useUid('sa');
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true">
      <defs><linearGradient id={id} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#f6e7c4" /><stop offset=".3" stopColor="#e2c48e" /><stop offset=".5" stopColor="#f3e0b4" /><stop offset=".7" stopColor="#caa46b" /><stop offset="1" stopColor="#6e5233" /></linearGradient></defs>
      <ellipse cx="50" cy="52" rx="64" ry="15" fill="none" stroke="#e9d6a8" strokeOpacity=".45" strokeWidth="7" />
      <circle cx="50" cy="50" r="33" fill={url(id)} />
      <path d="M-14 52 Q50 76 114 52" fill="none" stroke="#f2e2b6" strokeWidth="7" strokeLinecap="round" />
      <path d="M-6 52 Q50 70 106 52" fill="none" stroke="#b8975f" strokeWidth="1.5" opacity=".7" />
    </svg>
  );
}
```

## `src/components/screens/EndScreen.jsx`

```jsx
/* The script's fade to black, “THE END”, and its three buttons. */
export default function EndScreen({ allCollected, collectedCount, onMuseum, onMap, onTimeline, onCelebrate }) {
  return (
    <div className="end-screen">
      <h1 className="end-title">THE END</h1>
      <div className="flex flex-wrap gap-3 justify-center">
        <button className="btn btn-primary" onClick={onMuseum}>EXPLORE THE MUSEUM</button>
        <button className="btn" onClick={onMap}>VIEW THE MAP</button>
        <button className="btn" onClick={onTimeline}>WALK THE TIMELINE</button>
      </div>
      {allCollected
        ? <button className="btn btn-gold btn-sm" onClick={onCelebrate}>🏆 Mission complete</button>
        : <p className="hint">{collectedCount}/14 stamps collected. Collect all 14 to complete the mission.</p>}
    </div>
  );
}
```

## `src/components/screens/TitleScreen.jsx`

```jsx
import OrbittoGuide, { OrbittoFace } from '../OrbittoGuide';

export default function TitleScreen({ onStart, onSkip, onMars, onDeep }) {
  return (
    <div className="title-screen scroll">
      <div className="w-36 md:w-52"><OrbittoGuide mood="happy" wave /></div>
      <span className="badge badge-zone"><OrbittoFace size={22} /> Your guide, Orbitto</span>
      <p className="title-kicker">🚀 Museum of Those Who Stayed</p>
      <h1 className="game-title">Echoes in the Void</h1>
      <p className="big-sub" style={{ marginTop: 0 }}>Abandoned, but not forgotten.</p>
      <div className="flex flex-wrap gap-3 justify-center mt-2">
        <button className="btn btn-primary btn-lg" onClick={onStart}>▶ Start the tour</button>
      </div>
      <div className="flex flex-wrap gap-2 justify-center">
        <button className="btn btn-sm" onClick={onSkip}>🌕 Skip to Surveyor 1</button>
        <button className="btn btn-sm" onClick={onMars}>🔴 Jump to Mars</button>
        <button className="btn btn-sm" onClick={onDeep}>🌌 Jump to Deep Space</button>
      </div>
      <p className="hint">Space or Enter to advance, ← to go back</p>
    </div>
  );
}
```

## `src/components/screens/ZoneComplete.jsx`

```jsx
import { ARTIFACTS, NODES } from '../../data/artifacts';
import { ZONES } from '../../data/zones';
import Sticker from '../Sticker';

export default function ZoneComplete({ zone, collected, nextLabel, onNext, onAlbum, onReplay, onTitle }) {
  const z = ZONES[zone];
  const ids = NODES.filter((n) => n.zone === zone).map((n) => n.id);
  return (
    <div className="zone-complete scroll">
      <div className="enter text-center">
        <span className="badge badge-zone">{z.icon} Zone {z.num} complete</span>
        <h2 className="big-title mt-4">{z.name}</h2>
      </div>
      <div className="flex flex-wrap justify-center gap-4 md:gap-6 max-w-3xl">
        {ids.map((id, i) => (
          <div key={id} className="slot pop" style={{ animationDelay: `${i * 0.12}s` }}>
            <Sticker id={id} size={92} dim={!collected.includes(id)} />
            <span className="slot-name">{ARTIFACTS[id].name}</span>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap gap-3 justify-center">
        {nextLabel
          ? <button className="btn btn-primary" onClick={onNext}>{nextLabel}</button>
          : <button className="btn btn-primary" onClick={onAlbum}>Open stamp album</button>}
        {nextLabel && <button className="btn" onClick={onAlbum}>Open stamp album</button>}
        <button className="btn" onClick={onReplay}>Replay {z.name}</button>
        <button className="btn" onClick={onTitle}>Title screen</button>
      </div>
    </div>
  );
}
```

## `src/data/artifacts.js`

```js
/* Do not edit the text strings below: they are the English script of “Echoes in the Void”. */

/*
  NASA image props
  ----------------
  Each artifact has an image object:
    src     Full image URL. Leave '' to show the hologram placeholder.
    nasaId  The NASA ID from images.nasa.gov (e.g. the part after /details/ in the page URL).
            If src is empty and nasaId is set, the URL is built for you with nasaImageUrl().
    alt     Text read aloud by screen readers.
    credit  Shown on the card. NASA images are generally not copyrighted, but keep the credit.
*/
export function nasaImageUrl(nasaId, size = 'medium') {
  // size: 'thumb' | 'small' | 'medium' | 'large' | 'orig'
  return nasaId ? `https://images-assets.nasa.gov/image/${nasaId}/${nasaId}~${size}.jpg` : '';
}
export function nasaPageUrl(nasaId) {
  return nasaId ? `https://images.nasa.gov/details/${nasaId}` : '';
}

/* The 14 star-map nodes, in play order: Moon → Mars → Deep Space. */
export const NODES = [
  { id: 'surveyor1', name: 'Surveyor 1', year: '1966', zone: 'moon', built: true },
  { id: 'surveyor3', name: 'Surveyor 3', year: '1967', zone: 'moon', built: true },
  { id: 'apollo11', name: 'Apollo 11', year: '1969', zone: 'moon', built: true },
  { id: 'alsep', name: 'ALSEP', year: '1969', zone: 'moon', built: true },
  { id: 'lrv', name: 'Apollo 15 Lunar Roving Vehicle', year: '1971', zone: 'moon', built: true },
  { id: 'fallen', name: 'Fallen Astronaut', year: '1971', zone: 'moon', built: true },
  { id: 'viking1', name: 'Viking 1', year: '1976', zone: 'mars', built: true },
  { id: 'sojourner', name: 'Sojourner and Pathfinder', year: '1997', zone: 'mars', built: true },
  { id: 'spirit', name: 'Spirit', year: '2004', zone: 'mars', built: true },
  { id: 'opportunity', name: 'Opportunity', year: '2004', zone: 'mars', built: true },
  { id: 'insight', name: 'InSight', year: '2018', zone: 'mars', built: true },
  { id: 'ingenuity', name: 'Ingenuity', year: '2021', zone: 'mars', built: true },
  { id: 'pioneer10', name: 'Pioneer 10', year: '1972', zone: 'deep', built: true },
  { id: 'pioneer11', name: 'Pioneer 11', year: '1973', zone: 'deep', built: true }
];

export const ARTIFACTS = {
  surveyor1: {
    name: 'Surveyor 1', sub: 'Surveyor 1', short: 'Surveyor 1', year: '1966', zone: 'moon', art: 'surveyor',
    image: { src: '', nasaId: '', alt: 'Surveyor 1 — NASA image', credit: 'NASA' },
    sheet: [
      ['Launch', 'May 30, 1966.'],
      ['Landing', 'June 2, 1966, in Oceanus Procellarum.'],
      ['Objective', 'Demonstrate a soft lunar landing and obtain images and data from the lunar surface.'],
      ['Result', 'Surveyor 1 was the first American spacecraft to achieve a soft landing on the Moon.'],
      ['Status', 'Remains on the lunar surface.']
    ],
    funFact: 'When Surveyor 1 landed, one of its legs sank less than an inch into the lunar regolith. That small measurement helped confirm that the surface could support the weight of a spacecraft.'
  },
  surveyor3: {
    name: 'Surveyor 3', sub: 'Surveyor 3', short: 'Surveyor 3', year: '1967', zone: 'moon', art: 'surveyor3',
    image: { src: '', nasaId: '', alt: 'Surveyor 3 — NASA image', credit: 'NASA' },
    sheet: [
      ['Launch', 'April 17, 1967.'],
      ['Lunar operations', 'Until May 4, 1967.'],
      ['Objective', 'Demonstrate landing technologies and study the lunar surface.'],
      ['Result', 'Took part in the only “encounter” on the lunar surface between a robotic spacecraft and astronauts.'],
      ['Status', 'Part of the spacecraft remains on the Moon; some pieces were brought back to Earth.']
    ],
    funFact: 'Scientists wanted to know how Surveyor 3’s materials had held up after more than two years in the lunar environment: radiation, vacuum and extreme temperatures.'
  },
  apollo11: {
    name: 'Apollo 11', sub: 'Eagle descent stage, Apollo 11', short: 'Eagle', year: '1969', zone: 'moon', art: 'lm',
    image: { src: '', nasaId: '', alt: 'Eagle descent stage, Apollo 11 — NASA image', credit: 'NASA' },
    sheet: [
      ['Landing date', 'July 20, 1969.'],
      ['Crew', 'Neil Armstrong, Edwin “Buzz” Aldrin and Michael Collins.'],
      ['Objective', 'Carry out the first crewed lunar landing and return safely to Earth.'],
      ['Result', 'Armstrong and Aldrin walked on the Moon; Collins remained in lunar orbit.'],
      ['Status', 'The descent stage of the lunar module Eagle remains on the lunar surface.']
    ],
    funFact: 'The Eagle had no wheels or engines to return from the surface: its ascent stage used its own engine to lift off and rejoin the command module in lunar orbit.'
  },
  alsep: {
    name: 'ALSEP', sub: 'ALSEP', short: 'ALSEP', year: '1969', zone: 'moon', art: 'alsep',
    image: { src: '', nasaId: '', alt: 'ALSEP — NASA image', credit: 'NASA' },
    sheet: [
      ['Full name', 'Apollo Lunar Surface Experiments Package.'],
      ['First complete installation', 'Apollo 12, in November 1969.'],
      ['Objective', 'Measure seismic activity, the lunar environment, heat flow and other phenomena.'],
      ['Result', 'The ALSEP packages sent scientific data from the Moon for years.'],
      ['Status', 'The equipment remains on the lunar surface.']
    ],
    funFact: 'ALSEP wasn’t a single device: it was a set of instruments. Some measured “moonquakes,” while others studied the solar wind and the environment around the Moon.'
  },
  lrv: {
    name: 'Lunar Roving Vehicle', sub: 'Apollo 15 Lunar Roving Vehicle', short: 'LRV', year: '1971', zone: 'moon', art: 'lrv',
    image: { src: '', nasaId: '', alt: 'Apollo 15 Lunar Roving Vehicle — NASA image', credit: 'NASA' },
    sheet: [
      ['Mission', 'Apollo 15.'],
      ['Year', '1971.'],
      ['Vehicle', 'Lunar Roving Vehicle, or LRV.'],
      ['Objective', 'Allow the astronauts to travel farther and collect more samples.'],
      ['Result', 'Apollo 15 was the first mission to use the LRV on the Moon.'],
      ['Status', 'The three rovers used on Apollo 15, 16 and 17 remain on the lunar surface.']
    ],
    funFact: 'In lunar gravity, each Lunar Roving Vehicle weighed about 80 pounds, around 36 kilograms. Its wheels left very shallow tracks in the lunar dust.'
  },
  fallen: {
    name: 'Fallen Astronaut', sub: 'Fallen Astronaut', short: 'Fallen Astronaut', year: '1971', zone: 'moon', art: 'fallen',
    image: { src: '', nasaId: '', alt: 'Fallen Astronaut — NASA image', credit: 'NASA' },
    sheet: [
      ['Name', 'Fallen Astronaut.'],
      ['Mission', 'Apollo 15.'],
      ['Location', 'Lunar surface.'],
      ['Objective', 'Honor fallen astronauts and cosmonauts.'],
      ['Status', 'The sculpture and a commemorative plaque remain on the Moon.']
    ],
    funFact: 'It is probably the smallest and most distant sculpture in the world: it measures less than 9 centimeters, but it sits hundreds of thousands of kilometers from Earth.'
  },
  /* ----- Zone 2: Mars ----- */
  viking1: {
    name: 'Viking 1', sub: 'Viking 1', short: 'Viking 1', year: '1976', zone: 'mars', art: 'viking',
    image: { src: '', nasaId: '', alt: 'Viking 1 — NASA image', credit: 'NASA' },
    sheet: [
      ['Landing', 'July 20, 1976.'],
      ['Objective', 'Take high-resolution images, study the Martian atmosphere and surface, and search for evidence of life.'],
      ['Result', 'Viking 1 was the first successful landing on Mars.'],
      ['Duration on the surface', 'More than six years.'],
      ['Status', 'The lander remains in Chryse Planitia, Mars.']
    ],
    funFact: 'Viking 1 landed on exactly the same day that Apollo 11 had reached the Moon seven years earlier: July 20.'
  },
  sojourner: {
    name: 'Sojourner', sub: 'Sojourner and Pathfinder', short: 'Sojourner', year: '1997', zone: 'mars', art: 'sojourner',
    image: { src: '', nasaId: '', alt: 'Sojourner and Pathfinder — NASA image', credit: 'NASA' },
    sheet: [
      ['Mission', 'Mars Pathfinder.'],
      ['Landing', 'July 4, 1997.'],
      ['Rover', 'Sojourner.'],
      ['Objective', 'Demonstrate that a rover could move around, analyze rocks and study the Martian environment.'],
      ['Actual duration', '83 days, compared with a planned seven-day mission.'],
      ['Status', 'Sojourner and the Pathfinder station remain on Mars.']
    ],
    funFact: 'Sojourner was so small that it could almost fit inside a large box. Even so, it was the first rover to move successfully across Mars.'
  },
  spirit: {
    name: 'Spirit', sub: 'Spirit', short: 'Spirit', year: '2004', zone: 'mars', art: 'mer',
    image: { src: '', nasaId: '', alt: 'Spirit — NASA image', credit: 'NASA' },
    sheet: [
      ['Landing', 'January 2004, in Gusev crater.'],
      ['Objective', 'Search for evidence of watery environments in the past of Mars.'],
      ['Result', 'Spirit found evidence of alteration by water in rocks and minerals.'],
      ['Duration', 'Operated for more than six years.'],
      ['Status', 'Became stuck in sand in 2009; NASA ended its attempts to communicate in 2011.']
    ],
    funFact: 'Even though it could no longer drive, Spirit kept doing science as a stationary station, observing the Martian weather and sky.'
  },
  opportunity: {
    name: 'Opportunity', sub: 'Opportunity', short: 'Opportunity', year: '2004', zone: 'mars', art: 'mer',
    image: { src: '', nasaId: '', alt: 'Opportunity — NASA image', credit: 'NASA' },
    sheet: [
      ['Landing', 'January 2004, in Meridiani Planum.'],
      ['Planned duration', 'About 90 Martian days.'],
      ['Actual duration', 'More than 14 years.'],
      ['Result', 'Found evidence that there was liquid water in the area in the past.'],
      ['End of mission', 'NASA declared the mission complete in February 2019, after losing communication during a global dust storm in 2018.'],
      ['Status', 'Opportunity remains on Mars.']
    ],
    funFact: 'Opportunity traveled more than 45 kilometers, a greater distance than it had originally been planned to travel.'
  },
  insight: {
    name: 'InSight', sub: 'InSight', short: 'InSight', year: '2018', zone: 'mars', art: 'insight',
    image: { src: '', nasaId: '', alt: 'InSight — NASA image', credit: 'NASA' },
    sheet: [
      ['Landing', 'November 26, 2018.'],
      ['Objective', 'Study the interior of Mars through seismology, meteorology and geophysical measurements.'],
      ['Main instrument', 'SEIS seismometer.'],
      ['Result', 'Detected hundreds of Martian quakes, called marsquakes.'],
      ['End of mission', 'December 2022, after dust built up on its solar panels.'],
      ['Status', 'The spacecraft remains on Mars.']
    ],
    funFact: 'InSight didn’t measure earthquakes like the ones on Earth: it measured marsquakes, tremors caused mainly by the cooling and contraction of the Martian interior.'
  },
  ingenuity: {
    name: 'Ingenuity', sub: 'Ingenuity', short: 'Ingenuity', year: '2021', zone: 'mars', art: 'heli',
    image: { src: '', nasaId: '', alt: 'Ingenuity — NASA image', credit: 'NASA' },
    sheet: [
      ['Arrival on Mars', 'February 18, 2021, together with the Perseverance rover.'],
      ['First flight', 'April 19, 2021.'],
      ['Original objective', 'Demonstrate controlled, powered flight on Mars.'],
      ['Planned flights', 'Up to five in 30 days.'],
      ['Flights completed', '72.'],
      ['Distance traveled', 'About 17 kilometers.'],
      ['Last flight', 'January 18, 2024; its rotor blades were damaged during the landing.'],
      ['Status', 'Remains on Mars, near its last airfield.']
    ],
    funFact: 'The atmosphere of Mars is much thinner than Earth’s, so Ingenuity needed to spin its blades extremely fast to lift off.'
  },
  /* ----- Zone 3: Deep Space ----- */
  pioneer10: {
    name: 'Pioneer 10', sub: 'Pioneer 10', short: 'Pioneer 10', year: '1972', zone: 'deep', art: 'pioneer',
    image: { src: '', nasaId: '', alt: 'Pioneer 10 — NASA image', credit: 'NASA' },
    sheet: [
      ['Launch', 'March 2, 1972.'],
      ['Objective', 'Cross the asteroid belt and study Jupiter.'],
      ['Result', 'Pioneer 10 was the first spacecraft to cross the asteroid belt and the first to fly past Jupiter.'],
      ['Last communication', 'NASA received a very weak signal in 2003; after that, attempts at contact stopped.'],
      ['Status', 'Continues traveling toward interstellar space.']
    ],
    funFact: 'Pioneer 10 carries a golden plaque with images and symbols designed to introduce humanity and Earth, in case someone finds it someday.'
  },
  pioneer11: {
    name: 'Pioneer 11', sub: 'Pioneer 11', short: 'Pioneer 11', year: '1973', zone: 'deep', art: 'pioneer',
    image: { src: '', nasaId: '', alt: 'Pioneer 11 — NASA image', credit: 'NASA' },
    sheet: [
      ['Launch', 'April 5, 1973.'],
      ['Objective', 'Study Jupiter and Saturn.'],
      ['Result', 'Pioneer 11 was the first spacecraft to explore Saturn and its main rings.'],
      ['Last communication', 'September 1995.'],
      ['Status', 'Still on a trajectory escaping the solar system.']
    ],
    funFact: 'Pioneer 11 used Jupiter’s gravity as a kind of “slingshot” to change its course and head toward Saturn.'
  }
};
```

## `src/data/script.js`

```js
/* Do not edit the text strings below: they are the English script of “Echoes in the Void”. */

/*
  Each chapter is a list of beats:  L(text, mood, visual, cue, fx)
    text    Orbitto's line (exact script)
    mood    happy | amazed | curious | proud | wistful
    visual  what the stage shows  { k: 'holo' | 'banner' | 'duo' | 'planet' | ... }
    cue     the script's stage direction, shown above the line
    fx      Orbitto's reaction: hop | shake | stuck | float | dust | dark (space-separated)
*/
const L = (text, mood, visual, cue, fx) => ({ text, mood, visual, cue, fx });
export const CHAPTERS = [
  { id: 'intro', zone: 'moon', tag: 'Scene 0: Introduction', beats: [
    L('Have you ever wondered what happens to a spacecraft when its mission is over?', 'curious', { k: 'radio' }, 'Darkness. A space radio crackles. Images of the Moon, Mars and deep space appear. Orbitto floats in.'),
    L('Here on Earth, we usually keep it in a museum, take it apart, or simply leave it behind.', 'happy', { k: 'museum' }, 'Pause. Images of museums on Earth appear.'),
    L('But in space… things are a little different.', 'curious', { k: 'earth' }, 'The camera pulls away from Earth.'),
    L('Since the 1960s, NASA has sent machines to other worlds. Some landed. Some explored. Some made incredible discoveries.', 'amazed', { k: 'earth' }),
    L('And when they finished their work… many never came back.', 'wistful', { k: 'points' }, 'Points appear on the Moon and Mars.'),
    L('They stayed there.', 'wistful', { k: 'moon' }, 'Orbitto looks toward the Moon. Pause.'),
    L('But being abandoned… doesn’t mean being forgotten.', 'proud', { k: 'title' }, 'Title on screen.')
  ] },
  { id: 'before', zone: 'moon', tag: 'Scene 1: Before the Moon, the 1960s', beats: [
    L('To understand why these objects ended up there, we have to go back to the beginning.', 'curious', { k: 'path' }, 'The interactive map appears. Earth connects with the Moon.'),
    L('Before astronauts walked on the Moon, NASA needed to answer a much simpler question.', 'curious', { k: 'path' }),
    L('The answer came with the first robotic explorers.', 'amazed', { k: 'question', text: 'CAN WE LAND?' }, 'A giant question appears.')
  ] },
  { id: 'c-surveyor1', artifact: 'surveyor1', zone: 'moon', tag: '1966: Surveyor 1', beats: [
    L('In 1966, Surveyor 1 arrived.', 'happy', { k: 'holo' }, 'The camera travels to the Moon. Surveyor 1 appears.'),
    L('Its mission was simple compared to the ones that would come later: land softly and study the lunar surface.', 'curious', { k: 'holo' }),
    L('And it succeeded.', 'proud', { k: 'holo' }, 'Photographs and data are shown.'),
    L('Surveyor 1 transmitted more than 11,000 photographs of the Moon. Its images and measurements helped engineers better understand the terrain where Apollo astronauts would later land.', 'amazed', { k: 'holo' }),
    L('Surveyor didn’t carry astronauts. But it paved the way for them.', 'happy', { k: 'banner', kind: 'Connection on screen', text: 'SURVEYOR 1 → APOLLO' }),
    L('And when it finished its mission… it stayed.', 'wistful', { k: 'holo' }, 'The camera zooms in on the point on the map.')
  ] },
  { id: 'c-surveyor3', artifact: 'surveyor3', zone: 'moon', tag: '1967: Surveyor 3', beats: [
    L('One year later, another explorer reached the Moon.', 'happy', { k: 'holo' }, 'The map moves forward one year. Surveyor 3 appears.'),
    L('Surveyor 3 studied the lunar soil using instruments and a mechanical arm.', 'curious', { k: 'holo' }),
    L('And then something extraordinary happened.', 'amazed', { k: 'duo', a: 'surveyor3', b: 'lm', la: 'Surveyor 3', lb: 'Apollo 12' }, 'An Apollo 12 silhouette appears.'),
    L('Two years later, humans returned.', 'happy', { k: 'duo', a: 'surveyor3', b: 'lm', la: 'Surveyor 3', lb: 'Apollo 12' }),
    L('The Apollo 12 astronauts landed just 155 meters from Surveyor 3.', 'amazed', { k: 'duo', a: 'surveyor3', b: 'lm', la: 'Surveyor 3', lb: 'Apollo 12' }, 'Apollo 12 appears.'),
    L('Pete Conrad and Alan Bean visited the spacecraft, photographed it, and recovered parts of its camera and its sampling scoop to study them on Earth.', 'curious', { k: 'banner', kind: 'Connection on screen', text: 'SURVEYOR 3 → APOLLO 12' }),
    L('For the first time, a machine sent to explore the Moon was visited by human beings.', 'amazed', { k: 'holo' }),
    L('Surveyor 3 was no longer just an abandoned machine. It had become part of history.', 'proud', { k: 'holo' })
  ] },
  { id: 'c-apollo11', artifact: 'apollo11', zone: 'moon', tag: '1969: Apollo 11', beats: [
    L('After years of preparation, the moment that would change history arrived.', 'amazed', { k: 'countdown' }, 'The music changes. Earth appears. A countdown is heard.'),
    L('In July 1969, Apollo 11 carried the first human beings to the surface of another world.', 'proud', { k: 'holo' }, 'The camera follows the Eagle module.'),
    L('Neil Armstrong and Buzz Aldrin descended using the lunar module Eagle.', 'happy', { k: 'holo' }),
    L('But the Eagle had a secret.', 'curious', { k: 'holo' }, 'The landing is shown.'),
    L('Not all of the Eagle was going to return.', 'curious', { k: 'holo' }, 'The camera shows the lower part.'),
    L('When the astronauts lifted off from the Moon, the descent stage stayed behind.', 'wistful', { k: 'holo' }),
    L('It had fulfilled its mission: serving as a landing platform, laboratory and starting point for the return.', 'proud', { k: 'holo' }),
    L('And it became one of the most famous objects humanity has left beyond Earth.', 'amazed', { k: 'holo' }, 'Pause.')
  ] },
  { id: 'c-alsep', artifact: 'alsep', zone: 'moon', tag: '1969: ALSEP', beats: [
    L('But the astronauts didn’t just leave a spacecraft.', 'curious', { k: 'holo' }, 'Orbitto appears next to scientific instruments.'),
    L('They also left something much more important: science.', 'proud', { k: 'holo' }),
    L('The astronauts installed instruments capable of studying the Moon after they had returned home.', 'happy', { k: 'holo' }, 'ALSEP appears.'),
    L('The human mission ended… but the experiments could continue.', 'amazed', { k: 'banner', kind: 'Consequence on screen', text: 'ASTRONAUTS LEAVE → THE INSTRUMENTS CONTINUE' }),
    L('For years, these instruments sent information about the lunar environment.', 'happy', { k: 'holo' }),
    L('It was like leaving a small laboratory running on another world.', 'proud', { k: 'holo' })
  ] },
  { id: 'c-lrv', artifact: 'lrv', zone: 'moon', tag: '1971: Apollo 15 and the Lunar Roving Vehicle', beats: [
    L('But there was still a problem. The Moon was enormous.', 'curious', { k: 'moon' }, 'The camera moves across the map.'),
    L('The astronauts could walk… but walking limited how much they could explore.', 'curious', { k: 'holo', art: 'walker' }, 'An astronaut appears, walking.'),
    L('So NASA brought a car.', 'happy', { k: 'holo' }, 'Then the Lunar Roving Vehicle appears.'),
    L('Apollo 15 used the first vehicle driven by human beings on another world.', 'amazed', { k: 'holo' }),
    L('Thanks to it, the astronauts could travel much greater distances and study places that would have been difficult to reach on foot.', 'happy', { k: 'holo', anim: 'drive' }, 'The vehicle drives across the surface.'),
    L('And when the mission ended… the car stayed there.', 'wistful', { k: 'holo' }, 'Consequence.'),
    L('The first car from another world ended up becoming a museum piece.', 'proud', { k: 'holo' }, 'The rover stops.')
  ] },
  { id: 'c-fallen', artifact: 'fallen', zone: 'moon', dim: true, tag: '1971: Fallen Astronaut', beats: [
    L('But Apollo 15 left something different.', 'wistful', { k: 'moon' }, 'The music fades. The map darkens slightly.'),
    L('It wasn’t a machine. It wasn’t an instrument. It was a remembrance.', 'wistful', { k: 'holo' }, 'The small sculpture appears.'),
    L('A small sculpture and a plaque were left on the Moon to remember astronauts and cosmonauts who had died.', 'wistful', { k: 'holo' }, 'The plaque is shown.'),
    L('Space exploration isn’t only about discovering new places. It’s also about remembering those who made it possible to get there.', 'proud', { k: 'holo' }, 'Consequence.')
  ] },
  /* ----- Zone 2: Mars ----- */
  { id: 'c-viking1', artifact: 'viking1', zone: 'mars', tag: '1976: Viking 1', beats: [
    L('While some machines traveled toward deep space, NASA had another goal: the red planet.', 'curious', { k: 'planet', p: 'mars' }, 'The camera returns to the solar system. Mars appears.'),
    L('In 1976, Viking 1 achieved something extraordinary.', 'amazed', { k: 'holo' }, 'Viking 1 appears.'),
    L('Landing on Mars and surviving.', 'proud', { k: 'holo' }, 'Pause.', 'hop'),
    L('Viking studied the soil, the atmosphere and the conditions of the planet.', 'curious', { k: 'holo' }, 'Images of the surface are shown.'),
    L('When its mission ended, Viking 1 stayed there.', 'wistful', { k: 'holo' }, 'Consequence.'),
    L('Decades later, its landing site is still part of the history of Martian exploration.', 'proud', { k: 'holo' })
  ] },
  { id: 'c-sojourner', artifact: 'sojourner', zone: 'mars', tag: '1997: Sojourner', beats: [
    L('But NASA wanted something different. It didn’t just want to land on Mars. It wanted to move.', 'curious', { k: 'holo' }, 'The screen moves quickly through the years. A small rover appears.'),
    L('Sojourner was a small six-wheeled vehicle that showed that a rover could move around and study different places on Mars.', 'happy', { k: 'holo', anim: 'drive' }, 'The rover moves forward.'),
    L('Its size was small. Its impact, enormous.', 'proud', { k: 'banner', kind: 'Consequence on screen', text: 'SOJOURNER → SPIRIT → OPPORTUNITY → CURIOSITY → PERSEVERANCE' }),
    L('After Sojourner, Mars rovers would become one of the most important tools of planetary exploration.', 'amazed', { k: 'banner', kind: 'Consequence on screen', text: 'SOJOURNER → SPIRIT → OPPORTUNITY → CURIOSITY → PERSEVERANCE' })
  ] },
  { id: 'c-spirit', artifact: 'spirit', zone: 'mars', tag: '2004: Spirit', beats: [
    L('And then two brothers arrived: Spirit and Opportunity.', 'happy', { k: 'duo', a: 'mer', b: 'mer', la: 'Spirit', lb: 'Opportunity' }, 'Two rovers appear: Spirit and Opportunity. The camera focuses on Spirit.'),
    L('Spirit arrived at Gusev crater looking for clues about the past of Mars.', 'curious', { k: 'holo' }),
    L('It found evidence that helped scientists understand that water had played an important role in the planet’s history.', 'amazed', { k: 'holo' }),
    L('But eventually its wheels got stuck in difficult terrain.', 'curious', { k: 'holo', anim: 'stuck' }, 'Consequence.', 'stuck'),
    L('NASA tried to free it. It couldn’t.', 'wistful', { k: 'holo', anim: 'stuck' }, 'Pause.'),
    L('Spirit stopped moving. But its discoveries were already in motion.', 'proud', { k: 'holo', anim: 'still' }, 'The rover stays motionless.')
  ] },
  { id: 'c-opportunity', artifact: 'opportunity', zone: 'mars', tag: '2004: Opportunity', beats: [
    L('While Spirit struggled against the terrain, Opportunity kept moving forward.', 'happy', { k: 'holo', anim: 'drive' }, 'Opportunity appears.'),
    L('Its mission was designed to last about 90 Martian days.', 'curious', { k: 'banner', kind: 'Counter on screen', text: '90 days → years → 10 years → 14 years' }, 'A counter appears.'),
    L('It ended up working for almost fifteen years.', 'amazed', { k: 'banner', kind: 'Counter on screen', text: '90 days → years → 10 years → 14 years' }, null, 'hop'),
    L('In 2018, an enormous dust storm covered Mars.', 'curious', { k: 'storm' }, 'Consequence. A dust storm appears.', 'dust'),
    L('Opportunity stopped communicating.', 'wistful', { k: 'storm' }, 'The screen darkens.', 'dust dark'),
    L('But for almost fifteen years, a small robot was exploring another planet.', 'proud', { k: 'holo', anim: 'still' }, 'Silence.')
  ] },
  { id: 'c-insight', artifact: 'insight', zone: 'mars', tag: '2018: InSight', beats: [
    L('The rovers taught us to look at the surface. But NASA wanted to know what was underneath.', 'curious', { k: 'planet', p: 'mars' }, 'The camera moves to another point on Mars.'),
    L('InSight had no wheels. It didn’t need to travel. Its job was to listen.', 'happy', { k: 'holo' }, 'InSight appears.'),
    L('It studied the seismic movements of Mars to discover what its interior is like.', 'amazed', { k: 'quake' }, 'The seismometer is shown.', 'shake'),
    L('But Mars imposed its conditions once again.', 'curious', { k: 'holo', anim: 'dusty' }, 'Consequence. Dust covers the panels.', 'dust'),
    L('Dust built up on its solar panels and its power began to drop. The mission ended.', 'wistful', { k: 'holo', anim: 'dusty' }, null, 'dust dark'),
    L('But now we know Mars a little more deeply.', 'proud', { k: 'holo' })
  ] },
  { id: 'c-ingenuity', artifact: 'ingenuity', zone: 'mars', tag: '2021: Ingenuity', beats: [
    L('And then something happened that seemed impossible.', 'amazed', { k: 'duo', a: 'mer', b: 'heli', la: 'Perseverance', lb: 'Ingenuity', ghost: 'a' }, 'The scene changes. Perseverance appears and, below it, Ingenuity.'),
    L('A helicopter flew on another planet.', 'amazed', { k: 'holo', anim: 'fly' }, 'The helicopter takes off.', 'hop'),
    L('Ingenuity had been designed as a technology demonstration.', 'curious', { k: 'holo', anim: 'fly' }, 'The flight is shown.'),
    L('Its original mission was to make only a few flights.', 'curious', { k: 'holo', anim: 'fly' }),
    L('It ended up making 72.', 'amazed', { k: 'banner', kind: 'Counter on screen', text: '1 → 5 → 20 → 50 → 72' }, 'A counter appears.', 'hop'),
    L('In January 2024, it was damaged during its last flight.', 'wistful', { k: 'holo', anim: 'still' }, 'Consequence. Ingenuity lands for the last time.'),
    L('And so its mission ended.', 'wistful', { k: 'holo', anim: 'still' }, 'The helicopter stays still.'),
    L('But the first vehicle to fly on another planet had already made history.', 'proud', { k: 'holo', anim: 'still' }, 'Pause.')
  ] },
  /* ----- Zone 3: Deep Space ----- */
  { id: 'c-pioneer10', artifact: 'pioneer10', zone: 'deep', tag: '1972: Pioneer 10', beats: [
    L('But NASA wasn’t looking only at the Moon. The next story takes us much farther.', 'curious', { k: 'jupiter' }, 'The camera leaves the Moon. The map widens enormously. Jupiter appears.', 'float'),
    L('Pioneer 10 was one of the first spacecraft to venture toward the outer solar system.', 'happy', { k: 'holo' }),
    L('It reached Jupiter and sent information about a world completely different from Earth.', 'amazed', { k: 'jupiter' }),
    L('But probes can’t work forever. Communication with Pioneer 10 finally ended.', 'wistful', { k: 'holo', anim: 'drift' }, 'Consequence.'),
    L('The spacecraft continued on its way.', 'wistful', { k: 'holo', anim: 'drift' }, 'Silence.', 'float dark'),
    L('No messages. No commands. Just traveling.', 'wistful', { k: 'holo', anim: 'drift' }, null, 'float dark')
  ] },
  { id: 'c-pioneer11', artifact: 'pioneer11', zone: 'deep', tag: '1973: Pioneer 11', beats: [
    L('And then came Pioneer 11.', 'happy', { k: 'saturn' }, 'Saturn appears.'),
    L('It was the first spacecraft to visit Saturn up close.', 'amazed', { k: 'holo' }),
    L('It studied the planet, its rings and its environment.', 'curious', { k: 'saturn' }),
    L('NASA lost contact with it in 1995. But, just like Pioneer 10, it keeps traveling through space.', 'wistful', { k: 'holo', anim: 'drift' }, 'Consequence.', 'float'),
    L('Two machines built on Earth… slowly moving away from it.', 'wistful', { k: 'trajectories' }, 'The map shows both trajectories.', 'float')
  ] },
  /* ----- Finale (from the script's final scene and closing) ----- */
  { id: 'c-final', zone: 'deep', epilogue: true, tag: 'Final scene: The museum', beats: [
    L('And now… look at everything we’ve traveled.', 'happy', { k: 'timeline' }, 'The camera pulls away from Mars. The 14 artifacts appear as glowing points and connect in a timeline.'),
    L('Machines that landed. Machines that explored. Machines that discovered. Machines that failed. And machines that simply stayed.', 'proud', { k: 'timeline', years: true }, 'The years appear.'),
    L('But none of these stories ended when their mission ended.', 'proud', { k: 'timeline', years: true }, 'Pause.')
  ] },
  { id: 'c-closing', zone: 'deep', epilogue: true, tag: 'Narrator’s closing', beats: [
    L('Maybe they’re no longer working. Maybe they’ll never come home.', 'wistful', { k: 'museum' }, 'Orbitto returns to the center of the museum.'),
    L('And some may keep traveling for millions of years.', 'amazed', { k: 'holo', art: 'pioneer', anim: 'drift' }, null, 'float'),
    L('But each one left something behind.', 'proud', { k: 'timeline' }, 'Orbitto looks toward the stars.'),
    L('Because exploring doesn’t only mean reaching a new place. It also means leaving knowledge for those who come after.', 'proud', { k: 'words' }, 'Words appear.'),
    L('The next time you look at the Moon… remember that it isn’t empty.', 'happy', { k: 'title', final: true }, 'Pause. Final text.'),
    L('There are stories there.', 'proud', { k: 'planet', p: 'moon' }, 'The camera shows the Moon.')
  ] }
];
```

## `src/data/zones.js`

```js
/* Zone palettes (pastel-neon). Play order: Moon → Mars → Deep Space.
   a = soft highlight, b = main neon, c = secondary glow, bg = sky. */
export const ZONES = {
  moon: { key: 'moon', num: 1, name: 'The Moon', icon: '🌕', a: '#e3ecfb', b: '#7ff3ff', c: '#9fb2ff', bg: '#050916' },
  mars: { key: 'mars', num: 2, name: 'Mars', icon: '🔴', a: '#ffc9ac', b: '#ffbe6b', c: '#ff8a66', bg: '#110706' },
  deep: { key: 'deep', num: 3, name: 'Deep Space', icon: '🌌', a: '#efe8ff', b: '#b9a2ff', c: '#7c7cff', bg: '#06041c' }
};

export const ZONE_ORDER = ['moon', 'mars', 'deep'];
```

## `src/lib/motion.js`

```js
import { useEffect, useRef, useState } from 'react';

/* True when the player asked their system for less motion. */
export const REDUCED =
  typeof window !== 'undefined' && !!window.matchMedia &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* A stable, SVG-safe id (React's useId contains characters that break url(#id)). */
let uidCount = 0;
export function useUid(prefix = 'u') {
  const ref = useRef(null);
  if (ref.current === null) ref.current = prefix + (++uidCount) + Math.random().toString(36).slice(2, 6);
  return ref.current;
}

/* Types `text` out one character at a time; pauses longer on punctuation.
   Returns [shownText, isDone, finishNow]. A new `key` restarts the typing. */
export function useTypewriter(text, key) {
  const [n, setN] = useState(0);
  const skip = useRef(false);
  useEffect(() => {
    skip.current = false;
    setN(0);
    if (!text) return undefined;
    if (REDUCED) { setN(text.length); return undefined; }
    let i = 0;
    let t;
    const step = () => {
      if (skip.current) return;
      i += 1;
      setN(i);
      if (i < text.length) {
        const ch = text[i - 1];
        t = setTimeout(step, /[.!?…]/.test(ch) ? 230 : /[,:;]/.test(ch) ? 120 : 20);
      }
    };
    t = setTimeout(step, 220);
    return () => clearTimeout(t);
  }, [text, key]);
  const done = !text || n >= text.length;
  const finish = () => { skip.current = true; setN(text ? text.length : 0); };
  return [text ? text.slice(0, n) : '', done, finish];
}
```

## `src/lib/progress.js`

```js
/* Saves scanned artifacts and collected stamps in this browser. */
const KEY = 'echoes-in-the-void:v1';
export const EMPTY_PROGRESS = { scanned: [], collected: [] };

export function loadProgress() {
  try {
    const v = JSON.parse(localStorage.getItem(KEY) || 'null');
    if (v && Array.isArray(v.collected)) return { scanned: v.scanned || [], collected: v.collected };
  } catch (e) { /* storage unavailable: start fresh */ }
  return EMPTY_PROGRESS;
}

export function saveProgress(p) {
  try { localStorage.setItem(KEY, JSON.stringify(p)); } catch (e) { /* ignore */ }
}
```

## `src/lib/sfx.js`

```js
/*
  Cozy chibi sound effects, synthesized live with the Web Audio API.
  No audio files, no dependencies. The audio engine starts on the first tap or key press
  (browsers block sound before that).
*/
let ctx = null;
let master = null;
let echo = null;
let muted = false;
const LEVEL = 0.6;

const NOTE = (n) => 440 * Math.pow(2, (n - 69) / 12); // MIDI note → Hz

function engine() {
  if (typeof window === 'undefined') return null;
  if (!ctx) {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
    master = ctx.createGain();
    master.gain.value = muted ? 0 : LEVEL;
    const soft = ctx.createBiquadFilter(); // rounds off harsh highs for a cozy tone
    soft.type = 'lowpass';
    soft.frequency.value = 5200;
    const comp = ctx.createDynamicsCompressor();
    master.connect(soft); soft.connect(comp); comp.connect(ctx.destination);
    // A small echo for chimes and jingles
    echo = ctx.createDelay(0.5);
    echo.delayTime.value = 0.14;
    const feedback = ctx.createGain(); feedback.gain.value = 0.28;
    const wet = ctx.createGain(); wet.gain.value = 0.35;
    echo.connect(feedback); feedback.connect(echo); echo.connect(wet); wet.connect(master);
  }
  if (ctx.state === 'suspended' && ctx.resume) ctx.resume();
  return ctx;
}

/* Start (or resume) audio on the first user gesture. */
export function unlockAudio() { engine(); }
if (typeof window !== 'undefined') {
  ['pointerdown', 'keydown', 'touchend'].forEach((ev) => window.addEventListener(ev, unlockAudio, { passive: true }));
}

export function setSfxMuted(m) {
  muted = m;
  if (master && ctx) master.gain.setTargetAtTime(m ? 0 : LEVEL, ctx.currentTime, 0.02);
}

function ready() {
  if (muted) return null;
  const c = engine();
  return c && c.state === 'running' ? c : null;
}

function tone(freq, at, dur, { type = 'sine', gain = 0.2, slide = 0, attack = 0.006, wet = false } = {}) {
  const o = ctx.createOscillator();
  const g = ctx.createGain();
  o.type = type;
  o.frequency.setValueAtTime(freq, at);
  if (slide) o.frequency.exponentialRampToValueAtTime(Math.max(40, freq * slide), at + dur);
  g.gain.setValueAtTime(0.0001, at);
  g.gain.exponentialRampToValueAtTime(gain, at + attack);
  g.gain.exponentialRampToValueAtTime(0.0001, at + dur);
  o.connect(g); g.connect(master);
  if (wet) g.connect(echo);
  o.start(at);
  o.stop(at + dur + 0.05);
}

/* A soft bell: a sine with gentle overtones. */
function bell(n, at, dur = 0.5, gain = 0.08, wet = true) {
  const f = NOTE(n);
  tone(f, at, dur, { type: 'triangle', gain, wet });
  tone(f * 2, at, dur * 0.6, { type: 'sine', gain: gain * 0.35, wet });
  tone(f * 3, at, dur * 0.35, { type: 'sine', gain: gain * 0.12 });
}

/* Bubbly typewriter bleep. Each letter maps to a note on a pentatonic scale, a little like animal-speak. */
const BLIP_SCALE = [72, 74, 76, 79, 81, 84];
let lastBlip = 0;
export function blip(ch = '') {
  const c = ready();
  if (!c || !/[a-z0-9]/i.test(ch)) return;
  const now = c.currentTime;
  if (now - lastBlip < 0.055) return;
  lastBlip = now;
  const n = BLIP_SCALE[ch.toLowerCase().charCodeAt(0) % BLIP_SCALE.length];
  const f = NOTE(n) * (0.98 + Math.random() * 0.04);
  tone(f, now, 0.07, { type: 'triangle', gain: 0.045, slide: 0.8 });
  tone(f * 2, now, 0.035, { type: 'sine', gain: 0.012 });
}

/* Sparkle chime when the scan starts. */
export function sparkle() {
  const c = ready(); if (!c) return;
  const t = c.currentTime + 0.01;
  [84, 88, 91, 95, 100].forEach((n, i) => bell(n, t + i * 0.065, 0.5, 0.07));
  tone(NOTE(108), t + 0.3, 0.6, { type: 'sine', gain: 0.02, wet: true });
}

/* Two-note "ding-ding" when the scan finishes. */
export function scanDone() {
  const c = ready(); if (!c) return;
  const t = c.currentTime + 0.01;
  bell(91, t, 0.35, 0.08);
  bell(96, t + 0.11, 0.6, 0.09);
}

/* Happy level-up jingle when a stamp is collected. */
export function jingle() {
  const c = ready(); if (!c) return;
  const t = c.currentTime + 0.01;
  [72, 76, 79, 84].forEach((n, i) => tone(NOTE(n), t + i * 0.085, 0.16, { type: 'square', gain: 0.035, wet: true }));
  [84, 88, 91].forEach((n) => bell(n, t + 0.36, 0.8, 0.07));
  bell(96, t + 0.5, 0.7, 0.04);
  tone(NOTE(60), t + 0.36, 0.5, { type: 'triangle', gain: 0.06 });
}

/* A longer fanfare for Mission Complete. */
export function fanfare() {
  const c = ready(); if (!c) return;
  const t = c.currentTime + 0.02;
  const phrase = [67, 72, 76, 79, 76, 79, 84];
  const times = [0, 0.12, 0.24, 0.36, 0.54, 0.66, 0.84];
  phrase.forEach((n, i) => tone(NOTE(n), t + times[i], 0.2, { type: 'square', gain: 0.035, wet: true }));
  [72, 76, 79, 84, 88].forEach((n) => bell(n, t + 1.02, 1.3, 0.06));
  [60, 67].forEach((n) => tone(NOTE(n), t + 1.02, 1.1, { type: 'triangle', gain: 0.06 }));
  [96, 100, 103, 108].forEach((n, i) => bell(n, t + 1.3 + i * 0.08, 0.6, 0.03));
}

/* Tiny "pop" for the sound toggle. */
export function pop() {
  const c = ready(); if (!c) return;
  tone(520, c.currentTime + 0.005, 0.12, { type: 'sine', gain: 0.12, slide: 1.6 });
}
```

## `src/lib/useOrbittoAudio.js`

```js
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from 'react';
import * as sfx from './sfx';
import { VOICE_SUPPORTED, isSpeaking, speak as voiceSpeak, stop as voiceStop, subscribeSpeaking } from './voice';

const KEY = 'echoes-in-the-void:audio';
function loadMuted() {
  try { return localStorage.getItem(KEY) === 'muted'; } catch (e) { return false; }
}

/*
  One switch for all sound. Returns:
    muted, toggleMute()      the HUD toggle (saved in this browser)
    speaking                 true while Orbitto's voice is playing
    voiceSupported           false in browsers without speech synthesis
    speak(text), stop()      Orbitto's voice (does nothing while muted)
    sfx                      blip, sparkle, scanDone, jingle, fanfare, pop
*/
export function useOrbittoAudio() {
  const [muted, setMuted] = useState(loadMuted);
  const speaking = useSyncExternalStore(subscribeSpeaking, isSpeaking, () => false);
  const first = useRef(true);

  useEffect(() => {
    sfx.setSfxMuted(muted);
    try { localStorage.setItem(KEY, muted ? 'muted' : 'on'); } catch (e) { /* ignore */ }
    if (muted) voiceStop();
    else if (!first.current) sfx.pop();
    first.current = false;
  }, [muted]);

  useEffect(() => () => voiceStop(), []);

  const toggleMute = useCallback(() => setMuted((m) => !m), []);
  const speak = useCallback((text) => { if (!muted) voiceSpeak(text); }, [muted]);

  return { muted, toggleMute, speaking, voiceSupported: VOICE_SUPPORTED, speak, stop: voiceStop, sfx };
}
```

## `src/lib/voice.js`

```js
/*
  Orbitto's voice: the browser's built-in Web Speech API (window.speechSynthesis).
  No network calls and no dependencies. If the browser has no speech support,
  VOICE_SUPPORTED is false and every function quietly does nothing.
*/
export const VOICE_SETTINGS = { pitch: 1.42, rate: 1.07, volume: 1 };

const synth = typeof window !== 'undefined' && 'speechSynthesis' in window ? window.speechSynthesis : null;
export const VOICE_SUPPORTED = !!synth && typeof window.SpeechSynthesisUtterance === 'function';

/* Clear, friendly English voices, best first. Novelty voices are skipped. */
const PREFERRED = [
  /Google US English/i, /Samantha/i, /(Aria|Jenny|Ana|Emma|Ava).*(Natural|Online)/i, /Microsoft (Aria|Jenny|Ana|Zira)/i,
  /Karen/i, /Serena/i, /Tessa/i, /Moira/i, /Google UK English Female/i, /Victoria/i
];
const NOVELTY = /(Fred|Albert|Bad News|Bahh|Bells|Boing|Bubbles|Cellos|Good News|Jester|Organ|Superstar|Trinoids|Whisper|Wobble|Zarvox|Junior|Ralph|Grandpa|Grandma|Rocko|Shelley|Eddy|Flo|Reed|Sandy)/i;

function score(v) {
  if (!/^en([-_]|$)/i.test(v.lang || '')) return -1;
  let s = 0;
  const i = PREFERRED.findIndex((r) => r.test(v.name));
  if (i >= 0) s += 100 - i * 5;
  if (/natural|neural|enhanced|premium/i.test(v.name)) s += 30;
  if (/en[-_]US/i.test(v.lang)) s += 10;
  else if (/en[-_](GB|AU|CA|IE|NZ)/i.test(v.lang)) s += 6;
  if (NOVELTY.test(v.name)) s -= 90;
  return s;
}

let chosen = null;
export function pickVoice() {
  if (!synth) return null;
  const voices = synth.getVoices() || [];
  let best = null, bestScore = -1;
  for (const v of voices) { const s = score(v); if (s > bestScore) { bestScore = s; best = v; } }
  chosen = bestScore >= 0 ? best : null;
  return chosen;
}
export const currentVoiceName = () => (chosen ? chosen.name : '');

if (synth) {
  pickVoice();
  if (synth.addEventListener) synth.addEventListener('voiceschanged', pickVoice);
  else synth.onvoiceschanged = pickVoice;
}

/* ---- "is Orbitto speaking?" store (used with useSyncExternalStore) ---- */
let speaking = false;
const listeners = new Set();
function setSpeaking(v) { if (speaking !== v) { speaking = v; listeners.forEach((f) => f()); } }
export const isSpeaking = () => speaking;
export function subscribeSpeaking(fn) { listeners.add(fn); return () => listeners.delete(fn); }

/* Flip a data attribute on each spoken word so the mouth animation restarts in time with the voice. */
let beat = 'a';
function wordBeat() {
  beat = beat === 'a' ? 'b' : 'a';
  if (typeof document !== 'undefined') document.documentElement.dataset.talk = beat;
}

let seq = 0;
let timer;
let current = null; // keep a reference: some browsers drop utterances that get garbage-collected

export function stop() {
  seq += 1;
  clearTimeout(timer);
  if (synth && (synth.speaking || synth.pending)) synth.cancel();
  current = null;
  setSpeaking(false);
}

export function speak(text) {
  if (!VOICE_SUPPORTED || !text) return;
  stop();
  const my = seq;
  // A short pause after cancel() avoids a Chrome bug where the next line is silently dropped.
  timer = setTimeout(() => {
    if (my !== seq) return;
    const u = new window.SpeechSynthesisUtterance(text);
    const v = chosen || pickVoice();
    if (v) { u.voice = v; u.lang = v.lang; } else { u.lang = 'en-US'; }
    u.pitch = VOICE_SETTINGS.pitch;
    u.rate = VOICE_SETTINGS.rate;
    u.volume = VOICE_SETTINGS.volume;
    u.onstart = () => { if (my === seq) setSpeaking(true); };
    u.onboundary = () => { if (my === seq) wordBeat(); };
    u.onend = u.onerror = () => { if (my === seq) { current = null; setSpeaking(false); } };
    current = u;
    synth.speak(u);
  }, 60);
}
```

## `src/styles/background.css`

```css
.bg-base { position: fixed; inset: 0; z-index: 0; background-color: var(--zBg); transition: background-color 1.6s ease; }
.nebula { position: fixed; inset: 0; z-index: 0; overflow: hidden; pointer-events: none; }
.neb { position: absolute; border-radius: 50%; filter: blur(90px); transition: background-color 1.6s ease; animation: drift 40s ease-in-out infinite alternate; }
.n1 { width: 60vmax; height: 60vmax; left: -18vmax; top: -24vmax; background-color: var(--zC); opacity: .24; }
.n2 { width: 46vmax; height: 46vmax; right: -14vmax; top: 18vh; background-color: var(--zB); opacity: .13; animation-duration: 48s; }
.n3 { width: 42vmax; height: 42vmax; left: 18vw; bottom: -28vmax; background-color: var(--pink); opacity: .07; animation-duration: 56s; }
@keyframes drift { to { transform: translate(6vmax, 4vmax) scale(1.08); } }
.stars { position: fixed; inset: 0; width: 100%; height: 100%; z-index: 0; pointer-events: none; }
.celestial { position: fixed; inset: 0; z-index: 0; pointer-events: none; overflow: hidden; }
.par { position: absolute; will-change: transform; }
.par-main { right: -16vmin; bottom: -14vmin; width: min(62vmin, 580px); aspect-ratio: 1; transform: translate3d(calc(var(--px, 0) * -26px), calc(var(--py, 0) * -16px), 0); }
.par-far { left: 6vw; top: 22vh; width: min(10vmin, 96px); aspect-ratio: 1; transform: translate3d(calc(var(--px, 0) * -9px), calc(var(--py, 0) * -6px), 0); }
.cbody { position: absolute; inset: 0; opacity: 0; transform: scale(.82) rotate(-10deg); transition: opacity 1.6s ease, transform 1.8s cubic-bezier(.2, .8, .2, 1); }
.cbody.on { opacity: .8; transform: none; filter: drop-shadow(0 0 60px color-mix(in srgb, var(--zB) 24%, transparent)); }
.cbody svg { width: 100%; height: 100%; overflow: visible; }
.far-orb { width: 100%; height: 100%; border-radius: 50%; background: radial-gradient(circle at 35% 30%, #fff 0%, var(--zA) 18%, var(--zC) 60%, transparent 72%); opacity: .55; }
.vignette { position: fixed; inset: 0; z-index: 1; pointer-events: none; background: radial-gradient(ellipse at 50% 42%, transparent 38%, rgba(0, 0, 0, .55) 100%); transition: background-color 1.4s ease; }
.vignette.dim { background-color: rgba(0, 0, 0, .4); }
@media (min-width: 768px) { .par-main { right: -10vmin; bottom: -16vmin; } .cbody.on { opacity: .92; } }
```

## `src/styles/card.css`

```css
/* Collectible artifact card, NASA image slot, scanner FX and stamps. */
.card-screen { height: 100%; overflow-y: auto; overscroll-behavior: contain; padding: 10px 10px 18px; scrollbar-width: thin; }
.card-glow { position: relative; border-radius: 36px; padding: 3px; background: conic-gradient(from var(--ang), var(--zB), var(--pink) 20%, transparent 32%, var(--zC) 52%, transparent 76%, var(--zB)); animation: ev-glow-orbit 7s linear infinite; box-shadow: 0 0 46px color-mix(in srgb, var(--zB) 24%, transparent); }
/* Only the border's gradient angle turns; the card itself never rotates.
   (Named ev-glow-orbit so it can't clash with Tailwind's built-in `spin`, which rotates the whole element.) */
@keyframes ev-glow-orbit { to { --ang: 360deg; } }
.card { border-radius: 33px; padding: 14px; background: linear-gradient(165deg, rgba(34, 38, 90, .95), rgba(12, 14, 40, .97)); box-shadow: inset 0 2px 0 rgba(255, 255, 255, .1); }
.card-title { font: 700 clamp(28px, 6vw, 42px)/1 var(--font-display); margin: .65rem 0 .2rem; }
.card-sub { font: 700 14px/1.4 var(--font-body); color: var(--muted); margin: 0; }

.imgbox { position: relative; aspect-ratio: 4 / 3; border-radius: 26px; overflow: hidden; border: 2.5px solid var(--edge); background: radial-gradient(circle at 50% 62%, color-mix(in srgb, var(--zB) 18%, transparent), transparent 62%), repeating-linear-gradient(0deg, rgba(160, 200, 255, .055) 0 1px, transparent 1px 22px), repeating-linear-gradient(90deg, rgba(160, 200, 255, .055) 0 1px, transparent 1px 22px), #0a0d24; box-shadow: inset 0 0 30px rgba(0, 0, 0, .4); }
.nasa-figure { position: absolute; inset: 0; margin: 0; }
.nasa-figure img { width: 100%; height: 100%; object-fit: cover; display: block; }
.img-credit { position: absolute; right: 10px; bottom: 10px; font: 600 11.5px/1 var(--font-display); padding: .35rem .6rem; border-radius: 999px; background: rgba(0, 0, 0, .55); color: #fff; }
.img-credit a { color: inherit; }
.nasa-placeholder { position: absolute; inset: 0; display: grid; place-items: center; }
.nasa-placeholder .holo { width: 80%; }
.img-note { position: absolute; left: 10px; top: 10px; font: 600 12px/1 var(--font-display); color: var(--muted); padding: .4rem .65rem; border-radius: 999px; background: rgba(0, 0, 0, .45); border: 1.5px solid rgba(255, 255, 255, .12); }

.scan-fx { position: absolute; inset: 0; pointer-events: none; }
.scan-grid { position: absolute; inset: 0; opacity: .55; background: repeating-linear-gradient(0deg, color-mix(in srgb, var(--zB) 24%, transparent) 0 1px, transparent 1px 6px); animation: flick .16s steps(2) infinite; }
@keyframes flick { 50% { opacity: .3; } }
.laser { position: absolute; left: 0; right: 0; top: 14%; height: 3px; background: #fff; box-shadow: 0 0 6px 2px var(--zB), 0 0 28px 8px color-mix(in srgb, var(--zB) 55%, transparent); animation: sweep 1.25s ease-in-out infinite alternate; }
.beam { position: absolute; left: 0; right: 0; top: 14%; height: 0; clip-path: polygon(80% 0, 0 100%, 100% 100%); background: linear-gradient(180deg, color-mix(in srgb, var(--zB) 8%, transparent), color-mix(in srgb, var(--zB) 42%, transparent)); animation: beam 1.25s ease-in-out infinite alternate; }
@keyframes sweep { from { top: 14%; } to { top: 96%; } }
@keyframes beam { from { height: 0%; } to { height: 82%; } }
.emitter { position: absolute; left: 80%; top: 14%; width: 10px; height: 10px; margin: -5px 0 0 -5px; border-radius: 50%; background: #fff; box-shadow: 0 0 12px 5px var(--zB); }
.scan-mini { position: absolute; right: 1%; top: -6%; width: 80px; transform: scaleX(-1); }
.scan-label { position: absolute; left: 10px; bottom: 10px; font: 600 13px/1 var(--font-display); color: var(--navy); background: var(--zB); padding: .4rem .7rem; border-radius: 999px; animation: caret .8s steps(2) infinite; }
.card-close {
  flex: 0 0 auto; width: 40px; height: 40px; display: grid; place-items: center; border-radius: 50%; cursor: pointer;
  font: 700 18px/1 var(--font-display); color: var(--navy); background: #e6ebfc; border: 2.5px solid #fff;
  box-shadow: 0 3px 0 rgba(0, 0, 0, .35); transition: transform .4s var(--bounce);
}
.card-close:active { transform: scale(.88); }
@media (hover: hover) { .card-close:hover { transform: scale(1.12) rotate(90deg); } }
.stamp-slot { position: absolute; left: 10px; bottom: 10px; transform: rotate(-10deg); filter: drop-shadow(0 0 16px color-mix(in srgb, var(--zB) 70%, transparent)); }

.tabs { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: .45rem; }
.tab { font: 600 12.5px/1.2 var(--font-display); padding: .65rem .4rem; border-radius: 16px; border: 2.5px solid var(--edge); background: rgba(255, 255, 255, .05); color: var(--muted); cursor: pointer; text-align: center; box-shadow: 0 3px 0 rgba(0, 0, 0, .3); transition: transform .35s var(--bounce), background-color .25s, color .25s, border-color .25s; }
.tab[aria-selected="true"] { color: var(--navy); border-color: #fff; background: linear-gradient(180deg, color-mix(in srgb, var(--zB) 45%, #fff), var(--zB)); box-shadow: 0 3px 0 color-mix(in srgb, var(--zB) 40%, #000), 0 0 18px color-mix(in srgb, var(--zB) 35%, transparent); }
@media (hover: hover) { .tab:hover { transform: translateY(-2px) scale(1.04); color: var(--ink); } .tab[aria-selected="true"]:hover { color: var(--navy); } }
.sheet { margin: 0; }
.sheet dt { font: 600 13px/1.2 var(--font-display); color: var(--zB); }
.sheet dd { margin: .2rem 0 .85rem; font: 700 15px/1.5 var(--font-body); color: var(--ink); }
.funfact { border-radius: 22px; padding: .9rem 1rem; background: rgba(255, 217, 138, .09); border: 2.5px dashed rgba(255, 217, 138, .6); }
.funfact h4 { margin: 0 0 .3rem; font: 600 14.5px/1 var(--font-display); color: var(--sun); }
.funfact p { margin: 0; font: 700 14.5px/1.5 var(--font-body); }

.sticker { position: relative; display: inline-block; }
.sticker svg { width: 100%; height: 100%; display: block; overflow: visible; }
.sticker.dim { filter: grayscale(1) brightness(.5); opacity: .55; }
.pop { animation: pop .75s cubic-bezier(.25, 1.6, .45, 1) both; }
@keyframes pop { from { transform: scale(0) rotate(-70deg); opacity: 0; } }
.slot { display: flex; flex-direction: column; align-items: center; gap: .45rem; text-align: center; }
.slot-empty { width: 84px; height: 84px; border-radius: 50%; border: 3px dashed rgba(190, 205, 255, .3); display: grid; place-items: center; font: 600 22px/1 var(--font-display); color: rgba(190, 205, 255, .5); }
.slot-name { font: 600 13px/1.2 var(--font-display); color: var(--muted); max-width: 120px; }

@media (min-width: 768px) {
  .card-screen { padding: 20px 24px 24px; }
  .card { padding: 22px; }
  .tab { font-size: 13.5px; padding: .7rem .5rem; }
}
```

## `src/styles/orbitto.css`

```css
/* Orbitto: floaty, squishy, bouncy. Each mood has its own body motion. */
.orbitto svg { display: block; width: 100%; height: auto; overflow: visible; }
.orb-float { animation: orbFloat 3.2s ease-in-out infinite; }
@keyframes orbFloat { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-9px); } }
.orb-shadow { transform-box: fill-box; transform-origin: center; animation: orbShadow 3.2s ease-in-out infinite; }
@keyframes orbShadow { 50% { transform: scaleX(.75); opacity: .18; } }

.orb-squish { transform-box: view-box; transform-origin: 100px 200px; animation: squishIdle 3.2s ease-in-out infinite; }
@keyframes squishIdle { 0%, 100% { transform: scale(1, 1); } 25% { transform: scale(1.03, .97); } 55% { transform: scale(.98, 1.025); } }
.mood-happy .orb-squish { animation: squishHappy 1.1s cubic-bezier(.3, .7, .4, 1) infinite; }
@keyframes squishHappy { 0%, 100% { transform: translateY(0) scale(1.05, .95); } 35% { transform: translateY(-12px) scale(.95, 1.06); } 65% { transform: translateY(0) scale(1.06, .94); } 80% { transform: scale(.99, 1.01); } }
.mood-amazed .orb-squish { animation: jumpAmazed 1.6s cubic-bezier(.3, .7, .4, 1) infinite; }
@keyframes jumpAmazed { 0%, 60%, 100% { transform: translateY(0) scale(1); } 20% { transform: translateY(-16px) scale(.94, 1.07); } 40% { transform: translateY(0) scale(1.08, .92); } }
.mood-proud .orb-squish { animation: puff 2.2s ease-in-out infinite; }
@keyframes puff { 50% { transform: scale(1.06, 1.03); } }
.mood-wistful .orb-squish { animation: sway 4s ease-in-out infinite; }
@keyframes sway { 0%, 100% { transform: rotate(-2deg); } 50% { transform: rotate(2deg) scale(.99, .98); } }
.mood-curious .orb-squish { animation: tiltbob 2.6s ease-in-out infinite; }
@keyframes tiltbob { 50% { transform: translateY(-4px) rotate(2deg); } }

.orb-antenna { animation: antFloat 2.2s ease-in-out infinite; }
@keyframes antFloat { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
.headtilt { transform-box: view-box; transform-origin: 100px 140px; transition: transform .5s var(--bounce); }
.arm { transform-box: view-box; transition: transform .45s var(--bounce); }
.arm.waving { animation: wave 1s ease-in-out infinite; }
@keyframes wave { 0%, 100% { transform: rotate(-150deg); } 50% { transform: rotate(-112deg); } }

.led-blink { transform-box: fill-box; transform-origin: center; animation: blink 4.6s infinite; }
@keyframes blink { 0%, 93%, 100% { transform: scaleY(1); } 96% { transform: scaleY(.08); } }
.led-twinkle { transform-box: fill-box; transform-origin: center; animation: twinkleEye 1.4s ease-in-out infinite; }
@keyframes twinkleEye { 50% { transform: scale(.85) rotate(14deg); } }
.led-tear { animation: tear 2.8s ease-in infinite; }
@keyframes tear { 0%, 30% { transform: translateY(0); opacity: 0; } 40% { opacity: 1; } 100% { transform: translateY(14px); opacity: 0; } }
.led-heart { transform-box: fill-box; transform-origin: center; animation: heartbeat 1.6s ease-in-out infinite; }
@keyframes heartbeat { 0%, 100% { transform: scale(1); } 15% { transform: scale(1.25); } 30% { transform: scale(1); } 45% { transform: scale(1.18); } }
.twk { transform-box: fill-box; transform-origin: center; animation: twk 1.6s ease-in-out infinite; }
@keyframes twk { 50% { transform: scale(.4) rotate(45deg); opacity: .4; } }
.orb-q { font: 700 30px var(--font-display); fill: var(--zB); }
.orbitto-face { flex: 0 0 auto; display: inline-block; }

/* Story reactions (beat fx) */
.fx-shake { animation: shake .28s linear infinite; }
@keyframes shake { 25% { transform: translate(-3px, 1px) rotate(-2deg); } 75% { transform: translate(3px, -1px) rotate(2deg); } }
.fx-hop { animation: hop 1s cubic-bezier(.3, .7, .4, 1) infinite; }
@keyframes hop { 0%, 100% { transform: translateY(0); } 40% { transform: translateY(-22px) rotate(-4deg); } }
.fx-stuck { transform-origin: 50% 90%; animation: stuckm .9s ease-in-out infinite; }
@keyframes stuckm { 0%, 100% { transform: rotate(-5deg); } 50% { transform: rotate(5deg); } }
.fx-float { animation: zerog 4.5s ease-in-out infinite; }
@keyframes zerog { 0%, 100% { transform: translateY(0) rotate(-4deg); } 50% { transform: translateY(-16px) rotate(5deg); } }


/* Talking: the LED mouth moves (restarting on each spoken word) and the visor glows softly. */
.orb-visor-glow { opacity: 0; transition: opacity .3s; pointer-events: none; }
.is-talking .orb-visor-glow { animation: visorTalk .45s ease-in-out infinite alternate; }
@keyframes visorTalk { from { opacity: .04; } to { opacity: .17; } }
.orb-mouth { transform-box: fill-box; transform-origin: center; }
.is-talking .orb-mouth { animation: talkA .3s ease-in-out infinite; }
[data-talk="b"] .is-talking .orb-mouth { animation-name: talkB; }
@keyframes talkA { 0%, 100% { transform: scale(1, 1); } 35% { transform: scale(.86, 1.75); } 70% { transform: scale(1.05, .6); } }
@keyframes talkB { 0%, 100% { transform: scale(1, 1); } 35% { transform: scale(.86, 1.75); } 70% { transform: scale(1.05, .6); } }
.is-talking .orb-antenna { animation-duration: .9s; }
```

## `src/styles/overlays.css`

```css
/* Title, zone break, end screen, modals, celebration and toasts. */
.title-screen, .zone-complete { height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: safe center; text-align: center; gap: 14px; padding: 24px 18px; }
.zone-complete { gap: 22px; }
.game-title {
  font: 700 clamp(46px, 12vw, 116px)/.9 var(--font-display); letter-spacing: -.015em; margin: 0;
  background: linear-gradient(180deg, #fff 12%, var(--zA) 55%, var(--zB) 100%); -webkit-background-clip: text; background-clip: text; color: transparent;
  filter: drop-shadow(0 6px 0 rgba(20, 18, 58, .95)) drop-shadow(0 0 34px color-mix(in srgb, var(--zB) 40%, transparent));
}
.title-kicker { font: 600 16px/1 var(--font-display); color: var(--zA); margin: 0; }
.hint { font: 600 13px/1.4 var(--font-display); color: var(--muted); margin: 0; }

.end-screen { position: absolute; inset: 0; background: #000; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 1.6rem; padding: 2rem; text-align: center; animation: fadein 1.8s ease both; }
.end-title { font: 700 clamp(56px, 13vw, 140px)/.9 var(--font-display); margin: 0; color: #fff; letter-spacing: .02em; text-shadow: 0 0 40px rgba(185, 162, 255, .6); }

.overlay { position: fixed; inset: 0; z-index: 70; display: grid; place-items: center; padding: max(12px, env(safe-area-inset-top, 0px)) 12px max(12px, env(safe-area-inset-bottom, 0px)); background: rgba(3, 4, 14, .66); backdrop-filter: blur(6px); -webkit-backdrop-filter: blur(6px); animation: fadein .25s both; }
@keyframes fadein { from { opacity: 0; } }
.modal { width: 100%; max-width: 780px; max-height: 100%; border-radius: 30px; padding: 18px; animation: pop .6s var(--bounce) both; }
.modal-title { display: flex; align-items: center; gap: .6rem; font: 600 24px/1 var(--font-display); margin: 0; }
.mc-group h3 { font: 600 16px/1 var(--font-display); color: var(--muted); margin: 1.3rem 0 .8rem; text-align: left; }

.celebrate { z-index: 90; background: radial-gradient(ellipse at 50% 30%, rgba(70, 50, 150, .55), rgba(3, 3, 14, .88)); }
.confetti { position: fixed; inset: 0; pointer-events: none; overflow: hidden; }
.confetti i { position: absolute; top: -24px; border-radius: 3px; animation-name: fall; animation-timing-function: linear; animation-iteration-count: infinite; }
@keyframes fall { to { transform: translateY(112vh) rotate(760deg); } }
.mc-panel { position: relative; width: 100%; max-width: 880px; max-height: 100%; border-radius: 34px; padding: 18px; background: linear-gradient(165deg, rgba(42, 34, 104, .96), rgba(12, 12, 38, .98)); animation: pop .7s cubic-bezier(.25, 1.5, .45, 1) both; }
.speech { position: relative; font: 700 clamp(16px, 2vw, 20px)/1.45 var(--font-body); padding: 1rem 1.2rem; border-radius: 24px; background: #fff; color: #1d1850; border: 3px solid var(--zB); box-shadow: 0 5px 0 rgba(0, 0, 0, .35), 0 0 30px rgba(185, 162, 255, .5); }
.speech-name { display: block; font: 600 13px/1 var(--font-display); color: #6a55d8; margin-bottom: .35rem; }
.speech::before { content: ''; position: absolute; left: 50%; top: -12px; margin-left: -10px; border: 10px solid transparent; border-top: 0; border-bottom-color: #fff; }
.mc-title { font-size: clamp(40px, 9vw, 84px); margin-top: .4rem; }
.badge-glow { animation: glowpulse 2.4s ease-in-out infinite; filter: drop-shadow(0 0 10px var(--gc)); }
@keyframes glowpulse { 50% { filter: drop-shadow(0 0 22px var(--gc)) brightness(1.15); } }

.toast { position: fixed; left: 50%; top: calc(env(safe-area-inset-top, 0px) + 112px); transform: translateX(-50%); z-index: 95; font: 600 14.5px/1.3 var(--font-display); padding: .75rem 1.1rem; border-radius: 999px; background: rgba(18, 20, 54, .96); border: 2.5px solid color-mix(in srgb, var(--zB) 60%, transparent); box-shadow: 0 4px 0 rgba(0, 0, 0, .35), 0 0 30px color-mix(in srgb, var(--zB) 25%, transparent); animation: toastin .45s var(--bounce) both; max-width: calc(100vw - 2rem); text-align: center; }
@keyframes toastin { from { opacity: 0; transform: translate(-50%, -12px) scale(.85); } }

@media (min-width: 768px) {
  .modal { padding: 26px; }
  .mc-panel { padding: 26px; }
  .speech::before { left: -12px; top: 50%; margin: -10px 0 0; border: 10px solid transparent; border-left: 0; border-right-color: #fff; }
  .toast { top: calc(env(safe-area-inset-top, 0px) + 96px); }
}


@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation-duration: .001ms !important; animation-iteration-count: 1 !important; transition-duration: .2s !important; }
}
```

## `src/styles/stage.css`

```css
/* Story stage: holograms, planets, banners and the script's on-screen moments. */
.story-view { height: 100%; display: flex; flex-direction: column; align-items: center; padding: 10px 14px 0; }
.stage-area { flex: 1 1 auto; min-height: 0; width: 100%; display: flex; align-items: center; justify-content: center; padding: 10px 0; text-align: center; overflow: hidden; }
.enter { animation: enter .7s var(--bounce) both; }
@keyframes enter { from { opacity: 0; transform: translateY(16px) scale(.94); } }

.holo { position: relative; width: min(76vw, 430px, 48vh); color: var(--zB); transition: color 1.2s; }
.holo.sm { width: min(40vw, 230px, 30vh); }
.holo svg { display: block; width: 100%; height: auto; overflow: visible; filter: drop-shadow(0 0 5px var(--zB)) drop-shadow(0 0 20px color-mix(in srgb, var(--zB) 45%, transparent)); animation: hfloat 4.2s ease-in-out infinite, hflick 5s infinite; }
.holo::after { content: ''; position: absolute; inset: -4% 0 0; background: repeating-linear-gradient(0deg, rgba(255, 255, 255, .07) 0 1px, transparent 1px 4px); mix-blend-mode: overlay; pointer-events: none; }
.holo-base { position: absolute; left: 14%; right: 14%; bottom: -8%; height: 20%; border-radius: 50%; border: 2.5px solid color-mix(in srgb, var(--zB) 55%, transparent); background: radial-gradient(closest-side, color-mix(in srgb, var(--zB) 30%, transparent), transparent); animation: basepulse 3s ease-in-out infinite; }
.holo.ghost { opacity: .5; }
.holo-label { font: 600 15px/1 var(--font-display); color: var(--zA); margin-top: 1.6rem; }
@keyframes hfloat { 50% { transform: translateY(-8px); } }
@keyframes hflick { 0%, 94%, 100% { opacity: 1; } 95% { opacity: .55; } 97% { opacity: .9; } }
@keyframes basepulse { 50% { transform: scale(1.06); opacity: .7; } }
.holo.drive svg { animation: drive 3.4s ease-in-out infinite, hflick 5s infinite; }
@keyframes drive { 0%, 100% { transform: translateX(-12%); } 50% { transform: translateX(12%); } }
.holo .rotor { transform-box: fill-box; transform-origin: center; animation: rotor .12s linear infinite alternate; }
.holo .rotor.r2 { animation-delay: .06s; }
@keyframes rotor { to { transform: scaleX(.2); } }
.holo.fly svg { animation: hfly 2.4s ease-in-out infinite, hflick 5s infinite; }
@keyframes hfly { 0%, 100% { transform: translateY(6%); } 50% { transform: translateY(-12%); } }
.holo.still svg { animation: hflick 5s infinite; }
.holo.still .rotor { animation: none; }
.holo.stuck svg { animation: stuckr .45s ease-in-out infinite, hflick 5s infinite; }
@keyframes stuckr { 0%, 100% { transform: rotate(-1.5deg); } 50% { transform: rotate(1.5deg) translateX(1%); } }
.holo.shake svg { animation: shakeq .28s linear infinite; }
@keyframes shakeq { 25% { transform: translate(-1.5%, .5%); } 75% { transform: translate(1.5%, -.5%); } }
.holo.dusty svg { filter: sepia(.9) saturate(.7) brightness(.6) drop-shadow(0 0 4px var(--zB)); transition: filter 1.2s; }
.holo.dusty::before { content: ''; position: absolute; inset: -6% 0 0; z-index: 1; pointer-events: none; opacity: .7; background-image: radial-gradient(rgba(214, 140, 80, .75) 1.3px, transparent 1.8px); background-size: 15px 15px; animation: dustfall 2.2s linear infinite; }
@keyframes dustfall { to { background-position: -15px 30px; } }
.holo.drift svg { animation: hdrift 7s ease-in-out infinite, hflick 5s infinite; }
@keyframes hdrift { 0% { transform: translate(-12%, 6%) scale(1); opacity: 1; } 100% { transform: translate(22%, -14%) scale(.35); opacity: .2; } }

.planet-lg { width: min(56vw, 300px, 42vh); filter: drop-shadow(0 0 44px color-mix(in srgb, var(--zB) 32%, transparent)); }
.planet-lg svg, .orb-ping svg, .earth-pull svg, .radio-worlds svg, .storm svg { width: 100%; height: auto; overflow: visible; display: block; }
.radio { position: relative; width: min(66vw, 300px, 44vh); aspect-ratio: 1; display: grid; place-items: center; }
.ring { position: absolute; inset: 30%; border-radius: 50%; border: 2.5px solid color-mix(in srgb, var(--zB) 60%, transparent); animation: ripple 2.4s ease-out infinite; }
.ring.r2 { animation-delay: .8s; } .ring.r3 { animation-delay: 1.6s; }
@keyframes ripple { from { transform: scale(.4); opacity: 1; } to { transform: scale(2.2); opacity: 0; } }
.radio-core { width: 18px; height: 18px; border-radius: 50%; background: var(--zB); box-shadow: 0 0 22px 6px color-mix(in srgb, var(--zB) 60%, transparent); }
.radio-worlds { position: absolute; inset: 0; }
.radio-worlds span { position: absolute; width: 24%; opacity: 0; animation: fadeworld 4.5s ease-in-out infinite; }
.radio-worlds span:nth-child(1) { left: 0; top: 6%; }
.radio-worlds span:nth-child(2) { right: 0; top: 30%; animation-delay: 1.5s; }
.radio-worlds span:nth-child(3) { left: 30%; bottom: -4%; animation-delay: 3s; }
@keyframes fadeworld { 0%, 100% { opacity: 0; transform: scale(.9); } 30%, 60% { opacity: .9; transform: none; } }
.earth-pull { width: min(60vw, 320px, 44vh); animation: pull 3.2s cubic-bezier(.4, 0, .2, 1) forwards; }
@keyframes pull { from { transform: scale(1.35); } to { transform: scale(.55); } }
.orb-ping { position: relative; }
.orb-ping i { position: absolute; width: 10px; height: 10px; border-radius: 50%; background: #fff; animation: dotping 1.6s ease-out infinite; }
@keyframes dotping { 0% { box-shadow: 0 0 0 0 color-mix(in srgb, var(--zB) 90%, transparent); } 100% { box-shadow: 0 0 0 18px transparent; } }
.storm { position: relative; width: min(58vw, 300px, 42vh); aspect-ratio: 1; }
.storm-orb { position: absolute; inset: 0; animation: stormdim 3.2s ease forwards; }
@keyframes stormdim { to { filter: brightness(.5) sepia(.6) blur(1px); } }
.swirl { position: absolute; inset: -14%; border-radius: 50%; filter: blur(16px); mix-blend-mode: screen; background: conic-gradient(from 0deg, rgba(255, 170, 90, 0), rgba(255, 170, 90, .5), rgba(150, 80, 30, 0), rgba(255, 196, 120, .45), rgba(255, 170, 90, 0)); animation: spinr 5s linear infinite; }
.swirl.s2 { inset: -4%; animation-duration: 3.4s; animation-direction: reverse; opacity: .7; }
@keyframes spinr { to { transform: rotate(360deg); } }
.seismo { width: min(74vw, 380px); color: var(--zB); margin-top: 1rem; }
.seismo path { fill: none; stroke: currentColor; stroke-width: 2.6; stroke-linejoin: round; stroke-linecap: round; stroke-dasharray: 640; animation: seisdraw 2.6s linear infinite; filter: drop-shadow(0 0 5px var(--zB)); }
@keyframes seisdraw { from { stroke-dashoffset: 640; } to { stroke-dashoffset: 0; } }

.big-title {
  font: 700 clamp(32px, 8vw, 78px)/.95 var(--font-display); letter-spacing: -.01em; margin: 0; text-wrap: balance;
  background: linear-gradient(180deg, #fff 15%, var(--zA) 60%, var(--zB)); -webkit-background-clip: text; background-clip: text; color: transparent;
  filter: drop-shadow(0 4px 0 rgba(20, 18, 58, .9)) drop-shadow(0 0 28px color-mix(in srgb, var(--zB) 35%, transparent));
}
.big-sub { font: 700 clamp(14px, 1.6vw, 18px)/1.5 var(--font-body); color: var(--muted); margin: 1rem auto 0; max-width: 46ch; }
.question { font: 700 clamp(44px, 12vw, 132px)/.9 var(--font-display); margin: 0; color: #fff; text-shadow: 0 6px 0 color-mix(in srgb, var(--zB) 45%, #000), 0 0 40px color-mix(in srgb, var(--zB) 50%, transparent); animation: wobble 2.6s ease-in-out infinite; }
@keyframes wobble { 0%, 100% { transform: rotate(-2deg); } 50% { transform: rotate(2deg) scale(1.03); } }
.dash-path { stroke-dasharray: 6 8; animation: dashmove 1.2s linear infinite; }
@keyframes dashmove { to { stroke-dashoffset: -28; } }
.banner-wrap { display: flex; flex-wrap: wrap; align-items: center; justify-content: center; gap: .6rem; max-width: 760px; }
.banner-chip { font: 700 clamp(16px, 2.6vw, 28px)/1.1 var(--font-display); padding: .75rem 1.15rem; border-radius: 22px; background: rgba(16, 18, 50, .82); border: 3px solid color-mix(in srgb, var(--zB) 65%, transparent); box-shadow: 0 4px 0 rgba(0, 0, 0, .4), 0 0 26px color-mix(in srgb, var(--zB) 30%, transparent); animation: chipin .6s var(--bounce) both; }
.banner-arrow { font: 700 clamp(20px, 3vw, 32px)/1 var(--font-display); color: var(--zB); animation: nudge 1.2s ease-in-out infinite; }
@keyframes chipin { from { opacity: 0; transform: scale(.6); } }
@keyframes nudge { 50% { transform: translateX(5px); } }
.banner-kind { font: 600 14px/1 var(--font-display); color: var(--zB); margin-bottom: 1rem; }
.count { font: 700 clamp(70px, 16vw, 170px)/1 var(--font-display); color: #fff; text-shadow: 0 0 40px color-mix(in srgb, var(--zB) 60%, transparent); font-variant-numeric: tabular-nums; }
.traj { width: min(88vw, 620px); height: auto; overflow: visible; }
.traj text { font: 600 15px var(--font-display); fill: var(--ink); }
.tl { display: flex; align-items: center; justify-content: center; width: min(90vw, 720px); }
.tl-link { flex: 1 1 auto; height: 3px; min-width: 3px; border-radius: 3px; background: linear-gradient(90deg, color-mix(in srgb, var(--zB) 55%, transparent), rgba(255, 255, 255, .15)); }
.tl-dot { flex: 0 0 auto; width: 15px; height: 15px; border-radius: 50%; background: var(--nc); box-shadow: 0 0 0 3px rgba(0, 0, 0, .4), 0 0 14px var(--nc); animation: tlon .6s var(--bounce) both; }
@keyframes tlon { from { transform: scale(0); opacity: 0; } }
.tl-years { display: flex; flex-wrap: wrap; justify-content: center; gap: .35rem .5rem; margin-top: 1.4rem; max-width: 720px; font: 600 clamp(14px, 1.8vw, 19px)/1.4 var(--font-display); color: var(--zA); }
.tl-years span { animation: chipin .5s ease both; }
.tl-years b { color: var(--zB); font-weight: 600; }
.words { display: flex; flex-wrap: wrap; align-items: center; justify-content: center; gap: .6rem .9rem; max-width: 760px; }
.words .dotsep { color: var(--zB); font: 700 26px/1 var(--font-display); }
```

## `src/styles/tokens.css`

```css
/* Design tokens + page base. Zone colors (--zA/--zB/--zC/--zBg) are set on .app by App.jsx. */
@property --ang { syntax: '<angle>'; inherits: false; initial-value: 0deg; }

:root {
  color-scheme: dark;
  --ink: #f3f6ff;
  --muted: #b5bfdd;
  --navy: #14123a;
  --pink: #ff9ad5;
  --mint: #8dffcf;
  --sun: #ffd98a;
  --edge: rgba(190, 205, 255, 0.2);
  --zA: #e3ecfb; --zB: #7ff3ff; --zC: #9fb2ff; --zBg: #050916;
  --bounce: cubic-bezier(.34, 1.8, .5, 1);
  --font-display: "Fredoka", ui-rounded, "Trebuchet MS", system-ui, sans-serif;
  --font-body: "Nunito", ui-rounded, system-ui, sans-serif;
  box-sizing: border-box;
  padding-top: env(safe-area-inset-top, 0px);
  padding-bottom: env(safe-area-inset-bottom, 0px);
}
*, *::before, *::after { box-sizing: inherit; }
html { height: 100%; background: #050916; scroll-padding-top: env(safe-area-inset-top, 0px); }
body {
  height: 100%; margin: 0; overflow: hidden; background: #050916; color: var(--ink);
  font-family: var(--font-body); -webkit-font-smoothing: antialiased; -webkit-tap-highlight-color: transparent;
}
#root { height: 100%; }
button { font-family: inherit; color: inherit; }
:focus-visible { outline: 3px solid var(--zB); outline-offset: 3px; border-radius: 12px; }
```

## `src/styles/ui.css`

```css
/* Bubbly chibi UI: layout shell, panels, chunky buttons, badges, HUD, dialogue dock. Mobile-first. */
/* ---------- Shell ---------- */
.app { position: relative; height: 100%; }
.app-shell { position: relative; z-index: 10; display: flex; flex-direction: column; height: 100%; }
.app-main { position: relative; flex: 1 1 auto; min-height: 0; }
.scroll { overflow-y: auto; overscroll-behavior: contain; scrollbar-width: thin; scrollbar-color: rgba(190, 205, 255, .3) transparent; }

/* ---------- Panels & badges ---------- */
.panel {
  background: linear-gradient(180deg, rgba(28, 32, 78, .8), rgba(12, 14, 42, .86));
  border: 2.5px solid var(--edge);
  backdrop-filter: blur(14px) saturate(1.3); -webkit-backdrop-filter: blur(14px) saturate(1.3);
  box-shadow: 0 14px 40px rgba(0, 0, 0, .4), inset 0 2px 0 rgba(255, 255, 255, .09);
}
.badge {
  display: inline-flex; align-items: center; gap: .4rem; font: 600 13px/1 var(--font-display);
  padding: .5rem .8rem; border-radius: 999px; color: var(--muted);
  background: rgba(255, 255, 255, .07); border: 2px solid rgba(255, 255, 255, .14);
  box-shadow: inset 0 1.5px 0 rgba(255, 255, 255, .1);
}
.badge-zone {
  color: #fff; border-color: color-mix(in srgb, var(--zB) 60%, transparent);
  background: color-mix(in srgb, var(--zB) 20%, rgba(10, 12, 34, .6));
  box-shadow: 0 0 18px color-mix(in srgb, var(--zB) 25%, transparent), inset 0 1.5px 0 rgba(255, 255, 255, .2);
  transition: background-color 1s, border-color 1s, box-shadow 1s;
}
.badge-num { color: var(--zA); transform: rotate(3deg); }

/* ---------- Chunky bouncy buttons ---------- */
.btn {
  display: inline-flex; align-items: center; justify-content: center; gap: .45rem;
  font: 600 15px/1.1 var(--font-display); padding: .8rem 1.15rem; border-radius: 18px;
  color: var(--ink); background: rgba(255, 255, 255, .08); border: 2.5px solid rgba(255, 255, 255, .15);
  box-shadow: 0 4px 0 rgba(0, 0, 0, .38), inset 0 2px 0 rgba(255, 255, 255, .12);
  cursor: pointer; touch-action: manipulation; text-align: center;
  transition: transform .4s var(--bounce), box-shadow .2s, background-color .3s, filter .3s;
}
.btn:active { transform: translateY(3px) scale(.96, .92); box-shadow: 0 1px 0 rgba(0, 0, 0, .38); transition-duration: .08s; }
.btn:disabled { opacity: .45; cursor: not-allowed; transform: none; box-shadow: 0 2px 0 rgba(0, 0, 0, .3); }
.btn-primary {
  color: var(--navy); border-color: rgba(255, 255, 255, .6);
  background: linear-gradient(180deg, color-mix(in srgb, var(--zB) 50%, #fff), var(--zB));
  box-shadow: 0 5px 0 color-mix(in srgb, var(--zB) 38%, #000), 0 0 26px color-mix(in srgb, var(--zB) 38%, transparent), inset 0 2px 0 rgba(255, 255, 255, .6);
}
.btn-gold {
  color: #3a2500; border-color: rgba(255, 255, 255, .6); background: linear-gradient(180deg, #fff0c4, #ffcf6b);
  box-shadow: 0 5px 0 #b07c1c, 0 0 24px rgba(255, 207, 107, .45), inset 0 2px 0 rgba(255, 255, 255, .7);
}
.btn-done { color: #c8ffe9; background: rgba(141, 255, 207, .12); border-color: rgba(141, 255, 207, .5); }
.btn-sm { padding: .58rem .85rem; font-size: 13.5px; border-radius: 14px; }
.btn-lg { padding: 1rem 1.7rem; font-size: 18px; border-radius: 22px; }
@media (hover: hover) {
  .btn:hover:not(:disabled) { transform: translateY(-3px) scale(1.05); filter: brightness(1.06); }
  .btn:active:not(:disabled) { transform: translateY(3px) scale(.96, .92); }
}

/* ---------- HUD ---------- */
.hud { position: relative; z-index: 30; padding: 8px 8px 0; }
.hud-inner { display: grid; grid-template-columns: auto auto; justify-content: space-between; align-items: center; gap: 6px 8px; padding: 7px; border-radius: 24px; }
.hud-map { grid-column: 1 / -1; order: 3; }
.hud-right { display: flex; align-items: center; gap: 8px; }
.zone-badge {
  display: flex; align-items: center; gap: .5rem; padding: .25rem .8rem .25rem .25rem; border-radius: 999px; text-align: left; cursor: pointer;
  background: color-mix(in srgb, var(--zB) 16%, rgba(10, 12, 34, .5)); border: 2.5px solid color-mix(in srgb, var(--zB) 55%, transparent);
  transform: rotate(-2deg); transition: transform .4s var(--bounce), background-color 1s, border-color 1s;
}
.zb-icon { width: 32px; height: 32px; border-radius: 50%; display: grid; place-items: center; font-size: 17px; background: rgba(0, 0, 0, .35); box-shadow: 0 0 16px color-mix(in srgb, var(--zB) 55%, transparent); }
.zone-badge small { display: block; font: 500 11px/1.1 var(--font-display); color: var(--zB); transition: color 1s; }
.zone-badge b { display: block; font: 600 15px/1.15 var(--font-display); }
.orbitto-chip { display: none; align-items: center; gap: .4rem; font: 600 13.5px/1 var(--font-display); padding: .25rem .7rem .25rem .25rem; border-radius: 999px; background: rgba(255, 255, 255, .07); border: 2px solid rgba(255, 255, 255, .14); }
.counter {
  display: flex; align-items: center; gap: .45rem; font: 500 12px/1.15 var(--font-display); color: var(--muted);
  padding: .45rem .7rem; border-radius: 16px; cursor: pointer; background: rgba(0, 0, 0, .28); border: 2px solid rgba(255, 217, 138, .35);
  transition: transform .4s var(--bounce), border-color .3s;
}
.counter b { color: var(--ink); font-size: 15px; font-weight: 600; }
.counter-text { display: flex; flex-direction: column; align-items: flex-start; line-height: 1.1; }
.counter-label { font-size: 10.5px; }
.counter-colon { display: none; }
@media (min-width: 420px) {
  .counter-text { display: inline; }
  .counter-label { font-size: inherit; }
  .counter-colon { display: inline; }
}
.cstar { width: 20px; height: 20px; flex: 0 0 auto; fill: var(--sun); filter: drop-shadow(0 0 6px rgba(255, 217, 138, .8)); animation: spinslow 8s linear infinite; }
@keyframes spinslow { to { transform: rotate(360deg); } }
@media (hover: hover) { .zone-badge:hover { transform: rotate(2deg) scale(1.05); } .counter:hover { transform: scale(1.05); border-color: var(--sun); } }

.sm-track { display: flex; align-items: center; justify-content: center; padding: 3px 2px; }
.sm-link { flex: 1 1 18px; min-width: 2px; max-width: 24px; height: 3px; border-radius: 3px; background: rgba(190, 205, 255, .2); }
.sm-link.gap { max-width: 40px; background: repeating-linear-gradient(90deg, rgba(190, 205, 255, .45) 0 3px, transparent 3px 7px); }
.sm-node { position: relative; flex: 0 0 auto; width: 21px; height: 21px; padding: 0; border: 0; background: none; display: grid; place-items: center; color: var(--nc); cursor: pointer; border-radius: 50%; transition: transform .35s var(--bounce); }
.sm-node svg { width: 14px; height: 14px; fill: transparent; stroke: currentColor; stroke-width: 2; stroke-linejoin: round; opacity: .85; transition: all .3s; }
.sm-node.got svg { fill: currentColor; opacity: 1; filter: drop-shadow(0 0 5px currentColor); }
.sm-node.active svg { width: 18px; height: 18px; opacity: 1; animation: nodebounce 1.2s var(--bounce) infinite; }
.sm-node.active::before { content: ''; position: absolute; inset: -2px; border-radius: 50%; border: 2px solid currentColor; animation: ev-ping 1.8s ease-out infinite; }
@keyframes nodebounce { 0%, 100% { transform: translateY(0); } 40% { transform: translateY(-3px) scale(1.12); } }
@keyframes ev-ping { 0% { transform: scale(.8); opacity: .9; } 100% { transform: scale(1.8); opacity: 0; } }
.sm-node:hover, .sm-node:focus-visible { transform: scale(1.3); }
.sm-tip { position: absolute; top: calc(100% + 8px); left: 50%; transform: translate(-50%, -4px); white-space: nowrap; font: 600 12px/1.2 var(--font-display); padding: .45rem .65rem; border-radius: 12px; background: rgba(14, 16, 44, .96); border: 2px solid var(--edge); color: var(--ink); opacity: 0; pointer-events: none; transition: opacity .18s, transform .25s var(--bounce); z-index: 40; }
.sm-node:hover .sm-tip, .sm-node:focus-visible .sm-tip { opacity: 1; transform: translate(-50%, 0); }
.sm-node:first-of-type .sm-tip { left: 0; transform: translate(0, -4px); }

@media (min-width: 400px) { .counter { font-size: 13px; padding: .5rem .8rem; } .sm-node { width: 23px; height: 23px; } .sm-node svg { width: 15px; height: 15px; } }
@media (min-width: 768px) {
  .hud { padding: 12px 20px 0; }
  .hud-inner { grid-template-columns: auto 1fr auto; padding: 8px 10px; border-radius: 28px; }
  .hud-map { grid-column: auto; order: 0; }
  .sm-node { width: 27px; height: 27px; } .sm-node svg { width: 17px; height: 17px; } .sm-node.active svg { width: 22px; height: 22px; }
}
@media (min-width: 1100px) { .orbitto-chip { display: inline-flex; } }

/* ---------- Dialogue dock ---------- */
.dock { position: relative; z-index: 20; padding: 4px 8px 8px; }
.dock-inner { max-width: 1040px; margin: 0 auto; display: flex; align-items: flex-end; gap: 6px; }
.dock-mascot { width: 72px; flex: 0 0 auto; margin-bottom: -4px; filter: drop-shadow(0 10px 16px rgba(0, 0, 0, .5)); }
.dbox {
  position: relative; flex: 1 1 auto; min-width: 0; border-radius: 24px; padding: 18px 14px 10px;
  background: linear-gradient(180deg, rgba(30, 34, 82, .94), rgba(14, 16, 44, .96));
  border: 3px solid color-mix(in srgb, var(--zB) 55%, rgba(255, 255, 255, .15));
  box-shadow: 0 0 0 4px rgba(5, 8, 22, .55), 0 0 34px color-mix(in srgb, var(--zB) 18%, transparent), inset 0 2px 0 rgba(255, 255, 255, .1);
  transition: border-color 1.2s, box-shadow 1.2s;
}
.dbox::before {
  content: ''; position: absolute; left: -10px; bottom: 26px; width: 16px; height: 16px; transform: rotate(45deg);
  background: rgb(15, 17, 46); border-left: 3px solid color-mix(in srgb, var(--zB) 55%, rgba(255, 255, 255, .15)); border-bottom: 3px solid color-mix(in srgb, var(--zB) 55%, rgba(255, 255, 255, .15));
}
.nametag {
  position: absolute; top: -17px; left: 14px; display: inline-flex; align-items: center; gap: .35rem;
  font: 600 14px/1 var(--font-display); padding: .28rem .8rem .28rem .3rem; border-radius: 999px; color: var(--navy);
  background: linear-gradient(180deg, color-mix(in srgb, var(--zB) 45%, #fff), var(--zB)); border: 2.5px solid #fff;
  box-shadow: 0 3px 0 rgba(0, 0, 0, .3), 0 0 16px color-mix(in srgb, var(--zB) 50%, transparent); transform: rotate(-2deg);
}
.nametag.sys { background: #e6ebfc; padding: .38rem .85rem; box-shadow: 0 3px 0 rgba(0, 0, 0, .3); }
.funtag { position: absolute; top: -17px; right: 14px; font: 600 13.5px/1 var(--font-display); padding: .38rem .8rem; border-radius: 999px; color: #3a2500; background: linear-gradient(180deg, #fff0c4, #ffcf6b); border: 2.5px solid #fff; box-shadow: 0 3px 0 rgba(0, 0, 0, .3); transform: rotate(2deg); }
.cue { font: italic 700 12.5px/1.4 var(--font-body); color: var(--muted); margin: 0 0 .35rem; animation: cuein .5s ease both; }
@keyframes cuein { from { opacity: 0; transform: translateX(-6px); } }
.dtext { font: 700 15.5px/1.5 var(--font-body); margin: 0; min-height: 3em; cursor: pointer; max-width: 70ch; text-wrap: pretty; }
.caret { display: inline-block; width: 9px; height: 1.05em; margin-left: 3px; vertical-align: -3px; border-radius: 3px; background: var(--zB); animation: caret .7s steps(2) infinite; }
@keyframes caret { 50% { opacity: 0; } }
.dfoot { display: flex; flex-wrap: wrap; gap: .5rem; align-items: center; justify-content: space-between; margin-top: .6rem; }
.dfoot-end { justify-content: flex-end; }
.beat-dots { display: flex; align-items: center; gap: 5px; }
.bdot { width: 7px; height: 7px; border-radius: 50%; background: rgba(190, 205, 255, .25); transition: all .35s var(--bounce); }
.bdot.past { background: color-mix(in srgb, var(--zB) 55%, transparent); }
.bdot.on { width: 20px; border-radius: 6px; background: var(--zB); box-shadow: 0 0 10px var(--zB); }

/* Card screen: a compact dock that can be tucked away on phones */
.dock-compact .dock-mascot { width: 54px; }
.dock-compact .dbox { padding-top: 16px; }
.dock-compact .dtext { min-height: 0; font-size: 14.5px; display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 3; overflow: hidden; }
.dock-compact .funtag { right: 46px; }
.dock-min { position: absolute; right: 8px; top: -17px; width: 32px; height: 32px; border-radius: 50%; font: 700 18px/1 var(--font-display); background: #e6ebfc; color: var(--navy); border: 2.5px solid #fff; box-shadow: 0 3px 0 rgba(0, 0, 0, .3); cursor: pointer; }
.dock-tucked { display: flex; padding: 4px 10px 10px; }
.dock-pill { display: inline-flex; align-items: center; gap: .5rem; padding: .3rem .9rem .3rem .3rem; border-radius: 999px; font: 600 14px/1 var(--font-display); background: rgba(22, 26, 66, .92); border: 2.5px solid color-mix(in srgb, var(--zB) 55%, transparent); box-shadow: 0 4px 0 rgba(0, 0, 0, .35), 0 0 20px color-mix(in srgb, var(--zB) 25%, transparent); cursor: pointer; animation: pillbob 2.4s ease-in-out infinite; }
.pill-hint { color: var(--muted); font-weight: 500; }
@keyframes pillbob { 50% { transform: translateY(-3px); } }

@media (min-width: 768px) {
  .dock { padding: 6px 24px 20px; }
  .dock-inner { gap: 14px; }
  .dock-mascot { width: 140px; }
  .dbox { border-radius: 30px; padding: 22px 22px 12px; }
  .dbox::before { left: -12px; bottom: 34px; width: 20px; height: 20px; }
  .nametag { left: 20px; font-size: 15px; }
  .dtext { font-size: 18.5px; }
  .dock-compact .dock-mascot { width: 108px; }
  .dock-compact .dtext { font-size: 17px; display: block; -webkit-line-clamp: unset; }
  .dock-compact .funtag { right: 18px; }
  .dock-min { display: none; }
}


/* ---------- Audio controls ---------- */
.mute-btn {
  width: 38px; height: 38px; flex: 0 0 auto; display: grid; place-items: center; border-radius: 50%; cursor: pointer; color: var(--ink);
  background: color-mix(in srgb, var(--zB) 16%, rgba(10, 12, 34, .6)); border: 2.5px solid color-mix(in srgb, var(--zB) 55%, transparent);
  box-shadow: 0 3px 0 rgba(0, 0, 0, .35), inset 0 1.5px 0 rgba(255, 255, 255, .15); transition: transform .4s var(--bounce), background-color .3s, border-color .3s;
}
.mute-btn.is-muted { color: var(--pink); background: rgba(255, 154, 213, .12); border-color: rgba(255, 154, 213, .55); }
.mute-btn:active { transform: scale(.9); }
.voice-btn {
  position: absolute; top: 12px; right: 12px; width: 34px; height: 34px; display: grid; place-items: center; border-radius: 50%; cursor: pointer; color: #fff;
  background: color-mix(in srgb, var(--zB) 20%, rgba(10, 12, 34, .7)); border: 2px solid color-mix(in srgb, var(--zB) 60%, transparent);
  box-shadow: 0 3px 0 rgba(0, 0, 0, .35); transition: transform .4s var(--bounce), opacity .3s;
}
.voice-btn svg { width: 18px; height: 18px; }
.voice-btn:disabled { opacity: .4; cursor: not-allowed; }
.voice-btn:active:not(:disabled) { transform: scale(.88); }
.voice-btn .wave { opacity: .55; }
.voice-btn.is-speaking { box-shadow: 0 3px 0 rgba(0, 0, 0, .35), 0 0 16px color-mix(in srgb, var(--zB) 60%, transparent); }
.voice-btn.is-speaking .wave { animation: wavepulse .7s ease-in-out infinite alternate; }
.voice-btn.is-speaking .w2 { animation-delay: .25s; }
@keyframes wavepulse { from { opacity: .2; } to { opacity: 1; } }
.dbox.has-voice .dtext, .dbox.has-voice .cue { padding-right: 40px; }
.dock-compact .voice-btn { top: 18px; }
@media (hover: hover) { .mute-btn:hover, .voice-btn:hover:not(:disabled) { transform: scale(1.12) rotate(-6deg); } }
@media (min-width: 768px) { .mute-btn { width: 42px; height: 42px; } .dock-compact .voice-btn { top: 12px; } }
```
