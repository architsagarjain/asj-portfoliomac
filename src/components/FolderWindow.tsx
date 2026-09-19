import { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { folders, type FolderId } from '../content';
import FolderBody from './FolderBody';
import { FolderGlyph } from './Glyphs';
import type { Viewport } from '../hooks/useViewport';

export type WindowState = {
  id: FolderId;
  x: number;
  y: number;
  z: number;
};

type Props = {
  win: WindowState;
  vp: Viewport;
  focused: boolean;
  onFocus: () => void;
  onClose: () => void;
  onMove: (x: number, y: number) => void;
  onNavigate: (id: FolderId) => void;
};

export default function FolderWindow({
  win,
  vp,
  focused,
  onFocus,
  onClose,
  onMove,
  onNavigate,
}: Props) {
  const drag = useRef<{ dx: number; dy: number } | null>(null);
  const [hoverLights, setHoverLights] = useState(false);
  const title = folders.find((f) => f.id === win.id)?.name ?? '';

  const width = Math.min(880, vp.w - 80);
  const height = Math.min(620, vp.h - 120);

  const onPointerDown = (e: React.PointerEvent) => {
    if (vp.compact) return;
    // The traffic lights live inside the title bar. Capturing the pointer here
    // would route their click to the bar instead of the button, so the close
    // light never fired — let buttons handle their own press.
    if ((e.target as HTMLElement).closest('button')) return;
    onFocus();
    drag.current = { dx: e.clientX - win.x, dy: e.clientY - win.y };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!drag.current) return;
    onMove(
      Math.max(-width + 120, Math.min(vp.w - 120, e.clientX - drag.current.dx)),
      Math.max(vp.barH, Math.min(vp.h - 80, e.clientY - drag.current.dy))
    );
  };

  const endDrag = () => {
    drag.current = null;
  };

  const shell = vp.compact
    ? {
        left: 8,
        right: 8,
        top: vp.barH + 8,
        bottom: vp.dockIcon + 34,
        width: undefined,
        height: undefined,
      }
    : { left: win.x, top: win.y, width, height };

  return (
    <div
      role="dialog"
      aria-label={title}
      onPointerDown={onFocus}
      className={`absolute flex flex-col overflow-hidden rounded-xl border bg-white/95 backdrop-blur-xl ${
        focused
          ? 'border-black/15 shadow-[0_24px_60px_rgba(0,0,0,0.34)]'
          : 'border-black/10 shadow-[0_10px_30px_rgba(0,0,0,0.2)]'
      }`}
      style={{ ...shell, zIndex: 100 + win.z }}
    >
      {/* title bar */}
      <div
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        className={`flex h-11 shrink-0 items-center gap-3 border-b border-black/10 px-3 ${
          vp.compact ? '' : 'cursor-grab active:cursor-grabbing'
        }`}
      >
        <div
          className="flex items-center gap-2"
          onMouseEnter={() => setHoverLights(true)}
          onMouseLeave={() => setHoverLights(false)}
        >
          <button
            type="button"
            aria-label={`Close ${title}`}
            onClick={onClose}
            className="grid h-3 w-3 place-items-center rounded-full bg-[#ff5f57] text-[8px] font-bold leading-none text-black/50"
          >
            {hoverLights ? '×' : ''}
          </button>
          <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        </div>

        {!vp.tiny && (
          <div className="flex items-center gap-1 text-black/25">
            <ChevronLeft className="h-4 w-4" strokeWidth={2.2} />
            <ChevronRight className="h-4 w-4" strokeWidth={2.2} />
          </div>
        )}

        <div className="flex min-w-0 flex-1 items-center justify-center gap-1.5">
          <FolderGlyph className="h-[15px] w-[19px]" />
          <span className="truncate text-[13px] font-semibold text-black/70">{title}</span>
        </div>

        <span className="w-[52px] shrink-0" />
      </div>

      <div className="flex min-h-0 flex-1">
        {/* sidebar */}
        {!vp.compact && (
          <nav className="w-[176px] shrink-0 overflow-y-auto border-r border-black/10 bg-black/[0.025] p-2">
            <p className="px-2 pb-1 pt-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-black/35">
              {folders.length} folders
            </p>
            {folders.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => onNavigate(f.id)}
                className={`flex w-full items-center gap-2 rounded-md px-2 py-[5px] text-left text-[13px] ${
                  f.id === win.id
                    ? 'bg-[#3d76d6] text-white'
                    : 'text-black/70 hover:bg-black/[0.06]'
                }`}
              >
                <FolderGlyph className="h-[14px] w-[18px] shrink-0" />
                <span className="truncate">{f.name}</span>
              </button>
            ))}
          </nav>
        )}

        <div className="min-w-0 flex-1 overflow-y-auto overscroll-contain px-5 py-5 sm:px-7 sm:py-6">
          <FolderBody id={win.id} />
        </div>
      </div>
    </div>
  );
}
