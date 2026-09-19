import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import Desktop from './Desktop';
import RetroMac from './RetroMac';

/**
 * The screen well in the RetroMac artboard, as a fraction of it. The glass
 * inside is sized to the viewport's own aspect ratio so the desktop is never
 * cropped or letterboxed on the way in — it simply grows.
 */
const WELL = { cx: 0.5, cy: 0.389, maxW: 0.206, maxH: 0.246 };

/** How far you scroll to complete the zoom. */
const TRACK = 3.2;

const clamp = (n: number) => Math.min(1, Math.max(0, n));

function smoothstep(a: number, b: number, n: number) {
  const t = clamp((n - a) / (b - a));
  return t * t * (3 - 2 * t);
}

type Frame = {
  vw: number;
  vh: number;
  glassX: number;
  glassY: number;
  glassW: number;
  glassH: number;
  boxX: number;
  boxY: number;
  boxW: number;
  boxH: number;
  k: number;
};

function measure(): Frame {
  const vw = window.innerWidth;
  const vh = window.innerHeight;

  // The artboard is 16:9 and covers the viewport, like background-size: cover.
  const boxW = Math.max(vw, (vh * 16) / 9);
  const boxH = (boxW * 9) / 16;
  const boxX = (vw - boxW) / 2;
  const boxY = (vh - boxH) / 2;

  const aspect = vw / vh;
  const glassW = Math.min(WELL.maxW * boxW, WELL.maxH * boxH * aspect);
  const glassH = glassW / aspect;

  return {
    vw,
    vh,
    boxX,
    boxY,
    boxW,
    boxH,
    glassX: boxX + WELL.cx * boxW - glassW / 2,
    glassY: boxY + WELL.cy * boxH - glassH / 2,
    glassW,
    glassH,
    // The glass matches the viewport's aspect, so one factor fits both axes.
    k: glassW / vw,
  };
}

export default function Scene() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [frame, setFrame] = useState<Frame | null>(null);
  const [p, setP] = useState(0);

  useLayoutEffect(() => {
    const sync = () => setFrame(measure());
    sync();
    window.addEventListener('resize', sync);
    return () => window.removeEventListener('resize', sync);
  }, []);

  const read = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const travel = el.offsetHeight - window.innerHeight;
    setP(travel > 0 ? clamp(-el.getBoundingClientRect().top / travel) : 1);
  }, []);

  useEffect(() => {
    let queued = false;
    const onScroll = () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(() => {
        queued = false;
        read();
      });
    };
    read();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [read]);

  // Ease the tail so the desktop settles rather than slamming into place.
  const z = smoothstep(0, 1, p);

  const scale = frame ? 1 + z * (1 / frame.k - 1) : 1;
  const tx = frame ? (frame.vw / 2 - (frame.glassX + frame.glassW / 2)) * z : 0;
  const ty = frame ? (frame.vh / 2 - (frame.glassY + frame.glassH / 2)) * z : 0;

  const chassis = 1 - smoothstep(0.74, 0.97, p);
  const blank = 1 - smoothstep(0.12, 0.44, p);
  const landed = p > 0.97;

  return (
    <div ref={trackRef} style={{ height: `${TRACK * 100}vh` }}>
      <div className="sticky top-0 h-screen overflow-hidden bg-black">
        {frame && (
          <div
            className="absolute inset-0 will-change-transform"
            style={{
              transform: `translate(${tx}px, ${ty}px) scale(${scale})`,
              transformOrigin: `${frame.glassX + frame.glassW / 2}px ${
                frame.glassY + frame.glassH / 2
              }px`,
            }}
          >
            <RetroMac
              className="absolute"
              style={{
                left: frame.boxX,
                top: frame.boxY,
                width: frame.boxW,
                height: frame.boxH,
                opacity: chassis,
              }}
            />

            <div
              className="absolute rounded-[10px]"
              style={{
                left: frame.glassX - frame.glassW * 0.035,
                top: frame.glassY - frame.glassW * 0.035,
                width: frame.glassW * 1.07,
                height: frame.glassH + frame.glassW * 0.07,
                opacity: chassis,
                background: 'linear-gradient(180deg,#3a3a3c,#151517)',
                boxShadow: '0 2px 10px rgba(0,0,0,0.5)',
              }}
            />

            <div
              className="absolute overflow-hidden rounded-[4px]"
              style={{
                left: frame.glassX,
                top: frame.glassY,
                width: frame.glassW,
                height: frame.glassH,
                pointerEvents: landed ? 'auto' : 'none',
              }}
            >
              <div
                className="absolute left-0 top-0 origin-top-left"
                style={{
                  width: frame.vw,
                  height: frame.vh,
                  transform: `scale(${frame.k})`,
                }}
              >
                <Desktop active={p > 0.3} />
              </div>

              {/* the screen before it resolves: a cold CRT glow */}
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  opacity: blank,
                  background:
                    'radial-gradient(120% 90% at 50% 38%, #ffffff 0%, #eef3f8 55%, #dbe4ee 100%)',
                }}
              />
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  opacity: chassis * 0.5,
                  background:
                    'linear-gradient(128deg, rgba(255,255,255,0.32) 0%, rgba(255,255,255,0) 42%)',
                }}
              />
              <div
                className="pointer-events-none absolute inset-0 rounded-[6px]"
                style={{
                  opacity: chassis,
                  boxShadow: 'inset 0 0 22px rgba(0,0,0,0.45)',
                }}
              />
            </div>
          </div>
        )}

        <div
          className="pointer-events-none absolute inset-x-0 bottom-8 flex flex-col items-center gap-1 text-[13px] text-white/70 transition-opacity duration-300"
          style={{ opacity: 1 - smoothstep(0, 0.1, p) }}
        >
          <span>Scroll</span>
          <ChevronDown className="h-4 w-4 animate-bounce" strokeWidth={2} />
        </div>
      </div>
    </div>
  );
}
