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
| `src/components/Wallpaper.tsx` | Layered ridge wallpaper. Ridge colours and edge heights are sampled from the source frames (`#e6e9ee` at the top right down to `#272937` at the lower left). |
| `src/components/MenuBar.tsx` | Apple logo, `Finder`, `File / Edit / View / Expect / Window / Help`, and the right cluster: battery, Wi-Fi, `9:41 AM`, search, Siri circle. |
| `src/components/DesktopIcons.tsx` | Hard drive plus the 2 × 4 folder grid. Folders fade and scale in on a 90 ms stagger, matching the reveal in the video. |
| `src/components/Dock.tsx` | Frosted dock: 12 app tiles, separator, Downloads, Trash. Running dots under Finder and Terminal. |
| `src/components/Glyphs.tsx` | Apple logo, folder and hard-drive SVGs. |

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
