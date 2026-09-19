# Archit Sagar Jain — portfolio landing page

A pixel-faithful recreation of the macOS desktop landing screen from the
reference video. No image assets: the wallpaper, Apple logo, folder and
hard-drive icons are all hand-written SVG.

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
| `src/components/RetroMac.tsx` | The beige Macintosh the camera starts on, including the rainbow badge, floppy slot, coiled cable and tabletop reflection. |
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

The opening is sized to the viewport's own aspect ratio rather than a fixed
one, which is why the desktop is never cropped or letterboxed on the way in —
it only grows. The bezel and glass are DOM layers rather than part of the SVG
so they can follow that sizing.

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

## Folder targets

The eight folders are buttons with local selected state only — no routes are
wired up. Hook `onDoubleClick` in `DesktopIcons.tsx` to whatever window or
route layer you add next.
