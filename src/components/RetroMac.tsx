import type { CSSProperties } from 'react';
import macintosh from '../assets/macintosh.webp';

/**
 * The Macintosh the camera starts on: a rendered still, positioned by Scene so
 * that the screen opening lands where WELL says it does.
 *
 * Scene sizes the artboard to cover the viewport, so on any screen that isn't
 * exactly 16:9 it is wider than the stage. Tailwind's base reset caps every
 * img at max-width: 100%, which would squash the still to the viewport width
 * while the inline height still applied — the screen well then no longer
 * lines up with the CRT. max-w-none lets Scene's geometry win.
 */
export default function RetroMac({
  className = '',
  style,
}: {
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <img
      src={macintosh}
      alt=""
      draggable={false}
      className={`max-w-none ${className}`}
      style={style}
      aria-hidden="true"
    />
  );
}
