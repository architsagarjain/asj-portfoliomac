# Archit Sagar Jain — portfolio landing page

A pixel-faithful recreation of the macOS desktop landing screen from the
reference video, entered through a scroll-driven zoom into a Macintosh.

The Macintosh is one rendered still (`src/assets/macintosh.webp`, 35 kB).
Everything else — wallpaper, Apple logo, folder and hard-drive icons, dock
tiles — is hand-written SVG and CSS.

## Run

```bash
npm install
npm run dev
```

## Stack

React 18 · TypeScript · Vite · Tailwind CSS · lucide-react

## Structure

| File | What it draws |
| --- | --- |
| `src/components/Scene.tsx` | The scroll-driven zoom. Owns scroll progress, the screen geometry, and the bezel/glass layers. |
| `src/components/RetroMac.tsx` | The Macintosh the camera starts on — a rendered still at `src/assets/macintosh.webp`, positioned by Scene. |
| `src/components/Desktop.tsx` | The desktop, always rendered at exactly one viewport. |
| `src/components/Wallpaper.tsx` | Layered ridge wallpaper. Ridge colours and edge heights are sampled from the source frames (`#e6e9ee` at the top right down to `#272937` at the lower left). |
| `src/components/MenuBar.tsx` | Apple logo, `Finder`, `File / Edit / View / Expect / Window / Help`, and the right cluster: battery, Wi-Fi, `9:41 AM`, search, Siri circle. |
| `src/components/DesktopIcons.tsx` | Hard drive plus the 2 × 4 folder grid. Folders fade and scale in on a 90 ms stagger, matching the reveal in the video. |
| `src/components/Dock.tsx` | Frosted dock: 12 app tiles, separator, Downloads, Trash. Running dots under Finder and Terminal. |
| `src/components/Glyphs.tsx` | Apple logo, folder and hard-drive SVGs. |

## The zoom

`Scene.tsx` is a `320vh` track with a sticky viewport inside it. Scroll
progress `p` (0 → 1) drives one transform on a single stage element:

```
translate(tx * p, ty * p) scale(1 + p * (1 / k - 1))
```

with `transform-origin` pinned to the centre of the screen opening. `k` is the
scale that fits one viewport of desktop into that opening, so at `p = 1` the
desktop sits at exactly 1:1 and fills the window. `tx` / `ty` walk the screen
centre to the viewport centre over the same range.

The tube opening in the still runs about 1.47:1. The live desktop is sized to
the viewport's own aspect ratio and centred inside that opening, so it is never
cropped or squashed on the way in — it only grows. A dark rounded panel covers
the still's own screen content and shows through above and below the desktop,
reading as tube mask. To re-derive that geometry for a different render, the
opening's bounds are the `WELL` fractions at the top of `Scene.tsx`.

Layered on top of the same `p`:

- the chassis and bezel fade out between `0.74` and `0.97`
- the cold CRT glow on the blank screen fades out between `0.12` and `0.44`,
  which is when the desktop resolves
- the menu bar, folders and dock hold their entrance animations until `p > 0.3`
- the desktop only takes pointer events past `p > 0.97`

To change how long the zoom takes, adjust `TRACK` at the top of `Scene.tsx`.
Scroll reads are coalesced into a single `requestAnimationFrame` per frame.

## Notes on the source

- The disk label in the video reads `Macinosh` with a rename pill underneath
  reading `Pour Future...` — both are generator garble. Rendered here as
  `Macintosh HD` and `Your Future…`. Change them in `DesktopIcons.tsx` if you
  want the literal strings.
- The sparkle at the lower right of the video is a generator watermark, not UI,
  so it is not reproduced. Neither is the mouse cursor.
- The dock icons are motion-blurred past the point of identification in the
  source. They are matched on sampled hue and silhouette, and named in
  `APPS` in `Dock.tsx` so they are easy to swap.

## Content

Every line of copy lives in `src/content.ts`, lifted from
architsagarjain.vercel.app (home, work, builds, writing, proof, contact).
Components read from it; none of them hardcode text. To update the site, edit
that one file.

The eight folders map to the source pages as:

| Folder | Source |
| --- | --- |
| About Me | home — intro, metrics, thesis, three modes, timeline, founders/investors |
| Education | work — education table |
| Experience | work — the six roles with stats |
| Case Studies | builds — all six case files |
| Projects | builds (Cairros, Shaadi Mangalam, Equip9, INDIKRAFT) + writing |
| Certifications | work — the six credentials |
| Skills | grouped from the capabilities described across work and builds |
| Press | The Hindustan Wires feature, syndicated on Dailyhunt |
| Contact | contact — email, LinkedIn, location, availability |

The Press folder links out to both articles and summarises the piece in our own
words rather than reprinting it, since the text belongs to the publisher. The
pull quote is Archit's own line from the interview, kept short and attributed.

`Skills` is the one folder that isn't a direct lift: the source site never
lists skills as such, so the four groups are assembled from what the roles and
cases describe. Rewrite them in `content.ts` if the framing is off.

## Windows

Double-click a folder (single tap on touch) to open a Finder window. Windows
are draggable by the title bar, stack by z-order, show the front window's name
in the menu bar, and carry a sidebar for jumping between folders. Dock tiles
open the same windows and show a running dot while open.

## Sound

`src/lib/sound.ts` synthesises every cue with a couple of oscillators, so there
are no audio files to ship or load. Four cues: `click` (selecting an icon),
`tap` (dock), `open` and `close` (windows). Browsers block audio before a user
gesture, so the `AudioContext` is created lazily on the first real click.

A speaker toggle sits in the menu bar and the choice persists in
`localStorage` under `asj:muted`. Change pitches and durations in the `play`
switch.

## Dock tiles

The dock is the nine places worked or studied, each opening the relevant
folder, with a hover card giving the role. They are defined in `companies` in
`src/content.ts`.

**These are monograms, not logos.** Reproducing real brand marks means using
other companies' trademarks, which is their call to license, not ours, so each
tile is initials on a brand-adjacent colour. If you have the rights to a mark
(your own ventures, or written permission), drop an SVG into
`src/assets/logos/`, import it, and render it in place of the `mark` string in
`Dock.tsx` — the tile is already sized for it.

## Responsive

One breakpoint hook, `src/hooks/useViewport.ts`, drives everything:

| | `tiny` (<560px) | `compact` (<900px) | full |
| --- | --- | --- | --- |
| Windows | full-screen sheet | full-screen sheet | draggable, 880×620 max |
| Sidebar | hidden | hidden | shown |
| Menu bar | app name + clock | 3 menus | all menus |
| Desktop icons | 46px, wrapped labels | 54px | 62px |
| Dock | 40px, scrolls | 46px | 52px, magnifies |
| Zoom track | 210vh | 210vh | 320vh |

Touch devices get single-tap open and no hover magnification or tooltips, since
hover states strand a tooltip under a finger. Window content uses
`overscroll-contain` so scrolling a window doesn't drag the zoom track.
