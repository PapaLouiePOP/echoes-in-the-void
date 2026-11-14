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
