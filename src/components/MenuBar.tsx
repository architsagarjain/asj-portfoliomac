import { useState } from 'react';
import { BatteryMedium, Search, Volume2, VolumeX, Wifi } from 'lucide-react';
import { isMuted, play, setMuted } from '../lib/sound';
import type { Viewport } from '../hooks/useViewport';
import { AppleLogo } from './Glyphs';

const MENUS = ['File', 'Edit', 'View', 'Go', 'Window', 'Help'];

type Props = { active: boolean; vp: Viewport; appName: string };

export default function MenuBar({ active, vp, appName }: Props) {
  // Phones keep the app name and the clock; everything else is noise there.
  const menus = vp.tiny ? [] : vp.compact ? MENUS.slice(0, 3) : MENUS;
  const [quiet, setQuiet] = useState(isMuted);

  const toggleSound = () => {
    const next = !quiet;
    if (!next) setMuted(false);
    else {
      play('tap');
      setMuted(true);
    }
    setQuiet(next);
  };

  return (
    <header
      style={{ height: vp.barH, fontSize: vp.barText }}
      className={`absolute inset-x-0 top-0 z-[200] flex items-center justify-between bg-white/55 px-3 text-black/85 backdrop-blur-xl ${
        active ? 'animate-barIn' : 'opacity-0'
      }`}
    >
      <nav className="flex min-w-0 items-center gap-4">
        <AppleLogo className="h-[15px] w-[15px] shrink-0" />
        <span className="shrink-0 font-semibold">{appName}</span>
        {menus.map((item) => (
          <button
            key={item}
            type="button"
            className="rounded px-1 py-0.5 hover:bg-black/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-black/60"
          >
            {item}
          </button>
        ))}
      </nav>

      <div className="flex shrink-0 items-center gap-3.5">
        <button
          type="button"
          onClick={toggleSound}
          aria-label={quiet ? 'Turn interface sounds on' : 'Turn interface sounds off'}
          aria-pressed={quiet}
          className="rounded p-0.5 hover:bg-black/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-black/60"
        >
          {quiet ? (
            <VolumeX className="h-[16px] w-[16px]" strokeWidth={1.9} />
          ) : (
            <Volume2 className="h-[16px] w-[16px]" strokeWidth={1.9} />
          )}
        </button>
        {!vp.tiny && <BatteryMedium className="h-[17px] w-[17px]" strokeWidth={1.6} />}
        <Wifi className="h-[15px] w-[15px]" strokeWidth={2.1} />
        <span className="tabular-nums tracking-tight">9:41 AM</span>
        {!vp.compact && <Search className="h-[14px] w-[14px]" strokeWidth={2.2} />}
        <span
          className="h-[15px] w-[15px] rounded-full"
          style={{
            background:
              'conic-gradient(from 210deg, #2f6fe0, #7b3fe4, #e0407a, #f0803c, #f2c33c, #3fbf6f, #2f6fe0)',
          }}
          aria-hidden="true"
        />
      </div>
    </header>
  );
}
