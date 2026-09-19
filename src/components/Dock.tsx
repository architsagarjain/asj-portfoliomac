import { FolderOpen, Trash2 } from 'lucide-react';
import { companies, type FolderId } from '../content';
import type { Viewport } from '../hooks/useViewport';
import { play } from '../lib/sound';

type Props = {
  active: boolean;
  vp: Viewport;
  onOpen: (id: FolderId) => void;
  openIds: FolderId[];
};

type TileProps = {
  name: string;
  sub?: string;
  tile: string;
  ink: string;
  mark?: string;
  Glyph?: typeof FolderOpen;
  delay: number;
  active: boolean;
  vp: Viewport;
  running?: boolean;
  onOpen?: () => void;
};

function Tile({
  name,
  sub,
  tile,
  ink,
  mark,
  Glyph,
  delay,
  active,
  vp,
  running,
  onOpen,
}: TileProps) {
  return (
    <button
      type="button"
      aria-label={sub ? `${name} — ${sub}` : name}
      onClick={() => {
        play('tap');
        onOpen?.();
      }}
      style={{ animationDelay: `${delay}ms` }}
      className={`group relative flex shrink-0 flex-col items-center ${
        active ? 'animate-dockIn' : 'opacity-0'
      }`}
    >
      {!vp.touch && (
        <span className="pointer-events-none absolute -top-11 z-10 whitespace-nowrap rounded-md bg-white/90 px-2 py-1 text-center opacity-0 shadow backdrop-blur transition-opacity group-hover:opacity-100">
          <span className="block text-[12px] font-medium text-black/85">{name}</span>
          {sub && (
            <span className="block text-[10px] uppercase tracking-[0.08em] text-black/45">
              {sub}
            </span>
          )}
        </span>
      )}

      <span
        style={{ height: vp.dockIcon, width: vp.dockIcon, background: tile, color: ink }}
        className={`grid place-items-center rounded-[13px] shadow-[0_2px_6px_rgba(0,0,0,0.28)] ring-1 ring-inset ring-white/15 transition-transform duration-150 active:scale-95 ${
          vp.touch ? '' : 'group-hover:-translate-y-1.5 group-hover:scale-110'
        }`}
      >
        {mark ? (
          <span
            className="font-semibold leading-none tracking-tight"
            style={{ fontSize: mark.length > 2 ? vp.dockGlyph * 0.62 : vp.dockGlyph * 0.8 }}
          >
            {mark}
          </span>
        ) : Glyph ? (
          <Glyph
            style={{ height: vp.dockGlyph, width: vp.dockGlyph }}
            strokeWidth={1.9}
          />
        ) : null}
      </span>

      <span
        className={`mt-[3px] h-[3px] w-[3px] rounded-full bg-black/55 ${
          running ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </button>
  );
}

export default function Dock({ active, vp, onOpen, openIds }: Props) {
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-1.5 z-[150] flex justify-center px-2">
      <div className="pointer-events-auto flex max-w-full items-end gap-2.5 overflow-x-auto rounded-[20px] border border-white/40 bg-white/40 px-2.5 pb-1 pt-2 shadow-[0_8px_28px_rgba(0,0,0,0.32)] backdrop-blur-2xl [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {companies.map((c, i) => (
          <Tile
            key={c.name}
            name={c.name}
            sub={c.role}
            mark={c.mark}
            tile={c.tile}
            ink={c.ink}
            vp={vp}
            delay={420 + i * 35}
            active={active}
            running={openIds.includes(c.opens)}
            onOpen={() => onOpen(c.opens)}
          />
        ))}

        <span
          className="mx-1 mb-3 w-px shrink-0 bg-black/20"
          style={{ height: vp.dockIcon * 0.88 }}
          aria-hidden="true"
        />

        <Tile
          name="Downloads"
          Glyph={FolderOpen}
          tile="linear-gradient(180deg,#84cdfb,#5cb7f5)"
          ink="#ffffff"
          vp={vp}
          delay={760}
          active={active}
        />
        <Tile
          name="Trash"
          Glyph={Trash2}
          tile="linear-gradient(180deg,#f0f1f4,#c9ccd2)"
          ink="#4a4f58"
          vp={vp}
          delay={795}
          active={active}
        />
      </div>
    </div>
  );
}
