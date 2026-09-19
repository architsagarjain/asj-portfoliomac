type Band = { fill: string; left: number; right: number };

// Ridge colours and edge heights sampled directly off the source screen:
// bright at the upper right, sinking to near-black at the lower left.
const BANDS: Band[] = [
  { fill: '#e6e9ee', left: 70, right: 320 },
  { fill: '#ccd1da', left: 170, right: 450 },
  { fill: '#aeb5c3', left: 290, right: 630 },
  { fill: '#8f96a6', left: 420, right: 800 },
  { fill: '#6e7586', left: 560, right: 960 },
  { fill: '#4e5464', left: 720, right: 1120 },
  { fill: '#383c4a', left: 880, right: 1290 },
  { fill: '#272937', left: 1020, right: 1440 },
];

function ridge({ left, right }: Band) {
  const mid = left + (right - left) * 0.42;
  return [
    `M0 ${left}`,
    `C 340 ${left - 96} 700 ${mid - 60} 1020 ${mid}`,
    `C 1360 ${mid + 62} 1660 ${right - 40} 1920 ${right}`,
    'L1920 1080',
    'L0 1080',
    'Z',
  ].join(' ');
}

export default function Wallpaper() {
  return (
    <svg
      className="absolute inset-0 h-full w-full"
      viewBox="0 0 1920 1080"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="sky" x1="0.1" y1="0" x2="0.7" y2="1">
          <stop offset="0" stopColor="#f3f4f7" />
          <stop offset="1" stopColor="#dfe2e8" />
        </linearGradient>
        <linearGradient id="lift" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0.14" />
        </linearGradient>
        <linearGradient id="sink" x1="1" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#000000" stopOpacity="0" />
          <stop offset="0.55" stopColor="#000000" stopOpacity="0.06" />
          <stop offset="1" stopColor="#000000" stopOpacity="0.24" />
        </linearGradient>
      </defs>

      <rect width="1920" height="1080" fill="url(#sky)" />
      {BANDS.map((band) => (
        <g key={band.fill}>
          <path d={ridge(band)} fill={band.fill} />
          <path
            d={ridge(band)}
            fill="none"
            stroke="#ffffff"
            strokeOpacity="0.07"
            strokeWidth="2"
          />
        </g>
      ))}
      <rect width="1920" height="1080" fill="url(#lift)" />
      <rect width="1920" height="1080" fill="url(#sink)" />
    </svg>
  );
}
