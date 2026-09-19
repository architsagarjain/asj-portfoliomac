import { useState } from 'react';
import { folders, type FolderId } from '../content';
import type { Viewport } from '../hooks/useViewport';
import { FolderGlyph, HardDriveGlyph } from './Glyphs';
import { play } from '../lib/sound';

type Props = {
  active: boolean;
  vp: Viewport;
  onOpen: (id: FolderId) => void;
};

export default function DesktopIcons({ active, vp, onOpen }: Props) {
  const [selected, setSelected] = useState<string | null>(null);

  // One tap opens on touch; on a pointer device a double click does, like Finder.
  const openProps = (id: FolderId, name: string) =>
    vp.touch
      ? {
          onClick: () => {
            play('click');
            onOpen(id);
          },
        }
      : {
          onClick: () => {
            play('click');
            setSelected(name);
          },
          onDoubleClick: () => onOpen(id),
        };

  const cell = { width: vp.iconCell };
  const glyph = { height: vp.icon, width: vp.icon * 1.26 };

  return (
    <div
      className="absolute z-10 flex items-start gap-1"
      style={{ top: vp.barH + 8, right: vp.tiny ? 6 : 16 }}
    >
      <div className={`grid gap-x-1 ${vp.tiny ? 'grid-cols-2 gap-y-1' : 'grid-cols-2 gap-y-3'}`}>
        {folders.map((f, i) => (
          <button
            key={f.id}
            type="button"
            {...openProps(f.id, f.name)}
            style={{ ...cell, animationDelay: `${160 + i * 90}ms` }}
            className={`group flex flex-col items-center rounded-lg px-1 pb-1 pt-1.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white/80 ${
              active ? 'animate-iconIn' : 'opacity-0'
            }`}
          >
            <FolderGlyph
              style={glyph}
              className="drop-shadow-[0_1px_2px_rgba(0,0,0,0.28)] transition-transform group-active:scale-95"
            />
            <span
              style={{ fontSize: vp.iconLabel }}
              className={`mt-1 max-w-full rounded px-1.5 py-[1px] leading-[1.25] ${
                vp.tiny ? 'text-center' : 'truncate'
              } ${
                selected === f.name
                  ? 'bg-[#3d76d6] text-white'
                  : 'text-[#111318] [text-shadow:0_1px_2px_rgba(255,255,255,0.45)]'
              }`}
            >
              {f.name}
            </span>
          </button>
        ))}
      </div>

      {!vp.tiny && (
        <button
          type="button"
          onClick={() => {
            play('click');
            setSelected('Macintosh HD');
          }}
          style={{ ...cell, animationDelay: '60ms' }}
          className={`flex flex-col items-center rounded-lg px-1 pb-1 pt-1.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white/80 ${
            active ? 'animate-iconIn' : 'opacity-0'
          }`}
        >
          <HardDriveGlyph
            style={glyph}
            className="drop-shadow-[0_1px_2px_rgba(0,0,0,0.28)]"
          />
          <span
            style={{ fontSize: vp.iconLabel }}
            className="mt-1 leading-[1.25] text-[#111318] [text-shadow:0_1px_2px_rgba(255,255,255,0.45)]"
          >
            Macintosh HD
          </span>
          <span
            style={{ fontSize: vp.iconLabel - 1 }}
            className="mt-[2px] max-w-full truncate rounded-[4px] bg-white/90 px-1.5 py-[1px] leading-[1.25] text-[#111318] shadow-[0_0_0_1px_rgba(0,0,0,0.12)]"
          >
            Your Future…
          </span>
        </button>
      )}
    </div>
  );
}
