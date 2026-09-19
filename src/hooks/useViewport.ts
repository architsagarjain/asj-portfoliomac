import { useEffect, useState } from 'react';

export type Viewport = {
  w: number;
  h: number;
  /** Phones and small tablets: windows become full-screen sheets. */
  compact: boolean;
  /** Phones: the menu bar drops to Finder + clock only. */
  tiny: boolean;
  /** No hover, so no dock magnification or tooltips. */
  touch: boolean;
  icon: number;
  iconCell: number;
  iconLabel: number;
  dockIcon: number;
  dockGlyph: number;
  barH: number;
  barText: number;
};

function read(): Viewport {
  // clientWidth excludes a classic scrollbar, so the desktop is laid out at
  // the width it is actually drawn in (Scene measures its stage the same way).
  const w = typeof window === 'undefined' ? 1440 : document.documentElement.clientWidth;
  const h = typeof window === 'undefined' ? 900 : window.innerHeight;
  const tiny = w < 560;
  const compact = w < 900;
  const touch =
    typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches;

  return {
    w,
    h,
    tiny,
    compact,
    touch,
    icon: tiny ? 46 : compact ? 54 : 62,
    iconCell: tiny ? 102 : compact ? 96 : 108,
    iconLabel: tiny ? 11 : compact ? 12 : 13,
    dockIcon: tiny ? 40 : compact ? 46 : 52,
    dockGlyph: tiny ? 21 : compact ? 24 : 26,
    barH: tiny ? 24 : 28,
    barText: tiny ? 11 : 13,
  };
}

export default function useViewport(): Viewport {
  const [vp, setVp] = useState<Viewport>(read);

  useEffect(() => {
    const sync = () => setVp(read());
    window.addEventListener('resize', sync);
    window.addEventListener('orientationchange', sync);
    return () => {
      window.removeEventListener('resize', sync);
      window.removeEventListener('orientationchange', sync);
    };
  }, []);

  return vp;
}
