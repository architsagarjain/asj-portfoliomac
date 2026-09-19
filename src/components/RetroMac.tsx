/**
 * The beige Macintosh the camera starts on. Drawn in viewport-fraction
 * coordinates on a 1000 x 563 grid (16:9) so it lines up with GLASS in
 * Scene.tsx without any measuring at runtime.
 */
import type { CSSProperties } from 'react';

export default function RetroMac({
  className = '',
  style,
}: {
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <svg
      viewBox="0 0 1000 563"
      preserveAspectRatio="none"
      className={className}
      style={style}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="case" x1="0.1" y1="0" x2="0.9" y2="1">
          <stop offset="0" stopColor="#f4f1ea" />
          <stop offset="0.45" stopColor="#e6e2d8" />
          <stop offset="1" stopColor="#cfcabd" />
        </linearGradient>
        <linearGradient id="caseTop" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fbf9f4" />
          <stop offset="1" stopColor="#e2ded3" />
        </linearGradient>
        <linearGradient id="bezel" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3a3a3c" />
          <stop offset="1" stopColor="#151517" />
        </linearGradient>
        <linearGradient id="stripe" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#f2b93f" />
          <stop offset="0.22" stopColor="#ef7b3a" />
          <stop offset="0.45" stopColor="#e2426a" />
          <stop offset="0.68" stopColor="#a23fd0" />
          <stop offset="1" stopColor="#5b3fd0" />
        </linearGradient>
        <linearGradient id="floor" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.18" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="pool" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#ffe6c4" stopOpacity="0.5" />
          <stop offset="1" stopColor="#ffe6c4" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* pools of light on the table */}
      <ellipse cx="640" cy="432" rx="230" ry="26" fill="url(#pool)" />
      <ellipse cx="300" cy="440" rx="170" ry="20" fill="url(#pool)" opacity="0.6" />

      {/* mirrored chassis on the tabletop */}
      <g opacity="0.16" transform="translate(0 875) scale(1 -1)">
        <rect x="363" y="100" width="273" height="333" rx="26" fill="url(#case)" />
        <rect x="395" y="360" width="88" height="32" rx="3" fill="url(#stripe)" />
      </g>
      <rect x="0" y="434" width="1000" height="129" fill="url(#floor)" />

      {/* chassis */}
      <rect x="363" y="100" width="273" height="333" rx="26" fill="url(#case)" />
      <rect x="363" y="100" width="273" height="26" rx="26" fill="url(#caseTop)" />
      <rect
        x="363.5"
        y="100.5"
        width="272"
        height="332"
        rx="26"
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.5"
      />

      {/* recessed screen well — the bezel and glass are DOM layers in Scene */}
      <rect x="386" y="140" width="228" height="158" rx="14" fill="#d9d4c8" />
      <rect x="388" y="142" width="224" height="154" rx="13" fill="#cdc8bb" />

      {/* rainbow badge */}
      <rect x="395" y="360" width="88" height="32" rx="3" fill="url(#stripe)" />
      <rect
        x="395"
        y="360"
        width="88"
        height="32"
        rx="3"
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.55"
      />

      {/* floppy slot */}
      <text
        x="519"
        y="355"
        fill="#5d574a"
        fontSize="8"
        fontFamily="-apple-system, system-ui, sans-serif"
      >
        Upload Your Future
      </text>
      <rect x="519" y="362" width="82" height="10" rx="2" fill="#bdb8ab" />
      <rect x="522" y="365" width="76" height="4" rx="2" fill="#6f6a5e" />
      <rect
        x="586"
        y="388"
        width="16"
        height="16"
        rx="2"
        fill="#e2ded3"
        stroke="#a9a496"
      />

      {/* coiled cable */}
      <path
        d="M362 398c-14 0-14 12-28 12s-14-12-28-12-14 12-28 12-14-12-28-12-14 12-28 12"
        fill="none"
        stroke="#e8e4da"
        strokeWidth="11"
        strokeLinecap="round"
      />
      <path
        d="M362 398c-14 0-14 12-28 12s-14-12-28-12-14 12-28 12-14-12-28-12-14 12-28 12"
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.5"
        strokeWidth="3"
        strokeLinecap="round"
      />

      {/* keyboard nub */}
      <path d="M356 434l14-22h100l14 22z" fill="url(#case)" />
      <g fill="#efece4" stroke="#c6c1b4" strokeWidth="1">
        {[0, 1, 2, 3].map((i) => (
          <rect key={i} x={382 + i * 24} y={414} width="19" height="11" rx="3" />
        ))}
      </g>
    </svg>
  );
}
