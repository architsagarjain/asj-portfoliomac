import { useState } from 'react';
import { FolderGlyph, HardDriveGlyph } from './Glyphs';

const FOLDERS = [
  'About Me',
  'Education',
  'Experience',
  'Case Studies',
  'Projects',
  'Certifications',
  'Skills',
  'Contact',
];

export default function DesktopIcons() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="absolute right-4 top-9 z-10 flex items-start gap-1">
      <div className="grid grid-cols-2 gap-x-2 gap-y-3">
        {FOLDERS.map((name, i) => (
          <button
            key={name}
            type="button"
            onClick={() => setSelected(name)}
            onDoubleClick={() => setSelected(name)}
            className="animate-iconIn group flex w-[108px] flex-col items-center rounded-lg px-1 pb-1 pt-1.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white/80"
            style={{ animationDelay: `${160 + i * 90}ms` }}
          >
            <FolderGlyph className="h-[62px] w-[78px] drop-shadow-[0_1px_2px_rgba(0,0,0,0.28)]" />
            <span
              className={`mt-1 max-w-full truncate rounded px-1.5 py-[1px] text-[13px] leading-[16px] ${
                selected === name
                  ? 'bg-[#3d76d6] text-white'
                  : 'text-[#111318] [text-shadow:0_1px_2px_rgba(255,255,255,0.45)]'
              }`}
            >
              {name}
            </span>
          </button>
        ))}
      </div>

      <button
        type="button"
        onClick={() => setSelected('Macintosh HD')}
        className="animate-iconIn flex w-[108px] flex-col items-center rounded-lg px-1 pb-1 pt-1.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white/80"
        style={{ animationDelay: '60ms' }}
      >
        <HardDriveGlyph className="h-[62px] w-[78px] drop-shadow-[0_1px_2px_rgba(0,0,0,0.28)]" />
        <span className="mt-1 text-[13px] leading-[16px] text-[#111318] [text-shadow:0_1px_2px_rgba(255,255,255,0.45)]">
          Macintosh HD
        </span>
        <span className="mt-[2px] max-w-full truncate rounded-[4px] bg-white/90 px-1.5 py-[1px] text-[12px] leading-[15px] text-[#111318] shadow-[0_0_0_1px_rgba(0,0,0,0.12)]">
          Your Future…
        </span>
      </button>
    </div>
  );
}
