import type { CSSProperties } from 'react';
import macintosh from '../assets/macintosh.webp';

/**
 * The Macintosh the camera starts on: a rendered still, positioned by Scene so
 * that the screen opening lands where WELL says it does.
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
      className={className}
      style={style}
      aria-hidden="true"
    />
  );
}
